/* 
 * jquery.widgets.datetimepicker.js
 *
 * External library:
 * bootstrap-datetimejs v4.17.45
 * https://github.com/Eonasdan/bootstrap-datetimepicker
 * Copyright (c) 2015 Jonathan Peterson
 */

(function ($, target) {
	"use strict";

	target.widgets.datetimepicker = target.widgets.datetimepicker || {};

	target.widgets.datetimepicker.options = {
		enable: true && target.widgets.all.options.enable,
		defaults: {
			box: target.widgets.all.options.defaults.box
		},

		html: {
			selectors: {
				datetimepicker: "[data-widget-datetimepicker]",
				datetimepickerInit: "[data-widget-datetimepicker][data-widget-datetimepicker-ready]",
				datetimepickerNotInit: "[data-widget-datetimepicker]:not([data-widget-datetimepicker-ready])"
			},

			attrs: {
				ready: "data-widget-datetimepicker-ready",

				showClear: "data-widget-datetimepicker-show-clear",
				showToday: "data-widget-datetimepicker-show-today",

				locale: "data-widget-datetimepicker-locale",
				minDateToday: "data-widget-datetimepicker-min-date-today",

				pickTime: "data-widget-datetimepicker-pick-time"
			},

			additionals: {
				externalName: "DateTimePicker"
			},

			defaults: {
				showClear: true,
				showToday: true,

				locale: moment.locale(),
				minDateToday: false,

				pickTime: true,

				formatDate: "L",
				formatDateTime: "L LT"
			}
		}
	};

	function _init() {

		var obj = (function(_this) {
			var options = _this.options,
				html = options.html,
				selectors = html.selectors,
				attrs = html.attrs,
				defaults = html.defaults,
				additionals = html.additionals;

			function destroy(box) {
				if (!box) {
					box = options.defaults.box;
				}

				$(box).find(selectors.datetimepickerInit).each(function() {
					var self = $(this);

					self.data(additionals.extenalName).destroy();
					self.removeAttr(attrs.ready);
				});
			};

			function activate(box) {
				if (!box) {
					box = options.defaults.box;
				}

				$(box).find(selectors.datetimepickerNotInit).each(function() {
					var self = $(this);

					var opts = {
						format: Boolean.parse(self.attr(attrs.pickTime) || defaults.pickTime)
							? defaults.formatDateTime
							: defaults.formatDate,
						showClear: Boolean.parse(self.attr(attrs.showClear) || defaults.showClear),
						showTodayButton: Boolean.parse(self.attr(attrs.showToday) || defaults.showToday),
						locale: self.attr(attrs.locale) || defaults.locale
					};
					if (Boolean.parse(self.attr(attrs.minDateToday) || defaults.minDateToday)) {
						opts.minDate = moment();
					};

					self.datetimepicker(opts);
					self.attr(attrs.ready, true);
				});
			};

			return {
				init: activate,
				destroy: destroy
			}
		})(target.widgets.datetimepicker);

		$.extend(target.widgets.datetimepicker, obj);
	};

	$(function () {
		"use strict";
		_init();

		target.widgets.datetimepicker.init();
	});

})(jQuery, window.app);
