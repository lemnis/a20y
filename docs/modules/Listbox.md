
<base href="//D:/Personal/autotility/docs/">
<link rel="stylesheet" href="./dist/style.css" />
<a name="module_Listbox"></a>

## Listbox

* [Listbox](#module_Listbox)
    * [Listbox](#exp_module_Listbox--Listbox) ⇐ [<code>Select</code>](#Select) ⏏
        * [.size](#module_Listbox--Listbox+size) : <code>Integer</code>

<a name="exp_module_Listbox--Listbox"></a>

### Listbox ⇐ [<code>Select</code>](#Select) ⏏
### Keyboard Support#### Default| Key | Function || --- | -------- || Down Arrow | Moves focus to the next option <br/> If not multiselectable, it selects the focused option.| Up Arrow 	| Moves focus to the previous option  <br/> If not multiselectable, it selects the focused option.| Home 			|	Moves focus to the first option  <br/> If not multiselectable, it selects the focused option.| End  			|	Moves focus to the last option  <br/> If not multiselectable, it selects the focused option.#### Multiple selection| Key | Function || --- | -------- || Space					| Changes the selection state of the focused option. || Shift + Down Arrow 	| Moves focus to and selects the next option. || Shift + Up Arrow 	 	| Moves focus to and selects the previous option. || Control + Shift + Home |	Selects from the focused option to the beginning of the list. || Control + Shift + End  | Selects from the focused option to the end of the list. || Control + A 	        | Selects all options in the list. If all options are selected, unselects all options. |### Example#### Basic example<ul role="listbox" tabindex="0" aria-activedescendant="option_1" data-listbox-size="30">  <li id="option_1" role="option">Apple</li>  <li id="option_3" role="option">Asparagus</li>  <li id="option_5" role="option">Beets</li>  <li id="option_7" role="option">Broccoli</li>  <li id="option_9" role="option">Cabbage</li>  <li id="option_11" role="option">Cauliflower</li>  <li id="option_13" role="option">Chard</li>  <li id="option_15" role="option">Corn</li>  <li id="option_17" role="option">Daikon</li>  <li id="option_19" role="option">Edamame</li>	</ul>```html<ul role="listbox" tabindex="0" aria-activedescendant="option_1">  <li id="option_21" role="option">Elderberry</li>  ...</ul>```#### Multi selectable example<ul role="listbox" tabindex="0" aria-activedescendant="option_21" aria-multiselectable="true">  <li id="option_21" role="option">Elderberry</li>  <li id="option_23" role="option">Fig</li>  <li id="option_25" role="option">Grape</li>  <li id="option_27" role="option">Iceberg lettuce</li>  <li id="option_29" role="option">Kale</li>  <li id="option_31" role="option">Leek</li>  <li id="option_33" role="option">Mango</li>  <li id="option_35" role="option">Melon</li>  <li id="option_37" role="option">Nectarine</li>  <li id="option_39" role="option">Olive</li>  <li id="option_41" role="option">Orange</li>  <li id="option_43" role="option">Pea</li>  <li id="option_45" role="option">Pineapple</li>  <li id="option_47" role="option">Pumpkin</li>  <li id="option_49" role="option">Radish</li>  <li id="option_51" role="option">Shallot</li>  <li id="option_53" role="option">Squash</li>  <li id="option_55" role="option">Sweet potato</li>  <li id="option_57" role="option">Turnip</li>  <li id="option_59" role="option">Victoria plum</li>  <li id="option_61" role="option">Watermelon</li>  <li id="option_63" role="option">Zucchin</li>	</ul>```html<ul role="listbox" tabindex="0" aria-activedescendant="option_1" aria-multiselectable="true">  <li id="option_21" role="option">Elderberry</li>  ...<ul>```

**Kind**: Exported class  
**Summary**: A widget that allows the user to select one or more items from a list of choices.  
**Extends**: [<code>Select</code>](#Select)  
<a name="module_Listbox--Listbox+size"></a>

#### listbox.size : <code>Integer</code>
Returns / Sets the size of control.

**Kind**: instance property of [<code>Listbox</code>](#exp_module_Listbox--Listbox)  

<script src="./dist/bundle.js" /></script>
		