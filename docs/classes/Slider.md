
<base href="//lemnis.github.io/a20y/">
<link rel="stylesheet" href="./dist/style.css" />
<a name="Slider"></a>

## Slider ⇐ [<code>Range</code>](#Range)
The slider element let the user specify a numeric value which must be no less
than a given value, and no more than another given value. 

The precise value,however, is not considered important. This is typically represented using a slider or
dial control rather than a text entry box like the "number" input type. Because this kind of widget
is imprecise, it shouldn't typically be used unless the control's exact value isn't important.

### Examples

#### Basic example

<div class="slider-track">
  <div role="slider"  tabindex="0"></div>
</div>

```html
<div class="slider-track">
  <div role="slider"  tabindex="0"></div>
</div>
```

#### As an button with a specified step and range

<div class="slider-track">
  <button type="button" role="slider"
		aria-valuemin="30" aria-valuemax="300" aria-valuenow="50" data-step="10"></button>
</div>

```html
<div class="slider-track">
  <button type="button" role="slider"
		aria-valuemin="30" aria-valuemax="300" aria-valuenow="50" data-step="10"></button>
</div>
```

#### Vertical

<div class="slider-track vertical">
  <button type="button" role="slider" aria-orientation="vertical"></button>
</div>

```html
<div class="slider-track vertical">
  <button type="button" role="slider" aria-orientation="vertical"></button>
</div>
```

#### Disabled

<div class="slider-track">
  <button type="button" role="slider" aria-disabled="true"></button>
</div>

```html
<div class="slider-track">
  <button type="button" role="slider" aria-disabled="true"></button>
</div>
```

**Kind**: global class  
**Summary**: A user input where the user selects a value from within a given range.  
**Extends**: [<code>Range</code>](#Range)  
**Emits**: <code>event:change</code>, <code>event:input</code>  
**Todo**

- [ ] add support for "any"
- [ ] add events


* [Slider](#Slider) ⇐ [<code>Range</code>](#Range)
    * [new Slider(element, [options])](#new_Slider_new)
    * [.valueMin](#Slider+valueMin)
    * [._](#Range+_) : <code>Object</code>
    * [.value](#Range+value) : <code>String</code>
    * [.valueAsNumber](#Range+valueAsNumber) : <code>Number</code>
    * [.tabIndex](#Roletype+tabIndex) : <code>Number</code>
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
    * [.stepDown(ev)](#Range+stepDown)
    * [.stepUp(ev)](#Range+stepUp)
    * [.addListener(label, callback, [options])](#Roletype+addListener)

<a name="new_Slider_new"></a>

### new Slider(element, [options])
**Returns**: [<code>Slider</code>](#Slider) - thisArg  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | element to derive information nameFrom |
| [options] | <code>Object</code> | optional options |
| [options.slider.track] | <code>HTMLElement</code> | The element that resembles the track, defaults to the elements parent |
| [options.step] | <code>Number</code> \| <code>&quot;any&quot;</code> | increase/decrease amount |

<a name="Slider+valueMin"></a>

### slider.valueMin
**Kind**: instance property of [<code>Slider</code>](#Slider)  
**Default**: <code>[0]</code>  
**Overrides**: <code>Range#valueMin</code>  
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
**See**: [AccessibleNode#valueNow](AccessibleNode#valueNow)  
<a name="Range+valueAsNumber"></a>

### slider.valueAsNumber : <code>Number</code>
Proxy of the `valueNow` value

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**: [AccessibleNode#valueNow](AccessibleNode#valueNow)  
<a name="Roletype+tabIndex"></a>

### slider.tabIndex : <code>Number</code>
Current tabindex of the element

**Kind**: instance property of [<code>Slider</code>](#Slider)  
<a name="AccessibleNode+labelledBy"></a>

### slider.labelledBy : [<code>AccessibleNodeList</code>](#AccessibleNodeList)
Returns an list with AccessibleNode instances that labels the current element

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**

- [AccessibleNode#describedBy](AccessibleNode#describedBy)
- https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby

<a name="AccessibleNode+role"></a>

### slider.role : <code>String</code>
Defines a type it represents, e.g. `tab`

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#roles  
<a name="AccessibleNode+label"></a>

### slider.label : <code>String</code>
Defines a string value that labels the current element.

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**: https://www.w3.org/TR/wai-aria-1.1/#aria-label  
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
<a name="AccessibleNode+checked"></a>

### slider.checked : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](#Checkbox)

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

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

- [AccessibleNode#errorMessage](AccessibleNode#errorMessage)
- https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage

<a name="AccessibleNode+pressed"></a>

### slider.pressed : <code>String</code>
Indicates the current "checked" state of a [Widget](#Widget), among [Radio](#Radio) and [Checkbox](#Checkbox)

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**

- [pressed](#AccessibleNode+pressed)
- [selected](#AccessibleNode+selected)
- https://www.w3.org/TR/wai-aria-1.1/#aria-pressed

<a name="AccessibleNode+placeholder"></a>

### slider.placeholder : <code>String</code>
Returns / sets a short hint intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

**Kind**: instance property of [<code>Slider</code>](#Slider)  
**See**: [https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder](https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder)  
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

<a name="Roletype+addListener"></a>

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


<script src="./dist/bundle.js" /></script>
		