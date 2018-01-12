import AccessibleNode from "./../../type/AccessibleNode";

/**
 * @extends AccessibleNode
 */
class Roletype extends AccessibleNode {

	/**
	 * @extends AccessibleNode
	 */
	constructor(...args) {
		super(...args);

		this._onAriaDisabledMutation();
	}

	_onAriaDisabledMutation() {
		// console.log(this.disabled, this.tabIndex, this.disabled && this.tabIndex && this.tabIndex >= 0);
		if(this.disabled && this.tabIndex >= 0) {
			this.tabIndex = undefined;
		} else if(!this.disabled && this.tabIndex < 0) {
			this.tabIndex = 0;
		}
	}
}

export default Roletype;