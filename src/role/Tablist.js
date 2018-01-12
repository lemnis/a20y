import elements from "./../utils/elements.js";
import Composite from "./abstract/Composite";

class Tablist extends Composite {
	constructor(...args) {
		super(...args);

		this.addKeyListener("left", this.moveToPrev.bind(this));
		this.addKeyListener("right", this.moveToNext.bind(this));
		this.addKeyListener("home", this.moveToStart.bind(this));
		this.addKeyListener("end", this.moveToEnd.bind(this));
	}

	moveToPrev(ev) {
		let prevInstance = elements.getPrev(elements.get(ev.target), this, options.owns);
		prevInstance.element.focus();
		ev.preventDefault();
	}
	moveToNext(ev) {
		let nextInstance = elements.getNext(elements.get(ev.target), this, options.owns);
		nextInstance.element.focus();
		ev.preventDefault();
	}

	moveToStart(ev) {
		let firstInstance = elements.getStart(elements.get(ev.target), this, options.owns);
		firstInstance.element.focus();
		ev.preventDefault();
	}

	moveToEnd(ev) {
		let lastInstance = elements.getEnd(elements.get(ev.target), this, options.owns);
		lastInstance.element.focus();
		ev.preventDefault();
	}
}

export default Tablist;