var gulp = require('gulp');
var changed = require('gulp-changed');
var config = require('../config').markup;
var stuff = require('../config').replace;
var replace = require('gulp-replace');

var ga_code = '';
for (code in stuff.ua_codes) {
    if(stuff.ua_codes[code].type == 'universal') {
        ga_code += "<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', '" + stuff.ua_codes[code].ua_code + "', 'auto');ga('send', 'pageview');</script>";
    } else {
        ga_code += "<script type='text/javascript'>var _gaq = _gaq || [];_gaq.push(['_setAccount', '" + stuff.ua_codes[code].ua_code + "']);_gaq.push(['_trackPageview']);(function() {var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);})();</script>";
    }
}

var google_fonts = '';
for (font in stuff.google_fonts) {
    google_fonts += "<link href='http://fonts.googleapis.com/css?family=" + stuff.google_fonts[font] + "' rel='stylesheet' type='text/css'>";
}

gulp.task('replace', ['markup'], function() {
    
    return gulp.src(config.html, {base: './'})
        .pipe(replace('<!--script:ga-->', ga_code))
        .pipe(replace('<!--link:google_fonts-->', google_fonts))
        .pipe(gulp.dest('./'));
    
});