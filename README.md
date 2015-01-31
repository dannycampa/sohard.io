# SoHard.io

SoHard.io is a web framework that allows you to build a web application and then compile it into standalone HTML.

## Features

The following features are included with this version:

+ jQuery
+ Modernizr
+ Bootstrap 3.3
+ Handlebars (other template engines to come at a later date)
+ Template Data for Handlebars
+ libSass
+ Compass Mixins (via libSass)
+ Font Awesome 4.3
+ SVG Icon Font generation
+ Browserify (with map generation)
+ BrowserSync
+ Google Analytics Injection
+ Google Fonts Injection
+ Optimal PageSpeed scores!

## Table of Contents

[Installation](https://github.com/dannycampa/sohard.io#installation)

[Making Your Project, So Hard](https://github.com/dannycampa/sohard.io#make-your-project-sohard)

[Project Configuration](https://github.com/dannycampa/sohard.io#project-configuration)

[Generators](https://github.com/dannycampa/sohard.io#generators)

[Coming in Next Releases](https://github.com/dannycampa/sohard.io#coming-soon)

## Installation

**With [node installed](http://nodejs.org):**
```sh
# Get the latest stable release of SoHard
$ sudo npm install sohard.io -g
```

## Make Your Project, SoHard

#### Create the app:
```sh
# Create your app
$ sohard create app
```

#### Launch the app and get working:
```sh
# cd into your new app
$ cd app

# launch the server
$ sohard launch
```

#### Compile for production

By passing production into the environment option, you will be making the following optimizations:

+ Minify CSS
+ Minify JS
+ Generate gzip for your JS files (it's up to you how you enable them)
```sh
# launch the server with production code
$ sohard launch --env production
```

## Project Configuration

You can add project specific information to inject into your HTML by adding it to a file at ./config/project.js

#### Inject Google Font stylesheets into your head
```sh
# ./config/project.js

# copy the value directly after the family parameter 
# provided by the Google Fonts link tag:
# <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
google_fonts: {
	families: [
		'Open+Sans',
		'Lobster',
		'Raleway:400,200,700'
	]
},
```

#### Inject Google Analytics scripts to your footer
```sh
# ./config/project.js

# you can add multiple scripts. Keep in mind only one 
# legacy script can be added(ga.js)
google_analytics: {
	ua_codes: [
		{
			type: 'universal', //universal or legacy
			ua_code: 'UA-XXXXXXXX-X'
		},
		{
			type: 'universal',
			ua_code: 'UA-YYYYYYYY-Y'
		},
		{
			type: 'legacy',
			ua_code: 'UA-ZZZZZZZZ-Z'
		}
	]

}
```

#### Template Data for Handlebars
```sh
# ./config/project.js
template_data: {
	title: 'Make things so hard'	
}
```

```sh
# ./src/views/partials/head.hbs
<title>{{title}}</title>
```

```sh
# ./build/index.html
<title>Make things so hard</title>
```

## Generators

Sometimes, live updating will not always work for you. This is where generators come in. 

#### Regenerate your SVG font.
```sh
# Make more font characters
$ sohard generate icons
```

#### Fetch the latest Font Awesome library
```sh
# Get the latest Font Awesome
$ sohard generate fontawesome
```

More to come...

## Coming Soon

+ Bower & Bower support for Browserify
+ Handlebars Layouts
+ Controllers for your views (to replace Tempalate Data)
+ GIT Deployments