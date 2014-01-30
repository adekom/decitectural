$(document).on(
{
	
	focus: function()
	{
		clearDefault($(this));
	},
	keypress: function(event)
	{
		
		var acceptableKeyCodes = [46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58];
		var actualKeyCode = event.which;
		
		if(acceptableKeyCodes.indexOf(actualKeyCode) === -1)
		{
			
			window.validKeystroke = false;
			
			return false;
			
		}
		else
		{
			window.validKeystroke = true;
		}
		
	},
	keyup: function()
	{
		
		if(window.validKeystroke === true)
		{
			checkArchitecturalize();
		}
		
	}
	
},
".decimalValue");

$(document).on(
{
	
	click: function()
	{
		
		changeSelected($(this));
		checkArchitecturalize();
		
	}
	
},
".architecturalAccuracy");

$(document).on(
{
	
	click: function()
	{
		
		changeSelected($(this));
		checkArchitecturalize();
		
	}
	
},
".decimalUnits");

var checkArchitecturalize = function()
{
	
	var value = $(".decimalValue").val();
	
	if(value !== "" && isNumber(value))
	{
		architecturalize();
	}
	else if(value !== "")
	{
		$(".architecturalValue").val("...");
	}
	else
	{
		$(".architecturalValue").val();
	}
}

var architecturalize = function()
{
	
	var architecturalValue = "";
	var architecturalAccuracy = $(".architecturalAccuracy.selected").val();
	
	var decimalUnits = $(".decimalUnits.selected").val();
	var decimalValue = $(".decimalValue").val() * decimalUnits;
	
	
	// FEET
	var feet = Math.floor(decimalValue / 12);
	
	if(feet > 0)
	{
		
		architecturalValue += feet + "'";
		decimalValue -= feet * 12;
		
	}
	
	
	// INCHES
	var inches = Math.floor(decimalValue);
	
	if(feet > 0 && inches > 0)
	{
		architecturalValue += " ";
	}
	
	if(inches > 0)
	{
		
		architecturalValue += inches;
		decimalValue -= inches;
		
	}
	
	
	// FRACTION
	var fraction = Math.floor(decimalValue * architecturalAccuracy);
	
	if((inches > 0 || feet > 0) && fraction > 0)
	{
		architecturalValue += " ";
	}
	
	if(fraction > 0)
	{
		architecturalValue += reduceFraction(fraction, architecturalAccuracy);
	}
	
	if(fraction > 0 || inches > 0)
	{
		architecturalValue += "\"";
	}
	
	
	// RETURN
	$(".architecturalValue").val(architecturalValue);
	
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