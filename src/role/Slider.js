import mix from "@vestergaard-company/js-mixin";
import Roletype from "./Roletype.js";

import AriaValuemin from "../attributes/aria-valuemin.js";
import AriaValuemax from "../attributes/aria-valuemax.js";
import AriaValuenow from "../attributes/aria-valuenow.js";
import AriaValuetext from "../attributes/aria-valuetext.js";

export const options = {
	selector: "[role='slider']",
	role: "slider",
	selectorsWithImplicitRole: ["input[type='range']"]
};

export default class Slider extends mix(Roletype).with(
	AriaValuenow,
	AriaValuemin,
	AriaValuemax,
	AriaValuetext
) {
	constructor(...args) {
		super(...args);
	}
}
