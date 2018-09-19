
<base href="//D:/Personal/autotility/docs/">
<link rel="stylesheet" href="./dist/style.css" />
<a name="module_expanded"></a>

## expanded

* [expanded](#module_expanded)
    * _instance_
        * [.onOpen](#module_expanded+onOpen)
        * [.onClose](#module_expanded+onClose)
    * _inner_
        * [~expanded](#module_expanded..expanded)

<a name="module_expanded+onOpen"></a>

### expanded.onOpen
Updates the element expanded state to open and fires the open event to all elements who are connected trough `controls`

**Kind**: instance property of [<code>expanded</code>](#module_expanded)  
**Emits**: <code>[aria-controls]#event:open</code>  

| Param | Type |
| --- | --- |
| ev | <code>Event</code> | 

<a name="module_expanded+onClose"></a>

### expanded.onClose
Updates the element expanded state to close and fires the close event to all elements who are connected trough `controls`

**Kind**: instance property of [<code>expanded</code>](#module_expanded)  
**Emits**: <code>[aria-controls]#event:close</code>  

| Param | Type |
| --- | --- |
| ev | <code>Event</code> | 

<a name="module_expanded..expanded"></a>

### expanded~expanded
Adds functionality to the `expanded` attribute

**Kind**: inner mixin of [<code>expanded</code>](#module_expanded)  
**Todo**

- [ ] add a setting to define how the visibility should be toggled


<script src="./dist/bundle.js" /></script>
		