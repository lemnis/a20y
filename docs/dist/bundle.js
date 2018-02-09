(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
												value._node.id = "id-" + Date.now();
												value.generated_id = true;
												console.log(value, value.generated_id);
								}

								aom._node.setAttribute(attribute, value._node.id);
				}

				aom._values[attribute] = value;
				return value;
}
function getAccessibleNode(aom, attribute) {
				var value = aom._values[attribute] || aom._node.getAttribute(attribute);
				if (value == undefined) return null;
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
        value: function addEventListener(type, callback) {
            if (!this._listeners.has(type)) {
                this._listeners.set(type, []);
            }
            this._listeners.get(type).push(callback);
        }
    }, {
        key: "removeEventListener",
        value: function removeEventListener(type, callback) {
            if (!this._listeners.has(type)) {
                return;
            }
            var stack = this._listeners.get(type);
            stack.forEach(function (listener, i) {
                if (listener === callback) {
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
            // this._node.dispatchEvent(event);
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

  aom._values[attributeName] = typeof status != "undefined" ? status.toString() : status;
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
/*global define:false */
/**
 * Copyright 2012-2017 Craig Campbell
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Mousetrap is a simple keyboard shortcut library for Javascript with
 * no external dependencies
 *
 * @version 1.6.1
 * @url craig.is/killing/mice
 */
(function(window, document, undefined) {

    // Check if mousetrap is used inside browser, if not, return
    if (!window) {
        return;
    }

    /**
     * mapping of special keycodes to their corresponding keys
     *
     * everything in this dictionary cannot use keypress events
     * so it has to be here to map to the correct keycodes for
     * keyup/keydown events
     *
     * @type {Object}
     */
    var _MAP = {
        8: 'backspace',
        9: 'tab',
        13: 'enter',
        16: 'shift',
        17: 'ctrl',
        18: 'alt',
        20: 'capslock',
        27: 'esc',
        32: 'space',
        33: 'pageup',
        34: 'pagedown',
        35: 'end',
        36: 'home',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        45: 'ins',
        46: 'del',
        91: 'meta',
        93: 'meta',
        224: 'meta'
    };

    /**
     * mapping for special characters so they can support
     *
     * this dictionary is only used incase you want to bind a
     * keyup or keydown event to one of these keys
     *
     * @type {Object}
     */
    var _KEYCODE_MAP = {
        106: '*',
        107: '+',
        109: '-',
        110: '.',
        111 : '/',
        186: ';',
        187: '=',
        188: ',',
        189: '-',
        190: '.',
        191: '/',
        192: '`',
        219: '[',
        220: '\\',
        221: ']',
        222: '\''
    };

    /**
     * this is a mapping of keys that require shift on a US keypad
     * back to the non shift equivelents
     *
     * this is so you can use keyup events with these keys
     *
     * note that this will only work reliably on US keyboards
     *
     * @type {Object}
     */
    var _SHIFT_MAP = {
        '~': '`',
        '!': '1',
        '@': '2',
        '#': '3',
        '$': '4',
        '%': '5',
        '^': '6',
        '&': '7',
        '*': '8',
        '(': '9',
        ')': '0',
        '_': '-',
        '+': '=',
        ':': ';',
        '\"': '\'',
        '<': ',',
        '>': '.',
        '?': '/',
        '|': '\\'
    };

    /**
     * this is a list of special strings you can use to map
     * to modifier keys when you specify your keyboard shortcuts
     *
     * @type {Object}
     */
    var _SPECIAL_ALIASES = {
        'option': 'alt',
        'command': 'meta',
        'return': 'enter',
        'escape': 'esc',
        'plus': '+',
        'mod': /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'meta' : 'ctrl'
    };

    /**
     * variable to store the flipped version of _MAP from above
     * needed to check if we should use keypress or not when no action
     * is specified
     *
     * @type {Object|undefined}
     */
    var _REVERSE_MAP;

    /**
     * loop through the f keys, f1 to f19 and add them to the map
     * programatically
     */
    for (var i = 1; i < 20; ++i) {
        _MAP[111 + i] = 'f' + i;
    }

    /**
     * loop through to map numbers on the numeric keypad
     */
    for (i = 0; i <= 9; ++i) {

        // This needs to use a string cause otherwise since 0 is falsey
        // mousetrap will never fire for numpad 0 pressed as part of a keydown
        // event.
        //
        // @see https://github.com/ccampbell/mousetrap/pull/258
        _MAP[i + 96] = i.toString();
    }

    /**
     * cross browser add event method
     *
     * @param {Element|HTMLDocument} object
     * @param {string} type
     * @param {Function} callback
     * @returns void
     */
    function _addEvent(object, type, callback) {
        if (object.addEventListener) {
            object.addEventListener(type, callback, false);
            return;
        }

        object.attachEvent('on' + type, callback);
    }

    /**
     * takes the event and returns the key character
     *
     * @param {Event} e
     * @return {string}
     */
    function _characterFromEvent(e) {

        // for keypress events we should return the character as is
        if (e.type == 'keypress') {
            var character = String.fromCharCode(e.which);

            // if the shift key is not pressed then it is safe to assume
            // that we want the character to be lowercase.  this means if
            // you accidentally have caps lock on then your key bindings
            // will continue to work
            //
            // the only side effect that might not be desired is if you
            // bind something like 'A' cause you want to trigger an
            // event when capital A is pressed caps lock will no longer
            // trigger the event.  shift+a will though.
            if (!e.shiftKey) {
                character = character.toLowerCase();
            }

            return character;
        }

        // for non keypress events the special maps are needed
        if (_MAP[e.which]) {
            return _MAP[e.which];
        }

        if (_KEYCODE_MAP[e.which]) {
            return _KEYCODE_MAP[e.which];
        }

        // if it is not in the special map

        // with keydown and keyup events the character seems to always
        // come in as an uppercase character whether you are pressing shift
        // or not.  we should make sure it is always lowercase for comparisons
        return String.fromCharCode(e.which).toLowerCase();
    }

    /**
     * checks if two arrays are equal
     *
     * @param {Array} modifiers1
     * @param {Array} modifiers2
     * @returns {boolean}
     */
    function _modifiersMatch(modifiers1, modifiers2) {
        return modifiers1.sort().join(',') === modifiers2.sort().join(',');
    }

    /**
     * takes a key event and figures out what the modifiers are
     *
     * @param {Event} e
     * @returns {Array}
     */
    function _eventModifiers(e) {
        var modifiers = [];

        if (e.shiftKey) {
            modifiers.push('shift');
        }

        if (e.altKey) {
            modifiers.push('alt');
        }

        if (e.ctrlKey) {
            modifiers.push('ctrl');
        }

        if (e.metaKey) {
            modifiers.push('meta');
        }

        return modifiers;
    }

    /**
     * prevents default for this event
     *
     * @param {Event} e
     * @returns void
     */
    function _preventDefault(e) {
        if (e.preventDefault) {
            e.preventDefault();
            return;
        }

        e.returnValue = false;
    }

    /**
     * stops propogation for this event
     *
     * @param {Event} e
     * @returns void
     */
    function _stopPropagation(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
            return;
        }

        e.cancelBubble = true;
    }

    /**
     * determines if the keycode specified is a modifier key or not
     *
     * @param {string} key
     * @returns {boolean}
     */
    function _isModifier(key) {
        return key == 'shift' || key == 'ctrl' || key == 'alt' || key == 'meta';
    }

    /**
     * reverses the map lookup so that we can look for specific keys
     * to see what can and can't use keypress
     *
     * @return {Object}
     */
    function _getReverseMap() {
        if (!_REVERSE_MAP) {
            _REVERSE_MAP = {};
            for (var key in _MAP) {

                // pull out the numeric keypad from here cause keypress should
                // be able to detect the keys from the character
                if (key > 95 && key < 112) {
                    continue;
                }

                if (_MAP.hasOwnProperty(key)) {
                    _REVERSE_MAP[_MAP[key]] = key;
                }
            }
        }
        return _REVERSE_MAP;
    }

    /**
     * picks the best action based on the key combination
     *
     * @param {string} key - character for key
     * @param {Array} modifiers
     * @param {string=} action passed in
     */
    function _pickBestAction(key, modifiers, action) {

        // if no action was picked in we should try to pick the one
        // that we think would work best for this key
        if (!action) {
            action = _getReverseMap()[key] ? 'keydown' : 'keypress';
        }

        // modifier keys don't work as expected with keypress,
        // switch to keydown
        if (action == 'keypress' && modifiers.length) {
            action = 'keydown';
        }

        return action;
    }

    /**
     * Converts from a string key combination to an array
     *
     * @param  {string} combination like "command+shift+l"
     * @return {Array}
     */
    function _keysFromString(combination) {
        if (combination === '+') {
            return ['+'];
        }

        combination = combination.replace(/\+{2}/g, '+plus');
        return combination.split('+');
    }

    /**
     * Gets info for a specific key combination
     *
     * @param  {string} combination key combination ("command+s" or "a" or "*")
     * @param  {string=} action
     * @returns {Object}
     */
    function _getKeyInfo(combination, action) {
        var keys;
        var key;
        var i;
        var modifiers = [];

        // take the keys from this pattern and figure out what the actual
        // pattern is all about
        keys = _keysFromString(combination);

        for (i = 0; i < keys.length; ++i) {
            key = keys[i];

            // normalize key names
            if (_SPECIAL_ALIASES[key]) {
                key = _SPECIAL_ALIASES[key];
            }

            // if this is not a keypress event then we should
            // be smart about using shift keys
            // this will only work for US keyboards however
            if (action && action != 'keypress' && _SHIFT_MAP[key]) {
                key = _SHIFT_MAP[key];
                modifiers.push('shift');
            }

            // if this key is a modifier then add it to the list of modifiers
            if (_isModifier(key)) {
                modifiers.push(key);
            }
        }

        // depending on what the key combination is
        // we will try to pick the best event for it
        action = _pickBestAction(key, modifiers, action);

        return {
            key: key,
            modifiers: modifiers,
            action: action
        };
    }

    function _belongsTo(element, ancestor) {
        if (element === null || element === document) {
            return false;
        }

        if (element === ancestor) {
            return true;
        }

        return _belongsTo(element.parentNode, ancestor);
    }

    function Mousetrap(targetElement) {
        var self = this;

        targetElement = targetElement || document;

        if (!(self instanceof Mousetrap)) {
            return new Mousetrap(targetElement);
        }

        /**
         * element to attach key events to
         *
         * @type {Element}
         */
        self.target = targetElement;

        /**
         * a list of all the callbacks setup via Mousetrap.bind()
         *
         * @type {Object}
         */
        self._callbacks = {};

        /**
         * direct map of string combinations to callbacks used for trigger()
         *
         * @type {Object}
         */
        self._directMap = {};

        /**
         * keeps track of what level each sequence is at since multiple
         * sequences can start out with the same sequence
         *
         * @type {Object}
         */
        var _sequenceLevels = {};

        /**
         * variable to store the setTimeout call
         *
         * @type {null|number}
         */
        var _resetTimer;

        /**
         * temporary state where we will ignore the next keyup
         *
         * @type {boolean|string}
         */
        var _ignoreNextKeyup = false;

        /**
         * temporary state where we will ignore the next keypress
         *
         * @type {boolean}
         */
        var _ignoreNextKeypress = false;

        /**
         * are we currently inside of a sequence?
         * type of action ("keyup" or "keydown" or "keypress") or false
         *
         * @type {boolean|string}
         */
        var _nextExpectedAction = false;

        /**
         * resets all sequence counters except for the ones passed in
         *
         * @param {Object} doNotReset
         * @returns void
         */
        function _resetSequences(doNotReset) {
            doNotReset = doNotReset || {};

            var activeSequences = false,
                key;

            for (key in _sequenceLevels) {
                if (doNotReset[key]) {
                    activeSequences = true;
                    continue;
                }
                _sequenceLevels[key] = 0;
            }

            if (!activeSequences) {
                _nextExpectedAction = false;
            }
        }

        /**
         * finds all callbacks that match based on the keycode, modifiers,
         * and action
         *
         * @param {string} character
         * @param {Array} modifiers
         * @param {Event|Object} e
         * @param {string=} sequenceName - name of the sequence we are looking for
         * @param {string=} combination
         * @param {number=} level
         * @returns {Array}
         */
        function _getMatches(character, modifiers, e, sequenceName, combination, level) {
            var i;
            var callback;
            var matches = [];
            var action = e.type;

            // if there are no events related to this keycode
            if (!self._callbacks[character]) {
                return [];
            }

            // if a modifier key is coming up on its own we should allow it
            if (action == 'keyup' && _isModifier(character)) {
                modifiers = [character];
            }

            // loop through all callbacks for the key that was pressed
            // and see if any of them match
            for (i = 0; i < self._callbacks[character].length; ++i) {
                callback = self._callbacks[character][i];

                // if a sequence name is not specified, but this is a sequence at
                // the wrong level then move onto the next match
                if (!sequenceName && callback.seq && _sequenceLevels[callback.seq] != callback.level) {
                    continue;
                }

                // if the action we are looking for doesn't match the action we got
                // then we should keep going
                if (action != callback.action) {
                    continue;
                }

                // if this is a keypress event and the meta key and control key
                // are not pressed that means that we need to only look at the
                // character, otherwise check the modifiers as well
                //
                // chrome will not fire a keypress if meta or control is down
                // safari will fire a keypress if meta or meta+shift is down
                // firefox will fire a keypress if meta or control is down
                if ((action == 'keypress' && !e.metaKey && !e.ctrlKey) || _modifiersMatch(modifiers, callback.modifiers)) {

                    // when you bind a combination or sequence a second time it
                    // should overwrite the first one.  if a sequenceName or
                    // combination is specified in this call it does just that
                    //
                    // @todo make deleting its own method?
                    var deleteCombo = !sequenceName && callback.combo == combination;
                    var deleteSequence = sequenceName && callback.seq == sequenceName && callback.level == level;
                    if (deleteCombo || deleteSequence) {
                        self._callbacks[character].splice(i, 1);
                    }

                    matches.push(callback);
                }
            }

            return matches;
        }

        /**
         * actually calls the callback function
         *
         * if your callback function returns false this will use the jquery
         * convention - prevent default and stop propogation on the event
         *
         * @param {Function} callback
         * @param {Event} e
         * @returns void
         */
        function _fireCallback(callback, e, combo, sequence) {

            // if this event should not happen stop here
            if (self.stopCallback(e, e.target || e.srcElement, combo, sequence)) {
                return;
            }

            if (callback(e, combo) === false) {
                _preventDefault(e);
                _stopPropagation(e);
            }
        }

        /**
         * handles a character key event
         *
         * @param {string} character
         * @param {Array} modifiers
         * @param {Event} e
         * @returns void
         */
        self._handleKey = function(character, modifiers, e) {
            var callbacks = _getMatches(character, modifiers, e);
            var i;
            var doNotReset = {};
            var maxLevel = 0;
            var processedSequenceCallback = false;

            // Calculate the maxLevel for sequences so we can only execute the longest callback sequence
            for (i = 0; i < callbacks.length; ++i) {
                if (callbacks[i].seq) {
                    maxLevel = Math.max(maxLevel, callbacks[i].level);
                }
            }

            // loop through matching callbacks for this key event
            for (i = 0; i < callbacks.length; ++i) {

                // fire for all sequence callbacks
                // this is because if for example you have multiple sequences
                // bound such as "g i" and "g t" they both need to fire the
                // callback for matching g cause otherwise you can only ever
                // match the first one
                if (callbacks[i].seq) {

                    // only fire callbacks for the maxLevel to prevent
                    // subsequences from also firing
                    //
                    // for example 'a option b' should not cause 'option b' to fire
                    // even though 'option b' is part of the other sequence
                    //
                    // any sequences that do not match here will be discarded
                    // below by the _resetSequences call
                    if (callbacks[i].level != maxLevel) {
                        continue;
                    }

                    processedSequenceCallback = true;

                    // keep a list of which sequences were matches for later
                    doNotReset[callbacks[i].seq] = 1;
                    _fireCallback(callbacks[i].callback, e, callbacks[i].combo, callbacks[i].seq);
                    continue;
                }

                // if there were no sequence matches but we are still here
                // that means this is a regular match so we should fire that
                if (!processedSequenceCallback) {
                    _fireCallback(callbacks[i].callback, e, callbacks[i].combo);
                }
            }

            // if the key you pressed matches the type of sequence without
            // being a modifier (ie "keyup" or "keypress") then we should
            // reset all sequences that were not matched by this event
            //
            // this is so, for example, if you have the sequence "h a t" and you
            // type "h e a r t" it does not match.  in this case the "e" will
            // cause the sequence to reset
            //
            // modifier keys are ignored because you can have a sequence
            // that contains modifiers such as "enter ctrl+space" and in most
            // cases the modifier key will be pressed before the next key
            //
            // also if you have a sequence such as "ctrl+b a" then pressing the
            // "b" key will trigger a "keypress" and a "keydown"
            //
            // the "keydown" is expected when there is a modifier, but the
            // "keypress" ends up matching the _nextExpectedAction since it occurs
            // after and that causes the sequence to reset
            //
            // we ignore keypresses in a sequence that directly follow a keydown
            // for the same character
            var ignoreThisKeypress = e.type == 'keypress' && _ignoreNextKeypress;
            if (e.type == _nextExpectedAction && !_isModifier(character) && !ignoreThisKeypress) {
                _resetSequences(doNotReset);
            }

            _ignoreNextKeypress = processedSequenceCallback && e.type == 'keydown';
        };

        /**
         * handles a keydown event
         *
         * @param {Event} e
         * @returns void
         */
        function _handleKeyEvent(e) {

            // normalize e.which for key events
            // @see http://stackoverflow.com/questions/4285627/javascript-keycode-vs-charcode-utter-confusion
            if (typeof e.which !== 'number') {
                e.which = e.keyCode;
            }

            var character = _characterFromEvent(e);

            // no character found then stop
            if (!character) {
                return;
            }

            // need to use === for the character check because the character can be 0
            if (e.type == 'keyup' && _ignoreNextKeyup === character) {
                _ignoreNextKeyup = false;
                return;
            }

            self.handleKey(character, _eventModifiers(e), e);
        }

        /**
         * called to set a 1 second timeout on the specified sequence
         *
         * this is so after each key press in the sequence you have 1 second
         * to press the next key before you have to start over
         *
         * @returns void
         */
        function _resetSequenceTimer() {
            clearTimeout(_resetTimer);
            _resetTimer = setTimeout(_resetSequences, 1000);
        }

        /**
         * binds a key sequence to an event
         *
         * @param {string} combo - combo specified in bind call
         * @param {Array} keys
         * @param {Function} callback
         * @param {string=} action
         * @returns void
         */
        function _bindSequence(combo, keys, callback, action) {

            // start off by adding a sequence level record for this combination
            // and setting the level to 0
            _sequenceLevels[combo] = 0;

            /**
             * callback to increase the sequence level for this sequence and reset
             * all other sequences that were active
             *
             * @param {string} nextAction
             * @returns {Function}
             */
            function _increaseSequence(nextAction) {
                return function() {
                    _nextExpectedAction = nextAction;
                    ++_sequenceLevels[combo];
                    _resetSequenceTimer();
                };
            }

            /**
             * wraps the specified callback inside of another function in order
             * to reset all sequence counters as soon as this sequence is done
             *
             * @param {Event} e
             * @returns void
             */
            function _callbackAndReset(e) {
                _fireCallback(callback, e, combo);

                // we should ignore the next key up if the action is key down
                // or keypress.  this is so if you finish a sequence and
                // release the key the final key will not trigger a keyup
                if (action !== 'keyup') {
                    _ignoreNextKeyup = _characterFromEvent(e);
                }

                // weird race condition if a sequence ends with the key
                // another sequence begins with
                setTimeout(_resetSequences, 10);
            }

            // loop through keys one at a time and bind the appropriate callback
            // function.  for any key leading up to the final one it should
            // increase the sequence. after the final, it should reset all sequences
            //
            // if an action is specified in the original bind call then that will
            // be used throughout.  otherwise we will pass the action that the
            // next key in the sequence should match.  this allows a sequence
            // to mix and match keypress and keydown events depending on which
            // ones are better suited to the key provided
            for (var i = 0; i < keys.length; ++i) {
                var isFinal = i + 1 === keys.length;
                var wrappedCallback = isFinal ? _callbackAndReset : _increaseSequence(action || _getKeyInfo(keys[i + 1]).action);
                _bindSingle(keys[i], wrappedCallback, action, combo, i);
            }
        }

        /**
         * binds a single keyboard combination
         *
         * @param {string} combination
         * @param {Function} callback
         * @param {string=} action
         * @param {string=} sequenceName - name of sequence if part of sequence
         * @param {number=} level - what part of the sequence the command is
         * @returns void
         */
        function _bindSingle(combination, callback, action, sequenceName, level) {

            // store a direct mapped reference for use with Mousetrap.trigger
            self._directMap[combination + ':' + action] = callback;

            // make sure multiple spaces in a row become a single space
            combination = combination.replace(/\s+/g, ' ');

            var sequence = combination.split(' ');
            var info;

            // if this pattern is a sequence of keys then run through this method
            // to reprocess each pattern one key at a time
            if (sequence.length > 1) {
                _bindSequence(combination, sequence, callback, action);
                return;
            }

            info = _getKeyInfo(combination, action);

            // make sure to initialize array if this is the first time
            // a callback is added for this key
            self._callbacks[info.key] = self._callbacks[info.key] || [];

            // remove an existing match if there is one
            _getMatches(info.key, info.modifiers, {type: info.action}, sequenceName, combination, level);

            // add this call back to the array
            // if it is a sequence put it at the beginning
            // if not put it at the end
            //
            // this is important because the way these are processed expects
            // the sequence ones to come first
            self._callbacks[info.key][sequenceName ? 'unshift' : 'push']({
                callback: callback,
                modifiers: info.modifiers,
                action: info.action,
                seq: sequenceName,
                level: level,
                combo: combination
            });
        }

        /**
         * binds multiple combinations to the same callback
         *
         * @param {Array} combinations
         * @param {Function} callback
         * @param {string|undefined} action
         * @returns void
         */
        self._bindMultiple = function(combinations, callback, action) {
            for (var i = 0; i < combinations.length; ++i) {
                _bindSingle(combinations[i], callback, action);
            }
        };

        // start!
        _addEvent(targetElement, 'keypress', _handleKeyEvent);
        _addEvent(targetElement, 'keydown', _handleKeyEvent);
        _addEvent(targetElement, 'keyup', _handleKeyEvent);
    }

    /**
     * binds an event to mousetrap
     *
     * can be a single key, a combination of keys separated with +,
     * an array of keys, or a sequence of keys separated by spaces
     *
     * be sure to list the modifier keys first to make sure that the
     * correct key ends up getting bound (the last key in the pattern)
     *
     * @param {string|Array} keys
     * @param {Function} callback
     * @param {string=} action - 'keypress', 'keydown', or 'keyup'
     * @returns void
     */
    Mousetrap.prototype.bind = function(keys, callback, action) {
        var self = this;
        keys = keys instanceof Array ? keys : [keys];
        self._bindMultiple.call(self, keys, callback, action);
        return self;
    };

    /**
     * unbinds an event to mousetrap
     *
     * the unbinding sets the callback function of the specified key combo
     * to an empty function and deletes the corresponding key in the
     * _directMap dict.
     *
     * TODO: actually remove this from the _callbacks dictionary instead
     * of binding an empty function
     *
     * the keycombo+action has to be exactly the same as
     * it was defined in the bind method
     *
     * @param {string|Array} keys
     * @param {string} action
     * @returns void
     */
    Mousetrap.prototype.unbind = function(keys, action) {
        var self = this;
        return self.bind.call(self, keys, function() {}, action);
    };

    /**
     * triggers an event that has already been bound
     *
     * @param {string} keys
     * @param {string=} action
     * @returns void
     */
    Mousetrap.prototype.trigger = function(keys, action) {
        var self = this;
        if (self._directMap[keys + ':' + action]) {
            self._directMap[keys + ':' + action]({}, keys);
        }
        return self;
    };

    /**
     * resets the library back to its initial state.  this is useful
     * if you want to clear out the current keyboard shortcuts and bind
     * new ones - for example if you switch to another page
     *
     * @returns void
     */
    Mousetrap.prototype.reset = function() {
        var self = this;
        self._callbacks = {};
        self._directMap = {};
        return self;
    };

    /**
     * should we stop this event before firing off callbacks
     *
     * @param {Event} e
     * @param {Element} element
     * @return {boolean}
     */
    Mousetrap.prototype.stopCallback = function(e, element) {
        var self = this;

        // if the element has the class "mousetrap" then no need to stop
        if ((' ' + element.className + ' ').indexOf(' mousetrap ') > -1) {
            return false;
        }

        if (_belongsTo(element, self.target)) {
            return false;
        }

        // stop for input, select, and textarea
        return element.tagName == 'INPUT' || element.tagName == 'SELECT' || element.tagName == 'TEXTAREA' || element.isContentEditable;
    };

    /**
     * exposes _handleKey publicly so it can be overwritten by extensions
     */
    Mousetrap.prototype.handleKey = function() {
        var self = this;
        return self._handleKey.apply(self, arguments);
    };

    /**
     * allow custom key mappings
     */
    Mousetrap.addKeycodes = function(object) {
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                _MAP[key] = object[key];
            }
        }
        _REVERSE_MAP = null;
    };

    /**
     * Init the global mousetrap functions
     *
     * This method is needed to allow the global mousetrap functions to work
     * now that mousetrap is a constructor function.
     */
    Mousetrap.init = function() {
        var documentMousetrap = Mousetrap(document);
        for (var method in documentMousetrap) {
            if (method.charAt(0) !== '_') {
                Mousetrap[method] = (function(method) {
                    return function() {
                        return documentMousetrap[method].apply(documentMousetrap, arguments);
                    };
                } (method));
            }
        }
    };

    Mousetrap.init();

    // expose mousetrap to the global object
    window.Mousetrap = Mousetrap;

    // expose as a common js module
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Mousetrap;
    }

    // expose mousetrap as an AMD module
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return Mousetrap;
        });
    }
}) (typeof window !== 'undefined' ? window : null, typeof  window !== 'undefined' ? document : null);

},{}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
"use strict";

var _create = require("./utils/create");

var _create2 = _interopRequireDefault(_create);

var _elements = require("./utils/elements");

var _elements2 = _interopRequireDefault(_elements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.elements = _elements2.default;

_create2.default.all();

},{"./utils/create":59,"./utils/elements":60}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DOMString = require("./../type/DOMString.js");

var _DOMString2 = _interopRequireDefault(_DOMString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
* Adds functionality to `aria-checked` attribute.
*
* Changes value when clicked or while focused pressing `Space`.
*
* {@link https://www.w3.org/TR/wai-aria-1.1/#aria-checked}
* @emits click when clicked or while focused pressing `Space`.
* @emits change when clicked or while focused pressing `Space`.
*/
var AriaChecked = function AriaChecked(superclass) {
	return function (_superclass) {
		_inherits(_class, _superclass);

		function _class() {
			var _ref;

			_classCallCheck(this, _class);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			var _this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args)));

			_this.addEventListener("key", _this.onChecked.bind(_this), { key: "space" });
			_this.addEventListener("click", _this.onChecked.bind(_this));
			return _this;
		}

		_createClass(_class, [{
			key: "onChecked",
			value: function onChecked(ev) {
				if (ev) ev.preventDefault();

				if (this.disabled !== true) {
					this.checked = _DOMString2.default.toggle(this.checked);
					this.dispatchEvent(new InputEvent("input"));
					this.dispatchEvent(new Event("change", { bubbles: true }));
				}
			}
		}]);

		return _class;
	}(superclass);
};

exports.default = AriaChecked;

},{"./../type/DOMString.js":56}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _boolean = require("./../type/boolean");

var _boolean2 = _interopRequireDefault(_boolean);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
* Adds functionality to `aria-expanded` attribute
* @todo add a setting to define how the visibility should be toggled
*/
var AriaExpanded = function AriaExpanded(superclass) {
	return function (_superclass) {
		_inherits(_class, _superclass);

		/**
  * @param  {HTMLElement} element Element with an `aria-expanded` attribute
  */
		function _class() {
			var _ref;

			_classCallCheck(this, _class);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			var _this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args)));

			if (_this.expanded !== undefined) {
				// todo: add when first time aria-expanded is boolean
				_this.addListener("click", _this.onExpanded.bind(_this));
				// this.addListener("key", this.onExpanded.bind(this), { key: ["enter", "space"] });
			}
			return _this;
		}

		_createClass(_class, [{
			key: "onExpanded",
			value: function onExpanded(ev) {
				if (typeof _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "onExpanded", this) == "function") _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "onExpanded", this).call(this, ev);
				if (ev && typeof ev.preventDefault === "function") ev.preventDefault();

				if (this.disabled !== true) {
					this.expanded = _boolean2.default.toggle(this.expanded);

					if (this.expanded) {
						this.controls.forEach(function (control) {
							control.element.hidden = false;
						});
					} else {
						this.controls.forEach(function (control) {
							control.element.hidden = true;
						});
					}
				}
			}
		}]);

		return _class;
	}(superclass);
};

exports.default = AriaExpanded;

},{"./../type/boolean":57}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _DOMString = require("./../type/DOMString");

var _DOMString2 = _interopRequireDefault(_DOMString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
* Adds functionality to `aria-pressed` attribute.
*
* Changes value when clicked or while focused pressing `Space` or `Enter`.
*
* {@link https://www.w3.org/TR/wai-aria-1.1/#aria-pressed}
* @emits click when clicked or while focused pressing `Space` or `Enter`.
*/
var AriaPressed = function AriaPressed(superclass) {
	return function (_superclass) {
		_inherits(_class, _superclass);

		/**
  * @param  {HTMLElement} element Element with an `aria-pressed` attribute
  */
		function _class() {
			var _ref;

			_classCallCheck(this, _class);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			var _this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args)));

			if (_this.pressed !== undefined) {
				// todo: add when first time aria-pressed is boolean
				_this.addListener("click", _this.onPressed.bind(_this));
				_this.addListener("key", _this.onPressed.bind(_this), { key: ["enter", "space"] });
			}
			return _this;
		}

		_createClass(_class, [{
			key: "onPressed",
			value: function onPressed(ev) {
				if (typeof _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "onPressed", this) == "function") _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "onPressed", this).call(this, ev);

				if (this.disabled !== true) {
					this.pressed = _DOMString2.default.toggle(this.pressed);
				}
			}
		}]);

		return _class;
	}(superclass);
};

exports.default = AriaPressed;

},{"./../type/DOMString":56}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _boolean = require("./../type/boolean");

var _boolean2 = _interopRequireDefault(_boolean);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * gets and sets the `aria-selected` attribute.
 *
 * Indicates if a element is selectable
 *
 * @see https://www.w3.org/TR/wai-aria-1.1/#aria-selected
 */
var AriaSelected = function AriaSelected(superclass) {
	return function (_superclass) {
		_inherits(_class, _superclass);

		function _class() {
			var _ref;

			_classCallCheck(this, _class);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			var _this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args)));

			_this.addListener("click", _this.onSelected.bind(_this));
			_this.addListener("key", _this.onSelected.bind(_this), { key: ["space", "enter"] });
			return _this;
		}

		_createClass(_class, [{
			key: "onSelected",
			value: function onSelected(ev) {
				if (typeof _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "onSelected", this) == "function") _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "onSelected", this).call(this, ev);
				this.selected = _boolean2.default.toggle(this.selected);
			}
		}]);

		return _class;
	}(superclass);
};

exports.default = AriaSelected;

},{"./../type/boolean":57}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * 
 */
var roles = {
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
		owns: {
			all: ["textbox"],
			any: ["listbox", "tree", "grid", "dialog"]
		},
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
		owns: { any: ["article"] }
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
		owns: { any: ["rowgroup", "row"] }
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
		owns: { any: ["group", "listitem"] },
		implicit: ["dl:not([role])", "ol:not([role])", "ul:not([role])"]
	},
	listbox: {
		super: ["select"],
		owns: { any: ["option"] },
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
		owns: { any: ["menuitem", "menuitemradio", "menuitemcheckbox", "group"] },
		implicit: ["menu[type='context']:not([role])"],
		defaults: { orientation: "vertical" }
	},
	menubar: {
		super: ["menu"],
		sub: ["toolbar"],
		owns: { any: ["menuitem", "menuitemradio", "menuitemcheckbox", "group"] },
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
		owns: { any: ["radio"] }
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
		owns: { any: ["cell", "columnheader", "rowheader", "gridcell"] },
		implicit: ["table tr:not([role])"]
	},
	rowgroup: {
		context: ["grid", "table", "treegrid"],
		owns: { any: ["row"] },
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
		owns: { any: ["row", "rowgroup"] },
		implicit: ["table:not([role])"]
	},
	tablist: {
		super: ["composite"],
		owns: { any: ["tab"] },
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
		owns: { any: ["group", "treeitem"] }
	},
	treegrid: {
		super: ["grid", "tree"],
		owns: { any: ["row", "rowgroup"] }
	},
	treeitem: {
		super: ["listitem", "option"],
		context: { any: ["group", "tree"] }
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

},{}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function setSelection(range) {
	var selection = window.getSelection();
	selection.removeAllRanges();
	selection.addRange(range);
}

/**
 * @mixin
 */
var Selection = function Selection(superclass) {
	return function (_superclass) {
		_inherits(Selection, _superclass);

		function Selection() {
			_classCallCheck(this, Selection);

			return _possibleConstructorReturn(this, (Selection.__proto__ || Object.getPrototypeOf(Selection)).apply(this, arguments));
		}

		_createClass(Selection, [{
			key: "select",

			/**
    * Selects everything in the text control.
    * @name Selection#select
    */
			value: function select() {
				this.setSelectionRange(0, this.value.length);
			}

			/**
    * Returns / Sets the beginning index of the selected text. When nothing is selected,
    * this returns the position of the text input cursor(caret) inside of the < input > element.
    * 
    * @name Selection#selectionStart
    * @type {Number}
    */

		}, {
			key: "setSelectionRange",


			/**
    * Selects a range of text in the element (but does not focus it).
    * @name Selection#setSelectionRange
    * @param {Integer} selectionStart
    * @param {Integer} selectionEnd
    * @param { "forward" | "backward" | "none" } [selectionDirection = "none"] 
    * Establish the direction in which selection was set
    */
			value: function setSelectionRange(selectionStart, selectionEnd) {
				var selectionDirection = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "none";

				var start = selectionDirection == "backward" ? selectionEnd : selectionStart;
				var end = selectionDirection == "backward" ? selectionStart : selectionEnd;

				var range = new Range();
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

		}, {
			key: "setRangeText",
			value: function setRangeText(replacement) {
				var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.selectionStart;
				var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.selectionEnd;
				var selectMode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "preserve";

				var selectionStart = this.selectionStart;
				var selectionEnd = this.selectionEnd;

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
		}, {
			key: "selectionStart",
			get: function get() {
				var sel = window.getSelection();
				if (sel.anchorNode && sel.anchorNode.parentNode == this.element) {
					return sel.anchorOffset > sel.focusOffset ? sel.focusOffset : sel.anchorOffset;
				}
			},
			set: function set(start) {
				var range = new Range();
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

		}, {
			key: "selectionEnd",
			get: function get() {
				var sel = window.getSelection();
				if (sel.focusNode && sel.focusNode.parentNode == this.element) {
					return sel.focusOffset > sel.anchorOffset ? sel.focusOffset : sel.anchorOffset;
				}
			},
			set: function set(end) {
				var range = new Range();
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

		}, {
			key: "selectionDirection",
			get: function get() {
				var sel = window.getSelection();
				if (sel.focusNode && sel.focusNode.parentNode == this.element) {
					if (sel.focusOffset == sel.anchorOffset) {
						return "none";
					} else if (sel.anchorOffset > sel.focusOffset) {
						return "backward";
					} else {
						return "forward";
					}
				}
			},
			set: function set(direction) {
				var sel = window.getSelection();
				if (sel.focusNode && sel.focusNode.parentNode == this.element) {
					if (sel.focusOffset == sel.anchorOffset) {} else if (sel.anchorOffset > sel.focusOffset && direction != "backward") {
						var range = new Range();
						range.setStart(this.element.firstChild, this.selectionEnd);
						range.setEnd(this.element.firstChild, this.selectionStart);

						setSelection(range);
					} else if (direction != "forward") {
						var _range = new Range();
						_range.setStart(this.element.firstChild, this.selectionStart);
						_range.setEnd(this.element.firstChild, this.selectionEnd);

						setSelection(_range);
					}
				}
			}
		}]);

		return Selection;
	}(superclass);
};

exports.default = Selection;

},{}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ValidityState = require("./../utils/ValidityState");

var _ValidityState2 = _interopRequireDefault(_ValidityState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @mixin
 * @borrows ValidityState as validity
 * @lends Validation#
 */
var Validation = function Validation(superclass) {
	return function (_superclass) {
		_inherits(Validation, _superclass);

		function Validation() {
			_classCallCheck(this, Validation);

			return _possibleConstructorReturn(this, (Validation.__proto__ || Object.getPrototypeOf(Validation)).apply(this, arguments));
		}

		_createClass(Validation, [{
			key: "checkValidity",


			/**
    * Returns true if the element’s value has no validity problems; false otherwise.
    * Fires an invalid event at the element in the latter case.
    * @fires invalid
    * @name Validation#checkValidity
    */
			value: function checkValidity() {
				if (!this.validity.valid) this.dispatchEvent("invalid", this);
				return this.validity.valid;
			}

			/**
    * Returns true if the element’s value has no validity problems; otherwise, returns false, fires an
    * invalid event at the element, and(if the event isn’t canceled) reports the problem to the user.
    * @fires invalid
    * @name Validation#reportValidity
    */

		}, {
			key: "reportValidity",
			value: function reportValidity() {
				if (!this.validity.valid) {
					var cancelled = !this.dispatchEvent("invalid", this);
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

		}, {
			key: "setCustomValidity",
			value: function setCustomValidity(message) {
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
		}, {
			key: "validity",
			get: function get() {
				if (!this._validity) this._validity = new _ValidityState2.default(this);

				return this._validity;
			}

			/**
    * Returns true if the element will be validated when the form is submitted; false otherwise.
    * @type {Boolean}
    */

		}, {
			key: "willValidate",
			get: function get() {
				return !this.hidden && !this.readOnly;
			}

			/**
    * Returns the error message that would be shown to the user
    * if the element was to be checked for validity.
    * @name Validation#validationMessage
    * @type {String}
    */

		}, {
			key: "validationMessage",
			get: function get() {
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
		}]);

		return Validation;
	}(superclass);
};

exports.default = Validation;

},{"./../utils/ValidityState":58}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function close() {
	this.expanded = _boolean2.default.IS_NOT_ACTIVE;
}

function registerExpanded(ev) {
	console.log(ev);
}

/**
 * @summary An input that allows for user-triggered actions when clicked or pressed.
 * 
 * @extends Command
 * @mixes AriaExpanded
 * @mixes AriaPressed
 */

var Button = function (_mix$with) {
	_inherits(Button, _mix$with);

	function Button() {
		var _ref;

		_classCallCheck(this, Button);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_ref = Button.__proto__ || Object.getPrototypeOf(Button)).call.apply(_ref, [this].concat(args)));

		_this.addListener("attributes", registerExpanded, { attribute: "aria-expanded", once: true });

		if (_this.expanded !== undefined && _this.controls) {
			// todo: add when first time aria-expanded is boolean
			console.log(_this.controls.length);
			_this.controls.forEach(function (control) {
				console.log(control.addListener);
				if (control.addListener) control.addListener("close", close.bind(_this));
			});
		}
		return _this;
	}

	_createClass(Button, [{
		key: "onExpanded",
		value: function onExpanded(ev) {
			if (typeof _get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), "onExpanded", this) == "function") _get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), "onExpanded", this).call(this, ev);

			if (this.disabled !== true) {
				if (this.expanded) {
					this.controls.forEach(function (control) {
						control.element.hidden = false;
					});
				} else {
					this.controls.forEach(function (control) {
						control.element.hidden = true;
					});
				}
			}
		}
	}]);

	return Button;
}((0, _jsMixin2.default)(_Command2.default).with(_ariaExpanded2.default, _ariaPressed2.default));

exports.default = Button;

},{"../attributes/aria-expanded":20,"../attributes/aria-pressed.js":21,"./../type/boolean":57,"./abstract/Command":43,"@vestergaard-company/js-mixin":8}],27:[function(require,module,exports){
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var Checkbox = function (_mix$with) {
  _inherits(Checkbox, _mix$with);

  /**
   * @param {*} args
  */
  function Checkbox() {
    var _ref;

    _classCallCheck(this, Checkbox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call.apply(_ref, [this].concat(args)));
  }

  return Checkbox;
}((0, _jsMixin2.default)(_Input2.default).with(_ariaChecked2.default));

exports.default = Checkbox;

},{"../attributes/aria-checked.js":19,"./abstract/Input":45,"@vestergaard-company/js-mixin":8}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _boolean = require("./../type/boolean");

var _boolean2 = _interopRequireDefault(_boolean);

var _Select2 = require("./abstract/Select");

var _Select3 = _interopRequireDefault(_Select2);

var _selector = require("./../utils/selector");

var _selector2 = _interopRequireDefault(_selector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function filter(cb, value) {
	var selectedOptions = [];

	cb.owns.forEach(function (listbox) {
		Array.prototype.forEach.call(listbox.element.children, function (option) {
			if (value === null) {
				option.hidden = true;
			} else if (option.innerHTML.indexOf(value) == 0) {
				option.hidden = false;
				if (option.innerHTML === value) {
					selectedOptions.push(option);
				}
			} else {
				option.hidden = true;
			}
		});
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
	console.log(this._.combobox.input.value, ev.target.innerHTML, this._, ev);
	this._.combobox.input.value = ev.target.innerHTML;

	hideListbox.bind(this);
}

function updateListbox() {
	var options = filter(this, this._.combobox.input.value);

	options.forEach(function (i) {
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
 * @extends Select
 * @param {Element} options.combobox.input 	Defaults to first input element inside the element
 * @param {Element} [options.combobox.open]	
 * 	Optional button to open the pop-up element, 
 * 	defaults to first button element inside the element
 */

var Combobox = function (_Select) {
	_inherits(Combobox, _Select);

	function Combobox() {
		var _ref;

		_classCallCheck(this, Combobox);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		// register custom elements
		var _this = _possibleConstructorReturn(this, (_ref = Combobox.__proto__ || Object.getPrototypeOf(Combobox)).call.apply(_ref, [this].concat(args)));

		_this._.registerCustomElement("combobox.input", _this.element.querySelector(_selector2.default.getDeep("textbox")));
		_this._.registerCustomElement("combobox.open", _this.element.querySelector(_selector2.default.getDeep("button")));

		if (_this._.combobox.open) {
			_this._.combobox.open.addEventListener("click", toggleListbox.bind(_this));
		}

		_this._.combobox.input.addEventListener("focus", showListbox.bind(_this));
		_this._.combobox.input.addEventListener("blur", hideListbox.bind(_this));
		_this._.combobox.input.addEventListener("input", updateListbox.bind(_this));
		// this.owns.forEach(i => i.element.addEventListener("click", updateValue.bind(this)));

		if (_this.autocomplete == "list") {
			// Indicates that the autocomplete behavior of the text input is to suggest a list of possible values
			// in a popup and that the suggestions are related to the string that is present in the textbox.

		} else if (_this.autocomplete == "both") {}
		// ndicates that the autocomplete behavior of the text input is to both show an inline 
		// completion string and suggest a list of possible values in a popup where the suggestions 
		// are related to the string that is present in the textbox.


		/** @todo determine what to do with default values */
		if (_this.expanded == undefined) _this.expanded = false;
		if (_this.hasPopup == undefined) _this.hasPopup = "listbox";
		return _this;
	}

	return Combobox;
}(_Select3.default);

exports.default = Combobox;

},{"./../type/boolean":57,"./../utils/selector":65,"./abstract/Select":50}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsMixin = require("@vestergaard-company/js-mixin");

var _jsMixin2 = _interopRequireDefault(_jsMixin);

var _Window = require("./abstract/Window");

var _Window2 = _interopRequireDefault(_Window);

var _ariaExpanded = require("../attributes/aria-expanded.js");

var _ariaExpanded2 = _interopRequireDefault(_ariaExpanded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mousetrap = require("mousetrap");

function focus(node) {
	// get all elements within given element
	var children = node.getElementsByTagName("*");

	// remove all elements who aren't accessible by a tab
	var focusableNodes = Array.prototype.filter.call(children, function (i) {
		return (i.tabIndex > -1 || i.contentEditable == "true") && !i.disabled && i.offsetWidth > 0 && i.offsetHeight > 0;
	});

	// sort elements in descending order
	focusableNodes.sort(function (a, b) {
		return a.tabIndex + b.tabIndex;
	});

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

var Dialog = function (_mix$with) {
	_inherits(Dialog, _mix$with);

	function Dialog() {
		var _ref;

		_classCallCheck(this, Dialog);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		// this._node.ownerDocument.addEventListener("focus", this._onFocus.bind(this), true);
		// this._node.ownerDocument.addEventListener("blur", this._onFocus.bind(this), true);
		var _this = _possibleConstructorReturn(this, (_ref = Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call.apply(_ref, [this].concat(args)));

		_this.addEventListener("key", _this.onClose.bind(_this), { key: "esc", target: _this._node.ownerDocument });

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
		return _this;
	}

	_createClass(Dialog, [{
		key: "_onFocus",
		value: function _onFocus(ev) {
			// ev.preventDefault();
			var n = focus(this._node.ownerDocument);
			if (n[n.length - 1] != ev.target) {
				ev.preventDefault();
				window.focus();
			}
			console.log(ev);
		}
	}, {
		key: "onClose",
		value: function onClose(ev) {
			if (ev) ev.preventDefault();
			this._node.hidden = true;

			this.dispatchEvent(new Event("close"));
		}
	}, {
		key: "_onHiddenMutation",
		value: function _onHiddenMutation(ev) {
			if (this._node.getAttribute("hidden") === "true") {
				var n = focus(this._node);
				n[0].focus();
				console.log(n, document.activeElement, n == document.activeElement);
			} else {}
		}
	}]);

	return Dialog;
}((0, _jsMixin2.default)(_Window2.default).with(_ariaExpanded2.default));

exports.default = Dialog;

},{"../attributes/aria-expanded.js":20,"./abstract/Window":53,"@vestergaard-company/js-mixin":8,"mousetrap":16}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Landmark2 = require("./abstract/Landmark");

var _Landmark3 = _interopRequireDefault(_Landmark2);

var _selector = require("./../utils/selector");

var _selector2 = _interopRequireDefault(_selector);

var _elements = require("./../utils/elements");

var _elements2 = _interopRequireDefault(_elements);

var _create = require("./../utils/create");

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = function (_Landmark) {
	_inherits(Form, _Landmark);

	function Form() {
		_classCallCheck(this, Form);

		return _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).apply(this, arguments));
	}

	_createClass(Form, [{
		key: "elements",
		get: function get() {
			// get native elements
			var selector = ["button", "fieldset", "input", "object", "output", "select", "textarea"].join(":not([role]),");
			var res = Array.from(this.elements.querySelectorAll(selector));

			var explicitRole = "";
			explicitRole += selector.getDeepRole("button");
			explicitRole += selector.getDeepRole("input");
			explicitRole += selector.getDeepRole("status");
			explicitRole += selector.getDeepRole("select");

			Array.prototype.forEach(this.elements.querySelectorAll(explicitRole), function (node) {
				return res.push(_elements2.default.get(node) || _create2.default.one(node));
			});
			console.log(res, explicitRole, selector);
			return res;
		}
	}]);

	return Form;
}(_Landmark3.default);

exports.default = Form;

},{"./../utils/create":59,"./../utils/elements":60,"./../utils/selector":65,"./abstract/Landmark":46}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _jsMixin = require("@vestergaard-company/js-mixin");

var _jsMixin2 = _interopRequireDefault(_jsMixin);

var _Command = require("./abstract/Command.js");

var _Command2 = _interopRequireDefault(_Command);

var _boolean = require("./../type/boolean");

var _boolean2 = _interopRequireDefault(_boolean);

var _ariaExpanded = require("../attributes/aria-expanded");

var _ariaExpanded2 = _interopRequireDefault(_ariaExpanded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var Link = function (_mix$with) {
	_inherits(Link, _mix$with);

	function Link() {
		var _ref;

		_classCallCheck(this, Link);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_ref = Link.__proto__ || Object.getPrototypeOf(Link)).call.apply(_ref, [this].concat(args)));

		_this._.registerCustomValue("link.href");

		if (_this._.link.href) {
			_this.addEventListener("click", _this.onClick.bind(_this));
			_this.addEventListener("key", _this.onClick.bind(_this), { key: "enter" });
		}

		_this.addEventListener("expanded");

		if (_this.expanded !== undefined) {
			// todo: add when first time aria-expanded is boolean
			_this.controls.forEach(function (control) {
				return control.addEventListener("close", close.bind(_this));
			});
			_this.addEventListener("click", _this.onExpanded.bind(_this));
			_this.addEventListener("key", _this.onExpanded.bind(_this), { key: "enter" });
		}
		return _this;
	}

	/**
  * Fired when state of expanded is changed 
  * @param {Event} ev 
  */


	_createClass(Link, [{
		key: "onExpanded",
		value: function onExpanded(ev) {
			if (typeof _get(Link.prototype.__proto__ || Object.getPrototypeOf(Link.prototype), "onExpanded", this) == "function") _get(Link.prototype.__proto__ || Object.getPrototypeOf(Link.prototype), "onExpanded", this).call(this, ev);

			if (this.disabled !== true) {
				if (this.expanded) {
					this.controls.forEach(function (control) {
						control.element.hidden = false;
					});
				} else {
					this.controls.forEach(function (control) {
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

	}, {
		key: "onClick",
		value: function onClick(ev) {
			if (typeof _get(Link.prototype.__proto__ || Object.getPrototypeOf(Link.prototype), "onClick", this) == "function") _get(Link.prototype.__proto__ || Object.getPrototypeOf(Link.prototype), "onClick", this).call(this, ev);

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
	}]);

	return Link;
}((0, _jsMixin2.default)(_Command2.default).with(_ariaExpanded2.default));

exports.default = Link;

},{"../attributes/aria-expanded":20,"./../type/boolean":57,"./abstract/Command.js":43,"@vestergaard-company/js-mixin":8}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Select2 = require("./abstract/Select");

var _Select3 = _interopRequireDefault(_Select2);

var _boolean = require("./../type/boolean");

var _boolean2 = _interopRequireDefault(_boolean);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @summary A widget that allows the user to select one or more items from a list of choices.
 * @desc
 * ### Keyboard Support
 *
 * #### Default
 * | Key | Function |
 * | --- | -------- |
 * | Down Arrow | Moves focus to the next option <br/> If not multiselectable, it selects the focused option.
 * | Up Arrow 	| Moves focus to the previous option  <br/> If not multiselectable, it selects the focused option.
 * | Home 			|	Moves focus to the first option  <br/> If not multiselectable, it selects the focused option.
 * | End  			|	Moves focus to the last option  <br/> If not multiselectable, it selects the focused option.
 * 
 * #### Multiple selection
 * | Key | Function |
 * | --- | -------- |
 * | Space									| Changes the selection state of the focused option.
 * | Shift + Down Arrow 		| Moves focus to and selects the next option.
 * | Shift + Up Arrow 			| Moves focus to and selects the previous option.
 * | Control + Shift + Home |	Selects from the focused option to the beginning of the list.
 * | Control + Shift + End  | Selects from the focused option to the end of the list.
 * | Control + A 	          | Selects all options in the list. If all options are selected, unselects all options.
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
 * <ul role="listbox" tabindex="0" aria-activedescendant="option_1" aria-multiselectable="true">
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
 * @extends Roletype
 * @fires Listbox#change
 * @fires Listbox#input
 */
var Listbox = function (_Select) {
  _inherits(Listbox, _Select);

  function Listbox() {
    var _ref;

    _classCallCheck(this, Listbox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Listbox.__proto__ || Object.getPrototypeOf(Listbox)).call.apply(_ref, [this].concat(args)));

    _this._.registerCustomValue("listbox.size", 1);

    _this.size = 10;
    // this._node.addEventListener("click", clickOnOption.bind(this));

    // this.addKeyListener("enter", clickOnOption.bind(this));
    return _this;
  }

  /**
   * Returns / Sets the size of control.
   * @type {Integer}
   */


  _createClass(Listbox, [{
    key: "moved",
    value: function moved(from, to) {
      // update selected on keyevent when only one item can be selected
      if (!this.multiselectable) {
        from.selected = undefined;
        to.selected = _boolean2.default.toggle(to.selected);
      }
    }
  }, {
    key: "size",
    get: function get() {
      return this._.listbox.size;
    },
    set: function set(val) {
      var styles = getComputedStyle(this._node);
      this._node.style.height = parseFloat(styles.lineHeight) / parseFloat(styles.fontSize) * val + "em";
      this._.listbox.size = val;
    }
  }]);

  return Listbox;
}(_Select3.default);

exports.default = Listbox;

},{"./../type/boolean":57,"./abstract/Select":50}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _boolean = require("./../type/boolean");

var _boolean2 = _interopRequireDefault(_boolean);

var _getActive = require("./../utils/getActive");

var _getActive2 = _interopRequireDefault(_getActive);

var _Input2 = require("./abstract/Input");

var _Input3 = _interopRequireDefault(_Input2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @extends Input
 */
var Option = function (_Input) {
	_inherits(Option, _Input);

	function Option() {
		var _ref;

		_classCallCheck(this, Option);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_ref = Option.__proto__ || Object.getPrototypeOf(Option)).call.apply(_ref, [this].concat(args)));

		_this.addEventListener("click", _this.onClick.bind(_this));
		_this.addEventListener("key", _this.onClick.bind(_this), { key: "enter", target: document });
		_this.addEventListener("key", _this.onClick.bind(_this), { key: "space", target: document });
		// this.addKeyListener("Enter", selectItem.bind(this));
		return _this;
	}

	_createClass(Option, [{
		key: "onClick",
		value: function onClick(ev) {
			if (typeof _get(Option.prototype.__proto__ || Object.getPrototypeOf(Option.prototype), "onClick", this) == "function") _get(Option.prototype.__proto__ || Object.getPrototypeOf(Option.prototype), "onClick", this).call(this, ev);
			if (ev) ev.preventDefault();

			if (this == (0, _getActive2.default)()) {
				this.selected = _boolean2.default.toggle(this.selected);
			}
		}
	}]);

	return Option;
}(_Input3.default);

exports.default = Option;

},{"./../type/boolean":57,"./../utils/getActive":61,"./abstract/Input":45}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsMixin = require("@vestergaard-company/js-mixin");

var _jsMixin2 = _interopRequireDefault(_jsMixin);

var _Command = require("./abstract/Command.js");

var _Command2 = _interopRequireDefault(_Command);

var _ariaChecked = require("../attributes/aria-checked.js");

var _ariaChecked2 = _interopRequireDefault(_ariaChecked);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A checkable input in a group of elements with the same role,
 * only one of which can be checked at a time.
 * 
 * ### Examples
 * 
 * #### Default
 * 
 * <div role="radio" aria-checked="true" tabindex="0">Apple</div>
 * <div role="radio" aria-checked="false" tabindex="0">Apple</div>
 * 
 * @extends Command
 * @mixes AriaChecked
 */
var Radio = function (_mix$with) {
  _inherits(Radio, _mix$with);

  function Radio() {
    _classCallCheck(this, Radio);

    return _possibleConstructorReturn(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).apply(this, arguments));
  }

  return Radio;
}((0, _jsMixin2.default)(_Command2.default).with(_ariaChecked2.default));

exports.default = Radio;

},{"../attributes/aria-checked.js":19,"./abstract/Command.js":43,"@vestergaard-company/js-mixin":8}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Select2 = require("./abstract/Select.js");

var _Select3 = _interopRequireDefault(_Select2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import Radio from "./radio.js";
// import {IS_ACTIVE, IS_NOT_ACTIVE} from "./../utils/state.js";
// import {AriaOwns} from "./../attributes/aria-owns.js";


/**
 * ### Example
 * 
 * #### Basic example
 * 
 * <div role="radiogroup" tabindex="0" aria-activedescendant="radio_1">
 *   <div id="radio_1" role="radio" aria-checked="true">Apple</div>
 *   <div id="radio_2" role="radio" aria-checked="false">Grapefruit</div>
 * </div>
 * 
 * @extends Select
 */
var Radiogroup = function (_Select) {
	_inherits(Radiogroup, _Select);

	function Radiogroup() {
		var _ref;

		_classCallCheck(this, Radiogroup);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_ref = Radiogroup.__proto__ || Object.getPrototypeOf(Radiogroup)).call.apply(_ref, [this].concat(args)));

		_this._node.addEventListener("change", _this.onChange.bind(_this));
		return _this;
	}

	_createClass(Radiogroup, [{
		key: "onChange",
		value: function onChange(ev) {
			console.log(ev);
		}
	}, {
		key: "moved",
		value: function moved(from, to) {
			// update selected on keyevent when only one item can be selected
			if (!this.multiselectable) {
				from.checked = false;
				to.checked = true;
			}
		}
	}]);

	return Radiogroup;
}(_Select3.default);

exports.default = Radiogroup;

},{"./abstract/Select.js":50}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Range2 = require("./abstract/Range.js");

var _Range3 = _interopRequireDefault(_Range2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // var objectPath = require("object-path");


function calcValueOfTrackPos(pos, track, thumb, min, max, step, orientation) {
	var positionKey = orientation == "vertical" ? "y" : "x";
	var range = (max - min) / step;
	// the full usable length of the track
	var trackSize = getTrackSize(track, thumb, orientation);
	// how many pixels  span for one step change
	var pxPerStep = trackSize / range;

	// bounding box of the track
	var trackCoor = track.getBoundingClientRect();
	// offset without track limits
	var offset = pos - trackCoor[positionKey] - thumb.clientWidth / 2;

	// update offset to the track limits if needed
	if (offset < 0) {
		offset = 0;
	} else if (offset > trackSize) {
		offset = trackSize;
	}

	// round the value to nearest increment
	return Math.round(offset / pxPerStep) * step + min;
}

function getTrackSize(track, thumb, orientation) {
	if (orientation == "vertical") {
		return track.clientHeight - thumb.clientHeight;
	} else {
		return track.clientWidth - thumb.clientWidth;
	}
}

function updatePosition(value, track, thumb, min, max, orientation) {
	var styleKey = orientation == "vertical" ? "top" : "left";
	var range = max - min;
	var pxPerStep = getTrackSize(track, thumb, orientation) / range;
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

var Slider = function (_Range) {
	_inherits(Slider, _Range);

	/**
  * @param {*} args 
  */
	function Slider() {
		var _ref;

		_classCallCheck(this, Slider);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		// register customs
		var _this = _possibleConstructorReturn(this, (_ref = Slider.__proto__ || Object.getPrototypeOf(Slider)).call.apply(_ref, [this].concat(args)));

		_this._.registerCustomElement("slider.track", _this._node.parentNode);

		// set defaults
		if (undefined == _this.orientation) _this.orientation = "horizontal";
		if (undefined == _this.valueMin) {
			/**
    * @default [0]
    */
			_this.valueMin = 0;
		}
		if (undefined == _this.valueMax) _this.valueMax = 100;
		if (undefined == _this.valueNow && _this.valueMax < _this.valueMin) {
			_this.valueNow = _this.valueMin;
		} else if (undefined == _this.valueNow) {
			_this.valueNow = _this.valueMin + (_this.valueMax - _this.valueMin) / 2;
		}

		_this._unTrackMouseBinded = _this._unTrackMouse.bind(_this);
		_this._unTrackTouchBinded = _this._unTrackTouch.bind(_this);
		_this._onDrag = _this.onDrag.bind(_this);

		// todo: allow automatically setting valueText with some sugar

		_this.addEventListener("touchstart", _this._onTouchStart.bind(_this));
		_this.addEventListener("mousedown", _this._onMouseDown.bind(_this), { target: _this._.slider.track });
		_this.addEventListener("key", _this.stepUp.bind(_this), { key: "right" });
		_this.addEventListener("key", _this.stepUp.bind(_this), { key: "up" });
		_this.addEventListener("key", _this.stepDown.bind(_this), { key: "left" });
		_this.addEventListener("key", _this.stepDown.bind(_this), { key: "down" });

		updatePosition(_this.valueNow, _this._.slider.track, _this._node, _this.valueMin, _this.valueMax, _this.orientation);
		return _this;
	}

	_createClass(Slider, [{
		key: "_onMouseDown",
		value: function _onMouseDown() {
			document.addEventListener("mousemove", this._onDrag);
			document.addEventListener("mouseup", this._unTrackMouseBinded);

			// focus the thumb when the user did an action
			this._node.focus();
		}
	}, {
		key: "_onTouchStart",
		value: function _onTouchStart() {
			document.addEventListener("touchmove", this._onDrag);
			document.addEventListener("touchend", this._unTrackTouchBinded);
			document.addEventListener("touchcancel", this._unTrackTouchBinded);
		}
	}, {
		key: "_unTrackMouse",
		value: function _unTrackMouse() {
			document.removeEventListener("mousemove", this._onDrag);
			document.removeEventListener("mouseup", this._unTrackMouseBinded);

			// focus the thumb when the user did an action
			this._node.focus();
		}
	}, {
		key: "_unTrackTouch",
		value: function _unTrackTouch() {
			document.removeEventListener("touchmove", this._onDrag);
			document.removeEventListener("touchend", this._unTrackMouse);
			document.removeEventListener("touchcancel", this._unTrackMouseBinded);
		}
	}, {
		key: "onDrag",
		value: function onDrag(ev) {
			ev.preventDefault();
			var pos = void 0;
			var positionKey = this.orientation == "vertical" ? "clientY" : "clientX";
			if (ev.changedTouches) {
				pos = ev.changedTouches[0][positionKey];
			} else {
				pos = ev[positionKey];
			}
			this.valueNow = calcValueOfTrackPos(pos, this._.slider.track, this._node, this.valueMin, this.valueMax, this._.step, this.orientation);
		}
	}, {
		key: "valueNow",
		get: function get() {
			return _get(Slider.prototype.__proto__ || Object.getPrototypeOf(Slider.prototype), "valueNow", this);
		},
		set: function set(val) {
			if (!this.disabled) {
				_set(Slider.prototype.__proto__ || Object.getPrototypeOf(Slider.prototype), "valueNow", val, this);
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

	}]);

	return Slider;
}(_Range3.default);

exports.default = Slider;

},{"./abstract/Range.js":47}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.options = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _jsMixin = require("@vestergaard-company/js-mixin");

var _jsMixin2 = _interopRequireDefault(_jsMixin);

var _Range2 = require("./abstract/Range");

var _Range3 = _interopRequireDefault(_Range2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var options = exports.options = {
	selector: "[role='spinbutton']",
	role: "spinbutton"
};

/**
 * A input field with 2 button to increase or decrease the numberical value
 * @extends Range
 *
 * @see {@link https://html.spec.whatwg.org/multipage/input.html#number-state-(type=number)}
 */

var Spinbutton = function (_Range) {
	_inherits(Spinbutton, _Range);

	function Spinbutton(el, options) {
		_classCallCheck(this, Spinbutton);

		// register custom elements
		/**
  * @name Spinbutton#_
  * @type {Object}
  * @prop {HTMLElement} [spinbutton.up]
  * @prop {HTMLElement} [spinbutton.down]
  */
		var _this = _possibleConstructorReturn(this, (Spinbutton.__proto__ || Object.getPrototypeOf(Spinbutton)).call(this, el, options));

		_this._.registerCustomElement("spinbutton.up");
		_this._.registerCustomElement("spinbutton.down");
		_this._.registerCustomValue("step", 1);

		// set defaults
		/**
  * @name Spinbutton#valueNow
  * @type {Number}
  * @default [0]
  */
		if (null === _this.valueNow) _this.valueNow = 0;

		// todo: allow automatically setting valueText with some sugar

		if (_this._.spinbutton.down) _this._.spinbutton.up.addEventListener("click", _this.stepUp.bind(_this));
		if (_this._.spinbutton.down) _this._.spinbutton.down.addEventListener("click", _this.stepDown.bind(_this));
		_this.addKeyListener("up", _this.stepUp.bind(_this));
		_this.addKeyListener("down", _this.stepDown.bind(_this));
		_this.element.value = _this.valueNow;
		return _this;
	}

	_createClass(Spinbutton, [{
		key: "valueNow",
		get: function get() {
			return _get(Spinbutton.prototype.__proto__ || Object.getPrototypeOf(Spinbutton.prototype), "valueNow", this);
		},
		set: function set(val) {
			_set(Spinbutton.prototype.__proto__ || Object.getPrototypeOf(Spinbutton.prototype), "valueNow", val, this);
			this.element.value = val;
		}
	}]);

	return Spinbutton;
}(_Range3.default);

exports.default = Spinbutton;

},{"./abstract/Range":47,"@vestergaard-company/js-mixin":8}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Checkbox2 = require("./Checkbox");

var _Checkbox3 = _interopRequireDefault(_Checkbox2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A type of checkbox that represents on/off values, as opposed to checked/unchecked values.
 * @extends Checkbox 
 */
var Switch = function (_Checkbox) {
	_inherits(Switch, _Checkbox);

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
	function Switch() {
		var _ref;

		_classCallCheck(this, Switch);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _possibleConstructorReturn(this, (_ref = Switch.__proto__ || Object.getPrototypeOf(Switch)).call.apply(_ref, [this].concat(args)));
	}

	return Switch;
}(_Checkbox3.default);

exports.default = Switch;

},{"./Checkbox":27}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tab = function (_mix$with) {
	_inherits(Tab, _mix$with);

	function Tab() {
		var _ref;

		_classCallCheck(this, Tab);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _possibleConstructorReturn(this, (_ref = Tab.__proto__ || Object.getPrototypeOf(Tab)).call.apply(_ref, [this].concat(args)));
	}

	_createClass(Tab, [{
		key: "onSelect",
		value: function onSelect(ev) {
			// gets the selector for finding it's context element (tablist > tab) 
			var contextSelector = _roles2.default.tab.context.map(function (str) {
				return _selector2.default.getRole(str);
			}).join(", ");
			var tablist = _elements2.default.getParent(this, contextSelector);
			if (!tablist) return false;

			ev.preventDefault();

			var tabs = tablist.element.querySelectorAll(options.selector + "[aria-selected='true']");
			[].forEach.call(tabs, function (item) {
				var inst = _elements2.default.get(item);
				inst.selected = false;
				inst.controls[0].element.hidden = true;
			});

			if (typeof _get(Tab.prototype.__proto__ || Object.getPrototypeOf(Tab.prototype), "onSelect", this) == "function") _get(Tab.prototype.__proto__ || Object.getPrototypeOf(Tab.prototype), "onSelect", this).call(this, ev);

			this.controls[0].element.hidden = false;
		}
	}]);

	return Tab;
}((0, _jsMixin2.default)(_Roletype2.default).with(_ariaSelected2.default));

exports.default = Tab;

},{"./../attributes/aria-selected":22,"./../data/roles":23,"./../utils/elements":60,"./../utils/selector":65,"./abstract/Roletype":48,"@vestergaard-company/js-mixin":8}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _elements = require("./../utils/elements.js");

var _elements2 = _interopRequireDefault(_elements);

var _Composite2 = require("./abstract/Composite");

var _Composite3 = _interopRequireDefault(_Composite2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tablist = function (_Composite) {
	_inherits(Tablist, _Composite);

	function Tablist() {
		var _ref;

		_classCallCheck(this, Tablist);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_ref = Tablist.__proto__ || Object.getPrototypeOf(Tablist)).call.apply(_ref, [this].concat(args)));

		_this.addKeyListener("left", _this.moveToPrev.bind(_this));
		_this.addKeyListener("right", _this.moveToNext.bind(_this));
		_this.addKeyListener("home", _this.moveToStart.bind(_this));
		_this.addKeyListener("end", _this.moveToEnd.bind(_this));
		return _this;
	}

	_createClass(Tablist, [{
		key: "moveToPrev",
		value: function moveToPrev(ev) {
			var prevInstance = _elements2.default.getPrev(_elements2.default.get(ev.target), this, options.owns);
			prevInstance.element.focus();
			ev.preventDefault();
		}
	}, {
		key: "moveToNext",
		value: function moveToNext(ev) {
			var nextInstance = _elements2.default.getNext(_elements2.default.get(ev.target), this, options.owns);
			nextInstance.element.focus();
			ev.preventDefault();
		}
	}, {
		key: "moveToStart",
		value: function moveToStart(ev) {
			var firstInstance = _elements2.default.getStart(_elements2.default.get(ev.target), this, options.owns);
			firstInstance.element.focus();
			ev.preventDefault();
		}
	}, {
		key: "moveToEnd",
		value: function moveToEnd(ev) {
			var lastInstance = _elements2.default.getEnd(_elements2.default.get(ev.target), this, options.owns);
			lastInstance.element.focus();
			ev.preventDefault();
		}
	}]);

	return Tablist;
}(_Composite3.default);

exports.default = Tablist;

},{"./../utils/elements.js":60,"./abstract/Composite":44}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Section2 = require("./abstract/Section");

var _Section3 = _interopRequireDefault(_Section2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tabpanel = function (_Section) {
  _inherits(Tabpanel, _Section);

  function Tabpanel() {
    _classCallCheck(this, Tabpanel);

    return _possibleConstructorReturn(this, (Tabpanel.__proto__ || Object.getPrototypeOf(Tabpanel)).apply(this, arguments));
  }

  return Tabpanel;
}(_Section3.default);

exports.default = Tabpanel;

},{"./abstract/Section":49}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsMixin = require("@vestergaard-company/js-mixin");

var _jsMixin2 = _interopRequireDefault(_jsMixin);

var _Input = require("./abstract/Input");

var _Input2 = _interopRequireDefault(_Input);

var _Selection = require("./../mixins/Selection");

var _Selection2 = _interopRequireDefault(_Selection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var Textbox = function (_mix$with) {
	_inherits(Textbox, _mix$with);

	/**
  * @param {*} args
  */
	function Textbox() {
		var _ref;

		_classCallCheck(this, Textbox);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_ref = Textbox.__proto__ || Object.getPrototypeOf(Textbox)).call.apply(_ref, [this].concat(args)));

		_this._.registerCustomValue("textbox.minlength");
		_this._.registerCustomValue("textbox.maxlength");
		_this._.registerCustomValue("textbox.size");

		if (!_this.multiline) {
			_this.addEventListener("key", _this._onEnter.bind(_this), { key: "enter" });
			_this.addEventListener("paste", _this._onPaste.bind(_this));
		}
		return _this;
	}

	_createClass(Textbox, [{
		key: "_onEnter",
		value: function _onEnter(ev) {
			ev.preventDefault();
		}
	}, {
		key: "_onPaste",
		value: function _onPaste(ev) {
			ev.preventDefault();
			var str = void 0;
			var data = ev.clipboardData.getData("text/plain").replace(/\r?\n|\r/g, "");
			var sel = window.getSelection();

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
	}, {
		key: "_onChildListMutation",
		value: function _onChildListMutation(mutation) {
			if (!this.multiline) {
				Array.prototype.forEach.call(mutation.addedNodes, function (n) {
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

	}, {
		key: "value",
		get: function get() {
			return this._node.innerText;
		},
		set: function set(str) {
			this._node.innerText = str;
		}

		/**
   * Returns / Sets the minmum length of characters
   * @type {Integer}
   */

	}, {
		key: "minLength",
		get: function get() {
			return this._.textbox.minlength;
		},
		set: function set(num) {
			this._.textbox.minlength = num;
		}

		/**
   * Returns / Sets the maximum length of characters
   * @type {Integer}
   */

	}, {
		key: "maxLength",
		get: function get() {
			return this._.textbox.maxlength;
		},
		set: function set(num) {
			this._.textbox.maxlength = num;
		}

		/**
   * Returns / Sets the size of control.
   * @type {Integer}
   */

	}, {
		key: "size",
		get: function get() {
			return this._.textbox.size;
		},
		set: function set(val) {
			this._node.style.width = 2.16 + 0.48 * val + "em";
			this._.textbox.size = val;
		}
	}]);

	return Textbox;
}((0, _jsMixin2.default)(_Input2.default).with(_Selection2.default));

exports.default = Textbox;

},{"./../mixins/Selection":24,"./abstract/Input":45,"@vestergaard-company/js-mixin":8}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Widget2 = require("./Widget");

var _Widget3 = _interopRequireDefault(_Widget2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @extends Widget
 * @abstract
 */
var Command = function (_Widget) {
  _inherits(Command, _Widget);

  function Command() {
    _classCallCheck(this, Command);

    return _possibleConstructorReturn(this, (Command.__proto__ || Object.getPrototypeOf(Command)).apply(this, arguments));
  }

  return Command;
}(_Widget3.default);

exports.default = Command;

},{"./Widget":52}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Widget2 = require("./Widget");

var _Widget3 = _interopRequireDefault(_Widget2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @extends Widget
 * @abstract
 */
var Composite = function (_Widget) {
  _inherits(Composite, _Widget);

  function Composite() {
    _classCallCheck(this, Composite);

    return _possibleConstructorReturn(this, (Composite.__proto__ || Object.getPrototypeOf(Composite)).apply(this, arguments));
  }

  return Composite;
}(_Widget3.default);

exports.default = Composite;

},{"./Widget":52}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @extends Widget
 * @mixes Validation
 * @abstract
 */
var Input = function (_mix$with) {
	_inherits(Input, _mix$with);

	/**
  * @alias Input:constructor
 	 * @param {Regex} [options.input.pattern] Regex to check against when validating
  */
	function Input() {
		var _ref;

		_classCallCheck(this, Input);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_ref = Input.__proto__ || Object.getPrototypeOf(Input)).call.apply(_ref, [this].concat(args)));

		_this._.registerCustomElement("input.pattern");
		return _this;
	}

	/* Polyfill of native properties */

	/**
  * Returns a reference to the parent form element
  * @returns {AccessibleNode} {@link Form}
  */


	_createClass(Input, [{
		key: "form",
		get: function get() {
			return _elements2.default.getParent(this, _selector2.default.getDeep("form"));
		}

		/**
   * Returns the first element pointed by the {@link AccessibleNode#controls} property.
   * The property may be null if no HTML element found in the same tree.
   * @returns {AccessibleNode} {@link Listbox}
   */

	}, {
		key: "list",
		get: function get() {
			return this.controls.find(function (ay) {
				return ay.element.matches(_selector2.default.get("listbox"));
			});
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

	}]);

	return Input;
}((0, _jsMixin2.default)(_Widget2.default).with(_Validation2.default));

exports.default = Input;

},{"./../../mixins/Validation":25,"./../../utils/elements":60,"./../../utils/selector":65,"./Widget":52,"@vestergaard-company/js-mixin":8}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Section2 = require("./Section");

var _Section3 = _interopRequireDefault(_Section2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @extends Section
 */
var Landmark = function (_Section) {
  _inherits(Landmark, _Section);

  function Landmark() {
    _classCallCheck(this, Landmark);

    return _possibleConstructorReturn(this, (Landmark.__proto__ || Object.getPrototypeOf(Landmark)).apply(this, arguments));
  }

  return Landmark;
}(_Section3.default);

exports.default = Landmark;

},{"./Section":49}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Widget2 = require("./Widget");

var _Widget3 = _interopRequireDefault(_Widget2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * **(Abstract role) SHOULD NOT USED IN THE DOM** 
 * An input representing a range of values that can be set by the user.
 *
 * @class
 * @extends Widget
 * @return {Range} this
 * @see {@link https://w3c.github.io/aria/aria/aria.html#range}
 */
var Range = function (_Widget) {
	_inherits(Range, _Widget);

	/**
  * @alias module:Range-const
  * @param {HTMLElement} element 				element to derive information nameFrom
  * @param {Object} [options] 						optional options
 	 * @param {Number|"any"} options.step 	increase/decrease value used
  */
	function Range() {
		var _ref;

		_classCallCheck(this, Range);

		for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
			arg[_key] = arguments[_key];
		}

		/**
    * @name Range#_
   * @type {Object}
   * @prop {Number} [step=1]
    */

		var _this = _possibleConstructorReturn(this, (_ref = Range.__proto__ || Object.getPrototypeOf(Range)).call.apply(_ref, [this].concat(arg)));

		_this._.registerCustomValue("step", 1);
		return _this;
	}

	/**
  * Passtrough of an stringified `valueNow`
  * @type {String}
  * @see {@link AccessibleNode#valueNow}
  */


	_createClass(Range, [{
		key: "stepDown",


		/**
    * Decrease the value with the amount of 1 step
    * @param  {Event} ev Event when triggered through an elements
    */
		value: function stepDown(ev) {
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

	}, {
		key: "stepUp",
		value: function stepUp(ev) {
			if (this.disabled) return;
			if (ev) ev.preventDefault();

			if (this.valueMax === null || this.valueNow < this.valueMax) {
				this.valueNow = this.valueNow + Number(this._.step);
			}
		}
	}, {
		key: "value",
		get: function get() {
			return this.valueNow.toString();
		},
		set: function set(val) {
			this.valueNow = val;
		}

		/**
   * Proxy of the `valueNow` value
   * @type {Number}
   * @see {@link AccessibleNode#valueNow}
   */

	}, {
		key: "valueAsNumber",
		get: function get() {
			return this.valueNow;
		},
		set: function set(val) {
			this.valueNow = val;
		}
	}]);

	return Range;
}(_Widget3.default);

exports.default = Range;

},{"./Widget":52}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _AccessibleNode2 = require("aomjs/src/AccessibleNode.js");

var _AccessibleNode3 = _interopRequireDefault(_AccessibleNode2);

var _objectPath = require("object-path");

var _objectPath2 = _interopRequireDefault(_objectPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mousetrap = require("mousetrap");


// Event names that are only inside the libary
var customEvents = ["key", "attributes", "characterData", "childlist", "label"];

var isFunction = function isFunction(obj) {
	return typeof obj == "function" || false;
};

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
 * @extends AccessibleNode
 */

var Roletype = function (_AccessibleNode) {
	_inherits(Roletype, _AccessibleNode);

	/**
  * @extends AccessibleNode
  */
	function Roletype() {
		var _ref;

		_classCallCheck(this, Roletype);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_ref = Roletype.__proto__ || Object.getPrototypeOf(Roletype)).call.apply(_ref, [this].concat(args)));

		Object.defineProperty(_this, "_", { value: {} });
		_this._.registerCustomElement = handleCustomElement.bind(_this);
		_this._.registerCustomValue = handleCustomValue.bind(_this);

		_objectPath2.default.push(_this._, "mutations", "tabIndex");

		_this._onAriaDisabledMutation();
		return _this;
	}

	_createClass(Roletype, [{
		key: "_onAriaDisabledMutation",
		value: function _onAriaDisabledMutation() {
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

	}, {
		key: "addEventListener",


		/**
   * Adds an listener to the object and targeted element
   * @see customEvents
   * @param {String} label Type of event
   * @param {Function} callback Callback function
   * @param {Object} [options] Extends AddEventListenerOptions
   * @param {String} [options.key] When label is set to `key` it specifies the keycombo to listen to
   * @param {String} [options.attribute] When label is set to `attributes` it specifies which attribute should be changed
   * @param {Element} [options.target] Changes the targeted element
   * @param {Boolean} [options.capture]
   * @param {Boolean} [options.passive]
   * @param {Boolean} [options.once]
   */
		value: function addEventListener(type, callback, options) {
			// check if custom target is set
			var node = options && options.target ? options.target : this._node;

			// push event to the listener
			_get(Roletype.prototype.__proto__ || Object.getPrototypeOf(Roletype.prototype), "addEventListener", this).call(this, type, { callback: callback, options: options });

			// attach listener to given keys
			if (type == "key" && options.key) {
				Mousetrap(node).bind(options.key, callback);
			}

			// attach native events to target element
			if (customEvents.indexOf(type) == -1) {
				node.addEventListener(type, callback, options);
			}
		}
	}, {
		key: "removeListener",
		value: function removeListener(label, callback, options) {
			if (!this._listeners.has(label)) {
				return;
			}

			var stack = this._listeners.get(label);
			var index = void 0;

			if (stack && stack.length) {
				index = stack.reduce(function (i, listener, index) {
					if (isFunction(listener.callback) && listener.callback === callback && (listener.options && listener.options.key == options.key && listener.options.attribute == options.attribute && listener.options.capture == options.capture || !listener.options && !options)) {
						return i = index;
					} else {
						return i;
					}
				}, -1);

				if (index > -1) {
					if (customEvents.indexOf(label) == -1) {
						var el = options && options.target ? options.target : this._node;

						el.removeEventListener(label, callback, options);
					}
					stack.splice(index, 1);
					this._listeners.set(label, stack);
					return true;
				}
			}
			return false;
		}
	}, {
		key: "dispatchEvent",
		value: function dispatchEvent(event) {
			var _this2 = this;

			if (!this._listeners.has(event.type)) {
				return true;
			}
			var stack = this._listeners.get(event.type);
			stack.forEach(function (listener) {
				if (listener.callback) listener.callback.call(_this2, event);
			});
			this._node.dispatchEvent(event);

			return !event.defaultPrevented;
		}
	}, {
		key: "addKeyListener",
		value: function addKeyListener(key, callback) {
			return this.addEventListener("key", callback, { key: key });
		}
	}, {
		key: "tabIndex",
		get: function get() {
			if (!this._node.hasAttribute("tabindex")) {
				return;
			}

			return this._node.tabIndex;
		},
		set: function set(number) {
			this._node.tabIndex = number;
		}
	}]);

	return Roletype;
}(_AccessibleNode3.default);

exports.default = Roletype;

},{"aomjs/src/AccessibleNode.js":1,"mousetrap":16,"object-path":17}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Structure2 = require("./Structure");

var _Structure3 = _interopRequireDefault(_Structure2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @extends Structure
 */
var Section = function (_Structure) {
  _inherits(Section, _Structure);

  function Section() {
    _classCallCheck(this, Section);

    return _possibleConstructorReturn(this, (Section.__proto__ || Object.getPrototypeOf(Section)).apply(this, arguments));
  }

  return Section;
}(_Structure3.default);

exports.default = Section;

},{"./Structure":51}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _managingFocus = require("./../../utils/managingFocus");

var _managingFocus2 = _interopRequireDefault(_managingFocus);

var _boolean = require("./../../type/boolean");

var _boolean2 = _interopRequireDefault(_boolean);

var _elements = require("./../../utils/elements");

var _elements2 = _interopRequireDefault(_elements);

var _Roletype2 = require("./Roletype");

var _Roletype3 = _interopRequireDefault(_Roletype2);

var _Option = require("./../Option.js");

var _Option2 = _interopRequireDefault(_Option);

var _jsMixin = require("@vestergaard-company/js-mixin");

var _jsMixin2 = _interopRequireDefault(_jsMixin);

var _selector = require("./../../utils/selector");

var _selector2 = _interopRequireDefault(_selector);

var _owns = require("./../../utils/owns");

var _owns2 = _interopRequireDefault(_owns);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * ### Keyboard Support
 *
 * #### Default
 * | Key | Function |
 * | --- | -------- |
 * | Down Arrow | Moves focus to the next option <br/> If not multiselectable, it selects the focused option.
 * | Up Arrow 	| Moves focus to the previous option  <br/> If not multiselectable, it selects the focused option.
 * | Home 			|	Moves focus to the first option  <br/> If not multiselectable, it selects the focused option.
 * | End  			|	Moves focus to the last option  <br/> If not multiselectable, it selects the focused option.
 *
 * #### Multiple selection
 * | Key | Function |
 * | --- | -------- |
 * | Space									| Changes the selection state of the focused option.
 * | Shift + Down Arrow 		| Moves focus to and selects the next option.
 * | Shift + Up Arrow 			| Moves focus to and selects the previous option.
 * | Control + Shift + Home |	Selects from the focused option to the beginning of the list.
 * | Control + Shift + End  | Selects from the focused option to the end of the list.
 * | Control + A 	          | Selects all options in the list. If all options are selected, unselects all options.
 *
 * ### Attributes
 * * `aria-selected`
 * 	* `true`
 * 		* is the current focussed element
 * 		* equals the value of `aria-activedescendant`
 * * `tabindex`
 * 	* allows usage of the element by keys when in focus
 * * `aria-activedescendant` equals ID of current focussed element
 * 
 * #### Multiple selection
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
var Select = function (_Roletype) {
	_inherits(Select, _Roletype);

	function Select() {
		var _ref;

		_classCallCheck(this, Select);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		// used for determining if logic should be executed
		var _this = _possibleConstructorReturn(this, (_ref = Select.__proto__ || Object.getPrototypeOf(Select)).call.apply(_ref, [this].concat(args)));

		_this.target = false;

		// when in focus, allow the element be controlled by the keys
		if (typeof _this.tabIndex !== "undefined") {
			_this._node.addEventListener("focus", hasTarget.bind(_this));
			_this._node.addEventListener("blur", lostTarget.bind(_this));
		}

		_this.addEventListener("key", _this.moveToStart.bind(_this), { key: "home", target: _this._node.ownerDocument });
		_this.addEventListener("key", _this.moveToPrev.bind(_this), { key: "up", target: _this._node.ownerDocument });
		_this.addEventListener("key", _this.moveToNext.bind(_this), { key: "down", target: _this._node.ownerDocument });
		_this.addEventListener("key", _this.moveToEnd.bind(_this), { key: "end", target: _this._node.ownerDocument });

		// this.addEventListener.call({ element: this._node.ownerDocument }, "home", this.moveToStart.bind(this));
		// this.addEventListener.call({ element: this._node.ownerDocument }, "up", this.moveToPrev.bind(this));
		// // this.addEventListener.call({ element: this._node.ownerDocument }, "shift + up", this.moveToNext.bind(this));
		// this.addEventListener.call({ element: this._node.ownerDocument }, "down", this.moveToNext.bind(this));
		// // this.addEventListener.call({ element: this._node.ownerDocument }, "shift + down", selectDown.bind(this));
		// this.addEventListener.call({ element: this._node.ownerDocument }, "end", this.moveToEnd.bind(this));

		_this.options = _owns2.default.getAllAllowedChildren(_this);
		_this.options.forEach(function (ay) {
			_this.addEventListener("click", _this.activeChanged.bind(_this), { target: ay._node });
			if (ay.selected) {
				_managingFocus2.default.add(ay);
			}
		});
		return _this;
	}

	_createClass(Select, [{
		key: "moveToPrev",
		value: function moveToPrev(ev) {
			move(this, ev, _managingFocus2.default.prev, this.moved.bind(this));
		}
	}, {
		key: "moveToNext",
		value: function moveToNext(ev) {
			move(this, ev, _managingFocus2.default.next, this.moved.bind(this));
		}
	}, {
		key: "moveToStart",
		value: function moveToStart(ev) {
			move(this, ev, _managingFocus2.default.start, this.moved.bind(this));
		}
	}, {
		key: "moveToEnd",
		value: function moveToEnd(ev) {
			move(this, ev, _managingFocus2.default.end, this.moved.bind(this));
		}
	}, {
		key: "moved",
		value: function moved(from, to) {}
	}, {
		key: "activeChanged",
		value: function activeChanged(ev) {
			var option = _elements2.default.get(ev.target);
			var prevFocus = _managingFocus2.default.get(this.options);
			_managingFocus2.default.remove(prevFocus);
			_managingFocus2.default.add(option);

			if (this.activeDescendant) this.activeDescendant = option;

			// update selected on keyevent when only one item can be selected
			if (!this.multiselectable) {
				_managingFocus2.default.setSelected(prevFocus, undefined);
			}
			_managingFocus2.default.setSelected(option, _boolean2.default.toggle(option.selected));
		}
	}]);

	return Select;
}(_Roletype3.default);

function move(ay, ev, func, callback) {
	if (!ay.target) return;
	if (ev) ev.preventDefault();

	var prevFocus = _managingFocus2.default.get(ay.options);
	_managingFocus2.default.remove(prevFocus);
	// update selected on keyevent when only one item can be selected
	var currentFocus = func(ay.options, prevFocus);
	if (ay.activeDescendant) ay.activeDescendant = currentFocus;

	callback(prevFocus, currentFocus);
}

function hasTarget() {
	this.target = true;
}
function lostTarget() {
	this.target = false;
}

exports.default = Select;

},{"./../../type/boolean":57,"./../../utils/elements":60,"./../../utils/managingFocus":63,"./../../utils/owns":64,"./../../utils/selector":65,"./../Option.js":33,"./Roletype":48,"@vestergaard-company/js-mixin":8}],51:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Roletype2 = require("./Roletype");

var _Roletype3 = _interopRequireDefault(_Roletype2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @extends Roletype
 */
var Structure = function (_Roletype) {
  _inherits(Structure, _Roletype);

  function Structure() {
    _classCallCheck(this, Structure);

    return _possibleConstructorReturn(this, (Structure.__proto__ || Object.getPrototypeOf(Structure)).apply(this, arguments));
  }

  return Structure;
}(_Roletype3.default);

exports.default = Structure;

},{"./Roletype":48}],52:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Roletype2 = require("./Roletype");

var _Roletype3 = _interopRequireDefault(_Roletype2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @extends Roletype
 */
var Widget = function (_Roletype) {
  _inherits(Widget, _Roletype);

  function Widget() {
    _classCallCheck(this, Widget);

    return _possibleConstructorReturn(this, (Widget.__proto__ || Object.getPrototypeOf(Widget)).apply(this, arguments));
  }

  return Widget;
}(_Roletype3.default);

exports.default = Widget;

},{"./Roletype":48}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Roletype2 = require("./Roletype");

var _Roletype3 = _interopRequireDefault(_Roletype2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @extends Roletype
 */
var Window = function (_Roletype) {
  _inherits(Window, _Roletype);

  function Window() {
    _classCallCheck(this, Window);

    return _possibleConstructorReturn(this, (Window.__proto__ || Object.getPrototypeOf(Window)).apply(this, arguments));
  }

  return Window;
}(_Roletype3.default);

exports.default = Window;

},{"./Roletype":48}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _boolean = require("./../type/boolean");

var _boolean2 = _interopRequireDefault(_boolean);

var _getActive = require("./../utils/getActive");

var _getActive2 = _interopRequireDefault(_getActive);

var _Input2 = require("./abstract/Input");

var _Input3 = _interopRequireDefault(_Input2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @extends Input
 */
var Option = function (_Input) {
	_inherits(Option, _Input);

	function Option() {
		var _ref;

		_classCallCheck(this, Option);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_ref = Option.__proto__ || Object.getPrototypeOf(Option)).call.apply(_ref, [this].concat(args)));

		_this.addEventListener("click", _this.onClick.bind(_this));
		_this.addEventListener("key", _this.onClick.bind(_this), { key: "enter", target: document });
		_this.addEventListener("key", _this.onClick.bind(_this), { key: "space", target: document });
		// this.addKeyListener("Enter", selectItem.bind(this));
		return _this;
	}

	_createClass(Option, [{
		key: "onClick",
		value: function onClick(ev) {
			if (typeof _get(Option.prototype.__proto__ || Object.getPrototypeOf(Option.prototype), "onClick", this) == "function") _get(Option.prototype.__proto__ || Object.getPrototypeOf(Option.prototype), "onClick", this).call(this, ev);
			if (ev) ev.preventDefault();

			if (this == (0, _getActive2.default)()) {
				this.selected = _boolean2.default.toggle(this.selected);
			}
		}
	}]);

	return Option;
}(_Input3.default);

exports.default = Option;

},{"./../type/boolean":57,"./../utils/getActive":61,"./abstract/Input":45}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Textbox2 = require("./Textbox");

var _Textbox3 = _interopRequireDefault(_Textbox2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @extends Textbox
 */
var Searchbox = function (_Textbox) {
	_inherits(Searchbox, _Textbox);

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
	function Searchbox() {
		var _ref;

		_classCallCheck(this, Searchbox);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _possibleConstructorReturn(this, (_ref = Searchbox.__proto__ || Object.getPrototypeOf(Searchbox)).call.apply(_ref, [this].concat(args)));
	}

	return Searchbox;
}(_Textbox3.default);

exports.default = Searchbox;

},{"./Textbox":42}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.get = get;
exports.set = set;
exports.toggle = toggle;
var IS_ACTIVE = exports.IS_ACTIVE = "true",
    IS_NOT_ACTIVE = exports.IS_NOT_ACTIVE = "false";

/**
 * Returns the value of a given attribute
 * @param {AccessibleNode} ay 
 * @param {String} attributeName 
 * @return {String} attribute's value
 */
function get(ay, attributeName) {
	var value = ay._.rawAttrs.attributeName || ay.element.getAttribute(attributeName);
	if (value == undefined) return;
	return value;
}

/**
 * Sync the new value to the DOM
 * @param {AccessibleNode} ay 
 * @param {String} attributeName 
 * @param {String | Number } status 
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

exports.default = { IS_ACTIVE: IS_ACTIVE, IS_NOT_ACTIVE: IS_NOT_ACTIVE, get: get, set: set, toggle: toggle };

},{}],57:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.get = get;
exports.set = set;
exports.toggle = toggle;
var IS_ACTIVE = exports.IS_ACTIVE = true,
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

exports.default = { IS_ACTIVE: IS_ACTIVE, IS_NOT_ACTIVE: IS_NOT_ACTIVE, get: get, set: set, toggle: toggle };

},{}],58:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _create = require("./create");

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 
 */
var ValidityState = function ValidityState(ay) {
	_classCallCheck(this, ValidityState);

	Object.defineProperty(this, "_ay", {
		value: ay
	});
};

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
		get: function get() {
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
		get: function get() {
			return !!this._customError;
		}
	},

	/**
  * Returns true if the element’s value doesn’t match the provided pattern; false otherwise.
  * @type {Boolean}
  */
	patternMismatch: {
		enumerable: true,
		get: function get() {
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
		get: function get() {
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
		get: function get() {
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
		get: function get() {
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
		get: function get() {
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
		get: function get() {
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
		get: function get() {
			return false;
		}
	},

	/**
  * Returns true if the element has no value but is a required field; false otherwise.
  * @type {Boolean}
  */
	valueMissing: {
		enumerable: true,
		get: function get() {
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
		get: function get() {
			return !(this.badInput || this.customError || this.patternMismatch || this.rangeOverflow || this.rangeUnderflow || this.stepMismatch || this.tooLong || this.tooShort || this.typeMismatch || this.valueMissing);
		}
	}
});

exports.default = ValidityState;

},{"./create":59}],59:[function(require,module,exports){
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

var obj = { Button: _Button2.default, Checkbox: _Checkbox2.default, Combobox: _Combobox2.default, Dialog: _Dialog2.default, Form: _Form2.default, Listbox: _Listbox2.default,
	Option: _option2.default, Range: _Range2.default, Roletype: _Roletype2.default, Searchbox: _searchbox2.default, Slider: _Slider2.default, Spinbutton: _Spinbutton2.default,
	Tab: _Tab2.default, Tablist: _Tablist2.default, Tabpanel: _Tabpanel2.default, Textbox: _Textbox2.default, Link: _Link2.default, Switch: _Switch2.default,
	Radiogroup: _Radiogroup2.default, Radio: _Radio2.default
};

function all() {
	for (var key in obj) {
		var nodeList = document.querySelectorAll(_selector2.default.getRole(key.toLowerCase()));
		for (var i = 0; i < nodeList.length; i++) {
			_elements2.default.set(nodeList[i], new obj[key](nodeList[i]));
		}
	}
}

function one(el) {
	if (_elements2.default.has(el)) return _elements2.default.get(el);
	var role = (0, _getComputedRole2.default)(el);

	/** @todo Remove fallback method */
	var constructor = obj[role] || _Roletype2.default;

	return _elements2.default.set(el, new constructor(el));
}

function instanceOf(ay, role) {
	return ay instanceof obj[role];
}

exports.default = { all: all, one: one, instanceOf: instanceOf };

},{"./../role/Button":26,"./../role/Checkbox":27,"./../role/Combobox":28,"./../role/Dialog":29,"./../role/Form":30,"./../role/Link":31,"./../role/Listbox":32,"./../role/Radio":34,"./../role/Radiogroup":35,"./../role/Slider":36,"./../role/Spinbutton":37,"./../role/Switch":38,"./../role/Tab":39,"./../role/Tablist":40,"./../role/Tabpanel":41,"./../role/Textbox":42,"./../role/abstract/Range":47,"./../role/abstract/Roletype":48,"./../role/option":54,"./../role/searchbox":55,"./elements":60,"./getComputedRole":62,"./selector":65}],60:[function(require,module,exports){
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
	var element = ay.element;

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

	owns.forEach(function (child) {
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

	var children = getChildren(parent, role);
	var indexPrevElement = Array.prototype.indexOf.call(children, child) - 1;
	if (indexPrevElement < 0) return false;

	return children[indexPrevElement];
}

function getNext(child, parent, role) {
	if (!parent) return false;

	var children = getChildren(parent, role);
	var indexNext = Array.prototype.indexOf.call(children, child) + 1;
	if (indexNext >= children.length) return false;

	return children[indexNext];
}

function getStart(child, parent, role) {
	if (!parent) return false;
	var children = getChildren(parent, role);
	return children[0];
}

function getEnd(child, parent, role) {
	if (!parent) return false;
	var children = getChildren(parent, role);
	return children[children.length - 1];
}

exports.default = {
	map: ayInstances,
	get: ayInstances.get.bind(ayInstances),
	set: ayInstances.set.bind(ayInstances),
	has: ayInstances.has.bind(ayInstances),
	getChildren: getChildren,
	getParent: getParent,
	getPrev: getPrev,
	getNext: getNext,
	getStart: getStart,
	getEnd: getEnd
};

},{"./create":59,"./getComputedRole":62}],61:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	var ay = _elements2.default.get(document.activeElement);

	if (!ay) return;
	if (ay.activeDescendant) return ay.activeDescendant;

	return ay;
};

var _elements = require("./elements");

var _elements2 = _interopRequireDefault(_elements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./elements":60}],62:[function(require,module,exports){
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
	a: function a(el, role) {
		if (el.href) {
			return hasAllowedRole("aWithHref", role) ? role : "link";
		} else {
			return role;
		}
	},
	area: function area(el, role) {
		if (el.href) return role ? null : "link";
		return role;
	},
	article: function article(el, role) {
		return hasAllowedRole("article", role) ? role : "article";
	},
	aside: function aside(el, role) {
		return hasAllowedRole("aside", role) ? role : "complementary";
	},
	audio: function audio(el, role) {
		return role == "application" ? "application" : null;
	},
	base: function base() {
		return null;
	},
	body: function body() {
		return "document";
	},
	button: function button(el, role) {
		if (el.type == "menu") {
			return role == "menuitem" ? "menuitem" : "button";
		}
		return hasAllowedRole("button", role) ? role : "button";
	},
	caption: function caption() {
		return null;
	},
	col: function col() {
		return null;
	},
	colgroup: function colgroup() {
		return null;
	},
	datalist: function datalist() {
		return "listbox";
	},
	dd: function dd() {
		return "definition";
	},
	details: function details() {
		return "group";
	},
	dialog: function dialog(el, role) {
		return role == "alertdialog" ? "alertdialog" : "dialog";
	},
	dl: function dl(el, role) {
		return hasAllowedRole("dl", role) ? role : "list";
	},
	dt: function dt() {
		return "listitem";
	},
	embed: function embed(el, role) {
		return hasAllowedRole("embed", role) ? role : null;
	},
	figcaption: function figcaption(el, role) {
		return hasAllowedRole("figcaption", role) ? role : null;
	},
	fieldset: function fieldset(el, role) {
		return hasAllowedRole("fieldset", role) ? role : null;
	},
	figure: function figure(el, role) {
		return hasAllowedRole("figure", role) ? role : "figure";
	},
	footer: function footer(el, role) {
		var hasImplicitContentinfoRole = !getParentWithTagName(el, ["ARTICLE", "ASIDE", "MAIN", "NAV", "SECTION"]);
		var hasAllowedRole = hasAllowedRole("footer", role);
		if (hasAllowedRole) {
			return role;
		} else if (hasImplicitContentinfoRole) {
			return "contentinfo";
		} else {
			return null;
		}
	},
	form: function form(el, role) {
		return hasAllowedRole("form", role) ? role : "form";
	},
	h1: function h1(el, role) {
		return hasAllowedRole("h1Toh6", role) ? role : "heading";
	},
	h2: function h2(el, role) {
		return hasAllowedRole("h1Toh6", role) ? role : "heading";
	},
	h3: function h3(el, role) {
		return hasAllowedRole("h1Toh6", role) ? role : "heading";
	},
	h4: function h4(el, role) {
		return hasAllowedRole("h1Toh6", role) ? role : "heading";
	},
	h5: function h5(el, role) {
		return hasAllowedRole("h1Toh6", role) ? role : "heading";
	},
	h6: function h6(el, role) {
		return hasAllowedRole("h1Toh6", role) ? role : "heading";
	},
	head: function head() {
		return null;
	},
	header: function header(el, role) {
		var hasImplicitBannerRole = !getParentWithTagName(el, ["ARTICLE", "ASIDE", "MAIN", "NAV", "SECTION"]);
		var hasAllowedRole = hasAllowedRole("header", role);
		if (hasAllowedRole) {
			return role;
		} else if (hasImplicitBannerRole) {
			return "banner";
		} else {
			return null;
		}
	},
	hr: function hr(el, role) {
		return hasAllowedRole("hr", role) ? role : "seperator";
	},
	html: function html() {
		return null;
	},
	iframe: function iframe(el, role) {
		return hasAllowedRole("iframe", role) ? role : null;
	},
	img: function img(el, role) {
		var hasAllowedEmptyAltRole = hasAllowedRole("imgWithEmptyAlt", role);

		if (el.alt) {
			// any role exept the roles used by empty alt values
			return hasAllowedEmptyAltRole ? "img" : role;
		} else {
			return hasAllowedEmptyAltRole ? role : null;
		}
	},
	input: function input(el, role) {
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
	keygen: function keygen() {
		return null;
	},
	label: function label() {
		return null;
	},
	legend: function legend() {
		return null;
	},
	li: function li(el, role) {
		var hasImplicitListitemRole = getParentWithTagName(el, ["OL", "UL"]);

		if (hasImplicitListitemRole) {
			return hasAllowedRole("li", role) ? role : "listitem";
		} else {
			return role;
		}
	},
	link: function link(el, role) {
		if (el.href) return role ? null : "link";
		return role;
	},
	main: function main() {
		return "main";
	},
	map: function map() {
		return null;
	},
	math: function math() {
		return "math";
	},
	menu: function menu(el, role) {
		return el.type == "context" ? "menu" : role;
	},
	menuitem: function menuitem(el, role) {
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
	meta: function meta() {
		return null;
	},
	meter: function meter() {
		return null;
	},
	nav: function nav(el, role) {
		return hasAllowedRole("nav", role) ? role : "navigation";
	},
	noscript: function noscript() {
		return null;
	},
	object: function object(el, role) {
		return hasAllowedRole("object", role) ? role : null;
	},
	ol: function ol(el, role) {
		return hasAllowedRole("ol", role) ? role : "list";
	},
	optgroup: function optgroup() {
		return "group";
	},
	option: function option(el) {
		var withinOptionList = ["select", "optgroup", "datalist"].indexOf(el.parentNode) > -1;
		return withinOptionList ? "option" : null;
	},
	output: function output(el, role) {
		return role ? role : "status";
	},
	param: function param() {
		return null;
	},
	picture: function picture() {
		return null;
	},
	progress: function progress() {
		return "progressbar";
	},
	script: function script() {
		return null;
	},
	section: function section(el, role) {
		var hasValidRole = hasAllowedRole("section", role);
		if (hasValidRole) return role;

		// only if accessible name
		if (el.title || el.hasAttribute("aria-label") || el.hasAttribute("aria-labelledby")) {
			return "section";
		} else {
			return role;
		}
	},
	select: function select(el, role) {
		if (el.multiple && el.size > 1) {
			return "listbox";
		} else if (!el.multiple && el.size <= 1) {
			return role == "menu" ? role : "combobox";
		}

		return role;
	},
	source: function source() {
		return null;
	},
	style: function style() {
		return null;
	},
	svg: function svg(el, role) {
		return hasAllowedRole("svg", role) ? role : null;
	},
	summary: function summary() {
		return "button";
	},
	table: function table(el, role) {
		return role ? role : "table";
	},
	template: function template() {
		return null;
	},
	textarea: function textarea() {
		return "textbox";
	},
	thead: function thead(el, role) {
		return role ? role : "rowgroup";
	},
	tbody: function tbody(el, role) {
		return role ? role : "rowgroup";
	},
	tfoot: function tfoot(el, role) {
		return role ? role : "rowgroup";
	},
	title: function title() {
		return null;
	},
	td: function td(el, role) {
		return getParentWithTagName(el, ["TABLE"]) ? "cell" : role;
	},
	th: function th(el, role) {
		if (role) return role;
		return getParentWithTagName(el, ["THEAD"]) ? "columnheader" : "rowheader";
	},
	tr: function tr(el, role) {
		// role=row, may be explicitly declared when child of a table element with role=grid
		return role ? role : "row";
	},
	track: function track() {
		return null;
	},
	ul: function ul(el, role) {
		return hasAllowedRole("ul", role) ? role : "list";
	},
	video: function video(el, role) {
		return role == "application" ? "application" : null;
	}
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

},{"./../data/roles.js":23}],63:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * Scrolls an element into its parent view
 * @param {Element} child Element to show
 */
function scrollIntoView(child) {
	var parent = child.offsetParent;
	if (parent && parent.scrollHeight > parent.clientHeight) {
		var scrollBottom = parent.clientHeight + parent.scrollTop;
		var elementBottom = child.offsetTop + child.offsetHeight;
		if (elementBottom > scrollBottom) {
			parent.scrollTop = elementBottom - parent.clientHeight;
		} else if (child.offsetTop < parent.scrollTop) {
			parent.scrollTop = child.offsetTop;
		}
	}
}

/**
 * Adds focus to the first element
 * @param {Array} descendants Array of all descendants
 */
function start(descendants) {
	return add(descendants[0]);
}

/**
 * Adds focus to the prev element
 * @param {Array} descendants Array of all descendants
 * @param {Object} 	child 			Current focused element
 */
function prev(descendants, child) {
	// find index of current element
	var i = descendants.indexOf(child);
	if (i <= 0) i = 1;

	return add(descendants[i - 1]);
}

/**
 * Adds focus to the next element
 * @param {Array} 	descendants Array of all descendants
 * @param {Object} 	child 			Current focused element
 */
function next(descendants, child) {
	// find index of current element
	var i = descendants.indexOf(child);
	if (i > descendants.length - 2) i = descendants.length - 2;

	return add(descendants[i + 1]);
}

/**
 * Adds focus to the last element
 * @param {Array} descendants Array of all descendants
 */
function end(descendants) {
	return add(descendants[descendants.length - 1]);
}

function add(child) {
	child._node.classList.add("ay-hover");
	scrollIntoView(child._node);
	return child;
}

function remove(child) {
	child._node.classList.remove("ay-hover");
	return child;
}

function get(descendants) {
	var ay = descendants.find(function (aom) {
		return aom._node.classList.contains("ay-hover");
	});
	if (!ay) return descendants[0];
	return ay;
}

function setSelected(ay, val) {
	ay.selected = val;
}

function getDescendants(ay) {}

exports.default = {
	start: start,
	prev: prev,
	next: next,
	end: end,
	add: add,
	remove: remove,
	get: get,
	setSelected: setSelected,
	getDescendants: getDescendants
};

},{}],64:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAllChildren = getAllChildren;
exports.getAllAllowedChildren = getAllAllowedChildren;

var _selector = require('./selector');

var _selector2 = _interopRequireDefault(_selector);

var _create = require('./create');

var _create2 = _interopRequireDefault(_create);

var _elements = require('./elements');

var _elements2 = _interopRequireDefault(_elements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function getAllChildren(ay) {
    if (ay._node.childElementCount > 0 && ay.owns !== null && ay.owns.lengh > 0) {
        return Array.from(ay._node.children).concat(ay.owns);
    } else if (ay._node.childElementCount > 0) {
        return Array.from(ay._node.children);
    } else if (ay.owns !== null && ay.owns.length > 0) {
        return Array.from(ay.owns);
    } else {
        return [];
    }
}

function getAllAllowedChildren(ay) {
    var _ref;

    // flatten version of all roles allowed
    var allowedRoles = (_ref = []).concat.apply(_ref, _toConsumableArray(Object.values(_selector2.default.getOwns(ay.role))));
    var children = getAllChildren(ay);

    // get all objects of 20y per element
    var ayChildren = children.map(function (child) {
        if (!_elements2.default.has(child)) _create2.default.one(child);

        return _elements2.default.get(child);
    });

    return ayChildren.filter(function (child) {
        return allowedRoles.indexOf(child.role) > -1;
    });
}

exports.default = { getAllChildren: getAllChildren, getAllAllowedChildren: getAllAllowedChildren };

},{"./create":59,"./elements":60,"./selector":65}],65:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getRole = getRole;
exports.get = get;
exports.getDeepRole = getDeepRole;
exports.getDeep = getDeep;
exports.getOwns = getOwns;

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

	var selector = [];
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

	var selector = [];
	selector.push(getRole(key));

	if (_roles2.default[key].sub) {
		_roles2.default[key].sub.forEach(function (val) {
			return selector.push(getRole(val));
		});
	}

	return selector;
}

function getDeepRole(key) {
	return getDeepRoleArray(key).join(", ");
}

function getDeepSelectorArray(key) {
	if (!_roles2.default[key]) return;

	var selector = [];
	selector = selector.concat(getSelectorArray(key));

	if (_roles2.default[key].sub) {
		_roles2.default[key].sub.forEach(function (val) {
			return selector = selector.concat(getSelectorArray(val));
		});
	}

	return selector;
}

function getDeep(key) {
	return getDeepSelectorArray(key).join(", ");
}

function getOwns(key) {
	return _roles2.default[key].owns;
}

exports.default = { getRole: getRole, get: get, getDeepRole: getDeepRole, getDeep: getDeep, getOwns: getOwns };

},{"./../data/roles":23}]},{},[18])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLlxcYW9tanNcXHNyY1xcQWNjZXNzaWJsZU5vZGUuanMiLCIuLlxcYW9tanNcXHNyY1xcQWNjZXNzaWJsZU5vZGVMaXN0LmpzIiwiLi5cXGFvbWpzXFxzcmNcXERPTVN0cmluZy5qcyIsIi4uXFxhb21qc1xcc3JjXFxFdmVudFRhcmdldC5qcyIsIi4uXFxhb21qc1xcc3JjXFxib29sZWFuLmpzIiwiLi5cXGFvbWpzXFxzcmNcXGRvdWJsZS5qcyIsIi4uXFxhb21qc1xcc3JjXFxsb25nLmpzIiwibm9kZV9tb2R1bGVzXFxAdmVzdGVyZ2FhcmQtY29tcGFueVxcanMtbWl4aW5cXGluZGV4LmpzIiwibm9kZV9tb2R1bGVzXFxAdmVzdGVyZ2FhcmQtY29tcGFueVxcanMtbWl4aW5cXHNyY1xcQnVpbGRlci5qcyIsIm5vZGVfbW9kdWxlc1xcQHZlc3RlcmdhYXJkLWNvbXBhbnlcXGpzLW1peGluXFxzcmNcXERlY29yYXRvcnNcXEJhcmVNaXhpbi5qcyIsIm5vZGVfbW9kdWxlc1xcQHZlc3RlcmdhYXJkLWNvbXBhbnlcXGpzLW1peGluXFxzcmNcXERlY29yYXRvcnNcXENhY2hlZC5qcyIsIm5vZGVfbW9kdWxlc1xcQHZlc3RlcmdhYXJkLWNvbXBhbnlcXGpzLW1peGluXFxzcmNcXERlY29yYXRvcnNcXEhhc0luc3RhbmNlLmpzIiwibm9kZV9tb2R1bGVzXFxAdmVzdGVyZ2FhcmQtY29tcGFueVxcanMtbWl4aW5cXHNyY1xcVXRpbHNcXHdyYXAuanMiLCJub2RlX21vZHVsZXNcXEB2ZXN0ZXJnYWFyZC1jb21wYW55XFxqcy1taXhpblxcc3JjXFxkZWNsYXJlLmpzIiwibm9kZV9tb2R1bGVzXFxAdmVzdGVyZ2FhcmQtY29tcGFueVxcanMtbWl4aW5cXHNyY1xcbWl4LmpzIiwibm9kZV9tb2R1bGVzL21vdXNldHJhcC9tb3VzZXRyYXAuanMiLCJub2RlX21vZHVsZXMvb2JqZWN0LXBhdGgvaW5kZXguanMiLCJzcmNcXGFwcC5qcyIsInNyY1xcYXR0cmlidXRlc1xcYXJpYS1jaGVja2VkLmpzIiwic3JjXFxhdHRyaWJ1dGVzXFxhcmlhLWV4cGFuZGVkLmpzIiwic3JjXFxhdHRyaWJ1dGVzXFxhcmlhLXByZXNzZWQuanMiLCJzcmNcXGF0dHJpYnV0ZXNcXGFyaWEtc2VsZWN0ZWQuanMiLCJzcmNcXGRhdGFcXHJvbGVzLmpzIiwic3JjXFxtaXhpbnNcXFNlbGVjdGlvbi5qcyIsInNyY1xcbWl4aW5zXFxWYWxpZGF0aW9uLmpzIiwic3JjXFxyb2xlXFxCdXR0b24uanMiLCJzcmNcXHJvbGVcXENoZWNrYm94LmpzIiwic3JjXFxyb2xlXFxDb21ib2JveC5qcyIsInNyY1xccm9sZVxcRGlhbG9nLmpzIiwic3JjXFxyb2xlXFxGb3JtLmpzIiwic3JjXFxyb2xlXFxMaW5rLmpzIiwic3JjXFxyb2xlXFxMaXN0Ym94LmpzIiwic3JjXFxyb2xlXFxPcHRpb24uanMiLCJzcmNcXHJvbGVcXFJhZGlvLmpzIiwic3JjXFxyb2xlXFxSYWRpb2dyb3VwLmpzIiwic3JjXFxyb2xlXFxTbGlkZXIuanMiLCJzcmNcXHJvbGVcXFNwaW5idXR0b24uanMiLCJzcmNcXHJvbGVcXFN3aXRjaC5qcyIsInNyY1xccm9sZVxcVGFiLmpzIiwic3JjXFxyb2xlXFxUYWJsaXN0LmpzIiwic3JjXFxyb2xlXFxUYWJwYW5lbC5qcyIsInNyY1xccm9sZVxcVGV4dGJveC5qcyIsInNyY1xccm9sZVxcYWJzdHJhY3RcXENvbW1hbmQuanMiLCJzcmNcXHJvbGVcXGFic3RyYWN0XFxDb21wb3NpdGUuanMiLCJzcmNcXHJvbGVcXGFic3RyYWN0XFxJbnB1dC5qcyIsInNyY1xccm9sZVxcYWJzdHJhY3RcXExhbmRtYXJrLmpzIiwic3JjXFxyb2xlXFxhYnN0cmFjdFxcUmFuZ2UuanMiLCJzcmNcXHJvbGVcXGFic3RyYWN0XFxSb2xldHlwZS5qcyIsInNyY1xccm9sZVxcYWJzdHJhY3RcXFNlY3Rpb24uanMiLCJzcmNcXHJvbGVcXGFic3RyYWN0XFxTZWxlY3QuanMiLCJzcmNcXHJvbGVcXGFic3RyYWN0XFxTdHJ1Y3R1cmUuanMiLCJzcmNcXHJvbGVcXGFic3RyYWN0XFxXaWRnZXQuanMiLCJzcmNcXHJvbGVcXGFic3RyYWN0XFxXaW5kb3cuanMiLCJzcmNcXHJvbGVcXG9wdGlvbi5qcyIsInNyY1xccm9sZVxcc2VhcmNoYm94LmpzIiwic3JjXFx0eXBlXFxET01TdHJpbmcuanMiLCJzcmNcXHR5cGVcXGJvb2xlYW4uanMiLCJzcmNcXHV0aWxzXFxWYWxpZGl0eVN0YXRlLmpzIiwic3JjXFx1dGlsc1xcY3JlYXRlLmpzIiwic3JjXFx1dGlsc1xcZWxlbWVudHMuanMiLCJzcmNcXHV0aWxzXFxnZXRBY3RpdmUuanMiLCJzcmNcXHV0aWxzXFxnZXRDb21wdXRlZFJvbGUuanMiLCJzcmNcXHV0aWxzXFxtYW5hZ2luZ0ZvY3VzLmpzIiwic3JjXFx1dGlsc1xcb3ducy5qcyIsInNyY1xcdXRpbHNcXHNlbGVjdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0FBRUE7QUFDQSxJQUFJLGFBQWEsQ0FDaEIsTUFEZ0IsRUFDUix1QkFEUSxFQUNpQixhQURqQixFQUNnQyxtQkFEaEMsRUFDcUQsV0FEckQsRUFDa0UsY0FEbEUsRUFFaEIsZUFGZ0IsRUFFQyxlQUZELEVBRWtCLGNBRmxCLEVBRWtDLGVBRmxDLEVBRW1ELGNBRm5ELEVBRW1FLGtCQUZuRSxFQUdoQixjQUhnQixFQUdBLGVBSEEsRUFHaUIsaUJBSGpCLEVBR29DLG1CQUhwQyxFQUd5RCxlQUh6RCxFQUloQixhQUpnQixFQUlELGNBSkMsRUFJZSxlQUpmLEVBSWdDLGFBSmhDLEVBSStDLGNBSi9DLEVBSStELG1CQUovRCxFQUtoQixZQUxnQixFQUtGLGlCQUxFLEVBS2lCLFlBTGpCLEVBSytCLFdBTC9CLEVBSzRDLFlBTDVDLEVBSzBELGdCQUwxRCxFQU1oQixzQkFOZ0Is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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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aUJBQWlCLEdBQWpCLENBQWhCLENBQWxCO0FBQUEsR0FBdkI7QUFDQTs7QUFFRCxRQUFPLFFBQVA7QUFDQTs7QUFFTSxTQUFTLE9BQVQsQ0FBaUIsR0FBakIsRUFBc0I7QUFDNUIsUUFBTyxxQkFBcUIsR0FBckIsRUFBMEIsSUFBMUIsQ0FBK0IsSUFBL0IsQ0FBUDtBQUNBOztBQUVNLFNBQVMsT0FBVCxDQUFpQixHQUFqQixFQUFzQjtBQUM1QixRQUFPLGdCQUFNLEdBQU4sRUFBVyxJQUFsQjtBQUNBOztrQkFFYyxFQUFFLGdCQUFGLEVBQVcsUUFBWCxFQUFnQix3QkFBaEIsRUFBNkIsZ0JBQTdCLEVBQXNDLGdCQUF0QyxFIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBET01TdHJpbmcgZnJvbSBcIi4vRE9NU3RyaW5nXCI7XHJcbmltcG9ydCBib29sZWFuIGZyb20gXCIuL2Jvb2xlYW5cIjtcclxuaW1wb3J0IGRvdWJsZSBmcm9tIFwiLi9kb3VibGVcIjtcclxuaW1wb3J0IGxvbmcgZnJvbSBcIi4vbG9uZ1wiO1xyXG5pbXBvcnQgRXZlbnRUYXJnZXQgZnJvbSAnLi9FdmVudFRhcmdldCc7XHJcbmltcG9ydCB7IEFjY2Vzc2libGVOb2RlTGlzdENvbnN0cnVjdG9yIH0gZnJvbSAnLi8uLi9zcmMvQWNjZXNzaWJsZU5vZGVMaXN0LmpzJztcclxuXHJcbi8vIGFsbCBhdHRyaWJ1dGVzIHVzZWQgd2l0aGluIEFPTVxyXG52YXIgYXR0cmlidXRlcyA9IFtcclxuXHRcInJvbGVcIiwgXCJhcmlhLWFjdGl2ZWRlc2NlbmRhbnRcIiwgXCJhcmlhLWF0b21pY1wiLCBcImFyaWEtYXV0b2NvbXBsZXRlXCIsIFwiYXJpYS1idXN5XCIsIFwiYXJpYS1jaGVja2VkXCIsXHJcblx0XCJhcmlhLWNvbGNvdW50XCIsIFwiYXJpYS1jb2xpbmRleFwiLCBcImFyaWEtY29sc3BhblwiLCBcImFyaWEtY29udHJvbHNcIiwgXCJhcmlhLWN1cnJlbnRcIiwgXCJhcmlhLWRlc2NyaWJlZGJ5XCIsXHJcblx0XCJhcmlhLWRldGFpbHNcIiwgXCJhcmlhLWRpc2FibGVkXCIsIFwiYXJpYS1kcm9wZWZmZWN0XCIsIFwiYXJpYS1lcnJvcm1lc3NhZ2VcIiwgXCJhcmlhLWV4cGFuZGVkXCIsXHJcblx0XCJhcmlhLWZsb3d0b1wiLCBcImFyaWEtZ3JhYmJlZFwiLCBcImFyaWEtaGFzcG9wdXBcIiwgXCJhcmlhLWhpZGRlblwiLCBcImFyaWEtaW52YWxpZFwiLCBcImFyaWEta2V5c2hvcnRjdXRzXCIsXHJcblx0XCJhcmlhLWxhYmVsXCIsIFwiYXJpYS1sYWJlbGxlZGJ5XCIsIFwiYXJpYS1sZXZlbFwiLCBcImFyaWEtbGl2ZVwiLCBcImFyaWEtbW9kYWxcIiwgXCJhcmlhLW11bHRpbGluZVwiLFxyXG5cdFwiYXJpYS1tdWx0aXNlbGVjdGFibGVcIiwgXCJhcmlhLW9yaWVudGF0aW9uXCIsIFwiYXJpYS1vd25zXCIsIFwiYXJpYS1wbGFjZWhvbGRlclwiLCBcImFyaWEtcG9zaW5zZXRcIixcclxuXHRcImFyaWEtcHJlc3NlZFwiLCBcImFyaWEtcmVhZG9ubHlcIiwgXCJhcmlhLXJlbGV2YW50XCIsIFwiYXJpYS1yZXF1aXJlZFwiLCBcImFyaWEtcm9sZWRlc2NyaXB0aW9uXCIsXHJcblx0XCJhcmlhLXJvd2NvdW50XCIsIFwiYXJpYS1yb3dpbmRleFwiLCBcImFyaWEtcm93c3BhblwiLCBcImFyaWEtc2VsZWN0ZWRcIiwgXCJhcmlhLXNldHNpemVcIiwgXCJhcmlhLXNvcnRcIixcclxuXHRcImFyaWEtdmFsdWVtYXhcIiwgXCJhcmlhLXZhbHVlbWluXCIsIFwiYXJpYS12YWx1ZW5vd1wiLCBcImFyaWEtdmFsdWV0ZXh0XCJcclxuXTtcclxuXHJcbi8qKlxyXG4gKiBcclxuICogQHBhcmFtIHtNdXRhdGlvbn0gbXV0YXRpb25zIFxyXG4gKi9cclxuZnVuY3Rpb24gbXV0YXRpb25PYnNlcnZlckNhbGxiYWNrKG11dGF0aW9ucykge1xyXG5cdHZhciBhb20gPSB0aGlzO1xyXG5cclxuICAgIG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChtdXRhdGlvbikge1xyXG5cdFx0bGV0IGF0dHJOYW1lID0gbXV0YXRpb24uYXR0cmlidXRlTmFtZTtcclxuXHRcdGxldCBuZXdWYWx1ZSA9IGFvbS5fbm9kZS5hdHRyaWJ1dGVzW2F0dHJOYW1lXSA/IGFvbS5fbm9kZS5hdHRyaWJ1dGVzW2F0dHJOYW1lXS52YWx1ZSA6IHVuZGVmaW5lZDtcclxuXHRcdGxldCBvbGRWYWx1ZSA9IGFvbS5fdmFsdWVzW2F0dHJOYW1lXTtcclxuXHJcblx0XHRhb20uX2RlZmF1bHRWYWx1ZXNbYXR0ck5hbWVdID0gbmV3VmFsdWU7XHJcblx0XHQvLyBzdG9yZSB0aGUgZGVmYXVsdCB2YWx1ZXMgc2V0IGJ5IGFuIGFyaWEtKiBhdHRyaWJ1dGVcclxuXHRcdGlmIChuZXdWYWx1ZSAhPSBvbGRWYWx1ZSkge1xyXG5cdFx0XHRhb20uX2RlZmF1bHRWYWx1ZXNbYXR0ck5hbWVdID0gbmV3VmFsdWU7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gb3ZlcndyaXRlIHRoZSBhdHRyaWJ1dGUgaWYgQU9NIGhhcyBhbiBkaWZmZXJlbnQgZGVmaW5lZCB2YWx1ZVxyXG5cdFx0aWYgKG9sZFZhbHVlICYmIG5ld1ZhbHVlICE9IG9sZFZhbHVlKSB7XHJcblx0XHRcdGFvbVthdHRyTmFtZV0gPSBvbGRWYWx1ZTtcclxuXHRcdH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogQmFzZWQgb24gdGhlIEFPTSBzcGVjXHJcbiAqIEBjbGFzc1xyXG4gKi9cclxuY2xhc3MgQWNjZXNzaWJsZU5vZGUgZXh0ZW5kcyBFdmVudFRhcmdldCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlKSB7XHJcbiAgICAgICAgc3VwZXIobm9kZSk7XHJcblxyXG4gICAgICAgIC8vIHN0b3JlIHRoZSBub2RlIHdoZXJlIHRoZSBBY2Nlc3NpYmxlTm9kZSBpcyBjb25uZWN0ZWQgd2l0aFxyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiX25vZGVcIiwgeyB2YWx1ZTogbm9kZSB9KTtcclxuXHJcblx0XHQvLyBzZXQgYW4gaGlkZGVuIG9iamVjdCB0byBzdG9yZSBhbGwgdmFsdWVzIGluXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiX3ZhbHVlc1wiLCB7IHZhbHVlOiB7fX0pO1xyXG5cdFx0XHJcblx0XHQvLyBzdG9yZSB2YWx1ZXMgb2YgYXJpYS0qIGF0dHJpYnV0ZXNcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJfZGVmYXVsdFZhbHVlc1wiLCB7IHZhbHVlOiB7fX0pO1xyXG5cclxuXHRcdC8vIHN0YXJ0IHRoZSBtdXRhdGlvbiBvYnNlcnZlciBpZiB0aGUgQWNjZXNzaWJsZU5vZGUgaXMgY29ubmVjdGVkIHRvIGFuIG5vZGVcclxuXHRcdGlmKG5vZGUpIHtcclxuXHRcdFx0dmFyIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobXV0YXRpb25PYnNlcnZlckNhbGxiYWNrLmJpbmQodGhpcykpO1xyXG5cdFx0XHRvYnNlcnZlci5vYnNlcnZlKHRoaXMuX25vZGUsIHsgYXR0cmlidXRlczogdHJ1ZSwgYXR0cmlidXRlT2xkVmFsdWU6IHRydWUgfSk7XHJcblx0XHR9XHJcbiAgICB9XHJcbn1cclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKEFjY2Vzc2libGVOb2RlLnByb3RvdHlwZSxcclxuICAgIC8qKiBAbGVuZHMgQWNjZXNzaWJsZU5vZGUucHJvdG90eXBlICovXHJcbiAgICB7XHJcblx0XHQvKiogXHJcblx0XHQqIERlZmluZXMgYSB0eXBlIGl0IHJlcHJlc2VudHMsIGUuZy4gYHRhYmBcclxuXHRcdCogXHJcblx0XHQqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jcm9sZXNcclxuXHRcdCogQHR5cGUgIHs/U3RyaW5nfVxyXG5cdFx0Ki9cclxuICAgICAgICBcInJvbGVcIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAvLyB3cml0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgc2V0KHN0cikgeyByZXR1cm4gRE9NU3RyaW5nLnNldCh0aGlzLCBcInJvbGVcIiwgc3RyKTsgfSxcclxuICAgICAgICAgICAgZ2V0KCkgeyByZXR1cm4gRE9NU3RyaW5nLmdldCh0aGlzLCBcInJvbGVcIik7IH1cclxuICAgICAgICB9LFxyXG5cclxuXHRcdC8qKiBcclxuXHRcdCAqIERlZmluZXMgYSBodW1hbi1yZWFkYWJsZSwgYXV0aG9yLWxvY2FsaXplZCBkZXNjcmlwdGlvbiBmb3IgdGhlIHJvbGVcclxuXHRcdCAqIFxyXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXJvbGVkZXNjcmlwdGlvblxyXG5cdFx0ICogQHR5cGUgez9TdHJpbmd9XHJcblx0XHQgKi9cclxuICAgICAgICBcInJvbGVEZXNjcmlwdGlvblwiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNldChzdHIpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJhcmlhLXJvbGVEZXNjcmlwdGlvblwiLCBzdHIpOyB9LFxyXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1yb2xlRGVzY3JpcHRpb25cIik7IH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqIEFDQ0VTU0lCTEUgTEFCRUwgQU5EIERFU0NSSVBUSU9OICoqKioqKioqKioqKioqKioqKiogKi9cclxuXHJcblx0XHQvKiogXHJcblx0XHQqIERlZmluZXMgYSBzdHJpbmcgdmFsdWUgdGhhdCBsYWJlbHMgdGhlIGN1cnJlbnQgZWxlbWVudC5cclxuXHRcdCogXHJcblx0XHQqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1sYWJlbFxyXG5cdFx0KiBAdHlwZSB7P1N0cmluZ30gXHJcblx0XHQqL1xyXG4gICAgICAgIFwibGFiZWxcIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBzZXQoc3RyKSB7IHJldHVybiBET01TdHJpbmcuc2V0KHRoaXMsIFwiYXJpYS1sYWJlbFwiLCBzdHIpOyB9LFxyXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1sYWJlbFwiKTsgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qICoqKioqKioqKioqKioqKiBFTkQgT0YgQUNDRVNTSUJMRSBMQUJFTCBBTkQgREVTQ1JJUFRJT04gKioqKioqKioqKioqKioqICovXHJcblxyXG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKiBHTE9CQUwgU1RBVEVTIEFORCBQUk9QRVJUSUVTICoqKioqKioqKioqKioqKioqKioqKiAqL1xyXG5cclxuXHRcdC8qKiBcclxuXHRcdCAqIEluZGljYXRlcyB0aGUgZWxlbWVudCB0aGF0IHJlcHJlc2VudHMgdGhlIGN1cnJlbnQgaXRlbSB3aXRoaW4gYSBjb250YWluZXIgb3Igc2V0IG9mIHJlbGF0ZWQgZWxlbWVudHMuXHJcblx0XHQgKiBcclxuXHRcdCAqIHwgVmFsdWUgfCBEZXNjcmlwdGlvbiB8XHJcblx0XHQgKiB8IC0tLSB8IC0tLSB8XHJcblx0XHQgKiB8IHBhZ2UgfCB1c2VkIHRvIGluZGljYXRlIGEgbGluayB3aXRoaW4gYSBzZXQgb2YgcGFnaW5hdGlvbiBsaW5rcywgd2hlcmUgdGhlIGxpbmsgaXMgdmlzdWFsbHkgc3R5bGVkIHRvIHJlcHJlc2VudCB0aGUgY3VycmVudGx5LWRpc3BsYXllZCBwYWdlLlxyXG5cdFx0ICogfCBzdGVwIHwgdXNlZCB0byBpbmRpY2F0ZSBhIGxpbmsgd2l0aGluIGEgc3RlcCBpbmRpY2F0b3IgZm9yIGEgc3RlcC1iYXNlZCBwcm9jZXNzLCB3aGVyZSB0aGUgbGluayBpcyB2aXN1YWxseSBzdHlsZWQgdG8gcmVwcmVzZW50IHRoZSBjdXJyZW50IHN0ZXAuXHJcblx0XHQgKiB8IGxvY2F0aW9uIHwgdXNlZCB0byBpbmRpY2F0ZSB0aGUgaW1hZ2UgdGhhdCBpcyB2aXN1YWxseSBoaWdobGlnaHRlZCBhcyB0aGUgY3VycmVudCBjb21wb25lbnQgb2YgYSBmbG93IGNoYXJ0LlxyXG5cdFx0ICogfCBkYXRlIHwgdXNlZCB0byBpbmRpY2F0ZSB0aGUgY3VycmVudCBkYXRlIHdpdGhpbiBhIGNhbGVuZGFyLlxyXG5cdFx0ICogfCB0aW1lIHwgdXNlZCB0byBpbmRpY2F0ZSB0aGUgY3VycmVudCB0aW1lIHdpdGhpbiBhIHRpbWV0YWJsZS5cclxuXHRcdCAqIHwgdHJ1ZSB8IFJlcHJlc2VudHMgdGhlIGN1cnJlbnQgaXRlbSB3aXRoaW4gYSBzZXQuXHJcblx0XHQgKiB8IGZhbHNlIHwgRG9lcyBub3QgcmVwcmVzZW50IHRoZSBjdXJyZW50IGl0ZW0gd2l0aGluIGEgc2V0LlxyXG5cdFx0ICogXHJcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtY3VycmVudFxyXG5cdFx0ICogQHR5cGUgez9TdHJpbmd9XHJcblx0XHQgKi9cclxuICAgICAgICBcImN1cnJlbnRcIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBzZXQoc3RyKSB7IHJldHVybiBET01TdHJpbmcuc2V0KHRoaXMsIFwiYXJpYS1jdXJyZW50XCIsIHN0cik7IH0sXHJcbiAgICAgICAgICAgIGdldCgpIHsgcmV0dXJuIERPTVN0cmluZy5nZXQodGhpcywgXCJhcmlhLWN1cnJlbnRcIik7IH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKiBFTkQgT0YgR0xPQkFMIFNUQVRFUyBBTkQgUFJPUEVSVElFUyAqKioqKioqKioqKioqKioqKiAqL1xyXG5cclxuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKiBXSURHRVQgUFJPUEVSVElFUyAqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSW5kaWNhdGVzIHdoZXRoZXIgaW5wdXR0aW5nIHRleHQgY291bGQgdHJpZ2dlciBkaXNwbGF5IG9mIG9uZSBvciBtb3JlIHByZWRpY3Rpb25zIG9mIHRoZSB1c2VyJ3NcclxuXHRcdCAqIGludGVuZGVkIHZhbHVlIGZvciBhbiBpbnB1dCBhbmQgc3BlY2lmaWVzIGhvdyBwcmVkaWN0aW9ucyB3b3VsZCBiZSBwcmVzZW50ZWQgaWYgdGhleSBhcmUgbWFkZS5cclxuXHRcdCAqIFxyXG5cdFx0ICogVGhlIGJlaGF2aW9yIGR1cmluZyBpbnB1dCBpcyBkZXBlbmRzIG9uIHRoZSBwcm92aWRlZCB2YWx1ZSwgaXQgZm9sbG93cyBiZW5lYXRoIHRhYmxlLlxyXG5cdFx0ICogXHJcblx0XHQgKiB8IFZhbHVlICB8IFx0RGVzY3JpcHRpb24gfFxyXG5cdFx0ICogfCAtLS0tLS0gfCAtLS0gfFxyXG5cdFx0ICogfCBpbmxpbmUgfCBUZXh0IHN1Z2dlc3RpbmcgbWF5IGJlIGR5bmFtaWNhbGx5IGluc2VydGVkIGFmdGVyIHRoZSBjYXJldC5cclxuXHRcdCAqIHwgbGlzdCAgIHwgQSBjb2xsZWN0aW9uIG9mIHZhbHVlcyB0aGF0IGNvdWxkIGNvbXBsZXRlIHRoZSBwcm92aWRlZCBpbnB1dCBpcyBkaXNwbGF5ZWQuXHJcblx0XHQgKiB8IGJvdGggICB8IEltcGxlbWVudHMgYGlubGluZWAgYW5kIGBsaXN0YFxyXG5cdFx0ICogfCBub25lICAgfCBObyBwcmVkaWN0aW9uIGlzIHNob3duXHJcblx0XHQgKiBcclxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1hdXRvY29tcGxldGVcclxuXHRcdCAqIEB0eXBlIHs/U3RyaW5nfVxyXG5cdFx0ICovXHJcbiAgICAgICAgXCJhdXRvY29tcGxldGVcIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBzZXQoc3RyKSB7IHJldHVybiBET01TdHJpbmcuc2V0KHRoaXMsIFwiYXJpYS1hdXRvY29tcGxldGVcIiwgc3RyKTsgfSxcclxuICAgICAgICAgICAgZ2V0KCkgeyByZXR1cm4gRE9NU3RyaW5nLmdldCh0aGlzLCBcImFyaWEtYXV0b2NvbXBsZXRlXCIpOyB9XHJcbiAgICAgICAgfSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFJldHVybnMvc2V0cyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgZWxlbWVudCB3aG8gaXMgZXhwb3NlZCB0byBhbiBhY2Nlc3NpYmlsaXR5IEFQSS5cclxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI2Rpc2FibGVkfVxyXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWhpZGRlblxyXG5cdFx0ICogQHR5cGUgez9Cb29sZWFufVxyXG5cdFx0ICovXHJcbiAgICAgICAgXCJoaWRkZW5cIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBzZXQoc3RyKSB7IHJldHVybiBib29sZWFuLnNldCh0aGlzLCBcImFyaWEtaGlkZGVuXCIsIHN0cik7IH0sXHJcbiAgICAgICAgICAgIGdldCgpIHsgcmV0dXJuIGJvb2xlYW4uZ2V0KHRoaXMsIFwiYXJpYS1oaWRkZW5cIik7IH1cclxuICAgICAgICB9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSW5kaWNhdGVzIGtleWJvYXJkIHNob3J0Y3V0cyB0aGF0IGFuIGF1dGhvciBoYXMgaW1wbGVtZW50ZWQgdG8gYWN0aXZhdGUgb3JcclxuXHRcdCAqIGdpdmUgZm9jdXMgdG8gYW4gZWxlbWVudC5cclxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1rZXlzaG9ydGN1dHNcclxuXHRcdCAqIEB0eXBlIHs/U3RyaW5nfVxyXG5cdFx0ICovXHJcbiAgICAgICAgXCJrZXlTaG9ydGN1dHNcIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBzZXQoc3RyKSB7IHJldHVybiBET01TdHJpbmcuc2V0KHRoaXMsIFwiYXJpYS1rZXlTaG9ydGN1dHNcIiwgc3RyKTsgfSxcclxuICAgICAgICAgICAgZ2V0KCkgeyByZXR1cm4gRE9NU3RyaW5nLmdldCh0aGlzLCBcImFyaWEta2V5U2hvcnRjdXRzXCIpOyB9XHJcbiAgICAgICAgfSxcclxuXHJcblx0XHQvKiogXHJcblx0XHQgKiBJbmRpY2F0ZXMgd2hldGhlciBhbiBlbGVtZW50IGlzIG1vZGFsIHdoZW4gZGlzcGxheWVkLlxyXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLW1vZGFsXHJcblx0XHQgKiBAdHlwZSB7P0Jvb2xlYW59XHJcblx0XHQgKi9cclxuICAgICAgICBcIm1vZGFsXCI6IHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgc2V0KHN0cikgeyByZXR1cm4gYm9vbGVhbi5zZXQodGhpcywgXCJhcmlhLW1vZGFsXCIsIHN0cik7IH0sXHJcbiAgICAgICAgICAgIGdldCgpIHsgcmV0dXJuIGJvb2xlYW4uZ2V0KHRoaXMsIFwiYXJpYS1tb2RhbFwiKTsgfVxyXG4gICAgICAgIH0sXHJcblxyXG5cdFx0LyoqIFxyXG5cdFx0ICogSW5kaWNhdGVzIHdoZXRoZXIgYSB0ZXh0IGJveCBhY2NlcHRzIG11bHRpcGxlIGxpbmVzIG9mIGlucHV0IG9yIG9ubHkgYSBzaW5nbGUgbGluZS5cclxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1tdWx0aWxpbmVcclxuXHRcdCAqIEB0eXBlIHs/Qm9vbGVhbn1cclxuXHRcdCAqL1xyXG4gICAgICAgIFwibXVsdGlsaW5lXCI6IHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgc2V0KHN0cikgeyByZXR1cm4gYm9vbGVhbi5zZXQodGhpcywgXCJhcmlhLW11bHRpbGluZVwiLCBzdHIpOyB9LFxyXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiBib29sZWFuLmdldCh0aGlzLCBcImFyaWEtbXVsdGlsaW5lXCIpOyB9XHJcbiAgICAgICAgfSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluZGljYXRlcyB0aGF0IHRoZSB1c2VyIG1heSBzZWxlY3QgbW9yZSB0aGFuIG9uZSBpdGVtIGZyb20gdGhlIGN1cnJlbnQgc2VsZWN0YWJsZSBkZXNjZW5kYW50cy5cclxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1tdWx0aXNlbGVjdGFibGVcclxuXHRcdCAqIEB0eXBlIHs/Qm9vbGVhbn1cclxuXHRcdCAqL1xyXG4gICAgICAgIFwibXVsdGlzZWxlY3RhYmxlXCI6IHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgc2V0KHN0cikgeyByZXR1cm4gYm9vbGVhbi5zZXQodGhpcywgXCJhcmlhLW11bHRpc2VsZWN0YWJsZVwiLCBzdHIpOyB9LFxyXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiBib29sZWFuLmdldCh0aGlzLCBcImFyaWEtbXVsdGlzZWxlY3RhYmxlXCIpOyB9XHJcbiAgICAgICAgfSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBlbGVtZW50J3Mgb3JpZW50YXRpb24gaXMgYGhvcml6b250YWxgLCBgdmVydGljYWxgLCBvciBgbnVsbGAuXHJcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtb3JpZW50YXRpb25cclxuXHRcdCAqIEB0eXBlIHs/U3RyaW5nfVxyXG5cdFx0ICovXHJcbiAgICAgICAgXCJvcmllbnRhdGlvblwiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNldChzdHIpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJhcmlhLW9yaWVudGF0aW9uXCIsIHN0cik7IH0sXHJcbiAgICAgICAgICAgIGdldCgpIHsgcmV0dXJuIERPTVN0cmluZy5nZXQodGhpcywgXCJhcmlhLW9yaWVudGF0aW9uXCIpOyB9XHJcbiAgICAgICAgfSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluZGljYXRlcyB0aGF0IHRoZSB1c2VyIG1heSBzZWxlY3QgbW9yZSB0aGFuIG9uZSBpdGVtIGZyb20gdGhlIGN1cnJlbnQgc2VsZWN0YWJsZSBkZXNjZW5kYW50cy5cclxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1yZWFkb25seVxyXG5cdFx0ICogQHR5cGUgez9Cb29sZWFufVxyXG5cdFx0ICovXHJcbiAgICAgICAgXCJyZWFkT25seVwiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNldChzdHIpIHsgcmV0dXJuIGJvb2xlYW4uc2V0KHRoaXMsIFwiYXJpYS1yZWFkT25seVwiLCBzdHIpOyB9LFxyXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiBib29sZWFuLmdldCh0aGlzLCBcImFyaWEtcmVhZE9ubHlcIik7IH1cclxuICAgICAgICB9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSW5kaWNhdGVzIHRoYXQgdXNlciBpbnB1dCBpcyByZXF1aXJlZCBvbiB0aGUgZWxlbWVudCBiZWZvcmUgYSBmb3JtIG1heSBiZSBzdWJtaXR0ZWQuXHJcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtcmVxdWlyZWRcclxuXHRcdCAqIEB0eXBlIHs/Qm9vbGVhbn1cclxuXHRcdCAqL1xyXG4gICAgICAgIFwicmVxdWlyZWRcIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBzZXQoc3RyKSB7IHJldHVybiBib29sZWFuLnNldCh0aGlzLCBcImFyaWEtcmVxdWlyZWRcIiwgc3RyKTsgfSxcclxuICAgICAgICAgICAgZ2V0KCkgeyByZXR1cm4gYm9vbGVhbi5nZXQodGhpcywgXCJhcmlhLXJlcXVpcmVkXCIpOyB9XHJcbiAgICAgICAgfSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluZGljYXRlcyB0aGF0IHVzZXIgaW5wdXQgaXMgcmVxdWlyZWQgb24gdGhlIGVsZW1lbnQgYmVmb3JlIGEgZm9ybSBtYXkgYmUgc3VibWl0dGVkLlxyXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXNlbGVjdGVkXHJcblx0XHQgKiBAdHlwZSB7P0Jvb2xlYW59XHJcblx0XHQgKi9cclxuICAgICAgICBcInNlbGVjdGVkXCI6IHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgc2V0KHN0cikgeyByZXR1cm4gYm9vbGVhbi5zZXQodGhpcywgXCJhcmlhLXNlbGVjdGVkXCIsIHN0cik7IH0sXHJcbiAgICAgICAgICAgIGdldCgpIHsgcmV0dXJuIGJvb2xlYW4uZ2V0KHRoaXMsIFwiYXJpYS1zZWxlY3RlZFwiKTsgfVxyXG4gICAgICAgIH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbmRpY2F0ZXMgaWYgaXRlbXMgaW4gYSB0YWJsZSBvciBncmlkIGFyZSBzb3J0ZWQgaW4gYXNjZW5kaW5nIG9yIGRlc2NlbmRpbmcgb3JkZXIuICBcclxuXHRcdCAqIFBvc3NpYmxlIHZhbHVlcyBhcmUgYGFjZW5kaW5nYCwgYGRlc2NlbmRpbmdgLCBgbm9uZWAsIGBvdGhlcmAgb3IgYG51bGxgLlxyXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXNvcnRcclxuXHRcdCAqIEB0eXBlIHs/Qm9vbGVhbn1cclxuXHRcdCAqL1xyXG4gICAgICAgIFwic29ydFwiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNldChzdHIpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJhcmlhLXNvcnRcIiwgc3RyKTsgfSxcclxuICAgICAgICAgICAgZ2V0KCkgeyByZXR1cm4gRE9NU3RyaW5nLmdldCh0aGlzLCBcImFyaWEtc29ydFwiKTsgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqIEVORCBPRiBXSURHRVQgUFJPUEVSVElFUyAqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG5cclxuXHJcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogV0lER0VUIFNUQVRFUyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbmRpY2F0ZXMgdGhlIGN1cnJlbnQgXCJjaGVja2VkXCIgc3RhdGUgb2YgYSB7QGxpbmsgV2lkZ2V0fSwgYW1vbmcge0BsaW5rIFJhZGlvfSBhbmQge0BsaW5rIENoZWNrYm94fVxyXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjcHJlc3NlZH1cclxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI3NlbGVjdGVkfVxyXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXByZXNzZWRcclxuXHRcdCAqIEB0eXBlIHs/U3RyaW5nfVxyXG5cdFx0ICovXHJcbiAgICAgICAgXCJjaGVja2VkXCI6IHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgc2V0KHN0cikgeyByZXR1cm4gRE9NU3RyaW5nLnNldCh0aGlzLCBcImFyaWEtY2hlY2tlZFwiLCBzdHIpOyB9LFxyXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1jaGVja2VkXCIpOyB9XHJcbiAgICAgICAgfSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBlbGVtZW50LCBvciBhbm90aGVyIGdyb3VwaW5nIGVsZW1lbnQgaXQgY29udHJvbHMsIFxyXG5cdFx0ICogaXMgY3VycmVudGx5IGV4cGFuZGVkIG9yIGNvbGxhcHNlZC5cclxuXHRcdCAqIFxyXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWV4cGFuZGVkXHJcblx0XHQgKiBAdHlwZSB7P0Jvb2xlYW59XHJcblx0XHQgKi9cclxuICAgICAgICBcImV4cGFuZGVkXCI6IHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgc2V0KHN0cikgeyByZXR1cm4gYm9vbGVhbi5zZXQodGhpcywgXCJhcmlhLWV4cGFuZGVkXCIsIHN0cik7IH0sXHJcbiAgICAgICAgICAgIGdldCgpIHsgcmV0dXJuIGJvb2xlYW4uZ2V0KHRoaXMsIFwiYXJpYS1leHBhbmRlZFwiKTsgfVxyXG4gICAgICAgIH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbmRpY2F0ZXMgdGhhdCB0aGUgZWxlbWVudCBpcyBwZXJjZWl2YWJsZSBidXQgZGlzYWJsZWQsIHNvIGl0IGlzIG5vdCBlZGl0YWJsZSBvciBvdGhlcndpc2Ugb3BlcmFibGUuXHJcblx0XHQgKiBcclxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI2hpZGRlbn1cclxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI3JlYWRvbmx5fVxyXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWRpc2FibGVkXHJcblx0XHQgKiBAdHlwZSB7P0Jvb2xlYW59XHJcblx0XHQgKi9cclxuICAgICAgICBcImRpc2FibGVkXCI6IHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgc2V0KHN0cikgeyByZXR1cm4gYm9vbGVhbi5zZXQodGhpcywgXCJhcmlhLWRpc2FibGVkXCIsIHN0cik7IH0sXHJcbiAgICAgICAgICAgIGdldCgpIHsgcmV0dXJuIGJvb2xlYW4uZ2V0KHRoaXMsIFwiYXJpYS1kaXNhYmxlZFwiKTsgfVxyXG4gICAgICAgIH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbmRpY2F0ZXMgdGhlIGVudGVyZWQgdmFsdWUgZG9lcyBub3QgY29uZm9ybSB0byB0aGUgZm9ybWF0IGV4cGVjdGVkIGJ5IHRoZSBhcHBsaWNhdGlvbi5cclxuXHRcdCAqIFxyXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjZXJyb3JNZXNzYWdlfVxyXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWVycm9ybWVzc2FnZVxyXG5cdFx0ICogQHR5cGUgez9TdHJpbmd9IFxyXG5cdFx0ICovXHJcbiAgICAgICAgXCJpbnZhbGlkXCI6IHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgc2V0KHN0cikgeyByZXR1cm4gRE9NU3RyaW5nLnNldCh0aGlzLCBcImFyaWEtaW52YWxpZFwiLCBzdHIpOyB9LFxyXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1pbnZhbGlkXCIpOyB9XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbmRpY2F0ZXMgdGhlIGF2YWlsYWJpbGl0eSBhbmQgdHlwZSBvZiBpbnRlcmFjdGl2ZSBwb3B1cCBlbGVtZW50LCBzdWNoIGFzIG1lbnUgb3IgZGlhbG9nLFxyXG5cdFx0ICogdGhhdCBjYW4gYmUgdHJpZ2dlcmVkIGJ5IGFuIGVsZW1lbnQuXHJcblx0XHQgKiBcclxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1oYXNwb3B1cFxyXG5cdFx0ICogQHR5cGUgez9TdHJpbmd9XHJcblx0XHQgKi9cclxuICAgICAgICBcImhhc1BvcFVwXCI6IHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgc2V0KHN0cikgeyByZXR1cm4gRE9NU3RyaW5nLnNldCh0aGlzLCBcImFyaWEtaGFzcG9wdXBcIiwgc3RyKTsgfSxcclxuICAgICAgICAgICAgZ2V0KCkgeyByZXR1cm4gRE9NU3RyaW5nLmdldCh0aGlzLCBcImFyaWEtaGFzcG9wdXBcIik7IH1cclxuICAgICAgICB9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSW5kaWNhdGVzIHRoZSBjdXJyZW50IFwiY2hlY2tlZFwiIHN0YXRlIG9mIGEge0BsaW5rIFdpZGdldH0sIGFtb25nIHtAbGluayBSYWRpb30gYW5kIHtAbGluayBDaGVja2JveH1cclxuXHRcdCAqIFxyXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjcHJlc3NlZH1cclxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI3NlbGVjdGVkfVxyXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXByZXNzZWRcclxuXHRcdCAqIEB0eXBlIHs/U3RyaW5nfVxyXG5cdFx0ICovXHJcbiAgICAgICAgXCJwcmVzc2VkXCI6IHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgc2V0KHN0cikgeyByZXR1cm4gRE9NU3RyaW5nLnNldCh0aGlzLCBcImFyaWEtcHJlc3NlZFwiLCBzdHIpOyB9LFxyXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1wcmVzc2VkXCIpOyB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKiBFTkQgT0YgV0lER0VUIFNUQVRFUyAqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG5cclxuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqIENPTlRST0wgVkFMVUVTICoqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuXHJcblx0XHQvKiogXHJcblx0XHQgKiBSZXR1cm5zIC8gc2V0cyB0aGUgaHVtYW4gcmVhZGFibGUgdGV4dCBhbHRlcm5hdGl2ZSBvZiB7QGxpbmsgI2FyaWEtdmFsdWVub3d9IGZvciBhIHtAbGluayBSYW5nZX0gd2lkZ2V0LlxyXG5cdFx0ICogXHJcblx0XHQgKiBAc2VlIHtAbGluayBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXZhbHVldGV4dH1cclxuXHRcdCAqIEB0eXBlIHs/U3RyaW5nfVxyXG5cdFx0ICovXHJcbiAgICAgICAgXCJ2YWx1ZVRleHRcIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBzZXQoc3RyKSB7IHJldHVybiBET01TdHJpbmcuc2V0KHRoaXMsIFwiYXJpYS12YWx1ZVRleHRcIiwgc3RyKTsgfSxcclxuICAgICAgICAgICAgZ2V0KCkgeyByZXR1cm4gRE9NU3RyaW5nLmdldCh0aGlzLCBcImFyaWEtdmFsdWVUZXh0XCIpOyB9XHJcbiAgICAgICAgfSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFJldHVybnMgLyBzZXRzIGEgc2hvcnQgaGludCBpbnRlbmRlZCB0byBhaWQgdGhlIHVzZXIgd2l0aCBkYXRhIGVudHJ5IHdoZW4gdGhlIGNvbnRyb2wgaGFzIG5vIHZhbHVlLlxyXG5cdFx0ICogQSBoaW50IGNvdWxkIGJlIGEgc2FtcGxlIHZhbHVlIG9yIGEgYnJpZWYgZGVzY3JpcHRpb24gb2YgdGhlIGV4cGVjdGVkIGZvcm1hdC5cclxuXHRcdCAqIFxyXG5cdFx0ICogQHNlZSB7QGxpbmsgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1wbGFjZWhvbGRlcn1cclxuXHRcdCAqIEB0eXBlIHs/U3RyaW5nfVxyXG5cdFx0ICovXHJcbiAgICAgICAgXCJwbGFjZWhvbGRlclwiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNldChzdHIpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJhcmlhLXBsYWNlaG9sZGVyXCIsIHN0cik7IH0sXHJcbiAgICAgICAgICAgIGdldCgpIHsgcmV0dXJuIERPTVN0cmluZy5nZXQodGhpcywgXCJhcmlhLXBsYWNlaG9sZGVyXCIpOyB9XHJcbiAgICAgICAgfSxcclxuXHJcblx0XHQvKiogXHJcblx0XHQgKiBSZXR1cm5zIC8gc2V0cyB0aGUgY3VycmVudCB2YWx1ZSBmb3IgYSB7QGxpbmsgUmFuZ2V9IHdpZGdldC5cclxuXHRcdCAqIFxyXG5cdFx0ICogQHNlZSB7QGxpbmsgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS12YWx1ZW5vd31cclxuXHRcdCAqIEB0eXBlIHs/TnVtYmVyfVxyXG5cdFx0ICovXHJcbiAgICAgICAgXCJ2YWx1ZU5vd1wiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNldCh2YWwpIHsgcmV0dXJuIGRvdWJsZS5zZXQodGhpcywgXCJhcmlhLXZhbHVlbm93XCIsIHZhbCk7IH0sXHJcbiAgICAgICAgICAgIGdldCgpIHsgcmV0dXJuIGRvdWJsZS5nZXQodGhpcywgXCJhcmlhLXZhbHVlbm93XCIpOyB9XHJcbiAgICAgICAgfSxcclxuXHJcblx0XHQvKiogXHJcblx0XHQgKiBSZXR1cm5zIC8gc2V0cyB0aGUgbWluaW11bSBhbGxvd2VkIHZhbHVlIGZvciBhIHtAbGluayBSYW5nZX0gd2lkZ2V0LlxyXG5cdFx0ICogXHJcblx0XHQgKiBAc2VlIHtAbGluayBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXZhbHVlbWlufVxyXG5cdFx0ICogQHR5cGUgez9OdW1iZXJ9XHJcblx0XHQgKi9cclxuICAgICAgICBcInZhbHVlTWluXCI6IHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgc2V0KHZhbCkgeyByZXR1cm4gZG91YmxlLnNldCh0aGlzLCBcImFyaWEtdmFsdWVtaW5cIiwgdmFsKTsgfSxcclxuICAgICAgICAgICAgZ2V0KCkgeyByZXR1cm4gZG91YmxlLmdldCh0aGlzLCBcImFyaWEtdmFsdWVtaW5cIik7IH1cclxuICAgICAgICB9LFxyXG5cclxuXHRcdC8qKiBcclxuXHRcdCAqIFJldHVybnMgLyBzZXRzIHRoZSBtYXhpbXVtIGFsbG93ZWQgdmFsdWUgZm9yIGEge0BsaW5rIFJhbmdlfSB3aWRnZXQuXHJcblx0XHQgKiBcclxuXHRcdCAqIEBzZWUge0BsaW5rIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtdmFsdWVtYXh9XHJcblx0XHQgKiBAdHlwZSB7P051bWJlcn1cclxuXHRcdCAqL1xyXG4gICAgICAgIFwidmFsdWVNYXhcIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBzZXQodmFsKSB7IHJldHVybiBkb3VibGUuc2V0KHRoaXMsIFwiYXJpYS12YWx1ZW1heFwiLCB2YWwpOyB9LFxyXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiBkb3VibGUuZ2V0KHRoaXMsIFwiYXJpYS12YWx1ZW1heFwiKTsgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKiBFTkQgT0YgQ09OVFJPTCBWQUxVRVMgKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG4gICAgICAgIC8vIExpdmUgcmVnaW9ucy5cclxuICAgICAgICBcImF0b21pY1wiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNldCh2YWwpIHsgcmV0dXJuIGJvb2xlYW4uc2V0KHRoaXMsIFwiYXJpYS1hdG9taWNcIiwgdmFsKTsgfSxcclxuICAgICAgICAgICAgZ2V0KCkgeyByZXR1cm4gYm9vbGVhbi5nZXQodGhpcywgXCJhcmlhLWF0b21pY1wiKTsgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJidXN5XCI6IHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgc2V0KHZhbCkgeyByZXR1cm4gYm9vbGVhbi5zZXQodGhpcywgXCJhcmlhLWJ1c3lcIiwgdmFsKTsgfSxcclxuICAgICAgICAgICAgZ2V0KCkgeyByZXR1cm4gYm9vbGVhbi5nZXQodGhpcywgXCJhcmlhLWJ1c3lcIik7IH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibGl2ZVwiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNldCh2YWwpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJhcmlhLWxpdmVcIiwgdmFsKTsgfSxcclxuICAgICAgICAgICAgZ2V0KCkgeyByZXR1cm4gRE9NU3RyaW5nLmdldCh0aGlzLCBcImFyaWEtbGl2ZVwiKTsgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJyZWxldmFudFwiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNldCh2YWwpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJhcmlhLXJlbGV2YW50XCIsIHZhbCk7IH0sXHJcbiAgICAgICAgICAgIGdldCgpIHsgcmV0dXJuIERPTVN0cmluZy5nZXQodGhpcywgXCJhcmlhLXJlbGV2YW50XCIpOyB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKiBPVEhFUiBSRUxBVElPTlNISVBTICoqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFJldHVybnMgLyBzZXRzIHRoZSBBY2Nlc3NpYmxlTm9kZSBvZiB0aGUgY3VycmVudGx5IGFjdGl2ZSBlbGVtZW50IHdoZW4gZm9jdXMgaXMgb24gY3VycmVudCBlbGVtZW50LlxyXG5cdFx0ICogXHJcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtYWN0aXZlZGVzY2VuZGFudFxyXG5cdFx0ICogQHR5cGUgez9BY2NjZXNzaWJsZU5vZGV9XHJcblx0XHQgKi9cclxuICAgICAgICBcImFjdGl2ZURlc2NlbmRhbnRcIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBzZXQodmFsKSB7IHJldHVybiBzZXRBY2Nlc3NpYmxlTm9kZSh0aGlzLCBcImFyaWEtYWN0aXZlZGVzY2VuZGFudFwiLCB2YWwpOyB9LFxyXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiBnZXRBY2Nlc3NpYmxlTm9kZSh0aGlzLCBcImFyaWEtYWN0aXZlZGVzY2VuZGFudFwiKTsgfVxyXG4gICAgICAgIH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZXR1cm5zIC8gc2V0cyBhbiBBY2Nlc3NpYmxlTm9kZSB0aGF0IHByb3ZpZGVzIGEgZGV0YWlsZWQsIGV4dGVuZGVkIGRlc2NyaXB0aW9uIFxyXG5cdFx0ICogZm9yIHRoZSBjdXJyZW50IGVsZW1lbnQuXHJcblx0XHQgKiBcclxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI2Rlc2NyaWJlZEJ5fVxyXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWRldGFpbHNcclxuXHRcdCAqIEB0eXBlIHs/QWNjY2Vzc2libGVOb2RlfVxyXG5cdFx0ICovXHJcbiAgICAgICAgXCJkZXRhaWxzXCI6IHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgc2V0KHZhbCkgeyByZXR1cm4gc2V0QWNjZXNzaWJsZU5vZGUodGhpcywgXCJhcmlhLWRldGFpbHNcIiwgdmFsKTsgfSxcclxuICAgICAgICAgICAgZ2V0KCkgeyByZXR1cm4gZ2V0QWNjZXNzaWJsZU5vZGUodGhpcywgXCJhcmlhLWRldGFpbHNcIik7IH1cclxuICAgICAgICB9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUmV0dXJucyAvIHNldHMgYW4gQWNjZXNzaWJsZU5vZGUgdGhhdCBwcm92aWRlcyBhbiBlcnJvciBtZXNzYWdlIGZvciB0aGUgY3VycmVudCBlbGVtZW50LlxyXG5cdFx0ICogXHJcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNpbnZhbGlkfVxyXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjZGVzY3JpYmVkQnl9XHJcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtZXJyb3JtZXNzYWdlXHJcblx0XHQgKiBAdHlwZSB7P0FjY2Nlc3NpYmxlTm9kZX1cclxuXHRcdCAqL1xyXG4gICAgICAgIFwiZXJyb3JNZXNzYWdlXCI6IHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgc2V0KHZhbCkgeyByZXR1cm4gc2V0QWNjZXNzaWJsZU5vZGUodGhpcywgXCJhcmlhLWVycm9ybWVzc2FnZVwiLCB2YWwpOyB9LFxyXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiBnZXRBY2Nlc3NpYmxlTm9kZSh0aGlzLCBcImFyaWEtZXJyb3JtZXNzYWdlXCIpOyB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKiBFTkQgT0YgT1RIRVIgUkVMQVRJT05TSElQUyAqKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqIENPTExFQ1RJT05TICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZXR1cm5zIC8gc2V0cyB0aGUgdG90YWwgbnVtYmVyIG9mIGNvbHVtbnMgaW4gYSB7QGxpbmsgVGFibGV9LCB7QGxpbmsgR3JpZH0sIG9yIHtAbGluayBUcmVlZ3JpZH0uXHJcblx0XHQgKiBcclxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI2NvbEluZGV4fVxyXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXNldHNpemVcclxuXHRcdCAqIEB0eXBlIHs/SW50ZWdlcn1cclxuXHRcdCAqL1xyXG4gICAgICAgIFwiY29sQ291bnRcIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBzZXQodmFsKSB7IHJldHVybiBsb25nLnNldCh0aGlzLCBcImFyaWEtY29sY291bnRcIiwgdmFsKTsgfSxcclxuICAgICAgICAgICAgZ2V0KCkgeyByZXR1cm4gbG9uZy5nZXQodGhpcywgXCJhcmlhLWNvbGNvdW50XCIpOyB9XHJcbiAgICAgICAgfSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIERlZmluZXMgYW4gZWxlbWVudCdzIGNvbHVtbiBpbmRleCBvciBwb3NpdGlvbiB3aXRoIHJlc3BlY3QgdG8gdGhlIHRvdGFsIG51bWJlciBvZiBjb2x1bW5zIFxyXG5cdFx0ICogd2l0aGluIGEge0BsaW5rIFRhYmxlfSwge0BsaW5rIEdyaWR9LCBvciB7QGxpbmsgVHJlZWdyaWR9LlxyXG5cdFx0ICogXHJcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNjb2xDb3VudH1cclxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI2NvbFNwYW59XHJcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtY29saW5kZXhcclxuXHRcdCAqIEB0eXBlIHs/SW50ZWdlcn1cclxuXHRcdCAqL1xyXG4gICAgICAgIFwiY29sSW5kZXhcIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBzZXQodmFsKSB7IHJldHVybiBsb25nLnNldCh0aGlzLCBcImFyaWEtY29saW5kZXhcIiwgdmFsKTsgfSxcclxuICAgICAgICAgICAgZ2V0KCkgeyByZXR1cm4gbG9uZy5nZXQodGhpcywgXCJhcmlhLWNvbGluZGV4XCIpOyB9XHJcbiAgICAgICAgfSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIERlZmluZXMgdGhlIG51bWJlciBvZiBjb2x1bW5zIHNwYW5uZWQgYnkgYSBjZWxsIG9yIGdyaWRjZWxsXHJcblx0XHQgKiB3aXRoaW4gYSB7QGxpbmsgVGFibGV9LCB7QGxpbmsgR3JpZH0sIG9yIHtAbGluayBUcmVlZ3JpZH0uXHJcblx0XHQgKiBcclxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI2NvbEluZGV4fVxyXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjcm93U3Bhbn1cclxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1jb2xzcGFuXHJcblx0XHQgKiBAdHlwZSB7P0ludGVnZXJ9XHJcblx0XHQgKi9cclxuICAgICAgICBcImNvbFNwYW5cIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBzZXQodmFsKSB7IHJldHVybiBsb25nLnNldCh0aGlzLCBcImFyaWEtY29sc3BhblwiLCB2YWwpOyB9LFxyXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiBsb25nLmdldCh0aGlzLCBcImFyaWEtY29sc3BhblwiKTsgfVxyXG4gICAgICAgIH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBEZWZpbmVzIGFuIGVsZW1lbnQncyBudW1iZXIgb3IgcG9zaXRpb24gaW4gdGhlIGN1cnJlbnQgc2V0IG9mIHtAbGluayBsaXN0aXRlbX1zIG9yIHtAbGluayB0cmVlaXRlbX1zLlxyXG5cdFx0ICogTm90IHJlcXVpcmVkIGlmIGFsbCBlbGVtZW50cyBpbiB0aGUgc2V0IGFyZSBwcmVzZW50IGluIHRoZSBET00uXHJcblx0XHQgKiBcclxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI3NldFNpemV9XHJcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtcG9zaW5zZXRcclxuXHRcdCAqIEB0eXBlIHs/SW50ZWdlcn1cclxuXHRcdCAqL1xyXG4gICAgICAgIFwicG9zSW5TZXRcIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBzZXQodmFsKSB7IHJldHVybiBsb25nLnNldCh0aGlzLCBcImFyaWEtcG9zaW5zZXRcIiwgdmFsKTsgfSxcclxuICAgICAgICAgICAgZ2V0KCkgeyByZXR1cm4gbG9uZy5nZXQodGhpcywgXCJhcmlhLXBvc2luc2V0XCIpOyB9XHJcbiAgICAgICAgfSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIERlZmluZXMgdGhlIHRvdGFsIG51bWJlciBvZiByb3dzIGluIGEge0BsaW5rIFRhYmxlfSwge0BsaW5rIEdyaWR9LCBvciB7QGxpbmsgVHJlZWdyaWR9LlxyXG5cdFx0ICogXHJcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNyb3dJbmRleH1cclxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1yb3djb3VudFxyXG5cdFx0ICogQHR5cGUgez9JbnRlZ2VyfVxyXG5cdFx0ICovXHJcbiAgICAgICAgXCJyb3dDb3VudFwiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNldCh2YWwpIHsgcmV0dXJuIGxvbmcuc2V0KHRoaXMsIFwiYXJpYS1yb3djb3VudFwiLCB2YWwpOyB9LFxyXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiBsb25nLmdldCh0aGlzLCBcImFyaWEtcm93Y291bnRcIik7IH1cclxuICAgICAgICB9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRGVmaW5lcyBhbiBlbGVtZW50J3Mgcm93IGluZGV4IG9yIHBvc2l0aW9uIHdpdGggcmVzcGVjdCB0byB0aGUgdG90YWwgbnVtYmVyIG9mIHJvd3MgXHJcblx0XHQgKiB3aXRoaW4gYSAge0BsaW5rIFRhYmxlfSwge0BsaW5rIEdyaWR9LCBvciB7QGxpbmsgVHJlZWdyaWR9LlxyXG5cdFx0ICogXHJcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNyb3dDb3VudH1cclxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI3Jvd1NwYW59XHJcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtcm93aW5kZXhcclxuXHRcdCAqIEB0eXBlIHs/SW50ZWdlcn1cclxuXHRcdCAqL1xyXG4gICAgICAgIFwicm93SW5kZXhcIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBzZXQodmFsKSB7IHJldHVybiBsb25nLnNldCh0aGlzLCBcImFyaWEtcm93aW5kZXhcIiwgdmFsKTsgfSxcclxuICAgICAgICAgICAgZ2V0KCkgeyByZXR1cm4gbG9uZy5nZXQodGhpcywgXCJhcmlhLXJvd2luZGV4XCIpOyB9XHJcbiAgICAgICAgfSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIERlZmluZXMgdGhlIG51bWJlciBvZiByb3dzIHNwYW5uZWQgYnkgYSBjZWxsIG9yIGdyaWRjZWxsXHJcblx0XHQgKiB3aXRoaW4gYSB7QGxpbmsgVGFibGV9LCB7QGxpbmsgR3JpZH0sIG9yIHtAbGluayBUcmVlZ3JpZH0uXHJcblx0XHQgKiBcclxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI3Jvd0luZGV4fVxyXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjY29sU3Bhbn1cclxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1yb3dzcGFuXHJcblx0XHQgKiBAdHlwZSB7P0ludGVnZXJ9XHJcblx0XHQgKi9cclxuICAgICAgICBcInJvd1NwYW5cIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBzZXQodmFsKSB7IHJldHVybiBsb25nLnNldCh0aGlzLCBcImFyaWEtcm93c3BhblwiLCB2YWwpOyB9LFxyXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiBsb25nLmdldCh0aGlzLCBcImFyaWEtcm93c3BhblwiKTsgfVxyXG4gICAgICAgIH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBEZWZpbmVzIHRoZSBudW1iZXIgb2YgaXRlbXMgaW4gdGhlIGN1cnJlbnQgc2V0IG9mIGxpc3RpdGVtcyBvciB0cmVlaXRlbXMuXHJcblx0XHQgKiBOb3QgcmVxdWlyZWQgaWYgKiphbGwqKiBlbGVtZW50cyBpbiB0aGUgc2V0IGFyZSBwcmVzZW50IGluIHRoZSBET00uXHJcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNwb3NJblNldH1cclxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1zZXRzaXplXHJcblx0XHQgKiBAdHlwZSB7P0ludGVnZXJ9XHJcblx0XHQgKi9cclxuICAgICAgICBcInNldFNpemVcIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBzZXQodmFsKSB7IHJldHVybiBsb25nLnNldCh0aGlzLCBcImFyaWEtc2V0c2l6ZVwiLCB2YWwpOyB9LFxyXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiBsb25nLmdldCh0aGlzLCBcImFyaWEtc2V0c2l6ZVwiKTsgfVxyXG4gICAgICAgIH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBEZWZpbmVzIHRoZSBoaWVyYXJjaGljYWwgbGV2ZWwgb2YgYW4gZWxlbWVudCB3aXRoaW4gYSBzdHJ1Y3R1cmUuXHJcblx0XHQgKiBFLmcuIGAmbHQ7aDEmZ3Q7Jmx0O2gxLyZndDtgIGVxdWFscyBgJmx0O2RpdiByb2xlPVwiaGVhZGluZ1wiIGFyaWEtbGV2ZWw9XCIxXCImZ3Q7Jmx0Oy9kaXY+YFxyXG5cdFx0ICogXHJcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtbGV2ZWxcclxuXHRcdCAqIEB0eXBlIHs/SW50ZWdlcn1cclxuXHRcdCAqL1xyXG4gICAgICAgIFwibGV2ZWxcIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBzZXQodmFsKSB7IHJldHVybiBsb25nLnNldCh0aGlzLCBcImFyaWEtbGV2ZWxcIiwgdmFsKTsgfSxcclxuICAgICAgICAgICAgZ2V0KCkgeyByZXR1cm4gbG9uZy5nZXQodGhpcywgXCJhcmlhLWxldmVsXCIpOyB9XHJcbiAgICAgICAgfSxcclxuXHJcblx0XHQvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKiBFTkQgT0YgQ09MTEVDVElPTlMgKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuXHJcblx0XHQvKiAqKioqKioqKioqKioqKioqKiogQUNDRVNTSUJMRSBMQUJFTCBBTkQgREVTQ1JJUFRJT04gKioqKioqKioqKioqKioqKioqICovXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZXR1cm5zIGFuIGxpc3Qgd2l0aCBBY2Nlc3NpYmxlTm9kZSBpbnN0YW5jZXMgdGhhdCBsYWJlbHMgdGhlIGN1cnJlbnQgZWxlbWVudFxyXG5cdFx0ICogXHJcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNkZXNjcmliZWRCeX1cclxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1sYWJlbGxlZGJ5XHJcblx0XHQgKiBAdHlwZSB7QWNjZXNzaWJsZU5vZGVMaXN0fVxyXG5cdFx0ICovXHJcblx0XHRcImxhYmVsZWRCeVwiOiB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdHNldCh2YWwpIHtcclxuXHRcdFx0XHRpZiAoISh2YWwgaW5zdGFuY2VvZiBBY2Nlc3NpYmxlTm9kZUxpc3RDb25zdHJ1Y3RvcikpIHtcclxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIkl0IG11c3QgYmUgYW4gaW5zdGFuY2Ugb2YgQWNjZXNzaWJsZU5vZGVMaXN0XCIpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGhpcy5fdmFsdWVzLmxhYmVsZWRCeSA9IHZhbDtcclxuXHRcdFx0XHR2YWwucGFyZW50QU9NID0gdGhpcztcclxuXHRcdFx0XHR2YWwuYXR0cmlidXRlID0gXCJhcmlhLWxhYmVsbGVkYnlcIjtcclxuXHRcdFx0fSxcclxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gdGhpcy5fdmFsdWVzLmxhYmVsZWRCeSB8fCBudWxsOyB9XHJcblx0XHR9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUmV0dXJucyBhbiBsaXN0IHdpdGggQWNjZXNzaWJsZU5vZGUgaW5zdGFuY2VzIHRoYXQgZGVzY3JpYmVzIHRoZSBjdXJyZW50IGVsZW1lbnRcclxuXHRcdCAqIFxyXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjbGFiZWxlZEJ5fVxyXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWRlc2NyaWJlZGJ5XHJcblx0XHQgKiBAdHlwZSB7QWNjZXNzaWJsZU5vZGVMaXN0fVxyXG5cdFx0ICovXHJcblx0XHRcImRlc2NyaWJlZEJ5XCI6IHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0c2V0KHZhbCkge1xyXG5cdFx0XHRcdGlmICghKHZhbCBpbnN0YW5jZW9mIEFjY2Vzc2libGVOb2RlTGlzdENvbnN0cnVjdG9yKSkge1xyXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSXQgbXVzdCBiZSBhbiBpbnN0YW5jZSBvZiBBY2Nlc3NpYmxlTm9kZUxpc3RcIik7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0aGlzLl92YWx1ZXMuZGVzY3JpYmVkQnkgPSB2YWw7XHJcblx0XHRcdFx0dmFsLnBhcmVudEFPTSA9IHRoaXM7XHJcblx0XHRcdFx0dmFsLmF0dHJpYnV0ZSA9IFwiYXJpYS1kZXNjcmliZWRieVwiO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRnZXQoKSB7IHJldHVybiB0aGlzLl92YWx1ZXMuZGVzY3JpYmVkQnkgfHwgbnVsbDsgfVxyXG5cdFx0fSxcclxuXHJcblx0XHQvKiAqKioqKioqKioqKioqKiBFTkQgT0YgQUNDRVNTSUJMRSBMQUJFTCBBTkQgREVTQ1JJUFRJT04gKioqKioqKioqKioqKiogKi9cclxuXHRcdFxyXG5cdFx0LyogKioqKioqKioqKioqKioqKioqKioqKioqIE9USEVSIFJFTEFUSU9OU0hJUFMgKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZXR1cm5zIGFuIGxpc3Qgd2l0aCBBY2Nlc3NpYmxlTm9kZSBpbnN0YW5jZXMgd2hvc2UgY29udGVudHMgb3IgcHJlc2VuY2UgYXJlIGNvbnRyb2xsZWQgYnlcclxuXHRcdCAqIHRoZSBjdXJyZW50IGVsZW1lbnQuXHJcblx0XHQgKiBcclxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI293bnN9XHJcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtY29udHJvbHNcclxuXHRcdCAqIEB0eXBlIHtBY2Nlc3NpYmxlTm9kZUxpc3R9XHJcblx0XHQgKi9cclxuXHRcdFwiY29udHJvbHNcIjoge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRzZXQodmFsKSB7XHJcblx0XHRcdFx0aWYgKCEodmFsIGluc3RhbmNlb2YgQWNjZXNzaWJsZU5vZGVMaXN0Q29uc3RydWN0b3IpKSB7XHJcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJdCBtdXN0IGJlIGFuIGluc3RhbmNlIG9mIEFjY2Vzc2libGVOb2RlTGlzdFwiKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHRoaXMuX3ZhbHVlcy5jb250cm9scyA9IHZhbDtcclxuXHRcdFx0XHR2YWwucGFyZW50QU9NID0gdGhpcztcclxuXHRcdFx0XHR2YWwuYXR0cmlidXRlID0gXCJhcmlhLWNvbnRyb2xzXCI7XHJcblx0XHRcdH0sXHJcblx0XHRcdGdldCgpIHsgcmV0dXJuIHRoaXMuX3ZhbHVlcy5jb250cm9scyB8fCBudWxsOyB9XHJcblx0XHR9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ29udGFpbnMgdGhlIG5leHQgZWxlbWVudChzKSBpbiBhbiBhbHRlcm5hdGUgcmVhZGluZyBvcmRlciBvZiBjb250ZW50IHdoaWNoLCBhdCB0aGUgdXNlcidzIFxyXG5cdFx0ICogZGlzY3JldGlvbiwgYWxsb3dzIGFzc2lzdGl2ZSB0ZWNobm9sb2d5IHRvIG92ZXJyaWRlIHRoZSBnZW5lcmFsIGRlZmF1bHQgb2YgcmVhZGluZyBpblxyXG5cdFx0ICogZG9jdW1lbnQgc291cmNlIG9yZGVyLlxyXG5cdFx0ICogXHJcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtZmxvd3RvXHJcblx0XHQgKiBAdHlwZSB7QWNjZXNzaWJsZU5vZGVMaXN0fVxyXG5cdFx0ICovXHJcblx0XHRcImZsb3dUb1wiOiB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdHNldCh2YWwpIHtcclxuXHRcdFx0XHRpZiAoISh2YWwgaW5zdGFuY2VvZiBBY2Nlc3NpYmxlTm9kZUxpc3RDb25zdHJ1Y3RvcikpIHtcclxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIkl0IG11c3QgYmUgYW4gaW5zdGFuY2Ugb2YgQWNjZXNzaWJsZU5vZGVMaXN0XCIpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGhpcy5fdmFsdWVzLmZsb3dUbyA9IHZhbDtcclxuXHRcdFx0XHR2YWwucGFyZW50QU9NID0gdGhpcztcclxuXHRcdFx0XHR2YWwuYXR0cmlidXRlID0gXCJhcmlhLWZsb3d0b1wiO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRnZXQoKSB7IHJldHVybiB0aGlzLl92YWx1ZXMuZmxvd1RvIHx8IG51bGw7IH1cclxuXHRcdH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDb250YWlucyBjaGlsZHJlbiB3aG8ncyBJRCBhcmUgcmVmZXJlbmNlZCBpbnNpZGUgdGhlIGBhcmlhLW93bnNgIGF0dHJpYnV0ZVxyXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLW93bnNcclxuXHRcdCAqIEB0eXBlIHtBY2Nlc3NpYmxlTm9kZUxpc3R9XHJcblx0XHQgKi9cclxuXHRcdFwib3duc1wiOiB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdHNldCh2YWwpIHtcclxuXHRcdFx0XHRpZiAoISh2YWwgaW5zdGFuY2VvZiBBY2Nlc3NpYmxlTm9kZUxpc3RDb25zdHJ1Y3RvcikpIHtcclxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIkl0IG11c3QgYmUgYW4gaW5zdGFuY2Ugb2YgQWNjZXNzaWJsZU5vZGVMaXN0XCIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLl92YWx1ZXMub3ducyA9IHZhbDtcclxuXHRcdFx0XHR2YWwucGFyZW50QU9NID0gdGhpcztcclxuXHRcdFx0XHR2YWwuYXR0cmlidXRlID0gXCJhcmlhLW93bnNcIjtcclxuXHRcdFx0fSxcclxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gdGhpcy5fdmFsdWVzLm93bnMgfHwgbnVsbDsgfVxyXG5cdFx0fSxcclxuXHJcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqIEVORCBPRiBPVEhFUiBSRUxBVElPTlNISVBTICoqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4gICAgfVxyXG4pO1xyXG5cclxuZnVuY3Rpb24gc2V0QWNjZXNzaWJsZU5vZGUoYW9tLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XHJcblx0aWYgKHZhbHVlID09IHVuZGVmaW5lZCkge1xyXG5cdFx0Ly8gcmVtb3ZlIElEIG9mIGNvbm5lY3RlZCBlbGVtZW50IGlmIGdlbmVyYXRlZFxyXG5cdFx0aWYoYW9tLl92YWx1ZXNbYXR0cmlidXRlXSAmJiBhb20uX3ZhbHVlc1thdHRyaWJ1dGVdLmdlbmVyYXRlZF9pZCl7XHJcblx0XHRcdGFvbS5fdmFsdWVzW2F0dHJpYnV0ZV0uX25vZGUucmVtb3ZlQXR0cmlidXRlKFwiaWRcIik7XHJcblx0XHRcdGFvbS5fdmFsdWVzW2F0dHJpYnV0ZV0uZ2VuZXJhdGVkX2lkID0gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0YW9tLl92YWx1ZXNbYXR0cmlidXRlXSA9IHZhbHVlO1xyXG5cdFx0cmV0dXJuIGFvbS5fbm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlKTs7XHJcblx0fSBlbHNlIGlmICghKHZhbHVlIGluc3RhbmNlb2YgQWNjZXNzaWJsZU5vZGUpKSB7XHJcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBGYWlsZWQgdG8gc2V0IHRoZSAnI3thdHRyaWJ1dGV9JyBwcm9wZXJ0eSBvbiAnQWNjZXNzaWJsZU5vZGUnOiBUaGUgcHJvdmlkZWQgdmFsdWUgaXMgbm90IG9mIHR5cGUgJ0FjY2Vzc2libGVOb2RlJ2ApO1xyXG5cdH1cclxuXHJcbiAgICBpZiAodmFsdWUuX25vZGUpIHtcclxuXHRcdGlmICghdmFsdWUuX25vZGUuaWQpIHsgXHJcblx0XHRcdC8qKiBAdG9kbyByZW1vdmUgdGVtcCBpZCAqL1xyXG5cdFx0XHR2YWx1ZS5fbm9kZS5pZCA9IFwiaWQtXCIgKyBEYXRlLm5vdygpO1xyXG5cdFx0XHR2YWx1ZS5nZW5lcmF0ZWRfaWQgPSB0cnVlO1xyXG5cdFx0XHRjb25zb2xlLmxvZyh2YWx1ZSwgdmFsdWUuZ2VuZXJhdGVkX2lkKTtcclxuXHRcdH1cclxuXHJcblx0XHRhb20uX25vZGUuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZSwgdmFsdWUuX25vZGUuaWQpO1xyXG5cdH1cclxuXHJcblx0YW9tLl92YWx1ZXNbYXR0cmlidXRlXSA9IHZhbHVlO1xyXG5cdHJldHVybiB2YWx1ZTtcclxufVxyXG5mdW5jdGlvbiBnZXRBY2Nlc3NpYmxlTm9kZShhb20sIGF0dHJpYnV0ZSkge1xyXG5cdHZhciB2YWx1ZSA9IGFvbS5fdmFsdWVzW2F0dHJpYnV0ZV0gfHwgYW9tLl9ub2RlLmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xyXG5cdGlmICh2YWx1ZSA9PSB1bmRlZmluZWQpIHJldHVybiBudWxsO1xyXG5cdHJldHVybiB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWNjZXNzaWJsZU5vZGU7IiwiaW1wb3J0IEFjY2Vzc2libGVOb2RlIGZyb20gXCIuL0FjY2Vzc2libGVOb2RlXCI7XHJcblxyXG5leHBvcnQgbGV0IEFjY2Vzc2libGVOb2RlTGlzdENvbnN0cnVjdG9yID0gY2xhc3MgQWNjZXNzaWJsZU5vZGVMaXN0IGV4dGVuZHMgQXJyYXkge1xyXG5cdGl0ZW0oaW5kZXgpIHtcclxuXHRcdGlmKGlzTmFOKGluZGV4KSkgcmV0dXJuO1xyXG5cdFx0cmV0dXJuIHRoaXNbaW5kZXhdO1xyXG5cdH1cclxuXHJcblx0YWRkKGFjY2Vzc2libGVOb2RlLCBiZWZvcmUgPSBudWxsKSB7XHJcblx0XHRpZiAoIShhY2Nlc3NpYmxlTm9kZSBpbnN0YW5jZW9mIEFjY2Vzc2libGVOb2RlKSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwiRmFpbGVkIHRvIGV4ZWN1dGUgJ2FkZCcgb24gJ0FjY2Vzc2libGVOb2RlTGlzdCc6IHBhcmFtZXRlciAxIGlzIG5vdCBvZiB0eXBlICdBY2Nlc3NpYmxlTm9kZScuXCIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGJlZm9yZSAhPT0gbnVsbCkge1xyXG5cdFx0XHR2YXIgYmVmb3JlSW5kZXggPSB0aGlzLmluZGV4T2YoYmVmb3JlKTtcclxuXHRcdFx0aWYoYmVmb3JlSW5kZXggPiAtMSkge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLnNwbGljZShiZWZvcmVJbmRleCAtIDEsIDAsIGFjY2Vzc2libGVOb2RlKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLnB1c2goYWNjZXNzaWJsZU5vZGUpO1xyXG5cdH1cclxuXHJcblx0cmVtb3ZlKGluZGV4KSB7XHJcblx0XHQvLyB1cGRhdGUgRE9NIGF0dHJpYnV0ZVxyXG5cdFx0aWYgKHRoaXMucGFyZW50QU9NICYmIHRoaXNbaW5kZXhdLl9ub2RlICYmIHRoaXNbaW5kZXhdLl9ub2RlLmlkKSB7XHJcblx0XHRcdGxldCBpZHMgPSBbXTtcclxuXHJcblx0XHRcdGlmICh0aGlzLnBhcmVudEFPTS5fbm9kZS5oYXNBdHRyaWJ1dGUodGhpcy5hdHRyaWJ1dGUpKSB7XHJcblx0XHRcdFx0aWRzID0gdGhpcy5wYXJlbnRBT00uX25vZGUuZ2V0QXR0cmlidXRlKHRoaXMuYXR0cmlidXRlKS5zcGxpdChcIiBcIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aWRzID0gW107XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBmaWx0ZXJlZElkcyA9IGlkcy5maWx0ZXIoZSA9PiBlICE9PSB0aGlzW2luZGV4XS5fbm9kZS5pZCk7XHJcblxyXG5cdFx0XHQvLyByZW1vdmUgZ2VuZXJhdGVkIGlkcyBhcyBsb25nIGl0IHdhcyBwcmV2aW91c2x5IHJlZmVyZW5jZWRcclxuXHRcdFx0aWYgKHRoaXNbaW5kZXhdLmdlbmVyYXRlZF9pZCA9PT0gdHJ1ZSAmJiBmaWx0ZXJlZElkcy5sZW5ndGggPCBpZHMubGVuZ3RoKSB7XHJcblx0XHRcdFx0dGhpc1tpbmRleF0uX25vZGUuaWQgPSBcIlwiO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnBhcmVudEFPTS5fbm9kZS5zZXRBdHRyaWJ1dGUodGhpcy5hdHRyaWJ1dGUsIGZpbHRlcmVkSWRzLmpvaW4oXCIgXCIpKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5wb3AoaW5kZXgpO1xyXG5cdH1cclxufVxyXG5cclxudmFyIGFycmF5Q2hhbmdlSGFuZGxlciA9IHtcclxuXHRzZXQ6IGZ1bmN0aW9uICh0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSkge1xyXG5cdFx0Ly8gYWRkaW5nIG9yIGNoYW5naW5nIGEgdmFsdWUgaW5zaWRlIHRoZSBhcnJheVxyXG5cdFx0aWYgKCFpc05hTihwcm9wZXJ0eSkpIHtcclxuXHJcblx0XHRcdC8vIGNoZWNrIGlmIGl0cyB2YWxpZCB0eXBlXHJcblx0XHRcdGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFjY2Vzc2libGVOb2RlKSB7XHJcblx0XHRcdFx0dGFyZ2V0W3Byb3BlcnR5XSA9IHZhbHVlO1xyXG5cclxuXHRcdFx0XHQvLyB1cGRhdGUgRE9NIGF0dHJpYnV0ZVxyXG5cdFx0XHRcdGlmICh0YXJnZXQucGFyZW50QU9NICYmIHZhbHVlICYmIHZhbHVlLl9ub2RlKSB7XHJcblx0XHRcdFx0XHRpZighdmFsdWUuX25vZGUuaWQpIHtcclxuXHRcdFx0XHRcdFx0dmFsdWUuX25vZGUuaWQgPSBcImFvbS1cIiArIERhdGUubm93KCk7XHJcblx0XHRcdFx0XHRcdHZhbHVlLmdlbmVyYXRlZF9pZCA9IHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0bGV0IGlkcyA9IFtdO1xyXG5cdFx0XHRcdFx0aWYgKHRhcmdldC5wYXJlbnRBT00uX25vZGUuaGFzQXR0cmlidXRlKHRhcmdldC5hdHRyaWJ1dGUpKSB7XHJcblx0XHRcdFx0XHRcdGlkcyA9IHRhcmdldC5wYXJlbnRBT00uX25vZGUuZ2V0QXR0cmlidXRlKHRhcmdldC5hdHRyaWJ1dGUpLnNwbGl0KFwiIFwiKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGlkcyA9IFtdO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlkcy5wdXNoKHZhbHVlLl9ub2RlLmlkKTtcclxuXHJcblx0XHRcdFx0XHR0YXJnZXQucGFyZW50QU9NLl9ub2RlLnNldEF0dHJpYnV0ZSh0YXJnZXQuYXR0cmlidXRlLCBpZHMuam9pbihcIiBcIikpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGFyZ2V0W3Byb3BlcnR5XSA9IHZhbHVlO1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJPbmx5IGluc3RhbmNlcyBvZiBBY2Nlc3NpYmxlTm9kZSBhcmUgYWxsb3dlZFwiKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0dGFyZ2V0W3Byb3BlcnR5XSA9IHZhbHVlO1xyXG5cdFx0Ly8geW91IGhhdmUgdG8gcmV0dXJuIHRydWUgdG8gYWNjZXB0IHRoZSBjaGFuZ2VzXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcbn07XHJcblxyXG4vKipcclxuICogXHJcbiAqL1xyXG5mdW5jdGlvbiBBY2Nlc3NpYmxlTm9kZUxpc3RQcm94eSgpIHtcclxuXHRsZXQgYWNjZXNzaWJsZU5vZGVMaXN0ID0gbmV3IEFjY2Vzc2libGVOb2RlTGlzdENvbnN0cnVjdG9yKCk7XHRcclxuXHRyZXR1cm4gbmV3IFByb3h5KGFjY2Vzc2libGVOb2RlTGlzdCwgYXJyYXlDaGFuZ2VIYW5kbGVyKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWNjZXNzaWJsZU5vZGVMaXN0UHJveHk7IiwiLyoqXHJcbiAqIFJldHVybnMgdGhlIHZhbHVlIG9mIGEgZ2l2ZW4gYXR0cmlidXRlXHJcbiAqIEBwYXJhbSB7QWNjZXNzaWJsZU5vZGV9IGFvbSBcclxuICogQHBhcmFtIHtTdHJpbmd9IGF0dHJpYnV0ZU5hbWUgXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gYXR0cmlidXRlJ3MgdmFsdWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXQoYW9tLCBhdHRyaWJ1dGVOYW1lKSB7XHJcblx0cmV0dXJuIGFvbS5fdmFsdWVzW2F0dHJpYnV0ZU5hbWVdIHx8IGFvbS5fbm9kZS5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTeW5jIHRoZSBuZXcgdmFsdWUgdG8gdGhlIERPTVxyXG4gKiBAcGFyYW0ge0FjY2Vzc2libGVOb2RlfSBhb20gXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBhdHRyaWJ1dGVOYW1lIFxyXG4gKiBAcGFyYW0ge1N0cmluZyB8IE51bWJlciB9IHN0YXR1cyBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXQoYW9tLCBhdHRyaWJ1dGVOYW1lLCBzdGF0dXMpIHtcclxuXHRpZiAoc3RhdHVzID09IHVuZGVmaW5lZCkge1xyXG5cdFx0YW9tLl9ub2RlLnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0YW9tLl9ub2RlLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lLCBzdGF0dXMpO1xyXG5cdH1cclxuXHRcclxuXHRhb20uX3ZhbHVlc1thdHRyaWJ1dGVOYW1lXSA9IHR5cGVvZiBzdGF0dXMgIT0gXCJ1bmRlZmluZWRcIiA/IHN0YXR1cy50b1N0cmluZygpIDogc3RhdHVzO1xyXG5cdHJldHVybiBzdGF0dXM7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgZ2V0LCBzZXQgfTsiLCJjbGFzcyBFdmVudFRhcmdldCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJfbGlzdGVuZXJzXCIsIHsgdmFsdWU6IG5ldyBNYXAoKSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9saXN0ZW5lcnMuaGFzKHR5cGUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVycy5zZXQodHlwZSwgW10pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9saXN0ZW5lcnMuZ2V0KHR5cGUpLnB1c2goY2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgY2FsbGJhY2spIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2xpc3RlbmVycy5oYXModHlwZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc3RhY2sgPSB0aGlzLl9saXN0ZW5lcnMuZ2V0KHR5cGUpO1xyXG4gICAgICAgIHN0YWNrLmZvckVhY2goIChsaXN0ZW5lciwgaSkgPT4ge1xyXG4gICAgICAgICAgICBpZihsaXN0ZW5lciA9PT0gY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHN0YWNrLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3BhdGNoRXZlbnQoZXZlbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2xpc3RlbmVycy5oYXMoZXZlbnQudHlwZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzdGFjayA9IHRoaXMuX2xpc3RlbmVycy5nZXQoZXZlbnQudHlwZSk7XHJcbiAgICAgICAgLy8gdGhpcy5fbm9kZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgICAgICBzdGFjay5mb3JFYWNoKCBsaXN0ZW5lciA9PiB7XHJcbiAgICAgICAgICAgIGxpc3RlbmVyLmNhbGwodGhpcywgZXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiAhZXZlbnQuZGVmYXVsdFByZXZlbnRlZDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXZlbnRUYXJnZXQ7IiwiLyoqXHJcbiAqIFJldHVybnMgdGhlIHZhbHVlIG9mIGdpdmVuIGF0dHJpYnV0ZSBhcyBCb29sZWFuXHJcbiAqIEBwYXJhbSB7QWNjZXNzaWJsZU5vZGV9IGFvbSBcclxuICogQHBhcmFtIHtTdHJpbmd9IGF0dHJpYnV0ZU5hbWUgXHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59IGF0dHJpYnV0ZSdzIHZhbHVlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0KGFvbSwgYXR0cmlidXRlTmFtZSkge1xyXG5cdHZhciB2YWx1ZSA9IGFvbS5fdmFsdWVzW2F0dHJpYnV0ZU5hbWVdIHx8IGFvbS5fbm9kZS5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XHJcblxyXG5cdGlmKHZhbHVlID09IHVuZGVmaW5lZCApIHJldHVybiBudWxsO1xyXG5cdHJldHVybiB2YWx1ZSAgPT0gXCJ0cnVlXCIgfHwgZmFsc2U7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTeW5jIHRoZSBuZXcgdmFsdWUgdG8gdGhlIHByb3BlcnR5XHJcbiAqIEBwYXJhbSB7QWNjZXNzaWJsZU5vZGV9IGFvbSBcclxuICogQHBhcmFtIHtTdHJpbmd9IGF0dHJpYnV0ZU5hbWUgXHJcbiAqIEBwYXJhbSB7U3RyaW5nIHwgQm9vbGVhbn0gc3RhdHVzIFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldChhb20sIGF0dHJpYnV0ZU5hbWUsIHN0YXR1cykge1xyXG5cdGlmKHN0YXR1cyA9PSB1bmRlZmluZWQpIHtcclxuXHRcdGFvbS5fbm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGFvbS5fbm9kZS5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgc3RhdHVzKTtcclxuXHR9XHJcblxyXG5cdGFvbS5fdmFsdWVzW2F0dHJpYnV0ZU5hbWVdID0gdHlwZW9mIHN0YXR1cyAhPSBcInVuZGVmaW5lZFwiID8gc3RhdHVzLnRvU3RyaW5nKCkgOiBzdGF0dXM7XHJcblx0cmV0dXJuIHN0YXR1cztcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBnZXQsIHNldCB9OyIsIi8qKlxyXG4gKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiBhIGdpdmVuIGF0dHJpYnV0ZSBhcyBOdW1iZXJcclxuICogQHBhcmFtIHtBY2Nlc3NpYmxlTm9kZX0gYW9tIFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gYXR0cmlidXRlTmFtZSBcclxuICogQHJldHVybiB7TnVtYmVyfSBhdHRyaWJ1dGUncyB2YWx1ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldChhb20sIGF0dHJpYnV0ZU5hbWUpIHtcclxuXHR2YXIgdmFsdWUgPSBhb20uX3ZhbHVlc1thdHRyaWJ1dGVOYW1lXSB8fCBhb20uX25vZGUuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpOztcclxuXHRpZiAodmFsdWUgPT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbDtcclxuXHRyZXR1cm4gTnVtYmVyKHZhbHVlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFN5bmMgdGhlIG5ldyB2YWx1ZSB0byB0aGUgRE9NXHJcbiAqIEBwYXJhbSB7QWNjZXNzaWJsZU5vZGV9IGFvbSBcclxuICogQHBhcmFtIHtTdHJpbmd9IGF0dHJpYnV0ZU5hbWUgXHJcbiAqIEBwYXJhbSB7U3RyaW5nIHwgTnVtYmVyIH0gc3RhdHVzIFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldChhb20sIGF0dHJpYnV0ZU5hbWUsIHN0cikge1xyXG5cdGlmKHN0ciA9PSBudWxsKSB7XHJcblx0XHRhb20uX25vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRhb20uX25vZGUuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUsIHN0cik7XHJcblx0fVxyXG5cclxuXHRhb20uX3ZhbHVlc1thdHRyaWJ1dGVOYW1lXSA9IHN0YXR1cy50b1N0cmluZygpO1xyXG5cdHJldHVybiBzdGF0dXM7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgZ2V0LCBzZXQgfTsiLCIvKipcclxuICogUmV0dXJucyB0aGUgdmFsdWUgb2YgYSBnaXZlbiBhdHRyaWJ1dGUgYXMgSW50ZWdlclxyXG4gKiBAcGFyYW0ge0FjY2Vzc2libGVOb2RlfSBhb20gXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBhdHRyaWJ1dGVOYW1lIFxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IGF0dHJpYnV0ZSdzIHZhbHVlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0KGFvbSwgYXR0cmlidXRlTmFtZSkge1xyXG5cdHZhciB2YWx1ZSA9IGFvbS5fdmFsdWVzW2F0dHJpYnV0ZU5hbWVdIHx8IGFvbS5fbm9kZS5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7O1xyXG5cdGlmICh2YWx1ZSA9PSB1bmRlZmluZWQpIHJldHVybiBudWxsO1xyXG5cdHJldHVybiBwYXJzZUludCh2YWx1ZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTeW5jIHRoZSBuZXcgdmFsdWUgdG8gdGhlIERPTVxyXG4gKiBAcGFyYW0ge0FjY2Vzc2libGVOb2RlfSBhb20gXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBhdHRyaWJ1dGVOYW1lIFxyXG4gKiBAcGFyYW0ge1N0cmluZyB8IE51bWJlciB9IHN0YXR1cyBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXQoYW9tLCBhdHRyaWJ1dGVOYW1lLCBzdHIpIHtcclxuXHRpZiAoc3RyID09IG51bGwpIHtcclxuXHRcdGFvbS5fbm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGFvbS5fbm9kZS5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgc3RyKTtcclxuXHR9XHJcblxyXG5cdGFvbS5fdmFsdWVzW2F0dHJpYnV0ZU5hbWVdID0gc3RhdHVzLnRvU3RyaW5nKCk7XHJcblx0cmV0dXJuIHN0YXR1cztcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBnZXQsIHNldCB9OyIsIlxuLy8gRGVmYXVsdCBleHBvcnQgLSBNaXggd3JhcHBlclxuaW1wb3J0IG1peCBmcm9tICcuL3NyYy9taXgnO1xuZXhwb3J0IGRlZmF1bHQgbWl4O1xuXG4vLyBEZWNsYXJlIG1peGluIGNsYXNzZXNcbmltcG9ydCBEZWNsYXJlTWl4aW4gZnJvbSAnLi9zcmMvZGVjbGFyZSc7XG5leHBvcnQgeyBEZWNsYXJlTWl4aW4gfTtcblxuLy8gRGVjb3JhdG9yc1xuaW1wb3J0IEJhcmVNaXhpbiBmcm9tICcuL3NyYy9EZWNvcmF0b3JzL0JhcmVNaXhpbic7XG5leHBvcnQgeyBCYXJlTWl4aW4gfTtcblxuaW1wb3J0IEhhc0luc3RhbmNlIGZyb20gJy4vc3JjL0RlY29yYXRvcnMvSGFzSW5zdGFuY2UnO1xuZXhwb3J0IHsgSGFzSW5zdGFuY2UgfTtcblxuaW1wb3J0IENhY2hlZCBmcm9tICcuL3NyYy9EZWNvcmF0b3JzL0NhY2hlZCc7XG5leHBvcnQgeyBDYWNoZWQgfTtcblxuLy8gVXRpbHNcbmltcG9ydCB3cmFwIGZyb20gJy4vc3JjL1V0aWxzL3dyYXAnO1xuZXhwb3J0IHsgd3JhcCB9OyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNaXhpbiBCdWlsZGVyXG4gKlxuICogQWxsb3dzIHlvdSB0byBleHRlbmQgYSBjbGFzcyB3aXRoIG9uZSBvciBtb3JlIG1peGluIGNsYXNzZXMuXG4gKlxuICogVGhpcyBidWlsZGVyIGlzIGhlYXZpbHkgaW5zcGlyZWQgYnkgSnVzdGluIEZhZ25hbmkncyBNaXh3aXRoLmpzXG4gKlxuICogQHNlZSBodHRwOi8vanVzdGluZmFnbmFuaS5jb20vMjAxNS8xMi8yMS9yZWFsLW1peGlucy13aXRoLWphdmFzY3JpcHQtY2xhc3Nlcy9cbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2p1c3RpbmZhZ25hbmkvbWl4d2l0aC5qc1xuICpcbiAqIEBhdXRob3IgQWxpbiBFdWdlbiBEZWFjIDxhZGVAdmVzdGVyZ2FhcmRjb21wYW55LmNvbT5cbiAqL1xuY2xhc3MgQnVpbGRlciB7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgQnVpbGRlciBpbnN0YW5jZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW3N1cGVyQ2xhc3M9Y2xhc3Mge31dXG4gICAgICovXG4gICAgY29uc3RydWN0b3Ioc3VwZXJDbGFzcyl7XG4gICAgICAgIHRoaXMuc3VwZXJDbGFzcyA9IHN1cGVyQ2xhc3MgfHwgY2xhc3Mge307XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWl4aW4gb25lIG9yIG1vcmUgbWl4aW4tY2xhc3Nlc1xuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheS48RnVuY3Rpb24+fSBtaXhpbnNcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIHN1cGNsYXNzIHdpdGggbWl4aW5zIGFwcGxpZWRcbiAgICAgKi9cbiAgICB3aXRoKC4uLm1peGlucyl7XG4gICAgICAgIHJldHVybiBtaXhpbnMucmVkdWNlKChjLCBtKSA9PiB7XG5cbiAgICAgICAgICAgIGlmKHR5cGVvZiBtICE9PSAnZnVuY3Rpb24nKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG0oYyk7XG4gICAgICAgIH0sIHRoaXMuc3VwZXJDbGFzcyk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCdWlsZGVyOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgT1JJR0lOQUxfTUlYSU4gfSBmcm9tICcuLy4uL1V0aWxzL3dyYXAnO1xuaW1wb3J0IHdyYXAgZnJvbSAnLi8uLi9VdGlscy93cmFwJztcblxuLyoqXG4gKiBSZWZlcmVuY2UgdG8gYSBtaXhpblxuICpcbiAqIEB0eXBlIHtTeW1ib2x9XG4gKi9cbmV4cG9ydCBjb25zdCBNSVhJTl9SRUZFUkVOQ0UgPSBTeW1ib2woJ21peGluUmVmJyk7XG5cbi8qKlxuICogRGVjb3JhdG9yIHRoYXQgc3RvcmVzIGEgcmVmZXJlbmNlIHRvIHRoZSBtaXhpbiBjbGFzcywgd2hpY2hcbiAqIHVsdGltYXRlbHkgY2FuIGJlIHVzZWQgZm9yIFwiaW5zdGFuY2Ugb2ZcIiBjaGVja3MuXG4gKlxuICogQHNlZSB3cmFwXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWl4aW5DbGFzc1xuICpcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBEZWNvcmF0ZWQgbWl4aW5cbiAqL1xuY29uc3QgQmFyZU1peGluID0gKG1peGluQ2xhc3MpID0+IHdyYXAobWl4aW5DbGFzcywgKHN1cGVyY2xhc3MpID0+IHtcbiAgICAvLyBBcHBseSB0aGUgbWl4aW4gY2xhc3NcbiAgICBsZXQgYXBwID0gbWl4aW5DbGFzcyhzdXBlcmNsYXNzKTtcblxuICAgIC8vIEFkZCByZWZlcmVuY2UgdG8gdGhlIHdyYXBwZWQgbWl4aW4gY2xhc3MsIHNvIHRoYXQgd2UgY2FuIGVuYWJsZVxuICAgIC8vIGEgXCJpbnN0YW5jZSBvZlwiIHN1cHBvcnQuXG4gICAgYXBwLnByb3RvdHlwZVtNSVhJTl9SRUZFUkVOQ0VdID0gbWl4aW5DbGFzc1tPUklHSU5BTF9NSVhJTl07XG5cbiAgICByZXR1cm4gYXBwO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEJhcmVNaXhpbjsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB3cmFwIGZyb20gJy4vLi4vVXRpbHMvd3JhcCc7XG5cbi8qKlxuICogQ2FjaGVkIG1peGluIGNsYXNzIHJlZmVyZW5jZVxuICpcbiAqIEB0eXBlIHtTeW1ib2x9XG4gKi9cbmV4cG9ydCBjb25zdCBDQUNIRURfUkVGRVJFTkNFID0gU3ltYm9sKCdjYWNoZWRSZWYnKTtcblxuLyoqXG4gKiBEZWNvcmF0ZSB0aGUgZ2l2ZW4gbWl4aW4gY2xhc3Mgd2l0aCBhIFwiY2FjaGVkIGRlY29yYXRvclwiLlxuICpcbiAqIE1ldGhvZCB3aWxsIGVuc3VyZSB0aGF0IGlmIHRoZSBnaXZlbiBtaXhpbiBoYXMgYWxyZWFkeSBiZWVuIGFwcGxpZWQsXG4gKiB0aGVuIGl0IHdpbGwgYmUgcmV0dXJuZWQgLyBhcHBsaWVkIGEgc2luZ2xlIHRpbWUsIHJhdGhlciB0aGFuIG11bHRpcGxlXG4gKiB0aW1lcy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtaXhpbkNsYXNzXG4gKlxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cbmNvbnN0IENhY2hlZCA9IChtaXhpbkNsYXNzKSA9PiB3cmFwKG1peGluQ2xhc3MsIChzdXBlcmNsYXNzKSA9PiB7XG4gICAgLy8gT2J0YWluIGNhY2hlZCByZWZlcmVuY2UuLi5cbiAgICBsZXQgY2FjaGVkUmVmZXJlbmNlID0gbWl4aW5DbGFzc1tDQUNIRURfUkVGRVJFTkNFXTtcblxuICAgIC8vIElmIHRoZXJlIGlzIG5vIGNhY2hlZCByZWZlcmVuY2UsIHRoZW4gd2UgY3JlYXRlIG9uZSBvbnRvXG4gICAgLy8gdGhlIGdpdmVuIG1peGluIGNsYXNzXG4gICAgaWYoICEgY2FjaGVkUmVmZXJlbmNlKXtcblxuICAgICAgICAvLyBDcmVhdGUgYSBuZXcgc3ltYm9sIGluIHRoZSBtaXhpbiBjbGFzcywgdXNpbmcgdGhlIGZ1bmN0aW9uJ3MgbmFtZVxuICAgICAgICAvLyBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0Z1bmN0aW9uL25hbWVcbiAgICAgICAgY2FjaGVkUmVmZXJlbmNlID0gbWl4aW5DbGFzc1tDQUNIRURfUkVGRVJFTkNFXSA9IFN5bWJvbChtaXhpbkNsYXNzLm5hbWUpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGlmIGdpdmVuIHN1cGVyY2xhc3MgYWxyZWFkeSBoYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdpdmVuIG1peGluIGNsYXNzXG4gICAgLy8gSWYgc28sIHRoZW4gcmV0dXJuIGl0LlxuICAgIGlmKHN1cGVyY2xhc3MuaGFzT3duUHJvcGVydHkoY2FjaGVkUmVmZXJlbmNlKSl7XG4gICAgICAgIHJldHVybiBzdXBlcmNsYXNzW2NhY2hlZFJlZmVyZW5jZV07XG4gICAgfVxuXG4gICAgLy8gRGVjb3JhdGUgdGhlIGdpdmVuIHN1cGVyIGNsYXNzXG4gICAgbGV0IGRlY29yYXRlZCA9IG1peGluQ2xhc3Moc3VwZXJjbGFzcyk7XG5cbiAgICAvLyBDYWNoZSB0aGUgcmVmZXJlbmNlIGludG8gdGhlIHN1cGVyY2xhc3NcbiAgICBzdXBlcmNsYXNzW2NhY2hlZFJlZmVyZW5jZV0gPSBkZWNvcmF0ZWQ7XG5cbiAgICAvLyBGaW5hbGx5LCByZXR1cm4gdGhlIGRlY29yYXRlZCBtaXhpbi5cbiAgICByZXR1cm4gZGVjb3JhdGVkO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENhY2hlZDsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IE9SSUdJTkFMX01JWElOIH0gZnJvbSAnLi8uLi9VdGlscy93cmFwJztcbmltcG9ydCB7IE1JWElOX1JFRkVSRU5DRSB9IGZyb20gJy4vQmFyZU1peGluJztcblxuLyoqXG4gKiBEZWNvcmF0ZXMgdGhlIGdpdmVuIG1peGluIGNsYXNzIHRvIHN1cHBvcnQgXCJpbnN0YW5jZSBvZlwiIG9wZXJhdGlvbi5cbiAqXG4gKiBUaGUgZ2l2ZW4gbWl4aW4gY2xhc3MgTVVTVCBiZSBkZWNvcmF0ZWQgd2l0aCB0aGUgXCJCYXJlTWl4aW5cIiBmb3IgdGhpc1xuICogdG8gd29yay5cbiAqXG4gKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1N5bWJvbC9oYXNJbnN0YW5jZVxuICogQHNlZSBCYXJlTWl4aW5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtaXhpbkNsYXNzXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gRGVjb3JhdGVkIG1peGluIGNsYXNzXG4gKi9cbmNvbnN0IEhhc0luc3RhbmNlID0gKG1peGluQ2xhc3MpID0+IHtcblxuICAgIC8vIElmIGdpdmVuIG1peGluIGNsYXNzIGFscmVhZHkgaGFzIGEgY3VzdG9tIFwiaGFzIGluc3RhbmNlXCJcbiAgICAvLyBzeW1ib2wsIHRoZW4gYWJvcnQgLSBqdXN0IHJldHVybiB0aGUgbWl4aW4sIHNpbmNlIHRoZXJlXG4gICAgLy8gaXMgbm8gbmVlZCB0byBhZGQgY3VzdG9tIGJlaGF2aW91ciB0byBpdC5cbiAgICBpZihtaXhpbkNsYXNzLmhhc093blByb3BlcnR5KFN5bWJvbC5oYXNJbnN0YW5jZSkpe1xuICAgICAgICByZXR1cm4gbWl4aW5DbGFzcztcbiAgICB9XG5cbiAgICAvLyBPdGhlcndpc2UsIHdlIGFkZCBhIGN1c3RvbSBTeW1ib2wuaGFzSW5zdGFuY2UgbWV0aG9kIGZvclxuICAgIC8vIHRoZSBtaXhpbiBjbGFzcy5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobWl4aW5DbGFzcywgU3ltYm9sLmhhc0luc3RhbmNlLCB7XG5cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKGluc3RhbmNlKXtcbiAgICAgICAgICAgIC8vIEZldGNoIHRoZSBvcmlnaW5hbCBtaXhpbiBjbGFzc1xuICAgICAgICAgICAgbGV0IG9yaWdpbmFsTWl4aW5DbGFzcyA9IHRoaXNbT1JJR0lOQUxfTUlYSU5dO1xuXG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBubyBvcmlnaW5hbCBtaXhpbiBjbGFzcywgdGhlbiB3ZSBzaW1wbHlcbiAgICAgICAgICAgIC8vIGFib3J0IC0gaXQgY2Fubm90IGJlIGFuIGluc3RhbmNlIG9mIHRoZSBnaXZlbi4uLlxuICAgICAgICAgICAgaWYoICEgb3JpZ2luYWxNaXhpbkNsYXNzKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIExvb3AgdGhyb3VnaCB0aGUgZ2l2ZW4gaW5zdGFuY2UncyBwcm90b3R5cGUgY2hhaW5cbiAgICAgICAgICAgIHdoaWxlKGluc3RhbmNlICE9PSBudWxsKXtcblxuICAgICAgICAgICAgICAgIC8vIElmIGEgcmVmZXJlbmNlIGhhcyBiZWVuIHN0YXRlZCBvbiB0aGUgbWl4aW4gY2xhc3MgYW5kIGl0XG4gICAgICAgICAgICAgICAgLy8gbWF0Y2hlcyB0aGUgb3JpZ2luYWwgbWl4aW4sIHdlIGFzc3VtZSB0aGF0XG4gICAgICAgICAgICAgICAgaWYoaW5zdGFuY2UuaGFzT3duUHJvcGVydHkoTUlYSU5fUkVGRVJFTkNFKSAmJiBpbnN0YW5jZVtNSVhJTl9SRUZFUkVOQ0VdID09PSBvcmlnaW5hbE1peGluQ2xhc3Mpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBGZXRjaCB0aGUgbmV4dCBwcm90b3R5cGVcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihpbnN0YW5jZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIElmIG5vdGhpbmcgd2FzIG1hdGNoZWQsIHRoZW4gd2UgYXNzdW1lIHRoYXQgdGhlIGluc3RhbmNlc1xuICAgICAgICAgICAgLy8gc2ltcGx5IGRvIG5vdCBtYXRjaC5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICAvLyBGaW5hbGx5LCByZXR1cm4gdGhlIGRlY29yYXRlZCBtaXhpbiBjbGFzc1xuICAgIHJldHVybiBtaXhpbkNsYXNzO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSGFzSW5zdGFuY2U7IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFJlZmVyZW5jZSB0byBhbiBvcmlnaW5hbCBtaXhpblxuICpcbiAqIEB0eXBlIHtTeW1ib2x9XG4gKi9cbmV4cG9ydCBjb25zdCBPUklHSU5BTF9NSVhJTiA9IFN5bWJvbCgnb3JpZ2luYWxNaXhpbicpO1xuXG4vKipcbiAqIFNldHMgdGhlIHByb3RvdHlwZSBvZiB0aGUgd3JhcHBlciB0byBiZSB0aGUgZ2l2ZW4gbWl4aW4gY2xhc3NcbiAqIGFuZCBzdG9yZXMgYSByZWZlcmVuY2UgdG8gdGhlIG9yaWdpbmFsIG1peGluLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1peGluQ2xhc3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHdyYXBwZXJcbiAqXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gV3JhcHBlclxuICovXG5jb25zdCB3cmFwID0gKG1peGluQ2xhc3MsIHdyYXBwZXIpID0+IHtcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2Yod3JhcHBlciwgbWl4aW5DbGFzcyk7XG5cbiAgICBpZiAoIW1peGluQ2xhc3NbT1JJR0lOQUxfTUlYSU5dKSB7XG4gICAgICAgIG1peGluQ2xhc3NbT1JJR0lOQUxfTUlYSU5dID0gbWl4aW5DbGFzcztcbiAgICB9XG5cbiAgICByZXR1cm4gd3JhcHBlcjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdyYXA7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQmFyZU1peGluIGZyb20gJy4vRGVjb3JhdG9ycy9CYXJlTWl4aW4nO1xuaW1wb3J0IEhhc0luc3RhbmNlIGZyb20gJy4vRGVjb3JhdG9ycy9IYXNJbnN0YW5jZSc7XG5pbXBvcnQgQ2FjaGVkIGZyb20gJy4vRGVjb3JhdG9ycy9DYWNoZWQnO1xuXG4vKipcbiAqIERlY2xhcmUgYSBtaXhpbiAtIGRlY29yYXRlcyB0aGUgZ2l2ZW4gbWl4aW4gY2xhc3Mgd2l0aFxuICogYSBcImNhY2hlZCwgaGFzIGluc3RhbmNlIGFuZCBiYXJlIG1peGluXCIgZGVjb3JhdG9ycy5cbiAqXG4gKiBAc2VlIEJhcmVNaXhpblxuICogQHNlZSBIYXNJbnN0YW5jZVxuICogQHNlZSBDYWNoZWRcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtaXhpbkNsYXNzXG4gKlxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cbmNvbnN0IERlY2xhcmVNaXhpbiA9IChtaXhpbkNsYXNzKSA9PiB7XG4gICAgcmV0dXJuIENhY2hlZChcbiAgICAgICAgSGFzSW5zdGFuY2UoXG4gICAgICAgICAgICBCYXJlTWl4aW4obWl4aW5DbGFzcylcbiAgICAgICAgKVxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEZWNsYXJlTWl4aW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQnVpbGRlciBmcm9tICcuL0J1aWxkZXInO1xuXG4vKipcbiAqIE1peGluIEJ1aWxkZXIgd3JhcHBlclxuICpcbiAqIEFsbG93cyB5b3UgdG8gZXh0ZW5kIGEgY2xhc3Mgd2l0aCBvbmUgb3IgbW9yZSBtaXhpbi1jbGFzc2VzLlxuICpcbiAqIEBzZWUgQnVpbGRlclxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IFtzdXBlckNsYXNzPWNsYXNzIHt9XVxuICovXG5jb25zdCBtaXggPSAoc3VwZXJDbGFzcykgPT4gbmV3IEJ1aWxkZXIoc3VwZXJDbGFzcyk7XG5cbmV4cG9ydCBkZWZhdWx0IG1peDsiLCIvKmdsb2JhbCBkZWZpbmU6ZmFsc2UgKi9cbi8qKlxuICogQ29weXJpZ2h0IDIwMTItMjAxNyBDcmFpZyBDYW1wYmVsbFxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqIE1vdXNldHJhcCBpcyBhIHNpbXBsZSBrZXlib2FyZCBzaG9ydGN1dCBsaWJyYXJ5IGZvciBKYXZhc2NyaXB0IHdpdGhcbiAqIG5vIGV4dGVybmFsIGRlcGVuZGVuY2llc1xuICpcbiAqIEB2ZXJzaW9uIDEuNi4xXG4gKiBAdXJsIGNyYWlnLmlzL2tpbGxpbmcvbWljZVxuICovXG4oZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkKSB7XG5cbiAgICAvLyBDaGVjayBpZiBtb3VzZXRyYXAgaXMgdXNlZCBpbnNpZGUgYnJvd3NlciwgaWYgbm90LCByZXR1cm5cbiAgICBpZiAoIXdpbmRvdykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogbWFwcGluZyBvZiBzcGVjaWFsIGtleWNvZGVzIHRvIHRoZWlyIGNvcnJlc3BvbmRpbmcga2V5c1xuICAgICAqXG4gICAgICogZXZlcnl0aGluZyBpbiB0aGlzIGRpY3Rpb25hcnkgY2Fubm90IHVzZSBrZXlwcmVzcyBldmVudHNcbiAgICAgKiBzbyBpdCBoYXMgdG8gYmUgaGVyZSB0byBtYXAgdG8gdGhlIGNvcnJlY3Qga2V5Y29kZXMgZm9yXG4gICAgICoga2V5dXAva2V5ZG93biBldmVudHNcbiAgICAgKlxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgdmFyIF9NQVAgPSB7XG4gICAgICAgIDg6ICdiYWNrc3BhY2UnLFxuICAgICAgICA5OiAndGFiJyxcbiAgICAgICAgMTM6ICdlbnRlcicsXG4gICAgICAgIDE2OiAnc2hpZnQnLFxuICAgICAgICAxNzogJ2N0cmwnLFxuICAgICAgICAxODogJ2FsdCcsXG4gICAgICAgIDIwOiAnY2Fwc2xvY2snLFxuICAgICAgICAyNzogJ2VzYycsXG4gICAgICAgIDMyOiAnc3BhY2UnLFxuICAgICAgICAzMzogJ3BhZ2V1cCcsXG4gICAgICAgIDM0OiAncGFnZWRvd24nLFxuICAgICAgICAzNTogJ2VuZCcsXG4gICAgICAgIDM2OiAnaG9tZScsXG4gICAgICAgIDM3OiAnbGVmdCcsXG4gICAgICAgIDM4OiAndXAnLFxuICAgICAgICAzOTogJ3JpZ2h0JyxcbiAgICAgICAgNDA6ICdkb3duJyxcbiAgICAgICAgNDU6ICdpbnMnLFxuICAgICAgICA0NjogJ2RlbCcsXG4gICAgICAgIDkxOiAnbWV0YScsXG4gICAgICAgIDkzOiAnbWV0YScsXG4gICAgICAgIDIyNDogJ21ldGEnXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIG1hcHBpbmcgZm9yIHNwZWNpYWwgY2hhcmFjdGVycyBzbyB0aGV5IGNhbiBzdXBwb3J0XG4gICAgICpcbiAgICAgKiB0aGlzIGRpY3Rpb25hcnkgaXMgb25seSB1c2VkIGluY2FzZSB5b3Ugd2FudCB0byBiaW5kIGFcbiAgICAgKiBrZXl1cCBvciBrZXlkb3duIGV2ZW50IHRvIG9uZSBvZiB0aGVzZSBrZXlzXG4gICAgICpcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHZhciBfS0VZQ09ERV9NQVAgPSB7XG4gICAgICAgIDEwNjogJyonLFxuICAgICAgICAxMDc6ICcrJyxcbiAgICAgICAgMTA5OiAnLScsXG4gICAgICAgIDExMDogJy4nLFxuICAgICAgICAxMTEgOiAnLycsXG4gICAgICAgIDE4NjogJzsnLFxuICAgICAgICAxODc6ICc9JyxcbiAgICAgICAgMTg4OiAnLCcsXG4gICAgICAgIDE4OTogJy0nLFxuICAgICAgICAxOTA6ICcuJyxcbiAgICAgICAgMTkxOiAnLycsXG4gICAgICAgIDE5MjogJ2AnLFxuICAgICAgICAyMTk6ICdbJyxcbiAgICAgICAgMjIwOiAnXFxcXCcsXG4gICAgICAgIDIyMTogJ10nLFxuICAgICAgICAyMjI6ICdcXCcnXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIHRoaXMgaXMgYSBtYXBwaW5nIG9mIGtleXMgdGhhdCByZXF1aXJlIHNoaWZ0IG9uIGEgVVMga2V5cGFkXG4gICAgICogYmFjayB0byB0aGUgbm9uIHNoaWZ0IGVxdWl2ZWxlbnRzXG4gICAgICpcbiAgICAgKiB0aGlzIGlzIHNvIHlvdSBjYW4gdXNlIGtleXVwIGV2ZW50cyB3aXRoIHRoZXNlIGtleXNcbiAgICAgKlxuICAgICAqIG5vdGUgdGhhdCB0aGlzIHdpbGwgb25seSB3b3JrIHJlbGlhYmx5IG9uIFVTIGtleWJvYXJkc1xuICAgICAqXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICB2YXIgX1NISUZUX01BUCA9IHtcbiAgICAgICAgJ34nOiAnYCcsXG4gICAgICAgICchJzogJzEnLFxuICAgICAgICAnQCc6ICcyJyxcbiAgICAgICAgJyMnOiAnMycsXG4gICAgICAgICckJzogJzQnLFxuICAgICAgICAnJSc6ICc1JyxcbiAgICAgICAgJ14nOiAnNicsXG4gICAgICAgICcmJzogJzcnLFxuICAgICAgICAnKic6ICc4JyxcbiAgICAgICAgJygnOiAnOScsXG4gICAgICAgICcpJzogJzAnLFxuICAgICAgICAnXyc6ICctJyxcbiAgICAgICAgJysnOiAnPScsXG4gICAgICAgICc6JzogJzsnLFxuICAgICAgICAnXFxcIic6ICdcXCcnLFxuICAgICAgICAnPCc6ICcsJyxcbiAgICAgICAgJz4nOiAnLicsXG4gICAgICAgICc/JzogJy8nLFxuICAgICAgICAnfCc6ICdcXFxcJ1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiB0aGlzIGlzIGEgbGlzdCBvZiBzcGVjaWFsIHN0cmluZ3MgeW91IGNhbiB1c2UgdG8gbWFwXG4gICAgICogdG8gbW9kaWZpZXIga2V5cyB3aGVuIHlvdSBzcGVjaWZ5IHlvdXIga2V5Ym9hcmQgc2hvcnRjdXRzXG4gICAgICpcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHZhciBfU1BFQ0lBTF9BTElBU0VTID0ge1xuICAgICAgICAnb3B0aW9uJzogJ2FsdCcsXG4gICAgICAgICdjb21tYW5kJzogJ21ldGEnLFxuICAgICAgICAncmV0dXJuJzogJ2VudGVyJyxcbiAgICAgICAgJ2VzY2FwZSc6ICdlc2MnLFxuICAgICAgICAncGx1cyc6ICcrJyxcbiAgICAgICAgJ21vZCc6IC9NYWN8aVBvZHxpUGhvbmV8aVBhZC8udGVzdChuYXZpZ2F0b3IucGxhdGZvcm0pID8gJ21ldGEnIDogJ2N0cmwnXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIHZhcmlhYmxlIHRvIHN0b3JlIHRoZSBmbGlwcGVkIHZlcnNpb24gb2YgX01BUCBmcm9tIGFib3ZlXG4gICAgICogbmVlZGVkIHRvIGNoZWNrIGlmIHdlIHNob3VsZCB1c2Uga2V5cHJlc3Mgb3Igbm90IHdoZW4gbm8gYWN0aW9uXG4gICAgICogaXMgc3BlY2lmaWVkXG4gICAgICpcbiAgICAgKiBAdHlwZSB7T2JqZWN0fHVuZGVmaW5lZH1cbiAgICAgKi9cbiAgICB2YXIgX1JFVkVSU0VfTUFQO1xuXG4gICAgLyoqXG4gICAgICogbG9vcCB0aHJvdWdoIHRoZSBmIGtleXMsIGYxIHRvIGYxOSBhbmQgYWRkIHRoZW0gdG8gdGhlIG1hcFxuICAgICAqIHByb2dyYW1hdGljYWxseVxuICAgICAqL1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgMjA7ICsraSkge1xuICAgICAgICBfTUFQWzExMSArIGldID0gJ2YnICsgaTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBsb29wIHRocm91Z2ggdG8gbWFwIG51bWJlcnMgb24gdGhlIG51bWVyaWMga2V5cGFkXG4gICAgICovXG4gICAgZm9yIChpID0gMDsgaSA8PSA5OyArK2kpIHtcblxuICAgICAgICAvLyBUaGlzIG5lZWRzIHRvIHVzZSBhIHN0cmluZyBjYXVzZSBvdGhlcndpc2Ugc2luY2UgMCBpcyBmYWxzZXlcbiAgICAgICAgLy8gbW91c2V0cmFwIHdpbGwgbmV2ZXIgZmlyZSBmb3IgbnVtcGFkIDAgcHJlc3NlZCBhcyBwYXJ0IG9mIGEga2V5ZG93blxuICAgICAgICAvLyBldmVudC5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vY2NhbXBiZWxsL21vdXNldHJhcC9wdWxsLzI1OFxuICAgICAgICBfTUFQW2kgKyA5Nl0gPSBpLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY3Jvc3MgYnJvd3NlciBhZGQgZXZlbnQgbWV0aG9kXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR8SFRNTERvY3VtZW50fSBvYmplY3RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9hZGRFdmVudChvYmplY3QsIHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChvYmplY3QuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgb2JqZWN0LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgY2FsbGJhY2ssIGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIG9iamVjdC5hdHRhY2hFdmVudCgnb24nICsgdHlwZSwgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHRha2VzIHRoZSBldmVudCBhbmQgcmV0dXJucyB0aGUga2V5IGNoYXJhY3RlclxuICAgICAqXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfY2hhcmFjdGVyRnJvbUV2ZW50KGUpIHtcblxuICAgICAgICAvLyBmb3Iga2V5cHJlc3MgZXZlbnRzIHdlIHNob3VsZCByZXR1cm4gdGhlIGNoYXJhY3RlciBhcyBpc1xuICAgICAgICBpZiAoZS50eXBlID09ICdrZXlwcmVzcycpIHtcbiAgICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuXG4gICAgICAgICAgICAvLyBpZiB0aGUgc2hpZnQga2V5IGlzIG5vdCBwcmVzc2VkIHRoZW4gaXQgaXMgc2FmZSB0byBhc3N1bWVcbiAgICAgICAgICAgIC8vIHRoYXQgd2Ugd2FudCB0aGUgY2hhcmFjdGVyIHRvIGJlIGxvd2VyY2FzZS4gIHRoaXMgbWVhbnMgaWZcbiAgICAgICAgICAgIC8vIHlvdSBhY2NpZGVudGFsbHkgaGF2ZSBjYXBzIGxvY2sgb24gdGhlbiB5b3VyIGtleSBiaW5kaW5nc1xuICAgICAgICAgICAgLy8gd2lsbCBjb250aW51ZSB0byB3b3JrXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gdGhlIG9ubHkgc2lkZSBlZmZlY3QgdGhhdCBtaWdodCBub3QgYmUgZGVzaXJlZCBpcyBpZiB5b3VcbiAgICAgICAgICAgIC8vIGJpbmQgc29tZXRoaW5nIGxpa2UgJ0EnIGNhdXNlIHlvdSB3YW50IHRvIHRyaWdnZXIgYW5cbiAgICAgICAgICAgIC8vIGV2ZW50IHdoZW4gY2FwaXRhbCBBIGlzIHByZXNzZWQgY2FwcyBsb2NrIHdpbGwgbm8gbG9uZ2VyXG4gICAgICAgICAgICAvLyB0cmlnZ2VyIHRoZSBldmVudC4gIHNoaWZ0K2Egd2lsbCB0aG91Z2guXG4gICAgICAgICAgICBpZiAoIWUuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXIudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGNoYXJhY3RlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZvciBub24ga2V5cHJlc3MgZXZlbnRzIHRoZSBzcGVjaWFsIG1hcHMgYXJlIG5lZWRlZFxuICAgICAgICBpZiAoX01BUFtlLndoaWNoXSkge1xuICAgICAgICAgICAgcmV0dXJuIF9NQVBbZS53aGljaF07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoX0tFWUNPREVfTUFQW2Uud2hpY2hdKSB7XG4gICAgICAgICAgICByZXR1cm4gX0tFWUNPREVfTUFQW2Uud2hpY2hdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgaXQgaXMgbm90IGluIHRoZSBzcGVjaWFsIG1hcFxuXG4gICAgICAgIC8vIHdpdGgga2V5ZG93biBhbmQga2V5dXAgZXZlbnRzIHRoZSBjaGFyYWN0ZXIgc2VlbXMgdG8gYWx3YXlzXG4gICAgICAgIC8vIGNvbWUgaW4gYXMgYW4gdXBwZXJjYXNlIGNoYXJhY3RlciB3aGV0aGVyIHlvdSBhcmUgcHJlc3Npbmcgc2hpZnRcbiAgICAgICAgLy8gb3Igbm90LiAgd2Ugc2hvdWxkIG1ha2Ugc3VyZSBpdCBpcyBhbHdheXMgbG93ZXJjYXNlIGZvciBjb21wYXJpc29uc1xuICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoZWNrcyBpZiB0d28gYXJyYXlzIGFyZSBlcXVhbFxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheX0gbW9kaWZpZXJzMVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IG1vZGlmaWVyczJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfbW9kaWZpZXJzTWF0Y2gobW9kaWZpZXJzMSwgbW9kaWZpZXJzMikge1xuICAgICAgICByZXR1cm4gbW9kaWZpZXJzMS5zb3J0KCkuam9pbignLCcpID09PSBtb2RpZmllcnMyLnNvcnQoKS5qb2luKCcsJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdGFrZXMgYSBrZXkgZXZlbnQgYW5kIGZpZ3VyZXMgb3V0IHdoYXQgdGhlIG1vZGlmaWVycyBhcmVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICovXG4gICAgZnVuY3Rpb24gX2V2ZW50TW9kaWZpZXJzKGUpIHtcbiAgICAgICAgdmFyIG1vZGlmaWVycyA9IFtdO1xuXG4gICAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICBtb2RpZmllcnMucHVzaCgnc2hpZnQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlLmFsdEtleSkge1xuICAgICAgICAgICAgbW9kaWZpZXJzLnB1c2goJ2FsdCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGUuY3RybEtleSkge1xuICAgICAgICAgICAgbW9kaWZpZXJzLnB1c2goJ2N0cmwnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlLm1ldGFLZXkpIHtcbiAgICAgICAgICAgIG1vZGlmaWVycy5wdXNoKCdtZXRhJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbW9kaWZpZXJzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHByZXZlbnRzIGRlZmF1bHQgZm9yIHRoaXMgZXZlbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgZnVuY3Rpb24gX3ByZXZlbnREZWZhdWx0KGUpIHtcbiAgICAgICAgaWYgKGUucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzdG9wcyBwcm9wb2dhdGlvbiBmb3IgdGhpcyBldmVudFxuICAgICAqXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfc3RvcFByb3BhZ2F0aW9uKGUpIHtcbiAgICAgICAgaWYgKGUuc3RvcFByb3BhZ2F0aW9uKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZS5jYW5jZWxCdWJibGUgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGRldGVybWluZXMgaWYgdGhlIGtleWNvZGUgc3BlY2lmaWVkIGlzIGEgbW9kaWZpZXIga2V5IG9yIG5vdFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9pc01vZGlmaWVyKGtleSkge1xuICAgICAgICByZXR1cm4ga2V5ID09ICdzaGlmdCcgfHwga2V5ID09ICdjdHJsJyB8fCBrZXkgPT0gJ2FsdCcgfHwga2V5ID09ICdtZXRhJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXZlcnNlcyB0aGUgbWFwIGxvb2t1cCBzbyB0aGF0IHdlIGNhbiBsb29rIGZvciBzcGVjaWZpYyBrZXlzXG4gICAgICogdG8gc2VlIHdoYXQgY2FuIGFuZCBjYW4ndCB1c2Uga2V5cHJlc3NcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfZ2V0UmV2ZXJzZU1hcCgpIHtcbiAgICAgICAgaWYgKCFfUkVWRVJTRV9NQVApIHtcbiAgICAgICAgICAgIF9SRVZFUlNFX01BUCA9IHt9O1xuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIF9NQVApIHtcblxuICAgICAgICAgICAgICAgIC8vIHB1bGwgb3V0IHRoZSBudW1lcmljIGtleXBhZCBmcm9tIGhlcmUgY2F1c2Uga2V5cHJlc3Mgc2hvdWxkXG4gICAgICAgICAgICAgICAgLy8gYmUgYWJsZSB0byBkZXRlY3QgdGhlIGtleXMgZnJvbSB0aGUgY2hhcmFjdGVyXG4gICAgICAgICAgICAgICAgaWYgKGtleSA+IDk1ICYmIGtleSA8IDExMikge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoX01BUC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIF9SRVZFUlNFX01BUFtfTUFQW2tleV1dID0ga2V5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX1JFVkVSU0VfTUFQO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHBpY2tzIHRoZSBiZXN0IGFjdGlvbiBiYXNlZCBvbiB0aGUga2V5IGNvbWJpbmF0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gY2hhcmFjdGVyIGZvciBrZXlcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBtb2RpZmllcnNcbiAgICAgKiBAcGFyYW0ge3N0cmluZz19IGFjdGlvbiBwYXNzZWQgaW5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfcGlja0Jlc3RBY3Rpb24oa2V5LCBtb2RpZmllcnMsIGFjdGlvbikge1xuXG4gICAgICAgIC8vIGlmIG5vIGFjdGlvbiB3YXMgcGlja2VkIGluIHdlIHNob3VsZCB0cnkgdG8gcGljayB0aGUgb25lXG4gICAgICAgIC8vIHRoYXQgd2UgdGhpbmsgd291bGQgd29yayBiZXN0IGZvciB0aGlzIGtleVxuICAgICAgICBpZiAoIWFjdGlvbikge1xuICAgICAgICAgICAgYWN0aW9uID0gX2dldFJldmVyc2VNYXAoKVtrZXldID8gJ2tleWRvd24nIDogJ2tleXByZXNzJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1vZGlmaWVyIGtleXMgZG9uJ3Qgd29yayBhcyBleHBlY3RlZCB3aXRoIGtleXByZXNzLFxuICAgICAgICAvLyBzd2l0Y2ggdG8ga2V5ZG93blxuICAgICAgICBpZiAoYWN0aW9uID09ICdrZXlwcmVzcycgJiYgbW9kaWZpZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgYWN0aW9uID0gJ2tleWRvd24nO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBmcm9tIGEgc3RyaW5nIGtleSBjb21iaW5hdGlvbiB0byBhbiBhcnJheVxuICAgICAqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBjb21iaW5hdGlvbiBsaWtlIFwiY29tbWFuZCtzaGlmdCtsXCJcbiAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfa2V5c0Zyb21TdHJpbmcoY29tYmluYXRpb24pIHtcbiAgICAgICAgaWYgKGNvbWJpbmF0aW9uID09PSAnKycpIHtcbiAgICAgICAgICAgIHJldHVybiBbJysnXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbWJpbmF0aW9uID0gY29tYmluYXRpb24ucmVwbGFjZSgvXFwrezJ9L2csICcrcGx1cycpO1xuICAgICAgICByZXR1cm4gY29tYmluYXRpb24uc3BsaXQoJysnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGluZm8gZm9yIGEgc3BlY2lmaWMga2V5IGNvbWJpbmF0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGNvbWJpbmF0aW9uIGtleSBjb21iaW5hdGlvbiAoXCJjb21tYW5kK3NcIiBvciBcImFcIiBvciBcIipcIilcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmc9fSBhY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9nZXRLZXlJbmZvKGNvbWJpbmF0aW9uLCBhY3Rpb24pIHtcbiAgICAgICAgdmFyIGtleXM7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIHZhciBpO1xuICAgICAgICB2YXIgbW9kaWZpZXJzID0gW107XG5cbiAgICAgICAgLy8gdGFrZSB0aGUga2V5cyBmcm9tIHRoaXMgcGF0dGVybiBhbmQgZmlndXJlIG91dCB3aGF0IHRoZSBhY3R1YWxcbiAgICAgICAgLy8gcGF0dGVybiBpcyBhbGwgYWJvdXRcbiAgICAgICAga2V5cyA9IF9rZXlzRnJvbVN0cmluZyhjb21iaW5hdGlvbik7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGtleSA9IGtleXNbaV07XG5cbiAgICAgICAgICAgIC8vIG5vcm1hbGl6ZSBrZXkgbmFtZXNcbiAgICAgICAgICAgIGlmIChfU1BFQ0lBTF9BTElBU0VTW2tleV0pIHtcbiAgICAgICAgICAgICAgICBrZXkgPSBfU1BFQ0lBTF9BTElBU0VTW2tleV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIHRoaXMgaXMgbm90IGEga2V5cHJlc3MgZXZlbnQgdGhlbiB3ZSBzaG91bGRcbiAgICAgICAgICAgIC8vIGJlIHNtYXJ0IGFib3V0IHVzaW5nIHNoaWZ0IGtleXNcbiAgICAgICAgICAgIC8vIHRoaXMgd2lsbCBvbmx5IHdvcmsgZm9yIFVTIGtleWJvYXJkcyBob3dldmVyXG4gICAgICAgICAgICBpZiAoYWN0aW9uICYmIGFjdGlvbiAhPSAna2V5cHJlc3MnICYmIF9TSElGVF9NQVBba2V5XSkge1xuICAgICAgICAgICAgICAgIGtleSA9IF9TSElGVF9NQVBba2V5XTtcbiAgICAgICAgICAgICAgICBtb2RpZmllcnMucHVzaCgnc2hpZnQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgdGhpcyBrZXkgaXMgYSBtb2RpZmllciB0aGVuIGFkZCBpdCB0byB0aGUgbGlzdCBvZiBtb2RpZmllcnNcbiAgICAgICAgICAgIGlmIChfaXNNb2RpZmllcihrZXkpKSB7XG4gICAgICAgICAgICAgICAgbW9kaWZpZXJzLnB1c2goa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRlcGVuZGluZyBvbiB3aGF0IHRoZSBrZXkgY29tYmluYXRpb24gaXNcbiAgICAgICAgLy8gd2Ugd2lsbCB0cnkgdG8gcGljayB0aGUgYmVzdCBldmVudCBmb3IgaXRcbiAgICAgICAgYWN0aW9uID0gX3BpY2tCZXN0QWN0aW9uKGtleSwgbW9kaWZpZXJzLCBhY3Rpb24pO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgIG1vZGlmaWVyczogbW9kaWZpZXJzLFxuICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb25cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfYmVsb25nc1RvKGVsZW1lbnQsIGFuY2VzdG9yKSB7XG4gICAgICAgIGlmIChlbGVtZW50ID09PSBudWxsIHx8IGVsZW1lbnQgPT09IGRvY3VtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZWxlbWVudCA9PT0gYW5jZXN0b3IpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIF9iZWxvbmdzVG8oZWxlbWVudC5wYXJlbnROb2RlLCBhbmNlc3Rvcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gTW91c2V0cmFwKHRhcmdldEVsZW1lbnQpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRhcmdldEVsZW1lbnQgPSB0YXJnZXRFbGVtZW50IHx8IGRvY3VtZW50O1xuXG4gICAgICAgIGlmICghKHNlbGYgaW5zdGFuY2VvZiBNb3VzZXRyYXApKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE1vdXNldHJhcCh0YXJnZXRFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBlbGVtZW50IHRvIGF0dGFjaCBrZXkgZXZlbnRzIHRvXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtFbGVtZW50fVxuICAgICAgICAgKi9cbiAgICAgICAgc2VsZi50YXJnZXQgPSB0YXJnZXRFbGVtZW50O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBhIGxpc3Qgb2YgYWxsIHRoZSBjYWxsYmFja3Mgc2V0dXAgdmlhIE1vdXNldHJhcC5iaW5kKClcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIHNlbGYuX2NhbGxiYWNrcyA9IHt9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkaXJlY3QgbWFwIG9mIHN0cmluZyBjb21iaW5hdGlvbnMgdG8gY2FsbGJhY2tzIHVzZWQgZm9yIHRyaWdnZXIoKVxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgc2VsZi5fZGlyZWN0TWFwID0ge307XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGtlZXBzIHRyYWNrIG9mIHdoYXQgbGV2ZWwgZWFjaCBzZXF1ZW5jZSBpcyBhdCBzaW5jZSBtdWx0aXBsZVxuICAgICAgICAgKiBzZXF1ZW5jZXMgY2FuIHN0YXJ0IG91dCB3aXRoIHRoZSBzYW1lIHNlcXVlbmNlXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgX3NlcXVlbmNlTGV2ZWxzID0ge307XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHZhcmlhYmxlIHRvIHN0b3JlIHRoZSBzZXRUaW1lb3V0IGNhbGxcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge251bGx8bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIF9yZXNldFRpbWVyO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiB0ZW1wb3Jhcnkgc3RhdGUgd2hlcmUgd2Ugd2lsbCBpZ25vcmUgdGhlIG5leHQga2V5dXBcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW58c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIF9pZ25vcmVOZXh0S2V5dXAgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogdGVtcG9yYXJ5IHN0YXRlIHdoZXJlIHdlIHdpbGwgaWdub3JlIHRoZSBuZXh0IGtleXByZXNzXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIF9pZ25vcmVOZXh0S2V5cHJlc3MgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogYXJlIHdlIGN1cnJlbnRseSBpbnNpZGUgb2YgYSBzZXF1ZW5jZT9cbiAgICAgICAgICogdHlwZSBvZiBhY3Rpb24gKFwia2V5dXBcIiBvciBcImtleWRvd25cIiBvciBcImtleXByZXNzXCIpIG9yIGZhbHNlXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufHN0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHZhciBfbmV4dEV4cGVjdGVkQWN0aW9uID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHJlc2V0cyBhbGwgc2VxdWVuY2UgY291bnRlcnMgZXhjZXB0IGZvciB0aGUgb25lcyBwYXNzZWQgaW5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGRvTm90UmVzZXRcbiAgICAgICAgICogQHJldHVybnMgdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX3Jlc2V0U2VxdWVuY2VzKGRvTm90UmVzZXQpIHtcbiAgICAgICAgICAgIGRvTm90UmVzZXQgPSBkb05vdFJlc2V0IHx8IHt9O1xuXG4gICAgICAgICAgICB2YXIgYWN0aXZlU2VxdWVuY2VzID0gZmFsc2UsXG4gICAgICAgICAgICAgICAga2V5O1xuXG4gICAgICAgICAgICBmb3IgKGtleSBpbiBfc2VxdWVuY2VMZXZlbHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZG9Ob3RSZXNldFtrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZVNlcXVlbmNlcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfc2VxdWVuY2VMZXZlbHNba2V5XSA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghYWN0aXZlU2VxdWVuY2VzKSB7XG4gICAgICAgICAgICAgICAgX25leHRFeHBlY3RlZEFjdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGZpbmRzIGFsbCBjYWxsYmFja3MgdGhhdCBtYXRjaCBiYXNlZCBvbiB0aGUga2V5Y29kZSwgbW9kaWZpZXJzLFxuICAgICAgICAgKiBhbmQgYWN0aW9uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjaGFyYWN0ZXJcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gbW9kaWZpZXJzXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnR8T2JqZWN0fSBlXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gc2VxdWVuY2VOYW1lIC0gbmFtZSBvZiB0aGUgc2VxdWVuY2Ugd2UgYXJlIGxvb2tpbmcgZm9yXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gY29tYmluYXRpb25cbiAgICAgICAgICogQHBhcmFtIHtudW1iZXI9fSBsZXZlbFxuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBfZ2V0TWF0Y2hlcyhjaGFyYWN0ZXIsIG1vZGlmaWVycywgZSwgc2VxdWVuY2VOYW1lLCBjb21iaW5hdGlvbiwgbGV2ZWwpIHtcbiAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrO1xuICAgICAgICAgICAgdmFyIG1hdGNoZXMgPSBbXTtcbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSBlLnR5cGU7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZXJlIGFyZSBubyBldmVudHMgcmVsYXRlZCB0byB0aGlzIGtleWNvZGVcbiAgICAgICAgICAgIGlmICghc2VsZi5fY2FsbGJhY2tzW2NoYXJhY3Rlcl0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIGEgbW9kaWZpZXIga2V5IGlzIGNvbWluZyB1cCBvbiBpdHMgb3duIHdlIHNob3VsZCBhbGxvdyBpdFxuICAgICAgICAgICAgaWYgKGFjdGlvbiA9PSAna2V5dXAnICYmIF9pc01vZGlmaWVyKGNoYXJhY3RlcikpIHtcbiAgICAgICAgICAgICAgICBtb2RpZmllcnMgPSBbY2hhcmFjdGVyXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbG9vcCB0aHJvdWdoIGFsbCBjYWxsYmFja3MgZm9yIHRoZSBrZXkgdGhhdCB3YXMgcHJlc3NlZFxuICAgICAgICAgICAgLy8gYW5kIHNlZSBpZiBhbnkgb2YgdGhlbSBtYXRjaFxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHNlbGYuX2NhbGxiYWNrc1tjaGFyYWN0ZXJdLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBzZWxmLl9jYWxsYmFja3NbY2hhcmFjdGVyXVtpXTtcblxuICAgICAgICAgICAgICAgIC8vIGlmIGEgc2VxdWVuY2UgbmFtZSBpcyBub3Qgc3BlY2lmaWVkLCBidXQgdGhpcyBpcyBhIHNlcXVlbmNlIGF0XG4gICAgICAgICAgICAgICAgLy8gdGhlIHdyb25nIGxldmVsIHRoZW4gbW92ZSBvbnRvIHRoZSBuZXh0IG1hdGNoXG4gICAgICAgICAgICAgICAgaWYgKCFzZXF1ZW5jZU5hbWUgJiYgY2FsbGJhY2suc2VxICYmIF9zZXF1ZW5jZUxldmVsc1tjYWxsYmFjay5zZXFdICE9IGNhbGxiYWNrLmxldmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBhY3Rpb24gd2UgYXJlIGxvb2tpbmcgZm9yIGRvZXNuJ3QgbWF0Y2ggdGhlIGFjdGlvbiB3ZSBnb3RcbiAgICAgICAgICAgICAgICAvLyB0aGVuIHdlIHNob3VsZCBrZWVwIGdvaW5nXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiAhPSBjYWxsYmFjay5hY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhpcyBpcyBhIGtleXByZXNzIGV2ZW50IGFuZCB0aGUgbWV0YSBrZXkgYW5kIGNvbnRyb2wga2V5XG4gICAgICAgICAgICAgICAgLy8gYXJlIG5vdCBwcmVzc2VkIHRoYXQgbWVhbnMgdGhhdCB3ZSBuZWVkIHRvIG9ubHkgbG9vayBhdCB0aGVcbiAgICAgICAgICAgICAgICAvLyBjaGFyYWN0ZXIsIG90aGVyd2lzZSBjaGVjayB0aGUgbW9kaWZpZXJzIGFzIHdlbGxcbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIC8vIGNocm9tZSB3aWxsIG5vdCBmaXJlIGEga2V5cHJlc3MgaWYgbWV0YSBvciBjb250cm9sIGlzIGRvd25cbiAgICAgICAgICAgICAgICAvLyBzYWZhcmkgd2lsbCBmaXJlIGEga2V5cHJlc3MgaWYgbWV0YSBvciBtZXRhK3NoaWZ0IGlzIGRvd25cbiAgICAgICAgICAgICAgICAvLyBmaXJlZm94IHdpbGwgZmlyZSBhIGtleXByZXNzIGlmIG1ldGEgb3IgY29udHJvbCBpcyBkb3duXG4gICAgICAgICAgICAgICAgaWYgKChhY3Rpb24gPT0gJ2tleXByZXNzJyAmJiAhZS5tZXRhS2V5ICYmICFlLmN0cmxLZXkpIHx8IF9tb2RpZmllcnNNYXRjaChtb2RpZmllcnMsIGNhbGxiYWNrLm1vZGlmaWVycykpIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIHlvdSBiaW5kIGEgY29tYmluYXRpb24gb3Igc2VxdWVuY2UgYSBzZWNvbmQgdGltZSBpdFxuICAgICAgICAgICAgICAgICAgICAvLyBzaG91bGQgb3ZlcndyaXRlIHRoZSBmaXJzdCBvbmUuICBpZiBhIHNlcXVlbmNlTmFtZSBvclxuICAgICAgICAgICAgICAgICAgICAvLyBjb21iaW5hdGlvbiBpcyBzcGVjaWZpZWQgaW4gdGhpcyBjYWxsIGl0IGRvZXMganVzdCB0aGF0XG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIC8vIEB0b2RvIG1ha2UgZGVsZXRpbmcgaXRzIG93biBtZXRob2Q/XG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWxldGVDb21ibyA9ICFzZXF1ZW5jZU5hbWUgJiYgY2FsbGJhY2suY29tYm8gPT0gY29tYmluYXRpb247XG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWxldGVTZXF1ZW5jZSA9IHNlcXVlbmNlTmFtZSAmJiBjYWxsYmFjay5zZXEgPT0gc2VxdWVuY2VOYW1lICYmIGNhbGxiYWNrLmxldmVsID09IGxldmVsO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVsZXRlQ29tYm8gfHwgZGVsZXRlU2VxdWVuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX2NhbGxiYWNrc1tjaGFyYWN0ZXJdLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoZXMucHVzaChjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbWF0Y2hlcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBhY3R1YWxseSBjYWxscyB0aGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgICpcbiAgICAgICAgICogaWYgeW91ciBjYWxsYmFjayBmdW5jdGlvbiByZXR1cm5zIGZhbHNlIHRoaXMgd2lsbCB1c2UgdGhlIGpxdWVyeVxuICAgICAgICAgKiBjb252ZW50aW9uIC0gcHJldmVudCBkZWZhdWx0IGFuZCBzdG9wIHByb3BvZ2F0aW9uIG9uIHRoZSBldmVudFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAgICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIF9maXJlQ2FsbGJhY2soY2FsbGJhY2ssIGUsIGNvbWJvLCBzZXF1ZW5jZSkge1xuXG4gICAgICAgICAgICAvLyBpZiB0aGlzIGV2ZW50IHNob3VsZCBub3QgaGFwcGVuIHN0b3AgaGVyZVxuICAgICAgICAgICAgaWYgKHNlbGYuc3RvcENhbGxiYWNrKGUsIGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudCwgY29tYm8sIHNlcXVlbmNlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKGUsIGNvbWJvKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBfcHJldmVudERlZmF1bHQoZSk7XG4gICAgICAgICAgICAgICAgX3N0b3BQcm9wYWdhdGlvbihlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBoYW5kbGVzIGEgY2hhcmFjdGVyIGtleSBldmVudFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2hhcmFjdGVyXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IG1vZGlmaWVyc1xuICAgICAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAgICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgICAgICovXG4gICAgICAgIHNlbGYuX2hhbmRsZUtleSA9IGZ1bmN0aW9uKGNoYXJhY3RlciwgbW9kaWZpZXJzLCBlKSB7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2tzID0gX2dldE1hdGNoZXMoY2hhcmFjdGVyLCBtb2RpZmllcnMsIGUpO1xuICAgICAgICAgICAgdmFyIGk7XG4gICAgICAgICAgICB2YXIgZG9Ob3RSZXNldCA9IHt9O1xuICAgICAgICAgICAgdmFyIG1heExldmVsID0gMDtcbiAgICAgICAgICAgIHZhciBwcm9jZXNzZWRTZXF1ZW5jZUNhbGxiYWNrID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgbWF4TGV2ZWwgZm9yIHNlcXVlbmNlcyBzbyB3ZSBjYW4gb25seSBleGVjdXRlIHRoZSBsb25nZXN0IGNhbGxiYWNrIHNlcXVlbmNlXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrc1tpXS5zZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgbWF4TGV2ZWwgPSBNYXRoLm1heChtYXhMZXZlbCwgY2FsbGJhY2tzW2ldLmxldmVsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGxvb3AgdGhyb3VnaCBtYXRjaGluZyBjYWxsYmFja3MgZm9yIHRoaXMga2V5IGV2ZW50XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBmaXJlIGZvciBhbGwgc2VxdWVuY2UgY2FsbGJhY2tzXG4gICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBiZWNhdXNlIGlmIGZvciBleGFtcGxlIHlvdSBoYXZlIG11bHRpcGxlIHNlcXVlbmNlc1xuICAgICAgICAgICAgICAgIC8vIGJvdW5kIHN1Y2ggYXMgXCJnIGlcIiBhbmQgXCJnIHRcIiB0aGV5IGJvdGggbmVlZCB0byBmaXJlIHRoZVxuICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrIGZvciBtYXRjaGluZyBnIGNhdXNlIG90aGVyd2lzZSB5b3UgY2FuIG9ubHkgZXZlclxuICAgICAgICAgICAgICAgIC8vIG1hdGNoIHRoZSBmaXJzdCBvbmVcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2tzW2ldLnNlcSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIG9ubHkgZmlyZSBjYWxsYmFja3MgZm9yIHRoZSBtYXhMZXZlbCB0byBwcmV2ZW50XG4gICAgICAgICAgICAgICAgICAgIC8vIHN1YnNlcXVlbmNlcyBmcm9tIGFsc28gZmlyaW5nXG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIC8vIGZvciBleGFtcGxlICdhIG9wdGlvbiBiJyBzaG91bGQgbm90IGNhdXNlICdvcHRpb24gYicgdG8gZmlyZVxuICAgICAgICAgICAgICAgICAgICAvLyBldmVuIHRob3VnaCAnb3B0aW9uIGInIGlzIHBhcnQgb2YgdGhlIG90aGVyIHNlcXVlbmNlXG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIC8vIGFueSBzZXF1ZW5jZXMgdGhhdCBkbyBub3QgbWF0Y2ggaGVyZSB3aWxsIGJlIGRpc2NhcmRlZFxuICAgICAgICAgICAgICAgICAgICAvLyBiZWxvdyBieSB0aGUgX3Jlc2V0U2VxdWVuY2VzIGNhbGxcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrc1tpXS5sZXZlbCAhPSBtYXhMZXZlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzZWRTZXF1ZW5jZUNhbGxiYWNrID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBrZWVwIGEgbGlzdCBvZiB3aGljaCBzZXF1ZW5jZXMgd2VyZSBtYXRjaGVzIGZvciBsYXRlclxuICAgICAgICAgICAgICAgICAgICBkb05vdFJlc2V0W2NhbGxiYWNrc1tpXS5zZXFdID0gMTtcbiAgICAgICAgICAgICAgICAgICAgX2ZpcmVDYWxsYmFjayhjYWxsYmFja3NbaV0uY2FsbGJhY2ssIGUsIGNhbGxiYWNrc1tpXS5jb21ibywgY2FsbGJhY2tzW2ldLnNlcSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlIHdlcmUgbm8gc2VxdWVuY2UgbWF0Y2hlcyBidXQgd2UgYXJlIHN0aWxsIGhlcmVcbiAgICAgICAgICAgICAgICAvLyB0aGF0IG1lYW5zIHRoaXMgaXMgYSByZWd1bGFyIG1hdGNoIHNvIHdlIHNob3VsZCBmaXJlIHRoYXRcbiAgICAgICAgICAgICAgICBpZiAoIXByb2Nlc3NlZFNlcXVlbmNlQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgX2ZpcmVDYWxsYmFjayhjYWxsYmFja3NbaV0uY2FsbGJhY2ssIGUsIGNhbGxiYWNrc1tpXS5jb21ibyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiB0aGUga2V5IHlvdSBwcmVzc2VkIG1hdGNoZXMgdGhlIHR5cGUgb2Ygc2VxdWVuY2Ugd2l0aG91dFxuICAgICAgICAgICAgLy8gYmVpbmcgYSBtb2RpZmllciAoaWUgXCJrZXl1cFwiIG9yIFwia2V5cHJlc3NcIikgdGhlbiB3ZSBzaG91bGRcbiAgICAgICAgICAgIC8vIHJlc2V0IGFsbCBzZXF1ZW5jZXMgdGhhdCB3ZXJlIG5vdCBtYXRjaGVkIGJ5IHRoaXMgZXZlbnRcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyB0aGlzIGlzIHNvLCBmb3IgZXhhbXBsZSwgaWYgeW91IGhhdmUgdGhlIHNlcXVlbmNlIFwiaCBhIHRcIiBhbmQgeW91XG4gICAgICAgICAgICAvLyB0eXBlIFwiaCBlIGEgciB0XCIgaXQgZG9lcyBub3QgbWF0Y2guICBpbiB0aGlzIGNhc2UgdGhlIFwiZVwiIHdpbGxcbiAgICAgICAgICAgIC8vIGNhdXNlIHRoZSBzZXF1ZW5jZSB0byByZXNldFxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIG1vZGlmaWVyIGtleXMgYXJlIGlnbm9yZWQgYmVjYXVzZSB5b3UgY2FuIGhhdmUgYSBzZXF1ZW5jZVxuICAgICAgICAgICAgLy8gdGhhdCBjb250YWlucyBtb2RpZmllcnMgc3VjaCBhcyBcImVudGVyIGN0cmwrc3BhY2VcIiBhbmQgaW4gbW9zdFxuICAgICAgICAgICAgLy8gY2FzZXMgdGhlIG1vZGlmaWVyIGtleSB3aWxsIGJlIHByZXNzZWQgYmVmb3JlIHRoZSBuZXh0IGtleVxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIGFsc28gaWYgeW91IGhhdmUgYSBzZXF1ZW5jZSBzdWNoIGFzIFwiY3RybCtiIGFcIiB0aGVuIHByZXNzaW5nIHRoZVxuICAgICAgICAgICAgLy8gXCJiXCIga2V5IHdpbGwgdHJpZ2dlciBhIFwia2V5cHJlc3NcIiBhbmQgYSBcImtleWRvd25cIlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIHRoZSBcImtleWRvd25cIiBpcyBleHBlY3RlZCB3aGVuIHRoZXJlIGlzIGEgbW9kaWZpZXIsIGJ1dCB0aGVcbiAgICAgICAgICAgIC8vIFwia2V5cHJlc3NcIiBlbmRzIHVwIG1hdGNoaW5nIHRoZSBfbmV4dEV4cGVjdGVkQWN0aW9uIHNpbmNlIGl0IG9jY3Vyc1xuICAgICAgICAgICAgLy8gYWZ0ZXIgYW5kIHRoYXQgY2F1c2VzIHRoZSBzZXF1ZW5jZSB0byByZXNldFxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIHdlIGlnbm9yZSBrZXlwcmVzc2VzIGluIGEgc2VxdWVuY2UgdGhhdCBkaXJlY3RseSBmb2xsb3cgYSBrZXlkb3duXG4gICAgICAgICAgICAvLyBmb3IgdGhlIHNhbWUgY2hhcmFjdGVyXG4gICAgICAgICAgICB2YXIgaWdub3JlVGhpc0tleXByZXNzID0gZS50eXBlID09ICdrZXlwcmVzcycgJiYgX2lnbm9yZU5leHRLZXlwcmVzcztcbiAgICAgICAgICAgIGlmIChlLnR5cGUgPT0gX25leHRFeHBlY3RlZEFjdGlvbiAmJiAhX2lzTW9kaWZpZXIoY2hhcmFjdGVyKSAmJiAhaWdub3JlVGhpc0tleXByZXNzKSB7XG4gICAgICAgICAgICAgICAgX3Jlc2V0U2VxdWVuY2VzKGRvTm90UmVzZXQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfaWdub3JlTmV4dEtleXByZXNzID0gcHJvY2Vzc2VkU2VxdWVuY2VDYWxsYmFjayAmJiBlLnR5cGUgPT0gJ2tleWRvd24nO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBoYW5kbGVzIGEga2V5ZG93biBldmVudFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAgICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIF9oYW5kbGVLZXlFdmVudChlKSB7XG5cbiAgICAgICAgICAgIC8vIG5vcm1hbGl6ZSBlLndoaWNoIGZvciBrZXkgZXZlbnRzXG4gICAgICAgICAgICAvLyBAc2VlIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDI4NTYyNy9qYXZhc2NyaXB0LWtleWNvZGUtdnMtY2hhcmNvZGUtdXR0ZXItY29uZnVzaW9uXG4gICAgICAgICAgICBpZiAodHlwZW9mIGUud2hpY2ggIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgZS53aGljaCA9IGUua2V5Q29kZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGNoYXJhY3RlciA9IF9jaGFyYWN0ZXJGcm9tRXZlbnQoZSk7XG5cbiAgICAgICAgICAgIC8vIG5vIGNoYXJhY3RlciBmb3VuZCB0aGVuIHN0b3BcbiAgICAgICAgICAgIGlmICghY2hhcmFjdGVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBuZWVkIHRvIHVzZSA9PT0gZm9yIHRoZSBjaGFyYWN0ZXIgY2hlY2sgYmVjYXVzZSB0aGUgY2hhcmFjdGVyIGNhbiBiZSAwXG4gICAgICAgICAgICBpZiAoZS50eXBlID09ICdrZXl1cCcgJiYgX2lnbm9yZU5leHRLZXl1cCA9PT0gY2hhcmFjdGVyKSB7XG4gICAgICAgICAgICAgICAgX2lnbm9yZU5leHRLZXl1cCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VsZi5oYW5kbGVLZXkoY2hhcmFjdGVyLCBfZXZlbnRNb2RpZmllcnMoZSksIGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNhbGxlZCB0byBzZXQgYSAxIHNlY29uZCB0aW1lb3V0IG9uIHRoZSBzcGVjaWZpZWQgc2VxdWVuY2VcbiAgICAgICAgICpcbiAgICAgICAgICogdGhpcyBpcyBzbyBhZnRlciBlYWNoIGtleSBwcmVzcyBpbiB0aGUgc2VxdWVuY2UgeW91IGhhdmUgMSBzZWNvbmRcbiAgICAgICAgICogdG8gcHJlc3MgdGhlIG5leHQga2V5IGJlZm9yZSB5b3UgaGF2ZSB0byBzdGFydCBvdmVyXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIF9yZXNldFNlcXVlbmNlVGltZXIoKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoX3Jlc2V0VGltZXIpO1xuICAgICAgICAgICAgX3Jlc2V0VGltZXIgPSBzZXRUaW1lb3V0KF9yZXNldFNlcXVlbmNlcywgMTAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogYmluZHMgYSBrZXkgc2VxdWVuY2UgdG8gYW4gZXZlbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbWJvIC0gY29tYm8gc3BlY2lmaWVkIGluIGJpbmQgY2FsbFxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBrZXlzXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gYWN0aW9uXG4gICAgICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIF9iaW5kU2VxdWVuY2UoY29tYm8sIGtleXMsIGNhbGxiYWNrLCBhY3Rpb24pIHtcblxuICAgICAgICAgICAgLy8gc3RhcnQgb2ZmIGJ5IGFkZGluZyBhIHNlcXVlbmNlIGxldmVsIHJlY29yZCBmb3IgdGhpcyBjb21iaW5hdGlvblxuICAgICAgICAgICAgLy8gYW5kIHNldHRpbmcgdGhlIGxldmVsIHRvIDBcbiAgICAgICAgICAgIF9zZXF1ZW5jZUxldmVsc1tjb21ib10gPSAwO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIGNhbGxiYWNrIHRvIGluY3JlYXNlIHRoZSBzZXF1ZW5jZSBsZXZlbCBmb3IgdGhpcyBzZXF1ZW5jZSBhbmQgcmVzZXRcbiAgICAgICAgICAgICAqIGFsbCBvdGhlciBzZXF1ZW5jZXMgdGhhdCB3ZXJlIGFjdGl2ZVxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXh0QWN0aW9uXG4gICAgICAgICAgICAgKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIF9pbmNyZWFzZVNlcXVlbmNlKG5leHRBY3Rpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIF9uZXh0RXhwZWN0ZWRBY3Rpb24gPSBuZXh0QWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICArK19zZXF1ZW5jZUxldmVsc1tjb21ib107XG4gICAgICAgICAgICAgICAgICAgIF9yZXNldFNlcXVlbmNlVGltZXIoKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIHdyYXBzIHRoZSBzcGVjaWZpZWQgY2FsbGJhY2sgaW5zaWRlIG9mIGFub3RoZXIgZnVuY3Rpb24gaW4gb3JkZXJcbiAgICAgICAgICAgICAqIHRvIHJlc2V0IGFsbCBzZXF1ZW5jZSBjb3VudGVycyBhcyBzb29uIGFzIHRoaXMgc2VxdWVuY2UgaXMgZG9uZVxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICAgICAgICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gX2NhbGxiYWNrQW5kUmVzZXQoZSkge1xuICAgICAgICAgICAgICAgIF9maXJlQ2FsbGJhY2soY2FsbGJhY2ssIGUsIGNvbWJvKTtcblxuICAgICAgICAgICAgICAgIC8vIHdlIHNob3VsZCBpZ25vcmUgdGhlIG5leHQga2V5IHVwIGlmIHRoZSBhY3Rpb24gaXMga2V5IGRvd25cbiAgICAgICAgICAgICAgICAvLyBvciBrZXlwcmVzcy4gIHRoaXMgaXMgc28gaWYgeW91IGZpbmlzaCBhIHNlcXVlbmNlIGFuZFxuICAgICAgICAgICAgICAgIC8vIHJlbGVhc2UgdGhlIGtleSB0aGUgZmluYWwga2V5IHdpbGwgbm90IHRyaWdnZXIgYSBrZXl1cFxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gIT09ICdrZXl1cCcpIHtcbiAgICAgICAgICAgICAgICAgICAgX2lnbm9yZU5leHRLZXl1cCA9IF9jaGFyYWN0ZXJGcm9tRXZlbnQoZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gd2VpcmQgcmFjZSBjb25kaXRpb24gaWYgYSBzZXF1ZW5jZSBlbmRzIHdpdGggdGhlIGtleVxuICAgICAgICAgICAgICAgIC8vIGFub3RoZXIgc2VxdWVuY2UgYmVnaW5zIHdpdGhcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KF9yZXNldFNlcXVlbmNlcywgMTApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBsb29wIHRocm91Z2gga2V5cyBvbmUgYXQgYSB0aW1lIGFuZCBiaW5kIHRoZSBhcHByb3ByaWF0ZSBjYWxsYmFja1xuICAgICAgICAgICAgLy8gZnVuY3Rpb24uICBmb3IgYW55IGtleSBsZWFkaW5nIHVwIHRvIHRoZSBmaW5hbCBvbmUgaXQgc2hvdWxkXG4gICAgICAgICAgICAvLyBpbmNyZWFzZSB0aGUgc2VxdWVuY2UuIGFmdGVyIHRoZSBmaW5hbCwgaXQgc2hvdWxkIHJlc2V0IGFsbCBzZXF1ZW5jZXNcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBpZiBhbiBhY3Rpb24gaXMgc3BlY2lmaWVkIGluIHRoZSBvcmlnaW5hbCBiaW5kIGNhbGwgdGhlbiB0aGF0IHdpbGxcbiAgICAgICAgICAgIC8vIGJlIHVzZWQgdGhyb3VnaG91dC4gIG90aGVyd2lzZSB3ZSB3aWxsIHBhc3MgdGhlIGFjdGlvbiB0aGF0IHRoZVxuICAgICAgICAgICAgLy8gbmV4dCBrZXkgaW4gdGhlIHNlcXVlbmNlIHNob3VsZCBtYXRjaC4gIHRoaXMgYWxsb3dzIGEgc2VxdWVuY2VcbiAgICAgICAgICAgIC8vIHRvIG1peCBhbmQgbWF0Y2gga2V5cHJlc3MgYW5kIGtleWRvd24gZXZlbnRzIGRlcGVuZGluZyBvbiB3aGljaFxuICAgICAgICAgICAgLy8gb25lcyBhcmUgYmV0dGVyIHN1aXRlZCB0byB0aGUga2V5IHByb3ZpZGVkXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICB2YXIgaXNGaW5hbCA9IGkgKyAxID09PSBrZXlzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB2YXIgd3JhcHBlZENhbGxiYWNrID0gaXNGaW5hbCA/IF9jYWxsYmFja0FuZFJlc2V0IDogX2luY3JlYXNlU2VxdWVuY2UoYWN0aW9uIHx8IF9nZXRLZXlJbmZvKGtleXNbaSArIDFdKS5hY3Rpb24pO1xuICAgICAgICAgICAgICAgIF9iaW5kU2luZ2xlKGtleXNbaV0sIHdyYXBwZWRDYWxsYmFjaywgYWN0aW9uLCBjb21ibywgaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogYmluZHMgYSBzaW5nbGUga2V5Ym9hcmQgY29tYmluYXRpb25cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbWJpbmF0aW9uXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gYWN0aW9uXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gc2VxdWVuY2VOYW1lIC0gbmFtZSBvZiBzZXF1ZW5jZSBpZiBwYXJ0IG9mIHNlcXVlbmNlXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gbGV2ZWwgLSB3aGF0IHBhcnQgb2YgdGhlIHNlcXVlbmNlIHRoZSBjb21tYW5kIGlzXG4gICAgICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIF9iaW5kU2luZ2xlKGNvbWJpbmF0aW9uLCBjYWxsYmFjaywgYWN0aW9uLCBzZXF1ZW5jZU5hbWUsIGxldmVsKSB7XG5cbiAgICAgICAgICAgIC8vIHN0b3JlIGEgZGlyZWN0IG1hcHBlZCByZWZlcmVuY2UgZm9yIHVzZSB3aXRoIE1vdXNldHJhcC50cmlnZ2VyXG4gICAgICAgICAgICBzZWxmLl9kaXJlY3RNYXBbY29tYmluYXRpb24gKyAnOicgKyBhY3Rpb25dID0gY2FsbGJhY2s7XG5cbiAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSBtdWx0aXBsZSBzcGFjZXMgaW4gYSByb3cgYmVjb21lIGEgc2luZ2xlIHNwYWNlXG4gICAgICAgICAgICBjb21iaW5hdGlvbiA9IGNvbWJpbmF0aW9uLnJlcGxhY2UoL1xccysvZywgJyAnKTtcblxuICAgICAgICAgICAgdmFyIHNlcXVlbmNlID0gY29tYmluYXRpb24uc3BsaXQoJyAnKTtcbiAgICAgICAgICAgIHZhciBpbmZvO1xuXG4gICAgICAgICAgICAvLyBpZiB0aGlzIHBhdHRlcm4gaXMgYSBzZXF1ZW5jZSBvZiBrZXlzIHRoZW4gcnVuIHRocm91Z2ggdGhpcyBtZXRob2RcbiAgICAgICAgICAgIC8vIHRvIHJlcHJvY2VzcyBlYWNoIHBhdHRlcm4gb25lIGtleSBhdCBhIHRpbWVcbiAgICAgICAgICAgIGlmIChzZXF1ZW5jZS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgX2JpbmRTZXF1ZW5jZShjb21iaW5hdGlvbiwgc2VxdWVuY2UsIGNhbGxiYWNrLCBhY3Rpb24pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaW5mbyA9IF9nZXRLZXlJbmZvKGNvbWJpbmF0aW9uLCBhY3Rpb24pO1xuXG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgdG8gaW5pdGlhbGl6ZSBhcnJheSBpZiB0aGlzIGlzIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgICAgICAvLyBhIGNhbGxiYWNrIGlzIGFkZGVkIGZvciB0aGlzIGtleVxuICAgICAgICAgICAgc2VsZi5fY2FsbGJhY2tzW2luZm8ua2V5XSA9IHNlbGYuX2NhbGxiYWNrc1tpbmZvLmtleV0gfHwgW107XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSBhbiBleGlzdGluZyBtYXRjaCBpZiB0aGVyZSBpcyBvbmVcbiAgICAgICAgICAgIF9nZXRNYXRjaGVzKGluZm8ua2V5LCBpbmZvLm1vZGlmaWVycywge3R5cGU6IGluZm8uYWN0aW9ufSwgc2VxdWVuY2VOYW1lLCBjb21iaW5hdGlvbiwgbGV2ZWwpO1xuXG4gICAgICAgICAgICAvLyBhZGQgdGhpcyBjYWxsIGJhY2sgdG8gdGhlIGFycmF5XG4gICAgICAgICAgICAvLyBpZiBpdCBpcyBhIHNlcXVlbmNlIHB1dCBpdCBhdCB0aGUgYmVnaW5uaW5nXG4gICAgICAgICAgICAvLyBpZiBub3QgcHV0IGl0IGF0IHRoZSBlbmRcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyB0aGlzIGlzIGltcG9ydGFudCBiZWNhdXNlIHRoZSB3YXkgdGhlc2UgYXJlIHByb2Nlc3NlZCBleHBlY3RzXG4gICAgICAgICAgICAvLyB0aGUgc2VxdWVuY2Ugb25lcyB0byBjb21lIGZpcnN0XG4gICAgICAgICAgICBzZWxmLl9jYWxsYmFja3NbaW5mby5rZXldW3NlcXVlbmNlTmFtZSA/ICd1bnNoaWZ0JyA6ICdwdXNoJ10oe1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcbiAgICAgICAgICAgICAgICBtb2RpZmllcnM6IGluZm8ubW9kaWZpZXJzLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogaW5mby5hY3Rpb24sXG4gICAgICAgICAgICAgICAgc2VxOiBzZXF1ZW5jZU5hbWUsXG4gICAgICAgICAgICAgICAgbGV2ZWw6IGxldmVsLFxuICAgICAgICAgICAgICAgIGNvbWJvOiBjb21iaW5hdGlvblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogYmluZHMgbXVsdGlwbGUgY29tYmluYXRpb25zIHRvIHRoZSBzYW1lIGNhbGxiYWNrXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGNvbWJpbmF0aW9uc1xuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ3x1bmRlZmluZWR9IGFjdGlvblxuICAgICAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICAgICAqL1xuICAgICAgICBzZWxmLl9iaW5kTXVsdGlwbGUgPSBmdW5jdGlvbihjb21iaW5hdGlvbnMsIGNhbGxiYWNrLCBhY3Rpb24pIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29tYmluYXRpb25zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgX2JpbmRTaW5nbGUoY29tYmluYXRpb25zW2ldLCBjYWxsYmFjaywgYWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvLyBzdGFydCFcbiAgICAgICAgX2FkZEV2ZW50KHRhcmdldEVsZW1lbnQsICdrZXlwcmVzcycsIF9oYW5kbGVLZXlFdmVudCk7XG4gICAgICAgIF9hZGRFdmVudCh0YXJnZXRFbGVtZW50LCAna2V5ZG93bicsIF9oYW5kbGVLZXlFdmVudCk7XG4gICAgICAgIF9hZGRFdmVudCh0YXJnZXRFbGVtZW50LCAna2V5dXAnLCBfaGFuZGxlS2V5RXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGJpbmRzIGFuIGV2ZW50IHRvIG1vdXNldHJhcFxuICAgICAqXG4gICAgICogY2FuIGJlIGEgc2luZ2xlIGtleSwgYSBjb21iaW5hdGlvbiBvZiBrZXlzIHNlcGFyYXRlZCB3aXRoICssXG4gICAgICogYW4gYXJyYXkgb2Yga2V5cywgb3IgYSBzZXF1ZW5jZSBvZiBrZXlzIHNlcGFyYXRlZCBieSBzcGFjZXNcbiAgICAgKlxuICAgICAqIGJlIHN1cmUgdG8gbGlzdCB0aGUgbW9kaWZpZXIga2V5cyBmaXJzdCB0byBtYWtlIHN1cmUgdGhhdCB0aGVcbiAgICAgKiBjb3JyZWN0IGtleSBlbmRzIHVwIGdldHRpbmcgYm91bmQgKHRoZSBsYXN0IGtleSBpbiB0aGUgcGF0dGVybilcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfEFycmF5fSBrZXlzXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0ge3N0cmluZz19IGFjdGlvbiAtICdrZXlwcmVzcycsICdrZXlkb3duJywgb3IgJ2tleXVwJ1xuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBNb3VzZXRyYXAucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbihrZXlzLCBjYWxsYmFjaywgYWN0aW9uKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAga2V5cyA9IGtleXMgaW5zdGFuY2VvZiBBcnJheSA/IGtleXMgOiBba2V5c107XG4gICAgICAgIHNlbGYuX2JpbmRNdWx0aXBsZS5jYWxsKHNlbGYsIGtleXMsIGNhbGxiYWNrLCBhY3Rpb24pO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogdW5iaW5kcyBhbiBldmVudCB0byBtb3VzZXRyYXBcbiAgICAgKlxuICAgICAqIHRoZSB1bmJpbmRpbmcgc2V0cyB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gb2YgdGhlIHNwZWNpZmllZCBrZXkgY29tYm9cbiAgICAgKiB0byBhbiBlbXB0eSBmdW5jdGlvbiBhbmQgZGVsZXRlcyB0aGUgY29ycmVzcG9uZGluZyBrZXkgaW4gdGhlXG4gICAgICogX2RpcmVjdE1hcCBkaWN0LlxuICAgICAqXG4gICAgICogVE9ETzogYWN0dWFsbHkgcmVtb3ZlIHRoaXMgZnJvbSB0aGUgX2NhbGxiYWNrcyBkaWN0aW9uYXJ5IGluc3RlYWRcbiAgICAgKiBvZiBiaW5kaW5nIGFuIGVtcHR5IGZ1bmN0aW9uXG4gICAgICpcbiAgICAgKiB0aGUga2V5Y29tYm8rYWN0aW9uIGhhcyB0byBiZSBleGFjdGx5IHRoZSBzYW1lIGFzXG4gICAgICogaXQgd2FzIGRlZmluZWQgaW4gdGhlIGJpbmQgbWV0aG9kXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xBcnJheX0ga2V5c1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb25cbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgTW91c2V0cmFwLnByb3RvdHlwZS51bmJpbmQgPSBmdW5jdGlvbihrZXlzLCBhY3Rpb24pIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICByZXR1cm4gc2VsZi5iaW5kLmNhbGwoc2VsZiwga2V5cywgZnVuY3Rpb24oKSB7fSwgYWN0aW9uKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogdHJpZ2dlcnMgYW4gZXZlbnQgdGhhdCBoYXMgYWxyZWFkeSBiZWVuIGJvdW5kXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5c1xuICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gYWN0aW9uXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIE1vdXNldHJhcC5wcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uKGtleXMsIGFjdGlvbikge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmIChzZWxmLl9kaXJlY3RNYXBba2V5cyArICc6JyArIGFjdGlvbl0pIHtcbiAgICAgICAgICAgIHNlbGYuX2RpcmVjdE1hcFtrZXlzICsgJzonICsgYWN0aW9uXSh7fSwga2V5cyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIHJlc2V0cyB0aGUgbGlicmFyeSBiYWNrIHRvIGl0cyBpbml0aWFsIHN0YXRlLiAgdGhpcyBpcyB1c2VmdWxcbiAgICAgKiBpZiB5b3Ugd2FudCB0byBjbGVhciBvdXQgdGhlIGN1cnJlbnQga2V5Ym9hcmQgc2hvcnRjdXRzIGFuZCBiaW5kXG4gICAgICogbmV3IG9uZXMgLSBmb3IgZXhhbXBsZSBpZiB5b3Ugc3dpdGNoIHRvIGFub3RoZXIgcGFnZVxuICAgICAqXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIE1vdXNldHJhcC5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLl9jYWxsYmFja3MgPSB7fTtcbiAgICAgICAgc2VsZi5fZGlyZWN0TWFwID0ge307XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBzaG91bGQgd2Ugc3RvcCB0aGlzIGV2ZW50IGJlZm9yZSBmaXJpbmcgb2ZmIGNhbGxiYWNrc1xuICAgICAqXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG4gICAgTW91c2V0cmFwLnByb3RvdHlwZS5zdG9wQ2FsbGJhY2sgPSBmdW5jdGlvbihlLCBlbGVtZW50KSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAvLyBpZiB0aGUgZWxlbWVudCBoYXMgdGhlIGNsYXNzIFwibW91c2V0cmFwXCIgdGhlbiBubyBuZWVkIHRvIHN0b3BcbiAgICAgICAgaWYgKCgnICcgKyBlbGVtZW50LmNsYXNzTmFtZSArICcgJykuaW5kZXhPZignIG1vdXNldHJhcCAnKSA+IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoX2JlbG9uZ3NUbyhlbGVtZW50LCBzZWxmLnRhcmdldCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN0b3AgZm9yIGlucHV0LCBzZWxlY3QsIGFuZCB0ZXh0YXJlYVxuICAgICAgICByZXR1cm4gZWxlbWVudC50YWdOYW1lID09ICdJTlBVVCcgfHwgZWxlbWVudC50YWdOYW1lID09ICdTRUxFQ1QnIHx8IGVsZW1lbnQudGFnTmFtZSA9PSAnVEVYVEFSRUEnIHx8IGVsZW1lbnQuaXNDb250ZW50RWRpdGFibGU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGV4cG9zZXMgX2hhbmRsZUtleSBwdWJsaWNseSBzbyBpdCBjYW4gYmUgb3ZlcndyaXR0ZW4gYnkgZXh0ZW5zaW9uc1xuICAgICAqL1xuICAgIE1vdXNldHJhcC5wcm90b3R5cGUuaGFuZGxlS2V5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHNlbGYuX2hhbmRsZUtleS5hcHBseShzZWxmLCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBhbGxvdyBjdXN0b20ga2V5IG1hcHBpbmdzXG4gICAgICovXG4gICAgTW91c2V0cmFwLmFkZEtleWNvZGVzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICAgIGlmIChvYmplY3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIF9NQVBba2V5XSA9IG9iamVjdFtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF9SRVZFUlNFX01BUCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEluaXQgdGhlIGdsb2JhbCBtb3VzZXRyYXAgZnVuY3Rpb25zXG4gICAgICpcbiAgICAgKiBUaGlzIG1ldGhvZCBpcyBuZWVkZWQgdG8gYWxsb3cgdGhlIGdsb2JhbCBtb3VzZXRyYXAgZnVuY3Rpb25zIHRvIHdvcmtcbiAgICAgKiBub3cgdGhhdCBtb3VzZXRyYXAgaXMgYSBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAgICAgKi9cbiAgICBNb3VzZXRyYXAuaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZG9jdW1lbnRNb3VzZXRyYXAgPSBNb3VzZXRyYXAoZG9jdW1lbnQpO1xuICAgICAgICBmb3IgKHZhciBtZXRob2QgaW4gZG9jdW1lbnRNb3VzZXRyYXApIHtcbiAgICAgICAgICAgIGlmIChtZXRob2QuY2hhckF0KDApICE9PSAnXycpIHtcbiAgICAgICAgICAgICAgICBNb3VzZXRyYXBbbWV0aG9kXSA9IChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50TW91c2V0cmFwW21ldGhvZF0uYXBwbHkoZG9jdW1lbnRNb3VzZXRyYXAsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSAobWV0aG9kKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgTW91c2V0cmFwLmluaXQoKTtcblxuICAgIC8vIGV4cG9zZSBtb3VzZXRyYXAgdG8gdGhlIGdsb2JhbCBvYmplY3RcbiAgICB3aW5kb3cuTW91c2V0cmFwID0gTW91c2V0cmFwO1xuXG4gICAgLy8gZXhwb3NlIGFzIGEgY29tbW9uIGpzIG1vZHVsZVxuICAgIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IE1vdXNldHJhcDtcbiAgICB9XG5cbiAgICAvLyBleHBvc2UgbW91c2V0cmFwIGFzIGFuIEFNRCBtb2R1bGVcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBNb3VzZXRyYXA7XG4gICAgICAgIH0pO1xuICAgIH1cbn0pICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IG51bGwsIHR5cGVvZiAgd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IGRvY3VtZW50IDogbnVsbCk7XG4iLCIoZnVuY3Rpb24gKHJvb3QsIGZhY3Rvcnkpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgLyppc3RhbmJ1bCBpZ25vcmUgbmV4dDpjYW50IHRlc3QqL1xuICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICBkZWZpbmUoW10sIGZhY3RvcnkpO1xuICB9IGVsc2Uge1xuICAgIC8vIEJyb3dzZXIgZ2xvYmFsc1xuICAgIHJvb3Qub2JqZWN0UGF0aCA9IGZhY3RvcnkoKTtcbiAgfVxufSkodGhpcywgZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG4gIGZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkge1xuICAgIGlmKG9iaiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgLy90byBoYW5kbGUgb2JqZWN0cyB3aXRoIG51bGwgcHJvdG90eXBlcyAodG9vIGVkZ2UgY2FzZT8pXG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApXG4gIH1cblxuICBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlKXtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgZm9yICh2YXIgaSBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKGhhc093blByb3BlcnR5KHZhbHVlLCBpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9TdHJpbmcodHlwZSl7XG4gICAgcmV0dXJuIHRvU3RyLmNhbGwodHlwZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc09iamVjdChvYmope1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiB0b1N0cmluZyhvYmopID09PSBcIltvYmplY3QgT2JqZWN0XVwiO1xuICB9XG5cbiAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uKG9iail7XG4gICAgLyppc3RhbmJ1bCBpZ25vcmUgbmV4dDpjYW50IHRlc3QqL1xuICAgIHJldHVybiB0b1N0ci5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gIH1cblxuICBmdW5jdGlvbiBpc0Jvb2xlYW4ob2JqKXtcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nIHx8IHRvU3RyaW5nKG9iaikgPT09ICdbb2JqZWN0IEJvb2xlYW5dJztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEtleShrZXkpe1xuICAgIHZhciBpbnRLZXkgPSBwYXJzZUludChrZXkpO1xuICAgIGlmIChpbnRLZXkudG9TdHJpbmcoKSA9PT0ga2V5KSB7XG4gICAgICByZXR1cm4gaW50S2V5O1xuICAgIH1cbiAgICByZXR1cm4ga2V5O1xuICB9XG5cbiAgZnVuY3Rpb24gZmFjdG9yeShvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cblxuICAgIHZhciBvYmplY3RQYXRoID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqZWN0UGF0aCkucmVkdWNlKGZ1bmN0aW9uKHByb3h5LCBwcm9wKSB7XG4gICAgICAgIGlmKHByb3AgPT09ICdjcmVhdGUnKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3h5O1xuICAgICAgICB9XG5cbiAgICAgICAgLyppc3RhbmJ1bCBpZ25vcmUgZWxzZSovXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0UGF0aFtwcm9wXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHByb3h5W3Byb3BdID0gb2JqZWN0UGF0aFtwcm9wXS5iaW5kKG9iamVjdFBhdGgsIG9iaik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHJveHk7XG4gICAgICB9LCB7fSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGhhc1NoYWxsb3dQcm9wZXJ0eShvYmosIHByb3ApIHtcbiAgICAgIHJldHVybiAob3B0aW9ucy5pbmNsdWRlSW5oZXJpdGVkUHJvcHMgfHwgKHR5cGVvZiBwcm9wID09PSAnbnVtYmVyJyAmJiBBcnJheS5pc0FycmF5KG9iaikpIHx8IGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2hhbGxvd1Byb3BlcnR5KG9iaiwgcHJvcCkge1xuICAgICAgaWYgKGhhc1NoYWxsb3dQcm9wZXJ0eShvYmosIHByb3ApKSB7XG4gICAgICAgIHJldHVybiBvYmpbcHJvcF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0KG9iaiwgcGF0aCwgdmFsdWUsIGRvTm90UmVwbGFjZSl7XG4gICAgICBpZiAodHlwZW9mIHBhdGggPT09ICdudW1iZXInKSB7XG4gICAgICAgIHBhdGggPSBbcGF0aF07XG4gICAgICB9XG4gICAgICBpZiAoIXBhdGggfHwgcGF0aC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHNldChvYmosIHBhdGguc3BsaXQoJy4nKS5tYXAoZ2V0S2V5KSwgdmFsdWUsIGRvTm90UmVwbGFjZSk7XG4gICAgICB9XG4gICAgICB2YXIgY3VycmVudFBhdGggPSBwYXRoWzBdO1xuICAgICAgdmFyIGN1cnJlbnRWYWx1ZSA9IGdldFNoYWxsb3dQcm9wZXJ0eShvYmosIGN1cnJlbnRQYXRoKTtcbiAgICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBpZiAoY3VycmVudFZhbHVlID09PSB2b2lkIDAgfHwgIWRvTm90UmVwbGFjZSkge1xuICAgICAgICAgIG9ialtjdXJyZW50UGF0aF0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VycmVudFZhbHVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoY3VycmVudFZhbHVlID09PSB2b2lkIDApIHtcbiAgICAgICAgLy9jaGVjayBpZiB3ZSBhc3N1bWUgYW4gYXJyYXlcbiAgICAgICAgaWYodHlwZW9mIHBhdGhbMV0gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgb2JqW2N1cnJlbnRQYXRoXSA9IFtdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9ialtjdXJyZW50UGF0aF0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2V0KG9ialtjdXJyZW50UGF0aF0sIHBhdGguc2xpY2UoMSksIHZhbHVlLCBkb05vdFJlcGxhY2UpO1xuICAgIH1cblxuICAgIG9iamVjdFBhdGguaGFzID0gZnVuY3Rpb24gKG9iaiwgcGF0aCkge1xuICAgICAgaWYgKHR5cGVvZiBwYXRoID09PSAnbnVtYmVyJykge1xuICAgICAgICBwYXRoID0gW3BhdGhdO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcGF0aCA9IHBhdGguc3BsaXQoJy4nKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFwYXRoIHx8IHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAhIW9iajtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBqID0gZ2V0S2V5KHBhdGhbaV0pO1xuXG4gICAgICAgIGlmKCh0eXBlb2YgaiA9PT0gJ251bWJlcicgJiYgaXNBcnJheShvYmopICYmIGogPCBvYmoubGVuZ3RoKSB8fFxuICAgICAgICAgIChvcHRpb25zLmluY2x1ZGVJbmhlcml0ZWRQcm9wcyA/IChqIGluIE9iamVjdChvYmopKSA6IGhhc093blByb3BlcnR5KG9iaiwgaikpKSB7XG4gICAgICAgICAgb2JqID0gb2JqW2pdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgb2JqZWN0UGF0aC5lbnN1cmVFeGlzdHMgPSBmdW5jdGlvbiAob2JqLCBwYXRoLCB2YWx1ZSl7XG4gICAgICByZXR1cm4gc2V0KG9iaiwgcGF0aCwgdmFsdWUsIHRydWUpO1xuICAgIH07XG5cbiAgICBvYmplY3RQYXRoLnNldCA9IGZ1bmN0aW9uIChvYmosIHBhdGgsIHZhbHVlLCBkb05vdFJlcGxhY2Upe1xuICAgICAgcmV0dXJuIHNldChvYmosIHBhdGgsIHZhbHVlLCBkb05vdFJlcGxhY2UpO1xuICAgIH07XG5cbiAgICBvYmplY3RQYXRoLmluc2VydCA9IGZ1bmN0aW9uIChvYmosIHBhdGgsIHZhbHVlLCBhdCl7XG4gICAgICB2YXIgYXJyID0gb2JqZWN0UGF0aC5nZXQob2JqLCBwYXRoKTtcbiAgICAgIGF0ID0gfn5hdDtcbiAgICAgIGlmICghaXNBcnJheShhcnIpKSB7XG4gICAgICAgIGFyciA9IFtdO1xuICAgICAgICBvYmplY3RQYXRoLnNldChvYmosIHBhdGgsIGFycik7XG4gICAgICB9XG4gICAgICBhcnIuc3BsaWNlKGF0LCAwLCB2YWx1ZSk7XG4gICAgfTtcblxuICAgIG9iamVjdFBhdGguZW1wdHkgPSBmdW5jdGlvbihvYmosIHBhdGgpIHtcbiAgICAgIGlmIChpc0VtcHR5KHBhdGgpKSB7XG4gICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICB9XG4gICAgICBpZiAob2JqID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICAgIH1cblxuICAgICAgdmFyIHZhbHVlLCBpO1xuICAgICAgaWYgKCEodmFsdWUgPSBvYmplY3RQYXRoLmdldChvYmosIHBhdGgpKSkge1xuICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gb2JqZWN0UGF0aC5zZXQob2JqLCBwYXRoLCAnJyk7XG4gICAgICB9IGVsc2UgaWYgKGlzQm9vbGVhbih2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdFBhdGguc2V0KG9iaiwgcGF0aCwgZmFsc2UpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHJldHVybiBvYmplY3RQYXRoLnNldChvYmosIHBhdGgsIDApO1xuICAgICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICB2YWx1ZS5sZW5ndGggPSAwO1xuICAgICAgfSBlbHNlIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgZm9yIChpIGluIHZhbHVlKSB7XG4gICAgICAgICAgaWYgKGhhc1NoYWxsb3dQcm9wZXJ0eSh2YWx1ZSwgaSkpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB2YWx1ZVtpXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBvYmplY3RQYXRoLnNldChvYmosIHBhdGgsIG51bGwpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBvYmplY3RQYXRoLnB1c2ggPSBmdW5jdGlvbiAob2JqLCBwYXRoIC8qLCB2YWx1ZXMgKi8pe1xuICAgICAgdmFyIGFyciA9IG9iamVjdFBhdGguZ2V0KG9iaiwgcGF0aCk7XG4gICAgICBpZiAoIWlzQXJyYXkoYXJyKSkge1xuICAgICAgICBhcnIgPSBbXTtcbiAgICAgICAgb2JqZWN0UGF0aC5zZXQob2JqLCBwYXRoLCBhcnIpO1xuICAgICAgfVxuXG4gICAgICBhcnIucHVzaC5hcHBseShhcnIsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMikpO1xuICAgIH07XG5cbiAgICBvYmplY3RQYXRoLmNvYWxlc2NlID0gZnVuY3Rpb24gKG9iaiwgcGF0aHMsIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgdmFyIHZhbHVlO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gcGF0aHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKCh2YWx1ZSA9IG9iamVjdFBhdGguZ2V0KG9iaiwgcGF0aHNbaV0pKSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgfTtcblxuICAgIG9iamVjdFBhdGguZ2V0ID0gZnVuY3Rpb24gKG9iaiwgcGF0aCwgZGVmYXVsdFZhbHVlKXtcbiAgICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcGF0aCA9IFtwYXRoXTtcbiAgICAgIH1cbiAgICAgIGlmICghcGF0aCB8fCBwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfVxuICAgICAgaWYgKG9iaiA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHBhdGggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBvYmplY3RQYXRoLmdldChvYmosIHBhdGguc3BsaXQoJy4nKSwgZGVmYXVsdFZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGN1cnJlbnRQYXRoID0gZ2V0S2V5KHBhdGhbMF0pO1xuICAgICAgdmFyIG5leHRPYmogPSBnZXRTaGFsbG93UHJvcGVydHkob2JqLCBjdXJyZW50UGF0aClcbiAgICAgIGlmIChuZXh0T2JqID09PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBuZXh0T2JqO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb2JqZWN0UGF0aC5nZXQob2JqW2N1cnJlbnRQYXRoXSwgcGF0aC5zbGljZSgxKSwgZGVmYXVsdFZhbHVlKTtcbiAgICB9O1xuXG4gICAgb2JqZWN0UGF0aC5kZWwgPSBmdW5jdGlvbiBkZWwob2JqLCBwYXRoKSB7XG4gICAgICBpZiAodHlwZW9mIHBhdGggPT09ICdudW1iZXInKSB7XG4gICAgICAgIHBhdGggPSBbcGF0aF07XG4gICAgICB9XG5cbiAgICAgIGlmIChvYmogPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNFbXB0eShwYXRoKSkge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfVxuICAgICAgaWYodHlwZW9mIHBhdGggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBvYmplY3RQYXRoLmRlbChvYmosIHBhdGguc3BsaXQoJy4nKSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBjdXJyZW50UGF0aCA9IGdldEtleShwYXRoWzBdKTtcbiAgICAgIGlmICghaGFzU2hhbGxvd1Byb3BlcnR5KG9iaiwgY3VycmVudFBhdGgpKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9XG5cbiAgICAgIGlmKHBhdGgubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgICAgICBvYmouc3BsaWNlKGN1cnJlbnRQYXRoLCAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgb2JqW2N1cnJlbnRQYXRoXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdFBhdGguZGVsKG9ialtjdXJyZW50UGF0aF0sIHBhdGguc2xpY2UoMSkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cblxuICAgIHJldHVybiBvYmplY3RQYXRoO1xuICB9XG5cbiAgdmFyIG1vZCA9IGZhY3RvcnkoKTtcbiAgbW9kLmNyZWF0ZSA9IGZhY3Rvcnk7XG4gIG1vZC53aXRoSW5oZXJpdGVkUHJvcHMgPSBmYWN0b3J5KHtpbmNsdWRlSW5oZXJpdGVkUHJvcHM6IHRydWV9KVxuICByZXR1cm4gbW9kO1xufSk7XG4iLCJpbXBvcnQgY3JlYXRlIGZyb20gXCIuL3V0aWxzL2NyZWF0ZVwiO1xuaW1wb3J0IGVsZW1lbnRzIGZyb20gXCIuL3V0aWxzL2VsZW1lbnRzXCI7XG5cbndpbmRvdy5lbGVtZW50cyA9IGVsZW1lbnRzO1xuXG5jcmVhdGUuYWxsKCk7IiwiaW1wb3J0IERPTVN0cmluZyBmcm9tIFwiLi8uLi90eXBlL0RPTVN0cmluZy5qc1wiO1xuXG4vKipcbiogQWRkcyBmdW5jdGlvbmFsaXR5IHRvIGBhcmlhLWNoZWNrZWRgIGF0dHJpYnV0ZS5cbipcbiogQ2hhbmdlcyB2YWx1ZSB3aGVuIGNsaWNrZWQgb3Igd2hpbGUgZm9jdXNlZCBwcmVzc2luZyBgU3BhY2VgLlxuKlxuKiB7QGxpbmsgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1jaGVja2VkfVxuKiBAZW1pdHMgY2xpY2sgd2hlbiBjbGlja2VkIG9yIHdoaWxlIGZvY3VzZWQgcHJlc3NpbmcgYFNwYWNlYC5cbiogQGVtaXRzIGNoYW5nZSB3aGVuIGNsaWNrZWQgb3Igd2hpbGUgZm9jdXNlZCBwcmVzc2luZyBgU3BhY2VgLlxuKi9cbmxldCBBcmlhQ2hlY2tlZCA9IChzdXBlcmNsYXNzKSA9PiBjbGFzcyBleHRlbmRzIHN1cGVyY2xhc3Mge1xuXG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRzdXBlciguLi5hcmdzKTtcblxuXHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm9uQ2hlY2tlZC5iaW5kKHRoaXMpLCB7a2V5OiBcInNwYWNlXCJ9KTtcblx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uQ2hlY2tlZC5iaW5kKHRoaXMpKTtcblx0fVxuXG5cdG9uQ2hlY2tlZChldikge1xuXHRcdGlmKGV2KSBldi5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0aWYodGhpcy5kaXNhYmxlZCAhPT0gdHJ1ZSkge1xuXHRcdFx0dGhpcy5jaGVja2VkID0gRE9NU3RyaW5nLnRvZ2dsZSh0aGlzLmNoZWNrZWQpO1xuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBJbnB1dEV2ZW50KFwiaW5wdXRcIikpO1xuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImNoYW5nZVwiLCB7IGJ1YmJsZXM6IHRydWUgfSkpO1xuXHRcdH1cblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQXJpYUNoZWNrZWQ7IiwiaW1wb3J0IGJvb2xlYW4gZnJvbSBcIi4vLi4vdHlwZS9ib29sZWFuXCI7XHJcblxyXG4vKipcclxuKiBBZGRzIGZ1bmN0aW9uYWxpdHkgdG8gYGFyaWEtZXhwYW5kZWRgIGF0dHJpYnV0ZVxyXG4qIEB0b2RvIGFkZCBhIHNldHRpbmcgdG8gZGVmaW5lIGhvdyB0aGUgdmlzaWJpbGl0eSBzaG91bGQgYmUgdG9nZ2xlZFxyXG4qL1xyXG5sZXQgQXJpYUV4cGFuZGVkID0gKHN1cGVyY2xhc3MpID0+IGNsYXNzIGV4dGVuZHMgc3VwZXJjbGFzcyB7XHJcblx0LyoqXHJcblx0KiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxlbWVudCBFbGVtZW50IHdpdGggYW4gYGFyaWEtZXhwYW5kZWRgIGF0dHJpYnV0ZVxyXG5cdCovXHJcblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xyXG5cdFx0c3VwZXIoLi4uYXJncyk7XHJcblx0XHRpZiAodGhpcy5leHBhbmRlZCAhPT0gdW5kZWZpbmVkKSB7IC8vIHRvZG86IGFkZCB3aGVuIGZpcnN0IHRpbWUgYXJpYS1leHBhbmRlZCBpcyBib29sZWFuXHJcblx0XHRcdHRoaXMuYWRkTGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uRXhwYW5kZWQuYmluZCh0aGlzKSk7XHJcblx0XHRcdC8vIHRoaXMuYWRkTGlzdGVuZXIoXCJrZXlcIiwgdGhpcy5vbkV4cGFuZGVkLmJpbmQodGhpcyksIHsga2V5OiBbXCJlbnRlclwiLCBcInNwYWNlXCJdIH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b25FeHBhbmRlZChldikge1xyXG5cdFx0aWYgKHR5cGVvZiBzdXBlci5vbkV4cGFuZGVkID09IFwiZnVuY3Rpb25cIikgc3VwZXIub25FeHBhbmRlZChldik7XHJcblx0XHRpZihldiAmJiB0eXBlb2YgZXYucHJldmVudERlZmF1bHQgPT09IFwiZnVuY3Rpb25cIikgZXYucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRpZih0aGlzLmRpc2FibGVkICE9PSB0cnVlKSB7XHJcblx0XHRcdHRoaXMuZXhwYW5kZWQgPSBib29sZWFuLnRvZ2dsZSh0aGlzLmV4cGFuZGVkKTtcclxuXHJcblx0XHRcdGlmKHRoaXMuZXhwYW5kZWQpIHtcclxuXHRcdFx0XHR0aGlzLmNvbnRyb2xzLmZvckVhY2goY29udHJvbCA9PiB7XHJcblx0XHRcdFx0XHRjb250cm9sLmVsZW1lbnQuaGlkZGVuID0gZmFsc2U7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5jb250cm9scy5mb3JFYWNoKGNvbnRyb2wgPT4ge1xyXG5cdFx0XHRcdFx0Y29udHJvbC5lbGVtZW50LmhpZGRlbiA9IHRydWU7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcmlhRXhwYW5kZWQ7IiwiaW1wb3J0IERPTVN0cmluZyBmcm9tIFwiLi8uLi90eXBlL0RPTVN0cmluZ1wiO1xyXG5cclxuLyoqXHJcbiogQWRkcyBmdW5jdGlvbmFsaXR5IHRvIGBhcmlhLXByZXNzZWRgIGF0dHJpYnV0ZS5cclxuKlxyXG4qIENoYW5nZXMgdmFsdWUgd2hlbiBjbGlja2VkIG9yIHdoaWxlIGZvY3VzZWQgcHJlc3NpbmcgYFNwYWNlYCBvciBgRW50ZXJgLlxyXG4qXHJcbioge0BsaW5rIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtcHJlc3NlZH1cclxuKiBAZW1pdHMgY2xpY2sgd2hlbiBjbGlja2VkIG9yIHdoaWxlIGZvY3VzZWQgcHJlc3NpbmcgYFNwYWNlYCBvciBgRW50ZXJgLlxyXG4qL1xyXG5sZXQgQXJpYVByZXNzZWQgPSAoc3VwZXJjbGFzcykgPT4gY2xhc3MgZXh0ZW5kcyBzdXBlcmNsYXNzIHtcclxuXHQvKipcclxuXHQqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbGVtZW50IEVsZW1lbnQgd2l0aCBhbiBgYXJpYS1wcmVzc2VkYCBhdHRyaWJ1dGVcclxuXHQqL1xyXG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcclxuXHRcdHN1cGVyKC4uLmFyZ3MpO1xyXG5cclxuXHRcdGlmKHRoaXMucHJlc3NlZCAhPT0gdW5kZWZpbmVkKSB7IC8vIHRvZG86IGFkZCB3aGVuIGZpcnN0IHRpbWUgYXJpYS1wcmVzc2VkIGlzIGJvb2xlYW5cclxuXHRcdFx0dGhpcy5hZGRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25QcmVzc2VkLmJpbmQodGhpcykpO1xyXG5cdFx0XHR0aGlzLmFkZExpc3RlbmVyKFwia2V5XCIsIHRoaXMub25QcmVzc2VkLmJpbmQodGhpcyksIHsga2V5OiBbXCJlbnRlclwiLCBcInNwYWNlXCJdfSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRvblByZXNzZWQoZXYpIHtcclxuXHRcdGlmICh0eXBlb2Ygc3VwZXIub25QcmVzc2VkID09IFwiZnVuY3Rpb25cIikgc3VwZXIub25QcmVzc2VkKGV2KTtcclxuXHJcblx0XHRpZih0aGlzLmRpc2FibGVkICE9PSB0cnVlKSB7XHJcblx0XHRcdHRoaXMucHJlc3NlZCA9IERPTVN0cmluZy50b2dnbGUodGhpcy5wcmVzc2VkKTtcclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcmlhUHJlc3NlZDsiLCJpbXBvcnQgYm9vbGVhbiBmcm9tIFwiLi8uLi90eXBlL2Jvb2xlYW5cIjtcclxuXHJcbi8qKlxyXG4gKiBnZXRzIGFuZCBzZXRzIHRoZSBgYXJpYS1zZWxlY3RlZGAgYXR0cmlidXRlLlxyXG4gKlxyXG4gKiBJbmRpY2F0ZXMgaWYgYSBlbGVtZW50IGlzIHNlbGVjdGFibGVcclxuICpcclxuICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXNlbGVjdGVkXHJcbiAqL1xyXG5sZXQgQXJpYVNlbGVjdGVkID0gKHN1cGVyY2xhc3MpID0+IGNsYXNzIGV4dGVuZHMgc3VwZXJjbGFzcyB7XHJcblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xyXG5cdFx0c3VwZXIoLi4uYXJncyk7XHJcblxyXG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25TZWxlY3RlZC5iaW5kKHRoaXMpKTtcclxuXHRcdHRoaXMuYWRkTGlzdGVuZXIoXCJrZXlcIiwgdGhpcy5vblNlbGVjdGVkLmJpbmQodGhpcyksIHtrZXk6IFtcInNwYWNlXCIsIFwiZW50ZXJcIl19KTtcclxuXHR9XHJcblxyXG5cdG9uU2VsZWN0ZWQoZXYpIHtcclxuXHRcdGlmKHR5cGVvZiBzdXBlci5vblNlbGVjdGVkID09IFwiZnVuY3Rpb25cIikgc3VwZXIub25TZWxlY3RlZChldik7XHJcblx0XHR0aGlzLnNlbGVjdGVkID0gYm9vbGVhbi50b2dnbGUodGhpcy5zZWxlY3RlZCk7XHJcblx0fVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXJpYVNlbGVjdGVkOyIsIi8qKlxuICogXG4gKi9cbmNvbnN0IHJvbGVzID0ge1xuXHRhbGVydDoge1xuXHRcdHN1cGVyOiBbXCJzZWN0aW9uXCJdLFxuXHRcdHN1YjogW1wiYWxlcnRkaWFsb2dcIl0sXG5cdFx0ZGVmYXVsdHM6IHtcblx0XHRcdGxpdmU6IFwiYXNzZXJ0aXZlXCIsXG5cdFx0XHRhdG9taWM6IHRydWVcblx0XHR9XG5cdH0sXG5cdGFsZXJ0ZGlhbG9nOiB7IHN1cGVyOiBbXCJhbGVydFwiLCBcImRpYWxvZ1wiXSB9LFxuXHRhcHBsaWNhdGlvbjogeyBzdXBlcjogW1wic3RydWN0dXJlXCJdIH0sXG5cdGFydGljbGU6IHtcblx0XHRzdXBlcjogW1wiZG9jdW1lbnRcIl0sXG5cdFx0aW1wbGljaXQ6IFtcImFydGljbGU6bm90KFtyb2xlKVwiXVxuXHR9LFxuXHQvKiogQHRvZG8gbW9yZSBzdHJpY3QgYmFubmVyIHNlbGVjdG9yICAqL1xuXHRiYW5uZXI6IHtcblx0XHRzdXBlcjogW1wibGFuZG1hcmtcIl0sXG5cdFx0aW1wbGljaXQ6IFtcImhlYWRlcjpub3QoW3JvbGVdKVwiXVxuXHR9LFxuXHRidXR0b246IHtcblx0XHRzdXBlcjogW1wiY29tbWFuZFwiXSxcblx0XHRpbXBsaWNpdDogW1wiYnV0dG9uOm5vdChbcm9sZV0pXCIsIFwiaW5wdXRbdHlwZT0nYnV0dG9uJ106bm90KFtyb2xlXSlcIixcblx0XHRcdFwiaW5wdXRbdHlwZT0ncmVzZXQnXTpub3QoW3JvbGVdKVwiLCBcImlucHV0W3R5cGU9J2ltYWdlJ106bm90KFtyb2xlXSlcIixcblx0XHRcdFwiaW5wdXRbdHlwZT0nc3VibWl0J106bm90KFtyb2xlXSlcIiwgXCJzdW1tYXJ5Om5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdGNlbGw6IHtcblx0XHRzdXBlcjogW1wic2VjdGlvblwiXSxcblx0XHRzdWI6IFtcImNvbHVtbmhlYWRlclwiLCBcInJvd2hlYWRlclwiLCBcImdyaWRjZWxsXCJdLFxuXHRcdGNvbnRleHQ6IFtcInJvd1wiXSxcblx0XHRpbXBsaWNpdDogW1widGFibGUgdGQ6bm90KFtyb2xlXSlcIl1cblx0fSxcblx0Y2hlY2tib3g6IHtcblx0XHRzdXBlcjogW1wiaW5wdXRcIl0sXG5cdFx0c3ViOiBbXCJtZW51aXRlbWNoZWNrYm94XCIsIFwic3dpdGNoXCJdLFxuXHRcdGltcGxpY2l0OiBbXCJpbnB1dFt0eXBlPSdjaGVja2JveCddOm5vdChbcm9sZV0pXCJdLFxuXHRcdGRlZmF1bHRzOiB7XG5cdFx0XHRjaGVja2VkOiB0cnVlXG5cdFx0fVxuXHR9LFxuXHRjb2x1bW5oZWFkZXI6IHtcblx0XHRzdXBlcjogW1wiY2VsbFwiLCBcImdyaWRjZWxsXCIsIFwic2VjdGlvbmhlYWRcIl0sXG5cdFx0Y29udGV4dDogW1wicm93XCJdLFxuXHRcdGltcGxpY2l0OiBbXCJ0aGVhZCB0aDpub3QoW3JvbGVdKVwiXVxuXHR9LFxuXHQvKiogQHRvZG8gc2l6ZSBhdHRyaWJ1dGUgZG9lc24ndCBjaGVjayBmYXVsdHkgdmFsdWVzICovXG5cdGNvbWJvYm94OiB7XG5cdFx0c3VwZXI6IFtcInNlbGVjdFwiXSxcblx0XHRvd25zOiB7XG5cdFx0XHRhbGw6IFtcInRleHRib3hcIl0sXG5cdFx0XHRhbnk6IFtcImxpc3Rib3hcIiwgXCJ0cmVlXCIsIFwiZ3JpZFwiLCBcImRpYWxvZ1wiXVxuXHRcdH0sXG5cdFx0aW1wbGljaXQ6IFtcImlucHV0W3R5cGU9J2VtYWlsJ11bbGlzdF06bm90KFtyb2xlXSlcIixcblx0XHRcdFwiaW5wdXRbdHlwZT0ndGV4dCddW2xpc3RdOm5vdChbcm9sZV0pXCIsIFwiaW5wdXRbdHlwZT0nc2VhcmNoJ11bbGlzdF06bm90KFtyb2xlXSlcIixcblx0XHRcdFwiaW5wdXRbdHlwZT0ndGVsJ11bbGlzdF06bm90KFtyb2xlXSlcIiwgXCJpbnB1dFt0eXBlPSd1cmwnXVtsaXN0XTpub3QoW3JvbGVdKVwiLFxuXHRcdFx0XCJzZWxlY3Q6bm90KFttdWx0aXBsZV0pOm5vdChbc2l6ZV0pOm5vdChbcm9sZV0pXCIsIFwic2VsZWN0Om5vdChbbXVsdGlwbGVdKVtzaXplPScwJ106bm90KFtyb2xlXSlcIixcblx0XHRcdFwic2VsZWN0Om5vdChbbXVsdGlwbGVdKVtzaXplPScxJ106bm90KFtyb2xlXSlcIl0sXG5cdFx0ZGVmYXVsdHM6IHtcblx0XHRcdGV4cGFuZGVkOiBmYWxzZSxcblx0XHRcdGhhc1BvcFVwOiBcImxpc3Rib3hcIlxuXHRcdH1cblx0fSxcblx0Y29tbWFuZDoge1xuXHRcdHN1cGVyOiBbXCJ3aWRnZXRcIl0sXG5cdFx0c3ViOiBbXCJtZW51aXRlbVwiLCBcImJ1dHRvblwiLCBcImxpbmtcIl1cblx0fSxcblx0Y29tcGxlbWVudGFyeToge1xuXHRcdHN1cGVyOiBbXCJsYW5kbWFya1wiXSxcblx0XHRpbXBsaWNpdDogW1wiYXNpZGU6bm90KFtyb2xlXSlcIl1cblx0fSxcblx0Y29tcG9zaXRlOiB7XG5cdFx0c3VwZXI6IFtcIndpZGdldFwiXSxcblx0XHRzdWI6IFtcImdyaWRcIiwgXCJzZWxlY3RcIiwgXCJzcGluYnV0dG9uXCIsIFwidGFibGlzdFwiXVxuXHR9LFxuXHQvKiogQHRvZG8gbW9yZSBzdHJpY3QgZm9vdGVyIHNlbGVjdG9yICAqL1xuXHRjb250ZW50aW5mbzoge1xuXHRcdHN1cGVyOiBbXCJsYW5kbWFya1wiXSxcblx0XHRpbXBsaWNpdDogW1wiZm9vdGVyOm5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdGRlZmluaXRpb246IHtcblx0XHRzdXBlcjogW1wic2VjdGlvblwiXSxcblx0XHRpbXBsaWNpdDogW1wiZGQ6bm90KFtyb2xlXSlcIl1cblx0fSxcblx0ZGlhbG9nOiB7XG5cdFx0c3VwZXI6IFtcIndpbmRvd1wiXSxcblx0XHRzdWI6IFtcImFsZXJ0ZGlhbG9nXCJdLFxuXHRcdGltcGxpY2l0OiBbXCJkaWFsb2c6bm90KFtyb2xlXSlcIl1cblx0fSxcblx0ZGlyZWN0b3J5OiB7IHN1cGVyOiBbXCJsaXN0XCJdIH0sXG5cdGRvY3VtZW50OiB7XG5cdFx0c3VwZXI6IFtcInN0cnVjdHVyZVwiXSxcblx0XHRzdWI6IFtcImFydGljbGVcIl0sXG5cdFx0aW1wbGljaXQ6IFtcImFzaWRlOm5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdGZlZWQ6IHtcblx0XHRzdXBlcjogW1wibGlzdFwiXSxcblx0XHRvd25zOiB7IGFueTogW1wiYXJ0aWNsZVwiXSB9XG5cdH0sXG5cdGZpZ3VyZToge1xuXHRcdHN1cGVyOiBbXCJzZWN0aW9uXCJdLFxuXHRcdGltcGxpY2l0OiBbXCJmaWd1cmU6bm90KFtyb2xlXSlcIl1cblx0fSxcblx0Zm9ybToge1xuXHRcdHN1cGVyOiBbXCJsYW5kbWFya1wiXSxcblx0XHRpbXBsaWNpdDogW1wiZm9ybTpub3QoW3JvbGVdKVwiXVxuXHR9LFxuXHRncmlkOiB7XG5cdFx0c3VwZXI6IFtcImNvbXBvc2l0ZVwiLCBcInRhYmxlXCJdLFxuXHRcdHN1YjogW1widHJlZWdyaWRcIl0sXG5cdFx0b3duczogeyBhbnk6IFtcInJvd2dyb3VwXCIsIFwicm93XCJdIH1cblx0fSxcblx0Z3JpZGNlbGw6IHtcblx0XHRzdXBlcjogW1wiY2VsbFwiLCBcIndpZGdldFwiXSxcblx0XHRzdWI6IFtcImNvbHVtbmhlYWRlclwiLCBcInJvd2hlYWRlclwiXSxcblx0XHRjb250ZXh0OiBbXCJyb3dcIl1cblx0fSxcblx0Z3JvdXA6IHtcblx0XHRzdXBlcjogW1wic2VjdGlvblwiXSxcblx0XHRzdWI6IFtcInJvd1wiLCBcInNlbGVjdFwiLCBcInRvb2xiYXJcIl0sXG5cdFx0aW1wbGljaXQ6IFtcImRldGFpbHM6bm90KFtyb2xlXSlcIiwgXCJvcHRncm91cDpub3QoW3JvbGVdKVwiXVxuXHR9LFxuXHRoZWFkaW5nOiB7XG5cdFx0c3VwZXI6IFtcInNlY3Rpb25oZWFkXCJdLFxuXHRcdGltcGxpY2l0OiBbXCJoMTpub3QoW3JvbGVdKVwiLCBcImgyOm5vdChbcm9sZV0pXCIsIFwiaDM6bm90KFtyb2xlXSlcIixcblx0XHRcdFwiaDQ6bm90KFtyb2xlXSlcIiwgXCJoNTpub3QoW3JvbGVdKVwiLCBcImg2Ojpub3QoW3JvbGVdKVwiXSxcblx0XHRkZWZhdWx0czoge1xuXHRcdFx0bGV2ZWw6IDJcblx0XHR9XG5cdH0sXG5cdGltZzoge1xuXHRcdHN1cGVyOiBbXCJzZWN0aW9uXCJdLFxuXHRcdGltcGxpY2l0OiBbXCJpbWdbYWx0XTpub3QoW2FsdD0nJ10pOm5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdGlucHV0OiB7XG5cdFx0c3VwZXI6IFtcIndpZGdldFwiXSxcblx0XHRzdWI6IFtcImNoZWNrYm94XCIsIFwib3B0aW9uXCIsIFwicmFkaW9cIiwgXCJzbGlkZXJcIiwgXCJzcGluYnV0dG9uXCIsIFwidGV4dGJveFwiXVxuXHR9LFxuXHRsYW5kbWFyazoge1xuXHRcdHN1cGVyOiBbXCJzZWN0aW9uXCJdLFxuXHRcdHN1YjogW1wiYmFubmVyXCIsIFwiY29tcGxlbWVudGFyeVwiLCBcImNvbnRlbnRpbmZvXCIsIFwiZm9ybVwiLCBcIm1haW5cIiwgXCJuYXZpZ2F0aW9uXCIsIFwicmVnaW9uXCIsIFwic2VhcmNoXCJdXG5cdH0sXG5cdGxpbms6IHtcblx0XHRzdXBlcjogW1wiY29tbWFuZFwiXSxcblx0XHRpbXBsaWNpdDogW1wiYVtocmVmXTpub3QoW3JvbGVdKVwiLCBcImFyZWFbaHJlZl06bm90KFtyb2xlXSlcIiwgXCJsaW5rW2hyZWZdOm5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdGxpc3Q6IHtcblx0XHRzdXBlcjogW1wic2VjdGlvblwiXSxcblx0XHRzdWI6IFtcImRpcmVjdG9yeVwiLCBcImZlZWRcIl0sXG5cdFx0b3duczogeyBhbnk6IFtcImdyb3VwXCIsIFwibGlzdGl0ZW1cIl0gfSxcblx0XHRpbXBsaWNpdDogW1wiZGw6bm90KFtyb2xlXSlcIiwgXCJvbDpub3QoW3JvbGVdKVwiLCBcInVsOm5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdGxpc3Rib3g6IHtcblx0XHRzdXBlcjogW1wic2VsZWN0XCJdLFxuXHRcdG93bnM6IHsgYW55OiBbXCJvcHRpb25cIl0gfSxcblx0XHRpbXBsaWNpdDogW1wiZGF0YWxpc3Q6bm90KFtyb2xlXSlcIiwgXCJzZWxlY3RbbXVsdGlwbGVdOm5vdChbcm9sZV0pXCIsXG5cdFx0XHRcInNlbGVjdFtzaXplXTpub3QoW3NpemU9JzAnXSk6bm90KFtzaXplPScxJ10pOm5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdGxpc3RpdGVtOiB7XG5cdFx0c3VwZXI6IFtcInNlY3Rpb25cIl0sXG5cdFx0c3ViOiBbXCJ0cmVlaXRlbVwiXSxcblx0XHRjb250ZXh0OiBbXCJncm91cFwiLCBcImxpc3RcIl0sXG5cdFx0aW1wbGljaXQ6IFtcImR0Om5vdChbcm9sZV0pXCIsIFwib2wgPiBsaTo6bm90KFtyb2xlXSlcIl1cblx0fSxcblx0bG9nOiB7XG5cdFx0c3VwZXI6IFtcInNlY3Rpb25cIl0sXG5cdFx0ZGVmYXVsdHM6IHtcblx0XHRcdGxpdmU6IFwicG9sbGl0ZVwiXG5cdFx0fVxuXHR9LFxuXHRtYWluOiB7XG5cdFx0c3VwZXI6IFtcImxhbmRtYXJrXCJdLFxuXHRcdGltcGxpY2l0OiBbXCJtYWluOm5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdG1hcnF1ZWU6IHsgc3VwZXI6IFtcInNlY3Rpb25cIl0gfSxcblx0bWF0aDoge1xuXHRcdHN1cGVyOiBbXCJzZWN0aW9uXCJdLFxuXHRcdGltcGxpY2l0OiBbXCJtYXRoOm5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdG1lbnU6IHtcblx0XHRzdXBlcjogW1wic2VsZWN0XCJdLFxuXHRcdHN1YjogW1wibWVudWJhclwiXSxcblx0XHRvd25zOiB7IGFueTogW1wibWVudWl0ZW1cIiwgXCJtZW51aXRlbXJhZGlvXCIsIFwibWVudWl0ZW1jaGVja2JveFwiLCBcImdyb3VwXCJdfSxcblx0XHRpbXBsaWNpdDogW1wibWVudVt0eXBlPSdjb250ZXh0J106bm90KFtyb2xlXSlcIl0sXG5cdFx0ZGVmYXVsdHM6IHsgb3JpZW50YXRpb246IFwidmVydGljYWxcIiB9XG5cdH0sXG5cdG1lbnViYXI6IHtcblx0XHRzdXBlcjogW1wibWVudVwiXSxcblx0XHRzdWI6IFtcInRvb2xiYXJcIl0sXG5cdFx0b3duczogeyBhbnk6IFtcIm1lbnVpdGVtXCIsIFwibWVudWl0ZW1yYWRpb1wiLCBcIm1lbnVpdGVtY2hlY2tib3hcIiwgXCJncm91cFwiXSB9LFxuXHRcdGRlZmF1bHRzOiB7IG9yaWVudGF0aW9uOiBcImhvcml6b250YWxcIiB9XG5cdH0sXG5cdG1lbnVpdGVtOiB7XG5cdFx0c3VwZXI6IFtcImNvbW1hbmRcIl0sXG5cdFx0c3ViOiBbXCJtZW51aXRlbWNoZWNrYm94XCJdLFxuXHRcdGNvbnRleHQ6IFtcImdyb3VwXCIsIFwibWVudVwiLCBcIm1lbnViYXJcIl0sXG5cdFx0aW1wbGljaXQ6IFtcIm1lbnVpdGVtW3R5cGU9J2NvbnRleHQnXTpub3QoW3JvbGVdKVwiXVxuXHR9LFxuXHRtZW51aXRlbWNoZWNrYm94OiB7XG5cdFx0c3VwZXI6IFtcImNoZWNrYm94XCIsIFwibWVudWl0ZW1cIl0sXG5cdFx0c3ViOiBbXCJtZW51aXRlbXJhZGlvXCJdLFxuXHRcdGNvbnRleHQ6IFtcIm1lbnVcIiwgXCJtZW51YmFyXCJdLFxuXHRcdGltcGxpY2l0OiBbXCJtZW51aXRlbVt0eXBlPSdjaGVja2JveCddOm5vdChbcm9sZV0pXCJdLFxuXHRcdGRlZmF1bHRzOiB7IGNoZWNrZWQ6IGZhbHNlIH1cblx0fSxcblx0bWVudWl0ZW1yYWRpbzoge1xuXHRcdHN1cGVyOiBbXCJtZW51aXRlbWNoZWNrYm94XCIsIFwicmFkaW9cIl0sXG5cdFx0Y29udGV4dDogW1wiZ3JvdXBcIiwgXCJtZW51XCIsIFwibWVudWJhclwiXSxcblx0XHRpbXBsaWNpdDogW1wibWVudWl0ZW1bdHlwZT0ncmFkaW8nXTpub3QoW3JvbGVdKVwiXSxcblx0XHRkZWZhdWx0czogeyBjaGVja2VkOiBmYWxzZSB9XG5cdH0sXG5cdG5hdmlnYXRpb246IHtcblx0XHRzdXBlcjogW1wibGFuZG1hcmtcIl0sXG5cdFx0aW1wbGljaXQ6IFtcIm5hdjpub3QoW3JvbGVdKVwiXVxuXHR9LFxuXHQvKiogQHRvZG8gcmVjb25zaWRlciBpZiBub25lID09IHByZXNlbnRhdGlvbiAqL1xuXHRub25lOiB7IHN1cGVyOiBbXCJzdHJ1Y3R1cmVcIl0gfSxcblx0bm90ZTogeyBzdXBlcjogW1wic2VjdGlvblwiXSB9LFxuXHQvKiogQHRvZG8gbW9yZSBzdHJpY3QgZGF0YWxpc3Qgc2VsZWN0b3IgKi9cblx0b3B0aW9uOiB7XG5cdFx0c3VwZXI6IFtcImlucHV0XCJdLFxuXHRcdHN1YjogW1widHJlZWl0ZW1cIl0sXG5cdFx0Y29udGV4dDogW1wibGlzdGJveFwiXSxcblx0XHRpbXBsaWNpdDogW1wiZGF0YWxpc3Qgb3B0aW9uOm5vdChbcm9sZV0pXCJdLFxuXHRcdGRlZmF1bHRzOiB7IGNoZWNrZWQ6IGZhbHNlIH1cblx0fSxcblx0cHJlc2VudGF0aW9uOiB7XG5cdFx0c3VwZXI6IFtcInN0cnVjdHVyZVwiXVxuXHR9LFxuXHRwcm9ncmVzc2Jhcjoge1xuXHRcdHN1cGVyOiBbXCJyYW5nZVwiXSxcblx0XHRpbXBsaWNpdDogW1wicHJvZ3Jlc3M6bm90KFtyb2xlXSlcIl1cblx0fSxcblx0cmFkaW86IHtcblx0XHRzdXBlcjogW1wiaW5wdXRcIl0sXG5cdFx0c3ViOiBbXCJtZW51aXRlbXJhZGlvXCJdLFxuXHRcdGltcGxpY2l0OiBbXCJpbnB1dFt0eXBlPSdyYWRpbyddOm5vdChbcm9sZV0pXCJdLFxuXHRcdGRlZmF1bHRzOiB7IGNoZWNrZWQ6IGZhbHNlIH1cblx0fSxcblx0cmFkaW9ncm91cDoge1xuXHRcdHN1cGVyOiBbXCJzZWxlY3RcIl0sXG5cdFx0b3duczogeyBhbnk6IFtcInJhZGlvXCJdIH1cblx0fSxcblx0cmFuZ2U6IHtcblx0XHRzdXBlcjogW1wid2lkZ2V0XCJdLFxuXHRcdHN1YjogW1wicHJvZ3Jlc3NiYXJcIiwgXCJzY3JvbGxiYXJcIiwgIFwic2xpZGVyXCIsICBcInNwaW5idXR0b25cIl1cblx0fSxcblx0LyoqIEB0b2RvIGFkZCBzZWN0aW9uIHNlbGVjdG9yIHRvIGNoZWNrIGFjY2Vzc2libGUgKi9cblx0cmVnaW9uOiB7IHN1cGVyOiBbXCJsYW5kbWFya1wiXSB9LFxuXHRyb2xldHlwZTogeyBzdWI6IFtcInN0cnVjdHVyZVwiLCBcIndpZGdldFwiLCBcIndpbmRvd1wiXSB9LFxuXHQvKiogQHRvZG8gbW9yZSBzdHJpY3QgdHIgc2VsZWN0b3IgKi9cblx0cm93OiB7XG5cdFx0c3ViOiBbXCJncm91cFwiLCBcIndpZGdldFwiXSxcblx0XHRjb250ZXh0OiBbXCJncmlkXCIsIFwicm93Z3JvdXBcIiwgXCJ0YWJsZVwiLCBcInRyZWVncmlkXCJdLFxuXHRcdG93bnM6IHsgYW55OiBbXCJjZWxsXCIsIFwiY29sdW1uaGVhZGVyXCIsIFwicm93aGVhZGVyXCIsIFwiZ3JpZGNlbGxcIl0gfSxcblx0XHRpbXBsaWNpdDogW1widGFibGUgdHI6bm90KFtyb2xlXSlcIl1cblx0fSxcblx0cm93Z3JvdXA6IHtcblx0XHRjb250ZXh0OiBbXCJncmlkXCIsIFwidGFibGVcIiwgXCJ0cmVlZ3JpZFwiXSxcblx0XHRvd25zOiB7IGFueTogW1wicm93XCJdIH0sXG5cdFx0aW1wbGljaXQ6IFtcInRoZWFkOm5vdChbcm9sZV0pXCIsIFwidGJvZHk6bm90KFtyb2xlXSlcIiwgXCJ0Zm9vdDpub3QoW3JvbGVdKVwiXVxuXHR9LFxuXHRyb3doZWFkZXI6IHtcblx0XHRzdXBlcjogW1wiY2VsbFwiLCBcImdyaWRjZWxsXCIsIFwic2VjdGlvbmhlYWRcIl0sXG5cdFx0Y29udGV4dDogW1wicm93XCJdLFxuXHRcdGltcGxpY2l0OiBbXCJ0Ym9keSB0aDpub3QoW3JvbGVdKVwiXVxuXHR9LFxuXHRzY3JvbGxiYXI6IHtcblx0XHRzdXBlcjogW1wicmFuZ2VcIl0sXG5cdFx0ZGVmYXVsdHM6IHtcblx0XHRcdG9yaWVudGF0aW9uOiBcInZlcnRpY2FsXCIsXG5cdFx0XHR2YWx1ZU1pbjogMCxcblx0XHRcdHZhbHVlTWF4OiAxMDBcblx0XHR9XG5cdH0sXG5cdHNlYXJjaDogeyBzdXBlcjogW1wibGFuZG1hcmtcIl0gfSxcblx0c2VhcmNoYm94OiB7XG5cdFx0c3VwZXI6IFtcInRleHRib3hcIl0sXG5cdFx0aW1wbGljaXQ6IFtcImlucHV0W3R5cGU9J3NlYXJjaCddOm5vdChbbGlzdF0pOm5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdHNlY3Rpb246IHtcblx0XHRzdXBlcjogW1wic3RydWN0dXJlXCJdLFxuXHRcdHN1YjogW1wiYWxlcnRcIiwgXCJjZWxsXCIsIFwiZGVmaW5pdGlvblwiLCBcImZpZ3VyZVwiLCBcImdyb3VwXCIsIFwiaW1nXCIsIFwibGFuZG1hcmtcIiwgXCJsaXN0XCIsIFwibGlzdGl0ZW1cIixcblx0XHRcdFwibG9nXCIsIFwibWFycXVlZVwiLCBcIm1hdGhcIiwgXCJub3RlXCIsIFwic3RhdHVzXCIsIFwidGFibGVcIiwgXCJ0YWJwYW5lbFwiLCBcInRlcm1cIiwgXCJ0b29sdGlwXCJdXG5cdH0sXG5cdHNlY3Rpb25oZWFkOiB7XG5cdFx0c3VwZXI6IFtcInN0cnVjdHVyZVwiXSxcblx0XHRzdWI6IFtcImNvbHVtbmhlYWRlclwiLCBcImhlYWRpbmdcIiwgXCJyb3doZWFkZXJcIiwgXCJ0YWJcIl1cblx0fSxcblx0c2VsZWN0OiB7XG5cdFx0c3VwZXI6IFtcImNvbXBvc2l0ZVwiLCBcImdyb3VwXCJdLFxuXHRcdHN1YjogW1wiY29tYm9ib3hcIiwgXCJsaXN0Ym94XCIsIFwibWVudVwiLCBcInJhZGlvZ3JvdXBcIiwgXCJ0cmVlXCJdXG5cdH0sXG5cdC8qKiBAdG9kbyBzZXBlcmF0aW9uIG9mIGZvY3VzYWJsZSAqL1xuXHRzZXBhcmF0b3I6IHtcblx0XHRzdXBlcjogW1wic3RydWN0dXJlXCIsIFwid2lkZ2V0XCJdLFxuXHRcdGltcGxpY2l0OiBbXCJocjpub3QoW3JvbGVdKVwiXSxcblx0XHRkZWZhdWx0czoge1xuXHRcdFx0b3JpZW50YXRpb246IFwiaG9yaXpvbnRhbFwiLFxuXHRcdFx0dmFsdWVNaW46IDAsXG5cdFx0XHR2YWx1ZU1heDogMTAwLFxuXHRcdFx0dmFsdWVOb3c6IDUwXG5cdFx0fVxuXHR9LFxuXHRzbGlkZXI6IHtcblx0XHRzdXBlcjogW1wiaW5wdXRcIiwgXCJyYW5nZVwiXSxcblx0XHRpbXBsaWNpdDogW1wiaW5wdXRbdHlwZT0ncmFuZ2UnXTpub3QoW3JvbGVdKVwiXSxcblx0XHRkZWZhdWx0czoge1xuXHRcdFx0b3JpZW50YXRpb246IFwiaG9yaXpvbnRhbFwiLFxuXHRcdFx0dmFsdWVNaW46IDAsXG5cdFx0XHR2YWx1ZU1heDogMTAwXG5cdFx0fVxuXHR9LFxuXHRzcGluYnV0dG9uOiB7XG5cdFx0c3VwZXI6IFtcImNvbXBvc2l0ZVwiLCBcImlucHV0XCIsIFwicmFuZ2VcIl0sXG5cdFx0aW1wbGljaXQ6IFtcImlucHV0W3R5cGU9J251bWJlciddOm5vdChbcm9sZV0pXCJdLFxuXHRcdGRlZmF1bHRzOiB7XHR2YWx1ZU5vdzogMCB9XG5cdH0sXG5cdHN0YXR1czoge1xuXHRcdHN1cGVyOiBcInNlY3Rpb25cIixcblx0XHRzdWI6IFtcInByb2dyZXNzYmFyXCIsIFwidGltZXJcIl0sXG5cdFx0aW1wbGljaXQ6IFtcIm91dHB1dDpub3QoW3JvbGVdKVwiXVxuXHR9LFxuXHRzdHJ1Y3R1cmU6IHtcblx0XHRzdXBlcjogW1wicm9sZXR5cGVcIl0sXG5cdFx0c3ViOiBbXCJhcHBsaWNhdGlvblwiLCBcImRvY3VtZW50XCIsIFwicHJlc2VudGF0aW9uXCIsIFwicm93Z3JvdXBcIiwgXCJzZWN0aW9uXCIsIFwic2VjdGlvbmhlYWRcIiwgXCJzZXBhcmF0b3JcIl1cblx0fSxcblx0c3dpdGNoOiB7XG5cdFx0c3VwZXI6IFtcImNoZWNrYm94XCJdLFxuXHRcdGRlZmF1bHRzOiB7IGNoZWNrZWQ6IGZhbHNlIH1cblx0fSxcblx0dGFiOiB7XG5cdFx0c3VwZXI6IFtcInNlY3Rpb25oZWFkXCIsIFwid2lkZ2V0XCJdLFxuXHRcdGNvbnRleHQ6IFtcInRhYmxpc3RcIl0sXG5cdFx0ZGVmYXVsc3Q6IHsgc2VsZWN0ZWQ6IGZhbHNlIH1cblx0fSxcblx0dGFibGU6IHtcblx0XHRzdXBlcjogW1wic2VjdGlvblwiXSxcblx0XHRzdWI6IFtcImdyaWRcIl0sXG5cdFx0b3duczogeyBhbnk6IFtcInJvd1wiLCBcInJvd2dyb3VwXCJdfSxcblx0XHRpbXBsaWNpdDogW1widGFibGU6bm90KFtyb2xlXSlcIl1cblx0fSxcblx0dGFibGlzdDoge1xuXHRcdHN1cGVyOiBbXCJjb21wb3NpdGVcIl0sXG5cdFx0b3duczogeyBhbnk6IFtcInRhYlwiXSB9LFxuXHRcdGRlZmF1bHRzOiB7IG9yaWVudGF0aW9uOiBcImhvcml6b250YWxcIiB9XG5cdH0sXG5cdHRhYnBhbmVsOiB7IHN1cGVyOiBbXCJzZWN0aW9uXCJdIH0sXG5cdHRlcm06IHsgc3VwZXI6IFtcInNlY3Rpb25cIl0gfSxcblx0dGV4dGJveDoge1xuXHRcdHN1cGVyOiBbXCJpbnB1dFwiXSxcblx0XHRzdWI6IFtcInNlYXJjaGJveFwiXSxcblx0XHRpbXBsaWNpdDogW1wiaW5wdXRbdHlwZT0nZW1haWwnXTpub3QoW2xpc3RdKTpub3QoW3JvbGVdKVwiLFxuXHRcdFx0XCJpbnB1dFt0eXBlPSd0ZWwnXTpub3QoW2xpc3RdKTpub3QoW3JvbGVdKVwiLCBcImlucHV0W3R5cGU9J3RleHQnXTpub3QoW2xpc3RdKTpub3QoW3JvbGVdKVwiLFxuXHRcdFx0XCJpbnB1dFt0eXBlPSd1cmwnXTpub3QoW2xpc3RdKTpub3QoW3JvbGVdKVwiLCBcInRleHRhcmVhOm5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdHRpbWVyOiB7IHN1cGVyOiBbXCJzdGF0dXNcIl0gfSxcblx0dG9vbGJhcjoge1xuXHRcdHN1cGVyOiBbXCJncm91cFwiXSxcblx0XHRkZWZhdWx0czogeyBvcmllbnRhdGlvbjogXCJob3Jpem9udGFsXCIgfVxuXHR9LFxuXHR0b29sdGlwOiB7IHN1cGVyOiBbXCJzZWN0aW9uXCJdIH0sXG5cdHRyZWU6IHtcblx0XHRzdXBlcjogW1wic2VsZWN0XCJdLFxuXHRcdHN1YjogW1widGhyZWVncmlkXCJdLFxuXHRcdG93bnM6IHsgYW55OiBbXCJncm91cFwiLCBcInRyZWVpdGVtXCJdIH1cblx0fSxcblx0dHJlZWdyaWQ6IHtcblx0XHRzdXBlcjogW1wiZ3JpZFwiLCBcInRyZWVcIl0sXG5cdFx0b3duczogeyBhbnk6IFtcInJvd1wiLCBcInJvd2dyb3VwXCJdIH1cblx0fSxcblx0dHJlZWl0ZW06IHtcblx0XHRzdXBlcjogW1wibGlzdGl0ZW1cIiwgXCJvcHRpb25cIl0sXG5cdFx0Y29udGV4dDogeyBhbnk6IFtcImdyb3VwXCIsIFwidHJlZVwiXX1cblx0fSxcblx0d2lkZ2V0OiB7XG5cdFx0c3VwZXI6IFtcInJvbGV0eXBlXCJdLFxuXHRcdHN1YjogW1wiY29tbWFuZFwiLCBcImNvbXBvc2l0ZVwiLCBcImdyaWRjZWxsXCIsIFwiaW5wdXRcIiwgXCJyYW5nZVwiLCBcInJvd1wiLCBcInNlcGFyYXRvclwiLCBcInRhYlwiXVxuXHR9LFxuXHR3aW5kb3c6IHtcblx0XHRzdXBlcjogW1wicm9sZXR5cGVcIl0sXG5cdFx0c3ViOiBbXCJkaWFsb2dcIl1cblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgcm9sZXM7IiwiZnVuY3Rpb24gc2V0U2VsZWN0aW9uKHJhbmdlKSB7XG5cdHZhciBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG5cdHNlbGVjdGlvbi5yZW1vdmVBbGxSYW5nZXMoKTtcblx0c2VsZWN0aW9uLmFkZFJhbmdlKHJhbmdlKTtcbn1cblxuLyoqXG4gKiBAbWl4aW5cbiAqL1xubGV0IFNlbGVjdGlvbiA9IChzdXBlcmNsYXNzKSA9PiBjbGFzcyBTZWxlY3Rpb24gZXh0ZW5kcyBzdXBlcmNsYXNzIHtcblx0LyoqXG5cdCAqIFNlbGVjdHMgZXZlcnl0aGluZyBpbiB0aGUgdGV4dCBjb250cm9sLlxuXHQgKiBAbmFtZSBTZWxlY3Rpb24jc2VsZWN0XG5cdCAqL1xuXHRzZWxlY3QoKSB7XG5cdFx0dGhpcy5zZXRTZWxlY3Rpb25SYW5nZSgwLCB0aGlzLnZhbHVlLmxlbmd0aCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyAvIFNldHMgdGhlIGJlZ2lubmluZyBpbmRleCBvZiB0aGUgc2VsZWN0ZWQgdGV4dC4gV2hlbiBub3RoaW5nIGlzIHNlbGVjdGVkLFxuXHQgKiB0aGlzIHJldHVybnMgdGhlIHBvc2l0aW9uIG9mIHRoZSB0ZXh0IGlucHV0IGN1cnNvcihjYXJldCkgaW5zaWRlIG9mIHRoZSA8IGlucHV0ID4gZWxlbWVudC5cblx0ICogXG5cdCAqIEBuYW1lIFNlbGVjdGlvbiNzZWxlY3Rpb25TdGFydFxuXHQgKiBAdHlwZSB7TnVtYmVyfVxuXHQgKi9cblx0Z2V0IHNlbGVjdGlvblN0YXJ0KCkge1xuXHRcdGxldCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG5cdFx0aWYgKHNlbC5hbmNob3JOb2RlICYmIHNlbC5hbmNob3JOb2RlLnBhcmVudE5vZGUgPT0gdGhpcy5lbGVtZW50KSB7XG5cdFx0XHRyZXR1cm4gc2VsLmFuY2hvck9mZnNldCA+IHNlbC5mb2N1c09mZnNldCA/IHNlbC5mb2N1c09mZnNldCA6IHNlbC5hbmNob3JPZmZzZXQ7XG5cdFx0fVxuXHR9XG5cdHNldCBzZWxlY3Rpb25TdGFydChzdGFydCkge1xuXHRcdGxldCByYW5nZSA9IG5ldyBSYW5nZSgpO1xuXHRcdHJhbmdlLnNldFN0YXJ0KHRoaXMuZWxlbWVudC5maXJzdENoaWxkLCBzdGFydCk7XG5cdFx0c2V0U2VsZWN0aW9uKHJhbmdlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIC8gU2V0cyB0aGUgZW5kIGluZGV4IG9mIHRoZSBzZWxlY3RlZCB0ZXh0LiBXaGVuIHRoZXJlJ3Mgbm8gc2VsZWN0aW9uLHRoaXMgcmV0dXJucyB0aGVcblx0ICogb2Zmc2V0IG9mIHRoZSBjaGFyYWN0ZXIgaW1tZWRpYXRlbHkgZm9sbG93aW5nIHRoZSBjdXJyZW50IHRleHQgaW5wdXQgY3Vyc29yIHBvc2l0aW9uLlxuXHQgKiBcblx0ICogQG5hbWUgU2VsZWN0aW9uI3NlbGVjdGlvbkVuZFxuXHQgKiBAdHlwZSB7TnVtYmVyfVxuXHQgKi9cblx0Z2V0IHNlbGVjdGlvbkVuZCgpIHtcblx0XHRsZXQgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuXHRcdGlmIChzZWwuZm9jdXNOb2RlICYmIHNlbC5mb2N1c05vZGUucGFyZW50Tm9kZSA9PSB0aGlzLmVsZW1lbnQpIHtcblx0XHRcdHJldHVybiBzZWwuZm9jdXNPZmZzZXQgPiBzZWwuYW5jaG9yT2Zmc2V0ID8gc2VsLmZvY3VzT2Zmc2V0IDogc2VsLmFuY2hvck9mZnNldDtcblx0XHR9XG5cdH1cblx0c2V0IHNlbGVjdGlvbkVuZChlbmQpIHtcblx0XHRsZXQgcmFuZ2UgPSBuZXcgUmFuZ2UoKTtcblx0XHRyYW5nZS5zZXRFbmQodGhpcy5lbGVtZW50LmZpcnN0Q2hpbGQsIGVuZCk7XG5cdFx0c2V0U2VsZWN0aW9uKHJhbmdlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIC8gU2V0cyB0aGUgZGlyZWN0aW9uIGluIHdoaWNoIHNlbGVjdGlvbiBvY2N1cnJlZC5cblx0ICogXG5cdCAqICogXCJmb3J3YXJkXCIgaWYgc2VsZWN0aW9uIHdhcyBwZXJmb3JtZWQgaW4gdGhlIHN0YXJ0IC0gdG8gLSBlbmQgZGlyZWN0aW9uIG9mIHRoZSBjdXJyZW50IGxvY2FsZS5cblx0ICogKiBcImJhY2t3YXJkXCIgZm9yIHRoZSBvcHBvc2l0ZSBkaXJlY3Rpb24sXG5cdCAqICogXCJub25lXCIgaWYgdGhlIGRpcmVjdGlvbiBpcyB1bmtub3duLlwiXG5cdCAqIFxuXHQgKiBAbmFtZSBTZWxlY3Rpb24jc2VsZWN0aW9uRGlyZWN0aW9uXG5cdCAqIEB0b2RvIGltcHJvdmUgbWV0aG9kIHRvIHNldCBhbmQgZ2V0IGRpcmVjdGlvblxuXHQgKiBAdHlwZSB7IFwiZm9yd2FyZFwiIHwgXCJiYWNrd2FyZFwiIHwgXCJub25lXCIgfVxuXHQgKi9cblx0Z2V0IHNlbGVjdGlvbkRpcmVjdGlvbigpIHtcblx0XHRsZXQgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuXHRcdGlmIChzZWwuZm9jdXNOb2RlICYmIHNlbC5mb2N1c05vZGUucGFyZW50Tm9kZSA9PSB0aGlzLmVsZW1lbnQpIHtcblx0XHRcdGlmIChzZWwuZm9jdXNPZmZzZXQgPT0gc2VsLmFuY2hvck9mZnNldCkge1xuXHRcdFx0XHRyZXR1cm4gXCJub25lXCI7XG5cdFx0XHR9IGVsc2UgaWYgKHNlbC5hbmNob3JPZmZzZXQgPiBzZWwuZm9jdXNPZmZzZXQpIHtcblx0XHRcdFx0cmV0dXJuIFwiYmFja3dhcmRcIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBcImZvcndhcmRcIjtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0c2V0IHNlbGVjdGlvbkRpcmVjdGlvbihkaXJlY3Rpb24pIHtcblx0XHRsZXQgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuXHRcdGlmIChzZWwuZm9jdXNOb2RlICYmIHNlbC5mb2N1c05vZGUucGFyZW50Tm9kZSA9PSB0aGlzLmVsZW1lbnQpIHtcblx0XHRcdGlmIChzZWwuZm9jdXNPZmZzZXQgPT0gc2VsLmFuY2hvck9mZnNldCkge1xuXG5cdFx0XHR9IGVsc2UgaWYgKHNlbC5hbmNob3JPZmZzZXQgPiBzZWwuZm9jdXNPZmZzZXQgJiYgZGlyZWN0aW9uICE9IFwiYmFja3dhcmRcIikge1xuXHRcdFx0XHRsZXQgcmFuZ2UgPSBuZXcgUmFuZ2UoKTtcblx0XHRcdFx0cmFuZ2Uuc2V0U3RhcnQodGhpcy5lbGVtZW50LmZpcnN0Q2hpbGQsIHRoaXMuc2VsZWN0aW9uRW5kKTtcblx0XHRcdFx0cmFuZ2Uuc2V0RW5kKHRoaXMuZWxlbWVudC5maXJzdENoaWxkLCB0aGlzLnNlbGVjdGlvblN0YXJ0KTtcblxuXHRcdFx0XHRzZXRTZWxlY3Rpb24ocmFuZ2UpO1xuXHRcdFx0fSBlbHNlIGlmIChkaXJlY3Rpb24gIT0gXCJmb3J3YXJkXCIpIHtcblx0XHRcdFx0bGV0IHJhbmdlID0gbmV3IFJhbmdlKCk7XG5cdFx0XHRcdHJhbmdlLnNldFN0YXJ0KHRoaXMuZWxlbWVudC5maXJzdENoaWxkLCB0aGlzLnNlbGVjdGlvblN0YXJ0KTtcblx0XHRcdFx0cmFuZ2Uuc2V0RW5kKHRoaXMuZWxlbWVudC5maXJzdENoaWxkLCB0aGlzLnNlbGVjdGlvbkVuZCk7XG5cblx0XHRcdFx0c2V0U2VsZWN0aW9uKHJhbmdlKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogU2VsZWN0cyBhIHJhbmdlIG9mIHRleHQgaW4gdGhlIGVsZW1lbnQgKGJ1dCBkb2VzIG5vdCBmb2N1cyBpdCkuXG5cdCAqIEBuYW1lIFNlbGVjdGlvbiNzZXRTZWxlY3Rpb25SYW5nZVxuXHQgKiBAcGFyYW0ge0ludGVnZXJ9IHNlbGVjdGlvblN0YXJ0XG5cdCAqIEBwYXJhbSB7SW50ZWdlcn0gc2VsZWN0aW9uRW5kXG5cdCAqIEBwYXJhbSB7IFwiZm9yd2FyZFwiIHwgXCJiYWNrd2FyZFwiIHwgXCJub25lXCIgfSBbc2VsZWN0aW9uRGlyZWN0aW9uID0gXCJub25lXCJdIFxuXHQgKiBFc3RhYmxpc2ggdGhlIGRpcmVjdGlvbiBpbiB3aGljaCBzZWxlY3Rpb24gd2FzIHNldFxuXHQgKi9cblx0c2V0U2VsZWN0aW9uUmFuZ2Uoc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCwgc2VsZWN0aW9uRGlyZWN0aW9uID0gXCJub25lXCIpIHtcblx0XHRsZXQgc3RhcnQgPSBzZWxlY3Rpb25EaXJlY3Rpb24gPT0gXCJiYWNrd2FyZFwiID8gc2VsZWN0aW9uRW5kIDogc2VsZWN0aW9uU3RhcnQ7XG5cdFx0bGV0IGVuZCA9IHNlbGVjdGlvbkRpcmVjdGlvbiA9PSBcImJhY2t3YXJkXCIgPyBzZWxlY3Rpb25TdGFydCA6IHNlbGVjdGlvbkVuZDtcblxuXHRcdGxldCByYW5nZSA9IG5ldyBSYW5nZSgpO1xuXHRcdHJhbmdlLnNldFN0YXJ0KHRoaXMuZWxlbWVudC5maXJzdENoaWxkLCBzdGFydCk7XG5cdFx0cmFuZ2Uuc2V0RW5kKHRoaXMuZWxlbWVudC5maXJzdENoaWxkLCBlbmQpO1xuXG5cdFx0c2V0U2VsZWN0aW9uKHJhbmdlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXBsYWNlcyB0aGUgcmFuZ2Ugb2YgdGV4dCB3aXRoIHRoZSBuZXcgdGV4dC5cblx0ICogQG5hbWUgU2VsZWN0aW9uI3NldFJhbmdlVGV4dFxuXHQgKiBAdG9kbyBLZWVwIHByZXZpb3VzIHNlbGVjdGlvbiBvbiBwbGFjZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gcmVwbGFjZW1lbnQgXG5cdCAqIEBwYXJhbSB7SW50ZWdlcn0gW3N0YXJ0ID0ge0BsaW5rIFRleHRib3gjc2VsZWN0aW9uU3RhcnR9XVxuXHQgKiBAcGFyYW0ge0ludGVnZXJ9IFtlbmRdXG5cdCAqIEBwYXJhbSB7IFwic2VsZWN0XCIgfCBcInN0YXJ0XCIgfCBcImVuZFwiIHwgXCJwcmVzZXJ2ZVwiIH0gW3NlbGVjdE1vZGUgPSBcInByZXNlcnZlXCJdXG5cdCAqL1xuXHRzZXRSYW5nZVRleHQoXG5cdFx0cmVwbGFjZW1lbnQsXG5cdFx0c3RhcnQgPSB0aGlzLnNlbGVjdGlvblN0YXJ0LFxuXHRcdGVuZCA9IHRoaXMuc2VsZWN0aW9uRW5kLFxuXHRcdHNlbGVjdE1vZGUgPSBcInByZXNlcnZlXCJcblx0KSB7XG5cdFx0bGV0IHNlbGVjdGlvblN0YXJ0ID0gdGhpcy5zZWxlY3Rpb25TdGFydDtcblx0XHRsZXQgc2VsZWN0aW9uRW5kID0gdGhpcy5zZWxlY3Rpb25FbmQ7XG5cblx0XHRpZiAoc3RhcnQgPiBlbmQpIHsgdGhyb3cgbmV3IFJhbmdlRXJyb3IoKTsgfVxuXHRcdGlmIChzdGFydCA+IHRoaXMudmFsdWUubGVuZ3RoKSB7IHN0YXJ0ID0gdGhpcy52YWx1ZS5sZW5ndGg7IH1cblx0XHRpZiAoZW5kID4gdGhpcy52YWx1ZS5sZW5ndGgpIHsgZW5kID0gdGhpcy52YWx1ZS5sZW5ndGg7IH1cblx0XHRpZiAoc3RhcnQgPCBlbmQpIHtcblx0XHRcdC8vIGRlbGV0ZSBjaGFyYWN0ZXJzIGJldHdlZW4gc3RhcnQgYW5kIGVuZFxuXHRcdH1cblxuXHRcdHRoaXMudmFsdWUgPSB0aGlzLnZhbHVlLnNsaWNlKDAsIHN0YXJ0KSArIHJlcGxhY2VtZW50ICsgdGhpcy52YWx1ZS5zbGljZShlbmQpO1xuXG5cdFx0aWYgKHNlbGVjdE1vZGUgPT0gXCJzdGFydFwiKSB0aGlzLnNlbGVjdGlvblN0YXJ0ID0gMDtcblx0XHRpZiAoc2VsZWN0TW9kZSA9PSBcImVuZFwiKSB0aGlzLnNlbGVjdGlvblN0YXJ0ID0gdGhpcy52YWx1ZS5sZW5ndGg7XG5cdFx0aWYgKHNlbGVjdE1vZGUgPT0gXCJzZWxlY3RcIikgdGhpcy5zZWxlY3QoKTtcblx0XHRpZiAoc2VsZWN0TW9kZSA9PSBcInByZXNlcnZlXCIpIHRoaXMuc2V0U2VsZWN0aW9uUmFuZ2Uoc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCk7XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdGlvbjsiLCJpbXBvcnQgVmFsaWRpdHlTdGF0ZSBcdGZyb20gXCIuLy4uL3V0aWxzL1ZhbGlkaXR5U3RhdGVcIjtcblxuLyoqXG4gKiBAbWl4aW5cbiAqIEBib3Jyb3dzIFZhbGlkaXR5U3RhdGUgYXMgdmFsaWRpdHlcbiAqIEBsZW5kcyBWYWxpZGF0aW9uI1xuICovXG5sZXQgVmFsaWRhdGlvbiA9IChzdXBlcmNsYXNzKSA9PiBjbGFzcyBWYWxpZGF0aW9uIGV4dGVuZHMgc3VwZXJjbGFzcyBcbnsgXG5cdGdldCB2YWxpZGl0eSgpIHsgXG5cdFx0aWYoIXRoaXMuX3ZhbGlkaXR5KSB0aGlzLl92YWxpZGl0eSA9IG5ldyBWYWxpZGl0eVN0YXRlKHRoaXMpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX3ZhbGlkaXR5O1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudCB3aWxsIGJlIHZhbGlkYXRlZCB3aGVuIHRoZSBmb3JtIGlzIHN1Ym1pdHRlZDsgZmFsc2Ugb3RoZXJ3aXNlLlxuXHQgKiBAdHlwZSB7Qm9vbGVhbn1cblx0ICovXG5cdGdldCB3aWxsVmFsaWRhdGUoKSB7IHJldHVybiAhdGhpcy5oaWRkZW4gJiYgIXRoaXMucmVhZE9ubHk7IH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgZXJyb3IgbWVzc2FnZSB0aGF0IHdvdWxkIGJlIHNob3duIHRvIHRoZSB1c2VyXG5cdCAqIGlmIHRoZSBlbGVtZW50IHdhcyB0byBiZSBjaGVja2VkIGZvciB2YWxpZGl0eS5cblx0ICogQG5hbWUgVmFsaWRhdGlvbiN2YWxpZGF0aW9uTWVzc2FnZVxuXHQgKiBAdHlwZSB7U3RyaW5nfVxuXHQgKi9cblx0Z2V0IHZhbGlkYXRpb25NZXNzYWdlKCkge1xuXHRcdGlmKHRoaXMudmFsaWRpdHkudmFsaWQpIHJldHVybjtcblx0XHRpZih0aGlzLnZhbGlkaXR5LnZhbHVlTWlzc2luZykgcmV0dXJuIFwiUGxlYXNlIGZpbGwgaW4gdGhpcyBmaWVsZC5cIjtcblx0XHRpZih0aGlzLnZhbGlkaXR5LnR5cGVNaXNtYXRjaCkgcmV0dXJuIFwiUGxlYXNlIHVzZSB0aGUgY29ycmVjdCBpbnB1dCB0eXBlLlwiO1xuXHRcdFxuXHRcdGlmICh0aGlzLnZhbGlkaXR5LnRvb0xvbmcpIHtcblx0XHRcdHJldHVybiBcIlBsZWFzZSBzaG9ydGVuIHRoaXMgdGV4dCB0byAxMCBjaGFyYWN0ZXJzIG9yIGxlc3MgKHlvdSBhcmUgY3VycmVudGx5IHVzaW5nIDQ4IGNoYXJhY3RlcnMpLlwiO1xuXHRcdH1cblx0XHRpZih0aGlzLnZhbGlkaXR5LnRvb1Nob3J0KSB7XG5cdFx0XHRyZXR1cm4gXCJQbGVhc2UgbGVuZ3RoZW4gdGhpcyB0ZXh0IHRvIDEwIGNoYXJhY3RlcnMgb3IgbW9yZSAoeW91IGFyZSBjdXJyZW50bHkgdXNpbmcgMSBjaGFyYWN0ZXIpLlwiO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMudmFsaWRpdHkuYmFkSW5wdXQpIHJldHVybiBcIlBsZWFzZSBlbnRlciBhIG51bWJlci5cIjtcblx0XHRpZiAodGhpcy52YWxpZGl0eS5zdGVwTWlzbWF0Y2gpIHJldHVybiBcIlBsZWFzZSBzZWxlY3QgYSB2YWxpZCB2YWx1ZS5cIjtcblx0XHRpZiAodGhpcy52YWxpZGl0eS5yYW5nZU92ZXJmbG93KSByZXR1cm4gXCJQbGVhc2Ugc2VsZWN0IGEgc21hbGxlciB2YWx1ZS5cIjtcblx0XHRpZiAodGhpcy52YWxpZGl0eS5yYW5nZVVuZGVyZmxvdykgcmV0dXJuIFwiUGxlYXNlIHNlbGVjdCBhIGxhcmdlciB2YWx1ZS5cIjtcblx0XHRpZih0aGlzLnZhbGlkaXR5LnBhdHRlcm5NaXNtYXRjaCkgcmV0dXJuIFwiUGxlYXNlIG1hdGNoIHRoZSBmb3JtYXQgcmVxdWVzdGVkLlwiO1xuXHRcdGlmKHRoaXMudmFsaWRpdHkuY3VzdG9tRXJyb3IpIHJldHVybiB0aGlzLmVycm9ybWVzc2FnZS5lbGVtZW50LmlubmVySFRNTDtcblxuXHRcdC8vIEZhbGxiYWNrIHZhbHVlIHNob3VsZCBuZXZlciBiZWVuIHNob3duXG5cdFx0cmV0dXJuIHRoaXMuZXJyb3JtZXNzYWdlLmVsZW1lbnQuaW5uZXJIVE1MIHx8IFwiVGhlIHZhbHVlIHlvdSBlbnRlcmVkIGZvciB0aGlzIGZpZWxkIGlzIGludmFsaWQuXCI7XHRcdFxuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudOKAmXMgdmFsdWUgaGFzIG5vIHZhbGlkaXR5IHByb2JsZW1zOyBmYWxzZSBvdGhlcndpc2UuXG5cdCAqIEZpcmVzIGFuIGludmFsaWQgZXZlbnQgYXQgdGhlIGVsZW1lbnQgaW4gdGhlIGxhdHRlciBjYXNlLlxuXHQgKiBAZmlyZXMgaW52YWxpZFxuXHQgKiBAbmFtZSBWYWxpZGF0aW9uI2NoZWNrVmFsaWRpdHlcblx0ICovXG5cdGNoZWNrVmFsaWRpdHkoKSB7XG5cdFx0aWYoIXRoaXMudmFsaWRpdHkudmFsaWQpIHRoaXMuZGlzcGF0Y2hFdmVudChcImludmFsaWRcIiwgdGhpcyk7XG5cdFx0cmV0dXJuIHRoaXMudmFsaWRpdHkudmFsaWQ7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW504oCZcyB2YWx1ZSBoYXMgbm8gdmFsaWRpdHkgcHJvYmxlbXM7IG90aGVyd2lzZSwgcmV0dXJucyBmYWxzZSwgZmlyZXMgYW5cblx0ICogaW52YWxpZCBldmVudCBhdCB0aGUgZWxlbWVudCwgYW5kKGlmIHRoZSBldmVudCBpc27igJl0IGNhbmNlbGVkKSByZXBvcnRzIHRoZSBwcm9ibGVtIHRvIHRoZSB1c2VyLlxuXHQgKiBAZmlyZXMgaW52YWxpZFxuXHQgKiBAbmFtZSBWYWxpZGF0aW9uI3JlcG9ydFZhbGlkaXR5XG5cdCAqL1xuXHRyZXBvcnRWYWxpZGl0eSgpIHtcblx0XHRpZiAoIXRoaXMudmFsaWRpdHkudmFsaWQpIHtcblx0XHRcdGxldCBjYW5jZWxsZWQgPSAhdGhpcy5kaXNwYXRjaEV2ZW50KFwiaW52YWxpZFwiLCB0aGlzKTtcblx0XHRcdGlmICghY2FuY2VsbGVkKSB7XG5cdFx0XHRcdHRoaXMuZXJyb3JtZXNzYWdlLmhpZGRlbiA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmVycm9ybWVzc2FnZS5oaWRkZW4gPSB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy52YWxpZGl0eS52YWxpZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXRzIGEgY3VzdG9tIGVycm9yLCBzbyB0aGF0IHRoZSBlbGVtZW50IHdvdWxkIGZhaWwgdG8gdmFsaWRhdGUuVGhlIGdpdmVuIG1lc3NhZ2UgaXMgdGhlXG5cdCAqIG1lc3NhZ2UgdG8gYmUgc2hvd24gdG8gdGhlIHVzZXIgd2hlbiByZXBvcnRpbmcgdGhlIHByb2JsZW0gdG8gdGhlIHVzZXIuXG5cdCAqIFxuXHQgKiBJZiB0aGUgYXJndW1lbnQgaXMgdGhlIGVtcHR5IHN0cmluZywgY2xlYXJzIHRoZSBjdXN0b20gZXJyb3IuXG5cdCAqIFxuXHQgKiBAbmFtZSBWYWxpZGF0aW9uI3NldEN1c3RvbVZhbGlkaXR5XG5cdCAqIEBwYXJhbSB7P1N0cmluZ30gbWVzc2FnZSBcblx0ICovXG5cdHNldEN1c3RvbVZhbGlkaXR5KG1lc3NhZ2UpIHtcblx0XHQvLyB1cGRhdGUgVmFsaWR5U3RhdGUgb2JqZWN0XG5cdFx0dGhpcy52YWxpZGl0eS5fY3VzdG9tRXJyb3IgPSBtZXNzYWdlO1xuXG5cdFx0aWYobWVzc2FnZSkge1x0XHRcdFxuXHRcdFx0Ly8gdXBkYXRlIGBhcmlhLWludmFsaWRgIHByb3BlcnR5IHRvIGludmFsaWRcblx0XHRcdHRoaXMuaW52YWxpZCA9IHRydWU7XG5cdFx0XHRcblx0XHRcdC8vIHVwZGF0ZSBlcnJvciBtZXNzYWdlXG5cdFx0XHR0aGlzLmVycm9ybWVzc2FnZS5lbGVtZW50LmlubmVySFRNTCA9IG1lc3NhZ2U7XG5cdFx0XHR0aGlzLmVycm9ybWVzc2FnZS5lbGVtZW50LmhpZGRlbiA9IGZhbHNlO1xuXHRcdH0gZWxzZSB7XHRcdFx0XG5cdFx0XHQvLyB1cGRhdGUgYGFyaWEtaW52YWxpZGAgcHJvcGVydHkgdG8gaW52YWxpZFxuXHRcdFx0dGhpcy5pbnZhbGlkID0gZmFsc2U7XG5cdFx0XHRcblx0XHRcdC8vIHVwZGF0ZSBlcnJvciBtZXNzYWdlXG5cdFx0XHR0aGlzLmVycm9ybWVzc2FnZS5lbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XG5cdFx0XHR0aGlzLmVycm9ybWVzc2FnZS5lbGVtZW50LmhpZGRlbiA9IHRydWU7XG5cdFx0fVxuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBWYWxpZGF0aW9uOyIsImltcG9ydCBtaXggZnJvbSBcIkB2ZXN0ZXJnYWFyZC1jb21wYW55L2pzLW1peGluXCI7XHJcbmltcG9ydCBDb21tYW5kIGZyb20gXCIuL2Fic3RyYWN0L0NvbW1hbmRcIjtcclxuaW1wb3J0IGJvb2xlYW4gZnJvbSBcIi4vLi4vdHlwZS9ib29sZWFuXCI7XHJcblxyXG5pbXBvcnQgQXJpYVByZXNzZWQgZnJvbSBcIi4uL2F0dHJpYnV0ZXMvYXJpYS1wcmVzc2VkLmpzXCI7XHJcbmltcG9ydCBBcmlhRXhwYW5kZWQgZnJvbSBcIi4uL2F0dHJpYnV0ZXMvYXJpYS1leHBhbmRlZFwiO1xyXG5cclxuZnVuY3Rpb24gY2xvc2UoKSB7XHJcblx0dGhpcy5leHBhbmRlZCA9IGJvb2xlYW4uSVNfTk9UX0FDVElWRTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVnaXN0ZXJFeHBhbmRlZChldikge1xyXG5cdGNvbnNvbGUubG9nKGV2KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBzdW1tYXJ5IEFuIGlucHV0IHRoYXQgYWxsb3dzIGZvciB1c2VyLXRyaWdnZXJlZCBhY3Rpb25zIHdoZW4gY2xpY2tlZCBvciBwcmVzc2VkLlxyXG4gKiBcclxuICogQGV4dGVuZHMgQ29tbWFuZFxyXG4gKiBAbWl4ZXMgQXJpYUV4cGFuZGVkXHJcbiAqIEBtaXhlcyBBcmlhUHJlc3NlZFxyXG4gKi9cclxuY2xhc3MgQnV0dG9uIGV4dGVuZHMgbWl4KENvbW1hbmQpLndpdGgoQXJpYUV4cGFuZGVkLCBBcmlhUHJlc3NlZCkge1xyXG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcclxuXHRcdHN1cGVyKC4uLmFyZ3MpO1xyXG5cclxuXHRcdHRoaXMuYWRkTGlzdGVuZXIoXHJcblx0XHRcdFwiYXR0cmlidXRlc1wiLFxyXG5cdFx0XHRyZWdpc3RlckV4cGFuZGVkLFxyXG5cdFx0XHR7IGF0dHJpYnV0ZTogXCJhcmlhLWV4cGFuZGVkXCIsIG9uY2U6IHRydWUgfVxyXG5cdFx0KTtcclxuXHJcblx0XHRpZiAodGhpcy5leHBhbmRlZCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY29udHJvbHMpIHsgLy8gdG9kbzogYWRkIHdoZW4gZmlyc3QgdGltZSBhcmlhLWV4cGFuZGVkIGlzIGJvb2xlYW5cclxuXHRcdFx0Y29uc29sZS5sb2codGhpcy5jb250cm9scy5sZW5ndGgpO1xyXG5cdFx0XHR0aGlzLmNvbnRyb2xzLmZvckVhY2goY29udHJvbCA9PiB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coY29udHJvbC5hZGRMaXN0ZW5lcik7XHJcblx0XHRcdFx0aWYgKGNvbnRyb2wuYWRkTGlzdGVuZXIpIGNvbnRyb2wuYWRkTGlzdGVuZXIoXCJjbG9zZVwiLCBjbG9zZS5iaW5kKHRoaXMpKVxyXG5cdFx0XHR9XHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRvbkV4cGFuZGVkKGV2KSB7XHJcblx0XHRpZiAodHlwZW9mIHN1cGVyLm9uRXhwYW5kZWQgPT0gXCJmdW5jdGlvblwiKSBzdXBlci5vbkV4cGFuZGVkKGV2KTtcclxuXHJcblx0XHRpZiAodGhpcy5kaXNhYmxlZCAhPT0gdHJ1ZSkge1xyXG5cdFx0XHRpZiAodGhpcy5leHBhbmRlZCkge1xyXG5cdFx0XHRcdHRoaXMuY29udHJvbHMuZm9yRWFjaChjb250cm9sID0+IHtcclxuXHRcdFx0XHRcdGNvbnRyb2wuZWxlbWVudC5oaWRkZW4gPSBmYWxzZTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmNvbnRyb2xzLmZvckVhY2goY29udHJvbCA9PiB7XHJcblx0XHRcdFx0XHRjb250cm9sLmVsZW1lbnQuaGlkZGVuID0gdHJ1ZTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cdFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdXR0b247IiwiaW1wb3J0IG1peCBmcm9tIFwiQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW5cIjtcbmltcG9ydCBJbnB1dCBmcm9tIFwiLi9hYnN0cmFjdC9JbnB1dFwiO1xuXG5pbXBvcnQgQXJpYUNoZWNrZWQgZnJvbSBcIi4uL2F0dHJpYnV0ZXMvYXJpYS1jaGVja2VkLmpzXCI7XG5cbi8qKlxuICogQHN1bW1hcnkgQSBjaGVja2FibGUgaW5wdXQgdGhhdCBoYXMgdGhyZWUgcG9zc2libGUgdmFsdWVzOiB0cnVlLCBmYWxzZSwgb3IgbWl4ZWQuXG4gKiBAZGVzY1xuICogIyMjIyBFeGFtcGxlXG4gKlxuICogPGRpdiByb2xlPVwiY2hlY2tib3hcIiBhcmlhLWNoZWNrZWQ9XCJ0cnVlXCIgdGFiaW5kZXg9XCIwXCI+PC9kaXY+XG4gKlxuICogYGBgaHRtbFxuICogPGRpdiByb2xlPVwiY2hlY2tib3hcIiBhcmlhLWNoZWNrZWQ9XCJ0cnVlXCIgdGFiaW5kZXg9XCIwXCI+PC9kaXY+XG4gKiBgYGBcbiAqIEBleHRlbmRzIElucHV0IFxuICogQG1peGVzIEFyaWFDaGVja2VkXG4gKi9cbmNsYXNzIENoZWNrYm94IGV4dGVuZHMgbWl4KElucHV0KS53aXRoKEFyaWFDaGVja2VkKSB7XG5cdC8qKlxuXHQgKiBAcGFyYW0geyp9IGFyZ3Ncblx0Ki9cblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdHN1cGVyKC4uLmFyZ3MpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENoZWNrYm94O1xuIiwiaW1wb3J0IGJvb2xlYW4gZnJvbSBcIi4vLi4vdHlwZS9ib29sZWFuXCI7XG5pbXBvcnQgU2VsZWN0IGZyb20gXCIuL2Fic3RyYWN0L1NlbGVjdFwiO1xuaW1wb3J0IHNlbGVjdG9yIGZyb20gXCIuLy4uL3V0aWxzL3NlbGVjdG9yXCI7XG5cbmZ1bmN0aW9uIGZpbHRlcihjYiwgdmFsdWUpIHtcblx0dmFyIHNlbGVjdGVkT3B0aW9ucyA9IFtdO1xuXG5cdGNiLm93bnMuZm9yRWFjaChsaXN0Ym94ID0+IHtcblx0XHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGxpc3Rib3guZWxlbWVudC5jaGlsZHJlbiwgb3B0aW9uID0+IHtcblx0XHRcdGlmKHZhbHVlID09PSBudWxsKSB7XG5cdFx0XHRcdG9wdGlvbi5oaWRkZW4gPSB0cnVlO1xuXHRcdFx0fSBlbHNlIGlmIChvcHRpb24uaW5uZXJIVE1MLmluZGV4T2YodmFsdWUpID09IDApIHtcblx0XHRcdFx0b3B0aW9uLmhpZGRlbiA9IGZhbHNlO1xuXHRcdFx0XHRpZihvcHRpb24uaW5uZXJIVE1MID09PSB2YWx1ZSkge1xuXHRcdFx0XHRcdHNlbGVjdGVkT3B0aW9ucy5wdXNoKG9wdGlvbik7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG9wdGlvbi5oaWRkZW4gPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcblxuXHRyZXR1cm4gc2VsZWN0ZWRPcHRpb25zO1xufVxuXG5mdW5jdGlvbiB0b2dnbGVMaXN0Ym94KGV2KSB7XG5cdGlmKGV2KSBldi5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdGlmICh0aGlzLmV4cGFuZGVkID09IGJvb2xlYW4uSVNfQUNUSVZFKSB7XG5cdFx0aGlkZUxpc3Rib3guY2FsbCh0aGlzKTtcblx0fSBlbHNlIHtcblx0XHRzaG93TGlzdGJveC5jYWxsKHRoaXMpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVZhbHVlKGV2KSB7XG5cdGlmKGV2KSBldi5wcmV2ZW50RGVmYXVsdCgpO1xuXHRjb25zb2xlLmxvZyh0aGlzLl8uY29tYm9ib3guaW5wdXQudmFsdWUsIGV2LnRhcmdldC5pbm5lckhUTUwsIHRoaXMuXywgZXYpO1xuXHR0aGlzLl8uY29tYm9ib3guaW5wdXQudmFsdWUgPSBldi50YXJnZXQuaW5uZXJIVE1MO1xuXG5cdGhpZGVMaXN0Ym94LmJpbmQodGhpcyk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpc3Rib3goKSB7IFxuXHR2YXIgb3B0aW9ucyA9IGZpbHRlcih0aGlzLCB0aGlzLl8uY29tYm9ib3guaW5wdXQudmFsdWUpO1xuXG5cdG9wdGlvbnMuZm9yRWFjaChpID0+IHtcblx0XHRpLnNlbGVjdGVkID0gdHJ1ZTtcblx0fSk7XG59XG5mdW5jdGlvbiBzaG93TGlzdGJveCgpIHtcblx0dGhpcy5leHBhbmRlZCA9IGJvb2xlYW4uSVNfQUNUSVZFO1xuXHR1cGRhdGVMaXN0Ym94LmNhbGwodGhpcyk7XG59XG5mdW5jdGlvbiBoaWRlTGlzdGJveCgpIHtcblx0dGhpcy5leHBhbmRlZCA9IGJvb2xlYW4uSVNfTk9UX0FDVElWRTtcblx0ZmlsdGVyKHRoaXMpO1xufVxuXG4vKipcbiAqIEBzdW1tYXJ5IEEgY29tcG9zaXRlIHdpZGdldCBjb250YWluaW5nIGEgc2luZ2xlLWxpbmUgdGV4dGJveCBhbmQgYW5vdGhlciBlbGVtZW50LCBcbiAqIHN1Y2ggYXMgYSBsaXN0Ym94IG9yIGdyaWQsIHRoYXQgY2FuIGR5bmFtaWNhbGx5IHBvcCB1cCB0byBoZWxwIHRoZSB1c2VyIHNldCB0aGUgdmFsdWUgb2YgdGhlIHRleHRib3guXG4gKiBAZGVzY1xuICogQSBjb21ib2JveCBpcyBhIHdpZGdldCBtYWRlIHVwIG9mIHRoZSBjb21iaW5hdGlvbiBvZiB0d28gZGlzdGluY3QgZWxlbWVudHM6IFxuICogXG4gKiAxLiBhIHNpbmdsZS1saW5lIHRleHRib3hcbiAqIDIuIGFuIGFzc29jaWF0ZWQgcG9wLXVwIGVsZW1lbnQgZm9yIGhlbHBpbmcgdXNlcnMgc2V0IHRoZSB2YWx1ZSBvZiB0aGUgdGV4dGJveC4gXG4gKiBcbiAqIFRoZSBwb3B1cCBtYXkgYmUgYSBsaXN0Ym94LCBncmlkLCB0cmVlLCBvciBkaWFsb2cuIE1hbnkgaW1wbGVtZW50YXRpb25zIGFsc28gaW5jbHVkZSBhIHRoaXJkIFxuICogb3B0aW9uYWwgZWxlbWVudCAtLSBhIGdyYXBoaWNhbCBidXR0b24gYWRqYWNlbnQgdG8gdGhlIHRleHRib3gsIGluZGljYXRpbmcgdGhlIGF2YWlsYWJpbGl0eSBvZlxuICogdGhlIHBvcHVwLiBBY3RpdmF0aW5nIHRoZSBidXR0b24gZGlzcGxheXMgdGhlIHBvcHVwIGlmIHN1Z2dlc3Rpb25zIGFyZSBhdmFpbGFibGUuXG4gKiBcbiAqIEBleHRlbmRzIFNlbGVjdFxuICogQHBhcmFtIHtFbGVtZW50fSBvcHRpb25zLmNvbWJvYm94LmlucHV0IFx0RGVmYXVsdHMgdG8gZmlyc3QgaW5wdXQgZWxlbWVudCBpbnNpZGUgdGhlIGVsZW1lbnRcbiAqIEBwYXJhbSB7RWxlbWVudH0gW29wdGlvbnMuY29tYm9ib3gub3Blbl1cdFxuICogXHRPcHRpb25hbCBidXR0b24gdG8gb3BlbiB0aGUgcG9wLXVwIGVsZW1lbnQsIFxuICogXHRkZWZhdWx0cyB0byBmaXJzdCBidXR0b24gZWxlbWVudCBpbnNpZGUgdGhlIGVsZW1lbnRcbiAqL1xuY2xhc3MgQ29tYm9ib3ggZXh0ZW5kcyBTZWxlY3Qge1xuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0c3VwZXIoLi4uYXJncyk7XG5cblx0XHQvLyByZWdpc3RlciBjdXN0b20gZWxlbWVudHNcblx0XHR0aGlzLl8ucmVnaXN0ZXJDdXN0b21FbGVtZW50KFwiY29tYm9ib3guaW5wdXRcIiwgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IuZ2V0RGVlcChcInRleHRib3hcIikpKTtcblx0XHR0aGlzLl8ucmVnaXN0ZXJDdXN0b21FbGVtZW50KFwiY29tYm9ib3gub3BlblwiLCB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvci5nZXREZWVwKFwiYnV0dG9uXCIpKSk7XG5cdFx0XG5cdFx0aWYgKHRoaXMuXy5jb21ib2JveC5vcGVuKSB7XG5cdFx0XHR0aGlzLl8uY29tYm9ib3gub3Blbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlTGlzdGJveC5iaW5kKHRoaXMpKTtcblx0XHR9XG5cdFx0XG5cdFx0dGhpcy5fLmNvbWJvYm94LmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCBzaG93TGlzdGJveC5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLl8uY29tYm9ib3guaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgaGlkZUxpc3Rib3guYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5fLmNvbWJvYm94LmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCB1cGRhdGVMaXN0Ym94LmJpbmQodGhpcykpO1xuXHRcdC8vIHRoaXMub3ducy5mb3JFYWNoKGkgPT4gaS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB1cGRhdGVWYWx1ZS5iaW5kKHRoaXMpKSk7XG5cblx0XHRpZih0aGlzLmF1dG9jb21wbGV0ZSA9PSBcImxpc3RcIikge1xuXHRcdFx0Ly8gSW5kaWNhdGVzIHRoYXQgdGhlIGF1dG9jb21wbGV0ZSBiZWhhdmlvciBvZiB0aGUgdGV4dCBpbnB1dCBpcyB0byBzdWdnZXN0IGEgbGlzdCBvZiBwb3NzaWJsZSB2YWx1ZXNcblx0XHRcdC8vIGluIGEgcG9wdXAgYW5kIHRoYXQgdGhlIHN1Z2dlc3Rpb25zIGFyZSByZWxhdGVkIHRvIHRoZSBzdHJpbmcgdGhhdCBpcyBwcmVzZW50IGluIHRoZSB0ZXh0Ym94LlxuXG5cdFx0fSBlbHNlIGlmICh0aGlzLmF1dG9jb21wbGV0ZSA9PSBcImJvdGhcIikge1xuXHRcdFx0Ly8gbmRpY2F0ZXMgdGhhdCB0aGUgYXV0b2NvbXBsZXRlIGJlaGF2aW9yIG9mIHRoZSB0ZXh0IGlucHV0IGlzIHRvIGJvdGggc2hvdyBhbiBpbmxpbmUgXG5cdFx0XHQvLyBjb21wbGV0aW9uIHN0cmluZyBhbmQgc3VnZ2VzdCBhIGxpc3Qgb2YgcG9zc2libGUgdmFsdWVzIGluIGEgcG9wdXAgd2hlcmUgdGhlIHN1Z2dlc3Rpb25zIFxuXHRcdFx0Ly8gYXJlIHJlbGF0ZWQgdG8gdGhlIHN0cmluZyB0aGF0IGlzIHByZXNlbnQgaW4gdGhlIHRleHRib3guXG5cdFx0fVxuXG5cdFx0LyoqIEB0b2RvIGRldGVybWluZSB3aGF0IHRvIGRvIHdpdGggZGVmYXVsdCB2YWx1ZXMgKi9cblx0XHRpZih0aGlzLmV4cGFuZGVkID09IHVuZGVmaW5lZCkgdGhpcy5leHBhbmRlZCA9IGZhbHNlO1xuXHRcdGlmICh0aGlzLmhhc1BvcHVwID09IHVuZGVmaW5lZCkgdGhpcy5oYXNQb3B1cCA9IFwibGlzdGJveFwiO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbWJvYm94OyIsImltcG9ydCBtaXggZnJvbSBcIkB2ZXN0ZXJnYWFyZC1jb21wYW55L2pzLW1peGluXCI7XHJcbmltcG9ydCBXaW5kb3cgZnJvbSBcIi4vYWJzdHJhY3QvV2luZG93XCI7XHJcbmNvbnN0IE1vdXNldHJhcCA9IHJlcXVpcmUoXCJtb3VzZXRyYXBcIik7XHJcblxyXG5pbXBvcnQgQXJpYUV4cGFuZGVkIGZyb20gXCIuLi9hdHRyaWJ1dGVzL2FyaWEtZXhwYW5kZWQuanNcIjtcclxuXHJcbmZ1bmN0aW9uIGZvY3VzKG5vZGUpIHtcclxuXHQvLyBnZXQgYWxsIGVsZW1lbnRzIHdpdGhpbiBnaXZlbiBlbGVtZW50XHJcblx0bGV0IGNoaWxkcmVuID0gbm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcIipcIik7XHJcblx0XHJcblx0Ly8gcmVtb3ZlIGFsbCBlbGVtZW50cyB3aG8gYXJlbid0IGFjY2Vzc2libGUgYnkgYSB0YWJcclxuXHRsZXQgZm9jdXNhYmxlTm9kZXMgPSBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwoY2hpbGRyZW4sIGkgPT4ge1xyXG5cdFx0cmV0dXJuIChpLnRhYkluZGV4ID4gLTEgfHwgaS5jb250ZW50RWRpdGFibGUgPT0gXCJ0cnVlXCIpXHJcblx0XHRcdCYmICFpLmRpc2FibGVkICYmIGkub2Zmc2V0V2lkdGggPiAwICYmIGkub2Zmc2V0SGVpZ2h0ID4gMDtcclxuXHR9KTtcclxuXHRcclxuXHQvLyBzb3J0IGVsZW1lbnRzIGluIGRlc2NlbmRpbmcgb3JkZXJcclxuXHRmb2N1c2FibGVOb2Rlcy5zb3J0KChhLCBiKSA9PiBhLnRhYkluZGV4ICsgYi50YWJJbmRleCk7XHJcblxyXG5cdC8vIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpO1xyXG5cdC8vIGZvY3VzYWJsZUVsLmZvY3VzKCk7XHJcblx0cmV0dXJuIGZvY3VzYWJsZU5vZGVzO1xyXG59XHJcblxyXG4vKipcclxuICogQHN1bW1hcnkgQSBjaGlsZCB3aW5kb3cgd2l0aGluIGEgd2VicGFnZVxyXG4gKlxyXG4gKiBAZGVzY1xyXG4gKiAqIFByb21wdHMgdGhlIHVzZXIgdG8gcGVyZm9ybSBhIHNwZWNpZmljIGFjdGlvblxyXG4gKiAqIElmIGl0IGlzIGRlc2lnbmVkIHRvIGludGVycnVwLCBpdCBpcyB1c3VhbGx5IGEgbW9kYWwuIFNlZSBbYWxlcnRkaWFsb2ddKClcclxuICogKiBJdCBzaG91bGQgaGF2ZSBhIGxhYmVsLCBpdCBjYW4gYmUgZG9uZSB3aXRoIHRoZSBgYXJpYS1sYWJlbGAgYXR0cmlidXRlXHJcbiAqICogSXQgc2hvdWxkIGhhdmUgYXQgbGVhc3Qgb25lIGZvY3VzYWJsZSBkZXNjZW5kYW50IGVsZW1lbnQuXHJcbiAqICogSXQgc2hvdWxkIGZvY3VzIGFuIGVsZW1lbnQgaW4gdGhlIG1vZGFsIHdoZW4gZGlzcGxheWVkLlxyXG4gKiAqIEl0IHNob3VsZCBtYW5hZ2UgZm9jdXMgb2YgbW9kYWwgZGlhbG9ncyAoa2VlcCB0aGUgZm9jdXMgaW5zaWRlIHRoZSBvcGVuIG1vZGFsKS5cclxuICpcclxuICogIyMjIyMgZXhhbXBsZVxyXG4gKlxyXG4gKiA8ZGl2IHJvbGU9XCJkaWFsb2dcIiBhcmlhLWxhYmVsPVwiV2luZG93IHRvIGNvbmZpcm0geW91ciBhY2NlcHRhbmNlIG9mIHRoaXMgd29ybGRcIj5cclxuICogIEhlbGxvIHdvcmxkIVxyXG4gKiBcdDxidXR0b24gZm9jdXMgdHlwZT1cImJ1dHRvblwiPk9rPC9idXR0b24+XHJcbiAqIDwvZGl2PlxyXG4gKiBAZXh0ZW5kcyBXaW5kb3dcclxuICovXHJcbmNsYXNzIERpYWxvZyBleHRlbmRzIG1peChXaW5kb3cpLndpdGgoQXJpYUV4cGFuZGVkKSB7XHJcblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xyXG5cdFx0c3VwZXIoLi4uYXJncyk7XHJcblxyXG5cdFx0Ly8gdGhpcy5fbm9kZS5vd25lckRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCB0aGlzLl9vbkZvY3VzLmJpbmQodGhpcyksIHRydWUpO1xyXG5cdFx0Ly8gdGhpcy5fbm9kZS5vd25lckRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIHRoaXMuX29uRm9jdXMuYmluZCh0aGlzKSwgdHJ1ZSk7XHJcblx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlcIiwgdGhpcy5vbkNsb3NlLmJpbmQodGhpcyksIHsga2V5OiBcImVzY1wiLCB0YXJnZXQ6IHRoaXMuX25vZGUub3duZXJEb2N1bWVudH0pO1xyXG5cclxuXHRcdHZhciBuID0gZm9jdXMoZG9jdW1lbnQpO1xyXG5cdFx0dmFyIGkgPSAwO1xyXG5cdFx0Ly8gdmFyIHQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcblx0XHQvLyBcdGNvbnNvbGUubG9nKE1vdXNldHJhcChkb2N1bWVudC5hY3RpdmVFbGVtZW50KS50cmlnZ2VyKFwidGFiXCIpKTtcclxuXHRcdC8vIFx0Ly8gbGV0IGkgPSBuLmluZGV4T2YoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XHJcblx0XHQvLyBcdGlmKGkgPCBuLmxlbmd0aCkge1xyXG5cdFx0Ly8gXHRcdHZhciBmID0gbmV3IEZvY3VzRXZlbnQoXCJmb2N1c1wiKTtcclxuXHRcdC8vIFx0XHRuW2krK10uZGlzcGF0Y2hFdmVudChmKTtcclxuXHRcdC8vIFx0XHQvLyBjb25zb2xlLmxvZyhuW2krK10uZm9jdXMoKSk7XHJcblx0XHQvLyBcdH1cclxuXHRcdC8vIH0sIDEwMDApO1xyXG5cdH1cclxuXHJcblx0X29uRm9jdXMoZXYpIHtcclxuXHRcdC8vIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRsZXQgbiA9IGZvY3VzKHRoaXMuX25vZGUub3duZXJEb2N1bWVudCk7XHJcblx0XHRpZihuW24ubGVuZ3RoLTFdICE9IGV2LnRhcmdldCkge1xyXG5cdFx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR3aW5kb3cuZm9jdXMoKTtcclxuXHRcdH1cclxuXHRcdGNvbnNvbGUubG9nKGV2KTtcclxuXHR9XHJcblxyXG5cdG9uQ2xvc2UoZXYpIHtcclxuXHRcdGlmKGV2KSBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0dGhpcy5fbm9kZS5oaWRkZW4gPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJjbG9zZVwiKSk7XHJcblx0fVxyXG5cclxuXHRfb25IaWRkZW5NdXRhdGlvbihldikge1xyXG5cdFx0aWYodGhpcy5fbm9kZS5nZXRBdHRyaWJ1dGUoXCJoaWRkZW5cIikgPT09IFwidHJ1ZVwiKSB7XHJcblx0XHRcdHZhciBuID0gZm9jdXModGhpcy5fbm9kZSk7XHJcblx0XHRcdG5bMF0uZm9jdXMoKTtcclxuXHRcdFx0Y29uc29sZS5sb2cobiwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCwgbiA9PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGlhbG9nOyIsImltcG9ydCBMYW5kbWFyayBmcm9tIFwiLi9hYnN0cmFjdC9MYW5kbWFya1wiO1xyXG5pbXBvcnQgc2VsZWN0b3IgZnJvbSBcIi4vLi4vdXRpbHMvc2VsZWN0b3JcIjtcclxuaW1wb3J0IGVsZW1lbnRzIGZyb20gXCIuLy4uL3V0aWxzL2VsZW1lbnRzXCI7XHJcbmltcG9ydCBjcmVhdGUgZnJvbSBcIi4vLi4vdXRpbHMvY3JlYXRlXCI7XHJcblxyXG5jbGFzcyBGb3JtIGV4dGVuZHMgTGFuZG1hcmsge1xyXG5cdGdldCBlbGVtZW50cygpIHtcclxuXHRcdC8vIGdldCBuYXRpdmUgZWxlbWVudHNcclxuXHRcdHZhciBzZWxlY3RvciA9IFtcImJ1dHRvblwiLCBcImZpZWxkc2V0XCIsIFwiaW5wdXRcIiwgXCJvYmplY3RcIiwgXCJvdXRwdXRcIiwgXCJzZWxlY3RcIiwgXCJ0ZXh0YXJlYVwiXS5qb2luKFwiOm5vdChbcm9sZV0pLFwiKTtcclxuXHRcdHZhciByZXMgPSBBcnJheS5mcm9tKHRoaXMuZWxlbWVudHMucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xyXG5cclxuXHRcdHZhciBleHBsaWNpdFJvbGUgPSBcIlwiO1xyXG5cdFx0ZXhwbGljaXRSb2xlICs9IHNlbGVjdG9yLmdldERlZXBSb2xlKFwiYnV0dG9uXCIpO1xyXG5cdFx0ZXhwbGljaXRSb2xlICs9IHNlbGVjdG9yLmdldERlZXBSb2xlKFwiaW5wdXRcIik7XHJcblx0XHRleHBsaWNpdFJvbGUgKz0gc2VsZWN0b3IuZ2V0RGVlcFJvbGUoXCJzdGF0dXNcIik7XHJcblx0XHRleHBsaWNpdFJvbGUgKz0gc2VsZWN0b3IuZ2V0RGVlcFJvbGUoXCJzZWxlY3RcIik7XHJcblxyXG5cdFx0QXJyYXkucHJvdG90eXBlLmZvckVhY2goXHJcblx0XHRcdHRoaXMuZWxlbWVudHMucXVlcnlTZWxlY3RvckFsbChleHBsaWNpdFJvbGUpLCBcclxuXHRcdFx0bm9kZSA9PiByZXMucHVzaChlbGVtZW50cy5nZXQobm9kZSkgfHwgY3JlYXRlLm9uZShub2RlKSlcclxuXHRcdCk7XHJcblx0XHRjb25zb2xlLmxvZyhyZXMsIGV4cGxpY2l0Um9sZSwgc2VsZWN0b3IpO1xyXG5cdFx0cmV0dXJuIHJlcztcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZvcm07IiwiaW1wb3J0IG1peCBmcm9tIFwiQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW5cIjtcbmltcG9ydCBDb21tYW5kIGZyb20gXCIuL2Fic3RyYWN0L0NvbW1hbmQuanNcIjtcbmltcG9ydCBib29sZWFuIGZyb20gXCIuLy4uL3R5cGUvYm9vbGVhblwiO1xuXG5pbXBvcnQgQXJpYUV4cGFuZGVkIGZyb20gXCIuLi9hdHRyaWJ1dGVzL2FyaWEtZXhwYW5kZWRcIjtcblxuZnVuY3Rpb24gY2xvc2UoKSB7XG5cdHRoaXMuZXhwYW5kZWQgPSBib29sZWFuLklTX05PVF9BQ1RJVkU7XG59XG5cbi8qKlxuICogQW4gaW50ZXJhY3RpdmUgcmVmZXJlbmNlIHRvIGFuIGludGVybmFsIG9yIGV4dGVybmFsIHJlc291cmNlIHRoYXQsXG4gKiB3aGVuIGFjdGl2YXRlZCwgY2F1c2VzIHRoZSB1c2VyIGFnZW50IHRvIG5hdmlnYXRlIHRvIHRoYXQgcmVzb3VyY2UuXG4gKiBcbiAqIEBleHRlbmRzIENvbW1hbmRcbiAqIEBtaXhlcyBBcmlhRXhwYW5kZWRcbiAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLmxpbmsuaHJlZiAgVVJMIHRoYXQgc2hvdWxkIGJlIHVzZWRcbiAqIEBsaXN0ZW5zIGNsaWNrXG4gKiBAZXhhbXBsZVxuICogPGRpdiByb2xlPVwibGlua1wiIGRhdGEtbGluay1ocmVmPVwiaHR0cDovL3d3dy5leGFtcGxlLmNvbS9cIiB0YWJpbmRleD1cIjBcIj5cbiAqIFx0T3BlbiB3ZWJzaXRlXG4gKiA8L2Rpdj5cbiAqL1xuY2xhc3MgTGluayBleHRlbmRzIG1peChDb21tYW5kKS53aXRoKEFyaWFFeHBhbmRlZCkge1xuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0c3VwZXIoLi4uYXJncyk7XG5cblx0XHR0aGlzLl8ucmVnaXN0ZXJDdXN0b21WYWx1ZShcImxpbmsuaHJlZlwiKTtcblxuXHRcdGlmKHRoaXMuXy5saW5rLmhyZWYpIHtcblx0XHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25DbGljay5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKSwgeyBrZXk6IFwiZW50ZXJcIiB9KTtcblx0XHR9XG5cblx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJleHBhbmRlZFwiKVxuXG5cdFx0aWYgKHRoaXMuZXhwYW5kZWQgIT09IHVuZGVmaW5lZCkgeyAvLyB0b2RvOiBhZGQgd2hlbiBmaXJzdCB0aW1lIGFyaWEtZXhwYW5kZWQgaXMgYm9vbGVhblxuXHRcdFx0dGhpcy5jb250cm9scy5mb3JFYWNoKGNvbnRyb2wgPT4gY29udHJvbC5hZGRFdmVudExpc3RlbmVyKFwiY2xvc2VcIiwgY2xvc2UuYmluZCh0aGlzKSkpO1xuXHRcdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vbkV4cGFuZGVkLmJpbmQodGhpcykpO1xuXHRcdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwia2V5XCIsIHRoaXMub25FeHBhbmRlZC5iaW5kKHRoaXMpLCB7IGtleTogXCJlbnRlclwiIH0pO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBGaXJlZCB3aGVuIHN0YXRlIG9mIGV4cGFuZGVkIGlzIGNoYW5nZWQgXG5cdCAqIEBwYXJhbSB7RXZlbnR9IGV2IFxuXHQgKi9cblx0b25FeHBhbmRlZChldikge1xuXHRcdGlmICh0eXBlb2Ygc3VwZXIub25FeHBhbmRlZCA9PSBcImZ1bmN0aW9uXCIpIHN1cGVyLm9uRXhwYW5kZWQoZXYpO1xuXG5cdFx0aWYgKHRoaXMuZGlzYWJsZWQgIT09IHRydWUpIHtcblx0XHRcdGlmICh0aGlzLmV4cGFuZGVkKSB7XG5cdFx0XHRcdHRoaXMuY29udHJvbHMuZm9yRWFjaChjb250cm9sID0+IHtcblx0XHRcdFx0XHRjb250cm9sLmVsZW1lbnQuaGlkZGVuID0gZmFsc2U7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5jb250cm9scy5mb3JFYWNoKGNvbnRyb2wgPT4ge1xuXHRcdFx0XHRcdGNvbnRyb2wuZWxlbWVudC5oaWRkZW4gPSB0cnVlO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogT3BlbiB0aGUgdXJsIHRoYXQgaXMgZGVmaW5lZCBpbiB0aGUgb3B0aW9ucywgIFxuXHQgKiBmaXJlcyBhbiBjbGljayBldmVudCBvbmx5IGlmIGl0cyBvcmlnaW4gd2Fzbid0IGFuIGNsaWNrIGV2ZW50XG5cdCAqIEBwYXJhbSB7RXZlbnR9IGV2IFxuXHQgKiBAZmlyZXMgbGluayNhY2Nlc3NpYmxlY2xpY2tcblx0ICogQGZpcmVzIGNsaWNrXG5cdCAqL1xuXHRvbkNsaWNrKGV2KSB7XG5cdFx0aWYgKHR5cGVvZiBzdXBlci5vbkNsaWNrID09IFwiZnVuY3Rpb25cIikgc3VwZXIub25DbGljayhldik7XG5cdFxuXHRcdGlmKHRoaXMuXy5saW5rLmhyZWYpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwic2hvdWxkIG9wZW5cIiwgdGhpcy5fLmxpbmsuaHJlZik7XG5cdFx0XHQvLyB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHRoaXMuXy5saW5rLmhyZWY7XG5cdFx0fVxuXG5cdFx0LyoqXG4gICAgICogQW4gY2xpY2sgdHJpZ2dlcmVkIGJ5IGFuIGtleWJvYXJkIG9yIG1vdXNlXG4gICAgICogQGV2ZW50IExpbmsjYWNjZXNzaWJsZWNsaWNrXG4gICAgICovXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImFjY2Vzc2libGVjbGlja1wiKSk7XG5cdFx0aWYoZXYudHlwZSAhPT0gXCJjbGlja1wiKSB7XG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IE1vdXNlRXZlbnQoXCJjbGlja1wiKSk7XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExpbms7IiwiaW1wb3J0IFNlbGVjdCBmcm9tIFwiLi9hYnN0cmFjdC9TZWxlY3RcIjtcclxuaW1wb3J0IGJvb2xlYW4gZnJvbSBcIi4vLi4vdHlwZS9ib29sZWFuXCI7XHJcblxyXG4vKipcclxuICogQHN1bW1hcnkgQSB3aWRnZXQgdGhhdCBhbGxvd3MgdGhlIHVzZXIgdG8gc2VsZWN0IG9uZSBvciBtb3JlIGl0ZW1zIGZyb20gYSBsaXN0IG9mIGNob2ljZXMuXHJcbiAqIEBkZXNjXHJcbiAqICMjIyBLZXlib2FyZCBTdXBwb3J0XHJcbiAqXHJcbiAqICMjIyMgRGVmYXVsdFxyXG4gKiB8IEtleSB8IEZ1bmN0aW9uIHxcclxuICogfCAtLS0gfCAtLS0tLS0tLSB8XHJcbiAqIHwgRG93biBBcnJvdyB8IE1vdmVzIGZvY3VzIHRvIHRoZSBuZXh0IG9wdGlvbiA8YnIvPiBJZiBub3QgbXVsdGlzZWxlY3RhYmxlLCBpdCBzZWxlY3RzIHRoZSBmb2N1c2VkIG9wdGlvbi5cclxuICogfCBVcCBBcnJvdyBcdHwgTW92ZXMgZm9jdXMgdG8gdGhlIHByZXZpb3VzIG9wdGlvbiAgPGJyLz4gSWYgbm90IG11bHRpc2VsZWN0YWJsZSwgaXQgc2VsZWN0cyB0aGUgZm9jdXNlZCBvcHRpb24uXHJcbiAqIHwgSG9tZSBcdFx0XHR8XHRNb3ZlcyBmb2N1cyB0byB0aGUgZmlyc3Qgb3B0aW9uICA8YnIvPiBJZiBub3QgbXVsdGlzZWxlY3RhYmxlLCBpdCBzZWxlY3RzIHRoZSBmb2N1c2VkIG9wdGlvbi5cclxuICogfCBFbmQgIFx0XHRcdHxcdE1vdmVzIGZvY3VzIHRvIHRoZSBsYXN0IG9wdGlvbiAgPGJyLz4gSWYgbm90IG11bHRpc2VsZWN0YWJsZSwgaXQgc2VsZWN0cyB0aGUgZm9jdXNlZCBvcHRpb24uXHJcbiAqIFxyXG4gKiAjIyMjIE11bHRpcGxlIHNlbGVjdGlvblxyXG4gKiB8IEtleSB8IEZ1bmN0aW9uIHxcclxuICogfCAtLS0gfCAtLS0tLS0tLSB8XHJcbiAqIHwgU3BhY2VcdFx0XHRcdFx0XHRcdFx0XHR8IENoYW5nZXMgdGhlIHNlbGVjdGlvbiBzdGF0ZSBvZiB0aGUgZm9jdXNlZCBvcHRpb24uXHJcbiAqIHwgU2hpZnQgKyBEb3duIEFycm93IFx0XHR8IE1vdmVzIGZvY3VzIHRvIGFuZCBzZWxlY3RzIHRoZSBuZXh0IG9wdGlvbi5cclxuICogfCBTaGlmdCArIFVwIEFycm93IFx0XHRcdHwgTW92ZXMgZm9jdXMgdG8gYW5kIHNlbGVjdHMgdGhlIHByZXZpb3VzIG9wdGlvbi5cclxuICogfCBDb250cm9sICsgU2hpZnQgKyBIb21lIHxcdFNlbGVjdHMgZnJvbSB0aGUgZm9jdXNlZCBvcHRpb24gdG8gdGhlIGJlZ2lubmluZyBvZiB0aGUgbGlzdC5cclxuICogfCBDb250cm9sICsgU2hpZnQgKyBFbmQgIHwgU2VsZWN0cyBmcm9tIHRoZSBmb2N1c2VkIG9wdGlvbiB0byB0aGUgZW5kIG9mIHRoZSBsaXN0LlxyXG4gKiB8IENvbnRyb2wgKyBBIFx0ICAgICAgICAgIHwgU2VsZWN0cyBhbGwgb3B0aW9ucyBpbiB0aGUgbGlzdC4gSWYgYWxsIG9wdGlvbnMgYXJlIHNlbGVjdGVkLCB1bnNlbGVjdHMgYWxsIG9wdGlvbnMuXHJcbiAqIFxyXG4gKiAjIyMgRXhhbXBsZVxyXG4gKiBcclxuICogIyMjIyBCYXNpYyBleGFtcGxlXHJcbiAqIFxyXG4gKiA8dWwgcm9sZT1cImxpc3Rib3hcIiB0YWJpbmRleD1cIjBcIiBhcmlhLWFjdGl2ZWRlc2NlbmRhbnQ9XCJvcHRpb25fMVwiIGRhdGEtbGlzdGJveC1zaXplPVwiMzBcIj5cclxuICogICA8bGkgaWQ9XCJvcHRpb25fMVwiIHJvbGU9XCJvcHRpb25cIj5BcHBsZTwvbGk+XHJcbiAqICAgPGxpIGlkPVwib3B0aW9uXzNcIiByb2xlPVwib3B0aW9uXCI+QXNwYXJhZ3VzPC9saT5cclxuICogICA8bGkgaWQ9XCJvcHRpb25fNVwiIHJvbGU9XCJvcHRpb25cIj5CZWV0czwvbGk+XHJcbiAqICAgPGxpIGlkPVwib3B0aW9uXzdcIiByb2xlPVwib3B0aW9uXCI+QnJvY2NvbGk8L2xpPlxyXG4gKiAgIDxsaSBpZD1cIm9wdGlvbl85XCIgcm9sZT1cIm9wdGlvblwiPkNhYmJhZ2U8L2xpPlxyXG4gKiAgIDxsaSBpZD1cIm9wdGlvbl8xMVwiIHJvbGU9XCJvcHRpb25cIj5DYXVsaWZsb3dlcjwvbGk+XHJcbiAqICAgPGxpIGlkPVwib3B0aW9uXzEzXCIgcm9sZT1cIm9wdGlvblwiPkNoYXJkPC9saT5cclxuICogICA8bGkgaWQ9XCJvcHRpb25fMTVcIiByb2xlPVwib3B0aW9uXCI+Q29ybjwvbGk+XHJcbiAqICAgPGxpIGlkPVwib3B0aW9uXzE3XCIgcm9sZT1cIm9wdGlvblwiPkRhaWtvbjwvbGk+XHJcbiAqICAgPGxpIGlkPVwib3B0aW9uXzE5XCIgcm9sZT1cIm9wdGlvblwiPkVkYW1hbWU8L2xpPlxyXG4gKiBcdDwvdWw+XHJcbiAqIFxyXG4gKiBgYGBodG1sXHJcbiAqIDx1bCByb2xlPVwibGlzdGJveFwiIHRhYmluZGV4PVwiMFwiIGFyaWEtYWN0aXZlZGVzY2VuZGFudD1cIm9wdGlvbl8xXCI+XHJcbiAqICAgPGxpIGlkPVwib3B0aW9uXzIxXCIgcm9sZT1cIm9wdGlvblwiPkVsZGVyYmVycnk8L2xpPlxyXG4gKiAgIC4uLlxyXG4gKiA8L3VsPlxyXG4gKiBgYGBcclxuICogXHJcbiAqICMjIyMgTXVsdGkgc2VsZWN0YWJsZSBleGFtcGxlXHJcbiAqIFxyXG4gKiA8dWwgcm9sZT1cImxpc3Rib3hcIiB0YWJpbmRleD1cIjBcIiBhcmlhLWFjdGl2ZWRlc2NlbmRhbnQ9XCJvcHRpb25fMVwiIGFyaWEtbXVsdGlzZWxlY3RhYmxlPVwidHJ1ZVwiPlxyXG4gKiAgIDxsaSBpZD1cIm9wdGlvbl8yMVwiIHJvbGU9XCJvcHRpb25cIj5FbGRlcmJlcnJ5PC9saT5cclxuICogICA8bGkgaWQ9XCJvcHRpb25fMjNcIiByb2xlPVwib3B0aW9uXCI+RmlnPC9saT5cclxuICogICA8bGkgaWQ9XCJvcHRpb25fMjVcIiByb2xlPVwib3B0aW9uXCI+R3JhcGU8L2xpPlxyXG4gKiAgIDxsaSBpZD1cIm9wdGlvbl8yN1wiIHJvbGU9XCJvcHRpb25cIj5JY2ViZXJnIGxldHR1Y2U8L2xpPlxyXG4gKiAgIDxsaSBpZD1cIm9wdGlvbl8yOVwiIHJvbGU9XCJvcHRpb25cIj5LYWxlPC9saT5cclxuICogICA8bGkgaWQ9XCJvcHRpb25fMzFcIiByb2xlPVwib3B0aW9uXCI+TGVlazwvbGk+XHJcbiAqICAgPGxpIGlkPVwib3B0aW9uXzMzXCIgcm9sZT1cIm9wdGlvblwiPk1hbmdvPC9saT5cclxuICogICA8bGkgaWQ9XCJvcHRpb25fMzVcIiByb2xlPVwib3B0aW9uXCI+TWVsb248L2xpPlxyXG4gKiAgIDxsaSBpZD1cIm9wdGlvbl8zN1wiIHJvbGU9XCJvcHRpb25cIj5OZWN0YXJpbmU8L2xpPlxyXG4gKiAgIDxsaSBpZD1cIm9wdGlvbl8zOVwiIHJvbGU9XCJvcHRpb25cIj5PbGl2ZTwvbGk+XHJcbiAqICAgPGxpIGlkPVwib3B0aW9uXzQxXCIgcm9sZT1cIm9wdGlvblwiPk9yYW5nZTwvbGk+XHJcbiAqICAgPGxpIGlkPVwib3B0aW9uXzQzXCIgcm9sZT1cIm9wdGlvblwiPlBlYTwvbGk+XHJcbiAqICAgPGxpIGlkPVwib3B0aW9uXzQ1XCIgcm9sZT1cIm9wdGlvblwiPlBpbmVhcHBsZTwvbGk+XHJcbiAqICAgPGxpIGlkPVwib3B0aW9uXzQ3XCIgcm9sZT1cIm9wdGlvblwiPlB1bXBraW48L2xpPlxyXG4gKiAgIDxsaSBpZD1cIm9wdGlvbl80OVwiIHJvbGU9XCJvcHRpb25cIj5SYWRpc2g8L2xpPlxyXG4gKiAgIDxsaSBpZD1cIm9wdGlvbl81MVwiIHJvbGU9XCJvcHRpb25cIj5TaGFsbG90PC9saT5cclxuICogICA8bGkgaWQ9XCJvcHRpb25fNTNcIiByb2xlPVwib3B0aW9uXCI+U3F1YXNoPC9saT5cclxuICogICA8bGkgaWQ9XCJvcHRpb25fNTVcIiByb2xlPVwib3B0aW9uXCI+U3dlZXQgcG90YXRvPC9saT5cclxuICogICA8bGkgaWQ9XCJvcHRpb25fNTdcIiByb2xlPVwib3B0aW9uXCI+VHVybmlwPC9saT5cclxuICogICA8bGkgaWQ9XCJvcHRpb25fNTlcIiByb2xlPVwib3B0aW9uXCI+VmljdG9yaWEgcGx1bTwvbGk+XHJcbiAqICAgPGxpIGlkPVwib3B0aW9uXzYxXCIgcm9sZT1cIm9wdGlvblwiPldhdGVybWVsb248L2xpPlxyXG4gKiAgIDxsaSBpZD1cIm9wdGlvbl82M1wiIHJvbGU9XCJvcHRpb25cIj5adWNjaGluPC9saT5cclxuICogXHQ8L3VsPlxyXG4gKiBcclxuICogYGBgaHRtbFxyXG4gKiA8dWwgcm9sZT1cImxpc3Rib3hcIiB0YWJpbmRleD1cIjBcIiBhcmlhLWFjdGl2ZWRlc2NlbmRhbnQ9XCJvcHRpb25fMVwiIGFyaWEtbXVsdGlzZWxlY3RhYmxlPVwidHJ1ZVwiPlxyXG4gKiAgIDxsaSBpZD1cIm9wdGlvbl8yMVwiIHJvbGU9XCJvcHRpb25cIj5FbGRlcmJlcnJ5PC9saT5cclxuICogICAuLi5cclxuICogPHVsPlxyXG4gKiBgYGBcclxuICogXHJcbiAqIEBleHRlbmRzIFJvbGV0eXBlXHJcbiAqIEBmaXJlcyBMaXN0Ym94I2NoYW5nZVxyXG4gKiBAZmlyZXMgTGlzdGJveCNpbnB1dFxyXG4gKi9cclxuY2xhc3MgTGlzdGJveCBleHRlbmRzIFNlbGVjdCB7XHJcblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xyXG5cdFx0c3VwZXIoLi4uYXJncyk7XHJcblxyXG5cdFx0dGhpcy5fLnJlZ2lzdGVyQ3VzdG9tVmFsdWUoXCJsaXN0Ym94LnNpemVcIiwgMSk7XHJcblxyXG5cdFx0dGhpcy5zaXplID0gMTA7XHJcblx0XHQvLyB0aGlzLl9ub2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGlja09uT3B0aW9uLmJpbmQodGhpcykpO1xyXG5cclxuXHRcdC8vIHRoaXMuYWRkS2V5TGlzdGVuZXIoXCJlbnRlclwiLCBjbGlja09uT3B0aW9uLmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyAvIFNldHMgdGhlIHNpemUgb2YgY29udHJvbC5cclxuXHQgKiBAdHlwZSB7SW50ZWdlcn1cclxuXHQgKi9cclxuXHRnZXQgc2l6ZSgpIHsgcmV0dXJuIHRoaXMuXy5saXN0Ym94LnNpemU7IH1cclxuXHRzZXQgc2l6ZSh2YWwpIHtcclxuXHRcdHZhciBzdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuX25vZGUpO1xyXG5cdFx0dGhpcy5fbm9kZS5zdHlsZS5oZWlnaHQgPSBwYXJzZUZsb2F0KHN0eWxlcy5saW5lSGVpZ2h0KSAvIHBhcnNlRmxvYXQoc3R5bGVzLmZvbnRTaXplKSAqIHZhbCArIFwiZW1cIjtcclxuXHRcdHRoaXMuXy5saXN0Ym94LnNpemUgPSB2YWw7XHJcblx0fVxyXG5cclxuXHRtb3ZlZChmcm9tLCB0bykge1xyXG5cdFx0Ly8gdXBkYXRlIHNlbGVjdGVkIG9uIGtleWV2ZW50IHdoZW4gb25seSBvbmUgaXRlbSBjYW4gYmUgc2VsZWN0ZWRcclxuXHRcdGlmICghdGhpcy5tdWx0aXNlbGVjdGFibGUpIHtcclxuXHRcdFx0ZnJvbS5zZWxlY3RlZCA9IHVuZGVmaW5lZDtcclxuXHRcdFx0dG8uc2VsZWN0ZWQgPSBib29sZWFuLnRvZ2dsZSh0by5zZWxlY3RlZCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaXN0Ym94OyIsImltcG9ydCBib29sZWFuIGZyb20gXCIuLy4uL3R5cGUvYm9vbGVhblwiO1xyXG5pbXBvcnQgZ2V0QWN0aXZlIGZyb20gXCIuLy4uL3V0aWxzL2dldEFjdGl2ZVwiO1xyXG5pbXBvcnQgSW5wdXQgZnJvbSBcIi4vYWJzdHJhY3QvSW5wdXRcIjtcclxuXHJcbi8qKlxyXG4gKiBAZXh0ZW5kcyBJbnB1dFxyXG4gKi9cclxuY2xhc3MgT3B0aW9uIGV4dGVuZHMgSW5wdXQge1xyXG5cclxuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XHJcblx0XHRzdXBlciguLi5hcmdzKTtcclxuXHJcblx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKSk7XHJcblx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlcIiwgdGhpcy5vbkNsaWNrLmJpbmQodGhpcyksIHtrZXk6IFwiZW50ZXJcIiwgdGFyZ2V0OiBkb2N1bWVudH0pO1xyXG5cdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwia2V5XCIsIHRoaXMub25DbGljay5iaW5kKHRoaXMpLCB7a2V5OiBcInNwYWNlXCIsIHRhcmdldDogZG9jdW1lbnR9KTtcclxuXHRcdC8vIHRoaXMuYWRkS2V5TGlzdGVuZXIoXCJFbnRlclwiLCBzZWxlY3RJdGVtLmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0b25DbGljayhldikge1xyXG5cdFx0aWYodHlwZW9mIHN1cGVyLm9uQ2xpY2sgPT0gXCJmdW5jdGlvblwiKSBzdXBlci5vbkNsaWNrKGV2KTtcclxuXHRcdGlmKGV2KSBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdGlmICh0aGlzID09IGdldEFjdGl2ZSgpKSB7XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWQgPSBib29sZWFuLnRvZ2dsZSh0aGlzLnNlbGVjdGVkKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9wdGlvbjsiLCJpbXBvcnQgbWl4IGZyb20gXCJAdmVzdGVyZ2FhcmQtY29tcGFueS9qcy1taXhpblwiO1xyXG5pbXBvcnQgQ29tbWFuZCBmcm9tIFwiLi9hYnN0cmFjdC9Db21tYW5kLmpzXCI7XHJcbmltcG9ydCBBcmlhQ2hlY2tlZCBmcm9tIFwiLi4vYXR0cmlidXRlcy9hcmlhLWNoZWNrZWQuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBBIGNoZWNrYWJsZSBpbnB1dCBpbiBhIGdyb3VwIG9mIGVsZW1lbnRzIHdpdGggdGhlIHNhbWUgcm9sZSxcclxuICogb25seSBvbmUgb2Ygd2hpY2ggY2FuIGJlIGNoZWNrZWQgYXQgYSB0aW1lLlxyXG4gKiBcclxuICogIyMjIEV4YW1wbGVzXHJcbiAqIFxyXG4gKiAjIyMjIERlZmF1bHRcclxuICogXHJcbiAqIDxkaXYgcm9sZT1cInJhZGlvXCIgYXJpYS1jaGVja2VkPVwidHJ1ZVwiIHRhYmluZGV4PVwiMFwiPkFwcGxlPC9kaXY+XHJcbiAqIDxkaXYgcm9sZT1cInJhZGlvXCIgYXJpYS1jaGVja2VkPVwiZmFsc2VcIiB0YWJpbmRleD1cIjBcIj5BcHBsZTwvZGl2PlxyXG4gKiBcclxuICogQGV4dGVuZHMgQ29tbWFuZFxyXG4gKiBAbWl4ZXMgQXJpYUNoZWNrZWRcclxuICovXHJcbmNsYXNzIFJhZGlvIGV4dGVuZHMgbWl4KENvbW1hbmQpLndpdGgoQXJpYUNoZWNrZWQpIHt9XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSYWRpbztcclxuIiwiaW1wb3J0IFNlbGVjdCBmcm9tIFwiLi9hYnN0cmFjdC9TZWxlY3QuanNcIjtcclxuXHJcbi8vIGltcG9ydCBSYWRpbyBmcm9tIFwiLi9yYWRpby5qc1wiO1xyXG4vLyBpbXBvcnQge0lTX0FDVElWRSwgSVNfTk9UX0FDVElWRX0gZnJvbSBcIi4vLi4vdXRpbHMvc3RhdGUuanNcIjtcclxuLy8gaW1wb3J0IHtBcmlhT3duc30gZnJvbSBcIi4vLi4vYXR0cmlidXRlcy9hcmlhLW93bnMuanNcIjtcclxuXHJcblxyXG4vKipcclxuICogIyMjIEV4YW1wbGVcclxuICogXHJcbiAqICMjIyMgQmFzaWMgZXhhbXBsZVxyXG4gKiBcclxuICogPGRpdiByb2xlPVwicmFkaW9ncm91cFwiIHRhYmluZGV4PVwiMFwiIGFyaWEtYWN0aXZlZGVzY2VuZGFudD1cInJhZGlvXzFcIj5cclxuICogICA8ZGl2IGlkPVwicmFkaW9fMVwiIHJvbGU9XCJyYWRpb1wiIGFyaWEtY2hlY2tlZD1cInRydWVcIj5BcHBsZTwvZGl2PlxyXG4gKiAgIDxkaXYgaWQ9XCJyYWRpb18yXCIgcm9sZT1cInJhZGlvXCIgYXJpYS1jaGVja2VkPVwiZmFsc2VcIj5HcmFwZWZydWl0PC9kaXY+XHJcbiAqIDwvZGl2PlxyXG4gKiBcclxuICogQGV4dGVuZHMgU2VsZWN0XHJcbiAqL1xyXG5jbGFzcyBSYWRpb2dyb3VwIGV4dGVuZHMgU2VsZWN0IHtcclxuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XHJcblx0XHRzdXBlciguLi5hcmdzKTtcclxuXHJcblx0XHR0aGlzLl9ub2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgdGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdG9uQ2hhbmdlKGV2KSB7XHJcblx0XHRjb25zb2xlLmxvZyhldik7XHJcblx0fVxyXG5cclxuXHRtb3ZlZChmcm9tLCB0bykge1xyXG5cdFx0Ly8gdXBkYXRlIHNlbGVjdGVkIG9uIGtleWV2ZW50IHdoZW4gb25seSBvbmUgaXRlbSBjYW4gYmUgc2VsZWN0ZWRcclxuXHRcdGlmICghdGhpcy5tdWx0aXNlbGVjdGFibGUpIHtcclxuXHRcdFx0ZnJvbS5jaGVja2VkID0gZmFsc2U7XHJcblx0XHRcdHRvLmNoZWNrZWQgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdH1cdFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSYWRpb2dyb3VwOyIsIi8vIHZhciBvYmplY3RQYXRoID0gcmVxdWlyZShcIm9iamVjdC1wYXRoXCIpO1xuaW1wb3J0IFJhbmdlIGZyb20gXCIuL2Fic3RyYWN0L1JhbmdlLmpzXCI7XG5cbmZ1bmN0aW9uIGNhbGNWYWx1ZU9mVHJhY2tQb3MocG9zLCB0cmFjaywgdGh1bWIsIG1pbiwgbWF4LCBzdGVwLCBvcmllbnRhdGlvbikge1xuXHRsZXQgcG9zaXRpb25LZXkgPSBvcmllbnRhdGlvbiA9PSBcInZlcnRpY2FsXCIgPyBcInlcIiA6IFwieFwiO1xuXHRsZXQgcmFuZ2UgPSAobWF4IC0gbWluKSAvIHN0ZXA7XG5cdC8vIHRoZSBmdWxsIHVzYWJsZSBsZW5ndGggb2YgdGhlIHRyYWNrXG5cdGxldCB0cmFja1NpemUgPSBnZXRUcmFja1NpemUodHJhY2ssIHRodW1iLCBvcmllbnRhdGlvbik7XG5cdC8vIGhvdyBtYW55IHBpeGVscyAgc3BhbiBmb3Igb25lIHN0ZXAgY2hhbmdlXG5cdGxldCBweFBlclN0ZXAgPSB0cmFja1NpemUgLyByYW5nZTtcblxuXHQvLyBib3VuZGluZyBib3ggb2YgdGhlIHRyYWNrXG5cdHZhciB0cmFja0Nvb3IgPSB0cmFjay5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0Ly8gb2Zmc2V0IHdpdGhvdXQgdHJhY2sgbGltaXRzXG5cdGxldCBvZmZzZXQgPSBwb3MgLSB0cmFja0Nvb3JbcG9zaXRpb25LZXldIC0gdGh1bWIuY2xpZW50V2lkdGggLyAyO1xuXG5cdC8vIHVwZGF0ZSBvZmZzZXQgdG8gdGhlIHRyYWNrIGxpbWl0cyBpZiBuZWVkZWRcblx0aWYob2Zmc2V0IDwgMCkge1xuXHRcdG9mZnNldCA9IDA7XG5cdH0gZWxzZSBpZihvZmZzZXQgPiB0cmFja1NpemUpe1xuXHRcdG9mZnNldCA9IHRyYWNrU2l6ZTtcblx0fVxuXG5cdC8vIHJvdW5kIHRoZSB2YWx1ZSB0byBuZWFyZXN0IGluY3JlbWVudFxuXHRyZXR1cm4gTWF0aC5yb3VuZChvZmZzZXQgLyBweFBlclN0ZXApICogc3RlcCArIG1pbjtcbn1cblxuZnVuY3Rpb24gZ2V0VHJhY2tTaXplKHRyYWNrLCB0aHVtYiwgb3JpZW50YXRpb24pIHtcblx0aWYob3JpZW50YXRpb24gPT0gXCJ2ZXJ0aWNhbFwiKSB7XG5cdFx0cmV0dXJuIHRyYWNrLmNsaWVudEhlaWdodCAtIHRodW1iLmNsaWVudEhlaWdodDtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gdHJhY2suY2xpZW50V2lkdGggLSB0aHVtYi5jbGllbnRXaWR0aDtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVQb3NpdGlvbih2YWx1ZSwgdHJhY2ssIHRodW1iLCBtaW4sIG1heCwgb3JpZW50YXRpb24pIHtcblx0bGV0IHN0eWxlS2V5ID0gb3JpZW50YXRpb24gPT0gXCJ2ZXJ0aWNhbFwiID8gXCJ0b3BcIiA6IFwibGVmdFwiO1xuXHRsZXQgcmFuZ2UgPSBtYXggLSBtaW47XG5cdGxldCBweFBlclN0ZXAgPSBnZXRUcmFja1NpemUodHJhY2ssIHRodW1iLCBvcmllbnRhdGlvbikgLyByYW5nZTtcblx0dGh1bWIuc3R5bGVbc3R5bGVLZXldID0gcHhQZXJTdGVwICogKHZhbHVlIC0gbWluKSArIFwicHhcIjtcbn1cblxuLyoqXG4gKiBUaGUgc2xpZGVyIGVsZW1lbnQgbGV0IHRoZSB1c2VyIHNwZWNpZnkgYSBudW1lcmljIHZhbHVlIHdoaWNoIG11c3QgYmUgbm8gbGVzc1xuICogdGhhbiBhIGdpdmVuIHZhbHVlLCBhbmQgbm8gbW9yZSB0aGFuIGFub3RoZXIgZ2l2ZW4gdmFsdWUuIFxuICogXG4gKiBUaGUgcHJlY2lzZSB2YWx1ZSxob3dldmVyLCBpcyBub3QgY29uc2lkZXJlZCBpbXBvcnRhbnQuIFRoaXMgaXMgdHlwaWNhbGx5IHJlcHJlc2VudGVkIHVzaW5nIGEgc2xpZGVyIG9yXG4gKiBkaWFsIGNvbnRyb2wgcmF0aGVyIHRoYW4gYSB0ZXh0IGVudHJ5IGJveCBsaWtlIHRoZSBcIm51bWJlclwiIGlucHV0IHR5cGUuIEJlY2F1c2UgdGhpcyBraW5kIG9mIHdpZGdldFxuICogaXMgaW1wcmVjaXNlLCBpdCBzaG91bGRuJ3QgdHlwaWNhbGx5IGJlIHVzZWQgdW5sZXNzIHRoZSBjb250cm9sJ3MgZXhhY3QgdmFsdWUgaXNuJ3QgaW1wb3J0YW50LlxuICpcbiAqICMjIyBFeGFtcGxlc1xuICpcbiAqICMjIyMgQmFzaWMgZXhhbXBsZVxuICogXG4gKiA8ZGl2IGNsYXNzPVwic2xpZGVyLXRyYWNrXCI+XG4gKiAgIDxkaXYgcm9sZT1cInNsaWRlclwiICB0YWJpbmRleD1cIjBcIj48L2Rpdj5cbiAqIDwvZGl2PlxuICogXG4gKiBgYGBodG1sXG4gKiA8ZGl2IGNsYXNzPVwic2xpZGVyLXRyYWNrXCI+XG4gKiAgIDxkaXYgcm9sZT1cInNsaWRlclwiICB0YWJpbmRleD1cIjBcIj48L2Rpdj5cbiAqIDwvZGl2PlxuICogYGBgXG4gKiBcbiAqICMjIyMgQXMgYW4gYnV0dG9uIHdpdGggYSBzcGVjaWZpZWQgc3RlcCBhbmQgcmFuZ2VcbiAqXG4gKiA8ZGl2IGNsYXNzPVwic2xpZGVyLXRyYWNrXCI+XG4gKiAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHJvbGU9XCJzbGlkZXJcIlxuICogXHRcdGFyaWEtdmFsdWVtaW49XCIzMFwiIGFyaWEtdmFsdWVtYXg9XCIzMDBcIiBhcmlhLXZhbHVlbm93PVwiNTBcIiBkYXRhLXN0ZXA9XCIxMFwiPjwvYnV0dG9uPlxuICogPC9kaXY+XG4gKlxuICogYGBgaHRtbFxuICogPGRpdiBjbGFzcz1cInNsaWRlci10cmFja1wiPlxuICogICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiByb2xlPVwic2xpZGVyXCJcbiAqIFx0XHRhcmlhLXZhbHVlbWluPVwiMzBcIiBhcmlhLXZhbHVlbWF4PVwiMzAwXCIgYXJpYS12YWx1ZW5vdz1cIjUwXCIgZGF0YS1zdGVwPVwiMTBcIj48L2J1dHRvbj5cbiAqIDwvZGl2PlxuICogYGBgXG4gKiBcbiAqICMjIyMgVmVydGljYWxcbiAqIFxuICogPGRpdiBjbGFzcz1cInNsaWRlci10cmFjayB2ZXJ0aWNhbFwiPlxuICogICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiByb2xlPVwic2xpZGVyXCIgYXJpYS1vcmllbnRhdGlvbj1cInZlcnRpY2FsXCI+PC9idXR0b24+XG4gKiA8L2Rpdj5cbiAqIFxuICogYGBgaHRtbFxuICogPGRpdiBjbGFzcz1cInNsaWRlci10cmFjayB2ZXJ0aWNhbFwiPlxuICogICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiByb2xlPVwic2xpZGVyXCIgYXJpYS1vcmllbnRhdGlvbj1cInZlcnRpY2FsXCI+PC9idXR0b24+XG4gKiA8L2Rpdj5cbiAqIGBgYFxuICogXG4gKiAjIyMjIERpc2FibGVkXG4gKiBcbiAqIDxkaXYgY2xhc3M9XCJzbGlkZXItdHJhY2tcIj5cbiAqICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgcm9sZT1cInNsaWRlclwiIGFyaWEtZGlzYWJsZWQ9XCJ0cnVlXCI+PC9idXR0b24+XG4gKiA8L2Rpdj5cbiAqIFxuICogYGBgaHRtbFxuICogPGRpdiBjbGFzcz1cInNsaWRlci10cmFja1wiPlxuICogICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiByb2xlPVwic2xpZGVyXCIgYXJpYS1kaXNhYmxlZD1cInRydWVcIj48L2J1dHRvbj5cbiAqIDwvZGl2PlxuICogYGBgXG4gKiBcbiAqIFxuICogQHN1bW1hcnkgQSB1c2VyIGlucHV0IHdoZXJlIHRoZSB1c2VyIHNlbGVjdHMgYSB2YWx1ZSBmcm9tIHdpdGhpbiBhIGdpdmVuIHJhbmdlLlxuICogQGV4dGVuZHMgUmFuZ2VcbiAqXG4gKiBAZmlyZXMgY2hhbmdlXG4gKiBAZmlyZXMgaW5wdXRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFx0XHRcdFx0ZWxlbWVudCB0byBkZXJpdmUgaW5mb3JtYXRpb24gbmFtZUZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gXHRcdFx0XHRcdFx0b3B0aW9uYWwgb3B0aW9uc1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW29wdGlvbnMuc2xpZGVyLnRyYWNrXVxuICogXHRUaGUgZWxlbWVudCB0aGF0IHJlc2VtYmxlcyB0aGUgdHJhY2ssIGRlZmF1bHRzIHRvIHRoZSBlbGVtZW50cyBwYXJlbnRcbiAqIEBwYXJhbSB7TnVtYmVyfFwiYW55XCJ9IFtvcHRpb25zLnN0ZXBdIFx0aW5jcmVhc2UvZGVjcmVhc2UgYW1vdW50XG4gKiBAcmV0dXJuIHtTbGlkZXJ9IHRoaXNBcmdcbiAqXG4gKiBAdG9kbyBhZGQgc3VwcG9ydCBmb3IgXCJhbnlcIlxuICogQHRvZG8gYWRkIGV2ZW50c1xuICovXG5jbGFzcyBTbGlkZXIgZXh0ZW5kcyBSYW5nZSB7XG5cdC8qKlxuXHQgKiBAcGFyYW0geyp9IGFyZ3MgXG5cdCAqL1xuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0c3VwZXIoLi4uYXJncyk7XG5cblx0XHQvLyByZWdpc3RlciBjdXN0b21zXG5cdFx0dGhpcy5fLnJlZ2lzdGVyQ3VzdG9tRWxlbWVudChcInNsaWRlci50cmFja1wiLCB0aGlzLl9ub2RlLnBhcmVudE5vZGUpO1xuXG5cdFx0Ly8gc2V0IGRlZmF1bHRzXG5cdFx0aWYodW5kZWZpbmVkID09IHRoaXMub3JpZW50YXRpb24pIHRoaXMub3JpZW50YXRpb24gPSBcImhvcml6b250YWxcIjtcblx0XHRpZih1bmRlZmluZWQgPT0gdGhpcy52YWx1ZU1pbikge1xuXHRcdFx0LyoqXG5cdFx0XHQgKiBAZGVmYXVsdCBbMF1cblx0XHRcdCAqL1xuXHRcdFx0dGhpcy52YWx1ZU1pbiA9IDA7XG5cdFx0fVxuXHRcdGlmKHVuZGVmaW5lZCA9PSB0aGlzLnZhbHVlTWF4KSB0aGlzLnZhbHVlTWF4ID0gMTAwO1xuXHRcdGlmKHVuZGVmaW5lZCA9PSB0aGlzLnZhbHVlTm93ICYmIHRoaXMudmFsdWVNYXggPCB0aGlzLnZhbHVlTWluKSB7XG5cdFx0XHR0aGlzLnZhbHVlTm93ID0gdGhpcy52YWx1ZU1pbjtcblx0XHR9IGVsc2UgaWYodW5kZWZpbmVkID09IHRoaXMudmFsdWVOb3cpIHtcblx0XHRcdHRoaXMudmFsdWVOb3cgPSB0aGlzLnZhbHVlTWluICsgKHRoaXMudmFsdWVNYXggLSB0aGlzLnZhbHVlTWluKS8yO1xuXHRcdH1cblxuXHRcdHRoaXMuX3VuVHJhY2tNb3VzZUJpbmRlZCA9IHRoaXMuX3VuVHJhY2tNb3VzZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuX3VuVHJhY2tUb3VjaEJpbmRlZCA9IHRoaXMuX3VuVHJhY2tUb3VjaC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuX29uRHJhZyA9IHRoaXMub25EcmFnLmJpbmQodGhpcyk7XG5cblx0XHQvLyB0b2RvOiBhbGxvdyBhdXRvbWF0aWNhbGx5IHNldHRpbmcgdmFsdWVUZXh0IHdpdGggc29tZSBzdWdhclxuXG5cdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLl9vblRvdWNoU3RhcnQuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMuX29uTW91c2VEb3duLmJpbmQodGhpcyksIHsgdGFyZ2V0OiB0aGlzLl8uc2xpZGVyLnRyYWNrfSk7XG5cdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwia2V5XCIsIHRoaXMuc3RlcFVwLmJpbmQodGhpcyksIHsga2V5OiBcInJpZ2h0XCIgfSk7XG5cdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwia2V5XCIsIHRoaXMuc3RlcFVwLmJpbmQodGhpcyksIHsga2V5OiBcInVwXCIgfSk7XG5cdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwia2V5XCIsIHRoaXMuc3RlcERvd24uYmluZCh0aGlzKSwgeyBrZXk6IFwibGVmdFwiIH0pO1xuXHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcImtleVwiLCB0aGlzLnN0ZXBEb3duLmJpbmQodGhpcyksIHsga2V5OiBcImRvd25cIiB9KTtcblxuXHRcdHVwZGF0ZVBvc2l0aW9uKHRoaXMudmFsdWVOb3csIHRoaXMuXy5zbGlkZXIudHJhY2ssIHRoaXMuX25vZGUsIHRoaXMudmFsdWVNaW4sIHRoaXMudmFsdWVNYXgsIHRoaXMub3JpZW50YXRpb24pO1xuXHR9XG5cblx0X29uTW91c2VEb3duKCkge1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5fb25EcmFnKTtcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl91blRyYWNrTW91c2VCaW5kZWQpO1xuXG5cdFx0Ly8gZm9jdXMgdGhlIHRodW1iIHdoZW4gdGhlIHVzZXIgZGlkIGFuIGFjdGlvblxuXHRcdHRoaXMuX25vZGUuZm9jdXMoKTtcblx0fVxuXHRfb25Ub3VjaFN0YXJ0KCkge1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgdGhpcy5fb25EcmFnKTtcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgdGhpcy5fdW5UcmFja1RvdWNoQmluZGVkKTtcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hjYW5jZWxcIiwgdGhpcy5fdW5UcmFja1RvdWNoQmluZGVkKTtcblx0fVxuXHRfdW5UcmFja01vdXNlKCkge1xuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5fb25EcmFnKTtcblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl91blRyYWNrTW91c2VCaW5kZWQpO1xuXG5cdFx0Ly8gZm9jdXMgdGhlIHRodW1iIHdoZW4gdGhlIHVzZXIgZGlkIGFuIGFjdGlvblxuXHRcdHRoaXMuX25vZGUuZm9jdXMoKTtcdFx0XG5cdH1cblx0X3VuVHJhY2tUb3VjaCgpIHtcblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIHRoaXMuX29uRHJhZyk7XG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHRoaXMuX3VuVHJhY2tNb3VzZSk7XG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoY2FuY2VsXCIsIHRoaXMuX3VuVHJhY2tNb3VzZUJpbmRlZCk7XG5cdH1cblxuXHRvbkRyYWcoZXYpIHtcblx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGxldCBwb3M7XG5cdFx0bGV0IHBvc2l0aW9uS2V5ID0gdGhpcy5vcmllbnRhdGlvbiA9PSBcInZlcnRpY2FsXCIgPyBcImNsaWVudFlcIiA6IFwiY2xpZW50WFwiO1xuXHRcdGlmKGV2LmNoYW5nZWRUb3VjaGVzKSB7XG5cdFx0XHRwb3MgPSBldi5jaGFuZ2VkVG91Y2hlc1swXVtwb3NpdGlvbktleV07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHBvcyA9IGV2W3Bvc2l0aW9uS2V5XTtcblx0XHR9XG5cdFx0dGhpcy52YWx1ZU5vdyA9IGNhbGNWYWx1ZU9mVHJhY2tQb3MoXG5cdFx0XHRwb3MsIHRoaXMuXy5zbGlkZXIudHJhY2ssIHRoaXMuX25vZGUsXG5cdFx0XHR0aGlzLnZhbHVlTWluLCB0aGlzLnZhbHVlTWF4LCB0aGlzLl8uc3RlcCwgdGhpcy5vcmllbnRhdGlvblxuXHRcdCk7XG5cdH1cblxuXHRnZXQgdmFsdWVOb3coKSB7IHJldHVybiBzdXBlci52YWx1ZU5vdzsgfVxuXHRzZXQgdmFsdWVOb3codmFsKSB7XG5cdFx0aWYoIXRoaXMuZGlzYWJsZWQpIHtcblx0XHRcdHN1cGVyLnZhbHVlTm93ID0gdmFsO1xuXHRcdFx0dXBkYXRlUG9zaXRpb24odmFsLCB0aGlzLl8uc2xpZGVyLnRyYWNrLCB0aGlzLl9ub2RlLCB0aGlzLnZhbHVlTWluLCB0aGlzLnZhbHVlTWF4LCB0aGlzLm9yaWVudGF0aW9uKTtcblx0XHR9XG5cdH1cblxuXHQvKiBOYXRpdmUgcG9seWZpbGwgKi9cblxuXHQvLyBhdXRvbWF0aWMgcG9seWZpbGxlZCBieSBhdHRyaWJ1dGVzXG5cdC8vIGF1dG9jb21wbGV0ZVxuXHQvLyBsaXN0XG5cdC8vIG1pblxuXHQvLyBtYXhcblx0Ly8gc3RlcCA9PiBkYXRhLXN0ZXBcblx0Ly8gdmFsdWVcblx0Ly8gdmFsdWVBc051bWJlclxuXHQvLyBzdGVwRG93blxuXHQvLyBzdGVwVXBcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2xpZGVyOyIsImltcG9ydCBtaXggZnJvbSBcIkB2ZXN0ZXJnYWFyZC1jb21wYW55L2pzLW1peGluXCI7XHJcbmltcG9ydCBSYW5nZSBmcm9tIFwiLi9hYnN0cmFjdC9SYW5nZVwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IG9wdGlvbnMgPSB7XHJcblx0c2VsZWN0b3I6IFwiW3JvbGU9J3NwaW5idXR0b24nXVwiLFxyXG5cdHJvbGU6IFwic3BpbmJ1dHRvblwiXHJcbn07XHJcblxyXG4vKipcclxuICogQSBpbnB1dCBmaWVsZCB3aXRoIDIgYnV0dG9uIHRvIGluY3JlYXNlIG9yIGRlY3JlYXNlIHRoZSBudW1iZXJpY2FsIHZhbHVlXHJcbiAqIEBleHRlbmRzIFJhbmdlXHJcbiAqXHJcbiAqIEBzZWUge0BsaW5rIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2lucHV0Lmh0bWwjbnVtYmVyLXN0YXRlLSh0eXBlPW51bWJlcil9XHJcbiAqL1xyXG5jbGFzcyBTcGluYnV0dG9uIGV4dGVuZHMgUmFuZ2Uge1xyXG5cdGNvbnN0cnVjdG9yKGVsLCBvcHRpb25zKSB7XHJcblx0XHRzdXBlcihlbCwgb3B0aW9ucyk7XHJcblxyXG5cdFx0Ly8gcmVnaXN0ZXIgY3VzdG9tIGVsZW1lbnRzXHJcblx0XHQvKipcclxuXHRcdCogQG5hbWUgU3BpbmJ1dHRvbiNfXHJcblx0XHQqIEB0eXBlIHtPYmplY3R9XHJcblx0XHQqIEBwcm9wIHtIVE1MRWxlbWVudH0gW3NwaW5idXR0b24udXBdXHJcblx0XHQqIEBwcm9wIHtIVE1MRWxlbWVudH0gW3NwaW5idXR0b24uZG93bl1cclxuXHRcdCovXHJcblx0XHR0aGlzLl8ucmVnaXN0ZXJDdXN0b21FbGVtZW50KFwic3BpbmJ1dHRvbi51cFwiKTtcclxuXHRcdHRoaXMuXy5yZWdpc3RlckN1c3RvbUVsZW1lbnQoXCJzcGluYnV0dG9uLmRvd25cIik7XHJcblx0XHR0aGlzLl8ucmVnaXN0ZXJDdXN0b21WYWx1ZShcInN0ZXBcIiwgMSk7XHJcblxyXG5cdFx0Ly8gc2V0IGRlZmF1bHRzXHJcblx0XHQvKipcclxuXHRcdCogQG5hbWUgU3BpbmJ1dHRvbiN2YWx1ZU5vd1xyXG5cdFx0KiBAdHlwZSB7TnVtYmVyfVxyXG5cdFx0KiBAZGVmYXVsdCBbMF1cclxuXHRcdCovXHJcblx0XHRpZihudWxsID09PSB0aGlzLnZhbHVlTm93KSB0aGlzLnZhbHVlTm93ID0gMDtcclxuXHJcblx0XHQvLyB0b2RvOiBhbGxvdyBhdXRvbWF0aWNhbGx5IHNldHRpbmcgdmFsdWVUZXh0IHdpdGggc29tZSBzdWdhclxyXG5cclxuXHRcdGlmICh0aGlzLl8uc3BpbmJ1dHRvbi5kb3duKSB0aGlzLl8uc3BpbmJ1dHRvbi51cC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5zdGVwVXAuYmluZCh0aGlzKSk7XHJcblx0XHRpZiAodGhpcy5fLnNwaW5idXR0b24uZG93bikgdGhpcy5fLnNwaW5idXR0b24uZG93bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5zdGVwRG93bi5iaW5kKHRoaXMpKTtcclxuXHRcdHRoaXMuYWRkS2V5TGlzdGVuZXIoXCJ1cFwiLCB0aGlzLnN0ZXBVcC5iaW5kKHRoaXMpKTtcclxuXHRcdHRoaXMuYWRkS2V5TGlzdGVuZXIoXCJkb3duXCIsIHRoaXMuc3RlcERvd24uYmluZCh0aGlzKSk7XHJcblx0XHR0aGlzLmVsZW1lbnQudmFsdWUgPSB0aGlzLnZhbHVlTm93O1xyXG5cdH1cclxuXHJcblx0Z2V0IHZhbHVlTm93KCkgeyByZXR1cm4gc3VwZXIudmFsdWVOb3c7IH1cclxuXHRzZXQgdmFsdWVOb3codmFsKSB7XHJcblx0XHRzdXBlci52YWx1ZU5vdyA9IHZhbDtcclxuXHRcdHRoaXMuZWxlbWVudC52YWx1ZSA9IHZhbDtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNwaW5idXR0b247IiwiaW1wb3J0IENoZWNrYm94IGZyb20gXCIuL0NoZWNrYm94XCI7XG5cbi8qKlxuICogQSB0eXBlIG9mIGNoZWNrYm94IHRoYXQgcmVwcmVzZW50cyBvbi9vZmYgdmFsdWVzLCBhcyBvcHBvc2VkIHRvIGNoZWNrZWQvdW5jaGVja2VkIHZhbHVlcy5cbiAqIEBleHRlbmRzIENoZWNrYm94IFxuICovXG5jbGFzcyBTd2l0Y2ggZXh0ZW5kcyBDaGVja2JveCB7XG5cdC8qKlxuXHQgKiAjIyMjIEV4YW1wbGVcblx0ICogXG5cdCAqICoqRGVmYXVsdCoqXG5cdCAqIFxuXHQgKiA8ZGl2IHJvbGU9XCJzd2l0Y2hcIiB0YWJpbmRleD1cIjBcIj48L2Rpdj5cblx0ICogXG5cdCAqIGBgYGh0bWxcblx0ICogPGRpdiByb2xlPVwic3dpdGNoXCIgdGFiaW5kZXg9XCIwXCI+PC9kaXY+XG5cdCAqIGBgYFxuXHQgKiBcblx0ICogKipXaXRoIHByZWRlZmluZWQgdmFsdWUqKlxuXHQgKiBcblx0ICogPGRpdiByb2xlPVwic3dpdGNoXCIgYXJpYS1jaGVja2VkPVwidHJ1ZVwiIHRhYmluZGV4PVwiMFwiPjwvZGl2PlxuXHQgKiBcblx0ICogYGBgaHRtbFxuXHQgKiA8ZGl2IHJvbGU9XCJzd2l0Y2hcIiBhcmlhLWNoZWNrZWQ9XCJ0cnVlXCIgdGFiaW5kZXg9XCIwXCI+PC9kaXY+XG5cdCAqIGBgYFxuXHQgKiBAcGFyYW0geyp9IGFyZ3Ncblx0Ki9cblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdHN1cGVyKC4uLmFyZ3MpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN3aXRjaDtcbiIsImltcG9ydCBtaXggZnJvbSBcIkB2ZXN0ZXJnYWFyZC1jb21wYW55L2pzLW1peGluXCI7XG5cbmltcG9ydCBlbGVtZW50cyBmcm9tIFwiLi8uLi91dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IHNlbGVjdG9yIGZyb20gXCIuLy4uL3V0aWxzL3NlbGVjdG9yXCI7XG5pbXBvcnQgcm9sZXMgZnJvbSBcIi4vLi4vZGF0YS9yb2xlc1wiO1xuXG5pbXBvcnQgUm9sZXR5cGUgZnJvbSBcIi4vYWJzdHJhY3QvUm9sZXR5cGVcIjtcblxuaW1wb3J0IEFyaWFTZWxlY3RlZCBmcm9tIFwiLi8uLi9hdHRyaWJ1dGVzL2FyaWEtc2VsZWN0ZWRcIjtcblxuY2xhc3MgVGFiIGV4dGVuZHMgbWl4KFJvbGV0eXBlKS53aXRoKEFyaWFTZWxlY3RlZCkge1xuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0c3VwZXIoLi4uYXJncyk7XG5cdH1cblxuXHRvblNlbGVjdChldikge1xuXHRcdC8vIGdldHMgdGhlIHNlbGVjdG9yIGZvciBmaW5kaW5nIGl0J3MgY29udGV4dCBlbGVtZW50ICh0YWJsaXN0ID4gdGFiKSBcblx0XHR2YXIgY29udGV4dFNlbGVjdG9yID0gcm9sZXMudGFiLmNvbnRleHQubWFwKHN0ciA9PiBzZWxlY3Rvci5nZXRSb2xlKHN0cikpLmpvaW4oXCIsIFwiKTtcblx0XHRsZXQgdGFibGlzdCA9IGVsZW1lbnRzLmdldFBhcmVudCh0aGlzLCBjb250ZXh0U2VsZWN0b3IpO1xuXHRcdGlmKCF0YWJsaXN0KSByZXR1cm4gZmFsc2U7XG5cdFx0XG5cdFx0ZXYucHJldmVudERlZmF1bHQoKTtcblx0XHRcblx0XHRsZXQgdGFicyA9IHRhYmxpc3QuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKG9wdGlvbnMuc2VsZWN0b3IgKyBcIlthcmlhLXNlbGVjdGVkPSd0cnVlJ11cIik7XG5cdFx0W10uZm9yRWFjaC5jYWxsKHRhYnMsIChpdGVtKSA9PiB7XG5cdFx0XHRsZXQgaW5zdCA9IGVsZW1lbnRzLmdldChpdGVtKTtcblx0XHRcdGluc3Quc2VsZWN0ZWQgPSBmYWxzZTtcblx0XHRcdGluc3QuY29udHJvbHNbMF0uZWxlbWVudC5oaWRkZW4gPSB0cnVlO1xuXHRcdH0pO1xuXG5cdFx0aWYgKHR5cGVvZiBzdXBlci5vblNlbGVjdCA9PSBcImZ1bmN0aW9uXCIpIHN1cGVyLm9uU2VsZWN0KGV2KTtcblx0XHRcblx0XHR0aGlzLmNvbnRyb2xzWzBdLmVsZW1lbnQuaGlkZGVuID0gZmFsc2U7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFiOyIsImltcG9ydCBlbGVtZW50cyBmcm9tIFwiLi8uLi91dGlscy9lbGVtZW50cy5qc1wiO1xyXG5pbXBvcnQgQ29tcG9zaXRlIGZyb20gXCIuL2Fic3RyYWN0L0NvbXBvc2l0ZVwiO1xyXG5cclxuY2xhc3MgVGFibGlzdCBleHRlbmRzIENvbXBvc2l0ZSB7XHJcblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xyXG5cdFx0c3VwZXIoLi4uYXJncyk7XHJcblxyXG5cdFx0dGhpcy5hZGRLZXlMaXN0ZW5lcihcImxlZnRcIiwgdGhpcy5tb3ZlVG9QcmV2LmJpbmQodGhpcykpO1xyXG5cdFx0dGhpcy5hZGRLZXlMaXN0ZW5lcihcInJpZ2h0XCIsIHRoaXMubW92ZVRvTmV4dC5iaW5kKHRoaXMpKTtcclxuXHRcdHRoaXMuYWRkS2V5TGlzdGVuZXIoXCJob21lXCIsIHRoaXMubW92ZVRvU3RhcnQuYmluZCh0aGlzKSk7XHJcblx0XHR0aGlzLmFkZEtleUxpc3RlbmVyKFwiZW5kXCIsIHRoaXMubW92ZVRvRW5kLmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0bW92ZVRvUHJldihldikge1xyXG5cdFx0bGV0IHByZXZJbnN0YW5jZSA9IGVsZW1lbnRzLmdldFByZXYoZWxlbWVudHMuZ2V0KGV2LnRhcmdldCksIHRoaXMsIG9wdGlvbnMub3ducyk7XHJcblx0XHRwcmV2SW5zdGFuY2UuZWxlbWVudC5mb2N1cygpO1xyXG5cdFx0ZXYucHJldmVudERlZmF1bHQoKTtcclxuXHR9XHJcblx0bW92ZVRvTmV4dChldikge1xyXG5cdFx0bGV0IG5leHRJbnN0YW5jZSA9IGVsZW1lbnRzLmdldE5leHQoZWxlbWVudHMuZ2V0KGV2LnRhcmdldCksIHRoaXMsIG9wdGlvbnMub3ducyk7XHJcblx0XHRuZXh0SW5zdGFuY2UuZWxlbWVudC5mb2N1cygpO1xyXG5cdFx0ZXYucHJldmVudERlZmF1bHQoKTtcclxuXHR9XHJcblxyXG5cdG1vdmVUb1N0YXJ0KGV2KSB7XHJcblx0XHRsZXQgZmlyc3RJbnN0YW5jZSA9IGVsZW1lbnRzLmdldFN0YXJ0KGVsZW1lbnRzLmdldChldi50YXJnZXQpLCB0aGlzLCBvcHRpb25zLm93bnMpO1xyXG5cdFx0Zmlyc3RJbnN0YW5jZS5lbGVtZW50LmZvY3VzKCk7XHJcblx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdH1cclxuXHJcblx0bW92ZVRvRW5kKGV2KSB7XHJcblx0XHRsZXQgbGFzdEluc3RhbmNlID0gZWxlbWVudHMuZ2V0RW5kKGVsZW1lbnRzLmdldChldi50YXJnZXQpLCB0aGlzLCBvcHRpb25zLm93bnMpO1xyXG5cdFx0bGFzdEluc3RhbmNlLmVsZW1lbnQuZm9jdXMoKTtcclxuXHRcdGV2LnByZXZlbnREZWZhdWx0KCk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUYWJsaXN0OyIsImltcG9ydCBTZWN0aW9uIGZyb20gXCIuL2Fic3RyYWN0L1NlY3Rpb25cIjtcclxuXHJcbmNsYXNzIFRhYnBhbmVsIGV4dGVuZHMgU2VjdGlvbiB7IH1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRhYnBhbmVsOyIsImltcG9ydCBtaXggZnJvbSBcIkB2ZXN0ZXJnYWFyZC1jb21wYW55L2pzLW1peGluXCI7XG5cbmltcG9ydCBJbnB1dCBmcm9tIFwiLi9hYnN0cmFjdC9JbnB1dFwiO1xuaW1wb3J0IFNlbGVjdGlvbiBmcm9tIFwiLi8uLi9taXhpbnMvU2VsZWN0aW9uXCI7XG5cbi8qKlxuICogIyMjIEV4YW1wbGVzXG4gKlxuICogIyMjIyBCYXNpYyBleGFtcGxlXG4gKiAgIFxuICogPGRpdiByb2xlPSd0ZXh0Ym94JyBjb250ZW50ZWRpdGFibGU+PC9kaXY+XG4gKiBcbiAqIGBgYGh0bWxcbiAqIDxkaXYgcm9sZT0ndGV4dGJveCcgY29udGVudGVkaXRhYmxlPjwvZGl2PlxuICogYGBgXG4gKiBcbiAqIC0tLVxuICogXG4gKiAjIyMjIE11bHRpbGluZSBleGFtcGxlXG4gKiBcbiAqIDxkaXYgcm9sZT0ndGV4dGJveCcgY29udGVudGVkaXRhYmxlIGFyaWEtbXVsdGlsaW5lPVwidHJ1ZVwiPjwvZGl2PlxuICogXG4gKiBgYGBodG1sXG4gKiA8ZGl2IHJvbGU9J3RleHRib3gnIGNvbnRlbnRlZGl0YWJsZSBhcmlhLW11bHRpbGluZT1cInRydWVcIj48L2Rpdj5cbiAqIGBgYFxuICogXG4gKiBAc3VtbWFyeSBBIHR5cGUgb2YgaW5wdXQgdGhhdCBhbGxvd3MgZnJlZS1mb3JtIHRleHQgYXMgaXRzIHZhbHVlLlxuICogQGV4dGVuZHMgSW5wdXRcbiAqIEBtaXhlcyBTZWxlY3Rpb25cbiAqIEB0b2RvIEFkZCBvcHRpb25zIHRvIGtlZXAgb3IgcmVtb3ZlIHBhc3RlZCBzdHlsaW5nXG4gKi9cbmNsYXNzIFRleHRib3ggZXh0ZW5kcyBtaXgoSW5wdXQpLndpdGgoU2VsZWN0aW9uKSB7XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7Kn0gYXJnc1xuXHQgKi9cblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdHN1cGVyKC4uLmFyZ3MpO1xuXG5cdFx0dGhpcy5fLnJlZ2lzdGVyQ3VzdG9tVmFsdWUoXCJ0ZXh0Ym94Lm1pbmxlbmd0aFwiKTtcblx0XHR0aGlzLl8ucmVnaXN0ZXJDdXN0b21WYWx1ZShcInRleHRib3gubWF4bGVuZ3RoXCIpO1xuXHRcdHRoaXMuXy5yZWdpc3RlckN1c3RvbVZhbHVlKFwidGV4dGJveC5zaXplXCIpO1xuXG5cdFx0aWYoIXRoaXMubXVsdGlsaW5lKSB7XG5cdFx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlcIiwgdGhpcy5fb25FbnRlci5iaW5kKHRoaXMpLCB7IGtleTogXCJlbnRlclwiIH0pO1xuXHRcdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwicGFzdGVcIiwgdGhpcy5fb25QYXN0ZS5iaW5kKHRoaXMpKTtcblx0XHR9XG5cdH1cblxuXHRfb25FbnRlcihldikge1xuXHRcdGV2LnByZXZlbnREZWZhdWx0KCk7XG5cdH1cblxuXHRfb25QYXN0ZShldikge1xuXHRcdGV2LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0bGV0IHN0cjtcblx0XHRsZXQgZGF0YSA9IGV2LmNsaXBib2FyZERhdGEuZ2V0RGF0YShcInRleHQvcGxhaW5cIikucmVwbGFjZSgvXFxyP1xcbnxcXHIvZywgXCJcIik7XG5cdFx0bGV0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblxuXHRcdHZhciBjID0gdGhpcy5fbm9kZS5jaGlsZE5vZGVzO1xuXHRcdHZhciBhID0gc2VsLmFuY2hvck5vZGU7XG5cblx0XHRpZiAoYyAmJiBhICYmIEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoYywgYSkgPiAtMSkge1xuXHRcdFx0c3RyID0gW3RoaXMuX25vZGUuaW5uZXJUZXh0LnNsaWNlKDAsIHNlbC5hbmNob3JPZmZzZXQpLCBkYXRhLCB0aGlzLl9ub2RlLmlubmVyVGV4dC5zbGljZShzZWwuZm9jdXNPZmZzZXQpXTtcblx0XHRcdHN0ciA9IHN0ci5qb2luKFwiXCIpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHIgPSB0aGlzLl9ub2RlLmlubmVyVGV4dCArIGRhdGE7XG5cdFx0fVxuXG5cdFx0dGhpcy5fbm9kZS5pbm5lclRleHQgPSBzdHI7XG5cdH1cblxuXHRfb25DaGlsZExpc3RNdXRhdGlvbihtdXRhdGlvbikge1xuXHRcdGlmICghdGhpcy5tdWx0aWxpbmUpIHtcblx0XHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwobXV0YXRpb24uYWRkZWROb2RlcywgbiA9PiB7XG5cdFx0XHRcdGlmIChuLm5vZGVOYW1lICE9PSBcIiN0ZXh0XCIpIHtcblx0XHRcdFx0XHR2YXIgbmV3Q2hpbGQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShuLmlubmVyVGV4dCk7XG5cdFx0XHRcdFx0bi5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdDaGlsZCwgbik7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdC8qIE5hdGl2ZSBwb2x5ZmlsbCAgKi9cblx0XG5cdC8vIGF1dG9jb21wbGV0ZVxuXHQvLyBkaXJuYW1lXG5cdC8vIGxpc3Rcblx0Ly8gbWF4bGVuZ3RoXG5cdC8vIG1pbmxlbmd0aFxuXHQvLyBwYXR0ZXJuXG5cdC8vIHBsYWNlaG9sZGVyXG5cdC8vIHJlYWRvbmx5XG5cdC8vIHJlcXVpcmVkXG5cdC8vIHNpemVcblx0Ly8gdmFsdWVcblx0Ly8gbGlzdFxuXHQvLyBzZWxlY3Rpb24gYXBpXG5cblx0Ly8gbmFtZVx0c3RyaW5nOiBSZXR1cm5zIC8gU2V0cyB0aGUgZWxlbWVudCdzIG5hbWUgYXR0cmlidXRlLCBjb250YWluaW5nIGEgbmFtZSB0aGF0IGlkZW50aWZpZXMgdGhlIGVsZW1lbnQgd2hlbiBzdWJtaXR0aW5nIHRoZSBmb3JtLlxuXHQvLyB0eXBlIHN0cmluZzogUmV0dXJucyAvIFNldHMgdGhlIGVsZW1lbnQncyB0eXBlIGF0dHJpYnV0ZSwgaW5kaWNhdGluZyB0aGUgdHlwZSBvZiBjb250cm9sIHRvIGRpc3BsYXkuIFNlZSB0eXBlIGF0dHJpYnV0ZSBvZiA8aW5wdXQ+IGZvciBwb3NzaWJsZSB2YWx1ZXMuXG5cdC8vIGF1dG9mb2N1c1x0Ym9vbGVhbjogUmV0dXJucyAvIFNldHMgdGhlIGVsZW1lbnQncyBhdXRvZm9jdXMgYXR0cmlidXRlLCB3aGljaCBzcGVjaWZpZXMgdGhhdCBhIGZvcm0gY29udHJvbCBzaG91bGQgaGF2ZSBpbnB1dCBmb2N1cyB3aGVuIHRoZSBwYWdlIGxvYWRzLCB1bmxlc3MgdGhlIHVzZXIgb3ZlcnJpZGVzIGl0LCBmb3IgZXhhbXBsZSBieSB0eXBpbmcgaW4gYSBkaWZmZXJlbnQgY29udHJvbC4gT25seSBvbmUgZm9ybSBlbGVtZW50IGluIGEgZG9jdW1lbnQgY2FuIGhhdmUgdGhlIGF1dG9mb2N1cyBhdHRyaWJ1dGUuIEl0IGNhbm5vdCBiZSBhcHBsaWVkIGlmIHRoZSB0eXBlIGF0dHJpYnV0ZSBpcyBzZXQgdG8gaGlkZGVuICh0aGF0IGlzLCB5b3UgY2Fubm90IGF1dG9tYXRpY2FsbHkgc2V0IGZvY3VzIHRvIGEgaGlkZGVuIGNvbnRyb2wpLlxuXHRcblx0LyoqXG5cdCAqIFJldHVybnMgLyBTZXRzIHRoZSBjdXJyZW50IHZhbHVlIG9mIHRoZSB0ZXh0Ym94LlxuXHQgKiBAdHlwZSB7U3RyaW5nfVxuXHQgKi9cblx0Z2V0IHZhbHVlKCkgeyByZXR1cm4gdGhpcy5fbm9kZS5pbm5lclRleHQ7IH1cblx0c2V0IHZhbHVlKHN0cikgeyB0aGlzLl9ub2RlLmlubmVyVGV4dCA9IHN0cjsgfVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIC8gU2V0cyB0aGUgbWlubXVtIGxlbmd0aCBvZiBjaGFyYWN0ZXJzXG5cdCAqIEB0eXBlIHtJbnRlZ2VyfVxuXHQgKi9cblx0Z2V0IG1pbkxlbmd0aCgpIHsgcmV0dXJuIHRoaXMuXy50ZXh0Ym94Lm1pbmxlbmd0aDsgfVxuXHRzZXQgbWluTGVuZ3RoKG51bSkgeyB0aGlzLl8udGV4dGJveC5taW5sZW5ndGggPSBudW07IH1cblxuXHQvKipcblx0ICogUmV0dXJucyAvIFNldHMgdGhlIG1heGltdW0gbGVuZ3RoIG9mIGNoYXJhY3RlcnNcblx0ICogQHR5cGUge0ludGVnZXJ9XG5cdCAqL1xuXHRnZXQgbWF4TGVuZ3RoKCkgeyByZXR1cm4gdGhpcy5fLnRleHRib3gubWF4bGVuZ3RoOyB9XG5cdHNldCBtYXhMZW5ndGgobnVtKSB7IHRoaXMuXy50ZXh0Ym94Lm1heGxlbmd0aCA9IG51bTsgfVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIC8gU2V0cyB0aGUgc2l6ZSBvZiBjb250cm9sLlxuXHQgKiBAdHlwZSB7SW50ZWdlcn1cblx0ICovXG5cdGdldCBzaXplKCkgeyByZXR1cm4gdGhpcy5fLnRleHRib3guc2l6ZTsgfVxuXHRzZXQgc2l6ZSh2YWwpIHtcblx0XHR0aGlzLl9ub2RlLnN0eWxlLndpZHRoID0gMi4xNiArIDAuNDggKiB2YWwgKyBcImVtXCI7XG5cdFx0dGhpcy5fLnRleHRib3guc2l6ZSA9IHZhbDtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBUZXh0Ym94OyIsImltcG9ydCBXaWRnZXQgZnJvbSBcIi4vV2lkZ2V0XCI7XHJcblxyXG4vKipcclxuICogQGV4dGVuZHMgV2lkZ2V0XHJcbiAqIEBhYnN0cmFjdFxyXG4gKi9cclxuY2xhc3MgQ29tbWFuZCBleHRlbmRzIFdpZGdldCB7fVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29tbWFuZDsiLCJpbXBvcnQgV2lkZ2V0IGZyb20gXCIuL1dpZGdldFwiO1xyXG5cclxuLyoqXHJcbiAqIEBleHRlbmRzIFdpZGdldFxyXG4gKiBAYWJzdHJhY3RcclxuICovXHJcbmNsYXNzIENvbXBvc2l0ZSBleHRlbmRzIFdpZGdldCB7IH1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbXBvc2l0ZTsiLCJpbXBvcnQgbWl4IGZyb20gXCJAdmVzdGVyZ2FhcmQtY29tcGFueS9qcy1taXhpblwiO1xuXG5pbXBvcnQgc2VsZWN0b3IgZnJvbSBcIi4vLi4vLi4vdXRpbHMvc2VsZWN0b3JcIjtcbmltcG9ydCBlbGVtZW50cyBmcm9tIFwiLi8uLi8uLi91dGlscy9lbGVtZW50c1wiO1xuXG5pbXBvcnQgV2lkZ2V0IGZyb20gXCIuL1dpZGdldFwiO1xuaW1wb3J0IFZhbGlkYXRpb24gZnJvbSBcIi4vLi4vLi4vbWl4aW5zL1ZhbGlkYXRpb25cIjtcblxuLyoqXG4gKiBAZXh0ZW5kcyBXaWRnZXRcbiAqIEBtaXhlcyBWYWxpZGF0aW9uXG4gKiBAYWJzdHJhY3RcbiAqL1xuY2xhc3MgSW5wdXQgZXh0ZW5kcyBtaXgoV2lkZ2V0KS53aXRoKFZhbGlkYXRpb24pIHtcblx0LyoqXG5cdCAqIEBhbGlhcyBJbnB1dDpjb25zdHJ1Y3RvclxuIFx0ICogQHBhcmFtIHtSZWdleH0gW29wdGlvbnMuaW5wdXQucGF0dGVybl0gUmVnZXggdG8gY2hlY2sgYWdhaW5zdCB3aGVuIHZhbGlkYXRpbmdcblx0ICovXG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRzdXBlciguLi5hcmdzKTtcblxuXHRcdHRoaXMuXy5yZWdpc3RlckN1c3RvbUVsZW1lbnQoXCJpbnB1dC5wYXR0ZXJuXCIpO1xuXHR9XG5cblx0LyogUG9seWZpbGwgb2YgbmF0aXZlIHByb3BlcnRpZXMgKi9cblxuXHQvKipcblx0ICogUmV0dXJucyBhIHJlZmVyZW5jZSB0byB0aGUgcGFyZW50IGZvcm0gZWxlbWVudFxuXHQgKiBAcmV0dXJucyB7QWNjZXNzaWJsZU5vZGV9IHtAbGluayBGb3JtfVxuXHQgKi9cblx0Z2V0IGZvcm0oKSB7XG5cdFx0cmV0dXJuIGVsZW1lbnRzLmdldFBhcmVudCh0aGlzLCBzZWxlY3Rvci5nZXREZWVwKFwiZm9ybVwiKSk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCBwb2ludGVkIGJ5IHRoZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjY29udHJvbHN9IHByb3BlcnR5LlxuXHQgKiBUaGUgcHJvcGVydHkgbWF5IGJlIG51bGwgaWYgbm8gSFRNTCBlbGVtZW50IGZvdW5kIGluIHRoZSBzYW1lIHRyZWUuXG5cdCAqIEByZXR1cm5zIHtBY2Nlc3NpYmxlTm9kZX0ge0BsaW5rIExpc3Rib3h9XG5cdCAqL1xuXHRnZXQgbGlzdCgpIHtcblx0XHRyZXR1cm4gdGhpcy5jb250cm9scy5maW5kKGF5ID0+IGF5LmVsZW1lbnQubWF0Y2hlcyhzZWxlY3Rvci5nZXQoXCJsaXN0Ym94XCIpKSk7XG5cdH1cblxuXHQvLyBmb3JtQWN0aW9uXHRzdHJpbmc6IFJldHVybnMgLyBTZXRzIHRoZSBlbGVtZW50J3MgZm9ybWFjdGlvbiBhdHRyaWJ1dGUsY29udGFpbmluZyB0aGUgVVJJIG9mIGFcblx0Ly8gcHJvZ3JhbSB0aGF0IHByb2Nlc3NlcyBpbmZvcm1hdGlvbiBzdWJtaXR0ZWQgYnkgdGhlIGVsZW1lbnQuIFRoaXMgb3ZlcnJpZGVzIHRoZSBhY3Rpb24gYXR0cmlidXRlXG5cdC8vIG9mIHRoZSBwYXJlbnQgZm9ybS5cblxuXHQvLyBmb3JtRW5jVHlwZVx0c3RyaW5nOiBSZXR1cm5zIC8gU2V0cyB0aGUgZWxlbWVudCdzIGZvcm1lbmN0eXBlIGF0dHJpYnV0ZSwgY29udGFpbmluZyB0aGUgdHlwZSBvZlxuXHQvLyBjb250ZW50IHRoYXQgaXMgdXNlZCB0byBzdWJtaXQgdGhlIGZvcm0gdG8gdGhlIHNlcnZlci4gVGhpcyBvdmVycmlkZXMgdGhlIGVuY3R5cGUgYXR0cmlidXRlIG9mIFxuXHQvLyB0aGUgcGFyZW50IGZvcm0uXG5cdFxuXHQvLyBmb3JtTWV0aG9kXHRzdHJpbmc6IFJldHVybnMgLyBTZXRzIHRoZSBlbGVtZW50J3MgZm9ybW1ldGhvZCBhdHRyaWJ1dGUsIGNvbnRhaW5pbmcgdGhlIEhUVFAgbWV0aG9kXG5cdC8vIHRoYXQgdGhlIGJyb3dzZXIgdXNlcyB0byBzdWJtaXQgdGhlIGZvcm0uIFRoaXMgb3ZlcnJpZGVzIHRoZSBtZXRob2QgYXR0cmlidXRlIG9mIHRoZSBwYXJlbnQgZm9ybS5cblxuXHQvLyBmb3JtTm9WYWxpZGF0ZVx0Ym9vbGVhbjogUmV0dXJucyAvIFNldHMgdGhlIGVsZW1lbnQncyBmb3Jtbm92YWxpZGF0ZSBhdHRyaWJ1dGUsIGluZGljYXRpbmcgdGhhdFxuXHQvLyB0aGUgZm9ybSBpcyBub3QgdG8gYmUgdmFsaWRhdGVkIHdoZW4gaXQgaXMgc3VibWl0dGVkLiBUaGlzIG92ZXJyaWRlcyB0aGUgbm92YWxpZGF0ZSBhdHRyaWJ1dGVcblx0Ly8gb2YgdGhlIHBhcmVudCBmb3JtLlxuXG5cdC8vIGZvcm1UYXJnZXRcdHN0cmluZzogUmV0dXJucyAvIFNldHMgdGhlIGVsZW1lbnQncyBmb3JtdGFyZ2V0IGF0dHJpYnV0ZSwgY29udGFpbmluZyBhIG5hbWUgb3Jcblx0Ly8ga2V5d29yZCBpbmRpY2F0aW5nIHdoZXJlIHRvIGRpc3BsYXkgdGhlIHJlc3BvbnNlIHRoYXQgaXMgcmVjZWl2ZWQgYWZ0ZXIgc3VibWl0dGluZyB0aGUgZm9ybS5cblx0Ly8gVGhpcyBvdmVycmlkZXMgdGhlIHRhcmdldCBhdHRyaWJ1dGUgb2YgdGhlIHBhcmVudCBmb3JtLlxufVxuXG5leHBvcnQgZGVmYXVsdCBJbnB1dDtcbiIsImltcG9ydCBTZWN0aW9uIGZyb20gXCIuL1NlY3Rpb25cIjtcclxuXHJcbi8qKlxyXG4gKiBAZXh0ZW5kcyBTZWN0aW9uXHJcbiAqL1xyXG5jbGFzcyBMYW5kbWFyayBleHRlbmRzIFNlY3Rpb24geyB9XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMYW5kbWFyazsiLCJpbXBvcnQgV2lkZ2V0IGZyb20gXCIuL1dpZGdldFwiO1xuXG4vKipcbiAqICoqKEFic3RyYWN0IHJvbGUpIFNIT1VMRCBOT1QgVVNFRCBJTiBUSEUgRE9NKiogXG4gKiBBbiBpbnB1dCByZXByZXNlbnRpbmcgYSByYW5nZSBvZiB2YWx1ZXMgdGhhdCBjYW4gYmUgc2V0IGJ5IHRoZSB1c2VyLlxuICpcbiAqIEBjbGFzc1xuICogQGV4dGVuZHMgV2lkZ2V0XG4gKiBAcmV0dXJuIHtSYW5nZX0gdGhpc1xuICogQHNlZSB7QGxpbmsgaHR0cHM6Ly93M2MuZ2l0aHViLmlvL2FyaWEvYXJpYS9hcmlhLmh0bWwjcmFuZ2V9XG4gKi9cbmNsYXNzIFJhbmdlIGV4dGVuZHMgV2lkZ2V0IHtcblx0LyoqXG5cdCAqIEBhbGlhcyBtb2R1bGU6UmFuZ2UtY29uc3Rcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBcdFx0XHRcdGVsZW1lbnQgdG8gZGVyaXZlIGluZm9ybWF0aW9uIG5hbWVGcm9tXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gXHRcdFx0XHRcdFx0b3B0aW9uYWwgb3B0aW9uc1xuIFx0ICogQHBhcmFtIHtOdW1iZXJ8XCJhbnlcIn0gb3B0aW9ucy5zdGVwIFx0aW5jcmVhc2UvZGVjcmVhc2UgdmFsdWUgdXNlZFxuXHQgKi9cblx0Y29uc3RydWN0b3IoLi4uYXJnKSB7XG5cdFx0c3VwZXIoLi4uYXJnKTtcblxuXHRcdC8qKlxuXHQgICAqIEBuYW1lIFJhbmdlI19cblx0XHQgKiBAdHlwZSB7T2JqZWN0fVxuXHRcdCAqIEBwcm9wIHtOdW1iZXJ9IFtzdGVwPTFdXG5cdCAgICovXG5cblx0XHR0aGlzLl8ucmVnaXN0ZXJDdXN0b21WYWx1ZShcInN0ZXBcIiwgMSk7XG5cdH1cblxuXHQvKipcblx0ICogUGFzc3Ryb3VnaCBvZiBhbiBzdHJpbmdpZmllZCBgdmFsdWVOb3dgXG5cdCAqIEB0eXBlIHtTdHJpbmd9XG5cdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI3ZhbHVlTm93fVxuXHQgKi9cblx0Z2V0IHZhbHVlKCkgeyByZXR1cm4gdGhpcy52YWx1ZU5vdy50b1N0cmluZygpO31cblx0c2V0IHZhbHVlKHZhbCkgeyB0aGlzLnZhbHVlTm93ID0gdmFsOyB9XG5cblx0LyoqXG5cdCAqIFByb3h5IG9mIHRoZSBgdmFsdWVOb3dgIHZhbHVlXG5cdCAqIEB0eXBlIHtOdW1iZXJ9XG5cdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI3ZhbHVlTm93fVxuXHQgKi9cblx0Z2V0IHZhbHVlQXNOdW1iZXIoKSB7IHJldHVybiB0aGlzLnZhbHVlTm93OyB9XG5cdHNldCB2YWx1ZUFzTnVtYmVyKHZhbCkgeyB0aGlzLnZhbHVlTm93ID0gdmFsOyB9XG5cblx0LyoqXG4gICAqIERlY3JlYXNlIHRoZSB2YWx1ZSB3aXRoIHRoZSBhbW91bnQgb2YgMSBzdGVwXG4gICAqIEBwYXJhbSAge0V2ZW50fSBldiBFdmVudCB3aGVuIHRyaWdnZXJlZCB0aHJvdWdoIGFuIGVsZW1lbnRzXG4gICAqL1xuXHRzdGVwRG93bihldikge1xuXHRcdGlmKHRoaXMuZGlzYWJsZWQpIHJldHVybjtcblx0XHRpZihldikgZXYucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGlmKHRoaXMudmFsdWVNaW4gPT09IG51bGwgfHwgdGhpcy52YWx1ZU5vdyA+IHRoaXMudmFsdWVNaW4pIHtcblx0XHRcdHRoaXMudmFsdWVOb3cgPSB0aGlzLnZhbHVlTm93IC0gTnVtYmVyKHRoaXMuXy5zdGVwKTtcblx0XHR9XG5cdH1cblxuXHQvKipcbiAgICogSW5jcmVhc2UgdGhlIHZhbHVlIHdpdGggdGhlIGFtb3VudCBvZiAxIHN0ZXBcbiAgICogQHBhY2thZ2VcbiAgICogQHBhcmFtICB7RXZlbnR9IGV2IEV2ZW50IHdoZW4gdHJpZ2dlcmVkIHRocm91Z2ggYW4gZWxlbWVudHNcbiAgICovXG5cdHN0ZXBVcChldikge1xuXHRcdGlmKHRoaXMuZGlzYWJsZWQpIHJldHVybjtcblx0XHRpZihldikgZXYucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGlmKHRoaXMudmFsdWVNYXggPT09IG51bGwgfHwgdGhpcy52YWx1ZU5vdyA8IHRoaXMudmFsdWVNYXgpIHtcblx0XHRcdHRoaXMudmFsdWVOb3cgPSB0aGlzLnZhbHVlTm93ICsgTnVtYmVyKHRoaXMuXy5zdGVwKTtcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmFuZ2U7IiwiaW1wb3J0IEFjY2Vzc2libGVOb2RlIGZyb20gXCJhb21qcy9zcmMvQWNjZXNzaWJsZU5vZGUuanNcIjtcclxuXHJcbmNvbnN0IE1vdXNldHJhcCA9IHJlcXVpcmUoXCJtb3VzZXRyYXBcIik7XHJcbmltcG9ydCBvYmplY3RQYXRoIGZyb20gXCJvYmplY3QtcGF0aFwiO1xyXG5cclxuLy8gRXZlbnQgbmFtZXMgdGhhdCBhcmUgb25seSBpbnNpZGUgdGhlIGxpYmFyeVxyXG52YXIgY3VzdG9tRXZlbnRzID0gW1wia2V5XCIsIFwiYXR0cmlidXRlc1wiLCBcImNoYXJhY3RlckRhdGFcIiwgXCJjaGlsZGxpc3RcIiwgXCJsYWJlbFwiXTtcclxuXHJcbmxldCBpc0Z1bmN0aW9uID0gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iaiA9PSBcImZ1bmN0aW9uXCIgfHwgZmFsc2U7IH07XHJcblxyXG4vKipcclxuICogUmVnaXN0ZXIgZXh0cmEgZWxlbWVudHMgdXNlZCBmb3Igc29tZSByb2xlcyxcclxuICogZS5nLiB0aGUgdXAgYW5kIGRvd24gYXJyb3dzIHdpdGggdGhlIHNwaW5idXR0b24gcm9sZVxyXG4gKlxyXG4gKiBQYXRoIG9mIGltcG9ydGFuY2Ugd2hlcmUgdGhlIGVsZW1lbnQgaXMgcmVjZWl2ZWQgZnJvbTpcclxuICogMS4gbmV3IC4uLiguLi4sIHtlbGVtZW50czogeyByb2xlTmFtZTogeyBzdHI6IGluc3RhbmNlIG9mIEhUTUxFbGVtZW50IH19fSlcclxuICogMi4gW2RhdGEtcm9sZU5hbWUtc3RyPWlkXSBvbiB0aGUgZWxlbWVudCB3aXRoIHRoZSByb2xlXHJcbiAqIDMuIGRlZmF1bHQgdmFsdWVcclxuICpcclxuICogQHByaXZhdGVcclxuICogQHBhcmFtICB7c3RyaW5nfSBwYXRoIHBhdGggd2hlcmUgdGhlIGVsZW1lbnQgc2hvdWxkIGJlIHN0b3JlZFxyXG4gKi9cclxuZnVuY3Rpb24gaGFuZGxlQ3VzdG9tRWxlbWVudChwYXRoLCB2YWx1ZSkge1xyXG5cdC8vIG9ubHkgaWYgbm8gZWxlbWVudCBpcyBhbHJlYWR5IHNldFxyXG5cdGlmICghb2JqZWN0UGF0aC5oYXModGhpcywgXCJfLlwiICsgcGF0aCkpIHtcclxuXHRcdC8vIGNoZWNrIGlmIGVsZW1lbnQgaGFzIGl0IGRlZmluZWQgYXMgZGF0YSBhdHRyaWJ1dGVcclxuXHRcdHZhciBpZCA9IHRoaXMuX25vZGUuZ2V0QXR0cmlidXRlKFwiZGF0YS1cIiArIHBhdGguc3BsaXQoXCIuXCIpLmpvaW4oXCItXCIpKTtcclxuXHRcdGlmIChpZCkgdmFyIGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG5cdFx0aWYgKGVsKSB7XHJcblx0XHRcdG9iamVjdFBhdGguc2V0KHRoaXMsIFwiXy5cIiArIHBhdGgsIGVsKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG9iamVjdFBhdGguc2V0KHRoaXMsIFwiXy5cIiArIHBhdGgsIHZhbHVlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZUN1c3RvbVZhbHVlKHBhdGgsIHZhbHVlKSB7XHJcblx0Ly8gb25seSBpZiBubyBlbGVtZW50IGlzIGFscmVhZHkgc2V0XHJcblx0aWYgKCFvYmplY3RQYXRoLmhhcyh0aGlzLCBcIl8uXCIgKyBwYXRoKSkge1xyXG5cdFx0Ly8gY2hlY2sgaWYgZWxlbWVudCBoYXMgaXQgZGVmaW5lZCBhcyBkYXRhIGF0dHJpYnV0ZVxyXG5cdFx0dmFyIGRhdGFWYWx1ZSA9IHRoaXMuX25vZGUuZ2V0QXR0cmlidXRlKFwiZGF0YS1cIiArIHBhdGguc3BsaXQoXCIuXCIpLmpvaW4oXCItXCIpKTtcclxuXHRcdGlmIChkYXRhVmFsdWUpIHtcclxuXHRcdFx0b2JqZWN0UGF0aC5zZXQodGhpcywgXCJfLlwiICsgcGF0aCwgZGF0YVZhbHVlKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG9iamVjdFBhdGguc2V0KHRoaXMsIFwiXy5cIiArIHBhdGgsIHZhbHVlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAZXh0ZW5kcyBBY2Nlc3NpYmxlTm9kZVxyXG4gKi9cclxuY2xhc3MgUm9sZXR5cGUgZXh0ZW5kcyBBY2Nlc3NpYmxlTm9kZSB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBleHRlbmRzIEFjY2Vzc2libGVOb2RlXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xyXG5cdFx0c3VwZXIoLi4uYXJncyk7XHJcblxyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiX1wiLCB7IHZhbHVlOiB7fSB9KTtcclxuXHRcdHRoaXMuXy5yZWdpc3RlckN1c3RvbUVsZW1lbnQgPSBoYW5kbGVDdXN0b21FbGVtZW50LmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLl8ucmVnaXN0ZXJDdXN0b21WYWx1ZSA9IGhhbmRsZUN1c3RvbVZhbHVlLmJpbmQodGhpcyk7XHJcblxyXG5cdFx0b2JqZWN0UGF0aC5wdXNoKHRoaXMuXywgXCJtdXRhdGlvbnNcIiwgXCJ0YWJJbmRleFwiKTtcclxuXHJcblx0XHR0aGlzLl9vbkFyaWFEaXNhYmxlZE11dGF0aW9uKCk7XHJcblx0fVxyXG5cclxuXHRfb25BcmlhRGlzYWJsZWRNdXRhdGlvbigpIHtcclxuXHRcdC8vIGNvbnNvbGUubG9nKHRoaXMuZGlzYWJsZWQsIHRoaXMudGFiSW5kZXgsIHRoaXMuZGlzYWJsZWQgJiYgdGhpcy50YWJJbmRleCAmJiB0aGlzLnRhYkluZGV4ID49IDApO1xyXG5cdFx0aWYodGhpcy5kaXNhYmxlZCAmJiB0aGlzLnRhYkluZGV4ID49IDApIHtcclxuXHRcdFx0dGhpcy50YWJJbmRleCA9IHVuZGVmaW5lZDtcclxuXHRcdH0gZWxzZSBpZighdGhpcy5kaXNhYmxlZCAmJiB0aGlzLnRhYkluZGV4IDwgMCkge1xyXG5cdFx0XHR0aGlzLnRhYkluZGV4ID0gMDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEN1cnJlbnQgdGFiaW5kZXggb2YgdGhlIGVsZW1lbnRcclxuXHQgKiBAdHlwZSB7TnVtYmVyfVxyXG5cdCAqL1xyXG5cdGdldCB0YWJJbmRleCgpIHtcclxuXHRcdGlmICghdGhpcy5fbm9kZS5oYXNBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX25vZGUudGFiSW5kZXg7XHJcblx0fVxyXG5cdHNldCB0YWJJbmRleChudW1iZXIpIHsgdGhpcy5fbm9kZS50YWJJbmRleCA9IG51bWJlcjsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGFuIGxpc3RlbmVyIHRvIHRoZSBvYmplY3QgYW5kIHRhcmdldGVkIGVsZW1lbnRcclxuXHQgKiBAc2VlIGN1c3RvbUV2ZW50c1xyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBsYWJlbCBUeXBlIG9mIGV2ZW50XHJcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb25cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIEV4dGVuZHMgQWRkRXZlbnRMaXN0ZW5lck9wdGlvbnNcclxuXHQgKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMua2V5XSBXaGVuIGxhYmVsIGlzIHNldCB0byBga2V5YCBpdCBzcGVjaWZpZXMgdGhlIGtleWNvbWJvIHRvIGxpc3RlbiB0b1xyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5hdHRyaWJ1dGVdIFdoZW4gbGFiZWwgaXMgc2V0IHRvIGBhdHRyaWJ1dGVzYCBpdCBzcGVjaWZpZXMgd2hpY2ggYXR0cmlidXRlIHNob3VsZCBiZSBjaGFuZ2VkXHJcblx0ICogQHBhcmFtIHtFbGVtZW50fSBbb3B0aW9ucy50YXJnZXRdIENoYW5nZXMgdGhlIHRhcmdldGVkIGVsZW1lbnRcclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmNhcHR1cmVdXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5wYXNzaXZlXVxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMub25jZV1cclxuXHQgKi9cclxuXHRhZGRFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrLCBvcHRpb25zKSB7XHJcblx0XHQvLyBjaGVjayBpZiBjdXN0b20gdGFyZ2V0IGlzIHNldFxyXG5cdFx0dmFyIG5vZGUgPSBvcHRpb25zICYmIG9wdGlvbnMudGFyZ2V0ID8gb3B0aW9ucy50YXJnZXQgOiB0aGlzLl9ub2RlO1xyXG5cdFx0XHJcblx0XHQvLyBwdXNoIGV2ZW50IHRvIHRoZSBsaXN0ZW5lclxyXG5cdFx0c3VwZXIuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCB7IGNhbGxiYWNrLCBvcHRpb25zIH0pO1xyXG5cclxuXHRcdC8vIGF0dGFjaCBsaXN0ZW5lciB0byBnaXZlbiBrZXlzXHJcblx0XHRpZiAodHlwZSA9PSBcImtleVwiICYmIG9wdGlvbnMua2V5KSB7XHJcblx0XHRcdE1vdXNldHJhcChub2RlKS5iaW5kKG9wdGlvbnMua2V5LCBjYWxsYmFjayk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gYXR0YWNoIG5hdGl2ZSBldmVudHMgdG8gdGFyZ2V0IGVsZW1lbnRcclxuXHRcdGlmIChjdXN0b21FdmVudHMuaW5kZXhPZih0eXBlKSA9PSAtMSkge1xyXG5cdFx0XHRub2RlLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgY2FsbGJhY2ssIG9wdGlvbnMpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmVtb3ZlTGlzdGVuZXIobGFiZWwsIGNhbGxiYWNrLCBvcHRpb25zKSB7XHJcblx0XHRpZiAoIXRoaXMuX2xpc3RlbmVycy5oYXMobGFiZWwpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgc3RhY2sgPSB0aGlzLl9saXN0ZW5lcnMuZ2V0KGxhYmVsKTtcclxuXHRcdGxldCBpbmRleDtcclxuXHJcblx0XHRpZiAoc3RhY2sgJiYgc3RhY2subGVuZ3RoKSB7XHJcblx0XHRcdGluZGV4ID0gc3RhY2sucmVkdWNlKChpLCBsaXN0ZW5lciwgaW5kZXgpID0+IHtcclxuXHRcdFx0XHRpZiAoXHJcblx0XHRcdFx0XHRpc0Z1bmN0aW9uKGxpc3RlbmVyLmNhbGxiYWNrKSAmJiBsaXN0ZW5lci5jYWxsYmFjayA9PT0gY2FsbGJhY2sgJiZcclxuXHRcdFx0XHRcdChcclxuXHRcdFx0XHRcdFx0KFxyXG5cdFx0XHRcdFx0XHRcdGxpc3RlbmVyLm9wdGlvbnMgJiZcclxuXHRcdFx0XHRcdFx0XHRsaXN0ZW5lci5vcHRpb25zLmtleSA9PSBvcHRpb25zLmtleSAmJlxyXG5cdFx0XHRcdFx0XHRcdGxpc3RlbmVyLm9wdGlvbnMuYXR0cmlidXRlID09IG9wdGlvbnMuYXR0cmlidXRlICYmXHJcblx0XHRcdFx0XHRcdFx0bGlzdGVuZXIub3B0aW9ucy5jYXB0dXJlID09IG9wdGlvbnMuY2FwdHVyZVxyXG5cdFx0XHRcdFx0XHQpIHx8XHJcblx0XHRcdFx0XHRcdCFsaXN0ZW5lci5vcHRpb25zICYmICFvcHRpb25zXHJcblx0XHRcdFx0XHQpXHJcblx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gaSA9IGluZGV4O1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gaTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sIC0xKTtcclxuXHJcblx0XHRcdGlmIChpbmRleCA+IC0xKSB7XHJcblx0XHRcdFx0aWYgKGN1c3RvbUV2ZW50cy5pbmRleE9mKGxhYmVsKSA9PSAtMSkge1xyXG5cdFx0XHRcdFx0dmFyIGVsID0gb3B0aW9ucyAmJiBvcHRpb25zLnRhcmdldCA/IG9wdGlvbnMudGFyZ2V0IDogdGhpcy5fbm9kZTtcclxuXHJcblx0XHRcdFx0XHRlbC5yZW1vdmVFdmVudExpc3RlbmVyKGxhYmVsLCBjYWxsYmFjaywgb3B0aW9ucyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHN0YWNrLnNwbGljZShpbmRleCwgMSk7XHJcblx0XHRcdFx0dGhpcy5fbGlzdGVuZXJzLnNldChsYWJlbCwgc3RhY2spO1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRkaXNwYXRjaEV2ZW50KGV2ZW50KSB7XHJcblx0XHRpZiAoIXRoaXMuX2xpc3RlbmVycy5oYXMoZXZlbnQudHlwZSkpIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblx0XHR2YXIgc3RhY2sgPSB0aGlzLl9saXN0ZW5lcnMuZ2V0KGV2ZW50LnR5cGUpO1xyXG5cdFx0c3RhY2suZm9yRWFjaChsaXN0ZW5lciA9PiB7XHJcblx0XHRcdGlmKGxpc3RlbmVyLmNhbGxiYWNrKSBsaXN0ZW5lci5jYWxsYmFjay5jYWxsKHRoaXMsIGV2ZW50KTtcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5fbm9kZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuXHJcblx0XHRyZXR1cm4gIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQ7XHJcblx0fVx0XHJcblxyXG5cdGFkZEtleUxpc3RlbmVyKGtleSwgY2FsbGJhY2spIHtcclxuXHRcdHJldHVybiB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlcIiwgY2FsbGJhY2ssIHsga2V5IH0pO1xyXG5cdH1cdFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSb2xldHlwZTsiLCJpbXBvcnQgU3RydWN0dXJlIGZyb20gXCIuL1N0cnVjdHVyZVwiO1xyXG5cclxuLyoqXHJcbiAqIEBleHRlbmRzIFN0cnVjdHVyZVxyXG4gKi9cclxuY2xhc3MgU2VjdGlvbiBleHRlbmRzIFN0cnVjdHVyZSB7IH1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNlY3Rpb247IiwiaW1wb3J0IGZjIGZyb20gXCIuLy4uLy4uL3V0aWxzL21hbmFnaW5nRm9jdXNcIjtcclxuaW1wb3J0IGJvb2xlYW4gZnJvbSBcIi4vLi4vLi4vdHlwZS9ib29sZWFuXCI7XHJcbmltcG9ydCBlbGVtZW50cyBmcm9tIFwiLi8uLi8uLi91dGlscy9lbGVtZW50c1wiO1xyXG5cclxuaW1wb3J0IFJvbGV0eXBlIGZyb20gXCIuL1JvbGV0eXBlXCI7XHJcbmltcG9ydCBPcHRpb24gZnJvbSBcIi4vLi4vT3B0aW9uLmpzXCI7XHJcbmltcG9ydCBtaXggZnJvbSBcIkB2ZXN0ZXJnYWFyZC1jb21wYW55L2pzLW1peGluXCI7XHJcbmltcG9ydCBzZWxlY3RvciBmcm9tIFwiLi8uLi8uLi91dGlscy9zZWxlY3RvclwiO1xyXG5pbXBvcnQgb3ducyBmcm9tIFwiLi8uLi8uLi91dGlscy9vd25zXCI7XHJcblxyXG4vKipcclxuICogIyMjIEtleWJvYXJkIFN1cHBvcnRcclxuICpcclxuICogIyMjIyBEZWZhdWx0XHJcbiAqIHwgS2V5IHwgRnVuY3Rpb24gfFxyXG4gKiB8IC0tLSB8IC0tLS0tLS0tIHxcclxuICogfCBEb3duIEFycm93IHwgTW92ZXMgZm9jdXMgdG8gdGhlIG5leHQgb3B0aW9uIDxici8+IElmIG5vdCBtdWx0aXNlbGVjdGFibGUsIGl0IHNlbGVjdHMgdGhlIGZvY3VzZWQgb3B0aW9uLlxyXG4gKiB8IFVwIEFycm93IFx0fCBNb3ZlcyBmb2N1cyB0byB0aGUgcHJldmlvdXMgb3B0aW9uICA8YnIvPiBJZiBub3QgbXVsdGlzZWxlY3RhYmxlLCBpdCBzZWxlY3RzIHRoZSBmb2N1c2VkIG9wdGlvbi5cclxuICogfCBIb21lIFx0XHRcdHxcdE1vdmVzIGZvY3VzIHRvIHRoZSBmaXJzdCBvcHRpb24gIDxici8+IElmIG5vdCBtdWx0aXNlbGVjdGFibGUsIGl0IHNlbGVjdHMgdGhlIGZvY3VzZWQgb3B0aW9uLlxyXG4gKiB8IEVuZCAgXHRcdFx0fFx0TW92ZXMgZm9jdXMgdG8gdGhlIGxhc3Qgb3B0aW9uICA8YnIvPiBJZiBub3QgbXVsdGlzZWxlY3RhYmxlLCBpdCBzZWxlY3RzIHRoZSBmb2N1c2VkIG9wdGlvbi5cclxuICpcclxuICogIyMjIyBNdWx0aXBsZSBzZWxlY3Rpb25cclxuICogfCBLZXkgfCBGdW5jdGlvbiB8XHJcbiAqIHwgLS0tIHwgLS0tLS0tLS0gfFxyXG4gKiB8IFNwYWNlXHRcdFx0XHRcdFx0XHRcdFx0fCBDaGFuZ2VzIHRoZSBzZWxlY3Rpb24gc3RhdGUgb2YgdGhlIGZvY3VzZWQgb3B0aW9uLlxyXG4gKiB8IFNoaWZ0ICsgRG93biBBcnJvdyBcdFx0fCBNb3ZlcyBmb2N1cyB0byBhbmQgc2VsZWN0cyB0aGUgbmV4dCBvcHRpb24uXHJcbiAqIHwgU2hpZnQgKyBVcCBBcnJvdyBcdFx0XHR8IE1vdmVzIGZvY3VzIHRvIGFuZCBzZWxlY3RzIHRoZSBwcmV2aW91cyBvcHRpb24uXHJcbiAqIHwgQ29udHJvbCArIFNoaWZ0ICsgSG9tZSB8XHRTZWxlY3RzIGZyb20gdGhlIGZvY3VzZWQgb3B0aW9uIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGxpc3QuXHJcbiAqIHwgQ29udHJvbCArIFNoaWZ0ICsgRW5kICB8IFNlbGVjdHMgZnJvbSB0aGUgZm9jdXNlZCBvcHRpb24gdG8gdGhlIGVuZCBvZiB0aGUgbGlzdC5cclxuICogfCBDb250cm9sICsgQSBcdCAgICAgICAgICB8IFNlbGVjdHMgYWxsIG9wdGlvbnMgaW4gdGhlIGxpc3QuIElmIGFsbCBvcHRpb25zIGFyZSBzZWxlY3RlZCwgdW5zZWxlY3RzIGFsbCBvcHRpb25zLlxyXG4gKlxyXG4gKiAjIyMgQXR0cmlidXRlc1xyXG4gKiAqIGBhcmlhLXNlbGVjdGVkYFxyXG4gKiBcdCogYHRydWVgXHJcbiAqIFx0XHQqIGlzIHRoZSBjdXJyZW50IGZvY3Vzc2VkIGVsZW1lbnRcclxuICogXHRcdCogZXF1YWxzIHRoZSB2YWx1ZSBvZiBgYXJpYS1hY3RpdmVkZXNjZW5kYW50YFxyXG4gKiAqIGB0YWJpbmRleGBcclxuICogXHQqIGFsbG93cyB1c2FnZSBvZiB0aGUgZWxlbWVudCBieSBrZXlzIHdoZW4gaW4gZm9jdXNcclxuICogKiBgYXJpYS1hY3RpdmVkZXNjZW5kYW50YCBlcXVhbHMgSUQgb2YgY3VycmVudCBmb2N1c3NlZCBlbGVtZW50XHJcbiAqIFxyXG4gKiAjIyMjIE11bHRpcGxlIHNlbGVjdGlvblxyXG4gKiAqIGBhcmlhLXNlbGVjdGVkYFxyXG4gKiAgKiBgdHJ1ZWBcclxuICogXHRcdCogY2FuIGJlIGFwcGxpZWQgdG8gbXVsdGlwbGUgZWxlbWVudFxyXG4gKiAgICAqIG5vdCBhdXRvbWF0aWNhbGx5IGFwcGxpZWQgdG8gdGhlIGZvY3VzZWQgZWxlbWVudFxyXG4gKiBcdCogYGZhbHNlYFxyXG4gKiAqIGB0YWJpbmRleGBcclxuICogXHQqIGFsbG93cyB1c2FnZSBvZiB0aGUgZWxlbWVudCBieSBrZXlzIHdoZW4gaW4gZm9jdXNcclxuICogXHJcbiAqIEBzdW1tYXJ5IEEgZm9ybSB3aWRnZXQgdGhhdCBhbGxvd3MgdGhlIHVzZXIgdG8gbWFrZSBzZWxlY3Rpb25zIGZyb20gYSBzZXQgb2YgY2hvaWNlcy5cclxuICogQGV4dGVuZHMgUm9sZXR5cGVcclxuICovXHJcbmNsYXNzIFNlbGVjdCBleHRlbmRzIFJvbGV0eXBlIHtcclxuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XHJcblx0XHRzdXBlciguLi5hcmdzKTtcclxuXHJcblx0XHQvLyB1c2VkIGZvciBkZXRlcm1pbmluZyBpZiBsb2dpYyBzaG91bGQgYmUgZXhlY3V0ZWRcclxuXHRcdHRoaXMudGFyZ2V0ID0gZmFsc2U7XHJcblx0XHRcclxuXHRcdC8vIHdoZW4gaW4gZm9jdXMsIGFsbG93IHRoZSBlbGVtZW50IGJlIGNvbnRyb2xsZWQgYnkgdGhlIGtleXNcclxuXHRcdGlmKHR5cGVvZiB0aGlzLnRhYkluZGV4ICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRcdHRoaXMuX25vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIGhhc1RhcmdldC5iaW5kKHRoaXMpKTtcclxuXHRcdFx0dGhpcy5fbm9kZS5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCBsb3N0VGFyZ2V0LmJpbmQodGhpcykpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm1vdmVUb1N0YXJ0LmJpbmQodGhpcyksIHtrZXk6IFwiaG9tZVwiLCB0YXJnZXQ6IHRoaXMuX25vZGUub3duZXJEb2N1bWVudH0pO1xyXG5cdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwia2V5XCIsIHRoaXMubW92ZVRvUHJldi5iaW5kKHRoaXMpLCB7a2V5OiBcInVwXCIsIHRhcmdldDogdGhpcy5fbm9kZS5vd25lckRvY3VtZW50fSk7XHJcblx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlcIiwgdGhpcy5tb3ZlVG9OZXh0LmJpbmQodGhpcyksIHtrZXk6IFwiZG93blwiLCB0YXJnZXQ6IHRoaXMuX25vZGUub3duZXJEb2N1bWVudH0pO1xyXG5cdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwia2V5XCIsIHRoaXMubW92ZVRvRW5kLmJpbmQodGhpcyksIHtrZXk6IFwiZW5kXCIsIHRhcmdldDogdGhpcy5fbm9kZS5vd25lckRvY3VtZW50fSk7XHJcblxyXG5cdFx0Ly8gdGhpcy5hZGRFdmVudExpc3RlbmVyLmNhbGwoeyBlbGVtZW50OiB0aGlzLl9ub2RlLm93bmVyRG9jdW1lbnQgfSwgXCJob21lXCIsIHRoaXMubW92ZVRvU3RhcnQuYmluZCh0aGlzKSk7XHJcblx0XHQvLyB0aGlzLmFkZEV2ZW50TGlzdGVuZXIuY2FsbCh7IGVsZW1lbnQ6IHRoaXMuX25vZGUub3duZXJEb2N1bWVudCB9LCBcInVwXCIsIHRoaXMubW92ZVRvUHJldi5iaW5kKHRoaXMpKTtcclxuXHRcdC8vIC8vIHRoaXMuYWRkRXZlbnRMaXN0ZW5lci5jYWxsKHsgZWxlbWVudDogdGhpcy5fbm9kZS5vd25lckRvY3VtZW50IH0sIFwic2hpZnQgKyB1cFwiLCB0aGlzLm1vdmVUb05leHQuYmluZCh0aGlzKSk7XHJcblx0XHQvLyB0aGlzLmFkZEV2ZW50TGlzdGVuZXIuY2FsbCh7IGVsZW1lbnQ6IHRoaXMuX25vZGUub3duZXJEb2N1bWVudCB9LCBcImRvd25cIiwgdGhpcy5tb3ZlVG9OZXh0LmJpbmQodGhpcykpO1xyXG5cdFx0Ly8gLy8gdGhpcy5hZGRFdmVudExpc3RlbmVyLmNhbGwoeyBlbGVtZW50OiB0aGlzLl9ub2RlLm93bmVyRG9jdW1lbnQgfSwgXCJzaGlmdCArIGRvd25cIiwgc2VsZWN0RG93bi5iaW5kKHRoaXMpKTtcclxuXHRcdC8vIHRoaXMuYWRkRXZlbnRMaXN0ZW5lci5jYWxsKHsgZWxlbWVudDogdGhpcy5fbm9kZS5vd25lckRvY3VtZW50IH0sIFwiZW5kXCIsIHRoaXMubW92ZVRvRW5kLmJpbmQodGhpcykpO1xyXG5cdFxyXG5cdFx0dGhpcy5vcHRpb25zID0gb3ducy5nZXRBbGxBbGxvd2VkQ2hpbGRyZW4odGhpcyk7XHJcblx0XHR0aGlzLm9wdGlvbnMuZm9yRWFjaChheSA9PiB7XHJcblx0XHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuYWN0aXZlQ2hhbmdlZC5iaW5kKHRoaXMpLCB7dGFyZ2V0OiBheS5fbm9kZX0pO1xyXG5cdFx0XHRpZiAoYXkuc2VsZWN0ZWQpIHtcclxuXHRcdFx0XHRmYy5hZGQoYXkpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdG1vdmVUb1ByZXYoZXYpIHsgbW92ZSh0aGlzLCBldiwgZmMucHJldiwgdGhpcy5tb3ZlZC5iaW5kKHRoaXMpKTsgfVxyXG5cdG1vdmVUb05leHQoZXYpIHsgbW92ZSh0aGlzLCBldiwgZmMubmV4dCwgdGhpcy5tb3ZlZC5iaW5kKHRoaXMpKTsgfVxyXG5cdG1vdmVUb1N0YXJ0KGV2KSB7IG1vdmUodGhpcywgZXYsIGZjLnN0YXJ0LCB0aGlzLm1vdmVkLmJpbmQodGhpcykpOyB9XHJcblx0bW92ZVRvRW5kKGV2KSB7IG1vdmUodGhpcywgZXYsIGZjLmVuZCwgdGhpcy5tb3ZlZC5iaW5kKHRoaXMpKTsgfVxyXG5cdFxyXG5cdG1vdmVkKGZyb20sIHRvKSB7fVxyXG5cdFxyXG5cdGFjdGl2ZUNoYW5nZWQoZXYpIHtcclxuXHRcdGxldCBvcHRpb24gPSBlbGVtZW50cy5nZXQoZXYudGFyZ2V0KTtcclxuXHRcdGxldCBwcmV2Rm9jdXMgPSBmYy5nZXQodGhpcy5vcHRpb25zKTtcclxuXHRcdGZjLnJlbW92ZShwcmV2Rm9jdXMpO1xyXG5cdFx0ZmMuYWRkKG9wdGlvbik7XHJcblxyXG5cdFx0aWYgKHRoaXMuYWN0aXZlRGVzY2VuZGFudCkgdGhpcy5hY3RpdmVEZXNjZW5kYW50ID0gb3B0aW9uO1xyXG5cclxuXHRcdC8vIHVwZGF0ZSBzZWxlY3RlZCBvbiBrZXlldmVudCB3aGVuIG9ubHkgb25lIGl0ZW0gY2FuIGJlIHNlbGVjdGVkXHJcblx0XHRpZiAoIXRoaXMubXVsdGlzZWxlY3RhYmxlKSB7XHJcblx0XHRcdGZjLnNldFNlbGVjdGVkKHByZXZGb2N1cywgdW5kZWZpbmVkKTtcclxuXHRcdH1cclxuXHRcdGZjLnNldFNlbGVjdGVkKG9wdGlvbiwgYm9vbGVhbi50b2dnbGUob3B0aW9uLnNlbGVjdGVkKSk7XHRcdFxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gbW92ZShheSwgZXYsIGZ1bmMsIGNhbGxiYWNrKSB7XHJcblx0aWYgKCFheS50YXJnZXQpIHJldHVybjtcclxuXHRpZiAoZXYpIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdGxldCBwcmV2Rm9jdXMgPSBmYy5nZXQoYXkub3B0aW9ucyk7XHJcblx0ZmMucmVtb3ZlKHByZXZGb2N1cyk7XHJcblx0Ly8gdXBkYXRlIHNlbGVjdGVkIG9uIGtleWV2ZW50IHdoZW4gb25seSBvbmUgaXRlbSBjYW4gYmUgc2VsZWN0ZWRcclxuXHRsZXQgY3VycmVudEZvY3VzID0gZnVuYyhheS5vcHRpb25zLCBwcmV2Rm9jdXMpO1xyXG5cdGlmIChheS5hY3RpdmVEZXNjZW5kYW50KSBheS5hY3RpdmVEZXNjZW5kYW50ID0gY3VycmVudEZvY3VzO1xyXG5cclxuXHRjYWxsYmFjayhwcmV2Rm9jdXMsIGN1cnJlbnRGb2N1cyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhc1RhcmdldCgpIHsgdGhpcy50YXJnZXQgPSB0cnVlOyB9XHJcbmZ1bmN0aW9uIGxvc3RUYXJnZXQoKSB7IHRoaXMudGFyZ2V0ID0gZmFsc2U7IH1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNlbGVjdDsiLCJpbXBvcnQgUm9sZXR5cGUgZnJvbSBcIi4vUm9sZXR5cGVcIjtcclxuXHJcbi8qKlxyXG4gKiBAZXh0ZW5kcyBSb2xldHlwZVxyXG4gKi9cclxuY2xhc3MgU3RydWN0dXJlIGV4dGVuZHMgUm9sZXR5cGUgeyB9XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdHJ1Y3R1cmU7XHJcbiIsImltcG9ydCBSb2xldHlwZSBmcm9tIFwiLi9Sb2xldHlwZVwiO1xyXG5cclxuLyoqXHJcbiAqIEBleHRlbmRzIFJvbGV0eXBlXHJcbiAqL1xyXG5jbGFzcyBXaWRnZXQgZXh0ZW5kcyBSb2xldHlwZSB7fVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgIFdpZGdldDtcclxuIiwiaW1wb3J0IFJvbGV0eXBlIGZyb20gXCIuL1JvbGV0eXBlXCI7XHJcblxyXG4vKipcclxuICogQGV4dGVuZHMgUm9sZXR5cGVcclxuICovXHJcbmNsYXNzIFdpbmRvdyBleHRlbmRzIFJvbGV0eXBlIHsgfVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgV2luZG93O1xyXG4iLCJpbXBvcnQgYm9vbGVhbiBmcm9tIFwiLi8uLi90eXBlL2Jvb2xlYW5cIjtcclxuaW1wb3J0IGdldEFjdGl2ZSBmcm9tIFwiLi8uLi91dGlscy9nZXRBY3RpdmVcIjtcclxuaW1wb3J0IElucHV0IGZyb20gXCIuL2Fic3RyYWN0L0lucHV0XCI7XHJcblxyXG4vKipcclxuICogQGV4dGVuZHMgSW5wdXRcclxuICovXHJcbmNsYXNzIE9wdGlvbiBleHRlbmRzIElucHV0IHtcclxuXHJcblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xyXG5cdFx0c3VwZXIoLi4uYXJncyk7XHJcblxyXG5cdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vbkNsaWNrLmJpbmQodGhpcykpO1xyXG5cdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwia2V5XCIsIHRoaXMub25DbGljay5iaW5kKHRoaXMpLCB7a2V5OiBcImVudGVyXCIsIHRhcmdldDogZG9jdW1lbnR9KTtcclxuXHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKSwge2tleTogXCJzcGFjZVwiLCB0YXJnZXQ6IGRvY3VtZW50fSk7XHJcblx0XHQvLyB0aGlzLmFkZEtleUxpc3RlbmVyKFwiRW50ZXJcIiwgc2VsZWN0SXRlbS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdG9uQ2xpY2soZXYpIHtcclxuXHRcdGlmKHR5cGVvZiBzdXBlci5vbkNsaWNrID09IFwiZnVuY3Rpb25cIikgc3VwZXIub25DbGljayhldik7XHJcblx0XHRpZihldikgZXYucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRpZiAodGhpcyA9PSBnZXRBY3RpdmUoKSkge1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkID0gYm9vbGVhbi50b2dnbGUodGhpcy5zZWxlY3RlZCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBPcHRpb247IiwiaW1wb3J0IFRleHRib3ggZnJvbSBcIi4vVGV4dGJveFwiO1xuXG4vKipcbiAqIEBleHRlbmRzIFRleHRib3hcbiAqL1xuY2xhc3MgU2VhcmNoYm94IGV4dGVuZHMgVGV4dGJveCB7XG5cdC8qKlxuXHQgKiAjIyMjIEV4YW1wbGVcblx0ICogXG5cdCAqIDxkaXYgcm9sZT1cInNlYXJjaGJveFwiIGNvbnRlbnRlZGl0YWJsZT48L2Rpdj5cblx0ICogXG5cdCAqIGBgYGh0bWxcblx0ICogPGRpdiByb2xlPVwic2VhcmNoYm94XCIgY29udGVudGVkaXRhYmxlPjwvZGl2PlxuXHQgKiBgYGBcblx0ICogXG5cdCAqIEBwYXJhbSB7Kn0gYXJncyBcblx0ICovXG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHsgc3VwZXIoLi4uYXJncyk7IH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoYm94OyIsImV4cG9ydCBjb25zdCBJU19BQ1RJVkUgPSBcInRydWVcIiwgSVNfTk9UX0FDVElWRSA9IFwiZmFsc2VcIjtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiBhIGdpdmVuIGF0dHJpYnV0ZVxyXG4gKiBAcGFyYW0ge0FjY2Vzc2libGVOb2RlfSBheSBcclxuICogQHBhcmFtIHtTdHJpbmd9IGF0dHJpYnV0ZU5hbWUgXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gYXR0cmlidXRlJ3MgdmFsdWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXQoYXksIGF0dHJpYnV0ZU5hbWUpIHtcclxuXHR2YXIgdmFsdWUgPSBheS5fLnJhd0F0dHJzLmF0dHJpYnV0ZU5hbWUgfHwgYXkuZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XHJcblx0aWYgKHZhbHVlID09IHVuZGVmaW5lZCkgcmV0dXJuO1xyXG5cdHJldHVybiB2YWx1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFN5bmMgdGhlIG5ldyB2YWx1ZSB0byB0aGUgRE9NXHJcbiAqIEBwYXJhbSB7QWNjZXNzaWJsZU5vZGV9IGF5IFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gYXR0cmlidXRlTmFtZSBcclxuICogQHBhcmFtIHtTdHJpbmcgfCBOdW1iZXIgfSBzdGF0dXMgXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0KGF5LCBhdHRyaWJ1dGVOYW1lLCBzdGF0dXMpIHtcclxuXHRpZihzdGF0dXMgPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRheS5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0YXkuZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgc3RhdHVzKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBzdGF0dXM7XHJcbn1cclxuXHJcbi8qKlxyXG4qIFJldHVybnMgdGhlIG9wcG9zaXRlIHN0YXRlIG9mIHRoZSBhdHRyaWJ1dGUsXHJcbiogbmVlZGVkIHdoZW4gYXR0cmlidXRlIHVzZXMgYW4gdG9rZW4gbGlzdFxyXG4qIEByZXR1cm4ge1N0cmluZ30gTmV3IHN0YXRlXHJcbiovXHJcbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGUoc3RhdGUpIHtcclxuXHRpZiAoc3RhdGUgPT0gSVNfQUNUSVZFKSB7XHJcblx0XHRzdGF0ZSA9IElTX05PVF9BQ1RJVkU7XHJcblx0fSBlbHNlIHtcclxuXHRcdHN0YXRlID0gSVNfQUNUSVZFO1xyXG5cdH1cclxuXHRyZXR1cm4gc3RhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgSVNfQUNUSVZFLCBJU19OT1RfQUNUSVZFLCBnZXQsIHNldCwgdG9nZ2xlIH07IiwiZXhwb3J0IGNvbnN0IElTX0FDVElWRSA9IHRydWUsIElTX05PVF9BQ1RJVkUgPSBmYWxzZTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiBnaXZlbiBhdHRyaWJ1dGUgYXMgQm9vbGVhblxyXG4gKiBAcGFyYW0ge0FjY2Vzc2libGVOb2RlfSBheSBcclxuICogQHBhcmFtIHtTdHJpbmd9IGF0dHJpYnV0ZU5hbWUgXHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59IGF0dHJpYnV0ZSdzIHZhbHVlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0KGF5LCBhdHRyaWJ1dGVOYW1lKSB7XHJcblx0dmFyIHZhbHVlID0gYXkuXy5yYXdBdHRycy5hdHRyaWJ1dGVOYW1lIHx8IGF5LmVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpO1xyXG5cdGlmKHZhbHVlID09IHVuZGVmaW5lZCApIHJldHVybjtcclxuXHRyZXR1cm4gdmFsdWUgID09IFwidHJ1ZVwiIHx8IGZhbHNlO1xyXG59XHJcblxyXG4vKipcclxuICogU3luYyB0aGUgbmV3IHZhbHVlIHRvIHRoZSBwcm9wZXJ0eVxyXG4gKiBAcGFyYW0ge0FjY2Vzc2libGVOb2RlfSBheSBcclxuICogQHBhcmFtIHtTdHJpbmd9IGF0dHJpYnV0ZU5hbWUgXHJcbiAqIEBwYXJhbSB7U3RyaW5nIHwgQm9vbGVhbn0gc3RhdHVzIFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldChheSwgYXR0cmlidXRlTmFtZSwgc3RhdHVzKSB7XHJcblx0aWYoc3RhdHVzID09IHVuZGVmaW5lZCkge1xyXG5cdFx0YXkuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGF5LmVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUsIHN0YXR1cyk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gc3RhdHVzO1xyXG59XHJcblxyXG4vKipcclxuKiBSZXR1cm5zIHRoZSBvcHBvc2l0ZSBzdGF0ZSBvZiB0aGUgYXR0cmlidXRlXHJcbiogQHJldHVybiB7Qm9vbGVhbn0gTmV3IHN0YXRlXHJcbiovXHJcbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGUoc3RhdGUpIHtcclxuXHRpZiAoc3RhdGUgPT0gSVNfQUNUSVZFKSB7XHJcblx0XHRzdGF0ZSA9IElTX05PVF9BQ1RJVkU7XHJcblx0fSBlbHNlIHtcclxuXHRcdHN0YXRlID0gSVNfQUNUSVZFO1xyXG5cdH1cclxuXHRyZXR1cm4gc3RhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgSVNfQUNUSVZFLCBJU19OT1RfQUNUSVZFLCBnZXQsIHNldCwgdG9nZ2xlIH07IiwiaW1wb3J0IGNyZWF0ZSBmcm9tIFwiLi9jcmVhdGVcIjtcblxuLyoqXG4gKiBcbiAqL1xuY2xhc3MgVmFsaWRpdHlTdGF0ZSB7XG5cdGNvbnN0cnVjdG9yKGF5KSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiX2F5XCIsIHtcblx0XHRcdHZhbHVlOiBheVxuXHRcdH0pO1xuXHR9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFZhbGlkaXR5U3RhdGUucHJvdG90eXBlLFxuXHQvKiogQGxlbmRzIFZhbGlkaXR5U3RhdGUucHJvdG90eXBlICovXG5cdHtcblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHVzZXIgaGFzIHByb3ZpZGVkIGlucHV0IGluIHRoZSB1c2VyIGludGVyZmFjZSB0aGF0IHRoZSBcblx0XHQgKiB1c2VyIGFnZW50IGlzIHVuYWJsZSB0byBjb252ZXJ0IHRvIGEgdmFsdWU7IGZhbHNlIG90aGVyd2lzZS5cblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cblx0XHQgKi9cblx0XHRiYWRJbnB1dDoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldCgpIHtcblx0XHRcdFx0aWYgKCgoY3JlYXRlLmluc3RhbmNlT2YodGhpcy5fYXksIFwic3BpbmJ1dHRvblwiKSB8fCBjcmVhdGUuaW5zdGFuY2VPZih0aGlzLl9heSwgXCJzbGlkZXJcIikpXG5cdFx0XHRcdFx0JiYgdGhpcy5fYXkudmFsdWVOb3cubGVuZ3RoID4gMCAmJiAhL15bLStdPyg/OlxcZCt8XFxkKlsuLF1cXGQrKSQvLnRlc3QodGhpcy5fYXkudmFsdWVOb3cpKVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudCBoYXMgYSBjdXN0b20gZXJyb3I7IGZhbHNlIG90aGVyd2lzZS5cblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cblx0XHQgKi9cdFxuXHRcdGN1c3RvbUVycm9yOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gISF0aGlzLl9jdXN0b21FcnJvcjsgfVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnTigJlzIHZhbHVlIGRvZXNu4oCZdCBtYXRjaCB0aGUgcHJvdmlkZWQgcGF0dGVybjsgZmFsc2Ugb3RoZXJ3aXNlLlxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxuXHRcdCAqL1xuXHRcdHBhdHRlcm5NaXNtYXRjaDoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldCgpIHtcblx0XHRcdFx0dmFyIHZhbHVlID0gdGhpcy5fYXkuXy5pbnB1dCA/IHRoaXMuX2F5Ll8uaW5wdXQudmFsdWUgOiB0aGlzLl9heS52YWx1ZU5vdztcblx0XHRcdFx0aWYgKHRoaXMuX2F5Ll8uaW5wdXQucGF0dGVybiAmJiB2YWx1ZS5sZW5ndGggPiAwICYmIG5ldyBSZWdFeHAodGhpcy5fYXkuXy5pbnB1dC5wYXR0ZXJuKS50ZXN0KHZhbHVlKSA9PT0gZmFsc2UpIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudOKAmXMgdmFsdWUgaXMgaGlnaGVyIHRoYW4gdGhlIHByb3ZpZGVkIG1heGltdW07IGZhbHNlIG90aGVyd2lzZS5cblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cblx0XHQgKi9cblx0XHRyYW5nZU92ZXJmbG93OiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRpZiAodGhpcy5fYXkudmFsdWVOb3cgJiYgdGhpcy5fYXkudmFsdWVNYXggJiYgdGhpcy5fYXkudmFsdWVOb3cgPiB0aGlzLl9heS52YWx1ZU1heCkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnTigJlzIHZhbHVlIGlzIGxvd2VyIHRoYW4gdGhlIHByb3ZpZGVkIG1pbmltdW07IGZhbHNlIG90aGVyd2lzZS5cblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cblx0XHQgKi9cblx0XHRyYW5nZVVuZGVyZmxvdzoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldCgpIHtcblx0XHRcdFx0aWYgKHRoaXMuX2F5LnZhbHVlTm93ICYmIHRoaXMuX2F5LnZhbHVlTWluICYmIHRoaXMuX2F5LnZhbHVlTm93IDwgdGhpcy5fYXkudmFsdWVNaW4pIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW504oCZcyB2YWx1ZSBkb2VzbuKAmXQgZml0IHRoZSBydWxlcyBnaXZlbiBieSB0aGUgc3RlcCBhdHRyaWJ1dGU7IGZhbHNlIG90aGVyd2lzZS5cblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cblx0XHQgKi9cblx0XHRzdGVwTWlzbWF0Y2g6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQoKSB7XG5cdFx0XHRcdGlmICh0aGlzLl9heS5fLnJhbmdlICYmIHRoaXMuX2F5Ll8ucmFuZ2Uuc3RlcCAmJiB0aGlzLl9heS52YWx1ZU5vdyAlIHRoaXMuX2F5Ll8ucmFuZ2Uuc3RlcCAhPT0gMCkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnTigJlzIHZhbHVlIGlzIGxvbmdlciB0aGFuIHRoZSBwcm92aWRlZCBtYXhpbXVtIGxlbmd0aDsgZmFsc2Ugb3RoZXJ3aXNlLlxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxuXHRcdCAqL1xuXHRcdHRvb0xvbmc6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQoKSB7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IHRoaXMuX2F5Ll8uaW5wdXQgPyB0aGlzLl9heS5fLmlucHV0LnZhbHVlIDogdGhpcy5fYXkudmFsdWVOb3c7XG5cdFx0XHRcdGlmICh0aGlzLl9heS5tYXhsZW5ndGggJiYgdmFsdWUubGVuZ3RoID4gdGhpcy5fYXkubWF4bGVuZ3RoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW504oCZcyB2YWx1ZSwgaWYgaXQgaXMgbm90IHRoZSBlbXB0eSBzdHJpbmcsIGlzIHNob3J0ZXIgdGhhbiB0aGUgcHJvdmlkZWQgbWluaW11bSBsZW5ndGg7IGZhbHNlIG90aGVyd2lzZS5cblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cblx0XHQgKi9cblx0XHR0b29TaG9ydDoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldCgpIHtcblx0XHRcdFx0dmFyIHZhbHVlID0gdGhpcy5fYXkuXy5pbnB1dCA/IHRoaXMuX2F5Ll8uaW5wdXQudmFsdWUgOiB0aGlzLl9heS52YWx1ZU5vdztcblx0XHRcdFx0aWYgKHRoaXMuX2F5Lm1pbmxlbmd0aCAmJiB2YWx1ZS5sZW5ndGggPCB0aGlzLl9heS5taW5sZW5ndGgpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnTigJlzIHZhbHVlIGlzIG5vdCBpbiB0aGUgY29ycmVjdCBzeW50YXg7IGZhbHNlIG90aGVyd2lzZS5cblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cblx0XHQgKi9cblx0XHR0eXBlTWlzbWF0Y2g6IHsgXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW50IGhhcyBubyB2YWx1ZSBidXQgaXMgYSByZXF1aXJlZCBmaWVsZDsgZmFsc2Ugb3RoZXJ3aXNlLlxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxuXHRcdCAqL1xuXHRcdHZhbHVlTWlzc2luZzoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldCgpIHtcblx0XHRcdFx0dmFyIHZhbHVlID0gdGhpcy5fYXkuXy5pbnB1dCA/IHRoaXMuX2F5Ll8uaW5wdXQudmFsdWUgOiB0aGlzLl9heS52YWx1ZU5vdztcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdHRoaXMucmVxdWlyZWRcblx0XHRcdFx0XHQmJiAoXG5cdFx0XHRcdFx0XHQoKGNyZWF0ZS5pbnN0YW5jZU9mKHRoaXMuX2F5LCBcImNoZWNrYm94XCIpIHx8IGNyZWF0ZS5pbnN0YW5jZU9mKHRoaXMuX2F5LCBcInJhZGlvXCIpXG5cdFx0XHRcdFx0XHRcdHx8IGNyZWF0ZS5pbnN0YW5jZU9mKHRoaXMuX2F5LCBcIm9wdGlvblwiKSkgJiYgIXRoaXMuX2F5LmNoZWNrZWQpXG5cdFx0XHRcdFx0XHR8fCAoY3JlYXRlLmluc3RhbmNlT2YodGhpcy5fYXksIFwic2VsZWN0XCIpICYmICF2YWx1ZSlcblx0XHRcdFx0XHRcdHx8ICgoY3JlYXRlLmluc3RhbmNlT2YodGhpcy5fYXksIFwiaW5wdXRcIikgfHwgY3JlYXRlLmluc3RhbmNlT2YodGhpcy5fYXksIFwiZ3JpZGNlbGxcIikpICYmICF2YWx1ZSA+IDApXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW504oCZcyB2YWx1ZSBoYXMgbm8gdmFsaWRpdHkgcHJvYmxlbXM7IGZhbHNlIG90aGVyd2lzZVxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxuXHRcdCAqL1xuXHRcdHZhbGlkOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRyZXR1cm4gIShcblx0XHRcdFx0XHR0aGlzLmJhZElucHV0IHx8XG5cdFx0XHRcdFx0dGhpcy5jdXN0b21FcnJvciB8fFxuXHRcdFx0XHRcdHRoaXMucGF0dGVybk1pc21hdGNoIHx8XG5cdFx0XHRcdFx0dGhpcy5yYW5nZU92ZXJmbG93IHx8XG5cdFx0XHRcdFx0dGhpcy5yYW5nZVVuZGVyZmxvdyB8fFxuXHRcdFx0XHRcdHRoaXMuc3RlcE1pc21hdGNoIHx8XG5cdFx0XHRcdFx0dGhpcy50b29Mb25nIHx8XG5cdFx0XHRcdFx0dGhpcy50b29TaG9ydCB8fFxuXHRcdFx0XHRcdHRoaXMudHlwZU1pc21hdGNoIHx8XG5cdFx0XHRcdFx0dGhpcy52YWx1ZU1pc3Npbmdcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbik7XG5cbmV4cG9ydCBkZWZhdWx0IFZhbGlkaXR5U3RhdGU7IiwiaW1wb3J0IHNlbGVjdG9yIGZyb20gXCIuL3NlbGVjdG9yXCI7XG5pbXBvcnQgZWxlbWVudHMgZnJvbSBcIi4vZWxlbWVudHNcIjtcbmltcG9ydCBnZXRDb21wdXRlZFJvbGUgZnJvbSBcIi4vZ2V0Q29tcHV0ZWRSb2xlXCI7XG5cbmltcG9ydCBSYW5nZSBmcm9tIFwiLi8uLi9yb2xlL2Fic3RyYWN0L1JhbmdlXCI7XG5pbXBvcnQgUm9sZXR5cGUgZnJvbSBcIi4vLi4vcm9sZS9hYnN0cmFjdC9Sb2xldHlwZVwiO1xuXG5pbXBvcnQgQnV0dG9uIGZyb20gXCIuLy4uL3JvbGUvQnV0dG9uXCI7XG5pbXBvcnQgQ2hlY2tib3ggZnJvbSBcIi4vLi4vcm9sZS9DaGVja2JveFwiO1xuaW1wb3J0IENvbWJvYm94IGZyb20gXCIuLy4uL3JvbGUvQ29tYm9ib3hcIjtcbmltcG9ydCBEaWFsb2cgZnJvbSBcIi4vLi4vcm9sZS9EaWFsb2dcIjtcbmltcG9ydCBGb3JtIGZyb20gXCIuLy4uL3JvbGUvRm9ybVwiO1xuaW1wb3J0IExpbmsgZnJvbSBcIi4vLi4vcm9sZS9MaW5rXCI7XG5pbXBvcnQgTGlzdGJveCBmcm9tIFwiLi8uLi9yb2xlL0xpc3Rib3hcIjtcbmltcG9ydCBPcHRpb24gZnJvbSBcIi4vLi4vcm9sZS9vcHRpb25cIjtcbmltcG9ydCBSYWRpbyBmcm9tIFwiLi8uLi9yb2xlL1JhZGlvXCI7XG5pbXBvcnQgUmFkaW9ncm91cCBmcm9tIFwiLi8uLi9yb2xlL1JhZGlvZ3JvdXBcIjtcbmltcG9ydCBTZWFyY2hib3ggZnJvbSBcIi4vLi4vcm9sZS9zZWFyY2hib3hcIjtcbmltcG9ydCBTbGlkZXIgZnJvbSBcIi4vLi4vcm9sZS9TbGlkZXJcIjtcbmltcG9ydCBTcGluYnV0dG9uIGZyb20gXCIuLy4uL3JvbGUvU3BpbmJ1dHRvblwiO1xuaW1wb3J0IFN3aXRjaCBmcm9tIFwiLi8uLi9yb2xlL1N3aXRjaFwiO1xuaW1wb3J0IFRhYiBmcm9tIFwiLi8uLi9yb2xlL1RhYlwiO1xuaW1wb3J0IFRhYmxpc3QgZnJvbSBcIi4vLi4vcm9sZS9UYWJsaXN0XCI7XG5pbXBvcnQgVGFicGFuZWwgZnJvbSBcIi4vLi4vcm9sZS9UYWJwYW5lbFwiO1xuaW1wb3J0IFRleHRib3ggZnJvbSBcIi4vLi4vcm9sZS9UZXh0Ym94XCI7XG5cbnZhciBvYmogPSB7IEJ1dHRvbiwgQ2hlY2tib3gsIENvbWJvYm94LCBEaWFsb2csIEZvcm0sIExpc3Rib3gsIFxuXHRPcHRpb24sIFJhbmdlLCBSb2xldHlwZSwgU2VhcmNoYm94LCBTbGlkZXIsIFNwaW5idXR0b24sXG5cdFRhYiwgVGFibGlzdCwgVGFicGFuZWwsIFRleHRib3gsIExpbmssIFN3aXRjaCxcblx0UmFkaW9ncm91cCwgUmFkaW9cbn07XG5cbmZ1bmN0aW9uIGFsbCgpIHtcblx0Zm9yIChsZXQga2V5IGluIG9iaikge1xuXHRcdHZhciBub2RlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IuZ2V0Um9sZShrZXkudG9Mb3dlckNhc2UoKSkpO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZUxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdGVsZW1lbnRzLnNldChub2RlTGlzdFtpXSwgbmV3IG9ialtrZXldKG5vZGVMaXN0W2ldKSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIG9uZShlbCkge1xuXHRpZihlbGVtZW50cy5oYXMoZWwpKSByZXR1cm4gZWxlbWVudHMuZ2V0KGVsKTtcblx0dmFyIHJvbGUgPSBnZXRDb21wdXRlZFJvbGUoZWwpO1xuXHRcblx0LyoqIEB0b2RvIFJlbW92ZSBmYWxsYmFjayBtZXRob2QgKi9cblx0dmFyIGNvbnN0cnVjdG9yID0gb2JqW3JvbGVdIHx8IFJvbGV0eXBlO1xuXG5cdHJldHVybiBlbGVtZW50cy5zZXQoZWwsIG5ldyBjb25zdHJ1Y3RvcihlbCkpO1xufVxuXG5mdW5jdGlvbiBpbnN0YW5jZU9mKGF5LCByb2xlKSB7XG5cdHJldHVybiBheSBpbnN0YW5jZW9mIG9ialtyb2xlXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge2FsbCwgb25lLCBpbnN0YW5jZU9mfTtcbiIsImltcG9ydCBjcmVhdGUgZnJvbSBcIi4vY3JlYXRlXCI7XG5pbXBvcnQgZ2V0Q29tcHV0ZWRSb2xlIGZyb20gXCIuL2dldENvbXB1dGVkUm9sZVwiO1xuXG52YXIgYXlJbnN0YW5jZXMgPSBuZXcgV2Vha01hcCgpO1xuXG4vLyB0b2RvOiBsb29wIHRocm91Z2ggcHJlc2VudGF0aW9uYWwgcm9sZXNcbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXJlbnQoYXksIHNlbGVjdG9yKSB7XG5cdGxldCBlbGVtZW50ID0gYXkuZWxlbWVudDtcblxuXHR3aGlsZShlbGVtZW50LnBhcmVudE5vZGUpIHtcblx0XHRlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuXG5cdFx0aWYgKGF5LmVsZW1lbnQucGFyZW50Tm9kZS5tYXRjaGVzKHNlbGVjdG9yKSkge1xuXHRcdFx0aWYgKGF5SW5zdGFuY2VzLmhhcyhheS5lbGVtZW50LnBhcmVudE5vZGUpKSB7XG5cdFx0XHRcdHJldHVybiBheUluc3RhbmNlcy5nZXQoYXkuZWxlbWVudC5wYXJlbnROb2RlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjcmVhdGUub25lKGF5LmVsZW1lbnQucGFyZW50Tm9kZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGZhbHNlO1xufVxuXG4vKiogQHRvZG8gZmluZCBvbmx5IGBkaXJlY3RgIGNoaWxkcmVuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2hpbGRyZW4oYXksIHJvbGUpIHtcblx0dmFyIHJlc3VsdHMgPSBbXTtcblx0dmFyIG93bnMgPSBBcnJheS5mcm9tKGF5LmVsZW1lbnQuY2hpbGRyZW4pLmNvbmNhdChheS5vd25zKTtcblxuXHRvd25zLmZvckVhY2goY2hpbGQgPT4ge1xuXHRcdGlmICghcm9sZSB8fCAocm9sZSAmJiBnZXRDb21wdXRlZFJvbGUoY2hpbGQpID09IHJvbGUpKSB7XG5cdFx0XHRpZiAoYXlJbnN0YW5jZXMuaGFzKGNoaWxkKSkge1xuXHRcdFx0XHRyZXN1bHRzLnB1c2goYXlJbnN0YW5jZXMuZ2V0KGNoaWxkKSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXN1bHRzLnB1c2goY3JlYXRlLm9uZShjaGlsZCkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cblx0cmV0dXJuIG93bnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcmV2KGNoaWxkLCBwYXJlbnQsIHJvbGUpIHtcblx0aWYoIXBhcmVudCkgcmV0dXJuIGZhbHNlO1xuXG5cdGxldCBjaGlsZHJlbiA9IGdldENoaWxkcmVuKHBhcmVudCwgcm9sZSk7XG5cdGxldCBpbmRleFByZXZFbGVtZW50ID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChjaGlsZHJlbiwgY2hpbGQpIC0gMTtcblx0aWYoaW5kZXhQcmV2RWxlbWVudCA8IDApIHJldHVybiBmYWxzZTtcblxuXHRyZXR1cm4gY2hpbGRyZW5baW5kZXhQcmV2RWxlbWVudF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXROZXh0KGNoaWxkLCBwYXJlbnQsIHJvbGUpIHtcblx0aWYoIXBhcmVudCkgcmV0dXJuIGZhbHNlO1xuXG5cdGxldCBjaGlsZHJlbiA9IGdldENoaWxkcmVuKHBhcmVudCwgcm9sZSk7XG5cdGxldCBpbmRleE5leHQgPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGNoaWxkcmVuLCBjaGlsZCkgKyAxO1xuXHRpZihpbmRleE5leHQgPj0gY2hpbGRyZW4ubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG5cblx0cmV0dXJuIGNoaWxkcmVuW2luZGV4TmV4dF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydChjaGlsZCwgcGFyZW50LCByb2xlKSB7XG5cdGlmKCFwYXJlbnQpIHJldHVybiBmYWxzZTtcblx0bGV0IGNoaWxkcmVuID0gZ2V0Q2hpbGRyZW4ocGFyZW50LCByb2xlKTtcblx0cmV0dXJuIGNoaWxkcmVuWzBdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW5kKGNoaWxkLCBwYXJlbnQsIHJvbGUpIHtcblx0aWYoIXBhcmVudCkgcmV0dXJuIGZhbHNlO1xuXHRsZXQgY2hpbGRyZW4gPSBnZXRDaGlsZHJlbihwYXJlbnQsIHJvbGUpO1xuXHRyZXR1cm4gY2hpbGRyZW5bY2hpbGRyZW4ubGVuZ3RoIC0gMV07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0bWFwOiBheUluc3RhbmNlcyxcblx0Z2V0OiBheUluc3RhbmNlcy5nZXQuYmluZChheUluc3RhbmNlcyksXG5cdHNldDogYXlJbnN0YW5jZXMuc2V0LmJpbmQoYXlJbnN0YW5jZXMpLFxuXHRoYXM6IGF5SW5zdGFuY2VzLmhhcy5iaW5kKGF5SW5zdGFuY2VzKSxcblx0Z2V0Q2hpbGRyZW4sXG5cdGdldFBhcmVudCxcblx0Z2V0UHJldixcblx0Z2V0TmV4dCxcblx0Z2V0U3RhcnQsXG5cdGdldEVuZFxufTsiLCJpbXBvcnQgZWxlbWVudHMgZnJvbSBcIi4vZWxlbWVudHNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xyXG5cdGxldCBheSA9IGVsZW1lbnRzLmdldChkb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcclxuXHJcblx0aWYoIWF5KSByZXR1cm47XHJcblx0aWYoYXkuYWN0aXZlRGVzY2VuZGFudCkgcmV0dXJuIGF5LmFjdGl2ZURlc2NlbmRhbnQ7XHJcblxyXG5cdHJldHVybiBheTtcclxufSIsIi8qKlxyXG4gKiBGb2xsb3dzIGh0dHBzOi8vd3d3LnczLm9yZy9UUi8yMDE3L1dELWh0bWwtYXJpYS0yMDE3MTAxMy8jZG9jY29uZm9ybWFuY2VcclxuICovXHJcblxyXG4vKipcclxuICogQWxsIGFyaWEgcm9sZXNcclxuICogQHR5cGUge0FycmF5fVxyXG4qL1xyXG5pbXBvcnQgcm9sZXMgZnJvbSBcIi4vLi4vZGF0YS9yb2xlcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyBpbmZvIHdoaWNoIGlzIHVzZWQgaW4gZnVuY3Rpb25zIG9mIHJvbGVQZXJIVE1MVGFnLFxyXG4gKiBtb3N0bHkgYSBrZXkgYXMgdGFnTmFtZSB3aXRoIGFuIGFycmF5IG9mIGFsbG93ZWQgcm9sZXMgZm9yIHRoYXQgdGFnXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqL1xyXG52YXIgYWxsb3dlZFJvbGVzID0ge1xyXG5cdFwiYVdpdGhIcmVmXCI6IFtcclxuXHRcdFwiYnV0dG9uXCIsIFwiY2hlY2tib3hcIiwgXCJtZW51aXRlbVwiLCBcIm1lbnVpdGVtY2hlY2tib3hcIiwgXCJtZW51aXRlbXJhZGlvXCIsXHJcblx0XHRcIm9wdGlvblwiLCBcInJhZGlvXCIsIFwic3dpdGNoXCIsIFwidGFiXCIsIFwidHJlZWl0ZW1cIiwgXCJkb2MtYmFja2xpbmtcIixcclxuXHRcdFwiZG9jLWJpYmxpb3JlZlwiLCBcImRvYy1nbG9zc3JlZlwiLCBcImRvYy1ub3RlcmVmXCJcclxuXHRdLFxyXG5cdFwiYXJ0aWNsZVwiOiBbXHJcblx0XHRcImZlZWRcIiwgXCJwcmVzZW50YXRpb25cIiwgXCJub25lXCIsIFwiZG9jdW1lbnRcIiwgXCJhcHBsaWNhdGlvblwiLCBcIm1haW5cIiwgXCJyZWdpb25cIlxyXG5cdF0sXHJcblx0XCJhc2lkZVwiOiBbXHJcblx0XHRcImZlZWRcIiwgXCJub3RlXCIsIFwicHJlc2VudGF0aW9uXCIsIFwibm9uZVwiLCBcInJlZ2lvblwiLCBcInNlYXJjaFwiLCBcImRvYy1leGFtcGxlXCIsXHJcblx0XHRcImRvYy1mb290bm90ZVwiLCBcImRvYy1wdWxscXVvdGVcIiwgXCJkb2MtdGlwXCJcclxuXHRdLFxyXG5cdFwiYnV0dG9uXCI6IFtcclxuXHRcdFwiY2hlY2tib3hcIiwgXCJsaW5rXCIsIFwibWVudWl0ZW1cIiwgXCJtZW51aXRlbWNoZWNrYm94XCIsIFwibWVudWl0ZW1yYWRpb1wiLFxyXG5cdFx0XCJvcHRpb25cIiwgXCJyYWRpb1wiLCBcInN3aXRjaFwiLCBcInRhYlwiXHJcblx0XSxcclxuXHRcImRsXCI6IFtcImdyb3VwXCIsIFwicHJlc2VudGF0aW9uXCIsIFwibm9uZVwiLCBcImRvYy1nbG9zc2FyeVwiXSxcclxuXHRcImVtYmVkXCI6IFsgXCJhcHBsaWNhdGlvblwiLCBcImRvY3VtZW50XCIsIFwicHJlc2VudGF0aW9uXCIsIFwibm9uZVwiLCBcImltZ1wiIF0sXHJcblx0XCJmaWdjYXB0aW9uXCI6IFsgXCJncm91cFwiLCBcInByZXNlbnRhdGlvblwiLCBcIm5vbmVcIiBdLFxyXG5cdFwiZmllbGRzZXRcIjogXHRbIFwiZ3JvdXBcIiwgXCJwcmVzZW50YXRpb25cIiwgXCJub25lXCIgXSxcclxuXHRcImZvb3RlclwiOiBbIFwiZ3JvdXBcIiwgXCJub25lXCIsIFwicHJlc2VudGF0aW9uXCIsIFwiZG9jLWZvb3Rub3RlXCIgXSxcclxuXHRcImZvcm1cIjogWyBcInNlYXJjaFwiLCBcIm5vbmVcIiwgXCJwcmVzZW50YXRpb25cIiBdLFxyXG5cdFwiaDFUb2g2XCI6IFsgXCJ0YWJcIiwgXCJub25lXCIsIFwicHJlc2VudGF0aW9uXCIsIFwiZG9jLXN1YnRpdGxlXCIgXSxcclxuXHRcImhlYWRlclwiOiBbIFwiZ3JvdXBcIiwgXCJub25lXCIsIFwicHJlc2VudGF0aW9uXCIsIFwiZG9jLWZvb3Rub3RlXCIgXSxcclxuXHRcImhyXCI6IFsgXCJwcmVzZW50YXRpb25cIiwgXCJkb2MtcGFnZWJyZWFrXCIgXSxcclxuXHRcImlmcmFtZVwiOiBbIFwiYXBwbGljYXRpb25cIiwgXCJkb2N1bWVudFwiLCBcImltZ1wiIF0sXHJcblx0XCJpbWdXaXRoRW1wdHlBbHRcIjogWyBcInByZXNlbnRhdGlvblwiLCBcIm5vbmVcIiBdLFxyXG5cdFwiaW5wdXRUeXBlQnV0dG9uXCI6IFtcclxuXHRcdFwibGluaywgbWVudWl0ZW1cIiwgXCJtZW51aXRlbWNoZWNrYm94XCIsIFwibWVudWl0ZW1yYWRpb1wiLCBcInJhZGlvXCIsIFwic3dpdGNoXCIsXHJcblx0XHRcIm9wdGlvblwiLCBcInRhYlwiXHJcblx0XSxcclxuXHRcImlucHV0VHlwZUltYWdlXCI6IFtcclxuXHRcdFwibGlua1wiLCBcIm1lbnVpdGVtXCIsIFwibWVudWl0ZW1jaGVja2JveFwiLCBcIm1lbnVpdGVtcmFkaW9cIiwgXCJyYWRpb1wiLCBcInN3aXRjaFwiXHJcblx0XSxcclxuXHRcImlucHV0VHlwZUNoZWNrYm94XCI6IFsgXCJidXR0b25cIiwgXCJtZW51aXRlbWNoZWNrYm94XCIsIFwib3B0aW9uXCIsIFwic3dpdGNoXCIgXSxcclxuXHRcImxpXCI6IFtcclxuXHRcdFwibWVudWl0ZW1cIiwgXCJtZW51aXRlbWNoZWNrYm94XCIsIFwibWVudWl0ZW1yYWRpb1wiLCBcIm9wdGlvblwiLCBcIm5vbmVcIixcclxuXHRcdFwicHJlc2VudGF0aW9uXCIsIFwicmFkaW9cIiwgXCJzZXBhcmF0b3JcIiwgXCJ0YWJcIiwgXCJ0cmVlaXRlbVwiLCBcImRvYy1iaWJsaW9lbnRyeVwiLFxyXG5cdFx0XCJkb2MtZW5kbm90ZVwiXHJcblx0XSxcclxuXHRcIm5hdlwiOiBbIFwiZG9jLWluZGV4XCIsIFwiZG9jLXBhZ2VsaXN0XCIsIFwiZG9jLXRvY1wiIF0sXHJcblx0XCJvYmplY3RcIjogWyBcImFwcGxpY2F0aW9uXCIsIFwiZG9jdW1lbnRcIiwgXCJpbWdcIiBdLFxyXG5cdFwib2xcIjogW1xyXG5cdFx0XCJkaXJlY3RvcnlcIiwgXCJncm91cFwiLCBcImxpc3Rib3hcIiwgXCJtZW51XCIsIFwibWVudWJhcixub25lXCIsIFwicHJlc2VudGF0aW9uIFwiLFxyXG5cdFx0XCJyYWRpb2dyb3VwXCIsIFwidGFibGlzdFwiLCBcInRvb2xiYXJcIiwgXCJ0cmVlXCJcclxuXHRdLFxyXG5cdFwic2VjdGlvblwiOiBbXHJcblx0XHRcImFsZXJ0XCIsIFwiYWxlcnRkaWFsb2dcIiwgXCJhcHBsaWNhdGlvblwiLCBcImJhbm5lclwiLCBcImNvbXBsZW1lbnRhcnlcIixcclxuXHRcdFwiY29udGVudGluZm9cIiwgXCJkaWFsb2dcIiwgXCJkb2N1bWVudFwiLCBcImZlZWRcIiwgXCJsb2dcIiwgXCJtYWluXCIsIFwibWFycXVlZVwiLFxyXG5cdFx0XCJuYXZpZ2F0aW9uXCIsIFwibm9uZVwiLCBcInByZXNlbnRhdGlvblwiLCBcInNlYXJjaFwiLCBcInN0YXR1c1wiLCBcInRhYnBhbmVsXCIsXHJcblx0XHRcImRvYy1hYnN0cmFjdFwiLCBcImRvYy1hY2tub3dsZWRnbWVudHNcIiwgXCJkb2MtYWZ0ZXJ3b3JkXCIsIFwiZG9jLWFwcGVuZGl4XCIsXHJcblx0XHRcImRvYy1iaWJsaW9ncmFwaHlcIiwgXCJkb2MtY2hhcHRlclwiLCBcImRvYy1jb2xvcGhvblwiLCBcImRvYy1jb25jbHVzaW9uXCIsXHJcblx0XHRcImRvYy1jcmVkaXRcIiwgXCJkb2MtY3JlZGl0c1wiLCBcImRvYy1kZWRpY2F0aW9uXCIsIFwiZG9jLWVuZG5vdGVzXCIsIFwiZG9jLWVwaWxvZ3VlXCIsXHJcblx0XHRcImRvYy1lcnJhdGFcIiwgXCJkb2MtZXhhbXBsZVwiLCBcImRvYy1mb3Jld29yZFwiLCBcImRvYy1pbmRleFwiLCBcImRvYy1pbnRyb2R1Y3Rpb25cIixcclxuXHRcdFwiZG9jLW5vdGljZVwiLCBcImRvYy1wYWdlbGlzdFwiLCBcImRvYy1wYXJ0XCIsIFwiZG9jLXByZWZhY2VcIiwgXCJkb2MtcHJvbG9ndWVcIixcclxuXHRcdFwiZG9jLXB1bGxxdW90ZVwiLCBcImRvYy1xbmFcIiwgXCJkb2MtdG9jXCJcclxuXHRdLFxyXG5cdFwic3ZnXCI6IFsgXCJhcHBsaWNhdGlvblwiLCBcImRvY3VtZW50XCIsIFwiaW1nXCIgXSxcclxuXHRcInVsXCI6IFtcclxuXHRcdFwiZGlyZWN0b3J5XCIsIFwiZ3JvdXBcIiwgXCJsaXN0Ym94XCIsIFwibWVudVwiLCBcIm1lbnViYXJcIiwgXCJyYWRpb2dyb3VwXCIsXHJcblx0XHRcInRhYmxpc3RcIiwgXCJ0b29sYmFyXCIsIFwidHJlZVwiLCBcInByZXNlbnRhdGlvblwiXHJcblx0XVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbnRhaW5zIGEgZnVuY3Rpb24gZm9yIGVhY2ggaHRtbFRhZyB3aGVyZSBub3QgYWxsIHJvbGVzIGFsbG93ZWRcclxuICogQHR5cGUge09iamVjdH1cclxuICovXHJcbnZhciByb2xlUGVySFRNTFRhZyA9IHtcclxuXHRhOiAoZWwsIHJvbGUpID0+IHtcclxuXHRcdGlmKGVsLmhyZWYpIHtcclxuXHRcdFx0cmV0dXJuIGhhc0FsbG93ZWRSb2xlKFwiYVdpdGhIcmVmXCIsIHJvbGUpID8gcm9sZSA6IFwibGlua1wiO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIHJvbGU7XHJcblx0XHR9XHJcblx0fSxcclxuXHRhcmVhOiAoZWwsIHJvbGUpID0+IHtcclxuXHRcdGlmKGVsLmhyZWYpIHJldHVybiByb2xlID8gbnVsbCA6IFwibGlua1wiO1xyXG5cdFx0cmV0dXJuIHJvbGU7XHJcblx0fSxcclxuXHRhcnRpY2xlOiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwiYXJ0aWNsZVwiLCByb2xlKSA/IHJvbGUgOiBcImFydGljbGVcIixcclxuXHRhc2lkZTogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcImFzaWRlXCIsIHJvbGUpID8gcm9sZSA6IFwiY29tcGxlbWVudGFyeVwiLFxyXG5cdGF1ZGlvOiAoZWwsIHJvbGUpID0+IHJvbGUgPT0gXCJhcHBsaWNhdGlvblwiID8gXCJhcHBsaWNhdGlvblwiIDogbnVsbCxcclxuXHRiYXNlOiAoKSA9PiBudWxsLFxyXG5cdGJvZHk6ICgpID0+IFwiZG9jdW1lbnRcIixcclxuXHRidXR0b246IChlbCwgcm9sZSkgPT4ge1xyXG5cdFx0aWYoZWwudHlwZSA9PSBcIm1lbnVcIikge1xyXG5cdFx0XHRyZXR1cm4gcm9sZSA9PSBcIm1lbnVpdGVtXCIgPyBcIm1lbnVpdGVtXCIgOiBcImJ1dHRvblwiO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGhhc0FsbG93ZWRSb2xlKFwiYnV0dG9uXCIsIHJvbGUpID8gcm9sZSA6IFwiYnV0dG9uXCI7XHJcblx0fSxcclxuXHRjYXB0aW9uOiAoKSA9PiBudWxsLFxyXG5cdGNvbDogKCkgPT4gbnVsbCxcclxuXHRjb2xncm91cDogKCkgPT4gbnVsbCxcclxuXHRkYXRhbGlzdDogKCkgPT4gXCJsaXN0Ym94XCIsXHJcblx0ZGQ6ICgpID0+IFwiZGVmaW5pdGlvblwiLFxyXG5cdGRldGFpbHM6ICgpID0+IFwiZ3JvdXBcIixcclxuXHRkaWFsb2c6IChlbCwgcm9sZSkgPT4gcm9sZSA9PSBcImFsZXJ0ZGlhbG9nXCIgPyBcImFsZXJ0ZGlhbG9nXCIgOiBcImRpYWxvZ1wiLFxyXG5cdGRsOiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwiZGxcIiwgcm9sZSkgPyByb2xlIDogXCJsaXN0XCIsXHJcblx0ZHQ6ICgpID0+IFwibGlzdGl0ZW1cIixcclxuXHRlbWJlZDogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcImVtYmVkXCIsIHJvbGUpID8gcm9sZSA6IG51bGwsXHJcblx0ZmlnY2FwdGlvbjogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcImZpZ2NhcHRpb25cIiwgcm9sZSkgPyByb2xlIDogbnVsbCxcclxuXHRmaWVsZHNldDogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcImZpZWxkc2V0XCIsIHJvbGUpPyByb2xlIDogbnVsbCxcclxuXHRmaWd1cmU6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJmaWd1cmVcIiwgcm9sZSkgPyByb2xlIDogXCJmaWd1cmVcIixcclxuXHRmb290ZXI6IChlbCwgcm9sZSkgPT4ge1xyXG5cdFx0bGV0IGhhc0ltcGxpY2l0Q29udGVudGluZm9Sb2xlID0gIWdldFBhcmVudFdpdGhUYWdOYW1lKGVsLCBbXCJBUlRJQ0xFXCIsIFwiQVNJREVcIiwgXCJNQUlOXCIsIFwiTkFWXCIsIFwiU0VDVElPTlwiXSk7XHJcblx0XHRsZXQgaGFzQWxsb3dlZFJvbGUgPSBoYXNBbGxvd2VkUm9sZShcImZvb3RlclwiLCByb2xlKTtcclxuXHRcdGlmKGhhc0FsbG93ZWRSb2xlKXtcclxuXHRcdFx0cmV0dXJuIHJvbGU7XHJcblx0XHR9IGVsc2UgaWYgKGhhc0ltcGxpY2l0Q29udGVudGluZm9Sb2xlKSB7XHJcblx0XHRcdHJldHVybiBcImNvbnRlbnRpbmZvXCI7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGZvcm06IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJmb3JtXCIsIHJvbGUpID8gcm9sZSA6IFwiZm9ybVwiLFxyXG5cdGgxOiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwiaDFUb2g2XCIsIHJvbGUpID8gcm9sZSA6IFwiaGVhZGluZ1wiLFxyXG5cdGgyOiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwiaDFUb2g2XCIsIHJvbGUpID8gcm9sZSA6IFwiaGVhZGluZ1wiLFxyXG5cdGgzOiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwiaDFUb2g2XCIsIHJvbGUpID8gcm9sZSA6IFwiaGVhZGluZ1wiLFxyXG5cdGg0OiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwiaDFUb2g2XCIsIHJvbGUpID8gcm9sZSA6IFwiaGVhZGluZ1wiLFxyXG5cdGg1OiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwiaDFUb2g2XCIsIHJvbGUpID8gcm9sZSA6IFwiaGVhZGluZ1wiLFxyXG5cdGg2OiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwiaDFUb2g2XCIsIHJvbGUpID8gcm9sZSA6IFwiaGVhZGluZ1wiLFxyXG5cdGhlYWQ6ICgpID0+IG51bGwsXHJcblx0aGVhZGVyOiAoZWwsIHJvbGUpID0+IHtcclxuXHRcdGxldCBoYXNJbXBsaWNpdEJhbm5lclJvbGUgPSAhZ2V0UGFyZW50V2l0aFRhZ05hbWUoZWwsIFtcIkFSVElDTEVcIiwgXCJBU0lERVwiLCBcIk1BSU5cIiwgXCJOQVZcIiwgXCJTRUNUSU9OXCJdKTtcclxuXHRcdGxldCBoYXNBbGxvd2VkUm9sZSA9IGhhc0FsbG93ZWRSb2xlKFwiaGVhZGVyXCIsIHJvbGUpO1xyXG5cdFx0aWYoaGFzQWxsb3dlZFJvbGUpe1xyXG5cdFx0XHRyZXR1cm4gcm9sZTtcclxuXHRcdH0gZWxzZSBpZiAoaGFzSW1wbGljaXRCYW5uZXJSb2xlKSB7XHJcblx0XHRcdHJldHVybiBcImJhbm5lclwiO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblx0fSxcclxuXHRocjogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcImhyXCIsIHJvbGUpID8gcm9sZSA6IFwic2VwZXJhdG9yXCIsXHJcblx0aHRtbDogKCkgPT4gbnVsbCxcclxuXHRpZnJhbWU6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJpZnJhbWVcIiwgcm9sZSkgPyByb2xlIDogbnVsbCxcclxuXHRpbWc6IChlbCwgcm9sZSkgPT4ge1xyXG5cdFx0dmFyIGhhc0FsbG93ZWRFbXB0eUFsdFJvbGUgPSBoYXNBbGxvd2VkUm9sZShcImltZ1dpdGhFbXB0eUFsdFwiLCByb2xlKTtcclxuXHJcblx0XHRpZihlbC5hbHQpIHtcclxuXHRcdFx0Ly8gYW55IHJvbGUgZXhlcHQgdGhlIHJvbGVzIHVzZWQgYnkgZW1wdHkgYWx0IHZhbHVlc1xyXG5cdFx0XHRyZXR1cm4gaGFzQWxsb3dlZEVtcHR5QWx0Um9sZSA/IFwiaW1nXCIgOiByb2xlO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIGhhc0FsbG93ZWRFbXB0eUFsdFJvbGUgPyByb2xlIDogbnVsbDtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGlucHV0OiAoZWwsIHJvbGUpID0+IHtcclxuXHRcdHN3aXRjaChlbC50eXBlKSB7XHJcblx0XHRcdGNhc2UgXCJidXR0b25cIjpcclxuXHRcdFx0XHRyZXR1cm4gaGFzQWxsb3dlZFJvbGUoXCJpbnB1dFR5cGVCdXR0b25cIiwgcm9sZSkgPyByb2xlIDogXCJidXR0b25cIjtcclxuXHRcdFx0Y2FzZSBcImNoZWNrYm94XCI6XHJcblx0XHRcdFx0cmV0dXJuIGhhc0FsbG93ZWRSb2xlKFwiaW5wdXRUeXBlQ2hlY2tib3hcIiwgcm9sZSkgPyByb2xlIDogXCJjaGVja2JveFwiO1xyXG5cdFx0XHRjYXNlIFwiaW1hZ2VcIjpcclxuXHRcdFx0XHRyZXR1cm4gaGFzQWxsb3dlZFJvbGUoXCJpbnB1dFR5cGVJbWFnZVwiLCByb2xlKSA/IHJvbGUgOiBcImJ1dHRvblwiO1xyXG5cdFx0XHRjYXNlIFwibnVtYmVyXCI6XHJcblx0XHRcdFx0cmV0dXJuIFwic3BpbmJ1dHRvblwiO1xyXG5cdFx0XHRjYXNlIFwicmFkaW9cIjpcclxuXHRcdFx0XHRyZXR1cm4gcm9sZSA9PSBcIm1lbnVpdGVtcmFkaW9cIiA/IFwibWVudWl0ZW1yYWRpb1wiIDogXCJyYWRpb1wiO1xyXG5cdFx0XHRjYXNlIFwicmFuZ2VcIjpcclxuXHRcdFx0XHRyZXR1cm4gXCJzbGlkZXJcIjtcclxuXHRcdFx0Y2FzZSBcInNlYXJjaFwiOlxyXG5cdFx0XHRcdHJldHVybiBlbC5saXN0ID8gXCJjb21ib2JveFwiIDogXCJzZWFyY2hib3hcIjtcclxuXHRcdFx0Y2FzZSBcInJlc2V0XCI6XHJcblx0XHRcdGNhc2UgXCJzdWJtaXRcIjpcclxuXHRcdFx0XHRyZXR1cm4gXCJidXR0b25cIjtcclxuXHRcdFx0Y2FzZSBcImVtYWlsXCI6XHJcblx0XHRcdGNhc2UgXCJ0ZWxcIjpcclxuXHRcdFx0Y2FzZSBcInRleHRcIjpcclxuXHRcdFx0Y2FzZSBcInVybFwiOlxyXG5cdFx0XHRcdHJldHVybiBlbC5saXN0ID8gXCJjb21ib2JveFwiIDogXCJ0ZXh0Ym94XCI7XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblx0fSxcclxuXHRrZXlnZW46ICgpID0+IG51bGwsXHJcblx0bGFiZWw6ICgpID0+IG51bGwsXHJcblx0bGVnZW5kOiAoKSA9PiBudWxsLFxyXG5cdGxpOiAoZWwsIHJvbGUpID0+IHtcclxuXHRcdGxldCBoYXNJbXBsaWNpdExpc3RpdGVtUm9sZSA9IGdldFBhcmVudFdpdGhUYWdOYW1lKGVsLCBbXCJPTFwiLCBcIlVMXCJdKTtcclxuXHJcblx0XHRpZihoYXNJbXBsaWNpdExpc3RpdGVtUm9sZSkge1xyXG5cdFx0XHRyZXR1cm4gaGFzQWxsb3dlZFJvbGUoXCJsaVwiLCByb2xlKSA/IHJvbGUgOiBcImxpc3RpdGVtXCI7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gcm9sZTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGxpbms6IChlbCwgcm9sZSkgPT4ge1xyXG5cdFx0aWYoZWwuaHJlZikgcmV0dXJuIHJvbGUgPyBudWxsIDogXCJsaW5rXCI7XHJcblx0XHRyZXR1cm4gcm9sZTtcclxuXHR9LFxyXG5cdG1haW46ICgpID0+IFwibWFpblwiLFxyXG5cdG1hcDogKCkgPT4gbnVsbCxcclxuXHRtYXRoOiAoKSA9PiBcIm1hdGhcIixcclxuXHRtZW51OiAoZWwsIHJvbGUpID0+IGVsLnR5cGUgPT0gXCJjb250ZXh0XCIgPyBcIm1lbnVcIiA6IHJvbGUsXHJcblx0bWVudWl0ZW06IChlbCwgcm9sZSkgPT4ge1xyXG5cdFx0c3dpdGNoIChlbC50eXBlKSB7XHJcblx0XHRcdGNhc2UgXCJjb21tYW5kXCI6XHJcblx0XHRcdFx0cmV0dXJuIFwibWVudWl0ZW1cIjtcclxuXHRcdFx0Y2FzZSBcImNoZWNrYm94XCI6XHJcblx0XHRcdFx0cmV0dXJuIFwibWVudWl0ZW1jaGVja2JveFwiO1xyXG5cdFx0XHRjYXNlIFwicmFkaW9cIjpcclxuXHRcdFx0XHRyZXR1cm4gXCJtZW51aXRlbXJhZGlvXCI7XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0cmV0dXJuIHJvbGU7XHJcblx0XHR9XHJcblx0fSxcclxuXHRtZXRhOiAoKSA9PiBudWxsLFxyXG5cdG1ldGVyOiAoKSA9PiBudWxsLFxyXG5cdG5hdjogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcIm5hdlwiLCByb2xlKSA/IHJvbGUgOiBcIm5hdmlnYXRpb25cIixcclxuXHRub3NjcmlwdDogKCkgPT4gbnVsbCxcclxuXHRvYmplY3Q6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJvYmplY3RcIiwgcm9sZSkgPyByb2xlIDogbnVsbCxcclxuXHRvbDogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcIm9sXCIsIHJvbGUpID8gcm9sZSA6IFwibGlzdFwiLFxyXG5cdG9wdGdyb3VwOiAoKSA9PiBcImdyb3VwXCIsXHJcblx0b3B0aW9uOiAoZWwpID0+IHtcclxuXHRcdGxldCB3aXRoaW5PcHRpb25MaXN0ID0gW1wic2VsZWN0XCIsIFwib3B0Z3JvdXBcIiwgXCJkYXRhbGlzdFwiXS5pbmRleE9mKGVsLnBhcmVudE5vZGUpID4gLTE7XHJcblx0XHRyZXR1cm4gd2l0aGluT3B0aW9uTGlzdCA/IFwib3B0aW9uXCIgOiBudWxsO1xyXG5cdH0sXHJcblx0b3V0cHV0OiAoZWwsIHJvbGUpID0+IHJvbGUgPyByb2xlIDogXCJzdGF0dXNcIixcclxuXHRwYXJhbTogKCkgPT4gbnVsbCxcclxuXHRwaWN0dXJlOiAoKSA9PiBudWxsLFxyXG5cdHByb2dyZXNzOiAoKSA9PiBcInByb2dyZXNzYmFyXCIsXHJcblx0c2NyaXB0OiAoKSA9PiBudWxsLFxyXG5cdHNlY3Rpb246IChlbCwgcm9sZSkgPT4ge1xyXG5cdFx0bGV0IGhhc1ZhbGlkUm9sZSA9IGhhc0FsbG93ZWRSb2xlKFwic2VjdGlvblwiLCByb2xlKTtcclxuXHRcdGlmKGhhc1ZhbGlkUm9sZSkgcmV0dXJuIHJvbGU7XHJcblxyXG5cdFx0Ly8gb25seSBpZiBhY2Nlc3NpYmxlIG5hbWVcclxuXHRcdGlmKGVsLnRpdGxlIHx8IGVsLmhhc0F0dHJpYnV0ZShcImFyaWEtbGFiZWxcIikgfHwgZWwuaGFzQXR0cmlidXRlKFwiYXJpYS1sYWJlbGxlZGJ5XCIpKXtcclxuXHRcdFx0cmV0dXJuIFwic2VjdGlvblwiO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIHJvbGU7XHJcblx0XHR9XHJcblx0fSxcclxuXHRzZWxlY3Q6IChlbCwgcm9sZSkgPT4ge1xyXG5cdFx0aWYoZWwubXVsdGlwbGUgJiYgZWwuc2l6ZSA+IDEpe1xyXG5cdFx0XHRyZXR1cm4gXCJsaXN0Ym94XCI7XHJcblx0XHR9IGVsc2UgaWYoIWVsLm11bHRpcGxlICYmIGVsLnNpemUgPD0gMSkge1xyXG5cdFx0XHRyZXR1cm4gcm9sZSA9PSBcIm1lbnVcIiA/IHJvbGUgOiBcImNvbWJvYm94XCI7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJvbGU7XHJcblx0fSxcclxuXHRzb3VyY2U6ICgpID0+IG51bGwsXHJcblx0c3R5bGU6ICgpID0+IG51bGwsXHJcblx0c3ZnOiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwic3ZnXCIsIHJvbGUpID8gcm9sZSA6IG51bGwsXHJcblx0c3VtbWFyeTogKCkgPT4gXCJidXR0b25cIixcclxuXHR0YWJsZTogKGVsLCByb2xlKSA9PiByb2xlID8gcm9sZSA6IFwidGFibGVcIixcclxuXHR0ZW1wbGF0ZTogKCkgPT4gbnVsbCxcclxuXHR0ZXh0YXJlYTogKCkgPT4gXCJ0ZXh0Ym94XCIsXHJcblx0dGhlYWQ6IChlbCwgcm9sZSkgPT4gcm9sZSA/IHJvbGUgOiBcInJvd2dyb3VwXCIsXHJcblx0dGJvZHk6IChlbCwgcm9sZSkgPT4gcm9sZSA/IHJvbGUgOiBcInJvd2dyb3VwXCIsXHJcblx0dGZvb3Q6IChlbCwgcm9sZSkgPT4gcm9sZSA/IHJvbGUgOiBcInJvd2dyb3VwXCIsXHJcblx0dGl0bGU6ICgpID0+IG51bGwsXHJcblx0dGQ6IChlbCwgcm9sZSkgPT4gZ2V0UGFyZW50V2l0aFRhZ05hbWUoZWwsIFtcIlRBQkxFXCJdKSA/IFwiY2VsbFwiIDogcm9sZSxcclxuXHR0aDogKGVsLCByb2xlKSA9PiB7XHJcblx0XHRpZihyb2xlKSByZXR1cm4gcm9sZTtcclxuXHRcdHJldHVybiBnZXRQYXJlbnRXaXRoVGFnTmFtZShlbCwgW1wiVEhFQURcIl0pID8gXCJjb2x1bW5oZWFkZXJcIiA6IFwicm93aGVhZGVyXCI7XHJcblx0fSxcclxuXHR0cjogKGVsLCByb2xlKSA9PiB7XHJcblx0XHQvLyByb2xlPXJvdywgbWF5IGJlIGV4cGxpY2l0bHkgZGVjbGFyZWQgd2hlbiBjaGlsZCBvZiBhIHRhYmxlIGVsZW1lbnQgd2l0aCByb2xlPWdyaWRcclxuXHRcdHJldHVybiByb2xlID8gcm9sZSA6IFwicm93XCI7XHJcblx0fSxcclxuXHR0cmFjazogKCkgPT4gbnVsbCxcclxuXHR1bDogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcInVsXCIsIHJvbGUpID8gcm9sZSA6IFwibGlzdFwiLFxyXG5cdHZpZGVvOiAoZWwsIHJvbGUpID0+IHJvbGUgPT0gXCJhcHBsaWNhdGlvblwiID8gXCJhcHBsaWNhdGlvblwiIDogbnVsbFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZpbmRzIG5lYXJlc3QgcGFyZW50IHdpdGggYSBzcGVjaWZpZyB0YWdOYW1lXHJcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBcdFx0ZWwgICAgICBcdFx0Y2hpbGQgLSBzdGFydGluZyBwb2ludGVyXHJcbiAqIEBwYXJhbSAge0FycmF5PFN0cmluZz59IFx0dGFnTmFtZSBcdFx0QXJyYXkgY29udGFpbmcgY2FwYXRpbGl6ZWQgdGFnbmFtZXNcclxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9ICAgICAgICAgXHRcdFx0XHRQYXJlbnQgdGhhdCBtYXRjaGVzIG9uZSBvZiB0aGUgdGFnbmFtZXNcclxuICovXHJcbmZ1bmN0aW9uIGdldFBhcmVudFdpdGhUYWdOYW1lKGVsLCB0YWdOYW1lKSB7XHJcblx0d2hpbGUgKGVsLnBhcmVudE5vZGUpe1xyXG5cdFx0aWYodGFnTmFtZS5pbmRleE9mKGVsLnRhZ05hbWUpID4gLTEpIHJldHVybiBlbDtcclxuXHRcdGVsID0gZWwucGFyZW50Tm9kZTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgZ2l2ZW4gcm9sZSBpcyBhbGxvd2VkIGZvciBnaXZlbiB0YWdcclxuICogQHBhcmFtICB7c3RyaW5nfSAgdGFnTmFtZSBrZXkgb2YgYWxsb3dlZFJvbGVzXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gIHJvbGUgICAgY3VycmVudCByb2xlXHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59ICAgICAgICAgVHJ1ZSBpZiBhbGxvd2VkXHJcbiAqL1xyXG5mdW5jdGlvbiBoYXNBbGxvd2VkUm9sZSh0YWdOYW1lLCByb2xlKSB7XHJcblx0cmV0dXJuIGFsbG93ZWRSb2xlc1t0YWdOYW1lXS5pbmRleE9mKHJvbGUpID4gLTE7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldENvbXB1dGVkUm9sZShlbCkge1xyXG5cdHZhciByb2xlID0gZWwuZ2V0QXR0cmlidXRlKFwicm9sZVwiKTtcclxuXHQvLyBjaGVjayBpZiBnaXZlbiByb2xlIGV4aXN0XHJcblx0aWYocm9sZSkgcm9sZSA9IHJvbGVzW3JvbGVdID8gcm9sZSA6IG51bGw7XHJcblxyXG5cdHZhciB0YWdOYW1lID0gZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cdC8vIGNhbGwgcG9zc2libGUgY3VzdG9tIGZ1bmN0aW9uIGlmIHRhZyBoYXMgYW55XHJcblx0aWYgKHJvbGVQZXJIVE1MVGFnW3RhZ05hbWVdKSByZXR1cm4gcm9sZVBlckhUTUxUYWdbdGFnTmFtZV0oZWwsIHJvbGUpO1xyXG5cclxuXHQvLyBkZWZhdWx0IGJlaGF2aW9yIGEuay5hLiBzZXQgcm9sZVxyXG5cdHJldHVybiByb2xlO1xyXG59IiwiLyoqXHJcbiAqIFNjcm9sbHMgYW4gZWxlbWVudCBpbnRvIGl0cyBwYXJlbnQgdmlld1xyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGNoaWxkIEVsZW1lbnQgdG8gc2hvd1xyXG4gKi9cclxuZnVuY3Rpb24gc2Nyb2xsSW50b1ZpZXcoY2hpbGQpIHtcclxuXHRsZXQgcGFyZW50ID0gY2hpbGQub2Zmc2V0UGFyZW50O1xyXG5cdGlmIChwYXJlbnQgJiYgcGFyZW50LnNjcm9sbEhlaWdodCA+IHBhcmVudC5jbGllbnRIZWlnaHQpIHtcclxuXHRcdHZhciBzY3JvbGxCb3R0b20gPSBwYXJlbnQuY2xpZW50SGVpZ2h0ICsgcGFyZW50LnNjcm9sbFRvcDtcclxuXHRcdHZhciBlbGVtZW50Qm90dG9tID0gY2hpbGQub2Zmc2V0VG9wICsgY2hpbGQub2Zmc2V0SGVpZ2h0O1xyXG5cdFx0aWYgKGVsZW1lbnRCb3R0b20gPiBzY3JvbGxCb3R0b20pIHtcclxuXHRcdFx0cGFyZW50LnNjcm9sbFRvcCA9IGVsZW1lbnRCb3R0b20gLSBwYXJlbnQuY2xpZW50SGVpZ2h0O1xyXG5cdFx0fSBlbHNlIGlmIChjaGlsZC5vZmZzZXRUb3AgPCBwYXJlbnQuc2Nyb2xsVG9wKSB7XHJcblx0XHRcdHBhcmVudC5zY3JvbGxUb3AgPSBjaGlsZC5vZmZzZXRUb3A7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQWRkcyBmb2N1cyB0byB0aGUgZmlyc3QgZWxlbWVudFxyXG4gKiBAcGFyYW0ge0FycmF5fSBkZXNjZW5kYW50cyBBcnJheSBvZiBhbGwgZGVzY2VuZGFudHNcclxuICovXHJcbmZ1bmN0aW9uIHN0YXJ0KGRlc2NlbmRhbnRzKSB7XHJcblx0cmV0dXJuIGFkZChkZXNjZW5kYW50c1swXSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBZGRzIGZvY3VzIHRvIHRoZSBwcmV2IGVsZW1lbnRcclxuICogQHBhcmFtIHtBcnJheX0gZGVzY2VuZGFudHMgQXJyYXkgb2YgYWxsIGRlc2NlbmRhbnRzXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBcdGNoaWxkIFx0XHRcdEN1cnJlbnQgZm9jdXNlZCBlbGVtZW50XHJcbiAqL1xyXG5mdW5jdGlvbiBwcmV2KGRlc2NlbmRhbnRzLCBjaGlsZCkge1xyXG5cdC8vIGZpbmQgaW5kZXggb2YgY3VycmVudCBlbGVtZW50XHJcblx0bGV0IGkgPSBkZXNjZW5kYW50cy5pbmRleE9mKGNoaWxkKTtcclxuXHRpZihpIDw9IDApIGkgPSAxO1xyXG5cclxuXHRyZXR1cm4gYWRkKGRlc2NlbmRhbnRzW2kgLSAxXSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBZGRzIGZvY3VzIHRvIHRoZSBuZXh0IGVsZW1lbnRcclxuICogQHBhcmFtIHtBcnJheX0gXHRkZXNjZW5kYW50cyBBcnJheSBvZiBhbGwgZGVzY2VuZGFudHNcclxuICogQHBhcmFtIHtPYmplY3R9IFx0Y2hpbGQgXHRcdFx0Q3VycmVudCBmb2N1c2VkIGVsZW1lbnRcclxuICovXHJcbmZ1bmN0aW9uIG5leHQoZGVzY2VuZGFudHMsIGNoaWxkKSB7XHJcblx0Ly8gZmluZCBpbmRleCBvZiBjdXJyZW50IGVsZW1lbnRcclxuXHRsZXQgaSA9IGRlc2NlbmRhbnRzLmluZGV4T2YoY2hpbGQpO1xyXG5cdGlmIChpID4gZGVzY2VuZGFudHMubGVuZ3RoIC0gMikgaSA9IGRlc2NlbmRhbnRzLmxlbmd0aCAtIDI7XHJcblxyXG5cdHJldHVybiBhZGQoZGVzY2VuZGFudHNbaSArIDFdKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFkZHMgZm9jdXMgdG8gdGhlIGxhc3QgZWxlbWVudFxyXG4gKiBAcGFyYW0ge0FycmF5fSBkZXNjZW5kYW50cyBBcnJheSBvZiBhbGwgZGVzY2VuZGFudHNcclxuICovXHJcbmZ1bmN0aW9uIGVuZChkZXNjZW5kYW50cykge1xyXG5cdHJldHVybiBhZGQoZGVzY2VuZGFudHNbZGVzY2VuZGFudHMubGVuZ3RoIC0gMV0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGQoY2hpbGQpIHtcclxuXHRjaGlsZC5fbm9kZS5jbGFzc0xpc3QuYWRkKFwiYXktaG92ZXJcIik7XHJcblx0c2Nyb2xsSW50b1ZpZXcoY2hpbGQuX25vZGUpO1xyXG5cdHJldHVybiBjaGlsZDtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlKGNoaWxkKSB7XHJcblx0Y2hpbGQuX25vZGUuY2xhc3NMaXN0LnJlbW92ZShcImF5LWhvdmVyXCIpO1x0XHJcblx0cmV0dXJuIGNoaWxkO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXQoZGVzY2VuZGFudHMpIHtcclxuXHRsZXQgYXkgPSBkZXNjZW5kYW50cy5maW5kKGFvbSA9PiBhb20uX25vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYXktaG92ZXJcIikpO1xyXG5cdGlmKCFheSkgcmV0dXJuIGRlc2NlbmRhbnRzWzBdO1xyXG5cdHJldHVybiBheTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0U2VsZWN0ZWQoYXksIHZhbCkge1xyXG5cdGF5LnNlbGVjdGVkID0gdmFsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREZXNjZW5kYW50cyhheSkge1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdHN0YXJ0LFxyXG5cdHByZXYsXHJcblx0bmV4dCxcclxuXHRlbmQsXHJcblx0YWRkLFxyXG5cdHJlbW92ZSxcclxuXHRnZXQsXHJcblx0c2V0U2VsZWN0ZWQsXHJcblx0Z2V0RGVzY2VuZGFudHNcclxufTsiLCJpbXBvcnQgc2VsZWN0b3IgZnJvbSAnLi9zZWxlY3Rvcic7XHJcbmltcG9ydCBjcmVhdGUgZnJvbSAnLi9jcmVhdGUnO1xyXG5pbXBvcnQgZWxlbWVudHMgZnJvbSAnLi9lbGVtZW50cyc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWxsQ2hpbGRyZW4oYXkpIHtcclxuICAgIGlmIChcclxuICAgICAgICBheS5fbm9kZS5jaGlsZEVsZW1lbnRDb3VudCA+IDAgXHJcbiAgICAgICAgJiYgYXkub3ducyAhPT0gbnVsbFxyXG4gICAgICAgICYmIGF5Lm93bnMubGVuZ2ggPiAwXHJcbiAgICApIHtcclxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShheS5fbm9kZS5jaGlsZHJlbikuY29uY2F0KGF5Lm93bnMpO1xyXG4gICAgfSBlbHNlIGlmIChheS5fbm9kZS5jaGlsZEVsZW1lbnRDb3VudCA+IDApIHtcclxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShheS5fbm9kZS5jaGlsZHJlbilcclxuICAgIH0gZWxzZSBpZiAoYXkub3ducyAhPT0gbnVsbCAmJiBheS5vd25zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShheS5vd25zKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWxsQWxsb3dlZENoaWxkcmVuKGF5KSB7XHJcbiAgICAvLyBmbGF0dGVuIHZlcnNpb24gb2YgYWxsIHJvbGVzIGFsbG93ZWRcclxuICAgIHZhciBhbGxvd2VkUm9sZXMgPSBbXS5jb25jYXQoLi4uT2JqZWN0LnZhbHVlcyhzZWxlY3Rvci5nZXRPd25zKGF5LnJvbGUpKSk7XHJcbiAgICB2YXIgY2hpbGRyZW4gPSBnZXRBbGxDaGlsZHJlbihheSk7XHJcblxyXG4gICAgLy8gZ2V0IGFsbCBvYmplY3RzIG9mIDIweSBwZXIgZWxlbWVudFxyXG4gICAgdmFyIGF5Q2hpbGRyZW4gPSBjaGlsZHJlbi5tYXAoY2hpbGQgPT4ge1xyXG4gICAgICAgIGlmICghZWxlbWVudHMuaGFzKGNoaWxkKSkgY3JlYXRlLm9uZShjaGlsZCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRzLmdldChjaGlsZCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gYXlDaGlsZHJlbi5maWx0ZXIoY2hpbGQgPT4gYWxsb3dlZFJvbGVzLmluZGV4T2YoY2hpbGQucm9sZSkgPiAtMSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtnZXRBbGxDaGlsZHJlbiwgZ2V0QWxsQWxsb3dlZENoaWxkcmVufTsiLCJpbXBvcnQgcm9sZXMgZnJvbSBcIi4vLi4vZGF0YS9yb2xlc1wiO1xuXG4vKipcbiAqIFJldHVybnMgYW4gY3NzIHNlbGVjdG9yIGZvciBhIGdpdmVuIHJvbGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgUm9sZSBuYW1lXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Um9sZShrZXkpIHtcblx0aWYgKCFyb2xlc1trZXldKSByZXR1cm47XG5cblx0cmV0dXJuIFwiW3JvbGU9J1wiICsga2V5ICsgXCInXVwiO1xufVxuXG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgd2l0aCBhbGwgY3NzIHNlbGVjdG9ycywgaW1wbGljaXQgYW5kIGV4cGxpY2l0LCBmb3IgYSBnaXZlbiByb2xlXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5IFJvbGUgbmFtZVxuICogQHJldHVybnMgez9BcnJheX07XG4gKi9cbmZ1bmN0aW9uIGdldFNlbGVjdG9yQXJyYXkoa2V5KSB7XG5cdGlmICghcm9sZXNba2V5XSkgcmV0dXJuO1xuXG5cdGxldCBzZWxlY3RvciA9IFtdO1xuXHRzZWxlY3Rvci5wdXNoKGdldFJvbGUoa2V5KSk7XG5cdGlmIChyb2xlc1trZXldLmltcGxpY2l0KSBzZWxlY3RvciA9IHNlbGVjdG9yLmNvbmNhdChyb2xlc1trZXldLmltcGxpY2l0KTtcblx0cmV0dXJuIHNlbGVjdG9yO1xufVxuXG4vKipcbiAqIFJldHVybnMgYW4gY29tcGxldGUgY3NzIHNlbGVjdG9yIHdpdGggaW1wbGljdCBlbGVtZW50cyBmb3IgYSBnaXZlbiByb2xlXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5IFJvbGUgbmFtZVxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldChrZXkpIHtcblx0cmV0dXJuIGdldFNlbGVjdG9yQXJyYXkoa2V5KS5qb2luKFwiLCBcIik7XG59XG5cbmZ1bmN0aW9uIGdldERlZXBSb2xlQXJyYXkoa2V5KSB7XG5cdGlmICghcm9sZXNba2V5XSkgcmV0dXJuO1xuXG5cdGxldCBzZWxlY3RvciA9IFtdO1xuXHRzZWxlY3Rvci5wdXNoKGdldFJvbGUoa2V5KSk7XG5cblx0aWYgKHJvbGVzW2tleV0uc3ViKSB7XG5cdFx0cm9sZXNba2V5XS5zdWIuZm9yRWFjaCh2YWwgPT4gc2VsZWN0b3IucHVzaChnZXRSb2xlKHZhbCkpKTtcblx0fVxuXG5cdHJldHVybiBzZWxlY3Rvcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZXBSb2xlKGtleSkge1xuXHRyZXR1cm4gZ2V0RGVlcFJvbGVBcnJheShrZXkpLmpvaW4oXCIsIFwiKTtcbn1cblxuZnVuY3Rpb24gZ2V0RGVlcFNlbGVjdG9yQXJyYXkoa2V5KSB7XG5cdGlmICghcm9sZXNba2V5XSkgcmV0dXJuO1xuXG5cdGxldCBzZWxlY3RvciA9IFtdO1xuXHRzZWxlY3RvciA9IHNlbGVjdG9yLmNvbmNhdChnZXRTZWxlY3RvckFycmF5KGtleSkpO1xuXG5cdGlmIChyb2xlc1trZXldLnN1Yikge1xuXHRcdHJvbGVzW2tleV0uc3ViLmZvckVhY2godmFsID0+IHNlbGVjdG9yID0gc2VsZWN0b3IuY29uY2F0KGdldFNlbGVjdG9yQXJyYXkodmFsKSkpO1xuXHR9XG5cblx0cmV0dXJuIHNlbGVjdG9yO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVlcChrZXkpIHtcblx0cmV0dXJuIGdldERlZXBTZWxlY3RvckFycmF5KGtleSkuam9pbihcIiwgXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0T3ducyhrZXkpIHtcblx0cmV0dXJuIHJvbGVzW2tleV0ub3ducztcbn1cblxuZXhwb3J0IGRlZmF1bHQgeyBnZXRSb2xlLCBnZXQsIGdldERlZXBSb2xlLCBnZXREZWVwLCBnZXRPd25zIH07Il19
