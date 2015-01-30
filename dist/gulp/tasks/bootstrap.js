var gulp = require('gulp');
var config = require('../config').bootstrap
var merge = require('merge-stream');

gulp.task('bootstrap', function() {

    var fonts = gulp.src(config.fontsSrc)
        .pipe(gulp.dest(config.fontsDest));
    
    var js = gulp.src(config.jsSrc)
        .pipe(gulp.dest(config.jsDest));
    
    
    return merge(js, fonts);
    
});
