module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    uglify: {
      my_target: {
        files: {
          'output.min.js': ['src/map_factory.js']
        }
      }
    }
  });
}
