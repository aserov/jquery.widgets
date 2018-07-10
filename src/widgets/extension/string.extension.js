/**
 * Method for text-transform.
 * @param {string} type. The type of transformation.
 * @returns {string}. The transform text.
 */
String.prototype.capitalize = function (type) {
	var str = this;

	switch (type) {
		case "all":
			return str.capitalizeAll();

		case "title":
			return str.capitalizeTitle();

		default:
			return str.capitaliseFirstLetter();
	}
};

/**
 * Capitalize title in string.
 * @returns {string}. The transform text.
 */
String.prototype.capitalizeTitle = function () {
	var str = this;
	var array = str.split(" ");
	var capitalized = "";
	var doNotCapitalize = ["a", "an", "and", "as", "at", "but", "by", "etc", "for", "in", "into", "is", "nor", "of", "off", "on", "onto", "or", "so", "the", "to", "unto", "via"];

	$.each(array, function (index, value) {

		if (index === 0 || $.inArray(value, doNotCapitalize) === -1) {
			capitalized += value.capitaliseFirstLetter();
		}
		else {
			capitalized += value;
		}

		if (array.length !== (index + 1)) {
			capitalized += " ";
		}
	});
	return capitalized;
}

/**
 * Capitalize all string.
 * @returns {string}. The transform text.
 */
String.prototype.capitalizeAll = function () {
	var str = this;

	var array = str.split(" ");
	var capitalized = "";

	$.each(array, function (index, value) {
		capitalized += value.charAt(0).toUpperCase() + value.slice(1);

		if (array.length !== (index + 1)) {
			capitalized += " ";
		}
	});
	return capitalized;
}

/**
 * Capitalize first letter in text.
 * @returns {string}. The transform text.
 */
String.prototype.capitaliseFirstLetter = function () {

	var str = this;
	return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * The format string value, use "{0} some text".format("here") => "here some text"
 * @returns {string}. The formatted text.
 */
String.prototype.format = function () {
	var args = (arguments.length === 1 && $.isArray(arguments[0])) ? arguments[0] : arguments;
	var formattedString = this;
	for (var i = 0; i < args.length; i++) {
		var pattern = new RegExp("\\{" + i + "\\}", "gm");
		formattedString = formattedString.replace(pattern, args[i]);
	}
	return formattedString;
};

/**
 * Exec function by string name.
 * @param {object} context. The context of function.
 * @returns {object} The result of apply function.
 */
String.prototype.execFunctionByName = function (context) {

	var functionName = this.toString();
	var args = [].slice.call(arguments).splice(1);

	if (!context) {
		args = [].slice.call(arguments).splice(0);
		context = window;
	}

	var namespaces = functionName.split(".");
	var func = namespaces.pop();
	for (var i = 0; i < namespaces.length; i++) {
		context = context[namespaces[i]];
	}

	return context[func].apply(context, args);
}
