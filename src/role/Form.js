import Landmark from "./abstract/Landmark";
import selector from "./../utils/selector";
import elements from "./../utils/elements";
import create from "./../utils/create";

class Form extends Landmark {
	get elements() {
		// get native elements
		var selector = ["button", "fieldset", "input", "object", "output", "select", "textarea"].join(":not([role]),");
		var res = Array.from(this.elements.querySelectorAll(selector));

		var explicitRole = "";
		explicitRole += selector.getDeepRole("button");
		explicitRole += selector.getDeepRole("input");
		explicitRole += selector.getDeepRole("status");
		explicitRole += selector.getDeepRole("select");

		Array.prototype.forEach(
			this.elements.querySelectorAll(explicitRole), 
			node => res.push(elements.get(node) || create.one(node))
		);
		console.log(res, explicitRole, selector);
		return res;
	}
}

export default Form;