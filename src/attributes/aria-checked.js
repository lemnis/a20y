import * as state from "./../utils/state.js";

/**
* Adds functionality to `aria-checked` attribute.
*
* Changes value when clicked or while focused pressing `Space`.
*
* {@link https://www.w3.org/TR/wai-aria-1.1/#aria-checked}
* @emits click when clicked or while focused pressing `Space`.
* @emits change when clicked or while focused pressing `Space`.
*/
let AriaChecked = (superclass) => class extends superclass {

	/**
	* @param  {HTMLElement} element    Element to add functionality to
	* @param  {Object}      optional   Optional options
	*/
	constructor(...args){
		super(...args);

		this.element.addEventListener("click", this._onAriaChecked.bind(this));
		this.addKeyListener("space", this._onAriaChecked.bind(this));
	}

	/**
	 * Returns if the element attribute `aria-checked` is set to "true"
	 * @type	{string}
	 */
	get checked() {
		return state.get(this, "aria-checked");
	}
	set checked(val) {
		return state.set(this, "aria-checked", val);
	}

	// /**
	//  * Returns if the element attribute `aria-checked` is set to "mixed"
	//  * @type	{string}
	//  */
	// get indeterminate() {
	// 	return this.state == IS_MIXED;
	// }

	_onAriaChecked() {
		this.checked = state.toggle(this.checked);
		// this.emit("click", this);
		// this.emit("change", this);
	}
};

export default AriaChecked;