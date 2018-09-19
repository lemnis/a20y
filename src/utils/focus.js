/** @module Focus */

import elements from "./elements";

/**
 * Scrolls an element into its parent view
 * @param {Element} child Element to show
 */
function scrollIntoView(child) {
    let parent = child.offsetParent;

    // check if parent is an scrollable element
    if (parent && parent.scrollHeight > parent.clientHeight) {
        var scrollBottom = parent.clientHeight + parent.scrollTop;
        var elementBottom = child.offsetTop + child.offsetHeight;

        // scroll element to parents bottom
        if (elementBottom > scrollBottom) {
            parent.scrollTop = elementBottom - parent.clientHeight;

        // scroll element to parents top
        } else if (child.offsetTop < parent.scrollTop) {
            parent.scrollTop = child.offsetTop;
        }
    }
}

////////////////
// Move focus //
////////////////

/**
 * Focus is set to first in the list
 * @param {Roletype} controls 
 */
export function start(controls) {
    return focus(controls.options[0], false, controls);
}

export function prev(controls, ay) {
    var currentIndex = controls.options.indexOf(ay);

    // is already on first element
    if(currentIndex <= 0) return;

    if (isFocusable(ay)) {
        ay.tabIndex = -1;
    }

    return focus(controls.options[currentIndex - 1], false, controls);
}

export function next(controls, ay) {
    var currentIndex = controls.options.indexOf(ay);

    // is alrady on last element
    if (currentIndex >= controls.options.length -1) return;

    if(isFocusable(ay)) {
        ay.tabIndex = -1;
    }

    return focus(controls.options[currentIndex + 1], false, controls);
}

export function end(controls) {
    return focus(controls.options[controls.options - 1], false, controls);
}

//////////////////////////////////////////////////////////////
//                  End of move functions                   //
//////////////////////////////////////////////////////////////


/**
 * Returns true if the object has focus and doesn't has a set activeDescendant
 * or if the element that has focus has a set activeDescendant that points to given object
 * 
 * @param {Roletype} ay 
 */
export function hasFocus(ay) {
    // check if current object has native focus
    if (document.activeElement === ay._node && !ay.activeDescendant) return true;

    // check if current focus is set by active descendant
    if (elements.has(document.activeElement)) {
        return elements.get(document.activeElement).activeDescendant === ay;
    }

    return false;
}

/**
 * Check if an element can have focus
 * @param {Roletype} ay 
 */
export function isFocusable(ay) {
    return ay._node.tabIndex > -1 || ay._node.hasAttribute("tabindex");
}

/**
 * Moves the focus to the element.
 * 
 * Order of used methods to add focus:
 * 
 * 1. Check if element can have focus by itself
 * 2. If `controls` is defined, set focus through that object
 * 3. Check if current element can be defined through aria-activedescendant of current focused element
 * 4. Put focus through adding tabindex
 * 
 * @param {Roletype} ay 
 * @param {Boolean} [preventScroll=false]  prevent scrolling the element into view
 * @param {Roletype} [controls] Custom element that should control focus
 */
export function focus(ay, preventScroll = false, controls = null) {
    if (!preventScroll) scrollIntoView(ay._node);

    // native focus
    if (isFocusable(ay)) {
        // focus is already set, no need to continue
        if (document.activeElement == ay._node) return;
        
        ay.tabIndex = 0;
        ay._node.focus();
        return true;
    } else if (controls) {
        // focus control element if not already in focus
        if (!hasFocus(controls)) controls._node.focus();

        // remove focus class of previous option
        if (controls.activeDescendant) {
            controls.activeDescendant._node.classList.remove("ay-focus");
            controls.activeDescendant = ay;
            ay._node.classList.add("ay-focus");
        }

        return true;
    } else if (ay._node.id) {
        // focus is already set, no need to continue
        if (hasFocus(ay)) return;

        if (elements.has(document.activeElement)) {
            var managesFocus = elements.get(document.activeElement);

            // remove focus class of previous option
            if(managesFocus.activeDescendant) {
                managesFocus.activeDescendant._node.classList.remove("ay-focus");
                managesFocus.activeDescendant = ay;
                // add fake focus
                ay._node.classList.add("ay-focus");
            }

            return true;
        }
    }

    // ay.tabIndex = 0;
    // ay._node.focus();
}

/**
 * Removes the focus of the element.
 * @param {Roletype} ay 
 * @param {Roletype} [controls] Custom element that should control focus
 */
export function blur(ay, controls) {
    // Has native focus
    if (document.activeElement === ay._node) {
        ay._node.blur();

        // Can have custom focus
    } else if (ay._node.id) {
        var managesFocus = controls || elements.get(document.activeElement);
        if (managesFocus.activeDescendant === ay) {
            // remove reference to element
            managesFocus.activeDescendant = null;
            // remove fake focus
            ay._node.classList.remove("ay-focus");
        }
    }

    console.warn("Unable to remove focus from ", ay);
    return false;
}

/** @alias module:Focus */
export default {

    /** Returns a20y instance of currently focused element */
    get activeElement() {
        let ay = elements.get(document.activeElement);
        if (!ay) return;
        if (ay.activeDescendant) return ay.activeDescendant;

        return ay;
    },
    hasFocus, isFocusable, focus, blur,
    start, prev, next, end
}