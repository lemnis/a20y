import create from "./create";
import getComputedRole from "./getComputedRole";

var ayInstances = new WeakMap();

// todo: loop through presentational roles
export function getParent(ay, role) {
	if(ay.element.parentNode.getAttribute("role").toLowerCase() == role) {
		if(ayInstances.has(ay.element.parentNode)) {
			return ayInstances.get(ay.element.parentNode);
		} else {
			return create.one(ay.element.parentNode);
		}
	} else {
		return false;
	}
}

/** @todo find only `direct` children */
export function getChildren(ay, role) {
	var results = [];
	var owns = Array.from(ay.element.children).concat(ay.owns);

	owns.forEach(child => {
		if (!role || (role && getComputedRole(child) == role)) {
			if (ayInstances.has(child)) {
				results.push(ayInstances.get(child));
			} else {
				results.push(create.one(child));
			}
		}
	});

	return owns;
}

export function getPrev(child, parent, role) {
	if(!parent) return false;

	let children = getChildren(parent, role);
	let indexPrevElement = Array.prototype.indexOf.call(children, child) - 1;
	if(indexPrevElement < 0) return false;

	return children[indexPrevElement];
}

export function getNext(child, parent, role) {
	if(!parent) return false;

	let children = getChildren(parent, role);
	let indexNext = Array.prototype.indexOf.call(children, child) + 1;
	if(indexNext >= children.length) return false;

	return children[indexNext];
}

export function getStart(child, parent, role) {
	if(!parent) return false;
	let children = getChildren(parent, role);
	return children[0];
}

export function getEnd(child, parent, role) {
	if(!parent) return false;
	let children = getChildren(parent, role);
	return children[children.length - 1];
}

export default {
	map: ayInstances,
	get: ayInstances.get.bind(ayInstances),
	set: ayInstances.set.bind(ayInstances),
	has: ayInstances.has.bind(ayInstances),
	getChildren,
	getParent,
	getPrev,
	getNext,
	getStart,
	getEnd
};