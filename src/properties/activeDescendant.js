import { DeclareMixin } from '@vestergaard-company/js-mixin';

import owns from "./../utils/owns";
import elements from "./../utils/elements";
import focus from "./../utils/focus";

// application
// composite
    // spinbutton
    // tablist = horizontal
    // select
        // radiogroup, radio
        // combobox
        // tree = vertical, 
        // menu = vertical, menuitem
        // menubar = horizontal, menuitem
        // listbox = vertical, option
    // grid, cell
        // treegrid, cell
// textbox
    // searchbox
// group
    // row
    // toolbar = horizontal

export default DeclareMixin((superClass) => class activeDescendant extends superClass {

    constructor(...args) {
        super(...args);

        this.onMount();
    }

    onMount() {
        if(this.activeDescendant) {
            // this.addEventListener("focusin", this.onStartColumn);
        }

        switch(this.role) {
            case "tablist":
            case "toolbar":
            case "menubar":
                this.addEventListener("key", this.onPreviousColumn.bind(this), { key: "ArrowLeft" });
                this.addEventListener("key", this.onNextColumn.bind(this), { key: "ArrowRight" });
                break;
            case "tree":
            case "menu":
            case "listbox":
                this.addEventListener("key", this.onPreviousRow.bind(this), { key: "ArrowUp" });
                this.addEventListener("key", this.onNextRow.bind(this), { key: "ArrowDown" });
                break;
        }

        this.options = owns.getAllAllowedChildren(this);
    }

    onStartColumn() {}
    onPreviousColumn(ev) {
        // check if the element or an allowed child has focus
        if (this === ev.target || this.options.indexOf(elements.get(ev.target)) > -1) {
            focus.prev(this, focus.activeElement);
        }
    }
    onNextColumn(ev) {
        // check if the element or an allowed child has focus
        if (this === ev.target || this.options.indexOf(elements.get(ev.target)) > -1) {
            focus.next(this, focus.activeElement);
        }
    }
    onEndColumn() {}

    onStartRow() {}
    onPreviousRow(ev) {
        if(this.options.indexOf(elements.get(ev.target)) > -1){
            focus.prev(this, focus.activeElement);
        }
    }
    onNextRow(ev) {
        if (this.options.indexOf(elements.get(ev.target)) > -1) {
            focus.next(this, focus.activeElement);
        }
    }
    onEndRow() {}

    onFocusMove(){}

});