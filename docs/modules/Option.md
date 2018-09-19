
<base href="//D:/Personal/autotility/docs/">
<link rel="stylesheet" href="./dist/style.css" />
<a name="module_Option"></a>

## Option

* [Option](#module_Option)
    * [Option](#exp_module_Option--Option) ⇐ [<code>Input</code>](#Input) ⏏
        * [.selected](#module_Option--Option+selected)
        * [.form](#Input+form) ⇒ <code>AccessibleNode</code>
        * [.list](#Input+list) ⇒ <code>AccessibleNode</code>
        * [.onClick(ev)](#module_Option--Option+onClick)

<a name="exp_module_Option--Option"></a>

### Option ⇐ [<code>Input</code>](#Input) ⏏
**Kind**: Exported class  
**Extends**: [<code>Input</code>](#Input)  
**See**: module:Listbox  
<a name="module_Option--Option+selected"></a>

#### option.selected
Updates the selected state

**Kind**: instance property of [<code>Option</code>](#exp_module_Option--Option)  
**Emits**: <code>Event:change</code>, <code>InputEvent:input</code>  
<a name="Input+form"></a>

#### option.form ⇒ <code>AccessibleNode</code>
Returns a reference to the parent form element

**Kind**: instance property of [<code>Option</code>](#exp_module_Option--Option)  
**Returns**: <code>AccessibleNode</code> - [Form](#Form)  
<a name="Input+list"></a>

#### option.list ⇒ <code>AccessibleNode</code>
Returns the first element pointed by the [AccessibleNode#controls](AccessibleNode#controls) property.
The property may be null if no HTML element found in the same tree.

**Kind**: instance property of [<code>Option</code>](#exp_module_Option--Option)  
**Returns**: <code>AccessibleNode</code> - [Listbox](Listbox)  
<a name="module_Option--Option+onClick"></a>

#### option.onClick(ev)
Updates the radio status trough an event

**Kind**: instance method of [<code>Option</code>](#exp_module_Option--Option)  
**Listens to Events**: <code>MouseEvent:click</code>, <code>MouseEvent:enger</code>, <code>Keyboard:space</code>
**Params**

- ev <code>Event</code>


<script src="./dist/bundle.js" /></script>
		