import AccessibleNode from "aomjs/src/AccessibleNode.js";

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
		var id = this._node.getAttribute("data-" + path.split(".").join("-"));
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
		var dataValue = this._node.getAttribute("data-" + path.split(".").join("-"));
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

		Object.defineProperty(this, "_", { value: {} });
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
		if (!this._node.hasAttribute("tabindex")) {
			return;
		}

		return this._node.tabIndex;
	}
	set tabIndex(number) { this._node.tabIndex = number; }

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
	addEventListener(type, callback, options) {
		// check if custom target is set
		var node = options && options.target ? options.target : this._node;
		
		// push event to the listener
		super.addEventListener(type, { callback, options });

		// attach listener to given keys
		if (type == "key" && options.key) {
			Mousetrap(node).bind(options.key, callback);
		}

		// attach native events to target element
		if (customEvents.indexOf(type) == -1) {
			node.addEventListener(type, callback, options);
		}
	}

	removeListener(label, callback, options) {
		if (!this._listeners.has(label)) {
			return;
		}

		let stack = this._listeners.get(label);
		let index;

		if (stack && stack.length) {
			index = stack.reduce((i, listener, index) => {
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
					var el = options && options.target ? options.target : this._node;

					el.removeEventListener(label, callback, options);
				}
				stack.splice(index, 1);
				this._listeners.set(label, stack);
				return true;
			}
		}
		return false;
	}

	dispatchEvent(event) {
		if (!this._listeners.has(event.type)) {
			return true;
		}
		var stack = this._listeners.get(event.type);
		stack.forEach(listener => {
			if(listener.callback) listener.callback.call(this, event);
		});
		this._node.dispatchEvent(event);

		return !event.defaultPrevented;
	}	

	addKeyListener(key, callback) {
		return this.addEventListener("key", callback, { key });
	}	
}

export default Roletype;