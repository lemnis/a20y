// var objectPath = require("object-path");
import Range from "./abstract/Range.js";

function calcValueOfTrackPos(pos, track, thumb, min, max, step, orientation) {
	let positionKey = orientation == "vertical" ? "y" : "x";
	let range = (max - min) / step;
	// the full usable length of the track
	let trackSize = getTrackSize(track, thumb, orientation);
	// how many pixels  span for one step change
	let pxPerStep = trackSize / range;

	// bounding box of the track
	var trackCoor = track.getBoundingClientRect();
	// offset without track limits
	let offset = pos - trackCoor[positionKey] - thumb.clientWidth / 2;

	// update offset to the track limits if needed
	if(offset < 0) {
		offset = 0;
	} else if(offset > trackSize){
		offset = trackSize;
	}

	// round the value to nearest increment
	return Math.round(offset / pxPerStep) * step + min;
}

function getTrackSize(track, thumb, orientation) {
	if(orientation == "vertical") {
		return track.clientHeight - thumb.clientHeight;
	} else {
		return track.clientWidth - thumb.clientWidth;
	}
}

function updatePosition(value, track, thumb, min, max, orientation) {
	let styleKey = orientation == "vertical" ? "top" : "left";
	let range = max - min;
	let pxPerStep = getTrackSize(track, thumb, orientation) / range;
	thumb.style[styleKey] = pxPerStep * (value - min) + "px";
}

/**
 * The slider element let the user specify a numeric value which must be no less
 * than a given value, and no more than another given value. 
 * 
 * The precise value,however, is not considered important. This is typically represented using a slider or
 * dial control rather than a text entry box like the "number" input type. Because this kind of widget
 * is imprecise, it shouldn't typically be used unless the control's exact value isn't important.
 *
 * ### Examples
 *
 * #### Basic example
 * 
 * <div class="slider-track">
 *   <div role="slider"  tabindex="0"></div>
 * </div>
 * 
 * ```html
 * <div class="slider-track">
 *   <div role="slider"  tabindex="0"></div>
 * </div>
 * ```
 * 
 * #### As an button with a specified step and range
 *
 * <div class="slider-track">
 *   <button type="button" role="slider"
 * 		aria-valuemin="30" aria-valuemax="300" aria-valuenow="50" data-step="10"></button>
 * </div>
 *
 * ```html
 * <div class="slider-track">
 *   <button type="button" role="slider"
 * 		aria-valuemin="30" aria-valuemax="300" aria-valuenow="50" data-step="10"></button>
 * </div>
 * ```
 * 
 * #### Vertical
 * 
 * <div class="slider-track vertical">
 *   <button type="button" role="slider" aria-orientation="vertical"></button>
 * </div>
 * 
 * ```html
 * <div class="slider-track vertical">
 *   <button type="button" role="slider" aria-orientation="vertical"></button>
 * </div>
 * ```
 * 
 * #### Disabled
 * 
 * <div class="slider-track">
 *   <button type="button" role="slider" aria-disabled="true"></button>
 * </div>
 * 
 * ```html
 * <div class="slider-track">
 *   <button type="button" role="slider" aria-disabled="true"></button>
 * </div>
 * ```
 * 
 * 
 * @summary A user input where the user selects a value from within a given range.
 * @extends Range
 *
 * @fires change
 * @fires input
 *
 * @param {HTMLElement} element 				element to derive information nameFrom
 * @param {Object} [options] 						optional options
 * @param {HTMLElement} [options.slider.track]
 * 	The element that resembles the track, defaults to the elements parent
 * @param {Number|"any"} [options.step] 	increase/decrease amount
 * @return {Slider} thisArg
 *
 * @todo add support for "any"
 * @todo add events
 */
class Slider extends Range {
	/**
	 * @param {*} args 
	 */
	constructor(...args) {
		super(...args);

		// register customs
		this._.registerCustomElement("slider.track", this._node.parentNode);

		// set defaults
		if(undefined == this.orientation) this.orientation = "horizontal";
		if(undefined == this.valueMin) {
			/**
			 * @default [0]
			 */
			this.valueMin = 0;
		}
		if(undefined == this.valueMax) this.valueMax = 100;
		if(undefined == this.valueNow && this.valueMax < this.valueMin) {
			this.valueNow = this.valueMin;
		} else if(undefined == this.valueNow) {
			this.valueNow = this.valueMin + (this.valueMax - this.valueMin)/2;
		}

		this._unTrackMouseBinded = this._unTrackMouse.bind(this);
		this._unTrackTouchBinded = this._unTrackTouch.bind(this);
		this._onDrag = this.onDrag.bind(this);

		// todo: allow automatically setting valueText with some sugar

		this.addEventListener("touchstart", this._onTouchStart.bind(this));
		this.addEventListener("mousedown", this._onMouseDown.bind(this), { target: this._.slider.track});
		this.addEventListener("key", this.stepUp.bind(this), { key: "ArrowRight" });
		this.addEventListener("key", this.stepUp.bind(this), { key: "ArrowUp" });
		this.addEventListener("key", this.stepDown.bind(this), { key: "ArrowLeft" });
		this.addEventListener("key", this.stepDown.bind(this), { key: "ArrowDown" });

		updatePosition(this.valueNow, this._.slider.track, this._node, this.valueMin, this.valueMax, this.orientation);
	}

	_onMouseDown() {
		document.addEventListener("mousemove", this._onDrag);
		document.addEventListener("mouseup", this._unTrackMouseBinded);

		// focus the thumb when the user did an action
		this._node.focus();
	}
	_onTouchStart() {
		document.addEventListener("touchmove", this._onDrag);
		document.addEventListener("touchend", this._unTrackTouchBinded);
		document.addEventListener("touchcancel", this._unTrackTouchBinded);
	}
	_unTrackMouse() {
		document.removeEventListener("mousemove", this._onDrag);
		document.removeEventListener("mouseup", this._unTrackMouseBinded);

		// focus the thumb when the user did an action
		this._node.focus();		
	}
	_unTrackTouch() {
		document.removeEventListener("touchmove", this._onDrag);
		document.removeEventListener("touchend", this._unTrackMouse);
		document.removeEventListener("touchcancel", this._unTrackMouseBinded);
	}

	onDrag(ev) {
		ev.preventDefault();
		let pos;
		let positionKey = this.orientation == "vertical" ? "clientY" : "clientX";
		if(ev.changedTouches) {
			pos = ev.changedTouches[0][positionKey];
		} else {
			pos = ev[positionKey];
		}
		this.valueNow = calcValueOfTrackPos(
			pos, this._.slider.track, this._node,
			this.valueMin, this.valueMax, this._.step, this.orientation
		);
	}

	get valueNow() { return super.valueNow; }
	set valueNow(val) {
		if(!this.disabled) {
			super.valueNow = val;
			updatePosition(val, this._.slider.track, this._node, this.valueMin, this.valueMax, this.orientation);
		}
	}

	/* Native polyfill */

	// automatic polyfilled by attributes
	// autocomplete
	// list
	// min
	// max
	// step => data-step
	// value
	// valueAsNumber
	// stepDown
	// stepUp
}

export default Slider;