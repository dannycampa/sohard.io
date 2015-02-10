module.exports = {
	
	google_analytics: {
		ua_codes: [
			//NOTE: Only one legacy instance can be used!
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
		
	},
	
	google_fonts: {
		families: [
			'Lobster',
			'Raleway:400,200,700'
		]
	},
	
	handlebars: {
		layout: 'layouts/layout.hbs', //soon
		helpers: {
			
			toUpper : function(str){
				return str.toUpperCase();
			}
			
		}
	},
	
	markup: {
		template_engine: 'hbs' //only .hbs available right now
	},
	
	server: {
		port: 3000
	},
	
	template_data: {
		title: 'Make things so hard'	
	}
	
}