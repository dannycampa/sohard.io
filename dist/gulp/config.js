var dest = './build';
var src = './src';
var npm = './node_modules';
var project = require('../config/project');

module.exports = {
	
	browserSync: {
		server: {
			// Serve up our build folder
			baseDir: dest
		},
		port: project.server.port
	},
	
	sass: {
		src: src + '/sass/*.{sass,scss}',
		watch: src + '/sass/**',
		dest: dest + '/assets/css',
		settings: {
			indentedSyntax: true, // Enable .sass syntax!
			imagePath: 'images' // Used by the image-url helper
		}
	},
	
	images: {
		src: src + '/images/**',
		dest: dest + '/assets/images'
	},
	
	markup: {
		//src: src + '/views/*.html',
		hbs: src + '/views/*.hbs',
		partials: src + '/views/**/*.hbs',
		watch: src + '/views/**',
		html: dest + '/*.html',
		dest: dest,
		templateData: project.template_data,
		options: {
			ignorePartials: true,
			batch : ['./src/views/partials'],
			helpers : project.handlebars.helpers
		}
	},
	
	compass: {
		src: npm + '/compass-mixins/lib/**',
		dest: src + '/sass'
	},
	
	replace: {
		ua_codes: project.google_analytics.ua_codes,
		google_fonts: project.google_fonts.families
	},
	
	modernizr: {
		src: src + '/javascript/*.js',
		dest: dest + '/assets/js/vendor/'
	},
	
	iconFonts: {
		name: 'Project Icons',
		src: src + '/icons/*.svg',
		dest: dest + '/assets/fonts',
		sassDest: src + '/sass',
		template: './gulp/tasks/iconFont/template.sass.swig',
		sassOutputName: '_icons.sass',
		fontPath: '../fonts',
		className: 'icon',
		options: {
			fontName: 'font-icons',
			appendCodepoints: true,
			normalize: false
		}
	},
	
	fontAwesome: {
		fontsSrc: npm + '/font-awesome/fonts/**',
		scssSrc: npm + '/font-awesome/scss/**',
		fontsDest: dest + '/assets/fonts',
		scssDest: src + '/sass/font-awesome'
	},
	
	bootstrap: {
		jsSrc: npm + '/bootstrap-sass/assets/javascripts/bootstrap.js',
		jsDest: src + '/javascript/vendor',
		fontsSrc: npm + '/bootstrap-sass/assets/fonts/**',
		fontsDest: dest + '/assets/fonts'
	},
	
	browserify: {
		// A separate bundle will be generated for each
		// bundle config in the list below
		bundleConfigs: [
			{
				entries: src + '/javascript/app.js',
				dest: dest + '/assets/js',
				outputName: 'app.js'
			}
		]
	},
	
	production: {
		cssSrc: dest + '/assets/css/*.css',
		cssDest: dest + '/assets/css',
		jsSrc: dest + '/assets/js/*.js',
		jsDest: dest + '/assets/js'
	}
	
};
