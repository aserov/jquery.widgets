/**
 * Parse value to boolean.
 * @param {object} val. The value for parse to boolean type.
 * @returns {boolean}. The result.
 */
Boolean.parse = function (val) {

	var falsy = /^(?:f(?:alse)?|no?|0+)$/i;
	return !falsy.test(val) && !!val;
};