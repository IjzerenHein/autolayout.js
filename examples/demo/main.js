var AutoLayout = window.AutoLayout;

console.log(JSON.stringify(AutoLayout, undefined, 2));

console.log(JSON.stringify(AutoLayout.Attribute));
console.log(JSON.stringify(AutoLayout.Relation));

var constraints = AutoLayout.VisualFormat.parse('|[hoi]|');
console.log(JSON.stringify(constraints));
