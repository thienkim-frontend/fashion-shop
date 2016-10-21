module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            views: 'source/views/',
            styles: 'source/less/',
            css: 'source/css/libs/',
            imgs: 'source/images/',
            js: 'source/js/',
            public: 'public/'
        },
        jade: {
            compile: {
                options: {
                    client: false,
                    pretty: true
                    // data: {
                    //     info: grunt.file.readJSON('source/views/data.json')
                    //     /*http://jsonlint.com/*/
                    // }
                },
                files: [{
                    cwd: "<%= meta.views %>",
                    src: "*.jade",
                    dest: "public",
                    ext: ".html",
                    expand: true
                }]
            }
        },
        // less: {
        //     development: {
        //         options: {
        //             paths: ["<%= meta.public %>css"],
        //             pretty: true
        //         },
        //         files:{
        //             "<%= meta.public %>css/style.css": "<%= meta.styles %>*.less"
        //         }
        //     }
        // },
        compass: {
            dist: {
                options: {
                    sassDir: 'source/sass',
                    cssDir: '<%= meta.public %>css',
                    environment: 'production',
                    outputStyle: 'expanded',
                    sourcemap: true,
                    force: true
                }
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.imgs %>',
                    src: '**/*.{png,gif,jpg,sgv,pdf,ico}',
                    dest: '<%= meta.public %>images',
                    filter: 'isFile',
                    flatten: false
                }, {
                    expand: true,
                    src: 'source/fonts/*',
                    dest: '<%= meta.public %>fonts',
                    flatten: true
                }]
            }
        },
        // concat:{
        //     css: {
        //         src: '<%= meta.css %>*.css',
        //         dest: 'source/css/plugin.css'
        //     },
        //     js: {
        //         src: '<%= meta.js %>**/*.js',
        //         dest: 'source/js/plugin.js'
        //       }
        // },
        uglify: {
            options: {
                compress: true,
                beautify: false,
                preserveComments: false
            },
            target: {
                files: [{
                    '<%= meta.public %>js/plugin.min.js': '<%= meta.js %>/**/*.js',
                    '<%= meta.public %>js/main.js': 'source/js/main.js'
                }]
            }
        },
        cssmin: {
            options: {
                advanced: false,
                keepBreaks: false,
                keepSpecialComments: 0
            },
            compress: {
                files: [{
                    '<%= meta.public %>css/plugin.min.css': '<%= meta.css %>*.css'
                }]
            }
        },
        watch: [{
            files: '<%= meta.views %>**/*.jade',
            tasks: ['jade']
          }, {
            files: '<%= meta.imgs %>*',
            tasks: ['copy']
          }, {
            files: '<%= meta.js %>**/*',
            tasks: ['uglify', 'copy']
          }, {
            files: 'source/fonts/*',
            tasks: ['copy']
          }, {
            files: 'source/sass/**',
            tasks: ['compass']
        }],
        'gh-pages': {
            options: {
                base: 'public',
                branch: 'gh-pages',
                repo: 'https://github.com/thienkim-frontend/fashion-shop.git'
            },
            src: '**/*'
        }
    });
    grunt.file.expand('./node_modules/grunt-*/tasks').forEach(grunt.loadTasks);
    grunt.registerTask('build', ['uglify', 'cssmin']);
    grunt.registerTask('default', ['copy', 'jade', 'compass', 'watch']);
};
