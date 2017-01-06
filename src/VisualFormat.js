import parser from './parser/parser';
import parserExt from './parser/parserExt';
import Attribute from './Attribute';
import Relation from './Relation';

const Orientation = {
    HORIZONTAL: 1,
    VERTICAL: 2,
    ZINDEX: 4
};

/**
 * Helper function that inserts equal spacers (~).
 * @private
 */
function _processEqualSpacer(context, stackView) {

    // Determine unique name for the spacer
    context.equalSpacerIndex = context.equalSpacerIndex || 1;
    const name = '_~' + context.lineIndex + ':' + context.equalSpacerIndex + '~';
    if (context.equalSpacerIndex > 1) {

        // Ensure that all spacers have the same width/height
        context.constraints.push({
            view1: '_~' + context.lineIndex + ':1~',
            attr1: context.horizontal ? Attribute.WIDTH : Attribute.HEIGHT,
            relation: context.relation.relation || Relation.EQU,
            view2: name,
            attr2: context.horizontal ? Attribute.WIDTH : Attribute.HEIGHT,
            priority: context.relation.priority
        });
    }
    context.equalSpacerIndex++;

    // Enforce view/proportional width/height
    if (context.relation.view || (context.relation.multiplier && (context.relation.multiplier !== 1))) {
        context.constraints.push({
            view1: name,
            attr1: context.horizontal ? Attribute.WIDTH : Attribute.HEIGHT,
            relation: context.relation.relation || Relation.EQU,
            view2: context.relation.view,
            attr2: context.horizontal ? Attribute.WIDTH : Attribute.HEIGHT,
            priority: context.relation.priority,
            multiplier: context.relation.multiplier
        });
        context.relation.multiplier = undefined;
    }
    else if (context.relation.constant) {
        context.constraints.push({
            view1: name,
            attr1: context.horizontal ? Attribute.WIDTH : Attribute.HEIGHT,
            relation: Relation.EQU,
            view2: null,
            attr2: Attribute.CONST,
            priority: context.relation.priority,
            constant: context.relation.constant
        });
        context.relation.constant = undefined;
    }

    // Add constraint
    for (var i = 0; i < context.prevViews.length; i++) {
        const prevView = context.prevViews[i];
        switch (context.orientation) {
            case Orientation.HORIZONTAL:
                context.prevAttr = (prevView !== stackView) ? Attribute.RIGHT : Attribute.LEFT;
                context.curAttr = Attribute.LEFT;
                break;
            case Orientation.VERTICAL:
                context.prevAttr = (prevView !== stackView) ? Attribute.BOTTOM : Attribute.TOP;
                context.curAttr = Attribute.TOP;
                break;
            case Orientation.ZINDEX:
                context.prevAttr = Attribute.ZINDEX;
                context.curAttr = Attribute.ZINDEX;
                context.relation.constant = (prevView !== stackView) ? 'default' : 0;
                break;
        }
        context.constraints.push({
            view1: prevView,
            attr1: context.prevAttr,
            relation: context.relation.relation,
            view2: name,
            attr2: context.curAttr,
            priority: context.relation.priority
        });
    }
    context.prevViews = [name];
}

/**
 * Helper function that inserts proportional spacers (-12%-).
 * @private
 */
function _processProportionalSpacer(context, stackView) {
    context.proportionalSpacerIndex = context.proportionalSpacerIndex || 1;
    const name = '_-' + context.lineIndex + ':' + context.proportionalSpacerIndex + '-';
    context.proportionalSpacerIndex++;
    context.constraints.push({
        view1: name,
        attr1: context.horizontal ? Attribute.WIDTH : Attribute.HEIGHT,
        relation: context.relation.relation || Relation.EQU,
        view2: context.relation.view, // or relative to the stackView... food for thought
        attr2: context.horizontal ? Attribute.WIDTH : Attribute.HEIGHT,
        priority: context.relation.priority,
        multiplier: context.relation.multiplier
    });
    context.relation.multiplier = undefined;

    // Add constraint
    for (var i = 0; i < context.prevViews.length; i++) {
        const prevView = context.prevViews[i];
        switch (context.orientation) {
            case Orientation.HORIZONTAL:
                context.prevAttr = (prevView !== stackView) ? Attribute.RIGHT : Attribute.LEFT;
                context.curAttr = Attribute.LEFT;
                break;
            case Orientation.VERTICAL:
                context.prevAttr = (prevView !== stackView) ? Attribute.BOTTOM : Attribute.TOP;
                context.curAttr = Attribute.TOP;
                break;
            case Orientation.ZINDEX:
                context.prevAttr = Attribute.ZINDEX;
                context.curAttr = Attribute.ZINDEX;
                context.relation.constant = (prevView !== stackView) ? 'default' : 0;
                break;
        }
        context.constraints.push({
            view1: prevView,
            attr1: context.prevAttr,
            relation: context.relation.relation,
            view2: name,
            attr2: context.curAttr,
            priority: context.relation.priority
        });
    }
    context.prevViews = [name];
}

/**
 * In case of a stack-view, set constraints for opposite orientations
 * @private
 */
function _processStackView(context, name, subView) {
    let viewName;
    for (var orientation = 1; orientation <= 4; orientation *= 2) {
        if ((subView.orientations & orientation) &&
            (subView.stack.orientation !== orientation) &&
            !(subView.stack.processedOrientations & orientation)) {
            subView.stack.processedOrientations = subView.stack.processedOrientations | orientation;
            viewName = viewName || {
                name: name,
                type: 'stack'
            };
            for (var i = 0, j = subView.stack.subViews.length; i < j; i++) {
                if (orientation === Orientation.ZINDEX) {
                    context.constraints.push({
                        view1: viewName,
                        attr1: Attribute.ZINDEX,
                        relation: Relation.EQU,
                        view2: subView.stack.subViews[i],
                        attr2: Attribute.ZINDEX
                    });
                }
                else {
                    context.constraints.push({
                        view1: viewName,
                        attr1: (orientation === Orientation.VERTICAL) ? Attribute.HEIGHT : Attribute.WIDTH,
                        relation: Relation.EQU,
                        view2: subView.stack.subViews[i],
                        attr2: (orientation === Orientation.VERTICAL) ? Attribute.HEIGHT : Attribute.WIDTH
                    });
                    context.constraints.push({
                        view1: viewName,
                        attr1: (orientation === Orientation.VERTICAL) ? Attribute.TOP : Attribute.LEFT,
                        relation: Relation.EQU,
                        view2: subView.stack.subViews[i],
                        attr2: (orientation === Orientation.VERTICAL) ? Attribute.TOP : Attribute.LEFT
                    });
                }
            }
        }
    }
}

/**
 * Recursive helper function converts a view-name and a range to a series
 * of view-names (e.g. [child1, child2, child3, ...]).
 * @private
 */
function _getRange(name, range) {
    if (range === true) {
        range = name.match(/\.\.\d+$/);
        if (range) {
            name = name.substring(0, name.length - range[0].length);
            range = parseInt(range[0].substring(2));
        }
    }
    if (!range) {
        return [name];
    }
    var start = name.match(/\d+$/);
    var res = [];
    var i;
    if (start) {
        name = name.substring(0, name.length - start[0].length);
        for (i = parseInt(start); i <= range; i++) {
            res.push(name + i);
        }
    }
    else {
        res.push(name);
        for (i = 2; i <= range; i++) {
            res.push(name + i);
        }
    }
    return res;
}

/**
 * Recursive helper function that processes the cascaded data.
 * @private
 */
function _processCascade(context, cascade, parentItem) {
    const stackView = parentItem ? parentItem.view : null;
    const subViews = [];
    let curViews = [];
    let subView;
    if (stackView) {
        cascade.push({view: stackView});
        curViews.push(stackView);
    }
    for (var i = 0; i < cascade.length; i++) {
        let item = cascade[i];
        if ((!Array.isArray(item) && item.hasOwnProperty('view')) ||
            (Array.isArray(item) && item[0].view && !item[0].relation)) {
            const items = Array.isArray(item) ? item : [item];
            for (var z = 0; z < items.length; z++) {
                item = items[z];
                const viewRange = (item === ',') ? [] : item.view ? _getRange(item.view, item.range) : [null];
                for (var r = 0; r < viewRange.length; r++) {
                    const curView = viewRange[r];
                    curViews.push(curView);

                    //
                    // Add this view to the collection of subViews
                    //
                    if (curView !== stackView) {
                        subViews.push(curView);
                        subView = context.subViews[curView];
                        if (!subView) {
                            subView = {orientations: 0};
                            context.subViews[curView] = subView;
                        }
                        subView.orientations = subView.orientations | context.orientation;
                        if (subView.stack) {
                            _processStackView(context, curView, subView);
                        }
                    }

                    //
                    // Process the relationship between this and the previous views
                    //
                    if ((context.prevViews !== undefined) && (curView !== undefined) && context.relation) {
                        if (context.relation.relation !== 'none') {
                            for (var p = 0; p < context.prevViews.length; p++) {
                                const prevView = context.prevViews[p];
                                switch (context.orientation) {
                                    case Orientation.HORIZONTAL:
                                        context.prevAttr = (prevView !== stackView) ? Attribute.RIGHT : Attribute.LEFT;
                                        context.curAttr = (curView !== stackView) ? Attribute.LEFT : Attribute.RIGHT;
                                        break;
                                    case Orientation.VERTICAL:
                                        context.prevAttr = (prevView !== stackView) ? Attribute.BOTTOM : Attribute.TOP;
                                        context.curAttr = (curView !== stackView) ? Attribute.TOP : Attribute.BOTTOM;
                                        break;
                                    case Orientation.ZINDEX:
                                        context.prevAttr = Attribute.ZINDEX;
                                        context.curAttr = Attribute.ZINDEX;
                                        context.relation.constant = !prevView ? 0 : (context.relation.constant || 'default');
                                        break;
                                }
                                context.constraints.push({
                                    view1: prevView,
                                    attr1: context.prevAttr,
                                    relation: context.relation.relation,
                                    view2: curView,
                                    attr2: context.curAttr,
                                    multiplier: context.relation.multiplier,
                                    constant: ((context.relation.constant === 'default') || !context.relation.constant) ? context.relation.constant : -context.relation.constant,
                                    priority: context.relation.priority
                                });
                            }
                        }
                    }

                    //
                    // Process view size constraints
                    //
                    const constraints = item.constraints;
                    if (constraints) {
                        for (var n = 0; n < constraints.length; n++) {
                            context.prevAttr = context.horizontal ? Attribute.WIDTH : Attribute.HEIGHT;
                            context.curAttr = (constraints[n].view || constraints[n].multiplier) ?
                                    (constraints[n].attribute || context.prevAttr) :
                                    (constraints[n].variable ? Attribute.VARIABLE : Attribute.CONST);
                            context.constraints.push({
                                view1: curView,
                                attr1: context.prevAttr,
                                relation: constraints[n].relation,
                                view2: constraints[n].view,
                                attr2: context.curAttr,
                                multiplier: constraints[n].multiplier,
                                constant: constraints[n].constant,
                                priority: constraints[n].priority
                            });
                        }
                    }

                    //
                    // Process cascaded data (child stack-views)
                    //
                    if (item.cascade) {
                        _processCascade(context, item.cascade, item);
                    }
                }
            }
        }
        else if (item !== ',') {
            context.prevViews = curViews;
            curViews = [];
            context.relation = item[0];
            if (context.prevViews !== undefined) {
                if (context.relation.equalSpacing) {
                    _processEqualSpacer(context, stackView);
                }
                if (context.relation.multiplier) {
                    _processProportionalSpacer(context, stackView);
                }
            }
        }
    }

    if (stackView) {
        subView = context.subViews[stackView];
        if (!subView) {
            subView = {orientations: context.orientation};
            context.subViews[stackView] = subView;
        }
        else if (subView.stack) {
            const err = new Error('A stack named "' + stackView + '" has already been created');
            err.column = parentItem.$parserOffset + 1;
            throw err;
        }
        subView.stack = {
            orientation: context.orientation,
            processedOrientations: context.orientation,
            subViews: subViews
        };
        _processStackView(context, stackView, subView);
    }
}

const metaInfoCategories = [
    'viewport',
    'spacing',
    'colors',
    'shapes',
    'widths',
    'heights'
];

/**
 * VisualFormat
 *
 * @namespace VisualFormat
 */
class VisualFormat {

    /**
     * Parses a single line of vfl into an array of constraint definitions.
     *
     * When the visual-format could not be succesfully parsed an exception is thrown containing
     * additional info about the parse error and column position.
     *
     * @param {String} visualFormat Visual format string (cannot contain line-endings!).
     * @param {Object} [options] Configuration options.
     * @param {Boolean} [options.extended] When set to true uses the extended syntax (default: false).
     * @param {String} [options.outFormat] Output format (`constraints` or `raw`) (default: `constraints`).
     * @param {Number} [options.lineIndex] Line-index used when auto generating equal-spacing constraints.
     * @return {Array} Array of constraint definitions.
     */
    static parseLine(visualFormat, options) {
        if ((visualFormat.length === 0) ||
            (options && options.extended && (visualFormat.indexOf('//') === 0))) {
            return [];
        }
        const res = (options && options.extended) ? parserExt.parse(visualFormat) : parser.parse(visualFormat);
        if (options && options.outFormat === 'raw') {
            return [res];
        }
        let context = {
            constraints: [],
            lineIndex: (options ? options.lineIndex : undefined) || 1,
            subViews: (options ? options.subViews : undefined) || {}
        };
        if (res.type === 'attribute') {
            for (let n = 0; n < res.attributes.length; n++) {
                const attr = res.attributes[n];
                for (let m = 0; m < attr.predicates.length; m++) {
                    const predicate = attr.predicates[m];
                    context.constraints.push({
                      view1: res.view,
                      attr1: attr.attr,
                      relation: predicate.relation,
                      view2: predicate.view,
                      attr2: predicate.attribute || attr.attr,
                      multiplier: predicate.multiplier,
                      constant: predicate.constant,
                      priority: predicate.priority
                    });
                }
            }
        } else {
          switch (res.orientation) {
            case 'horizontal':
              context.orientation = Orientation.HORIZONTAL;
              context.horizontal = true;
              _processCascade(context, res.cascade, null);
              break;
            case 'vertical':
              context.orientation = Orientation.VERTICAL;
              _processCascade(context, res.cascade, null);
              break;
            case 'horzvert':
              context.orientation = Orientation.HORIZONTAL;
              context.horizontal = true;
              _processCascade(context, res.cascade, null);
              context = {
                constraints: context.constraints,
                lineIndex: context.lineIndex,
                subViews: context.subViews,
                orientation: Orientation.VERTICAL
              };
              _processCascade(context, res.cascade, null);
              break;
            case 'zIndex':
              context.orientation = Orientation.ZINDEX;
              _processCascade(context, res.cascade, null);
              break;
          }
        }
        return context.constraints;
    }

    /**
     * Parses one or more visual format strings into an array of constraint definitions.
     *
     * When the visual-format could not be succesfully parsed an exception is thrown containing
     * additional info about the parse error and column position.
     *
     * @param {String|Array} visualFormat One or more visual format strings.
     * @param {Object} [options] Configuration options.
     * @param {Boolean} [options.extended] When set to true uses the extended syntax (default: false).
     * @param {Boolean} [options.strict] When set to false trims any leading/trailing spaces and ignores empty lines (default: true).
     * @param {String} [options.lineSeparator] String that defines the end of a line (default `\n`).
     * @param {String} [options.outFormat] Output format (`constraints` or `raw`) (default: `constraints`).
     * @return {Array} Array of constraint definitions.
     */
    static parse(visualFormat, options) {
        const lineSeparator = (options && options.lineSeparator) ? options.lineSeparator : '\n';
        if (!Array.isArray(visualFormat) && (visualFormat.indexOf(lineSeparator) < 0)) {
            try {
                return this.parseLine(visualFormat, options);
            }
            catch (err) {
                err.source = visualFormat;
                throw err;
            }
        }

        // Decompose visual-format into an array of strings, and within those strings
        // search for line-endings, and treat each line as a seperate visual-format.
        visualFormat = Array.isArray(visualFormat) ? visualFormat : [visualFormat];
        let lines;
        let constraints = [];
        let lineIndex = 0;
        let line;
        const parseOptions = {
            lineIndex: lineIndex,
            extended: (options && options.extended),
            strict: (options && (options.strict !== undefined)) ? options.strict : true,
            outFormat: options ? options.outFormat : undefined,
            subViews: {}
        };
        try {
            for (var i = 0; i < visualFormat.length; i++) {
                lines = visualFormat[i].split(lineSeparator);
                for (var j = 0; j < lines.length; j++) {
                    line = lines[j];
                    lineIndex++;
                    parseOptions.lineIndex = lineIndex;
                    if (!parseOptions.strict) {
                        line = line.trim();
                    }
                    if (parseOptions.strict || line.length) {
                        constraints = constraints.concat(this.parseLine(line, parseOptions));
                    }
                }
            }
        }
        catch (err) {
            err.source = line;
            err.line = lineIndex;
            throw err;
        }
        return constraints;
    }

    /**
     * Parses meta information from the comments in the VFL.
     *
     * Additional meta information can be specified in the comments
     * for previewing and rendering purposes. For instance, the view-port
     * aspect-ratio, sub-view widths and colors, can be specified. The
     * following example renders three colored circles in the visual-format editor:
     *
     * ```vfl
     * //viewport aspect-ratio:3/1 max-height:300
     * //colors red:#FF0000 green:#00FF00 blue:#0000FF
     * //shapes red:circle green:circle blue:circle
     * H:|-[row:[red(green,blue)]-[green]-[blue]]-|
     * V:|[row]|
     * ```
     *
     * Supported categories and properties:
     *
     * |Category|Property|Example|
     * |--------|--------|-------|
     * |`viewport`|`aspect-ratio:{width}/{height}`|`//viewport aspect-ratio:16/9`|
     * ||`width:[{number}/intrinsic]`|`//viewport width:10`|
     * ||`height:[{number}/intrinsic]`|`//viewport height:intrinsic`|
     * ||`min-width:{number}`|
     * ||`max-width:{number}`|
     * ||`min-height:{number}`|
     * ||`max-height:{number}`|
     * |`spacing`|`[{number}/array]`|`//spacing:8` or `//spacing:[10, 20, 5]`|
     * |`widths`|`{view-name}:[{number}/intrinsic]`|`//widths subview1:100`|
     * |`heights`|`{view-name}:[{number}/intrinsic]`|`//heights subview1:intrinsic`|
     * |`colors`|`{view-name}:{color}`|`//colors redview:#FF0000 blueview:#00FF00`|
     * |`shapes`|`{view-name}:[circle/square]`|`//shapes avatar:circle`|
     *
     * @param {String|Array} visualFormat One or more visual format strings.
     * @param {Object} [options] Configuration options.
     * @param {String} [options.lineSeparator] String that defines the end of a line (default `\n`).
     * @param {String} [options.prefix] When specified, also processes the categories using that prefix (e.g. "-dev-viewport max-height:10").
     * @return {Object} meta-info
     */
    static parseMetaInfo(visualFormat, options) {
        const lineSeparator = (options && options.lineSeparator) ? options.lineSeparator : '\n';
        const prefix = options ? options.prefix : undefined;
        visualFormat = Array.isArray(visualFormat) ? visualFormat : [visualFormat];
        const metaInfo = {};
        var key;
        for (var k = 0; k < visualFormat.length; k++) {
            const lines = visualFormat[k].split(lineSeparator);
            for (var i = 0; i < lines.length; i++) {
                const line = lines[i];
                for (var c = 0; c < metaInfoCategories.length; c++) {
                    for (var s = 0; s < (prefix ? 2 : 1); s++) {
                        const category = metaInfoCategories[c];
                        const prefixedCategory = ((s === 0) ? '' : prefix) + category;
                        if (line.indexOf('//' + prefixedCategory + ' ') === 0) {
                            const items = line.substring(3 + prefixedCategory.length).split(' ');
                            for (var j = 0; j < items.length; j++) {
                                metaInfo[category] = metaInfo[category] || {};
                                const item = items[j].split(':');
                                const names = _getRange(item[0], true);
                                for (var r = 0; r < names.length; r++) {
                                    metaInfo[category][names[r]] = (item.length > 1) ? item[1] : '';
                                }
                            }
                        }
                        else if (line.indexOf('//' + prefixedCategory + ':') === 0) {
                            metaInfo[category] = line.substring(3 + prefixedCategory.length);
                        }
                    }
                }
            }
        }
        if (metaInfo.viewport) {
            const viewport = metaInfo.viewport;
            var aspectRatio = viewport['aspect-ratio'];
            if (aspectRatio) {
                aspectRatio = aspectRatio.split('/');
                viewport['aspect-ratio'] = parseInt(aspectRatio[0]) / parseInt(aspectRatio[1]);
            }
            if (viewport.height !== undefined) {
                viewport.height = (viewport.height === 'intrinsic') ? true : parseInt(viewport.height);
            }
            if (viewport.width !== undefined) {
                viewport.width = (viewport.width === 'intrinsic') ? true : parseInt(viewport.width);
            }
            if (viewport['max-height'] !== undefined) {
                viewport['max-height'] = parseInt(viewport['max-height']);
            }
            if (viewport['max-width'] !== undefined) {
                viewport['max-width'] = parseInt(viewport['max-width']);
            }
            if (viewport['min-height'] !== undefined) {
                viewport['min-height'] = parseInt(viewport['min-height']);
            }
            if (viewport['min-width'] !== undefined) {
                viewport['min-width'] = parseInt(viewport['min-width']);
            }
        }
        if (metaInfo.widths) {
            for (key in metaInfo.widths) {
                const width = (metaInfo.widths[key] === 'intrinsic') ? true : parseInt(metaInfo.widths[key]);
                metaInfo.widths[key] = width;
                if ((width === undefined) || isNaN(width)) {
                    delete metaInfo.widths[key];
                }
            }
        }
        if (metaInfo.heights) {
            for (key in metaInfo.heights) {
                const height = (metaInfo.heights[key] === 'intrinsic') ? true : parseInt(metaInfo.heights[key]);
                metaInfo.heights[key] = height;
                if ((height === undefined) || isNaN(height)) {
                    delete metaInfo.heights[key];
                }
            }
        }
        if (metaInfo.spacing) {
            const value = JSON.parse(metaInfo.spacing);
            metaInfo.spacing = value;
            if (Array.isArray(value)){
              for (var sIdx = 0, len = value.length; sIdx < len; sIdx++) {
                if (isNaN(value[sIdx])){
                  delete metaInfo.spacing;
                  break;
                }
              }
            } else if (value === undefined || isNaN(value)){
              delete metaInfo.spacing;
            }
        }
        return metaInfo;
    }
}

export default VisualFormat;
