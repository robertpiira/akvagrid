const debug = {
  grid: true,
  code: true
}

const css = `
  .akva-grid,
  .akva-grid * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .akva-baseline {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .akva-baseline-unit {
    height: 1.5em;
    border-bottom: 1px dashed rgba(63, 95, 110, .5);
  }

  .akva-grid {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: 0 auto;
    z-index: 1;
  }

  .akva-inner {
    height: 100%
  }

  .akva-cols {
    height: 100%;
    display: -webkit-flex;
    display: flex;
  }

  .akva-col {
    -webkit-flex: 1;
    flex: 1;
    border: 1px solid rgba(110, 180, 235,.9);
    border-width: 0 1px;
  }
`

const els = {
  wrapper: '.akva-grid',
  inner: '.akva-inner',
  columns: '.akva-cols',
  column: '.akva-col',
  baseline: '.akva-baseline',
  line: '.akva-baseline-unit'
}

const common = {
  getPageHeight: function() {
    const body = document.body
    const html = document.documentElement

    return Math.max(
      body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight,
      html.offsetHeight
    )
  },

  throttle: function(method, scope) {
    clearTimeout(method._tId)
    method._tId = setTimeout(function() {
      method.call(scope)
    }, 500)
  },

  log: function() {
    if (debug.code) {
      if (window.console && window.console.log && window.console.log.apply) {
        window.console.log.apply(console, ['akva: ', arguments])
      }
    }
  }
}

const Grid = function Grid(o) {
  this.gridName = o.gridName
  this.columnCount = o.columnCount
  this.breakpoints = o.breakpoints
    ? {
      from: o.breakpoints.from
        ? o.breakpoints.from.size + o.breakpoints.from.unit
        : null,
      to: o.breakpoints.to
        ? o.breakpoints.to.size + o.breakpoints.to.unit
        : null
    }
    : null
  this.lineHeight = o.lineHeight
    ? (o.lineHeight.size ? o.lineHeight.size : null) + o.lineHeight.unit
    : null
  this.gutterWidth = o.gutterWidth
    ? (o.gutterWidth.size ? o.gutterWidth.size : 0) + o.gutterWidth.unit
    : 0
  this.outerGutterWidth = o.outerGutterWidth
    ? (o.outerGutterWidth.size ? o.outerGutterWidth.size : 0) +
    o.outerGutterWidth.unit
    : 0
  this.width = o.width
    ? (o.width.size ? o.width.size : 'auto') + o.width.unit
    : null
  this.borderTheme = o.borderTheme
    ? { color: o.borderTheme.color, style: o.borderTheme.style }
    : null
  this.maxWidth = o.maxWidth
    ? (o.maxWidth.size ? o.maxWidth.size : 'auto') + o.maxWidth.unit
    : 'auto'
  this.opacity = o.opacity ? o.opacity : 1
  this.zindex = o.zindex ? o.zindex : 1

  // Handle visibility of grids with matchMedia
  let isVisible = true
  let query = {}

  if (this.breakpoints) {
    query = {
      from: this.breakpoints.from
        ? `(min-width: ${this.breakpoints.from})`
        : '',
      and: this.breakpoints.from && this.breakpoints.to ? ' and ' : '',
      to: this.breakpoints.to ? `(max-width: ${this.breakpoints.to})` : '',
      id: o.gridName
    }

    const setVisibility = query => {
      isVisible = query.matches ? true : false
    }

    const handleWindowWidthChange = (query, id) => {
      if (query.matches) {
        document.querySelector(`${els.wrapper}-${id}`).style.display = 'block'
      } else {
        document.querySelector(`${els.wrapper}-${id}`).style.display = 'none'
      }
    }

    (function addQueries() {
      const id = query.id
      const q = query.from + query.and + query.to
      const mq = window.matchMedia(q)

      mq.addListener(function() {
        handleWindowWidthChange(mq, id)
      })

      setVisibility(mq)
    })()

    // On load visibility state
    this.isVisible = isVisible
  }
}

Grid.prototype = {
  init: function() {
    common.log(`Prototype init: ${this.gridName} grid`, this)

    const that = this
    this.build()
    this.timer = null
    this.updateGridOnWindowWidthChange()

    window.onresize = function() {
      common.throttle(that.updateGridOnWindowWidthChange, that)
    }
  },

  updateGridOnWindowWidthChange: function() {
    const thisGrid = document.querySelector(`.akva-grid-${this.gridName}`)

    if (thisGrid.style.display !== 'none') {
      thisGrid.style.height = `${common.getPageHeight()}px`
      this.createBaseline(common.getPageHeight(), this.gridName)
    }
  },

  build: function() {
    const wrapper = this.createWrapper()
    const columns = this.createColumns()
    const baseline = this.createBaseline(common.getPageHeight())

    const inner = wrapper.querySelector(els.inner)

    inner.appendChild(columns)
    if (baseline) inner.appendChild(baseline)

    document.body.appendChild(wrapper)
  },

  createWrapper: function() {
    const wrapper = document.createElement('div')
    const inner = document.createElement('div')

    wrapper.classList.add(els.wrapper.slice(1))
    wrapper.classList.add(`akva-grid-${this.gridName}`)
    inner.classList.add(els.inner.slice(1))

    wrapper.style.maxWidth = this.maxWidth
    wrapper.style.width = this.width
    wrapper.style.opacity = this.opacity
    wrapper.style.zIndex = this.zindex

    if (this.outerGutterWidth) {
      inner.style.marginLeft = this.outerGutterWidth
      inner.style.marginRight = this.outerGutterWidth
    }

    if (!this.isVisible) {
      wrapper.style.display = 'none'
    }

    wrapper.appendChild(inner)

    return wrapper
  },

  createColumns: function() {
    common.log(
      `creating ${this.columnCount} columns for ${this.gridName}`
    )

    const columns = document.createElement('div')
    const column = document.createElement('div')

    columns.classList.add(els.columns.slice(1))
    column.classList.add(els.column.slice(1))

    let columnClone = null
    let i = 0

    if (this.borderTheme) {
      column.style.borderColor = this.borderTheme.color
      column.style.borderStyle = this.borderTheme.style
    }

    column.style.margin = `0 ${this.gutterWidth}`

    for (; i < this.columnCount; i++) {
      columnClone = column.cloneNode()
      columns.appendChild(columnClone)
    }

    return columns
  },

  createBaseline: function(pageHeight, target) {
    if (!this.lineHeight) {
      return false
    }

    const div = document.createElement('div')
    div.classList.add(els.baseline.slice(1))

    const wrapper = target !== undefined
      ? document.querySelector(`.akva-grid-${target}`).querySelector(els.baseline)
      : div

    const line = document.createElement('div')
    line.classList.add(els.line.slice(1))

    const htmlLine = document.createElement('div')
    let markup = ''
    let lineCount = 0

    if (this.lineHeight) {
      line.style.height = this.lineHeight
    }

    lineCount = Math.ceil((pageHeight + 20) / (line.clientHeight + 10))
    htmlLine.appendChild(line)

    if (lineCount > 1000) {
      lineCount = 1000
    }

    wrapper.innerHTML = ''

    while (lineCount--) {
      markup += htmlLine.outerHTML
    }

    wrapper.innerHTML = markup

    return wrapper
  }
}

const makeGrids = grids => grids.map(grid => new Grid(grid))
const initGrids = gridIntances => gridIntances.forEach(grid => grid.init())
const makeCSS = () => {
  const head = document.head || document.getElementsByTagName('head')[0]
  const style = document.createElement('style')

  style.type = 'text/css'

  if (style.styleSheet) {
    style.styleSheet.cssText = css
  } else {
    style.appendChild(document.createTextNode(css))
  }

  head.appendChild(style)
}

const akva = {
  init: function(grids) {
    const gridIntances = makeGrids(grids)
    initGrids(gridIntances)
    makeCSS()
  }
}

// akva.detect = function () {
//   if (window.location.hash.indexOf('#akva') > -1 || debug.grid === true) {
//     akva.init()
//   }
// }()

export default akva
