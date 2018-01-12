import mix from "@vestergaard-company/js-mixin";
import Input from "./abstract/Input";

import AriaChecked from "../attributes/aria-checked.js";

class Checkbox extends mix(Input).with(AriaChecked) {}

export default Checkbox;
