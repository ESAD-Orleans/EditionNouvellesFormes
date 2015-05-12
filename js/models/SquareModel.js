// EditionNouvellesFormes
// 2015
// NodeModel Backbone Model
//
define(['underscore', 'jquery', 'backbone', 'mustache', 'models/AppModel', 'json!../../data/turns.json'], function (_, $, Backbone, mustache, app, turns) {

	var squares = [];

	var SquareModel = Backbone.Model.extend({
		defaults:{
			color:'white',
			baseSize:133,
			size:199,
			ratio:1,
			opened:false
		},
		initialize:function(){
			var model = this,
				SquareCollection = this.collection.constructor,
				children = this.get('children'),
				parent = model.get('parent');

			if(parent){
				this.set('baseSize',parent.get('size')/2);
				if(_.isUndefined(this.get('tint'))){
					model.set('tint',parent.tint());
				}
			}else{
				this.set('root',model);
			}

			if(!_.isUndefined(children) && children.length>0){
				children = app.findSquareByIds(children);
				_(children).each(function(square,index){
					square.parent = model;
					square.root = model.root();
					// convert parent turn to child turn
					square.turn = turns[index+(((model.turnIndex()+2)%4)<=index?1:0)];
				});
				model.set('children',new SquareCollection(children));
			}
			_(squares).push(model);
			this.bind('change:opened',this.changeOpening,this);
		},
		root:function(){
			return this.get('root');
		},
		tint:function(){
			return this.get('tint');
		},
		turn:function(){
			return this.get('turn');
		},
		turnIndex : function(){
			return _(turns).indexOf(this.turn());
		},
		index:function(){
			return this.collection ? this.collection.indexOf(this) : -1;
		},
		renderChildren:function(){
			var model = this;
			return function(template,subRenderer){
				var r = "";
				var children = model.get('children');
				if(children){
					children.each(function(child){
						r+= mustache.render(template,{
							id:child.get('id')
						});
					})
				}
				return r;
			};
		},
		parent:function(){
			return this.get('parent');
		},
		parentOpened:function(){
			return _.isUndefined(this.parent()) ||  this.parent().opened();
		},
		toggleOpening:function(){
			this.set('opened', !this.get('opened'))
		},
		changeOpening:function(m,opening){
			console.log('changeOpening %s', m.get('id'),opening);
			var children = this.get('children');
			if(!opening && children){
				children.each(function(square){
					square.close();
					square.trigger('changeSize');
				});
			}
			this.trigger('changeSize');
			if(opening && children){
				children.each(function (square) {
					square.trigger('changeSize');
				});
			}
		},
		close:function(){
			this.set('opened', false);
		},
		opened:function(){
			return this.get('opened');
		},
		ratio:function(){
			return this.get('ratio');
		},
		size:function(){
			return this.get('size');
		},
		currentSize:function(){
			return this.parentOpened() ? this.opened() ? this.get('size') : this.get('baseSize') : Math.ceil(this.parent().currentSize()/2);
		},
		width:function(){
			return this.currentSize();
		},
		height: function () {
			return this.currentSize() * this.ratio();
		}
	});

	// static methods & properties
	SquareModel.squares = squares;
	SquareModel.getById = function(id){
		return _(SquareModel.squares).find(function(square){return square.get('id')==id;});
	};

	return SquareModel;

});