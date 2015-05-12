// EditionNouvellesFormes
// 2015
// App RequireJS Module
//
define(['underscore','views/AppView','models/AppModel','models/SquareCollection'], function (_,AppView, app, SquareCollection) {

	// build Square Collection from parents
	var parents = app.findSquareByIds(app.get('parents'));
	_(parents).each(function(square,index){
		square.turn = app.turn(index);
	});
	app.set('squares',new SquareCollection(parents));
	// display things
	new AppView();

});