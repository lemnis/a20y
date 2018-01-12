export function get(ay, attributeName) {
	if (!ay.element.hasAttribute(attributeName)) return null;

	var attrValue = ay.element.getAttribute(attributeName);
	if (attrValue === null) return null;

	return Number(attrValue);
}

export function set(ay, attributeName, str) {
	if (str == null) {
		ay.element.removeAttribute(attributeName);
	} else {
		ay.element.setAttribute(attributeName, str);
	}
}

export default { get, set };