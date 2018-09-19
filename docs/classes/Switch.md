
<base href="//D:/Personal/autotility/docs/">
<link rel="stylesheet" href="./dist/style.css" />
<a name="Switch"></a>

## Switch ⇐ [<code>Checkbox</code>](#Checkbox)
A type of checkbox that represents on/off values, as opposed to checked/unchecked values.

**Kind**: global class  
**Extends**: [<code>Checkbox</code>](#Checkbox)  

* [Switch](#Switch) ⇐ [<code>Checkbox</code>](#Checkbox)
    * [new Switch(...args)](#new_Switch_new)
    * [.form](#Input+form) ⇒ <code>AccessibleNode</code>
    * [.list](#Input+list) ⇒ <code>AccessibleNode</code>

<a name="new_Switch_new"></a>

### new Switch(...args)
#### Example

**Default**

<div role="switch" tabindex="0"></div>

```html
<div role="switch" tabindex="0"></div>
```

**With predefined value**

<div role="switch" aria-checked="true" tabindex="0"></div>

```html
<div role="switch" aria-checked="true" tabindex="0"></div>
```


| Param | Type |
| --- | --- |
| ...args | <code>\*</code> | 

<a name="Input+form"></a>

### switch.form ⇒ <code>AccessibleNode</code>
Returns a reference to the parent form element

**Kind**: instance property of [<code>Switch</code>](#Switch)  
**Returns**: <code>AccessibleNode</code> - [Form](#Form)  
<a name="Input+list"></a>

### switch.list ⇒ <code>AccessibleNode</code>
Returns the first element pointed by the [AccessibleNode#controls](AccessibleNode#controls) property.
The property may be null if no HTML element found in the same tree.

**Kind**: instance property of [<code>Switch</code>](#Switch)  
**Returns**: <code>AccessibleNode</code> - [Listbox](Listbox)  

<script src="./dist/bundle.js" /></script>
		