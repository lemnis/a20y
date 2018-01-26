
<base href="//github.com/lemnis/a20y/./docs/">
<link rel="stylesheet" href="./dist/style.css" />
<a name="Textbox"></a>

## Textbox ⇐ [<code>Input</code>](#Input)
### Examples

##### Basic example

<div role='textbox' contenteditable></div>

```html
<div role='textbox' contenteditable></div>
```

**Kind**: global class  
**Summary**: A type of input that allows free-form text as its value.  
**Extends**: [<code>Input</code>](#Input)  
**Mixes**: [<code>Selection</code>](#Selection)  
**Todo**

- [ ] Add options to keep or remove pasted styling


* [Textbox](#Textbox) ⇐ [<code>Input</code>](#Input)
    * [new Textbox(...args)](#new_Textbox_new)
    * [.value](#Textbox+value) : <code>String</code>
    * [.minLength](#Textbox+minLength) : <code>Integer</code>
    * [.maxLength](#Textbox+maxLength) : <code>Integer</code>
    * [.size](#Textbox+size) : <code>Integer</code>
    * [.form](#Input+form) ⇒ [<code>AccessibleNode</code>](#AccessibleNode)
    * [.list](#Input+list) ⇒ [<code>AccessibleNode</code>](#AccessibleNode)
    * [.labelledBy](#AccessibleNode+labelledBy) : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
    * [.role](#AccessibleNode+role) : <code>String</code>
    * [.label](#AccessibleNode+label) : <code>String</code>
    * [.autocomplete](#AccessibleNode+autocomplete) : <code>String</code>
    * [.hidden](#AccessibleNode+hidden) : <code>Boolean</code>
    * [.multiline](#AccessibleNode+multiline) : <code>Boolean</code>
    * [.multiselectable](#AccessibleNode+multiselectable) : <code>Boolean</code>
    * [.readOnly](#AccessibleNode+readOnly) : <code>Boolean</code>
    * [.required](#AccessibleNode+required) : <code>Boolean</code>
    * [.selected](#AccessibleNode+selected) : <code>Boolean</code>
    * [.checked](#AccessibleNode+checked) : <code>String</code>
    * [.disabled](#AccessibleNode+disabled) : <code>Boolean</code>
    * [.invalid](#AccessibleNode+invalid) : <code>String</code>
    * [.pressed](#AccessibleNode+pressed) : <code>String</code>
    * [.placeholder](#AccessibleNode+placeholder) : <code>String</code>
    * [.tabIndex](#Base+tabIndex) : <code>Number</code>
    * [.addListener(label, callback, [options])](#Base+addListener)

<a name="new_Textbox_new"></a>

### new Textbox(...args)

| Param | Type |
| --- | --- |
| ...args | <code>\*</code> | 

<a name="Textbox+value"></a>

### textbox.value : <code>String</code>
Returns / Sets the current value of the textbox.

**Kind**: instance property of [<code>Textbox</code>](#Textbox)  
<a name="Textbox+minLength"></a>

### textbox.minLength : <code>Integer</code>
Returns / Sets the minmum length of characters

**Kind**: instance property of [<code>Textbox</code>](#Textbox)  
<a name="Textbox+maxLength"></a>

### textbox.maxLength : <code>Integer</code>
Returns / Sets the maximum length of characters

**Kind**: instance property of [<code>Textbox</code>](#Textbox)  
<a name="Textbox+size"></a>

### textbox.size : <code>Integer</code>
Returns / Sets the size of control.

**Kind**: instance property of [<code>Textbox</code>](#Textbox)  
<a name="Input+form"></a>

### textbox.form ⇒ [<code>AccessibleNode</code>](#AccessibleNode)
Returns a reference to the parent form element

**Kind**: instance property of [<code>Textbox</code>](#Textbox)  
**Returns**: [<code>AccessibleNode</code>](#AccessibleNode) - [Form](#Form)  
<a name="Input+list"></a>

### textbox.list ⇒ [<code>AccessibleNode</code>](#AccessibleNode)
Returns the first element pointed by the [AccessibleNode#controls](AccessibleNode#controls) property.
The property may be null if no HTML element found in the same tree.

**Kind**: instance property of [<code>Textbox</code>](#Textbox)  
**Returns**: [<code>AccessibleNode</code>](#AccessibleNode) - [Listbox](#Listbox)  
<a name="AccessibleNode+labelledBy"></a>

### textbox.labelledBy : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances that labels the current element

**Kind**: instance property of [<code>Textbox</code>](#Textbox)  
**See**

- [AccessibleNode#describedBy](AccessibleNode#describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby

<a name="AccessibleNode+role"></a>

### textbox.role : <code>String</code>
Defines a type it represents, e.g. `tab`

**Kind**: instance property of [<code>Textbox</code>](#Textbox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#roles  
<a name="AccessibleNode+label"></a>

### textbox.label : <code>String</code>
Defines a string value that labels the current element.

**Kind**: instance property of [<code>Textbox</code>](#Textbox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-label  
<a name="AccessibleNode+autocomplete"></a>

### textbox.autocomplete : <code>String</code>
Indicates whether inputting text could trigger display of one or more predictions of the user's
intended value for an input and specifies how predictions would be presented if they are made.

The behavior during input is depends on the provided value, it follows beneath table.

| Value  | 	Description |
| ------ | --- |
| inline | Text suggesting may be dynamically inserted after the caret.
| list   | A collection of values that could complete the provided input is displayed.
| both   | Implements `inline` and `list`
| none   | No prediction is shown

**Kind**: instance property of [<code>Textbox</code>](#Textbox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-autocomplete  
<a name="AccessibleNode+hidden"></a>

### textbox.hidden : <code>Boolean</code>
Returns/sets the visibility of the element who is exposed to an accessibility API.

**Kind**: instance property of [<code>Textbox</code>](#Textbox)  
**See**

- [disabled](#AccessibleNode+disabled)
- https://www.w3.org/TR/wai-aria-1.1/#aria-hidden

<a name="AccessibleNode+multiline"></a>

### textbox.multiline : <code>Boolean</code>
Indicates whether a text box accepts multiple lines of input or only a single line.

**Kind**: instance property of [<code>Textbox</code>](#Textbox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-multiline  
<a name="AccessibleNode+multiselectable"></a>

### textbox.multiselectable : <code>Boolean</code>
Indicates that the user may select more than one item from the current selectable descendants.

**Kind**: instance property of [<code>Textbox</code>](#Textbox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-multiselectable  
<a name="AccessibleNode+readOnly"></a>

### textbox.readOnly : <code>Boolean</code>
Indicates that the user may select more than one item from the current selectable descendants.

**Kind**: instance property of [<code>Textbox</code>](#Textbox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-readonly  
<a name="AccessibleNode+required"></a>

### textbox.required : <code>Boolean</code>
Indicates that user input is required on the element before a form may be submitted.

**Kind**: instance property of [<code>Textbox</code>](#Textbox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-required  
<a name="AccessibleNode+selected"></a>

### textbox.selected : <code>Boolean</code>
Indicates that user input is required on the element before a form may be submitted.

**Kind**: instance property of [<code>Textbox</code>](#Textbox)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-selected  
<a name="AccessibleNode+checked"></a>

### textbox.checked : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](#Checkbox)

**Kind**: instance property of [<code>Textbox</code>](#Textbox)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+disabled"></a>

### textbox.disabled : <code>Boolean</code>
Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

**Kind**: instance property of [<code>Textbox</code>](#Textbox)  
**See**

- [hidden](#AccessibleNode+hidden)
- [AccessibleNode#readonly](AccessibleNode#readonly)
- https://www.w3.org/TR/wai-aria-1.1/#aria-disabled

<a name="AccessibleNode+invalid"></a>

### textbox.invalid : <code>String</code>
Indicates the entered value does not conform to the format expected by the application.

**Kind**: instance property of [<code>Textbox</code>](#Textbox)  
**See**

- [AccessibleNode#errorMessage](AccessibleNode#errorMessage)
- https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage

<a name="AccessibleNode+pressed"></a>

### textbox.pressed : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](#Checkbox)

**Kind**: instance property of [<code>Textbox</code>](#Textbox)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+placeholder"></a>

### textbox.placeholder : <code>String</code>
Returns / sets a short hint intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

**Kind**: instance property of [<code>Textbox</code>](#Textbox)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder](https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder)  
<a name="Base+tabIndex"></a>

### textbox.tabIndex : <code>Number</code>
Current tabindex of the element

**Kind**: instance property of [<code>Textbox</code>](#Textbox)  
<a name="Base+addListener"></a>

### textbox.addListener(label, callback, [options])
Adds an listener to the object and targeted element

**Kind**: instance method of [<code>Textbox</code>](#Textbox)  
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


<script src="./dist/bundle.js" /></script>
		