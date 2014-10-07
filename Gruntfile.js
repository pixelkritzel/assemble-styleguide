'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'dist'
    },

    watch: {
      assemble: {
        files: ['<%= config.src %>/{styleguide,scripts}/{,*/}*.{md,hbs,yml,html}'],
        tasks: ['assemble']
      },
      compass: {
        files: ['<%= config.src %>/styleguide/{,*/}*.scss', 'assemble-styleguide/stylesheets/*.scss'],
        tasks: ['compass']
      },
      neuter: {
        files: ['<%= config.src %>/scripts/{,*/}*.js', 'assemble-styleguide/scripts/*.js'],
        tasks: ['neuter']
      },
      copy: {
        files: ['styleguide/{,*/}*.*', '<%= config.src %>/data/{,*/}*', '<%= config.src %>/assets/{,*/}*'],
        tasks: ['copy']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/styleguide/*',
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/assets/{,*/}*.css',
          '<%= config.dist %>/assets/{,*/}*.js',
          '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },

    assemble: {
      pages: {
        options: {
          flatten: true,
          assets: '<%= config.dist %>/assets',
          layout: 'assemble-styleguide/layouts/default.hbs',
          data: '<%= config.src %>/data/*.{json,yml}',
          partials: 'assemble-styleguide/partials/*.hbs',
          helpers: ['assemble-styleguide/helpers/{,*/}*.js' ]
        },
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/styleguide/{,*/}*.hbs', '<%= config.src %>/scripts/{,*/}*.hbs']
        }
      }
    },

    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: '<%= config.src %>/styleguide',
          cssDir: '<%= config.dist %>/assets/stylesheets',
          environment: 'development',
          relativeAssets: true,
          outputStyle: 'expanded'
        }
      },
      styleguide: {                   // Target
        options: {              // Target options
          sassDir: 'assemble-styleguide/stylesheets',
          cssDir: '<%= config.dist %>/styleguide',
          environment: 'development',
          relativeAssets: true,
          outputStyle: 'expanded'
        }
      }
    },

    neuter: {
      application: {
        src: '<%= config.src %>/scripts/main.js',
        dest: '<%= config.dist %>/assets/scripts/main.js'
      },
      styleguide: {
        src: 'assemble-styleguide/scripts/styleguide.js',
        dest: '<%= config.dist %>/styleguide/styleguide.js'
      }
    },

    copy: {
      assets: {
        files: [{
            expand: true,
            dot: true,
            cwd: '<%= config.src %>',
            dest: '<%= config.dist %>',
            src: [
                'assets/{,*/}*',
            ]
        }]
      },
      styleguide: {
        expand: true,
        dot: true,
        cwd: 'assemble-styleguide/assets/',
        dest: '<%= config.dist %>/styleguide',
        src: '{,*/}*.*'
      },
      data: {
        expand: true,
        dot: true,
        cwd: '<%= config.src %>/data',
        dest: '<%= config.dist %>/data',
        src: '{,*/}*.*'
      }
    },
    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dist %>/**/*.{html,xml}']

  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-neuter');

  grunt.registerTask('server', [
    'build',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'compass',
    'neuter',
    'copy',
    'assemble'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
