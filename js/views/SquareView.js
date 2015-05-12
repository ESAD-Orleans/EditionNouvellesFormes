// EditionNouvellesFormes
// 2015
// SquareView Backbone View
//
define(['underscore', 'jquery', 'backbone','models/SquareModel','stache!square'], function (_, $, Backbone, SquareModel, template) {
	var SquareView = Backbone.View.extend({

		events:{
			'click':'toggleOpening'
		},
		initialize:function(){
			this.model = SquareModel.getById(this.$el.attr('id').slice(7));
			this.render();
		},
		render:function(){
			var model = this.model,
				classes = ['square'];
			_(classes).push(model.get('turn'));
			_(classes).push('tint-'+model.tint());
			this.$el.addClass(classes.join(' '));
			this.$el.html(template(model));
			this.$el.find('> .children > *').each(function(){
				new SquareView({el:this});
			});
			this.$el.css({width:model.width(),height:model.height(),zIndex:model.get('zIndex')});
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
			console.log('changeSize',this.model.get('id'));
			var model = this.model;
			if(model.opened()){
				this.$el.addClass('opened');
			}else{
				this.$el.removeClass('opened');
			}
			this.$el.css({width: model.width(), height: model.height()});

		}

	});

	return SquareView;
});