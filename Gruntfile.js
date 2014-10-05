/*
 * Generated on 2014-10-05
 * generator-assemble v0.5.0
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2014 Hariadi Hinta
 * Licensed under the MIT license.
 */

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
        files: ['<%= config.src %>/styleguide/{,*/}*.scss'],
        tasks: ['compass']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
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
          partials: 'assemble-styleguide/partials/*.hbs'
        },
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/styleguide/{,*/}*.hbs', '<%= config.src %>/scripts/{,*/}*.hbs']
        }
      }
    },

    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: '<%= config.src %>',
          cssDir: '<%= config.dist %>/assets',
          environment: 'development',
          relativeAssets: true,
          outputStyle: 'expanded'
        }
      },
      dev: {                    // Another target
        options: {
          sassDir: '<%= config.src %>/styleguide',
          cssDir: '<%= config.dist %>/assets/stylesheets',
          outputStyle: 'nested'
        }
      }
    },

    copy: {
      bootstrap: {
        expand: true,
        cwd: 'bower_components/bootstrap/dist/',
        src: '**',
        dest: '<%= config.dist %>/assets/'
      },
      theme: {
        expand: true,
        cwd: 'src/assets/',
        src: '**',
        dest: '<%= config.dist %>/assets/css/'
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dist %>/**/*.{html,xml}']

  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.registerTask('server', [
    'build',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'compass',
    'copy',
    'assemble'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
