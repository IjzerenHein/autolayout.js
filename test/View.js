/*global describe, it*/
var assert = (typeof window === 'undefined') ? require('assert') : window.chai.assert;
var AutoLayout = (typeof window === 'undefined') ? require('../dist/autolayout') : window.AutoLayout;

describe('View', function() {
    describe('setSize', function() {
        describe('width', function() {
            var view = new AutoLayout.View();
            view.setSize(100);
            it('width should be equal to 100', function() {
                assert.equal(100, view.width);
            });
        });
        describe('height', function() {
            var view = new AutoLayout.View();
            view.setSize(undefined, 100);
            it('height should be equal to 100', function() {
                assert.equal(100, view.height);
            });
        });
        describe('width & height', function() {
            var view = new AutoLayout.View();
            view.setSize(200, 100);
            it('width should be equal to 200', function() {
                assert.equal(200, view.width);
            });
            it('height should be equal to 100', function() {
                assert.equal(100, view.height);
            });
        });
        describe('size through constructor', function() {
            var view = new AutoLayout.View({
                width: 200,
                height: 100
            });
            it('width should be equal to 200', function() {
                assert.equal(200, view.width);
            });
            it('height should be equal to 100', function() {
                assert.equal(100, view.height);
            });
        });
        describe('ambiguous inner size |[child(50)]|', function() {
            var view = new AutoLayout.View({
                constraints: AutoLayout.VisualFormat.parse([
                    '|[child(50)]|'
                ]),
                width: 200
            });
            it('width should be equal 200', function() {
                assert.equal(200, view.width);
            });
        });
    });

    describe('toJSON', function() {
        var view = new AutoLayout.View({
            constraints: AutoLayout.VisualFormat.parse([
                '|-[child(==child2)]-[child2]-|',
                'V:|[child(==child2)]|'
            ]),
            width: 200,
            height: 100
        });
        it('subViews', function() {
            assert.equal(JSON.stringify(view.subViews), JSON.stringify({
                child: {
                    name: 'child',
                    left: 8,
                    top: 0,
                    width: 88,
                    height: 100
                },
                child2: {
                    name: 'child2',
                    left: 104,
                    top: 0,
                    width: 88,
                    height: 100
                }
            }));
        });
        it('subViews.child', function() {
            assert.equal(JSON.stringify(view.subViews.child), JSON.stringify({
                name: 'child',
                left: 8,
                top: 0,
                width: 88,
                height: 100
            }));
        });
    });

    describe('attributes', function() {
        var width = 200;
        var height = 100;
        var view = new AutoLayout.View({
            constraints: AutoLayout.VisualFormat.parse([
                '|[child]|',
                'V:|[child]|'
            ]),
            width: width,
            height: height
        });
        var child = view.subViews.child;
        it('left should be 0', function() {
            assert.equal(0, child.left);
        });
        it('width should be ' + width, function() {
            assert.equal(width, child.width);
        });
        it('right should be 200', function() {
            assert.equal(width, child.right);
        });
        it('centerX should be 100', function() {
            assert.equal(child.left + (child.width / 2), child.centerX);
            assert.equal(width / 2, child.centerX);
        });
        it('top should be 0', function() {
            assert.equal(0, child.top);
        });
        it('height should be 100', function() {
            assert.equal(height, child.height);
        });
        it('bottom should be 100', function() {
            assert.equal(child.top + child.height, child.bottom);
            assert.equal(height, child.bottom);
        });
        it('centerY should be 50', function() {
            assert.equal(child.top + (child.height / 2), child.centerY);
            assert.equal(height / 2, child.centerY);
        });
    });

    describe('intrinsic & fitting size', function() {
        it('|-[view1]-[view2]-| subViews.view1.intrinsWidth = 100', function() {
            var view = new AutoLayout.View({
                constraints: AutoLayout.VisualFormat.parse('|-[view1]-[view2]-|'),
                spacing: 20,
                width: 500
            });
            view.subViews.view1.intrinsicWidth = 100;
            assert.equal(view.subViews.view2.width, 340);
        });
        it('|-[view1]-[view2]-| => fittingWidth', function() {
            var view = new AutoLayout.View({
                constraints: AutoLayout.VisualFormat.parse('|-[view1]-[view2]-|'),
                spacing: 20
            });
            view.subViews.view1.intrinsicWidth = 100;
            view.subViews.view2.intrinsicWidth = 100;
            assert.equal(view.fittingWidth, 260);
        });
    });
});
