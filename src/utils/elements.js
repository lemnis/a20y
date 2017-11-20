export var storedElements = new WeakMap();

// todo: loop through presentational roles
export function getParent(autotility, role) {
	if(autotility.element.parentNode.getAttribute("role").toLowerCase() == role) {
		if(storedElements.has(autotility.element.parentNode)) {
			return storedElements.get(autotility.element.parentNode);
		} else {
			// todo: create new instance and return that .
			return false;
		}
	} else {
		return false;
	}
}

// todo: find only `direct` children
export function getChildren(autotility, role) {
	let children = autotility.element.querySelectorAll(`[role="${role}"]`);
	var childInstances = [];

	for (let child of children) {
		if(storedElements.has(child)) {
			childInstances.push(storedElements.get(child));
		} else {
			// todo: create new instance and return that .
		}
	}

	return childInstances;
}


export function getPrev(autotility, parentRole, role) {
	let parent = getParent(autotility, parentRole);
	if(!parent) return false;

	let children = getChildren(parent, role);
	let indexPrevElement = Array.prototype.indexOf.call(children, autotility) - 1;
	if(indexPrevElement < 0) return false;

	return children[indexPrevElement];
}

export function getNext(autotility, parentRole, role) {
	let parent = getParent(autotility, parentRole);
	if(!parent) return false;

	let children = getChildren(parent, role);
	let indexNext = Array.prototype.indexOf.call(children, autotility) + 1;
	if(indexNext >= children.length) return false;

	return children[indexNext];
}

export function getStart(autotility, parentRole, role) {
	let parent = getParent(autotility, parentRole);
	if(!parent) return false;
	let children = getChildren(parent, role);
	return children[0];
}

export function getEnd(autotility, parentRole, role) {
	let parent = getParent(autotility, parentRole);
	if(!parent) return false;
	let children = getChildren(parent, role);
	return children[children.length - 1];
}