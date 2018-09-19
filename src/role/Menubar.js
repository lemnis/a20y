/** @module Menubar */

import Menu from "./Menu";

/** 
 * ### Examples
 * 
 * #### Default (with roving tabindex)
 * 
 * <ul id="menubar1" role="menubar">
 *   <li role="none"><a role="menuitem" tabindex="0">Apple</a></li>
 *   <li role="none"><a role="menuitem" tabindex="-1">Banana</a></li>
 *   <li role="none"><a role="menuitem" tabindex="-1">Pear</a></li>
 * </ul>
 * 
 * #### With activedescendant
 * 
 * <ul id="menubar1" role="menubar" tabindex="0" aria-activedescendant="item1">
 *   <li id="item1" role="menuitem">Apple</a></li>
 *   <li id="item2" role="menuitem">Banana</a></li>
 *   <li id="item3" role="menuitem">Pear</a></li>
 * </ul>
 * 
 * @alias module:Menubar
 * @extends Menu
 */
export default class Menubar extends Menu {}