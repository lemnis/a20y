
<base href="//lemnis.github.io/a20y/">
<link rel="stylesheet" href="./dist/style.css" />
<a name="Radiogroup"></a>

## Radiogroup ⇐ [<code>Select</code>](#Select)
### Example#### Basic example<div role="radiogroup" tabindex="0" aria-activedescendant="radio_1">  <div id="radio_1" role="radio" aria-checked="true">Apple</div>  <div id="radio_2" role="radio" aria-checked="false">Grapefruit</div></div>

**Kind**: global class  
**Extends**: [<code>Select</code>](#Select)  

* [Radiogroup](#Radiogroup) ⇐ [<code>Select</code>](#Select)
    * [.tabIndex](#Roletype+tabIndex) : <code>Number</code>
    * [.addEventListener(label, callback, [options])](#Roletype+addEventListener)

<a name="Roletype+tabIndex"></a>

### radiogroup.tabIndex : <code>Number</code>
Current tabindex of the element

**Kind**: instance property of [<code>Radiogroup</code>](#Radiogroup)  
<a name="Roletype+addEventListener"></a>

### radiogroup.addEventListener(label, callback, [options])
Adds an listener to the object and targeted element

**Kind**: instance method of [<code>Radiogroup</code>](#Radiogroup)  
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
		