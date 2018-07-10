/* 
 * jquery.widgets.passwordshow.js
 *
 */
/*
Need to add the following css to hide clear button for IE >= 10, Edge.
See https://developer.mozilla.org/en-US/docs/Web/CSS/::-ms-reveal

[data-widget-passwordshow] [data-widget-passwordshow-input]::-ms-reveal {
	display: none;
}
[data-widget-passwordshow] [data-widget-passwordshow-input] {
	padding-right: 32px;
	border-radius: 4px;
}
[data-widget-passwordshow-btn] {
	z-index: 1000;
	pointer-events: auto !important;
	cursor: pointer !important;
}
*/

(function ($, target) {
	"use strict";

	target.widgets.passwordshow = target.widgets.passwordshow || {};

	target.widgets.passwordshow.options = {
		enable: true && target.widgets.all.options.enable,
		defaults: {
			box: target.widgets.all.options.defaults.box
		},

		html: {
			selectors: {
				passwordshow: "[data-widget-passwordshow]",
				passwordshowInit: "[data-widget-passwordshow][data-widget-passwordshow-ready]",
				passwordshowNotInit: "[data-widget-passwordshow]:not([data-widget-passwordshow-ready])"
			},

			attrs: {
				ready: "data-widget-passwordshow-ready",

				input: "[data-widget-passwordshow-input]",
				btn: "[data-widget-passwordshow-btn]"
			},

			types: {
				text: "text",
				password: "password"
			}
		}
	};

	function _init() {

		var obj = (function (_this) {
			var options = _this.options,
				html = options.html,
				selectors = html.selectors,
				attrs = html.attrs,
				types = html.types;

			function destroy(box) {
				if (!box) {
					box = options.defaults.box;
				}

				$(box).find(selectors.passwordshowInit).each(function () {
					var self = $(this);

					_toggleOff(self);
					self.removeAttr(attrs.ready);
				});
			};

			function activate(box) {
				if (!box) {
					box = options.defaults.box;
				}

				$(box).find(selectors.passwordshowNotInit).each(function () {
					var self = $(this);

					_toggle(self);
					self.attr(attrs.ready, true);
				});
			};

			function _toggle(widget) {
				var input = widget.find(attrs.input);

				widget.find(attrs.btn)
					.on("mousedown.wdg.passwordshow", function () {
						input.attr("type", types.text);
					})
					.on("mouseup.wdg.passwordshow mouseout.wdg.passwordshow", function () {
						input.attr("type", types.password);
					});
			};

			function _toggleOff(widget) {

				widget.find(attrs.btn).off("mousedown.wdg.passwordshow mouseup.wdg.passwordshow mouseout.wdg.passwordshow");
			};

			return {
				init: activate,
				destroy: destroy
			}
		})(target.widgets.passwordshow);

		$.extend(target.widgets.passwordshow, obj);
	};

	$(function () {
		"use strict";
		_init();

		target.widgets.passwordshow.init();
	});

})(jQuery, window.app);
