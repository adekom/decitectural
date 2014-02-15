define([
	"jquery",
	"underscore",
	"backbone",
	"views/viewApp"
], function($, _, Backbone, ViewApp) {
	var initialize = function() {
		var viewApp = new ViewApp();
		viewApp.render();
	}
	return {initialize: initialize};
});