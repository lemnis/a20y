
<base href="//D:/Personal/autotility/docs/">
<link rel="stylesheet" href="./dist/style.css" />
<a name="Scrollbar"></a>

## Scrollbar ⇐ [<code>Range</code>](#Range)
**Kind**: global class  
**Extends**: [<code>Range</code>](#Range)  

* [Scrollbar](#Scrollbar) ⇐ [<code>Range</code>](#Range)
    * [._](#Range+_) : <code>Object</code>
    * [.value](#Range+value) : <code>String</code>
    * [.valueAsNumber](#Range+valueAsNumber) : <code>Number</code>
    * [.stepDown(ev)](#Range+stepDown)
    * [.stepUp(ev)](#Range+stepUp)

<a name="Range+_"></a>

### scrollbar._ : <code>Object</code>
**Kind**: instance property of [<code>Scrollbar</code>](#Scrollbar)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| [step] | <code>Number</code> | <code>1</code> | 

<a name="Range+value"></a>

### scrollbar.value : <code>String</code>
Passtrough of an stringified `valueNow`

**Kind**: instance property of [<code>Scrollbar</code>](#Scrollbar)  
**See**: [AccessibleNode#valueNow](AccessibleNode#valueNow)  
<a name="Range+valueAsNumber"></a>

### scrollbar.valueAsNumber : <code>Number</code>
Proxy of the `valueNow` value

**Kind**: instance property of [<code>Scrollbar</code>](#Scrollbar)  
**See**: [AccessibleNode#valueNow](AccessibleNode#valueNow)  
<a name="Range+stepDown"></a>

### scrollbar.stepDown(ev)
Decrease the value with the amount of 1 step

**Kind**: instance method of [<code>Scrollbar</code>](#Scrollbar)  

| Param | Type | Description |
| --- | --- | --- |
| ev | <code>Event</code> | Event when triggered through an elements |

<a name="Range+stepUp"></a>

### scrollbar.stepUp(ev)
Increase the value with the amount of 1 step

**Kind**: instance method of [<code>Scrollbar</code>](#Scrollbar)  
**Package**:   

| Param | Type | Description |
| --- | --- | --- |
| ev | <code>Event</code> | Event when triggered through an elements |


<script src="./dist/bundle.js" /></script>
		