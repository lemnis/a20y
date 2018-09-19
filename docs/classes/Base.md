
<base href="D:\Personal\autotility./docs/">
<link rel="stylesheet" href="./dist/style.css" />
<a name="Base"></a>

## Base
Adds some basic functionality that is greatly used inside the components

**Kind**: global class  

* [Base](#Base)
    * [new Base(element, options)](#new_Base_new)
    * [.tabIndex](#Base+tabIndex) : <code>Number</code>
    * [.addListener(label, callback, [options])](#Base+addListener)

<a name="new_Base_new"></a>

### new Base(element, options)

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Element</code> | Element where a AccessibleNode should be created |
| options | <code>Object</code> | Additional options to set |

<a name="Base+tabIndex"></a>

### base.tabIndex : <code>Number</code>
Current tabindex of the element

**Kind**: instance property of [<code>Base</code>](#Base)  
<a name="Base+addListener"></a>

### base.addListener(label, callback, [options])
Adds an listener to the object and targeted element

**Kind**: instance method of [<code>Base</code>](#Base)  
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
		