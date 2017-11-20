import {storedElements, getPrev, getNext, getStart, getEnd, getParent} from "./../utils/elements.js";
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

		this.addKeyListener("left", this.moveToPrev.bind(this));
		this.addKeyListener("right", this.moveToNext.bind(this));
		this.addKeyListener("home", this.moveToStart.bind(this));
		this.addKeyListener("end", this.moveToEnd.bind(this));
	}

	get tablist() {
		return getParent(this, options.owned, options.role);
	}

	moveToPrev(ev) {
		let prevInstance = getPrev(this, options.owned, options.role);
		prevInstance.element.focus();
		ev.preventDefault();
	}
	moveToNext(ev) {
		let nextInstance = getNext(this, options.owned, options.role);
		nextInstance.element.focus();
		ev.preventDefault();
	}

	moveToStart(ev) {
		let firstInstance = getStart(this, options.owned, options.role);
		firstInstance.element.focus();
		ev.preventDefault();
	}

	moveToEnd(ev) {
		let lastInstance = getEnd(this, options.owned, options.role);
		lastInstance.element.focus();
		ev.preventDefault();
	}

	_onAriaSelected(ev) {
		let tablist = this.tablist;
		if(!tablist) return false;

		let tabs = tablist.element.querySelectorAll(options.selector + "[aria-selected='true']");
		[].forEach.call(tabs, (item) => {
			let inst = storedElements.get(item);
			inst.selected = false;
			inst.controls[0].style.display = "none";
		});

		super._onAriaSelected(ev);
		this.controls[0].removeAttribute("hidden");
		this.controls[0].style.display = "block";
		ev.preventDefault();
	}
}
