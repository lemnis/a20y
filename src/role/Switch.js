import Checkbox from "./Checkbox";

/**
 * A type of checkbox that represents on/off values, as opposed to checked/unchecked values.
 * @extends Checkbox 
 */
class Switch extends Checkbox {
	/**
	 * #### Example
	 * 
	 * **Default**
	 * 
	 * <div role="switch" tabindex="0"></div>
	 * 
	 * ```html
	 * <div role="switch" tabindex="0"></div>
	 * ```
	 * 
	 * **With predefined value**
	 * 
	 * <div role="switch" aria-checked="true" tabindex="0"></div>
	 * 
	 * ```html
	 * <div role="switch" aria-checked="true" tabindex="0"></div>
	 * ```
	 * @param {*} args
	*/
	constructor(...args) {
		super(...args);
	}
}

export default Switch;
