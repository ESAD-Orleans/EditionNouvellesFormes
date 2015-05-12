// EditionNouvellesFormes
// 2015
// AppModel Backbone Model
//
define(['underscore', 'jquery', 'backbone', 'json!../../data/config.json','json!../../data/turns.json'], function (_, $, Backbone,config,turns) {
	var app,
		AppModel =  Backbone.Model.extend({
			turn:function(index){
				return turns[index];
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