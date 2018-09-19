export const IS_ACTIVE = "true", IS_NOT_ACTIVE = "false";

/**
* Returns the opposite state of the attribute,
* needed when attribute uses an token list
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

export default { IS_ACTIVE, IS_NOT_ACTIVE, toggle };