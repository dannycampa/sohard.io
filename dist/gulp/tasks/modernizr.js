var gulp = require('gulp');
var config = require('../config').modernizr
var modernizr = require('gulp-modernizr');
var uglify = require('gulp-uglify');
 
gulp.task('modernizr', function() {
  gulp.src(config.src)
    .pipe(modernizr())
    .pipe(uglify())
    .pipe(gulp.dest(config.dest))
});