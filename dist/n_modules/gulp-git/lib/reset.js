'use strict';

var gutil = require('gulp-util');
var exec = require('child_process').exec;
var escape = require('any-shell-escape');

module.exports = function (commit, opt, cb) {
  if (!cb && typeof opt === 'function') {
    // optional options
    cb = opt;
    opt = {};
  }
  if (!opt) opt = {};
  if (!opt.cwd) opt.cwd = process.cwd();
  if (!opt.args) opt.args = ' ';
  if (!commit) commit = ' ';

  var cmd = 'git reset ' + opt.args + ' ' + escape([commit]);
  return exec(cmd, {cwd: opt.cwd}, function(err, stdout, stderr){
    if (err) return cb(err);
    if (!opt.quiet) gutil.log(stdout, stderr);
    cb();
  });

};
