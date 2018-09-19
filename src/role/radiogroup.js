import Select from "./abstract/Select.js";
import focus from "./../utils/focus";

/**
 * ### Example
 * 
 * #### Basic example
 * 
 * <div role="radiogroup" tabindex="0" aria-activedescendant="radio_1">
 *   <div id="radio_1" role="radio" aria-checked="false">Apple</div>
 *   <div id="radio_2" role="radio" aria-checked="false">Grapefruit</div>
 * </div>
 * 
 * #### Example with tabindex
 * 
 * <div role="radiogroup">
 *   <div id="radio_1" role="radio" tabindex="0" aria-checked="false">Apple</div>
 *   <div id="radio_2" role="radio" tabindex="-1" aria-checked="false">Grapefruit</div>
 * </div>
 * 
 * @extends Select
 */
class Radiogroup extends Select {
	onChange(ev) {
		// retrieve option that has been changed
		var changedOption = this.options.find(option => option._node === ev.target);

		if(changedOption.checked === "true") {
			this.options.forEach(radio => {
				if(radio._node !== ev.target && radio.checked === "true") {
					radio.checked = false;
				}
			});
		}
	}
}

export default Radiogroup;