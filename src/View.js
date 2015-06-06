import c from 'cassowary/bin/c';
import VisualFormat from './VisualFormat';
import Attribute from './Attribute';
import Relation from './Relation';
import SubView from './SubView';



function _getConst(name, value) {
    const vr = new c.Variable({value: value});
    this._solver.addConstraint(new c.StayConstraint(vr, c.Strength.required, 0));
    return vr;
}

function _getSubView(viewName) {
    if (!viewName) {
        return this._parentSubView;
    }
    else {
        this._subViews[viewName] = this._subViews[viewName] || new SubView({
            name: viewName,
            solver: this._solver
        });
        return this._subViews[viewName];
    }
}

function _addConstraint(constraint) {
    //this.constraints.push(constraint);
    const attr1 = _getSubView.call(this, constraint.view1)._getAttr(constraint.attr1);
    const attr2 = (constraint.attr2 === Attribute.CONST) ? _getConst.call(this, undefined, constraint.constant) : _getSubView.call(this, constraint.view2)._getAttr(constraint.attr2);
    let relation;
    switch (constraint.relation) {
        case Relation.LEQ:
            //relation = new c.Inequality(attr1, c.LEQ, c.plus(attr2, )
            break;
        case Relation.EQU:
            if (((constraint.multiplier === 1) && !constraint.constant) || (constraint.attr2 === Attribute.CONST)) {
                relation = new c.Equation(attr1, attr2);
            }
            else if ((constraint.multiplier !== 1) && constraint.constant) {
                throw 'todo';
            }
            else if (constraint.constant) {
                relation = new c.Equation(attr2, c.plus(attr1, constraint.constant));
            }
            else {
                throw 'todo';
            }
            break;
        case Relation.GEQ:
            break;
        default:
            throw 'Invalid relation specified: ' + constraint.relation;
    }
    this._solver.addConstraint(relation);
}

class View {

    /**
     * @class View
     * @param {Object} [options] Configuration options.
     * @param {Number} [options.width] Initial width of the view.
     * @param {Number} [options.height] Initial height of the view.
     * @param {Object|Array} [options.constraints] One or more constraint definitions.
     * @param {String|Array} [options.visualFormat] Visual format string or array of vfl strings.
     */
    constructor(options) {
        this._solver = new c.SimplexSolver();
        this._subViews = {};
        this._parentSubView = new SubView({
            solver: this._solver
        });
        //this.constraints = [];
        if (options) {
            if ((options.width !== undefined) || (options.height !== undefined)) {
                this.setSize(options.width, options.height);
            }
            if (options.constraints) {
                this.addConstraints(options.constraints);
            }
            if (options.visualFormat) {
                this.addVisualFormat(options.visualFormat);
            }
        }
    }

    /**
     * Sets the width and height of the view.
     *
     * @param {Number} width Width of the view.
     * @param {Number} height Height of the view.
     * @return {AutoLayout} this
     */
    setSize(width, height /*, depth*/) {
        if ((this._width === width) &&
            (this._height === height)) {
            return undefined;
        }
        if ((width !== undefined) && (this._width !== width)) {
            this._width = width;
            this._solver.suggestValue(this._parentSubView._getAttr(Attribute.WIDTH), this._width);
        }
        if ((height !== undefined) && (this._height !== height)) {
            this._height = height;
            this._solver.suggestValue(this._parentSubView._getAttr(Attribute.HEIGHT), this._height);
        }
        this._solver.resolve();
        return this;
    }

    /**
     * Width that was set using `setSize`.
     * @type {Number}
     */
    get width() {
        return this._width;
    }

    /**
     * Height that was set using `setSize`.
     * @type {Number}
     */
    get height() {
        return this._height;
    }

    /**
     * Adds one or more constraint definitions.
     *
     * A constraint definition has the following format:
     *
     * ```javascript
     * constraint: {
     *   view1: {String},
     *   attr1: {AutoLayout.Attribute},
     *   relation: {AutoLayout.Relation},
     *   view2: {String},
     *   attr2: {AutoLayout.Attribute},
     *   multiplier: {Number},
     *   constant: {Number}
     * }
     * ```
     * @param {Object|Array} constraints One or more constraint definitions.
     * @return {AutoLayout} this
     */
    addConstraint(constraint) {
        if (Array.isArray(constraint)) {
            for (var i = 0; i < constraint.length; i++) {
                _addConstraint.call(this, constraint[i]);
            }
        }
        else {
            _addConstraint.call(this, constraint);
        }
        return this;
    }

    /**
     * Adds one or more constraints from a visual-format definition.
     * See `VisualFormat.parse`.
     *
     * @param {String|Array} visualFormat Visual format string or array of vfl strings.
     * @return {AutoLayout} this
     */
    addVisualFormat(visualFormat) {
        return this.addConstraint(VisualFormat.parse(visualFormat));
    }

    /**
     * Dictionary of `SubView` objects that have been created when adding constraints.
     * @type {Object.SubView}
     */
    get subViews() {
        return this._subViews;
    }
}

export {View as default};
