import mix from "@vestergaard-company/js-mixin";
import Command from "./abstract/Command.js";
import AriaChecked from "../attributes/aria-checked.js";

/**
 * A checkable input in a group of elements with the same role,
 * only one of which can be checked at a time.
 * 
 * @extends Command
 * @mixes AriaChecked
 * @example
 * <div role="radio" aria-checked="true" tabindex="0">Apple</div>
 */
class Radio extends mix(Command).with(AriaChecked) {
	/**
	 * @constructs Radio
	 */
}

export default Radio;
