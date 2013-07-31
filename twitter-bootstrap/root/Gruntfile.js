module.exports = function(grunt) {

  // Plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Tasks
  grunt.registerTask('default', 'watch');
  grunt.registerTask('build', 'uglify:production');

  // The order matters!
  var jsFiles = [
    '{%= pathToBower %}/jquery/jquery.js',
    '{%= pathToBower %}/bootstrap-css/js/bootstrap.js',
    'src/js/*.js',
    'src/js/**/*.js'
  ];

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %>*/\n',

    concat: {
      dev: {
        options: {
          stripBanners: true,
          separator: ';'
        },
        src: jsFiles,
        dest: 'public/<%= pkg.name %>.js'
      }
    },

    uglify: {
      production: {
        options: {
          report: 'min',
          banner: '<%= banner %>'
        },
        files: {
          'public/<%= pkg.name %>.min.js': jsFiles
        }
      }
    },

    // Just using IDE linting for now
    // jshint: {
    //   all: ['src/js/*.js'],

    //   options: {
    //     "browser": true,
    //     "curly": true,
    //     "eqeq": true,
    //     "evil": true,
    //     "indent": 2,
    //     "immed": true,
    //     "noarg": true,
    //     "onevar": true,
    //     "quotmark": true,
    //     "regexdash": true,
    //     "sub": true,
    //     "trailing": true,
    //     "undef": true,
    //     "unused": true,
    //     "wsh": true
    //   }
    // },

    watch: {
      // files: '<config:jshint.all>',
      // tasks: 'concat'

      javascriptDev: {
        files: ['src/js/**/*.js'],
        tasks: ['concat:dev'],
        options: {
          livereload: false
        }
      },

      test: {
        files: ['test/**/*.js'],
        tasks: ['qunit']
      }
    }
  });

};