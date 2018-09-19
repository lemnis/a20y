
<base href="//D:/Personal/autotility/docs/">
<link rel="stylesheet" href="./dist/style.css" />
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
    * [.stepDown(ev)](#Range+stepDown)
    * [.stepUp(ev)](#Range+stepUp)

<a name="Spinbutton+_"></a>

### spinbutton._ : <code>Object</code>
**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**Overrides**: [<code>_</code>](#Range+_)  
**Properties**

| Name | Type |
| --- | --- |
| [spinbutton.up] | <code>HTMLElement</code> | 
| [spinbutton.down] | <code>HTMLElement</code> | 

<a name="Spinbutton+valueNow"></a>

### spinbutton.valueNow : <code>Number</code>
**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**Default**: <code>[0]</code>  
<a name="Range+value"></a>

### spinbutton.value : <code>String</code>
Passtrough of an stringified `valueNow`

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**: [AccessibleNode#valueNow](AccessibleNode#valueNow)  
<a name="Range+valueAsNumber"></a>

### spinbutton.valueAsNumber : <code>Number</code>
Proxy of the `valueNow` value

**Kind**: instance property of [<code>Spinbutton</code>](#Spinbutton)  
**See**: [AccessibleNode#valueNow](AccessibleNode#valueNow)  
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


<script src="./dist/bundle.js" /></script>
		