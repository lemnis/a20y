
<base href="//D:/Personal/autotility/docs/">
<link rel="stylesheet" href="./dist/style.css" />
<a name="Range"></a>

## Range ⇐ [<code>Widget</code>](#Widget)
**(Abstract role) SHOULD NOT USED IN THE DOM** 
An input representing a range of values that can be set by the user.

**Kind**: global class  
**Extends**: [<code>Widget</code>](#Widget)  
**See**: [https://w3c.github.io/aria/aria/aria.html#range](https://w3c.github.io/aria/aria/aria.html#range)  

* [Range](#Range) ⇐ [<code>Widget</code>](#Widget)
    * [new Range(element, [options])](#new_Range_new)
    * [._](#Range+_) : <code>Object</code>
    * [.value](#Range+value) : <code>String</code>
    * [.valueAsNumber](#Range+valueAsNumber) : <code>Number</code>
    * [.stepDown(ev)](#Range+stepDown)
    * [.stepUp(ev)](#Range+stepUp)

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
| [step] | <code>Number</code> | <code>1</code> | 

<a name="Range+value"></a>

### range.value : <code>String</code>
Passtrough of an stringified `valueNow`

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**: [AccessibleNode#valueNow](AccessibleNode#valueNow)  
<a name="Range+valueAsNumber"></a>

### range.valueAsNumber : <code>Number</code>
Proxy of the `valueNow` value

**Kind**: instance property of [<code>Range</code>](#Range)  
**See**: [AccessibleNode#valueNow](AccessibleNode#valueNow)  
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


<script src="./dist/bundle.js" /></script>
		