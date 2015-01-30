var gulp = require('gulp');
var config = require('../config').fontAwesome
var merge = require('merge-stream');

gulp.task('fontAwesome', function() {

    var fonts = gulp.src(config.fontsSrc)
        .pipe(gulp.dest(config.fontsDest));
    
    var scss = gulp.src(config.scssSrc)
        .pipe(gulp.dest(config.scssDest));
    
    
    return merge(fonts, scss);
    
});
