define([
	"jquery",
	"underscore",
	"backbone",
	"jqueryui",
	"text!templates/templateArchitectural.html",
	"customFunctions"
], function($, _, Backbone, jqueryui, templateArchitectural, customFunctions) {
	var ViewArchitectural = Backbone.View.extend({
		className: "architectural",
		
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
				if($.inArray(e.which, this.keyup) !== -1) {
					if(this.check())
						this.convert();
				}
			},
			"click .architecturalAccuracy": function(e) {
				$(".architecturalAccuracy.selected").removeClass("selected");
				$(e.target).addClass("selected");
				if(this.viewApp.viewDecimal.check())
					this.viewApp.viewDecimal.convert();
			},
		},
		
		initialize: function() {
			this.viewApp = this.model.get("viewApp");
		},
		
		render: function() {
			var template = _.template(templateArchitectural);
			var html = template();
			this.$el.html(html);
			$("#home").append(this.$el);
		},
		
		keypress: [0, 8, 13, 32, 34, 39, 45, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 189, 191, 222],
		
		keyup: [8, 13, 34, 39, 45, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 189, 191, 222],
		
		check: function()
		{
			var value = $(".architecturalValue").val();
			var match = value.match(/^(([0-9]+)\')?([-\s])*((([0-9]+\")([-\s])*|([0-9]*)([-\s]*)([0-9]+)(\/{1})([0-9]+\")))?$/g);
			if(value !== "" && match !== null) {
				return true;
			} else if(value !== "") {
				$(".decimalValue").val("...");
				return false;
			} else {
				$(".decimalValue").val();
				return false;
			}
		},
		
		convert: function()
		{
			var architecturalValue = $(".architecturalValue").val();
			var architecturalAccuracy;
			var decimalUnits = $(".decimalUnits.selected").val();
			var decimalValue = 0;
			var decimalAccuracy = $(".decimalAccuracy.selected").val();
			// FEET
			var feet = architecturalValue.match(/^([0-9]+)\'[-\s]*/);
			if(feet !== null) {
				decimalValue += parseInt(feet[1]) * 12;
			}
			// INCHES
			var inches = architecturalValue.match(/([-\s\']+([0-9]+)|^([0-9]+))[-\s\"]+/);
			if(inches !== null) {
				if(feet !== null) {
					decimalValue += parseInt(inches[2]);
				} else {
					decimalValue += parseInt(inches[3]);
				}
			}
			// FRACTION
			var fraction = architecturalValue.match(/([-\s\']+([0-9]+\/[0-9]+)|(^[0-9]+\/[0-9]+))\"/);
			if(fraction !== null) {
				if(feet !== null || inches !== null) {
					decimalValue += divideFraction(fraction[2]);
				} else {
					decimalValue += divideFraction(fraction[3]);
				}
			}
			decimalValue = decimalValue / decimalUnits;
			decimalValue = roundNumber(decimalValue, decimalAccuracy);
			// RETURN
			$(".decimalValue").val(decimalValue);
			$(".decimalValue").stop();
			$(".decimalValue").css({"color": "#00aeef"}).animate({"color": "#666"}, 1400);
		}
	});
	return ViewArchitectural;
});