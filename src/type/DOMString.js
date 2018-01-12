export const IS_ACTIVE = "true", IS_NOT_ACTIVE = "false";

export function get(ay, attributeName) {
	if(!ay.element.hasAttribute(attributeName)) return;
	return ay.element.getAttribute(attributeName);
}

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
* @return {String} New state
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