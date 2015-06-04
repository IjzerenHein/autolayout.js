/*global describe, it*/
var assert = require('assert');
var AutoLayout = require('../dist/autolayout');

describe('enums', function(){
    describe('Attribute', function(){
        it('AutoLayout.Attribute should exist', function(){
            assert(AutoLayout.Attribute);
        });
    });
    describe('Relation', function(){
        it('AutoLayout.Relation should exist', function(){
            assert(AutoLayout.Relation);
        });
    });
});

describe('VisualFormat', function(){
    describe('parse', function(){
        it('should return -1 when the value is not present', function(){
            var constraints = AutoLayout.VisualFormat.parse('|[myview]|');
            assert.equal(2, constraints.length);
        });
    });
});
