import DOMString from "./../type/DOMString.js";

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

	constructor(...args) {
		super(...args);

		this.addEventListener("key", this.onChecked.bind(this), {key: "Space"});
		this.addEventListener("click", this.onChecked.bind(this));
	}

	onChecked(ev) {
		if(ev) ev.preventDefault();

		if(this.disabled !== true) {
			this.checked = DOMString.toggle(this.checked);
			this.dispatchEvent(new InputEvent("input"));
			this.dispatchEvent(new Event("change", { bubbles: true }));
		}
	}
};

export default AriaChecked;