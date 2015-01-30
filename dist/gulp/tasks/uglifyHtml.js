var gulp = require('gulp');
var min = require('gulp-minify-html');
var config = require('../config').markup;

gulp.task('uglifyHtml', ['replace'], function() {
    var opts = {spare:true};
    setTimeout(function(){
        gulp.src(config.html, {base: './'})
            .pipe(min(opts))
            .pipe(gulp.dest('./'));
    }, 3000);
});