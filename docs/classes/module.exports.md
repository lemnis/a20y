
<base href="//D:/Personal/autotility/docs/">
<link rel="stylesheet" href="./dist/style.css" />
<a name="exp_module_Menu--module.exports"></a>

## module.exports ⏏
### Examples<ul id="menubar1" role="menubar">  <li role="none"><a role="menuitem">Hoi</a></li>  <li role="presentation">    <a role="menuitem" aria-haspopup="true" aria-expanded="false" href="#" tabindex="0">About</a>    <ul role="menu" aria-label="About">      <li><a role="menuitem" href="mb-about.html#overview" tabindex="-1">Overview</a></li>      <li role="none"><a role="menuitem" href="mb-about.html#admin" tabindex="-1">Administration</a></li>      <li role="none">        <a id="menubar113" role="menuitem" href="#" aria-haspopup="true" aria-expanded="false" tabindex="-1">Facts</a>        <ul role="menu" aria-label="Facts">          <li role="none"><a role="menuitem" href="mb-about.html#facts" tabindex="0">History</a></li>          <li role="none"><a role="menuitem" href="mb-about.html#facts" tabindex="-1">Current Statistics</a></li>          <li role="none"><a role="menuitem" href="mb-about.html#facts" tabindex="-1">Awards</a></li>        </ul>      </li>    </ul>  </li></ul>

**Kind**: Exported class  
**Listens to Events**: <code>KeyboardEvent:Escape</code>, <code>event:open</code>, <code>event:close</code>
<a name="exp_module_Menubar--module.exports"></a>

## module.exports ⇐ <code>Menu</code> ⏏
### Examples#### Default (with roving tabindex)<ul id="menubar1" role="menubar">  <li role="none"><a role="menuitem" tabindex="0">Apple</a></li>  <li role="none"><a role="menuitem" tabindex="-1">Banana</a></li>  <li role="none"><a role="menuitem" tabindex="-1">Pear</a></li></ul>#### With activedescendant<ul id="menubar1" role="menubar" tabindex="0" aria-activedescendant="item1">  <li id="item1" role="menuitem">Apple</a></li>  <li id="item2" role="menuitem">Banana</a></li>  <li id="item3" role="menuitem">Pear</a></li></ul>

**Kind**: Exported class  
**Extends**: <code>Menu</code>  
<a name="exp_module_Menuitem--module.exports"></a>

## module.exports ⏏
### Keyboard navigation| Key    |Action || ------ | ----- || Enter  | Opens the submenu| Space  | Opens the submenu| &darr; | Opens the submenu### Examples<div role="menuitem" tabindex="0">Apple</div>```<div role="menuitem" tabindex="0">Apple</div>```#### With popup<ul role="menu">  <li role="none">    <div tabindex="0" role="menuitem" aria-haspopup="true" aria-expanded="false" aria-controls="submenu">Apple</div>    <ul role="menu" id="submenu" aria-label="Fruits" aria-hidden="false">      <li role="none"><div tabindex="0" role="menuitem">Banana</div></li>    </ul>  </li></ul>```<ul role="menu">  <li role="none">    <div tabindex="0" role="menuitem" aria-haspopup="true" aria-expanded="false" aria-controls="submenu">Apple</div>    <ul role="menu" id="submenu" aria-label="Fruits" aria-hidden="false">      <li role="none"><div tabindex="0" role="menuitem">Banana</div></li>    </ul>  </li></ul>```

**Kind**: Exported class  
**Mixes**: <code>expanded</code>  
**Listens to Events**: <code>event:click</code>, <code>KeyboardEvent:Enter</code>, <code>KeyboardEvent:ArrowDown</code>, <code>KeyboardEvent:Space</code>, <code>event:open</code>, <code>event:close</code>

<script src="./dist/bundle.js" /></script>
		