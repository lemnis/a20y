const Mousetrap = require("mousetrap");

export default class Base {
	constructor(element) {
		this.element = element;
	}

	addKeyListener(key, callback) {
		Mousetrap(this.element).bind(key, callback);
	}
}
