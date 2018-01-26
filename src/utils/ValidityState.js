import create from "./create";

/**
 * 
 */
class ValidityState {
	constructor(ay) {
		Object.defineProperty(this, "_ay", {
			value: ay
		});
	}
}

Object.defineProperties(ValidityState.prototype,
	/** @lends ValidityState.prototype */
	{
		/**
		 * Returns true if the user has provided input in the user interface that the 
		 * user agent is unable to convert to a value; false otherwise.
		 * @type {Boolean}
		 */
		badInput: {
			enumerable: true,
			get() {
				if (((create.instanceOf(this._ay, "spinbutton") || create.instanceOf(this._ay, "slider"))
					&& this._ay.valueNow.length > 0 && !/^[-+]?(?:\d+|\d*[.,]\d+)$/.test(this._ay.valueNow))
				) {
					return true;
				}
				return false;
			}
		},

		/**
		 * Returns true if the element has a custom error; false otherwise.
		 * @type {Boolean}
		 */	
		customError: {
			enumerable: true,
			get() { return !!this._customError; }
		},

		/**
		 * Returns true if the element’s value doesn’t match the provided pattern; false otherwise.
		 * @type {Boolean}
		 */
		patternMismatch: {
			enumerable: true,
			get() {
				var value = this._ay._.input ? this._ay._.input.value : this._ay.valueNow;
				if (this._ay._.input.pattern && value.length > 0 && new RegExp(this._ay._.input.pattern).test(value) === false) {
					return true;
				}
				return false;
			}
		},

		/**
		 * Returns true if the element’s value is higher than the provided maximum; false otherwise.
		 * @type {Boolean}
		 */
		rangeOverflow: {
			enumerable: true,
			get() {
				if (this._ay.valueNow && this._ay.valueMax && this._ay.valueNow > this._ay.valueMax) {
					return true;
				}

				return false;
			}
		},

		/**
		 * Returns true if the element’s value is lower than the provided minimum; false otherwise.
		 * @type {Boolean}
		 */
		rangeUnderflow: {
			enumerable: true,
			get() {
				if (this._ay.valueNow && this._ay.valueMin && this._ay.valueNow < this._ay.valueMin) {
					return true;
				}

				return false;
			}
		},

		/**
		 * Returns true if the element’s value doesn’t fit the rules given by the step attribute; false otherwise.
		 * @type {Boolean}
		 */
		stepMismatch: {
			enumerable: true,
			get() {
				if (this._ay._.range && this._ay._.range.step && this._ay.valueNow % this._ay._.range.step !== 0) {
					return true;
				}

				return false;
			}
		},

		/**
		 * Returns true if the element’s value is longer than the provided maximum length; false otherwise.
		 * @type {Boolean}
		 */
		tooLong: {
			enumerable: true,
			get() {
				var value = this._ay._.input ? this._ay._.input.value : this._ay.valueNow;
				if (this._ay.maxlength && value.length > this._ay.maxlength) {
					return false;
				}
				return false;
			}
		},

		/**
		 * Returns true if the element’s value, if it is not the empty string, is shorter than the provided minimum length; false otherwise.
		 * @type {Boolean}
		 */
		tooShort: {
			enumerable: true,
			get() {
				var value = this._ay._.input ? this._ay._.input.value : this._ay.valueNow;
				if (this._ay.minlength && value.length < this._ay.minlength) {
					return false;
				}
				return false;
			}
		},

		/**
		 * Returns true if the element’s value is not in the correct syntax; false otherwise.
		 * @type {Boolean}
		 */
		typeMismatch: { 
			enumerable: true,
			get() { return false; }
		},

		/**
		 * Returns true if the element has no value but is a required field; false otherwise.
		 * @type {Boolean}
		 */
		valueMissing: {
			enumerable: true,
			get() {
				var value = this._ay._.input ? this._ay._.input.value : this._ay.valueNow;
				if (
					this.required
					&& (
						((create.instanceOf(this._ay, "checkbox") || create.instanceOf(this._ay, "radio")
							|| create.instanceOf(this._ay, "option")) && !this._ay.checked)
						|| (create.instanceOf(this._ay, "select") && !value)
						|| ((create.instanceOf(this._ay, "input") || create.instanceOf(this._ay, "gridcell")) && !value > 0)
					)
				) {
					return true;
				}

				return false;
			}
		},

		/**
		 * Returns true if the element’s value has no validity problems; false otherwise
		 * @type {Boolean}
		 */
		valid: {
			enumerable: true,
			get() {
				return !(
					this.badInput ||
					this.customError ||
					this.patternMismatch ||
					this.rangeOverflow ||
					this.rangeUnderflow ||
					this.stepMismatch ||
					this.tooLong ||
					this.tooShort ||
					this.typeMismatch ||
					this.valueMissing
				);
			}
		}
	}
);

export default ValidityState;