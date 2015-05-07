// EditionNouvellesFormes
// 2015
// NodeCollection Backbone Model
//
define(['underscore', 'jquery', 'backbone', 'models/NodeModel'], function (_, $, Backbone, NodeModel) {
	return Backbone.Collection.extend({
		model: NodeModel
	});
});