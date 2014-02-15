define([
	"jquery",
	"underscore",
	"backbone",
	"routers/routerApp",
	"models/modelDecimal",
	"models/modelArchitectural",
	"views/viewDecimal",
	"views/viewArchitectural",
	"text!templates/templateApp.html"
], function($, _, Backbone, routerApp, ModelDecimal, ModelArchitectural, ViewDecimal, ViewArchitectural, templateApp) {
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
			"click .pageLink": function(e) {
				if(e.target.pathname !== window.location.pathname) {
					if(e.target.pathname === "/about/")
					{
						routerApp.navigate("about/");
						$("#home").fadeOut(function() {
							$("#about").fadeIn();
						});
					} else if(e.target.pathname === "/") {
						routerApp.navigate("");
						$("#about").fadeOut(function() {
							$("#home").fadeIn();
						});
					}
				}
				return false;
			}
		},
		
		initialize: function() {
			Backbone.history.start({pushState: true});
			this.modelDecimal = new ModelDecimal(),
			this.modelArchitectural = new ModelArchitectural(),
			this.viewDecimal = new ViewDecimal({model: this.modelDecimal}),
			this.viewArchitectural = new ViewArchitectural({model: this.modelArchitectural}),
			this.viewDecimal.viewApp = this;
			this.viewArchitectural.viewApp = this;
			
			this.modelDecimal.on("change:valueProvided", function() {
				this.modelArchitectural.convert(this.modelDecimal);
			}, this);
			
			this.modelDecimal.on("change:accuracy", function() {
				this.modelDecimal.convert(this.modelArchitectural);
			}, this);
			
			this.modelDecimal.on("change:units", function() {
				this.modelDecimal.convert(this.modelArchitectural);
			}, this);
			
			this.modelArchitectural.on("change:valueProvided", function() {
				this.modelDecimal.convert(this.modelArchitectural);
			}, this);
			
			this.modelArchitectural.on("change:accuracy", function() {
				this.modelArchitectural.convert(this.modelDecimal);
			}, this);
		},
		
		render: function() {
			var template = _.template(templateApp);
			var html = template();
			this.$el.html(html);
			$("body").html(this.$el);
			this.viewDecimal.render();
			this.viewArchitectural.render();
			switch(window.location.pathname) {
				case "/":
					$("#home").fadeIn();
					break;
				case "/about/":
					$("#about").fadeIn();
					break;
			}
		}
	});
	
	return ViewApp;
});