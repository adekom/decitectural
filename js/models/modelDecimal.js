define([
	"jquery",
	"underscore",
	"backbone",
	"customFunctions"
], function($, _, Backbone, customFunctions) {
	var ModelDecimal = Backbone.Model.extend({
		defaults: {
			"valueComputed": "",
			"valueProvided": "",
			"valueCurrent": "",
			"accuracy": "4",
			"units": "1"
		},
		
		convert: function(modelArchitectural) {
			var value = modelArchitectural.get("valueCurrent");
			var match = value.match(/^(([0-9]+)\')?([-\s])*((([0-9]+\")([-\s])*|([0-9]*)([-\s]*)([0-9]+)(\/{1})([0-9]+\")))?$/g);
			if(value === "") {
				this.set("valueComputed", "");
				return false;
			} else if(match === null) {
				this.set("valueComputed", "...");
				return false;
			} else {
				var architecturalValue = modelArchitectural.get("valueCurrent");
				var decimalUnits = this.get("units");
				var decimalValue = 0;
				var decimalAccuracy = this.get("accuracy");
				// FEET
				var feet = architecturalValue.match(/^([0-9]+)\'[-\s]*/);
				if(feet !== null)
					decimalValue += parseInt(feet[1]) * 12;
				// INCHES
				var inches = architecturalValue.match(/([-\s\']+([0-9]+)|^([0-9]+))[-\s\"]+/);
				if(inches !== null) {
					if(feet !== null)
						decimalValue += parseInt(inches[2]);
					else
						decimalValue += parseInt(inches[3]);
				}
				// FRACTION
				var fraction = architecturalValue.match(/([-\s\']+([0-9]+\/[0-9]+)|(^[0-9]+\/[0-9]+))\"/);
				if(fraction !== null) {
					if(feet !== null || inches !== null)
						decimalValue += divideFraction(fraction[2]);
					else
						decimalValue += divideFraction(fraction[3]);
				}
				decimalValue = decimalValue / decimalUnits;
				decimalValue = roundNumber(decimalValue, decimalAccuracy);
				// RETURN;
				this.set("valueComputed", decimalValue);
				return true;
			}
		},
		
		initialize: function() {
			/* valueCurrent is necessary because we cannot assume when this model is being converted that:
			- valueProvided will be the "most current" value visible to the user
			- valueProvided will even be set at all (valueComputed may only be set). */
			this.on("change:valueComputed", function() {
				this.set("valueCurrent", this.get("valueComputed"));
			}, this);
			this.on("change:valueProvided", function() {
				this.set("valueCurrent", this.get("valueProvided"));
			}, this);
		}
	});
	return ModelDecimal;
});