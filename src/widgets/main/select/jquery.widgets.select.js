/* 
 * jquery.widgets.select.js
 *
 */

(function ($, target) {
	"use strict";

	target.widgets.select = target.widgets.select || {};

	target.widgets.select.options = {
		enable: true && target.widgets.all.options.enable,
		defaults: {
			box: target.widgets.all.options.defaults.box
		},

		html: {
			selectors: {
				select: "[data-widget-select]",
				selectInit: "[data-widget-select][data-widget-select-ready]",
				selectNotInit: "[data-widget-select]:not([data-widget-select-ready])"
			},

			attrs: {
				ready: "data-widget-select-ready",

				language: "data-widget-select-language",
				placeholder: "data-widget-select-placeholder",
				allowClear: "data-widget-select-allowclear",
				minLength: "data-widget-select-minlength",

				ajax: {
					apply: "data-widget-select-ajax-apply",

					url: "data-widget-select-ajax-url",
					delay: "data-widget-select-ajax-delay",
					cache: "data-widget-select-ajax-cache",

					perPage: "data-widget-select-ajax-perpage"
				}
			},

			defaults: {
				language: moment.locale(),
				allowClear: true,
				placeholder: " ",
				minLength: 1,

				ajax: {
					delay: 500,
					cache: true,
					dataType: "json"
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

				$(box).find(selectors.selectInit).each(function () {
					var self = $(this);

					self.select2("destroy");
					self.removeAttr(attrs.ready);
				});
			};

			function activate(box) {
				if (!box) {
					box = options.defaults.box;
				}

				$(box).find(selectors.selectNotInit).each(function () {
					var self = $(this);

					var opt = {
						language: self.attr(attrs.language) || defaults.language,
						allowClear: Boolean.parse(self.attr(attrs.allowClear)) || defaults.allowClear,
						placeholder: self.attr(attrs.placeholder) || defaults.placeholder,
						width: "resolve",

						minimumInputLength: self.attr(attrs.minLength) || defaults.minLength
					};

					if (Boolean.parse(self.attr(attrs.ajax.apply))) {

						var ajaxSetting = attrs.ajax;
						var defaultAjaxSetting = defaults.ajax;

						opt.ajax = {
							url: self.attr(ajaxSetting.url),
							dataType: defaultAjaxSetting.dataType,

							data: function (params, page) {

								var queryParams = {
									q: params.term
								}

								var perPage = _getPerPage(self);
								if (!!perPage) {
									queryParams.page = params.page || 1;
									queryParams.perPage = perPage;
								}

								return queryParams;
							},

							processResults: function (data, params) {

								var results = {
									results: $.map(data.Items,
										function (item) {
											return {
												text: item.Text,
												id: item.Value,
												selected: item.Selected,
												disabled: item.Disabled
											}
										})
								};

								if (!!data.PerPage) {
									results.pagination = {
										more: (data.Page * data.PerPage) < data.Total
									};
								}

								return results;
							},

							delay: self.attr(ajaxSetting.delay) || defaultAjaxSetting.delay,
							cache: self.attr(ajaxSetting.cache) || defaultAjaxSetting.cache
						};
					}

					self.select2(opt);
					self.on("change",
						function (event) {
							var select = $(this);

							if (select.parents("form").length > 0) {
								select.valid();
							}
						});

					self.attr(attrs.ready, true);
				});
			};

			function _getPerPage(select) {

				return parseInt(select.attr(attrs.ajax.perPage), 10);
			};

			return {
				init: activate,
				destroy: destroy
			}
		})(target.widgets.select);

		$.extend(target.widgets.select, obj);
	};

	$(function () {
		"use strict";
		_init();

		target.widgets.select.init();
	});

})(jQuery, window.app);
