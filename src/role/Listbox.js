import Select from "./abstract/Select";
import boolean from "./../type/boolean";

/**
 * @summary A widget that allows the user to select one or more items from a list of choices.
 * @desc
 * ### Keyboard Support
 *
 * #### Default
 * | Key | Function |
 * | --- | -------- |
 * | Down Arrow | Moves focus to the next option <br/> If not multiselectable, it selects the focused option.
 * | Up Arrow 	| Moves focus to the previous option  <br/> If not multiselectable, it selects the focused option.
 * | Home 			|	Moves focus to the first option  <br/> If not multiselectable, it selects the focused option.
 * | End  			|	Moves focus to the last option  <br/> If not multiselectable, it selects the focused option.
 * 
 * #### Multiple selection
 * | Key | Function |
 * | --- | -------- |
 * | Space									| Changes the selection state of the focused option.
 * | Shift + Down Arrow 		| Moves focus to and selects the next option.
 * | Shift + Up Arrow 			| Moves focus to and selects the previous option.
 * | Control + Shift + Home |	Selects from the focused option to the beginning of the list.
 * | Control + Shift + End  | Selects from the focused option to the end of the list.
 * | Control + A 	          | Selects all options in the list. If all options are selected, unselects all options.
 * 
 * ### Example
 * 
 * #### Basic example
 * 
 * <ul role="listbox" tabindex="0" aria-activedescendant="option_1" data-listbox-size="30">
 *   <li id="option_1" role="option">Apple</li>
 *   <li id="option_3" role="option">Asparagus</li>
 *   <li id="option_5" role="option">Beets</li>
 *   <li id="option_7" role="option">Broccoli</li>
 *   <li id="option_9" role="option">Cabbage</li>
 *   <li id="option_11" role="option">Cauliflower</li>
 *   <li id="option_13" role="option">Chard</li>
 *   <li id="option_15" role="option">Corn</li>
 *   <li id="option_17" role="option">Daikon</li>
 *   <li id="option_19" role="option">Edamame</li>
 * 	</ul>
 * 
 * ```html
 * <ul role="listbox" tabindex="0" aria-activedescendant="option_1">
 *   <li id="option_21" role="option">Elderberry</li>
 *   ...
 * </ul>
 * ```
 * 
 * #### Multi selectable example
 * 
 * <ul role="listbox" tabindex="0" aria-activedescendant="option_1" aria-multiselectable="true">
 *   <li id="option_21" role="option">Elderberry</li>
 *   <li id="option_23" role="option">Fig</li>
 *   <li id="option_25" role="option">Grape</li>
 *   <li id="option_27" role="option">Iceberg lettuce</li>
 *   <li id="option_29" role="option">Kale</li>
 *   <li id="option_31" role="option">Leek</li>
 *   <li id="option_33" role="option">Mango</li>
 *   <li id="option_35" role="option">Melon</li>
 *   <li id="option_37" role="option">Nectarine</li>
 *   <li id="option_39" role="option">Olive</li>
 *   <li id="option_41" role="option">Orange</li>
 *   <li id="option_43" role="option">Pea</li>
 *   <li id="option_45" role="option">Pineapple</li>
 *   <li id="option_47" role="option">Pumpkin</li>
 *   <li id="option_49" role="option">Radish</li>
 *   <li id="option_51" role="option">Shallot</li>
 *   <li id="option_53" role="option">Squash</li>
 *   <li id="option_55" role="option">Sweet potato</li>
 *   <li id="option_57" role="option">Turnip</li>
 *   <li id="option_59" role="option">Victoria plum</li>
 *   <li id="option_61" role="option">Watermelon</li>
 *   <li id="option_63" role="option">Zucchin</li>
 * 	</ul>
 * 
 * ```html
 * <ul role="listbox" tabindex="0" aria-activedescendant="option_1" aria-multiselectable="true">
 *   <li id="option_21" role="option">Elderberry</li>
 *   ...
 * <ul>
 * ```
 * 
 * @extends Roletype
 * @fires Listbox#change
 * @fires Listbox#input
 */
class Listbox extends Select {
	constructor(...args) {
		super(...args);

		this._.registerCustomValue("listbox.size", 1);

		this.size = 10;
		// this._node.addEventListener("click", clickOnOption.bind(this));

		// this.addKeyListener("enter", clickOnOption.bind(this));
	}

	/**
	 * Returns / Sets the size of control.
	 * @type {Integer}
	 */
	get size() { return this._.listbox.size; }
	set size(val) {
		var styles = getComputedStyle(this._node);
		this._node.style.height = parseFloat(styles.lineHeight) / parseFloat(styles.fontSize) * val + "em";
		this._.listbox.size = val;
	}

	moved(from, to) {
		// update selected on keyevent when only one item can be selected
		if (!this.multiselectable) {
			from.selected = undefined;
			to.selected = boolean.toggle(to.selected);
		}
	}
}

export default Listbox;