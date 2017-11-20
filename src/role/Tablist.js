import Roletype from "./Roletype.js";
import mix from "@vestergaard-company/js-mixin";

export const options = {
	owns: "tabs", // children roles
	selector: "[role='tablist']"
};

export default class Tablist extends mix(Roletype).with() {}
