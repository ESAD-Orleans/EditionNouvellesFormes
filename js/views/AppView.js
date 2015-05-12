// EditionNouvellesFormes
// 2015
// AppView Backbone View
//
define(['underscore', 'jquery', 'backbone','models/AppModel', 'stache!app','views/SquareView'], function (_, $, Backbone,app,template, SquareView) {
	return Backbone.View.extend({
		el:'body',
		initialize:function(){
			this.render();
		},
		render:function(){
			this.$el.html(template(app.get('squares')));
			this.$el.find('#roots > div').each(function(){
				new SquareView({el:this});
			});
		}
	});
});