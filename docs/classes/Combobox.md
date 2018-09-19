
<base href="//D:/Personal/autotility/docs/">
<link rel="stylesheet" href="./dist/style.css" />
<a name="Combobox"></a>

## Combobox ⇐ [<code>Select</code>](#Select)
**Kind**: global class  
**Summary**: A composite widget containing a single-line textbox and another element, 
such as a listbox or grid, that can dynamically pop up to help the user set the value of the textbox.  
**Extends**: [<code>Select</code>](#Select)  
<a name="new_Combobox_new"></a>

### new Combobox()
A combobox is a widget made up of the combination of two distinct elements: 

1. a single-line textbox
2. an associated pop-up element for helping users set the value of the textbox. 

The popup may be a listbox, grid, tree, or dialog. Many implementations also include a third 
optional element -- a graphical button adjacent to the textbox, indicating the availability of
the popup. Activating the button displays the popup if suggestions are available.

### Example

<div role="combobox" aria-expanded="false" aria-owns="listbox" aria-haspopup="listbox">
  <input role="textbox" contenteditable aria-autocomplete="list" aria-controls="listbox"  aria-activedescendant="option_1"/>
</div>
<ul role="listbox" id="listbox">
  <li id="option_1" role="option">Apple</li>
  <li id="option_2" role="option">Banana</li>
</ul>


| Param | Type | Description |
| --- | --- | --- |
| [options.combobox.open] | <code>Element</code> | Optional button to open the pop-up element,  	defaults to first button element inside the element |


<script src="./dist/bundle.js" /></script>
		