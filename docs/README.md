
<base href="//lemnis.github.io/a20y/">
## Classes

<dl>
<dt><a href="./classes/Command.md">Command</a> ⇐ <code><a href="#Widget">Widget</a></code></dt>
    <dd>
            
    </dd>
    <dt><a href="./classes/Composite.md">Composite</a> ⇐ <code><a href="#Widget">Widget</a></code></dt>
    <dd>
            
    </dd>
    <dt><a href="./classes/Input.md">Input</a> ⇐ <code><a href="#Widget">Widget</a></code></dt>
    <dd>
            
    </dd>
    <dt><a href="./classes/Landmark.md">Landmark</a> ⇐ <code><a href="#Section">Section</a></code></dt>
    <dd>
            
    </dd>
    <dt><a href="./classes/Range.md">Range</a> ⇐ <code><a href="#Widget">Widget</a></code></dt>
    <dd>
            <p><strong>(Abstract role) SHOULD NOT USED IN THE DOM</strong> 
An input representing a range of values that can be set by the user.</p>

    </dd>
    <dt><a href="./classes/Roletype.md">Roletype</a> ⇐ <code><a href="#AccessibleNode">AccessibleNode</a></code></dt>
    <dd>
            
    </dd>
    <dt><a href="./classes/Section.md">Section</a> ⇐ <code><a href="#Structure">Structure</a></code></dt>
    <dd>
            
    </dd>
    <dt><a href="./classes/Sectionhead.md">Sectionhead</a> ⇐ <code><a href="#Structure">Structure</a></code></dt>
    <dd>
            
    </dd>
    <dt><a href="./classes/Select.md">Select</a> ⇐ <code><a href="#Roletype">Roletype</a></code></dt>
    <dd>
            <p>A form widget that allows the user to make selections from a set of choices.</p>

    </dd>
    <dt><a href="./classes/Structure.md">Structure</a> ⇐ <code><a href="#Roletype">Roletype</a></code></dt>
    <dd>
            
    </dd>
    <dt><a href="./classes/Widget.md">Widget</a> ⇐ <code><a href="#Roletype">Roletype</a></code></dt>
    <dd>
            
    </dd>
    <dt><a href="./classes/Window.md">Window</a> ⇐ <code><a href="#Roletype">Roletype</a></code></dt>
    <dd>
            
    </dd>
    <dt><a href="./classes/Alert.md">Alert</a></dt>
    <dd>
            <p>Show a brief, important message to attracts the user&#39;s attention without
                    interrupting the user&#39;s task.</p>

    </dd>
    <dt><a href="./classes/Alertdialog.md">Alertdialog</a> ⇐ <code><a href="#Dialog">Dialog</a></code></dt>
    <dd>
            <p>A dialog containing an alert message</p>

    </dd>
    <dt><a href="./classes/Base.md">Base</a></dt>
    <dd>
            <p>Adds some basic functionality that is greatly used inside the components</p>

    </dd>
    <dt><a href="./classes/Button.md">Button</a> ⇐ <code><a href="#Command">Command</a></code></dt>
    <dd>
            <p>An input that allows for user-triggered actions when clicked or pressed.</p>

    </dd>
    <dt><a href="./classes/Checkbox.md">Checkbox</a> ⇐ <code><a href="#Input">Input</a></code></dt>
    <dd>
            <p>A checkable input that has three possible values: true, false, or mixed.</p>

    </dd>
    <dt><a href="./classes/Combobox.md">Combobox</a> ⇐ <code><a href="#Select">Select</a></code></dt>
    <dd>
            <p>A composite widget containing a single-line textbox and another element, 
such as a listbox or grid, that can dynamically pop up to help the user set the value of the textbox.</p>

    </dd>
    <dt><a href="./classes/Dialog.md">Dialog</a> ⇐ <code><a href="#Window">Window</a></code></dt>
    <dd>
            <p>A child window within a webpage</p>

    </dd>
    <dt><a href="./classes/Link.md">Link</a> ⇐ <code><a href="#Command">Command</a></code></dt>
    <dd>
            <p>An interactive reference to an internal or external resource that,
when activated, causes the user agent to navigate to that resource.</p>

    </dd>
    <dt><a href="./classes/Listbox.md">Listbox</a> ⇐ <code><a href="#Roletype">Roletype</a></code></dt>
    <dd>
            <p>A widget that allows the user to select one or more items from a list of choices.</p>

    </dd>
    <dt><a href="./classes/Option.md">Option</a> ⇐ <code><a href="#Input">Input</a></code></dt>
    <dd>
            
    </dd>
    <dt><a href="./classes/Radio.md">Radio</a> ⇐ <code><a href="#Command">Command</a></code></dt>
    <dd>
            <p>A checkable input in a group of elements with the same role,
only one of which can be checked at a time.</p>

    </dd>
    <dt><a href="./classes/Scrollbar.md">Scrollbar</a> ⇐ <code><a href="#Range">Range</a></code></dt>
    <dd>
            
    </dd>
    <dt><a href="./classes/Searchbox.md">Searchbox</a> ⇐ <code><a href="#Textbox">Textbox</a></code></dt>
    <dd>
            
    </dd>
    <dt><a href="./classes/Slider.md">Slider</a> ⇐ <code><a href="#Range">Range</a></code></dt>
    <dd>
            <p>A user input where the user selects a value from within a given range.</p>

    </dd>
    <dt><a href="./classes/Spinbutton.md">Spinbutton</a> ⇐ <code><a href="#Range">Range</a></code></dt>
    <dd>
            <p>A input field with 2 button to increase or decrease the numberical value</p>

    </dd>
    <dt><a href="./classes/Switch.md">Switch</a> ⇐ <code><a href="#Checkbox">Checkbox</a></code></dt>
    <dd>
            <p>A type of checkbox that represents on/off values, as opposed to checked/unchecked values.</p>

    </dd>
    <dt><a href="./classes/Textbox.md">Textbox</a> ⇐ <code><a href="#Input">Input</a></code></dt>
    <dd>
            <p>A type of input that allows free-form text as its value.</p>

    </dd>
    <dt><a href="./classes/AccessibleNode.md">AccessibleNode</a> ⇐ <code><a href="#Base">Base</a></code></dt>
    <dd>
            <p>Based on the AOM spec</p>

    </dd>
    <dt><a href="./classes/ValidityState.md">ValidityState</a></dt>
    <dd>
            
    </dd>
    </dl>

## Mixins

<dl>
<dt><a href="./mixin/Form.md">Form</a></dt>
    <dd>
            
    </dd>
    <dt><a href="./mixin/Selection.md">Selection</a></dt>
    <dd>
            
    </dd>
    </dl>

## Members

<dl>
<dt><a href="#undefinedwillValidate">undefinedwillValidate</a> : <code>Boolean</code></dt>
    <dd>
            <p>Returns true if the element will be validated when the form is submitted; false otherwise.</p>

    </dd>
    <dt><a href="#allowedRoles">allowedRoles</a> : <code>Object</code></dt>
    <dd>
            <p>Stores info which is used in functions of rolePerHTMLTag,
mostly a key as tagName with an array of allowed roles for that tag</p>

    </dd>
    <dt><a href="#rolePerHTMLTag">rolePerHTMLTag</a> : <code>Object</code></dt>
    <dd>
            <p>Contains a function for each htmlTag where not all roles allowed</p>

    </dd>
    </dl>

## Constants

<dl>
<dt><a href="#roles">roles</a></dt>
    <dd>
            
    </dd>
    </dl>

## Functions

<dl>
<dt><a href="#AriaChecked">AriaChecked()</a></dt>
    <dd>
            <p>Adds functionality to <code>aria-checked</code> attribute.</p>
<p>Changes value when clicked or while focused pressing <code>Space</code>.</p>
<p><a href="https://www.w3.org/TR/wai-aria-1.1/#aria-checked">https://www.w3.org/TR/wai-aria-1.1/#aria-checked</a></p>

    </dd>
    <dt><a href="#AriaExpanded">AriaExpanded()</a></dt>
    <dd>
            <p>Adds functionality to <code>aria-expanded</code> attribute</p>

    </dd>
    <dt><a href="#AriaPressed">AriaPressed()</a></dt>
    <dd>
            <p>Adds functionality to <code>aria-pressed</code> attribute.</p>
<p>Changes value when clicked or while focused pressing <code>Space</code> or <code>Enter</code>.</p>
<p><a href="https://www.w3.org/TR/wai-aria-1.1/#aria-pressed">https://www.w3.org/TR/wai-aria-1.1/#aria-pressed</a></p>

    </dd>
    <dt><a href="#AriaSelected">AriaSelected()</a></dt>
    <dd>
            <p>gets and sets the <code>aria-selected</code> attribute.</p>
<p>Indicates if a element is selectable</p>

    </dd>
    <dt><a href="#AccessibleNodeList">AccessibleNodeList()</a></dt>
    <dd>
            
    </dd>
    <dt><a href="#toggle">toggle()</a> ⇒ <code>Boolean</code></dt>
    <dd>
            <p>Returns the opposite state of the attribute</p>

    </dd>
    <dt><a href="#toggle">toggle()</a> ⇒ <code>String</code></dt>
    <dd>
            <p>Returns the opposite state of the attribute</p>

    </dd>
    <dt><a href="#getChildren">getChildren()</a></dt>
    <dd>
            
    </dd>
    <dt><a href="#getParentWithTagName">getParentWithTagName(el, tagName)</a> ⇒ <code>HTMLElement</code></dt>
    <dd>
            <p>Finds nearest parent with a specifig tagName</p>

    </dd>
    <dt><a href="#hasAllowedRole">hasAllowedRole(tagName, role)</a> ⇒ <code>Boolean</code></dt>
    <dd>
            <p>Checks if given role is allowed for given tag</p>

    </dd>
    <dt><a href="#scrollIntoView">scrollIntoView(child)</a></dt>
    <dd>
            <p>Scrolls an element into its parent view</p>

    </dd>
    <dt><a href="#start">start(descendants)</a></dt>
    <dd>
            <p>Adds focus to the first element</p>

    </dd>
    <dt><a href="#prev">prev(descendants, child)</a></dt>
    <dd>
            <p>Adds focus to the prev element</p>

    </dd>
    <dt><a href="#next">next(descendants, child)</a></dt>
    <dd>
            <p>Adds focus to the next element</p>

    </dd>
    <dt><a href="#end">end(descendants)</a></dt>
    <dd>
            <p>Adds focus to the last element</p>

    </dd>
    <dt><a href="#getRole">getRole(key)</a> ⇒ <code>String</code></dt>
    <dd>
            <p>Returns an css selector for a given role</p>

    </dd>
    <dt><a href="#getSelectorArray">getSelectorArray(key)</a> ⇒ <code>Array</code></dt>
    <dd>
            <p>Returns an array with all css selectors, implicit and explicit, for a given role</p>

    </dd>
    <dt><a href="#get">get(key)</a> ⇒ <code>String</code></dt>
    <dd>
            <p>Returns an complete css selector with implict elements for a given role</p>

    </dd>
    </dl>

