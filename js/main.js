require.config({
	paths: {
		jquery: "libs/jquery/jquery",
		underscore: "libs/underscore/underscore",
		backbone: "libs/backbone/backbone",
		jqueryui: "libs/jqueryui/jqueryui",
		text: "libs/require/text",
	},
	shim: {
		underscore: {
			exports: "_"
		},
		backbone: {
			deps: ["jquery", "underscore"],
			exports: "Backbone"
		},
		jqueryui: {
			deps: ["jquery"],
			exports: "jqueryui"
		}
	}
});

require(["app"], function(App) {
	App.initialize();
});