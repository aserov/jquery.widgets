/* 
 * jquery.widgets.clearbutton.js
 *
 */

/*
Need to add the following css to hide clear button for IE >= 10, Edge.
See https://developer.mozilla.org/en-US/docs/Web/CSS/::-ms-clear

[data-widget-clearbutton] [data-widget-clearbutton-input]::-ms-clear {
	display: none;
}
[data-widget-clearbutton] [data-widget-clearbutton-input] {
	padding-right: 32px;
	border-radius: 4px;
}
[data-widget-clearbutton-btn] {
	z-index: 1000;
	pointer-events: auto;
	cursor: pointer;
}
*/

(function ($, target) {
	"use strict";

	target.widgets.clearbutton = target.widgets.clearbutton || {};

	target.widgets.clearbutton.options = {
		enable: true && target.widgets.all.options.enable,
		defaults: {
			box: target.widgets.all.options.defaults.box
		},

		html: {
			selectors: {
				clearbutton: "[data-widget-clearbutton]",
				clearbuttonInit: "[data-widget-clearbutton][data-widget-clearbutton-ready]",
				clearbuttonNotInit: "[data-widget-clearbutton]:not([data-widget-clearbutton-ready])"
			},

			attrs: {
				ready: "data-widget-clearbutton-ready",

				input: "[data-widget-clearbutton-input]",
				btn: "[data-widget-clearbutton-btn]"
			}
		}
	};

	function _init() {

		var obj = (function (_this) {
			var options = _this.options,
				html = options.html,
				selectors = html.selectors,
				attrs = html.attrs;

			function destroy(box) {
				if (!box) {
					box = options.defaults.box;
				}

				$(box).find(selectors.clearbuttonInit).each(function () {
					var self = $(this);

					_toggleOff(self);
					self.removeAttr(attrs.ready);
				});
			};

			function activate(box) {
				if (!box) {
					box = options.defaults.box;
				}

				$(box).find(selectors.clearbuttonNotInit).each(function () {
					var self = $(this);

					_toggle(self);
					self.attr(attrs.ready, true);
				});
			};

			function _toggle(widget) {

				_propertychange(widget);
				_click(widget);
				_focus(widget);
			};

			function _toggleOff(widget) {

				_propertychangeOff(widget);
				_clickOff(widget);
			};

			function _propertychange(box) {

				box.find(attrs.input).on("input.wdg.clearbutton propertychange.wdg.clearbutton", function () {
					var self = $(this);
					self.siblings(attrs.btn).toggleClass("hidden", !Boolean(self.val()));
				}).trigger("propertychange.wdg.clearbutton");
			};

			function _propertychangeOff(box) {

				box.find(attrs.input).off("input.wdg.clearbutton propertychange.wdg.clearbutton");
			};

			function _click(box) {

				box.find(attrs.btn).on("click.wdg.clearbutton", function () {
					var self = $(this);
					self.siblings(attrs.input).val("").trigger("propertychange.wdg.clearbutton").focus();
				});
			};

			function _clickOff(box) {

				box.find(attrs.btn).off("click.wdg.clearbutton");
			};

			function _focus(box) {

				box.find(attrs.input)
					.focusout(function (e) {
						var self = $(this);
						if (!box.attr(attrs.ready)) {
							return;
						}

						setTimeout(function () {
							self.siblings(attrs.btn).addClass("hidden");
						},
						200);
					})
					.focusin(function () {
						var self = $(this);
						if (!box.attr(attrs.ready)) {
							return;
						}

						self.siblings(attrs.btn).toggleClass("hidden", !Boolean(self.val()));
					});
			};

			return {
				init: activate,
				destroy: destroy
			};
		})(target.widgets.clearbutton);

		$.extend(target.widgets.clearbutton, obj);
	};

	$(function () {
		"use strict";
		_init();

		target.widgets.clearbutton.init();
	});

})(jQuery, window.app);
