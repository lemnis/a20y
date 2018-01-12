import elements from "./elements";

export default function() {
	let ay = elements.get(document.activeElement);

	if(!ay) return;
	if(ay.activeDescendant) return ay.activeDescendant;

	return ay;
}