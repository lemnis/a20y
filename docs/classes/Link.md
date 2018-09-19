
<base href="//D:/Personal/autotility/docs/">
<link rel="stylesheet" href="./dist/style.css" />
<a name="Link"></a>

## Link ⇐ [<code>Command</code>](#Command)
An interactive reference to an internal or external resource that,
when activated, causes the user agent to navigate to that resource.

**Kind**: global class  
**Extends**: [<code>Command</code>](#Command)  
**Mixes**: [<code>AriaExpanded</code>](#AriaExpanded)  
**Listens to Events**: <code>event:click</code>

* [Link](#Link) ⇐ [<code>Command</code>](#Command)
    * [new Link()](#new_Link_new)
    * [.onexpanded(ev)](#Link+onexpanded)
    * [.onClick(ev)](#Link+onClick)
    * ["accessibleclick"](#Link+event_accessibleclick)

<a name="new_Link_new"></a>

### new Link()

| Param | Type | Description |
| --- | --- | --- |
| options.link.href | <code>String</code> | URL that should be used |

**Example**  
```js
<div role="link" data-link-href="http://www.example.com/" tabindex="0">
	Open website
</div>
```
<a name="Link+onexpanded"></a>

### link.onexpanded(ev)
Fired when state of expanded is changed

**Kind**: instance method of [<code>Link</code>](#Link)  

| Param | Type |
| --- | --- |
| ev | <code>Event</code> | 

<a name="Link+onClick"></a>

### link.onClick(ev)
Open the url that is defined in the options,  
fires an click event only if its origin wasn't an click event

**Kind**: instance method of [<code>Link</code>](#Link)  
**Emits**: <code>link#event:accessibleclick</code>, <code>event:click</code>  

| Param | Type |
| --- | --- |
| ev | <code>Event</code> | 

<a name="Link+event_accessibleclick"></a>

### "accessibleclick"
An click triggered by an keyboard or mouse

**Kind**: event emitted by [<code>Link</code>](#Link)  

<script src="./dist/bundle.js" /></script>
		