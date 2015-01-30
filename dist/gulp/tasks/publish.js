//var gulp = require('gulp');
//var util = require('gulp-util');
//var git = require('gulp-git');
//var config = require('../config').repository;
//
//var env = util.env.env;
//var remote = config[env].remote;
//var branch = config[env].branch;
//var dir = config[env].dir;
//
//gulp.task('add', function(){
//	return gulp.src(dir)
//		.pipe(git.add());
//});
//
//gulp.task('commit', ['add'], function(){
//	return gulp.src(dir)
//		.pipe(git.commit(util.env.m));
//});
//
//gulp.task('publish', ['add', 'commit'], function(){
//	return gulp.src(dir)
//		.pipe(git.push(remote, branch, function(err){
//			if (err) throw err;
//		}));
//});