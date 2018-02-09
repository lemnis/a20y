
<base href="//lemnis.github.io/a20y/">
<link rel="stylesheet" href="./dist/style.css" />
<a name="Listbox"></a>

## Listbox ⇐ [<code>Roletype</code>](#Roletype)
**Kind**: global class  
**Summary**: A widget that allows the user to select one or more items from a list of choices.  
**Extends**: [<code>Roletype</code>](#Roletype)  
**Emits**: <code>Listbox#event:change</code>, <code>Listbox#event:input</code>  

* [Listbox](#Listbox) ⇐ [<code>Roletype</code>](#Roletype)
    * [new Listbox()](#new_Listbox_new)
    * [.size](#Listbox+size) : <code>Integer</code>
    * [.tabIndex](#Roletype+tabIndex) : <code>Number</code>
    * [.addEventListener(label, callback, [options])](#Roletype+addEventListener)

<a name="new_Listbox_new"></a>

### new Listbox()
### Keyboard Support

<a name="Listbox+size"></a>

### listbox.size : <code>Integer</code>
Returns / Sets the size of control.

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
<a name="Roletype+tabIndex"></a>

### listbox.tabIndex : <code>Number</code>
Current tabindex of the element

**Kind**: instance property of [<code>Listbox</code>](#Listbox)  
<a name="Roletype+addEventListener"></a>

### listbox.addEventListener(label, callback, [options])
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


<script src="./dist/bundle.js" /></script>
		