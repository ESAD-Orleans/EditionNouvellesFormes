// EditionNouvellesFormes
// 2015
// AppView Backbone View
//
define(['underscore', 'jquery', 'backbone','models/AppModel', 'stache!app','views/SquareView','interact'], function (_, $, Backbone,app,template, SquareView,interact) {
	return Backbone.View.extend({
		el:'body',
		initialize:function(){
			this.render();
		},
		render:function(){
			this.$el.html(template());
			var stage = this.$el.find('.stage').get(0),
				stageInteract = interact(this.el);
			stageInteract.draggable({
				inertia: false,
				// call this function on every dragmove event
				onstart:function(event){
					console.log(event);
				},
				onmove: function(event) {
					var target = event.target,
					// keep the dragged position in the data-x/data-y attributes
						x = (parseFloat(stage.getAttribute('data-x')) || 0) + event.dx,
						y = (parseFloat(stage.getAttribute('data-y')) || 0) + event.dy;

					// translate the element
					stage.style.webkitTransform =
						stage.style.transform =
							'translate(' + x + 'px, ' + y + 'px)';

					// update the posiion attributes
					stage.setAttribute('data-x', x);
					stage.setAttribute('data-y', y);
				},
				onend: function(event){
					event.stopImmediatePropagation();
					event.stopPropagation();
					event.preventDefault();
					//console.log(event);
				}
			});
			app.set('scale', 1);
			var resetTimeout,
				scale;
			stageInteract.gesturable({
				onstart: function (event) {
					clearTimeout(resetTimeout);
				},
				onmove: function (event) {
					scale = app.get('scale', 1);
					app.set('scale',scale = scale * (1 + event.ds));

					stage.style.webkitTransform = stage.style.transform =
							'scale(' + scale + ')';
				},
				onend: function (event) {
				}
			});
			app.get('squares').each(function(squareModel){
				new SquareView({model: squareModel});
			});
		}
	});
});