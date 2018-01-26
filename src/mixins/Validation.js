import ValidityState 	from "./../utils/ValidityState";

/**
 * @mixin
 * @borrows ValidityState as validity
 * @lends Validation#
 */
let Validation = (superclass) => class Validation extends superclass 
{ 
	get validity() { 
		if(!this._validity) this._validity = new ValidityState(this);

		return this._validity;
	}

	/**
	 * Returns true if the element will be validated when the form is submitted; false otherwise.
	 * @type {Boolean}
	 */
	get willValidate() { return !this.hidden && !this.readOnly; }

	/**
	 * Returns the error message that would be shown to the user
	 * if the element was to be checked for validity.
	 * @name Validation#validationMessage
	 * @type {String}
	 */
	get validationMessage() {
		if(this.validity.valid) return;
		if(this.validity.valueMissing) return "Please fill in this field.";
		if(this.validity.typeMismatch) return "Please use the correct input type.";
		
		if (this.validity.tooLong) {
			return "Please shorten this text to 10 characters or less (you are currently using 48 characters).";
		}
		if(this.validity.tooShort) {
			return "Please lengthen this text to 10 characters or more (you are currently using 1 character).";
		}

		if(this.validity.badInput) return "Please enter a number.";
		if (this.validity.stepMismatch) return "Please select a valid value.";
		if (this.validity.rangeOverflow) return "Please select a smaller value.";
		if (this.validity.rangeUnderflow) return "Please select a larger value.";
		if(this.validity.patternMismatch) return "Please match the format requested.";
		if(this.validity.customError) return this.errormessage.element.innerHTML;

		// Fallback value should never been shown
		return this.errormessage.element.innerHTML || "The value you entered for this field is invalid.";		
	}

	/**
	 * Returns true if the element’s value has no validity problems; false otherwise.
	 * Fires an invalid event at the element in the latter case.
	 * @fires invalid
	 * @name Validation#checkValidity
	 */
	checkValidity() {
		if(!this.validity.valid) this.dispatchEvent("invalid", this);
		return this.validity.valid;
	}

	/**
	 * Returns true if the element’s value has no validity problems; otherwise, returns false, fires an
	 * invalid event at the element, and(if the event isn’t canceled) reports the problem to the user.
	 * @fires invalid
	 * @name Validation#reportValidity
	 */
	reportValidity() {
		if (!this.validity.valid) {
			let cancelled = !this.dispatchEvent("invalid", this);
			if (!cancelled) {
				this.errormessage.hidden = false;
			}
		} else {
			this.errormessage.hidden = true;
		}
		return this.validity.valid;
	}

	/**
	 * Sets a custom error, so that the element would fail to validate.The given message is the
	 * message to be shown to the user when reporting the problem to the user.
	 * 
	 * If the argument is the empty string, clears the custom error.
	 * 
	 * @name Validation#setCustomValidity
	 * @param {?String} message 
	 */
	setCustomValidity(message) {
		// update ValidyState object
		this.validity._customError = message;

		if(message) {			
			// update `aria-invalid` property to invalid
			this.invalid = true;
			
			// update error message
			this.errormessage.element.innerHTML = message;
			this.errormessage.element.hidden = false;
		} else {			
			// update `aria-invalid` property to invalid
			this.invalid = false;
			
			// update error message
			this.errormessage.element.innerHTML = "";
			this.errormessage.element.hidden = true;
		}
	}
};

export default Validation;