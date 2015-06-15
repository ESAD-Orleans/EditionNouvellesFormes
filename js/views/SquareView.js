// EditionNouvellesFormes
// 2015
// SquareView Backbone View
//
define(['underscore', 'jquery', 'backbone','models/SquareModel','stache!square', 'd3', 'interact'], function (_, $, Backbone, SquareModel, template, d3, interact) {
	var SquareView = Backbone.View.extend({

		events:{
			'click':'toggleOpening'
		},
		initialize:function(){
			this.render();
		},
		render:function() {
			var model = this.model,
				classes = ['square'],
				squares = d3.select('g#squares')
				;
			_(classes).push(model.get('turn'));
			_(classes).push(model.opened()?'opened':'');
			_(classes).push(model.parent()?'':'base');
			this.g = squares.append('g')
				.attr({
					id: model.id,
					class:classes.join(' '),
					transform:model.transform(),
					opacity: model.opacity(),
					//visibility:model.visibility()
				});
			this.el = this.g.node();
			this.$el = $(this.el);
			if(model.level()==0){
				console.log(model.id,model.turn(),this.el)
			}
			this.rect = this.g.append('rect')
				.attr({
					width:model.width(),
					height:model.height(),
					fill:model.tint(),
					transform: 'scale('+(model.isLeft() ? -1 : 1)+','+(model.isTop() ? -1 : 1)+')',
					stroke:'#fff'
				});
			this.g.view = this;
			model.view(this);
			var children;
			if (children = model.children()) {
				children.each(function (square) {
					//if(model.level()>1) return;
					new SquareView({model:square});
				});
			}
			model.bind('changeSize',this.changeSize,this);
		},
		toggleOpening:function(e){

			var model = this.model;
			if(!model.parent() || model.parent().opened()) {
				e.stopPropagation();
				e.preventDefault();
				model.toggleOpening();
			}
			//this.$el.toggleClass('opened');
			//this.$el.css({width: model.width(), height: model.height()});
			//this.$el.find('> .children > .square').css({width: model.width()/2, height: model.height()/2})
		},
		changeSize:function(){
			var model = this.model;
			this.rect.transition().attr({
				width: model.width(),
				height: model.height()
			});
			this.g.transition().attr({
				transform: model.transform(),
				//visibility:model.visibility(),
				opacity:model.opacity()
			});
			console.log(model.id,model.width());
			/*if(model.opened()){
				this.$el.addClass('opened');
			}else{
				this.$el.removeClass('opened');
			}
			if(model.parent() && model.parent().opened()){
				this.$el.addClass('parentOpened');
			}else{
				this.$el.removeClass('parentOpened');
			}
			this.$el.css({left:model.left(),top:model.top()});
			this.$el.find('>.shape').css({
				width: model.width(), height: model.height()
			})*/

		}

	});

	return SquareView;
});