// EditionNouvellesFormes
// 2015
// AppView Backbone View
//
define(['underscore', 'jquery', 'backbone','models/AppModel','models/SquareModel', 'stache!app','views/SquareView','d3','interact'], function (_, $, Backbone,app, SquareModel,template, SquareView, d3, interact) {
	return Backbone.View.extend({
		el:'body',
		initialize:function(){
			$(window).on('resize', $.proxy(this.resize,this));
			this.render();
		},
		resize:function(){
			app.set('stageWidth',this.$el.outerWidth());
			app.set('stageHeight',this.$el.outerHeight());
			this.svg.attr({
				viewBox: '0 0 ' + app.stageWidth() + ' ' + app.stageHeight()
			});
			this.renderStage();
		},
		renderStage:function(){
			this.g.attr({
				transform: 'translate('+app.offsetX()+','+app.offsetY()+')'
			})
		},
		render:function(){

			this.$el.html(template());
			var svg = d3.select('svg#stage'),
				g =
			svg.append('g').attr({id:'squares'});
			this.svg = svg;
			this.g = g;

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

			interact(this.el).draggable({
				inertia:true,
				// call this function on every dragmove event
				onmove: $.proxy(this.drag,this)
				// call this function on every dragend event
			});

			this.resize();

			/*g.children().sort(function(){
				console.log(i,arguments)
			});*/

		},
		drag:function(event){
			app.offsetX((app.get('offsetX')||0)-event.dx/app.scale());
			app.offsetY((app.get('offsetY')||0)-event.dy/app.scale());
			this.renderStage();
		}
	});
});