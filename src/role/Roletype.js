function camelize(str) {
	return str[0].toUpperCase() + str.replace(/-(.)/g, function(a, b) {
		return b.toUpperCase();
	}).slice(1);
}

function cb(mutations) {
	console.log(mutations);
	mutations.forEach(function(mutation) {
		if(mutation.type == "attributes") {
			var functionName = "_on" + camelize(mutation.attributeName) + "Mutation";
			if(typeof this[functionName] == "function") {
				typeof this[functionName].call(this);
			}
		}
	}.bind(this));
}

import Base from "./Base.js";

import * as boolean from "./../type/boolean.js";
import * as DOMString from "./../type/DOMString.js";
import AccessibleNodeList from "./../type/AccessibleNodeList.js";

export default class Roletype extends Base {
	constructor(...args) {
		super(...args);

		this.controls 		= new AccessibleNodeList(this, "aria-controls");
		this.describedBy 	= new AccessibleNodeList(this, "aria-describedby");
		this.flowTo 			= new AccessibleNodeList(this, "aria-flowto");
		this.labelledBy 	= new AccessibleNodeList(this, "aria-labelledby");
		this.owns 				= new AccessibleNodeList(this, "aria-owns");

		if(this.disabled && this.tabindex == 0) {
			this.tabindex = -1;
		}

		var observer = new MutationObserver(cb.bind(this));
		var config = { attributes: true, childList: true, attributeOldValue: true};
		observer.observe(this.element, config);

		this._onAriaDisabledMutation();
	}

	set atomic(status){ 	return boolean.set(this, "aria-atomic", status); }
	get atomic(){ 				return boolean.get(this, "aria-atomic"); }
	set busy(status){ 		return boolean.set(this, "aria-busy", status); }
	get busy(){ 					return boolean.get(this, "aria-busy"); }
	set disabled(status){ return boolean.set(this, "aria-disabled", status); }
	get disabled(){ 			return boolean.get(this, "aria-disabled"); }
	set hasPopUp(status){ return boolean.set(this, "aria-haspopup", status); }
	get hasPopUp(){ 			return boolean.get(this, "aria-haspopup"); }
	set hidden(status){ 	return boolean.set(this, "aria-hidden", status); }
	get hidden(){ 				return boolean.get(this, "aria-hidden"); }

	set current(status){ 			return DOMString.set(this, "aria-current", status); }
	get current(){ 			 			return DOMString.get(this, "aria-current"); }
	set invalid(status){ 			return DOMString.set(this, "aria-invalid", status); }
	get invalid(){ 			 			return DOMString.get(this, "aria-invalid"); }
	set keyShortcuts(status){ return DOMString.set(this, "aria-keyshortcuts", status); }
	get keyShortcuts(){ 			return DOMString.get(this, "aria-keyshortcuts"); }
	set label(status){ 				return DOMString.set(this, "aria-label", status); }
	get label(){ 			 				return DOMString.get(this, "aria-label"); }
	set live(status){ 				return DOMString.set(this, "aria-live", status); }
	get live(){ 							return DOMString.get(this, "aria-live"); }
	set relevant(status){ 		return DOMString.set(this, "aria-relevant", status); }
	get relevant(){ 					return DOMString.get(this, "aria-relevant"); }

	set roleDescription(status){ return DOMString.set(this, "aria-roledescription", status); }
	get roleDescription(){ 			 return DOMString.get(this, "aria-roledescription"); }

	set details(status){}
	get details(){}
	set errormessage(status){}
	get errormessage(){}

	_onAriaDisabledMutation() {
		if(this.disabled && this.tabindex && this.tabindex >= 0) {
			this.tabindex = -1;
		} else if(!this.disabled && this.tabindex && this.tabindex < 0) {
			this.tabindex = 0;
		}
	}
}
