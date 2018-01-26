function setSelection(range) {
	var selection = window.getSelection();
	selection.removeAllRanges();
	selection.addRange(range);
}

/**
 * @mixin
 */
let Selection = (superclass) => class Selection extends superclass {
	/**
	 * Selects everything in the text control.
	 * @name Selection#select
	 */
	select() {
		this.setSelectionRange(0, this.value.length);
	}

	/**
	 * Returns / Sets the beginning index of the selected text. When nothing is selected,
	 * this returns the position of the text input cursor(caret) inside of the < input > element.
	 * 
	 * @name Selection#selectionStart
	 * @type {Number}
	 */
	get selectionStart() {
		let sel = window.getSelection();
		if (sel.anchorNode && sel.anchorNode.parentNode == this.element) {
			return sel.anchorOffset > sel.focusOffset ? sel.focusOffset : sel.anchorOffset;
		}
	}
	set selectionStart(start) {
		let range = new Range();
		range.setStart(this.element.firstChild, start);
		setSelection(range);
	}

	/**
	 * Returns / Sets the end index of the selected text. When there's no selection,this returns the
	 * offset of the character immediately following the current text input cursor position.
	 * 
	 * @name Selection#selectionEnd
	 * @type {Number}
	 */
	get selectionEnd() {
		let sel = window.getSelection();
		if (sel.focusNode && sel.focusNode.parentNode == this.element) {
			return sel.focusOffset > sel.anchorOffset ? sel.focusOffset : sel.anchorOffset;
		}
	}
	set selectionEnd(end) {
		let range = new Range();
		range.setEnd(this.element.firstChild, end);
		setSelection(range);
	}

	/**
	 * Returns / Sets the direction in which selection occurred.
	 * 
	 * * "forward" if selection was performed in the start - to - end direction of the current locale.
	 * * "backward" for the opposite direction,
	 * * "none" if the direction is unknown."
	 * 
	 * @name Selection#selectionDirection
	 * @todo improve method to set and get direction
	 * @type { "forward" | "backward" | "none" }
	 */
	get selectionDirection() {
		let sel = window.getSelection();
		if (sel.focusNode && sel.focusNode.parentNode == this.element) {
			if (sel.focusOffset == sel.anchorOffset) {
				return "none";
			} else if (sel.anchorOffset > sel.focusOffset) {
				return "backward";
			} else {
				return "forward";
			}
		}
	}
	set selectionDirection(direction) {
		let sel = window.getSelection();
		if (sel.focusNode && sel.focusNode.parentNode == this.element) {
			if (sel.focusOffset == sel.anchorOffset) {

			} else if (sel.anchorOffset > sel.focusOffset && direction != "backward") {
				let range = new Range();
				range.setStart(this.element.firstChild, this.selectionEnd);
				range.setEnd(this.element.firstChild, this.selectionStart);

				setSelection(range);
			} else if (direction != "forward") {
				let range = new Range();
				range.setStart(this.element.firstChild, this.selectionStart);
				range.setEnd(this.element.firstChild, this.selectionEnd);

				setSelection(range);
			}
		}
	}

	/**
	 * Selects a range of text in the element (but does not focus it).
	 * @name Selection#setSelectionRange
	 * @param {Integer} selectionStart
	 * @param {Integer} selectionEnd
	 * @param { "forward" | "backward" | "none" } [selectionDirection = "none"] 
	 * Establish the direction in which selection was set
	 */
	setSelectionRange(selectionStart, selectionEnd, selectionDirection = "none") {
		let start = selectionDirection == "backward" ? selectionEnd : selectionStart;
		let end = selectionDirection == "backward" ? selectionStart : selectionEnd;

		let range = new Range();
		range.setStart(this.element.firstChild, start);
		range.setEnd(this.element.firstChild, end);

		setSelection(range);
	}

	/**
	 * Replaces the range of text with the new text.
	 * @name Selection#setRangeText
	 * @todo Keep previous selection on place
	 * @param {String} replacement 
	 * @param {Integer} [start = {@link Textbox#selectionStart}]
	 * @param {Integer} [end]
	 * @param { "select" | "start" | "end" | "preserve" } [selectMode = "preserve"]
	 */
	setRangeText(
		replacement,
		start = this.selectionStart,
		end = this.selectionEnd,
		selectMode = "preserve"
	) {
		let selectionStart = this.selectionStart;
		let selectionEnd = this.selectionEnd;

		if (start > end) { throw new RangeError(); }
		if (start > this.value.length) { start = this.value.length; }
		if (end > this.value.length) { end = this.value.length; }
		if (start < end) {
			// delete characters between start and end
		}

		this.value = this.value.slice(0, start) + replacement + this.value.slice(end);

		if (selectMode == "start") this.selectionStart = 0;
		if (selectMode == "end") this.selectionStart = this.value.length;
		if (selectMode == "select") this.select();
		if (selectMode == "preserve") this.setSelectionRange(selectionStart, selectionEnd);
	}
};

export default Selection;