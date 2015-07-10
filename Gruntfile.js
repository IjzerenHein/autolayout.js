/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    peg: {
      parser: {
        src: 'src/parser/parser.peg',
        dest: 'src/parser/parser.js',
        options: {
          wrapper: function(src, parser) {
            return 'export default ' + parser + ';';
          }
        }
      },
      parserExt: {
        src: 'src/parser/parserExt.peg',
        dest: 'src/parser/parserExt.js',
        options: {
          wrapper: function(src, parser) {
            return 'export default ' + parser + ';';
          }
        }
      }
    },
    eslint: {
      target: ['src/*.js', 'test/*.js'],
      options: {
        config: '.eslintrc'
      }
    },
    jscs: {
        src: ['src/*.js', 'test/*.js'],
        options: {
            config: '.jscsrc'
        }
    },
    concat: {
      jsdoc2md: {
        src: ['src/View.js', 'src/SubView.js', 'src/VisualFormat.js', 'src/Attribute.js', 'src/Relation.js', 'src/Priority.js'],
        dest: 'tmp/concat.js'
      }
    },
    jsdoc2md: {
      output: {
        options: {
          'global-index-format': 'none',
          'module-index-format': 'none'
        },
        src: 'tmp/concat.js',
        dest: 'docs/AutoLayout.md'
      }
    },
    exec: {
      'bundle-es6': 'node ./bundle-es6',
      test: 'mocha',
      bench: 'node bench/main.js'
    },
    usebanner: {
      dependencies: {
        options: {
          position: 'top',
          banner: 'var kiwi = require(\'kiwi/ts/bin/kiwi\')\n'
          //banner: 'var c = require(\'cassowary/bin/c\')\n'
        },
        files: {
          src: ['dist/autolayout.js']
        }
      }
    },
    browserify: {
      dist: {
        options: {
          browserifyOptions: {
            standalone: 'AutoLayout'
          },
          banner:
            '/**\n' +
            '* This Source Code is licensed under the MIT license. If a copy of the\n' +
            '* MIT-license was not distributed with this file, You can obtain one at:\n' +
            '* http://opensource.org/licenses/mit-license.html.\n' +
            '*\n' +
            '* @author: Hein Rutjes (IjzerenHein)\n' +
            '* @license MIT\n' +
            '* @copyright Gloey Apps, 2015\n' +
            '*\n' +
            '* @library autolayout.js\n' +
            '* @version ' + grunt.file.readJSON('package.json').version + '\n' +
            '* @generated <%= grunt.template.today("dd-mm-yyyy") %>\n' +
            '*/'
        },
        files: {
          './dist/autolayout.js': ['./dist/autolayout.js']
        }
      }
    },
    uglify: {
      dist: {
        src: './dist/autolayout.js',
        dest: './dist/autolayout.min.js'
      }
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-jsdoc-to-markdown');
  grunt.loadNpmTasks('grunt-peg');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Tasks
  grunt.registerTask('lint', ['eslint', 'jscs']);
  grunt.registerTask('doc', ['concat', 'jsdoc2md']);
  grunt.registerTask('parser', ['peg']);
  grunt.registerTask('test', ['exec:test']);
  grunt.registerTask('bench', ['exec:bench']);
  grunt.registerTask('dist', ['parser', 'exec:bundle-es6', 'usebanner', 'browserify', 'uglify']);
  grunt.registerTask('default', ['lint', 'dist', 'test']);
};
