/** @module Button */

import mix from "@vestergaard-company/js-mixin";
import Command from "./abstract/Command";
import boolean from "./../type/boolean";

import AriaPressed from "../attributes/aria-pressed.js";
import AriaExpanded from "../attributes/aria-expanded";

function close() {
	this.expanded = boolean.IS_NOT_ACTIVE;
}

function registerExpanded(ev) {
	console.log(ev);
}

/**
 * @summary An input that allows for user-triggered actions when clicked or pressed.
 * 
 * @alias module:Button
 * @extends Command
 * @mixes AriaExpanded
 * @mixes AriaPressed
 */
class Button extends mix(Command).with(AriaExpanded, AriaPressed) {
	constructor(...args) {
		super(...args);

		this.addEventListener(
			"attributes",
			registerExpanded,
			{ attribute: "aria-expanded", once: true }
		);

		if (this.expanded !== undefined && this.controls) { // todo: add when first time aria-expanded is boolean
			console.log(this.controls.length);
			this.controls.forEach(control => {
				console.log(control.addEventListener);
				if (control.addEventListener) control.addEventListener("close", close.bind(this))
			}
			);
		}
	}

	onexpanded(ev) {
		if (typeof super.onexpanded == "function") super.onexpanded(ev);

		if (this.disabled !== true) {
			if (this.expanded) {
				this.controls.forEach(control => {
					control.element.hidden = false;
				});
			} else {
				this.controls.forEach(control => {
					control.element.hidden = true;
				});
			}
		}
	}	
}

export default Button;