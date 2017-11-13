const { JSDOM } = jsdom
const { window } = new JSDOM()

global.window = window
global.document = window.document
global.window.matchMedia = global.window.matchMedia
|| function () {
  return {
    matches: true,
    addListener: () => {},
    removeListener: () => {}
  }
}

import jsdom from 'jsdom'
import tape from 'tape'
import sinon from 'sinon'
import akvagrid from './index.js'
import { desktopAbove, mobileAndTablet } from './html.fixtures.js'

const grids = [
  {
    gridName: 'desktop-and-above',
    breakpoints: {from: {size: 65, unit: 'em'}, to: null},
    columnCount: 6,
    lineHeight: {size: 2, unit: 'em'},
    gutterWidth: {size: 1, unit: '%'},
    outerGutterWidth: {size: -1, unit: '%'},
    borderTheme: {color: 'blue', style: 'solid'},
    width: {size: 92, unit: '%'},
    maxWidth: {size: 1200, unit: 'px'},
    opacity: 0.5,
    zindex: '1'
  },
  {
    gridName: 'mobile-and-tablet',
    breakpoints: {from: null, to: {size: 65, unit: 'em'}},
    columnCount: 4,
    gutterWidth: {size: 1.5, unit: '%'},
    outerGutterWidth: {size: 1.5, unit: '%'},
    borderTheme: {color: 'purple', style: 'dashed'},
    width: null,
    maxWidth: {size: 1200, unit: 'px'},
    opacity: 0.5,
    zindex: '1'
  },
  {
    gridName: 'desktop-and-above-2',
    breakpoints: {from: {size: 65, unit: 'em'}, to: null},
    columnCount: 6,
    gutterWidth: {size: 1, unit: '%'},
    outerGutterWidth: {size: -1, unit: '%'},
    borderTheme: {color: 'blue', style: 'solid'},
    width: {size: 92, unit: '%'},
    maxWidth: {size: 1200, unit: 'px'},
    opacity: 0.5,
    zindex: '1'
  },
]

tape('akvagrid', t => {

  t.test('init', t => {

    const akvaGrids = akvagrid.init(grids)

    t.equals(document.querySelector('.akva-grid-desktop-and-above').outerHTML,
      desktopAbove
      , 'should create correct tablet markup')

    t.equals(document.querySelector('.akva-grid-mobile-and-tablet').outerHTML,
      mobileAndTablet
      , 'should create correct mobile markup')

    t.end()

  })

  t.end()
})
