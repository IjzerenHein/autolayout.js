interface ViewOptions {
    /**
     * One or more constraint definitions.
     */
    constraints: Constraint[];

    /**
     * Spacing for the view.
     */
    spacing?: number | number[];

    /**
     * Initial height of the view.
     */
    height?: number;

    /**
     * Initial width of the view.
     */
    width?: number;
}

declare interface ViewConstructor {
    new <Names extends string = string>(options: ViewOptions): View<Names>;
}

export declare const View: ViewConstructor;

/**
 * Main entity for adding & evaluating constraints.
 */
declare interface View<Names extends string = string> {
    /**
     * Width that was set using [[setSize]].
     */
    readonly width: number;

    /**
     * Height that was set using [[setSize]].
     */
    readonly height: number;

    /**
     * Width that is calculated from the constraints and the [[intrinsicWidth]] of the sub-views. When the
     * width has been explicitly set using [[setSize]], the [[fittingWidth]] will always be the same as the
     * explicitly set width. To calculate the size based on the content, use:
     *
    ```js
     var view = new AutoLayout.View({constraints: VisualFormat.parse('|-[view1]-[view2]-'), spacing: 20
    });
     view.subViews.view1.intrinsicWidth = 100; view.subViews.view2.intrinsicWidth = 100;
     console.log('fittingWidth: ' + view.fittingWidth); // 260
    ```
    */
    fittingWidth: number;

    /**
     * Height that is calculated from the constraints and the .intrinsicHeight of the sub-views. See
     * [[fittingWidth]].
     */
    fittingHeight: number;

    /**
     * Dictionary of SubView objects that have been created when adding constraints.
     */
    subViews: {
        [name in Names]: SubView;
    };

    /**
     * Sets the width and height of the view.
     */
    setSize(width: number, height: number): View;

    /**
     * Sets the spacing for the view.
     *
     * The spacing can be set for 7 different variables: top, right, bottom, left, width, height and zIndex. The
     * left-spacing is used when a spacer is used between the parent-view and a sub-view (e.g. `|-[subView]`). The
     * same is true for the right, top and bottom spacers. The width and height are used for spacers in between
     * sub-views (e.g. `[view1]-[view2]`).
     *
     * Instead of using the full spacing syntax, it is also possible to use shorthand notations:
     *
     * |Syntax|Type|Description|
     * |---|---|---|
     * |[top, right, bottom, left, width, height, zIndex]|Array(7)|Full syntax including z-index (clockwise
     * order).| |[top, right, bottom, left, width, height]|Array(6)|Full horizontal & vertical spacing syntax
     * (no z-index) (clockwise order).| |[horizontal, vertical, zIndex]|Array(3)|Horizontal = left, right,
     * width, vertical = top, bottom, height.| |[horizontal, vertical]|Array(2)|Horizontal = left, right, width,
     *   vertical = top, bottom, height, z-index = 1.| |spacing|number|Horizontal & vertical spacing are all the
     *   same, z-index = 1.|
     
  Examples:
   
  ```js
  view.setSpacing(10); // horizontal & vertical spacing 10 
  view.setSpacing([10, 15, 2]); // horizontal spacing 10, vertical spacing 15, z-axis spacing 2 
  view.setSpacing([10, 20, 10, 20, 5, 5]); // top, right, bottom, left, horizontal, vertical 
  view.setSpacing([10, 20, 10, 20, 5, 5, 1]); // top, right, bottom, left, horizontal, vertical, z
  ```
  */
    setSpacing(spacing: number | number[]): View;

    /**
     * Adds a constraint definition.
     * A constraint definition has the following format:
  
  ```
  constraint: {
    view1: {String},
    attr1: {AutoLayout.Attribute},
    relation: {AutoLayout.Relation},
    view2: {String},
    attr2: {AutoLayout.Attribute},
    multiplier: {Number},
    constant: {Number},
    priority: {Number}(0..1000)
  }
  ```
      */
    addConstraint(constraint: Constraint): View;

    /**
     * Adds one or more constraint definitions. See [[addConstraint]]
     */
    addConstraints(constraints: Constraint[]): View;
}

export declare const VisualFormat: VisualFormat;

/**
 * Parses VFL into constraints.
 */
declare interface VisualFormat {
    /**
     * Parses one or more visual format strings into an array of constraint definitions. When the visual-format
     * could not be successfully parsed an exception is thrown containing additional info about the parse error
     * and column position.
     */
    parse(constraints: string[], options?: ParseOptions): Constraint[];

    /**
     * Parses a single line of vfl into an array of constraint definitions. When the visual-format could not be
     * successfully parsed an exception is thrown containing additional info about the parse error and column
     * position.
     */
    parseLine(visualFormat: string, options?: ParseLineOptions): Constraint[];

    /**
     * Parses meta information from the comments in the VFL. 
     * 
     * Additional meta information can be specified in the comments for previewing and rendering purposes. 
     * For instance, the view-port aspect-ratio, sub-view widths and colors, can be specified. 
     * 
     * The following example renders three colored circles in the visual-format editor:
   
  ```vfl
  //viewport aspect-ratio:3/1 max-height:300
  //colors red:#FF0000 green:#00FF00 blue:#0000FF
  //shapes red:circle green:circle blue:circle
  H:|-[row:[red(green,blue)]-[green]-[blue]]-|
  V:|[row]|
  ```
   
     * Supported categories and properties:
     *   
     *   |Category|Property|Example|
     *   |--------|--------|-------|
     *   |`viewport`|`aspect-ratio:{width}/{height}`|`//viewport aspect-ratio:16/9`|
     *   ||`width:[{number}/intrinsic]`|`//viewport width:10`|
     *   ||`height:[{number}/intrinsic]`|`//viewport height:intrinsic`|
     *   ||`min-width:{number}`|
     *   ||`max-width:{number}`|
     *   ||`min-height:{number}`|
     *   ||`max-height:{number}`|
     *   |`spacing`|`[{number}/array]`|`//spacing:8` or `//spacing:[10, 20, 5]`|
     *   |`widths`|`{view-name}:[{number}/intrinsic]`|`//widths subview1:100`|
     *   |`heights`|`{view-name}:[{number}/intrinsic]`|`//heights subview1:intrinsic`|
     *   |`colors`|`{view-name}:{color}`|`//colors redview:#FF0000 blueview:#00FF00`|
     *   |`shapes`|`{view-name}:[circle/square]`|`//shapes avatar:circle`|
  
     */
    parseMetaInfo(visualFormat: string | string[], options?: ParseMetaInfoOptions): void;
}

declare interface ParseMetaInfoOptions {
    /**
     * string that defines the end of a line (default `\n`).
     */
    lineSeparator?: string;

    /**
     * When specified, also processes the categories using that prefix (e.g. "-dev-viewport max-height:10").
     */
    prefix?: string;
}

declare interface ParseOptions extends ParseLineOptions {
    /**
     * When set to false trims any leading/trailing spaces and ignores empty lines (default: true).
     */
    strict?: boolean;

    /**
     * string that defines the end of a line (default `\n`).
     */
    lineSeparator?: string;
}

declare interface ParseLineOptions {
    /**
     * When set to true uses the extended syntax (default: false).
     */
    extended?: boolean;

    /**
     * Output format (constraints or raw) (default: constraints).
     */
    spacing?: number;

    /**
     * Output format (constraints or raw) (default: constraints).
     */
    outFormat?: 'constraints' | 'raw';
}

/**
 * The relationship between two user interface objects that must be satisfied by the constraint-based layout
 * system.
 *
 * The properties are identical to those of
 * [NSLayoutConstraint](https://developer.apple.com/documentation/uikit/nslayoutconstraint). 
 *
 * To constrain `view` to its parent view, use `null` for `view2`. 
 *
 * Each constraint is a linear equation with the following format: 
 *
 * ```item1.attribute1 = multiplier × item2.attribute2 + constant```
 *
 * In this equation, attribute1 and attribute2 are the variables that Auto Layout can adjust when solving
 * these constraints. The other values are defined when you create the constraint. 
 */
declare interface Constraint {
    view1: string;
    attr1: Attribute;
    relation: Relation;
    view2?: string;
    attr2?: Attribute;
    multiplier?: number;
    constant?: number;
    priority?: Priority | number;
}

/**
 * Default priority values for when adding constraints.
 */
export declare enum Priority {
    REQUIRED = 1000,

    DEFAULTHIGH = 750,

    DEFAULTLOW = 250
}

/**
 * Relationship types that are supported when adding constraints.
 */
export declare enum Relation {
    /**
     * Less than or equal.
     */
    LEQ = 'leq',
    /**
     * Equal.
     */
    EQU = 'equ',
    /**
     * Greater than or equal.
     */
    GEQ = 'geq'
}

/**
 * Attribute types that are supported when adding constraints.
 */
export declare enum Attribute {
    CONST = 'const',
    NOTANATTRIBUTE = 'const',
    VARIABLE = 'var',
    LEFT = 'left',
    RIGHT = 'right',
    TOP = 'top',
    BOTTOM = 'bottom',
    WIDTH = 'width',
    HEIGHT = 'height',
    CENTERX = 'centerX',
    CENTERY = 'centerY',
    ZINDEX = 'zIndex'
}

/**
 * SubView's are automatically created when constraints are added to views. They give access to the evaluated results.
 */
declare interface SubView {

    /**
     * Left value (Attribute.LEFT).
     */
    readonly left: number;

    /**
     * Top value (Attribute.TOP).
     */
    readonly top: number;

    /**
     * Right value (Attribute.RIGHT).
     */
    readonly right: number;

    /**
     * Bottom value (Attribute.BOTTOM).
     */
    readonly bottom: number;

    /**
     * Width value (Attribute.WIDTH).
     */
    readonly width: number;

    /**
     * Height value (Attribute.HEIGHT).
     */
    readonly height: number;

    /**
     * The name of the sub-view, which is also the key of the sub-view in the [[View]] instance, e.g: 
     * `view.subViews[name].name === name`.
     */
    readonly name: string;

    /**
     * Intrinsic width of the sub-view. Use this property to explicitly set the width of the sub-view, e.g.:
   
  ```js
  var view = new AutoLayout.View(AutoLayout.VisualFormat.parse('|[child1][child2]|'), {width: 500});
  view.subViews.child1.intrinsicWidth = 100; console.log('child2 width: ' + view.subViews.child2.width); // 400
  ```
     */
    intrinsicWidth: number;

    /**
     * Intrinsic height of the subView. See [[intrinsicWidth]].
     */
    intrinsicHeight: number;

    /**
     * Horizontal center (Attribute.CENTERX).
     */
    readonly centerX: number;

    /**
     * Vertical center (Attribute.CENTERY).
     */
    readonly centerY: number;

    /**
     * When sub-views overlap it can be useful to specify the z-ordering for the sub-views:
     * 
  ```
  Z:|[child1][child2]  // child2 is placed in front of child1
  Z:|[background]-10-[child1..2]  // child1 and child2 are placed 10 units in-front of background
  ```
  
     * By default, all sub-views have a z-index of 0. When placed in front of each other, the z-index will 
     * be 1 higher than the sub-view it was placed in front of. The z-index of the sub-view can be accessed 
     * through the `zIndex` property:
  
  ```js
  console.log('zIndex: ' + view.subViews.child2.zIndex);
  ```
     */
    readonly zIndex: number;

    /**
     * Returns the type of the sub-view.
     */
    readonly type: string;

    /**
     * Gets the value of one of the attributes.
     * @param attr - Attribute name (e.g. 'right', 'centerY', Attribute.TOP).
     */
    getValue(attr: string | Attribute): number | undefined;
}
