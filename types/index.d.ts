interface AutoLayout {
    VisualFormat: VisualFormat;

    View: ViewConstructor;
}

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

interface ViewConstructor {
    new <Names extends string = string>(options: ViewOptions): View<Names>;
}

interface View<Names extends string = string> {
    /**
     * Width that was set using setSize.
     */
    readonly width: number;

    /**
     * Height that was set using setSize.
     */
    readonly height: number;

    /**
     * Width that is calculated from the constraints and the .intrinsicWidth of the sub-views.
     * When the width has been explicitly set using setSize, the fittingWidth will always be the same as the
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
     * left-spacing is used when a spacer is used between the parent-view and a sub-view (e.g. |-[subView]). The
     * same is true for the right, top and bottom spacers. The width and height are used for spacers in between
     * sub-views (e.g. [view1]-[view2]).
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
  
```
view.setSpacing(10); // horizontal & vertical spacing 10 

view.setSpacing([10, 15, 2]); // horizontal spacing 10, vertical spacing 15, z-axis spacing 2 

view.setSpacing([10, 20, 10, 20, 5, 5]); // top, right, bottom, left, horizontal, vertical 

view.setSpacing([10, 20, 10, 20, 5, 5, 1]); // top, right, bottom, left, horizontal, vertical, z
```
  */
    setSpacing(spacing: number | number[]): View;

    addConstraint(constraint: Constraint): View;

    addConstraints(constraints: Constraint[]): View;

}
interface VisualFormat {
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
    parseMetaInfo(visualFormat: string | string[], options?: parseMetaInfoOptions): void;
}

interface parseMetaInfoOptions {
    /**
     * String that defines the end of a line (default \n).
     */
    lineSeparator?: string;

    /**
     * When specified, also processes the categories using that prefix (e.g. "-dev-viewport max-height:10").
     */
    prefix?: string;
}

interface ParseOptions extends ParseLineOptions {
    /**
     * When set to false trims any leading/trailing spaces and ignores empty lines (default: true).
     */
    strict?: boolean;

    /**
     * String that defines the end of a line (default \n).
     */
    lineSeparator?: string;
}

interface ParseLineOptions {
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

declare type Attribute = 'const' | 'var' | 'left' | 'right' | 'top' | 'bottom' | 'width' | 'height' | 'centerX' | 'centerY' | 'zIndex';

declare type Relation = 'leq' | 'equ' | 'gep';

interface Constraint {
    view1: string;
    attr1: Attribute;
    relation: Relation;
    view2?: String;
    attr2?: Attribute;
    multiplier?: Number;
    constant?: number;
    priority?: number;
}

interface SubView {
    left: number;
    top: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
    name: string;
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

    centerX: number;

    centerY: number;

    zIndex: number;

    type: String;

    getValue(attr: string): number | undefined;
}

export = AutoLayout
