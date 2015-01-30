/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/

var gulp = require('gulp');
var watch = require('gulp-watch');
var config = require('../config');
var watchify = require('./browserify');

gulp.task('watch', ['watchify','browserSync'], function(callback) {
  
  watch(config.images.src, function(){
    gulp.start('images');
  });
  
  gulp.watch(config.sass.src,   ['sass']);
  gulp.watch(config.sass.watch, ['sass']);
  gulp.watch(config.markup.watch, ['replace']);
  // Watchify will watch and recompile our JS, so no need to gulp.watch it
});
