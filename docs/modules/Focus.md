
<base href="//D:/Personal/autotility/docs/">
<link rel="stylesheet" href="./dist/style.css" />
<a name="module_Focus"></a>

## Focus

* [Focus](#module_Focus)
    * [module.exports](#exp_module_Focus--module.exports) ⏏
        * _static_
            * [.activeElement](#module_Focus--module.exports.activeElement)
            * [.start(controls)](#module_Focus--module.exports.start)
            * [.hasFocus(ay)](#module_Focus--module.exports.hasFocus)
            * [.isFocusable(ay)](#module_Focus--module.exports.isFocusable)
            * [.focus(ay, [preventScroll], [controls])](#module_Focus--module.exports.focus)
            * [.blur(ay, [controls])](#module_Focus--module.exports.blur)
        * _inner_
            * [~scrollIntoView(child)](#module_Focus--module.exports..scrollIntoView)

<a name="exp_module_Focus--module.exports"></a>

### module.exports ⏏
**Kind**: Exported member  
<a name="module_Focus--module.exports.activeElement"></a>

#### module.exports.activeElement
Returns a20y instance of currently focused element

**Kind**: static property of [<code>module.exports</code>](#exp_module_Focus--module.exports)  
<a name="module_Focus--module.exports.start"></a>

#### module.exports.start(controls)
Focus is set to first in the list

**Kind**: static method of [<code>module.exports</code>](#exp_module_Focus--module.exports)  
**Params**

- controls <code>Roletype</code>

<a name="module_Focus--module.exports.hasFocus"></a>

#### module.exports.hasFocus(ay)
Returns true if the object has focus and doesn't has a set activeDescendantor if the element that has focus has a set activeDescendant that points to given object

**Kind**: static method of [<code>module.exports</code>](#exp_module_Focus--module.exports)  
**Params**

- ay <code>Roletype</code>

<a name="module_Focus--module.exports.isFocusable"></a>

#### module.exports.isFocusable(ay)
Check if an element can have focus

**Kind**: static method of [<code>module.exports</code>](#exp_module_Focus--module.exports)  
**Params**

- ay <code>Roletype</code>

<a name="module_Focus--module.exports.focus"></a>

#### module.exports.focus(ay, [preventScroll], [controls])
Moves the focus to the element.Order of used methods to add focus:1. Check if element can have focus by itself2. If `controls` is defined, set focus through that object3. Check if current element can be defined through aria-activedescendant of current focused element4. Put focus through adding tabindex

**Kind**: static method of [<code>module.exports</code>](#exp_module_Focus--module.exports)  
**Params**

- ay <code>Roletype</code>
- [preventScroll] <code>Boolean</code> <code> = false</code> - prevent scrolling the element into view
- [controls] <code>Roletype</code> - Custom element that should control focus

<a name="module_Focus--module.exports.blur"></a>

#### module.exports.blur(ay, [controls])
Removes the focus of the element.

**Kind**: static method of [<code>module.exports</code>](#exp_module_Focus--module.exports)  
**Params**

- ay <code>Roletype</code>
- [controls] <code>Roletype</code> - Custom element that should control focus

<a name="module_Focus--module.exports..scrollIntoView"></a>

#### module.exports~scrollIntoView(child)
Scrolls an element into its parent view

**Kind**: inner method of [<code>module.exports</code>](#exp_module_Focus--module.exports)  
**Params**

- child <code>Element</code> - Element to show


<script src="./dist/bundle.js" /></script>
		