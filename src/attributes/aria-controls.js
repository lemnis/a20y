import * as idReferenceList from "./../utils/IDReferenceList.js";

/**
 * Gets and sets the `aria-controls` attribute.
 *
 * It reference other elements by ID
 * whose contents or presence are controlled by this element.
 *
 * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-controls}
 */
let AriaControls = (superclass) => class extends superclass {
	/**
	 * Returns / Sets the element's `aria-controls` attribute,
	 * containing a ID reference list
	 * @type	{string}
	 */
	get controls() {
		var attr = this.element.getAttribute("aria-controls");

		return idReferenceList.getElements(attr);
	}
	set controls(idReferenceList) {
		this.element.setAttribute("aria-controls", idReferenceList);
	}
};

export {AriaControls as default};
