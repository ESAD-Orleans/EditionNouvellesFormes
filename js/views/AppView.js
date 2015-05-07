// EditionNouvellesFormes
// 2015
// AppView Backbone View
//
define(['underscore', 'jquery', 'backbone','models/AppModel', 'stache!app'], function (_, $, Backbone,app,template) {
	return Backbone.View.extend({
		el:'body',
		initialize:function(){
			console.log('setuo AppView');
			this.$el.html(template());
		}
	});
});