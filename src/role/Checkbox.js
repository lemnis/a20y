import mix from "@vestergaard-company/js-mixin";
import Roletype from "./Roletype.js";

import AriaChecked from "../attributes/aria-checked.js";

export const options = {
	selector: "[role='checkbox']",
	role: "checkbox",
	selectorsWithImplicitRole: [ "input[type='checkbox']" ]
};
export default class Button extends mix(Roletype).with(AriaChecked) {}
