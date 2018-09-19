/** @module Menu */

import mix from "@vestergaard-company/js-mixin";

import Roletype from "./abstract/Roletype";
import activeDescendant from "./../properties/activeDescendant";

import focus from "./../utils/focus";
import tree from "./../utils/tree";

/** 
 * ### Examples
 * 
 * <ul id="menubar1" role="menubar">
 *   <li role="none"><a role="menuitem">Hoi</a></li>
 *   <li role="presentation">
 *     <a role="menuitem" aria-haspopup="true" aria-expanded="false" href="#" tabindex="0">About</a>
 *     <ul role="menu" aria-label="About">
 *       <li><a role="menuitem" href="mb-about.html#overview" tabindex="-1">Overview</a></li>
 *       <li role="none"><a role="menuitem" href="mb-about.html#admin" tabindex="-1">Administration</a></li>
 *       <li role="none">
 *         <a id="menubar113" role="menuitem" href="#" aria-haspopup="true" aria-expanded="false" tabindex="-1">Facts</a>
 *         <ul role="menu" aria-label="Facts">
 *           <li role="none"><a role="menuitem" href="mb-about.html#facts" tabindex="0">History</a></li>
 *           <li role="none"><a role="menuitem" href="mb-about.html#facts" tabindex="-1">Current Statistics</a></li>
 *           <li role="none"><a role="menuitem" href="mb-about.html#facts" tabindex="-1">Awards</a></li>
 *         </ul>
 *       </li>
 *     </ul>
 *   </li>
 * </ul>
 * 
 * @alias module:Menu
 * 
 * @listens KeyboardEvent:Escape
 * @listens open
 * @listens close
 */
export default class Menu extends mix(Roletype).with(activeDescendant) {
	constructor(...args) {
		super(...args);

		this.addEventListener("key", this.onClose.bind(this), {key: "Escape"});
		this.addEventListener("open", this.onOpen.bind(this));
		this.addEventListener("close", this.onClose.bind(this));
	}

	onClose(ev) {
		// check if target is a direct child
		if ((this.options.indexOf(ev.target) > -1) || this === ev.target) {
			let parent = tree.getParent(this);

			// check if current menu is a submenu
			if (parent && (parent.role == "menu" || parent.role == "menubar") && parent.options) {
				
				// find menuitem that controls the state of current menu
				let ancestor = parent.options.find(option => option.controls && option.controls.indexOf(this) > -1);
				
				if(ancestor) {
					this.hidden = true;
					focus.focus(ancestor);
				}
			}
		}
	}

	onOpen(ev) {
		if (ev.target === this && !ev.bubbles) {
			this.hidden = false;
			focus.focus(this.options[0]);
		}
	}
}