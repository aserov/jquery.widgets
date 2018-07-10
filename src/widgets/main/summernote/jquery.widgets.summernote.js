/* 
 * jquery.widgets.summernote.js
 * 
 * External library: 
 * Super simple wysiwyg editor v0.8.10
 * https://summernote.org
 */

(function ($, target) {
	"use strict";

	target.widgets.summernote = target.widgets.summernote || {};

	target.widgets.summernote.options = {
		enable: true && target.widgets.all.options.enable,
		defaults: {
			box: target.widgets.all.options.defaults.box
		},

		html: {
			selectors: {
				summernote: "[data-widget-summernote]",
				summernoteInit: "[data-widget-summernote][data-widget-summernote-ready]",
				summernoteNotInit: "[data-widget-summernote]:not([data-widget-summernote-ready])"
			},

			attrs: {
				ready: "data-widget-summernote-ready",

				height: "data-widget-summernote-height",
				minHeight: "data-widget-summernote-minheight",
				maxHeight: "data-widget-summernote-maxheight",

				lang: "data-widget-summernote-lang"
			},

			defaults: {
				height: 300,
				minHeight: null,
				maxHeight: null,

				lang: "en-US"
			}
		}
	};

	function _init() {

		var obj = (function(_this) {
			var options = _this.options,
				html = options.html,
				selectors = html.selectors,
				attrs = html.attrs,
				defaults = html.defaults;

			function destroy(box) {
				if (!box) {
					box = options.defaults.box;
				}

				$(box).find(selectors.summernoteInit).each(function () {
					var self = $(this);

					self.summernote("destroy");
					self.removeAttr(attrs.ready);
				});
			};

			function activate(box) {
				if (!box) {
					box = options.defaults.box;
				}

				$(box).find(selectors.summernoteNotInit).each(function () {
					var self = $(this);

					self.summernote({
						height: parseInt(self.attr(attrs.height)) || defaults.height,
						minHeight: self.attr(attrs.minHeight) || defaults.minHeight,
						maxHeight: self.attr(attrs.maxHeight) || defaults.maxHeight,
						lang: self.attr(attrs.lang) || defaults.lang,
						focus: true,
						toolbar: [
							["style",
								["style"]
							],
							["font",
								["bold", "italic", "underline", "clear"]
							],
							["fontname",
								["fontname"]
							],
							["fontsize",
								["fontsize"]
							],
							["color",
								["color"]
							],
							["para",
								["ul", "ol", "paragraph"]
							],
							["height",
								["height"]
							],
							["table",
								["table"]
							],
							["view",
								["fullscreen", "codeview"]
							]
						]
					});

					target.widgets.tooltip.init();
					self.attr(attrs.ready, true);
				});
			}

			return {
				init: activate,
				destroy: destroy
			};
		})(target.widgets.summernote);

		$.extend(target.widgets.summernote, obj);
	};

	$(function () {
		"use strict";
		_init();

		target.widgets.summernote.init();
	});

})(jQuery, window.app);
