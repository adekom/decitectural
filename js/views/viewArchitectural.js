define([
	"jquery",
	"underscore",
	"backbone",
	"jqueryui",
	"text!templates/templateArchitectural.html"
], function($, _, Backbone, jqueryui, templateArchitectural) {
	var ViewArchitectural = Backbone.View.extend({
		className: "architectural",
		
		keypress: [0, 8, 13, 32, 34, 39, 45, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 189, 191, 222],
		
		keyup: [8, 13, 34, 39, 45, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 189, 191, 222],
		
		events: {
			"focus .architecturalValue": function() {
				if($(".architecturalValue").val() === "...")
					$("input").val("");
			},
			"keypress .architecturalValue": function(e) {
				// if no modifiers key are being pressed
				// (only needed for firefox; these properties will always be false in other browsers)
				if(e.metaKey === false && e.ctrlKey === false && e.altKey === false && e.shiftKey === false) {
					// if keypress is not allowed return false
					if($.inArray(e.which, this.keypress) === -1)
						return false;
				}
			},
			"keyup .architecturalValue": function(e) {
				if($.inArray(e.which, this.keyup) !== -1)
					this.model.set("valueProvided", $(".architecturalValue").val());
			},
			"click .architecturalAccuracy": function(e) {
				$(".architecturalAccuracy.selected").removeClass("selected");
				$(e.target).addClass("selected");
				this.model.set("accuracy", $(".architecturalAccuracy.selected").val());
			},
		},
		
		initialize: function() {
			this.model.on("change:valueComputed", _.bind(function() {
				$(".architecturalValue").val(this.model.get("valueComputed"));
				$(".architecturalValue").stop();
				$(".architecturalValue").css({"color": "#00aeef"}).animate({"color": "#666"}, 1400);
			}, this));
		},
		
		render: function() {
			var template = _.template(templateArchitectural);
			var html = template();
			this.$el.html(html);
			$("#home").append(this.$el);
		}
	});
	return ViewArchitectural;
});