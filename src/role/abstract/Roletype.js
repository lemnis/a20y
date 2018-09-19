import AccessibleNode from "aomjs/src/AccessibleNode.js";
import AccessibleNodeList from "aomjs/src/AccessibleNodeList.js";

import objectPath from "object-path";
import mix from "@vestergaard-company/js-mixin";

import elements from "./../../utils/elements";
import create from "./../../utils/create";
import EventTarget from "./../../utils/EventTarget";

/** @module Roletype */

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
 * @alias module:Roletype
 * @extends AccessibleNode
 * @mixes module:utils/EventTarget
 */
class Roletype extends mix(AccessibleNode).with(EventTarget) {

	/**
	 * @extends AccessibleNode
	 */
	constructor(...args) {
		super(...args);

		Object.defineProperty(this, "_", { value: {} });
		this._.registerCustomElement = handleCustomElement.bind(this);
		this._.registerCustomValue = handleCustomValue.bind(this);

		objectPath.push(this._, "mutations", "tabIndex");

		// this._onAriaDisabledMutation();
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
	set tabIndex(number) { 
		this._node.tabIndex = number;
	}

	get owns() {
		if (this._values.owns) return this._values.owns;

		if (this._node.hasAttribute("aria-owns")) {
			var ids = this._node.getAttribute("aria-owns").split(" ");
			var list = new AccessibleNodeList();
			ids.forEach(id => {
				var node = document.getElementById(id);
				if (!elements.has(node)) {
					create.one(node);
				}

				list.add(elements.get(node));
			});

			this._values.owns = list;
			return list;
		}

		return null;
	}

	get controls() {
		if (this._values.controls) return this._values.controls;

		if (this._node.hasAttribute("aria-controls")) {
			var ids = this._node.getAttribute("aria-controls").split(" ");
			var list = new AccessibleNodeList();
			ids.forEach(id => {
				var node = document.getElementById(id);
				if (!elements.has(node)) {
					create.one(node);
				}

				list.add(elements.get(node));
			});

			this._values.controls = list;
			return list;
		}

		return null;
	}
}

export default Roletype;