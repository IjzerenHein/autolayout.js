/*global describe, it*/
var assert = (typeof window === 'undefined') ? require('assert') : window.chai.assert;
var AutoLayout = (typeof window === 'undefined') ? require('../src/AutoLayout.es6').default : window.AutoLayout;
//var Attribute = AutoLayout.Attribute;

var opts = {extended: true};
describe('ExtendedVisualFormat', function() {
    describe('comments', function() {
        it('allow end of line comments: ' + '|[child]| //comments here', function() {
            var constraints = AutoLayout.VisualFormat.parse('|[child]| // comments here', opts);
            assert.equal(2, constraints.length);
        });
        it('allow end of line comments (no spaces): ' + '|[child]|//comments here', function() {
            var constraints = AutoLayout.VisualFormat.parse('|[child]|//comments here', opts);
            assert.equal(2, constraints.length);
        });
        it('allow whole line comments: ' + '//|[child]|', function() {
            var constraints = AutoLayout.VisualFormat.parse('//|[child]|', opts);
            assert.equal(0, constraints.length);
        });
    });

    describe('operators', function() {
        // todo
    });
});
