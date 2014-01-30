$(document).on(
{
	
	focus: function()
	{
		
		if($(this).val() === "...")
		{
			$("input").val("");
		}
		
		// set current action
		if($(this).hasClass("architecturalValue"))
		{
			
			decitectural.current = decitectural.decimalize;
			
			_gaq.push(['_trackEvent', 'decimalize', 'value']);
			
		}
		else
		{
			
			decitectural.current = decitectural.architecturalize;
			
			_gaq.push(['_trackEvent', 'architecturalize', 'value']);
			
		}
		
	},
	keydown: function()
	{
		// if input bubble is visible
		if($(".inputBubble").is(":visible"))
		{
			$(".inputBubble").fadeOut("fast");
		}
		
	},
	keypress: function(e)
	{
		
		// if no modifiers key are being pressed
		// (only needed for firefox; these properties will always be false in other browsers)
		if(e.metaKey === false && e.ctrlKey === false && e.altKey === false && e.shiftKey === false)
		{
			
			// if keypress is not allowed return false
			if($.inArray(e.which, decitectural.current.keypress) === -1)
			{
				return false;
			}
			
		}
		
	},
	keyup: function(e)
	{
		
		// if keyup is allowed
		if($.inArray(e.which, decitectural.current.keyup) !== -1)
		{
			
			// check and calculate
			if(decitectural.current.check())
			{
				decitectural.current.convert();
			}
			
		}
		
	}
	
},
".architecturalValue, .decimalValue");

$(document).on(
{
	
	click: function()
	{
		
		// set current action
		if($(this).hasClass("architecturalAccuracy"))
		{
			
			decitectural.current = decitectural.architecturalize;
			
			_gaq.push(['_trackEvent', 'architecturalize', 'accuracy']);
			
		}
		else
		{
			
			decitectural.current = decitectural.decimalize;
			
			_gaq.push(['_trackEvent', 'decimalize', 'accuracy']);
			
		}
		
		// make current button selected
		var className = $(this).attr("class");
		$("." + className).removeClass("selected");
		$(this).addClass("selected");
		
		// check and calculate
		if(decitectural.current.check())
		{
			decitectural.current.convert();
		}
		
	}
	
},
".decimalAccuracy, .architecturalAccuracy");

$(document).on(
{
	
	click: function()
	{
		
		// make current button selected
		var className = $(this).attr("class");
		$("." + className).removeClass("selected");
		$(this).addClass("selected");
		
		// check and calculate
		if(decitectural.current.check())
		{
			decitectural.current.convert();
		}
		
		_gaq.push(['_trackEvent', 'decimalize', 'units']);
		
	}
	
},
".decimalUnits");