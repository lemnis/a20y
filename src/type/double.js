export function get(autotility, attributeName) {
	if(!autotility.element.hasAttribute(attributeName)) return null;

	var attrValue = autotility.element.getAttribute(attributeName);
	if(attrValue === null) return null;

	return Number(attrValue);
}

export function set(autotility, attributeName, str) {
	if(str == null) {
		autotility.element.removeAttribute(attributeName);
	} else {
		autotility.element.setAttribute(attributeName, str);
	}
}

export default { get, set };