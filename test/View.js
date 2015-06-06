/*global describe, it*/
var assert = (typeof window === 'undefined') ? require('assert') : window.chai.assert;
var AutoLayout = (typeof window === 'undefined') ? require('../src/AutoLayout').default : window.AutoLayout;
//var Attribute = AutoLayout.Attribute;

describe('View', function(){
    describe('setSize', function(){
        describe('width', function(){
            var view = new AutoLayout.View();
            view.setSize(100);
            it('width should be equal', function(){
                assert.equal(100, view.width);
            });
        });
        describe('height', function(){
            var view = new AutoLayout.View();
            view.setSize(undefined, 100);
            it('height should be equal', function(){
                assert.equal(100, view.height);
            });
        });
        describe('width & height', function(){
            var view = new AutoLayout.View();
            view.setSize(200, 100);
            it('width should be equal', function(){
                assert.equal(200, view.width);
            });
            it('height should be equal', function(){
                assert.equal(100, view.height);
            });
        });
    });

    describe('attributes', function(){
        var width = 200;
        var height = 100;
        var view = new AutoLayout.View();
        view.setSize(width, height);
        view.addVisualFormat('|[child]|');
        view.addVisualFormat('V:|[child]|');
        var child = view.subViews.child;
        it('left', function(){
            assert.equal(0, child.left);
        });
        it('width', function(){
            assert.equal(width, child.width);
        });
        it('right', function(){
            assert.equal(child.left + child.right, child.right);
        });
        it('centerX', function(){
            assert.equal(child.left + (child.width / 2), child.centerX);
            assert.equal(width / 2, child.centerX);
        });
        it('top', function(){
            assert.equal(0, child.top);
        });
        it('height', function(){
            assert.equal(height, child.height);
        });
        it('bottom', function(){
            assert.equal(child.top + child.height, child.bottom);
            assert.equal(height, child.bottom);
        });
        it('centerY', function(){
            assert.equal(child.top + (child.height / 2), child.centerY);
            assert.equal(height / 2, child.centerY);
        });
    });

    /*describe('visualFormats', function(){
        describe('|[child]|', function(){
            var width = 100;
            var view = new AutoLayout.View();
            view.setSize(width);
            view.addVisualFormat('|[child]|');
            it('left should be 0', function(){
                assert.equal(0, view.getChild('child', Attribute.LEFT));
            });
            it('width should be ' + width, function(){
                assert.equal(width, view.getChild('child', Attribute.WIDTH));
            });
            it('width should be ' + width, function(){
                assert.equal(width, view.getChild('child', Attribute.WIDTH));
            });
                assert.equal(0, view.get('child', Attribute.TOP));
                assert.equal(100, view.get('child', Attribute.WIDTH));
                assert.equal(100, view.get('child', Attribute.HEIGHT));
            });
        });
    });*/
});
