
<base href="//D:/Personal/autotility/docs/">
<link rel="stylesheet" href="./dist/style.css" />
<a name="Input"></a>

## *Input ⇐ [<code>Widget</code>](#Widget)*
**Kind**: global abstract class  
**Extends**: [<code>Widget</code>](#Widget)  
**Mixes**: <code>Validation</code>  

* *[Input](#Input) ⇐ [<code>Widget</code>](#Widget)*
    * *[new Input()](#new_Input_new)*
    * *[.form](#Input+form) ⇒ <code>AccessibleNode</code>*
    * *[.list](#Input+list) ⇒ <code>AccessibleNode</code>*

<a name="new_Input_new"></a>

### *new Input()*

| Param | Type | Description |
| --- | --- | --- |
| [options.input.pattern] | <code>Regex</code> | Regex to check against when validating |

<a name="Input+form"></a>

### *input.form ⇒ <code>AccessibleNode</code>*
Returns a reference to the parent form element

**Kind**: instance property of [<code>Input</code>](#Input)  
**Returns**: <code>AccessibleNode</code> - [Form](#Form)  
<a name="Input+list"></a>

### *input.list ⇒ <code>AccessibleNode</code>*
Returns the first element pointed by the [AccessibleNode#controls](AccessibleNode#controls) property.
The property may be null if no HTML element found in the same tree.

**Kind**: instance property of [<code>Input</code>](#Input)  
**Returns**: <code>AccessibleNode</code> - [Listbox](Listbox)  

<script src="./dist/bundle.js" /></script>
		