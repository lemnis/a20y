import mix from "@vestergaard-company/js-mixin";
import Window from "./abstract/Window";

import AriaExpanded from "../attributes/aria-expanded.js";

function focus(node) {
	// get all elements within given element
	let children = node.getElementsByTagName("*");
	
	// remove all elements who aren't accessible by a tab
	let focusableNodes = Array.prototype.filter.call(children, i => {
		return (i.tabIndex > -1 || i.contentEditable == "true")
			&& !i.disabled && i.offsetWidth > 0 && i.offsetHeight > 0;
	});
	
	// sort elements in descending order
	focusableNodes.sort((a, b) => a.tabIndex + b.tabIndex);

	// document.activeElement.blur();
	// focusableEl.focus();
	return focusableNodes;
}

/**
 * @summary A child window within a webpage
 *
 * @desc
 * * Prompts the user to perform a specific action
 * * If it is designed to interrup, it is usually a modal. See [alertdialog]()
 * * It should have a label, it can be done with the `aria-label` attribute
 * * It should have at least one focusable descendant element.
 * * It should focus an element in the modal when displayed.
 * * It should manage focus of modal dialogs (keep the focus inside the open modal).
 *
 * ##### example
 *
 * <div role="dialog" aria-label="Window to confirm your acceptance of this world">
 *  Hello world!
 * 	<button focus type="button">Ok</button>
 * </div>
 * @extends Window
 */
class Dialog extends mix(Window).with(AriaExpanded) {
	constructor(...args) {
		super(...args);

		// this._node.ownerDocument.addEventListener("focus", this._onFocus.bind(this), true);
		// this._node.ownerDocument.addEventListener("blur", this._onFocus.bind(this), true);
		this.addEventListener("key", this.onClose.bind(this), { key: "Escape", target: this._node.ownerDocument});

		var n = focus(document);
		var i = 0;
		// var t = setInterval(() => {
		// 	console.log(Mousetrap(document.activeElement).trigger("tab"));
		// 	// let i = n.indexOf(document.activeElement);
		// 	if(i < n.length) {
		// 		var f = new FocusEvent("focus");
		// 		n[i++].dispatchEvent(f);
		// 		// console.log(n[i++].focus());
		// 	}
		// }, 1000);
	}

	_onFocus(ev) {
		// ev.preventDefault();
		let n = focus(this._node.ownerDocument);
		if(n[n.length-1] != ev.target) {
			ev.preventDefault();
			window.focus();
		}
		console.log(ev);
	}

	onClose(ev) {
		if(ev) ev.preventDefault();
		this._node.hidden = true;

		this.dispatchEvent(new Event("close"));
	}

	_onHiddenMutation(ev) {
		if(this._node.getAttribute("hidden") === "true") {
			var n = focus(this._node);
			n[0].focus();
			console.log(n, document.activeElement, n == document.activeElement);
		} else {

		}
	}
}

export default Dialog;