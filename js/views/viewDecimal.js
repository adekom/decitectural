define([
	"jquery",
	"underscore",
	"backbone",
	"jqueryui",
	"text!templates/templateDecimal.html",
	"customFunctions"
], function($, _, Backbone, jqueryui, templateDecimal, customFunctions) {
	var ViewDecimal = Backbone.View.extend({
		className: "decimal",
		
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
				if($.inArray(e.which, this.keyup) !== -1) {
					if(this.check())
						this.convert();
				}
			},
			"click .decimalAccuracy": function(e) {
				$(".decimalAccuracy.selected").removeClass("selected");
				$(e.target).addClass("selected");
				if(this.viewApp.viewArchitectural.check())
					this.viewApp.viewArchitectural.convert();
			},
			"click .decimalUnits": function(e) {
				$(".decimalUnits.selected").removeClass("selected");
				$(e.target).addClass("selected");
				if(this.viewApp.viewArchitectural.check())
					this.viewApp.viewArchitectural.convert();
			}
		},
		
		initialize: function() {
			this.viewApp = this.model.get("viewApp");
		},
		
		render: function() {
			var template = _.template(templateDecimal);
			var html = template();
			this.$el.html(html);
			$("#home").append(this.$el);
		},
		
		keypress: [0, 8, 13, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 190],
		
		keyup: [8, 13, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 190],
		
		check: function()
		{
			var value = $(".decimalValue").val();
			if(value !== "" && isNumber(value)) {
				return true;
			} else if(value !== "") {
				$(".architecturalValue").val("...");
				return false;
			} else {
				$(".architecturalValue").val();
				return false;
			}
		},
		
		convert: function()
		{
			var architecturalValue = "";
			var architecturalAccuracy = $(".architecturalAccuracy.selected").val();
			var decimalUnits = $(".decimalUnits.selected").val();
			var decimalValue = $(".decimalValue").val() * decimalUnits;
			var feet = Math.floor(decimalValue / 12);
			var inches = Math.floor(decimalValue - (feet * 12));
			var fraction = Math.floor((decimalValue - (feet * 12) - inches) * architecturalAccuracy);
			// FEET
			if(feet > 0) {
				architecturalValue += feet + "'";
				if(inches > 0 || fraction > 0) {
					architecturalValue += " ";
				}
			}
			// INCHES
			if(inches > 0) {
				architecturalValue += inches;
				if(fraction > 0)
				{
					architecturalValue += " ";
				} else {
					architecturalValue += "\"";
				}
			}
			// FRACTION
			if(fraction > 0) {
				architecturalValue += reduceFraction(fraction, architecturalAccuracy) + "\"";
			}
			if(feet === 0 && inches === 0 && fraction === 0) {
				architecturalValue += "0\"";
			}
			// RETURN
			$(".architecturalValue").val(architecturalValue);
			$(".architecturalValue").stop();
			$(".architecturalValue").css({"color": "#00aeef"}).animate({"color": "#666"}, 1400);
		}
	});
	return ViewDecimal;
});