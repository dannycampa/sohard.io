#! /usr/bin/env node

var program = require('commander');
var fs = require('fs-extra');
var path = require('path');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var prompt = require('prompt');
var replace = require('replace');
var gulp_cli = './node_modules/.bin/gulp';
var Spinner = require('cli-spinner').Spinner;
var anon_data = '';

program
	.version('0.1.7')
	
program
	.command('create [name]')
	.description('create a new sohard app')
	.action(function(name, options){
		var name = name || SoHard_App
		console.log();
		console.log();
		//console.log('Generating new front-end app "%s", so hard!', name);
		fs.exists(name + '/', function(exists){
			if(exists) {
				console.error('Error: "%s" already exists. Pick a folder that doesn\'t exists so I can make your app, so hard!', name);
			} else {
				
				console.log();
				console.log('Answer the following configuration questions:')
				console.log();
				
				prompt.start();
				
				prompt.message = 'Configuration:';
				prompt.delimiter = ' ';
				
				prompt.get({
					properties: {
						
						anon_data: {
							description: 'Will you allow me to collect anonymous data to help improve this app? (yes)'
						},
						app_name: {
							description: 'What is the name of your web app? (' + name + ')'
						},
						app_description: {
							description: 'What best describes your web app?'
						}
						
					}
				},
				function(err, results){
					if(err) return console.log(err);
					
					anon_data = results.anon_data || 'yes';
					var app_name = results.app_name || name;
					var app_description = results.app_description || 'App made from sohard.io';
					var app_repo = '{\r\n\t"name": "sohard.io-app",\r\n\t"version": "0.0.1",\r\n\t"private": true\r\n}';
					
					//Let you know what's happening
					console.log();
					console.log('===== Creating with following configuration: =====');
					console.log();
					console.log('Collect Anon? ' + anon_data);
					console.log('The App Name: ' + app_name);
					console.log('The App Description: ' + app_description);
					console.log();
					console.log('==================================================');
					console.log();
 					
					console.log('I may look unresponsive while i\'m unpacking, but I assure you, I\'m working so hard! Please be patient...');
					
					var spinner = new Spinner('Building so hard... %s');
					spinner.setSpinnerString('|/-\\');
					spinner.start();
					
					//Build it
					var dist = path.resolve(__dirname, '../dist/');
					
					setTimeout(function(){
						
						fs.copy(dist, name, '-r', function(err){
							if(err) console.log(err);
							process.chdir(path.resolve(name));
							setTimeout(function(){
								
								var npm_install = spawn('npm', ['install']);
								npm_install.stdout.on('data', function (data) {
									//var the_data = '' + data;
									//console.log(the_data);
								});
								npm_install.stderr.on('data', function (data) {
									var the_data = '' + data;
									console.log('Error unpacking: ' + the_data)
								});
								npm_install.on('close', function (code) {
									
									//Edit Package JSON
									replace({
										regex: "{{app.name}}",
										replacement: app_name,
										paths: ['package.json'],
										recursive: true,
										silent: true,
									});

									replace({
										regex: "{{app.description}}",
										replacement: app_description,
										paths: ['package.json'],
										recursive: true,
										silent: true,
									});

									replace({
										regex: "{{app.repo}}",
										replacement: app_repo,
										paths: ['package.json'],
										recursive: true,
										silent: true,
									});

									spinner.stop(true);
									console.log();
									console.log('Success! Your app "%s" is ready to go! cd into your app and run "sohard launch"', name);
									console.log();
									
								});
								
							}, 1000);
						}); 
					}, 1000);

//						var icons = spawn(gulp_cli, ['iconFont', '--silent']);
//						icons.stderr.on('data', function (data) {
//							console.log('Error generating icons: ' + data)
//						});
//						icons.on('close', function (code) {
//							console.log('SVG Icons created, so hard!');
//							var fa = spawn('npm', ['install', 'font-awesome']);
//							fa.on('close', function (code) {
//								var rollout = spawn(gulp_cli, ['fontAwesome', '--silent']);
//								rollout.on('close', function (code) {
//									console.log('Font Awesome updated to latest, so hard!');
//									clearInterval(update);
//									console.log();
//									console.log();
//									console.log('Success! Your app "%s" is ready to go! cd into your app and run "sohard launch"', name);
//									console.log();
//									return;
//								});
//							});
//						});
					
//						fs.copy(dist, name, function(err){
//						if(err) return console.error(err);
//						
//						});
					
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
				var launch = spawn(gulp_cli, ['--silent']);
				launch.stdout.on('data', function (data) {
					var the_data = '' + data;
					if(the_data.indexOf('[BS]') != -1) {
						the_data = the_data.split('[BS] ').join('');
						console.log(the_data);
					}
				});
				launch.stderr.on('data', function (data) {
					var the_data = '' + data;
					if(the_data.indexOf('EADDRINUSE') != -1) {
						console.error("[ERR0AR]: Oh snap! Looks like you're already using that port. Change your port in ./config/project.js");
					} else {
						console.error(the_data)
					}
				});
			} else {
				var launch = spawn(gulp_cli, ['production', '--silent']);
				launch.stdout.on('data', function (data) {
					var the_data = '' + data;
					if(the_data.indexOf('[BS]') != -1) {
						the_data = the_data.split('[BS] ').join('');
						console.log(the_data);
					}
				});
				launch.stderr.on('data', function (data) {
					var the_data = '' + data;
					if(the_data.indexOf('EADDRINUSE') != -1) {
						console.error("[ERR0AR]: Oh snap! Looks like you're already using that port. Change your port in ./config/project.js");
					} else {
						console.error(the_data);
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
				var icons = spawn(gulp_cli, ['iconFont', '--silent']);
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
					var rollout = spawn(gulp_cli, ['fontAwesome', '--silent']);
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