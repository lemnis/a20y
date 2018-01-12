export const pseudoClasses = {
	/* NATIVE PSEUDO CLASSES */

	/** @todo: add classes with JS where an pseudo class can be mimiced */
	// "active": [":active"],
	// "in-range": [":in-range"],
	// "out-of-range": [":out-of-range"],
	// "user-error": [":user-error"],

	// The :any-link CSS pseudo-class selector represents an element that acts as the source anchor
	// of a hyperlink, independent of whether it has been visited.
	"any-link": [":any-link", "[role='link']"],
    
	// The: checked CSS pseudo - class selector represents any radio(<input type="radio">), checkbox
	// (<input type="checkbox">), or option (<option> in a <select>) element that is checked or
	// toggled to an on state.
	"checked": [":checked", "[aria-checked='true'"],

	// The :default pseudo-class matches checkboxes and radio buttons which are checked by default, 
	// <option>s with the selected attribute, and the default submit button (if any) of a form.
	// "default": [":default"],

	"disabled": [":disabled", "[aria-disabled='true']"],
	/** @todo: add input fields who :not([aria-disabled]) */
	"enabled": [":enabled", "[aria-disabled='false']"],

	// The: indeterminate pseudo-class matches indeterminate checkboxes, indeterminate<progress> bars,
	// and radio buttons with no checked button in their radio button group.
	/** @todo: add all aria-checked elementes */
	"indeterminate": [":indeterminate", "[role='checkbox'][aria-checked='mixed']"],

	"invalid": [":invalid", "[aria-invalid='true']", "[aria-invalid='grammar']", "[aria-invalid='spelling']"],

	// Th :optional && :required :  :optional pseudo-class matches form inputs (input, textarea, select) which are not :required.
	// :optional && :required : /** @todo: add input fields who :not([aria-required]) etc. */
	"optional": [":optional"],

	"placeholder-shown": [":placeholder-shown", ":empty[aria-placeholder]::before"],
    
	/** @note [readonly] for wider browser support */
	"read-only": [":read-only", "[aria-readonly='true']", "[readonly]"],

	// The: read - write CSS pseudo - class represents an element(such as a text input) that is 
	// editable by the user.
	// :optional && :required : /** @todo: add input fields who :not([aria-required]):not([aria-disabled]) etc. */
	"read-write": [":read-write"],

	"required": [":required", "[aria-required='true']"],
	"valid": [":valid", "[aria-invalid='false']"],

	/* END OF NATIVE PSEUDO CLASSES */
};

export const pseudoElements = {
	/** @todo: add classes with JS where an pseudo class can be mimiced */
	// "backdrop": ["::backdrop", ".backdrop"],

	// The:: placeholder pseudo - element represents placeholder text in an input field: text that 
	// represents the input and provides a hint to the user on how to fill out the form.For example,
	// a date - input field might have the placeholder text YYYY/MM/DD to clarify that numeric dates
	// are to be entered in year - month - day order.
	/** @todo: :empty[aria-placeholder]::before shoud have `content: attr(aria-placeholder);` */
	"placeholder": [":placeholder", ":empty[aria-placeholder]::before"],
};

export const attributes = {
	// "aria-activedescendant": [],
	"aria-atomic": [],
	"autocomplete": ["[aria-autocomplete='inline']", "[aria-autocomplete='list']",
		"[aria-autocomplete='both']", "[autocomplete]:not([autcomplete='off'])"],
	// :checked && :indeterminate : "aria-checked": [],
	"aria-colcount": [],
	"aria-colindex": [],
	// "aria-controls": [],
	"aria-current": [],
	// "aria-describedby": [],
	// "aria-details": [],
	// :disabled && :enabled : "aria-disabled": [],
	// "aria-errormessage": [],
	"expanded": ["[aria-expanded='true']", "details[open] + :scope"],
	// "aria-flowto": [],
	"aria-haspopup": [],
 
	/** @todo improve hidden selector */
	"hidden": ["[aria-hidden='true']", "[hidden]"
		// "[style*='display: none']",
		// "[style*='display:none']",
	],
	// :valid && :invalid : "aria-invalid": [],
	"aria-keyshortcuts": [],
	"aria-label": [],
	// "aria-labelledby": [],
	"aria-level": [],
	"aria-live": [],
	"aria-modal": [],
	"multiline": ["[aria-multiline='true']", "textarea"],
	/** @todo decide between multiselectable or multiple */
	"multiselectable": ["[aria-multiselectable='true']", "[multiple]"],
	"aria-orientation": [],
	// "aria-owns": [],
	// :placeholder : "aria-placeholder": [],
	"aria-posinset": [],
	"aria-pressed": [],
	// :read-only : "aria-readonly": [],
	"aria-relevant": [],
	// :optional && :required : "aria-required": [],
	"aria-roledescription": [],
	"aria-rowcount": [],
	"aria-rowindex": [],
	"aria-rowspan": [],
	"aria-selected": [],
	"aria-setsize": [],
	"aria-sort": [],
	"aria-valuemax": [],
	"aria-valuemin": [],
	"aria-valuenow": [],
	"aria-valuetext": [],
};