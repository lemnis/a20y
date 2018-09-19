
<base href="//D:/Personal/autotility/docs/">
<link rel="stylesheet" href="./dist/style.css" />
<a name="Textbox"></a>

## Textbox ⇐ [<code>Input</code>](#Input)
### Examples

#### Basic example
  
<div role='textbox' contenteditable></div>

```html
<div role='textbox' contenteditable></div>
```

---

#### Multiline example

<div role='textbox' contenteditable aria-multiline="true"></div>

```html
<div role='textbox' contenteditable aria-multiline="true"></div>
```

**Kind**: global class  
**Summary**: A type of input that allows free-form text as its value.  
**Extends**: [<code>Input</code>](#Input)  
**Mixes**: [<code>Selection</code>](#Selection)  
**Todo**

- [ ] Add options to keep or remove pasted styling


* [Textbox](#Textbox) ⇐ [<code>Input</code>](#Input)
    * [new Textbox(...args)](#new_Textbox_new)
    * [.value](#Textbox+value) : <code>String</code>
    * [.minLength](#Textbox+minLength) : <code>Integer</code>
    * [.maxLength](#Textbox+maxLength) : <code>Integer</code>
    * [.size](#Textbox+size) : <code>Integer</code>
    * [.form](#Input+form) ⇒ <code>AccessibleNode</code>
    * [.list](#Input+list) ⇒ <code>AccessibleNode</code>

<a name="new_Textbox_new"></a>

### new Textbox(...args)

| Param | Type |
| --- | --- |
| ...args | <code>\*</code> | 

<a name="Textbox+value"></a>

### textbox.value : <code>String</code>
Returns / Sets the current value of the textbox.

**Kind**: instance property of [<code>Textbox</code>](#Textbox)  
<a name="Textbox+minLength"></a>

### textbox.minLength : <code>Integer</code>
Returns / Sets the minmum length of characters

**Kind**: instance property of [<code>Textbox</code>](#Textbox)  
<a name="Textbox+maxLength"></a>

### textbox.maxLength : <code>Integer</code>
Returns / Sets the maximum length of characters

**Kind**: instance property of [<code>Textbox</code>](#Textbox)  
<a name="Textbox+size"></a>

### textbox.size : <code>Integer</code>
Returns / Sets the size of control.

**Kind**: instance property of [<code>Textbox</code>](#Textbox)  
<a name="Input+form"></a>

### textbox.form ⇒ <code>AccessibleNode</code>
Returns a reference to the parent form element

**Kind**: instance property of [<code>Textbox</code>](#Textbox)  
**Returns**: <code>AccessibleNode</code> - [Form](#Form)  
<a name="Input+list"></a>

### textbox.list ⇒ <code>AccessibleNode</code>
Returns the first element pointed by the [AccessibleNode#controls](AccessibleNode#controls) property.
The property may be null if no HTML element found in the same tree.

**Kind**: instance property of [<code>Textbox</code>](#Textbox)  
**Returns**: <code>AccessibleNode</code> - [Listbox](Listbox)  

<script src="./dist/bundle.js" /></script>
		