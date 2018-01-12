import mix from "@vestergaard-company/js-mixin";
import Range from "./abstract/Range";

export const options = {
	selector: "[role='spinbutton']",
	role: "spinbutton"
};

/**
 * A input field with 2 button to increase or decrease the numberical value
 * @extends Range
 *
 * @see {@link https://html.spec.whatwg.org/multipage/input.html#number-state-(type=number)}
 */
class Spinbutton extends Range {
	constructor(el, options) {
		super(el, options);

		// register custom elements
		/**
		* @name Spinbutton#_
		* @type {Object}
		* @prop {HTMLElement} [spinbutton.up]
		* @prop {HTMLElement} [spinbutton.down]
		*/
		this._.registerCustomElement("spinbutton.up");
		this._.registerCustomElement("spinbutton.down");
		this._.registerCustomValue("step", 1);

		// set defaults
		/**
		* @name Spinbutton#valueNow
		* @type {Number}
		* @default [0]
		*/
		if(null === this.valueNow) this.valueNow = 0;

		// todo: allow automatically setting valueText with some sugar

		this._.spinbutton.up.addEventListener("click", this.stepUp.bind(this));
		this._.spinbutton.down.addEventListener("click", this.stepDown.bind(this));
		this.addKeyListener("up", this.stepUp.bind(this));
		this.addKeyListener("down", this.stepDown.bind(this));
		this.element.value = this.valueNow;
	}

	get valueNow() { return super.valueNow; }
	set valueNow(val) {
		super.valueNow = val;
		this.element.value = val;
	}
}

export default Spinbutton;