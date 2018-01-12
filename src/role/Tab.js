import elements from "./../utils/elements";
import Roletype from "./abstract/Roletype";
import mix from "@vestergaard-company/js-mixin";

import AriaSelected from "./../attributes/aria-selected";

export const options = {
	owned: "tablist", // parent role
	selector: "[role='tab']",
	role: "tab"
};

class Tab extends mix(Roletype).with(AriaSelected) {
	constructor(...args) {
		super(...args);
	}

	onSelect(ev) {
		let tablist = elements.getParent(this, options.owned, options.role);
		if(!tablist) return false;
		
		ev.preventDefault();
		
		let tabs = tablist.element.querySelectorAll(options.selector + "[aria-selected='true']");
		[].forEach.call(tabs, (item) => {
			let inst = elements.get(item);
			inst.selected = false;
			inst.controls[0].element.hidden = true;
		});

		if (typeof super.onSelect == "function") super.onSelect(ev);
		
		this.controls[0].element.hidden = false;
	}
}

export default Tab;