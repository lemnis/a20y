/** @module Option */

import Input from "./abstract/Input";

/**
 * @see module:Listbox
 * @alias module:Option
 * @extends Input
 */
class Option extends Input {

	constructor(...args) {
		super(...args);

		let onClick = this.onClick.bind(this);

		this.addEventListener("click", onClick);
		this.addEventListener("key", onClick, {key: "Enter"});
		this.addEventListener("key", onClick, { key: "Space"});
	}

    /**
     * Updates the radio status trough an event
     * 
     * @param {Event} ev
     * @listens MouseEvent:click
     * @listens MouseEvent:enger
     * @listens Keyboard:space
     */
	onClick(ev) {
		if(ev) ev.preventDefault();
		if(typeof super.onClick == "function") super.onClick(ev);

		if (this === ev.target) {
			this.selected = !this.selected;
		}

	}

    /**
     * Updates the selected state
     * 
     * @fires Event:change
     * @fires InputEvent:input
     */
	set selected(value) {
		let old = this.selected;

		super.selected = value;

		if (old !== value) {
			var e = new Event("change", { bubbles: true });
			e.preventDefault = () => {
				super.selected = old;
				this.defaultPrevented = true;
			}
			this.dispatchEvent(e);
		}

		this.dispatchEvent(new InputEvent("input"));
	}
	get selected() { return super.selected; }
}

export default Option;