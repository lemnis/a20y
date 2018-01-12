import mix from "@vestergaard-company/js-mixin";
import Command from "./abstract/Command.js";
import boolean from "./../type/boolean";

import AriaExpanded from "../attributes/aria-expanded";

function close() {
	this.expanded = boolean.IS_NOT_ACTIVE;
}

/**
 * An interactive reference to an internal or external resource that,
 * when activated, causes the user agent to navigate to that resource.
 * 
 * @extends Command
 * @mixes AriaExpanded
 * @param {String} options.link.href  URL that should be used
 * @listens click
 * @example
 * <div role="link" data-link-href="http://www.example.com/" tabindex="0">
 * 	Open website
 * </div>
 */
class Link extends mix(Command).with(AriaExpanded) {
	constructor(...args) {
		super(...args);

		this._.registerCustomValue("link.href");

		if(this._.link.href) {
			this.addListener("click", this.onClick.bind(this));
			this.addListener("key", this.onClick.bind(this), { key: "enter" });
		}

		this.addListener("expanded")

		if (this.expanded !== undefined) { // todo: add when first time aria-expanded is boolean
			this.controls.forEach(control => control.addListener("close", close.bind(this)));
			this.addListener("click", this.onExpanded.bind(this));
			this.addListener("key", this.onExpanded.bind(this), { key: "enter" });
		}
	}

	/**
	 * Fired when state of expanded is changed 
	 * @param {Event} ev 
	 */
	onExpanded(ev) {
		if (typeof super.onExpanded == "function") super.onExpanded(ev);

		if (this.disabled !== true) {
			if (this.expanded) {
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

	/**
	 * Open the url that is defined in the options,  
	 * fires an click event only if its origin wasn't an click event
	 * @param {Event} ev 
	 * @fires link#accessibleclick
	 * @fires click
	 */
	onClick(ev) {
		if (typeof super.onClick == "function") super.onClick(ev);
	
		if(this._.link.href) {
			console.log("should open", this._.link.href);
			// window.location.href = this._.link.href;
		}

		/**
     * An click triggered by an keyboard or mouse
     * @event Link#accessibleclick
     */
		this.dispatchEvent(new Event("accessibleclick"));
		if(ev.type !== "click") {
			this.dispatchEvent(new MouseEvent("click"));
		}
	}
}

export default Link;