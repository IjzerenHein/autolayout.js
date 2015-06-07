/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    peg: {
      parser: {
        src: 'src/parser/parser.peg',
        dest: 'src/parser/parser.js'
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
    jsdoc2md: {
      separateOutputFilePerInput: {
        options: {
          index: true
        },
        files: [
            { src: 'src/AutoLayout.js', dest: 'docs/AutoLayout.md' },
            { src: 'src/Attribute.js', dest: 'docs/Attribute.md' },
            { src: 'src/Relation.js', dest: 'docs/Relation.md' },
            { src: 'src/VisualFormat.js', dest: 'docs/VisualFormat.md' },
            { src: 'src/View.js', dest: 'docs/View.md' },
            { src: 'src/SubView.js', dest: 'docs/SubView.md' }
        ]
      }
    },
    exec: {
      test: 'mocha --compilers js:mocha-traceur'
    },
    browserify: {
      dist: {
        options: {
          browserifyOptions: {
            standalone: 'AutoLayout'
          }
        },
        files: {
          './dist/autolayout.js': ['./src/AutoLayout.js']
        }
      }
    },
    uglify: {
      dist: {
        src: './dist/autolayout.js',
        dest: './dist/autolayout.min.js'
      }
    },
    usebanner: {
      dist: {
        options: {
          position: 'top',
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
          src: ['dist/*.js']
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-jsdoc-to-markdown');
  grunt.loadNpmTasks('grunt-peg');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-browserify');

  // Tasks
  grunt.registerTask('lint', ['eslint', 'jscs']);
  grunt.registerTask('doc', ['jsdoc2md']);
  grunt.registerTask('parser', ['peg']);
  grunt.registerTask('test', ['exec:test']);
  grunt.registerTask('dist', ['parser', 'browserify', 'uglify', 'usebanner']);
  //grunt.registerTask('develop', ['watch:source']); // Develop: Watches source files. Trigger lint & build upon change.
  grunt.registerTask('default', ['parser', 'lint', 'dist', 'test']);
};
