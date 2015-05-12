// EditionNouvellesFormes
// 2015
// NodeModel Backbone Model
//
define(['underscore', 'jquery', 'backbone', 'models/AppModel'], function (_, $, Backbone, app) {

	var squares = [];

	var SquareModel = Backbone.Model.extend({
		defaults:{
			color:'white'
		},
		initialize:function(){
			var model = this,
				SquareCollection = this.collection.constructor,
				children = this.get('children');

			if(!_.isUndefined(children) && children.length>0){
				children = app.findSquareByIds(children);
				_(children).each(function(square,index){
					square.parent = model;
				});
				model.set('children',new SquareCollection(children));
			}
			_(squares).push(model);
		},
		index:function(){
			return this.collection ? this.collection.indexOf(this) : -1;
		},
		children:function(){
			return this.get('children');
		}
	});

	// static methods & properties
	SquareModel.squares = squares;
	SquareModel.getById = function(id){
		return _(SquareModel.squares).find(function(square){return square.get('id')==id;});
	};

	return SquareModel;

});