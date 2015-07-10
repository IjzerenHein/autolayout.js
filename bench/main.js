/*global module:false*/
/*eslint strict:false, quotes: [2, "single"] */

var assert = (typeof window === 'undefined') ? require('assert') : window.chai.assert;
var _ = (typeof window === 'undefined') ? require('lodash') : window._;
var Platform = (typeof window === 'undefined') ? require('platform') : window.Platform;
var Benchmark = (typeof window === 'undefined') ? require('benchmark') : window.Benchmark;
var AutoLayout = (typeof window === 'undefined') ? require('../dist/autolayout') : window.AutoLayout;

var logElement;
function log(message) {
    console.log(message);
    if (typeof document !== 'undefined') {
        logElement = logElement || document.getElementById('log')
        logElement.innerHTML += (message + '\n');
    }
}

var vfl = '' +
    '// Main circle\n' +
    '|~[main_circle(<=200,<=40%,main_circle.height)]~|\n' +
    'V:|~[main_circle(<=60%)]~|\n' +
    '\n' +
    '// Text above\n' +
    '|~[text(<=50%)]~|\n' +
    'V:|~[text(10%)]~[main_circle]\n' +
    '\n' +
    '// Enforce aspect ratio on all circles\n' +
    '[circle1(circle1.height,circle2,circle3,circle4,circle5,circle6,circle7,circle8,circle9,circle10)]\n' +
    'V:[circle1(<=30%,circle2,circle3,circle4,circle5,circle6,circle7,circle8,circle9,circle10)]\n' +
    '\n' +
    '// Align\n' +
    '|[toprow1:~(>=2%)~[circle1]~[circle2]~][main_circle][toprow2:~(2%)~[circle3]~[circle4]~]|\n' +
    '|[botrow1:~(>=2%)~[circle5]~[circle6]~[circle7]~][main_circle][botrow2:~(2%)~[circle8]~[circle9]~[circle10]~]|\n' +
    'V:|~(>=2%)~[toprow1]~[botrow1]~|\n' +
    'V:|~(>=2%)~[toprow2]~[botrow2]~|';

var constraints;
function parseVFL() {
    constraints = AutoLayout.VisualFormat.parse(vfl, {extended: true});
}
parseVFL();

var view;
function createView() {
    view = new AutoLayout.View();
    view.addConstraints(constraints);
}
createView();

function solveView() {
    view.setSize(400, 600);
    view.setSize(200, 100);
}

function runBench(name, benchmarks, callback) {
    log('----- Running ' + name + ' benchmark...');
    var suite = new Benchmark.Suite();
    for (var i = 0; i < benchmarks.length; i++) {
        suite.add(benchmarks[i].name, benchmarks[i].fn);
    }
    suite.on('cycle', function(event) {
      log(String(event.target));
    }).on('complete', function() {
        var fastest = this.filter('fastest')[0];
        var slowest = this.filter('slowest')[0];
        log('Fastest is ' + fastest.name + ' (± ' + Math.round(fastest.hz / slowest.hz * 100)/100 + 'x faster)');
        if (callback) callback();
    }).run({ 'async': true });
}

runBench('AutoLayout.js', [
    {name: 'parse', fn: parseVFL},
    {name: 'create', fn: createView},
    {name: 'solve', fn: solveView}]
);
