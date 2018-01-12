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
 * 
 * 
 * @extends Command
 * @mixes AriaExpanded
 * @mixes AriaPressed
 */
class Button extends mix(Command).with(AriaExpanded, AriaPressed) {
	constructor(...args) {
		super(...args);

		this.addListener(
			"attributes",
			registerExpanded,
			{ attribute: "aria-expanded", once: true }
		);

		if (this.expanded !== undefined) { // todo: add when first time aria-expanded is boolean
			this.controls.forEach(control => control.addListener("close", close.bind(this)));
		}
	}

	onExpanded(ev) {
		if (typeof super.onExpanded == "function") super.onExpanded(ev);

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