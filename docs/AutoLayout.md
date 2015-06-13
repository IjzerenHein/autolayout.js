<a name="module_AutoLayout"></a>
## AutoLayout
AutoLayoutJS API reference.

### Index

|Entity|Type|Description|
|---|---|---|
|[AutoLayout](#autolayout)|`namespace`|Top level AutoLayout object.|
|[VisualFormat](#autolayout-visualformat)|`namespace`|Parses VFL into constraints.|
|[View](#autolayout-view)|`class`|Main entity for adding & evaluating constraints.|
|[SubView](#autolayout-subview)|`class`|SubView's are automatically created when constraints are added to views. They give access to the evaluated results.|
|[Attribute](#autolayout-attribute)|`enum`|Attribute types that are supported when adding constraints.|
|[Relation](#autolayout-relation)|`enum`|Relationship types that are supported when adding constraints.|

### AutoLayout


* [AutoLayout](#module_AutoLayout)
  * [~View](#module_AutoLayout..View)
    * [new View([options])](#new_module_AutoLayout..View_new)
    * [.width](#module_AutoLayout..View+width) : <code>Number</code>
    * [.height](#module_AutoLayout..View+height) : <code>Number</code>
    * [.subViews](#module_AutoLayout..View+subViews) : <code>Object.SubView</code>
    * [.setSize(width, height)](#module_AutoLayout..View+setSize) ⇒ <code>View</code>
    * [.setSpacing(spacing)](#module_AutoLayout..View+setSpacing) ⇒ <code>View</code>
    * [.addConstraint(constraint)](#module_AutoLayout..View+addConstraint) ⇒ <code>View</code>
    * [.addConstraints(constraints)](#module_AutoLayout..View+addConstraints) ⇒ <code>View</code>
  * [~Attribute](#module_AutoLayout..Attribute) : <code>enum</code>
  * [~Relation](#module_AutoLayout..Relation) : <code>enum</code>
  * [~SubView](#module_AutoLayout..SubView) : <code>object</code>
    * [.name](#module_AutoLayout..SubView+name) : <code>String</code>
    * [.left](#module_AutoLayout..SubView+left) : <code>Number</code>
    * [.right](#module_AutoLayout..SubView+right) : <code>Number</code>
    * [.width](#module_AutoLayout..SubView+width) : <code>Number</code>
    * [.height](#module_AutoLayout..SubView+height) : <code>Number</code>
    * [.top](#module_AutoLayout..SubView+top) : <code>Number</code>
    * [.bottom](#module_AutoLayout..SubView+bottom) : <code>Number</code>
    * [.centerX](#module_AutoLayout..SubView+centerX) : <code>Number</code>
    * [.centerY](#module_AutoLayout..SubView+centerY) : <code>Number</code>
    * [.getValue(attr)](#module_AutoLayout..SubView+getValue) ⇒ <code>Number</code>
  * [~VisualFormat](#module_AutoLayout..VisualFormat) : <code>object</code>
    * [.parseLine(visualFormat, [options])](#module_AutoLayout..VisualFormat.parseLine) ⇒ <code>Array</code>
    * [.parse(visualFormat, [options])](#module_AutoLayout..VisualFormat.parse) ⇒ <code>Array</code>

<a name="module_AutoLayout..View"></a>
### AutoLayout~View
**Kind**: inner class of <code>[AutoLayout](#module_AutoLayout)</code>  

* [~View](#module_AutoLayout..View)
  * [new View([options])](#new_module_AutoLayout..View_new)
  * [.width](#module_AutoLayout..View+width) : <code>Number</code>
  * [.height](#module_AutoLayout..View+height) : <code>Number</code>
  * [.subViews](#module_AutoLayout..View+subViews) : <code>Object.SubView</code>
  * [.setSize(width, height)](#module_AutoLayout..View+setSize) ⇒ <code>View</code>
  * [.setSpacing(spacing)](#module_AutoLayout..View+setSpacing) ⇒ <code>View</code>
  * [.addConstraint(constraint)](#module_AutoLayout..View+addConstraint) ⇒ <code>View</code>
  * [.addConstraints(constraints)](#module_AutoLayout..View+addConstraints) ⇒ <code>View</code>

<a name="new_module_AutoLayout..View_new"></a>
#### new View([options])

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | Configuration options. |
| [options.width] | <code>Number</code> | Initial width of the view. |
| [options.height] | <code>Number</code> | Initial height of the view. |
| [options.spacing] | <code>Number</code> &#124; <code>Object</code> | Spacing for the view (default: 8), see `setSpacing`. |
| [options.constraints] | <code>Array</code> | One or more constraint definitions. |

<a name="module_AutoLayout..View+width"></a>
#### view.width : <code>Number</code>
Width that was set using `setSize`.

**Kind**: instance property of <code>[View](#module_AutoLayout..View)</code>  
<a name="module_AutoLayout..View+height"></a>
#### view.height : <code>Number</code>
Height that was set using `setSize`.

**Kind**: instance property of <code>[View](#module_AutoLayout..View)</code>  
<a name="module_AutoLayout..View+subViews"></a>
#### view.subViews : <code>Object.SubView</code>
Dictionary of `SubView` objects that have been created when adding constraints.

**Kind**: instance property of <code>[View](#module_AutoLayout..View)</code>  
<a name="module_AutoLayout..View+setSize"></a>
#### view.setSize(width, height) ⇒ <code>View</code>
Sets the width and height of the view.

**Kind**: instance method of <code>[View](#module_AutoLayout..View)</code>  
**Returns**: <code>View</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| width | <code>Number</code> | Width of the view. |
| height | <code>Number</code> | Height of the view. |

<a name="module_AutoLayout..View+setSpacing"></a>
#### view.setSpacing(spacing) ⇒ <code>View</code>
Sets the spacing for the view.

The spacing can be set for 6 different variables:
`top`, `right`, `bottom`, `left`, `width` and `height`. The `left`-spacing is
used when a spacer is used between the parent-view and a sub-view (e.g. `|-[subView]`).
The same is true for the `right`, `top` and `bottom` spacers. The `width` and `height` are
used for spacers in between sub-views (e.g. `[view1]-[view2]`).

Instead of using the full spacing syntax, it is also possible to use shorthand notations:

|Syntax|Description|
|---|---|
|`[top, right, bottom, left, width, height]`|Full syntax **(clockwise order)**.|
|`[horizontal, vertical]`|Horizontal = left, right, width, vertical = top, bottom, height.|
|`spacing`|All spacing variables are the same.|

Examples:
```javascript
view.setSpacing(10); // all spacings 10
view.setSpacing([10, 15]); // horizontal spacing 10, and vertical spacing 15
view.setSpacing([10, 20, 10, 20, 5, 5]); // top, right, bottom, left, horizontal, vertical
```

**Kind**: instance method of <code>[View](#module_AutoLayout..View)</code>  
**Returns**: <code>View</code> - this  

| Param | Type |
| --- | --- |
| spacing | <code>Number</code> &#124; <code>Array</code> | 

<a name="module_AutoLayout..View+addConstraint"></a>
#### view.addConstraint(constraint) ⇒ <code>View</code>
Adds a constraint definition.

A constraint definition has the following format:

```javascript
constraint: {
  view1: {String},
  attr1: {AutoLayout.Attribute},
  relation: {AutoLayout.Relation},
  view2: {String},
  attr2: {AutoLayout.Attribute},
  multiplier: {Number},
  constant: {Number}
}
```

**Kind**: instance method of <code>[View](#module_AutoLayout..View)</code>  
**Returns**: <code>View</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| constraint | <code>Object</code> | Constraint definition. |

<a name="module_AutoLayout..View+addConstraints"></a>
#### view.addConstraints(constraints) ⇒ <code>View</code>
Adds one or more constraint definitions.

A constraint definition has the following format:

```javascript
constraint: {
  view1: {String},
  attr1: {AutoLayout.Attribute},
  relation: {AutoLayout.Relation},
  view2: {String},
  attr2: {AutoLayout.Attribute},
  multiplier: {Number},
  constant: {Number}
}
```

**Kind**: instance method of <code>[View](#module_AutoLayout..View)</code>  
**Returns**: <code>View</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| constraints | <code>Array</code> | One or more constraint definitions. |

<a name="module_AutoLayout..Attribute"></a>
### AutoLayout~Attribute : <code>enum</code>
Layout attributes.

**Kind**: inner enum property of <code>[AutoLayout](#module_AutoLayout)</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| CONST | <code>String</code> | <code>const</code> |  |
| NOTANATTRIBUTE | <code>String</code> | <code>const</code> |  |
| VARIABLE | <code>String</code> | <code>var</code> |  |
| LEFT | <code>String</code> | <code>left</code> | left aligned |
| RIGHT | <code>String</code> | <code>right</code> | right aligned |
| TOP | <code>String</code> | <code>top</code> |  |
| BOTTOM | <code>String</code> | <code>bottom</code> |  |
| WIDTH | <code>String</code> | <code>width</code> |  |
| HEIGHT | <code>String</code> | <code>height</code> |  |
| CENTERX | <code>String</code> | <code>centerX</code> |  |
| CENTERY | <code>String</code> | <code>centerY</code> |  |

<a name="module_AutoLayout..Relation"></a>
### AutoLayout~Relation : <code>enum</code>
Relation types.

**Kind**: inner enum property of <code>[AutoLayout](#module_AutoLayout)</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| LEQ | <code>String</code> | <code>leq</code> | Less than or equal |
| EQU | <code>String</code> | <code>equ</code> | Equal |
| GEQ | <code>String</code> | <code>geq</code> | Greater than or equal |

<a name="module_AutoLayout..SubView"></a>
### AutoLayout~SubView : <code>object</code>
A SubView is automatically generated when constraints are added to a View.

**Kind**: inner namespace of <code>[AutoLayout](#module_AutoLayout)</code>  

* [~SubView](#module_AutoLayout..SubView) : <code>object</code>
  * [.name](#module_AutoLayout..SubView+name) : <code>String</code>
  * [.left](#module_AutoLayout..SubView+left) : <code>Number</code>
  * [.right](#module_AutoLayout..SubView+right) : <code>Number</code>
  * [.width](#module_AutoLayout..SubView+width) : <code>Number</code>
  * [.height](#module_AutoLayout..SubView+height) : <code>Number</code>
  * [.top](#module_AutoLayout..SubView+top) : <code>Number</code>
  * [.bottom](#module_AutoLayout..SubView+bottom) : <code>Number</code>
  * [.centerX](#module_AutoLayout..SubView+centerX) : <code>Number</code>
  * [.centerY](#module_AutoLayout..SubView+centerY) : <code>Number</code>
  * [.getValue(attr)](#module_AutoLayout..SubView+getValue) ⇒ <code>Number</code>

<a name="module_AutoLayout..SubView+name"></a>
#### subView.name : <code>String</code>
Name of the sub-view.

**Kind**: instance property of <code>[SubView](#module_AutoLayout..SubView)</code>  
**Read only**: true  
<a name="module_AutoLayout..SubView+left"></a>
#### subView.left : <code>Number</code>
Left value (`Attribute.LEFT`).

**Kind**: instance property of <code>[SubView](#module_AutoLayout..SubView)</code>  
**Read only**: true  
<a name="module_AutoLayout..SubView+right"></a>
#### subView.right : <code>Number</code>
Right value (`Attribute.RIGHT`).

**Kind**: instance property of <code>[SubView](#module_AutoLayout..SubView)</code>  
**Read only**: true  
<a name="module_AutoLayout..SubView+width"></a>
#### subView.width : <code>Number</code>
Width value (`Attribute.WIDTH`).

**Kind**: instance property of <code>[SubView](#module_AutoLayout..SubView)</code>  
**Read only**: true  
<a name="module_AutoLayout..SubView+height"></a>
#### subView.height : <code>Number</code>
Height value (`Attribute.HEIGHT`).

**Kind**: instance property of <code>[SubView](#module_AutoLayout..SubView)</code>  
**Read only**: true  
<a name="module_AutoLayout..SubView+top"></a>
#### subView.top : <code>Number</code>
Top value (`Attribute.TOP`).

**Kind**: instance property of <code>[SubView](#module_AutoLayout..SubView)</code>  
**Read only**: true  
<a name="module_AutoLayout..SubView+bottom"></a>
#### subView.bottom : <code>Number</code>
Bottom value (`Attribute.BOTTOM`).

**Kind**: instance property of <code>[SubView](#module_AutoLayout..SubView)</code>  
**Read only**: true  
<a name="module_AutoLayout..SubView+centerX"></a>
#### subView.centerX : <code>Number</code>
Horizontal center (`Attribute.CENTERX`).

**Kind**: instance property of <code>[SubView](#module_AutoLayout..SubView)</code>  
**Read only**: true  
<a name="module_AutoLayout..SubView+centerY"></a>
#### subView.centerY : <code>Number</code>
Vertical center (`Attribute.CENTERY`).

**Kind**: instance property of <code>[SubView](#module_AutoLayout..SubView)</code>  
**Read only**: true  
<a name="module_AutoLayout..SubView+getValue"></a>
#### subView.getValue(attr) ⇒ <code>Number</code>
Gets the value of one of the attributes.

**Kind**: instance method of <code>[SubView](#module_AutoLayout..SubView)</code>  
**Returns**: <code>Number</code> - value or `undefined`  

| Param | Type | Description |
| --- | --- | --- |
| attr | <code>String</code> &#124; <code>Attribute</code> | Attribute name (e.g. 'right', 'centerY', Attribute.TOP). |

<a name="module_AutoLayout..VisualFormat"></a>
### AutoLayout~VisualFormat : <code>object</code>
VisualFormat

**Kind**: inner namespace of <code>[AutoLayout](#module_AutoLayout)</code>  

* [~VisualFormat](#module_AutoLayout..VisualFormat) : <code>object</code>
  * [.parseLine(visualFormat, [options])](#module_AutoLayout..VisualFormat.parseLine) ⇒ <code>Array</code>
  * [.parse(visualFormat, [options])](#module_AutoLayout..VisualFormat.parse) ⇒ <code>Array</code>

<a name="module_AutoLayout..VisualFormat.parseLine"></a>
#### VisualFormat.parseLine(visualFormat, [options]) ⇒ <code>Array</code>
Parses a single line of vfl into an array of constraint definitions.

When the visual-format could not be succesfully parsed an exception is thrown containing
additional info about the parse error and column position.

**Kind**: static method of <code>[VisualFormat](#module_AutoLayout..VisualFormat)</code>  
**Returns**: <code>Array</code> - Array of constraint definitions.  

| Param | Type | Description |
| --- | --- | --- |
| visualFormat | <code>String</code> | Visual format string (cannot contain line-endings!). |
| [options] | <code>Object</code> | Configuration options. |
| [options.extended] | <code>Boolean</code> | When set to true uses the extended syntax (default: false). |
| [options.outFormat] | <code>String</code> | Output format (`constraints` or `raw`) (default: `constraints`). |

<a name="module_AutoLayout..VisualFormat.parse"></a>
#### VisualFormat.parse(visualFormat, [options]) ⇒ <code>Array</code>
Parses one or more visual format strings into an array of constraint definitions.

When the visual-format could not be succesfully parsed an exception is thrown containing
additional info about the parse error and column position.

**Kind**: static method of <code>[VisualFormat](#module_AutoLayout..VisualFormat)</code>  
**Returns**: <code>Array</code> - Array of constraint definitions.  

| Param | Type | Description |
| --- | --- | --- |
| visualFormat | <code>String</code> &#124; <code>Array</code> | One or more visual format strings. |
| [options] | <code>Object</code> | Configuration options. |
| [options.extended] | <code>Boolean</code> | When set to true uses the extended syntax (default: false). |
| [options.lineSeperator] | <code>String</code> | String that defines the end of a line (default `\n`). |
| [options.outFormat] | <code>String</code> | Output format (`constraints` or `raw`) (default: `constraints`). |

