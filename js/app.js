define([
	"jquery",
	"underscore",
	"backbone",
	"views/viewApp"
], function($, _, Backbone, viewApp) {
	var initialize = function() {
		viewApp.render();
	}
	return {initialize: initialize};
});