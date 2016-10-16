import c from 'cassowary/bin/c';
//import kiwi from 'kiwi.js';
import Attribute from './Attribute';

/**
 * A SubView is automatically generated when constraints are added to a View.
 *
 * @namespace SubView
 */
class SubView {
    constructor(options) {
        this._name = options.name;
        this._type = options.type;
        this._solver = options.solver;
        this._attr = {};
        if (!options.name) {
            if (process.env.CASSOWARYJS) {
                this._attr[Attribute.LEFT] = new c.Variable();
                this._solver.addConstraint(new c.StayConstraint(this._attr[Attribute.LEFT], c.Strength.required));
                this._attr[Attribute.TOP] = new c.Variable();
                this._solver.addConstraint(new c.StayConstraint(this._attr[Attribute.TOP], c.Strength.required));
                this._attr[Attribute.ZINDEX] = new c.Variable();
                this._solver.addConstraint(new c.StayConstraint(this._attr[Attribute.ZINDEX], c.Strength.required));
            }
            else {
                this._attr[Attribute.LEFT] = new kiwi.Variable();
                this._solver.addConstraint(new kiwi.Constraint(this._attr[Attribute.LEFT], kiwi.Operator.Eq, 0));
                this._attr[Attribute.TOP] = new kiwi.Variable();
                this._solver.addConstraint(new kiwi.Constraint(this._attr[Attribute.TOP], kiwi.Operator.Eq, 0));
                this._attr[Attribute.ZINDEX] = new kiwi.Variable();
                this._solver.addConstraint(new kiwi.Constraint(this._attr[Attribute.ZINDEX], kiwi.Operator.Eq, 0));
            }
        }
    }
    toJSON() {
        return {
            name: this.name,
            left: this.left,
            top: this.top,
            width: this.width,
            height: this.height
        };
    }
    toString() {
        JSON.stringify(this.toJSON(), undefined, 2);
    }

    /**
     * Name of the sub-view.
     * @readonly
     * @type {String}
     */
    get name() {
        return this._name;
    }

    /**
     * Left value (`Attribute.LEFT`).
     * @readonly
     * @type {Number}
     */
    get left() {
        return this._getAttrValue(Attribute.LEFT);
    }

    /**
     * Right value (`Attribute.RIGHT`).
     * @readonly
     * @type {Number}
     */
    get right() {
        return this._getAttrValue(Attribute.RIGHT);
    }

    /**
     * Width value (`Attribute.WIDTH`).
     * @type {Number}
     */
    get width() {
        return this._getAttrValue(Attribute.WIDTH);
    }

    /**
     * Height value (`Attribute.HEIGHT`).
     * @readonly
     * @type {Number}
     */
    get height() {
        return this._getAttrValue(Attribute.HEIGHT);
    }

    /**
     * Intrinsic width of the sub-view.
     *
     * Use this property to explicitely set the width of the sub-view, e.g.:
     * ```javascript
     * var view = new AutoLayout.View(AutoLayout.VisualFormat.parse('|[child1][child2]|'), {
     *   width: 500
     * });
     * view.subViews.child1.intrinsicWidth = 100;
     * console.log('child2 width: ' + view.subViews.child2.width); // 400
     * ```
     *
     * @type {Number}
     */
    get intrinsicWidth() {
        return this._intrinsicWidth;
    }
    set intrinsicWidth(value) {
        if ((value !== undefined) && (value !== this._intrinsicWidth)) {
            const attr = this._getAttr(Attribute.WIDTH);
            if (this._intrinsicWidth === undefined) {
                if (process.env.CASSOWARYJS) {
                    this._solver.addEditVar(attr, new c.Strength('required', this._name ? 998 : 999, 1000, 1000));
                }
                else {
                    this._solver.addEditVariable(attr, kiwi.Strength.create(this._name ? 998 : 999, 1000, 1000));
                }
            }
            this._intrinsicWidth = value;
            this._solver.suggestValue(attr, value);
            if (process.env.CASSOWARYJS) {
                this._solver.resolve();
            }
            else {
                this._solver.updateVariables();
            }
        }
    }

    /**
     * Intrinsic height of the sub-view.
     *
     * See `intrinsicWidth`.
     *
     * @type {Number}
     */
    get intrinsicHeight() {
        return this._intrinsicHeight;
    }
    set intrinsicHeight(value) {
        if ((value !== undefined) && (value !== this._intrinsicHeight)) {
            const attr = this._getAttr(Attribute.HEIGHT);
            if (this._intrinsicHeight === undefined) {
                if (process.env.CASSOWARYJS) {
                    this._solver.addEditVar(attr, new c.Strength('required', this._name ? 998 : 999, 1000, 1000));
                }
                else {
                    this._solver.addEditVariable(attr, kiwi.Strength.create(this._name ? 998 : 999, 1000, 1000));
                }
            }
            this._intrinsicHeight = value;
            this._solver.suggestValue(attr, value);
            if (process.env.CASSOWARYJS) {
                this._solver.resolve();
            }
            else {
                this._solver.updateVariables();
            }
        }
    }

    /**
     * Top value (`Attribute.TOP`).
     * @readonly
     * @type {Number}
     */
    get top() {
        return this._getAttrValue(Attribute.TOP);
    }

    /**
     * Bottom value (`Attribute.BOTTOM`).
     * @readonly
     * @type {Number}
     */
    get bottom() {
        return this._getAttrValue(Attribute.BOTTOM);
    }

    /**
     * Horizontal center (`Attribute.CENTERX`).
     * @readonly
     * @type {Number}
     */
    get centerX() {
        return this._getAttrValue(Attribute.CENTERX);
    }

    /**
     * Vertical center (`Attribute.CENTERY`).
     * @readonly
     * @type {Number}
     */
    get centerY() {
        return this._getAttrValue(Attribute.CENTERY);
    }

    /**
     * Z-index (`Attribute.ZINDEX`).
     * @readonly
     * @type {Number}
     */
    get zIndex() {
        return this._getAttrValue(Attribute.ZINDEX);
    }

    /**
     * Returns the type of the sub-view.
     * @readonly
     * @type {String}
     */
    get type() {
        return this._type;
    }

    /**
     * Gets the value of one of the attributes.
     *
     * @param {String|Attribute} attr Attribute name (e.g. 'right', 'centerY', Attribute.TOP).
     * @return {Number} value or `undefined`
     */
    getValue(attr) {
        return this._attr[attr] ? this._attr[attr].value() : undefined;
    }

    /**
     * @private
     */
    _getAttr(attr) {
        if (this._attr[attr]) {
            return this._attr[attr];
        }
        this._attr[attr] = process.env.CASSOWARYJS ? new c.Variable() : new kiwi.Variable();
        switch (attr) {
            case Attribute.RIGHT:
                this._getAttr(Attribute.LEFT);
                this._getAttr(Attribute.WIDTH);
                if (process.env.CASSOWARYJS) {
                    this._solver.addConstraint(new c.Equation(this._attr[attr], c.plus(this._attr[Attribute.LEFT], this._attr[Attribute.WIDTH])));
                }
                else {
                    this._solver.addConstraint(new kiwi.Constraint(this._attr[attr], kiwi.Operator.Eq, this._attr[Attribute.LEFT].plus(this._attr[Attribute.WIDTH])));
                }
                break;
            case Attribute.BOTTOM:
                this._getAttr(Attribute.TOP);
                this._getAttr(Attribute.HEIGHT);
                if (process.env.CASSOWARYJS) {
                    this._solver.addConstraint(new c.Equation(this._attr[attr], c.plus(this._attr[Attribute.TOP], this._attr[Attribute.HEIGHT])));
                }
                else {
                    this._solver.addConstraint(new kiwi.Constraint(this._attr[attr], kiwi.Operator.Eq, this._attr[Attribute.TOP].plus(this._attr[Attribute.HEIGHT])));
                }
                break;
            case Attribute.CENTERX:
                this._getAttr(Attribute.LEFT);
                this._getAttr(Attribute.WIDTH);
                if (process.env.CASSOWARYJS) {
                    this._solver.addConstraint(new c.Equation(this._attr[attr], c.plus(this._attr[Attribute.LEFT], c.divide(this._attr[Attribute.WIDTH], 2))));
                }
                else {
                    this._solver.addConstraint(new kiwi.Constraint(this._attr[attr], kiwi.Operator.Eq, this._attr[Attribute.LEFT].plus(this._attr[Attribute.WIDTH].divide(2))));
                }
                break;
            case Attribute.CENTERY:
                this._getAttr(Attribute.TOP);
                this._getAttr(Attribute.HEIGHT);
                if (process.env.CASSOWARYJS) {
                    this._solver.addConstraint(new c.Equation(this._attr[attr], c.plus(this._attr[Attribute.TOP], c.divide(this._attr[Attribute.HEIGHT], 2))));
                }
                else {
                    this._solver.addConstraint(new kiwi.Constraint(this._attr[attr], kiwi.Operator.Eq, this._attr[Attribute.TOP].plus(this._attr[Attribute.HEIGHT].divide(2))));
                }
                break;
        }
        if (!process.env.CASSOWARYJS) {
            this._solver.updateVariables();
        }
        return this._attr[attr];
    }

    /**
     * @private
     */
    _getAttrValue(attr) {
        if (process.env.CASSOWARYJS) {
            return this._getAttr(attr).value;
        }
        else {
            return this._getAttr(attr).value();
        }
    }
}

export default SubView;
