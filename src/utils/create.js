import selector from "./selector";
import elements from "./elements";
import getComputedRole from "./getComputedRole";

import Range from "./../role/abstract/Range";
import Roletype from "./../role/abstract/Roletype";

import Button from "./../role/Button";
import Checkbox from "./../role/Checkbox";
import Combobox from "./../role/Combobox";
import Dialog from "./../role/Dialog";
import Form from "./../role/Form";
import Link from "./../role/Link";
import Listbox from "./../role/Listbox";
import Option from "./../role/option";
import Radio from "./../role/Radio";
import Radiogroup from "./../role/Radiogroup";
import Searchbox from "./../role/searchbox";
import Slider from "./../role/Slider";
import Spinbutton from "./../role/Spinbutton";
import Switch from "./../role/Switch";
import Tab from "./../role/Tab";
import Tablist from "./../role/Tablist";
import Tabpanel from "./../role/Tabpanel";
import Textbox from "./../role/Textbox";

var obj = { Button, Checkbox, Combobox, Dialog, Form, Listbox, 
	Option, Range, Roletype, Searchbox, Slider, Spinbutton,
	Tab, Tablist, Tabpanel, Textbox, Link, Switch,
	Radiogroup, Radio
};

function all() {
	for (let key in obj) {
		var nodeList = document.querySelectorAll(selector.getRole(key.toLowerCase()));
		for (let i = 0; i < nodeList.length; i++) {
			elements.set(nodeList[i], new obj[key](nodeList[i]));
		}
	}
}

function one(el) {
	if(elements.has(el)) return elements.get(el);
	var role = getComputedRole(el);
	
	/** @todo Remove fallback method */
	var constructor = obj[role] || Roletype;

	return elements.set(el, new constructor(el));
}

function instanceOf(ay, role) {
	return ay instanceof obj[role];
}

export default {all, one, instanceOf};
