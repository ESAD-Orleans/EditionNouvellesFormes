// EditionNouvellesFormes
// 2015
// AppModel Backbone Model
//
define(['underscore', 'jquery', 'backbone', 'json!../../data/config.json','json!../../data/turns.json'], function (_, $, Backbone,config,turns) {
	var app,
		AppModel =  Backbone.Model.extend({
			defaults:{
				initialScale:1,
				scale:1,
				offsetX:0,
				offsetY:0
			},
			initialize:function(){
				this.scale(this.get('initialScale'));
			},
			stageWidth:function(){
				return this.get('stageWidth');
			},
			stageHeight:function(){
				return this.get('stageHeight');
			},
			scale:function(s){
				if (_.isNumber(s)) {
					this.set('scale', s);
				}
				return this.get('scale');
			},
			offsetX:function(x){
				if(_.isNumber(x)){
					this.set('offsetX',x);
				}
				return Math.round(-this.get('offsetX'));
			},
			offsetY:function(y){
				if (_.isNumber(y)) {
					this.set('offsetY', y);
				}
				return Math.round(-this.get('offsetY'));
			},
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