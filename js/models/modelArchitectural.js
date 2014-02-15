define([
	"jquery",
	"underscore",
	"backbone",
	"customFunctions"
], function($, _, Backbone, customFunctions) {
	var ModelArchitectural = Backbone.Model.extend({
		defaults: {
			"valueComputed": "",
			"valueProvided": "",
			"valueCurrent": "",
			"accuracy": "16"
		},
		
		convert: function(modelDecimal) {
			var value = modelDecimal.get("valueCurrent");
			if(value === "") {
				this.set("valueComputed", "");
				return false;
			} else if(!isNumber(value)) {
				this.set("valueComputed", "...");
				return false;
			} else {
				var architecturalValue = "";
				var architecturalAccuracy = this.get("accuracy");
				var decimalUnits = modelDecimal.get("units");
				var decimalValue = value * decimalUnits;
				var feet = Math.floor(decimalValue / 12);
				var inches = Math.floor(decimalValue - (feet * 12));
				var fraction = Math.floor((decimalValue - (feet * 12) - inches) * architecturalAccuracy);
				// FEET
				if(feet > 0) {
					architecturalValue += feet + "'";
					if(inches > 0 || fraction > 0)
						architecturalValue += " ";
				}
				// INCHES
				if(inches > 0) {
					architecturalValue += inches;
					if(fraction > 0)
						architecturalValue += " ";
					else
						architecturalValue += "\"";
				}
				// FRACTION
				if(fraction > 0)
					architecturalValue += reduceFraction(fraction, architecturalAccuracy) + "\"";
				if(feet === 0 && inches === 0 && fraction === 0)
					architecturalValue += "0\"";
				// RETURN
				this.set("valueComputed", architecturalValue);
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
	return ModelArchitectural;
});