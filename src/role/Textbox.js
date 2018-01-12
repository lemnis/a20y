import Input from "./abstract/Input";

export const options = {
	role: "textbox",
	selector: "[role='textbox']",
	selectorsWithImplicitRole: [
		"input[type='email']:not([list])",
		"input[type='tel']:not([list])",
		"input[type='text']:not([list])",
		"input[type='url']:not([list])",
		"textarea"
	]
};

/**
 * @todo Add options to keep or remove pasted styling
 */
class Textbox extends Input {
	constructor(...args){
		super(...args);
		
		if(!this.multiline){
			this.addKeyListener("enter", this._onEnter.bind(this));
			this.element.addEventListener("paste", this._onPaste.bind(this));
			// this.addMutationListener()
		}
	}

	_onEnter(ev){
		ev.preventDefault();
	}

	_onPaste(ev){
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
}

export default Textbox;