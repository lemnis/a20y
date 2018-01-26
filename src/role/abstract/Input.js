import mix from "@vestergaard-company/js-mixin";

import selector from "./../../utils/selector";
import elements from "./../../utils/elements";

import Widget from "./Widget";
import Validation from "./../../mixins/Validation";

/**
 * @extends Widget
 * @mixes Validation
 * @abstract
 */
class Input extends mix(Widget).with(Validation) {
	/**
	 * @alias Input:constructor
 	 * @param {Regex} [options.input.pattern] Regex to check against when validating
	 */
	constructor(...args) {
		super(...args);

		this._.registerCustomElement("input.pattern");
	}

	/* Polyfill of native properties */

	/**
	 * Returns a reference to the parent form element
	 * @returns {AccessibleNode} {@link Form}
	 */
	get form() {
		return elements.getParent(this, selector.getDeep("form"));
	}

	/**
	 * Returns the first element pointed by the {@link AccessibleNode#controls} property.
	 * The property may be null if no HTML element found in the same tree.
	 * @returns {AccessibleNode} {@link Listbox}
	 */
	get list() {
		return this.controls.find(ay => ay.element.matches(selector.get("listbox")));
	}

	// formAction	string: Returns / Sets the element's formaction attribute,containing the URI of a
	// program that processes information submitted by the element. This overrides the action attribute
	// of the parent form.

	// formEncType	string: Returns / Sets the element's formenctype attribute, containing the type of
	// content that is used to submit the form to the server. This overrides the enctype attribute of 
	// the parent form.
	
	// formMethod	string: Returns / Sets the element's formmethod attribute, containing the HTTP method
	// that the browser uses to submit the form. This overrides the method attribute of the parent form.

	// formNoValidate	boolean: Returns / Sets the element's formnovalidate attribute, indicating that
	// the form is not to be validated when it is submitted. This overrides the novalidate attribute
	// of the parent form.

	// formTarget	string: Returns / Sets the element's formtarget attribute, containing a name or
	// keyword indicating where to display the response that is received after submitting the form.
	// This overrides the target attribute of the parent form.
}

export default Input;
