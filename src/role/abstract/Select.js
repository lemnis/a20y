import fc from "./../../utils/managingFocus";
import boolean from "./../../type/boolean";
import elements from "./../../utils/elements";

import Roletype from "./Roletype";
import Option from "./../Option.js";
import mix from "@vestergaard-company/js-mixin";
import selector from "./../../utils/selector";
import owns from "./../../utils/owns";

/**
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
 * ### Attributes
 * * `aria-selected`
 * 	* `true`
 * 		* is the current focussed element
 * 		* equals the value of `aria-activedescendant`
 * * `tabindex`
 * 	* allows usage of the element by keys when in focus
 * * `aria-activedescendant` equals ID of current focussed element
 * 
 * #### Multiple selection
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

		// used for determining if logic should be executed
		this.target = false;
		
		// when in focus, allow the element be controlled by the keys
		if(typeof this.tabIndex !== "undefined") {
			this._node.addEventListener("focus", hasTarget.bind(this));
			this._node.addEventListener("blur", lostTarget.bind(this));
		}

		this.addEventListener("key", this.moveToStart.bind(this), {key: "home", target: this._node.ownerDocument});
		this.addEventListener("key", this.moveToPrev.bind(this), {key: "up", target: this._node.ownerDocument});
		this.addEventListener("key", this.moveToNext.bind(this), {key: "down", target: this._node.ownerDocument});
		this.addEventListener("key", this.moveToEnd.bind(this), {key: "end", target: this._node.ownerDocument});

		// this.addEventListener.call({ element: this._node.ownerDocument }, "home", this.moveToStart.bind(this));
		// this.addEventListener.call({ element: this._node.ownerDocument }, "up", this.moveToPrev.bind(this));
		// // this.addEventListener.call({ element: this._node.ownerDocument }, "shift + up", this.moveToNext.bind(this));
		// this.addEventListener.call({ element: this._node.ownerDocument }, "down", this.moveToNext.bind(this));
		// // this.addEventListener.call({ element: this._node.ownerDocument }, "shift + down", selectDown.bind(this));
		// this.addEventListener.call({ element: this._node.ownerDocument }, "end", this.moveToEnd.bind(this));
	
		this.options = owns.getAllAllowedChildren(this);
		this.options.forEach(ay => {
			this.addEventListener("click", this.activeChanged.bind(this), {target: ay._node});
			if (ay.selected) {
				fc.add(ay);
			}
		});
	}

	moveToPrev(ev) { move(this, ev, fc.prev, this.moved.bind(this)); }
	moveToNext(ev) { move(this, ev, fc.next, this.moved.bind(this)); }
	moveToStart(ev) { move(this, ev, fc.start, this.moved.bind(this)); }
	moveToEnd(ev) { move(this, ev, fc.end, this.moved.bind(this)); }
	
	moved(from, to) {}
	
	activeChanged(ev) {
		let option = elements.get(ev.target);
		let prevFocus = fc.get(this.options);
		fc.remove(prevFocus);
		fc.add(option);

		if (this.activeDescendant) this.activeDescendant = option;

		// update selected on keyevent when only one item can be selected
		if (!this.multiselectable) {
			fc.setSelected(prevFocus, undefined);
		}
		fc.setSelected(option, boolean.toggle(option.selected));		
	}
}

function move(ay, ev, func, callback) {
	if (!ay.target) return;
	if (ev) ev.preventDefault();

	let prevFocus = fc.get(ay.options);
	fc.remove(prevFocus);
	// update selected on keyevent when only one item can be selected
	let currentFocus = func(ay.options, prevFocus);
	if (ay.activeDescendant) ay.activeDescendant = currentFocus;

	callback(prevFocus, currentFocus);
}

function hasTarget() { this.target = true; }
function lostTarget() { this.target = false; }

export default Select;