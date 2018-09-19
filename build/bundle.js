(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
				value: true
});

var _DOMString = require("./DOMString");

var _DOMString2 = _interopRequireDefault(_DOMString);

var _boolean = require("./boolean");

var _boolean2 = _interopRequireDefault(_boolean);

var _double = require("./double");

var _double2 = _interopRequireDefault(_double);

var _long = require("./long");

var _long2 = _interopRequireDefault(_long);

var _EventTarget2 = require("./EventTarget");

var _EventTarget3 = _interopRequireDefault(_EventTarget2);

var _AccessibleNodeList = require("./../src/AccessibleNodeList.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// all attributes used within AOM
var attributes = ["role", "aria-activedescendant", "aria-atomic", "aria-autocomplete", "aria-busy", "aria-checked", "aria-colcount", "aria-colindex", "aria-colspan", "aria-controls", "aria-current", "aria-describedby", "aria-details", "aria-disabled", "aria-dropeffect", "aria-errormessage", "aria-expanded", "aria-flowto", "aria-grabbed", "aria-haspopup", "aria-hidden", "aria-invalid", "aria-keyshortcuts", "aria-label", "aria-labelledby", "aria-level", "aria-live", "aria-modal", "aria-multiline", "aria-multiselectable", "aria-orientation", "aria-owns", "aria-placeholder", "aria-posinset", "aria-pressed", "aria-readonly", "aria-relevant", "aria-required", "aria-roledescription", "aria-rowcount", "aria-rowindex", "aria-rowspan", "aria-selected", "aria-setsize", "aria-sort", "aria-valuemax", "aria-valuemin", "aria-valuenow", "aria-valuetext"];

/**
 * 
 * @param {Mutation} mutations 
 */
function mutationObserverCallback(mutations) {
				var aom = this;

				mutations.forEach(function (mutation) {
								var attrName = mutation.attributeName;
								var newValue = aom._node.attributes[attrName] ? aom._node.attributes[attrName].value : undefined;
								var oldValue = aom._values[attrName];

								aom._defaultValues[attrName] = newValue;
								// store the default values set by an aria-* attribute
								if (newValue != oldValue) {
												aom._defaultValues[attrName] = newValue;
								}

								// overwrite the attribute if AOM has an different defined value
								if (oldValue && newValue != oldValue) {
												aom[attrName] = oldValue;
								}
				});
}

/**
 * Based on the AOM spec
 * @class
 */

var AccessibleNode = function (_EventTarget) {
				_inherits(AccessibleNode, _EventTarget);

				function AccessibleNode(node) {
								_classCallCheck(this, AccessibleNode);

								// store the node where the AccessibleNode is connected with
								var _this = _possibleConstructorReturn(this, (AccessibleNode.__proto__ || Object.getPrototypeOf(AccessibleNode)).call(this, node));

								Object.defineProperty(_this, "_node", { value: node });

								// set an hidden object to store all values in
								Object.defineProperty(_this, "_values", { value: {} });

								// store values of aria-* attributes
								Object.defineProperty(_this, "_defaultValues", { value: {} });

								// start the mutation observer if the AccessibleNode is connected to an node
								if (node) {
												var observer = new MutationObserver(mutationObserverCallback.bind(_this));
												observer.observe(_this._node, { attributes: true, attributeOldValue: true });
								}
								return _this;
				}

				return AccessibleNode;
}(_EventTarget3.default);

Object.defineProperties(AccessibleNode.prototype,
/** @lends AccessibleNode.prototype */
{
				/** 
    * Defines a type it represents, e.g. `tab`
    * 
    * @see https://www.w3.org/TR/wai-aria-1.1/#roles
    * @type  {?String}
    */
				"role": {
								enumerable: true,
								// writable: false,
								configurable: true,
								set: function set(str) {
												return _DOMString2.default.set(this, "role", str);
								},
								get: function get() {
												return _DOMString2.default.get(this, "role");
								}
				},

				/** 
     * Defines a human-readable, author-localized description for the role
     * 
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-roledescription
     * @type {?String}
     */
				"roleDescription": {
								enumerable: true,
								set: function set(str) {
												return _DOMString2.default.set(this, "aria-roleDescription", str);
								},
								get: function get() {
												return _DOMString2.default.get(this, "aria-roleDescription");
								}
				},

				/* ******************* ACCESSIBLE LABEL AND DESCRIPTION ******************* */

				/** 
    * Defines a string value that labels the current element.
    * 
    * @see https://www.w3.org/TR/wai-aria-1.1/#aria-label
    * @type {?String} 
    */
				"label": {
								enumerable: true,
								set: function set(str) {
												return _DOMString2.default.set(this, "aria-label", str);
								},
								get: function get() {
												return _DOMString2.default.get(this, "aria-label");
								}
				},

				/* *************** END OF ACCESSIBLE LABEL AND DESCRIPTION *************** */

				/* ********************* GLOBAL STATES AND PROPERTIES ********************* */

				/** 
     * Indicates the element that represents the current item within a container or set of related elements.
     * 
     * | Value | Description |
     * | --- | --- |
     * | page | used to indicate a link within a set of pagination links, where the link is visually styled to represent the currently-displayed page.
     * | step | used to indicate a link within a step indicator for a step-based process, where the link is visually styled to represent the current step.
     * | location | used to indicate the image that is visually highlighted as the current component of a flow chart.
     * | date | used to indicate the current date within a calendar.
     * | time | used to indicate the current time within a timetable.
     * | true | Represents the current item within a set.
     * | false | Does not represent the current item within a set.
     * 
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-current
     * @type {?String}
     */
				"current": {
								enumerable: true,
								set: function set(str) {
												return _DOMString2.default.set(this, "aria-current", str);
								},
								get: function get() {
												return _DOMString2.default.get(this, "aria-current");
								}
				},

				/* ***************** END OF GLOBAL STATES AND PROPERTIES ***************** */

				/* ************************** WIDGET PROPERTIES ************************** */

				/**
     * Indicates whether inputting text could trigger display of one or more predictions of the user's
     * intended value for an input and specifies how predictions would be presented if they are made.
     * 
     * The behavior during input is depends on the provided value, it follows beneath table.
     * 
     * | Value  | 	Description |
     * | ------ | --- |
     * | inline | Text suggesting may be dynamically inserted after the caret.
     * | list   | A collection of values that could complete the provided input is displayed.
     * | both   | Implements `inline` and `list`
     * | none   | No prediction is shown
     * 
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-autocomplete
     * @type {?String}
     */
				"autocomplete": {
								enumerable: true,
								set: function set(str) {
												return _DOMString2.default.set(this, "aria-autocomplete", str);
								},
								get: function get() {
												return _DOMString2.default.get(this, "aria-autocomplete");
								}
				},

				/**
     * Returns/sets the visibility of the element who is exposed to an accessibility API.
     * @see {@link AccessibleNode#disabled}
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-hidden
     * @type {?Boolean}
     */
				"hidden": {
								enumerable: true,
								set: function set(str) {
												return _boolean2.default.set(this, "aria-hidden", str);
								},
								get: function get() {
												return _boolean2.default.get(this, "aria-hidden");
								}
				},

				/**
     * Indicates keyboard shortcuts that an author has implemented to activate or
     * give focus to an element.
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-keyshortcuts
     * @type {?String}
     */
				"keyShortcuts": {
								enumerable: true,
								set: function set(str) {
												return _DOMString2.default.set(this, "aria-keyShortcuts", str);
								},
								get: function get() {
												return _DOMString2.default.get(this, "aria-keyShortcuts");
								}
				},

				/** 
     * Indicates whether an element is modal when displayed.
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-modal
     * @type {?Boolean}
     */
				"modal": {
								enumerable: true,
								set: function set(str) {
												return _boolean2.default.set(this, "aria-modal", str);
								},
								get: function get() {
												return _boolean2.default.get(this, "aria-modal");
								}
				},

				/** 
     * Indicates whether a text box accepts multiple lines of input or only a single line.
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-multiline
     * @type {?Boolean}
     */
				"multiline": {
								enumerable: true,
								set: function set(str) {
												return _boolean2.default.set(this, "aria-multiline", str);
								},
								get: function get() {
												return _boolean2.default.get(this, "aria-multiline");
								}
				},

				/**
     * Indicates that the user may select more than one item from the current selectable descendants.
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-multiselectable
     * @type {?Boolean}
     */
				"multiselectable": {
								enumerable: true,
								set: function set(str) {
												return _boolean2.default.set(this, "aria-multiselectable", str);
								},
								get: function get() {
												return _boolean2.default.get(this, "aria-multiselectable");
								}
				},

				/**
     * Indicates whether the element's orientation is `horizontal`, `vertical`, or `null`.
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-orientation
     * @type {?String}
     */
				"orientation": {
								enumerable: true,
								set: function set(str) {
												return _DOMString2.default.set(this, "aria-orientation", str);
								},
								get: function get() {
												return _DOMString2.default.get(this, "aria-orientation");
								}
				},

				/**
     * Indicates that the user may select more than one item from the current selectable descendants.
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-readonly
     * @type {?Boolean}
     */
				"readOnly": {
								enumerable: true,
								set: function set(str) {
												return _boolean2.default.set(this, "aria-readOnly", str);
								},
								get: function get() {
												return _boolean2.default.get(this, "aria-readOnly");
								}
				},

				/**
     * Indicates that user input is required on the element before a form may be submitted.
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-required
     * @type {?Boolean}
     */
				"required": {
								enumerable: true,
								set: function set(str) {
												return _boolean2.default.set(this, "aria-required", str);
								},
								get: function get() {
												return _boolean2.default.get(this, "aria-required");
								}
				},

				/**
     * Indicates that user input is required on the element before a form may be submitted.
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-selected
     * @type {?Boolean}
     */
				"selected": {
								enumerable: true,
								set: function set(str) {
												return _boolean2.default.set(this, "aria-selected", str);
								},
								get: function get() {
												return _boolean2.default.get(this, "aria-selected");
								}
				},

				/**
     * Indicates if items in a table or grid are sorted in ascending or descending order.  
     * Possible values are `acending`, `descending`, `none`, `other` or `null`.
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-sort
     * @type {?Boolean}
     */
				"sort": {
								enumerable: true,
								set: function set(str) {
												return _DOMString2.default.set(this, "aria-sort", str);
								},
								get: function get() {
												return _DOMString2.default.get(this, "aria-sort");
								}
				},

				/* *********************** END OF WIDGET PROPERTIES *********************** */

				/* ***************************** WIDGET STATES **************************** */

				/**
     * Indicates the current "checked" state of a {@link Widget}, among {@link Radio} and {@link Checkbox}
     * @see {@link AccessibleNode#pressed}
     * @see {@link AccessibleNode#selected}
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-pressed
     * @type {?String}
     */
				"checked": {
								enumerable: true,
								set: function set(str) {
												return _DOMString2.default.set(this, "aria-checked", str);
								},
								get: function get() {
												return _DOMString2.default.get(this, "aria-checked");
								}
				},

				/**
     * Indicates whether the element, or another grouping element it controls, 
     * is currently expanded or collapsed.
     * 
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-expanded
     * @type {?Boolean}
     */
				"expanded": {
								enumerable: true,
								set: function set(str) {
												return _boolean2.default.set(this, "aria-expanded", str);
								},
								get: function get() {
												return _boolean2.default.get(this, "aria-expanded");
								}
				},

				/**
     * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
     * 
     * @see {@link AccessibleNode#hidden}
     * @see {@link AccessibleNode#readonly}
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-disabled
     * @type {?Boolean}
     */
				"disabled": {
								enumerable: true,
								set: function set(str) {
												return _boolean2.default.set(this, "aria-disabled", str);
								},
								get: function get() {
												return _boolean2.default.get(this, "aria-disabled");
								}
				},

				/**
     * Indicates the entered value does not conform to the format expected by the application.
     * 
     * @see {@link AccessibleNode#errorMessage}
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage
     * @type {?String} 
     */
				"invalid": {
								enumerable: true,
								set: function set(str) {
												return _DOMString2.default.set(this, "aria-invalid", str);
								},
								get: function get() {
												return _DOMString2.default.get(this, "aria-invalid");
								}
				},

				/**
     * Indicates the availability and type of interactive popup element, such as menu or dialog,
     * that can be triggered by an element.
     * 
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup
     * @type {?String}
     */
				"hasPopUp": {
								enumerable: true,
								set: function set(str) {
												return _DOMString2.default.set(this, "aria-haspopup", str);
								},
								get: function get() {
												return _DOMString2.default.get(this, "aria-haspopup");
								}
				},

				/**
     * Indicates the current "checked" state of a {@link Widget}, among {@link Radio} and {@link Checkbox}
     * 
     * @see {@link AccessibleNode#pressed}
     * @see {@link AccessibleNode#selected}
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-pressed
     * @type {?String}
     */
				"pressed": {
								enumerable: true,
								set: function set(str) {
												return _DOMString2.default.set(this, "aria-pressed", str);
								},
								get: function get() {
												return _DOMString2.default.get(this, "aria-pressed");
								}
				},

				/* ************************* END OF WIDGET STATES ************************* */

				/* **************************** CONTROL VALUES **************************** */

				/** 
     * Returns / sets the human readable text alternative of {@link #aria-valuenow} for a {@link Range} widget.
     * 
     * @see {@link https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext}
     * @type {?String}
     */
				"valueText": {
								enumerable: true,
								set: function set(str) {
												return _DOMString2.default.set(this, "aria-valueText", str);
								},
								get: function get() {
												return _DOMString2.default.get(this, "aria-valueText");
								}
				},

				/**
     * Returns / sets a short hint intended to aid the user with data entry when the control has no value.
     * A hint could be a sample value or a brief description of the expected format.
     * 
     * @see {@link https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder}
     * @type {?String}
     */
				"placeholder": {
								enumerable: true,
								set: function set(str) {
												return _DOMString2.default.set(this, "aria-placeholder", str);
								},
								get: function get() {
												return _DOMString2.default.get(this, "aria-placeholder");
								}
				},

				/** 
     * Returns / sets the current value for a {@link Range} widget.
     * 
     * @see {@link https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow}
     * @type {?Number}
     */
				"valueNow": {
								enumerable: true,
								set: function set(val) {
												return _double2.default.set(this, "aria-valuenow", val);
								},
								get: function get() {
												return _double2.default.get(this, "aria-valuenow");
								}
				},

				/** 
     * Returns / sets the minimum allowed value for a {@link Range} widget.
     * 
     * @see {@link https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin}
     * @type {?Number}
     */
				"valueMin": {
								enumerable: true,
								set: function set(val) {
												return _double2.default.set(this, "aria-valuemin", val);
								},
								get: function get() {
												return _double2.default.get(this, "aria-valuemin");
								}
				},

				/** 
     * Returns / sets the maximum allowed value for a {@link Range} widget.
     * 
     * @see {@link https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax}
     * @type {?Number}
     */
				"valueMax": {
								enumerable: true,
								set: function set(val) {
												return _double2.default.set(this, "aria-valuemax", val);
								},
								get: function get() {
												return _double2.default.get(this, "aria-valuemax");
								}
				},

				/* ************************ END OF CONTROL VALUES ************************ */

				// Live regions.
				"atomic": {
								enumerable: true,
								set: function set(val) {
												return _boolean2.default.set(this, "aria-atomic", val);
								},
								get: function get() {
												return _boolean2.default.get(this, "aria-atomic");
								}
				},
				"busy": {
								enumerable: true,
								set: function set(val) {
												return _boolean2.default.set(this, "aria-busy", val);
								},
								get: function get() {
												return _boolean2.default.get(this, "aria-busy");
								}
				},
				"live": {
								enumerable: true,
								set: function set(val) {
												return _DOMString2.default.set(this, "aria-live", val);
								},
								get: function get() {
												return _DOMString2.default.get(this, "aria-live");
								}
				},
				"relevant": {
								enumerable: true,
								set: function set(val) {
												return _DOMString2.default.set(this, "aria-relevant", val);
								},
								get: function get() {
												return _DOMString2.default.get(this, "aria-relevant");
								}
				},

				/* ************************* OTHER RELATIONSHIPS ************************* */

				/**
     * Returns / sets the AccessibleNode of the currently active element when focus is on current element.
     * 
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-activedescendant
     * @type {?AcccessibleNode}
     */
				"activeDescendant": {
								enumerable: true,
								set: function set(val) {
												return setAccessibleNode(this, "aria-activedescendant", val);
								},
								get: function get() {
												return getAccessibleNode(this, "aria-activedescendant");
								}
				},

				/**
     * Returns / sets an AccessibleNode that provides a detailed, extended description 
     * for the current element.
     * 
     * @see {@link AccessibleNode#describedBy}
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-details
     * @type {?AcccessibleNode}
     */
				"details": {
								enumerable: true,
								set: function set(val) {
												return setAccessibleNode(this, "aria-details", val);
								},
								get: function get() {
												return getAccessibleNode(this, "aria-details");
								}
				},

				/**
     * Returns / sets an AccessibleNode that provides an error message for the current element.
     * 
     * @see {@link AccessibleNode#invalid}
     * @see {@link AccessibleNode#describedBy}
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage
     * @type {?AcccessibleNode}
     */
				"errorMessage": {
								enumerable: true,
								set: function set(val) {
												return setAccessibleNode(this, "aria-errormessage", val);
								},
								get: function get() {
												return getAccessibleNode(this, "aria-errormessage");
								}
				},

				/* ********************** END OF OTHER RELATIONSHIPS ********************** */

				/* ***************************** COLLECTIONS ***************************** */

				/**
     * Returns / sets the total number of columns in a {@link Table}, {@link Grid}, or {@link Treegrid}.
     * 
     * @see {@link AccessibleNode#colIndex}
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-setsize
     * @type {?Integer}
     */
				"colCount": {
								enumerable: true,
								set: function set(val) {
												return _long2.default.set(this, "aria-colcount", val);
								},
								get: function get() {
												return _long2.default.get(this, "aria-colcount");
								}
				},

				/**
     * Defines an element's column index or position with respect to the total number of columns 
     * within a {@link Table}, {@link Grid}, or {@link Treegrid}.
     * 
     * @see {@link AccessibleNode#colCount}
     * @see {@link AccessibleNode#colSpan}
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-colindex
     * @type {?Integer}
     */
				"colIndex": {
								enumerable: true,
								set: function set(val) {
												return _long2.default.set(this, "aria-colindex", val);
								},
								get: function get() {
												return _long2.default.get(this, "aria-colindex");
								}
				},

				/**
     * Defines the number of columns spanned by a cell or gridcell
     * within a {@link Table}, {@link Grid}, or {@link Treegrid}.
     * 
     * @see {@link AccessibleNode#colIndex}
     * @see {@link AccessibleNode#rowSpan}
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-colspan
     * @type {?Integer}
     */
				"colSpan": {
								enumerable: true,
								set: function set(val) {
												return _long2.default.set(this, "aria-colspan", val);
								},
								get: function get() {
												return _long2.default.get(this, "aria-colspan");
								}
				},

				/**
     * Defines an element's number or position in the current set of {@link listitem}s or {@link treeitem}s.
     * Not required if all elements in the set are present in the DOM.
     * 
     * @see {@link AccessibleNode#setSize}
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-posinset
     * @type {?Integer}
     */
				"posInSet": {
								enumerable: true,
								set: function set(val) {
												return _long2.default.set(this, "aria-posinset", val);
								},
								get: function get() {
												return _long2.default.get(this, "aria-posinset");
								}
				},

				/**
     * Defines the total number of rows in a {@link Table}, {@link Grid}, or {@link Treegrid}.
     * 
     * @see {@link AccessibleNode#rowIndex}
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount
     * @type {?Integer}
     */
				"rowCount": {
								enumerable: true,
								set: function set(val) {
												return _long2.default.set(this, "aria-rowcount", val);
								},
								get: function get() {
												return _long2.default.get(this, "aria-rowcount");
								}
				},

				/**
     * Defines an element's row index or position with respect to the total number of rows 
     * within a  {@link Table}, {@link Grid}, or {@link Treegrid}.
     * 
     * @see {@link AccessibleNode#rowCount}
     * @see {@link AccessibleNode#rowSpan}
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex
     * @type {?Integer}
     */
				"rowIndex": {
								enumerable: true,
								set: function set(val) {
												return _long2.default.set(this, "aria-rowindex", val);
								},
								get: function get() {
												return _long2.default.get(this, "aria-rowindex");
								}
				},

				/**
     * Defines the number of rows spanned by a cell or gridcell
     * within a {@link Table}, {@link Grid}, or {@link Treegrid}.
     * 
     * @see {@link AccessibleNode#rowIndex}
     * @see {@link AccessibleNode#colSpan}
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan
     * @type {?Integer}
     */
				"rowSpan": {
								enumerable: true,
								set: function set(val) {
												return _long2.default.set(this, "aria-rowspan", val);
								},
								get: function get() {
												return _long2.default.get(this, "aria-rowspan");
								}
				},

				/**
     * Defines the number of items in the current set of listitems or treeitems.
     * Not required if **all** elements in the set are present in the DOM.
     * @see {@link AccessibleNode#posInSet}
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-setsize
     * @type {?Integer}
     */
				"setSize": {
								enumerable: true,
								set: function set(val) {
												return _long2.default.set(this, "aria-setsize", val);
								},
								get: function get() {
												return _long2.default.get(this, "aria-setsize");
								}
				},

				/**
     * Defines the hierarchical level of an element within a structure.
     * E.g. `&lt;h1&gt;&lt;h1/&gt;` equals `&lt;div role="heading" aria-level="1"&gt;&lt;/div>`
     * 
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-level
     * @type {?Integer}
     */
				"level": {
								enumerable: true,
								set: function set(val) {
												return _long2.default.set(this, "aria-level", val);
								},
								get: function get() {
												return _long2.default.get(this, "aria-level");
								}
				},

				/* ************************** END OF COLLECTIONS ************************** */

				/* ****************** ACCESSIBLE LABEL AND DESCRIPTION ****************** */

				/**
     * Returns an list with AccessibleNode instances that labels the current element
     * 
     * @see {@link AccessibleNode#describedBy}
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby
     * @type {AccessibleNodeList}
     */
				"labeledBy": {
								enumerable: true,
								set: function set(val) {
												if (!(val instanceof _AccessibleNodeList.AccessibleNodeListConstructor)) {
																throw new Error("It must be an instance of AccessibleNodeList");
												}

												this._values.labeledBy = val;
												val.parentAOM = this;
												val.attribute = "aria-labelledby";
								},
								get: function get() {
												return this._values.labeledBy || null;
								}
				},

				/**
     * Returns an list with AccessibleNode instances that describes the current element
     * 
     * @see {@link AccessibleNode#labeledBy}
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-describedby
     * @type {AccessibleNodeList}
     */
				"describedBy": {
								enumerable: true,
								set: function set(val) {
												if (!(val instanceof _AccessibleNodeList.AccessibleNodeListConstructor)) {
																throw new Error("It must be an instance of AccessibleNodeList");
												}

												this._values.describedBy = val;
												val.parentAOM = this;
												val.attribute = "aria-describedby";
								},
								get: function get() {
												return this._values.describedBy || null;
								}
				},

				/* ************** END OF ACCESSIBLE LABEL AND DESCRIPTION ************** */

				/* ************************ OTHER RELATIONSHIPS ************************ */

				/**
     * Returns an list with AccessibleNode instances whose contents or presence are controlled by
     * the current element.
     * 
     * @see {@link AccessibleNode#owns}
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-controls
     * @type {AccessibleNodeList}
     */
				"controls": {
								enumerable: true,
								set: function set(val) {
												if (!(val instanceof _AccessibleNodeList.AccessibleNodeListConstructor)) {
																throw new Error("It must be an instance of AccessibleNodeList");
												}

												this._values.controls = val;
												val.parentAOM = this;
												val.attribute = "aria-controls";
								},
								get: function get() {
												return this._values.controls || null;
								}
				},

				/**
     * Contains the next element(s) in an alternate reading order of content which, at the user's 
     * discretion, allows assistive technology to override the general default of reading in
     * document source order.
     * 
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-flowto
     * @type {AccessibleNodeList}
     */
				"flowTo": {
								enumerable: true,
								set: function set(val) {
												if (!(val instanceof _AccessibleNodeList.AccessibleNodeListConstructor)) {
																throw new Error("It must be an instance of AccessibleNodeList");
												}

												this._values.flowTo = val;
												val.parentAOM = this;
												val.attribute = "aria-flowto";
								},
								get: function get() {
												return this._values.flowTo || null;
								}
				},

				/**
     * Contains children who's ID are referenced inside the `aria-owns` attribute
     * @see https://www.w3.org/TR/wai-aria-1.1/#aria-owns
     * @type {AccessibleNodeList}
     */
				"owns": {
								enumerable: true,
								set: function set(val) {
												if (!(val instanceof _AccessibleNodeList.AccessibleNodeListConstructor)) {
																throw new Error("It must be an instance of AccessibleNodeList");
												}
												this._values.owns = val;
												val.parentAOM = this;
												val.attribute = "aria-owns";
								},
								get: function get() {
												return this._values.owns || null;
								}
				}

				/* ********************* END OF OTHER RELATIONSHIPS ********************* */
});

function setAccessibleNode(aom, attribute, value) {
				if (value == undefined) {
								// remove ID of connected element if generated
								if (aom._values[attribute] && aom._values[attribute].generated_id) {
												aom._values[attribute]._node.removeAttribute("id");
												aom._values[attribute].generated_id = false;
								}

								aom._values[attribute] = value;
								return aom._node.removeAttribute(attribute);;
				} else if (!(value instanceof AccessibleNode)) {
								throw new TypeError("Failed to set the '#{attribute}' property on 'AccessibleNode': The provided value is not of type 'AccessibleNode'");
				}

				if (value._node) {
								if (!value._node.id) {
												/** @todo remove temp id */
												value._node.id = "id-" + parseInt(Math.random() * 1000000);
												value.generated_id = true;
												console.log(value, value.generated_id);
								}

								aom._node.setAttribute(attribute, value._node.id);
				}

				aom._values[attribute] = value;
				return value;
}
function getAccessibleNode(aom, attribute) {
				var value = aom._values[attribute];
				if (value == undefined) {
								var attr = aom._node.getAttribute(attribute);
								if (attr == undefined) return null;
								return elements.get(document.getElementById(attr));
				}
				return value;
}

exports.default = AccessibleNode;

},{"./../src/AccessibleNodeList.js":2,"./DOMString":3,"./EventTarget":4,"./boolean":5,"./double":6,"./long":7}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AccessibleNodeListConstructor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AccessibleNode = require("./AccessibleNode");

var _AccessibleNode2 = _interopRequireDefault(_AccessibleNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
	function ExtendableBuiltin() {
		var instance = Reflect.construct(cls, Array.from(arguments));
		Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
		return instance;
	}

	ExtendableBuiltin.prototype = Object.create(cls.prototype, {
		constructor: {
			value: cls,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});

	if (Object.setPrototypeOf) {
		Object.setPrototypeOf(ExtendableBuiltin, cls);
	} else {
		ExtendableBuiltin.__proto__ = cls;
	}

	return ExtendableBuiltin;
}

var AccessibleNodeListConstructor = exports.AccessibleNodeListConstructor = function (_extendableBuiltin2) {
	_inherits(AccessibleNodeList, _extendableBuiltin2);

	function AccessibleNodeList() {
		_classCallCheck(this, AccessibleNodeList);

		return _possibleConstructorReturn(this, (AccessibleNodeList.__proto__ || Object.getPrototypeOf(AccessibleNodeList)).apply(this, arguments));
	}

	_createClass(AccessibleNodeList, [{
		key: "item",
		value: function item(index) {
			if (isNaN(index)) return;
			return this[index];
		}
	}, {
		key: "add",
		value: function add(accessibleNode) {
			var before = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			if (!(accessibleNode instanceof _AccessibleNode2.default)) {
				throw new TypeError("Failed to execute 'add' on 'AccessibleNodeList': parameter 1 is not of type 'AccessibleNode'.");
			}

			if (before !== null) {
				var beforeIndex = this.indexOf(before);
				if (beforeIndex > -1) {
					return this.splice(beforeIndex - 1, 0, accessibleNode);
				}
			}

			return this.push(accessibleNode);
		}
	}, {
		key: "remove",
		value: function remove(index) {
			var _this2 = this;

			// update DOM attribute
			if (this.parentAOM && this[index]._node && this[index]._node.id) {
				var ids = [];

				if (this.parentAOM._node.hasAttribute(this.attribute)) {
					ids = this.parentAOM._node.getAttribute(this.attribute).split(" ");
				} else {
					ids = [];
				}

				var filteredIds = ids.filter(function (e) {
					return e !== _this2[index]._node.id;
				});

				// remove generated ids as long it was previously referenced
				if (this[index].generated_id === true && filteredIds.length < ids.length) {
					this[index]._node.id = "";
				}

				this.parentAOM._node.setAttribute(this.attribute, filteredIds.join(" "));
			}

			return this.pop(index);
		}
	}]);

	return AccessibleNodeList;
}(_extendableBuiltin(Array));

var arrayChangeHandler = {
	set: function set(target, property, value) {
		// adding or changing a value inside the array
		if (!isNaN(property)) {

			// check if its valid type
			if (value instanceof _AccessibleNode2.default) {
				target[property] = value;

				// update DOM attribute
				if (target.parentAOM && value && value._node) {
					if (!value._node.id) {
						value._node.id = "aom-" + Date.now();
						value.generated_id = true;
					}

					var ids = [];
					if (target.parentAOM._node.hasAttribute(target.attribute)) {
						ids = target.parentAOM._node.getAttribute(target.attribute).split(" ");
					} else {
						ids = [];
					}

					ids.push(value._node.id);

					target.parentAOM._node.setAttribute(target.attribute, ids.join(" "));
				}

				target[property] = value;
				return true;
			}

			throw new Error("Only instances of AccessibleNode are allowed");
		}

		target[property] = value;
		// you have to return true to accept the changes
		return true;
	}
};

/**
 * 
 */
function AccessibleNodeListProxy() {
	var accessibleNodeList = new AccessibleNodeListConstructor();
	return new Proxy(accessibleNodeList, arrayChangeHandler);
}

exports.default = AccessibleNodeListProxy;

},{"./AccessibleNode":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.set = set;
/**
 * Returns the value of a given attribute
 * @param {AccessibleNode} aom 
 * @param {String} attributeName 
 * @return {String} attribute's value
 */
function get(aom, attributeName) {
  return aom._values[attributeName] || aom._node.getAttribute(attributeName);
}

/**
 * Sync the new value to the DOM
 * @param {AccessibleNode} aom 
 * @param {String} attributeName 
 * @param {String | Number } status 
 */
function set(aom, attributeName, status) {
  if (status == undefined) {
    aom._node.removeAttribute(attributeName);
  } else {
    aom._node.setAttribute(attributeName, status);
  }

  aom._values[attributeName] = typeof status != "undefined" ? status.toString() : status;
  return status;
}

exports.default = { get: get, set: set };

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventTarget = function () {
    function EventTarget() {
        _classCallCheck(this, EventTarget);

        Object.defineProperty(this, "_listeners", { value: new Map() });
    }

    _createClass(EventTarget, [{
        key: "addEventListener",
        value: function addEventListener(type, listener) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            if (!this._listeners.has(type)) {
                this._listeners.set(type, []);
            }
            this._listeners.get(type).push({ listener: listener, options: options });
        }
    }, {
        key: "removeEventListener",
        value: function removeEventListener(type, callback, options) {
            if (!this._listeners.has(type)) {
                return;
            }
            var stack = this._listeners.get(type);
            stack.forEach(function (listener, i) {
                if (listener.listener === callback) {
                    stack.splice(i, 1);
                    return;
                }
            });
        }
    }, {
        key: "dispatchEvent",
        value: function dispatchEvent(event) {
            var _this = this;

            if (!this._listeners.has(event.type)) {
                return true;
            }
            var stack = this._listeners.get(event.type);

            stack.forEach(function (listener) {
                listener.call(_this, event);
            });

            return !event.defaultPrevented;
        }
    }]);

    return EventTarget;
}();

exports.default = EventTarget;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.set = set;
/**
 * Returns the value of given attribute as Boolean
 * @param {AccessibleNode} aom 
 * @param {String} attributeName 
 * @return {Boolean} attribute's value
 */
function get(aom, attributeName) {
  var value = aom._values[attributeName] || aom._node.getAttribute(attributeName);

  if (value == undefined) return null;
  return value == "true" || false;
}

/**
 * Sync the new value to the property
 * @param {AccessibleNode} aom 
 * @param {String} attributeName 
 * @param {String | Boolean} status 
 */
function set(aom, attributeName, status) {
  if (status == undefined) {
    aom._node.removeAttribute(attributeName);
  } else {
    aom._node.setAttribute(attributeName, status);
  }

  aom._values[attributeName] = status != undefined ? status.toString() : status;
  return status;
}

exports.default = { get: get, set: set };

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.set = set;
/**
 * Returns the value of a given attribute as Number
 * @param {AccessibleNode} aom 
 * @param {String} attributeName 
 * @return {Number} attribute's value
 */
function get(aom, attributeName) {
  var value = aom._values[attributeName] || aom._node.getAttribute(attributeName);;
  if (value == undefined) return null;
  return Number(value);
}

/**
 * Sync the new value to the DOM
 * @param {AccessibleNode} aom 
 * @param {String} attributeName 
 * @param {String | Number } status 
 */
function set(aom, attributeName, str) {
  if (str == null) {
    aom._node.removeAttribute(attributeName);
  } else {
    aom._node.setAttribute(attributeName, str);
  }

  aom._values[attributeName] = status.toString();
  return status;
}

exports.default = { get: get, set: set };

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.set = set;
/**
 * Returns the value of a given attribute as Integer
 * @param {AccessibleNode} aom 
 * @param {String} attributeName 
 * @return {Number} attribute's value
 */
function get(aom, attributeName) {
  var value = aom._values[attributeName] || aom._node.getAttribute(attributeName);;
  if (value == undefined) return null;
  return parseInt(value);
}

/**
 * Sync the new value to the DOM
 * @param {AccessibleNode} aom 
 * @param {String} attributeName 
 * @param {String | Number } status 
 */
function set(aom, attributeName, str) {
  if (str == null) {
    aom._node.removeAttribute(attributeName);
  } else {
    aom._node.setAttribute(attributeName, str);
  }

  aom._values[attributeName] = status.toString();
  return status;
}

exports.default = { get: get, set: set };

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrap = exports.Cached = exports.HasInstance = exports.BareMixin = exports.DeclareMixin = undefined;

var _mix = require('./src/mix');

var _mix2 = _interopRequireDefault(_mix);

var _declare = require('./src/declare');

var _declare2 = _interopRequireDefault(_declare);

var _BareMixin = require('./src/Decorators/BareMixin');

var _BareMixin2 = _interopRequireDefault(_BareMixin);

var _HasInstance = require('./src/Decorators/HasInstance');

var _HasInstance2 = _interopRequireDefault(_HasInstance);

var _Cached = require('./src/Decorators/Cached');

var _Cached2 = _interopRequireDefault(_Cached);

var _wrap = require('./src/Utils/wrap');

var _wrap2 = _interopRequireDefault(_wrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _mix2.default;

// Declare mixin classes

// Default export - Mix wrapper

exports.DeclareMixin = _declare2.default;

// Decorators

exports.BareMixin = _BareMixin2.default;
exports.HasInstance = _HasInstance2.default;
exports.Cached = _Cached2.default;

// Utils

exports.wrap = _wrap2.default;

},{"./src/Decorators/BareMixin":10,"./src/Decorators/Cached":11,"./src/Decorators/HasInstance":12,"./src/Utils/wrap":13,"./src/declare":14,"./src/mix":15}],9:[function(require,module,exports){
'use strict';

/**
 * Mixin Builder
 *
 * Allows you to extend a class with one or more mixin classes.
 *
 * This builder is heavily inspired by Justin Fagnani's Mixwith.js
 *
 * @see http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/
 * @see https://github.com/justinfagnani/mixwith.js
 *
 * @author Alin Eugen Deac <ade@vestergaardcompany.com>
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Builder = function () {

    /**
     * Create a new Builder instance
     *
     * @param {Function} [superClass=class {}]
     */
    function Builder(superClass) {
        _classCallCheck(this, Builder);

        this.superClass = superClass || function () {
            function _class() {
                _classCallCheck(this, _class);
            }

            return _class;
        }();
    }

    /**
     * Mixin one or more mixin-classes
     *
     * @param {Array.<Function>} mixins
     *
     * @return {Function} A supclass with mixins applied
     */


    _createClass(Builder, [{
        key: 'with',
        value: function _with() {
            for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
                mixins[_key] = arguments[_key];
            }

            return mixins.reduce(function (c, m) {

                if (typeof m !== 'function') {
                    return c;
                }

                return m(c);
            }, this.superClass);
        }
    }]);

    return Builder;
}();

exports.default = Builder;

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MIXIN_REFERENCE = undefined;

var _wrap = require('./../Utils/wrap');

var _wrap2 = _interopRequireDefault(_wrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Reference to a mixin
 *
 * @type {Symbol}
 */
var MIXIN_REFERENCE = exports.MIXIN_REFERENCE = Symbol('mixinRef');

/**
 * Decorator that stores a reference to the mixin class, which
 * ultimately can be used for "instance of" checks.
 *
 * @see wrap
 *
 * @param {Function} mixinClass
 *
 * @return {Function} Decorated mixin
 */
var BareMixin = function BareMixin(mixinClass) {
  return (0, _wrap2.default)(mixinClass, function (superclass) {
    // Apply the mixin class
    var app = mixinClass(superclass);

    // Add reference to the wrapped mixin class, so that we can enable
    // a "instance of" support.
    app.prototype[MIXIN_REFERENCE] = mixinClass[_wrap.ORIGINAL_MIXIN];

    return app;
  });
};

exports.default = BareMixin;

},{"./../Utils/wrap":13}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CACHED_REFERENCE = undefined;

var _wrap = require('./../Utils/wrap');

var _wrap2 = _interopRequireDefault(_wrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Cached mixin class reference
 *
 * @type {Symbol}
 */
var CACHED_REFERENCE = exports.CACHED_REFERENCE = Symbol('cachedRef');

/**
 * Decorate the given mixin class with a "cached decorator".
 *
 * Method will ensure that if the given mixin has already been applied,
 * then it will be returned / applied a single time, rather than multiple
 * times.
 *
 * @param {Function} mixinClass
 *
 * @return {Function}
 */
var Cached = function Cached(mixinClass) {
    return (0, _wrap2.default)(mixinClass, function (superclass) {
        // Obtain cached reference...
        var cachedReference = mixinClass[CACHED_REFERENCE];

        // If there is no cached reference, then we create one onto
        // the given mixin class
        if (!cachedReference) {

            // Create a new symbol in the mixin class, using the function's name
            // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
            cachedReference = mixinClass[CACHED_REFERENCE] = Symbol(mixinClass.name);
        }

        // Check if given superclass already has a reference to the given mixin class
        // If so, then return it.
        if (superclass.hasOwnProperty(cachedReference)) {
            return superclass[cachedReference];
        }

        // Decorate the given super class
        var decorated = mixinClass(superclass);

        // Cache the reference into the superclass
        superclass[cachedReference] = decorated;

        // Finally, return the decorated mixin.
        return decorated;
    });
};

exports.default = Cached;

},{"./../Utils/wrap":13}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _wrap = require('./../Utils/wrap');

var _BareMixin = require('./BareMixin');

/**
 * Decorates the given mixin class to support "instance of" operation.
 *
 * The given mixin class MUST be decorated with the "BareMixin" for this
 * to work.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/hasInstance
 * @see BareMixin
 *
 * @param {Function} mixinClass
 * @return {Function} Decorated mixin class
 */
var HasInstance = function HasInstance(mixinClass) {

    // If given mixin class already has a custom "has instance"
    // symbol, then abort - just return the mixin, since there
    // is no need to add custom behaviour to it.
    if (mixinClass.hasOwnProperty(Symbol.hasInstance)) {
        return mixinClass;
    }

    // Otherwise, we add a custom Symbol.hasInstance method for
    // the mixin class.
    Object.defineProperty(mixinClass, Symbol.hasInstance, {

        value: function value(instance) {
            // Fetch the original mixin class
            var originalMixinClass = this[_wrap.ORIGINAL_MIXIN];

            // If there is no original mixin class, then we simply
            // abort - it cannot be an instance of the given...
            if (!originalMixinClass) {
                return false;
            }

            // Loop through the given instance's prototype chain
            while (instance !== null) {

                // If a reference has been stated on the mixin class and it
                // matches the original mixin, we assume that
                if (instance.hasOwnProperty(_BareMixin.MIXIN_REFERENCE) && instance[_BareMixin.MIXIN_REFERENCE] === originalMixinClass) {
                    return true;
                }

                // Fetch the next prototype
                instance = Object.getPrototypeOf(instance);
            }

            // If nothing was matched, then we assume that the instances
            // simply do not match.
            return false;
        }

    });

    // Finally, return the decorated mixin class
    return mixinClass;
};

exports.default = HasInstance;

},{"./../Utils/wrap":13,"./BareMixin":10}],13:[function(require,module,exports){
'use strict';

/**
 * Reference to an original mixin
 *
 * @type {Symbol}
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ORIGINAL_MIXIN = exports.ORIGINAL_MIXIN = Symbol('originalMixin');

/**
 * Sets the prototype of the wrapper to be the given mixin class
 * and stores a reference to the original mixin.
 *
 * @param {Function} mixinClass
 * @param {Function} wrapper
 *
 * @return {Function} Wrapper
 */
var wrap = function wrap(mixinClass, wrapper) {
  Object.setPrototypeOf(wrapper, mixinClass);

  if (!mixinClass[ORIGINAL_MIXIN]) {
    mixinClass[ORIGINAL_MIXIN] = mixinClass;
  }

  return wrapper;
};

exports.default = wrap;

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BareMixin = require('./Decorators/BareMixin');

var _BareMixin2 = _interopRequireDefault(_BareMixin);

var _HasInstance = require('./Decorators/HasInstance');

var _HasInstance2 = _interopRequireDefault(_HasInstance);

var _Cached = require('./Decorators/Cached');

var _Cached2 = _interopRequireDefault(_Cached);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Declare a mixin - decorates the given mixin class with
 * a "cached, has instance and bare mixin" decorators.
 *
 * @see BareMixin
 * @see HasInstance
 * @see Cached
 *
 * @param {Function} mixinClass
 *
 * @return {Function}
 */
var DeclareMixin = function DeclareMixin(mixinClass) {
    return (0, _Cached2.default)((0, _HasInstance2.default)((0, _BareMixin2.default)(mixinClass)));
};

exports.default = DeclareMixin;

},{"./Decorators/BareMixin":10,"./Decorators/Cached":11,"./Decorators/HasInstance":12}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Builder = require('./Builder');

var _Builder2 = _interopRequireDefault(_Builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Mixin Builder wrapper
 *
 * Allows you to extend a class with one or more mixin-classes.
 *
 * @see Builder
 *
 * @param {function} [superClass=class {}]
 */
var mix = function mix(superClass) {
  return new _Builder2.default(superClass);
};

exports.default = mix;

},{"./Builder":9}],16:[function(require,module,exports){
(function (root, factory){
  'use strict';

  /*istanbul ignore next:cant test*/
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else {
    // Browser globals
    root.objectPath = factory();
  }
})(this, function(){
  'use strict';

  var toStr = Object.prototype.toString;
  function hasOwnProperty(obj, prop) {
    if(obj == null) {
      return false
    }
    //to handle objects with null prototypes (too edge case?)
    return Object.prototype.hasOwnProperty.call(obj, prop)
  }

  function isEmpty(value){
    if (!value) {
      return true;
    }
    if (isArray(value) && value.length === 0) {
        return true;
    } else if (typeof value !== 'string') {
        for (var i in value) {
            if (hasOwnProperty(value, i)) {
                return false;
            }
        }
        return true;
    }
    return false;
  }

  function toString(type){
    return toStr.call(type);
  }

  function isObject(obj){
    return typeof obj === 'object' && toString(obj) === "[object Object]";
  }

  var isArray = Array.isArray || function(obj){
    /*istanbul ignore next:cant test*/
    return toStr.call(obj) === '[object Array]';
  }

  function isBoolean(obj){
    return typeof obj === 'boolean' || toString(obj) === '[object Boolean]';
  }

  function getKey(key){
    var intKey = parseInt(key);
    if (intKey.toString() === key) {
      return intKey;
    }
    return key;
  }

  function factory(options) {
    options = options || {}

    var objectPath = function(obj) {
      return Object.keys(objectPath).reduce(function(proxy, prop) {
        if(prop === 'create') {
          return proxy;
        }

        /*istanbul ignore else*/
        if (typeof objectPath[prop] === 'function') {
          proxy[prop] = objectPath[prop].bind(objectPath, obj);
        }

        return proxy;
      }, {});
    };

    function hasShallowProperty(obj, prop) {
      return (options.includeInheritedProps || (typeof prop === 'number' && Array.isArray(obj)) || hasOwnProperty(obj, prop))
    }

    function getShallowProperty(obj, prop) {
      if (hasShallowProperty(obj, prop)) {
        return obj[prop];
      }
    }

    function set(obj, path, value, doNotReplace){
      if (typeof path === 'number') {
        path = [path];
      }
      if (!path || path.length === 0) {
        return obj;
      }
      if (typeof path === 'string') {
        return set(obj, path.split('.').map(getKey), value, doNotReplace);
      }
      var currentPath = path[0];
      var currentValue = getShallowProperty(obj, currentPath);
      if (path.length === 1) {
        if (currentValue === void 0 || !doNotReplace) {
          obj[currentPath] = value;
        }
        return currentValue;
      }

      if (currentValue === void 0) {
        //check if we assume an array
        if(typeof path[1] === 'number') {
          obj[currentPath] = [];
        } else {
          obj[currentPath] = {};
        }
      }

      return set(obj[currentPath], path.slice(1), value, doNotReplace);
    }

    objectPath.has = function (obj, path) {
      if (typeof path === 'number') {
        path = [path];
      } else if (typeof path === 'string') {
        path = path.split('.');
      }

      if (!path || path.length === 0) {
        return !!obj;
      }

      for (var i = 0; i < path.length; i++) {
        var j = getKey(path[i]);

        if((typeof j === 'number' && isArray(obj) && j < obj.length) ||
          (options.includeInheritedProps ? (j in Object(obj)) : hasOwnProperty(obj, j))) {
          obj = obj[j];
        } else {
          return false;
        }
      }

      return true;
    };

    objectPath.ensureExists = function (obj, path, value){
      return set(obj, path, value, true);
    };

    objectPath.set = function (obj, path, value, doNotReplace){
      return set(obj, path, value, doNotReplace);
    };

    objectPath.insert = function (obj, path, value, at){
      var arr = objectPath.get(obj, path);
      at = ~~at;
      if (!isArray(arr)) {
        arr = [];
        objectPath.set(obj, path, arr);
      }
      arr.splice(at, 0, value);
    };

    objectPath.empty = function(obj, path) {
      if (isEmpty(path)) {
        return void 0;
      }
      if (obj == null) {
        return void 0;
      }

      var value, i;
      if (!(value = objectPath.get(obj, path))) {
        return void 0;
      }

      if (typeof value === 'string') {
        return objectPath.set(obj, path, '');
      } else if (isBoolean(value)) {
        return objectPath.set(obj, path, false);
      } else if (typeof value === 'number') {
        return objectPath.set(obj, path, 0);
      } else if (isArray(value)) {
        value.length = 0;
      } else if (isObject(value)) {
        for (i in value) {
          if (hasShallowProperty(value, i)) {
            delete value[i];
          }
        }
      } else {
        return objectPath.set(obj, path, null);
      }
    };

    objectPath.push = function (obj, path /*, values */){
      var arr = objectPath.get(obj, path);
      if (!isArray(arr)) {
        arr = [];
        objectPath.set(obj, path, arr);
      }

      arr.push.apply(arr, Array.prototype.slice.call(arguments, 2));
    };

    objectPath.coalesce = function (obj, paths, defaultValue) {
      var value;

      for (var i = 0, len = paths.length; i < len; i++) {
        if ((value = objectPath.get(obj, paths[i])) !== void 0) {
          return value;
        }
      }

      return defaultValue;
    };

    objectPath.get = function (obj, path, defaultValue){
      if (typeof path === 'number') {
        path = [path];
      }
      if (!path || path.length === 0) {
        return obj;
      }
      if (obj == null) {
        return defaultValue;
      }
      if (typeof path === 'string') {
        return objectPath.get(obj, path.split('.'), defaultValue);
      }

      var currentPath = getKey(path[0]);
      var nextObj = getShallowProperty(obj, currentPath)
      if (nextObj === void 0) {
        return defaultValue;
      }

      if (path.length === 1) {
        return nextObj;
      }

      return objectPath.get(obj[currentPath], path.slice(1), defaultValue);
    };

    objectPath.del = function del(obj, path) {
      if (typeof path === 'number') {
        path = [path];
      }

      if (obj == null) {
        return obj;
      }

      if (isEmpty(path)) {
        return obj;
      }
      if(typeof path === 'string') {
        return objectPath.del(obj, path.split('.'));
      }

      var currentPath = getKey(path[0]);
      if (!hasShallowProperty(obj, currentPath)) {
        return obj;
      }

      if(path.length === 1) {
        if (isArray(obj)) {
          obj.splice(currentPath, 1);
        } else {
          delete obj[currentPath];
        }
      } else {
        return objectPath.del(obj[currentPath], path.slice(1));
      }

      return obj;
    }

    return objectPath;
  }

  var mod = factory();
  mod.create = factory;
  mod.withInheritedProps = factory({includeInheritedProps: true})
  return mod;
});

},{}],17:[function(require,module,exports){
"use strict";

var _create = require("./utils/create");

var _create2 = _interopRequireDefault(_create);

var _elements = require("./utils/elements");

var _elements2 = _interopRequireDefault(_elements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener("DOMContentLoaded", ev => {

    window.elements = _elements2.default;

    console.log(ev);

    setTimeout(() => {
        _create2.default.all();
        console.log("created");
    }, 5000);
    // create.all();
});

},{"./utils/create":63,"./utils/elements":64}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _DOMString = require("./../type/DOMString.js");

var _DOMString2 = _interopRequireDefault(_DOMString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Adds functionality to `aria-checked` attribute.
*
* Changes value when clicked or while focused pressing `Space`.
*
* {@link https://www.w3.org/TR/wai-aria-1.1/#aria-checked}
* @emits click when clicked or while focused pressing `Space`.
* @emits change when clicked or while focused pressing `Space`.
*/
let AriaChecked = superclass => class extends superclass {

	constructor(...args) {
		super(...args);

		this.addEventListener("key", this.onChecked.bind(this), { key: "Space" });
		this.addEventListener("click", this.onChecked.bind(this));
	}

	onChecked(ev) {
		if (ev) ev.preventDefault();

		if (this.disabled !== true) {
			this.checked = _DOMString2.default.toggle(this.checked);
			this.dispatchEvent(new InputEvent("input"));
			this.dispatchEvent(new Event("change", { bubbles: true }));
		}
	}
};

exports.default = AriaChecked;

},{"./../type/DOMString.js":59}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _boolean = require("./../type/boolean");

var _boolean2 = _interopRequireDefault(_boolean);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Adds functionality to `aria-expanded` attribute
* @todo add a setting to define how the visibility should be toggled
*/
let AriaExpanded = superclass => class extends superclass {
	/**
 * @param  {HTMLElement} element Element with an `aria-expanded` attribute
 */
	constructor(...args) {
		super(...args);
		if (this.expanded !== undefined) {
			// todo: add when first time aria-expanded is boolean
			this.addEventListener("click", this.onexpanded.bind(this));
			// this.addEventListener("key", this.onexpanded.bind(this), { key: ["Enter", "Space"] });
		}
	}

	onexpanded(ev) {
		if (typeof super.onexpanded == "function") super.onexpanded(ev);
		if (ev && typeof ev.preventDefault === "function") ev.preventDefault();

		if (this.disabled !== true) {
			this.expanded = _boolean2.default.toggle(this.expanded);

			if (this.expanded) {
				this.controls.forEach(control => {
					control.element.hidden = false;
				});
			} else {
				this.controls.forEach(control => {
					control.element.hidden = true;
				});
			}
		}
	}
};

exports.default = AriaExpanded;

},{"./../type/boolean":60}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _DOMString = require("./../type/DOMString");

var _DOMString2 = _interopRequireDefault(_DOMString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Adds functionality to `aria-pressed` attribute.
*
* Changes value when clicked or while focused pressing `Space` or `Enter`.
*
* {@link https://www.w3.org/TR/wai-aria-1.1/#aria-pressed}
* @emits click when clicked or while focused pressing `Space` or `Enter`.
*/
let AriaPressed = superclass => class extends superclass {
	/**
 * @param  {HTMLElement} element Element with an `aria-pressed` attribute
 */
	constructor(...args) {
		super(...args);

		if (this.pressed !== undefined) {
			// todo: add when first time aria-pressed is boolean
			this.addEventListener("click", this.onPressed.bind(this));
			this.addEventListener("key", this.onPressed.bind(this), { key: ["Enter", "Space"] });
		}
	}

	onPressed(ev) {
		if (typeof super.onPressed == "function") super.onPressed(ev);

		if (this.disabled !== true) {
			this.pressed = _DOMString2.default.toggle(this.pressed);
		}
	}
};

exports.default = AriaPressed;

},{"./../type/DOMString":59}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _boolean = require("./../type/boolean");

var _boolean2 = _interopRequireDefault(_boolean);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * gets and sets the `aria-selected` attribute.
 *
 * Indicates if a element is selectable
 *
 * @see https://www.w3.org/TR/wai-aria-1.1/#aria-selected
 */
let AriaSelected = superclass => class extends superclass {
	constructor(...args) {
		super(...args);

		this.addEventListener("click", this.onSelected.bind(this));
		this.addEventListener("key", this.onSelected.bind(this), { key: ["Space", "Enter"] });
	}

	onSelected(ev) {
		if (typeof super.onSelected == "function") super.onSelected(ev);
		this.selected = _boolean2.default.toggle(this.selected);
	}
};

exports.default = AriaSelected;

},{"./../type/boolean":60}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * 
 */
const roles = {
	alert: {
		super: ["section"],
		sub: ["alertdialog"],
		defaults: {
			live: "assertive",
			atomic: true
		}
	},
	alertdialog: { super: ["alert", "dialog"] },
	application: { super: ["structure"] },
	article: {
		super: ["document"],
		implicit: ["article:not([role)"]
	},
	/** @todo more strict banner selector  */
	banner: {
		super: ["landmark"],
		implicit: ["header:not([role])"]
	},
	button: {
		super: ["command"],
		implicit: ["button:not([role])", "input[type='button']:not([role])", "input[type='reset']:not([role])", "input[type='image']:not([role])", "input[type='submit']:not([role])", "summary:not([role])"]
	},
	cell: {
		super: ["section"],
		sub: ["columnheader", "rowheader", "gridcell"],
		context: ["row"],
		implicit: ["table td:not([role])"]
	},
	checkbox: {
		super: ["input"],
		sub: ["menuitemcheckbox", "switch"],
		implicit: ["input[type='checkbox']:not([role])"],
		defaults: {
			checked: true
		}
	},
	columnheader: {
		super: ["cell", "gridcell", "sectionhead"],
		context: ["row"],
		implicit: ["thead th:not([role])"]
	},
	/** @todo size attribute doesn't check faulty values */
	combobox: {
		super: ["select"],
		owns: ["textbox", "listbox", "tree", "grid", "dialog"],
		implicit: ["input[type='email'][list]:not([role])", "input[type='text'][list]:not([role])", "input[type='search'][list]:not([role])", "input[type='tel'][list]:not([role])", "input[type='url'][list]:not([role])", "select:not([multiple]):not([size]):not([role])", "select:not([multiple])[size='0']:not([role])", "select:not([multiple])[size='1']:not([role])"],
		defaults: {
			expanded: false,
			hasPopUp: "listbox"
		}
	},
	command: {
		super: ["widget"],
		sub: ["menuitem", "button", "link"]
	},
	complementary: {
		super: ["landmark"],
		implicit: ["aside:not([role])"]
	},
	composite: {
		super: ["widget"],
		sub: ["grid", "select", "spinbutton", "tablist"]
	},
	/** @todo more strict footer selector  */
	contentinfo: {
		super: ["landmark"],
		implicit: ["footer:not([role])"]
	},
	definition: {
		super: ["section"],
		implicit: ["dd:not([role])"]
	},
	dialog: {
		super: ["window"],
		sub: ["alertdialog"],
		implicit: ["dialog:not([role])"]
	},
	directory: { super: ["list"] },
	document: {
		super: ["structure"],
		sub: ["article"],
		implicit: ["aside:not([role])"]
	},
	feed: {
		super: ["list"],
		owns: ["article"]
	},
	figure: {
		super: ["section"],
		implicit: ["figure:not([role])"]
	},
	form: {
		super: ["landmark"],
		implicit: ["form:not([role])"]
	},
	grid: {
		super: ["composite", "table"],
		sub: ["treegrid"],
		owns: ["rowgroup", "row"]
	},
	gridcell: {
		super: ["cell", "widget"],
		sub: ["columnheader", "rowheader"],
		context: ["row"]
	},
	group: {
		super: ["section"],
		sub: ["row", "select", "toolbar"],
		implicit: ["details:not([role])", "optgroup:not([role])"]
	},
	heading: {
		super: ["sectionhead"],
		implicit: ["h1:not([role])", "h2:not([role])", "h3:not([role])", "h4:not([role])", "h5:not([role])", "h6::not([role])"],
		defaults: {
			level: 2
		}
	},
	img: {
		super: ["section"],
		implicit: ["img[alt]:not([alt='']):not([role])"]
	},
	input: {
		super: ["widget"],
		sub: ["checkbox", "option", "radio", "slider", "spinbutton", "textbox"]
	},
	landmark: {
		super: ["section"],
		sub: ["banner", "complementary", "contentinfo", "form", "main", "navigation", "region", "search"]
	},
	link: {
		super: ["command"],
		implicit: ["a[href]:not([role])", "area[href]:not([role])", "link[href]:not([role])"]
	},
	list: {
		super: ["section"],
		sub: ["directory", "feed"],
		owns: [["group", "listitem"], "listitem"],
		implicit: ["dl:not([role])", "ol:not([role])", "ul:not([role])"]
	},
	listbox: {
		super: ["select"],
		owns: ["option"],
		implicit: ["datalist:not([role])", "select[multiple]:not([role])", "select[size]:not([size='0']):not([size='1']):not([role])"]
	},
	listitem: {
		super: ["section"],
		sub: ["treeitem"],
		context: ["group", "list"],
		implicit: ["dt:not([role])", "ol > li::not([role])"]
	},
	log: {
		super: ["section"],
		defaults: {
			live: "pollite"
		}
	},
	main: {
		super: ["landmark"],
		implicit: ["main:not([role])"]
	},
	marquee: { super: ["section"] },
	math: {
		super: ["section"],
		implicit: ["math:not([role])"]
	},
	menu: {
		super: ["select"],
		sub: ["menubar"],
		owns: ["menuitem", "menuitemradio", "menuitemcheckbox", ["group", "menuitemradio"]],
		implicit: ["menu[type='context']:not([role])"],
		defaults: { orientation: "vertical" }
	},
	menubar: {
		super: ["menu"],
		sub: ["toolbar"],
		owns: ["menuitem", "menuitemradio", "menuitemcheckbox", ["group", "menuitemradio"]],
		defaults: { orientation: "horizontal" }
	},
	menuitem: {
		super: ["command"],
		sub: ["menuitemcheckbox"],
		context: ["group", "menu", "menubar"],
		implicit: ["menuitem[type='context']:not([role])"]
	},
	menuitemcheckbox: {
		super: ["checkbox", "menuitem"],
		sub: ["menuitemradio"],
		context: ["menu", "menubar"],
		implicit: ["menuitem[type='checkbox']:not([role])"],
		defaults: { checked: false }
	},
	menuitemradio: {
		super: ["menuitemcheckbox", "radio"],
		context: ["group", "menu", "menubar"],
		implicit: ["menuitem[type='radio']:not([role])"],
		defaults: { checked: false }
	},
	navigation: {
		super: ["landmark"],
		implicit: ["nav:not([role])"]
	},
	/** @todo reconsider if none == presentation */
	none: { super: ["structure"] },
	note: { super: ["section"] },
	/** @todo more strict datalist selector */
	option: {
		super: ["input"],
		sub: ["treeitem"],
		context: ["listbox"],
		implicit: ["datalist option:not([role])"],
		defaults: { checked: false }
	},
	presentation: {
		super: ["structure"]
	},
	progressbar: {
		super: ["range"],
		implicit: ["progress:not([role])"]
	},
	radio: {
		super: ["input"],
		sub: ["menuitemradio"],
		implicit: ["input[type='radio']:not([role])"],
		defaults: { checked: false }
	},
	radiogroup: {
		super: ["select"],
		owns: ["radio"]
	},
	range: {
		super: ["widget"],
		sub: ["progressbar", "scrollbar", "slider", "spinbutton"]
	},
	/** @todo add section selector to check accessible */
	region: { super: ["landmark"] },
	roletype: { sub: ["structure", "widget", "window"] },
	/** @todo more strict tr selector */
	row: {
		sub: ["group", "widget"],
		context: ["grid", "rowgroup", "table", "treegrid"],
		owns: ["cell", "columnheader", "rowheader", "gridcell"],
		implicit: ["table tr:not([role])"]
	},
	rowgroup: {
		context: ["grid", "table", "treegrid"],
		owns: ["row"],
		implicit: ["thead:not([role])", "tbody:not([role])", "tfoot:not([role])"]
	},
	rowheader: {
		super: ["cell", "gridcell", "sectionhead"],
		context: ["row"],
		implicit: ["tbody th:not([role])"]
	},
	scrollbar: {
		super: ["range"],
		defaults: {
			orientation: "vertical",
			valueMin: 0,
			valueMax: 100
		}
	},
	search: { super: ["landmark"] },
	searchbox: {
		super: ["textbox"],
		implicit: ["input[type='search']:not([list]):not([role])"]
	},
	section: {
		super: ["structure"],
		sub: ["alert", "cell", "definition", "figure", "group", "img", "landmark", "list", "listitem", "log", "marquee", "math", "note", "status", "table", "tabpanel", "term", "tooltip"]
	},
	sectionhead: {
		super: ["structure"],
		sub: ["columnheader", "heading", "rowheader", "tab"]
	},
	select: {
		super: ["composite", "group"],
		sub: ["combobox", "listbox", "menu", "radiogroup", "tree"]
	},
	/** @todo seperation of focusable */
	separator: {
		super: ["structure", "widget"],
		implicit: ["hr:not([role])"],
		defaults: {
			orientation: "horizontal",
			valueMin: 0,
			valueMax: 100,
			valueNow: 50
		}
	},
	slider: {
		super: ["input", "range"],
		implicit: ["input[type='range']:not([role])"],
		defaults: {
			orientation: "horizontal",
			valueMin: 0,
			valueMax: 100
		}
	},
	spinbutton: {
		super: ["composite", "input", "range"],
		implicit: ["input[type='number']:not([role])"],
		defaults: { valueNow: 0 }
	},
	status: {
		super: "section",
		sub: ["progressbar", "timer"],
		implicit: ["output:not([role])"]
	},
	structure: {
		super: ["roletype"],
		sub: ["application", "document", "presentation", "rowgroup", "section", "sectionhead", "separator"]
	},
	switch: {
		super: ["checkbox"],
		defaults: { checked: false }
	},
	tab: {
		super: ["sectionhead", "widget"],
		context: ["tablist"],
		defaulst: { selected: false }
	},
	table: {
		super: ["section"],
		sub: ["grid"],
		owns: ["row", "rowgroup"],
		implicit: ["table:not([role])"]
	},
	tablist: {
		super: ["composite"],
		owns: ["tab"],
		defaults: { orientation: "horizontal" }
	},
	tabpanel: { super: ["section"] },
	term: { super: ["section"] },
	textbox: {
		super: ["input"],
		sub: ["searchbox"],
		implicit: ["input[type='email']:not([list]):not([role])", "input[type='tel']:not([list]):not([role])", "input[type='text']:not([list]):not([role])", "input[type='url']:not([list]):not([role])", "textarea:not([role])"]
	},
	timer: { super: ["status"] },
	toolbar: {
		super: ["group"],
		defaults: { orientation: "horizontal" }
	},
	tooltip: { super: ["section"] },
	tree: {
		super: ["select"],
		sub: ["threegrid"],
		owns: [["group", "treeitem"], "treeitem"]
	},
	treegrid: {
		super: ["grid", "tree"],
		owns: ["row", "rowgroup"]
	},
	treeitem: {
		super: ["listitem", "option"],
		context: ["group", "tree"]
	},
	widget: {
		super: ["roletype"],
		sub: ["command", "composite", "gridcell", "input", "range", "row", "separator", "tab"]
	},
	window: {
		super: ["roletype"],
		sub: ["dialog"]
	}
};

exports.default = roles;

},{}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
function setSelection(range) {
	var selection = window.getSelection();
	selection.removeAllRanges();
	selection.addRange(range);
}

/**
 * @mixin
 */
let Selection = superclass => class Selection extends superclass {
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
			if (sel.focusOffset == sel.anchorOffset) {} else if (sel.anchorOffset > sel.focusOffset && direction != "backward") {
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
	setRangeText(replacement, start = this.selectionStart, end = this.selectionEnd, selectMode = "preserve") {
		let selectionStart = this.selectionStart;
		let selectionEnd = this.selectionEnd;

		if (start > end) {
			throw new RangeError();
		}
		if (start > this.value.length) {
			start = this.value.length;
		}
		if (end > this.value.length) {
			end = this.value.length;
		}
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

exports.default = Selection;

},{}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ValidityState = require("./../utils/ValidityState");

var _ValidityState2 = _interopRequireDefault(_ValidityState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @mixin
 * @borrows ValidityState as validity
 * @lends Validation#
 */
let Validation = superclass => class Validation extends superclass {
	get validity() {
		if (!this._validity) this._validity = new _ValidityState2.default(this);

		return this._validity;
	}

	/**
  * Returns true if the element will be validated when the form is submitted; false otherwise.
  * @type {Boolean}
  */
	get willValidate() {
		return !this.hidden && !this.readOnly;
	}

	/**
  * Returns the error message that would be shown to the user
  * if the element was to be checked for validity.
  * @name Validation#validationMessage
  * @type {String}
  */
	get validationMessage() {
		if (this.validity.valid) return;
		if (this.validity.valueMissing) return "Please fill in this field.";
		if (this.validity.typeMismatch) return "Please use the correct input type.";

		if (this.validity.tooLong) {
			return "Please shorten this text to 10 characters or less (you are currently using 48 characters).";
		}
		if (this.validity.tooShort) {
			return "Please lengthen this text to 10 characters or more (you are currently using 1 character).";
		}

		if (this.validity.badInput) return "Please enter a number.";
		if (this.validity.stepMismatch) return "Please select a valid value.";
		if (this.validity.rangeOverflow) return "Please select a smaller value.";
		if (this.validity.rangeUnderflow) return "Please select a larger value.";
		if (this.validity.patternMismatch) return "Please match the format requested.";
		if (this.validity.customError) return this.errormessage.element.innerHTML;

		// Fallback value should never been shown
		return this.errormessage.element.innerHTML || "The value you entered for this field is invalid.";
	}

	/**
  * Returns true if the element’s value has no validity problems; false otherwise.
  * Fires an invalid event at the element in the latter case.
  * @fires invalid
  * @name Validation#checkValidity
  */
	checkValidity() {
		if (!this.validity.valid) this.dispatchEvent("invalid", this);
		return this.validity.valid;
	}

	/**
  * Returns true if the element’s value has no validity problems; otherwise, returns false, fires an
  * invalid event at the element, and(if the event isn’t canceled) reports the problem to the user.
  * @fires invalid
  * @name Validation#reportValidity
  */
	reportValidity() {
		if (!this.validity.valid) {
			let cancelled = !this.dispatchEvent("invalid", this);
			if (!cancelled) {
				this.errormessage.hidden = false;
			}
		} else {
			this.errormessage.hidden = true;
		}
		return this.validity.valid;
	}

	/**
  * Sets a custom error, so that the element would fail to validate.The given message is the
  * message to be shown to the user when reporting the problem to the user.
  * 
  * If the argument is the empty string, clears the custom error.
  * 
  * @name Validation#setCustomValidity
  * @param {?String} message 
  */
	setCustomValidity(message) {
		// update ValidyState object
		this.validity._customError = message;

		if (message) {
			// update `aria-invalid` property to invalid
			this.invalid = true;

			// update error message
			this.errormessage.element.innerHTML = message;
			this.errormessage.element.hidden = false;
		} else {
			// update `aria-invalid` property to invalid
			this.invalid = false;

			// update error message
			this.errormessage.element.innerHTML = "";
			this.errormessage.element.hidden = true;
		}
	}
};

exports.default = Validation;

},{"./../utils/ValidityState":62}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsMixin = require("@vestergaard-company/js-mixin");

var _owns = require("./../utils/owns");

var _owns2 = _interopRequireDefault(_owns);

var _elements = require("./../utils/elements");

var _elements2 = _interopRequireDefault(_elements);

var _focus = require("./../utils/focus");

var _focus2 = _interopRequireDefault(_focus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// application
// composite
// spinbutton
// tablist = horizontal
// select
// radiogroup, radio
// combobox
// tree = vertical, 
// menu = vertical, menuitem
// menubar = horizontal, menuitem
// listbox = vertical, option
// grid, cell
// treegrid, cell
// textbox
// searchbox
// group
// row
// toolbar = horizontal

exports.default = (0, _jsMixin.DeclareMixin)(superClass => class activeDescendant extends superClass {

    constructor(...args) {
        super(...args);

        this.onMount();
    }

    onMount() {
        if (this.activeDescendant) {
            // this.addEventListener("focusin", this.onStartColumn);
        }

        switch (this.role) {
            case "tablist":
            case "toolbar":
            case "menubar":
                this.addEventListener("key", this.onPreviousColumn.bind(this), { key: "ArrowLeft" });
                this.addEventListener("key", this.onNextColumn.bind(this), { key: "ArrowRight" });
                break;
            case "tree":
            case "menu":
            case "listbox":
                this.addEventListener("key", this.onPreviousRow.bind(this), { key: "ArrowUp" });
                this.addEventListener("key", this.onNextRow.bind(this), { key: "ArrowDown" });
                break;
        }

        this.options = _owns2.default.getAllAllowedChildren(this);
    }

    onStartColumn() {}
    onPreviousColumn(ev) {
        // check if the element or an allowed child has focus
        if (this === ev.target || this.options.indexOf(_elements2.default.get(ev.target)) > -1) {
            _focus2.default.prev(this, _focus2.default.activeElement);
        }
    }
    onNextColumn(ev) {
        // check if the element or an allowed child has focus
        if (this === ev.target || this.options.indexOf(_elements2.default.get(ev.target)) > -1) {
            _focus2.default.next(this, _focus2.default.activeElement);
        }
    }
    onEndColumn() {}

    onStartRow() {}
    onPreviousRow(ev) {
        if (this.options.indexOf(_elements2.default.get(ev.target)) > -1) {
            _focus2.default.prev(this, _focus2.default.activeElement);
        }
    }
    onNextRow(ev) {
        if (this.options.indexOf(_elements2.default.get(ev.target)) > -1) {
            _focus2.default.next(this, _focus2.default.activeElement);
        }
    }
    onEndRow() {}

    onFocusMove() {}

});

},{"./../utils/elements":64,"./../utils/focus":65,"./../utils/owns":67,"@vestergaard-company/js-mixin":8}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jsMixin = require("@vestergaard-company/js-mixin");

/** @module */

/**
* Adds functionality to the `expanded` attribute
* @todo add a setting to define how the visibility should be toggled
* @name expanded
* @alias module:expanded
* @mixin
*/
exports.default = (0, _jsMixin.DeclareMixin)(superclass => class extends superclass {

	/**
  * Updates the element expanded state to open and 
  * fires the open event to all elements who are connected trough `controls`
  * @name module:expanded#onOpen
  * @param {Event} ev
  * @fires [aria-controls]#event:open
  */
	onOpen(ev) {
		if (typeof super.onOpen == "function") super.onOpen(ev);
		if (ev && typeof ev.preventDefault === "function") ev.preventDefault();

		if (this.disabled !== true && this.expanded === false) {
			this.expanded = true;

			if (this.controls) {
				this.controls.forEach(control => {
					control.dispatchEvent(new Event("open"));
				});
			}
		}
	}

	/**
  * Updates the element expanded state to close and 
  * fires the close event to all elements who are connected trough `controls`
  * @name module:expanded#onClose
  * @param {Event} ev
  * @fires [aria-controls]#event:close
  */
	onClose(ev) {
		if (typeof super.onClose == "function") super.onClose(ev);
		if (ev && typeof ev.preventDefault === "function") ev.preventDefault();

		if (this.disabled !== true && this.expanded === true) {
			this.expanded = false;

			if (this.controls) {
				this.controls.forEach(control => {
					control.dispatchEvent(new Event("close"));
				});
			}
		}
	}
});

},{"@vestergaard-company/js-mixin":8}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jsMixin = require("@vestergaard-company/js-mixin");

var _jsMixin2 = _interopRequireDefault(_jsMixin);

var _Command = require("./abstract/Command");

var _Command2 = _interopRequireDefault(_Command);

var _boolean = require("./../type/boolean");

var _boolean2 = _interopRequireDefault(_boolean);

var _ariaPressed = require("../attributes/aria-pressed.js");

var _ariaPressed2 = _interopRequireDefault(_ariaPressed);

var _ariaExpanded = require("../attributes/aria-expanded");

var _ariaExpanded2 = _interopRequireDefault(_ariaExpanded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function close() {
	this.expanded = _boolean2.default.IS_NOT_ACTIVE;
} /** @module Button */

function registerExpanded(ev) {
	console.log(ev);
}

/**
 * @summary An input that allows for user-triggered actions when clicked or pressed.
 * 
 * @alias module:Button
 * @extends Command
 * @mixes AriaExpanded
 * @mixes AriaPressed
 */
class Button extends (0, _jsMixin2.default)(_Command2.default).with(_ariaExpanded2.default, _ariaPressed2.default) {
	constructor(...args) {
		super(...args);

		this.addEventListener("attributes", registerExpanded, { attribute: "aria-expanded", once: true });

		if (this.expanded !== undefined && this.controls) {
			// todo: add when first time aria-expanded is boolean
			console.log(this.controls.length);
			this.controls.forEach(control => {
				console.log(control.addEventListener);
				if (control.addEventListener) control.addEventListener("close", close.bind(this));
			});
		}
	}

	onexpanded(ev) {
		if (typeof super.onexpanded == "function") super.onexpanded(ev);

		if (this.disabled !== true) {
			if (this.expanded) {
				this.controls.forEach(control => {
					control.element.hidden = false;
				});
			} else {
				this.controls.forEach(control => {
					control.element.hidden = true;
				});
			}
		}
	}
}

exports.default = Button;

},{"../attributes/aria-expanded":19,"../attributes/aria-pressed.js":20,"./../type/boolean":60,"./abstract/Command":46,"@vestergaard-company/js-mixin":8}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsMixin = require("@vestergaard-company/js-mixin");

var _jsMixin2 = _interopRequireDefault(_jsMixin);

var _Input = require("./abstract/Input");

var _Input2 = _interopRequireDefault(_Input);

var _ariaChecked = require("../attributes/aria-checked.js");

var _ariaChecked2 = _interopRequireDefault(_ariaChecked);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @summary A checkable input that has three possible values: true, false, or mixed.
 * @desc
 * #### Example
 *
 * <div role="checkbox" aria-checked="true" tabindex="0"></div>
 *
 * ```html
 * <div role="checkbox" aria-checked="true" tabindex="0"></div>
 * ```
 * @extends Input 
 * @mixes AriaChecked
 */
class Checkbox extends (0, _jsMixin2.default)(_Input2.default).with(_ariaChecked2.default) {
  /**
   * @param {*} args
  */
  constructor(...args) {
    super(...args);
  }
}

exports.default = Checkbox;

},{"../attributes/aria-checked.js":18,"./abstract/Input":48,"@vestergaard-company/js-mixin":8}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _boolean = require("./../type/boolean");

var _boolean2 = _interopRequireDefault(_boolean);

var _Select = require("./abstract/Select");

var _Select2 = _interopRequireDefault(_Select);

var _selector = require("./../utils/selector");

var _selector2 = _interopRequireDefault(_selector);

var _owns = require("./../utils/owns");

var _owns2 = _interopRequireDefault(_owns);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filter(cb, value) {
	var selectedOptions = [];

	cb.listbox.options.forEach(option => {
		if (value === null) {
			option.hidden = true;
		} else if (option._node.innerHTML.indexOf(value) == 0) {
			option.hidden = false;
			if (option._node.innerHTML === value) {
				selectedOptions.push(option);
			}
		} else {
			option.hidden = true;
		}
	});

	return selectedOptions;
}

function toggleListbox(ev) {
	if (ev) ev.preventDefault();

	if (this.expanded == _boolean2.default.IS_ACTIVE) {
		hideListbox.call(this);
	} else {
		showListbox.call(this);
	}
}

function updateValue(ev) {
	if (ev) ev.preventDefault();
	console.log(this.textbox.value, ev.target.innerHTML, this._, ev);
	this.textbox.value = ev.target.innerHTML;

	hideListbox.bind(this);
}

function updateListbox() {
	var options = filter(this, this.textbox.value);

	options.forEach(i => {
		i.selected = true;
	});
}
function showListbox() {
	this.expanded = _boolean2.default.IS_ACTIVE;
	updateListbox.call(this);
}
function hideListbox() {
	this.expanded = _boolean2.default.IS_NOT_ACTIVE;
	filter(this);
}

/**
 * @summary A composite widget containing a single-line textbox and another element, 
 * such as a listbox or grid, that can dynamically pop up to help the user set the value of the textbox.
 * @desc
 * A combobox is a widget made up of the combination of two distinct elements: 
 * 
 * 1. a single-line textbox
 * 2. an associated pop-up element for helping users set the value of the textbox. 
 * 
 * The popup may be a listbox, grid, tree, or dialog. Many implementations also include a third 
 * optional element -- a graphical button adjacent to the textbox, indicating the availability of
 * the popup. Activating the button displays the popup if suggestions are available.
 * 
 * ### Example
 * 
 * <div role="combobox" aria-expanded="false" aria-owns="listbox" aria-haspopup="listbox">
 *   <input role="textbox" contenteditable aria-autocomplete="list" aria-controls="listbox"  aria-activedescendant="option_1"/>
 * </div>
 * <ul role="listbox" id="listbox">
 *   <li id="option_1" role="option">Apple</li>
 *   <li id="option_2" role="option">Banana</li>
 * </ul>
 * 
 * @extends Select
 * @param {Element} [options.combobox.open]	
 * 	Optional button to open the pop-up element, 
 * 	defaults to first button element inside the element
 */
class Combobox extends _Select2.default {
	constructor(...args) {
		super(...args);

		// // register custom elements
		// this._.registerCustomElement("combobox.open", this._node.querySelector(selector.getDeep("button")));

		this.textbox = _owns2.default.get(this, _selector2.default.getDeep("textbox"));
		this.listbox = _owns2.default.get(this, _selector2.default.getDeep("listbox"));
		this.textbox.addEventListener("input", console.log);
		this.listbox.onchange = function () {
			console.log(arguments);
		};
		this.options = this.listbox.options;

		// if (this._.combobox.open) {
		// 	this._.combobox.open.addEventListener("click", toggleListbox.bind(this));
		// }

		// this.textbox.addEventListener("focus", showListbox.bind(this));
		// this.textbox.addEventListener("blur", hideListbox.bind(this));
		// this.textbox.addEventListener("input", updateListbox.bind(this));

		// if(this.autocomplete == "list") {
		// 	// Indicates that the autocomplete behavior of the text input is to suggest a list of possible values
		// 	// in a popup and that the suggestions are related to the string that is present in the textbox.

		// } else if (this.autocomplete == "both") {
		// 	// ndicates that the autocomplete behavior of the text input is to both show an inline 
		// 	// completion string and suggest a list of possible values in a popup where the suggestions 
		// 	// are related to the string that is present in the textbox.
		// }

		// /** @todo determine what to do with default values */
		// if(this.expanded == undefined) this.expanded = false;
		// if (this.hasPopup == undefined) this.hasPopup = "listbox";
	}

	onchange(ev) {
		this.textbox.value = ev.target.innerHTML;
	}
}

exports.default = Combobox;

},{"./../type/boolean":60,"./../utils/owns":67,"./../utils/selector":68,"./abstract/Select":53}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jsMixin = require("@vestergaard-company/js-mixin");

var _jsMixin2 = _interopRequireDefault(_jsMixin);

var _Window = require("./abstract/Window");

var _Window2 = _interopRequireDefault(_Window);

var _ariaExpanded = require("../attributes/aria-expanded.js");

var _ariaExpanded2 = _interopRequireDefault(_ariaExpanded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function focus(node) {
	// get all elements within given element
	let children = node.getElementsByTagName("*");

	// remove all elements who aren't accessible by a tab
	let focusableNodes = Array.prototype.filter.call(children, i => {
		return (i.tabIndex > -1 || i.contentEditable == "true") && !i.disabled && i.offsetWidth > 0 && i.offsetHeight > 0;
	});

	// sort elements in descending order
	focusableNodes.sort((a, b) => a.tabIndex + b.tabIndex);

	// document.activeElement.blur();
	// focusableEl.focus();
	return focusableNodes;
}

/**
 * @summary A child window within a webpage
 *
 * @desc
 * * Prompts the user to perform a specific action
 * * If it is designed to interrup, it is usually a modal. See [alertdialog]()
 * * It should have a label, it can be done with the `aria-label` attribute
 * * It should have at least one focusable descendant element.
 * * It should focus an element in the modal when displayed.
 * * It should manage focus of modal dialogs (keep the focus inside the open modal).
 *
 * ##### example
 *
 * <div role="dialog" aria-label="Window to confirm your acceptance of this world">
 *  Hello world!
 * 	<button focus type="button">Ok</button>
 * </div>
 * @extends Window
 */
class Dialog extends (0, _jsMixin2.default)(_Window2.default).with(_ariaExpanded2.default) {
	constructor(...args) {
		super(...args);

		// this._node.ownerDocument.addEventListener("focus", this._onFocus.bind(this), true);
		// this._node.ownerDocument.addEventListener("blur", this._onFocus.bind(this), true);
		this.addEventListener("key", this.onClose.bind(this), { key: "Escape", target: this._node.ownerDocument });

		var n = focus(document);
		var i = 0;
		// var t = setInterval(() => {
		// 	console.log(Mousetrap(document.activeElement).trigger("tab"));
		// 	// let i = n.indexOf(document.activeElement);
		// 	if(i < n.length) {
		// 		var f = new FocusEvent("focus");
		// 		n[i++].dispatchEvent(f);
		// 		// console.log(n[i++].focus());
		// 	}
		// }, 1000);
	}

	_onFocus(ev) {
		// ev.preventDefault();
		let n = focus(this._node.ownerDocument);
		if (n[n.length - 1] != ev.target) {
			ev.preventDefault();
			window.focus();
		}
		console.log(ev);
	}

	onClose(ev) {
		if (ev) ev.preventDefault();
		this._node.hidden = true;

		this.dispatchEvent(new Event("close"));
	}

	_onHiddenMutation(ev) {
		if (this._node.getAttribute("hidden") === "true") {
			var n = focus(this._node);
			n[0].focus();
			console.log(n, document.activeElement, n == document.activeElement);
		} else {}
	}
}

exports.default = Dialog;

},{"../attributes/aria-expanded.js":19,"./abstract/Window":56,"@vestergaard-company/js-mixin":8}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Landmark = require("./abstract/Landmark");

var _Landmark2 = _interopRequireDefault(_Landmark);

var _selector = require("./../utils/selector");

var _selector2 = _interopRequireDefault(_selector);

var _elements = require("./../utils/elements");

var _elements2 = _interopRequireDefault(_elements);

var _create = require("./../utils/create");

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Form extends _Landmark2.default {
	get elements() {
		// get native elements
		var selector = ["button", "fieldset", "input", "object", "output", "select", "textarea"].join(":not([role]),");
		var res = Array.from(this.elements.querySelectorAll(selector));

		var explicitRole = "";
		explicitRole += selector.getDeepRole("button");
		explicitRole += selector.getDeepRole("input");
		explicitRole += selector.getDeepRole("status");
		explicitRole += selector.getDeepRole("select");

		Array.prototype.forEach(this.elements.querySelectorAll(explicitRole), node => res.push(_elements2.default.get(node) || _create2.default.one(node)));
		console.log(res, explicitRole, selector);
		return res;
	}
}

exports.default = Form;

},{"./../utils/create":63,"./../utils/elements":64,"./../utils/selector":68,"./abstract/Landmark":49}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jsMixin = require("@vestergaard-company/js-mixin");

var _jsMixin2 = _interopRequireDefault(_jsMixin);

var _Command = require("./abstract/Command.js");

var _Command2 = _interopRequireDefault(_Command);

var _boolean = require("./../type/boolean");

var _boolean2 = _interopRequireDefault(_boolean);

var _ariaExpanded = require("../attributes/aria-expanded");

var _ariaExpanded2 = _interopRequireDefault(_ariaExpanded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function close() {
	this.expanded = _boolean2.default.IS_NOT_ACTIVE;
}

/**
 * An interactive reference to an internal or external resource that,
 * when activated, causes the user agent to navigate to that resource.
 * 
 * @extends Command
 * @mixes AriaExpanded
 * @param {String} options.link.href  URL that should be used
 * @listens click
 * @example
 * <div role="link" data-link-href="http://www.example.com/" tabindex="0">
 * 	Open website
 * </div>
 */
class Link extends (0, _jsMixin2.default)(_Command2.default).with(_ariaExpanded2.default) {
	constructor(...args) {
		super(...args);

		this._.registerCustomValue("link.href");

		if (this._.link.href) {
			this.addEventListener("click", this.onClick.bind(this));
			this.addEventListener("key", this.onClick.bind(this), { key: "Enter" });
		}

		this.addEventListener("expanded");

		if (this.expanded !== undefined) {
			// todo: add when first time aria-expanded is boolean
			this.controls.forEach(control => control.addEventListener("close", close.bind(this)));
			this.addEventListener("click", this.onexpanded.bind(this));
			this.addEventListener("key", this.onexpanded.bind(this), { key: "Enter" });
		}
	}

	/**
  * Fired when state of expanded is changed 
  * @param {Event} ev 
  */
	onexpanded(ev) {
		if (typeof super.onexpanded == "function") super.onexpanded(ev);

		if (this.disabled !== true) {
			if (this.expanded) {
				this.controls.forEach(control => {
					control.element.hidden = false;
				});
			} else {
				this.controls.forEach(control => {
					control.element.hidden = true;
				});
			}
		}
	}

	/**
  * Open the url that is defined in the options,  
  * fires an click event only if its origin wasn't an click event
  * @param {Event} ev 
  * @fires link#accessibleclick
  * @fires click
  */
	onClick(ev) {
		if (typeof super.onClick == "function") super.onClick(ev);

		if (this._.link.href) {
			console.log("should open", this._.link.href);
			// window.location.href = this._.link.href;
		}

		/**
     * An click triggered by an keyboard or mouse
     * @event Link#accessibleclick
     */
		this.dispatchEvent(new Event("accessibleclick"));
		if (ev.type !== "click") {
			this.dispatchEvent(new MouseEvent("click"));
		}
	}
}

exports.default = Link;

},{"../attributes/aria-expanded":19,"./../type/boolean":60,"./abstract/Command.js":46,"@vestergaard-company/js-mixin":8}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Select = require("./abstract/Select");

var _Select2 = _interopRequireDefault(_Select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @module Listbox */

/**
 * ### Keyboard Support
 *
 * #### Default
 * 
 * | Key | Function |
 * | --- | -------- |
 * | Down Arrow | Moves focus to the next option <br/> If not multiselectable, it selects the focused option.
 * | Up Arrow 	| Moves focus to the previous option  <br/> If not multiselectable, it selects the focused option.
 * | Home 			|	Moves focus to the first option  <br/> If not multiselectable, it selects the focused option.
 * | End  			|	Moves focus to the last option  <br/> If not multiselectable, it selects the focused option.
 * 
 * #### Multiple selection
 * 
 * | Key | Function |
 * | --- | -------- |
 * | Space					| Changes the selection state of the focused option. |
 * | Shift + Down Arrow 	| Moves focus to and selects the next option. |
 * | Shift + Up Arrow 	 	| Moves focus to and selects the previous option. |
 * | Control + Shift + Home |	Selects from the focused option to the beginning of the list. |
 * | Control + Shift + End  | Selects from the focused option to the end of the list. |
 * | Control + A 	        | Selects all options in the list. If all options are selected, unselects all options. |
 * 
 * ### Example
 * 
 * #### Basic example
 * 
 * <ul role="listbox" tabindex="0" aria-activedescendant="option_1" data-listbox-size="30">
 *   <li id="option_1" role="option">Apple</li>
 *   <li id="option_3" role="option">Asparagus</li>
 *   <li id="option_5" role="option">Beets</li>
 *   <li id="option_7" role="option">Broccoli</li>
 *   <li id="option_9" role="option">Cabbage</li>
 *   <li id="option_11" role="option">Cauliflower</li>
 *   <li id="option_13" role="option">Chard</li>
 *   <li id="option_15" role="option">Corn</li>
 *   <li id="option_17" role="option">Daikon</li>
 *   <li id="option_19" role="option">Edamame</li>
 * 	</ul>
 * 
 * ```html
 * <ul role="listbox" tabindex="0" aria-activedescendant="option_1">
 *   <li id="option_21" role="option">Elderberry</li>
 *   ...
 * </ul>
 * ```
 * 
 * #### Multi selectable example
 * 
 * <ul role="listbox" tabindex="0" aria-activedescendant="option_21" aria-multiselectable="true">
 *   <li id="option_21" role="option">Elderberry</li>
 *   <li id="option_23" role="option">Fig</li>
 *   <li id="option_25" role="option">Grape</li>
 *   <li id="option_27" role="option">Iceberg lettuce</li>
 *   <li id="option_29" role="option">Kale</li>
 *   <li id="option_31" role="option">Leek</li>
 *   <li id="option_33" role="option">Mango</li>
 *   <li id="option_35" role="option">Melon</li>
 *   <li id="option_37" role="option">Nectarine</li>
 *   <li id="option_39" role="option">Olive</li>
 *   <li id="option_41" role="option">Orange</li>
 *   <li id="option_43" role="option">Pea</li>
 *   <li id="option_45" role="option">Pineapple</li>
 *   <li id="option_47" role="option">Pumpkin</li>
 *   <li id="option_49" role="option">Radish</li>
 *   <li id="option_51" role="option">Shallot</li>
 *   <li id="option_53" role="option">Squash</li>
 *   <li id="option_55" role="option">Sweet potato</li>
 *   <li id="option_57" role="option">Turnip</li>
 *   <li id="option_59" role="option">Victoria plum</li>
 *   <li id="option_61" role="option">Watermelon</li>
 *   <li id="option_63" role="option">Zucchin</li>
 * 	</ul>
 * 
 * ```html
 * <ul role="listbox" tabindex="0" aria-activedescendant="option_1" aria-multiselectable="true">
 *   <li id="option_21" role="option">Elderberry</li>
 *   ...
 * <ul>
 * ```
 * 
 * @summary A widget that allows the user to select one or more items from a list of choices.
 * @extends Select
 * @alias module:Listbox
 */
class Listbox extends _Select2.default {
  constructor(...args) {
    super(...args);

    this._.registerCustomValue("listbox.size", 1);
    this.size = 10;
  }

  onChange(ev) {
    console.log(ev);
    // retrieve option that has been changed
    var changedOption = this.options.find(option => option._node === ev.target);

    // if only item can be selected, remove previous selected items
    if (!this.multiselectable && changedOption.selected === true) {
      this.options.forEach(option => {
        if (option.selected && option._node !== ev.target) {
          option.selected = false;
        }
      });
    } else if (!this.multiselectable) {
      // check if option got disabled
      if (!this.options.find(option => option.selected)) {
        // revert action
        ev.preventDefault();
      }
    }

    if (typeof super.onchange == "function") super.onChange(ev);
  }

  /**
   * Returns / Sets the size of control.
   * @type {Integer}
   */
  get size() {
    return this._.listbox.size;
  }
  set size(val) {
    var height = this.options[0].clientHeight;
    this._node.style.height = height * val + "px";
    this._.listbox.size = val;
  }
}

exports.default = Listbox;

},{"./abstract/Select":53}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jsMixin = require("@vestergaard-company/js-mixin");

var _jsMixin2 = _interopRequireDefault(_jsMixin);

var _Roletype = require("./abstract/Roletype");

var _Roletype2 = _interopRequireDefault(_Roletype);

var _activeDescendant = require("./../properties/activeDescendant");

var _activeDescendant2 = _interopRequireDefault(_activeDescendant);

var _focus = require("./../utils/focus");

var _focus2 = _interopRequireDefault(_focus);

var _tree = require("./../utils/tree");

var _tree2 = _interopRequireDefault(_tree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** 
 * ### Examples
 * 
 * <ul id="menubar1" role="menubar">
 *   <li role="none"><a role="menuitem">Hoi</a></li>
 *   <li role="presentation">
 *     <a role="menuitem" aria-haspopup="true" aria-expanded="false" href="#" tabindex="0">About</a>
 *     <ul role="menu" aria-label="About">
 *       <li><a role="menuitem" href="mb-about.html#overview" tabindex="-1">Overview</a></li>
 *       <li role="none"><a role="menuitem" href="mb-about.html#admin" tabindex="-1">Administration</a></li>
 *       <li role="none">
 *         <a id="menubar113" role="menuitem" href="#" aria-haspopup="true" aria-expanded="false" tabindex="-1">Facts</a>
 *         <ul role="menu" aria-label="Facts">
 *           <li role="none"><a role="menuitem" href="mb-about.html#facts" tabindex="0">History</a></li>
 *           <li role="none"><a role="menuitem" href="mb-about.html#facts" tabindex="-1">Current Statistics</a></li>
 *           <li role="none"><a role="menuitem" href="mb-about.html#facts" tabindex="-1">Awards</a></li>
 *         </ul>
 *       </li>
 *     </ul>
 *   </li>
 * </ul>
 * 
 * @alias module:Menu
 * 
 * @listens KeyboardEvent:Escape
 * @listens open
 * @listens close
 */
class Menu extends (0, _jsMixin2.default)(_Roletype2.default).with(_activeDescendant2.default) {
	constructor(...args) {
		super(...args);

		this.addEventListener("key", this.onClose.bind(this), { key: "Escape" });
		this.addEventListener("open", this.onOpen.bind(this));
		this.addEventListener("close", this.onClose.bind(this));
	}

	onClose(ev) {
		// check if target is a direct child
		if (this.options.indexOf(ev.target) > -1 || this === ev.target) {
			let parent = _tree2.default.getParent(this);

			// check if current menu is a submenu
			if (parent && (parent.role == "menu" || parent.role == "menubar") && parent.options) {

				// find menuitem that controls the state of current menu
				let ancestor = parent.options.find(option => option.controls && option.controls.indexOf(this) > -1);

				if (ancestor) {
					this.hidden = true;
					_focus2.default.focus(ancestor);
				}
			}
		}
	}

	onOpen(ev) {
		if (ev.target === this && !ev.bubbles) {
			this.hidden = false;
			_focus2.default.focus(this.options[0]);
		}
	}
}
exports.default = Menu; /** @module Menu */

},{"./../properties/activeDescendant":25,"./../utils/focus":65,"./../utils/tree":69,"./abstract/Roletype":51,"@vestergaard-company/js-mixin":8}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Menu = require("./Menu");

var _Menu2 = _interopRequireDefault(_Menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** 
 * ### Examples
 * 
 * #### Default (with roving tabindex)
 * 
 * <ul id="menubar1" role="menubar">
 *   <li role="none"><a role="menuitem" tabindex="0">Apple</a></li>
 *   <li role="none"><a role="menuitem" tabindex="-1">Banana</a></li>
 *   <li role="none"><a role="menuitem" tabindex="-1">Pear</a></li>
 * </ul>
 * 
 * #### With activedescendant
 * 
 * <ul id="menubar1" role="menubar" tabindex="0" aria-activedescendant="item1">
 *   <li id="item1" role="menuitem">Apple</a></li>
 *   <li id="item2" role="menuitem">Banana</a></li>
 *   <li id="item3" role="menuitem">Pear</a></li>
 * </ul>
 * 
 * @alias module:Menubar
 * @extends Menu
 */
class Menubar extends _Menu2.default {}
exports.default = Menubar; /** @module Menubar */

},{"./Menu":34}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsMixin = require("@vestergaard-company/js-mixin");

var _jsMixin2 = _interopRequireDefault(_jsMixin);

var _Roletype = require("./abstract/Roletype");

var _Roletype2 = _interopRequireDefault(_Roletype);

var _expanded = require("./../properties/expanded");

var _expanded2 = _interopRequireDefault(_expanded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** 
 * 
 * ### Keyboard navigation
 * 
 * | Key    |Action |
 * | ------ | ----- |
 * | Enter  | Opens the submenu
 * | Space  | Opens the submenu
 * | &darr; | Opens the submenu
 * 
 * ### Examples
 * 
 * <div role="menuitem" tabindex="0">Apple</div>
 * 
 * ```
 * <div role="menuitem" tabindex="0">Apple</div>
 * ```
 * 
 * #### With popup
 * 
 * <ul role="menu">
 *   <li role="none">
 *     <div tabindex="0" role="menuitem" aria-haspopup="true" aria-expanded="false" aria-controls="submenu">Apple</div>
 *     <ul role="menu" id="submenu" aria-label="Fruits" aria-hidden="false">
 *       <li role="none"><div tabindex="0" role="menuitem">Banana</div></li>
 *     </ul>
 *   </li>
 * </ul>
 * 
 * ```
 * <ul role="menu">
 *   <li role="none">
 *     <div tabindex="0" role="menuitem" aria-haspopup="true" aria-expanded="false" aria-controls="submenu">Apple</div>
 *     <ul role="menu" id="submenu" aria-label="Fruits" aria-hidden="false">
 *       <li role="none"><div tabindex="0" role="menuitem">Banana</div></li>
 *     </ul>
 *   </li>
 * </ul>
 * ```
 * 
 * @mixes expanded
 * @alias module:Menuitem
 * 
 * @listens click
 * @listens KeyboardEvent:Enter
 * @listens KeyboardEvent:ArrowDown
 * @listens KeyboardEvent:Space
 * @listens open
 * @listens close
 */
class Menuitem extends (0, _jsMixin2.default)(_Roletype2.default).with(_expanded2.default) {
    constructor(...args) {
        super(...args);

        if (typeof this.expanded !== "undefined") {
            let onOpen = this.onOpen.bind(this);
            let onClose = this.onClose.bind(this);

            this.addEventListener("click", ev => {
                this.expanded === true ? onClose(ev) : onOpen(ev);
            });
            this.addEventListener("key", onOpen, { key: ["Enter", "ArrowDown", "Space"] });
            this.addEventListener("open", onOpen);
            this.addEventListener("close", onClose);
        }
    }
}
exports.default = Menuitem; /** @module Menuitem */

},{"./../properties/expanded":26,"./abstract/Roletype":51,"@vestergaard-company/js-mixin":8}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Command = require("./abstract/Command.js");

var _Command2 = _interopRequireDefault(_Command);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A checkable input in a group of elements with the same role,
 * only one of which can be checked at a time.
 * 
 * ### Examples
 * 
 * <div role="radio" aria-checked="false" tabindex="0">Apple</div>
 * 
 * ```html
 * <div role="radio" aria-checked="false" tabindex="0">Apple</div>
 * ```
 * 
 * @alias module:Radio
 */
class Radio extends _Command2.default {
	constructor(...args) {
		super(...args);

		this.addEventListener("key", this.onClick.bind(this), { key: "Space" });
		this.addEventListener("click", this.onClick.bind(this));
	}

	/**
  * Updates the radio status trough an event
  * 
  * @param {Event} ev
  * @listens MouseEvent:click
  * @listens Keyboard:space
  */
	onClick(ev) {
		if (this === ev.target) {
			if (ev) ev.preventDefault();
			if (typeof super.onClick == "function") super.onClick(ev);

			if (this.disabled !== true) {
				this.checked = true;
			}
		}
	}

	/**
  * Updates the checked status
  * 
  * @fires Event:change
  * @fires InputEvent:input
  */
	set checked(value) {
		let old = this.checked;

		super.checked = value;

		if (old !== value) {
			this.dispatchEvent(new Event("change", { bubbles: true }));
		}

		this.dispatchEvent(new InputEvent("input"));
	}
	get checked() {
		return super.checked;
	}
} /** @module Radio */

exports.default = Radio;

},{"./abstract/Command.js":46}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Select = require("./abstract/Select.js");

var _Select2 = _interopRequireDefault(_Select);

var _focus = require("./../utils/focus");

var _focus2 = _interopRequireDefault(_focus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * ### Example
 * 
 * #### Basic example
 * 
 * <div role="radiogroup" tabindex="0" aria-activedescendant="radio_1">
 *   <div id="radio_1" role="radio" aria-checked="false">Apple</div>
 *   <div id="radio_2" role="radio" aria-checked="false">Grapefruit</div>
 * </div>
 * 
 * #### Example with tabindex
 * 
 * <div role="radiogroup">
 *   <div id="radio_1" role="radio" tabindex="0" aria-checked="false">Apple</div>
 *   <div id="radio_2" role="radio" tabindex="-1" aria-checked="false">Grapefruit</div>
 * </div>
 * 
 * @extends Select
 */
class Radiogroup extends _Select2.default {
  onChange(ev) {
    // retrieve option that has been changed
    var changedOption = this.options.find(option => option._node === ev.target);

    if (changedOption.checked === "true") {
      this.options.forEach(radio => {
        if (radio._node !== ev.target && radio.checked === "true") {
          radio.checked = false;
        }
      });
    }
  }
}

exports.default = Radiogroup;

},{"./../utils/focus":65,"./abstract/Select.js":53}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Range = require("./abstract/Range.js");

var _Range2 = _interopRequireDefault(_Range);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	if (offset < 0) {
		offset = 0;
	} else if (offset > trackSize) {
		offset = trackSize;
	}

	// round the value to nearest increment
	return Math.round(offset / pxPerStep) * step + min;
} // var objectPath = require("object-path");


function getTrackSize(track, thumb, orientation) {
	if (orientation == "vertical") {
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
class Slider extends _Range2.default {
	/**
  * @param {*} args 
  */
	constructor(...args) {
		super(...args);

		// register customs
		this._.registerCustomElement("slider.track", this._node.parentNode);

		// set defaults
		if (undefined == this.orientation) this.orientation = "horizontal";
		if (undefined == this.valueMin) {
			/**
    * @default [0]
    */
			this.valueMin = 0;
		}
		if (undefined == this.valueMax) this.valueMax = 100;
		if (undefined == this.valueNow && this.valueMax < this.valueMin) {
			this.valueNow = this.valueMin;
		} else if (undefined == this.valueNow) {
			this.valueNow = this.valueMin + (this.valueMax - this.valueMin) / 2;
		}

		this._unTrackMouseBinded = this._unTrackMouse.bind(this);
		this._unTrackTouchBinded = this._unTrackTouch.bind(this);
		this._onDrag = this.onDrag.bind(this);

		// todo: allow automatically setting valueText with some sugar

		this.addEventListener("touchstart", this._onTouchStart.bind(this));
		this.addEventListener("mousedown", this._onMouseDown.bind(this), { target: this._.slider.track });
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
		if (ev.changedTouches) {
			pos = ev.changedTouches[0][positionKey];
		} else {
			pos = ev[positionKey];
		}
		this.valueNow = calcValueOfTrackPos(pos, this._.slider.track, this._node, this.valueMin, this.valueMax, this._.step, this.orientation);
	}

	get valueNow() {
		return super.valueNow;
	}
	set valueNow(val) {
		if (!this.disabled) {
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

exports.default = Slider;

},{"./abstract/Range.js":50}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.options = undefined;

var _jsMixin = require("@vestergaard-company/js-mixin");

var _jsMixin2 = _interopRequireDefault(_jsMixin);

var _Range = require("./abstract/Range");

var _Range2 = _interopRequireDefault(_Range);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const options = exports.options = {
	selector: "[role='spinbutton']",
	role: "spinbutton"
};

/**
 * A input field with 2 button to increase or decrease the numberical value
 * @extends Range
 *
 * @see {@link https://html.spec.whatwg.org/multipage/input.html#number-state-(type=number)}
 */
class Spinbutton extends _Range2.default {
	constructor(el, options) {
		super(el, options);

		// register custom elements
		/**
  * @name Spinbutton#_
  * @type {Object}
  * @prop {HTMLElement} [spinbutton.up]
  * @prop {HTMLElement} [spinbutton.down]
  */
		this._.registerCustomElement("spinbutton.up");
		this._.registerCustomElement("spinbutton.down");
		this._.registerCustomValue("step", 1);

		// set defaults
		/**
  * @name Spinbutton#valueNow
  * @type {Number}
  * @default [0]
  */
		if (null === this.valueNow) this.valueNow = 0;

		// todo: allow automatically setting valueText with some sugar

		if (this._.spinbutton.down) this._.spinbutton.up.addEventListener("click", this.stepUp.bind(this));
		if (this._.spinbutton.down) this._.spinbutton.down.addEventListener("click", this.stepDown.bind(this));
		this.addKeyListener("up", this.stepUp.bind(this));
		this.addKeyListener("down", this.stepDown.bind(this));
		this.element.value = this.valueNow;
	}

	get valueNow() {
		return super.valueNow;
	}
	set valueNow(val) {
		super.valueNow = val;
		this.element.value = val;
	}
}

exports.default = Spinbutton;

},{"./abstract/Range":50,"@vestergaard-company/js-mixin":8}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Checkbox = require("./Checkbox");

var _Checkbox2 = _interopRequireDefault(_Checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A type of checkbox that represents on/off values, as opposed to checked/unchecked values.
 * @extends Checkbox 
 */
class Switch extends _Checkbox2.default {
	/**
  * #### Example
  * 
  * **Default**
  * 
  * <div role="switch" tabindex="0"></div>
  * 
  * ```html
  * <div role="switch" tabindex="0"></div>
  * ```
  * 
  * **With predefined value**
  * 
  * <div role="switch" aria-checked="true" tabindex="0"></div>
  * 
  * ```html
  * <div role="switch" aria-checked="true" tabindex="0"></div>
  * ```
  * @param {*} args
 */
	constructor(...args) {
		super(...args);
	}
}

exports.default = Switch;

},{"./Checkbox":28}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jsMixin = require("@vestergaard-company/js-mixin");

var _jsMixin2 = _interopRequireDefault(_jsMixin);

var _elements = require("./../utils/elements");

var _elements2 = _interopRequireDefault(_elements);

var _selector = require("./../utils/selector");

var _selector2 = _interopRequireDefault(_selector);

var _roles = require("./../data/roles");

var _roles2 = _interopRequireDefault(_roles);

var _Roletype = require("./abstract/Roletype");

var _Roletype2 = _interopRequireDefault(_Roletype);

var _ariaSelected = require("./../attributes/aria-selected");

var _ariaSelected2 = _interopRequireDefault(_ariaSelected);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Tab extends (0, _jsMixin2.default)(_Roletype2.default).with(_ariaSelected2.default) {
	constructor(...args) {
		super(...args);
	}

	onSelect(ev) {
		// gets the selector for finding it's context element (tablist > tab) 
		var contextSelector = _roles2.default.tab.context.map(str => _selector2.default.getRole(str)).join(", ");
		let tablist = _elements2.default.getParent(this, contextSelector);
		if (!tablist) return false;

		ev.preventDefault();

		let tabs = tablist.element.querySelectorAll(options.selector + "[aria-selected='true']");
		[].forEach.call(tabs, item => {
			let inst = _elements2.default.get(item);
			inst.selected = false;
			inst.controls[0].element.hidden = true;
		});

		if (typeof super.onSelect == "function") super.onSelect(ev);

		this.controls[0].element.hidden = false;
	}
}

exports.default = Tab;

},{"./../attributes/aria-selected":21,"./../data/roles":22,"./../utils/elements":64,"./../utils/selector":68,"./abstract/Roletype":51,"@vestergaard-company/js-mixin":8}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _elements = require("./../utils/elements.js");

var _elements2 = _interopRequireDefault(_elements);

var _Composite = require("./abstract/Composite");

var _Composite2 = _interopRequireDefault(_Composite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Tablist extends _Composite2.default {
	constructor(...args) {
		super(...args);

		this.addKeyListener("left", this.moveToPrev.bind(this));
		this.addKeyListener("right", this.moveToNext.bind(this));
		this.addKeyListener("home", this.moveToStart.bind(this));
		this.addKeyListener("end", this.moveToEnd.bind(this));
	}

	moveToPrev(ev) {
		let prevInstance = _elements2.default.getPrev(_elements2.default.get(ev.target), this, options.owns);
		prevInstance.element.focus();
		ev.preventDefault();
	}
	moveToNext(ev) {
		let nextInstance = _elements2.default.getNext(_elements2.default.get(ev.target), this, options.owns);
		nextInstance.element.focus();
		ev.preventDefault();
	}

	moveToStart(ev) {
		let firstInstance = _elements2.default.getStart(_elements2.default.get(ev.target), this, options.owns);
		firstInstance.element.focus();
		ev.preventDefault();
	}

	moveToEnd(ev) {
		let lastInstance = _elements2.default.getEnd(_elements2.default.get(ev.target), this, options.owns);
		lastInstance.element.focus();
		ev.preventDefault();
	}
}

exports.default = Tablist;

},{"./../utils/elements.js":64,"./abstract/Composite":47}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Section = require("./abstract/Section");

var _Section2 = _interopRequireDefault(_Section);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Tabpanel extends _Section2.default {}

exports.default = Tabpanel;

},{"./abstract/Section":52}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jsMixin = require("@vestergaard-company/js-mixin");

var _jsMixin2 = _interopRequireDefault(_jsMixin);

var _Input = require("./abstract/Input");

var _Input2 = _interopRequireDefault(_Input);

var _Selection = require("./../mixins/Selection");

var _Selection2 = _interopRequireDefault(_Selection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * ### Examples
 *
 * #### Basic example
 *   
 * <div role='textbox' contenteditable></div>
 * 
 * ```html
 * <div role='textbox' contenteditable></div>
 * ```
 * 
 * ---
 * 
 * #### Multiline example
 * 
 * <div role='textbox' contenteditable aria-multiline="true"></div>
 * 
 * ```html
 * <div role='textbox' contenteditable aria-multiline="true"></div>
 * ```
 * 
 * @summary A type of input that allows free-form text as its value.
 * @extends Input
 * @mixes Selection
 * @todo Add options to keep or remove pasted styling
 */
class Textbox extends (0, _jsMixin2.default)(_Input2.default).with(_Selection2.default) {

	/**
  * @param {*} args
  */
	constructor(...args) {
		super(...args);

		this._.registerCustomValue("textbox.minlength");
		this._.registerCustomValue("textbox.maxlength");
		this._.registerCustomValue("textbox.size");

		if (!this.multiline) {
			this.addEventListener("key", this._onEnter.bind(this), { key: "ArrowEnter" });
			this.addEventListener("paste", this._onPaste.bind(this));
		}
	}

	_onEnter(ev) {
		ev.preventDefault();
	}

	_onPaste(ev) {
		ev.preventDefault();
		let str;
		let data = ev.clipboardData.getData("text/plain").replace(/\r?\n|\r/g, "");
		let sel = window.getSelection();

		var c = this._node.childNodes;
		var a = sel.anchorNode;

		if (c && a && Array.prototype.indexOf.call(c, a) > -1) {
			str = [this._node.innerText.slice(0, sel.anchorOffset), data, this._node.innerText.slice(sel.focusOffset)];
			str = str.join("");
		} else {
			str = this._node.innerText + data;
		}

		this._node.innerText = str;
	}

	_onChildListMutation(mutation) {
		if (!this.multiline) {
			Array.prototype.forEach.call(mutation.addedNodes, n => {
				if (n.nodeName !== "#text") {
					var newChild = document.createTextNode(n.innerText);
					n.parentNode.replaceChild(newChild, n);
				}
			});
		}
	}

	/* Native polyfill  */

	// autocomplete
	// dirname
	// list
	// maxlength
	// minlength
	// pattern
	// placeholder
	// readonly
	// required
	// size
	// value
	// list
	// selection api

	// name	string: Returns / Sets the element's name attribute, containing a name that identifies the element when submitting the form.
	// type string: Returns / Sets the element's type attribute, indicating the type of control to display. See type attribute of <input> for possible values.
	// autofocus	boolean: Returns / Sets the element's autofocus attribute, which specifies that a form control should have input focus when the page loads, unless the user overrides it, for example by typing in a different control. Only one form element in a document can have the autofocus attribute. It cannot be applied if the type attribute is set to hidden (that is, you cannot automatically set focus to a hidden control).

	/**
  * Returns / Sets the current value of the textbox.
  * @type {String}
  */
	get value() {
		return this._node.value;
	}
	set value(str) {
		console.log(str);
		this.dispatchEvent(new Event("input", { bubbles: true }));
		this._node.value = str;
	}

	/**
  * Returns / Sets the minmum length of characters
  * @type {Integer}
  */
	get minLength() {
		return this._.textbox.minlength;
	}
	set minLength(num) {
		this._.textbox.minlength = num;
	}

	/**
  * Returns / Sets the maximum length of characters
  * @type {Integer}
  */
	get maxLength() {
		return this._.textbox.maxlength;
	}
	set maxLength(num) {
		this._.textbox.maxlength = num;
	}

	/**
  * Returns / Sets the size of control.
  * @type {Integer}
  */
	get size() {
		return this._.textbox.size;
	}
	set size(val) {
		this._node.style.width = 2.16 + 0.48 * val + "em";
		this._.textbox.size = val;
	}
}

exports.default = Textbox;

},{"./../mixins/Selection":23,"./abstract/Input":48,"@vestergaard-company/js-mixin":8}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Widget = require("./Widget");

var _Widget2 = _interopRequireDefault(_Widget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @extends Widget
 * @abstract
 */
class Command extends _Widget2.default {
    a() {}
}

exports.default = Command;

},{"./Widget":55}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Widget = require("./Widget");

var _Widget2 = _interopRequireDefault(_Widget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @extends Widget
 * @abstract
 */
class Composite extends _Widget2.default {
  b() {}
}

exports.default = Composite;

},{"./Widget":55}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jsMixin = require("@vestergaard-company/js-mixin");

var _jsMixin2 = _interopRequireDefault(_jsMixin);

var _selector = require("./../../utils/selector");

var _selector2 = _interopRequireDefault(_selector);

var _elements = require("./../../utils/elements");

var _elements2 = _interopRequireDefault(_elements);

var _Widget = require("./Widget");

var _Widget2 = _interopRequireDefault(_Widget);

var _Validation = require("./../../mixins/Validation");

var _Validation2 = _interopRequireDefault(_Validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @extends Widget
 * @mixes Validation
 * @abstract
 */
class Input extends (0, _jsMixin2.default)(_Widget2.default).with(_Validation2.default) {
	/**
  * @alias Input:constructor
 	 * @param {Regex} [options.input.pattern] Regex to check against when validating
  */
	constructor(...args) {
		super(...args);

		this._.registerCustomElement("input.pattern");
	}

	/* Polyfill of native properties */

	/**
  * Returns a reference to the parent form element
  * @returns {AccessibleNode} {@link Form}
  */
	get form() {
		return _elements2.default.getParent(this, _selector2.default.getDeep("form"));
	}

	/**
  * Returns the first element pointed by the {@link AccessibleNode#controls} property.
  * The property may be null if no HTML element found in the same tree.
  * @returns {AccessibleNode} {@link Listbox}
  */
	get list() {
		return this.controls.find(ay => ay.element.matches(_selector2.default.get("listbox")));
	}

	// formAction	string: Returns / Sets the element's formaction attribute,containing the URI of a
	// program that processes information submitted by the element. This overrides the action attribute
	// of the parent form.

	// formEncType	string: Returns / Sets the element's formenctype attribute, containing the type of
	// content that is used to submit the form to the server. This overrides the enctype attribute of 
	// the parent form.

	// formMethod	string: Returns / Sets the element's formmethod attribute, containing the HTTP method
	// that the browser uses to submit the form. This overrides the method attribute of the parent form.

	// formNoValidate	boolean: Returns / Sets the element's formnovalidate attribute, indicating that
	// the form is not to be validated when it is submitted. This overrides the novalidate attribute
	// of the parent form.

	// formTarget	string: Returns / Sets the element's formtarget attribute, containing a name or
	// keyword indicating where to display the response that is received after submitting the form.
	// This overrides the target attribute of the parent form.
}

exports.default = Input;

},{"./../../mixins/Validation":24,"./../../utils/elements":64,"./../../utils/selector":68,"./Widget":55,"@vestergaard-company/js-mixin":8}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Section = require("./Section");

var _Section2 = _interopRequireDefault(_Section);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @extends Section
 */
class Landmark extends _Section2.default {}

exports.default = Landmark;

},{"./Section":52}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Widget = require("./Widget");

var _Widget2 = _interopRequireDefault(_Widget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * **(Abstract role) SHOULD NOT USED IN THE DOM** 
 * An input representing a range of values that can be set by the user.
 *
 * @class
 * @extends Widget
 * @return {Range} this
 * @see {@link https://w3c.github.io/aria/aria/aria.html#range}
 */
class Range extends _Widget2.default {
	/**
  * @alias module:Range-const
  * @param {HTMLElement} element 				element to derive information nameFrom
  * @param {Object} [options] 						optional options
 	 * @param {Number|"any"} options.step 	increase/decrease value used
  */
	constructor(...arg) {
		super(...arg);

		/**
    * @name Range#_
   * @type {Object}
   * @prop {Number} [step=1]
    */

		this._.registerCustomValue("step", 1);
	}

	/**
  * Passtrough of an stringified `valueNow`
  * @type {String}
  * @see {@link AccessibleNode#valueNow}
  */
	get value() {
		return this.valueNow.toString();
	}
	set value(val) {
		this.valueNow = val;
	}

	/**
  * Proxy of the `valueNow` value
  * @type {Number}
  * @see {@link AccessibleNode#valueNow}
  */
	get valueAsNumber() {
		return this.valueNow;
	}
	set valueAsNumber(val) {
		this.valueNow = val;
	}

	/**
   * Decrease the value with the amount of 1 step
   * @param  {Event} ev Event when triggered through an elements
   */
	stepDown(ev) {
		if (this.disabled) return;
		if (ev) ev.preventDefault();

		if (this.valueMin === null || this.valueNow > this.valueMin) {
			this.valueNow = this.valueNow - Number(this._.step);
		}
	}

	/**
   * Increase the value with the amount of 1 step
   * @package
   * @param  {Event} ev Event when triggered through an elements
   */
	stepUp(ev) {
		if (this.disabled) return;
		if (ev) ev.preventDefault();

		if (this.valueMax === null || this.valueNow < this.valueMax) {
			this.valueNow = this.valueNow + Number(this._.step);
		}
	}
}

exports.default = Range;

},{"./Widget":55}],51:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _AccessibleNode = require("aomjs/src/AccessibleNode.js");

var _AccessibleNode2 = _interopRequireDefault(_AccessibleNode);

var _AccessibleNodeList = require("aomjs/src/AccessibleNodeList.js");

var _AccessibleNodeList2 = _interopRequireDefault(_AccessibleNodeList);

var _objectPath = require("object-path");

var _objectPath2 = _interopRequireDefault(_objectPath);

var _jsMixin = require("@vestergaard-company/js-mixin");

var _jsMixin2 = _interopRequireDefault(_jsMixin);

var _elements = require("./../../utils/elements");

var _elements2 = _interopRequireDefault(_elements);

var _create = require("./../../utils/create");

var _create2 = _interopRequireDefault(_create);

var _EventTarget = require("./../../utils/EventTarget");

var _EventTarget2 = _interopRequireDefault(_EventTarget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @module Roletype */

/**
 * Register extra elements used for some roles,
 * e.g. the up and down arrows with the spinbutton role
 *
 * Path of importance where the element is received from:
 * 1. new ...(..., {elements: { roleName: { str: instance of HTMLElement }}})
 * 2. [data-roleName-str=id] on the element with the role
 * 3. default value
 *
 * @private
 * @param  {string} path path where the element should be stored
 */
function handleCustomElement(path, value) {
	// only if no element is already set
	if (!_objectPath2.default.has(this, "_." + path)) {
		// check if element has it defined as data attribute
		var id = this._node.getAttribute("data-" + path.split(".").join("-"));
		if (id) var el = document.getElementById(id);
		if (el) {
			_objectPath2.default.set(this, "_." + path, el);
		} else {
			_objectPath2.default.set(this, "_." + path, value);
		}
	}
}

function handleCustomValue(path, value) {
	// only if no element is already set
	if (!_objectPath2.default.has(this, "_." + path)) {
		// check if element has it defined as data attribute
		var dataValue = this._node.getAttribute("data-" + path.split(".").join("-"));
		if (dataValue) {
			_objectPath2.default.set(this, "_." + path, dataValue);
		} else {
			_objectPath2.default.set(this, "_." + path, value);
		}
	}
}

/**
 * @alias module:Roletype
 * @extends AccessibleNode
 * @mixes module:utils/EventTarget
 */
class Roletype extends (0, _jsMixin2.default)(_AccessibleNode2.default).with(_EventTarget2.default) {

	/**
  * @extends AccessibleNode
  */
	constructor(...args) {
		super(...args);

		Object.defineProperty(this, "_", { value: {} });
		this._.registerCustomElement = handleCustomElement.bind(this);
		this._.registerCustomValue = handleCustomValue.bind(this);

		_objectPath2.default.push(this._, "mutations", "tabIndex");

		// this._onAriaDisabledMutation();
	}

	_onAriaDisabledMutation() {
		// console.log(this.disabled, this.tabIndex, this.disabled && this.tabIndex && this.tabIndex >= 0);
		if (this.disabled && this.tabIndex >= 0) {
			this.tabIndex = undefined;
		} else if (!this.disabled && this.tabIndex < 0) {
			this.tabIndex = 0;
		}
	}

	/**
  * Current tabindex of the element
  * @type {Number}
  */
	get tabIndex() {
		if (!this._node.hasAttribute("tabindex")) {
			return;
		}

		return this._node.tabIndex;
	}
	set tabIndex(number) {
		this._node.tabIndex = number;
	}

	get owns() {
		if (this._values.owns) return this._values.owns;

		if (this._node.hasAttribute("aria-owns")) {
			var ids = this._node.getAttribute("aria-owns").split(" ");
			var list = new _AccessibleNodeList2.default();
			ids.forEach(id => {
				var node = document.getElementById(id);
				if (!_elements2.default.has(node)) {
					_create2.default.one(node);
				}

				list.add(_elements2.default.get(node));
			});

			this._values.owns = list;
			return list;
		}

		return null;
	}

	get controls() {
		if (this._values.controls) return this._values.controls;

		if (this._node.hasAttribute("aria-controls")) {
			var ids = this._node.getAttribute("aria-controls").split(" ");
			var list = new _AccessibleNodeList2.default();
			ids.forEach(id => {
				var node = document.getElementById(id);
				if (!_elements2.default.has(node)) {
					_create2.default.one(node);
				}

				list.add(_elements2.default.get(node));
			});

			this._values.controls = list;
			return list;
		}

		return null;
	}
}

exports.default = Roletype;

},{"./../../utils/EventTarget":61,"./../../utils/create":63,"./../../utils/elements":64,"@vestergaard-company/js-mixin":8,"aomjs/src/AccessibleNode.js":1,"aomjs/src/AccessibleNodeList.js":2,"object-path":16}],52:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Structure = require("./Structure");

var _Structure2 = _interopRequireDefault(_Structure);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @extends Structure
 */
class Section extends _Structure2.default {}

exports.default = Section;

},{"./Structure":54}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _focus = require("./../../utils/focus");

var _focus2 = _interopRequireDefault(_focus);

var _boolean = require("./../../type/boolean");

var _boolean2 = _interopRequireDefault(_boolean);

var _elements = require("./../../utils/elements");

var _elements2 = _interopRequireDefault(_elements);

var _Roletype = require("./Roletype");

var _Roletype2 = _interopRequireDefault(_Roletype);

var _jsMixin = require("@vestergaard-company/js-mixin");

var _jsMixin2 = _interopRequireDefault(_jsMixin);

var _selector = require("./../../utils/selector");

var _selector2 = _interopRequireDefault(_selector);

var _owns = require("./../../utils/owns");

var _owns2 = _interopRequireDefault(_owns);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * ### Keyboard Support
 *
 * #### Default
 * 
 * | Key | Function |
 * | --- | -------- |
 * | Down Arrow | Moves focus to the next option <br/> If not multiselectable, it selects the focused option.
 * | Up Arrow   | Moves focus to the previous option  <br/> If not multiselectable, it selects the focused option.
 * | Home       | Moves focus to the first option  <br/> If not multiselectable, it selects the focused option.
 * | End        | Moves focus to the last option  <br/> If not multiselectable, it selects the focused option.
 *
 * #### Multiple selection
 * 
 * | Key | Function |
 * | --- | -------- |
 * | Space	                | Changes the selection state of the focused option.
 * | Shift + Down Arrow     | Moves focus to and selects the next option.
 * | Shift + Up Arrow       | Moves focus to and selects the previous option.
 * | Control + Shift + Home | Selects from the focused option to the beginning of the list.
 * | Control + Shift + End  | Selects from the focused option to the end of the list.
 * | Control + A            | Selects all options in the list. If all options are selected, unselects all options.
 *
 * ### Attributes
 * 
 * * `aria-selected`
 * 	* `true`
 * 		* is the current focussed element
 * 		* equals the value of `aria-activedescendant`
 * * `tabindex`
 * 	* allows usage of the element by keys when in focus
 * * `aria-activedescendant` equals ID of current focussed element
 * 
 * #### Multiple selection
 * 
 * * `aria-selected`
 *  * `true`
 * 		* can be applied to multiple element
 *    * not automatically applied to the focused element
 * 	* `false`
 * * `tabindex`
 * 	* allows usage of the element by keys when in focus
 * 
 * @summary A form widget that allows the user to make selections from a set of choices.
 * @extends Roletype
 */
class Select extends _Roletype2.default {
  constructor(...args) {
    super(...args);

    this.addEventListener("key", this.moveToStart.bind(this), { key: "Home" });
    this.addEventListener("key", this.moveToPrev.bind(this), { key: "ArrowUp" });
    this.addEventListener("key", this.moveToNext.bind(this), { key: "ArrowDown" });
    this.addEventListener("key", this.moveToEnd.bind(this), { key: "End" });

    this.addEventListener("change", this.onChange.bind(this));

    this.options = _owns2.default.getAllAllowedChildren(this);
  }

  moveToPrev(ev) {
    move(this, ev, _focus2.default.prev, this.moved.bind(this));
  }
  moveToNext(ev) {
    move(this, ev, _focus2.default.next, this.moved.bind(this));
  }
  moveToStart(ev) {
    move(this, ev, _focus2.default.start, this.moved.bind(this));
  }
  moveToEnd(ev) {
    move(this, ev, _focus2.default.end, this.moved.bind(this));
  }

  moved() {}

  onChange(ev) {
    // retrieve option that has been changed
    var changedOption = this.options.find(option => option._node === ev.target);

    _focus2.default.focus(changedOption, false, this);
  }
}

function move(ay, ev, func, callback) {
  if (ev) ev.preventDefault();

  let to;

  if (ay.activeDescendant) {
    // retrieve new focus if a specific focus is set
    to = func(ay, ay.activeDescendant);
  } else {
    // fallback element to focus
    to = ay.options[0];
    _focus2.default.focus(to, false, ay);
  }

  callback(to);
}

exports.default = Select;

},{"./../../type/boolean":60,"./../../utils/elements":64,"./../../utils/focus":65,"./../../utils/owns":67,"./../../utils/selector":68,"./Roletype":51,"@vestergaard-company/js-mixin":8}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Roletype = require("./Roletype");

var _Roletype2 = _interopRequireDefault(_Roletype);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @extends Roletype
 */
class Structure extends _Roletype2.default {}

exports.default = Structure;

},{"./Roletype":51}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Roletype = require("./Roletype");

var _Roletype2 = _interopRequireDefault(_Roletype);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @extends Roletype
 */
// let Widget = (superclass) => class extends superclass {}

class Widget extends _Roletype2.default {}

exports.default = Widget;

},{"./Roletype":51}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Roletype = require("./Roletype");

var _Roletype2 = _interopRequireDefault(_Roletype);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @extends Roletype
 */
class Window extends _Roletype2.default {}

exports.default = Window;

},{"./Roletype":51}],57:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Input = require("./abstract/Input");

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @see module:Listbox
 * @alias module:Option
 * @extends Input
 */
class Option extends _Input2.default {

	constructor(...args) {
		super(...args);

		let onClick = this.onClick.bind(this);

		this.addEventListener("click", onClick);
		this.addEventListener("key", onClick, { key: "Enter" });
		this.addEventListener("key", onClick, { key: "Space" });
	}

	/**
  * Updates the radio status trough an event
  * 
  * @param {Event} ev
  * @listens MouseEvent:click
  * @listens MouseEvent:enger
  * @listens Keyboard:space
  */
	onClick(ev) {
		if (ev) ev.preventDefault();
		if (typeof super.onClick == "function") super.onClick(ev);

		if (this === ev.target) {
			this.selected = !this.selected;
		}
	}

	/**
  * Updates the selected state
  * 
  * @fires Event:change
  * @fires InputEvent:input
  */
	set selected(value) {
		let old = this.selected;

		super.selected = value;

		if (old !== value) {
			var e = new Event("change", { bubbles: true });
			e.preventDefault = () => {
				super.selected = old;
				this.defaultPrevented = true;
			};
			this.dispatchEvent(e);
		}

		this.dispatchEvent(new InputEvent("input"));
	}
	get selected() {
		return super.selected;
	}
} /** @module Option */

exports.default = Option;

},{"./abstract/Input":48}],58:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Textbox = require("./Textbox");

var _Textbox2 = _interopRequireDefault(_Textbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @extends Textbox
 */
class Searchbox extends _Textbox2.default {
	/**
  * #### Example
  * 
  * <div role="searchbox" contenteditable></div>
  * 
  * ```html
  * <div role="searchbox" contenteditable></div>
  * ```
  * 
  * @param {*} args 
  */
	constructor(...args) {
		super(...args);
	}
}

exports.default = Searchbox;

},{"./Textbox":45}],59:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.toggle = toggle;
const IS_ACTIVE = exports.IS_ACTIVE = "true",
      IS_NOT_ACTIVE = exports.IS_NOT_ACTIVE = "false";

/**
* Returns the opposite state of the attribute,
* needed when attribute uses an token list
* @return {String} New state
*/
function toggle(state) {
	if (state == IS_ACTIVE) {
		state = IS_NOT_ACTIVE;
	} else {
		state = IS_ACTIVE;
	}
	return state;
}

exports.default = { IS_ACTIVE, IS_NOT_ACTIVE, toggle };

},{}],60:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.get = get;
exports.set = set;
exports.toggle = toggle;
const IS_ACTIVE = exports.IS_ACTIVE = true,
      IS_NOT_ACTIVE = exports.IS_NOT_ACTIVE = false;

/**
 * Returns the value of given attribute as Boolean
 * @param {AccessibleNode} ay 
 * @param {String} attributeName 
 * @return {Boolean} attribute's value
 */
function get(ay, attributeName) {
	var value = ay._.rawAttrs.attributeName || ay.element.getAttribute(attributeName);
	if (value == undefined) return;
	return value == "true" || false;
}

/**
 * Sync the new value to the property
 * @param {AccessibleNode} ay 
 * @param {String} attributeName 
 * @param {String | Boolean} status 
 */
function set(ay, attributeName, status) {
	if (status == undefined) {
		ay.element.removeAttribute(attributeName);
	} else {
		ay.element.setAttribute(attributeName, status);
	}

	return status;
}

/**
* Returns the opposite state of the attribute
* @return {Boolean} New state
*/
function toggle(state) {
	if (state == IS_ACTIVE) {
		state = IS_NOT_ACTIVE;
	} else {
		state = IS_ACTIVE;
	}
	return state;
}

exports.default = { IS_ACTIVE, IS_NOT_ACTIVE, get, set, toggle };

},{}],61:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jsMixin = require("@vestergaard-company/js-mixin");

var _elements = require("./elements");

var _elements2 = _interopRequireDefault(_elements);

var _tree = require("./tree");

var _tree2 = _interopRequireDefault(_tree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let attachedListeners = []; /** @module */

let keyboardListeners = {};

/**
 * Catches DOM events and resends it trough the accessibility tree
 * @private
 * @param {Event} ev 
 */
function catchEvent(ev) {
	return dispatchToAccessibleTree(ev.target, ev, (ay, ev) => ay._listeners.get(ev.type));
}

/**
 * Catches DOM events and resends it trough the accessibility tree
 * @private
 * @param {Event} ev 
 */
function catchKeyEvent(ev) {
	return dispatchToAccessibleTree(ev.target, ev, (ay, ev) => {
		return keyboardListeners[ev.code] ? keyboardListeners[ev.code].get(ay) : undefined;
	});
}

/**
 * Dispatch the given event to the whole tree
 * @private
 * @param {Element} target Targeted element
 * @param {Event} ev
 */
function dispatchToAccessibleTree(target, ev, getListeners) {
	let path = [];

	if (_elements2.default.has(target) /* && keyboardListeners[ev.code]*/) {
			// clone event
			let clonedEvent = {};
			for (let k in ev) clonedEvent[k] = ev[k];
			if (ev[Symbol.toStringTag]) clonedEvent[Symbol.toStringTag] = ev[Symbol.toStringTag];
			clonedEvent.preventDefault = () => {
				ev.preventDefault();
			};

			// get a20y instance
			let targetA20y = _elements2.default.get(target);

			// check accessibility focus, update target if needed
			/** @todo only change target if event is only possible trough element focus */
			if (targetA20y.activeDescendant) targetA20y = targetA20y.activeDescendant;

			// generate path
			let parent = _tree2.default.getParent(targetA20y);
			while (parent._node.parentElement) {
				path.push(parent);
				parent = _tree2.default.getParent(parent);
			}

			// set default values
			clonedEvent.target = targetA20y;
			clonedEvent.path = path;

			// capture phase
			clonedEvent.eventPhase = ev.CAPTURING_PHASE;
			for (let i = path.length - 1; i >= 0; i--) {
				const ay = path[i];
				const listenersOfAy = getListeners(ay, ev);
				if (listenersOfAy) {
					listenersOfAy.forEach(({ listener, options }) => {
						if (options.capture) {
							clonedEvent.currentTarget = ay;
							console.log(clonedEvent, ay);
							listener(clonedEvent);
						}
					});
				}
			}

			// at target
			clonedEvent.eventPhase = ev.AT_TARGET;
			const listenersOfTarget = getListeners(targetA20y, ev);
			if (listenersOfTarget) {
				listenersOfTarget.forEach(({ listener }) => {
					clonedEvent.currentTarget = targetA20y;
					console.log(clonedEvent, targetA20y);
					listener(clonedEvent);
				});
			}

			// bubble phase
			clonedEvent.eventPhase = ev.BUBBLE_PHASE;
			if (ev.bubbles) {
				path.forEach(ay => {
					const listenersOfAy = getListeners(ay, ev);
					if (listenersOfAy) {
						listenersOfAy.forEach(({ listener }) => {
							clonedEvent.currentTarget = ay;
							console.log(clonedEvent, ay);
							listener(clonedEvent);
						});
					}
				});
			}
		}
}

/**
* @name EventTarget
* @alias module:EventTarget
* @mixin
*/
exports.default = (0, _jsMixin.DeclareMixin)(superclass => class extends superclass {

	/**
  * Listen for a event within the accessible tree.
  * @param {String} type A case-sensitive string representing the event type to listen for.
  * @param {Function} listener Receives a notification when an event of the specified type occurs.
  * @param {Object} [options] An options object that specifies characteristics about the event listener.
  * @param {Boolean} [options.capture = false]
  * Indicates that events of this type will be dispatched to the registered listener before being
  * dispatched to any EventTarget beneath it in the accessibility tree.
  * @param {Boolean} [options.once = false]
  * Indicates that the listener should be invoked at most once after being added.
  * If true, the listener would be automatically removed when invoked.
  * @param {Boolean} [options.passive = false]
  * Indicates that the listener will never call preventDefault().
  * If it does, the user agent should ignore it and generate a console warning.
  * @param {String | Array} [options.key]
  */
	addEventListener(type, listener, options = {}) {
		// custom event
		if (type === "key") {
			// if multiple keys given attach each of them separately
			if (Array.isArray(options.key)) {
				return options.key.forEach(key => {
					let clonedOption = Object.assign({}, options);
					clonedOption.key = key;
					this.addEventListener("key", listener, clonedOption);
				});
			}

			// make sure native keypresses are catched
			if (attachedListeners.indexOf(type) == -1) {
				window.addEventListener("keydown", catchKeyEvent, { capture: true });
				attachedListeners.push(type);
			}

			// prepare data structure if needed
			if (!keyboardListeners[options.key]) keyboardListeners[options.key] = new WeakMap();
			if (!keyboardListeners[options.key].has(this)) keyboardListeners[options.key].set(this, []);

			keyboardListeners[options.key].get(this).push({ listener, options });
		} else {
			// make sure native events are captures and rebroadcasted through the accessibility tree
			if (attachedListeners.indexOf(type) == -1) {
				window.addEventListener(type, catchEvent, { capture: true });
				attachedListeners.push(type);
			}

			super.addEventListener(type, listener, options);
		}
	}

	/**
  * Removes previously registered event listeners who have the same
  * combination of event type, the listener function and options
  * @param {String} type
  * @param {Function} listener
  * @param {Object} [options]
  * @param {Boolean} [options.capture]
  * @param {String | Array} [options.key]
  */
	removeEventListener(...args) {
		super.removeEventListener(...args);
	}

	/**
  * Dispatches an Event through the accessiblity tree, invoking the
  * event listeners in the appropriate order.
  * @param {Event} event Event object to be dispatched
  * @return {Boolean}
  */
	dispatchEvent(event) {
		return dispatchToAccessibleTree(this._node, event, (ay, ev) => {
			return ay._listeners.get(ev.type);
		});
	}
});

},{"./elements":64,"./tree":69,"@vestergaard-company/js-mixin":8}],62:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _create = require("./create");

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 
 */
class ValidityState {
	constructor(ay) {
		Object.defineProperty(this, "_ay", {
			value: ay
		});
	}
}

Object.defineProperties(ValidityState.prototype,
/** @lends ValidityState.prototype */
{
	/**
  * Returns true if the user has provided input in the user interface that the 
  * user agent is unable to convert to a value; false otherwise.
  * @type {Boolean}
  */
	badInput: {
		enumerable: true,
		get() {
			if ((_create2.default.instanceOf(this._ay, "spinbutton") || _create2.default.instanceOf(this._ay, "slider")) && this._ay.valueNow.length > 0 && !/^[-+]?(?:\d+|\d*[.,]\d+)$/.test(this._ay.valueNow)) {
				return true;
			}
			return false;
		}
	},

	/**
  * Returns true if the element has a custom error; false otherwise.
  * @type {Boolean}
  */
	customError: {
		enumerable: true,
		get() {
			return !!this._customError;
		}
	},

	/**
  * Returns true if the element’s value doesn’t match the provided pattern; false otherwise.
  * @type {Boolean}
  */
	patternMismatch: {
		enumerable: true,
		get() {
			var value = this._ay._.input ? this._ay._.input.value : this._ay.valueNow;
			if (this._ay._.input.pattern && value.length > 0 && new RegExp(this._ay._.input.pattern).test(value) === false) {
				return true;
			}
			return false;
		}
	},

	/**
  * Returns true if the element’s value is higher than the provided maximum; false otherwise.
  * @type {Boolean}
  */
	rangeOverflow: {
		enumerable: true,
		get() {
			if (this._ay.valueNow && this._ay.valueMax && this._ay.valueNow > this._ay.valueMax) {
				return true;
			}

			return false;
		}
	},

	/**
  * Returns true if the element’s value is lower than the provided minimum; false otherwise.
  * @type {Boolean}
  */
	rangeUnderflow: {
		enumerable: true,
		get() {
			if (this._ay.valueNow && this._ay.valueMin && this._ay.valueNow < this._ay.valueMin) {
				return true;
			}

			return false;
		}
	},

	/**
  * Returns true if the element’s value doesn’t fit the rules given by the step attribute; false otherwise.
  * @type {Boolean}
  */
	stepMismatch: {
		enumerable: true,
		get() {
			if (this._ay._.range && this._ay._.range.step && this._ay.valueNow % this._ay._.range.step !== 0) {
				return true;
			}

			return false;
		}
	},

	/**
  * Returns true if the element’s value is longer than the provided maximum length; false otherwise.
  * @type {Boolean}
  */
	tooLong: {
		enumerable: true,
		get() {
			var value = this._ay._.input ? this._ay._.input.value : this._ay.valueNow;
			if (this._ay.maxlength && value.length > this._ay.maxlength) {
				return false;
			}
			return false;
		}
	},

	/**
  * Returns true if the element’s value, if it is not the empty string, is shorter than the provided minimum length; false otherwise.
  * @type {Boolean}
  */
	tooShort: {
		enumerable: true,
		get() {
			var value = this._ay._.input ? this._ay._.input.value : this._ay.valueNow;
			if (this._ay.minlength && value.length < this._ay.minlength) {
				return false;
			}
			return false;
		}
	},

	/**
  * Returns true if the element’s value is not in the correct syntax; false otherwise.
  * @type {Boolean}
  */
	typeMismatch: {
		enumerable: true,
		get() {
			return false;
		}
	},

	/**
  * Returns true if the element has no value but is a required field; false otherwise.
  * @type {Boolean}
  */
	valueMissing: {
		enumerable: true,
		get() {
			var value = this._ay._.input ? this._ay._.input.value : this._ay.valueNow;
			if (this.required && ((_create2.default.instanceOf(this._ay, "checkbox") || _create2.default.instanceOf(this._ay, "radio") || _create2.default.instanceOf(this._ay, "option")) && !this._ay.checked || _create2.default.instanceOf(this._ay, "select") && !value || (_create2.default.instanceOf(this._ay, "input") || _create2.default.instanceOf(this._ay, "gridcell")) && !value > 0)) {
				return true;
			}

			return false;
		}
	},

	/**
  * Returns true if the element’s value has no validity problems; false otherwise
  * @type {Boolean}
  */
	valid: {
		enumerable: true,
		get() {
			return !(this.badInput || this.customError || this.patternMismatch || this.rangeOverflow || this.rangeUnderflow || this.stepMismatch || this.tooLong || this.tooShort || this.typeMismatch || this.valueMissing);
		}
	}
});

exports.default = ValidityState;

},{"./create":63}],63:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _selector = require("./selector");

var _selector2 = _interopRequireDefault(_selector);

var _elements = require("./elements");

var _elements2 = _interopRequireDefault(_elements);

var _getComputedRole = require("./getComputedRole");

var _getComputedRole2 = _interopRequireDefault(_getComputedRole);

var _Range = require("./../role/abstract/Range");

var _Range2 = _interopRequireDefault(_Range);

var _Roletype = require("./../role/abstract/Roletype");

var _Roletype2 = _interopRequireDefault(_Roletype);

var _Button = require("./../role/Button");

var _Button2 = _interopRequireDefault(_Button);

var _Checkbox = require("./../role/Checkbox");

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Combobox = require("./../role/Combobox");

var _Combobox2 = _interopRequireDefault(_Combobox);

var _Dialog = require("./../role/Dialog");

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Form = require("./../role/Form");

var _Form2 = _interopRequireDefault(_Form);

var _Menu = require("./../role/Menu");

var _Menu2 = _interopRequireDefault(_Menu);

var _Menubar = require("./../role/Menubar");

var _Menubar2 = _interopRequireDefault(_Menubar);

var _Menuitem = require("./../role/Menuitem");

var _Menuitem2 = _interopRequireDefault(_Menuitem);

var _Link = require("./../role/Link");

var _Link2 = _interopRequireDefault(_Link);

var _Listbox = require("./../role/Listbox");

var _Listbox2 = _interopRequireDefault(_Listbox);

var _option = require("./../role/option");

var _option2 = _interopRequireDefault(_option);

var _Radio = require("./../role/Radio");

var _Radio2 = _interopRequireDefault(_Radio);

var _Radiogroup = require("./../role/Radiogroup");

var _Radiogroup2 = _interopRequireDefault(_Radiogroup);

var _searchbox = require("./../role/searchbox");

var _searchbox2 = _interopRequireDefault(_searchbox);

var _Slider = require("./../role/Slider");

var _Slider2 = _interopRequireDefault(_Slider);

var _Spinbutton = require("./../role/Spinbutton");

var _Spinbutton2 = _interopRequireDefault(_Spinbutton);

var _Switch = require("./../role/Switch");

var _Switch2 = _interopRequireDefault(_Switch);

var _Tab = require("./../role/Tab");

var _Tab2 = _interopRequireDefault(_Tab);

var _Tablist = require("./../role/Tablist");

var _Tablist2 = _interopRequireDefault(_Tablist);

var _Tabpanel = require("./../role/Tabpanel");

var _Tabpanel2 = _interopRequireDefault(_Tabpanel);

var _Textbox = require("./../role/Textbox");

var _Textbox2 = _interopRequireDefault(_Textbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var obj = { Button: _Button2.default, Checkbox: _Checkbox2.default, Combobox: _Combobox2.default, Dialog: _Dialog2.default, Form: _Form2.default, Menu: _Menu2.default, Menubar: _Menubar2.default, Menuitem: _Menuitem2.default, Listbox: _Listbox2.default,
	Option: _option2.default, Range: _Range2.default, Roletype: _Roletype2.default, Searchbox: _searchbox2.default, Slider: _Slider2.default, Spinbutton: _Spinbutton2.default,
	Tab: _Tab2.default, Tablist: _Tablist2.default, Tabpanel: _Tabpanel2.default, Textbox: _Textbox2.default, Link: _Link2.default, Switch: _Switch2.default,
	Radiogroup: _Radiogroup2.default, Radio: _Radio2.default
};

function all() {
	for (let key in obj) {
		var nodeList = document.querySelectorAll(_selector2.default.getRole(key.toLowerCase()));
		for (let i = 0; i < nodeList.length; i++) {
			if (!_elements2.default.has(nodeList[i])) {
				_elements2.default.set(nodeList[i], new obj[key](nodeList[i]));
			}
		}
	}
}

function one(el) {
	if (_elements2.default.has(el)) return _elements2.default.get(el);
	let role = (0, _getComputedRole2.default)(el);
	let constructor;

	/** @todo Remove fallback method */
	if (role) {
		constructor = obj[role.slice(0, 1).toUpperCase() + role.slice(1)] || _Roletype2.default;
	} else {
		constructor = _Roletype2.default;
	}

	return _elements2.default.set(el, new constructor(el));
}

function instanceOf(ay, role) {
	return ay instanceof obj[role];
}

exports.default = { all, one, instanceOf };

},{"./../role/Button":27,"./../role/Checkbox":28,"./../role/Combobox":29,"./../role/Dialog":30,"./../role/Form":31,"./../role/Link":32,"./../role/Listbox":33,"./../role/Menu":34,"./../role/Menubar":35,"./../role/Menuitem":36,"./../role/Radio":37,"./../role/Radiogroup":38,"./../role/Slider":39,"./../role/Spinbutton":40,"./../role/Switch":41,"./../role/Tab":42,"./../role/Tablist":43,"./../role/Tabpanel":44,"./../role/Textbox":45,"./../role/abstract/Range":50,"./../role/abstract/Roletype":51,"./../role/option":57,"./../role/searchbox":58,"./elements":64,"./getComputedRole":66,"./selector":68}],64:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getParent = getParent;
exports.getChildren = getChildren;
exports.getPrev = getPrev;
exports.getNext = getNext;
exports.getStart = getStart;
exports.getEnd = getEnd;

var _create = require("./create");

var _create2 = _interopRequireDefault(_create);

var _getComputedRole = require("./getComputedRole");

var _getComputedRole2 = _interopRequireDefault(_getComputedRole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ayInstances = new WeakMap();

// todo: loop through presentational roles
function getParent(ay, selector) {
	let element = ay.element;

	while (element.parentNode) {
		element = element.parentNode;

		if (ay.element.parentNode.matches(selector)) {
			if (ayInstances.has(ay.element.parentNode)) {
				return ayInstances.get(ay.element.parentNode);
			} else {
				return _create2.default.one(ay.element.parentNode);
			}
		}
	}

	return false;
}

/** @todo find only `direct` children */
function getChildren(ay, role) {
	var results = [];
	var owns = Array.from(ay.element.children).concat(ay.owns);

	owns.forEach(child => {
		if (!role || role && (0, _getComputedRole2.default)(child) == role) {
			if (ayInstances.has(child)) {
				results.push(ayInstances.get(child));
			} else {
				results.push(_create2.default.one(child));
			}
		}
	});

	return owns;
}

function getPrev(child, parent, role) {
	if (!parent) return false;

	let children = getChildren(parent, role);
	let indexPrevElement = Array.prototype.indexOf.call(children, child) - 1;
	if (indexPrevElement < 0) return false;

	return children[indexPrevElement];
}

function getNext(child, parent, role) {
	if (!parent) return false;

	let children = getChildren(parent, role);
	let indexNext = Array.prototype.indexOf.call(children, child) + 1;
	if (indexNext >= children.length) return false;

	return children[indexNext];
}

function getStart(child, parent, role) {
	if (!parent) return false;
	let children = getChildren(parent, role);
	return children[0];
}

function getEnd(child, parent, role) {
	if (!parent) return false;
	let children = getChildren(parent, role);
	return children[children.length - 1];
}

exports.default = {
	map: ayInstances,
	get: ayInstances.get.bind(ayInstances),
	set: ayInstances.set.bind(ayInstances),
	has: ayInstances.has.bind(ayInstances),
	getChildren,
	getParent,
	getPrev,
	getNext,
	getStart,
	getEnd
};

},{"./create":63,"./getComputedRole":66}],65:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.start = start;
exports.prev = prev;
exports.next = next;
exports.end = end;
exports.hasFocus = hasFocus;
exports.isFocusable = isFocusable;
exports.focus = focus;
exports.blur = blur;

var _elements = require("./elements");

var _elements2 = _interopRequireDefault(_elements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Scrolls an element into its parent view
 * @param {Element} child Element to show
 */
function scrollIntoView(child) {
    let parent = child.offsetParent;

    // check if parent is an scrollable element
    if (parent && parent.scrollHeight > parent.clientHeight) {
        var scrollBottom = parent.clientHeight + parent.scrollTop;
        var elementBottom = child.offsetTop + child.offsetHeight;

        // scroll element to parents bottom
        if (elementBottom > scrollBottom) {
            parent.scrollTop = elementBottom - parent.clientHeight;

            // scroll element to parents top
        } else if (child.offsetTop < parent.scrollTop) {
            parent.scrollTop = child.offsetTop;
        }
    }
}

////////////////
// Move focus //
////////////////

/**
 * Focus is set to first in the list
 * @param {Roletype} controls 
 */
/** @module Focus */

function start(controls) {
    return focus(controls.options[0], false, controls);
}

function prev(controls, ay) {
    var currentIndex = controls.options.indexOf(ay);

    // is already on first element
    if (currentIndex <= 0) return;

    if (isFocusable(ay)) {
        ay.tabIndex = -1;
    }

    return focus(controls.options[currentIndex - 1], false, controls);
}

function next(controls, ay) {
    var currentIndex = controls.options.indexOf(ay);

    // is alrady on last element
    if (currentIndex >= controls.options.length - 1) return;

    if (isFocusable(ay)) {
        ay.tabIndex = -1;
    }

    return focus(controls.options[currentIndex + 1], false, controls);
}

function end(controls) {
    return focus(controls.options[controls.options - 1], false, controls);
}

//////////////////////////////////////////////////////////////
//                  End of move functions                   //
//////////////////////////////////////////////////////////////


/**
 * Returns true if the object has focus and doesn't has a set activeDescendant
 * or if the element that has focus has a set activeDescendant that points to given object
 * 
 * @param {Roletype} ay 
 */
function hasFocus(ay) {
    // check if current object has native focus
    if (document.activeElement === ay._node && !ay.activeDescendant) return true;

    // check if current focus is set by active descendant
    if (_elements2.default.has(document.activeElement)) {
        return _elements2.default.get(document.activeElement).activeDescendant === ay;
    }

    return false;
}

/**
 * Check if an element can have focus
 * @param {Roletype} ay 
 */
function isFocusable(ay) {
    return ay._node.tabIndex > -1 || ay._node.hasAttribute("tabindex");
}

/**
 * Moves the focus to the element.
 * 
 * Order of used methods to add focus:
 * 
 * 1. Check if element can have focus by itself
 * 2. If `controls` is defined, set focus through that object
 * 3. Check if current element can be defined through aria-activedescendant of current focused element
 * 4. Put focus through adding tabindex
 * 
 * @param {Roletype} ay 
 * @param {Boolean} [preventScroll=false]  prevent scrolling the element into view
 * @param {Roletype} [controls] Custom element that should control focus
 */
function focus(ay, preventScroll = false, controls = null) {
    if (!preventScroll) scrollIntoView(ay._node);

    // native focus
    if (isFocusable(ay)) {
        // focus is already set, no need to continue
        if (document.activeElement == ay._node) return;

        ay.tabIndex = 0;
        ay._node.focus();
        return true;
    } else if (controls) {
        // focus control element if not already in focus
        if (!hasFocus(controls)) controls._node.focus();

        // remove focus class of previous option
        if (controls.activeDescendant) {
            controls.activeDescendant._node.classList.remove("ay-focus");
            controls.activeDescendant = ay;
            ay._node.classList.add("ay-focus");
        }

        return true;
    } else if (ay._node.id) {
        // focus is already set, no need to continue
        if (hasFocus(ay)) return;

        if (_elements2.default.has(document.activeElement)) {
            var managesFocus = _elements2.default.get(document.activeElement);

            // remove focus class of previous option
            if (managesFocus.activeDescendant) {
                managesFocus.activeDescendant._node.classList.remove("ay-focus");
                managesFocus.activeDescendant = ay;
                // add fake focus
                ay._node.classList.add("ay-focus");
            }

            return true;
        }
    }

    // ay.tabIndex = 0;
    // ay._node.focus();
}

/**
 * Removes the focus of the element.
 * @param {Roletype} ay 
 * @param {Roletype} [controls] Custom element that should control focus
 */
function blur(ay, controls) {
    // Has native focus
    if (document.activeElement === ay._node) {
        ay._node.blur();

        // Can have custom focus
    } else if (ay._node.id) {
        var managesFocus = controls || _elements2.default.get(document.activeElement);
        if (managesFocus.activeDescendant === ay) {
            // remove reference to element
            managesFocus.activeDescendant = null;
            // remove fake focus
            ay._node.classList.remove("ay-focus");
        }
    }

    console.warn("Unable to remove focus from ", ay);
    return false;
}

/** @alias module:Focus */
exports.default = {

    /** Returns a20y instance of currently focused element */
    get activeElement() {
        let ay = _elements2.default.get(document.activeElement);
        if (!ay) return;
        if (ay.activeDescendant) return ay.activeDescendant;

        return ay;
    },
    hasFocus, isFocusable, focus, blur,
    start, prev, next, end
};

},{"./elements":64}],66:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = getComputedRole;

var _roles = require("./../data/roles.js");

var _roles2 = _interopRequireDefault(_roles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Stores info which is used in functions of rolePerHTMLTag,
 * mostly a key as tagName with an array of allowed roles for that tag
 * @type {Object}
 */
var allowedRoles = {
	"aWithHref": ["button", "checkbox", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "switch", "tab", "treeitem", "doc-backlink", "doc-biblioref", "doc-glossref", "doc-noteref"],
	"article": ["feed", "presentation", "none", "document", "application", "main", "region"],
	"aside": ["feed", "note", "presentation", "none", "region", "search", "doc-example", "doc-footnote", "doc-pullquote", "doc-tip"],
	"button": ["checkbox", "link", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "switch", "tab"],
	"dl": ["group", "presentation", "none", "doc-glossary"],
	"embed": ["application", "document", "presentation", "none", "img"],
	"figcaption": ["group", "presentation", "none"],
	"fieldset": ["group", "presentation", "none"],
	"footer": ["group", "none", "presentation", "doc-footnote"],
	"form": ["search", "none", "presentation"],
	"h1Toh6": ["tab", "none", "presentation", "doc-subtitle"],
	"header": ["group", "none", "presentation", "doc-footnote"],
	"hr": ["presentation", "doc-pagebreak"],
	"iframe": ["application", "document", "img"],
	"imgWithEmptyAlt": ["presentation", "none"],
	"inputTypeButton": ["link, menuitem", "menuitemcheckbox", "menuitemradio", "radio", "switch", "option", "tab"],
	"inputTypeImage": ["link", "menuitem", "menuitemcheckbox", "menuitemradio", "radio", "switch"],
	"inputTypeCheckbox": ["button", "menuitemcheckbox", "option", "switch"],
	"li": ["menuitem", "menuitemcheckbox", "menuitemradio", "option", "none", "presentation", "radio", "separator", "tab", "treeitem", "doc-biblioentry", "doc-endnote"],
	"nav": ["doc-index", "doc-pagelist", "doc-toc"],
	"object": ["application", "document", "img"],
	"ol": ["directory", "group", "listbox", "menu", "menubar,none", "presentation ", "radiogroup", "tablist", "toolbar", "tree"],
	"section": ["alert", "alertdialog", "application", "banner", "complementary", "contentinfo", "dialog", "document", "feed", "log", "main", "marquee", "navigation", "none", "presentation", "search", "status", "tabpanel", "doc-abstract", "doc-acknowledgments", "doc-afterword", "doc-appendix", "doc-bibliography", "doc-chapter", "doc-colophon", "doc-conclusion", "doc-credit", "doc-credits", "doc-dedication", "doc-endnotes", "doc-epilogue", "doc-errata", "doc-example", "doc-foreword", "doc-index", "doc-introduction", "doc-notice", "doc-pagelist", "doc-part", "doc-preface", "doc-prologue", "doc-pullquote", "doc-qna", "doc-toc"],
	"svg": ["application", "document", "img"],
	"ul": ["directory", "group", "listbox", "menu", "menubar", "radiogroup", "tablist", "toolbar", "tree", "presentation"]
};

/**
 * Contains a function for each htmlTag where not all roles allowed
 * @type {Object}
 */
/**
 * Follows https://www.w3.org/TR/2017/WD-html-aria-20171013/#docconformance
 */

/**
 * All aria roles
 * @type {Array}
*/
var rolePerHTMLTag = {
	a: (el, role) => {
		if (el.href) {
			return hasAllowedRole("aWithHref", role) ? role : "link";
		} else {
			return role;
		}
	},
	area: (el, role) => {
		if (el.href) return role ? null : "link";
		return role;
	},
	article: (el, role) => hasAllowedRole("article", role) ? role : "article",
	aside: (el, role) => hasAllowedRole("aside", role) ? role : "complementary",
	audio: (el, role) => role == "application" ? "application" : null,
	base: () => null,
	body: () => "document",
	button: (el, role) => {
		if (el.type == "menu") {
			return role == "menuitem" ? "menuitem" : "button";
		}
		return hasAllowedRole("button", role) ? role : "button";
	},
	caption: () => null,
	col: () => null,
	colgroup: () => null,
	datalist: () => "listbox",
	dd: () => "definition",
	details: () => "group",
	dialog: (el, role) => role == "alertdialog" ? "alertdialog" : "dialog",
	dl: (el, role) => hasAllowedRole("dl", role) ? role : "list",
	dt: () => "listitem",
	embed: (el, role) => hasAllowedRole("embed", role) ? role : null,
	figcaption: (el, role) => hasAllowedRole("figcaption", role) ? role : null,
	fieldset: (el, role) => hasAllowedRole("fieldset", role) ? role : null,
	figure: (el, role) => hasAllowedRole("figure", role) ? role : "figure",
	footer: (el, role) => {
		let hasImplicitContentinfoRole = !getParentWithTagName(el, ["ARTICLE", "ASIDE", "MAIN", "NAV", "SECTION"]);
		let hasAllowedRole = hasAllowedRole("footer", role);
		if (hasAllowedRole) {
			return role;
		} else if (hasImplicitContentinfoRole) {
			return "contentinfo";
		} else {
			return null;
		}
	},
	form: (el, role) => hasAllowedRole("form", role) ? role : "form",
	h1: (el, role) => hasAllowedRole("h1Toh6", role) ? role : "heading",
	h2: (el, role) => hasAllowedRole("h1Toh6", role) ? role : "heading",
	h3: (el, role) => hasAllowedRole("h1Toh6", role) ? role : "heading",
	h4: (el, role) => hasAllowedRole("h1Toh6", role) ? role : "heading",
	h5: (el, role) => hasAllowedRole("h1Toh6", role) ? role : "heading",
	h6: (el, role) => hasAllowedRole("h1Toh6", role) ? role : "heading",
	head: () => null,
	header: (el, role) => {
		let hasImplicitBannerRole = !getParentWithTagName(el, ["ARTICLE", "ASIDE", "MAIN", "NAV", "SECTION"]);
		let hasAllowedRole = hasAllowedRole("header", role);
		if (hasAllowedRole) {
			return role;
		} else if (hasImplicitBannerRole) {
			return "banner";
		} else {
			return null;
		}
	},
	hr: (el, role) => hasAllowedRole("hr", role) ? role : "seperator",
	html: () => null,
	iframe: (el, role) => hasAllowedRole("iframe", role) ? role : null,
	img: (el, role) => {
		var hasAllowedEmptyAltRole = hasAllowedRole("imgWithEmptyAlt", role);

		if (el.alt) {
			// any role exept the roles used by empty alt values
			return hasAllowedEmptyAltRole ? "img" : role;
		} else {
			return hasAllowedEmptyAltRole ? role : null;
		}
	},
	input: (el, role) => {
		switch (el.type) {
			case "button":
				return hasAllowedRole("inputTypeButton", role) ? role : "button";
			case "checkbox":
				return hasAllowedRole("inputTypeCheckbox", role) ? role : "checkbox";
			case "image":
				return hasAllowedRole("inputTypeImage", role) ? role : "button";
			case "number":
				return "spinbutton";
			case "radio":
				return role == "menuitemradio" ? "menuitemradio" : "radio";
			case "range":
				return "slider";
			case "search":
				return el.list ? "combobox" : "searchbox";
			case "reset":
			case "submit":
				return "button";
			case "email":
			case "tel":
			case "text":
			case "url":
				return el.list ? "combobox" : "textbox";
			default:
				return null;
		}
	},
	keygen: () => null,
	label: () => null,
	legend: () => null,
	li: (el, role) => {
		let hasImplicitListitemRole = getParentWithTagName(el, ["OL", "UL"]);

		if (hasImplicitListitemRole) {
			return hasAllowedRole("li", role) ? role : "listitem";
		} else {
			return role;
		}
	},
	link: (el, role) => {
		if (el.href) return role ? null : "link";
		return role;
	},
	main: () => "main",
	map: () => null,
	math: () => "math",
	menu: (el, role) => el.type == "context" ? "menu" : role,
	menuitem: (el, role) => {
		switch (el.type) {
			case "command":
				return "menuitem";
			case "checkbox":
				return "menuitemcheckbox";
			case "radio":
				return "menuitemradio";
			default:
				return role;
		}
	},
	meta: () => null,
	meter: () => null,
	nav: (el, role) => hasAllowedRole("nav", role) ? role : "navigation",
	noscript: () => null,
	object: (el, role) => hasAllowedRole("object", role) ? role : null,
	ol: (el, role) => hasAllowedRole("ol", role) ? role : "list",
	optgroup: () => "group",
	option: el => {
		let withinOptionList = ["select", "optgroup", "datalist"].indexOf(el.parentNode) > -1;
		return withinOptionList ? "option" : null;
	},
	output: (el, role) => role ? role : "status",
	param: () => null,
	picture: () => null,
	progress: () => "progressbar",
	script: () => null,
	section: (el, role) => {
		let hasValidRole = hasAllowedRole("section", role);
		if (hasValidRole) return role;

		// only if accessible name
		if (el.title || el.hasAttribute("aria-label") || el.hasAttribute("aria-labelledby")) {
			return "section";
		} else {
			return role;
		}
	},
	select: (el, role) => {
		if (el.multiple && el.size > 1) {
			return "listbox";
		} else if (!el.multiple && el.size <= 1) {
			return role == "menu" ? role : "combobox";
		}

		return role;
	},
	source: () => null,
	style: () => null,
	svg: (el, role) => hasAllowedRole("svg", role) ? role : null,
	summary: () => "button",
	table: (el, role) => role ? role : "table",
	template: () => null,
	textarea: () => "textbox",
	thead: (el, role) => role ? role : "rowgroup",
	tbody: (el, role) => role ? role : "rowgroup",
	tfoot: (el, role) => role ? role : "rowgroup",
	title: () => null,
	td: (el, role) => getParentWithTagName(el, ["TABLE"]) ? "cell" : role,
	th: (el, role) => {
		if (role) return role;
		return getParentWithTagName(el, ["THEAD"]) ? "columnheader" : "rowheader";
	},
	tr: (el, role) => {
		// role=row, may be explicitly declared when child of a table element with role=grid
		return role ? role : "row";
	},
	track: () => null,
	ul: (el, role) => hasAllowedRole("ul", role) ? role : "list",
	video: (el, role) => role == "application" ? "application" : null
};

/**
 * Finds nearest parent with a specifig tagName
 * @param  {HTMLElement} 		el      		child - starting pointer
 * @param  {Array<String>} 	tagName 		Array containg capatilized tagnames
 * @return {HTMLElement}         				Parent that matches one of the tagnames
 */
function getParentWithTagName(el, tagName) {
	while (el.parentNode) {
		if (tagName.indexOf(el.tagName) > -1) return el;
		el = el.parentNode;
	}
}

/**
 * Checks if given role is allowed for given tag
 * @param  {string}  tagName key of allowedRoles
 * @param  {string}  role    current role
 * @return {Boolean}         True if allowed
 */
function hasAllowedRole(tagName, role) {
	return allowedRoles[tagName].indexOf(role) > -1;
}

function getComputedRole(el) {
	var role = el.getAttribute("role");
	// check if given role exist
	if (role) role = _roles2.default[role] ? role : null;

	var tagName = el.tagName.toLowerCase();
	// call possible custom function if tag has any
	if (rolePerHTMLTag[tagName]) return rolePerHTMLTag[tagName](el, role);

	// default behavior a.k.a. set role
	return role;
}

},{"./../data/roles.js":22}],67:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAllAllowedChildren = getAllAllowedChildren;
exports.getChild = getChild;
exports.get = get;

var _selector = require('./selector');

var _selector2 = _interopRequireDefault(_selector);

var _tree = require('./tree');

var _tree2 = _interopRequireDefault(_tree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAllAllowedChildren(ay, roles) {
    if (!roles) roles = _selector2.default.getOwns(ay.role);
    var result = [];

    var children = _tree2.default.getChildren(ay);
    children.filter(child => {
        return roles.forEach(allowedRole => {
            if (allowedRole === child.role) {
                result.push(child);
                return;
            } else if (Array.isArray(allowedRole) && allowedRole[0] === child.role) {
                console.log(child._node, result);
                debugger;
                return;
            }
        });
    });

    return result;
}

function getChild(ay, role) {}

function get(ay, selector) {
    var children = _tree2.default.getChildren(ay);

    return children.find(child => child._node.matches(selector));
}

exports.default = { getAllAllowedChildren, get };

},{"./selector":68,"./tree":69}],68:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getRole = getRole;
exports.get = get;
exports.getDeepRole = getDeepRole;
exports.getDeep = getDeep;
exports.getOwns = getOwns;
exports.getDeepOwns = getDeepOwns;

var _roles = require("./../data/roles");

var _roles2 = _interopRequireDefault(_roles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns an css selector for a given role
 * @param {String} key Role name
 * @returns {String}
 */
function getRole(key) {
	if (!_roles2.default[key]) return;

	return "[role='" + key + "']";
}

/**
 * Returns an array with all css selectors, implicit and explicit, for a given role
 * @param {String} key Role name
 * @returns {?Array};
 */
function getSelectorArray(key) {
	if (!_roles2.default[key]) return;

	let selector = [];
	selector.push(getRole(key));
	if (_roles2.default[key].implicit) selector = selector.concat(_roles2.default[key].implicit);
	return selector;
}

/**
 * Returns an complete css selector with implict elements for a given role
 * @param {String} key Role name
 * @returns {String}
 */
function get(key) {
	return getSelectorArray(key).join(", ");
}

function getDeepRoleArray(key) {
	if (!_roles2.default[key]) return;

	let selector = [];
	selector.push(getRole(key));

	if (_roles2.default[key].sub) {
		_roles2.default[key].sub.forEach(val => selector.push(getRole(val)));
	}

	return selector;
}

function getDeepRole(key) {
	return getDeepRoleArray(key).join(", ");
}

function getDeepSelectorArray(key) {
	if (!_roles2.default[key]) return;

	let selector = [];
	selector = selector.concat(getSelectorArray(key));

	if (_roles2.default[key].sub) {
		_roles2.default[key].sub.forEach(val => selector = selector.concat(getSelectorArray(val)));
	}

	return selector;
}

function getDeep(key) {
	return getDeepSelectorArray(key).join(", ");
}

function getOwns(key) {
	return _roles2.default[key].owns;
}

function getChildren(key) {
	let owns = _roles2.default[key].owns;

	// check if element owns any children
	if (owns) {
		// strip keys, from { any: [a, b], all: [c, d]} to [a, b, c, d]
		// var allowedRoles = [].concat(...Object.values(owns));
		var result = [];

		// get all owned elements of the children
		owns.forEach((role, i) => {
			var childRoles = getChildren(role);
			if (childRoles.length > 0) {
				// add child roles
				result = result.concat(childRoles);

				//remove parent role
				owns.splice(i, 1);
			}
		});

		owns = owns.concat(result);
		return owns;
	} else {
		return [];
	}
}

function getDeepOwns(key) {
	let owns = _roles2.default[key].owns;
	if (!owns) return;

	return getChildren(key);
}

exports.default = { getRole, get, getDeepRole, getDeep, getOwns, getDeepOwns };

},{"./../data/roles":22}],69:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getChildren = getChildren;
exports.getParent = getParent;

var _elements = require('./elements');

var _elements2 = _interopRequireDefault(_elements);

var _create = require('./create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getChildren(ay) {
    let ownsChildren = ay.owns || [];
    let domChildren = Array.from(ay._node.children).map(child => {
        if (!_elements2.default.has(child)) _create2.default.one(child);
        return _elements2.default.get(child);
    });

    // all dom children
    let children = [...ownsChildren, ...domChildren];

    // strip out ignored dom and replace them with there children
    children.forEach((child, i) => {
        if (child.role == "presentation" || child.role == "none") {
            children = children.slice(0, i).concat(getChildren(child), children.slice(i + 1));
        }
    });

    return children;
}

function getParent(ay) {
    let parent;
    if (ay._node.id) {
        let ownedBy = document.querySelector("[aria-owns*='" + ay._node.id + "']");
        if (ownedBy) {
            parent = ownedBy;
            debugger;
        }
    }

    parent = parent || ay._node.parentNode;

    // create a20y instance if not existing
    if (!_elements2.default.has(parent)) _create2.default.one(parent);

    let parentA20Y = _elements2.default.get(parent);
    if (parentA20Y.role === "none" || parentA20Y.role === "presentation") {
        return getParent(parentA20Y);
    }

    return parentA20Y;
}

exports.default = { getChildren, getParent };

},{"./create":63,"./elements":64}]},{},[17])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9hb21qcy9zcmMvQWNjZXNzaWJsZU5vZGUuanMiLCIuLi9hb21qcy9zcmMvQWNjZXNzaWJsZU5vZGVMaXN0LmpzIiwiLi4vYW9tanMvc3JjL0RPTVN0cmluZy5qcyIsIi4uL2FvbWpzL3NyYy9FdmVudFRhcmdldC5qcyIsIi4uL2FvbWpzL3NyYy9ib29sZWFuLmpzIiwiLi4vYW9tanMvc3JjL2RvdWJsZS5qcyIsIi4uL2FvbWpzL3NyYy9sb25nLmpzIiwibm9kZV9tb2R1bGVzL0B2ZXN0ZXJnYWFyZC1jb21wYW55L2pzLW1peGluL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL0B2ZXN0ZXJnYWFyZC1jb21wYW55L2pzLW1peGluL3NyYy9CdWlsZGVyLmpzIiwibm9kZV9tb2R1bGVzL0B2ZXN0ZXJnYWFyZC1jb21wYW55L2pzLW1peGluL3NyYy9EZWNvcmF0b3JzL0JhcmVNaXhpbi5qcyIsIm5vZGVfbW9kdWxlcy9AdmVzdGVyZ2FhcmQtY29tcGFueS9qcy1taXhpbi9zcmMvRGVjb3JhdG9ycy9DYWNoZWQuanMiLCJub2RlX21vZHVsZXMvQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW4vc3JjL0RlY29yYXRvcnMvSGFzSW5zdGFuY2UuanMiLCJub2RlX21vZHVsZXMvQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW4vc3JjL1V0aWxzL3dyYXAuanMiLCJub2RlX21vZHVsZXMvQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW4vc3JjL2RlY2xhcmUuanMiLCJub2RlX21vZHVsZXMvQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW4vc3JjL21peC5qcyIsIm5vZGVfbW9kdWxlcy9vYmplY3QtcGF0aC9pbmRleC5qcyIsInNyYy9hcHAuanMiLCJzcmMvYXR0cmlidXRlcy9hcmlhLWNoZWNrZWQuanMiLCJzcmMvYXR0cmlidXRlcy9hcmlhLWV4cGFuZGVkLmpzIiwic3JjL2F0dHJpYnV0ZXMvYXJpYS1wcmVzc2VkLmpzIiwic3JjL2F0dHJpYnV0ZXMvYXJpYS1zZWxlY3RlZC5qcyIsInNyYy9kYXRhL3JvbGVzLmpzIiwic3JjL21peGlucy9TZWxlY3Rpb24uanMiLCJzcmMvbWl4aW5zL1ZhbGlkYXRpb24uanMiLCJzcmMvcHJvcGVydGllcy9hY3RpdmVEZXNjZW5kYW50LmpzIiwic3JjL3Byb3BlcnRpZXMvZXhwYW5kZWQuanMiLCJzcmMvcm9sZS9CdXR0b24uanMiLCJzcmMvcm9sZS9DaGVja2JveC5qcyIsInNyYy9yb2xlL0NvbWJvYm94LmpzIiwic3JjL3JvbGUvRGlhbG9nLmpzIiwic3JjL3JvbGUvRm9ybS5qcyIsInNyYy9yb2xlL0xpbmsuanMiLCJzcmMvcm9sZS9MaXN0Ym94LmpzIiwic3JjL3JvbGUvTWVudS5qcyIsInNyYy9yb2xlL01lbnViYXIuanMiLCJzcmMvcm9sZS9NZW51aXRlbS5qcyIsInNyYy9yb2xlL1JhZGlvLmpzIiwic3JjL3JvbGUvUmFkaW9ncm91cC5qcyIsInNyYy9yb2xlL1NsaWRlci5qcyIsInNyYy9yb2xlL1NwaW5idXR0b24uanMiLCJzcmMvcm9sZS9Td2l0Y2guanMiLCJzcmMvcm9sZS9UYWIuanMiLCJzcmMvcm9sZS9UYWJsaXN0LmpzIiwic3JjL3JvbGUvVGFicGFuZWwuanMiLCJzcmMvcm9sZS9UZXh0Ym94LmpzIiwic3JjL3JvbGUvYWJzdHJhY3QvQ29tbWFuZC5qcyIsInNyYy9yb2xlL2Fic3RyYWN0L0NvbXBvc2l0ZS5qcyIsInNyYy9yb2xlL2Fic3RyYWN0L0lucHV0LmpzIiwic3JjL3JvbGUvYWJzdHJhY3QvTGFuZG1hcmsuanMiLCJzcmMvcm9sZS9hYnN0cmFjdC9SYW5nZS5qcyIsInNyYy9yb2xlL2Fic3RyYWN0L1JvbGV0eXBlLmpzIiwic3JjL3JvbGUvYWJzdHJhY3QvU2VjdGlvbi5qcyIsInNyYy9yb2xlL2Fic3RyYWN0L1NlbGVjdC5qcyIsInNyYy9yb2xlL2Fic3RyYWN0L1N0cnVjdHVyZS5qcyIsInNyYy9yb2xlL2Fic3RyYWN0L1dpZGdldC5qcyIsInNyYy9yb2xlL2Fic3RyYWN0L1dpbmRvdy5qcyIsInNyYy9yb2xlL29wdGlvbi5qcyIsInNyYy9yb2xlL3NlYXJjaGJveC5qcyIsInNyYy90eXBlL0RPTVN0cmluZy5qcyIsInNyYy90eXBlL2Jvb2xlYW4uanMiLCJzcmMvdXRpbHMvRXZlbnRUYXJnZXQuanMiLCJzcmMvdXRpbHMvVmFsaWRpdHlTdGF0ZS5qcyIsInNyYy91dGlscy9jcmVhdGUuanMiLCJzcmMvdXRpbHMvZWxlbWVudHMuanMiLCJzcmMvdXRpbHMvZm9jdXMuanMiLCJzcmMvdXRpbHMvZ2V0Q29tcHV0ZWRSb2xlLmpzIiwic3JjL3V0aWxzL293bnMuanMiLCJzcmMvdXRpbHMvc2VsZWN0b3IuanMiLCJzcmMvdXRpbHMvdHJlZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztBQUVBO0FBQ0EsSUFBSSxhQUFhLENBQ2hCLE1BRGdCLEVBQ1IsdUJBRFEsRUFDaUIsYUFEakIsRUFDZ0MsbUJBRGhDLEVBQ3FELFdBRHJELEVBQ2tFLGNBRGxFLEVBRWhCLGVBRmdCLEVBRUMsZUFGRCxFQUVrQixjQUZsQixFQUVrQyxlQUZsQyxFQUVtRCxjQUZuRCxFQUVtRSxrQkFGbkUsRUFHaEIsY0FIZ0IsRUFHQSxlQUhBLEVBR2lCLGlCQUhqQixFQUdvQyxtQkFIcEMsRUFHeUQsZUFIekQsRUFJaEIsYUFKZ0IsRUFJRCxjQUpDLEVBSWUsZUFKZixFQUlnQyxhQUpoQyxFQUkrQyxjQUovQyxFQUkrRCxtQkFKL0QsRUFLaEIsWUFMZ0IsRUFLRixpQkFMRSxFQUtpQixZQUxqQixFQUsrQixXQUwvQixFQUs0QyxZQUw1QyxFQUswRCxnQkFMMUQsRUFNaEIsc0JBTmdCLEVBTVEsa0JBTlIsRUFNNEIsV0FONUIsRUFNeUMsa0JBTnpDLEVBTTZELGVBTjdELEVBT2hCLGNBUGdCLEVBT0EsZUFQQSxFQU9pQixl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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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LEdBQWdDLElBQXZELENBQWQ7QUFDQSxZQUFJLE9BQUosRUFBYTtBQUNULHFCQUFTLE9BQVQ7QUFDQTtBQUNIO0FBQ0o7O0FBRUQsYUFBUyxVQUFVLEdBQUcsS0FBSCxDQUFTLFVBQTVCOztBQUVBO0FBQ0EsUUFBSSxDQUFDLG1CQUFTLEdBQVQsQ0FBYSxNQUFiLENBQUwsRUFBMkIsaUJBQU8sR0FBUCxDQUFXLE1BQVg7O0FBRTNCLFFBQUksYUFBYSxtQkFBUyxHQUFULENBQWEsTUFBYixDQUFqQjtBQUNBLFFBQUcsV0FBVyxJQUFYLEtBQW9CLE1BQXBCLElBQThCLFdBQVcsSUFBWCxLQUFvQixjQUFyRCxFQUFxRTtBQUNqRSxlQUFPLFVBQVUsVUFBVixDQUFQO0FBQ0g7O0FBRUQsV0FBTyxVQUFQO0FBQ0g7O2tCQUVjLEVBQUUsV0FBRixFQUFlLFNBQWYsRSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9cmV0dXJuIGV9KSgpIiwiaW1wb3J0IERPTVN0cmluZyBmcm9tIFwiLi9ET01TdHJpbmdcIjtcclxuaW1wb3J0IGJvb2xlYW4gZnJvbSBcIi4vYm9vbGVhblwiO1xyXG5pbXBvcnQgZG91YmxlIGZyb20gXCIuL2RvdWJsZVwiO1xyXG5pbXBvcnQgbG9uZyBmcm9tIFwiLi9sb25nXCI7XHJcbmltcG9ydCBFdmVudFRhcmdldCBmcm9tICcuL0V2ZW50VGFyZ2V0JztcclxuaW1wb3J0IHsgQWNjZXNzaWJsZU5vZGVMaXN0Q29uc3RydWN0b3IgfSBmcm9tICcuLy4uL3NyYy9BY2Nlc3NpYmxlTm9kZUxpc3QuanMnO1xyXG5cclxuLy8gYWxsIGF0dHJpYnV0ZXMgdXNlZCB3aXRoaW4gQU9NXHJcbnZhciBhdHRyaWJ1dGVzID0gW1xyXG5cdFwicm9sZVwiLCBcImFyaWEtYWN0aXZlZGVzY2VuZGFudFwiLCBcImFyaWEtYXRvbWljXCIsIFwiYXJpYS1hdXRvY29tcGxldGVcIiwgXCJhcmlhLWJ1c3lcIiwgXCJhcmlhLWNoZWNrZWRcIixcclxuXHRcImFyaWEtY29sY291bnRcIiwgXCJhcmlhLWNvbGluZGV4XCIsIFwiYXJpYS1jb2xzcGFuXCIsIFwiYXJpYS1jb250cm9sc1wiLCBcImFyaWEtY3VycmVudFwiLCBcImFyaWEtZGVzY3JpYmVkYnlcIixcclxuXHRcImFyaWEtZGV0YWlsc1wiLCBcImFyaWEtZGlzYWJsZWRcIiwgXCJhcmlhLWRyb3BlZmZlY3RcIiwgXCJhcmlhLWVycm9ybWVzc2FnZVwiLCBcImFyaWEtZXhwYW5kZWRcIixcclxuXHRcImFyaWEtZmxvd3RvXCIsIFwiYXJpYS1ncmFiYmVkXCIsIFwiYXJpYS1oYXNwb3B1cFwiLCBcImFyaWEtaGlkZGVuXCIsIFwiYXJpYS1pbnZhbGlkXCIsIFwiYXJpYS1rZXlzaG9ydGN1dHNcIixcclxuXHRcImFyaWEtbGFiZWxcIiwgXCJhcmlhLWxhYmVsbGVkYnlcIiwgXCJhcmlhLWxldmVsXCIsIFwiYXJpYS1saXZlXCIsIFwiYXJpYS1tb2RhbFwiLCBcImFyaWEtbXVsdGlsaW5lXCIsXHJcblx0XCJhcmlhLW11bHRpc2VsZWN0YWJsZVwiLCBcImFyaWEtb3JpZW50YXRpb25cIiwgXCJhcmlhLW93bnNcIiwgXCJhcmlhLXBsYWNlaG9sZGVyXCIsIFwiYXJpYS1wb3NpbnNldFwiLFxyXG5cdFwiYXJpYS1wcmVzc2VkXCIsIFwiYXJpYS1yZWFkb25seVwiLCBcImFyaWEtcmVsZXZhbnRcIiwgXCJhcmlhLXJlcXVpcmVkXCIsIFwiYXJpYS1yb2xlZGVzY3JpcHRpb25cIixcclxuXHRcImFyaWEtcm93Y291bnRcIiwgXCJhcmlhLXJvd2luZGV4XCIsIFwiYXJpYS1yb3dzcGFuXCIsIFwiYXJpYS1zZWxlY3RlZFwiLCBcImFyaWEtc2V0c2l6ZVwiLCBcImFyaWEtc29ydFwiLFxyXG5cdFwiYXJpYS12YWx1ZW1heFwiLCBcImFyaWEtdmFsdWVtaW5cIiwgXCJhcmlhLXZhbHVlbm93XCIsIFwiYXJpYS12YWx1ZXRleHRcIlxyXG5dO1xyXG5cclxuLyoqXHJcbiAqIFxyXG4gKiBAcGFyYW0ge011dGF0aW9ufSBtdXRhdGlvbnMgXHJcbiAqL1xyXG5mdW5jdGlvbiBtdXRhdGlvbk9ic2VydmVyQ2FsbGJhY2sobXV0YXRpb25zKSB7XHJcblx0dmFyIGFvbSA9IHRoaXM7XHJcblxyXG4gICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24gKG11dGF0aW9uKSB7XHJcblx0XHRsZXQgYXR0ck5hbWUgPSBtdXRhdGlvbi5hdHRyaWJ1dGVOYW1lO1xyXG5cdFx0bGV0IG5ld1ZhbHVlID0gYW9tLl9ub2RlLmF0dHJpYnV0ZXNbYXR0ck5hbWVdID8gYW9tLl9ub2RlLmF0dHJpYnV0ZXNbYXR0ck5hbWVdLnZhbHVlIDogdW5kZWZpbmVkO1xyXG5cdFx0bGV0IG9sZFZhbHVlID0gYW9tLl92YWx1ZXNbYXR0ck5hbWVdO1xyXG5cclxuXHRcdGFvbS5fZGVmYXVsdFZhbHVlc1thdHRyTmFtZV0gPSBuZXdWYWx1ZTtcclxuXHRcdC8vIHN0b3JlIHRoZSBkZWZhdWx0IHZhbHVlcyBzZXQgYnkgYW4gYXJpYS0qIGF0dHJpYnV0ZVxyXG5cdFx0aWYgKG5ld1ZhbHVlICE9IG9sZFZhbHVlKSB7XHJcblx0XHRcdGFvbS5fZGVmYXVsdFZhbHVlc1thdHRyTmFtZV0gPSBuZXdWYWx1ZTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBvdmVyd3JpdGUgdGhlIGF0dHJpYnV0ZSBpZiBBT00gaGFzIGFuIGRpZmZlcmVudCBkZWZpbmVkIHZhbHVlXHJcblx0XHRpZiAob2xkVmFsdWUgJiYgbmV3VmFsdWUgIT0gb2xkVmFsdWUpIHtcclxuXHRcdFx0YW9tW2F0dHJOYW1lXSA9IG9sZFZhbHVlO1xyXG5cdFx0fVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBCYXNlZCBvbiB0aGUgQU9NIHNwZWNcclxuICogQGNsYXNzXHJcbiAqL1xyXG5jbGFzcyBBY2Nlc3NpYmxlTm9kZSBleHRlbmRzIEV2ZW50VGFyZ2V0IHtcclxuICAgIGNvbnN0cnVjdG9yKG5vZGUpIHtcclxuICAgICAgICBzdXBlcihub2RlKTtcclxuXHJcbiAgICAgICAgLy8gc3RvcmUgdGhlIG5vZGUgd2hlcmUgdGhlIEFjY2Vzc2libGVOb2RlIGlzIGNvbm5lY3RlZCB3aXRoXHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJfbm9kZVwiLCB7IHZhbHVlOiBub2RlIH0pO1xyXG5cclxuXHRcdC8vIHNldCBhbiBoaWRkZW4gb2JqZWN0IHRvIHN0b3JlIGFsbCB2YWx1ZXMgaW5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJfdmFsdWVzXCIsIHsgdmFsdWU6IHt9fSk7XHJcblx0XHRcclxuXHRcdC8vIHN0b3JlIHZhbHVlcyBvZiBhcmlhLSogYXR0cmlidXRlc1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcIl9kZWZhdWx0VmFsdWVzXCIsIHsgdmFsdWU6IHt9fSk7XHJcblxyXG5cdFx0Ly8gc3RhcnQgdGhlIG11dGF0aW9uIG9ic2VydmVyIGlmIHRoZSBBY2Nlc3NpYmxlTm9kZSBpcyBjb25uZWN0ZWQgdG8gYW4gbm9kZVxyXG5cdFx0aWYobm9kZSkge1xyXG5cdFx0XHR2YXIgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihtdXRhdGlvbk9ic2VydmVyQ2FsbGJhY2suYmluZCh0aGlzKSk7XHJcblx0XHRcdG9ic2VydmVyLm9ic2VydmUodGhpcy5fbm9kZSwgeyBhdHRyaWJ1dGVzOiB0cnVlLCBhdHRyaWJ1dGVPbGRWYWx1ZTogdHJ1ZSB9KTtcclxuXHRcdH1cclxuICAgIH1cclxufVxyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoQWNjZXNzaWJsZU5vZGUucHJvdG90eXBlLFxyXG4gICAgLyoqIEBsZW5kcyBBY2Nlc3NpYmxlTm9kZS5wcm90b3R5cGUgKi9cclxuICAgIHtcclxuXHRcdC8qKiBcclxuXHRcdCogRGVmaW5lcyBhIHR5cGUgaXQgcmVwcmVzZW50cywgZS5nLiBgdGFiYFxyXG5cdFx0KiBcclxuXHRcdCogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNyb2xlc1xyXG5cdFx0KiBAdHlwZSAgez9TdHJpbmd9XHJcblx0XHQqL1xyXG4gICAgICAgIFwicm9sZVwiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIC8vIHdyaXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBzZXQoc3RyKSB7IHJldHVybiBET01TdHJpbmcuc2V0KHRoaXMsIFwicm9sZVwiLCBzdHIpOyB9LFxyXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwicm9sZVwiKTsgfVxyXG4gICAgICAgIH0sXHJcblxyXG5cdFx0LyoqIFxyXG5cdFx0ICogRGVmaW5lcyBhIGh1bWFuLXJlYWRhYmxlLCBhdXRob3ItbG9jYWxpemVkIGRlc2NyaXB0aW9uIGZvciB0aGUgcm9sZVxyXG5cdFx0ICogXHJcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtcm9sZWRlc2NyaXB0aW9uXHJcblx0XHQgKiBAdHlwZSB7P1N0cmluZ31cclxuXHRcdCAqL1xyXG4gICAgICAgIFwicm9sZURlc2NyaXB0aW9uXCI6IHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgc2V0KHN0cikgeyByZXR1cm4gRE9NU3RyaW5nLnNldCh0aGlzLCBcImFyaWEtcm9sZURlc2NyaXB0aW9uXCIsIHN0cik7IH0sXHJcbiAgICAgICAgICAgIGdldCgpIHsgcmV0dXJuIERPTVN0cmluZy5nZXQodGhpcywgXCJhcmlhLXJvbGVEZXNjcmlwdGlvblwiKTsgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKiogQUNDRVNTSUJMRSBMQUJFTCBBTkQgREVTQ1JJUFRJT04gKioqKioqKioqKioqKioqKioqKiAqL1xyXG5cclxuXHRcdC8qKiBcclxuXHRcdCogRGVmaW5lcyBhIHN0cmluZyB2YWx1ZSB0aGF0IGxhYmVscyB0aGUgY3VycmVudCBlbGVtZW50LlxyXG5cdFx0KiBcclxuXHRcdCogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWxhYmVsXHJcblx0XHQqIEB0eXBlIHs/U3RyaW5nfSBcclxuXHRcdCovXHJcbiAgICAgICAgXCJsYWJlbFwiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNldChzdHIpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJhcmlhLWxhYmVsXCIsIHN0cik7IH0sXHJcbiAgICAgICAgICAgIGdldCgpIHsgcmV0dXJuIERPTVN0cmluZy5nZXQodGhpcywgXCJhcmlhLWxhYmVsXCIpOyB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyogKioqKioqKioqKioqKioqIEVORCBPRiBBQ0NFU1NJQkxFIExBQkVMIEFORCBERVNDUklQVElPTiAqKioqKioqKioqKioqKiogKi9cclxuXHJcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqIEdMT0JBTCBTVEFURVMgQU5EIFBST1BFUlRJRVMgKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG5cdFx0LyoqIFxyXG5cdFx0ICogSW5kaWNhdGVzIHRoZSBlbGVtZW50IHRoYXQgcmVwcmVzZW50cyB0aGUgY3VycmVudCBpdGVtIHdpdGhpbiBhIGNvbnRhaW5lciBvciBzZXQgb2YgcmVsYXRlZCBlbGVtZW50cy5cclxuXHRcdCAqIFxyXG5cdFx0ICogfCBWYWx1ZSB8IERlc2NyaXB0aW9uIHxcclxuXHRcdCAqIHwgLS0tIHwgLS0tIHxcclxuXHRcdCAqIHwgcGFnZSB8IHVzZWQgdG8gaW5kaWNhdGUgYSBsaW5rIHdpdGhpbiBhIHNldCBvZiBwYWdpbmF0aW9uIGxpbmtzLCB3aGVyZSB0aGUgbGluayBpcyB2aXN1YWxseSBzdHlsZWQgdG8gcmVwcmVzZW50IHRoZSBjdXJyZW50bHktZGlzcGxheWVkIHBhZ2UuXHJcblx0XHQgKiB8IHN0ZXAgfCB1c2VkIHRvIGluZGljYXRlIGEgbGluayB3aXRoaW4gYSBzdGVwIGluZGljYXRvciBmb3IgYSBzdGVwLWJhc2VkIHByb2Nlc3MsIHdoZXJlIHRoZSBsaW5rIGlzIHZpc3VhbGx5IHN0eWxlZCB0byByZXByZXNlbnQgdGhlIGN1cnJlbnQgc3RlcC5cclxuXHRcdCAqIHwgbG9jYXRpb24gfCB1c2VkIHRvIGluZGljYXRlIHRoZSBpbWFnZSB0aGF0IGlzIHZpc3VhbGx5IGhpZ2hsaWdodGVkIGFzIHRoZSBjdXJyZW50IGNvbXBvbmVudCBvZiBhIGZsb3cgY2hhcnQuXHJcblx0XHQgKiB8IGRhdGUgfCB1c2VkIHRvIGluZGljYXRlIHRoZSBjdXJyZW50IGRhdGUgd2l0aGluIGEgY2FsZW5kYXIuXHJcblx0XHQgKiB8IHRpbWUgfCB1c2VkIHRvIGluZGljYXRlIHRoZSBjdXJyZW50IHRpbWUgd2l0aGluIGEgdGltZXRhYmxlLlxyXG5cdFx0ICogfCB0cnVlIHwgUmVwcmVzZW50cyB0aGUgY3VycmVudCBpdGVtIHdpdGhpbiBhIHNldC5cclxuXHRcdCAqIHwgZmFsc2UgfCBEb2VzIG5vdCByZXByZXNlbnQgdGhlIGN1cnJlbnQgaXRlbSB3aXRoaW4gYSBzZXQuXHJcblx0XHQgKiBcclxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1jdXJyZW50XHJcblx0XHQgKiBAdHlwZSB7P1N0cmluZ31cclxuXHRcdCAqL1xyXG4gICAgICAgIFwiY3VycmVudFwiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNldChzdHIpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJhcmlhLWN1cnJlbnRcIiwgc3RyKTsgfSxcclxuICAgICAgICAgICAgZ2V0KCkgeyByZXR1cm4gRE9NU3RyaW5nLmdldCh0aGlzLCBcImFyaWEtY3VycmVudFwiKTsgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqIEVORCBPRiBHTE9CQUwgU1RBVEVTIEFORCBQUk9QRVJUSUVTICoqKioqKioqKioqKioqKioqICovXHJcblxyXG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqIFdJREdFVCBQUk9QRVJUSUVTICoqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbmRpY2F0ZXMgd2hldGhlciBpbnB1dHRpbmcgdGV4dCBjb3VsZCB0cmlnZ2VyIGRpc3BsYXkgb2Ygb25lIG9yIG1vcmUgcHJlZGljdGlvbnMgb2YgdGhlIHVzZXInc1xyXG5cdFx0ICogaW50ZW5kZWQgdmFsdWUgZm9yIGFuIGlucHV0IGFuZCBzcGVjaWZpZXMgaG93IHByZWRpY3Rpb25zIHdvdWxkIGJlIHByZXNlbnRlZCBpZiB0aGV5IGFyZSBtYWRlLlxyXG5cdFx0ICogXHJcblx0XHQgKiBUaGUgYmVoYXZpb3IgZHVyaW5nIGlucHV0IGlzIGRlcGVuZHMgb24gdGhlIHByb3ZpZGVkIHZhbHVlLCBpdCBmb2xsb3dzIGJlbmVhdGggdGFibGUuXHJcblx0XHQgKiBcclxuXHRcdCAqIHwgVmFsdWUgIHwgXHREZXNjcmlwdGlvbiB8XHJcblx0XHQgKiB8IC0tLS0tLSB8IC0tLSB8XHJcblx0XHQgKiB8IGlubGluZSB8IFRleHQgc3VnZ2VzdGluZyBtYXkgYmUgZHluYW1pY2FsbHkgaW5zZXJ0ZWQgYWZ0ZXIgdGhlIGNhcmV0LlxyXG5cdFx0ICogfCBsaXN0ICAgfCBBIGNvbGxlY3Rpb24gb2YgdmFsdWVzIHRoYXQgY291bGQgY29tcGxldGUgdGhlIHByb3ZpZGVkIGlucHV0IGlzIGRpc3BsYXllZC5cclxuXHRcdCAqIHwgYm90aCAgIHwgSW1wbGVtZW50cyBgaW5saW5lYCBhbmQgYGxpc3RgXHJcblx0XHQgKiB8IG5vbmUgICB8IE5vIHByZWRpY3Rpb24gaXMgc2hvd25cclxuXHRcdCAqIFxyXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWF1dG9jb21wbGV0ZVxyXG5cdFx0ICogQHR5cGUgez9TdHJpbmd9XHJcblx0XHQgKi9cclxuICAgICAgICBcImF1dG9jb21wbGV0ZVwiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNldChzdHIpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJhcmlhLWF1dG9jb21wbGV0ZVwiLCBzdHIpOyB9LFxyXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1hdXRvY29tcGxldGVcIik7IH1cclxuICAgICAgICB9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUmV0dXJucy9zZXRzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBlbGVtZW50IHdobyBpcyBleHBvc2VkIHRvIGFuIGFjY2Vzc2liaWxpdHkgQVBJLlxyXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjZGlzYWJsZWR9XHJcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtaGlkZGVuXHJcblx0XHQgKiBAdHlwZSB7P0Jvb2xlYW59XHJcblx0XHQgKi9cclxuICAgICAgICBcImhpZGRlblwiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNldChzdHIpIHsgcmV0dXJuIGJvb2xlYW4uc2V0KHRoaXMsIFwiYXJpYS1oaWRkZW5cIiwgc3RyKTsgfSxcclxuICAgICAgICAgICAgZ2V0KCkgeyByZXR1cm4gYm9vbGVhbi5nZXQodGhpcywgXCJhcmlhLWhpZGRlblwiKTsgfVxyXG4gICAgICAgIH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbmRpY2F0ZXMga2V5Ym9hcmQgc2hvcnRjdXRzIHRoYXQgYW4gYXV0aG9yIGhhcyBpbXBsZW1lbnRlZCB0byBhY3RpdmF0ZSBvclxyXG5cdFx0ICogZ2l2ZSBmb2N1cyB0byBhbiBlbGVtZW50LlxyXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWtleXNob3J0Y3V0c1xyXG5cdFx0ICogQHR5cGUgez9TdHJpbmd9XHJcblx0XHQgKi9cclxuICAgICAgICBcImtleVNob3J0Y3V0c1wiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNldChzdHIpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJhcmlhLWtleVNob3J0Y3V0c1wiLCBzdHIpOyB9LFxyXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1rZXlTaG9ydGN1dHNcIik7IH1cclxuICAgICAgICB9LFxyXG5cclxuXHRcdC8qKiBcclxuXHRcdCAqIEluZGljYXRlcyB3aGV0aGVyIGFuIGVsZW1lbnQgaXMgbW9kYWwgd2hlbiBkaXNwbGF5ZWQuXHJcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtbW9kYWxcclxuXHRcdCAqIEB0eXBlIHs/Qm9vbGVhbn1cclxuXHRcdCAqL1xyXG4gICAgICAgIFwibW9kYWxcIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBzZXQoc3RyKSB7IHJldHVybiBib29sZWFuLnNldCh0aGlzLCBcImFyaWEtbW9kYWxcIiwgc3RyKTsgfSxcclxuICAgICAgICAgICAgZ2V0KCkgeyByZXR1cm4gYm9vbGVhbi5nZXQodGhpcywgXCJhcmlhLW1vZGFsXCIpOyB9XHJcbiAgICAgICAgfSxcclxuXHJcblx0XHQvKiogXHJcblx0XHQgKiBJbmRpY2F0ZXMgd2hldGhlciBhIHRleHQgYm94IGFjY2VwdHMgbXVsdGlwbGUgbGluZXMgb2YgaW5wdXQgb3Igb25seSBhIHNpbmdsZSBsaW5lLlxyXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLW11bHRpbGluZVxyXG5cdFx0ICogQHR5cGUgez9Cb29sZWFufVxyXG5cdFx0ICovXHJcbiAgICAgICAgXCJtdWx0aWxpbmVcIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBzZXQoc3RyKSB7IHJldHVybiBib29sZWFuLnNldCh0aGlzLCBcImFyaWEtbXVsdGlsaW5lXCIsIHN0cik7IH0sXHJcbiAgICAgICAgICAgIGdldCgpIHsgcmV0dXJuIGJvb2xlYW4uZ2V0KHRoaXMsIFwiYXJpYS1tdWx0aWxpbmVcIik7IH1cclxuICAgICAgICB9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSW5kaWNhdGVzIHRoYXQgdGhlIHVzZXIgbWF5IHNlbGVjdCBtb3JlIHRoYW4gb25lIGl0ZW0gZnJvbSB0aGUgY3VycmVudCBzZWxlY3RhYmxlIGRlc2NlbmRhbnRzLlxyXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLW11bHRpc2VsZWN0YWJsZVxyXG5cdFx0ICogQHR5cGUgez9Cb29sZWFufVxyXG5cdFx0ICovXHJcbiAgICAgICAgXCJtdWx0aXNlbGVjdGFibGVcIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBzZXQoc3RyKSB7IHJldHVybiBib29sZWFuLnNldCh0aGlzLCBcImFyaWEtbXVsdGlzZWxlY3RhYmxlXCIsIHN0cik7IH0sXHJcbiAgICAgICAgICAgIGdldCgpIHsgcmV0dXJuIGJvb2xlYW4uZ2V0KHRoaXMsIFwiYXJpYS1tdWx0aXNlbGVjdGFibGVcIik7IH1cclxuICAgICAgICB9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGVsZW1lbnQncyBvcmllbnRhdGlvbiBpcyBgaG9yaXpvbnRhbGAsIGB2ZXJ0aWNhbGAsIG9yIGBudWxsYC5cclxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1vcmllbnRhdGlvblxyXG5cdFx0ICogQHR5cGUgez9TdHJpbmd9XHJcblx0XHQgKi9cclxuICAgICAgICBcIm9yaWVudGF0aW9uXCI6IHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgc2V0KHN0cikgeyByZXR1cm4gRE9NU3RyaW5nLnNldCh0aGlzLCBcImFyaWEtb3JpZW50YXRpb25cIiwgc3RyKTsgfSxcclxuICAgICAgICAgICAgZ2V0KCkgeyByZXR1cm4gRE9NU3RyaW5nLmdldCh0aGlzLCBcImFyaWEtb3JpZW50YXRpb25cIik7IH1cclxuICAgICAgICB9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSW5kaWNhdGVzIHRoYXQgdGhlIHVzZXIgbWF5IHNlbGVjdCBtb3JlIHRoYW4gb25lIGl0ZW0gZnJvbSB0aGUgY3VycmVudCBzZWxlY3RhYmxlIGRlc2NlbmRhbnRzLlxyXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXJlYWRvbmx5XHJcblx0XHQgKiBAdHlwZSB7P0Jvb2xlYW59XHJcblx0XHQgKi9cclxuICAgICAgICBcInJlYWRPbmx5XCI6IHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgc2V0KHN0cikgeyByZXR1cm4gYm9vbGVhbi5zZXQodGhpcywgXCJhcmlhLXJlYWRPbmx5XCIsIHN0cik7IH0sXHJcbiAgICAgICAgICAgIGdldCgpIHsgcmV0dXJuIGJvb2xlYW4uZ2V0KHRoaXMsIFwiYXJpYS1yZWFkT25seVwiKTsgfVxyXG4gICAgICAgIH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbmRpY2F0ZXMgdGhhdCB1c2VyIGlucHV0IGlzIHJlcXVpcmVkIG9uIHRoZSBlbGVtZW50IGJlZm9yZSBhIGZvcm0gbWF5IGJlIHN1Ym1pdHRlZC5cclxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1yZXF1aXJlZFxyXG5cdFx0ICogQHR5cGUgez9Cb29sZWFufVxyXG5cdFx0ICovXHJcbiAgICAgICAgXCJyZXF1aXJlZFwiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNldChzdHIpIHsgcmV0dXJuIGJvb2xlYW4uc2V0KHRoaXMsIFwiYXJpYS1yZXF1aXJlZFwiLCBzdHIpOyB9LFxyXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiBib29sZWFuLmdldCh0aGlzLCBcImFyaWEtcmVxdWlyZWRcIik7IH1cclxuICAgICAgICB9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSW5kaWNhdGVzIHRoYXQgdXNlciBpbnB1dCBpcyByZXF1aXJlZCBvbiB0aGUgZWxlbWVudCBiZWZvcmUgYSBmb3JtIG1heSBiZSBzdWJtaXR0ZWQuXHJcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtc2VsZWN0ZWRcclxuXHRcdCAqIEB0eXBlIHs/Qm9vbGVhbn1cclxuXHRcdCAqL1xyXG4gICAgICAgIFwic2VsZWN0ZWRcIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBzZXQoc3RyKSB7IHJldHVybiBib29sZWFuLnNldCh0aGlzLCBcImFyaWEtc2VsZWN0ZWRcIiwgc3RyKTsgfSxcclxuICAgICAgICAgICAgZ2V0KCkgeyByZXR1cm4gYm9vbGVhbi5nZXQodGhpcywgXCJhcmlhLXNlbGVjdGVkXCIpOyB9XHJcbiAgICAgICAgfSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluZGljYXRlcyBpZiBpdGVtcyBpbiBhIHRhYmxlIG9yIGdyaWQgYXJlIHNvcnRlZCBpbiBhc2NlbmRpbmcgb3IgZGVzY2VuZGluZyBvcmRlci4gIFxyXG5cdFx0ICogUG9zc2libGUgdmFsdWVzIGFyZSBgYWNlbmRpbmdgLCBgZGVzY2VuZGluZ2AsIGBub25lYCwgYG90aGVyYCBvciBgbnVsbGAuXHJcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtc29ydFxyXG5cdFx0ICogQHR5cGUgez9Cb29sZWFufVxyXG5cdFx0ICovXHJcbiAgICAgICAgXCJzb3J0XCI6IHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgc2V0KHN0cikgeyByZXR1cm4gRE9NU3RyaW5nLnNldCh0aGlzLCBcImFyaWEtc29ydFwiLCBzdHIpOyB9LFxyXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1zb3J0XCIpOyB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKiogRU5EIE9GIFdJREdFVCBQUk9QRVJUSUVTICoqKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG5cclxuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiBXSURHRVQgU1RBVEVTICoqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluZGljYXRlcyB0aGUgY3VycmVudCBcImNoZWNrZWRcIiBzdGF0ZSBvZiBhIHtAbGluayBXaWRnZXR9LCBhbW9uZyB7QGxpbmsgUmFkaW99IGFuZCB7QGxpbmsgQ2hlY2tib3h9XHJcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNwcmVzc2VkfVxyXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjc2VsZWN0ZWR9XHJcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtcHJlc3NlZFxyXG5cdFx0ICogQHR5cGUgez9TdHJpbmd9XHJcblx0XHQgKi9cclxuICAgICAgICBcImNoZWNrZWRcIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBzZXQoc3RyKSB7IHJldHVybiBET01TdHJpbmcuc2V0KHRoaXMsIFwiYXJpYS1jaGVja2VkXCIsIHN0cik7IH0sXHJcbiAgICAgICAgICAgIGdldCgpIHsgcmV0dXJuIERPTVN0cmluZy5nZXQodGhpcywgXCJhcmlhLWNoZWNrZWRcIik7IH1cclxuICAgICAgICB9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGVsZW1lbnQsIG9yIGFub3RoZXIgZ3JvdXBpbmcgZWxlbWVudCBpdCBjb250cm9scywgXHJcblx0XHQgKiBpcyBjdXJyZW50bHkgZXhwYW5kZWQgb3IgY29sbGFwc2VkLlxyXG5cdFx0ICogXHJcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtZXhwYW5kZWRcclxuXHRcdCAqIEB0eXBlIHs/Qm9vbGVhbn1cclxuXHRcdCAqL1xyXG4gICAgICAgIFwiZXhwYW5kZWRcIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBzZXQoc3RyKSB7IHJldHVybiBib29sZWFuLnNldCh0aGlzLCBcImFyaWEtZXhwYW5kZWRcIiwgc3RyKTsgfSxcclxuICAgICAgICAgICAgZ2V0KCkgeyByZXR1cm4gYm9vbGVhbi5nZXQodGhpcywgXCJhcmlhLWV4cGFuZGVkXCIpOyB9XHJcbiAgICAgICAgfSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluZGljYXRlcyB0aGF0IHRoZSBlbGVtZW50IGlzIHBlcmNlaXZhYmxlIGJ1dCBkaXNhYmxlZCwgc28gaXQgaXMgbm90IGVkaXRhYmxlIG9yIG90aGVyd2lzZSBvcGVyYWJsZS5cclxuXHRcdCAqIFxyXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjaGlkZGVufVxyXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjcmVhZG9ubHl9XHJcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtZGlzYWJsZWRcclxuXHRcdCAqIEB0eXBlIHs/Qm9vbGVhbn1cclxuXHRcdCAqL1xyXG4gICAgICAgIFwiZGlzYWJsZWRcIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBzZXQoc3RyKSB7IHJldHVybiBib29sZWFuLnNldCh0aGlzLCBcImFyaWEtZGlzYWJsZWRcIiwgc3RyKTsgfSxcclxuICAgICAgICAgICAgZ2V0KCkgeyByZXR1cm4gYm9vbGVhbi5nZXQodGhpcywgXCJhcmlhLWRpc2FibGVkXCIpOyB9XHJcbiAgICAgICAgfSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluZGljYXRlcyB0aGUgZW50ZXJlZCB2YWx1ZSBkb2VzIG5vdCBjb25mb3JtIHRvIHRoZSBmb3JtYXQgZXhwZWN0ZWQgYnkgdGhlIGFwcGxpY2F0aW9uLlxyXG5cdFx0ICogXHJcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNlcnJvck1lc3NhZ2V9XHJcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtZXJyb3JtZXNzYWdlXHJcblx0XHQgKiBAdHlwZSB7P1N0cmluZ30gXHJcblx0XHQgKi9cclxuICAgICAgICBcImludmFsaWRcIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBzZXQoc3RyKSB7IHJldHVybiBET01TdHJpbmcuc2V0KHRoaXMsIFwiYXJpYS1pbnZhbGlkXCIsIHN0cik7IH0sXHJcbiAgICAgICAgICAgIGdldCgpIHsgcmV0dXJuIERPTVN0cmluZy5nZXQodGhpcywgXCJhcmlhLWludmFsaWRcIik7IH1cclxuICAgICAgICB9LFxyXG5cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluZGljYXRlcyB0aGUgYXZhaWxhYmlsaXR5IGFuZCB0eXBlIG9mIGludGVyYWN0aXZlIHBvcHVwIGVsZW1lbnQsIHN1Y2ggYXMgbWVudSBvciBkaWFsb2csXHJcblx0XHQgKiB0aGF0IGNhbiBiZSB0cmlnZ2VyZWQgYnkgYW4gZWxlbWVudC5cclxuXHRcdCAqIFxyXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWhhc3BvcHVwXHJcblx0XHQgKiBAdHlwZSB7P1N0cmluZ31cclxuXHRcdCAqL1xyXG4gICAgICAgIFwiaGFzUG9wVXBcIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBzZXQoc3RyKSB7IHJldHVybiBET01TdHJpbmcuc2V0KHRoaXMsIFwiYXJpYS1oYXNwb3B1cFwiLCBzdHIpOyB9LFxyXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1oYXNwb3B1cFwiKTsgfVxyXG4gICAgICAgIH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbmRpY2F0ZXMgdGhlIGN1cnJlbnQgXCJjaGVja2VkXCIgc3RhdGUgb2YgYSB7QGxpbmsgV2lkZ2V0fSwgYW1vbmcge0BsaW5rIFJhZGlvfSBhbmQge0BsaW5rIENoZWNrYm94fVxyXG5cdFx0ICogXHJcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNwcmVzc2VkfVxyXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjc2VsZWN0ZWR9XHJcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtcHJlc3NlZFxyXG5cdFx0ICogQHR5cGUgez9TdHJpbmd9XHJcblx0XHQgKi9cclxuICAgICAgICBcInByZXNzZWRcIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBzZXQoc3RyKSB7IHJldHVybiBET01TdHJpbmcuc2V0KHRoaXMsIFwiYXJpYS1wcmVzc2VkXCIsIHN0cik7IH0sXHJcbiAgICAgICAgICAgIGdldCgpIHsgcmV0dXJuIERPTVN0cmluZy5nZXQodGhpcywgXCJhcmlhLXByZXNzZWRcIik7IH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqIEVORCBPRiBXSURHRVQgU1RBVEVTICoqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuXHJcblxyXG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKiogQ09OVFJPTCBWQUxVRVMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG5cclxuXHRcdC8qKiBcclxuXHRcdCAqIFJldHVybnMgLyBzZXRzIHRoZSBodW1hbiByZWFkYWJsZSB0ZXh0IGFsdGVybmF0aXZlIG9mIHtAbGluayAjYXJpYS12YWx1ZW5vd30gZm9yIGEge0BsaW5rIFJhbmdlfSB3aWRnZXQuXHJcblx0XHQgKiBcclxuXHRcdCAqIEBzZWUge0BsaW5rIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtdmFsdWV0ZXh0fVxyXG5cdFx0ICogQHR5cGUgez9TdHJpbmd9XHJcblx0XHQgKi9cclxuICAgICAgICBcInZhbHVlVGV4dFwiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNldChzdHIpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJhcmlhLXZhbHVlVGV4dFwiLCBzdHIpOyB9LFxyXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS12YWx1ZVRleHRcIik7IH1cclxuICAgICAgICB9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUmV0dXJucyAvIHNldHMgYSBzaG9ydCBoaW50IGludGVuZGVkIHRvIGFpZCB0aGUgdXNlciB3aXRoIGRhdGEgZW50cnkgd2hlbiB0aGUgY29udHJvbCBoYXMgbm8gdmFsdWUuXHJcblx0XHQgKiBBIGhpbnQgY291bGQgYmUgYSBzYW1wbGUgdmFsdWUgb3IgYSBicmllZiBkZXNjcmlwdGlvbiBvZiB0aGUgZXhwZWN0ZWQgZm9ybWF0LlxyXG5cdFx0ICogXHJcblx0XHQgKiBAc2VlIHtAbGluayBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXBsYWNlaG9sZGVyfVxyXG5cdFx0ICogQHR5cGUgez9TdHJpbmd9XHJcblx0XHQgKi9cclxuICAgICAgICBcInBsYWNlaG9sZGVyXCI6IHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgc2V0KHN0cikgeyByZXR1cm4gRE9NU3RyaW5nLnNldCh0aGlzLCBcImFyaWEtcGxhY2Vob2xkZXJcIiwgc3RyKTsgfSxcclxuICAgICAgICAgICAgZ2V0KCkgeyByZXR1cm4gRE9NU3RyaW5nLmdldCh0aGlzLCBcImFyaWEtcGxhY2Vob2xkZXJcIik7IH1cclxuICAgICAgICB9LFxyXG5cclxuXHRcdC8qKiBcclxuXHRcdCAqIFJldHVybnMgLyBzZXRzIHRoZSBjdXJyZW50IHZhbHVlIGZvciBhIHtAbGluayBSYW5nZX0gd2lkZ2V0LlxyXG5cdFx0ICogXHJcblx0XHQgKiBAc2VlIHtAbGluayBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXZhbHVlbm93fVxyXG5cdFx0ICogQHR5cGUgez9OdW1iZXJ9XHJcblx0XHQgKi9cclxuICAgICAgICBcInZhbHVlTm93XCI6IHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgc2V0KHZhbCkgeyByZXR1cm4gZG91YmxlLnNldCh0aGlzLCBcImFyaWEtdmFsdWVub3dcIiwgdmFsKTsgfSxcclxuICAgICAgICAgICAgZ2V0KCkgeyByZXR1cm4gZG91YmxlLmdldCh0aGlzLCBcImFyaWEtdmFsdWVub3dcIik7IH1cclxuICAgICAgICB9LFxyXG5cclxuXHRcdC8qKiBcclxuXHRcdCAqIFJldHVybnMgLyBzZXRzIHRoZSBtaW5pbXVtIGFsbG93ZWQgdmFsdWUgZm9yIGEge0BsaW5rIFJhbmdlfSB3aWRnZXQuXHJcblx0XHQgKiBcclxuXHRcdCAqIEBzZWUge0BsaW5rIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtdmFsdWVtaW59XHJcblx0XHQgKiBAdHlwZSB7P051bWJlcn1cclxuXHRcdCAqL1xyXG4gICAgICAgIFwidmFsdWVNaW5cIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBzZXQodmFsKSB7IHJldHVybiBkb3VibGUuc2V0KHRoaXMsIFwiYXJpYS12YWx1ZW1pblwiLCB2YWwpOyB9LFxyXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiBkb3VibGUuZ2V0KHRoaXMsIFwiYXJpYS12YWx1ZW1pblwiKTsgfVxyXG4gICAgICAgIH0sXHJcblxyXG5cdFx0LyoqIFxyXG5cdFx0ICogUmV0dXJucyAvIHNldHMgdGhlIG1heGltdW0gYWxsb3dlZCB2YWx1ZSBmb3IgYSB7QGxpbmsgUmFuZ2V9IHdpZGdldC5cclxuXHRcdCAqIFxyXG5cdFx0ICogQHNlZSB7QGxpbmsgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS12YWx1ZW1heH1cclxuXHRcdCAqIEB0eXBlIHs/TnVtYmVyfVxyXG5cdFx0ICovXHJcbiAgICAgICAgXCJ2YWx1ZU1heFwiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNldCh2YWwpIHsgcmV0dXJuIGRvdWJsZS5zZXQodGhpcywgXCJhcmlhLXZhbHVlbWF4XCIsIHZhbCk7IH0sXHJcbiAgICAgICAgICAgIGdldCgpIHsgcmV0dXJuIGRvdWJsZS5nZXQodGhpcywgXCJhcmlhLXZhbHVlbWF4XCIpOyB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqIEVORCBPRiBDT05UUk9MIFZBTFVFUyAqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuXHJcbiAgICAgICAgLy8gTGl2ZSByZWdpb25zLlxyXG4gICAgICAgIFwiYXRvbWljXCI6IHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgc2V0KHZhbCkgeyByZXR1cm4gYm9vbGVhbi5zZXQodGhpcywgXCJhcmlhLWF0b21pY1wiLCB2YWwpOyB9LFxyXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiBib29sZWFuLmdldCh0aGlzLCBcImFyaWEtYXRvbWljXCIpOyB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImJ1c3lcIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBzZXQodmFsKSB7IHJldHVybiBib29sZWFuLnNldCh0aGlzLCBcImFyaWEtYnVzeVwiLCB2YWwpOyB9LFxyXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiBib29sZWFuLmdldCh0aGlzLCBcImFyaWEtYnVzeVwiKTsgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJsaXZlXCI6IHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgc2V0KHZhbCkgeyByZXR1cm4gRE9NU3RyaW5nLnNldCh0aGlzLCBcImFyaWEtbGl2ZVwiLCB2YWwpOyB9LFxyXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1saXZlXCIpOyB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInJlbGV2YW50XCI6IHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgc2V0KHZhbCkgeyByZXR1cm4gRE9NU3RyaW5nLnNldCh0aGlzLCBcImFyaWEtcmVsZXZhbnRcIiwgdmFsKTsgfSxcclxuICAgICAgICAgICAgZ2V0KCkgeyByZXR1cm4gRE9NU3RyaW5nLmdldCh0aGlzLCBcImFyaWEtcmVsZXZhbnRcIik7IH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqIE9USEVSIFJFTEFUSU9OU0hJUFMgKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUmV0dXJucyAvIHNldHMgdGhlIEFjY2Vzc2libGVOb2RlIG9mIHRoZSBjdXJyZW50bHkgYWN0aXZlIGVsZW1lbnQgd2hlbiBmb2N1cyBpcyBvbiBjdXJyZW50IGVsZW1lbnQuXHJcblx0XHQgKiBcclxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1hY3RpdmVkZXNjZW5kYW50XHJcblx0XHQgKiBAdHlwZSB7P0FjY2Nlc3NpYmxlTm9kZX1cclxuXHRcdCAqL1xyXG4gICAgICAgIFwiYWN0aXZlRGVzY2VuZGFudFwiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNldCh2YWwpIHsgcmV0dXJuIHNldEFjY2Vzc2libGVOb2RlKHRoaXMsIFwiYXJpYS1hY3RpdmVkZXNjZW5kYW50XCIsIHZhbCk7IH0sXHJcbiAgICAgICAgICAgIGdldCgpIHsgcmV0dXJuIGdldEFjY2Vzc2libGVOb2RlKHRoaXMsIFwiYXJpYS1hY3RpdmVkZXNjZW5kYW50XCIpOyB9XHJcbiAgICAgICAgfSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFJldHVybnMgLyBzZXRzIGFuIEFjY2Vzc2libGVOb2RlIHRoYXQgcHJvdmlkZXMgYSBkZXRhaWxlZCwgZXh0ZW5kZWQgZGVzY3JpcHRpb24gXHJcblx0XHQgKiBmb3IgdGhlIGN1cnJlbnQgZWxlbWVudC5cclxuXHRcdCAqIFxyXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjZGVzY3JpYmVkQnl9XHJcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtZGV0YWlsc1xyXG5cdFx0ICogQHR5cGUgez9BY2NjZXNzaWJsZU5vZGV9XHJcblx0XHQgKi9cclxuICAgICAgICBcImRldGFpbHNcIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBzZXQodmFsKSB7IHJldHVybiBzZXRBY2Nlc3NpYmxlTm9kZSh0aGlzLCBcImFyaWEtZGV0YWlsc1wiLCB2YWwpOyB9LFxyXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiBnZXRBY2Nlc3NpYmxlTm9kZSh0aGlzLCBcImFyaWEtZGV0YWlsc1wiKTsgfVxyXG4gICAgICAgIH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZXR1cm5zIC8gc2V0cyBhbiBBY2Nlc3NpYmxlTm9kZSB0aGF0IHByb3ZpZGVzIGFuIGVycm9yIG1lc3NhZ2UgZm9yIHRoZSBjdXJyZW50IGVsZW1lbnQuXHJcblx0XHQgKiBcclxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI2ludmFsaWR9XHJcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNkZXNjcmliZWRCeX1cclxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1lcnJvcm1lc3NhZ2VcclxuXHRcdCAqIEB0eXBlIHs/QWNjY2Vzc2libGVOb2RlfVxyXG5cdFx0ICovXHJcbiAgICAgICAgXCJlcnJvck1lc3NhZ2VcIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBzZXQodmFsKSB7IHJldHVybiBzZXRBY2Nlc3NpYmxlTm9kZSh0aGlzLCBcImFyaWEtZXJyb3JtZXNzYWdlXCIsIHZhbCk7IH0sXHJcbiAgICAgICAgICAgIGdldCgpIHsgcmV0dXJuIGdldEFjY2Vzc2libGVOb2RlKHRoaXMsIFwiYXJpYS1lcnJvcm1lc3NhZ2VcIik7IH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqIEVORCBPRiBPVEhFUiBSRUxBVElPTlNISVBTICoqKioqKioqKioqKioqKioqKioqKiogKi9cclxuXHJcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogQ09MTEVDVElPTlMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFJldHVybnMgLyBzZXRzIHRoZSB0b3RhbCBudW1iZXIgb2YgY29sdW1ucyBpbiBhIHtAbGluayBUYWJsZX0sIHtAbGluayBHcmlkfSwgb3Ige0BsaW5rIFRyZWVncmlkfS5cclxuXHRcdCAqIFxyXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjY29sSW5kZXh9XHJcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtc2V0c2l6ZVxyXG5cdFx0ICogQHR5cGUgez9JbnRlZ2VyfVxyXG5cdFx0ICovXHJcbiAgICAgICAgXCJjb2xDb3VudFwiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNldCh2YWwpIHsgcmV0dXJuIGxvbmcuc2V0KHRoaXMsIFwiYXJpYS1jb2xjb3VudFwiLCB2YWwpOyB9LFxyXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiBsb25nLmdldCh0aGlzLCBcImFyaWEtY29sY291bnRcIik7IH1cclxuICAgICAgICB9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRGVmaW5lcyBhbiBlbGVtZW50J3MgY29sdW1uIGluZGV4IG9yIHBvc2l0aW9uIHdpdGggcmVzcGVjdCB0byB0aGUgdG90YWwgbnVtYmVyIG9mIGNvbHVtbnMgXHJcblx0XHQgKiB3aXRoaW4gYSB7QGxpbmsgVGFibGV9LCB7QGxpbmsgR3JpZH0sIG9yIHtAbGluayBUcmVlZ3JpZH0uXHJcblx0XHQgKiBcclxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI2NvbENvdW50fVxyXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjY29sU3Bhbn1cclxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1jb2xpbmRleFxyXG5cdFx0ICogQHR5cGUgez9JbnRlZ2VyfVxyXG5cdFx0ICovXHJcbiAgICAgICAgXCJjb2xJbmRleFwiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNldCh2YWwpIHsgcmV0dXJuIGxvbmcuc2V0KHRoaXMsIFwiYXJpYS1jb2xpbmRleFwiLCB2YWwpOyB9LFxyXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiBsb25nLmdldCh0aGlzLCBcImFyaWEtY29saW5kZXhcIik7IH1cclxuICAgICAgICB9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRGVmaW5lcyB0aGUgbnVtYmVyIG9mIGNvbHVtbnMgc3Bhbm5lZCBieSBhIGNlbGwgb3IgZ3JpZGNlbGxcclxuXHRcdCAqIHdpdGhpbiBhIHtAbGluayBUYWJsZX0sIHtAbGluayBHcmlkfSwgb3Ige0BsaW5rIFRyZWVncmlkfS5cclxuXHRcdCAqIFxyXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjY29sSW5kZXh9XHJcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNyb3dTcGFufVxyXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWNvbHNwYW5cclxuXHRcdCAqIEB0eXBlIHs/SW50ZWdlcn1cclxuXHRcdCAqL1xyXG4gICAgICAgIFwiY29sU3BhblwiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNldCh2YWwpIHsgcmV0dXJuIGxvbmcuc2V0KHRoaXMsIFwiYXJpYS1jb2xzcGFuXCIsIHZhbCk7IH0sXHJcbiAgICAgICAgICAgIGdldCgpIHsgcmV0dXJuIGxvbmcuZ2V0KHRoaXMsIFwiYXJpYS1jb2xzcGFuXCIpOyB9XHJcbiAgICAgICAgfSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIERlZmluZXMgYW4gZWxlbWVudCdzIG51bWJlciBvciBwb3NpdGlvbiBpbiB0aGUgY3VycmVudCBzZXQgb2Yge0BsaW5rIGxpc3RpdGVtfXMgb3Ige0BsaW5rIHRyZWVpdGVtfXMuXHJcblx0XHQgKiBOb3QgcmVxdWlyZWQgaWYgYWxsIGVsZW1lbnRzIGluIHRoZSBzZXQgYXJlIHByZXNlbnQgaW4gdGhlIERPTS5cclxuXHRcdCAqIFxyXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjc2V0U2l6ZX1cclxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1wb3NpbnNldFxyXG5cdFx0ICogQHR5cGUgez9JbnRlZ2VyfVxyXG5cdFx0ICovXHJcbiAgICAgICAgXCJwb3NJblNldFwiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNldCh2YWwpIHsgcmV0dXJuIGxvbmcuc2V0KHRoaXMsIFwiYXJpYS1wb3NpbnNldFwiLCB2YWwpOyB9LFxyXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiBsb25nLmdldCh0aGlzLCBcImFyaWEtcG9zaW5zZXRcIik7IH1cclxuICAgICAgICB9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRGVmaW5lcyB0aGUgdG90YWwgbnVtYmVyIG9mIHJvd3MgaW4gYSB7QGxpbmsgVGFibGV9LCB7QGxpbmsgR3JpZH0sIG9yIHtAbGluayBUcmVlZ3JpZH0uXHJcblx0XHQgKiBcclxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI3Jvd0luZGV4fVxyXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXJvd2NvdW50XHJcblx0XHQgKiBAdHlwZSB7P0ludGVnZXJ9XHJcblx0XHQgKi9cclxuICAgICAgICBcInJvd0NvdW50XCI6IHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgc2V0KHZhbCkgeyByZXR1cm4gbG9uZy5zZXQodGhpcywgXCJhcmlhLXJvd2NvdW50XCIsIHZhbCk7IH0sXHJcbiAgICAgICAgICAgIGdldCgpIHsgcmV0dXJuIGxvbmcuZ2V0KHRoaXMsIFwiYXJpYS1yb3djb3VudFwiKTsgfVxyXG4gICAgICAgIH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBEZWZpbmVzIGFuIGVsZW1lbnQncyByb3cgaW5kZXggb3IgcG9zaXRpb24gd2l0aCByZXNwZWN0IHRvIHRoZSB0b3RhbCBudW1iZXIgb2Ygcm93cyBcclxuXHRcdCAqIHdpdGhpbiBhICB7QGxpbmsgVGFibGV9LCB7QGxpbmsgR3JpZH0sIG9yIHtAbGluayBUcmVlZ3JpZH0uXHJcblx0XHQgKiBcclxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI3Jvd0NvdW50fVxyXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjcm93U3Bhbn1cclxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1yb3dpbmRleFxyXG5cdFx0ICogQHR5cGUgez9JbnRlZ2VyfVxyXG5cdFx0ICovXHJcbiAgICAgICAgXCJyb3dJbmRleFwiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNldCh2YWwpIHsgcmV0dXJuIGxvbmcuc2V0KHRoaXMsIFwiYXJpYS1yb3dpbmRleFwiLCB2YWwpOyB9LFxyXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiBsb25nLmdldCh0aGlzLCBcImFyaWEtcm93aW5kZXhcIik7IH1cclxuICAgICAgICB9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRGVmaW5lcyB0aGUgbnVtYmVyIG9mIHJvd3Mgc3Bhbm5lZCBieSBhIGNlbGwgb3IgZ3JpZGNlbGxcclxuXHRcdCAqIHdpdGhpbiBhIHtAbGluayBUYWJsZX0sIHtAbGluayBHcmlkfSwgb3Ige0BsaW5rIFRyZWVncmlkfS5cclxuXHRcdCAqIFxyXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjcm93SW5kZXh9XHJcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNjb2xTcGFufVxyXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXJvd3NwYW5cclxuXHRcdCAqIEB0eXBlIHs/SW50ZWdlcn1cclxuXHRcdCAqL1xyXG4gICAgICAgIFwicm93U3BhblwiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNldCh2YWwpIHsgcmV0dXJuIGxvbmcuc2V0KHRoaXMsIFwiYXJpYS1yb3dzcGFuXCIsIHZhbCk7IH0sXHJcbiAgICAgICAgICAgIGdldCgpIHsgcmV0dXJuIGxvbmcuZ2V0KHRoaXMsIFwiYXJpYS1yb3dzcGFuXCIpOyB9XHJcbiAgICAgICAgfSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIERlZmluZXMgdGhlIG51bWJlciBvZiBpdGVtcyBpbiB0aGUgY3VycmVudCBzZXQgb2YgbGlzdGl0ZW1zIG9yIHRyZWVpdGVtcy5cclxuXHRcdCAqIE5vdCByZXF1aXJlZCBpZiAqKmFsbCoqIGVsZW1lbnRzIGluIHRoZSBzZXQgYXJlIHByZXNlbnQgaW4gdGhlIERPTS5cclxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI3Bvc0luU2V0fVxyXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXNldHNpemVcclxuXHRcdCAqIEB0eXBlIHs/SW50ZWdlcn1cclxuXHRcdCAqL1xyXG4gICAgICAgIFwic2V0U2l6ZVwiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNldCh2YWwpIHsgcmV0dXJuIGxvbmcuc2V0KHRoaXMsIFwiYXJpYS1zZXRzaXplXCIsIHZhbCk7IH0sXHJcbiAgICAgICAgICAgIGdldCgpIHsgcmV0dXJuIGxvbmcuZ2V0KHRoaXMsIFwiYXJpYS1zZXRzaXplXCIpOyB9XHJcbiAgICAgICAgfSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIERlZmluZXMgdGhlIGhpZXJhcmNoaWNhbCBsZXZlbCBvZiBhbiBlbGVtZW50IHdpdGhpbiBhIHN0cnVjdHVyZS5cclxuXHRcdCAqIEUuZy4gYCZsdDtoMSZndDsmbHQ7aDEvJmd0O2AgZXF1YWxzIGAmbHQ7ZGl2IHJvbGU9XCJoZWFkaW5nXCIgYXJpYS1sZXZlbD1cIjFcIiZndDsmbHQ7L2Rpdj5gXHJcblx0XHQgKiBcclxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1sZXZlbFxyXG5cdFx0ICogQHR5cGUgez9JbnRlZ2VyfVxyXG5cdFx0ICovXHJcbiAgICAgICAgXCJsZXZlbFwiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNldCh2YWwpIHsgcmV0dXJuIGxvbmcuc2V0KHRoaXMsIFwiYXJpYS1sZXZlbFwiLCB2YWwpOyB9LFxyXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiBsb25nLmdldCh0aGlzLCBcImFyaWEtbGV2ZWxcIik7IH1cclxuICAgICAgICB9LFxyXG5cclxuXHRcdC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqIEVORCBPRiBDT0xMRUNUSU9OUyAqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG5cclxuXHRcdC8qICoqKioqKioqKioqKioqKioqKiBBQ0NFU1NJQkxFIExBQkVMIEFORCBERVNDUklQVElPTiAqKioqKioqKioqKioqKioqKiogKi9cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFJldHVybnMgYW4gbGlzdCB3aXRoIEFjY2Vzc2libGVOb2RlIGluc3RhbmNlcyB0aGF0IGxhYmVscyB0aGUgY3VycmVudCBlbGVtZW50XHJcblx0XHQgKiBcclxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI2Rlc2NyaWJlZEJ5fVxyXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWxhYmVsbGVkYnlcclxuXHRcdCAqIEB0eXBlIHtBY2Nlc3NpYmxlTm9kZUxpc3R9XHJcblx0XHQgKi9cclxuXHRcdFwibGFiZWxlZEJ5XCI6IHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0c2V0KHZhbCkge1xyXG5cdFx0XHRcdGlmICghKHZhbCBpbnN0YW5jZW9mIEFjY2Vzc2libGVOb2RlTGlzdENvbnN0cnVjdG9yKSkge1xyXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSXQgbXVzdCBiZSBhbiBpbnN0YW5jZSBvZiBBY2Nlc3NpYmxlTm9kZUxpc3RcIik7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0aGlzLl92YWx1ZXMubGFiZWxlZEJ5ID0gdmFsO1xyXG5cdFx0XHRcdHZhbC5wYXJlbnRBT00gPSB0aGlzO1xyXG5cdFx0XHRcdHZhbC5hdHRyaWJ1dGUgPSBcImFyaWEtbGFiZWxsZWRieVwiO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRnZXQoKSB7IHJldHVybiB0aGlzLl92YWx1ZXMubGFiZWxlZEJ5IHx8IG51bGw7IH1cclxuXHRcdH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZXR1cm5zIGFuIGxpc3Qgd2l0aCBBY2Nlc3NpYmxlTm9kZSBpbnN0YW5jZXMgdGhhdCBkZXNjcmliZXMgdGhlIGN1cnJlbnQgZWxlbWVudFxyXG5cdFx0ICogXHJcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNsYWJlbGVkQnl9XHJcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtZGVzY3JpYmVkYnlcclxuXHRcdCAqIEB0eXBlIHtBY2Nlc3NpYmxlTm9kZUxpc3R9XHJcblx0XHQgKi9cclxuXHRcdFwiZGVzY3JpYmVkQnlcIjoge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRzZXQodmFsKSB7XHJcblx0XHRcdFx0aWYgKCEodmFsIGluc3RhbmNlb2YgQWNjZXNzaWJsZU5vZGVMaXN0Q29uc3RydWN0b3IpKSB7XHJcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJdCBtdXN0IGJlIGFuIGluc3RhbmNlIG9mIEFjY2Vzc2libGVOb2RlTGlzdFwiKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHRoaXMuX3ZhbHVlcy5kZXNjcmliZWRCeSA9IHZhbDtcclxuXHRcdFx0XHR2YWwucGFyZW50QU9NID0gdGhpcztcclxuXHRcdFx0XHR2YWwuYXR0cmlidXRlID0gXCJhcmlhLWRlc2NyaWJlZGJ5XCI7XHJcblx0XHRcdH0sXHJcblx0XHRcdGdldCgpIHsgcmV0dXJuIHRoaXMuX3ZhbHVlcy5kZXNjcmliZWRCeSB8fCBudWxsOyB9XHJcblx0XHR9LFxyXG5cclxuXHRcdC8qICoqKioqKioqKioqKioqIEVORCBPRiBBQ0NFU1NJQkxFIExBQkVMIEFORCBERVNDUklQVElPTiAqKioqKioqKioqKioqKiAqL1xyXG5cdFx0XHJcblx0XHQvKiAqKioqKioqKioqKioqKioqKioqKioqKiogT1RIRVIgUkVMQVRJT05TSElQUyAqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFJldHVybnMgYW4gbGlzdCB3aXRoIEFjY2Vzc2libGVOb2RlIGluc3RhbmNlcyB3aG9zZSBjb250ZW50cyBvciBwcmVzZW5jZSBhcmUgY29udHJvbGxlZCBieVxyXG5cdFx0ICogdGhlIGN1cnJlbnQgZWxlbWVudC5cclxuXHRcdCAqIFxyXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjb3duc31cclxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1jb250cm9sc1xyXG5cdFx0ICogQHR5cGUge0FjY2Vzc2libGVOb2RlTGlzdH1cclxuXHRcdCAqL1xyXG5cdFx0XCJjb250cm9sc1wiOiB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdHNldCh2YWwpIHtcclxuXHRcdFx0XHRpZiAoISh2YWwgaW5zdGFuY2VvZiBBY2Nlc3NpYmxlTm9kZUxpc3RDb25zdHJ1Y3RvcikpIHtcclxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIkl0IG11c3QgYmUgYW4gaW5zdGFuY2Ugb2YgQWNjZXNzaWJsZU5vZGVMaXN0XCIpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGhpcy5fdmFsdWVzLmNvbnRyb2xzID0gdmFsO1xyXG5cdFx0XHRcdHZhbC5wYXJlbnRBT00gPSB0aGlzO1xyXG5cdFx0XHRcdHZhbC5hdHRyaWJ1dGUgPSBcImFyaWEtY29udHJvbHNcIjtcclxuXHRcdFx0fSxcclxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gdGhpcy5fdmFsdWVzLmNvbnRyb2xzIHx8IG51bGw7IH1cclxuXHRcdH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDb250YWlucyB0aGUgbmV4dCBlbGVtZW50KHMpIGluIGFuIGFsdGVybmF0ZSByZWFkaW5nIG9yZGVyIG9mIGNvbnRlbnQgd2hpY2gsIGF0IHRoZSB1c2VyJ3MgXHJcblx0XHQgKiBkaXNjcmV0aW9uLCBhbGxvd3MgYXNzaXN0aXZlIHRlY2hub2xvZ3kgdG8gb3ZlcnJpZGUgdGhlIGdlbmVyYWwgZGVmYXVsdCBvZiByZWFkaW5nIGluXHJcblx0XHQgKiBkb2N1bWVudCBzb3VyY2Ugb3JkZXIuXHJcblx0XHQgKiBcclxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1mbG93dG9cclxuXHRcdCAqIEB0eXBlIHtBY2Nlc3NpYmxlTm9kZUxpc3R9XHJcblx0XHQgKi9cclxuXHRcdFwiZmxvd1RvXCI6IHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0c2V0KHZhbCkge1xyXG5cdFx0XHRcdGlmICghKHZhbCBpbnN0YW5jZW9mIEFjY2Vzc2libGVOb2RlTGlzdENvbnN0cnVjdG9yKSkge1xyXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSXQgbXVzdCBiZSBhbiBpbnN0YW5jZSBvZiBBY2Nlc3NpYmxlTm9kZUxpc3RcIik7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0aGlzLl92YWx1ZXMuZmxvd1RvID0gdmFsO1xyXG5cdFx0XHRcdHZhbC5wYXJlbnRBT00gPSB0aGlzO1xyXG5cdFx0XHRcdHZhbC5hdHRyaWJ1dGUgPSBcImFyaWEtZmxvd3RvXCI7XHJcblx0XHRcdH0sXHJcblx0XHRcdGdldCgpIHsgcmV0dXJuIHRoaXMuX3ZhbHVlcy5mbG93VG8gfHwgbnVsbDsgfVxyXG5cdFx0fSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENvbnRhaW5zIGNoaWxkcmVuIHdobydzIElEIGFyZSByZWZlcmVuY2VkIGluc2lkZSB0aGUgYGFyaWEtb3duc2AgYXR0cmlidXRlXHJcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtb3duc1xyXG5cdFx0ICogQHR5cGUge0FjY2Vzc2libGVOb2RlTGlzdH1cclxuXHRcdCAqL1xyXG5cdFx0XCJvd25zXCI6IHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0c2V0KHZhbCkge1xyXG5cdFx0XHRcdGlmICghKHZhbCBpbnN0YW5jZW9mIEFjY2Vzc2libGVOb2RlTGlzdENvbnN0cnVjdG9yKSkge1xyXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSXQgbXVzdCBiZSBhbiBpbnN0YW5jZSBvZiBBY2Nlc3NpYmxlTm9kZUxpc3RcIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMuX3ZhbHVlcy5vd25zID0gdmFsO1xyXG5cdFx0XHRcdHZhbC5wYXJlbnRBT00gPSB0aGlzO1xyXG5cdFx0XHRcdHZhbC5hdHRyaWJ1dGUgPSBcImFyaWEtb3duc1wiO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRnZXQoKSB7IHJldHVybiB0aGlzLl92YWx1ZXMub3ducyB8fCBudWxsOyB9XHJcblx0XHR9LFxyXG5cclxuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKiogRU5EIE9GIE9USEVSIFJFTEFUSU9OU0hJUFMgKioqKioqKioqKioqKioqKioqKioqICovXHJcbiAgICB9XHJcbik7XHJcblxyXG5mdW5jdGlvbiBzZXRBY2Nlc3NpYmxlTm9kZShhb20sIGF0dHJpYnV0ZSwgdmFsdWUpIHtcclxuXHRpZiAodmFsdWUgPT0gdW5kZWZpbmVkKSB7XHJcblx0XHQvLyByZW1vdmUgSUQgb2YgY29ubmVjdGVkIGVsZW1lbnQgaWYgZ2VuZXJhdGVkXHJcblx0XHRpZihhb20uX3ZhbHVlc1thdHRyaWJ1dGVdICYmIGFvbS5fdmFsdWVzW2F0dHJpYnV0ZV0uZ2VuZXJhdGVkX2lkKXtcclxuXHRcdFx0YW9tLl92YWx1ZXNbYXR0cmlidXRlXS5fbm9kZS5yZW1vdmVBdHRyaWJ1dGUoXCJpZFwiKTtcclxuXHRcdFx0YW9tLl92YWx1ZXNbYXR0cmlidXRlXS5nZW5lcmF0ZWRfaWQgPSBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRhb20uX3ZhbHVlc1thdHRyaWJ1dGVdID0gdmFsdWU7XHJcblx0XHRyZXR1cm4gYW9tLl9ub2RlLnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGUpOztcclxuXHR9IGVsc2UgaWYgKCEodmFsdWUgaW5zdGFuY2VvZiBBY2Nlc3NpYmxlTm9kZSkpIHtcclxuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYEZhaWxlZCB0byBzZXQgdGhlICcje2F0dHJpYnV0ZX0nIHByb3BlcnR5IG9uICdBY2Nlc3NpYmxlTm9kZSc6IFRoZSBwcm92aWRlZCB2YWx1ZSBpcyBub3Qgb2YgdHlwZSAnQWNjZXNzaWJsZU5vZGUnYCk7XHJcblx0fVxyXG5cclxuICAgIGlmICh2YWx1ZS5fbm9kZSkge1xyXG5cdFx0aWYgKCF2YWx1ZS5fbm9kZS5pZCkge1xyXG5cdFx0XHQvKiogQHRvZG8gcmVtb3ZlIHRlbXAgaWQgKi9cclxuXHRcdFx0dmFsdWUuX25vZGUuaWQgPSBcImlkLVwiICsgcGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIDEwMDAwMDApO1xyXG5cdFx0XHR2YWx1ZS5nZW5lcmF0ZWRfaWQgPSB0cnVlO1xyXG5cdFx0XHRjb25zb2xlLmxvZyh2YWx1ZSwgdmFsdWUuZ2VuZXJhdGVkX2lkKTtcclxuXHRcdH1cclxuXHJcblx0XHRhb20uX25vZGUuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZSwgdmFsdWUuX25vZGUuaWQpO1xyXG5cdH1cclxuXHJcblx0YW9tLl92YWx1ZXNbYXR0cmlidXRlXSA9IHZhbHVlO1xyXG5cdHJldHVybiB2YWx1ZTtcclxufVxyXG5mdW5jdGlvbiBnZXRBY2Nlc3NpYmxlTm9kZShhb20sIGF0dHJpYnV0ZSkge1xyXG5cdHZhciB2YWx1ZSA9IGFvbS5fdmFsdWVzW2F0dHJpYnV0ZV07XHJcblx0aWYgKHZhbHVlID09IHVuZGVmaW5lZCkge1xyXG5cdFx0dmFyIGF0dHIgPSBhb20uX25vZGUuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSk7XHJcblx0XHRpZihhdHRyID09IHVuZGVmaW5lZCkgcmV0dXJuIG51bGw7XHJcblx0XHRyZXR1cm4gZWxlbWVudHMuZ2V0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGF0dHIpKTtcclxuXHR9XHJcblx0cmV0dXJuIHZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBY2Nlc3NpYmxlTm9kZTsiLCJpbXBvcnQgQWNjZXNzaWJsZU5vZGUgZnJvbSBcIi4vQWNjZXNzaWJsZU5vZGVcIjtcclxuXHJcbmV4cG9ydCBsZXQgQWNjZXNzaWJsZU5vZGVMaXN0Q29uc3RydWN0b3IgPSBjbGFzcyBBY2Nlc3NpYmxlTm9kZUxpc3QgZXh0ZW5kcyBBcnJheSB7XHJcblx0aXRlbShpbmRleCkge1xyXG5cdFx0aWYoaXNOYU4oaW5kZXgpKSByZXR1cm47XHJcblx0XHRyZXR1cm4gdGhpc1tpbmRleF07XHJcblx0fVxyXG5cclxuXHRhZGQoYWNjZXNzaWJsZU5vZGUsIGJlZm9yZSA9IG51bGwpIHtcclxuXHRcdGlmICghKGFjY2Vzc2libGVOb2RlIGluc3RhbmNlb2YgQWNjZXNzaWJsZU5vZGUpKSB7XHJcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJGYWlsZWQgdG8gZXhlY3V0ZSAnYWRkJyBvbiAnQWNjZXNzaWJsZU5vZGVMaXN0JzogcGFyYW1ldGVyIDEgaXMgbm90IG9mIHR5cGUgJ0FjY2Vzc2libGVOb2RlJy5cIik7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoYmVmb3JlICE9PSBudWxsKSB7XHJcblx0XHRcdHZhciBiZWZvcmVJbmRleCA9IHRoaXMuaW5kZXhPZihiZWZvcmUpO1xyXG5cdFx0XHRpZihiZWZvcmVJbmRleCA+IC0xKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuc3BsaWNlKGJlZm9yZUluZGV4IC0gMSwgMCwgYWNjZXNzaWJsZU5vZGUpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMucHVzaChhY2Nlc3NpYmxlTm9kZSk7XHJcblx0fVxyXG5cclxuXHRyZW1vdmUoaW5kZXgpIHtcclxuXHRcdC8vIHVwZGF0ZSBET00gYXR0cmlidXRlXHJcblx0XHRpZiAodGhpcy5wYXJlbnRBT00gJiYgdGhpc1tpbmRleF0uX25vZGUgJiYgdGhpc1tpbmRleF0uX25vZGUuaWQpIHtcclxuXHRcdFx0bGV0IGlkcyA9IFtdO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMucGFyZW50QU9NLl9ub2RlLmhhc0F0dHJpYnV0ZSh0aGlzLmF0dHJpYnV0ZSkpIHtcclxuXHRcdFx0XHRpZHMgPSB0aGlzLnBhcmVudEFPTS5fbm9kZS5nZXRBdHRyaWJ1dGUodGhpcy5hdHRyaWJ1dGUpLnNwbGl0KFwiIFwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpZHMgPSBbXTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGZpbHRlcmVkSWRzID0gaWRzLmZpbHRlcihlID0+IGUgIT09IHRoaXNbaW5kZXhdLl9ub2RlLmlkKTtcclxuXHJcblx0XHRcdC8vIHJlbW92ZSBnZW5lcmF0ZWQgaWRzIGFzIGxvbmcgaXQgd2FzIHByZXZpb3VzbHkgcmVmZXJlbmNlZFxyXG5cdFx0XHRpZiAodGhpc1tpbmRleF0uZ2VuZXJhdGVkX2lkID09PSB0cnVlICYmIGZpbHRlcmVkSWRzLmxlbmd0aCA8IGlkcy5sZW5ndGgpIHtcclxuXHRcdFx0XHR0aGlzW2luZGV4XS5fbm9kZS5pZCA9IFwiXCI7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMucGFyZW50QU9NLl9ub2RlLnNldEF0dHJpYnV0ZSh0aGlzLmF0dHJpYnV0ZSwgZmlsdGVyZWRJZHMuam9pbihcIiBcIikpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLnBvcChpbmRleCk7XHJcblx0fVxyXG59XHJcblxyXG52YXIgYXJyYXlDaGFuZ2VIYW5kbGVyID0ge1xyXG5cdHNldDogZnVuY3Rpb24gKHRhcmdldCwgcHJvcGVydHksIHZhbHVlKSB7XHJcblx0XHQvLyBhZGRpbmcgb3IgY2hhbmdpbmcgYSB2YWx1ZSBpbnNpZGUgdGhlIGFycmF5XHJcblx0XHRpZiAoIWlzTmFOKHByb3BlcnR5KSkge1xyXG5cclxuXHRcdFx0Ly8gY2hlY2sgaWYgaXRzIHZhbGlkIHR5cGVcclxuXHRcdFx0aWYgKHZhbHVlIGluc3RhbmNlb2YgQWNjZXNzaWJsZU5vZGUpIHtcclxuXHRcdFx0XHR0YXJnZXRbcHJvcGVydHldID0gdmFsdWU7XHJcblxyXG5cdFx0XHRcdC8vIHVwZGF0ZSBET00gYXR0cmlidXRlXHJcblx0XHRcdFx0aWYgKHRhcmdldC5wYXJlbnRBT00gJiYgdmFsdWUgJiYgdmFsdWUuX25vZGUpIHtcclxuXHRcdFx0XHRcdGlmKCF2YWx1ZS5fbm9kZS5pZCkge1xyXG5cdFx0XHRcdFx0XHR2YWx1ZS5fbm9kZS5pZCA9IFwiYW9tLVwiICsgRGF0ZS5ub3coKTtcclxuXHRcdFx0XHRcdFx0dmFsdWUuZ2VuZXJhdGVkX2lkID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRsZXQgaWRzID0gW107XHJcblx0XHRcdFx0XHRpZiAodGFyZ2V0LnBhcmVudEFPTS5fbm9kZS5oYXNBdHRyaWJ1dGUodGFyZ2V0LmF0dHJpYnV0ZSkpIHtcclxuXHRcdFx0XHRcdFx0aWRzID0gdGFyZ2V0LnBhcmVudEFPTS5fbm9kZS5nZXRBdHRyaWJ1dGUodGFyZ2V0LmF0dHJpYnV0ZSkuc3BsaXQoXCIgXCIpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0aWRzID0gW107XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWRzLnB1c2godmFsdWUuX25vZGUuaWQpO1xyXG5cclxuXHRcdFx0XHRcdHRhcmdldC5wYXJlbnRBT00uX25vZGUuc2V0QXR0cmlidXRlKHRhcmdldC5hdHRyaWJ1dGUsIGlkcy5qb2luKFwiIFwiKSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0YXJnZXRbcHJvcGVydHldID0gdmFsdWU7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIk9ubHkgaW5zdGFuY2VzIG9mIEFjY2Vzc2libGVOb2RlIGFyZSBhbGxvd2VkXCIpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHR0YXJnZXRbcHJvcGVydHldID0gdmFsdWU7XHJcblx0XHQvLyB5b3UgaGF2ZSB0byByZXR1cm4gdHJ1ZSB0byBhY2NlcHQgdGhlIGNoYW5nZXNcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBcclxuICovXHJcbmZ1bmN0aW9uIEFjY2Vzc2libGVOb2RlTGlzdFByb3h5KCkge1xyXG5cdGxldCBhY2Nlc3NpYmxlTm9kZUxpc3QgPSBuZXcgQWNjZXNzaWJsZU5vZGVMaXN0Q29uc3RydWN0b3IoKTtcdFxyXG5cdHJldHVybiBuZXcgUHJveHkoYWNjZXNzaWJsZU5vZGVMaXN0LCBhcnJheUNoYW5nZUhhbmRsZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBY2Nlc3NpYmxlTm9kZUxpc3RQcm94eTsiLCIvKipcclxuICogUmV0dXJucyB0aGUgdmFsdWUgb2YgYSBnaXZlbiBhdHRyaWJ1dGVcclxuICogQHBhcmFtIHtBY2Nlc3NpYmxlTm9kZX0gYW9tIFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gYXR0cmlidXRlTmFtZSBcclxuICogQHJldHVybiB7U3RyaW5nfSBhdHRyaWJ1dGUncyB2YWx1ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldChhb20sIGF0dHJpYnV0ZU5hbWUpIHtcclxuXHRyZXR1cm4gYW9tLl92YWx1ZXNbYXR0cmlidXRlTmFtZV0gfHwgYW9tLl9ub2RlLmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFN5bmMgdGhlIG5ldyB2YWx1ZSB0byB0aGUgRE9NXHJcbiAqIEBwYXJhbSB7QWNjZXNzaWJsZU5vZGV9IGFvbSBcclxuICogQHBhcmFtIHtTdHJpbmd9IGF0dHJpYnV0ZU5hbWUgXHJcbiAqIEBwYXJhbSB7U3RyaW5nIHwgTnVtYmVyIH0gc3RhdHVzIFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldChhb20sIGF0dHJpYnV0ZU5hbWUsIHN0YXR1cykge1xyXG5cdGlmIChzdGF0dXMgPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRhb20uX25vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRhb20uX25vZGUuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUsIHN0YXR1cyk7XHJcblx0fVxyXG5cdFxyXG5cdGFvbS5fdmFsdWVzW2F0dHJpYnV0ZU5hbWVdID0gdHlwZW9mIHN0YXR1cyAhPSBcInVuZGVmaW5lZFwiID8gc3RhdHVzLnRvU3RyaW5nKCkgOiBzdGF0dXM7XHJcblx0cmV0dXJuIHN0YXR1cztcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBnZXQsIHNldCB9OyIsImNsYXNzIEV2ZW50VGFyZ2V0IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcIl9saXN0ZW5lcnNcIiwgeyB2YWx1ZTogbmV3IE1hcCgpIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbGlzdGVuZXJzLmhhcyh0eXBlKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnMuc2V0KHR5cGUsIFtdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzLmdldCh0eXBlKS5wdXNoKHtsaXN0ZW5lciwgb3B0aW9uc30pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgY2FsbGJhY2ssIG9wdGlvbnMpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2xpc3RlbmVycy5oYXModHlwZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc3RhY2sgPSB0aGlzLl9saXN0ZW5lcnMuZ2V0KHR5cGUpO1xyXG4gICAgICAgIHN0YWNrLmZvckVhY2goIChsaXN0ZW5lciwgaSkgPT4ge1xyXG4gICAgICAgICAgICBpZihsaXN0ZW5lci5saXN0ZW5lciA9PT0gY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHN0YWNrLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3BhdGNoRXZlbnQoZXZlbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2xpc3RlbmVycy5oYXMoZXZlbnQudHlwZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzdGFjayA9IHRoaXMuX2xpc3RlbmVycy5nZXQoZXZlbnQudHlwZSk7XHJcblxyXG4gICAgICAgIHN0YWNrLmZvckVhY2goIGxpc3RlbmVyID0+IHtcclxuICAgICAgICAgICAgbGlzdGVuZXIuY2FsbCh0aGlzLCBldmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuICFldmVudC5kZWZhdWx0UHJldmVudGVkO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFdmVudFRhcmdldDsiLCIvKipcclxuICogUmV0dXJucyB0aGUgdmFsdWUgb2YgZ2l2ZW4gYXR0cmlidXRlIGFzIEJvb2xlYW5cclxuICogQHBhcmFtIHtBY2Nlc3NpYmxlTm9kZX0gYW9tIFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gYXR0cmlidXRlTmFtZSBcclxuICogQHJldHVybiB7Qm9vbGVhbn0gYXR0cmlidXRlJ3MgdmFsdWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXQoYW9tLCBhdHRyaWJ1dGVOYW1lKSB7XHJcblx0dmFyIHZhbHVlID0gYW9tLl92YWx1ZXNbYXR0cmlidXRlTmFtZV0gfHwgYW9tLl9ub2RlLmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcclxuXHJcblx0aWYodmFsdWUgPT0gdW5kZWZpbmVkICkgcmV0dXJuIG51bGw7XHJcblx0cmV0dXJuIHZhbHVlICA9PSBcInRydWVcIiB8fCBmYWxzZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFN5bmMgdGhlIG5ldyB2YWx1ZSB0byB0aGUgcHJvcGVydHlcclxuICogQHBhcmFtIHtBY2Nlc3NpYmxlTm9kZX0gYW9tIFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gYXR0cmlidXRlTmFtZSBcclxuICogQHBhcmFtIHtTdHJpbmcgfCBCb29sZWFufSBzdGF0dXMgXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0KGFvbSwgYXR0cmlidXRlTmFtZSwgc3RhdHVzKSB7XHJcblx0aWYoc3RhdHVzID09IHVuZGVmaW5lZCkge1xyXG5cdFx0YW9tLl9ub2RlLnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0YW9tLl9ub2RlLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lLCBzdGF0dXMpO1xyXG5cdH1cclxuXHJcblx0YW9tLl92YWx1ZXNbYXR0cmlidXRlTmFtZV0gPSBzdGF0dXMgIT0gdW5kZWZpbmVkID8gc3RhdHVzLnRvU3RyaW5nKCkgOiBzdGF0dXM7XHJcblx0cmV0dXJuIHN0YXR1cztcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBnZXQsIHNldCB9OyIsIi8qKlxyXG4gKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiBhIGdpdmVuIGF0dHJpYnV0ZSBhcyBOdW1iZXJcclxuICogQHBhcmFtIHtBY2Nlc3NpYmxlTm9kZX0gYW9tIFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gYXR0cmlidXRlTmFtZSBcclxuICogQHJldHVybiB7TnVtYmVyfSBhdHRyaWJ1dGUncyB2YWx1ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldChhb20sIGF0dHJpYnV0ZU5hbWUpIHtcclxuXHR2YXIgdmFsdWUgPSBhb20uX3ZhbHVlc1thdHRyaWJ1dGVOYW1lXSB8fCBhb20uX25vZGUuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpOztcclxuXHRpZiAodmFsdWUgPT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbDtcclxuXHRyZXR1cm4gTnVtYmVyKHZhbHVlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFN5bmMgdGhlIG5ldyB2YWx1ZSB0byB0aGUgRE9NXHJcbiAqIEBwYXJhbSB7QWNjZXNzaWJsZU5vZGV9IGFvbSBcclxuICogQHBhcmFtIHtTdHJpbmd9IGF0dHJpYnV0ZU5hbWUgXHJcbiAqIEBwYXJhbSB7U3RyaW5nIHwgTnVtYmVyIH0gc3RhdHVzIFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldChhb20sIGF0dHJpYnV0ZU5hbWUsIHN0cikge1xyXG5cdGlmKHN0ciA9PSBudWxsKSB7XHJcblx0XHRhb20uX25vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRhb20uX25vZGUuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUsIHN0cik7XHJcblx0fVxyXG5cclxuXHRhb20uX3ZhbHVlc1thdHRyaWJ1dGVOYW1lXSA9IHN0YXR1cy50b1N0cmluZygpO1xyXG5cdHJldHVybiBzdGF0dXM7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgZ2V0LCBzZXQgfTsiLCIvKipcclxuICogUmV0dXJucyB0aGUgdmFsdWUgb2YgYSBnaXZlbiBhdHRyaWJ1dGUgYXMgSW50ZWdlclxyXG4gKiBAcGFyYW0ge0FjY2Vzc2libGVOb2RlfSBhb20gXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBhdHRyaWJ1dGVOYW1lIFxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IGF0dHJpYnV0ZSdzIHZhbHVlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0KGFvbSwgYXR0cmlidXRlTmFtZSkge1xyXG5cdHZhciB2YWx1ZSA9IGFvbS5fdmFsdWVzW2F0dHJpYnV0ZU5hbWVdIHx8IGFvbS5fbm9kZS5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7O1xyXG5cdGlmICh2YWx1ZSA9PSB1bmRlZmluZWQpIHJldHVybiBudWxsO1xyXG5cdHJldHVybiBwYXJzZUludCh2YWx1ZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTeW5jIHRoZSBuZXcgdmFsdWUgdG8gdGhlIERPTVxyXG4gKiBAcGFyYW0ge0FjY2Vzc2libGVOb2RlfSBhb20gXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBhdHRyaWJ1dGVOYW1lIFxyXG4gKiBAcGFyYW0ge1N0cmluZyB8IE51bWJlciB9IHN0YXR1cyBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXQoYW9tLCBhdHRyaWJ1dGVOYW1lLCBzdHIpIHtcclxuXHRpZiAoc3RyID09IG51bGwpIHtcclxuXHRcdGFvbS5fbm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGFvbS5fbm9kZS5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgc3RyKTtcclxuXHR9XHJcblxyXG5cdGFvbS5fdmFsdWVzW2F0dHJpYnV0ZU5hbWVdID0gc3RhdHVzLnRvU3RyaW5nKCk7XHJcblx0cmV0dXJuIHN0YXR1cztcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBnZXQsIHNldCB9OyIsIlxuLy8gRGVmYXVsdCBleHBvcnQgLSBNaXggd3JhcHBlclxuaW1wb3J0IG1peCBmcm9tICcuL3NyYy9taXgnO1xuZXhwb3J0IGRlZmF1bHQgbWl4O1xuXG4vLyBEZWNsYXJlIG1peGluIGNsYXNzZXNcbmltcG9ydCBEZWNsYXJlTWl4aW4gZnJvbSAnLi9zcmMvZGVjbGFyZSc7XG5leHBvcnQgeyBEZWNsYXJlTWl4aW4gfTtcblxuLy8gRGVjb3JhdG9yc1xuaW1wb3J0IEJhcmVNaXhpbiBmcm9tICcuL3NyYy9EZWNvcmF0b3JzL0JhcmVNaXhpbic7XG5leHBvcnQgeyBCYXJlTWl4aW4gfTtcblxuaW1wb3J0IEhhc0luc3RhbmNlIGZyb20gJy4vc3JjL0RlY29yYXRvcnMvSGFzSW5zdGFuY2UnO1xuZXhwb3J0IHsgSGFzSW5zdGFuY2UgfTtcblxuaW1wb3J0IENhY2hlZCBmcm9tICcuL3NyYy9EZWNvcmF0b3JzL0NhY2hlZCc7XG5leHBvcnQgeyBDYWNoZWQgfTtcblxuLy8gVXRpbHNcbmltcG9ydCB3cmFwIGZyb20gJy4vc3JjL1V0aWxzL3dyYXAnO1xuZXhwb3J0IHsgd3JhcCB9OyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNaXhpbiBCdWlsZGVyXG4gKlxuICogQWxsb3dzIHlvdSB0byBleHRlbmQgYSBjbGFzcyB3aXRoIG9uZSBvciBtb3JlIG1peGluIGNsYXNzZXMuXG4gKlxuICogVGhpcyBidWlsZGVyIGlzIGhlYXZpbHkgaW5zcGlyZWQgYnkgSnVzdGluIEZhZ25hbmkncyBNaXh3aXRoLmpzXG4gKlxuICogQHNlZSBodHRwOi8vanVzdGluZmFnbmFuaS5jb20vMjAxNS8xMi8yMS9yZWFsLW1peGlucy13aXRoLWphdmFzY3JpcHQtY2xhc3Nlcy9cbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2p1c3RpbmZhZ25hbmkvbWl4d2l0aC5qc1xuICpcbiAqIEBhdXRob3IgQWxpbiBFdWdlbiBEZWFjIDxhZGVAdmVzdGVyZ2FhcmRjb21wYW55LmNvbT5cbiAqL1xuY2xhc3MgQnVpbGRlciB7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgQnVpbGRlciBpbnN0YW5jZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW3N1cGVyQ2xhc3M9Y2xhc3Mge31dXG4gICAgICovXG4gICAgY29uc3RydWN0b3Ioc3VwZXJDbGFzcyl7XG4gICAgICAgIHRoaXMuc3VwZXJDbGFzcyA9IHN1cGVyQ2xhc3MgfHwgY2xhc3Mge307XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWl4aW4gb25lIG9yIG1vcmUgbWl4aW4tY2xhc3Nlc1xuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheS48RnVuY3Rpb24+fSBtaXhpbnNcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIHN1cGNsYXNzIHdpdGggbWl4aW5zIGFwcGxpZWRcbiAgICAgKi9cbiAgICB3aXRoKC4uLm1peGlucyl7XG4gICAgICAgIHJldHVybiBtaXhpbnMucmVkdWNlKChjLCBtKSA9PiB7XG5cbiAgICAgICAgICAgIGlmKHR5cGVvZiBtICE9PSAnZnVuY3Rpb24nKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG0oYyk7XG4gICAgICAgIH0sIHRoaXMuc3VwZXJDbGFzcyk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCdWlsZGVyOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgT1JJR0lOQUxfTUlYSU4gfSBmcm9tICcuLy4uL1V0aWxzL3dyYXAnO1xuaW1wb3J0IHdyYXAgZnJvbSAnLi8uLi9VdGlscy93cmFwJztcblxuLyoqXG4gKiBSZWZlcmVuY2UgdG8gYSBtaXhpblxuICpcbiAqIEB0eXBlIHtTeW1ib2x9XG4gKi9cbmV4cG9ydCBjb25zdCBNSVhJTl9SRUZFUkVOQ0UgPSBTeW1ib2woJ21peGluUmVmJyk7XG5cbi8qKlxuICogRGVjb3JhdG9yIHRoYXQgc3RvcmVzIGEgcmVmZXJlbmNlIHRvIHRoZSBtaXhpbiBjbGFzcywgd2hpY2hcbiAqIHVsdGltYXRlbHkgY2FuIGJlIHVzZWQgZm9yIFwiaW5zdGFuY2Ugb2ZcIiBjaGVja3MuXG4gKlxuICogQHNlZSB3cmFwXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWl4aW5DbGFzc1xuICpcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBEZWNvcmF0ZWQgbWl4aW5cbiAqL1xuY29uc3QgQmFyZU1peGluID0gKG1peGluQ2xhc3MpID0+IHdyYXAobWl4aW5DbGFzcywgKHN1cGVyY2xhc3MpID0+IHtcbiAgICAvLyBBcHBseSB0aGUgbWl4aW4gY2xhc3NcbiAgICBsZXQgYXBwID0gbWl4aW5DbGFzcyhzdXBlcmNsYXNzKTtcblxuICAgIC8vIEFkZCByZWZlcmVuY2UgdG8gdGhlIHdyYXBwZWQgbWl4aW4gY2xhc3MsIHNvIHRoYXQgd2UgY2FuIGVuYWJsZVxuICAgIC8vIGEgXCJpbnN0YW5jZSBvZlwiIHN1cHBvcnQuXG4gICAgYXBwLnByb3RvdHlwZVtNSVhJTl9SRUZFUkVOQ0VdID0gbWl4aW5DbGFzc1tPUklHSU5BTF9NSVhJTl07XG5cbiAgICByZXR1cm4gYXBwO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEJhcmVNaXhpbjsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB3cmFwIGZyb20gJy4vLi4vVXRpbHMvd3JhcCc7XG5cbi8qKlxuICogQ2FjaGVkIG1peGluIGNsYXNzIHJlZmVyZW5jZVxuICpcbiAqIEB0eXBlIHtTeW1ib2x9XG4gKi9cbmV4cG9ydCBjb25zdCBDQUNIRURfUkVGRVJFTkNFID0gU3ltYm9sKCdjYWNoZWRSZWYnKTtcblxuLyoqXG4gKiBEZWNvcmF0ZSB0aGUgZ2l2ZW4gbWl4aW4gY2xhc3Mgd2l0aCBhIFwiY2FjaGVkIGRlY29yYXRvclwiLlxuICpcbiAqIE1ldGhvZCB3aWxsIGVuc3VyZSB0aGF0IGlmIHRoZSBnaXZlbiBtaXhpbiBoYXMgYWxyZWFkeSBiZWVuIGFwcGxpZWQsXG4gKiB0aGVuIGl0IHdpbGwgYmUgcmV0dXJuZWQgLyBhcHBsaWVkIGEgc2luZ2xlIHRpbWUsIHJhdGhlciB0aGFuIG11bHRpcGxlXG4gKiB0aW1lcy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtaXhpbkNsYXNzXG4gKlxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cbmNvbnN0IENhY2hlZCA9IChtaXhpbkNsYXNzKSA9PiB3cmFwKG1peGluQ2xhc3MsIChzdXBlcmNsYXNzKSA9PiB7XG4gICAgLy8gT2J0YWluIGNhY2hlZCByZWZlcmVuY2UuLi5cbiAgICBsZXQgY2FjaGVkUmVmZXJlbmNlID0gbWl4aW5DbGFzc1tDQUNIRURfUkVGRVJFTkNFXTtcblxuICAgIC8vIElmIHRoZXJlIGlzIG5vIGNhY2hlZCByZWZlcmVuY2UsIHRoZW4gd2UgY3JlYXRlIG9uZSBvbnRvXG4gICAgLy8gdGhlIGdpdmVuIG1peGluIGNsYXNzXG4gICAgaWYoICEgY2FjaGVkUmVmZXJlbmNlKXtcblxuICAgICAgICAvLyBDcmVhdGUgYSBuZXcgc3ltYm9sIGluIHRoZSBtaXhpbiBjbGFzcywgdXNpbmcgdGhlIGZ1bmN0aW9uJ3MgbmFtZVxuICAgICAgICAvLyBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0Z1bmN0aW9uL25hbWVcbiAgICAgICAgY2FjaGVkUmVmZXJlbmNlID0gbWl4aW5DbGFzc1tDQUNIRURfUkVGRVJFTkNFXSA9IFN5bWJvbChtaXhpbkNsYXNzLm5hbWUpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGlmIGdpdmVuIHN1cGVyY2xhc3MgYWxyZWFkeSBoYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdpdmVuIG1peGluIGNsYXNzXG4gICAgLy8gSWYgc28sIHRoZW4gcmV0dXJuIGl0LlxuICAgIGlmKHN1cGVyY2xhc3MuaGFzT3duUHJvcGVydHkoY2FjaGVkUmVmZXJlbmNlKSl7XG4gICAgICAgIHJldHVybiBzdXBlcmNsYXNzW2NhY2hlZFJlZmVyZW5jZV07XG4gICAgfVxuXG4gICAgLy8gRGVjb3JhdGUgdGhlIGdpdmVuIHN1cGVyIGNsYXNzXG4gICAgbGV0IGRlY29yYXRlZCA9IG1peGluQ2xhc3Moc3VwZXJjbGFzcyk7XG5cbiAgICAvLyBDYWNoZSB0aGUgcmVmZXJlbmNlIGludG8gdGhlIHN1cGVyY2xhc3NcbiAgICBzdXBlcmNsYXNzW2NhY2hlZFJlZmVyZW5jZV0gPSBkZWNvcmF0ZWQ7XG5cbiAgICAvLyBGaW5hbGx5LCByZXR1cm4gdGhlIGRlY29yYXRlZCBtaXhpbi5cbiAgICByZXR1cm4gZGVjb3JhdGVkO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENhY2hlZDsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IE9SSUdJTkFMX01JWElOIH0gZnJvbSAnLi8uLi9VdGlscy93cmFwJztcbmltcG9ydCB7IE1JWElOX1JFRkVSRU5DRSB9IGZyb20gJy4vQmFyZU1peGluJztcblxuLyoqXG4gKiBEZWNvcmF0ZXMgdGhlIGdpdmVuIG1peGluIGNsYXNzIHRvIHN1cHBvcnQgXCJpbnN0YW5jZSBvZlwiIG9wZXJhdGlvbi5cbiAqXG4gKiBUaGUgZ2l2ZW4gbWl4aW4gY2xhc3MgTVVTVCBiZSBkZWNvcmF0ZWQgd2l0aCB0aGUgXCJCYXJlTWl4aW5cIiBmb3IgdGhpc1xuICogdG8gd29yay5cbiAqXG4gKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1N5bWJvbC9oYXNJbnN0YW5jZVxuICogQHNlZSBCYXJlTWl4aW5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtaXhpbkNsYXNzXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gRGVjb3JhdGVkIG1peGluIGNsYXNzXG4gKi9cbmNvbnN0IEhhc0luc3RhbmNlID0gKG1peGluQ2xhc3MpID0+IHtcblxuICAgIC8vIElmIGdpdmVuIG1peGluIGNsYXNzIGFscmVhZHkgaGFzIGEgY3VzdG9tIFwiaGFzIGluc3RhbmNlXCJcbiAgICAvLyBzeW1ib2wsIHRoZW4gYWJvcnQgLSBqdXN0IHJldHVybiB0aGUgbWl4aW4sIHNpbmNlIHRoZXJlXG4gICAgLy8gaXMgbm8gbmVlZCB0byBhZGQgY3VzdG9tIGJlaGF2aW91ciB0byBpdC5cbiAgICBpZihtaXhpbkNsYXNzLmhhc093blByb3BlcnR5KFN5bWJvbC5oYXNJbnN0YW5jZSkpe1xuICAgICAgICByZXR1cm4gbWl4aW5DbGFzcztcbiAgICB9XG5cbiAgICAvLyBPdGhlcndpc2UsIHdlIGFkZCBhIGN1c3RvbSBTeW1ib2wuaGFzSW5zdGFuY2UgbWV0aG9kIGZvclxuICAgIC8vIHRoZSBtaXhpbiBjbGFzcy5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobWl4aW5DbGFzcywgU3ltYm9sLmhhc0luc3RhbmNlLCB7XG5cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKGluc3RhbmNlKXtcbiAgICAgICAgICAgIC8vIEZldGNoIHRoZSBvcmlnaW5hbCBtaXhpbiBjbGFzc1xuICAgICAgICAgICAgbGV0IG9yaWdpbmFsTWl4aW5DbGFzcyA9IHRoaXNbT1JJR0lOQUxfTUlYSU5dO1xuXG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBubyBvcmlnaW5hbCBtaXhpbiBjbGFzcywgdGhlbiB3ZSBzaW1wbHlcbiAgICAgICAgICAgIC8vIGFib3J0IC0gaXQgY2Fubm90IGJlIGFuIGluc3RhbmNlIG9mIHRoZSBnaXZlbi4uLlxuICAgICAgICAgICAgaWYoICEgb3JpZ2luYWxNaXhpbkNsYXNzKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIExvb3AgdGhyb3VnaCB0aGUgZ2l2ZW4gaW5zdGFuY2UncyBwcm90b3R5cGUgY2hhaW5cbiAgICAgICAgICAgIHdoaWxlKGluc3RhbmNlICE9PSBudWxsKXtcblxuICAgICAgICAgICAgICAgIC8vIElmIGEgcmVmZXJlbmNlIGhhcyBiZWVuIHN0YXRlZCBvbiB0aGUgbWl4aW4gY2xhc3MgYW5kIGl0XG4gICAgICAgICAgICAgICAgLy8gbWF0Y2hlcyB0aGUgb3JpZ2luYWwgbWl4aW4sIHdlIGFzc3VtZSB0aGF0XG4gICAgICAgICAgICAgICAgaWYoaW5zdGFuY2UuaGFzT3duUHJvcGVydHkoTUlYSU5fUkVGRVJFTkNFKSAmJiBpbnN0YW5jZVtNSVhJTl9SRUZFUkVOQ0VdID09PSBvcmlnaW5hbE1peGluQ2xhc3Mpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBGZXRjaCB0aGUgbmV4dCBwcm90b3R5cGVcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihpbnN0YW5jZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIElmIG5vdGhpbmcgd2FzIG1hdGNoZWQsIHRoZW4gd2UgYXNzdW1lIHRoYXQgdGhlIGluc3RhbmNlc1xuICAgICAgICAgICAgLy8gc2ltcGx5IGRvIG5vdCBtYXRjaC5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICAvLyBGaW5hbGx5LCByZXR1cm4gdGhlIGRlY29yYXRlZCBtaXhpbiBjbGFzc1xuICAgIHJldHVybiBtaXhpbkNsYXNzO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSGFzSW5zdGFuY2U7IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFJlZmVyZW5jZSB0byBhbiBvcmlnaW5hbCBtaXhpblxuICpcbiAqIEB0eXBlIHtTeW1ib2x9XG4gKi9cbmV4cG9ydCBjb25zdCBPUklHSU5BTF9NSVhJTiA9IFN5bWJvbCgnb3JpZ2luYWxNaXhpbicpO1xuXG4vKipcbiAqIFNldHMgdGhlIHByb3RvdHlwZSBvZiB0aGUgd3JhcHBlciB0byBiZSB0aGUgZ2l2ZW4gbWl4aW4gY2xhc3NcbiAqIGFuZCBzdG9yZXMgYSByZWZlcmVuY2UgdG8gdGhlIG9yaWdpbmFsIG1peGluLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1peGluQ2xhc3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHdyYXBwZXJcbiAqXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gV3JhcHBlclxuICovXG5jb25zdCB3cmFwID0gKG1peGluQ2xhc3MsIHdyYXBwZXIpID0+IHtcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2Yod3JhcHBlciwgbWl4aW5DbGFzcyk7XG5cbiAgICBpZiAoIW1peGluQ2xhc3NbT1JJR0lOQUxfTUlYSU5dKSB7XG4gICAgICAgIG1peGluQ2xhc3NbT1JJR0lOQUxfTUlYSU5dID0gbWl4aW5DbGFzcztcbiAgICB9XG5cbiAgICByZXR1cm4gd3JhcHBlcjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdyYXA7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQmFyZU1peGluIGZyb20gJy4vRGVjb3JhdG9ycy9CYXJlTWl4aW4nO1xuaW1wb3J0IEhhc0luc3RhbmNlIGZyb20gJy4vRGVjb3JhdG9ycy9IYXNJbnN0YW5jZSc7XG5pbXBvcnQgQ2FjaGVkIGZyb20gJy4vRGVjb3JhdG9ycy9DYWNoZWQnO1xuXG4vKipcbiAqIERlY2xhcmUgYSBtaXhpbiAtIGRlY29yYXRlcyB0aGUgZ2l2ZW4gbWl4aW4gY2xhc3Mgd2l0aFxuICogYSBcImNhY2hlZCwgaGFzIGluc3RhbmNlIGFuZCBiYXJlIG1peGluXCIgZGVjb3JhdG9ycy5cbiAqXG4gKiBAc2VlIEJhcmVNaXhpblxuICogQHNlZSBIYXNJbnN0YW5jZVxuICogQHNlZSBDYWNoZWRcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtaXhpbkNsYXNzXG4gKlxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cbmNvbnN0IERlY2xhcmVNaXhpbiA9IChtaXhpbkNsYXNzKSA9PiB7XG4gICAgcmV0dXJuIENhY2hlZChcbiAgICAgICAgSGFzSW5zdGFuY2UoXG4gICAgICAgICAgICBCYXJlTWl4aW4obWl4aW5DbGFzcylcbiAgICAgICAgKVxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEZWNsYXJlTWl4aW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQnVpbGRlciBmcm9tICcuL0J1aWxkZXInO1xuXG4vKipcbiAqIE1peGluIEJ1aWxkZXIgd3JhcHBlclxuICpcbiAqIEFsbG93cyB5b3UgdG8gZXh0ZW5kIGEgY2xhc3Mgd2l0aCBvbmUgb3IgbW9yZSBtaXhpbi1jbGFzc2VzLlxuICpcbiAqIEBzZWUgQnVpbGRlclxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IFtzdXBlckNsYXNzPWNsYXNzIHt9XVxuICovXG5jb25zdCBtaXggPSAoc3VwZXJDbGFzcykgPT4gbmV3IEJ1aWxkZXIoc3VwZXJDbGFzcyk7XG5cbmV4cG9ydCBkZWZhdWx0IG1peDsiLCIoZnVuY3Rpb24gKHJvb3QsIGZhY3Rvcnkpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgLyppc3RhbmJ1bCBpZ25vcmUgbmV4dDpjYW50IHRlc3QqL1xuICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICBkZWZpbmUoW10sIGZhY3RvcnkpO1xuICB9IGVsc2Uge1xuICAgIC8vIEJyb3dzZXIgZ2xvYmFsc1xuICAgIHJvb3Qub2JqZWN0UGF0aCA9IGZhY3RvcnkoKTtcbiAgfVxufSkodGhpcywgZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG4gIGZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkge1xuICAgIGlmKG9iaiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgLy90byBoYW5kbGUgb2JqZWN0cyB3aXRoIG51bGwgcHJvdG90eXBlcyAodG9vIGVkZ2UgY2FzZT8pXG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApXG4gIH1cblxuICBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlKXtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgZm9yICh2YXIgaSBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKGhhc093blByb3BlcnR5KHZhbHVlLCBpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9TdHJpbmcodHlwZSl7XG4gICAgcmV0dXJuIHRvU3RyLmNhbGwodHlwZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc09iamVjdChvYmope1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiB0b1N0cmluZyhvYmopID09PSBcIltvYmplY3QgT2JqZWN0XVwiO1xuICB9XG5cbiAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uKG9iail7XG4gICAgLyppc3RhbmJ1bCBpZ25vcmUgbmV4dDpjYW50IHRlc3QqL1xuICAgIHJldHVybiB0b1N0ci5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gIH1cblxuICBmdW5jdGlvbiBpc0Jvb2xlYW4ob2JqKXtcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nIHx8IHRvU3RyaW5nKG9iaikgPT09ICdbb2JqZWN0IEJvb2xlYW5dJztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEtleShrZXkpe1xuICAgIHZhciBpbnRLZXkgPSBwYXJzZUludChrZXkpO1xuICAgIGlmIChpbnRLZXkudG9TdHJpbmcoKSA9PT0ga2V5KSB7XG4gICAgICByZXR1cm4gaW50S2V5O1xuICAgIH1cbiAgICByZXR1cm4ga2V5O1xuICB9XG5cbiAgZnVuY3Rpb24gZmFjdG9yeShvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cblxuICAgIHZhciBvYmplY3RQYXRoID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqZWN0UGF0aCkucmVkdWNlKGZ1bmN0aW9uKHByb3h5LCBwcm9wKSB7XG4gICAgICAgIGlmKHByb3AgPT09ICdjcmVhdGUnKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3h5O1xuICAgICAgICB9XG5cbiAgICAgICAgLyppc3RhbmJ1bCBpZ25vcmUgZWxzZSovXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0UGF0aFtwcm9wXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHByb3h5W3Byb3BdID0gb2JqZWN0UGF0aFtwcm9wXS5iaW5kKG9iamVjdFBhdGgsIG9iaik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHJveHk7XG4gICAgICB9LCB7fSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGhhc1NoYWxsb3dQcm9wZXJ0eShvYmosIHByb3ApIHtcbiAgICAgIHJldHVybiAob3B0aW9ucy5pbmNsdWRlSW5oZXJpdGVkUHJvcHMgfHwgKHR5cGVvZiBwcm9wID09PSAnbnVtYmVyJyAmJiBBcnJheS5pc0FycmF5KG9iaikpIHx8IGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2hhbGxvd1Byb3BlcnR5KG9iaiwgcHJvcCkge1xuICAgICAgaWYgKGhhc1NoYWxsb3dQcm9wZXJ0eShvYmosIHByb3ApKSB7XG4gICAgICAgIHJldHVybiBvYmpbcHJvcF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0KG9iaiwgcGF0aCwgdmFsdWUsIGRvTm90UmVwbGFjZSl7XG4gICAgICBpZiAodHlwZW9mIHBhdGggPT09ICdudW1iZXInKSB7XG4gICAgICAgIHBhdGggPSBbcGF0aF07XG4gICAgICB9XG4gICAgICBpZiAoIXBhdGggfHwgcGF0aC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHNldChvYmosIHBhdGguc3BsaXQoJy4nKS5tYXAoZ2V0S2V5KSwgdmFsdWUsIGRvTm90UmVwbGFjZSk7XG4gICAgICB9XG4gICAgICB2YXIgY3VycmVudFBhdGggPSBwYXRoWzBdO1xuICAgICAgdmFyIGN1cnJlbnRWYWx1ZSA9IGdldFNoYWxsb3dQcm9wZXJ0eShvYmosIGN1cnJlbnRQYXRoKTtcbiAgICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBpZiAoY3VycmVudFZhbHVlID09PSB2b2lkIDAgfHwgIWRvTm90UmVwbGFjZSkge1xuICAgICAgICAgIG9ialtjdXJyZW50UGF0aF0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VycmVudFZhbHVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoY3VycmVudFZhbHVlID09PSB2b2lkIDApIHtcbiAgICAgICAgLy9jaGVjayBpZiB3ZSBhc3N1bWUgYW4gYXJyYXlcbiAgICAgICAgaWYodHlwZW9mIHBhdGhbMV0gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgb2JqW2N1cnJlbnRQYXRoXSA9IFtdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9ialtjdXJyZW50UGF0aF0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2V0KG9ialtjdXJyZW50UGF0aF0sIHBhdGguc2xpY2UoMSksIHZhbHVlLCBkb05vdFJlcGxhY2UpO1xuICAgIH1cblxuICAgIG9iamVjdFBhdGguaGFzID0gZnVuY3Rpb24gKG9iaiwgcGF0aCkge1xuICAgICAgaWYgKHR5cGVvZiBwYXRoID09PSAnbnVtYmVyJykge1xuICAgICAgICBwYXRoID0gW3BhdGhdO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcGF0aCA9IHBhdGguc3BsaXQoJy4nKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFwYXRoIHx8IHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAhIW9iajtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBqID0gZ2V0S2V5KHBhdGhbaV0pO1xuXG4gICAgICAgIGlmKCh0eXBlb2YgaiA9PT0gJ251bWJlcicgJiYgaXNBcnJheShvYmopICYmIGogPCBvYmoubGVuZ3RoKSB8fFxuICAgICAgICAgIChvcHRpb25zLmluY2x1ZGVJbmhlcml0ZWRQcm9wcyA/IChqIGluIE9iamVjdChvYmopKSA6IGhhc093blByb3BlcnR5KG9iaiwgaikpKSB7XG4gICAgICAgICAgb2JqID0gb2JqW2pdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgb2JqZWN0UGF0aC5lbnN1cmVFeGlzdHMgPSBmdW5jdGlvbiAob2JqLCBwYXRoLCB2YWx1ZSl7XG4gICAgICByZXR1cm4gc2V0KG9iaiwgcGF0aCwgdmFsdWUsIHRydWUpO1xuICAgIH07XG5cbiAgICBvYmplY3RQYXRoLnNldCA9IGZ1bmN0aW9uIChvYmosIHBhdGgsIHZhbHVlLCBkb05vdFJlcGxhY2Upe1xuICAgICAgcmV0dXJuIHNldChvYmosIHBhdGgsIHZhbHVlLCBkb05vdFJlcGxhY2UpO1xuICAgIH07XG5cbiAgICBvYmplY3RQYXRoLmluc2VydCA9IGZ1bmN0aW9uIChvYmosIHBhdGgsIHZhbHVlLCBhdCl7XG4gICAgICB2YXIgYXJyID0gb2JqZWN0UGF0aC5nZXQob2JqLCBwYXRoKTtcbiAgICAgIGF0ID0gfn5hdDtcbiAgICAgIGlmICghaXNBcnJheShhcnIpKSB7XG4gICAgICAgIGFyciA9IFtdO1xuICAgICAgICBvYmplY3RQYXRoLnNldChvYmosIHBhdGgsIGFycik7XG4gICAgICB9XG4gICAgICBhcnIuc3BsaWNlKGF0LCAwLCB2YWx1ZSk7XG4gICAgfTtcblxuICAgIG9iamVjdFBhdGguZW1wdHkgPSBmdW5jdGlvbihvYmosIHBhdGgpIHtcbiAgICAgIGlmIChpc0VtcHR5KHBhdGgpKSB7XG4gICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICB9XG4gICAgICBpZiAob2JqID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICAgIH1cblxuICAgICAgdmFyIHZhbHVlLCBpO1xuICAgICAgaWYgKCEodmFsdWUgPSBvYmplY3RQYXRoLmdldChvYmosIHBhdGgpKSkge1xuICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gb2JqZWN0UGF0aC5zZXQob2JqLCBwYXRoLCAnJyk7XG4gICAgICB9IGVsc2UgaWYgKGlzQm9vbGVhbih2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdFBhdGguc2V0KG9iaiwgcGF0aCwgZmFsc2UpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHJldHVybiBvYmplY3RQYXRoLnNldChvYmosIHBhdGgsIDApO1xuICAgICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICB2YWx1ZS5sZW5ndGggPSAwO1xuICAgICAgfSBlbHNlIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgZm9yIChpIGluIHZhbHVlKSB7XG4gICAgICAgICAgaWYgKGhhc1NoYWxsb3dQcm9wZXJ0eSh2YWx1ZSwgaSkpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB2YWx1ZVtpXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBvYmplY3RQYXRoLnNldChvYmosIHBhdGgsIG51bGwpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBvYmplY3RQYXRoLnB1c2ggPSBmdW5jdGlvbiAob2JqLCBwYXRoIC8qLCB2YWx1ZXMgKi8pe1xuICAgICAgdmFyIGFyciA9IG9iamVjdFBhdGguZ2V0KG9iaiwgcGF0aCk7XG4gICAgICBpZiAoIWlzQXJyYXkoYXJyKSkge1xuICAgICAgICBhcnIgPSBbXTtcbiAgICAgICAgb2JqZWN0UGF0aC5zZXQob2JqLCBwYXRoLCBhcnIpO1xuICAgICAgfVxuXG4gICAgICBhcnIucHVzaC5hcHBseShhcnIsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMikpO1xuICAgIH07XG5cbiAgICBvYmplY3RQYXRoLmNvYWxlc2NlID0gZnVuY3Rpb24gKG9iaiwgcGF0aHMsIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgdmFyIHZhbHVlO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gcGF0aHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKCh2YWx1ZSA9IG9iamVjdFBhdGguZ2V0KG9iaiwgcGF0aHNbaV0pKSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgfTtcblxuICAgIG9iamVjdFBhdGguZ2V0ID0gZnVuY3Rpb24gKG9iaiwgcGF0aCwgZGVmYXVsdFZhbHVlKXtcbiAgICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcGF0aCA9IFtwYXRoXTtcbiAgICAgIH1cbiAgICAgIGlmICghcGF0aCB8fCBwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfVxuICAgICAgaWYgKG9iaiA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHBhdGggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBvYmplY3RQYXRoLmdldChvYmosIHBhdGguc3BsaXQoJy4nKSwgZGVmYXVsdFZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGN1cnJlbnRQYXRoID0gZ2V0S2V5KHBhdGhbMF0pO1xuICAgICAgdmFyIG5leHRPYmogPSBnZXRTaGFsbG93UHJvcGVydHkob2JqLCBjdXJyZW50UGF0aClcbiAgICAgIGlmIChuZXh0T2JqID09PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBuZXh0T2JqO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb2JqZWN0UGF0aC5nZXQob2JqW2N1cnJlbnRQYXRoXSwgcGF0aC5zbGljZSgxKSwgZGVmYXVsdFZhbHVlKTtcbiAgICB9O1xuXG4gICAgb2JqZWN0UGF0aC5kZWwgPSBmdW5jdGlvbiBkZWwob2JqLCBwYXRoKSB7XG4gICAgICBpZiAodHlwZW9mIHBhdGggPT09ICdudW1iZXInKSB7XG4gICAgICAgIHBhdGggPSBbcGF0aF07XG4gICAgICB9XG5cbiAgICAgIGlmIChvYmogPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNFbXB0eShwYXRoKSkge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfVxuICAgICAgaWYodHlwZW9mIHBhdGggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBvYmplY3RQYXRoLmRlbChvYmosIHBhdGguc3BsaXQoJy4nKSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBjdXJyZW50UGF0aCA9IGdldEtleShwYXRoWzBdKTtcbiAgICAgIGlmICghaGFzU2hhbGxvd1Byb3BlcnR5KG9iaiwgY3VycmVudFBhdGgpKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9XG5cbiAgICAgIGlmKHBhdGgubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgICAgICBvYmouc3BsaWNlKGN1cnJlbnRQYXRoLCAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgb2JqW2N1cnJlbnRQYXRoXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdFBhdGguZGVsKG9ialtjdXJyZW50UGF0aF0sIHBhdGguc2xpY2UoMSkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cblxuICAgIHJldHVybiBvYmplY3RQYXRoO1xuICB9XG5cbiAgdmFyIG1vZCA9IGZhY3RvcnkoKTtcbiAgbW9kLmNyZWF0ZSA9IGZhY3Rvcnk7XG4gIG1vZC53aXRoSW5oZXJpdGVkUHJvcHMgPSBmYWN0b3J5KHtpbmNsdWRlSW5oZXJpdGVkUHJvcHM6IHRydWV9KVxuICByZXR1cm4gbW9kO1xufSk7XG4iLCJpbXBvcnQgY3JlYXRlIGZyb20gXCIuL3V0aWxzL2NyZWF0ZVwiO1xuaW1wb3J0IGVsZW1lbnRzIGZyb20gXCIuL3V0aWxzL2VsZW1lbnRzXCI7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoZXYpID0+IHtcbiAgICBcbiAgICB3aW5kb3cuZWxlbWVudHMgPSBlbGVtZW50cztcbiAgICBcbiAgICBjb25zb2xlLmxvZyhldik7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY3JlYXRlLmFsbCgpO1xuICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0ZWRcIik7XG4gICAgfSwgNTAwMCk7XG4gICAgLy8gY3JlYXRlLmFsbCgpO1xufSk7XG4iLCJpbXBvcnQgRE9NU3RyaW5nIGZyb20gXCIuLy4uL3R5cGUvRE9NU3RyaW5nLmpzXCI7XG5cbi8qKlxuKiBBZGRzIGZ1bmN0aW9uYWxpdHkgdG8gYGFyaWEtY2hlY2tlZGAgYXR0cmlidXRlLlxuKlxuKiBDaGFuZ2VzIHZhbHVlIHdoZW4gY2xpY2tlZCBvciB3aGlsZSBmb2N1c2VkIHByZXNzaW5nIGBTcGFjZWAuXG4qXG4qIHtAbGluayBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWNoZWNrZWR9XG4qIEBlbWl0cyBjbGljayB3aGVuIGNsaWNrZWQgb3Igd2hpbGUgZm9jdXNlZCBwcmVzc2luZyBgU3BhY2VgLlxuKiBAZW1pdHMgY2hhbmdlIHdoZW4gY2xpY2tlZCBvciB3aGlsZSBmb2N1c2VkIHByZXNzaW5nIGBTcGFjZWAuXG4qL1xubGV0IEFyaWFDaGVja2VkID0gKHN1cGVyY2xhc3MpID0+IGNsYXNzIGV4dGVuZHMgc3VwZXJjbGFzcyB7XG5cblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdHN1cGVyKC4uLmFyZ3MpO1xuXG5cdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwia2V5XCIsIHRoaXMub25DaGVja2VkLmJpbmQodGhpcyksIHtrZXk6IFwiU3BhY2VcIn0pO1xuXHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25DaGVja2VkLmJpbmQodGhpcykpO1xuXHR9XG5cblx0b25DaGVja2VkKGV2KSB7XG5cdFx0aWYoZXYpIGV2LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRpZih0aGlzLmRpc2FibGVkICE9PSB0cnVlKSB7XG5cdFx0XHR0aGlzLmNoZWNrZWQgPSBET01TdHJpbmcudG9nZ2xlKHRoaXMuY2hlY2tlZCk7XG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IElucHV0RXZlbnQoXCJpbnB1dFwiKSk7XG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiY2hhbmdlXCIsIHsgYnViYmxlczogdHJ1ZSB9KSk7XG5cdFx0fVxuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBcmlhQ2hlY2tlZDsiLCJpbXBvcnQgYm9vbGVhbiBmcm9tIFwiLi8uLi90eXBlL2Jvb2xlYW5cIjtcclxuXHJcbi8qKlxyXG4qIEFkZHMgZnVuY3Rpb25hbGl0eSB0byBgYXJpYS1leHBhbmRlZGAgYXR0cmlidXRlXHJcbiogQHRvZG8gYWRkIGEgc2V0dGluZyB0byBkZWZpbmUgaG93IHRoZSB2aXNpYmlsaXR5IHNob3VsZCBiZSB0b2dnbGVkXHJcbiovXHJcbmxldCBBcmlhRXhwYW5kZWQgPSAoc3VwZXJjbGFzcykgPT4gY2xhc3MgZXh0ZW5kcyBzdXBlcmNsYXNzIHtcclxuXHQvKipcclxuXHQqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbGVtZW50IEVsZW1lbnQgd2l0aCBhbiBgYXJpYS1leHBhbmRlZGAgYXR0cmlidXRlXHJcblx0Ki9cclxuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XHJcblx0XHRzdXBlciguLi5hcmdzKTtcclxuXHRcdGlmICh0aGlzLmV4cGFuZGVkICE9PSB1bmRlZmluZWQpIHsgLy8gdG9kbzogYWRkIHdoZW4gZmlyc3QgdGltZSBhcmlhLWV4cGFuZGVkIGlzIGJvb2xlYW5cclxuXHRcdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vbmV4cGFuZGVkLmJpbmQodGhpcykpO1xyXG5cdFx0XHQvLyB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlcIiwgdGhpcy5vbmV4cGFuZGVkLmJpbmQodGhpcyksIHsga2V5OiBbXCJFbnRlclwiLCBcIlNwYWNlXCJdIH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b25leHBhbmRlZChldikge1xyXG5cdFx0aWYgKHR5cGVvZiBzdXBlci5vbmV4cGFuZGVkID09IFwiZnVuY3Rpb25cIikgc3VwZXIub25leHBhbmRlZChldik7XHJcblx0XHRpZihldiAmJiB0eXBlb2YgZXYucHJldmVudERlZmF1bHQgPT09IFwiZnVuY3Rpb25cIikgZXYucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRpZih0aGlzLmRpc2FibGVkICE9PSB0cnVlKSB7XHJcblx0XHRcdHRoaXMuZXhwYW5kZWQgPSBib29sZWFuLnRvZ2dsZSh0aGlzLmV4cGFuZGVkKTtcclxuXHJcblx0XHRcdGlmKHRoaXMuZXhwYW5kZWQpIHtcclxuXHRcdFx0XHR0aGlzLmNvbnRyb2xzLmZvckVhY2goY29udHJvbCA9PiB7XHJcblx0XHRcdFx0XHRjb250cm9sLmVsZW1lbnQuaGlkZGVuID0gZmFsc2U7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5jb250cm9scy5mb3JFYWNoKGNvbnRyb2wgPT4ge1xyXG5cdFx0XHRcdFx0Y29udHJvbC5lbGVtZW50LmhpZGRlbiA9IHRydWU7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcmlhRXhwYW5kZWQ7IiwiaW1wb3J0IERPTVN0cmluZyBmcm9tIFwiLi8uLi90eXBlL0RPTVN0cmluZ1wiO1xyXG5cclxuLyoqXHJcbiogQWRkcyBmdW5jdGlvbmFsaXR5IHRvIGBhcmlhLXByZXNzZWRgIGF0dHJpYnV0ZS5cclxuKlxyXG4qIENoYW5nZXMgdmFsdWUgd2hlbiBjbGlja2VkIG9yIHdoaWxlIGZvY3VzZWQgcHJlc3NpbmcgYFNwYWNlYCBvciBgRW50ZXJgLlxyXG4qXHJcbioge0BsaW5rIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtcHJlc3NlZH1cclxuKiBAZW1pdHMgY2xpY2sgd2hlbiBjbGlja2VkIG9yIHdoaWxlIGZvY3VzZWQgcHJlc3NpbmcgYFNwYWNlYCBvciBgRW50ZXJgLlxyXG4qL1xyXG5sZXQgQXJpYVByZXNzZWQgPSAoc3VwZXJjbGFzcykgPT4gY2xhc3MgZXh0ZW5kcyBzdXBlcmNsYXNzIHtcclxuXHQvKipcclxuXHQqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbGVtZW50IEVsZW1lbnQgd2l0aCBhbiBgYXJpYS1wcmVzc2VkYCBhdHRyaWJ1dGVcclxuXHQqL1xyXG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcclxuXHRcdHN1cGVyKC4uLmFyZ3MpO1xyXG5cclxuXHRcdGlmKHRoaXMucHJlc3NlZCAhPT0gdW5kZWZpbmVkKSB7IC8vIHRvZG86IGFkZCB3aGVuIGZpcnN0IHRpbWUgYXJpYS1wcmVzc2VkIGlzIGJvb2xlYW5cclxuXHRcdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vblByZXNzZWQuYmluZCh0aGlzKSk7XHJcblx0XHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm9uUHJlc3NlZC5iaW5kKHRoaXMpLCB7IGtleTogW1wiRW50ZXJcIiwgXCJTcGFjZVwiXX0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b25QcmVzc2VkKGV2KSB7XHJcblx0XHRpZiAodHlwZW9mIHN1cGVyLm9uUHJlc3NlZCA9PSBcImZ1bmN0aW9uXCIpIHN1cGVyLm9uUHJlc3NlZChldik7XHJcblxyXG5cdFx0aWYodGhpcy5kaXNhYmxlZCAhPT0gdHJ1ZSkge1xyXG5cdFx0XHR0aGlzLnByZXNzZWQgPSBET01TdHJpbmcudG9nZ2xlKHRoaXMucHJlc3NlZCk7XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXJpYVByZXNzZWQ7IiwiaW1wb3J0IGJvb2xlYW4gZnJvbSBcIi4vLi4vdHlwZS9ib29sZWFuXCI7XHJcblxyXG4vKipcclxuICogZ2V0cyBhbmQgc2V0cyB0aGUgYGFyaWEtc2VsZWN0ZWRgIGF0dHJpYnV0ZS5cclxuICpcclxuICogSW5kaWNhdGVzIGlmIGEgZWxlbWVudCBpcyBzZWxlY3RhYmxlXHJcbiAqXHJcbiAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1zZWxlY3RlZFxyXG4gKi9cclxubGV0IEFyaWFTZWxlY3RlZCA9IChzdXBlcmNsYXNzKSA9PiBjbGFzcyBleHRlbmRzIHN1cGVyY2xhc3Mge1xyXG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcclxuXHRcdHN1cGVyKC4uLmFyZ3MpO1xyXG5cclxuXHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25TZWxlY3RlZC5iaW5kKHRoaXMpKTtcclxuXHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm9uU2VsZWN0ZWQuYmluZCh0aGlzKSwge2tleTogW1wiU3BhY2VcIiwgXCJFbnRlclwiXX0pO1xyXG5cdH1cclxuXHJcblx0b25TZWxlY3RlZChldikge1xyXG5cdFx0aWYodHlwZW9mIHN1cGVyLm9uU2VsZWN0ZWQgPT0gXCJmdW5jdGlvblwiKSBzdXBlci5vblNlbGVjdGVkKGV2KTtcclxuXHRcdHRoaXMuc2VsZWN0ZWQgPSBib29sZWFuLnRvZ2dsZSh0aGlzLnNlbGVjdGVkKTtcclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcmlhU2VsZWN0ZWQ7IiwiLyoqXG4gKiBcbiAqL1xuY29uc3Qgcm9sZXMgPSB7XG5cdGFsZXJ0OiB7XG5cdFx0c3VwZXI6IFtcInNlY3Rpb25cIl0sXG5cdFx0c3ViOiBbXCJhbGVydGRpYWxvZ1wiXSxcblx0XHRkZWZhdWx0czoge1xuXHRcdFx0bGl2ZTogXCJhc3NlcnRpdmVcIixcblx0XHRcdGF0b21pYzogdHJ1ZVxuXHRcdH1cblx0fSxcblx0YWxlcnRkaWFsb2c6IHsgc3VwZXI6IFtcImFsZXJ0XCIsIFwiZGlhbG9nXCJdIH0sXG5cdGFwcGxpY2F0aW9uOiB7IHN1cGVyOiBbXCJzdHJ1Y3R1cmVcIl0gfSxcblx0YXJ0aWNsZToge1xuXHRcdHN1cGVyOiBbXCJkb2N1bWVudFwiXSxcblx0XHRpbXBsaWNpdDogW1wiYXJ0aWNsZTpub3QoW3JvbGUpXCJdXG5cdH0sXG5cdC8qKiBAdG9kbyBtb3JlIHN0cmljdCBiYW5uZXIgc2VsZWN0b3IgICovXG5cdGJhbm5lcjoge1xuXHRcdHN1cGVyOiBbXCJsYW5kbWFya1wiXSxcblx0XHRpbXBsaWNpdDogW1wiaGVhZGVyOm5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdGJ1dHRvbjoge1xuXHRcdHN1cGVyOiBbXCJjb21tYW5kXCJdLFxuXHRcdGltcGxpY2l0OiBbXCJidXR0b246bm90KFtyb2xlXSlcIiwgXCJpbnB1dFt0eXBlPSdidXR0b24nXTpub3QoW3JvbGVdKVwiLFxuXHRcdFx0XCJpbnB1dFt0eXBlPSdyZXNldCddOm5vdChbcm9sZV0pXCIsIFwiaW5wdXRbdHlwZT0naW1hZ2UnXTpub3QoW3JvbGVdKVwiLFxuXHRcdFx0XCJpbnB1dFt0eXBlPSdzdWJtaXQnXTpub3QoW3JvbGVdKVwiLCBcInN1bW1hcnk6bm90KFtyb2xlXSlcIl1cblx0fSxcblx0Y2VsbDoge1xuXHRcdHN1cGVyOiBbXCJzZWN0aW9uXCJdLFxuXHRcdHN1YjogW1wiY29sdW1uaGVhZGVyXCIsIFwicm93aGVhZGVyXCIsIFwiZ3JpZGNlbGxcIl0sXG5cdFx0Y29udGV4dDogW1wicm93XCJdLFxuXHRcdGltcGxpY2l0OiBbXCJ0YWJsZSB0ZDpub3QoW3JvbGVdKVwiXVxuXHR9LFxuXHRjaGVja2JveDoge1xuXHRcdHN1cGVyOiBbXCJpbnB1dFwiXSxcblx0XHRzdWI6IFtcIm1lbnVpdGVtY2hlY2tib3hcIiwgXCJzd2l0Y2hcIl0sXG5cdFx0aW1wbGljaXQ6IFtcImlucHV0W3R5cGU9J2NoZWNrYm94J106bm90KFtyb2xlXSlcIl0sXG5cdFx0ZGVmYXVsdHM6IHtcblx0XHRcdGNoZWNrZWQ6IHRydWVcblx0XHR9XG5cdH0sXG5cdGNvbHVtbmhlYWRlcjoge1xuXHRcdHN1cGVyOiBbXCJjZWxsXCIsIFwiZ3JpZGNlbGxcIiwgXCJzZWN0aW9uaGVhZFwiXSxcblx0XHRjb250ZXh0OiBbXCJyb3dcIl0sXG5cdFx0aW1wbGljaXQ6IFtcInRoZWFkIHRoOm5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdC8qKiBAdG9kbyBzaXplIGF0dHJpYnV0ZSBkb2Vzbid0IGNoZWNrIGZhdWx0eSB2YWx1ZXMgKi9cblx0Y29tYm9ib3g6IHtcblx0XHRzdXBlcjogW1wic2VsZWN0XCJdLFxuXHRcdG93bnM6IFtcInRleHRib3hcIiwgXCJsaXN0Ym94XCIsIFwidHJlZVwiLCBcImdyaWRcIiwgXCJkaWFsb2dcIl0sXG5cdFx0aW1wbGljaXQ6IFtcImlucHV0W3R5cGU9J2VtYWlsJ11bbGlzdF06bm90KFtyb2xlXSlcIixcblx0XHRcdFwiaW5wdXRbdHlwZT0ndGV4dCddW2xpc3RdOm5vdChbcm9sZV0pXCIsIFwiaW5wdXRbdHlwZT0nc2VhcmNoJ11bbGlzdF06bm90KFtyb2xlXSlcIixcblx0XHRcdFwiaW5wdXRbdHlwZT0ndGVsJ11bbGlzdF06bm90KFtyb2xlXSlcIiwgXCJpbnB1dFt0eXBlPSd1cmwnXVtsaXN0XTpub3QoW3JvbGVdKVwiLFxuXHRcdFx0XCJzZWxlY3Q6bm90KFttdWx0aXBsZV0pOm5vdChbc2l6ZV0pOm5vdChbcm9sZV0pXCIsIFwic2VsZWN0Om5vdChbbXVsdGlwbGVdKVtzaXplPScwJ106bm90KFtyb2xlXSlcIixcblx0XHRcdFwic2VsZWN0Om5vdChbbXVsdGlwbGVdKVtzaXplPScxJ106bm90KFtyb2xlXSlcIl0sXG5cdFx0ZGVmYXVsdHM6IHtcblx0XHRcdGV4cGFuZGVkOiBmYWxzZSxcblx0XHRcdGhhc1BvcFVwOiBcImxpc3Rib3hcIlxuXHRcdH1cblx0fSxcblx0Y29tbWFuZDoge1xuXHRcdHN1cGVyOiBbXCJ3aWRnZXRcIl0sXG5cdFx0c3ViOiBbXCJtZW51aXRlbVwiLCBcImJ1dHRvblwiLCBcImxpbmtcIl1cblx0fSxcblx0Y29tcGxlbWVudGFyeToge1xuXHRcdHN1cGVyOiBbXCJsYW5kbWFya1wiXSxcblx0XHRpbXBsaWNpdDogW1wiYXNpZGU6bm90KFtyb2xlXSlcIl1cblx0fSxcblx0Y29tcG9zaXRlOiB7XG5cdFx0c3VwZXI6IFtcIndpZGdldFwiXSxcblx0XHRzdWI6IFtcImdyaWRcIiwgXCJzZWxlY3RcIiwgXCJzcGluYnV0dG9uXCIsIFwidGFibGlzdFwiXVxuXHR9LFxuXHQvKiogQHRvZG8gbW9yZSBzdHJpY3QgZm9vdGVyIHNlbGVjdG9yICAqL1xuXHRjb250ZW50aW5mbzoge1xuXHRcdHN1cGVyOiBbXCJsYW5kbWFya1wiXSxcblx0XHRpbXBsaWNpdDogW1wiZm9vdGVyOm5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdGRlZmluaXRpb246IHtcblx0XHRzdXBlcjogW1wic2VjdGlvblwiXSxcblx0XHRpbXBsaWNpdDogW1wiZGQ6bm90KFtyb2xlXSlcIl1cblx0fSxcblx0ZGlhbG9nOiB7XG5cdFx0c3VwZXI6IFtcIndpbmRvd1wiXSxcblx0XHRzdWI6IFtcImFsZXJ0ZGlhbG9nXCJdLFxuXHRcdGltcGxpY2l0OiBbXCJkaWFsb2c6bm90KFtyb2xlXSlcIl1cblx0fSxcblx0ZGlyZWN0b3J5OiB7IHN1cGVyOiBbXCJsaXN0XCJdIH0sXG5cdGRvY3VtZW50OiB7XG5cdFx0c3VwZXI6IFtcInN0cnVjdHVyZVwiXSxcblx0XHRzdWI6IFtcImFydGljbGVcIl0sXG5cdFx0aW1wbGljaXQ6IFtcImFzaWRlOm5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdGZlZWQ6IHtcblx0XHRzdXBlcjogW1wibGlzdFwiXSxcblx0XHRvd25zOiBbXCJhcnRpY2xlXCJdLFxuXHR9LFxuXHRmaWd1cmU6IHtcblx0XHRzdXBlcjogW1wic2VjdGlvblwiXSxcblx0XHRpbXBsaWNpdDogW1wiZmlndXJlOm5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdGZvcm06IHtcblx0XHRzdXBlcjogW1wibGFuZG1hcmtcIl0sXG5cdFx0aW1wbGljaXQ6IFtcImZvcm06bm90KFtyb2xlXSlcIl1cblx0fSxcblx0Z3JpZDoge1xuXHRcdHN1cGVyOiBbXCJjb21wb3NpdGVcIiwgXCJ0YWJsZVwiXSxcblx0XHRzdWI6IFtcInRyZWVncmlkXCJdLFxuXHRcdG93bnM6IFtcInJvd2dyb3VwXCIsIFwicm93XCJdLFxuXHR9LFxuXHRncmlkY2VsbDoge1xuXHRcdHN1cGVyOiBbXCJjZWxsXCIsIFwid2lkZ2V0XCJdLFxuXHRcdHN1YjogW1wiY29sdW1uaGVhZGVyXCIsIFwicm93aGVhZGVyXCJdLFxuXHRcdGNvbnRleHQ6IFtcInJvd1wiXVxuXHR9LFxuXHRncm91cDoge1xuXHRcdHN1cGVyOiBbXCJzZWN0aW9uXCJdLFxuXHRcdHN1YjogW1wicm93XCIsIFwic2VsZWN0XCIsIFwidG9vbGJhclwiXSxcblx0XHRpbXBsaWNpdDogW1wiZGV0YWlsczpub3QoW3JvbGVdKVwiLCBcIm9wdGdyb3VwOm5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdGhlYWRpbmc6IHtcblx0XHRzdXBlcjogW1wic2VjdGlvbmhlYWRcIl0sXG5cdFx0aW1wbGljaXQ6IFtcImgxOm5vdChbcm9sZV0pXCIsIFwiaDI6bm90KFtyb2xlXSlcIiwgXCJoMzpub3QoW3JvbGVdKVwiLFxuXHRcdFx0XCJoNDpub3QoW3JvbGVdKVwiLCBcImg1Om5vdChbcm9sZV0pXCIsIFwiaDY6Om5vdChbcm9sZV0pXCJdLFxuXHRcdGRlZmF1bHRzOiB7XG5cdFx0XHRsZXZlbDogMlxuXHRcdH1cblx0fSxcblx0aW1nOiB7XG5cdFx0c3VwZXI6IFtcInNlY3Rpb25cIl0sXG5cdFx0aW1wbGljaXQ6IFtcImltZ1thbHRdOm5vdChbYWx0PScnXSk6bm90KFtyb2xlXSlcIl1cblx0fSxcblx0aW5wdXQ6IHtcblx0XHRzdXBlcjogW1wid2lkZ2V0XCJdLFxuXHRcdHN1YjogW1wiY2hlY2tib3hcIiwgXCJvcHRpb25cIiwgXCJyYWRpb1wiLCBcInNsaWRlclwiLCBcInNwaW5idXR0b25cIiwgXCJ0ZXh0Ym94XCJdXG5cdH0sXG5cdGxhbmRtYXJrOiB7XG5cdFx0c3VwZXI6IFtcInNlY3Rpb25cIl0sXG5cdFx0c3ViOiBbXCJiYW5uZXJcIiwgXCJjb21wbGVtZW50YXJ5XCIsIFwiY29udGVudGluZm9cIiwgXCJmb3JtXCIsIFwibWFpblwiLCBcIm5hdmlnYXRpb25cIiwgXCJyZWdpb25cIiwgXCJzZWFyY2hcIl1cblx0fSxcblx0bGluazoge1xuXHRcdHN1cGVyOiBbXCJjb21tYW5kXCJdLFxuXHRcdGltcGxpY2l0OiBbXCJhW2hyZWZdOm5vdChbcm9sZV0pXCIsIFwiYXJlYVtocmVmXTpub3QoW3JvbGVdKVwiLCBcImxpbmtbaHJlZl06bm90KFtyb2xlXSlcIl1cblx0fSxcblx0bGlzdDoge1xuXHRcdHN1cGVyOiBbXCJzZWN0aW9uXCJdLFxuXHRcdHN1YjogW1wiZGlyZWN0b3J5XCIsIFwiZmVlZFwiXSxcblx0XHRvd25zOiBbW1wiZ3JvdXBcIiwgXCJsaXN0aXRlbVwiXSwgXCJsaXN0aXRlbVwiXSxcblx0XHRpbXBsaWNpdDogW1wiZGw6bm90KFtyb2xlXSlcIiwgXCJvbDpub3QoW3JvbGVdKVwiLCBcInVsOm5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdGxpc3Rib3g6IHtcblx0XHRzdXBlcjogW1wic2VsZWN0XCJdLFxuXHRcdG93bnM6IFtcIm9wdGlvblwiXSxcblx0XHRpbXBsaWNpdDogW1wiZGF0YWxpc3Q6bm90KFtyb2xlXSlcIiwgXCJzZWxlY3RbbXVsdGlwbGVdOm5vdChbcm9sZV0pXCIsXG5cdFx0XHRcInNlbGVjdFtzaXplXTpub3QoW3NpemU9JzAnXSk6bm90KFtzaXplPScxJ10pOm5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdGxpc3RpdGVtOiB7XG5cdFx0c3VwZXI6IFtcInNlY3Rpb25cIl0sXG5cdFx0c3ViOiBbXCJ0cmVlaXRlbVwiXSxcblx0XHRjb250ZXh0OiBbXCJncm91cFwiLCBcImxpc3RcIl0sXG5cdFx0aW1wbGljaXQ6IFtcImR0Om5vdChbcm9sZV0pXCIsIFwib2wgPiBsaTo6bm90KFtyb2xlXSlcIl1cblx0fSxcblx0bG9nOiB7XG5cdFx0c3VwZXI6IFtcInNlY3Rpb25cIl0sXG5cdFx0ZGVmYXVsdHM6IHtcblx0XHRcdGxpdmU6IFwicG9sbGl0ZVwiXG5cdFx0fVxuXHR9LFxuXHRtYWluOiB7XG5cdFx0c3VwZXI6IFtcImxhbmRtYXJrXCJdLFxuXHRcdGltcGxpY2l0OiBbXCJtYWluOm5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdG1hcnF1ZWU6IHsgc3VwZXI6IFtcInNlY3Rpb25cIl0gfSxcblx0bWF0aDoge1xuXHRcdHN1cGVyOiBbXCJzZWN0aW9uXCJdLFxuXHRcdGltcGxpY2l0OiBbXCJtYXRoOm5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdG1lbnU6IHtcblx0XHRzdXBlcjogW1wic2VsZWN0XCJdLFxuXHRcdHN1YjogW1wibWVudWJhclwiXSxcblx0XHRvd25zOiBbXCJtZW51aXRlbVwiLCBcIm1lbnVpdGVtcmFkaW9cIiwgXCJtZW51aXRlbWNoZWNrYm94XCIsIFtcImdyb3VwXCIsIFwibWVudWl0ZW1yYWRpb1wiXV0sXG5cdFx0aW1wbGljaXQ6IFtcIm1lbnVbdHlwZT0nY29udGV4dCddOm5vdChbcm9sZV0pXCJdLFxuXHRcdGRlZmF1bHRzOiB7IG9yaWVudGF0aW9uOiBcInZlcnRpY2FsXCIgfVxuXHR9LFxuXHRtZW51YmFyOiB7XG5cdFx0c3VwZXI6IFtcIm1lbnVcIl0sXG5cdFx0c3ViOiBbXCJ0b29sYmFyXCJdLFxuXHRcdG93bnM6IFtcIm1lbnVpdGVtXCIsIFwibWVudWl0ZW1yYWRpb1wiLCBcIm1lbnVpdGVtY2hlY2tib3hcIiwgW1wiZ3JvdXBcIiwgXCJtZW51aXRlbXJhZGlvXCJdXSxcblx0XHRkZWZhdWx0czogeyBvcmllbnRhdGlvbjogXCJob3Jpem9udGFsXCIgfVxuXHR9LFxuXHRtZW51aXRlbToge1xuXHRcdHN1cGVyOiBbXCJjb21tYW5kXCJdLFxuXHRcdHN1YjogW1wibWVudWl0ZW1jaGVja2JveFwiXSxcblx0XHRjb250ZXh0OiBbXCJncm91cFwiLCBcIm1lbnVcIiwgXCJtZW51YmFyXCJdLFxuXHRcdGltcGxpY2l0OiBbXCJtZW51aXRlbVt0eXBlPSdjb250ZXh0J106bm90KFtyb2xlXSlcIl1cblx0fSxcblx0bWVudWl0ZW1jaGVja2JveDoge1xuXHRcdHN1cGVyOiBbXCJjaGVja2JveFwiLCBcIm1lbnVpdGVtXCJdLFxuXHRcdHN1YjogW1wibWVudWl0ZW1yYWRpb1wiXSxcblx0XHRjb250ZXh0OiBbXCJtZW51XCIsIFwibWVudWJhclwiXSxcblx0XHRpbXBsaWNpdDogW1wibWVudWl0ZW1bdHlwZT0nY2hlY2tib3gnXTpub3QoW3JvbGVdKVwiXSxcblx0XHRkZWZhdWx0czogeyBjaGVja2VkOiBmYWxzZSB9XG5cdH0sXG5cdG1lbnVpdGVtcmFkaW86IHtcblx0XHRzdXBlcjogW1wibWVudWl0ZW1jaGVja2JveFwiLCBcInJhZGlvXCJdLFxuXHRcdGNvbnRleHQ6IFtcImdyb3VwXCIsIFwibWVudVwiLCBcIm1lbnViYXJcIl0sXG5cdFx0aW1wbGljaXQ6IFtcIm1lbnVpdGVtW3R5cGU9J3JhZGlvJ106bm90KFtyb2xlXSlcIl0sXG5cdFx0ZGVmYXVsdHM6IHsgY2hlY2tlZDogZmFsc2UgfVxuXHR9LFxuXHRuYXZpZ2F0aW9uOiB7XG5cdFx0c3VwZXI6IFtcImxhbmRtYXJrXCJdLFxuXHRcdGltcGxpY2l0OiBbXCJuYXY6bm90KFtyb2xlXSlcIl1cblx0fSxcblx0LyoqIEB0b2RvIHJlY29uc2lkZXIgaWYgbm9uZSA9PSBwcmVzZW50YXRpb24gKi9cblx0bm9uZTogeyBzdXBlcjogW1wic3RydWN0dXJlXCJdIH0sXG5cdG5vdGU6IHsgc3VwZXI6IFtcInNlY3Rpb25cIl0gfSxcblx0LyoqIEB0b2RvIG1vcmUgc3RyaWN0IGRhdGFsaXN0IHNlbGVjdG9yICovXG5cdG9wdGlvbjoge1xuXHRcdHN1cGVyOiBbXCJpbnB1dFwiXSxcblx0XHRzdWI6IFtcInRyZWVpdGVtXCJdLFxuXHRcdGNvbnRleHQ6IFtcImxpc3Rib3hcIl0sXG5cdFx0aW1wbGljaXQ6IFtcImRhdGFsaXN0IG9wdGlvbjpub3QoW3JvbGVdKVwiXSxcblx0XHRkZWZhdWx0czogeyBjaGVja2VkOiBmYWxzZSB9XG5cdH0sXG5cdHByZXNlbnRhdGlvbjoge1xuXHRcdHN1cGVyOiBbXCJzdHJ1Y3R1cmVcIl1cblx0fSxcblx0cHJvZ3Jlc3NiYXI6IHtcblx0XHRzdXBlcjogW1wicmFuZ2VcIl0sXG5cdFx0aW1wbGljaXQ6IFtcInByb2dyZXNzOm5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdHJhZGlvOiB7XG5cdFx0c3VwZXI6IFtcImlucHV0XCJdLFxuXHRcdHN1YjogW1wibWVudWl0ZW1yYWRpb1wiXSxcblx0XHRpbXBsaWNpdDogW1wiaW5wdXRbdHlwZT0ncmFkaW8nXTpub3QoW3JvbGVdKVwiXSxcblx0XHRkZWZhdWx0czogeyBjaGVja2VkOiBmYWxzZSB9XG5cdH0sXG5cdHJhZGlvZ3JvdXA6IHtcblx0XHRzdXBlcjogW1wic2VsZWN0XCJdLFxuXHRcdG93bnM6IFtcInJhZGlvXCJdLFxuXHR9LFxuXHRyYW5nZToge1xuXHRcdHN1cGVyOiBbXCJ3aWRnZXRcIl0sXG5cdFx0c3ViOiBbXCJwcm9ncmVzc2JhclwiLCBcInNjcm9sbGJhclwiLCAgXCJzbGlkZXJcIiwgIFwic3BpbmJ1dHRvblwiXVxuXHR9LFxuXHQvKiogQHRvZG8gYWRkIHNlY3Rpb24gc2VsZWN0b3IgdG8gY2hlY2sgYWNjZXNzaWJsZSAqL1xuXHRyZWdpb246IHsgc3VwZXI6IFtcImxhbmRtYXJrXCJdIH0sXG5cdHJvbGV0eXBlOiB7IHN1YjogW1wic3RydWN0dXJlXCIsIFwid2lkZ2V0XCIsIFwid2luZG93XCJdIH0sXG5cdC8qKiBAdG9kbyBtb3JlIHN0cmljdCB0ciBzZWxlY3RvciAqL1xuXHRyb3c6IHtcblx0XHRzdWI6IFtcImdyb3VwXCIsIFwid2lkZ2V0XCJdLFxuXHRcdGNvbnRleHQ6IFtcImdyaWRcIiwgXCJyb3dncm91cFwiLCBcInRhYmxlXCIsIFwidHJlZWdyaWRcIl0sXG5cdFx0b3duczogW1wiY2VsbFwiLCBcImNvbHVtbmhlYWRlclwiLCBcInJvd2hlYWRlclwiLCBcImdyaWRjZWxsXCJdLFxuXHRcdGltcGxpY2l0OiBbXCJ0YWJsZSB0cjpub3QoW3JvbGVdKVwiXVxuXHR9LFxuXHRyb3dncm91cDoge1xuXHRcdGNvbnRleHQ6IFtcImdyaWRcIiwgXCJ0YWJsZVwiLCBcInRyZWVncmlkXCJdLFxuXHRcdG93bnM6IFtcInJvd1wiXSxcblx0XHRpbXBsaWNpdDogW1widGhlYWQ6bm90KFtyb2xlXSlcIiwgXCJ0Ym9keTpub3QoW3JvbGVdKVwiLCBcInRmb290Om5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdHJvd2hlYWRlcjoge1xuXHRcdHN1cGVyOiBbXCJjZWxsXCIsIFwiZ3JpZGNlbGxcIiwgXCJzZWN0aW9uaGVhZFwiXSxcblx0XHRjb250ZXh0OiBbXCJyb3dcIl0sXG5cdFx0aW1wbGljaXQ6IFtcInRib2R5IHRoOm5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdHNjcm9sbGJhcjoge1xuXHRcdHN1cGVyOiBbXCJyYW5nZVwiXSxcblx0XHRkZWZhdWx0czoge1xuXHRcdFx0b3JpZW50YXRpb246IFwidmVydGljYWxcIixcblx0XHRcdHZhbHVlTWluOiAwLFxuXHRcdFx0dmFsdWVNYXg6IDEwMFxuXHRcdH1cblx0fSxcblx0c2VhcmNoOiB7IHN1cGVyOiBbXCJsYW5kbWFya1wiXSB9LFxuXHRzZWFyY2hib3g6IHtcblx0XHRzdXBlcjogW1widGV4dGJveFwiXSxcblx0XHRpbXBsaWNpdDogW1wiaW5wdXRbdHlwZT0nc2VhcmNoJ106bm90KFtsaXN0XSk6bm90KFtyb2xlXSlcIl1cblx0fSxcblx0c2VjdGlvbjoge1xuXHRcdHN1cGVyOiBbXCJzdHJ1Y3R1cmVcIl0sXG5cdFx0c3ViOiBbXCJhbGVydFwiLCBcImNlbGxcIiwgXCJkZWZpbml0aW9uXCIsIFwiZmlndXJlXCIsIFwiZ3JvdXBcIiwgXCJpbWdcIiwgXCJsYW5kbWFya1wiLCBcImxpc3RcIiwgXCJsaXN0aXRlbVwiLFxuXHRcdFx0XCJsb2dcIiwgXCJtYXJxdWVlXCIsIFwibWF0aFwiLCBcIm5vdGVcIiwgXCJzdGF0dXNcIiwgXCJ0YWJsZVwiLCBcInRhYnBhbmVsXCIsIFwidGVybVwiLCBcInRvb2x0aXBcIl1cblx0fSxcblx0c2VjdGlvbmhlYWQ6IHtcblx0XHRzdXBlcjogW1wic3RydWN0dXJlXCJdLFxuXHRcdHN1YjogW1wiY29sdW1uaGVhZGVyXCIsIFwiaGVhZGluZ1wiLCBcInJvd2hlYWRlclwiLCBcInRhYlwiXVxuXHR9LFxuXHRzZWxlY3Q6IHtcblx0XHRzdXBlcjogW1wiY29tcG9zaXRlXCIsIFwiZ3JvdXBcIl0sXG5cdFx0c3ViOiBbXCJjb21ib2JveFwiLCBcImxpc3Rib3hcIiwgXCJtZW51XCIsIFwicmFkaW9ncm91cFwiLCBcInRyZWVcIl1cblx0fSxcblx0LyoqIEB0b2RvIHNlcGVyYXRpb24gb2YgZm9jdXNhYmxlICovXG5cdHNlcGFyYXRvcjoge1xuXHRcdHN1cGVyOiBbXCJzdHJ1Y3R1cmVcIiwgXCJ3aWRnZXRcIl0sXG5cdFx0aW1wbGljaXQ6IFtcImhyOm5vdChbcm9sZV0pXCJdLFxuXHRcdGRlZmF1bHRzOiB7XG5cdFx0XHRvcmllbnRhdGlvbjogXCJob3Jpem9udGFsXCIsXG5cdFx0XHR2YWx1ZU1pbjogMCxcblx0XHRcdHZhbHVlTWF4OiAxMDAsXG5cdFx0XHR2YWx1ZU5vdzogNTBcblx0XHR9XG5cdH0sXG5cdHNsaWRlcjoge1xuXHRcdHN1cGVyOiBbXCJpbnB1dFwiLCBcInJhbmdlXCJdLFxuXHRcdGltcGxpY2l0OiBbXCJpbnB1dFt0eXBlPSdyYW5nZSddOm5vdChbcm9sZV0pXCJdLFxuXHRcdGRlZmF1bHRzOiB7XG5cdFx0XHRvcmllbnRhdGlvbjogXCJob3Jpem9udGFsXCIsXG5cdFx0XHR2YWx1ZU1pbjogMCxcblx0XHRcdHZhbHVlTWF4OiAxMDBcblx0XHR9XG5cdH0sXG5cdHNwaW5idXR0b246IHtcblx0XHRzdXBlcjogW1wiY29tcG9zaXRlXCIsIFwiaW5wdXRcIiwgXCJyYW5nZVwiXSxcblx0XHRpbXBsaWNpdDogW1wiaW5wdXRbdHlwZT0nbnVtYmVyJ106bm90KFtyb2xlXSlcIl0sXG5cdFx0ZGVmYXVsdHM6IHtcdHZhbHVlTm93OiAwIH1cblx0fSxcblx0c3RhdHVzOiB7XG5cdFx0c3VwZXI6IFwic2VjdGlvblwiLFxuXHRcdHN1YjogW1wicHJvZ3Jlc3NiYXJcIiwgXCJ0aW1lclwiXSxcblx0XHRpbXBsaWNpdDogW1wib3V0cHV0Om5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdHN0cnVjdHVyZToge1xuXHRcdHN1cGVyOiBbXCJyb2xldHlwZVwiXSxcblx0XHRzdWI6IFtcImFwcGxpY2F0aW9uXCIsIFwiZG9jdW1lbnRcIiwgXCJwcmVzZW50YXRpb25cIiwgXCJyb3dncm91cFwiLCBcInNlY3Rpb25cIiwgXCJzZWN0aW9uaGVhZFwiLCBcInNlcGFyYXRvclwiXVxuXHR9LFxuXHRzd2l0Y2g6IHtcblx0XHRzdXBlcjogW1wiY2hlY2tib3hcIl0sXG5cdFx0ZGVmYXVsdHM6IHsgY2hlY2tlZDogZmFsc2UgfVxuXHR9LFxuXHR0YWI6IHtcblx0XHRzdXBlcjogW1wic2VjdGlvbmhlYWRcIiwgXCJ3aWRnZXRcIl0sXG5cdFx0Y29udGV4dDogW1widGFibGlzdFwiXSxcblx0XHRkZWZhdWxzdDogeyBzZWxlY3RlZDogZmFsc2UgfVxuXHR9LFxuXHR0YWJsZToge1xuXHRcdHN1cGVyOiBbXCJzZWN0aW9uXCJdLFxuXHRcdHN1YjogW1wiZ3JpZFwiXSxcblx0XHRvd25zOiBbXCJyb3dcIiwgXCJyb3dncm91cFwiXSxcblx0XHRpbXBsaWNpdDogW1widGFibGU6bm90KFtyb2xlXSlcIl1cblx0fSxcblx0dGFibGlzdDoge1xuXHRcdHN1cGVyOiBbXCJjb21wb3NpdGVcIl0sXG5cdFx0b3duczogW1widGFiXCJdLFxuXHRcdGRlZmF1bHRzOiB7IG9yaWVudGF0aW9uOiBcImhvcml6b250YWxcIiB9XG5cdH0sXG5cdHRhYnBhbmVsOiB7IHN1cGVyOiBbXCJzZWN0aW9uXCJdIH0sXG5cdHRlcm06IHsgc3VwZXI6IFtcInNlY3Rpb25cIl0gfSxcblx0dGV4dGJveDoge1xuXHRcdHN1cGVyOiBbXCJpbnB1dFwiXSxcblx0XHRzdWI6IFtcInNlYXJjaGJveFwiXSxcblx0XHRpbXBsaWNpdDogW1wiaW5wdXRbdHlwZT0nZW1haWwnXTpub3QoW2xpc3RdKTpub3QoW3JvbGVdKVwiLFxuXHRcdFx0XCJpbnB1dFt0eXBlPSd0ZWwnXTpub3QoW2xpc3RdKTpub3QoW3JvbGVdKVwiLCBcImlucHV0W3R5cGU9J3RleHQnXTpub3QoW2xpc3RdKTpub3QoW3JvbGVdKVwiLFxuXHRcdFx0XCJpbnB1dFt0eXBlPSd1cmwnXTpub3QoW2xpc3RdKTpub3QoW3JvbGVdKVwiLCBcInRleHRhcmVhOm5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdHRpbWVyOiB7IHN1cGVyOiBbXCJzdGF0dXNcIl0gfSxcblx0dG9vbGJhcjoge1xuXHRcdHN1cGVyOiBbXCJncm91cFwiXSxcblx0XHRkZWZhdWx0czogeyBvcmllbnRhdGlvbjogXCJob3Jpem9udGFsXCIgfVxuXHR9LFxuXHR0b29sdGlwOiB7IHN1cGVyOiBbXCJzZWN0aW9uXCJdIH0sXG5cdHRyZWU6IHtcblx0XHRzdXBlcjogW1wic2VsZWN0XCJdLFxuXHRcdHN1YjogW1widGhyZWVncmlkXCJdLFxuXHRcdG93bnM6IFtbXCJncm91cFwiLCBcInRyZWVpdGVtXCJdLCBcInRyZWVpdGVtXCJdXG5cdH0sXG5cdHRyZWVncmlkOiB7XG5cdFx0c3VwZXI6IFtcImdyaWRcIiwgXCJ0cmVlXCJdLFxuXHRcdG93bnM6IFtcInJvd1wiLCBcInJvd2dyb3VwXCJdXG5cdH0sXG5cdHRyZWVpdGVtOiB7XG5cdFx0c3VwZXI6IFtcImxpc3RpdGVtXCIsIFwib3B0aW9uXCJdLFxuXHRcdGNvbnRleHQ6IFtcImdyb3VwXCIsIFwidHJlZVwiXVxuXHR9LFxuXHR3aWRnZXQ6IHtcblx0XHRzdXBlcjogW1wicm9sZXR5cGVcIl0sXG5cdFx0c3ViOiBbXCJjb21tYW5kXCIsIFwiY29tcG9zaXRlXCIsIFwiZ3JpZGNlbGxcIiwgXCJpbnB1dFwiLCBcInJhbmdlXCIsIFwicm93XCIsIFwic2VwYXJhdG9yXCIsIFwidGFiXCJdXG5cdH0sXG5cdHdpbmRvdzoge1xuXHRcdHN1cGVyOiBbXCJyb2xldHlwZVwiXSxcblx0XHRzdWI6IFtcImRpYWxvZ1wiXVxuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCByb2xlczsiLCJmdW5jdGlvbiBzZXRTZWxlY3Rpb24ocmFuZ2UpIHtcblx0dmFyIHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblx0c2VsZWN0aW9uLnJlbW92ZUFsbFJhbmdlcygpO1xuXHRzZWxlY3Rpb24uYWRkUmFuZ2UocmFuZ2UpO1xufVxuXG4vKipcbiAqIEBtaXhpblxuICovXG5sZXQgU2VsZWN0aW9uID0gKHN1cGVyY2xhc3MpID0+IGNsYXNzIFNlbGVjdGlvbiBleHRlbmRzIHN1cGVyY2xhc3Mge1xuXHQvKipcblx0ICogU2VsZWN0cyBldmVyeXRoaW5nIGluIHRoZSB0ZXh0IGNvbnRyb2wuXG5cdCAqIEBuYW1lIFNlbGVjdGlvbiNzZWxlY3Rcblx0ICovXG5cdHNlbGVjdCgpIHtcblx0XHR0aGlzLnNldFNlbGVjdGlvblJhbmdlKDAsIHRoaXMudmFsdWUubGVuZ3RoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIC8gU2V0cyB0aGUgYmVnaW5uaW5nIGluZGV4IG9mIHRoZSBzZWxlY3RlZCB0ZXh0LiBXaGVuIG5vdGhpbmcgaXMgc2VsZWN0ZWQsXG5cdCAqIHRoaXMgcmV0dXJucyB0aGUgcG9zaXRpb24gb2YgdGhlIHRleHQgaW5wdXQgY3Vyc29yKGNhcmV0KSBpbnNpZGUgb2YgdGhlIDwgaW5wdXQgPiBlbGVtZW50LlxuXHQgKiBcblx0ICogQG5hbWUgU2VsZWN0aW9uI3NlbGVjdGlvblN0YXJ0XG5cdCAqIEB0eXBlIHtOdW1iZXJ9XG5cdCAqL1xuXHRnZXQgc2VsZWN0aW9uU3RhcnQoKSB7XG5cdFx0bGV0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblx0XHRpZiAoc2VsLmFuY2hvck5vZGUgJiYgc2VsLmFuY2hvck5vZGUucGFyZW50Tm9kZSA9PSB0aGlzLmVsZW1lbnQpIHtcblx0XHRcdHJldHVybiBzZWwuYW5jaG9yT2Zmc2V0ID4gc2VsLmZvY3VzT2Zmc2V0ID8gc2VsLmZvY3VzT2Zmc2V0IDogc2VsLmFuY2hvck9mZnNldDtcblx0XHR9XG5cdH1cblx0c2V0IHNlbGVjdGlvblN0YXJ0KHN0YXJ0KSB7XG5cdFx0bGV0IHJhbmdlID0gbmV3IFJhbmdlKCk7XG5cdFx0cmFuZ2Uuc2V0U3RhcnQodGhpcy5lbGVtZW50LmZpcnN0Q2hpbGQsIHN0YXJ0KTtcblx0XHRzZXRTZWxlY3Rpb24ocmFuZ2UpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgLyBTZXRzIHRoZSBlbmQgaW5kZXggb2YgdGhlIHNlbGVjdGVkIHRleHQuIFdoZW4gdGhlcmUncyBubyBzZWxlY3Rpb24sdGhpcyByZXR1cm5zIHRoZVxuXHQgKiBvZmZzZXQgb2YgdGhlIGNoYXJhY3RlciBpbW1lZGlhdGVseSBmb2xsb3dpbmcgdGhlIGN1cnJlbnQgdGV4dCBpbnB1dCBjdXJzb3IgcG9zaXRpb24uXG5cdCAqIFxuXHQgKiBAbmFtZSBTZWxlY3Rpb24jc2VsZWN0aW9uRW5kXG5cdCAqIEB0eXBlIHtOdW1iZXJ9XG5cdCAqL1xuXHRnZXQgc2VsZWN0aW9uRW5kKCkge1xuXHRcdGxldCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG5cdFx0aWYgKHNlbC5mb2N1c05vZGUgJiYgc2VsLmZvY3VzTm9kZS5wYXJlbnROb2RlID09IHRoaXMuZWxlbWVudCkge1xuXHRcdFx0cmV0dXJuIHNlbC5mb2N1c09mZnNldCA+IHNlbC5hbmNob3JPZmZzZXQgPyBzZWwuZm9jdXNPZmZzZXQgOiBzZWwuYW5jaG9yT2Zmc2V0O1xuXHRcdH1cblx0fVxuXHRzZXQgc2VsZWN0aW9uRW5kKGVuZCkge1xuXHRcdGxldCByYW5nZSA9IG5ldyBSYW5nZSgpO1xuXHRcdHJhbmdlLnNldEVuZCh0aGlzLmVsZW1lbnQuZmlyc3RDaGlsZCwgZW5kKTtcblx0XHRzZXRTZWxlY3Rpb24ocmFuZ2UpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgLyBTZXRzIHRoZSBkaXJlY3Rpb24gaW4gd2hpY2ggc2VsZWN0aW9uIG9jY3VycmVkLlxuXHQgKiBcblx0ICogKiBcImZvcndhcmRcIiBpZiBzZWxlY3Rpb24gd2FzIHBlcmZvcm1lZCBpbiB0aGUgc3RhcnQgLSB0byAtIGVuZCBkaXJlY3Rpb24gb2YgdGhlIGN1cnJlbnQgbG9jYWxlLlxuXHQgKiAqIFwiYmFja3dhcmRcIiBmb3IgdGhlIG9wcG9zaXRlIGRpcmVjdGlvbixcblx0ICogKiBcIm5vbmVcIiBpZiB0aGUgZGlyZWN0aW9uIGlzIHVua25vd24uXCJcblx0ICogXG5cdCAqIEBuYW1lIFNlbGVjdGlvbiNzZWxlY3Rpb25EaXJlY3Rpb25cblx0ICogQHRvZG8gaW1wcm92ZSBtZXRob2QgdG8gc2V0IGFuZCBnZXQgZGlyZWN0aW9uXG5cdCAqIEB0eXBlIHsgXCJmb3J3YXJkXCIgfCBcImJhY2t3YXJkXCIgfCBcIm5vbmVcIiB9XG5cdCAqL1xuXHRnZXQgc2VsZWN0aW9uRGlyZWN0aW9uKCkge1xuXHRcdGxldCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG5cdFx0aWYgKHNlbC5mb2N1c05vZGUgJiYgc2VsLmZvY3VzTm9kZS5wYXJlbnROb2RlID09IHRoaXMuZWxlbWVudCkge1xuXHRcdFx0aWYgKHNlbC5mb2N1c09mZnNldCA9PSBzZWwuYW5jaG9yT2Zmc2V0KSB7XG5cdFx0XHRcdHJldHVybiBcIm5vbmVcIjtcblx0XHRcdH0gZWxzZSBpZiAoc2VsLmFuY2hvck9mZnNldCA+IHNlbC5mb2N1c09mZnNldCkge1xuXHRcdFx0XHRyZXR1cm4gXCJiYWNrd2FyZFwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIFwiZm9yd2FyZFwiO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRzZXQgc2VsZWN0aW9uRGlyZWN0aW9uKGRpcmVjdGlvbikge1xuXHRcdGxldCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG5cdFx0aWYgKHNlbC5mb2N1c05vZGUgJiYgc2VsLmZvY3VzTm9kZS5wYXJlbnROb2RlID09IHRoaXMuZWxlbWVudCkge1xuXHRcdFx0aWYgKHNlbC5mb2N1c09mZnNldCA9PSBzZWwuYW5jaG9yT2Zmc2V0KSB7XG5cblx0XHRcdH0gZWxzZSBpZiAoc2VsLmFuY2hvck9mZnNldCA+IHNlbC5mb2N1c09mZnNldCAmJiBkaXJlY3Rpb24gIT0gXCJiYWNrd2FyZFwiKSB7XG5cdFx0XHRcdGxldCByYW5nZSA9IG5ldyBSYW5nZSgpO1xuXHRcdFx0XHRyYW5nZS5zZXRTdGFydCh0aGlzLmVsZW1lbnQuZmlyc3RDaGlsZCwgdGhpcy5zZWxlY3Rpb25FbmQpO1xuXHRcdFx0XHRyYW5nZS5zZXRFbmQodGhpcy5lbGVtZW50LmZpcnN0Q2hpbGQsIHRoaXMuc2VsZWN0aW9uU3RhcnQpO1xuXG5cdFx0XHRcdHNldFNlbGVjdGlvbihyYW5nZSk7XG5cdFx0XHR9IGVsc2UgaWYgKGRpcmVjdGlvbiAhPSBcImZvcndhcmRcIikge1xuXHRcdFx0XHRsZXQgcmFuZ2UgPSBuZXcgUmFuZ2UoKTtcblx0XHRcdFx0cmFuZ2Uuc2V0U3RhcnQodGhpcy5lbGVtZW50LmZpcnN0Q2hpbGQsIHRoaXMuc2VsZWN0aW9uU3RhcnQpO1xuXHRcdFx0XHRyYW5nZS5zZXRFbmQodGhpcy5lbGVtZW50LmZpcnN0Q2hpbGQsIHRoaXMuc2VsZWN0aW9uRW5kKTtcblxuXHRcdFx0XHRzZXRTZWxlY3Rpb24ocmFuZ2UpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBTZWxlY3RzIGEgcmFuZ2Ugb2YgdGV4dCBpbiB0aGUgZWxlbWVudCAoYnV0IGRvZXMgbm90IGZvY3VzIGl0KS5cblx0ICogQG5hbWUgU2VsZWN0aW9uI3NldFNlbGVjdGlvblJhbmdlXG5cdCAqIEBwYXJhbSB7SW50ZWdlcn0gc2VsZWN0aW9uU3RhcnRcblx0ICogQHBhcmFtIHtJbnRlZ2VyfSBzZWxlY3Rpb25FbmRcblx0ICogQHBhcmFtIHsgXCJmb3J3YXJkXCIgfCBcImJhY2t3YXJkXCIgfCBcIm5vbmVcIiB9IFtzZWxlY3Rpb25EaXJlY3Rpb24gPSBcIm5vbmVcIl0gXG5cdCAqIEVzdGFibGlzaCB0aGUgZGlyZWN0aW9uIGluIHdoaWNoIHNlbGVjdGlvbiB3YXMgc2V0XG5cdCAqL1xuXHRzZXRTZWxlY3Rpb25SYW5nZShzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kLCBzZWxlY3Rpb25EaXJlY3Rpb24gPSBcIm5vbmVcIikge1xuXHRcdGxldCBzdGFydCA9IHNlbGVjdGlvbkRpcmVjdGlvbiA9PSBcImJhY2t3YXJkXCIgPyBzZWxlY3Rpb25FbmQgOiBzZWxlY3Rpb25TdGFydDtcblx0XHRsZXQgZW5kID0gc2VsZWN0aW9uRGlyZWN0aW9uID09IFwiYmFja3dhcmRcIiA/IHNlbGVjdGlvblN0YXJ0IDogc2VsZWN0aW9uRW5kO1xuXG5cdFx0bGV0IHJhbmdlID0gbmV3IFJhbmdlKCk7XG5cdFx0cmFuZ2Uuc2V0U3RhcnQodGhpcy5lbGVtZW50LmZpcnN0Q2hpbGQsIHN0YXJ0KTtcblx0XHRyYW5nZS5zZXRFbmQodGhpcy5lbGVtZW50LmZpcnN0Q2hpbGQsIGVuZCk7XG5cblx0XHRzZXRTZWxlY3Rpb24ocmFuZ2UpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlcGxhY2VzIHRoZSByYW5nZSBvZiB0ZXh0IHdpdGggdGhlIG5ldyB0ZXh0LlxuXHQgKiBAbmFtZSBTZWxlY3Rpb24jc2V0UmFuZ2VUZXh0XG5cdCAqIEB0b2RvIEtlZXAgcHJldmlvdXMgc2VsZWN0aW9uIG9uIHBsYWNlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSByZXBsYWNlbWVudCBcblx0ICogQHBhcmFtIHtJbnRlZ2VyfSBbc3RhcnQgPSB7QGxpbmsgVGV4dGJveCNzZWxlY3Rpb25TdGFydH1dXG5cdCAqIEBwYXJhbSB7SW50ZWdlcn0gW2VuZF1cblx0ICogQHBhcmFtIHsgXCJzZWxlY3RcIiB8IFwic3RhcnRcIiB8IFwiZW5kXCIgfCBcInByZXNlcnZlXCIgfSBbc2VsZWN0TW9kZSA9IFwicHJlc2VydmVcIl1cblx0ICovXG5cdHNldFJhbmdlVGV4dChcblx0XHRyZXBsYWNlbWVudCxcblx0XHRzdGFydCA9IHRoaXMuc2VsZWN0aW9uU3RhcnQsXG5cdFx0ZW5kID0gdGhpcy5zZWxlY3Rpb25FbmQsXG5cdFx0c2VsZWN0TW9kZSA9IFwicHJlc2VydmVcIlxuXHQpIHtcblx0XHRsZXQgc2VsZWN0aW9uU3RhcnQgPSB0aGlzLnNlbGVjdGlvblN0YXJ0O1xuXHRcdGxldCBzZWxlY3Rpb25FbmQgPSB0aGlzLnNlbGVjdGlvbkVuZDtcblxuXHRcdGlmIChzdGFydCA+IGVuZCkgeyB0aHJvdyBuZXcgUmFuZ2VFcnJvcigpOyB9XG5cdFx0aWYgKHN0YXJ0ID4gdGhpcy52YWx1ZS5sZW5ndGgpIHsgc3RhcnQgPSB0aGlzLnZhbHVlLmxlbmd0aDsgfVxuXHRcdGlmIChlbmQgPiB0aGlzLnZhbHVlLmxlbmd0aCkgeyBlbmQgPSB0aGlzLnZhbHVlLmxlbmd0aDsgfVxuXHRcdGlmIChzdGFydCA8IGVuZCkge1xuXHRcdFx0Ly8gZGVsZXRlIGNoYXJhY3RlcnMgYmV0d2VlbiBzdGFydCBhbmQgZW5kXG5cdFx0fVxuXG5cdFx0dGhpcy52YWx1ZSA9IHRoaXMudmFsdWUuc2xpY2UoMCwgc3RhcnQpICsgcmVwbGFjZW1lbnQgKyB0aGlzLnZhbHVlLnNsaWNlKGVuZCk7XG5cblx0XHRpZiAoc2VsZWN0TW9kZSA9PSBcInN0YXJ0XCIpIHRoaXMuc2VsZWN0aW9uU3RhcnQgPSAwO1xuXHRcdGlmIChzZWxlY3RNb2RlID09IFwiZW5kXCIpIHRoaXMuc2VsZWN0aW9uU3RhcnQgPSB0aGlzLnZhbHVlLmxlbmd0aDtcblx0XHRpZiAoc2VsZWN0TW9kZSA9PSBcInNlbGVjdFwiKSB0aGlzLnNlbGVjdCgpO1xuXHRcdGlmIChzZWxlY3RNb2RlID09IFwicHJlc2VydmVcIikgdGhpcy5zZXRTZWxlY3Rpb25SYW5nZShzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kKTtcblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0aW9uOyIsImltcG9ydCBWYWxpZGl0eVN0YXRlIFx0ZnJvbSBcIi4vLi4vdXRpbHMvVmFsaWRpdHlTdGF0ZVwiO1xuXG4vKipcbiAqIEBtaXhpblxuICogQGJvcnJvd3MgVmFsaWRpdHlTdGF0ZSBhcyB2YWxpZGl0eVxuICogQGxlbmRzIFZhbGlkYXRpb24jXG4gKi9cbmxldCBWYWxpZGF0aW9uID0gKHN1cGVyY2xhc3MpID0+IGNsYXNzIFZhbGlkYXRpb24gZXh0ZW5kcyBzdXBlcmNsYXNzIFxueyBcblx0Z2V0IHZhbGlkaXR5KCkgeyBcblx0XHRpZighdGhpcy5fdmFsaWRpdHkpIHRoaXMuX3ZhbGlkaXR5ID0gbmV3IFZhbGlkaXR5U3RhdGUodGhpcyk7XG5cblx0XHRyZXR1cm4gdGhpcy5fdmFsaWRpdHk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW50IHdpbGwgYmUgdmFsaWRhdGVkIHdoZW4gdGhlIGZvcm0gaXMgc3VibWl0dGVkOyBmYWxzZSBvdGhlcndpc2UuXG5cdCAqIEB0eXBlIHtCb29sZWFufVxuXHQgKi9cblx0Z2V0IHdpbGxWYWxpZGF0ZSgpIHsgcmV0dXJuICF0aGlzLmhpZGRlbiAmJiAhdGhpcy5yZWFkT25seTsgfVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBlcnJvciBtZXNzYWdlIHRoYXQgd291bGQgYmUgc2hvd24gdG8gdGhlIHVzZXJcblx0ICogaWYgdGhlIGVsZW1lbnQgd2FzIHRvIGJlIGNoZWNrZWQgZm9yIHZhbGlkaXR5LlxuXHQgKiBAbmFtZSBWYWxpZGF0aW9uI3ZhbGlkYXRpb25NZXNzYWdlXG5cdCAqIEB0eXBlIHtTdHJpbmd9XG5cdCAqL1xuXHRnZXQgdmFsaWRhdGlvbk1lc3NhZ2UoKSB7XG5cdFx0aWYodGhpcy52YWxpZGl0eS52YWxpZCkgcmV0dXJuO1xuXHRcdGlmKHRoaXMudmFsaWRpdHkudmFsdWVNaXNzaW5nKSByZXR1cm4gXCJQbGVhc2UgZmlsbCBpbiB0aGlzIGZpZWxkLlwiO1xuXHRcdGlmKHRoaXMudmFsaWRpdHkudHlwZU1pc21hdGNoKSByZXR1cm4gXCJQbGVhc2UgdXNlIHRoZSBjb3JyZWN0IGlucHV0IHR5cGUuXCI7XG5cdFx0XG5cdFx0aWYgKHRoaXMudmFsaWRpdHkudG9vTG9uZykge1xuXHRcdFx0cmV0dXJuIFwiUGxlYXNlIHNob3J0ZW4gdGhpcyB0ZXh0IHRvIDEwIGNoYXJhY3RlcnMgb3IgbGVzcyAoeW91IGFyZSBjdXJyZW50bHkgdXNpbmcgNDggY2hhcmFjdGVycykuXCI7XG5cdFx0fVxuXHRcdGlmKHRoaXMudmFsaWRpdHkudG9vU2hvcnQpIHtcblx0XHRcdHJldHVybiBcIlBsZWFzZSBsZW5ndGhlbiB0aGlzIHRleHQgdG8gMTAgY2hhcmFjdGVycyBvciBtb3JlICh5b3UgYXJlIGN1cnJlbnRseSB1c2luZyAxIGNoYXJhY3RlcikuXCI7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy52YWxpZGl0eS5iYWRJbnB1dCkgcmV0dXJuIFwiUGxlYXNlIGVudGVyIGEgbnVtYmVyLlwiO1xuXHRcdGlmICh0aGlzLnZhbGlkaXR5LnN0ZXBNaXNtYXRjaCkgcmV0dXJuIFwiUGxlYXNlIHNlbGVjdCBhIHZhbGlkIHZhbHVlLlwiO1xuXHRcdGlmICh0aGlzLnZhbGlkaXR5LnJhbmdlT3ZlcmZsb3cpIHJldHVybiBcIlBsZWFzZSBzZWxlY3QgYSBzbWFsbGVyIHZhbHVlLlwiO1xuXHRcdGlmICh0aGlzLnZhbGlkaXR5LnJhbmdlVW5kZXJmbG93KSByZXR1cm4gXCJQbGVhc2Ugc2VsZWN0IGEgbGFyZ2VyIHZhbHVlLlwiO1xuXHRcdGlmKHRoaXMudmFsaWRpdHkucGF0dGVybk1pc21hdGNoKSByZXR1cm4gXCJQbGVhc2UgbWF0Y2ggdGhlIGZvcm1hdCByZXF1ZXN0ZWQuXCI7XG5cdFx0aWYodGhpcy52YWxpZGl0eS5jdXN0b21FcnJvcikgcmV0dXJuIHRoaXMuZXJyb3JtZXNzYWdlLmVsZW1lbnQuaW5uZXJIVE1MO1xuXG5cdFx0Ly8gRmFsbGJhY2sgdmFsdWUgc2hvdWxkIG5ldmVyIGJlZW4gc2hvd25cblx0XHRyZXR1cm4gdGhpcy5lcnJvcm1lc3NhZ2UuZWxlbWVudC5pbm5lckhUTUwgfHwgXCJUaGUgdmFsdWUgeW91IGVudGVyZWQgZm9yIHRoaXMgZmllbGQgaXMgaW52YWxpZC5cIjtcdFx0XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW504oCZcyB2YWx1ZSBoYXMgbm8gdmFsaWRpdHkgcHJvYmxlbXM7IGZhbHNlIG90aGVyd2lzZS5cblx0ICogRmlyZXMgYW4gaW52YWxpZCBldmVudCBhdCB0aGUgZWxlbWVudCBpbiB0aGUgbGF0dGVyIGNhc2UuXG5cdCAqIEBmaXJlcyBpbnZhbGlkXG5cdCAqIEBuYW1lIFZhbGlkYXRpb24jY2hlY2tWYWxpZGl0eVxuXHQgKi9cblx0Y2hlY2tWYWxpZGl0eSgpIHtcblx0XHRpZighdGhpcy52YWxpZGl0eS52YWxpZCkgdGhpcy5kaXNwYXRjaEV2ZW50KFwiaW52YWxpZFwiLCB0aGlzKTtcblx0XHRyZXR1cm4gdGhpcy52YWxpZGl0eS52YWxpZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnTigJlzIHZhbHVlIGhhcyBubyB2YWxpZGl0eSBwcm9ibGVtczsgb3RoZXJ3aXNlLCByZXR1cm5zIGZhbHNlLCBmaXJlcyBhblxuXHQgKiBpbnZhbGlkIGV2ZW50IGF0IHRoZSBlbGVtZW50LCBhbmQoaWYgdGhlIGV2ZW50IGlzbuKAmXQgY2FuY2VsZWQpIHJlcG9ydHMgdGhlIHByb2JsZW0gdG8gdGhlIHVzZXIuXG5cdCAqIEBmaXJlcyBpbnZhbGlkXG5cdCAqIEBuYW1lIFZhbGlkYXRpb24jcmVwb3J0VmFsaWRpdHlcblx0ICovXG5cdHJlcG9ydFZhbGlkaXR5KCkge1xuXHRcdGlmICghdGhpcy52YWxpZGl0eS52YWxpZCkge1xuXHRcdFx0bGV0IGNhbmNlbGxlZCA9ICF0aGlzLmRpc3BhdGNoRXZlbnQoXCJpbnZhbGlkXCIsIHRoaXMpO1xuXHRcdFx0aWYgKCFjYW5jZWxsZWQpIHtcblx0XHRcdFx0dGhpcy5lcnJvcm1lc3NhZ2UuaGlkZGVuID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuZXJyb3JtZXNzYWdlLmhpZGRlbiA9IHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLnZhbGlkaXR5LnZhbGlkO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldHMgYSBjdXN0b20gZXJyb3IsIHNvIHRoYXQgdGhlIGVsZW1lbnQgd291bGQgZmFpbCB0byB2YWxpZGF0ZS5UaGUgZ2l2ZW4gbWVzc2FnZSBpcyB0aGVcblx0ICogbWVzc2FnZSB0byBiZSBzaG93biB0byB0aGUgdXNlciB3aGVuIHJlcG9ydGluZyB0aGUgcHJvYmxlbSB0byB0aGUgdXNlci5cblx0ICogXG5cdCAqIElmIHRoZSBhcmd1bWVudCBpcyB0aGUgZW1wdHkgc3RyaW5nLCBjbGVhcnMgdGhlIGN1c3RvbSBlcnJvci5cblx0ICogXG5cdCAqIEBuYW1lIFZhbGlkYXRpb24jc2V0Q3VzdG9tVmFsaWRpdHlcblx0ICogQHBhcmFtIHs/U3RyaW5nfSBtZXNzYWdlIFxuXHQgKi9cblx0c2V0Q3VzdG9tVmFsaWRpdHkobWVzc2FnZSkge1xuXHRcdC8vIHVwZGF0ZSBWYWxpZHlTdGF0ZSBvYmplY3Rcblx0XHR0aGlzLnZhbGlkaXR5Ll9jdXN0b21FcnJvciA9IG1lc3NhZ2U7XG5cblx0XHRpZihtZXNzYWdlKSB7XHRcdFx0XG5cdFx0XHQvLyB1cGRhdGUgYGFyaWEtaW52YWxpZGAgcHJvcGVydHkgdG8gaW52YWxpZFxuXHRcdFx0dGhpcy5pbnZhbGlkID0gdHJ1ZTtcblx0XHRcdFxuXHRcdFx0Ly8gdXBkYXRlIGVycm9yIG1lc3NhZ2Vcblx0XHRcdHRoaXMuZXJyb3JtZXNzYWdlLmVsZW1lbnQuaW5uZXJIVE1MID0gbWVzc2FnZTtcblx0XHRcdHRoaXMuZXJyb3JtZXNzYWdlLmVsZW1lbnQuaGlkZGVuID0gZmFsc2U7XG5cdFx0fSBlbHNlIHtcdFx0XHRcblx0XHRcdC8vIHVwZGF0ZSBgYXJpYS1pbnZhbGlkYCBwcm9wZXJ0eSB0byBpbnZhbGlkXG5cdFx0XHR0aGlzLmludmFsaWQgPSBmYWxzZTtcblx0XHRcdFxuXHRcdFx0Ly8gdXBkYXRlIGVycm9yIG1lc3NhZ2Vcblx0XHRcdHRoaXMuZXJyb3JtZXNzYWdlLmVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcblx0XHRcdHRoaXMuZXJyb3JtZXNzYWdlLmVsZW1lbnQuaGlkZGVuID0gdHJ1ZTtcblx0XHR9XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFZhbGlkYXRpb247IiwiaW1wb3J0IHsgRGVjbGFyZU1peGluIH0gZnJvbSAnQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW4nO1xyXG5cclxuaW1wb3J0IG93bnMgZnJvbSBcIi4vLi4vdXRpbHMvb3duc1wiO1xyXG5pbXBvcnQgZWxlbWVudHMgZnJvbSBcIi4vLi4vdXRpbHMvZWxlbWVudHNcIjtcclxuaW1wb3J0IGZvY3VzIGZyb20gXCIuLy4uL3V0aWxzL2ZvY3VzXCI7XHJcblxyXG4vLyBhcHBsaWNhdGlvblxyXG4vLyBjb21wb3NpdGVcclxuICAgIC8vIHNwaW5idXR0b25cclxuICAgIC8vIHRhYmxpc3QgPSBob3Jpem9udGFsXHJcbiAgICAvLyBzZWxlY3RcclxuICAgICAgICAvLyByYWRpb2dyb3VwLCByYWRpb1xyXG4gICAgICAgIC8vIGNvbWJvYm94XHJcbiAgICAgICAgLy8gdHJlZSA9IHZlcnRpY2FsLCBcclxuICAgICAgICAvLyBtZW51ID0gdmVydGljYWwsIG1lbnVpdGVtXHJcbiAgICAgICAgLy8gbWVudWJhciA9IGhvcml6b250YWwsIG1lbnVpdGVtXHJcbiAgICAgICAgLy8gbGlzdGJveCA9IHZlcnRpY2FsLCBvcHRpb25cclxuICAgIC8vIGdyaWQsIGNlbGxcclxuICAgICAgICAvLyB0cmVlZ3JpZCwgY2VsbFxyXG4vLyB0ZXh0Ym94XHJcbiAgICAvLyBzZWFyY2hib3hcclxuLy8gZ3JvdXBcclxuICAgIC8vIHJvd1xyXG4gICAgLy8gdG9vbGJhciA9IGhvcml6b250YWxcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERlY2xhcmVNaXhpbigoc3VwZXJDbGFzcykgPT4gY2xhc3MgYWN0aXZlRGVzY2VuZGFudCBleHRlbmRzIHN1cGVyQ2xhc3Mge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcclxuICAgICAgICBzdXBlciguLi5hcmdzKTtcclxuXHJcbiAgICAgICAgdGhpcy5vbk1vdW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Nb3VudCgpIHtcclxuICAgICAgICBpZih0aGlzLmFjdGl2ZURlc2NlbmRhbnQpIHtcclxuICAgICAgICAgICAgLy8gdGhpcy5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNpblwiLCB0aGlzLm9uU3RhcnRDb2x1bW4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3dpdGNoKHRoaXMucm9sZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwidGFibGlzdFwiOlxyXG4gICAgICAgICAgICBjYXNlIFwidG9vbGJhclwiOlxyXG4gICAgICAgICAgICBjYXNlIFwibWVudWJhclwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKFwia2V5XCIsIHRoaXMub25QcmV2aW91c0NvbHVtbi5iaW5kKHRoaXMpLCB7IGtleTogXCJBcnJvd0xlZnRcIiB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm9uTmV4dENvbHVtbi5iaW5kKHRoaXMpLCB7IGtleTogXCJBcnJvd1JpZ2h0XCIgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInRyZWVcIjpcclxuICAgICAgICAgICAgY2FzZSBcIm1lbnVcIjpcclxuICAgICAgICAgICAgY2FzZSBcImxpc3Rib3hcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm9uUHJldmlvdXNSb3cuYmluZCh0aGlzKSwgeyBrZXk6IFwiQXJyb3dVcFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKFwia2V5XCIsIHRoaXMub25OZXh0Um93LmJpbmQodGhpcyksIHsga2V5OiBcIkFycm93RG93blwiIH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvd25zLmdldEFsbEFsbG93ZWRDaGlsZHJlbih0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBvblN0YXJ0Q29sdW1uKCkge31cclxuICAgIG9uUHJldmlvdXNDb2x1bW4oZXYpIHtcclxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgZWxlbWVudCBvciBhbiBhbGxvd2VkIGNoaWxkIGhhcyBmb2N1c1xyXG4gICAgICAgIGlmICh0aGlzID09PSBldi50YXJnZXQgfHwgdGhpcy5vcHRpb25zLmluZGV4T2YoZWxlbWVudHMuZ2V0KGV2LnRhcmdldCkpID4gLTEpIHtcclxuICAgICAgICAgICAgZm9jdXMucHJldih0aGlzLCBmb2N1cy5hY3RpdmVFbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbk5leHRDb2x1bW4oZXYpIHtcclxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgZWxlbWVudCBvciBhbiBhbGxvd2VkIGNoaWxkIGhhcyBmb2N1c1xyXG4gICAgICAgIGlmICh0aGlzID09PSBldi50YXJnZXQgfHwgdGhpcy5vcHRpb25zLmluZGV4T2YoZWxlbWVudHMuZ2V0KGV2LnRhcmdldCkpID4gLTEpIHtcclxuICAgICAgICAgICAgZm9jdXMubmV4dCh0aGlzLCBmb2N1cy5hY3RpdmVFbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbkVuZENvbHVtbigpIHt9XHJcblxyXG4gICAgb25TdGFydFJvdygpIHt9XHJcbiAgICBvblByZXZpb3VzUm93KGV2KSB7XHJcbiAgICAgICAgaWYodGhpcy5vcHRpb25zLmluZGV4T2YoZWxlbWVudHMuZ2V0KGV2LnRhcmdldCkpID4gLTEpe1xyXG4gICAgICAgICAgICBmb2N1cy5wcmV2KHRoaXMsIGZvY3VzLmFjdGl2ZUVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uTmV4dFJvdyhldikge1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaW5kZXhPZihlbGVtZW50cy5nZXQoZXYudGFyZ2V0KSkgPiAtMSkge1xyXG4gICAgICAgICAgICBmb2N1cy5uZXh0KHRoaXMsIGZvY3VzLmFjdGl2ZUVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uRW5kUm93KCkge31cclxuXHJcbiAgICBvbkZvY3VzTW92ZSgpe31cclxuXHJcbn0pOyIsImltcG9ydCB7IERlY2xhcmVNaXhpbiB9IGZyb20gJ0B2ZXN0ZXJnYWFyZC1jb21wYW55L2pzLW1peGluJztcclxuXHJcbi8qKiBAbW9kdWxlICovXHJcblxyXG4vKipcclxuKiBBZGRzIGZ1bmN0aW9uYWxpdHkgdG8gdGhlIGBleHBhbmRlZGAgYXR0cmlidXRlXHJcbiogQHRvZG8gYWRkIGEgc2V0dGluZyB0byBkZWZpbmUgaG93IHRoZSB2aXNpYmlsaXR5IHNob3VsZCBiZSB0b2dnbGVkXHJcbiogQG5hbWUgZXhwYW5kZWRcclxuKiBAYWxpYXMgbW9kdWxlOmV4cGFuZGVkXHJcbiogQG1peGluXHJcbiovXHJcbmV4cG9ydCBkZWZhdWx0IERlY2xhcmVNaXhpbigoc3VwZXJjbGFzcykgPT4gY2xhc3MgZXh0ZW5kcyBzdXBlcmNsYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyB0aGUgZWxlbWVudCBleHBhbmRlZCBzdGF0ZSB0byBvcGVuIGFuZCBcclxuXHQgKiBmaXJlcyB0aGUgb3BlbiBldmVudCB0byBhbGwgZWxlbWVudHMgd2hvIGFyZSBjb25uZWN0ZWQgdHJvdWdoIGBjb250cm9sc2BcclxuXHQgKiBAbmFtZSBtb2R1bGU6ZXhwYW5kZWQjb25PcGVuXHJcblx0ICogQHBhcmFtIHtFdmVudH0gZXZcclxuXHQgKiBAZmlyZXMgW2FyaWEtY29udHJvbHNdI2V2ZW50Om9wZW5cclxuXHQgKi9cclxuXHRvbk9wZW4oZXYpIHtcclxuXHRcdGlmICh0eXBlb2Ygc3VwZXIub25PcGVuID09IFwiZnVuY3Rpb25cIikgc3VwZXIub25PcGVuKGV2KTtcclxuXHRcdGlmIChldiAmJiB0eXBlb2YgZXYucHJldmVudERlZmF1bHQgPT09IFwiZnVuY3Rpb25cIikgZXYucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRpZiAodGhpcy5kaXNhYmxlZCAhPT0gdHJ1ZSAmJiB0aGlzLmV4cGFuZGVkID09PSBmYWxzZSkge1xyXG5cdFx0XHR0aGlzLmV4cGFuZGVkID0gdHJ1ZTtcclxuXHJcblx0XHRcdGlmICh0aGlzLmNvbnRyb2xzKSB7XHJcblx0XHRcdFx0dGhpcy5jb250cm9scy5mb3JFYWNoKGNvbnRyb2wgPT4ge1xyXG5cdFx0XHRcdFx0Y29udHJvbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcIm9wZW5cIikpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBVcGRhdGVzIHRoZSBlbGVtZW50IGV4cGFuZGVkIHN0YXRlIHRvIGNsb3NlIGFuZCBcclxuXHQgKiBmaXJlcyB0aGUgY2xvc2UgZXZlbnQgdG8gYWxsIGVsZW1lbnRzIHdobyBhcmUgY29ubmVjdGVkIHRyb3VnaCBgY29udHJvbHNgXHJcblx0ICogQG5hbWUgbW9kdWxlOmV4cGFuZGVkI29uQ2xvc2VcclxuXHQgKiBAcGFyYW0ge0V2ZW50fSBldlxyXG5cdCAqIEBmaXJlcyBbYXJpYS1jb250cm9sc10jZXZlbnQ6Y2xvc2VcclxuXHQgKi9cclxuXHRvbkNsb3NlKGV2KSB7XHJcblx0XHRpZiAodHlwZW9mIHN1cGVyLm9uQ2xvc2UgPT0gXCJmdW5jdGlvblwiKSBzdXBlci5vbkNsb3NlKGV2KTtcclxuXHRcdGlmIChldiAmJiB0eXBlb2YgZXYucHJldmVudERlZmF1bHQgPT09IFwiZnVuY3Rpb25cIikgZXYucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFxyXG5cdFx0aWYgKHRoaXMuZGlzYWJsZWQgIT09IHRydWUgJiYgdGhpcy5leHBhbmRlZCA9PT0gdHJ1ZSkge1xyXG5cdFx0XHR0aGlzLmV4cGFuZGVkID0gZmFsc2U7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5jb250cm9scykge1xyXG5cdFx0XHRcdHRoaXMuY29udHJvbHMuZm9yRWFjaChjb250cm9sID0+IHtcclxuXHRcdFx0XHRcdGNvbnRyb2wuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJjbG9zZVwiKSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cdFx0XHJcblx0fVxyXG59KTsiLCIvKiogQG1vZHVsZSBCdXR0b24gKi9cclxuXHJcbmltcG9ydCBtaXggZnJvbSBcIkB2ZXN0ZXJnYWFyZC1jb21wYW55L2pzLW1peGluXCI7XHJcbmltcG9ydCBDb21tYW5kIGZyb20gXCIuL2Fic3RyYWN0L0NvbW1hbmRcIjtcclxuaW1wb3J0IGJvb2xlYW4gZnJvbSBcIi4vLi4vdHlwZS9ib29sZWFuXCI7XHJcblxyXG5pbXBvcnQgQXJpYVByZXNzZWQgZnJvbSBcIi4uL2F0dHJpYnV0ZXMvYXJpYS1wcmVzc2VkLmpzXCI7XHJcbmltcG9ydCBBcmlhRXhwYW5kZWQgZnJvbSBcIi4uL2F0dHJpYnV0ZXMvYXJpYS1leHBhbmRlZFwiO1xyXG5cclxuZnVuY3Rpb24gY2xvc2UoKSB7XHJcblx0dGhpcy5leHBhbmRlZCA9IGJvb2xlYW4uSVNfTk9UX0FDVElWRTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVnaXN0ZXJFeHBhbmRlZChldikge1xyXG5cdGNvbnNvbGUubG9nKGV2KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBzdW1tYXJ5IEFuIGlucHV0IHRoYXQgYWxsb3dzIGZvciB1c2VyLXRyaWdnZXJlZCBhY3Rpb25zIHdoZW4gY2xpY2tlZCBvciBwcmVzc2VkLlxyXG4gKiBcclxuICogQGFsaWFzIG1vZHVsZTpCdXR0b25cclxuICogQGV4dGVuZHMgQ29tbWFuZFxyXG4gKiBAbWl4ZXMgQXJpYUV4cGFuZGVkXHJcbiAqIEBtaXhlcyBBcmlhUHJlc3NlZFxyXG4gKi9cclxuY2xhc3MgQnV0dG9uIGV4dGVuZHMgbWl4KENvbW1hbmQpLndpdGgoQXJpYUV4cGFuZGVkLCBBcmlhUHJlc3NlZCkge1xyXG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcclxuXHRcdHN1cGVyKC4uLmFyZ3MpO1xyXG5cclxuXHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcclxuXHRcdFx0XCJhdHRyaWJ1dGVzXCIsXHJcblx0XHRcdHJlZ2lzdGVyRXhwYW5kZWQsXHJcblx0XHRcdHsgYXR0cmlidXRlOiBcImFyaWEtZXhwYW5kZWRcIiwgb25jZTogdHJ1ZSB9XHJcblx0XHQpO1xyXG5cclxuXHRcdGlmICh0aGlzLmV4cGFuZGVkICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jb250cm9scykgeyAvLyB0b2RvOiBhZGQgd2hlbiBmaXJzdCB0aW1lIGFyaWEtZXhwYW5kZWQgaXMgYm9vbGVhblxyXG5cdFx0XHRjb25zb2xlLmxvZyh0aGlzLmNvbnRyb2xzLmxlbmd0aCk7XHJcblx0XHRcdHRoaXMuY29udHJvbHMuZm9yRWFjaChjb250cm9sID0+IHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhjb250cm9sLmFkZEV2ZW50TGlzdGVuZXIpO1xyXG5cdFx0XHRcdGlmIChjb250cm9sLmFkZEV2ZW50TGlzdGVuZXIpIGNvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcihcImNsb3NlXCIsIGNsb3NlLmJpbmQodGhpcykpXHJcblx0XHRcdH1cclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9uZXhwYW5kZWQoZXYpIHtcclxuXHRcdGlmICh0eXBlb2Ygc3VwZXIub25leHBhbmRlZCA9PSBcImZ1bmN0aW9uXCIpIHN1cGVyLm9uZXhwYW5kZWQoZXYpO1xyXG5cclxuXHRcdGlmICh0aGlzLmRpc2FibGVkICE9PSB0cnVlKSB7XHJcblx0XHRcdGlmICh0aGlzLmV4cGFuZGVkKSB7XHJcblx0XHRcdFx0dGhpcy5jb250cm9scy5mb3JFYWNoKGNvbnRyb2wgPT4ge1xyXG5cdFx0XHRcdFx0Y29udHJvbC5lbGVtZW50LmhpZGRlbiA9IGZhbHNlO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuY29udHJvbHMuZm9yRWFjaChjb250cm9sID0+IHtcclxuXHRcdFx0XHRcdGNvbnRyb2wuZWxlbWVudC5oaWRkZW4gPSB0cnVlO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVx0XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbjsiLCJpbXBvcnQgbWl4IGZyb20gXCJAdmVzdGVyZ2FhcmQtY29tcGFueS9qcy1taXhpblwiO1xuaW1wb3J0IElucHV0IGZyb20gXCIuL2Fic3RyYWN0L0lucHV0XCI7XG5cbmltcG9ydCBBcmlhQ2hlY2tlZCBmcm9tIFwiLi4vYXR0cmlidXRlcy9hcmlhLWNoZWNrZWQuanNcIjtcblxuLyoqXG4gKiBAc3VtbWFyeSBBIGNoZWNrYWJsZSBpbnB1dCB0aGF0IGhhcyB0aHJlZSBwb3NzaWJsZSB2YWx1ZXM6IHRydWUsIGZhbHNlLCBvciBtaXhlZC5cbiAqIEBkZXNjXG4gKiAjIyMjIEV4YW1wbGVcbiAqXG4gKiA8ZGl2IHJvbGU9XCJjaGVja2JveFwiIGFyaWEtY2hlY2tlZD1cInRydWVcIiB0YWJpbmRleD1cIjBcIj48L2Rpdj5cbiAqXG4gKiBgYGBodG1sXG4gKiA8ZGl2IHJvbGU9XCJjaGVja2JveFwiIGFyaWEtY2hlY2tlZD1cInRydWVcIiB0YWJpbmRleD1cIjBcIj48L2Rpdj5cbiAqIGBgYFxuICogQGV4dGVuZHMgSW5wdXQgXG4gKiBAbWl4ZXMgQXJpYUNoZWNrZWRcbiAqL1xuY2xhc3MgQ2hlY2tib3ggZXh0ZW5kcyBtaXgoSW5wdXQpLndpdGgoQXJpYUNoZWNrZWQpIHtcblx0LyoqXG5cdCAqIEBwYXJhbSB7Kn0gYXJnc1xuXHQqL1xuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0c3VwZXIoLi4uYXJncyk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hlY2tib3g7XG4iLCJpbXBvcnQgYm9vbGVhbiBmcm9tIFwiLi8uLi90eXBlL2Jvb2xlYW5cIjtcbmltcG9ydCBTZWxlY3QgZnJvbSBcIi4vYWJzdHJhY3QvU2VsZWN0XCI7XG5pbXBvcnQgc2VsZWN0b3IgZnJvbSBcIi4vLi4vdXRpbHMvc2VsZWN0b3JcIjtcbmltcG9ydCBvd25zIGZyb20gXCIuLy4uL3V0aWxzL293bnNcIjtcblxuZnVuY3Rpb24gZmlsdGVyKGNiLCB2YWx1ZSkge1xuXHR2YXIgc2VsZWN0ZWRPcHRpb25zID0gW107XG5cblx0Y2IubGlzdGJveC5vcHRpb25zLmZvckVhY2gob3B0aW9uID0+IHtcblx0XHRpZih2YWx1ZSA9PT0gbnVsbCkge1xuXHRcdFx0b3B0aW9uLmhpZGRlbiA9IHRydWU7XG5cdFx0fSBlbHNlIGlmIChvcHRpb24uX25vZGUuaW5uZXJIVE1MLmluZGV4T2YodmFsdWUpID09IDApIHtcblx0XHRcdG9wdGlvbi5oaWRkZW4gPSBmYWxzZTtcblx0XHRcdGlmKG9wdGlvbi5fbm9kZS5pbm5lckhUTUwgPT09IHZhbHVlKSB7XG5cdFx0XHRcdHNlbGVjdGVkT3B0aW9ucy5wdXNoKG9wdGlvbik7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdG9wdGlvbi5oaWRkZW4gPSB0cnVlO1xuXHRcdH1cblx0fSk7XG5cblx0cmV0dXJuIHNlbGVjdGVkT3B0aW9ucztcbn1cblxuZnVuY3Rpb24gdG9nZ2xlTGlzdGJveChldikge1xuXHRpZihldikgZXYucHJldmVudERlZmF1bHQoKTtcblxuXHRpZiAodGhpcy5leHBhbmRlZCA9PSBib29sZWFuLklTX0FDVElWRSkge1xuXHRcdGhpZGVMaXN0Ym94LmNhbGwodGhpcyk7XG5cdH0gZWxzZSB7XG5cdFx0c2hvd0xpc3Rib3guY2FsbCh0aGlzKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVWYWx1ZShldikge1xuXHRpZihldikgZXYucHJldmVudERlZmF1bHQoKTtcblx0Y29uc29sZS5sb2codGhpcy50ZXh0Ym94LnZhbHVlLCBldi50YXJnZXQuaW5uZXJIVE1MLCB0aGlzLl8sIGV2KTtcblx0dGhpcy50ZXh0Ym94LnZhbHVlID0gZXYudGFyZ2V0LmlubmVySFRNTDtcblxuXHRoaWRlTGlzdGJveC5iaW5kKHRoaXMpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVMaXN0Ym94KCkgeyBcblx0dmFyIG9wdGlvbnMgPSBmaWx0ZXIodGhpcywgdGhpcy50ZXh0Ym94LnZhbHVlKTtcblxuXHRvcHRpb25zLmZvckVhY2goaSA9PiB7XG5cdFx0aS5zZWxlY3RlZCA9IHRydWU7XG5cdH0pO1xufVxuZnVuY3Rpb24gc2hvd0xpc3Rib3goKSB7XG5cdHRoaXMuZXhwYW5kZWQgPSBib29sZWFuLklTX0FDVElWRTtcblx0dXBkYXRlTGlzdGJveC5jYWxsKHRoaXMpO1xufVxuZnVuY3Rpb24gaGlkZUxpc3Rib3goKSB7XG5cdHRoaXMuZXhwYW5kZWQgPSBib29sZWFuLklTX05PVF9BQ1RJVkU7XG5cdGZpbHRlcih0aGlzKTtcbn1cblxuLyoqXG4gKiBAc3VtbWFyeSBBIGNvbXBvc2l0ZSB3aWRnZXQgY29udGFpbmluZyBhIHNpbmdsZS1saW5lIHRleHRib3ggYW5kIGFub3RoZXIgZWxlbWVudCwgXG4gKiBzdWNoIGFzIGEgbGlzdGJveCBvciBncmlkLCB0aGF0IGNhbiBkeW5hbWljYWxseSBwb3AgdXAgdG8gaGVscCB0aGUgdXNlciBzZXQgdGhlIHZhbHVlIG9mIHRoZSB0ZXh0Ym94LlxuICogQGRlc2NcbiAqIEEgY29tYm9ib3ggaXMgYSB3aWRnZXQgbWFkZSB1cCBvZiB0aGUgY29tYmluYXRpb24gb2YgdHdvIGRpc3RpbmN0IGVsZW1lbnRzOiBcbiAqIFxuICogMS4gYSBzaW5nbGUtbGluZSB0ZXh0Ym94XG4gKiAyLiBhbiBhc3NvY2lhdGVkIHBvcC11cCBlbGVtZW50IGZvciBoZWxwaW5nIHVzZXJzIHNldCB0aGUgdmFsdWUgb2YgdGhlIHRleHRib3guIFxuICogXG4gKiBUaGUgcG9wdXAgbWF5IGJlIGEgbGlzdGJveCwgZ3JpZCwgdHJlZSwgb3IgZGlhbG9nLiBNYW55IGltcGxlbWVudGF0aW9ucyBhbHNvIGluY2x1ZGUgYSB0aGlyZCBcbiAqIG9wdGlvbmFsIGVsZW1lbnQgLS0gYSBncmFwaGljYWwgYnV0dG9uIGFkamFjZW50IHRvIHRoZSB0ZXh0Ym94LCBpbmRpY2F0aW5nIHRoZSBhdmFpbGFiaWxpdHkgb2ZcbiAqIHRoZSBwb3B1cC4gQWN0aXZhdGluZyB0aGUgYnV0dG9uIGRpc3BsYXlzIHRoZSBwb3B1cCBpZiBzdWdnZXN0aW9ucyBhcmUgYXZhaWxhYmxlLlxuICogXG4gKiAjIyMgRXhhbXBsZVxuICogXG4gKiA8ZGl2IHJvbGU9XCJjb21ib2JveFwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiIGFyaWEtb3ducz1cImxpc3Rib3hcIiBhcmlhLWhhc3BvcHVwPVwibGlzdGJveFwiPlxuICogICA8aW5wdXQgcm9sZT1cInRleHRib3hcIiBjb250ZW50ZWRpdGFibGUgYXJpYS1hdXRvY29tcGxldGU9XCJsaXN0XCIgYXJpYS1jb250cm9scz1cImxpc3Rib3hcIiAgYXJpYS1hY3RpdmVkZXNjZW5kYW50PVwib3B0aW9uXzFcIi8+XG4gKiA8L2Rpdj5cbiAqIDx1bCByb2xlPVwibGlzdGJveFwiIGlkPVwibGlzdGJveFwiPlxuICogICA8bGkgaWQ9XCJvcHRpb25fMVwiIHJvbGU9XCJvcHRpb25cIj5BcHBsZTwvbGk+XG4gKiAgIDxsaSBpZD1cIm9wdGlvbl8yXCIgcm9sZT1cIm9wdGlvblwiPkJhbmFuYTwvbGk+XG4gKiA8L3VsPlxuICogXG4gKiBAZXh0ZW5kcyBTZWxlY3RcbiAqIEBwYXJhbSB7RWxlbWVudH0gW29wdGlvbnMuY29tYm9ib3gub3Blbl1cdFxuICogXHRPcHRpb25hbCBidXR0b24gdG8gb3BlbiB0aGUgcG9wLXVwIGVsZW1lbnQsIFxuICogXHRkZWZhdWx0cyB0byBmaXJzdCBidXR0b24gZWxlbWVudCBpbnNpZGUgdGhlIGVsZW1lbnRcbiAqL1xuY2xhc3MgQ29tYm9ib3ggZXh0ZW5kcyBTZWxlY3Qge1xuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0c3VwZXIoLi4uYXJncyk7XG5cblx0XHQvLyAvLyByZWdpc3RlciBjdXN0b20gZWxlbWVudHNcblx0XHQvLyB0aGlzLl8ucmVnaXN0ZXJDdXN0b21FbGVtZW50KFwiY29tYm9ib3gub3BlblwiLCB0aGlzLl9ub2RlLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IuZ2V0RGVlcChcImJ1dHRvblwiKSkpO1xuXHRcdFxuXHRcdHRoaXMudGV4dGJveCA9IG93bnMuZ2V0KHRoaXMsIHNlbGVjdG9yLmdldERlZXAoXCJ0ZXh0Ym94XCIpKTtcblx0XHR0aGlzLmxpc3Rib3ggPSBvd25zLmdldCh0aGlzLCBzZWxlY3Rvci5nZXREZWVwKFwibGlzdGJveFwiKSk7XG5cdFx0dGhpcy50ZXh0Ym94LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBjb25zb2xlLmxvZyk7XG5cdFx0dGhpcy5saXN0Ym94Lm9uY2hhbmdlID0gZnVuY3Rpb24oKSB7IGNvbnNvbGUubG9nKGFyZ3VtZW50cyk7IH07XG5cdFx0dGhpcy5vcHRpb25zID0gdGhpcy5saXN0Ym94Lm9wdGlvbnM7XG5cblx0XHQvLyBpZiAodGhpcy5fLmNvbWJvYm94Lm9wZW4pIHtcblx0XHQvLyBcdHRoaXMuXy5jb21ib2JveC5vcGVuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGVMaXN0Ym94LmJpbmQodGhpcykpO1xuXHRcdC8vIH1cblx0XHRcblx0XHQvLyB0aGlzLnRleHRib3guYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIHNob3dMaXN0Ym94LmJpbmQodGhpcykpO1xuXHRcdC8vIHRoaXMudGV4dGJveC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCBoaWRlTGlzdGJveC5iaW5kKHRoaXMpKTtcblx0XHQvLyB0aGlzLnRleHRib3guYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIHVwZGF0ZUxpc3Rib3guYmluZCh0aGlzKSk7XG5cblx0XHQvLyBpZih0aGlzLmF1dG9jb21wbGV0ZSA9PSBcImxpc3RcIikge1xuXHRcdC8vIFx0Ly8gSW5kaWNhdGVzIHRoYXQgdGhlIGF1dG9jb21wbGV0ZSBiZWhhdmlvciBvZiB0aGUgdGV4dCBpbnB1dCBpcyB0byBzdWdnZXN0IGEgbGlzdCBvZiBwb3NzaWJsZSB2YWx1ZXNcblx0XHQvLyBcdC8vIGluIGEgcG9wdXAgYW5kIHRoYXQgdGhlIHN1Z2dlc3Rpb25zIGFyZSByZWxhdGVkIHRvIHRoZSBzdHJpbmcgdGhhdCBpcyBwcmVzZW50IGluIHRoZSB0ZXh0Ym94LlxuXG5cdFx0Ly8gfSBlbHNlIGlmICh0aGlzLmF1dG9jb21wbGV0ZSA9PSBcImJvdGhcIikge1xuXHRcdC8vIFx0Ly8gbmRpY2F0ZXMgdGhhdCB0aGUgYXV0b2NvbXBsZXRlIGJlaGF2aW9yIG9mIHRoZSB0ZXh0IGlucHV0IGlzIHRvIGJvdGggc2hvdyBhbiBpbmxpbmUgXG5cdFx0Ly8gXHQvLyBjb21wbGV0aW9uIHN0cmluZyBhbmQgc3VnZ2VzdCBhIGxpc3Qgb2YgcG9zc2libGUgdmFsdWVzIGluIGEgcG9wdXAgd2hlcmUgdGhlIHN1Z2dlc3Rpb25zIFxuXHRcdC8vIFx0Ly8gYXJlIHJlbGF0ZWQgdG8gdGhlIHN0cmluZyB0aGF0IGlzIHByZXNlbnQgaW4gdGhlIHRleHRib3guXG5cdFx0Ly8gfVxuXG5cdFx0Ly8gLyoqIEB0b2RvIGRldGVybWluZSB3aGF0IHRvIGRvIHdpdGggZGVmYXVsdCB2YWx1ZXMgKi9cblx0XHQvLyBpZih0aGlzLmV4cGFuZGVkID09IHVuZGVmaW5lZCkgdGhpcy5leHBhbmRlZCA9IGZhbHNlO1xuXHRcdC8vIGlmICh0aGlzLmhhc1BvcHVwID09IHVuZGVmaW5lZCkgdGhpcy5oYXNQb3B1cCA9IFwibGlzdGJveFwiO1xuXHR9XG5cblx0b25jaGFuZ2UoZXYpIHtcblx0XHR0aGlzLnRleHRib3gudmFsdWUgPSBldi50YXJnZXQuaW5uZXJIVE1MO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbWJvYm94OyIsImltcG9ydCBtaXggZnJvbSBcIkB2ZXN0ZXJnYWFyZC1jb21wYW55L2pzLW1peGluXCI7XHJcbmltcG9ydCBXaW5kb3cgZnJvbSBcIi4vYWJzdHJhY3QvV2luZG93XCI7XHJcblxyXG5pbXBvcnQgQXJpYUV4cGFuZGVkIGZyb20gXCIuLi9hdHRyaWJ1dGVzL2FyaWEtZXhwYW5kZWQuanNcIjtcclxuXHJcbmZ1bmN0aW9uIGZvY3VzKG5vZGUpIHtcclxuXHQvLyBnZXQgYWxsIGVsZW1lbnRzIHdpdGhpbiBnaXZlbiBlbGVtZW50XHJcblx0bGV0IGNoaWxkcmVuID0gbm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcIipcIik7XHJcblx0XHJcblx0Ly8gcmVtb3ZlIGFsbCBlbGVtZW50cyB3aG8gYXJlbid0IGFjY2Vzc2libGUgYnkgYSB0YWJcclxuXHRsZXQgZm9jdXNhYmxlTm9kZXMgPSBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwoY2hpbGRyZW4sIGkgPT4ge1xyXG5cdFx0cmV0dXJuIChpLnRhYkluZGV4ID4gLTEgfHwgaS5jb250ZW50RWRpdGFibGUgPT0gXCJ0cnVlXCIpXHJcblx0XHRcdCYmICFpLmRpc2FibGVkICYmIGkub2Zmc2V0V2lkdGggPiAwICYmIGkub2Zmc2V0SGVpZ2h0ID4gMDtcclxuXHR9KTtcclxuXHRcclxuXHQvLyBzb3J0IGVsZW1lbnRzIGluIGRlc2NlbmRpbmcgb3JkZXJcclxuXHRmb2N1c2FibGVOb2Rlcy5zb3J0KChhLCBiKSA9PiBhLnRhYkluZGV4ICsgYi50YWJJbmRleCk7XHJcblxyXG5cdC8vIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpO1xyXG5cdC8vIGZvY3VzYWJsZUVsLmZvY3VzKCk7XHJcblx0cmV0dXJuIGZvY3VzYWJsZU5vZGVzO1xyXG59XHJcblxyXG4vKipcclxuICogQHN1bW1hcnkgQSBjaGlsZCB3aW5kb3cgd2l0aGluIGEgd2VicGFnZVxyXG4gKlxyXG4gKiBAZGVzY1xyXG4gKiAqIFByb21wdHMgdGhlIHVzZXIgdG8gcGVyZm9ybSBhIHNwZWNpZmljIGFjdGlvblxyXG4gKiAqIElmIGl0IGlzIGRlc2lnbmVkIHRvIGludGVycnVwLCBpdCBpcyB1c3VhbGx5IGEgbW9kYWwuIFNlZSBbYWxlcnRkaWFsb2ddKClcclxuICogKiBJdCBzaG91bGQgaGF2ZSBhIGxhYmVsLCBpdCBjYW4gYmUgZG9uZSB3aXRoIHRoZSBgYXJpYS1sYWJlbGAgYXR0cmlidXRlXHJcbiAqICogSXQgc2hvdWxkIGhhdmUgYXQgbGVhc3Qgb25lIGZvY3VzYWJsZSBkZXNjZW5kYW50IGVsZW1lbnQuXHJcbiAqICogSXQgc2hvdWxkIGZvY3VzIGFuIGVsZW1lbnQgaW4gdGhlIG1vZGFsIHdoZW4gZGlzcGxheWVkLlxyXG4gKiAqIEl0IHNob3VsZCBtYW5hZ2UgZm9jdXMgb2YgbW9kYWwgZGlhbG9ncyAoa2VlcCB0aGUgZm9jdXMgaW5zaWRlIHRoZSBvcGVuIG1vZGFsKS5cclxuICpcclxuICogIyMjIyMgZXhhbXBsZVxyXG4gKlxyXG4gKiA8ZGl2IHJvbGU9XCJkaWFsb2dcIiBhcmlhLWxhYmVsPVwiV2luZG93IHRvIGNvbmZpcm0geW91ciBhY2NlcHRhbmNlIG9mIHRoaXMgd29ybGRcIj5cclxuICogIEhlbGxvIHdvcmxkIVxyXG4gKiBcdDxidXR0b24gZm9jdXMgdHlwZT1cImJ1dHRvblwiPk9rPC9idXR0b24+XHJcbiAqIDwvZGl2PlxyXG4gKiBAZXh0ZW5kcyBXaW5kb3dcclxuICovXHJcbmNsYXNzIERpYWxvZyBleHRlbmRzIG1peChXaW5kb3cpLndpdGgoQXJpYUV4cGFuZGVkKSB7XHJcblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xyXG5cdFx0c3VwZXIoLi4uYXJncyk7XHJcblxyXG5cdFx0Ly8gdGhpcy5fbm9kZS5vd25lckRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCB0aGlzLl9vbkZvY3VzLmJpbmQodGhpcyksIHRydWUpO1xyXG5cdFx0Ly8gdGhpcy5fbm9kZS5vd25lckRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIHRoaXMuX29uRm9jdXMuYmluZCh0aGlzKSwgdHJ1ZSk7XHJcblx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlcIiwgdGhpcy5vbkNsb3NlLmJpbmQodGhpcyksIHsga2V5OiBcIkVzY2FwZVwiLCB0YXJnZXQ6IHRoaXMuX25vZGUub3duZXJEb2N1bWVudH0pO1xyXG5cclxuXHRcdHZhciBuID0gZm9jdXMoZG9jdW1lbnQpO1xyXG5cdFx0dmFyIGkgPSAwO1xyXG5cdFx0Ly8gdmFyIHQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcblx0XHQvLyBcdGNvbnNvbGUubG9nKE1vdXNldHJhcChkb2N1bWVudC5hY3RpdmVFbGVtZW50KS50cmlnZ2VyKFwidGFiXCIpKTtcclxuXHRcdC8vIFx0Ly8gbGV0IGkgPSBuLmluZGV4T2YoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XHJcblx0XHQvLyBcdGlmKGkgPCBuLmxlbmd0aCkge1xyXG5cdFx0Ly8gXHRcdHZhciBmID0gbmV3IEZvY3VzRXZlbnQoXCJmb2N1c1wiKTtcclxuXHRcdC8vIFx0XHRuW2krK10uZGlzcGF0Y2hFdmVudChmKTtcclxuXHRcdC8vIFx0XHQvLyBjb25zb2xlLmxvZyhuW2krK10uZm9jdXMoKSk7XHJcblx0XHQvLyBcdH1cclxuXHRcdC8vIH0sIDEwMDApO1xyXG5cdH1cclxuXHJcblx0X29uRm9jdXMoZXYpIHtcclxuXHRcdC8vIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRsZXQgbiA9IGZvY3VzKHRoaXMuX25vZGUub3duZXJEb2N1bWVudCk7XHJcblx0XHRpZihuW24ubGVuZ3RoLTFdICE9IGV2LnRhcmdldCkge1xyXG5cdFx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR3aW5kb3cuZm9jdXMoKTtcclxuXHRcdH1cclxuXHRcdGNvbnNvbGUubG9nKGV2KTtcclxuXHR9XHJcblxyXG5cdG9uQ2xvc2UoZXYpIHtcclxuXHRcdGlmKGV2KSBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0dGhpcy5fbm9kZS5oaWRkZW4gPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJjbG9zZVwiKSk7XHJcblx0fVxyXG5cclxuXHRfb25IaWRkZW5NdXRhdGlvbihldikge1xyXG5cdFx0aWYodGhpcy5fbm9kZS5nZXRBdHRyaWJ1dGUoXCJoaWRkZW5cIikgPT09IFwidHJ1ZVwiKSB7XHJcblx0XHRcdHZhciBuID0gZm9jdXModGhpcy5fbm9kZSk7XHJcblx0XHRcdG5bMF0uZm9jdXMoKTtcclxuXHRcdFx0Y29uc29sZS5sb2cobiwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCwgbiA9PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGlhbG9nOyIsImltcG9ydCBMYW5kbWFyayBmcm9tIFwiLi9hYnN0cmFjdC9MYW5kbWFya1wiO1xyXG5pbXBvcnQgc2VsZWN0b3IgZnJvbSBcIi4vLi4vdXRpbHMvc2VsZWN0b3JcIjtcclxuaW1wb3J0IGVsZW1lbnRzIGZyb20gXCIuLy4uL3V0aWxzL2VsZW1lbnRzXCI7XHJcbmltcG9ydCBjcmVhdGUgZnJvbSBcIi4vLi4vdXRpbHMvY3JlYXRlXCI7XHJcblxyXG5jbGFzcyBGb3JtIGV4dGVuZHMgTGFuZG1hcmsge1xyXG5cdGdldCBlbGVtZW50cygpIHtcclxuXHRcdC8vIGdldCBuYXRpdmUgZWxlbWVudHNcclxuXHRcdHZhciBzZWxlY3RvciA9IFtcImJ1dHRvblwiLCBcImZpZWxkc2V0XCIsIFwiaW5wdXRcIiwgXCJvYmplY3RcIiwgXCJvdXRwdXRcIiwgXCJzZWxlY3RcIiwgXCJ0ZXh0YXJlYVwiXS5qb2luKFwiOm5vdChbcm9sZV0pLFwiKTtcclxuXHRcdHZhciByZXMgPSBBcnJheS5mcm9tKHRoaXMuZWxlbWVudHMucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xyXG5cclxuXHRcdHZhciBleHBsaWNpdFJvbGUgPSBcIlwiO1xyXG5cdFx0ZXhwbGljaXRSb2xlICs9IHNlbGVjdG9yLmdldERlZXBSb2xlKFwiYnV0dG9uXCIpO1xyXG5cdFx0ZXhwbGljaXRSb2xlICs9IHNlbGVjdG9yLmdldERlZXBSb2xlKFwiaW5wdXRcIik7XHJcblx0XHRleHBsaWNpdFJvbGUgKz0gc2VsZWN0b3IuZ2V0RGVlcFJvbGUoXCJzdGF0dXNcIik7XHJcblx0XHRleHBsaWNpdFJvbGUgKz0gc2VsZWN0b3IuZ2V0RGVlcFJvbGUoXCJzZWxlY3RcIik7XHJcblxyXG5cdFx0QXJyYXkucHJvdG90eXBlLmZvckVhY2goXHJcblx0XHRcdHRoaXMuZWxlbWVudHMucXVlcnlTZWxlY3RvckFsbChleHBsaWNpdFJvbGUpLCBcclxuXHRcdFx0bm9kZSA9PiByZXMucHVzaChlbGVtZW50cy5nZXQobm9kZSkgfHwgY3JlYXRlLm9uZShub2RlKSlcclxuXHRcdCk7XHJcblx0XHRjb25zb2xlLmxvZyhyZXMsIGV4cGxpY2l0Um9sZSwgc2VsZWN0b3IpO1xyXG5cdFx0cmV0dXJuIHJlcztcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZvcm07IiwiaW1wb3J0IG1peCBmcm9tIFwiQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW5cIjtcbmltcG9ydCBDb21tYW5kIGZyb20gXCIuL2Fic3RyYWN0L0NvbW1hbmQuanNcIjtcbmltcG9ydCBib29sZWFuIGZyb20gXCIuLy4uL3R5cGUvYm9vbGVhblwiO1xuXG5pbXBvcnQgQXJpYUV4cGFuZGVkIGZyb20gXCIuLi9hdHRyaWJ1dGVzL2FyaWEtZXhwYW5kZWRcIjtcblxuZnVuY3Rpb24gY2xvc2UoKSB7XG5cdHRoaXMuZXhwYW5kZWQgPSBib29sZWFuLklTX05PVF9BQ1RJVkU7XG59XG5cbi8qKlxuICogQW4gaW50ZXJhY3RpdmUgcmVmZXJlbmNlIHRvIGFuIGludGVybmFsIG9yIGV4dGVybmFsIHJlc291cmNlIHRoYXQsXG4gKiB3aGVuIGFjdGl2YXRlZCwgY2F1c2VzIHRoZSB1c2VyIGFnZW50IHRvIG5hdmlnYXRlIHRvIHRoYXQgcmVzb3VyY2UuXG4gKiBcbiAqIEBleHRlbmRzIENvbW1hbmRcbiAqIEBtaXhlcyBBcmlhRXhwYW5kZWRcbiAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLmxpbmsuaHJlZiAgVVJMIHRoYXQgc2hvdWxkIGJlIHVzZWRcbiAqIEBsaXN0ZW5zIGNsaWNrXG4gKiBAZXhhbXBsZVxuICogPGRpdiByb2xlPVwibGlua1wiIGRhdGEtbGluay1ocmVmPVwiaHR0cDovL3d3dy5leGFtcGxlLmNvbS9cIiB0YWJpbmRleD1cIjBcIj5cbiAqIFx0T3BlbiB3ZWJzaXRlXG4gKiA8L2Rpdj5cbiAqL1xuY2xhc3MgTGluayBleHRlbmRzIG1peChDb21tYW5kKS53aXRoKEFyaWFFeHBhbmRlZCkge1xuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0c3VwZXIoLi4uYXJncyk7XG5cblx0XHR0aGlzLl8ucmVnaXN0ZXJDdXN0b21WYWx1ZShcImxpbmsuaHJlZlwiKTtcblxuXHRcdGlmKHRoaXMuXy5saW5rLmhyZWYpIHtcblx0XHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25DbGljay5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKSwgeyBrZXk6IFwiRW50ZXJcIiB9KTtcblx0XHR9XG5cblx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJleHBhbmRlZFwiKVxuXG5cdFx0aWYgKHRoaXMuZXhwYW5kZWQgIT09IHVuZGVmaW5lZCkgeyAvLyB0b2RvOiBhZGQgd2hlbiBmaXJzdCB0aW1lIGFyaWEtZXhwYW5kZWQgaXMgYm9vbGVhblxuXHRcdFx0dGhpcy5jb250cm9scy5mb3JFYWNoKGNvbnRyb2wgPT4gY29udHJvbC5hZGRFdmVudExpc3RlbmVyKFwiY2xvc2VcIiwgY2xvc2UuYmluZCh0aGlzKSkpO1xuXHRcdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vbmV4cGFuZGVkLmJpbmQodGhpcykpO1xuXHRcdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwia2V5XCIsIHRoaXMub25leHBhbmRlZC5iaW5kKHRoaXMpLCB7IGtleTogXCJFbnRlclwiIH0pO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBGaXJlZCB3aGVuIHN0YXRlIG9mIGV4cGFuZGVkIGlzIGNoYW5nZWQgXG5cdCAqIEBwYXJhbSB7RXZlbnR9IGV2IFxuXHQgKi9cblx0b25leHBhbmRlZChldikge1xuXHRcdGlmICh0eXBlb2Ygc3VwZXIub25leHBhbmRlZCA9PSBcImZ1bmN0aW9uXCIpIHN1cGVyLm9uZXhwYW5kZWQoZXYpO1xuXG5cdFx0aWYgKHRoaXMuZGlzYWJsZWQgIT09IHRydWUpIHtcblx0XHRcdGlmICh0aGlzLmV4cGFuZGVkKSB7XG5cdFx0XHRcdHRoaXMuY29udHJvbHMuZm9yRWFjaChjb250cm9sID0+IHtcblx0XHRcdFx0XHRjb250cm9sLmVsZW1lbnQuaGlkZGVuID0gZmFsc2U7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5jb250cm9scy5mb3JFYWNoKGNvbnRyb2wgPT4ge1xuXHRcdFx0XHRcdGNvbnRyb2wuZWxlbWVudC5oaWRkZW4gPSB0cnVlO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogT3BlbiB0aGUgdXJsIHRoYXQgaXMgZGVmaW5lZCBpbiB0aGUgb3B0aW9ucywgIFxuXHQgKiBmaXJlcyBhbiBjbGljayBldmVudCBvbmx5IGlmIGl0cyBvcmlnaW4gd2Fzbid0IGFuIGNsaWNrIGV2ZW50XG5cdCAqIEBwYXJhbSB7RXZlbnR9IGV2IFxuXHQgKiBAZmlyZXMgbGluayNhY2Nlc3NpYmxlY2xpY2tcblx0ICogQGZpcmVzIGNsaWNrXG5cdCAqL1xuXHRvbkNsaWNrKGV2KSB7XG5cdFx0aWYgKHR5cGVvZiBzdXBlci5vbkNsaWNrID09IFwiZnVuY3Rpb25cIikgc3VwZXIub25DbGljayhldik7XG5cdFxuXHRcdGlmKHRoaXMuXy5saW5rLmhyZWYpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwic2hvdWxkIG9wZW5cIiwgdGhpcy5fLmxpbmsuaHJlZik7XG5cdFx0XHQvLyB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHRoaXMuXy5saW5rLmhyZWY7XG5cdFx0fVxuXG5cdFx0LyoqXG4gICAgICogQW4gY2xpY2sgdHJpZ2dlcmVkIGJ5IGFuIGtleWJvYXJkIG9yIG1vdXNlXG4gICAgICogQGV2ZW50IExpbmsjYWNjZXNzaWJsZWNsaWNrXG4gICAgICovXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImFjY2Vzc2libGVjbGlja1wiKSk7XG5cdFx0aWYoZXYudHlwZSAhPT0gXCJjbGlja1wiKSB7XG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IE1vdXNlRXZlbnQoXCJjbGlja1wiKSk7XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExpbms7IiwiaW1wb3J0IFNlbGVjdCBmcm9tIFwiLi9hYnN0cmFjdC9TZWxlY3RcIjtcclxuXHJcbi8qKiBAbW9kdWxlIExpc3Rib3ggKi9cclxuXHJcbi8qKlxyXG4gKiAjIyMgS2V5Ym9hcmQgU3VwcG9ydFxyXG4gKlxyXG4gKiAjIyMjIERlZmF1bHRcclxuICogXHJcbiAqIHwgS2V5IHwgRnVuY3Rpb24gfFxyXG4gKiB8IC0tLSB8IC0tLS0tLS0tIHxcclxuICogfCBEb3duIEFycm93IHwgTW92ZXMgZm9jdXMgdG8gdGhlIG5leHQgb3B0aW9uIDxici8+IElmIG5vdCBtdWx0aXNlbGVjdGFibGUsIGl0IHNlbGVjdHMgdGhlIGZvY3VzZWQgb3B0aW9uLlxyXG4gKiB8IFVwIEFycm93IFx0fCBNb3ZlcyBmb2N1cyB0byB0aGUgcHJldmlvdXMgb3B0aW9uICA8YnIvPiBJZiBub3QgbXVsdGlzZWxlY3RhYmxlLCBpdCBzZWxlY3RzIHRoZSBmb2N1c2VkIG9wdGlvbi5cclxuICogfCBIb21lIFx0XHRcdHxcdE1vdmVzIGZvY3VzIHRvIHRoZSBmaXJzdCBvcHRpb24gIDxici8+IElmIG5vdCBtdWx0aXNlbGVjdGFibGUsIGl0IHNlbGVjdHMgdGhlIGZvY3VzZWQgb3B0aW9uLlxyXG4gKiB8IEVuZCAgXHRcdFx0fFx0TW92ZXMgZm9jdXMgdG8gdGhlIGxhc3Qgb3B0aW9uICA8YnIvPiBJZiBub3QgbXVsdGlzZWxlY3RhYmxlLCBpdCBzZWxlY3RzIHRoZSBmb2N1c2VkIG9wdGlvbi5cclxuICogXHJcbiAqICMjIyMgTXVsdGlwbGUgc2VsZWN0aW9uXHJcbiAqIFxyXG4gKiB8IEtleSB8IEZ1bmN0aW9uIHxcclxuICogfCAtLS0gfCAtLS0tLS0tLSB8XHJcbiAqIHwgU3BhY2VcdFx0XHRcdFx0fCBDaGFuZ2VzIHRoZSBzZWxlY3Rpb24gc3RhdGUgb2YgdGhlIGZvY3VzZWQgb3B0aW9uLiB8XHJcbiAqIHwgU2hpZnQgKyBEb3duIEFycm93IFx0fCBNb3ZlcyBmb2N1cyB0byBhbmQgc2VsZWN0cyB0aGUgbmV4dCBvcHRpb24uIHxcclxuICogfCBTaGlmdCArIFVwIEFycm93IFx0IFx0fCBNb3ZlcyBmb2N1cyB0byBhbmQgc2VsZWN0cyB0aGUgcHJldmlvdXMgb3B0aW9uLiB8XHJcbiAqIHwgQ29udHJvbCArIFNoaWZ0ICsgSG9tZSB8XHRTZWxlY3RzIGZyb20gdGhlIGZvY3VzZWQgb3B0aW9uIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGxpc3QuIHxcclxuICogfCBDb250cm9sICsgU2hpZnQgKyBFbmQgIHwgU2VsZWN0cyBmcm9tIHRoZSBmb2N1c2VkIG9wdGlvbiB0byB0aGUgZW5kIG9mIHRoZSBsaXN0LiB8XHJcbiAqIHwgQ29udHJvbCArIEEgXHQgICAgICAgIHwgU2VsZWN0cyBhbGwgb3B0aW9ucyBpbiB0aGUgbGlzdC4gSWYgYWxsIG9wdGlvbnMgYXJlIHNlbGVjdGVkLCB1bnNlbGVjdHMgYWxsIG9wdGlvbnMuIHxcclxuICogXHJcbiAqICMjIyBFeGFtcGxlXHJcbiAqIFxyXG4gKiAjIyMjIEJhc2ljIGV4YW1wbGVcclxuICogXHJcbiAqIDx1bCByb2xlPVwibGlzdGJveFwiIHRhYmluZGV4PVwiMFwiIGFyaWEtYWN0aXZlZGVzY2VuZGFudD1cIm9wdGlvbl8xXCIgZGF0YS1saXN0Ym94LXNpemU9XCIzMFwiPlxyXG4gKiAgIDxsaSBpZD1cIm9wdGlvbl8xXCIgcm9sZT1cIm9wdGlvblwiPkFwcGxlPC9saT5cclxuICogICA8bGkgaWQ9XCJvcHRpb25fM1wiIHJvbGU9XCJvcHRpb25cIj5Bc3BhcmFndXM8L2xpPlxyXG4gKiAgIDxsaSBpZD1cIm9wdGlvbl81XCIgcm9sZT1cIm9wdGlvblwiPkJlZXRzPC9saT5cclxuICogICA8bGkgaWQ9XCJvcHRpb25fN1wiIHJvbGU9XCJvcHRpb25cIj5Ccm9jY29saTwvbGk+XHJcbiAqICAgPGxpIGlkPVwib3B0aW9uXzlcIiByb2xlPVwib3B0aW9uXCI+Q2FiYmFnZTwvbGk+XHJcbiAqICAgPGxpIGlkPVwib3B0aW9uXzExXCIgcm9sZT1cIm9wdGlvblwiPkNhdWxpZmxvd2VyPC9saT5cclxuICogICA8bGkgaWQ9XCJvcHRpb25fMTNcIiByb2xlPVwib3B0aW9uXCI+Q2hhcmQ8L2xpPlxyXG4gKiAgIDxsaSBpZD1cIm9wdGlvbl8xNVwiIHJvbGU9XCJvcHRpb25cIj5Db3JuPC9saT5cclxuICogICA8bGkgaWQ9XCJvcHRpb25fMTdcIiByb2xlPVwib3B0aW9uXCI+RGFpa29uPC9saT5cclxuICogICA8bGkgaWQ9XCJvcHRpb25fMTlcIiByb2xlPVwib3B0aW9uXCI+RWRhbWFtZTwvbGk+XHJcbiAqIFx0PC91bD5cclxuICogXHJcbiAqIGBgYGh0bWxcclxuICogPHVsIHJvbGU9XCJsaXN0Ym94XCIgdGFiaW5kZXg9XCIwXCIgYXJpYS1hY3RpdmVkZXNjZW5kYW50PVwib3B0aW9uXzFcIj5cclxuICogICA8bGkgaWQ9XCJvcHRpb25fMjFcIiByb2xlPVwib3B0aW9uXCI+RWxkZXJiZXJyeTwvbGk+XHJcbiAqICAgLi4uXHJcbiAqIDwvdWw+XHJcbiAqIGBgYFxyXG4gKiBcclxuICogIyMjIyBNdWx0aSBzZWxlY3RhYmxlIGV4YW1wbGVcclxuICogXHJcbiAqIDx1bCByb2xlPVwibGlzdGJveFwiIHRhYmluZGV4PVwiMFwiIGFyaWEtYWN0aXZlZGVzY2VuZGFudD1cIm9wdGlvbl8yMVwiIGFyaWEtbXVsdGlzZWxlY3RhYmxlPVwidHJ1ZVwiPlxyXG4gKiAgIDxsaSBpZD1cIm9wdGlvbl8yMVwiIHJvbGU9XCJvcHRpb25cIj5FbGRlcmJlcnJ5PC9saT5cclxuICogICA8bGkgaWQ9XCJvcHRpb25fMjNcIiByb2xlPVwib3B0aW9uXCI+RmlnPC9saT5cclxuICogICA8bGkgaWQ9XCJvcHRpb25fMjVcIiByb2xlPVwib3B0aW9uXCI+R3JhcGU8L2xpPlxyXG4gKiAgIDxsaSBpZD1cIm9wdGlvbl8yN1wiIHJvbGU9XCJvcHRpb25cIj5JY2ViZXJnIGxldHR1Y2U8L2xpPlxyXG4gKiAgIDxsaSBpZD1cIm9wdGlvbl8yOVwiIHJvbGU9XCJvcHRpb25cIj5LYWxlPC9saT5cclxuICogICA8bGkgaWQ9XCJvcHRpb25fMzFcIiByb2xlPVwib3B0aW9uXCI+TGVlazwvbGk+XHJcbiAqICAgPGxpIGlkPVwib3B0aW9uXzMzXCIgcm9sZT1cIm9wdGlvblwiPk1hbmdvPC9saT5cclxuICogICA8bGkgaWQ9XCJvcHRpb25fMzVcIiByb2xlPVwib3B0aW9uXCI+TWVsb248L2xpPlxyXG4gKiAgIDxsaSBpZD1cIm9wdGlvbl8zN1wiIHJvbGU9XCJvcHRpb25cIj5OZWN0YXJpbmU8L2xpPlxyXG4gKiAgIDxsaSBpZD1cIm9wdGlvbl8zOVwiIHJvbGU9XCJvcHRpb25cIj5PbGl2ZTwvbGk+XHJcbiAqICAgPGxpIGlkPVwib3B0aW9uXzQxXCIgcm9sZT1cIm9wdGlvblwiPk9yYW5nZTwvbGk+XHJcbiAqICAgPGxpIGlkPVwib3B0aW9uXzQzXCIgcm9sZT1cIm9wdGlvblwiPlBlYTwvbGk+XHJcbiAqICAgPGxpIGlkPVwib3B0aW9uXzQ1XCIgcm9sZT1cIm9wdGlvblwiPlBpbmVhcHBsZTwvbGk+XHJcbiAqICAgPGxpIGlkPVwib3B0aW9uXzQ3XCIgcm9sZT1cIm9wdGlvblwiPlB1bXBraW48L2xpPlxyXG4gKiAgIDxsaSBpZD1cIm9wdGlvbl80OVwiIHJvbGU9XCJvcHRpb25cIj5SYWRpc2g8L2xpPlxyXG4gKiAgIDxsaSBpZD1cIm9wdGlvbl81MVwiIHJvbGU9XCJvcHRpb25cIj5TaGFsbG90PC9saT5cclxuICogICA8bGkgaWQ9XCJvcHRpb25fNTNcIiByb2xlPVwib3B0aW9uXCI+U3F1YXNoPC9saT5cclxuICogICA8bGkgaWQ9XCJvcHRpb25fNTVcIiByb2xlPVwib3B0aW9uXCI+U3dlZXQgcG90YXRvPC9saT5cclxuICogICA8bGkgaWQ9XCJvcHRpb25fNTdcIiByb2xlPVwib3B0aW9uXCI+VHVybmlwPC9saT5cclxuICogICA8bGkgaWQ9XCJvcHRpb25fNTlcIiByb2xlPVwib3B0aW9uXCI+VmljdG9yaWEgcGx1bTwvbGk+XHJcbiAqICAgPGxpIGlkPVwib3B0aW9uXzYxXCIgcm9sZT1cIm9wdGlvblwiPldhdGVybWVsb248L2xpPlxyXG4gKiAgIDxsaSBpZD1cIm9wdGlvbl82M1wiIHJvbGU9XCJvcHRpb25cIj5adWNjaGluPC9saT5cclxuICogXHQ8L3VsPlxyXG4gKiBcclxuICogYGBgaHRtbFxyXG4gKiA8dWwgcm9sZT1cImxpc3Rib3hcIiB0YWJpbmRleD1cIjBcIiBhcmlhLWFjdGl2ZWRlc2NlbmRhbnQ9XCJvcHRpb25fMVwiIGFyaWEtbXVsdGlzZWxlY3RhYmxlPVwidHJ1ZVwiPlxyXG4gKiAgIDxsaSBpZD1cIm9wdGlvbl8yMVwiIHJvbGU9XCJvcHRpb25cIj5FbGRlcmJlcnJ5PC9saT5cclxuICogICAuLi5cclxuICogPHVsPlxyXG4gKiBgYGBcclxuICogXHJcbiAqIEBzdW1tYXJ5IEEgd2lkZ2V0IHRoYXQgYWxsb3dzIHRoZSB1c2VyIHRvIHNlbGVjdCBvbmUgb3IgbW9yZSBpdGVtcyBmcm9tIGEgbGlzdCBvZiBjaG9pY2VzLlxyXG4gKiBAZXh0ZW5kcyBTZWxlY3RcclxuICogQGFsaWFzIG1vZHVsZTpMaXN0Ym94XHJcbiAqL1xyXG5jbGFzcyBMaXN0Ym94IGV4dGVuZHMgU2VsZWN0IHtcclxuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XHJcblx0XHRzdXBlciguLi5hcmdzKTtcclxuXHJcblx0XHR0aGlzLl8ucmVnaXN0ZXJDdXN0b21WYWx1ZShcImxpc3Rib3guc2l6ZVwiLCAxKTtcclxuXHRcdHRoaXMuc2l6ZSA9IDEwO1xyXG5cdH1cclxuXHJcblx0b25DaGFuZ2UoZXYpIHtcclxuXHRcdGNvbnNvbGUubG9nKGV2KTtcclxuXHRcdC8vIHJldHJpZXZlIG9wdGlvbiB0aGF0IGhhcyBiZWVuIGNoYW5nZWRcclxuXHRcdHZhciBjaGFuZ2VkT3B0aW9uID0gdGhpcy5vcHRpb25zLmZpbmQob3B0aW9uID0+IG9wdGlvbi5fbm9kZSA9PT0gZXYudGFyZ2V0KTtcclxuXHJcblx0XHQvLyBpZiBvbmx5IGl0ZW0gY2FuIGJlIHNlbGVjdGVkLCByZW1vdmUgcHJldmlvdXMgc2VsZWN0ZWQgaXRlbXNcclxuXHRcdGlmICghdGhpcy5tdWx0aXNlbGVjdGFibGUgJiYgY2hhbmdlZE9wdGlvbi5zZWxlY3RlZCA9PT0gdHJ1ZSkge1xyXG5cdFx0XHR0aGlzLm9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xyXG5cdFx0XHRcdGlmIChvcHRpb24uc2VsZWN0ZWQgJiYgb3B0aW9uLl9ub2RlICE9PSBldi50YXJnZXQpIHtcclxuXHRcdFx0XHRcdG9wdGlvbi5zZWxlY3RlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9IGVsc2UgaWYoIXRoaXMubXVsdGlzZWxlY3RhYmxlKSB7XHJcblx0XHRcdC8vIGNoZWNrIGlmIG9wdGlvbiBnb3QgZGlzYWJsZWRcclxuXHRcdFx0aWYoIXRoaXMub3B0aW9ucy5maW5kKG9wdGlvbiA9PiBvcHRpb24uc2VsZWN0ZWQpKXtcclxuXHRcdFx0XHQvLyByZXZlcnQgYWN0aW9uXHJcblx0XHRcdFx0ZXYucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHR5cGVvZiBzdXBlci5vbmNoYW5nZSA9PSBcImZ1bmN0aW9uXCIpIHN1cGVyLm9uQ2hhbmdlKGV2KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgLyBTZXRzIHRoZSBzaXplIG9mIGNvbnRyb2wuXHJcblx0ICogQHR5cGUge0ludGVnZXJ9XHJcblx0ICovXHJcblx0Z2V0IHNpemUoKSB7IHJldHVybiB0aGlzLl8ubGlzdGJveC5zaXplOyB9XHJcblx0c2V0IHNpemUodmFsKSB7XHJcblx0XHR2YXIgaGVpZ2h0ID0gdGhpcy5vcHRpb25zWzBdLmNsaWVudEhlaWdodDtcclxuXHRcdHRoaXMuX25vZGUuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICogdmFsICsgXCJweFwiO1xyXG5cdFx0dGhpcy5fLmxpc3Rib3guc2l6ZSA9IHZhbDtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpc3Rib3g7IiwiLyoqIEBtb2R1bGUgTWVudSAqL1xyXG5cclxuaW1wb3J0IG1peCBmcm9tIFwiQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW5cIjtcclxuXHJcbmltcG9ydCBSb2xldHlwZSBmcm9tIFwiLi9hYnN0cmFjdC9Sb2xldHlwZVwiO1xyXG5pbXBvcnQgYWN0aXZlRGVzY2VuZGFudCBmcm9tIFwiLi8uLi9wcm9wZXJ0aWVzL2FjdGl2ZURlc2NlbmRhbnRcIjtcclxuXHJcbmltcG9ydCBmb2N1cyBmcm9tIFwiLi8uLi91dGlscy9mb2N1c1wiO1xyXG5pbXBvcnQgdHJlZSBmcm9tIFwiLi8uLi91dGlscy90cmVlXCI7XHJcblxyXG4vKiogXHJcbiAqICMjIyBFeGFtcGxlc1xyXG4gKiBcclxuICogPHVsIGlkPVwibWVudWJhcjFcIiByb2xlPVwibWVudWJhclwiPlxyXG4gKiAgIDxsaSByb2xlPVwibm9uZVwiPjxhIHJvbGU9XCJtZW51aXRlbVwiPkhvaTwvYT48L2xpPlxyXG4gKiAgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCI+XHJcbiAqICAgICA8YSByb2xlPVwibWVudWl0ZW1cIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiIGhyZWY9XCIjXCIgdGFiaW5kZXg9XCIwXCI+QWJvdXQ8L2E+XHJcbiAqICAgICA8dWwgcm9sZT1cIm1lbnVcIiBhcmlhLWxhYmVsPVwiQWJvdXRcIj5cclxuICogICAgICAgPGxpPjxhIHJvbGU9XCJtZW51aXRlbVwiIGhyZWY9XCJtYi1hYm91dC5odG1sI292ZXJ2aWV3XCIgdGFiaW5kZXg9XCItMVwiPk92ZXJ2aWV3PC9hPjwvbGk+XHJcbiAqICAgICAgIDxsaSByb2xlPVwibm9uZVwiPjxhIHJvbGU9XCJtZW51aXRlbVwiIGhyZWY9XCJtYi1hYm91dC5odG1sI2FkbWluXCIgdGFiaW5kZXg9XCItMVwiPkFkbWluaXN0cmF0aW9uPC9hPjwvbGk+XHJcbiAqICAgICAgIDxsaSByb2xlPVwibm9uZVwiPlxyXG4gKiAgICAgICAgIDxhIGlkPVwibWVudWJhcjExM1wiIHJvbGU9XCJtZW51aXRlbVwiIGhyZWY9XCIjXCIgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIiB0YWJpbmRleD1cIi0xXCI+RmFjdHM8L2E+XHJcbiAqICAgICAgICAgPHVsIHJvbGU9XCJtZW51XCIgYXJpYS1sYWJlbD1cIkZhY3RzXCI+XHJcbiAqICAgICAgICAgICA8bGkgcm9sZT1cIm5vbmVcIj48YSByb2xlPVwibWVudWl0ZW1cIiBocmVmPVwibWItYWJvdXQuaHRtbCNmYWN0c1wiIHRhYmluZGV4PVwiMFwiPkhpc3Rvcnk8L2E+PC9saT5cclxuICogICAgICAgICAgIDxsaSByb2xlPVwibm9uZVwiPjxhIHJvbGU9XCJtZW51aXRlbVwiIGhyZWY9XCJtYi1hYm91dC5odG1sI2ZhY3RzXCIgdGFiaW5kZXg9XCItMVwiPkN1cnJlbnQgU3RhdGlzdGljczwvYT48L2xpPlxyXG4gKiAgICAgICAgICAgPGxpIHJvbGU9XCJub25lXCI+PGEgcm9sZT1cIm1lbnVpdGVtXCIgaHJlZj1cIm1iLWFib3V0Lmh0bWwjZmFjdHNcIiB0YWJpbmRleD1cIi0xXCI+QXdhcmRzPC9hPjwvbGk+XHJcbiAqICAgICAgICAgPC91bD5cclxuICogICAgICAgPC9saT5cclxuICogICAgIDwvdWw+XHJcbiAqICAgPC9saT5cclxuICogPC91bD5cclxuICogXHJcbiAqIEBhbGlhcyBtb2R1bGU6TWVudVxyXG4gKiBcclxuICogQGxpc3RlbnMgS2V5Ym9hcmRFdmVudDpFc2NhcGVcclxuICogQGxpc3RlbnMgb3BlblxyXG4gKiBAbGlzdGVucyBjbG9zZVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVudSBleHRlbmRzIG1peChSb2xldHlwZSkud2l0aChhY3RpdmVEZXNjZW5kYW50KSB7XHJcblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xyXG5cdFx0c3VwZXIoLi4uYXJncyk7XHJcblxyXG5cdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwia2V5XCIsIHRoaXMub25DbG9zZS5iaW5kKHRoaXMpLCB7a2V5OiBcIkVzY2FwZVwifSk7XHJcblx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJvcGVuXCIsIHRoaXMub25PcGVuLmJpbmQodGhpcykpO1xyXG5cdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwiY2xvc2VcIiwgdGhpcy5vbkNsb3NlLmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0b25DbG9zZShldikge1xyXG5cdFx0Ly8gY2hlY2sgaWYgdGFyZ2V0IGlzIGEgZGlyZWN0IGNoaWxkXHJcblx0XHRpZiAoKHRoaXMub3B0aW9ucy5pbmRleE9mKGV2LnRhcmdldCkgPiAtMSkgfHwgdGhpcyA9PT0gZXYudGFyZ2V0KSB7XHJcblx0XHRcdGxldCBwYXJlbnQgPSB0cmVlLmdldFBhcmVudCh0aGlzKTtcclxuXHJcblx0XHRcdC8vIGNoZWNrIGlmIGN1cnJlbnQgbWVudSBpcyBhIHN1Ym1lbnVcclxuXHRcdFx0aWYgKHBhcmVudCAmJiAocGFyZW50LnJvbGUgPT0gXCJtZW51XCIgfHwgcGFyZW50LnJvbGUgPT0gXCJtZW51YmFyXCIpICYmIHBhcmVudC5vcHRpb25zKSB7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Ly8gZmluZCBtZW51aXRlbSB0aGF0IGNvbnRyb2xzIHRoZSBzdGF0ZSBvZiBjdXJyZW50IG1lbnVcclxuXHRcdFx0XHRsZXQgYW5jZXN0b3IgPSBwYXJlbnQub3B0aW9ucy5maW5kKG9wdGlvbiA9PiBvcHRpb24uY29udHJvbHMgJiYgb3B0aW9uLmNvbnRyb2xzLmluZGV4T2YodGhpcykgPiAtMSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYoYW5jZXN0b3IpIHtcclxuXHRcdFx0XHRcdHRoaXMuaGlkZGVuID0gdHJ1ZTtcclxuXHRcdFx0XHRcdGZvY3VzLmZvY3VzKGFuY2VzdG9yKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9uT3Blbihldikge1xyXG5cdFx0aWYgKGV2LnRhcmdldCA9PT0gdGhpcyAmJiAhZXYuYnViYmxlcykge1xyXG5cdFx0XHR0aGlzLmhpZGRlbiA9IGZhbHNlO1xyXG5cdFx0XHRmb2N1cy5mb2N1cyh0aGlzLm9wdGlvbnNbMF0pO1xyXG5cdFx0fVxyXG5cdH1cclxufSIsIi8qKiBAbW9kdWxlIE1lbnViYXIgKi9cclxuXHJcbmltcG9ydCBNZW51IGZyb20gXCIuL01lbnVcIjtcclxuXHJcbi8qKiBcclxuICogIyMjIEV4YW1wbGVzXHJcbiAqIFxyXG4gKiAjIyMjIERlZmF1bHQgKHdpdGggcm92aW5nIHRhYmluZGV4KVxyXG4gKiBcclxuICogPHVsIGlkPVwibWVudWJhcjFcIiByb2xlPVwibWVudWJhclwiPlxyXG4gKiAgIDxsaSByb2xlPVwibm9uZVwiPjxhIHJvbGU9XCJtZW51aXRlbVwiIHRhYmluZGV4PVwiMFwiPkFwcGxlPC9hPjwvbGk+XHJcbiAqICAgPGxpIHJvbGU9XCJub25lXCI+PGEgcm9sZT1cIm1lbnVpdGVtXCIgdGFiaW5kZXg9XCItMVwiPkJhbmFuYTwvYT48L2xpPlxyXG4gKiAgIDxsaSByb2xlPVwibm9uZVwiPjxhIHJvbGU9XCJtZW51aXRlbVwiIHRhYmluZGV4PVwiLTFcIj5QZWFyPC9hPjwvbGk+XHJcbiAqIDwvdWw+XHJcbiAqIFxyXG4gKiAjIyMjIFdpdGggYWN0aXZlZGVzY2VuZGFudFxyXG4gKiBcclxuICogPHVsIGlkPVwibWVudWJhcjFcIiByb2xlPVwibWVudWJhclwiIHRhYmluZGV4PVwiMFwiIGFyaWEtYWN0aXZlZGVzY2VuZGFudD1cIml0ZW0xXCI+XHJcbiAqICAgPGxpIGlkPVwiaXRlbTFcIiByb2xlPVwibWVudWl0ZW1cIj5BcHBsZTwvYT48L2xpPlxyXG4gKiAgIDxsaSBpZD1cIml0ZW0yXCIgcm9sZT1cIm1lbnVpdGVtXCI+QmFuYW5hPC9hPjwvbGk+XHJcbiAqICAgPGxpIGlkPVwiaXRlbTNcIiByb2xlPVwibWVudWl0ZW1cIj5QZWFyPC9hPjwvbGk+XHJcbiAqIDwvdWw+XHJcbiAqIFxyXG4gKiBAYWxpYXMgbW9kdWxlOk1lbnViYXJcclxuICogQGV4dGVuZHMgTWVudVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVudWJhciBleHRlbmRzIE1lbnUge30iLCIvKiogQG1vZHVsZSBNZW51aXRlbSAqL1xyXG5cclxuaW1wb3J0IG1peCBmcm9tIFwiQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW5cIjtcclxuXHJcbmltcG9ydCBSb2xldHlwZSBmcm9tIFwiLi9hYnN0cmFjdC9Sb2xldHlwZVwiO1xyXG5pbXBvcnQgZXhwYW5kZWQgZnJvbSBcIi4vLi4vcHJvcGVydGllcy9leHBhbmRlZFwiO1xyXG5cclxuXHJcbi8qKiBcclxuICogXHJcbiAqICMjIyBLZXlib2FyZCBuYXZpZ2F0aW9uXHJcbiAqIFxyXG4gKiB8IEtleSAgICB8QWN0aW9uIHxcclxuICogfCAtLS0tLS0gfCAtLS0tLSB8XHJcbiAqIHwgRW50ZXIgIHwgT3BlbnMgdGhlIHN1Ym1lbnVcclxuICogfCBTcGFjZSAgfCBPcGVucyB0aGUgc3VibWVudVxyXG4gKiB8ICZkYXJyOyB8IE9wZW5zIHRoZSBzdWJtZW51XHJcbiAqIFxyXG4gKiAjIyMgRXhhbXBsZXNcclxuICogXHJcbiAqIDxkaXYgcm9sZT1cIm1lbnVpdGVtXCIgdGFiaW5kZXg9XCIwXCI+QXBwbGU8L2Rpdj5cclxuICogXHJcbiAqIGBgYFxyXG4gKiA8ZGl2IHJvbGU9XCJtZW51aXRlbVwiIHRhYmluZGV4PVwiMFwiPkFwcGxlPC9kaXY+XHJcbiAqIGBgYFxyXG4gKiBcclxuICogIyMjIyBXaXRoIHBvcHVwXHJcbiAqIFxyXG4gKiA8dWwgcm9sZT1cIm1lbnVcIj5cclxuICogICA8bGkgcm9sZT1cIm5vbmVcIj5cclxuICogICAgIDxkaXYgdGFiaW5kZXg9XCIwXCIgcm9sZT1cIm1lbnVpdGVtXCIgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIiBhcmlhLWNvbnRyb2xzPVwic3VibWVudVwiPkFwcGxlPC9kaXY+XHJcbiAqICAgICA8dWwgcm9sZT1cIm1lbnVcIiBpZD1cInN1Ym1lbnVcIiBhcmlhLWxhYmVsPVwiRnJ1aXRzXCIgYXJpYS1oaWRkZW49XCJmYWxzZVwiPlxyXG4gKiAgICAgICA8bGkgcm9sZT1cIm5vbmVcIj48ZGl2IHRhYmluZGV4PVwiMFwiIHJvbGU9XCJtZW51aXRlbVwiPkJhbmFuYTwvZGl2PjwvbGk+XHJcbiAqICAgICA8L3VsPlxyXG4gKiAgIDwvbGk+XHJcbiAqIDwvdWw+XHJcbiAqIFxyXG4gKiBgYGBcclxuICogPHVsIHJvbGU9XCJtZW51XCI+XHJcbiAqICAgPGxpIHJvbGU9XCJub25lXCI+XHJcbiAqICAgICA8ZGl2IHRhYmluZGV4PVwiMFwiIHJvbGU9XCJtZW51aXRlbVwiIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCIgYXJpYS1jb250cm9scz1cInN1Ym1lbnVcIj5BcHBsZTwvZGl2PlxyXG4gKiAgICAgPHVsIHJvbGU9XCJtZW51XCIgaWQ9XCJzdWJtZW51XCIgYXJpYS1sYWJlbD1cIkZydWl0c1wiIGFyaWEtaGlkZGVuPVwiZmFsc2VcIj5cclxuICogICAgICAgPGxpIHJvbGU9XCJub25lXCI+PGRpdiB0YWJpbmRleD1cIjBcIiByb2xlPVwibWVudWl0ZW1cIj5CYW5hbmE8L2Rpdj48L2xpPlxyXG4gKiAgICAgPC91bD5cclxuICogICA8L2xpPlxyXG4gKiA8L3VsPlxyXG4gKiBgYGBcclxuICogXHJcbiAqIEBtaXhlcyBleHBhbmRlZFxyXG4gKiBAYWxpYXMgbW9kdWxlOk1lbnVpdGVtXHJcbiAqIFxyXG4gKiBAbGlzdGVucyBjbGlja1xyXG4gKiBAbGlzdGVucyBLZXlib2FyZEV2ZW50OkVudGVyXHJcbiAqIEBsaXN0ZW5zIEtleWJvYXJkRXZlbnQ6QXJyb3dEb3duXHJcbiAqIEBsaXN0ZW5zIEtleWJvYXJkRXZlbnQ6U3BhY2VcclxuICogQGxpc3RlbnMgb3BlblxyXG4gKiBAbGlzdGVucyBjbG9zZVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVudWl0ZW0gZXh0ZW5kcyBtaXgoUm9sZXR5cGUpLndpdGgoZXhwYW5kZWQpIHtcclxuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcclxuICAgICAgICBzdXBlciguLi5hcmdzKTtcclxuXHJcbiAgICAgICAgaWYodHlwZW9mIHRoaXMuZXhwYW5kZWQgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgbGV0IG9uT3BlbiA9IHRoaXMub25PcGVuLmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgIGxldCBvbkNsb3NlID0gdGhpcy5vbkNsb3NlLmJpbmQodGhpcyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXYpID0+IHt0aGlzLmV4cGFuZGVkID09PSB0cnVlID8gb25DbG9zZShldikgOiBvbk9wZW4oZXYpfSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcImtleVwiLCBvbk9wZW4sIHtrZXk6IFtcIkVudGVyXCIsIFwiQXJyb3dEb3duXCIsIFwiU3BhY2VcIl19KTtcclxuICAgICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKFwib3BlblwiLCBvbk9wZW4pO1xyXG4gICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbG9zZVwiLCBvbkNsb3NlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIvKiogQG1vZHVsZSBSYWRpbyAqL1xyXG5cclxuaW1wb3J0IENvbW1hbmQgZnJvbSBcIi4vYWJzdHJhY3QvQ29tbWFuZC5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIEEgY2hlY2thYmxlIGlucHV0IGluIGEgZ3JvdXAgb2YgZWxlbWVudHMgd2l0aCB0aGUgc2FtZSByb2xlLFxyXG4gKiBvbmx5IG9uZSBvZiB3aGljaCBjYW4gYmUgY2hlY2tlZCBhdCBhIHRpbWUuXHJcbiAqIFxyXG4gKiAjIyMgRXhhbXBsZXNcclxuICogXHJcbiAqIDxkaXYgcm9sZT1cInJhZGlvXCIgYXJpYS1jaGVja2VkPVwiZmFsc2VcIiB0YWJpbmRleD1cIjBcIj5BcHBsZTwvZGl2PlxyXG4gKiBcclxuICogYGBgaHRtbFxyXG4gKiA8ZGl2IHJvbGU9XCJyYWRpb1wiIGFyaWEtY2hlY2tlZD1cImZhbHNlXCIgdGFiaW5kZXg9XCIwXCI+QXBwbGU8L2Rpdj5cclxuICogYGBgXHJcbiAqIFxyXG4gKiBAYWxpYXMgbW9kdWxlOlJhZGlvXHJcbiAqL1xyXG5jbGFzcyBSYWRpbyBleHRlbmRzIENvbW1hbmQge1xyXG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcclxuXHRcdHN1cGVyKC4uLmFyZ3MpO1xyXG5cclxuXHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKSwge2tleTogXCJTcGFjZVwifSk7XHJcblx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBVcGRhdGVzIHRoZSByYWRpbyBzdGF0dXMgdHJvdWdoIGFuIGV2ZW50XHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtFdmVudH0gZXZcclxuXHQgKiBAbGlzdGVucyBNb3VzZUV2ZW50OmNsaWNrXHJcblx0ICogQGxpc3RlbnMgS2V5Ym9hcmQ6c3BhY2VcclxuXHQgKi9cclxuXHRvbkNsaWNrKGV2KSB7XHJcblx0XHRpZih0aGlzID09PSBldi50YXJnZXQpIHtcclxuXHRcdFx0aWYgKGV2KSBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRpZiAodHlwZW9mIHN1cGVyLm9uQ2xpY2sgPT0gXCJmdW5jdGlvblwiKSBzdXBlci5vbkNsaWNrKGV2KTtcclxuXHJcblx0XHRcdGlmICh0aGlzLmRpc2FibGVkICE9PSB0cnVlKSB7XHJcblx0XHRcdFx0dGhpcy5jaGVja2VkID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBVcGRhdGVzIHRoZSBjaGVja2VkIHN0YXR1c1xyXG5cdCAqIFxyXG5cdCAqIEBmaXJlcyBFdmVudDpjaGFuZ2VcclxuXHQgKiBAZmlyZXMgSW5wdXRFdmVudDppbnB1dFxyXG5cdCAqL1xyXG5cdHNldCBjaGVja2VkKHZhbHVlKXtcclxuXHRcdGxldCBvbGQgPSB0aGlzLmNoZWNrZWQ7XHJcblxyXG5cdFx0c3VwZXIuY2hlY2tlZCA9IHZhbHVlO1xyXG5cclxuXHRcdGlmKG9sZCAhPT0gdmFsdWUpIHtcclxuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImNoYW5nZVwiLCB7IGJ1YmJsZXM6IHRydWUgfSkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgSW5wdXRFdmVudChcImlucHV0XCIpKTtcclxuXHR9XHJcblx0Z2V0IGNoZWNrZWQoKSB7IHJldHVybiBzdXBlci5jaGVja2VkOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJhZGlvO1xyXG4iLCJpbXBvcnQgU2VsZWN0IGZyb20gXCIuL2Fic3RyYWN0L1NlbGVjdC5qc1wiO1xyXG5pbXBvcnQgZm9jdXMgZnJvbSBcIi4vLi4vdXRpbHMvZm9jdXNcIjtcclxuXHJcbi8qKlxyXG4gKiAjIyMgRXhhbXBsZVxyXG4gKiBcclxuICogIyMjIyBCYXNpYyBleGFtcGxlXHJcbiAqIFxyXG4gKiA8ZGl2IHJvbGU9XCJyYWRpb2dyb3VwXCIgdGFiaW5kZXg9XCIwXCIgYXJpYS1hY3RpdmVkZXNjZW5kYW50PVwicmFkaW9fMVwiPlxyXG4gKiAgIDxkaXYgaWQ9XCJyYWRpb18xXCIgcm9sZT1cInJhZGlvXCIgYXJpYS1jaGVja2VkPVwiZmFsc2VcIj5BcHBsZTwvZGl2PlxyXG4gKiAgIDxkaXYgaWQ9XCJyYWRpb18yXCIgcm9sZT1cInJhZGlvXCIgYXJpYS1jaGVja2VkPVwiZmFsc2VcIj5HcmFwZWZydWl0PC9kaXY+XHJcbiAqIDwvZGl2PlxyXG4gKiBcclxuICogIyMjIyBFeGFtcGxlIHdpdGggdGFiaW5kZXhcclxuICogXHJcbiAqIDxkaXYgcm9sZT1cInJhZGlvZ3JvdXBcIj5cclxuICogICA8ZGl2IGlkPVwicmFkaW9fMVwiIHJvbGU9XCJyYWRpb1wiIHRhYmluZGV4PVwiMFwiIGFyaWEtY2hlY2tlZD1cImZhbHNlXCI+QXBwbGU8L2Rpdj5cclxuICogICA8ZGl2IGlkPVwicmFkaW9fMlwiIHJvbGU9XCJyYWRpb1wiIHRhYmluZGV4PVwiLTFcIiBhcmlhLWNoZWNrZWQ9XCJmYWxzZVwiPkdyYXBlZnJ1aXQ8L2Rpdj5cclxuICogPC9kaXY+XHJcbiAqIFxyXG4gKiBAZXh0ZW5kcyBTZWxlY3RcclxuICovXHJcbmNsYXNzIFJhZGlvZ3JvdXAgZXh0ZW5kcyBTZWxlY3Qge1xyXG5cdG9uQ2hhbmdlKGV2KSB7XHJcblx0XHQvLyByZXRyaWV2ZSBvcHRpb24gdGhhdCBoYXMgYmVlbiBjaGFuZ2VkXHJcblx0XHR2YXIgY2hhbmdlZE9wdGlvbiA9IHRoaXMub3B0aW9ucy5maW5kKG9wdGlvbiA9PiBvcHRpb24uX25vZGUgPT09IGV2LnRhcmdldCk7XHJcblxyXG5cdFx0aWYoY2hhbmdlZE9wdGlvbi5jaGVja2VkID09PSBcInRydWVcIikge1xyXG5cdFx0XHR0aGlzLm9wdGlvbnMuZm9yRWFjaChyYWRpbyA9PiB7XHJcblx0XHRcdFx0aWYocmFkaW8uX25vZGUgIT09IGV2LnRhcmdldCAmJiByYWRpby5jaGVja2VkID09PSBcInRydWVcIikge1xyXG5cdFx0XHRcdFx0cmFkaW8uY2hlY2tlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSYWRpb2dyb3VwOyIsIi8vIHZhciBvYmplY3RQYXRoID0gcmVxdWlyZShcIm9iamVjdC1wYXRoXCIpO1xuaW1wb3J0IFJhbmdlIGZyb20gXCIuL2Fic3RyYWN0L1JhbmdlLmpzXCI7XG5cbmZ1bmN0aW9uIGNhbGNWYWx1ZU9mVHJhY2tQb3MocG9zLCB0cmFjaywgdGh1bWIsIG1pbiwgbWF4LCBzdGVwLCBvcmllbnRhdGlvbikge1xuXHRsZXQgcG9zaXRpb25LZXkgPSBvcmllbnRhdGlvbiA9PSBcInZlcnRpY2FsXCIgPyBcInlcIiA6IFwieFwiO1xuXHRsZXQgcmFuZ2UgPSAobWF4IC0gbWluKSAvIHN0ZXA7XG5cdC8vIHRoZSBmdWxsIHVzYWJsZSBsZW5ndGggb2YgdGhlIHRyYWNrXG5cdGxldCB0cmFja1NpemUgPSBnZXRUcmFja1NpemUodHJhY2ssIHRodW1iLCBvcmllbnRhdGlvbik7XG5cdC8vIGhvdyBtYW55IHBpeGVscyAgc3BhbiBmb3Igb25lIHN0ZXAgY2hhbmdlXG5cdGxldCBweFBlclN0ZXAgPSB0cmFja1NpemUgLyByYW5nZTtcblxuXHQvLyBib3VuZGluZyBib3ggb2YgdGhlIHRyYWNrXG5cdHZhciB0cmFja0Nvb3IgPSB0cmFjay5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0Ly8gb2Zmc2V0IHdpdGhvdXQgdHJhY2sgbGltaXRzXG5cdGxldCBvZmZzZXQgPSBwb3MgLSB0cmFja0Nvb3JbcG9zaXRpb25LZXldIC0gdGh1bWIuY2xpZW50V2lkdGggLyAyO1xuXG5cdC8vIHVwZGF0ZSBvZmZzZXQgdG8gdGhlIHRyYWNrIGxpbWl0cyBpZiBuZWVkZWRcblx0aWYob2Zmc2V0IDwgMCkge1xuXHRcdG9mZnNldCA9IDA7XG5cdH0gZWxzZSBpZihvZmZzZXQgPiB0cmFja1NpemUpe1xuXHRcdG9mZnNldCA9IHRyYWNrU2l6ZTtcblx0fVxuXG5cdC8vIHJvdW5kIHRoZSB2YWx1ZSB0byBuZWFyZXN0IGluY3JlbWVudFxuXHRyZXR1cm4gTWF0aC5yb3VuZChvZmZzZXQgLyBweFBlclN0ZXApICogc3RlcCArIG1pbjtcbn1cblxuZnVuY3Rpb24gZ2V0VHJhY2tTaXplKHRyYWNrLCB0aHVtYiwgb3JpZW50YXRpb24pIHtcblx0aWYob3JpZW50YXRpb24gPT0gXCJ2ZXJ0aWNhbFwiKSB7XG5cdFx0cmV0dXJuIHRyYWNrLmNsaWVudEhlaWdodCAtIHRodW1iLmNsaWVudEhlaWdodDtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gdHJhY2suY2xpZW50V2lkdGggLSB0aHVtYi5jbGllbnRXaWR0aDtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVQb3NpdGlvbih2YWx1ZSwgdHJhY2ssIHRodW1iLCBtaW4sIG1heCwgb3JpZW50YXRpb24pIHtcblx0bGV0IHN0eWxlS2V5ID0gb3JpZW50YXRpb24gPT0gXCJ2ZXJ0aWNhbFwiID8gXCJ0b3BcIiA6IFwibGVmdFwiO1xuXHRsZXQgcmFuZ2UgPSBtYXggLSBtaW47XG5cdGxldCBweFBlclN0ZXAgPSBnZXRUcmFja1NpemUodHJhY2ssIHRodW1iLCBvcmllbnRhdGlvbikgLyByYW5nZTtcblx0dGh1bWIuc3R5bGVbc3R5bGVLZXldID0gcHhQZXJTdGVwICogKHZhbHVlIC0gbWluKSArIFwicHhcIjtcbn1cblxuLyoqXG4gKiBUaGUgc2xpZGVyIGVsZW1lbnQgbGV0IHRoZSB1c2VyIHNwZWNpZnkgYSBudW1lcmljIHZhbHVlIHdoaWNoIG11c3QgYmUgbm8gbGVzc1xuICogdGhhbiBhIGdpdmVuIHZhbHVlLCBhbmQgbm8gbW9yZSB0aGFuIGFub3RoZXIgZ2l2ZW4gdmFsdWUuIFxuICogXG4gKiBUaGUgcHJlY2lzZSB2YWx1ZSxob3dldmVyLCBpcyBub3QgY29uc2lkZXJlZCBpbXBvcnRhbnQuIFRoaXMgaXMgdHlwaWNhbGx5IHJlcHJlc2VudGVkIHVzaW5nIGEgc2xpZGVyIG9yXG4gKiBkaWFsIGNvbnRyb2wgcmF0aGVyIHRoYW4gYSB0ZXh0IGVudHJ5IGJveCBsaWtlIHRoZSBcIm51bWJlclwiIGlucHV0IHR5cGUuIEJlY2F1c2UgdGhpcyBraW5kIG9mIHdpZGdldFxuICogaXMgaW1wcmVjaXNlLCBpdCBzaG91bGRuJ3QgdHlwaWNhbGx5IGJlIHVzZWQgdW5sZXNzIHRoZSBjb250cm9sJ3MgZXhhY3QgdmFsdWUgaXNuJ3QgaW1wb3J0YW50LlxuICpcbiAqICMjIyBFeGFtcGxlc1xuICpcbiAqICMjIyMgQmFzaWMgZXhhbXBsZVxuICogXG4gKiA8ZGl2IGNsYXNzPVwic2xpZGVyLXRyYWNrXCI+XG4gKiAgIDxkaXYgcm9sZT1cInNsaWRlclwiICB0YWJpbmRleD1cIjBcIj48L2Rpdj5cbiAqIDwvZGl2PlxuICogXG4gKiBgYGBodG1sXG4gKiA8ZGl2IGNsYXNzPVwic2xpZGVyLXRyYWNrXCI+XG4gKiAgIDxkaXYgcm9sZT1cInNsaWRlclwiICB0YWJpbmRleD1cIjBcIj48L2Rpdj5cbiAqIDwvZGl2PlxuICogYGBgXG4gKiBcbiAqICMjIyMgQXMgYW4gYnV0dG9uIHdpdGggYSBzcGVjaWZpZWQgc3RlcCBhbmQgcmFuZ2VcbiAqXG4gKiA8ZGl2IGNsYXNzPVwic2xpZGVyLXRyYWNrXCI+XG4gKiAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHJvbGU9XCJzbGlkZXJcIlxuICogXHRcdGFyaWEtdmFsdWVtaW49XCIzMFwiIGFyaWEtdmFsdWVtYXg9XCIzMDBcIiBhcmlhLXZhbHVlbm93PVwiNTBcIiBkYXRhLXN0ZXA9XCIxMFwiPjwvYnV0dG9uPlxuICogPC9kaXY+XG4gKlxuICogYGBgaHRtbFxuICogPGRpdiBjbGFzcz1cInNsaWRlci10cmFja1wiPlxuICogICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiByb2xlPVwic2xpZGVyXCJcbiAqIFx0XHRhcmlhLXZhbHVlbWluPVwiMzBcIiBhcmlhLXZhbHVlbWF4PVwiMzAwXCIgYXJpYS12YWx1ZW5vdz1cIjUwXCIgZGF0YS1zdGVwPVwiMTBcIj48L2J1dHRvbj5cbiAqIDwvZGl2PlxuICogYGBgXG4gKiBcbiAqICMjIyMgVmVydGljYWxcbiAqIFxuICogPGRpdiBjbGFzcz1cInNsaWRlci10cmFjayB2ZXJ0aWNhbFwiPlxuICogICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiByb2xlPVwic2xpZGVyXCIgYXJpYS1vcmllbnRhdGlvbj1cInZlcnRpY2FsXCI+PC9idXR0b24+XG4gKiA8L2Rpdj5cbiAqIFxuICogYGBgaHRtbFxuICogPGRpdiBjbGFzcz1cInNsaWRlci10cmFjayB2ZXJ0aWNhbFwiPlxuICogICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiByb2xlPVwic2xpZGVyXCIgYXJpYS1vcmllbnRhdGlvbj1cInZlcnRpY2FsXCI+PC9idXR0b24+XG4gKiA8L2Rpdj5cbiAqIGBgYFxuICogXG4gKiAjIyMjIERpc2FibGVkXG4gKiBcbiAqIDxkaXYgY2xhc3M9XCJzbGlkZXItdHJhY2tcIj5cbiAqICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgcm9sZT1cInNsaWRlclwiIGFyaWEtZGlzYWJsZWQ9XCJ0cnVlXCI+PC9idXR0b24+XG4gKiA8L2Rpdj5cbiAqIFxuICogYGBgaHRtbFxuICogPGRpdiBjbGFzcz1cInNsaWRlci10cmFja1wiPlxuICogICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiByb2xlPVwic2xpZGVyXCIgYXJpYS1kaXNhYmxlZD1cInRydWVcIj48L2J1dHRvbj5cbiAqIDwvZGl2PlxuICogYGBgXG4gKiBcbiAqIFxuICogQHN1bW1hcnkgQSB1c2VyIGlucHV0IHdoZXJlIHRoZSB1c2VyIHNlbGVjdHMgYSB2YWx1ZSBmcm9tIHdpdGhpbiBhIGdpdmVuIHJhbmdlLlxuICogQGV4dGVuZHMgUmFuZ2VcbiAqXG4gKiBAZmlyZXMgY2hhbmdlXG4gKiBAZmlyZXMgaW5wdXRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFx0XHRcdFx0ZWxlbWVudCB0byBkZXJpdmUgaW5mb3JtYXRpb24gbmFtZUZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gXHRcdFx0XHRcdFx0b3B0aW9uYWwgb3B0aW9uc1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW29wdGlvbnMuc2xpZGVyLnRyYWNrXVxuICogXHRUaGUgZWxlbWVudCB0aGF0IHJlc2VtYmxlcyB0aGUgdHJhY2ssIGRlZmF1bHRzIHRvIHRoZSBlbGVtZW50cyBwYXJlbnRcbiAqIEBwYXJhbSB7TnVtYmVyfFwiYW55XCJ9IFtvcHRpb25zLnN0ZXBdIFx0aW5jcmVhc2UvZGVjcmVhc2UgYW1vdW50XG4gKiBAcmV0dXJuIHtTbGlkZXJ9IHRoaXNBcmdcbiAqXG4gKiBAdG9kbyBhZGQgc3VwcG9ydCBmb3IgXCJhbnlcIlxuICogQHRvZG8gYWRkIGV2ZW50c1xuICovXG5jbGFzcyBTbGlkZXIgZXh0ZW5kcyBSYW5nZSB7XG5cdC8qKlxuXHQgKiBAcGFyYW0geyp9IGFyZ3MgXG5cdCAqL1xuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0c3VwZXIoLi4uYXJncyk7XG5cblx0XHQvLyByZWdpc3RlciBjdXN0b21zXG5cdFx0dGhpcy5fLnJlZ2lzdGVyQ3VzdG9tRWxlbWVudChcInNsaWRlci50cmFja1wiLCB0aGlzLl9ub2RlLnBhcmVudE5vZGUpO1xuXG5cdFx0Ly8gc2V0IGRlZmF1bHRzXG5cdFx0aWYodW5kZWZpbmVkID09IHRoaXMub3JpZW50YXRpb24pIHRoaXMub3JpZW50YXRpb24gPSBcImhvcml6b250YWxcIjtcblx0XHRpZih1bmRlZmluZWQgPT0gdGhpcy52YWx1ZU1pbikge1xuXHRcdFx0LyoqXG5cdFx0XHQgKiBAZGVmYXVsdCBbMF1cblx0XHRcdCAqL1xuXHRcdFx0dGhpcy52YWx1ZU1pbiA9IDA7XG5cdFx0fVxuXHRcdGlmKHVuZGVmaW5lZCA9PSB0aGlzLnZhbHVlTWF4KSB0aGlzLnZhbHVlTWF4ID0gMTAwO1xuXHRcdGlmKHVuZGVmaW5lZCA9PSB0aGlzLnZhbHVlTm93ICYmIHRoaXMudmFsdWVNYXggPCB0aGlzLnZhbHVlTWluKSB7XG5cdFx0XHR0aGlzLnZhbHVlTm93ID0gdGhpcy52YWx1ZU1pbjtcblx0XHR9IGVsc2UgaWYodW5kZWZpbmVkID09IHRoaXMudmFsdWVOb3cpIHtcblx0XHRcdHRoaXMudmFsdWVOb3cgPSB0aGlzLnZhbHVlTWluICsgKHRoaXMudmFsdWVNYXggLSB0aGlzLnZhbHVlTWluKS8yO1xuXHRcdH1cblxuXHRcdHRoaXMuX3VuVHJhY2tNb3VzZUJpbmRlZCA9IHRoaXMuX3VuVHJhY2tNb3VzZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuX3VuVHJhY2tUb3VjaEJpbmRlZCA9IHRoaXMuX3VuVHJhY2tUb3VjaC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuX29uRHJhZyA9IHRoaXMub25EcmFnLmJpbmQodGhpcyk7XG5cblx0XHQvLyB0b2RvOiBhbGxvdyBhdXRvbWF0aWNhbGx5IHNldHRpbmcgdmFsdWVUZXh0IHdpdGggc29tZSBzdWdhclxuXG5cdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLl9vblRvdWNoU3RhcnQuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMuX29uTW91c2VEb3duLmJpbmQodGhpcyksIHsgdGFyZ2V0OiB0aGlzLl8uc2xpZGVyLnRyYWNrfSk7XG5cdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwia2V5XCIsIHRoaXMuc3RlcFVwLmJpbmQodGhpcyksIHsga2V5OiBcIkFycm93UmlnaHRcIiB9KTtcblx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlcIiwgdGhpcy5zdGVwVXAuYmluZCh0aGlzKSwgeyBrZXk6IFwiQXJyb3dVcFwiIH0pO1xuXHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcImtleVwiLCB0aGlzLnN0ZXBEb3duLmJpbmQodGhpcyksIHsga2V5OiBcIkFycm93TGVmdFwiIH0pO1xuXHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcImtleVwiLCB0aGlzLnN0ZXBEb3duLmJpbmQodGhpcyksIHsga2V5OiBcIkFycm93RG93blwiIH0pO1xuXG5cdFx0dXBkYXRlUG9zaXRpb24odGhpcy52YWx1ZU5vdywgdGhpcy5fLnNsaWRlci50cmFjaywgdGhpcy5fbm9kZSwgdGhpcy52YWx1ZU1pbiwgdGhpcy52YWx1ZU1heCwgdGhpcy5vcmllbnRhdGlvbik7XG5cdH1cblxuXHRfb25Nb3VzZURvd24oKSB7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLl9vbkRyYWcpO1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX3VuVHJhY2tNb3VzZUJpbmRlZCk7XG5cblx0XHQvLyBmb2N1cyB0aGUgdGh1bWIgd2hlbiB0aGUgdXNlciBkaWQgYW4gYWN0aW9uXG5cdFx0dGhpcy5fbm9kZS5mb2N1cygpO1xuXHR9XG5cdF9vblRvdWNoU3RhcnQoKSB7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCB0aGlzLl9vbkRyYWcpO1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCB0aGlzLl91blRyYWNrVG91Y2hCaW5kZWQpO1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGNhbmNlbFwiLCB0aGlzLl91blRyYWNrVG91Y2hCaW5kZWQpO1xuXHR9XG5cdF91blRyYWNrTW91c2UoKSB7XG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLl9vbkRyYWcpO1xuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX3VuVHJhY2tNb3VzZUJpbmRlZCk7XG5cblx0XHQvLyBmb2N1cyB0aGUgdGh1bWIgd2hlbiB0aGUgdXNlciBkaWQgYW4gYWN0aW9uXG5cdFx0dGhpcy5fbm9kZS5mb2N1cygpO1x0XHRcblx0fVxuXHRfdW5UcmFja1RvdWNoKCkge1xuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgdGhpcy5fb25EcmFnKTtcblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgdGhpcy5fdW5UcmFja01vdXNlKTtcblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hjYW5jZWxcIiwgdGhpcy5fdW5UcmFja01vdXNlQmluZGVkKTtcblx0fVxuXG5cdG9uRHJhZyhldikge1xuXHRcdGV2LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0bGV0IHBvcztcblx0XHRsZXQgcG9zaXRpb25LZXkgPSB0aGlzLm9yaWVudGF0aW9uID09IFwidmVydGljYWxcIiA/IFwiY2xpZW50WVwiIDogXCJjbGllbnRYXCI7XG5cdFx0aWYoZXYuY2hhbmdlZFRvdWNoZXMpIHtcblx0XHRcdHBvcyA9IGV2LmNoYW5nZWRUb3VjaGVzWzBdW3Bvc2l0aW9uS2V5XTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cG9zID0gZXZbcG9zaXRpb25LZXldO1xuXHRcdH1cblx0XHR0aGlzLnZhbHVlTm93ID0gY2FsY1ZhbHVlT2ZUcmFja1Bvcyhcblx0XHRcdHBvcywgdGhpcy5fLnNsaWRlci50cmFjaywgdGhpcy5fbm9kZSxcblx0XHRcdHRoaXMudmFsdWVNaW4sIHRoaXMudmFsdWVNYXgsIHRoaXMuXy5zdGVwLCB0aGlzLm9yaWVudGF0aW9uXG5cdFx0KTtcblx0fVxuXG5cdGdldCB2YWx1ZU5vdygpIHsgcmV0dXJuIHN1cGVyLnZhbHVlTm93OyB9XG5cdHNldCB2YWx1ZU5vdyh2YWwpIHtcblx0XHRpZighdGhpcy5kaXNhYmxlZCkge1xuXHRcdFx0c3VwZXIudmFsdWVOb3cgPSB2YWw7XG5cdFx0XHR1cGRhdGVQb3NpdGlvbih2YWwsIHRoaXMuXy5zbGlkZXIudHJhY2ssIHRoaXMuX25vZGUsIHRoaXMudmFsdWVNaW4sIHRoaXMudmFsdWVNYXgsIHRoaXMub3JpZW50YXRpb24pO1xuXHRcdH1cblx0fVxuXG5cdC8qIE5hdGl2ZSBwb2x5ZmlsbCAqL1xuXG5cdC8vIGF1dG9tYXRpYyBwb2x5ZmlsbGVkIGJ5IGF0dHJpYnV0ZXNcblx0Ly8gYXV0b2NvbXBsZXRlXG5cdC8vIGxpc3Rcblx0Ly8gbWluXG5cdC8vIG1heFxuXHQvLyBzdGVwID0+IGRhdGEtc3RlcFxuXHQvLyB2YWx1ZVxuXHQvLyB2YWx1ZUFzTnVtYmVyXG5cdC8vIHN0ZXBEb3duXG5cdC8vIHN0ZXBVcFxufVxuXG5leHBvcnQgZGVmYXVsdCBTbGlkZXI7IiwiaW1wb3J0IG1peCBmcm9tIFwiQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW5cIjtcclxuaW1wb3J0IFJhbmdlIGZyb20gXCIuL2Fic3RyYWN0L1JhbmdlXCI7XHJcblxyXG5leHBvcnQgY29uc3Qgb3B0aW9ucyA9IHtcclxuXHRzZWxlY3RvcjogXCJbcm9sZT0nc3BpbmJ1dHRvbiddXCIsXHJcblx0cm9sZTogXCJzcGluYnV0dG9uXCJcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBIGlucHV0IGZpZWxkIHdpdGggMiBidXR0b24gdG8gaW5jcmVhc2Ugb3IgZGVjcmVhc2UgdGhlIG51bWJlcmljYWwgdmFsdWVcclxuICogQGV4dGVuZHMgUmFuZ2VcclxuICpcclxuICogQHNlZSB7QGxpbmsgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvaW5wdXQuaHRtbCNudW1iZXItc3RhdGUtKHR5cGU9bnVtYmVyKX1cclxuICovXHJcbmNsYXNzIFNwaW5idXR0b24gZXh0ZW5kcyBSYW5nZSB7XHJcblx0Y29uc3RydWN0b3IoZWwsIG9wdGlvbnMpIHtcclxuXHRcdHN1cGVyKGVsLCBvcHRpb25zKTtcclxuXHJcblx0XHQvLyByZWdpc3RlciBjdXN0b20gZWxlbWVudHNcclxuXHRcdC8qKlxyXG5cdFx0KiBAbmFtZSBTcGluYnV0dG9uI19cclxuXHRcdCogQHR5cGUge09iamVjdH1cclxuXHRcdCogQHByb3Age0hUTUxFbGVtZW50fSBbc3BpbmJ1dHRvbi51cF1cclxuXHRcdCogQHByb3Age0hUTUxFbGVtZW50fSBbc3BpbmJ1dHRvbi5kb3duXVxyXG5cdFx0Ki9cclxuXHRcdHRoaXMuXy5yZWdpc3RlckN1c3RvbUVsZW1lbnQoXCJzcGluYnV0dG9uLnVwXCIpO1xyXG5cdFx0dGhpcy5fLnJlZ2lzdGVyQ3VzdG9tRWxlbWVudChcInNwaW5idXR0b24uZG93blwiKTtcclxuXHRcdHRoaXMuXy5yZWdpc3RlckN1c3RvbVZhbHVlKFwic3RlcFwiLCAxKTtcclxuXHJcblx0XHQvLyBzZXQgZGVmYXVsdHNcclxuXHRcdC8qKlxyXG5cdFx0KiBAbmFtZSBTcGluYnV0dG9uI3ZhbHVlTm93XHJcblx0XHQqIEB0eXBlIHtOdW1iZXJ9XHJcblx0XHQqIEBkZWZhdWx0IFswXVxyXG5cdFx0Ki9cclxuXHRcdGlmKG51bGwgPT09IHRoaXMudmFsdWVOb3cpIHRoaXMudmFsdWVOb3cgPSAwO1xyXG5cclxuXHRcdC8vIHRvZG86IGFsbG93IGF1dG9tYXRpY2FsbHkgc2V0dGluZyB2YWx1ZVRleHQgd2l0aCBzb21lIHN1Z2FyXHJcblxyXG5cdFx0aWYgKHRoaXMuXy5zcGluYnV0dG9uLmRvd24pIHRoaXMuXy5zcGluYnV0dG9uLnVwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnN0ZXBVcC5iaW5kKHRoaXMpKTtcclxuXHRcdGlmICh0aGlzLl8uc3BpbmJ1dHRvbi5kb3duKSB0aGlzLl8uc3BpbmJ1dHRvbi5kb3duLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnN0ZXBEb3duLmJpbmQodGhpcykpO1xyXG5cdFx0dGhpcy5hZGRLZXlMaXN0ZW5lcihcInVwXCIsIHRoaXMuc3RlcFVwLmJpbmQodGhpcykpO1xyXG5cdFx0dGhpcy5hZGRLZXlMaXN0ZW5lcihcImRvd25cIiwgdGhpcy5zdGVwRG93bi5iaW5kKHRoaXMpKTtcclxuXHRcdHRoaXMuZWxlbWVudC52YWx1ZSA9IHRoaXMudmFsdWVOb3c7XHJcblx0fVxyXG5cclxuXHRnZXQgdmFsdWVOb3coKSB7IHJldHVybiBzdXBlci52YWx1ZU5vdzsgfVxyXG5cdHNldCB2YWx1ZU5vdyh2YWwpIHtcclxuXHRcdHN1cGVyLnZhbHVlTm93ID0gdmFsO1xyXG5cdFx0dGhpcy5lbGVtZW50LnZhbHVlID0gdmFsO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3BpbmJ1dHRvbjsiLCJpbXBvcnQgQ2hlY2tib3ggZnJvbSBcIi4vQ2hlY2tib3hcIjtcblxuLyoqXG4gKiBBIHR5cGUgb2YgY2hlY2tib3ggdGhhdCByZXByZXNlbnRzIG9uL29mZiB2YWx1ZXMsIGFzIG9wcG9zZWQgdG8gY2hlY2tlZC91bmNoZWNrZWQgdmFsdWVzLlxuICogQGV4dGVuZHMgQ2hlY2tib3ggXG4gKi9cbmNsYXNzIFN3aXRjaCBleHRlbmRzIENoZWNrYm94IHtcblx0LyoqXG5cdCAqICMjIyMgRXhhbXBsZVxuXHQgKiBcblx0ICogKipEZWZhdWx0Kipcblx0ICogXG5cdCAqIDxkaXYgcm9sZT1cInN3aXRjaFwiIHRhYmluZGV4PVwiMFwiPjwvZGl2PlxuXHQgKiBcblx0ICogYGBgaHRtbFxuXHQgKiA8ZGl2IHJvbGU9XCJzd2l0Y2hcIiB0YWJpbmRleD1cIjBcIj48L2Rpdj5cblx0ICogYGBgXG5cdCAqIFxuXHQgKiAqKldpdGggcHJlZGVmaW5lZCB2YWx1ZSoqXG5cdCAqIFxuXHQgKiA8ZGl2IHJvbGU9XCJzd2l0Y2hcIiBhcmlhLWNoZWNrZWQ9XCJ0cnVlXCIgdGFiaW5kZXg9XCIwXCI+PC9kaXY+XG5cdCAqIFxuXHQgKiBgYGBodG1sXG5cdCAqIDxkaXYgcm9sZT1cInN3aXRjaFwiIGFyaWEtY2hlY2tlZD1cInRydWVcIiB0YWJpbmRleD1cIjBcIj48L2Rpdj5cblx0ICogYGBgXG5cdCAqIEBwYXJhbSB7Kn0gYXJnc1xuXHQqL1xuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0c3VwZXIoLi4uYXJncyk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3dpdGNoO1xuIiwiaW1wb3J0IG1peCBmcm9tIFwiQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW5cIjtcblxuaW1wb3J0IGVsZW1lbnRzIGZyb20gXCIuLy4uL3V0aWxzL2VsZW1lbnRzXCI7XG5pbXBvcnQgc2VsZWN0b3IgZnJvbSBcIi4vLi4vdXRpbHMvc2VsZWN0b3JcIjtcbmltcG9ydCByb2xlcyBmcm9tIFwiLi8uLi9kYXRhL3JvbGVzXCI7XG5cbmltcG9ydCBSb2xldHlwZSBmcm9tIFwiLi9hYnN0cmFjdC9Sb2xldHlwZVwiO1xuXG5pbXBvcnQgQXJpYVNlbGVjdGVkIGZyb20gXCIuLy4uL2F0dHJpYnV0ZXMvYXJpYS1zZWxlY3RlZFwiO1xuXG5jbGFzcyBUYWIgZXh0ZW5kcyBtaXgoUm9sZXR5cGUpLndpdGgoQXJpYVNlbGVjdGVkKSB7XG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRzdXBlciguLi5hcmdzKTtcblx0fVxuXG5cdG9uU2VsZWN0KGV2KSB7XG5cdFx0Ly8gZ2V0cyB0aGUgc2VsZWN0b3IgZm9yIGZpbmRpbmcgaXQncyBjb250ZXh0IGVsZW1lbnQgKHRhYmxpc3QgPiB0YWIpIFxuXHRcdHZhciBjb250ZXh0U2VsZWN0b3IgPSByb2xlcy50YWIuY29udGV4dC5tYXAoc3RyID0+IHNlbGVjdG9yLmdldFJvbGUoc3RyKSkuam9pbihcIiwgXCIpO1xuXHRcdGxldCB0YWJsaXN0ID0gZWxlbWVudHMuZ2V0UGFyZW50KHRoaXMsIGNvbnRleHRTZWxlY3Rvcik7XG5cdFx0aWYoIXRhYmxpc3QpIHJldHVybiBmYWxzZTtcblx0XHRcblx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFxuXHRcdGxldCB0YWJzID0gdGFibGlzdC5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwob3B0aW9ucy5zZWxlY3RvciArIFwiW2FyaWEtc2VsZWN0ZWQ9J3RydWUnXVwiKTtcblx0XHRbXS5mb3JFYWNoLmNhbGwodGFicywgKGl0ZW0pID0+IHtcblx0XHRcdGxldCBpbnN0ID0gZWxlbWVudHMuZ2V0KGl0ZW0pO1xuXHRcdFx0aW5zdC5zZWxlY3RlZCA9IGZhbHNlO1xuXHRcdFx0aW5zdC5jb250cm9sc1swXS5lbGVtZW50LmhpZGRlbiA9IHRydWU7XG5cdFx0fSk7XG5cblx0XHRpZiAodHlwZW9mIHN1cGVyLm9uU2VsZWN0ID09IFwiZnVuY3Rpb25cIikgc3VwZXIub25TZWxlY3QoZXYpO1xuXHRcdFxuXHRcdHRoaXMuY29udHJvbHNbMF0uZWxlbWVudC5oaWRkZW4gPSBmYWxzZTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBUYWI7IiwiaW1wb3J0IGVsZW1lbnRzIGZyb20gXCIuLy4uL3V0aWxzL2VsZW1lbnRzLmpzXCI7XHJcbmltcG9ydCBDb21wb3NpdGUgZnJvbSBcIi4vYWJzdHJhY3QvQ29tcG9zaXRlXCI7XHJcblxyXG5jbGFzcyBUYWJsaXN0IGV4dGVuZHMgQ29tcG9zaXRlIHtcclxuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XHJcblx0XHRzdXBlciguLi5hcmdzKTtcclxuXHJcblx0XHR0aGlzLmFkZEtleUxpc3RlbmVyKFwibGVmdFwiLCB0aGlzLm1vdmVUb1ByZXYuYmluZCh0aGlzKSk7XHJcblx0XHR0aGlzLmFkZEtleUxpc3RlbmVyKFwicmlnaHRcIiwgdGhpcy5tb3ZlVG9OZXh0LmJpbmQodGhpcykpO1xyXG5cdFx0dGhpcy5hZGRLZXlMaXN0ZW5lcihcImhvbWVcIiwgdGhpcy5tb3ZlVG9TdGFydC5iaW5kKHRoaXMpKTtcclxuXHRcdHRoaXMuYWRkS2V5TGlzdGVuZXIoXCJlbmRcIiwgdGhpcy5tb3ZlVG9FbmQuYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHRtb3ZlVG9QcmV2KGV2KSB7XHJcblx0XHRsZXQgcHJldkluc3RhbmNlID0gZWxlbWVudHMuZ2V0UHJldihlbGVtZW50cy5nZXQoZXYudGFyZ2V0KSwgdGhpcywgb3B0aW9ucy5vd25zKTtcclxuXHRcdHByZXZJbnN0YW5jZS5lbGVtZW50LmZvY3VzKCk7XHJcblx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdH1cclxuXHRtb3ZlVG9OZXh0KGV2KSB7XHJcblx0XHRsZXQgbmV4dEluc3RhbmNlID0gZWxlbWVudHMuZ2V0TmV4dChlbGVtZW50cy5nZXQoZXYudGFyZ2V0KSwgdGhpcywgb3B0aW9ucy5vd25zKTtcclxuXHRcdG5leHRJbnN0YW5jZS5lbGVtZW50LmZvY3VzKCk7XHJcblx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdH1cclxuXHJcblx0bW92ZVRvU3RhcnQoZXYpIHtcclxuXHRcdGxldCBmaXJzdEluc3RhbmNlID0gZWxlbWVudHMuZ2V0U3RhcnQoZWxlbWVudHMuZ2V0KGV2LnRhcmdldCksIHRoaXMsIG9wdGlvbnMub3ducyk7XHJcblx0XHRmaXJzdEluc3RhbmNlLmVsZW1lbnQuZm9jdXMoKTtcclxuXHRcdGV2LnByZXZlbnREZWZhdWx0KCk7XHJcblx0fVxyXG5cclxuXHRtb3ZlVG9FbmQoZXYpIHtcclxuXHRcdGxldCBsYXN0SW5zdGFuY2UgPSBlbGVtZW50cy5nZXRFbmQoZWxlbWVudHMuZ2V0KGV2LnRhcmdldCksIHRoaXMsIG9wdGlvbnMub3ducyk7XHJcblx0XHRsYXN0SW5zdGFuY2UuZWxlbWVudC5mb2N1cygpO1xyXG5cdFx0ZXYucHJldmVudERlZmF1bHQoKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRhYmxpc3Q7IiwiaW1wb3J0IFNlY3Rpb24gZnJvbSBcIi4vYWJzdHJhY3QvU2VjdGlvblwiO1xyXG5cclxuY2xhc3MgVGFicGFuZWwgZXh0ZW5kcyBTZWN0aW9uIHsgfVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGFicGFuZWw7IiwiaW1wb3J0IG1peCBmcm9tIFwiQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW5cIjtcblxuaW1wb3J0IElucHV0IGZyb20gXCIuL2Fic3RyYWN0L0lucHV0XCI7XG5pbXBvcnQgU2VsZWN0aW9uIGZyb20gXCIuLy4uL21peGlucy9TZWxlY3Rpb25cIjtcblxuLyoqXG4gKiAjIyMgRXhhbXBsZXNcbiAqXG4gKiAjIyMjIEJhc2ljIGV4YW1wbGVcbiAqICAgXG4gKiA8ZGl2IHJvbGU9J3RleHRib3gnIGNvbnRlbnRlZGl0YWJsZT48L2Rpdj5cbiAqIFxuICogYGBgaHRtbFxuICogPGRpdiByb2xlPSd0ZXh0Ym94JyBjb250ZW50ZWRpdGFibGU+PC9kaXY+XG4gKiBgYGBcbiAqIFxuICogLS0tXG4gKiBcbiAqICMjIyMgTXVsdGlsaW5lIGV4YW1wbGVcbiAqIFxuICogPGRpdiByb2xlPSd0ZXh0Ym94JyBjb250ZW50ZWRpdGFibGUgYXJpYS1tdWx0aWxpbmU9XCJ0cnVlXCI+PC9kaXY+XG4gKiBcbiAqIGBgYGh0bWxcbiAqIDxkaXYgcm9sZT0ndGV4dGJveCcgY29udGVudGVkaXRhYmxlIGFyaWEtbXVsdGlsaW5lPVwidHJ1ZVwiPjwvZGl2PlxuICogYGBgXG4gKiBcbiAqIEBzdW1tYXJ5IEEgdHlwZSBvZiBpbnB1dCB0aGF0IGFsbG93cyBmcmVlLWZvcm0gdGV4dCBhcyBpdHMgdmFsdWUuXG4gKiBAZXh0ZW5kcyBJbnB1dFxuICogQG1peGVzIFNlbGVjdGlvblxuICogQHRvZG8gQWRkIG9wdGlvbnMgdG8ga2VlcCBvciByZW1vdmUgcGFzdGVkIHN0eWxpbmdcbiAqL1xuY2xhc3MgVGV4dGJveCBleHRlbmRzIG1peChJbnB1dCkud2l0aChTZWxlY3Rpb24pIHtcblxuXHQvKipcblx0ICogQHBhcmFtIHsqfSBhcmdzXG5cdCAqL1xuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0c3VwZXIoLi4uYXJncyk7XG5cblx0XHR0aGlzLl8ucmVnaXN0ZXJDdXN0b21WYWx1ZShcInRleHRib3gubWlubGVuZ3RoXCIpO1xuXHRcdHRoaXMuXy5yZWdpc3RlckN1c3RvbVZhbHVlKFwidGV4dGJveC5tYXhsZW5ndGhcIik7XG5cdFx0dGhpcy5fLnJlZ2lzdGVyQ3VzdG9tVmFsdWUoXCJ0ZXh0Ym94LnNpemVcIik7XG5cblx0XHRpZighdGhpcy5tdWx0aWxpbmUpIHtcblx0XHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcImtleVwiLCB0aGlzLl9vbkVudGVyLmJpbmQodGhpcyksIHsga2V5OiBcIkFycm93RW50ZXJcIiB9KTtcblx0XHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInBhc3RlXCIsIHRoaXMuX29uUGFzdGUuYmluZCh0aGlzKSk7XG5cdFx0fVxuXHR9XG5cblx0X29uRW50ZXIoZXYpIHtcblx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xuXHR9XG5cblx0X29uUGFzdGUoZXYpIHtcblx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGxldCBzdHI7XG5cdFx0bGV0IGRhdGEgPSBldi5jbGlwYm9hcmREYXRhLmdldERhdGEoXCJ0ZXh0L3BsYWluXCIpLnJlcGxhY2UoL1xccj9cXG58XFxyL2csIFwiXCIpO1xuXHRcdGxldCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG5cblx0XHR2YXIgYyA9IHRoaXMuX25vZGUuY2hpbGROb2Rlcztcblx0XHR2YXIgYSA9IHNlbC5hbmNob3JOb2RlO1xuXG5cdFx0aWYgKGMgJiYgYSAmJiBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGMsIGEpID4gLTEpIHtcblx0XHRcdHN0ciA9IFt0aGlzLl9ub2RlLmlubmVyVGV4dC5zbGljZSgwLCBzZWwuYW5jaG9yT2Zmc2V0KSwgZGF0YSwgdGhpcy5fbm9kZS5pbm5lclRleHQuc2xpY2Uoc2VsLmZvY3VzT2Zmc2V0KV07XG5cdFx0XHRzdHIgPSBzdHIuam9pbihcIlwiKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3RyID0gdGhpcy5fbm9kZS5pbm5lclRleHQgKyBkYXRhO1xuXHRcdH1cblxuXHRcdHRoaXMuX25vZGUuaW5uZXJUZXh0ID0gc3RyO1xuXHR9XG5cblx0X29uQ2hpbGRMaXN0TXV0YXRpb24obXV0YXRpb24pIHtcblx0XHRpZiAoIXRoaXMubXVsdGlsaW5lKSB7XG5cdFx0XHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKG11dGF0aW9uLmFkZGVkTm9kZXMsIG4gPT4ge1xuXHRcdFx0XHRpZiAobi5ub2RlTmFtZSAhPT0gXCIjdGV4dFwiKSB7XG5cdFx0XHRcdFx0dmFyIG5ld0NoaWxkID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobi5pbm5lclRleHQpO1xuXHRcdFx0XHRcdG4ucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobmV3Q2hpbGQsIG4pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHQvKiBOYXRpdmUgcG9seWZpbGwgICovXG5cdFxuXHQvLyBhdXRvY29tcGxldGVcblx0Ly8gZGlybmFtZVxuXHQvLyBsaXN0XG5cdC8vIG1heGxlbmd0aFxuXHQvLyBtaW5sZW5ndGhcblx0Ly8gcGF0dGVyblxuXHQvLyBwbGFjZWhvbGRlclxuXHQvLyByZWFkb25seVxuXHQvLyByZXF1aXJlZFxuXHQvLyBzaXplXG5cdC8vIHZhbHVlXG5cdC8vIGxpc3Rcblx0Ly8gc2VsZWN0aW9uIGFwaVxuXG5cdC8vIG5hbWVcdHN0cmluZzogUmV0dXJucyAvIFNldHMgdGhlIGVsZW1lbnQncyBuYW1lIGF0dHJpYnV0ZSwgY29udGFpbmluZyBhIG5hbWUgdGhhdCBpZGVudGlmaWVzIHRoZSBlbGVtZW50IHdoZW4gc3VibWl0dGluZyB0aGUgZm9ybS5cblx0Ly8gdHlwZSBzdHJpbmc6IFJldHVybnMgLyBTZXRzIHRoZSBlbGVtZW50J3MgdHlwZSBhdHRyaWJ1dGUsIGluZGljYXRpbmcgdGhlIHR5cGUgb2YgY29udHJvbCB0byBkaXNwbGF5LiBTZWUgdHlwZSBhdHRyaWJ1dGUgb2YgPGlucHV0PiBmb3IgcG9zc2libGUgdmFsdWVzLlxuXHQvLyBhdXRvZm9jdXNcdGJvb2xlYW46IFJldHVybnMgLyBTZXRzIHRoZSBlbGVtZW50J3MgYXV0b2ZvY3VzIGF0dHJpYnV0ZSwgd2hpY2ggc3BlY2lmaWVzIHRoYXQgYSBmb3JtIGNvbnRyb2wgc2hvdWxkIGhhdmUgaW5wdXQgZm9jdXMgd2hlbiB0aGUgcGFnZSBsb2FkcywgdW5sZXNzIHRoZSB1c2VyIG92ZXJyaWRlcyBpdCwgZm9yIGV4YW1wbGUgYnkgdHlwaW5nIGluIGEgZGlmZmVyZW50IGNvbnRyb2wuIE9ubHkgb25lIGZvcm0gZWxlbWVudCBpbiBhIGRvY3VtZW50IGNhbiBoYXZlIHRoZSBhdXRvZm9jdXMgYXR0cmlidXRlLiBJdCBjYW5ub3QgYmUgYXBwbGllZCBpZiB0aGUgdHlwZSBhdHRyaWJ1dGUgaXMgc2V0IHRvIGhpZGRlbiAodGhhdCBpcywgeW91IGNhbm5vdCBhdXRvbWF0aWNhbGx5IHNldCBmb2N1cyB0byBhIGhpZGRlbiBjb250cm9sKS5cblx0XG5cdC8qKlxuXHQgKiBSZXR1cm5zIC8gU2V0cyB0aGUgY3VycmVudCB2YWx1ZSBvZiB0aGUgdGV4dGJveC5cblx0ICogQHR5cGUge1N0cmluZ31cblx0ICovXG5cdGdldCB2YWx1ZSgpIHsgcmV0dXJuIHRoaXMuX25vZGUudmFsdWU7IH1cblx0c2V0IHZhbHVlKHN0cikge1xuXHRcdGNvbnNvbGUubG9nKHN0cik7XG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImlucHV0XCIsIHtidWJibGVzOiB0cnVlfSkpO1xuXHRcdHRoaXMuX25vZGUudmFsdWUgPSBzdHI7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyAvIFNldHMgdGhlIG1pbm11bSBsZW5ndGggb2YgY2hhcmFjdGVyc1xuXHQgKiBAdHlwZSB7SW50ZWdlcn1cblx0ICovXG5cdGdldCBtaW5MZW5ndGgoKSB7IHJldHVybiB0aGlzLl8udGV4dGJveC5taW5sZW5ndGg7IH1cblx0c2V0IG1pbkxlbmd0aChudW0pIHsgdGhpcy5fLnRleHRib3gubWlubGVuZ3RoID0gbnVtOyB9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgLyBTZXRzIHRoZSBtYXhpbXVtIGxlbmd0aCBvZiBjaGFyYWN0ZXJzXG5cdCAqIEB0eXBlIHtJbnRlZ2VyfVxuXHQgKi9cblx0Z2V0IG1heExlbmd0aCgpIHsgcmV0dXJuIHRoaXMuXy50ZXh0Ym94Lm1heGxlbmd0aDsgfVxuXHRzZXQgbWF4TGVuZ3RoKG51bSkgeyB0aGlzLl8udGV4dGJveC5tYXhsZW5ndGggPSBudW07IH1cblxuXHQvKipcblx0ICogUmV0dXJucyAvIFNldHMgdGhlIHNpemUgb2YgY29udHJvbC5cblx0ICogQHR5cGUge0ludGVnZXJ9XG5cdCAqL1xuXHRnZXQgc2l6ZSgpIHsgcmV0dXJuIHRoaXMuXy50ZXh0Ym94LnNpemU7IH1cblx0c2V0IHNpemUodmFsKSB7XG5cdFx0dGhpcy5fbm9kZS5zdHlsZS53aWR0aCA9IDIuMTYgKyAwLjQ4ICogdmFsICsgXCJlbVwiO1xuXHRcdHRoaXMuXy50ZXh0Ym94LnNpemUgPSB2YWw7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGV4dGJveDsiLCJpbXBvcnQgV2lkZ2V0IGZyb20gXCIuL1dpZGdldFwiO1xyXG5cclxuLyoqXHJcbiAqIEBleHRlbmRzIFdpZGdldFxyXG4gKiBAYWJzdHJhY3RcclxuICovXHJcbmNsYXNzIENvbW1hbmQgZXh0ZW5kcyBXaWRnZXQge1xyXG4gICAgYSgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29tbWFuZDsiLCJpbXBvcnQgV2lkZ2V0IGZyb20gXCIuL1dpZGdldFwiO1xyXG5cclxuLyoqXHJcbiAqIEBleHRlbmRzIFdpZGdldFxyXG4gKiBAYWJzdHJhY3RcclxuICovXHJcbmNsYXNzIENvbXBvc2l0ZSBleHRlbmRzIFdpZGdldCB7XHJcbiAgICBiKCkge31cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29tcG9zaXRlOyIsImltcG9ydCBtaXggZnJvbSBcIkB2ZXN0ZXJnYWFyZC1jb21wYW55L2pzLW1peGluXCI7XG5cbmltcG9ydCBzZWxlY3RvciBmcm9tIFwiLi8uLi8uLi91dGlscy9zZWxlY3RvclwiO1xuaW1wb3J0IGVsZW1lbnRzIGZyb20gXCIuLy4uLy4uL3V0aWxzL2VsZW1lbnRzXCI7XG5cbmltcG9ydCBXaWRnZXQgZnJvbSBcIi4vV2lkZ2V0XCI7XG5pbXBvcnQgVmFsaWRhdGlvbiBmcm9tIFwiLi8uLi8uLi9taXhpbnMvVmFsaWRhdGlvblwiO1xuXG4vKipcbiAqIEBleHRlbmRzIFdpZGdldFxuICogQG1peGVzIFZhbGlkYXRpb25cbiAqIEBhYnN0cmFjdFxuICovXG5jbGFzcyBJbnB1dCBleHRlbmRzIG1peChXaWRnZXQpLndpdGgoVmFsaWRhdGlvbikge1xuXHQvKipcblx0ICogQGFsaWFzIElucHV0OmNvbnN0cnVjdG9yXG4gXHQgKiBAcGFyYW0ge1JlZ2V4fSBbb3B0aW9ucy5pbnB1dC5wYXR0ZXJuXSBSZWdleCB0byBjaGVjayBhZ2FpbnN0IHdoZW4gdmFsaWRhdGluZ1xuXHQgKi9cblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdHN1cGVyKC4uLmFyZ3MpO1xuXG5cdFx0dGhpcy5fLnJlZ2lzdGVyQ3VzdG9tRWxlbWVudChcImlucHV0LnBhdHRlcm5cIik7XG5cdH1cblxuXHQvKiBQb2x5ZmlsbCBvZiBuYXRpdmUgcHJvcGVydGllcyAqL1xuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoZSBwYXJlbnQgZm9ybSBlbGVtZW50XG5cdCAqIEByZXR1cm5zIHtBY2Nlc3NpYmxlTm9kZX0ge0BsaW5rIEZvcm19XG5cdCAqL1xuXHRnZXQgZm9ybSgpIHtcblx0XHRyZXR1cm4gZWxlbWVudHMuZ2V0UGFyZW50KHRoaXMsIHNlbGVjdG9yLmdldERlZXAoXCJmb3JtXCIpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBmaXJzdCBlbGVtZW50IHBvaW50ZWQgYnkgdGhlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNjb250cm9sc30gcHJvcGVydHkuXG5cdCAqIFRoZSBwcm9wZXJ0eSBtYXkgYmUgbnVsbCBpZiBubyBIVE1MIGVsZW1lbnQgZm91bmQgaW4gdGhlIHNhbWUgdHJlZS5cblx0ICogQHJldHVybnMge0FjY2Vzc2libGVOb2RlfSB7QGxpbmsgTGlzdGJveH1cblx0ICovXG5cdGdldCBsaXN0KCkge1xuXHRcdHJldHVybiB0aGlzLmNvbnRyb2xzLmZpbmQoYXkgPT4gYXkuZWxlbWVudC5tYXRjaGVzKHNlbGVjdG9yLmdldChcImxpc3Rib3hcIikpKTtcblx0fVxuXG5cdC8vIGZvcm1BY3Rpb25cdHN0cmluZzogUmV0dXJucyAvIFNldHMgdGhlIGVsZW1lbnQncyBmb3JtYWN0aW9uIGF0dHJpYnV0ZSxjb250YWluaW5nIHRoZSBVUkkgb2YgYVxuXHQvLyBwcm9ncmFtIHRoYXQgcHJvY2Vzc2VzIGluZm9ybWF0aW9uIHN1Ym1pdHRlZCBieSB0aGUgZWxlbWVudC4gVGhpcyBvdmVycmlkZXMgdGhlIGFjdGlvbiBhdHRyaWJ1dGVcblx0Ly8gb2YgdGhlIHBhcmVudCBmb3JtLlxuXG5cdC8vIGZvcm1FbmNUeXBlXHRzdHJpbmc6IFJldHVybnMgLyBTZXRzIHRoZSBlbGVtZW50J3MgZm9ybWVuY3R5cGUgYXR0cmlidXRlLCBjb250YWluaW5nIHRoZSB0eXBlIG9mXG5cdC8vIGNvbnRlbnQgdGhhdCBpcyB1c2VkIHRvIHN1Ym1pdCB0aGUgZm9ybSB0byB0aGUgc2VydmVyLiBUaGlzIG92ZXJyaWRlcyB0aGUgZW5jdHlwZSBhdHRyaWJ1dGUgb2YgXG5cdC8vIHRoZSBwYXJlbnQgZm9ybS5cblx0XG5cdC8vIGZvcm1NZXRob2RcdHN0cmluZzogUmV0dXJucyAvIFNldHMgdGhlIGVsZW1lbnQncyBmb3JtbWV0aG9kIGF0dHJpYnV0ZSwgY29udGFpbmluZyB0aGUgSFRUUCBtZXRob2Rcblx0Ly8gdGhhdCB0aGUgYnJvd3NlciB1c2VzIHRvIHN1Ym1pdCB0aGUgZm9ybS4gVGhpcyBvdmVycmlkZXMgdGhlIG1ldGhvZCBhdHRyaWJ1dGUgb2YgdGhlIHBhcmVudCBmb3JtLlxuXG5cdC8vIGZvcm1Ob1ZhbGlkYXRlXHRib29sZWFuOiBSZXR1cm5zIC8gU2V0cyB0aGUgZWxlbWVudCdzIGZvcm1ub3ZhbGlkYXRlIGF0dHJpYnV0ZSwgaW5kaWNhdGluZyB0aGF0XG5cdC8vIHRoZSBmb3JtIGlzIG5vdCB0byBiZSB2YWxpZGF0ZWQgd2hlbiBpdCBpcyBzdWJtaXR0ZWQuIFRoaXMgb3ZlcnJpZGVzIHRoZSBub3ZhbGlkYXRlIGF0dHJpYnV0ZVxuXHQvLyBvZiB0aGUgcGFyZW50IGZvcm0uXG5cblx0Ly8gZm9ybVRhcmdldFx0c3RyaW5nOiBSZXR1cm5zIC8gU2V0cyB0aGUgZWxlbWVudCdzIGZvcm10YXJnZXQgYXR0cmlidXRlLCBjb250YWluaW5nIGEgbmFtZSBvclxuXHQvLyBrZXl3b3JkIGluZGljYXRpbmcgd2hlcmUgdG8gZGlzcGxheSB0aGUgcmVzcG9uc2UgdGhhdCBpcyByZWNlaXZlZCBhZnRlciBzdWJtaXR0aW5nIHRoZSBmb3JtLlxuXHQvLyBUaGlzIG92ZXJyaWRlcyB0aGUgdGFyZ2V0IGF0dHJpYnV0ZSBvZiB0aGUgcGFyZW50IGZvcm0uXG59XG5cbmV4cG9ydCBkZWZhdWx0IElucHV0O1xuIiwiaW1wb3J0IFNlY3Rpb24gZnJvbSBcIi4vU2VjdGlvblwiO1xyXG5cclxuLyoqXHJcbiAqIEBleHRlbmRzIFNlY3Rpb25cclxuICovXHJcbmNsYXNzIExhbmRtYXJrIGV4dGVuZHMgU2VjdGlvbiB7IH1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExhbmRtYXJrOyIsImltcG9ydCBXaWRnZXQgZnJvbSBcIi4vV2lkZ2V0XCI7XG5cbi8qKlxuICogKiooQWJzdHJhY3Qgcm9sZSkgU0hPVUxEIE5PVCBVU0VEIElOIFRIRSBET00qKiBcbiAqIEFuIGlucHV0IHJlcHJlc2VudGluZyBhIHJhbmdlIG9mIHZhbHVlcyB0aGF0IGNhbiBiZSBzZXQgYnkgdGhlIHVzZXIuXG4gKlxuICogQGNsYXNzXG4gKiBAZXh0ZW5kcyBXaWRnZXRcbiAqIEByZXR1cm4ge1JhbmdlfSB0aGlzXG4gKiBAc2VlIHtAbGluayBodHRwczovL3czYy5naXRodWIuaW8vYXJpYS9hcmlhL2FyaWEuaHRtbCNyYW5nZX1cbiAqL1xuY2xhc3MgUmFuZ2UgZXh0ZW5kcyBXaWRnZXQge1xuXHQvKipcblx0ICogQGFsaWFzIG1vZHVsZTpSYW5nZS1jb25zdFxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFx0XHRcdFx0ZWxlbWVudCB0byBkZXJpdmUgaW5mb3JtYXRpb24gbmFtZUZyb21cblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBcdFx0XHRcdFx0XHRvcHRpb25hbCBvcHRpb25zXG4gXHQgKiBAcGFyYW0ge051bWJlcnxcImFueVwifSBvcHRpb25zLnN0ZXAgXHRpbmNyZWFzZS9kZWNyZWFzZSB2YWx1ZSB1c2VkXG5cdCAqL1xuXHRjb25zdHJ1Y3RvciguLi5hcmcpIHtcblx0XHRzdXBlciguLi5hcmcpO1xuXG5cdFx0LyoqXG5cdCAgICogQG5hbWUgUmFuZ2UjX1xuXHRcdCAqIEB0eXBlIHtPYmplY3R9XG5cdFx0ICogQHByb3Age051bWJlcn0gW3N0ZXA9MV1cblx0ICAgKi9cblxuXHRcdHRoaXMuXy5yZWdpc3RlckN1c3RvbVZhbHVlKFwic3RlcFwiLCAxKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBQYXNzdHJvdWdoIG9mIGFuIHN0cmluZ2lmaWVkIGB2YWx1ZU5vd2Bcblx0ICogQHR5cGUge1N0cmluZ31cblx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjdmFsdWVOb3d9XG5cdCAqL1xuXHRnZXQgdmFsdWUoKSB7IHJldHVybiB0aGlzLnZhbHVlTm93LnRvU3RyaW5nKCk7fVxuXHRzZXQgdmFsdWUodmFsKSB7IHRoaXMudmFsdWVOb3cgPSB2YWw7IH1cblxuXHQvKipcblx0ICogUHJveHkgb2YgdGhlIGB2YWx1ZU5vd2AgdmFsdWVcblx0ICogQHR5cGUge051bWJlcn1cblx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjdmFsdWVOb3d9XG5cdCAqL1xuXHRnZXQgdmFsdWVBc051bWJlcigpIHsgcmV0dXJuIHRoaXMudmFsdWVOb3c7IH1cblx0c2V0IHZhbHVlQXNOdW1iZXIodmFsKSB7IHRoaXMudmFsdWVOb3cgPSB2YWw7IH1cblxuXHQvKipcbiAgICogRGVjcmVhc2UgdGhlIHZhbHVlIHdpdGggdGhlIGFtb3VudCBvZiAxIHN0ZXBcbiAgICogQHBhcmFtICB7RXZlbnR9IGV2IEV2ZW50IHdoZW4gdHJpZ2dlcmVkIHRocm91Z2ggYW4gZWxlbWVudHNcbiAgICovXG5cdHN0ZXBEb3duKGV2KSB7XG5cdFx0aWYodGhpcy5kaXNhYmxlZCkgcmV0dXJuO1xuXHRcdGlmKGV2KSBldi5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0aWYodGhpcy52YWx1ZU1pbiA9PT0gbnVsbCB8fCB0aGlzLnZhbHVlTm93ID4gdGhpcy52YWx1ZU1pbikge1xuXHRcdFx0dGhpcy52YWx1ZU5vdyA9IHRoaXMudmFsdWVOb3cgLSBOdW1iZXIodGhpcy5fLnN0ZXApO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuICAgKiBJbmNyZWFzZSB0aGUgdmFsdWUgd2l0aCB0aGUgYW1vdW50IG9mIDEgc3RlcFxuICAgKiBAcGFja2FnZVxuICAgKiBAcGFyYW0gIHtFdmVudH0gZXYgRXZlbnQgd2hlbiB0cmlnZ2VyZWQgdGhyb3VnaCBhbiBlbGVtZW50c1xuICAgKi9cblx0c3RlcFVwKGV2KSB7XG5cdFx0aWYodGhpcy5kaXNhYmxlZCkgcmV0dXJuO1xuXHRcdGlmKGV2KSBldi5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0aWYodGhpcy52YWx1ZU1heCA9PT0gbnVsbCB8fCB0aGlzLnZhbHVlTm93IDwgdGhpcy52YWx1ZU1heCkge1xuXHRcdFx0dGhpcy52YWx1ZU5vdyA9IHRoaXMudmFsdWVOb3cgKyBOdW1iZXIodGhpcy5fLnN0ZXApO1xuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBSYW5nZTsiLCJpbXBvcnQgQWNjZXNzaWJsZU5vZGUgZnJvbSBcImFvbWpzL3NyYy9BY2Nlc3NpYmxlTm9kZS5qc1wiO1xyXG5pbXBvcnQgQWNjZXNzaWJsZU5vZGVMaXN0IGZyb20gXCJhb21qcy9zcmMvQWNjZXNzaWJsZU5vZGVMaXN0LmpzXCI7XHJcblxyXG5pbXBvcnQgb2JqZWN0UGF0aCBmcm9tIFwib2JqZWN0LXBhdGhcIjtcclxuaW1wb3J0IG1peCBmcm9tIFwiQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW5cIjtcclxuXHJcbmltcG9ydCBlbGVtZW50cyBmcm9tIFwiLi8uLi8uLi91dGlscy9lbGVtZW50c1wiO1xyXG5pbXBvcnQgY3JlYXRlIGZyb20gXCIuLy4uLy4uL3V0aWxzL2NyZWF0ZVwiO1xyXG5pbXBvcnQgRXZlbnRUYXJnZXQgZnJvbSBcIi4vLi4vLi4vdXRpbHMvRXZlbnRUYXJnZXRcIjtcclxuXHJcbi8qKiBAbW9kdWxlIFJvbGV0eXBlICovXHJcblxyXG4vKipcclxuICogUmVnaXN0ZXIgZXh0cmEgZWxlbWVudHMgdXNlZCBmb3Igc29tZSByb2xlcyxcclxuICogZS5nLiB0aGUgdXAgYW5kIGRvd24gYXJyb3dzIHdpdGggdGhlIHNwaW5idXR0b24gcm9sZVxyXG4gKlxyXG4gKiBQYXRoIG9mIGltcG9ydGFuY2Ugd2hlcmUgdGhlIGVsZW1lbnQgaXMgcmVjZWl2ZWQgZnJvbTpcclxuICogMS4gbmV3IC4uLiguLi4sIHtlbGVtZW50czogeyByb2xlTmFtZTogeyBzdHI6IGluc3RhbmNlIG9mIEhUTUxFbGVtZW50IH19fSlcclxuICogMi4gW2RhdGEtcm9sZU5hbWUtc3RyPWlkXSBvbiB0aGUgZWxlbWVudCB3aXRoIHRoZSByb2xlXHJcbiAqIDMuIGRlZmF1bHQgdmFsdWVcclxuICpcclxuICogQHByaXZhdGVcclxuICogQHBhcmFtICB7c3RyaW5nfSBwYXRoIHBhdGggd2hlcmUgdGhlIGVsZW1lbnQgc2hvdWxkIGJlIHN0b3JlZFxyXG4gKi9cclxuZnVuY3Rpb24gaGFuZGxlQ3VzdG9tRWxlbWVudChwYXRoLCB2YWx1ZSkge1xyXG5cdC8vIG9ubHkgaWYgbm8gZWxlbWVudCBpcyBhbHJlYWR5IHNldFxyXG5cdGlmICghb2JqZWN0UGF0aC5oYXModGhpcywgXCJfLlwiICsgcGF0aCkpIHtcclxuXHRcdC8vIGNoZWNrIGlmIGVsZW1lbnQgaGFzIGl0IGRlZmluZWQgYXMgZGF0YSBhdHRyaWJ1dGVcclxuXHRcdHZhciBpZCA9IHRoaXMuX25vZGUuZ2V0QXR0cmlidXRlKFwiZGF0YS1cIiArIHBhdGguc3BsaXQoXCIuXCIpLmpvaW4oXCItXCIpKTtcclxuXHRcdGlmIChpZCkgdmFyIGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG5cdFx0aWYgKGVsKSB7XHJcblx0XHRcdG9iamVjdFBhdGguc2V0KHRoaXMsIFwiXy5cIiArIHBhdGgsIGVsKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG9iamVjdFBhdGguc2V0KHRoaXMsIFwiXy5cIiArIHBhdGgsIHZhbHVlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZUN1c3RvbVZhbHVlKHBhdGgsIHZhbHVlKSB7XHJcblx0Ly8gb25seSBpZiBubyBlbGVtZW50IGlzIGFscmVhZHkgc2V0XHJcblx0aWYgKCFvYmplY3RQYXRoLmhhcyh0aGlzLCBcIl8uXCIgKyBwYXRoKSkge1xyXG5cdFx0Ly8gY2hlY2sgaWYgZWxlbWVudCBoYXMgaXQgZGVmaW5lZCBhcyBkYXRhIGF0dHJpYnV0ZVxyXG5cdFx0dmFyIGRhdGFWYWx1ZSA9IHRoaXMuX25vZGUuZ2V0QXR0cmlidXRlKFwiZGF0YS1cIiArIHBhdGguc3BsaXQoXCIuXCIpLmpvaW4oXCItXCIpKTtcclxuXHRcdGlmIChkYXRhVmFsdWUpIHtcclxuXHRcdFx0b2JqZWN0UGF0aC5zZXQodGhpcywgXCJfLlwiICsgcGF0aCwgZGF0YVZhbHVlKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG9iamVjdFBhdGguc2V0KHRoaXMsIFwiXy5cIiArIHBhdGgsIHZhbHVlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAYWxpYXMgbW9kdWxlOlJvbGV0eXBlXHJcbiAqIEBleHRlbmRzIEFjY2Vzc2libGVOb2RlXHJcbiAqIEBtaXhlcyBtb2R1bGU6dXRpbHMvRXZlbnRUYXJnZXRcclxuICovXHJcbmNsYXNzIFJvbGV0eXBlIGV4dGVuZHMgbWl4KEFjY2Vzc2libGVOb2RlKS53aXRoKEV2ZW50VGFyZ2V0KSB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBleHRlbmRzIEFjY2Vzc2libGVOb2RlXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xyXG5cdFx0c3VwZXIoLi4uYXJncyk7XHJcblxyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiX1wiLCB7IHZhbHVlOiB7fSB9KTtcclxuXHRcdHRoaXMuXy5yZWdpc3RlckN1c3RvbUVsZW1lbnQgPSBoYW5kbGVDdXN0b21FbGVtZW50LmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLl8ucmVnaXN0ZXJDdXN0b21WYWx1ZSA9IGhhbmRsZUN1c3RvbVZhbHVlLmJpbmQodGhpcyk7XHJcblxyXG5cdFx0b2JqZWN0UGF0aC5wdXNoKHRoaXMuXywgXCJtdXRhdGlvbnNcIiwgXCJ0YWJJbmRleFwiKTtcclxuXHJcblx0XHQvLyB0aGlzLl9vbkFyaWFEaXNhYmxlZE11dGF0aW9uKCk7XHJcblx0fVxyXG5cclxuXHRfb25BcmlhRGlzYWJsZWRNdXRhdGlvbigpIHtcclxuXHRcdC8vIGNvbnNvbGUubG9nKHRoaXMuZGlzYWJsZWQsIHRoaXMudGFiSW5kZXgsIHRoaXMuZGlzYWJsZWQgJiYgdGhpcy50YWJJbmRleCAmJiB0aGlzLnRhYkluZGV4ID49IDApO1xyXG5cdFx0aWYodGhpcy5kaXNhYmxlZCAmJiB0aGlzLnRhYkluZGV4ID49IDApIHtcclxuXHRcdFx0dGhpcy50YWJJbmRleCA9IHVuZGVmaW5lZDtcclxuXHRcdH0gZWxzZSBpZighdGhpcy5kaXNhYmxlZCAmJiB0aGlzLnRhYkluZGV4IDwgMCkge1xyXG5cdFx0XHR0aGlzLnRhYkluZGV4ID0gMDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEN1cnJlbnQgdGFiaW5kZXggb2YgdGhlIGVsZW1lbnRcclxuXHQgKiBAdHlwZSB7TnVtYmVyfVxyXG5cdCAqL1xyXG5cdGdldCB0YWJJbmRleCgpIHtcclxuXHRcdGlmICghdGhpcy5fbm9kZS5oYXNBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX25vZGUudGFiSW5kZXg7XHJcblx0fVxyXG5cdHNldCB0YWJJbmRleChudW1iZXIpIHsgXHJcblx0XHR0aGlzLl9ub2RlLnRhYkluZGV4ID0gbnVtYmVyO1xyXG5cdH1cclxuXHJcblx0Z2V0IG93bnMoKSB7XHJcblx0XHRpZiAodGhpcy5fdmFsdWVzLm93bnMpIHJldHVybiB0aGlzLl92YWx1ZXMub3ducztcclxuXHJcblx0XHRpZiAodGhpcy5fbm9kZS5oYXNBdHRyaWJ1dGUoXCJhcmlhLW93bnNcIikpIHtcclxuXHRcdFx0dmFyIGlkcyA9IHRoaXMuX25vZGUuZ2V0QXR0cmlidXRlKFwiYXJpYS1vd25zXCIpLnNwbGl0KFwiIFwiKTtcclxuXHRcdFx0dmFyIGxpc3QgPSBuZXcgQWNjZXNzaWJsZU5vZGVMaXN0KCk7XHJcblx0XHRcdGlkcy5mb3JFYWNoKGlkID0+IHtcclxuXHRcdFx0XHR2YXIgbm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuXHRcdFx0XHRpZiAoIWVsZW1lbnRzLmhhcyhub2RlKSkge1xyXG5cdFx0XHRcdFx0Y3JlYXRlLm9uZShub2RlKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGxpc3QuYWRkKGVsZW1lbnRzLmdldChub2RlKSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0dGhpcy5fdmFsdWVzLm93bnMgPSBsaXN0O1xyXG5cdFx0XHRyZXR1cm4gbGlzdDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdGdldCBjb250cm9scygpIHtcclxuXHRcdGlmICh0aGlzLl92YWx1ZXMuY29udHJvbHMpIHJldHVybiB0aGlzLl92YWx1ZXMuY29udHJvbHM7XHJcblxyXG5cdFx0aWYgKHRoaXMuX25vZGUuaGFzQXR0cmlidXRlKFwiYXJpYS1jb250cm9sc1wiKSkge1xyXG5cdFx0XHR2YXIgaWRzID0gdGhpcy5fbm9kZS5nZXRBdHRyaWJ1dGUoXCJhcmlhLWNvbnRyb2xzXCIpLnNwbGl0KFwiIFwiKTtcclxuXHRcdFx0dmFyIGxpc3QgPSBuZXcgQWNjZXNzaWJsZU5vZGVMaXN0KCk7XHJcblx0XHRcdGlkcy5mb3JFYWNoKGlkID0+IHtcclxuXHRcdFx0XHR2YXIgbm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuXHRcdFx0XHRpZiAoIWVsZW1lbnRzLmhhcyhub2RlKSkge1xyXG5cdFx0XHRcdFx0Y3JlYXRlLm9uZShub2RlKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGxpc3QuYWRkKGVsZW1lbnRzLmdldChub2RlKSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0dGhpcy5fdmFsdWVzLmNvbnRyb2xzID0gbGlzdDtcclxuXHRcdFx0cmV0dXJuIGxpc3Q7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSb2xldHlwZTsiLCJpbXBvcnQgU3RydWN0dXJlIGZyb20gXCIuL1N0cnVjdHVyZVwiO1xyXG5cclxuLyoqXHJcbiAqIEBleHRlbmRzIFN0cnVjdHVyZVxyXG4gKi9cclxuY2xhc3MgU2VjdGlvbiBleHRlbmRzIFN0cnVjdHVyZSB7IH1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNlY3Rpb247IiwiaW1wb3J0IGZvY3VzIGZyb20gXCIuLy4uLy4uL3V0aWxzL2ZvY3VzXCI7XHJcblxyXG5pbXBvcnQgYm9vbGVhbiBmcm9tIFwiLi8uLi8uLi90eXBlL2Jvb2xlYW5cIjtcclxuaW1wb3J0IGVsZW1lbnRzIGZyb20gXCIuLy4uLy4uL3V0aWxzL2VsZW1lbnRzXCI7XHJcblxyXG5pbXBvcnQgUm9sZXR5cGUgZnJvbSBcIi4vUm9sZXR5cGVcIjtcclxuaW1wb3J0IG1peCBmcm9tIFwiQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW5cIjtcclxuaW1wb3J0IHNlbGVjdG9yIGZyb20gXCIuLy4uLy4uL3V0aWxzL3NlbGVjdG9yXCI7XHJcbmltcG9ydCBvd25zIGZyb20gXCIuLy4uLy4uL3V0aWxzL293bnNcIjtcclxuXHJcbi8qKlxyXG4gKiAjIyMgS2V5Ym9hcmQgU3VwcG9ydFxyXG4gKlxyXG4gKiAjIyMjIERlZmF1bHRcclxuICogXHJcbiAqIHwgS2V5IHwgRnVuY3Rpb24gfFxyXG4gKiB8IC0tLSB8IC0tLS0tLS0tIHxcclxuICogfCBEb3duIEFycm93IHwgTW92ZXMgZm9jdXMgdG8gdGhlIG5leHQgb3B0aW9uIDxici8+IElmIG5vdCBtdWx0aXNlbGVjdGFibGUsIGl0IHNlbGVjdHMgdGhlIGZvY3VzZWQgb3B0aW9uLlxyXG4gKiB8IFVwIEFycm93ICAgfCBNb3ZlcyBmb2N1cyB0byB0aGUgcHJldmlvdXMgb3B0aW9uICA8YnIvPiBJZiBub3QgbXVsdGlzZWxlY3RhYmxlLCBpdCBzZWxlY3RzIHRoZSBmb2N1c2VkIG9wdGlvbi5cclxuICogfCBIb21lICAgICAgIHwgTW92ZXMgZm9jdXMgdG8gdGhlIGZpcnN0IG9wdGlvbiAgPGJyLz4gSWYgbm90IG11bHRpc2VsZWN0YWJsZSwgaXQgc2VsZWN0cyB0aGUgZm9jdXNlZCBvcHRpb24uXHJcbiAqIHwgRW5kICAgICAgICB8IE1vdmVzIGZvY3VzIHRvIHRoZSBsYXN0IG9wdGlvbiAgPGJyLz4gSWYgbm90IG11bHRpc2VsZWN0YWJsZSwgaXQgc2VsZWN0cyB0aGUgZm9jdXNlZCBvcHRpb24uXHJcbiAqXHJcbiAqICMjIyMgTXVsdGlwbGUgc2VsZWN0aW9uXHJcbiAqIFxyXG4gKiB8IEtleSB8IEZ1bmN0aW9uIHxcclxuICogfCAtLS0gfCAtLS0tLS0tLSB8XHJcbiAqIHwgU3BhY2VcdCAgICAgICAgICAgICAgICB8IENoYW5nZXMgdGhlIHNlbGVjdGlvbiBzdGF0ZSBvZiB0aGUgZm9jdXNlZCBvcHRpb24uXHJcbiAqIHwgU2hpZnQgKyBEb3duIEFycm93ICAgICB8IE1vdmVzIGZvY3VzIHRvIGFuZCBzZWxlY3RzIHRoZSBuZXh0IG9wdGlvbi5cclxuICogfCBTaGlmdCArIFVwIEFycm93ICAgICAgIHwgTW92ZXMgZm9jdXMgdG8gYW5kIHNlbGVjdHMgdGhlIHByZXZpb3VzIG9wdGlvbi5cclxuICogfCBDb250cm9sICsgU2hpZnQgKyBIb21lIHwgU2VsZWN0cyBmcm9tIHRoZSBmb2N1c2VkIG9wdGlvbiB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBsaXN0LlxyXG4gKiB8IENvbnRyb2wgKyBTaGlmdCArIEVuZCAgfCBTZWxlY3RzIGZyb20gdGhlIGZvY3VzZWQgb3B0aW9uIHRvIHRoZSBlbmQgb2YgdGhlIGxpc3QuXHJcbiAqIHwgQ29udHJvbCArIEEgICAgICAgICAgICB8IFNlbGVjdHMgYWxsIG9wdGlvbnMgaW4gdGhlIGxpc3QuIElmIGFsbCBvcHRpb25zIGFyZSBzZWxlY3RlZCwgdW5zZWxlY3RzIGFsbCBvcHRpb25zLlxyXG4gKlxyXG4gKiAjIyMgQXR0cmlidXRlc1xyXG4gKiBcclxuICogKiBgYXJpYS1zZWxlY3RlZGBcclxuICogXHQqIGB0cnVlYFxyXG4gKiBcdFx0KiBpcyB0aGUgY3VycmVudCBmb2N1c3NlZCBlbGVtZW50XHJcbiAqIFx0XHQqIGVxdWFscyB0aGUgdmFsdWUgb2YgYGFyaWEtYWN0aXZlZGVzY2VuZGFudGBcclxuICogKiBgdGFiaW5kZXhgXHJcbiAqIFx0KiBhbGxvd3MgdXNhZ2Ugb2YgdGhlIGVsZW1lbnQgYnkga2V5cyB3aGVuIGluIGZvY3VzXHJcbiAqICogYGFyaWEtYWN0aXZlZGVzY2VuZGFudGAgZXF1YWxzIElEIG9mIGN1cnJlbnQgZm9jdXNzZWQgZWxlbWVudFxyXG4gKiBcclxuICogIyMjIyBNdWx0aXBsZSBzZWxlY3Rpb25cclxuICogXHJcbiAqICogYGFyaWEtc2VsZWN0ZWRgXHJcbiAqICAqIGB0cnVlYFxyXG4gKiBcdFx0KiBjYW4gYmUgYXBwbGllZCB0byBtdWx0aXBsZSBlbGVtZW50XHJcbiAqICAgICogbm90IGF1dG9tYXRpY2FsbHkgYXBwbGllZCB0byB0aGUgZm9jdXNlZCBlbGVtZW50XHJcbiAqIFx0KiBgZmFsc2VgXHJcbiAqICogYHRhYmluZGV4YFxyXG4gKiBcdCogYWxsb3dzIHVzYWdlIG9mIHRoZSBlbGVtZW50IGJ5IGtleXMgd2hlbiBpbiBmb2N1c1xyXG4gKiBcclxuICogQHN1bW1hcnkgQSBmb3JtIHdpZGdldCB0aGF0IGFsbG93cyB0aGUgdXNlciB0byBtYWtlIHNlbGVjdGlvbnMgZnJvbSBhIHNldCBvZiBjaG9pY2VzLlxyXG4gKiBAZXh0ZW5kcyBSb2xldHlwZVxyXG4gKi9cclxuY2xhc3MgU2VsZWN0IGV4dGVuZHMgUm9sZXR5cGUge1xyXG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcclxuXHRcdHN1cGVyKC4uLmFyZ3MpO1xyXG5cclxuXHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm1vdmVUb1N0YXJ0LmJpbmQodGhpcyksIHtrZXk6IFwiSG9tZVwifSk7XHJcblx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlcIiwgdGhpcy5tb3ZlVG9QcmV2LmJpbmQodGhpcyksIHtrZXk6IFwiQXJyb3dVcFwifSk7XHJcblx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlcIiwgdGhpcy5tb3ZlVG9OZXh0LmJpbmQodGhpcyksIHtrZXk6IFwiQXJyb3dEb3duXCJ9KTtcclxuXHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm1vdmVUb0VuZC5iaW5kKHRoaXMpLCB7a2V5OiBcIkVuZFwifSk7XHJcblxyXG5cdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHRoaXMub25DaGFuZ2UuYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0dGhpcy5vcHRpb25zID0gb3ducy5nZXRBbGxBbGxvd2VkQ2hpbGRyZW4odGhpcyk7XHJcblx0fVxyXG5cclxuXHRtb3ZlVG9QcmV2KGV2KSB7IG1vdmUodGhpcywgZXYsIGZvY3VzLnByZXYsIHRoaXMubW92ZWQuYmluZCh0aGlzKSk7IH1cclxuXHRtb3ZlVG9OZXh0KGV2KSB7IG1vdmUodGhpcywgZXYsIGZvY3VzLm5leHQsIHRoaXMubW92ZWQuYmluZCh0aGlzKSk7IH1cclxuXHRtb3ZlVG9TdGFydChldikgeyBtb3ZlKHRoaXMsIGV2LCBmb2N1cy5zdGFydCwgdGhpcy5tb3ZlZC5iaW5kKHRoaXMpKTsgfVxyXG5cdG1vdmVUb0VuZChldikgeyBtb3ZlKHRoaXMsIGV2LCBmb2N1cy5lbmQsIHRoaXMubW92ZWQuYmluZCh0aGlzKSk7IH1cclxuXHRcclxuXHRtb3ZlZCgpIHt9XHJcblxyXG5cdG9uQ2hhbmdlKGV2KSB7XHJcblx0XHQvLyByZXRyaWV2ZSBvcHRpb24gdGhhdCBoYXMgYmVlbiBjaGFuZ2VkXHJcblx0XHR2YXIgY2hhbmdlZE9wdGlvbiA9IHRoaXMub3B0aW9ucy5maW5kKG9wdGlvbiA9PiBvcHRpb24uX25vZGUgPT09IGV2LnRhcmdldCk7XHJcblxyXG5cdFx0Zm9jdXMuZm9jdXMoY2hhbmdlZE9wdGlvbiwgZmFsc2UsIHRoaXMpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gbW92ZShheSwgZXYsIGZ1bmMsIGNhbGxiYWNrKSB7XHJcblx0aWYgKGV2KSBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRsZXQgdG87XHJcblxyXG5cdGlmKGF5LmFjdGl2ZURlc2NlbmRhbnQpIHtcclxuXHRcdC8vIHJldHJpZXZlIG5ldyBmb2N1cyBpZiBhIHNwZWNpZmljIGZvY3VzIGlzIHNldFxyXG5cdFx0dG8gPSBmdW5jKGF5LCBheS5hY3RpdmVEZXNjZW5kYW50KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0Ly8gZmFsbGJhY2sgZWxlbWVudCB0byBmb2N1c1xyXG5cdFx0dG8gPSBheS5vcHRpb25zWzBdO1xyXG5cdFx0Zm9jdXMuZm9jdXModG8sIGZhbHNlLCBheSk7XHJcblx0fVxyXG5cclxuXHRjYWxsYmFjayh0byk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNlbGVjdDsiLCJpbXBvcnQgUm9sZXR5cGUgZnJvbSBcIi4vUm9sZXR5cGVcIjtcclxuXHJcbi8qKlxyXG4gKiBAZXh0ZW5kcyBSb2xldHlwZVxyXG4gKi9cclxuY2xhc3MgU3RydWN0dXJlIGV4dGVuZHMgUm9sZXR5cGUgeyB9XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdHJ1Y3R1cmU7XHJcbiIsImltcG9ydCBSb2xldHlwZSBmcm9tIFwiLi9Sb2xldHlwZVwiO1xyXG5cclxuLyoqXHJcbiAqIEBleHRlbmRzIFJvbGV0eXBlXHJcbiAqL1xyXG4vLyBsZXQgV2lkZ2V0ID0gKHN1cGVyY2xhc3MpID0+IGNsYXNzIGV4dGVuZHMgc3VwZXJjbGFzcyB7fVxyXG5cclxuY2xhc3MgV2lkZ2V0IGV4dGVuZHMgUm9sZXR5cGUge31cclxuXHJcbmV4cG9ydCBkZWZhdWx0ICBXaWRnZXQ7XHJcbiIsImltcG9ydCBSb2xldHlwZSBmcm9tIFwiLi9Sb2xldHlwZVwiO1xyXG5cclxuLyoqXHJcbiAqIEBleHRlbmRzIFJvbGV0eXBlXHJcbiAqL1xyXG5jbGFzcyBXaW5kb3cgZXh0ZW5kcyBSb2xldHlwZSB7IH1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdpbmRvdztcclxuIiwiLyoqIEBtb2R1bGUgT3B0aW9uICovXHJcblxyXG5pbXBvcnQgSW5wdXQgZnJvbSBcIi4vYWJzdHJhY3QvSW5wdXRcIjtcclxuXHJcbi8qKlxyXG4gKiBAc2VlIG1vZHVsZTpMaXN0Ym94XHJcbiAqIEBhbGlhcyBtb2R1bGU6T3B0aW9uXHJcbiAqIEBleHRlbmRzIElucHV0XHJcbiAqL1xyXG5jbGFzcyBPcHRpb24gZXh0ZW5kcyBJbnB1dCB7XHJcblxyXG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcclxuXHRcdHN1cGVyKC4uLmFyZ3MpO1xyXG5cclxuXHRcdGxldCBvbkNsaWNrID0gdGhpcy5vbkNsaWNrLmJpbmQodGhpcyk7XHJcblxyXG5cdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb25DbGljayk7XHJcblx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlcIiwgb25DbGljaywge2tleTogXCJFbnRlclwifSk7XHJcblx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlcIiwgb25DbGljaywgeyBrZXk6IFwiU3BhY2VcIn0pO1xyXG5cdH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHJhZGlvIHN0YXR1cyB0cm91Z2ggYW4gZXZlbnRcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZcclxuICAgICAqIEBsaXN0ZW5zIE1vdXNlRXZlbnQ6Y2xpY2tcclxuICAgICAqIEBsaXN0ZW5zIE1vdXNlRXZlbnQ6ZW5nZXJcclxuICAgICAqIEBsaXN0ZW5zIEtleWJvYXJkOnNwYWNlXHJcbiAgICAgKi9cclxuXHRvbkNsaWNrKGV2KSB7XHJcblx0XHRpZihldikgZXYucHJldmVudERlZmF1bHQoKTtcclxuXHRcdGlmKHR5cGVvZiBzdXBlci5vbkNsaWNrID09IFwiZnVuY3Rpb25cIikgc3VwZXIub25DbGljayhldik7XHJcblxyXG5cdFx0aWYgKHRoaXMgPT09IGV2LnRhcmdldCkge1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkID0gIXRoaXMuc2VsZWN0ZWQ7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHNlbGVjdGVkIHN0YXRlXHJcbiAgICAgKiBcclxuICAgICAqIEBmaXJlcyBFdmVudDpjaGFuZ2VcclxuICAgICAqIEBmaXJlcyBJbnB1dEV2ZW50OmlucHV0XHJcbiAgICAgKi9cclxuXHRzZXQgc2VsZWN0ZWQodmFsdWUpIHtcclxuXHRcdGxldCBvbGQgPSB0aGlzLnNlbGVjdGVkO1xyXG5cclxuXHRcdHN1cGVyLnNlbGVjdGVkID0gdmFsdWU7XHJcblxyXG5cdFx0aWYgKG9sZCAhPT0gdmFsdWUpIHtcclxuXHRcdFx0dmFyIGUgPSBuZXcgRXZlbnQoXCJjaGFuZ2VcIiwgeyBidWJibGVzOiB0cnVlIH0pO1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0ID0gKCkgPT4ge1xyXG5cdFx0XHRcdHN1cGVyLnNlbGVjdGVkID0gb2xkO1xyXG5cdFx0XHRcdHRoaXMuZGVmYXVsdFByZXZlbnRlZCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgSW5wdXRFdmVudChcImlucHV0XCIpKTtcclxuXHR9XHJcblx0Z2V0IHNlbGVjdGVkKCkgeyByZXR1cm4gc3VwZXIuc2VsZWN0ZWQ7IH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgT3B0aW9uOyIsImltcG9ydCBUZXh0Ym94IGZyb20gXCIuL1RleHRib3hcIjtcblxuLyoqXG4gKiBAZXh0ZW5kcyBUZXh0Ym94XG4gKi9cbmNsYXNzIFNlYXJjaGJveCBleHRlbmRzIFRleHRib3gge1xuXHQvKipcblx0ICogIyMjIyBFeGFtcGxlXG5cdCAqIFxuXHQgKiA8ZGl2IHJvbGU9XCJzZWFyY2hib3hcIiBjb250ZW50ZWRpdGFibGU+PC9kaXY+XG5cdCAqIFxuXHQgKiBgYGBodG1sXG5cdCAqIDxkaXYgcm9sZT1cInNlYXJjaGJveFwiIGNvbnRlbnRlZGl0YWJsZT48L2Rpdj5cblx0ICogYGBgXG5cdCAqIFxuXHQgKiBAcGFyYW0geyp9IGFyZ3MgXG5cdCAqL1xuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7IHN1cGVyKC4uLmFyZ3MpOyB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaGJveDsiLCJleHBvcnQgY29uc3QgSVNfQUNUSVZFID0gXCJ0cnVlXCIsIElTX05PVF9BQ1RJVkUgPSBcImZhbHNlXCI7XHJcblxyXG4vKipcclxuKiBSZXR1cm5zIHRoZSBvcHBvc2l0ZSBzdGF0ZSBvZiB0aGUgYXR0cmlidXRlLFxyXG4qIG5lZWRlZCB3aGVuIGF0dHJpYnV0ZSB1c2VzIGFuIHRva2VuIGxpc3RcclxuKiBAcmV0dXJuIHtTdHJpbmd9IE5ldyBzdGF0ZVxyXG4qL1xyXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlKHN0YXRlKSB7XHJcblx0aWYgKHN0YXRlID09IElTX0FDVElWRSkge1xyXG5cdFx0c3RhdGUgPSBJU19OT1RfQUNUSVZFO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRzdGF0ZSA9IElTX0FDVElWRTtcclxuXHR9XHJcblx0cmV0dXJuIHN0YXRlO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IElTX0FDVElWRSwgSVNfTk9UX0FDVElWRSwgdG9nZ2xlIH07IiwiZXhwb3J0IGNvbnN0IElTX0FDVElWRSA9IHRydWUsIElTX05PVF9BQ1RJVkUgPSBmYWxzZTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiBnaXZlbiBhdHRyaWJ1dGUgYXMgQm9vbGVhblxyXG4gKiBAcGFyYW0ge0FjY2Vzc2libGVOb2RlfSBheSBcclxuICogQHBhcmFtIHtTdHJpbmd9IGF0dHJpYnV0ZU5hbWUgXHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59IGF0dHJpYnV0ZSdzIHZhbHVlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0KGF5LCBhdHRyaWJ1dGVOYW1lKSB7XHJcblx0dmFyIHZhbHVlID0gYXkuXy5yYXdBdHRycy5hdHRyaWJ1dGVOYW1lIHx8IGF5LmVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpO1xyXG5cdGlmKHZhbHVlID09IHVuZGVmaW5lZCApIHJldHVybjtcclxuXHRyZXR1cm4gdmFsdWUgID09IFwidHJ1ZVwiIHx8IGZhbHNlO1xyXG59XHJcblxyXG4vKipcclxuICogU3luYyB0aGUgbmV3IHZhbHVlIHRvIHRoZSBwcm9wZXJ0eVxyXG4gKiBAcGFyYW0ge0FjY2Vzc2libGVOb2RlfSBheSBcclxuICogQHBhcmFtIHtTdHJpbmd9IGF0dHJpYnV0ZU5hbWUgXHJcbiAqIEBwYXJhbSB7U3RyaW5nIHwgQm9vbGVhbn0gc3RhdHVzIFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldChheSwgYXR0cmlidXRlTmFtZSwgc3RhdHVzKSB7XHJcblx0aWYoc3RhdHVzID09IHVuZGVmaW5lZCkge1xyXG5cdFx0YXkuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGF5LmVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUsIHN0YXR1cyk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gc3RhdHVzO1xyXG59XHJcblxyXG4vKipcclxuKiBSZXR1cm5zIHRoZSBvcHBvc2l0ZSBzdGF0ZSBvZiB0aGUgYXR0cmlidXRlXHJcbiogQHJldHVybiB7Qm9vbGVhbn0gTmV3IHN0YXRlXHJcbiovXHJcbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGUoc3RhdGUpIHtcclxuXHRpZiAoc3RhdGUgPT0gSVNfQUNUSVZFKSB7XHJcblx0XHRzdGF0ZSA9IElTX05PVF9BQ1RJVkU7XHJcblx0fSBlbHNlIHtcclxuXHRcdHN0YXRlID0gSVNfQUNUSVZFO1xyXG5cdH1cclxuXHRyZXR1cm4gc3RhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgSVNfQUNUSVZFLCBJU19OT1RfQUNUSVZFLCBnZXQsIHNldCwgdG9nZ2xlIH07IiwiLyoqIEBtb2R1bGUgKi9cclxuXHJcbmltcG9ydCB7IERlY2xhcmVNaXhpbiB9IGZyb20gJ0B2ZXN0ZXJnYWFyZC1jb21wYW55L2pzLW1peGluJztcclxuXHJcbmltcG9ydCBlbGVtZW50cyBmcm9tIFwiLi9lbGVtZW50c1wiO1xyXG5pbXBvcnQgdHJlZSBmcm9tIFwiLi90cmVlXCI7XHJcblxyXG5sZXQgYXR0YWNoZWRMaXN0ZW5lcnMgPSBbXTtcclxubGV0IGtleWJvYXJkTGlzdGVuZXJzID0ge307XHJcblxyXG4vKipcclxuICogQ2F0Y2hlcyBET00gZXZlbnRzIGFuZCByZXNlbmRzIGl0IHRyb3VnaCB0aGUgYWNjZXNzaWJpbGl0eSB0cmVlXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBwYXJhbSB7RXZlbnR9IGV2IFxyXG4gKi9cclxuZnVuY3Rpb24gY2F0Y2hFdmVudChldikge1xyXG5cdHJldHVybiBkaXNwYXRjaFRvQWNjZXNzaWJsZVRyZWUoZXYudGFyZ2V0LCBldiwgKGF5LCBldikgPT4gYXkuX2xpc3RlbmVycy5nZXQoZXYudHlwZSkpO1xyXG59XHJcblxyXG4vKipcclxuICogQ2F0Y2hlcyBET00gZXZlbnRzIGFuZCByZXNlbmRzIGl0IHRyb3VnaCB0aGUgYWNjZXNzaWJpbGl0eSB0cmVlXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBwYXJhbSB7RXZlbnR9IGV2IFxyXG4gKi9cclxuZnVuY3Rpb24gY2F0Y2hLZXlFdmVudChldikge1x0XHJcblx0cmV0dXJuIGRpc3BhdGNoVG9BY2Nlc3NpYmxlVHJlZShldi50YXJnZXQsIGV2LCAoYXksIGV2KSA9PiB7XHJcblx0XHRyZXR1cm4ga2V5Ym9hcmRMaXN0ZW5lcnNbZXYuY29kZV0gPyBrZXlib2FyZExpc3RlbmVyc1tldi5jb2RlXS5nZXQoYXkpIDogdW5kZWZpbmVkO1xyXG5cdH0pO1xyXG59XHJcblxyXG4vKipcclxuICogRGlzcGF0Y2ggdGhlIGdpdmVuIGV2ZW50IHRvIHRoZSB3aG9sZSB0cmVlXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IFRhcmdldGVkIGVsZW1lbnRcclxuICogQHBhcmFtIHtFdmVudH0gZXZcclxuICovXHJcbmZ1bmN0aW9uIGRpc3BhdGNoVG9BY2Nlc3NpYmxlVHJlZSh0YXJnZXQsIGV2LCBnZXRMaXN0ZW5lcnMpIHtcclxuXHRsZXQgcGF0aCA9IFtdO1xyXG5cclxuXHRpZiAoZWxlbWVudHMuaGFzKHRhcmdldCkvKiAmJiBrZXlib2FyZExpc3RlbmVyc1tldi5jb2RlXSovKSB7XHJcblx0XHQvLyBjbG9uZSBldmVudFxyXG5cdFx0bGV0IGNsb25lZEV2ZW50ID0ge307XHJcblx0XHRmb3IgKGxldCBrIGluIGV2KSBjbG9uZWRFdmVudFtrXSA9IGV2W2tdO1xyXG5cdFx0aWYgKGV2W1N5bWJvbC50b1N0cmluZ1RhZ10pIGNsb25lZEV2ZW50W1N5bWJvbC50b1N0cmluZ1RhZ10gPSBldltTeW1ib2wudG9TdHJpbmdUYWddO1xyXG5cdFx0Y2xvbmVkRXZlbnQucHJldmVudERlZmF1bHQgPSAoKSA9PiB7IGV2LnByZXZlbnREZWZhdWx0KCk7IH07XHJcblxyXG5cdFx0Ly8gZ2V0IGEyMHkgaW5zdGFuY2VcclxuXHRcdGxldCB0YXJnZXRBMjB5ID0gZWxlbWVudHMuZ2V0KHRhcmdldCk7XHJcblxyXG5cdFx0Ly8gY2hlY2sgYWNjZXNzaWJpbGl0eSBmb2N1cywgdXBkYXRlIHRhcmdldCBpZiBuZWVkZWRcclxuXHRcdC8qKiBAdG9kbyBvbmx5IGNoYW5nZSB0YXJnZXQgaWYgZXZlbnQgaXMgb25seSBwb3NzaWJsZSB0cm91Z2ggZWxlbWVudCBmb2N1cyAqL1xyXG5cdFx0aWYgKHRhcmdldEEyMHkuYWN0aXZlRGVzY2VuZGFudCkgdGFyZ2V0QTIweSA9IHRhcmdldEEyMHkuYWN0aXZlRGVzY2VuZGFudDtcclxuXHJcblx0XHQvLyBnZW5lcmF0ZSBwYXRoXHJcblx0XHRsZXQgcGFyZW50ID0gdHJlZS5nZXRQYXJlbnQodGFyZ2V0QTIweSk7XHJcblx0XHR3aGlsZSAocGFyZW50Ll9ub2RlLnBhcmVudEVsZW1lbnQpIHtcclxuXHRcdFx0cGF0aC5wdXNoKHBhcmVudCk7XHJcblx0XHRcdHBhcmVudCA9IHRyZWUuZ2V0UGFyZW50KHBhcmVudCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gc2V0IGRlZmF1bHQgdmFsdWVzXHJcblx0XHRjbG9uZWRFdmVudC50YXJnZXQgPSB0YXJnZXRBMjB5O1xyXG5cdFx0Y2xvbmVkRXZlbnQucGF0aCA9IHBhdGg7XHJcblxyXG5cdFx0Ly8gY2FwdHVyZSBwaGFzZVxyXG5cdFx0Y2xvbmVkRXZlbnQuZXZlbnRQaGFzZSA9IGV2LkNBUFRVUklOR19QSEFTRTtcclxuXHRcdGZvciAobGV0IGkgPSBwYXRoLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcblx0XHRcdGNvbnN0IGF5ID0gcGF0aFtpXTtcclxuXHRcdFx0Y29uc3QgbGlzdGVuZXJzT2ZBeSA9IGdldExpc3RlbmVycyhheSwgZXYpO1xyXG5cdFx0XHRpZiAobGlzdGVuZXJzT2ZBeSkge1xyXG5cdFx0XHRcdGxpc3RlbmVyc09mQXkuZm9yRWFjaCgoeyBsaXN0ZW5lciwgb3B0aW9ucyB9KSA9PiB7XHJcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5jYXB0dXJlKSB7XHJcblx0XHRcdFx0XHRcdGNsb25lZEV2ZW50LmN1cnJlbnRUYXJnZXQgPSBheTtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coY2xvbmVkRXZlbnQsIGF5KTtcclxuXHRcdFx0XHRcdFx0bGlzdGVuZXIoY2xvbmVkRXZlbnQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gYXQgdGFyZ2V0XHJcblx0XHRjbG9uZWRFdmVudC5ldmVudFBoYXNlID0gZXYuQVRfVEFSR0VUO1xyXG5cdFx0Y29uc3QgbGlzdGVuZXJzT2ZUYXJnZXQgPSBnZXRMaXN0ZW5lcnModGFyZ2V0QTIweSwgZXYpO1xyXG5cdFx0aWYgKGxpc3RlbmVyc09mVGFyZ2V0KSB7XHJcblx0XHRcdGxpc3RlbmVyc09mVGFyZ2V0LmZvckVhY2goKHsgbGlzdGVuZXIgfSkgPT4ge1xyXG5cdFx0XHRcdGNsb25lZEV2ZW50LmN1cnJlbnRUYXJnZXQgPSB0YXJnZXRBMjB5O1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGNsb25lZEV2ZW50LCB0YXJnZXRBMjB5KTtcclxuXHRcdFx0XHRsaXN0ZW5lcihjbG9uZWRFdmVudCk7XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gYnViYmxlIHBoYXNlXHJcblx0XHRjbG9uZWRFdmVudC5ldmVudFBoYXNlID0gZXYuQlVCQkxFX1BIQVNFO1xyXG5cdFx0aWYgKGV2LmJ1YmJsZXMpIHtcclxuXHRcdFx0cGF0aC5mb3JFYWNoKGF5ID0+IHtcclxuXHRcdFx0XHRjb25zdCBsaXN0ZW5lcnNPZkF5ID0gZ2V0TGlzdGVuZXJzKGF5LCBldik7XHJcblx0XHRcdFx0aWYgKGxpc3RlbmVyc09mQXkpIHtcclxuXHRcdFx0XHRcdGxpc3RlbmVyc09mQXkuZm9yRWFjaCgoeyBsaXN0ZW5lciB9KSA9PiB7XHJcblx0XHRcdFx0XHRcdGNsb25lZEV2ZW50LmN1cnJlbnRUYXJnZXQgPSBheTtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coY2xvbmVkRXZlbnQsIGF5KTtcclxuXHRcdFx0XHRcdFx0bGlzdGVuZXIoY2xvbmVkRXZlbnQpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4qIEBuYW1lIEV2ZW50VGFyZ2V0XHJcbiogQGFsaWFzIG1vZHVsZTpFdmVudFRhcmdldFxyXG4qIEBtaXhpblxyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBEZWNsYXJlTWl4aW4oKHN1cGVyY2xhc3MpID0+IGNsYXNzIGV4dGVuZHMgc3VwZXJjbGFzcyB7XHJcblx0XHJcblx0LyoqXHJcblx0ICogTGlzdGVuIGZvciBhIGV2ZW50IHdpdGhpbiB0aGUgYWNjZXNzaWJsZSB0cmVlLlxyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIEEgY2FzZS1zZW5zaXRpdmUgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgZXZlbnQgdHlwZSB0byBsaXN0ZW4gZm9yLlxyXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIFJlY2VpdmVzIGEgbm90aWZpY2F0aW9uIHdoZW4gYW4gZXZlbnQgb2YgdGhlIHNwZWNpZmllZCB0eXBlIG9jY3Vycy5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIEFuIG9wdGlvbnMgb2JqZWN0IHRoYXQgc3BlY2lmaWVzIGNoYXJhY3RlcmlzdGljcyBhYm91dCB0aGUgZXZlbnQgbGlzdGVuZXIuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jYXB0dXJlID0gZmFsc2VdXHJcblx0ICogSW5kaWNhdGVzIHRoYXQgZXZlbnRzIG9mIHRoaXMgdHlwZSB3aWxsIGJlIGRpc3BhdGNoZWQgdG8gdGhlIHJlZ2lzdGVyZWQgbGlzdGVuZXIgYmVmb3JlIGJlaW5nXHJcblx0ICogZGlzcGF0Y2hlZCB0byBhbnkgRXZlbnRUYXJnZXQgYmVuZWF0aCBpdCBpbiB0aGUgYWNjZXNzaWJpbGl0eSB0cmVlLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMub25jZSA9IGZhbHNlXVxyXG5cdCAqIEluZGljYXRlcyB0aGF0IHRoZSBsaXN0ZW5lciBzaG91bGQgYmUgaW52b2tlZCBhdCBtb3N0IG9uY2UgYWZ0ZXIgYmVpbmcgYWRkZWQuXHJcblx0ICogSWYgdHJ1ZSwgdGhlIGxpc3RlbmVyIHdvdWxkIGJlIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZCB3aGVuIGludm9rZWQuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5wYXNzaXZlID0gZmFsc2VdXHJcblx0ICogSW5kaWNhdGVzIHRoYXQgdGhlIGxpc3RlbmVyIHdpbGwgbmV2ZXIgY2FsbCBwcmV2ZW50RGVmYXVsdCgpLlxyXG5cdCAqIElmIGl0IGRvZXMsIHRoZSB1c2VyIGFnZW50IHNob3VsZCBpZ25vcmUgaXQgYW5kIGdlbmVyYXRlIGEgY29uc29sZSB3YXJuaW5nLlxyXG5cdCAqIEBwYXJhbSB7U3RyaW5nIHwgQXJyYXl9IFtvcHRpb25zLmtleV1cclxuXHQgKi9cclxuXHRhZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyLCBvcHRpb25zID0ge30pIHtcclxuXHRcdC8vIGN1c3RvbSBldmVudFxyXG5cdFx0aWYodHlwZSA9PT0gXCJrZXlcIikge1xyXG5cdFx0XHQvLyBpZiBtdWx0aXBsZSBrZXlzIGdpdmVuIGF0dGFjaCBlYWNoIG9mIHRoZW0gc2VwYXJhdGVseVxyXG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShvcHRpb25zLmtleSkpIHtcclxuXHRcdFx0XHRyZXR1cm4gb3B0aW9ucy5rZXkuZm9yRWFjaChrZXkgPT4ge1xyXG5cdFx0XHRcdFx0bGV0IGNsb25lZE9wdGlvbiA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpO1xyXG5cdFx0XHRcdFx0Y2xvbmVkT3B0aW9uLmtleSA9IGtleTtcclxuXHRcdFx0XHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcImtleVwiLCBsaXN0ZW5lciwgY2xvbmVkT3B0aW9uKVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBtYWtlIHN1cmUgbmF0aXZlIGtleXByZXNzZXMgYXJlIGNhdGNoZWRcclxuXHRcdFx0aWYgKGF0dGFjaGVkTGlzdGVuZXJzLmluZGV4T2YodHlwZSkgPT0gLTEpIHtcclxuXHRcdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgY2F0Y2hLZXlFdmVudCwgeyBjYXB0dXJlOiB0cnVlIH0pO1xyXG5cdFx0XHRcdGF0dGFjaGVkTGlzdGVuZXJzLnB1c2godHlwZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIHByZXBhcmUgZGF0YSBzdHJ1Y3R1cmUgaWYgbmVlZGVkXHJcblx0XHRcdGlmICgha2V5Ym9hcmRMaXN0ZW5lcnNbb3B0aW9ucy5rZXldKSBrZXlib2FyZExpc3RlbmVyc1tvcHRpb25zLmtleV0gPSBuZXcgV2Vha01hcCgpO1xyXG5cdFx0XHRpZiAoIWtleWJvYXJkTGlzdGVuZXJzW29wdGlvbnMua2V5XS5oYXModGhpcykpIGtleWJvYXJkTGlzdGVuZXJzW29wdGlvbnMua2V5XS5zZXQodGhpcywgW10pO1xyXG5cclxuXHRcdFx0a2V5Ym9hcmRMaXN0ZW5lcnNbb3B0aW9ucy5rZXldLmdldCh0aGlzKS5wdXNoKHsgbGlzdGVuZXIsIG9wdGlvbnMgfSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvLyBtYWtlIHN1cmUgbmF0aXZlIGV2ZW50cyBhcmUgY2FwdHVyZXMgYW5kIHJlYnJvYWRjYXN0ZWQgdGhyb3VnaCB0aGUgYWNjZXNzaWJpbGl0eSB0cmVlXHJcblx0XHRcdGlmIChhdHRhY2hlZExpc3RlbmVycy5pbmRleE9mKHR5cGUpID09IC0xKSB7XHJcblx0XHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgY2F0Y2hFdmVudCwgeyBjYXB0dXJlOiB0cnVlIH0pO1xyXG5cdFx0XHRcdGF0dGFjaGVkTGlzdGVuZXJzLnB1c2godHlwZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHN1cGVyLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBwcmV2aW91c2x5IHJlZ2lzdGVyZWQgZXZlbnQgbGlzdGVuZXJzIHdobyBoYXZlIHRoZSBzYW1lXHJcblx0ICogY29tYmluYXRpb24gb2YgZXZlbnQgdHlwZSwgdGhlIGxpc3RlbmVyIGZ1bmN0aW9uIGFuZCBvcHRpb25zXHJcblx0ICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcclxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmNhcHR1cmVdXHJcblx0ICogQHBhcmFtIHtTdHJpbmcgfCBBcnJheX0gW29wdGlvbnMua2V5XVxyXG5cdCAqL1xyXG5cdHJlbW92ZUV2ZW50TGlzdGVuZXIoLi4uYXJncykge1xyXG5cdFx0c3VwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciguLi5hcmdzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERpc3BhdGNoZXMgYW4gRXZlbnQgdGhyb3VnaCB0aGUgYWNjZXNzaWJsaXR5IHRyZWUsIGludm9raW5nIHRoZVxyXG5cdCAqIGV2ZW50IGxpc3RlbmVycyBpbiB0aGUgYXBwcm9wcmlhdGUgb3JkZXIuXHJcblx0ICogQHBhcmFtIHtFdmVudH0gZXZlbnQgRXZlbnQgb2JqZWN0IHRvIGJlIGRpc3BhdGNoZWRcclxuXHQgKiBAcmV0dXJuIHtCb29sZWFufVxyXG5cdCAqL1xyXG5cdGRpc3BhdGNoRXZlbnQoZXZlbnQpIHtcclxuXHRcdHJldHVybiBkaXNwYXRjaFRvQWNjZXNzaWJsZVRyZWUodGhpcy5fbm9kZSwgZXZlbnQsIChheSwgZXYpID0+IHtcclxuXHRcdFx0cmV0dXJuIGF5Ll9saXN0ZW5lcnMuZ2V0KGV2LnR5cGUpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59KTsiLCJpbXBvcnQgY3JlYXRlIGZyb20gXCIuL2NyZWF0ZVwiO1xuXG4vKipcbiAqIFxuICovXG5jbGFzcyBWYWxpZGl0eVN0YXRlIHtcblx0Y29uc3RydWN0b3IoYXkpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJfYXlcIiwge1xuXHRcdFx0dmFsdWU6IGF5XG5cdFx0fSk7XG5cdH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoVmFsaWRpdHlTdGF0ZS5wcm90b3R5cGUsXG5cdC8qKiBAbGVuZHMgVmFsaWRpdHlTdGF0ZS5wcm90b3R5cGUgKi9cblx0e1xuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdXNlciBoYXMgcHJvdmlkZWQgaW5wdXQgaW4gdGhlIHVzZXIgaW50ZXJmYWNlIHRoYXQgdGhlIFxuXHRcdCAqIHVzZXIgYWdlbnQgaXMgdW5hYmxlIHRvIGNvbnZlcnQgdG8gYSB2YWx1ZTsgZmFsc2Ugb3RoZXJ3aXNlLlxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxuXHRcdCAqL1xuXHRcdGJhZElucHV0OiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRpZiAoKChjcmVhdGUuaW5zdGFuY2VPZih0aGlzLl9heSwgXCJzcGluYnV0dG9uXCIpIHx8IGNyZWF0ZS5pbnN0YW5jZU9mKHRoaXMuX2F5LCBcInNsaWRlclwiKSlcblx0XHRcdFx0XHQmJiB0aGlzLl9heS52YWx1ZU5vdy5sZW5ndGggPiAwICYmICEvXlstK10/KD86XFxkK3xcXGQqWy4sXVxcZCspJC8udGVzdCh0aGlzLl9heS52YWx1ZU5vdykpXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW50IGhhcyBhIGN1c3RvbSBlcnJvcjsgZmFsc2Ugb3RoZXJ3aXNlLlxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxuXHRcdCAqL1x0XG5cdFx0Y3VzdG9tRXJyb3I6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQoKSB7IHJldHVybiAhIXRoaXMuX2N1c3RvbUVycm9yOyB9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudOKAmXMgdmFsdWUgZG9lc27igJl0IG1hdGNoIHRoZSBwcm92aWRlZCBwYXR0ZXJuOyBmYWxzZSBvdGhlcndpc2UuXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0cGF0dGVybk1pc21hdGNoOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0KCkge1xuXHRcdFx0XHR2YXIgdmFsdWUgPSB0aGlzLl9heS5fLmlucHV0ID8gdGhpcy5fYXkuXy5pbnB1dC52YWx1ZSA6IHRoaXMuX2F5LnZhbHVlTm93O1xuXHRcdFx0XHRpZiAodGhpcy5fYXkuXy5pbnB1dC5wYXR0ZXJuICYmIHZhbHVlLmxlbmd0aCA+IDAgJiYgbmV3IFJlZ0V4cCh0aGlzLl9heS5fLmlucHV0LnBhdHRlcm4pLnRlc3QodmFsdWUpID09PSBmYWxzZSkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW504oCZcyB2YWx1ZSBpcyBoaWdoZXIgdGhhbiB0aGUgcHJvdmlkZWQgbWF4aW11bTsgZmFsc2Ugb3RoZXJ3aXNlLlxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxuXHRcdCAqL1xuXHRcdHJhbmdlT3ZlcmZsb3c6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQoKSB7XG5cdFx0XHRcdGlmICh0aGlzLl9heS52YWx1ZU5vdyAmJiB0aGlzLl9heS52YWx1ZU1heCAmJiB0aGlzLl9heS52YWx1ZU5vdyA+IHRoaXMuX2F5LnZhbHVlTWF4KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudOKAmXMgdmFsdWUgaXMgbG93ZXIgdGhhbiB0aGUgcHJvdmlkZWQgbWluaW11bTsgZmFsc2Ugb3RoZXJ3aXNlLlxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxuXHRcdCAqL1xuXHRcdHJhbmdlVW5kZXJmbG93OiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRpZiAodGhpcy5fYXkudmFsdWVOb3cgJiYgdGhpcy5fYXkudmFsdWVNaW4gJiYgdGhpcy5fYXkudmFsdWVOb3cgPCB0aGlzLl9heS52YWx1ZU1pbikge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnTigJlzIHZhbHVlIGRvZXNu4oCZdCBmaXQgdGhlIHJ1bGVzIGdpdmVuIGJ5IHRoZSBzdGVwIGF0dHJpYnV0ZTsgZmFsc2Ugb3RoZXJ3aXNlLlxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxuXHRcdCAqL1xuXHRcdHN0ZXBNaXNtYXRjaDoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldCgpIHtcblx0XHRcdFx0aWYgKHRoaXMuX2F5Ll8ucmFuZ2UgJiYgdGhpcy5fYXkuXy5yYW5nZS5zdGVwICYmIHRoaXMuX2F5LnZhbHVlTm93ICUgdGhpcy5fYXkuXy5yYW5nZS5zdGVwICE9PSAwKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudOKAmXMgdmFsdWUgaXMgbG9uZ2VyIHRoYW4gdGhlIHByb3ZpZGVkIG1heGltdW0gbGVuZ3RoOyBmYWxzZSBvdGhlcndpc2UuXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0dG9vTG9uZzoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldCgpIHtcblx0XHRcdFx0dmFyIHZhbHVlID0gdGhpcy5fYXkuXy5pbnB1dCA/IHRoaXMuX2F5Ll8uaW5wdXQudmFsdWUgOiB0aGlzLl9heS52YWx1ZU5vdztcblx0XHRcdFx0aWYgKHRoaXMuX2F5Lm1heGxlbmd0aCAmJiB2YWx1ZS5sZW5ndGggPiB0aGlzLl9heS5tYXhsZW5ndGgpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnTigJlzIHZhbHVlLCBpZiBpdCBpcyBub3QgdGhlIGVtcHR5IHN0cmluZywgaXMgc2hvcnRlciB0aGFuIHRoZSBwcm92aWRlZCBtaW5pbXVtIGxlbmd0aDsgZmFsc2Ugb3RoZXJ3aXNlLlxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxuXHRcdCAqL1xuXHRcdHRvb1Nob3J0OiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0KCkge1xuXHRcdFx0XHR2YXIgdmFsdWUgPSB0aGlzLl9heS5fLmlucHV0ID8gdGhpcy5fYXkuXy5pbnB1dC52YWx1ZSA6IHRoaXMuX2F5LnZhbHVlTm93O1xuXHRcdFx0XHRpZiAodGhpcy5fYXkubWlubGVuZ3RoICYmIHZhbHVlLmxlbmd0aCA8IHRoaXMuX2F5Lm1pbmxlbmd0aCkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudOKAmXMgdmFsdWUgaXMgbm90IGluIHRoZSBjb3JyZWN0IHN5bnRheDsgZmFsc2Ugb3RoZXJ3aXNlLlxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxuXHRcdCAqL1xuXHRcdHR5cGVNaXNtYXRjaDogeyBcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQoKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnQgaGFzIG5vIHZhbHVlIGJ1dCBpcyBhIHJlcXVpcmVkIGZpZWxkOyBmYWxzZSBvdGhlcndpc2UuXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0dmFsdWVNaXNzaW5nOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0KCkge1xuXHRcdFx0XHR2YXIgdmFsdWUgPSB0aGlzLl9heS5fLmlucHV0ID8gdGhpcy5fYXkuXy5pbnB1dC52YWx1ZSA6IHRoaXMuX2F5LnZhbHVlTm93O1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0dGhpcy5yZXF1aXJlZFxuXHRcdFx0XHRcdCYmIChcblx0XHRcdFx0XHRcdCgoY3JlYXRlLmluc3RhbmNlT2YodGhpcy5fYXksIFwiY2hlY2tib3hcIikgfHwgY3JlYXRlLmluc3RhbmNlT2YodGhpcy5fYXksIFwicmFkaW9cIilcblx0XHRcdFx0XHRcdFx0fHwgY3JlYXRlLmluc3RhbmNlT2YodGhpcy5fYXksIFwib3B0aW9uXCIpKSAmJiAhdGhpcy5fYXkuY2hlY2tlZClcblx0XHRcdFx0XHRcdHx8IChjcmVhdGUuaW5zdGFuY2VPZih0aGlzLl9heSwgXCJzZWxlY3RcIikgJiYgIXZhbHVlKVxuXHRcdFx0XHRcdFx0fHwgKChjcmVhdGUuaW5zdGFuY2VPZih0aGlzLl9heSwgXCJpbnB1dFwiKSB8fCBjcmVhdGUuaW5zdGFuY2VPZih0aGlzLl9heSwgXCJncmlkY2VsbFwiKSkgJiYgIXZhbHVlID4gMClcblx0XHRcdFx0XHQpXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnTigJlzIHZhbHVlIGhhcyBubyB2YWxpZGl0eSBwcm9ibGVtczsgZmFsc2Ugb3RoZXJ3aXNlXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0dmFsaWQ6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQoKSB7XG5cdFx0XHRcdHJldHVybiAhKFxuXHRcdFx0XHRcdHRoaXMuYmFkSW5wdXQgfHxcblx0XHRcdFx0XHR0aGlzLmN1c3RvbUVycm9yIHx8XG5cdFx0XHRcdFx0dGhpcy5wYXR0ZXJuTWlzbWF0Y2ggfHxcblx0XHRcdFx0XHR0aGlzLnJhbmdlT3ZlcmZsb3cgfHxcblx0XHRcdFx0XHR0aGlzLnJhbmdlVW5kZXJmbG93IHx8XG5cdFx0XHRcdFx0dGhpcy5zdGVwTWlzbWF0Y2ggfHxcblx0XHRcdFx0XHR0aGlzLnRvb0xvbmcgfHxcblx0XHRcdFx0XHR0aGlzLnRvb1Nob3J0IHx8XG5cdFx0XHRcdFx0dGhpcy50eXBlTWlzbWF0Y2ggfHxcblx0XHRcdFx0XHR0aGlzLnZhbHVlTWlzc2luZ1xuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgVmFsaWRpdHlTdGF0ZTsiLCJpbXBvcnQgc2VsZWN0b3IgZnJvbSBcIi4vc2VsZWN0b3JcIjtcbmltcG9ydCBlbGVtZW50cyBmcm9tIFwiLi9lbGVtZW50c1wiO1xuaW1wb3J0IGdldENvbXB1dGVkUm9sZSBmcm9tIFwiLi9nZXRDb21wdXRlZFJvbGVcIjtcblxuaW1wb3J0IFJhbmdlIGZyb20gXCIuLy4uL3JvbGUvYWJzdHJhY3QvUmFuZ2VcIjtcbmltcG9ydCBSb2xldHlwZSBmcm9tIFwiLi8uLi9yb2xlL2Fic3RyYWN0L1JvbGV0eXBlXCI7XG5cbmltcG9ydCBCdXR0b24gZnJvbSBcIi4vLi4vcm9sZS9CdXR0b25cIjtcbmltcG9ydCBDaGVja2JveCBmcm9tIFwiLi8uLi9yb2xlL0NoZWNrYm94XCI7XG5pbXBvcnQgQ29tYm9ib3ggZnJvbSBcIi4vLi4vcm9sZS9Db21ib2JveFwiO1xuaW1wb3J0IERpYWxvZyBmcm9tIFwiLi8uLi9yb2xlL0RpYWxvZ1wiO1xuaW1wb3J0IEZvcm0gZnJvbSBcIi4vLi4vcm9sZS9Gb3JtXCI7XG5pbXBvcnQgTWVudSBmcm9tIFwiLi8uLi9yb2xlL01lbnVcIjtcbmltcG9ydCBNZW51YmFyIGZyb20gXCIuLy4uL3JvbGUvTWVudWJhclwiO1xuaW1wb3J0IE1lbnVpdGVtIGZyb20gXCIuLy4uL3JvbGUvTWVudWl0ZW1cIjtcbmltcG9ydCBMaW5rIGZyb20gXCIuLy4uL3JvbGUvTGlua1wiO1xuaW1wb3J0IExpc3Rib3ggZnJvbSBcIi4vLi4vcm9sZS9MaXN0Ym94XCI7XG5pbXBvcnQgT3B0aW9uIGZyb20gXCIuLy4uL3JvbGUvb3B0aW9uXCI7XG5pbXBvcnQgUmFkaW8gZnJvbSBcIi4vLi4vcm9sZS9SYWRpb1wiO1xuaW1wb3J0IFJhZGlvZ3JvdXAgZnJvbSBcIi4vLi4vcm9sZS9SYWRpb2dyb3VwXCI7XG5pbXBvcnQgU2VhcmNoYm94IGZyb20gXCIuLy4uL3JvbGUvc2VhcmNoYm94XCI7XG5pbXBvcnQgU2xpZGVyIGZyb20gXCIuLy4uL3JvbGUvU2xpZGVyXCI7XG5pbXBvcnQgU3BpbmJ1dHRvbiBmcm9tIFwiLi8uLi9yb2xlL1NwaW5idXR0b25cIjtcbmltcG9ydCBTd2l0Y2ggZnJvbSBcIi4vLi4vcm9sZS9Td2l0Y2hcIjtcbmltcG9ydCBUYWIgZnJvbSBcIi4vLi4vcm9sZS9UYWJcIjtcbmltcG9ydCBUYWJsaXN0IGZyb20gXCIuLy4uL3JvbGUvVGFibGlzdFwiO1xuaW1wb3J0IFRhYnBhbmVsIGZyb20gXCIuLy4uL3JvbGUvVGFicGFuZWxcIjtcbmltcG9ydCBUZXh0Ym94IGZyb20gXCIuLy4uL3JvbGUvVGV4dGJveFwiO1xuXG52YXIgb2JqID0geyBCdXR0b24sIENoZWNrYm94LCBDb21ib2JveCwgRGlhbG9nLCBGb3JtLCBNZW51LCBNZW51YmFyLCBNZW51aXRlbSwgTGlzdGJveCwgXG5cdE9wdGlvbiwgUmFuZ2UsIFJvbGV0eXBlLCBTZWFyY2hib3gsIFNsaWRlciwgU3BpbmJ1dHRvbixcblx0VGFiLCBUYWJsaXN0LCBUYWJwYW5lbCwgVGV4dGJveCwgTGluaywgU3dpdGNoLFxuXHRSYWRpb2dyb3VwLCBSYWRpb1xufTtcblxuZnVuY3Rpb24gYWxsKCkge1xuXHRmb3IgKGxldCBrZXkgaW4gb2JqKSB7XG5cdFx0dmFyIG5vZGVMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvci5nZXRSb2xlKGtleS50b0xvd2VyQ2FzZSgpKSk7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBub2RlTGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYoIWVsZW1lbnRzLmhhcyhub2RlTGlzdFtpXSkpIHtcblx0XHRcdFx0ZWxlbWVudHMuc2V0KG5vZGVMaXN0W2ldLCBuZXcgb2JqW2tleV0obm9kZUxpc3RbaV0pKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gb25lKGVsKSB7XG5cdGlmKGVsZW1lbnRzLmhhcyhlbCkpIHJldHVybiBlbGVtZW50cy5nZXQoZWwpO1xuXHRsZXQgcm9sZSA9IGdldENvbXB1dGVkUm9sZShlbCk7XG5cdGxldCBjb25zdHJ1Y3Rvcjtcblx0XG5cdC8qKiBAdG9kbyBSZW1vdmUgZmFsbGJhY2sgbWV0aG9kICovXG5cdGlmKHJvbGUpe1xuXHRcdGNvbnN0cnVjdG9yID0gb2JqW3JvbGUuc2xpY2UoMCwgMSkudG9VcHBlckNhc2UoKSArIHJvbGUuc2xpY2UoMSldIHx8IFJvbGV0eXBlO1xuXHR9IGVsc2Uge1xuXHRcdGNvbnN0cnVjdG9yID0gUm9sZXR5cGU7XG5cdH1cblxuXHRyZXR1cm4gZWxlbWVudHMuc2V0KGVsLCBuZXcgY29uc3RydWN0b3IoZWwpKTtcbn1cblxuZnVuY3Rpb24gaW5zdGFuY2VPZihheSwgcm9sZSkge1xuXHRyZXR1cm4gYXkgaW5zdGFuY2VvZiBvYmpbcm9sZV07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHthbGwsIG9uZSwgaW5zdGFuY2VPZn07XG4iLCJpbXBvcnQgY3JlYXRlIGZyb20gXCIuL2NyZWF0ZVwiO1xuaW1wb3J0IGdldENvbXB1dGVkUm9sZSBmcm9tIFwiLi9nZXRDb21wdXRlZFJvbGVcIjtcblxudmFyIGF5SW5zdGFuY2VzID0gbmV3IFdlYWtNYXAoKTtcblxuLy8gdG9kbzogbG9vcCB0aHJvdWdoIHByZXNlbnRhdGlvbmFsIHJvbGVzXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFyZW50KGF5LCBzZWxlY3Rvcikge1xuXHRsZXQgZWxlbWVudCA9IGF5LmVsZW1lbnQ7XG5cblx0d2hpbGUoZWxlbWVudC5wYXJlbnROb2RlKSB7XG5cdFx0ZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcblxuXHRcdGlmIChheS5lbGVtZW50LnBhcmVudE5vZGUubWF0Y2hlcyhzZWxlY3RvcikpIHtcblx0XHRcdGlmIChheUluc3RhbmNlcy5oYXMoYXkuZWxlbWVudC5wYXJlbnROb2RlKSkge1xuXHRcdFx0XHRyZXR1cm4gYXlJbnN0YW5jZXMuZ2V0KGF5LmVsZW1lbnQucGFyZW50Tm9kZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY3JlYXRlLm9uZShheS5lbGVtZW50LnBhcmVudE5vZGUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBmYWxzZTtcbn1cblxuLyoqIEB0b2RvIGZpbmQgb25seSBgZGlyZWN0YCBjaGlsZHJlbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENoaWxkcmVuKGF5LCByb2xlKSB7XG5cdHZhciByZXN1bHRzID0gW107XG5cdHZhciBvd25zID0gQXJyYXkuZnJvbShheS5lbGVtZW50LmNoaWxkcmVuKS5jb25jYXQoYXkub3ducyk7XG5cblx0b3ducy5mb3JFYWNoKGNoaWxkID0+IHtcblx0XHRpZiAoIXJvbGUgfHwgKHJvbGUgJiYgZ2V0Q29tcHV0ZWRSb2xlKGNoaWxkKSA9PSByb2xlKSkge1xuXHRcdFx0aWYgKGF5SW5zdGFuY2VzLmhhcyhjaGlsZCkpIHtcblx0XHRcdFx0cmVzdWx0cy5wdXNoKGF5SW5zdGFuY2VzLmdldChjaGlsZCkpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmVzdWx0cy5wdXNoKGNyZWF0ZS5vbmUoY2hpbGQpKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBvd25zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJldihjaGlsZCwgcGFyZW50LCByb2xlKSB7XG5cdGlmKCFwYXJlbnQpIHJldHVybiBmYWxzZTtcblxuXHRsZXQgY2hpbGRyZW4gPSBnZXRDaGlsZHJlbihwYXJlbnQsIHJvbGUpO1xuXHRsZXQgaW5kZXhQcmV2RWxlbWVudCA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoY2hpbGRyZW4sIGNoaWxkKSAtIDE7XG5cdGlmKGluZGV4UHJldkVsZW1lbnQgPCAwKSByZXR1cm4gZmFsc2U7XG5cblx0cmV0dXJuIGNoaWxkcmVuW2luZGV4UHJldkVsZW1lbnRdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV4dChjaGlsZCwgcGFyZW50LCByb2xlKSB7XG5cdGlmKCFwYXJlbnQpIHJldHVybiBmYWxzZTtcblxuXHRsZXQgY2hpbGRyZW4gPSBnZXRDaGlsZHJlbihwYXJlbnQsIHJvbGUpO1xuXHRsZXQgaW5kZXhOZXh0ID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChjaGlsZHJlbiwgY2hpbGQpICsgMTtcblx0aWYoaW5kZXhOZXh0ID49IGNoaWxkcmVuLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuXG5cdHJldHVybiBjaGlsZHJlbltpbmRleE5leHRdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhcnQoY2hpbGQsIHBhcmVudCwgcm9sZSkge1xuXHRpZighcGFyZW50KSByZXR1cm4gZmFsc2U7XG5cdGxldCBjaGlsZHJlbiA9IGdldENoaWxkcmVuKHBhcmVudCwgcm9sZSk7XG5cdHJldHVybiBjaGlsZHJlblswXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVuZChjaGlsZCwgcGFyZW50LCByb2xlKSB7XG5cdGlmKCFwYXJlbnQpIHJldHVybiBmYWxzZTtcblx0bGV0IGNoaWxkcmVuID0gZ2V0Q2hpbGRyZW4ocGFyZW50LCByb2xlKTtcblx0cmV0dXJuIGNoaWxkcmVuW2NoaWxkcmVuLmxlbmd0aCAtIDFdO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG5cdG1hcDogYXlJbnN0YW5jZXMsXG5cdGdldDogYXlJbnN0YW5jZXMuZ2V0LmJpbmQoYXlJbnN0YW5jZXMpLFxuXHRzZXQ6IGF5SW5zdGFuY2VzLnNldC5iaW5kKGF5SW5zdGFuY2VzKSxcblx0aGFzOiBheUluc3RhbmNlcy5oYXMuYmluZChheUluc3RhbmNlcyksXG5cdGdldENoaWxkcmVuLFxuXHRnZXRQYXJlbnQsXG5cdGdldFByZXYsXG5cdGdldE5leHQsXG5cdGdldFN0YXJ0LFxuXHRnZXRFbmRcbn07IiwiLyoqIEBtb2R1bGUgRm9jdXMgKi9cclxuXHJcbmltcG9ydCBlbGVtZW50cyBmcm9tIFwiLi9lbGVtZW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIFNjcm9sbHMgYW4gZWxlbWVudCBpbnRvIGl0cyBwYXJlbnQgdmlld1xyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGNoaWxkIEVsZW1lbnQgdG8gc2hvd1xyXG4gKi9cclxuZnVuY3Rpb24gc2Nyb2xsSW50b1ZpZXcoY2hpbGQpIHtcclxuICAgIGxldCBwYXJlbnQgPSBjaGlsZC5vZmZzZXRQYXJlbnQ7XHJcblxyXG4gICAgLy8gY2hlY2sgaWYgcGFyZW50IGlzIGFuIHNjcm9sbGFibGUgZWxlbWVudFxyXG4gICAgaWYgKHBhcmVudCAmJiBwYXJlbnQuc2Nyb2xsSGVpZ2h0ID4gcGFyZW50LmNsaWVudEhlaWdodCkge1xyXG4gICAgICAgIHZhciBzY3JvbGxCb3R0b20gPSBwYXJlbnQuY2xpZW50SGVpZ2h0ICsgcGFyZW50LnNjcm9sbFRvcDtcclxuICAgICAgICB2YXIgZWxlbWVudEJvdHRvbSA9IGNoaWxkLm9mZnNldFRvcCArIGNoaWxkLm9mZnNldEhlaWdodDtcclxuXHJcbiAgICAgICAgLy8gc2Nyb2xsIGVsZW1lbnQgdG8gcGFyZW50cyBib3R0b21cclxuICAgICAgICBpZiAoZWxlbWVudEJvdHRvbSA+IHNjcm9sbEJvdHRvbSkge1xyXG4gICAgICAgICAgICBwYXJlbnQuc2Nyb2xsVG9wID0gZWxlbWVudEJvdHRvbSAtIHBhcmVudC5jbGllbnRIZWlnaHQ7XHJcblxyXG4gICAgICAgIC8vIHNjcm9sbCBlbGVtZW50IHRvIHBhcmVudHMgdG9wXHJcbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZC5vZmZzZXRUb3AgPCBwYXJlbnQuc2Nyb2xsVG9wKSB7XHJcbiAgICAgICAgICAgIHBhcmVudC5zY3JvbGxUb3AgPSBjaGlsZC5vZmZzZXRUb3A7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vXHJcbi8vIE1vdmUgZm9jdXMgLy9cclxuLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuLyoqXHJcbiAqIEZvY3VzIGlzIHNldCB0byBmaXJzdCBpbiB0aGUgbGlzdFxyXG4gKiBAcGFyYW0ge1JvbGV0eXBlfSBjb250cm9scyBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzdGFydChjb250cm9scykge1xyXG4gICAgcmV0dXJuIGZvY3VzKGNvbnRyb2xzLm9wdGlvbnNbMF0sIGZhbHNlLCBjb250cm9scyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwcmV2KGNvbnRyb2xzLCBheSkge1xyXG4gICAgdmFyIGN1cnJlbnRJbmRleCA9IGNvbnRyb2xzLm9wdGlvbnMuaW5kZXhPZihheSk7XHJcblxyXG4gICAgLy8gaXMgYWxyZWFkeSBvbiBmaXJzdCBlbGVtZW50XHJcbiAgICBpZihjdXJyZW50SW5kZXggPD0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGlmIChpc0ZvY3VzYWJsZShheSkpIHtcclxuICAgICAgICBheS50YWJJbmRleCA9IC0xO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmb2N1cyhjb250cm9scy5vcHRpb25zW2N1cnJlbnRJbmRleCAtIDFdLCBmYWxzZSwgY29udHJvbHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbmV4dChjb250cm9scywgYXkpIHtcclxuICAgIHZhciBjdXJyZW50SW5kZXggPSBjb250cm9scy5vcHRpb25zLmluZGV4T2YoYXkpO1xyXG5cclxuICAgIC8vIGlzIGFscmFkeSBvbiBsYXN0IGVsZW1lbnRcclxuICAgIGlmIChjdXJyZW50SW5kZXggPj0gY29udHJvbHMub3B0aW9ucy5sZW5ndGggLTEpIHJldHVybjtcclxuXHJcbiAgICBpZihpc0ZvY3VzYWJsZShheSkpIHtcclxuICAgICAgICBheS50YWJJbmRleCA9IC0xO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmb2N1cyhjb250cm9scy5vcHRpb25zW2N1cnJlbnRJbmRleCArIDFdLCBmYWxzZSwgY29udHJvbHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZW5kKGNvbnRyb2xzKSB7XHJcbiAgICByZXR1cm4gZm9jdXMoY29udHJvbHMub3B0aW9uc1tjb250cm9scy5vcHRpb25zIC0gMV0sIGZhbHNlLCBjb250cm9scyk7XHJcbn1cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbi8vICAgICAgICAgICAgICAgICAgRW5kIG9mIG1vdmUgZnVuY3Rpb25zICAgICAgICAgICAgICAgICAgIC8vXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgb2JqZWN0IGhhcyBmb2N1cyBhbmQgZG9lc24ndCBoYXMgYSBzZXQgYWN0aXZlRGVzY2VuZGFudFxyXG4gKiBvciBpZiB0aGUgZWxlbWVudCB0aGF0IGhhcyBmb2N1cyBoYXMgYSBzZXQgYWN0aXZlRGVzY2VuZGFudCB0aGF0IHBvaW50cyB0byBnaXZlbiBvYmplY3RcclxuICogXHJcbiAqIEBwYXJhbSB7Um9sZXR5cGV9IGF5IFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhhc0ZvY3VzKGF5KSB7XHJcbiAgICAvLyBjaGVjayBpZiBjdXJyZW50IG9iamVjdCBoYXMgbmF0aXZlIGZvY3VzXHJcbiAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gYXkuX25vZGUgJiYgIWF5LmFjdGl2ZURlc2NlbmRhbnQpIHJldHVybiB0cnVlO1xyXG5cclxuICAgIC8vIGNoZWNrIGlmIGN1cnJlbnQgZm9jdXMgaXMgc2V0IGJ5IGFjdGl2ZSBkZXNjZW5kYW50XHJcbiAgICBpZiAoZWxlbWVudHMuaGFzKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSB7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRzLmdldChkb2N1bWVudC5hY3RpdmVFbGVtZW50KS5hY3RpdmVEZXNjZW5kYW50ID09PSBheTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBhbiBlbGVtZW50IGNhbiBoYXZlIGZvY3VzXHJcbiAqIEBwYXJhbSB7Um9sZXR5cGV9IGF5IFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRm9jdXNhYmxlKGF5KSB7XHJcbiAgICByZXR1cm4gYXkuX25vZGUudGFiSW5kZXggPiAtMSB8fCBheS5fbm9kZS5oYXNBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIE1vdmVzIHRoZSBmb2N1cyB0byB0aGUgZWxlbWVudC5cclxuICogXHJcbiAqIE9yZGVyIG9mIHVzZWQgbWV0aG9kcyB0byBhZGQgZm9jdXM6XHJcbiAqIFxyXG4gKiAxLiBDaGVjayBpZiBlbGVtZW50IGNhbiBoYXZlIGZvY3VzIGJ5IGl0c2VsZlxyXG4gKiAyLiBJZiBgY29udHJvbHNgIGlzIGRlZmluZWQsIHNldCBmb2N1cyB0aHJvdWdoIHRoYXQgb2JqZWN0XHJcbiAqIDMuIENoZWNrIGlmIGN1cnJlbnQgZWxlbWVudCBjYW4gYmUgZGVmaW5lZCB0aHJvdWdoIGFyaWEtYWN0aXZlZGVzY2VuZGFudCBvZiBjdXJyZW50IGZvY3VzZWQgZWxlbWVudFxyXG4gKiA0LiBQdXQgZm9jdXMgdGhyb3VnaCBhZGRpbmcgdGFiaW5kZXhcclxuICogXHJcbiAqIEBwYXJhbSB7Um9sZXR5cGV9IGF5IFxyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtwcmV2ZW50U2Nyb2xsPWZhbHNlXSAgcHJldmVudCBzY3JvbGxpbmcgdGhlIGVsZW1lbnQgaW50byB2aWV3XHJcbiAqIEBwYXJhbSB7Um9sZXR5cGV9IFtjb250cm9sc10gQ3VzdG9tIGVsZW1lbnQgdGhhdCBzaG91bGQgY29udHJvbCBmb2N1c1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZvY3VzKGF5LCBwcmV2ZW50U2Nyb2xsID0gZmFsc2UsIGNvbnRyb2xzID0gbnVsbCkge1xyXG4gICAgaWYgKCFwcmV2ZW50U2Nyb2xsKSBzY3JvbGxJbnRvVmlldyhheS5fbm9kZSk7XHJcblxyXG4gICAgLy8gbmF0aXZlIGZvY3VzXHJcbiAgICBpZiAoaXNGb2N1c2FibGUoYXkpKSB7XHJcbiAgICAgICAgLy8gZm9jdXMgaXMgYWxyZWFkeSBzZXQsIG5vIG5lZWQgdG8gY29udGludWVcclxuICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PSBheS5fbm9kZSkgcmV0dXJuO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGF5LnRhYkluZGV4ID0gMDtcclxuICAgICAgICBheS5fbm9kZS5mb2N1cygpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIGlmIChjb250cm9scykge1xyXG4gICAgICAgIC8vIGZvY3VzIGNvbnRyb2wgZWxlbWVudCBpZiBub3QgYWxyZWFkeSBpbiBmb2N1c1xyXG4gICAgICAgIGlmICghaGFzRm9jdXMoY29udHJvbHMpKSBjb250cm9scy5fbm9kZS5mb2N1cygpO1xyXG5cclxuICAgICAgICAvLyByZW1vdmUgZm9jdXMgY2xhc3Mgb2YgcHJldmlvdXMgb3B0aW9uXHJcbiAgICAgICAgaWYgKGNvbnRyb2xzLmFjdGl2ZURlc2NlbmRhbnQpIHtcclxuICAgICAgICAgICAgY29udHJvbHMuYWN0aXZlRGVzY2VuZGFudC5fbm9kZS5jbGFzc0xpc3QucmVtb3ZlKFwiYXktZm9jdXNcIik7XHJcbiAgICAgICAgICAgIGNvbnRyb2xzLmFjdGl2ZURlc2NlbmRhbnQgPSBheTtcclxuICAgICAgICAgICAgYXkuX25vZGUuY2xhc3NMaXN0LmFkZChcImF5LWZvY3VzXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKGF5Ll9ub2RlLmlkKSB7XHJcbiAgICAgICAgLy8gZm9jdXMgaXMgYWxyZWFkeSBzZXQsIG5vIG5lZWQgdG8gY29udGludWVcclxuICAgICAgICBpZiAoaGFzRm9jdXMoYXkpKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmIChlbGVtZW50cy5oYXMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpIHtcclxuICAgICAgICAgICAgdmFyIG1hbmFnZXNGb2N1cyA9IGVsZW1lbnRzLmdldChkb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIC8vIHJlbW92ZSBmb2N1cyBjbGFzcyBvZiBwcmV2aW91cyBvcHRpb25cclxuICAgICAgICAgICAgaWYobWFuYWdlc0ZvY3VzLmFjdGl2ZURlc2NlbmRhbnQpIHtcclxuICAgICAgICAgICAgICAgIG1hbmFnZXNGb2N1cy5hY3RpdmVEZXNjZW5kYW50Ll9ub2RlLmNsYXNzTGlzdC5yZW1vdmUoXCJheS1mb2N1c1wiKTtcclxuICAgICAgICAgICAgICAgIG1hbmFnZXNGb2N1cy5hY3RpdmVEZXNjZW5kYW50ID0gYXk7XHJcbiAgICAgICAgICAgICAgICAvLyBhZGQgZmFrZSBmb2N1c1xyXG4gICAgICAgICAgICAgICAgYXkuX25vZGUuY2xhc3NMaXN0LmFkZChcImF5LWZvY3VzXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYXkudGFiSW5kZXggPSAwO1xyXG4gICAgLy8gYXkuX25vZGUuZm9jdXMoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgdGhlIGZvY3VzIG9mIHRoZSBlbGVtZW50LlxyXG4gKiBAcGFyYW0ge1JvbGV0eXBlfSBheSBcclxuICogQHBhcmFtIHtSb2xldHlwZX0gW2NvbnRyb2xzXSBDdXN0b20gZWxlbWVudCB0aGF0IHNob3VsZCBjb250cm9sIGZvY3VzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYmx1cihheSwgY29udHJvbHMpIHtcclxuICAgIC8vIEhhcyBuYXRpdmUgZm9jdXNcclxuICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBheS5fbm9kZSkge1xyXG4gICAgICAgIGF5Ll9ub2RlLmJsdXIoKTtcclxuXHJcbiAgICAgICAgLy8gQ2FuIGhhdmUgY3VzdG9tIGZvY3VzXHJcbiAgICB9IGVsc2UgaWYgKGF5Ll9ub2RlLmlkKSB7XHJcbiAgICAgICAgdmFyIG1hbmFnZXNGb2N1cyA9IGNvbnRyb2xzIHx8IGVsZW1lbnRzLmdldChkb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcclxuICAgICAgICBpZiAobWFuYWdlc0ZvY3VzLmFjdGl2ZURlc2NlbmRhbnQgPT09IGF5KSB7XHJcbiAgICAgICAgICAgIC8vIHJlbW92ZSByZWZlcmVuY2UgdG8gZWxlbWVudFxyXG4gICAgICAgICAgICBtYW5hZ2VzRm9jdXMuYWN0aXZlRGVzY2VuZGFudCA9IG51bGw7XHJcbiAgICAgICAgICAgIC8vIHJlbW92ZSBmYWtlIGZvY3VzXHJcbiAgICAgICAgICAgIGF5Ll9ub2RlLmNsYXNzTGlzdC5yZW1vdmUoXCJheS1mb2N1c1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS53YXJuKFwiVW5hYmxlIHRvIHJlbW92ZSBmb2N1cyBmcm9tIFwiLCBheSk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbi8qKiBAYWxpYXMgbW9kdWxlOkZvY3VzICovXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHJcbiAgICAvKiogUmV0dXJucyBhMjB5IGluc3RhbmNlIG9mIGN1cnJlbnRseSBmb2N1c2VkIGVsZW1lbnQgKi9cclxuICAgIGdldCBhY3RpdmVFbGVtZW50KCkge1xyXG4gICAgICAgIGxldCBheSA9IGVsZW1lbnRzLmdldChkb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcclxuICAgICAgICBpZiAoIWF5KSByZXR1cm47XHJcbiAgICAgICAgaWYgKGF5LmFjdGl2ZURlc2NlbmRhbnQpIHJldHVybiBheS5hY3RpdmVEZXNjZW5kYW50O1xyXG5cclxuICAgICAgICByZXR1cm4gYXk7XHJcbiAgICB9LFxyXG4gICAgaGFzRm9jdXMsIGlzRm9jdXNhYmxlLCBmb2N1cywgYmx1cixcclxuICAgIHN0YXJ0LCBwcmV2LCBuZXh0LCBlbmRcclxufSIsIi8qKlxyXG4gKiBGb2xsb3dzIGh0dHBzOi8vd3d3LnczLm9yZy9UUi8yMDE3L1dELWh0bWwtYXJpYS0yMDE3MTAxMy8jZG9jY29uZm9ybWFuY2VcclxuICovXHJcblxyXG4vKipcclxuICogQWxsIGFyaWEgcm9sZXNcclxuICogQHR5cGUge0FycmF5fVxyXG4qL1xyXG5pbXBvcnQgcm9sZXMgZnJvbSBcIi4vLi4vZGF0YS9yb2xlcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyBpbmZvIHdoaWNoIGlzIHVzZWQgaW4gZnVuY3Rpb25zIG9mIHJvbGVQZXJIVE1MVGFnLFxyXG4gKiBtb3N0bHkgYSBrZXkgYXMgdGFnTmFtZSB3aXRoIGFuIGFycmF5IG9mIGFsbG93ZWQgcm9sZXMgZm9yIHRoYXQgdGFnXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqL1xyXG52YXIgYWxsb3dlZFJvbGVzID0ge1xyXG5cdFwiYVdpdGhIcmVmXCI6IFtcclxuXHRcdFwiYnV0dG9uXCIsIFwiY2hlY2tib3hcIiwgXCJtZW51aXRlbVwiLCBcIm1lbnVpdGVtY2hlY2tib3hcIiwgXCJtZW51aXRlbXJhZGlvXCIsXHJcblx0XHRcIm9wdGlvblwiLCBcInJhZGlvXCIsIFwic3dpdGNoXCIsIFwidGFiXCIsIFwidHJlZWl0ZW1cIiwgXCJkb2MtYmFja2xpbmtcIixcclxuXHRcdFwiZG9jLWJpYmxpb3JlZlwiLCBcImRvYy1nbG9zc3JlZlwiLCBcImRvYy1ub3RlcmVmXCJcclxuXHRdLFxyXG5cdFwiYXJ0aWNsZVwiOiBbXHJcblx0XHRcImZlZWRcIiwgXCJwcmVzZW50YXRpb25cIiwgXCJub25lXCIsIFwiZG9jdW1lbnRcIiwgXCJhcHBsaWNhdGlvblwiLCBcIm1haW5cIiwgXCJyZWdpb25cIlxyXG5cdF0sXHJcblx0XCJhc2lkZVwiOiBbXHJcblx0XHRcImZlZWRcIiwgXCJub3RlXCIsIFwicHJlc2VudGF0aW9uXCIsIFwibm9uZVwiLCBcInJlZ2lvblwiLCBcInNlYXJjaFwiLCBcImRvYy1leGFtcGxlXCIsXHJcblx0XHRcImRvYy1mb290bm90ZVwiLCBcImRvYy1wdWxscXVvdGVcIiwgXCJkb2MtdGlwXCJcclxuXHRdLFxyXG5cdFwiYnV0dG9uXCI6IFtcclxuXHRcdFwiY2hlY2tib3hcIiwgXCJsaW5rXCIsIFwibWVudWl0ZW1cIiwgXCJtZW51aXRlbWNoZWNrYm94XCIsIFwibWVudWl0ZW1yYWRpb1wiLFxyXG5cdFx0XCJvcHRpb25cIiwgXCJyYWRpb1wiLCBcInN3aXRjaFwiLCBcInRhYlwiXHJcblx0XSxcclxuXHRcImRsXCI6IFtcImdyb3VwXCIsIFwicHJlc2VudGF0aW9uXCIsIFwibm9uZVwiLCBcImRvYy1nbG9zc2FyeVwiXSxcclxuXHRcImVtYmVkXCI6IFsgXCJhcHBsaWNhdGlvblwiLCBcImRvY3VtZW50XCIsIFwicHJlc2VudGF0aW9uXCIsIFwibm9uZVwiLCBcImltZ1wiIF0sXHJcblx0XCJmaWdjYXB0aW9uXCI6IFsgXCJncm91cFwiLCBcInByZXNlbnRhdGlvblwiLCBcIm5vbmVcIiBdLFxyXG5cdFwiZmllbGRzZXRcIjogXHRbIFwiZ3JvdXBcIiwgXCJwcmVzZW50YXRpb25cIiwgXCJub25lXCIgXSxcclxuXHRcImZvb3RlclwiOiBbIFwiZ3JvdXBcIiwgXCJub25lXCIsIFwicHJlc2VudGF0aW9uXCIsIFwiZG9jLWZvb3Rub3RlXCIgXSxcclxuXHRcImZvcm1cIjogWyBcInNlYXJjaFwiLCBcIm5vbmVcIiwgXCJwcmVzZW50YXRpb25cIiBdLFxyXG5cdFwiaDFUb2g2XCI6IFsgXCJ0YWJcIiwgXCJub25lXCIsIFwicHJlc2VudGF0aW9uXCIsIFwiZG9jLXN1YnRpdGxlXCIgXSxcclxuXHRcImhlYWRlclwiOiBbIFwiZ3JvdXBcIiwgXCJub25lXCIsIFwicHJlc2VudGF0aW9uXCIsIFwiZG9jLWZvb3Rub3RlXCIgXSxcclxuXHRcImhyXCI6IFsgXCJwcmVzZW50YXRpb25cIiwgXCJkb2MtcGFnZWJyZWFrXCIgXSxcclxuXHRcImlmcmFtZVwiOiBbIFwiYXBwbGljYXRpb25cIiwgXCJkb2N1bWVudFwiLCBcImltZ1wiIF0sXHJcblx0XCJpbWdXaXRoRW1wdHlBbHRcIjogWyBcInByZXNlbnRhdGlvblwiLCBcIm5vbmVcIiBdLFxyXG5cdFwiaW5wdXRUeXBlQnV0dG9uXCI6IFtcclxuXHRcdFwibGluaywgbWVudWl0ZW1cIiwgXCJtZW51aXRlbWNoZWNrYm94XCIsIFwibWVudWl0ZW1yYWRpb1wiLCBcInJhZGlvXCIsIFwic3dpdGNoXCIsXHJcblx0XHRcIm9wdGlvblwiLCBcInRhYlwiXHJcblx0XSxcclxuXHRcImlucHV0VHlwZUltYWdlXCI6IFtcclxuXHRcdFwibGlua1wiLCBcIm1lbnVpdGVtXCIsIFwibWVudWl0ZW1jaGVja2JveFwiLCBcIm1lbnVpdGVtcmFkaW9cIiwgXCJyYWRpb1wiLCBcInN3aXRjaFwiXHJcblx0XSxcclxuXHRcImlucHV0VHlwZUNoZWNrYm94XCI6IFsgXCJidXR0b25cIiwgXCJtZW51aXRlbWNoZWNrYm94XCIsIFwib3B0aW9uXCIsIFwic3dpdGNoXCIgXSxcclxuXHRcImxpXCI6IFtcclxuXHRcdFwibWVudWl0ZW1cIiwgXCJtZW51aXRlbWNoZWNrYm94XCIsIFwibWVudWl0ZW1yYWRpb1wiLCBcIm9wdGlvblwiLCBcIm5vbmVcIixcclxuXHRcdFwicHJlc2VudGF0aW9uXCIsIFwicmFkaW9cIiwgXCJzZXBhcmF0b3JcIiwgXCJ0YWJcIiwgXCJ0cmVlaXRlbVwiLCBcImRvYy1iaWJsaW9lbnRyeVwiLFxyXG5cdFx0XCJkb2MtZW5kbm90ZVwiXHJcblx0XSxcclxuXHRcIm5hdlwiOiBbIFwiZG9jLWluZGV4XCIsIFwiZG9jLXBhZ2VsaXN0XCIsIFwiZG9jLXRvY1wiIF0sXHJcblx0XCJvYmplY3RcIjogWyBcImFwcGxpY2F0aW9uXCIsIFwiZG9jdW1lbnRcIiwgXCJpbWdcIiBdLFxyXG5cdFwib2xcIjogW1xyXG5cdFx0XCJkaXJlY3RvcnlcIiwgXCJncm91cFwiLCBcImxpc3Rib3hcIiwgXCJtZW51XCIsIFwibWVudWJhcixub25lXCIsIFwicHJlc2VudGF0aW9uIFwiLFxyXG5cdFx0XCJyYWRpb2dyb3VwXCIsIFwidGFibGlzdFwiLCBcInRvb2xiYXJcIiwgXCJ0cmVlXCJcclxuXHRdLFxyXG5cdFwic2VjdGlvblwiOiBbXHJcblx0XHRcImFsZXJ0XCIsIFwiYWxlcnRkaWFsb2dcIiwgXCJhcHBsaWNhdGlvblwiLCBcImJhbm5lclwiLCBcImNvbXBsZW1lbnRhcnlcIixcclxuXHRcdFwiY29udGVudGluZm9cIiwgXCJkaWFsb2dcIiwgXCJkb2N1bWVudFwiLCBcImZlZWRcIiwgXCJsb2dcIiwgXCJtYWluXCIsIFwibWFycXVlZVwiLFxyXG5cdFx0XCJuYXZpZ2F0aW9uXCIsIFwibm9uZVwiLCBcInByZXNlbnRhdGlvblwiLCBcInNlYXJjaFwiLCBcInN0YXR1c1wiLCBcInRhYnBhbmVsXCIsXHJcblx0XHRcImRvYy1hYnN0cmFjdFwiLCBcImRvYy1hY2tub3dsZWRnbWVudHNcIiwgXCJkb2MtYWZ0ZXJ3b3JkXCIsIFwiZG9jLWFwcGVuZGl4XCIsXHJcblx0XHRcImRvYy1iaWJsaW9ncmFwaHlcIiwgXCJkb2MtY2hhcHRlclwiLCBcImRvYy1jb2xvcGhvblwiLCBcImRvYy1jb25jbHVzaW9uXCIsXHJcblx0XHRcImRvYy1jcmVkaXRcIiwgXCJkb2MtY3JlZGl0c1wiLCBcImRvYy1kZWRpY2F0aW9uXCIsIFwiZG9jLWVuZG5vdGVzXCIsIFwiZG9jLWVwaWxvZ3VlXCIsXHJcblx0XHRcImRvYy1lcnJhdGFcIiwgXCJkb2MtZXhhbXBsZVwiLCBcImRvYy1mb3Jld29yZFwiLCBcImRvYy1pbmRleFwiLCBcImRvYy1pbnRyb2R1Y3Rpb25cIixcclxuXHRcdFwiZG9jLW5vdGljZVwiLCBcImRvYy1wYWdlbGlzdFwiLCBcImRvYy1wYXJ0XCIsIFwiZG9jLXByZWZhY2VcIiwgXCJkb2MtcHJvbG9ndWVcIixcclxuXHRcdFwiZG9jLXB1bGxxdW90ZVwiLCBcImRvYy1xbmFcIiwgXCJkb2MtdG9jXCJcclxuXHRdLFxyXG5cdFwic3ZnXCI6IFsgXCJhcHBsaWNhdGlvblwiLCBcImRvY3VtZW50XCIsIFwiaW1nXCIgXSxcclxuXHRcInVsXCI6IFtcclxuXHRcdFwiZGlyZWN0b3J5XCIsIFwiZ3JvdXBcIiwgXCJsaXN0Ym94XCIsIFwibWVudVwiLCBcIm1lbnViYXJcIiwgXCJyYWRpb2dyb3VwXCIsXHJcblx0XHRcInRhYmxpc3RcIiwgXCJ0b29sYmFyXCIsIFwidHJlZVwiLCBcInByZXNlbnRhdGlvblwiXHJcblx0XVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbnRhaW5zIGEgZnVuY3Rpb24gZm9yIGVhY2ggaHRtbFRhZyB3aGVyZSBub3QgYWxsIHJvbGVzIGFsbG93ZWRcclxuICogQHR5cGUge09iamVjdH1cclxuICovXHJcbnZhciByb2xlUGVySFRNTFRhZyA9IHtcclxuXHRhOiAoZWwsIHJvbGUpID0+IHtcclxuXHRcdGlmKGVsLmhyZWYpIHtcclxuXHRcdFx0cmV0dXJuIGhhc0FsbG93ZWRSb2xlKFwiYVdpdGhIcmVmXCIsIHJvbGUpID8gcm9sZSA6IFwibGlua1wiO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIHJvbGU7XHJcblx0XHR9XHJcblx0fSxcclxuXHRhcmVhOiAoZWwsIHJvbGUpID0+IHtcclxuXHRcdGlmKGVsLmhyZWYpIHJldHVybiByb2xlID8gbnVsbCA6IFwibGlua1wiO1xyXG5cdFx0cmV0dXJuIHJvbGU7XHJcblx0fSxcclxuXHRhcnRpY2xlOiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwiYXJ0aWNsZVwiLCByb2xlKSA/IHJvbGUgOiBcImFydGljbGVcIixcclxuXHRhc2lkZTogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcImFzaWRlXCIsIHJvbGUpID8gcm9sZSA6IFwiY29tcGxlbWVudGFyeVwiLFxyXG5cdGF1ZGlvOiAoZWwsIHJvbGUpID0+IHJvbGUgPT0gXCJhcHBsaWNhdGlvblwiID8gXCJhcHBsaWNhdGlvblwiIDogbnVsbCxcclxuXHRiYXNlOiAoKSA9PiBudWxsLFxyXG5cdGJvZHk6ICgpID0+IFwiZG9jdW1lbnRcIixcclxuXHRidXR0b246IChlbCwgcm9sZSkgPT4ge1xyXG5cdFx0aWYoZWwudHlwZSA9PSBcIm1lbnVcIikge1xyXG5cdFx0XHRyZXR1cm4gcm9sZSA9PSBcIm1lbnVpdGVtXCIgPyBcIm1lbnVpdGVtXCIgOiBcImJ1dHRvblwiO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGhhc0FsbG93ZWRSb2xlKFwiYnV0dG9uXCIsIHJvbGUpID8gcm9sZSA6IFwiYnV0dG9uXCI7XHJcblx0fSxcclxuXHRjYXB0aW9uOiAoKSA9PiBudWxsLFxyXG5cdGNvbDogKCkgPT4gbnVsbCxcclxuXHRjb2xncm91cDogKCkgPT4gbnVsbCxcclxuXHRkYXRhbGlzdDogKCkgPT4gXCJsaXN0Ym94XCIsXHJcblx0ZGQ6ICgpID0+IFwiZGVmaW5pdGlvblwiLFxyXG5cdGRldGFpbHM6ICgpID0+IFwiZ3JvdXBcIixcclxuXHRkaWFsb2c6IChlbCwgcm9sZSkgPT4gcm9sZSA9PSBcImFsZXJ0ZGlhbG9nXCIgPyBcImFsZXJ0ZGlhbG9nXCIgOiBcImRpYWxvZ1wiLFxyXG5cdGRsOiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwiZGxcIiwgcm9sZSkgPyByb2xlIDogXCJsaXN0XCIsXHJcblx0ZHQ6ICgpID0+IFwibGlzdGl0ZW1cIixcclxuXHRlbWJlZDogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcImVtYmVkXCIsIHJvbGUpID8gcm9sZSA6IG51bGwsXHJcblx0ZmlnY2FwdGlvbjogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcImZpZ2NhcHRpb25cIiwgcm9sZSkgPyByb2xlIDogbnVsbCxcclxuXHRmaWVsZHNldDogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcImZpZWxkc2V0XCIsIHJvbGUpPyByb2xlIDogbnVsbCxcclxuXHRmaWd1cmU6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJmaWd1cmVcIiwgcm9sZSkgPyByb2xlIDogXCJmaWd1cmVcIixcclxuXHRmb290ZXI6IChlbCwgcm9sZSkgPT4ge1xyXG5cdFx0bGV0IGhhc0ltcGxpY2l0Q29udGVudGluZm9Sb2xlID0gIWdldFBhcmVudFdpdGhUYWdOYW1lKGVsLCBbXCJBUlRJQ0xFXCIsIFwiQVNJREVcIiwgXCJNQUlOXCIsIFwiTkFWXCIsIFwiU0VDVElPTlwiXSk7XHJcblx0XHRsZXQgaGFzQWxsb3dlZFJvbGUgPSBoYXNBbGxvd2VkUm9sZShcImZvb3RlclwiLCByb2xlKTtcclxuXHRcdGlmKGhhc0FsbG93ZWRSb2xlKXtcclxuXHRcdFx0cmV0dXJuIHJvbGU7XHJcblx0XHR9IGVsc2UgaWYgKGhhc0ltcGxpY2l0Q29udGVudGluZm9Sb2xlKSB7XHJcblx0XHRcdHJldHVybiBcImNvbnRlbnRpbmZvXCI7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGZvcm06IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJmb3JtXCIsIHJvbGUpID8gcm9sZSA6IFwiZm9ybVwiLFxyXG5cdGgxOiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwiaDFUb2g2XCIsIHJvbGUpID8gcm9sZSA6IFwiaGVhZGluZ1wiLFxyXG5cdGgyOiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwiaDFUb2g2XCIsIHJvbGUpID8gcm9sZSA6IFwiaGVhZGluZ1wiLFxyXG5cdGgzOiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwiaDFUb2g2XCIsIHJvbGUpID8gcm9sZSA6IFwiaGVhZGluZ1wiLFxyXG5cdGg0OiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwiaDFUb2g2XCIsIHJvbGUpID8gcm9sZSA6IFwiaGVhZGluZ1wiLFxyXG5cdGg1OiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwiaDFUb2g2XCIsIHJvbGUpID8gcm9sZSA6IFwiaGVhZGluZ1wiLFxyXG5cdGg2OiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwiaDFUb2g2XCIsIHJvbGUpID8gcm9sZSA6IFwiaGVhZGluZ1wiLFxyXG5cdGhlYWQ6ICgpID0+IG51bGwsXHJcblx0aGVhZGVyOiAoZWwsIHJvbGUpID0+IHtcclxuXHRcdGxldCBoYXNJbXBsaWNpdEJhbm5lclJvbGUgPSAhZ2V0UGFyZW50V2l0aFRhZ05hbWUoZWwsIFtcIkFSVElDTEVcIiwgXCJBU0lERVwiLCBcIk1BSU5cIiwgXCJOQVZcIiwgXCJTRUNUSU9OXCJdKTtcclxuXHRcdGxldCBoYXNBbGxvd2VkUm9sZSA9IGhhc0FsbG93ZWRSb2xlKFwiaGVhZGVyXCIsIHJvbGUpO1xyXG5cdFx0aWYoaGFzQWxsb3dlZFJvbGUpe1xyXG5cdFx0XHRyZXR1cm4gcm9sZTtcclxuXHRcdH0gZWxzZSBpZiAoaGFzSW1wbGljaXRCYW5uZXJSb2xlKSB7XHJcblx0XHRcdHJldHVybiBcImJhbm5lclwiO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblx0fSxcclxuXHRocjogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcImhyXCIsIHJvbGUpID8gcm9sZSA6IFwic2VwZXJhdG9yXCIsXHJcblx0aHRtbDogKCkgPT4gbnVsbCxcclxuXHRpZnJhbWU6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJpZnJhbWVcIiwgcm9sZSkgPyByb2xlIDogbnVsbCxcclxuXHRpbWc6IChlbCwgcm9sZSkgPT4ge1xyXG5cdFx0dmFyIGhhc0FsbG93ZWRFbXB0eUFsdFJvbGUgPSBoYXNBbGxvd2VkUm9sZShcImltZ1dpdGhFbXB0eUFsdFwiLCByb2xlKTtcclxuXHJcblx0XHRpZihlbC5hbHQpIHtcclxuXHRcdFx0Ly8gYW55IHJvbGUgZXhlcHQgdGhlIHJvbGVzIHVzZWQgYnkgZW1wdHkgYWx0IHZhbHVlc1xyXG5cdFx0XHRyZXR1cm4gaGFzQWxsb3dlZEVtcHR5QWx0Um9sZSA/IFwiaW1nXCIgOiByb2xlO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIGhhc0FsbG93ZWRFbXB0eUFsdFJvbGUgPyByb2xlIDogbnVsbDtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGlucHV0OiAoZWwsIHJvbGUpID0+IHtcclxuXHRcdHN3aXRjaChlbC50eXBlKSB7XHJcblx0XHRcdGNhc2UgXCJidXR0b25cIjpcclxuXHRcdFx0XHRyZXR1cm4gaGFzQWxsb3dlZFJvbGUoXCJpbnB1dFR5cGVCdXR0b25cIiwgcm9sZSkgPyByb2xlIDogXCJidXR0b25cIjtcclxuXHRcdFx0Y2FzZSBcImNoZWNrYm94XCI6XHJcblx0XHRcdFx0cmV0dXJuIGhhc0FsbG93ZWRSb2xlKFwiaW5wdXRUeXBlQ2hlY2tib3hcIiwgcm9sZSkgPyByb2xlIDogXCJjaGVja2JveFwiO1xyXG5cdFx0XHRjYXNlIFwiaW1hZ2VcIjpcclxuXHRcdFx0XHRyZXR1cm4gaGFzQWxsb3dlZFJvbGUoXCJpbnB1dFR5cGVJbWFnZVwiLCByb2xlKSA/IHJvbGUgOiBcImJ1dHRvblwiO1xyXG5cdFx0XHRjYXNlIFwibnVtYmVyXCI6XHJcblx0XHRcdFx0cmV0dXJuIFwic3BpbmJ1dHRvblwiO1xyXG5cdFx0XHRjYXNlIFwicmFkaW9cIjpcclxuXHRcdFx0XHRyZXR1cm4gcm9sZSA9PSBcIm1lbnVpdGVtcmFkaW9cIiA/IFwibWVudWl0ZW1yYWRpb1wiIDogXCJyYWRpb1wiO1xyXG5cdFx0XHRjYXNlIFwicmFuZ2VcIjpcclxuXHRcdFx0XHRyZXR1cm4gXCJzbGlkZXJcIjtcclxuXHRcdFx0Y2FzZSBcInNlYXJjaFwiOlxyXG5cdFx0XHRcdHJldHVybiBlbC5saXN0ID8gXCJjb21ib2JveFwiIDogXCJzZWFyY2hib3hcIjtcclxuXHRcdFx0Y2FzZSBcInJlc2V0XCI6XHJcblx0XHRcdGNhc2UgXCJzdWJtaXRcIjpcclxuXHRcdFx0XHRyZXR1cm4gXCJidXR0b25cIjtcclxuXHRcdFx0Y2FzZSBcImVtYWlsXCI6XHJcblx0XHRcdGNhc2UgXCJ0ZWxcIjpcclxuXHRcdFx0Y2FzZSBcInRleHRcIjpcclxuXHRcdFx0Y2FzZSBcInVybFwiOlxyXG5cdFx0XHRcdHJldHVybiBlbC5saXN0ID8gXCJjb21ib2JveFwiIDogXCJ0ZXh0Ym94XCI7XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblx0fSxcclxuXHRrZXlnZW46ICgpID0+IG51bGwsXHJcblx0bGFiZWw6ICgpID0+IG51bGwsXHJcblx0bGVnZW5kOiAoKSA9PiBudWxsLFxyXG5cdGxpOiAoZWwsIHJvbGUpID0+IHtcclxuXHRcdGxldCBoYXNJbXBsaWNpdExpc3RpdGVtUm9sZSA9IGdldFBhcmVudFdpdGhUYWdOYW1lKGVsLCBbXCJPTFwiLCBcIlVMXCJdKTtcclxuXHJcblx0XHRpZihoYXNJbXBsaWNpdExpc3RpdGVtUm9sZSkge1xyXG5cdFx0XHRyZXR1cm4gaGFzQWxsb3dlZFJvbGUoXCJsaVwiLCByb2xlKSA/IHJvbGUgOiBcImxpc3RpdGVtXCI7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gcm9sZTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGxpbms6IChlbCwgcm9sZSkgPT4ge1xyXG5cdFx0aWYoZWwuaHJlZikgcmV0dXJuIHJvbGUgPyBudWxsIDogXCJsaW5rXCI7XHJcblx0XHRyZXR1cm4gcm9sZTtcclxuXHR9LFxyXG5cdG1haW46ICgpID0+IFwibWFpblwiLFxyXG5cdG1hcDogKCkgPT4gbnVsbCxcclxuXHRtYXRoOiAoKSA9PiBcIm1hdGhcIixcclxuXHRtZW51OiAoZWwsIHJvbGUpID0+IGVsLnR5cGUgPT0gXCJjb250ZXh0XCIgPyBcIm1lbnVcIiA6IHJvbGUsXHJcblx0bWVudWl0ZW06IChlbCwgcm9sZSkgPT4ge1xyXG5cdFx0c3dpdGNoIChlbC50eXBlKSB7XHJcblx0XHRcdGNhc2UgXCJjb21tYW5kXCI6XHJcblx0XHRcdFx0cmV0dXJuIFwibWVudWl0ZW1cIjtcclxuXHRcdFx0Y2FzZSBcImNoZWNrYm94XCI6XHJcblx0XHRcdFx0cmV0dXJuIFwibWVudWl0ZW1jaGVja2JveFwiO1xyXG5cdFx0XHRjYXNlIFwicmFkaW9cIjpcclxuXHRcdFx0XHRyZXR1cm4gXCJtZW51aXRlbXJhZGlvXCI7XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0cmV0dXJuIHJvbGU7XHJcblx0XHR9XHJcblx0fSxcclxuXHRtZXRhOiAoKSA9PiBudWxsLFxyXG5cdG1ldGVyOiAoKSA9PiBudWxsLFxyXG5cdG5hdjogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcIm5hdlwiLCByb2xlKSA/IHJvbGUgOiBcIm5hdmlnYXRpb25cIixcclxuXHRub3NjcmlwdDogKCkgPT4gbnVsbCxcclxuXHRvYmplY3Q6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJvYmplY3RcIiwgcm9sZSkgPyByb2xlIDogbnVsbCxcclxuXHRvbDogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcIm9sXCIsIHJvbGUpID8gcm9sZSA6IFwibGlzdFwiLFxyXG5cdG9wdGdyb3VwOiAoKSA9PiBcImdyb3VwXCIsXHJcblx0b3B0aW9uOiAoZWwpID0+IHtcclxuXHRcdGxldCB3aXRoaW5PcHRpb25MaXN0ID0gW1wic2VsZWN0XCIsIFwib3B0Z3JvdXBcIiwgXCJkYXRhbGlzdFwiXS5pbmRleE9mKGVsLnBhcmVudE5vZGUpID4gLTE7XHJcblx0XHRyZXR1cm4gd2l0aGluT3B0aW9uTGlzdCA/IFwib3B0aW9uXCIgOiBudWxsO1xyXG5cdH0sXHJcblx0b3V0cHV0OiAoZWwsIHJvbGUpID0+IHJvbGUgPyByb2xlIDogXCJzdGF0dXNcIixcclxuXHRwYXJhbTogKCkgPT4gbnVsbCxcclxuXHRwaWN0dXJlOiAoKSA9PiBudWxsLFxyXG5cdHByb2dyZXNzOiAoKSA9PiBcInByb2dyZXNzYmFyXCIsXHJcblx0c2NyaXB0OiAoKSA9PiBudWxsLFxyXG5cdHNlY3Rpb246IChlbCwgcm9sZSkgPT4ge1xyXG5cdFx0bGV0IGhhc1ZhbGlkUm9sZSA9IGhhc0FsbG93ZWRSb2xlKFwic2VjdGlvblwiLCByb2xlKTtcclxuXHRcdGlmKGhhc1ZhbGlkUm9sZSkgcmV0dXJuIHJvbGU7XHJcblxyXG5cdFx0Ly8gb25seSBpZiBhY2Nlc3NpYmxlIG5hbWVcclxuXHRcdGlmKGVsLnRpdGxlIHx8IGVsLmhhc0F0dHJpYnV0ZShcImFyaWEtbGFiZWxcIikgfHwgZWwuaGFzQXR0cmlidXRlKFwiYXJpYS1sYWJlbGxlZGJ5XCIpKXtcclxuXHRcdFx0cmV0dXJuIFwic2VjdGlvblwiO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIHJvbGU7XHJcblx0XHR9XHJcblx0fSxcclxuXHRzZWxlY3Q6IChlbCwgcm9sZSkgPT4ge1xyXG5cdFx0aWYoZWwubXVsdGlwbGUgJiYgZWwuc2l6ZSA+IDEpe1xyXG5cdFx0XHRyZXR1cm4gXCJsaXN0Ym94XCI7XHJcblx0XHR9IGVsc2UgaWYoIWVsLm11bHRpcGxlICYmIGVsLnNpemUgPD0gMSkge1xyXG5cdFx0XHRyZXR1cm4gcm9sZSA9PSBcIm1lbnVcIiA/IHJvbGUgOiBcImNvbWJvYm94XCI7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJvbGU7XHJcblx0fSxcclxuXHRzb3VyY2U6ICgpID0+IG51bGwsXHJcblx0c3R5bGU6ICgpID0+IG51bGwsXHJcblx0c3ZnOiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwic3ZnXCIsIHJvbGUpID8gcm9sZSA6IG51bGwsXHJcblx0c3VtbWFyeTogKCkgPT4gXCJidXR0b25cIixcclxuXHR0YWJsZTogKGVsLCByb2xlKSA9PiByb2xlID8gcm9sZSA6IFwidGFibGVcIixcclxuXHR0ZW1wbGF0ZTogKCkgPT4gbnVsbCxcclxuXHR0ZXh0YXJlYTogKCkgPT4gXCJ0ZXh0Ym94XCIsXHJcblx0dGhlYWQ6IChlbCwgcm9sZSkgPT4gcm9sZSA/IHJvbGUgOiBcInJvd2dyb3VwXCIsXHJcblx0dGJvZHk6IChlbCwgcm9sZSkgPT4gcm9sZSA/IHJvbGUgOiBcInJvd2dyb3VwXCIsXHJcblx0dGZvb3Q6IChlbCwgcm9sZSkgPT4gcm9sZSA/IHJvbGUgOiBcInJvd2dyb3VwXCIsXHJcblx0dGl0bGU6ICgpID0+IG51bGwsXHJcblx0dGQ6IChlbCwgcm9sZSkgPT4gZ2V0UGFyZW50V2l0aFRhZ05hbWUoZWwsIFtcIlRBQkxFXCJdKSA/IFwiY2VsbFwiIDogcm9sZSxcclxuXHR0aDogKGVsLCByb2xlKSA9PiB7XHJcblx0XHRpZihyb2xlKSByZXR1cm4gcm9sZTtcclxuXHRcdHJldHVybiBnZXRQYXJlbnRXaXRoVGFnTmFtZShlbCwgW1wiVEhFQURcIl0pID8gXCJjb2x1bW5oZWFkZXJcIiA6IFwicm93aGVhZGVyXCI7XHJcblx0fSxcclxuXHR0cjogKGVsLCByb2xlKSA9PiB7XHJcblx0XHQvLyByb2xlPXJvdywgbWF5IGJlIGV4cGxpY2l0bHkgZGVjbGFyZWQgd2hlbiBjaGlsZCBvZiBhIHRhYmxlIGVsZW1lbnQgd2l0aCByb2xlPWdyaWRcclxuXHRcdHJldHVybiByb2xlID8gcm9sZSA6IFwicm93XCI7XHJcblx0fSxcclxuXHR0cmFjazogKCkgPT4gbnVsbCxcclxuXHR1bDogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcInVsXCIsIHJvbGUpID8gcm9sZSA6IFwibGlzdFwiLFxyXG5cdHZpZGVvOiAoZWwsIHJvbGUpID0+IHJvbGUgPT0gXCJhcHBsaWNhdGlvblwiID8gXCJhcHBsaWNhdGlvblwiIDogbnVsbFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZpbmRzIG5lYXJlc3QgcGFyZW50IHdpdGggYSBzcGVjaWZpZyB0YWdOYW1lXHJcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBcdFx0ZWwgICAgICBcdFx0Y2hpbGQgLSBzdGFydGluZyBwb2ludGVyXHJcbiAqIEBwYXJhbSAge0FycmF5PFN0cmluZz59IFx0dGFnTmFtZSBcdFx0QXJyYXkgY29udGFpbmcgY2FwYXRpbGl6ZWQgdGFnbmFtZXNcclxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9ICAgICAgICAgXHRcdFx0XHRQYXJlbnQgdGhhdCBtYXRjaGVzIG9uZSBvZiB0aGUgdGFnbmFtZXNcclxuICovXHJcbmZ1bmN0aW9uIGdldFBhcmVudFdpdGhUYWdOYW1lKGVsLCB0YWdOYW1lKSB7XHJcblx0d2hpbGUgKGVsLnBhcmVudE5vZGUpe1xyXG5cdFx0aWYodGFnTmFtZS5pbmRleE9mKGVsLnRhZ05hbWUpID4gLTEpIHJldHVybiBlbDtcclxuXHRcdGVsID0gZWwucGFyZW50Tm9kZTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgZ2l2ZW4gcm9sZSBpcyBhbGxvd2VkIGZvciBnaXZlbiB0YWdcclxuICogQHBhcmFtICB7c3RyaW5nfSAgdGFnTmFtZSBrZXkgb2YgYWxsb3dlZFJvbGVzXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gIHJvbGUgICAgY3VycmVudCByb2xlXHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59ICAgICAgICAgVHJ1ZSBpZiBhbGxvd2VkXHJcbiAqL1xyXG5mdW5jdGlvbiBoYXNBbGxvd2VkUm9sZSh0YWdOYW1lLCByb2xlKSB7XHJcblx0cmV0dXJuIGFsbG93ZWRSb2xlc1t0YWdOYW1lXS5pbmRleE9mKHJvbGUpID4gLTE7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldENvbXB1dGVkUm9sZShlbCkge1xyXG5cdHZhciByb2xlID0gZWwuZ2V0QXR0cmlidXRlKFwicm9sZVwiKTtcclxuXHQvLyBjaGVjayBpZiBnaXZlbiByb2xlIGV4aXN0XHJcblx0aWYocm9sZSkgcm9sZSA9IHJvbGVzW3JvbGVdID8gcm9sZSA6IG51bGw7XHJcblxyXG5cdHZhciB0YWdOYW1lID0gZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cdC8vIGNhbGwgcG9zc2libGUgY3VzdG9tIGZ1bmN0aW9uIGlmIHRhZyBoYXMgYW55XHJcblx0aWYgKHJvbGVQZXJIVE1MVGFnW3RhZ05hbWVdKSByZXR1cm4gcm9sZVBlckhUTUxUYWdbdGFnTmFtZV0oZWwsIHJvbGUpO1xyXG5cclxuXHQvLyBkZWZhdWx0IGJlaGF2aW9yIGEuay5hLiBzZXQgcm9sZVxyXG5cdHJldHVybiByb2xlO1xyXG59IiwiaW1wb3J0IHNlbGVjdG9yIGZyb20gJy4vc2VsZWN0b3InO1xyXG5pbXBvcnQgdHJlZSBmcm9tICcuL3RyZWUnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFsbEFsbG93ZWRDaGlsZHJlbihheSwgcm9sZXMpIHtcclxuICAgIGlmKCFyb2xlcykgcm9sZXMgPSBzZWxlY3Rvci5nZXRPd25zKGF5LnJvbGUpO1xyXG4gICAgdmFyIHJlc3VsdCA9IFtdO1xyXG5cclxuICAgIHZhciBjaGlsZHJlbiA9IHRyZWUuZ2V0Q2hpbGRyZW4oYXkpO1xyXG4gICAgY2hpbGRyZW4uZmlsdGVyKGNoaWxkID0+IHtcclxuICAgICAgICByZXR1cm4gcm9sZXMuZm9yRWFjaChhbGxvd2VkUm9sZSA9PiB7XHJcbiAgICAgICAgICAgIGlmKGFsbG93ZWRSb2xlID09PSBjaGlsZC5yb2xlKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjaGlsZCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhbGxvd2VkUm9sZSkgJiYgYWxsb3dlZFJvbGVbMF0gPT09IGNoaWxkLnJvbGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoaWxkLl9ub2RlLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENoaWxkKGF5LCByb2xlKSB7XHJcblxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0KGF5LCBzZWxlY3Rvcikge1xyXG4gICAgdmFyIGNoaWxkcmVuID0gdHJlZS5nZXRDaGlsZHJlbihheSk7XHJcblxyXG4gICAgcmV0dXJuIGNoaWxkcmVuLmZpbmQoY2hpbGQgPT4gY2hpbGQuX25vZGUubWF0Y2hlcyhzZWxlY3RvcikpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IGdldEFsbEFsbG93ZWRDaGlsZHJlbiwgZ2V0fTsiLCJpbXBvcnQgcm9sZXMgZnJvbSBcIi4vLi4vZGF0YS9yb2xlc1wiO1xuXG4vKipcbiAqIFJldHVybnMgYW4gY3NzIHNlbGVjdG9yIGZvciBhIGdpdmVuIHJvbGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgUm9sZSBuYW1lXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Um9sZShrZXkpIHtcblx0aWYgKCFyb2xlc1trZXldKSByZXR1cm47XG5cblx0cmV0dXJuIFwiW3JvbGU9J1wiICsga2V5ICsgXCInXVwiO1xufVxuXG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgd2l0aCBhbGwgY3NzIHNlbGVjdG9ycywgaW1wbGljaXQgYW5kIGV4cGxpY2l0LCBmb3IgYSBnaXZlbiByb2xlXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5IFJvbGUgbmFtZVxuICogQHJldHVybnMgez9BcnJheX07XG4gKi9cbmZ1bmN0aW9uIGdldFNlbGVjdG9yQXJyYXkoa2V5KSB7XG5cdGlmICghcm9sZXNba2V5XSkgcmV0dXJuO1xuXG5cdGxldCBzZWxlY3RvciA9IFtdO1xuXHRzZWxlY3Rvci5wdXNoKGdldFJvbGUoa2V5KSk7XG5cdGlmIChyb2xlc1trZXldLmltcGxpY2l0KSBzZWxlY3RvciA9IHNlbGVjdG9yLmNvbmNhdChyb2xlc1trZXldLmltcGxpY2l0KTtcblx0cmV0dXJuIHNlbGVjdG9yO1xufVxuXG4vKipcbiAqIFJldHVybnMgYW4gY29tcGxldGUgY3NzIHNlbGVjdG9yIHdpdGggaW1wbGljdCBlbGVtZW50cyBmb3IgYSBnaXZlbiByb2xlXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5IFJvbGUgbmFtZVxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldChrZXkpIHtcblx0cmV0dXJuIGdldFNlbGVjdG9yQXJyYXkoa2V5KS5qb2luKFwiLCBcIik7XG59XG5cbmZ1bmN0aW9uIGdldERlZXBSb2xlQXJyYXkoa2V5KSB7XG5cdGlmICghcm9sZXNba2V5XSkgcmV0dXJuO1xuXG5cdGxldCBzZWxlY3RvciA9IFtdO1xuXHRzZWxlY3Rvci5wdXNoKGdldFJvbGUoa2V5KSk7XG5cblx0aWYgKHJvbGVzW2tleV0uc3ViKSB7XG5cdFx0cm9sZXNba2V5XS5zdWIuZm9yRWFjaCh2YWwgPT4gc2VsZWN0b3IucHVzaChnZXRSb2xlKHZhbCkpKTtcblx0fVxuXG5cdHJldHVybiBzZWxlY3Rvcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZXBSb2xlKGtleSkge1xuXHRyZXR1cm4gZ2V0RGVlcFJvbGVBcnJheShrZXkpLmpvaW4oXCIsIFwiKTtcbn1cblxuZnVuY3Rpb24gZ2V0RGVlcFNlbGVjdG9yQXJyYXkoa2V5KSB7XG5cdGlmICghcm9sZXNba2V5XSkgcmV0dXJuO1xuXG5cdGxldCBzZWxlY3RvciA9IFtdO1xuXHRzZWxlY3RvciA9IHNlbGVjdG9yLmNvbmNhdChnZXRTZWxlY3RvckFycmF5KGtleSkpO1xuXG5cdGlmIChyb2xlc1trZXldLnN1Yikge1xuXHRcdHJvbGVzW2tleV0uc3ViLmZvckVhY2godmFsID0+IHNlbGVjdG9yID0gc2VsZWN0b3IuY29uY2F0KGdldFNlbGVjdG9yQXJyYXkodmFsKSkpO1xuXHR9XG5cblx0cmV0dXJuIHNlbGVjdG9yO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVlcChrZXkpIHtcblx0cmV0dXJuIGdldERlZXBTZWxlY3RvckFycmF5KGtleSkuam9pbihcIiwgXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0T3ducyhrZXkpIHtcblx0cmV0dXJuIHJvbGVzW2tleV0ub3ducztcbn1cblxuZnVuY3Rpb24gZ2V0Q2hpbGRyZW4oa2V5KSB7XG5cdGxldCBvd25zID0gcm9sZXNba2V5XS5vd25zO1xuXHRcblx0Ly8gY2hlY2sgaWYgZWxlbWVudCBvd25zIGFueSBjaGlsZHJlblxuXHRpZihvd25zKSB7XG5cdFx0Ly8gc3RyaXAga2V5cywgZnJvbSB7IGFueTogW2EsIGJdLCBhbGw6IFtjLCBkXX0gdG8gW2EsIGIsIGMsIGRdXG5cdFx0Ly8gdmFyIGFsbG93ZWRSb2xlcyA9IFtdLmNvbmNhdCguLi5PYmplY3QudmFsdWVzKG93bnMpKTtcblx0XHR2YXIgcmVzdWx0ID0gW107XG5cblx0XHQvLyBnZXQgYWxsIG93bmVkIGVsZW1lbnRzIG9mIHRoZSBjaGlsZHJlblxuXHRcdG93bnMuZm9yRWFjaCgocm9sZSwgaSkgPT4ge1xuXHRcdFx0dmFyIGNoaWxkUm9sZXMgPSBnZXRDaGlsZHJlbihyb2xlKTtcblx0XHRcdGlmKGNoaWxkUm9sZXMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHQvLyBhZGQgY2hpbGQgcm9sZXNcblx0XHRcdFx0cmVzdWx0ID0gcmVzdWx0LmNvbmNhdChjaGlsZFJvbGVzKTtcblxuXHRcdFx0XHQvL3JlbW92ZSBwYXJlbnQgcm9sZVxuXHRcdFx0XHRvd25zLnNwbGljZShpLCAxKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdG93bnMgPSBvd25zLmNvbmNhdChyZXN1bHQpO1xuXHRcdHJldHVybiBvd25zO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBbXTtcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVlcE93bnMoa2V5KSB7XG5cdGxldCBvd25zID0gcm9sZXNba2V5XS5vd25zO1xuXHRpZighb3ducykgcmV0dXJuO1xuXG5cdHJldHVybiBnZXRDaGlsZHJlbihrZXkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7IGdldFJvbGUsIGdldCwgZ2V0RGVlcFJvbGUsIGdldERlZXAsIGdldE93bnMsIGdldERlZXBPd25zIH07IiwiaW1wb3J0IGVsZW1lbnRzIGZyb20gJy4vZWxlbWVudHMnO1xyXG5pbXBvcnQgY3JlYXRlIGZyb20gJy4vY3JlYXRlJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDaGlsZHJlbihheSkge1xyXG4gICAgbGV0IG93bnNDaGlsZHJlbiA9IGF5Lm93bnMgfHwgW107XHJcbiAgICBsZXQgZG9tQ2hpbGRyZW4gPSBBcnJheS5mcm9tKGF5Ll9ub2RlLmNoaWxkcmVuKS5tYXAoY2hpbGQgPT4ge1xyXG4gICAgICAgIGlmICghZWxlbWVudHMuaGFzKGNoaWxkKSkgY3JlYXRlLm9uZShjaGlsZCk7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRzLmdldChjaGlsZClcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGFsbCBkb20gY2hpbGRyZW5cclxuICAgIGxldCBjaGlsZHJlbiA9IFsuLi5vd25zQ2hpbGRyZW4sIC4uLmRvbUNoaWxkcmVuXTtcclxuXHJcbiAgICAvLyBzdHJpcCBvdXQgaWdub3JlZCBkb20gYW5kIHJlcGxhY2UgdGhlbSB3aXRoIHRoZXJlIGNoaWxkcmVuXHJcbiAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZCwgaSkgPT4ge1xyXG4gICAgICAgIGlmIChjaGlsZC5yb2xlID09IFwicHJlc2VudGF0aW9uXCIgfHwgY2hpbGQucm9sZSA9PSBcIm5vbmVcIikge1xyXG4gICAgICAgICAgICBjaGlsZHJlbiA9IGNoaWxkcmVuLnNsaWNlKDAsIGkpLmNvbmNhdChnZXRDaGlsZHJlbihjaGlsZCksIGNoaWxkcmVuLnNsaWNlKGkgKyAxKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGNoaWxkcmVuO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFyZW50KGF5KSB7XHJcbiAgICBsZXQgcGFyZW50O1xyXG4gICAgaWYoYXkuX25vZGUuaWQpe1xyXG4gICAgICAgIGxldCBvd25lZEJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIlthcmlhLW93bnMqPSdcIiArIGF5Ll9ub2RlLmlkICsgXCInXVwiKTtcclxuICAgICAgICBpZiAob3duZWRCeSkge1xyXG4gICAgICAgICAgICBwYXJlbnQgPSBvd25lZEJ5O1xyXG4gICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcGFyZW50ID0gcGFyZW50IHx8IGF5Ll9ub2RlLnBhcmVudE5vZGU7XHJcblxyXG4gICAgLy8gY3JlYXRlIGEyMHkgaW5zdGFuY2UgaWYgbm90IGV4aXN0aW5nXHJcbiAgICBpZiAoIWVsZW1lbnRzLmhhcyhwYXJlbnQpKSBjcmVhdGUub25lKHBhcmVudCk7XHJcblxyXG4gICAgbGV0IHBhcmVudEEyMFkgPSBlbGVtZW50cy5nZXQocGFyZW50KTtcclxuICAgIGlmKHBhcmVudEEyMFkucm9sZSA9PT0gXCJub25lXCIgfHwgcGFyZW50QTIwWS5yb2xlID09PSBcInByZXNlbnRhdGlvblwiKSB7XHJcbiAgICAgICAgcmV0dXJuIGdldFBhcmVudChwYXJlbnRBMjBZKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcGFyZW50QTIwWTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBnZXRDaGlsZHJlbiwgZ2V0UGFyZW50IH07Il19
