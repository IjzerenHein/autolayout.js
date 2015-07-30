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
      'bundle-es6': 'node ./build/bundle-es6',
      'dist': 'node ./build/dist',
      'dist-fast': 'node ./build/dist --fast',
      test: 'mocha',
      bench: 'node bench/main.js'
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-jsdoc-to-markdown');
  grunt.loadNpmTasks('grunt-peg');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Tasks
  grunt.registerTask('lint', ['eslint', 'jscs']);
  grunt.registerTask('doc', ['concat', 'jsdoc2md']);
  grunt.registerTask('parser', ['peg']);
  grunt.registerTask('test', ['exec:test']);
  grunt.registerTask('bench', ['exec:bench']);
  grunt.registerTask('dist', ['parser', 'exec:bundle-es6', 'exec:dist']);
  grunt.registerTask('default', ['lint', 'doc', 'dist', 'test']);
  grunt.registerTask('fast', ['lint', 'parser', 'exec:bundle-es6', 'exec:dist-fast', 'test']);
};
