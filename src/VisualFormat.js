import parser from './parser/parser';
import Attribute from './Attribute';

/**
 * VisualFormat
 *
 * @class VisualFormat
 */
class VisualFormat {

    /**
     * Parses one or more visual format strings into an array of constraint definitions.
     *
     * @param {String|Array} visualFormat One or more visual format strings.
     * @return {Array} Array of constraint definitions.
     */
    static parse(visualFormat) {
        visualFormat = Array.isArray(visualFormat) ? visualFormat : [visualFormat];
        const constraints = [];
        let view1;
        let view2;
        let relation;
        let attr1;
        let attr2;
        let item;
        let horizontal;
        let res;
        for (var j = 0; j < visualFormat.length; j++) {
            res = parser.parse(visualFormat[j]);
            horizontal = (res.orientation === 'horizontal');
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
                            multiplier: 1,
                            constant: relation.constant
                        });
                    }
                    relation = undefined;

                    // process view size constraints
                    if (item.constraints) {
                        for (var n = 0; n < item.constraints.length; n++) {
                            constraints.push({
                                view1: item.view,
                                attr1: horizontal ? Attribute.WIDTH : Attribute.HEIGHT,
                                relation: item.constraints[n].relation,
                                view2: undefined,
                                attr2: Attribute.CONST,
                                multiplier: 1,
                                constant: item.constraints[n].constant
                            });
                        }
                    }
                }
                else {
                    relation = item[0];
                }
            }
        }
        return constraints;
    }
}

export {VisualFormat as default};
