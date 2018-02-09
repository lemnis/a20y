/**
 * Scrolls an element into its parent view
 * @param {Element} child Element to show
 */
function scrollIntoView(child) {
	let parent = child.offsetParent;
	if (parent && parent.scrollHeight > parent.clientHeight) {
		var scrollBottom = parent.clientHeight + parent.scrollTop;
		var elementBottom = child.offsetTop + child.offsetHeight;
		if (elementBottom > scrollBottom) {
			parent.scrollTop = elementBottom - parent.clientHeight;
		} else if (child.offsetTop < parent.scrollTop) {
			parent.scrollTop = child.offsetTop;
		}
	}
}

/**
 * Adds focus to the first element
 * @param {Array} descendants Array of all descendants
 */
function start(descendants) {
	return add(descendants[0]);
}

/**
 * Adds focus to the prev element
 * @param {Array} descendants Array of all descendants
 * @param {Object} 	child 			Current focused element
 */
function prev(descendants, child) {
	// find index of current element
	let i = descendants.indexOf(child);
	if(i <= 0) i = 1;

	return add(descendants[i - 1]);
}

/**
 * Adds focus to the next element
 * @param {Array} 	descendants Array of all descendants
 * @param {Object} 	child 			Current focused element
 */
function next(descendants, child) {
	// find index of current element
	let i = descendants.indexOf(child);
	if (i > descendants.length - 2) i = descendants.length - 2;

	return add(descendants[i + 1]);
}

/**
 * Adds focus to the last element
 * @param {Array} descendants Array of all descendants
 */
function end(descendants) {
	return add(descendants[descendants.length - 1]);
}

function add(child) {
	child._node.classList.add("ay-hover");
	scrollIntoView(child._node);
	return child;
}

function remove(child) {
	child._node.classList.remove("ay-hover");	
	return child;
}

function get(descendants) {
	let ay = descendants.find(aom => aom._node.classList.contains("ay-hover"));
	if(!ay) return descendants[0];
	return ay;
}

function setSelected(ay, val) {
	ay.selected = val;
}

function getDescendants(ay) {

}

export default {
	start,
	prev,
	next,
	end,
	add,
	remove,
	get,
	setSelected,
	getDescendants
};