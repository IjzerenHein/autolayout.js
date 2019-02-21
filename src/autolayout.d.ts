
declare module 'autolayout'
{
    /**
     * [top, right, bottom, left, width, height, zIndex] Full syntax including z-index (clockwise order).
     * [top, right, bottom, left, width, height] Full horizontal & vertical spacing syntax (no z-index) (clockwise order).
     * [horizontal, vertical, zIndex] Horizontal = left, right, width, vertical = top, bottom, height.
     * [horizontal, vertical] 	Array(2) Horizontal = left, right, width, vertical = top, bottom, height, z-index = 1.
     * spacing Number Horizontal & vertical spacing are all the same, z-index = 1.
     */
    type Spacing = number | [number,number] | [number,number,number] | [number,number,number,number,number,number] | [number,number,number,number,number,number,number];

    /**
     * Layout attributes.
     */
    enum Attribute
    {
        CONST,
        NOTANATTRIBUTE,
        VARIABLE,
        LEFT,
        RIGHT,
        TOP,
        BOTTOM,
        WIDTH,
        HEIGHT,
        CENTERX,
        CENTERY,
        ZINDEX,
    }

    /**
     * Relation types.
     */
    enum Relation
    {
        LEQ,
        EQU,
        GEQ
    }

    /**
     * Layout priorities.
     */
    enum Priority
    {
        REQUIRED,
        DEFAULTHIGH ,
        DEFAULTLOW
    }

    type ConstraintDef = {
        view1: {String},
        attr1: Attribute,
        relation: Relation,
        view2: string,
        attr2: Attribute,
        multiplier: number,
        constant: number,
        priority: number
    };

    class View
    {
        /** @private */
        _solver:any;

        /**
         * @param options Configuration options.
         * @param options.width Initial width of the view.
         * @param options.height Initial height of the view.
         * @param options.spacing Spacing for the view (default: 8).
         * @param options.constraints One or more constraint definitions.
         * @see setSpacing
         * @see addConstraints
         */
        constructor(options?:{width?:number, height?:number, spacing?:Spacing, constraints?:Array<ConstraintDef>});

        /**
         * Width that was set using setSize.
         */
        readonly width : number;

        /**
         * Height that was set using setSize.
         */
        readonly height: number;

        /**
         * Width that is calculated from the constraints and the .intrinsicWidth of the sub-views.
         *  When the width has been explicitely set using setSize, the fittingWidth will always be the same as the explicitely set width. To calculate the size based on the content, use:
         * ```js
         * var view = new AutoLayout.View({
         * constraints: VisualFormat.parse('|-[view1]-[view2]-'),
         * spacing: 20
         * });
         * view.subViews.view1.intrinsicWidth = 100;
         * view.subViews.view2.intrinsicWidth = 100;
         * console.log('fittingWidth: ' + view.fittingWidth); // 260
         * ```
         */
        readonly fittingWidth:number;

        /**
         * Height that is calculated from the constraints and the .intrinsicHeight of the sub-views.
         * @see fittingWidth.
         */
        readonly fittingHeight:number;

        /**
         * Dictionary of SubView objects that have been created when adding constraints.
         */
        readonly subViews: {[k:string]:SubView};

        /**
         * Sets the width and height of the view.
         * @param width
         * @param height
         * @returns this
         */
        setSize(width:number, height:number):View;

        /**
         * Sets the spacing for the view.
         * The spacing can be set for 7 different variables: top, right, bottom, left, width, height and zIndex.
         * The left-spacing is used when a spacer is used between the parent-view and a sub-view (e.g. |-[subView]).
         * The same is true for the right, top and bottom spacers.
         * The width and height are used for spacers in between sub-views (e.g. [view1]-[view2]).
         * Examples:
         * ```js
         * view.setSpacing(10); // horizontal & vertical spacing 10
         * view.setSpacing([10, 15, 2]); // horizontal spacing 10, vertical spacing 15, z-axis spacing 2
         * view.setSpacing([10, 20, 10, 20, 5, 5]); // top, right, bottom, left, horizontal, vertical
         * view.setSpacing([10, 20, 10, 20, 5, 5, 1]); // top, right, bottom, left, horizontal, vertical, z
         * ```
         * @param spacing
         * @returns this
         */
        setSpacing(spacing: Spacing):View;

        /**
         * Adds a constraint definition.
         * @param constraint
         * @returns this
         */
        addConstraint(constraint: ConstraintDef) : View;

        /**
         * Adds one or more constraint definitions.
         * @param constraints
         * @returns this
         */
        addConstraints(constraints: ReadonlyArray<ConstraintDef>) : View;
    }

    /**
     * A SubView is automatically generated when constraints are added to a View.
     */
    class SubView
    {
        /** @private */
        _solver:any;

        /** @private */
        _getAttr(attr:string) : Attribute;

        /**
         * Name of the sub-view.
         */
        readonly name : string;

        /**
         * Left value (Attribute.LEFT).
         */
        readonly left : number;

        /**
         * Right value (Attribute.RIGHT).
         */
        readonly right : number;

        /**
         * Width value (Attribute.WIDTH).
         */
        readonly width : number;

        /**
         * Height value (Attribute.HEIGHT).
         */
        readonly height : number;

        /**
         * Intrinsic width of the sub-view.
         * Use this property to explicitely set the width of the sub-view, e.g.:
         * ```js
         * let view = new AutoLayout.View(AutoLayout.VisualFormat.parse('|[child1][child2]|'), {
         *     width: 500
         * });
         * view.subViews.child1.intrinsicWidth = 100;
         * console.log('child2 width: ' + view.subViews.child2.width); // 400
         * ```
         * */
        intrinsicWidth : number;

        /**
         * Intrinsic height of the sub-view.
         * @see intrinsicWidth.
         */
        intrinsicHeight : number;

        /**
         * Top value (Attribute.TOP).
         */
        readonly top : number;

        /**
         * Bottom value (Attribute.BOTTOM).
         */
        readonly bottom : number;

        /**
         * Horizontal center (Attribute.CENTERX).
         */
        readonly centerX : number;

        /**
         * Vertical center (Attribute.CENTERY).
         */
        readonly centerY : number;

        /**
         * Z-index (Attribute.ZINDEX).
         */
        readonly zIndex : number;

        /**
         * Returns the type of the sub-view.
         */
        readonly type : string;

        /**
         * Gets the value of one of the attributes.
         * @param attr Attribute name (e.g. 'right', 'centerY', Attribute.TOP).
         */
        getValue(attr: string | Attribute): number;
    }

    module VisualFormat
    {
        /**
         * Parses a single line of vfl into an array of constraint definitions.
         * When the visual-format could not be succesfully parsed an exception is thrown containing additional info about the parse error and column position.
         * @param visualFormat 	Visual format string (cannot contain line-endings!).
         * @param options Configuration options.
         * @param options.extended When set to true uses the extended syntax (default: false).
         * @param options.outFormat Output format (constraints or raw) (default: constraints).
         * @param options.lineIndex Line-index used when auto generating equal-spacing constraints.
         * @returns Array of constraint definitions.
         */
        function parseLine(visualFormat: string | Array<string>, options?:{extended?:boolean, outFormat?:'constraints'|'raw', lineIndex?:number}): Array<ConstraintDef>;

        /**
         * Parses one or more visual format strings into an array of constraint definitions.
         * When the visual-format could not be succesfully parsed an exception is thrown containing additional info about the parse error and column position.
         * @param visualFormat One or more visual format strings.
         * @param options Object Configuration options.
         * @param options.extended When set to true uses the extended syntax (default: false).
         * @param options.strict When set to false trims any leading/trailing spaces and ignores empty lines (default: true).
         * @param options.lineSeparator String that defines the end of a line (default \n).
         * @param options.outFormat Output format (constraints or raw) (default: constraints).
         * @returns  Array of constraint definitions.
         */
        function parse(visualFormat: string | Array<string>, options?:{extended?: boolean, strict?:boolean, lineSeparator?:string, outFormat?: 'constraints'|'raw'}): Array<ConstraintDef>;

        /**
         * Parses meta information from the comments in the VFL.
         * Additional meta information can be specified in the comments for previewing and rendering purposes. For instance, the view-port aspect-ratio, sub-view widths and colors, can be specified. The following example renders three colored circles in the visual-format editor:
         * ```js
         * //viewport aspect-ratio:3/1 max-height:300
         * //colors red:#FF0000 green:#00FF00 blue:#0000FF
         * //shapes red:circle green:circle blue:circle
         * H:|-[row:[red(green,blue)]-[green]-[blue]]-|
         * V:|[row]|
         * ```
         * @param visualFormat 	String | Array 	One or more visual format strings.
         * @param options Configuration options.
         * @param options.lineSeparator String that defines the end of a line (default \n).
         * @param options.prefix When specified, also processes the categories using that prefix (e.g. "-dev-viewport max-height:10").
         * @returns  meta-info
         */
        function parseMetaInfo(visualFormat: string | Array<string>, options?: {lineSparator?: string, prefix?: string}): Object;
    }

}

