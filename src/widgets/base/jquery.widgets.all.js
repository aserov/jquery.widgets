/*
 * jquery.widgets.all.js
 *
 */

if (typeof jQuery === "undefined") {
	throw new Error("Widgets require jQuery");
}

(function ($, target) {
	"use strict";
	target = target || {};

	function register(box) {
		_execFunc(box, "init");
	}

	function unregister(box) {
		_execFunc(box, "destroy");
	}

	function empty(){
	}

	function _execFunc(box, name) {

		var widgets = target.widgets;
		for (var w in widgets) {
			if (widgets.hasOwnProperty(w)) {

				var widget = widgets[w];
				var func = widget[name];
				if (typeof func !== "undefined") {
					func(box);
				}
			}
		}
	}

	target.widgets = {};
	target.widgets.all = {
		register: register,
		unregister: unregister,
		empty: empty,

		options: {
			enable: true,
			defaults: {
				box: "body"
			}
		}
	}

	window.app = target;
})(jQuery, window.app);