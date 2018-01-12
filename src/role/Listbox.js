import focus from "./../utils/managingFocus";
import Select from "./abstract/Select";

export const options = {
	role: "listbox",
	selector: "[role='listbox']",
	selectorsWithImplicitRole: [
		"datalist",
		"select[multiple], select[size]:not([size='0']):not([size='1'])"
	]
};

// function clickOnOption(ev) {
// 	if(ev) ev.preventDefault();

// 	var clicked = this.options.find(i => i.element == ev.target);
// 	if (clicked) {
// 		let old = focus.get(this.options);
// 		focus.remove(old);
// 		focus.add(clicked);	
// 		updateSelected(this, clicked);
// 	}
// }

/**
 * 
 * 
 * ### Keyboard Support
 *
 * #### Default
 * | Key | Function |
 * | --- | -------- |
 * | Down Arrow | Moves focus to the next option <br/> If not multiselectable, it selects the focused option.
 * | Up Arrow 	| Moves focus to the previous option  <br/> If not multiselectable, it selects the focused option.
 * | Home 			|	Moves focus to the first option  <br/> If not multiselectable, it selects the focused option.
 * | End  			|	Moves focus to the last option  <br/> If not multiselectable, it selects the focused option.
 * 
 * #### Multiple selection
 * | Key | Function |
 * | --- | -------- |
 * | Space									| Changes the selection state of the focused option.
 * | Shift + Down Arrow 		| Moves focus to and selects the next option.
 * | Shift + Up Arrow 			| Moves focus to and selects the previous option.
 * | Control + Shift + Home |	Selects from the focused option to the beginning of the list.
 * | Control + Shift + End  | Selects from the focused option to the end of the list.
 * | Control + A 	          | Selects all options in the list. If all options are selected, unselects all options.
 * 
 * @extends Roletype
 * @fires Listbox#change
 * @fires Listbox#input
 */
class Listbox extends Select {
	constructor(...args) {
		super(...args);
		// this.element.addEventListener("click", clickOnOption.bind(this));

		// this.addKeyListener("enter", clickOnOption.bind(this));
	}
}

export default Listbox;