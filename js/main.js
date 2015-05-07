requirejs.config({
	baseUrl: 'js',
	paths: {
		jquery: '../bower_components/jquery/dist/jquery.min',
		underscore: '../bower_components/underscore/underscore-min',
		backbone: '../bower_components/backbone/backbone'
	}
});

// Load the main app module to start the app
requirejs(["App"]);