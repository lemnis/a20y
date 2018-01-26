
<base href="D:\Personal\autotility./docs/">
<link rel="stylesheet" href="./dist/style.css" />
<a name="AccessibleNode"></a>

## AccessibleNode
Based on the AOM spec

**Kind**: global class  

* [AccessibleNode](#AccessibleNode)
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

<a name="AccessibleNode+labelledBy"></a>

### accessibleNode.labelledBy : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances that labels the current element

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**

- [AccessibleNode#describedBy](AccessibleNode#describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby

<a name="AccessibleNode+role"></a>

### accessibleNode.role : <code>String</code>
Defines a type it represents, e.g. `tab`

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#roles  
<a name="AccessibleNode+label"></a>

### accessibleNode.label : <code>String</code>
Defines a string value that labels the current element.

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-label  
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
<a name="AccessibleNode+checked"></a>

### accessibleNode.checked : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](#Checkbox)

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

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

- [AccessibleNode#errorMessage](AccessibleNode#errorMessage)
- https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage

<a name="AccessibleNode+pressed"></a>

### accessibleNode.pressed : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](#Checkbox)

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+placeholder"></a>

### accessibleNode.placeholder : <code>String</code>
Returns / sets a short hint intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

**Kind**: instance property of [<code>AccessibleNode</code>](#AccessibleNode)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder](https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder)  

<script src="./dist/bundle.js" /></script>
		