$(document).on(
{
	
	focus: function()
	{
		clearDefault($(this));
	},
	keydown: function(event)
	{
		
		var acceptableKeyCodes = [8, 13, 32, 34, 39, 45, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 189, 191, 222];
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
			
			if(checkDecimalize())
			{
				
				_gaq.push(['_trackEvent', 'decimalize', 'value']);
				
				decimalize();
				
			}
			
		}
		
	}
	
},
".architecturalValue");

$(document).on(
{
	
	click: function()
	{
		
		changeSelected($(this));
		
		if(checkDecimalize())
		{
			
			_gaq.push(['_trackEvent', 'decimalize', 'accuracy']);
			
			decimalize();
			
		}
		
	}
	
},
".decimalAccuracy");

var checkDecimalize = function()
{
	
	var value = $(".architecturalValue").val();
	//var match = value.match(/^(([0-9]+)\')?([-\s])*((([0-9]+)([-\s])*|([0-9]?)([-\s]*)([0-9]+)(\/{1})([0-9]+))(\"?))?$/g);
	var match = value.match(/^(([0-9]+)\')?([-\s])*((([0-9]+\")([-\s])*|([0-9]*)([-\s]*)([0-9]+)(\/{1})([0-9]+\")))?$/g);
	
	if(value !== "" && match !== null)
	{
		return true;
	}
	else if(value !== "")
	{
		$(".decimalValue").val("...");
		return false;
	}
	else
	{
		$(".decimalValue").val();
		return false;
	}
}

var decimalize = function()
{
	
	var architecturalValue = $(".architecturalValue").val();
	var architecturalAccuracy;
	
	var decimalUnits = $(".decimalUnits.selected").val();
	var decimalValue = 0;
	var decimalAccuracy = $(".decimalAccuracy.selected").val();
	
	
	// FEET
	var feet = architecturalValue.match(/^([0-9]+)\'[-\s]*/);
	
	if(feet !== null)
	{
		decimalValue += parseInt(feet[1]) * 12;
	}
	
	
	// INCHES
	var inches = architecturalValue.match(/([-\s\']+([0-9]+)|^([0-9]+))[-\s\"]+/);
	
	if(inches !== null)
	{
		
		if(feet !== null)
		{
			decimalValue += parseInt(inches[2]);
		}
		else
		{
			decimalValue += parseInt(inches[3]);
		}
		
	}
	
	
	// FRACTION
	var fraction = architecturalValue.match(/([-\s\']+([0-9]+\/[0-9]+)|(^[0-9]+\/[0-9]+))\"/);
	
	if(fraction !== null)
	{
		
		if(feet !== null || inches !== null)
		{
			decimalValue += divideFraction(fraction[2]);
		}
		else
		{
			decimalValue += divideFraction(fraction[3]);
		}
		
	}
	
	decimalValue = decimalValue / decimalUnits;
	decimalValue = roundNumber(decimalValue, decimalAccuracy);
	
	window.lastAction = "decimalize";
	
	// RETURN
	$(".decimalValue").val(decimalValue);
	$(".decimalValue").css({"color": "#00aeef"}).delay(400).animate({"color": "#666"}, 1400);
	
}

var divideFraction = function(fraction)
{
	
	var bits = fraction.split("/");
	
	return parseInt(bits[0], 10) / parseInt(bits[1], 10);
	
}

function roundNumber(n, decimalPlaces)
{
	return Math.floor(n * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
}