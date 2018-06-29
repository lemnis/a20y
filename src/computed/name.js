function findIdFromIdList(searchId, idList) {
	return idList.split(" ").some((id) => {
		return id === searchId;
	});
}

/**
 * 
 * @todo Convert to ay instances instead of nodes.
 * @param {*} ay 
 */
function isReferencedByAriaAttributes(ay) {
	let id = ay.el.id;
	let cssSelector = `
				[aria-labelledby*='${id}'], 
				[aria-describedby*='${id}']
			`;

	let nodes = ay.el.ownerDocument.querySelectorAll(cssSelector);

	Array.some.call(nodes, (node) => {

		
		if (
			node.hasAttribute("aria-labelledby") &&
			findIdFromIdList(id, node.getAttribute("aria-labelledby"))
		) {
			return true;
		}

		if (
			node.hasAttribute("aria-describedby") &&
			findIdFromIdList(id, node.getAttribute("aria-describedby"))
		) {
			return true;
		}
	});
}

function getTextOfAllElements(node, isTraversedByAriaLabelledby) {
	let accumulatedText = "";


	// If the current node has an aria-labelledby attribute
	// that contains at least one valid IDREF, and the current node is not already
	// part of an aria-labelledby traversal, process its IDREFs in the order they
	// occur:
	if (node.hasAttribute("aria-labelledby")) {
		let idList = node.getAttribute("aria-labelledby").split(" ");

		// Check if id list has a valid ID reference.
		let referencedNodes = idList.map((id) => node.ownerDocument.getElementById(id));

		if (referencedNodes.length > 0 && !isTraversedByAriaLabelledby) {

			// Set the accumulated text to the empty string.
			accumulatedText = "";

			// For each ID reference:
			// * Set the current node to the node referenced by the ID reference.
			// * Compute the text alternative of the current node. 
			//   Set the result to that text alternative.
			// * Append the result, with a space, to the accumulated text.
			/** @todo Prevent double spaces in the output. */
			accumulatedText += " " + referencedNodes.forEach((node) => {
				return getTextOfAllElements(node, true);
			});
		}

		// Return the accumlated text.
		return accumulatedText;
	}

	// If computing a name, and if the current node has an aria-label attribute
	// whose value is not the empty string, nor, when trimmed of white space, is
	// not the empty string:
	if (node.hasAttribute("aria-label")) {

		/** @todo Check sufficient way to remove whitespace. */
		let ariaLabel = node.getAttribute("aria-label").split(" ").join("");

		/**
		 * @todo if computing a name, and if the current node has an aria-label
		 * attribute whose value is not the empty string, nor, when trimmed of
		 * white space, is not the empty string:
		 */

		if(ariaLabel) {
			return ariaLabel;
		}
	}

	// If the current node's native markup provides an attribute (e.g. title) or
	// element (e.g. HTML label) that defines a text alternative, return that
	// alternative in the form of a flat string as defined by the host language,
	// unless the element is marked role="presentation" or role="none".
	if (node.role !== "presentation" || node.role !== "none") {
		if (getTextAlternativeByNativeAttribute(node)) {
			return getTextAlternativeByNativeAttribute(node);
		}

		if (getTextAlternativeByNativeElement(node)) {
			return getTextAlternativeByNativeElement(node);
		}
	}

	// If the current node is a control embedded within the label (e.g. the 
	// label element in HTML or any element directly referenced by 
	// aria-labelledby) for another widget, where the user can adjust the
	// embedded control's value, then include the embedded control as part of
	// the text alternative in the following manner:
	/** @todo Implement above description. */

	// If the current node's role allows name from content, or if the current
	// node is referenced by aria-labelledby, aria-describedby, or is a native 
	// host language text alternative element (e.g. label in HTML), or is a
	// descendant of a native host language text alternative element:
	/** @todo Implement above description */

	// If the current node is a Text node, return its textual contents.
	if (node instanceof Text) {
		return node.wholeText;
	}

	// If the current node is a descendant of an element whose Accessible Name
	// or Accessible Description is being computed, and contains descendants,
	// proceed to 2F.i.

	// If the current node has a Tooltip attribute, return its value.

}

export default function(ay) {
	let rootAy = ay;
	let accumulatedText = "";
	let id = ay.el.id;

	let ariaLabelledbyTraversalList = [];
	
	// If the current node is hidden and is not directly referenced by 
	// aria-labelledby or aria-describedby, nor directly referenced by a native 
	// host language text alternative element (e.g. label in HTML) or attribute,
	// return the empty string..
	if(
		ay.hidden &&
		id && 
		(
			!isReferencedByAriaAttributes(ay) ||
			!ay.el.ownerDocument.querySelector(`label[for='${id}']`)
		)
	) {
		return "";
	}

	return getTextOfAllElements(ay.el, false);
}