decitectural.architecturalize = decitectural.architecturalize || {};

decitectural.architecturalize.keypress = [0, 8, 13, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 190];
decitectural.architecturalize.keyup = [8, 13, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 190];

decitectural.architecturalize.check = function()
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

decitectural.architecturalize.convert = function()
{
	
	var architecturalValue = "";
	var architecturalAccuracy = $(".architecturalAccuracy.selected").val();
	
	var decimalUnits = $(".decimalUnits.selected").val();
	var decimalValue = $(".decimalValue").val() * decimalUnits;
	
	var feet = Math.floor(decimalValue / 12);
	var inches = Math.floor(decimalValue - (feet * 12));
	var fraction = Math.floor((decimalValue - (feet * 12) - inches) * architecturalAccuracy);
	
	// FEET
	if(feet > 0)
	{
		
		architecturalValue += feet + "'";
		
		if(inches > 0 || fraction > 0)
		{
			architecturalValue += " ";
		}
		
	}
	
	// INCHES
	if(inches > 0)
	{
		
		architecturalValue += inches;
		
		if(fraction > 0)
		{
			architecturalValue += " ";
		}
		else
		{
			architecturalValue += "\"";
		}
		
	}
	
	// FRACTION
	if(fraction > 0)
	{
		architecturalValue += reduceFraction(fraction, architecturalAccuracy) + "\"";
	}
	
	if(feet === 0 && inches === 0 && fraction === 0)
	{
		architecturalValue += "0\"";
	}
	
	// RETURN
	$(".architecturalValue").val(architecturalValue);
	$(".architecturalValue").stop();
	$(".architecturalValue").css({"color": "#00aeef"}).delay(400).animate({"color": "#666"}, 1400);
	
}