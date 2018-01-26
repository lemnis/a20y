/**
 * Returns the value of a given attribute as Number
 * @param {AccessibleNode} ay 
 * @param {String} attributeName 
 * @return {Number} attribute's value
 */
export function get(ay, attributeName) {
	var value = ay._.rawAttrs.attributeName || ay.element.getAttribute(attributeName);
	if (value == undefined) return;
	return Number(value);
}

/**
 * Sync the new value to the DOM
 * @param {AccessibleNode} ay 
 * @param {String} attributeName 
 * @param {String | Number } status 
 */
export function set(ay, attributeName, str) {
	if(str == null) {
		ay.element.removeAttribute(attributeName);
	} else {
		ay.element.setAttribute(attributeName, str);
	}
}

export default { get, set };