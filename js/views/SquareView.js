// EditionNouvellesFormes
// 2015
// SquareView Backbone View
//
define(['underscore', 'jquery', 'backbone','models/SquareModel','stache!square', 'd3', 'interact','jqueryFinger'], function (_, $, Backbone, SquareModel, template, d3, interact) {
	var SquareView = Backbone.View.extend({

		events:{
			'tap':'touch'
		},
		initialize:function(){
			this.render();
		},
		render:function() {
			var model = this.model,
				classes = ['square'],
				squares = d3.select('g#squares')
				;
			_(classes).push(model.get('turn'));
			_(classes).push(model.opened()?'opened':'');
			_(classes).push(model.parent()?'':'base');
			var g = this.g = squares.append('g')
				.attr({
					id: model.id,
					class:classes.join(' '),
					transform:model.transform(),
					opacity: model.opacity(),
					visibility:model.visibility()
				}),
				el = this.el = g.node(),
				$el = this.$el = $(this.el),
				rectAttr = {
					id: 'rect_'+model.id,
					width: model.width(),
					height: model.height(),
					transform: 'scale(' + (model.isLeft() ? -1 : 1) + ',' + (model.isTop() ? -1 : 1) + ')'
				},
				defs = this.defs = g.append('defs'),
				clipPath = defs.append('clipPath').attr({
					id:'clip_'+model.id
				});
			clipPath.append('use').attr({
				'xlink:href': '#rect_' + model.id,
				fill: '#00f',
				opacity:.3
			})
			this.rect = defs.append('rect').attr(rectAttr);
			this.backgroundRect = g.append('use').attr({
				'xlink:href':'#rect_' + model.id,
				fill: model.tint(),
				stroke: '#fff',
				'vector-effect': 'non-scaling-stroke'
			});
			this.fadeRect = g.append('use')
				.attr({
					'xlink:href': '#rect_' + model.id,
					fill: '#fff',
					opacity:0
				});

			var titleValue = model.get('title');
			if(titleValue){
				var titleLines = titleValue.split('\n');
				var titleGroup = this.title = g.append('g').attr({
					'transform': 'translate(0,0)',//'translate(' + model.directionLeft(model.size()/2) + ',' + model.directionTop(model.size()/2) + ')'
					 'clip-path': 'url(#clip_' + model.id + ')'
					}),
					fontSize = 18 * model.globalScale(),
					lineHeight = fontSize*1.5;
				var titleText = titleGroup.append('text').attr({
					'text-anchor':'middle',
					'alignment-baseline':'middle',
					'font-size': fontSize,
					'font-family': 'Roboto',
					'font-weight':'700',
					'transform':'translate(' + model.directionLeft(model.size()/2) + ', ' + model.directionTop(model.size()/2) + ') rotate(-45)'
				});
				_(titleLines).each(function(lineText,index){
					titleText.append('tspan').attr({'alignment-baseline':'middle',x:0,y: lineHeight*(index+.5-titleLines.length/2)}).text(lineText);
				})
			}

			this.g.view = this;
			model.view(this);
			var children;
			if (children = model.children()) {
				children.each(function (square) {
					//if(model.level()>1) return;
					new SquareView({model:square});
				});
			}
			model.bind('changeSize',this.changeSize,this);
		},
		touch:function(e){
			this.toggleOpening(e);
			this.model.trigger('focus', this.model);
		},
		toggleOpening:function(e){
			var model = this.model;
			if(!model.parent() || model.parent().opened()) {
				e.stopPropagation();
				e.preventDefault();
				model.toggleOpening();
			}
		},
		changeSize:function(){
			var model = this.model,
				rectAttr = {
					width: model.width(),
					height: model.height()
				};
			this.rect.transition().attr(rectAttr);
			//this.fadeRect.transition().attr(rectAttr);
			this.g.transition().attr({
				transform: model.transform(),
				visibility:'visible',
				opacity:model.opacity()
			}).each('end',function(){
				d3.select(this).attr({
					visibility:model.visibility()
				})
			});
		}

	});

	return SquareView;
});