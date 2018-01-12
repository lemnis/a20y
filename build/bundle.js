(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrap = exports.Cached = exports.HasInstance = exports.BareMixin = exports.DeclareMixin = undefined;

var _mix = require('./src/mix');

var _mix2 = _interopRequireDefault(_mix);

var _declare = require('./src/declare');

var _declare2 = _interopRequireDefault(_declare);

var _BareMixin = require('./src/Decorators/BareMixin');

var _BareMixin2 = _interopRequireDefault(_BareMixin);

var _HasInstance = require('./src/Decorators/HasInstance');

var _HasInstance2 = _interopRequireDefault(_HasInstance);

var _Cached = require('./src/Decorators/Cached');

var _Cached2 = _interopRequireDefault(_Cached);

var _wrap = require('./src/Utils/wrap');

var _wrap2 = _interopRequireDefault(_wrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _mix2.default;

// Declare mixin classes

// Default export - Mix wrapper

exports.DeclareMixin = _declare2.default;

// Decorators

exports.BareMixin = _BareMixin2.default;
exports.HasInstance = _HasInstance2.default;
exports.Cached = _Cached2.default;

// Utils

exports.wrap = _wrap2.default;

},{"./src/Decorators/BareMixin":3,"./src/Decorators/Cached":4,"./src/Decorators/HasInstance":5,"./src/Utils/wrap":6,"./src/declare":7,"./src/mix":8}],2:[function(require,module,exports){
'use strict';

/**
 * Mixin Builder
 *
 * Allows you to extend a class with one or more mixin classes.
 *
 * This builder is heavily inspired by Justin Fagnani's Mixwith.js
 *
 * @see http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/
 * @see https://github.com/justinfagnani/mixwith.js
 *
 * @author Alin Eugen Deac <ade@vestergaardcompany.com>
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Builder = function () {

    /**
     * Create a new Builder instance
     *
     * @param {Function} [superClass=class {}]
     */
    function Builder(superClass) {
        _classCallCheck(this, Builder);

        this.superClass = superClass || function () {
            function _class() {
                _classCallCheck(this, _class);
            }

            return _class;
        }();
    }

    /**
     * Mixin one or more mixin-classes
     *
     * @param {Array.<Function>} mixins
     *
     * @return {Function} A supclass with mixins applied
     */


    _createClass(Builder, [{
        key: 'with',
        value: function _with() {
            for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
                mixins[_key] = arguments[_key];
            }

            return mixins.reduce(function (c, m) {

                if (typeof m !== 'function') {
                    return c;
                }

                return m(c);
            }, this.superClass);
        }
    }]);

    return Builder;
}();

exports.default = Builder;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MIXIN_REFERENCE = undefined;

var _wrap = require('./../Utils/wrap');

var _wrap2 = _interopRequireDefault(_wrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Reference to a mixin
 *
 * @type {Symbol}
 */
var MIXIN_REFERENCE = exports.MIXIN_REFERENCE = Symbol('mixinRef');

/**
 * Decorator that stores a reference to the mixin class, which
 * ultimately can be used for "instance of" checks.
 *
 * @see wrap
 *
 * @param {Function} mixinClass
 *
 * @return {Function} Decorated mixin
 */
var BareMixin = function BareMixin(mixinClass) {
  return (0, _wrap2.default)(mixinClass, function (superclass) {
    // Apply the mixin class
    var app = mixinClass(superclass);

    // Add reference to the wrapped mixin class, so that we can enable
    // a "instance of" support.
    app.prototype[MIXIN_REFERENCE] = mixinClass[_wrap.ORIGINAL_MIXIN];

    return app;
  });
};

exports.default = BareMixin;

},{"./../Utils/wrap":6}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CACHED_REFERENCE = undefined;

var _wrap = require('./../Utils/wrap');

var _wrap2 = _interopRequireDefault(_wrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Cached mixin class reference
 *
 * @type {Symbol}
 */
var CACHED_REFERENCE = exports.CACHED_REFERENCE = Symbol('cachedRef');

/**
 * Decorate the given mixin class with a "cached decorator".
 *
 * Method will ensure that if the given mixin has already been applied,
 * then it will be returned / applied a single time, rather than multiple
 * times.
 *
 * @param {Function} mixinClass
 *
 * @return {Function}
 */
var Cached = function Cached(mixinClass) {
    return (0, _wrap2.default)(mixinClass, function (superclass) {
        // Obtain cached reference...
        var cachedReference = mixinClass[CACHED_REFERENCE];

        // If there is no cached reference, then we create one onto
        // the given mixin class
        if (!cachedReference) {

            // Create a new symbol in the mixin class, using the function's name
            // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
            cachedReference = mixinClass[CACHED_REFERENCE] = Symbol(mixinClass.name);
        }

        // Check if given superclass already has a reference to the given mixin class
        // If so, then return it.
        if (superclass.hasOwnProperty(cachedReference)) {
            return superclass[cachedReference];
        }

        // Decorate the given super class
        var decorated = mixinClass(superclass);

        // Cache the reference into the superclass
        superclass[cachedReference] = decorated;

        // Finally, return the decorated mixin.
        return decorated;
    });
};

exports.default = Cached;

},{"./../Utils/wrap":6}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _wrap = require('./../Utils/wrap');

var _BareMixin = require('./BareMixin');

/**
 * Decorates the given mixin class to support "instance of" operation.
 *
 * The given mixin class MUST be decorated with the "BareMixin" for this
 * to work.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/hasInstance
 * @see BareMixin
 *
 * @param {Function} mixinClass
 * @return {Function} Decorated mixin class
 */
var HasInstance = function HasInstance(mixinClass) {

    // If given mixin class already has a custom "has instance"
    // symbol, then abort - just return the mixin, since there
    // is no need to add custom behaviour to it.
    if (mixinClass.hasOwnProperty(Symbol.hasInstance)) {
        return mixinClass;
    }

    // Otherwise, we add a custom Symbol.hasInstance method for
    // the mixin class.
    Object.defineProperty(mixinClass, Symbol.hasInstance, {

        value: function value(instance) {
            // Fetch the original mixin class
            var originalMixinClass = this[_wrap.ORIGINAL_MIXIN];

            // If there is no original mixin class, then we simply
            // abort - it cannot be an instance of the given...
            if (!originalMixinClass) {
                return false;
            }

            // Loop through the given instance's prototype chain
            while (instance !== null) {

                // If a reference has been stated on the mixin class and it
                // matches the original mixin, we assume that
                if (instance.hasOwnProperty(_BareMixin.MIXIN_REFERENCE) && instance[_BareMixin.MIXIN_REFERENCE] === originalMixinClass) {
                    return true;
                }

                // Fetch the next prototype
                instance = Object.getPrototypeOf(instance);
            }

            // If nothing was matched, then we assume that the instances
            // simply do not match.
            return false;
        }

    });

    // Finally, return the decorated mixin class
    return mixinClass;
};

exports.default = HasInstance;

},{"./../Utils/wrap":6,"./BareMixin":3}],6:[function(require,module,exports){
'use strict';

/**
 * Reference to an original mixin
 *
 * @type {Symbol}
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ORIGINAL_MIXIN = exports.ORIGINAL_MIXIN = Symbol('originalMixin');

/**
 * Sets the prototype of the wrapper to be the given mixin class
 * and stores a reference to the original mixin.
 *
 * @param {Function} mixinClass
 * @param {Function} wrapper
 *
 * @return {Function} Wrapper
 */
var wrap = function wrap(mixinClass, wrapper) {
  Object.setPrototypeOf(wrapper, mixinClass);

  if (!mixinClass[ORIGINAL_MIXIN]) {
    mixinClass[ORIGINAL_MIXIN] = mixinClass;
  }

  return wrapper;
};

exports.default = wrap;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BareMixin = require('./Decorators/BareMixin');

var _BareMixin2 = _interopRequireDefault(_BareMixin);

var _HasInstance = require('./Decorators/HasInstance');

var _HasInstance2 = _interopRequireDefault(_HasInstance);

var _Cached = require('./Decorators/Cached');

var _Cached2 = _interopRequireDefault(_Cached);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Declare a mixin - decorates the given mixin class with
 * a "cached, has instance and bare mixin" decorators.
 *
 * @see BareMixin
 * @see HasInstance
 * @see Cached
 *
 * @param {Function} mixinClass
 *
 * @return {Function}
 */
var DeclareMixin = function DeclareMixin(mixinClass) {
    return (0, _Cached2.default)((0, _HasInstance2.default)((0, _BareMixin2.default)(mixinClass)));
};

exports.default = DeclareMixin;

},{"./Decorators/BareMixin":3,"./Decorators/Cached":4,"./Decorators/HasInstance":5}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Builder = require('./Builder');

var _Builder2 = _interopRequireDefault(_Builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Mixin Builder wrapper
 *
 * Allows you to extend a class with one or more mixin-classes.
 *
 * @see Builder
 *
 * @param {function} [superClass=class {}]
 */
var mix = function mix(superClass) {
  return new _Builder2.default(superClass);
};

exports.default = mix;

},{"./Builder":2}],9:[function(require,module,exports){
/*global define:false */
/**
 * Copyright 2012-2017 Craig Campbell
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Mousetrap is a simple keyboard shortcut library for Javascript with
 * no external dependencies
 *
 * @version 1.6.1
 * @url craig.is/killing/mice
 */
(function(window, document, undefined) {

    // Check if mousetrap is used inside browser, if not, return
    if (!window) {
        return;
    }

    /**
     * mapping of special keycodes to their corresponding keys
     *
     * everything in this dictionary cannot use keypress events
     * so it has to be here to map to the correct keycodes for
     * keyup/keydown events
     *
     * @type {Object}
     */
    var _MAP = {
        8: 'backspace',
        9: 'tab',
        13: 'enter',
        16: 'shift',
        17: 'ctrl',
        18: 'alt',
        20: 'capslock',
        27: 'esc',
        32: 'space',
        33: 'pageup',
        34: 'pagedown',
        35: 'end',
        36: 'home',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        45: 'ins',
        46: 'del',
        91: 'meta',
        93: 'meta',
        224: 'meta'
    };

    /**
     * mapping for special characters so they can support
     *
     * this dictionary is only used incase you want to bind a
     * keyup or keydown event to one of these keys
     *
     * @type {Object}
     */
    var _KEYCODE_MAP = {
        106: '*',
        107: '+',
        109: '-',
        110: '.',
        111 : '/',
        186: ';',
        187: '=',
        188: ',',
        189: '-',
        190: '.',
        191: '/',
        192: '`',
        219: '[',
        220: '\\',
        221: ']',
        222: '\''
    };

    /**
     * this is a mapping of keys that require shift on a US keypad
     * back to the non shift equivelents
     *
     * this is so you can use keyup events with these keys
     *
     * note that this will only work reliably on US keyboards
     *
     * @type {Object}
     */
    var _SHIFT_MAP = {
        '~': '`',
        '!': '1',
        '@': '2',
        '#': '3',
        '$': '4',
        '%': '5',
        '^': '6',
        '&': '7',
        '*': '8',
        '(': '9',
        ')': '0',
        '_': '-',
        '+': '=',
        ':': ';',
        '\"': '\'',
        '<': ',',
        '>': '.',
        '?': '/',
        '|': '\\'
    };

    /**
     * this is a list of special strings you can use to map
     * to modifier keys when you specify your keyboard shortcuts
     *
     * @type {Object}
     */
    var _SPECIAL_ALIASES = {
        'option': 'alt',
        'command': 'meta',
        'return': 'enter',
        'escape': 'esc',
        'plus': '+',
        'mod': /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'meta' : 'ctrl'
    };

    /**
     * variable to store the flipped version of _MAP from above
     * needed to check if we should use keypress or not when no action
     * is specified
     *
     * @type {Object|undefined}
     */
    var _REVERSE_MAP;

    /**
     * loop through the f keys, f1 to f19 and add them to the map
     * programatically
     */
    for (var i = 1; i < 20; ++i) {
        _MAP[111 + i] = 'f' + i;
    }

    /**
     * loop through to map numbers on the numeric keypad
     */
    for (i = 0; i <= 9; ++i) {

        // This needs to use a string cause otherwise since 0 is falsey
        // mousetrap will never fire for numpad 0 pressed as part of a keydown
        // event.
        //
        // @see https://github.com/ccampbell/mousetrap/pull/258
        _MAP[i + 96] = i.toString();
    }

    /**
     * cross browser add event method
     *
     * @param {Element|HTMLDocument} object
     * @param {string} type
     * @param {Function} callback
     * @returns void
     */
    function _addEvent(object, type, callback) {
        if (object.addEventListener) {
            object.addEventListener(type, callback, false);
            return;
        }

        object.attachEvent('on' + type, callback);
    }

    /**
     * takes the event and returns the key character
     *
     * @param {Event} e
     * @return {string}
     */
    function _characterFromEvent(e) {

        // for keypress events we should return the character as is
        if (e.type == 'keypress') {
            var character = String.fromCharCode(e.which);

            // if the shift key is not pressed then it is safe to assume
            // that we want the character to be lowercase.  this means if
            // you accidentally have caps lock on then your key bindings
            // will continue to work
            //
            // the only side effect that might not be desired is if you
            // bind something like 'A' cause you want to trigger an
            // event when capital A is pressed caps lock will no longer
            // trigger the event.  shift+a will though.
            if (!e.shiftKey) {
                character = character.toLowerCase();
            }

            return character;
        }

        // for non keypress events the special maps are needed
        if (_MAP[e.which]) {
            return _MAP[e.which];
        }

        if (_KEYCODE_MAP[e.which]) {
            return _KEYCODE_MAP[e.which];
        }

        // if it is not in the special map

        // with keydown and keyup events the character seems to always
        // come in as an uppercase character whether you are pressing shift
        // or not.  we should make sure it is always lowercase for comparisons
        return String.fromCharCode(e.which).toLowerCase();
    }

    /**
     * checks if two arrays are equal
     *
     * @param {Array} modifiers1
     * @param {Array} modifiers2
     * @returns {boolean}
     */
    function _modifiersMatch(modifiers1, modifiers2) {
        return modifiers1.sort().join(',') === modifiers2.sort().join(',');
    }

    /**
     * takes a key event and figures out what the modifiers are
     *
     * @param {Event} e
     * @returns {Array}
     */
    function _eventModifiers(e) {
        var modifiers = [];

        if (e.shiftKey) {
            modifiers.push('shift');
        }

        if (e.altKey) {
            modifiers.push('alt');
        }

        if (e.ctrlKey) {
            modifiers.push('ctrl');
        }

        if (e.metaKey) {
            modifiers.push('meta');
        }

        return modifiers;
    }

    /**
     * prevents default for this event
     *
     * @param {Event} e
     * @returns void
     */
    function _preventDefault(e) {
        if (e.preventDefault) {
            e.preventDefault();
            return;
        }

        e.returnValue = false;
    }

    /**
     * stops propogation for this event
     *
     * @param {Event} e
     * @returns void
     */
    function _stopPropagation(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
            return;
        }

        e.cancelBubble = true;
    }

    /**
     * determines if the keycode specified is a modifier key or not
     *
     * @param {string} key
     * @returns {boolean}
     */
    function _isModifier(key) {
        return key == 'shift' || key == 'ctrl' || key == 'alt' || key == 'meta';
    }

    /**
     * reverses the map lookup so that we can look for specific keys
     * to see what can and can't use keypress
     *
     * @return {Object}
     */
    function _getReverseMap() {
        if (!_REVERSE_MAP) {
            _REVERSE_MAP = {};
            for (var key in _MAP) {

                // pull out the numeric keypad from here cause keypress should
                // be able to detect the keys from the character
                if (key > 95 && key < 112) {
                    continue;
                }

                if (_MAP.hasOwnProperty(key)) {
                    _REVERSE_MAP[_MAP[key]] = key;
                }
            }
        }
        return _REVERSE_MAP;
    }

    /**
     * picks the best action based on the key combination
     *
     * @param {string} key - character for key
     * @param {Array} modifiers
     * @param {string=} action passed in
     */
    function _pickBestAction(key, modifiers, action) {

        // if no action was picked in we should try to pick the one
        // that we think would work best for this key
        if (!action) {
            action = _getReverseMap()[key] ? 'keydown' : 'keypress';
        }

        // modifier keys don't work as expected with keypress,
        // switch to keydown
        if (action == 'keypress' && modifiers.length) {
            action = 'keydown';
        }

        return action;
    }

    /**
     * Converts from a string key combination to an array
     *
     * @param  {string} combination like "command+shift+l"
     * @return {Array}
     */
    function _keysFromString(combination) {
        if (combination === '+') {
            return ['+'];
        }

        combination = combination.replace(/\+{2}/g, '+plus');
        return combination.split('+');
    }

    /**
     * Gets info for a specific key combination
     *
     * @param  {string} combination key combination ("command+s" or "a" or "*")
     * @param  {string=} action
     * @returns {Object}
     */
    function _getKeyInfo(combination, action) {
        var keys;
        var key;
        var i;
        var modifiers = [];

        // take the keys from this pattern and figure out what the actual
        // pattern is all about
        keys = _keysFromString(combination);

        for (i = 0; i < keys.length; ++i) {
            key = keys[i];

            // normalize key names
            if (_SPECIAL_ALIASES[key]) {
                key = _SPECIAL_ALIASES[key];
            }

            // if this is not a keypress event then we should
            // be smart about using shift keys
            // this will only work for US keyboards however
            if (action && action != 'keypress' && _SHIFT_MAP[key]) {
                key = _SHIFT_MAP[key];
                modifiers.push('shift');
            }

            // if this key is a modifier then add it to the list of modifiers
            if (_isModifier(key)) {
                modifiers.push(key);
            }
        }

        // depending on what the key combination is
        // we will try to pick the best event for it
        action = _pickBestAction(key, modifiers, action);

        return {
            key: key,
            modifiers: modifiers,
            action: action
        };
    }

    function _belongsTo(element, ancestor) {
        if (element === null || element === document) {
            return false;
        }

        if (element === ancestor) {
            return true;
        }

        return _belongsTo(element.parentNode, ancestor);
    }

    function Mousetrap(targetElement) {
        var self = this;

        targetElement = targetElement || document;

        if (!(self instanceof Mousetrap)) {
            return new Mousetrap(targetElement);
        }

        /**
         * element to attach key events to
         *
         * @type {Element}
         */
        self.target = targetElement;

        /**
         * a list of all the callbacks setup via Mousetrap.bind()
         *
         * @type {Object}
         */
        self._callbacks = {};

        /**
         * direct map of string combinations to callbacks used for trigger()
         *
         * @type {Object}
         */
        self._directMap = {};

        /**
         * keeps track of what level each sequence is at since multiple
         * sequences can start out with the same sequence
         *
         * @type {Object}
         */
        var _sequenceLevels = {};

        /**
         * variable to store the setTimeout call
         *
         * @type {null|number}
         */
        var _resetTimer;

        /**
         * temporary state where we will ignore the next keyup
         *
         * @type {boolean|string}
         */
        var _ignoreNextKeyup = false;

        /**
         * temporary state where we will ignore the next keypress
         *
         * @type {boolean}
         */
        var _ignoreNextKeypress = false;

        /**
         * are we currently inside of a sequence?
         * type of action ("keyup" or "keydown" or "keypress") or false
         *
         * @type {boolean|string}
         */
        var _nextExpectedAction = false;

        /**
         * resets all sequence counters except for the ones passed in
         *
         * @param {Object} doNotReset
         * @returns void
         */
        function _resetSequences(doNotReset) {
            doNotReset = doNotReset || {};

            var activeSequences = false,
                key;

            for (key in _sequenceLevels) {
                if (doNotReset[key]) {
                    activeSequences = true;
                    continue;
                }
                _sequenceLevels[key] = 0;
            }

            if (!activeSequences) {
                _nextExpectedAction = false;
            }
        }

        /**
         * finds all callbacks that match based on the keycode, modifiers,
         * and action
         *
         * @param {string} character
         * @param {Array} modifiers
         * @param {Event|Object} e
         * @param {string=} sequenceName - name of the sequence we are looking for
         * @param {string=} combination
         * @param {number=} level
         * @returns {Array}
         */
        function _getMatches(character, modifiers, e, sequenceName, combination, level) {
            var i;
            var callback;
            var matches = [];
            var action = e.type;

            // if there are no events related to this keycode
            if (!self._callbacks[character]) {
                return [];
            }

            // if a modifier key is coming up on its own we should allow it
            if (action == 'keyup' && _isModifier(character)) {
                modifiers = [character];
            }

            // loop through all callbacks for the key that was pressed
            // and see if any of them match
            for (i = 0; i < self._callbacks[character].length; ++i) {
                callback = self._callbacks[character][i];

                // if a sequence name is not specified, but this is a sequence at
                // the wrong level then move onto the next match
                if (!sequenceName && callback.seq && _sequenceLevels[callback.seq] != callback.level) {
                    continue;
                }

                // if the action we are looking for doesn't match the action we got
                // then we should keep going
                if (action != callback.action) {
                    continue;
                }

                // if this is a keypress event and the meta key and control key
                // are not pressed that means that we need to only look at the
                // character, otherwise check the modifiers as well
                //
                // chrome will not fire a keypress if meta or control is down
                // safari will fire a keypress if meta or meta+shift is down
                // firefox will fire a keypress if meta or control is down
                if ((action == 'keypress' && !e.metaKey && !e.ctrlKey) || _modifiersMatch(modifiers, callback.modifiers)) {

                    // when you bind a combination or sequence a second time it
                    // should overwrite the first one.  if a sequenceName or
                    // combination is specified in this call it does just that
                    //
                    // @todo make deleting its own method?
                    var deleteCombo = !sequenceName && callback.combo == combination;
                    var deleteSequence = sequenceName && callback.seq == sequenceName && callback.level == level;
                    if (deleteCombo || deleteSequence) {
                        self._callbacks[character].splice(i, 1);
                    }

                    matches.push(callback);
                }
            }

            return matches;
        }

        /**
         * actually calls the callback function
         *
         * if your callback function returns false this will use the jquery
         * convention - prevent default and stop propogation on the event
         *
         * @param {Function} callback
         * @param {Event} e
         * @returns void
         */
        function _fireCallback(callback, e, combo, sequence) {

            // if this event should not happen stop here
            if (self.stopCallback(e, e.target || e.srcElement, combo, sequence)) {
                return;
            }

            if (callback(e, combo) === false) {
                _preventDefault(e);
                _stopPropagation(e);
            }
        }

        /**
         * handles a character key event
         *
         * @param {string} character
         * @param {Array} modifiers
         * @param {Event} e
         * @returns void
         */
        self._handleKey = function(character, modifiers, e) {
            var callbacks = _getMatches(character, modifiers, e);
            var i;
            var doNotReset = {};
            var maxLevel = 0;
            var processedSequenceCallback = false;

            // Calculate the maxLevel for sequences so we can only execute the longest callback sequence
            for (i = 0; i < callbacks.length; ++i) {
                if (callbacks[i].seq) {
                    maxLevel = Math.max(maxLevel, callbacks[i].level);
                }
            }

            // loop through matching callbacks for this key event
            for (i = 0; i < callbacks.length; ++i) {

                // fire for all sequence callbacks
                // this is because if for example you have multiple sequences
                // bound such as "g i" and "g t" they both need to fire the
                // callback for matching g cause otherwise you can only ever
                // match the first one
                if (callbacks[i].seq) {

                    // only fire callbacks for the maxLevel to prevent
                    // subsequences from also firing
                    //
                    // for example 'a option b' should not cause 'option b' to fire
                    // even though 'option b' is part of the other sequence
                    //
                    // any sequences that do not match here will be discarded
                    // below by the _resetSequences call
                    if (callbacks[i].level != maxLevel) {
                        continue;
                    }

                    processedSequenceCallback = true;

                    // keep a list of which sequences were matches for later
                    doNotReset[callbacks[i].seq] = 1;
                    _fireCallback(callbacks[i].callback, e, callbacks[i].combo, callbacks[i].seq);
                    continue;
                }

                // if there were no sequence matches but we are still here
                // that means this is a regular match so we should fire that
                if (!processedSequenceCallback) {
                    _fireCallback(callbacks[i].callback, e, callbacks[i].combo);
                }
            }

            // if the key you pressed matches the type of sequence without
            // being a modifier (ie "keyup" or "keypress") then we should
            // reset all sequences that were not matched by this event
            //
            // this is so, for example, if you have the sequence "h a t" and you
            // type "h e a r t" it does not match.  in this case the "e" will
            // cause the sequence to reset
            //
            // modifier keys are ignored because you can have a sequence
            // that contains modifiers such as "enter ctrl+space" and in most
            // cases the modifier key will be pressed before the next key
            //
            // also if you have a sequence such as "ctrl+b a" then pressing the
            // "b" key will trigger a "keypress" and a "keydown"
            //
            // the "keydown" is expected when there is a modifier, but the
            // "keypress" ends up matching the _nextExpectedAction since it occurs
            // after and that causes the sequence to reset
            //
            // we ignore keypresses in a sequence that directly follow a keydown
            // for the same character
            var ignoreThisKeypress = e.type == 'keypress' && _ignoreNextKeypress;
            if (e.type == _nextExpectedAction && !_isModifier(character) && !ignoreThisKeypress) {
                _resetSequences(doNotReset);
            }

            _ignoreNextKeypress = processedSequenceCallback && e.type == 'keydown';
        };

        /**
         * handles a keydown event
         *
         * @param {Event} e
         * @returns void
         */
        function _handleKeyEvent(e) {

            // normalize e.which for key events
            // @see http://stackoverflow.com/questions/4285627/javascript-keycode-vs-charcode-utter-confusion
            if (typeof e.which !== 'number') {
                e.which = e.keyCode;
            }

            var character = _characterFromEvent(e);

            // no character found then stop
            if (!character) {
                return;
            }

            // need to use === for the character check because the character can be 0
            if (e.type == 'keyup' && _ignoreNextKeyup === character) {
                _ignoreNextKeyup = false;
                return;
            }

            self.handleKey(character, _eventModifiers(e), e);
        }

        /**
         * called to set a 1 second timeout on the specified sequence
         *
         * this is so after each key press in the sequence you have 1 second
         * to press the next key before you have to start over
         *
         * @returns void
         */
        function _resetSequenceTimer() {
            clearTimeout(_resetTimer);
            _resetTimer = setTimeout(_resetSequences, 1000);
        }

        /**
         * binds a key sequence to an event
         *
         * @param {string} combo - combo specified in bind call
         * @param {Array} keys
         * @param {Function} callback
         * @param {string=} action
         * @returns void
         */
        function _bindSequence(combo, keys, callback, action) {

            // start off by adding a sequence level record for this combination
            // and setting the level to 0
            _sequenceLevels[combo] = 0;

            /**
             * callback to increase the sequence level for this sequence and reset
             * all other sequences that were active
             *
             * @param {string} nextAction
             * @returns {Function}
             */
            function _increaseSequence(nextAction) {
                return function() {
                    _nextExpectedAction = nextAction;
                    ++_sequenceLevels[combo];
                    _resetSequenceTimer();
                };
            }

            /**
             * wraps the specified callback inside of another function in order
             * to reset all sequence counters as soon as this sequence is done
             *
             * @param {Event} e
             * @returns void
             */
            function _callbackAndReset(e) {
                _fireCallback(callback, e, combo);

                // we should ignore the next key up if the action is key down
                // or keypress.  this is so if you finish a sequence and
                // release the key the final key will not trigger a keyup
                if (action !== 'keyup') {
                    _ignoreNextKeyup = _characterFromEvent(e);
                }

                // weird race condition if a sequence ends with the key
                // another sequence begins with
                setTimeout(_resetSequences, 10);
            }

            // loop through keys one at a time and bind the appropriate callback
            // function.  for any key leading up to the final one it should
            // increase the sequence. after the final, it should reset all sequences
            //
            // if an action is specified in the original bind call then that will
            // be used throughout.  otherwise we will pass the action that the
            // next key in the sequence should match.  this allows a sequence
            // to mix and match keypress and keydown events depending on which
            // ones are better suited to the key provided
            for (var i = 0; i < keys.length; ++i) {
                var isFinal = i + 1 === keys.length;
                var wrappedCallback = isFinal ? _callbackAndReset : _increaseSequence(action || _getKeyInfo(keys[i + 1]).action);
                _bindSingle(keys[i], wrappedCallback, action, combo, i);
            }
        }

        /**
         * binds a single keyboard combination
         *
         * @param {string} combination
         * @param {Function} callback
         * @param {string=} action
         * @param {string=} sequenceName - name of sequence if part of sequence
         * @param {number=} level - what part of the sequence the command is
         * @returns void
         */
        function _bindSingle(combination, callback, action, sequenceName, level) {

            // store a direct mapped reference for use with Mousetrap.trigger
            self._directMap[combination + ':' + action] = callback;

            // make sure multiple spaces in a row become a single space
            combination = combination.replace(/\s+/g, ' ');

            var sequence = combination.split(' ');
            var info;

            // if this pattern is a sequence of keys then run through this method
            // to reprocess each pattern one key at a time
            if (sequence.length > 1) {
                _bindSequence(combination, sequence, callback, action);
                return;
            }

            info = _getKeyInfo(combination, action);

            // make sure to initialize array if this is the first time
            // a callback is added for this key
            self._callbacks[info.key] = self._callbacks[info.key] || [];

            // remove an existing match if there is one
            _getMatches(info.key, info.modifiers, {type: info.action}, sequenceName, combination, level);

            // add this call back to the array
            // if it is a sequence put it at the beginning
            // if not put it at the end
            //
            // this is important because the way these are processed expects
            // the sequence ones to come first
            self._callbacks[info.key][sequenceName ? 'unshift' : 'push']({
                callback: callback,
                modifiers: info.modifiers,
                action: info.action,
                seq: sequenceName,
                level: level,
                combo: combination
            });
        }

        /**
         * binds multiple combinations to the same callback
         *
         * @param {Array} combinations
         * @param {Function} callback
         * @param {string|undefined} action
         * @returns void
         */
        self._bindMultiple = function(combinations, callback, action) {
            for (var i = 0; i < combinations.length; ++i) {
                _bindSingle(combinations[i], callback, action);
            }
        };

        // start!
        _addEvent(targetElement, 'keypress', _handleKeyEvent);
        _addEvent(targetElement, 'keydown', _handleKeyEvent);
        _addEvent(targetElement, 'keyup', _handleKeyEvent);
    }

    /**
     * binds an event to mousetrap
     *
     * can be a single key, a combination of keys separated with +,
     * an array of keys, or a sequence of keys separated by spaces
     *
     * be sure to list the modifier keys first to make sure that the
     * correct key ends up getting bound (the last key in the pattern)
     *
     * @param {string|Array} keys
     * @param {Function} callback
     * @param {string=} action - 'keypress', 'keydown', or 'keyup'
     * @returns void
     */
    Mousetrap.prototype.bind = function(keys, callback, action) {
        var self = this;
        keys = keys instanceof Array ? keys : [keys];
        self._bindMultiple.call(self, keys, callback, action);
        return self;
    };

    /**
     * unbinds an event to mousetrap
     *
     * the unbinding sets the callback function of the specified key combo
     * to an empty function and deletes the corresponding key in the
     * _directMap dict.
     *
     * TODO: actually remove this from the _callbacks dictionary instead
     * of binding an empty function
     *
     * the keycombo+action has to be exactly the same as
     * it was defined in the bind method
     *
     * @param {string|Array} keys
     * @param {string} action
     * @returns void
     */
    Mousetrap.prototype.unbind = function(keys, action) {
        var self = this;
        return self.bind.call(self, keys, function() {}, action);
    };

    /**
     * triggers an event that has already been bound
     *
     * @param {string} keys
     * @param {string=} action
     * @returns void
     */
    Mousetrap.prototype.trigger = function(keys, action) {
        var self = this;
        if (self._directMap[keys + ':' + action]) {
            self._directMap[keys + ':' + action]({}, keys);
        }
        return self;
    };

    /**
     * resets the library back to its initial state.  this is useful
     * if you want to clear out the current keyboard shortcuts and bind
     * new ones - for example if you switch to another page
     *
     * @returns void
     */
    Mousetrap.prototype.reset = function() {
        var self = this;
        self._callbacks = {};
        self._directMap = {};
        return self;
    };

    /**
     * should we stop this event before firing off callbacks
     *
     * @param {Event} e
     * @param {Element} element
     * @return {boolean}
     */
    Mousetrap.prototype.stopCallback = function(e, element) {
        var self = this;

        // if the element has the class "mousetrap" then no need to stop
        if ((' ' + element.className + ' ').indexOf(' mousetrap ') > -1) {
            return false;
        }

        if (_belongsTo(element, self.target)) {
            return false;
        }

        // stop for input, select, and textarea
        return element.tagName == 'INPUT' || element.tagName == 'SELECT' || element.tagName == 'TEXTAREA' || element.isContentEditable;
    };

    /**
     * exposes _handleKey publicly so it can be overwritten by extensions
     */
    Mousetrap.prototype.handleKey = function() {
        var self = this;
        return self._handleKey.apply(self, arguments);
    };

    /**
     * allow custom key mappings
     */
    Mousetrap.addKeycodes = function(object) {
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                _MAP[key] = object[key];
            }
        }
        _REVERSE_MAP = null;
    };

    /**
     * Init the global mousetrap functions
     *
     * This method is needed to allow the global mousetrap functions to work
     * now that mousetrap is a constructor function.
     */
    Mousetrap.init = function() {
        var documentMousetrap = Mousetrap(document);
        for (var method in documentMousetrap) {
            if (method.charAt(0) !== '_') {
                Mousetrap[method] = (function(method) {
                    return function() {
                        return documentMousetrap[method].apply(documentMousetrap, arguments);
                    };
                } (method));
            }
        }
    };

    Mousetrap.init();

    // expose mousetrap to the global object
    window.Mousetrap = Mousetrap;

    // expose as a common js module
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Mousetrap;
    }

    // expose mousetrap as an AMD module
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return Mousetrap;
        });
    }
}) (typeof window !== 'undefined' ? window : null, typeof  window !== 'undefined' ? document : null);

},{}],10:[function(require,module,exports){
(function (root, factory){
  'use strict';

  /*istanbul ignore next:cant test*/
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else {
    // Browser globals
    root.objectPath = factory();
  }
})(this, function(){
  'use strict';

  var toStr = Object.prototype.toString;
  function hasOwnProperty(obj, prop) {
    if(obj == null) {
      return false
    }
    //to handle objects with null prototypes (too edge case?)
    return Object.prototype.hasOwnProperty.call(obj, prop)
  }

  function isEmpty(value){
    if (!value) {
      return true;
    }
    if (isArray(value) && value.length === 0) {
        return true;
    } else if (typeof value !== 'string') {
        for (var i in value) {
            if (hasOwnProperty(value, i)) {
                return false;
            }
        }
        return true;
    }
    return false;
  }

  function toString(type){
    return toStr.call(type);
  }

  function isObject(obj){
    return typeof obj === 'object' && toString(obj) === "[object Object]";
  }

  var isArray = Array.isArray || function(obj){
    /*istanbul ignore next:cant test*/
    return toStr.call(obj) === '[object Array]';
  }

  function isBoolean(obj){
    return typeof obj === 'boolean' || toString(obj) === '[object Boolean]';
  }

  function getKey(key){
    var intKey = parseInt(key);
    if (intKey.toString() === key) {
      return intKey;
    }
    return key;
  }

  function factory(options) {
    options = options || {}

    var objectPath = function(obj) {
      return Object.keys(objectPath).reduce(function(proxy, prop) {
        if(prop === 'create') {
          return proxy;
        }

        /*istanbul ignore else*/
        if (typeof objectPath[prop] === 'function') {
          proxy[prop] = objectPath[prop].bind(objectPath, obj);
        }

        return proxy;
      }, {});
    };

    function hasShallowProperty(obj, prop) {
      return (options.includeInheritedProps || (typeof prop === 'number' && Array.isArray(obj)) || hasOwnProperty(obj, prop))
    }

    function getShallowProperty(obj, prop) {
      if (hasShallowProperty(obj, prop)) {
        return obj[prop];
      }
    }

    function set(obj, path, value, doNotReplace){
      if (typeof path === 'number') {
        path = [path];
      }
      if (!path || path.length === 0) {
        return obj;
      }
      if (typeof path === 'string') {
        return set(obj, path.split('.').map(getKey), value, doNotReplace);
      }
      var currentPath = path[0];
      var currentValue = getShallowProperty(obj, currentPath);
      if (path.length === 1) {
        if (currentValue === void 0 || !doNotReplace) {
          obj[currentPath] = value;
        }
        return currentValue;
      }

      if (currentValue === void 0) {
        //check if we assume an array
        if(typeof path[1] === 'number') {
          obj[currentPath] = [];
        } else {
          obj[currentPath] = {};
        }
      }

      return set(obj[currentPath], path.slice(1), value, doNotReplace);
    }

    objectPath.has = function (obj, path) {
      if (typeof path === 'number') {
        path = [path];
      } else if (typeof path === 'string') {
        path = path.split('.');
      }

      if (!path || path.length === 0) {
        return !!obj;
      }

      for (var i = 0; i < path.length; i++) {
        var j = getKey(path[i]);

        if((typeof j === 'number' && isArray(obj) && j < obj.length) ||
          (options.includeInheritedProps ? (j in Object(obj)) : hasOwnProperty(obj, j))) {
          obj = obj[j];
        } else {
          return false;
        }
      }

      return true;
    };

    objectPath.ensureExists = function (obj, path, value){
      return set(obj, path, value, true);
    };

    objectPath.set = function (obj, path, value, doNotReplace){
      return set(obj, path, value, doNotReplace);
    };

    objectPath.insert = function (obj, path, value, at){
      var arr = objectPath.get(obj, path);
      at = ~~at;
      if (!isArray(arr)) {
        arr = [];
        objectPath.set(obj, path, arr);
      }
      arr.splice(at, 0, value);
    };

    objectPath.empty = function(obj, path) {
      if (isEmpty(path)) {
        return void 0;
      }
      if (obj == null) {
        return void 0;
      }

      var value, i;
      if (!(value = objectPath.get(obj, path))) {
        return void 0;
      }

      if (typeof value === 'string') {
        return objectPath.set(obj, path, '');
      } else if (isBoolean(value)) {
        return objectPath.set(obj, path, false);
      } else if (typeof value === 'number') {
        return objectPath.set(obj, path, 0);
      } else if (isArray(value)) {
        value.length = 0;
      } else if (isObject(value)) {
        for (i in value) {
          if (hasShallowProperty(value, i)) {
            delete value[i];
          }
        }
      } else {
        return objectPath.set(obj, path, null);
      }
    };

    objectPath.push = function (obj, path /*, values */){
      var arr = objectPath.get(obj, path);
      if (!isArray(arr)) {
        arr = [];
        objectPath.set(obj, path, arr);
      }

      arr.push.apply(arr, Array.prototype.slice.call(arguments, 2));
    };

    objectPath.coalesce = function (obj, paths, defaultValue) {
      var value;

      for (var i = 0, len = paths.length; i < len; i++) {
        if ((value = objectPath.get(obj, paths[i])) !== void 0) {
          return value;
        }
      }

      return defaultValue;
    };

    objectPath.get = function (obj, path, defaultValue){
      if (typeof path === 'number') {
        path = [path];
      }
      if (!path || path.length === 0) {
        return obj;
      }
      if (obj == null) {
        return defaultValue;
      }
      if (typeof path === 'string') {
        return objectPath.get(obj, path.split('.'), defaultValue);
      }

      var currentPath = getKey(path[0]);
      var nextObj = getShallowProperty(obj, currentPath)
      if (nextObj === void 0) {
        return defaultValue;
      }

      if (path.length === 1) {
        return nextObj;
      }

      return objectPath.get(obj[currentPath], path.slice(1), defaultValue);
    };

    objectPath.del = function del(obj, path) {
      if (typeof path === 'number') {
        path = [path];
      }

      if (obj == null) {
        return obj;
      }

      if (isEmpty(path)) {
        return obj;
      }
      if(typeof path === 'string') {
        return objectPath.del(obj, path.split('.'));
      }

      var currentPath = getKey(path[0]);
      if (!hasShallowProperty(obj, currentPath)) {
        return obj;
      }

      if(path.length === 1) {
        if (isArray(obj)) {
          obj.splice(currentPath, 1);
        } else {
          delete obj[currentPath];
        }
      } else {
        return objectPath.del(obj[currentPath], path.slice(1));
      }

      return obj;
    }

    return objectPath;
  }

  var mod = factory();
  mod.create = factory;
  mod.withInheritedProps = factory({includeInheritedProps: true})
  return mod;
});

},{}],11:[function(require,module,exports){
"use strict";

var _create = require("./utils/create");

var _create2 = _interopRequireDefault(_create);

var _elements = require("./utils/elements");

var _elements2 = _interopRequireDefault(_elements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.elements = _elements2.default;

_create2.default.all();

},{"./utils/create":49,"./utils/elements":50}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DOMString = require("./../type/DOMString.js");

var _DOMString2 = _interopRequireDefault(_DOMString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
* Adds functionality to `aria-checked` attribute.
*
* Changes value when clicked or while focused pressing `Space`.
*
* {@link https://www.w3.org/TR/wai-aria-1.1/#aria-checked}
* @emits click when clicked or while focused pressing `Space`.
* @emits change when clicked or while focused pressing `Space`.
*/
var AriaChecked = function AriaChecked(superclass) {
	return function (_superclass) {
		_inherits(_class, _superclass);

		function _class() {
			var _ref;

			_classCallCheck(this, _class);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			var _this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args)));

			_this.addListener("key", _this.onChecked.bind(_this), { key: "space" });
			_this.addListener("click", _this.onChecked.bind(_this));
			return _this;
		}

		_createClass(_class, [{
			key: "onChecked",
			value: function onChecked() {
				if (this.disabled !== true) {
					this.checked = _DOMString2.default.toggle(this.checked);
					this.dispatchEvent(new InputEvent("input"));
					this.dispatchEvent(new Event("change"));
				}
			}
		}]);

		return _class;
	}(superclass);
};

exports.default = AriaChecked;

},{"./../type/DOMString.js":45}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _boolean = require("./../type/boolean");

var _boolean2 = _interopRequireDefault(_boolean);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
* Adds functionality to `aria-expanded` attribute
* @todo add a setting to define how the visibility should be toggled
*/
var AriaExpanded = function AriaExpanded(superclass) {
	return function (_superclass) {
		_inherits(_class, _superclass);

		/**
  * @param  {HTMLElement} element Element with an `aria-expanded` attribute
  */
		function _class() {
			var _ref;

			_classCallCheck(this, _class);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			var _this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args)));

			if (_this.expanded !== undefined) {
				// todo: add when first time aria-expanded is boolean
				_this.addListener("click", _this.onExpanded.bind(_this));
				// this.addListener("key", this.onExpanded.bind(this), { key: ["enter", "space"] });
			}
			return _this;
		}

		_createClass(_class, [{
			key: "onExpanded",
			value: function onExpanded(ev) {
				if (typeof _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "onExpanded", this) == "function") _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "onExpanded", this).call(this, ev);
				if (ev && typeof ev.preventDefault === "function") ev.preventDefault();

				if (this.disabled !== true) {
					this.expanded = _boolean2.default.toggle(this.expanded);

					if (this.expanded) {
						this.controls.forEach(function (control) {
							control.element.hidden = false;
						});
					} else {
						this.controls.forEach(function (control) {
							control.element.hidden = true;
						});
					}
				}
			}
		}]);

		return _class;
	}(superclass);
};

exports.default = AriaExpanded;

},{"./../type/boolean":46}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _DOMString = require("./../type/DOMString");

var _DOMString2 = _interopRequireDefault(_DOMString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
* Adds functionality to `aria-pressed` attribute.
*
* Changes value when clicked or while focused pressing `Space` or `Enter`.
*
* {@link https://www.w3.org/TR/wai-aria-1.1/#aria-pressed}
* @emits click when clicked or while focused pressing `Space` or `Enter`.
*/
var AriaPressed = function AriaPressed(superclass) {
	return function (_superclass) {
		_inherits(_class, _superclass);

		/**
  * @param  {HTMLElement} element Element with an `aria-pressed` attribute
  */
		function _class() {
			var _ref;

			_classCallCheck(this, _class);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			var _this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args)));

			if (_this.pressed !== undefined) {
				// todo: add when first time aria-pressed is boolean
				_this.addListener("click", _this.onPressed.bind(_this));
				_this.addListener("key", _this.onPressed.bind(_this), { key: ["enter", "space"] });
			}
			return _this;
		}

		_createClass(_class, [{
			key: "onPressed",
			value: function onPressed(ev) {
				if (typeof _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "onPressed", this) == "function") _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "onPressed", this).call(this, ev);

				if (this.disabled !== true) {
					this.pressed = _DOMString2.default.toggle(this.pressed);
				}
			}
		}]);

		return _class;
	}(superclass);
};

exports.default = AriaPressed;

},{"./../type/DOMString":45}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _boolean = require("./../type/boolean");

var _boolean2 = _interopRequireDefault(_boolean);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * gets and sets the `aria-selected` attribute.
 *
 * Indicates if a element is selectable
 *
 * @see https://www.w3.org/TR/wai-aria-1.1/#aria-selected
 */
var AriaSelected = function AriaSelected(superclass) {
	return function (_superclass) {
		_inherits(_class, _superclass);

		function _class() {
			var _ref;

			_classCallCheck(this, _class);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			var _this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args)));

			_this.addListener("click", _this.onSelected.bind(_this));
			_this.addListener("key", _this.onSelected.bind(_this), { key: ["space", "enter"] });
			return _this;
		}

		_createClass(_class, [{
			key: "onSelected",
			value: function onSelected(ev) {
				if (typeof _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "onSelected", this) == "function") _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "onSelected", this).call(this, ev);
				this.selected = _boolean2.default.toggle(this.selected);
			}
		}]);

		return _class;
	}(superclass);
};

exports.default = AriaSelected;

},{"./../type/boolean":46}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * 
 */
var roles = {
	alert: {
		super: ["section"],
		sub: ["alertdialog"],
		defaults: {
			live: "assertive",
			atomic: true
		}
	},
	alertdialog: { super: ["alert", "dialog"] },
	application: { super: ["structure"] },
	article: {
		super: ["document"],
		implicit: ["article:not([role)"]
	},
	/** @todo more strict banner selector  */
	banner: {
		super: ["landmark"],
		implicit: ["header:not([role])"]
	},
	button: {
		super: ["command"],
		implicit: ["button:not([role])", "input[type='button']:not([role])", "input[type='reset']:not([role])", "input[type='image']:not([role])", "input[type='submit']:not([role])", "summary:not([role])"]
	},
	cell: {
		super: ["section"],
		sub: ["columnheader", "rowheader", "gridcell"],
		context: ["row"],
		implicit: ["table td:not([role])"]
	},
	checkbox: {
		super: ["input"],
		sub: ["menuitemcheckbox", "switch"],
		implicit: ["input[type='checkbox']:not([role])"],
		defaults: {
			checked: true
		}
	},
	columnheader: {
		super: ["cell", "gridcell", "sectionhead"],
		context: ["row"],
		implicit: ["thead th:not([role])"]
	},
	/** @todo size attribute doesn't check faulty values */
	combobox: {
		super: ["select"],
		owns: {
			all: ["textbox"],
			any: ["listbox", "tree", "grid", "dialog"]
		},
		implicit: ["input[type='email'][list]:not([role])", "input[type='text'][list]:not([role])", "input[type='search'][list]:not([role])", "input[type='tel'][list]:not([role])", "input[type='url'][list]:not([role])", "select:not([multiple]):not([size]):not([role])", "select:not([multiple])[size='0']:not([role])", "select:not([multiple])[size='1']:not([role])"],
		defaults: {
			expanded: false,
			hasPopUp: "listbox"
		}
	},
	command: {
		super: ["widget"],
		sub: ["menuitem", "button", "link"]
	},
	complementary: {
		super: ["landmark"],
		implicit: ["aside:not([role])"]
	},
	composite: {
		super: ["widget"],
		sub: ["grid", "select", "spinbutton", "tablist"]
	},
	/** @todo more strict footer selector  */
	contentinfo: {
		super: ["landmark"],
		implicit: ["footer:not([role])"]
	},
	definition: {
		super: ["section"],
		implicit: ["dd:not([role])"]
	},
	dialog: {
		super: ["window"],
		sub: ["alertdialog"],
		implicit: ["dialog:not([role])"]
	},
	directory: { super: ["list"] },
	document: {
		super: ["structure"],
		sub: ["article"],
		implicit: ["aside:not([role])"]
	},
	feed: {
		super: ["list"],
		owns: { any: ["article"] }
	},
	figure: {
		super: ["section"],
		implicit: ["figure:not([role])"]
	},
	form: {
		super: ["landmark"],
		implicit: ["form:not([role])"]
	},
	grid: {
		super: ["composite", "table"],
		sub: ["treegrid"],
		owns: { any: ["rowgroup", "row"] }
	},
	gridcell: {
		super: ["cell", "widget"],
		sub: ["columnheader", "rowheader"],
		context: ["row"]
	},
	group: {
		super: ["section"],
		sub: ["row", "select", "toolbar"],
		implicit: ["details:not([role])", "optgroup:not([role])"]
	},
	heading: {
		super: ["sectionhead"],
		implicit: ["h1:not([role])", "h2:not([role])", "h3:not([role])", "h4:not([role])", "h5:not([role])", "h6::not([role])"],
		defaults: {
			level: 2
		}
	},
	img: {
		super: ["section"],
		implicit: ["img[alt]:not([alt='']):not([role])"]
	},
	input: {
		super: ["widget"],
		sub: ["checkbox", "option", "radio", "slider", "spinbutton", "textbox"]
	},
	landmark: {
		super: ["section"],
		sub: ["banner", "complementary", "contentinfo", "form", "main", "navigation", "region", "search"]
	},
	link: {
		super: ["command"],
		implicit: ["a[href]:not([role])", "area[href]:not([role])", "link[href]:not([role])"]
	},
	list: {
		super: ["section"],
		sub: ["directory", "feed"],
		owns: { any: ["group", "listitem"] },
		implicit: ["dl:not([role])", "ol:not([role])", "ul:not([role])"]
	},
	listbox: {
		super: ["select"],
		owns: { any: ["option"] },
		implicit: ["datalist:not([role])", "select[multiple]:not([role])", "select[size]:not([size='0']):not([size='1']):not([role])"]
	},
	listitem: {
		super: ["section"],
		sub: ["treeitem"],
		context: ["group", "list"],
		implicit: ["dt:not([role])", "ol > li::not([role])"]
	},
	log: {
		super: ["section"],
		defaults: {
			live: "pollite"
		}
	},
	main: {
		super: ["landmark"],
		implicit: ["main:not([role])"]
	},
	marquee: { super: ["section"] },
	math: {
		super: ["section"],
		implicit: ["math:not([role])"]
	},
	menu: {
		super: ["select"],
		sub: ["menubar"],
		owns: { any: ["menuitem", "menuitemradio", "menuitemcheckbox", "group"] },
		implicit: ["menu[type='context']:not([role])"],
		defaults: { orientation: "vertical" }
	},
	menubar: {
		super: ["menu"],
		sub: ["toolbar"],
		owns: { any: ["menuitem", "menuitemradio", "menuitemcheckbox", "group"] },
		defaults: { orientation: "horizontal" }
	},
	menuitem: {
		super: ["command"],
		sub: ["menuitemcheckbox"],
		context: ["group", "menu", "menubar"],
		implicit: ["menuitem[type='context']:not([role])"]
	},
	menuitemcheckbox: {
		super: ["checkbox", "menuitem"],
		sub: ["menuitemradio"],
		context: ["menu", "menubar"],
		implicit: ["menuitem[type='checkbox']:not([role])"],
		defaults: { checked: false }
	},
	menuitemradio: {
		super: ["menuitemcheckbox", "radio"],
		context: ["group", "menu", "menubar"],
		implicit: ["menuitem[type='radio']:not([role])"],
		defaults: { checked: false }
	},
	navigation: {
		super: ["landmark"],
		implicit: ["nav:not([role])"]
	},
	/** @todo reconsider if none == presentation */
	none: { super: ["structure"] },
	note: { super: ["section"] },
	/** @todo more strict datalist selector */
	option: {
		super: ["input"],
		sub: ["treeitem"],
		context: ["listbox"],
		implicit: ["datalist option:not([role])"],
		defaults: { checked: false }
	},
	presentation: {
		super: ["structure"]
	},
	progressbar: {
		super: ["range"],
		implicit: ["progress:not([role])"]
	},
	radio: {
		super: ["input"],
		sub: ["menuitemradio"],
		implicit: ["input[type='radio']:not([role])"],
		defaults: { checked: false }
	},
	radiogroup: {
		super: ["select"],
		owns: ["radio"]
	},
	range: {
		super: ["widget"],
		sub: ["progressbar", "scrollbar", "slider", "spinbutton"]
	},
	/** @todo add section selector to check accessible */
	region: { super: ["landmark"] },
	roletype: { sub: ["structure", "widget", "window"] },
	/** @todo more strict tr selector */
	row: {
		sub: ["group", "widget"],
		context: ["grid", "rowgroup", "table", "treegrid"],
		owns: { any: ["cell", "columnheader", "rowheader", "gridcell"] },
		implicit: ["table tr:not([role])"]
	},
	rowgroup: {
		context: ["grid", "table", "treegrid"],
		owns: { any: ["row"] },
		implicit: ["thead:not([role])", "tbody:not([role])", "tfoot:not([role])"]
	},
	rowheader: {
		super: ["cell", "gridcell", "sectionhead"],
		context: ["row"],
		implicit: ["tbody th:not([role])"]
	},
	scrollbar: {
		super: ["range"],
		defaults: {
			orientation: "vertical",
			valueMin: 0,
			valueMax: 100
		}
	},
	search: { super: ["landmark"] },
	searchbox: {
		super: ["textbox"],
		implicit: ["input[type='search']:not([list]):not([role])"]
	},
	section: {
		super: ["structure"],
		sub: ["alert", "cell", "definition", "figure", "group", "img", "landmark", "list", "listitem", "log", "marquee", "math", "note", "status", "table", "tabpanel", "term", "tooltip"]
	},
	sectionhead: {
		super: ["structure"],
		sub: ["columnheader", "heading", "rowheader", "tab"]
	},
	select: {
		super: ["composite", "group"],
		sub: ["combobox", "listbox", "menu", "radiogroup", "tree"]
	},
	/** @todo seperation of focusable */
	separator: {
		super: ["structure", "widget"],
		implicit: ["hr:not([role])"],
		defaults: {
			orientation: "horizontal",
			valueMin: 0,
			valueMax: 100,
			valueNow: 50
		}
	},
	slider: {
		super: ["input", "range"],
		implicit: ["input[type='range']:not([role])"],
		defaults: {
			orientation: "horizontal",
			valueMin: 0,
			valueMax: 100
		}
	},
	spinbutton: {
		super: ["composite", "input", "range"],
		implicit: ["input[type='number']:not([role])"],
		defaults: { valueNow: 0 }
	},
	status: {
		super: "section",
		sub: ["progressbar", "timer"],
		implicit: ["output:not([role])"]
	},
	structure: {
		super: ["roletype"],
		sub: ["application", "document", "presentation", "rowgroup", "section", "sectionhead", "separator"]
	},
	switch: {
		super: ["checkbox"],
		defaulst: { checked: false }
	},
	tab: {
		super: ["sectionhead", "widget"],
		context: ["tablist"],
		defaulst: { selected: false }
	},
	table: {
		super: ["section"],
		sub: ["grid"],
		owns: { any: ["row", "rowgroup"] },
		implicit: ["table:not([role])"]
	},
	tablist: {
		super: ["composite"],
		owns: { any: ["tab"] },
		defaults: { orientation: "horizontal" }
	},
	tabpanel: { super: ["section"] },
	term: { super: ["section"] },
	textbox: {
		super: ["input"],
		sub: ["searchbox"],
		implicit: ["input[type='email']:not([list]):not([role])", "input[type='tel']:not([list]):not([role])", "input[type='text']:not([list]):not([role])", "input[type='url']:not([list]):not([role])", "textarea:not([role])"]
	},
	timer: { super: ["status"] },
	toolbar: {
		super: ["group"],
		defaults: { orientation: "horizontal" }
	},
	tooltip: { super: ["section"] },
	tree: {
		super: ["select"],
		sub: ["threegrid"],
		owns: { any: ["group", "treeitem"] }
	},
	treegrid: {
		super: ["grid", "tree"],
		owns: ["row", "rowgroup"]
	},
	treeitem: {
		super: ["listitem", "option"],
		context: { any: ["group", "tree"] }
	},
	widget: {
		super: ["roletype"],
		sub: ["command", "composite", "gridcell", "input", "range", "row", "separator", "tab"]
	},
	window: {
		super: ["roletype"],
		sub: ["dialog"]
	}
};

exports.default = roles;

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _objectPath = require("object-path");

var _objectPath2 = _interopRequireDefault(_objectPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mousetrap = require("mousetrap");


var isFunction = function isFunction(obj) {
	return typeof obj == "function" || false;
};
var customEvents = ["key", "attributes", "characterData", "childlist", "label"];

/**
 * Register extra elements used for some roles,
 * e.g. the up and down arrows with the spinbutton role
 *
 * Path of importance where the element is received from:
 * 1. new ...(..., {elements: { roleName: { str: instance of HTMLElement }}})
 * 2. [data-roleName-str=id] on the element with the role
 * 3. default value
 *
 * @private
 * @param  {string} path path where the element should be stored
 */
function handleCustomElement(path, value) {
	// only if no element is already set
	if (!_objectPath2.default.has(this, "_." + path)) {
		// check if element has it defined as data attribute
		var id = this.element.getAttribute("data-" + path.split(".").join("-"));
		if (id) var el = document.getElementById(id);
		if (el) {
			_objectPath2.default.set(this, "_." + path, el);
		} else {
			_objectPath2.default.set(this, "_." + path, value);
		}
	}
}

function handleCustomValue(path, value) {
	// only if no element is already set
	if (!_objectPath2.default.has(this, "_." + path)) {
		// check if element has it defined as data attribute
		var dataValue = this.element.getAttribute("data-" + path.split(".").join("-"));
		if (dataValue) {
			_objectPath2.default.set(this, "_." + path, dataValue);
		} else {
			_objectPath2.default.set(this, "_." + path, value);
		}
	}
}

function camelize(str) {
	return str[0].toUpperCase() + str.replace(/-(.)/g, function (a, b) {
		return b.toUpperCase();
	}).slice(1);
}

function moCallback(mutations) {
	// console.log(mutations);
	mutations.forEach(function (mutation) {
		if (mutation.type == "attributes") {
			var attrName = mutation.attributeName;
			// update to new value
			this._.values[attrName] = this.element.getAttribute(attrName);
		}

		var listeners = this._.listeners.get("mutation");
		console.log(listeners);
	}.bind(this));
}

/**
 * Adds some basic functionality that is greatly used inside the components
 * @param {Element} element 	Element where a AccessibleNode should be created
 * @param {Object} options 		Additional options to set
 */

var Base = function () {
	function Base(element) {
		var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		_classCallCheck(this, Base);

		Object.defineProperty(this, "element", { value: element });
		Object.defineProperty(this, "_", { value: options });
		this._.values = {};
		this._.listeners = new Map();
		this._.registerCustomElement = handleCustomElement.bind(this);
		this._.registerCustomValue = handleCustomValue.bind(this);

		_objectPath2.default.push(this._, "mutations", "tabIndex");

		var observer = new MutationObserver(moCallback.bind(this));
		observer.observe(this.element, { attributes: true, childList: true, attributeFilter: this._.mutations });
	}

	/**
  * Current tabindex of the element
  * @type {Number}
  */


	_createClass(Base, [{
		key: "addListener",


		/**
   * Adds an listener to the object and targeted element
   * @see customEvents
   * @param {String} label Type of event
   * @param {Function} callback Callback function
   * @param {Object} [options] Extends AddEventListenerOptions
   * @param {String} [options.key] When label is set to `key` it specifies the keycombo to listen to
   * @param {String} [options.attribute] When label is set to `attributes` it specifies which attribute should be changed
   * @param {Element} [options.target] Changes the targeted element
   * @param {Boolean} [options.capture]
   * @param {Boolean} [options.passive]
   * @param {Boolean} [options.once]
   */
		value: function addListener(label, callback, options) {
			var el = options && options.target ? options.target : this.element;
			this._.listeners.has(label) || this._.listeners.set(label, []);
			this._.listeners.get(label).push({ callback: callback, options: options });

			if (label == "key" && options.key) {
				Mousetrap(el).bind(options.key, callback);
			}

			if (customEvents.indexOf(label) == -1) {
				el.addEventListener(label, callback, options);
			}
		}
	}, {
		key: "removeListener",
		value: function removeListener(label, callback, options) {
			var listeners = this._.listeners.get(label),
			    index = void 0;

			if (listeners && listeners.length) {
				index = listeners.reduce(function (i, listener, index) {
					if (isFunction(listener.callback) && listener.callback === callback && (listener.options && listener.options.key == options.key && listener.options.attribute == options.attribute && listener.options.capture == options.capture || !listener.options && !options)) {
						return i = index;
					} else {
						return i;
					}
				}, -1);

				if (index > -1) {
					if (customEvents.indexOf(label) == -1) {
						var el = options && options.target ? options.target : this.element;

						el.removeEventListener(label, callback, options);
					}
					listeners.splice(index, 1);
					this._.listeners.set(label, listeners);
					return true;
				}
			}
			return false;
		}
	}, {
		key: "dispatchEvent",
		value: function dispatchEvent(ev) {
			// let listeners = this._.listeners.get(ev.type);
			this.element.dispatchEvent(ev);
			// if (listeners && listeners.length) {
			// 	listeners.forEach((listener) => {
			// 		listener(ev);
			// 	});
			// 	return true;
			// }
			// return false;
		}
	}, {
		key: "addKeyListener",
		value: function addKeyListener(key, callback) {
			return this.addListener("key", callback, { key: key });
		}
	}, {
		key: "tabIndex",
		get: function get() {
			if (!this.element.hasAttribute("tabindex")) {
				return;
			}

			return this.element.tabIndex;
		},
		set: function set(number) {
			this.element.tabIndex = number;
		}
	}]);

	return Base;
}();

exports.default = Base;

},{"mousetrap":9,"object-path":10}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _jsMixin = require("@vestergaard-company/js-mixin");

var _jsMixin2 = _interopRequireDefault(_jsMixin);

var _Command = require("./abstract/Command");

var _Command2 = _interopRequireDefault(_Command);

var _boolean = require("./../type/boolean");

var _boolean2 = _interopRequireDefault(_boolean);

var _ariaPressed = require("../attributes/aria-pressed.js");

var _ariaPressed2 = _interopRequireDefault(_ariaPressed);

var _ariaExpanded = require("../attributes/aria-expanded");

var _ariaExpanded2 = _interopRequireDefault(_ariaExpanded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function close() {
	this.expanded = _boolean2.default.IS_NOT_ACTIVE;
}

function registerExpanded(ev) {
	console.log(ev);
}

/**
 * 
 * 
 * @extends Command
 * @mixes AriaExpanded
 * @mixes AriaPressed
 */

var Button = function (_mix$with) {
	_inherits(Button, _mix$with);

	function Button() {
		var _ref;

		_classCallCheck(this, Button);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_ref = Button.__proto__ || Object.getPrototypeOf(Button)).call.apply(_ref, [this].concat(args)));

		_this.addListener("attributes", registerExpanded, { attribute: "aria-expanded", once: true });

		if (_this.expanded !== undefined) {
			// todo: add when first time aria-expanded is boolean
			_this.controls.forEach(function (control) {
				return control.addListener("close", close.bind(_this));
			});
		}
		return _this;
	}

	_createClass(Button, [{
		key: "onExpanded",
		value: function onExpanded(ev) {
			if (typeof _get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), "onExpanded", this) == "function") _get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), "onExpanded", this).call(this, ev);

			if (this.disabled !== true) {
				if (this.expanded) {
					this.controls.forEach(function (control) {
						control.element.hidden = false;
					});
				} else {
					this.controls.forEach(function (control) {
						control.element.hidden = true;
					});
				}
			}
		}
	}]);

	return Button;
}((0, _jsMixin2.default)(_Command2.default).with(_ariaExpanded2.default, _ariaPressed2.default));

exports.default = Button;

},{"../attributes/aria-expanded":13,"../attributes/aria-pressed.js":14,"./../type/boolean":46,"./abstract/Command":31,"@vestergaard-company/js-mixin":1}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsMixin = require("@vestergaard-company/js-mixin");

var _jsMixin2 = _interopRequireDefault(_jsMixin);

var _Input = require("./abstract/Input");

var _Input2 = _interopRequireDefault(_Input);

var _ariaChecked = require("../attributes/aria-checked.js");

var _ariaChecked2 = _interopRequireDefault(_ariaChecked);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Checkbox = function (_mix$with) {
  _inherits(Checkbox, _mix$with);

  function Checkbox() {
    _classCallCheck(this, Checkbox);

    return _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).apply(this, arguments));
  }

  return Checkbox;
}((0, _jsMixin2.default)(_Input2.default).with(_ariaChecked2.default));

exports.default = Checkbox;

},{"../attributes/aria-checked.js":12,"./abstract/Input":33,"@vestergaard-company/js-mixin":1}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _boolean = require("./../type/boolean");

var _boolean2 = _interopRequireDefault(_boolean);

var _Select2 = require("./abstract/Select");

var _Select3 = _interopRequireDefault(_Select2);

var _selector = require("./../utils/selector");

var _selector2 = _interopRequireDefault(_selector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function filter(cb, value) {
	var selectedOptions = [];

	cb.owns.forEach(function (listbox) {
		Array.prototype.forEach.call(listbox.element.children, function (option) {
			if (value === null) {
				option.hidden = true;
			} else if (option.innerHTML.indexOf(value) == 0) {
				option.hidden = false;
				if (option.innerHTML === value) {
					selectedOptions.push(option);
				}
			} else {
				option.hidden = true;
			}
		});
	});

	return selectedOptions;
}

function toggleListbox(ev) {
	if (ev) ev.preventDefault();

	if (this.expanded == _boolean2.default.IS_ACTIVE) {
		hideListbox.call(this);
	} else {
		showListbox.call(this);
	}
}

function updateValue(ev) {
	if (ev) ev.preventDefault();
	console.log(this._.combobox.input.value, ev.target.innerHTML, this._, ev);
	this._.combobox.input.value = ev.target.innerHTML;

	hideListbox.bind(this);
}

function updateListbox() {
	var options = filter(this, this._.combobox.input.value);

	options.forEach(function (i) {
		i.selected = true;
	});
}
function showListbox() {
	this.expanded = _boolean2.default.IS_ACTIVE;
	updateListbox.call(this);
}
function hideListbox() {
	this.expanded = _boolean2.default.IS_NOT_ACTIVE;
	filter(this);
}

/**
 * A combobox is a widget made up of the combination of two distinct elements: 
 * 
 * 1. a single-line textbox
 * 2. an associated pop-up element for helping users set the value of the textbox. 
 * 
 * The popup may be a listbox, grid, tree, or dialog. Many implementations also include a third 
 * optional element -- a graphical button adjacent to the textbox, indicating the availability of
 * the popup. Activating the button displays the popup if suggestions are available.
 * 
 * @extends Select
 * @param {Element} options.combobox.input 	Defaults to first input element inside the element
 * @param {Element} [options.combobox.open]	
 * 	Optional button to open the pop-up element, 
 * 	defaults to first button element inside the element
 */

var Combobox = function (_Select) {
	_inherits(Combobox, _Select);

	function Combobox() {
		var _ref;

		_classCallCheck(this, Combobox);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		// register custom elements
		var _this = _possibleConstructorReturn(this, (_ref = Combobox.__proto__ || Object.getPrototypeOf(Combobox)).call.apply(_ref, [this].concat(args)));

		_this._.registerCustomElement("combobox.input", _this.element.querySelector(_selector2.default.getDeepSelector("textbox")));
		_this._.registerCustomElement("combobox.open", _this.element.querySelector(_selector2.default.getDeepSelector("button")));

		if (_this._.combobox.open) {
			_this._.combobox.open.addEventListener("click", toggleListbox.bind(_this));
		}

		_this._.combobox.input.addEventListener("focus", showListbox.bind(_this));
		_this._.combobox.input.addEventListener("blur", hideListbox.bind(_this));
		_this._.combobox.input.addEventListener("input", updateListbox.bind(_this));
		// this.owns.forEach(i => i.element.addEventListener("click", updateValue.bind(this)));

		if (_this.autocomplete == "list") {
			// Indicates that the autocomplete behavior of the text input is to suggest a list of possible values
			// in a popup and that the suggestions are related to the string that is present in the textbox.

		} else if (_this.autocomplete == "both") {}
		// ndicates that the autocomplete behavior of the text input is to both show an inline 
		// completion string and suggest a list of possible values in a popup where the suggestions 
		// are related to the string that is present in the textbox.


		/** @todo determine what to do with default values */
		if (_this.expanded == undefined) _this.expanded = false;
		if (_this.hasPopup == undefined) _this.hasPopup = "listbox";
		return _this;
	}

	return Combobox;
}(_Select3.default);

exports.default = Combobox;

},{"./../type/boolean":46,"./../utils/selector":54,"./abstract/Select":38}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsMixin = require("@vestergaard-company/js-mixin");

var _jsMixin2 = _interopRequireDefault(_jsMixin);

var _Window = require("./abstract/Window");

var _Window2 = _interopRequireDefault(_Window);

var _ariaExpanded = require("../attributes/aria-expanded.js");

var _ariaExpanded2 = _interopRequireDefault(_ariaExpanded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mousetrap = require("mousetrap");

function focus(node) {
	// get all elements within given element
	var children = node.getElementsByTagName("*");

	// remove all elements who aren't accessible by a tab
	var focusableNodes = Array.prototype.filter.call(children, function (i) {
		return (i.tabIndex > -1 || i.contentEditable == "true") && !i.disabled && i.offsetWidth > 0 && i.offsetHeight > 0;
	});

	// sort elements in descending order
	focusableNodes.sort(function (a, b) {
		return a.tabIndex + b.tabIndex;
	});

	// document.activeElement.blur();
	// focusableEl.focus();
	return focusableNodes;
}

/**
 * @summary A child window within a webpage
 *
 * @desc
 * * Prompts the user to perform a specific action
 * * If it is designed to interrup, it is usually a modal. See [alertdialog]()
 * * It should have a label, it can be done with the `aria-label` attribute
 * * It should have at least one focusable descendant element.
 * * It should focus an element in the modal when displayed.
 * * It should manage focus of modal dialogs (keep the focus inside the open modal).
 *
 * ##### example
 *
 * <div role="dialog" aria-label="Window to confirm your acceptance of this world">
 *  Hello world!
 * 	<button focus type="button">Ok</button>
 * </div>
 */

var Dialog = function (_mix$with) {
	_inherits(Dialog, _mix$with);

	function Dialog() {
		var _ref;

		_classCallCheck(this, Dialog);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		// this.element.ownerDocument.addEventListener("focus", this._onFocus.bind(this), true);
		// this.element.ownerDocument.addEventListener("blur", this._onFocus.bind(this), true);
		var _this = _possibleConstructorReturn(this, (_ref = Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call.apply(_ref, [this].concat(args)));

		_this.addListener("key", _this.onClose.bind(_this), { key: "esc", target: _this.element.ownerDocument });

		var n = focus(document);
		var i = 0;
		// var t = setInterval(() => {
		// 	console.log(Mousetrap(document.activeElement).trigger("tab"));
		// 	// let i = n.indexOf(document.activeElement);
		// 	if(i < n.length) {
		// 		var f = new FocusEvent("focus");
		// 		n[i++].dispatchEvent(f);
		// 		// console.log(n[i++].focus());
		// 	}
		// }, 1000);
		return _this;
	}

	_createClass(Dialog, [{
		key: "_onFocus",
		value: function _onFocus(ev) {
			// ev.preventDefault();
			var n = focus(this.element.ownerDocument);
			if (n[n.length - 1] != ev.target) {
				ev.preventDefault();
				window.focus();
			}
			console.log(ev);
		}
	}, {
		key: "onClose",
		value: function onClose(ev) {
			if (ev) ev.preventDefault();
			this.element.hidden = true;

			this.dispatchEvent(new Event("close"));
		}
	}, {
		key: "_onHiddenMutation",
		value: function _onHiddenMutation(ev) {
			if (this.element.getAttribute("hidden") === "true") {
				var n = focus(this.element);
				n[0].focus();
				console.log(n, document.activeElement, n == document.activeElement);
			} else {}
		}
	}]);

	return Dialog;
}((0, _jsMixin2.default)(_Window2.default).with(_ariaExpanded2.default));

exports.default = Dialog;

},{"../attributes/aria-expanded.js":13,"./abstract/Window":41,"@vestergaard-company/js-mixin":1,"mousetrap":9}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Landmark2 = require("./abstract/Landmark");

var _Landmark3 = _interopRequireDefault(_Landmark2);

var _selector = require("./../utils/selector");

var _selector2 = _interopRequireDefault(_selector);

var _elements = require("./../utils/elements");

var _elements2 = _interopRequireDefault(_elements);

var _create = require("./../utils/create");

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = function (_Landmark) {
	_inherits(Form, _Landmark);

	function Form() {
		_classCallCheck(this, Form);

		return _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).apply(this, arguments));
	}

	_createClass(Form, [{
		key: "elements",
		get: function get() {
			// get native elements
			var selector = ["button", "fieldset", "input", "object", "output", "select", "textarea"].join(":not([role]),");
			var res = Array.from(this.elements.querySelectorAll(selector));

			var explicitRole = "";
			explicitRole += selector.getDeepRole("button");
			explicitRole += selector.getDeepRole("input");
			explicitRole += selector.getDeepRole("status");
			explicitRole += selector.getDeepRole("select");

			Array.prototype.forEach(this.elements.querySelectorAll(explicitRole), function (node) {
				return res.push(_elements2.default.get(node) || _create2.default.one(node));
			});
			console.log(res, explicitRole, selector);
			return res;
		}
	}]);

	return Form;
}(_Landmark3.default);

exports.default = Form;

},{"./../utils/create":49,"./../utils/elements":50,"./../utils/selector":54,"./abstract/Landmark":34}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = undefined;

var _managingFocus = require("./../utils/managingFocus");

var _managingFocus2 = _interopRequireDefault(_managingFocus);

var _Select2 = require("./abstract/Select");

var _Select3 = _interopRequireDefault(_Select2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var options = exports.options = {
  role: "listbox",
  selector: "[role='listbox']",
  selectorsWithImplicitRole: ["datalist", "select[multiple], select[size]:not([size='0']):not([size='1'])"]
};

// function clickOnOption(ev) {
// 	if(ev) ev.preventDefault();

// 	var clicked = this.options.find(i => i.element == ev.target);
// 	if (clicked) {
// 		let old = focus.get(this.options);
// 		focus.remove(old);
// 		focus.add(clicked);	
// 		updateSelected(this, clicked);
// 	}
// }

/**
 * 
 * 
 * ### Keyboard Support
 *
 * #### Default
 * | Key | Function |
 * | --- | -------- |
 * | Down Arrow | Moves focus to the next option <br/> If not multiselectable, it selects the focused option.
 * | Up Arrow 	| Moves focus to the previous option  <br/> If not multiselectable, it selects the focused option.
 * | Home 			|	Moves focus to the first option  <br/> If not multiselectable, it selects the focused option.
 * | End  			|	Moves focus to the last option  <br/> If not multiselectable, it selects the focused option.
 * 
 * #### Multiple selection
 * | Key | Function |
 * | --- | -------- |
 * | Space									| Changes the selection state of the focused option.
 * | Shift + Down Arrow 		| Moves focus to and selects the next option.
 * | Shift + Up Arrow 			| Moves focus to and selects the previous option.
 * | Control + Shift + Home |	Selects from the focused option to the beginning of the list.
 * | Control + Shift + End  | Selects from the focused option to the end of the list.
 * | Control + A 	          | Selects all options in the list. If all options are selected, unselects all options.
 * 
 * @extends Roletype
 * @fires Listbox#change
 * @fires Listbox#input
 */

var Listbox = function (_Select) {
  _inherits(Listbox, _Select);

  function Listbox() {
    var _ref;

    _classCallCheck(this, Listbox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = Listbox.__proto__ || Object.getPrototypeOf(Listbox)).call.apply(_ref, [this].concat(args)));
    // this.element.addEventListener("click", clickOnOption.bind(this));

    // this.addKeyListener("enter", clickOnOption.bind(this));
  }

  return Listbox;
}(_Select3.default);

exports.default = Listbox;

},{"./../utils/managingFocus":53,"./abstract/Select":38}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _boolean = require("./../type/boolean");

var _boolean2 = _interopRequireDefault(_boolean);

var _getActive = require("./../utils/getActive");

var _getActive2 = _interopRequireDefault(_getActive);

var _Input2 = require("./abstract/Input");

var _Input3 = _interopRequireDefault(_Input2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @extends Input
 */
var Option = function (_Input) {
	_inherits(Option, _Input);

	function Option() {
		var _ref;

		_classCallCheck(this, Option);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_ref = Option.__proto__ || Object.getPrototypeOf(Option)).call.apply(_ref, [this].concat(args)));

		_this.addListener("click", _this.onClick.bind(_this));
		_this.addListener("key", _this.onClick.bind(_this), { key: "enter", target: document });
		_this.addListener("key", _this.onClick.bind(_this), { key: "space", target: document });
		// this.addKeyListener("Enter", selectItem.bind(this));
		return _this;
	}

	_createClass(Option, [{
		key: "onClick",
		value: function onClick(ev) {
			if (typeof _get(Option.prototype.__proto__ || Object.getPrototypeOf(Option.prototype), "onClick", this) == "function") _get(Option.prototype.__proto__ || Object.getPrototypeOf(Option.prototype), "onClick", this).call(this, ev);
			if (ev) ev.preventDefault();

			if (this == (0, _getActive2.default)()) {
				this.selected = _boolean2.default.toggle(this.selected);
			}
		}
	}]);

	return Option;
}(_Input3.default);

exports.default = Option;

},{"./../type/boolean":46,"./../utils/getActive":51,"./abstract/Input":33}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Range2 = require("./abstract/Range.js");

var _Range3 = _interopRequireDefault(_Range2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // var objectPath = require("object-path");


function calcValueOfTrackPos(pos, track, thumb, min, max, step, orientation) {
	var positionKey = orientation == "vertical" ? "y" : "x";
	var range = (max - min) / step;
	// the full usable length of the track
	var trackSize = getTrackSize(track, thumb, orientation);
	// how many pixels  span for one step change
	var pxPerStep = trackSize / range;

	// bounding box of the track
	var trackCoor = track.getBoundingClientRect();
	// offset without track limits
	var offset = pos - trackCoor[positionKey] - thumb.clientWidth / 2;

	// update offset to the track limits if needed
	if (offset < 0) {
		offset = 0;
	} else if (offset > trackSize) {
		offset = trackSize;
	}

	// round the value to nearest increment
	return Math.round(offset / pxPerStep) * step + min;
}

function getTrackSize(track, thumb, orientation) {
	if (orientation == "vertical") {
		return track.clientHeight - thumb.clientHeight;
	} else {
		return track.clientWidth - thumb.clientWidth;
	}
}

function updatePosition(value, track, thumb, min, max, orientation) {
	var styleKey = orientation == "vertical" ? "top" : "left";
	var range = max - min;
	var pxPerStep = getTrackSize(track, thumb, orientation) / range;
	thumb.style[styleKey] = pxPerStep * (value - min) + "px";
}

/**
 * `slider` elements let the user specify a numeric value which must be no less
 * than a given value, and no more than another given value. The precise value,
 * however, is not considered important. This is typically represented using a
 * slider or dial control rather than a text entry box like the "number" input
 * type. Because this kind of widget is imprecise, it shouldn't typically be
 * used unless the control's exact value isn't important.
 *
 *
 *
 * @class
 * @extends Range
 *
 * @fires changed
 * @fires input
 *
 * @param {HTMLElement} element 				element to derive information nameFrom
 * @param {Object} [options] 						optional options
 * @param {HTMLElement} [options.slider.track]
 * 	The element that resembles the track, defaults to the elements parent
 * @param {Number|"any"} [options.step] 	increase/decrease amount
 * @return {Slider} thisArg
 *
 * @todo add support for "any"
 * @todo add events
 *
 * @example
 * <div class="track">
 *   <button type="button" role="slider" aria-label="slider" /><button>
 * </div>
 */

var Slider = function (_Range) {
	_inherits(Slider, _Range);

	function Slider() {
		var _ref;

		_classCallCheck(this, Slider);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		// register customs
		var _this = _possibleConstructorReturn(this, (_ref = Slider.__proto__ || Object.getPrototypeOf(Slider)).call.apply(_ref, [this].concat(args)));

		_this._.registerCustomElement("slider.track", _this.element.parentNode);
		_this._.registerCustomValue("step", 1);

		// set defaults
		if (null === _this.orientation) _this.orientation = "horizontal";
		if (null === _this.valueMin) {
			/**
    * @default [0]
    */
			_this.valueMin = 0;
		}
		if (null === _this.valueMax) _this.valueMax = 0;
		if (null === _this.valueNow && _this.valueMax < _this.valueMin) {
			_this.valueNow = _this.valueMin;
		} else if (null === _this.valueNow) {
			_this.valueNow = _this.valueMin + (_this.valueMax - _this.valueMin) / 2;
		}

		_this._unTrackMouseBinded = _this._unTrackMouse.bind(_this);
		_this._unTrackTouchBinded = _this._unTrackTouch.bind(_this);
		_this._onDrag = _this.onDrag.bind(_this);

		// todo: allow automatically setting valueText with some sugar

		_this.element.addEventListener("mousedown", _this._onMouseDown.bind(_this));
		_this.element.addEventListener("touchstart", _this._onTouchStart.bind(_this));
		_this._.slider.track.addEventListener("click", _this.onTrackClick.bind(_this));
		_this.addKeyListener("right", _this.stepUp.bind(_this));
		_this.addKeyListener("up", _this.stepUp.bind(_this));
		_this.addKeyListener("left", _this.stepDown.bind(_this));
		_this.addKeyListener("down", _this.stepDown.bind(_this));

		updatePosition(_this.valueNow, _this._.slider.track, _this.element, _this.valueMin, _this.valueMax, _this.orientation);
		return _this;
	}

	_createClass(Slider, [{
		key: "_onMouseDown",
		value: function _onMouseDown() {
			document.addEventListener("mousemove", this._onDrag);
			document.addEventListener("mouseup", this._unTrackMouseBinded);
		}
	}, {
		key: "_onTouchStart",
		value: function _onTouchStart() {
			document.addEventListener("touchmove", this._onDrag);
			document.addEventListener("touchend", this._unTrackTouchBinded);
			document.addEventListener("touchcancel", this._unTrackTouchBinded);
		}
	}, {
		key: "_unTrackMouse",
		value: function _unTrackMouse() {
			document.removeEventListener("mousemove", this._onDrag);
			document.removeEventListener("mouseup", this._unTrackMouseBinded);
		}
	}, {
		key: "_unTrackTouch",
		value: function _unTrackTouch() {
			document.removeEventListener("touchmove", this._onDrag);
			document.removeEventListener("touchend", this._unTrackMouse);
			document.removeEventListener("touchcancel", this._unTrackMouseBinded);
		}
	}, {
		key: "onDrag",
		value: function onDrag(ev) {
			ev.preventDefault();
			var pos = void 0;
			var positionKey = this.orientation == "vertical" ? "clientY" : "clientX";
			if (ev.changedTouches) {
				pos = ev.changedTouches[0][positionKey];
			} else {
				pos = ev[positionKey];
			}
			this.valueNow = calcValueOfTrackPos(pos, this._.slider.track, this.element, this.valueMin, this.valueMax, this._.step, this.orientation);
		}
	}, {
		key: "onTrackClick",
		value: function onTrackClick(ev) {
			this.onDrag(ev);
		}
	}, {
		key: "valueNow",
		get: function get() {
			return _get(Slider.prototype.__proto__ || Object.getPrototypeOf(Slider.prototype), "valueNow", this);
		},
		set: function set(val) {
			if (!this.disabled) {
				_set(Slider.prototype.__proto__ || Object.getPrototypeOf(Slider.prototype), "valueNow", val, this);
				updatePosition(val, this._.slider.track, this.element, this.valueMin, this.valueMax, this.orientation);
			}
		}
	}]);

	return Slider;
}(_Range3.default);

exports.default = Slider;

},{"./abstract/Range.js":35}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.options = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _jsMixin = require("@vestergaard-company/js-mixin");

var _jsMixin2 = _interopRequireDefault(_jsMixin);

var _Range2 = require("./abstract/Range");

var _Range3 = _interopRequireDefault(_Range2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var options = exports.options = {
	selector: "[role='spinbutton']",
	role: "spinbutton"
};

/**
 * A input field with 2 button to increase or decrease the numberical value
 * @extends Range
 *
 * @see {@link https://html.spec.whatwg.org/multipage/input.html#number-state-(type=number)}
 */

var Spinbutton = function (_Range) {
	_inherits(Spinbutton, _Range);

	function Spinbutton(el, options) {
		_classCallCheck(this, Spinbutton);

		// register custom elements
		/**
  * @name Spinbutton#_
  * @type {Object}
  * @prop {HTMLElement} [spinbutton.up]
  * @prop {HTMLElement} [spinbutton.down]
  */
		var _this = _possibleConstructorReturn(this, (Spinbutton.__proto__ || Object.getPrototypeOf(Spinbutton)).call(this, el, options));

		_this._.registerCustomElement("spinbutton.up");
		_this._.registerCustomElement("spinbutton.down");
		_this._.registerCustomValue("step", 1);

		// set defaults
		/**
  * @name Spinbutton#valueNow
  * @type {Number}
  * @default [0]
  */
		if (null === _this.valueNow) _this.valueNow = 0;

		// todo: allow automatically setting valueText with some sugar

		_this._.spinbutton.up.addEventListener("click", _this.stepUp.bind(_this));
		_this._.spinbutton.down.addEventListener("click", _this.stepDown.bind(_this));
		_this.addKeyListener("up", _this.stepUp.bind(_this));
		_this.addKeyListener("down", _this.stepDown.bind(_this));
		_this.element.value = _this.valueNow;
		return _this;
	}

	_createClass(Spinbutton, [{
		key: "valueNow",
		get: function get() {
			return _get(Spinbutton.prototype.__proto__ || Object.getPrototypeOf(Spinbutton.prototype), "valueNow", this);
		},
		set: function set(val) {
			_set(Spinbutton.prototype.__proto__ || Object.getPrototypeOf(Spinbutton.prototype), "valueNow", val, this);
			this.element.value = val;
		}
	}]);

	return Spinbutton;
}(_Range3.default);

exports.default = Spinbutton;

},{"./abstract/Range":35,"@vestergaard-company/js-mixin":1}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.options = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _elements = require("./../utils/elements");

var _elements2 = _interopRequireDefault(_elements);

var _Roletype = require("./abstract/Roletype");

var _Roletype2 = _interopRequireDefault(_Roletype);

var _jsMixin = require("@vestergaard-company/js-mixin");

var _jsMixin2 = _interopRequireDefault(_jsMixin);

var _ariaSelected = require("./../attributes/aria-selected");

var _ariaSelected2 = _interopRequireDefault(_ariaSelected);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var options = exports.options = {
	owned: "tablist", // parent role
	selector: "[role='tab']",
	role: "tab"
};

var Tab = function (_mix$with) {
	_inherits(Tab, _mix$with);

	function Tab() {
		var _ref;

		_classCallCheck(this, Tab);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _possibleConstructorReturn(this, (_ref = Tab.__proto__ || Object.getPrototypeOf(Tab)).call.apply(_ref, [this].concat(args)));
	}

	_createClass(Tab, [{
		key: "onSelect",
		value: function onSelect(ev) {
			var tablist = _elements2.default.getParent(this, options.owned, options.role);
			if (!tablist) return false;

			ev.preventDefault();

			var tabs = tablist.element.querySelectorAll(options.selector + "[aria-selected='true']");
			[].forEach.call(tabs, function (item) {
				var inst = _elements2.default.get(item);
				inst.selected = false;
				inst.controls[0].element.hidden = true;
			});

			if (typeof _get(Tab.prototype.__proto__ || Object.getPrototypeOf(Tab.prototype), "onSelect", this) == "function") _get(Tab.prototype.__proto__ || Object.getPrototypeOf(Tab.prototype), "onSelect", this).call(this, ev);

			this.controls[0].element.hidden = false;
		}
	}]);

	return Tab;
}((0, _jsMixin2.default)(_Roletype2.default).with(_ariaSelected2.default));

exports.default = Tab;

},{"./../attributes/aria-selected":15,"./../utils/elements":50,"./abstract/Roletype":36,"@vestergaard-company/js-mixin":1}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _elements = require("./../utils/elements.js");

var _elements2 = _interopRequireDefault(_elements);

var _Composite2 = require("./abstract/Composite");

var _Composite3 = _interopRequireDefault(_Composite2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tablist = function (_Composite) {
	_inherits(Tablist, _Composite);

	function Tablist() {
		var _ref;

		_classCallCheck(this, Tablist);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_ref = Tablist.__proto__ || Object.getPrototypeOf(Tablist)).call.apply(_ref, [this].concat(args)));

		_this.addKeyListener("left", _this.moveToPrev.bind(_this));
		_this.addKeyListener("right", _this.moveToNext.bind(_this));
		_this.addKeyListener("home", _this.moveToStart.bind(_this));
		_this.addKeyListener("end", _this.moveToEnd.bind(_this));
		return _this;
	}

	_createClass(Tablist, [{
		key: "moveToPrev",
		value: function moveToPrev(ev) {
			var prevInstance = _elements2.default.getPrev(_elements2.default.get(ev.target), this, options.owns);
			prevInstance.element.focus();
			ev.preventDefault();
		}
	}, {
		key: "moveToNext",
		value: function moveToNext(ev) {
			var nextInstance = _elements2.default.getNext(_elements2.default.get(ev.target), this, options.owns);
			nextInstance.element.focus();
			ev.preventDefault();
		}
	}, {
		key: "moveToStart",
		value: function moveToStart(ev) {
			var firstInstance = _elements2.default.getStart(_elements2.default.get(ev.target), this, options.owns);
			firstInstance.element.focus();
			ev.preventDefault();
		}
	}, {
		key: "moveToEnd",
		value: function moveToEnd(ev) {
			var lastInstance = _elements2.default.getEnd(_elements2.default.get(ev.target), this, options.owns);
			lastInstance.element.focus();
			ev.preventDefault();
		}
	}]);

	return Tablist;
}(_Composite3.default);

exports.default = Tablist;

},{"./../utils/elements.js":50,"./abstract/Composite":32}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Section2 = require("./abstract/Section");

var _Section3 = _interopRequireDefault(_Section2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tabpanel = function (_Section) {
  _inherits(Tabpanel, _Section);

  function Tabpanel() {
    _classCallCheck(this, Tabpanel);

    return _possibleConstructorReturn(this, (Tabpanel.__proto__ || Object.getPrototypeOf(Tabpanel)).apply(this, arguments));
  }

  return Tabpanel;
}(_Section3.default);

exports.default = Tabpanel;

},{"./abstract/Section":37}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.options = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Input2 = require("./abstract/Input");

var _Input3 = _interopRequireDefault(_Input2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var options = exports.options = {
	role: "textbox",
	selector: "[role='textbox']",
	selectorsWithImplicitRole: ["input[type='email']:not([list])", "input[type='tel']:not([list])", "input[type='text']:not([list])", "input[type='url']:not([list])", "textarea"]
};

/**
 * @todo Add options to keep or remove pasted styling
 */

var Textbox = function (_Input) {
	_inherits(Textbox, _Input);

	function Textbox() {
		var _ref;

		_classCallCheck(this, Textbox);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_ref = Textbox.__proto__ || Object.getPrototypeOf(Textbox)).call.apply(_ref, [this].concat(args)));

		if (!_this.multiline) {
			_this.addKeyListener("enter", _this._onEnter.bind(_this));
			_this.element.addEventListener("paste", _this._onPaste.bind(_this));
			// this.addMutationListener()
		}
		return _this;
	}

	_createClass(Textbox, [{
		key: "_onEnter",
		value: function _onEnter(ev) {
			ev.preventDefault();
		}
	}, {
		key: "_onPaste",
		value: function _onPaste(ev) {
			ev.preventDefault();
			var str = void 0;
			var data = ev.clipboardData.getData("text/plain").replace(/\r?\n|\r/g, "");
			var sel = window.getSelection();

			var c = this.element.childNodes;
			var a = sel.anchorNode;

			if (c && a && Array.prototype.indexOf.call(c, a) > -1) {
				str = [this.element.innerText.slice(0, sel.anchorOffset), data, this.element.innerText.slice(sel.focusOffset)];
				str = str.join("");
			} else {
				str = this.element.innerText + data;
			}

			this.element.innerText = str;
		}
	}, {
		key: "_onChildListMutation",
		value: function _onChildListMutation(mutation) {
			if (!this.multiline) {
				Array.prototype.forEach.call(mutation.addedNodes, function (n) {
					if (n.nodeName !== "#text") {
						var newChild = document.createTextNode(n.innerText);
						n.parentNode.replaceChild(newChild, n);
					}
				});
			}
		}
	}]);

	return Textbox;
}(_Input3.default);

exports.default = Textbox;

},{"./abstract/Input":33}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Widget2 = require("./Widget");

var _Widget3 = _interopRequireDefault(_Widget2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @extends Widget
 */
var Command = function (_Widget) {
  _inherits(Command, _Widget);

  function Command() {
    _classCallCheck(this, Command);

    return _possibleConstructorReturn(this, (Command.__proto__ || Object.getPrototypeOf(Command)).apply(this, arguments));
  }

  return Command;
}(_Widget3.default);

exports.default = Command;

},{"./Widget":40}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Widget2 = require("./Widget");

var _Widget3 = _interopRequireDefault(_Widget2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @extends Widget
 */
var Composite = function (_Widget) {
  _inherits(Composite, _Widget);

  function Composite() {
    _classCallCheck(this, Composite);

    return _possibleConstructorReturn(this, (Composite.__proto__ || Object.getPrototypeOf(Composite)).apply(this, arguments));
  }

  return Composite;
}(_Widget3.default);

exports.default = Composite;

},{"./Widget":40}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Widget2 = require("./Widget");

var _Widget3 = _interopRequireDefault(_Widget2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @extends Widget
 */
var Input = function (_Widget) {
  _inherits(Input, _Widget);

  function Input() {
    _classCallCheck(this, Input);

    return _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).apply(this, arguments));
  }

  return Input;
}(_Widget3.default);

exports.default = Input;

},{"./Widget":40}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Section2 = require("./Section");

var _Section3 = _interopRequireDefault(_Section2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @extends Section
 */
var Landmark = function (_Section) {
  _inherits(Landmark, _Section);

  function Landmark() {
    _classCallCheck(this, Landmark);

    return _possibleConstructorReturn(this, (Landmark.__proto__ || Object.getPrototypeOf(Landmark)).apply(this, arguments));
  }

  return Landmark;
}(_Section3.default);

exports.default = Landmark;

},{"./Section":37}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Widget2 = require("./Widget");

var _Widget3 = _interopRequireDefault(_Widget2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * **(Abstract role) SHOULD NOT USED IN THE DOM** 
 * An input representing a range of values that can be set by the user.
 *
 * @class
 * @extends Widget
 * @param {HTMLElement} element 				element to derive information nameFrom
 * @param {Object} [options] 						optional options
 * @param {Number|"any"} options.step 	increase/decrease value used
 * @return {Range} this
 * @see {@link https://w3c.github.io/aria/aria/aria.html#range}
 */
var Range = function (_Widget) {
	_inherits(Range, _Widget);

	function Range() {
		var _ref;

		_classCallCheck(this, Range);

		for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
			arg[_key] = arguments[_key];
		}

		/**
    * @name Range#_
   * @type {Object}
   * @prop {Number} [step=1]
    */

		var _this = _possibleConstructorReturn(this, (_ref = Range.__proto__ || Object.getPrototypeOf(Range)).call.apply(_ref, [this].concat(arg)));

		_this._.registerCustomValue("step", 1);
		return _this;
	}

	/**
  * Passtrough of an stringified `valueNow`
  * @type {String}
  * @see {@link AccessibleNode#valueNow}
  */


	_createClass(Range, [{
		key: "stepDown",


		/**
    * Decrease the value with the amount of 1 step
    * @param  {Event} ev Event when triggered through an elements
    */
		value: function stepDown(ev) {
			if (this.disabled) return;
			if (ev) ev.preventDefault();

			if (this.valueMin === null || this.valueNow > this.valueMin) {
				this.valueNow = this.valueNow - this._.step;
			}
		}

		/**
    * Increase the value with the amount of 1 step
    * @package
    * @param  {Event} ev Event when triggered through an elements
    */

	}, {
		key: "stepUp",
		value: function stepUp(ev) {
			if (this.disabled) return;
			if (ev) ev.preventDefault();

			if (this.valueMax === null || this.valueNow < this.valueMax) {
				this.valueNow = this.valueNow + this._.step;
			}
		}
	}, {
		key: "value",
		get: function get() {
			return this.valueNow.toString();
		},
		set: function set(val) {
			this.valueNow = val;
		}

		/**
   * Proxy of the `valueNow` value
   * @type {Number}
   * @see {@link AccessibleNode#valueNow}
   */

	}, {
		key: "valueAsNumber",
		get: function get() {
			return this.valueNow;
		},
		set: function set(val) {
			this.valueNow = val;
		}
	}]);

	return Range;
}(_Widget3.default);

exports.default = Range;

},{"./Widget":40}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AccessibleNode2 = require("./../../type/AccessibleNode");

var _AccessibleNode3 = _interopRequireDefault(_AccessibleNode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @extends AccessibleNode
 */
var Roletype = function (_AccessibleNode) {
	_inherits(Roletype, _AccessibleNode);

	/**
  * @extends AccessibleNode
  */
	function Roletype() {
		var _ref;

		_classCallCheck(this, Roletype);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_ref = Roletype.__proto__ || Object.getPrototypeOf(Roletype)).call.apply(_ref, [this].concat(args)));

		_this._onAriaDisabledMutation();
		return _this;
	}

	_createClass(Roletype, [{
		key: "_onAriaDisabledMutation",
		value: function _onAriaDisabledMutation() {
			// console.log(this.disabled, this.tabIndex, this.disabled && this.tabIndex && this.tabIndex >= 0);
			if (this.disabled && this.tabIndex >= 0) {
				this.tabIndex = undefined;
			} else if (!this.disabled && this.tabIndex < 0) {
				this.tabIndex = 0;
			}
		}
	}]);

	return Roletype;
}(_AccessibleNode3.default);

exports.default = Roletype;

},{"./../../type/AccessibleNode":43}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Structure2 = require("./Structure");

var _Structure3 = _interopRequireDefault(_Structure2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @extends Structure
 */
var Section = function (_Structure) {
  _inherits(Section, _Structure);

  function Section() {
    _classCallCheck(this, Section);

    return _possibleConstructorReturn(this, (Section.__proto__ || Object.getPrototypeOf(Section)).apply(this, arguments));
  }

  return Section;
}(_Structure3.default);

exports.default = Section;

},{"./Structure":39}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _managingFocus = require("./../../utils/managingFocus");

var _managingFocus2 = _interopRequireDefault(_managingFocus);

var _boolean = require("./../../type/boolean");

var _boolean2 = _interopRequireDefault(_boolean);

var _elements = require("./../../utils/elements");

var _elements2 = _interopRequireDefault(_elements);

var _Roletype2 = require("./Roletype");

var _Roletype3 = _interopRequireDefault(_Roletype2);

var _Option = require("./../Option.js");

var _Option2 = _interopRequireDefault(_Option);

var _jsMixin = require("@vestergaard-company/js-mixin");

var _jsMixin2 = _interopRequireDefault(_jsMixin);

var _selector = require("./../../utils/selector");

var _selector2 = _interopRequireDefault(_selector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * ### Keyboard Support
 *
 * #### Default
 * | Key | Function |
 * | --- | -------- |
 * | Down Arrow | Moves focus to the next option <br/> If not multiselectable, it selects the focused option.
 * | Up Arrow 	| Moves focus to the previous option  <br/> If not multiselectable, it selects the focused option.
 * | Home 			|	Moves focus to the first option  <br/> If not multiselectable, it selects the focused option.
 * | End  			|	Moves focus to the last option  <br/> If not multiselectable, it selects the focused option.
 *
 * #### Multiple selection
 * | Key | Function |
 * | --- | -------- |
 * | Space									| Changes the selection state of the focused option.
 * | Shift + Down Arrow 		| Moves focus to and selects the next option.
 * | Shift + Up Arrow 			| Moves focus to and selects the previous option.
 * | Control + Shift + Home |	Selects from the focused option to the beginning of the list.
 * | Control + Shift + End  | Selects from the focused option to the end of the list.
 * | Control + A 	          | Selects all options in the list. If all options are selected, unselects all options.
 *
 * ### Attributes
 * * `aria-selected`
 * 	* `true`
 * 		* is the current focussed element
 * 		* equals the value of `aria-activedescendant`
 * * `tabindex`
 * 	* allows usage of the element by keys when in focus
 * * `aria-activedescendant` equals ID of current focussed element
 * 
 * #### Multiple selection
 * * `aria-selected`
 *  * `true`
 * 		* can be applied to multiple element
 *    * not automatically applied to the focused element
 * 	* `false`
 * * `tabindex`
 * 	* allows usage of the element by keys when in focus
 * 
 * @summary A form widget that allows the user to make selections from a set of choices.
 * @extends Roletype
 */
var Select = function (_Roletype) {
	_inherits(Select, _Roletype);

	function Select() {
		var _ref;

		_classCallCheck(this, Select);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		// used for determining if logic should be executed
		var _this = _possibleConstructorReturn(this, (_ref = Select.__proto__ || Object.getPrototypeOf(Select)).call.apply(_ref, [this].concat(args)));

		_this.target = false;

		// when in focus, allow the element be controlled by the keys
		if (typeof _this.tabIndex !== "undefined") {
			_this.element.addEventListener("focus", hasTarget.bind(_this));
			_this.element.addEventListener("blur", lostTarget.bind(_this));
		}

		_this.addListener("key", _this.moveToStart.bind(_this), { key: "home", target: _this.element.ownerDocument });
		_this.addListener("key", _this.moveToPrev.bind(_this), { key: "up", target: _this.element.ownerDocument });
		_this.addListener("key", _this.moveToNext.bind(_this), { key: "down", target: _this.element.ownerDocument });
		_this.addListener("key", _this.moveToEnd.bind(_this), { key: "end", target: _this.element.ownerDocument });

		// this.addListener.call({ element: this.element.ownerDocument }, "home", this.moveToStart.bind(this));
		// this.addListener.call({ element: this.element.ownerDocument }, "up", this.moveToPrev.bind(this));
		// // this.addListener.call({ element: this.element.ownerDocument }, "shift + up", this.moveToNext.bind(this));
		// this.addListener.call({ element: this.element.ownerDocument }, "down", this.moveToNext.bind(this));
		// // this.addListener.call({ element: this.element.ownerDocument }, "shift + down", selectDown.bind(this));
		// this.addListener.call({ element: this.element.ownerDocument }, "end", this.moveToEnd.bind(this));

		var options = Array.from(_this.element.querySelectorAll(_selector2.default.getDeepSelector("option")));
		_this.options = [];
		options.forEach(function (node) {
			var value = new _Option2.default(node);

			value.addListener("click", _this.activeChanged.bind(_this));
			if (value.selected) {
				_managingFocus2.default.add(value);
			}
			_this.options.push(value);
		});
		return _this;
	}

	_createClass(Select, [{
		key: "moveToPrev",
		value: function moveToPrev(ev) {
			move(this, ev, _managingFocus2.default.prev);
		}
	}, {
		key: "moveToNext",
		value: function moveToNext(ev) {
			move(this, ev, _managingFocus2.default.next);
		}
	}, {
		key: "moveToStart",
		value: function moveToStart(ev) {
			move(this, ev, _managingFocus2.default.start);
		}
	}, {
		key: "moveToEnd",
		value: function moveToEnd(ev) {
			move(this, ev, _managingFocus2.default.end);
		}
	}, {
		key: "activeChanged",
		value: function activeChanged(ev) {
			// let option elements.get(ev.target);
			// let prevFocus = fc.get(this.options);
			// fc.remove(prevFocus);
			// fc.add(option);

			// if (this.activeDescendant) this.activeDescendant = option;

			// // update selected on keyevent when only one item can be selected
			// if (!this.multiselectable) {
			// 	fc.setSelected(prevFocus, undefined);
			// }
			// fc.setSelected(option, boolean.toggle(option.selected));
		}
	}]);

	return Select;
}(_Roletype3.default);

function move(ay, ev, func) {
	if (!ay.target) return;
	if (ev) ev.preventDefault();

	var prevFocus = _managingFocus2.default.get(ay.options);
	_managingFocus2.default.remove(prevFocus);
	// update selected on keyevent when only one item can be selected
	var currentFocus = func(ay.options, prevFocus);
	if (ay.activeDescendant) ay.activeDescendant = currentFocus;

	// update selected on keyevent when only one item can be selected
	if (!ay.multiselectable) {
		_managingFocus2.default.setSelected(prevFocus, undefined);
		_managingFocus2.default.setSelected(currentFocus, _boolean2.default.toggle(currentFocus.selected));
	}
}

function hasTarget() {
	this.target = true;
}
function lostTarget() {
	this.target = false;
}

exports.default = Select;

},{"./../../type/boolean":46,"./../../utils/elements":50,"./../../utils/managingFocus":53,"./../../utils/selector":54,"./../Option.js":24,"./Roletype":36,"@vestergaard-company/js-mixin":1}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Roletype2 = require("./Roletype");

var _Roletype3 = _interopRequireDefault(_Roletype2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @extends Roletype
 */
var Structure = function (_Roletype) {
  _inherits(Structure, _Roletype);

  function Structure() {
    _classCallCheck(this, Structure);

    return _possibleConstructorReturn(this, (Structure.__proto__ || Object.getPrototypeOf(Structure)).apply(this, arguments));
  }

  return Structure;
}(_Roletype3.default);

exports.default = Structure;

},{"./Roletype":36}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Roletype2 = require("./Roletype");

var _Roletype3 = _interopRequireDefault(_Roletype2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @extends Roletype
 */
var Widget = function (_Roletype) {
  _inherits(Widget, _Roletype);

  function Widget() {
    _classCallCheck(this, Widget);

    return _possibleConstructorReturn(this, (Widget.__proto__ || Object.getPrototypeOf(Widget)).apply(this, arguments));
  }

  return Widget;
}(_Roletype3.default);

exports.default = Widget;

},{"./Roletype":36}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Roletype2 = require("./Roletype");

var _Roletype3 = _interopRequireDefault(_Roletype2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @extends Roletype
 */
var Window = function (_Roletype) {
  _inherits(Window, _Roletype);

  function Window() {
    _classCallCheck(this, Window);

    return _possibleConstructorReturn(this, (Window.__proto__ || Object.getPrototypeOf(Window)).apply(this, arguments));
  }

  return Window;
}(_Roletype3.default);

exports.default = Window;

},{"./Roletype":36}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _boolean = require("./../type/boolean");

var _boolean2 = _interopRequireDefault(_boolean);

var _getActive = require("./../utils/getActive");

var _getActive2 = _interopRequireDefault(_getActive);

var _Input2 = require("./abstract/Input");

var _Input3 = _interopRequireDefault(_Input2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @extends Input
 */
var Option = function (_Input) {
	_inherits(Option, _Input);

	function Option() {
		var _ref;

		_classCallCheck(this, Option);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_ref = Option.__proto__ || Object.getPrototypeOf(Option)).call.apply(_ref, [this].concat(args)));

		_this.addListener("click", _this.onClick.bind(_this));
		_this.addListener("key", _this.onClick.bind(_this), { key: "enter", target: document });
		_this.addListener("key", _this.onClick.bind(_this), { key: "space", target: document });
		// this.addKeyListener("Enter", selectItem.bind(this));
		return _this;
	}

	_createClass(Option, [{
		key: "onClick",
		value: function onClick(ev) {
			if (typeof _get(Option.prototype.__proto__ || Object.getPrototypeOf(Option.prototype), "onClick", this) == "function") _get(Option.prototype.__proto__ || Object.getPrototypeOf(Option.prototype), "onClick", this).call(this, ev);
			if (ev) ev.preventDefault();

			if (this == (0, _getActive2.default)()) {
				this.selected = _boolean2.default.toggle(this.selected);
			}
		}
	}]);

	return Option;
}(_Input3.default);

exports.default = Option;

},{"./../type/boolean":46,"./../utils/getActive":51,"./abstract/Input":33}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _objectPath = require("object-path");

var _objectPath2 = _interopRequireDefault(_objectPath);

var _elements = require("../utils/elements");

var _elements2 = _interopRequireDefault(_elements);

var _Base2 = require("./../role/Base.js");

var _Base3 = _interopRequireDefault(_Base2);

var _DOMString = require("./DOMString");

var _DOMString2 = _interopRequireDefault(_DOMString);

var _AccessibleNodeList = require("./AccessibleNodeList");

var _AccessibleNodeList2 = _interopRequireDefault(_AccessibleNodeList);

var _boolean = require("./boolean");

var _boolean2 = _interopRequireDefault(_boolean);

var _double = require("./double");

var _double2 = _interopRequireDefault(_double);

var _long = require("./long");

var _long2 = _interopRequireDefault(_long);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Types


/**
 * Based on the AOM spec
 * @class
 * @extends Base
 */
var AccessibleNode = function (_Base) {
	_inherits(AccessibleNode, _Base);

	function AccessibleNode() {
		var _ref;

		_classCallCheck(this, AccessibleNode);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		/* ****************** ACCESSIBLE LABEL AND DESCRIPTION ****************** */

		/**
   * Returns an list with AccessibleNode instances that labels the current element
   * 
   * @see {@link AccessibleNode#describedBy}
   * @see https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby
   * @type {AccessibleNodeList}
   */
		var _this = _possibleConstructorReturn(this, (_ref = AccessibleNode.__proto__ || Object.getPrototypeOf(AccessibleNode)).call.apply(_ref, [this].concat(args)));

		_this.labelledBy = new _AccessibleNodeList2.default(_this, "aria-labelledBy");

		/**
   * Returns an list with AccessibleNode instances that describes the current element
   * 
   * @see {@link AccessibleNode#labeledBy}
   * @see https://www.w3.org/TR/wai-aria-1.1/#aria-describedby
   * @type {AccessibleNodeList}
   */
		_this.describedBy = new _AccessibleNodeList2.default(_this, "aria-describedBy");

		/* ************** END OF ACCESSIBLE LABEL AND DESCRIPTION ************** */

		/* ************************ OTHER RELATIONSHIPS ************************ */

		/**
   * Returns an list with AccessibleNode instances whose contents or presence are controlled by
   * the current element.
   * 
   * @see {@link AccessibleNode#owns}
   * @see https://www.w3.org/TR/wai-aria-1.1/#aria-controls
   * @type {AccessibleNodeList}
   */
		_this.controls = new _AccessibleNodeList2.default(_this, "aria-controls");

		/**
   * Contains the next element(s) in an alternate reading order of content which, at the user's 
   * discretion, allows assistive technology to override the general default of reading in
   * document source order.
   * 
   * @see https://www.w3.org/TR/wai-aria-1.1/#aria-flowto
   * @type {AccessibleNodeList}
   */
		_this.flowTo = new _AccessibleNodeList2.default(_this, "aria-flowto");

		/**
   * Contains children who's ID are referenced inside the `aria-owns` attribute
   * @see https://www.w3.org/TR/wai-aria-1.1/#aria-owns
   * @type {AccessibleNodeList}
   */
		_this.owns = new _AccessibleNodeList2.default(_this, "aria-owns");

		/* ********************* END OF OTHER RELATIONSHIPS ********************* */

		_this._.mutations.push(["role", "aria-activedescendant", "aria-atomic", "aria-autocomplete", "aria-busy", "aria-checked", "aria-colcount", "aria-colindex", "aria-colspan", "aria-controls", "aria-current", "aria-describedby", "aria-details", "aria-disabled", "aria-dropeffect", "aria-errormessage", "aria-expanded", "aria-flowto", "aria-grabbed", "aria-haspopup", "aria-hidden", "aria-invalid", "aria-keyshortcuts", "aria-label", "aria-labelledby", "aria-level", "aria-live", "aria-modal", "aria-multiline", "aria-multiselectable", "aria-orientation", "aria-owns", "aria-placeholder", "aria-posinset", "aria-pressed", "aria-readonly", "aria-relevant", "aria-required", "aria-roledescription", "aria-rowcount", "aria-rowindex", "aria-rowspan", "aria-selected", "aria-setsize", "aria-sort", "aria-valuemax", "aria-valuemin", "aria-valuenow", "aria-valuetext"]);
		return _this;
	}

	return AccessibleNode;
}(_Base3.default);

Object.defineProperties(AccessibleNode.prototype,
/** @lends AccessibleNode.prototype */
{
	/** 
 * Defines a type it represents, e.g. `tab`
 * 
 * @see https://www.w3.org/TR/wai-aria-1.1/#roles
 * @type {String}
 */
	"role": {
		enumerable: true,
		set: function set(str) {
			return _DOMString2.default.set(this, "role", str);
		},
		get: function get() {
			return _DOMString2.default.get(this, "role");
		}
	},

	/** 
  * Defines a human-readable, author-localized description for the role
  * 
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-roledescription
  * @type {String}
  */
	"roleDescription": {
		enumerable: true,
		set: function set(str) {
			return _DOMString2.default.set(this, "aria-roleDescription", str);
		},
		get: function get() {
			return _DOMString2.default.get(this, "aria-roleDescription");
		}
	},

	/* ******************* ACCESSIBLE LABEL AND DESCRIPTION ******************* */

	/** 
 * Defines a string value that labels the current element.
 * 
 * @see https://www.w3.org/TR/wai-aria-1.1/#aria-label
 * @type {String} 
 */
	"label": {
		enumerable: true,
		set: function set(str) {
			return _DOMString2.default.set(this, "aria-label", str);
		},
		get: function get() {
			return _DOMString2.default.get(this, "aria-label");
		}
	},

	/* *************** END OF ACCESSIBLE LABEL AND DESCRIPTION *************** */

	/* ********************* GLOBAL STATES AND PROPERTIES ********************* */

	/** 
  * Indicates the element that represents the current item within a container or set of related elements.
  * 
  * Possible strings are:
  * * `page`, used to indicate a link within a set of pagination links, 
  * 		where the link is visually styled to represent the currently-displayed page.
  * * `step`, used to indicate a link within a step indicator for a step-based process,
  * 		where the link is visually styled to represent the current step.
  * * `location`, used to indicate the image that is visually highlighted as the current component of a flow chart.
  * * `date`, used to indicate the current date within a calendar.
  * * `time`, used to indicate the current time within a timetable.
  * 
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-current
  * @type { Boolean | String }
  */
	"current": {
		enumerable: true,
		set: function set(str) {
			return _DOMString2.default.set(this, "aria-current", str);
		},
		get: function get() {
			return _DOMString2.default.get(this, "aria-current");
		}
	},

	/* ***************** END OF GLOBAL STATES AND PROPERTIES ***************** */

	/* ************************** WIDGET PROPERTIES ************************** */

	/**
  * Indicates whether inputting text could trigger display of one or more predictions of the user's
  * intended value for an input and specifies how predictions would be presented if they are made.
  * 
  * The behavior during input is depends on the provided value, it follows beneath table.
  * 
  * | Value  | 	Description |
  * | ------ | --- |
  * | inline | Text suggesting may be dynamically inserted after the caret.
  * | list   | A collection of values that could complete the provided input is displayed.
  * | both   | Implements `inline` and `list`
  * | none   | No prediction is shown
  * 
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-autocomplete
  * @type {?String}
  */
	"autocomplete": {
		enumerable: true,
		set: function set(str) {
			return _DOMString2.default.set(this, "aria-autocomplete", str);
		},
		get: function get() {
			return _DOMString2.default.get(this, "aria-autocomplete");
		}
	},

	/**
  * Returns/sets the visibility of the element who is exposed to an accessibility API.
  * @see {@link AccessibleNode#disabled}
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-hidden
  * @type {?Boolean}
  */
	"hidden": {
		enumerable: true,
		set: function set(str) {
			return _boolean2.default.set(this, "aria-hidden", str);
		},
		get: function get() {
			return _boolean2.default.get(this, "aria-hidden");
		}
	},

	/**
  * Indicates keyboard shortcuts that an author has implemented to activate or
  * give focus to an element.
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-keyshortcuts
  * @type {?String}
  */
	"keyShortcuts": {
		enumerable: true,
		set: function set(str) {
			return _DOMString2.default.set(this, "aria-keyShortcuts", str);
		},
		get: function get() {
			return _DOMString2.default.get(this, "aria-keyShortcuts");
		}
	},

	/** 
  * Indicates whether an element is modal when displayed.
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-modal
  * @type {?Boolean}
  */
	"modal": {
		enumerable: true,
		set: function set(str) {
			return _boolean2.default.set(this, "aria-modal", str);
		},
		get: function get() {
			return _boolean2.default.get(this, "aria-modal");
		}
	},

	/** 
  * Indicates whether a text box accepts multiple lines of input or only a single line.
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-multiline
  * @type {?Boolean}
  */
	"multiline": {
		enumerable: true,
		set: function set(str) {
			return _boolean2.default.set(this, "aria-multiline", str);
		},
		get: function get() {
			return _boolean2.default.get(this, "aria-multiline");
		}
	},

	/**
  * Indicates that the user may select more than one item from the current selectable descendants.
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-multiselectable
  * @type {?Boolean}
  */
	"multiselectable": {
		enumerable: true,
		set: function set(str) {
			return _boolean2.default.set(this, "aria-multiselectable", str);
		},
		get: function get() {
			return _boolean2.default.get(this, "aria-multiselectable");
		}
	},

	/**
  * Indicates whether the element's orientation is `horizontal`, `vertical`, or `null`.
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-orientation
  * @type {?String}
  */
	"orientation": {
		enumerable: true,
		set: function set(str) {
			return _DOMString2.default.set(this, "aria-orientation", str);
		},
		get: function get() {
			return _DOMString2.default.get(this, "aria-orientation");
		}
	},

	/**
  * Indicates that the user may select more than one item from the current selectable descendants.
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-readonly
  * @type {?Boolean}
  */
	"readOnly": {
		enumerable: true,
		set: function set(str) {
			return _boolean2.default.set(this, "aria-readOnly", str);
		},
		get: function get() {
			return _boolean2.default.get(this, "aria-readOnly");
		}
	},

	/**
  * Indicates that user input is required on the element before a form may be submitted.
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-required
  * @type {?Boolean}
  */
	"required": {
		enumerable: true,
		set: function set(str) {
			return _boolean2.default.set(this, "aria-required", str);
		},
		get: function get() {
			return _boolean2.default.get(this, "aria-required");
		}
	},

	/**
  * Indicates that user input is required on the element before a form may be submitted.
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-selected
  * @type {?Boolean}
  */
	"selected": {
		enumerable: true,
		set: function set(str) {
			return _boolean2.default.set(this, "aria-selected", str);
		},
		get: function get() {
			return _boolean2.default.get(this, "aria-selected");
		}
	},

	/**
  * Indicates if items in a table or grid are sorted in ascending or descending order.  
  * Possible values are `acending`, `descending`, `none`, `other` or `null`.
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-sort
  * @type {?Boolean}
  */
	"sort": {
		enumerable: true,
		set: function set(str) {
			return _DOMString2.default.set(this, "aria-sort", str);
		},
		get: function get() {
			return _DOMString2.default.get(this, "aria-sort");
		}
	},

	/* *********************** END OF WIDGET PROPERTIES *********************** */

	/* ***************************** WIDGET STATES **************************** */

	/**
  * Indicates the current "checked" state of a {@link Widget}, among {@link Radio} and {@link Checkbox}
  * @see {@link AccessibleNode#pressed}
  * @see {@link AccessibleNode#selected}
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-pressed
  * @type {?String}
  */
	"checked": {
		enumerable: true,
		set: function set(str) {
			return _DOMString2.default.set(this, "aria-checked", str);
		},
		get: function get() {
			return _DOMString2.default.get(this, "aria-checked");
		}
	},

	/**
  * Indicates whether the element, or another grouping element it controls, 
  * is currently expanded or collapsed.
  * 
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-expanded
  * @type {?Boolean}
  */
	"expanded": {
		enumerable: true,
		set: function set(str) {
			return _boolean2.default.set(this, "aria-expanded", str);
		},
		get: function get() {
			return _boolean2.default.get(this, "aria-expanded");
		}
	},

	/**
  * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
  * 
  * @see {@link AccessibleNode#hidden}
  * @see {@link AccessibleNode#readonly}
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-disabled
  * @type {?Boolean}
  */
	"disabled": {
		enumerable: true,
		set: function set(str) {
			return _boolean2.default.set(this, "aria-disabled", str);
		},
		get: function get() {
			return _boolean2.default.get(this, "aria-disabled");
		}
	},

	/**
  * Indicates the entered value does not conform to the format expected by the application.
  * 
  * @see {@link AccessibleNode#errorMessage}
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage
  * @type {?String} 
  */
	"invalid": {
		enumerable: true,
		set: function set(str) {
			return _DOMString2.default.set(this, "aria-invalid", str);
		},
		get: function get() {
			return _DOMString2.default.get(this, "aria-invalid");
		}
	},

	/**
  * Indicates the availability and type of interactive popup element, such as menu or dialog,
  * that can be triggered by an element.
  * 
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup
  * @type {?String}
  */
	"hasPopUp": {
		enumerable: true,
		set: function set(str) {
			return _DOMString2.default.set(this, "aria-haspopup", str);
		},
		get: function get() {
			return _DOMString2.default.get(this, "aria-haspopup");
		}
	},

	/**
  * Indicates the current "checked" state of a {@link Widget}, among {@link Radio} and {@link Checkbox}
  * 
  * @see {@link AccessibleNode#pressed}
  * @see {@link AccessibleNode#selected}
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-pressed
  * @type {?String}
  */
	"pressed": {
		enumerable: true,
		set: function set(str) {
			return _DOMString2.default.set(this, "aria-pressed", str);
		},
		get: function get() {
			return _DOMString2.default.get(this, "aria-pressed");
		}
	},

	/* ************************* END OF WIDGET STATES ************************* */

	/* **************************** CONTROL VALUES **************************** */

	/** 
  * Returns / sets the human readable text alternative of {@link #aria-valuenow} for a {@link Range} widget.
  * 
  * @see {@link https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext}
  * @type {?String}
  */
	"valueText": {
		enumerable: true,
		set: function set(str) {
			return _DOMString2.default.set(this, "aria-valueText", str);
		},
		get: function get() {
			return _DOMString2.default.get(this, "aria-valueText");
		}
	},

	/**
  * Returns / sets a short hint intended to aid the user with data entry when the control has no value.
  * A hint could be a sample value or a brief description of the expected format.
  * 
  * @see {@link https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder}
  * @type {?String}
  */
	"placeholder": {
		enumerable: true,
		set: function set(str) {
			return _DOMString2.default.set(this, "aria-placeholder", str);
		},
		get: function get() {
			return _DOMString2.default.get(this, "aria-placeholder");
		}
	},

	/** 
  * Returns / sets the current value for a {@link Range} widget.
  * 
  * @see {@link https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow}
  * @type {?Number}
  */
	"valueNow": {
		enumerable: true,
		set: function set(val) {
			return _double2.default.set(this, "aria-valuenow", val);
		},
		get: function get() {
			return _double2.default.get(this, "aria-valuenow");
		}
	},

	/** 
  * Returns / sets the minimum allowed value for a {@link Range} widget.
  * 
  * @see {@link https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin}
  * @type {?Number}
  */
	"valueMin": {
		enumerable: true,
		set: function set(val) {
			return _double2.default.set(this, "aria-valuemin", val);
		},
		get: function get() {
			return _double2.default.get(this, "aria-valuemin");
		}
	},

	/** 
  * Returns / sets the maximum allowed value for a {@link Range} widget.
  * 
  * @see {@link https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax}
  * @type {?Number}
  */
	"valueMax": {
		enumerable: true,
		set: function set(val) {
			return _double2.default.set(this, "aria-valuemax", val);
		},
		get: function get() {
			return _double2.default.get(this, "aria-valuemax");
		}
	},

	/* ************************ END OF CONTROL VALUES ************************ */

	/* ************************* OTHER RELATIONSHIPS ************************* */

	/**
  * Returns / sets the AccessibleNode of the currently active element when focus is on current element.
  * 
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-activedescendant
  * @type {?AcccessibleNode}
  */
	"activeDescendant": {
		enumerable: true,
		set: function set(ay) {
			return setAccessibleNode(this, "aria-activedescendant", ay);
		},
		get: function get() {
			return getAccessibleNode(this, "aria-activedescendant");
		}
	},

	/**
  * Returns / sets an AccessibleNode that provides a detailed, extended description 
  * for the current element.
  * 
  * @see {@link AccessibleNode#describedBy}
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-details
  * @type {?AcccessibleNode}
  */
	"details": {
		enumerable: true,
		set: function set(ay) {
			return setAccessibleNode(this, "aria-details", ay);
		},
		get: function get() {
			return getAccessibleNode(this, "aria-details");
		}
	},

	/**
  * Returns / sets an AccessibleNode that provides an error message for the current element.
  * 
  * @see {@link AccessibleNode#invalid}
  * @see {@link AccessibleNode#describedBy}
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage
  * @type {?AcccessibleNode}
  */
	"errorMessage": {
		enumerable: true,
		set: function set(ay) {
			return setAccessibleNode(this, "aria-errormessage", ay);
		},
		get: function get() {
			return getAccessibleNode(this, "aria-errormessage");
		}
	},

	/* ********************** END OF OTHER RELATIONSHIPS ********************** */

	/* ***************************** COLLECTIONS ***************************** */

	/**
  * Returns / sets the total number of columns in a {@link Table}, {@link Grid}, or {@link Treegrid}.
  * 
  * @see {@link AccessibleNode#colIndex}
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-setsize
  * @type {?Integer} 
  */
	"colCount": {
		enumerable: true,
		set: function set(val) {
			return _long2.default.set(this, "aria-colcount", val);
		},
		get: function get() {
			return _long2.default.get(this, "aria-colcount");
		}
	},

	/**
  * Defines an element's column index or position with respect to the total number of columns 
  * within a {@link Table}, {@link Grid}, or {@link Treegrid}.
  * 
  * @see {@link AccessibleNode#colCount}
  * @see {@link AccessibleNode#colSpan}
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-colindex
  * @type {?Integer}
  */
	"colIndex": {
		enumerable: true,
		set: function set(val) {
			return _long2.default.set(this, "aria-colindex", val);
		},
		get: function get() {
			return _long2.default.get(this, "aria-colindex");
		}
	},

	/**
  * Defines the number of columns spanned by a cell or gridcell
  * within a {@link Table}, {@link Grid}, or {@link Treegrid}.
  * 
  * @see {@link AccessibleNode#colIndex}
  * @see {@link AccessibleNode#rowSpan}
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-colspan
  * @type {?Integer}
  */
	"colSpan": {
		enumerable: true,
		set: function set(val) {
			return _long2.default.set(this, "aria-colspan", val);
		},
		get: function get() {
			return _long2.default.get(this, "aria-colspan");
		}
	},

	/**
  * Defines an element's number or position in the current set of {@link listitem}s or {@link treeitem}s.
  * Not required if all elements in the set are present in the DOM.
  * 
  * @see {@link AccessibleNode#setSize}
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-posinset
  * @type {?Integer}
  */
	"posInSet": {
		enumerable: true,
		set: function set(val) {
			return _long2.default.set(this, "aria-posinset", val);
		},
		get: function get() {
			return _long2.default.get(this, "aria-posinset");
		}
	},

	/**
  * Defines the total number of rows in a {@link Table}, {@link Grid}, or {@link Treegrid}.
  * 
  * @see {@link AccessibleNode#rowIndex}
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount
  * @type {?Integer}
  */
	"rowCount": {
		enumerable: true,
		set: function set(val) {
			return _long2.default.set(this, "aria-rowcount", val);
		},
		get: function get() {
			return _long2.default.get(this, "aria-rowcount");
		}
	},

	/**
  * Defines an element's row index or position with respect to the total number of rows 
  * within a  {@link Table}, {@link Grid}, or {@link Treegrid}.
  * 
  * @see {@link AccessibleNode#rowCount}
  * @see {@link AccessibleNode#rowSpan}
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex
  * @type {?Integer}
  */
	"rowIndex": {
		enumerable: true,
		set: function set(val) {
			return _long2.default.set(this, "aria-rowindex", val);
		},
		get: function get() {
			return _long2.default.get(this, "aria-rowindex");
		}
	},

	/**
  * Defines the number of rows spanned by a cell or gridcell
  * within a {@link Table}, {@link Grid}, or {@link Treegrid}.
  * 
  * @see {@link AccessibleNode#rowIndex}
  * @see {@link AccessibleNode#colSpan}
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan
  * @type {?Integer}
  */
	"rowSpan": {
		enumerable: true,
		set: function set(val) {
			return _long2.default.set(this, "aria-rowspan", val);
		},
		get: function get() {
			return _long2.default.get(this, "aria-rowspan");
		}
	},

	/**
  * Defines the number of items in the current set of listitems or treeitems.
  * Not required if **all** elements in the set are present in the DOM.
  * @see {@link AccessibleNode#posInSet}
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-setsize
  * @type {?Integer}
  */
	"setSize": {
		enumerable: true,
		set: function set(val) {
			return _long2.default.set(this, "aria-setsize", val);
		},
		get: function get() {
			return _long2.default.get(this, "aria-setsize");
		}
	},

	/**
  * Defines the hierarchical level of an element within a structure.
  * E.g. `<h1><h1/>` equals `<div role="heading" aria-level="1"></div>`
  * 
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-level
  * @type {?Integer}
  */
	"level": {
		enumerable: true,
		set: function set(val) {
			return _long2.default.set(this, "aria-level", val);
		},
		get: function get() {
			return _long2.default.get(this, "aria-level");
		}
	}

	/* ************************** END OF COLLECTIONS ************************** */
});

function setAccessibleNode(ay, attribute, an) {
	if (!an) return ay.element.removeAttribute(attribute);

	if (!(an instanceof AccessibleNode)) {
		throw new Error("It must be an instance of AccessibleNode");
	}
	if (!an.element.id) {
		throw new Error("Element must have an ID");
	}

	ay.element.setAttribute(attribute, an.element.id);
}
function getAccessibleNode(ay, attribute) {
	var id = ay.element.getAttribute(attribute);
	if (!id) return;

	return _elements2.default.get(ay.element.ownerDocument.getElementById(id));
}

exports.default = AccessibleNode;

},{"../utils/elements":50,"./../role/Base.js":17,"./AccessibleNodeList":44,"./DOMString":45,"./boolean":46,"./double":47,"./long":48,"object-path":10}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _elements = require("../utils/elements");

var _elements2 = _interopRequireDefault(_elements);

var _AccessibleNode = require("./AccessibleNode");

var _AccessibleNode2 = _interopRequireDefault(_AccessibleNode);

var _create = require("./../utils/create");

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
	function ExtendableBuiltin() {
		var instance = Reflect.construct(cls, Array.from(arguments));
		Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
		return instance;
	}

	ExtendableBuiltin.prototype = Object.create(cls.prototype, {
		constructor: {
			value: cls,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});

	if (Object.setPrototypeOf) {
		Object.setPrototypeOf(ExtendableBuiltin, cls);
	} else {
		ExtendableBuiltin.__proto__ = cls;
	}

	return ExtendableBuiltin;
}

var AccessibleNodeListCon = function (_extendableBuiltin2) {
	_inherits(AccessibleNodeListCon, _extendableBuiltin2);

	function AccessibleNodeListCon() {
		var _ref;

		_classCallCheck(this, AccessibleNodeListCon);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _possibleConstructorReturn(this, (_ref = AccessibleNodeListCon.__proto__ || Object.getPrototypeOf(AccessibleNodeListCon)).call.apply(_ref, [this].concat(args)));
	}

	_createClass(AccessibleNodeListCon, [{
		key: "item",
		value: function item(index) {
			return this[index];
		}
	}, {
		key: "add",
		value: function add(AccessibleNode) {
			var before = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			if (before !== null) {
				var beforeIndex = this.indexOf(before);
				if (beforeIndex > -1) {
					return this.splice(beforeIndex - 1, 0, AccessibleNode);
				}
			}
			return this.push(AccessibleNode);
		}
	}, {
		key: "remove",
		value: function remove(index) {
			return this.pop(index);
		}
	}]);

	return AccessibleNodeListCon;
}(_extendableBuiltin(Array));

function getIds(node, attribute) {
	var idString = node.getAttribute(attribute);

	if (!idString) return new AccessibleNodeListCon();

	return new AccessibleNodeListCon(idString.split(" "));
}

/**
 * 
 */
function AccessibleNodeList(ay, attribute) {
	// Object.defineProperties(this, {
	// 	_element: { value: ay.element, enumerable: false },
	// 	_attr: { value: attribute, enumerable: false }
	// });

	// this._value = this._element.getAttribute(this._attr);
	// if(!this._value) this._value = "";
	var ids = getIds(ay.element, attribute);

	// // The result can be accessed through the `m`-variable.
	// ids.forEach((id) => {
	// 	var el = document.getElementById(id);
	// 	if(elements.has(el)) {
	// 		this.add(elements.get(el));
	// 	} else {
	// 		elements.set(el, new AccessibleNode.default(el));
	// 		this.add(elements.get(el));
	// 		// debugger;
	// 		// todo: create new instance and return that .
	// 	}
	// });

	var arrayChangeHandler = {
		get: function get(target, property) {
			// element is requested trought target[Number]
			if (!isNaN(property) && target[property]) {
				var el = document.getElementById(target[property]);

				if (!el) {
					// throw new Error("Element not found");
				}

				var autotility = void 0;
				// property is index in this case
				if (el) {
					autotility = _elements2.default.get(el);
				}
				if (!autotility) {
					autotility = _create2.default.one(el);
				}
				return autotility;
			}

			return target[property];
		},
		set: function set(target, property, value) {
			// adding or changing a value inside the array
			if (!isNaN(property)) {
				// is of valid type
				if (value instanceof _AccessibleNode2.default) {
					if (!value.element.id) {
						throw new Error("The element must have an ID");
					}
					target[property] = value.element.id;
					return true;
				}

				throw new Error("Only instances of AccessibleNode are allowed");
			}

			target[property] = value;
			// you have to return true to accept the changes
			return true;
		}
	};

	return new Proxy(ids, arrayChangeHandler);
}

exports.default = AccessibleNodeList;

},{"../utils/elements":50,"./../utils/create":49,"./AccessibleNode":43}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.get = get;
exports.set = set;
exports.toggle = toggle;
var IS_ACTIVE = exports.IS_ACTIVE = "true",
    IS_NOT_ACTIVE = exports.IS_NOT_ACTIVE = "false";

function get(ay, attributeName) {
	if (!ay.element.hasAttribute(attributeName)) return;
	return ay.element.getAttribute(attributeName);
}

function set(ay, attributeName, status) {
	if (status == undefined) {
		ay.element.removeAttribute(attributeName);
	} else {
		ay.element.setAttribute(attributeName, status);
	}

	return status;
}

/**
* Returns the opposite state of the attribute
* @return {String} New state
*/
function toggle(state) {
	if (state == IS_ACTIVE) {
		state = IS_NOT_ACTIVE;
	} else {
		state = IS_ACTIVE;
	}
	return state;
}

exports.default = { IS_ACTIVE: IS_ACTIVE, IS_NOT_ACTIVE: IS_NOT_ACTIVE, get: get, set: set, toggle: toggle };

},{}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.get = get;
exports.set = set;
exports.toggle = toggle;
var IS_ACTIVE = exports.IS_ACTIVE = true,
    IS_NOT_ACTIVE = exports.IS_NOT_ACTIVE = false;

function get(ay, attributeName) {
	if (!ay.element.hasAttribute(attributeName)) return;
	return ay.element.getAttribute(attributeName) == "true" || false;
}

function set(ay, attributeName, status) {
	if (status == undefined) {
		ay.element.removeAttribute(attributeName);
	} else {
		ay.element.setAttribute(attributeName, status);
	}

	return status;
}

/**
* Returns the opposite state of the attribute
* @return {Boolean} New state
*/
function toggle(state) {
	if (state == IS_ACTIVE) {
		state = IS_NOT_ACTIVE;
	} else {
		state = IS_ACTIVE;
	}
	return state;
}

exports.default = { IS_ACTIVE: IS_ACTIVE, IS_NOT_ACTIVE: IS_NOT_ACTIVE, get: get, set: set, toggle: toggle };

},{}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.get = get;
exports.set = set;
function get(autotility, attributeName) {
	if (!autotility.element.hasAttribute(attributeName)) return null;

	var attrValue = autotility.element.getAttribute(attributeName);
	if (attrValue === null) return null;

	return Number(attrValue);
}

function set(autotility, attributeName, str) {
	if (str == null) {
		autotility.element.removeAttribute(attributeName);
	} else {
		autotility.element.setAttribute(attributeName, str);
	}
}

exports.default = { get: get, set: set };

},{}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.get = get;
exports.set = set;
function get(ay, attributeName) {
	if (!ay.element.hasAttribute(attributeName)) return null;

	var attrValue = ay.element.getAttribute(attributeName);
	if (attrValue === null) return null;

	return Number(attrValue);
}

function set(ay, attributeName, str) {
	if (str == null) {
		ay.element.removeAttribute(attributeName);
	} else {
		ay.element.setAttribute(attributeName, str);
	}
}

exports.default = { get: get, set: set };

},{}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _selector = require("./selector");

var _selector2 = _interopRequireDefault(_selector);

var _elements = require("./elements");

var _elements2 = _interopRequireDefault(_elements);

var _getComputedRole = require("./getComputedRole");

var _getComputedRole2 = _interopRequireDefault(_getComputedRole);

var _Range = require("./../role/abstract/Range");

var _Range2 = _interopRequireDefault(_Range);

var _Roletype = require("./../role/abstract/Roletype");

var _Roletype2 = _interopRequireDefault(_Roletype);

var _Button = require("./../role/Button");

var _Button2 = _interopRequireDefault(_Button);

var _Checkbox = require("./../role/Checkbox");

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Combobox = require("./../role/Combobox");

var _Combobox2 = _interopRequireDefault(_Combobox);

var _Dialog = require("./../role/Dialog");

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Form = require("./../role/Form");

var _Form2 = _interopRequireDefault(_Form);

var _Listbox = require("./../role/Listbox");

var _Listbox2 = _interopRequireDefault(_Listbox);

var _option = require("./../role/option");

var _option2 = _interopRequireDefault(_option);

var _Slider = require("./../role/Slider");

var _Slider2 = _interopRequireDefault(_Slider);

var _Spinbutton = require("./../role/Spinbutton");

var _Spinbutton2 = _interopRequireDefault(_Spinbutton);

var _Tab = require("./../role/Tab");

var _Tab2 = _interopRequireDefault(_Tab);

var _Tablist = require("./../role/Tablist");

var _Tablist2 = _interopRequireDefault(_Tablist);

var _Tabpanel = require("./../role/Tabpanel");

var _Tabpanel2 = _interopRequireDefault(_Tabpanel);

var _Textbox = require("./../role/Textbox");

var _Textbox2 = _interopRequireDefault(_Textbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var obj = { button: _Button2.default, checkbox: _Checkbox2.default, combobox: _Combobox2.default, dialog: _Dialog2.default, form: _Form2.default, listbox: _Listbox2.default,
	options: _option2.default, range: _Range2.default, roletype: _Roletype2.default, slider: _Slider2.default, spinbutton: _Spinbutton2.default,
	tab: _Tab2.default, tablist: _Tablist2.default, tabpanel: _Tabpanel2.default, texbox: _Textbox2.default };

function all() {
	for (var key in obj) {
		var nodeList = document.querySelectorAll(_selector2.default.getRole(key));
		for (var i = 0; i < nodeList.length; i++) {
			_elements2.default.set(nodeList[i], new obj[key](nodeList[i]));
		}
	}
}

function one(el) {
	if (_elements2.default.has(el)) return _elements2.default.get(el);
	var role = (0, _getComputedRole2.default)(el);
	console.log(el, role);
	return _elements2.default.set(el, new obj[role](el));
}

function instanceOf(ay, role) {
	return ay instanceof obj[role];
}

exports.default = { all: all, one: one, instanceOf: instanceOf };

// roles.forEach((Role) => {
// 	var nodeList = document.querySelectorAll(selector);
// 	for (let i = 0; i < nodeList.length; i++) {
// 		elements.set(nodeList[i], new Role(nodeList[i]));
// 	}

// 	// if(role.options && role.options.selectorsWithImplicitRole) {
// 	// 	var htmlNodeList = document.querySelectorAll(role.options.selectorsWithImplicitRole.join(","));
// 	// 	for (let j = 0; j < htmlNodeList.length; j++) {
// 	// 		elements.set(htmlNodeList[j], new role.default(htmlNodeList[j]));
// 	// 	}
// 	// }
// });

},{"./../role/Button":18,"./../role/Checkbox":19,"./../role/Combobox":20,"./../role/Dialog":21,"./../role/Form":22,"./../role/Listbox":23,"./../role/Slider":25,"./../role/Spinbutton":26,"./../role/Tab":27,"./../role/Tablist":28,"./../role/Tabpanel":29,"./../role/Textbox":30,"./../role/abstract/Range":35,"./../role/abstract/Roletype":36,"./../role/option":42,"./elements":50,"./getComputedRole":52,"./selector":54}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getParent = getParent;
exports.getChildren = getChildren;
exports.getPrev = getPrev;
exports.getNext = getNext;
exports.getStart = getStart;
exports.getEnd = getEnd;

var _create = require("./create");

var _create2 = _interopRequireDefault(_create);

var _getComputedRole = require("./getComputedRole");

var _getComputedRole2 = _interopRequireDefault(_getComputedRole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ayInstances = new WeakMap();

// todo: loop through presentational roles
function getParent(ay, role) {
	if (ay.element.parentNode.getAttribute("role").toLowerCase() == role) {
		if (ayInstances.has(ay.element.parentNode)) {
			return ayInstances.get(ay.element.parentNode);
		} else {
			return _create2.default.one(ay.element.parentNode);
		}
	} else {
		return false;
	}
}

/** @todo find only `direct` children */
function getChildren(ay, role) {
	var results = [];
	var owns = Array.from(ay.element.children).concat(ay.owns);

	owns.forEach(function (child) {
		if (!role || role && (0, _getComputedRole2.default)(child) == role) {
			if (ayInstances.has(child)) {
				results.push(ayInstances.get(child));
			} else {
				results.push(_create2.default.one(child));
			}
		}
	});

	return owns;
}

function getPrev(child, parent, role) {
	if (!parent) return false;

	var children = getChildren(parent, role);
	var indexPrevElement = Array.prototype.indexOf.call(children, child) - 1;
	if (indexPrevElement < 0) return false;

	return children[indexPrevElement];
}

function getNext(child, parent, role) {
	if (!parent) return false;

	var children = getChildren(parent, role);
	var indexNext = Array.prototype.indexOf.call(children, child) + 1;
	if (indexNext >= children.length) return false;

	return children[indexNext];
}

function getStart(child, parent, role) {
	if (!parent) return false;
	var children = getChildren(parent, role);
	return children[0];
}

function getEnd(child, parent, role) {
	if (!parent) return false;
	var children = getChildren(parent, role);
	return children[children.length - 1];
}

exports.default = {
	map: ayInstances,
	get: ayInstances.get.bind(ayInstances),
	set: ayInstances.set.bind(ayInstances),
	has: ayInstances.has.bind(ayInstances),
	getChildren: getChildren,
	getParent: getParent,
	getPrev: getPrev,
	getNext: getNext,
	getStart: getStart,
	getEnd: getEnd
};

},{"./create":49,"./getComputedRole":52}],51:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	var ay = _elements2.default.get(document.activeElement);

	if (!ay) return;
	if (ay.activeDescendant) return ay.activeDescendant;

	return ay;
};

var _elements = require("./elements");

var _elements2 = _interopRequireDefault(_elements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./elements":50}],52:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = getComputedRole;

var _roles = require("./../data/roles.js");

var _roles2 = _interopRequireDefault(_roles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Stores info which is used in functions of rolePerHTMLTag,
 * mostly a key as tagName with an array of allowed roles for that tag
 * @type {Object}
 */
var allowedRoles = {
	"aWithHref": ["button", "checkbox", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "switch", "tab", "treeitem", "doc-backlink", "doc-biblioref", "doc-glossref", "doc-noteref"],
	"article": ["feed", "presentation", "none", "document", "application", "main", "region"],
	"aside": ["feed", "note", "presentation", "none", "region", "search", "doc-example", "doc-footnote", "doc-pullquote", "doc-tip"],
	"button": ["checkbox", "link", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "switch", "tab"],
	"dl": ["group", "presentation", "none", "doc-glossary"],
	"embed": ["application", "document", "presentation", "none", "img"],
	"figcaption": ["group", "presentation", "none"],
	"fieldset": ["group", "presentation", "none"],
	"footer": ["group", "none", "presentation", "doc-footnote"],
	"form": ["search", "none", "presentation"],
	"h1Toh6": ["tab", "none", "presentation", "doc-subtitle"],
	"header": ["group", "none", "presentation", "doc-footnote"],
	"hr": ["presentation", "doc-pagebreak"],
	"iframe": ["application", "document", "img"],
	"imgWithEmptyAlt": ["presentation", "none"],
	"inputTypeButton": ["link, menuitem", "menuitemcheckbox", "menuitemradio", "radio", "switch", "option", "tab"],
	"inputTypeImage": ["link", "menuitem", "menuitemcheckbox", "menuitemradio", "radio", "switch"],
	"inputTypeCheckbox": ["button", "menuitemcheckbox", "option", "switch"],
	"li": ["menuitem", "menuitemcheckbox", "menuitemradio", "option", "none", "presentation", "radio", "separator", "tab", "treeitem", "doc-biblioentry", "doc-endnote"],
	"nav": ["doc-index", "doc-pagelist", "doc-toc"],
	"object": ["application", "document", "img"],
	"ol": ["directory", "group", "listbox", "menu", "menubar,none", "presentation ", "radiogroup", "tablist", "toolbar", "tree"],
	"section": ["alert", "alertdialog", "application", "banner", "complementary", "contentinfo", "dialog", "document", "feed", "log", "main", "marquee", "navigation", "none", "presentation", "search", "status", "tabpanel", "doc-abstract", "doc-acknowledgments", "doc-afterword", "doc-appendix", "doc-bibliography", "doc-chapter", "doc-colophon", "doc-conclusion", "doc-credit", "doc-credits", "doc-dedication", "doc-endnotes", "doc-epilogue", "doc-errata", "doc-example", "doc-foreword", "doc-index", "doc-introduction", "doc-notice", "doc-pagelist", "doc-part", "doc-preface", "doc-prologue", "doc-pullquote", "doc-qna", "doc-toc"],
	"svg": ["application", "document", "img"],
	"ul": ["directory", "group", "listbox", "menu", "menubar", "radiogroup", "tablist", "toolbar", "tree", "presentation"]
};

/**
 * Contains a function for each htmlTag where not all roles allowed
 * @type {Object}
 */
/**
 * Follows https://www.w3.org/TR/2017/WD-html-aria-20171013/#docconformance
 */

/**
 * All aria roles
 * @type {Array}
*/
var rolePerHTMLTag = {
	a: function a(el, role) {
		if (el.href) {
			return hasAllowedRole("aWithHref", role) ? role : "link";
		} else {
			return role;
		}
	},
	area: function area(el, role) {
		if (el.href) return role ? null : "link";
		return role;
	},
	article: function article(el, role) {
		return hasAllowedRole("article", role) ? role : "article";
	},
	aside: function aside(el, role) {
		return hasAllowedRole("aside", role) ? role : "complementary";
	},
	audio: function audio(el, role) {
		return role == "application" ? "application" : null;
	},
	base: function base() {
		return null;
	},
	body: function body() {
		return "document";
	},
	button: function button(el, role) {
		if (el.type == "menu") {
			return role == "menuitem" ? "menuitem" : "button";
		}
		return hasAllowedRole("button", role) ? role : "button";
	},
	caption: function caption() {
		return null;
	},
	col: function col() {
		return null;
	},
	colgroup: function colgroup() {
		return null;
	},
	datalist: function datalist() {
		return "listbox";
	},
	dd: function dd() {
		return "definition";
	},
	details: function details() {
		return "group";
	},
	dialog: function dialog(el, role) {
		return role == "alertdialog" ? "alertdialog" : "dialog";
	},
	dl: function dl(el, role) {
		return hasAllowedRole("dl", role) ? role : "list";
	},
	dt: function dt() {
		return "listitem";
	},
	embed: function embed(el, role) {
		return hasAllowedRole("embed", role) ? role : null;
	},
	figcaption: function figcaption(el, role) {
		return hasAllowedRole("figcaption", role) ? role : null;
	},
	fieldset: function fieldset(el, role) {
		return hasAllowedRole("fieldset", role) ? role : null;
	},
	figure: function figure(el, role) {
		return hasAllowedRole("figure", role) ? role : "figure";
	},
	footer: function footer(el, role) {
		var hasImplicitContentinfoRole = !getParentWithTagName(el, ["ARTICLE", "ASIDE", "MAIN", "NAV", "SECTION"]);
		var hasAllowedRole = hasAllowedRole("footer", role);
		if (hasAllowedRole) {
			return role;
		} else if (hasImplicitContentinfoRole) {
			return "contentinfo";
		} else {
			return null;
		}
	},
	form: function form(el, role) {
		return hasAllowedRole("form", role) ? role : "form";
	},
	h1: function h1(el, role) {
		return hasAllowedRole("h1Toh6", role) ? role : "heading";
	},
	h2: function h2(el, role) {
		return hasAllowedRole("h1Toh6", role) ? role : "heading";
	},
	h3: function h3(el, role) {
		return hasAllowedRole("h1Toh6", role) ? role : "heading";
	},
	h4: function h4(el, role) {
		return hasAllowedRole("h1Toh6", role) ? role : "heading";
	},
	h5: function h5(el, role) {
		return hasAllowedRole("h1Toh6", role) ? role : "heading";
	},
	h6: function h6(el, role) {
		return hasAllowedRole("h1Toh6", role) ? role : "heading";
	},
	head: function head() {
		return null;
	},
	header: function header(el, role) {
		var hasImplicitBannerRole = !getParentWithTagName(el, ["ARTICLE", "ASIDE", "MAIN", "NAV", "SECTION"]);
		var hasAllowedRole = hasAllowedRole("header", role);
		if (hasAllowedRole) {
			return role;
		} else if (hasImplicitBannerRole) {
			return "banner";
		} else {
			return null;
		}
	},
	hr: function hr(el, role) {
		return hasAllowedRole("hr", role) ? role : "seperator";
	},
	html: function html() {
		return null;
	},
	iframe: function iframe(el, role) {
		return hasAllowedRole("iframe", role) ? role : null;
	},
	img: function img(el, role) {
		var hasAllowedEmptyAltRole = hasAllowedRole("imgWithEmptyAlt", role);

		if (el.alt) {
			// any role exept the roles used by empty alt values
			return hasAllowedEmptyAltRole ? "img" : role;
		} else {
			return hasAllowedEmptyAltRole ? role : null;
		}
	},
	input: function input(el, role) {
		switch (el.type) {
			case "button":
				return hasAllowedRole("inputTypeButton", role) ? role : "button";
			case "checkbox":
				return hasAllowedRole("inputTypeCheckbox", role) ? role : "checkbox";
			case "image":
				return hasAllowedRole("inputTypeImage", role) ? role : "button";
			case "number":
				return "spinbutton";
			case "radio":
				return role == "menuitemradio" ? "menuitemradio" : "radio";
			case "range":
				return "slider";
			case "search":
				return el.list ? "combobox" : "searchbox";
			case "reset":
			case "submit":
				return "button";
			case "email":
			case "tel":
			case "text":
			case "url":
				return el.list ? "combobox" : "textbox";
			default:
				return null;
		}
	},
	keygen: function keygen() {
		return null;
	},
	label: function label() {
		return null;
	},
	legend: function legend() {
		return null;
	},
	li: function li(el, role) {
		var hasImplicitListitemRole = getParentWithTagName(el, ["OL", "UL"]);

		if (hasImplicitListitemRole) {
			return hasAllowedRole("li", role) ? role : "listitem";
		} else {
			return role;
		}
	},
	link: function link(el, role) {
		if (el.href) return role ? null : "link";
		return role;
	},
	main: function main() {
		return "main";
	},
	map: function map() {
		return null;
	},
	math: function math() {
		return "math";
	},
	menu: function menu(el, role) {
		return el.type == "context" ? "menu" : role;
	},
	menuitem: function menuitem(el, role) {
		switch (el.type) {
			case "command":
				return "menuitem";
			case "checkbox":
				return "menuitemcheckbox";
			case "radio":
				return "menuitemradio";
			default:
				return role;
		}
	},
	meta: function meta() {
		return null;
	},
	meter: function meter() {
		return null;
	},
	nav: function nav(el, role) {
		return hasAllowedRole("nav", role) ? role : "navigation";
	},
	noscript: function noscript() {
		return null;
	},
	object: function object(el, role) {
		return hasAllowedRole("object", role) ? role : null;
	},
	ol: function ol(el, role) {
		return hasAllowedRole("ol", role) ? role : "list";
	},
	optgroup: function optgroup() {
		return "group";
	},
	option: function option(el) {
		var withinOptionList = ["select", "optgroup", "datalist"].indexOf(el.parentNode) > -1;
		return withinOptionList ? "option" : null;
	},
	output: function output(el, role) {
		return role ? role : "status";
	},
	param: function param() {
		return null;
	},
	picture: function picture() {
		return null;
	},
	progress: function progress() {
		return "progressbar";
	},
	script: function script() {
		return null;
	},
	section: function section(el, role) {
		var hasValidRole = hasAllowedRole("section", role);
		if (hasValidRole) return role;

		// only if accessible name
		if (el.title || el.hasAttribute("aria-label") || el.hasAttribute("aria-labelledby")) {
			return "section";
		} else {
			return role;
		}
	},
	select: function select(el, role) {
		if (el.multiple && el.size > 1) {
			return "listbox";
		} else if (!el.multiple && el.size <= 1) {
			return role == "menu" ? role : "combobox";
		}

		return role;
	},
	source: function source() {
		return null;
	},
	style: function style() {
		return null;
	},
	svg: function svg(el, role) {
		return hasAllowedRole("svg", role) ? role : null;
	},
	summary: function summary() {
		return "button";
	},
	table: function table(el, role) {
		return role ? role : "table";
	},
	template: function template() {
		return null;
	},
	textarea: function textarea() {
		return "textbox";
	},
	thead: function thead(el, role) {
		return role ? role : "rowgroup";
	},
	tbody: function tbody(el, role) {
		return role ? role : "rowgroup";
	},
	tfoot: function tfoot(el, role) {
		return role ? role : "rowgroup";
	},
	title: function title() {
		return null;
	},
	td: function td(el, role) {
		return getParentWithTagName(el, ["TABLE"]) ? "cell" : role;
	},
	th: function th(el, role) {
		if (role) return role;
		return getParentWithTagName(el, ["THEAD"]) ? "columnheader" : "rowheader";
	},
	tr: function tr(el, role) {
		// role=row, may be explicitly declared when child of a table element with role=grid
		return role ? role : "row";
	},
	track: function track() {
		return null;
	},
	ul: function ul(el, role) {
		return hasAllowedRole("ul", role) ? role : "list";
	},
	video: function video(el, role) {
		return role == "application" ? "application" : null;
	}
};

/**
 * Finds nearest parent with a specifig tagName
 * @param  {HTMLElement} 		el      		child - starting pointer
 * @param  {Array<String>} 	tagName 		Array containg capatilized tagnames
 * @return {HTMLElement}         				Parent that matches one of the tagnames
 */
function getParentWithTagName(el, tagName) {
	while (el.parentNode) {
		if (tagName.indexOf(el.tagName) > -1) return el;
		el = el.parentNode;
	}
}

/**
 * Checks if given role is allowed for given tag
 * @param  {string}  tagName key of allowedRoles
 * @param  {string}  role    current role
 * @return {Boolean}         True if allowed
 */
function hasAllowedRole(tagName, role) {
	return allowedRoles[tagName].indexOf(role) > -1;
}

function getComputedRole(el) {
	var role = el.getAttribute("role");
	// check if given role exist
	if (role) role = _roles2.default[role] ? role : null;

	var tagName = el.tagName.toLowerCase();
	// call possible custom function if tag has any
	if (rolePerHTMLTag[tagName]) return rolePerHTMLTag[tagName](el, role);

	// default behavior a.k.a. set role
	return role;
}

},{"./../data/roles.js":16}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * Scrolls an element into its parent view
 * @param {Element} child Element to show
 */
function scrollIntoView(child) {
	var parent = child.offsetParent;
	if (parent && parent.scrollHeight > parent.clientHeight) {
		var scrollBottom = parent.clientHeight + parent.scrollTop;
		var elementBottom = child.offsetTop + child.offsetHeight;
		if (elementBottom > scrollBottom) {
			parent.scrollTop = elementBottom - parent.clientHeight;
		} else if (child.offsetTop < parent.scrollTop) {
			parent.scrollTop = child.offsetTop;
		}
	}
}

/**
 * Adds focus to the first element
 * @param {Array} descendants Array of all descendants
 */
function start(descendants) {
	return add(descendants[0]);
}

/**
 * Adds focus to the prev element
 * @param {Array} descendants Array of all descendants
 * @param {Object} 	child 			Current focused element
 */
function prev(descendants, child) {
	// find index of current element
	var i = descendants.indexOf(child);
	if (i <= 0) i = 1;

	return add(descendants[i - 1]);
}

/**
 * Adds focus to the next element
 * @param {Array} 	descendants Array of all descendants
 * @param {Object} 	child 			Current focused element
 */
function next(descendants, child) {
	// find index of current element
	var i = descendants.indexOf(child);
	if (i > descendants.length - 2) i = descendants.length - 2;

	return add(descendants[i + 1]);
}

/**
 * Adds focus to the last element
 * @param {Array} descendants Array of all descendants
 */
function end(descendants) {
	return add(descendants[descendants.length - 1]);
}

function add(child) {
	child.element.classList.add("ay-hover");
	scrollIntoView(child.element);
	return child;
}

function remove(child) {
	child.element.classList.remove("ay-hover");
	return child;
}

function get(descendants) {
	var ay = descendants.find(function (i) {
		return i.element.classList.contains("ay-hover");
	});
	if (!ay) return descendants[0];
	return ay;
}

function setSelected(ay, val) {
	ay.selected = val;
}

function getDescendants(ay) {}

exports.default = {
	start: start,
	prev: prev,
	next: next,
	end: end,
	add: add,
	remove: remove,
	get: get,
	setSelected: setSelected,
	getDescendants: getDescendants
};

},{}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getRole = getRole;
exports.get = get;
exports.getDeepRole = getDeepRole;
exports.getDeep = getDeep;

var _roles = require("./../data/roles");

var _roles2 = _interopRequireDefault(_roles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns an css selector for a given role
 * @param {String} key Role name
 * @returns {String}
 */
function getRole(key) {
	if (!_roles2.default[key]) return;

	return "[role='" + key + "']";
}

/**
 * Returns an array with all css selectors, implicit and explicit, for a given role
 * @param {String} key Role name
 * @returns {?Array};
 */
function getSelectorArray(key) {
	if (!_roles2.default[key]) return;

	var selector = [];
	selector.push(getRole(key));
	if (_roles2.default[key].implicit) _roles2.default.concat(_roles2.default[key].implicit);
	return selector;
}

/**
 * Returns an complete css selector with implict elements for a given role
 * @param {String} key Role name
 * @returns {String}
 */
function get(key) {
	return getSelectorArray(key).join(", ");
}

function getDeepRoleArray(key) {
	if (!_roles2.default[key]) return;

	var selector = [];
	selector.push(getRole(key));

	if (_roles2.default[key].sub) {
		_roles2.default[key].sub.forEach(function (val) {
			return selector.push(getRole(val));
		});
	}

	return selector;
}

function getDeepRole(key) {
	return getDeepRoleArray(key).join(", ");
}

function getDeepSelectorArray(key) {
	if (!_roles2.default[key]) return;

	var selector = [];
	selector.concat(getSelectorArray(key));

	if (_roles2.default[key].sub) {
		_roles2.default[key].sub.forEach(function (val) {
			return selector.concat(getSelectorArray(val));
		});
	}

	return selector;
}

function getDeep(key) {
	return getDeepSelectorArray(key).join(", ");
}

exports.default = { getRole: getRole, get: get, getDeepRole: getDeepRole, getDeep: getDeep };

},{"./../data/roles":16}]},{},[11])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW4vaW5kZXguanMiLCJub2RlX21vZHVsZXMvQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW4vc3JjL0J1aWxkZXIuanMiLCJub2RlX21vZHVsZXMvQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW4vc3JjL0RlY29yYXRvcnMvQmFyZU1peGluLmpzIiwibm9kZV9tb2R1bGVzL0B2ZXN0ZXJnYWFyZC1jb21wYW55L2pzLW1peGluL3NyYy9EZWNvcmF0b3JzL0NhY2hlZC5qcyIsIm5vZGVfbW9kdWxlcy9AdmVzdGVyZ2FhcmQtY29tcGFueS9qcy1taXhpbi9zcmMvRGVjb3JhdG9ycy9IYXNJbnN0YW5jZS5qcyIsIm5vZGVfbW9kdWxlcy9AdmVzdGVyZ2FhcmQtY29tcGFueS9qcy1taXhpbi9zcmMvVXRpbHMvd3JhcC5qcyIsIm5vZGVfbW9kdWxlcy9AdmVzdGVyZ2FhcmQtY29tcGFueS9qcy1taXhpbi9zcmMvZGVjbGFyZS5qcyIsIm5vZGVfbW9kdWxlcy9AdmVzdGVyZ2FhcmQtY29tcGFueS9qcy1taXhpbi9zcmMvbWl4LmpzIiwibm9kZV9tb2R1bGVzL21vdXNldHJhcC9tb3VzZXRyYXAuanMiLCJub2RlX21vZHVsZXMvb2JqZWN0LXBhdGgvaW5kZXguanMiLCJzcmMvYXBwLmpzIiwic3JjL2F0dHJpYnV0ZXMvYXJpYS1jaGVja2VkLmpzIiwic3JjL2F0dHJpYnV0ZXMvYXJpYS1leHBhbmRlZC5qcyIsInNyYy9hdHRyaWJ1dGVzL2FyaWEtcHJlc3NlZC5qcyIsInNyYy9hdHRyaWJ1dGVzL2FyaWEtc2VsZWN0ZWQuanMiLCJzcmMvZGF0YS9yb2xlcy5qcyIsInNyYy9yb2xlL0Jhc2UuanMiLCJzcmMvcm9sZS9CdXR0b24uanMiLCJzcmMvcm9sZS9DaGVja2JveC5qcyIsInNyYy9yb2xlL0NvbWJvYm94LmpzIiwic3JjL3JvbGUvRGlhbG9nLmpzIiwic3JjL3JvbGUvRm9ybS5qcyIsInNyYy9yb2xlL0xpc3Rib3guanMiLCJzcmMvcm9sZS9PcHRpb24uanMiLCJzcmMvcm9sZS9TbGlkZXIuanMiLCJzcmMvcm9sZS9TcGluYnV0dG9uLmpzIiwic3JjL3JvbGUvVGFiLmpzIiwic3JjL3JvbGUvVGFibGlzdC5qcyIsInNyYy9yb2xlL1RhYnBhbmVsLmpzIiwic3JjL3JvbGUvVGV4dGJveC5qcyIsInNyYy9yb2xlL2Fic3RyYWN0L0NvbW1hbmQuanMiLCJzcmMvcm9sZS9hYnN0cmFjdC9Db21wb3NpdGUuanMiLCJzcmMvcm9sZS9hYnN0cmFjdC9JbnB1dC5qcyIsInNyYy9yb2xlL2Fic3RyYWN0L0xhbmRtYXJrLmpzIiwic3JjL3JvbGUvYWJzdHJhY3QvUmFuZ2UuanMiLCJzcmMvcm9sZS9hYnN0cmFjdC9Sb2xldHlwZS5qcyIsInNyYy9yb2xlL2Fic3RyYWN0L1NlY3Rpb24uanMiLCJzcmMvcm9sZS9hYnN0cmFjdC9TZWxlY3QuanMiLCJzcmMvcm9sZS9hYnN0cmFjdC9TdHJ1Y3R1cmUuanMiLCJzcmMvcm9sZS9hYnN0cmFjdC9XaWRnZXQuanMiLCJzcmMvcm9sZS9hYnN0cmFjdC9XaW5kb3cuanMiLCJzcmMvcm9sZS9vcHRpb24uanMiLCJzcmMvdHlwZS9BY2Nlc3NpYmxlTm9kZS5qcyIsInNyYy90eXBlL0FjY2Vzc2libGVOb2RlTGlzdC5qcyIsInNyYy90eXBlL0RPTVN0cmluZy5qcyIsInNyYy90eXBlL2Jvb2xlYW4uanMiLCJzcmMvdHlwZS9kb3VibGUuanMiLCJzcmMvdHlwZS9sb25nLmpzIiwic3JjL3V0aWxzL2NyZWF0ZS5qcyIsInNyYy91dGlscy9lbGVtZW50cy5qcyIsInNyYy91dGlscy9nZXRBY3RpdmUuanMiLCJzcmMvdXRpbHMvZ2V0Q29tcHV0ZWRSb2xlLmpzIiwic3JjL3V0aWxzL21hbmFnaW5nRm9jdXMuanMiLCJzcmMvdXRpbHMvc2VsZWN0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5n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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcGhDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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LGdCQUFNLEdBQU4sRUFBVyxHQUFmLEVBQW9CO0FBQ25CLGtCQUFNLEdBQU4sRUFBVyxHQUFYLENBQWUsT0FBZixDQUF1QjtBQUFBLFVBQU8sU0FBUyxJQUFULENBQWMsUUFBUSxHQUFSLENBQWQsQ0FBUDtBQUFBLEdBQXZCO0FBQ0E7O0FBRUQsUUFBTyxRQUFQO0FBQ0E7O0FBRU0sU0FBUyxXQUFULENBQXFCLEdBQXJCLEVBQTBCO0FBQ2hDLFFBQU8saUJBQWlCLEdBQWpCLEVBQXNCLElBQXRCLENBQTJCLElBQTNCLENBQVA7QUFDQTs7QUFFRCxTQUFTLG9CQUFULENBQThCLEdBQTlCLEVBQW1DO0FBQ2xDLEtBQUksQ0FBQyxnQkFBTSxHQUFOLENBQUwsRUFBaUI7O0FBRWpCLEtBQUksV0FBVyxFQUFmO0FBQ0EsVUFBUyxNQUFULENBQWdCLGlCQUFpQixHQUFqQixDQUFoQjs7QUFFQSxLQUFJLGdCQUFNLEdBQU4sRUFBVyxHQUFmLEVBQW9CO0FBQ25CLGtCQUFNLEdBQU4sRUFBVyxHQUFYLENBQWUsT0FBZixDQUF1QjtBQUFBLFVBQU8sU0FBUyxNQUFULENBQWdCLGlCQUFpQixHQUFqQixDQUFoQixDQUFQO0FBQUEsR0FBdkI7QUFDQTs7QUFFRCxRQUFPLFFBQVA7QUFDQTs7QUFFTSxTQUFTLE9BQVQsQ0FBaUIsR0FBakIsRUFBc0I7QUFDNUIsUUFBTyxxQkFBcUIsR0FBckIsRUFBMEIsSUFBMUIsQ0FBK0IsSUFBL0IsQ0FBUDtBQUNBOztrQkFFYyxFQUFFLGdCQUFGLEVBQVcsUUFBWCxFQUFnQix3QkFBaEIsRUFBNkIsZ0JBQTdCLEUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG4vLyBEZWZhdWx0IGV4cG9ydCAtIE1peCB3cmFwcGVyXG5pbXBvcnQgbWl4IGZyb20gJy4vc3JjL21peCc7XG5leHBvcnQgZGVmYXVsdCBtaXg7XG5cbi8vIERlY2xhcmUgbWl4aW4gY2xhc3Nlc1xuaW1wb3J0IERlY2xhcmVNaXhpbiBmcm9tICcuL3NyYy9kZWNsYXJlJztcbmV4cG9ydCB7IERlY2xhcmVNaXhpbiB9O1xuXG4vLyBEZWNvcmF0b3JzXG5pbXBvcnQgQmFyZU1peGluIGZyb20gJy4vc3JjL0RlY29yYXRvcnMvQmFyZU1peGluJztcbmV4cG9ydCB7IEJhcmVNaXhpbiB9O1xuXG5pbXBvcnQgSGFzSW5zdGFuY2UgZnJvbSAnLi9zcmMvRGVjb3JhdG9ycy9IYXNJbnN0YW5jZSc7XG5leHBvcnQgeyBIYXNJbnN0YW5jZSB9O1xuXG5pbXBvcnQgQ2FjaGVkIGZyb20gJy4vc3JjL0RlY29yYXRvcnMvQ2FjaGVkJztcbmV4cG9ydCB7IENhY2hlZCB9O1xuXG4vLyBVdGlsc1xuaW1wb3J0IHdyYXAgZnJvbSAnLi9zcmMvVXRpbHMvd3JhcCc7XG5leHBvcnQgeyB3cmFwIH07IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1peGluIEJ1aWxkZXJcbiAqXG4gKiBBbGxvd3MgeW91IHRvIGV4dGVuZCBhIGNsYXNzIHdpdGggb25lIG9yIG1vcmUgbWl4aW4gY2xhc3Nlcy5cbiAqXG4gKiBUaGlzIGJ1aWxkZXIgaXMgaGVhdmlseSBpbnNwaXJlZCBieSBKdXN0aW4gRmFnbmFuaSdzIE1peHdpdGguanNcbiAqXG4gKiBAc2VlIGh0dHA6Ly9qdXN0aW5mYWduYW5pLmNvbS8yMDE1LzEyLzIxL3JlYWwtbWl4aW5zLXdpdGgtamF2YXNjcmlwdC1jbGFzc2VzL1xuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vanVzdGluZmFnbmFuaS9taXh3aXRoLmpzXG4gKlxuICogQGF1dGhvciBBbGluIEV1Z2VuIERlYWMgPGFkZUB2ZXN0ZXJnYWFyZGNvbXBhbnkuY29tPlxuICovXG5jbGFzcyBCdWlsZGVyIHtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBCdWlsZGVyIGluc3RhbmNlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbc3VwZXJDbGFzcz1jbGFzcyB7fV1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihzdXBlckNsYXNzKXtcbiAgICAgICAgdGhpcy5zdXBlckNsYXNzID0gc3VwZXJDbGFzcyB8fCBjbGFzcyB7fTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNaXhpbiBvbmUgb3IgbW9yZSBtaXhpbi1jbGFzc2VzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5LjxGdW5jdGlvbj59IG1peGluc1xuICAgICAqXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IEEgc3VwY2xhc3Mgd2l0aCBtaXhpbnMgYXBwbGllZFxuICAgICAqL1xuICAgIHdpdGgoLi4ubWl4aW5zKXtcbiAgICAgICAgcmV0dXJuIG1peGlucy5yZWR1Y2UoKGMsIG0pID0+IHtcblxuICAgICAgICAgICAgaWYodHlwZW9mIG0gIT09ICdmdW5jdGlvbicpe1xuICAgICAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbShjKTtcbiAgICAgICAgfSwgdGhpcy5zdXBlckNsYXNzKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJ1aWxkZXI7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBPUklHSU5BTF9NSVhJTiB9IGZyb20gJy4vLi4vVXRpbHMvd3JhcCc7XG5pbXBvcnQgd3JhcCBmcm9tICcuLy4uL1V0aWxzL3dyYXAnO1xuXG4vKipcbiAqIFJlZmVyZW5jZSB0byBhIG1peGluXG4gKlxuICogQHR5cGUge1N5bWJvbH1cbiAqL1xuZXhwb3J0IGNvbnN0IE1JWElOX1JFRkVSRU5DRSA9IFN5bWJvbCgnbWl4aW5SZWYnKTtcblxuLyoqXG4gKiBEZWNvcmF0b3IgdGhhdCBzdG9yZXMgYSByZWZlcmVuY2UgdG8gdGhlIG1peGluIGNsYXNzLCB3aGljaFxuICogdWx0aW1hdGVseSBjYW4gYmUgdXNlZCBmb3IgXCJpbnN0YW5jZSBvZlwiIGNoZWNrcy5cbiAqXG4gKiBAc2VlIHdyYXBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtaXhpbkNsYXNzXG4gKlxuICogQHJldHVybiB7RnVuY3Rpb259IERlY29yYXRlZCBtaXhpblxuICovXG5jb25zdCBCYXJlTWl4aW4gPSAobWl4aW5DbGFzcykgPT4gd3JhcChtaXhpbkNsYXNzLCAoc3VwZXJjbGFzcykgPT4ge1xuICAgIC8vIEFwcGx5IHRoZSBtaXhpbiBjbGFzc1xuICAgIGxldCBhcHAgPSBtaXhpbkNsYXNzKHN1cGVyY2xhc3MpO1xuXG4gICAgLy8gQWRkIHJlZmVyZW5jZSB0byB0aGUgd3JhcHBlZCBtaXhpbiBjbGFzcywgc28gdGhhdCB3ZSBjYW4gZW5hYmxlXG4gICAgLy8gYSBcImluc3RhbmNlIG9mXCIgc3VwcG9ydC5cbiAgICBhcHAucHJvdG90eXBlW01JWElOX1JFRkVSRU5DRV0gPSBtaXhpbkNsYXNzW09SSUdJTkFMX01JWElOXTtcblxuICAgIHJldHVybiBhcHA7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQmFyZU1peGluOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHdyYXAgZnJvbSAnLi8uLi9VdGlscy93cmFwJztcblxuLyoqXG4gKiBDYWNoZWQgbWl4aW4gY2xhc3MgcmVmZXJlbmNlXG4gKlxuICogQHR5cGUge1N5bWJvbH1cbiAqL1xuZXhwb3J0IGNvbnN0IENBQ0hFRF9SRUZFUkVOQ0UgPSBTeW1ib2woJ2NhY2hlZFJlZicpO1xuXG4vKipcbiAqIERlY29yYXRlIHRoZSBnaXZlbiBtaXhpbiBjbGFzcyB3aXRoIGEgXCJjYWNoZWQgZGVjb3JhdG9yXCIuXG4gKlxuICogTWV0aG9kIHdpbGwgZW5zdXJlIHRoYXQgaWYgdGhlIGdpdmVuIG1peGluIGhhcyBhbHJlYWR5IGJlZW4gYXBwbGllZCxcbiAqIHRoZW4gaXQgd2lsbCBiZSByZXR1cm5lZCAvIGFwcGxpZWQgYSBzaW5nbGUgdGltZSwgcmF0aGVyIHRoYW4gbXVsdGlwbGVcbiAqIHRpbWVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1peGluQ2xhc3NcbiAqXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xuY29uc3QgQ2FjaGVkID0gKG1peGluQ2xhc3MpID0+IHdyYXAobWl4aW5DbGFzcywgKHN1cGVyY2xhc3MpID0+IHtcbiAgICAvLyBPYnRhaW4gY2FjaGVkIHJlZmVyZW5jZS4uLlxuICAgIGxldCBjYWNoZWRSZWZlcmVuY2UgPSBtaXhpbkNsYXNzW0NBQ0hFRF9SRUZFUkVOQ0VdO1xuXG4gICAgLy8gSWYgdGhlcmUgaXMgbm8gY2FjaGVkIHJlZmVyZW5jZSwgdGhlbiB3ZSBjcmVhdGUgb25lIG9udG9cbiAgICAvLyB0aGUgZ2l2ZW4gbWl4aW4gY2xhc3NcbiAgICBpZiggISBjYWNoZWRSZWZlcmVuY2Upe1xuXG4gICAgICAgIC8vIENyZWF0ZSBhIG5ldyBzeW1ib2wgaW4gdGhlIG1peGluIGNsYXNzLCB1c2luZyB0aGUgZnVuY3Rpb24ncyBuYW1lXG4gICAgICAgIC8vIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvRnVuY3Rpb24vbmFtZVxuICAgICAgICBjYWNoZWRSZWZlcmVuY2UgPSBtaXhpbkNsYXNzW0NBQ0hFRF9SRUZFUkVOQ0VdID0gU3ltYm9sKG1peGluQ2xhc3MubmFtZSk7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgaWYgZ2l2ZW4gc3VwZXJjbGFzcyBhbHJlYWR5IGhhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2l2ZW4gbWl4aW4gY2xhc3NcbiAgICAvLyBJZiBzbywgdGhlbiByZXR1cm4gaXQuXG4gICAgaWYoc3VwZXJjbGFzcy5oYXNPd25Qcm9wZXJ0eShjYWNoZWRSZWZlcmVuY2UpKXtcbiAgICAgICAgcmV0dXJuIHN1cGVyY2xhc3NbY2FjaGVkUmVmZXJlbmNlXTtcbiAgICB9XG5cbiAgICAvLyBEZWNvcmF0ZSB0aGUgZ2l2ZW4gc3VwZXIgY2xhc3NcbiAgICBsZXQgZGVjb3JhdGVkID0gbWl4aW5DbGFzcyhzdXBlcmNsYXNzKTtcblxuICAgIC8vIENhY2hlIHRoZSByZWZlcmVuY2UgaW50byB0aGUgc3VwZXJjbGFzc1xuICAgIHN1cGVyY2xhc3NbY2FjaGVkUmVmZXJlbmNlXSA9IGRlY29yYXRlZDtcblxuICAgIC8vIEZpbmFsbHksIHJldHVybiB0aGUgZGVjb3JhdGVkIG1peGluLlxuICAgIHJldHVybiBkZWNvcmF0ZWQ7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FjaGVkOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgT1JJR0lOQUxfTUlYSU4gfSBmcm9tICcuLy4uL1V0aWxzL3dyYXAnO1xuaW1wb3J0IHsgTUlYSU5fUkVGRVJFTkNFIH0gZnJvbSAnLi9CYXJlTWl4aW4nO1xuXG4vKipcbiAqIERlY29yYXRlcyB0aGUgZ2l2ZW4gbWl4aW4gY2xhc3MgdG8gc3VwcG9ydCBcImluc3RhbmNlIG9mXCIgb3BlcmF0aW9uLlxuICpcbiAqIFRoZSBnaXZlbiBtaXhpbiBjbGFzcyBNVVNUIGJlIGRlY29yYXRlZCB3aXRoIHRoZSBcIkJhcmVNaXhpblwiIGZvciB0aGlzXG4gKiB0byB3b3JrLlxuICpcbiAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvU3ltYm9sL2hhc0luc3RhbmNlXG4gKiBAc2VlIEJhcmVNaXhpblxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1peGluQ2xhc3NcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBEZWNvcmF0ZWQgbWl4aW4gY2xhc3NcbiAqL1xuY29uc3QgSGFzSW5zdGFuY2UgPSAobWl4aW5DbGFzcykgPT4ge1xuXG4gICAgLy8gSWYgZ2l2ZW4gbWl4aW4gY2xhc3MgYWxyZWFkeSBoYXMgYSBjdXN0b20gXCJoYXMgaW5zdGFuY2VcIlxuICAgIC8vIHN5bWJvbCwgdGhlbiBhYm9ydCAtIGp1c3QgcmV0dXJuIHRoZSBtaXhpbiwgc2luY2UgdGhlcmVcbiAgICAvLyBpcyBubyBuZWVkIHRvIGFkZCBjdXN0b20gYmVoYXZpb3VyIHRvIGl0LlxuICAgIGlmKG1peGluQ2xhc3MuaGFzT3duUHJvcGVydHkoU3ltYm9sLmhhc0luc3RhbmNlKSl7XG4gICAgICAgIHJldHVybiBtaXhpbkNsYXNzO1xuICAgIH1cblxuICAgIC8vIE90aGVyd2lzZSwgd2UgYWRkIGEgY3VzdG9tIFN5bWJvbC5oYXNJbnN0YW5jZSBtZXRob2QgZm9yXG4gICAgLy8gdGhlIG1peGluIGNsYXNzLlxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtaXhpbkNsYXNzLCBTeW1ib2wuaGFzSW5zdGFuY2UsIHtcblxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24oaW5zdGFuY2Upe1xuICAgICAgICAgICAgLy8gRmV0Y2ggdGhlIG9yaWdpbmFsIG1peGluIGNsYXNzXG4gICAgICAgICAgICBsZXQgb3JpZ2luYWxNaXhpbkNsYXNzID0gdGhpc1tPUklHSU5BTF9NSVhJTl07XG5cbiAgICAgICAgICAgIC8vIElmIHRoZXJlIGlzIG5vIG9yaWdpbmFsIG1peGluIGNsYXNzLCB0aGVuIHdlIHNpbXBseVxuICAgICAgICAgICAgLy8gYWJvcnQgLSBpdCBjYW5ub3QgYmUgYW4gaW5zdGFuY2Ugb2YgdGhlIGdpdmVuLi4uXG4gICAgICAgICAgICBpZiggISBvcmlnaW5hbE1peGluQ2xhc3Mpe1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gTG9vcCB0aHJvdWdoIHRoZSBnaXZlbiBpbnN0YW5jZSdzIHByb3RvdHlwZSBjaGFpblxuICAgICAgICAgICAgd2hpbGUoaW5zdGFuY2UgIT09IG51bGwpe1xuXG4gICAgICAgICAgICAgICAgLy8gSWYgYSByZWZlcmVuY2UgaGFzIGJlZW4gc3RhdGVkIG9uIHRoZSBtaXhpbiBjbGFzcyBhbmQgaXRcbiAgICAgICAgICAgICAgICAvLyBtYXRjaGVzIHRoZSBvcmlnaW5hbCBtaXhpbiwgd2UgYXNzdW1lIHRoYXRcbiAgICAgICAgICAgICAgICBpZihpbnN0YW5jZS5oYXNPd25Qcm9wZXJ0eShNSVhJTl9SRUZFUkVOQ0UpICYmIGluc3RhbmNlW01JWElOX1JFRkVSRU5DRV0gPT09IG9yaWdpbmFsTWl4aW5DbGFzcyl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIEZldGNoIHRoZSBuZXh0IHByb3RvdHlwZVxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGluc3RhbmNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gSWYgbm90aGluZyB3YXMgbWF0Y2hlZCwgdGhlbiB3ZSBhc3N1bWUgdGhhdCB0aGUgaW5zdGFuY2VzXG4gICAgICAgICAgICAvLyBzaW1wbHkgZG8gbm90IG1hdGNoLlxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIC8vIEZpbmFsbHksIHJldHVybiB0aGUgZGVjb3JhdGVkIG1peGluIGNsYXNzXG4gICAgcmV0dXJuIG1peGluQ2xhc3M7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBIYXNJbnN0YW5jZTsiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogUmVmZXJlbmNlIHRvIGFuIG9yaWdpbmFsIG1peGluXG4gKlxuICogQHR5cGUge1N5bWJvbH1cbiAqL1xuZXhwb3J0IGNvbnN0IE9SSUdJTkFMX01JWElOID0gU3ltYm9sKCdvcmlnaW5hbE1peGluJyk7XG5cbi8qKlxuICogU2V0cyB0aGUgcHJvdG90eXBlIG9mIHRoZSB3cmFwcGVyIHRvIGJlIHRoZSBnaXZlbiBtaXhpbiBjbGFzc1xuICogYW5kIHN0b3JlcyBhIHJlZmVyZW5jZSB0byB0aGUgb3JpZ2luYWwgbWl4aW4uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWl4aW5DbGFzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gd3JhcHBlclxuICpcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBXcmFwcGVyXG4gKi9cbmNvbnN0IHdyYXAgPSAobWl4aW5DbGFzcywgd3JhcHBlcikgPT4ge1xuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih3cmFwcGVyLCBtaXhpbkNsYXNzKTtcblxuICAgIGlmICghbWl4aW5DbGFzc1tPUklHSU5BTF9NSVhJTl0pIHtcbiAgICAgICAgbWl4aW5DbGFzc1tPUklHSU5BTF9NSVhJTl0gPSBtaXhpbkNsYXNzO1xuICAgIH1cblxuICAgIHJldHVybiB3cmFwcGVyO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgd3JhcDsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBCYXJlTWl4aW4gZnJvbSAnLi9EZWNvcmF0b3JzL0JhcmVNaXhpbic7XG5pbXBvcnQgSGFzSW5zdGFuY2UgZnJvbSAnLi9EZWNvcmF0b3JzL0hhc0luc3RhbmNlJztcbmltcG9ydCBDYWNoZWQgZnJvbSAnLi9EZWNvcmF0b3JzL0NhY2hlZCc7XG5cbi8qKlxuICogRGVjbGFyZSBhIG1peGluIC0gZGVjb3JhdGVzIHRoZSBnaXZlbiBtaXhpbiBjbGFzcyB3aXRoXG4gKiBhIFwiY2FjaGVkLCBoYXMgaW5zdGFuY2UgYW5kIGJhcmUgbWl4aW5cIiBkZWNvcmF0b3JzLlxuICpcbiAqIEBzZWUgQmFyZU1peGluXG4gKiBAc2VlIEhhc0luc3RhbmNlXG4gKiBAc2VlIENhY2hlZFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1peGluQ2xhc3NcbiAqXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xuY29uc3QgRGVjbGFyZU1peGluID0gKG1peGluQ2xhc3MpID0+IHtcbiAgICByZXR1cm4gQ2FjaGVkKFxuICAgICAgICBIYXNJbnN0YW5jZShcbiAgICAgICAgICAgIEJhcmVNaXhpbihtaXhpbkNsYXNzKVxuICAgICAgICApXG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERlY2xhcmVNaXhpbjsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBCdWlsZGVyIGZyb20gJy4vQnVpbGRlcic7XG5cbi8qKlxuICogTWl4aW4gQnVpbGRlciB3cmFwcGVyXG4gKlxuICogQWxsb3dzIHlvdSB0byBleHRlbmQgYSBjbGFzcyB3aXRoIG9uZSBvciBtb3JlIG1peGluLWNsYXNzZXMuXG4gKlxuICogQHNlZSBCdWlsZGVyXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gW3N1cGVyQ2xhc3M9Y2xhc3Mge31dXG4gKi9cbmNvbnN0IG1peCA9IChzdXBlckNsYXNzKSA9PiBuZXcgQnVpbGRlcihzdXBlckNsYXNzKTtcblxuZXhwb3J0IGRlZmF1bHQgbWl4OyIsIi8qZ2xvYmFsIGRlZmluZTpmYWxzZSAqL1xuLyoqXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE3IENyYWlnIENhbXBiZWxsXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICogTW91c2V0cmFwIGlzIGEgc2ltcGxlIGtleWJvYXJkIHNob3J0Y3V0IGxpYnJhcnkgZm9yIEphdmFzY3JpcHQgd2l0aFxuICogbm8gZXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKlxuICogQHZlcnNpb24gMS42LjFcbiAqIEB1cmwgY3JhaWcuaXMva2lsbGluZy9taWNlXG4gKi9cbihmdW5jdGlvbih3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcblxuICAgIC8vIENoZWNrIGlmIG1vdXNldHJhcCBpcyB1c2VkIGluc2lkZSBicm93c2VyLCBpZiBub3QsIHJldHVyblxuICAgIGlmICghd2luZG93KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBtYXBwaW5nIG9mIHNwZWNpYWwga2V5Y29kZXMgdG8gdGhlaXIgY29ycmVzcG9uZGluZyBrZXlzXG4gICAgICpcbiAgICAgKiBldmVyeXRoaW5nIGluIHRoaXMgZGljdGlvbmFyeSBjYW5ub3QgdXNlIGtleXByZXNzIGV2ZW50c1xuICAgICAqIHNvIGl0IGhhcyB0byBiZSBoZXJlIHRvIG1hcCB0byB0aGUgY29ycmVjdCBrZXljb2RlcyBmb3JcbiAgICAgKiBrZXl1cC9rZXlkb3duIGV2ZW50c1xuICAgICAqXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICB2YXIgX01BUCA9IHtcbiAgICAgICAgODogJ2JhY2tzcGFjZScsXG4gICAgICAgIDk6ICd0YWInLFxuICAgICAgICAxMzogJ2VudGVyJyxcbiAgICAgICAgMTY6ICdzaGlmdCcsXG4gICAgICAgIDE3OiAnY3RybCcsXG4gICAgICAgIDE4OiAnYWx0JyxcbiAgICAgICAgMjA6ICdjYXBzbG9jaycsXG4gICAgICAgIDI3OiAnZXNjJyxcbiAgICAgICAgMzI6ICdzcGFjZScsXG4gICAgICAgIDMzOiAncGFnZXVwJyxcbiAgICAgICAgMzQ6ICdwYWdlZG93bicsXG4gICAgICAgIDM1OiAnZW5kJyxcbiAgICAgICAgMzY6ICdob21lJyxcbiAgICAgICAgMzc6ICdsZWZ0JyxcbiAgICAgICAgMzg6ICd1cCcsXG4gICAgICAgIDM5OiAncmlnaHQnLFxuICAgICAgICA0MDogJ2Rvd24nLFxuICAgICAgICA0NTogJ2lucycsXG4gICAgICAgIDQ2OiAnZGVsJyxcbiAgICAgICAgOTE6ICdtZXRhJyxcbiAgICAgICAgOTM6ICdtZXRhJyxcbiAgICAgICAgMjI0OiAnbWV0YSdcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogbWFwcGluZyBmb3Igc3BlY2lhbCBjaGFyYWN0ZXJzIHNvIHRoZXkgY2FuIHN1cHBvcnRcbiAgICAgKlxuICAgICAqIHRoaXMgZGljdGlvbmFyeSBpcyBvbmx5IHVzZWQgaW5jYXNlIHlvdSB3YW50IHRvIGJpbmQgYVxuICAgICAqIGtleXVwIG9yIGtleWRvd24gZXZlbnQgdG8gb25lIG9mIHRoZXNlIGtleXNcbiAgICAgKlxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgdmFyIF9LRVlDT0RFX01BUCA9IHtcbiAgICAgICAgMTA2OiAnKicsXG4gICAgICAgIDEwNzogJysnLFxuICAgICAgICAxMDk6ICctJyxcbiAgICAgICAgMTEwOiAnLicsXG4gICAgICAgIDExMSA6ICcvJyxcbiAgICAgICAgMTg2OiAnOycsXG4gICAgICAgIDE4NzogJz0nLFxuICAgICAgICAxODg6ICcsJyxcbiAgICAgICAgMTg5OiAnLScsXG4gICAgICAgIDE5MDogJy4nLFxuICAgICAgICAxOTE6ICcvJyxcbiAgICAgICAgMTkyOiAnYCcsXG4gICAgICAgIDIxOTogJ1snLFxuICAgICAgICAyMjA6ICdcXFxcJyxcbiAgICAgICAgMjIxOiAnXScsXG4gICAgICAgIDIyMjogJ1xcJydcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogdGhpcyBpcyBhIG1hcHBpbmcgb2Yga2V5cyB0aGF0IHJlcXVpcmUgc2hpZnQgb24gYSBVUyBrZXlwYWRcbiAgICAgKiBiYWNrIHRvIHRoZSBub24gc2hpZnQgZXF1aXZlbGVudHNcbiAgICAgKlxuICAgICAqIHRoaXMgaXMgc28geW91IGNhbiB1c2Uga2V5dXAgZXZlbnRzIHdpdGggdGhlc2Uga2V5c1xuICAgICAqXG4gICAgICogbm90ZSB0aGF0IHRoaXMgd2lsbCBvbmx5IHdvcmsgcmVsaWFibHkgb24gVVMga2V5Ym9hcmRzXG4gICAgICpcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHZhciBfU0hJRlRfTUFQID0ge1xuICAgICAgICAnfic6ICdgJyxcbiAgICAgICAgJyEnOiAnMScsXG4gICAgICAgICdAJzogJzInLFxuICAgICAgICAnIyc6ICczJyxcbiAgICAgICAgJyQnOiAnNCcsXG4gICAgICAgICclJzogJzUnLFxuICAgICAgICAnXic6ICc2JyxcbiAgICAgICAgJyYnOiAnNycsXG4gICAgICAgICcqJzogJzgnLFxuICAgICAgICAnKCc6ICc5JyxcbiAgICAgICAgJyknOiAnMCcsXG4gICAgICAgICdfJzogJy0nLFxuICAgICAgICAnKyc6ICc9JyxcbiAgICAgICAgJzonOiAnOycsXG4gICAgICAgICdcXFwiJzogJ1xcJycsXG4gICAgICAgICc8JzogJywnLFxuICAgICAgICAnPic6ICcuJyxcbiAgICAgICAgJz8nOiAnLycsXG4gICAgICAgICd8JzogJ1xcXFwnXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIHRoaXMgaXMgYSBsaXN0IG9mIHNwZWNpYWwgc3RyaW5ncyB5b3UgY2FuIHVzZSB0byBtYXBcbiAgICAgKiB0byBtb2RpZmllciBrZXlzIHdoZW4geW91IHNwZWNpZnkgeW91ciBrZXlib2FyZCBzaG9ydGN1dHNcbiAgICAgKlxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgdmFyIF9TUEVDSUFMX0FMSUFTRVMgPSB7XG4gICAgICAgICdvcHRpb24nOiAnYWx0JyxcbiAgICAgICAgJ2NvbW1hbmQnOiAnbWV0YScsXG4gICAgICAgICdyZXR1cm4nOiAnZW50ZXInLFxuICAgICAgICAnZXNjYXBlJzogJ2VzYycsXG4gICAgICAgICdwbHVzJzogJysnLFxuICAgICAgICAnbW9kJzogL01hY3xpUG9kfGlQaG9uZXxpUGFkLy50ZXN0KG5hdmlnYXRvci5wbGF0Zm9ybSkgPyAnbWV0YScgOiAnY3RybCdcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogdmFyaWFibGUgdG8gc3RvcmUgdGhlIGZsaXBwZWQgdmVyc2lvbiBvZiBfTUFQIGZyb20gYWJvdmVcbiAgICAgKiBuZWVkZWQgdG8gY2hlY2sgaWYgd2Ugc2hvdWxkIHVzZSBrZXlwcmVzcyBvciBub3Qgd2hlbiBubyBhY3Rpb25cbiAgICAgKiBpcyBzcGVjaWZpZWRcbiAgICAgKlxuICAgICAqIEB0eXBlIHtPYmplY3R8dW5kZWZpbmVkfVxuICAgICAqL1xuICAgIHZhciBfUkVWRVJTRV9NQVA7XG5cbiAgICAvKipcbiAgICAgKiBsb29wIHRocm91Z2ggdGhlIGYga2V5cywgZjEgdG8gZjE5IGFuZCBhZGQgdGhlbSB0byB0aGUgbWFwXG4gICAgICogcHJvZ3JhbWF0aWNhbGx5XG4gICAgICovXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCAyMDsgKytpKSB7XG4gICAgICAgIF9NQVBbMTExICsgaV0gPSAnZicgKyBpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGxvb3AgdGhyb3VnaCB0byBtYXAgbnVtYmVycyBvbiB0aGUgbnVtZXJpYyBrZXlwYWRcbiAgICAgKi9cbiAgICBmb3IgKGkgPSAwOyBpIDw9IDk7ICsraSkge1xuXG4gICAgICAgIC8vIFRoaXMgbmVlZHMgdG8gdXNlIGEgc3RyaW5nIGNhdXNlIG90aGVyd2lzZSBzaW5jZSAwIGlzIGZhbHNleVxuICAgICAgICAvLyBtb3VzZXRyYXAgd2lsbCBuZXZlciBmaXJlIGZvciBudW1wYWQgMCBwcmVzc2VkIGFzIHBhcnQgb2YgYSBrZXlkb3duXG4gICAgICAgIC8vIGV2ZW50LlxuICAgICAgICAvL1xuICAgICAgICAvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9jY2FtcGJlbGwvbW91c2V0cmFwL3B1bGwvMjU4XG4gICAgICAgIF9NQVBbaSArIDk2XSA9IGkudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjcm9zcyBicm93c2VyIGFkZCBldmVudCBtZXRob2RcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RWxlbWVudHxIVE1MRG9jdW1lbnR9IG9iamVjdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgZnVuY3Rpb24gX2FkZEV2ZW50KG9iamVjdCwgdHlwZSwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKG9iamVjdC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBvYmplY3QuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjaywgZmFsc2UpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgb2JqZWN0LmF0dGFjaEV2ZW50KCdvbicgKyB0eXBlLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdGFrZXMgdGhlIGV2ZW50IGFuZCByZXR1cm5zIHRoZSBrZXkgY2hhcmFjdGVyXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9jaGFyYWN0ZXJGcm9tRXZlbnQoZSkge1xuXG4gICAgICAgIC8vIGZvciBrZXlwcmVzcyBldmVudHMgd2Ugc2hvdWxkIHJldHVybiB0aGUgY2hhcmFjdGVyIGFzIGlzXG4gICAgICAgIGlmIChlLnR5cGUgPT0gJ2tleXByZXNzJykge1xuICAgICAgICAgICAgdmFyIGNoYXJhY3RlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZSBzaGlmdCBrZXkgaXMgbm90IHByZXNzZWQgdGhlbiBpdCBpcyBzYWZlIHRvIGFzc3VtZVxuICAgICAgICAgICAgLy8gdGhhdCB3ZSB3YW50IHRoZSBjaGFyYWN0ZXIgdG8gYmUgbG93ZXJjYXNlLiAgdGhpcyBtZWFucyBpZlxuICAgICAgICAgICAgLy8geW91IGFjY2lkZW50YWxseSBoYXZlIGNhcHMgbG9jayBvbiB0aGVuIHlvdXIga2V5IGJpbmRpbmdzXG4gICAgICAgICAgICAvLyB3aWxsIGNvbnRpbnVlIHRvIHdvcmtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyB0aGUgb25seSBzaWRlIGVmZmVjdCB0aGF0IG1pZ2h0IG5vdCBiZSBkZXNpcmVkIGlzIGlmIHlvdVxuICAgICAgICAgICAgLy8gYmluZCBzb21ldGhpbmcgbGlrZSAnQScgY2F1c2UgeW91IHdhbnQgdG8gdHJpZ2dlciBhblxuICAgICAgICAgICAgLy8gZXZlbnQgd2hlbiBjYXBpdGFsIEEgaXMgcHJlc3NlZCBjYXBzIGxvY2sgd2lsbCBubyBsb25nZXJcbiAgICAgICAgICAgIC8vIHRyaWdnZXIgdGhlIGV2ZW50LiAgc2hpZnQrYSB3aWxsIHRob3VnaC5cbiAgICAgICAgICAgIGlmICghZS5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgIGNoYXJhY3RlciA9IGNoYXJhY3Rlci50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gY2hhcmFjdGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZm9yIG5vbiBrZXlwcmVzcyBldmVudHMgdGhlIHNwZWNpYWwgbWFwcyBhcmUgbmVlZGVkXG4gICAgICAgIGlmIChfTUFQW2Uud2hpY2hdKSB7XG4gICAgICAgICAgICByZXR1cm4gX01BUFtlLndoaWNoXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfS0VZQ09ERV9NQVBbZS53aGljaF0pIHtcbiAgICAgICAgICAgIHJldHVybiBfS0VZQ09ERV9NQVBbZS53aGljaF07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBpdCBpcyBub3QgaW4gdGhlIHNwZWNpYWwgbWFwXG5cbiAgICAgICAgLy8gd2l0aCBrZXlkb3duIGFuZCBrZXl1cCBldmVudHMgdGhlIGNoYXJhY3RlciBzZWVtcyB0byBhbHdheXNcbiAgICAgICAgLy8gY29tZSBpbiBhcyBhbiB1cHBlcmNhc2UgY2hhcmFjdGVyIHdoZXRoZXIgeW91IGFyZSBwcmVzc2luZyBzaGlmdFxuICAgICAgICAvLyBvciBub3QuICB3ZSBzaG91bGQgbWFrZSBzdXJlIGl0IGlzIGFsd2F5cyBsb3dlcmNhc2UgZm9yIGNvbXBhcmlzb25zXG4gICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hlY2tzIGlmIHR3byBhcnJheXMgYXJlIGVxdWFsXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBtb2RpZmllcnMxXG4gICAgICogQHBhcmFtIHtBcnJheX0gbW9kaWZpZXJzMlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9tb2RpZmllcnNNYXRjaChtb2RpZmllcnMxLCBtb2RpZmllcnMyKSB7XG4gICAgICAgIHJldHVybiBtb2RpZmllcnMxLnNvcnQoKS5qb2luKCcsJykgPT09IG1vZGlmaWVyczIuc29ydCgpLmpvaW4oJywnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB0YWtlcyBhIGtleSBldmVudCBhbmQgZmlndXJlcyBvdXQgd2hhdCB0aGUgbW9kaWZpZXJzIGFyZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfZXZlbnRNb2RpZmllcnMoZSkge1xuICAgICAgICB2YXIgbW9kaWZpZXJzID0gW107XG5cbiAgICAgICAgaWYgKGUuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgIG1vZGlmaWVycy5wdXNoKCdzaGlmdCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGUuYWx0S2V5KSB7XG4gICAgICAgICAgICBtb2RpZmllcnMucHVzaCgnYWx0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZS5jdHJsS2V5KSB7XG4gICAgICAgICAgICBtb2RpZmllcnMucHVzaCgnY3RybCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGUubWV0YUtleSkge1xuICAgICAgICAgICAgbW9kaWZpZXJzLnB1c2goJ21ldGEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtb2RpZmllcnM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcHJldmVudHMgZGVmYXVsdCBmb3IgdGhpcyBldmVudFxuICAgICAqXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfcHJldmVudERlZmF1bHQoZSkge1xuICAgICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHN0b3BzIHByb3BvZ2F0aW9uIGZvciB0aGlzIGV2ZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9zdG9wUHJvcGFnYXRpb24oZSkge1xuICAgICAgICBpZiAoZS5zdG9wUHJvcGFnYXRpb24pIHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBlLmNhbmNlbEJ1YmJsZSA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZGV0ZXJtaW5lcyBpZiB0aGUga2V5Y29kZSBzcGVjaWZpZWQgaXMgYSBtb2RpZmllciBrZXkgb3Igbm90XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gX2lzTW9kaWZpZXIoa2V5KSB7XG4gICAgICAgIHJldHVybiBrZXkgPT0gJ3NoaWZ0JyB8fCBrZXkgPT0gJ2N0cmwnIHx8IGtleSA9PSAnYWx0JyB8fCBrZXkgPT0gJ21ldGEnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJldmVyc2VzIHRoZSBtYXAgbG9va3VwIHNvIHRoYXQgd2UgY2FuIGxvb2sgZm9yIHNwZWNpZmljIGtleXNcbiAgICAgKiB0byBzZWUgd2hhdCBjYW4gYW5kIGNhbid0IHVzZSBrZXlwcmVzc1xuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9nZXRSZXZlcnNlTWFwKCkge1xuICAgICAgICBpZiAoIV9SRVZFUlNFX01BUCkge1xuICAgICAgICAgICAgX1JFVkVSU0VfTUFQID0ge307XG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gX01BUCkge1xuXG4gICAgICAgICAgICAgICAgLy8gcHVsbCBvdXQgdGhlIG51bWVyaWMga2V5cGFkIGZyb20gaGVyZSBjYXVzZSBrZXlwcmVzcyBzaG91bGRcbiAgICAgICAgICAgICAgICAvLyBiZSBhYmxlIHRvIGRldGVjdCB0aGUga2V5cyBmcm9tIHRoZSBjaGFyYWN0ZXJcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID4gOTUgJiYga2V5IDwgMTEyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChfTUFQLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgX1JFVkVSU0VfTUFQW19NQVBba2V5XV0gPSBrZXk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfUkVWRVJTRV9NQVA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcGlja3MgdGhlIGJlc3QgYWN0aW9uIGJhc2VkIG9uIHRoZSBrZXkgY29tYmluYXRpb25cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBjaGFyYWN0ZXIgZm9yIGtleVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IG1vZGlmaWVyc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gYWN0aW9uIHBhc3NlZCBpblxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9waWNrQmVzdEFjdGlvbihrZXksIG1vZGlmaWVycywgYWN0aW9uKSB7XG5cbiAgICAgICAgLy8gaWYgbm8gYWN0aW9uIHdhcyBwaWNrZWQgaW4gd2Ugc2hvdWxkIHRyeSB0byBwaWNrIHRoZSBvbmVcbiAgICAgICAgLy8gdGhhdCB3ZSB0aGluayB3b3VsZCB3b3JrIGJlc3QgZm9yIHRoaXMga2V5XG4gICAgICAgIGlmICghYWN0aW9uKSB7XG4gICAgICAgICAgICBhY3Rpb24gPSBfZ2V0UmV2ZXJzZU1hcCgpW2tleV0gPyAna2V5ZG93bicgOiAna2V5cHJlc3MnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbW9kaWZpZXIga2V5cyBkb24ndCB3b3JrIGFzIGV4cGVjdGVkIHdpdGgga2V5cHJlc3MsXG4gICAgICAgIC8vIHN3aXRjaCB0byBrZXlkb3duXG4gICAgICAgIGlmIChhY3Rpb24gPT0gJ2tleXByZXNzJyAmJiBtb2RpZmllcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBhY3Rpb24gPSAna2V5ZG93bic7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYWN0aW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGZyb20gYSBzdHJpbmcga2V5IGNvbWJpbmF0aW9uIHRvIGFuIGFycmF5XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGNvbWJpbmF0aW9uIGxpa2UgXCJjb21tYW5kK3NoaWZ0K2xcIlxuICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9rZXlzRnJvbVN0cmluZyhjb21iaW5hdGlvbikge1xuICAgICAgICBpZiAoY29tYmluYXRpb24gPT09ICcrJykge1xuICAgICAgICAgICAgcmV0dXJuIFsnKyddO1xuICAgICAgICB9XG5cbiAgICAgICAgY29tYmluYXRpb24gPSBjb21iaW5hdGlvbi5yZXBsYWNlKC9cXCt7Mn0vZywgJytwbHVzJyk7XG4gICAgICAgIHJldHVybiBjb21iaW5hdGlvbi5zcGxpdCgnKycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgaW5mbyBmb3IgYSBzcGVjaWZpYyBrZXkgY29tYmluYXRpb25cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gY29tYmluYXRpb24ga2V5IGNvbWJpbmF0aW9uIChcImNvbW1hbmQrc1wiIG9yIFwiYVwiIG9yIFwiKlwiKVxuICAgICAqIEBwYXJhbSAge3N0cmluZz19IGFjdGlvblxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgZnVuY3Rpb24gX2dldEtleUluZm8oY29tYmluYXRpb24sIGFjdGlvbikge1xuICAgICAgICB2YXIga2V5cztcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIHZhciBtb2RpZmllcnMgPSBbXTtcblxuICAgICAgICAvLyB0YWtlIHRoZSBrZXlzIGZyb20gdGhpcyBwYXR0ZXJuIGFuZCBmaWd1cmUgb3V0IHdoYXQgdGhlIGFjdHVhbFxuICAgICAgICAvLyBwYXR0ZXJuIGlzIGFsbCBhYm91dFxuICAgICAgICBrZXlzID0gX2tleXNGcm9tU3RyaW5nKGNvbWJpbmF0aW9uKTtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAga2V5ID0ga2V5c1tpXTtcblxuICAgICAgICAgICAgLy8gbm9ybWFsaXplIGtleSBuYW1lc1xuICAgICAgICAgICAgaWYgKF9TUEVDSUFMX0FMSUFTRVNba2V5XSkge1xuICAgICAgICAgICAgICAgIGtleSA9IF9TUEVDSUFMX0FMSUFTRVNba2V5XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgdGhpcyBpcyBub3QgYSBrZXlwcmVzcyBldmVudCB0aGVuIHdlIHNob3VsZFxuICAgICAgICAgICAgLy8gYmUgc21hcnQgYWJvdXQgdXNpbmcgc2hpZnQga2V5c1xuICAgICAgICAgICAgLy8gdGhpcyB3aWxsIG9ubHkgd29yayBmb3IgVVMga2V5Ym9hcmRzIGhvd2V2ZXJcbiAgICAgICAgICAgIGlmIChhY3Rpb24gJiYgYWN0aW9uICE9ICdrZXlwcmVzcycgJiYgX1NISUZUX01BUFtrZXldKSB7XG4gICAgICAgICAgICAgICAga2V5ID0gX1NISUZUX01BUFtrZXldO1xuICAgICAgICAgICAgICAgIG1vZGlmaWVycy5wdXNoKCdzaGlmdCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiB0aGlzIGtleSBpcyBhIG1vZGlmaWVyIHRoZW4gYWRkIGl0IHRvIHRoZSBsaXN0IG9mIG1vZGlmaWVyc1xuICAgICAgICAgICAgaWYgKF9pc01vZGlmaWVyKGtleSkpIHtcbiAgICAgICAgICAgICAgICBtb2RpZmllcnMucHVzaChrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGVwZW5kaW5nIG9uIHdoYXQgdGhlIGtleSBjb21iaW5hdGlvbiBpc1xuICAgICAgICAvLyB3ZSB3aWxsIHRyeSB0byBwaWNrIHRoZSBiZXN0IGV2ZW50IGZvciBpdFxuICAgICAgICBhY3Rpb24gPSBfcGlja0Jlc3RBY3Rpb24oa2V5LCBtb2RpZmllcnMsIGFjdGlvbik7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgbW9kaWZpZXJzOiBtb2RpZmllcnMsXG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvblxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9iZWxvbmdzVG8oZWxlbWVudCwgYW5jZXN0b3IpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQgPT09IG51bGwgfHwgZWxlbWVudCA9PT0gZG9jdW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbGVtZW50ID09PSBhbmNlc3Rvcikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gX2JlbG9uZ3NUbyhlbGVtZW50LnBhcmVudE5vZGUsIGFuY2VzdG9yKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBNb3VzZXRyYXAodGFyZ2V0RWxlbWVudCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGFyZ2V0RWxlbWVudCA9IHRhcmdldEVsZW1lbnQgfHwgZG9jdW1lbnQ7XG5cbiAgICAgICAgaWYgKCEoc2VsZiBpbnN0YW5jZW9mIE1vdXNldHJhcCkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTW91c2V0cmFwKHRhcmdldEVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGVsZW1lbnQgdG8gYXR0YWNoIGtleSBldmVudHMgdG9cbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge0VsZW1lbnR9XG4gICAgICAgICAqL1xuICAgICAgICBzZWxmLnRhcmdldCA9IHRhcmdldEVsZW1lbnQ7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGEgbGlzdCBvZiBhbGwgdGhlIGNhbGxiYWNrcyBzZXR1cCB2aWEgTW91c2V0cmFwLmJpbmQoKVxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgc2VsZi5fY2FsbGJhY2tzID0ge307XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRpcmVjdCBtYXAgb2Ygc3RyaW5nIGNvbWJpbmF0aW9ucyB0byBjYWxsYmFja3MgdXNlZCBmb3IgdHJpZ2dlcigpXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICBzZWxmLl9kaXJlY3RNYXAgPSB7fTtcblxuICAgICAgICAvKipcbiAgICAgICAgICoga2VlcHMgdHJhY2sgb2Ygd2hhdCBsZXZlbCBlYWNoIHNlcXVlbmNlIGlzIGF0IHNpbmNlIG11bHRpcGxlXG4gICAgICAgICAqIHNlcXVlbmNlcyBjYW4gc3RhcnQgb3V0IHdpdGggdGhlIHNhbWUgc2VxdWVuY2VcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBfc2VxdWVuY2VMZXZlbHMgPSB7fTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogdmFyaWFibGUgdG8gc3RvcmUgdGhlIHNldFRpbWVvdXQgY2FsbFxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7bnVsbHxudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgX3Jlc2V0VGltZXI7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHRlbXBvcmFyeSBzdGF0ZSB3aGVyZSB3ZSB3aWxsIGlnbm9yZSB0aGUgbmV4dCBrZXl1cFxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbnxzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgX2lnbm9yZU5leHRLZXl1cCA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiB0ZW1wb3Jhcnkgc3RhdGUgd2hlcmUgd2Ugd2lsbCBpZ25vcmUgdGhlIG5leHQga2V5cHJlc3NcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgX2lnbm9yZU5leHRLZXlwcmVzcyA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBhcmUgd2UgY3VycmVudGx5IGluc2lkZSBvZiBhIHNlcXVlbmNlP1xuICAgICAgICAgKiB0eXBlIG9mIGFjdGlvbiAoXCJrZXl1cFwiIG9yIFwia2V5ZG93blwiIG9yIFwia2V5cHJlc3NcIikgb3IgZmFsc2VcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW58c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIF9uZXh0RXhwZWN0ZWRBY3Rpb24gPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogcmVzZXRzIGFsbCBzZXF1ZW5jZSBjb3VudGVycyBleGNlcHQgZm9yIHRoZSBvbmVzIHBhc3NlZCBpblxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gZG9Ob3RSZXNldFxuICAgICAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBfcmVzZXRTZXF1ZW5jZXMoZG9Ob3RSZXNldCkge1xuICAgICAgICAgICAgZG9Ob3RSZXNldCA9IGRvTm90UmVzZXQgfHwge307XG5cbiAgICAgICAgICAgIHZhciBhY3RpdmVTZXF1ZW5jZXMgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICBrZXk7XG5cbiAgICAgICAgICAgIGZvciAoa2V5IGluIF9zZXF1ZW5jZUxldmVscykge1xuICAgICAgICAgICAgICAgIGlmIChkb05vdFJlc2V0W2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlU2VxdWVuY2VzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF9zZXF1ZW5jZUxldmVsc1trZXldID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFhY3RpdmVTZXF1ZW5jZXMpIHtcbiAgICAgICAgICAgICAgICBfbmV4dEV4cGVjdGVkQWN0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogZmluZHMgYWxsIGNhbGxiYWNrcyB0aGF0IG1hdGNoIGJhc2VkIG9uIHRoZSBrZXljb2RlLCBtb2RpZmllcnMsXG4gICAgICAgICAqIGFuZCBhY3Rpb25cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGNoYXJhY3RlclxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBtb2RpZmllcnNcbiAgICAgICAgICogQHBhcmFtIHtFdmVudHxPYmplY3R9IGVcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmc9fSBzZXF1ZW5jZU5hbWUgLSBuYW1lIG9mIHRoZSBzZXF1ZW5jZSB3ZSBhcmUgbG9va2luZyBmb3JcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmc9fSBjb21iaW5hdGlvblxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcj19IGxldmVsXG4gICAgICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRNYXRjaGVzKGNoYXJhY3RlciwgbW9kaWZpZXJzLCBlLCBzZXF1ZW5jZU5hbWUsIGNvbWJpbmF0aW9uLCBsZXZlbCkge1xuICAgICAgICAgICAgdmFyIGk7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2s7XG4gICAgICAgICAgICB2YXIgbWF0Y2hlcyA9IFtdO1xuICAgICAgICAgICAgdmFyIGFjdGlvbiA9IGUudHlwZTtcblxuICAgICAgICAgICAgLy8gaWYgdGhlcmUgYXJlIG5vIGV2ZW50cyByZWxhdGVkIHRvIHRoaXMga2V5Y29kZVxuICAgICAgICAgICAgaWYgKCFzZWxmLl9jYWxsYmFja3NbY2hhcmFjdGVyXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgYSBtb2RpZmllciBrZXkgaXMgY29taW5nIHVwIG9uIGl0cyBvd24gd2Ugc2hvdWxkIGFsbG93IGl0XG4gICAgICAgICAgICBpZiAoYWN0aW9uID09ICdrZXl1cCcgJiYgX2lzTW9kaWZpZXIoY2hhcmFjdGVyKSkge1xuICAgICAgICAgICAgICAgIG1vZGlmaWVycyA9IFtjaGFyYWN0ZXJdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBsb29wIHRocm91Z2ggYWxsIGNhbGxiYWNrcyBmb3IgdGhlIGtleSB0aGF0IHdhcyBwcmVzc2VkXG4gICAgICAgICAgICAvLyBhbmQgc2VlIGlmIGFueSBvZiB0aGVtIG1hdGNoXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc2VsZi5fY2FsbGJhY2tzW2NoYXJhY3Rlcl0ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IHNlbGYuX2NhbGxiYWNrc1tjaGFyYWN0ZXJdW2ldO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgYSBzZXF1ZW5jZSBuYW1lIGlzIG5vdCBzcGVjaWZpZWQsIGJ1dCB0aGlzIGlzIGEgc2VxdWVuY2UgYXRcbiAgICAgICAgICAgICAgICAvLyB0aGUgd3JvbmcgbGV2ZWwgdGhlbiBtb3ZlIG9udG8gdGhlIG5leHQgbWF0Y2hcbiAgICAgICAgICAgICAgICBpZiAoIXNlcXVlbmNlTmFtZSAmJiBjYWxsYmFjay5zZXEgJiYgX3NlcXVlbmNlTGV2ZWxzW2NhbGxiYWNrLnNlcV0gIT0gY2FsbGJhY2subGV2ZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIGFjdGlvbiB3ZSBhcmUgbG9va2luZyBmb3IgZG9lc24ndCBtYXRjaCB0aGUgYWN0aW9uIHdlIGdvdFxuICAgICAgICAgICAgICAgIC8vIHRoZW4gd2Ugc2hvdWxkIGtlZXAgZ29pbmdcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uICE9IGNhbGxiYWNrLmFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBpZiB0aGlzIGlzIGEga2V5cHJlc3MgZXZlbnQgYW5kIHRoZSBtZXRhIGtleSBhbmQgY29udHJvbCBrZXlcbiAgICAgICAgICAgICAgICAvLyBhcmUgbm90IHByZXNzZWQgdGhhdCBtZWFucyB0aGF0IHdlIG5lZWQgdG8gb25seSBsb29rIGF0IHRoZVxuICAgICAgICAgICAgICAgIC8vIGNoYXJhY3Rlciwgb3RoZXJ3aXNlIGNoZWNrIHRoZSBtb2RpZmllcnMgYXMgd2VsbFxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgLy8gY2hyb21lIHdpbGwgbm90IGZpcmUgYSBrZXlwcmVzcyBpZiBtZXRhIG9yIGNvbnRyb2wgaXMgZG93blxuICAgICAgICAgICAgICAgIC8vIHNhZmFyaSB3aWxsIGZpcmUgYSBrZXlwcmVzcyBpZiBtZXRhIG9yIG1ldGErc2hpZnQgaXMgZG93blxuICAgICAgICAgICAgICAgIC8vIGZpcmVmb3ggd2lsbCBmaXJlIGEga2V5cHJlc3MgaWYgbWV0YSBvciBjb250cm9sIGlzIGRvd25cbiAgICAgICAgICAgICAgICBpZiAoKGFjdGlvbiA9PSAna2V5cHJlc3MnICYmICFlLm1ldGFLZXkgJiYgIWUuY3RybEtleSkgfHwgX21vZGlmaWVyc01hdGNoKG1vZGlmaWVycywgY2FsbGJhY2subW9kaWZpZXJzKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHdoZW4geW91IGJpbmQgYSBjb21iaW5hdGlvbiBvciBzZXF1ZW5jZSBhIHNlY29uZCB0aW1lIGl0XG4gICAgICAgICAgICAgICAgICAgIC8vIHNob3VsZCBvdmVyd3JpdGUgdGhlIGZpcnN0IG9uZS4gIGlmIGEgc2VxdWVuY2VOYW1lIG9yXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbWJpbmF0aW9uIGlzIHNwZWNpZmllZCBpbiB0aGlzIGNhbGwgaXQgZG9lcyBqdXN0IHRoYXRcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gQHRvZG8gbWFrZSBkZWxldGluZyBpdHMgb3duIG1ldGhvZD9cbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlbGV0ZUNvbWJvID0gIXNlcXVlbmNlTmFtZSAmJiBjYWxsYmFjay5jb21ibyA9PSBjb21iaW5hdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlbGV0ZVNlcXVlbmNlID0gc2VxdWVuY2VOYW1lICYmIGNhbGxiYWNrLnNlcSA9PSBzZXF1ZW5jZU5hbWUgJiYgY2FsbGJhY2subGV2ZWwgPT0gbGV2ZWw7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWxldGVDb21ibyB8fCBkZWxldGVTZXF1ZW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fY2FsbGJhY2tzW2NoYXJhY3Rlcl0uc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcy5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBtYXRjaGVzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGFjdHVhbGx5IGNhbGxzIHRoZSBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICAgKlxuICAgICAgICAgKiBpZiB5b3VyIGNhbGxiYWNrIGZ1bmN0aW9uIHJldHVybnMgZmFsc2UgdGhpcyB3aWxsIHVzZSB0aGUganF1ZXJ5XG4gICAgICAgICAqIGNvbnZlbnRpb24gLSBwcmV2ZW50IGRlZmF1bHQgYW5kIHN0b3AgcHJvcG9nYXRpb24gb24gdGhlIGV2ZW50XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICAgICAgICogQHJldHVybnMgdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX2ZpcmVDYWxsYmFjayhjYWxsYmFjaywgZSwgY29tYm8sIHNlcXVlbmNlKSB7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoaXMgZXZlbnQgc2hvdWxkIG5vdCBoYXBwZW4gc3RvcCBoZXJlXG4gICAgICAgICAgICBpZiAoc2VsZi5zdG9wQ2FsbGJhY2soZSwgZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50LCBjb21ibywgc2VxdWVuY2UpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2soZSwgY29tYm8pID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIF9wcmV2ZW50RGVmYXVsdChlKTtcbiAgICAgICAgICAgICAgICBfc3RvcFByb3BhZ2F0aW9uKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGhhbmRsZXMgYSBjaGFyYWN0ZXIga2V5IGV2ZW50XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjaGFyYWN0ZXJcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gbW9kaWZpZXJzXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICAgICAgICogQHJldHVybnMgdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgc2VsZi5faGFuZGxlS2V5ID0gZnVuY3Rpb24oY2hhcmFjdGVyLCBtb2RpZmllcnMsIGUpIHtcbiAgICAgICAgICAgIHZhciBjYWxsYmFja3MgPSBfZ2V0TWF0Y2hlcyhjaGFyYWN0ZXIsIG1vZGlmaWVycywgZSk7XG4gICAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICAgIHZhciBkb05vdFJlc2V0ID0ge307XG4gICAgICAgICAgICB2YXIgbWF4TGV2ZWwgPSAwO1xuICAgICAgICAgICAgdmFyIHByb2Nlc3NlZFNlcXVlbmNlQ2FsbGJhY2sgPSBmYWxzZTtcblxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBtYXhMZXZlbCBmb3Igc2VxdWVuY2VzIHNvIHdlIGNhbiBvbmx5IGV4ZWN1dGUgdGhlIGxvbmdlc3QgY2FsbGJhY2sgc2VxdWVuY2VcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2tzW2ldLnNlcSkge1xuICAgICAgICAgICAgICAgICAgICBtYXhMZXZlbCA9IE1hdGgubWF4KG1heExldmVsLCBjYWxsYmFja3NbaV0ubGV2ZWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbG9vcCB0aHJvdWdoIG1hdGNoaW5nIGNhbGxiYWNrcyBmb3IgdGhpcyBrZXkgZXZlbnRcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICAgICAgICAgIC8vIGZpcmUgZm9yIGFsbCBzZXF1ZW5jZSBjYWxsYmFja3NcbiAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGJlY2F1c2UgaWYgZm9yIGV4YW1wbGUgeW91IGhhdmUgbXVsdGlwbGUgc2VxdWVuY2VzXG4gICAgICAgICAgICAgICAgLy8gYm91bmQgc3VjaCBhcyBcImcgaVwiIGFuZCBcImcgdFwiIHRoZXkgYm90aCBuZWVkIHRvIGZpcmUgdGhlXG4gICAgICAgICAgICAgICAgLy8gY2FsbGJhY2sgZm9yIG1hdGNoaW5nIGcgY2F1c2Ugb3RoZXJ3aXNlIHlvdSBjYW4gb25seSBldmVyXG4gICAgICAgICAgICAgICAgLy8gbWF0Y2ggdGhlIGZpcnN0IG9uZVxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFja3NbaV0uc2VxKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gb25seSBmaXJlIGNhbGxiYWNrcyBmb3IgdGhlIG1heExldmVsIHRvIHByZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgLy8gc3Vic2VxdWVuY2VzIGZyb20gYWxzbyBmaXJpbmdcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gZm9yIGV4YW1wbGUgJ2Egb3B0aW9uIGInIHNob3VsZCBub3QgY2F1c2UgJ29wdGlvbiBiJyB0byBmaXJlXG4gICAgICAgICAgICAgICAgICAgIC8vIGV2ZW4gdGhvdWdoICdvcHRpb24gYicgaXMgcGFydCBvZiB0aGUgb3RoZXIgc2VxdWVuY2VcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gYW55IHNlcXVlbmNlcyB0aGF0IGRvIG5vdCBtYXRjaCBoZXJlIHdpbGwgYmUgZGlzY2FyZGVkXG4gICAgICAgICAgICAgICAgICAgIC8vIGJlbG93IGJ5IHRoZSBfcmVzZXRTZXF1ZW5jZXMgY2FsbFxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2tzW2ldLmxldmVsICE9IG1heExldmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NlZFNlcXVlbmNlQ2FsbGJhY2sgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGtlZXAgYSBsaXN0IG9mIHdoaWNoIHNlcXVlbmNlcyB3ZXJlIG1hdGNoZXMgZm9yIGxhdGVyXG4gICAgICAgICAgICAgICAgICAgIGRvTm90UmVzZXRbY2FsbGJhY2tzW2ldLnNlcV0gPSAxO1xuICAgICAgICAgICAgICAgICAgICBfZmlyZUNhbGxiYWNrKGNhbGxiYWNrc1tpXS5jYWxsYmFjaywgZSwgY2FsbGJhY2tzW2ldLmNvbWJvLCBjYWxsYmFja3NbaV0uc2VxKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlcmUgd2VyZSBubyBzZXF1ZW5jZSBtYXRjaGVzIGJ1dCB3ZSBhcmUgc3RpbGwgaGVyZVxuICAgICAgICAgICAgICAgIC8vIHRoYXQgbWVhbnMgdGhpcyBpcyBhIHJlZ3VsYXIgbWF0Y2ggc28gd2Ugc2hvdWxkIGZpcmUgdGhhdFxuICAgICAgICAgICAgICAgIGlmICghcHJvY2Vzc2VkU2VxdWVuY2VDYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICBfZmlyZUNhbGxiYWNrKGNhbGxiYWNrc1tpXS5jYWxsYmFjaywgZSwgY2FsbGJhY2tzW2ldLmNvbWJvKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZSBrZXkgeW91IHByZXNzZWQgbWF0Y2hlcyB0aGUgdHlwZSBvZiBzZXF1ZW5jZSB3aXRob3V0XG4gICAgICAgICAgICAvLyBiZWluZyBhIG1vZGlmaWVyIChpZSBcImtleXVwXCIgb3IgXCJrZXlwcmVzc1wiKSB0aGVuIHdlIHNob3VsZFxuICAgICAgICAgICAgLy8gcmVzZXQgYWxsIHNlcXVlbmNlcyB0aGF0IHdlcmUgbm90IG1hdGNoZWQgYnkgdGhpcyBldmVudFxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIHRoaXMgaXMgc28sIGZvciBleGFtcGxlLCBpZiB5b3UgaGF2ZSB0aGUgc2VxdWVuY2UgXCJoIGEgdFwiIGFuZCB5b3VcbiAgICAgICAgICAgIC8vIHR5cGUgXCJoIGUgYSByIHRcIiBpdCBkb2VzIG5vdCBtYXRjaC4gIGluIHRoaXMgY2FzZSB0aGUgXCJlXCIgd2lsbFxuICAgICAgICAgICAgLy8gY2F1c2UgdGhlIHNlcXVlbmNlIHRvIHJlc2V0XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gbW9kaWZpZXIga2V5cyBhcmUgaWdub3JlZCBiZWNhdXNlIHlvdSBjYW4gaGF2ZSBhIHNlcXVlbmNlXG4gICAgICAgICAgICAvLyB0aGF0IGNvbnRhaW5zIG1vZGlmaWVycyBzdWNoIGFzIFwiZW50ZXIgY3RybCtzcGFjZVwiIGFuZCBpbiBtb3N0XG4gICAgICAgICAgICAvLyBjYXNlcyB0aGUgbW9kaWZpZXIga2V5IHdpbGwgYmUgcHJlc3NlZCBiZWZvcmUgdGhlIG5leHQga2V5XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gYWxzbyBpZiB5b3UgaGF2ZSBhIHNlcXVlbmNlIHN1Y2ggYXMgXCJjdHJsK2IgYVwiIHRoZW4gcHJlc3NpbmcgdGhlXG4gICAgICAgICAgICAvLyBcImJcIiBrZXkgd2lsbCB0cmlnZ2VyIGEgXCJrZXlwcmVzc1wiIGFuZCBhIFwia2V5ZG93blwiXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gdGhlIFwia2V5ZG93blwiIGlzIGV4cGVjdGVkIHdoZW4gdGhlcmUgaXMgYSBtb2RpZmllciwgYnV0IHRoZVxuICAgICAgICAgICAgLy8gXCJrZXlwcmVzc1wiIGVuZHMgdXAgbWF0Y2hpbmcgdGhlIF9uZXh0RXhwZWN0ZWRBY3Rpb24gc2luY2UgaXQgb2NjdXJzXG4gICAgICAgICAgICAvLyBhZnRlciBhbmQgdGhhdCBjYXVzZXMgdGhlIHNlcXVlbmNlIHRvIHJlc2V0XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gd2UgaWdub3JlIGtleXByZXNzZXMgaW4gYSBzZXF1ZW5jZSB0aGF0IGRpcmVjdGx5IGZvbGxvdyBhIGtleWRvd25cbiAgICAgICAgICAgIC8vIGZvciB0aGUgc2FtZSBjaGFyYWN0ZXJcbiAgICAgICAgICAgIHZhciBpZ25vcmVUaGlzS2V5cHJlc3MgPSBlLnR5cGUgPT0gJ2tleXByZXNzJyAmJiBfaWdub3JlTmV4dEtleXByZXNzO1xuICAgICAgICAgICAgaWYgKGUudHlwZSA9PSBfbmV4dEV4cGVjdGVkQWN0aW9uICYmICFfaXNNb2RpZmllcihjaGFyYWN0ZXIpICYmICFpZ25vcmVUaGlzS2V5cHJlc3MpIHtcbiAgICAgICAgICAgICAgICBfcmVzZXRTZXF1ZW5jZXMoZG9Ob3RSZXNldCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF9pZ25vcmVOZXh0S2V5cHJlc3MgPSBwcm9jZXNzZWRTZXF1ZW5jZUNhbGxiYWNrICYmIGUudHlwZSA9PSAna2V5ZG93bic7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGhhbmRsZXMgYSBrZXlkb3duIGV2ZW50XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICAgICAgICogQHJldHVybnMgdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX2hhbmRsZUtleUV2ZW50KGUpIHtcblxuICAgICAgICAgICAgLy8gbm9ybWFsaXplIGUud2hpY2ggZm9yIGtleSBldmVudHNcbiAgICAgICAgICAgIC8vIEBzZWUgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80Mjg1NjI3L2phdmFzY3JpcHQta2V5Y29kZS12cy1jaGFyY29kZS11dHRlci1jb25mdXNpb25cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZS53aGljaCAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBlLndoaWNoID0gZS5rZXlDb2RlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gX2NoYXJhY3RlckZyb21FdmVudChlKTtcblxuICAgICAgICAgICAgLy8gbm8gY2hhcmFjdGVyIGZvdW5kIHRoZW4gc3RvcFxuICAgICAgICAgICAgaWYgKCFjaGFyYWN0ZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG5lZWQgdG8gdXNlID09PSBmb3IgdGhlIGNoYXJhY3RlciBjaGVjayBiZWNhdXNlIHRoZSBjaGFyYWN0ZXIgY2FuIGJlIDBcbiAgICAgICAgICAgIGlmIChlLnR5cGUgPT0gJ2tleXVwJyAmJiBfaWdub3JlTmV4dEtleXVwID09PSBjaGFyYWN0ZXIpIHtcbiAgICAgICAgICAgICAgICBfaWdub3JlTmV4dEtleXVwID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWxmLmhhbmRsZUtleShjaGFyYWN0ZXIsIF9ldmVudE1vZGlmaWVycyhlKSwgZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogY2FsbGVkIHRvIHNldCBhIDEgc2Vjb25kIHRpbWVvdXQgb24gdGhlIHNwZWNpZmllZCBzZXF1ZW5jZVxuICAgICAgICAgKlxuICAgICAgICAgKiB0aGlzIGlzIHNvIGFmdGVyIGVhY2gga2V5IHByZXNzIGluIHRoZSBzZXF1ZW5jZSB5b3UgaGF2ZSAxIHNlY29uZFxuICAgICAgICAgKiB0byBwcmVzcyB0aGUgbmV4dCBrZXkgYmVmb3JlIHlvdSBoYXZlIHRvIHN0YXJ0IG92ZXJcbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMgdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX3Jlc2V0U2VxdWVuY2VUaW1lcigpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChfcmVzZXRUaW1lcik7XG4gICAgICAgICAgICBfcmVzZXRUaW1lciA9IHNldFRpbWVvdXQoX3Jlc2V0U2VxdWVuY2VzLCAxMDAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBiaW5kcyBhIGtleSBzZXF1ZW5jZSB0byBhbiBldmVudFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tYm8gLSBjb21ibyBzcGVjaWZpZWQgaW4gYmluZCBjYWxsXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGtleXNcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmc9fSBhY3Rpb25cbiAgICAgICAgICogQHJldHVybnMgdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX2JpbmRTZXF1ZW5jZShjb21ibywga2V5cywgY2FsbGJhY2ssIGFjdGlvbikge1xuXG4gICAgICAgICAgICAvLyBzdGFydCBvZmYgYnkgYWRkaW5nIGEgc2VxdWVuY2UgbGV2ZWwgcmVjb3JkIGZvciB0aGlzIGNvbWJpbmF0aW9uXG4gICAgICAgICAgICAvLyBhbmQgc2V0dGluZyB0aGUgbGV2ZWwgdG8gMFxuICAgICAgICAgICAgX3NlcXVlbmNlTGV2ZWxzW2NvbWJvXSA9IDA7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogY2FsbGJhY2sgdG8gaW5jcmVhc2UgdGhlIHNlcXVlbmNlIGxldmVsIGZvciB0aGlzIHNlcXVlbmNlIGFuZCByZXNldFxuICAgICAgICAgICAgICogYWxsIG90aGVyIHNlcXVlbmNlcyB0aGF0IHdlcmUgYWN0aXZlXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5leHRBY3Rpb25cbiAgICAgICAgICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gX2luY3JlYXNlU2VxdWVuY2UobmV4dEFjdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgX25leHRFeHBlY3RlZEFjdGlvbiA9IG5leHRBY3Rpb247XG4gICAgICAgICAgICAgICAgICAgICsrX3NlcXVlbmNlTGV2ZWxzW2NvbWJvXTtcbiAgICAgICAgICAgICAgICAgICAgX3Jlc2V0U2VxdWVuY2VUaW1lcigpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogd3JhcHMgdGhlIHNwZWNpZmllZCBjYWxsYmFjayBpbnNpZGUgb2YgYW5vdGhlciBmdW5jdGlvbiBpbiBvcmRlclxuICAgICAgICAgICAgICogdG8gcmVzZXQgYWxsIHNlcXVlbmNlIGNvdW50ZXJzIGFzIHNvb24gYXMgdGhpcyBzZXF1ZW5jZSBpcyBkb25lXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAgICAgICAgICogQHJldHVybnMgdm9pZFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBmdW5jdGlvbiBfY2FsbGJhY2tBbmRSZXNldChlKSB7XG4gICAgICAgICAgICAgICAgX2ZpcmVDYWxsYmFjayhjYWxsYmFjaywgZSwgY29tYm8pO1xuXG4gICAgICAgICAgICAgICAgLy8gd2Ugc2hvdWxkIGlnbm9yZSB0aGUgbmV4dCBrZXkgdXAgaWYgdGhlIGFjdGlvbiBpcyBrZXkgZG93blxuICAgICAgICAgICAgICAgIC8vIG9yIGtleXByZXNzLiAgdGhpcyBpcyBzbyBpZiB5b3UgZmluaXNoIGEgc2VxdWVuY2UgYW5kXG4gICAgICAgICAgICAgICAgLy8gcmVsZWFzZSB0aGUga2V5IHRoZSBmaW5hbCBrZXkgd2lsbCBub3QgdHJpZ2dlciBhIGtleXVwXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiAhPT0gJ2tleXVwJykge1xuICAgICAgICAgICAgICAgICAgICBfaWdub3JlTmV4dEtleXVwID0gX2NoYXJhY3RlckZyb21FdmVudChlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyB3ZWlyZCByYWNlIGNvbmRpdGlvbiBpZiBhIHNlcXVlbmNlIGVuZHMgd2l0aCB0aGUga2V5XG4gICAgICAgICAgICAgICAgLy8gYW5vdGhlciBzZXF1ZW5jZSBiZWdpbnMgd2l0aFxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoX3Jlc2V0U2VxdWVuY2VzLCAxMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGxvb3AgdGhyb3VnaCBrZXlzIG9uZSBhdCBhIHRpbWUgYW5kIGJpbmQgdGhlIGFwcHJvcHJpYXRlIGNhbGxiYWNrXG4gICAgICAgICAgICAvLyBmdW5jdGlvbi4gIGZvciBhbnkga2V5IGxlYWRpbmcgdXAgdG8gdGhlIGZpbmFsIG9uZSBpdCBzaG91bGRcbiAgICAgICAgICAgIC8vIGluY3JlYXNlIHRoZSBzZXF1ZW5jZS4gYWZ0ZXIgdGhlIGZpbmFsLCBpdCBzaG91bGQgcmVzZXQgYWxsIHNlcXVlbmNlc1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIGlmIGFuIGFjdGlvbiBpcyBzcGVjaWZpZWQgaW4gdGhlIG9yaWdpbmFsIGJpbmQgY2FsbCB0aGVuIHRoYXQgd2lsbFxuICAgICAgICAgICAgLy8gYmUgdXNlZCB0aHJvdWdob3V0LiAgb3RoZXJ3aXNlIHdlIHdpbGwgcGFzcyB0aGUgYWN0aW9uIHRoYXQgdGhlXG4gICAgICAgICAgICAvLyBuZXh0IGtleSBpbiB0aGUgc2VxdWVuY2Ugc2hvdWxkIG1hdGNoLiAgdGhpcyBhbGxvd3MgYSBzZXF1ZW5jZVxuICAgICAgICAgICAgLy8gdG8gbWl4IGFuZCBtYXRjaCBrZXlwcmVzcyBhbmQga2V5ZG93biBldmVudHMgZGVwZW5kaW5nIG9uIHdoaWNoXG4gICAgICAgICAgICAvLyBvbmVzIGFyZSBiZXR0ZXIgc3VpdGVkIHRvIHRoZSBrZXkgcHJvdmlkZWRcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIHZhciBpc0ZpbmFsID0gaSArIDEgPT09IGtleXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHZhciB3cmFwcGVkQ2FsbGJhY2sgPSBpc0ZpbmFsID8gX2NhbGxiYWNrQW5kUmVzZXQgOiBfaW5jcmVhc2VTZXF1ZW5jZShhY3Rpb24gfHwgX2dldEtleUluZm8oa2V5c1tpICsgMV0pLmFjdGlvbik7XG4gICAgICAgICAgICAgICAgX2JpbmRTaW5nbGUoa2V5c1tpXSwgd3JhcHBlZENhbGxiYWNrLCBhY3Rpb24sIGNvbWJvLCBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBiaW5kcyBhIHNpbmdsZSBrZXlib2FyZCBjb21iaW5hdGlvblxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tYmluYXRpb25cbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmc9fSBhY3Rpb25cbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmc9fSBzZXF1ZW5jZU5hbWUgLSBuYW1lIG9mIHNlcXVlbmNlIGlmIHBhcnQgb2Ygc2VxdWVuY2VcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXI9fSBsZXZlbCAtIHdoYXQgcGFydCBvZiB0aGUgc2VxdWVuY2UgdGhlIGNvbW1hbmQgaXNcbiAgICAgICAgICogQHJldHVybnMgdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX2JpbmRTaW5nbGUoY29tYmluYXRpb24sIGNhbGxiYWNrLCBhY3Rpb24sIHNlcXVlbmNlTmFtZSwgbGV2ZWwpIHtcblxuICAgICAgICAgICAgLy8gc3RvcmUgYSBkaXJlY3QgbWFwcGVkIHJlZmVyZW5jZSBmb3IgdXNlIHdpdGggTW91c2V0cmFwLnRyaWdnZXJcbiAgICAgICAgICAgIHNlbGYuX2RpcmVjdE1hcFtjb21iaW5hdGlvbiArICc6JyArIGFjdGlvbl0gPSBjYWxsYmFjaztcblxuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIG11bHRpcGxlIHNwYWNlcyBpbiBhIHJvdyBiZWNvbWUgYSBzaW5nbGUgc3BhY2VcbiAgICAgICAgICAgIGNvbWJpbmF0aW9uID0gY29tYmluYXRpb24ucmVwbGFjZSgvXFxzKy9nLCAnICcpO1xuXG4gICAgICAgICAgICB2YXIgc2VxdWVuY2UgPSBjb21iaW5hdGlvbi5zcGxpdCgnICcpO1xuICAgICAgICAgICAgdmFyIGluZm87XG5cbiAgICAgICAgICAgIC8vIGlmIHRoaXMgcGF0dGVybiBpcyBhIHNlcXVlbmNlIG9mIGtleXMgdGhlbiBydW4gdGhyb3VnaCB0aGlzIG1ldGhvZFxuICAgICAgICAgICAgLy8gdG8gcmVwcm9jZXNzIGVhY2ggcGF0dGVybiBvbmUga2V5IGF0IGEgdGltZVxuICAgICAgICAgICAgaWYgKHNlcXVlbmNlLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBfYmluZFNlcXVlbmNlKGNvbWJpbmF0aW9uLCBzZXF1ZW5jZSwgY2FsbGJhY2ssIGFjdGlvbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpbmZvID0gX2dldEtleUluZm8oY29tYmluYXRpb24sIGFjdGlvbik7XG5cbiAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0byBpbml0aWFsaXplIGFycmF5IGlmIHRoaXMgaXMgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgICAgIC8vIGEgY2FsbGJhY2sgaXMgYWRkZWQgZm9yIHRoaXMga2V5XG4gICAgICAgICAgICBzZWxmLl9jYWxsYmFja3NbaW5mby5rZXldID0gc2VsZi5fY2FsbGJhY2tzW2luZm8ua2V5XSB8fCBbXTtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIGFuIGV4aXN0aW5nIG1hdGNoIGlmIHRoZXJlIGlzIG9uZVxuICAgICAgICAgICAgX2dldE1hdGNoZXMoaW5mby5rZXksIGluZm8ubW9kaWZpZXJzLCB7dHlwZTogaW5mby5hY3Rpb259LCBzZXF1ZW5jZU5hbWUsIGNvbWJpbmF0aW9uLCBsZXZlbCk7XG5cbiAgICAgICAgICAgIC8vIGFkZCB0aGlzIGNhbGwgYmFjayB0byB0aGUgYXJyYXlcbiAgICAgICAgICAgIC8vIGlmIGl0IGlzIGEgc2VxdWVuY2UgcHV0IGl0IGF0IHRoZSBiZWdpbm5pbmdcbiAgICAgICAgICAgIC8vIGlmIG5vdCBwdXQgaXQgYXQgdGhlIGVuZFxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIHRoaXMgaXMgaW1wb3J0YW50IGJlY2F1c2UgdGhlIHdheSB0aGVzZSBhcmUgcHJvY2Vzc2VkIGV4cGVjdHNcbiAgICAgICAgICAgIC8vIHRoZSBzZXF1ZW5jZSBvbmVzIHRvIGNvbWUgZmlyc3RcbiAgICAgICAgICAgIHNlbGYuX2NhbGxiYWNrc1tpbmZvLmtleV1bc2VxdWVuY2VOYW1lID8gJ3Vuc2hpZnQnIDogJ3B1c2gnXSh7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgICAgICAgICAgIG1vZGlmaWVyczogaW5mby5tb2RpZmllcnMsXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBpbmZvLmFjdGlvbixcbiAgICAgICAgICAgICAgICBzZXE6IHNlcXVlbmNlTmFtZSxcbiAgICAgICAgICAgICAgICBsZXZlbDogbGV2ZWwsXG4gICAgICAgICAgICAgICAgY29tYm86IGNvbWJpbmF0aW9uXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBiaW5kcyBtdWx0aXBsZSBjb21iaW5hdGlvbnMgdG8gdGhlIHNhbWUgY2FsbGJhY2tcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gY29tYmluYXRpb25zXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfHVuZGVmaW5lZH0gYWN0aW9uXG4gICAgICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgICAgICovXG4gICAgICAgIHNlbGYuX2JpbmRNdWx0aXBsZSA9IGZ1bmN0aW9uKGNvbWJpbmF0aW9ucywgY2FsbGJhY2ssIGFjdGlvbikge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb21iaW5hdGlvbnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBfYmluZFNpbmdsZShjb21iaW5hdGlvbnNbaV0sIGNhbGxiYWNrLCBhY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHN0YXJ0IVxuICAgICAgICBfYWRkRXZlbnQodGFyZ2V0RWxlbWVudCwgJ2tleXByZXNzJywgX2hhbmRsZUtleUV2ZW50KTtcbiAgICAgICAgX2FkZEV2ZW50KHRhcmdldEVsZW1lbnQsICdrZXlkb3duJywgX2hhbmRsZUtleUV2ZW50KTtcbiAgICAgICAgX2FkZEV2ZW50KHRhcmdldEVsZW1lbnQsICdrZXl1cCcsIF9oYW5kbGVLZXlFdmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYmluZHMgYW4gZXZlbnQgdG8gbW91c2V0cmFwXG4gICAgICpcbiAgICAgKiBjYW4gYmUgYSBzaW5nbGUga2V5LCBhIGNvbWJpbmF0aW9uIG9mIGtleXMgc2VwYXJhdGVkIHdpdGggKyxcbiAgICAgKiBhbiBhcnJheSBvZiBrZXlzLCBvciBhIHNlcXVlbmNlIG9mIGtleXMgc2VwYXJhdGVkIGJ5IHNwYWNlc1xuICAgICAqXG4gICAgICogYmUgc3VyZSB0byBsaXN0IHRoZSBtb2RpZmllciBrZXlzIGZpcnN0IHRvIG1ha2Ugc3VyZSB0aGF0IHRoZVxuICAgICAqIGNvcnJlY3Qga2V5IGVuZHMgdXAgZ2V0dGluZyBib3VuZCAodGhlIGxhc3Qga2V5IGluIHRoZSBwYXR0ZXJuKVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd8QXJyYXl9IGtleXNcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gYWN0aW9uIC0gJ2tleXByZXNzJywgJ2tleWRvd24nLCBvciAna2V5dXAnXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIE1vdXNldHJhcC5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uKGtleXMsIGNhbGxiYWNrLCBhY3Rpb24pIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBrZXlzID0ga2V5cyBpbnN0YW5jZW9mIEFycmF5ID8ga2V5cyA6IFtrZXlzXTtcbiAgICAgICAgc2VsZi5fYmluZE11bHRpcGxlLmNhbGwoc2VsZiwga2V5cywgY2FsbGJhY2ssIGFjdGlvbik7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiB1bmJpbmRzIGFuIGV2ZW50IHRvIG1vdXNldHJhcFxuICAgICAqXG4gICAgICogdGhlIHVuYmluZGluZyBzZXRzIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBvZiB0aGUgc3BlY2lmaWVkIGtleSBjb21ib1xuICAgICAqIHRvIGFuIGVtcHR5IGZ1bmN0aW9uIGFuZCBkZWxldGVzIHRoZSBjb3JyZXNwb25kaW5nIGtleSBpbiB0aGVcbiAgICAgKiBfZGlyZWN0TWFwIGRpY3QuXG4gICAgICpcbiAgICAgKiBUT0RPOiBhY3R1YWxseSByZW1vdmUgdGhpcyBmcm9tIHRoZSBfY2FsbGJhY2tzIGRpY3Rpb25hcnkgaW5zdGVhZFxuICAgICAqIG9mIGJpbmRpbmcgYW4gZW1wdHkgZnVuY3Rpb25cbiAgICAgKlxuICAgICAqIHRoZSBrZXljb21ibythY3Rpb24gaGFzIHRvIGJlIGV4YWN0bHkgdGhlIHNhbWUgYXNcbiAgICAgKiBpdCB3YXMgZGVmaW5lZCBpbiB0aGUgYmluZCBtZXRob2RcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfEFycmF5fSBrZXlzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGFjdGlvblxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBNb3VzZXRyYXAucHJvdG90eXBlLnVuYmluZCA9IGZ1bmN0aW9uKGtleXMsIGFjdGlvbikge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiBzZWxmLmJpbmQuY2FsbChzZWxmLCBrZXlzLCBmdW5jdGlvbigpIHt9LCBhY3Rpb24pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiB0cmlnZ2VycyBhbiBldmVudCB0aGF0IGhhcyBhbHJlYWR5IGJlZW4gYm91bmRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlzXG4gICAgICogQHBhcmFtIHtzdHJpbmc9fSBhY3Rpb25cbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgTW91c2V0cmFwLnByb3RvdHlwZS50cmlnZ2VyID0gZnVuY3Rpb24oa2V5cywgYWN0aW9uKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKHNlbGYuX2RpcmVjdE1hcFtrZXlzICsgJzonICsgYWN0aW9uXSkge1xuICAgICAgICAgICAgc2VsZi5fZGlyZWN0TWFwW2tleXMgKyAnOicgKyBhY3Rpb25dKHt9LCBrZXlzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogcmVzZXRzIHRoZSBsaWJyYXJ5IGJhY2sgdG8gaXRzIGluaXRpYWwgc3RhdGUuICB0aGlzIGlzIHVzZWZ1bFxuICAgICAqIGlmIHlvdSB3YW50IHRvIGNsZWFyIG91dCB0aGUgY3VycmVudCBrZXlib2FyZCBzaG9ydGN1dHMgYW5kIGJpbmRcbiAgICAgKiBuZXcgb25lcyAtIGZvciBleGFtcGxlIGlmIHlvdSBzd2l0Y2ggdG8gYW5vdGhlciBwYWdlXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgTW91c2V0cmFwLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYuX2NhbGxiYWNrcyA9IHt9O1xuICAgICAgICBzZWxmLl9kaXJlY3RNYXAgPSB7fTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIHNob3VsZCB3ZSBzdG9wIHRoaXMgZXZlbnQgYmVmb3JlIGZpcmluZyBvZmYgY2FsbGJhY2tzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBNb3VzZXRyYXAucHJvdG90eXBlLnN0b3BDYWxsYmFjayA9IGZ1bmN0aW9uKGUsIGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIC8vIGlmIHRoZSBlbGVtZW50IGhhcyB0aGUgY2xhc3MgXCJtb3VzZXRyYXBcIiB0aGVuIG5vIG5lZWQgdG8gc3RvcFxuICAgICAgICBpZiAoKCcgJyArIGVsZW1lbnQuY2xhc3NOYW1lICsgJyAnKS5pbmRleE9mKCcgbW91c2V0cmFwICcpID4gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfYmVsb25nc1RvKGVsZW1lbnQsIHNlbGYudGFyZ2V0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc3RvcCBmb3IgaW5wdXQsIHNlbGVjdCwgYW5kIHRleHRhcmVhXG4gICAgICAgIHJldHVybiBlbGVtZW50LnRhZ05hbWUgPT0gJ0lOUFVUJyB8fCBlbGVtZW50LnRhZ05hbWUgPT0gJ1NFTEVDVCcgfHwgZWxlbWVudC50YWdOYW1lID09ICdURVhUQVJFQScgfHwgZWxlbWVudC5pc0NvbnRlbnRFZGl0YWJsZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogZXhwb3NlcyBfaGFuZGxlS2V5IHB1YmxpY2x5IHNvIGl0IGNhbiBiZSBvdmVyd3JpdHRlbiBieSBleHRlbnNpb25zXG4gICAgICovXG4gICAgTW91c2V0cmFwLnByb3RvdHlwZS5oYW5kbGVLZXkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICByZXR1cm4gc2VsZi5faGFuZGxlS2V5LmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGFsbG93IGN1c3RvbSBrZXkgbWFwcGluZ3NcbiAgICAgKi9cbiAgICBNb3VzZXRyYXAuYWRkS2V5Y29kZXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAgICAgICAgaWYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgX01BUFtrZXldID0gb2JqZWN0W2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX1JFVkVSU0VfTUFQID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogSW5pdCB0aGUgZ2xvYmFsIG1vdXNldHJhcCBmdW5jdGlvbnNcbiAgICAgKlxuICAgICAqIFRoaXMgbWV0aG9kIGlzIG5lZWRlZCB0byBhbGxvdyB0aGUgZ2xvYmFsIG1vdXNldHJhcCBmdW5jdGlvbnMgdG8gd29ya1xuICAgICAqIG5vdyB0aGF0IG1vdXNldHJhcCBpcyBhIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICAgICAqL1xuICAgIE1vdXNldHJhcC5pbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkb2N1bWVudE1vdXNldHJhcCA9IE1vdXNldHJhcChkb2N1bWVudCk7XG4gICAgICAgIGZvciAodmFyIG1ldGhvZCBpbiBkb2N1bWVudE1vdXNldHJhcCkge1xuICAgICAgICAgICAgaWYgKG1ldGhvZC5jaGFyQXQoMCkgIT09ICdfJykge1xuICAgICAgICAgICAgICAgIE1vdXNldHJhcFttZXRob2RdID0gKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnRNb3VzZXRyYXBbbWV0aG9kXS5hcHBseShkb2N1bWVudE1vdXNldHJhcCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IChtZXRob2QpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBNb3VzZXRyYXAuaW5pdCgpO1xuXG4gICAgLy8gZXhwb3NlIG1vdXNldHJhcCB0byB0aGUgZ2xvYmFsIG9iamVjdFxuICAgIHdpbmRvdy5Nb3VzZXRyYXAgPSBNb3VzZXRyYXA7XG5cbiAgICAvLyBleHBvc2UgYXMgYSBjb21tb24ganMgbW9kdWxlXG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gTW91c2V0cmFwO1xuICAgIH1cblxuICAgIC8vIGV4cG9zZSBtb3VzZXRyYXAgYXMgYW4gQU1EIG1vZHVsZVxuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIE1vdXNldHJhcDtcbiAgICAgICAgfSk7XG4gICAgfVxufSkgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogbnVsbCwgdHlwZW9mICB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gZG9jdW1lbnQgOiBudWxsKTtcbiIsIihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSl7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvKmlzdGFuYnVsIGlnbm9yZSBuZXh0OmNhbnQgdGVzdCovXG4gIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgIGRlZmluZShbXSwgZmFjdG9yeSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gQnJvd3NlciBnbG9iYWxzXG4gICAgcm9vdC5vYmplY3RQYXRoID0gZmFjdG9yeSgpO1xuICB9XG59KSh0aGlzLCBmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgZnVuY3Rpb24gaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSB7XG4gICAgaWYob2JqID09IG51bGwpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICAvL3RvIGhhbmRsZSBvYmplY3RzIHdpdGggbnVsbCBwcm90b3R5cGVzICh0b28gZWRnZSBjYXNlPylcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcClcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzRW1wdHkodmFsdWUpe1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgICBmb3IgKHZhciBpIGluIHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkodmFsdWUsIGkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiB0b1N0cmluZyh0eXBlKXtcbiAgICByZXR1cm4gdG9TdHIuY2FsbCh0eXBlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzT2JqZWN0KG9iail7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIHRvU3RyaW5nKG9iaikgPT09IFwiW29iamVjdCBPYmplY3RdXCI7XG4gIH1cblxuICB2YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24ob2JqKXtcbiAgICAvKmlzdGFuYnVsIGlnbm9yZSBuZXh0OmNhbnQgdGVzdCovXG4gICAgcmV0dXJuIHRvU3RyLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzQm9vbGVhbihvYmope1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnYm9vbGVhbicgfHwgdG9TdHJpbmcob2JqKSA9PT0gJ1tvYmplY3QgQm9vbGVhbl0nO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0S2V5KGtleSl7XG4gICAgdmFyIGludEtleSA9IHBhcnNlSW50KGtleSk7XG4gICAgaWYgKGludEtleS50b1N0cmluZygpID09PSBrZXkpIHtcbiAgICAgIHJldHVybiBpbnRLZXk7XG4gICAgfVxuICAgIHJldHVybiBrZXk7XG4gIH1cblxuICBmdW5jdGlvbiBmYWN0b3J5KG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuXG4gICAgdmFyIG9iamVjdFBhdGggPSBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmplY3RQYXRoKS5yZWR1Y2UoZnVuY3Rpb24ocHJveHksIHByb3ApIHtcbiAgICAgICAgaWYocHJvcCA9PT0gJ2NyZWF0ZScpIHtcbiAgICAgICAgICByZXR1cm4gcHJveHk7XG4gICAgICAgIH1cblxuICAgICAgICAvKmlzdGFuYnVsIGlnbm9yZSBlbHNlKi9cbiAgICAgICAgaWYgKHR5cGVvZiBvYmplY3RQYXRoW3Byb3BdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcHJveHlbcHJvcF0gPSBvYmplY3RQYXRoW3Byb3BdLmJpbmQob2JqZWN0UGF0aCwgb2JqKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwcm94eTtcbiAgICAgIH0sIHt9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaGFzU2hhbGxvd1Byb3BlcnR5KG9iaiwgcHJvcCkge1xuICAgICAgcmV0dXJuIChvcHRpb25zLmluY2x1ZGVJbmhlcml0ZWRQcm9wcyB8fCAodHlwZW9mIHByb3AgPT09ICdudW1iZXInICYmIEFycmF5LmlzQXJyYXkob2JqKSkgfHwgaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTaGFsbG93UHJvcGVydHkob2JqLCBwcm9wKSB7XG4gICAgICBpZiAoaGFzU2hhbGxvd1Byb3BlcnR5KG9iaiwgcHJvcCkpIHtcbiAgICAgICAgcmV0dXJuIG9ialtwcm9wXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXQob2JqLCBwYXRoLCB2YWx1ZSwgZG9Ob3RSZXBsYWNlKXtcbiAgICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcGF0aCA9IFtwYXRoXTtcbiAgICAgIH1cbiAgICAgIGlmICghcGF0aCB8fCBwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gc2V0KG9iaiwgcGF0aC5zcGxpdCgnLicpLm1hcChnZXRLZXkpLCB2YWx1ZSwgZG9Ob3RSZXBsYWNlKTtcbiAgICAgIH1cbiAgICAgIHZhciBjdXJyZW50UGF0aCA9IHBhdGhbMF07XG4gICAgICB2YXIgY3VycmVudFZhbHVlID0gZ2V0U2hhbGxvd1Byb3BlcnR5KG9iaiwgY3VycmVudFBhdGgpO1xuICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGlmIChjdXJyZW50VmFsdWUgPT09IHZvaWQgMCB8fCAhZG9Ob3RSZXBsYWNlKSB7XG4gICAgICAgICAgb2JqW2N1cnJlbnRQYXRoXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjdXJyZW50VmFsdWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChjdXJyZW50VmFsdWUgPT09IHZvaWQgMCkge1xuICAgICAgICAvL2NoZWNrIGlmIHdlIGFzc3VtZSBhbiBhcnJheVxuICAgICAgICBpZih0eXBlb2YgcGF0aFsxXSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBvYmpbY3VycmVudFBhdGhdID0gW107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2JqW2N1cnJlbnRQYXRoXSA9IHt9O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZXQob2JqW2N1cnJlbnRQYXRoXSwgcGF0aC5zbGljZSgxKSwgdmFsdWUsIGRvTm90UmVwbGFjZSk7XG4gICAgfVxuXG4gICAgb2JqZWN0UGF0aC5oYXMgPSBmdW5jdGlvbiAob2JqLCBwYXRoKSB7XG4gICAgICBpZiAodHlwZW9mIHBhdGggPT09ICdudW1iZXInKSB7XG4gICAgICAgIHBhdGggPSBbcGF0aF07XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykge1xuICAgICAgICBwYXRoID0gcGF0aC5zcGxpdCgnLicpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXBhdGggfHwgcGF0aC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuICEhb2JqO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGogPSBnZXRLZXkocGF0aFtpXSk7XG5cbiAgICAgICAgaWYoKHR5cGVvZiBqID09PSAnbnVtYmVyJyAmJiBpc0FycmF5KG9iaikgJiYgaiA8IG9iai5sZW5ndGgpIHx8XG4gICAgICAgICAgKG9wdGlvbnMuaW5jbHVkZUluaGVyaXRlZFByb3BzID8gKGogaW4gT2JqZWN0KG9iaikpIDogaGFzT3duUHJvcGVydHkob2JqLCBqKSkpIHtcbiAgICAgICAgICBvYmogPSBvYmpbal07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBvYmplY3RQYXRoLmVuc3VyZUV4aXN0cyA9IGZ1bmN0aW9uIChvYmosIHBhdGgsIHZhbHVlKXtcbiAgICAgIHJldHVybiBzZXQob2JqLCBwYXRoLCB2YWx1ZSwgdHJ1ZSk7XG4gICAgfTtcblxuICAgIG9iamVjdFBhdGguc2V0ID0gZnVuY3Rpb24gKG9iaiwgcGF0aCwgdmFsdWUsIGRvTm90UmVwbGFjZSl7XG4gICAgICByZXR1cm4gc2V0KG9iaiwgcGF0aCwgdmFsdWUsIGRvTm90UmVwbGFjZSk7XG4gICAgfTtcblxuICAgIG9iamVjdFBhdGguaW5zZXJ0ID0gZnVuY3Rpb24gKG9iaiwgcGF0aCwgdmFsdWUsIGF0KXtcbiAgICAgIHZhciBhcnIgPSBvYmplY3RQYXRoLmdldChvYmosIHBhdGgpO1xuICAgICAgYXQgPSB+fmF0O1xuICAgICAgaWYgKCFpc0FycmF5KGFycikpIHtcbiAgICAgICAgYXJyID0gW107XG4gICAgICAgIG9iamVjdFBhdGguc2V0KG9iaiwgcGF0aCwgYXJyKTtcbiAgICAgIH1cbiAgICAgIGFyci5zcGxpY2UoYXQsIDAsIHZhbHVlKTtcbiAgICB9O1xuXG4gICAgb2JqZWN0UGF0aC5lbXB0eSA9IGZ1bmN0aW9uKG9iaiwgcGF0aCkge1xuICAgICAgaWYgKGlzRW1wdHkocGF0aCkpIHtcbiAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICAgIH1cbiAgICAgIGlmIChvYmogPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgICAgfVxuXG4gICAgICB2YXIgdmFsdWUsIGk7XG4gICAgICBpZiAoISh2YWx1ZSA9IG9iamVjdFBhdGguZ2V0KG9iaiwgcGF0aCkpKSB7XG4gICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBvYmplY3RQYXRoLnNldChvYmosIHBhdGgsICcnKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNCb29sZWFuKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gb2JqZWN0UGF0aC5zZXQob2JqLCBwYXRoLCBmYWxzZSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdFBhdGguc2V0KG9iaiwgcGF0aCwgMCk7XG4gICAgICB9IGVsc2UgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlLmxlbmd0aCA9IDA7XG4gICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICBmb3IgKGkgaW4gdmFsdWUpIHtcbiAgICAgICAgICBpZiAoaGFzU2hhbGxvd1Byb3BlcnR5KHZhbHVlLCBpKSkge1xuICAgICAgICAgICAgZGVsZXRlIHZhbHVlW2ldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdFBhdGguc2V0KG9iaiwgcGF0aCwgbnVsbCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIG9iamVjdFBhdGgucHVzaCA9IGZ1bmN0aW9uIChvYmosIHBhdGggLyosIHZhbHVlcyAqLyl7XG4gICAgICB2YXIgYXJyID0gb2JqZWN0UGF0aC5nZXQob2JqLCBwYXRoKTtcbiAgICAgIGlmICghaXNBcnJheShhcnIpKSB7XG4gICAgICAgIGFyciA9IFtdO1xuICAgICAgICBvYmplY3RQYXRoLnNldChvYmosIHBhdGgsIGFycik7XG4gICAgICB9XG5cbiAgICAgIGFyci5wdXNoLmFwcGx5KGFyciwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKSk7XG4gICAgfTtcblxuICAgIG9iamVjdFBhdGguY29hbGVzY2UgPSBmdW5jdGlvbiAob2JqLCBwYXRocywgZGVmYXVsdFZhbHVlKSB7XG4gICAgICB2YXIgdmFsdWU7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBwYXRocy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoKHZhbHVlID0gb2JqZWN0UGF0aC5nZXQob2JqLCBwYXRoc1tpXSkpICE9PSB2b2lkIDApIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICB9O1xuXG4gICAgb2JqZWN0UGF0aC5nZXQgPSBmdW5jdGlvbiAob2JqLCBwYXRoLCBkZWZhdWx0VmFsdWUpe1xuICAgICAgaWYgKHR5cGVvZiBwYXRoID09PSAnbnVtYmVyJykge1xuICAgICAgICBwYXRoID0gW3BhdGhdO1xuICAgICAgfVxuICAgICAgaWYgKCFwYXRoIHx8IHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9XG4gICAgICBpZiAob2JqID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdFBhdGguZ2V0KG9iaiwgcGF0aC5zcGxpdCgnLicpLCBkZWZhdWx0VmFsdWUpO1xuICAgICAgfVxuXG4gICAgICB2YXIgY3VycmVudFBhdGggPSBnZXRLZXkocGF0aFswXSk7XG4gICAgICB2YXIgbmV4dE9iaiA9IGdldFNoYWxsb3dQcm9wZXJ0eShvYmosIGN1cnJlbnRQYXRoKVxuICAgICAgaWYgKG5leHRPYmogPT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgICAgfVxuXG4gICAgICBpZiAocGF0aC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIG5leHRPYmo7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvYmplY3RQYXRoLmdldChvYmpbY3VycmVudFBhdGhdLCBwYXRoLnNsaWNlKDEpLCBkZWZhdWx0VmFsdWUpO1xuICAgIH07XG5cbiAgICBvYmplY3RQYXRoLmRlbCA9IGZ1bmN0aW9uIGRlbChvYmosIHBhdGgpIHtcbiAgICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcGF0aCA9IFtwYXRoXTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9iaiA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0VtcHR5KHBhdGgpKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9XG4gICAgICBpZih0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdFBhdGguZGVsKG9iaiwgcGF0aC5zcGxpdCgnLicpKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGN1cnJlbnRQYXRoID0gZ2V0S2V5KHBhdGhbMF0pO1xuICAgICAgaWYgKCFoYXNTaGFsbG93UHJvcGVydHkob2JqLCBjdXJyZW50UGF0aCkpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH1cblxuICAgICAgaWYocGF0aC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgICAgICAgIG9iai5zcGxpY2UoY3VycmVudFBhdGgsIDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBvYmpbY3VycmVudFBhdGhdO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gb2JqZWN0UGF0aC5kZWwob2JqW2N1cnJlbnRQYXRoXSwgcGF0aC5zbGljZSgxKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iamVjdFBhdGg7XG4gIH1cblxuICB2YXIgbW9kID0gZmFjdG9yeSgpO1xuICBtb2QuY3JlYXRlID0gZmFjdG9yeTtcbiAgbW9kLndpdGhJbmhlcml0ZWRQcm9wcyA9IGZhY3Rvcnkoe2luY2x1ZGVJbmhlcml0ZWRQcm9wczogdHJ1ZX0pXG4gIHJldHVybiBtb2Q7XG59KTtcbiIsImltcG9ydCBjcmVhdGUgZnJvbSBcIi4vdXRpbHMvY3JlYXRlXCI7XG5pbXBvcnQgZWxlbWVudHMgZnJvbSBcIi4vdXRpbHMvZWxlbWVudHNcIjtcblxud2luZG93LmVsZW1lbnRzID0gZWxlbWVudHM7XG5cbmNyZWF0ZS5hbGwoKTsiLCJpbXBvcnQgRE9NU3RyaW5nIGZyb20gXCIuLy4uL3R5cGUvRE9NU3RyaW5nLmpzXCI7XG5cbi8qKlxuKiBBZGRzIGZ1bmN0aW9uYWxpdHkgdG8gYGFyaWEtY2hlY2tlZGAgYXR0cmlidXRlLlxuKlxuKiBDaGFuZ2VzIHZhbHVlIHdoZW4gY2xpY2tlZCBvciB3aGlsZSBmb2N1c2VkIHByZXNzaW5nIGBTcGFjZWAuXG4qXG4qIHtAbGluayBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWNoZWNrZWR9XG4qIEBlbWl0cyBjbGljayB3aGVuIGNsaWNrZWQgb3Igd2hpbGUgZm9jdXNlZCBwcmVzc2luZyBgU3BhY2VgLlxuKiBAZW1pdHMgY2hhbmdlIHdoZW4gY2xpY2tlZCBvciB3aGlsZSBmb2N1c2VkIHByZXNzaW5nIGBTcGFjZWAuXG4qL1xubGV0IEFyaWFDaGVja2VkID0gKHN1cGVyY2xhc3MpID0+IGNsYXNzIGV4dGVuZHMgc3VwZXJjbGFzcyB7XG5cblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdHN1cGVyKC4uLmFyZ3MpO1xuXG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm9uQ2hlY2tlZC5iaW5kKHRoaXMpLCB7a2V5OiBcInNwYWNlXCJ9KTtcblx0XHR0aGlzLmFkZExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vbkNoZWNrZWQuYmluZCh0aGlzKSk7XG5cdH1cblxuXHRvbkNoZWNrZWQoKSB7XG5cdFx0aWYodGhpcy5kaXNhYmxlZCAhPT0gdHJ1ZSkge1xuXHRcdFx0dGhpcy5jaGVja2VkID0gRE9NU3RyaW5nLnRvZ2dsZSh0aGlzLmNoZWNrZWQpO1xuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBJbnB1dEV2ZW50KFwiaW5wdXRcIikpO1xuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImNoYW5nZVwiKSk7XG5cdFx0fVxuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBcmlhQ2hlY2tlZDsiLCJpbXBvcnQgYm9vbGVhbiBmcm9tIFwiLi8uLi90eXBlL2Jvb2xlYW5cIjtcblxuLyoqXG4qIEFkZHMgZnVuY3Rpb25hbGl0eSB0byBgYXJpYS1leHBhbmRlZGAgYXR0cmlidXRlXG4qIEB0b2RvIGFkZCBhIHNldHRpbmcgdG8gZGVmaW5lIGhvdyB0aGUgdmlzaWJpbGl0eSBzaG91bGQgYmUgdG9nZ2xlZFxuKi9cbmxldCBBcmlhRXhwYW5kZWQgPSAoc3VwZXJjbGFzcykgPT4gY2xhc3MgZXh0ZW5kcyBzdXBlcmNsYXNzIHtcblx0LyoqXG5cdCogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgRWxlbWVudCB3aXRoIGFuIGBhcmlhLWV4cGFuZGVkYCBhdHRyaWJ1dGVcblx0Ki9cblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdHN1cGVyKC4uLmFyZ3MpO1xuXHRcdGlmICh0aGlzLmV4cGFuZGVkICE9PSB1bmRlZmluZWQpIHsgLy8gdG9kbzogYWRkIHdoZW4gZmlyc3QgdGltZSBhcmlhLWV4cGFuZGVkIGlzIGJvb2xlYW5cblx0XHRcdHRoaXMuYWRkTGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uRXhwYW5kZWQuYmluZCh0aGlzKSk7XG5cdFx0XHQvLyB0aGlzLmFkZExpc3RlbmVyKFwia2V5XCIsIHRoaXMub25FeHBhbmRlZC5iaW5kKHRoaXMpLCB7IGtleTogW1wiZW50ZXJcIiwgXCJzcGFjZVwiXSB9KTtcblx0XHR9XG5cdH1cblxuXHRvbkV4cGFuZGVkKGV2KSB7XG5cdFx0aWYgKHR5cGVvZiBzdXBlci5vbkV4cGFuZGVkID09IFwiZnVuY3Rpb25cIikgc3VwZXIub25FeHBhbmRlZChldik7XG5cdFx0aWYoZXYgJiYgdHlwZW9mIGV2LnByZXZlbnREZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIpIGV2LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRpZih0aGlzLmRpc2FibGVkICE9PSB0cnVlKSB7XG5cdFx0XHR0aGlzLmV4cGFuZGVkID0gYm9vbGVhbi50b2dnbGUodGhpcy5leHBhbmRlZCk7XG5cblx0XHRcdGlmKHRoaXMuZXhwYW5kZWQpIHtcblx0XHRcdFx0dGhpcy5jb250cm9scy5mb3JFYWNoKGNvbnRyb2wgPT4ge1xuXHRcdFx0XHRcdGNvbnRyb2wuZWxlbWVudC5oaWRkZW4gPSBmYWxzZTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmNvbnRyb2xzLmZvckVhY2goY29udHJvbCA9PiB7XG5cdFx0XHRcdFx0Y29udHJvbC5lbGVtZW50LmhpZGRlbiA9IHRydWU7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQXJpYUV4cGFuZGVkOyIsImltcG9ydCBET01TdHJpbmcgZnJvbSBcIi4vLi4vdHlwZS9ET01TdHJpbmdcIjtcblxuLyoqXG4qIEFkZHMgZnVuY3Rpb25hbGl0eSB0byBgYXJpYS1wcmVzc2VkYCBhdHRyaWJ1dGUuXG4qXG4qIENoYW5nZXMgdmFsdWUgd2hlbiBjbGlja2VkIG9yIHdoaWxlIGZvY3VzZWQgcHJlc3NpbmcgYFNwYWNlYCBvciBgRW50ZXJgLlxuKlxuKiB7QGxpbmsgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1wcmVzc2VkfVxuKiBAZW1pdHMgY2xpY2sgd2hlbiBjbGlja2VkIG9yIHdoaWxlIGZvY3VzZWQgcHJlc3NpbmcgYFNwYWNlYCBvciBgRW50ZXJgLlxuKi9cbmxldCBBcmlhUHJlc3NlZCA9IChzdXBlcmNsYXNzKSA9PiBjbGFzcyBleHRlbmRzIHN1cGVyY2xhc3Mge1xuXHQvKipcblx0KiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxlbWVudCBFbGVtZW50IHdpdGggYW4gYGFyaWEtcHJlc3NlZGAgYXR0cmlidXRlXG5cdCovXG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRzdXBlciguLi5hcmdzKTtcblxuXHRcdGlmKHRoaXMucHJlc3NlZCAhPT0gdW5kZWZpbmVkKSB7IC8vIHRvZG86IGFkZCB3aGVuIGZpcnN0IHRpbWUgYXJpYS1wcmVzc2VkIGlzIGJvb2xlYW5cblx0XHRcdHRoaXMuYWRkTGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uUHJlc3NlZC5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMuYWRkTGlzdGVuZXIoXCJrZXlcIiwgdGhpcy5vblByZXNzZWQuYmluZCh0aGlzKSwgeyBrZXk6IFtcImVudGVyXCIsIFwic3BhY2VcIl19KTtcblx0XHR9XG5cdH1cblxuXHRvblByZXNzZWQoZXYpIHtcblx0XHRpZiAodHlwZW9mIHN1cGVyLm9uUHJlc3NlZCA9PSBcImZ1bmN0aW9uXCIpIHN1cGVyLm9uUHJlc3NlZChldik7XG5cblx0XHRpZih0aGlzLmRpc2FibGVkICE9PSB0cnVlKSB7XG5cdFx0XHR0aGlzLnByZXNzZWQgPSBET01TdHJpbmcudG9nZ2xlKHRoaXMucHJlc3NlZCk7XG5cdFx0fVxuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBcmlhUHJlc3NlZDsiLCJpbXBvcnQgYm9vbGVhbiBmcm9tIFwiLi8uLi90eXBlL2Jvb2xlYW5cIjtcblxuLyoqXG4gKiBnZXRzIGFuZCBzZXRzIHRoZSBgYXJpYS1zZWxlY3RlZGAgYXR0cmlidXRlLlxuICpcbiAqIEluZGljYXRlcyBpZiBhIGVsZW1lbnQgaXMgc2VsZWN0YWJsZVxuICpcbiAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1zZWxlY3RlZFxuICovXG5sZXQgQXJpYVNlbGVjdGVkID0gKHN1cGVyY2xhc3MpID0+IGNsYXNzIGV4dGVuZHMgc3VwZXJjbGFzcyB7XG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRzdXBlciguLi5hcmdzKTtcblxuXHRcdHRoaXMuYWRkTGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uU2VsZWN0ZWQuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm9uU2VsZWN0ZWQuYmluZCh0aGlzKSwge2tleTogW1wic3BhY2VcIiwgXCJlbnRlclwiXX0pO1xuXHR9XG5cblx0b25TZWxlY3RlZChldikge1xuXHRcdGlmKHR5cGVvZiBzdXBlci5vblNlbGVjdGVkID09IFwiZnVuY3Rpb25cIikgc3VwZXIub25TZWxlY3RlZChldik7XG5cdFx0dGhpcy5zZWxlY3RlZCA9IGJvb2xlYW4udG9nZ2xlKHRoaXMuc2VsZWN0ZWQpO1xuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBcmlhU2VsZWN0ZWQ7IiwiLyoqXG4gKiBcbiAqL1xuY29uc3Qgcm9sZXMgPSB7XG5cdGFsZXJ0OiB7XG5cdFx0c3VwZXI6IFtcInNlY3Rpb25cIl0sXG5cdFx0c3ViOiBbXCJhbGVydGRpYWxvZ1wiXSxcblx0XHRkZWZhdWx0czoge1xuXHRcdFx0bGl2ZTogXCJhc3NlcnRpdmVcIixcblx0XHRcdGF0b21pYzogdHJ1ZVxuXHRcdH1cblx0fSxcblx0YWxlcnRkaWFsb2c6IHsgc3VwZXI6IFtcImFsZXJ0XCIsIFwiZGlhbG9nXCJdIH0sXG5cdGFwcGxpY2F0aW9uOiB7IHN1cGVyOiBbXCJzdHJ1Y3R1cmVcIl0gfSxcblx0YXJ0aWNsZToge1xuXHRcdHN1cGVyOiBbXCJkb2N1bWVudFwiXSxcblx0XHRpbXBsaWNpdDogW1wiYXJ0aWNsZTpub3QoW3JvbGUpXCJdXG5cdH0sXG5cdC8qKiBAdG9kbyBtb3JlIHN0cmljdCBiYW5uZXIgc2VsZWN0b3IgICovXG5cdGJhbm5lcjoge1xuXHRcdHN1cGVyOiBbXCJsYW5kbWFya1wiXSxcblx0XHRpbXBsaWNpdDogW1wiaGVhZGVyOm5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdGJ1dHRvbjoge1xuXHRcdHN1cGVyOiBbXCJjb21tYW5kXCJdLFxuXHRcdGltcGxpY2l0OiBbXCJidXR0b246bm90KFtyb2xlXSlcIiwgXCJpbnB1dFt0eXBlPSdidXR0b24nXTpub3QoW3JvbGVdKVwiLFxuXHRcdFx0XCJpbnB1dFt0eXBlPSdyZXNldCddOm5vdChbcm9sZV0pXCIsIFwiaW5wdXRbdHlwZT0naW1hZ2UnXTpub3QoW3JvbGVdKVwiLFxuXHRcdFx0XCJpbnB1dFt0eXBlPSdzdWJtaXQnXTpub3QoW3JvbGVdKVwiLCBcInN1bW1hcnk6bm90KFtyb2xlXSlcIl1cblx0fSxcblx0Y2VsbDoge1xuXHRcdHN1cGVyOiBbXCJzZWN0aW9uXCJdLFxuXHRcdHN1YjogW1wiY29sdW1uaGVhZGVyXCIsIFwicm93aGVhZGVyXCIsIFwiZ3JpZGNlbGxcIl0sXG5cdFx0Y29udGV4dDogW1wicm93XCJdLFxuXHRcdGltcGxpY2l0OiBbXCJ0YWJsZSB0ZDpub3QoW3JvbGVdKVwiXVxuXHR9LFxuXHRjaGVja2JveDoge1xuXHRcdHN1cGVyOiBbXCJpbnB1dFwiXSxcblx0XHRzdWI6IFtcIm1lbnVpdGVtY2hlY2tib3hcIiwgXCJzd2l0Y2hcIl0sXG5cdFx0aW1wbGljaXQ6IFtcImlucHV0W3R5cGU9J2NoZWNrYm94J106bm90KFtyb2xlXSlcIl0sXG5cdFx0ZGVmYXVsdHM6IHtcblx0XHRcdGNoZWNrZWQ6IHRydWVcblx0XHR9XG5cdH0sXG5cdGNvbHVtbmhlYWRlcjoge1xuXHRcdHN1cGVyOiBbXCJjZWxsXCIsIFwiZ3JpZGNlbGxcIiwgXCJzZWN0aW9uaGVhZFwiXSxcblx0XHRjb250ZXh0OiBbXCJyb3dcIl0sXG5cdFx0aW1wbGljaXQ6IFtcInRoZWFkIHRoOm5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdC8qKiBAdG9kbyBzaXplIGF0dHJpYnV0ZSBkb2Vzbid0IGNoZWNrIGZhdWx0eSB2YWx1ZXMgKi9cblx0Y29tYm9ib3g6IHtcblx0XHRzdXBlcjogW1wic2VsZWN0XCJdLFxuXHRcdG93bnM6IHtcblx0XHRcdGFsbDogW1widGV4dGJveFwiXSxcblx0XHRcdGFueTogW1wibGlzdGJveFwiLCBcInRyZWVcIiwgXCJncmlkXCIsIFwiZGlhbG9nXCJdXG5cdFx0fSxcblx0XHRpbXBsaWNpdDogW1wiaW5wdXRbdHlwZT0nZW1haWwnXVtsaXN0XTpub3QoW3JvbGVdKVwiLFxuXHRcdFx0XCJpbnB1dFt0eXBlPSd0ZXh0J11bbGlzdF06bm90KFtyb2xlXSlcIiwgXCJpbnB1dFt0eXBlPSdzZWFyY2gnXVtsaXN0XTpub3QoW3JvbGVdKVwiLFxuXHRcdFx0XCJpbnB1dFt0eXBlPSd0ZWwnXVtsaXN0XTpub3QoW3JvbGVdKVwiLCBcImlucHV0W3R5cGU9J3VybCddW2xpc3RdOm5vdChbcm9sZV0pXCIsXG5cdFx0XHRcInNlbGVjdDpub3QoW211bHRpcGxlXSk6bm90KFtzaXplXSk6bm90KFtyb2xlXSlcIiwgXCJzZWxlY3Q6bm90KFttdWx0aXBsZV0pW3NpemU9JzAnXTpub3QoW3JvbGVdKVwiLFxuXHRcdFx0XCJzZWxlY3Q6bm90KFttdWx0aXBsZV0pW3NpemU9JzEnXTpub3QoW3JvbGVdKVwiXSxcblx0XHRkZWZhdWx0czoge1xuXHRcdFx0ZXhwYW5kZWQ6IGZhbHNlLFxuXHRcdFx0aGFzUG9wVXA6IFwibGlzdGJveFwiXG5cdFx0fVxuXHR9LFxuXHRjb21tYW5kOiB7XG5cdFx0c3VwZXI6IFtcIndpZGdldFwiXSxcblx0XHRzdWI6IFtcIm1lbnVpdGVtXCIsIFwiYnV0dG9uXCIsIFwibGlua1wiXVxuXHR9LFxuXHRjb21wbGVtZW50YXJ5OiB7XG5cdFx0c3VwZXI6IFtcImxhbmRtYXJrXCJdLFxuXHRcdGltcGxpY2l0OiBbXCJhc2lkZTpub3QoW3JvbGVdKVwiXVxuXHR9LFxuXHRjb21wb3NpdGU6IHtcblx0XHRzdXBlcjogW1wid2lkZ2V0XCJdLFxuXHRcdHN1YjogW1wiZ3JpZFwiLCBcInNlbGVjdFwiLCBcInNwaW5idXR0b25cIiwgXCJ0YWJsaXN0XCJdXG5cdH0sXG5cdC8qKiBAdG9kbyBtb3JlIHN0cmljdCBmb290ZXIgc2VsZWN0b3IgICovXG5cdGNvbnRlbnRpbmZvOiB7XG5cdFx0c3VwZXI6IFtcImxhbmRtYXJrXCJdLFxuXHRcdGltcGxpY2l0OiBbXCJmb290ZXI6bm90KFtyb2xlXSlcIl1cblx0fSxcblx0ZGVmaW5pdGlvbjoge1xuXHRcdHN1cGVyOiBbXCJzZWN0aW9uXCJdLFxuXHRcdGltcGxpY2l0OiBbXCJkZDpub3QoW3JvbGVdKVwiXVxuXHR9LFxuXHRkaWFsb2c6IHtcblx0XHRzdXBlcjogW1wid2luZG93XCJdLFxuXHRcdHN1YjogW1wiYWxlcnRkaWFsb2dcIl0sXG5cdFx0aW1wbGljaXQ6IFtcImRpYWxvZzpub3QoW3JvbGVdKVwiXVxuXHR9LFxuXHRkaXJlY3Rvcnk6IHsgc3VwZXI6IFtcImxpc3RcIl0gfSxcblx0ZG9jdW1lbnQ6IHtcblx0XHRzdXBlcjogW1wic3RydWN0dXJlXCJdLFxuXHRcdHN1YjogW1wiYXJ0aWNsZVwiXSxcblx0XHRpbXBsaWNpdDogW1wiYXNpZGU6bm90KFtyb2xlXSlcIl1cblx0fSxcblx0ZmVlZDoge1xuXHRcdHN1cGVyOiBbXCJsaXN0XCJdLFxuXHRcdG93bnM6IHsgYW55OiBbXCJhcnRpY2xlXCJdIH1cblx0fSxcblx0ZmlndXJlOiB7XG5cdFx0c3VwZXI6IFtcInNlY3Rpb25cIl0sXG5cdFx0aW1wbGljaXQ6IFtcImZpZ3VyZTpub3QoW3JvbGVdKVwiXVxuXHR9LFxuXHRmb3JtOiB7XG5cdFx0c3VwZXI6IFtcImxhbmRtYXJrXCJdLFxuXHRcdGltcGxpY2l0OiBbXCJmb3JtOm5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdGdyaWQ6IHtcblx0XHRzdXBlcjogW1wiY29tcG9zaXRlXCIsIFwidGFibGVcIl0sXG5cdFx0c3ViOiBbXCJ0cmVlZ3JpZFwiXSxcblx0XHRvd25zOiB7IGFueTogW1wicm93Z3JvdXBcIiwgXCJyb3dcIl0gfVxuXHR9LFxuXHRncmlkY2VsbDoge1xuXHRcdHN1cGVyOiBbXCJjZWxsXCIsIFwid2lkZ2V0XCJdLFxuXHRcdHN1YjogW1wiY29sdW1uaGVhZGVyXCIsIFwicm93aGVhZGVyXCJdLFxuXHRcdGNvbnRleHQ6IFtcInJvd1wiXVxuXHR9LFxuXHRncm91cDoge1xuXHRcdHN1cGVyOiBbXCJzZWN0aW9uXCJdLFxuXHRcdHN1YjogW1wicm93XCIsIFwic2VsZWN0XCIsIFwidG9vbGJhclwiXSxcblx0XHRpbXBsaWNpdDogW1wiZGV0YWlsczpub3QoW3JvbGVdKVwiLCBcIm9wdGdyb3VwOm5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdGhlYWRpbmc6IHtcblx0XHRzdXBlcjogW1wic2VjdGlvbmhlYWRcIl0sXG5cdFx0aW1wbGljaXQ6IFtcImgxOm5vdChbcm9sZV0pXCIsIFwiaDI6bm90KFtyb2xlXSlcIiwgXCJoMzpub3QoW3JvbGVdKVwiLFxuXHRcdFx0XCJoNDpub3QoW3JvbGVdKVwiLCBcImg1Om5vdChbcm9sZV0pXCIsIFwiaDY6Om5vdChbcm9sZV0pXCJdLFxuXHRcdGRlZmF1bHRzOiB7XG5cdFx0XHRsZXZlbDogMlxuXHRcdH1cblx0fSxcblx0aW1nOiB7XG5cdFx0c3VwZXI6IFtcInNlY3Rpb25cIl0sXG5cdFx0aW1wbGljaXQ6IFtcImltZ1thbHRdOm5vdChbYWx0PScnXSk6bm90KFtyb2xlXSlcIl1cblx0fSxcblx0aW5wdXQ6IHtcblx0XHRzdXBlcjogW1wid2lkZ2V0XCJdLFxuXHRcdHN1YjogW1wiY2hlY2tib3hcIiwgXCJvcHRpb25cIiwgXCJyYWRpb1wiLCBcInNsaWRlclwiLCBcInNwaW5idXR0b25cIiwgXCJ0ZXh0Ym94XCJdXG5cdH0sXG5cdGxhbmRtYXJrOiB7XG5cdFx0c3VwZXI6IFtcInNlY3Rpb25cIl0sXG5cdFx0c3ViOiBbXCJiYW5uZXJcIiwgXCJjb21wbGVtZW50YXJ5XCIsIFwiY29udGVudGluZm9cIiwgXCJmb3JtXCIsIFwibWFpblwiLCBcIm5hdmlnYXRpb25cIiwgXCJyZWdpb25cIiwgXCJzZWFyY2hcIl1cblx0fSxcblx0bGluazoge1xuXHRcdHN1cGVyOiBbXCJjb21tYW5kXCJdLFxuXHRcdGltcGxpY2l0OiBbXCJhW2hyZWZdOm5vdChbcm9sZV0pXCIsIFwiYXJlYVtocmVmXTpub3QoW3JvbGVdKVwiLCBcImxpbmtbaHJlZl06bm90KFtyb2xlXSlcIl1cblx0fSxcblx0bGlzdDoge1xuXHRcdHN1cGVyOiBbXCJzZWN0aW9uXCJdLFxuXHRcdHN1YjogW1wiZGlyZWN0b3J5XCIsIFwiZmVlZFwiXSxcblx0XHRvd25zOiB7IGFueTogW1wiZ3JvdXBcIiwgXCJsaXN0aXRlbVwiXSB9LFxuXHRcdGltcGxpY2l0OiBbXCJkbDpub3QoW3JvbGVdKVwiLCBcIm9sOm5vdChbcm9sZV0pXCIsIFwidWw6bm90KFtyb2xlXSlcIl1cblx0fSxcblx0bGlzdGJveDoge1xuXHRcdHN1cGVyOiBbXCJzZWxlY3RcIl0sXG5cdFx0b3duczogeyBhbnk6IFtcIm9wdGlvblwiXSB9LFxuXHRcdGltcGxpY2l0OiBbXCJkYXRhbGlzdDpub3QoW3JvbGVdKVwiLCBcInNlbGVjdFttdWx0aXBsZV06bm90KFtyb2xlXSlcIixcblx0XHRcdFwic2VsZWN0W3NpemVdOm5vdChbc2l6ZT0nMCddKTpub3QoW3NpemU9JzEnXSk6bm90KFtyb2xlXSlcIl1cblx0fSxcblx0bGlzdGl0ZW06IHtcblx0XHRzdXBlcjogW1wic2VjdGlvblwiXSxcblx0XHRzdWI6IFtcInRyZWVpdGVtXCJdLFxuXHRcdGNvbnRleHQ6IFtcImdyb3VwXCIsIFwibGlzdFwiXSxcblx0XHRpbXBsaWNpdDogW1wiZHQ6bm90KFtyb2xlXSlcIiwgXCJvbCA+IGxpOjpub3QoW3JvbGVdKVwiXVxuXHR9LFxuXHRsb2c6IHtcblx0XHRzdXBlcjogW1wic2VjdGlvblwiXSxcblx0XHRkZWZhdWx0czoge1xuXHRcdFx0bGl2ZTogXCJwb2xsaXRlXCJcblx0XHR9XG5cdH0sXG5cdG1haW46IHtcblx0XHRzdXBlcjogW1wibGFuZG1hcmtcIl0sXG5cdFx0aW1wbGljaXQ6IFtcIm1haW46bm90KFtyb2xlXSlcIl1cblx0fSxcblx0bWFycXVlZTogeyBzdXBlcjogW1wic2VjdGlvblwiXSB9LFxuXHRtYXRoOiB7XG5cdFx0c3VwZXI6IFtcInNlY3Rpb25cIl0sXG5cdFx0aW1wbGljaXQ6IFtcIm1hdGg6bm90KFtyb2xlXSlcIl1cblx0fSxcblx0bWVudToge1xuXHRcdHN1cGVyOiBbXCJzZWxlY3RcIl0sXG5cdFx0c3ViOiBbXCJtZW51YmFyXCJdLFxuXHRcdG93bnM6IHsgYW55OiBbXCJtZW51aXRlbVwiLCBcIm1lbnVpdGVtcmFkaW9cIiwgXCJtZW51aXRlbWNoZWNrYm94XCIsIFwiZ3JvdXBcIl19LFxuXHRcdGltcGxpY2l0OiBbXCJtZW51W3R5cGU9J2NvbnRleHQnXTpub3QoW3JvbGVdKVwiXSxcblx0XHRkZWZhdWx0czogeyBvcmllbnRhdGlvbjogXCJ2ZXJ0aWNhbFwiIH1cblx0fSxcblx0bWVudWJhcjoge1xuXHRcdHN1cGVyOiBbXCJtZW51XCJdLFxuXHRcdHN1YjogW1widG9vbGJhclwiXSxcblx0XHRvd25zOiB7IGFueTogW1wibWVudWl0ZW1cIiwgXCJtZW51aXRlbXJhZGlvXCIsIFwibWVudWl0ZW1jaGVja2JveFwiLCBcImdyb3VwXCJdIH0sXG5cdFx0ZGVmYXVsdHM6IHsgb3JpZW50YXRpb246IFwiaG9yaXpvbnRhbFwiIH1cblx0fSxcblx0bWVudWl0ZW06IHtcblx0XHRzdXBlcjogW1wiY29tbWFuZFwiXSxcblx0XHRzdWI6IFtcIm1lbnVpdGVtY2hlY2tib3hcIl0sXG5cdFx0Y29udGV4dDogW1wiZ3JvdXBcIiwgXCJtZW51XCIsIFwibWVudWJhclwiXSxcblx0XHRpbXBsaWNpdDogW1wibWVudWl0ZW1bdHlwZT0nY29udGV4dCddOm5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdG1lbnVpdGVtY2hlY2tib3g6IHtcblx0XHRzdXBlcjogW1wiY2hlY2tib3hcIiwgXCJtZW51aXRlbVwiXSxcblx0XHRzdWI6IFtcIm1lbnVpdGVtcmFkaW9cIl0sXG5cdFx0Y29udGV4dDogW1wibWVudVwiLCBcIm1lbnViYXJcIl0sXG5cdFx0aW1wbGljaXQ6IFtcIm1lbnVpdGVtW3R5cGU9J2NoZWNrYm94J106bm90KFtyb2xlXSlcIl0sXG5cdFx0ZGVmYXVsdHM6IHsgY2hlY2tlZDogZmFsc2UgfVxuXHR9LFxuXHRtZW51aXRlbXJhZGlvOiB7XG5cdFx0c3VwZXI6IFtcIm1lbnVpdGVtY2hlY2tib3hcIiwgXCJyYWRpb1wiXSxcblx0XHRjb250ZXh0OiBbXCJncm91cFwiLCBcIm1lbnVcIiwgXCJtZW51YmFyXCJdLFxuXHRcdGltcGxpY2l0OiBbXCJtZW51aXRlbVt0eXBlPSdyYWRpbyddOm5vdChbcm9sZV0pXCJdLFxuXHRcdGRlZmF1bHRzOiB7IGNoZWNrZWQ6IGZhbHNlIH1cblx0fSxcblx0bmF2aWdhdGlvbjoge1xuXHRcdHN1cGVyOiBbXCJsYW5kbWFya1wiXSxcblx0XHRpbXBsaWNpdDogW1wibmF2Om5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdC8qKiBAdG9kbyByZWNvbnNpZGVyIGlmIG5vbmUgPT0gcHJlc2VudGF0aW9uICovXG5cdG5vbmU6IHsgc3VwZXI6IFtcInN0cnVjdHVyZVwiXSB9LFxuXHRub3RlOiB7IHN1cGVyOiBbXCJzZWN0aW9uXCJdIH0sXG5cdC8qKiBAdG9kbyBtb3JlIHN0cmljdCBkYXRhbGlzdCBzZWxlY3RvciAqL1xuXHRvcHRpb246IHtcblx0XHRzdXBlcjogW1wiaW5wdXRcIl0sXG5cdFx0c3ViOiBbXCJ0cmVlaXRlbVwiXSxcblx0XHRjb250ZXh0OiBbXCJsaXN0Ym94XCJdLFxuXHRcdGltcGxpY2l0OiBbXCJkYXRhbGlzdCBvcHRpb246bm90KFtyb2xlXSlcIl0sXG5cdFx0ZGVmYXVsdHM6IHsgY2hlY2tlZDogZmFsc2UgfVxuXHR9LFxuXHRwcmVzZW50YXRpb246IHtcblx0XHRzdXBlcjogW1wic3RydWN0dXJlXCJdXG5cdH0sXG5cdHByb2dyZXNzYmFyOiB7XG5cdFx0c3VwZXI6IFtcInJhbmdlXCJdLFxuXHRcdGltcGxpY2l0OiBbXCJwcm9ncmVzczpub3QoW3JvbGVdKVwiXVxuXHR9LFxuXHRyYWRpbzoge1xuXHRcdHN1cGVyOiBbXCJpbnB1dFwiXSxcblx0XHRzdWI6IFtcIm1lbnVpdGVtcmFkaW9cIl0sXG5cdFx0aW1wbGljaXQ6IFtcImlucHV0W3R5cGU9J3JhZGlvJ106bm90KFtyb2xlXSlcIl0sXG5cdFx0ZGVmYXVsdHM6IHsgY2hlY2tlZDogZmFsc2UgfVxuXHR9LFxuXHRyYWRpb2dyb3VwOiB7XG5cdFx0c3VwZXI6IFtcInNlbGVjdFwiXSxcblx0XHRvd25zOiBbXCJyYWRpb1wiXVxuXHR9LFxuXHRyYW5nZToge1xuXHRcdHN1cGVyOiBbXCJ3aWRnZXRcIl0sXG5cdFx0c3ViOiBbXCJwcm9ncmVzc2JhclwiLCBcInNjcm9sbGJhclwiLCAgXCJzbGlkZXJcIiwgIFwic3BpbmJ1dHRvblwiXVxuXHR9LFxuXHQvKiogQHRvZG8gYWRkIHNlY3Rpb24gc2VsZWN0b3IgdG8gY2hlY2sgYWNjZXNzaWJsZSAqL1xuXHRyZWdpb246IHsgc3VwZXI6IFtcImxhbmRtYXJrXCJdIH0sXG5cdHJvbGV0eXBlOiB7IHN1YjogW1wic3RydWN0dXJlXCIsIFwid2lkZ2V0XCIsIFwid2luZG93XCJdIH0sXG5cdC8qKiBAdG9kbyBtb3JlIHN0cmljdCB0ciBzZWxlY3RvciAqL1xuXHRyb3c6IHtcblx0XHRzdWI6IFtcImdyb3VwXCIsIFwid2lkZ2V0XCJdLFxuXHRcdGNvbnRleHQ6IFtcImdyaWRcIiwgXCJyb3dncm91cFwiLCBcInRhYmxlXCIsIFwidHJlZWdyaWRcIl0sXG5cdFx0b3duczogeyBhbnk6IFtcImNlbGxcIiwgXCJjb2x1bW5oZWFkZXJcIiwgXCJyb3doZWFkZXJcIiwgXCJncmlkY2VsbFwiXSB9LFxuXHRcdGltcGxpY2l0OiBbXCJ0YWJsZSB0cjpub3QoW3JvbGVdKVwiXVxuXHR9LFxuXHRyb3dncm91cDoge1xuXHRcdGNvbnRleHQ6IFtcImdyaWRcIiwgXCJ0YWJsZVwiLCBcInRyZWVncmlkXCJdLFxuXHRcdG93bnM6IHsgYW55OiBbXCJyb3dcIl0gfSxcblx0XHRpbXBsaWNpdDogW1widGhlYWQ6bm90KFtyb2xlXSlcIiwgXCJ0Ym9keTpub3QoW3JvbGVdKVwiLCBcInRmb290Om5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdHJvd2hlYWRlcjoge1xuXHRcdHN1cGVyOiBbXCJjZWxsXCIsIFwiZ3JpZGNlbGxcIiwgXCJzZWN0aW9uaGVhZFwiXSxcblx0XHRjb250ZXh0OiBbXCJyb3dcIl0sXG5cdFx0aW1wbGljaXQ6IFtcInRib2R5IHRoOm5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdHNjcm9sbGJhcjoge1xuXHRcdHN1cGVyOiBbXCJyYW5nZVwiXSxcblx0XHRkZWZhdWx0czoge1xuXHRcdFx0b3JpZW50YXRpb246IFwidmVydGljYWxcIixcblx0XHRcdHZhbHVlTWluOiAwLFxuXHRcdFx0dmFsdWVNYXg6IDEwMFxuXHRcdH1cblx0fSxcblx0c2VhcmNoOiB7IHN1cGVyOiBbXCJsYW5kbWFya1wiXSB9LFxuXHRzZWFyY2hib3g6IHtcblx0XHRzdXBlcjogW1widGV4dGJveFwiXSxcblx0XHRpbXBsaWNpdDogW1wiaW5wdXRbdHlwZT0nc2VhcmNoJ106bm90KFtsaXN0XSk6bm90KFtyb2xlXSlcIl1cblx0fSxcblx0c2VjdGlvbjoge1xuXHRcdHN1cGVyOiBbXCJzdHJ1Y3R1cmVcIl0sXG5cdFx0c3ViOiBbXCJhbGVydFwiLCBcImNlbGxcIiwgXCJkZWZpbml0aW9uXCIsIFwiZmlndXJlXCIsIFwiZ3JvdXBcIiwgXCJpbWdcIiwgXCJsYW5kbWFya1wiLCBcImxpc3RcIiwgXCJsaXN0aXRlbVwiLFxuXHRcdFx0XCJsb2dcIiwgXCJtYXJxdWVlXCIsIFwibWF0aFwiLCBcIm5vdGVcIiwgXCJzdGF0dXNcIiwgXCJ0YWJsZVwiLCBcInRhYnBhbmVsXCIsIFwidGVybVwiLCBcInRvb2x0aXBcIl1cblx0fSxcblx0c2VjdGlvbmhlYWQ6IHtcblx0XHRzdXBlcjogW1wic3RydWN0dXJlXCJdLFxuXHRcdHN1YjogW1wiY29sdW1uaGVhZGVyXCIsIFwiaGVhZGluZ1wiLCBcInJvd2hlYWRlclwiLCBcInRhYlwiXVxuXHR9LFxuXHRzZWxlY3Q6IHtcblx0XHRzdXBlcjogW1wiY29tcG9zaXRlXCIsIFwiZ3JvdXBcIl0sXG5cdFx0c3ViOiBbXCJjb21ib2JveFwiLCBcImxpc3Rib3hcIiwgXCJtZW51XCIsIFwicmFkaW9ncm91cFwiLCBcInRyZWVcIl1cblx0fSxcblx0LyoqIEB0b2RvIHNlcGVyYXRpb24gb2YgZm9jdXNhYmxlICovXG5cdHNlcGFyYXRvcjoge1xuXHRcdHN1cGVyOiBbXCJzdHJ1Y3R1cmVcIiwgXCJ3aWRnZXRcIl0sXG5cdFx0aW1wbGljaXQ6IFtcImhyOm5vdChbcm9sZV0pXCJdLFxuXHRcdGRlZmF1bHRzOiB7XG5cdFx0XHRvcmllbnRhdGlvbjogXCJob3Jpem9udGFsXCIsXG5cdFx0XHR2YWx1ZU1pbjogMCxcblx0XHRcdHZhbHVlTWF4OiAxMDAsXG5cdFx0XHR2YWx1ZU5vdzogNTBcblx0XHR9XG5cdH0sXG5cdHNsaWRlcjoge1xuXHRcdHN1cGVyOiBbXCJpbnB1dFwiLCBcInJhbmdlXCJdLFxuXHRcdGltcGxpY2l0OiBbXCJpbnB1dFt0eXBlPSdyYW5nZSddOm5vdChbcm9sZV0pXCJdLFxuXHRcdGRlZmF1bHRzOiB7XG5cdFx0XHRvcmllbnRhdGlvbjogXCJob3Jpem9udGFsXCIsXG5cdFx0XHR2YWx1ZU1pbjogMCxcblx0XHRcdHZhbHVlTWF4OiAxMDBcblx0XHR9XG5cdH0sXG5cdHNwaW5idXR0b246IHtcblx0XHRzdXBlcjogW1wiY29tcG9zaXRlXCIsIFwiaW5wdXRcIiwgXCJyYW5nZVwiXSxcblx0XHRpbXBsaWNpdDogW1wiaW5wdXRbdHlwZT0nbnVtYmVyJ106bm90KFtyb2xlXSlcIl0sXG5cdFx0ZGVmYXVsdHM6IHtcdHZhbHVlTm93OiAwIH1cblx0fSxcblx0c3RhdHVzOiB7XG5cdFx0c3VwZXI6IFwic2VjdGlvblwiLFxuXHRcdHN1YjogW1wicHJvZ3Jlc3NiYXJcIiwgXCJ0aW1lclwiXSxcblx0XHRpbXBsaWNpdDogW1wib3V0cHV0Om5vdChbcm9sZV0pXCJdXG5cdH0sXG5cdHN0cnVjdHVyZToge1xuXHRcdHN1cGVyOiBbXCJyb2xldHlwZVwiXSxcblx0XHRzdWI6IFtcImFwcGxpY2F0aW9uXCIsIFwiZG9jdW1lbnRcIiwgXCJwcmVzZW50YXRpb25cIiwgXCJyb3dncm91cFwiLCBcInNlY3Rpb25cIiwgXCJzZWN0aW9uaGVhZFwiLCBcInNlcGFyYXRvclwiXVxuXHR9LFxuXHRzd2l0Y2g6IHtcblx0XHRzdXBlcjogW1wiY2hlY2tib3hcIl0sXG5cdFx0ZGVmYXVsc3Q6IHsgY2hlY2tlZDogZmFsc2UgfVxuXHR9LFxuXHR0YWI6IHtcblx0XHRzdXBlcjogW1wic2VjdGlvbmhlYWRcIiwgXCJ3aWRnZXRcIl0sXG5cdFx0Y29udGV4dDogW1widGFibGlzdFwiXSxcblx0XHRkZWZhdWxzdDogeyBzZWxlY3RlZDogZmFsc2UgfVxuXHR9LFxuXHR0YWJsZToge1xuXHRcdHN1cGVyOiBbXCJzZWN0aW9uXCJdLFxuXHRcdHN1YjogW1wiZ3JpZFwiXSxcblx0XHRvd25zOiB7IGFueTogW1wicm93XCIsIFwicm93Z3JvdXBcIl19LFxuXHRcdGltcGxpY2l0OiBbXCJ0YWJsZTpub3QoW3JvbGVdKVwiXVxuXHR9LFxuXHR0YWJsaXN0OiB7XG5cdFx0c3VwZXI6IFtcImNvbXBvc2l0ZVwiXSxcblx0XHRvd25zOiB7IGFueTogW1widGFiXCJdIH0sXG5cdFx0ZGVmYXVsdHM6IHsgb3JpZW50YXRpb246IFwiaG9yaXpvbnRhbFwiIH1cblx0fSxcblx0dGFicGFuZWw6IHsgc3VwZXI6IFtcInNlY3Rpb25cIl0gfSxcblx0dGVybTogeyBzdXBlcjogW1wic2VjdGlvblwiXSB9LFxuXHR0ZXh0Ym94OiB7XG5cdFx0c3VwZXI6IFtcImlucHV0XCJdLFxuXHRcdHN1YjogW1wic2VhcmNoYm94XCJdLFxuXHRcdGltcGxpY2l0OiBbXCJpbnB1dFt0eXBlPSdlbWFpbCddOm5vdChbbGlzdF0pOm5vdChbcm9sZV0pXCIsXG5cdFx0XHRcImlucHV0W3R5cGU9J3RlbCddOm5vdChbbGlzdF0pOm5vdChbcm9sZV0pXCIsIFwiaW5wdXRbdHlwZT0ndGV4dCddOm5vdChbbGlzdF0pOm5vdChbcm9sZV0pXCIsXG5cdFx0XHRcImlucHV0W3R5cGU9J3VybCddOm5vdChbbGlzdF0pOm5vdChbcm9sZV0pXCIsIFwidGV4dGFyZWE6bm90KFtyb2xlXSlcIl1cblx0fSxcblx0dGltZXI6IHsgc3VwZXI6IFtcInN0YXR1c1wiXSB9LFxuXHR0b29sYmFyOiB7XG5cdFx0c3VwZXI6IFtcImdyb3VwXCJdLFxuXHRcdGRlZmF1bHRzOiB7IG9yaWVudGF0aW9uOiBcImhvcml6b250YWxcIiB9XG5cdH0sXG5cdHRvb2x0aXA6IHsgc3VwZXI6IFtcInNlY3Rpb25cIl0gfSxcblx0dHJlZToge1xuXHRcdHN1cGVyOiBbXCJzZWxlY3RcIl0sXG5cdFx0c3ViOiBbXCJ0aHJlZWdyaWRcIl0sXG5cdFx0b3duczogeyBhbnk6IFtcImdyb3VwXCIsIFwidHJlZWl0ZW1cIl0gfVxuXHR9LFxuXHR0cmVlZ3JpZDoge1xuXHRcdHN1cGVyOiBbXCJncmlkXCIsIFwidHJlZVwiXSxcblx0XHRvd25zOiBbXCJyb3dcIiwgXCJyb3dncm91cFwiXVxuXHR9LFxuXHR0cmVlaXRlbToge1xuXHRcdHN1cGVyOiBbXCJsaXN0aXRlbVwiLCBcIm9wdGlvblwiXSxcblx0XHRjb250ZXh0OiB7IGFueTogW1wiZ3JvdXBcIiwgXCJ0cmVlXCJdfVxuXHR9LFxuXHR3aWRnZXQ6IHtcblx0XHRzdXBlcjogW1wicm9sZXR5cGVcIl0sXG5cdFx0c3ViOiBbXCJjb21tYW5kXCIsIFwiY29tcG9zaXRlXCIsIFwiZ3JpZGNlbGxcIiwgXCJpbnB1dFwiLCBcInJhbmdlXCIsIFwicm93XCIsIFwic2VwYXJhdG9yXCIsIFwidGFiXCJdXG5cdH0sXG5cdHdpbmRvdzoge1xuXHRcdHN1cGVyOiBbXCJyb2xldHlwZVwiXSxcblx0XHRzdWI6IFtcImRpYWxvZ1wiXVxuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCByb2xlczsiLCJjb25zdCBNb3VzZXRyYXAgPSByZXF1aXJlKFwibW91c2V0cmFwXCIpO1xuaW1wb3J0IG9iamVjdFBhdGggZnJvbSBcIm9iamVjdC1wYXRoXCI7XG5cbmxldCBpc0Z1bmN0aW9uID0gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iaiA9PSBcImZ1bmN0aW9uXCIgfHwgZmFsc2U7IH07XG52YXIgY3VzdG9tRXZlbnRzID0gW1wia2V5XCIsIFwiYXR0cmlidXRlc1wiLCBcImNoYXJhY3RlckRhdGFcIiwgXCJjaGlsZGxpc3RcIiwgXCJsYWJlbFwiXTtcblxuLyoqXG4gKiBSZWdpc3RlciBleHRyYSBlbGVtZW50cyB1c2VkIGZvciBzb21lIHJvbGVzLFxuICogZS5nLiB0aGUgdXAgYW5kIGRvd24gYXJyb3dzIHdpdGggdGhlIHNwaW5idXR0b24gcm9sZVxuICpcbiAqIFBhdGggb2YgaW1wb3J0YW5jZSB3aGVyZSB0aGUgZWxlbWVudCBpcyByZWNlaXZlZCBmcm9tOlxuICogMS4gbmV3IC4uLiguLi4sIHtlbGVtZW50czogeyByb2xlTmFtZTogeyBzdHI6IGluc3RhbmNlIG9mIEhUTUxFbGVtZW50IH19fSlcbiAqIDIuIFtkYXRhLXJvbGVOYW1lLXN0cj1pZF0gb24gdGhlIGVsZW1lbnQgd2l0aCB0aGUgcm9sZVxuICogMy4gZGVmYXVsdCB2YWx1ZVxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHBhdGggcGF0aCB3aGVyZSB0aGUgZWxlbWVudCBzaG91bGQgYmUgc3RvcmVkXG4gKi9cbmZ1bmN0aW9uIGhhbmRsZUN1c3RvbUVsZW1lbnQocGF0aCwgdmFsdWUpIHtcblx0Ly8gb25seSBpZiBubyBlbGVtZW50IGlzIGFscmVhZHkgc2V0XG5cdGlmKCFvYmplY3RQYXRoLmhhcyh0aGlzLCBcIl8uXCIgKyBwYXRoKSkge1xuXHRcdC8vIGNoZWNrIGlmIGVsZW1lbnQgaGFzIGl0IGRlZmluZWQgYXMgZGF0YSBhdHRyaWJ1dGVcblx0XHR2YXIgaWQgPSB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1cIiArIHBhdGguc3BsaXQoXCIuXCIpLmpvaW4oXCItXCIpKTtcblx0XHRpZihpZCkgdmFyIGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuXHRcdGlmKGVsKSB7XG5cdFx0XHRvYmplY3RQYXRoLnNldCh0aGlzLCBcIl8uXCIgKyBwYXRoLCBlbCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG9iamVjdFBhdGguc2V0KHRoaXMsIFwiXy5cIiArIHBhdGgsIHZhbHVlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlQ3VzdG9tVmFsdWUocGF0aCwgdmFsdWUpIHtcblx0Ly8gb25seSBpZiBubyBlbGVtZW50IGlzIGFscmVhZHkgc2V0XG5cdGlmKCFvYmplY3RQYXRoLmhhcyh0aGlzLCBcIl8uXCIgKyBwYXRoKSkge1xuXHRcdC8vIGNoZWNrIGlmIGVsZW1lbnQgaGFzIGl0IGRlZmluZWQgYXMgZGF0YSBhdHRyaWJ1dGVcblx0XHR2YXIgZGF0YVZhbHVlID0gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtXCIgKyBwYXRoLnNwbGl0KFwiLlwiKS5qb2luKFwiLVwiKSk7XG5cdFx0aWYoZGF0YVZhbHVlKSB7XG5cdFx0XHRvYmplY3RQYXRoLnNldCh0aGlzLCBcIl8uXCIgKyBwYXRoLCBkYXRhVmFsdWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRvYmplY3RQYXRoLnNldCh0aGlzLCBcIl8uXCIgKyBwYXRoLCB2YWx1ZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGNhbWVsaXplKHN0cikge1xuXHRyZXR1cm4gc3RyWzBdLnRvVXBwZXJDYXNlKCkgKyBzdHIucmVwbGFjZSgvLSguKS9nLCBmdW5jdGlvbiAoYSwgYikge1xuXHRcdHJldHVybiBiLnRvVXBwZXJDYXNlKCk7XG5cdH0pLnNsaWNlKDEpO1xufVxuXG5mdW5jdGlvbiBtb0NhbGxiYWNrKG11dGF0aW9ucykge1xuXHQvLyBjb25zb2xlLmxvZyhtdXRhdGlvbnMpO1xuXHRtdXRhdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAobXV0YXRpb24pIHtcblx0XHRpZiAobXV0YXRpb24udHlwZSA9PSBcImF0dHJpYnV0ZXNcIikge1xuXHRcdFx0bGV0IGF0dHJOYW1lID0gbXV0YXRpb24uYXR0cmlidXRlTmFtZTtcblx0XHRcdC8vIHVwZGF0ZSB0byBuZXcgdmFsdWVcblx0XHRcdHRoaXMuXy52YWx1ZXNbYXR0ck5hbWVdID0gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyTmFtZSk7XG5cdFx0fVxuXG5cdFx0bGV0IGxpc3RlbmVycyA9IHRoaXMuXy5saXN0ZW5lcnMuZ2V0KFwibXV0YXRpb25cIik7XG5cdFx0Y29uc29sZS5sb2cobGlzdGVuZXJzKTtcblx0fS5iaW5kKHRoaXMpKTtcbn1cblxuXG4vKipcbiAqIEFkZHMgc29tZSBiYXNpYyBmdW5jdGlvbmFsaXR5IHRoYXQgaXMgZ3JlYXRseSB1c2VkIGluc2lkZSB0aGUgY29tcG9uZW50c1xuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IFx0RWxlbWVudCB3aGVyZSBhIEFjY2Vzc2libGVOb2RlIHNob3VsZCBiZSBjcmVhdGVkXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBcdFx0QWRkaXRpb25hbCBvcHRpb25zIHRvIHNldFxuICovXG5jbGFzcyBCYXNlIHtcblx0Y29uc3RydWN0b3IoZWxlbWVudCwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiZWxlbWVudFwiLCB7dmFsdWU6IGVsZW1lbnR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJfXCIsIHt2YWx1ZTogb3B0aW9uc30pO1xuXHRcdHRoaXMuXy52YWx1ZXMgPSB7fTtcblx0XHR0aGlzLl8ubGlzdGVuZXJzID0gbmV3IE1hcCgpO1xuXHRcdHRoaXMuXy5yZWdpc3RlckN1c3RvbUVsZW1lbnQgPSBoYW5kbGVDdXN0b21FbGVtZW50LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5fLnJlZ2lzdGVyQ3VzdG9tVmFsdWUgPSBoYW5kbGVDdXN0b21WYWx1ZS5iaW5kKHRoaXMpO1xuXG5cdFx0b2JqZWN0UGF0aC5wdXNoKHRoaXMuXywgXCJtdXRhdGlvbnNcIiwgXCJ0YWJJbmRleFwiKTtcblxuXHRcdHZhciBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKG1vQ2FsbGJhY2suYmluZCh0aGlzKSk7XG5cdFx0b2JzZXJ2ZXIub2JzZXJ2ZShcblx0XHRcdHRoaXMuZWxlbWVudCxcblx0XHRcdHthdHRyaWJ1dGVzOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUsIGF0dHJpYnV0ZUZpbHRlcjogdGhpcy5fLm11dGF0aW9uc31cblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEN1cnJlbnQgdGFiaW5kZXggb2YgdGhlIGVsZW1lbnRcblx0ICogQHR5cGUge051bWJlcn1cblx0ICovXG5cdGdldCB0YWJJbmRleCgpIHsgXG5cdFx0aWYgKCF0aGlzLmVsZW1lbnQuaGFzQXR0cmlidXRlKFwidGFiaW5kZXhcIikpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5lbGVtZW50LnRhYkluZGV4O1xuXHR9XG5cdHNldCB0YWJJbmRleChudW1iZXIpIHsgdGhpcy5lbGVtZW50LnRhYkluZGV4ID0gbnVtYmVyOyB9XG5cblx0LyoqXG5cdCAqIEFkZHMgYW4gbGlzdGVuZXIgdG8gdGhlIG9iamVjdCBhbmQgdGFyZ2V0ZWQgZWxlbWVudFxuXHQgKiBAc2VlIGN1c3RvbUV2ZW50c1xuXHQgKiBAcGFyYW0ge1N0cmluZ30gbGFiZWwgVHlwZSBvZiBldmVudFxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvblxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIEV4dGVuZHMgQWRkRXZlbnRMaXN0ZW5lck9wdGlvbnNcblx0ICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmtleV0gV2hlbiBsYWJlbCBpcyBzZXQgdG8gYGtleWAgaXQgc3BlY2lmaWVzIHRoZSBrZXljb21ibyB0byBsaXN0ZW4gdG9cblx0ICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmF0dHJpYnV0ZV0gV2hlbiBsYWJlbCBpcyBzZXQgdG8gYGF0dHJpYnV0ZXNgIGl0IHNwZWNpZmllcyB3aGljaCBhdHRyaWJ1dGUgc2hvdWxkIGJlIGNoYW5nZWRcblx0ICogQHBhcmFtIHtFbGVtZW50fSBbb3B0aW9ucy50YXJnZXRdIENoYW5nZXMgdGhlIHRhcmdldGVkIGVsZW1lbnRcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jYXB0dXJlXVxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnBhc3NpdmVdXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMub25jZV1cblx0ICovXG5cdGFkZExpc3RlbmVyKGxhYmVsLCBjYWxsYmFjaywgb3B0aW9ucykge1xuXHRcdHZhciBlbCA9IG9wdGlvbnMgJiYgb3B0aW9ucy50YXJnZXQgPyBvcHRpb25zLnRhcmdldCA6IHRoaXMuZWxlbWVudDtcblx0XHR0aGlzLl8ubGlzdGVuZXJzLmhhcyhsYWJlbCkgfHwgdGhpcy5fLmxpc3RlbmVycy5zZXQobGFiZWwsIFtdKTtcblx0XHR0aGlzLl8ubGlzdGVuZXJzLmdldChsYWJlbCkucHVzaCh7Y2FsbGJhY2ssIG9wdGlvbnN9KTtcblxuXHRcdGlmIChsYWJlbCA9PSBcImtleVwiICYmIG9wdGlvbnMua2V5KSB7XG5cdFx0XHRNb3VzZXRyYXAoZWwpLmJpbmQob3B0aW9ucy5rZXksIGNhbGxiYWNrKTtcblx0XHR9XG5cblx0XHRpZiAoY3VzdG9tRXZlbnRzLmluZGV4T2YobGFiZWwpID09IC0xKSB7XG5cdFx0XHRlbC5hZGRFdmVudExpc3RlbmVyKGxhYmVsLCBjYWxsYmFjaywgb3B0aW9ucyk7XG5cdFx0fVxuXHR9XG5cblx0cmVtb3ZlTGlzdGVuZXIobGFiZWwsIGNhbGxiYWNrLCBvcHRpb25zKSB7XG5cdFx0bGV0IGxpc3RlbmVycyA9IHRoaXMuXy5saXN0ZW5lcnMuZ2V0KGxhYmVsKSwgaW5kZXg7XG5cblx0XHRpZiAobGlzdGVuZXJzICYmIGxpc3RlbmVycy5sZW5ndGgpIHtcblx0XHRcdGluZGV4ID0gbGlzdGVuZXJzLnJlZHVjZSgoaSwgbGlzdGVuZXIsIGluZGV4KSA9PiB7XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHRpc0Z1bmN0aW9uKGxpc3RlbmVyLmNhbGxiYWNrKSAmJiBsaXN0ZW5lci5jYWxsYmFjayA9PT0gY2FsbGJhY2sgJiZcblx0XHRcdFx0XHQoXG5cdFx0XHRcdFx0XHQoXG5cdFx0XHRcdFx0XHRcdGxpc3RlbmVyLm9wdGlvbnMgJiZcblx0XHRcdFx0XHRcdFx0bGlzdGVuZXIub3B0aW9ucy5rZXkgPT0gb3B0aW9ucy5rZXkgJiZcblx0XHRcdFx0XHRcdFx0bGlzdGVuZXIub3B0aW9ucy5hdHRyaWJ1dGUgPT0gb3B0aW9ucy5hdHRyaWJ1dGUgJiZcblx0XHRcdFx0XHRcdFx0bGlzdGVuZXIub3B0aW9ucy5jYXB0dXJlID09IG9wdGlvbnMuY2FwdHVyZVxuXHRcdFx0XHRcdFx0KSB8fFxuXHRcdFx0XHRcdFx0IWxpc3RlbmVyLm9wdGlvbnMgJiYgIW9wdGlvbnNcblx0XHRcdFx0XHQpXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHJldHVybiBpID0gaW5kZXg7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuIGk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIC0xKTtcblxuXHRcdFx0aWYgKGluZGV4ID4gLTEpIHtcblx0XHRcdFx0aWYgKGN1c3RvbUV2ZW50cy5pbmRleE9mKGxhYmVsKSA9PSAtMSkge1xuXHRcdFx0XHRcdHZhciBlbCA9IG9wdGlvbnMgJiYgb3B0aW9ucy50YXJnZXQgPyBvcHRpb25zLnRhcmdldCA6IHRoaXMuZWxlbWVudDtcblxuXHRcdFx0XHRcdGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIobGFiZWwsIGNhbGxiYWNrLCBvcHRpb25zKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdFx0dGhpcy5fLmxpc3RlbmVycy5zZXQobGFiZWwsIGxpc3RlbmVycyk7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRkaXNwYXRjaEV2ZW50KGV2KSB7XG5cdFx0Ly8gbGV0IGxpc3RlbmVycyA9IHRoaXMuXy5saXN0ZW5lcnMuZ2V0KGV2LnR5cGUpO1xuXHRcdHRoaXMuZWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2KTtcblx0XHQvLyBpZiAobGlzdGVuZXJzICYmIGxpc3RlbmVycy5sZW5ndGgpIHtcblx0XHQvLyBcdGxpc3RlbmVycy5mb3JFYWNoKChsaXN0ZW5lcikgPT4ge1xuXHRcdC8vIFx0XHRsaXN0ZW5lcihldik7XG5cdFx0Ly8gXHR9KTtcblx0XHQvLyBcdHJldHVybiB0cnVlO1xuXHRcdC8vIH1cblx0XHQvLyByZXR1cm4gZmFsc2U7XG5cdH1cblxuXG5cdGFkZEtleUxpc3RlbmVyKGtleSwgY2FsbGJhY2spIHtcblx0XHRyZXR1cm4gdGhpcy5hZGRMaXN0ZW5lcihcImtleVwiLCBjYWxsYmFjaywge2tleX0pO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2U7IiwiaW1wb3J0IG1peCBmcm9tIFwiQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW5cIjtcbmltcG9ydCBDb21tYW5kIGZyb20gXCIuL2Fic3RyYWN0L0NvbW1hbmRcIjtcbmltcG9ydCBib29sZWFuIGZyb20gXCIuLy4uL3R5cGUvYm9vbGVhblwiO1xuXG5pbXBvcnQgQXJpYVByZXNzZWQgZnJvbSBcIi4uL2F0dHJpYnV0ZXMvYXJpYS1wcmVzc2VkLmpzXCI7XG5pbXBvcnQgQXJpYUV4cGFuZGVkIGZyb20gXCIuLi9hdHRyaWJ1dGVzL2FyaWEtZXhwYW5kZWRcIjtcblxuZnVuY3Rpb24gY2xvc2UoKSB7XG5cdHRoaXMuZXhwYW5kZWQgPSBib29sZWFuLklTX05PVF9BQ1RJVkU7XG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyRXhwYW5kZWQoZXYpIHtcblx0Y29uc29sZS5sb2coZXYpO1xufVxuXG4vKipcbiAqIFxuICogXG4gKiBAZXh0ZW5kcyBDb21tYW5kXG4gKiBAbWl4ZXMgQXJpYUV4cGFuZGVkXG4gKiBAbWl4ZXMgQXJpYVByZXNzZWRcbiAqL1xuY2xhc3MgQnV0dG9uIGV4dGVuZHMgbWl4KENvbW1hbmQpLndpdGgoQXJpYUV4cGFuZGVkLCBBcmlhUHJlc3NlZCkge1xuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0c3VwZXIoLi4uYXJncyk7XG5cblx0XHR0aGlzLmFkZExpc3RlbmVyKFxuXHRcdFx0XCJhdHRyaWJ1dGVzXCIsXG5cdFx0XHRyZWdpc3RlckV4cGFuZGVkLFxuXHRcdFx0eyBhdHRyaWJ1dGU6IFwiYXJpYS1leHBhbmRlZFwiLCBvbmNlOiB0cnVlIH1cblx0XHQpO1xuXG5cdFx0aWYgKHRoaXMuZXhwYW5kZWQgIT09IHVuZGVmaW5lZCkgeyAvLyB0b2RvOiBhZGQgd2hlbiBmaXJzdCB0aW1lIGFyaWEtZXhwYW5kZWQgaXMgYm9vbGVhblxuXHRcdFx0dGhpcy5jb250cm9scy5mb3JFYWNoKGNvbnRyb2wgPT4gY29udHJvbC5hZGRMaXN0ZW5lcihcImNsb3NlXCIsIGNsb3NlLmJpbmQodGhpcykpKTtcblx0XHR9XG5cdH1cblxuXHRvbkV4cGFuZGVkKGV2KSB7XG5cdFx0aWYgKHR5cGVvZiBzdXBlci5vbkV4cGFuZGVkID09IFwiZnVuY3Rpb25cIikgc3VwZXIub25FeHBhbmRlZChldik7XG5cblx0XHRpZiAodGhpcy5kaXNhYmxlZCAhPT0gdHJ1ZSkge1xuXHRcdFx0aWYgKHRoaXMuZXhwYW5kZWQpIHtcblx0XHRcdFx0dGhpcy5jb250cm9scy5mb3JFYWNoKGNvbnRyb2wgPT4ge1xuXHRcdFx0XHRcdGNvbnRyb2wuZWxlbWVudC5oaWRkZW4gPSBmYWxzZTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmNvbnRyb2xzLmZvckVhY2goY29udHJvbCA9PiB7XG5cdFx0XHRcdFx0Y29udHJvbC5lbGVtZW50LmhpZGRlbiA9IHRydWU7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVx0XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbjsiLCJpbXBvcnQgbWl4IGZyb20gXCJAdmVzdGVyZ2FhcmQtY29tcGFueS9qcy1taXhpblwiO1xuaW1wb3J0IElucHV0IGZyb20gXCIuL2Fic3RyYWN0L0lucHV0XCI7XG5cbmltcG9ydCBBcmlhQ2hlY2tlZCBmcm9tIFwiLi4vYXR0cmlidXRlcy9hcmlhLWNoZWNrZWQuanNcIjtcblxuY2xhc3MgQ2hlY2tib3ggZXh0ZW5kcyBtaXgoSW5wdXQpLndpdGgoQXJpYUNoZWNrZWQpIHt9XG5cbmV4cG9ydCBkZWZhdWx0IENoZWNrYm94O1xuIiwiaW1wb3J0IGJvb2xlYW4gZnJvbSBcIi4vLi4vdHlwZS9ib29sZWFuXCI7XG5pbXBvcnQgU2VsZWN0IGZyb20gXCIuL2Fic3RyYWN0L1NlbGVjdFwiO1xuaW1wb3J0IHNlbGVjdG9yIGZyb20gXCIuLy4uL3V0aWxzL3NlbGVjdG9yXCI7XG5cbmZ1bmN0aW9uIGZpbHRlcihjYiwgdmFsdWUpIHtcblx0dmFyIHNlbGVjdGVkT3B0aW9ucyA9IFtdO1xuXG5cdGNiLm93bnMuZm9yRWFjaChsaXN0Ym94ID0+IHtcblx0XHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGxpc3Rib3guZWxlbWVudC5jaGlsZHJlbiwgb3B0aW9uID0+IHtcblx0XHRcdGlmKHZhbHVlID09PSBudWxsKSB7XG5cdFx0XHRcdG9wdGlvbi5oaWRkZW4gPSB0cnVlO1xuXHRcdFx0fSBlbHNlIGlmIChvcHRpb24uaW5uZXJIVE1MLmluZGV4T2YodmFsdWUpID09IDApIHtcblx0XHRcdFx0b3B0aW9uLmhpZGRlbiA9IGZhbHNlO1xuXHRcdFx0XHRpZihvcHRpb24uaW5uZXJIVE1MID09PSB2YWx1ZSkge1xuXHRcdFx0XHRcdHNlbGVjdGVkT3B0aW9ucy5wdXNoKG9wdGlvbik7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG9wdGlvbi5oaWRkZW4gPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcblxuXHRyZXR1cm4gc2VsZWN0ZWRPcHRpb25zO1xufVxuXG5mdW5jdGlvbiB0b2dnbGVMaXN0Ym94KGV2KSB7XG5cdGlmKGV2KSBldi5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdGlmICh0aGlzLmV4cGFuZGVkID09IGJvb2xlYW4uSVNfQUNUSVZFKSB7XG5cdFx0aGlkZUxpc3Rib3guY2FsbCh0aGlzKTtcblx0fSBlbHNlIHtcblx0XHRzaG93TGlzdGJveC5jYWxsKHRoaXMpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVZhbHVlKGV2KSB7XG5cdGlmKGV2KSBldi5wcmV2ZW50RGVmYXVsdCgpO1xuXHRjb25zb2xlLmxvZyh0aGlzLl8uY29tYm9ib3guaW5wdXQudmFsdWUsIGV2LnRhcmdldC5pbm5lckhUTUwsIHRoaXMuXywgZXYpO1xuXHR0aGlzLl8uY29tYm9ib3guaW5wdXQudmFsdWUgPSBldi50YXJnZXQuaW5uZXJIVE1MO1xuXG5cdGhpZGVMaXN0Ym94LmJpbmQodGhpcyk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpc3Rib3goKSB7IFxuXHR2YXIgb3B0aW9ucyA9IGZpbHRlcih0aGlzLCB0aGlzLl8uY29tYm9ib3guaW5wdXQudmFsdWUpO1xuXG5cdG9wdGlvbnMuZm9yRWFjaChpID0+IHtcblx0XHRpLnNlbGVjdGVkID0gdHJ1ZTtcblx0fSk7XG59XG5mdW5jdGlvbiBzaG93TGlzdGJveCgpIHtcblx0dGhpcy5leHBhbmRlZCA9IGJvb2xlYW4uSVNfQUNUSVZFO1xuXHR1cGRhdGVMaXN0Ym94LmNhbGwodGhpcyk7XG59XG5mdW5jdGlvbiBoaWRlTGlzdGJveCgpIHtcblx0dGhpcy5leHBhbmRlZCA9IGJvb2xlYW4uSVNfTk9UX0FDVElWRTtcblx0ZmlsdGVyKHRoaXMpO1xufVxuXG4vKipcbiAqIEEgY29tYm9ib3ggaXMgYSB3aWRnZXQgbWFkZSB1cCBvZiB0aGUgY29tYmluYXRpb24gb2YgdHdvIGRpc3RpbmN0IGVsZW1lbnRzOiBcbiAqIFxuICogMS4gYSBzaW5nbGUtbGluZSB0ZXh0Ym94XG4gKiAyLiBhbiBhc3NvY2lhdGVkIHBvcC11cCBlbGVtZW50IGZvciBoZWxwaW5nIHVzZXJzIHNldCB0aGUgdmFsdWUgb2YgdGhlIHRleHRib3guIFxuICogXG4gKiBUaGUgcG9wdXAgbWF5IGJlIGEgbGlzdGJveCwgZ3JpZCwgdHJlZSwgb3IgZGlhbG9nLiBNYW55IGltcGxlbWVudGF0aW9ucyBhbHNvIGluY2x1ZGUgYSB0aGlyZCBcbiAqIG9wdGlvbmFsIGVsZW1lbnQgLS0gYSBncmFwaGljYWwgYnV0dG9uIGFkamFjZW50IHRvIHRoZSB0ZXh0Ym94LCBpbmRpY2F0aW5nIHRoZSBhdmFpbGFiaWxpdHkgb2ZcbiAqIHRoZSBwb3B1cC4gQWN0aXZhdGluZyB0aGUgYnV0dG9uIGRpc3BsYXlzIHRoZSBwb3B1cCBpZiBzdWdnZXN0aW9ucyBhcmUgYXZhaWxhYmxlLlxuICogXG4gKiBAZXh0ZW5kcyBTZWxlY3RcbiAqIEBwYXJhbSB7RWxlbWVudH0gb3B0aW9ucy5jb21ib2JveC5pbnB1dCBcdERlZmF1bHRzIHRvIGZpcnN0IGlucHV0IGVsZW1lbnQgaW5zaWRlIHRoZSBlbGVtZW50XG4gKiBAcGFyYW0ge0VsZW1lbnR9IFtvcHRpb25zLmNvbWJvYm94Lm9wZW5dXHRcbiAqIFx0T3B0aW9uYWwgYnV0dG9uIHRvIG9wZW4gdGhlIHBvcC11cCBlbGVtZW50LCBcbiAqIFx0ZGVmYXVsdHMgdG8gZmlyc3QgYnV0dG9uIGVsZW1lbnQgaW5zaWRlIHRoZSBlbGVtZW50XG4gKi9cbmNsYXNzIENvbWJvYm94IGV4dGVuZHMgU2VsZWN0IHtcblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdHN1cGVyKC4uLmFyZ3MpO1xuXG5cdFx0Ly8gcmVnaXN0ZXIgY3VzdG9tIGVsZW1lbnRzXG5cdFx0dGhpcy5fLnJlZ2lzdGVyQ3VzdG9tRWxlbWVudChcImNvbWJvYm94LmlucHV0XCIsIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yLmdldERlZXBTZWxlY3RvcihcInRleHRib3hcIikpKTtcblx0XHR0aGlzLl8ucmVnaXN0ZXJDdXN0b21FbGVtZW50KFwiY29tYm9ib3gub3BlblwiLCB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvci5nZXREZWVwU2VsZWN0b3IoXCJidXR0b25cIikpKTtcblx0XHRcblx0XHRpZiAodGhpcy5fLmNvbWJvYm94Lm9wZW4pIHtcblx0XHRcdHRoaXMuXy5jb21ib2JveC5vcGVuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGVMaXN0Ym94LmJpbmQodGhpcykpO1xuXHRcdH1cblx0XHRcblx0XHR0aGlzLl8uY29tYm9ib3guaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIHNob3dMaXN0Ym94LmJpbmQodGhpcykpO1xuXHRcdHRoaXMuXy5jb21ib2JveC5pbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCBoaWRlTGlzdGJveC5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLl8uY29tYm9ib3guaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIHVwZGF0ZUxpc3Rib3guYmluZCh0aGlzKSk7XG5cdFx0Ly8gdGhpcy5vd25zLmZvckVhY2goaSA9PiBpLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHVwZGF0ZVZhbHVlLmJpbmQodGhpcykpKTtcblxuXHRcdGlmKHRoaXMuYXV0b2NvbXBsZXRlID09IFwibGlzdFwiKSB7XG5cdFx0XHQvLyBJbmRpY2F0ZXMgdGhhdCB0aGUgYXV0b2NvbXBsZXRlIGJlaGF2aW9yIG9mIHRoZSB0ZXh0IGlucHV0IGlzIHRvIHN1Z2dlc3QgYSBsaXN0IG9mIHBvc3NpYmxlIHZhbHVlc1xuXHRcdFx0Ly8gaW4gYSBwb3B1cCBhbmQgdGhhdCB0aGUgc3VnZ2VzdGlvbnMgYXJlIHJlbGF0ZWQgdG8gdGhlIHN0cmluZyB0aGF0IGlzIHByZXNlbnQgaW4gdGhlIHRleHRib3guXG5cblx0XHR9IGVsc2UgaWYgKHRoaXMuYXV0b2NvbXBsZXRlID09IFwiYm90aFwiKSB7XG5cdFx0XHQvLyBuZGljYXRlcyB0aGF0IHRoZSBhdXRvY29tcGxldGUgYmVoYXZpb3Igb2YgdGhlIHRleHQgaW5wdXQgaXMgdG8gYm90aCBzaG93IGFuIGlubGluZSBcblx0XHRcdC8vIGNvbXBsZXRpb24gc3RyaW5nIGFuZCBzdWdnZXN0IGEgbGlzdCBvZiBwb3NzaWJsZSB2YWx1ZXMgaW4gYSBwb3B1cCB3aGVyZSB0aGUgc3VnZ2VzdGlvbnMgXG5cdFx0XHQvLyBhcmUgcmVsYXRlZCB0byB0aGUgc3RyaW5nIHRoYXQgaXMgcHJlc2VudCBpbiB0aGUgdGV4dGJveC5cblx0XHR9XG5cblx0XHQvKiogQHRvZG8gZGV0ZXJtaW5lIHdoYXQgdG8gZG8gd2l0aCBkZWZhdWx0IHZhbHVlcyAqL1xuXHRcdGlmKHRoaXMuZXhwYW5kZWQgPT0gdW5kZWZpbmVkKSB0aGlzLmV4cGFuZGVkID0gZmFsc2U7XG5cdFx0aWYgKHRoaXMuaGFzUG9wdXAgPT0gdW5kZWZpbmVkKSB0aGlzLmhhc1BvcHVwID0gXCJsaXN0Ym94XCI7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29tYm9ib3g7IiwiaW1wb3J0IG1peCBmcm9tIFwiQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW5cIjtcbmltcG9ydCBXaW5kb3cgZnJvbSBcIi4vYWJzdHJhY3QvV2luZG93XCI7XG5jb25zdCBNb3VzZXRyYXAgPSByZXF1aXJlKFwibW91c2V0cmFwXCIpO1xuXG5pbXBvcnQgQXJpYUV4cGFuZGVkIGZyb20gXCIuLi9hdHRyaWJ1dGVzL2FyaWEtZXhwYW5kZWQuanNcIjtcblxuZnVuY3Rpb24gZm9jdXMobm9kZSkge1xuXHQvLyBnZXQgYWxsIGVsZW1lbnRzIHdpdGhpbiBnaXZlbiBlbGVtZW50XG5cdGxldCBjaGlsZHJlbiA9IG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCIqXCIpO1xuXHRcblx0Ly8gcmVtb3ZlIGFsbCBlbGVtZW50cyB3aG8gYXJlbid0IGFjY2Vzc2libGUgYnkgYSB0YWJcblx0bGV0IGZvY3VzYWJsZU5vZGVzID0gQXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKGNoaWxkcmVuLCBpID0+IHtcblx0XHRyZXR1cm4gKGkudGFiSW5kZXggPiAtMSB8fCBpLmNvbnRlbnRFZGl0YWJsZSA9PSBcInRydWVcIilcblx0XHRcdCYmICFpLmRpc2FibGVkICYmIGkub2Zmc2V0V2lkdGggPiAwICYmIGkub2Zmc2V0SGVpZ2h0ID4gMDtcblx0fSk7XG5cdFxuXHQvLyBzb3J0IGVsZW1lbnRzIGluIGRlc2NlbmRpbmcgb3JkZXJcblx0Zm9jdXNhYmxlTm9kZXMuc29ydCgoYSwgYikgPT4gYS50YWJJbmRleCArIGIudGFiSW5kZXgpO1xuXG5cdC8vIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpO1xuXHQvLyBmb2N1c2FibGVFbC5mb2N1cygpO1xuXHRyZXR1cm4gZm9jdXNhYmxlTm9kZXM7XG59XG5cbi8qKlxuICogQHN1bW1hcnkgQSBjaGlsZCB3aW5kb3cgd2l0aGluIGEgd2VicGFnZVxuICpcbiAqIEBkZXNjXG4gKiAqIFByb21wdHMgdGhlIHVzZXIgdG8gcGVyZm9ybSBhIHNwZWNpZmljIGFjdGlvblxuICogKiBJZiBpdCBpcyBkZXNpZ25lZCB0byBpbnRlcnJ1cCwgaXQgaXMgdXN1YWxseSBhIG1vZGFsLiBTZWUgW2FsZXJ0ZGlhbG9nXSgpXG4gKiAqIEl0IHNob3VsZCBoYXZlIGEgbGFiZWwsIGl0IGNhbiBiZSBkb25lIHdpdGggdGhlIGBhcmlhLWxhYmVsYCBhdHRyaWJ1dGVcbiAqICogSXQgc2hvdWxkIGhhdmUgYXQgbGVhc3Qgb25lIGZvY3VzYWJsZSBkZXNjZW5kYW50IGVsZW1lbnQuXG4gKiAqIEl0IHNob3VsZCBmb2N1cyBhbiBlbGVtZW50IGluIHRoZSBtb2RhbCB3aGVuIGRpc3BsYXllZC5cbiAqICogSXQgc2hvdWxkIG1hbmFnZSBmb2N1cyBvZiBtb2RhbCBkaWFsb2dzIChrZWVwIHRoZSBmb2N1cyBpbnNpZGUgdGhlIG9wZW4gbW9kYWwpLlxuICpcbiAqICMjIyMjIGV4YW1wbGVcbiAqXG4gKiA8ZGl2IHJvbGU9XCJkaWFsb2dcIiBhcmlhLWxhYmVsPVwiV2luZG93IHRvIGNvbmZpcm0geW91ciBhY2NlcHRhbmNlIG9mIHRoaXMgd29ybGRcIj5cbiAqICBIZWxsbyB3b3JsZCFcbiAqIFx0PGJ1dHRvbiBmb2N1cyB0eXBlPVwiYnV0dG9uXCI+T2s8L2J1dHRvbj5cbiAqIDwvZGl2PlxuICovXG5jbGFzcyBEaWFsb2cgZXh0ZW5kcyBtaXgoV2luZG93KS53aXRoKEFyaWFFeHBhbmRlZCkge1xuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0c3VwZXIoLi4uYXJncyk7XG5cblx0XHQvLyB0aGlzLmVsZW1lbnQub3duZXJEb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgdGhpcy5fb25Gb2N1cy5iaW5kKHRoaXMpLCB0cnVlKTtcblx0XHQvLyB0aGlzLmVsZW1lbnQub3duZXJEb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCB0aGlzLl9vbkZvY3VzLmJpbmQodGhpcyksIHRydWUpO1xuXHRcdHRoaXMuYWRkTGlzdGVuZXIoXCJrZXlcIiwgdGhpcy5vbkNsb3NlLmJpbmQodGhpcyksIHsga2V5OiBcImVzY1wiLCB0YXJnZXQ6IHRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50fSk7XG5cblx0XHR2YXIgbiA9IGZvY3VzKGRvY3VtZW50KTtcblx0XHR2YXIgaSA9IDA7XG5cdFx0Ly8gdmFyIHQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG5cdFx0Ly8gXHRjb25zb2xlLmxvZyhNb3VzZXRyYXAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkudHJpZ2dlcihcInRhYlwiKSk7XG5cdFx0Ly8gXHQvLyBsZXQgaSA9IG4uaW5kZXhPZihkb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcblx0XHQvLyBcdGlmKGkgPCBuLmxlbmd0aCkge1xuXHRcdC8vIFx0XHR2YXIgZiA9IG5ldyBGb2N1c0V2ZW50KFwiZm9jdXNcIik7XG5cdFx0Ly8gXHRcdG5baSsrXS5kaXNwYXRjaEV2ZW50KGYpO1xuXHRcdC8vIFx0XHQvLyBjb25zb2xlLmxvZyhuW2krK10uZm9jdXMoKSk7XG5cdFx0Ly8gXHR9XG5cdFx0Ly8gfSwgMTAwMCk7XG5cdH1cblxuXHRfb25Gb2N1cyhldikge1xuXHRcdC8vIGV2LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0bGV0IG4gPSBmb2N1cyh0aGlzLmVsZW1lbnQub3duZXJEb2N1bWVudCk7XG5cdFx0aWYobltuLmxlbmd0aC0xXSAhPSBldi50YXJnZXQpIHtcblx0XHRcdGV2LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR3aW5kb3cuZm9jdXMoKTtcblx0XHR9XG5cdFx0Y29uc29sZS5sb2coZXYpO1xuXHR9XG5cblx0b25DbG9zZShldikge1xuXHRcdGlmKGV2KSBldi5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMuZWxlbWVudC5oaWRkZW4gPSB0cnVlO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImNsb3NlXCIpKTtcblx0fVxuXG5cdF9vbkhpZGRlbk11dGF0aW9uKGV2KSB7XG5cdFx0aWYodGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZShcImhpZGRlblwiKSA9PT0gXCJ0cnVlXCIpIHtcblx0XHRcdHZhciBuID0gZm9jdXModGhpcy5lbGVtZW50KTtcblx0XHRcdG5bMF0uZm9jdXMoKTtcblx0XHRcdGNvbnNvbGUubG9nKG4sIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQsIG4gPT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XG5cdFx0fSBlbHNlIHtcblxuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBEaWFsb2c7IiwiaW1wb3J0IExhbmRtYXJrIGZyb20gXCIuL2Fic3RyYWN0L0xhbmRtYXJrXCI7XG5pbXBvcnQgc2VsZWN0b3IgZnJvbSBcIi4vLi4vdXRpbHMvc2VsZWN0b3JcIjtcbmltcG9ydCBlbGVtZW50cyBmcm9tIFwiLi8uLi91dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IGNyZWF0ZSBmcm9tIFwiLi8uLi91dGlscy9jcmVhdGVcIjtcblxuY2xhc3MgRm9ybSBleHRlbmRzIExhbmRtYXJrIHtcblx0Z2V0IGVsZW1lbnRzKCkge1xuXHRcdC8vIGdldCBuYXRpdmUgZWxlbWVudHNcblx0XHR2YXIgc2VsZWN0b3IgPSBbXCJidXR0b25cIiwgXCJmaWVsZHNldFwiLCBcImlucHV0XCIsIFwib2JqZWN0XCIsIFwib3V0cHV0XCIsIFwic2VsZWN0XCIsIFwidGV4dGFyZWFcIl0uam9pbihcIjpub3QoW3JvbGVdKSxcIik7XG5cdFx0dmFyIHJlcyA9IEFycmF5LmZyb20odGhpcy5lbGVtZW50cy5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG5cblx0XHR2YXIgZXhwbGljaXRSb2xlID0gXCJcIjtcblx0XHRleHBsaWNpdFJvbGUgKz0gc2VsZWN0b3IuZ2V0RGVlcFJvbGUoXCJidXR0b25cIik7XG5cdFx0ZXhwbGljaXRSb2xlICs9IHNlbGVjdG9yLmdldERlZXBSb2xlKFwiaW5wdXRcIik7XG5cdFx0ZXhwbGljaXRSb2xlICs9IHNlbGVjdG9yLmdldERlZXBSb2xlKFwic3RhdHVzXCIpO1xuXHRcdGV4cGxpY2l0Um9sZSArPSBzZWxlY3Rvci5nZXREZWVwUm9sZShcInNlbGVjdFwiKTtcblxuXHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoKFxuXHRcdFx0dGhpcy5lbGVtZW50cy5xdWVyeVNlbGVjdG9yQWxsKGV4cGxpY2l0Um9sZSksIFxuXHRcdFx0bm9kZSA9PiByZXMucHVzaChlbGVtZW50cy5nZXQobm9kZSkgfHwgY3JlYXRlLm9uZShub2RlKSlcblx0XHQpO1xuXHRcdGNvbnNvbGUubG9nKHJlcywgZXhwbGljaXRSb2xlLCBzZWxlY3Rvcik7XG5cdFx0cmV0dXJuIHJlcztcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBGb3JtOyIsImltcG9ydCBmb2N1cyBmcm9tIFwiLi8uLi91dGlscy9tYW5hZ2luZ0ZvY3VzXCI7XG5pbXBvcnQgU2VsZWN0IGZyb20gXCIuL2Fic3RyYWN0L1NlbGVjdFwiO1xuXG5leHBvcnQgY29uc3Qgb3B0aW9ucyA9IHtcblx0cm9sZTogXCJsaXN0Ym94XCIsXG5cdHNlbGVjdG9yOiBcIltyb2xlPSdsaXN0Ym94J11cIixcblx0c2VsZWN0b3JzV2l0aEltcGxpY2l0Um9sZTogW1xuXHRcdFwiZGF0YWxpc3RcIixcblx0XHRcInNlbGVjdFttdWx0aXBsZV0sIHNlbGVjdFtzaXplXTpub3QoW3NpemU9JzAnXSk6bm90KFtzaXplPScxJ10pXCJcblx0XVxufTtcblxuLy8gZnVuY3Rpb24gY2xpY2tPbk9wdGlvbihldikge1xuLy8gXHRpZihldikgZXYucHJldmVudERlZmF1bHQoKTtcblxuLy8gXHR2YXIgY2xpY2tlZCA9IHRoaXMub3B0aW9ucy5maW5kKGkgPT4gaS5lbGVtZW50ID09IGV2LnRhcmdldCk7XG4vLyBcdGlmIChjbGlja2VkKSB7XG4vLyBcdFx0bGV0IG9sZCA9IGZvY3VzLmdldCh0aGlzLm9wdGlvbnMpO1xuLy8gXHRcdGZvY3VzLnJlbW92ZShvbGQpO1xuLy8gXHRcdGZvY3VzLmFkZChjbGlja2VkKTtcdFxuLy8gXHRcdHVwZGF0ZVNlbGVjdGVkKHRoaXMsIGNsaWNrZWQpO1xuLy8gXHR9XG4vLyB9XG5cbi8qKlxuICogXG4gKiBcbiAqICMjIyBLZXlib2FyZCBTdXBwb3J0XG4gKlxuICogIyMjIyBEZWZhdWx0XG4gKiB8IEtleSB8IEZ1bmN0aW9uIHxcbiAqIHwgLS0tIHwgLS0tLS0tLS0gfFxuICogfCBEb3duIEFycm93IHwgTW92ZXMgZm9jdXMgdG8gdGhlIG5leHQgb3B0aW9uIDxici8+IElmIG5vdCBtdWx0aXNlbGVjdGFibGUsIGl0IHNlbGVjdHMgdGhlIGZvY3VzZWQgb3B0aW9uLlxuICogfCBVcCBBcnJvdyBcdHwgTW92ZXMgZm9jdXMgdG8gdGhlIHByZXZpb3VzIG9wdGlvbiAgPGJyLz4gSWYgbm90IG11bHRpc2VsZWN0YWJsZSwgaXQgc2VsZWN0cyB0aGUgZm9jdXNlZCBvcHRpb24uXG4gKiB8IEhvbWUgXHRcdFx0fFx0TW92ZXMgZm9jdXMgdG8gdGhlIGZpcnN0IG9wdGlvbiAgPGJyLz4gSWYgbm90IG11bHRpc2VsZWN0YWJsZSwgaXQgc2VsZWN0cyB0aGUgZm9jdXNlZCBvcHRpb24uXG4gKiB8IEVuZCAgXHRcdFx0fFx0TW92ZXMgZm9jdXMgdG8gdGhlIGxhc3Qgb3B0aW9uICA8YnIvPiBJZiBub3QgbXVsdGlzZWxlY3RhYmxlLCBpdCBzZWxlY3RzIHRoZSBmb2N1c2VkIG9wdGlvbi5cbiAqIFxuICogIyMjIyBNdWx0aXBsZSBzZWxlY3Rpb25cbiAqIHwgS2V5IHwgRnVuY3Rpb24gfFxuICogfCAtLS0gfCAtLS0tLS0tLSB8XG4gKiB8IFNwYWNlXHRcdFx0XHRcdFx0XHRcdFx0fCBDaGFuZ2VzIHRoZSBzZWxlY3Rpb24gc3RhdGUgb2YgdGhlIGZvY3VzZWQgb3B0aW9uLlxuICogfCBTaGlmdCArIERvd24gQXJyb3cgXHRcdHwgTW92ZXMgZm9jdXMgdG8gYW5kIHNlbGVjdHMgdGhlIG5leHQgb3B0aW9uLlxuICogfCBTaGlmdCArIFVwIEFycm93IFx0XHRcdHwgTW92ZXMgZm9jdXMgdG8gYW5kIHNlbGVjdHMgdGhlIHByZXZpb3VzIG9wdGlvbi5cbiAqIHwgQ29udHJvbCArIFNoaWZ0ICsgSG9tZSB8XHRTZWxlY3RzIGZyb20gdGhlIGZvY3VzZWQgb3B0aW9uIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGxpc3QuXG4gKiB8IENvbnRyb2wgKyBTaGlmdCArIEVuZCAgfCBTZWxlY3RzIGZyb20gdGhlIGZvY3VzZWQgb3B0aW9uIHRvIHRoZSBlbmQgb2YgdGhlIGxpc3QuXG4gKiB8IENvbnRyb2wgKyBBIFx0ICAgICAgICAgIHwgU2VsZWN0cyBhbGwgb3B0aW9ucyBpbiB0aGUgbGlzdC4gSWYgYWxsIG9wdGlvbnMgYXJlIHNlbGVjdGVkLCB1bnNlbGVjdHMgYWxsIG9wdGlvbnMuXG4gKiBcbiAqIEBleHRlbmRzIFJvbGV0eXBlXG4gKiBAZmlyZXMgTGlzdGJveCNjaGFuZ2VcbiAqIEBmaXJlcyBMaXN0Ym94I2lucHV0XG4gKi9cbmNsYXNzIExpc3Rib3ggZXh0ZW5kcyBTZWxlY3Qge1xuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0c3VwZXIoLi4uYXJncyk7XG5cdFx0Ly8gdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGlja09uT3B0aW9uLmJpbmQodGhpcykpO1xuXG5cdFx0Ly8gdGhpcy5hZGRLZXlMaXN0ZW5lcihcImVudGVyXCIsIGNsaWNrT25PcHRpb24uYmluZCh0aGlzKSk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGlzdGJveDsiLCJpbXBvcnQgYm9vbGVhbiBmcm9tIFwiLi8uLi90eXBlL2Jvb2xlYW5cIjtcbmltcG9ydCBnZXRBY3RpdmUgZnJvbSBcIi4vLi4vdXRpbHMvZ2V0QWN0aXZlXCI7XG5pbXBvcnQgSW5wdXQgZnJvbSBcIi4vYWJzdHJhY3QvSW5wdXRcIjtcblxuLyoqXG4gKiBAZXh0ZW5kcyBJbnB1dFxuICovXG5jbGFzcyBPcHRpb24gZXh0ZW5kcyBJbnB1dCB7XG5cblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdHN1cGVyKC4uLmFyZ3MpO1xuXG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25DbGljay5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLmFkZExpc3RlbmVyKFwia2V5XCIsIHRoaXMub25DbGljay5iaW5kKHRoaXMpLCB7a2V5OiBcImVudGVyXCIsIHRhcmdldDogZG9jdW1lbnR9KTtcblx0XHR0aGlzLmFkZExpc3RlbmVyKFwia2V5XCIsIHRoaXMub25DbGljay5iaW5kKHRoaXMpLCB7a2V5OiBcInNwYWNlXCIsIHRhcmdldDogZG9jdW1lbnR9KTtcblx0XHQvLyB0aGlzLmFkZEtleUxpc3RlbmVyKFwiRW50ZXJcIiwgc2VsZWN0SXRlbS5iaW5kKHRoaXMpKTtcblx0fVxuXG5cdG9uQ2xpY2soZXYpIHtcblx0XHRpZih0eXBlb2Ygc3VwZXIub25DbGljayA9PSBcImZ1bmN0aW9uXCIpIHN1cGVyLm9uQ2xpY2soZXYpO1xuXHRcdGlmKGV2KSBldi5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0aWYgKHRoaXMgPT0gZ2V0QWN0aXZlKCkpIHtcblx0XHRcdHRoaXMuc2VsZWN0ZWQgPSBib29sZWFuLnRvZ2dsZSh0aGlzLnNlbGVjdGVkKTtcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgT3B0aW9uOyIsIi8vIHZhciBvYmplY3RQYXRoID0gcmVxdWlyZShcIm9iamVjdC1wYXRoXCIpO1xuaW1wb3J0IFJhbmdlIGZyb20gXCIuL2Fic3RyYWN0L1JhbmdlLmpzXCI7XG5cbmZ1bmN0aW9uIGNhbGNWYWx1ZU9mVHJhY2tQb3MocG9zLCB0cmFjaywgdGh1bWIsIG1pbiwgbWF4LCBzdGVwLCBvcmllbnRhdGlvbikge1xuXHRsZXQgcG9zaXRpb25LZXkgPSBvcmllbnRhdGlvbiA9PSBcInZlcnRpY2FsXCIgPyBcInlcIiA6IFwieFwiO1xuXHRsZXQgcmFuZ2UgPSAobWF4IC0gbWluKSAvIHN0ZXA7XG5cdC8vIHRoZSBmdWxsIHVzYWJsZSBsZW5ndGggb2YgdGhlIHRyYWNrXG5cdGxldCB0cmFja1NpemUgPSBnZXRUcmFja1NpemUodHJhY2ssIHRodW1iLCBvcmllbnRhdGlvbik7XG5cdC8vIGhvdyBtYW55IHBpeGVscyAgc3BhbiBmb3Igb25lIHN0ZXAgY2hhbmdlXG5cdGxldCBweFBlclN0ZXAgPSB0cmFja1NpemUgLyByYW5nZTtcblxuXHQvLyBib3VuZGluZyBib3ggb2YgdGhlIHRyYWNrXG5cdHZhciB0cmFja0Nvb3IgPSB0cmFjay5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0Ly8gb2Zmc2V0IHdpdGhvdXQgdHJhY2sgbGltaXRzXG5cdGxldCBvZmZzZXQgPSBwb3MgLSB0cmFja0Nvb3JbcG9zaXRpb25LZXldIC0gdGh1bWIuY2xpZW50V2lkdGggLyAyO1xuXG5cdC8vIHVwZGF0ZSBvZmZzZXQgdG8gdGhlIHRyYWNrIGxpbWl0cyBpZiBuZWVkZWRcblx0aWYob2Zmc2V0IDwgMCkge1xuXHRcdG9mZnNldCA9IDA7XG5cdH0gZWxzZSBpZihvZmZzZXQgPiB0cmFja1NpemUpe1xuXHRcdG9mZnNldCA9IHRyYWNrU2l6ZTtcblx0fVxuXG5cdC8vIHJvdW5kIHRoZSB2YWx1ZSB0byBuZWFyZXN0IGluY3JlbWVudFxuXHRyZXR1cm4gTWF0aC5yb3VuZChvZmZzZXQgLyBweFBlclN0ZXApICogc3RlcCArIG1pbjtcbn1cblxuZnVuY3Rpb24gZ2V0VHJhY2tTaXplKHRyYWNrLCB0aHVtYiwgb3JpZW50YXRpb24pIHtcblx0aWYob3JpZW50YXRpb24gPT0gXCJ2ZXJ0aWNhbFwiKSB7XG5cdFx0cmV0dXJuIHRyYWNrLmNsaWVudEhlaWdodCAtIHRodW1iLmNsaWVudEhlaWdodDtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gdHJhY2suY2xpZW50V2lkdGggLSB0aHVtYi5jbGllbnRXaWR0aDtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVQb3NpdGlvbih2YWx1ZSwgdHJhY2ssIHRodW1iLCBtaW4sIG1heCwgb3JpZW50YXRpb24pIHtcblx0bGV0IHN0eWxlS2V5ID0gb3JpZW50YXRpb24gPT0gXCJ2ZXJ0aWNhbFwiID8gXCJ0b3BcIiA6IFwibGVmdFwiO1xuXHRsZXQgcmFuZ2UgPSBtYXggLSBtaW47XG5cdGxldCBweFBlclN0ZXAgPSBnZXRUcmFja1NpemUodHJhY2ssIHRodW1iLCBvcmllbnRhdGlvbikgLyByYW5nZTtcblx0dGh1bWIuc3R5bGVbc3R5bGVLZXldID0gcHhQZXJTdGVwICogKHZhbHVlIC0gbWluKSArIFwicHhcIjtcbn1cblxuLyoqXG4gKiBgc2xpZGVyYCBlbGVtZW50cyBsZXQgdGhlIHVzZXIgc3BlY2lmeSBhIG51bWVyaWMgdmFsdWUgd2hpY2ggbXVzdCBiZSBubyBsZXNzXG4gKiB0aGFuIGEgZ2l2ZW4gdmFsdWUsIGFuZCBubyBtb3JlIHRoYW4gYW5vdGhlciBnaXZlbiB2YWx1ZS4gVGhlIHByZWNpc2UgdmFsdWUsXG4gKiBob3dldmVyLCBpcyBub3QgY29uc2lkZXJlZCBpbXBvcnRhbnQuIFRoaXMgaXMgdHlwaWNhbGx5IHJlcHJlc2VudGVkIHVzaW5nIGFcbiAqIHNsaWRlciBvciBkaWFsIGNvbnRyb2wgcmF0aGVyIHRoYW4gYSB0ZXh0IGVudHJ5IGJveCBsaWtlIHRoZSBcIm51bWJlclwiIGlucHV0XG4gKiB0eXBlLiBCZWNhdXNlIHRoaXMga2luZCBvZiB3aWRnZXQgaXMgaW1wcmVjaXNlLCBpdCBzaG91bGRuJ3QgdHlwaWNhbGx5IGJlXG4gKiB1c2VkIHVubGVzcyB0aGUgY29udHJvbCdzIGV4YWN0IHZhbHVlIGlzbid0IGltcG9ydGFudC5cbiAqXG4gKlxuICpcbiAqIEBjbGFzc1xuICogQGV4dGVuZHMgUmFuZ2VcbiAqXG4gKiBAZmlyZXMgY2hhbmdlZFxuICogQGZpcmVzIGlucHV0XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBcdFx0XHRcdGVsZW1lbnQgdG8gZGVyaXZlIGluZm9ybWF0aW9uIG5hbWVGcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIFx0XHRcdFx0XHRcdG9wdGlvbmFsIG9wdGlvbnNcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFtvcHRpb25zLnNsaWRlci50cmFja11cbiAqIFx0VGhlIGVsZW1lbnQgdGhhdCByZXNlbWJsZXMgdGhlIHRyYWNrLCBkZWZhdWx0cyB0byB0aGUgZWxlbWVudHMgcGFyZW50XG4gKiBAcGFyYW0ge051bWJlcnxcImFueVwifSBbb3B0aW9ucy5zdGVwXSBcdGluY3JlYXNlL2RlY3JlYXNlIGFtb3VudFxuICogQHJldHVybiB7U2xpZGVyfSB0aGlzQXJnXG4gKlxuICogQHRvZG8gYWRkIHN1cHBvcnQgZm9yIFwiYW55XCJcbiAqIEB0b2RvIGFkZCBldmVudHNcbiAqXG4gKiBAZXhhbXBsZVxuICogPGRpdiBjbGFzcz1cInRyYWNrXCI+XG4gKiAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHJvbGU9XCJzbGlkZXJcIiBhcmlhLWxhYmVsPVwic2xpZGVyXCIgLz48YnV0dG9uPlxuICogPC9kaXY+XG4gKi9cbmNsYXNzIFNsaWRlciBleHRlbmRzIFJhbmdlIHtcblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdHN1cGVyKC4uLmFyZ3MpO1xuXG5cdFx0Ly8gcmVnaXN0ZXIgY3VzdG9tc1xuXHRcdHRoaXMuXy5yZWdpc3RlckN1c3RvbUVsZW1lbnQoXCJzbGlkZXIudHJhY2tcIiwgdGhpcy5lbGVtZW50LnBhcmVudE5vZGUpO1xuXHRcdHRoaXMuXy5yZWdpc3RlckN1c3RvbVZhbHVlKFwic3RlcFwiLCAxKTtcblxuXHRcdC8vIHNldCBkZWZhdWx0c1xuXHRcdGlmKG51bGwgPT09IHRoaXMub3JpZW50YXRpb24pIHRoaXMub3JpZW50YXRpb24gPSBcImhvcml6b250YWxcIjtcblx0XHRpZihudWxsID09PSB0aGlzLnZhbHVlTWluKSB7XG5cdFx0XHQvKipcblx0XHRcdCAqIEBkZWZhdWx0IFswXVxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnZhbHVlTWluID0gMDtcblx0XHR9XG5cdFx0aWYobnVsbCA9PT0gdGhpcy52YWx1ZU1heCkgdGhpcy52YWx1ZU1heCA9IDA7XG5cdFx0aWYobnVsbCA9PT0gdGhpcy52YWx1ZU5vdyAmJiB0aGlzLnZhbHVlTWF4IDwgdGhpcy52YWx1ZU1pbikge1xuXHRcdFx0dGhpcy52YWx1ZU5vdyA9IHRoaXMudmFsdWVNaW47XG5cdFx0fSBlbHNlIGlmKG51bGwgPT09IHRoaXMudmFsdWVOb3cpIHtcblx0XHRcdHRoaXMudmFsdWVOb3cgPSB0aGlzLnZhbHVlTWluICsgKHRoaXMudmFsdWVNYXggLSB0aGlzLnZhbHVlTWluKS8yO1xuXHRcdH1cblxuXHRcdHRoaXMuX3VuVHJhY2tNb3VzZUJpbmRlZCA9IHRoaXMuX3VuVHJhY2tNb3VzZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuX3VuVHJhY2tUb3VjaEJpbmRlZCA9IHRoaXMuX3VuVHJhY2tUb3VjaC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuX29uRHJhZyA9IHRoaXMub25EcmFnLmJpbmQodGhpcyk7XG5cblx0XHQvLyB0b2RvOiBhbGxvdyBhdXRvbWF0aWNhbGx5IHNldHRpbmcgdmFsdWVUZXh0IHdpdGggc29tZSBzdWdhclxuXG5cdFx0dGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5fb25Nb3VzZURvd24uYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMuX29uVG91Y2hTdGFydC5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLl8uc2xpZGVyLnRyYWNrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uVHJhY2tDbGljay5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLmFkZEtleUxpc3RlbmVyKFwicmlnaHRcIiwgdGhpcy5zdGVwVXAuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5hZGRLZXlMaXN0ZW5lcihcInVwXCIsIHRoaXMuc3RlcFVwLmJpbmQodGhpcykpO1xuXHRcdHRoaXMuYWRkS2V5TGlzdGVuZXIoXCJsZWZ0XCIsIHRoaXMuc3RlcERvd24uYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5hZGRLZXlMaXN0ZW5lcihcImRvd25cIiwgdGhpcy5zdGVwRG93bi5iaW5kKHRoaXMpKTtcblxuXHRcdHVwZGF0ZVBvc2l0aW9uKHRoaXMudmFsdWVOb3csIHRoaXMuXy5zbGlkZXIudHJhY2ssIHRoaXMuZWxlbWVudCwgdGhpcy52YWx1ZU1pbiwgdGhpcy52YWx1ZU1heCwgdGhpcy5vcmllbnRhdGlvbik7XG5cdH1cblxuXHRfb25Nb3VzZURvd24oKSB7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLl9vbkRyYWcpO1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX3VuVHJhY2tNb3VzZUJpbmRlZCk7XG5cdH1cblx0X29uVG91Y2hTdGFydCgpIHtcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIHRoaXMuX29uRHJhZyk7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHRoaXMuX3VuVHJhY2tUb3VjaEJpbmRlZCk7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoY2FuY2VsXCIsIHRoaXMuX3VuVHJhY2tUb3VjaEJpbmRlZCk7XG5cdH1cblx0X3VuVHJhY2tNb3VzZSgpIHtcblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMuX29uRHJhZyk7XG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5fdW5UcmFja01vdXNlQmluZGVkKTtcblx0fVxuXHRfdW5UcmFja1RvdWNoKCkge1xuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgdGhpcy5fb25EcmFnKTtcblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgdGhpcy5fdW5UcmFja01vdXNlKTtcblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hjYW5jZWxcIiwgdGhpcy5fdW5UcmFja01vdXNlQmluZGVkKTtcblx0fVxuXG5cdG9uRHJhZyhldikge1xuXHRcdGV2LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0bGV0IHBvcztcblx0XHRsZXQgcG9zaXRpb25LZXkgPSB0aGlzLm9yaWVudGF0aW9uID09IFwidmVydGljYWxcIiA/IFwiY2xpZW50WVwiIDogXCJjbGllbnRYXCI7XG5cdFx0aWYoZXYuY2hhbmdlZFRvdWNoZXMpIHtcblx0XHRcdHBvcyA9IGV2LmNoYW5nZWRUb3VjaGVzWzBdW3Bvc2l0aW9uS2V5XTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cG9zID0gZXZbcG9zaXRpb25LZXldO1xuXHRcdH1cblx0XHR0aGlzLnZhbHVlTm93ID0gY2FsY1ZhbHVlT2ZUcmFja1Bvcyhcblx0XHRcdHBvcywgdGhpcy5fLnNsaWRlci50cmFjaywgdGhpcy5lbGVtZW50LFxuXHRcdFx0dGhpcy52YWx1ZU1pbiwgdGhpcy52YWx1ZU1heCwgdGhpcy5fLnN0ZXAsIHRoaXMub3JpZW50YXRpb25cblx0XHQpO1xuXHR9XG5cblx0b25UcmFja0NsaWNrKGV2KSB7XG5cdFx0dGhpcy5vbkRyYWcoZXYpO1xuXHR9XG5cblx0Z2V0IHZhbHVlTm93KCkgeyByZXR1cm4gc3VwZXIudmFsdWVOb3c7IH1cblx0c2V0IHZhbHVlTm93KHZhbCkge1xuXHRcdGlmKCF0aGlzLmRpc2FibGVkKXtcblx0XHRcdHN1cGVyLnZhbHVlTm93ID0gdmFsO1xuXHRcdFx0dXBkYXRlUG9zaXRpb24odmFsLCB0aGlzLl8uc2xpZGVyLnRyYWNrLCB0aGlzLmVsZW1lbnQsIHRoaXMudmFsdWVNaW4sIHRoaXMudmFsdWVNYXgsIHRoaXMub3JpZW50YXRpb24pO1xuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBTbGlkZXI7IiwiaW1wb3J0IG1peCBmcm9tIFwiQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW5cIjtcbmltcG9ydCBSYW5nZSBmcm9tIFwiLi9hYnN0cmFjdC9SYW5nZVwiO1xuXG5leHBvcnQgY29uc3Qgb3B0aW9ucyA9IHtcblx0c2VsZWN0b3I6IFwiW3JvbGU9J3NwaW5idXR0b24nXVwiLFxuXHRyb2xlOiBcInNwaW5idXR0b25cIlxufTtcblxuLyoqXG4gKiBBIGlucHV0IGZpZWxkIHdpdGggMiBidXR0b24gdG8gaW5jcmVhc2Ugb3IgZGVjcmVhc2UgdGhlIG51bWJlcmljYWwgdmFsdWVcbiAqIEBleHRlbmRzIFJhbmdlXG4gKlxuICogQHNlZSB7QGxpbmsgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvaW5wdXQuaHRtbCNudW1iZXItc3RhdGUtKHR5cGU9bnVtYmVyKX1cbiAqL1xuY2xhc3MgU3BpbmJ1dHRvbiBleHRlbmRzIFJhbmdlIHtcblx0Y29uc3RydWN0b3IoZWwsIG9wdGlvbnMpIHtcblx0XHRzdXBlcihlbCwgb3B0aW9ucyk7XG5cblx0XHQvLyByZWdpc3RlciBjdXN0b20gZWxlbWVudHNcblx0XHQvKipcblx0XHQqIEBuYW1lIFNwaW5idXR0b24jX1xuXHRcdCogQHR5cGUge09iamVjdH1cblx0XHQqIEBwcm9wIHtIVE1MRWxlbWVudH0gW3NwaW5idXR0b24udXBdXG5cdFx0KiBAcHJvcCB7SFRNTEVsZW1lbnR9IFtzcGluYnV0dG9uLmRvd25dXG5cdFx0Ki9cblx0XHR0aGlzLl8ucmVnaXN0ZXJDdXN0b21FbGVtZW50KFwic3BpbmJ1dHRvbi51cFwiKTtcblx0XHR0aGlzLl8ucmVnaXN0ZXJDdXN0b21FbGVtZW50KFwic3BpbmJ1dHRvbi5kb3duXCIpO1xuXHRcdHRoaXMuXy5yZWdpc3RlckN1c3RvbVZhbHVlKFwic3RlcFwiLCAxKTtcblxuXHRcdC8vIHNldCBkZWZhdWx0c1xuXHRcdC8qKlxuXHRcdCogQG5hbWUgU3BpbmJ1dHRvbiN2YWx1ZU5vd1xuXHRcdCogQHR5cGUge051bWJlcn1cblx0XHQqIEBkZWZhdWx0IFswXVxuXHRcdCovXG5cdFx0aWYobnVsbCA9PT0gdGhpcy52YWx1ZU5vdykgdGhpcy52YWx1ZU5vdyA9IDA7XG5cblx0XHQvLyB0b2RvOiBhbGxvdyBhdXRvbWF0aWNhbGx5IHNldHRpbmcgdmFsdWVUZXh0IHdpdGggc29tZSBzdWdhclxuXG5cdFx0dGhpcy5fLnNwaW5idXR0b24udXAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuc3RlcFVwLmJpbmQodGhpcykpO1xuXHRcdHRoaXMuXy5zcGluYnV0dG9uLmRvd24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuc3RlcERvd24uYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5hZGRLZXlMaXN0ZW5lcihcInVwXCIsIHRoaXMuc3RlcFVwLmJpbmQodGhpcykpO1xuXHRcdHRoaXMuYWRkS2V5TGlzdGVuZXIoXCJkb3duXCIsIHRoaXMuc3RlcERvd24uYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5lbGVtZW50LnZhbHVlID0gdGhpcy52YWx1ZU5vdztcblx0fVxuXG5cdGdldCB2YWx1ZU5vdygpIHsgcmV0dXJuIHN1cGVyLnZhbHVlTm93OyB9XG5cdHNldCB2YWx1ZU5vdyh2YWwpIHtcblx0XHRzdXBlci52YWx1ZU5vdyA9IHZhbDtcblx0XHR0aGlzLmVsZW1lbnQudmFsdWUgPSB2YWw7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3BpbmJ1dHRvbjsiLCJpbXBvcnQgZWxlbWVudHMgZnJvbSBcIi4vLi4vdXRpbHMvZWxlbWVudHNcIjtcbmltcG9ydCBSb2xldHlwZSBmcm9tIFwiLi9hYnN0cmFjdC9Sb2xldHlwZVwiO1xuaW1wb3J0IG1peCBmcm9tIFwiQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW5cIjtcblxuaW1wb3J0IEFyaWFTZWxlY3RlZCBmcm9tIFwiLi8uLi9hdHRyaWJ1dGVzL2FyaWEtc2VsZWN0ZWRcIjtcblxuZXhwb3J0IGNvbnN0IG9wdGlvbnMgPSB7XG5cdG93bmVkOiBcInRhYmxpc3RcIiwgLy8gcGFyZW50IHJvbGVcblx0c2VsZWN0b3I6IFwiW3JvbGU9J3RhYiddXCIsXG5cdHJvbGU6IFwidGFiXCJcbn07XG5cbmNsYXNzIFRhYiBleHRlbmRzIG1peChSb2xldHlwZSkud2l0aChBcmlhU2VsZWN0ZWQpIHtcblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdHN1cGVyKC4uLmFyZ3MpO1xuXHR9XG5cblx0b25TZWxlY3QoZXYpIHtcblx0XHRsZXQgdGFibGlzdCA9IGVsZW1lbnRzLmdldFBhcmVudCh0aGlzLCBvcHRpb25zLm93bmVkLCBvcHRpb25zLnJvbGUpO1xuXHRcdGlmKCF0YWJsaXN0KSByZXR1cm4gZmFsc2U7XG5cdFx0XG5cdFx0ZXYucHJldmVudERlZmF1bHQoKTtcblx0XHRcblx0XHRsZXQgdGFicyA9IHRhYmxpc3QuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKG9wdGlvbnMuc2VsZWN0b3IgKyBcIlthcmlhLXNlbGVjdGVkPSd0cnVlJ11cIik7XG5cdFx0W10uZm9yRWFjaC5jYWxsKHRhYnMsIChpdGVtKSA9PiB7XG5cdFx0XHRsZXQgaW5zdCA9IGVsZW1lbnRzLmdldChpdGVtKTtcblx0XHRcdGluc3Quc2VsZWN0ZWQgPSBmYWxzZTtcblx0XHRcdGluc3QuY29udHJvbHNbMF0uZWxlbWVudC5oaWRkZW4gPSB0cnVlO1xuXHRcdH0pO1xuXG5cdFx0aWYgKHR5cGVvZiBzdXBlci5vblNlbGVjdCA9PSBcImZ1bmN0aW9uXCIpIHN1cGVyLm9uU2VsZWN0KGV2KTtcblx0XHRcblx0XHR0aGlzLmNvbnRyb2xzWzBdLmVsZW1lbnQuaGlkZGVuID0gZmFsc2U7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFiOyIsImltcG9ydCBlbGVtZW50cyBmcm9tIFwiLi8uLi91dGlscy9lbGVtZW50cy5qc1wiO1xuaW1wb3J0IENvbXBvc2l0ZSBmcm9tIFwiLi9hYnN0cmFjdC9Db21wb3NpdGVcIjtcblxuY2xhc3MgVGFibGlzdCBleHRlbmRzIENvbXBvc2l0ZSB7XG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRzdXBlciguLi5hcmdzKTtcblxuXHRcdHRoaXMuYWRkS2V5TGlzdGVuZXIoXCJsZWZ0XCIsIHRoaXMubW92ZVRvUHJldi5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLmFkZEtleUxpc3RlbmVyKFwicmlnaHRcIiwgdGhpcy5tb3ZlVG9OZXh0LmJpbmQodGhpcykpO1xuXHRcdHRoaXMuYWRkS2V5TGlzdGVuZXIoXCJob21lXCIsIHRoaXMubW92ZVRvU3RhcnQuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5hZGRLZXlMaXN0ZW5lcihcImVuZFwiLCB0aGlzLm1vdmVUb0VuZC5iaW5kKHRoaXMpKTtcblx0fVxuXG5cdG1vdmVUb1ByZXYoZXYpIHtcblx0XHRsZXQgcHJldkluc3RhbmNlID0gZWxlbWVudHMuZ2V0UHJldihlbGVtZW50cy5nZXQoZXYudGFyZ2V0KSwgdGhpcywgb3B0aW9ucy5vd25zKTtcblx0XHRwcmV2SW5zdGFuY2UuZWxlbWVudC5mb2N1cygpO1xuXHRcdGV2LnByZXZlbnREZWZhdWx0KCk7XG5cdH1cblx0bW92ZVRvTmV4dChldikge1xuXHRcdGxldCBuZXh0SW5zdGFuY2UgPSBlbGVtZW50cy5nZXROZXh0KGVsZW1lbnRzLmdldChldi50YXJnZXQpLCB0aGlzLCBvcHRpb25zLm93bnMpO1xuXHRcdG5leHRJbnN0YW5jZS5lbGVtZW50LmZvY3VzKCk7XG5cdFx0ZXYucHJldmVudERlZmF1bHQoKTtcblx0fVxuXG5cdG1vdmVUb1N0YXJ0KGV2KSB7XG5cdFx0bGV0IGZpcnN0SW5zdGFuY2UgPSBlbGVtZW50cy5nZXRTdGFydChlbGVtZW50cy5nZXQoZXYudGFyZ2V0KSwgdGhpcywgb3B0aW9ucy5vd25zKTtcblx0XHRmaXJzdEluc3RhbmNlLmVsZW1lbnQuZm9jdXMoKTtcblx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xuXHR9XG5cblx0bW92ZVRvRW5kKGV2KSB7XG5cdFx0bGV0IGxhc3RJbnN0YW5jZSA9IGVsZW1lbnRzLmdldEVuZChlbGVtZW50cy5nZXQoZXYudGFyZ2V0KSwgdGhpcywgb3B0aW9ucy5vd25zKTtcblx0XHRsYXN0SW5zdGFuY2UuZWxlbWVudC5mb2N1cygpO1xuXHRcdGV2LnByZXZlbnREZWZhdWx0KCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFibGlzdDsiLCJpbXBvcnQgU2VjdGlvbiBmcm9tIFwiLi9hYnN0cmFjdC9TZWN0aW9uXCI7XG5cbmNsYXNzIFRhYnBhbmVsIGV4dGVuZHMgU2VjdGlvbiB7IH1cblxuZXhwb3J0IGRlZmF1bHQgVGFicGFuZWw7IiwiaW1wb3J0IElucHV0IGZyb20gXCIuL2Fic3RyYWN0L0lucHV0XCI7XG5cbmV4cG9ydCBjb25zdCBvcHRpb25zID0ge1xuXHRyb2xlOiBcInRleHRib3hcIixcblx0c2VsZWN0b3I6IFwiW3JvbGU9J3RleHRib3gnXVwiLFxuXHRzZWxlY3RvcnNXaXRoSW1wbGljaXRSb2xlOiBbXG5cdFx0XCJpbnB1dFt0eXBlPSdlbWFpbCddOm5vdChbbGlzdF0pXCIsXG5cdFx0XCJpbnB1dFt0eXBlPSd0ZWwnXTpub3QoW2xpc3RdKVwiLFxuXHRcdFwiaW5wdXRbdHlwZT0ndGV4dCddOm5vdChbbGlzdF0pXCIsXG5cdFx0XCJpbnB1dFt0eXBlPSd1cmwnXTpub3QoW2xpc3RdKVwiLFxuXHRcdFwidGV4dGFyZWFcIlxuXHRdXG59O1xuXG4vKipcbiAqIEB0b2RvIEFkZCBvcHRpb25zIHRvIGtlZXAgb3IgcmVtb3ZlIHBhc3RlZCBzdHlsaW5nXG4gKi9cbmNsYXNzIFRleHRib3ggZXh0ZW5kcyBJbnB1dCB7XG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3Mpe1xuXHRcdHN1cGVyKC4uLmFyZ3MpO1xuXHRcdFxuXHRcdGlmKCF0aGlzLm11bHRpbGluZSl7XG5cdFx0XHR0aGlzLmFkZEtleUxpc3RlbmVyKFwiZW50ZXJcIiwgdGhpcy5fb25FbnRlci5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwicGFzdGVcIiwgdGhpcy5fb25QYXN0ZS5iaW5kKHRoaXMpKTtcblx0XHRcdC8vIHRoaXMuYWRkTXV0YXRpb25MaXN0ZW5lcigpXG5cdFx0fVxuXHR9XG5cblx0X29uRW50ZXIoZXYpe1xuXHRcdGV2LnByZXZlbnREZWZhdWx0KCk7XG5cdH1cblxuXHRfb25QYXN0ZShldil7XG5cdFx0ZXYucHJldmVudERlZmF1bHQoKTtcblx0XHRsZXQgc3RyO1xuXHRcdGxldCBkYXRhID0gZXYuY2xpcGJvYXJkRGF0YS5nZXREYXRhKFwidGV4dC9wbGFpblwiKS5yZXBsYWNlKC9cXHI/XFxufFxcci9nLCBcIlwiKTtcblx0XHRsZXQgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuXG5cdFx0dmFyIGMgPSB0aGlzLmVsZW1lbnQuY2hpbGROb2Rlcztcblx0XHR2YXIgYSA9IHNlbC5hbmNob3JOb2RlO1xuXG5cdFx0aWYgKGMgJiYgYSAmJiBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGMsIGEpID4gLTEpIHtcblx0XHRcdHN0ciA9IFt0aGlzLmVsZW1lbnQuaW5uZXJUZXh0LnNsaWNlKDAsIHNlbC5hbmNob3JPZmZzZXQpLCBkYXRhLCB0aGlzLmVsZW1lbnQuaW5uZXJUZXh0LnNsaWNlKHNlbC5mb2N1c09mZnNldCldO1xuXHRcdFx0c3RyID0gc3RyLmpvaW4oXCJcIik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0ciA9IHRoaXMuZWxlbWVudC5pbm5lclRleHQgKyBkYXRhO1xuXHRcdH1cblxuXHRcdHRoaXMuZWxlbWVudC5pbm5lclRleHQgPSBzdHI7XG5cdH1cblxuXHRfb25DaGlsZExpc3RNdXRhdGlvbihtdXRhdGlvbikge1xuXHRcdGlmICghdGhpcy5tdWx0aWxpbmUpIHtcblx0XHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwobXV0YXRpb24uYWRkZWROb2RlcywgbiA9PiB7XG5cdFx0XHRcdGlmIChuLm5vZGVOYW1lICE9PSBcIiN0ZXh0XCIpIHtcblx0XHRcdFx0XHR2YXIgbmV3Q2hpbGQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShuLmlubmVyVGV4dCk7XG5cdFx0XHRcdFx0bi5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdDaGlsZCwgbik7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBUZXh0Ym94OyIsImltcG9ydCBXaWRnZXQgZnJvbSBcIi4vV2lkZ2V0XCI7XG5cbi8qKlxuICogQGV4dGVuZHMgV2lkZ2V0XG4gKi9cbmNsYXNzIENvbW1hbmQgZXh0ZW5kcyBXaWRnZXQge31cblxuZXhwb3J0IGRlZmF1bHQgQ29tbWFuZDsiLCJpbXBvcnQgV2lkZ2V0IGZyb20gXCIuL1dpZGdldFwiO1xuXG4vKipcbiAqIEBleHRlbmRzIFdpZGdldFxuICovXG5jbGFzcyBDb21wb3NpdGUgZXh0ZW5kcyBXaWRnZXQgeyB9XG5cbmV4cG9ydCBkZWZhdWx0IENvbXBvc2l0ZTsiLCJpbXBvcnQgV2lkZ2V0IGZyb20gXCIuL1dpZGdldFwiO1xuXG4vKipcbiAqIEBleHRlbmRzIFdpZGdldFxuICovXG5jbGFzcyBJbnB1dCBleHRlbmRzIFdpZGdldCB7IH1cblxuZXhwb3J0IGRlZmF1bHQgSW5wdXQ7XG4iLCJpbXBvcnQgU2VjdGlvbiBmcm9tIFwiLi9TZWN0aW9uXCI7XG5cbi8qKlxuICogQGV4dGVuZHMgU2VjdGlvblxuICovXG5jbGFzcyBMYW5kbWFyayBleHRlbmRzIFNlY3Rpb24geyB9XG5cbmV4cG9ydCBkZWZhdWx0IExhbmRtYXJrOyIsImltcG9ydCBXaWRnZXQgZnJvbSBcIi4vV2lkZ2V0XCI7XG5cbi8qKlxuICogKiooQWJzdHJhY3Qgcm9sZSkgU0hPVUxEIE5PVCBVU0VEIElOIFRIRSBET00qKiBcbiAqIEFuIGlucHV0IHJlcHJlc2VudGluZyBhIHJhbmdlIG9mIHZhbHVlcyB0aGF0IGNhbiBiZSBzZXQgYnkgdGhlIHVzZXIuXG4gKlxuICogQGNsYXNzXG4gKiBAZXh0ZW5kcyBXaWRnZXRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgXHRcdFx0XHRlbGVtZW50IHRvIGRlcml2ZSBpbmZvcm1hdGlvbiBuYW1lRnJvbVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBcdFx0XHRcdFx0XHRvcHRpb25hbCBvcHRpb25zXG4gKiBAcGFyYW0ge051bWJlcnxcImFueVwifSBvcHRpb25zLnN0ZXAgXHRpbmNyZWFzZS9kZWNyZWFzZSB2YWx1ZSB1c2VkXG4gKiBAcmV0dXJuIHtSYW5nZX0gdGhpc1xuICogQHNlZSB7QGxpbmsgaHR0cHM6Ly93M2MuZ2l0aHViLmlvL2FyaWEvYXJpYS9hcmlhLmh0bWwjcmFuZ2V9XG4gKi9cbmNsYXNzIFJhbmdlIGV4dGVuZHMgV2lkZ2V0IHtcblx0Y29uc3RydWN0b3IoLi4uYXJnKSB7XG5cdFx0c3VwZXIoLi4uYXJnKTtcblxuXHRcdC8qKlxuXHQgICAqIEBuYW1lIFJhbmdlI19cblx0XHQgKiBAdHlwZSB7T2JqZWN0fVxuXHRcdCAqIEBwcm9wIHtOdW1iZXJ9IFtzdGVwPTFdXG5cdCAgICovXG5cblx0XHR0aGlzLl8ucmVnaXN0ZXJDdXN0b21WYWx1ZShcInN0ZXBcIiwgMSk7XG5cdH1cblxuXHQvKipcblx0ICogUGFzc3Ryb3VnaCBvZiBhbiBzdHJpbmdpZmllZCBgdmFsdWVOb3dgXG5cdCAqIEB0eXBlIHtTdHJpbmd9XG5cdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI3ZhbHVlTm93fVxuXHQgKi9cblx0Z2V0IHZhbHVlKCkgeyByZXR1cm4gdGhpcy52YWx1ZU5vdy50b1N0cmluZygpO31cblx0c2V0IHZhbHVlKHZhbCkgeyB0aGlzLnZhbHVlTm93ID0gdmFsOyB9XG5cblx0LyoqXG5cdCAqIFByb3h5IG9mIHRoZSBgdmFsdWVOb3dgIHZhbHVlXG5cdCAqIEB0eXBlIHtOdW1iZXJ9XG5cdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI3ZhbHVlTm93fVxuXHQgKi9cblx0Z2V0IHZhbHVlQXNOdW1iZXIoKSB7IHJldHVybiB0aGlzLnZhbHVlTm93OyB9XG5cdHNldCB2YWx1ZUFzTnVtYmVyKHZhbCkgeyB0aGlzLnZhbHVlTm93ID0gdmFsOyB9XG5cblx0LyoqXG4gICAqIERlY3JlYXNlIHRoZSB2YWx1ZSB3aXRoIHRoZSBhbW91bnQgb2YgMSBzdGVwXG4gICAqIEBwYXJhbSAge0V2ZW50fSBldiBFdmVudCB3aGVuIHRyaWdnZXJlZCB0aHJvdWdoIGFuIGVsZW1lbnRzXG4gICAqL1xuXHRzdGVwRG93bihldikge1xuXHRcdGlmKHRoaXMuZGlzYWJsZWQpIHJldHVybjtcblx0XHRpZihldikgZXYucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGlmKHRoaXMudmFsdWVNaW4gPT09IG51bGwgfHwgdGhpcy52YWx1ZU5vdyA+IHRoaXMudmFsdWVNaW4pIHtcblx0XHRcdHRoaXMudmFsdWVOb3cgPSB0aGlzLnZhbHVlTm93IC0gdGhpcy5fLnN0ZXA7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG4gICAqIEluY3JlYXNlIHRoZSB2YWx1ZSB3aXRoIHRoZSBhbW91bnQgb2YgMSBzdGVwXG4gICAqIEBwYWNrYWdlXG4gICAqIEBwYXJhbSAge0V2ZW50fSBldiBFdmVudCB3aGVuIHRyaWdnZXJlZCB0aHJvdWdoIGFuIGVsZW1lbnRzXG4gICAqL1xuXHRzdGVwVXAoZXYpIHtcblx0XHRpZih0aGlzLmRpc2FibGVkKSByZXR1cm47XG5cdFx0aWYoZXYpIGV2LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRpZih0aGlzLnZhbHVlTWF4ID09PSBudWxsIHx8IHRoaXMudmFsdWVOb3cgPCB0aGlzLnZhbHVlTWF4KSB7XG5cdFx0XHR0aGlzLnZhbHVlTm93ID0gdGhpcy52YWx1ZU5vdyArIHRoaXMuXy5zdGVwO1xuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBSYW5nZTsiLCJpbXBvcnQgQWNjZXNzaWJsZU5vZGUgZnJvbSBcIi4vLi4vLi4vdHlwZS9BY2Nlc3NpYmxlTm9kZVwiO1xuXG4vKipcbiAqIEBleHRlbmRzIEFjY2Vzc2libGVOb2RlXG4gKi9cbmNsYXNzIFJvbGV0eXBlIGV4dGVuZHMgQWNjZXNzaWJsZU5vZGUge1xuXG5cdC8qKlxuXHQgKiBAZXh0ZW5kcyBBY2Nlc3NpYmxlTm9kZVxuXHQgKi9cblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdHN1cGVyKC4uLmFyZ3MpO1xuXG5cdFx0dGhpcy5fb25BcmlhRGlzYWJsZWRNdXRhdGlvbigpO1xuXHR9XG5cblx0X29uQXJpYURpc2FibGVkTXV0YXRpb24oKSB7XG5cdFx0Ly8gY29uc29sZS5sb2codGhpcy5kaXNhYmxlZCwgdGhpcy50YWJJbmRleCwgdGhpcy5kaXNhYmxlZCAmJiB0aGlzLnRhYkluZGV4ICYmIHRoaXMudGFiSW5kZXggPj0gMCk7XG5cdFx0aWYodGhpcy5kaXNhYmxlZCAmJiB0aGlzLnRhYkluZGV4ID49IDApIHtcblx0XHRcdHRoaXMudGFiSW5kZXggPSB1bmRlZmluZWQ7XG5cdFx0fSBlbHNlIGlmKCF0aGlzLmRpc2FibGVkICYmIHRoaXMudGFiSW5kZXggPCAwKSB7XG5cdFx0XHR0aGlzLnRhYkluZGV4ID0gMDtcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUm9sZXR5cGU7IiwiaW1wb3J0IFN0cnVjdHVyZSBmcm9tIFwiLi9TdHJ1Y3R1cmVcIjtcblxuLyoqXG4gKiBAZXh0ZW5kcyBTdHJ1Y3R1cmVcbiAqL1xuY2xhc3MgU2VjdGlvbiBleHRlbmRzIFN0cnVjdHVyZSB7IH1cblxuZXhwb3J0IGRlZmF1bHQgU2VjdGlvbjsiLCJpbXBvcnQgZmMgZnJvbSBcIi4vLi4vLi4vdXRpbHMvbWFuYWdpbmdGb2N1c1wiO1xuaW1wb3J0IGJvb2xlYW4gZnJvbSBcIi4vLi4vLi4vdHlwZS9ib29sZWFuXCI7XG5pbXBvcnQgZWxlbWVudHMgZnJvbSBcIi4vLi4vLi4vdXRpbHMvZWxlbWVudHNcIjtcblxuaW1wb3J0IFJvbGV0eXBlIGZyb20gXCIuL1JvbGV0eXBlXCI7XG5pbXBvcnQgT3B0aW9uIGZyb20gXCIuLy4uL09wdGlvbi5qc1wiO1xuaW1wb3J0IG1peCBmcm9tIFwiQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW5cIjtcbmltcG9ydCBzZWxlY3RvciBmcm9tIFwiLi8uLi8uLi91dGlscy9zZWxlY3RvclwiO1xuXG4vKipcbiAqICMjIyBLZXlib2FyZCBTdXBwb3J0XG4gKlxuICogIyMjIyBEZWZhdWx0XG4gKiB8IEtleSB8IEZ1bmN0aW9uIHxcbiAqIHwgLS0tIHwgLS0tLS0tLS0gfFxuICogfCBEb3duIEFycm93IHwgTW92ZXMgZm9jdXMgdG8gdGhlIG5leHQgb3B0aW9uIDxici8+IElmIG5vdCBtdWx0aXNlbGVjdGFibGUsIGl0IHNlbGVjdHMgdGhlIGZvY3VzZWQgb3B0aW9uLlxuICogfCBVcCBBcnJvdyBcdHwgTW92ZXMgZm9jdXMgdG8gdGhlIHByZXZpb3VzIG9wdGlvbiAgPGJyLz4gSWYgbm90IG11bHRpc2VsZWN0YWJsZSwgaXQgc2VsZWN0cyB0aGUgZm9jdXNlZCBvcHRpb24uXG4gKiB8IEhvbWUgXHRcdFx0fFx0TW92ZXMgZm9jdXMgdG8gdGhlIGZpcnN0IG9wdGlvbiAgPGJyLz4gSWYgbm90IG11bHRpc2VsZWN0YWJsZSwgaXQgc2VsZWN0cyB0aGUgZm9jdXNlZCBvcHRpb24uXG4gKiB8IEVuZCAgXHRcdFx0fFx0TW92ZXMgZm9jdXMgdG8gdGhlIGxhc3Qgb3B0aW9uICA8YnIvPiBJZiBub3QgbXVsdGlzZWxlY3RhYmxlLCBpdCBzZWxlY3RzIHRoZSBmb2N1c2VkIG9wdGlvbi5cbiAqXG4gKiAjIyMjIE11bHRpcGxlIHNlbGVjdGlvblxuICogfCBLZXkgfCBGdW5jdGlvbiB8XG4gKiB8IC0tLSB8IC0tLS0tLS0tIHxcbiAqIHwgU3BhY2VcdFx0XHRcdFx0XHRcdFx0XHR8IENoYW5nZXMgdGhlIHNlbGVjdGlvbiBzdGF0ZSBvZiB0aGUgZm9jdXNlZCBvcHRpb24uXG4gKiB8IFNoaWZ0ICsgRG93biBBcnJvdyBcdFx0fCBNb3ZlcyBmb2N1cyB0byBhbmQgc2VsZWN0cyB0aGUgbmV4dCBvcHRpb24uXG4gKiB8IFNoaWZ0ICsgVXAgQXJyb3cgXHRcdFx0fCBNb3ZlcyBmb2N1cyB0byBhbmQgc2VsZWN0cyB0aGUgcHJldmlvdXMgb3B0aW9uLlxuICogfCBDb250cm9sICsgU2hpZnQgKyBIb21lIHxcdFNlbGVjdHMgZnJvbSB0aGUgZm9jdXNlZCBvcHRpb24gdG8gdGhlIGJlZ2lubmluZyBvZiB0aGUgbGlzdC5cbiAqIHwgQ29udHJvbCArIFNoaWZ0ICsgRW5kICB8IFNlbGVjdHMgZnJvbSB0aGUgZm9jdXNlZCBvcHRpb24gdG8gdGhlIGVuZCBvZiB0aGUgbGlzdC5cbiAqIHwgQ29udHJvbCArIEEgXHQgICAgICAgICAgfCBTZWxlY3RzIGFsbCBvcHRpb25zIGluIHRoZSBsaXN0LiBJZiBhbGwgb3B0aW9ucyBhcmUgc2VsZWN0ZWQsIHVuc2VsZWN0cyBhbGwgb3B0aW9ucy5cbiAqXG4gKiAjIyMgQXR0cmlidXRlc1xuICogKiBgYXJpYS1zZWxlY3RlZGBcbiAqIFx0KiBgdHJ1ZWBcbiAqIFx0XHQqIGlzIHRoZSBjdXJyZW50IGZvY3Vzc2VkIGVsZW1lbnRcbiAqIFx0XHQqIGVxdWFscyB0aGUgdmFsdWUgb2YgYGFyaWEtYWN0aXZlZGVzY2VuZGFudGBcbiAqICogYHRhYmluZGV4YFxuICogXHQqIGFsbG93cyB1c2FnZSBvZiB0aGUgZWxlbWVudCBieSBrZXlzIHdoZW4gaW4gZm9jdXNcbiAqICogYGFyaWEtYWN0aXZlZGVzY2VuZGFudGAgZXF1YWxzIElEIG9mIGN1cnJlbnQgZm9jdXNzZWQgZWxlbWVudFxuICogXG4gKiAjIyMjIE11bHRpcGxlIHNlbGVjdGlvblxuICogKiBgYXJpYS1zZWxlY3RlZGBcbiAqICAqIGB0cnVlYFxuICogXHRcdCogY2FuIGJlIGFwcGxpZWQgdG8gbXVsdGlwbGUgZWxlbWVudFxuICogICAgKiBub3QgYXV0b21hdGljYWxseSBhcHBsaWVkIHRvIHRoZSBmb2N1c2VkIGVsZW1lbnRcbiAqIFx0KiBgZmFsc2VgXG4gKiAqIGB0YWJpbmRleGBcbiAqIFx0KiBhbGxvd3MgdXNhZ2Ugb2YgdGhlIGVsZW1lbnQgYnkga2V5cyB3aGVuIGluIGZvY3VzXG4gKiBcbiAqIEBzdW1tYXJ5IEEgZm9ybSB3aWRnZXQgdGhhdCBhbGxvd3MgdGhlIHVzZXIgdG8gbWFrZSBzZWxlY3Rpb25zIGZyb20gYSBzZXQgb2YgY2hvaWNlcy5cbiAqIEBleHRlbmRzIFJvbGV0eXBlXG4gKi9cbmNsYXNzIFNlbGVjdCBleHRlbmRzIFJvbGV0eXBlIHtcblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdHN1cGVyKC4uLmFyZ3MpO1xuXG5cdFx0Ly8gdXNlZCBmb3IgZGV0ZXJtaW5pbmcgaWYgbG9naWMgc2hvdWxkIGJlIGV4ZWN1dGVkXG5cdFx0dGhpcy50YXJnZXQgPSBmYWxzZTtcblx0XHRcblx0XHQvLyB3aGVuIGluIGZvY3VzLCBhbGxvdyB0aGUgZWxlbWVudCBiZSBjb250cm9sbGVkIGJ5IHRoZSBrZXlzXG5cdFx0aWYodHlwZW9mIHRoaXMudGFiSW5kZXggIT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgaGFzVGFyZ2V0LmJpbmQodGhpcykpO1xuXHRcdFx0dGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIGxvc3RUYXJnZXQuYmluZCh0aGlzKSk7XG5cdFx0fVxuXG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm1vdmVUb1N0YXJ0LmJpbmQodGhpcyksIHtrZXk6IFwiaG9tZVwiLCB0YXJnZXQ6IHRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50fSk7XG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm1vdmVUb1ByZXYuYmluZCh0aGlzKSwge2tleTogXCJ1cFwiLCB0YXJnZXQ6IHRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50fSk7XG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm1vdmVUb05leHQuYmluZCh0aGlzKSwge2tleTogXCJkb3duXCIsIHRhcmdldDogdGhpcy5lbGVtZW50Lm93bmVyRG9jdW1lbnR9KTtcblx0XHR0aGlzLmFkZExpc3RlbmVyKFwia2V5XCIsIHRoaXMubW92ZVRvRW5kLmJpbmQodGhpcyksIHtrZXk6IFwiZW5kXCIsIHRhcmdldDogdGhpcy5lbGVtZW50Lm93bmVyRG9jdW1lbnR9KTtcblxuXHRcdC8vIHRoaXMuYWRkTGlzdGVuZXIuY2FsbCh7IGVsZW1lbnQ6IHRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50IH0sIFwiaG9tZVwiLCB0aGlzLm1vdmVUb1N0YXJ0LmJpbmQodGhpcykpO1xuXHRcdC8vIHRoaXMuYWRkTGlzdGVuZXIuY2FsbCh7IGVsZW1lbnQ6IHRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50IH0sIFwidXBcIiwgdGhpcy5tb3ZlVG9QcmV2LmJpbmQodGhpcykpO1xuXHRcdC8vIC8vIHRoaXMuYWRkTGlzdGVuZXIuY2FsbCh7IGVsZW1lbnQ6IHRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50IH0sIFwic2hpZnQgKyB1cFwiLCB0aGlzLm1vdmVUb05leHQuYmluZCh0aGlzKSk7XG5cdFx0Ly8gdGhpcy5hZGRMaXN0ZW5lci5jYWxsKHsgZWxlbWVudDogdGhpcy5lbGVtZW50Lm93bmVyRG9jdW1lbnQgfSwgXCJkb3duXCIsIHRoaXMubW92ZVRvTmV4dC5iaW5kKHRoaXMpKTtcblx0XHQvLyAvLyB0aGlzLmFkZExpc3RlbmVyLmNhbGwoeyBlbGVtZW50OiB0aGlzLmVsZW1lbnQub3duZXJEb2N1bWVudCB9LCBcInNoaWZ0ICsgZG93blwiLCBzZWxlY3REb3duLmJpbmQodGhpcykpO1xuXHRcdC8vIHRoaXMuYWRkTGlzdGVuZXIuY2FsbCh7IGVsZW1lbnQ6IHRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50IH0sIFwiZW5kXCIsIHRoaXMubW92ZVRvRW5kLmJpbmQodGhpcykpO1xuXG5cdFx0bGV0IG9wdGlvbnMgPSBBcnJheS5mcm9tKHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yLmdldERlZXBTZWxlY3RvcihcIm9wdGlvblwiKSkpO1xuXHRcdHRoaXMub3B0aW9ucyA9IFtdO1xuXHRcdG9wdGlvbnMuZm9yRWFjaChub2RlID0+IHtcblx0XHRcdGxldCB2YWx1ZSA9IG5ldyBPcHRpb24obm9kZSk7XG5cblx0XHRcdHZhbHVlLmFkZExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5hY3RpdmVDaGFuZ2VkLmJpbmQodGhpcykpO1xuXHRcdFx0aWYgKHZhbHVlLnNlbGVjdGVkKSB7XG5cdFx0XHRcdGZjLmFkZCh2YWx1ZSk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLm9wdGlvbnMucHVzaCh2YWx1ZSk7XG5cdFx0fSk7XG5cdH1cblxuXHRtb3ZlVG9QcmV2KGV2KSB7IG1vdmUodGhpcywgZXYsIGZjLnByZXYpOyB9XG5cdG1vdmVUb05leHQoZXYpIHsgbW92ZSh0aGlzLCBldiwgZmMubmV4dCk7IH1cblx0bW92ZVRvU3RhcnQoZXYpIHsgbW92ZSh0aGlzLCBldiwgZmMuc3RhcnQpOyB9XG5cdG1vdmVUb0VuZChldikgeyBtb3ZlKHRoaXMsIGV2LCBmYy5lbmQpOyB9XG5cdGFjdGl2ZUNoYW5nZWQoZXYpIHtcblx0XHQvLyBsZXQgb3B0aW9uIGVsZW1lbnRzLmdldChldi50YXJnZXQpO1xuXHRcdC8vIGxldCBwcmV2Rm9jdXMgPSBmYy5nZXQodGhpcy5vcHRpb25zKTtcblx0XHQvLyBmYy5yZW1vdmUocHJldkZvY3VzKTtcblx0XHQvLyBmYy5hZGQob3B0aW9uKTtcblxuXHRcdC8vIGlmICh0aGlzLmFjdGl2ZURlc2NlbmRhbnQpIHRoaXMuYWN0aXZlRGVzY2VuZGFudCA9IG9wdGlvbjtcblxuXHRcdC8vIC8vIHVwZGF0ZSBzZWxlY3RlZCBvbiBrZXlldmVudCB3aGVuIG9ubHkgb25lIGl0ZW0gY2FuIGJlIHNlbGVjdGVkXG5cdFx0Ly8gaWYgKCF0aGlzLm11bHRpc2VsZWN0YWJsZSkge1xuXHRcdC8vIFx0ZmMuc2V0U2VsZWN0ZWQocHJldkZvY3VzLCB1bmRlZmluZWQpO1xuXHRcdC8vIH1cblx0XHQvLyBmYy5zZXRTZWxlY3RlZChvcHRpb24sIGJvb2xlYW4udG9nZ2xlKG9wdGlvbi5zZWxlY3RlZCkpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIG1vdmUoYXksIGV2LCBmdW5jKSB7XG5cdGlmICghYXkudGFyZ2V0KSByZXR1cm47XG5cdGlmIChldikgZXYucHJldmVudERlZmF1bHQoKTtcblxuXHRsZXQgcHJldkZvY3VzID0gZmMuZ2V0KGF5Lm9wdGlvbnMpO1xuXHRmYy5yZW1vdmUocHJldkZvY3VzKTtcblx0Ly8gdXBkYXRlIHNlbGVjdGVkIG9uIGtleWV2ZW50IHdoZW4gb25seSBvbmUgaXRlbSBjYW4gYmUgc2VsZWN0ZWRcblx0bGV0IGN1cnJlbnRGb2N1cyA9IGZ1bmMoYXkub3B0aW9ucywgcHJldkZvY3VzKTtcblx0aWYgKGF5LmFjdGl2ZURlc2NlbmRhbnQpIGF5LmFjdGl2ZURlc2NlbmRhbnQgPSBjdXJyZW50Rm9jdXM7XG5cblx0Ly8gdXBkYXRlIHNlbGVjdGVkIG9uIGtleWV2ZW50IHdoZW4gb25seSBvbmUgaXRlbSBjYW4gYmUgc2VsZWN0ZWRcblx0aWYgKCFheS5tdWx0aXNlbGVjdGFibGUpIHtcblx0XHRmYy5zZXRTZWxlY3RlZChwcmV2Rm9jdXMsIHVuZGVmaW5lZCk7XG5cdFx0ZmMuc2V0U2VsZWN0ZWQoY3VycmVudEZvY3VzLCBib29sZWFuLnRvZ2dsZShjdXJyZW50Rm9jdXMuc2VsZWN0ZWQpKTtcblx0fVxufVxuXG5mdW5jdGlvbiBoYXNUYXJnZXQoKSB7IHRoaXMudGFyZ2V0ID0gdHJ1ZTsgfVxuZnVuY3Rpb24gbG9zdFRhcmdldCgpIHsgdGhpcy50YXJnZXQgPSBmYWxzZTsgfVxuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3Q7IiwiaW1wb3J0IFJvbGV0eXBlIGZyb20gXCIuL1JvbGV0eXBlXCI7XG5cbi8qKlxuICogQGV4dGVuZHMgUm9sZXR5cGVcbiAqL1xuY2xhc3MgU3RydWN0dXJlIGV4dGVuZHMgUm9sZXR5cGUgeyB9XG5cbmV4cG9ydCBkZWZhdWx0IFN0cnVjdHVyZTtcbiIsImltcG9ydCBSb2xldHlwZSBmcm9tIFwiLi9Sb2xldHlwZVwiO1xuXG4vKipcbiAqIEBleHRlbmRzIFJvbGV0eXBlXG4gKi9cbmNsYXNzIFdpZGdldCBleHRlbmRzIFJvbGV0eXBlIHt9XG5cbmV4cG9ydCBkZWZhdWx0ICBXaWRnZXQ7XG4iLCJpbXBvcnQgUm9sZXR5cGUgZnJvbSBcIi4vUm9sZXR5cGVcIjtcblxuLyoqXG4gKiBAZXh0ZW5kcyBSb2xldHlwZVxuICovXG5jbGFzcyBXaW5kb3cgZXh0ZW5kcyBSb2xldHlwZSB7IH1cblxuZXhwb3J0IGRlZmF1bHQgV2luZG93O1xuIiwiaW1wb3J0IGJvb2xlYW4gZnJvbSBcIi4vLi4vdHlwZS9ib29sZWFuXCI7XG5pbXBvcnQgZ2V0QWN0aXZlIGZyb20gXCIuLy4uL3V0aWxzL2dldEFjdGl2ZVwiO1xuaW1wb3J0IElucHV0IGZyb20gXCIuL2Fic3RyYWN0L0lucHV0XCI7XG5cbi8qKlxuICogQGV4dGVuZHMgSW5wdXRcbiAqL1xuY2xhc3MgT3B0aW9uIGV4dGVuZHMgSW5wdXQge1xuXG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRzdXBlciguLi5hcmdzKTtcblxuXHRcdHRoaXMuYWRkTGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKSwge2tleTogXCJlbnRlclwiLCB0YXJnZXQ6IGRvY3VtZW50fSk7XG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKSwge2tleTogXCJzcGFjZVwiLCB0YXJnZXQ6IGRvY3VtZW50fSk7XG5cdFx0Ly8gdGhpcy5hZGRLZXlMaXN0ZW5lcihcIkVudGVyXCIsIHNlbGVjdEl0ZW0uYmluZCh0aGlzKSk7XG5cdH1cblxuXHRvbkNsaWNrKGV2KSB7XG5cdFx0aWYodHlwZW9mIHN1cGVyLm9uQ2xpY2sgPT0gXCJmdW5jdGlvblwiKSBzdXBlci5vbkNsaWNrKGV2KTtcblx0XHRpZihldikgZXYucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGlmICh0aGlzID09IGdldEFjdGl2ZSgpKSB7XG5cdFx0XHR0aGlzLnNlbGVjdGVkID0gYm9vbGVhbi50b2dnbGUodGhpcy5zZWxlY3RlZCk7XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE9wdGlvbjsiLCJpbXBvcnQgb2JqZWN0UGF0aCBmcm9tIFwib2JqZWN0LXBhdGhcIjtcbmltcG9ydCBlbGVtZW50cyBmcm9tIFwiLi4vdXRpbHMvZWxlbWVudHNcIjtcbmltcG9ydCBCYXNlIGZyb20gXCIuLy4uL3JvbGUvQmFzZS5qc1wiO1xuXG4vLyBUeXBlc1xuaW1wb3J0IERPTVN0cmluZyBmcm9tIFwiLi9ET01TdHJpbmdcIjtcbmltcG9ydCBBY2Nlc3NpYmxlTm9kZUxpc3QgZnJvbSBcIi4vQWNjZXNzaWJsZU5vZGVMaXN0XCI7XG5pbXBvcnQgYm9vbGVhbiBmcm9tIFwiLi9ib29sZWFuXCI7XG5pbXBvcnQgZG91YmxlIGZyb20gXCIuL2RvdWJsZVwiO1xuaW1wb3J0IGxvbmcgZnJvbSBcIi4vbG9uZ1wiO1xuXG4vKipcbiAqIEJhc2VkIG9uIHRoZSBBT00gc3BlY1xuICogQGNsYXNzXG4gKiBAZXh0ZW5kcyBCYXNlXG4gKi9cbmNsYXNzIEFjY2Vzc2libGVOb2RlIGV4dGVuZHMgQmFzZSB7XG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRzdXBlciguLi5hcmdzKTtcblxuXHRcdC8qICoqKioqKioqKioqKioqKioqKiBBQ0NFU1NJQkxFIExBQkVMIEFORCBERVNDUklQVElPTiAqKioqKioqKioqKioqKioqKiogKi9cblx0XHRcblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIGFuIGxpc3Qgd2l0aCBBY2Nlc3NpYmxlTm9kZSBpbnN0YW5jZXMgdGhhdCBsYWJlbHMgdGhlIGN1cnJlbnQgZWxlbWVudFxuXHRcdCAqIFxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI2Rlc2NyaWJlZEJ5fVxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1sYWJlbGxlZGJ5XG5cdFx0ICogQHR5cGUge0FjY2Vzc2libGVOb2RlTGlzdH1cblx0XHQgKi9cblx0XHR0aGlzLmxhYmVsbGVkQnkgPSBuZXcgQWNjZXNzaWJsZU5vZGVMaXN0KHRoaXMsIFwiYXJpYS1sYWJlbGxlZEJ5XCIpO1xuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyBhbiBsaXN0IHdpdGggQWNjZXNzaWJsZU5vZGUgaW5zdGFuY2VzIHRoYXQgZGVzY3JpYmVzIHRoZSBjdXJyZW50IGVsZW1lbnRcblx0XHQgKiBcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNsYWJlbGVkQnl9XG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWRlc2NyaWJlZGJ5XG5cdFx0ICogQHR5cGUge0FjY2Vzc2libGVOb2RlTGlzdH1cblx0XHQgKi9cblx0XHR0aGlzLmRlc2NyaWJlZEJ5ID0gbmV3IEFjY2Vzc2libGVOb2RlTGlzdCh0aGlzLCBcImFyaWEtZGVzY3JpYmVkQnlcIik7XG5cblx0XHQvKiAqKioqKioqKioqKioqKiBFTkQgT0YgQUNDRVNTSUJMRSBMQUJFTCBBTkQgREVTQ1JJUFRJT04gKioqKioqKioqKioqKiogKi9cblxuXHRcdC8qICoqKioqKioqKioqKioqKioqKioqKioqKiBPVEhFUiBSRUxBVElPTlNISVBTICoqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyBhbiBsaXN0IHdpdGggQWNjZXNzaWJsZU5vZGUgaW5zdGFuY2VzIHdob3NlIGNvbnRlbnRzIG9yIHByZXNlbmNlIGFyZSBjb250cm9sbGVkIGJ5XG5cdFx0ICogdGhlIGN1cnJlbnQgZWxlbWVudC5cblx0XHQgKiBcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNvd25zfVxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1jb250cm9sc1xuXHRcdCAqIEB0eXBlIHtBY2Nlc3NpYmxlTm9kZUxpc3R9XG5cdFx0ICovXG5cdFx0dGhpcy5jb250cm9scyA9IG5ldyBBY2Nlc3NpYmxlTm9kZUxpc3QodGhpcywgXCJhcmlhLWNvbnRyb2xzXCIpO1xuXG5cdFx0LyoqXG5cdFx0ICogQ29udGFpbnMgdGhlIG5leHQgZWxlbWVudChzKSBpbiBhbiBhbHRlcm5hdGUgcmVhZGluZyBvcmRlciBvZiBjb250ZW50IHdoaWNoLCBhdCB0aGUgdXNlcidzIFxuXHRcdCAqIGRpc2NyZXRpb24sIGFsbG93cyBhc3Npc3RpdmUgdGVjaG5vbG9neSB0byBvdmVycmlkZSB0aGUgZ2VuZXJhbCBkZWZhdWx0IG9mIHJlYWRpbmcgaW5cblx0XHQgKiBkb2N1bWVudCBzb3VyY2Ugb3JkZXIuXG5cdFx0ICogXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWZsb3d0b1xuXHRcdCAqIEB0eXBlIHtBY2Nlc3NpYmxlTm9kZUxpc3R9XG5cdFx0ICovXG5cdFx0dGhpcy5mbG93VG8gPSBuZXcgQWNjZXNzaWJsZU5vZGVMaXN0KHRoaXMsIFwiYXJpYS1mbG93dG9cIik7XG5cblx0XHQvKipcblx0XHQgKiBDb250YWlucyBjaGlsZHJlbiB3aG8ncyBJRCBhcmUgcmVmZXJlbmNlZCBpbnNpZGUgdGhlIGBhcmlhLW93bnNgIGF0dHJpYnV0ZVxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1vd25zXG5cdFx0ICogQHR5cGUge0FjY2Vzc2libGVOb2RlTGlzdH1cblx0XHQgKi9cblx0XHR0aGlzLm93bnMgPSBuZXcgQWNjZXNzaWJsZU5vZGVMaXN0KHRoaXMsIFwiYXJpYS1vd25zXCIpO1xuXHRcdFxuXHRcdC8qICoqKioqKioqKioqKioqKioqKioqKiBFTkQgT0YgT1RIRVIgUkVMQVRJT05TSElQUyAqKioqKioqKioqKioqKioqKioqKiogKi9cblxuXHRcdHRoaXMuXy5tdXRhdGlvbnMucHVzaChbXCJyb2xlXCIsIFwiYXJpYS1hY3RpdmVkZXNjZW5kYW50XCIsIFwiYXJpYS1hdG9taWNcIiwgXCJhcmlhLWF1dG9jb21wbGV0ZVwiLFxuXHRcdFx0XCJhcmlhLWJ1c3lcIiwgXCJhcmlhLWNoZWNrZWRcIiwgXCJhcmlhLWNvbGNvdW50XCIsIFwiYXJpYS1jb2xpbmRleFwiLCBcImFyaWEtY29sc3BhblwiLCBcImFyaWEtY29udHJvbHNcIixcblx0XHRcdFwiYXJpYS1jdXJyZW50XCIsIFwiYXJpYS1kZXNjcmliZWRieVwiLCBcImFyaWEtZGV0YWlsc1wiLCBcImFyaWEtZGlzYWJsZWRcIiwgXCJhcmlhLWRyb3BlZmZlY3RcIixcblx0XHRcdFwiYXJpYS1lcnJvcm1lc3NhZ2VcIiwgXCJhcmlhLWV4cGFuZGVkXCIsIFwiYXJpYS1mbG93dG9cIiwgXCJhcmlhLWdyYWJiZWRcIiwgXCJhcmlhLWhhc3BvcHVwXCIsXG5cdFx0XHRcImFyaWEtaGlkZGVuXCIsIFwiYXJpYS1pbnZhbGlkXCIsIFwiYXJpYS1rZXlzaG9ydGN1dHNcIiwgXCJhcmlhLWxhYmVsXCIsIFwiYXJpYS1sYWJlbGxlZGJ5XCIsXG5cdFx0XHRcImFyaWEtbGV2ZWxcIiwgXCJhcmlhLWxpdmVcIiwgXCJhcmlhLW1vZGFsXCIsIFwiYXJpYS1tdWx0aWxpbmVcIiwgXCJhcmlhLW11bHRpc2VsZWN0YWJsZVwiLFxuXHRcdFx0XCJhcmlhLW9yaWVudGF0aW9uXCIsIFwiYXJpYS1vd25zXCIsIFwiYXJpYS1wbGFjZWhvbGRlclwiLCBcImFyaWEtcG9zaW5zZXRcIiwgXCJhcmlhLXByZXNzZWRcIixcblx0XHRcdFwiYXJpYS1yZWFkb25seVwiLCBcImFyaWEtcmVsZXZhbnRcIiwgXCJhcmlhLXJlcXVpcmVkXCIsIFwiYXJpYS1yb2xlZGVzY3JpcHRpb25cIiwgXCJhcmlhLXJvd2NvdW50XCIsXG5cdFx0XHRcImFyaWEtcm93aW5kZXhcIiwgXCJhcmlhLXJvd3NwYW5cIiwgXCJhcmlhLXNlbGVjdGVkXCIsIFwiYXJpYS1zZXRzaXplXCIsIFwiYXJpYS1zb3J0XCIsIFwiYXJpYS12YWx1ZW1heFwiLFxuXHRcdFx0XCJhcmlhLXZhbHVlbWluXCIsIFwiYXJpYS12YWx1ZW5vd1wiLCBcImFyaWEtdmFsdWV0ZXh0XCJdKTtcblx0fVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhBY2Nlc3NpYmxlTm9kZS5wcm90b3R5cGUsIFxuXHQvKiogQGxlbmRzIEFjY2Vzc2libGVOb2RlLnByb3RvdHlwZSAqL1xuXHR7XG5cdFx0LyoqIFxuXHRcdCogRGVmaW5lcyBhIHR5cGUgaXQgcmVwcmVzZW50cywgZS5nLiBgdGFiYFxuXHRcdCogXG5cdFx0KiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI3JvbGVzXG5cdFx0KiBAdHlwZSB7U3RyaW5nfVxuXHRcdCovXG5cdFx0XCJyb2xlXCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQoc3RyKSB7IHJldHVybiBET01TdHJpbmcuc2V0KHRoaXMsIFwicm9sZVwiLCBzdHIpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gRE9NU3RyaW5nLmdldCh0aGlzLCBcInJvbGVcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqIFxuXHRcdCAqIERlZmluZXMgYSBodW1hbi1yZWFkYWJsZSwgYXV0aG9yLWxvY2FsaXplZCBkZXNjcmlwdGlvbiBmb3IgdGhlIHJvbGVcblx0XHQgKiBcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtcm9sZWRlc2NyaXB0aW9uXG5cdFx0ICogQHR5cGUge1N0cmluZ31cblx0XHQgKi9cblx0XHRcInJvbGVEZXNjcmlwdGlvblwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHN0cikgeyByZXR1cm4gRE9NU3RyaW5nLnNldCh0aGlzLCBcImFyaWEtcm9sZURlc2NyaXB0aW9uXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1yb2xlRGVzY3JpcHRpb25cIik7IH1cblx0XHR9LFxuXG5cdFx0LyogKioqKioqKioqKioqKioqKioqKiBBQ0NFU1NJQkxFIExBQkVMIEFORCBERVNDUklQVElPTiAqKioqKioqKioqKioqKioqKioqICovXG5cdFxuXHRcdC8qKiBcblx0XHQqIERlZmluZXMgYSBzdHJpbmcgdmFsdWUgdGhhdCBsYWJlbHMgdGhlIGN1cnJlbnQgZWxlbWVudC5cblx0XHQqIFxuXHRcdCogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWxhYmVsXG5cdFx0KiBAdHlwZSB7U3RyaW5nfSBcblx0XHQqL1xuXHRcdFwibGFiZWxcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJhcmlhLWxhYmVsXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1sYWJlbFwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKiAqKioqKioqKioqKioqKiogRU5EIE9GIEFDQ0VTU0lCTEUgTEFCRUwgQU5EIERFU0NSSVBUSU9OICoqKioqKioqKioqKioqKiAqL1xuXHRcblx0XHQvKiAqKioqKioqKioqKioqKioqKioqKiogR0xPQkFMIFNUQVRFUyBBTkQgUFJPUEVSVElFUyAqKioqKioqKioqKioqKioqKioqKiogKi9cblxuXHRcdC8qKiBcblx0XHQgKiBJbmRpY2F0ZXMgdGhlIGVsZW1lbnQgdGhhdCByZXByZXNlbnRzIHRoZSBjdXJyZW50IGl0ZW0gd2l0aGluIGEgY29udGFpbmVyIG9yIHNldCBvZiByZWxhdGVkIGVsZW1lbnRzLlxuXHRcdCAqIFxuXHRcdCAqIFBvc3NpYmxlIHN0cmluZ3MgYXJlOlxuXHRcdCAqICogYHBhZ2VgLCB1c2VkIHRvIGluZGljYXRlIGEgbGluayB3aXRoaW4gYSBzZXQgb2YgcGFnaW5hdGlvbiBsaW5rcywgXG5cdFx0ICogXHRcdHdoZXJlIHRoZSBsaW5rIGlzIHZpc3VhbGx5IHN0eWxlZCB0byByZXByZXNlbnQgdGhlIGN1cnJlbnRseS1kaXNwbGF5ZWQgcGFnZS5cblx0XHQgKiAqIGBzdGVwYCwgdXNlZCB0byBpbmRpY2F0ZSBhIGxpbmsgd2l0aGluIGEgc3RlcCBpbmRpY2F0b3IgZm9yIGEgc3RlcC1iYXNlZCBwcm9jZXNzLFxuXHRcdCAqIFx0XHR3aGVyZSB0aGUgbGluayBpcyB2aXN1YWxseSBzdHlsZWQgdG8gcmVwcmVzZW50IHRoZSBjdXJyZW50IHN0ZXAuXG5cdFx0ICogKiBgbG9jYXRpb25gLCB1c2VkIHRvIGluZGljYXRlIHRoZSBpbWFnZSB0aGF0IGlzIHZpc3VhbGx5IGhpZ2hsaWdodGVkIGFzIHRoZSBjdXJyZW50IGNvbXBvbmVudCBvZiBhIGZsb3cgY2hhcnQuXG5cdFx0ICogKiBgZGF0ZWAsIHVzZWQgdG8gaW5kaWNhdGUgdGhlIGN1cnJlbnQgZGF0ZSB3aXRoaW4gYSBjYWxlbmRhci5cblx0XHQgKiAqIGB0aW1lYCwgdXNlZCB0byBpbmRpY2F0ZSB0aGUgY3VycmVudCB0aW1lIHdpdGhpbiBhIHRpbWV0YWJsZS5cblx0XHQgKiBcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtY3VycmVudFxuXHRcdCAqIEB0eXBlIHsgQm9vbGVhbiB8IFN0cmluZyB9XG5cdFx0ICovXG5cdFx0XCJjdXJyZW50XCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQoc3RyKSB7IHJldHVybiBET01TdHJpbmcuc2V0KHRoaXMsIFwiYXJpYS1jdXJyZW50XCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1jdXJyZW50XCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qICoqKioqKioqKioqKioqKioqIEVORCBPRiBHTE9CQUwgU1RBVEVTIEFORCBQUk9QRVJUSUVTICoqKioqKioqKioqKioqKioqICovXG5cblx0XHQvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKiBXSURHRVQgUFJPUEVSVElFUyAqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5cdFx0LyoqXG5cdFx0ICogSW5kaWNhdGVzIHdoZXRoZXIgaW5wdXR0aW5nIHRleHQgY291bGQgdHJpZ2dlciBkaXNwbGF5IG9mIG9uZSBvciBtb3JlIHByZWRpY3Rpb25zIG9mIHRoZSB1c2VyJ3Ncblx0XHQgKiBpbnRlbmRlZCB2YWx1ZSBmb3IgYW4gaW5wdXQgYW5kIHNwZWNpZmllcyBob3cgcHJlZGljdGlvbnMgd291bGQgYmUgcHJlc2VudGVkIGlmIHRoZXkgYXJlIG1hZGUuXG5cdFx0ICogXG5cdFx0ICogVGhlIGJlaGF2aW9yIGR1cmluZyBpbnB1dCBpcyBkZXBlbmRzIG9uIHRoZSBwcm92aWRlZCB2YWx1ZSwgaXQgZm9sbG93cyBiZW5lYXRoIHRhYmxlLlxuXHRcdCAqIFxuXHRcdCAqIHwgVmFsdWUgIHwgXHREZXNjcmlwdGlvbiB8XG5cdFx0ICogfCAtLS0tLS0gfCAtLS0gfFxuXHRcdCAqIHwgaW5saW5lIHwgVGV4dCBzdWdnZXN0aW5nIG1heSBiZSBkeW5hbWljYWxseSBpbnNlcnRlZCBhZnRlciB0aGUgY2FyZXQuXG5cdFx0ICogfCBsaXN0ICAgfCBBIGNvbGxlY3Rpb24gb2YgdmFsdWVzIHRoYXQgY291bGQgY29tcGxldGUgdGhlIHByb3ZpZGVkIGlucHV0IGlzIGRpc3BsYXllZC5cblx0XHQgKiB8IGJvdGggICB8IEltcGxlbWVudHMgYGlubGluZWAgYW5kIGBsaXN0YFxuXHRcdCAqIHwgbm9uZSAgIHwgTm8gcHJlZGljdGlvbiBpcyBzaG93blxuXHRcdCAqIFxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1hdXRvY29tcGxldGVcblx0XHQgKiBAdHlwZSB7P1N0cmluZ31cblx0XHQgKi9cblx0XHRcImF1dG9jb21wbGV0ZVwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHN0cikgeyByZXR1cm4gRE9NU3RyaW5nLnNldCh0aGlzLCBcImFyaWEtYXV0b2NvbXBsZXRlXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1hdXRvY29tcGxldGVcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucy9zZXRzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBlbGVtZW50IHdobyBpcyBleHBvc2VkIHRvIGFuIGFjY2Vzc2liaWxpdHkgQVBJLlxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI2Rpc2FibGVkfVxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1oaWRkZW5cblx0XHQgKiBAdHlwZSB7P0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0XCJoaWRkZW5cIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIGJvb2xlYW4uc2V0KHRoaXMsIFwiYXJpYS1oaWRkZW5cIiwgc3RyKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGJvb2xlYW4uZ2V0KHRoaXMsIFwiYXJpYS1oaWRkZW5cIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogSW5kaWNhdGVzIGtleWJvYXJkIHNob3J0Y3V0cyB0aGF0IGFuIGF1dGhvciBoYXMgaW1wbGVtZW50ZWQgdG8gYWN0aXZhdGUgb3Jcblx0XHQgKiBnaXZlIGZvY3VzIHRvIGFuIGVsZW1lbnQuXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWtleXNob3J0Y3V0c1xuXHRcdCAqIEB0eXBlIHs/U3RyaW5nfVxuXHRcdCAqL1xuXHRcdFwia2V5U2hvcnRjdXRzXCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQoc3RyKSB7IHJldHVybiBET01TdHJpbmcuc2V0KHRoaXMsIFwiYXJpYS1rZXlTaG9ydGN1dHNcIiwgc3RyKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIERPTVN0cmluZy5nZXQodGhpcywgXCJhcmlhLWtleVNob3J0Y3V0c1wiKTsgfVxuXHRcdH0sXG5cblx0XHQvKiogXG5cdFx0ICogSW5kaWNhdGVzIHdoZXRoZXIgYW4gZWxlbWVudCBpcyBtb2RhbCB3aGVuIGRpc3BsYXllZC5cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtbW9kYWxcblx0XHQgKiBAdHlwZSB7P0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0XCJtb2RhbFwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHN0cikgeyByZXR1cm4gYm9vbGVhbi5zZXQodGhpcywgXCJhcmlhLW1vZGFsXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBib29sZWFuLmdldCh0aGlzLCBcImFyaWEtbW9kYWxcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqIFxuXHRcdCAqIEluZGljYXRlcyB3aGV0aGVyIGEgdGV4dCBib3ggYWNjZXB0cyBtdWx0aXBsZSBsaW5lcyBvZiBpbnB1dCBvciBvbmx5IGEgc2luZ2xlIGxpbmUuXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLW11bHRpbGluZVxuXHRcdCAqIEB0eXBlIHs/Qm9vbGVhbn1cblx0XHQgKi9cblx0XHRcIm11bHRpbGluZVwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHN0cikgeyByZXR1cm4gYm9vbGVhbi5zZXQodGhpcywgXCJhcmlhLW11bHRpbGluZVwiLCBzdHIpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gYm9vbGVhbi5nZXQodGhpcywgXCJhcmlhLW11bHRpbGluZVwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBJbmRpY2F0ZXMgdGhhdCB0aGUgdXNlciBtYXkgc2VsZWN0IG1vcmUgdGhhbiBvbmUgaXRlbSBmcm9tIHRoZSBjdXJyZW50IHNlbGVjdGFibGUgZGVzY2VuZGFudHMuXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLW11bHRpc2VsZWN0YWJsZVxuXHRcdCAqIEB0eXBlIHs/Qm9vbGVhbn1cblx0XHQgKi9cblx0XHRcIm11bHRpc2VsZWN0YWJsZVwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHN0cikgeyByZXR1cm4gYm9vbGVhbi5zZXQodGhpcywgXCJhcmlhLW11bHRpc2VsZWN0YWJsZVwiLCBzdHIpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gYm9vbGVhbi5nZXQodGhpcywgXCJhcmlhLW11bHRpc2VsZWN0YWJsZVwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgZWxlbWVudCdzIG9yaWVudGF0aW9uIGlzIGBob3Jpem9udGFsYCwgYHZlcnRpY2FsYCwgb3IgYG51bGxgLlxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1vcmllbnRhdGlvblxuXHRcdCAqIEB0eXBlIHs/U3RyaW5nfVxuXHRcdCAqL1xuXHRcdFwib3JpZW50YXRpb25cIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJhcmlhLW9yaWVudGF0aW9uXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1vcmllbnRhdGlvblwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBJbmRpY2F0ZXMgdGhhdCB0aGUgdXNlciBtYXkgc2VsZWN0IG1vcmUgdGhhbiBvbmUgaXRlbSBmcm9tIHRoZSBjdXJyZW50IHNlbGVjdGFibGUgZGVzY2VuZGFudHMuXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXJlYWRvbmx5XG5cdFx0ICogQHR5cGUgez9Cb29sZWFufVxuXHRcdCAqL1xuXHRcdFwicmVhZE9ubHlcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIGJvb2xlYW4uc2V0KHRoaXMsIFwiYXJpYS1yZWFkT25seVwiLCBzdHIpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gYm9vbGVhbi5nZXQodGhpcywgXCJhcmlhLXJlYWRPbmx5XCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEluZGljYXRlcyB0aGF0IHVzZXIgaW5wdXQgaXMgcmVxdWlyZWQgb24gdGhlIGVsZW1lbnQgYmVmb3JlIGEgZm9ybSBtYXkgYmUgc3VibWl0dGVkLlxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1yZXF1aXJlZFxuXHRcdCAqIEB0eXBlIHs/Qm9vbGVhbn1cblx0XHQgKi9cblx0XHRcInJlcXVpcmVkXCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQoc3RyKSB7IHJldHVybiBib29sZWFuLnNldCh0aGlzLCBcImFyaWEtcmVxdWlyZWRcIiwgc3RyKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGJvb2xlYW4uZ2V0KHRoaXMsIFwiYXJpYS1yZXF1aXJlZFwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBJbmRpY2F0ZXMgdGhhdCB1c2VyIGlucHV0IGlzIHJlcXVpcmVkIG9uIHRoZSBlbGVtZW50IGJlZm9yZSBhIGZvcm0gbWF5IGJlIHN1Ym1pdHRlZC5cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtc2VsZWN0ZWRcblx0XHQgKiBAdHlwZSB7P0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0XCJzZWxlY3RlZFwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHN0cikgeyByZXR1cm4gYm9vbGVhbi5zZXQodGhpcywgXCJhcmlhLXNlbGVjdGVkXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBib29sZWFuLmdldCh0aGlzLCBcImFyaWEtc2VsZWN0ZWRcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogSW5kaWNhdGVzIGlmIGl0ZW1zIGluIGEgdGFibGUgb3IgZ3JpZCBhcmUgc29ydGVkIGluIGFzY2VuZGluZyBvciBkZXNjZW5kaW5nIG9yZGVyLiAgXG5cdFx0ICogUG9zc2libGUgdmFsdWVzIGFyZSBgYWNlbmRpbmdgLCBgZGVzY2VuZGluZ2AsIGBub25lYCwgYG90aGVyYCBvciBgbnVsbGAuXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXNvcnRcblx0XHQgKiBAdHlwZSB7P0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0XCJzb3J0XCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQoc3RyKSB7IHJldHVybiBET01TdHJpbmcuc2V0KHRoaXMsIFwiYXJpYS1zb3J0XCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1zb3J0XCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qICoqKioqKioqKioqKioqKioqKioqKioqIEVORCBPRiBXSURHRVQgUFJPUEVSVElFUyAqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5cblx0XHQvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiBXSURHRVQgU1RBVEVTICoqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuXHRcdC8qKlxuXHRcdCAqIEluZGljYXRlcyB0aGUgY3VycmVudCBcImNoZWNrZWRcIiBzdGF0ZSBvZiBhIHtAbGluayBXaWRnZXR9LCBhbW9uZyB7QGxpbmsgUmFkaW99IGFuZCB7QGxpbmsgQ2hlY2tib3h9XG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjcHJlc3NlZH1cblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNzZWxlY3RlZH1cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtcHJlc3NlZFxuXHRcdCAqIEB0eXBlIHs/U3RyaW5nfVxuXHRcdCAqL1xuXHRcdFwiY2hlY2tlZFwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHN0cikgeyByZXR1cm4gRE9NU3RyaW5nLnNldCh0aGlzLCBcImFyaWEtY2hlY2tlZFwiLCBzdHIpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gRE9NU3RyaW5nLmdldCh0aGlzLCBcImFyaWEtY2hlY2tlZFwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgZWxlbWVudCwgb3IgYW5vdGhlciBncm91cGluZyBlbGVtZW50IGl0IGNvbnRyb2xzLCBcblx0XHQgKiBpcyBjdXJyZW50bHkgZXhwYW5kZWQgb3IgY29sbGFwc2VkLlxuXHRcdCAqIFxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1leHBhbmRlZFxuXHRcdCAqIEB0eXBlIHs/Qm9vbGVhbn1cblx0XHQgKi9cblx0XHRcImV4cGFuZGVkXCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQoc3RyKSB7IHJldHVybiBib29sZWFuLnNldCh0aGlzLCBcImFyaWEtZXhwYW5kZWRcIiwgc3RyKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGJvb2xlYW4uZ2V0KHRoaXMsIFwiYXJpYS1leHBhbmRlZFwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBJbmRpY2F0ZXMgdGhhdCB0aGUgZWxlbWVudCBpcyBwZXJjZWl2YWJsZSBidXQgZGlzYWJsZWQsIHNvIGl0IGlzIG5vdCBlZGl0YWJsZSBvciBvdGhlcndpc2Ugb3BlcmFibGUuXG5cdFx0ICogXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjaGlkZGVufVxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI3JlYWRvbmx5fVxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1kaXNhYmxlZFxuXHRcdCAqIEB0eXBlIHs/Qm9vbGVhbn1cblx0XHQgKi9cblx0XHRcImRpc2FibGVkXCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQoc3RyKSB7IHJldHVybiBib29sZWFuLnNldCh0aGlzLCBcImFyaWEtZGlzYWJsZWRcIiwgc3RyKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGJvb2xlYW4uZ2V0KHRoaXMsIFwiYXJpYS1kaXNhYmxlZFwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBJbmRpY2F0ZXMgdGhlIGVudGVyZWQgdmFsdWUgZG9lcyBub3QgY29uZm9ybSB0byB0aGUgZm9ybWF0IGV4cGVjdGVkIGJ5IHRoZSBhcHBsaWNhdGlvbi5cblx0XHQgKiBcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNlcnJvck1lc3NhZ2V9XG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWVycm9ybWVzc2FnZVxuXHRcdCAqIEB0eXBlIHs/U3RyaW5nfSBcblx0XHQgKi9cblx0XHRcImludmFsaWRcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJhcmlhLWludmFsaWRcIiwgc3RyKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIERPTVN0cmluZy5nZXQodGhpcywgXCJhcmlhLWludmFsaWRcIik7IH1cblx0XHR9LFxuXG5cblx0XHQvKipcblx0XHQgKiBJbmRpY2F0ZXMgdGhlIGF2YWlsYWJpbGl0eSBhbmQgdHlwZSBvZiBpbnRlcmFjdGl2ZSBwb3B1cCBlbGVtZW50LCBzdWNoIGFzIG1lbnUgb3IgZGlhbG9nLFxuXHRcdCAqIHRoYXQgY2FuIGJlIHRyaWdnZXJlZCBieSBhbiBlbGVtZW50LlxuXHRcdCAqIFxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1oYXNwb3B1cFxuXHRcdCAqIEB0eXBlIHs/U3RyaW5nfVxuXHRcdCAqL1xuXHRcdFwiaGFzUG9wVXBcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJhcmlhLWhhc3BvcHVwXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1oYXNwb3B1cFwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBJbmRpY2F0ZXMgdGhlIGN1cnJlbnQgXCJjaGVja2VkXCIgc3RhdGUgb2YgYSB7QGxpbmsgV2lkZ2V0fSwgYW1vbmcge0BsaW5rIFJhZGlvfSBhbmQge0BsaW5rIENoZWNrYm94fVxuXHRcdCAqIFxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI3ByZXNzZWR9XG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjc2VsZWN0ZWR9XG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXByZXNzZWRcblx0XHQgKiBAdHlwZSB7P1N0cmluZ31cblx0XHQgKi9cblx0XHRcInByZXNzZWRcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJhcmlhLXByZXNzZWRcIiwgc3RyKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIERPTVN0cmluZy5nZXQodGhpcywgXCJhcmlhLXByZXNzZWRcIik7IH1cblx0XHR9LFxuXG5cdFx0LyogKioqKioqKioqKioqKioqKioqKioqKioqKiBFTkQgT0YgV0lER0VUIFNUQVRFUyAqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5cblxuXHRcdC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKiogQ09OVFJPTCBWQUxVRVMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5cdFx0LyoqIFxuXHRcdCAqIFJldHVybnMgLyBzZXRzIHRoZSBodW1hbiByZWFkYWJsZSB0ZXh0IGFsdGVybmF0aXZlIG9mIHtAbGluayAjYXJpYS12YWx1ZW5vd30gZm9yIGEge0BsaW5rIFJhbmdlfSB3aWRnZXQuXG5cdFx0ICogXG5cdFx0ICogQHNlZSB7QGxpbmsgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS12YWx1ZXRleHR9XG5cdFx0ICogQHR5cGUgez9TdHJpbmd9XG5cdFx0ICovXG5cdFx0XCJ2YWx1ZVRleHRcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJhcmlhLXZhbHVlVGV4dFwiLCBzdHIpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gRE9NU3RyaW5nLmdldCh0aGlzLCBcImFyaWEtdmFsdWVUZXh0XCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgLyBzZXRzIGEgc2hvcnQgaGludCBpbnRlbmRlZCB0byBhaWQgdGhlIHVzZXIgd2l0aCBkYXRhIGVudHJ5IHdoZW4gdGhlIGNvbnRyb2wgaGFzIG5vIHZhbHVlLlxuXHRcdCAqIEEgaGludCBjb3VsZCBiZSBhIHNhbXBsZSB2YWx1ZSBvciBhIGJyaWVmIGRlc2NyaXB0aW9uIG9mIHRoZSBleHBlY3RlZCBmb3JtYXQuXG5cdFx0ICogXG5cdFx0ICogQHNlZSB7QGxpbmsgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1wbGFjZWhvbGRlcn1cblx0XHQgKiBAdHlwZSB7P1N0cmluZ31cblx0XHQgKi9cblx0XHRcInBsYWNlaG9sZGVyXCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQoc3RyKSB7IHJldHVybiBET01TdHJpbmcuc2V0KHRoaXMsIFwiYXJpYS1wbGFjZWhvbGRlclwiLCBzdHIpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gRE9NU3RyaW5nLmdldCh0aGlzLCBcImFyaWEtcGxhY2Vob2xkZXJcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqIFxuXHRcdCAqIFJldHVybnMgLyBzZXRzIHRoZSBjdXJyZW50IHZhbHVlIGZvciBhIHtAbGluayBSYW5nZX0gd2lkZ2V0LlxuXHRcdCAqIFxuXHRcdCAqIEBzZWUge0BsaW5rIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtdmFsdWVub3d9XG5cdFx0ICogQHR5cGUgez9OdW1iZXJ9XG5cdFx0ICovXG5cdFx0XCJ2YWx1ZU5vd1wiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHZhbCkgeyByZXR1cm4gZG91YmxlLnNldCh0aGlzLCBcImFyaWEtdmFsdWVub3dcIiwgdmFsKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGRvdWJsZS5nZXQodGhpcywgXCJhcmlhLXZhbHVlbm93XCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qKiBcblx0XHQgKiBSZXR1cm5zIC8gc2V0cyB0aGUgbWluaW11bSBhbGxvd2VkIHZhbHVlIGZvciBhIHtAbGluayBSYW5nZX0gd2lkZ2V0LlxuXHRcdCAqIFxuXHRcdCAqIEBzZWUge0BsaW5rIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtdmFsdWVtaW59XG5cdFx0ICogQHR5cGUgez9OdW1iZXJ9XG5cdFx0ICovXG5cdFx0XCJ2YWx1ZU1pblwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHZhbCkgeyByZXR1cm4gZG91YmxlLnNldCh0aGlzLCBcImFyaWEtdmFsdWVtaW5cIiwgdmFsKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGRvdWJsZS5nZXQodGhpcywgXCJhcmlhLXZhbHVlbWluXCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qKiBcblx0XHQgKiBSZXR1cm5zIC8gc2V0cyB0aGUgbWF4aW11bSBhbGxvd2VkIHZhbHVlIGZvciBhIHtAbGluayBSYW5nZX0gd2lkZ2V0LlxuXHRcdCAqIFxuXHRcdCAqIEBzZWUge0BsaW5rIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtdmFsdWVtYXh9XG5cdFx0ICogQHR5cGUgez9OdW1iZXJ9XG5cdFx0ICovXG5cdFx0XCJ2YWx1ZU1heFwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHZhbCkgeyByZXR1cm4gZG91YmxlLnNldCh0aGlzLCBcImFyaWEtdmFsdWVtYXhcIiwgdmFsKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGRvdWJsZS5nZXQodGhpcywgXCJhcmlhLXZhbHVlbWF4XCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qICoqKioqKioqKioqKioqKioqKioqKioqKiBFTkQgT0YgQ09OVFJPTCBWQUxVRVMgKioqKioqKioqKioqKioqKioqKioqKioqICovXG5cblx0XHQvKiAqKioqKioqKioqKioqKioqKioqKioqKioqIE9USEVSIFJFTEFUSU9OU0hJUFMgKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyAvIHNldHMgdGhlIEFjY2Vzc2libGVOb2RlIG9mIHRoZSBjdXJyZW50bHkgYWN0aXZlIGVsZW1lbnQgd2hlbiBmb2N1cyBpcyBvbiBjdXJyZW50IGVsZW1lbnQuXG5cdFx0ICogXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWFjdGl2ZWRlc2NlbmRhbnRcblx0XHQgKiBAdHlwZSB7P0FjY2Nlc3NpYmxlTm9kZX1cblx0XHQgKi9cblx0XHRcImFjdGl2ZURlc2NlbmRhbnRcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChheSkgeyByZXR1cm4gc2V0QWNjZXNzaWJsZU5vZGUodGhpcywgXCJhcmlhLWFjdGl2ZWRlc2NlbmRhbnRcIiwgYXkpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gZ2V0QWNjZXNzaWJsZU5vZGUodGhpcywgXCJhcmlhLWFjdGl2ZWRlc2NlbmRhbnRcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyAvIHNldHMgYW4gQWNjZXNzaWJsZU5vZGUgdGhhdCBwcm92aWRlcyBhIGRldGFpbGVkLCBleHRlbmRlZCBkZXNjcmlwdGlvbiBcblx0XHQgKiBmb3IgdGhlIGN1cnJlbnQgZWxlbWVudC5cblx0XHQgKiBcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNkZXNjcmliZWRCeX1cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtZGV0YWlsc1xuXHRcdCAqIEB0eXBlIHs/QWNjY2Vzc2libGVOb2RlfVxuXHRcdCAqL1xuXHRcdFwiZGV0YWlsc1wiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KGF5KSB7IHJldHVybiBzZXRBY2Nlc3NpYmxlTm9kZSh0aGlzLCBcImFyaWEtZGV0YWlsc1wiLCBheSk7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBnZXRBY2Nlc3NpYmxlTm9kZSh0aGlzLCBcImFyaWEtZGV0YWlsc1wiKTsgfVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIC8gc2V0cyBhbiBBY2Nlc3NpYmxlTm9kZSB0aGF0IHByb3ZpZGVzIGFuIGVycm9yIG1lc3NhZ2UgZm9yIHRoZSBjdXJyZW50IGVsZW1lbnQuXG5cdFx0ICogXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjaW52YWxpZH1cblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNkZXNjcmliZWRCeX1cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtZXJyb3JtZXNzYWdlXG5cdFx0ICogQHR5cGUgez9BY2NjZXNzaWJsZU5vZGV9XG5cdFx0ICovXG5cdFx0XCJlcnJvck1lc3NhZ2VcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChheSkgeyByZXR1cm4gc2V0QWNjZXNzaWJsZU5vZGUodGhpcywgXCJhcmlhLWVycm9ybWVzc2FnZVwiLCBheSk7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBnZXRBY2Nlc3NpYmxlTm9kZSh0aGlzLCBcImFyaWEtZXJyb3JtZXNzYWdlXCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qICoqKioqKioqKioqKioqKioqKioqKiogRU5EIE9GIE9USEVSIFJFTEFUSU9OU0hJUFMgKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5cdFx0LyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogQ09MTEVDVElPTlMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgLyBzZXRzIHRoZSB0b3RhbCBudW1iZXIgb2YgY29sdW1ucyBpbiBhIHtAbGluayBUYWJsZX0sIHtAbGluayBHcmlkfSwgb3Ige0BsaW5rIFRyZWVncmlkfS5cblx0XHQgKiBcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNjb2xJbmRleH1cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtc2V0c2l6ZVxuXHRcdCAqIEB0eXBlIHs/SW50ZWdlcn0gXG5cdFx0ICovXG5cdFx0XCJjb2xDb3VudFwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHZhbCkgeyByZXR1cm4gbG9uZy5zZXQodGhpcywgXCJhcmlhLWNvbGNvdW50XCIsIHZhbCk7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBsb25nLmdldCh0aGlzLCBcImFyaWEtY29sY291bnRcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogRGVmaW5lcyBhbiBlbGVtZW50J3MgY29sdW1uIGluZGV4IG9yIHBvc2l0aW9uIHdpdGggcmVzcGVjdCB0byB0aGUgdG90YWwgbnVtYmVyIG9mIGNvbHVtbnMgXG5cdFx0ICogd2l0aGluIGEge0BsaW5rIFRhYmxlfSwge0BsaW5rIEdyaWR9LCBvciB7QGxpbmsgVHJlZWdyaWR9LlxuXHRcdCAqIFxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI2NvbENvdW50fVxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI2NvbFNwYW59XG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWNvbGluZGV4XG5cdFx0ICogQHR5cGUgez9JbnRlZ2VyfVxuXHRcdCAqL1xuXHRcdFwiY29sSW5kZXhcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldCh2YWwpIHsgcmV0dXJuIGxvbmcuc2V0KHRoaXMsIFwiYXJpYS1jb2xpbmRleFwiLCB2YWwpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gbG9uZy5nZXQodGhpcywgXCJhcmlhLWNvbGluZGV4XCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIERlZmluZXMgdGhlIG51bWJlciBvZiBjb2x1bW5zIHNwYW5uZWQgYnkgYSBjZWxsIG9yIGdyaWRjZWxsXG5cdFx0ICogd2l0aGluIGEge0BsaW5rIFRhYmxlfSwge0BsaW5rIEdyaWR9LCBvciB7QGxpbmsgVHJlZWdyaWR9LlxuXHRcdCAqIFxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI2NvbEluZGV4fVxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI3Jvd1NwYW59XG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWNvbHNwYW5cblx0XHQgKiBAdHlwZSB7P0ludGVnZXJ9XG5cdFx0ICovXG5cdFx0XCJjb2xTcGFuXCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQodmFsKSB7IHJldHVybiBsb25nLnNldCh0aGlzLCBcImFyaWEtY29sc3BhblwiLCB2YWwpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gbG9uZy5nZXQodGhpcywgXCJhcmlhLWNvbHNwYW5cIik7IH1cblx0XHR9LFxuXHRcdFx0XG5cdFx0LyoqXG5cdFx0ICogRGVmaW5lcyBhbiBlbGVtZW50J3MgbnVtYmVyIG9yIHBvc2l0aW9uIGluIHRoZSBjdXJyZW50IHNldCBvZiB7QGxpbmsgbGlzdGl0ZW19cyBvciB7QGxpbmsgdHJlZWl0ZW19cy5cblx0XHQgKiBOb3QgcmVxdWlyZWQgaWYgYWxsIGVsZW1lbnRzIGluIHRoZSBzZXQgYXJlIHByZXNlbnQgaW4gdGhlIERPTS5cblx0XHQgKiBcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNzZXRTaXplfVxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1wb3NpbnNldFxuXHRcdCAqIEB0eXBlIHs/SW50ZWdlcn1cblx0XHQgKi9cblx0XHRcInBvc0luU2V0XCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQodmFsKSB7IHJldHVybiBsb25nLnNldCh0aGlzLCBcImFyaWEtcG9zaW5zZXRcIiwgdmFsKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGxvbmcuZ2V0KHRoaXMsIFwiYXJpYS1wb3NpbnNldFwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBEZWZpbmVzIHRoZSB0b3RhbCBudW1iZXIgb2Ygcm93cyBpbiBhIHtAbGluayBUYWJsZX0sIHtAbGluayBHcmlkfSwgb3Ige0BsaW5rIFRyZWVncmlkfS5cblx0XHQgKiBcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNyb3dJbmRleH1cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtcm93Y291bnRcblx0XHQgKiBAdHlwZSB7P0ludGVnZXJ9XG5cdFx0ICovXG5cdFx0XCJyb3dDb3VudFwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHZhbCkgeyByZXR1cm4gbG9uZy5zZXQodGhpcywgXCJhcmlhLXJvd2NvdW50XCIsIHZhbCk7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBsb25nLmdldCh0aGlzLCBcImFyaWEtcm93Y291bnRcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogRGVmaW5lcyBhbiBlbGVtZW50J3Mgcm93IGluZGV4IG9yIHBvc2l0aW9uIHdpdGggcmVzcGVjdCB0byB0aGUgdG90YWwgbnVtYmVyIG9mIHJvd3MgXG5cdFx0ICogd2l0aGluIGEgIHtAbGluayBUYWJsZX0sIHtAbGluayBHcmlkfSwgb3Ige0BsaW5rIFRyZWVncmlkfS5cblx0XHQgKiBcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNyb3dDb3VudH1cblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNyb3dTcGFufVxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1yb3dpbmRleFxuXHRcdCAqIEB0eXBlIHs/SW50ZWdlcn1cblx0XHQgKi9cblx0XHRcInJvd0luZGV4XCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQodmFsKSB7IHJldHVybiBsb25nLnNldCh0aGlzLCBcImFyaWEtcm93aW5kZXhcIiwgdmFsKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGxvbmcuZ2V0KHRoaXMsIFwiYXJpYS1yb3dpbmRleFwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBEZWZpbmVzIHRoZSBudW1iZXIgb2Ygcm93cyBzcGFubmVkIGJ5IGEgY2VsbCBvciBncmlkY2VsbFxuXHRcdCAqIHdpdGhpbiBhIHtAbGluayBUYWJsZX0sIHtAbGluayBHcmlkfSwgb3Ige0BsaW5rIFRyZWVncmlkfS5cblx0XHQgKiBcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNyb3dJbmRleH1cblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNjb2xTcGFufVxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1yb3dzcGFuXG5cdFx0ICogQHR5cGUgez9JbnRlZ2VyfVxuXHRcdCAqL1xuXHRcdFwicm93U3BhblwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHZhbCkgeyByZXR1cm4gbG9uZy5zZXQodGhpcywgXCJhcmlhLXJvd3NwYW5cIiwgdmFsKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGxvbmcuZ2V0KHRoaXMsIFwiYXJpYS1yb3dzcGFuXCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIERlZmluZXMgdGhlIG51bWJlciBvZiBpdGVtcyBpbiB0aGUgY3VycmVudCBzZXQgb2YgbGlzdGl0ZW1zIG9yIHRyZWVpdGVtcy5cblx0XHQgKiBOb3QgcmVxdWlyZWQgaWYgKiphbGwqKiBlbGVtZW50cyBpbiB0aGUgc2V0IGFyZSBwcmVzZW50IGluIHRoZSBET00uXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjcG9zSW5TZXR9XG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXNldHNpemVcblx0XHQgKiBAdHlwZSB7P0ludGVnZXJ9XG5cdFx0ICovXG5cdFx0XCJzZXRTaXplXCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQodmFsKSB7IHJldHVybiBsb25nLnNldCh0aGlzLCBcImFyaWEtc2V0c2l6ZVwiLCB2YWwpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gbG9uZy5nZXQodGhpcywgXCJhcmlhLXNldHNpemVcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogRGVmaW5lcyB0aGUgaGllcmFyY2hpY2FsIGxldmVsIG9mIGFuIGVsZW1lbnQgd2l0aGluIGEgc3RydWN0dXJlLlxuXHRcdCAqIEUuZy4gYDxoMT48aDEvPmAgZXF1YWxzIGA8ZGl2IHJvbGU9XCJoZWFkaW5nXCIgYXJpYS1sZXZlbD1cIjFcIj48L2Rpdj5gXG5cdFx0ICogXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWxldmVsXG5cdFx0ICogQHR5cGUgez9JbnRlZ2VyfVxuXHRcdCAqL1xuXHRcdFwibGV2ZWxcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldCh2YWwpIHsgcmV0dXJuIGxvbmcuc2V0KHRoaXMsIFwiYXJpYS1sZXZlbFwiLCB2YWwpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gbG9uZy5nZXQodGhpcywgXCJhcmlhLWxldmVsXCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqIEVORCBPRiBDT0xMRUNUSU9OUyAqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXHR9XG4pO1xuXG5mdW5jdGlvbiBzZXRBY2Nlc3NpYmxlTm9kZShheSwgYXR0cmlidXRlLCBhbikge1xuXHRpZiAoIWFuKSByZXR1cm4gYXkuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlKTtcblxuXHRpZiAoIShhbiBpbnN0YW5jZW9mIEFjY2Vzc2libGVOb2RlKSkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkl0IG11c3QgYmUgYW4gaW5zdGFuY2Ugb2YgQWNjZXNzaWJsZU5vZGVcIik7XG5cdH1cblx0aWYgKCFhbi5lbGVtZW50LmlkKSB7IHRocm93IG5ldyBFcnJvcihcIkVsZW1lbnQgbXVzdCBoYXZlIGFuIElEXCIpOyB9XG5cblx0YXkuZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlLCBhbi5lbGVtZW50LmlkKTtcbn1cbmZ1bmN0aW9uIGdldEFjY2Vzc2libGVOb2RlKGF5LCBhdHRyaWJ1dGUpIHtcblx0dmFyIGlkID0gYXkuZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcblx0aWYgKCFpZCkgcmV0dXJuO1xuXG5cdHJldHVybiBlbGVtZW50cy5nZXQoYXkuZWxlbWVudC5vd25lckRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFjY2Vzc2libGVOb2RlOyIsImltcG9ydCBlbGVtZW50cyBmcm9tIFwiLi4vdXRpbHMvZWxlbWVudHNcIjtcbmltcG9ydCBBY2Nlc3NpYmxlTm9kZSBmcm9tIFwiLi9BY2Nlc3NpYmxlTm9kZVwiO1xuaW1wb3J0IGNyZWF0ZSBmcm9tIFwiLi8uLi91dGlscy9jcmVhdGVcIjtcblxuY2xhc3MgQWNjZXNzaWJsZU5vZGVMaXN0Q29uIGV4dGVuZHMgQXJyYXkge1xuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0c3VwZXIoLi4uYXJncyk7XG5cdH1cblxuXHRpdGVtKGluZGV4KSB7XG5cdFx0cmV0dXJuIHRoaXNbaW5kZXhdO1xuXHR9XG5cblx0YWRkKEFjY2Vzc2libGVOb2RlLCBiZWZvcmUgPSBudWxsKSB7XG5cdFx0aWYoYmVmb3JlICE9PSBudWxsKSB7XG5cdFx0XHR2YXIgYmVmb3JlSW5kZXggPSB0aGlzLmluZGV4T2YoYmVmb3JlKTtcblx0XHRcdGlmKGJlZm9yZUluZGV4ID4gLTEpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuc3BsaWNlKGJlZm9yZUluZGV4IC0gMSwgMCwgQWNjZXNzaWJsZU5vZGUpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5wdXNoKEFjY2Vzc2libGVOb2RlKTtcblx0fVxuXG5cdHJlbW92ZShpbmRleCkge1xuXHRcdHJldHVybiB0aGlzLnBvcChpbmRleCk7XG5cdH1cbn1cblxuZnVuY3Rpb24gZ2V0SWRzKG5vZGUsIGF0dHJpYnV0ZSkge1xuXHRsZXQgaWRTdHJpbmcgPSBub2RlLmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuXHRcblx0aWYgKCFpZFN0cmluZykgcmV0dXJuIG5ldyBBY2Nlc3NpYmxlTm9kZUxpc3RDb24oKTtcblxuXHRyZXR1cm4gbmV3IEFjY2Vzc2libGVOb2RlTGlzdENvbihpZFN0cmluZy5zcGxpdChcIiBcIikpO1xufVxuXG4vKipcbiAqIFxuICovXG5mdW5jdGlvbiBBY2Nlc3NpYmxlTm9kZUxpc3QoYXksIGF0dHJpYnV0ZSkge1xuXHQvLyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG5cdC8vIFx0X2VsZW1lbnQ6IHsgdmFsdWU6IGF5LmVsZW1lbnQsIGVudW1lcmFibGU6IGZhbHNlIH0sXG5cdC8vIFx0X2F0dHI6IHsgdmFsdWU6IGF0dHJpYnV0ZSwgZW51bWVyYWJsZTogZmFsc2UgfVxuXHQvLyB9KTtcblxuXHQvLyB0aGlzLl92YWx1ZSA9IHRoaXMuX2VsZW1lbnQuZ2V0QXR0cmlidXRlKHRoaXMuX2F0dHIpO1xuXHQvLyBpZighdGhpcy5fdmFsdWUpIHRoaXMuX3ZhbHVlID0gXCJcIjtcblx0bGV0IGlkcyA9IGdldElkcyhheS5lbGVtZW50LCBhdHRyaWJ1dGUpO1xuXG5cdC8vIC8vIFRoZSByZXN1bHQgY2FuIGJlIGFjY2Vzc2VkIHRocm91Z2ggdGhlIGBtYC12YXJpYWJsZS5cblx0Ly8gaWRzLmZvckVhY2goKGlkKSA9PiB7XG5cdC8vIFx0dmFyIGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuXHQvLyBcdGlmKGVsZW1lbnRzLmhhcyhlbCkpIHtcblx0Ly8gXHRcdHRoaXMuYWRkKGVsZW1lbnRzLmdldChlbCkpO1xuXHQvLyBcdH0gZWxzZSB7XG5cdC8vIFx0XHRlbGVtZW50cy5zZXQoZWwsIG5ldyBBY2Nlc3NpYmxlTm9kZS5kZWZhdWx0KGVsKSk7XG5cdC8vIFx0XHR0aGlzLmFkZChlbGVtZW50cy5nZXQoZWwpKTtcblx0Ly8gXHRcdC8vIGRlYnVnZ2VyO1xuXHQvLyBcdFx0Ly8gdG9kbzogY3JlYXRlIG5ldyBpbnN0YW5jZSBhbmQgcmV0dXJuIHRoYXQgLlxuXHQvLyBcdH1cblx0Ly8gfSk7XG5cblx0dmFyIGFycmF5Q2hhbmdlSGFuZGxlciA9IHtcblx0XHRnZXQ6IGZ1bmN0aW9uICh0YXJnZXQsIHByb3BlcnR5KSB7XG5cdFx0XHQvLyBlbGVtZW50IGlzIHJlcXVlc3RlZCB0cm91Z2h0IHRhcmdldFtOdW1iZXJdXG5cdFx0XHRpZiAoIWlzTmFOKHByb3BlcnR5KSAmJiB0YXJnZXRbcHJvcGVydHldKSB7XG5cdFx0XHRcdGxldCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldFtwcm9wZXJ0eV0pO1xuXG5cdFx0XHRcdGlmKCFlbCkge1xuXHRcdFx0XHRcdC8vIHRocm93IG5ldyBFcnJvcihcIkVsZW1lbnQgbm90IGZvdW5kXCIpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IGF1dG90aWxpdHk7XG5cdFx0XHRcdC8vIHByb3BlcnR5IGlzIGluZGV4IGluIHRoaXMgY2FzZVxuXHRcdFx0XHRpZiAoZWwpIHsgYXV0b3RpbGl0eSA9IGVsZW1lbnRzLmdldChlbCk7IH1cblx0XHRcdFx0aWYoIWF1dG90aWxpdHkpIHsgYXV0b3RpbGl0eSA9IGNyZWF0ZS5vbmUoZWwpOyB9XG5cdFx0XHRcdHJldHVybiBhdXRvdGlsaXR5O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGFyZ2V0W3Byb3BlcnR5XTtcblx0XHR9LFxuXHRcdHNldDogZnVuY3Rpb24gKHRhcmdldCwgcHJvcGVydHksIHZhbHVlKSB7XG5cdFx0XHQvLyBhZGRpbmcgb3IgY2hhbmdpbmcgYSB2YWx1ZSBpbnNpZGUgdGhlIGFycmF5XG5cdFx0XHRpZiAoIWlzTmFOKHByb3BlcnR5KSkge1xuXHRcdFx0XHQvLyBpcyBvZiB2YWxpZCB0eXBlXG5cdFx0XHRcdGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFjY2Vzc2libGVOb2RlKSB7XG5cdFx0XHRcdFx0aWYoIXZhbHVlLmVsZW1lbnQuaWQpIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlRoZSBlbGVtZW50IG11c3QgaGF2ZSBhbiBJRFwiKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGFyZ2V0W3Byb3BlcnR5XSA9IHZhbHVlLmVsZW1lbnQuaWQ7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIk9ubHkgaW5zdGFuY2VzIG9mIEFjY2Vzc2libGVOb2RlIGFyZSBhbGxvd2VkXCIpO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHR0YXJnZXRbcHJvcGVydHldID0gdmFsdWU7XG5cdFx0XHQvLyB5b3UgaGF2ZSB0byByZXR1cm4gdHJ1ZSB0byBhY2NlcHQgdGhlIGNoYW5nZXNcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fTtcblx0XG5cdHJldHVybiBuZXcgUHJveHkoaWRzLCBhcnJheUNoYW5nZUhhbmRsZXIpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBBY2Nlc3NpYmxlTm9kZUxpc3Q7IiwiZXhwb3J0IGNvbnN0IElTX0FDVElWRSA9IFwidHJ1ZVwiLCBJU19OT1RfQUNUSVZFID0gXCJmYWxzZVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0KGF5LCBhdHRyaWJ1dGVOYW1lKSB7XG5cdGlmKCFheS5lbGVtZW50Lmhhc0F0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKSkgcmV0dXJuO1xuXHRyZXR1cm4gYXkuZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXQoYXksIGF0dHJpYnV0ZU5hbWUsIHN0YXR1cykge1xuXHRpZihzdGF0dXMgPT0gdW5kZWZpbmVkKSB7XG5cdFx0YXkuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XG5cdH0gZWxzZSB7XG5cdFx0YXkuZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgc3RhdHVzKTtcblx0fVxuXG5cdHJldHVybiBzdGF0dXM7XG59XG5cbi8qKlxuKiBSZXR1cm5zIHRoZSBvcHBvc2l0ZSBzdGF0ZSBvZiB0aGUgYXR0cmlidXRlXG4qIEByZXR1cm4ge1N0cmluZ30gTmV3IHN0YXRlXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZShzdGF0ZSkge1xuXHRpZiAoc3RhdGUgPT0gSVNfQUNUSVZFKSB7XG5cdFx0c3RhdGUgPSBJU19OT1RfQUNUSVZFO1xuXHR9IGVsc2Uge1xuXHRcdHN0YXRlID0gSVNfQUNUSVZFO1xuXHR9XG5cdHJldHVybiBzdGF0ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgeyBJU19BQ1RJVkUsIElTX05PVF9BQ1RJVkUsIGdldCwgc2V0LCB0b2dnbGUgfTsiLCJleHBvcnQgY29uc3QgSVNfQUNUSVZFID0gdHJ1ZSwgSVNfTk9UX0FDVElWRSA9IGZhbHNlO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0KGF5LCBhdHRyaWJ1dGVOYW1lKSB7XG5cdGlmKCFheS5lbGVtZW50Lmhhc0F0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKSkgcmV0dXJuO1xuXHRyZXR1cm4gYXkuZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSkgID09IFwidHJ1ZVwiIHx8IGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0KGF5LCBhdHRyaWJ1dGVOYW1lLCBzdGF0dXMpIHtcblx0aWYoc3RhdHVzID09IHVuZGVmaW5lZCkge1xuXHRcdGF5LmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpO1xuXHR9IGVsc2Uge1xuXHRcdGF5LmVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUsIHN0YXR1cyk7XG5cdH1cblxuXHRyZXR1cm4gc3RhdHVzO1xufVxuXG4vKipcbiogUmV0dXJucyB0aGUgb3Bwb3NpdGUgc3RhdGUgb2YgdGhlIGF0dHJpYnV0ZVxuKiBAcmV0dXJuIHtCb29sZWFufSBOZXcgc3RhdGVcbiovXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlKHN0YXRlKSB7XG5cdGlmIChzdGF0ZSA9PSBJU19BQ1RJVkUpIHtcblx0XHRzdGF0ZSA9IElTX05PVF9BQ1RJVkU7XG5cdH0gZWxzZSB7XG5cdFx0c3RhdGUgPSBJU19BQ1RJVkU7XG5cdH1cblx0cmV0dXJuIHN0YXRlO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7IElTX0FDVElWRSwgSVNfTk9UX0FDVElWRSwgZ2V0LCBzZXQsIHRvZ2dsZSB9OyIsImV4cG9ydCBmdW5jdGlvbiBnZXQoYXV0b3RpbGl0eSwgYXR0cmlidXRlTmFtZSkge1xuXHRpZighYXV0b3RpbGl0eS5lbGVtZW50Lmhhc0F0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKSkgcmV0dXJuIG51bGw7XG5cblx0dmFyIGF0dHJWYWx1ZSA9IGF1dG90aWxpdHkuZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XG5cdGlmKGF0dHJWYWx1ZSA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG5cblx0cmV0dXJuIE51bWJlcihhdHRyVmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0KGF1dG90aWxpdHksIGF0dHJpYnV0ZU5hbWUsIHN0cikge1xuXHRpZihzdHIgPT0gbnVsbCkge1xuXHRcdGF1dG90aWxpdHkuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XG5cdH0gZWxzZSB7XG5cdFx0YXV0b3RpbGl0eS5lbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lLCBzdHIpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHsgZ2V0LCBzZXQgfTsiLCJleHBvcnQgZnVuY3Rpb24gZ2V0KGF5LCBhdHRyaWJ1dGVOYW1lKSB7XG5cdGlmICghYXkuZWxlbWVudC5oYXNBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSkpIHJldHVybiBudWxsO1xuXG5cdHZhciBhdHRyVmFsdWUgPSBheS5lbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcblx0aWYgKGF0dHJWYWx1ZSA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG5cblx0cmV0dXJuIE51bWJlcihhdHRyVmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0KGF5LCBhdHRyaWJ1dGVOYW1lLCBzdHIpIHtcblx0aWYgKHN0ciA9PSBudWxsKSB7XG5cdFx0YXkuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XG5cdH0gZWxzZSB7XG5cdFx0YXkuZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgc3RyKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCB7IGdldCwgc2V0IH07IiwiaW1wb3J0IHNlbGVjdG9yIGZyb20gXCIuL3NlbGVjdG9yXCI7XG5pbXBvcnQgZWxlbWVudHMgZnJvbSBcIi4vZWxlbWVudHNcIjtcbmltcG9ydCBnZXRDb21wdXRlZFJvbGUgZnJvbSBcIi4vZ2V0Q29tcHV0ZWRSb2xlXCI7XG5cbmltcG9ydCBSYW5nZSBmcm9tIFwiLi8uLi9yb2xlL2Fic3RyYWN0L1JhbmdlXCI7XG5pbXBvcnQgUm9sZXR5cGUgZnJvbSBcIi4vLi4vcm9sZS9hYnN0cmFjdC9Sb2xldHlwZVwiO1xuXG5pbXBvcnQgQnV0dG9uIGZyb20gXCIuLy4uL3JvbGUvQnV0dG9uXCI7XG5pbXBvcnQgQ2hlY2tib3ggZnJvbSBcIi4vLi4vcm9sZS9DaGVja2JveFwiO1xuaW1wb3J0IENvbWJvYm94IGZyb20gXCIuLy4uL3JvbGUvQ29tYm9ib3hcIjtcbmltcG9ydCBEaWFsb2cgZnJvbSBcIi4vLi4vcm9sZS9EaWFsb2dcIjtcbmltcG9ydCBGb3JtIGZyb20gXCIuLy4uL3JvbGUvRm9ybVwiO1xuaW1wb3J0IExpc3Rib3ggZnJvbSBcIi4vLi4vcm9sZS9MaXN0Ym94XCI7XG5pbXBvcnQgT3B0aW9uIGZyb20gXCIuLy4uL3JvbGUvb3B0aW9uXCI7XG5pbXBvcnQgU2xpZGVyIGZyb20gXCIuLy4uL3JvbGUvU2xpZGVyXCI7XG5pbXBvcnQgU3BpbmJ1dHRvbiBmcm9tIFwiLi8uLi9yb2xlL1NwaW5idXR0b25cIjtcbmltcG9ydCBUYWIgZnJvbSBcIi4vLi4vcm9sZS9UYWJcIjtcbmltcG9ydCBUYWJsaXN0IGZyb20gXCIuLy4uL3JvbGUvVGFibGlzdFwiO1xuaW1wb3J0IFRhYnBhbmVsIGZyb20gXCIuLy4uL3JvbGUvVGFicGFuZWxcIjtcbmltcG9ydCBUZXh0Ym94IGZyb20gXCIuLy4uL3JvbGUvVGV4dGJveFwiO1xuXG52YXIgb2JqID0geyBidXR0b246IEJ1dHRvbiwgY2hlY2tib3g6IENoZWNrYm94LCBjb21ib2JveDogQ29tYm9ib3gsIGRpYWxvZzogRGlhbG9nLCBmb3JtOiBGb3JtLCBsaXN0Ym94OiBMaXN0Ym94LCBcblx0b3B0aW9uczogT3B0aW9uLCByYW5nZTogUmFuZ2UsIHJvbGV0eXBlOiBSb2xldHlwZSwgc2xpZGVyOiBTbGlkZXIsIHNwaW5idXR0b246IFNwaW5idXR0b24sXG5cdHRhYjogVGFiLCB0YWJsaXN0OiBUYWJsaXN0LCB0YWJwYW5lbDogVGFicGFuZWwsIHRleGJveDogVGV4dGJveH07XG5cbmZ1bmN0aW9uIGFsbCgpIHtcblx0Zm9yIChsZXQga2V5IGluIG9iaikge1xuXHRcdHZhciBub2RlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IuZ2V0Um9sZShrZXkpKTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRlbGVtZW50cy5zZXQobm9kZUxpc3RbaV0sIG5ldyBvYmpba2V5XShub2RlTGlzdFtpXSkpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBvbmUoZWwpIHtcblx0aWYoZWxlbWVudHMuaGFzKGVsKSkgcmV0dXJuIGVsZW1lbnRzLmdldChlbCk7XG5cdHZhciByb2xlID0gZ2V0Q29tcHV0ZWRSb2xlKGVsKTtcblx0Y29uc29sZS5sb2coZWwsIHJvbGUpO1xuXHRyZXR1cm4gZWxlbWVudHMuc2V0KGVsLCBuZXcgb2JqW3JvbGVdKGVsKSk7XG59XG5cbmZ1bmN0aW9uIGluc3RhbmNlT2YoYXksIHJvbGUpIHtcblx0cmV0dXJuIGF5IGluc3RhbmNlb2Ygb2JqW3JvbGVdO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7YWxsLCBvbmUsIGluc3RhbmNlT2Z9O1xuXG4vLyByb2xlcy5mb3JFYWNoKChSb2xlKSA9PiB7XG4vLyBcdHZhciBub2RlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuLy8gXHRmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4vLyBcdFx0ZWxlbWVudHMuc2V0KG5vZGVMaXN0W2ldLCBuZXcgUm9sZShub2RlTGlzdFtpXSkpO1xuLy8gXHR9XG5cbi8vIFx0Ly8gaWYocm9sZS5vcHRpb25zICYmIHJvbGUub3B0aW9ucy5zZWxlY3RvcnNXaXRoSW1wbGljaXRSb2xlKSB7XG4vLyBcdC8vIFx0dmFyIGh0bWxOb2RlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocm9sZS5vcHRpb25zLnNlbGVjdG9yc1dpdGhJbXBsaWNpdFJvbGUuam9pbihcIixcIikpO1xuLy8gXHQvLyBcdGZvciAobGV0IGogPSAwOyBqIDwgaHRtbE5vZGVMaXN0Lmxlbmd0aDsgaisrKSB7XG4vLyBcdC8vIFx0XHRlbGVtZW50cy5zZXQoaHRtbE5vZGVMaXN0W2pdLCBuZXcgcm9sZS5kZWZhdWx0KGh0bWxOb2RlTGlzdFtqXSkpO1xuLy8gXHQvLyBcdH1cbi8vIFx0Ly8gfVxuLy8gfSk7IiwiaW1wb3J0IGNyZWF0ZSBmcm9tIFwiLi9jcmVhdGVcIjtcbmltcG9ydCBnZXRDb21wdXRlZFJvbGUgZnJvbSBcIi4vZ2V0Q29tcHV0ZWRSb2xlXCI7XG5cbnZhciBheUluc3RhbmNlcyA9IG5ldyBXZWFrTWFwKCk7XG5cbi8vIHRvZG86IGxvb3AgdGhyb3VnaCBwcmVzZW50YXRpb25hbCByb2xlc1xuZXhwb3J0IGZ1bmN0aW9uIGdldFBhcmVudChheSwgcm9sZSkge1xuXHRpZihheS5lbGVtZW50LnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKFwicm9sZVwiKS50b0xvd2VyQ2FzZSgpID09IHJvbGUpIHtcblx0XHRpZihheUluc3RhbmNlcy5oYXMoYXkuZWxlbWVudC5wYXJlbnROb2RlKSkge1xuXHRcdFx0cmV0dXJuIGF5SW5zdGFuY2VzLmdldChheS5lbGVtZW50LnBhcmVudE5vZGUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gY3JlYXRlLm9uZShheS5lbGVtZW50LnBhcmVudE5vZGUpO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxuLyoqIEB0b2RvIGZpbmQgb25seSBgZGlyZWN0YCBjaGlsZHJlbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENoaWxkcmVuKGF5LCByb2xlKSB7XG5cdHZhciByZXN1bHRzID0gW107XG5cdHZhciBvd25zID0gQXJyYXkuZnJvbShheS5lbGVtZW50LmNoaWxkcmVuKS5jb25jYXQoYXkub3ducyk7XG5cblx0b3ducy5mb3JFYWNoKGNoaWxkID0+IHtcblx0XHRpZiAoIXJvbGUgfHwgKHJvbGUgJiYgZ2V0Q29tcHV0ZWRSb2xlKGNoaWxkKSA9PSByb2xlKSkge1xuXHRcdFx0aWYgKGF5SW5zdGFuY2VzLmhhcyhjaGlsZCkpIHtcblx0XHRcdFx0cmVzdWx0cy5wdXNoKGF5SW5zdGFuY2VzLmdldChjaGlsZCkpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmVzdWx0cy5wdXNoKGNyZWF0ZS5vbmUoY2hpbGQpKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBvd25zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJldihjaGlsZCwgcGFyZW50LCByb2xlKSB7XG5cdGlmKCFwYXJlbnQpIHJldHVybiBmYWxzZTtcblxuXHRsZXQgY2hpbGRyZW4gPSBnZXRDaGlsZHJlbihwYXJlbnQsIHJvbGUpO1xuXHRsZXQgaW5kZXhQcmV2RWxlbWVudCA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoY2hpbGRyZW4sIGNoaWxkKSAtIDE7XG5cdGlmKGluZGV4UHJldkVsZW1lbnQgPCAwKSByZXR1cm4gZmFsc2U7XG5cblx0cmV0dXJuIGNoaWxkcmVuW2luZGV4UHJldkVsZW1lbnRdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV4dChjaGlsZCwgcGFyZW50LCByb2xlKSB7XG5cdGlmKCFwYXJlbnQpIHJldHVybiBmYWxzZTtcblxuXHRsZXQgY2hpbGRyZW4gPSBnZXRDaGlsZHJlbihwYXJlbnQsIHJvbGUpO1xuXHRsZXQgaW5kZXhOZXh0ID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChjaGlsZHJlbiwgY2hpbGQpICsgMTtcblx0aWYoaW5kZXhOZXh0ID49IGNoaWxkcmVuLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuXG5cdHJldHVybiBjaGlsZHJlbltpbmRleE5leHRdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhcnQoY2hpbGQsIHBhcmVudCwgcm9sZSkge1xuXHRpZighcGFyZW50KSByZXR1cm4gZmFsc2U7XG5cdGxldCBjaGlsZHJlbiA9IGdldENoaWxkcmVuKHBhcmVudCwgcm9sZSk7XG5cdHJldHVybiBjaGlsZHJlblswXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVuZChjaGlsZCwgcGFyZW50LCByb2xlKSB7XG5cdGlmKCFwYXJlbnQpIHJldHVybiBmYWxzZTtcblx0bGV0IGNoaWxkcmVuID0gZ2V0Q2hpbGRyZW4ocGFyZW50LCByb2xlKTtcblx0cmV0dXJuIGNoaWxkcmVuW2NoaWxkcmVuLmxlbmd0aCAtIDFdO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG5cdG1hcDogYXlJbnN0YW5jZXMsXG5cdGdldDogYXlJbnN0YW5jZXMuZ2V0LmJpbmQoYXlJbnN0YW5jZXMpLFxuXHRzZXQ6IGF5SW5zdGFuY2VzLnNldC5iaW5kKGF5SW5zdGFuY2VzKSxcblx0aGFzOiBheUluc3RhbmNlcy5oYXMuYmluZChheUluc3RhbmNlcyksXG5cdGdldENoaWxkcmVuLFxuXHRnZXRQYXJlbnQsXG5cdGdldFByZXYsXG5cdGdldE5leHQsXG5cdGdldFN0YXJ0LFxuXHRnZXRFbmRcbn07IiwiaW1wb3J0IGVsZW1lbnRzIGZyb20gXCIuL2VsZW1lbnRzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXHRsZXQgYXkgPSBlbGVtZW50cy5nZXQoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XG5cblx0aWYoIWF5KSByZXR1cm47XG5cdGlmKGF5LmFjdGl2ZURlc2NlbmRhbnQpIHJldHVybiBheS5hY3RpdmVEZXNjZW5kYW50O1xuXG5cdHJldHVybiBheTtcbn0iLCIvKipcbiAqIEZvbGxvd3MgaHR0cHM6Ly93d3cudzMub3JnL1RSLzIwMTcvV0QtaHRtbC1hcmlhLTIwMTcxMDEzLyNkb2Njb25mb3JtYW5jZVxuICovXG5cbi8qKlxuICogQWxsIGFyaWEgcm9sZXNcbiAqIEB0eXBlIHtBcnJheX1cbiovXG5pbXBvcnQgcm9sZXMgZnJvbSBcIi4vLi4vZGF0YS9yb2xlcy5qc1wiO1xuXG4vKipcbiAqIFN0b3JlcyBpbmZvIHdoaWNoIGlzIHVzZWQgaW4gZnVuY3Rpb25zIG9mIHJvbGVQZXJIVE1MVGFnLFxuICogbW9zdGx5IGEga2V5IGFzIHRhZ05hbWUgd2l0aCBhbiBhcnJheSBvZiBhbGxvd2VkIHJvbGVzIGZvciB0aGF0IHRhZ1xuICogQHR5cGUge09iamVjdH1cbiAqL1xudmFyIGFsbG93ZWRSb2xlcyA9IHtcblx0XCJhV2l0aEhyZWZcIjogW1xuXHRcdFwiYnV0dG9uXCIsIFwiY2hlY2tib3hcIiwgXCJtZW51aXRlbVwiLCBcIm1lbnVpdGVtY2hlY2tib3hcIiwgXCJtZW51aXRlbXJhZGlvXCIsXG5cdFx0XCJvcHRpb25cIiwgXCJyYWRpb1wiLCBcInN3aXRjaFwiLCBcInRhYlwiLCBcInRyZWVpdGVtXCIsIFwiZG9jLWJhY2tsaW5rXCIsXG5cdFx0XCJkb2MtYmlibGlvcmVmXCIsIFwiZG9jLWdsb3NzcmVmXCIsIFwiZG9jLW5vdGVyZWZcIlxuXHRdLFxuXHRcImFydGljbGVcIjogW1xuXHRcdFwiZmVlZFwiLCBcInByZXNlbnRhdGlvblwiLCBcIm5vbmVcIiwgXCJkb2N1bWVudFwiLCBcImFwcGxpY2F0aW9uXCIsIFwibWFpblwiLCBcInJlZ2lvblwiXG5cdF0sXG5cdFwiYXNpZGVcIjogW1xuXHRcdFwiZmVlZFwiLCBcIm5vdGVcIiwgXCJwcmVzZW50YXRpb25cIiwgXCJub25lXCIsIFwicmVnaW9uXCIsIFwic2VhcmNoXCIsIFwiZG9jLWV4YW1wbGVcIixcblx0XHRcImRvYy1mb290bm90ZVwiLCBcImRvYy1wdWxscXVvdGVcIiwgXCJkb2MtdGlwXCJcblx0XSxcblx0XCJidXR0b25cIjogW1xuXHRcdFwiY2hlY2tib3hcIiwgXCJsaW5rXCIsIFwibWVudWl0ZW1cIiwgXCJtZW51aXRlbWNoZWNrYm94XCIsIFwibWVudWl0ZW1yYWRpb1wiLFxuXHRcdFwib3B0aW9uXCIsIFwicmFkaW9cIiwgXCJzd2l0Y2hcIiwgXCJ0YWJcIlxuXHRdLFxuXHRcImRsXCI6IFtcImdyb3VwXCIsIFwicHJlc2VudGF0aW9uXCIsIFwibm9uZVwiLCBcImRvYy1nbG9zc2FyeVwiXSxcblx0XCJlbWJlZFwiOiBbIFwiYXBwbGljYXRpb25cIiwgXCJkb2N1bWVudFwiLCBcInByZXNlbnRhdGlvblwiLCBcIm5vbmVcIiwgXCJpbWdcIiBdLFxuXHRcImZpZ2NhcHRpb25cIjogWyBcImdyb3VwXCIsIFwicHJlc2VudGF0aW9uXCIsIFwibm9uZVwiIF0sXG5cdFwiZmllbGRzZXRcIjogXHRbIFwiZ3JvdXBcIiwgXCJwcmVzZW50YXRpb25cIiwgXCJub25lXCIgXSxcblx0XCJmb290ZXJcIjogWyBcImdyb3VwXCIsIFwibm9uZVwiLCBcInByZXNlbnRhdGlvblwiLCBcImRvYy1mb290bm90ZVwiIF0sXG5cdFwiZm9ybVwiOiBbIFwic2VhcmNoXCIsIFwibm9uZVwiLCBcInByZXNlbnRhdGlvblwiIF0sXG5cdFwiaDFUb2g2XCI6IFsgXCJ0YWJcIiwgXCJub25lXCIsIFwicHJlc2VudGF0aW9uXCIsIFwiZG9jLXN1YnRpdGxlXCIgXSxcblx0XCJoZWFkZXJcIjogWyBcImdyb3VwXCIsIFwibm9uZVwiLCBcInByZXNlbnRhdGlvblwiLCBcImRvYy1mb290bm90ZVwiIF0sXG5cdFwiaHJcIjogWyBcInByZXNlbnRhdGlvblwiLCBcImRvYy1wYWdlYnJlYWtcIiBdLFxuXHRcImlmcmFtZVwiOiBbIFwiYXBwbGljYXRpb25cIiwgXCJkb2N1bWVudFwiLCBcImltZ1wiIF0sXG5cdFwiaW1nV2l0aEVtcHR5QWx0XCI6IFsgXCJwcmVzZW50YXRpb25cIiwgXCJub25lXCIgXSxcblx0XCJpbnB1dFR5cGVCdXR0b25cIjogW1xuXHRcdFwibGluaywgbWVudWl0ZW1cIiwgXCJtZW51aXRlbWNoZWNrYm94XCIsIFwibWVudWl0ZW1yYWRpb1wiLCBcInJhZGlvXCIsIFwic3dpdGNoXCIsXG5cdFx0XCJvcHRpb25cIiwgXCJ0YWJcIlxuXHRdLFxuXHRcImlucHV0VHlwZUltYWdlXCI6IFtcblx0XHRcImxpbmtcIiwgXCJtZW51aXRlbVwiLCBcIm1lbnVpdGVtY2hlY2tib3hcIiwgXCJtZW51aXRlbXJhZGlvXCIsIFwicmFkaW9cIiwgXCJzd2l0Y2hcIlxuXHRdLFxuXHRcImlucHV0VHlwZUNoZWNrYm94XCI6IFsgXCJidXR0b25cIiwgXCJtZW51aXRlbWNoZWNrYm94XCIsIFwib3B0aW9uXCIsIFwic3dpdGNoXCIgXSxcblx0XCJsaVwiOiBbXG5cdFx0XCJtZW51aXRlbVwiLCBcIm1lbnVpdGVtY2hlY2tib3hcIiwgXCJtZW51aXRlbXJhZGlvXCIsIFwib3B0aW9uXCIsIFwibm9uZVwiLFxuXHRcdFwicHJlc2VudGF0aW9uXCIsIFwicmFkaW9cIiwgXCJzZXBhcmF0b3JcIiwgXCJ0YWJcIiwgXCJ0cmVlaXRlbVwiLCBcImRvYy1iaWJsaW9lbnRyeVwiLFxuXHRcdFwiZG9jLWVuZG5vdGVcIlxuXHRdLFxuXHRcIm5hdlwiOiBbIFwiZG9jLWluZGV4XCIsIFwiZG9jLXBhZ2VsaXN0XCIsIFwiZG9jLXRvY1wiIF0sXG5cdFwib2JqZWN0XCI6IFsgXCJhcHBsaWNhdGlvblwiLCBcImRvY3VtZW50XCIsIFwiaW1nXCIgXSxcblx0XCJvbFwiOiBbXG5cdFx0XCJkaXJlY3RvcnlcIiwgXCJncm91cFwiLCBcImxpc3Rib3hcIiwgXCJtZW51XCIsIFwibWVudWJhcixub25lXCIsIFwicHJlc2VudGF0aW9uIFwiLFxuXHRcdFwicmFkaW9ncm91cFwiLCBcInRhYmxpc3RcIiwgXCJ0b29sYmFyXCIsIFwidHJlZVwiXG5cdF0sXG5cdFwic2VjdGlvblwiOiBbXG5cdFx0XCJhbGVydFwiLCBcImFsZXJ0ZGlhbG9nXCIsIFwiYXBwbGljYXRpb25cIiwgXCJiYW5uZXJcIiwgXCJjb21wbGVtZW50YXJ5XCIsXG5cdFx0XCJjb250ZW50aW5mb1wiLCBcImRpYWxvZ1wiLCBcImRvY3VtZW50XCIsIFwiZmVlZFwiLCBcImxvZ1wiLCBcIm1haW5cIiwgXCJtYXJxdWVlXCIsXG5cdFx0XCJuYXZpZ2F0aW9uXCIsIFwibm9uZVwiLCBcInByZXNlbnRhdGlvblwiLCBcInNlYXJjaFwiLCBcInN0YXR1c1wiLCBcInRhYnBhbmVsXCIsXG5cdFx0XCJkb2MtYWJzdHJhY3RcIiwgXCJkb2MtYWNrbm93bGVkZ21lbnRzXCIsIFwiZG9jLWFmdGVyd29yZFwiLCBcImRvYy1hcHBlbmRpeFwiLFxuXHRcdFwiZG9jLWJpYmxpb2dyYXBoeVwiLCBcImRvYy1jaGFwdGVyXCIsIFwiZG9jLWNvbG9waG9uXCIsIFwiZG9jLWNvbmNsdXNpb25cIixcblx0XHRcImRvYy1jcmVkaXRcIiwgXCJkb2MtY3JlZGl0c1wiLCBcImRvYy1kZWRpY2F0aW9uXCIsIFwiZG9jLWVuZG5vdGVzXCIsIFwiZG9jLWVwaWxvZ3VlXCIsXG5cdFx0XCJkb2MtZXJyYXRhXCIsIFwiZG9jLWV4YW1wbGVcIiwgXCJkb2MtZm9yZXdvcmRcIiwgXCJkb2MtaW5kZXhcIiwgXCJkb2MtaW50cm9kdWN0aW9uXCIsXG5cdFx0XCJkb2Mtbm90aWNlXCIsIFwiZG9jLXBhZ2VsaXN0XCIsIFwiZG9jLXBhcnRcIiwgXCJkb2MtcHJlZmFjZVwiLCBcImRvYy1wcm9sb2d1ZVwiLFxuXHRcdFwiZG9jLXB1bGxxdW90ZVwiLCBcImRvYy1xbmFcIiwgXCJkb2MtdG9jXCJcblx0XSxcblx0XCJzdmdcIjogWyBcImFwcGxpY2F0aW9uXCIsIFwiZG9jdW1lbnRcIiwgXCJpbWdcIiBdLFxuXHRcInVsXCI6IFtcblx0XHRcImRpcmVjdG9yeVwiLCBcImdyb3VwXCIsIFwibGlzdGJveFwiLCBcIm1lbnVcIiwgXCJtZW51YmFyXCIsIFwicmFkaW9ncm91cFwiLFxuXHRcdFwidGFibGlzdFwiLCBcInRvb2xiYXJcIiwgXCJ0cmVlXCIsIFwicHJlc2VudGF0aW9uXCJcblx0XVxufTtcblxuLyoqXG4gKiBDb250YWlucyBhIGZ1bmN0aW9uIGZvciBlYWNoIGh0bWxUYWcgd2hlcmUgbm90IGFsbCByb2xlcyBhbGxvd2VkXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG52YXIgcm9sZVBlckhUTUxUYWcgPSB7XG5cdGE6IChlbCwgcm9sZSkgPT4ge1xuXHRcdGlmKGVsLmhyZWYpIHtcblx0XHRcdHJldHVybiBoYXNBbGxvd2VkUm9sZShcImFXaXRoSHJlZlwiLCByb2xlKSA/IHJvbGUgOiBcImxpbmtcIjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHJvbGU7XG5cdFx0fVxuXHR9LFxuXHRhcmVhOiAoZWwsIHJvbGUpID0+IHtcblx0XHRpZihlbC5ocmVmKSByZXR1cm4gcm9sZSA/IG51bGwgOiBcImxpbmtcIjtcblx0XHRyZXR1cm4gcm9sZTtcblx0fSxcblx0YXJ0aWNsZTogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcImFydGljbGVcIiwgcm9sZSkgPyByb2xlIDogXCJhcnRpY2xlXCIsXG5cdGFzaWRlOiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwiYXNpZGVcIiwgcm9sZSkgPyByb2xlIDogXCJjb21wbGVtZW50YXJ5XCIsXG5cdGF1ZGlvOiAoZWwsIHJvbGUpID0+IHJvbGUgPT0gXCJhcHBsaWNhdGlvblwiID8gXCJhcHBsaWNhdGlvblwiIDogbnVsbCxcblx0YmFzZTogKCkgPT4gbnVsbCxcblx0Ym9keTogKCkgPT4gXCJkb2N1bWVudFwiLFxuXHRidXR0b246IChlbCwgcm9sZSkgPT4ge1xuXHRcdGlmKGVsLnR5cGUgPT0gXCJtZW51XCIpIHtcblx0XHRcdHJldHVybiByb2xlID09IFwibWVudWl0ZW1cIiA/IFwibWVudWl0ZW1cIiA6IFwiYnV0dG9uXCI7XG5cdFx0fVxuXHRcdHJldHVybiBoYXNBbGxvd2VkUm9sZShcImJ1dHRvblwiLCByb2xlKSA/IHJvbGUgOiBcImJ1dHRvblwiO1xuXHR9LFxuXHRjYXB0aW9uOiAoKSA9PiBudWxsLFxuXHRjb2w6ICgpID0+IG51bGwsXG5cdGNvbGdyb3VwOiAoKSA9PiBudWxsLFxuXHRkYXRhbGlzdDogKCkgPT4gXCJsaXN0Ym94XCIsXG5cdGRkOiAoKSA9PiBcImRlZmluaXRpb25cIixcblx0ZGV0YWlsczogKCkgPT4gXCJncm91cFwiLFxuXHRkaWFsb2c6IChlbCwgcm9sZSkgPT4gcm9sZSA9PSBcImFsZXJ0ZGlhbG9nXCIgPyBcImFsZXJ0ZGlhbG9nXCIgOiBcImRpYWxvZ1wiLFxuXHRkbDogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcImRsXCIsIHJvbGUpID8gcm9sZSA6IFwibGlzdFwiLFxuXHRkdDogKCkgPT4gXCJsaXN0aXRlbVwiLFxuXHRlbWJlZDogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcImVtYmVkXCIsIHJvbGUpID8gcm9sZSA6IG51bGwsXG5cdGZpZ2NhcHRpb246IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJmaWdjYXB0aW9uXCIsIHJvbGUpID8gcm9sZSA6IG51bGwsXG5cdGZpZWxkc2V0OiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwiZmllbGRzZXRcIiwgcm9sZSk/IHJvbGUgOiBudWxsLFxuXHRmaWd1cmU6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJmaWd1cmVcIiwgcm9sZSkgPyByb2xlIDogXCJmaWd1cmVcIixcblx0Zm9vdGVyOiAoZWwsIHJvbGUpID0+IHtcblx0XHRsZXQgaGFzSW1wbGljaXRDb250ZW50aW5mb1JvbGUgPSAhZ2V0UGFyZW50V2l0aFRhZ05hbWUoZWwsIFtcIkFSVElDTEVcIiwgXCJBU0lERVwiLCBcIk1BSU5cIiwgXCJOQVZcIiwgXCJTRUNUSU9OXCJdKTtcblx0XHRsZXQgaGFzQWxsb3dlZFJvbGUgPSBoYXNBbGxvd2VkUm9sZShcImZvb3RlclwiLCByb2xlKTtcblx0XHRpZihoYXNBbGxvd2VkUm9sZSl7XG5cdFx0XHRyZXR1cm4gcm9sZTtcblx0XHR9IGVsc2UgaWYgKGhhc0ltcGxpY2l0Q29udGVudGluZm9Sb2xlKSB7XG5cdFx0XHRyZXR1cm4gXCJjb250ZW50aW5mb1wiO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH0sXG5cdGZvcm06IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJmb3JtXCIsIHJvbGUpID8gcm9sZSA6IFwiZm9ybVwiLFxuXHRoMTogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcImgxVG9oNlwiLCByb2xlKSA/IHJvbGUgOiBcImhlYWRpbmdcIixcblx0aDI6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJoMVRvaDZcIiwgcm9sZSkgPyByb2xlIDogXCJoZWFkaW5nXCIsXG5cdGgzOiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwiaDFUb2g2XCIsIHJvbGUpID8gcm9sZSA6IFwiaGVhZGluZ1wiLFxuXHRoNDogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcImgxVG9oNlwiLCByb2xlKSA/IHJvbGUgOiBcImhlYWRpbmdcIixcblx0aDU6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJoMVRvaDZcIiwgcm9sZSkgPyByb2xlIDogXCJoZWFkaW5nXCIsXG5cdGg2OiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwiaDFUb2g2XCIsIHJvbGUpID8gcm9sZSA6IFwiaGVhZGluZ1wiLFxuXHRoZWFkOiAoKSA9PiBudWxsLFxuXHRoZWFkZXI6IChlbCwgcm9sZSkgPT4ge1xuXHRcdGxldCBoYXNJbXBsaWNpdEJhbm5lclJvbGUgPSAhZ2V0UGFyZW50V2l0aFRhZ05hbWUoZWwsIFtcIkFSVElDTEVcIiwgXCJBU0lERVwiLCBcIk1BSU5cIiwgXCJOQVZcIiwgXCJTRUNUSU9OXCJdKTtcblx0XHRsZXQgaGFzQWxsb3dlZFJvbGUgPSBoYXNBbGxvd2VkUm9sZShcImhlYWRlclwiLCByb2xlKTtcblx0XHRpZihoYXNBbGxvd2VkUm9sZSl7XG5cdFx0XHRyZXR1cm4gcm9sZTtcblx0XHR9IGVsc2UgaWYgKGhhc0ltcGxpY2l0QmFubmVyUm9sZSkge1xuXHRcdFx0cmV0dXJuIFwiYmFubmVyXCI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fSxcblx0aHI6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJoclwiLCByb2xlKSA/IHJvbGUgOiBcInNlcGVyYXRvclwiLFxuXHRodG1sOiAoKSA9PiBudWxsLFxuXHRpZnJhbWU6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJpZnJhbWVcIiwgcm9sZSkgPyByb2xlIDogbnVsbCxcblx0aW1nOiAoZWwsIHJvbGUpID0+IHtcblx0XHR2YXIgaGFzQWxsb3dlZEVtcHR5QWx0Um9sZSA9IGhhc0FsbG93ZWRSb2xlKFwiaW1nV2l0aEVtcHR5QWx0XCIsIHJvbGUpO1xuXG5cdFx0aWYoZWwuYWx0KSB7XG5cdFx0XHQvLyBhbnkgcm9sZSBleGVwdCB0aGUgcm9sZXMgdXNlZCBieSBlbXB0eSBhbHQgdmFsdWVzXG5cdFx0XHRyZXR1cm4gaGFzQWxsb3dlZEVtcHR5QWx0Um9sZSA/IFwiaW1nXCIgOiByb2xlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gaGFzQWxsb3dlZEVtcHR5QWx0Um9sZSA/IHJvbGUgOiBudWxsO1xuXHRcdH1cblx0fSxcblx0aW5wdXQ6IChlbCwgcm9sZSkgPT4ge1xuXHRcdHN3aXRjaChlbC50eXBlKSB7XG5cdFx0XHRjYXNlIFwiYnV0dG9uXCI6XG5cdFx0XHRcdHJldHVybiBoYXNBbGxvd2VkUm9sZShcImlucHV0VHlwZUJ1dHRvblwiLCByb2xlKSA/IHJvbGUgOiBcImJ1dHRvblwiO1xuXHRcdFx0Y2FzZSBcImNoZWNrYm94XCI6XG5cdFx0XHRcdHJldHVybiBoYXNBbGxvd2VkUm9sZShcImlucHV0VHlwZUNoZWNrYm94XCIsIHJvbGUpID8gcm9sZSA6IFwiY2hlY2tib3hcIjtcblx0XHRcdGNhc2UgXCJpbWFnZVwiOlxuXHRcdFx0XHRyZXR1cm4gaGFzQWxsb3dlZFJvbGUoXCJpbnB1dFR5cGVJbWFnZVwiLCByb2xlKSA/IHJvbGUgOiBcImJ1dHRvblwiO1xuXHRcdFx0Y2FzZSBcIm51bWJlclwiOlxuXHRcdFx0XHRyZXR1cm4gXCJzcGluYnV0dG9uXCI7XG5cdFx0XHRjYXNlIFwicmFkaW9cIjpcblx0XHRcdFx0cmV0dXJuIHJvbGUgPT0gXCJtZW51aXRlbXJhZGlvXCIgPyBcIm1lbnVpdGVtcmFkaW9cIiA6IFwicmFkaW9cIjtcblx0XHRcdGNhc2UgXCJyYW5nZVwiOlxuXHRcdFx0XHRyZXR1cm4gXCJzbGlkZXJcIjtcblx0XHRcdGNhc2UgXCJzZWFyY2hcIjpcblx0XHRcdFx0cmV0dXJuIGVsLmxpc3QgPyBcImNvbWJvYm94XCIgOiBcInNlYXJjaGJveFwiO1xuXHRcdFx0Y2FzZSBcInJlc2V0XCI6XG5cdFx0XHRjYXNlIFwic3VibWl0XCI6XG5cdFx0XHRcdHJldHVybiBcImJ1dHRvblwiO1xuXHRcdFx0Y2FzZSBcImVtYWlsXCI6XG5cdFx0XHRjYXNlIFwidGVsXCI6XG5cdFx0XHRjYXNlIFwidGV4dFwiOlxuXHRcdFx0Y2FzZSBcInVybFwiOlxuXHRcdFx0XHRyZXR1cm4gZWwubGlzdCA/IFwiY29tYm9ib3hcIiA6IFwidGV4dGJveFwiO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9LFxuXHRrZXlnZW46ICgpID0+IG51bGwsXG5cdGxhYmVsOiAoKSA9PiBudWxsLFxuXHRsZWdlbmQ6ICgpID0+IG51bGwsXG5cdGxpOiAoZWwsIHJvbGUpID0+IHtcblx0XHRsZXQgaGFzSW1wbGljaXRMaXN0aXRlbVJvbGUgPSBnZXRQYXJlbnRXaXRoVGFnTmFtZShlbCwgW1wiT0xcIiwgXCJVTFwiXSk7XG5cblx0XHRpZihoYXNJbXBsaWNpdExpc3RpdGVtUm9sZSkge1xuXHRcdFx0cmV0dXJuIGhhc0FsbG93ZWRSb2xlKFwibGlcIiwgcm9sZSkgPyByb2xlIDogXCJsaXN0aXRlbVwiO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gcm9sZTtcblx0XHR9XG5cdH0sXG5cdGxpbms6IChlbCwgcm9sZSkgPT4ge1xuXHRcdGlmKGVsLmhyZWYpIHJldHVybiByb2xlID8gbnVsbCA6IFwibGlua1wiO1xuXHRcdHJldHVybiByb2xlO1xuXHR9LFxuXHRtYWluOiAoKSA9PiBcIm1haW5cIixcblx0bWFwOiAoKSA9PiBudWxsLFxuXHRtYXRoOiAoKSA9PiBcIm1hdGhcIixcblx0bWVudTogKGVsLCByb2xlKSA9PiBlbC50eXBlID09IFwiY29udGV4dFwiID8gXCJtZW51XCIgOiByb2xlLFxuXHRtZW51aXRlbTogKGVsLCByb2xlKSA9PiB7XG5cdFx0c3dpdGNoIChlbC50eXBlKSB7XG5cdFx0XHRjYXNlIFwiY29tbWFuZFwiOlxuXHRcdFx0XHRyZXR1cm4gXCJtZW51aXRlbVwiO1xuXHRcdFx0Y2FzZSBcImNoZWNrYm94XCI6XG5cdFx0XHRcdHJldHVybiBcIm1lbnVpdGVtY2hlY2tib3hcIjtcblx0XHRcdGNhc2UgXCJyYWRpb1wiOlxuXHRcdFx0XHRyZXR1cm4gXCJtZW51aXRlbXJhZGlvXCI7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gcm9sZTtcblx0XHR9XG5cdH0sXG5cdG1ldGE6ICgpID0+IG51bGwsXG5cdG1ldGVyOiAoKSA9PiBudWxsLFxuXHRuYXY6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJuYXZcIiwgcm9sZSkgPyByb2xlIDogXCJuYXZpZ2F0aW9uXCIsXG5cdG5vc2NyaXB0OiAoKSA9PiBudWxsLFxuXHRvYmplY3Q6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJvYmplY3RcIiwgcm9sZSkgPyByb2xlIDogbnVsbCxcblx0b2w6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJvbFwiLCByb2xlKSA/IHJvbGUgOiBcImxpc3RcIixcblx0b3B0Z3JvdXA6ICgpID0+IFwiZ3JvdXBcIixcblx0b3B0aW9uOiAoZWwpID0+IHtcblx0XHRsZXQgd2l0aGluT3B0aW9uTGlzdCA9IFtcInNlbGVjdFwiLCBcIm9wdGdyb3VwXCIsIFwiZGF0YWxpc3RcIl0uaW5kZXhPZihlbC5wYXJlbnROb2RlKSA+IC0xO1xuXHRcdHJldHVybiB3aXRoaW5PcHRpb25MaXN0ID8gXCJvcHRpb25cIiA6IG51bGw7XG5cdH0sXG5cdG91dHB1dDogKGVsLCByb2xlKSA9PiByb2xlID8gcm9sZSA6IFwic3RhdHVzXCIsXG5cdHBhcmFtOiAoKSA9PiBudWxsLFxuXHRwaWN0dXJlOiAoKSA9PiBudWxsLFxuXHRwcm9ncmVzczogKCkgPT4gXCJwcm9ncmVzc2JhclwiLFxuXHRzY3JpcHQ6ICgpID0+IG51bGwsXG5cdHNlY3Rpb246IChlbCwgcm9sZSkgPT4ge1xuXHRcdGxldCBoYXNWYWxpZFJvbGUgPSBoYXNBbGxvd2VkUm9sZShcInNlY3Rpb25cIiwgcm9sZSk7XG5cdFx0aWYoaGFzVmFsaWRSb2xlKSByZXR1cm4gcm9sZTtcblxuXHRcdC8vIG9ubHkgaWYgYWNjZXNzaWJsZSBuYW1lXG5cdFx0aWYoZWwudGl0bGUgfHwgZWwuaGFzQXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiKSB8fCBlbC5oYXNBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsbGVkYnlcIikpe1xuXHRcdFx0cmV0dXJuIFwic2VjdGlvblwiO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gcm9sZTtcblx0XHR9XG5cdH0sXG5cdHNlbGVjdDogKGVsLCByb2xlKSA9PiB7XG5cdFx0aWYoZWwubXVsdGlwbGUgJiYgZWwuc2l6ZSA+IDEpe1xuXHRcdFx0cmV0dXJuIFwibGlzdGJveFwiO1xuXHRcdH0gZWxzZSBpZighZWwubXVsdGlwbGUgJiYgZWwuc2l6ZSA8PSAxKSB7XG5cdFx0XHRyZXR1cm4gcm9sZSA9PSBcIm1lbnVcIiA/IHJvbGUgOiBcImNvbWJvYm94XCI7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJvbGU7XG5cdH0sXG5cdHNvdXJjZTogKCkgPT4gbnVsbCxcblx0c3R5bGU6ICgpID0+IG51bGwsXG5cdHN2ZzogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcInN2Z1wiLCByb2xlKSA/IHJvbGUgOiBudWxsLFxuXHRzdW1tYXJ5OiAoKSA9PiBcImJ1dHRvblwiLFxuXHR0YWJsZTogKGVsLCByb2xlKSA9PiByb2xlID8gcm9sZSA6IFwidGFibGVcIixcblx0dGVtcGxhdGU6ICgpID0+IG51bGwsXG5cdHRleHRhcmVhOiAoKSA9PiBcInRleHRib3hcIixcblx0dGhlYWQ6IChlbCwgcm9sZSkgPT4gcm9sZSA/IHJvbGUgOiBcInJvd2dyb3VwXCIsXG5cdHRib2R5OiAoZWwsIHJvbGUpID0+IHJvbGUgPyByb2xlIDogXCJyb3dncm91cFwiLFxuXHR0Zm9vdDogKGVsLCByb2xlKSA9PiByb2xlID8gcm9sZSA6IFwicm93Z3JvdXBcIixcblx0dGl0bGU6ICgpID0+IG51bGwsXG5cdHRkOiAoZWwsIHJvbGUpID0+IGdldFBhcmVudFdpdGhUYWdOYW1lKGVsLCBbXCJUQUJMRVwiXSkgPyBcImNlbGxcIiA6IHJvbGUsXG5cdHRoOiAoZWwsIHJvbGUpID0+IHtcblx0XHRpZihyb2xlKSByZXR1cm4gcm9sZTtcblx0XHRyZXR1cm4gZ2V0UGFyZW50V2l0aFRhZ05hbWUoZWwsIFtcIlRIRUFEXCJdKSA/IFwiY29sdW1uaGVhZGVyXCIgOiBcInJvd2hlYWRlclwiO1xuXHR9LFxuXHR0cjogKGVsLCByb2xlKSA9PiB7XG5cdFx0Ly8gcm9sZT1yb3csIG1heSBiZSBleHBsaWNpdGx5IGRlY2xhcmVkIHdoZW4gY2hpbGQgb2YgYSB0YWJsZSBlbGVtZW50IHdpdGggcm9sZT1ncmlkXG5cdFx0cmV0dXJuIHJvbGUgPyByb2xlIDogXCJyb3dcIjtcblx0fSxcblx0dHJhY2s6ICgpID0+IG51bGwsXG5cdHVsOiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwidWxcIiwgcm9sZSkgPyByb2xlIDogXCJsaXN0XCIsXG5cdHZpZGVvOiAoZWwsIHJvbGUpID0+IHJvbGUgPT0gXCJhcHBsaWNhdGlvblwiID8gXCJhcHBsaWNhdGlvblwiIDogbnVsbFxufTtcblxuLyoqXG4gKiBGaW5kcyBuZWFyZXN0IHBhcmVudCB3aXRoIGEgc3BlY2lmaWcgdGFnTmFtZVxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IFx0XHRlbCAgICAgIFx0XHRjaGlsZCAtIHN0YXJ0aW5nIHBvaW50ZXJcbiAqIEBwYXJhbSAge0FycmF5PFN0cmluZz59IFx0dGFnTmFtZSBcdFx0QXJyYXkgY29udGFpbmcgY2FwYXRpbGl6ZWQgdGFnbmFtZXNcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fSAgICAgICAgIFx0XHRcdFx0UGFyZW50IHRoYXQgbWF0Y2hlcyBvbmUgb2YgdGhlIHRhZ25hbWVzXG4gKi9cbmZ1bmN0aW9uIGdldFBhcmVudFdpdGhUYWdOYW1lKGVsLCB0YWdOYW1lKSB7XG5cdHdoaWxlIChlbC5wYXJlbnROb2RlKXtcblx0XHRpZih0YWdOYW1lLmluZGV4T2YoZWwudGFnTmFtZSkgPiAtMSkgcmV0dXJuIGVsO1xuXHRcdGVsID0gZWwucGFyZW50Tm9kZTtcblx0fVxufVxuXG4vKipcbiAqIENoZWNrcyBpZiBnaXZlbiByb2xlIGlzIGFsbG93ZWQgZm9yIGdpdmVuIHRhZ1xuICogQHBhcmFtICB7c3RyaW5nfSAgdGFnTmFtZSBrZXkgb2YgYWxsb3dlZFJvbGVzXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICByb2xlICAgIGN1cnJlbnQgcm9sZVxuICogQHJldHVybiB7Qm9vbGVhbn0gICAgICAgICBUcnVlIGlmIGFsbG93ZWRcbiAqL1xuZnVuY3Rpb24gaGFzQWxsb3dlZFJvbGUodGFnTmFtZSwgcm9sZSkge1xuXHRyZXR1cm4gYWxsb3dlZFJvbGVzW3RhZ05hbWVdLmluZGV4T2Yocm9sZSkgPiAtMTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Q29tcHV0ZWRSb2xlKGVsKSB7XG5cdHZhciByb2xlID0gZWwuZ2V0QXR0cmlidXRlKFwicm9sZVwiKTtcblx0Ly8gY2hlY2sgaWYgZ2l2ZW4gcm9sZSBleGlzdFxuXHRpZihyb2xlKSByb2xlID0gcm9sZXNbcm9sZV0gPyByb2xlIDogbnVsbDtcblxuXHR2YXIgdGFnTmFtZSA9IGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcblx0Ly8gY2FsbCBwb3NzaWJsZSBjdXN0b20gZnVuY3Rpb24gaWYgdGFnIGhhcyBhbnlcblx0aWYgKHJvbGVQZXJIVE1MVGFnW3RhZ05hbWVdKSByZXR1cm4gcm9sZVBlckhUTUxUYWdbdGFnTmFtZV0oZWwsIHJvbGUpO1xuXG5cdC8vIGRlZmF1bHQgYmVoYXZpb3IgYS5rLmEuIHNldCByb2xlXG5cdHJldHVybiByb2xlO1xufSIsIi8qKlxuICogU2Nyb2xscyBhbiBlbGVtZW50IGludG8gaXRzIHBhcmVudCB2aWV3XG4gKiBAcGFyYW0ge0VsZW1lbnR9IGNoaWxkIEVsZW1lbnQgdG8gc2hvd1xuICovXG5mdW5jdGlvbiBzY3JvbGxJbnRvVmlldyhjaGlsZCkge1xuXHRsZXQgcGFyZW50ID0gY2hpbGQub2Zmc2V0UGFyZW50O1xuXHRpZiAocGFyZW50ICYmIHBhcmVudC5zY3JvbGxIZWlnaHQgPiBwYXJlbnQuY2xpZW50SGVpZ2h0KSB7XG5cdFx0dmFyIHNjcm9sbEJvdHRvbSA9IHBhcmVudC5jbGllbnRIZWlnaHQgKyBwYXJlbnQuc2Nyb2xsVG9wO1xuXHRcdHZhciBlbGVtZW50Qm90dG9tID0gY2hpbGQub2Zmc2V0VG9wICsgY2hpbGQub2Zmc2V0SGVpZ2h0O1xuXHRcdGlmIChlbGVtZW50Qm90dG9tID4gc2Nyb2xsQm90dG9tKSB7XG5cdFx0XHRwYXJlbnQuc2Nyb2xsVG9wID0gZWxlbWVudEJvdHRvbSAtIHBhcmVudC5jbGllbnRIZWlnaHQ7XG5cdFx0fSBlbHNlIGlmIChjaGlsZC5vZmZzZXRUb3AgPCBwYXJlbnQuc2Nyb2xsVG9wKSB7XG5cdFx0XHRwYXJlbnQuc2Nyb2xsVG9wID0gY2hpbGQub2Zmc2V0VG9wO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIEFkZHMgZm9jdXMgdG8gdGhlIGZpcnN0IGVsZW1lbnRcbiAqIEBwYXJhbSB7QXJyYXl9IGRlc2NlbmRhbnRzIEFycmF5IG9mIGFsbCBkZXNjZW5kYW50c1xuICovXG5mdW5jdGlvbiBzdGFydChkZXNjZW5kYW50cykge1xuXHRyZXR1cm4gYWRkKGRlc2NlbmRhbnRzWzBdKTtcbn1cblxuLyoqXG4gKiBBZGRzIGZvY3VzIHRvIHRoZSBwcmV2IGVsZW1lbnRcbiAqIEBwYXJhbSB7QXJyYXl9IGRlc2NlbmRhbnRzIEFycmF5IG9mIGFsbCBkZXNjZW5kYW50c1xuICogQHBhcmFtIHtPYmplY3R9IFx0Y2hpbGQgXHRcdFx0Q3VycmVudCBmb2N1c2VkIGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gcHJldihkZXNjZW5kYW50cywgY2hpbGQpIHtcblx0Ly8gZmluZCBpbmRleCBvZiBjdXJyZW50IGVsZW1lbnRcblx0bGV0IGkgPSBkZXNjZW5kYW50cy5pbmRleE9mKGNoaWxkKTtcblx0aWYoaSA8PSAwKSBpID0gMTtcblxuXHRyZXR1cm4gYWRkKGRlc2NlbmRhbnRzW2kgLSAxXSk7XG59XG5cbi8qKlxuICogQWRkcyBmb2N1cyB0byB0aGUgbmV4dCBlbGVtZW50XG4gKiBAcGFyYW0ge0FycmF5fSBcdGRlc2NlbmRhbnRzIEFycmF5IG9mIGFsbCBkZXNjZW5kYW50c1xuICogQHBhcmFtIHtPYmplY3R9IFx0Y2hpbGQgXHRcdFx0Q3VycmVudCBmb2N1c2VkIGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gbmV4dChkZXNjZW5kYW50cywgY2hpbGQpIHtcblx0Ly8gZmluZCBpbmRleCBvZiBjdXJyZW50IGVsZW1lbnRcblx0bGV0IGkgPSBkZXNjZW5kYW50cy5pbmRleE9mKGNoaWxkKTtcblx0aWYgKGkgPiBkZXNjZW5kYW50cy5sZW5ndGggLSAyKSBpID0gZGVzY2VuZGFudHMubGVuZ3RoIC0gMjtcblxuXHRyZXR1cm4gYWRkKGRlc2NlbmRhbnRzW2kgKyAxXSk7XG59XG5cbi8qKlxuICogQWRkcyBmb2N1cyB0byB0aGUgbGFzdCBlbGVtZW50XG4gKiBAcGFyYW0ge0FycmF5fSBkZXNjZW5kYW50cyBBcnJheSBvZiBhbGwgZGVzY2VuZGFudHNcbiAqL1xuZnVuY3Rpb24gZW5kKGRlc2NlbmRhbnRzKSB7XG5cdHJldHVybiBhZGQoZGVzY2VuZGFudHNbZGVzY2VuZGFudHMubGVuZ3RoIC0gMV0pO1xufVxuXG5mdW5jdGlvbiBhZGQoY2hpbGQpIHtcblx0Y2hpbGQuZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiYXktaG92ZXJcIik7XG5cdHNjcm9sbEludG9WaWV3KGNoaWxkLmVsZW1lbnQpO1xuXHRyZXR1cm4gY2hpbGQ7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZShjaGlsZCkge1xuXHRjaGlsZC5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJheS1ob3ZlclwiKTtcdFxuXHRyZXR1cm4gY2hpbGQ7XG59XG5cbmZ1bmN0aW9uIGdldChkZXNjZW5kYW50cykge1xuXHRsZXQgYXkgPSBkZXNjZW5kYW50cy5maW5kKGkgPT4gaS5lbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImF5LWhvdmVyXCIpKTtcblx0aWYoIWF5KSByZXR1cm4gZGVzY2VuZGFudHNbMF07XG5cdHJldHVybiBheTtcbn1cblxuZnVuY3Rpb24gc2V0U2VsZWN0ZWQoYXksIHZhbCkge1xuXHRheS5zZWxlY3RlZCA9IHZhbDtcbn1cblxuZnVuY3Rpb24gZ2V0RGVzY2VuZGFudHMoYXkpIHtcblxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG5cdHN0YXJ0LFxuXHRwcmV2LFxuXHRuZXh0LFxuXHRlbmQsXG5cdGFkZCxcblx0cmVtb3ZlLFxuXHRnZXQsXG5cdHNldFNlbGVjdGVkLFxuXHRnZXREZXNjZW5kYW50c1xufTsiLCJpbXBvcnQgcm9sZXMgZnJvbSBcIi4vLi4vZGF0YS9yb2xlc1wiO1xuXG4vKipcbiAqIFJldHVybnMgYW4gY3NzIHNlbGVjdG9yIGZvciBhIGdpdmVuIHJvbGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgUm9sZSBuYW1lXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Um9sZShrZXkpIHtcblx0aWYgKCFyb2xlc1trZXldKSByZXR1cm47XG5cblx0cmV0dXJuIFwiW3JvbGU9J1wiICsga2V5ICsgXCInXVwiO1xufVxuXG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgd2l0aCBhbGwgY3NzIHNlbGVjdG9ycywgaW1wbGljaXQgYW5kIGV4cGxpY2l0LCBmb3IgYSBnaXZlbiByb2xlXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5IFJvbGUgbmFtZVxuICogQHJldHVybnMgez9BcnJheX07XG4gKi9cbmZ1bmN0aW9uIGdldFNlbGVjdG9yQXJyYXkoa2V5KSB7XG5cdGlmICghcm9sZXNba2V5XSkgcmV0dXJuO1xuXG5cdGxldCBzZWxlY3RvciA9IFtdO1xuXHRzZWxlY3Rvci5wdXNoKGdldFJvbGUoa2V5KSk7XG5cdGlmIChyb2xlc1trZXldLmltcGxpY2l0KSByb2xlcy5jb25jYXQocm9sZXNba2V5XS5pbXBsaWNpdCk7XG5cdHJldHVybiBzZWxlY3Rvcjtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGFuIGNvbXBsZXRlIGNzcyBzZWxlY3RvciB3aXRoIGltcGxpY3QgZWxlbWVudHMgZm9yIGEgZ2l2ZW4gcm9sZVxuICogQHBhcmFtIHtTdHJpbmd9IGtleSBSb2xlIG5hbWVcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXQoa2V5KSB7XG5cdHJldHVybiBnZXRTZWxlY3RvckFycmF5KGtleSkuam9pbihcIiwgXCIpO1xufVxuXG5mdW5jdGlvbiBnZXREZWVwUm9sZUFycmF5KGtleSkge1xuXHRpZiAoIXJvbGVzW2tleV0pIHJldHVybjtcblxuXHRsZXQgc2VsZWN0b3IgPSBbXTtcblx0c2VsZWN0b3IucHVzaChnZXRSb2xlKGtleSkpO1xuXG5cdGlmIChyb2xlc1trZXldLnN1Yikge1xuXHRcdHJvbGVzW2tleV0uc3ViLmZvckVhY2godmFsID0+IHNlbGVjdG9yLnB1c2goZ2V0Um9sZSh2YWwpKSk7XG5cdH1cblxuXHRyZXR1cm4gc2VsZWN0b3I7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWVwUm9sZShrZXkpIHtcblx0cmV0dXJuIGdldERlZXBSb2xlQXJyYXkoa2V5KS5qb2luKFwiLCBcIik7XG59XG5cbmZ1bmN0aW9uIGdldERlZXBTZWxlY3RvckFycmF5KGtleSkge1xuXHRpZiAoIXJvbGVzW2tleV0pIHJldHVybjtcblxuXHRsZXQgc2VsZWN0b3IgPSBbXTtcblx0c2VsZWN0b3IuY29uY2F0KGdldFNlbGVjdG9yQXJyYXkoa2V5KSk7XG5cblx0aWYgKHJvbGVzW2tleV0uc3ViKSB7XG5cdFx0cm9sZXNba2V5XS5zdWIuZm9yRWFjaCh2YWwgPT4gc2VsZWN0b3IuY29uY2F0KGdldFNlbGVjdG9yQXJyYXkodmFsKSkpO1xuXHR9XG5cblx0cmV0dXJuIHNlbGVjdG9yO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVlcChrZXkpIHtcblx0cmV0dXJuIGdldERlZXBTZWxlY3RvckFycmF5KGtleSkuam9pbihcIiwgXCIpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7IGdldFJvbGUsIGdldCwgZ2V0RGVlcFJvbGUsIGdldERlZXAgfTsiXX0=
