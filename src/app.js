import * as roletype from "./role/Roletype.js";
import * as button from "./role/Button.js";
import * as checkbox from "./role/Checkbox.js";
import * as slider from "./role/Slider.js";
import * as tab from "./role/Tab.js";
import * as tabpanel from "./role/Tabpanel.js";
import * as tablist from "./role/Tablist.js";

import {storedElements} from "./utils/elements.js";

var roles = [].concat(roletype, button, checkbox, slider, tabpanel, tab, tablist);
roles.forEach((role) => {
	if(role.options && role.options.selector) {
		var nodeList = document.querySelectorAll(role.options.selector);
		for (let i = 0; i < nodeList.length; i++) {
			storedElements.set(nodeList[i], new role.default(nodeList[i]));
		}
	}

	if(role.options && role.options.selectorsWithImplicitRole) {
		var htmlNodeList = document.querySelectorAll(role.options.selectorsWithImplicitRole.join(","));
		for (let j = 0; j < htmlNodeList.length; j++) {
			storedElements.set(htmlNodeList[j], new role.default(htmlNodeList[j]));
		}
	}
});

window.storedElements = storedElements;