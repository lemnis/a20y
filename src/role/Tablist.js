import {storedElements, getPrev, getNext, getStart, getEnd} from "./../utils/elements.js";
import Roletype from "./Roletype.js";
import mix from "@vestergaard-company/js-mixin";

export const options = {
	owns: "tab", // children roles
	selector: "[role='tablist']"
};

export default class Tablist extends mix(Roletype).with() {
	constructor(...args) {
		super(...args);

		this.addKeyListener("left", this.moveToPrev.bind(this));
		this.addKeyListener("right", this.moveToNext.bind(this));
		this.addKeyListener("home", this.moveToStart.bind(this));
		this.addKeyListener("end", this.moveToEnd.bind(this));
	}

	moveToPrev(ev) {
		let prevInstance = getPrev(storedElements.get(ev.target), this, options.owns);
		prevInstance.element.focus();
		ev.preventDefault();
	}
	moveToNext(ev) {
		let nextInstance = getNext(storedElements.get(ev.target), this, options.owns);
		nextInstance.element.focus();
		ev.preventDefault();
	}

	moveToStart(ev) {
		let firstInstance = getStart(storedElements.get(ev.target), this, options.owns);
		firstInstance.element.focus();
		ev.preventDefault();
	}

	moveToEnd(ev) {
		let lastInstance = getEnd(storedElements.get(ev.target), this, options.owns);
		lastInstance.element.focus();
		ev.preventDefault();
	}
}
