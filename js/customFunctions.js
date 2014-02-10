var divideFraction = function(fraction)
{
	
	var bits = fraction.split("/");
	
	return parseInt(bits[0], 10) / parseInt(bits[1], 10);
	
}

var roundNumber = function(n, decimalPlaces)
{
	return Math.floor(n * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
}

var reduceFraction = function(numerator, denominator)
{
	
	var gcd = greatestCommonDenominator(numerator, denominator);
	
	return (numerator / gcd) + "/" + (denominator / gcd);
	
}

var greatestCommonDenominator = function(a, b)
{
	return b ? greatestCommonDenominator(b, a % b) : Math.abs(a);
}

var isNumber = function(n)
{
	return !isNaN(parseFloat(n)) && isFinite(n);
}