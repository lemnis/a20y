import * as state from "./../utils/state.js";
// import mix from "@vestergaard-company/js-mixin";

/**
 * gets and sets the `aria-selected` attribute.
 *
 * Indicates if a element is selectable
 *
 * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-selected}
 */
let AriaSelected = (superclass) => class extends superclass {

	/**
	* @param  {HTMLElement} element    Element with a aria-selected attribute
	*/
	constructor(...args){
		super(...args);

		this.element.addEventListener("click", this._onAriaSelected.bind(this));
		this.addKeyListener("space", this._onAriaSelected.bind(this));
		this.addKeyListener("enter", this._onAriaSelected.bind(this));
	}

	/**
	 * Returns / Sets the element's `aria-selected` attribute,
	 * Indicates whether the option is currently selected.
	 * @type	{string}
	 */
	get selected() {
		return state.get(this, "aria-selected");
	}
	set selected(val) {
		return state.set(this, "aria-selected", val);
	}

	_onAriaSelected() {
		this.selected = state.toggle(this.selected);
	}
};

export default AriaSelected;