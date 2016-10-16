var fs = require('fs');
var path = require('path');
var browserify = require('browserify');
var babelify = require('babelify');
var envify = require('envify/custom');
var CombinedStream = require('combined-stream');
var argv = require('minimist')(process.argv.slice(2));

var packageJSON = JSON.parse(fs.readFileSync('./package.json'));

var banner = '' +
'/**\n' +
'* AutoLayout.js is licensed under the MIT license. If a copy of the\n' +
'* MIT-license was not distributed with this file, You can obtain one at:\n' +
'* http://opensource.org/licenses/mit-license.html.\n' +
'*\n' +
'* @author: Hein Rutjes (IjzerenHein)\n' +
'* @license MIT\n' +
'* @copyright Gloey Apps, 2016\n' +
'*\n' +
'* @library autolayout.js\n' +
'* @version ' + packageJSON.version + '\n' +
'*/\n';
var cassowaryBanner = '' +
'/**\n' +
'* Parts Copyright (C) 2011-2012, Alex Russell (slightlyoff@chromium.org)\n' +
'* Parts Copyright (C) Copyright (C) 1998-2000 Greg J. Badros\n' +
'*\n' +
'* Use of this source code is governed by the LGPL, which can be found in the\n' +
'* COPYING.LGPL file.\n' +
'*/\n';
var kiwiBanner = '' +
'/*-----------------------------------------------------------------------------\n' +
'| Kiwi (TypeScript version)\n' +
'|\n' +
'| Copyright (c) 2014, Nucleic Development Team & H. Rutjes.\n' +
'|\n' +
'| Distributed under the terms of the Modified BSD License.\n' +
'|\n' +
'| The full license is in the file COPYING.txt, distributed with this software.\n' +
'|----------------------------------------------------------------------------*/\n';

function dist(kiwi, minify) {
    var input = CombinedStream.create();
    input.append(!kiwi ? 'var c = require(\'cassowary/bin/c\')\n' : 'var kiwi = require(\'kiwi.js\')\n');
    input.append(fs.createReadStream('./tmp/autolayout.es6'));
    var output = fs.createWriteStream('dist/autolayout' + (kiwi ? '.kiwi' : '') + (minify ? '.min' : '') + '.js');
    output.write(banner);
    output.write(kiwi ? kiwiBanner : cassowaryBanner);
    var b = browserify(input, {
        debug: minify,
        standalone: 'AutoLayout',
        banner: banner
    });
    b.transform(babelify.configure({
        compact: false,
        ignore: /\/kiwi\//
    }));
    b.transform(envify({
        CASSOWARYJS: !kiwi
    }));
    if (minify) {
        b.plugin('minifyify', {
            map: 'autolayout.min.map',
            output: 'dist/autolayout.min.map',
            compressPath: function(p) {
                if (p.indexOf('kiwi') >= 0) {
                    return path.relative('node_modules/kiwi.js/lib', p);
                }
                else {
                    return path.relative('tmp', p);
                }
            }
        });
    }
    b.bundle().on('error', function(err) {
        console.log('Error : ' + err.message);
    }).pipe(output);
}
dist(false, false);
if (!argv.fast) {
    dist(false, true);
    dist(true, false);
}
//dist(true, true);
