define([
	"jquery",
	"underscore",
	"backbone",
	"views/viewDecimal",
	"views/viewArchitectural",
	"text!templates/templateApp.html"
], function($, _, Backbone, ViewDecimal, ViewArchitectural, templateApp) {
	var ViewApp = Backbone.View.extend({
		className: "app",
		
		events: {
			"keydown .value": function() {
				if($(".inputBubble").is(":visible"))
					$(".inputBubble").fadeOut("fast");
			},
			"click .button": function(e) {
				var button = $(e.target);
				var similar = button.closest("ul").find(".button");
				button.stop(true, true);
				similar.filter(".active").animate({"color": "#ccc"}, 400, function(){ $(this).attr("style", ""); });
				similar.filter(".active").removeClass("active");
				button.addClass("active");
			},
		},
		
		render: function() {
			var template = _.template(templateApp);
			var html = template();
			var model = new Backbone.Model({viewApp: this});
			this.viewDecimal = new ViewDecimal({model: model});
			this.viewArchitectural = new ViewArchitectural({model: model});
			this.$el.html(html);
			$("body").html(this.$el);
			this.viewDecimal.render();
			this.viewArchitectural.render();
			$("#home").fadeIn();
		}
	});
	var viewApp = new ViewApp();
	return viewApp;
});