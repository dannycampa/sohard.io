#! /usr/bin/env node

var program = require('commander');
var fs = require('fs-extra');
var path = require('path');
var exec = require('child-exec');

program
	.version('0.0.2')
	
program
	.command('create [name]')
	.description('create a new sohard app')
	.action(function(name, options){
		var name = name || SoHard_App
		console.log('Generating new front-end app "%s", so hard!', name);
		fs.exists(name + '/', function(exists){
			if(exists) {
				console.error('Error: "%s" already exists. Pick a folder that doesn\'t exists so I can make your app, so hard!', name);
			} else {
				var dist = path.resolve(__dirname, '../dist');
				fs.copy(dist, name, function(err){
					if(err) return console.error(err);
					console.log('Created "$s", so hard! Run the shit out of "sohard launch" to start working.');
				});
			}
		});
	});

program
	.command('launch')
	.description('launch virtual environment at http://localhost:3000')
	.option('-e, --env [environment]', 'Specify what to build for: "dev", "production". Default: "dev"')
	.action(function(options){
		var env = options.env || 'dev';
		
		console.log();
		console.log();
		console.log();
	    console.log("    @@@@@@@@@@");
		console.log("    @@@    @@@");
		console.log("    @@@@@@@@@@");
		console.log("     @@@@@@@@	   Launching So HARD@!");
		console.log("      @@@@@@");
		console.log("       @@@         Environment: " + env);
		console.log("       @@");
		console.log("       @");
		console.log();
		console.log();
		process.chdir(path.resolve());
		
		setTimeout(function(){
			if(env == 'dev') {
				exec('gulp --silent');	
			} else {
				exec('gulp production --silent');
			}
		}, 200);
	});

program

program.parse(process.argv);