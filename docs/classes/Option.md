
<base href="//lemnis.github.io/a20y/">
<link rel="stylesheet" href="./dist/style.css" />
<a name="Option"></a>

## Option ⇐ [<code>Input</code>](#Input)
**Kind**: global class  
**Extends**: [<code>Input</code>](#Input)  

* [Option](#Option) ⇐ [<code>Input</code>](#Input)
    * [.form](#Input+form) ⇒ <code>AccessibleNode</code>
    * [.list](#Input+list) ⇒ <code>AccessibleNode</code>
    * [.tabIndex](#Roletype+tabIndex) : <code>Number</code>
    * [.addEventListener(label, callback, [options])](#Roletype+addEventListener)

<a name="Input+form"></a>

### option.form ⇒ <code>AccessibleNode</code>
Returns a reference to the parent form element

**Kind**: instance property of [<code>Option</code>](#Option)  
**Returns**: <code>AccessibleNode</code> - [Form](#Form)  
<a name="Input+list"></a>

### option.list ⇒ <code>AccessibleNode</code>
Returns the first element pointed by the [AccessibleNode#controls](AccessibleNode#controls) property.
The property may be null if no HTML element found in the same tree.

**Kind**: instance property of [<code>Option</code>](#Option)  
**Returns**: <code>AccessibleNode</code> - [Listbox](#Listbox)  
<a name="Roletype+tabIndex"></a>

### option.tabIndex : <code>Number</code>
Current tabindex of the element

**Kind**: instance property of [<code>Option</code>](#Option)  
<a name="Roletype+addEventListener"></a>

### option.addEventListener(label, callback, [options])
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


<script src="./dist/bundle.js" /></script>
		