export const IS_ACTIVE = "true", IS_MIXED = "mixed", IS_NOT_ACTIVE = "false";

/**
 * Returns / Sets the element's attribute state
 *
 * When no value is set it will return `"false"`.
 * @type	{string}
 */
export function get(autotility, attributeName){
	let val;

	if(autotility.element.getAttribute(attributeName) == "true"){
		val = IS_ACTIVE;
	} else if(this.isTristate == true && autotility.element.getAttribute(attributeName) == "mixed"){
		val = IS_MIXED;
	} else {
		val = IS_NOT_ACTIVE;
	}

	return val;
}

export function set(autotility, attributeName, val){
	if(val == IS_ACTIVE){
		autotility.element.setAttribute(attributeName, true);
	} else if(this.isTristate == true && val == IS_MIXED){
		autotility.element.setAttribute(attributeName, "mixed");
	} else {
		autotility.element.setAttribute(attributeName, false);
	}

	return val;
}

/**
* Toggles the state of the attribute
* @return {String} New state
*/
export function	toggle(state){
	if(state == IS_ACTIVE){
		state = IS_NOT_ACTIVE;
	} else {
		state = IS_ACTIVE;
	}
	return state;
}