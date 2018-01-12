## Classes

<dl>
<dt><a href="#Command">Command</a> ⇐ <code><a href="#Widget">Widget</a></code></dt>
<dd></dd>
<dt><a href="#Input">Input</a> ⇐ <code><a href="#Widget">Widget</a></code></dt>
<dd></dd>
<dt><a href="#Select">Select</a> ⇐ <code><a href="#Roletype">Roletype</a></code></dt>
<dd><h3 id="keyboard-support">Keyboard Support</h3>
<h4 id="default">Default</h4>
<table>
<thead>
<tr>
<th>Key</th>
<th>Function</th>
</tr>
</thead>
<tbody>
<tr>
<td>Down Arrow</td>
<td>Moves focus to the next option <br/> If not multiselectable, it selects the focused option.</td>
</tr>
<tr>
<td>Up Arrow</td>
<td>Moves focus to the previous option  <br/> If not multiselectable, it selects the focused option.</td>
</tr>
<tr>
<td>Home</td>
<td>Moves focus to the first option  <br/> If not multiselectable, it selects the focused option.</td>
</tr>
<tr>
<td>End</td>
<td>Moves focus to the last option  <br/> If not multiselectable, it selects the focused option.</td>
</tr>
</tbody>
</table>
<h4 id="multiple-selection">Multiple selection</h4>
<table>
<thead>
<tr>
<th>Key</th>
<th>Function</th>
</tr>
</thead>
<tbody>
<tr>
<td>Space</td>
<td>Changes the selection state of the focused option.</td>
</tr>
<tr>
<td>Shift + Down Arrow</td>
<td>Moves focus to and selects the next option.</td>
</tr>
<tr>
<td>Shift + Up Arrow</td>
<td>Moves focus to and selects the previous option.</td>
</tr>
<tr>
<td>Control + Shift + Home</td>
<td>Selects from the focused option to the beginning of the list.</td>
</tr>
<tr>
<td>Control + Shift + End</td>
<td>Selects from the focused option to the end of the list.</td>
</tr>
<tr>
<td>Control + A</td>
<td>Selects all options in the list. If all options are selected, unselects all options.</td>
</tr>
</tbody>
</table>
<h3 id="attributes">Attributes</h3>
<ul>
<li><code>aria-selected</code><ul>
<li><code>true</code><ul>
<li>is the current focussed element</li>
<li>equals the value of <code>aria-activedescendant</code></li>
</ul>
</li>
</ul>
</li>
<li><code>tabindex</code><ul>
<li>allows usage of the element by keys when in focus</li>
</ul>
</li>
<li><code>aria-activedescendant</code> equals ID of current focussed element</li>
</ul>
<h4 id="multiple-selection">Multiple selection</h4>
<ul>
<li><code>aria-selected</code><ul>
<li><code>true</code><pre><code>* can be applied to multiple element
</code></pre><ul>
<li>not automatically applied to the focused element</li>
<li><code>false</code></li>
</ul>
</li>
</ul>
</li>
<li><code>tabindex</code><ul>
<li>allows usage of the element by keys when in focus</li>
</ul>
</li>
</ul>
</dd>
<dt><a href="#Widget">Widget</a> ⇐ <code><a href="#Roletype">Roletype</a></code></dt>
<dd></dd>
<dt><a href="#Alert">Alert</a></dt>
<dd></dd>
<dt><a href="#Alertdialog">Alertdialog</a></dt>
<dd></dd>
<dt><a href="#Base">Base</a></dt>
<dd><p>Adds some basic functionality that is greatly used inside the components</p>
</dd>
<dt><a href="#Button">Button</a> ⇐ <code><a href="#Command">Command</a></code></dt>
<dd></dd>
<dt><a href="#Combobox">Combobox</a> ⇐ <code><a href="#Roletype">Roletype</a></code></dt>
<dd><p>A combobox is a widget made up of the combination of two distinct elements: </p>
<ol>
<li>a single-line textbox</li>
<li>an associated pop-up element for helping users set the value of the textbox. </li>
</ol>
<p>The popup may be a listbox, grid, tree, or dialog. Many implementations also include a third 
optional element -- a graphical button adjacent to the textbox, indicating the availability of
the popup. Activating the button displays the popup if suggestions are available.</p>
</dd>
<dt><a href="#Dialog">Dialog</a></dt>
<dd></dd>
<dt><a href="#Link">Link</a> ⇐ <code><a href="#Command">Command</a></code></dt>
<dd><p>An interactive reference to an internal or external resource that,
when activated, causes the user agent to navigate to that resource.</p>
</dd>
<dt><a href="#Listbox">Listbox</a> ⇐ <code><a href="#Roletype">Roletype</a></code></dt>
<dd><h3 id="keyboard-support">Keyboard Support</h3>
<h4 id="default">Default</h4>
<table>
<thead>
<tr>
<th>Key</th>
<th>Function</th>
</tr>
</thead>
<tbody>
<tr>
<td>Down Arrow</td>
<td>Moves focus to the next option <br/> If not multiselectable, it selects the focused option.</td>
</tr>
<tr>
<td>Up Arrow</td>
<td>Moves focus to the previous option  <br/> If not multiselectable, it selects the focused option.</td>
</tr>
<tr>
<td>Home</td>
<td>Moves focus to the first option  <br/> If not multiselectable, it selects the focused option.</td>
</tr>
<tr>
<td>End</td>
<td>Moves focus to the last option  <br/> If not multiselectable, it selects the focused option.</td>
</tr>
</tbody>
</table>
<h4 id="multiple-selection">Multiple selection</h4>
<table>
<thead>
<tr>
<th>Key</th>
<th>Function</th>
</tr>
</thead>
<tbody>
<tr>
<td>Space</td>
<td>Changes the selection state of the focused option.</td>
</tr>
<tr>
<td>Shift + Down Arrow</td>
<td>Moves focus to and selects the next option.</td>
</tr>
<tr>
<td>Shift + Up Arrow</td>
<td>Moves focus to and selects the previous option.</td>
</tr>
<tr>
<td>Control + Shift + Home</td>
<td>Selects from the focused option to the beginning of the list.</td>
</tr>
<tr>
<td>Control + Shift + End</td>
<td>Selects from the focused option to the end of the list.</td>
</tr>
<tr>
<td>Control + A</td>
<td>Selects all options in the list. If all options are selected, unselects all options.</td>
</tr>
</tbody>
</table>
</dd>
<dt><a href="#Option">Option</a> ⇐ <code><a href="#Roletype">Roletype</a></code></dt>
<dd></dd>
<dt><a href="#Radio">Radio</a> ⇐ <code><a href="#Command">Command</a></code></dt>
<dd><p>A checkable input in a group of elements with the same role,
only one of which can be checked at a time.</p>
</dd>
<dt><a href="#Range">Range</a> ⇐ <code><a href="#Roletype">Roletype</a></code></dt>
<dd><p><strong>(Abstract role) SHOULD NOT USED IN THE DOM</strong> 
An input representing a range of values that can be set by the user.</p>
</dd>
<dt><a href="#Roletype">Roletype</a> ⇐ <code><a href="#AccessibleNode">AccessibleNode</a></code></dt>
<dd></dd>
<dt><a href="#Slider">Slider</a> ⇐ <code><a href="#Range">Range</a></code></dt>
<dd><p><code>slider</code> elements let the user specify a numeric value which must be no less
than a given value, and no more than another given value. The precise value,
however, is not considered important. This is typically represented using a
slider or dial control rather than a text entry box like the &quot;number&quot; input
type. Because this kind of widget is imprecise, it shouldn&#39;t typically be
used unless the control&#39;s exact value isn&#39;t important.</p>
</dd>
<dt><a href="#Spinbutton">Spinbutton</a> ⇐ <code><a href="#Range">Range</a></code></dt>
<dd><p>A input field with 2 button to increase or decrease the numberical value</p>
</dd>
<dt><a href="#Textbox">Textbox</a></dt>
<dd></dd>
<dt><a href="#AccessibleNode">AccessibleNode</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd><p>Based on the AOM spec</p>
</dd>
<dt><a href="#ValidityState">ValidityState</a></dt>
<dd></dd>
</dl>

## Mixins

<dl>
<dt><a href="#Validation">Validation</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#allowedRoles">allowedRoles</a> : <code>Object</code></dt>
<dd><p>Stores info which is used in functions of rolePerHTMLTag,
mostly a key as tagName with an array of allowed roles for that tag</p>
</dd>
<dt><a href="#rolePerHTMLTag">rolePerHTMLTag</a> : <code>Object</code></dt>
<dd><p>Contains a function for each htmlTag where not all roles allowed</p>
</dd>
<dt><a href="#undefinedwillValidate">undefinedwillValidate</a> : <code>Boolean</code></dt>
<dd><p>Returns true if the element will be validated when the form is submitted; false otherwise.</p>
</dd>
<dt><a href="#undefinedvalidationMessage">undefinedvalidationMessage</a> : <code>String</code></dt>
<dd><p>Returns the error message that would be shown to the user
if the element was to be checked for validity.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#roles">roles</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#AriaChecked">AriaChecked()</a></dt>
<dd><p>Adds functionality to <code>aria-checked</code> attribute.</p>
<p>Changes value when clicked or while focused pressing <code>Space</code>.</p>
<p><a href="https://www.w3.org/TR/wai-aria-1.1/#aria-checked">https://www.w3.org/TR/wai-aria-1.1/#aria-checked</a></p>
</dd>
<dt><a href="#AriaExpanded">AriaExpanded()</a></dt>
<dd><p>Adds functionality to <code>aria-expanded</code> attribute</p>
</dd>
<dt><a href="#AriaPressed">AriaPressed()</a></dt>
<dd><p>Adds functionality to <code>aria-pressed</code> attribute.</p>
<p>Changes value when clicked or while focused pressing <code>Space</code> or <code>Enter</code>.</p>
<p><a href="https://www.w3.org/TR/wai-aria-1.1/#aria-pressed">https://www.w3.org/TR/wai-aria-1.1/#aria-pressed</a></p>
</dd>
<dt><a href="#AriaSelected">AriaSelected()</a></dt>
<dd><p>gets and sets the <code>aria-selected</code> attribute.</p>
<p>Indicates if a element is selectable</p>
</dd>
<dt><a href="#AccessibleNodeList">AccessibleNodeList()</a></dt>
<dd></dd>
<dt><a href="#toggle">toggle()</a> ⇒ <code>Boolean</code></dt>
<dd><p>Returns the opposite state of the attribute</p>
</dd>
<dt><a href="#toggle">toggle()</a> ⇒ <code>String</code></dt>
<dd><p>Returns the opposite state of the attribute</p>
</dd>
<dt><a href="#getParentWithTagName">getParentWithTagName(el, tagName)</a> ⇒ <code>HTMLElement</code></dt>
<dd><p>Finds nearest parent with a specifig tagName</p>
</dd>
<dt><a href="#hasAllowedRole">hasAllowedRole(tagName, role)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks if given role is allowed for given tag</p>
</dd>
<dt><a href="#scrollIntoView">scrollIntoView(child)</a></dt>
<dd><p>Scrolls an element into its parent view</p>
</dd>
<dt><a href="#start">start(descendants)</a></dt>
<dd><p>Adds focus to the first element</p>
</dd>
<dt><a href="#prev">prev(descendants, child)</a></dt>
<dd><p>Adds focus to the prev element</p>
</dd>
<dt><a href="#next">next(descendants, child)</a></dt>
<dd><p>Adds focus to the next element</p>
</dd>
<dt><a href="#end">end(descendants)</a></dt>
<dd><p>Adds focus to the last element</p>
</dd>
<dt><a href="#undefinedcheckValidity">undefinedcheckValidity()</a></dt>
<dd><p>Returns true if the element’s value has no validity problems; false otherwise.
Fires an invalid event at the element in the latter case.</p>
</dd>
<dt><a href="#undefinedreportValidity">undefinedreportValidity()</a></dt>
<dd><p>Returns true if the element’s value has no validity problems; otherwise, returns false, fires an
invalid event at the element, and(if the event isn’t canceled) reports the problem to the user.</p>
</dd>
<dt><a href="#undefinedsetCustomValidity">undefinedsetCustomValidity(message)</a></dt>
<dd><p>Sets a custom error, so that the element would fail to validate.The given message is the
message to be shown to the user when reporting the problem to the user.</p>
<p>If the argument is the empty string, clears the custom error.</p>
</dd>
</dl>

<a name="Command"></a>

## Command ⇐ [<code>Widget</code>](#Widget)
**Kind**: global class  
**Extends**: [<code>Widget</code>](#Widget)  

* [Command](#Command) ⇐ [<code>Widget</code>](#Widget)
    * [.labelledBy](#AccessibleNode+labelledBy) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.describedBy](#AccessibleNode+describedBy) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.controls](#AccessibleNode+controls) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.flowTo](#AccessibleNode+flowTo) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.owns](#AccessibleNode+owns) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.role](#AccessibleNode+role) : <code>String</code>
    * [.roleDescription](#AccessibleNode+roleDescription) : <code>String</code>
    * [.label](#AccessibleNode+label) : <code>String</code>
    * [.current](#AccessibleNode+current) : <code>Boolean</code> \| <code>String</code>
    * [.autocomplete](#AccessibleNode+autocomplete) : <code>String</code>
    * [.hidden](#AccessibleNode+hidden) : <code>Boolean</code>
    * [.keyShortcuts](#AccessibleNode+keyShortcuts) : <code>String</code>
    * [.modal](#AccessibleNode+modal) : <code>Boolean</code>
    * [.multiline](#AccessibleNode+multiline) : <code>Boolean</code>
    * [.multiselectable](#AccessibleNode+multiselectable) : <code>Boolean</code>
    * [.orientation](#AccessibleNode+orientation) : <code>String</code>
    * [.readOnly](#AccessibleNode+readOnly) : <code>Boolean</code>
    * [.required](#AccessibleNode+required) : <code>Boolean</code>
    * [.selected](#AccessibleNode+selected) : <code>Boolean</code>
    * [.sort](#AccessibleNode+sort) : <code>Boolean</code>
    * [.checked](#AccessibleNode+checked) : <code>String</code>
    * [.expanded](#AccessibleNode+expanded) : <code>Boolean</code>
    * [.disabled](#AccessibleNode+disabled) : <code>Boolean</code>
    * [.invalid](#AccessibleNode+invalid) : <code>String</code>
    * [.hasPopUp](#AccessibleNode+hasPopUp) : <code>String</code>
    * [.pressed](#AccessibleNode+pressed) : <code>String</code>
    * [.valueText](#AccessibleNode+valueText) : <code>String</code>
    * [.placeholder](#AccessibleNode+placeholder) : <code>String</code>
    * [.valueNow](#AccessibleNode+valueNow) : <code>Number</code>
    * [.valueMin](#AccessibleNode+valueMin) : <code>Number</code>
    * [.valueMax](#AccessibleNode+valueMax) : <code>Number</code>
    * [.activeDescendant](#AccessibleNode+activeDescendant) : <code>AcccessibleNode</code>
    * [.details](#AccessibleNode+details) : <code>AcccessibleNode</code>
    * [.errorMessage](#AccessibleNode+errorMessage) : <code>AcccessibleNode</code>
    * [.colCount](#AccessibleNode+colCount) : <code>Integer</code>
    * [.colIndex](#AccessibleNode+colIndex) : <code>Integer</code>
    * [.colSpan](#AccessibleNode+colSpan) : <code>Integer</code>
    * [.posInSet](#AccessibleNode+posInSet) : <code>Integer</code>
    * [.rowCount](#AccessibleNode+rowCount) : <code>Integer</code>
    * [.rowIndex](#AccessibleNode+rowIndex) : <code>Integer</code>
    * [.rowSpan](#AccessibleNode+rowSpan) : <code>Integer</code>
    * [.setSize](#AccessibleNode+setSize) : <code>Integer</code>
    * [.level](#AccessibleNode+level) : <code>Integer</code>
    * [.tabIndex](#Base+tabIndex) : <code>Number</code>
    * [.addListener(label, callback, [options])](#Base+addListener)

<a name="AccessibleNode+labelledBy"></a>

### command.labelledBy : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances that labels the current element

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**

- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby

<a name="AccessibleNode+describedBy"></a>

### command.describedBy : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances that describes the current element

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**

- [AccessibleNode#labeledBy](AccessibleNode#labeledBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-describedby

<a name="AccessibleNode+controls"></a>

### command.controls : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances whose contents or presence are controlled by
the current element.

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**

- [owns](#AccessibleNode+owns)
- https://www.w3.org/TR/wai-aria-1.1/#aria-controls

<a name="AccessibleNode+flowTo"></a>

### command.flowTo : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Contains the next element(s) in an alternate reading order of content which, at the user's 
discretion, allows assistive technology to override the general default of reading in
document source order.

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-flowto  
<a name="AccessibleNode+owns"></a>

### command.owns : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Contains children who's ID are referenced inside the `aria-owns` attribute

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-owns  
<a name="AccessibleNode+role"></a>

### command.role : <code>String</code>
Defines a type it represents, e.g. `tab`

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#roles  
<a name="AccessibleNode+roleDescription"></a>

### command.roleDescription : <code>String</code>
Defines a human-readable, author-localized description for the role

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-roledescription  
<a name="AccessibleNode+label"></a>

### command.label : <code>String</code>
Defines a string value that labels the current element.

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-label  
<a name="AccessibleNode+current"></a>

### command.current : <code>Boolean</code> \| <code>String</code>
Indicates the element that represents the current item within a container or set of related elements.

Possible strings are:
* `page`, used to indicate a link within a set of pagination links, 
		where the link is visually styled to represent the currently-displayed page.
* `step`, used to indicate a link within a step indicator for a step-based process,
		where the link is visually styled to represent the current step.
* `location`, used to indicate the image that is visually highlighted as the current component of a flow chart.
* `date`, used to indicate the current date within a calendar.
* `time`, used to indicate the current time within a timetable.

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-current  
<a name="AccessibleNode+autocomplete"></a>

### command.autocomplete : <code>String</code>
Indicates whether inputting text could trigger display of one or more predictions of the user's
intended value for an input and specifies how predictions would be presented if they are made.

The behavior during input is depends on the provided value, it follows beneath table.

| Value  | 	Description |
| ------ | --- |
| inline | Text suggesting may be dynamically inserted after the caret.
| list   | A collection of values that could complete the provided input is displayed.
| both   | Implements `inline` and `list`
| none   | No prediction is shown

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-autocomplete  
<a name="AccessibleNode+hidden"></a>

### command.hidden : <code>Boolean</code>
Returns/sets the visibility of the element who is exposed to an accessibility API.

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**

- [disabled](#AccessibleNode+disabled)
- https://www.w3.org/TR/wai-aria-1.1/#aria-hidden

<a name="AccessibleNode+keyShortcuts"></a>

### command.keyShortcuts : <code>String</code>
Indicates keyboard shortcuts that an author has implemented to activate or
give focus to an element.

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-keyshortcuts  
<a name="AccessibleNode+modal"></a>

### command.modal : <code>Boolean</code>
Indicates whether an element is modal when displayed.

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-modal  
<a name="AccessibleNode+multiline"></a>

### command.multiline : <code>Boolean</code>
Indicates whether a text box accepts multiple lines of input or only a single line.

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-multiline  
<a name="AccessibleNode+multiselectable"></a>

### command.multiselectable : <code>Boolean</code>
Indicates that the user may select more than one item from the current selectable descendants.

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-multiselectable  
<a name="AccessibleNode+orientation"></a>

### command.orientation : <code>String</code>
Indicates whether the element's orientation is `horizontal`, `vertical`, or `null`.

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-orientation  
<a name="AccessibleNode+readOnly"></a>

### command.readOnly : <code>Boolean</code>
Indicates that the user may select more than one item from the current selectable descendants.

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-readonly  
<a name="AccessibleNode+required"></a>

### command.required : <code>Boolean</code>
Indicates that user input is required on the element before a form may be submitted.

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-required  
<a name="AccessibleNode+selected"></a>

### command.selected : <code>Boolean</code>
Indicates that user input is required on the element before a form may be submitted.

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-selected  
<a name="AccessibleNode+sort"></a>

### command.sort : <code>Boolean</code>
Indicates if items in a table or grid are sorted in ascending or descending order.  
Possible values are `acending`, `descending`, `none`, `other` or `null`.

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-sort  
<a name="AccessibleNode+checked"></a>

### command.checked : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](Checkbox)

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+expanded"></a>

### command.expanded : <code>Boolean</code>
Indicates whether the element, or another grouping element it controls, 
is currently expanded or collapsed.

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-expanded  
<a name="AccessibleNode+disabled"></a>

### command.disabled : <code>Boolean</code>
Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**

- [hidden](#AccessibleNode+hidden)
- [AccessibleNode#readonly](AccessibleNode#readonly)
- https://www.w3.org/TR/wai-aria-1.1/#aria-disabled

<a name="AccessibleNode+invalid"></a>

### command.invalid : <code>String</code>
Indicates the entered value does not conform to the format expected by the application.

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**

- [errorMessage](#AccessibleNode+errorMessage)
- https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage

<a name="AccessibleNode+hasPopUp"></a>

### command.hasPopUp : <code>String</code>
Indicates the availability and type of interactive popup element, such as menu or dialog,
that can be triggered by an element.

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup  
<a name="AccessibleNode+pressed"></a>

### command.pressed : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](Checkbox)

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+valueText"></a>

### command.valueText : <code>String</code>
Returns / sets the human readable text alternative of [#aria-valuenow](#aria-valuenow) for a [Range](#Range) widget.

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext](https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext)  
<a name="AccessibleNode+placeholder"></a>

### command.placeholder : <code>String</code>
Returns / sets a short hint intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder](https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder)  
<a name="AccessibleNode+valueNow"></a>

### command.valueNow : <code>Number</code>
Returns / sets the current value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow](https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow)  
<a name="AccessibleNode+valueMin"></a>

### command.valueMin : <code>Number</code>
Returns / sets the minimum allowed value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin](https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin)  
<a name="AccessibleNode+valueMax"></a>

### command.valueMax : <code>Number</code>
Returns / sets the maximum allowed value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax](https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax)  
<a name="AccessibleNode+activeDescendant"></a>

### command.activeDescendant : <code>AcccessibleNode</code>
Returns / sets the AccessibleNode of the currently active element when focus is on current element.

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-activedescendant  
<a name="AccessibleNode+details"></a>

### command.details : <code>AcccessibleNode</code>
Returns / sets an AccessibleNode that provides a detailed, extended description 
for the current element.

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**

- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-details

<a name="AccessibleNode+errorMessage"></a>

### command.errorMessage : <code>AcccessibleNode</code>
Returns / sets an AccessibleNode that provides an error message for the current element.

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**

- [invalid](#AccessibleNode+invalid)
- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage

<a name="AccessibleNode+colCount"></a>

### command.colCount : <code>Integer</code>
Returns / sets the total number of columns in a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**

- [colIndex](#AccessibleNode+colIndex)
- https://www.w3.org/TR/wai-aria-1.1/#aria-setsize

<a name="AccessibleNode+colIndex"></a>

### command.colIndex : <code>Integer</code>
Defines an element's column index or position with respect to the total number of columns 
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**

- [colCount](#AccessibleNode+colCount)
- [colSpan](#AccessibleNode+colSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-colindex

<a name="AccessibleNode+colSpan"></a>

### command.colSpan : <code>Integer</code>
Defines the number of columns spanned by a cell or gridcell
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**

- [colIndex](#AccessibleNode+colIndex)
- [rowSpan](#AccessibleNode+rowSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-colspan

<a name="AccessibleNode+posInSet"></a>

### command.posInSet : <code>Integer</code>
Defines an element's number or position in the current set of [listitem](listitem)s or [treeitem](treeitem)s.
Not required if all elements in the set are present in the DOM.

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**

- [setSize](#AccessibleNode+setSize)
- https://www.w3.org/TR/wai-aria-1.1/#aria-posinset

<a name="AccessibleNode+rowCount"></a>

### command.rowCount : <code>Integer</code>
Defines the total number of rows in a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**

- [rowIndex](#AccessibleNode+rowIndex)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount

<a name="AccessibleNode+rowIndex"></a>

### command.rowIndex : <code>Integer</code>
Defines an element's row index or position with respect to the total number of rows 
within a  [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**

- [rowCount](#AccessibleNode+rowCount)
- [rowSpan](#AccessibleNode+rowSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex

<a name="AccessibleNode+rowSpan"></a>

### command.rowSpan : <code>Integer</code>
Defines the number of rows spanned by a cell or gridcell
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**

- [rowIndex](#AccessibleNode+rowIndex)
- [colSpan](#AccessibleNode+colSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan

<a name="AccessibleNode+setSize"></a>

### command.setSize : <code>Integer</code>
Defines the number of items in the current set of listitems or treeitems.
Not required if **all** elements in the set are present in the DOM.

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**

- [posInSet](#AccessibleNode+posInSet)
- https://www.w3.org/TR/wai-aria-1.1/#aria-setsize

<a name="AccessibleNode+level"></a>

### command.level : <code>Integer</code>
Defines the hierarchical level of an element within a structure.
E.g. `<h1><h1/>` equals `<div role="heading" aria-level="1"></div>`

**Kind**: instance property of [<code>Command</code>](#Command)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-level  
<a name="Base+tabIndex"></a>

### command.tabIndex : <code>Number</code>
Current tabindex of the element

**Kind**: instance property of [<code>Command</code>](#Command)  
<a name="Base+addListener"></a>

### command.addListener(label, callback, [options])
Adds an listener to the object and targeted element

**Kind**: instance method of [<code>Command</code>](#Command)  
**See**: customEvents  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | Type of event |
| callback | <code>function</code> | Callback function |
| [options] | <code>Object</code> | Extends AddEventListenerOptions |
| [options.key] | <code>String</code> | When label is set to `key` it specifies the keycombo to listen to |
| [options.attribute] | <code>String</code> | When label is set to `attributes` it specifies which attribute should be changed |
| [options.target] | <code>Element</code> | Changes the targeted element |
| [options.capture] | <code>Boolean</code> |  |
| [options.passive] | <code>Boolean</code> |  |
| [options.once] | <code>Boolean</code> |  |

<a name="Input"></a>

## Input ⇐ [<code>Widget</code>](#Widget)
**Kind**: global class  
**Extends**: [<code>Widget</code>](#Widget)  

* [Input](#Input) ⇐ [<code>Widget</code>](#Widget)
    * [.labelledBy](#AccessibleNode+labelledBy) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.describedBy](#AccessibleNode+describedBy) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.controls](#AccessibleNode+controls) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.flowTo](#AccessibleNode+flowTo) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.owns](#AccessibleNode+owns) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.role](#AccessibleNode+role) : <code>String</code>
    * [.roleDescription](#AccessibleNode+roleDescription) : <code>String</code>
    * [.label](#AccessibleNode+label) : <code>String</code>
    * [.current](#AccessibleNode+current) : <code>Boolean</code> \| <code>String</code>
    * [.autocomplete](#AccessibleNode+autocomplete) : <code>String</code>
    * [.hidden](#AccessibleNode+hidden) : <code>Boolean</code>
    * [.keyShortcuts](#AccessibleNode+keyShortcuts) : <code>String</code>
    * [.modal](#AccessibleNode+modal) : <code>Boolean</code>
    * [.multiline](#AccessibleNode+multiline) : <code>Boolean</code>
    * [.multiselectable](#AccessibleNode+multiselectable) : <code>Boolean</code>
    * [.orientation](#AccessibleNode+orientation) : <code>String</code>
    * [.readOnly](#AccessibleNode+readOnly) : <code>Boolean</code>
    * [.required](#AccessibleNode+required) : <code>Boolean</code>
    * [.selected](#AccessibleNode+selected) : <code>Boolean</code>
    * [.sort](#AccessibleNode+sort) : <code>Boolean</code>
    * [.checked](#AccessibleNode+checked) : <code>String</code>
    * [.expanded](#AccessibleNode+expanded) : <code>Boolean</code>
    * [.disabled](#AccessibleNode+disabled) : <code>Boolean</code>
    * [.invalid](#AccessibleNode+invalid) : <code>String</code>
    * [.hasPopUp](#AccessibleNode+hasPopUp) : <code>String</code>
    * [.pressed](#AccessibleNode+pressed) : <code>String</code>
    * [.valueText](#AccessibleNode+valueText) : <code>String</code>
    * [.placeholder](#AccessibleNode+placeholder) : <code>String</code>
    * [.valueNow](#AccessibleNode+valueNow) : <code>Number</code>
    * [.valueMin](#AccessibleNode+valueMin) : <code>Number</code>
    * [.valueMax](#AccessibleNode+valueMax) : <code>Number</code>
    * [.activeDescendant](#AccessibleNode+activeDescendant) : <code>AcccessibleNode</code>
    * [.details](#AccessibleNode+details) : <code>AcccessibleNode</code>
    * [.errorMessage](#AccessibleNode+errorMessage) : <code>AcccessibleNode</code>
    * [.colCount](#AccessibleNode+colCount) : <code>Integer</code>
    * [.colIndex](#AccessibleNode+colIndex) : <code>Integer</code>
    * [.colSpan](#AccessibleNode+colSpan) : <code>Integer</code>
    * [.posInSet](#AccessibleNode+posInSet) : <code>Integer</code>
    * [.rowCount](#AccessibleNode+rowCount) : <code>Integer</code>
    * [.rowIndex](#AccessibleNode+rowIndex) : <code>Integer</code>
    * [.rowSpan](#AccessibleNode+rowSpan) : <code>Integer</code>
    * [.setSize](#AccessibleNode+setSize) : <code>Integer</code>
    * [.level](#AccessibleNode+level) : <code>Integer</code>
    * [.tabIndex](#Base+tabIndex) : <code>Number</code>
    * [.addListener(label, callback, [options])](#Base+addListener)

<a name="AccessibleNode+labelledBy"></a>

### input.labelledBy : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances that labels the current element

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**

- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby

<a name="AccessibleNode+describedBy"></a>

### input.describedBy : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances that describes the current element

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**

- [AccessibleNode#labeledBy](AccessibleNode#labeledBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-describedby

<a name="AccessibleNode+controls"></a>

### input.controls : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances whose contents or presence are controlled by
the current element.

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**

- [owns](#AccessibleNode+owns)
- https://www.w3.org/TR/wai-aria-1.1/#aria-controls

<a name="AccessibleNode+flowTo"></a>

### input.flowTo : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Contains the next element(s) in an alternate reading order of content which, at the user's 
discretion, allows assistive technology to override the general default of reading in
document source order.

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-flowto  
<a name="AccessibleNode+owns"></a>

### input.owns : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Contains children who's ID are referenced inside the `aria-owns` attribute

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-owns  
<a name="AccessibleNode+role"></a>

### input.role : <code>String</code>
Defines a type it represents, e.g. `tab`

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#roles  
<a name="AccessibleNode+roleDescription"></a>

### input.roleDescription : <code>String</code>
Defines a human-readable, author-localized description for the role

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-roledescription  
<a name="AccessibleNode+label"></a>

### input.label : <code>String</code>
Defines a string value that labels the current element.

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-label  
<a name="AccessibleNode+current"></a>

### input.current : <code>Boolean</code> \| <code>String</code>
Indicates the element that represents the current item within a container or set of related elements.

Possible strings are:
* `page`, used to indicate a link within a set of pagination links, 
		where the link is visually styled to represent the currently-displayed page.
* `step`, used to indicate a link within a step indicator for a step-based process,
		where the link is visually styled to represent the current step.
* `location`, used to indicate the image that is visually highlighted as the current component of a flow chart.
* `date`, used to indicate the current date within a calendar.
* `time`, used to indicate the current time within a timetable.

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-current  
<a name="AccessibleNode+autocomplete"></a>

### input.autocomplete : <code>String</code>
Indicates whether inputting text could trigger display of one or more predictions of the user's
intended value for an input and specifies how predictions would be presented if they are made.

The behavior during input is depends on the provided value, it follows beneath table.

| Value  | 	Description |
| ------ | --- |
| inline | Text suggesting may be dynamically inserted after the caret.
| list   | A collection of values that could complete the provided input is displayed.
| both   | Implements `inline` and `list`
| none   | No prediction is shown

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-autocomplete  
<a name="AccessibleNode+hidden"></a>

### input.hidden : <code>Boolean</code>
Returns/sets the visibility of the element who is exposed to an accessibility API.

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**

- [disabled](#AccessibleNode+disabled)
- https://www.w3.org/TR/wai-aria-1.1/#aria-hidden

<a name="AccessibleNode+keyShortcuts"></a>

### input.keyShortcuts : <code>String</code>
Indicates keyboard shortcuts that an author has implemented to activate or
give focus to an element.

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-keyshortcuts  
<a name="AccessibleNode+modal"></a>

### input.modal : <code>Boolean</code>
Indicates whether an element is modal when displayed.

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-modal  
<a name="AccessibleNode+multiline"></a>

### input.multiline : <code>Boolean</code>
Indicates whether a text box accepts multiple lines of input or only a single line.

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-multiline  
<a name="AccessibleNode+multiselectable"></a>

### input.multiselectable : <code>Boolean</code>
Indicates that the user may select more than one item from the current selectable descendants.

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-multiselectable  
<a name="AccessibleNode+orientation"></a>

### input.orientation : <code>String</code>
Indicates whether the element's orientation is `horizontal`, `vertical`, or `null`.

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-orientation  
<a name="AccessibleNode+readOnly"></a>

### input.readOnly : <code>Boolean</code>
Indicates that the user may select more than one item from the current selectable descendants.

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-readonly  
<a name="AccessibleNode+required"></a>

### input.required : <code>Boolean</code>
Indicates that user input is required on the element before a form may be submitted.

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-required  
<a name="AccessibleNode+selected"></a>

### input.selected : <code>Boolean</code>
Indicates that user input is required on the element before a form may be submitted.

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-selected  
<a name="AccessibleNode+sort"></a>

### input.sort : <code>Boolean</code>
Indicates if items in a table or grid are sorted in ascending or descending order.  
Possible values are `acending`, `descending`, `none`, `other` or `null`.

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-sort  
<a name="AccessibleNode+checked"></a>

### input.checked : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](Checkbox)

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+expanded"></a>

### input.expanded : <code>Boolean</code>
Indicates whether the element, or another grouping element it controls, 
is currently expanded or collapsed.

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-expanded  
<a name="AccessibleNode+disabled"></a>

### input.disabled : <code>Boolean</code>
Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**

- [hidden](#AccessibleNode+hidden)
- [AccessibleNode#readonly](AccessibleNode#readonly)
- https://www.w3.org/TR/wai-aria-1.1/#aria-disabled

<a name="AccessibleNode+invalid"></a>

### input.invalid : <code>String</code>
Indicates the entered value does not conform to the format expected by the application.

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**

- [errorMessage](#AccessibleNode+errorMessage)
- https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage

<a name="AccessibleNode+hasPopUp"></a>

### input.hasPopUp : <code>String</code>
Indicates the availability and type of interactive popup element, such as menu or dialog,
that can be triggered by an element.

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup  
<a name="AccessibleNode+pressed"></a>

### input.pressed : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](Checkbox)

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+valueText"></a>

### input.valueText : <code>String</code>
Returns / sets the human readable text alternative of [#aria-valuenow](#aria-valuenow) for a [Range](#Range) widget.

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext](https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext)  
<a name="AccessibleNode+placeholder"></a>

### input.placeholder : <code>String</code>
Returns / sets a short hint intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder](https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder)  
<a name="AccessibleNode+valueNow"></a>

### input.valueNow : <code>Number</code>
Returns / sets the current value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow](https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow)  
<a name="AccessibleNode+valueMin"></a>

### input.valueMin : <code>Number</code>
Returns / sets the minimum allowed value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin](https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin)  
<a name="AccessibleNode+valueMax"></a>

### input.valueMax : <code>Number</code>
Returns / sets the maximum allowed value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax](https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax)  
<a name="AccessibleNode+activeDescendant"></a>

### input.activeDescendant : <code>AcccessibleNode</code>
Returns / sets the AccessibleNode of the currently active element when focus is on current element.

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-activedescendant  
<a name="AccessibleNode+details"></a>

### input.details : <code>AcccessibleNode</code>
Returns / sets an AccessibleNode that provides a detailed, extended description 
for the current element.

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**

- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-details

<a name="AccessibleNode+errorMessage"></a>

### input.errorMessage : <code>AcccessibleNode</code>
Returns / sets an AccessibleNode that provides an error message for the current element.

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**

- [invalid](#AccessibleNode+invalid)
- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage

<a name="AccessibleNode+colCount"></a>

### input.colCount : <code>Integer</code>
Returns / sets the total number of columns in a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**

- [colIndex](#AccessibleNode+colIndex)
- https://www.w3.org/TR/wai-aria-1.1/#aria-setsize

<a name="AccessibleNode+colIndex"></a>

### input.colIndex : <code>Integer</code>
Defines an element's column index or position with respect to the total number of columns 
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**

- [colCount](#AccessibleNode+colCount)
- [colSpan](#AccessibleNode+colSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-colindex

<a name="AccessibleNode+colSpan"></a>

### input.colSpan : <code>Integer</code>
Defines the number of columns spanned by a cell or gridcell
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**

- [colIndex](#AccessibleNode+colIndex)
- [rowSpan](#AccessibleNode+rowSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-colspan

<a name="AccessibleNode+posInSet"></a>

### input.posInSet : <code>Integer</code>
Defines an element's number or position in the current set of [listitem](listitem)s or [treeitem](treeitem)s.
Not required if all elements in the set are present in the DOM.

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**

- [setSize](#AccessibleNode+setSize)
- https://www.w3.org/TR/wai-aria-1.1/#aria-posinset

<a name="AccessibleNode+rowCount"></a>

### input.rowCount : <code>Integer</code>
Defines the total number of rows in a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**

- [rowIndex](#AccessibleNode+rowIndex)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount

<a name="AccessibleNode+rowIndex"></a>

### input.rowIndex : <code>Integer</code>
Defines an element's row index or position with respect to the total number of rows 
within a  [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**

- [rowCount](#AccessibleNode+rowCount)
- [rowSpan](#AccessibleNode+rowSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex

<a name="AccessibleNode+rowSpan"></a>

### input.rowSpan : <code>Integer</code>
Defines the number of rows spanned by a cell or gridcell
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**

- [rowIndex](#AccessibleNode+rowIndex)
- [colSpan](#AccessibleNode+colSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan

<a name="AccessibleNode+setSize"></a>

### input.setSize : <code>Integer</code>
Defines the number of items in the current set of listitems or treeitems.
Not required if **all** elements in the set are present in the DOM.

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**

- [posInSet](#AccessibleNode+posInSet)
- https://www.w3.org/TR/wai-aria-1.1/#aria-setsize

<a name="AccessibleNode+level"></a>

### input.level : <code>Integer</code>
Defines the hierarchical level of an element within a structure.
E.g. `<h1><h1/>` equals `<div role="heading" aria-level="1"></div>`

**Kind**: instance property of [<code>Input</code>](#Input)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-level  
<a name="Base+tabIndex"></a>

### input.tabIndex : <code>Number</code>
Current tabindex of the element

**Kind**: instance property of [<code>Input</code>](#Input)  
<a name="Base+addListener"></a>

### input.addListener(label, callback, [options])
Adds an listener to the object and targeted element

**Kind**: instance method of [<code>Input</code>](#Input)  
**See**: customEvents  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | Type of event |
| callback | <code>function</code> | Callback function |
| [options] | <code>Object</code> | Extends AddEventListenerOptions |
| [options.key] | <code>String</code> | When label is set to `key` it specifies the keycombo to listen to |
| [options.attribute] | <code>String</code> | When label is set to `attributes` it specifies which attribute should be changed |
| [options.target] | <code>Element</code> | Changes the targeted element |
| [options.capture] | <code>Boolean</code> |  |
| [options.passive] | <code>Boolean</code> |  |
| [options.once] | <code>Boolean</code> |  |

<a name="Select"></a>

## Select ⇐ [<code>Roletype</code>](#Roletype)
### Keyboard Support

#### Default
| Key | Function |
| --- | -------- |
| Down Arrow | Moves focus to the next option <br/> If not multiselectable, it selects the focused option.
| Up Arrow 	| Moves focus to the previous option  <br/> If not multiselectable, it selects the focused option.
| Home 			|	Moves focus to the first option  <br/> If not multiselectable, it selects the focused option.
| End  			|	Moves focus to the last option  <br/> If not multiselectable, it selects the focused option.

#### Multiple selection
| Key | Function |
| --- | -------- |
| Space									| Changes the selection state of the focused option.
| Shift + Down Arrow 		| Moves focus to and selects the next option.
| Shift + Up Arrow 			| Moves focus to and selects the previous option.
| Control + Shift + Home |	Selects from the focused option to the beginning of the list.
| Control + Shift + End  | Selects from the focused option to the end of the list.
| Control + A 	          | Selects all options in the list. If all options are selected, unselects all options.

### Attributes
* `aria-selected`
	* `true`
		* is the current focussed element
		* equals the value of `aria-activedescendant`
* `tabindex`
	* allows usage of the element by keys when in focus
* `aria-activedescendant` equals ID of current focussed element

#### Multiple selection
* `aria-selected`
 * `true`
		* can be applied to multiple element
   * not automatically applied to the focused element
	* `false`
* `tabindex`
	* allows usage of the element by keys when in focus

**Kind**: global class  
**Summary**: A form widget that allows the user to make selections from a set of choices.  
**Extends**: [<code>Roletype</code>](#Roletype)  

* [Select](#Select) ⇐ [<code>Roletype</code>](#Roletype)
    * [.labelledBy](#AccessibleNode+labelledBy) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.describedBy](#AccessibleNode+describedBy) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.controls](#AccessibleNode+controls) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.flowTo](#AccessibleNode+flowTo) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.owns](#AccessibleNode+owns) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.role](#AccessibleNode+role) : <code>String</code>
    * [.roleDescription](#AccessibleNode+roleDescription) : <code>String</code>
    * [.label](#AccessibleNode+label) : <code>String</code>
    * [.current](#AccessibleNode+current) : <code>Boolean</code> \| <code>String</code>
    * [.autocomplete](#AccessibleNode+autocomplete) : <code>String</code>
    * [.hidden](#AccessibleNode+hidden) : <code>Boolean</code>
    * [.keyShortcuts](#AccessibleNode+keyShortcuts) : <code>String</code>
    * [.modal](#AccessibleNode+modal) : <code>Boolean</code>
    * [.multiline](#AccessibleNode+multiline) : <code>Boolean</code>
    * [.multiselectable](#AccessibleNode+multiselectable) : <code>Boolean</code>
    * [.orientation](#AccessibleNode+orientation) : <code>String</code>
    * [.readOnly](#AccessibleNode+readOnly) : <code>Boolean</code>
    * [.required](#AccessibleNode+required) : <code>Boolean</code>
    * [.selected](#AccessibleNode+selected) : <code>Boolean</code>
    * [.sort](#AccessibleNode+sort) : <code>Boolean</code>
    * [.checked](#AccessibleNode+checked) : <code>String</code>
    * [.expanded](#AccessibleNode+expanded) : <code>Boolean</code>
    * [.disabled](#AccessibleNode+disabled) : <code>Boolean</code>
    * [.invalid](#AccessibleNode+invalid) : <code>String</code>
    * [.hasPopUp](#AccessibleNode+hasPopUp) : <code>String</code>
    * [.pressed](#AccessibleNode+pressed) : <code>String</code>
    * [.valueText](#AccessibleNode+valueText) : <code>String</code>
    * [.placeholder](#AccessibleNode+placeholder) : <code>String</code>
    * [.valueNow](#AccessibleNode+valueNow) : <code>Number</code>
    * [.valueMin](#AccessibleNode+valueMin) : <code>Number</code>
    * [.valueMax](#AccessibleNode+valueMax) : <code>Number</code>
    * [.activeDescendant](#AccessibleNode+activeDescendant) : <code>AcccessibleNode</code>
    * [.details](#AccessibleNode+details) : <code>AcccessibleNode</code>
    * [.errorMessage](#AccessibleNode+errorMessage) : <code>AcccessibleNode</code>
    * [.colCount](#AccessibleNode+colCount) : <code>Integer</code>
    * [.colIndex](#AccessibleNode+colIndex) : <code>Integer</code>
    * [.colSpan](#AccessibleNode+colSpan) : <code>Integer</code>
    * [.posInSet](#AccessibleNode+posInSet) : <code>Integer</code>
    * [.rowCount](#AccessibleNode+rowCount) : <code>Integer</code>
    * [.rowIndex](#AccessibleNode+rowIndex) : <code>Integer</code>
    * [.rowSpan](#AccessibleNode+rowSpan) : <code>Integer</code>
    * [.setSize](#AccessibleNode+setSize) : <code>Integer</code>
    * [.level](#AccessibleNode+level) : <code>Integer</code>
    * [.tabIndex](#Base+tabIndex) : <code>Number</code>
    * [.addListener(label, callback, [options])](#Base+addListener)

<a name="AccessibleNode+labelledBy"></a>

### select.labelledBy : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances that labels the current element

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**

- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby

<a name="AccessibleNode+describedBy"></a>

### select.describedBy : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances that describes the current element

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**

- [AccessibleNode#labeledBy](AccessibleNode#labeledBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-describedby

<a name="AccessibleNode+controls"></a>

### select.controls : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances whose contents or presence are controlled by
the current element.

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**

- [owns](#AccessibleNode+owns)
- https://www.w3.org/TR/wai-aria-1.1/#aria-controls

<a name="AccessibleNode+flowTo"></a>

### select.flowTo : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Contains the next element(s) in an alternate reading order of content which, at the user's 
discretion, allows assistive technology to override the general default of reading in
document source order.

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-flowto  
<a name="AccessibleNode+owns"></a>

### select.owns : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Contains children who's ID are referenced inside the `aria-owns` attribute

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-owns  
<a name="AccessibleNode+role"></a>

### select.role : <code>String</code>
Defines a type it represents, e.g. `tab`

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#roles  
<a name="AccessibleNode+roleDescription"></a>

### select.roleDescription : <code>String</code>
Defines a human-readable, author-localized description for the role

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-roledescription  
<a name="AccessibleNode+label"></a>

### select.label : <code>String</code>
Defines a string value that labels the current element.

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-label  
<a name="AccessibleNode+current"></a>

### select.current : <code>Boolean</code> \| <code>String</code>
Indicates the element that represents the current item within a container or set of related elements.

Possible strings are:
* `page`, used to indicate a link within a set of pagination links, 
		where the link is visually styled to represent the currently-displayed page.
* `step`, used to indicate a link within a step indicator for a step-based process,
		where the link is visually styled to represent the current step.
* `location`, used to indicate the image that is visually highlighted as the current component of a flow chart.
* `date`, used to indicate the current date within a calendar.
* `time`, used to indicate the current time within a timetable.

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-current  
<a name="AccessibleNode+autocomplete"></a>

### select.autocomplete : <code>String</code>
Indicates whether inputting text could trigger display of one or more predictions of the user's
intended value for an input and specifies how predictions would be presented if they are made.

The behavior during input is depends on the provided value, it follows beneath table.

| Value  | 	Description |
| ------ | --- |
| inline | Text suggesting may be dynamically inserted after the caret.
| list   | A collection of values that could complete the provided input is displayed.
| both   | Implements `inline` and `list`
| none   | No prediction is shown

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-autocomplete  
<a name="AccessibleNode+hidden"></a>

### select.hidden : <code>Boolean</code>
Returns/sets the visibility of the element who is exposed to an accessibility API.

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**

- [disabled](#AccessibleNode+disabled)
- https://www.w3.org/TR/wai-aria-1.1/#aria-hidden

<a name="AccessibleNode+keyShortcuts"></a>

### select.keyShortcuts : <code>String</code>
Indicates keyboard shortcuts that an author has implemented to activate or
give focus to an element.

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-keyshortcuts  
<a name="AccessibleNode+modal"></a>

### select.modal : <code>Boolean</code>
Indicates whether an element is modal when displayed.

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-modal  
<a name="AccessibleNode+multiline"></a>

### select.multiline : <code>Boolean</code>
Indicates whether a text box accepts multiple lines of input or only a single line.

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-multiline  
<a name="AccessibleNode+multiselectable"></a>

### select.multiselectable : <code>Boolean</code>
Indicates that the user may select more than one item from the current selectable descendants.

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-multiselectable  
<a name="AccessibleNode+orientation"></a>

### select.orientation : <code>String</code>
Indicates whether the element's orientation is `horizontal`, `vertical`, or `null`.

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-orientation  
<a name="AccessibleNode+readOnly"></a>

### select.readOnly : <code>Boolean</code>
Indicates that the user may select more than one item from the current selectable descendants.

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-readonly  
<a name="AccessibleNode+required"></a>

### select.required : <code>Boolean</code>
Indicates that user input is required on the element before a form may be submitted.

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-required  
<a name="AccessibleNode+selected"></a>

### select.selected : <code>Boolean</code>
Indicates that user input is required on the element before a form may be submitted.

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-selected  
<a name="AccessibleNode+sort"></a>

### select.sort : <code>Boolean</code>
Indicates if items in a table or grid are sorted in ascending or descending order.  
Possible values are `acending`, `descending`, `none`, `other` or `null`.

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-sort  
<a name="AccessibleNode+checked"></a>

### select.checked : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](Checkbox)

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+expanded"></a>

### select.expanded : <code>Boolean</code>
Indicates whether the element, or another grouping element it controls, 
is currently expanded or collapsed.

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-expanded  
<a name="AccessibleNode+disabled"></a>

### select.disabled : <code>Boolean</code>
Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**

- [hidden](#AccessibleNode+hidden)
- [AccessibleNode#readonly](AccessibleNode#readonly)
- https://www.w3.org/TR/wai-aria-1.1/#aria-disabled

<a name="AccessibleNode+invalid"></a>

### select.invalid : <code>String</code>
Indicates the entered value does not conform to the format expected by the application.

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**

- [errorMessage](#AccessibleNode+errorMessage)
- https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage

<a name="AccessibleNode+hasPopUp"></a>

### select.hasPopUp : <code>String</code>
Indicates the availability and type of interactive popup element, such as menu or dialog,
that can be triggered by an element.

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup  
<a name="AccessibleNode+pressed"></a>

### select.pressed : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](Checkbox)

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+valueText"></a>

### select.valueText : <code>String</code>
Returns / sets the human readable text alternative of [#aria-valuenow](#aria-valuenow) for a [Range](#Range) widget.

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext](https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext)  
<a name="AccessibleNode+placeholder"></a>

### select.placeholder : <code>String</code>
Returns / sets a short hint intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder](https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder)  
<a name="AccessibleNode+valueNow"></a>

### select.valueNow : <code>Number</code>
Returns / sets the current value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow](https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow)  
<a name="AccessibleNode+valueMin"></a>

### select.valueMin : <code>Number</code>
Returns / sets the minimum allowed value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin](https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin)  
<a name="AccessibleNode+valueMax"></a>

### select.valueMax : <code>Number</code>
Returns / sets the maximum allowed value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax](https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax)  
<a name="AccessibleNode+activeDescendant"></a>

### select.activeDescendant : <code>AcccessibleNode</code>
Returns / sets the AccessibleNode of the currently active element when focus is on current element.

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-activedescendant  
<a name="AccessibleNode+details"></a>

### select.details : <code>AcccessibleNode</code>
Returns / sets an AccessibleNode that provides a detailed, extended description 
for the current element.

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**

- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-details

<a name="AccessibleNode+errorMessage"></a>

### select.errorMessage : <code>AcccessibleNode</code>
Returns / sets an AccessibleNode that provides an error message for the current element.

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**

- [invalid](#AccessibleNode+invalid)
- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage

<a name="AccessibleNode+colCount"></a>

### select.colCount : <code>Integer</code>
Returns / sets the total number of columns in a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**

- [colIndex](#AccessibleNode+colIndex)
- https://www.w3.org/TR/wai-aria-1.1/#aria-setsize

<a name="AccessibleNode+colIndex"></a>

### select.colIndex : <code>Integer</code>
Defines an element's column index or position with respect to the total number of columns 
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**

- [colCount](#AccessibleNode+colCount)
- [colSpan](#AccessibleNode+colSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-colindex

<a name="AccessibleNode+colSpan"></a>

### select.colSpan : <code>Integer</code>
Defines the number of columns spanned by a cell or gridcell
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**

- [colIndex](#AccessibleNode+colIndex)
- [rowSpan](#AccessibleNode+rowSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-colspan

<a name="AccessibleNode+posInSet"></a>

### select.posInSet : <code>Integer</code>
Defines an element's number or position in the current set of [listitem](listitem)s or [treeitem](treeitem)s.
Not required if all elements in the set are present in the DOM.

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**

- [setSize](#AccessibleNode+setSize)
- https://www.w3.org/TR/wai-aria-1.1/#aria-posinset

<a name="AccessibleNode+rowCount"></a>

### select.rowCount : <code>Integer</code>
Defines the total number of rows in a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**

- [rowIndex](#AccessibleNode+rowIndex)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount

<a name="AccessibleNode+rowIndex"></a>

### select.rowIndex : <code>Integer</code>
Defines an element's row index or position with respect to the total number of rows 
within a  [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**

- [rowCount](#AccessibleNode+rowCount)
- [rowSpan](#AccessibleNode+rowSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex

<a name="AccessibleNode+rowSpan"></a>

### select.rowSpan : <code>Integer</code>
Defines the number of rows spanned by a cell or gridcell
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**

- [rowIndex](#AccessibleNode+rowIndex)
- [colSpan](#AccessibleNode+colSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan

<a name="AccessibleNode+setSize"></a>

### select.setSize : <code>Integer</code>
Defines the number of items in the current set of listitems or treeitems.
Not required if **all** elements in the set are present in the DOM.

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**

- [posInSet](#AccessibleNode+posInSet)
- https://www.w3.org/TR/wai-aria-1.1/#aria-setsize

<a name="AccessibleNode+level"></a>

### select.level : <code>Integer</code>
Defines the hierarchical level of an element within a structure.
E.g. `<h1><h1/>` equals `<div role="heading" aria-level="1"></div>`

**Kind**: instance property of [<code>Select</code>](#Select)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-level  
<a name="Base+tabIndex"></a>

### select.tabIndex : <code>Number</code>
Current tabindex of the element

**Kind**: instance property of [<code>Select</code>](#Select)  
<a name="Base+addListener"></a>

### select.addListener(label, callback, [options])
Adds an listener to the object and targeted element

**Kind**: instance method of [<code>Select</code>](#Select)  
**See**: customEvents  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | Type of event |
| callback | <code>function</code> | Callback function |
| [options] | <code>Object</code> | Extends AddEventListenerOptions |
| [options.key] | <code>String</code> | When label is set to `key` it specifies the keycombo to listen to |
| [options.attribute] | <code>String</code> | When label is set to `attributes` it specifies which attribute should be changed |
| [options.target] | <code>Element</code> | Changes the targeted element |
| [options.capture] | <code>Boolean</code> |  |
| [options.passive] | <code>Boolean</code> |  |
| [options.once] | <code>Boolean</code> |  |

<a name="Widget"></a>

## Widget ⇐ [<code>Roletype</code>](#Roletype)
**Kind**: global class  
**Extends**: [<code>Roletype</code>](#Roletype)  

* [Widget](#Widget) ⇐ [<code>Roletype</code>](#Roletype)
    * [.labelledBy](#AccessibleNode+labelledBy) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.describedBy](#AccessibleNode+describedBy) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.controls](#AccessibleNode+controls) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.flowTo](#AccessibleNode+flowTo) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.owns](#AccessibleNode+owns) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.role](#AccessibleNode+role) : <code>String</code>
    * [.roleDescription](#AccessibleNode+roleDescription) : <code>String</code>
    * [.label](#AccessibleNode+label) : <code>String</code>
    * [.current](#AccessibleNode+current) : <code>Boolean</code> \| <code>String</code>
    * [.autocomplete](#AccessibleNode+autocomplete) : <code>String</code>
    * [.hidden](#AccessibleNode+hidden) : <code>Boolean</code>
    * [.keyShortcuts](#AccessibleNode+keyShortcuts) : <code>String</code>
    * [.modal](#AccessibleNode+modal) : <code>Boolean</code>
    * [.multiline](#AccessibleNode+multiline) : <code>Boolean</code>
    * [.multiselectable](#AccessibleNode+multiselectable) : <code>Boolean</code>
    * [.orientation](#AccessibleNode+orientation) : <code>String</code>
    * [.readOnly](#AccessibleNode+readOnly) : <code>Boolean</code>
    * [.required](#AccessibleNode+required) : <code>Boolean</code>
    * [.selected](#AccessibleNode+selected) : <code>Boolean</code>
    * [.sort](#AccessibleNode+sort) : <code>Boolean</code>
    * [.checked](#AccessibleNode+checked) : <code>String</code>
    * [.expanded](#AccessibleNode+expanded) : <code>Boolean</code>
    * [.disabled](#AccessibleNode+disabled) : <code>Boolean</code>
    * [.invalid](#AccessibleNode+invalid) : <code>String</code>
    * [.hasPopUp](#AccessibleNode+hasPopUp) : <code>String</code>
    * [.pressed](#AccessibleNode+pressed) : <code>String</code>
    * [.valueText](#AccessibleNode+valueText) : <code>String</code>
    * [.placeholder](#AccessibleNode+placeholder) : <code>String</code>
    * [.valueNow](#AccessibleNode+valueNow) : <code>Number</code>
    * [.valueMin](#AccessibleNode+valueMin) : <code>Number</code>
    * [.valueMax](#AccessibleNode+valueMax) : <code>Number</code>
    * [.activeDescendant](#AccessibleNode+activeDescendant) : <code>AcccessibleNode</code>
    * [.details](#AccessibleNode+details) : <code>AcccessibleNode</code>
    * [.errorMessage](#AccessibleNode+errorMessage) : <code>AcccessibleNode</code>
    * [.colCount](#AccessibleNode+colCount) : <code>Integer</code>
    * [.colIndex](#AccessibleNode+colIndex) : <code>Integer</code>
    * [.colSpan](#AccessibleNode+colSpan) : <code>Integer</code>
    * [.posInSet](#AccessibleNode+posInSet) : <code>Integer</code>
    * [.rowCount](#AccessibleNode+rowCount) : <code>Integer</code>
    * [.rowIndex](#AccessibleNode+rowIndex) : <code>Integer</code>
    * [.rowSpan](#AccessibleNode+rowSpan) : <code>Integer</code>
    * [.setSize](#AccessibleNode+setSize) : <code>Integer</code>
    * [.level](#AccessibleNode+level) : <code>Integer</code>
    * [.tabIndex](#Base+tabIndex) : <code>Number</code>
    * [.addListener(label, callback, [options])](#Base+addListener)

<a name="AccessibleNode+labelledBy"></a>

### widget.labelledBy : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances that labels the current element

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**

- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby

<a name="AccessibleNode+describedBy"></a>

### widget.describedBy : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances that describes the current element

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**

- [AccessibleNode#labeledBy](AccessibleNode#labeledBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-describedby

<a name="AccessibleNode+controls"></a>

### widget.controls : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances whose contents or presence are controlled by
the current element.

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**

- [owns](#AccessibleNode+owns)
- https://www.w3.org/TR/wai-aria-1.1/#aria-controls

<a name="AccessibleNode+flowTo"></a>

### widget.flowTo : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Contains the next element(s) in an alternate reading order of content which, at the user's 
discretion, allows assistive technology to override the general default of reading in
document source order.

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-flowto  
<a name="AccessibleNode+owns"></a>

### widget.owns : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Contains children who's ID are referenced inside the `aria-owns` attribute

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-owns  
<a name="AccessibleNode+role"></a>

### widget.role : <code>String</code>
Defines a type it represents, e.g. `tab`

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#roles  
<a name="AccessibleNode+roleDescription"></a>

### widget.roleDescription : <code>String</code>
Defines a human-readable, author-localized description for the role

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-roledescription  
<a name="AccessibleNode+label"></a>

### widget.label : <code>String</code>
Defines a string value that labels the current element.

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-label  
<a name="AccessibleNode+current"></a>

### widget.current : <code>Boolean</code> \| <code>String</code>
Indicates the element that represents the current item within a container or set of related elements.

Possible strings are:
* `page`, used to indicate a link within a set of pagination links, 
		where the link is visually styled to represent the currently-displayed page.
* `step`, used to indicate a link within a step indicator for a step-based process,
		where the link is visually styled to represent the current step.
* `location`, used to indicate the image that is visually highlighted as the current component of a flow chart.
* `date`, used to indicate the current date within a calendar.
* `time`, used to indicate the current time within a timetable.

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-current  
<a name="AccessibleNode+autocomplete"></a>

### widget.autocomplete : <code>String</code>
Indicates whether inputting text could trigger display of one or more predictions of the user's
intended value for an input and specifies how predictions would be presented if they are made.

The behavior during input is depends on the provided value, it follows beneath table.

| Value  | 	Description |
| ------ | --- |
| inline | Text suggesting may be dynamically inserted after the caret.
| list   | A collection of values that could complete the provided input is displayed.
| both   | Implements `inline` and `list`
| none   | No prediction is shown

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-autocomplete  
<a name="AccessibleNode+hidden"></a>

### widget.hidden : <code>Boolean</code>
Returns/sets the visibility of the element who is exposed to an accessibility API.

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**

- [disabled](#AccessibleNode+disabled)
- https://www.w3.org/TR/wai-aria-1.1/#aria-hidden

<a name="AccessibleNode+keyShortcuts"></a>

### widget.keyShortcuts : <code>String</code>
Indicates keyboard shortcuts that an author has implemented to activate or
give focus to an element.

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-keyshortcuts  
<a name="AccessibleNode+modal"></a>

### widget.modal : <code>Boolean</code>
Indicates whether an element is modal when displayed.

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-modal  
<a name="AccessibleNode+multiline"></a>

### widget.multiline : <code>Boolean</code>
Indicates whether a text box accepts multiple lines of input or only a single line.

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-multiline  
<a name="AccessibleNode+multiselectable"></a>

### widget.multiselectable : <code>Boolean</code>
Indicates that the user may select more than one item from the current selectable descendants.

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-multiselectable  
<a name="AccessibleNode+orientation"></a>

### widget.orientation : <code>String</code>
Indicates whether the element's orientation is `horizontal`, `vertical`, or `null`.

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-orientation  
<a name="AccessibleNode+readOnly"></a>

### widget.readOnly : <code>Boolean</code>
Indicates that the user may select more than one item from the current selectable descendants.

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-readonly  
<a name="AccessibleNode+required"></a>

### widget.required : <code>Boolean</code>
Indicates that user input is required on the element before a form may be submitted.

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-required  
<a name="AccessibleNode+selected"></a>

### widget.selected : <code>Boolean</code>
Indicates that user input is required on the element before a form may be submitted.

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-selected  
<a name="AccessibleNode+sort"></a>

### widget.sort : <code>Boolean</code>
Indicates if items in a table or grid are sorted in ascending or descending order.  
Possible values are `acending`, `descending`, `none`, `other` or `null`.

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-sort  
<a name="AccessibleNode+checked"></a>

### widget.checked : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](Checkbox)

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+expanded"></a>

### widget.expanded : <code>Boolean</code>
Indicates whether the element, or another grouping element it controls, 
is currently expanded or collapsed.

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-expanded  
<a name="AccessibleNode+disabled"></a>

### widget.disabled : <code>Boolean</code>
Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**

- [hidden](#AccessibleNode+hidden)
- [AccessibleNode#readonly](AccessibleNode#readonly)
- https://www.w3.org/TR/wai-aria-1.1/#aria-disabled

<a name="AccessibleNode+invalid"></a>

### widget.invalid : <code>String</code>
Indicates the entered value does not conform to the format expected by the application.

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**

- [errorMessage](#AccessibleNode+errorMessage)
- https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage

<a name="AccessibleNode+hasPopUp"></a>

### widget.hasPopUp : <code>String</code>
Indicates the availability and type of interactive popup element, such as menu or dialog,
that can be triggered by an element.

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup  
<a name="AccessibleNode+pressed"></a>

### widget.pressed : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](Checkbox)

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+valueText"></a>

### widget.valueText : <code>String</code>
Returns / sets the human readable text alternative of [#aria-valuenow](#aria-valuenow) for a [Range](#Range) widget.

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext](https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext)  
<a name="AccessibleNode+placeholder"></a>

### widget.placeholder : <code>String</code>
Returns / sets a short hint intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder](https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder)  
<a name="AccessibleNode+valueNow"></a>

### widget.valueNow : <code>Number</code>
Returns / sets the current value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow](https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow)  
<a name="AccessibleNode+valueMin"></a>

### widget.valueMin : <code>Number</code>
Returns / sets the minimum allowed value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin](https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin)  
<a name="AccessibleNode+valueMax"></a>

### widget.valueMax : <code>Number</code>
Returns / sets the maximum allowed value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax](https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax)  
<a name="AccessibleNode+activeDescendant"></a>

### widget.activeDescendant : <code>AcccessibleNode</code>
Returns / sets the AccessibleNode of the currently active element when focus is on current element.

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-activedescendant  
<a name="AccessibleNode+details"></a>

### widget.details : <code>AcccessibleNode</code>
Returns / sets an AccessibleNode that provides a detailed, extended description 
for the current element.

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**

- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-details

<a name="AccessibleNode+errorMessage"></a>

### widget.errorMessage : <code>AcccessibleNode</code>
Returns / sets an AccessibleNode that provides an error message for the current element.

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**

- [invalid](#AccessibleNode+invalid)
- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage

<a name="AccessibleNode+colCount"></a>

### widget.colCount : <code>Integer</code>
Returns / sets the total number of columns in a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**

- [colIndex](#AccessibleNode+colIndex)
- https://www.w3.org/TR/wai-aria-1.1/#aria-setsize

<a name="AccessibleNode+colIndex"></a>

### widget.colIndex : <code>Integer</code>
Defines an element's column index or position with respect to the total number of columns 
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**

- [colCount](#AccessibleNode+colCount)
- [colSpan](#AccessibleNode+colSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-colindex

<a name="AccessibleNode+colSpan"></a>

### widget.colSpan : <code>Integer</code>
Defines the number of columns spanned by a cell or gridcell
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**

- [colIndex](#AccessibleNode+colIndex)
- [rowSpan](#AccessibleNode+rowSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-colspan

<a name="AccessibleNode+posInSet"></a>

### widget.posInSet : <code>Integer</code>
Defines an element's number or position in the current set of [listitem](listitem)s or [treeitem](treeitem)s.
Not required if all elements in the set are present in the DOM.

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**

- [setSize](#AccessibleNode+setSize)
- https://www.w3.org/TR/wai-aria-1.1/#aria-posinset

<a name="AccessibleNode+rowCount"></a>

### widget.rowCount : <code>Integer</code>
Defines the total number of rows in a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**

- [rowIndex](#AccessibleNode+rowIndex)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount

<a name="AccessibleNode+rowIndex"></a>

### widget.rowIndex : <code>Integer</code>
Defines an element's row index or position with respect to the total number of rows 
within a  [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**

- [rowCount](#AccessibleNode+rowCount)
- [rowSpan](#AccessibleNode+rowSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex

<a name="AccessibleNode+rowSpan"></a>

### widget.rowSpan : <code>Integer</code>
Defines the number of rows spanned by a cell or gridcell
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**

- [rowIndex](#AccessibleNode+rowIndex)
- [colSpan](#AccessibleNode+colSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan

<a name="AccessibleNode+setSize"></a>

### widget.setSize : <code>Integer</code>
Defines the number of items in the current set of listitems or treeitems.
Not required if **all** elements in the set are present in the DOM.

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**

- [posInSet](#AccessibleNode+posInSet)
- https://www.w3.org/TR/wai-aria-1.1/#aria-setsize

<a name="AccessibleNode+level"></a>

### widget.level : <code>Integer</code>
Defines the hierarchical level of an element within a structure.
E.g. `<h1><h1/>` equals `<div role="heading" aria-level="1"></div>`

**Kind**: instance property of [<code>Widget</code>](#Widget)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-level  
<a name="Base+tabIndex"></a>

### widget.tabIndex : <code>Number</code>
Current tabindex of the element

**Kind**: instance property of [<code>Widget</code>](#Widget)  
<a name="Base+addListener"></a>

### widget.addListener(label, callback, [options])
Adds an listener to the object and targeted element

**Kind**: instance method of [<code>Widget</code>](#Widget)  
**See**: customEvents  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | Type of event |
| callback | <code>function</code> | Callback function |
| [options] | <code>Object</code> | Extends AddEventListenerOptions |
| [options.key] | <code>String</code> | When label is set to `key` it specifies the keycombo to listen to |
| [options.attribute] | <code>String</code> | When label is set to `attributes` it specifies which attribute should be changed |
| [options.target] | <code>Element</code> | Changes the targeted element |
| [options.capture] | <code>Boolean</code> |  |
| [options.passive] | <code>Boolean</code> |  |
| [options.once] | <code>Boolean</code> |  |

<a name="Alert"></a>

## Alert
**Kind**: global class  
**Summary**: Show a brief, important message to attracts the user's attention without
					interrupting the user's task.  
<a name="new_Alert_new"></a>

### new Alert()
* When dynamically added to the DOM it will announce the message to the user
  and may trigger a sound.
* If already present on a webpage it will **not** inform users.
* It will not interfere with the user's tasks,
  if necessary the [alert dialog]() should be used.
* It should not affect keyboard focus.
* It should not disappear automatically,
	 some users could be unable to read the message before it disappears
	 trough a disability or other cause.

##### Example

<div role="alert">Hello, again!</div>
```html
<div role="alert">
	Hello, again!
</div>
```

<a name="Alertdialog"></a>

## Alertdialog
**Kind**: global class  
**Summary**: A dialog containing an alert message  
<a name="Base"></a>

## Base
Adds some basic functionality that is greatly used inside the components

**Kind**: global class  

* [Base](#Base)
    * [new Base(element, options)](#new_Base_new)
    * [.tabIndex](#Base+tabIndex) : <code>Number</code>
    * [.addListener(label, callback, [options])](#Base+addListener)

<a name="new_Base_new"></a>

### new Base(element, options)

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Element</code> | Element where a AccessibleNode should be created |
| options | <code>Object</code> | Additional options to set |

<a name="Base+tabIndex"></a>

### base.tabIndex : <code>Number</code>
Current tabindex of the element

**Kind**: instance property of [<code>Base</code>](#Base)  
<a name="Base+addListener"></a>

### base.addListener(label, callback, [options])
Adds an listener to the object and targeted element

**Kind**: instance method of [<code>Base</code>](#Base)  
**See**: customEvents  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | Type of event |
| callback | <code>function</code> | Callback function |
| [options] | <code>Object</code> | Extends AddEventListenerOptions |
| [options.key] | <code>String</code> | When label is set to `key` it specifies the keycombo to listen to |
| [options.attribute] | <code>String</code> | When label is set to `attributes` it specifies which attribute should be changed |
| [options.target] | <code>Element</code> | Changes the targeted element |
| [options.capture] | <code>Boolean</code> |  |
| [options.passive] | <code>Boolean</code> |  |
| [options.once] | <code>Boolean</code> |  |

<a name="Button"></a>

## Button ⇐ [<code>Command</code>](#Command)
**Kind**: global class  
**Extends**: [<code>Command</code>](#Command)  
**Mixes**: [<code>AriaExpanded</code>](#AriaExpanded), [<code>AriaPressed</code>](#AriaPressed)  

* [Button](#Button) ⇐ [<code>Command</code>](#Command)
    * [.labelledBy](#AccessibleNode+labelledBy) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.describedBy](#AccessibleNode+describedBy) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.controls](#AccessibleNode+controls) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.flowTo](#AccessibleNode+flowTo) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.owns](#AccessibleNode+owns) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.role](#AccessibleNode+role) : <code>String</code>
    * [.roleDescription](#AccessibleNode+roleDescription) : <code>String</code>
    * [.label](#AccessibleNode+label) : <code>String</code>
    * [.current](#AccessibleNode+current) : <code>Boolean</code> \| <code>String</code>
    * [.autocomplete](#AccessibleNode+autocomplete) : <code>String</code>
    * [.hidden](#AccessibleNode+hidden) : <code>Boolean</code>
    * [.keyShortcuts](#AccessibleNode+keyShortcuts) : <code>String</code>
    * [.modal](#AccessibleNode+modal) : <code>Boolean</code>
    * [.multiline](#AccessibleNode+multiline) : <code>Boolean</code>
    * [.multiselectable](#AccessibleNode+multiselectable) : <code>Boolean</code>
    * [.orientation](#AccessibleNode+orientation) : <code>String</code>
    * [.readOnly](#AccessibleNode+readOnly) : <code>Boolean</code>
    * [.required](#AccessibleNode+required) : <code>Boolean</code>
    * [.selected](#AccessibleNode+selected) : <code>Boolean</code>
    * [.sort](#AccessibleNode+sort) : <code>Boolean</code>
    * [.checked](#AccessibleNode+checked) : <code>String</code>
    * [.expanded](#AccessibleNode+expanded) : <code>Boolean</code>
    * [.disabled](#AccessibleNode+disabled) : <code>Boolean</code>
    * [.invalid](#AccessibleNode+invalid) : <code>String</code>
    * [.hasPopUp](#AccessibleNode+hasPopUp) : <code>String</code>
    * [.pressed](#AccessibleNode+pressed) : <code>String</code>
    * [.valueText](#AccessibleNode+valueText) : <code>String</code>
    * [.placeholder](#AccessibleNode+placeholder) : <code>String</code>
    * [.valueNow](#AccessibleNode+valueNow) : <code>Number</code>
    * [.valueMin](#AccessibleNode+valueMin) : <code>Number</code>
    * [.valueMax](#AccessibleNode+valueMax) : <code>Number</code>
    * [.activeDescendant](#AccessibleNode+activeDescendant) : <code>AcccessibleNode</code>
    * [.details](#AccessibleNode+details) : <code>AcccessibleNode</code>
    * [.errorMessage](#AccessibleNode+errorMessage) : <code>AcccessibleNode</code>
    * [.colCount](#AccessibleNode+colCount) : <code>Integer</code>
    * [.colIndex](#AccessibleNode+colIndex) : <code>Integer</code>
    * [.colSpan](#AccessibleNode+colSpan) : <code>Integer</code>
    * [.posInSet](#AccessibleNode+posInSet) : <code>Integer</code>
    * [.rowCount](#AccessibleNode+rowCount) : <code>Integer</code>
    * [.rowIndex](#AccessibleNode+rowIndex) : <code>Integer</code>
    * [.rowSpan](#AccessibleNode+rowSpan) : <code>Integer</code>
    * [.setSize](#AccessibleNode+setSize) : <code>Integer</code>
    * [.level](#AccessibleNode+level) : <code>Integer</code>
    * [.tabIndex](#Base+tabIndex) : <code>Number</code>
    * [.addListener(label, callback, [options])](#Base+addListener)

<a name="AccessibleNode+labelledBy"></a>

### button.labelledBy : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances that labels the current element

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**

- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby

<a name="AccessibleNode+describedBy"></a>

### button.describedBy : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances that describes the current element

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**

- [AccessibleNode#labeledBy](AccessibleNode#labeledBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-describedby

<a name="AccessibleNode+controls"></a>

### button.controls : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances whose contents or presence are controlled by
the current element.

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**

- [owns](#AccessibleNode+owns)
- https://www.w3.org/TR/wai-aria-1.1/#aria-controls

<a name="AccessibleNode+flowTo"></a>

### button.flowTo : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Contains the next element(s) in an alternate reading order of content which, at the user's 
discretion, allows assistive technology to override the general default of reading in
document source order.

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-flowto  
<a name="AccessibleNode+owns"></a>

### button.owns : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Contains children who's ID are referenced inside the `aria-owns` attribute

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-owns  
<a name="AccessibleNode+role"></a>

### button.role : <code>String</code>
Defines a type it represents, e.g. `tab`

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#roles  
<a name="AccessibleNode+roleDescription"></a>

### button.roleDescription : <code>String</code>
Defines a human-readable, author-localized description for the role

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-roledescription  
<a name="AccessibleNode+label"></a>

### button.label : <code>String</code>
Defines a string value that labels the current element.

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-label  
<a name="AccessibleNode+current"></a>

### button.current : <code>Boolean</code> \| <code>String</code>
Indicates the element that represents the current item within a container or set of related elements.

Possible strings are:
* `page`, used to indicate a link within a set of pagination links, 
		where the link is visually styled to represent the currently-displayed page.
* `step`, used to indicate a link within a step indicator for a step-based process,
		where the link is visually styled to represent the current step.
* `location`, used to indicate the image that is visually highlighted as the current component of a flow chart.
* `date`, used to indicate the current date within a calendar.
* `time`, used to indicate the current time within a timetable.

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-current  
<a name="AccessibleNode+autocomplete"></a>

### button.autocomplete : <code>String</code>
Indicates whether inputting text could trigger display of one or more predictions of the user's
intended value for an input and specifies how predictions would be presented if they are made.

The behavior during input is depends on the provided value, it follows beneath table.

| Value  | 	Description |
| ------ | --- |
| inline | Text suggesting may be dynamically inserted after the caret.
| list   | A collection of values that could complete the provided input is displayed.
| both   | Implements `inline` and `list`
| none   | No prediction is shown

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-autocomplete  
<a name="AccessibleNode+hidden"></a>

### button.hidden : <code>Boolean</code>
Returns/sets the visibility of the element who is exposed to an accessibility API.

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**

- [disabled](#AccessibleNode+disabled)
- https://www.w3.org/TR/wai-aria-1.1/#aria-hidden

<a name="AccessibleNode+keyShortcuts"></a>

### button.keyShortcuts : <code>String</code>
Indicates keyboard shortcuts that an author has implemented to activate or
give focus to an element.

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-keyshortcuts  
<a name="AccessibleNode+modal"></a>

### button.modal : <code>Boolean</code>
Indicates whether an element is modal when displayed.

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-modal  
<a name="AccessibleNode+multiline"></a>

### button.multiline : <code>Boolean</code>
Indicates whether a text box accepts multiple lines of input or only a single line.

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-multiline  
<a name="AccessibleNode+multiselectable"></a>

### button.multiselectable : <code>Boolean</code>
Indicates that the user may select more than one item from the current selectable descendants.

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-multiselectable  
<a name="AccessibleNode+orientation"></a>

### button.orientation : <code>String</code>
Indicates whether the element's orientation is `horizontal`, `vertical`, or `null`.

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-orientation  
<a name="AccessibleNode+readOnly"></a>

### button.readOnly : <code>Boolean</code>
Indicates that the user may select more than one item from the current selectable descendants.

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-readonly  
<a name="AccessibleNode+required"></a>

### button.required : <code>Boolean</code>
Indicates that user input is required on the element before a form may be submitted.

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-required  
<a name="AccessibleNode+selected"></a>

### button.selected : <code>Boolean</code>
Indicates that user input is required on the element before a form may be submitted.

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-selected  
<a name="AccessibleNode+sort"></a>

### button.sort : <code>Boolean</code>
Indicates if items in a table or grid are sorted in ascending or descending order.  
Possible values are `acending`, `descending`, `none`, `other` or `null`.

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-sort  
<a name="AccessibleNode+checked"></a>

### button.checked : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](Checkbox)

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+expanded"></a>

### button.expanded : <code>Boolean</code>
Indicates whether the element, or another grouping element it controls, 
is currently expanded or collapsed.

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-expanded  
<a name="AccessibleNode+disabled"></a>

### button.disabled : <code>Boolean</code>
Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**

- [hidden](#AccessibleNode+hidden)
- [AccessibleNode#readonly](AccessibleNode#readonly)
- https://www.w3.org/TR/wai-aria-1.1/#aria-disabled

<a name="AccessibleNode+invalid"></a>

### button.invalid : <code>String</code>
Indicates the entered value does not conform to the format expected by the application.

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**

- [errorMessage](#AccessibleNode+errorMessage)
- https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage

<a name="AccessibleNode+hasPopUp"></a>

### button.hasPopUp : <code>String</code>
Indicates the availability and type of interactive popup element, such as menu or dialog,
that can be triggered by an element.

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup  
<a name="AccessibleNode+pressed"></a>

### button.pressed : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](Checkbox)

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+valueText"></a>

### button.valueText : <code>String</code>
Returns / sets the human readable text alternative of [#aria-valuenow](#aria-valuenow) for a [Range](#Range) widget.

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext](https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext)  
<a name="AccessibleNode+placeholder"></a>

### button.placeholder : <code>String</code>
Returns / sets a short hint intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder](https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder)  
<a name="AccessibleNode+valueNow"></a>

### button.valueNow : <code>Number</code>
Returns / sets the current value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow](https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow)  
<a name="AccessibleNode+valueMin"></a>

### button.valueMin : <code>Number</code>
Returns / sets the minimum allowed value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin](https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin)  
<a name="AccessibleNode+valueMax"></a>

### button.valueMax : <code>Number</code>
Returns / sets the maximum allowed value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax](https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax)  
<a name="AccessibleNode+activeDescendant"></a>

### button.activeDescendant : <code>AcccessibleNode</code>
Returns / sets the AccessibleNode of the currently active element when focus is on current element.

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-activedescendant  
<a name="AccessibleNode+details"></a>

### button.details : <code>AcccessibleNode</code>
Returns / sets an AccessibleNode that provides a detailed, extended description 
for the current element.

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**

- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-details

<a name="AccessibleNode+errorMessage"></a>

### button.errorMessage : <code>AcccessibleNode</code>
Returns / sets an AccessibleNode that provides an error message for the current element.

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**

- [invalid](#AccessibleNode+invalid)
- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage

<a name="AccessibleNode+colCount"></a>

### button.colCount : <code>Integer</code>
Returns / sets the total number of columns in a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**

- [colIndex](#AccessibleNode+colIndex)
- https://www.w3.org/TR/wai-aria-1.1/#aria-setsize

<a name="AccessibleNode+colIndex"></a>

### button.colIndex : <code>Integer</code>
Defines an element's column index or position with respect to the total number of columns 
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**

- [colCount](#AccessibleNode+colCount)
- [colSpan](#AccessibleNode+colSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-colindex

<a name="AccessibleNode+colSpan"></a>

### button.colSpan : <code>Integer</code>
Defines the number of columns spanned by a cell or gridcell
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**

- [colIndex](#AccessibleNode+colIndex)
- [rowSpan](#AccessibleNode+rowSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-colspan

<a name="AccessibleNode+posInSet"></a>

### button.posInSet : <code>Integer</code>
Defines an element's number or position in the current set of [listitem](listitem)s or [treeitem](treeitem)s.
Not required if all elements in the set are present in the DOM.

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**

- [setSize](#AccessibleNode+setSize)
- https://www.w3.org/TR/wai-aria-1.1/#aria-posinset

<a name="AccessibleNode+rowCount"></a>

### button.rowCount : <code>Integer</code>
Defines the total number of rows in a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**

- [rowIndex](#AccessibleNode+rowIndex)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount

<a name="AccessibleNode+rowIndex"></a>

### button.rowIndex : <code>Integer</code>
Defines an element's row index or position with respect to the total number of rows 
within a  [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**

- [rowCount](#AccessibleNode+rowCount)
- [rowSpan](#AccessibleNode+rowSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex

<a name="AccessibleNode+rowSpan"></a>

### button.rowSpan : <code>Integer</code>
Defines the number of rows spanned by a cell or gridcell
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**

- [rowIndex](#AccessibleNode+rowIndex)
- [colSpan](#AccessibleNode+colSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan

<a name="AccessibleNode+setSize"></a>

### button.setSize : <code>Integer</code>
Defines the number of items in the current set of listitems or treeitems.
Not required if **all** elements in the set are present in the DOM.

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**

- [posInSet](#AccessibleNode+posInSet)
- https://www.w3.org/TR/wai-aria-1.1/#aria-setsize

<a name="AccessibleNode+level"></a>

### button.level : <code>Integer</code>
Defines the hierarchical level of an element within a structure.
E.g. `<h1><h1/>` equals `<div role="heading" aria-level="1"></div>`

**Kind**: instance property of [<code>Button</code>](#Button)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-level  
<a name="Base+tabIndex"></a>

### button.tabIndex : <code>Number</code>
Current tabindex of the element

**Kind**: instance property of [<code>Button</code>](#Button)  
<a name="Base+addListener"></a>

### button.addListener(label, callback, [options])
Adds an listener to the object and targeted element

**Kind**: instance method of [<code>Button</code>](#Button)  
**See**: customEvents  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | Type of event |
| callback | <code>function</code> | Callback function |
| [options] | <code>Object</code> | Extends AddEventListenerOptions |
| [options.key] | <code>String</code> | When label is set to `key` it specifies the keycombo to listen to |
| [options.attribute] | <code>String</code> | When label is set to `attributes` it specifies which attribute should be changed |
| [options.target] | <code>Element</code> | Changes the targeted element |
| [options.capture] | <code>Boolean</code> |  |
| [options.passive] | <code>Boolean</code> |  |
| [options.once] | <code>Boolean</code> |  |

<a name="Combobox"></a>

## Combobox ⇐ [<code>Roletype</code>](#Roletype)
A combobox is a widget made up of the combination of two distinct elements: 

1. a single-line textbox
2. an associated pop-up element for helping users set the value of the textbox. 

The popup may be a listbox, grid, tree, or dialog. Many implementations also include a third 
optional element -- a graphical button adjacent to the textbox, indicating the availability of
the popup. Activating the button displays the popup if suggestions are available.

**Kind**: global class  
**Extends**: [<code>Roletype</code>](#Roletype)  

* [Combobox](#Combobox) ⇐ [<code>Roletype</code>](#Roletype)
    * [new Combobox()](#new_Combobox_new)
    * [.labelledBy](#AccessibleNode+labelledBy) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.describedBy](#AccessibleNode+describedBy) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.controls](#AccessibleNode+controls) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.flowTo](#AccessibleNode+flowTo) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.owns](#AccessibleNode+owns) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.role](#AccessibleNode+role) : <code>String</code>
    * [.roleDescription](#AccessibleNode+roleDescription) : <code>String</code>
    * [.label](#AccessibleNode+label) : <code>String</code>
    * [.current](#AccessibleNode+current) : <code>Boolean</code> \| <code>String</code>
    * [.autocomplete](#AccessibleNode+autocomplete) : <code>String</code>
    * [.hidden](#AccessibleNode+hidden) : <code>Boolean</code>
    * [.keyShortcuts](#AccessibleNode+keyShortcuts) : <code>String</code>
    * [.modal](#AccessibleNode+modal) : <code>Boolean</code>
    * [.multiline](#AccessibleNode+multiline) : <code>Boolean</code>
    * [.multiselectable](#AccessibleNode+multiselectable) : <code>Boolean</code>
    * [.orientation](#AccessibleNode+orientation) : <code>String</code>
    * [.readOnly](#AccessibleNode+readOnly) : <code>Boolean</code>
    * [.required](#AccessibleNode+required) : <code>Boolean</code>
    * [.selected](#AccessibleNode+selected) : <code>Boolean</code>
    * [.sort](#AccessibleNode+sort) : <code>Boolean</code>
    * [.checked](#AccessibleNode+checked) : <code>String</code>
    * [.expanded](#AccessibleNode+expanded) : <code>Boolean</code>
    * [.disabled](#AccessibleNode+disabled) : <code>Boolean</code>
    * [.invalid](#AccessibleNode+invalid) : <code>String</code>
    * [.hasPopUp](#AccessibleNode+hasPopUp) : <code>String</code>
    * [.pressed](#AccessibleNode+pressed) : <code>String</code>
    * [.valueText](#AccessibleNode+valueText) : <code>String</code>
    * [.placeholder](#AccessibleNode+placeholder) : <code>String</code>
    * [.valueNow](#AccessibleNode+valueNow) : <code>Number</code>
    * [.valueMin](#AccessibleNode+valueMin) : <code>Number</code>
    * [.valueMax](#AccessibleNode+valueMax) : <code>Number</code>
    * [.activeDescendant](#AccessibleNode+activeDescendant) : <code>AcccessibleNode</code>
    * [.details](#AccessibleNode+details) : <code>AcccessibleNode</code>
    * [.errorMessage](#AccessibleNode+errorMessage) : <code>AcccessibleNode</code>
    * [.colCount](#AccessibleNode+colCount) : <code>Integer</code>
    * [.colIndex](#AccessibleNode+colIndex) : <code>Integer</code>
    * [.colSpan](#AccessibleNode+colSpan) : <code>Integer</code>
    * [.posInSet](#AccessibleNode+posInSet) : <code>Integer</code>
    * [.rowCount](#AccessibleNode+rowCount) : <code>Integer</code>
    * [.rowIndex](#AccessibleNode+rowIndex) : <code>Integer</code>
    * [.rowSpan](#AccessibleNode+rowSpan) : <code>Integer</code>
    * [.setSize](#AccessibleNode+setSize) : <code>Integer</code>
    * [.level](#AccessibleNode+level) : <code>Integer</code>
    * [.tabIndex](#Base+tabIndex) : <code>Number</code>
    * [.addListener(label, callback, [options])](#Base+addListener)

<a name="new_Combobox_new"></a>

### new Combobox()

| Param | Type | Description |
| --- | --- | --- |
| options.combobox.input | <code>Element</code> | Defaults to first input element inside the element |
| [options.combobox.open] | <code>Element</code> | Optional button to open the pop-up element,  	defaults to first button element inside the element |

<a name="AccessibleNode+labelledBy"></a>

### combobox.labelledBy : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances that labels the current element

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**

- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby

<a name="AccessibleNode+describedBy"></a>

### combobox.describedBy : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances that describes the current element

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**

- [AccessibleNode#labeledBy](AccessibleNode#labeledBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-describedby

<a name="AccessibleNode+controls"></a>

### combobox.controls : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances whose contents or presence are controlled by
the current element.

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**

- [owns](#AccessibleNode+owns)
- https://www.w3.org/TR/wai-aria-1.1/#aria-controls

<a name="AccessibleNode+flowTo"></a>

### combobox.flowTo : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Contains the next element(s) in an alternate reading order of content which, at the user's 
discretion, allows assistive technology to override the general default of reading in
document source order.

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-flowto  
<a name="AccessibleNode+owns"></a>

### combobox.owns : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Contains children who's ID are referenced inside the `aria-owns` attribute

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-owns  
<a name="AccessibleNode+role"></a>

### combobox.role : <code>String</code>
Defines a type it represents, e.g. `tab`

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#roles  
<a name="AccessibleNode+roleDescription"></a>

### combobox.roleDescription : <code>String</code>
Defines a human-readable, author-localized description for the role

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-roledescription  
<a name="AccessibleNode+label"></a>

### combobox.label : <code>String</code>
Defines a string value that labels the current element.

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-label  
<a name="AccessibleNode+current"></a>

### combobox.current : <code>Boolean</code> \| <code>String</code>
Indicates the element that represents the current item within a container or set of related elements.

Possible strings are:
* `page`, used to indicate a link within a set of pagination links, 
		where the link is visually styled to represent the currently-displayed page.
* `step`, used to indicate a link within a step indicator for a step-based process,
		where the link is visually styled to represent the current step.
* `location`, used to indicate the image that is visually highlighted as the current component of a flow chart.
* `date`, used to indicate the current date within a calendar.
* `time`, used to indicate the current time within a timetable.

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-current  
<a name="AccessibleNode+autocomplete"></a>

### combobox.autocomplete : <code>String</code>
Indicates whether inputting text could trigger display of one or more predictions of the user's
intended value for an input and specifies how predictions would be presented if they are made.

The behavior during input is depends on the provided value, it follows beneath table.

| Value  | 	Description |
| ------ | --- |
| inline | Text suggesting may be dynamically inserted after the caret.
| list   | A collection of values that could complete the provided input is displayed.
| both   | Implements `inline` and `list`
| none   | No prediction is shown

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-autocomplete  
<a name="AccessibleNode+hidden"></a>

### combobox.hidden : <code>Boolean</code>
Returns/sets the visibility of the element who is exposed to an accessibility API.

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**

- [disabled](#AccessibleNode+disabled)
- https://www.w3.org/TR/wai-aria-1.1/#aria-hidden

<a name="AccessibleNode+keyShortcuts"></a>

### combobox.keyShortcuts : <code>String</code>
Indicates keyboard shortcuts that an author has implemented to activate or
give focus to an element.

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-keyshortcuts  
<a name="AccessibleNode+modal"></a>

### combobox.modal : <code>Boolean</code>
Indicates whether an element is modal when displayed.

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-modal  
<a name="AccessibleNode+multiline"></a>

### combobox.multiline : <code>Boolean</code>
Indicates whether a text box accepts multiple lines of input or only a single line.

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-multiline  
<a name="AccessibleNode+multiselectable"></a>

### combobox.multiselectable : <code>Boolean</code>
Indicates that the user may select more than one item from the current selectable descendants.

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-multiselectable  
<a name="AccessibleNode+orientation"></a>

### combobox.orientation : <code>String</code>
Indicates whether the element's orientation is `horizontal`, `vertical`, or `null`.

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-orientation  
<a name="AccessibleNode+readOnly"></a>

### combobox.readOnly : <code>Boolean</code>
Indicates that the user may select more than one item from the current selectable descendants.

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-readonly  
<a name="AccessibleNode+required"></a>

### combobox.required : <code>Boolean</code>
Indicates that user input is required on the element before a form may be submitted.

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-required  
<a name="AccessibleNode+selected"></a>

### combobox.selected : <code>Boolean</code>
Indicates that user input is required on the element before a form may be submitted.

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-selected  
<a name="AccessibleNode+sort"></a>

### combobox.sort : <code>Boolean</code>
Indicates if items in a table or grid are sorted in ascending or descending order.  
Possible values are `acending`, `descending`, `none`, `other` or `null`.

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-sort  
<a name="AccessibleNode+checked"></a>

### combobox.checked : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](Checkbox)

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+expanded"></a>

### combobox.expanded : <code>Boolean</code>
Indicates whether the element, or another grouping element it controls, 
is currently expanded or collapsed.

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**Overrides**: [<code>expanded</code>](#AccessibleNode+expanded)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-expanded  
<a name="AccessibleNode+disabled"></a>

### combobox.disabled : <code>Boolean</code>
Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**

- [hidden](#AccessibleNode+hidden)
- [AccessibleNode#readonly](AccessibleNode#readonly)
- https://www.w3.org/TR/wai-aria-1.1/#aria-disabled

<a name="AccessibleNode+invalid"></a>

### combobox.invalid : <code>String</code>
Indicates the entered value does not conform to the format expected by the application.

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**

- [errorMessage](#AccessibleNode+errorMessage)
- https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage

<a name="AccessibleNode+hasPopUp"></a>

### combobox.hasPopUp : <code>String</code>
Indicates the availability and type of interactive popup element, such as menu or dialog,
that can be triggered by an element.

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup  
<a name="AccessibleNode+pressed"></a>

### combobox.pressed : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](Checkbox)

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+valueText"></a>

### combobox.valueText : <code>String</code>
Returns / sets the human readable text alternative of [#aria-valuenow](#aria-valuenow) for a [Range](#Range) widget.

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext](https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext)  
<a name="AccessibleNode+placeholder"></a>

### combobox.placeholder : <code>String</code>
Returns / sets a short hint intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder](https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder)  
<a name="AccessibleNode+valueNow"></a>

### combobox.valueNow : <code>Number</code>
Returns / sets the current value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow](https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow)  
<a name="AccessibleNode+valueMin"></a>

### combobox.valueMin : <code>Number</code>
Returns / sets the minimum allowed value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin](https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin)  
<a name="AccessibleNode+valueMax"></a>

### combobox.valueMax : <code>Number</code>
Returns / sets the maximum allowed value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax](https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax)  
<a name="AccessibleNode+activeDescendant"></a>

### combobox.activeDescendant : <code>AcccessibleNode</code>
Returns / sets the AccessibleNode of the currently active element when focus is on current element.

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-activedescendant  
<a name="AccessibleNode+details"></a>

### combobox.details : <code>AcccessibleNode</code>
Returns / sets an AccessibleNode that provides a detailed, extended description 
for the current element.

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**

- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-details

<a name="AccessibleNode+errorMessage"></a>

### combobox.errorMessage : <code>AcccessibleNode</code>
Returns / sets an AccessibleNode that provides an error message for the current element.

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**

- [invalid](#AccessibleNode+invalid)
- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage

<a name="AccessibleNode+colCount"></a>

### combobox.colCount : <code>Integer</code>
Returns / sets the total number of columns in a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**

- [colIndex](#AccessibleNode+colIndex)
- https://www.w3.org/TR/wai-aria-1.1/#aria-setsize

<a name="AccessibleNode+colIndex"></a>

### combobox.colIndex : <code>Integer</code>
Defines an element's column index or position with respect to the total number of columns 
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**

- [colCount](#AccessibleNode+colCount)
- [colSpan](#AccessibleNode+colSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-colindex

<a name="AccessibleNode+colSpan"></a>

### combobox.colSpan : <code>Integer</code>
Defines the number of columns spanned by a cell or gridcell
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**

- [colIndex](#AccessibleNode+colIndex)
- [rowSpan](#AccessibleNode+rowSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-colspan

<a name="AccessibleNode+posInSet"></a>

### combobox.posInSet : <code>Integer</code>
Defines an element's number or position in the current set of [listitem](listitem)s or [treeitem](treeitem)s.
Not required if all elements in the set are present in the DOM.

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**

- [setSize](#AccessibleNode+setSize)
- https://www.w3.org/TR/wai-aria-1.1/#aria-posinset

<a name="AccessibleNode+rowCount"></a>

### combobox.rowCount : <code>Integer</code>
Defines the total number of rows in a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**

- [rowIndex](#AccessibleNode+rowIndex)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount

<a name="AccessibleNode+rowIndex"></a>

### combobox.rowIndex : <code>Integer</code>
Defines an element's row index or position with respect to the total number of rows 
within a  [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**

- [rowCount](#AccessibleNode+rowCount)
- [rowSpan](#AccessibleNode+rowSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex

<a name="AccessibleNode+rowSpan"></a>

### combobox.rowSpan : <code>Integer</code>
Defines the number of rows spanned by a cell or gridcell
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**

- [rowIndex](#AccessibleNode+rowIndex)
- [colSpan](#AccessibleNode+colSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan

<a name="AccessibleNode+setSize"></a>

### combobox.setSize : <code>Integer</code>
Defines the number of items in the current set of listitems or treeitems.
Not required if **all** elements in the set are present in the DOM.

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**

- [posInSet](#AccessibleNode+posInSet)
- https://www.w3.org/TR/wai-aria-1.1/#aria-setsize

<a name="AccessibleNode+level"></a>

### combobox.level : <code>Integer</code>
Defines the hierarchical level of an element within a structure.
E.g. `<h1><h1/>` equals `<div role="heading" aria-level="1"></div>`

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-level  
<a name="Base+tabIndex"></a>

### combobox.tabIndex : <code>Number</code>
Current tabindex of the element

**Kind**: instance property of [<code>Combobox</code>](#Combobox)  
<a name="Base+addListener"></a>

### combobox.addListener(label, callback, [options])
Adds an listener to the object and targeted element

**Kind**: instance method of [<code>Combobox</code>](#Combobox)  
**See**: customEvents  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | Type of event |
| callback | <code>function</code> | Callback function |
| [options] | <code>Object</code> | Extends AddEventListenerOptions |
| [options.key] | <code>String</code> | When label is set to `key` it specifies the keycombo to listen to |
| [options.attribute] | <code>String</code> | When label is set to `attributes` it specifies which attribute should be changed |
| [options.target] | <code>Element</code> | Changes the targeted element |
| [options.capture] | <code>Boolean</code> |  |
| [options.passive] | <code>Boolean</code> |  |
| [options.once] | <code>Boolean</code> |  |

<a name="Dialog"></a>

## Dialog
**Kind**: global class  
**Summary**: A child window within a webpage  
<a name="new_Dialog_new"></a>

### new Dialog()
* Prompts the user to perform a specific action
* If it is designed to interrup, it is usually a modal. See [alertdialog]()
* It should have a label, it can be done with the `aria-label` attribute
* It should have at least one focusable descendant element.
* It should focus an element in the modal when displayed.
* It should manage focus of modal dialogs (keep the focus inside the open modal).

##### example

<div role="dialog" aria-label="Window to confirm your acceptance of this world">
 Hello world!
	<button focus type="button">Ok</button>
</div>

<a name="Link"></a>

## Link ⇐ [<code>Command</code>](#Command)
An interactive reference to an internal or external resource that,
when activated, causes the user agent to navigate to that resource.

**Kind**: global class  
**Extends**: [<code>Command</code>](#Command)  
**Mixes**: [<code>AriaExpanded</code>](#AriaExpanded)  

* [Link](#Link) ⇐ [<code>Command</code>](#Command)
    * [new Link()](#new_Link_new)
    * [.labelledBy](#AccessibleNode+labelledBy) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.describedBy](#AccessibleNode+describedBy) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.controls](#AccessibleNode+controls) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.flowTo](#AccessibleNode+flowTo) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.owns](#AccessibleNode+owns) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.role](#AccessibleNode+role) : <code>String</code>
    * [.roleDescription](#AccessibleNode+roleDescription) : <code>String</code>
    * [.label](#AccessibleNode+label) : <code>String</code>
    * [.current](#AccessibleNode+current) : <code>Boolean</code> \| <code>String</code>
    * [.autocomplete](#AccessibleNode+autocomplete) : <code>String</code>
    * [.hidden](#AccessibleNode+hidden) : <code>Boolean</code>
    * [.keyShortcuts](#AccessibleNode+keyShortcuts) : <code>String</code>
    * [.modal](#AccessibleNode+modal) : <code>Boolean</code>
    * [.multiline](#AccessibleNode+multiline) : <code>Boolean</code>
    * [.multiselectable](#AccessibleNode+multiselectable) : <code>Boolean</code>
    * [.orientation](#AccessibleNode+orientation) : <code>String</code>
    * [.readOnly](#AccessibleNode+readOnly) : <code>Boolean</code>
    * [.required](#AccessibleNode+required) : <code>Boolean</code>
    * [.selected](#AccessibleNode+selected) : <code>Boolean</code>
    * [.sort](#AccessibleNode+sort) : <code>Boolean</code>
    * [.checked](#AccessibleNode+checked) : <code>String</code>
    * [.expanded](#AccessibleNode+expanded) : <code>Boolean</code>
    * [.disabled](#AccessibleNode+disabled) : <code>Boolean</code>
    * [.invalid](#AccessibleNode+invalid) : <code>String</code>
    * [.hasPopUp](#AccessibleNode+hasPopUp) : <code>String</code>
    * [.pressed](#AccessibleNode+pressed) : <code>String</code>
    * [.valueText](#AccessibleNode+valueText) : <code>String</code>
    * [.placeholder](#AccessibleNode+placeholder) : <code>String</code>
    * [.valueNow](#AccessibleNode+valueNow) : <code>Number</code>
    * [.valueMin](#AccessibleNode+valueMin) : <code>Number</code>
    * [.valueMax](#AccessibleNode+valueMax) : <code>Number</code>
    * [.activeDescendant](#AccessibleNode+activeDescendant) : <code>AcccessibleNode</code>
    * [.details](#AccessibleNode+details) : <code>AcccessibleNode</code>
    * [.errorMessage](#AccessibleNode+errorMessage) : <code>AcccessibleNode</code>
    * [.colCount](#AccessibleNode+colCount) : <code>Integer</code>
    * [.colIndex](#AccessibleNode+colIndex) : <code>Integer</code>
    * [.colSpan](#AccessibleNode+colSpan) : <code>Integer</code>
    * [.posInSet](#AccessibleNode+posInSet) : <code>Integer</code>
    * [.rowCount](#AccessibleNode+rowCount) : <code>Integer</code>
    * [.rowIndex](#AccessibleNode+rowIndex) : <code>Integer</code>
    * [.rowSpan](#AccessibleNode+rowSpan) : <code>Integer</code>
    * [.setSize](#AccessibleNode+setSize) : <code>Integer</code>
    * [.level](#AccessibleNode+level) : <code>Integer</code>
    * [.tabIndex](#Base+tabIndex) : <code>Number</code>
    * [.onExpanded(ev)](#Link+onExpanded)
    * [.onClick(ev)](#Link+onClick)
    * [.addListener(label, callback, [options])](#Base+addListener)
    * ["accessibleclick"](#Link+event_accessibleclick)

<a name="new_Link_new"></a>

### new Link()

| Param | Type | Description |
| --- | --- | --- |
| options.link.href | <code>String</code> | URL that should be used |

**Example**  
```js
<div role="link" data-link-href="http://www.example.com/" tabindex="0">
	Open website
</div>
```
<a name="AccessibleNode+labelledBy"></a>

### link.labelledBy : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances that labels the current element

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**

- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby

<a name="AccessibleNode+describedBy"></a>

### link.describedBy : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances that describes the current element

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**

- [AccessibleNode#labeledBy](AccessibleNode#labeledBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-describedby

<a name="AccessibleNode+controls"></a>

### link.controls : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances whose contents or presence are controlled by
the current element.

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**

- [owns](#AccessibleNode+owns)
- https://www.w3.org/TR/wai-aria-1.1/#aria-controls

<a name="AccessibleNode+flowTo"></a>

### link.flowTo : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Contains the next element(s) in an alternate reading order of content which, at the user's 
discretion, allows assistive technology to override the general default of reading in
document source order.

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-flowto  
<a name="AccessibleNode+owns"></a>

### link.owns : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Contains children who's ID are referenced inside the `aria-owns` attribute

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-owns  
<a name="AccessibleNode+role"></a>

### link.role : <code>String</code>
Defines a type it represents, e.g. `tab`

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#roles  
<a name="AccessibleNode+roleDescription"></a>

### link.roleDescription : <code>String</code>
Defines a human-readable, author-localized description for the role

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-roledescription  
<a name="AccessibleNode+label"></a>

### link.label : <code>String</code>
Defines a string value that labels the current element.

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-label  
<a name="AccessibleNode+current"></a>

### link.current : <code>Boolean</code> \| <code>String</code>
Indicates the element that represents the current item within a container or set of related elements.

Possible strings are:
* `page`, used to indicate a link within a set of pagination links, 
		where the link is visually styled to represent the currently-displayed page.
* `step`, used to indicate a link within a step indicator for a step-based process,
		where the link is visually styled to represent the current step.
* `location`, used to indicate the image that is visually highlighted as the current component of a flow chart.
* `date`, used to indicate the current date within a calendar.
* `time`, used to indicate the current time within a timetable.

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-current  
<a name="AccessibleNode+autocomplete"></a>

### link.autocomplete : <code>String</code>
Indicates whether inputting text could trigger display of one or more predictions of the user's
intended value for an input and specifies how predictions would be presented if they are made.

The behavior during input is depends on the provided value, it follows beneath table.

| Value  | 	Description |
| ------ | --- |
| inline | Text suggesting may be dynamically inserted after the caret.
| list   | A collection of values that could complete the provided input is displayed.
| both   | Implements `inline` and `list`
| none   | No prediction is shown

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-autocomplete  
<a name="AccessibleNode+hidden"></a>

### link.hidden : <code>Boolean</code>
Returns/sets the visibility of the element who is exposed to an accessibility API.

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**

- [disabled](#AccessibleNode+disabled)
- https://www.w3.org/TR/wai-aria-1.1/#aria-hidden

<a name="AccessibleNode+keyShortcuts"></a>

### link.keyShortcuts : <code>String</code>
Indicates keyboard shortcuts that an author has implemented to activate or
give focus to an element.

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-keyshortcuts  
<a name="AccessibleNode+modal"></a>

### link.modal : <code>Boolean</code>
Indicates whether an element is modal when displayed.

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-modal  
<a name="AccessibleNode+multiline"></a>

### link.multiline : <code>Boolean</code>
Indicates whether a text box accepts multiple lines of input or only a single line.

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-multiline  
<a name="AccessibleNode+multiselectable"></a>

### link.multiselectable : <code>Boolean</code>
Indicates that the user may select more than one item from the current selectable descendants.

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-multiselectable  
<a name="AccessibleNode+orientation"></a>

### link.orientation : <code>String</code>
Indicates whether the element's orientation is `horizontal`, `vertical`, or `null`.

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-orientation  
<a name="AccessibleNode+readOnly"></a>

### link.readOnly : <code>Boolean</code>
Indicates that the user may select more than one item from the current selectable descendants.

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-readonly  
<a name="AccessibleNode+required"></a>

### link.required : <code>Boolean</code>
Indicates that user input is required on the element before a form may be submitted.

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-required  
<a name="AccessibleNode+selected"></a>

### link.selected : <code>Boolean</code>
Indicates that user input is required on the element before a form may be submitted.

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-selected  
<a name="AccessibleNode+sort"></a>

### link.sort : <code>Boolean</code>
Indicates if items in a table or grid are sorted in ascending or descending order.  
Possible values are `acending`, `descending`, `none`, `other` or `null`.

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-sort  
<a name="AccessibleNode+checked"></a>

### link.checked : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](Checkbox)

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+expanded"></a>

### link.expanded : <code>Boolean</code>
Indicates whether the element, or another grouping element it controls, 
is currently expanded or collapsed.

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-expanded  
<a name="AccessibleNode+disabled"></a>

### link.disabled : <code>Boolean</code>
Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**

- [hidden](#AccessibleNode+hidden)
- [AccessibleNode#readonly](AccessibleNode#readonly)
- https://www.w3.org/TR/wai-aria-1.1/#aria-disabled

<a name="AccessibleNode+invalid"></a>

### link.invalid : <code>String</code>
Indicates the entered value does not conform to the format expected by the application.

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**

- [errorMessage](#AccessibleNode+errorMessage)
- https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage

<a name="AccessibleNode+hasPopUp"></a>

### link.hasPopUp : <code>String</code>
Indicates the availability and type of interactive popup element, such as menu or dialog,
that can be triggered by an element.

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup  
<a name="AccessibleNode+pressed"></a>

### link.pressed : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](Checkbox)

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+valueText"></a>

### link.valueText : <code>String</code>
Returns / sets the human readable text alternative of [#aria-valuenow](#aria-valuenow) for a [Range](#Range) widget.

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext](https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext)  
<a name="AccessibleNode+placeholder"></a>

### link.placeholder : <code>String</code>
Returns / sets a short hint intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder](https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder)  
<a name="AccessibleNode+valueNow"></a>

### link.valueNow : <code>Number</code>
Returns / sets the current value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow](https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow)  
<a name="AccessibleNode+valueMin"></a>

### link.valueMin : <code>Number</code>
Returns / sets the minimum allowed value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin](https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin)  
<a name="AccessibleNode+valueMax"></a>

### link.valueMax : <code>Number</code>
Returns / sets the maximum allowed value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax](https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax)  
<a name="AccessibleNode+activeDescendant"></a>

### link.activeDescendant : <code>AcccessibleNode</code>
Returns / sets the AccessibleNode of the currently active element when focus is on current element.

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-activedescendant  
<a name="AccessibleNode+details"></a>

### link.details : <code>AcccessibleNode</code>
Returns / sets an AccessibleNode that provides a detailed, extended description 
for the current element.

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**

- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-details

<a name="AccessibleNode+errorMessage"></a>

### link.errorMessage : <code>AcccessibleNode</code>
Returns / sets an AccessibleNode that provides an error message for the current element.

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**

- [invalid](#AccessibleNode+invalid)
- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage

<a name="AccessibleNode+colCount"></a>

### link.colCount : <code>Integer</code>
Returns / sets the total number of columns in a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**

- [colIndex](#AccessibleNode+colIndex)
- https://www.w3.org/TR/wai-aria-1.1/#aria-setsize

<a name="AccessibleNode+colIndex"></a>

### link.colIndex : <code>Integer</code>
Defines an element's column index or position with respect to the total number of columns 
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**

- [colCount](#AccessibleNode+colCount)
- [colSpan](#AccessibleNode+colSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-colindex

<a name="AccessibleNode+colSpan"></a>

### link.colSpan : <code>Integer</code>
Defines the number of columns spanned by a cell or gridcell
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**

- [colIndex](#AccessibleNode+colIndex)
- [rowSpan](#AccessibleNode+rowSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-colspan

<a name="AccessibleNode+posInSet"></a>

### link.posInSet : <code>Integer</code>
Defines an element's number or position in the current set of [listitem](listitem)s or [treeitem](treeitem)s.
Not required if all elements in the set are present in the DOM.

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**

- [setSize](#AccessibleNode+setSize)
- https://www.w3.org/TR/wai-aria-1.1/#aria-posinset

<a name="AccessibleNode+rowCount"></a>

### link.rowCount : <code>Integer</code>
Defines the total number of rows in a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**

- [rowIndex](#AccessibleNode+rowIndex)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount

<a name="AccessibleNode+rowIndex"></a>

### link.rowIndex : <code>Integer</code>
Defines an element's row index or position with respect to the total number of rows 
within a  [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**

- [rowCount](#AccessibleNode+rowCount)
- [rowSpan](#AccessibleNode+rowSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex

<a name="AccessibleNode+rowSpan"></a>

### link.rowSpan : <code>Integer</code>
Defines the number of rows spanned by a cell or gridcell
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**

- [rowIndex](#AccessibleNode+rowIndex)
- [colSpan](#AccessibleNode+colSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan

<a name="AccessibleNode+setSize"></a>

### link.setSize : <code>Integer</code>
Defines the number of items in the current set of listitems or treeitems.
Not required if **all** elements in the set are present in the DOM.

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**

- [posInSet](#AccessibleNode+posInSet)
- https://www.w3.org/TR/wai-aria-1.1/#aria-setsize

<a name="AccessibleNode+level"></a>

### link.level : <code>Integer</code>
Defines the hierarchical level of an element within a structure.
E.g. `<h1><h1/>` equals `<div role="heading" aria-level="1"></div>`

**Kind**: instance property of [<code>Link</code>](#Link)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-level  
<a name="Base+tabIndex"></a>

### link.tabIndex : <code>Number</code>
Current tabindex of the element

**Kind**: instance property of [<code>Link</code>](#Link)  
<a name="Link+onExpanded"></a>

### link.onExpanded(ev)
Fired when state of expanded is changed

**Kind**: instance method of [<code>Link</code>](#Link)  

| Param | Type |
| --- | --- |
| ev | <code>Event</code> | 

<a name="Link+onClick"></a>

### link.onClick(ev)
Open the url that is defined in the options,  
fires an click event only if its origin wasn't an click event

**Kind**: instance method of [<code>Link</code>](#Link)  
**Emits**: <code>link#event:accessibleclick</code>, <code>event:click</code>  

| Param | Type |
| --- | --- |
| ev | <code>Event</code> | 

<a name="Base+addListener"></a>

### link.addListener(label, callback, [options])
Adds an listener to the object and targeted element

**Kind**: instance method of [<code>Link</code>](#Link)  
**See**: customEvents  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | Type of event |
| callback | <code>function</code> | Callback function |
| [options] | <code>Object</code> | Extends AddEventListenerOptions |
| [options.key] | <code>String</code> | When label is set to `key` it specifies the keycombo to listen to |
| [options.attribute] | <code>String</code> | When label is set to `attributes` it specifies which attribute should be changed |
| [options.target] | <code>Element</code> | Changes the targeted element |
| [options.capture] | <code>Boolean</code> |  |
| [options.passive] | <code>Boolean</code> |  |
| [options.once] | <code>Boolean</code> |  |

<a name="Link+event_accessibleclick"></a>

### "accessibleclick"
An click triggered by an keyboard or mouse

**Kind**: event emitted by [<code>Link</code>](#Link)  
<a name="Listbox"></a>

## Listbox ⇐ [<code>Roletype</code>](#Roletype)
### Keyboard Support

#### Default
| Key | Function |
| --- | -------- |
| Down Arrow | Moves focus to the next option <br/> If not multiselectable, it selects the focused option.
| Up Arrow 	| Moves focus to the previous option  <br/> If not multiselectable, it selects the focused option.
| Home 			|	Moves focus to the first option  <br/> If not multiselectable, it selects the focused option.
| End  			|	Moves focus to the last option  <br/> If not multiselectable, it selects the focused option.

#### Multiple selection
| Key | Function |
| --- | -------- |
| Space									| Changes the selection state of the focused option.
| Shift + Down Arrow 		| Moves focus to and selects the next option.
| Shift + Up Arrow 			| Moves focus to and selects the previous option.
| Control + Shift + Home |	Selects from the focused option to the beginning of the list.
| Control + Shift + End  | Selects from the focused option to the end of the list.
| Control + A 	          | Selects all options in the list. If all options are selected, unselects all options.

**Kind**: global class  
**Extends**: [<code>Roletype</code>](#Roletype)  
**Emits**: <code>Listbox#event:change</code>, <code>Listbox#event:input</code>  

* [Listbox](#Listbox) ⇐ [<code>Roletype</code>](#Roletype)
    * [.labelledBy](#AccessibleNode+labelledBy) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.describedBy](#AccessibleNode+describedBy) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.controls](#AccessibleNode+controls) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.flowTo](#AccessibleNode+flowTo) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.owns](#AccessibleNode+owns) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.role](#AccessibleNode+role) : <code>String</code>
    * [.roleDescription](#AccessibleNode+roleDescription) : <code>String</code>
    * [.label](#AccessibleNode+label) : <code>String</code>
    * [.current](#AccessibleNode+current) : <code>Boolean</code> \| <code>String</code>
    * [.autocomplete](#AccessibleNode+autocomplete) : <code>String</code>
    * [.hidden](#AccessibleNode+hidden) : <code>Boolean</code>
    * [.keyShortcuts](#AccessibleNode+keyShortcuts) : <code>String</code>
    * [.modal](#AccessibleNode+modal) : <code>Boolean</code>
    * [.multiline](#AccessibleNode+multiline) : <code>Boolean</code>
    * [.multiselectable](#AccessibleNode+multiselectable) : <code>Boolean</code>
    * [.orientation](#AccessibleNode+orientation) : <code>String</code>
    * [.readOnly](#AccessibleNode+readOnly) : <code>Boolean</code>
    * [.required](#AccessibleNode+required) : <code>Boolean</code>
    * [.selected](#AccessibleNode+selected) : <code>Boolean</code>
    * [.sort](#AccessibleNode+sort) : <code>Boolean</code>
    * [.checked](#AccessibleNode+checked) : <code>String</code>
    * [.expanded](#AccessibleNode+expanded) : <code>Boolean</code>
    * [.disabled](#AccessibleNode+disabled) : <code>Boolean</code>
    * [.invalid](#AccessibleNode+invalid) : <code>String</code>
    * [.hasPopUp](#AccessibleNode+hasPopUp) : <code>String</code>
    * [.pressed](#AccessibleNode+pressed) : <code>String</code>
    * [.valueText](#AccessibleNode+valueText) : <code>String</code>
    * [.placeholder](#AccessibleNode+placeholder) : <code>String</code>
    * [.valueNow](#AccessibleNode+valueNow) : <code>Number</code>
    * [.valueMin](#AccessibleNode+valueMin) : <code>Number</code>
    * [.valueMax](#AccessibleNode+valueMax) : <code>Number</code>
    * [.activeDescendant](#AccessibleNode+activeDescendant) : <code>AcccessibleNode</code>
    * [.details](#AccessibleNode+details) : <code>AcccessibleNode</code>
    * [.errorMessage](#AccessibleNode+errorMessage) : <code>AcccessibleNode</code>
    * [.colCount](#AccessibleNode+colCount) : <code>Integer</code>
    * [.colIndex](#AccessibleNode+colIndex) : <code>Integer</code>
    * [.colSpan](#AccessibleNode+colSpan) : <code>Integer</code>
    * [.posInSet](#AccessibleNode+posInSet) : <code>Integer</code>
    * [.rowCount](#AccessibleNode+rowCount) : <code>Integer</code>
    * [.rowIndex](#AccessibleNode+rowIndex) : <code>Integer</code>
    * [.rowSpan](#AccessibleNode+rowSpan) : <code>Integer</code>
    * [.setSize](#AccessibleNode+setSize) : <code>Integer</code>
    * [.level](#AccessibleNode+level) : <code>Integer</code>
    * [.tabIndex](#Base+tabIndex) : <code>Number</code>
    * [.addListener(label, callback, [options])](#Base+addListener)

<a name="AccessibleNode+labelledBy"></a>

### listbox.labelledBy : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances that labels the current element

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**

- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby

<a name="AccessibleNode+describedBy"></a>

### listbox.describedBy : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances that describes the current element

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**

- [AccessibleNode#labeledBy](AccessibleNode#labeledBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-describedby

<a name="AccessibleNode+controls"></a>

### listbox.controls : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances whose contents or presence are controlled by
the current element.

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**

- [owns](#AccessibleNode+owns)
- https://www.w3.org/TR/wai-aria-1.1/#aria-controls

<a name="AccessibleNode+flowTo"></a>

### listbox.flowTo : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Contains the next element(s) in an alternate reading order of content which, at the user's 
discretion, allows assistive technology to override the general default of reading in
document source order.

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-flowto  
<a name="AccessibleNode+owns"></a>

### listbox.owns : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Contains children who's ID are referenced inside the `aria-owns` attribute

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-owns  
<a name="AccessibleNode+role"></a>

### listbox.role : <code>String</code>
Defines a type it represents, e.g. `tab`

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#roles  
<a name="AccessibleNode+roleDescription"></a>

### listbox.roleDescription : <code>String</code>
Defines a human-readable, author-localized description for the role

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-roledescription  
<a name="AccessibleNode+label"></a>

### listbox.label : <code>String</code>
Defines a string value that labels the current element.

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-label  
<a name="AccessibleNode+current"></a>

### listbox.current : <code>Boolean</code> \| <code>String</code>
Indicates the element that represents the current item within a container or set of related elements.

Possible strings are:
* `page`, used to indicate a link within a set of pagination links, 
		where the link is visually styled to represent the currently-displayed page.
* `step`, used to indicate a link within a step indicator for a step-based process,
		where the link is visually styled to represent the current step.
* `location`, used to indicate the image that is visually highlighted as the current component of a flow chart.
* `date`, used to indicate the current date within a calendar.
* `time`, used to indicate the current time within a timetable.

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-current  
<a name="AccessibleNode+autocomplete"></a>

### listbox.autocomplete : <code>String</code>
Indicates whether inputting text could trigger display of one or more predictions of the user's
intended value for an input and specifies how predictions would be presented if they are made.

The behavior during input is depends on the provided value, it follows beneath table.

| Value  | 	Description |
| ------ | --- |
| inline | Text suggesting may be dynamically inserted after the caret.
| list   | A collection of values that could complete the provided input is displayed.
| both   | Implements `inline` and `list`
| none   | No prediction is shown

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-autocomplete  
<a name="AccessibleNode+hidden"></a>

### listbox.hidden : <code>Boolean</code>
Returns/sets the visibility of the element who is exposed to an accessibility API.

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**

- [disabled](#AccessibleNode+disabled)
- https://www.w3.org/TR/wai-aria-1.1/#aria-hidden

<a name="AccessibleNode+keyShortcuts"></a>

### listbox.keyShortcuts : <code>String</code>
Indicates keyboard shortcuts that an author has implemented to activate or
give focus to an element.

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-keyshortcuts  
<a name="AccessibleNode+modal"></a>

### listbox.modal : <code>Boolean</code>
Indicates whether an element is modal when displayed.

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-modal  
<a name="AccessibleNode+multiline"></a>

### listbox.multiline : <code>Boolean</code>
Indicates whether a text box accepts multiple lines of input or only a single line.

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-multiline  
<a name="AccessibleNode+multiselectable"></a>

### listbox.multiselectable : <code>Boolean</code>
Indicates that the user may select more than one item from the current selectable descendants.

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-multiselectable  
<a name="AccessibleNode+orientation"></a>

### listbox.orientation : <code>String</code>
Indicates whether the element's orientation is `horizontal`, `vertical`, or `null`.

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-orientation  
<a name="AccessibleNode+readOnly"></a>

### listbox.readOnly : <code>Boolean</code>
Indicates that the user may select more than one item from the current selectable descendants.

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-readonly  
<a name="AccessibleNode+required"></a>

### listbox.required : <code>Boolean</code>
Indicates that user input is required on the element before a form may be submitted.

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-required  
<a name="AccessibleNode+selected"></a>

### listbox.selected : <code>Boolean</code>
Indicates that user input is required on the element before a form may be submitted.

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-selected  
<a name="AccessibleNode+sort"></a>

### listbox.sort : <code>Boolean</code>
Indicates if items in a table or grid are sorted in ascending or descending order.  
Possible values are `acending`, `descending`, `none`, `other` or `null`.

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-sort  
<a name="AccessibleNode+checked"></a>

### listbox.checked : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](Checkbox)

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+expanded"></a>

### listbox.expanded : <code>Boolean</code>
Indicates whether the element, or another grouping element it controls, 
is currently expanded or collapsed.

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-expanded  
<a name="AccessibleNode+disabled"></a>

### listbox.disabled : <code>Boolean</code>
Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**

- [hidden](#AccessibleNode+hidden)
- [AccessibleNode#readonly](AccessibleNode#readonly)
- https://www.w3.org/TR/wai-aria-1.1/#aria-disabled

<a name="AccessibleNode+invalid"></a>

### listbox.invalid : <code>String</code>
Indicates the entered value does not conform to the format expected by the application.

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**

- [errorMessage](#AccessibleNode+errorMessage)
- https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage

<a name="AccessibleNode+hasPopUp"></a>

### listbox.hasPopUp : <code>String</code>
Indicates the availability and type of interactive popup element, such as menu or dialog,
that can be triggered by an element.

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup  
<a name="AccessibleNode+pressed"></a>

### listbox.pressed : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](Checkbox)

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+valueText"></a>

### listbox.valueText : <code>String</code>
Returns / sets the human readable text alternative of [#aria-valuenow](#aria-valuenow) for a [Range](#Range) widget.

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext](https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext)  
<a name="AccessibleNode+placeholder"></a>

### listbox.placeholder : <code>String</code>
Returns / sets a short hint intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder](https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder)  
<a name="AccessibleNode+valueNow"></a>

### listbox.valueNow : <code>Number</code>
Returns / sets the current value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow](https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow)  
<a name="AccessibleNode+valueMin"></a>

### listbox.valueMin : <code>Number</code>
Returns / sets the minimum allowed value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin](https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin)  
<a name="AccessibleNode+valueMax"></a>

### listbox.valueMax : <code>Number</code>
Returns / sets the maximum allowed value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax](https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax)  
<a name="AccessibleNode+activeDescendant"></a>

### listbox.activeDescendant : <code>AcccessibleNode</code>
Returns / sets the AccessibleNode of the currently active element when focus is on current element.

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-activedescendant  
<a name="AccessibleNode+details"></a>

### listbox.details : <code>AcccessibleNode</code>
Returns / sets an AccessibleNode that provides a detailed, extended description 
for the current element.

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**

- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-details

<a name="AccessibleNode+errorMessage"></a>

### listbox.errorMessage : <code>AcccessibleNode</code>
Returns / sets an AccessibleNode that provides an error message for the current element.

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**

- [invalid](#AccessibleNode+invalid)
- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage

<a name="AccessibleNode+colCount"></a>

### listbox.colCount : <code>Integer</code>
Returns / sets the total number of columns in a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**

- [colIndex](#AccessibleNode+colIndex)
- https://www.w3.org/TR/wai-aria-1.1/#aria-setsize

<a name="AccessibleNode+colIndex"></a>

### listbox.colIndex : <code>Integer</code>
Defines an element's column index or position with respect to the total number of columns 
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**

- [colCount](#AccessibleNode+colCount)
- [colSpan](#AccessibleNode+colSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-colindex

<a name="AccessibleNode+colSpan"></a>

### listbox.colSpan : <code>Integer</code>
Defines the number of columns spanned by a cell or gridcell
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**

- [colIndex](#AccessibleNode+colIndex)
- [rowSpan](#AccessibleNode+rowSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-colspan

<a name="AccessibleNode+posInSet"></a>

### listbox.posInSet : <code>Integer</code>
Defines an element's number or position in the current set of [listitem](listitem)s or [treeitem](treeitem)s.
Not required if all elements in the set are present in the DOM.

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**

- [setSize](#AccessibleNode+setSize)
- https://www.w3.org/TR/wai-aria-1.1/#aria-posinset

<a name="AccessibleNode+rowCount"></a>

### listbox.rowCount : <code>Integer</code>
Defines the total number of rows in a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**

- [rowIndex](#AccessibleNode+rowIndex)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount

<a name="AccessibleNode+rowIndex"></a>

### listbox.rowIndex : <code>Integer</code>
Defines an element's row index or position with respect to the total number of rows 
within a  [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**

- [rowCount](#AccessibleNode+rowCount)
- [rowSpan](#AccessibleNode+rowSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex

<a name="AccessibleNode+rowSpan"></a>

### listbox.rowSpan : <code>Integer</code>
Defines the number of rows spanned by a cell or gridcell
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**

- [rowIndex](#AccessibleNode+rowIndex)
- [colSpan](#AccessibleNode+colSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan

<a name="AccessibleNode+setSize"></a>

### listbox.setSize : <code>Integer</code>
Defines the number of items in the current set of listitems or treeitems.
Not required if **all** elements in the set are present in the DOM.

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**

- [posInSet](#AccessibleNode+posInSet)
- https://www.w3.org/TR/wai-aria-1.1/#aria-setsize

<a name="AccessibleNode+level"></a>

### listbox.level : <code>Integer</code>
Defines the hierarchical level of an element within a structure.
E.g. `<h1><h1/>` equals `<div role="heading" aria-level="1"></div>`

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-level  
<a name="Base+tabIndex"></a>

### listbox.tabIndex : <code>Number</code>
Current tabindex of the element

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
<a name="Base+addListener"></a>

### listbox.addListener(label, callback, [options])
Adds an listener to the object and targeted element

**Kind**: instance method of [<code>Listbox</code>](#Listbox)  
**See**: customEvents  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | Type of event |
| callback | <code>function</code> | Callback function |
| [options] | <code>Object</code> | Extends AddEventListenerOptions |
| [options.key] | <code>String</code> | When label is set to `key` it specifies the keycombo to listen to |
| [options.attribute] | <code>String</code> | When label is set to `attributes` it specifies which attribute should be changed |
| [options.target] | <code>Element</code> | Changes the targeted element |
| [options.capture] | <code>Boolean</code> |  |
| [options.passive] | <code>Boolean</code> |  |
| [options.once] | <code>Boolean</code> |  |

<a name="Option"></a>

## Option ⇐ [<code>Roletype</code>](#Roletype)
**Kind**: global class  
**Extends**: [<code>Roletype</code>](#Roletype)  

* [Option](#Option) ⇐ [<code>Roletype</code>](#Roletype)
    * [.labelledBy](#AccessibleNode+labelledBy) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.describedBy](#AccessibleNode+describedBy) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.controls](#AccessibleNode+controls) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.flowTo](#AccessibleNode+flowTo) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.owns](#AccessibleNode+owns) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.role](#AccessibleNode+role) : <code>String</code>
    * [.roleDescription](#AccessibleNode+roleDescription) : <code>String</code>
    * [.label](#AccessibleNode+label) : <code>String</code>
    * [.current](#AccessibleNode+current) : <code>Boolean</code> \| <code>String</code>
    * [.autocomplete](#AccessibleNode+autocomplete) : <code>String</code>
    * [.hidden](#AccessibleNode+hidden) : <code>Boolean</code>
    * [.keyShortcuts](#AccessibleNode+keyShortcuts) : <code>String</code>
    * [.modal](#AccessibleNode+modal) : <code>Boolean</code>
    * [.multiline](#AccessibleNode+multiline) : <code>Boolean</code>
    * [.multiselectable](#AccessibleNode+multiselectable) : <code>Boolean</code>
    * [.orientation](#AccessibleNode+orientation) : <code>String</code>
    * [.readOnly](#AccessibleNode+readOnly) : <code>Boolean</code>
    * [.required](#AccessibleNode+required) : <code>Boolean</code>
    * [.selected](#AccessibleNode+selected) : <code>Boolean</code>
    * [.sort](#AccessibleNode+sort) : <code>Boolean</code>
    * [.checked](#AccessibleNode+checked) : <code>String</code>
    * [.expanded](#AccessibleNode+expanded) : <code>Boolean</code>
    * [.disabled](#AccessibleNode+disabled) : <code>Boolean</code>
    * [.invalid](#AccessibleNode+invalid) : <code>String</code>
    * [.hasPopUp](#AccessibleNode+hasPopUp) : <code>String</code>
    * [.pressed](#AccessibleNode+pressed) : <code>String</code>
    * [.valueText](#AccessibleNode+valueText) : <code>String</code>
    * [.placeholder](#AccessibleNode+placeholder) : <code>String</code>
    * [.valueNow](#AccessibleNode+valueNow) : <code>Number</code>
    * [.valueMin](#AccessibleNode+valueMin) : <code>Number</code>
    * [.valueMax](#AccessibleNode+valueMax) : <code>Number</code>
    * [.activeDescendant](#AccessibleNode+activeDescendant) : <code>AcccessibleNode</code>
    * [.details](#AccessibleNode+details) : <code>AcccessibleNode</code>
    * [.errorMessage](#AccessibleNode+errorMessage) : <code>AcccessibleNode</code>
    * [.colCount](#AccessibleNode+colCount) : <code>Integer</code>
    * [.colIndex](#AccessibleNode+colIndex) : <code>Integer</code>
    * [.colSpan](#AccessibleNode+colSpan) : <code>Integer</code>
    * [.posInSet](#AccessibleNode+posInSet) : <code>Integer</code>
    * [.rowCount](#AccessibleNode+rowCount) : <code>Integer</code>
    * [.rowIndex](#AccessibleNode+rowIndex) : <code>Integer</code>
    * [.rowSpan](#AccessibleNode+rowSpan) : <code>Integer</code>
    * [.setSize](#AccessibleNode+setSize) : <code>Integer</code>
    * [.level](#AccessibleNode+level) : <code>Integer</code>
    * [.tabIndex](#Base+tabIndex) : <code>Number</code>
    * [.addListener(label, callback, [options])](#Base+addListener)

<a name="AccessibleNode+labelledBy"></a>

### option.labelledBy : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances that labels the current element

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**

- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby

<a name="AccessibleNode+describedBy"></a>

### option.describedBy : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances that describes the current element

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**

- [AccessibleNode#labeledBy](AccessibleNode#labeledBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-describedby

<a name="AccessibleNode+controls"></a>

### option.controls : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances whose contents or presence are controlled by
the current element.

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**

- [owns](#AccessibleNode+owns)
- https://www.w3.org/TR/wai-aria-1.1/#aria-controls

<a name="AccessibleNode+flowTo"></a>

### option.flowTo : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Contains the next element(s) in an alternate reading order of content which, at the user's 
discretion, allows assistive technology to override the general default of reading in
document source order.

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-flowto  
<a name="AccessibleNode+owns"></a>

### option.owns : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Contains children who's ID are referenced inside the `aria-owns` attribute

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-owns  
<a name="AccessibleNode+role"></a>

### option.role : <code>String</code>
Defines a type it represents, e.g. `tab`

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#roles  
<a name="AccessibleNode+roleDescription"></a>

### option.roleDescription : <code>String</code>
Defines a human-readable, author-localized description for the role

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-roledescription  
<a name="AccessibleNode+label"></a>

### option.label : <code>String</code>
Defines a string value that labels the current element.

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-label  
<a name="AccessibleNode+current"></a>

### option.current : <code>Boolean</code> \| <code>String</code>
Indicates the element that represents the current item within a container or set of related elements.

Possible strings are:
* `page`, used to indicate a link within a set of pagination links, 
		where the link is visually styled to represent the currently-displayed page.
* `step`, used to indicate a link within a step indicator for a step-based process,
		where the link is visually styled to represent the current step.
* `location`, used to indicate the image that is visually highlighted as the current component of a flow chart.
* `date`, used to indicate the current date within a calendar.
* `time`, used to indicate the current time within a timetable.

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-current  
<a name="AccessibleNode+autocomplete"></a>

### option.autocomplete : <code>String</code>
Indicates whether inputting text could trigger display of one or more predictions of the user's
intended value for an input and specifies how predictions would be presented if they are made.

The behavior during input is depends on the provided value, it follows beneath table.

| Value  | 	Description |
| ------ | --- |
| inline | Text suggesting may be dynamically inserted after the caret.
| list   | A collection of values that could complete the provided input is displayed.
| both   | Implements `inline` and `list`
| none   | No prediction is shown

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-autocomplete  
<a name="AccessibleNode+hidden"></a>

### option.hidden : <code>Boolean</code>
Returns/sets the visibility of the element who is exposed to an accessibility API.

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**

- [disabled](#AccessibleNode+disabled)
- https://www.w3.org/TR/wai-aria-1.1/#aria-hidden

<a name="AccessibleNode+keyShortcuts"></a>

### option.keyShortcuts : <code>String</code>
Indicates keyboard shortcuts that an author has implemented to activate or
give focus to an element.

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-keyshortcuts  
<a name="AccessibleNode+modal"></a>

### option.modal : <code>Boolean</code>
Indicates whether an element is modal when displayed.

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-modal  
<a name="AccessibleNode+multiline"></a>

### option.multiline : <code>Boolean</code>
Indicates whether a text box accepts multiple lines of input or only a single line.

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-multiline  
<a name="AccessibleNode+multiselectable"></a>

### option.multiselectable : <code>Boolean</code>
Indicates that the user may select more than one item from the current selectable descendants.

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-multiselectable  
<a name="AccessibleNode+orientation"></a>

### option.orientation : <code>String</code>
Indicates whether the element's orientation is `horizontal`, `vertical`, or `null`.

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-orientation  
<a name="AccessibleNode+readOnly"></a>

### option.readOnly : <code>Boolean</code>
Indicates that the user may select more than one item from the current selectable descendants.

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-readonly  
<a name="AccessibleNode+required"></a>

### option.required : <code>Boolean</code>
Indicates that user input is required on the element before a form may be submitted.

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-required  
<a name="AccessibleNode+selected"></a>

### option.selected : <code>Boolean</code>
Indicates that user input is required on the element before a form may be submitted.

**Kind**: instance property of [<code>Option</code>](#Option)  
**Overrides**: [<code>selected</code>](#AccessibleNode+selected)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-selected  
<a name="AccessibleNode+sort"></a>

### option.sort : <code>Boolean</code>
Indicates if items in a table or grid are sorted in ascending or descending order.  
Possible values are `acending`, `descending`, `none`, `other` or `null`.

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-sort  
<a name="AccessibleNode+checked"></a>

### option.checked : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](Checkbox)

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+expanded"></a>

### option.expanded : <code>Boolean</code>
Indicates whether the element, or another grouping element it controls, 
is currently expanded or collapsed.

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-expanded  
<a name="AccessibleNode+disabled"></a>

### option.disabled : <code>Boolean</code>
Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**

- [hidden](#AccessibleNode+hidden)
- [AccessibleNode#readonly](AccessibleNode#readonly)
- https://www.w3.org/TR/wai-aria-1.1/#aria-disabled

<a name="AccessibleNode+invalid"></a>

### option.invalid : <code>String</code>
Indicates the entered value does not conform to the format expected by the application.

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**

- [errorMessage](#AccessibleNode+errorMessage)
- https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage

<a name="AccessibleNode+hasPopUp"></a>

### option.hasPopUp : <code>String</code>
Indicates the availability and type of interactive popup element, such as menu or dialog,
that can be triggered by an element.

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup  
<a name="AccessibleNode+pressed"></a>

### option.pressed : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](Checkbox)

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+valueText"></a>

### option.valueText : <code>String</code>
Returns / sets the human readable text alternative of [#aria-valuenow](#aria-valuenow) for a [Range](#Range) widget.

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext](https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext)  
<a name="AccessibleNode+placeholder"></a>

### option.placeholder : <code>String</code>
Returns / sets a short hint intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder](https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder)  
<a name="AccessibleNode+valueNow"></a>

### option.valueNow : <code>Number</code>
Returns / sets the current value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow](https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow)  
<a name="AccessibleNode+valueMin"></a>

### option.valueMin : <code>Number</code>
Returns / sets the minimum allowed value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin](https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin)  
<a name="AccessibleNode+valueMax"></a>

### option.valueMax : <code>Number</code>
Returns / sets the maximum allowed value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax](https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax)  
<a name="AccessibleNode+activeDescendant"></a>

### option.activeDescendant : <code>AcccessibleNode</code>
Returns / sets the AccessibleNode of the currently active element when focus is on current element.

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-activedescendant  
<a name="AccessibleNode+details"></a>

### option.details : <code>AcccessibleNode</code>
Returns / sets an AccessibleNode that provides a detailed, extended description 
for the current element.

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**

- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-details

<a name="AccessibleNode+errorMessage"></a>

### option.errorMessage : <code>AcccessibleNode</code>
Returns / sets an AccessibleNode that provides an error message for the current element.

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**

- [invalid](#AccessibleNode+invalid)
- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage

<a name="AccessibleNode+colCount"></a>

### option.colCount : <code>Integer</code>
Returns / sets the total number of columns in a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**

- [colIndex](#AccessibleNode+colIndex)
- https://www.w3.org/TR/wai-aria-1.1/#aria-setsize

<a name="AccessibleNode+colIndex"></a>

### option.colIndex : <code>Integer</code>
Defines an element's column index or position with respect to the total number of columns 
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**

- [colCount](#AccessibleNode+colCount)
- [colSpan](#AccessibleNode+colSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-colindex

<a name="AccessibleNode+colSpan"></a>

### option.colSpan : <code>Integer</code>
Defines the number of columns spanned by a cell or gridcell
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**

- [colIndex](#AccessibleNode+colIndex)
- [rowSpan](#AccessibleNode+rowSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-colspan

<a name="AccessibleNode+posInSet"></a>

### option.posInSet : <code>Integer</code>
Defines an element's number or position in the current set of [listitem](listitem)s or [treeitem](treeitem)s.
Not required if all elements in the set are present in the DOM.

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**

- [setSize](#AccessibleNode+setSize)
- https://www.w3.org/TR/wai-aria-1.1/#aria-posinset

<a name="AccessibleNode+rowCount"></a>

### option.rowCount : <code>Integer</code>
Defines the total number of rows in a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**

- [rowIndex](#AccessibleNode+rowIndex)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount

<a name="AccessibleNode+rowIndex"></a>

### option.rowIndex : <code>Integer</code>
Defines an element's row index or position with respect to the total number of rows 
within a  [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**

- [rowCount](#AccessibleNode+rowCount)
- [rowSpan](#AccessibleNode+rowSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex

<a name="AccessibleNode+rowSpan"></a>

### option.rowSpan : <code>Integer</code>
Defines the number of rows spanned by a cell or gridcell
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**

- [rowIndex](#AccessibleNode+rowIndex)
- [colSpan](#AccessibleNode+colSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan

<a name="AccessibleNode+setSize"></a>

### option.setSize : <code>Integer</code>
Defines the number of items in the current set of listitems or treeitems.
Not required if **all** elements in the set are present in the DOM.

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**

- [posInSet](#AccessibleNode+posInSet)
- https://www.w3.org/TR/wai-aria-1.1/#aria-setsize

<a name="AccessibleNode+level"></a>

### option.level : <code>Integer</code>
Defines the hierarchical level of an element within a structure.
E.g. `<h1><h1/>` equals `<div role="heading" aria-level="1"></div>`

**Kind**: instance property of [<code>Option</code>](#Option)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-level  
<a name="Base+tabIndex"></a>

### option.tabIndex : <code>Number</code>
Current tabindex of the element

**Kind**: instance property of [<code>Option</code>](#Option)  
<a name="Base+addListener"></a>

### option.addListener(label, callback, [options])
Adds an listener to the object and targeted element

**Kind**: instance method of [<code>Option</code>](#Option)  
**See**: customEvents  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | Type of event |
| callback | <code>function</code> | Callback function |
| [options] | <code>Object</code> | Extends AddEventListenerOptions |
| [options.key] | <code>String</code> | When label is set to `key` it specifies the keycombo to listen to |
| [options.attribute] | <code>String</code> | When label is set to `attributes` it specifies which attribute should be changed |
| [options.target] | <code>Element</code> | Changes the targeted element |
| [options.capture] | <code>Boolean</code> |  |
| [options.passive] | <code>Boolean</code> |  |
| [options.once] | <code>Boolean</code> |  |

<a name="Radio"></a>

## Radio ⇐ [<code>Command</code>](#Command)
A checkable input in a group of elements with the same role,
only one of which can be checked at a time.

**Kind**: global class  
**Extends**: [<code>Command</code>](#Command)  
**Mixes**: [<code>AriaChecked</code>](#AriaChecked)  

* [Radio](#Radio) ⇐ [<code>Command</code>](#Command)
    * [.labelledBy](#AccessibleNode+labelledBy) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.describedBy](#AccessibleNode+describedBy) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.controls](#AccessibleNode+controls) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.flowTo](#AccessibleNode+flowTo) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.owns](#AccessibleNode+owns) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.role](#AccessibleNode+role) : <code>String</code>
    * [.roleDescription](#AccessibleNode+roleDescription) : <code>String</code>
    * [.label](#AccessibleNode+label) : <code>String</code>
    * [.current](#AccessibleNode+current) : <code>Boolean</code> \| <code>String</code>
    * [.autocomplete](#AccessibleNode+autocomplete) : <code>String</code>
    * [.hidden](#AccessibleNode+hidden) : <code>Boolean</code>
    * [.keyShortcuts](#AccessibleNode+keyShortcuts) : <code>String</code>
    * [.modal](#AccessibleNode+modal) : <code>Boolean</code>
    * [.multiline](#AccessibleNode+multiline) : <code>Boolean</code>
    * [.multiselectable](#AccessibleNode+multiselectable) : <code>Boolean</code>
    * [.orientation](#AccessibleNode+orientation) : <code>String</code>
    * [.readOnly](#AccessibleNode+readOnly) : <code>Boolean</code>
    * [.required](#AccessibleNode+required) : <code>Boolean</code>
    * [.selected](#AccessibleNode+selected) : <code>Boolean</code>
    * [.sort](#AccessibleNode+sort) : <code>Boolean</code>
    * [.checked](#AccessibleNode+checked) : <code>String</code>
    * [.expanded](#AccessibleNode+expanded) : <code>Boolean</code>
    * [.disabled](#AccessibleNode+disabled) : <code>Boolean</code>
    * [.invalid](#AccessibleNode+invalid) : <code>String</code>
    * [.hasPopUp](#AccessibleNode+hasPopUp) : <code>String</code>
    * [.pressed](#AccessibleNode+pressed) : <code>String</code>
    * [.valueText](#AccessibleNode+valueText) : <code>String</code>
    * [.placeholder](#AccessibleNode+placeholder) : <code>String</code>
    * [.valueNow](#AccessibleNode+valueNow) : <code>Number</code>
    * [.valueMin](#AccessibleNode+valueMin) : <code>Number</code>
    * [.valueMax](#AccessibleNode+valueMax) : <code>Number</code>
    * [.activeDescendant](#AccessibleNode+activeDescendant) : <code>AcccessibleNode</code>
    * [.details](#AccessibleNode+details) : <code>AcccessibleNode</code>
    * [.errorMessage](#AccessibleNode+errorMessage) : <code>AcccessibleNode</code>
    * [.colCount](#AccessibleNode+colCount) : <code>Integer</code>
    * [.colIndex](#AccessibleNode+colIndex) : <code>Integer</code>
    * [.colSpan](#AccessibleNode+colSpan) : <code>Integer</code>
    * [.posInSet](#AccessibleNode+posInSet) : <code>Integer</code>
    * [.rowCount](#AccessibleNode+rowCount) : <code>Integer</code>
    * [.rowIndex](#AccessibleNode+rowIndex) : <code>Integer</code>
    * [.rowSpan](#AccessibleNode+rowSpan) : <code>Integer</code>
    * [.setSize](#AccessibleNode+setSize) : <code>Integer</code>
    * [.level](#AccessibleNode+level) : <code>Integer</code>
    * [.tabIndex](#Base+tabIndex) : <code>Number</code>
    * [.addListener(label, callback, [options])](#Base+addListener)

<a name="AccessibleNode+labelledBy"></a>

### radio.labelledBy : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances that labels the current element

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**

- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby

<a name="AccessibleNode+describedBy"></a>

### radio.describedBy : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances that describes the current element

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**

- [AccessibleNode#labeledBy](AccessibleNode#labeledBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-describedby

<a name="AccessibleNode+controls"></a>

### radio.controls : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances whose contents or presence are controlled by
the current element.

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**

- [owns](#AccessibleNode+owns)
- https://www.w3.org/TR/wai-aria-1.1/#aria-controls

<a name="AccessibleNode+flowTo"></a>

### radio.flowTo : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Contains the next element(s) in an alternate reading order of content which, at the user's 
discretion, allows assistive technology to override the general default of reading in
document source order.

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-flowto  
<a name="AccessibleNode+owns"></a>

### radio.owns : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Contains children who's ID are referenced inside the `aria-owns` attribute

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-owns  
<a name="AccessibleNode+role"></a>

### radio.role : <code>String</code>
Defines a type it represents, e.g. `tab`

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#roles  
<a name="AccessibleNode+roleDescription"></a>

### radio.roleDescription : <code>String</code>
Defines a human-readable, author-localized description for the role

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-roledescription  
<a name="AccessibleNode+label"></a>

### radio.label : <code>String</code>
Defines a string value that labels the current element.

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-label  
<a name="AccessibleNode+current"></a>

### radio.current : <code>Boolean</code> \| <code>String</code>
Indicates the element that represents the current item within a container or set of related elements.

Possible strings are:
* `page`, used to indicate a link within a set of pagination links, 
		where the link is visually styled to represent the currently-displayed page.
* `step`, used to indicate a link within a step indicator for a step-based process,
		where the link is visually styled to represent the current step.
* `location`, used to indicate the image that is visually highlighted as the current component of a flow chart.
* `date`, used to indicate the current date within a calendar.
* `time`, used to indicate the current time within a timetable.

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-current  
<a name="AccessibleNode+autocomplete"></a>

### radio.autocomplete : <code>String</code>
Indicates whether inputting text could trigger display of one or more predictions of the user's
intended value for an input and specifies how predictions would be presented if they are made.

The behavior during input is depends on the provided value, it follows beneath table.

| Value  | 	Description |
| ------ | --- |
| inline | Text suggesting may be dynamically inserted after the caret.
| list   | A collection of values that could complete the provided input is displayed.
| both   | Implements `inline` and `list`
| none   | No prediction is shown

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-autocomplete  
<a name="AccessibleNode+hidden"></a>

### radio.hidden : <code>Boolean</code>
Returns/sets the visibility of the element who is exposed to an accessibility API.

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**

- [disabled](#AccessibleNode+disabled)
- https://www.w3.org/TR/wai-aria-1.1/#aria-hidden

<a name="AccessibleNode+keyShortcuts"></a>

### radio.keyShortcuts : <code>String</code>
Indicates keyboard shortcuts that an author has implemented to activate or
give focus to an element.

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-keyshortcuts  
<a name="AccessibleNode+modal"></a>

### radio.modal : <code>Boolean</code>
Indicates whether an element is modal when displayed.

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-modal  
<a name="AccessibleNode+multiline"></a>

### radio.multiline : <code>Boolean</code>
Indicates whether a text box accepts multiple lines of input or only a single line.

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-multiline  
<a name="AccessibleNode+multiselectable"></a>

### radio.multiselectable : <code>Boolean</code>
Indicates that the user may select more than one item from the current selectable descendants.

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-multiselectable  
<a name="AccessibleNode+orientation"></a>

### radio.orientation : <code>String</code>
Indicates whether the element's orientation is `horizontal`, `vertical`, or `null`.

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-orientation  
<a name="AccessibleNode+readOnly"></a>

### radio.readOnly : <code>Boolean</code>
Indicates that the user may select more than one item from the current selectable descendants.

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-readonly  
<a name="AccessibleNode+required"></a>

### radio.required : <code>Boolean</code>
Indicates that user input is required on the element before a form may be submitted.

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-required  
<a name="AccessibleNode+selected"></a>

### radio.selected : <code>Boolean</code>
Indicates that user input is required on the element before a form may be submitted.

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-selected  
<a name="AccessibleNode+sort"></a>

### radio.sort : <code>Boolean</code>
Indicates if items in a table or grid are sorted in ascending or descending order.  
Possible values are `acending`, `descending`, `none`, `other` or `null`.

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-sort  
<a name="AccessibleNode+checked"></a>

### radio.checked : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](Checkbox)

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+expanded"></a>

### radio.expanded : <code>Boolean</code>
Indicates whether the element, or another grouping element it controls, 
is currently expanded or collapsed.

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-expanded  
<a name="AccessibleNode+disabled"></a>

### radio.disabled : <code>Boolean</code>
Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**

- [hidden](#AccessibleNode+hidden)
- [AccessibleNode#readonly](AccessibleNode#readonly)
- https://www.w3.org/TR/wai-aria-1.1/#aria-disabled

<a name="AccessibleNode+invalid"></a>

### radio.invalid : <code>String</code>
Indicates the entered value does not conform to the format expected by the application.

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**

- [errorMessage](#AccessibleNode+errorMessage)
- https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage

<a name="AccessibleNode+hasPopUp"></a>

### radio.hasPopUp : <code>String</code>
Indicates the availability and type of interactive popup element, such as menu or dialog,
that can be triggered by an element.

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup  
<a name="AccessibleNode+pressed"></a>

### radio.pressed : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](Checkbox)

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+valueText"></a>

### radio.valueText : <code>String</code>
Returns / sets the human readable text alternative of [#aria-valuenow](#aria-valuenow) for a [Range](#Range) widget.

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext](https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext)  
<a name="AccessibleNode+placeholder"></a>

### radio.placeholder : <code>String</code>
Returns / sets a short hint intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder](https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder)  
<a name="AccessibleNode+valueNow"></a>

### radio.valueNow : <code>Number</code>
Returns / sets the current value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow](https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow)  
<a name="AccessibleNode+valueMin"></a>

### radio.valueMin : <code>Number</code>
Returns / sets the minimum allowed value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin](https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin)  
<a name="AccessibleNode+valueMax"></a>

### radio.valueMax : <code>Number</code>
Returns / sets the maximum allowed value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax](https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax)  
<a name="AccessibleNode+activeDescendant"></a>

### radio.activeDescendant : <code>AcccessibleNode</code>
Returns / sets the AccessibleNode of the currently active element when focus is on current element.

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-activedescendant  
<a name="AccessibleNode+details"></a>

### radio.details : <code>AcccessibleNode</code>
Returns / sets an AccessibleNode that provides a detailed, extended description 
for the current element.

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**

- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-details

<a name="AccessibleNode+errorMessage"></a>

### radio.errorMessage : <code>AcccessibleNode</code>
Returns / sets an AccessibleNode that provides an error message for the current element.

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**

- [invalid](#AccessibleNode+invalid)
- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage

<a name="AccessibleNode+colCount"></a>

### radio.colCount : <code>Integer</code>
Returns / sets the total number of columns in a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**

- [colIndex](#AccessibleNode+colIndex)
- https://www.w3.org/TR/wai-aria-1.1/#aria-setsize

<a name="AccessibleNode+colIndex"></a>

### radio.colIndex : <code>Integer</code>
Defines an element's column index or position with respect to the total number of columns 
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**

- [colCount](#AccessibleNode+colCount)
- [colSpan](#AccessibleNode+colSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-colindex

<a name="AccessibleNode+colSpan"></a>

### radio.colSpan : <code>Integer</code>
Defines the number of columns spanned by a cell or gridcell
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**

- [colIndex](#AccessibleNode+colIndex)
- [rowSpan](#AccessibleNode+rowSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-colspan

<a name="AccessibleNode+posInSet"></a>

### radio.posInSet : <code>Integer</code>
Defines an element's number or position in the current set of [listitem](listitem)s or [treeitem](treeitem)s.
Not required if all elements in the set are present in the DOM.

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**

- [setSize](#AccessibleNode+setSize)
- https://www.w3.org/TR/wai-aria-1.1/#aria-posinset

<a name="AccessibleNode+rowCount"></a>

### radio.rowCount : <code>Integer</code>
Defines the total number of rows in a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**

- [rowIndex](#AccessibleNode+rowIndex)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount

<a name="AccessibleNode+rowIndex"></a>

### radio.rowIndex : <code>Integer</code>
Defines an element's row index or position with respect to the total number of rows 
within a  [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**

- [rowCount](#AccessibleNode+rowCount)
- [rowSpan](#AccessibleNode+rowSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex

<a name="AccessibleNode+rowSpan"></a>

### radio.rowSpan : <code>Integer</code>
Defines the number of rows spanned by a cell or gridcell
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**

- [rowIndex](#AccessibleNode+rowIndex)
- [colSpan](#AccessibleNode+colSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan

<a name="AccessibleNode+setSize"></a>

### radio.setSize : <code>Integer</code>
Defines the number of items in the current set of listitems or treeitems.
Not required if **all** elements in the set are present in the DOM.

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**

- [posInSet](#AccessibleNode+posInSet)
- https://www.w3.org/TR/wai-aria-1.1/#aria-setsize

<a name="AccessibleNode+level"></a>

### radio.level : <code>Integer</code>
Defines the hierarchical level of an element within a structure.
E.g. `<h1><h1/>` equals `<div role="heading" aria-level="1"></div>`

**Kind**: instance property of [<code>Radio</code>](#Radio)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-level  
<a name="Base+tabIndex"></a>

### radio.tabIndex : <code>Number</code>
Current tabindex of the element

**Kind**: instance property of [<code>Radio</code>](#Radio)  
<a name="Base+addListener"></a>

### radio.addListener(label, callback, [options])
Adds an listener to the object and targeted element

**Kind**: instance method of [<code>Radio</code>](#Radio)  
**See**: customEvents  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | Type of event |
| callback | <code>function</code> | Callback function |
| [options] | <code>Object</code> | Extends AddEventListenerOptions |
| [options.key] | <code>String</code> | When label is set to `key` it specifies the keycombo to listen to |
| [options.attribute] | <code>String</code> | When label is set to `attributes` it specifies which attribute should be changed |
| [options.target] | <code>Element</code> | Changes the targeted element |
| [options.capture] | <code>Boolean</code> |  |
| [options.passive] | <code>Boolean</code> |  |
| [options.once] | <code>Boolean</code> |  |

<a name="Range"></a>

## Range ⇐ [<code>Roletype</code>](#Roletype)
**(Abstract role) SHOULD NOT USED IN THE DOM** 
An input representing a range of values that can be set by the user.

**Kind**: global class  
**Extends**: [<code>Roletype</code>](#Roletype)  
**See**: [https://w3c.github.io/aria/aria/aria.html#range](https://w3c.github.io/aria/aria/aria.html#range)  

* [Range](#Range) ⇐ [<code>Roletype</code>](#Roletype)
    * [new Range(element, [options])](#new_Range_new)
    * [._](#Range+_) : <code>Object</code>
    * [.value](#Range+value) : <code>String</code>
    * [.valueAsNumber](#Range+valueAsNumber) : <code>Number</code>
    * [.labelledBy](#AccessibleNode+labelledBy) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.describedBy](#AccessibleNode+describedBy) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.controls](#AccessibleNode+controls) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.flowTo](#AccessibleNode+flowTo) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.owns](#AccessibleNode+owns) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.role](#AccessibleNode+role) : <code>String</code>
    * [.roleDescription](#AccessibleNode+roleDescription) : <code>String</code>
    * [.label](#AccessibleNode+label) : <code>String</code>
    * [.current](#AccessibleNode+current) : <code>Boolean</code> \| <code>String</code>
    * [.autocomplete](#AccessibleNode+autocomplete) : <code>String</code>
    * [.hidden](#AccessibleNode+hidden) : <code>Boolean</code>
    * [.keyShortcuts](#AccessibleNode+keyShortcuts) : <code>String</code>
    * [.modal](#AccessibleNode+modal) : <code>Boolean</code>
    * [.multiline](#AccessibleNode+multiline) : <code>Boolean</code>
    * [.multiselectable](#AccessibleNode+multiselectable) : <code>Boolean</code>
    * [.orientation](#AccessibleNode+orientation) : <code>String</code>
    * [.readOnly](#AccessibleNode+readOnly) : <code>Boolean</code>
    * [.required](#AccessibleNode+required) : <code>Boolean</code>
    * [.selected](#AccessibleNode+selected) : <code>Boolean</code>
    * [.sort](#AccessibleNode+sort) : <code>Boolean</code>
    * [.checked](#AccessibleNode+checked) : <code>String</code>
    * [.expanded](#AccessibleNode+expanded) : <code>Boolean</code>
    * [.disabled](#AccessibleNode+disabled) : <code>Boolean</code>
    * [.invalid](#AccessibleNode+invalid) : <code>String</code>
    * [.hasPopUp](#AccessibleNode+hasPopUp) : <code>String</code>
    * [.pressed](#AccessibleNode+pressed) : <code>String</code>
    * [.valueText](#AccessibleNode+valueText) : <code>String</code>
    * [.placeholder](#AccessibleNode+placeholder) : <code>String</code>
    * [.valueNow](#AccessibleNode+valueNow) : <code>Number</code>
    * [.valueMin](#AccessibleNode+valueMin) : <code>Number</code>
    * [.valueMax](#AccessibleNode+valueMax) : <code>Number</code>
    * [.activeDescendant](#AccessibleNode+activeDescendant) : <code>AcccessibleNode</code>
    * [.details](#AccessibleNode+details) : <code>AcccessibleNode</code>
    * [.errorMessage](#AccessibleNode+errorMessage) : <code>AcccessibleNode</code>
    * [.colCount](#AccessibleNode+colCount) : <code>Integer</code>
    * [.colIndex](#AccessibleNode+colIndex) : <code>Integer</code>
    * [.colSpan](#AccessibleNode+colSpan) : <code>Integer</code>
    * [.posInSet](#AccessibleNode+posInSet) : <code>Integer</code>
    * [.rowCount](#AccessibleNode+rowCount) : <code>Integer</code>
    * [.rowIndex](#AccessibleNode+rowIndex) : <code>Integer</code>
    * [.rowSpan](#AccessibleNode+rowSpan) : <code>Integer</code>
    * [.setSize](#AccessibleNode+setSize) : <code>Integer</code>
    * [.level](#AccessibleNode+level) : <code>Integer</code>
    * [.tabIndex](#Base+tabIndex) : <code>Number</code>
    * [.stepDown(ev)](#Range+stepDown)
    * [.stepUp(ev)](#Range+stepUp)
    * [.addListener(label, callback, [options])](#Base+addListener)

<a name="new_Range_new"></a>

### new Range(element, [options])
**Returns**: [<code>Range</code>](#Range) - this  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | element to derive information nameFrom |
| [options] | <code>Object</code> | optional options |
| options.step | <code>Number</code> \| <code>&quot;any&quot;</code> | increase/decrease value used |

<a name="Range+_"></a>

### range._ : <code>Object</code>
**Kind**: instance property of [<code>Range</code>](#Range)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| step | <code>Number</code> | <code>1</code> | 

<a name="Range+value"></a>

### range.value : <code>String</code>
Passtrough of an stringified `valueNow`

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**: [valueNow](#AccessibleNode+valueNow)  
<a name="Range+valueAsNumber"></a>

### range.valueAsNumber : <code>Number</code>
Proxy of the `valueNow` value

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**: [valueNow](#AccessibleNode+valueNow)  
<a name="AccessibleNode+labelledBy"></a>

### range.labelledBy : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances that labels the current element

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**

- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby

<a name="AccessibleNode+describedBy"></a>

### range.describedBy : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances that describes the current element

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**

- [AccessibleNode#labeledBy](AccessibleNode#labeledBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-describedby

<a name="AccessibleNode+controls"></a>

### range.controls : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances whose contents or presence are controlled by
the current element.

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**

- [owns](#AccessibleNode+owns)
- https://www.w3.org/TR/wai-aria-1.1/#aria-controls

<a name="AccessibleNode+flowTo"></a>

### range.flowTo : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Contains the next element(s) in an alternate reading order of content which, at the user's 
discretion, allows assistive technology to override the general default of reading in
document source order.

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-flowto  
<a name="AccessibleNode+owns"></a>

### range.owns : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Contains children who's ID are referenced inside the `aria-owns` attribute

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-owns  
<a name="AccessibleNode+role"></a>

### range.role : <code>String</code>
Defines a type it represents, e.g. `tab`

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#roles  
<a name="AccessibleNode+roleDescription"></a>

### range.roleDescription : <code>String</code>
Defines a human-readable, author-localized description for the role

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-roledescription  
<a name="AccessibleNode+label"></a>

### range.label : <code>String</code>
Defines a string value that labels the current element.

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-label  
<a name="AccessibleNode+current"></a>

### range.current : <code>Boolean</code> \| <code>String</code>
Indicates the element that represents the current item within a container or set of related elements.

Possible strings are:
* `page`, used to indicate a link within a set of pagination links, 
		where the link is visually styled to represent the currently-displayed page.
* `step`, used to indicate a link within a step indicator for a step-based process,
		where the link is visually styled to represent the current step.
* `location`, used to indicate the image that is visually highlighted as the current component of a flow chart.
* `date`, used to indicate the current date within a calendar.
* `time`, used to indicate the current time within a timetable.

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-current  
<a name="AccessibleNode+autocomplete"></a>

### range.autocomplete : <code>String</code>
Indicates whether inputting text could trigger display of one or more predictions of the user's
intended value for an input and specifies how predictions would be presented if they are made.

The behavior during input is depends on the provided value, it follows beneath table.

| Value  | 	Description |
| ------ | --- |
| inline | Text suggesting may be dynamically inserted after the caret.
| list   | A collection of values that could complete the provided input is displayed.
| both   | Implements `inline` and `list`
| none   | No prediction is shown

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-autocomplete  
<a name="AccessibleNode+hidden"></a>

### range.hidden : <code>Boolean</code>
Returns/sets the visibility of the element who is exposed to an accessibility API.

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**

- [disabled](#AccessibleNode+disabled)
- https://www.w3.org/TR/wai-aria-1.1/#aria-hidden

<a name="AccessibleNode+keyShortcuts"></a>

### range.keyShortcuts : <code>String</code>
Indicates keyboard shortcuts that an author has implemented to activate or
give focus to an element.

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-keyshortcuts  
<a name="AccessibleNode+modal"></a>

### range.modal : <code>Boolean</code>
Indicates whether an element is modal when displayed.

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-modal  
<a name="AccessibleNode+multiline"></a>

### range.multiline : <code>Boolean</code>
Indicates whether a text box accepts multiple lines of input or only a single line.

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-multiline  
<a name="AccessibleNode+multiselectable"></a>

### range.multiselectable : <code>Boolean</code>
Indicates that the user may select more than one item from the current selectable descendants.

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-multiselectable  
<a name="AccessibleNode+orientation"></a>

### range.orientation : <code>String</code>
Indicates whether the element's orientation is `horizontal`, `vertical`, or `null`.

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-orientation  
<a name="AccessibleNode+readOnly"></a>

### range.readOnly : <code>Boolean</code>
Indicates that the user may select more than one item from the current selectable descendants.

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-readonly  
<a name="AccessibleNode+required"></a>

### range.required : <code>Boolean</code>
Indicates that user input is required on the element before a form may be submitted.

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-required  
<a name="AccessibleNode+selected"></a>

### range.selected : <code>Boolean</code>
Indicates that user input is required on the element before a form may be submitted.

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-selected  
<a name="AccessibleNode+sort"></a>

### range.sort : <code>Boolean</code>
Indicates if items in a table or grid are sorted in ascending or descending order.  
Possible values are `acending`, `descending`, `none`, `other` or `null`.

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-sort  
<a name="AccessibleNode+checked"></a>

### range.checked : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](Checkbox)

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+expanded"></a>

### range.expanded : <code>Boolean</code>
Indicates whether the element, or another grouping element it controls, 
is currently expanded or collapsed.

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-expanded  
<a name="AccessibleNode+disabled"></a>

### range.disabled : <code>Boolean</code>
Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**

- [hidden](#AccessibleNode+hidden)
- [AccessibleNode#readonly](AccessibleNode#readonly)
- https://www.w3.org/TR/wai-aria-1.1/#aria-disabled

<a name="AccessibleNode+invalid"></a>

### range.invalid : <code>String</code>
Indicates the entered value does not conform to the format expected by the application.

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**

- [errorMessage](#AccessibleNode+errorMessage)
- https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage

<a name="AccessibleNode+hasPopUp"></a>

### range.hasPopUp : <code>String</code>
Indicates the availability and type of interactive popup element, such as menu or dialog,
that can be triggered by an element.

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup  
<a name="AccessibleNode+pressed"></a>

### range.pressed : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](Checkbox)

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+valueText"></a>

### range.valueText : <code>String</code>
Returns / sets the human readable text alternative of [#aria-valuenow](#aria-valuenow) for a [Range](#Range) widget.

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext](https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext)  
<a name="AccessibleNode+placeholder"></a>

### range.placeholder : <code>String</code>
Returns / sets a short hint intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder](https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder)  
<a name="AccessibleNode+valueNow"></a>

### range.valueNow : <code>Number</code>
Returns / sets the current value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Range</code>](#Range)  
**Overrides**: [<code>valueNow</code>](#AccessibleNode+valueNow)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow](https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow)  
<a name="AccessibleNode+valueMin"></a>

### range.valueMin : <code>Number</code>
Returns / sets the minimum allowed value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin](https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin)  
<a name="AccessibleNode+valueMax"></a>

### range.valueMax : <code>Number</code>
Returns / sets the maximum allowed value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax](https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax)  
<a name="AccessibleNode+activeDescendant"></a>

### range.activeDescendant : <code>AcccessibleNode</code>
Returns / sets the AccessibleNode of the currently active element when focus is on current element.

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-activedescendant  
<a name="AccessibleNode+details"></a>

### range.details : <code>AcccessibleNode</code>
Returns / sets an AccessibleNode that provides a detailed, extended description 
for the current element.

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**

- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-details

<a name="AccessibleNode+errorMessage"></a>

### range.errorMessage : <code>AcccessibleNode</code>
Returns / sets an AccessibleNode that provides an error message for the current element.

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**

- [invalid](#AccessibleNode+invalid)
- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage

<a name="AccessibleNode+colCount"></a>

### range.colCount : <code>Integer</code>
Returns / sets the total number of columns in a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**

- [colIndex](#AccessibleNode+colIndex)
- https://www.w3.org/TR/wai-aria-1.1/#aria-setsize

<a name="AccessibleNode+colIndex"></a>

### range.colIndex : <code>Integer</code>
Defines an element's column index or position with respect to the total number of columns 
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**

- [colCount](#AccessibleNode+colCount)
- [colSpan](#AccessibleNode+colSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-colindex

<a name="AccessibleNode+colSpan"></a>

### range.colSpan : <code>Integer</code>
Defines the number of columns spanned by a cell or gridcell
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**

- [colIndex](#AccessibleNode+colIndex)
- [rowSpan](#AccessibleNode+rowSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-colspan

<a name="AccessibleNode+posInSet"></a>

### range.posInSet : <code>Integer</code>
Defines an element's number or position in the current set of [listitem](listitem)s or [treeitem](treeitem)s.
Not required if all elements in the set are present in the DOM.

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**

- [setSize](#AccessibleNode+setSize)
- https://www.w3.org/TR/wai-aria-1.1/#aria-posinset

<a name="AccessibleNode+rowCount"></a>

### range.rowCount : <code>Integer</code>
Defines the total number of rows in a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**

- [rowIndex](#AccessibleNode+rowIndex)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount

<a name="AccessibleNode+rowIndex"></a>

### range.rowIndex : <code>Integer</code>
Defines an element's row index or position with respect to the total number of rows 
within a  [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**

- [rowCount](#AccessibleNode+rowCount)
- [rowSpan](#AccessibleNode+rowSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex

<a name="AccessibleNode+rowSpan"></a>

### range.rowSpan : <code>Integer</code>
Defines the number of rows spanned by a cell or gridcell
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**

- [rowIndex](#AccessibleNode+rowIndex)
- [colSpan](#AccessibleNode+colSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan

<a name="AccessibleNode+setSize"></a>

### range.setSize : <code>Integer</code>
Defines the number of items in the current set of listitems or treeitems.
Not required if **all** elements in the set are present in the DOM.

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**

- [posInSet](#AccessibleNode+posInSet)
- https://www.w3.org/TR/wai-aria-1.1/#aria-setsize

<a name="AccessibleNode+level"></a>

### range.level : <code>Integer</code>
Defines the hierarchical level of an element within a structure.
E.g. `<h1><h1/>` equals `<div role="heading" aria-level="1"></div>`

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-level  
<a name="Base+tabIndex"></a>

### range.tabIndex : <code>Number</code>
Current tabindex of the element

**Kind**: instance property of [<code>Range</code>](#Range)  
<a name="Range+stepDown"></a>

### range.stepDown(ev)
Decrease the value with the amount of 1 step

**Kind**: instance method of [<code>Range</code>](#Range)  

| Param | Type | Description |
| --- | --- | --- |
| ev | <code>Event</code> | Event when triggered through an elements |

<a name="Range+stepUp"></a>

### range.stepUp(ev)
Increase the value with the amount of 1 step

**Kind**: instance method of [<code>Range</code>](#Range)  
**Package**:   

| Param | Type | Description |
| --- | --- | --- |
| ev | <code>Event</code> | Event when triggered through an elements |

<a name="Base+addListener"></a>

### range.addListener(label, callback, [options])
Adds an listener to the object and targeted element

**Kind**: instance method of [<code>Range</code>](#Range)  
**See**: customEvents  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | Type of event |
| callback | <code>function</code> | Callback function |
| [options] | <code>Object</code> | Extends AddEventListenerOptions |
| [options.key] | <code>String</code> | When label is set to `key` it specifies the keycombo to listen to |
| [options.attribute] | <code>String</code> | When label is set to `attributes` it specifies which attribute should be changed |
| [options.target] | <code>Element</code> | Changes the targeted element |
| [options.capture] | <code>Boolean</code> |  |
| [options.passive] | <code>Boolean</code> |  |
| [options.once] | <code>Boolean</code> |  |

<a name="Roletype"></a>

## Roletype ⇐ [<code>AccessibleNode</code>](#AccessibleNode)
**Kind**: global class  
**Extends**: [<code>AccessibleNode</code>](#AccessibleNode)  

* [Roletype](#Roletype) ⇐ [<code>AccessibleNode</code>](#AccessibleNode)
    * [.labelledBy](#AccessibleNode+labelledBy) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.describedBy](#AccessibleNode+describedBy) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.controls](#AccessibleNode+controls) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.flowTo](#AccessibleNode+flowTo) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.owns](#AccessibleNode+owns) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.role](#AccessibleNode+role) : <code>String</code>
    * [.roleDescription](#AccessibleNode+roleDescription) : <code>String</code>
    * [.label](#AccessibleNode+label) : <code>String</code>
    * [.current](#AccessibleNode+current) : <code>Boolean</code> \| <code>String</code>
    * [.autocomplete](#AccessibleNode+autocomplete) : <code>String</code>
    * [.hidden](#AccessibleNode+hidden) : <code>Boolean</code>
    * [.keyShortcuts](#AccessibleNode+keyShortcuts) : <code>String</code>
    * [.modal](#AccessibleNode+modal) : <code>Boolean</code>
    * [.multiline](#AccessibleNode+multiline) : <code>Boolean</code>
    * [.multiselectable](#AccessibleNode+multiselectable) : <code>Boolean</code>
    * [.orientation](#AccessibleNode+orientation) : <code>String</code>
    * [.readOnly](#AccessibleNode+readOnly) : <code>Boolean</code>
    * [.required](#AccessibleNode+required) : <code>Boolean</code>
    * [.selected](#AccessibleNode+selected) : <code>Boolean</code>
    * [.sort](#AccessibleNode+sort) : <code>Boolean</code>
    * [.checked](#AccessibleNode+checked) : <code>String</code>
    * [.expanded](#AccessibleNode+expanded) : <code>Boolean</code>
    * [.disabled](#AccessibleNode+disabled) : <code>Boolean</code>
    * [.invalid](#AccessibleNode+invalid) : <code>String</code>
    * [.hasPopUp](#AccessibleNode+hasPopUp) : <code>String</code>
    * [.pressed](#AccessibleNode+pressed) : <code>String</code>
    * [.valueText](#AccessibleNode+valueText) : <code>String</code>
    * [.placeholder](#AccessibleNode+placeholder) : <code>String</code>
    * [.valueNow](#AccessibleNode+valueNow) : <code>Number</code>
    * [.valueMin](#AccessibleNode+valueMin) : <code>Number</code>
    * [.valueMax](#AccessibleNode+valueMax) : <code>Number</code>
    * [.activeDescendant](#AccessibleNode+activeDescendant) : <code>AcccessibleNode</code>
    * [.details](#AccessibleNode+details) : <code>AcccessibleNode</code>
    * [.errorMessage](#AccessibleNode+errorMessage) : <code>AcccessibleNode</code>
    * [.colCount](#AccessibleNode+colCount) : <code>Integer</code>
    * [.colIndex](#AccessibleNode+colIndex) : <code>Integer</code>
    * [.colSpan](#AccessibleNode+colSpan) : <code>Integer</code>
    * [.posInSet](#AccessibleNode+posInSet) : <code>Integer</code>
    * [.rowCount](#AccessibleNode+rowCount) : <code>Integer</code>
    * [.rowIndex](#AccessibleNode+rowIndex) : <code>Integer</code>
    * [.rowSpan](#AccessibleNode+rowSpan) : <code>Integer</code>
    * [.setSize](#AccessibleNode+setSize) : <code>Integer</code>
    * [.level](#AccessibleNode+level) : <code>Integer</code>
    * [.tabIndex](#Base+tabIndex) : <code>Number</code>
    * [.addListener(label, callback, [options])](#Base+addListener)

<a name="AccessibleNode+labelledBy"></a>

### roletype.labelledBy : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances that labels the current element

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>labelledBy</code>](#AccessibleNode+labelledBy)  
**See**

- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby

<a name="AccessibleNode+describedBy"></a>

### roletype.describedBy : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances that describes the current element

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>describedBy</code>](#AccessibleNode+describedBy)  
**See**

- [AccessibleNode#labeledBy](AccessibleNode#labeledBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-describedby

<a name="AccessibleNode+controls"></a>

### roletype.controls : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances whose contents or presence are controlled by
the current element.

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>controls</code>](#AccessibleNode+controls)  
**See**

- [owns](#AccessibleNode+owns)
- https://www.w3.org/TR/wai-aria-1.1/#aria-controls

<a name="AccessibleNode+flowTo"></a>

### roletype.flowTo : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Contains the next element(s) in an alternate reading order of content which, at the user's 
discretion, allows assistive technology to override the general default of reading in
document source order.

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>flowTo</code>](#AccessibleNode+flowTo)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-flowto  
<a name="AccessibleNode+owns"></a>

### roletype.owns : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Contains children who's ID are referenced inside the `aria-owns` attribute

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>owns</code>](#AccessibleNode+owns)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-owns  
<a name="AccessibleNode+role"></a>

### roletype.role : <code>String</code>
Defines a type it represents, e.g. `tab`

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>role</code>](#AccessibleNode+role)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#roles  
<a name="AccessibleNode+roleDescription"></a>

### roletype.roleDescription : <code>String</code>
Defines a human-readable, author-localized description for the role

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>roleDescription</code>](#AccessibleNode+roleDescription)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-roledescription  
<a name="AccessibleNode+label"></a>

### roletype.label : <code>String</code>
Defines a string value that labels the current element.

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>label</code>](#AccessibleNode+label)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-label  
<a name="AccessibleNode+current"></a>

### roletype.current : <code>Boolean</code> \| <code>String</code>
Indicates the element that represents the current item within a container or set of related elements.

Possible strings are:
* `page`, used to indicate a link within a set of pagination links, 
		where the link is visually styled to represent the currently-displayed page.
* `step`, used to indicate a link within a step indicator for a step-based process,
		where the link is visually styled to represent the current step.
* `location`, used to indicate the image that is visually highlighted as the current component of a flow chart.
* `date`, used to indicate the current date within a calendar.
* `time`, used to indicate the current time within a timetable.

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>current</code>](#AccessibleNode+current)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-current  
<a name="AccessibleNode+autocomplete"></a>

### roletype.autocomplete : <code>String</code>
Indicates whether inputting text could trigger display of one or more predictions of the user's
intended value for an input and specifies how predictions would be presented if they are made.

The behavior during input is depends on the provided value, it follows beneath table.

| Value  | 	Description |
| ------ | --- |
| inline | Text suggesting may be dynamically inserted after the caret.
| list   | A collection of values that could complete the provided input is displayed.
| both   | Implements `inline` and `list`
| none   | No prediction is shown

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>autocomplete</code>](#AccessibleNode+autocomplete)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-autocomplete  
<a name="AccessibleNode+hidden"></a>

### roletype.hidden : <code>Boolean</code>
Returns/sets the visibility of the element who is exposed to an accessibility API.

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>hidden</code>](#AccessibleNode+hidden)  
**See**

- [disabled](#AccessibleNode+disabled)
- https://www.w3.org/TR/wai-aria-1.1/#aria-hidden

<a name="AccessibleNode+keyShortcuts"></a>

### roletype.keyShortcuts : <code>String</code>
Indicates keyboard shortcuts that an author has implemented to activate or
give focus to an element.

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>keyShortcuts</code>](#AccessibleNode+keyShortcuts)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-keyshortcuts  
<a name="AccessibleNode+modal"></a>

### roletype.modal : <code>Boolean</code>
Indicates whether an element is modal when displayed.

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>modal</code>](#AccessibleNode+modal)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-modal  
<a name="AccessibleNode+multiline"></a>

### roletype.multiline : <code>Boolean</code>
Indicates whether a text box accepts multiple lines of input or only a single line.

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>multiline</code>](#AccessibleNode+multiline)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-multiline  
<a name="AccessibleNode+multiselectable"></a>

### roletype.multiselectable : <code>Boolean</code>
Indicates that the user may select more than one item from the current selectable descendants.

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>multiselectable</code>](#AccessibleNode+multiselectable)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-multiselectable  
<a name="AccessibleNode+orientation"></a>

### roletype.orientation : <code>String</code>
Indicates whether the element's orientation is `horizontal`, `vertical`, or `null`.

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>orientation</code>](#AccessibleNode+orientation)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-orientation  
<a name="AccessibleNode+readOnly"></a>

### roletype.readOnly : <code>Boolean</code>
Indicates that the user may select more than one item from the current selectable descendants.

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>readOnly</code>](#AccessibleNode+readOnly)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-readonly  
<a name="AccessibleNode+required"></a>

### roletype.required : <code>Boolean</code>
Indicates that user input is required on the element before a form may be submitted.

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>required</code>](#AccessibleNode+required)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-required  
<a name="AccessibleNode+selected"></a>

### roletype.selected : <code>Boolean</code>
Indicates that user input is required on the element before a form may be submitted.

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>selected</code>](#AccessibleNode+selected)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-selected  
<a name="AccessibleNode+sort"></a>

### roletype.sort : <code>Boolean</code>
Indicates if items in a table or grid are sorted in ascending or descending order.  
Possible values are `acending`, `descending`, `none`, `other` or `null`.

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>sort</code>](#AccessibleNode+sort)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-sort  
<a name="AccessibleNode+checked"></a>

### roletype.checked : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](Checkbox)

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>checked</code>](#AccessibleNode+checked)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+expanded"></a>

### roletype.expanded : <code>Boolean</code>
Indicates whether the element, or another grouping element it controls, 
is currently expanded or collapsed.

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>expanded</code>](#AccessibleNode+expanded)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-expanded  
<a name="AccessibleNode+disabled"></a>

### roletype.disabled : <code>Boolean</code>
Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>disabled</code>](#AccessibleNode+disabled)  
**See**

- [hidden](#AccessibleNode+hidden)
- [AccessibleNode#readonly](AccessibleNode#readonly)
- https://www.w3.org/TR/wai-aria-1.1/#aria-disabled

<a name="AccessibleNode+invalid"></a>

### roletype.invalid : <code>String</code>
Indicates the entered value does not conform to the format expected by the application.

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>invalid</code>](#AccessibleNode+invalid)  
**See**

- [errorMessage](#AccessibleNode+errorMessage)
- https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage

<a name="AccessibleNode+hasPopUp"></a>

### roletype.hasPopUp : <code>String</code>
Indicates the availability and type of interactive popup element, such as menu or dialog,
that can be triggered by an element.

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>hasPopUp</code>](#AccessibleNode+hasPopUp)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup  
<a name="AccessibleNode+pressed"></a>

### roletype.pressed : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](Checkbox)

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>pressed</code>](#AccessibleNode+pressed)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+valueText"></a>

### roletype.valueText : <code>String</code>
Returns / sets the human readable text alternative of [#aria-valuenow](#aria-valuenow) for a [Range](#Range) widget.

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>valueText</code>](#AccessibleNode+valueText)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext](https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext)  
<a name="AccessibleNode+placeholder"></a>

### roletype.placeholder : <code>String</code>
Returns / sets a short hint intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>placeholder</code>](#AccessibleNode+placeholder)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder](https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder)  
<a name="AccessibleNode+valueNow"></a>

### roletype.valueNow : <code>Number</code>
Returns / sets the current value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>valueNow</code>](#AccessibleNode+valueNow)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow](https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow)  
<a name="AccessibleNode+valueMin"></a>

### roletype.valueMin : <code>Number</code>
Returns / sets the minimum allowed value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>valueMin</code>](#AccessibleNode+valueMin)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin](https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin)  
<a name="AccessibleNode+valueMax"></a>

### roletype.valueMax : <code>Number</code>
Returns / sets the maximum allowed value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>valueMax</code>](#AccessibleNode+valueMax)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax](https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax)  
<a name="AccessibleNode+activeDescendant"></a>

### roletype.activeDescendant : <code>AcccessibleNode</code>
Returns / sets the AccessibleNode of the currently active element when focus is on current element.

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>activeDescendant</code>](#AccessibleNode+activeDescendant)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-activedescendant  
<a name="AccessibleNode+details"></a>

### roletype.details : <code>AcccessibleNode</code>
Returns / sets an AccessibleNode that provides a detailed, extended description 
for the current element.

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>details</code>](#AccessibleNode+details)  
**See**

- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-details

<a name="AccessibleNode+errorMessage"></a>

### roletype.errorMessage : <code>AcccessibleNode</code>
Returns / sets an AccessibleNode that provides an error message for the current element.

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>errorMessage</code>](#AccessibleNode+errorMessage)  
**See**

- [invalid](#AccessibleNode+invalid)
- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage

<a name="AccessibleNode+colCount"></a>

### roletype.colCount : <code>Integer</code>
Returns / sets the total number of columns in a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>colCount</code>](#AccessibleNode+colCount)  
**See**

- [colIndex](#AccessibleNode+colIndex)
- https://www.w3.org/TR/wai-aria-1.1/#aria-setsize

<a name="AccessibleNode+colIndex"></a>

### roletype.colIndex : <code>Integer</code>
Defines an element's column index or position with respect to the total number of columns 
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>colIndex</code>](#AccessibleNode+colIndex)  
**See**

- [colCount](#AccessibleNode+colCount)
- [colSpan](#AccessibleNode+colSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-colindex

<a name="AccessibleNode+colSpan"></a>

### roletype.colSpan : <code>Integer</code>
Defines the number of columns spanned by a cell or gridcell
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>colSpan</code>](#AccessibleNode+colSpan)  
**See**

- [colIndex](#AccessibleNode+colIndex)
- [rowSpan](#AccessibleNode+rowSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-colspan

<a name="AccessibleNode+posInSet"></a>

### roletype.posInSet : <code>Integer</code>
Defines an element's number or position in the current set of [listitem](listitem)s or [treeitem](treeitem)s.
Not required if all elements in the set are present in the DOM.

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>posInSet</code>](#AccessibleNode+posInSet)  
**See**

- [setSize](#AccessibleNode+setSize)
- https://www.w3.org/TR/wai-aria-1.1/#aria-posinset

<a name="AccessibleNode+rowCount"></a>

### roletype.rowCount : <code>Integer</code>
Defines the total number of rows in a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>rowCount</code>](#AccessibleNode+rowCount)  
**See**

- [rowIndex](#AccessibleNode+rowIndex)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount

<a name="AccessibleNode+rowIndex"></a>

### roletype.rowIndex : <code>Integer</code>
Defines an element's row index or position with respect to the total number of rows 
within a  [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>rowIndex</code>](#AccessibleNode+rowIndex)  
**See**

- [rowCount](#AccessibleNode+rowCount)
- [rowSpan](#AccessibleNode+rowSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex

<a name="AccessibleNode+rowSpan"></a>

### roletype.rowSpan : <code>Integer</code>
Defines the number of rows spanned by a cell or gridcell
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>rowSpan</code>](#AccessibleNode+rowSpan)  
**See**

- [rowIndex](#AccessibleNode+rowIndex)
- [colSpan](#AccessibleNode+colSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan

<a name="AccessibleNode+setSize"></a>

### roletype.setSize : <code>Integer</code>
Defines the number of items in the current set of listitems or treeitems.
Not required if **all** elements in the set are present in the DOM.

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>setSize</code>](#AccessibleNode+setSize)  
**See**

- [posInSet](#AccessibleNode+posInSet)
- https://www.w3.org/TR/wai-aria-1.1/#aria-setsize

<a name="AccessibleNode+level"></a>

### roletype.level : <code>Integer</code>
Defines the hierarchical level of an element within a structure.
E.g. `<h1><h1/>` equals `<div role="heading" aria-level="1"></div>`

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>level</code>](#AccessibleNode+level)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-level  
<a name="Base+tabIndex"></a>

### roletype.tabIndex : <code>Number</code>
Current tabindex of the element

**Kind**: instance property of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>tabIndex</code>](#Base+tabIndex)  
<a name="Base+addListener"></a>

### roletype.addListener(label, callback, [options])
Adds an listener to the object and targeted element

**Kind**: instance method of [<code>Roletype</code>](#Roletype)  
**Overrides**: [<code>addListener</code>](#Base+addListener)  
**See**: customEvents  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | Type of event |
| callback | <code>function</code> | Callback function |
| [options] | <code>Object</code> | Extends AddEventListenerOptions |
| [options.key] | <code>String</code> | When label is set to `key` it specifies the keycombo to listen to |
| [options.attribute] | <code>String</code> | When label is set to `attributes` it specifies which attribute should be changed |
| [options.target] | <code>Element</code> | Changes the targeted element |
| [options.capture] | <code>Boolean</code> |  |
| [options.passive] | <code>Boolean</code> |  |
| [options.once] | <code>Boolean</code> |  |

<a name="Slider"></a>

## Slider ⇐ [<code>Range</code>](#Range)
`slider` elements let the user specify a numeric value which must be no less
than a given value, and no more than another given value. The precise value,
however, is not considered important. This is typically represented using a
slider or dial control rather than a text entry box like the "number" input
type. Because this kind of widget is imprecise, it shouldn't typically be
used unless the control's exact value isn't important.

**Kind**: global class  
**Extends**: [<code>Range</code>](#Range)  
**Emits**: <code>event:changed</code>, <code>event:input</code>  
**Todo**

- [ ] add support for "any"
- [ ] add events


* [Slider](#Slider) ⇐ [<code>Range</code>](#Range)
    * [new Slider(element, [options])](#new_Slider_new)
    * [.valueMin](#Slider+valueMin)
    * [._](#Range+_) : <code>Object</code>
    * [.value](#Range+value) : <code>String</code>
    * [.valueAsNumber](#Range+valueAsNumber) : <code>Number</code>
    * [.labelledBy](#AccessibleNode+labelledBy) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.describedBy](#AccessibleNode+describedBy) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.controls](#AccessibleNode+controls) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.flowTo](#AccessibleNode+flowTo) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.owns](#AccessibleNode+owns) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.role](#AccessibleNode+role) : <code>String</code>
    * [.roleDescription](#AccessibleNode+roleDescription) : <code>String</code>
    * [.label](#AccessibleNode+label) : <code>String</code>
    * [.current](#AccessibleNode+current) : <code>Boolean</code> \| <code>String</code>
    * [.autocomplete](#AccessibleNode+autocomplete) : <code>String</code>
    * [.hidden](#AccessibleNode+hidden) : <code>Boolean</code>
    * [.keyShortcuts](#AccessibleNode+keyShortcuts) : <code>String</code>
    * [.modal](#AccessibleNode+modal) : <code>Boolean</code>
    * [.multiline](#AccessibleNode+multiline) : <code>Boolean</code>
    * [.multiselectable](#AccessibleNode+multiselectable) : <code>Boolean</code>
    * [.orientation](#AccessibleNode+orientation) : <code>String</code>
    * [.readOnly](#AccessibleNode+readOnly) : <code>Boolean</code>
    * [.required](#AccessibleNode+required) : <code>Boolean</code>
    * [.selected](#AccessibleNode+selected) : <code>Boolean</code>
    * [.sort](#AccessibleNode+sort) : <code>Boolean</code>
    * [.checked](#AccessibleNode+checked) : <code>String</code>
    * [.expanded](#AccessibleNode+expanded) : <code>Boolean</code>
    * [.disabled](#AccessibleNode+disabled) : <code>Boolean</code>
    * [.invalid](#AccessibleNode+invalid) : <code>String</code>
    * [.hasPopUp](#AccessibleNode+hasPopUp) : <code>String</code>
    * [.pressed](#AccessibleNode+pressed) : <code>String</code>
    * [.valueText](#AccessibleNode+valueText) : <code>String</code>
    * [.placeholder](#AccessibleNode+placeholder) : <code>String</code>
    * [.valueNow](#AccessibleNode+valueNow) : <code>Number</code>
    * [.valueMax](#AccessibleNode+valueMax) : <code>Number</code>
    * [.activeDescendant](#AccessibleNode+activeDescendant) : <code>AcccessibleNode</code>
    * [.details](#AccessibleNode+details) : <code>AcccessibleNode</code>
    * [.errorMessage](#AccessibleNode+errorMessage) : <code>AcccessibleNode</code>
    * [.colCount](#AccessibleNode+colCount) : <code>Integer</code>
    * [.colIndex](#AccessibleNode+colIndex) : <code>Integer</code>
    * [.colSpan](#AccessibleNode+colSpan) : <code>Integer</code>
    * [.posInSet](#AccessibleNode+posInSet) : <code>Integer</code>
    * [.rowCount](#AccessibleNode+rowCount) : <code>Integer</code>
    * [.rowIndex](#AccessibleNode+rowIndex) : <code>Integer</code>
    * [.rowSpan](#AccessibleNode+rowSpan) : <code>Integer</code>
    * [.setSize](#AccessibleNode+setSize) : <code>Integer</code>
    * [.level](#AccessibleNode+level) : <code>Integer</code>
    * [.tabIndex](#Base+tabIndex) : <code>Number</code>
    * [.stepDown(ev)](#Range+stepDown)
    * [.stepUp(ev)](#Range+stepUp)
    * [.addListener(label, callback, [options])](#Base+addListener)

<a name="new_Slider_new"></a>

### new Slider(element, [options])
**Returns**: [<code>Slider</code>](#Slider) - thisArg  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | element to derive information nameFrom |
| [options] | <code>Object</code> | optional options |
| [options.slider.track] | <code>HTMLElement</code> | The element that resembles the track, defaults to the elements parent |
| [options.step] | <code>Number</code> \| <code>&quot;any&quot;</code> | increase/decrease amount |

**Example**  
```js
<div class="track">
  <button type="button" role="slider" aria-label="slider" /><button>
</div>
```
<a name="Slider+valueMin"></a>

### slider.valueMin
**Kind**: instance property of [<code>Slider</code>](#Slider)  
**Default**: <code>[0]</code>  
**Overrides**: [<code>valueMin</code>](#AccessibleNode+valueMin)  
<a name="Range+_"></a>

### slider._ : <code>Object</code>
**Kind**: instance property of [<code>Slider</code>](#Slider)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| step | <code>Number</code> | <code>1</code> | 

<a name="Range+value"></a>

### slider.value : <code>String</code>
Passtrough of an stringified `valueNow`

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**: [valueNow](#AccessibleNode+valueNow)  
<a name="Range+valueAsNumber"></a>

### slider.valueAsNumber : <code>Number</code>
Proxy of the `valueNow` value

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**: [valueNow](#AccessibleNode+valueNow)  
<a name="AccessibleNode+labelledBy"></a>

### slider.labelledBy : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances that labels the current element

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**

- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby

<a name="AccessibleNode+describedBy"></a>

### slider.describedBy : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances that describes the current element

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**

- [AccessibleNode#labeledBy](AccessibleNode#labeledBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-describedby

<a name="AccessibleNode+controls"></a>

### slider.controls : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances whose contents or presence are controlled by
the current element.

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**

- [owns](#AccessibleNode+owns)
- https://www.w3.org/TR/wai-aria-1.1/#aria-controls

<a name="AccessibleNode+flowTo"></a>

### slider.flowTo : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Contains the next element(s) in an alternate reading order of content which, at the user's 
discretion, allows assistive technology to override the general default of reading in
document source order.

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-flowto  
<a name="AccessibleNode+owns"></a>

### slider.owns : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Contains children who's ID are referenced inside the `aria-owns` attribute

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-owns  
<a name="AccessibleNode+role"></a>

### slider.role : <code>String</code>
Defines a type it represents, e.g. `tab`

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#roles  
<a name="AccessibleNode+roleDescription"></a>

### slider.roleDescription : <code>String</code>
Defines a human-readable, author-localized description for the role

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-roledescription  
<a name="AccessibleNode+label"></a>

### slider.label : <code>String</code>
Defines a string value that labels the current element.

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-label  
<a name="AccessibleNode+current"></a>

### slider.current : <code>Boolean</code> \| <code>String</code>
Indicates the element that represents the current item within a container or set of related elements.

Possible strings are:
* `page`, used to indicate a link within a set of pagination links, 
		where the link is visually styled to represent the currently-displayed page.
* `step`, used to indicate a link within a step indicator for a step-based process,
		where the link is visually styled to represent the current step.
* `location`, used to indicate the image that is visually highlighted as the current component of a flow chart.
* `date`, used to indicate the current date within a calendar.
* `time`, used to indicate the current time within a timetable.

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-current  
<a name="AccessibleNode+autocomplete"></a>

### slider.autocomplete : <code>String</code>
Indicates whether inputting text could trigger display of one or more predictions of the user's
intended value for an input and specifies how predictions would be presented if they are made.

The behavior during input is depends on the provided value, it follows beneath table.

| Value  | 	Description |
| ------ | --- |
| inline | Text suggesting may be dynamically inserted after the caret.
| list   | A collection of values that could complete the provided input is displayed.
| both   | Implements `inline` and `list`
| none   | No prediction is shown

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-autocomplete  
<a name="AccessibleNode+hidden"></a>

### slider.hidden : <code>Boolean</code>
Returns/sets the visibility of the element who is exposed to an accessibility API.

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**

- [disabled](#AccessibleNode+disabled)
- https://www.w3.org/TR/wai-aria-1.1/#aria-hidden

<a name="AccessibleNode+keyShortcuts"></a>

### slider.keyShortcuts : <code>String</code>
Indicates keyboard shortcuts that an author has implemented to activate or
give focus to an element.

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-keyshortcuts  
<a name="AccessibleNode+modal"></a>

### slider.modal : <code>Boolean</code>
Indicates whether an element is modal when displayed.

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-modal  
<a name="AccessibleNode+multiline"></a>

### slider.multiline : <code>Boolean</code>
Indicates whether a text box accepts multiple lines of input or only a single line.

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-multiline  
<a name="AccessibleNode+multiselectable"></a>

### slider.multiselectable : <code>Boolean</code>
Indicates that the user may select more than one item from the current selectable descendants.

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-multiselectable  
<a name="AccessibleNode+orientation"></a>

### slider.orientation : <code>String</code>
Indicates whether the element's orientation is `horizontal`, `vertical`, or `null`.

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**Overrides**: [<code>orientation</code>](#AccessibleNode+orientation)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-orientation  
<a name="AccessibleNode+readOnly"></a>

### slider.readOnly : <code>Boolean</code>
Indicates that the user may select more than one item from the current selectable descendants.

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-readonly  
<a name="AccessibleNode+required"></a>

### slider.required : <code>Boolean</code>
Indicates that user input is required on the element before a form may be submitted.

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-required  
<a name="AccessibleNode+selected"></a>

### slider.selected : <code>Boolean</code>
Indicates that user input is required on the element before a form may be submitted.

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-selected  
<a name="AccessibleNode+sort"></a>

### slider.sort : <code>Boolean</code>
Indicates if items in a table or grid are sorted in ascending or descending order.  
Possible values are `acending`, `descending`, `none`, `other` or `null`.

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-sort  
<a name="AccessibleNode+checked"></a>

### slider.checked : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](Checkbox)

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+expanded"></a>

### slider.expanded : <code>Boolean</code>
Indicates whether the element, or another grouping element it controls, 
is currently expanded or collapsed.

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-expanded  
<a name="AccessibleNode+disabled"></a>

### slider.disabled : <code>Boolean</code>
Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**

- [hidden](#AccessibleNode+hidden)
- [AccessibleNode#readonly](AccessibleNode#readonly)
- https://www.w3.org/TR/wai-aria-1.1/#aria-disabled

<a name="AccessibleNode+invalid"></a>

### slider.invalid : <code>String</code>
Indicates the entered value does not conform to the format expected by the application.

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**

- [errorMessage](#AccessibleNode+errorMessage)
- https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage

<a name="AccessibleNode+hasPopUp"></a>

### slider.hasPopUp : <code>String</code>
Indicates the availability and type of interactive popup element, such as menu or dialog,
that can be triggered by an element.

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup  
<a name="AccessibleNode+pressed"></a>

### slider.pressed : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](Checkbox)

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+valueText"></a>

### slider.valueText : <code>String</code>
Returns / sets the human readable text alternative of [#aria-valuenow](#aria-valuenow) for a [Range](#Range) widget.

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext](https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext)  
<a name="AccessibleNode+placeholder"></a>

### slider.placeholder : <code>String</code>
Returns / sets a short hint intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder](https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder)  
<a name="AccessibleNode+valueNow"></a>

### slider.valueNow : <code>Number</code>
Returns / sets the current value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**Overrides**: [<code>valueNow</code>](#AccessibleNode+valueNow)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow](https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow)  
<a name="AccessibleNode+valueMax"></a>

### slider.valueMax : <code>Number</code>
Returns / sets the maximum allowed value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**Overrides**: [<code>valueMax</code>](#AccessibleNode+valueMax)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax](https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax)  
<a name="AccessibleNode+activeDescendant"></a>

### slider.activeDescendant : <code>AcccessibleNode</code>
Returns / sets the AccessibleNode of the currently active element when focus is on current element.

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-activedescendant  
<a name="AccessibleNode+details"></a>

### slider.details : <code>AcccessibleNode</code>
Returns / sets an AccessibleNode that provides a detailed, extended description 
for the current element.

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**

- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-details

<a name="AccessibleNode+errorMessage"></a>

### slider.errorMessage : <code>AcccessibleNode</code>
Returns / sets an AccessibleNode that provides an error message for the current element.

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**

- [invalid](#AccessibleNode+invalid)
- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage

<a name="AccessibleNode+colCount"></a>

### slider.colCount : <code>Integer</code>
Returns / sets the total number of columns in a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**

- [colIndex](#AccessibleNode+colIndex)
- https://www.w3.org/TR/wai-aria-1.1/#aria-setsize

<a name="AccessibleNode+colIndex"></a>

### slider.colIndex : <code>Integer</code>
Defines an element's column index or position with respect to the total number of columns 
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**

- [colCount](#AccessibleNode+colCount)
- [colSpan](#AccessibleNode+colSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-colindex

<a name="AccessibleNode+colSpan"></a>

### slider.colSpan : <code>Integer</code>
Defines the number of columns spanned by a cell or gridcell
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**

- [colIndex](#AccessibleNode+colIndex)
- [rowSpan](#AccessibleNode+rowSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-colspan

<a name="AccessibleNode+posInSet"></a>

### slider.posInSet : <code>Integer</code>
Defines an element's number or position in the current set of [listitem](listitem)s or [treeitem](treeitem)s.
Not required if all elements in the set are present in the DOM.

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**

- [setSize](#AccessibleNode+setSize)
- https://www.w3.org/TR/wai-aria-1.1/#aria-posinset

<a name="AccessibleNode+rowCount"></a>

### slider.rowCount : <code>Integer</code>
Defines the total number of rows in a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**

- [rowIndex](#AccessibleNode+rowIndex)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount

<a name="AccessibleNode+rowIndex"></a>

### slider.rowIndex : <code>Integer</code>
Defines an element's row index or position with respect to the total number of rows 
within a  [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**

- [rowCount](#AccessibleNode+rowCount)
- [rowSpan](#AccessibleNode+rowSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex

<a name="AccessibleNode+rowSpan"></a>

### slider.rowSpan : <code>Integer</code>
Defines the number of rows spanned by a cell or gridcell
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**

- [rowIndex](#AccessibleNode+rowIndex)
- [colSpan](#AccessibleNode+colSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan

<a name="AccessibleNode+setSize"></a>

### slider.setSize : <code>Integer</code>
Defines the number of items in the current set of listitems or treeitems.
Not required if **all** elements in the set are present in the DOM.

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**

- [posInSet](#AccessibleNode+posInSet)
- https://www.w3.org/TR/wai-aria-1.1/#aria-setsize

<a name="AccessibleNode+level"></a>

### slider.level : <code>Integer</code>
Defines the hierarchical level of an element within a structure.
E.g. `<h1><h1/>` equals `<div role="heading" aria-level="1"></div>`

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-level  
<a name="Base+tabIndex"></a>

### slider.tabIndex : <code>Number</code>
Current tabindex of the element

**Kind**: instance property of [<code>Slider</code>](#Slider)  
<a name="Range+stepDown"></a>

### slider.stepDown(ev)
Decrease the value with the amount of 1 step

**Kind**: instance method of [<code>Slider</code>](#Slider)  

| Param | Type | Description |
| --- | --- | --- |
| ev | <code>Event</code> | Event when triggered through an elements |

<a name="Range+stepUp"></a>

### slider.stepUp(ev)
Increase the value with the amount of 1 step

**Kind**: instance method of [<code>Slider</code>](#Slider)  
**Package**:   

| Param | Type | Description |
| --- | --- | --- |
| ev | <code>Event</code> | Event when triggered through an elements |

<a name="Base+addListener"></a>

### slider.addListener(label, callback, [options])
Adds an listener to the object and targeted element

**Kind**: instance method of [<code>Slider</code>](#Slider)  
**See**: customEvents  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | Type of event |
| callback | <code>function</code> | Callback function |
| [options] | <code>Object</code> | Extends AddEventListenerOptions |
| [options.key] | <code>String</code> | When label is set to `key` it specifies the keycombo to listen to |
| [options.attribute] | <code>String</code> | When label is set to `attributes` it specifies which attribute should be changed |
| [options.target] | <code>Element</code> | Changes the targeted element |
| [options.capture] | <code>Boolean</code> |  |
| [options.passive] | <code>Boolean</code> |  |
| [options.once] | <code>Boolean</code> |  |

<a name="Spinbutton"></a>

## Spinbutton ⇐ [<code>Range</code>](#Range)
A input field with 2 button to increase or decrease the numberical value

**Kind**: global class  
**Extends**: [<code>Range</code>](#Range)  
**See**: [https://html.spec.whatwg.org/multipage/input.html#number-state-(type=number)](https://html.spec.whatwg.org/multipage/input.html#number-state-(type=number))  

* [Spinbutton](#Spinbutton) ⇐ [<code>Range</code>](#Range)
    * [._](#Spinbutton+_) : <code>Object</code>
    * [.valueNow](#Spinbutton+valueNow) : <code>Number</code>
    * [.value](#Range+value) : <code>String</code>
    * [.valueAsNumber](#Range+valueAsNumber) : <code>Number</code>
    * [.labelledBy](#AccessibleNode+labelledBy) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.describedBy](#AccessibleNode+describedBy) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.controls](#AccessibleNode+controls) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.flowTo](#AccessibleNode+flowTo) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.owns](#AccessibleNode+owns) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.role](#AccessibleNode+role) : <code>String</code>
    * [.roleDescription](#AccessibleNode+roleDescription) : <code>String</code>
    * [.label](#AccessibleNode+label) : <code>String</code>
    * [.current](#AccessibleNode+current) : <code>Boolean</code> \| <code>String</code>
    * [.autocomplete](#AccessibleNode+autocomplete) : <code>String</code>
    * [.hidden](#AccessibleNode+hidden) : <code>Boolean</code>
    * [.keyShortcuts](#AccessibleNode+keyShortcuts) : <code>String</code>
    * [.modal](#AccessibleNode+modal) : <code>Boolean</code>
    * [.multiline](#AccessibleNode+multiline) : <code>Boolean</code>
    * [.multiselectable](#AccessibleNode+multiselectable) : <code>Boolean</code>
    * [.orientation](#AccessibleNode+orientation) : <code>String</code>
    * [.readOnly](#AccessibleNode+readOnly) : <code>Boolean</code>
    * [.required](#AccessibleNode+required) : <code>Boolean</code>
    * [.selected](#AccessibleNode+selected) : <code>Boolean</code>
    * [.sort](#AccessibleNode+sort) : <code>Boolean</code>
    * [.checked](#AccessibleNode+checked) : <code>String</code>
    * [.expanded](#AccessibleNode+expanded) : <code>Boolean</code>
    * [.disabled](#AccessibleNode+disabled) : <code>Boolean</code>
    * [.invalid](#AccessibleNode+invalid) : <code>String</code>
    * [.hasPopUp](#AccessibleNode+hasPopUp) : <code>String</code>
    * [.pressed](#AccessibleNode+pressed) : <code>String</code>
    * [.valueText](#AccessibleNode+valueText) : <code>String</code>
    * [.placeholder](#AccessibleNode+placeholder) : <code>String</code>
    * [.valueMin](#AccessibleNode+valueMin) : <code>Number</code>
    * [.valueMax](#AccessibleNode+valueMax) : <code>Number</code>
    * [.activeDescendant](#AccessibleNode+activeDescendant) : <code>AcccessibleNode</code>
    * [.details](#AccessibleNode+details) : <code>AcccessibleNode</code>
    * [.errorMessage](#AccessibleNode+errorMessage) : <code>AcccessibleNode</code>
    * [.colCount](#AccessibleNode+colCount) : <code>Integer</code>
    * [.colIndex](#AccessibleNode+colIndex) : <code>Integer</code>
    * [.colSpan](#AccessibleNode+colSpan) : <code>Integer</code>
    * [.posInSet](#AccessibleNode+posInSet) : <code>Integer</code>
    * [.rowCount](#AccessibleNode+rowCount) : <code>Integer</code>
    * [.rowIndex](#AccessibleNode+rowIndex) : <code>Integer</code>
    * [.rowSpan](#AccessibleNode+rowSpan) : <code>Integer</code>
    * [.setSize](#AccessibleNode+setSize) : <code>Integer</code>
    * [.level](#AccessibleNode+level) : <code>Integer</code>
    * [.tabIndex](#Base+tabIndex) : <code>Number</code>
    * [.stepDown(ev)](#Range+stepDown)
    * [.stepUp(ev)](#Range+stepUp)
    * [.addListener(label, callback, [options])](#Base+addListener)

<a name="Spinbutton+_"></a>

### spinbutton._ : <code>Object</code>
**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**Overrides**: [<code>_</code>](#Range+_)  
**Properties**

| Name | Type |
| --- | --- |
| spinbutton.up | <code>HTMLElement</code> | 
| spinbutton.down | <code>HTMLElement</code> | 

<a name="Spinbutton+valueNow"></a>

### spinbutton.valueNow : <code>Number</code>
**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**Default**: <code>[0]</code>  
**Overrides**: [<code>valueNow</code>](#AccessibleNode+valueNow)  
<a name="Range+value"></a>

### spinbutton.value : <code>String</code>
Passtrough of an stringified `valueNow`

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**: [valueNow](#AccessibleNode+valueNow)  
<a name="Range+valueAsNumber"></a>

### spinbutton.valueAsNumber : <code>Number</code>
Proxy of the `valueNow` value

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**: [valueNow](#AccessibleNode+valueNow)  
<a name="AccessibleNode+labelledBy"></a>

### spinbutton.labelledBy : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances that labels the current element

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**

- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby

<a name="AccessibleNode+describedBy"></a>

### spinbutton.describedBy : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances that describes the current element

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**

- [AccessibleNode#labeledBy](AccessibleNode#labeledBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-describedby

<a name="AccessibleNode+controls"></a>

### spinbutton.controls : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances whose contents or presence are controlled by
the current element.

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**

- [owns](#AccessibleNode+owns)
- https://www.w3.org/TR/wai-aria-1.1/#aria-controls

<a name="AccessibleNode+flowTo"></a>

### spinbutton.flowTo : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Contains the next element(s) in an alternate reading order of content which, at the user's 
discretion, allows assistive technology to override the general default of reading in
document source order.

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-flowto  
<a name="AccessibleNode+owns"></a>

### spinbutton.owns : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Contains children who's ID are referenced inside the `aria-owns` attribute

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-owns  
<a name="AccessibleNode+role"></a>

### spinbutton.role : <code>String</code>
Defines a type it represents, e.g. `tab`

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#roles  
<a name="AccessibleNode+roleDescription"></a>

### spinbutton.roleDescription : <code>String</code>
Defines a human-readable, author-localized description for the role

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-roledescription  
<a name="AccessibleNode+label"></a>

### spinbutton.label : <code>String</code>
Defines a string value that labels the current element.

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-label  
<a name="AccessibleNode+current"></a>

### spinbutton.current : <code>Boolean</code> \| <code>String</code>
Indicates the element that represents the current item within a container or set of related elements.

Possible strings are:
* `page`, used to indicate a link within a set of pagination links, 
		where the link is visually styled to represent the currently-displayed page.
* `step`, used to indicate a link within a step indicator for a step-based process,
		where the link is visually styled to represent the current step.
* `location`, used to indicate the image that is visually highlighted as the current component of a flow chart.
* `date`, used to indicate the current date within a calendar.
* `time`, used to indicate the current time within a timetable.

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-current  
<a name="AccessibleNode+autocomplete"></a>

### spinbutton.autocomplete : <code>String</code>
Indicates whether inputting text could trigger display of one or more predictions of the user's
intended value for an input and specifies how predictions would be presented if they are made.

The behavior during input is depends on the provided value, it follows beneath table.

| Value  | 	Description |
| ------ | --- |
| inline | Text suggesting may be dynamically inserted after the caret.
| list   | A collection of values that could complete the provided input is displayed.
| both   | Implements `inline` and `list`
| none   | No prediction is shown

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-autocomplete  
<a name="AccessibleNode+hidden"></a>

### spinbutton.hidden : <code>Boolean</code>
Returns/sets the visibility of the element who is exposed to an accessibility API.

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**

- [disabled](#AccessibleNode+disabled)
- https://www.w3.org/TR/wai-aria-1.1/#aria-hidden

<a name="AccessibleNode+keyShortcuts"></a>

### spinbutton.keyShortcuts : <code>String</code>
Indicates keyboard shortcuts that an author has implemented to activate or
give focus to an element.

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-keyshortcuts  
<a name="AccessibleNode+modal"></a>

### spinbutton.modal : <code>Boolean</code>
Indicates whether an element is modal when displayed.

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-modal  
<a name="AccessibleNode+multiline"></a>

### spinbutton.multiline : <code>Boolean</code>
Indicates whether a text box accepts multiple lines of input or only a single line.

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-multiline  
<a name="AccessibleNode+multiselectable"></a>

### spinbutton.multiselectable : <code>Boolean</code>
Indicates that the user may select more than one item from the current selectable descendants.

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-multiselectable  
<a name="AccessibleNode+orientation"></a>

### spinbutton.orientation : <code>String</code>
Indicates whether the element's orientation is `horizontal`, `vertical`, or `null`.

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-orientation  
<a name="AccessibleNode+readOnly"></a>

### spinbutton.readOnly : <code>Boolean</code>
Indicates that the user may select more than one item from the current selectable descendants.

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-readonly  
<a name="AccessibleNode+required"></a>

### spinbutton.required : <code>Boolean</code>
Indicates that user input is required on the element before a form may be submitted.

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-required  
<a name="AccessibleNode+selected"></a>

### spinbutton.selected : <code>Boolean</code>
Indicates that user input is required on the element before a form may be submitted.

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-selected  
<a name="AccessibleNode+sort"></a>

### spinbutton.sort : <code>Boolean</code>
Indicates if items in a table or grid are sorted in ascending or descending order.  
Possible values are `acending`, `descending`, `none`, `other` or `null`.

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-sort  
<a name="AccessibleNode+checked"></a>

### spinbutton.checked : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](Checkbox)

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+expanded"></a>

### spinbutton.expanded : <code>Boolean</code>
Indicates whether the element, or another grouping element it controls, 
is currently expanded or collapsed.

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-expanded  
<a name="AccessibleNode+disabled"></a>

### spinbutton.disabled : <code>Boolean</code>
Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**

- [hidden](#AccessibleNode+hidden)
- [AccessibleNode#readonly](AccessibleNode#readonly)
- https://www.w3.org/TR/wai-aria-1.1/#aria-disabled

<a name="AccessibleNode+invalid"></a>

### spinbutton.invalid : <code>String</code>
Indicates the entered value does not conform to the format expected by the application.

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**

- [errorMessage](#AccessibleNode+errorMessage)
- https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage

<a name="AccessibleNode+hasPopUp"></a>

### spinbutton.hasPopUp : <code>String</code>
Indicates the availability and type of interactive popup element, such as menu or dialog,
that can be triggered by an element.

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup  
<a name="AccessibleNode+pressed"></a>

### spinbutton.pressed : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](Checkbox)

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+valueText"></a>

### spinbutton.valueText : <code>String</code>
Returns / sets the human readable text alternative of [#aria-valuenow](#aria-valuenow) for a [Range](#Range) widget.

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext](https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext)  
<a name="AccessibleNode+placeholder"></a>

### spinbutton.placeholder : <code>String</code>
Returns / sets a short hint intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder](https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder)  
<a name="AccessibleNode+valueMin"></a>

### spinbutton.valueMin : <code>Number</code>
Returns / sets the minimum allowed value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin](https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin)  
<a name="AccessibleNode+valueMax"></a>

### spinbutton.valueMax : <code>Number</code>
Returns / sets the maximum allowed value for a [Range](#Range) widget.

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax](https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax)  
<a name="AccessibleNode+activeDescendant"></a>

### spinbutton.activeDescendant : <code>AcccessibleNode</code>
Returns / sets the AccessibleNode of the currently active element when focus is on current element.

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-activedescendant  
<a name="AccessibleNode+details"></a>

### spinbutton.details : <code>AcccessibleNode</code>
Returns / sets an AccessibleNode that provides a detailed, extended description 
for the current element.

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**

- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-details

<a name="AccessibleNode+errorMessage"></a>

### spinbutton.errorMessage : <code>AcccessibleNode</code>
Returns / sets an AccessibleNode that provides an error message for the current element.

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**

- [invalid](#AccessibleNode+invalid)
- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage

<a name="AccessibleNode+colCount"></a>

### spinbutton.colCount : <code>Integer</code>
Returns / sets the total number of columns in a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**

- [colIndex](#AccessibleNode+colIndex)
- https://www.w3.org/TR/wai-aria-1.1/#aria-setsize

<a name="AccessibleNode+colIndex"></a>

### spinbutton.colIndex : <code>Integer</code>
Defines an element's column index or position with respect to the total number of columns 
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**

- [colCount](#AccessibleNode+colCount)
- [colSpan](#AccessibleNode+colSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-colindex

<a name="AccessibleNode+colSpan"></a>

### spinbutton.colSpan : <code>Integer</code>
Defines the number of columns spanned by a cell or gridcell
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**

- [colIndex](#AccessibleNode+colIndex)
- [rowSpan](#AccessibleNode+rowSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-colspan

<a name="AccessibleNode+posInSet"></a>

### spinbutton.posInSet : <code>Integer</code>
Defines an element's number or position in the current set of [listitem](listitem)s or [treeitem](treeitem)s.
Not required if all elements in the set are present in the DOM.

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**

- [setSize](#AccessibleNode+setSize)
- https://www.w3.org/TR/wai-aria-1.1/#aria-posinset

<a name="AccessibleNode+rowCount"></a>

### spinbutton.rowCount : <code>Integer</code>
Defines the total number of rows in a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**

- [rowIndex](#AccessibleNode+rowIndex)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount

<a name="AccessibleNode+rowIndex"></a>

### spinbutton.rowIndex : <code>Integer</code>
Defines an element's row index or position with respect to the total number of rows 
within a  [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**

- [rowCount](#AccessibleNode+rowCount)
- [rowSpan](#AccessibleNode+rowSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex

<a name="AccessibleNode+rowSpan"></a>

### spinbutton.rowSpan : <code>Integer</code>
Defines the number of rows spanned by a cell or gridcell
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**

- [rowIndex](#AccessibleNode+rowIndex)
- [colSpan](#AccessibleNode+colSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan

<a name="AccessibleNode+setSize"></a>

### spinbutton.setSize : <code>Integer</code>
Defines the number of items in the current set of listitems or treeitems.
Not required if **all** elements in the set are present in the DOM.

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**

- [posInSet](#AccessibleNode+posInSet)
- https://www.w3.org/TR/wai-aria-1.1/#aria-setsize

<a name="AccessibleNode+level"></a>

### spinbutton.level : <code>Integer</code>
Defines the hierarchical level of an element within a structure.
E.g. `<h1><h1/>` equals `<div role="heading" aria-level="1"></div>`

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-level  
<a name="Base+tabIndex"></a>

### spinbutton.tabIndex : <code>Number</code>
Current tabindex of the element

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
<a name="Range+stepDown"></a>

### spinbutton.stepDown(ev)
Decrease the value with the amount of 1 step

**Kind**: instance method of [<code>Spinbutton</code>](#Spinbutton)  

| Param | Type | Description |
| --- | --- | --- |
| ev | <code>Event</code> | Event when triggered through an elements |

<a name="Range+stepUp"></a>

### spinbutton.stepUp(ev)
Increase the value with the amount of 1 step

**Kind**: instance method of [<code>Spinbutton</code>](#Spinbutton)  
**Package**:   

| Param | Type | Description |
| --- | --- | --- |
| ev | <code>Event</code> | Event when triggered through an elements |

<a name="Base+addListener"></a>

### spinbutton.addListener(label, callback, [options])
Adds an listener to the object and targeted element

**Kind**: instance method of [<code>Spinbutton</code>](#Spinbutton)  
**See**: customEvents  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | Type of event |
| callback | <code>function</code> | Callback function |
| [options] | <code>Object</code> | Extends AddEventListenerOptions |
| [options.key] | <code>String</code> | When label is set to `key` it specifies the keycombo to listen to |
| [options.attribute] | <code>String</code> | When label is set to `attributes` it specifies which attribute should be changed |
| [options.target] | <code>Element</code> | Changes the targeted element |
| [options.capture] | <code>Boolean</code> |  |
| [options.passive] | <code>Boolean</code> |  |
| [options.once] | <code>Boolean</code> |  |

<a name="Textbox"></a>

## Textbox
**Kind**: global class  
**Todo**

- [ ] Add options to keep or remove pasted styling

<a name="AccessibleNode"></a>

## AccessibleNode ⇐ [<code>Base</code>](#Base)
Based on the AOM spec

**Kind**: global class  
**Extends**: [<code>Base</code>](#Base)  

* [AccessibleNode](#AccessibleNode) ⇐ [<code>Base</code>](#Base)
    * [.labelledBy](#AccessibleNode+labelledBy) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.describedBy](#AccessibleNode+describedBy) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.controls](#AccessibleNode+controls) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.flowTo](#AccessibleNode+flowTo) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.owns](#AccessibleNode+owns) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.role](#AccessibleNode+role) : <code>String</code>
    * [.roleDescription](#AccessibleNode+roleDescription) : <code>String</code>
    * [.label](#AccessibleNode+label) : <code>String</code>
    * [.current](#AccessibleNode+current) : <code>Boolean</code> \| <code>String</code>
    * [.autocomplete](#AccessibleNode+autocomplete) : <code>String</code>
    * [.hidden](#AccessibleNode+hidden) : <code>Boolean</code>
    * [.keyShortcuts](#AccessibleNode+keyShortcuts) : <code>String</code>
    * [.modal](#AccessibleNode+modal) : <code>Boolean</code>
    * [.multiline](#AccessibleNode+multiline) : <code>Boolean</code>
    * [.multiselectable](#AccessibleNode+multiselectable) : <code>Boolean</code>
    * [.orientation](#AccessibleNode+orientation) : <code>String</code>
    * [.readOnly](#AccessibleNode+readOnly) : <code>Boolean</code>
    * [.required](#AccessibleNode+required) : <code>Boolean</code>
    * [.selected](#AccessibleNode+selected) : <code>Boolean</code>
    * [.sort](#AccessibleNode+sort) : <code>Boolean</code>
    * [.checked](#AccessibleNode+checked) : <code>String</code>
    * [.expanded](#AccessibleNode+expanded) : <code>Boolean</code>
    * [.disabled](#AccessibleNode+disabled) : <code>Boolean</code>
    * [.invalid](#AccessibleNode+invalid) : <code>String</code>
    * [.hasPopUp](#AccessibleNode+hasPopUp) : <code>String</code>
    * [.pressed](#AccessibleNode+pressed) : <code>String</code>
    * [.valueText](#AccessibleNode+valueText) : <code>String</code>
    * [.placeholder](#AccessibleNode+placeholder) : <code>String</code>
    * [.valueNow](#AccessibleNode+valueNow) : <code>Number</code>
    * [.valueMin](#AccessibleNode+valueMin) : <code>Number</code>
    * [.valueMax](#AccessibleNode+valueMax) : <code>Number</code>
    * [.activeDescendant](#AccessibleNode+activeDescendant) : <code>AcccessibleNode</code>
    * [.details](#AccessibleNode+details) : <code>AcccessibleNode</code>
    * [.errorMessage](#AccessibleNode+errorMessage) : <code>AcccessibleNode</code>
    * [.colCount](#AccessibleNode+colCount) : <code>Integer</code>
    * [.colIndex](#AccessibleNode+colIndex) : <code>Integer</code>
    * [.colSpan](#AccessibleNode+colSpan) : <code>Integer</code>
    * [.posInSet](#AccessibleNode+posInSet) : <code>Integer</code>
    * [.rowCount](#AccessibleNode+rowCount) : <code>Integer</code>
    * [.rowIndex](#AccessibleNode+rowIndex) : <code>Integer</code>
    * [.rowSpan](#AccessibleNode+rowSpan) : <code>Integer</code>
    * [.setSize](#AccessibleNode+setSize) : <code>Integer</code>
    * [.level](#AccessibleNode+level) : <code>Integer</code>
    * [.tabIndex](#Base+tabIndex) : <code>Number</code>
    * [.addListener(label, callback, [options])](#Base+addListener)

<a name="AccessibleNode+labelledBy"></a>

### accessibleNode.labelledBy : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances that labels the current element

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**

- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby

<a name="AccessibleNode+describedBy"></a>

### accessibleNode.describedBy : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances that describes the current element

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**

- [AccessibleNode#labeledBy](AccessibleNode#labeledBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-describedby

<a name="AccessibleNode+controls"></a>

### accessibleNode.controls : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances whose contents or presence are controlled by
the current element.

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**

- [owns](#AccessibleNode+owns)
- https://www.w3.org/TR/wai-aria-1.1/#aria-controls

<a name="AccessibleNode+flowTo"></a>

### accessibleNode.flowTo : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Contains the next element(s) in an alternate reading order of content which, at the user's 
discretion, allows assistive technology to override the general default of reading in
document source order.

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-flowto  
<a name="AccessibleNode+owns"></a>

### accessibleNode.owns : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Contains children who's ID are referenced inside the `aria-owns` attribute

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-owns  
<a name="AccessibleNode+role"></a>

### accessibleNode.role : <code>String</code>
Defines a type it represents, e.g. `tab`

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#roles  
<a name="AccessibleNode+roleDescription"></a>

### accessibleNode.roleDescription : <code>String</code>
Defines a human-readable, author-localized description for the role

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-roledescription  
<a name="AccessibleNode+label"></a>

### accessibleNode.label : <code>String</code>
Defines a string value that labels the current element.

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-label  
<a name="AccessibleNode+current"></a>

### accessibleNode.current : <code>Boolean</code> \| <code>String</code>
Indicates the element that represents the current item within a container or set of related elements.

Possible strings are:
* `page`, used to indicate a link within a set of pagination links, 
		where the link is visually styled to represent the currently-displayed page.
* `step`, used to indicate a link within a step indicator for a step-based process,
		where the link is visually styled to represent the current step.
* `location`, used to indicate the image that is visually highlighted as the current component of a flow chart.
* `date`, used to indicate the current date within a calendar.
* `time`, used to indicate the current time within a timetable.

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-current  
<a name="AccessibleNode+autocomplete"></a>

### accessibleNode.autocomplete : <code>String</code>
Indicates whether inputting text could trigger display of one or more predictions of the user's
intended value for an input and specifies how predictions would be presented if they are made.

The behavior during input is depends on the provided value, it follows beneath table.

| Value  | 	Description |
| ------ | --- |
| inline | Text suggesting may be dynamically inserted after the caret.
| list   | A collection of values that could complete the provided input is displayed.
| both   | Implements `inline` and `list`
| none   | No prediction is shown

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-autocomplete  
<a name="AccessibleNode+hidden"></a>

### accessibleNode.hidden : <code>Boolean</code>
Returns/sets the visibility of the element who is exposed to an accessibility API.

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**

- [disabled](#AccessibleNode+disabled)
- https://www.w3.org/TR/wai-aria-1.1/#aria-hidden

<a name="AccessibleNode+keyShortcuts"></a>

### accessibleNode.keyShortcuts : <code>String</code>
Indicates keyboard shortcuts that an author has implemented to activate or
give focus to an element.

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-keyshortcuts  
<a name="AccessibleNode+modal"></a>

### accessibleNode.modal : <code>Boolean</code>
Indicates whether an element is modal when displayed.

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-modal  
<a name="AccessibleNode+multiline"></a>

### accessibleNode.multiline : <code>Boolean</code>
Indicates whether a text box accepts multiple lines of input or only a single line.

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-multiline  
<a name="AccessibleNode+multiselectable"></a>

### accessibleNode.multiselectable : <code>Boolean</code>
Indicates that the user may select more than one item from the current selectable descendants.

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-multiselectable  
<a name="AccessibleNode+orientation"></a>

### accessibleNode.orientation : <code>String</code>
Indicates whether the element's orientation is `horizontal`, `vertical`, or `null`.

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-orientation  
<a name="AccessibleNode+readOnly"></a>

### accessibleNode.readOnly : <code>Boolean</code>
Indicates that the user may select more than one item from the current selectable descendants.

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-readonly  
<a name="AccessibleNode+required"></a>

### accessibleNode.required : <code>Boolean</code>
Indicates that user input is required on the element before a form may be submitted.

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-required  
<a name="AccessibleNode+selected"></a>

### accessibleNode.selected : <code>Boolean</code>
Indicates that user input is required on the element before a form may be submitted.

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-selected  
<a name="AccessibleNode+sort"></a>

### accessibleNode.sort : <code>Boolean</code>
Indicates if items in a table or grid are sorted in ascending or descending order.  
Possible values are `acending`, `descending`, `none`, `other` or `null`.

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-sort  
<a name="AccessibleNode+checked"></a>

### accessibleNode.checked : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](Checkbox)

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+expanded"></a>

### accessibleNode.expanded : <code>Boolean</code>
Indicates whether the element, or another grouping element it controls, 
is currently expanded or collapsed.

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-expanded  
<a name="AccessibleNode+disabled"></a>

### accessibleNode.disabled : <code>Boolean</code>
Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**

- [hidden](#AccessibleNode+hidden)
- [AccessibleNode#readonly](AccessibleNode#readonly)
- https://www.w3.org/TR/wai-aria-1.1/#aria-disabled

<a name="AccessibleNode+invalid"></a>

### accessibleNode.invalid : <code>String</code>
Indicates the entered value does not conform to the format expected by the application.

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**

- [errorMessage](#AccessibleNode+errorMessage)
- https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage

<a name="AccessibleNode+hasPopUp"></a>

### accessibleNode.hasPopUp : <code>String</code>
Indicates the availability and type of interactive popup element, such as menu or dialog,
that can be triggered by an element.

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup  
<a name="AccessibleNode+pressed"></a>

### accessibleNode.pressed : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](Checkbox)

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+valueText"></a>

### accessibleNode.valueText : <code>String</code>
Returns / sets the human readable text alternative of [#aria-valuenow](#aria-valuenow) for a [Range](#Range) widget.

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext](https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext)  
<a name="AccessibleNode+placeholder"></a>

### accessibleNode.placeholder : <code>String</code>
Returns / sets a short hint intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder](https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder)  
<a name="AccessibleNode+valueNow"></a>

### accessibleNode.valueNow : <code>Number</code>
Returns / sets the current value for a [Range](#Range) widget.

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow](https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow)  
<a name="AccessibleNode+valueMin"></a>

### accessibleNode.valueMin : <code>Number</code>
Returns / sets the minimum allowed value for a [Range](#Range) widget.

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin](https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin)  
<a name="AccessibleNode+valueMax"></a>

### accessibleNode.valueMax : <code>Number</code>
Returns / sets the maximum allowed value for a [Range](#Range) widget.

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax](https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax)  
<a name="AccessibleNode+activeDescendant"></a>

### accessibleNode.activeDescendant : <code>AcccessibleNode</code>
Returns / sets the AccessibleNode of the currently active element when focus is on current element.

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-activedescendant  
<a name="AccessibleNode+details"></a>

### accessibleNode.details : <code>AcccessibleNode</code>
Returns / sets an AccessibleNode that provides a detailed, extended description 
for the current element.

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**

- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-details

<a name="AccessibleNode+errorMessage"></a>

### accessibleNode.errorMessage : <code>AcccessibleNode</code>
Returns / sets an AccessibleNode that provides an error message for the current element.

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**

- [invalid](#AccessibleNode+invalid)
- [describedBy](#AccessibleNode+describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage

<a name="AccessibleNode+colCount"></a>

### accessibleNode.colCount : <code>Integer</code>
Returns / sets the total number of columns in a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**

- [colIndex](#AccessibleNode+colIndex)
- https://www.w3.org/TR/wai-aria-1.1/#aria-setsize

<a name="AccessibleNode+colIndex"></a>

### accessibleNode.colIndex : <code>Integer</code>
Defines an element's column index or position with respect to the total number of columns 
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**

- [colCount](#AccessibleNode+colCount)
- [colSpan](#AccessibleNode+colSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-colindex

<a name="AccessibleNode+colSpan"></a>

### accessibleNode.colSpan : <code>Integer</code>
Defines the number of columns spanned by a cell or gridcell
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**

- [colIndex](#AccessibleNode+colIndex)
- [rowSpan](#AccessibleNode+rowSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-colspan

<a name="AccessibleNode+posInSet"></a>

### accessibleNode.posInSet : <code>Integer</code>
Defines an element's number or position in the current set of [listitem](listitem)s or [treeitem](treeitem)s.
Not required if all elements in the set are present in the DOM.

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**

- [setSize](#AccessibleNode+setSize)
- https://www.w3.org/TR/wai-aria-1.1/#aria-posinset

<a name="AccessibleNode+rowCount"></a>

### accessibleNode.rowCount : <code>Integer</code>
Defines the total number of rows in a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**

- [rowIndex](#AccessibleNode+rowIndex)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount

<a name="AccessibleNode+rowIndex"></a>

### accessibleNode.rowIndex : <code>Integer</code>
Defines an element's row index or position with respect to the total number of rows 
within a  [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**

- [rowCount](#AccessibleNode+rowCount)
- [rowSpan](#AccessibleNode+rowSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex

<a name="AccessibleNode+rowSpan"></a>

### accessibleNode.rowSpan : <code>Integer</code>
Defines the number of rows spanned by a cell or gridcell
within a [Table](Table), [Grid](Grid), or [Treegrid](Treegrid).

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**

- [rowIndex](#AccessibleNode+rowIndex)
- [colSpan](#AccessibleNode+colSpan)
- https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan

<a name="AccessibleNode+setSize"></a>

### accessibleNode.setSize : <code>Integer</code>
Defines the number of items in the current set of listitems or treeitems.
Not required if **all** elements in the set are present in the DOM.

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**

- [posInSet](#AccessibleNode+posInSet)
- https://www.w3.org/TR/wai-aria-1.1/#aria-setsize

<a name="AccessibleNode+level"></a>

### accessibleNode.level : <code>Integer</code>
Defines the hierarchical level of an element within a structure.
E.g. `<h1><h1/>` equals `<div role="heading" aria-level="1"></div>`

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-level  
<a name="Base+tabIndex"></a>

### accessibleNode.tabIndex : <code>Number</code>
Current tabindex of the element

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
<a name="Base+addListener"></a>

### accessibleNode.addListener(label, callback, [options])
Adds an listener to the object and targeted element

**Kind**: instance method of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**: customEvents  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | Type of event |
| callback | <code>function</code> | Callback function |
| [options] | <code>Object</code> | Extends AddEventListenerOptions |
| [options.key] | <code>String</code> | When label is set to `key` it specifies the keycombo to listen to |
| [options.attribute] | <code>String</code> | When label is set to `attributes` it specifies which attribute should be changed |
| [options.target] | <code>Element</code> | Changes the targeted element |
| [options.capture] | <code>Boolean</code> |  |
| [options.passive] | <code>Boolean</code> |  |
| [options.once] | <code>Boolean</code> |  |

<a name="ValidityState"></a>

## ValidityState
**Kind**: global class  

* [ValidityState](#ValidityState)
    * [.badInput](#ValidityState+badInput) : <code>Boolean</code>
    * [.customError](#ValidityState+customError) : <code>Boolean</code>
    * [.patternMismatch](#ValidityState+patternMismatch) : <code>Boolean</code>
    * [.rangeOverflow](#ValidityState+rangeOverflow) : <code>Boolean</code>
    * [.rangeUnderflow](#ValidityState+rangeUnderflow) : <code>Boolean</code>
    * [.stepMismatch](#ValidityState+stepMismatch) : <code>Boolean</code>
    * [.tooLong](#ValidityState+tooLong) : <code>Boolean</code>
    * [.tooShort](#ValidityState+tooShort) : <code>Boolean</code>
    * [.typeMismatch](#ValidityState+typeMismatch) : <code>Boolean</code>
    * [.valueMissing](#ValidityState+valueMissing) : <code>Boolean</code>
    * [.valid](#ValidityState+valid) : <code>Boolean</code>

<a name="ValidityState+badInput"></a>

### validityState.badInput : <code>Boolean</code>
Returns true if the user has provided input in the user interface that the 
user agent is unable to convert to a value; false otherwise.

**Kind**: instance property of [<code>ValidityState</code>](#ValidityState)  
<a name="ValidityState+customError"></a>

### validityState.customError : <code>Boolean</code>
Returns true if the element has a custom error; false otherwise.

**Kind**: instance property of [<code>ValidityState</code>](#ValidityState)  
<a name="ValidityState+patternMismatch"></a>

### validityState.patternMismatch : <code>Boolean</code>
Returns true if the element’s value doesn’t match the provided pattern; false otherwise.

**Kind**: instance property of [<code>ValidityState</code>](#ValidityState)  
<a name="ValidityState+rangeOverflow"></a>

### validityState.rangeOverflow : <code>Boolean</code>
Returns true if the element’s value is higher than the provided maximum; false otherwise.

**Kind**: instance property of [<code>ValidityState</code>](#ValidityState)  
<a name="ValidityState+rangeUnderflow"></a>

### validityState.rangeUnderflow : <code>Boolean</code>
Returns true if the element’s value is lower than the provided minimum; false otherwise.

**Kind**: instance property of [<code>ValidityState</code>](#ValidityState)  
<a name="ValidityState+stepMismatch"></a>

### validityState.stepMismatch : <code>Boolean</code>
Returns true if the element’s value doesn’t fit the rules given by the step attribute; false otherwise.

**Kind**: instance property of [<code>ValidityState</code>](#ValidityState)  
<a name="ValidityState+tooLong"></a>

### validityState.tooLong : <code>Boolean</code>
Returns true if the element’s value is longer than the provided maximum length; false otherwise.

**Kind**: instance property of [<code>ValidityState</code>](#ValidityState)  
<a name="ValidityState+tooShort"></a>

### validityState.tooShort : <code>Boolean</code>
Returns true if the element’s value, if it is not the empty string, is shorter than the provided minimum length; false otherwise.

**Kind**: instance property of [<code>ValidityState</code>](#ValidityState)  
<a name="ValidityState+typeMismatch"></a>

### validityState.typeMismatch : <code>Boolean</code>
Returns true if the element’s value is not in the correct syntax; false otherwise.

**Kind**: instance property of [<code>ValidityState</code>](#ValidityState)  
<a name="ValidityState+valueMissing"></a>

### validityState.valueMissing : <code>Boolean</code>
Returns true if the element has no value but is a required field; false otherwise.

**Kind**: instance property of [<code>ValidityState</code>](#ValidityState)  
<a name="ValidityState+valid"></a>

### validityState.valid : <code>Boolean</code>
Returns true if the element’s value has no validity problems; false otherwise

**Kind**: instance property of [<code>ValidityState</code>](#ValidityState)  
<a name="Validation"></a>

## Validation
**Kind**: global mixin  
<a name="Validation.validity"></a>

### Validation.validity
**Kind**: static class of [<code>Validation</code>](#Validation)  
<a name="allowedRoles"></a>

## allowedRoles : <code>Object</code>
Stores info which is used in functions of rolePerHTMLTag,
mostly a key as tagName with an array of allowed roles for that tag

**Kind**: global variable  
<a name="rolePerHTMLTag"></a>

## rolePerHTMLTag : <code>Object</code>
Contains a function for each htmlTag where not all roles allowed

**Kind**: global variable  
<a name="undefinedwillValidate"></a>

## undefinedwillValidate : <code>Boolean</code>
Returns true if the element will be validated when the form is submitted; false otherwise.

**Kind**: global variable  
<a name="undefinedvalidationMessage"></a>

## undefinedvalidationMessage : <code>String</code>
Returns the error message that would be shown to the user
if the element was to be checked for validity.

**Kind**: global variable  
<a name="roles"></a>

## roles
**Kind**: global constant  

* [roles](#roles)
    * [.banner](#roles.banner)
    * [.combobox](#roles.combobox)
    * [.contentinfo](#roles.contentinfo)
    * [.none](#roles.none)
    * [.option](#roles.option)
    * [.region](#roles.region)
    * [.row](#roles.row)
    * [.separator](#roles.separator)

<a name="roles.banner"></a>

### roles.banner
**Kind**: static property of [<code>roles</code>](#roles)  
**Todo**

- [ ] more strict banner selector

<a name="roles.combobox"></a>

### roles.combobox
**Kind**: static property of [<code>roles</code>](#roles)  
**Todo**

- [ ] size attribute doesn't check faulty values

<a name="roles.contentinfo"></a>

### roles.contentinfo
**Kind**: static property of [<code>roles</code>](#roles)  
**Todo**

- [ ] more strict footer selector

<a name="roles.none"></a>

### roles.none
**Kind**: static property of [<code>roles</code>](#roles)  
**Todo**

- [ ] reconsider if none == presentation

<a name="roles.option"></a>

### roles.option
**Kind**: static property of [<code>roles</code>](#roles)  
**Todo**

- [ ] more strict datalist selector

<a name="roles.region"></a>

### roles.region
**Kind**: static property of [<code>roles</code>](#roles)  
**Todo**

- [ ] add section selector to check accessible

<a name="roles.row"></a>

### roles.row
**Kind**: static property of [<code>roles</code>](#roles)  
**Todo**

- [ ] more strict tr selector

<a name="roles.separator"></a>

### roles.separator
**Kind**: static property of [<code>roles</code>](#roles)  
**Todo**

- [ ] seperation of focusable

<a name="AriaChecked"></a>

## AriaChecked()
Adds functionality to `aria-checked` attribute.

Changes value when clicked or while focused pressing `Space`.

[https://www.w3.org/TR/wai-aria-1.1/#aria-checked](https://www.w3.org/TR/wai-aria-1.1/#aria-checked)

**Kind**: global function  
**Emits**: <code>event:click when clicked or while focused pressing &#x60;Space&#x60;.</code>, <code>event:change when clicked or while focused pressing &#x60;Space&#x60;.</code>  
<a name="AriaExpanded"></a>

## AriaExpanded()
Adds functionality to `aria-expanded` attribute

**Kind**: global function  
**Todo**

- [ ] add a setting to define how the visibility should be toggled

<a name="AriaPressed"></a>

## AriaPressed()
Adds functionality to `aria-pressed` attribute.

Changes value when clicked or while focused pressing `Space` or `Enter`.

[https://www.w3.org/TR/wai-aria-1.1/#aria-pressed](https://www.w3.org/TR/wai-aria-1.1/#aria-pressed)

**Kind**: global function  
**Emits**: <code>event:click when clicked or while focused pressing &#x60;Space&#x60; or &#x60;Enter&#x60;.</code>  
<a name="AriaSelected"></a>

## AriaSelected()
gets and sets the `aria-selected` attribute.

Indicates if a element is selectable

**Kind**: global function  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-selected  
<a name="AccessibleNodeList"></a>

## AccessibleNodeList()
**Kind**: global function  
<a name="toggle"></a>

## toggle() ⇒ <code>Boolean</code>
Returns the opposite state of the attribute

**Kind**: global function  
**Returns**: <code>Boolean</code> - New state  
<a name="toggle"></a>

## toggle() ⇒ <code>String</code>
Returns the opposite state of the attribute

**Kind**: global function  
**Returns**: <code>String</code> - New state  
<a name="getParentWithTagName"></a>

## getParentWithTagName(el, tagName) ⇒ <code>HTMLElement</code>
Finds nearest parent with a specifig tagName

**Kind**: global function  
**Returns**: <code>HTMLElement</code> - Parent that matches one of the tagnames  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>HTMLElement</code> | child - starting pointer |
| tagName | <code>Array.&lt;String&gt;</code> | Array containg capatilized tagnames |

<a name="hasAllowedRole"></a>

## hasAllowedRole(tagName, role) ⇒ <code>Boolean</code>
Checks if given role is allowed for given tag

**Kind**: global function  
**Returns**: <code>Boolean</code> - True if allowed  

| Param | Type | Description |
| --- | --- | --- |
| tagName | <code>string</code> | key of allowedRoles |
| role | <code>string</code> | current role |

<a name="scrollIntoView"></a>

## scrollIntoView(child)
Scrolls an element into its parent view

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| child | <code>Element</code> | Element to show |

<a name="start"></a>

## start(descendants)
Adds focus to the first element

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| descendants | <code>Array</code> | Array of all descendants |

<a name="prev"></a>

## prev(descendants, child)
Adds focus to the prev element

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| descendants | <code>Array</code> | Array of all descendants |
| child | <code>Object</code> | Current focused element |

<a name="next"></a>

## next(descendants, child)
Adds focus to the next element

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| descendants | <code>Array</code> | Array of all descendants |
| child | <code>Object</code> | Current focused element |

<a name="end"></a>

## end(descendants)
Adds focus to the last element

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| descendants | <code>Array</code> | Array of all descendants |

<a name="undefinedcheckValidity"></a>

## undefinedcheckValidity()
Returns true if the element’s value has no validity problems; false otherwise.
Fires an invalid event at the element in the latter case.

**Kind**: global function  
**Emits**: <code>event:invalid</code>  
<a name="undefinedreportValidity"></a>

## undefinedreportValidity()
Returns true if the element’s value has no validity problems; otherwise, returns false, fires an
invalid event at the element, and(if the event isn’t canceled) reports the problem to the user.

**Kind**: global function  
**Emits**: <code>event:invalid</code>  
<a name="undefinedsetCustomValidity"></a>

## undefinedsetCustomValidity(message)
Sets a custom error, so that the element would fail to validate.The given message is the
message to be shown to the user when reporting the problem to the user.

If the argument is the empty string, clears the custom error.

**Kind**: global function  

| Param | Type |
| --- | --- |
| message | <code>String</code> | 

