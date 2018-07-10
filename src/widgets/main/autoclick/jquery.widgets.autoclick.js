/* 
 * jquery.widgets.autoclick.js
 *
 */

(function ($, target) {
	"use strict";

	target.widgets.autoclick = target.widgets.autoclick || {};

	target.widgets.autoclick.options = {
		enable: true && target.widgets.all.options.enable,
		defaults: {
			box: target.widgets.all.options.defaults.box
		},

		html: {
			selectors: {
				autoclick: "[data-widget-autoclick]",
				autoclickInit: "[data-widget-autoclick]([data-widget-autoclick-ready])",
				autoclickNotInit: "[data-widget-autoclick]:not([data-widget-autoclick-ready])"
			},

			attrs: {
				ready: "data-widget-autoclick-ready",
				href: "data-widget-autoclick-href",
				delay: "data-widget-autoclick-delay",
				type: "data-widget-autoclick-type",
				reload: "data-widget-autoclick-reload",
				apply: "data-widget-autoclick-apply",

				defaultHref: "href"
			},

			defaults: {
				delay: {
					button: 1000,
					link: 1000
				},

				type: "button",
				reload: false,
				apply: false
			},

			types: {
				button: "button",
				link: "link"
			}
		}
	};

	function _init() {

		var obj = (function (_this) {
			var options = _this.options,
				html = options.html,
				selectors = html.selectors,
				attrs = html.attrs,
				defaults = html.defaults,
				types = html.types;

			function activate(box) {

				if (!box) {
					box = document;
				}

				$(box).find(selectors.autoclickNotInit).each(function () {
					var self = $(this);

					if (Boolean.parse(self.attr(attrs.apply) || defaults.apply)) {
						var type = self.attr(attrs.type) || defaults.type;
						var href = self.attr(attrs.href) || self.attr(attrs.defaultHref);

						_click(self, type, href);
					}

					self.attr(attrs.ready, true);
				});
			};

			function _click(elem, type, href) {

				var time = elem.attr(attrs.delay) || defaults.delay[type];
				time = parseInt(time);

				switch (type) {
					case types.button:
						_clickButton(elem, time);
						break;

					case types.link:
						_clickLink(elem, time, href);
						break;

					default:
				}
			};

			function _clickButton(elem, time) {

				setTimeout(function () {

					elem[0].click();
				}, time);
			};

			function _clickLink(elem, time, href) {

				setTimeout(function () {

					window.location.href = href;
				}, time);
			}

			return {
				init: activate
			};
		})(target.widgets.autoclick);

		$.extend(target.widgets.autoclick, obj);
	};

	$(function () {
		"use strict";
		_init();

		target.widgets.autoclick.init();
	});

})(jQuery, window.app);
