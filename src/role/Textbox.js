import mix from "@vestergaard-company/js-mixin";

import Input from "./abstract/Input";
import Selection from "./../mixins/Selection";

/**
 * ### Examples
 *
 * ##### Basic example
 * 
 * <div role='textbox' contenteditable></div>
 * 
 * ```html
 * <div role='textbox' contenteditable></div>
 * ```
 * 
 * @summary A type of input that allows free-form text as its value.
 * @extends Input
 * @mixes Selection
 * @todo Add options to keep or remove pasted styling
 */
class Textbox extends mix(Input).with(Selection) {

	/**
	 * @param {*} args
	 */
	constructor(...args) {
		super(...args);

		this._.registerCustomValue("textbox.minlength");
		this._.registerCustomValue("textbox.maxlength");
		this._.registerCustomValue("textbox.size");
		
		if(!this.multiline) {
			this.addKeyListener("enter", this._onEnter.bind(this));
			this.element.addEventListener("paste", this._onPaste.bind(this));
			// this.addMutationListener()
		}
	}

	_onEnter(ev) {
		ev.preventDefault();
	}

	_onPaste(ev) {
		ev.preventDefault();
		let str;
		let data = ev.clipboardData.getData("text/plain").replace(/\r?\n|\r/g, "");
		let sel = window.getSelection();

		var c = this.element.childNodes;
		var a = sel.anchorNode;

		if (c && a && Array.prototype.indexOf.call(c, a) > -1) {
			str = [this.element.innerText.slice(0, sel.anchorOffset), data, this.element.innerText.slice(sel.focusOffset)];
			str = str.join("");
		} else {
			str = this.element.innerText + data;
		}

		this.element.innerText = str;
	}

	_onChildListMutation(mutation) {
		if (!this.multiline) {
			Array.prototype.forEach.call(mutation.addedNodes, n => {
				if (n.nodeName !== "#text") {
					var newChild = document.createTextNode(n.innerText);
					n.parentNode.replaceChild(newChild, n);
				}
			});
		}
	}

	/* Native polyfill  */
	
	// autocomplete
	// dirname
	// list
	// maxlength
	// minlength
	// pattern
	// placeholder
	// readonly
	// required
	// size
	// value
	// list
	// selection api

	// name	string: Returns / Sets the element's name attribute, containing a name that identifies the element when submitting the form.
	// type string: Returns / Sets the element's type attribute, indicating the type of control to display. See type attribute of <input> for possible values.
	// autofocus	boolean: Returns / Sets the element's autofocus attribute, which specifies that a form control should have input focus when the page loads, unless the user overrides it, for example by typing in a different control. Only one form element in a document can have the autofocus attribute. It cannot be applied if the type attribute is set to hidden (that is, you cannot automatically set focus to a hidden control).
	
	/**
	 * Returns / Sets the current value of the textbox.
	 * @type {String}
	 */
	get value() { return this.element.innerText; }
	set value(str) { this.element.innerText = str; }

	/**
	 * Returns / Sets the minmum length of characters
	 * @type {Integer}
	 */
	get minLength() { return this._.textbox.minlength; }
	set minLength(num) { this._.textbox.minlength = num; }

	/**
	 * Returns / Sets the maximum length of characters
	 * @type {Integer}
	 */
	get maxLength() { return this._.textbox.maxlength; }
	set maxLength(num) { this._.textbox.maxlength = num; }

	/**
	 * Returns / Sets the size of control.
	 * @type {Integer}
	 */
	get size() { return this._.textbox.size; }
	set size(val) {
		this.element.style.width = 2.16 + 0.48 * val + "em";
		this._.textbox.size = val;
	}
}

export default Textbox;