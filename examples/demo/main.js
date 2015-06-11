var AutoLayout = window.AutoLayout;
var assert = window.chai.assert;

var constraints = AutoLayout.VisualFormat.parse([
    '|[child]|',
    'V:|[child]|'
]);

var view = new AutoLayout.View();
view.addConstraints(constraints);
view.setSize(100, 100);

assert.equal(0, view.subViews.child.left);
assert.equal(0, view.subViews.child.top);
assert.equal(100, view.subViews.child.width);
assert.equal(100, view.subViews.child.height);

console.log(view.subViews);
