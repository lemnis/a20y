
<base href="//D:/Personal/autotility/docs/">
<link rel="stylesheet" href="./dist/style.css" />
<a name="Dialog"></a>

## Dialog ⇐ [<code>Window</code>](#Window)
**Kind**: global class  
**Summary**: A child window within a webpage  
**Extends**: [<code>Window</code>](#Window)  
<a name="new_Dialog_new"></a>

### new Dialog()
* Prompts the user to perform a specific action* If it is designed to interrup, it is usually a modal. See [alertdialog]()* It should have a label, it can be done with the `aria-label` attribute* It should have at least one focusable descendant element.* It should focus an element in the modal when displayed.* It should manage focus of modal dialogs (keep the focus inside the open modal).##### example<div role="dialog" aria-label="Window to confirm your acceptance of this world"> Hello world!	<button focus type="button">Ok</button></div>


<script src="./dist/bundle.js" /></script>
		