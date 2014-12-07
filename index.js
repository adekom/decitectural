module.exports = {
	/**
	 * Convert architectural measurement to decimal notation.
	 *
	 * @param {String} architectural
	 * @param {String} units
	 * @param {String} precision
	 * @return {Number}
	 */
	
	toDecimal: function(architectural, units, precision) {
		if (typeof architectural !== "string" && !(architectural instanceof String))
			return;
		if(architectural.match(/^(([0-9]+)\')?([-\s])*((([0-9]+\")([-\s])*|([0-9]*)([-\s]*)([0-9]+)(\/{1})([0-9]+\")))?$/g) === null)
			return;
		if(["1", "1/10", "1/100", "1/1000", "1/10000", "1/100000", "1/1000000", "1/10000000"].indexOf(precision) < 0)
			return;
		if(["inches", "feet"].indexOf(units) < 0)
			return;
		
		var decimal = 0;
		
		var feet = architectural.match(/^([0-9]+)\'[-\s]*/);
		if(feet !== null)
			decimal += parseInt(feet[1]) * 12;
		
		var inches = architectural.match(/([-\s\']+([0-9]+)|^([0-9]+))[-\s\"]+/);
		if(inches !== null) {
			if(feet !== null)
				decimal += parseInt(inches[2]);
			else
				decimal += parseInt(inches[3]);
		}
		
		var fraction = architectural.match(/([-\s\']+([0-9]+\/[0-9]+)|(^[0-9]+\/[0-9]+))\"/);
		if(fraction !== null) {
			if(feet !== null || inches !== null)
				decimal += divideFraction(fraction[2]);
			else
				decimal += divideFraction(fraction[3]);
		}
		
		if(units !== "inches")
			decimal = decimal / 12;
		
		decimal = roundNumber(decimal, ["1", "1/10", "1/100", "1/1000", "1/10000", "1/100000", "1/1000000", "1/10000000"].indexOf(precision));
		
		return decimal;
	},
	
	/**
	 * Convert decimal measurement to architectural notation.
	 *
	 * @param {Number} decimal
	 * @param {String} units
	 * @param {String} precision
	 * @return {String}
	 */
	
	toArchitectural: function(decimal, units, precision) {
		if(typeof decimal !== "number" || isNaN(decimal) || !isFinite(decimal))
			return;
		if(["inches", "feet"].indexOf(units) < 0)
			return;
		if(["1/2", "1/4", "1/8", "1/16", "1/32", "1/64", "1/128", "1/256"].indexOf(precision) < 0)
			return;
		
		var architectural = "";
		
		var precision = parseFloat(precision.replace("1/", ""));
		
		if(units !== "inches")
			decimal = decimal * 12;
		
		if(decimal < 0) {
			decimal = Math.abs(decimal);
			architectural += "-";
		}
		
		var feet = Math.floor(decimal / 12);
		architectural += feet + "' ";
		
		var inches = Math.floor(decimal - (feet * 12));
		architectural += inches + "\"";
		
		var fraction = Math.floor((decimal - (feet * 12) - inches) * precision);
		if(fraction > 0)
			architectural = architectural.replace("\"", " " + reduceFraction(fraction, precision) + "\"");
		
		return architectural;
	}
};


var divideFraction = function(fraction) {
	var bits = fraction.split("/");
	return parseInt(bits[0], 10) / parseInt(bits[1], 10);
};

var roundNumber = function(n, decimalPlaces) {
	return Math.floor(n * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
};

var reduceFraction = function(numerator, denominator) {
	var gcd = greatestCommonDenominator(numerator, denominator);
	return (numerator / gcd) + "/" + (denominator / gcd);
};

var greatestCommonDenominator = function(a, b) {
	return b ? greatestCommonDenominator(b, a % b) : Math.abs(a);
};

var isNumber = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};