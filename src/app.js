import * as roletype from "./role/Roletype.js";
import * as button from "./role/Button.js";
import * as checkbox from "./role/Checkbox.js";
import * as tab from "./role/Tab.js";
import * as tablist from "./role/Tablist.js";

import {storedElements} from "./utils/elements.js";

var roles = [].concat(roletype, button, checkbox, tab, tablist);
roles.forEach((role) => {
	if(role.options && role.options.selector) {
		var nodeList = document.querySelectorAll(role.options.selector);
		for (var i = 0; i < nodeList.length; i++) {
			storedElements.set(nodeList[i], new role.default(nodeList[i]));
		}
	}
});