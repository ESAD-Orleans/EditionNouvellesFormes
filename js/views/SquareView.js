// EditionNouvellesFormes
// 2015
// SquareView Backbone View
//
define(['underscore', 'jquery', 'backbone','models/SquareModel','stache!square'], function (_, $, Backbone, SquareModel, template) {
	return Backbone.View.extend({

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
			_(classes).push('tint-'+model.get('color'));
			this.$el.addClass(classes.join(' '));
			this.$el.html(template(model));
		},
		toggleOpening:function(){
			this.$el.toggleClass('opened');
		}


	});
});