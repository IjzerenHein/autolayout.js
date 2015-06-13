import c from 'cassowary/bin/c';
import Attribute from './Attribute.es6';
import Relation from './Relation.es6';
import SubView from './SubView.es6';

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

function _getSpacing(constraint) {
    let index = 4;
    if (!constraint.view1 && (constraint.attr1 === 'left')) {
        index = 3;
    }
    else if (!constraint.view1 && (constraint.attr1 === 'top')) {
        index = 0;
    }
    else if (!constraint.view2 && (constraint.attr2 === 'right')) {
        index = 1;
    }
    else if (!constraint.view2 && (constraint.attr2 === 'bottom')) {
        index = 2;
    }
    else {
        switch (constraint.attr1) {
            case 'left':
            case 'right':
            case 'centerX':
            case 'leading':
            case 'trailing':
                index = 4;
                break;
            default:
                index = 5;
        }
    }
    this._spacingVars = this._spacingVars || new Array(6);
    if (!this._spacingVars[index]) {
        this._spacingVars[index] = new c.Variable({
            value: this._spacing[index],
            name: 'spacing[' + index + ']'
        });
        this._solver.addEditVar(this._spacingVars[index]);
    }
    return this._spacingVars[index];
}

function _addConstraint(constraint) {
    //this.constraints.push(constraint);
    let relation;
    const multiplier = (constraint.multiplier !== undefined) ? constraint.multiplier : 1;
    let constant = (constraint.constant !== undefined) ? constraint.constant : 0;
    if (constant === 'default') {
        constant = _getSpacing.call(this, constraint);
    }
    const attr1 = _getSubView.call(this, constraint.view1)._getAttr(constraint.attr1);
    let attr2;
    if (constraint.attr2 === Attribute.CONST) {
        attr2 = _getConst.call(this, undefined, constraint.constant);
    }
    else {
        attr2 = _getSubView.call(this, constraint.view2)._getAttr(constraint.attr2);
        if ((multiplier !== 1) && constant) {
            attr2 = c.times(c.minus(attr2, constant), multiplier);
        }
        else if (constant) {
            attr2 = c.minus(attr2, constant);
        }
        else if (multiplier !== 1) {
            attr2 = c.times(attr2, multiplier);
        }
    }
    switch (constraint.relation) {
        case Relation.EQU:
            relation = new c.Equation(attr1, attr2);
            break;
        case Relation.GEQ:
            relation = new c.Inequality(attr1, c.GEQ, attr2);
            break;
        case Relation.LEQ:
            relation = new c.Inequality(attr1, c.LEQ, attr2);
            break;
        default:
            throw 'Invalid relation specified: ' + constraint.relation;
    }
    this._solver.addConstraint(relation);
}

/**
 * AutoLayoutJS API reference.
 *
 * ### Index
 *
 * |Entity|Type|Description|
 * |---|---|---|
 * |[AutoLayout](#autolayout)|`namespace`|Top level AutoLayout object.|
 * |[VisualFormat](#autolayoutvisualformat--object)|`namespace`|Parses VFL into constraints.|
 * |[View](#autolayoutview)|`class`|Main entity for adding & evaluating constraints.|
 * |[SubView](#autolayoutsubview--object)|`class`|SubView's are automatically created when constraints are added to views. They give access to the evaluated results.|
 * |[Attribute](#autolayoutattribute--enum)|`enum`|Attribute types that are supported when adding constraints.|
 * |[Relation](#autolayoutrelation--enum)|`enum`|Relationship types that are supported when adding constraints.|
 *
 * ### AutoLayout
 *
 * @module AutoLayout
 */
class View {

    /**
     * @class View
     * @param {Object} [options] Configuration options.
     * @param {Number} [options.width] Initial width of the view.
     * @param {Number} [options.height] Initial height of the view.
     * @param {Number|Object} [options.spacing] Spacing for the view (default: 8), see `setSpacing`.
     * @param {Array} [options.constraints] One or more constraint definitions.
     */
    constructor(options) {
        this._solver = new c.SimplexSolver();
        this._subViews = {};
        //this._variables = {};
        this._spacing = {};
        this._parentSubView = new SubView({
            solver: this._solver
        });
        this.setSpacing((options && (options.spacing !== undefined)) ? options.spacing : 8);
        //this.constraints = [];
        if (options) {
            if ((options.width !== undefined) || (options.height !== undefined)) {
                this.setSize(options.width, options.height);
            }
            if (options.constraints) {
                this.addConstraints(options.constraints);
            }
        }
    }

    /**
     * Sets the width and height of the view.
     *
     * @param {Number} width Width of the view.
     * @param {Number} height Height of the view.
     * @return {View} this
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
     * Sets the spacing for the view.
     *
     * The spacing can be set for 6 different variables:
     * `top`, `right`, `bottom`, `left`, `width` and `height`. The `left`-spacing is
     * used when a spacer is used between the parent-view and a sub-view (e.g. `|-[subView]`).
     * The same is true for the `right`, `top` and `bottom` spacers. The `width` and `height` are
     * used for spacers in between sub-views (e.g. `[view1]-[view2]`).
     *
     * Instead of using the full spacing syntax, it is also possible to use shorthand notations:
     *
     * |Syntax|Description|
     * |---|---|
     * |`[top, right, bottom, left, width, height]`|Full syntax **(clockwise order)**.|
     * |`[horizontal, vertical]`|Horizontal = left, right, width, vertical = top, bottom, height.|
     * |`spacing`|All spacing variables are the same.|
     *
     * Examples:
     * ```javascript
     * view.setSpacing(10); // all spacings 10
     * view.setSpacing([10, 15]); // horizontal spacing 10, and vertical spacing 15
     * view.setSpacing([10, 20, 10, 20, 5, 5]); // top, right, bottom, left, horizontal, vertical
     * ```
     *
     * @param {Number|Array} spacing
     * @return {View} this
     */
    setSpacing(spacing) {
        // convert spacing into array: [top, right, bottom, left, horz, vert]
        switch (Array.isArray(spacing) ? spacing.length : -1) {
            case -1: spacing = [spacing, spacing, spacing, spacing, spacing, spacing]; break;
            case 1: spacing = [spacing[0], spacing[0], spacing[0], spacing[0], spacing[0], spacing[0]]; break;
            case 2: spacing = [spacing[1], spacing[0], spacing[1], spacing[0], spacing[0], spacing[1]]; break;
            case 6: break;
            default: throw 'Invalid spacing syntax';
        }
        this._spacing = spacing;
        // update spacing variables
        if (this._spacingVars) {
            for (var i = 0; i < this._spacingVars.length; i++) {
                if (this._spacingVars[i]) {
                    this._solver.suggestValue(this._spacingVars[i], this._spacing[i]);
                }
            }
            this._solver.resolve();
        }
        return this;
    }

    /**
     * Adds a constraint definition.
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
     * @param {Object} constraint Constraint definition.
     * @return {View} this
     */
    addConstraint(constraint) {
        _addConstraint.call(this, constraint);
        return this;
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
     * @param {Array} constraints One or more constraint definitions.
     * @return {View} this
     */
    addConstraints(constraints) {
        for (var i = 0; i < constraints.length; i++) {
            _addConstraint.call(this, constraints[i]);
        }
        return this;
    }

    /**
     * Dictionary of `SubView` objects that have been created when adding constraints.
     * @type {Object.SubView}
     */
    get subViews() {
        return this._subViews;
    }

    /**
     * Dictionary of `Variable` objects that have been created when adding constraints.
     * @type {Object.SubView}
     */
    /*
    get variables() {
        return this._variables;
    }*/
}

export {View as default};
