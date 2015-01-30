var gulp    = require('gulp');
var config  = require('../config').production;
var size    = require('gulp-filesize');
var uglify = require('gulp-uglify');
var gzip = require('gulp-gzip');
var merge = require('merge-stream');

gulp.task('uglifyJs', ['browserify'], function() {
  
  var gz = gulp.src(config.jsSrc)
    .pipe(uglify())
    .pipe(gzip())
    .pipe(gulp.dest(config.jsDest))
    .pipe(size());
  
  var js = gulp.src(config.jsSrc)
    .pipe(uglify())
    .pipe(gulp.dest(config.jsDest))
    .pipe(size());
  
  return merge(gz, js);
  
});
