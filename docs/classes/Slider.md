
<base href="//D:/Personal/autotility/docs/">
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
    * [.stepDown(ev)](#Range+stepDown)
    * [.stepUp(ev)](#Range+stepUp)

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
<a name="Range+_"></a>

### slider._ : <code>Object</code>
**Kind**: instance property of [<code>Slider</code>](#Slider)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| [step] | <code>Number</code> | <code>1</code> | 

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


<script src="./dist/bundle.js" /></script>
		