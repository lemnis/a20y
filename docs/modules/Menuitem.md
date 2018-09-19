
<base href="//D:/Personal/autotility/docs/">
<link rel="stylesheet" href="./dist/style.css" />
<a name="module_Menuitem"></a>

## Menuitem
<a name="exp_module_Menuitem--module.exports"></a>

### module.exports ⏏
### Keyboard navigation| Key    |Action || ------ | ----- || Enter  | Opens the submenu| Space  | Opens the submenu| &darr; | Opens the submenu### Examples<div role="menuitem" tabindex="0">Apple</div>```<div role="menuitem" tabindex="0">Apple</div>```#### With popup<ul role="menu">  <li role="none">    <div tabindex="0" role="menuitem" aria-haspopup="true" aria-expanded="false" aria-controls="submenu">Apple</div>    <ul role="menu" id="submenu" aria-label="Fruits" aria-hidden="false">      <li role="none"><div tabindex="0" role="menuitem">Banana</div></li>    </ul>  </li></ul>```<ul role="menu">  <li role="none">    <div tabindex="0" role="menuitem" aria-haspopup="true" aria-expanded="false" aria-controls="submenu">Apple</div>    <ul role="menu" id="submenu" aria-label="Fruits" aria-hidden="false">      <li role="none"><div tabindex="0" role="menuitem">Banana</div></li>    </ul>  </li></ul>```

**Kind**: Exported class  
**Mixes**: <code>expanded</code>  
**Listens to Events**: <code>event:click</code>, <code>KeyboardEvent:Enter</code>, <code>KeyboardEvent:ArrowDown</code>, <code>KeyboardEvent:Space</code>, <code>event:open</code>, <code>event:close</code>

<script src="./dist/bundle.js" /></script>
		