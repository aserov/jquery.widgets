/* 
 * jquery.widgets.popover.js
 *
 */

(function ($, target) {
	"use strict";

	target.widgets.popover = target.widgets.popover || {};

	target.widgets.popover.options = {
		enable: true && target.widgets.all.options.enable,
		defaults: {
			box: target.widgets.all.options.defaults.box
		},

		html: {
			selectors: {
				popover: "[data-widget-popover]",
				popoverInit: "[data-widget-popover][data-widget-popover-ready]",
				popoverNotInit: "[data-widget-popover]:not([data-widget-popover-ready])"
			},

			attrs: {
				ready: "data-widget-popover-ready",

				placement: "data-widget-popover-placement",
				html: "data-widget-popover-html",
				container: "data-widget-popover-container",
				trigger: "data-widget-popover-trigger",

				content: "data-widget-popover-content",
				title: "data-widget-popover-title",
				tabindex: "data-widget-popover-tabindex",

				describedBy: "aria-describedby"
			},

			defaults: {
				placement: "top",
				html: true,
				container: "body",
				trigger: "focus"
			}
		}
	};

	function _init() {

		var obj = (function (_this) {
			var options = _this.options,
				html = options.html,
				selectors = html.selectors,
				attrs = html.attrs,
				defaults = html.defaults;

			function destroy(box) {
				if (!box) {
					box = options.defaults.box;
				}

				$(box).find(selectors.popoverInit).each(function () {
					var self = $(this);

					self.popover("destroy");
					self.removeAttr(attrs.ready);
				});
			};

			function activate(box) {
				if (!box) {
					box = options.defaults.box;
				}

				$(box).find(selectors.popoverNotInit).each(function () {
					var self = $(this);

					self.popover({
						placement: self.attr(attrs.placement) || defaults.placement,
						html: Boolean.parse(self.attr(attrs.html) || defaults.html),
						container: self.attr(attrs.container) || defaults.container,

						tabindex: self.attr(attrs.tabindex),
						trigger: self.attr(attrs.trigger) || defaults.trigger,

						title: self.attr(attrs.title),
						content: self.attr(attrs.content)
					});

					_showPopover(self);
					_hiddenPopover(self);

					self.attr(attrs.ready, true);
				});
			};

			function _showPopover(box, callback) {

				box.on("shown.bs.popover", function () {
					var self = $(this);

					var container = $("#" + self.attr(attrs.describedBy));
					target.widgets.all.register(container);

					if (callback) {
						callback(self);
					}
				});
			};

			function _hiddenPopover(box, callback) {

				box.on("hidden.bs.popover", function () {
					var self = $(this);

					if (callback) {
						callback(self);
					}
				});
			};

			return {
				init: activate,
				destroy: destroy
			};
		})(target.widgets.popover);

		$.extend(target.widgets.popover, obj);
	};

	$(function () {
		"use strict";
		_init();

		target.widgets.popover.init();
	});

})(jQuery, window.app);
