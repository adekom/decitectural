$(document).on(
{
	
	focus: function()
	{
		clearDefault($(this));
	},
	keydown: function(event)
	{
		
		var acceptableKeyCodes = [8, 13, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 190];
		var actualKeyCode = event.which;
		
		if($.inArray(actualKeyCode, acceptableKeyCodes) === -1)
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
			
			if(checkArchitecturalize())
			{
				
				_gaq.push(['_trackEvent', 'architecturalize', 'value']);
				
				architecturalize();
				
			}
			
		}
		
	}
	
},
".decimalValue");

$(document).on(
{
	
	click: function()
	{
		
		changeSelected($(this));
		
		if(checkArchitecturalize())
		{
			
			_gaq.push(['_trackEvent', 'architecturalize', 'accuracy']);
			
			architecturalize();
			
		}
		
	}
	
},
".architecturalAccuracy");

$(document).on(
{
	
	click: function()
	{
		
		changeSelected($(this));
		
		if(window.lastAction === "architecturalize")
		{
			
			if(checkArchitecturalize())
			{
				
				_gaq.push(['_trackEvent', 'architecturalize', 'units']);
				
				architecturalize();
				
			}
			
		}
		else if(window.lastAction === "decimalize")
		{
			
			if(checkDecimalize())
			{
				
				_gaq.push(['_trackEvent', 'architecturalize', 'units']);
				
				decimalize();
				
			}
			
		}
		
	}
	
},
".decimalUnits");

var checkArchitecturalize = function()
{
	
	var value = $(".decimalValue").val();
	
	if(value !== "" && isNumber(value))
	{
		return true;
	}
	else if(value !== "")
	{
		$(".architecturalValue").val("...");
		return false;
	}
	else
	{
		$(".architecturalValue").val();
		return false;
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
	
	
	window.lastAction = "architecturalize";
	
	// RETURN
	$(".architecturalValue").val(architecturalValue);
	$(".architecturalValue").stop();
	$(".architecturalValue").css({"color": "#00aeef"}).delay(400).animate({"color": "#666"}, 1400);
	
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