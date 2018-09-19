/** @module */

import { DeclareMixin } from '@vestergaard-company/js-mixin';

import elements from "./elements";
import tree from "./tree";

let attachedListeners = [];
let keyboardListeners = {};

/**
 * Catches DOM events and resends it trough the accessibility tree
 * @private
 * @param {Event} ev 
 */
function catchEvent(ev) {
	return dispatchToAccessibleTree(ev.target, ev, (ay, ev) => ay._listeners.get(ev.type));
}

/**
 * Catches DOM events and resends it trough the accessibility tree
 * @private
 * @param {Event} ev 
 */
function catchKeyEvent(ev) {	
	return dispatchToAccessibleTree(ev.target, ev, (ay, ev) => {
		return keyboardListeners[ev.code] ? keyboardListeners[ev.code].get(ay) : undefined;
	});
}

/**
 * Dispatch the given event to the whole tree
 * @private
 * @param {Element} target Targeted element
 * @param {Event} ev
 */
function dispatchToAccessibleTree(target, ev, getListeners) {
	let path = [];

	if (elements.has(target)/* && keyboardListeners[ev.code]*/) {
		// clone event
		let clonedEvent = {};
		for (let k in ev) clonedEvent[k] = ev[k];
		if (ev[Symbol.toStringTag]) clonedEvent[Symbol.toStringTag] = ev[Symbol.toStringTag];
		clonedEvent.preventDefault = () => { ev.preventDefault(); };

		// get a20y instance
		let targetA20y = elements.get(target);

		// check accessibility focus, update target if needed
		/** @todo only change target if event is only possible trough element focus */
		if (targetA20y.activeDescendant) targetA20y = targetA20y.activeDescendant;

		// generate path
		let parent = tree.getParent(targetA20y);
		while (parent._node.parentElement) {
			path.push(parent);
			parent = tree.getParent(parent);
		}

		// set default values
		clonedEvent.target = targetA20y;
		clonedEvent.path = path;

		// capture phase
		clonedEvent.eventPhase = ev.CAPTURING_PHASE;
		for (let i = path.length - 1; i >= 0; i--) {
			const ay = path[i];
			const listenersOfAy = getListeners(ay, ev);
			if (listenersOfAy) {
				listenersOfAy.forEach(({ listener, options }) => {
					if (options.capture) {
						clonedEvent.currentTarget = ay;
						console.log(clonedEvent, ay);
						listener(clonedEvent);
					}
				});
			}
		}

		// at target
		clonedEvent.eventPhase = ev.AT_TARGET;
		const listenersOfTarget = getListeners(targetA20y, ev);
		if (listenersOfTarget) {
			listenersOfTarget.forEach(({ listener }) => {
				clonedEvent.currentTarget = targetA20y;
				console.log(clonedEvent, targetA20y);
				listener(clonedEvent);
			})
		}

		// bubble phase
		clonedEvent.eventPhase = ev.BUBBLE_PHASE;
		if (ev.bubbles) {
			path.forEach(ay => {
				const listenersOfAy = getListeners(ay, ev);
				if (listenersOfAy) {
					listenersOfAy.forEach(({ listener }) => {
						clonedEvent.currentTarget = ay;
						console.log(clonedEvent, ay);
						listener(clonedEvent);
					});
				}
			});
		}
	}
}

/**
* @name EventTarget
* @alias module:EventTarget
* @mixin
*/
export default DeclareMixin((superclass) => class extends superclass {
	
	/**
	 * Listen for a event within the accessible tree.
	 * @param {String} type A case-sensitive string representing the event type to listen for.
	 * @param {Function} listener Receives a notification when an event of the specified type occurs.
	 * @param {Object} [options] An options object that specifies characteristics about the event listener.
	 * @param {Boolean} [options.capture = false]
	 * Indicates that events of this type will be dispatched to the registered listener before being
	 * dispatched to any EventTarget beneath it in the accessibility tree.
	 * @param {Boolean} [options.once = false]
	 * Indicates that the listener should be invoked at most once after being added.
	 * If true, the listener would be automatically removed when invoked.
	 * @param {Boolean} [options.passive = false]
	 * Indicates that the listener will never call preventDefault().
	 * If it does, the user agent should ignore it and generate a console warning.
	 * @param {String | Array} [options.key]
	 */
	addEventListener(type, listener, options = {}) {
		// custom event
		if(type === "key") {
			// if multiple keys given attach each of them separately
			if (Array.isArray(options.key)) {
				return options.key.forEach(key => {
					let clonedOption = Object.assign({}, options);
					clonedOption.key = key;
					this.addEventListener("key", listener, clonedOption)
				});
			}

			// make sure native keypresses are catched
			if (attachedListeners.indexOf(type) == -1) {
				window.addEventListener("keydown", catchKeyEvent, { capture: true });
				attachedListeners.push(type);
			}

			// prepare data structure if needed
			if (!keyboardListeners[options.key]) keyboardListeners[options.key] = new WeakMap();
			if (!keyboardListeners[options.key].has(this)) keyboardListeners[options.key].set(this, []);

			keyboardListeners[options.key].get(this).push({ listener, options });
		} else {
			// make sure native events are captures and rebroadcasted through the accessibility tree
			if (attachedListeners.indexOf(type) == -1) {
				window.addEventListener(type, catchEvent, { capture: true });
				attachedListeners.push(type);
			}

			super.addEventListener(type, listener, options);
		}
	}

	/**
	 * Removes previously registered event listeners who have the same
	 * combination of event type, the listener function and options
	 * @param {String} type
	 * @param {Function} listener
	 * @param {Object} [options]
	 * @param {Boolean} [options.capture]
	 * @param {String | Array} [options.key]
	 */
	removeEventListener(...args) {
		super.removeEventListener(...args);
	}

	/**
	 * Dispatches an Event through the accessiblity tree, invoking the
	 * event listeners in the appropriate order.
	 * @param {Event} event Event object to be dispatched
	 * @return {Boolean}
	 */
	dispatchEvent(event) {
		return dispatchToAccessibleTree(this._node, event, (ay, ev) => {
			return ay._listeners.get(ev.type);
		});
	}
});