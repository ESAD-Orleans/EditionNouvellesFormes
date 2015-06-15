// EditionNouvellesFormes
// 2015
// AppModel Backbone Model
//
define(['underscore', 'jquery', 'backbone', 'json!../../data/config.json','json!../../data/turns.json'], function (_, $, Backbone,config,turns) {
	var app,
		AppModel =  Backbone.Model.extend({
			defaults:{
				scale:.5,
				offsetX:0,
				offsetY:0
			},
			stageWidth:function(){
				return this.get('stageWidth') / this.scale();
			},
			stageHeight:function(){
				return this.get('stageHeight') / this.scale();
			},
			scale:function(){
				return this.get('scale');
			},
			offsetX:function(x){
				if(_.isNumber(x)){
					this.set('offsetX',x);
				}
				return -this.get('offsetX')+this.stageWidth()/2;
			},
			offsetY:function(y){
				if (_.isNumber(y)) {
					this.set('offsetY', y);
				}
				return -this.get('offsetY')+this.stageHeight()/2;
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