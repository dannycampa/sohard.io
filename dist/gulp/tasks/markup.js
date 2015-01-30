var gulp = require('gulp');
var changed = require('gulp-changed');
var config = require('../config').markup;
var ga = require('../config').ga;
var hbs = require('gulp-compile-handlebars');
var ext_replace = require('gulp-ext-replace');
var replace = require('gulp-replace');
var merge = require('merge-stream');
var browserSync  = require('browser-sync');

gulp.task('markup', function() {
    
    var handlebars = gulp.src(config.hbs)
        .pipe(changed(config.dest))
        .pipe(hbs(config.templateData, config.options))
        .pipe(ext_replace('.html'))
        .pipe(gulp.dest(config.dest))
        .pipe(browserSync.reload({stream:true}));
    
    return handlebars;
    
});