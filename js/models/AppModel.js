// EditionNouvellesFormes
// 2015
// AppModel Backbone Model
//
define(['underscore', 'jquery', 'backbone', 'json!../../data/config.json'], function (_, $, Backbone,config) {
	var app,
		AppModel =  Backbone.Model.extend({
			turn:function(index){
				return config.turn[index];
			},
			findSquareByIds:function(ids){
				var result = [];
				_(this.get('squares')).each(function(square){
					if(_(ids).contains(square.id)){
						_(result).push(square);
					}
				});
				return result;
			}
	});
	app = new AppModel(config);

	return app;
});