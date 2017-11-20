import * as state from "./../utils/State.js";

/**
* Adds functionality to `aria-pressed` attribute.
*
* Changes value when clicked or while focused pressing `Space` or `Enter`.
*
* {@link https://www.w3.org/TR/wai-aria-1.1/#aria-pressed}
* @emits click when clicked or while focused pressing `Space` or `Enter`.
*/
let AriaPressed = (superclass) => class extends superclass {

	/**
	* @param  {HTMLElement} element Element with an `aria-pressed` attribute
	*/
	constructor(...args){
		super(...args);

		this.element.addEventListener("click", this._onAriaPressed.bind(this));
		this.addKeyListener("enter", this._onAriaPressed.bind(this));
		this.addKeyListener("space", this._onAriaPressed.bind(this));
	}

	/**
	 * Returns the element's `aria-pressed` attribute,
	 * indicating the current "pressed" state of toggle buttons.
	 *
	 * When no value is set it will return `"false"`.
	 * @type	{string}
	 */
	get pressed() {
		return state.get(this, "aria-pressed");
	}
	set pressed(val) {
		return state.set(this, "aria-pressed", val);
	}

	_onAriaPressed() {
		this.pressed = state.toggle(this.pressed);
	}
};

export default AriaPressed;