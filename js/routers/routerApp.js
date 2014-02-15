define([
	"jquery",
	"underscore",
	"backbone"
], function($, _, Backbone) {
	var RouterApp = Backbone.Router.extend({
		routes: {}
	});
	return new RouterApp();
});