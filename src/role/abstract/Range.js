import Widget from "./Widget";

/**
 * **(Abstract role) SHOULD NOT USED IN THE DOM** 
 * An input representing a range of values that can be set by the user.
 *
 * @class
 * @extends Widget
 * @return {Range} this
 * @see {@link https://w3c.github.io/aria/aria/aria.html#range}
 */
class Range extends Widget {
	/**
	 * @alias module:Range-const
	 * @param {HTMLElement} element 				element to derive information nameFrom
	 * @param {Object} [options] 						optional options
 	 * @param {Number|"any"} options.step 	increase/decrease value used
	 */
	constructor(...arg) {
		super(...arg);

		/**
	   * @name Range#_
		 * @type {Object}
		 * @prop {Number} [step=1]
	   */

		this._.registerCustomValue("step", 1);
	}

	/**
	 * Passtrough of an stringified `valueNow`
	 * @type {String}
	 * @see {@link AccessibleNode#valueNow}
	 */
	get value() { return this.valueNow.toString();}
	set value(val) { this.valueNow = val; }

	/**
	 * Proxy of the `valueNow` value
	 * @type {Number}
	 * @see {@link AccessibleNode#valueNow}
	 */
	get valueAsNumber() { return this.valueNow; }
	set valueAsNumber(val) { this.valueNow = val; }

	/**
   * Decrease the value with the amount of 1 step
   * @param  {Event} ev Event when triggered through an elements
   */
	stepDown(ev) {
		if(this.disabled) return;
		if(ev) ev.preventDefault();

		if(this.valueMin === null || this.valueNow > this.valueMin) {
			this.valueNow = this.valueNow - Number(this._.step);
		}
	}

	/**
   * Increase the value with the amount of 1 step
   * @package
   * @param  {Event} ev Event when triggered through an elements
   */
	stepUp(ev) {
		if(this.disabled) return;
		if(ev) ev.preventDefault();

		if(this.valueMax === null || this.valueNow < this.valueMax) {
			this.valueNow = this.valueNow + Number(this._.step);
		}
	}
}

export default Range;