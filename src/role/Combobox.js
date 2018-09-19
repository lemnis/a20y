import boolean from "./../type/boolean";
import Select from "./abstract/Select";
import selector from "./../utils/selector";
import owns from "./../utils/owns";

function filter(cb, value) {
	var selectedOptions = [];

	cb.listbox.options.forEach(option => {
		if(value === null) {
			option.hidden = true;
		} else if (option._node.innerHTML.indexOf(value) == 0) {
			option.hidden = false;
			if(option._node.innerHTML === value) {
				selectedOptions.push(option);
			}
		} else {
			option.hidden = true;
		}
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
	console.log(this.textbox.value, ev.target.innerHTML, this._, ev);
	this.textbox.value = ev.target.innerHTML;

	hideListbox.bind(this);
}

function updateListbox() { 
	var options = filter(this, this.textbox.value);

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
 * @summary A composite widget containing a single-line textbox and another element, 
 * such as a listbox or grid, that can dynamically pop up to help the user set the value of the textbox.
 * @desc
 * A combobox is a widget made up of the combination of two distinct elements: 
 * 
 * 1. a single-line textbox
 * 2. an associated pop-up element for helping users set the value of the textbox. 
 * 
 * The popup may be a listbox, grid, tree, or dialog. Many implementations also include a third 
 * optional element -- a graphical button adjacent to the textbox, indicating the availability of
 * the popup. Activating the button displays the popup if suggestions are available.
 * 
 * ### Example
 * 
 * <div role="combobox" aria-expanded="false" aria-owns="listbox" aria-haspopup="listbox">
 *   <input role="textbox" contenteditable aria-autocomplete="list" aria-controls="listbox"  aria-activedescendant="option_1"/>
 * </div>
 * <ul role="listbox" id="listbox">
 *   <li id="option_1" role="option">Apple</li>
 *   <li id="option_2" role="option">Banana</li>
 * </ul>
 * 
 * @extends Select
 * @param {Element} [options.combobox.open]	
 * 	Optional button to open the pop-up element, 
 * 	defaults to first button element inside the element
 */
class Combobox extends Select {
	constructor(...args) {
		super(...args);

		// // register custom elements
		// this._.registerCustomElement("combobox.open", this._node.querySelector(selector.getDeep("button")));
		
		this.textbox = owns.get(this, selector.getDeep("textbox"));
		this.listbox = owns.get(this, selector.getDeep("listbox"));
		this.textbox.addEventListener("input", console.log);
		this.listbox.onchange = function() { console.log(arguments); };
		this.options = this.listbox.options;

		// if (this._.combobox.open) {
		// 	this._.combobox.open.addEventListener("click", toggleListbox.bind(this));
		// }
		
		// this.textbox.addEventListener("focus", showListbox.bind(this));
		// this.textbox.addEventListener("blur", hideListbox.bind(this));
		// this.textbox.addEventListener("input", updateListbox.bind(this));

		// if(this.autocomplete == "list") {
		// 	// Indicates that the autocomplete behavior of the text input is to suggest a list of possible values
		// 	// in a popup and that the suggestions are related to the string that is present in the textbox.

		// } else if (this.autocomplete == "both") {
		// 	// ndicates that the autocomplete behavior of the text input is to both show an inline 
		// 	// completion string and suggest a list of possible values in a popup where the suggestions 
		// 	// are related to the string that is present in the textbox.
		// }

		// /** @todo determine what to do with default values */
		// if(this.expanded == undefined) this.expanded = false;
		// if (this.hasPopup == undefined) this.hasPopup = "listbox";
	}

	onchange(ev) {
		this.textbox.value = ev.target.innerHTML;
	}
}

export default Combobox;