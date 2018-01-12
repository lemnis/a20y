import DOMString from "./../type/DOMString";

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
	constructor(...args) {
		super(...args);

		if(this.pressed !== undefined) { // todo: add when first time aria-pressed is boolean
			this.addListener("click", this.onPressed.bind(this));
			this.addListener("key", this.onPressed.bind(this), { key: ["enter", "space"]});
		}
	}

	onPressed(ev) {
		if (typeof super.onPressed == "function") super.onPressed(ev);

		if(this.disabled !== true) {
			this.pressed = DOMString.toggle(this.pressed);
		}
	}
};

export default AriaPressed;