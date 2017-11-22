import Roletype from "./Roletype.js";
import mix from "@vestergaard-company/js-mixin";

export const options = {
	selector: "[role='tabpanel']"
};

export default class Tabpanel extends mix(Roletype).with() {}
