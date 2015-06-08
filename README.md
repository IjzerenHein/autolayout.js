# Auto Layout JS

[![Build Status](https://travis-ci.org/IjzerenHein/autolayout.js.svg?branch=master)](https://travis-ci.org/IjzerenHein/autolayout.js)

Apple's Auto Layout and Visual Format Language for javascript (using cassowary constraints).


## [Visual format Editor](https://rawgit.com/IjzerenHein/visualformat-editor/master/dist/index.html)


### Work in progress, come back later..

# TODO

Overal:
- [X] Toolchain (ES6, external cassowary.js, distributable output, testing, doc generation, travis CI)
- [ ] Instructions
- [ ] Documentation
- [ ] Examples

Features:
- [X] Namespace & classes (AutoLayout, VisualFormat, View, Relation, Attribute)
- [ ] Visual format 
  - [X] Vfl Parser (thanks to the awesome angular-autolayout team!)
  - [X] Size constraints
  - [X] Greater than, less than relationships.
  - [ ] Variables
  - [X] Percentage support (e.g. |-[child(50%)]-[child2]-])
- [X] Equality relationships
  - [X] Base functionality
  - [X] Multiplier support
- [X] In-equality relationships
- [ ] Priorities & weights.
- [X] Spacing.
- [ ] Variables support (.e.g. |-(leftMargin)-[child]]).
- [ ] Checking for ambigous layout.
- [ ] Fitting size?
- [ ] Intrinsic content size?
- [ ] Content hugging?
- [ ] Compression resistance?
- [ ] Remove constraints?
- [ ] Generate visual sub-view output from `View` (ASCII-art'ish)
- [ ] Get constraint definitions from `View`
- [ ] LTR (left to right reading) (Attribute.LEADING & Attribute.TRAILING)
- [ ] Baseline support?
- [ ] Margins? (View & Attributes)
