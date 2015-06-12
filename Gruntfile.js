module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		bowercopy: {
			options: {
				// Task-specific options go here
			},
			// Javascript
			libs: {
				options: {
					destPrefix: 'js/vendors'
				},
				files: {
					'jquery.js': 'jquery/dist/jquery.min.js',
					'underscore.js': 'underscore/underscore-min.js',
					'backbone.js': 'backbone/backbone.js',
					'interact.js': 'interact/interact.min.js',
					'require.js': 'requirejs/require.js',
					'mustache.js': 'mustache.js/mustache.min.js',
					'd3.js': 'd3/d3.min.js',
					'gsap/EasePack.js': 'gsap/src/minified/easing/EasePack.min.js',
					'gsap/TweenMax.js': 'gsap/src/minified/TweenMax.min.js',
					'gsap/TweenLite.js': 'gsap/src/minified/TweenLite.min.js',
					'requirejs-mustache.js': 'requirejs-mustache/stache.js',
					'requirejs-plugins':['requirejs-plugins/lib/','requirejs-plugins/src/']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-bowercopy');

	grunt.registerTask('default', ['bowercopy']);
};