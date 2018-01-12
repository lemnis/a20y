import Radio from "./radio.js";
import {IS_ACTIVE, IS_NOT_ACTIVE} from "./../utils/state.js";
import {AriaOwns} from "./../attributes/aria-owns.js";

const radiogroupSelector = "[role='radiogroup']";

class Radiogroup {
	constructor(element) {
		let radioChildren = element.querySelectorAll("[role='radio']");
		let activeRadioFound = false;
		let radios = radioChildren.length > 0 ? radioChildren : new AriaOwns(element).elements;

		this.radios = [];

		for (let radio of radios) {
			let radioInstance = new Radio(radio);
			this.radios.push(radioInstance);
			radioInstance.addListener("toggle", this.toggle.bind(this));

			// find first checked radio and uncheck all later radios
			if(radioInstance.state == IS_ACTIVE) {
				if(activeRadioFound == true) radioInstance.state = IS_NOT_ACTIVE;
				activeRadioFound = true;
			}
		}
	}

	toggle(target) {
		for (let radio of this.radios) {
			if(radio.element !== target.element) {
				radio.state = IS_NOT_ACTIVE;
			}
		}
	}
}