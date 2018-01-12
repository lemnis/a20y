import boolean from "./../type/boolean";
import getActive from "./../utils/getActive";
import Input from "./abstract/Input";

/**
 * @extends Input
 */
class Option extends Input {

	constructor(...args) {
		super(...args);

		this.addListener("click", this.onClick.bind(this));
		this.addListener("key", this.onClick.bind(this), {key: "enter", target: document});
		this.addListener("key", this.onClick.bind(this), {key: "space", target: document});
		// this.addKeyListener("Enter", selectItem.bind(this));
	}

	onClick(ev) {
		if(typeof super.onClick == "function") super.onClick(ev);
		if(ev) ev.preventDefault();

		if (this == getActive()) {
			this.selected = boolean.toggle(this.selected);
		}
	}
}

export default Option;