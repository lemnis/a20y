import focus from "./../../utils/focus";

import boolean from "./../../type/boolean";
import elements from "./../../utils/elements";

import Roletype from "./Roletype";
import mix from "@vestergaard-company/js-mixin";
import selector from "./../../utils/selector";
import owns from "./../../utils/owns";

/**
 * ### Keyboard Support
 *
 * #### Default
 * 
 * | Key | Function |
 * | --- | -------- |
 * | Down Arrow | Moves focus to the next option <br/> If not multiselectable, it selects the focused option.
 * | Up Arrow   | Moves focus to the previous option  <br/> If not multiselectable, it selects the focused option.
 * | Home       | Moves focus to the first option  <br/> If not multiselectable, it selects the focused option.
 * | End        | Moves focus to the last option  <br/> If not multiselectable, it selects the focused option.
 *
 * #### Multiple selection
 * 
 * | Key | Function |
 * | --- | -------- |
 * | Space	                | Changes the selection state of the focused option.
 * | Shift + Down Arrow     | Moves focus to and selects the next option.
 * | Shift + Up Arrow       | Moves focus to and selects the previous option.
 * | Control + Shift + Home | Selects from the focused option to the beginning of the list.
 * | Control + Shift + End  | Selects from the focused option to the end of the list.
 * | Control + A            | Selects all options in the list. If all options are selected, unselects all options.
 *
 * ### Attributes
 * 
 * * `aria-selected`
 * 	* `true`
 * 		* is the current focussed element
 * 		* equals the value of `aria-activedescendant`
 * * `tabindex`
 * 	* allows usage of the element by keys when in focus
 * * `aria-activedescendant` equals ID of current focussed element
 * 
 * #### Multiple selection
 * 
 * * `aria-selected`
 *  * `true`
 * 		* can be applied to multiple element
 *    * not automatically applied to the focused element
 * 	* `false`
 * * `tabindex`
 * 	* allows usage of the element by keys when in focus
 * 
 * @summary A form widget that allows the user to make selections from a set of choices.
 * @extends Roletype
 */
class Select extends Roletype {
	constructor(...args) {
		super(...args);

		this.addEventListener("key", this.moveToStart.bind(this), {key: "Home"});
		this.addEventListener("key", this.moveToPrev.bind(this), {key: "ArrowUp"});
		this.addEventListener("key", this.moveToNext.bind(this), {key: "ArrowDown"});
		this.addEventListener("key", this.moveToEnd.bind(this), {key: "End"});

		this.addEventListener("change", this.onChange.bind(this));

		this.options = owns.getAllAllowedChildren(this);
	}

	moveToPrev(ev) { move(this, ev, focus.prev, this.moved.bind(this)); }
	moveToNext(ev) { move(this, ev, focus.next, this.moved.bind(this)); }
	moveToStart(ev) { move(this, ev, focus.start, this.moved.bind(this)); }
	moveToEnd(ev) { move(this, ev, focus.end, this.moved.bind(this)); }
	
	moved() {}

	onChange(ev) {
		// retrieve option that has been changed
		var changedOption = this.options.find(option => option._node === ev.target);

		focus.focus(changedOption, false, this);
	}
}

function move(ay, ev, func, callback) {
	if (ev) ev.preventDefault();

	let to;

	if(ay.activeDescendant) {
		// retrieve new focus if a specific focus is set
		to = func(ay, ay.activeDescendant);
	} else {
		// fallback element to focus
		to = ay.options[0];
		focus.focus(to, false, ay);
	}

	callback(to);
}

export default Select;