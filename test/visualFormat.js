/*global describe, it*/
var assert = (typeof window === 'undefined') ? require('assert') : window.chai.assert;
var AutoLayout = (typeof window === 'undefined') ? require('../src/AutoLayout').default : window.AutoLayout;
//var Attribute = AutoLayout.Attribute;

describe('VisualFormat', function() {
    describe('parse', function() {
        it('should return 2 contraints for: ' + '|[child]|', function() {
            var constraints = AutoLayout.VisualFormat.parse('|[child]|');
            assert.equal(2, constraints.length);
        });
        it('should return 1 contraint for: ' + '[child][child2]', function() {
            var constraints = AutoLayout.VisualFormat.parse('[child][child2]');
            assert.equal(1, constraints.length);
        });
    });
});
