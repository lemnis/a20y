import boolean from "./../type/boolean";

/**
* Adds functionality to `aria-expanded` attribute
* @todo add a setting to define how the visibility should be toggled
*/
let AriaExpanded = (superclass) => class extends superclass {
	/**
	* @param  {HTMLElement} element Element with an `aria-expanded` attribute
	*/
	constructor(...args) {
		super(...args);
		if (this.expanded !== undefined) { // todo: add when first time aria-expanded is boolean
			this.addListener("click", this.onExpanded.bind(this));
			// this.addListener("key", this.onExpanded.bind(this), { key: ["enter", "space"] });
		}
	}

	onExpanded(ev) {
		if (typeof super.onExpanded == "function") super.onExpanded(ev);
		if(ev && typeof ev.preventDefault === "function") ev.preventDefault();

		if(this.disabled !== true) {
			this.expanded = boolean.toggle(this.expanded);

			if(this.expanded) {
				this.controls.forEach(control => {
					control.element.hidden = false;
				});
			} else {
				this.controls.forEach(control => {
					control.element.hidden = true;
				});
			}
		}
	}
};

export default AriaExpanded;