import parser from './parser/parser';
import parserExt from './parser/parserExt';
import Attribute from './Attribute.es6';
import Relation from './Relation.es6';

/**
 * Recursive helper function that processes the cascaded data.
 */
function _processCascade(context, cascade, stackView) {
    if (stackView) {
        cascade.push({view: stackView});
    }
    for (var i = 0; i < cascade.length; i++) {
        context.item = cascade[i];
        if (!Array.isArray(context.item) && context.item.hasOwnProperty('view')) {
            context.view1 = context.view2;
            context.view2 = context.item.view;
            if ((context.view1 !== undefined) && (context.view2 !== undefined) && context.relation) {
                switch (context.orientation) {
                    case 'horizontal':
                        context.attr1 = (context.view1 !== stackView) ? Attribute.RIGHT : Attribute.LEFT;
                        context.attr2 = (context.view2 !== stackView) ? Attribute.LEFT : Attribute.RIGHT;
                        break;
                    case 'vertical':
                        context.attr1 = (context.view1 !== stackView) ? Attribute.BOTTOM : Attribute.TOP;
                        context.attr2 = (context.view2 !== stackView) ? Attribute.TOP : Attribute.BOTTOM;
                        break;
                    case 'zIndex':
                        context.attr1 = Attribute.ZINDEX;
                        context.attr2 = Attribute.ZINDEX;
                        context.relation.constant = (context.view1 !== stackView) ? 'default' : 0;
                        break;
                }
                context.constraints.push({
                    view1: context.view1,
                    attr1: context.attr1,
                    relation: context.relation.relation,
                    view2: context.view2,
                    attr2: context.attr2,
                    multiplier: context.relation.multiplier,
                    constant: ((context.relation.constant === 'default') || !context.relation.constant) ? context.relation.constant : -context.relation.constant,
                    priority: context.relation.priority
                    //,variable: context.relation.variable
                });
            }
            context.relation = undefined;

            // process view size constraints
            if (context.item.constraints) {
                for (var n = 0; n < context.item.constraints.length; n++) {
                    context.attr1 = context.horizontal ? Attribute.WIDTH : Attribute.HEIGHT;
                    context.attr2 = (context.item.constraints[n].view || context.item.constraints[n].multiplier) ?
                            (context.item.constraints[n].attribute || context.attr1) :
                            (context.item.constraints[n].variable ? Attribute.VARIABLE : Attribute.CONST);
                    context.constraints.push({
                        view1: context.item.view,
                        attr1: context.attr1,
                        relation: context.item.constraints[n].relation,
                        view2: context.item.constraints[n].view,
                        attr2: context.attr2,
                        multiplier: context.item.constraints[n].multiplier,
                        constant: context.item.constraints[n].constant,
                        priority: context.item.constraints[n].priority
                        //,variable: context.item.constraints[n].variable
                    });
                }
            }

            // In case of a stack-view, set constraints for opposite orientation
            if (stackView && (context.item.view !== stackView)) {
                context.constraints.push({
                    view1: {
                        name: stackView,
                        type: 'stack'
                    },
                    attr1: context.horizontal ? Attribute.HEIGHT : Attribute.WIDTH,
                    relation: Relation.EQU,
                    view2: context.item.view,
                    attr2: context.horizontal ? Attribute.HEIGHT : Attribute.WIDTH
                });
                context.constraints.push({
                    view1: {
                        name: stackView,
                        type: 'stack'
                    },
                    attr1: context.horizontal ? Attribute.TOP : Attribute.LEFT,
                    relation: Relation.EQU,
                    view2: context.item.view,
                    attr2: context.horizontal ? Attribute.TOP : Attribute.LEFT
                });
            }

            // Process cascaded data (child stack-views)
            if (context.item.cascade) {
                _processCascade(context, context.item.cascade, context.item.view);
            }
        }
        else {
            context.relation = context.item[0];
        }
    }
}

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
        var context = {
            orientation: res.orientation,
            horizontal: (res.orientation === 'horizontal'),
            constraints: []
        };
        _processCascade(context, res.cascade, null);
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
     * @param {String} [options.lineSeperator] String that defines the end of a line (default `\n`).
     * @param {String} [options.outFormat] Output format (`constraints` or `raw`) (default: `constraints`).
     * @return {Array} Array of constraint definitions.
     */
    static parse(visualFormat, options) {
        const lineSeperator = (options && options.lineSeperator) ? options.lineSeperator : '\n';
        if (!Array.isArray(visualFormat) && (visualFormat.indexOf(lineSeperator) < 0)) {
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
        try {
            for (var i = 0; i < visualFormat.length; i++) {
                lines = visualFormat[i].split(lineSeperator);
                for (var j = 0; j < lines.length; j++) {
                    line = lines[j];
                    lineIndex++;
                    constraints = constraints.concat(this.parseLine(line, options));
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
}

export {VisualFormat as default};
