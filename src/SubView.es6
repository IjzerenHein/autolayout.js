import c from 'cassowary/bin/c';
import Attribute from './Attribute.es6';

/**
 * A SubView is automatically generated when constraints are added to a View.
 *
 * @namespace SubView
 */
class SubView {
    constructor(options) {
        this._name = options.name;
        this._solver = options.solver;
        this._attr = {};
        if (!options.name) {
            this._attr[Attribute.LEFT] = new c.Variable({value: 0, name: '|.left'});
            this._solver.addConstraint(new c.StayConstraint(this._attr[Attribute.LEFT], c.Strength.required));
            this._attr[Attribute.TOP] = new c.Variable({value: 0, name: '|.top'});
            this._solver.addConstraint(new c.StayConstraint(this._attr[Attribute.TOP], c.Strength.required));
            this._attr[Attribute.ZINDEX] = new c.Variable({value: 0, name: '|.zIndex'});
            this._solver.addConstraint(new c.StayConstraint(this._attr[Attribute.ZINDEX], c.Strength.required));
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
        return this._getAttr(Attribute.LEFT).value;
    }

    /**
     * Right value (`Attribute.RIGHT`).
     * @readonly
     * @type {Number}
     */
    get right() {
        return this._getAttr(Attribute.RIGHT).value;
    }

    /**
     * Width value (`Attribute.WIDTH`).
     * @type {Number}
     */
    get width() {
        return this._getAttr(Attribute.WIDTH).value;
    }

    /**
     * Height value (`Attribute.HEIGHT`).
     * @readonly
     * @type {Number}
     */
    get height() {
        return this._getAttr(Attribute.HEIGHT).value;
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
                this._solver.addEditVar(attr, new c.Strength('required', this._name ? 998 : 999, 1000, 1000));
            }
            this._intrinsicWidth = value;
            this._solver.suggestValue(attr, value);
            this._solver.resolve();
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
                this._solver.addEditVar(attr, new c.Strength('required', this._name ? 998 : 999, 1000, 1000));
            }
            this._intrinsicHeight = value;
            this._solver.suggestValue(attr, value);
            this._solver.resolve();
        }
    }

    /**
     * Top value (`Attribute.TOP`).
     * @readonly
     * @type {Number}
     */
    get top() {
        return this._getAttr(Attribute.TOP).value;
    }

    /**
     * Bottom value (`Attribute.BOTTOM`).
     * @readonly
     * @type {Number}
     */
    get bottom() {
        return this._getAttr(Attribute.BOTTOM).value;
    }

    /**
     * Horizontal center (`Attribute.CENTERX`).
     * @readonly
     * @type {Number}
     */
    get centerX() {
        return this._getAttr(Attribute.CENTERX).value;
    }

    /**
     * Vertical center (`Attribute.CENTERY`).
     * @readonly
     * @type {Number}
     */
    get centerY() {
        return this._getAttr(Attribute.CENTERY).value;
    }

    /**
     * Z-index (`Attribute.ZINDEX`).
     * @readonly
     * @type {Number}
     */
    get zIndex() {
        return this._getAttr(Attribute.ZINDEX).value;
    }

    /**
     * Gets the value of one of the attributes.
     *
     * @param {String|Attribute} attr Attribute name (e.g. 'right', 'centerY', Attribute.TOP).
     * @return {Number} value or `undefined`
     */
    getValue(attr) {
        return this._attr[attr] ? this._attr[attr].value : undefined;
    }

    /**
     * @private
     */
    _getAttr(attr) {
        if (this._attr[attr]) {
            return this._attr[attr];
        }
        switch (attr) {
            case Attribute.LEFT:
            case Attribute.TOP:
            case Attribute.WIDTH:
            case Attribute.HEIGHT:
            case Attribute.ZINDEX:
                this._attr[attr] = new c.Variable({value: 0, name: (this._name || '|') + '.' + attr});
                break;
            case Attribute.RIGHT:
                this._getAttr(Attribute.LEFT);
                this._getAttr(Attribute.WIDTH);
                this._attr[Attribute.RIGHT] = new c.Variable({name: (this._name || '|') + '.' + attr});
                this._solver.addConstraint(new c.Equation(this._attr[Attribute.RIGHT], c.plus(this._attr[Attribute.LEFT], this._attr[Attribute.WIDTH])));
                break;
            case Attribute.BOTTOM:
                this._getAttr(Attribute.TOP);
                this._getAttr(Attribute.HEIGHT);
                this._attr[Attribute.BOTTOM] = new c.Variable({name: (this._name || '|') + '.' + attr});
                this._solver.addConstraint(new c.Equation(this._attr[Attribute.BOTTOM], c.plus(this._attr[Attribute.TOP], this._attr[Attribute.HEIGHT])));
                break;
            case Attribute.CENTERX:
                this._getAttr(Attribute.LEFT);
                this._getAttr(Attribute.WIDTH);
                this._attr[Attribute.CENTERX] = new c.Variable({name: (this._name || '|') + '.' + attr});
                this._solver.addConstraint(new c.Equation(this._attr[Attribute.CENTERX], c.plus(this._attr[Attribute.LEFT], c.divide(this._attr[Attribute.WIDTH], 2))));
                break;
            case Attribute.CENTERY:
                this._getAttr(Attribute.TOP);
                this._getAttr(Attribute.HEIGHT);
                this._attr[Attribute.CENTERY] = new c.Variable({name: (this._name || '|') + '.' + attr});
                this._solver.addConstraint(new c.Equation(this._attr[Attribute.CENTERY], c.plus(this._attr[Attribute.TOP], c.divide(this._attr[Attribute.HEIGHT], 2))));
                break;
        }
        return this._attr[attr];
    }
}

export {SubView as default};
