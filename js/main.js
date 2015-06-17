requirejs.config({
	baseUrl: 'js',
	paths: {

		text: 'vendors/requirejs-plugins/text',
		json: 'vendors/requirejs-plugins/json',
		stache: 'vendors/requirejs-mustache',

		tpl:'../templates/',
		colors: '../data/colors.json',
		turns: '../data/turns.json',

		jquery: 'vendors/jquery',
		underscore: 'vendors/underscore',
		backbone: 'vendors/backbone',
		mustache: 'vendors/mustache',
		d3: 'vendors/d3',
		interact: 'vendors/interact',
		jqueryFinger: 'vendors/jquery.finger'
	},
	stache: {
		extension: '.stache', // default = '.html'
		path: '/./../templates/' // default = ''
	}
});

// Load the main app module to start the app
requirejs(["App"]);