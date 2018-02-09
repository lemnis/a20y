
<base href="//D:/Personal/autotility/docs/">
<link rel="stylesheet" href="./dist/style.css" />
<a name="Radio"></a>

## Radio ⇐ [<code>Command</code>](#Command)
A checkable input in a group of elements with the same role,only one of which can be checked at a time.### Examples#### Default<div role="radio" aria-checked="true" tabindex="0">Apple</div><div role="radio" aria-checked="false" tabindex="0">Apple</div>

**Kind**: global class  
**Extends**: [<code>Command</code>](#Command)  
**Mixes**: [<code>AriaChecked</code>](#AriaChecked)  

* [Radio](#Radio) ⇐ [<code>Command</code>](#Command)
    * [.tabIndex](#Roletype+tabIndex) : <code>Number</code>
    * [.addEventListener(label, callback, [options])](#Roletype+addEventListener)

<a name="Roletype+tabIndex"></a>

### radio.tabIndex : <code>Number</code>
Current tabindex of the element

**Kind**: instance property of [<code>Radio</code>](#Radio)  
<a name="Roletype+addEventListener"></a>

### radio.addEventListener(label, callback, [options])
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


<script src="./dist/bundle.js" /></script>
		