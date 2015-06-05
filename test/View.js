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
                assert.equal(100, view.get(undefined, 'width'));
            });
        });
        describe('height', function(){
            var view = new AutoLayout.View();
            view.setSize(undefined, 100);
            it('height should be equal', function(){
                assert.equal(100, view.get(undefined, 'height'));
            });
        });
        describe('width & height', function(){
            var view = new AutoLayout.View();
            view.setSize(200, 100);
            it('width should be equal', function(){
                assert.equal(200, view.get(undefined, 'width'));
            });
            it('height should be equal', function(){
                assert.equal(100, view.get(undefined, 'height'));
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
        it('left', function(){
            assert.equal(0, view.get('child', 'left'));
        });
        it('width', function(){
            assert.equal(width, view.get('child', 'width'));
        });
        it('right', function(){
            assert.equal(view.get('child', 'left') + view.get('child', 'width'), view.get('child', 'right'));
        });
        it('centerX', function(){
            assert.equal(view.get('child', 'left') + (view.get('child', 'width') / 2), view.get('child', 'centerX'));
            assert.equal(width / 2, view.get('child', 'centerX'));
        });
        it('top', function(){
            assert.equal(0, view.get('child', 'top'));
        });
        it('height', function(){
            assert.equal(height, view.get('child', 'height'));
        });
        it('bottom', function(){
            assert.equal(view.get('child', 'top') + view.get('child', 'height'), view.get('child', 'bottom'));
            assert.equal(height, view.get('child', 'bottom'));
        });
        it('centerY', function(){
            assert.equal(view.get('child', 'top') + (view.get('child', 'height') / 2), view.get('child', 'centerY'));
            assert.equal(height / 2, view.get('child', 'centerY'));
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
