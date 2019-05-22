var fs = require('fs');
var esperanto = require('esperanto');

esperanto.bundle({
  entry: 'src/AutoLayout.js', // the '.js' is optional
  skip: [
    'kiwi.js',
    'cassowary/bin/c'
  ]
}).then(function(bundle) {
  var cjs = bundle.toCjs();
  fs.writeFile('tmp/autolayout.es6', cjs.code, function(err){
    if(err) {
      console.log(err);
      process.exit(1);
    }
  });
}, function(err) {
  if(err) {
    console.log(err);
    process.exit(1);
  }
});
