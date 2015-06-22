/**
* This Source Code is licensed under the MIT license. If a copy of the
* MIT-license was not distributed with this file, You can obtain one at:
* http://opensource.org/licenses/mit-license.html.
*
* @author: Hein Rutjes (IjzerenHein)
* @license MIT
* @copyright Gloey Apps, 2015
*
* @library autolayout.js
* @version 0.1.0
* @generated 22-06-2015
*/
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.AutoLayout = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Layout attributes.
 * @enum {String}
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var Attribute = {
    CONST: 'const',
    NOTANATTRIBUTE: 'const',
    VARIABLE: 'var',
    LEFT: 'left',
    RIGHT: 'right',
    TOP: 'top',
    BOTTOM: 'bottom',
    WIDTH: 'width',
    HEIGHT: 'height',
    CENTERX: 'centerX',
    CENTERY: 'centerY'
    /*LEADING: 'leading',
    TRAILING: 'trailing'*/
    // Extended format attributes
    //ZINDEX: 'zIndex'
};
exports['default'] = Attribute;
module.exports = exports['default'];

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _AttributeEs6 = require('./Attribute.es6');

var _AttributeEs62 = _interopRequireDefault(_AttributeEs6);

var _RelationEs6 = require('./Relation.es6');

var _RelationEs62 = _interopRequireDefault(_RelationEs6);

var _PriorityEs6 = require('./Priority.es6');

var _PriorityEs62 = _interopRequireDefault(_PriorityEs6);

var _VisualFormatEs6 = require('./VisualFormat.es6');

var _VisualFormatEs62 = _interopRequireDefault(_VisualFormatEs6);

var _ViewEs6 = require('./View.es6');

var _ViewEs62 = _interopRequireDefault(_ViewEs6);

var _SubViewEs6 = require('./SubView.es6');

var _SubViewEs62 = _interopRequireDefault(_SubViewEs6);

//import DOM from './DOM.es6';

/**
 * AutoLayout.
 *
 * @namespace AutoLayout
 * @property {Attribute} Attribute
 * @property {Relation} Relation
 * @property {Priority} Priority
 * @property {VisualFormat} VisualFormat
 * @property {View} View
 * @property {SubView} SubView
 */
var AutoLayout = {
  Attribute: _AttributeEs62['default'],
  Relation: _RelationEs62['default'],
  Priority: _PriorityEs62['default'],
  VisualFormat: _VisualFormatEs62['default'],
  View: _ViewEs62['default'],
  SubView: _SubViewEs62['default']
  //DOM: DOM
};

exports['default'] = AutoLayout;
module.exports = exports['default'];

},{"./Attribute.es6":1,"./Priority.es6":3,"./Relation.es6":4,"./SubView.es6":5,"./View.es6":6,"./VisualFormat.es6":7}],3:[function(require,module,exports){
/**
 * Layout priorities.
 * @enum {String}
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Priority = {
    REQUIRED: 1000,
    DEFAULTHIGH: 750,
    DEFAULTLOW: 250
    //FITTINGSIZELEVEL: 50,
};
exports["default"] = Priority;
module.exports = exports["default"];

},{}],4:[function(require,module,exports){
/**
 * Relation types.
 * @enum {String}
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var Relation = {
    /** Less than or equal */
    LEQ: 'leq',
    /** Equal */
    EQU: 'equ',
    /** Greater than or equal */
    GEQ: 'geq'
};
exports['default'] = Relation;
module.exports = exports['default'];

},{}],5:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _cassowaryBinC = (typeof window !== "undefined" ? window.c : typeof global !== "undefined" ? global.c : null);

var _cassowaryBinC2 = _interopRequireDefault(_cassowaryBinC);

var _AttributeEs6 = require('./Attribute.es6');

var _AttributeEs62 = _interopRequireDefault(_AttributeEs6);

/**
 * A SubView is automatically generated when constraints are added to a View.
 *
 * @namespace SubView
 */

var SubView = (function () {
    function SubView(options) {
        _classCallCheck(this, SubView);

        this._name = options.name;
        this._solver = options.solver;
        this._attr = {};
        if (!options.name) {
            this._attr[_AttributeEs62['default'].LEFT] = new _cassowaryBinC2['default'].Variable({ value: 0, name: '|.left' });
            this._solver.addConstraint(new _cassowaryBinC2['default'].StayConstraint(this._attr[_AttributeEs62['default'].LEFT], _cassowaryBinC2['default'].Strength.required));
            this._attr[_AttributeEs62['default'].TOP] = new _cassowaryBinC2['default'].Variable({ value: 0, name: '|.top' });
            this._solver.addConstraint(new _cassowaryBinC2['default'].StayConstraint(this._attr[_AttributeEs62['default'].TOP], _cassowaryBinC2['default'].Strength.required));
        }
    }

    _createClass(SubView, [{
        key: 'toJSON',
        value: function toJSON() {
            return {
                name: this.name,
                left: this.left,
                top: this.top,
                width: this.width,
                height: this.height
            };
        }
    }, {
        key: 'toString',
        value: function toString() {
            JSON.stringify(this.toJSON(), undefined, 2);
        }
    }, {
        key: 'name',

        /**
         * Name of the sub-view.
         * @readonly
         * @type {String}
         */
        get: function () {
            return this._name;
        }
    }, {
        key: 'left',

        /**
         * Left value (`Attribute.LEFT`).
         * @readonly
         * @type {Number}
         */
        get: function () {
            return this._getAttr(_AttributeEs62['default'].LEFT).value;
        }
    }, {
        key: 'right',

        /**
         * Right value (`Attribute.RIGHT`).
         * @readonly
         * @type {Number}
         */
        get: function () {
            return this._getAttr(_AttributeEs62['default'].RIGHT).value;
        }
    }, {
        key: 'width',

        /**
         * Width value (`Attribute.WIDTH`).
         * @type {Number}
         */
        get: function () {
            return this._getAttr(_AttributeEs62['default'].WIDTH).value;
        }
    }, {
        key: 'height',

        /**
         * Height value (`Attribute.HEIGHT`).
         * @readonly
         * @type {Number}
         */
        get: function () {
            return this._getAttr(_AttributeEs62['default'].HEIGHT).value;
        }
    }, {
        key: 'intrinsicWidth',

        /**
         * Intrinsic width of the sub-view.
         *
         * Use this property to explicitely set the width of the sub-view.
         *
         * @type {Number}
         */
        get: function () {
            return this._intrinsicWidth;
        },
        set: function (value) {
            if (value !== undefined && value !== this._intrinsicWidth) {
                var attr = this._getAttr(_AttributeEs62['default'].WIDTH);
                if (this._intrinsicWidth === undefined) {
                    this._solver.addEditVar(attr, new _cassowaryBinC2['default'].Strength('required', this._name ? 998 : 999, 1000, 1000));
                }
                this._intrinsicWidth = value;
                this._solver.suggestValue(attr, value);
                this._solver.resolve();
            }
        }
    }, {
        key: 'intrinsicHeight',

        /**
         * Intrinsic height of the sub-view.
         *
         * Use this property to explicitely set the width of the sub-view.
         *
         * @type {Number}
         */
        get: function () {
            return this._intrinsicHeight;
        },
        set: function (value) {
            if (value !== undefined && value !== this._intrinsicHeight) {
                var attr = this._getAttr(_AttributeEs62['default'].HEIGHT);
                if (this._intrinsicHeight === undefined) {
                    this._solver.addEditVar(attr, new _cassowaryBinC2['default'].Strength('required', this._name ? 998 : 999, 1000, 1000));
                }
                this._intrinsicHeight = value;
                this._solver.suggestValue(attr, value);
                this._solver.resolve();
            }
        }
    }, {
        key: 'top',

        /**
         * Top value (`Attribute.TOP`).
         * @readonly
         * @type {Number}
         */
        get: function () {
            return this._getAttr(_AttributeEs62['default'].TOP).value;
        }
    }, {
        key: 'bottom',

        /**
         * Bottom value (`Attribute.BOTTOM`).
         * @readonly
         * @type {Number}
         */
        get: function () {
            return this._getAttr(_AttributeEs62['default'].BOTTOM).value;
        }
    }, {
        key: 'centerX',

        /**
         * Horizontal center (`Attribute.CENTERX`).
         * @readonly
         * @type {Number}
         */
        get: function () {
            return this._getAttr(_AttributeEs62['default'].CENTERX).value;
        }
    }, {
        key: 'centerY',

        /**
         * Vertical center (`Attribute.CENTERY`).
         * @readonly
         * @type {Number}
         */
        get: function () {
            return this._getAttr(_AttributeEs62['default'].CENTERY).value;
        }
    }, {
        key: 'getValue',

        /**
         * Gets the value of one of the attributes.
         *
         * @param {String|Attribute} attr Attribute name (e.g. 'right', 'centerY', Attribute.TOP).
         * @return {Number} value or `undefined`
         */
        value: function getValue(attr) {
            return this._attr[attr] ? this._attr[attr].value : undefined;
        }
    }, {
        key: '_getAttr',

        /**
         * @private
         */
        value: function _getAttr(attr) {
            if (this._attr[attr]) {
                return this._attr[attr];
            }
            switch (attr) {
                case _AttributeEs62['default'].LEFT:
                case _AttributeEs62['default'].TOP:
                case _AttributeEs62['default'].WIDTH:
                case _AttributeEs62['default'].HEIGHT:
                    this._attr[attr] = new _cassowaryBinC2['default'].Variable({ value: 0, name: (this._name || '|') + '.' + attr });
                    break;
                case _AttributeEs62['default'].RIGHT:
                    this._getAttr(_AttributeEs62['default'].LEFT);
                    this._getAttr(_AttributeEs62['default'].WIDTH);
                    this._attr[_AttributeEs62['default'].RIGHT] = new _cassowaryBinC2['default'].Variable({ name: (this._name || '|') + '.' + attr });
                    this._solver.addConstraint(new _cassowaryBinC2['default'].Equation(this._attr[_AttributeEs62['default'].RIGHT], _cassowaryBinC2['default'].plus(this._attr[_AttributeEs62['default'].LEFT], this._attr[_AttributeEs62['default'].WIDTH])));
                    break;
                case _AttributeEs62['default'].BOTTOM:
                    this._getAttr(_AttributeEs62['default'].TOP);
                    this._getAttr(_AttributeEs62['default'].HEIGHT);
                    this._attr[_AttributeEs62['default'].BOTTOM] = new _cassowaryBinC2['default'].Variable({ name: (this._name || '|') + '.' + attr });
                    this._solver.addConstraint(new _cassowaryBinC2['default'].Equation(this._attr[_AttributeEs62['default'].BOTTOM], _cassowaryBinC2['default'].plus(this._attr[_AttributeEs62['default'].TOP], this._attr[_AttributeEs62['default'].HEIGHT])));
                    break;
                case _AttributeEs62['default'].CENTERX:
                    this._getAttr(_AttributeEs62['default'].LEFT);
                    this._getAttr(_AttributeEs62['default'].WIDTH);
                    this._attr[_AttributeEs62['default'].CENTERX] = new _cassowaryBinC2['default'].Variable({ name: (this._name || '|') + '.' + attr });
                    this._solver.addConstraint(new _cassowaryBinC2['default'].Equation(this._attr[_AttributeEs62['default'].CENTERX], _cassowaryBinC2['default'].plus(this._attr[_AttributeEs62['default'].LEFT], _cassowaryBinC2['default'].divide(this._attr[_AttributeEs62['default'].WIDTH], 2))));
                    break;
                case _AttributeEs62['default'].CENTERY:
                    this._getAttr(_AttributeEs62['default'].TOP);
                    this._getAttr(_AttributeEs62['default'].HEIGHT);
                    this._attr[_AttributeEs62['default'].CENTERY] = new _cassowaryBinC2['default'].Variable({ name: (this._name || '|') + '.' + attr });
                    this._solver.addConstraint(new _cassowaryBinC2['default'].Equation(this._attr[_AttributeEs62['default'].CENTERY], _cassowaryBinC2['default'].plus(this._attr[_AttributeEs62['default'].TOP], _cassowaryBinC2['default'].divide(this._attr[_AttributeEs62['default'].HEIGHT], 2))));
                    break;
            }
            return this._attr[attr];
        }
    }]);

    return SubView;
})();

exports['default'] = SubView;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Attribute.es6":1}],6:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _cassowaryBinC = (typeof window !== "undefined" ? window.c : typeof global !== "undefined" ? global.c : null);

var _cassowaryBinC2 = _interopRequireDefault(_cassowaryBinC);

var _AttributeEs6 = require('./Attribute.es6');

var _AttributeEs62 = _interopRequireDefault(_AttributeEs6);

var _RelationEs6 = require('./Relation.es6');

var _RelationEs62 = _interopRequireDefault(_RelationEs6);

var _SubViewEs6 = require('./SubView.es6');

var _SubViewEs62 = _interopRequireDefault(_SubViewEs6);

var defaultPriorityStrength = new _cassowaryBinC2['default'].Strength('defaultPriority', 0, 1000, 1000);

function _getConst(name, value) {
    var vr = new _cassowaryBinC2['default'].Variable({ value: value });
    this._solver.addConstraint(new _cassowaryBinC2['default'].StayConstraint(vr, _cassowaryBinC2['default'].Strength.required, 0));
    return vr;
}

function _getSubView(viewName) {
    if (!viewName) {
        return this._parentSubView;
    } else {
        this._subViews[viewName] = this._subViews[viewName] || new _SubViewEs62['default']({
            name: viewName,
            solver: this._solver
        });
        return this._subViews[viewName];
    }
}

function _getSpacing(constraint) {
    var index = 4;
    if (!constraint.view1 && constraint.attr1 === 'left') {
        index = 3;
    } else if (!constraint.view1 && constraint.attr1 === 'top') {
        index = 0;
    } else if (!constraint.view2 && constraint.attr2 === 'right') {
        index = 1;
    } else if (!constraint.view2 && constraint.attr2 === 'bottom') {
        index = 2;
    } else {
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
    this._spacingExpr = this._spacingExpr || new Array(6);
    if (!this._spacingVars[index]) {
        this._spacingVars[index] = new _cassowaryBinC2['default'].Variable({
            value: this._spacing[index],
            name: 'spacing[' + index + ']'
        });
        this._solver.addEditVar(this._spacingVars[index]);
        this._spacingExpr[index] = _cassowaryBinC2['default'].minus(0, this._spacingVars[index]);
    }
    return this._spacingExpr[index];
}

function _addConstraint(constraint) {
    //this.constraints.push(constraint);
    var relation = undefined;
    var multiplier = constraint.multiplier !== undefined ? constraint.multiplier : 1;
    var constant = constraint.constant !== undefined ? constraint.constant : 0;
    if (constant === 'default') {
        constant = _getSpacing.call(this, constraint);
    }
    var attr1 = _getSubView.call(this, constraint.view1)._getAttr(constraint.attr1);
    var attr2 = undefined;
    if (constraint.attr2 === _AttributeEs62['default'].CONST) {
        attr2 = _getConst.call(this, undefined, constraint.constant);
    } else {
        attr2 = _getSubView.call(this, constraint.view2)._getAttr(constraint.attr2);
        if (multiplier !== 1 && constant) {
            attr2 = _cassowaryBinC2['default'].plus(_cassowaryBinC2['default'].times(attr2, multiplier), constant);
        } else if (constant) {
            attr2 = _cassowaryBinC2['default'].plus(attr2, constant);
        } else if (multiplier !== 1) {
            attr2 = _cassowaryBinC2['default'].times(attr2, multiplier);
        }
    }
    var strength = constraint.priority !== undefined && constraint.priority < 1000 ? new _cassowaryBinC2['default'].Strength('priority', 0, constraint.priority, 1000) : defaultPriorityStrength;
    switch (constraint.relation) {
        case _RelationEs62['default'].EQU:
            relation = new _cassowaryBinC2['default'].Equation(attr1, attr2, strength);
            break;
        case _RelationEs62['default'].GEQ:
            relation = new _cassowaryBinC2['default'].Inequality(attr1, _cassowaryBinC2['default'].GEQ, attr2, strength);
            break;
        case _RelationEs62['default'].LEQ:
            relation = new _cassowaryBinC2['default'].Inequality(attr1, _cassowaryBinC2['default'].LEQ, attr2, strength);
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
 * |[Priority](#autolayoutpriority--enum)|`enum`|Default priority types for when adding constraints.|
 *
 * ### AutoLayout
 *
 * @module AutoLayout
 */

var View = (function () {

    /**
     * @class View
     * @param {Object} [options] Configuration options.
     * @param {Number} [options.width] Initial width of the view.
     * @param {Number} [options.height] Initial height of the view.
     * @param {Number|Object} [options.spacing] Spacing for the view (default: 8) (see `setSpacing`).
     * @param {Array} [options.constraints] One or more constraint definitions (see `addConstraints`).
     */

    function View(options) {
        _classCallCheck(this, View);

        this._solver = new _cassowaryBinC2['default'].SimplexSolver();
        this._subViews = {};
        //this._variables = {};
        this._spacing = {};
        this._parentSubView = new _SubViewEs62['default']({
            solver: this._solver
        });
        this.setSpacing(options && options.spacing !== undefined ? options.spacing : 8);
        //this.constraints = [];
        if (options) {
            if (options.width !== undefined || options.height !== undefined) {
                this.setSize(options.width, options.height);
            }
            if (options.constraints) {
                this.addConstraints(options.constraints);
            }
        }
    }

    _createClass(View, [{
        key: 'setSize',

        /**
         * Sets the width and height of the view.
         *
         * @param {Number} width Width of the view.
         * @param {Number} height Height of the view.
         * @return {View} this
         */
        value: function setSize(width, height /*, depth*/) {
            this._parentSubView.intrinsicWidth = width;
            this._parentSubView.intrinsicHeight = height;
            return this;
        }
    }, {
        key: 'width',

        /**
         * Width that was set using `setSize`.
         * @readonly
         * @type {Number}
         */
        get: function () {
            return this._parentSubView.intrinsicWidth;
        }
    }, {
        key: 'height',

        /**
         * Height that was set using `setSize`.
         * @readonly
         * @type {Number}
         */
        get: function () {
            return this._parentSubView.intrinsicHeight;
        }
    }, {
        key: 'fittingWidth',

        /**
         * Width that is calculated from the constraints and the `.intrinsicWidth` of
         * the sub-views.
         *
         * When the width has been explicitely set using `setSize`, the fittingWidth
         * will **always** be the same as the explicitely set width. To calculate the size
         * based on the content, use:
         * ```javascript
         * var view = new AutoLayout.View({
         *   constraints: VisualFormat.parse('|-[view1]-[view2]-'),
         *   spacing: 20
         * });
         * view.subViews.view1.intrinsicWidth = 100;
         * view.subViews.view2.intrinsicWidth = 100;
         * console.log('fittingWidth: ' + view.fittingWidth); // 260
         * ```
         *
         * @readonly
         * @type {Number}
         */
        get: function () {
            return this._parentSubView.width;
        }
    }, {
        key: 'fittingHeight',

        /**
         * Height that is calculated from the constraints and the `.intrinsicHeight` of
         * the sub-views.
         *
         * See `.fittingWidth`.
         *
         * @readonly
         * @type {Number}
         */
        get: function () {
            return this._parentSubView.height;
        }
    }, {
        key: 'setSpacing',

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
        value: function setSpacing(spacing) {
            // convert spacing into array: [top, right, bottom, left, horz, vert]
            switch (Array.isArray(spacing) ? spacing.length : -1) {
                case -1:
                    spacing = [spacing, spacing, spacing, spacing, spacing, spacing];break;
                case 1:
                    spacing = [spacing[0], spacing[0], spacing[0], spacing[0], spacing[0], spacing[0]];break;
                case 2:
                    spacing = [spacing[1], spacing[0], spacing[1], spacing[0], spacing[0], spacing[1]];break;
                case 6:
                    break;
                default:
                    throw 'Invalid spacing syntax';
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
    }, {
        key: 'addConstraint',

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
         *   constant: {Number},
         *   priority: {Number}(0..1000)
         * }
         * ```
         * @param {Object} constraint Constraint definition.
         * @return {View} this
         */
        value: function addConstraint(constraint) {
            _addConstraint.call(this, constraint);
            return this;
        }
    }, {
        key: 'addConstraints',

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
         *   constant: {Number},
         *   priority: {Number}(0..1000)
         * }
         * ```
         * @param {Array} constraints One or more constraint definitions.
         * @return {View} this
         */
        value: function addConstraints(constraints) {
            for (var i = 0; i < constraints.length; i++) {
                _addConstraint.call(this, constraints[i]);
            }
            return this;
        }
    }, {
        key: 'subViews',

        /**
         * Dictionary of `SubView` objects that have been created when adding constraints.
         * @readonly
         * @type {Object.SubView}
         */
        get: function () {
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

    }]);

    return View;
})();

exports['default'] = View;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Attribute.es6":1,"./Relation.es6":4,"./SubView.es6":5}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _parserParser = require('./parser/parser');

var _parserParser2 = _interopRequireDefault(_parserParser);

var _parserParserExt = require('./parser/parserExt');

var _parserParserExt2 = _interopRequireDefault(_parserParserExt);

var _AttributeEs6 = require('./Attribute.es6');

var _AttributeEs62 = _interopRequireDefault(_AttributeEs6);

/**
 * VisualFormat
 *
 * @namespace VisualFormat
 */

var VisualFormat = (function () {
    function VisualFormat() {
        _classCallCheck(this, VisualFormat);
    }

    _createClass(VisualFormat, null, [{
        key: 'parseLine',

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
        value: function parseLine(visualFormat, options) {
            if (visualFormat.length === 0 || options && options.extended && visualFormat.indexOf('//') === 0) {
                return [];
            }
            var constraints = [];
            var res = options && options.extended ? _parserParserExt2['default'].parse(visualFormat) : _parserParser2['default'].parse(visualFormat);
            if (options && options.outFormat === 'raw') {
                return [res];
            }
            var horizontal = res.orientation === 'horizontal';
            var view1 = undefined;
            var view2 = undefined;
            var relation = undefined;
            var attr1 = undefined;
            var attr2 = undefined;
            var item = undefined;
            for (var i = 0; i < res.cascade.length; i++) {
                item = res.cascade[i];
                if (!Array.isArray(item) && item.hasOwnProperty('view')) {
                    view1 = view2;
                    view2 = item.view;
                    if (view1 !== undefined && view2 !== undefined && relation) {
                        attr1 = horizontal ? _AttributeEs62['default'].RIGHT : _AttributeEs62['default'].BOTTOM;
                        attr2 = horizontal ? _AttributeEs62['default'].LEFT : _AttributeEs62['default'].TOP;
                        if (!view1) {
                            attr1 = horizontal ? _AttributeEs62['default'].LEFT : _AttributeEs62['default'].TOP;
                        }
                        if (!view2) {
                            attr2 = horizontal ? _AttributeEs62['default'].RIGHT : _AttributeEs62['default'].BOTTOM;
                        }
                        constraints.push({
                            view1: view1,
                            attr1: attr1,
                            relation: relation.relation,
                            view2: view2,
                            attr2: attr2,
                            multiplier: relation.multiplier,
                            constant: relation.constant === 'default' || !relation.constant ? relation.constant : -relation.constant,
                            priority: relation.priority
                            //,variable: relation.variable
                        });
                    }
                    relation = undefined;

                    // process view size constraints
                    if (item.constraints) {
                        for (var n = 0; n < item.constraints.length; n++) {
                            attr1 = horizontal ? _AttributeEs62['default'].WIDTH : _AttributeEs62['default'].HEIGHT;
                            attr2 = item.constraints[n].view || item.constraints[n].multiplier ? item.constraints[n].attribute || attr1 : item.constraints[n].variable ? _AttributeEs62['default'].VARIABLE : _AttributeEs62['default'].CONST;
                            constraints.push({
                                view1: item.view,
                                attr1: attr1,
                                relation: item.constraints[n].relation,
                                view2: item.constraints[n].view,
                                attr2: attr2,
                                multiplier: item.constraints[n].multiplier,
                                constant: item.constraints[n].constant,
                                priority: item.constraints[n].priority
                                //,variable: item.constraints[n].variable
                            });
                        }
                    }
                } else {
                    relation = item[0];
                }
            }
            return constraints;
        }
    }, {
        key: 'parse',

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
        value: function parse(visualFormat, options) {
            var lineSeperator = options && options.lineSeperator ? options.lineSeperator : '\n';
            if (!Array.isArray(visualFormat) && visualFormat.indexOf(lineSeperator) < 0) {
                try {
                    return this.parseLine(visualFormat, options);
                } catch (err) {
                    err.source = visualFormat;
                    throw err;
                }
            }

            // Decompose visual-format into an array of strings, and within those strings
            // search for line-endings, and treat each line as a seperate visual-format.
            visualFormat = Array.isArray(visualFormat) ? visualFormat : [visualFormat];
            var lines = undefined;
            var constraints = [];
            var lineIndex = 0;
            var line = undefined;
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
    }]);

    return VisualFormat;
})();

exports['default'] = VisualFormat;
module.exports = exports['default'];

},{"./Attribute.es6":1,"./parser/parser":8,"./parser/parserExt":9}],8:[function(require,module,exports){
"use strict";

module.exports = (function () {
  /*
   * Generated by PEG.js 0.8.0.
   *
   * http://pegjs.majda.cz/
   */

  function peg$subclass(child, parent) {
    function ctor() {
      this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(message, expected, found, offset, line, column) {
    this.message = message;
    this.expected = expected;
    this.found = found;
    this.offset = offset;
    this.line = line;
    this.column = column;

    this.name = "SyntaxError";
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},
        peg$FAILED = {},
        peg$startRuleFunctions = { visualFormatString: peg$parsevisualFormatString },
        peg$startRuleFunction = peg$parsevisualFormatString,
        peg$c0 = peg$FAILED,
        peg$c1 = null,
        peg$c2 = ":",
        peg$c3 = { type: "literal", value: ":", description: "\":\"" },
        peg$c4 = [],
        peg$c5 = function peg$c5(o, superto, view, views, tosuper) {
      return {
        orientation: o ? o[0] : "horizontal",
        cascade: (superto || []).concat([view], [].concat.apply([], views), tosuper || [])
      };
    },
        peg$c6 = "H",
        peg$c7 = { type: "literal", value: "H", description: "\"H\"" },
        peg$c8 = "V",
        peg$c9 = { type: "literal", value: "V", description: "\"V\"" },
        peg$c10 = function peg$c10(orient) {
      return orient == "H" ? "horizontal" : "vertical";
    },
        peg$c11 = "|",
        peg$c12 = { type: "literal", value: "|", description: "\"|\"" },
        peg$c13 = function peg$c13() {
      return { view: null };
    },
        peg$c14 = "[",
        peg$c15 = { type: "literal", value: "[", description: "\"[\"" },
        peg$c16 = "]",
        peg$c17 = { type: "literal", value: "]", description: "\"]\"" },
        peg$c18 = function peg$c18(view, predicates) {
      return extend(view, predicates ? { constraints: predicates } : {});
    },
        peg$c19 = "-",
        peg$c20 = { type: "literal", value: "-", description: "\"-\"" },
        peg$c21 = function peg$c21(predicateList) {
      return predicateList;
    },
        peg$c22 = function peg$c22() {
      return [{ relation: "equ", constant: "default", $parserOffset: offset() }];
    },
        peg$c23 = "",
        peg$c24 = function peg$c24() {
      return [{ relation: "equ", constant: 0, $parserOffset: offset() }];
    },
        peg$c25 = function peg$c25(n) {
      return [{ relation: "equ", constant: n, $parserOffset: offset() }];
    },
        peg$c26 = "(",
        peg$c27 = { type: "literal", value: "(", description: "\"(\"" },
        peg$c28 = ",",
        peg$c29 = { type: "literal", value: ",", description: "\",\"" },
        peg$c30 = ")",
        peg$c31 = { type: "literal", value: ")", description: "\")\"" },
        peg$c32 = function peg$c32(p, ps) {
      return [p].concat(ps.map(function (p) {
        return p[1];
      }));
    },
        peg$c33 = "@",
        peg$c34 = { type: "literal", value: "@", description: "\"@\"" },
        peg$c35 = function peg$c35(r, o, p) {
      return extend({ relation: "equ" }, r || {}, o, p ? p[1] : {});
    },
        peg$c36 = "==",
        peg$c37 = { type: "literal", value: "==", description: "\"==\"" },
        peg$c38 = function peg$c38() {
      return { relation: "equ", $parserOffset: offset() };
    },
        peg$c39 = "<=",
        peg$c40 = { type: "literal", value: "<=", description: "\"<=\"" },
        peg$c41 = function peg$c41() {
      return { relation: "leq", $parserOffset: offset() };
    },
        peg$c42 = ">=",
        peg$c43 = { type: "literal", value: ">=", description: "\">=\"" },
        peg$c44 = function peg$c44() {
      return { relation: "geq", $parserOffset: offset() };
    },
        peg$c45 = function peg$c45(n) {
      return { priority: n };
    },
        peg$c46 = function peg$c46(n) {
      return { constant: n };
    },
        peg$c47 = /^[a-zA-Z_]/,
        peg$c48 = { type: "class", value: "[a-zA-Z_]", description: "[a-zA-Z_]" },
        peg$c49 = /^[a-zA-Z0-9_]/,
        peg$c50 = { type: "class", value: "[a-zA-Z0-9_]", description: "[a-zA-Z0-9_]" },
        peg$c51 = function peg$c51(f, v) {
      return { view: f + v };
    },
        peg$c52 = /^[0-9]/,
        peg$c53 = { type: "class", value: "[0-9]", description: "[0-9]" },
        peg$c54 = function peg$c54(digits) {
      return parseInt(digits.join(""), 10);
    },
        peg$currPos = 0,
        peg$reportedPos = 0,
        peg$cachedPos = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos = 0,
        peg$maxFailExpected = [],
        peg$silentFails = 0,
        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$reportedPos, peg$currPos);
    }

    function offset() {
      return peg$reportedPos;
    }

    function line() {
      return peg$computePosDetails(peg$reportedPos).line;
    }

    function column() {
      return peg$computePosDetails(peg$reportedPos).column;
    }

    function expected(description) {
      throw peg$buildException(null, [{ type: "other", description: description }], peg$reportedPos);
    }

    function error(message) {
      throw peg$buildException(message, null, peg$reportedPos);
    }

    function peg$computePosDetails(pos) {
      function advance(details, startPos, endPos) {
        var p, ch;

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) {
              details.line++;
            }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos);
        peg$cachedPos = pos;
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) {
        return;
      }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, pos) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function (a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) {
            return ch.charCodeAt(0).toString(16).toUpperCase();
          }

          return s.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (ch) {
            return "\\x0" + hex(ch);
          }).replace(/[\x10-\x1F\x80-\xFF]/g, function (ch) {
            return "\\x" + hex(ch);
          }).replace(/[\u0180-\u0FFF]/g, function (ch) {
            return "\\u0" + hex(ch);
          }).replace(/[\u1080-\uFFFF]/g, function (ch) {
            return "\\u" + hex(ch);
          });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc,
            foundDesc,
            i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1 ? expectedDescs.slice(0, -1).join(", ") + " or " + expectedDescs[expected.length - 1] : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      var posDetails = peg$computePosDetails(pos),
          found = pos < input.length ? input.charAt(pos) : null;

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new SyntaxError(message !== null ? message : buildMessage(expected, found), expected, found, pos, posDetails.line, posDetails.column);
    }

    function peg$parsevisualFormatString() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parseorientation();
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 58) {
          s3 = peg$c2;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c3);
          }
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 === peg$FAILED) {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = peg$parsesuperview();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseconnection();
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$c0;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 === peg$FAILED) {
          s2 = peg$c1;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseview();
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$currPos;
            s6 = peg$parseconnection();
            if (s6 !== peg$FAILED) {
              s7 = peg$parseview();
              if (s7 !== peg$FAILED) {
                s6 = [s6, s7];
                s5 = s6;
              } else {
                peg$currPos = s5;
                s5 = peg$c0;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$c0;
            }
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$currPos;
              s6 = peg$parseconnection();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseview();
                if (s7 !== peg$FAILED) {
                  s6 = [s6, s7];
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$c0;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$c0;
              }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$currPos;
              s6 = peg$parseconnection();
              if (s6 !== peg$FAILED) {
                s7 = peg$parsesuperview();
                if (s7 !== peg$FAILED) {
                  s6 = [s6, s7];
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$c0;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$c0;
              }
              if (s5 === peg$FAILED) {
                s5 = peg$c1;
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c5(s1, s2, s3, s4, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseorientation() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 72) {
        s1 = peg$c6;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c7);
        }
      }
      if (s1 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 86) {
          s1 = peg$c8;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c9);
          }
        }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c10(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsesuperview() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 124) {
        s1 = peg$c11;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c12);
        }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c13();
      }
      s0 = s1;

      return s0;
    }

    function peg$parseview() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 91) {
        s1 = peg$c14;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c15);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseviewName();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsepredicateListWithParens();
          if (s3 === peg$FAILED) {
            s3 = peg$c1;
          }
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 93) {
              s4 = peg$c16;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c17);
              }
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c18(s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseconnection() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 45) {
        s1 = peg$c19;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c20);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsepredicateList();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 45) {
            s3 = peg$c19;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c20);
            }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c21(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 45) {
          s1 = peg$c19;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c20);
          }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c22();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$c23;
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c24();
          }
          s0 = s1;
        }
      }

      return s0;
    }

    function peg$parsepredicateList() {
      var s0;

      s0 = peg$parsesimplePredicate();
      if (s0 === peg$FAILED) {
        s0 = peg$parsepredicateListWithParens();
      }

      return s0;
    }

    function peg$parsesimplePredicate() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsenumber();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c25(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsepredicateListWithParens() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c26;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c27);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsepredicate();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 44) {
            s5 = peg$c28;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c29);
            }
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parsepredicate();
            if (s6 !== peg$FAILED) {
              s5 = [s5, s6];
              s4 = s5;
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 44) {
              s5 = peg$c28;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c29);
              }
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parsepredicate();
              if (s6 !== peg$FAILED) {
                s5 = [s5, s6];
                s4 = s5;
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          }
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 41) {
              s4 = peg$c30;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c31);
              }
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c32(s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsepredicate() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parserelation();
      if (s1 === peg$FAILED) {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseobjectOfPredicate();
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 64) {
            s4 = peg$c33;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c34);
            }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsepriority();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
          if (s3 === peg$FAILED) {
            s3 = peg$c1;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c35(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parserelation() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c36) {
        s1 = peg$c36;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c37);
        }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c38();
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c39) {
          s1 = peg$c39;
          peg$currPos += 2;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c40);
          }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c41();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c42) {
            s1 = peg$c42;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c43);
            }
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c44();
          }
          s0 = s1;
        }
      }

      return s0;
    }

    function peg$parseobjectOfPredicate() {
      var s0;

      s0 = peg$parseconstant();
      if (s0 === peg$FAILED) {
        s0 = peg$parseviewName();
      }

      return s0;
    }

    function peg$parsepriority() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsenumber();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c45(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseconstant() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsenumber();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c46(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseviewName() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = [];
      if (peg$c47.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c48);
        }
      }
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (peg$c47.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c48);
            }
          }
        }
      } else {
        s2 = peg$c0;
      }
      if (s2 !== peg$FAILED) {
        s2 = input.substring(s1, peg$currPos);
      }
      s1 = s2;
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = [];
        if (peg$c49.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c50);
          }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$c49.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c50);
            }
          }
        }
        if (s3 !== peg$FAILED) {
          s3 = input.substring(s2, peg$currPos);
        }
        s2 = s3;
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c51(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsenumber() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c52.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c53);
        }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c52.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c53);
            }
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c54(s1);
      }
      s0 = s1;

      return s0;
    }

    function extend(dst) {
      for (var i = 1; i < arguments.length; i++) {
        for (var k in arguments[i]) {
          dst[k] = arguments[i][k];
        }
      }
      return dst;
    }

    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse: parse
  };
})();

},{}],9:[function(require,module,exports){
"use strict";

module.exports = (function () {
  /*
   * Generated by PEG.js 0.8.0.
   *
   * http://pegjs.majda.cz/
   */

  function peg$subclass(child, parent) {
    function ctor() {
      this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(message, expected, found, offset, line, column) {
    this.message = message;
    this.expected = expected;
    this.found = found;
    this.offset = offset;
    this.line = line;
    this.column = column;

    this.name = "SyntaxError";
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},
        peg$FAILED = {},
        peg$startRuleFunctions = { visualFormatString: peg$parsevisualFormatString },
        peg$startRuleFunction = peg$parsevisualFormatString,
        peg$c0 = peg$FAILED,
        peg$c1 = null,
        peg$c2 = ":",
        peg$c3 = { type: "literal", value: ":", description: "\":\"" },
        peg$c4 = [],
        peg$c5 = function peg$c5(o, superto, view, views, tosuper, comments) {
      return {
        orientation: o ? o[0] : "horizontal",
        cascade: (superto || []).concat([view], [].concat.apply([], views), tosuper || [])
      };
    },
        peg$c6 = "H",
        peg$c7 = { type: "literal", value: "H", description: "\"H\"" },
        peg$c8 = "V",
        peg$c9 = { type: "literal", value: "V", description: "\"V\"" },
        peg$c10 = function peg$c10(orient) {
      return orient == "H" ? "horizontal" : "vertical";
    },
        peg$c11 = " ",
        peg$c12 = { type: "literal", value: " ", description: "\" \"" },
        peg$c13 = "//",
        peg$c14 = { type: "literal", value: "//", description: "\"//\"" },
        peg$c15 = { type: "any", description: "any character" },
        peg$c16 = "|",
        peg$c17 = { type: "literal", value: "|", description: "\"|\"" },
        peg$c18 = function peg$c18() {
      return { view: null };
    },
        peg$c19 = "[",
        peg$c20 = { type: "literal", value: "[", description: "\"[\"" },
        peg$c21 = "]",
        peg$c22 = { type: "literal", value: "]", description: "\"]\"" },
        peg$c23 = function peg$c23(view, predicates) {
      return extend(view, predicates ? { constraints: predicates } : {});
    },
        peg$c24 = "-",
        peg$c25 = { type: "literal", value: "-", description: "\"-\"" },
        peg$c26 = function peg$c26(predicateList) {
      return predicateList;
    },
        peg$c27 = function peg$c27() {
      return [{ relation: "equ", constant: "default", $parserOffset: offset() }];
    },
        peg$c28 = "",
        peg$c29 = function peg$c29() {
      return [{ relation: "equ", constant: 0, $parserOffset: offset() }];
    },
        peg$c30 = function peg$c30(n) {
      return [{ relation: "equ", constant: n, $parserOffset: offset() }];
    },
        peg$c31 = "(",
        peg$c32 = { type: "literal", value: "(", description: "\"(\"" },
        peg$c33 = ",",
        peg$c34 = { type: "literal", value: ",", description: "\",\"" },
        peg$c35 = ")",
        peg$c36 = { type: "literal", value: ")", description: "\")\"" },
        peg$c37 = function peg$c37(p, ps) {
      return [p].concat(ps.map(function (p) {
        return p[1];
      }));
    },
        peg$c38 = "@",
        peg$c39 = { type: "literal", value: "@", description: "\"@\"" },
        peg$c40 = function peg$c40(r, o, p) {
      return extend({ relation: "equ" }, r || {}, o, p ? p[1] : {});
    },
        peg$c41 = "==",
        peg$c42 = { type: "literal", value: "==", description: "\"==\"" },
        peg$c43 = function peg$c43() {
      return { relation: "equ", $parserOffset: offset() };
    },
        peg$c44 = "<=",
        peg$c45 = { type: "literal", value: "<=", description: "\"<=\"" },
        peg$c46 = function peg$c46() {
      return { relation: "leq", $parserOffset: offset() };
    },
        peg$c47 = ">=",
        peg$c48 = { type: "literal", value: ">=", description: "\">=\"" },
        peg$c49 = function peg$c49() {
      return { relation: "geq", $parserOffset: offset() };
    },
        peg$c50 = function peg$c50(n) {
      return { priority: n };
    },
        peg$c51 = function peg$c51(n) {
      return { constant: n };
    },
        peg$c52 = "%",
        peg$c53 = { type: "literal", value: "%", description: "\"%\"" },
        peg$c54 = function peg$c54(n) {
      return { view: null, multiplier: n / 100 };
    },
        peg$c55 = function peg$c55(vn, a, m, c) {
      return { view: vn.view, attribute: a ? a : undefined, multiplier: m ? m : 1, constant: c ? c : undefined };
    },
        peg$c56 = ".left",
        peg$c57 = { type: "literal", value: ".left", description: "\".left\"" },
        peg$c58 = function peg$c58() {
      return "left";
    },
        peg$c59 = ".right",
        peg$c60 = { type: "literal", value: ".right", description: "\".right\"" },
        peg$c61 = function peg$c61() {
      return "right";
    },
        peg$c62 = ".top",
        peg$c63 = { type: "literal", value: ".top", description: "\".top\"" },
        peg$c64 = function peg$c64() {
      return "top";
    },
        peg$c65 = ".bottom",
        peg$c66 = { type: "literal", value: ".bottom", description: "\".bottom\"" },
        peg$c67 = function peg$c67() {
      return "bottom";
    },
        peg$c68 = ".width",
        peg$c69 = { type: "literal", value: ".width", description: "\".width\"" },
        peg$c70 = function peg$c70() {
      return "width";
    },
        peg$c71 = ".height",
        peg$c72 = { type: "literal", value: ".height", description: "\".height\"" },
        peg$c73 = function peg$c73() {
      return "height";
    },
        peg$c74 = ".centerX",
        peg$c75 = { type: "literal", value: ".centerX", description: "\".centerX\"" },
        peg$c76 = function peg$c76() {
      return "centerX";
    },
        peg$c77 = ".centerY",
        peg$c78 = { type: "literal", value: ".centerY", description: "\".centerY\"" },
        peg$c79 = function peg$c79() {
      return "centerY";
    },
        peg$c80 = "/",
        peg$c81 = { type: "literal", value: "/", description: "\"/\"" },
        peg$c82 = function peg$c82(n) {
      return 1 / n;
    },
        peg$c83 = "*",
        peg$c84 = { type: "literal", value: "*", description: "\"*\"" },
        peg$c85 = function peg$c85(n) {
      return n;
    },
        peg$c86 = function peg$c86(n) {
      return -n;
    },
        peg$c87 = "+",
        peg$c88 = { type: "literal", value: "+", description: "\"+\"" },
        peg$c89 = /^[a-zA-Z_]/,
        peg$c90 = { type: "class", value: "[a-zA-Z_]", description: "[a-zA-Z_]" },
        peg$c91 = /^[a-zA-Z0-9_]/,
        peg$c92 = { type: "class", value: "[a-zA-Z0-9_]", description: "[a-zA-Z0-9_]" },
        peg$c93 = function peg$c93(f, v) {
      return { view: f + v };
    },
        peg$c94 = /^[0-9]/,
        peg$c95 = { type: "class", value: "[0-9]", description: "[0-9]" },
        peg$c96 = function peg$c96(digits) {
      return parseInt(digits.join(""), 10);
    },
        peg$currPos = 0,
        peg$reportedPos = 0,
        peg$cachedPos = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos = 0,
        peg$maxFailExpected = [],
        peg$silentFails = 0,
        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$reportedPos, peg$currPos);
    }

    function offset() {
      return peg$reportedPos;
    }

    function line() {
      return peg$computePosDetails(peg$reportedPos).line;
    }

    function column() {
      return peg$computePosDetails(peg$reportedPos).column;
    }

    function expected(description) {
      throw peg$buildException(null, [{ type: "other", description: description }], peg$reportedPos);
    }

    function error(message) {
      throw peg$buildException(message, null, peg$reportedPos);
    }

    function peg$computePosDetails(pos) {
      function advance(details, startPos, endPos) {
        var p, ch;

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) {
              details.line++;
            }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos);
        peg$cachedPos = pos;
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) {
        return;
      }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, pos) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function (a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) {
            return ch.charCodeAt(0).toString(16).toUpperCase();
          }

          return s.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (ch) {
            return "\\x0" + hex(ch);
          }).replace(/[\x10-\x1F\x80-\xFF]/g, function (ch) {
            return "\\x" + hex(ch);
          }).replace(/[\u0180-\u0FFF]/g, function (ch) {
            return "\\u0" + hex(ch);
          }).replace(/[\u1080-\uFFFF]/g, function (ch) {
            return "\\u" + hex(ch);
          });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc,
            foundDesc,
            i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1 ? expectedDescs.slice(0, -1).join(", ") + " or " + expectedDescs[expected.length - 1] : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      var posDetails = peg$computePosDetails(pos),
          found = pos < input.length ? input.charAt(pos) : null;

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new SyntaxError(message !== null ? message : buildMessage(expected, found), expected, found, pos, posDetails.line, posDetails.column);
    }

    function peg$parsevisualFormatString() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parseorientation();
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 58) {
          s3 = peg$c2;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c3);
          }
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 === peg$FAILED) {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = peg$parsesuperview();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseconnection();
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$c0;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 === peg$FAILED) {
          s2 = peg$c1;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseview();
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$currPos;
            s6 = peg$parseconnection();
            if (s6 !== peg$FAILED) {
              s7 = peg$parseview();
              if (s7 !== peg$FAILED) {
                s6 = [s6, s7];
                s5 = s6;
              } else {
                peg$currPos = s5;
                s5 = peg$c0;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$c0;
            }
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$currPos;
              s6 = peg$parseconnection();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseview();
                if (s7 !== peg$FAILED) {
                  s6 = [s6, s7];
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$c0;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$c0;
              }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$currPos;
              s6 = peg$parseconnection();
              if (s6 !== peg$FAILED) {
                s7 = peg$parsesuperview();
                if (s7 !== peg$FAILED) {
                  s6 = [s6, s7];
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$c0;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$c0;
              }
              if (s5 === peg$FAILED) {
                s5 = peg$c1;
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parsecomments();
                if (s6 === peg$FAILED) {
                  s6 = peg$c1;
                }
                if (s6 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c5(s1, s2, s3, s4, s5, s6);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseorientation() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 72) {
        s1 = peg$c6;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c7);
        }
      }
      if (s1 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 86) {
          s1 = peg$c8;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c9);
          }
        }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c10(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsecomments() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = [];
      if (input.charCodeAt(peg$currPos) === 32) {
        s2 = peg$c11;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c12);
        }
      }
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (input.charCodeAt(peg$currPos) === 32) {
          s2 = peg$c11;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c12);
          }
        }
      }
      if (s1 !== peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c13) {
          s2 = peg$c13;
          peg$currPos += 2;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c14);
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          if (input.length > peg$currPos) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c15);
            }
          }
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            if (input.length > peg$currPos) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c15);
              }
            }
          }
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsesuperview() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 124) {
        s1 = peg$c16;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c17);
        }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c18();
      }
      s0 = s1;

      return s0;
    }

    function peg$parseview() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 91) {
        s1 = peg$c19;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c20);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseviewName();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsepredicateListWithParens();
          if (s3 === peg$FAILED) {
            s3 = peg$c1;
          }
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 93) {
              s4 = peg$c21;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c22);
              }
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c23(s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseconnection() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 45) {
        s1 = peg$c24;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c25);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsepredicateList();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 45) {
            s3 = peg$c24;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c25);
            }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c26(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 45) {
          s1 = peg$c24;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c25);
          }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c27();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$c28;
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c29();
          }
          s0 = s1;
        }
      }

      return s0;
    }

    function peg$parsepredicateList() {
      var s0;

      s0 = peg$parsesimplePredicate();
      if (s0 === peg$FAILED) {
        s0 = peg$parsepredicateListWithParens();
      }

      return s0;
    }

    function peg$parsesimplePredicate() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsenumber();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c30(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsepredicateListWithParens() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c31;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c32);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsepredicate();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 44) {
            s5 = peg$c33;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c34);
            }
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parsepredicate();
            if (s6 !== peg$FAILED) {
              s5 = [s5, s6];
              s4 = s5;
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 44) {
              s5 = peg$c33;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c34);
              }
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parsepredicate();
              if (s6 !== peg$FAILED) {
                s5 = [s5, s6];
                s4 = s5;
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          }
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 41) {
              s4 = peg$c35;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c36);
              }
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c37(s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsepredicate() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parserelation();
      if (s1 === peg$FAILED) {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseobjectOfPredicate();
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 64) {
            s4 = peg$c38;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c39);
            }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsepriority();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
          if (s3 === peg$FAILED) {
            s3 = peg$c1;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c40(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parserelation() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c41) {
        s1 = peg$c41;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c42);
        }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c43();
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c44) {
          s1 = peg$c44;
          peg$currPos += 2;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c45);
          }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c46();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c47) {
            s1 = peg$c47;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c48);
            }
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c49();
          }
          s0 = s1;
        }
      }

      return s0;
    }

    function peg$parseobjectOfPredicate() {
      var s0;

      s0 = peg$parsepercentage();
      if (s0 === peg$FAILED) {
        s0 = peg$parseconstant();
        if (s0 === peg$FAILED) {
          s0 = peg$parseviewPredicate();
        }
      }

      return s0;
    }

    function peg$parsepriority() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsenumber();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c50(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseconstant() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsenumber();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c51(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsepercentage() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parsenumber();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 37) {
          s2 = peg$c52;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c53);
          }
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c54(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseviewPredicate() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parseviewName();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseattribute();
        if (s2 === peg$FAILED) {
          s2 = peg$c1;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsemultiplier();
          if (s3 === peg$FAILED) {
            s3 = peg$c1;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseconstantExpr();
            if (s4 === peg$FAILED) {
              s4 = peg$c1;
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c55(s1, s2, s3, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseattribute() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c56) {
        s1 = peg$c56;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c57);
        }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c58();
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 6) === peg$c59) {
          s1 = peg$c59;
          peg$currPos += 6;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c60);
          }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c61();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 4) === peg$c62) {
            s1 = peg$c62;
            peg$currPos += 4;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c63);
            }
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c64();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 7) === peg$c65) {
              s1 = peg$c65;
              peg$currPos += 7;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c66);
              }
            }
            if (s1 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c67();
            }
            s0 = s1;
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.substr(peg$currPos, 6) === peg$c68) {
                s1 = peg$c68;
                peg$currPos += 6;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c69);
                }
              }
              if (s1 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c70();
              }
              s0 = s1;
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.substr(peg$currPos, 7) === peg$c71) {
                  s1 = peg$c71;
                  peg$currPos += 7;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c72);
                  }
                }
                if (s1 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c73();
                }
                s0 = s1;
                if (s0 === peg$FAILED) {
                  s0 = peg$currPos;
                  if (input.substr(peg$currPos, 8) === peg$c74) {
                    s1 = peg$c74;
                    peg$currPos += 8;
                  } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c75);
                    }
                  }
                  if (s1 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c76();
                  }
                  s0 = s1;
                  if (s0 === peg$FAILED) {
                    s0 = peg$currPos;
                    if (input.substr(peg$currPos, 8) === peg$c77) {
                      s1 = peg$c77;
                      peg$currPos += 8;
                    } else {
                      s1 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c78);
                      }
                    }
                    if (s1 !== peg$FAILED) {
                      peg$reportedPos = s0;
                      s1 = peg$c79();
                    }
                    s0 = s1;
                  }
                }
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parsemultiplier() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 47) {
        s1 = peg$c80;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c81);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsenumber();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c82(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 42) {
          s1 = peg$c83;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c84);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parsenumber();
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c85(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      }

      return s0;
    }

    function peg$parseconstantExpr() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 45) {
        s1 = peg$c24;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c25);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsenumber();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c86(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 43) {
          s1 = peg$c87;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c88);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parsenumber();
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c85(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      }

      return s0;
    }

    function peg$parseviewName() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = [];
      if (peg$c89.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c90);
        }
      }
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (peg$c89.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c90);
            }
          }
        }
      } else {
        s2 = peg$c0;
      }
      if (s2 !== peg$FAILED) {
        s2 = input.substring(s1, peg$currPos);
      }
      s1 = s2;
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = [];
        if (peg$c91.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c92);
          }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$c91.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c92);
            }
          }
        }
        if (s3 !== peg$FAILED) {
          s3 = input.substring(s2, peg$currPos);
        }
        s2 = s3;
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c93(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsenumber() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c94.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c95);
        }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c94.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c95);
            }
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c96(s1);
      }
      s0 = s1;

      return s0;
    }

    function extend(dst) {
      for (var i = 1; i < arguments.length; i++) {
        for (var k in arguments[i]) {
          dst[k] = arguments[i][k];
        }
      }
      return dst;
    }

    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse: parse
  };
})();

},{}]},{},[2])(2)
});