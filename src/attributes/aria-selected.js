import boolean from "./../type/boolean";

/**
 * gets and sets the `aria-selected` attribute.
 *
 * Indicates if a element is selectable
 *
 * @see https://www.w3.org/TR/wai-aria-1.1/#aria-selected
 */
let AriaSelected = (superclass) => class extends superclass {
	constructor(...args) {
		super(...args);

		this.addListener("click", this.onSelected.bind(this));
		this.addListener("key", this.onSelected.bind(this), {key: ["space", "enter"]});
	}

	onSelected(ev) {
		if(typeof super.onSelected == "function") super.onSelected(ev);
		this.selected = boolean.toggle(this.selected);
	}
};

export default AriaSelected;