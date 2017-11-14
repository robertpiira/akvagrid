AKVAGRID
======================

A pretty simple grid-column "overlayer" tool to base your (responsive) layouts on.

---------------------------

Install
-------

`npm install akvagrid --save-dev`

Usage
-----

```
import akva from 'akvagrid'

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
    zindex: 1
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
    zindex: 1
  }
]

akva.init(grids)
```

Demo
----

www.piira.se/akva-grid
