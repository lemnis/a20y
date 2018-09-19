/** @module Radio */

import Command from "./abstract/Command.js";

/**
 * A checkable input in a group of elements with the same role,
 * only one of which can be checked at a time.
 * 
 * ### Examples
 * 
 * <div role="radio" aria-checked="false" tabindex="0">Apple</div>
 * 
 * ```html
 * <div role="radio" aria-checked="false" tabindex="0">Apple</div>
 * ```
 * 
 * @alias module:Radio
 */
class Radio extends Command {
	constructor(...args) {
		super(...args);

		this.addEventListener("key", this.onClick.bind(this), {key: "Space"});
		this.addEventListener("click", this.onClick.bind(this));
	}

	/**
	 * Updates the radio status trough an event
	 * 
	 * @param {Event} ev
	 * @listens MouseEvent:click
	 * @listens Keyboard:space
	 */
	onClick(ev) {
		if(this === ev.target) {
			if (ev) ev.preventDefault();
			if (typeof super.onClick == "function") super.onClick(ev);

			if (this.disabled !== true) {
				this.checked = true;
			}
		}
	}
	
	/**
	 * Updates the checked status
	 * 
	 * @fires Event:change
	 * @fires InputEvent:input
	 */
	set checked(value){
		let old = this.checked;

		super.checked = value;

		if(old !== value) {
			this.dispatchEvent(new Event("change", { bubbles: true }));
		}

		this.dispatchEvent(new InputEvent("input"));
	}
	get checked() { return super.checked; }
}

export default Radio;
