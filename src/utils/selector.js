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

function getChildren(key) {
	let owns = roles[key].owns;
	
	// check if element owns any children
	if(owns) {
		// strip keys, from { any: [a, b], all: [c, d]} to [a, b, c, d]
		// var allowedRoles = [].concat(...Object.values(owns));
		var result = [];

		// get all owned elements of the children
		owns.forEach((role, i) => {
			var childRoles = getChildren(role);
			if(childRoles.length > 0) {
				// add child roles
				result = result.concat(childRoles);

				//remove parent role
				owns.splice(i, 1);
			}
		});

		owns = owns.concat(result);
		return owns;
	} else {
		return [];
	}
}

export function getDeepOwns(key) {
	let owns = roles[key].owns;
	if(!owns) return;

	return getChildren(key);
}

export default { getRole, get, getDeepRole, getDeep, getOwns, getDeepOwns };