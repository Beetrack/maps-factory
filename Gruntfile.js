module.exports = function (grunt) {
    'use strict';

    var jsFiles = module.exports.jsFiles;

    var output = {
        js: '<%= pkg.name %>.js',
        jsmin: '<%= pkg.name %>.min.js',
        map: '<%= pkg.name %>.min.js.map'
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            js: {
                src: jsFiles,
                dest: output.js
            }
        },
        uglify: {
            jsmin: {
                options: {
                    mangle: true,
                    compress: {},
                    sourceMap: output.map
                },
                src: output.js,
                dest: output.jsmin
            }
        },
        jscs: {
            old: {
                src: ['spec/**/*.js'],
                options: {
                    validateIndentation: 4
                }
            },
            source: {
                src: ['src/**/*.js', '!src/{banner,footer}.js', 'Gruntfile.js', 'web/stock.js'],
                options: {
                    config: '.jscsrc'
                }
            }
        },
        jshint: {
            source: {
                src: ['src/**/*.js', 'Gruntfile.js'],
                options: {
                    jshintrc: '.jshintrc',
                    ignores: ['src/banner.js', 'src/footer.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['build', 'copy']
            },
            jasmineRunner: {
                files: ['spec/**/*.js'],
                tasks: ['jasmine:specs:build']
            },
            tests: {
                files: ['src/**/*.js', 'spec/**/*.js'],
                tasks: ['test']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // custom tasks

    // task aliases
    grunt.registerTask('build', ['concat', 'uglify']);
    grunt.registerTask('default', ['build']);
};

module.exports.jsFiles = [
    'src/utils.js',
    'src/map_box.js',
    'src/google_maps.js',
    'src/maps_factory.js'
];
