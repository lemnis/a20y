import mix from "@vestergaard-company/js-mixin";
import Input from "./abstract/Input";

import AriaChecked from "../attributes/aria-checked.js";

/**
 * @summary A checkable input that has three possible values: true, false, or mixed.
 * @desc
 * #### Example
 *
 * <div role="checkbox" aria-checked="true" tabindex="0"></div>
 *
 * ```html
 * <div role="checkbox" aria-checked="true" tabindex="0"></div>
 * ```
 * @extends Input 
 * @mixes AriaChecked
 */
class Checkbox extends mix(Input).with(AriaChecked) {
	/**
	 * @param {*} args
	*/
	constructor(...args) {
		super(...args);
	}
}

export default Checkbox;
