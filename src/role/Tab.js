import {storedElements, getParent} from "./../utils/elements.js";
import Roletype from "./Roletype.js";
import mix from "@vestergaard-company/js-mixin";

import AriaSelected from "./../attributes/aria-selected";

export const options = {
	owned: "tablist", // parent role
	selector: "[role='tab']",
	role: "tab"
};

export default class Tab extends mix(Roletype).with(AriaSelected) {
	constructor(...args) {
		super(...args);
	}

	get tablist() {
		return getParent(this, options.owned, options.role);
	}

	_onAriaSelected(ev) {
		let tablist = this.tablist;
		if(!tablist) return false;

		let tabs = tablist.element.querySelectorAll(options.selector + "[aria-selected='true']");
		[].forEach.call(tabs, (item) => {
			let inst = storedElements.get(item);
			inst.selected = false;
			inst.controls[0].element.style.display = "none";
		});

		super._onAriaSelected(ev);
		this.controls[0].element.removeAttribute("hidden");
		this.controls[0].element.style.display = "block";
		ev.preventDefault();
	}
}
