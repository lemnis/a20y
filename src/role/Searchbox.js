import Textbox from "./Textbox";

/**
 * @extends Textbox
 */
class Searchbox extends Textbox {
	/**
	 * #### Example
	 * 
	 * <div role="searchbox" contenteditable></div>
	 * 
	 * ```html
	 * <div role="searchbox" contenteditable></div>
	 * ```
	 * 
	 * @param {*} args 
	 */
	constructor(...args) { super(...args); }
}

export default Searchbox;