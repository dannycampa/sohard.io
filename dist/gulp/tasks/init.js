var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('init', function(){
	
	runSequence('iconFont', 'fontAwesome', 'bootstrap', 'modernizr', 'compass', function(){
		runSequence(['sass', 'images', 'replace'], function(){
			console.log('Front-End Dependencies generated. Run Gulp to start working!');
		});
	});
	
});