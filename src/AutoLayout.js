import Attribute from './Attribute';
import Relation from './Relation';
import View from './View';
import VisualFormat from './VisualFormat';

/**
 * AutoLayout.
 *
 * @namespace AutoLayout
 * @property {View} View
 * @property {Attribute} Attribute
 * @property {Relation} Relation
 * @property {VisualFormat} VisualFormat
 */
var AutoLayout = {
    View: View,
    Attribute: Attribute,
    Relation: Relation,
    VisualFormat: VisualFormat
};

export {AutoLayout as default};
