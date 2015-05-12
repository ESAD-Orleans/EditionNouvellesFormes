// EditionNouvellesFormes
// 2015
// NodeCollection Backbone Model
//
define(['underscore', 'jquery', 'backbone', 'models/SquareModel'], function (_, $, Backbone, SquareModel) {
	//
	var squaresRegistry = _([]);
	//

	var SquareCollection = Backbone.Collection.extend({
		model: SquareModel,
		m: function () {
			// mustache shortcut
			var model = this;
			return function (key, render) {
				return render(model.get(key));
			};
		}
	});

	return SquareCollection;
});