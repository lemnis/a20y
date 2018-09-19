import { DeclareMixin } from '@vestergaard-company/js-mixin';

/** @module */

/**
* Adds functionality to the `expanded` attribute
* @todo add a setting to define how the visibility should be toggled
* @name expanded
* @alias module:expanded
* @mixin
*/
export default DeclareMixin((superclass) => class extends superclass {

	/**
	 * Updates the element expanded state to open and 
	 * fires the open event to all elements who are connected trough `controls`
	 * @name module:expanded#onOpen
	 * @param {Event} ev
	 * @fires [aria-controls]#event:open
	 */
	onOpen(ev) {
		if (typeof super.onOpen == "function") super.onOpen(ev);
		if (ev && typeof ev.preventDefault === "function") ev.preventDefault();

		if (this.disabled !== true && this.expanded === false) {
			this.expanded = true;

			if (this.controls) {
				this.controls.forEach(control => {
					control.dispatchEvent(new Event("open"));
				});
			}
		}
	}

	/**
	 * Updates the element expanded state to close and 
	 * fires the close event to all elements who are connected trough `controls`
	 * @name module:expanded#onClose
	 * @param {Event} ev
	 * @fires [aria-controls]#event:close
	 */
	onClose(ev) {
		if (typeof super.onClose == "function") super.onClose(ev);
		if (ev && typeof ev.preventDefault === "function") ev.preventDefault();
		
		if (this.disabled !== true && this.expanded === true) {
			this.expanded = false;

			if (this.controls) {
				this.controls.forEach(control => {
					control.dispatchEvent(new Event("close"));
				});
			}
		}		
	}
});