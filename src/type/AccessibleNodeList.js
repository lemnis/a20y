import elements from "../utils/elements";
import AccessibleNode from "./AccessibleNode";
import create from "./../utils/create";

class AccessibleNodeListCon extends Array {
	constructor(...args) {
		super(...args);
	}

	item(index) {
		return this[index];
	}

	add(AccessibleNode, before = null) {
		if(before !== null) {
			var beforeIndex = this.indexOf(before);
			if(beforeIndex > -1) {
				return this.splice(beforeIndex - 1, 0, AccessibleNode);
			}
		}
		return this.push(AccessibleNode);
	}

	remove(index) {
		return this.pop(index);
	}
}

function getIds(node, attribute) {
	let idString = node.getAttribute(attribute);
	
	if (!idString) return new AccessibleNodeListCon();

	return new AccessibleNodeListCon(idString.split(" "));
}

/**
 * 
 */
function AccessibleNodeList(ay, attribute) {
	let ids = getIds(ay.element, attribute);

	var arrayChangeHandler = {
		get: function (target, property) {
			// element is requested trought target[Number]
			if (!isNaN(property) && target[property]) {
				let el = document.getElementById(target[property]);

				if(!el) {
					// throw new Error("Element not found");
				}

				let autotility;
				// property is index in this case
				if (el) { autotility = elements.get(el); }
				if(!autotility) { autotility = create.one(el); }
				return autotility;
			}

			return target[property];
		},
		set: function (target, property, value) {
			// adding or changing a value inside the array
			if (!isNaN(property)) {
				// is of valid type
				if (value instanceof AccessibleNode) {
					if(!value.element.id) {
						throw new Error("The element must have an ID");
					}
					target[property] = value.element.id;
					return true;
				}
				
				throw new Error("Only instances of AccessibleNode are allowed");
			}
			
			target[property] = value;
			// you have to return true to accept the changes
			return true;
		}
	};
	
	return new Proxy(ids, arrayChangeHandler);
}

export default AccessibleNodeList;