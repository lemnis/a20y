import mix from "@vestergaard-company/js-mixin";
import Roletype from "./Roletype.js";

import AriaPressed from "../attributes/aria-pressed.js";
// import AriaExpanded from "../attributes/aria-expanded.js";

export const options = {
	selector: "[role='button']"
};

export default class Button extends mix(Roletype).with(AriaPressed) {}
