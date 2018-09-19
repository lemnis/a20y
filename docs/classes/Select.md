
<base href="//D:/Personal/autotility/docs/">
<link rel="stylesheet" href="./dist/style.css" />
<a name="Select"></a>

## Select ⇐ <code>Roletype</code>
### Keyboard Support#### Default| Key | Function || --- | -------- || Down Arrow | Moves focus to the next option <br/> If not multiselectable, it selects the focused option.| Up Arrow   | Moves focus to the previous option  <br/> If not multiselectable, it selects the focused option.| Home       | Moves focus to the first option  <br/> If not multiselectable, it selects the focused option.| End        | Moves focus to the last option  <br/> If not multiselectable, it selects the focused option.#### Multiple selection| Key | Function || --- | -------- || Space	                | Changes the selection state of the focused option.| Shift + Down Arrow     | Moves focus to and selects the next option.| Shift + Up Arrow       | Moves focus to and selects the previous option.| Control + Shift + Home | Selects from the focused option to the beginning of the list.| Control + Shift + End  | Selects from the focused option to the end of the list.| Control + A            | Selects all options in the list. If all options are selected, unselects all options.### Attributes* `aria-selected`	* `true`		* is the current focussed element		* equals the value of `aria-activedescendant`* `tabindex`	* allows usage of the element by keys when in focus* `aria-activedescendant` equals ID of current focussed element#### Multiple selection* `aria-selected` * `true`		* can be applied to multiple element   * not automatically applied to the focused element	* `false`* `tabindex`	* allows usage of the element by keys when in focus

**Kind**: global class  
**Summary**: A form widget that allows the user to make selections from a set of choices.  
**Extends**: <code>Roletype</code>  

<script src="./dist/bundle.js" /></script>
		