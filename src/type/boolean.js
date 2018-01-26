export const IS_ACTIVE = true, IS_NOT_ACTIVE = false;

/**
 * Returns the value of given attribute as Boolean
 * @param {AccessibleNode} ay 
 * @param {String} attributeName 
 * @return {Boolean} attribute's value
 */
export function get(ay, attributeName) {
	var value = ay._.rawAttrs.attributeName || ay.element.getAttribute(attributeName);
	if(value == undefined ) return;
	return value  == "true" || false;
}

/**
 * Sync the new value to the property
 * @param {AccessibleNode} ay 
 * @param {String} attributeName 
 * @param {String | Boolean} status 
 */
export function set(ay, attributeName, status) {
	if(status == undefined) {
		ay.element.removeAttribute(attributeName);
	} else {
		ay.element.setAttribute(attributeName, status);
	}

	return status;
}

/**
* Returns the opposite state of the attribute
* @return {Boolean} New state
*/
export function toggle(state) {
	if (state == IS_ACTIVE) {
		state = IS_NOT_ACTIVE;
	} else {
		state = IS_ACTIVE;
	}
	return state;
}

export default { IS_ACTIVE, IS_NOT_ACTIVE, get, set, toggle };