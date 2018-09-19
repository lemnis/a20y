/** @module Menuitem */

import mix from "@vestergaard-company/js-mixin";

import Roletype from "./abstract/Roletype";
import expanded from "./../properties/expanded";


/** 
 * 
 * ### Keyboard navigation
 * 
 * | Key    |Action |
 * | ------ | ----- |
 * | Enter  | Opens the submenu
 * | Space  | Opens the submenu
 * | &darr; | Opens the submenu
 * 
 * ### Examples
 * 
 * <div role="menuitem" tabindex="0">Apple</div>
 * 
 * ```
 * <div role="menuitem" tabindex="0">Apple</div>
 * ```
 * 
 * #### With popup
 * 
 * <ul role="menu">
 *   <li role="none">
 *     <div tabindex="0" role="menuitem" aria-haspopup="true" aria-expanded="false" aria-controls="submenu">Apple</div>
 *     <ul role="menu" id="submenu" aria-label="Fruits" aria-hidden="false">
 *       <li role="none"><div tabindex="0" role="menuitem">Banana</div></li>
 *     </ul>
 *   </li>
 * </ul>
 * 
 * ```
 * <ul role="menu">
 *   <li role="none">
 *     <div tabindex="0" role="menuitem" aria-haspopup="true" aria-expanded="false" aria-controls="submenu">Apple</div>
 *     <ul role="menu" id="submenu" aria-label="Fruits" aria-hidden="false">
 *       <li role="none"><div tabindex="0" role="menuitem">Banana</div></li>
 *     </ul>
 *   </li>
 * </ul>
 * ```
 * 
 * @mixes expanded
 * @alias module:Menuitem
 * 
 * @listens click
 * @listens KeyboardEvent:Enter
 * @listens KeyboardEvent:ArrowDown
 * @listens KeyboardEvent:Space
 * @listens open
 * @listens close
 */
export default class Menuitem extends mix(Roletype).with(expanded) {
    constructor(...args) {
        super(...args);

        if(typeof this.expanded !== "undefined") {
            let onOpen = this.onOpen.bind(this);
            let onClose = this.onClose.bind(this);

            this.addEventListener("click", (ev) => {this.expanded === true ? onClose(ev) : onOpen(ev)});
            this.addEventListener("key", onOpen, {key: ["Enter", "ArrowDown", "Space"]});
            this.addEventListener("open", onOpen);
            this.addEventListener("close", onClose);
        }
    }
}