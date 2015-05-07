requirejs.config({
	baseUrl: 'js',
	paths: {

		text: '../bower_components/requirejs-plugins/lib/text',
		json: '../bower_components/requirejs-plugins/src/json',
		stache: '../bower_components/requirejs-mustache/stache',

		tpl:'../templates/',

		jquery: '../bower_components/jquery/dist/jquery.min',
		underscore: '../bower_components/underscore/underscore-min',
		backbone: '../bower_components/backbone/backbone',
		mustache: '../bower_components/mustache.js/mustache.min'
	},
	stache: {
		extension: '.stache', // default = '.html'
		path: '/./../templates/' // default = ''
	}
});

// Load the main app module to start the app
requirejs(["App"]);