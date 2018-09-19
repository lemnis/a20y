
<base href="//D:/Personal/autotility/docs/">
<link rel="stylesheet" href="./dist/style.css" />
<a name="Checkbox"></a>

## Checkbox ⇐ [<code>Input</code>](#Input)
**Kind**: global class  
**Summary**: A checkable input that has three possible values: true, false, or mixed.  
**Extends**: [<code>Input</code>](#Input)  
**Mixes**: [<code>AriaChecked</code>](#AriaChecked)  

* [Checkbox](#Checkbox) ⇐ [<code>Input</code>](#Input)
    * [new Checkbox(...args)](#new_Checkbox_new)
    * [.form](#Input+form) ⇒ <code>AccessibleNode</code>
    * [.list](#Input+list) ⇒ <code>AccessibleNode</code>

<a name="new_Checkbox_new"></a>

### new Checkbox(...args)
#### Example

<div role="checkbox" aria-checked="true" tabindex="0"></div>

```html
<div role="checkbox" aria-checked="true" tabindex="0"></div>
```


| Param | Type |
| --- | --- |
| ...args | <code>\*</code> | 

<a name="Input+form"></a>

### checkbox.form ⇒ <code>AccessibleNode</code>
Returns a reference to the parent form element

**Kind**: instance property of [<code>Checkbox</code>](#Checkbox)  
**Returns**: <code>AccessibleNode</code> - [Form](#Form)  
<a name="Input+list"></a>

### checkbox.list ⇒ <code>AccessibleNode</code>
Returns the first element pointed by the [AccessibleNode#controls](AccessibleNode#controls) property.
The property may be null if no HTML element found in the same tree.

**Kind**: instance property of [<code>Checkbox</code>](#Checkbox)  
**Returns**: <code>AccessibleNode</code> - [Listbox](Listbox)  

<script src="./dist/bundle.js" /></script>
		