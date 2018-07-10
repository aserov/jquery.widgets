/* 
 * jquery.widgets.texttransform.js
 *
 */

(function ($, target) {
	"use strict";

	target.widgets.texttransform = target.widgets.texttransform || {};

	target.widgets.texttransform.options = {
		enable: true && target.widgets.all.options.enable,
		defaults: {
			box: target.widgets.all.options.defaults.box
		},

		html: {
			selectors: {
				texttransform: "[data-widget-texttransform]",
				texttransformInit: "[data-widget-texttransform][data-widget-texttransform-ready]",
				texttransformNotInit: "[data-widget-texttransform]:not([data-widget-texttransform-ready])"
			},

			attrs: {
				ready: "data-widget-texttransform-ready",
				type: "data-widget-texttransform-type"
			},

			defaults: {
				type: {
					trim: "trim",
					upper: "upper",
					lower: "lower",
					capitalize: "capitalize",
					capitalizeAll: "capitalize-all",
					capitalizeTitle: "capitalize-title"
				},
				subtypes: {
					all: "all",
					title: "title"
				}
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

				$(box).find(selectors.texttransformInit).each(function () {
					var self = $(this);

					_toggleOff(self);
					self.removeAttr(attrs.ready);
				});
			};

			function activate(box) {
				if (!box) {
					box = options.defaults.box;
				}

				$(box).find(selectors.texttransformNotInit).each(function () {
					var self = $(this);

					_toggle(self);
					self.attr(attrs.ready, true);
				});
			};

			function _toggle(input) {
				var typeArr = input.attr(attrs.type).split(" ");

				for (var i = 0; i < typeArr.length; i++) {
					var t = typeArr[i];
					if (t.startsWith("blur")) {
						input.on("blur.wdg.texttransform", { type: t.replace("blur", "") }, _texttransformHandler);
					}
					else {
						input.on("change.wdg.texttransform keyup.wdg.texttransform keydown.wdg.texttransform paste.wdg.texttransform cut.wdg.texttransform", { type: t }, _texttransformHandler);
					}
				}
			};

			function _texttransformHandler(event) {
				var self = $(this);
				var types = defaults.type;

				switch (event.data.type) {

					case types.trim:
						_trim(self);
						break;

					case types.upper:
						_upper(self);
						break;

					case types.lower:
						_lower(self);
						break;

					case types.capitalize:
						_capitalize(self);
						break;

					case types.capitalizeAll:
						_capitalize(self, defaults.subtypes.all);
						break;

					case types.capitalizeTitle:
						_capitalize(self, defaults.subtype.title);
						break;
				}
			};

			function _toggleOff(input) {
				input.off("blur.wdg.texttransform change.wdg.texttransform keyup.wdg.texttransform keydown.wdg.texttransform paste.wdg.texttransform cut.wdg.texttransform");
			};

			function _trim(input) {

				input.val(input.val().trim());
			};

			function _upper(input) {

				input.val(input.val().toUpperCase());
			};

			function _lower(input) {
				input.val(input.val().toLocaleLowerCase());
			};

			function _capitalize(input, type) {
				input.val(input.val().capitalize(type));
			};

			return {
				init: activate,
				destroy: destroy
			};
		})(target.widgets.texttransform);

		$.extend(target.widgets.texttransform, obj);
	};

	$(function () {
		"use strict";
		_init();

		target.widgets.texttransform.init();
	});

})(jQuery, window.app);
