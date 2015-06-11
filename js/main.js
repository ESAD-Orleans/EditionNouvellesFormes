requirejs.config({
	baseUrl: 'js',
	paths: {

		text: 'vendors/requirejs-plugins/text',
		json: 'vendors/requirejs-plugins/json',
		stache: 'vendors/requirejs-mustache',

		tpl:'../templates/',

		jquery: 'vendors/jquery',
		underscore: 'vendors/underscore',
		backbone: 'vendors/backbone',
		mustache: 'vendors/mustache',
		Snap: 'vendors/Snap.svg',
		interact: 'vendors/interact'
	},
	stache: {
		extension: '.stache', // default = '.html'
		path: '/./../templates/' // default = ''
	}
});

// Load the main app module to start the app
requirejs(["App"]);