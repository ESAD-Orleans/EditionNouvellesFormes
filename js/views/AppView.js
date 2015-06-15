// EditionNouvellesFormes
// 2015
// AppView Backbone View
//
define(['underscore', 'jquery', 'backbone','models/AppModel','models/SquareModel', 'stache!app','views/SquareView','d3'], function (_, $, Backbone,app, SquareModel,template, SquareView, d3) {
	return Backbone.View.extend({
		el:'body',
		initialize:function(){
			this.render();
		},
		render:function(){

			this.$el.html(template());
			var svg = d3.select('svg#stage'),
				g =
			svg.append('g').attr({
				id:'squares',
				transform:'translate(500,500)'
			});

			var squares = app.get('squares');
			// firstPass
			squares.each(function(squareModel){
				new SquareView({model: squareModel});
			});

			_(
				// sort square by zIndex
				_(SquareModel.squares).sortBy(
					function(squareModel){
						return squareModel.zIndex();
					}
				)
			).each(
				// move to correct index in DOM
				function(squareModel){
					g[0][0].appendChild(squareModel.view().el)
				}
			);

			/*g.children().sort(function(){
				console.log(i,arguments)
			});*/

		}
	});
});