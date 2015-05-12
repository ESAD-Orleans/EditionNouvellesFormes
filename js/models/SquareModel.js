// EditionNouvellesFormes
// 2015
// NodeModel Backbone Model
//
define(['underscore', 'jquery', 'backbone', 'models/AppModel'], function (_, $, Backbone, app) {
	return Backbone.Model.extend({
		defaults:{
			color:'white'
		},
		initialize:function(){
			var model = this,
				SquareCollection = this.collection.constructor,
				children = this.get('children');
			if(model.get('parent')){
			}
			if(!_.isUndefined(children) && children.length>0){
				children = app.findSquareByIds(children);
				_(children).each(function(square,index){
					square.parent = model;
				});
				model.set('children',new SquareCollection(children));
			}
			_(model.attributes).each(function(i,k){
				// assign each value to object
				//model[k] = i;
				//console.log(k,i)
			})
		},
		index:function(){
			return this.collection ? this.collection.indexOf(this) : -1;
		}
	});
});