/*global describe, it*/
var assert = (typeof window === 'undefined') ? require('assert') : window.chai.assert;
var AutoLayout = (typeof window === 'undefined') ? require('../dist/autolayout') : window.AutoLayout;

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

    describe('parse', function() {
        it('should return 1 contraint for: ' + '[child(60)] with constant 60', function() {
            var constraints = AutoLayout.VisualFormat.parse('[child(60)]', opts);
            assert.equal(1, constraints.length);
            assert.equal(constraints[0].constant, 60);
        });
        it('should return 1 contraint for: ' + '[child(60.6666)] with constant 60.6666', function() {
            var constraints = AutoLayout.VisualFormat.parse('[child(60.6666)]', opts);
            assert.equal(1, constraints.length);
            assert.equal(constraints[0].constant, 60.6666);
        });
    });
});
