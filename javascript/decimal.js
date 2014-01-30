decitectural.decimalize = decitectural.decimalize || {};

decitectural.decimalize.keypress = [0, 8, 13, 32, 34, 39, 45, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 189, 191, 222];
decitectural.decimalize.keyup = [8, 13, 34, 39, 45, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 189, 191, 222];

decitectural.decimalize.check = function()
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

decitectural.decimalize.convert = function()
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
	
	// RETURN
	$(".decimalValue").val(decimalValue);
	$(".decimalValue").css({"color": "#00aeef"}).delay(400).animate({"color": "#666"}, 1400);
	
}