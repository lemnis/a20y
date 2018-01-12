import boolean from "./../type/boolean";
import Select from "./abstract/Select";
import selector from "./../utils/selector";

function filter(cb, value) {
	var selectedOptions = [];

	cb.owns.forEach(listbox => {
		Array.prototype.forEach.call(listbox.element.children, option => {
			if(value === null) {
				option.hidden = true;
			} else if (option.innerHTML.indexOf(value) == 0) {
				option.hidden = false;
				if(option.innerHTML === value) {
					selectedOptions.push(option);
				}
			} else {
				option.hidden = true;
			}
		});
	});

	return selectedOptions;
}

function toggleListbox(ev) {
	if(ev) ev.preventDefault();

	if (this.expanded == boolean.IS_ACTIVE) {
		hideListbox.call(this);
	} else {
		showListbox.call(this);
	}
}

function updateValue(ev) {
	if(ev) ev.preventDefault();
	console.log(this._.combobox.input.value, ev.target.innerHTML, this._, ev);
	this._.combobox.input.value = ev.target.innerHTML;

	hideListbox.bind(this);
}

function updateListbox() { 
	var options = filter(this, this._.combobox.input.value);

	options.forEach(i => {
		i.selected = true;
	});
}
function showListbox() {
	this.expanded = boolean.IS_ACTIVE;
	updateListbox.call(this);
}
function hideListbox() {
	this.expanded = boolean.IS_NOT_ACTIVE;
	filter(this);
}

/**
 * A combobox is a widget made up of the combination of two distinct elements: 
 * 
 * 1. a single-line textbox
 * 2. an associated pop-up element for helping users set the value of the textbox. 
 * 
 * The popup may be a listbox, grid, tree, or dialog. Many implementations also include a third 
 * optional element -- a graphical button adjacent to the textbox, indicating the availability of
 * the popup. Activating the button displays the popup if suggestions are available.
 * 
 * @extends Select
 * @param {Element} options.combobox.input 	Defaults to first input element inside the element
 * @param {Element} [options.combobox.open]	
 * 	Optional button to open the pop-up element, 
 * 	defaults to first button element inside the element
 */
class Combobox extends Select {
	constructor(...args) {
		super(...args);

		// register custom elements
		this._.registerCustomElement("combobox.input", this.element.querySelector(selector.getDeepSelector("textbox")));
		this._.registerCustomElement("combobox.open", this.element.querySelector(selector.getDeepSelector("button")));
		
		if (this._.combobox.open) {
			this._.combobox.open.addEventListener("click", toggleListbox.bind(this));
		}
		
		this._.combobox.input.addEventListener("focus", showListbox.bind(this));
		this._.combobox.input.addEventListener("blur", hideListbox.bind(this));
		this._.combobox.input.addEventListener("input", updateListbox.bind(this));
		// this.owns.forEach(i => i.element.addEventListener("click", updateValue.bind(this)));

		if(this.autocomplete == "list") {
			// Indicates that the autocomplete behavior of the text input is to suggest a list of possible values
			// in a popup and that the suggestions are related to the string that is present in the textbox.

		} else if (this.autocomplete == "both") {
			// ndicates that the autocomplete behavior of the text input is to both show an inline 
			// completion string and suggest a list of possible values in a popup where the suggestions 
			// are related to the string that is present in the textbox.
		}

		/** @todo determine what to do with default values */
		if(this.expanded == undefined) this.expanded = false;
		if (this.hasPopup == undefined) this.hasPopup = "listbox";
	}
}

export default Combobox;