import parser from './parser/parser';
import parserExt from './parser/parserExt';
import Attribute from './Attribute';

/**
 * VisualFormat
 *
 * @namespace VisualFormat
 */
class VisualFormat {

    /**
     * Parses a single line of vfl into an array of constraint definitions.
     *
     * @param {String} visualFormat Visual format string (cannot contain line-endings!).
     * @param {Object} [options] Configuration options.
     * @param {Boolean} [options.extended] When set to true uses the extended syntax (default: false).
     * @return {Array} Array of constraint definitions.
     */
    static parseLine(visualFormat, options) {
        if (visualFormat.length === 0) {
            return [];
        }
        const constraints = [];
        const res = (options && options.extended) ? parserExt.parse(visualFormat) : parser.parse(visualFormat);
        if (options && options.outFormat === 'raw') {
            return [res];
        }
        const horizontal = (res.orientation === 'horizontal');
        let view1;
        let view2;
        let relation;
        let attr1;
        let attr2;
        let item;
        let constraint;
        for (var i = 0; i < res.cascade.length; i++) {
            item = res.cascade[i];
            if (!Array.isArray(item) && item.hasOwnProperty('view')) {
                view1 = view2;
                view2 = item.view;
                if ((view1 !== undefined) && (view2 !== undefined) && relation) {
                    attr1 = horizontal ? Attribute.RIGHT : Attribute.BOTTOM;
                    attr2 = horizontal ? Attribute.LEFT : Attribute.TOP;
                    if (!view1) {
                        attr1 = horizontal ? Attribute.LEFT : Attribute.TOP;
                    }
                    if (!view2) {
                        attr2 = horizontal ? Attribute.RIGHT : Attribute.BOTTOM;
                    }
                    constraints.push({
                        view1: view1,
                        attr1: attr1,
                        relation: relation.relation,
                        view2: view2,
                        attr2: attr2,
                        multiplier: relation.multiplier,
                        constant: relation.constant
                        //,variable: relation.variable
                    });
                }
                relation = undefined;

                // process view size constraints
                if (item.constraints) {
                    for (var n = 0; n < item.constraints.length; n++) {
                        attr1 = horizontal ? Attribute.WIDTH : Attribute.HEIGHT;
                        attr2 = (item.constraints[n].view || item.constraints[n].multiplier) ? attr1 : (item.constraints[n].variable ? Attribute.VARIABLE : Attribute.CONST);
                        constraints.push({
                            view1: item.view,
                            attr1: attr1,
                            relation: item.constraints[n].relation,
                            view2: item.constraints[n].view,
                            attr2: attr2,
                            multiplier: item.constraints[n].multiplier,
                            constant: item.constraints[n].constant
                            //,variable: item.constraints[n].variable
                        });
                    }
                }
            }
            else {
                relation = item[0];
            }
        }
        return constraints;
    }

    /**
     * Parses one or more visual format strings into an array of constraint definitions.
     *
     * @param {String|Array} visualFormat One or more visual format strings.
     * @param {Object} [options] Configuration options.
     * @param {Boolean} [options.extended] When set to true uses the extended syntax (default: false).
     * @param {String} [options.lineSeperator] String that defines the end of a line (default `\n`).
     * @param {String} [options.outFormat] Output format ('constraints' or 'raw') (default: 'constraints').
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
        } catch (err) {
            err.source = line;
            err.line = lineIndex;
            throw err;
        }
        return constraints;
    }
}

export {VisualFormat as default};
