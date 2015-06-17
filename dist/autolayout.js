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
* @generated 17-06-2015
*/
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.AutoLayout = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";(function(){(function(scope){"use strict";try{(function(){}).bind(scope);}catch(e) {Object.defineProperty(Function.prototype, "bind", {value:function value(scope){var f=this;return function(){return f.apply(scope, arguments);};}, enumerable:false, configurable:true, writable:true});}var inBrowser=typeof scope["HTMLElement"] != "undefined";var getTagName=function getTagName(proto){var tn=null;while(proto && proto != Object.prototype) {if(proto.tagName){tn = proto.tagName;break;}proto = proto.prototype;}return tn || "div";};var epsilon=1e-8;var _t_map={};var walkForMethod=function walkForMethod(_x, _x2){var _again=true;_function: while(_again) {var ctor=_x, name=_x2;p = undefined;_again = false;if(!ctor || !name)return;if(typeof ctor[name] == "function"){return ctor[name];}var p=ctor.prototype;if(p && typeof p[name] == "function"){return p[name];}if(p === Object.prototype || p === Function.prototype){return;}if(typeof ctor.__super__ == "function"){_x = ctor.__super__;_x2 = name;_again = true;continue _function;}}};var c=scope.c = {debug:false, trace:false, verbose:false, traceAdded:false, GC:false, GEQ:1, LEQ:2, inherit:function inherit(props){var ctor=null;var parent=null;if(props["extends"]){parent = props["extends"];delete props["extends"];}if(props["initialize"]){ctor = props["initialize"];delete props["initialize"];}var realCtor=ctor || function(){};Object.defineProperty(realCtor, "__super__", {value:parent?parent:Object, enumerable:false, configurable:true, writable:false});if(props["_t"]){_t_map[props["_t"]] = realCtor;}var rp=realCtor.prototype = Object.create(parent?parent.prototype:Object.prototype);this.extend(rp, props);if(inBrowser){if(parent && parent.prototype instanceof scope.HTMLElement){var intermediateCtor=realCtor;var tn=getTagName(rp);var upgrade=function upgrade(el){el.__proto__ = rp;intermediateCtor.apply(el, arguments);if(rp["created"]){el.created();}if(rp["decorate"]){el.decorate();}return el;};this.extend(rp, {upgrade:upgrade});realCtor = function(){return upgrade(scope.document.createElement(tn));};realCtor.prototype = rp;this.extend(realCtor, {ctor:intermediateCtor});}}return realCtor;}, extend:function extend(obj, props){this.own(props, function(x){var pd=Object.getOwnPropertyDescriptor(props, x);try{if(typeof pd["get"] == "function" || typeof pd["set"] == "function"){Object.defineProperty(obj, x, pd);}else if(typeof pd["value"] == "function" || x.charAt(0) === "_"){pd.writable = true;pd.configurable = true;pd.enumerable = false;Object.defineProperty(obj, x, pd);}else {obj[x] = props[x];}}catch(e) {}});return obj;}, own:function own(obj, cb, context){Object.getOwnPropertyNames(obj).forEach(cb, context || scope);return obj;}, traceprint:function traceprint(s){if(c.verbose)console.log(s);}, fnenterprint:function fnenterprint(s){console.log("* " + s);}, fnexitprint:function fnexitprint(s){console.log("- " + s);}, assert:function assert(f, description){if(!f){throw new c.InternalError("Assertion failed: " + description);}}, plus:function plus(e1, e2){if(!(e1 instanceof c.Expression)){e1 = new c.Expression(e1);}if(!(e2 instanceof c.Expression)){e2 = new c.Expression(e2);}return e1.plus(e2);}, minus:function minus(e1, e2){if(!(e1 instanceof c.Expression)){e1 = new c.Expression(e1);}if(!(e2 instanceof c.Expression)){e2 = new c.Expression(e2);}return e1.minus(e2);}, times:function times(e1, e2){if(typeof e1 == "number" || e1 instanceof c.Variable){e1 = new c.Expression(e1);}if(typeof e2 == "number" || e2 instanceof c.Variable){e2 = new c.Expression(e2);}return e1.times(e2);}, divide:function divide(e1, e2){if(typeof e1 == "number" || e1 instanceof c.Variable){e1 = new c.Expression(e1);}if(typeof e2 == "number" || e2 instanceof c.Variable){e2 = new c.Expression(e2);}return e1.divide(e2);}, approx:function approx(a, b){if(a === b){return true;}var av, bv;av = a instanceof c.Variable?a.value:a;bv = b instanceof c.Variable?b.value:b;if(av == 0){return Math.abs(bv) < epsilon;}if(bv == 0){return Math.abs(av) < epsilon;}return Math.abs(av - bv) < Math.abs(av) * epsilon;}, _inc:(function(count){return function(){return count++;};})(0), parseJSON:function parseJSON(str){return JSON.parse(str, function(k, v){if(typeof v != "object" || typeof v["_t"] != "string"){return v;}var type=v["_t"];var ctor=_t_map[type];if(type && ctor){var fromJSON=walkForMethod(ctor, "fromJSON");if(fromJSON){return fromJSON(v, ctor);}}return v;});}};if(typeof require == "function" && typeof module != "undefined" && typeof load == "undefined"){scope.exports = c;}})(this);(function(c){"use strict";var keyCode=function keyCode(key){var kc=!!key.hashCode?key.hashCode:key.toString();return kc;};var copyOwn=function copyOwn(src, dest){Object.keys(src).forEach(function(x){dest[x] = src[x];});};if(false && typeof Map != "undefined"){c.HashTable = c.inherit({initialize:function initialize(){this.size = 0;this._store = new Map();this._keys = [];}, set:function set(key, value){this._store.set(key, value);if(this._keys.indexOf(key) == -1){this.size++;this._keys.push(key);}}, get:function get(key){return this._store.get(key);}, clear:function clear(){this.size = 0;this._store = new Map();this._keys = [];}, "delete":function _delete(key){if(this._store["delete"](key) && this.size > 0){delete this._keys[this._keys.indexOf(key)];this.size--;}}, each:function each(callback, scope){if(!this.size){return;}this._keys.forEach(function(k){if(typeof k == "undefined"){return;}var v=this._store.get(k);if(typeof v != "undefined"){callback.call(scope || null, k, v);}}, this);}, escapingEach:function escapingEach(callback, scope){if(!this.size){return;}var that=this;var kl=this._keys.length;var context;for(var x=0; x < kl; x++) {if(typeof this._keys[x] != "undefined"){(function(k){var v=that._store.get(k);if(typeof v != "undefined"){context = callback.call(scope || null, k, v);}})(this._keys[x]);if(context){if(context.retval !== undefined){return context;}if(context.brk){break;}}}}}, clone:function clone(){var n=new c.HashTable();if(this.size){this.each(function(k, v){n.set(k, v);});}return n;}});}else {var defaultContext={};c.HashTable = c.inherit({initialize:function initialize(){this.size = 0;this._store = {};this._keyStrMap = {};this._deleted = 0;}, set:function set(key, value){var hash=keyCode(key);if(!this._store.hasOwnProperty(hash)){this.size++;}this._store[hash] = value;this._keyStrMap[hash] = key;}, get:function get(key){if(!this.size){return null;}key = keyCode(key);var v=this._store[key];if(typeof v != "undefined"){return this._store[key];}return null;}, clear:function clear(){this.size = 0;this._store = {};this._keyStrMap = {};}, _compact:function _compact(){var ns={};copyOwn(this._store, ns);this._store = ns;}, _compactThreshold:100, _perhapsCompact:function _perhapsCompact(){if(this._size > 64)return;if(this._deleted > this._compactThreshold){this._compact();this._deleted = 0;}}, "delete":function _delete(key){key = keyCode(key);if(!this._store.hasOwnProperty(key)){return;}this._deleted++;delete this._store[key];if(this.size > 0){this.size--;}}, each:function each(callback, scope){if(!this.size){return;}this._perhapsCompact();var store=this._store;var keyMap=this._keyStrMap;Object.keys(this._store).forEach(function(k){callback.call(scope || null, keyMap[k], store[k]);}, this);}, escapingEach:function escapingEach(callback, scope){if(!this.size){return;}this._perhapsCompact();var that=this;var store=this._store;var keyMap=this._keyStrMap;var context=defaultContext;var kl=Object.keys(store);for(var x=0; x < kl.length; x++) {(function(v){if(that._store.hasOwnProperty(v)){context = callback.call(scope || null, keyMap[v], store[v]);}})(kl[x]);if(context){if(context.retval !== undefined){return context;}if(context.brk){break;}}}}, clone:function clone(){var n=new c.HashTable();if(this.size){n.size = this.size;copyOwn(this._store, n._store);copyOwn(this._keyStrMap, n._keyStrMap);}return n;}, equals:function equals(other){if(other === this){return true;}if(!(other instanceof c.HashTable) || other._size !== this._size){return false;}var codes=Object.keys(this._store);for(var i=0; i < codes.length; i++) {var code=codes[i];if(this._keyStrMap[code] !== other._keyStrMap[code] || this._store[code] !== other._store[code]){return false;}}return true;}, toString:function toString(h){var answer="";this.each(function(k, v){answer += k + " => " + v + "\n";});return answer;}});}})(this["c"] || module.parent.exports || {});(function(c){"use strict";c.HashSet = c.inherit({_t:"c.HashSet", initialize:function initialize(){this.storage = [];this.size = 0;}, add:function add(item){var s=this.storage, io=s.indexOf(item);if(s.indexOf(item) == -1){s.push(item);}this.size = this.storage.length;}, values:function values(){return this.storage;}, has:function has(item){var s=this.storage;return s.indexOf(item) != -1;}, "delete":function _delete(item){var io=this.storage.indexOf(item);if(io == -1){return null;}this.storage.splice(io, 1)[0];this.size = this.storage.length;}, clear:function clear(){this.storage.length = 0;}, each:function each(func, scope){if(this.size)this.storage.forEach(func, scope);}, escapingEach:function escapingEach(func, scope){if(this.size)this.storage.forEach(func, scope);}, toString:function toString(){var answer=this.size + " {";var first=true;this.each(function(e){if(!first){answer += ", ";}else {first = false;}answer += e;});answer += "}\n";return answer;}, toJSON:function toJSON(){var d=[];this.each(function(e){d.push(e.toJSON());});return {_t:"c.HashSet", data:d};}, fromJSON:function fromJSON(o){var r=new c.HashSet();if(o.data){r.size = o.data.length;r.storage = o.data;}return r;}});})(this["c"] || module.parent.exports || {});(function(c){"use strict";c.Error = c.inherit(Object.defineProperties({initialize:function initialize(s){if(s){this._description = s;}}, _name:"c.Error", _description:"An error has occured in Cassowary", toString:function toString(){return this.description;}}, {description:{set:function(v){this._description = v;}, get:function(){return "(" + this._name + ") " + this._description;}, configurable:true, enumerable:true}, message:{get:function(){return this.description;}, configurable:true, enumerable:true}}));var errorType=function errorType(name, error){return c.inherit({"extends":c.Error, initialize:function initialize(){c.Error.apply(this, arguments);}, _name:name || "", _description:error || ""});};c.ConstraintNotFound = errorType("c.ConstraintNotFound", "Tried to remove a constraint never added to the tableu");c.InternalError = errorType("c.InternalError");c.NonExpression = errorType("c.NonExpression", "The resulting expression would be non");c.NotEnoughStays = errorType("c.NotEnoughStays", "There are not enough stays to give specific values to every variable");c.RequiredFailure = errorType("c.RequiredFailure", "A required constraint cannot be satisfied");c.TooDifficult = errorType("c.TooDifficult", "The constraints are too difficult to solve");})(this["c"] || module.parent.exports || {});(function(c){"use strict";var multiplier=1000;c.SymbolicWeight = c.inherit({_t:"c.SymbolicWeight", initialize:function initialize(){this.value = 0;var factor=1;for(var i=arguments.length - 1; i >= 0; --i) {this.value += arguments[i] * factor;factor *= multiplier;}}, toJSON:function toJSON(){return {_t:this._t, value:this.value};}});})(this["c"] || module.parent.exports || {});(function(c){c.Strength = c.inherit(Object.defineProperties({initialize:function initialize(name, symbolicWeight, w2, w3){this.name = name;if(symbolicWeight instanceof c.SymbolicWeight){this.symbolicWeight = symbolicWeight;}else {this.symbolicWeight = new c.SymbolicWeight(symbolicWeight, w2, w3);}}, toString:function toString(){return this.name + (!this.isRequired?":" + this.symbolicWeight:"");}}, {required:{get:function(){return this === c.Strength.required;}, configurable:true, enumerable:true}}));c.Strength.required = new c.Strength("<Required>", 1000, 1000, 1000);c.Strength.strong = new c.Strength("strong", 1, 0, 0);c.Strength.medium = new c.Strength("medium", 0, 1, 0);c.Strength.weak = new c.Strength("weak", 0, 0, 1);})(this["c"] || (typeof module != "undefined"?module.parent.exports.c:{}));(function(c){"use strict";c.AbstractVariable = c.inherit({isDummy:false, isExternal:false, isPivotable:false, isRestricted:false, _init:function _init(args, varNamePrefix){this.hashCode = c._inc();this.name = (varNamePrefix || "") + this.hashCode;if(args){if(typeof args.name != "undefined"){this.name = args.name;}if(typeof args.value != "undefined"){this.value = args.value;}if(typeof args.prefix != "undefined"){this._prefix = args.prefix;}}}, _prefix:"", name:"", value:0, toJSON:function toJSON(){var o={};if(this._t){o._t = this._t;}if(this.name){o.name = this.name;}if(typeof this.value != "undefined"){o.value = this.value;}if(this._prefix){o._prefix = this._prefix;}if(this._t){o._t = this._t;}return o;}, fromJSON:function fromJSON(o, Ctor){var r=new Ctor();c.extend(r, o);return r;}, toString:function toString(){return this._prefix + "[" + this.name + ":" + this.value + "]";}});c.Variable = c.inherit({_t:"c.Variable", "extends":c.AbstractVariable, initialize:function initialize(args){this._init(args, "v");var vm=c.Variable._map;if(vm){vm[this.name] = this;}}, isExternal:true});c.DummyVariable = c.inherit({_t:"c.DummyVariable", "extends":c.AbstractVariable, initialize:function initialize(args){this._init(args, "d");}, isDummy:true, isRestricted:true, value:"dummy"});c.ObjectiveVariable = c.inherit({_t:"c.ObjectiveVariable", "extends":c.AbstractVariable, initialize:function initialize(args){this._init(args, "o");}, value:"obj"});c.SlackVariable = c.inherit({_t:"c.SlackVariable", "extends":c.AbstractVariable, initialize:function initialize(args){this._init(args, "s");}, isPivotable:true, isRestricted:true, value:"slack"});})(this["c"] || module.parent.exports || {});(function(c){"use strict";c.Point = c.inherit(Object.defineProperties({initialize:function initialize(x, y, suffix){if(x instanceof c.Variable){this._x = x;}else {var xArgs={value:x};if(suffix){xArgs.name = "x" + suffix;}this._x = new c.Variable(xArgs);}if(y instanceof c.Variable){this._y = y;}else {var yArgs={value:y};if(suffix){yArgs.name = "y" + suffix;}this._y = new c.Variable(yArgs);}}, toString:function toString(){return "(" + this.x + ", " + this.y + ")";}}, {x:{get:function(){return this._x;}, set:function(x){if(x instanceof c.Variable){this._x = x;}else {this._x.value = x;}}, configurable:true, enumerable:true}, y:{get:function(){return this._y;}, set:function(y){if(y instanceof c.Variable){this._y = y;}else {this._y.value = y;}}, configurable:true, enumerable:true}}));})(this["c"] || module.parent.exports || {});(function(c){"use strict";c.Expression = c.inherit(Object.defineProperties({initialize:function initialize(clv, value, constant){if(c.GC)console.log("new c.Expression");this.constant = typeof constant == "number" && !isNaN(constant)?constant:0;this.terms = new c.HashTable();if(clv instanceof c.AbstractVariable){this.setVariable(clv, typeof value == "number"?value:1);}else if(typeof clv == "number"){if(!isNaN(clv)){this.constant = clv;}else {console.trace();}}}, initializeFromHash:function initializeFromHash(constant, terms){if(c.verbose){console.log("*******************************");console.log("clone c.initializeFromHash");console.log("*******************************");}if(c.GC)console.log("clone c.Expression");this.constant = constant;this.terms = terms.clone();return this;}, multiplyMe:function multiplyMe(x){this.constant *= x;var t=this.terms;t.each(function(clv, coeff){t.set(clv, coeff * x);});return this;}, clone:function clone(){if(c.verbose){console.log("*******************************");console.log("clone c.Expression");console.log("*******************************");}var e=new c.Expression();e.initializeFromHash(this.constant, this.terms);return e;}, times:function times(x){if(typeof x == "number"){return this.clone().multiplyMe(x);}else {if(this.isConstant){return x.times(this.constant);}else if(x.isConstant){return this.times(x.constant);}else {throw new c.NonExpression();}}}, plus:function plus(expr){if(expr instanceof c.Expression){return this.clone().addExpression(expr, 1);}else if(expr instanceof c.Variable){return this.clone().addVariable(expr, 1);}}, minus:function minus(expr){if(expr instanceof c.Expression){return this.clone().addExpression(expr, -1);}else if(expr instanceof c.Variable){return this.clone().addVariable(expr, -1);}}, divide:function divide(x){if(typeof x == "number"){if(c.approx(x, 0)){throw new c.NonExpression();}return this.times(1 / x);}else if(x instanceof c.Expression){if(!x.isConstant){throw new c.NonExpression();}return this.times(1 / x.constant);}}, addExpression:function addExpression(expr, n, subject, solver){if(expr instanceof c.AbstractVariable){expr = new c.Expression(expr);if(c.trace)console.log("addExpression: Had to cast a var to an expression");}n = n || 1;this.constant += n * expr.constant;expr.terms.each(function(clv, coeff){this.addVariable(clv, coeff * n, subject, solver);}, this);return this;}, addVariable:function addVariable(v, cd, subject, solver){if(cd == null){cd = 1;}if(c.trace)console.log("c.Expression::addVariable():", v, cd);var coeff=this.terms.get(v);if(coeff){var newCoefficient=coeff + cd;if(newCoefficient == 0 || c.approx(newCoefficient, 0)){if(solver){solver.noteRemovedVariable(v, subject);}this.terms["delete"](v);}else {this.setVariable(v, newCoefficient);}}else {if(!c.approx(cd, 0)){this.setVariable(v, cd);if(solver){solver.noteAddedVariable(v, subject);}}}return this;}, setVariable:function setVariable(v, c){this.terms.set(v, c);return this;}, anyPivotableVariable:function anyPivotableVariable(){if(this.isConstant){throw new c.InternalError("anyPivotableVariable called on a constant");}var rv=this.terms.escapingEach(function(clv, c){if(clv.isPivotable)return {retval:clv};});if(rv && rv.retval !== undefined){return rv.retval;}return null;}, substituteOut:function substituteOut(outvar, expr, subject, solver){if(c.trace){c.fnenterprint("CLE:substituteOut: " + outvar + ", " + expr + ", " + subject + ", ...");c.traceprint("this = " + this);}var setVariable=this.setVariable.bind(this);var terms=this.terms;var multiplier=terms.get(outvar);terms["delete"](outvar);this.constant += multiplier * expr.constant;expr.terms.each(function(clv, coeff){var oldCoefficient=terms.get(clv);if(oldCoefficient){var newCoefficient=oldCoefficient + multiplier * coeff;if(c.approx(newCoefficient, 0)){solver.noteRemovedVariable(clv, subject);terms["delete"](clv);}else {setVariable(clv, newCoefficient);}}else {setVariable(clv, multiplier * coeff);if(solver){solver.noteAddedVariable(clv, subject);}}});if(c.trace)c.traceprint("Now this is " + this);}, changeSubject:function changeSubject(old_subject, new_subject){this.setVariable(old_subject, this.newSubject(new_subject));}, newSubject:function newSubject(subject){if(c.trace)c.fnenterprint("newSubject:" + subject);var reciprocal=1 / this.terms.get(subject);this.terms["delete"](subject);this.multiplyMe(-reciprocal);return reciprocal;}, coefficientFor:function coefficientFor(clv){return this.terms.get(clv) || 0;}, toString:function toString(){var bstr="";var needsplus=false;if(!c.approx(this.constant, 0) || this.isConstant){bstr += this.constant;if(this.isConstant){return bstr;}else {needsplus = true;}}this.terms.each(function(clv, coeff){if(needsplus){bstr += " + ";}bstr += coeff + "*" + clv;needsplus = true;});return bstr;}, equals:function equals(other){if(other === this){return true;}return other instanceof c.Expression && other.constant === this.constant && other.terms.equals(this.terms);}, Plus:function Plus(e1, e2){return e1.plus(e2);}, Minus:function Minus(e1, e2){return e1.minus(e2);}, Times:function Times(e1, e2){return e1.times(e2);}, Divide:function Divide(e1, e2){return e1.divide(e2);}}, {isConstant:{get:function(){return this.terms.size == 0;}, configurable:true, enumerable:true}}));})(this["c"] || module.parent.exports || {});(function(c){"use strict";c.AbstractConstraint = c.inherit(Object.defineProperties({initialize:function initialize(strength, weight){this.hashCode = c._inc();this.strength = strength || c.Strength.required;this.weight = weight || 1;}, isEditConstraint:false, isInequality:false, isStayConstraint:false, toString:function toString(){return this.strength + " {" + this.weight + "} (" + this.expression + ")";}}, {required:{get:function(){return this.strength === c.Strength.required;}, configurable:true, enumerable:true}}));var ts=c.AbstractConstraint.prototype.toString;var EditOrStayCtor=function EditOrStayCtor(cv, strength, weight){c.AbstractConstraint.call(this, strength || c.Strength.strong, weight);this.variable = cv;this.expression = new c.Expression(cv, -1, cv.value);};c.EditConstraint = c.inherit({"extends":c.AbstractConstraint, initialize:function initialize(){EditOrStayCtor.apply(this, arguments);}, isEditConstraint:true, toString:function toString(){return "edit:" + ts.call(this);}});c.StayConstraint = c.inherit({"extends":c.AbstractConstraint, initialize:function initialize(){EditOrStayCtor.apply(this, arguments);}, isStayConstraint:true, toString:function toString(){return "stay:" + ts.call(this);}});var lc=c.Constraint = c.inherit({"extends":c.AbstractConstraint, initialize:function initialize(cle, strength, weight){c.AbstractConstraint.call(this, strength, weight);this.expression = cle;}});c.Inequality = c.inherit({"extends":c.Constraint, _cloneOrNewCle:function _cloneOrNewCle(cle){if(cle.clone){return cle.clone();}else {return new c.Expression(cle);}}, initialize:function initialize(a1, a2, a3, a4, a5){var a1IsExp=a1 instanceof c.Expression, a3IsExp=a3 instanceof c.Expression, a1IsVar=a1 instanceof c.AbstractVariable, a3IsVar=a3 instanceof c.AbstractVariable, a1IsNum=typeof a1 == "number", a3IsNum=typeof a3 == "number";if((a1IsExp || a1IsNum) && a3IsVar){var cle=a1, op=a2, cv=a3, strength=a4, weight=a5;lc.call(this, this._cloneOrNewCle(cle), strength, weight);if(op == c.LEQ){this.expression.multiplyMe(-1);this.expression.addVariable(cv);}else if(op == c.GEQ){this.expression.addVariable(cv, -1);}else {throw new c.InternalError("Invalid operator in c.Inequality constructor");}}else if(a1IsVar && (a3IsExp || a3IsNum)){var cle=a3, op=a2, cv=a1, strength=a4, weight=a5;lc.call(this, this._cloneOrNewCle(cle), strength, weight);if(op == c.GEQ){this.expression.multiplyMe(-1);this.expression.addVariable(cv);}else if(op == c.LEQ){this.expression.addVariable(cv, -1);}else {throw new c.InternalError("Invalid operator in c.Inequality constructor");}}else if(a1IsExp && a3IsNum){var cle1=a1, op=a2, cle2=a3, strength=a4, weight=a5;lc.call(this, this._cloneOrNewCle(cle1), strength, weight);if(op == c.LEQ){this.expression.multiplyMe(-1);this.expression.addExpression(this._cloneOrNewCle(cle2));}else if(op == c.GEQ){this.expression.addExpression(this._cloneOrNewCle(cle2), -1);}else {throw new c.InternalError("Invalid operator in c.Inequality constructor");}return this;}else if(a1IsNum && a3IsExp){var cle1=a3, op=a2, cle2=a1, strength=a4, weight=a5;lc.call(this, this._cloneOrNewCle(cle1), strength, weight);if(op == c.GEQ){this.expression.multiplyMe(-1);this.expression.addExpression(this._cloneOrNewCle(cle2));}else if(op == c.LEQ){this.expression.addExpression(this._cloneOrNewCle(cle2), -1);}else {throw new c.InternalError("Invalid operator in c.Inequality constructor");}return this;}else if(a1IsExp && a3IsExp){var cle1=a1, op=a2, cle2=a3, strength=a4, weight=a5;lc.call(this, this._cloneOrNewCle(cle2), strength, weight);if(op == c.GEQ){this.expression.multiplyMe(-1);this.expression.addExpression(this._cloneOrNewCle(cle1));}else if(op == c.LEQ){this.expression.addExpression(this._cloneOrNewCle(cle1), -1);}else {throw new c.InternalError("Invalid operator in c.Inequality constructor");}}else if(a1IsExp){return lc.call(this, a1, a2, a3);}else if(a2 == c.GEQ){lc.call(this, new c.Expression(a3), a4, a5);this.expression.multiplyMe(-1);this.expression.addVariable(a1);}else if(a2 == c.LEQ){lc.call(this, new c.Expression(a3), a4, a5);this.expression.addVariable(a1, -1);}else {throw new c.InternalError("Invalid operator in c.Inequality constructor");}}, isInequality:true, toString:function toString(){return lc.prototype.toString.call(this) + " >= 0) id: " + this.hashCode;}});c.Equation = c.inherit({"extends":c.Constraint, initialize:function initialize(a1, a2, a3, a4){if(a1 instanceof c.Expression && !a2 || a2 instanceof c.Strength){lc.call(this, a1, a2, a3);}else if(a1 instanceof c.AbstractVariable && a2 instanceof c.Expression){var cv=a1, cle=a2, strength=a3, weight=a4;lc.call(this, cle.clone(), strength, weight);this.expression.addVariable(cv, -1);}else if(a1 instanceof c.AbstractVariable && typeof a2 == "number"){var cv=a1, val=a2, strength=a3, weight=a4;lc.call(this, new c.Expression(val), strength, weight);this.expression.addVariable(cv, -1);}else if(a1 instanceof c.Expression && a2 instanceof c.AbstractVariable){var cle=a1, cv=a2, strength=a3, weight=a4;lc.call(this, cle.clone(), strength, weight);this.expression.addVariable(cv, -1);}else if((a1 instanceof c.Expression || a1 instanceof c.AbstractVariable || typeof a1 == "number") && (a2 instanceof c.Expression || a2 instanceof c.AbstractVariable || typeof a2 == "number")){if(a1 instanceof c.Expression){a1 = a1.clone();}else {a1 = new c.Expression(a1);}if(a2 instanceof c.Expression){a2 = a2.clone();}else {a2 = new c.Expression(a2);}lc.call(this, a1, a3, a4);this.expression.addExpression(a2, -1);}else {throw "Bad initializer to c.Equation";}c.assert(this.strength instanceof c.Strength, "_strength not set");}, toString:function toString(){return lc.prototype.toString.call(this) + " = 0)";}});})(this["c"] || module.parent.exports || {});(function(c){"use strict";c.EditInfo = c.inherit({initialize:function initialize(cn, eplus, eminus, prevEditConstant, i){this.constraint = cn;this.editPlus = eplus;this.editMinus = eminus;this.prevEditConstant = prevEditConstant;this.index = i;}, toString:function toString(){return "<cn=" + this.constraint + ", ep=" + this.editPlus + ", em=" + this.editMinus + ", pec=" + this.prevEditConstant + ", index=" + this.index + ">";}});})(this["c"] || module.parent.exports || {});(function(c){"use strict";c.Tableau = c.inherit({initialize:function initialize(){this.columns = new c.HashTable();this.rows = new c.HashTable();this._infeasibleRows = new c.HashSet();this._externalRows = new c.HashSet();this._externalParametricVars = new c.HashSet();}, noteRemovedVariable:function noteRemovedVariable(v, subject){c.trace && console.log("c.Tableau::noteRemovedVariable: ", v, subject);var column=this.columns.get(v);if(subject && column){column["delete"](subject);}}, noteAddedVariable:function noteAddedVariable(v, subject){if(subject){this.insertColVar(v, subject);}}, getInternalInfo:function getInternalInfo(){var retstr="Tableau Information:\n";retstr += "Rows: " + this.rows.size;retstr += " (= " + (this.rows.size - 1) + " constraints)";retstr += "\nColumns: " + this.columns.size;retstr += "\nInfeasible Rows: " + this._infeasibleRows.size;retstr += "\nExternal basic variables: " + this._externalRows.size;retstr += "\nExternal parametric variables: ";retstr += this._externalParametricVars.size;retstr += "\n";return retstr;}, toString:function toString(){var bstr="Tableau:\n";this.rows.each(function(clv, expr){bstr += clv;bstr += " <==> ";bstr += expr;bstr += "\n";});bstr += "\nColumns:\n";bstr += this.columns;bstr += "\nInfeasible rows: ";bstr += this._infeasibleRows;bstr += "External basic variables: ";bstr += this._externalRows;bstr += "External parametric variables: ";bstr += this._externalParametricVars;return bstr;}, insertColVar:function insertColVar(param_var, rowvar){var rowset=this.columns.get(param_var);if(!rowset){rowset = new c.HashSet();this.columns.set(param_var, rowset);}rowset.add(rowvar);}, addRow:function addRow(aVar, expr){if(c.trace)c.fnenterprint("addRow: " + aVar + ", " + expr);this.rows.set(aVar, expr);expr.terms.each(function(clv, coeff){this.insertColVar(clv, aVar);if(clv.isExternal){this._externalParametricVars.add(clv);}}, this);if(aVar.isExternal){this._externalRows.add(aVar);}if(c.trace)c.traceprint(this.toString());}, removeColumn:function removeColumn(aVar){if(c.trace)c.fnenterprint("removeColumn:" + aVar);var rows=this.columns.get(aVar);if(rows){this.columns["delete"](aVar);rows.each(function(clv){var expr=this.rows.get(clv);expr.terms["delete"](aVar);}, this);}else {if(c.trace)console.log("Could not find var", aVar, "in columns");}if(aVar.isExternal){this._externalRows["delete"](aVar);this._externalParametricVars["delete"](aVar);}}, removeRow:function removeRow(aVar){if(c.trace)c.fnenterprint("removeRow:" + aVar);var expr=this.rows.get(aVar);c.assert(expr != null);expr.terms.each(function(clv, coeff){var varset=this.columns.get(clv);if(varset != null){if(c.trace)console.log("removing from varset:", aVar);varset["delete"](aVar);}}, this);this._infeasibleRows["delete"](aVar);if(aVar.isExternal){this._externalRows["delete"](aVar);}this.rows["delete"](aVar);if(c.trace)c.fnexitprint("returning " + expr);return expr;}, substituteOut:function substituteOut(oldVar, expr){if(c.trace)c.fnenterprint("substituteOut:" + oldVar + ", " + expr);if(c.trace)c.traceprint(this.toString());var varset=this.columns.get(oldVar);varset.each(function(v){var row=this.rows.get(v);row.substituteOut(oldVar, expr, v, this);if(v.isRestricted && row.constant < 0){this._infeasibleRows.add(v);}}, this);if(oldVar.isExternal){this._externalRows.add(oldVar);this._externalParametricVars["delete"](oldVar);}this.columns["delete"](oldVar);}, columnsHasKey:function columnsHasKey(subject){return !!this.columns.get(subject);}});})(this["c"] || module.parent.exports || {});(function(c){var t=c.Tableau;var tp=t.prototype;var epsilon=1e-8;var weak=c.Strength.weak;c.SimplexSolver = c.inherit({"extends":c.Tableau, initialize:function initialize(){c.Tableau.call(this);this._stayMinusErrorVars = [];this._stayPlusErrorVars = [];this._errorVars = new c.HashTable();this._markerVars = new c.HashTable();this._objective = new c.ObjectiveVariable({name:"Z"});this._editVarMap = new c.HashTable();this._editVarList = [];this._slackCounter = 0;this._artificialCounter = 0;this._dummyCounter = 0;this.autoSolve = true;this._fNeedsSolving = false;this._optimizeCount = 0;this.rows.set(this._objective, new c.Expression());this._stkCedcns = [0];if(c.trace)c.traceprint("objective expr == " + this.rows.get(this._objective));}, addLowerBound:function addLowerBound(v, lower){var cn=new c.Inequality(v, c.GEQ, new c.Expression(lower));return this.addConstraint(cn);}, addUpperBound:function addUpperBound(v, upper){var cn=new c.Inequality(v, c.LEQ, new c.Expression(upper));return this.addConstraint(cn);}, addBounds:function addBounds(v, lower, upper){this.addLowerBound(v, lower);this.addUpperBound(v, upper);return this;}, add:function add(){for(var x=0; x < arguments.length; x++) {this.addConstraint(arguments[x]);}return this;}, addConstraint:function addConstraint(cn){if(c.trace)c.fnenterprint("addConstraint: " + cn);var eplus_eminus=new Array(2);var prevEConstant=new Array(1);var expr=this.newExpression(cn, eplus_eminus, prevEConstant);prevEConstant = prevEConstant[0];if(!this.tryAddingDirectly(expr)){this.addWithArtificialVariable(expr);}this._fNeedsSolving = true;if(cn.isEditConstraint){var i=this._editVarMap.size;var cvEplus=eplus_eminus[0];var cvEminus=eplus_eminus[1];if(!cvEplus instanceof c.SlackVariable){console.warn("cvEplus not a slack variable =", cvEplus);}if(!cvEminus instanceof c.SlackVariable){console.warn("cvEminus not a slack variable =", cvEminus);}c.debug && console.log("new c.EditInfo(" + cn + ", " + cvEplus + ", " + cvEminus + ", " + prevEConstant + ", " + i + ")");var ei=new c.EditInfo(cn, cvEplus, cvEminus, prevEConstant, i);this._editVarMap.set(cn.variable, ei);this._editVarList[i] = {v:cn.variable, info:ei};}if(this.autoSolve){this.optimize(this._objective);this._setExternalVariables();}return this;}, addConstraintNoException:function addConstraintNoException(cn){if(c.trace)c.fnenterprint("addConstraintNoException: " + cn);try{this.addConstraint(cn);return true;}catch(e) {return false;}}, addEditVar:function addEditVar(v, strength){c.trace && c.fnenterprint("addEditVar: " + v + " @ " + strength);return this.addConstraint(new c.EditConstraint(v, strength || c.Strength.strong));}, beginEdit:function beginEdit(){c.assert(this._editVarMap.size > 0, "_editVarMap.size > 0");this._infeasibleRows.clear();this._resetStayConstants();this._stkCedcns.push(this._editVarMap.size);return this;}, endEdit:function endEdit(){c.assert(this._editVarMap.size > 0, "_editVarMap.size > 0");this.resolve();this._stkCedcns.pop();this.removeEditVarsTo(this._stkCedcns[this._stkCedcns.length - 1]);return this;}, removeAllEditVars:function removeAllEditVars(){return this.removeEditVarsTo(0);}, removeEditVarsTo:function removeEditVarsTo(n){try{var evll=this._editVarList.length;for(var x=n; x < evll; x++) {if(this._editVarList[x]){this.removeConstraint(this._editVarMap.get(this._editVarList[x].v).constraint);}}this._editVarList.length = n;c.assert(this._editVarMap.size == n, "_editVarMap.size == n");return this;}catch(e) {throw new c.InternalError("Constraint not found in removeEditVarsTo");}}, addPointStays:function addPointStays(points){c.trace && console.log("addPointStays", points);points.forEach(function(p, idx){this.addStay(p.x, weak, Math.pow(2, idx));this.addStay(p.y, weak, Math.pow(2, idx));}, this);return this;}, addStay:function addStay(v, strength, weight){var cn=new c.StayConstraint(v, strength || weak, weight || 1);return this.addConstraint(cn);}, removeConstraint:function removeConstraint(cn){this.removeConstraintInternal(cn);return this;}, removeConstraintInternal:function removeConstraintInternal(cn){if(c.trace)c.fnenterprint("removeConstraintInternal: " + cn);if(c.trace)c.traceprint(this.toString());this._fNeedsSolving = true;this._resetStayConstants();var zRow=this.rows.get(this._objective);var eVars=this._errorVars.get(cn);if(c.trace)c.traceprint("eVars == " + eVars);if(eVars != null){eVars.each(function(cv){var expr=this.rows.get(cv);if(expr == null){zRow.addVariable(cv, -cn.weight * cn.strength.symbolicWeight.value, this._objective, this);}else {zRow.addExpression(expr, -cn.weight * cn.strength.symbolicWeight.value, this._objective, this);}if(c.trace)c.traceprint("now eVars == " + eVars);}, this);}var marker=this._markerVars.get(cn);this._markerVars["delete"](cn);if(marker == null){throw new c.InternalError("Constraint not found in removeConstraintInternal");}if(c.trace)c.traceprint("Looking to remove var " + marker);if(this.rows.get(marker) == null){var col=this.columns.get(marker);if(c.trace)c.traceprint("Must pivot -- columns are " + col);var exitVar=null;var minRatio=0;col.each(function(v){if(v.isRestricted){var expr=this.rows.get(v);var coeff=expr.coefficientFor(marker);if(c.trace)c.traceprint("Marker " + marker + "'s coefficient in " + expr + " is " + coeff);if(coeff < 0){var r=-expr.constant / coeff;if(exitVar == null || r < minRatio || c.approx(r, minRatio) && v.hashCode < exitVar.hashCode){minRatio = r;exitVar = v;}}}}, this);if(exitVar == null){if(c.trace)c.traceprint("exitVar is still null");col.each(function(v){if(v.isRestricted){var expr=this.rows.get(v);var coeff=expr.coefficientFor(marker);var r=expr.constant / coeff;if(exitVar == null || r < minRatio){minRatio = r;exitVar = v;}}}, this);}if(exitVar == null){if(col.size == 0){this.removeColumn(marker);}else {col.escapingEach(function(v){if(v != this._objective){exitVar = v;return {brk:true};}}, this);}}if(exitVar != null){this.pivot(marker, exitVar);}}if(this.rows.get(marker) != null){var expr=this.removeRow(marker);}if(eVars != null){eVars.each(function(v){if(v != marker){this.removeColumn(v);}}, this);}if(cn.isStayConstraint){if(eVars != null){for(var i=0; i < this._stayPlusErrorVars.length; i++) {eVars["delete"](this._stayPlusErrorVars[i]);eVars["delete"](this._stayMinusErrorVars[i]);}}}else if(cn.isEditConstraint){c.assert(eVars != null, "eVars != null");var cei=this._editVarMap.get(cn.variable);this.removeColumn(cei.editMinus);this._editVarMap["delete"](cn.variable);}if(eVars != null){this._errorVars["delete"](eVars);}if(this.autoSolve){this.optimize(this._objective);this._setExternalVariables();}return this;}, reset:function reset(){if(c.trace)c.fnenterprint("reset");throw new c.InternalError("reset not implemented");}, resolveArray:function resolveArray(newEditConstants){if(c.trace)c.fnenterprint("resolveArray" + newEditConstants);var l=newEditConstants.length;this._editVarMap.each(function(v, cei){var i=cei.index;if(i < l)this.suggestValue(v, newEditConstants[i]);}, this);this.resolve();}, resolvePair:function resolvePair(x, y){this.suggestValue(this._editVarList[0].v, x);this.suggestValue(this._editVarList[1].v, y);this.resolve();}, resolve:function resolve(){if(c.trace)c.fnenterprint("resolve()");this.dualOptimize();this._setExternalVariables();this._infeasibleRows.clear();this._resetStayConstants();}, suggestValue:function suggestValue(v, x){c.trace && console.log("suggestValue(" + v + ", " + x + ")");var cei=this._editVarMap.get(v);if(!cei){throw new c.Error("suggestValue for variable " + v + ", but var is not an edit variable");}var delta=x - cei.prevEditConstant;cei.prevEditConstant = x;this.deltaEditConstant(delta, cei.editPlus, cei.editMinus);return this;}, solve:function solve(){if(this._fNeedsSolving){this.optimize(this._objective);this._setExternalVariables();}return this;}, setEditedValue:function setEditedValue(v, n){if(!(this.columnsHasKey(v) || this.rows.get(v) != null)){v.value = n;return this;}if(!c.approx(n, v.value)){this.addEditVar(v);this.beginEdit();try{this.suggestValue(v, n);}catch(e) {throw new c.InternalError("Error in setEditedValue");}this.endEdit();}return this;}, addVar:function addVar(v){if(!(this.columnsHasKey(v) || this.rows.get(v) != null)){try{this.addStay(v);}catch(e) {throw new c.InternalError("Error in addVar -- required failure is impossible");}if(c.trace){c.traceprint("added initial stay on " + v);}}return this;}, getInternalInfo:function getInternalInfo(){var retstr=tp.getInternalInfo.call(this);retstr += "\nSolver info:\n";retstr += "Stay Error Variables: ";retstr += this._stayPlusErrorVars.length + this._stayMinusErrorVars.length;retstr += " (" + this._stayPlusErrorVars.length + " +, ";retstr += this._stayMinusErrorVars.length + " -)\n";retstr += "Edit Variables: " + this._editVarMap.size;retstr += "\n";return retstr;}, getDebugInfo:function getDebugInfo(){return this.toString() + this.getInternalInfo() + "\n";}, toString:function toString(){var bstr=tp.getInternalInfo.call(this);bstr += "\n_stayPlusErrorVars: ";bstr += "[" + this._stayPlusErrorVars + "]";bstr += "\n_stayMinusErrorVars: ";bstr += "[" + this._stayMinusErrorVars + "]";bstr += "\n";bstr += "_editVarMap:\n" + this._editVarMap;bstr += "\n";return bstr;}, getConstraintMap:function getConstraintMap(){return this._markerVars;}, addWithArtificialVariable:function addWithArtificialVariable(expr){if(c.trace)c.fnenterprint("addWithArtificialVariable: " + expr);var av=new c.SlackVariable({value:++this._artificialCounter, prefix:"a"});var az=new c.ObjectiveVariable({name:"az"});var azRow=expr.clone();if(c.trace)c.traceprint("before addRows:\n" + this);this.addRow(az, azRow);this.addRow(av, expr);if(c.trace)c.traceprint("after addRows:\n" + this);this.optimize(az);var azTableauRow=this.rows.get(az);if(c.trace)c.traceprint("azTableauRow.constant == " + azTableauRow.constant);if(!c.approx(azTableauRow.constant, 0)){this.removeRow(az);this.removeColumn(av);throw new c.RequiredFailure();}var e=this.rows.get(av);if(e != null){if(e.isConstant){this.removeRow(av);this.removeRow(az);return;}var entryVar=e.anyPivotableVariable();this.pivot(entryVar, av);}c.assert(this.rows.get(av) == null, "rowExpression(av) == null");this.removeColumn(av);this.removeRow(az);}, tryAddingDirectly:function tryAddingDirectly(expr){c.trace && c.fnenterprint("tryAddingDirectly: " + expr);var subject=this.chooseSubject(expr);if(subject == null){c.trace && c.fnexitprint("returning false");return false;}expr.newSubject(subject);if(this.columnsHasKey(subject)){this.substituteOut(subject, expr);}this.addRow(subject, expr);c.trace && c.fnexitprint("returning true");return true;}, chooseSubject:function chooseSubject(expr){if(c.trace)c.fnenterprint("chooseSubject: " + expr);var subject=null;var foundUnrestricted=false;var foundNewRestricted=false;var terms=expr.terms;var rv=terms.escapingEach(function(v, c){if(foundUnrestricted){if(!v.isRestricted){if(!this.columnsHasKey(v)){return {retval:v};}}}else {if(v.isRestricted){if(!foundNewRestricted && !v.isDummy && c < 0){var col=this.columns.get(v);if(col == null || col.size == 1 && this.columnsHasKey(this._objective)){subject = v;foundNewRestricted = true;}}}else {subject = v;foundUnrestricted = true;}}}, this);if(rv && rv.retval !== undefined)return rv.retval;if(subject != null)return subject;var coeff=0;var rv=terms.escapingEach(function(v, c){if(!v.isDummy){return {retval:null};}if(!this.columnsHasKey(v)){subject = v;coeff = c;}}, this);if(rv && rv.retval !== undefined)return rv.retval;if(!c.approx(expr.constant, 0)){throw new c.RequiredFailure();}if(coeff > 0){expr.multiplyMe(-1);}return subject;}, deltaEditConstant:function deltaEditConstant(delta, plusErrorVar, minusErrorVar){if(c.trace)c.fnenterprint("deltaEditConstant :" + delta + ", " + plusErrorVar + ", " + minusErrorVar);var exprPlus=this.rows.get(plusErrorVar);if(exprPlus != null){exprPlus.constant += delta;if(exprPlus.constant < 0){this._infeasibleRows.add(plusErrorVar);}return;}var exprMinus=this.rows.get(minusErrorVar);if(exprMinus != null){exprMinus.constant += -delta;if(exprMinus.constant < 0){this._infeasibleRows.add(minusErrorVar);}return;}var columnVars=this.columns.get(minusErrorVar);if(!columnVars){console.log("columnVars is null -- tableau is:\n" + this);}columnVars.each(function(basicVar){var expr=this.rows.get(basicVar);var c=expr.coefficientFor(minusErrorVar);expr.constant += c * delta;if(basicVar.isRestricted && expr.constant < 0){this._infeasibleRows.add(basicVar);}}, this);}, dualOptimize:function dualOptimize(){if(c.trace)c.fnenterprint("dualOptimize:");var zRow=this.rows.get(this._objective);while(this._infeasibleRows.size) {var exitVar=this._infeasibleRows.values()[0];this._infeasibleRows["delete"](exitVar);var entryVar=null;var expr=this.rows.get(exitVar);if(expr){if(expr.constant < 0){var ratio=Number.MAX_VALUE;var r;var terms=expr.terms;terms.each(function(v, cd){if(cd > 0 && v.isPivotable){var zc=zRow.coefficientFor(v);r = zc / cd;if(r < ratio || c.approx(r, ratio) && v.hashCode < entryVar.hashCode){entryVar = v;ratio = r;}}});if(ratio == Number.MAX_VALUE){throw new c.InternalError("ratio == nil (MAX_VALUE) in dualOptimize");}this.pivot(entryVar, exitVar);}}}}, newExpression:function newExpression(cn, eplus_eminus, prevEConstant){if(c.trace){c.fnenterprint("newExpression: " + cn);c.traceprint("cn.isInequality == " + cn.isInequality);c.traceprint("cn.required == " + cn.required);}var cnExpr=cn.expression;var expr=new c.Expression(cnExpr.constant);var slackVar=new c.SlackVariable();var dummyVar=new c.DummyVariable();var eminus=new c.SlackVariable();var eplus=new c.SlackVariable();var cnTerms=cnExpr.terms;cnTerms.each(function(v, c){var e=this.rows.get(v);if(!e){expr.addVariable(v, c);}else {expr.addExpression(e, c);}}, this);if(cn.isInequality){c.trace && c.traceprint("Inequality, adding slack");++this._slackCounter;slackVar = new c.SlackVariable({value:this._slackCounter, prefix:"s"});expr.setVariable(slackVar, -1);this._markerVars.set(cn, slackVar);if(!cn.required){++this._slackCounter;eminus = new c.SlackVariable({value:this._slackCounter, prefix:"em"});expr.setVariable(eminus, 1);var zRow=this.rows.get(this._objective);zRow.setVariable(eminus, cn.strength.symbolicWeight.value * cn.weight);this.insertErrorVar(cn, eminus);this.noteAddedVariable(eminus, this._objective);}}else {if(cn.required){c.trace && c.traceprint("Equality, required");++this._dummyCounter;dummyVar = new c.DummyVariable({value:this._dummyCounter, prefix:"d"});expr.setVariable(dummyVar, 1);this._markerVars.set(cn, dummyVar);if(c.trace)c.traceprint("Adding dummyVar == d" + this._dummyCounter);}else {if(c.trace)c.traceprint("Equality, not required");++this._slackCounter;eplus = new c.SlackVariable({value:this._slackCounter, prefix:"ep"});eminus = new c.SlackVariable({value:this._slackCounter, prefix:"em"});expr.setVariable(eplus, -1);expr.setVariable(eminus, 1);this._markerVars.set(cn, eplus);var zRow=this.rows.get(this._objective);if(c.trace)console.log(zRow);var swCoeff=cn.strength.symbolicWeight.value * cn.weight;if(swCoeff == 0){if(c.trace)c.traceprint("cn == " + cn);if(c.trace)c.traceprint("adding " + eplus + " and " + eminus + " with swCoeff == " + swCoeff);}zRow.setVariable(eplus, swCoeff);this.noteAddedVariable(eplus, this._objective);zRow.setVariable(eminus, swCoeff);this.noteAddedVariable(eminus, this._objective);this.insertErrorVar(cn, eminus);this.insertErrorVar(cn, eplus);if(cn.isStayConstraint){this._stayPlusErrorVars.push(eplus);this._stayMinusErrorVars.push(eminus);}else if(cn.isEditConstraint){eplus_eminus[0] = eplus;eplus_eminus[1] = eminus;prevEConstant[0] = cnExpr.constant;}}}if(expr.constant < 0)expr.multiplyMe(-1);if(c.trace)c.fnexitprint("returning " + expr);return expr;}, optimize:function optimize(zVar){if(c.trace)c.fnenterprint("optimize: " + zVar);if(c.trace)c.traceprint(this.toString());this._optimizeCount++;var zRow=this.rows.get(zVar);c.assert(zRow != null, "zRow != null");var entryVar=null;var exitVar=null;var objectiveCoeff, terms;while(true) {objectiveCoeff = 0;terms = zRow.terms;terms.escapingEach(function(v, c){if(v.isPivotable && c < objectiveCoeff){objectiveCoeff = c;entryVar = v;return {brk:1};}}, this);if(objectiveCoeff >= -epsilon)return;c.trace && console.log("entryVar:", entryVar, "objectiveCoeff:", objectiveCoeff);var minRatio=Number.MAX_VALUE;var columnVars=this.columns.get(entryVar);var r=0;columnVars.each(function(v){if(c.trace)c.traceprint("Checking " + v);if(v.isPivotable){var expr=this.rows.get(v);var coeff=expr.coefficientFor(entryVar);if(c.trace)c.traceprint("pivotable, coeff = " + coeff);if(coeff < 0){r = -expr.constant / coeff;if(r < minRatio || c.approx(r, minRatio) && v.hashCode < exitVar.hashCode){minRatio = r;exitVar = v;}}}}, this);if(minRatio == Number.MAX_VALUE){throw new c.InternalError("Objective function is unbounded in optimize");}this.pivot(entryVar, exitVar);if(c.trace)c.traceprint(this.toString());}}, pivot:function pivot(entryVar, exitVar){c.trace && console.log("pivot: ", entryVar, exitVar);var time=false;time && console.time(" SimplexSolver::pivot");if(entryVar == null){console.warn("pivot: entryVar == null");}if(exitVar == null){console.warn("pivot: exitVar == null");}time && console.time("  removeRow");var expr=this.removeRow(exitVar);time && console.timeEnd("  removeRow");time && console.time("  changeSubject");expr.changeSubject(exitVar, entryVar);time && console.timeEnd("  changeSubject");time && console.time("  substituteOut");this.substituteOut(entryVar, expr);time && console.timeEnd("  substituteOut");time && console.time("  addRow");this.addRow(entryVar, expr);time && console.timeEnd("  addRow");time && console.timeEnd(" SimplexSolver::pivot");}, _resetStayConstants:function _resetStayConstants(){c.trace && console.log("_resetStayConstants");for(var i=0; i < this._stayPlusErrorVars.length; i++) {var expr=this.rows.get(this._stayPlusErrorVars[i]);if(expr == null)expr = this.rows.get(this._stayMinusErrorVars[i]);if(expr != null)expr.constant = 0;}}, _setExternalVariables:function _setExternalVariables(){if(c.trace)c.fnenterprint("_setExternalVariables:");if(c.trace)c.traceprint(this.toString());this._externalParametricVars.each(function(v){if(this.rows.get(v) != null){if(c.trace)console.log("Error: variable" + v + " in _externalParametricVars is basic");}else {v.value = 0;}}, this);this._externalRows.each(function(v){var expr=this.rows.get(v);if(v.value != expr.constant){v.value = expr.constant;}}, this);this._fNeedsSolving = false;this.onsolved();}, onsolved:function onsolved(){}, insertErrorVar:function insertErrorVar(cn, aVar){if(c.trace)c.fnenterprint("insertErrorVar:" + cn + ", " + aVar);var constraintSet=this._errorVars.get(aVar);if(!constraintSet){constraintSet = new c.HashSet();this._errorVars.set(cn, constraintSet);}constraintSet.add(aVar);}});})(this["c"] || module.parent.exports || {});(function(c){"use strict";c.Timer = c.inherit({initialize:function initialize(){this.isRunning = false;this._elapsedMs = 0;}, start:function start(){this.isRunning = true;this._startReading = new Date();return this;}, stop:function stop(){this.isRunning = false;this._elapsedMs += new Date() - this._startReading;return this;}, reset:function reset(){this.isRunning = false;this._elapsedMs = 0;return this;}, elapsedTime:function elapsedTime(){if(!this.isRunning){return this._elapsedMs / 1000;}else {return (this._elapsedMs + (new Date() - this._startReading)) / 1000;}}});})(this["c"] || module.parent.exports || {});__cassowary_parser = (function(){function quote(s){return "\"" + s.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g, escape) + "\"";}var result={parse:function parse(input, startRule){var parseFunctions={"start":parse_start, "Statement":parse_Statement, "SourceCharacter":parse_SourceCharacter, "IdentifierStart":parse_IdentifierStart, "WhiteSpace":parse_WhiteSpace, "LineTerminator":parse_LineTerminator, "LineTerminatorSequence":parse_LineTerminatorSequence, "EOS":parse_EOS, "EOF":parse_EOF, "Comment":parse_Comment, "MultiLineComment":parse_MultiLineComment, "MultiLineCommentNoLineTerminator":parse_MultiLineCommentNoLineTerminator, "SingleLineComment":parse_SingleLineComment, "_":parse__, "__":parse___, "Literal":parse_Literal, "Integer":parse_Integer, "Real":parse_Real, "SignedInteger":parse_SignedInteger, "Identifier":parse_Identifier, "IdentifierName":parse_IdentifierName, "PrimaryExpression":parse_PrimaryExpression, "UnaryExpression":parse_UnaryExpression, "UnaryOperator":parse_UnaryOperator, "MultiplicativeExpression":parse_MultiplicativeExpression, "MultiplicativeOperator":parse_MultiplicativeOperator, "AdditiveExpression":parse_AdditiveExpression, "AdditiveOperator":parse_AdditiveOperator, "InequalityExpression":parse_InequalityExpression, "InequalityOperator":parse_InequalityOperator, "LinearExpression":parse_LinearExpression};if(startRule !== undefined){if(parseFunctions[startRule] === undefined){throw new Error("Invalid rule name: " + quote(startRule) + ".");}}else {startRule = "start";}var pos=0;var reportFailures=0;var rightmostFailuresPos=0;var rightmostFailuresExpected=[];function padLeft(input, padding, length){var result=input;var padLength=length - input.length;for(var i=0; i < padLength; i++) {result = padding + result;}return result;}function escape(ch){var charCode=ch.charCodeAt(0);var escapeChar;var length;if(charCode <= 255){escapeChar = "x";length = 2;}else {escapeChar = "u";length = 4;}return "\\" + escapeChar + padLeft(charCode.toString(16).toUpperCase(), "0", length);}function matchFailed(failure){if(pos < rightmostFailuresPos){return;}if(pos > rightmostFailuresPos){rightmostFailuresPos = pos;rightmostFailuresExpected = [];}rightmostFailuresExpected.push(failure);}function parse_start(){var result0, result1, result2;var pos0, pos1;pos0 = pos;pos1 = pos;result0 = parse___();if(result0 !== null){result2 = parse_Statement();if(result2 !== null){result1 = [];while(result2 !== null) {result1.push(result2);result2 = parse_Statement();}}else {result1 = null;}if(result1 !== null){result2 = parse___();if(result2 !== null){result0 = [result0, result1, result2];}else {result0 = null;pos = pos1;}}else {result0 = null;pos = pos1;}}else {result0 = null;pos = pos1;}if(result0 !== null){result0 = (function(offset, statements){return statements;})(pos0, result0[1]);}if(result0 === null){pos = pos0;}return result0;}function parse_Statement(){var result0, result1;var pos0, pos1;pos0 = pos;pos1 = pos;result0 = parse_LinearExpression();if(result0 !== null){result1 = parse_EOS();if(result1 !== null){result0 = [result0, result1];}else {result0 = null;pos = pos1;}}else {result0 = null;pos = pos1;}if(result0 !== null){result0 = (function(offset, expression){return expression;})(pos0, result0[0]);}if(result0 === null){pos = pos0;}return result0;}function parse_SourceCharacter(){var result0;if(input.length > pos){result0 = input.charAt(pos);pos++;}else {result0 = null;if(reportFailures === 0){matchFailed("any character");}}return result0;}function parse_IdentifierStart(){var result0;if(/^[a-zA-Z]/.test(input.charAt(pos))){result0 = input.charAt(pos);pos++;}else {result0 = null;if(reportFailures === 0){matchFailed("[a-zA-Z]");}}if(result0 === null){if(input.charCodeAt(pos) === 36){result0 = "$";pos++;}else {result0 = null;if(reportFailures === 0){matchFailed("\"$\"");}}if(result0 === null){if(input.charCodeAt(pos) === 95){result0 = "_";pos++;}else {result0 = null;if(reportFailures === 0){matchFailed("\"_\"");}}}}return result0;}function parse_WhiteSpace(){var result0;reportFailures++;if(/^[\t\x0B\f \xA0\uFEFF]/.test(input.charAt(pos))){result0 = input.charAt(pos);pos++;}else {result0 = null;if(reportFailures === 0){matchFailed("[\\t\\x0B\\f \\xA0\\uFEFF]");}}reportFailures--;if(reportFailures === 0 && result0 === null){matchFailed("whitespace");}return result0;}function parse_LineTerminator(){var result0;if(/^[\n\r\u2028\u2029]/.test(input.charAt(pos))){result0 = input.charAt(pos);pos++;}else {result0 = null;if(reportFailures === 0){matchFailed("[\\n\\r\\u2028\\u2029]");}}return result0;}function parse_LineTerminatorSequence(){var result0;reportFailures++;if(input.charCodeAt(pos) === 10){result0 = "\n";pos++;}else {result0 = null;if(reportFailures === 0){matchFailed("\"\\n\"");}}if(result0 === null){if(input.substr(pos, 2) === "\r\n"){result0 = "\r\n";pos += 2;}else {result0 = null;if(reportFailures === 0){matchFailed("\"\\r\\n\"");}}if(result0 === null){if(input.charCodeAt(pos) === 13){result0 = "\r";pos++;}else {result0 = null;if(reportFailures === 0){matchFailed("\"\\r\"");}}if(result0 === null){if(input.charCodeAt(pos) === 8232){result0 = "\u2028";pos++;}else {result0 = null;if(reportFailures === 0){matchFailed("\"\\u2028\"");}}if(result0 === null){if(input.charCodeAt(pos) === 8233){result0 = "\u2029";pos++;}else {result0 = null;if(reportFailures === 0){matchFailed("\"\\u2029\"");}}}}}}reportFailures--;if(reportFailures === 0 && result0 === null){matchFailed("end of line");}return result0;}function parse_EOS(){var result0, result1;var pos0;pos0 = pos;result0 = parse___();if(result0 !== null){if(input.charCodeAt(pos) === 59){result1 = ";";pos++;}else {result1 = null;if(reportFailures === 0){matchFailed("\";\"");}}if(result1 !== null){result0 = [result0, result1];}else {result0 = null;pos = pos0;}}else {result0 = null;pos = pos0;}if(result0 === null){pos0 = pos;result0 = parse__();if(result0 !== null){result1 = parse_LineTerminatorSequence();if(result1 !== null){result0 = [result0, result1];}else {result0 = null;pos = pos0;}}else {result0 = null;pos = pos0;}if(result0 === null){pos0 = pos;result0 = parse___();if(result0 !== null){result1 = parse_EOF();if(result1 !== null){result0 = [result0, result1];}else {result0 = null;pos = pos0;}}else {result0 = null;pos = pos0;}}}return result0;}function parse_EOF(){var result0;var pos0;pos0 = pos;reportFailures++;if(input.length > pos){result0 = input.charAt(pos);pos++;}else {result0 = null;if(reportFailures === 0){matchFailed("any character");}}reportFailures--;if(result0 === null){result0 = "";}else {result0 = null;pos = pos0;}return result0;}function parse_Comment(){var result0;reportFailures++;result0 = parse_MultiLineComment();if(result0 === null){result0 = parse_SingleLineComment();}reportFailures--;if(reportFailures === 0 && result0 === null){matchFailed("comment");}return result0;}function parse_MultiLineComment(){var result0, result1, result2, result3;var pos0, pos1, pos2;pos0 = pos;if(input.substr(pos, 2) === "/*"){result0 = "/*";pos += 2;}else {result0 = null;if(reportFailures === 0){matchFailed("\"/*\"");}}if(result0 !== null){result1 = [];pos1 = pos;pos2 = pos;reportFailures++;if(input.substr(pos, 2) === "*/"){result2 = "*/";pos += 2;}else {result2 = null;if(reportFailures === 0){matchFailed("\"*/\"");}}reportFailures--;if(result2 === null){result2 = "";}else {result2 = null;pos = pos2;}if(result2 !== null){result3 = parse_SourceCharacter();if(result3 !== null){result2 = [result2, result3];}else {result2 = null;pos = pos1;}}else {result2 = null;pos = pos1;}while(result2 !== null) {result1.push(result2);pos1 = pos;pos2 = pos;reportFailures++;if(input.substr(pos, 2) === "*/"){result2 = "*/";pos += 2;}else {result2 = null;if(reportFailures === 0){matchFailed("\"*/\"");}}reportFailures--;if(result2 === null){result2 = "";}else {result2 = null;pos = pos2;}if(result2 !== null){result3 = parse_SourceCharacter();if(result3 !== null){result2 = [result2, result3];}else {result2 = null;pos = pos1;}}else {result2 = null;pos = pos1;}}if(result1 !== null){if(input.substr(pos, 2) === "*/"){result2 = "*/";pos += 2;}else {result2 = null;if(reportFailures === 0){matchFailed("\"*/\"");}}if(result2 !== null){result0 = [result0, result1, result2];}else {result0 = null;pos = pos0;}}else {result0 = null;pos = pos0;}}else {result0 = null;pos = pos0;}return result0;}function parse_MultiLineCommentNoLineTerminator(){var result0, result1, result2, result3;var pos0, pos1, pos2;pos0 = pos;if(input.substr(pos, 2) === "/*"){result0 = "/*";pos += 2;}else {result0 = null;if(reportFailures === 0){matchFailed("\"/*\"");}}if(result0 !== null){result1 = [];pos1 = pos;pos2 = pos;reportFailures++;if(input.substr(pos, 2) === "*/"){result2 = "*/";pos += 2;}else {result2 = null;if(reportFailures === 0){matchFailed("\"*/\"");}}if(result2 === null){result2 = parse_LineTerminator();}reportFailures--;if(result2 === null){result2 = "";}else {result2 = null;pos = pos2;}if(result2 !== null){result3 = parse_SourceCharacter();if(result3 !== null){result2 = [result2, result3];}else {result2 = null;pos = pos1;}}else {result2 = null;pos = pos1;}while(result2 !== null) {result1.push(result2);pos1 = pos;pos2 = pos;reportFailures++;if(input.substr(pos, 2) === "*/"){result2 = "*/";pos += 2;}else {result2 = null;if(reportFailures === 0){matchFailed("\"*/\"");}}if(result2 === null){result2 = parse_LineTerminator();}reportFailures--;if(result2 === null){result2 = "";}else {result2 = null;pos = pos2;}if(result2 !== null){result3 = parse_SourceCharacter();if(result3 !== null){result2 = [result2, result3];}else {result2 = null;pos = pos1;}}else {result2 = null;pos = pos1;}}if(result1 !== null){if(input.substr(pos, 2) === "*/"){result2 = "*/";pos += 2;}else {result2 = null;if(reportFailures === 0){matchFailed("\"*/\"");}}if(result2 !== null){result0 = [result0, result1, result2];}else {result0 = null;pos = pos0;}}else {result0 = null;pos = pos0;}}else {result0 = null;pos = pos0;}return result0;}function parse_SingleLineComment(){var result0, result1, result2, result3;var pos0, pos1, pos2;pos0 = pos;if(input.substr(pos, 2) === "//"){result0 = "//";pos += 2;}else {result0 = null;if(reportFailures === 0){matchFailed("\"//\"");}}if(result0 !== null){result1 = [];pos1 = pos;pos2 = pos;reportFailures++;result2 = parse_LineTerminator();reportFailures--;if(result2 === null){result2 = "";}else {result2 = null;pos = pos2;}if(result2 !== null){result3 = parse_SourceCharacter();if(result3 !== null){result2 = [result2, result3];}else {result2 = null;pos = pos1;}}else {result2 = null;pos = pos1;}while(result2 !== null) {result1.push(result2);pos1 = pos;pos2 = pos;reportFailures++;result2 = parse_LineTerminator();reportFailures--;if(result2 === null){result2 = "";}else {result2 = null;pos = pos2;}if(result2 !== null){result3 = parse_SourceCharacter();if(result3 !== null){result2 = [result2, result3];}else {result2 = null;pos = pos1;}}else {result2 = null;pos = pos1;}}if(result1 !== null){result0 = [result0, result1];}else {result0 = null;pos = pos0;}}else {result0 = null;pos = pos0;}return result0;}function parse__(){var result0, result1;result0 = [];result1 = parse_WhiteSpace();if(result1 === null){result1 = parse_MultiLineCommentNoLineTerminator();if(result1 === null){result1 = parse_SingleLineComment();}}while(result1 !== null) {result0.push(result1);result1 = parse_WhiteSpace();if(result1 === null){result1 = parse_MultiLineCommentNoLineTerminator();if(result1 === null){result1 = parse_SingleLineComment();}}}return result0;}function parse___(){var result0, result1;result0 = [];result1 = parse_WhiteSpace();if(result1 === null){result1 = parse_LineTerminatorSequence();if(result1 === null){result1 = parse_Comment();}}while(result1 !== null) {result0.push(result1);result1 = parse_WhiteSpace();if(result1 === null){result1 = parse_LineTerminatorSequence();if(result1 === null){result1 = parse_Comment();}}}return result0;}function parse_Literal(){var result0;var pos0;pos0 = pos;result0 = parse_Real();if(result0 === null){result0 = parse_Integer();}if(result0 !== null){result0 = (function(offset, val){return {type:"NumericLiteral", value:val};})(pos0, result0);}if(result0 === null){pos = pos0;}return result0;}function parse_Integer(){var result0, result1;var pos0;pos0 = pos;if(/^[0-9]/.test(input.charAt(pos))){result1 = input.charAt(pos);pos++;}else {result1 = null;if(reportFailures === 0){matchFailed("[0-9]");}}if(result1 !== null){result0 = [];while(result1 !== null) {result0.push(result1);if(/^[0-9]/.test(input.charAt(pos))){result1 = input.charAt(pos);pos++;}else {result1 = null;if(reportFailures === 0){matchFailed("[0-9]");}}}}else {result0 = null;}if(result0 !== null){result0 = (function(offset, digits){return parseInt(digits.join(""));})(pos0, result0);}if(result0 === null){pos = pos0;}return result0;}function parse_Real(){var result0, result1, result2;var pos0, pos1;pos0 = pos;pos1 = pos;result0 = parse_Integer();if(result0 !== null){if(input.charCodeAt(pos) === 46){result1 = ".";pos++;}else {result1 = null;if(reportFailures === 0){matchFailed("\".\"");}}if(result1 !== null){result2 = parse_Integer();if(result2 !== null){result0 = [result0, result1, result2];}else {result0 = null;pos = pos1;}}else {result0 = null;pos = pos1;}}else {result0 = null;pos = pos1;}if(result0 !== null){result0 = (function(offset, digits){return parseFloat(digits.join(""));})(pos0, result0);}if(result0 === null){pos = pos0;}return result0;}function parse_SignedInteger(){var result0, result1, result2;var pos0;pos0 = pos;if(/^[\-+]/.test(input.charAt(pos))){result0 = input.charAt(pos);pos++;}else {result0 = null;if(reportFailures === 0){matchFailed("[\\-+]");}}result0 = result0 !== null?result0:"";if(result0 !== null){if(/^[0-9]/.test(input.charAt(pos))){result2 = input.charAt(pos);pos++;}else {result2 = null;if(reportFailures === 0){matchFailed("[0-9]");}}if(result2 !== null){result1 = [];while(result2 !== null) {result1.push(result2);if(/^[0-9]/.test(input.charAt(pos))){result2 = input.charAt(pos);pos++;}else {result2 = null;if(reportFailures === 0){matchFailed("[0-9]");}}}}else {result1 = null;}if(result1 !== null){result0 = [result0, result1];}else {result0 = null;pos = pos0;}}else {result0 = null;pos = pos0;}return result0;}function parse_Identifier(){var result0;var pos0;reportFailures++;pos0 = pos;result0 = parse_IdentifierName();if(result0 !== null){result0 = (function(offset, name){return name;})(pos0, result0);}if(result0 === null){pos = pos0;}reportFailures--;if(reportFailures === 0 && result0 === null){matchFailed("identifier");}return result0;}function parse_IdentifierName(){var result0, result1, result2;var pos0, pos1;reportFailures++;pos0 = pos;pos1 = pos;result0 = parse_IdentifierStart();if(result0 !== null){result1 = [];result2 = parse_IdentifierStart();while(result2 !== null) {result1.push(result2);result2 = parse_IdentifierStart();}if(result1 !== null){result0 = [result0, result1];}else {result0 = null;pos = pos1;}}else {result0 = null;pos = pos1;}if(result0 !== null){result0 = (function(offset, start, parts){return start + parts.join("");})(pos0, result0[0], result0[1]);}if(result0 === null){pos = pos0;}reportFailures--;if(reportFailures === 0 && result0 === null){matchFailed("identifier");}return result0;}function parse_PrimaryExpression(){var result0, result1, result2, result3, result4;var pos0, pos1;pos0 = pos;result0 = parse_Identifier();if(result0 !== null){result0 = (function(offset, name){return {type:"Variable", name:name};})(pos0, result0);}if(result0 === null){pos = pos0;}if(result0 === null){result0 = parse_Literal();if(result0 === null){pos0 = pos;pos1 = pos;if(input.charCodeAt(pos) === 40){result0 = "(";pos++;}else {result0 = null;if(reportFailures === 0){matchFailed("\"(\"");}}if(result0 !== null){result1 = parse___();if(result1 !== null){result2 = parse_LinearExpression();if(result2 !== null){result3 = parse___();if(result3 !== null){if(input.charCodeAt(pos) === 41){result4 = ")";pos++;}else {result4 = null;if(reportFailures === 0){matchFailed("\")\"");}}if(result4 !== null){result0 = [result0, result1, result2, result3, result4];}else {result0 = null;pos = pos1;}}else {result0 = null;pos = pos1;}}else {result0 = null;pos = pos1;}}else {result0 = null;pos = pos1;}}else {result0 = null;pos = pos1;}if(result0 !== null){result0 = (function(offset, expression){return expression;})(pos0, result0[2]);}if(result0 === null){pos = pos0;}}}return result0;}function parse_UnaryExpression(){var result0, result1, result2;var pos0, pos1;result0 = parse_PrimaryExpression();if(result0 === null){pos0 = pos;pos1 = pos;result0 = parse_UnaryOperator();if(result0 !== null){result1 = parse___();if(result1 !== null){result2 = parse_UnaryExpression();if(result2 !== null){result0 = [result0, result1, result2];}else {result0 = null;pos = pos1;}}else {result0 = null;pos = pos1;}}else {result0 = null;pos = pos1;}if(result0 !== null){result0 = (function(offset, operator, expression){return {type:"UnaryExpression", operator:operator, expression:expression};})(pos0, result0[0], result0[2]);}if(result0 === null){pos = pos0;}}return result0;}function parse_UnaryOperator(){var result0;if(input.charCodeAt(pos) === 43){result0 = "+";pos++;}else {result0 = null;if(reportFailures === 0){matchFailed("\"+\"");}}if(result0 === null){if(input.charCodeAt(pos) === 45){result0 = "-";pos++;}else {result0 = null;if(reportFailures === 0){matchFailed("\"-\"");}}if(result0 === null){if(input.charCodeAt(pos) === 33){result0 = "!";pos++;}else {result0 = null;if(reportFailures === 0){matchFailed("\"!\"");}}}}return result0;}function parse_MultiplicativeExpression(){var result0, result1, result2, result3, result4, result5;var pos0, pos1, pos2;pos0 = pos;pos1 = pos;result0 = parse_UnaryExpression();if(result0 !== null){result1 = [];pos2 = pos;result2 = parse___();if(result2 !== null){result3 = parse_MultiplicativeOperator();if(result3 !== null){result4 = parse___();if(result4 !== null){result5 = parse_UnaryExpression();if(result5 !== null){result2 = [result2, result3, result4, result5];}else {result2 = null;pos = pos2;}}else {result2 = null;pos = pos2;}}else {result2 = null;pos = pos2;}}else {result2 = null;pos = pos2;}while(result2 !== null) {result1.push(result2);pos2 = pos;result2 = parse___();if(result2 !== null){result3 = parse_MultiplicativeOperator();if(result3 !== null){result4 = parse___();if(result4 !== null){result5 = parse_UnaryExpression();if(result5 !== null){result2 = [result2, result3, result4, result5];}else {result2 = null;pos = pos2;}}else {result2 = null;pos = pos2;}}else {result2 = null;pos = pos2;}}else {result2 = null;pos = pos2;}}if(result1 !== null){result0 = [result0, result1];}else {result0 = null;pos = pos1;}}else {result0 = null;pos = pos1;}if(result0 !== null){result0 = (function(offset, head, tail){var result=head;for(var i=0; i < tail.length; i++) {result = {type:"MultiplicativeExpression", operator:tail[i][1], left:result, right:tail[i][3]};}return result;})(pos0, result0[0], result0[1]);}if(result0 === null){pos = pos0;}return result0;}function parse_MultiplicativeOperator(){var result0;if(input.charCodeAt(pos) === 42){result0 = "*";pos++;}else {result0 = null;if(reportFailures === 0){matchFailed("\"*\"");}}if(result0 === null){if(input.charCodeAt(pos) === 47){result0 = "/";pos++;}else {result0 = null;if(reportFailures === 0){matchFailed("\"/\"");}}}return result0;}function parse_AdditiveExpression(){var result0, result1, result2, result3, result4, result5;var pos0, pos1, pos2;pos0 = pos;pos1 = pos;result0 = parse_MultiplicativeExpression();if(result0 !== null){result1 = [];pos2 = pos;result2 = parse___();if(result2 !== null){result3 = parse_AdditiveOperator();if(result3 !== null){result4 = parse___();if(result4 !== null){result5 = parse_MultiplicativeExpression();if(result5 !== null){result2 = [result2, result3, result4, result5];}else {result2 = null;pos = pos2;}}else {result2 = null;pos = pos2;}}else {result2 = null;pos = pos2;}}else {result2 = null;pos = pos2;}while(result2 !== null) {result1.push(result2);pos2 = pos;result2 = parse___();if(result2 !== null){result3 = parse_AdditiveOperator();if(result3 !== null){result4 = parse___();if(result4 !== null){result5 = parse_MultiplicativeExpression();if(result5 !== null){result2 = [result2, result3, result4, result5];}else {result2 = null;pos = pos2;}}else {result2 = null;pos = pos2;}}else {result2 = null;pos = pos2;}}else {result2 = null;pos = pos2;}}if(result1 !== null){result0 = [result0, result1];}else {result0 = null;pos = pos1;}}else {result0 = null;pos = pos1;}if(result0 !== null){result0 = (function(offset, head, tail){var result=head;for(var i=0; i < tail.length; i++) {result = {type:"AdditiveExpression", operator:tail[i][1], left:result, right:tail[i][3]};}return result;})(pos0, result0[0], result0[1]);}if(result0 === null){pos = pos0;}return result0;}function parse_AdditiveOperator(){var result0;if(input.charCodeAt(pos) === 43){result0 = "+";pos++;}else {result0 = null;if(reportFailures === 0){matchFailed("\"+\"");}}if(result0 === null){if(input.charCodeAt(pos) === 45){result0 = "-";pos++;}else {result0 = null;if(reportFailures === 0){matchFailed("\"-\"");}}}return result0;}function parse_InequalityExpression(){var result0, result1, result2, result3, result4, result5;var pos0, pos1, pos2;pos0 = pos;pos1 = pos;result0 = parse_AdditiveExpression();if(result0 !== null){result1 = [];pos2 = pos;result2 = parse___();if(result2 !== null){result3 = parse_InequalityOperator();if(result3 !== null){result4 = parse___();if(result4 !== null){result5 = parse_AdditiveExpression();if(result5 !== null){result2 = [result2, result3, result4, result5];}else {result2 = null;pos = pos2;}}else {result2 = null;pos = pos2;}}else {result2 = null;pos = pos2;}}else {result2 = null;pos = pos2;}while(result2 !== null) {result1.push(result2);pos2 = pos;result2 = parse___();if(result2 !== null){result3 = parse_InequalityOperator();if(result3 !== null){result4 = parse___();if(result4 !== null){result5 = parse_AdditiveExpression();if(result5 !== null){result2 = [result2, result3, result4, result5];}else {result2 = null;pos = pos2;}}else {result2 = null;pos = pos2;}}else {result2 = null;pos = pos2;}}else {result2 = null;pos = pos2;}}if(result1 !== null){result0 = [result0, result1];}else {result0 = null;pos = pos1;}}else {result0 = null;pos = pos1;}if(result0 !== null){result0 = (function(offset, head, tail){var result=head;for(var i=0; i < tail.length; i++) {result = {type:"Inequality", operator:tail[i][1], left:result, right:tail[i][3]};}return result;})(pos0, result0[0], result0[1]);}if(result0 === null){pos = pos0;}return result0;}function parse_InequalityOperator(){var result0;if(input.substr(pos, 2) === "<="){result0 = "<=";pos += 2;}else {result0 = null;if(reportFailures === 0){matchFailed("\"<=\"");}}if(result0 === null){if(input.substr(pos, 2) === ">="){result0 = ">=";pos += 2;}else {result0 = null;if(reportFailures === 0){matchFailed("\">=\"");}}if(result0 === null){if(input.charCodeAt(pos) === 60){result0 = "<";pos++;}else {result0 = null;if(reportFailures === 0){matchFailed("\"<\"");}}if(result0 === null){if(input.charCodeAt(pos) === 62){result0 = ">";pos++;}else {result0 = null;if(reportFailures === 0){matchFailed("\">\"");}}}}}return result0;}function parse_LinearExpression(){var result0, result1, result2, result3, result4, result5;var pos0, pos1, pos2;pos0 = pos;pos1 = pos;result0 = parse_InequalityExpression();if(result0 !== null){result1 = [];pos2 = pos;result2 = parse___();if(result2 !== null){if(input.substr(pos, 2) === "=="){result3 = "==";pos += 2;}else {result3 = null;if(reportFailures === 0){matchFailed("\"==\"");}}if(result3 !== null){result4 = parse___();if(result4 !== null){result5 = parse_InequalityExpression();if(result5 !== null){result2 = [result2, result3, result4, result5];}else {result2 = null;pos = pos2;}}else {result2 = null;pos = pos2;}}else {result2 = null;pos = pos2;}}else {result2 = null;pos = pos2;}while(result2 !== null) {result1.push(result2);pos2 = pos;result2 = parse___();if(result2 !== null){if(input.substr(pos, 2) === "=="){result3 = "==";pos += 2;}else {result3 = null;if(reportFailures === 0){matchFailed("\"==\"");}}if(result3 !== null){result4 = parse___();if(result4 !== null){result5 = parse_InequalityExpression();if(result5 !== null){result2 = [result2, result3, result4, result5];}else {result2 = null;pos = pos2;}}else {result2 = null;pos = pos2;}}else {result2 = null;pos = pos2;}}else {result2 = null;pos = pos2;}}if(result1 !== null){result0 = [result0, result1];}else {result0 = null;pos = pos1;}}else {result0 = null;pos = pos1;}if(result0 !== null){result0 = (function(offset, head, tail){var result=head;for(var i=0; i < tail.length; i++) {result = {type:"Equality", operator:tail[i][1], left:result, right:tail[i][3]};}return result;})(pos0, result0[0], result0[1]);}if(result0 === null){pos = pos0;}return result0;}function cleanupExpected(expected){expected.sort();var lastExpected=null;var cleanExpected=[];for(var i=0; i < expected.length; i++) {if(expected[i] !== lastExpected){cleanExpected.push(expected[i]);lastExpected = expected[i];}}return cleanExpected;}function computeErrorPosition(){var line=1;var column=1;var seenCR=false;for(var i=0; i < Math.max(pos, rightmostFailuresPos); i++) {var ch=input.charAt(i);if(ch === "\n"){if(!seenCR){line++;}column = 1;seenCR = false;}else if(ch === "\r" || ch === "\u2028" || ch === "\u2029"){line++;column = 1;seenCR = true;}else {column++;seenCR = false;}}return {line:line, column:column};}var result=parseFunctions[startRule]();if(result === null || pos !== input.length){var offset=Math.max(pos, rightmostFailuresPos);var found=offset < input.length?input.charAt(offset):null;var errorPosition=computeErrorPosition();throw new this.SyntaxError(cleanupExpected(rightmostFailuresExpected), found, offset, errorPosition.line, errorPosition.column);}return result;}, toSource:function toSource(){return this._source;}};result.SyntaxError = function(expected, found, offset, line, column){function buildMessage(expected, found){var expectedHumanized, foundHumanized;switch(expected.length){case 0:expectedHumanized = "end of input";break;case 1:expectedHumanized = expected[0];break;default:expectedHumanized = expected.slice(0, expected.length - 1).join(", ") + " or " + expected[expected.length - 1];}foundHumanized = found?quote(found):"end of input";return "Expected " + expectedHumanized + " but " + foundHumanized + " found.";}this.name = "SyntaxError";this.expected = expected;this.found = found;this.message = buildMessage(expected, found);this.offset = offset;this.line = line;this.column = column;};result.SyntaxError.prototype = Error.prototype;return result;})();}).call(typeof module != "undefined"?module.compiled = true && module:undefined);

},{}],2:[function(require,module,exports){
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
    /** left aligned */
    LEFT: 'left',
    /** right aligned */
    RIGHT: 'right',
    TOP: 'top',
    BOTTOM: 'bottom',
    WIDTH: 'width',
    HEIGHT: 'height',
    CENTERX: 'centerX',
    CENTERY: 'centerY'
    /*LEADING: 'leading',
    TRAILING: 'trailing'*/
};
exports['default'] = Attribute;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
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

},{"./Attribute.es6":2,"./Priority.es6":4,"./Relation.es6":5,"./SubView.es6":6,"./View.es6":7,"./VisualFormat.es6":8}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
//import c from 'cassowary/bin/c';
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _cassowaryJsBinC = require('../cassowary.js/bin/c');

var _cassowaryJsBinC2 = _interopRequireDefault(_cassowaryJsBinC);

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
            this._attr[_AttributeEs62['default'].LEFT] = new _cassowaryJsBinC2['default'].Variable({ value: 0, name: '|.left' });
            this._solver.addConstraint(new _cassowaryJsBinC2['default'].StayConstraint(this._attr[_AttributeEs62['default'].LEFT], _cassowaryJsBinC2['default'].Strength.required));
            this._attr[_AttributeEs62['default'].TOP] = new _cassowaryJsBinC2['default'].Variable({ value: 0, name: '|.top' });
            this._solver.addConstraint(new _cassowaryJsBinC2['default'].StayConstraint(this._attr[_AttributeEs62['default'].TOP], _cassowaryJsBinC2['default'].Strength.required));
            this._attr[_AttributeEs62['default'].WIDTH] = new _cassowaryJsBinC2['default'].Variable({ value: 0, name: '|.width' });
            this._solver.addEditVar(this._attr[_AttributeEs62['default'].WIDTH], new _cassowaryJsBinC2['default'].Strength('required', 999, 1000, 1000));
            this._attr[_AttributeEs62['default'].HEIGHT] = new _cassowaryJsBinC2['default'].Variable({ value: 0, name: '|.height' });
            this._solver.addEditVar(this._attr[_AttributeEs62['default'].HEIGHT], new _cassowaryJsBinC2['default'].Strength('required', 999, 1000, 1000));
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
         * @readonly
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
                    this._attr[attr] = new _cassowaryJsBinC2['default'].Variable({ value: 0, name: (this._name || '|') + '.' + attr });
                    break;
                case _AttributeEs62['default'].RIGHT:
                    this._getAttr(_AttributeEs62['default'].LEFT);
                    this._getAttr(_AttributeEs62['default'].WIDTH);
                    this._attr[_AttributeEs62['default'].RIGHT] = new _cassowaryJsBinC2['default'].Variable({ name: (this._name || '|') + '.' + attr });
                    this._solver.addConstraint(new _cassowaryJsBinC2['default'].Equation(this._attr[_AttributeEs62['default'].RIGHT], _cassowaryJsBinC2['default'].plus(this._attr[_AttributeEs62['default'].LEFT], this._attr[_AttributeEs62['default'].WIDTH])));
                    break;
                case _AttributeEs62['default'].BOTTOM:
                    this._getAttr(_AttributeEs62['default'].TOP);
                    this._getAttr(_AttributeEs62['default'].HEIGHT);
                    this._attr[_AttributeEs62['default'].BOTTOM] = new _cassowaryJsBinC2['default'].Variable({ name: (this._name || '|') + '.' + attr });
                    this._solver.addConstraint(new _cassowaryJsBinC2['default'].Equation(this._attr[_AttributeEs62['default'].BOTTOM], _cassowaryJsBinC2['default'].plus(this._attr[_AttributeEs62['default'].TOP], this._attr[_AttributeEs62['default'].HEIGHT])));
                    break;
                case _AttributeEs62['default'].CENTERX:
                    this._getAttr(_AttributeEs62['default'].LEFT);
                    this._getAttr(_AttributeEs62['default'].WIDTH);
                    this._attr[_AttributeEs62['default'].CENTERX] = new _cassowaryJsBinC2['default'].Variable({ name: (this._name || '|') + '.' + attr });
                    this._solver.addConstraint(new _cassowaryJsBinC2['default'].Equation(this._attr[_AttributeEs62['default'].CENTERX], _cassowaryJsBinC2['default'].plus(this._attr[_AttributeEs62['default'].LEFT], _cassowaryJsBinC2['default'].divide(this._attr[_AttributeEs62['default'].WIDTH], 2))));
                    break;
                case _AttributeEs62['default'].CENTERY:
                    this._getAttr(_AttributeEs62['default'].TOP);
                    this._getAttr(_AttributeEs62['default'].HEIGHT);
                    this._attr[_AttributeEs62['default'].CENTERY] = new _cassowaryJsBinC2['default'].Variable({ name: (this._name || '|') + '.' + attr });
                    this._solver.addConstraint(new _cassowaryJsBinC2['default'].Equation(this._attr[_AttributeEs62['default'].CENTERY], _cassowaryJsBinC2['default'].plus(this._attr[_AttributeEs62['default'].TOP], _cassowaryJsBinC2['default'].divide(this._attr[_AttributeEs62['default'].HEIGHT], 2))));
                    break;
            }
            return this._attr[attr];
        }
    }]);

    return SubView;
})();

exports['default'] = SubView;
module.exports = exports['default'];

},{"../cassowary.js/bin/c":1,"./Attribute.es6":2}],7:[function(require,module,exports){
//import c from 'cassowary/bin/c';
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _cassowaryJsBinC = require('../cassowary.js/bin/c');

var _cassowaryJsBinC2 = _interopRequireDefault(_cassowaryJsBinC);

var _AttributeEs6 = require('./Attribute.es6');

var _AttributeEs62 = _interopRequireDefault(_AttributeEs6);

var _RelationEs6 = require('./Relation.es6');

var _RelationEs62 = _interopRequireDefault(_RelationEs6);

var _SubViewEs6 = require('./SubView.es6');

var _SubViewEs62 = _interopRequireDefault(_SubViewEs6);

var defaultPriorityStrength = new _cassowaryJsBinC2['default'].Strength('defaultPriority', 0, 1000, 1000);

function _getConst(name, value) {
    var vr = new _cassowaryJsBinC2['default'].Variable({ value: value });
    this._solver.addConstraint(new _cassowaryJsBinC2['default'].StayConstraint(vr, _cassowaryJsBinC2['default'].Strength.required, 0));
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
    if (!this._spacingVars[index]) {
        this._spacingVars[index] = new _cassowaryJsBinC2['default'].Variable({
            value: this._spacing[index],
            name: 'spacing[' + index + ']'
        });
        this._solver.addEditVar(this._spacingVars[index]);
    }
    return this._spacingVars[index];
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
            attr2 = _cassowaryJsBinC2['default'].times(_cassowaryJsBinC2['default'].minus(attr2, constant), multiplier);
        } else if (constant) {
            attr2 = _cassowaryJsBinC2['default'].minus(attr2, constant);
        } else if (multiplier !== 1) {
            attr2 = _cassowaryJsBinC2['default'].times(attr2, multiplier);
        }
    }
    var strength = constraint.priority !== undefined && constraint.priority < 1000 ? new _cassowaryJsBinC2['default'].Strength('priority', 0, constraint.priority, 1000) : defaultPriorityStrength;
    switch (constraint.relation) {
        case _RelationEs62['default'].EQU:
            relation = new _cassowaryJsBinC2['default'].Equation(attr1, attr2, strength);
            break;
        case _RelationEs62['default'].GEQ:
            relation = new _cassowaryJsBinC2['default'].Inequality(attr1, _cassowaryJsBinC2['default'].GEQ, attr2, strength);
            break;
        case _RelationEs62['default'].LEQ:
            relation = new _cassowaryJsBinC2['default'].Inequality(attr1, _cassowaryJsBinC2['default'].LEQ, attr2, strength);
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
     * @param {Array} [options.constraints] One or more constraint definitions (see `setConstraints`).
     */

    function View(options) {
        _classCallCheck(this, View);

        this._solver = new _cassowaryJsBinC2['default'].SimplexSolver();
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
            if (this._width === width && this._height === height) {
                return undefined;
            }
            if (width !== undefined && this._width !== width) {
                this._width = width;
                this._solver.suggestValue(this._parentSubView._getAttr(_AttributeEs62['default'].WIDTH), this._width);
            }
            if (height !== undefined && this._height !== height) {
                this._height = height;
                this._solver.suggestValue(this._parentSubView._getAttr(_AttributeEs62['default'].HEIGHT), this._height);
            }
            this._solver.resolve();
            //console.log('width: ' + this._parentSubView._getAttr(Attribute.WIDTH).value + ', height: ' + this._parentSubView._getAttr(Attribute.HEIGHT).value)
            return this;
        }
    }, {
        key: 'width',

        /**
         * Width that was set using `setSize`.
         * @type {Number}
         */
        get: function () {
            return this._width;
        }
    }, {
        key: 'height',

        /**
         * Height that was set using `setSize`.
         * @type {Number}
         */
        get: function () {
            return this._height;
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

},{"../cassowary.js/bin/c":1,"./Attribute.es6":2,"./Relation.es6":5,"./SubView.es6":6}],8:[function(require,module,exports){
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
            if (visualFormat.length === 0) {
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
                            constant: relation.constant,
                            priority: relation.priority
                            //,variable: relation.variable
                        });
                    }
                    relation = undefined;

                    // process view size constraints
                    if (item.constraints) {
                        for (var n = 0; n < item.constraints.length; n++) {
                            attr1 = horizontal ? _AttributeEs62['default'].WIDTH : _AttributeEs62['default'].HEIGHT;
                            attr2 = item.constraints[n].view || item.constraints[n].multiplier ? attr1 : item.constraints[n].variable ? _AttributeEs62['default'].VARIABLE : _AttributeEs62['default'].CONST;
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

},{"./Attribute.es6":2,"./parser/parser":9,"./parser/parserExt":10}],9:[function(require,module,exports){
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
        peg$c47 = /^[a-zA-Z0-9\-_]/,
        peg$c48 = { type: "class", value: "[a-zA-Z0-9\\-_]", description: "[a-zA-Z0-9\\-_]" },
        peg$c49 = function peg$c49(v) {
      return { view: v };
    },
        peg$c50 = /^[0-9]/,
        peg$c51 = { type: "class", value: "[0-9]", description: "[0-9]" },
        peg$c52 = function peg$c52(digits) {
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
      var s0, s1, s2, s3;

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
        peg$reportedPos = s0;
        s1 = peg$c49(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsenumber() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c50.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c51);
        }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c50.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c51);
            }
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c52(s1);
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

},{}],10:[function(require,module,exports){
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
        peg$c47 = "%",
        peg$c48 = { type: "literal", value: "%", description: "\"%\"" },
        peg$c49 = function peg$c49(n) {
      return { view: null, multiplier: n / 100 };
    },
        peg$c50 = function peg$c50(vn, m) {
      return { view: vn.view, multiplier: m ? m : 1 };
    },
        peg$c51 = "/",
        peg$c52 = { type: "literal", value: "/", description: "\"/\"" },
        peg$c53 = function peg$c53(n) {
      return 1 / n;
    },
        peg$c54 = "*",
        peg$c55 = { type: "literal", value: "*", description: "\"*\"" },
        peg$c56 = function peg$c56(n) {
      return n;
    },
        peg$c57 = /^[a-zA-Z0-9\-_]/,
        peg$c58 = { type: "class", value: "[a-zA-Z0-9\\-_]", description: "[a-zA-Z0-9\\-_]" },
        peg$c59 = function peg$c59(v) {
      return { view: v };
    },
        peg$c60 = /^[0-9]/,
        peg$c61 = { type: "class", value: "[0-9]", description: "[0-9]" },
        peg$c62 = function peg$c62(digits) {
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

    function peg$parsepercentage() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parsenumber();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 37) {
          s2 = peg$c47;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c48);
          }
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c49(s1);
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
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parseviewName();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsemultiplier();
        if (s2 === peg$FAILED) {
          s2 = peg$c1;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c50(s1, s2);
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

    function peg$parsemultiplier() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 47) {
        s1 = peg$c51;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c52);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsenumber();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c53(s2);
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
          s1 = peg$c54;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c55);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parsenumber();
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c56(s2);
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
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = [];
      if (peg$c57.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c58);
        }
      }
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (peg$c57.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c58);
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
        peg$reportedPos = s0;
        s1 = peg$c59(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsenumber() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c60.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c61);
        }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c60.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c61);
            }
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c62(s1);
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

},{}]},{},[3])(3)
});