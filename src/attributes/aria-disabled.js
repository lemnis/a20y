/**
 * gets and sets the `aria-disabled` attribute.
 *
 * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-disabled}
 */
let AriaDisabled = (superclass) => class extends superclass {
	/**
	 * Returns / Sets the element's `aria-disabled` attribute,
	 * indicating that the control is not available for interaction.
	 *
	 * When no value is set it will return `false`.
	 * @type	{Boolean}
	 */
	get disabled() {
		return this.element.getAttribute("aria-disabled")  == "true" || false;
	}
	set disabled(status) {
		this.element.setAttribute("aria-disabled", status);
	}
};

export default AriaDisabled;
