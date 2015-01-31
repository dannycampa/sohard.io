#! /usr/bin/env node

var program = require('commander');
var fs = require('fs-extra');
var path = require('path');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

program
	.version('0.0.2')
	
program
	.command('create [name]')
	.description('create a new sohard app')
	.action(function(name, options){
		var name = name || SoHard_App
		console.log();
		console.log();
		console.log('Generating new front-end app "%s", so hard!', name);
		fs.exists(name + '/', function(exists){
			if(exists) {
				console.error('Error: "%s" already exists. Pick a folder that doesn\'t exists so I can make your app, so hard!', name);
			} else {
				var dist = path.resolve(__dirname, '../dist');
				fs.copy(dist, name, function(err){
					if(err) return console.error(err);
					console.log();
					console.log();
					console.log('Directory created... Building your app. Buckle up, I\'m building this shit out of it. I\'ll update you every 10 seconds');
					var update = setInterval(function(){
						console.log('I\'m still building, bruh!');
					},10000);
					console.log();
					console.log();
					console.log();
					process.chdir(path.resolve(name));
					setTimeout(function(){
						var npm_install = spawn('npm', ['install']);
						npm_install.stdout.on('data', function (data) {
							var the_data = '' + data;
							console.log(the_data);
						});
						npm_install.on('close', function (code) {
							var icons = spawn('gulp', ['iconFont', '--silent']);
							icons.stderr.on('data', function (data) {
								console.log('Error generating icons: ' + data)
							});
							icons.on('close', function (code) {
								console.log('SVG Icons created, so hard!');
								var fa = spawn('npm', ['install', 'font-awesome']);
								fa.on('close', function (code) {
									var rollout = spawn('gulp', ['fontAwesome', '--silent']);
									rollout.on('close', function (code) {
										console.log('Font Awesome updated to latest, so hard!');
										clearInterval(update);
										console.log();
										console.log();
										console.log('Success! Your app "%s" is ready to go! cd into your app and run "sohard launch"', name);
										console.log();
										return;
									});
								});
							});
						});
						
					}, 200);
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
				var launch = spawn('gulp', ['--silent']);
				launch.stdout.on('data', function (data) {
					var the_data = '' + data;
					if(the_data.indexOf('[BS]') != -1) {
						the_data = the_data.split('[BS] ').join('');
						console.log(the_data);
					}
				});
			} else {
				var launch = spawn('gulp', ['production', '--silent']);
				launch.stdout.on('data', function (data) {
					var the_data = '' + data;
					if(the_data.indexOf('[BS]') != -1) {
						the_data = the_data.split('[BS] ').join('');
						console.log(the_data);
					}
				});
			}
		}, 200);
	});

program
	.command('generate [generator]')
	.description('Generate various things with utilities made for you so hard!')
	.action(function(generator, options){
		process.chdir(path.resolve());
		switch(generator) {
			case 'icons':
				console.log('Generating, so hard!');
				var icons = spawn('gulp', ['iconFont', '--silent']);
				icons.stderr.on('data', function (data) {
					console.log('Error generating icons: ' + data)
				});
				icons.on('close', function (code) {
					console.log('SVG Icons created, so hard!');
				});
				break;
			case 'fontawesome':
				console.log('Generating, so hard!');
				var fa = spawn('npm', ['install', 'font-awesome']);
				fa.on('close', function (code) {
					var rollout = spawn('gulp', ['fontAwesome', '--silent']);
					rollout.on('close', function (code) {
						console.log('Font Awesome updated to latest, so hard!');
					});
				});
				break;
			default:
				console.log('Error: Unknown Generator!');
				process.exit();
		}
		
	});

program.parse(process.argv);