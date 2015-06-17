// EditionNouvellesFormes
// 2015
// SquareView Backbone View
//
define(['underscore', 'jquery', 'backbone','models/SquareModel','stache!square', 'd3', 'interact','jqueryFinger'], function (_, $, Backbone, SquareModel, template, d3, interact) {
	var SquareView = Backbone.View.extend({

		events:{
			'tap':'touch'
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
					visibility:model.visibility()
				});
			this.el = this.g.node();
			this.$el = $(this.el);
			this.rect = this.g.append('rect')
				.attr({
					width:model.width(),
					height:model.height(),
					fill:model.tint(),
					transform: 'scale('+(model.isLeft() ? -1 : 1)+','+(model.isTop() ? -1 : 1)+')',
					stroke:'#fff',
					'vector-effect':'non-scaling-stroke'
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
		touch:function(e){
			this.toggleOpening(e);
			this.model.trigger('focus', this.model);
		},
		toggleOpening:function(e){
			var model = this.model;
			if(!model.parent() || model.parent().opened()) {
				e.stopPropagation();
				e.preventDefault();
				model.toggleOpening();
			}
		},
		changeSize:function(){
			var model = this.model;
			this.rect.transition().attr({
				width: model.width(),
				height: model.height()
			});
			this.g.transition().attr({
				transform: model.transform(),
				visibility:'visible',
				opacity:model.opacity()
			}).each('end',function(){
				d3.select(this).attr({
					visibility:model.visibility()
				})
			});
		}

	});

	return SquareView;
});