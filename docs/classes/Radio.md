
<base href="//D:/Personal/autotility/docs/">
<link rel="stylesheet" href="./dist/style.css" />
<a name="exp_module_Radio--Radio"></a>

## Radio ⏏
A checkable input in a group of elements with the same role,only one of which can be checked at a time.### Examples<div role="radio" aria-checked="false" tabindex="0">Apple</div>```html<div role="radio" aria-checked="false" tabindex="0">Apple</div>```

**Kind**: Exported class  
* [Radio](#exp_module_Radio--Radio) ⏏
    * [.checked](#module_Radio--Radio+checked)
    * [.onClick(ev)](#module_Radio--Radio+onClick)

<a name="module_Radio--Radio+checked"></a>

### radio.checked
Updates the checked status

**Kind**: instance property of [<code>Radio</code>](#exp_module_Radio--Radio)  
**Emits**: <code>Event:change</code>, <code>InputEvent:input</code>  
<a name="module_Radio--Radio+onClick"></a>

### radio.onClick(ev)
Updates the radio status trough an event

**Kind**: instance method of [<code>Radio</code>](#exp_module_Radio--Radio)  
**Listens to Events**: <code>MouseEvent:click</code>, <code>Keyboard:space</code>

| Param | Type |
| --- | --- |
| ev | <code>Event</code> | 


<script src="./dist/bundle.js" /></script>
		