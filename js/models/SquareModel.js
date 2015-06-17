// EditionNouvellesFormes
// 2015
// NodeModel Backbone Model
//
define(['underscore', 'jquery', 'backbone', 'mustache', 'models/AppModel', 'json!turns', 'json!colors'], function (_, $, Backbone, mustache, app, turns, colors) {

	var squares = _([]);

	var SquareModel = Backbone.Model.extend({
		defaults:{
			color:'white',
			baseSize:144,
			openedScale:3,
			ratio:1,
			opened:false
		},
		initialize:function(){
			var model = this,
				SquareCollection = this.collection.constructor,
				children = this.get('children'),
				parent = model.get('parent');
			//
			//console.log('initialize %s',this.id,squares.size());
			squares.push(this);

			if(parent){
				this.set('size',parent.openedScale()*parent.size()/2);
				if(_.isUndefined(this.get('tint'))){
					model.set('tint',parent.get('tint'));
				}
				if(_.isUndefined(this.get('zIndex'))){
					model.set('zIndex',parent.get('zIndex')+1);
				}
			}else{
				this.set({
					size:model.get('baseSize'),
					root:model,
					zIndex:0
				});
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
			this.bind('change:opened',this.changeOpening,this);
			this.bind('changeSize',this.changeSize,this);
		},
		children:function(){
			return this.get('children');
		},
		root:function(){
			return this.get('root');
		},
		tint:function(){
			return colors[this.get('tint')];
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
		level:function(){
			var l= 0, parent = this.parent();
			while(!_.isUndefined(parent)){
				l++;
				parent = parent.parent();
			}
			return l;
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
			var children = this.get('children');
			if(!opening && children){
				children.each(function(square){
					square.close();
					square.trigger('changeSize');
				});
			}
			this.trigger('changeSize');
		},
		changeSize:function(){
			var children = this.get('children');
			if (children) {
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
		visibility:function(){
			return this.level() == 0 || this.parent().opened()?'visible':'hidden';
		},
		opacity:function(){
			return this.level() == 0 || this.parent().opened() ? 1 : 0;
		},
		ratio:function(){
			return this.get('ratio');
		},
		openedScale:function(){
			return this.get('openedScale');
		},
		size:function(){
			return this.get('size');
		},
		currentSize:function(){
			return this.parentOpened() ? this.opened() ? this.size() * this.openedScale() : this.size() : Math.ceil(this.parent().currentSize() / 2);
		},
		currentScale:function(){
			return this.opened() ? this.openedScale() : 1;
		},
		currentScaleTransform:function(){
			return 'scale(' +this.currentScale()+')';
		},
		width:function(){
			return this.currentSize();
		},
		isLeft:function(){
			return this.turn().match('L');
		},
		isTop:function(){
			return this.turn().match('T');
		},
		height: function () {
			return this.currentSize() * this.ratio();
		},
		left: function(){
			var p = this.parent();
			if (!p) return 0;
			//var
			return this.parent().centerX();//+this.parent().directionLeft(this.parent().width()/2);
		},
		top: function(){
			var p = this.parent();
			if(!p) return 0;
			return this.parent().centerY();//+this.parent().directionTop(this.parent().height()/2);
		},
		transform: function(){
			return 'translate(' + this.left() + ',' + this.top() + ')';
		},
		directionLeft:function(size){
			return (this.isLeft()? -size:size);
		},
		directionTop:function(size){
			return (this.isTop()? -size:size);
		},
		centerX:function(){
			return this.left()+this.directionLeft(this.width()/2);
		},
		centerY:function(){
			return this.top()+this.directionTop(this.height()/2);
		},
		zIndex:function(){
			return this.get('zIndex');
		},
		view:function(view){
			if(!_.isUndefined(view)){this.set('view',view)}
			return this.get('view');
		}
	});

	// static methods & properties
	SquareModel.squares = squares;
	SquareModel.getById = function(id){
		return _(SquareModel.squares).find(function(square){return square.get('id')==id;});
	};

	return SquareModel;

});