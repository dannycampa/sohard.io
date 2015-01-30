var gulp = require('gulp');
var config = require('../config').compass

gulp.task('compass', function() {
    
    return gulp.src(config.src)
        .pipe(gulp.dest(config.dest));
    
});
