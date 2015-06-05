var AutoLayout = window.AutoLayout;

console.log(JSON.stringify(AutoLayout, undefined, 2));

console.log(JSON.stringify(AutoLayout.Attribute));
console.log(JSON.stringify(AutoLayout.Relation));

var constraints = AutoLayout.VisualFormat.parse('|[hoi]|');
console.log(JSON.stringify(constraints));


var view = new AutoLayout.View();
view.addVisualFormat('|[child]|');
view.addVisualFormat('V:|[child]|');
view.setSize(100, 100);
assert.equal(0, view.get('child', AutoLayout.Attribute.LEFT));
            assert.equal(0, view.get('child', AutoLayout.Attribute.TOP));
            assert.equal(100, view.get('child', AutoLayout.Attribute.WIDTH));
            assert.equal(100, view.get('child', AutoLayout.Attribute.HEIGHT));
