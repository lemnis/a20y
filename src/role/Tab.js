import mix from "@vestergaard-company/js-mixin";

import elements from "./../utils/elements";
import selector from "./../utils/selector";
import roles from "./../data/roles";

import Roletype from "./abstract/Roletype";

import AriaSelected from "./../attributes/aria-selected";

class Tab extends mix(Roletype).with(AriaSelected) {
	constructor(...args) {
		super(...args);
	}

	onSelect(ev) {
		// gets the selector for finding it's context element (tablist > tab) 
		var contextSelector = roles.tab.context.map(str => selector.getRole(str)).join(", ");
		let tablist = elements.getParent(this, contextSelector);
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