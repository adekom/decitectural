changePage = function(url)
{
	
	// Shakespeare
	var toBe = url.split("/")[1];
	var notToBe = window.location.pathname.split("/")[1];
	
	if(toBe !== notToBe)
	{
		
		switch(toBe)
		{
			
			case "about":
			
			$("#home").fadeOut(function()
			{
				$("#about").fadeIn(function()
				{
					
					_gaq.push(['_trackPageview', '/about/']);
					
				});
			})
			
			break;
			
			default:
			
			$("#about").fadeOut(function()
			{
				$("#home").fadeIn(function()
				{
					
					$(".decimalValue").focus();
					
					_gaq.push(['_trackPageview', '/']);
					
				});
			})
			
			break;
			
		}
		
		window.history.pushState({path:url}, "", url);
		
	}
	
}

var changeSelected = function(element)
{
	
	var className = element.attr("class");
	
	$("." + className).removeClass("selected");
	element.addClass("selected");
	
}

var clearDefault = function(element)
{
	
	if(element.val() === "...")
	{
		$("input").val("");
	}
	
}

$(window).on(
{
	
	load: function()
	{
		
		if(window.location.pathname.split("/")[1] === "about")
		{
			$("#about").show();
		}
		else
		{
			$("#home").show();
			$(".decimalValue").focus();
		}
		
		$(".pageLink").on(
		{
			
			click: function()
			{
				
				changePage($(this).attr("href"));
				
				return false;
				
			}
			
		});
		
	}
	
});