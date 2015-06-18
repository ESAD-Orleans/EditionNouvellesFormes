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
			app.set('stageWidth', $(window).width());
			app.set('stageHeight', $(window).height());
			console.log($(window).width(), $(window).height());
			this.svg.attr({
				width: app.stageWidth(),
				height: app.stageHeight(),
				viewBox: '0 0 ' + app.stageWidth() + ' ' + app.stageHeight()
			});
			this.renderStage();
		},
		renderStage:function(transition){
			var targetAttr = {
				transform: 'translate('+(app.stageWidth()/2+.5)+','+(app.stageHeight() / 2 +.5)+') scale('+app.scale()+') translate(' + app.offsetX() + ',' + app.offsetY() + ') '
			};
			if(transition === true){
				this.g.transition().attr(targetAttr)
			}else{
				this.g.attr(targetAttr)
			}
		},
		render:function(){

			var view = this;
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
					squareModel.bind('focus', view.focusSquare, view);
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

		},
		focusSquare:function(model){
			var squareTarget = model.opened() ? model:model.parent(),
				targetX = 0,
				targetY = 0,
				targetScale = app.get('initialScale');
			if(squareTarget){
				targetX = squareTarget.centerX();
				targetY = squareTarget.centerY();
				targetScale = app.stageHeight()*.4/squareTarget.height()
			}
			app.offsetX(targetX);
			app.offsetY(targetY);
			app.scale(targetScale);
			//
			this.renderStage(true);
		},
		drag:function(event){
			app.offsetX((app.get('offsetX')||0)-event.dx/app.scale());
			app.offsetY((app.get('offsetY')||0)-event.dy/app.scale());
			this.renderStage();
		}
	});
});