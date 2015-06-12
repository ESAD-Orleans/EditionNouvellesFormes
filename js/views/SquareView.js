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
			//this.el = document.createElement('div');
			this.el = squares.append('g')
				.attr({
					id: model.id,
					class:classes.join(' '),
					transform:'translate('+model.left()+','+model.top()+')'
				});
			this.el.append('rect')
				.attr({
					width:model.width(),
					height:model.height(),
					fill:model.tint()
				});
			//$('#squares').append(this.$el);
			//this.$el.addClass(classes.join(' '));
			//this.$el.find('> .shape').addClass('tint-' + model.tint())

			model.set('view', this);
			var children;
			if (children = model.children()) {
				children.each(function (square) {
					new SquareView({model:square});
				});
			}
			/*
			this.$el.find('> .children > *').each(function(){
				new SquareView({el:this});
			});
			this.$el.css({
				zIndex:model.level(),
				left: model.left(),
				top: model.top()});
			this.$el.find('>.shape').css({
				width: model.width(),
				height: model.height()
			});
			interact(this.el).draggable({
				manualStart:true
			})
			*/
			model.bind('changeSize',this.changeSize,this);
		},
		toggleOpening:function(e){
			console.log(e);

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
			if(model.opened()){
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
			})

		}

	});

	return SquareView;
});