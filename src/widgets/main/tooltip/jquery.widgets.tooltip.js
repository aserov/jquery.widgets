/* 
 * jquery.widgets.tooltip.js
 *
 */

(function ($, target) {
	"use strict";

	target.widgets.tooltip = target.widgets.tooltip || {};

	target.widgets.tooltip.options = {
		enable: true && target.widgets.all.options.enable,
		defaults: {
			box: target.widgets.all.options.defaults.box
		},

		html: {
			selectors: {
				tooltip: "[data-widget-tooltip]",
				tooltipInit: "[data-widget-tooltip][data-widget-tooltip-ready]",
				tooltipNotInit: "[data-widget-tooltip]:not([data-widget-tooltip-ready])"
			},

			attrs: {
				ready: "data-widget-tooltip-ready",

				container: "data-widget-tooltip-container",
				placement: "data-widget-tooltip-placement",

				role: "[role='tooltip']"
			},

			additionals: {
				tooltipClass: ".tooltip"
			},

			defaults: {
				container: "body",
				placement: "top"
			}
		}
	};

	function _init() {

		var obj = (function (_this) {
			var options = _this.options,
				html = options.html,
				selectors = html.selectors,
				attrs = html.attrs,
				additionals = html.additionals,
				defaults = html.defaults;

			function destroy(box) {
				if (!box) {
					box = options.defaults.box;
				}

				$(box).find(selectors.tooltipInit).each(function () {
					var self = $(this);

					self.tooltip("destroy");
					self.removeAttr(attrs.ready);
				});
			};

			function activate(box) {
				if (!box) {
					box = options.defaults.box;
				}

				$(additionals.tooltipClass).remove();
				$(box).find(selectors.tooltipNotInit).each(function () {
					var self = $(this);

					self.tooltip({
						container: self.attr(attrs.container) || defaults.container,
						placement: self.attr(attrs.placement) || defaults.placement
					});

					self.on("click", function () {
						$(attrs.role).tooltip("hide");
					});

					self.attr(attrs.ready, true);
				});
			};

			return {
				init: activate,
				destroy: destroy
			}
		})(target.widgets.tooltip);

		$.extend(target.widgets.tooltip, obj);
	};

	$(function () {
		"use strict";
		_init();

		target.widgets.tooltip.init();
	});

})(jQuery, window.app);
