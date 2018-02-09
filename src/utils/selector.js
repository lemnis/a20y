import roles from "./../data/roles";

/**
 * Returns an css selector for a given role
 * @param {String} key Role name
 * @returns {String}
 */
export function getRole(key) {
	if (!roles[key]) return;

	return "[role='" + key + "']";
}

/**
 * Returns an array with all css selectors, implicit and explicit, for a given role
 * @param {String} key Role name
 * @returns {?Array};
 */
function getSelectorArray(key) {
	if (!roles[key]) return;

	let selector = [];
	selector.push(getRole(key));
	if (roles[key].implicit) selector = selector.concat(roles[key].implicit);
	return selector;
}

/**
 * Returns an complete css selector with implict elements for a given role
 * @param {String} key Role name
 * @returns {String}
 */
export function get(key) {
	return getSelectorArray(key).join(", ");
}

function getDeepRoleArray(key) {
	if (!roles[key]) return;

	let selector = [];
	selector.push(getRole(key));

	if (roles[key].sub) {
		roles[key].sub.forEach(val => selector.push(getRole(val)));
	}

	return selector;
}

export function getDeepRole(key) {
	return getDeepRoleArray(key).join(", ");
}

function getDeepSelectorArray(key) {
	if (!roles[key]) return;

	let selector = [];
	selector = selector.concat(getSelectorArray(key));

	if (roles[key].sub) {
		roles[key].sub.forEach(val => selector = selector.concat(getSelectorArray(val)));
	}

	return selector;
}

export function getDeep(key) {
	return getDeepSelectorArray(key).join(", ");
}

export function getOwns(key) {
	return roles[key].owns;
}

export default { getRole, get, getDeepRole, getDeep, getOwns };