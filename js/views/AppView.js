// EditionNouvellesFormes
// 2015
// AppView Backbone View
//
define(['underscore', 'jquery', 'backbone','models/AppModel', 'stache!app','views/SquareView','d3','interact'], function (_, $, Backbone,app,template, SquareView, d3, interact) {
	return Backbone.View.extend({
		el:'body',
		initialize:function(){
			this.render();
		},
		render:function(){

			this.$el.html(template());
			var svg = d3.select('svg#stage');
			svg.append('g').attr({
				id:'squares',
				transform:'translate(500,500)'
			});

			app.get('squares').each(function(squareModel){
				new SquareView({model: squareModel});
			});
		}
	});
});