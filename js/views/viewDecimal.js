define([
	"jquery",
	"underscore",
	"backbone",
	"jqueryui",
	"text!templates/templateDecimal.html"
], function($, _, Backbone, jqueryui, templateDecimal) {
	var ViewDecimal = Backbone.View.extend({
		className: "decimal",
		
		keypress: [0, 8, 13, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 190],
		
		keyup: [8, 13, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 190],
		
		events: {
			"focus .decimalValue": function() {
				if($(".decimalValue").val() === "...")
					$("input").val("");
			},
			"keypress .decimalValue": function(e) {
				// if no modifiers key are being pressed
				// (only needed for firefox; these properties will always be false in other browsers)
				if(e.metaKey === false && e.ctrlKey === false && e.altKey === false && e.shiftKey === false) {
					// if keypress is not allowed return false
					if($.inArray(e.which, this.keypress) === -1)
						return false;
				}
			},
			"keyup .decimalValue": function(e) {
				if($.inArray(e.which, this.keyup) !== -1)
					this.model.set("valueProvided", $(".decimalValue").val());
			},
			"click .decimalAccuracy": function(e) {
				$(".decimalAccuracy.selected").removeClass("selected");
				$(e.target).addClass("selected");
				this.model.set("accuracy", $(".decimalAccuracy.selected").val());
			},
			"click .decimalUnits": function(e) {
				$(".decimalUnits.selected").removeClass("selected");
				$(e.target).addClass("selected");
				this.model.set("units", $(".decimalUnits.selected").val());
			}
		},
		
		initialize: function() {
			this.model.on("change:valueComputed", _.bind(function() {
				$(".decimalValue").val(this.model.get("valueComputed"));
				$(".decimalValue").stop();
				$(".decimalValue").css({"color": "#00aeef"}).animate({"color": "#666"}, 1400);
			}, this));
		},
		
		render: function() {
			var template = _.template(templateDecimal);
			var html = template();
			this.$el.html(html);
			$("#home").append(this.$el);
		}
	});
	return ViewDecimal;
});