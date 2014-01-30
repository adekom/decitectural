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

$(document).on(
{
	
	mouseenter: function()
	{
		
		$(this).find("ul").stop();
		$(this).find("ul").slideDown("fast");
		
	},
	mouseleave: function()
	{
		
		$(this).find("ul").stop();
		$(this).find("ul").slideUp("fast");
		
	}
	
},
".main > div");

$(window).on(
{
	
	load: function()
	{
		
		$("#decimal").find("input").focus();
		
	}
	
});