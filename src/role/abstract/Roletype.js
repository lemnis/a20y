import AccessibleNode from "./../../type/AccessibleNode";

const Mousetrap = require("mousetrap");
import objectPath from "object-path";

// Event names that are only inside the libary
var customEvents = ["key", "attributes", "characterData", "childlist", "label"];

let isFunction = function (obj) { return typeof obj == "function" || false; };

/**
 * Register extra elements used for some roles,
 * e.g. the up and down arrows with the spinbutton role
 *
 * Path of importance where the element is received from:
 * 1. new ...(..., {elements: { roleName: { str: instance of HTMLElement }}})
 * 2. [data-roleName-str=id] on the element with the role
 * 3. default value
 *
 * @private
 * @param  {string} path path where the element should be stored
 */
function handleCustomElement(path, value) {
	// only if no element is already set
	if (!objectPath.has(this, "_." + path)) {
		// check if element has it defined as data attribute
		var id = this.element.getAttribute("data-" + path.split(".").join("-"));
		if (id) var el = document.getElementById(id);
		if (el) {
			objectPath.set(this, "_." + path, el);
		} else {
			objectPath.set(this, "_." + path, value);
		}
	}
}

function handleCustomValue(path, value) {
	// only if no element is already set
	if (!objectPath.has(this, "_." + path)) {
		// check if element has it defined as data attribute
		var dataValue = this.element.getAttribute("data-" + path.split(".").join("-"));
		if (dataValue) {
			objectPath.set(this, "_." + path, dataValue);
		} else {
			objectPath.set(this, "_." + path, value);
		}
	}
}

/**
 * @extends AccessibleNode
 */
class Roletype extends AccessibleNode {

	/**
	 * @extends AccessibleNode
	 */
	constructor(...args) {
		super(...args);

		this._.listeners = new Map();
		this._.registerCustomElement = handleCustomElement.bind(this);
		this._.registerCustomValue = handleCustomValue.bind(this);

		objectPath.push(this._, "mutations", "tabIndex");

		this._onAriaDisabledMutation();
	}

	_onAriaDisabledMutation() {
		// console.log(this.disabled, this.tabIndex, this.disabled && this.tabIndex && this.tabIndex >= 0);
		if(this.disabled && this.tabIndex >= 0) {
			this.tabIndex = undefined;
		} else if(!this.disabled && this.tabIndex < 0) {
			this.tabIndex = 0;
		}
	}

	/**
	 * Current tabindex of the element
	 * @type {Number}
	 */
	get tabIndex() {
		if (!this.element.hasAttribute("tabindex")) {
			return;
		}

		return this.element.tabIndex;
	}
	set tabIndex(number) { this.element.tabIndex = number; }

	/**
	 * Adds an listener to the object and targeted element
	 * @see customEvents
	 * @param {String} label Type of event
	 * @param {Function} callback Callback function
	 * @param {Object} [options] Extends AddEventListenerOptions
	 * @param {String} [options.key] When label is set to `key` it specifies the keycombo to listen to
	 * @param {String} [options.attribute] When label is set to `attributes` it specifies which attribute should be changed
	 * @param {Element} [options.target] Changes the targeted element
	 * @param {Boolean} [options.capture]
	 * @param {Boolean} [options.passive]
	 * @param {Boolean} [options.once]
	 */
	addListener(label, callback, options) {
		var el = options && options.target ? options.target : this.element;
		this._.listeners.has(label) || this._.listeners.set(label, []);
		this._.listeners.get(label).push({ callback, options });

		if (label == "key" && options.key) {
			Mousetrap(el).bind(options.key, callback);
		}

		if (customEvents.indexOf(label) == -1) {
			el.addEventListener(label, callback, options);
		}
	}

	removeListener(label, callback, options) {
		let listeners = this._.listeners.get(label), index;

		if (listeners && listeners.length) {
			index = listeners.reduce((i, listener, index) => {
				if (
					isFunction(listener.callback) && listener.callback === callback &&
					(
						(
							listener.options &&
							listener.options.key == options.key &&
							listener.options.attribute == options.attribute &&
							listener.options.capture == options.capture
						) ||
						!listener.options && !options
					)
				) {
					return i = index;
				} else {
					return i;
				}
			}, -1);

			if (index > -1) {
				if (customEvents.indexOf(label) == -1) {
					var el = options && options.target ? options.target : this.element;

					el.removeEventListener(label, callback, options);
				}
				listeners.splice(index, 1);
				this._.listeners.set(label, listeners);
				return true;
			}
		}
		return false;
	}

	dispatchEvent(ev) {
		// let listeners = this._.listeners.get(ev.type);
		this.element.dispatchEvent(ev);
		// if (listeners && listeners.length) {
		// 	listeners.forEach((listener) => {
		// 		listener(ev);
		// 	});
		// 	return true;
		// }
		// return false;
	}


	addKeyListener(key, callback) {
		return this.addListener("key", callback, { key });
	}	
}

export default Roletype;