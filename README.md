![Logo](logo.png)

[![Build Status](https://travis-ci.org/IjzerenHein/autolayout.js.svg?branch=master)](https://travis-ci.org/IjzerenHein/autolayout.js)
[![view on npm](http://img.shields.io/npm/v/autolayout.svg)](https://www.npmjs.org/package/autolayout)
[![License](http://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)

AutoLayout.js implements Apple's [Auto Layout](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/AutolayoutPG/index.html) and [Visual Format Language](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/AutolayoutPG/VisualFormatLanguage.html) in Javascript. Auto layout is a system which lets you perform lay out using mathematical relationships (constraints). It uses the awesome [Cassowary.js](https://github.com/slightlyoff/cassowary.js) library to do the actual constraint resolving and implements Apple's constraint system and Visual Format Language (vfl) on top of that. It supports the [Extended VFL syntax](#extended-visual-format-language-evfl), including view-stacks and z-indexing.

```javascript
var constraints = AutoLayout.VisualFormat.parse([
  'H:|[view1(==view2)]-10-[view2]|',
  'V:|[view1,view2]|'
], {extended: true});
var view = new AutoLayout.View({constraints: constraints});
view.setSize(400, 500);
console.log(view.subViews.view1); // {left: 0, top: 0, width: 195, height: 500}
console.log(view.subViews.view2); // {left: 205, top: 0, width: 195, height: 500}
```

Layouts can be previewed and debugged using the [Visual Format Editor](https://github.com/IjzerenHein/visualformat-editor):

[![Example - click me](example.png)](https://rawgit.com/IjzerenHein/visualformat-editor/master/dist/index.html?vfl=example)
*(click image to open the editor)*


## Index
- [Getting started](#getting-started)
  - [Installation](#installation)
  - [Using the API](#using-the-api)
  - [API Documentation](#api-documentation)
  - [Examples](#examples)
- [Extended Visual Format Language (EVFL)](#extended-visual-format-language-evfl)
- [Additional resources](#additional-resources)
- [Benchmark](https://rawgit.com/IjzerenHein/autolayout.js/master/bench/index.html)
- [Tests](https://rawgit.com/IjzerenHein/autolayout.js/master/test/index.html)
- [Roadmap](#roadmap)
- [Contribute](#contribute)

## Getting started

AutoLayout.js is an abstract library for integrating Auto Layout and VFL into other javascript technologies. It provides a simple API and programming model that you can use to build your own auto layout and VFL solution. A simple example of this is, is using `position: absolute;` to [lay out DOM elements](https://rawgit.com/IjzerenHein/autolayout.js/master/examples/DOM/index.html). A more elobarate example of this is the [Visual Format Editor](https://github.com/IjzerenHein/visualformat-editor), which is built using [famo.us](http://famous.org) and [famous-flex](https://github.com/IjzerenHein/famous-flex). AutoLayout.js is written in ES6 and contains transpiled distribution files.

### Installation

Install using npm or bower:

    npm install autolayout

    bower install autolayout

Include the library in your project:

```html
<head>
  <script type="text/javascript" src="<path-to-autolayout.js>/dist/autolayout.js"></script>
</head>
```

```javascript
var AutoLayout = window.AutoLayout;
```

Or when using a bundler like webpack or browserify, use:

```javascript
var AutoLayout = require('autolayout.js');
```
*(when using the 'src/' directory, do make sure plugins for transpiling es6 files are installed!)*

### Using the API

To parse VFL into constraints, use:

```javascript
try {
  // The VFL can be either a string or an array of strings.
  // strings may also contain '\n' which indicates that a new line of VFL will begin.
  var constraints = AutoLayout.VisualFormat.parse([
    '|-[child(==child2)]-[child2]-|',
    'V:|[child(==child2)]|',
  ]);
} catch (err) {
    console.log('parse error: ' + err.toString());
}
```

A View is the main entity onto which constraints are added. It uses the cassowary SimplexSolver to add
relations and variables. You can set the size of the view and other properties such as spacing. When constraints are added it automatically creates so called "sub-views" for every unique name that is encountered in the constraints. The evaluated size and position of these sub-views can be accessed through the `.subViews` property.

```javascript
// Create a view with a set of constraints
var view = new AutoLayout.View({
    constraints: constraints, // initial constraints (optional)
    width: 100,               // initial width (optional)
    height: 200,              // initial height (optional)
    spacing: 10               // spacing size to use (optional, default: 8)
});

// get the size and position of the sub-views
for (var key in view.subViews) {
    console.log(key + ': ' + view.subViews[key]);
    // e.g. {
    //   name: 'child1',
    //   left: 20,
    //   top: 10,
    //   width: 70,
    //   height: 80
    // }
}
```

By changing the size, the layout is re-evaluated and the subView's are updated:

``` javascript
view.setSize(300, 600);

// get the new size & position of the sub-views
for (var key in view.subViews) {
    console.log(key + ': ' + view.subViews[key]);
}
```

Instead of using VFL, you can also add constraints directly.
The properties are identical to those of [NSLayoutConstraint](https://developer.apple.com/library/ios/documentation/AppKit/Reference/NSLayoutConstraint_Class).
To constrain view1 to its parent view, use *null* for view2.


```
view.addConstraint({
    view1: 'child3',
    attr1: 'width',    // see AutoLayout.Attribute
    relation: 'equ',   // see AutoLayout.Relation
    view2: 'child4',
    attr2: 'width',    // see AutoLayout.Attribute
    constant: 10,
    multiplier: 1
});
```

### API Documentation

[The API reference documentation can be found here.](docs/AutoLayout.md)


### Examples

- [DOM Example](https://rawgit.com/IjzerenHein/autolayout.js/master/examples/DOM/index.html) [(source)](examples/DOM)
- [Visual Format Editor](https://github.com/IjzerenHein/visualformat-editor)
- [react-autolayout](https://github.com/fattenap/react-autolayout)
- [famous-autolayout](https://github.com/IjzerenHein/famous-autolayout)


## Extended Visual Format Language (EVFL)

Apple's Visual Format Language prefers good notation over completeness of expressibility. Because of this some useful constraints cannot be expressed by "Standard" VFL. AutoLayout.js defines an extended syntax (superset of VFL) which you opt-in to use. To enable the extended syntax, set option `extended` to `true` when parsing the visual format:

```javascript
var evfl = '|-[view1(==50%)]';
var constraints = AutoLayout.VisualFormat.parse(evfl, {extended: true});
```

### Language features

- [Proportional size](#proportional-size) (`|-[view1(==50%)]`)
- [Operators](#operators) (`|-[view1(==view2/2-10)]-[view2]-|`)
- [Attributes](#attributes) (`V:|[view2(view1.width)]`)
- [Z-ordering](#z-ordering) (`Z:|-[view1][view2]`)
- [Equal size spacers/centering](#equal-size-spacers--centering)(`|~[center(100)]~|`)
- [View stacks](#view-stacks) (`V:|[column:[header(50)][content][footer(50)]]|`)
- [View ranges (spread operator)](#view-ranges-spread-operator) (`H:[view1..8(10)]|`)
- [Multiple views](#multiple-views) (`Z:|[background][text1,text2,text3]|`)
- [Multiple orientations](#multiple-orientations-fill-content) (`HV:|[background]|`)
- [Disconnections (right/bottom alignment)](#disconnections-rightbottom-alignment) (`|[view1(200)]->[view2(100)]|`)
- [Negative values (overlapping views)](#negative-values-overlapping-views) (`|[view1]-(-10)-[view2]|`)
- [Explicit constraint syntax](#explicit-constraint-syntax) (`C:view1.centerX(view2.centerX)`)
- [Comments](#comments) (`[view1(view1.height/3)] // enfore aspect ratio 1/3`)

### Proportional size

To make the size proportional to the **size of the parent**, you can use the following % syntax:

    |-[view1(==50%)]    // view1 is 50% the width of the parent (regardless of any spacing)
    [view1(>=50%)]      // view1 should always be more than 50% the width of the parent

### Operators

Operators can be used to create linear equations of the form:
`view1.attr1 <relation> view2.attr2 * multiplier + constant`.

Syntax:

    (view[.{attribute}]['*'|'/'{value}]['+'|'-'{value}])

To, for instance, make the width or height proportional to **another view**, use:

    |-[view1(==view2/2)]-[view2]-|  // view1 is half the width of view2
    |-[view1(==view2*4-100)]-[view2]-|  // view1 is four times the width minus 100 of view2

### Attributes

In some cases it is useful to for instance make the **width equal to the height**. To do this you can
use the `.{attribute}` syntax, like this:

    |-[view1]-|
    V:|-[view1(view1.width)]

You can also combine with operators to for instance enforce a certain **aspect ratio**:

    V:|-[view1(view1.width/3)]

Supported attributes:

    .width
    .height
    .left
    .top
    .right
    .bottom
    .centerX
    .centerY

### Z-Ordering

When sub-views overlap it can be useful to specify the z-ordering for the sub-views:

    Z:|[child1][child2]  // child2 is placed in front of child1
    Z:|[background]-10-[child1..2]  // child1 and child2 are placed 10 units in-front of background

By default, all sub-views have a z-index of `0`. When placed in front of each other, the z-index
will be `1` higher than the sub-view it was placed in front of. The z-index of the sub-view can
be accessed through the `zIndex` property:

    console.log('zIndex: ' + view.subViews.child2.zIndex);

### Equal size spacers / centering

Sometimes you just want to center a view. To do this use the `~` connector:

    |~[view1(100)]~|        // view1 has width of 100 and is centered
    V:|~(10%)~[view2]~|     // top & bottom spacers have height of 10%

All `~` connectors inside a single line of EVFL are constrained to have the same size.
You can also use more than 2 connectors to proportionally align views:

    |~[child1(10)]~[child2(20)]~[child3(30)]~|

### View stacks

View stacks make it possible to group views into a column or a row.
The following example creates a view stack named `column` which contains three sub-views. The benefit of this is revealed in the second line, in which the stack as a whole is horizontally positioned.

    V:|[column:[top(50)][content][bottom(50)]]|
    H:|[column]|

### View ranges (spread operator)

View ranges make it possible to select multiple views at once and apply rules for them:

    //shapes circle1..5:circle
    H:[circle1(circle1.height)] // set aspect-ratio for circle1
    HV:[circle2..5(circle1)]    // use same width/height for other circles
    H:|[circle1]-[circle2]-[circle3]-[circle4]-[circle5]|
    V:|~[circle1..5]~|          // center all circles vertically

### Multiple views

Similar to 'View ranges', multiple views can be separated using the `,` character:

    H:|[left(top,right)]-[top,bottom]-[right]|
    V:|[left,right]|
    V:|[top(bottom)]-[bottom]|

### Multiple orientations (fill content)

Sometimes you just want to fill a view to its container. With standard VFL you have to write two lines, one for the horizontal orientation and one for vertical:

    H:|[background]|
    V:|[background]|

With Extended VFL, these can be combined into one line:

    HV:|[background]|

When using spacers, you can even use different spacings for horizontal & vertical orientations:

    //spacing: [10, 20]
    HV:|-[background]-|

### Disconnections (right/bottom alignment)

By default, views are interconnected when defined after each other (e.g. `[view1][view2][view3]`). In some cases
it is useful to not interconnect the views, in order to align content to the right or bottom. The following
example shows a disconnection causing the content after the disconnect to align to the right-edge:

```
 // left1..2 are left-aligned, right1..2 are right aligned
      |[left1(100)][left2(300)]->[right1(100)][right2(100)]|
      ^^                       ^^                         ^^
   left1 is                 left2 and                  right2 is
 connected to               right1 are                connected to
  super-view               not connected               super-view
```

### Negative values (overlapping views)

Numbers and percentages can also be negative, which can be useful for overlapping views:

    H:|[top,middle,bottom]|
    V:|[top(100)]-(-10)-[middle(top)]-(middle/-2)-[bottom]|
    Z:|[top][middle][bottom]

### Explicit constraint syntax

Constraints can also be expressed explicitly. This can be particularly useful
when it is otherwise not possible to express a layout or rule:

    C:view1.centerX(view2.centerX)     // view1 is horizontally centered to view2
    C:view1.centerX(view2)             // attribute is inferred when omitted (centerX)
    C:view1.centerX(view2).bottom(view2.bottom) // chaining syntax
    C:view1.height(view2.width*2+10)   // expressions

### Comments

Single line comments can be used to explain the VFL or to prevent its execution:

    // Enfore aspect ratios
    [view1(view1.height/3)] // enfore aspect ratio 1/3
    // [view2(view2.height/3)] <-- uncomment to enable

## Additional resources
- [Apple's Auto Layout](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/AutolayoutPG/index.html)
- [Visual Format Language](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/AutolayoutPG/VisualFormatLanguage.html)
- [Cassowary.js](https://github.com/slightlyoff/cassowary.js)
- [Kiwi.js](https://github.com/IjzerenHein/kiwi.js) (Fast TypeScript re-implementation of cassowary constraint solver)
- [Overconstrained](http://overconstrained.io)
- [Visual Format Editor](https://github.com/IjzerenHein/visualformat-editor)
- [famous-autolayout](https://github.com/IjzerenHein/famous-autolayout)
- [famous-flex](https://github.com/IjzerenHein/famous-flex)


## Roadmap

AutoLayout.js is pretty close to feature complete. The existing features have
been battle tested in several production environments and can be considered safe for production use.

The following features are still on the todo-list. Any help on making this
feature complete is very welcome:

- [ ] Checking for ambigous layout.
- [ ] DOM layouting primitives
- [ ] Remove constraints?
- [ ] Get constraint definitions from `View`
- [ ] LTR (left to right reading) (Attribute.LEADING & Attribute.TRAILING)
- [ ] Baseline support?


## Contribute

If you like this project and want to support it, show some love
and give it a star.

If you want to participate in development, drop me a line or just issue a pull request.
Also have a look at [CONTRIBUTING](./CONTRIBUTING.md).


## Contact
-   @IjzerenHein
-   hrutjes@gmail.com (for hire)

© 2015-2016 Hein Rutjes
