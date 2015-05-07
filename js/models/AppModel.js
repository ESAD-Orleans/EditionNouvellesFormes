// EditionNouvellesFormes
// 2015
// AppModel Backbone Model
//
define(['underscore', 'jquery', 'backbone', 'json!../../data/config.json'], function (_, $, Backbone,config) {
	var AppModel =  Backbone.Model.extend({
		initialize:function(){
			console.log('setup AppModel');
		}
	});
	return new AppModel();
});