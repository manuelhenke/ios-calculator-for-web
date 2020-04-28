module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        /**
         * Get package meta data
         */
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            css: [
                'dist/*.css',
                'dist/*.css.map'
            ],
            js: [
                'dist/*.js'
            ]
        },
        sass: {
            all: {
                options: {
                    update: true,
                    style: 'expanded'
                },
                files: {
                    'dist/style.css': ['src/main.scss'],
                }
            }
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'src/**/*.js',
                'test/**/*.js'
            ]
        },
        concat: {
            all: {
                options: {
                    separator: ';\n'
                },
                src: [
                    'node_modules/jquery/dist/jquery.js',
                    'src/**/*.js',
                ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'dist/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        watch: {
            sccsChange: {
                files: [
                    'src/scss/**/*.scss'
                ],
                tasks: [
                    'clean:css',
                    'sass:all'
                ],
                options: {
                    spawn: false
                }
            },
            jsChange: {
                files: [
                    'src/**/*.js'
                ],
                tasks: [
                    'clean:js',
                    'concat:all',
                    //'uglify:verona'
                ],
                options: {
                    spawn: false
                }
            }
        }
    });


    // Clear files and folders.
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Validate js files.
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Concatenate files.
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Compile Sass to CSS.
    grunt.loadNpmTasks('grunt-contrib-sass');

    // Run tasks whenever watched files change.
    grunt.loadNpmTasks('grunt-contrib-watch');


    // Default task(s).
    grunt.registerTask('default', [
        'clean',
        'sass',
        'jshint',
        'concat',
        //'uglify',
        'watch',
    ]);

};