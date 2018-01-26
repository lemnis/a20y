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
"use strict";

var _create = require("./utils/create");

var _create2 = _interopRequireDefault(_create);

var _elements = require("./utils/elements");

var _elements2 = _interopRequireDefault(_elements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.elements = _elements2.default;

_create2.default.all();

},{"./utils/create":53,"./utils/elements":54}],11:[function(require,module,exports){
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
			value: function onChecked(ev) {
				if (ev) ev.preventDefault();

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

},{"./../type/DOMString.js":48}],12:[function(require,module,exports){
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

},{"./../type/boolean":49}],13:[function(require,module,exports){
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

},{"./../type/DOMString":48}],14:[function(require,module,exports){
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

},{"./../type/boolean":49}],15:[function(require,module,exports){
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
		defaults: { checked: false }
	},
	tab: {
		super: ["sectionhead", "widget"],
		context: ["tablist"],
		defaults: { selected: false }
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

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function setSelection(range) {
	var selection = window.getSelection();
	selection.removeAllRanges();
	selection.addRange(range);
}

/**
 * @mixin
 */
var Selection = function Selection(superclass) {
	return function (_superclass) {
		_inherits(Selection, _superclass);

		function Selection() {
			_classCallCheck(this, Selection);

			return _possibleConstructorReturn(this, (Selection.__proto__ || Object.getPrototypeOf(Selection)).apply(this, arguments));
		}

		_createClass(Selection, [{
			key: "select",

			/**
    * Selects everything in the text control.
    * @name Selection#select
    */
			value: function select() {
				this.setSelectionRange(0, this.value.length);
			}

			/**
    * Returns / Sets the beginning index of the selected text. When nothing is selected,
    * this returns the position of the text input cursor(caret) inside of the < input > element.
    * 
    * @name Selection#selectionStart
    * @type {Number}
    */

		}, {
			key: "setSelectionRange",


			/**
    * Selects a range of text in the element (but does not focus it).
    * @name Selection#setSelectionRange
    * @param {Integer} selectionStart
    * @param {Integer} selectionEnd
    * @param { "forward" | "backward" | "none" } [selectionDirection = "none"] 
    * Establish the direction in which selection was set
    */
			value: function setSelectionRange(selectionStart, selectionEnd) {
				var selectionDirection = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "none";

				var start = selectionDirection == "backward" ? selectionEnd : selectionStart;
				var end = selectionDirection == "backward" ? selectionStart : selectionEnd;

				var range = new Range();
				range.setStart(this.element.firstChild, start);
				range.setEnd(this.element.firstChild, end);

				setSelection(range);
			}

			/**
    * Replaces the range of text with the new text.
    * @name Selection#setRangeText
    * @todo Keep previous selection on place
    * @param {String} replacement 
    * @param {Integer} [start = {@link Textbox#selectionStart}]
    * @param {Integer} [end]
    * @param { "select" | "start" | "end" | "preserve" } [selectMode = "preserve"]
    */

		}, {
			key: "setRangeText",
			value: function setRangeText(replacement) {
				var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.selectionStart;
				var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.selectionEnd;
				var selectMode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "preserve";

				var selectionStart = this.selectionStart;
				var selectionEnd = this.selectionEnd;

				if (start > end) {
					throw new RangeError();
				}
				if (start > this.value.length) {
					start = this.value.length;
				}
				if (end > this.value.length) {
					end = this.value.length;
				}
				if (start < end) {
					// delete characters between start and end
				}

				this.value = this.value.slice(0, start) + replacement + this.value.slice(end);

				if (selectMode == "start") this.selectionStart = 0;
				if (selectMode == "end") this.selectionStart = this.value.length;
				if (selectMode == "select") this.select();
				if (selectMode == "preserve") this.setSelectionRange(selectionStart, selectionEnd);
			}
		}, {
			key: "selectionStart",
			get: function get() {
				var sel = window.getSelection();
				if (sel.anchorNode && sel.anchorNode.parentNode == this.element) {
					return sel.anchorOffset > sel.focusOffset ? sel.focusOffset : sel.anchorOffset;
				}
			},
			set: function set(start) {
				var range = new Range();
				range.setStart(this.element.firstChild, start);
				setSelection(range);
			}

			/**
    * Returns / Sets the end index of the selected text. When there's no selection,this returns the
    * offset of the character immediately following the current text input cursor position.
    * 
    * @name Selection#selectionEnd
    * @type {Number}
    */

		}, {
			key: "selectionEnd",
			get: function get() {
				var sel = window.getSelection();
				if (sel.focusNode && sel.focusNode.parentNode == this.element) {
					return sel.focusOffset > sel.anchorOffset ? sel.focusOffset : sel.anchorOffset;
				}
			},
			set: function set(end) {
				var range = new Range();
				range.setEnd(this.element.firstChild, end);
				setSelection(range);
			}

			/**
    * Returns / Sets the direction in which selection occurred.
    * 
    * * "forward" if selection was performed in the start - to - end direction of the current locale.
    * * "backward" for the opposite direction,
    * * "none" if the direction is unknown."
    * 
    * @name Selection#selectionDirection
    * @todo improve method to set and get direction
    * @type { "forward" | "backward" | "none" }
    */

		}, {
			key: "selectionDirection",
			get: function get() {
				var sel = window.getSelection();
				if (sel.focusNode && sel.focusNode.parentNode == this.element) {
					if (sel.focusOffset == sel.anchorOffset) {
						return "none";
					} else if (sel.anchorOffset > sel.focusOffset) {
						return "backward";
					} else {
						return "forward";
					}
				}
			},
			set: function set(direction) {
				var sel = window.getSelection();
				if (sel.focusNode && sel.focusNode.parentNode == this.element) {
					if (sel.focusOffset == sel.anchorOffset) {} else if (sel.anchorOffset > sel.focusOffset && direction != "backward") {
						var range = new Range();
						range.setStart(this.element.firstChild, this.selectionEnd);
						range.setEnd(this.element.firstChild, this.selectionStart);

						setSelection(range);
					} else if (direction != "forward") {
						var _range = new Range();
						_range.setStart(this.element.firstChild, this.selectionStart);
						_range.setEnd(this.element.firstChild, this.selectionEnd);

						setSelection(_range);
					}
				}
			}
		}]);

		return Selection;
	}(superclass);
};

exports.default = Selection;

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ValidityState = require("./../utils/ValidityState");

var _ValidityState2 = _interopRequireDefault(_ValidityState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @mixin
 * @borrows ValidityState as validity
 * @lends Validation#
 */
var Validation = function Validation(superclass) {
	return function (_superclass) {
		_inherits(Validation, _superclass);

		function Validation() {
			_classCallCheck(this, Validation);

			return _possibleConstructorReturn(this, (Validation.__proto__ || Object.getPrototypeOf(Validation)).apply(this, arguments));
		}

		_createClass(Validation, [{
			key: "checkValidity",


			/**
    * Returns true if the element’s value has no validity problems; false otherwise.
    * Fires an invalid event at the element in the latter case.
    * @fires invalid
    * @name Validation#checkValidity
    */
			value: function checkValidity() {
				if (!this.validity.valid) this.dispatchEvent("invalid", this);
				return this.validity.valid;
			}

			/**
    * Returns true if the element’s value has no validity problems; otherwise, returns false, fires an
    * invalid event at the element, and(if the event isn’t canceled) reports the problem to the user.
    * @fires invalid
    * @name Validation#reportValidity
    */

		}, {
			key: "reportValidity",
			value: function reportValidity() {
				if (!this.validity.valid) {
					var cancelled = !this.dispatchEvent("invalid", this);
					if (!cancelled) {
						this.errormessage.hidden = false;
					}
				} else {
					this.errormessage.hidden = true;
				}
				return this.validity.valid;
			}

			/**
    * Sets a custom error, so that the element would fail to validate.The given message is the
    * message to be shown to the user when reporting the problem to the user.
    * 
    * If the argument is the empty string, clears the custom error.
    * 
    * @name Validation#setCustomValidity
    * @param {?String} message 
    */

		}, {
			key: "setCustomValidity",
			value: function setCustomValidity(message) {
				// update ValidyState object
				this.validity._customError = message;

				if (message) {
					// update `aria-invalid` property to invalid
					this.invalid = true;

					// update error message
					this.errormessage.element.innerHTML = message;
					this.errormessage.element.hidden = false;
				} else {
					// update `aria-invalid` property to invalid
					this.invalid = false;

					// update error message
					this.errormessage.element.innerHTML = "";
					this.errormessage.element.hidden = true;
				}
			}
		}, {
			key: "validity",
			get: function get() {
				if (!this._validity) this._validity = new _ValidityState2.default(this);

				return this._validity;
			}

			/**
    * Returns true if the element will be validated when the form is submitted; false otherwise.
    * @type {Boolean}
    */

		}, {
			key: "willValidate",
			get: function get() {
				return !this.hidden && !this.readOnly;
			}

			/**
    * Returns the error message that would be shown to the user
    * if the element was to be checked for validity.
    * @name Validation#validationMessage
    * @type {String}
    */

		}, {
			key: "validationMessage",
			get: function get() {
				if (this.validity.valid) return;
				if (this.validity.valueMissing) return "Please fill in this field.";
				if (this.validity.typeMismatch) return "Please use the correct input type.";

				if (this.validity.tooLong) {
					return "Please shorten this text to 10 characters or less (you are currently using 48 characters).";
				}
				if (this.validity.tooShort) {
					return "Please lengthen this text to 10 characters or more (you are currently using 1 character).";
				}

				if (this.validity.badInput) return "Please enter a number.";
				if (this.validity.stepMismatch) return "Please select a valid value.";
				if (this.validity.rangeOverflow) return "Please select a smaller value.";
				if (this.validity.rangeUnderflow) return "Please select a larger value.";
				if (this.validity.patternMismatch) return "Please match the format requested.";
				if (this.validity.customError) return this.errormessage.element.innerHTML;

				// Fallback value should never been shown
				return this.errormessage.element.innerHTML || "The value you entered for this field is invalid.";
			}
		}]);

		return Validation;
	}(superclass);
};

exports.default = Validation;

},{"./../utils/ValidityState":52}],18:[function(require,module,exports){
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
 * @summary An input that allows for user-triggered actions when clicked or pressed.
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

		if (_this.expanded !== undefined && _this.controls) {
			// todo: add when first time aria-expanded is boolean
			console.log(_this.controls.length);
			_this.controls.forEach(function (control) {
				console.log(control.addListener);
				if (control.addListener) control.addListener("close", close.bind(_this));
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

},{"../attributes/aria-expanded":12,"../attributes/aria-pressed.js":13,"./../type/boolean":49,"./abstract/Command":33,"@vestergaard-company/js-mixin":1}],19:[function(require,module,exports){
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

/**
 * @summary A checkable input that has three possible values: true, false, or mixed.
 * @desc
 * #### Example
 *
 * <div role="checkbox" aria-checked="true" tabindex="0"></div>
 *
 * ```html
 * <div role="checkbox" aria-checked="true" tabindex="0"></div>
 * ```
 * @extends Input 
 * @mixes AriaChecked
 */
var Checkbox = function (_mix$with) {
  _inherits(Checkbox, _mix$with);

  /**
   * @param {*} args
  */
  function Checkbox() {
    var _ref;

    _classCallCheck(this, Checkbox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call.apply(_ref, [this].concat(args)));
  }

  return Checkbox;
}((0, _jsMixin2.default)(_Input2.default).with(_ariaChecked2.default));

exports.default = Checkbox;

},{"../attributes/aria-checked.js":11,"./abstract/Input":35,"@vestergaard-company/js-mixin":1}],20:[function(require,module,exports){
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
 * @summary A composite widget containing a single-line textbox and another element, 
 * such as a listbox or grid, that can dynamically pop up to help the user set the value of the textbox.
 * @desc
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

		_this._.registerCustomElement("combobox.input", _this.element.querySelector(_selector2.default.getDeep("textbox")));
		_this._.registerCustomElement("combobox.open", _this.element.querySelector(_selector2.default.getDeep("button")));

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

},{"./../type/boolean":49,"./../utils/selector":58,"./abstract/Select":40}],21:[function(require,module,exports){
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
 * @extends Window
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

},{"../attributes/aria-expanded.js":12,"./abstract/Window":43,"@vestergaard-company/js-mixin":1,"mousetrap":9}],22:[function(require,module,exports){
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

},{"./../utils/create":53,"./../utils/elements":54,"./../utils/selector":58,"./abstract/Landmark":36}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _jsMixin = require("@vestergaard-company/js-mixin");

var _jsMixin2 = _interopRequireDefault(_jsMixin);

var _Command = require("./abstract/Command.js");

var _Command2 = _interopRequireDefault(_Command);

var _boolean = require("./../type/boolean");

var _boolean2 = _interopRequireDefault(_boolean);

var _ariaExpanded = require("../attributes/aria-expanded");

var _ariaExpanded2 = _interopRequireDefault(_ariaExpanded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function close() {
	this.expanded = _boolean2.default.IS_NOT_ACTIVE;
}

/**
 * An interactive reference to an internal or external resource that,
 * when activated, causes the user agent to navigate to that resource.
 * 
 * @extends Command
 * @mixes AriaExpanded
 * @param {String} options.link.href  URL that should be used
 * @listens click
 * @example
 * <div role="link" data-link-href="http://www.example.com/" tabindex="0">
 * 	Open website
 * </div>
 */

var Link = function (_mix$with) {
	_inherits(Link, _mix$with);

	function Link() {
		var _ref;

		_classCallCheck(this, Link);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_ref = Link.__proto__ || Object.getPrototypeOf(Link)).call.apply(_ref, [this].concat(args)));

		_this._.registerCustomValue("link.href");

		if (_this._.link.href) {
			_this.addListener("click", _this.onClick.bind(_this));
			_this.addListener("key", _this.onClick.bind(_this), { key: "enter" });
		}

		_this.addListener("expanded");

		if (_this.expanded !== undefined) {
			// todo: add when first time aria-expanded is boolean
			_this.controls.forEach(function (control) {
				return control.addListener("close", close.bind(_this));
			});
			_this.addListener("click", _this.onExpanded.bind(_this));
			_this.addListener("key", _this.onExpanded.bind(_this), { key: "enter" });
		}
		return _this;
	}

	/**
  * Fired when state of expanded is changed 
  * @param {Event} ev 
  */


	_createClass(Link, [{
		key: "onExpanded",
		value: function onExpanded(ev) {
			if (typeof _get(Link.prototype.__proto__ || Object.getPrototypeOf(Link.prototype), "onExpanded", this) == "function") _get(Link.prototype.__proto__ || Object.getPrototypeOf(Link.prototype), "onExpanded", this).call(this, ev);

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

		/**
   * Open the url that is defined in the options,  
   * fires an click event only if its origin wasn't an click event
   * @param {Event} ev 
   * @fires link#accessibleclick
   * @fires click
   */

	}, {
		key: "onClick",
		value: function onClick(ev) {
			if (typeof _get(Link.prototype.__proto__ || Object.getPrototypeOf(Link.prototype), "onClick", this) == "function") _get(Link.prototype.__proto__ || Object.getPrototypeOf(Link.prototype), "onClick", this).call(this, ev);

			if (this._.link.href) {
				console.log("should open", this._.link.href);
				// window.location.href = this._.link.href;
			}

			/**
      * An click triggered by an keyboard or mouse
      * @event Link#accessibleclick
      */
			this.dispatchEvent(new Event("accessibleclick"));
			if (ev.type !== "click") {
				this.dispatchEvent(new MouseEvent("click"));
			}
		}
	}]);

	return Link;
}((0, _jsMixin2.default)(_Command2.default).with(_ariaExpanded2.default));

exports.default = Link;

},{"../attributes/aria-expanded":12,"./../type/boolean":49,"./abstract/Command.js":33,"@vestergaard-company/js-mixin":1}],24:[function(require,module,exports){
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
 * @summary A widget that allows the user to select one or more items from a list of choices.
 * @desc
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

},{"./../utils/managingFocus":57,"./abstract/Select":40}],25:[function(require,module,exports){
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

},{"./../type/boolean":49,"./../utils/getActive":55,"./abstract/Input":35}],26:[function(require,module,exports){
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
 * @summary A user input where the user selects a value from within a given range.
 * @desc
 * `slider` elements let the user specify a numeric value which must be no less
 * than a given value, and no more than another given value. The precise value,
 * however, is not considered important. This is typically represented using a
 * slider or dial control rather than a text entry box like the "number" input
 * type. Because this kind of widget is imprecise, it shouldn't typically be
 * used unless the control's exact value isn't important.
 *
 * @extends Range
 *
 * @fires change
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
 */

var Slider = function (_Range) {
	_inherits(Slider, _Range);

	/**
  * #### Examples
  * 
  * <div class="track">
  *   <button type="button" role="slider" aria-label="slider" /><button>
  * </div>
  * @param {*} args 
  */
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

		/* Native polyfill */

		// automatic polyfilled by attributes
		// autocomplete
		// list
		// min
		// max
		// step => data-step
		// value
		// valueAsNumber
		// stepDown
		// stepUp

	}]);

	return Slider;
}(_Range3.default);

exports.default = Slider;

},{"./abstract/Range.js":37}],27:[function(require,module,exports){
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

		if (_this._.spinbutton.down) _this._.spinbutton.up.addEventListener("click", _this.stepUp.bind(_this));
		if (_this._.spinbutton.down) _this._.spinbutton.down.addEventListener("click", _this.stepDown.bind(_this));
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

},{"./abstract/Range":37,"@vestergaard-company/js-mixin":1}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Checkbox2 = require("./Checkbox");

var _Checkbox3 = _interopRequireDefault(_Checkbox2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A type of checkbox that represents on/off values, as opposed to checked/unchecked values.
 * @extends Checkbox 
 */
var Switch = function (_Checkbox) {
	_inherits(Switch, _Checkbox);

	/**
  * #### Example
  * 
  * **Default**
  * 
  * <div role="switch" tabindex="0"></div>
  * 
  * ```html
  * <div role="switch" tabindex="0"></div>
  * ```
  * 
  * **With predefined value**
  * 
  * <div role="switch" aria-checked="true" tabindex="0"></div>
  * 
  * ```html
  * <div role="switch" aria-checked="true" tabindex="0"></div>
  * ```
  * @param {*} args
 */
	function Switch() {
		var _ref;

		_classCallCheck(this, Switch);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _possibleConstructorReturn(this, (_ref = Switch.__proto__ || Object.getPrototypeOf(Switch)).call.apply(_ref, [this].concat(args)));
	}

	return Switch;
}(_Checkbox3.default);

exports.default = Switch;

},{"./Checkbox":19}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _jsMixin = require("@vestergaard-company/js-mixin");

var _jsMixin2 = _interopRequireDefault(_jsMixin);

var _elements = require("./../utils/elements");

var _elements2 = _interopRequireDefault(_elements);

var _selector = require("./../utils/selector");

var _selector2 = _interopRequireDefault(_selector);

var _roles = require("./../data/roles");

var _roles2 = _interopRequireDefault(_roles);

var _Roletype = require("./abstract/Roletype");

var _Roletype2 = _interopRequireDefault(_Roletype);

var _ariaSelected = require("./../attributes/aria-selected");

var _ariaSelected2 = _interopRequireDefault(_ariaSelected);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
			// gets the selector for finding it's context element (tablist > tab) 
			var contextSelector = _roles2.default.tab.context.map(function (str) {
				return _selector2.default.getRole(str);
			}).join(", ");
			var tablist = _elements2.default.getParent(this, contextSelector);
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

},{"./../attributes/aria-selected":14,"./../data/roles":15,"./../utils/elements":54,"./../utils/selector":58,"./abstract/Roletype":38,"@vestergaard-company/js-mixin":1}],30:[function(require,module,exports){
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

},{"./../utils/elements.js":54,"./abstract/Composite":34}],31:[function(require,module,exports){
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

},{"./abstract/Section":39}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsMixin = require("@vestergaard-company/js-mixin");

var _jsMixin2 = _interopRequireDefault(_jsMixin);

var _Input = require("./abstract/Input");

var _Input2 = _interopRequireDefault(_Input);

var _Selection = require("./../mixins/Selection");

var _Selection2 = _interopRequireDefault(_Selection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * ### Examples
 *
 * #### Basic example
 *   
 * <div role='textbox' contenteditable></div>
 * 
 * ```html
 * <div role='textbox' contenteditable></div>
 * ```
 * 
 * ---
 * 
 * #### Multiline example
 * 
 * <div role='textbox' contenteditable></div>
 * 
 * ```html
 * <div role='textbox' contenteditable></div>
 * ```
 * 
 * @summary A type of input that allows free-form text as its value.
 * @extends Input
 * @mixes Selection
 * @todo Add options to keep or remove pasted styling
 */
var Textbox = function (_mix$with) {
	_inherits(Textbox, _mix$with);

	/**
  * @param {*} args
  */
	function Textbox() {
		var _ref;

		_classCallCheck(this, Textbox);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_ref = Textbox.__proto__ || Object.getPrototypeOf(Textbox)).call.apply(_ref, [this].concat(args)));

		_this._.registerCustomValue("textbox.minlength");
		_this._.registerCustomValue("textbox.maxlength");
		_this._.registerCustomValue("textbox.size");

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

		/* Native polyfill  */

		// autocomplete
		// dirname
		// list
		// maxlength
		// minlength
		// pattern
		// placeholder
		// readonly
		// required
		// size
		// value
		// list
		// selection api

		// name	string: Returns / Sets the element's name attribute, containing a name that identifies the element when submitting the form.
		// type string: Returns / Sets the element's type attribute, indicating the type of control to display. See type attribute of <input> for possible values.
		// autofocus	boolean: Returns / Sets the element's autofocus attribute, which specifies that a form control should have input focus when the page loads, unless the user overrides it, for example by typing in a different control. Only one form element in a document can have the autofocus attribute. It cannot be applied if the type attribute is set to hidden (that is, you cannot automatically set focus to a hidden control).

		/**
   * Returns / Sets the current value of the textbox.
   * @type {String}
   */

	}, {
		key: "value",
		get: function get() {
			return this.element.innerText;
		},
		set: function set(str) {
			this.element.innerText = str;
		}

		/**
   * Returns / Sets the minmum length of characters
   * @type {Integer}
   */

	}, {
		key: "minLength",
		get: function get() {
			return this._.textbox.minlength;
		},
		set: function set(num) {
			this._.textbox.minlength = num;
		}

		/**
   * Returns / Sets the maximum length of characters
   * @type {Integer}
   */

	}, {
		key: "maxLength",
		get: function get() {
			return this._.textbox.maxlength;
		},
		set: function set(num) {
			this._.textbox.maxlength = num;
		}

		/**
   * Returns / Sets the size of control.
   * @type {Integer}
   */

	}, {
		key: "size",
		get: function get() {
			return this._.textbox.size;
		},
		set: function set(val) {
			this.element.style.width = 2.16 + 0.48 * val + "em";
			this._.textbox.size = val;
		}
	}]);

	return Textbox;
}((0, _jsMixin2.default)(_Input2.default).with(_Selection2.default));

exports.default = Textbox;

},{"./../mixins/Selection":16,"./abstract/Input":35,"@vestergaard-company/js-mixin":1}],33:[function(require,module,exports){
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
 * @abstract
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

},{"./Widget":42}],34:[function(require,module,exports){
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
 * @abstract
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

},{"./Widget":42}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsMixin = require("@vestergaard-company/js-mixin");

var _jsMixin2 = _interopRequireDefault(_jsMixin);

var _selector = require("./../../utils/selector");

var _selector2 = _interopRequireDefault(_selector);

var _elements = require("./../../utils/elements");

var _elements2 = _interopRequireDefault(_elements);

var _Widget = require("./Widget");

var _Widget2 = _interopRequireDefault(_Widget);

var _Validation = require("./../../mixins/Validation");

var _Validation2 = _interopRequireDefault(_Validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @extends Widget
 * @mixes Validation
 * @abstract
 */
var Input = function (_mix$with) {
	_inherits(Input, _mix$with);

	/**
  * @alias Input:constructor
 	 * @param {Regex} [options.input.pattern] Regex to check against when validating
  */
	function Input() {
		var _ref;

		_classCallCheck(this, Input);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_ref = Input.__proto__ || Object.getPrototypeOf(Input)).call.apply(_ref, [this].concat(args)));

		_this._.registerCustomElement("input.pattern");
		return _this;
	}

	/* Polyfill of native properties */

	/**
  * Returns a reference to the parent form element
  * @returns {AccessibleNode} {@link Form}
  */


	_createClass(Input, [{
		key: "form",
		get: function get() {
			return _elements2.default.getParent(this, _selector2.default.getDeep("form"));
		}

		/**
   * Returns the first element pointed by the {@link AccessibleNode#controls} property.
   * The property may be null if no HTML element found in the same tree.
   * @returns {AccessibleNode} {@link Listbox}
   */

	}, {
		key: "list",
		get: function get() {
			return this.controls.find(function (ay) {
				return ay.element.matches(_selector2.default.get("listbox"));
			});
		}

		// formAction	string: Returns / Sets the element's formaction attribute,containing the URI of a
		// program that processes information submitted by the element. This overrides the action attribute
		// of the parent form.

		// formEncType	string: Returns / Sets the element's formenctype attribute, containing the type of
		// content that is used to submit the form to the server. This overrides the enctype attribute of 
		// the parent form.

		// formMethod	string: Returns / Sets the element's formmethod attribute, containing the HTTP method
		// that the browser uses to submit the form. This overrides the method attribute of the parent form.

		// formNoValidate	boolean: Returns / Sets the element's formnovalidate attribute, indicating that
		// the form is not to be validated when it is submitted. This overrides the novalidate attribute
		// of the parent form.

		// formTarget	string: Returns / Sets the element's formtarget attribute, containing a name or
		// keyword indicating where to display the response that is received after submitting the form.
		// This overrides the target attribute of the parent form.

	}]);

	return Input;
}((0, _jsMixin2.default)(_Widget2.default).with(_Validation2.default));

exports.default = Input;

},{"./../../mixins/Validation":17,"./../../utils/elements":54,"./../../utils/selector":58,"./Widget":42,"@vestergaard-company/js-mixin":1}],36:[function(require,module,exports){
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

},{"./Section":39}],37:[function(require,module,exports){
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
 * @return {Range} this
 * @see {@link https://w3c.github.io/aria/aria/aria.html#range}
 */
var Range = function (_Widget) {
	_inherits(Range, _Widget);

	/**
  * @alias module:Range-const
  * @param {HTMLElement} element 				element to derive information nameFrom
  * @param {Object} [options] 						optional options
 	 * @param {Number|"any"} options.step 	increase/decrease value used
  */
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

},{"./Widget":42}],38:[function(require,module,exports){
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

},{"./../../type/AccessibleNode":46}],39:[function(require,module,exports){
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

},{"./Structure":41}],40:[function(require,module,exports){
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
		console.log(_selector2.default);
		var options = Array.from(_this.element.querySelectorAll(_selector2.default.getDeep("option")));
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

},{"./../../type/boolean":49,"./../../utils/elements":54,"./../../utils/managingFocus":57,"./../../utils/selector":58,"./../Option.js":25,"./Roletype":38,"@vestergaard-company/js-mixin":1}],41:[function(require,module,exports){
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

},{"./Roletype":38}],42:[function(require,module,exports){
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

},{"./Roletype":38}],43:[function(require,module,exports){
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

},{"./Roletype":38}],44:[function(require,module,exports){
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

},{"./../type/boolean":49,"./../utils/getActive":55,"./abstract/Input":35}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Textbox2 = require("./Textbox");

var _Textbox3 = _interopRequireDefault(_Textbox2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @extends Textbox
 */
var Searchbox = function (_Textbox) {
	_inherits(Searchbox, _Textbox);

	/**
  * #### Example
  * 
  * <div role="searchbox" contenteditable></div>
  * 
  * ```html
  * <div role="searchbox" contenteditable></div>
  * ```
  * 
  * @param {*} args 
  */
	function Searchbox() {
		var _ref;

		_classCallCheck(this, Searchbox);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _possibleConstructorReturn(this, (_ref = Searchbox.__proto__ || Object.getPrototypeOf(Searchbox)).call.apply(_ref, [this].concat(args)));
	}

	return Searchbox;
}(_Textbox3.default);

exports.default = Searchbox;

},{"./Textbox":32}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _elements = require("../utils/elements");

var _elements2 = _interopRequireDefault(_elements);

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

// Types


/**
 * Based on the AOM spec
 * @class
 */
var AccessibleNode = function AccessibleNode(element) {
	_classCallCheck(this, AccessibleNode);

	this.element = element;

	this._ = { mutations: [] };
	this._.mutations.push(["role", "aria-activedescendant", "aria-atomic", "aria-autocomplete", "aria-busy", "aria-checked", "aria-colcount", "aria-colindex", "aria-colspan", "aria-controls", "aria-current", "aria-describedby", "aria-details", "aria-disabled", "aria-dropeffect", "aria-errormessage", "aria-expanded", "aria-flowto", "aria-grabbed", "aria-haspopup", "aria-hidden", "aria-invalid", "aria-keyshortcuts", "aria-label", "aria-labelledby", "aria-level", "aria-live", "aria-modal", "aria-multiline", "aria-multiselectable", "aria-orientation", "aria-owns", "aria-placeholder", "aria-posinset", "aria-pressed", "aria-readonly", "aria-relevant", "aria-required", "aria-roledescription", "aria-rowcount", "aria-rowindex", "aria-rowspan", "aria-selected", "aria-setsize", "aria-sort", "aria-valuemax", "aria-valuemin", "aria-valuenow", "aria-valuetext"]);

	/* ****************** ACCESSIBLE LABEL AND DESCRIPTION ****************** */

	/**
  * Returns an list with AccessibleNode instances that labels the current element
  * 
  * @see {@link AccessibleNode#describedBy}
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby
  * @type {AccessibleNodeList}
  */
	this.labelledBy = new _AccessibleNodeList2.default(this, "aria-labelledBy");

	/**
  * Returns an list with AccessibleNode instances that describes the current element
  * 
  * @see {@link AccessibleNode#labeledBy}
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-describedby
  * @private
  * @type {AccessibleNodeList}
  */
	this.describedBy = new _AccessibleNodeList2.default(this, "aria-describedBy");

	/* ************** END OF ACCESSIBLE LABEL AND DESCRIPTION ************** */

	/* ************************ OTHER RELATIONSHIPS ************************ */

	/**
  * Returns an list with AccessibleNode instances whose contents or presence are controlled by
  * the current element.
  * 
  * @see {@link AccessibleNode#owns}
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-controls
  * @private
  * @type {AccessibleNodeList}
  */
	this.controls = new _AccessibleNodeList2.default(this, "aria-controls");

	/**
  * Contains the next element(s) in an alternate reading order of content which, at the user's 
  * discretion, allows assistive technology to override the general default of reading in
  * document source order.
  * 
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-flowto
  * @private
  * @type {AccessibleNodeList}
  */
	this.flowTo = new _AccessibleNodeList2.default(this, "aria-flowto");

	/**
  * Contains children who's ID are referenced inside the `aria-owns` attribute
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-owns
  * @private
  * @type {AccessibleNodeList}
  */
	this.owns = new _AccessibleNodeList2.default(this, "aria-owns");

	/* ********************* END OF OTHER RELATIONSHIPS ********************* */
};

Object.defineProperties(AccessibleNode.prototype,
/** @lends AccessibleNode.prototype */
{
	/** 
 * Defines a type it represents, e.g. `tab`
 * 
 * @see https://www.w3.org/TR/wai-aria-1.1/#roles
 * @type  {?String}
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
  * @private
  * @type {?String}
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
 * @type {?String} 
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
  * @private
  * @type {?String}
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
  * @private
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
  * @private
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
  * @private
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
  * @private
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
  * @private
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
  * @private
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
  * @private
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
  * @private
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
  * @private
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
  * @private
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
  * @private
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
  * @private
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
  * @private
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
  * @private
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
  * @private
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
  * @private
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
  * @private
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
  * @private
  * @private
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
  * @private
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
  * @private
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
  * @private
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
  * E.g. `&lt;h1&gt;&lt;h1/&gt;` equals `&lt;div role="heading" aria-level="1"&gt;&lt;/div>`
  * 
  * @see https://www.w3.org/TR/wai-aria-1.1/#aria-level
  * @private
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

},{"../utils/elements":54,"./AccessibleNodeList":47,"./DOMString":48,"./boolean":49,"./double":50,"./long":51}],47:[function(require,module,exports){
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

},{"../utils/elements":54,"./../utils/create":53,"./AccessibleNode":46}],48:[function(require,module,exports){
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

},{}],49:[function(require,module,exports){
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

},{}],50:[function(require,module,exports){
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

},{}],51:[function(require,module,exports){
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

},{}],52:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _create = require("./create");

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 
 */
var ValidityState = function ValidityState(ay) {
	_classCallCheck(this, ValidityState);

	Object.defineProperty(this, "_ay", {
		value: ay
	});
};

Object.defineProperties(ValidityState.prototype,
/** @lends ValidityState.prototype */
{
	/**
  * Returns true if the user has provided input in the user interface that the 
  * user agent is unable to convert to a value; false otherwise.
  * @type {Boolean}
  */
	badInput: {
		enumerable: true,
		get: function get() {
			if ((_create2.default.instanceOf(this._ay, "spinbutton") || _create2.default.instanceOf(this._ay, "slider")) && this._ay.valueNow.length > 0 && !/^[-+]?(?:\d+|\d*[.,]\d+)$/.test(this._ay.valueNow)) {
				return true;
			}
			return false;
		}
	},

	/**
  * Returns true if the element has a custom error; false otherwise.
  * @type {Boolean}
  */
	customError: {
		enumerable: true,
		get: function get() {
			return !!this._customError;
		}
	},

	/**
  * Returns true if the element’s value doesn’t match the provided pattern; false otherwise.
  * @type {Boolean}
  */
	patternMismatch: {
		enumerable: true,
		get: function get() {
			var value = this._ay._.input ? this._ay._.input.value : this._ay.valueNow;
			if (this._ay._.input.pattern && value.length > 0 && new RegExp(this._ay._.input.pattern).test(value) === false) {
				return true;
			}
			return false;
		}
	},

	/**
  * Returns true if the element’s value is higher than the provided maximum; false otherwise.
  * @type {Boolean}
  */
	rangeOverflow: {
		enumerable: true,
		get: function get() {
			if (this._ay.valueNow && this._ay.valueMax && this._ay.valueNow > this._ay.valueMax) {
				return true;
			}

			return false;
		}
	},

	/**
  * Returns true if the element’s value is lower than the provided minimum; false otherwise.
  * @type {Boolean}
  */
	rangeUnderflow: {
		enumerable: true,
		get: function get() {
			if (this._ay.valueNow && this._ay.valueMin && this._ay.valueNow < this._ay.valueMin) {
				return true;
			}

			return false;
		}
	},

	/**
  * Returns true if the element’s value doesn’t fit the rules given by the step attribute; false otherwise.
  * @type {Boolean}
  */
	stepMismatch: {
		enumerable: true,
		get: function get() {
			if (this._ay._.range && this._ay._.range.step && this._ay.valueNow % this._ay._.range.step !== 0) {
				return true;
			}

			return false;
		}
	},

	/**
  * Returns true if the element’s value is longer than the provided maximum length; false otherwise.
  * @type {Boolean}
  */
	tooLong: {
		enumerable: true,
		get: function get() {
			var value = this._ay._.input ? this._ay._.input.value : this._ay.valueNow;
			if (this._ay.maxlength && value.length > this._ay.maxlength) {
				return false;
			}
			return false;
		}
	},

	/**
  * Returns true if the element’s value, if it is not the empty string, is shorter than the provided minimum length; false otherwise.
  * @type {Boolean}
  */
	tooShort: {
		enumerable: true,
		get: function get() {
			var value = this._ay._.input ? this._ay._.input.value : this._ay.valueNow;
			if (this._ay.minlength && value.length < this._ay.minlength) {
				return false;
			}
			return false;
		}
	},

	/**
  * Returns true if the element’s value is not in the correct syntax; false otherwise.
  * @type {Boolean}
  */
	typeMismatch: {
		enumerable: true,
		get: function get() {
			return false;
		}
	},

	/**
  * Returns true if the element has no value but is a required field; false otherwise.
  * @type {Boolean}
  */
	valueMissing: {
		enumerable: true,
		get: function get() {
			var value = this._ay._.input ? this._ay._.input.value : this._ay.valueNow;
			if (this.required && ((_create2.default.instanceOf(this._ay, "checkbox") || _create2.default.instanceOf(this._ay, "radio") || _create2.default.instanceOf(this._ay, "option")) && !this._ay.checked || _create2.default.instanceOf(this._ay, "select") && !value || (_create2.default.instanceOf(this._ay, "input") || _create2.default.instanceOf(this._ay, "gridcell")) && !value > 0)) {
				return true;
			}

			return false;
		}
	},

	/**
  * Returns true if the element’s value has no validity problems; false otherwise
  * @type {Boolean}
  */
	valid: {
		enumerable: true,
		get: function get() {
			return !(this.badInput || this.customError || this.patternMismatch || this.rangeOverflow || this.rangeUnderflow || this.stepMismatch || this.tooLong || this.tooShort || this.typeMismatch || this.valueMissing);
		}
	}
});

exports.default = ValidityState;

},{"./create":53}],53:[function(require,module,exports){
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

var _Link = require("./../role/Link");

var _Link2 = _interopRequireDefault(_Link);

var _Listbox = require("./../role/Listbox");

var _Listbox2 = _interopRequireDefault(_Listbox);

var _option = require("./../role/option");

var _option2 = _interopRequireDefault(_option);

var _searchbox = require("./../role/searchbox");

var _searchbox2 = _interopRequireDefault(_searchbox);

var _Slider = require("./../role/Slider");

var _Slider2 = _interopRequireDefault(_Slider);

var _Spinbutton = require("./../role/Spinbutton");

var _Spinbutton2 = _interopRequireDefault(_Spinbutton);

var _Switch = require("./../role/Switch");

var _Switch2 = _interopRequireDefault(_Switch);

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
	options: _option2.default, range: _Range2.default, roletype: _Roletype2.default, searchbox: _searchbox2.default, slider: _Slider2.default, spinbutton: _Spinbutton2.default,
	tab: _Tab2.default, tablist: _Tablist2.default, tabpanel: _Tabpanel2.default, textbox: _Textbox2.default, link: _Link2.default, switch: _Switch2.default };

function all() {
	for (var key in obj) {
		var nodeList = document.querySelectorAll(_selector2.default.getRole(key));
		console.log(key, nodeList);
		for (var i = 0; i < nodeList.length; i++) {
			_elements2.default.set(nodeList[i], new obj[key](nodeList[i]));
		}
	}
}

function one(el) {
	if (_elements2.default.has(el)) return _elements2.default.get(el);
	var role = (0, _getComputedRole2.default)(el);

	/** @todo Remove fallback method */
	var constructor = obj[role] || _Roletype2.default;

	return _elements2.default.set(el, new constructor(el));
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

},{"./../role/Button":18,"./../role/Checkbox":19,"./../role/Combobox":20,"./../role/Dialog":21,"./../role/Form":22,"./../role/Link":23,"./../role/Listbox":24,"./../role/Slider":26,"./../role/Spinbutton":27,"./../role/Switch":28,"./../role/Tab":29,"./../role/Tablist":30,"./../role/Tabpanel":31,"./../role/Textbox":32,"./../role/abstract/Range":37,"./../role/abstract/Roletype":38,"./../role/option":44,"./../role/searchbox":45,"./elements":54,"./getComputedRole":56,"./selector":58}],54:[function(require,module,exports){
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
function getParent(ay, selector) {
	var element = ay.element;

	while (element.parentNode) {
		element = element.parentNode;

		if (ay.element.parentNode.matches(selector)) {
			if (ayInstances.has(ay.element.parentNode)) {
				return ayInstances.get(ay.element.parentNode);
			} else {
				return _create2.default.one(ay.element.parentNode);
			}
		}
	}

	return false;
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

},{"./create":53,"./getComputedRole":56}],55:[function(require,module,exports){
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

},{"./elements":54}],56:[function(require,module,exports){
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

},{"./../data/roles.js":15}],57:[function(require,module,exports){
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

},{}],58:[function(require,module,exports){
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
	if (_roles2.default[key].implicit) selector = selector.concat(_roles2.default[key].implicit);
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
	selector = selector.concat(getSelectorArray(key));

	if (_roles2.default[key].sub) {
		_roles2.default[key].sub.forEach(function (val) {
			return selector = selector.concat(getSelectorArray(val));
		});
	}

	return selector;
}

function getDeep(key) {
	return getDeepSelectorArray(key).join(", ");
}

exports.default = { getRole: getRole, get: get, getDeepRole: getDeepRole, getDeep: getDeep };

},{"./../data/roles":15}]},{},[10])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXNcXEB2ZXN0ZXJnYWFyZC1jb21wYW55XFxqcy1taXhpblxcaW5kZXguanMiLCJub2RlX21vZHVsZXNcXEB2ZXN0ZXJnYWFyZC1jb21wYW55XFxqcy1taXhpblxcc3JjXFxCdWlsZGVyLmpzIiwibm9kZV9tb2R1bGVzXFxAdmVzdGVyZ2FhcmQtY29tcGFueVxcanMtbWl4aW5cXHNyY1xcRGVjb3JhdG9yc1xcQmFyZU1peGluLmpzIiwibm9kZV9tb2R1bGVzXFxAdmVzdGVyZ2FhcmQtY29tcGFueVxcanMtbWl4aW5cXHNyY1xcRGVjb3JhdG9yc1xcQ2FjaGVkLmpzIiwibm9kZV9tb2R1bGVzXFxAdmVzdGVyZ2FhcmQtY29tcGFueVxcanMtbWl4aW5cXHNyY1xcRGVjb3JhdG9yc1xcSGFzSW5zdGFuY2UuanMiLCJub2RlX21vZHVsZXNcXEB2ZXN0ZXJnYWFyZC1jb21wYW55XFxqcy1taXhpblxcc3JjXFxVdGlsc1xcd3JhcC5qcyIsIm5vZGVfbW9kdWxlc1xcQHZlc3RlcmdhYXJkLWNvbXBhbnlcXGpzLW1peGluXFxzcmNcXGRlY2xhcmUuanMiLCJub2RlX21vZHVsZXNcXEB2ZXN0ZXJnYWFyZC1jb21wYW55XFxqcy1taXhpblxcc3JjXFxtaXguanMiLCJub2RlX21vZHVsZXMvbW91c2V0cmFwL21vdXNldHJhcC5qcyIsInNyY1xcYXBwLmpzIiwic3JjXFxhdHRyaWJ1dGVzXFxhcmlhLWNoZWNrZWQuanMiLCJzcmNcXGF0dHJpYnV0ZXNcXGFyaWEtZXhwYW5kZWQuanMiLCJzcmNcXGF0dHJpYnV0ZXNcXGFyaWEtcHJlc3NlZC5qcyIsInNyY1xcYXR0cmlidXRlc1xcYXJpYS1zZWxlY3RlZC5qcyIsInNyY1xcZGF0YVxccm9sZXMuanMiLCJzcmNcXG1peGluc1xcU2VsZWN0aW9uLmpzIiwic3JjXFxtaXhpbnNcXFZhbGlkYXRpb24uanMiLCJzcmNcXHJvbGVcXEJ1dHRvbi5qcyIsInNyY1xccm9sZVxcQ2hlY2tib3guanMiLCJzcmNcXHJvbGVcXENvbWJvYm94LmpzIiwic3JjXFxyb2xlXFxEaWFsb2cuanMiLCJzcmNcXHJvbGVcXEZvcm0uanMiLCJzcmNcXHJvbGVcXExpbmsuanMiLCJzcmNcXHJvbGVcXExpc3Rib3guanMiLCJzcmNcXHJvbGVcXE9wdGlvbi5qcyIsInNyY1xccm9sZVxcU2xpZGVyLmpzIiwic3JjXFxyb2xlXFxTcGluYnV0dG9uLmpzIiwic3JjXFxyb2xlXFxTd2l0Y2guanMiLCJzcmNcXHJvbGVcXFRhYi5qcyIsInNyY1xccm9sZVxcVGFibGlzdC5qcyIsInNyY1xccm9sZVxcVGFicGFuZWwuanMiLCJzcmNcXHJvbGVcXFRleHRib3guanMiLCJzcmNcXHJvbGVcXGFic3RyYWN0XFxDb21tYW5kLmpzIiwic3JjXFxyb2xlXFxhYnN0cmFjdFxcQ29tcG9zaXRlLmpzIiwic3JjXFxyb2xlXFxhYnN0cmFjdFxcSW5wdXQuanMiLCJzcmNcXHJvbGVcXGFic3RyYWN0XFxMYW5kbWFyay5qcyIsInNyY1xccm9sZVxcYWJzdHJhY3RcXFJhbmdlLmpzIiwic3JjXFxyb2xlXFxhYnN0cmFjdFxcUm9sZXR5cGUuanMiLCJzcmNcXHJvbGVcXGFic3RyYWN0XFxTZWN0aW9uLmpzIiwic3JjXFxyb2xlXFxhYnN0cmFjdFxcU2VsZWN0LmpzIiwic3JjXFxyb2xlXFxhYnN0cmFjdFxcU3RydWN0dXJlLmpzIiwic3JjXFxyb2xlXFxhYnN0cmFjdFxcV2lkZ2V0LmpzIiwic3JjXFxyb2xlXFxhYnN0cmFjdFxcV2luZG93LmpzIiwic3JjXFxyb2xlXFxvcHRpb24uanMiLCJzcmNcXHJvbGVcXHNlYXJjaGJveC5qcyIsInNyY1xcdHlwZVxcQWNjZXNzaWJsZU5vZGUuanMiLCJzcmNcXHR5cGVcXEFjY2Vzc2libGVOb2RlTGlzdC5qcyIsInNyY1xcdHlwZVxcRE9NU3RyaW5nLmpzIiwic3JjXFx0eXBlXFxib29sZWFuLmpzIiwic3JjXFx0eXBlXFxkb3VibGUuanMiLCJzcmNcXHR5cGVcXGxvbmcuanMiLCJzcmNcXHV0aWxzXFxWYWxpZGl0eVN0YXRlLmpzIiwic3JjXFx1dGlsc1xcY3JlYXRlLmpzIiwic3JjXFx1dGlsc1xcZWxlbWVudHMuanMiLCJzcmNcXHV0aWxzXFxnZXRBY3RpdmUuanMiLCJzcmNcXHV0aWxzXFxnZXRDb21wdXRlZFJvbGUuanMiLCJzcmNcXHV0aWxzXFxtYW5hZ2luZ0ZvY3VzLmpzIiwic3JjXFx1dGlsc1xcc2VsZWN0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDRUE7Ozs7QUFJQTs7OztBQUlBOzs7O0FBR0E7Ozs7QUFHQTs7OztBQUlBOzs7Ozs7OztBQWZBOztBQUpBOztRQU1TLFk7O0FBRVQ7O1FBRVMsUztRQUdBLFc7UUFHQSxNOztBQUVUOztRQUVTLEk7OztBQ3JCVDs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBWU0sTzs7QUFFRjs7Ozs7QUFLQSxxQkFBWSxVQUFaLEVBQXVCO0FBQUE7O0FBQ25CLGFBQUssVUFBTCxHQUFrQjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLFdBQWxCO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs7O2dDQU9lO0FBQUEsOENBQVAsTUFBTztBQUFQLHNCQUFPO0FBQUE7O0FBQ1gsbUJBQU8sT0FBTyxNQUFQLENBQWMsVUFBQyxDQUFELEVBQUksQ0FBSixFQUFVOztBQUUzQixvQkFBRyxPQUFPLENBQVAsS0FBYSxVQUFoQixFQUEyQjtBQUN2QiwyQkFBTyxDQUFQO0FBQ0g7O0FBRUQsdUJBQU8sRUFBRSxDQUFGLENBQVA7QUFDSCxhQVBNLEVBT0osS0FBSyxVQVBELENBQVA7QUFRSDs7Ozs7O2tCQUdVLE87OztBQzVDZjs7Ozs7OztBQUVBOzs7Ozs7QUFHQTs7Ozs7QUFLTyxJQUFNLDRDQUFrQixPQUFPLFVBQVAsQ0FBeEI7O0FBRVA7Ozs7Ozs7Ozs7QUFVQSxJQUFNLFlBQVksU0FBWixTQUFZLENBQUMsVUFBRDtBQUFBLFNBQWdCLG9CQUFLLFVBQUwsRUFBaUIsVUFBQyxVQUFELEVBQWdCO0FBQy9EO0FBQ0EsUUFBSSxNQUFNLFdBQVcsVUFBWCxDQUFWOztBQUVBO0FBQ0E7QUFDQSxRQUFJLFNBQUosQ0FBYyxlQUFkLElBQWlDLGdDQUFqQzs7QUFFQSxXQUFPLEdBQVA7QUFDSCxHQVRpQyxDQUFoQjtBQUFBLENBQWxCOztrQkFXZSxTOzs7QUNqQ2Y7Ozs7Ozs7QUFFQTs7Ozs7O0FBRUE7Ozs7O0FBS08sSUFBTSw4Q0FBbUIsT0FBTyxXQUFQLENBQXpCOztBQUVQOzs7Ozs7Ozs7OztBQVdBLElBQU0sU0FBUyxTQUFULE1BQVMsQ0FBQyxVQUFEO0FBQUEsV0FBZ0Isb0JBQUssVUFBTCxFQUFpQixVQUFDLFVBQUQsRUFBZ0I7QUFDNUQ7QUFDQSxZQUFJLGtCQUFrQixXQUFXLGdCQUFYLENBQXRCOztBQUVBO0FBQ0E7QUFDQSxZQUFJLENBQUUsZUFBTixFQUFzQjs7QUFFbEI7QUFDQTtBQUNBLDhCQUFrQixXQUFXLGdCQUFYLElBQStCLE9BQU8sV0FBVyxJQUFsQixDQUFqRDtBQUNIOztBQUVEO0FBQ0E7QUFDQSxZQUFHLFdBQVcsY0FBWCxDQUEwQixlQUExQixDQUFILEVBQThDO0FBQzFDLG1CQUFPLFdBQVcsZUFBWCxDQUFQO0FBQ0g7O0FBRUQ7QUFDQSxZQUFJLFlBQVksV0FBVyxVQUFYLENBQWhCOztBQUVBO0FBQ0EsbUJBQVcsZUFBWCxJQUE4QixTQUE5Qjs7QUFFQTtBQUNBLGVBQU8sU0FBUDtBQUNILEtBM0I4QixDQUFoQjtBQUFBLENBQWY7O2tCQTZCZSxNOzs7QUNuRGY7Ozs7OztBQUVBOztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUFZQSxJQUFNLGNBQWMsU0FBZCxXQUFjLENBQUMsVUFBRCxFQUFnQjs7QUFFaEM7QUFDQTtBQUNBO0FBQ0EsUUFBRyxXQUFXLGNBQVgsQ0FBMEIsT0FBTyxXQUFqQyxDQUFILEVBQWlEO0FBQzdDLGVBQU8sVUFBUDtBQUNIOztBQUVEO0FBQ0E7QUFDQSxXQUFPLGNBQVAsQ0FBc0IsVUFBdEIsRUFBa0MsT0FBTyxXQUF6QyxFQUFzRDs7QUFFbEQsZUFBTyxlQUFTLFFBQVQsRUFBa0I7QUFDckI7QUFDQSxnQkFBSSxxQkFBcUIsMEJBQXpCOztBQUVBO0FBQ0E7QUFDQSxnQkFBSSxDQUFFLGtCQUFOLEVBQXlCO0FBQ3JCLHVCQUFPLEtBQVA7QUFDSDs7QUFFRDtBQUNBLG1CQUFNLGFBQWEsSUFBbkIsRUFBd0I7O0FBRXBCO0FBQ0E7QUFDQSxvQkFBRyxTQUFTLGNBQVQsZ0NBQTRDLHlDQUE4QixrQkFBN0UsRUFBZ0c7QUFDNUYsMkJBQU8sSUFBUDtBQUNIOztBQUVEO0FBQ0EsMkJBQVcsT0FBTyxjQUFQLENBQXNCLFFBQXRCLENBQVg7QUFDSDs7QUFFRDtBQUNBO0FBQ0EsbUJBQU8sS0FBUDtBQUNIOztBQTVCaUQsS0FBdEQ7O0FBZ0NBO0FBQ0EsV0FBTyxVQUFQO0FBQ0gsQ0E3Q0Q7O2tCQStDZSxXOzs7QUNoRWY7O0FBRUE7Ozs7Ozs7OztBQUtPLElBQU0sMENBQWlCLE9BQU8sZUFBUCxDQUF2Qjs7QUFFUDs7Ozs7Ozs7O0FBU0EsSUFBTSxPQUFPLFNBQVAsSUFBTyxDQUFDLFVBQUQsRUFBYSxPQUFiLEVBQXlCO0FBQ2xDLFNBQU8sY0FBUCxDQUFzQixPQUF0QixFQUErQixVQUEvQjs7QUFFQSxNQUFJLENBQUMsV0FBVyxjQUFYLENBQUwsRUFBaUM7QUFDN0IsZUFBVyxjQUFYLElBQTZCLFVBQTdCO0FBQ0g7O0FBRUQsU0FBTyxPQUFQO0FBQ0gsQ0FSRDs7a0JBVWUsSTs7O0FDNUJmOzs7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBOzs7Ozs7Ozs7Ozs7QUFZQSxJQUFNLGVBQWUsU0FBZixZQUFlLENBQUMsVUFBRCxFQUFnQjtBQUNqQyxXQUFPLHNCQUNILDJCQUNJLHlCQUFVLFVBQVYsQ0FESixDQURHLENBQVA7QUFLSCxDQU5EOztrQkFRZSxZOzs7QUMxQmY7Ozs7OztBQUVBOzs7Ozs7QUFFQTs7Ozs7Ozs7O0FBU0EsSUFBTSxNQUFNLFNBQU4sR0FBTSxDQUFDLFVBQUQ7QUFBQSxTQUFnQixzQkFBWSxVQUFaLENBQWhCO0FBQUEsQ0FBWjs7a0JBRWUsRzs7O0FDZmY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNwaENBOzs7O0FBQ0E7Ozs7OztBQUVBLE9BQU8sUUFBUDs7QUFFQSxpQkFBTyxHQUFQOzs7Ozs7Ozs7OztBQ0xBOzs7Ozs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7O0FBU0EsSUFBSSxjQUFjLFNBQWQsV0FBYyxDQUFDLFVBQUQ7QUFBQTtBQUFBOztBQUVqQixvQkFBcUI7QUFBQTs7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QUFYLENBQWUsT0FBZixDQUF1QjtBQUFBLFVBQU8sV0FBVyxTQUFTLE1BQVQsQ0FBZ0IsaUJBQWlCLEdBQWpCLENBQWhCLENBQWxCO0FBQUEsR0FBdkI7QUFDQTs7QUFFRCxRQUFPLFFBQVA7QUFDQTs7QUFFTSxTQUFTLE9BQVQsQ0FBaUIsR0FBakIsRUFBc0I7QUFDNUIsUUFBTyxxQkFBcUIsR0FBckIsRUFBMEIsSUFBMUIsQ0FBK0IsSUFBL0IsQ0FBUDtBQUNBOztrQkFFYyxFQUFFLGdCQUFGLEVBQVcsUUFBWCxFQUFnQix3QkFBaEIsRUFBNkIsZ0JBQTdCLEUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG4vLyBEZWZhdWx0IGV4cG9ydCAtIE1peCB3cmFwcGVyXG5pbXBvcnQgbWl4IGZyb20gJy4vc3JjL21peCc7XG5leHBvcnQgZGVmYXVsdCBtaXg7XG5cbi8vIERlY2xhcmUgbWl4aW4gY2xhc3Nlc1xuaW1wb3J0IERlY2xhcmVNaXhpbiBmcm9tICcuL3NyYy9kZWNsYXJlJztcbmV4cG9ydCB7IERlY2xhcmVNaXhpbiB9O1xuXG4vLyBEZWNvcmF0b3JzXG5pbXBvcnQgQmFyZU1peGluIGZyb20gJy4vc3JjL0RlY29yYXRvcnMvQmFyZU1peGluJztcbmV4cG9ydCB7IEJhcmVNaXhpbiB9O1xuXG5pbXBvcnQgSGFzSW5zdGFuY2UgZnJvbSAnLi9zcmMvRGVjb3JhdG9ycy9IYXNJbnN0YW5jZSc7XG5leHBvcnQgeyBIYXNJbnN0YW5jZSB9O1xuXG5pbXBvcnQgQ2FjaGVkIGZyb20gJy4vc3JjL0RlY29yYXRvcnMvQ2FjaGVkJztcbmV4cG9ydCB7IENhY2hlZCB9O1xuXG4vLyBVdGlsc1xuaW1wb3J0IHdyYXAgZnJvbSAnLi9zcmMvVXRpbHMvd3JhcCc7XG5leHBvcnQgeyB3cmFwIH07IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1peGluIEJ1aWxkZXJcbiAqXG4gKiBBbGxvd3MgeW91IHRvIGV4dGVuZCBhIGNsYXNzIHdpdGggb25lIG9yIG1vcmUgbWl4aW4gY2xhc3Nlcy5cbiAqXG4gKiBUaGlzIGJ1aWxkZXIgaXMgaGVhdmlseSBpbnNwaXJlZCBieSBKdXN0aW4gRmFnbmFuaSdzIE1peHdpdGguanNcbiAqXG4gKiBAc2VlIGh0dHA6Ly9qdXN0aW5mYWduYW5pLmNvbS8yMDE1LzEyLzIxL3JlYWwtbWl4aW5zLXdpdGgtamF2YXNjcmlwdC1jbGFzc2VzL1xuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vanVzdGluZmFnbmFuaS9taXh3aXRoLmpzXG4gKlxuICogQGF1dGhvciBBbGluIEV1Z2VuIERlYWMgPGFkZUB2ZXN0ZXJnYWFyZGNvbXBhbnkuY29tPlxuICovXG5jbGFzcyBCdWlsZGVyIHtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBCdWlsZGVyIGluc3RhbmNlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbc3VwZXJDbGFzcz1jbGFzcyB7fV1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihzdXBlckNsYXNzKXtcbiAgICAgICAgdGhpcy5zdXBlckNsYXNzID0gc3VwZXJDbGFzcyB8fCBjbGFzcyB7fTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNaXhpbiBvbmUgb3IgbW9yZSBtaXhpbi1jbGFzc2VzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5LjxGdW5jdGlvbj59IG1peGluc1xuICAgICAqXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IEEgc3VwY2xhc3Mgd2l0aCBtaXhpbnMgYXBwbGllZFxuICAgICAqL1xuICAgIHdpdGgoLi4ubWl4aW5zKXtcbiAgICAgICAgcmV0dXJuIG1peGlucy5yZWR1Y2UoKGMsIG0pID0+IHtcblxuICAgICAgICAgICAgaWYodHlwZW9mIG0gIT09ICdmdW5jdGlvbicpe1xuICAgICAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbShjKTtcbiAgICAgICAgfSwgdGhpcy5zdXBlckNsYXNzKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJ1aWxkZXI7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBPUklHSU5BTF9NSVhJTiB9IGZyb20gJy4vLi4vVXRpbHMvd3JhcCc7XG5pbXBvcnQgd3JhcCBmcm9tICcuLy4uL1V0aWxzL3dyYXAnO1xuXG4vKipcbiAqIFJlZmVyZW5jZSB0byBhIG1peGluXG4gKlxuICogQHR5cGUge1N5bWJvbH1cbiAqL1xuZXhwb3J0IGNvbnN0IE1JWElOX1JFRkVSRU5DRSA9IFN5bWJvbCgnbWl4aW5SZWYnKTtcblxuLyoqXG4gKiBEZWNvcmF0b3IgdGhhdCBzdG9yZXMgYSByZWZlcmVuY2UgdG8gdGhlIG1peGluIGNsYXNzLCB3aGljaFxuICogdWx0aW1hdGVseSBjYW4gYmUgdXNlZCBmb3IgXCJpbnN0YW5jZSBvZlwiIGNoZWNrcy5cbiAqXG4gKiBAc2VlIHdyYXBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtaXhpbkNsYXNzXG4gKlxuICogQHJldHVybiB7RnVuY3Rpb259IERlY29yYXRlZCBtaXhpblxuICovXG5jb25zdCBCYXJlTWl4aW4gPSAobWl4aW5DbGFzcykgPT4gd3JhcChtaXhpbkNsYXNzLCAoc3VwZXJjbGFzcykgPT4ge1xuICAgIC8vIEFwcGx5IHRoZSBtaXhpbiBjbGFzc1xuICAgIGxldCBhcHAgPSBtaXhpbkNsYXNzKHN1cGVyY2xhc3MpO1xuXG4gICAgLy8gQWRkIHJlZmVyZW5jZSB0byB0aGUgd3JhcHBlZCBtaXhpbiBjbGFzcywgc28gdGhhdCB3ZSBjYW4gZW5hYmxlXG4gICAgLy8gYSBcImluc3RhbmNlIG9mXCIgc3VwcG9ydC5cbiAgICBhcHAucHJvdG90eXBlW01JWElOX1JFRkVSRU5DRV0gPSBtaXhpbkNsYXNzW09SSUdJTkFMX01JWElOXTtcblxuICAgIHJldHVybiBhcHA7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQmFyZU1peGluOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHdyYXAgZnJvbSAnLi8uLi9VdGlscy93cmFwJztcblxuLyoqXG4gKiBDYWNoZWQgbWl4aW4gY2xhc3MgcmVmZXJlbmNlXG4gKlxuICogQHR5cGUge1N5bWJvbH1cbiAqL1xuZXhwb3J0IGNvbnN0IENBQ0hFRF9SRUZFUkVOQ0UgPSBTeW1ib2woJ2NhY2hlZFJlZicpO1xuXG4vKipcbiAqIERlY29yYXRlIHRoZSBnaXZlbiBtaXhpbiBjbGFzcyB3aXRoIGEgXCJjYWNoZWQgZGVjb3JhdG9yXCIuXG4gKlxuICogTWV0aG9kIHdpbGwgZW5zdXJlIHRoYXQgaWYgdGhlIGdpdmVuIG1peGluIGhhcyBhbHJlYWR5IGJlZW4gYXBwbGllZCxcbiAqIHRoZW4gaXQgd2lsbCBiZSByZXR1cm5lZCAvIGFwcGxpZWQgYSBzaW5nbGUgdGltZSwgcmF0aGVyIHRoYW4gbXVsdGlwbGVcbiAqIHRpbWVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1peGluQ2xhc3NcbiAqXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xuY29uc3QgQ2FjaGVkID0gKG1peGluQ2xhc3MpID0+IHdyYXAobWl4aW5DbGFzcywgKHN1cGVyY2xhc3MpID0+IHtcbiAgICAvLyBPYnRhaW4gY2FjaGVkIHJlZmVyZW5jZS4uLlxuICAgIGxldCBjYWNoZWRSZWZlcmVuY2UgPSBtaXhpbkNsYXNzW0NBQ0hFRF9SRUZFUkVOQ0VdO1xuXG4gICAgLy8gSWYgdGhlcmUgaXMgbm8gY2FjaGVkIHJlZmVyZW5jZSwgdGhlbiB3ZSBjcmVhdGUgb25lIG9udG9cbiAgICAvLyB0aGUgZ2l2ZW4gbWl4aW4gY2xhc3NcbiAgICBpZiggISBjYWNoZWRSZWZlcmVuY2Upe1xuXG4gICAgICAgIC8vIENyZWF0ZSBhIG5ldyBzeW1ib2wgaW4gdGhlIG1peGluIGNsYXNzLCB1c2luZyB0aGUgZnVuY3Rpb24ncyBuYW1lXG4gICAgICAgIC8vIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvRnVuY3Rpb24vbmFtZVxuICAgICAgICBjYWNoZWRSZWZlcmVuY2UgPSBtaXhpbkNsYXNzW0NBQ0hFRF9SRUZFUkVOQ0VdID0gU3ltYm9sKG1peGluQ2xhc3MubmFtZSk7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgaWYgZ2l2ZW4gc3VwZXJjbGFzcyBhbHJlYWR5IGhhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2l2ZW4gbWl4aW4gY2xhc3NcbiAgICAvLyBJZiBzbywgdGhlbiByZXR1cm4gaXQuXG4gICAgaWYoc3VwZXJjbGFzcy5oYXNPd25Qcm9wZXJ0eShjYWNoZWRSZWZlcmVuY2UpKXtcbiAgICAgICAgcmV0dXJuIHN1cGVyY2xhc3NbY2FjaGVkUmVmZXJlbmNlXTtcbiAgICB9XG5cbiAgICAvLyBEZWNvcmF0ZSB0aGUgZ2l2ZW4gc3VwZXIgY2xhc3NcbiAgICBsZXQgZGVjb3JhdGVkID0gbWl4aW5DbGFzcyhzdXBlcmNsYXNzKTtcblxuICAgIC8vIENhY2hlIHRoZSByZWZlcmVuY2UgaW50byB0aGUgc3VwZXJjbGFzc1xuICAgIHN1cGVyY2xhc3NbY2FjaGVkUmVmZXJlbmNlXSA9IGRlY29yYXRlZDtcblxuICAgIC8vIEZpbmFsbHksIHJldHVybiB0aGUgZGVjb3JhdGVkIG1peGluLlxuICAgIHJldHVybiBkZWNvcmF0ZWQ7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FjaGVkOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgT1JJR0lOQUxfTUlYSU4gfSBmcm9tICcuLy4uL1V0aWxzL3dyYXAnO1xuaW1wb3J0IHsgTUlYSU5fUkVGRVJFTkNFIH0gZnJvbSAnLi9CYXJlTWl4aW4nO1xuXG4vKipcbiAqIERlY29yYXRlcyB0aGUgZ2l2ZW4gbWl4aW4gY2xhc3MgdG8gc3VwcG9ydCBcImluc3RhbmNlIG9mXCIgb3BlcmF0aW9uLlxuICpcbiAqIFRoZSBnaXZlbiBtaXhpbiBjbGFzcyBNVVNUIGJlIGRlY29yYXRlZCB3aXRoIHRoZSBcIkJhcmVNaXhpblwiIGZvciB0aGlzXG4gKiB0byB3b3JrLlxuICpcbiAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvU3ltYm9sL2hhc0luc3RhbmNlXG4gKiBAc2VlIEJhcmVNaXhpblxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1peGluQ2xhc3NcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBEZWNvcmF0ZWQgbWl4aW4gY2xhc3NcbiAqL1xuY29uc3QgSGFzSW5zdGFuY2UgPSAobWl4aW5DbGFzcykgPT4ge1xuXG4gICAgLy8gSWYgZ2l2ZW4gbWl4aW4gY2xhc3MgYWxyZWFkeSBoYXMgYSBjdXN0b20gXCJoYXMgaW5zdGFuY2VcIlxuICAgIC8vIHN5bWJvbCwgdGhlbiBhYm9ydCAtIGp1c3QgcmV0dXJuIHRoZSBtaXhpbiwgc2luY2UgdGhlcmVcbiAgICAvLyBpcyBubyBuZWVkIHRvIGFkZCBjdXN0b20gYmVoYXZpb3VyIHRvIGl0LlxuICAgIGlmKG1peGluQ2xhc3MuaGFzT3duUHJvcGVydHkoU3ltYm9sLmhhc0luc3RhbmNlKSl7XG4gICAgICAgIHJldHVybiBtaXhpbkNsYXNzO1xuICAgIH1cblxuICAgIC8vIE90aGVyd2lzZSwgd2UgYWRkIGEgY3VzdG9tIFN5bWJvbC5oYXNJbnN0YW5jZSBtZXRob2QgZm9yXG4gICAgLy8gdGhlIG1peGluIGNsYXNzLlxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtaXhpbkNsYXNzLCBTeW1ib2wuaGFzSW5zdGFuY2UsIHtcblxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24oaW5zdGFuY2Upe1xuICAgICAgICAgICAgLy8gRmV0Y2ggdGhlIG9yaWdpbmFsIG1peGluIGNsYXNzXG4gICAgICAgICAgICBsZXQgb3JpZ2luYWxNaXhpbkNsYXNzID0gdGhpc1tPUklHSU5BTF9NSVhJTl07XG5cbiAgICAgICAgICAgIC8vIElmIHRoZXJlIGlzIG5vIG9yaWdpbmFsIG1peGluIGNsYXNzLCB0aGVuIHdlIHNpbXBseVxuICAgICAgICAgICAgLy8gYWJvcnQgLSBpdCBjYW5ub3QgYmUgYW4gaW5zdGFuY2Ugb2YgdGhlIGdpdmVuLi4uXG4gICAgICAgICAgICBpZiggISBvcmlnaW5hbE1peGluQ2xhc3Mpe1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gTG9vcCB0aHJvdWdoIHRoZSBnaXZlbiBpbnN0YW5jZSdzIHByb3RvdHlwZSBjaGFpblxuICAgICAgICAgICAgd2hpbGUoaW5zdGFuY2UgIT09IG51bGwpe1xuXG4gICAgICAgICAgICAgICAgLy8gSWYgYSByZWZlcmVuY2UgaGFzIGJlZW4gc3RhdGVkIG9uIHRoZSBtaXhpbiBjbGFzcyBhbmQgaXRcbiAgICAgICAgICAgICAgICAvLyBtYXRjaGVzIHRoZSBvcmlnaW5hbCBtaXhpbiwgd2UgYXNzdW1lIHRoYXRcbiAgICAgICAgICAgICAgICBpZihpbnN0YW5jZS5oYXNPd25Qcm9wZXJ0eShNSVhJTl9SRUZFUkVOQ0UpICYmIGluc3RhbmNlW01JWElOX1JFRkVSRU5DRV0gPT09IG9yaWdpbmFsTWl4aW5DbGFzcyl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIEZldGNoIHRoZSBuZXh0IHByb3RvdHlwZVxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGluc3RhbmNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gSWYgbm90aGluZyB3YXMgbWF0Y2hlZCwgdGhlbiB3ZSBhc3N1bWUgdGhhdCB0aGUgaW5zdGFuY2VzXG4gICAgICAgICAgICAvLyBzaW1wbHkgZG8gbm90IG1hdGNoLlxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIC8vIEZpbmFsbHksIHJldHVybiB0aGUgZGVjb3JhdGVkIG1peGluIGNsYXNzXG4gICAgcmV0dXJuIG1peGluQ2xhc3M7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBIYXNJbnN0YW5jZTsiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogUmVmZXJlbmNlIHRvIGFuIG9yaWdpbmFsIG1peGluXG4gKlxuICogQHR5cGUge1N5bWJvbH1cbiAqL1xuZXhwb3J0IGNvbnN0IE9SSUdJTkFMX01JWElOID0gU3ltYm9sKCdvcmlnaW5hbE1peGluJyk7XG5cbi8qKlxuICogU2V0cyB0aGUgcHJvdG90eXBlIG9mIHRoZSB3cmFwcGVyIHRvIGJlIHRoZSBnaXZlbiBtaXhpbiBjbGFzc1xuICogYW5kIHN0b3JlcyBhIHJlZmVyZW5jZSB0byB0aGUgb3JpZ2luYWwgbWl4aW4uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWl4aW5DbGFzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gd3JhcHBlclxuICpcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBXcmFwcGVyXG4gKi9cbmNvbnN0IHdyYXAgPSAobWl4aW5DbGFzcywgd3JhcHBlcikgPT4ge1xuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih3cmFwcGVyLCBtaXhpbkNsYXNzKTtcblxuICAgIGlmICghbWl4aW5DbGFzc1tPUklHSU5BTF9NSVhJTl0pIHtcbiAgICAgICAgbWl4aW5DbGFzc1tPUklHSU5BTF9NSVhJTl0gPSBtaXhpbkNsYXNzO1xuICAgIH1cblxuICAgIHJldHVybiB3cmFwcGVyO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgd3JhcDsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBCYXJlTWl4aW4gZnJvbSAnLi9EZWNvcmF0b3JzL0JhcmVNaXhpbic7XG5pbXBvcnQgSGFzSW5zdGFuY2UgZnJvbSAnLi9EZWNvcmF0b3JzL0hhc0luc3RhbmNlJztcbmltcG9ydCBDYWNoZWQgZnJvbSAnLi9EZWNvcmF0b3JzL0NhY2hlZCc7XG5cbi8qKlxuICogRGVjbGFyZSBhIG1peGluIC0gZGVjb3JhdGVzIHRoZSBnaXZlbiBtaXhpbiBjbGFzcyB3aXRoXG4gKiBhIFwiY2FjaGVkLCBoYXMgaW5zdGFuY2UgYW5kIGJhcmUgbWl4aW5cIiBkZWNvcmF0b3JzLlxuICpcbiAqIEBzZWUgQmFyZU1peGluXG4gKiBAc2VlIEhhc0luc3RhbmNlXG4gKiBAc2VlIENhY2hlZFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1peGluQ2xhc3NcbiAqXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xuY29uc3QgRGVjbGFyZU1peGluID0gKG1peGluQ2xhc3MpID0+IHtcbiAgICByZXR1cm4gQ2FjaGVkKFxuICAgICAgICBIYXNJbnN0YW5jZShcbiAgICAgICAgICAgIEJhcmVNaXhpbihtaXhpbkNsYXNzKVxuICAgICAgICApXG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERlY2xhcmVNaXhpbjsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBCdWlsZGVyIGZyb20gJy4vQnVpbGRlcic7XG5cbi8qKlxuICogTWl4aW4gQnVpbGRlciB3cmFwcGVyXG4gKlxuICogQWxsb3dzIHlvdSB0byBleHRlbmQgYSBjbGFzcyB3aXRoIG9uZSBvciBtb3JlIG1peGluLWNsYXNzZXMuXG4gKlxuICogQHNlZSBCdWlsZGVyXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gW3N1cGVyQ2xhc3M9Y2xhc3Mge31dXG4gKi9cbmNvbnN0IG1peCA9IChzdXBlckNsYXNzKSA9PiBuZXcgQnVpbGRlcihzdXBlckNsYXNzKTtcblxuZXhwb3J0IGRlZmF1bHQgbWl4OyIsIi8qZ2xvYmFsIGRlZmluZTpmYWxzZSAqL1xuLyoqXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE3IENyYWlnIENhbXBiZWxsXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICogTW91c2V0cmFwIGlzIGEgc2ltcGxlIGtleWJvYXJkIHNob3J0Y3V0IGxpYnJhcnkgZm9yIEphdmFzY3JpcHQgd2l0aFxuICogbm8gZXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKlxuICogQHZlcnNpb24gMS42LjFcbiAqIEB1cmwgY3JhaWcuaXMva2lsbGluZy9taWNlXG4gKi9cbihmdW5jdGlvbih3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcblxuICAgIC8vIENoZWNrIGlmIG1vdXNldHJhcCBpcyB1c2VkIGluc2lkZSBicm93c2VyLCBpZiBub3QsIHJldHVyblxuICAgIGlmICghd2luZG93KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBtYXBwaW5nIG9mIHNwZWNpYWwga2V5Y29kZXMgdG8gdGhlaXIgY29ycmVzcG9uZGluZyBrZXlzXG4gICAgICpcbiAgICAgKiBldmVyeXRoaW5nIGluIHRoaXMgZGljdGlvbmFyeSBjYW5ub3QgdXNlIGtleXByZXNzIGV2ZW50c1xuICAgICAqIHNvIGl0IGhhcyB0byBiZSBoZXJlIHRvIG1hcCB0byB0aGUgY29ycmVjdCBrZXljb2RlcyBmb3JcbiAgICAgKiBrZXl1cC9rZXlkb3duIGV2ZW50c1xuICAgICAqXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICB2YXIgX01BUCA9IHtcbiAgICAgICAgODogJ2JhY2tzcGFjZScsXG4gICAgICAgIDk6ICd0YWInLFxuICAgICAgICAxMzogJ2VudGVyJyxcbiAgICAgICAgMTY6ICdzaGlmdCcsXG4gICAgICAgIDE3OiAnY3RybCcsXG4gICAgICAgIDE4OiAnYWx0JyxcbiAgICAgICAgMjA6ICdjYXBzbG9jaycsXG4gICAgICAgIDI3OiAnZXNjJyxcbiAgICAgICAgMzI6ICdzcGFjZScsXG4gICAgICAgIDMzOiAncGFnZXVwJyxcbiAgICAgICAgMzQ6ICdwYWdlZG93bicsXG4gICAgICAgIDM1OiAnZW5kJyxcbiAgICAgICAgMzY6ICdob21lJyxcbiAgICAgICAgMzc6ICdsZWZ0JyxcbiAgICAgICAgMzg6ICd1cCcsXG4gICAgICAgIDM5OiAncmlnaHQnLFxuICAgICAgICA0MDogJ2Rvd24nLFxuICAgICAgICA0NTogJ2lucycsXG4gICAgICAgIDQ2OiAnZGVsJyxcbiAgICAgICAgOTE6ICdtZXRhJyxcbiAgICAgICAgOTM6ICdtZXRhJyxcbiAgICAgICAgMjI0OiAnbWV0YSdcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogbWFwcGluZyBmb3Igc3BlY2lhbCBjaGFyYWN0ZXJzIHNvIHRoZXkgY2FuIHN1cHBvcnRcbiAgICAgKlxuICAgICAqIHRoaXMgZGljdGlvbmFyeSBpcyBvbmx5IHVzZWQgaW5jYXNlIHlvdSB3YW50IHRvIGJpbmQgYVxuICAgICAqIGtleXVwIG9yIGtleWRvd24gZXZlbnQgdG8gb25lIG9mIHRoZXNlIGtleXNcbiAgICAgKlxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgdmFyIF9LRVlDT0RFX01BUCA9IHtcbiAgICAgICAgMTA2OiAnKicsXG4gICAgICAgIDEwNzogJysnLFxuICAgICAgICAxMDk6ICctJyxcbiAgICAgICAgMTEwOiAnLicsXG4gICAgICAgIDExMSA6ICcvJyxcbiAgICAgICAgMTg2OiAnOycsXG4gICAgICAgIDE4NzogJz0nLFxuICAgICAgICAxODg6ICcsJyxcbiAgICAgICAgMTg5OiAnLScsXG4gICAgICAgIDE5MDogJy4nLFxuICAgICAgICAxOTE6ICcvJyxcbiAgICAgICAgMTkyOiAnYCcsXG4gICAgICAgIDIxOTogJ1snLFxuICAgICAgICAyMjA6ICdcXFxcJyxcbiAgICAgICAgMjIxOiAnXScsXG4gICAgICAgIDIyMjogJ1xcJydcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogdGhpcyBpcyBhIG1hcHBpbmcgb2Yga2V5cyB0aGF0IHJlcXVpcmUgc2hpZnQgb24gYSBVUyBrZXlwYWRcbiAgICAgKiBiYWNrIHRvIHRoZSBub24gc2hpZnQgZXF1aXZlbGVudHNcbiAgICAgKlxuICAgICAqIHRoaXMgaXMgc28geW91IGNhbiB1c2Uga2V5dXAgZXZlbnRzIHdpdGggdGhlc2Uga2V5c1xuICAgICAqXG4gICAgICogbm90ZSB0aGF0IHRoaXMgd2lsbCBvbmx5IHdvcmsgcmVsaWFibHkgb24gVVMga2V5Ym9hcmRzXG4gICAgICpcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHZhciBfU0hJRlRfTUFQID0ge1xuICAgICAgICAnfic6ICdgJyxcbiAgICAgICAgJyEnOiAnMScsXG4gICAgICAgICdAJzogJzInLFxuICAgICAgICAnIyc6ICczJyxcbiAgICAgICAgJyQnOiAnNCcsXG4gICAgICAgICclJzogJzUnLFxuICAgICAgICAnXic6ICc2JyxcbiAgICAgICAgJyYnOiAnNycsXG4gICAgICAgICcqJzogJzgnLFxuICAgICAgICAnKCc6ICc5JyxcbiAgICAgICAgJyknOiAnMCcsXG4gICAgICAgICdfJzogJy0nLFxuICAgICAgICAnKyc6ICc9JyxcbiAgICAgICAgJzonOiAnOycsXG4gICAgICAgICdcXFwiJzogJ1xcJycsXG4gICAgICAgICc8JzogJywnLFxuICAgICAgICAnPic6ICcuJyxcbiAgICAgICAgJz8nOiAnLycsXG4gICAgICAgICd8JzogJ1xcXFwnXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIHRoaXMgaXMgYSBsaXN0IG9mIHNwZWNpYWwgc3RyaW5ncyB5b3UgY2FuIHVzZSB0byBtYXBcbiAgICAgKiB0byBtb2RpZmllciBrZXlzIHdoZW4geW91IHNwZWNpZnkgeW91ciBrZXlib2FyZCBzaG9ydGN1dHNcbiAgICAgKlxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgdmFyIF9TUEVDSUFMX0FMSUFTRVMgPSB7XG4gICAgICAgICdvcHRpb24nOiAnYWx0JyxcbiAgICAgICAgJ2NvbW1hbmQnOiAnbWV0YScsXG4gICAgICAgICdyZXR1cm4nOiAnZW50ZXInLFxuICAgICAgICAnZXNjYXBlJzogJ2VzYycsXG4gICAgICAgICdwbHVzJzogJysnLFxuICAgICAgICAnbW9kJzogL01hY3xpUG9kfGlQaG9uZXxpUGFkLy50ZXN0KG5hdmlnYXRvci5wbGF0Zm9ybSkgPyAnbWV0YScgOiAnY3RybCdcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogdmFyaWFibGUgdG8gc3RvcmUgdGhlIGZsaXBwZWQgdmVyc2lvbiBvZiBfTUFQIGZyb20gYWJvdmVcbiAgICAgKiBuZWVkZWQgdG8gY2hlY2sgaWYgd2Ugc2hvdWxkIHVzZSBrZXlwcmVzcyBvciBub3Qgd2hlbiBubyBhY3Rpb25cbiAgICAgKiBpcyBzcGVjaWZpZWRcbiAgICAgKlxuICAgICAqIEB0eXBlIHtPYmplY3R8dW5kZWZpbmVkfVxuICAgICAqL1xuICAgIHZhciBfUkVWRVJTRV9NQVA7XG5cbiAgICAvKipcbiAgICAgKiBsb29wIHRocm91Z2ggdGhlIGYga2V5cywgZjEgdG8gZjE5IGFuZCBhZGQgdGhlbSB0byB0aGUgbWFwXG4gICAgICogcHJvZ3JhbWF0aWNhbGx5XG4gICAgICovXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCAyMDsgKytpKSB7XG4gICAgICAgIF9NQVBbMTExICsgaV0gPSAnZicgKyBpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGxvb3AgdGhyb3VnaCB0byBtYXAgbnVtYmVycyBvbiB0aGUgbnVtZXJpYyBrZXlwYWRcbiAgICAgKi9cbiAgICBmb3IgKGkgPSAwOyBpIDw9IDk7ICsraSkge1xuXG4gICAgICAgIC8vIFRoaXMgbmVlZHMgdG8gdXNlIGEgc3RyaW5nIGNhdXNlIG90aGVyd2lzZSBzaW5jZSAwIGlzIGZhbHNleVxuICAgICAgICAvLyBtb3VzZXRyYXAgd2lsbCBuZXZlciBmaXJlIGZvciBudW1wYWQgMCBwcmVzc2VkIGFzIHBhcnQgb2YgYSBrZXlkb3duXG4gICAgICAgIC8vIGV2ZW50LlxuICAgICAgICAvL1xuICAgICAgICAvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9jY2FtcGJlbGwvbW91c2V0cmFwL3B1bGwvMjU4XG4gICAgICAgIF9NQVBbaSArIDk2XSA9IGkudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjcm9zcyBicm93c2VyIGFkZCBldmVudCBtZXRob2RcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RWxlbWVudHxIVE1MRG9jdW1lbnR9IG9iamVjdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgZnVuY3Rpb24gX2FkZEV2ZW50KG9iamVjdCwgdHlwZSwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKG9iamVjdC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBvYmplY3QuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjaywgZmFsc2UpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgb2JqZWN0LmF0dGFjaEV2ZW50KCdvbicgKyB0eXBlLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdGFrZXMgdGhlIGV2ZW50IGFuZCByZXR1cm5zIHRoZSBrZXkgY2hhcmFjdGVyXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9jaGFyYWN0ZXJGcm9tRXZlbnQoZSkge1xuXG4gICAgICAgIC8vIGZvciBrZXlwcmVzcyBldmVudHMgd2Ugc2hvdWxkIHJldHVybiB0aGUgY2hhcmFjdGVyIGFzIGlzXG4gICAgICAgIGlmIChlLnR5cGUgPT0gJ2tleXByZXNzJykge1xuICAgICAgICAgICAgdmFyIGNoYXJhY3RlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZSBzaGlmdCBrZXkgaXMgbm90IHByZXNzZWQgdGhlbiBpdCBpcyBzYWZlIHRvIGFzc3VtZVxuICAgICAgICAgICAgLy8gdGhhdCB3ZSB3YW50IHRoZSBjaGFyYWN0ZXIgdG8gYmUgbG93ZXJjYXNlLiAgdGhpcyBtZWFucyBpZlxuICAgICAgICAgICAgLy8geW91IGFjY2lkZW50YWxseSBoYXZlIGNhcHMgbG9jayBvbiB0aGVuIHlvdXIga2V5IGJpbmRpbmdzXG4gICAgICAgICAgICAvLyB3aWxsIGNvbnRpbnVlIHRvIHdvcmtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyB0aGUgb25seSBzaWRlIGVmZmVjdCB0aGF0IG1pZ2h0IG5vdCBiZSBkZXNpcmVkIGlzIGlmIHlvdVxuICAgICAgICAgICAgLy8gYmluZCBzb21ldGhpbmcgbGlrZSAnQScgY2F1c2UgeW91IHdhbnQgdG8gdHJpZ2dlciBhblxuICAgICAgICAgICAgLy8gZXZlbnQgd2hlbiBjYXBpdGFsIEEgaXMgcHJlc3NlZCBjYXBzIGxvY2sgd2lsbCBubyBsb25nZXJcbiAgICAgICAgICAgIC8vIHRyaWdnZXIgdGhlIGV2ZW50LiAgc2hpZnQrYSB3aWxsIHRob3VnaC5cbiAgICAgICAgICAgIGlmICghZS5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgIGNoYXJhY3RlciA9IGNoYXJhY3Rlci50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gY2hhcmFjdGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZm9yIG5vbiBrZXlwcmVzcyBldmVudHMgdGhlIHNwZWNpYWwgbWFwcyBhcmUgbmVlZGVkXG4gICAgICAgIGlmIChfTUFQW2Uud2hpY2hdKSB7XG4gICAgICAgICAgICByZXR1cm4gX01BUFtlLndoaWNoXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfS0VZQ09ERV9NQVBbZS53aGljaF0pIHtcbiAgICAgICAgICAgIHJldHVybiBfS0VZQ09ERV9NQVBbZS53aGljaF07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBpdCBpcyBub3QgaW4gdGhlIHNwZWNpYWwgbWFwXG5cbiAgICAgICAgLy8gd2l0aCBrZXlkb3duIGFuZCBrZXl1cCBldmVudHMgdGhlIGNoYXJhY3RlciBzZWVtcyB0byBhbHdheXNcbiAgICAgICAgLy8gY29tZSBpbiBhcyBhbiB1cHBlcmNhc2UgY2hhcmFjdGVyIHdoZXRoZXIgeW91IGFyZSBwcmVzc2luZyBzaGlmdFxuICAgICAgICAvLyBvciBub3QuICB3ZSBzaG91bGQgbWFrZSBzdXJlIGl0IGlzIGFsd2F5cyBsb3dlcmNhc2UgZm9yIGNvbXBhcmlzb25zXG4gICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hlY2tzIGlmIHR3byBhcnJheXMgYXJlIGVxdWFsXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBtb2RpZmllcnMxXG4gICAgICogQHBhcmFtIHtBcnJheX0gbW9kaWZpZXJzMlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9tb2RpZmllcnNNYXRjaChtb2RpZmllcnMxLCBtb2RpZmllcnMyKSB7XG4gICAgICAgIHJldHVybiBtb2RpZmllcnMxLnNvcnQoKS5qb2luKCcsJykgPT09IG1vZGlmaWVyczIuc29ydCgpLmpvaW4oJywnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB0YWtlcyBhIGtleSBldmVudCBhbmQgZmlndXJlcyBvdXQgd2hhdCB0aGUgbW9kaWZpZXJzIGFyZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfZXZlbnRNb2RpZmllcnMoZSkge1xuICAgICAgICB2YXIgbW9kaWZpZXJzID0gW107XG5cbiAgICAgICAgaWYgKGUuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgIG1vZGlmaWVycy5wdXNoKCdzaGlmdCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGUuYWx0S2V5KSB7XG4gICAgICAgICAgICBtb2RpZmllcnMucHVzaCgnYWx0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZS5jdHJsS2V5KSB7XG4gICAgICAgICAgICBtb2RpZmllcnMucHVzaCgnY3RybCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGUubWV0YUtleSkge1xuICAgICAgICAgICAgbW9kaWZpZXJzLnB1c2goJ21ldGEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtb2RpZmllcnM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcHJldmVudHMgZGVmYXVsdCBmb3IgdGhpcyBldmVudFxuICAgICAqXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfcHJldmVudERlZmF1bHQoZSkge1xuICAgICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHN0b3BzIHByb3BvZ2F0aW9uIGZvciB0aGlzIGV2ZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9zdG9wUHJvcGFnYXRpb24oZSkge1xuICAgICAgICBpZiAoZS5zdG9wUHJvcGFnYXRpb24pIHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBlLmNhbmNlbEJ1YmJsZSA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZGV0ZXJtaW5lcyBpZiB0aGUga2V5Y29kZSBzcGVjaWZpZWQgaXMgYSBtb2RpZmllciBrZXkgb3Igbm90XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gX2lzTW9kaWZpZXIoa2V5KSB7XG4gICAgICAgIHJldHVybiBrZXkgPT0gJ3NoaWZ0JyB8fCBrZXkgPT0gJ2N0cmwnIHx8IGtleSA9PSAnYWx0JyB8fCBrZXkgPT0gJ21ldGEnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJldmVyc2VzIHRoZSBtYXAgbG9va3VwIHNvIHRoYXQgd2UgY2FuIGxvb2sgZm9yIHNwZWNpZmljIGtleXNcbiAgICAgKiB0byBzZWUgd2hhdCBjYW4gYW5kIGNhbid0IHVzZSBrZXlwcmVzc1xuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9nZXRSZXZlcnNlTWFwKCkge1xuICAgICAgICBpZiAoIV9SRVZFUlNFX01BUCkge1xuICAgICAgICAgICAgX1JFVkVSU0VfTUFQID0ge307XG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gX01BUCkge1xuXG4gICAgICAgICAgICAgICAgLy8gcHVsbCBvdXQgdGhlIG51bWVyaWMga2V5cGFkIGZyb20gaGVyZSBjYXVzZSBrZXlwcmVzcyBzaG91bGRcbiAgICAgICAgICAgICAgICAvLyBiZSBhYmxlIHRvIGRldGVjdCB0aGUga2V5cyBmcm9tIHRoZSBjaGFyYWN0ZXJcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID4gOTUgJiYga2V5IDwgMTEyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChfTUFQLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgX1JFVkVSU0VfTUFQW19NQVBba2V5XV0gPSBrZXk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfUkVWRVJTRV9NQVA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcGlja3MgdGhlIGJlc3QgYWN0aW9uIGJhc2VkIG9uIHRoZSBrZXkgY29tYmluYXRpb25cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBjaGFyYWN0ZXIgZm9yIGtleVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IG1vZGlmaWVyc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gYWN0aW9uIHBhc3NlZCBpblxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9waWNrQmVzdEFjdGlvbihrZXksIG1vZGlmaWVycywgYWN0aW9uKSB7XG5cbiAgICAgICAgLy8gaWYgbm8gYWN0aW9uIHdhcyBwaWNrZWQgaW4gd2Ugc2hvdWxkIHRyeSB0byBwaWNrIHRoZSBvbmVcbiAgICAgICAgLy8gdGhhdCB3ZSB0aGluayB3b3VsZCB3b3JrIGJlc3QgZm9yIHRoaXMga2V5XG4gICAgICAgIGlmICghYWN0aW9uKSB7XG4gICAgICAgICAgICBhY3Rpb24gPSBfZ2V0UmV2ZXJzZU1hcCgpW2tleV0gPyAna2V5ZG93bicgOiAna2V5cHJlc3MnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbW9kaWZpZXIga2V5cyBkb24ndCB3b3JrIGFzIGV4cGVjdGVkIHdpdGgga2V5cHJlc3MsXG4gICAgICAgIC8vIHN3aXRjaCB0byBrZXlkb3duXG4gICAgICAgIGlmIChhY3Rpb24gPT0gJ2tleXByZXNzJyAmJiBtb2RpZmllcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBhY3Rpb24gPSAna2V5ZG93bic7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYWN0aW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGZyb20gYSBzdHJpbmcga2V5IGNvbWJpbmF0aW9uIHRvIGFuIGFycmF5XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGNvbWJpbmF0aW9uIGxpa2UgXCJjb21tYW5kK3NoaWZ0K2xcIlxuICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9rZXlzRnJvbVN0cmluZyhjb21iaW5hdGlvbikge1xuICAgICAgICBpZiAoY29tYmluYXRpb24gPT09ICcrJykge1xuICAgICAgICAgICAgcmV0dXJuIFsnKyddO1xuICAgICAgICB9XG5cbiAgICAgICAgY29tYmluYXRpb24gPSBjb21iaW5hdGlvbi5yZXBsYWNlKC9cXCt7Mn0vZywgJytwbHVzJyk7XG4gICAgICAgIHJldHVybiBjb21iaW5hdGlvbi5zcGxpdCgnKycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgaW5mbyBmb3IgYSBzcGVjaWZpYyBrZXkgY29tYmluYXRpb25cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gY29tYmluYXRpb24ga2V5IGNvbWJpbmF0aW9uIChcImNvbW1hbmQrc1wiIG9yIFwiYVwiIG9yIFwiKlwiKVxuICAgICAqIEBwYXJhbSAge3N0cmluZz19IGFjdGlvblxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgZnVuY3Rpb24gX2dldEtleUluZm8oY29tYmluYXRpb24sIGFjdGlvbikge1xuICAgICAgICB2YXIga2V5cztcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIHZhciBtb2RpZmllcnMgPSBbXTtcblxuICAgICAgICAvLyB0YWtlIHRoZSBrZXlzIGZyb20gdGhpcyBwYXR0ZXJuIGFuZCBmaWd1cmUgb3V0IHdoYXQgdGhlIGFjdHVhbFxuICAgICAgICAvLyBwYXR0ZXJuIGlzIGFsbCBhYm91dFxuICAgICAgICBrZXlzID0gX2tleXNGcm9tU3RyaW5nKGNvbWJpbmF0aW9uKTtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAga2V5ID0ga2V5c1tpXTtcblxuICAgICAgICAgICAgLy8gbm9ybWFsaXplIGtleSBuYW1lc1xuICAgICAgICAgICAgaWYgKF9TUEVDSUFMX0FMSUFTRVNba2V5XSkge1xuICAgICAgICAgICAgICAgIGtleSA9IF9TUEVDSUFMX0FMSUFTRVNba2V5XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgdGhpcyBpcyBub3QgYSBrZXlwcmVzcyBldmVudCB0aGVuIHdlIHNob3VsZFxuICAgICAgICAgICAgLy8gYmUgc21hcnQgYWJvdXQgdXNpbmcgc2hpZnQga2V5c1xuICAgICAgICAgICAgLy8gdGhpcyB3aWxsIG9ubHkgd29yayBmb3IgVVMga2V5Ym9hcmRzIGhvd2V2ZXJcbiAgICAgICAgICAgIGlmIChhY3Rpb24gJiYgYWN0aW9uICE9ICdrZXlwcmVzcycgJiYgX1NISUZUX01BUFtrZXldKSB7XG4gICAgICAgICAgICAgICAga2V5ID0gX1NISUZUX01BUFtrZXldO1xuICAgICAgICAgICAgICAgIG1vZGlmaWVycy5wdXNoKCdzaGlmdCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiB0aGlzIGtleSBpcyBhIG1vZGlmaWVyIHRoZW4gYWRkIGl0IHRvIHRoZSBsaXN0IG9mIG1vZGlmaWVyc1xuICAgICAgICAgICAgaWYgKF9pc01vZGlmaWVyKGtleSkpIHtcbiAgICAgICAgICAgICAgICBtb2RpZmllcnMucHVzaChrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGVwZW5kaW5nIG9uIHdoYXQgdGhlIGtleSBjb21iaW5hdGlvbiBpc1xuICAgICAgICAvLyB3ZSB3aWxsIHRyeSB0byBwaWNrIHRoZSBiZXN0IGV2ZW50IGZvciBpdFxuICAgICAgICBhY3Rpb24gPSBfcGlja0Jlc3RBY3Rpb24oa2V5LCBtb2RpZmllcnMsIGFjdGlvbik7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgbW9kaWZpZXJzOiBtb2RpZmllcnMsXG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvblxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9iZWxvbmdzVG8oZWxlbWVudCwgYW5jZXN0b3IpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQgPT09IG51bGwgfHwgZWxlbWVudCA9PT0gZG9jdW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbGVtZW50ID09PSBhbmNlc3Rvcikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gX2JlbG9uZ3NUbyhlbGVtZW50LnBhcmVudE5vZGUsIGFuY2VzdG9yKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBNb3VzZXRyYXAodGFyZ2V0RWxlbWVudCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGFyZ2V0RWxlbWVudCA9IHRhcmdldEVsZW1lbnQgfHwgZG9jdW1lbnQ7XG5cbiAgICAgICAgaWYgKCEoc2VsZiBpbnN0YW5jZW9mIE1vdXNldHJhcCkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTW91c2V0cmFwKHRhcmdldEVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGVsZW1lbnQgdG8gYXR0YWNoIGtleSBldmVudHMgdG9cbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge0VsZW1lbnR9XG4gICAgICAgICAqL1xuICAgICAgICBzZWxmLnRhcmdldCA9IHRhcmdldEVsZW1lbnQ7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGEgbGlzdCBvZiBhbGwgdGhlIGNhbGxiYWNrcyBzZXR1cCB2aWEgTW91c2V0cmFwLmJpbmQoKVxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgc2VsZi5fY2FsbGJhY2tzID0ge307XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRpcmVjdCBtYXAgb2Ygc3RyaW5nIGNvbWJpbmF0aW9ucyB0byBjYWxsYmFja3MgdXNlZCBmb3IgdHJpZ2dlcigpXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICBzZWxmLl9kaXJlY3RNYXAgPSB7fTtcblxuICAgICAgICAvKipcbiAgICAgICAgICoga2VlcHMgdHJhY2sgb2Ygd2hhdCBsZXZlbCBlYWNoIHNlcXVlbmNlIGlzIGF0IHNpbmNlIG11bHRpcGxlXG4gICAgICAgICAqIHNlcXVlbmNlcyBjYW4gc3RhcnQgb3V0IHdpdGggdGhlIHNhbWUgc2VxdWVuY2VcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBfc2VxdWVuY2VMZXZlbHMgPSB7fTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogdmFyaWFibGUgdG8gc3RvcmUgdGhlIHNldFRpbWVvdXQgY2FsbFxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7bnVsbHxudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgX3Jlc2V0VGltZXI7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHRlbXBvcmFyeSBzdGF0ZSB3aGVyZSB3ZSB3aWxsIGlnbm9yZSB0aGUgbmV4dCBrZXl1cFxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbnxzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgX2lnbm9yZU5leHRLZXl1cCA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiB0ZW1wb3Jhcnkgc3RhdGUgd2hlcmUgd2Ugd2lsbCBpZ25vcmUgdGhlIG5leHQga2V5cHJlc3NcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgX2lnbm9yZU5leHRLZXlwcmVzcyA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBhcmUgd2UgY3VycmVudGx5IGluc2lkZSBvZiBhIHNlcXVlbmNlP1xuICAgICAgICAgKiB0eXBlIG9mIGFjdGlvbiAoXCJrZXl1cFwiIG9yIFwia2V5ZG93blwiIG9yIFwia2V5cHJlc3NcIikgb3IgZmFsc2VcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW58c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIF9uZXh0RXhwZWN0ZWRBY3Rpb24gPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogcmVzZXRzIGFsbCBzZXF1ZW5jZSBjb3VudGVycyBleGNlcHQgZm9yIHRoZSBvbmVzIHBhc3NlZCBpblxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gZG9Ob3RSZXNldFxuICAgICAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBfcmVzZXRTZXF1ZW5jZXMoZG9Ob3RSZXNldCkge1xuICAgICAgICAgICAgZG9Ob3RSZXNldCA9IGRvTm90UmVzZXQgfHwge307XG5cbiAgICAgICAgICAgIHZhciBhY3RpdmVTZXF1ZW5jZXMgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICBrZXk7XG5cbiAgICAgICAgICAgIGZvciAoa2V5IGluIF9zZXF1ZW5jZUxldmVscykge1xuICAgICAgICAgICAgICAgIGlmIChkb05vdFJlc2V0W2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlU2VxdWVuY2VzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF9zZXF1ZW5jZUxldmVsc1trZXldID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFhY3RpdmVTZXF1ZW5jZXMpIHtcbiAgICAgICAgICAgICAgICBfbmV4dEV4cGVjdGVkQWN0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogZmluZHMgYWxsIGNhbGxiYWNrcyB0aGF0IG1hdGNoIGJhc2VkIG9uIHRoZSBrZXljb2RlLCBtb2RpZmllcnMsXG4gICAgICAgICAqIGFuZCBhY3Rpb25cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGNoYXJhY3RlclxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBtb2RpZmllcnNcbiAgICAgICAgICogQHBhcmFtIHtFdmVudHxPYmplY3R9IGVcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmc9fSBzZXF1ZW5jZU5hbWUgLSBuYW1lIG9mIHRoZSBzZXF1ZW5jZSB3ZSBhcmUgbG9va2luZyBmb3JcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmc9fSBjb21iaW5hdGlvblxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcj19IGxldmVsXG4gICAgICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRNYXRjaGVzKGNoYXJhY3RlciwgbW9kaWZpZXJzLCBlLCBzZXF1ZW5jZU5hbWUsIGNvbWJpbmF0aW9uLCBsZXZlbCkge1xuICAgICAgICAgICAgdmFyIGk7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2s7XG4gICAgICAgICAgICB2YXIgbWF0Y2hlcyA9IFtdO1xuICAgICAgICAgICAgdmFyIGFjdGlvbiA9IGUudHlwZTtcblxuICAgICAgICAgICAgLy8gaWYgdGhlcmUgYXJlIG5vIGV2ZW50cyByZWxhdGVkIHRvIHRoaXMga2V5Y29kZVxuICAgICAgICAgICAgaWYgKCFzZWxmLl9jYWxsYmFja3NbY2hhcmFjdGVyXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgYSBtb2RpZmllciBrZXkgaXMgY29taW5nIHVwIG9uIGl0cyBvd24gd2Ugc2hvdWxkIGFsbG93IGl0XG4gICAgICAgICAgICBpZiAoYWN0aW9uID09ICdrZXl1cCcgJiYgX2lzTW9kaWZpZXIoY2hhcmFjdGVyKSkge1xuICAgICAgICAgICAgICAgIG1vZGlmaWVycyA9IFtjaGFyYWN0ZXJdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBsb29wIHRocm91Z2ggYWxsIGNhbGxiYWNrcyBmb3IgdGhlIGtleSB0aGF0IHdhcyBwcmVzc2VkXG4gICAgICAgICAgICAvLyBhbmQgc2VlIGlmIGFueSBvZiB0aGVtIG1hdGNoXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc2VsZi5fY2FsbGJhY2tzW2NoYXJhY3Rlcl0ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IHNlbGYuX2NhbGxiYWNrc1tjaGFyYWN0ZXJdW2ldO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgYSBzZXF1ZW5jZSBuYW1lIGlzIG5vdCBzcGVjaWZpZWQsIGJ1dCB0aGlzIGlzIGEgc2VxdWVuY2UgYXRcbiAgICAgICAgICAgICAgICAvLyB0aGUgd3JvbmcgbGV2ZWwgdGhlbiBtb3ZlIG9udG8gdGhlIG5leHQgbWF0Y2hcbiAgICAgICAgICAgICAgICBpZiAoIXNlcXVlbmNlTmFtZSAmJiBjYWxsYmFjay5zZXEgJiYgX3NlcXVlbmNlTGV2ZWxzW2NhbGxiYWNrLnNlcV0gIT0gY2FsbGJhY2subGV2ZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIGFjdGlvbiB3ZSBhcmUgbG9va2luZyBmb3IgZG9lc24ndCBtYXRjaCB0aGUgYWN0aW9uIHdlIGdvdFxuICAgICAgICAgICAgICAgIC8vIHRoZW4gd2Ugc2hvdWxkIGtlZXAgZ29pbmdcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uICE9IGNhbGxiYWNrLmFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBpZiB0aGlzIGlzIGEga2V5cHJlc3MgZXZlbnQgYW5kIHRoZSBtZXRhIGtleSBhbmQgY29udHJvbCBrZXlcbiAgICAgICAgICAgICAgICAvLyBhcmUgbm90IHByZXNzZWQgdGhhdCBtZWFucyB0aGF0IHdlIG5lZWQgdG8gb25seSBsb29rIGF0IHRoZVxuICAgICAgICAgICAgICAgIC8vIGNoYXJhY3Rlciwgb3RoZXJ3aXNlIGNoZWNrIHRoZSBtb2RpZmllcnMgYXMgd2VsbFxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgLy8gY2hyb21lIHdpbGwgbm90IGZpcmUgYSBrZXlwcmVzcyBpZiBtZXRhIG9yIGNvbnRyb2wgaXMgZG93blxuICAgICAgICAgICAgICAgIC8vIHNhZmFyaSB3aWxsIGZpcmUgYSBrZXlwcmVzcyBpZiBtZXRhIG9yIG1ldGErc2hpZnQgaXMgZG93blxuICAgICAgICAgICAgICAgIC8vIGZpcmVmb3ggd2lsbCBmaXJlIGEga2V5cHJlc3MgaWYgbWV0YSBvciBjb250cm9sIGlzIGRvd25cbiAgICAgICAgICAgICAgICBpZiAoKGFjdGlvbiA9PSAna2V5cHJlc3MnICYmICFlLm1ldGFLZXkgJiYgIWUuY3RybEtleSkgfHwgX21vZGlmaWVyc01hdGNoKG1vZGlmaWVycywgY2FsbGJhY2subW9kaWZpZXJzKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHdoZW4geW91IGJpbmQgYSBjb21iaW5hdGlvbiBvciBzZXF1ZW5jZSBhIHNlY29uZCB0aW1lIGl0XG4gICAgICAgICAgICAgICAgICAgIC8vIHNob3VsZCBvdmVyd3JpdGUgdGhlIGZpcnN0IG9uZS4gIGlmIGEgc2VxdWVuY2VOYW1lIG9yXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbWJpbmF0aW9uIGlzIHNwZWNpZmllZCBpbiB0aGlzIGNhbGwgaXQgZG9lcyBqdXN0IHRoYXRcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gQHRvZG8gbWFrZSBkZWxldGluZyBpdHMgb3duIG1ldGhvZD9cbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlbGV0ZUNvbWJvID0gIXNlcXVlbmNlTmFtZSAmJiBjYWxsYmFjay5jb21ibyA9PSBjb21iaW5hdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlbGV0ZVNlcXVlbmNlID0gc2VxdWVuY2VOYW1lICYmIGNhbGxiYWNrLnNlcSA9PSBzZXF1ZW5jZU5hbWUgJiYgY2FsbGJhY2subGV2ZWwgPT0gbGV2ZWw7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWxldGVDb21ibyB8fCBkZWxldGVTZXF1ZW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fY2FsbGJhY2tzW2NoYXJhY3Rlcl0uc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcy5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBtYXRjaGVzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGFjdHVhbGx5IGNhbGxzIHRoZSBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICAgKlxuICAgICAgICAgKiBpZiB5b3VyIGNhbGxiYWNrIGZ1bmN0aW9uIHJldHVybnMgZmFsc2UgdGhpcyB3aWxsIHVzZSB0aGUganF1ZXJ5XG4gICAgICAgICAqIGNvbnZlbnRpb24gLSBwcmV2ZW50IGRlZmF1bHQgYW5kIHN0b3AgcHJvcG9nYXRpb24gb24gdGhlIGV2ZW50XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICAgICAgICogQHJldHVybnMgdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX2ZpcmVDYWxsYmFjayhjYWxsYmFjaywgZSwgY29tYm8sIHNlcXVlbmNlKSB7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoaXMgZXZlbnQgc2hvdWxkIG5vdCBoYXBwZW4gc3RvcCBoZXJlXG4gICAgICAgICAgICBpZiAoc2VsZi5zdG9wQ2FsbGJhY2soZSwgZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50LCBjb21ibywgc2VxdWVuY2UpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2soZSwgY29tYm8pID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIF9wcmV2ZW50RGVmYXVsdChlKTtcbiAgICAgICAgICAgICAgICBfc3RvcFByb3BhZ2F0aW9uKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGhhbmRsZXMgYSBjaGFyYWN0ZXIga2V5IGV2ZW50XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjaGFyYWN0ZXJcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gbW9kaWZpZXJzXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICAgICAgICogQHJldHVybnMgdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgc2VsZi5faGFuZGxlS2V5ID0gZnVuY3Rpb24oY2hhcmFjdGVyLCBtb2RpZmllcnMsIGUpIHtcbiAgICAgICAgICAgIHZhciBjYWxsYmFja3MgPSBfZ2V0TWF0Y2hlcyhjaGFyYWN0ZXIsIG1vZGlmaWVycywgZSk7XG4gICAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICAgIHZhciBkb05vdFJlc2V0ID0ge307XG4gICAgICAgICAgICB2YXIgbWF4TGV2ZWwgPSAwO1xuICAgICAgICAgICAgdmFyIHByb2Nlc3NlZFNlcXVlbmNlQ2FsbGJhY2sgPSBmYWxzZTtcblxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBtYXhMZXZlbCBmb3Igc2VxdWVuY2VzIHNvIHdlIGNhbiBvbmx5IGV4ZWN1dGUgdGhlIGxvbmdlc3QgY2FsbGJhY2sgc2VxdWVuY2VcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2tzW2ldLnNlcSkge1xuICAgICAgICAgICAgICAgICAgICBtYXhMZXZlbCA9IE1hdGgubWF4KG1heExldmVsLCBjYWxsYmFja3NbaV0ubGV2ZWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbG9vcCB0aHJvdWdoIG1hdGNoaW5nIGNhbGxiYWNrcyBmb3IgdGhpcyBrZXkgZXZlbnRcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICAgICAgICAgIC8vIGZpcmUgZm9yIGFsbCBzZXF1ZW5jZSBjYWxsYmFja3NcbiAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGJlY2F1c2UgaWYgZm9yIGV4YW1wbGUgeW91IGhhdmUgbXVsdGlwbGUgc2VxdWVuY2VzXG4gICAgICAgICAgICAgICAgLy8gYm91bmQgc3VjaCBhcyBcImcgaVwiIGFuZCBcImcgdFwiIHRoZXkgYm90aCBuZWVkIHRvIGZpcmUgdGhlXG4gICAgICAgICAgICAgICAgLy8gY2FsbGJhY2sgZm9yIG1hdGNoaW5nIGcgY2F1c2Ugb3RoZXJ3aXNlIHlvdSBjYW4gb25seSBldmVyXG4gICAgICAgICAgICAgICAgLy8gbWF0Y2ggdGhlIGZpcnN0IG9uZVxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFja3NbaV0uc2VxKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gb25seSBmaXJlIGNhbGxiYWNrcyBmb3IgdGhlIG1heExldmVsIHRvIHByZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgLy8gc3Vic2VxdWVuY2VzIGZyb20gYWxzbyBmaXJpbmdcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gZm9yIGV4YW1wbGUgJ2Egb3B0aW9uIGInIHNob3VsZCBub3QgY2F1c2UgJ29wdGlvbiBiJyB0byBmaXJlXG4gICAgICAgICAgICAgICAgICAgIC8vIGV2ZW4gdGhvdWdoICdvcHRpb24gYicgaXMgcGFydCBvZiB0aGUgb3RoZXIgc2VxdWVuY2VcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gYW55IHNlcXVlbmNlcyB0aGF0IGRvIG5vdCBtYXRjaCBoZXJlIHdpbGwgYmUgZGlzY2FyZGVkXG4gICAgICAgICAgICAgICAgICAgIC8vIGJlbG93IGJ5IHRoZSBfcmVzZXRTZXF1ZW5jZXMgY2FsbFxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2tzW2ldLmxldmVsICE9IG1heExldmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NlZFNlcXVlbmNlQ2FsbGJhY2sgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGtlZXAgYSBsaXN0IG9mIHdoaWNoIHNlcXVlbmNlcyB3ZXJlIG1hdGNoZXMgZm9yIGxhdGVyXG4gICAgICAgICAgICAgICAgICAgIGRvTm90UmVzZXRbY2FsbGJhY2tzW2ldLnNlcV0gPSAxO1xuICAgICAgICAgICAgICAgICAgICBfZmlyZUNhbGxiYWNrKGNhbGxiYWNrc1tpXS5jYWxsYmFjaywgZSwgY2FsbGJhY2tzW2ldLmNvbWJvLCBjYWxsYmFja3NbaV0uc2VxKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlcmUgd2VyZSBubyBzZXF1ZW5jZSBtYXRjaGVzIGJ1dCB3ZSBhcmUgc3RpbGwgaGVyZVxuICAgICAgICAgICAgICAgIC8vIHRoYXQgbWVhbnMgdGhpcyBpcyBhIHJlZ3VsYXIgbWF0Y2ggc28gd2Ugc2hvdWxkIGZpcmUgdGhhdFxuICAgICAgICAgICAgICAgIGlmICghcHJvY2Vzc2VkU2VxdWVuY2VDYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICBfZmlyZUNhbGxiYWNrKGNhbGxiYWNrc1tpXS5jYWxsYmFjaywgZSwgY2FsbGJhY2tzW2ldLmNvbWJvKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZSBrZXkgeW91IHByZXNzZWQgbWF0Y2hlcyB0aGUgdHlwZSBvZiBzZXF1ZW5jZSB3aXRob3V0XG4gICAgICAgICAgICAvLyBiZWluZyBhIG1vZGlmaWVyIChpZSBcImtleXVwXCIgb3IgXCJrZXlwcmVzc1wiKSB0aGVuIHdlIHNob3VsZFxuICAgICAgICAgICAgLy8gcmVzZXQgYWxsIHNlcXVlbmNlcyB0aGF0IHdlcmUgbm90IG1hdGNoZWQgYnkgdGhpcyBldmVudFxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIHRoaXMgaXMgc28sIGZvciBleGFtcGxlLCBpZiB5b3UgaGF2ZSB0aGUgc2VxdWVuY2UgXCJoIGEgdFwiIGFuZCB5b3VcbiAgICAgICAgICAgIC8vIHR5cGUgXCJoIGUgYSByIHRcIiBpdCBkb2VzIG5vdCBtYXRjaC4gIGluIHRoaXMgY2FzZSB0aGUgXCJlXCIgd2lsbFxuICAgICAgICAgICAgLy8gY2F1c2UgdGhlIHNlcXVlbmNlIHRvIHJlc2V0XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gbW9kaWZpZXIga2V5cyBhcmUgaWdub3JlZCBiZWNhdXNlIHlvdSBjYW4gaGF2ZSBhIHNlcXVlbmNlXG4gICAgICAgICAgICAvLyB0aGF0IGNvbnRhaW5zIG1vZGlmaWVycyBzdWNoIGFzIFwiZW50ZXIgY3RybCtzcGFjZVwiIGFuZCBpbiBtb3N0XG4gICAgICAgICAgICAvLyBjYXNlcyB0aGUgbW9kaWZpZXIga2V5IHdpbGwgYmUgcHJlc3NlZCBiZWZvcmUgdGhlIG5leHQga2V5XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gYWxzbyBpZiB5b3UgaGF2ZSBhIHNlcXVlbmNlIHN1Y2ggYXMgXCJjdHJsK2IgYVwiIHRoZW4gcHJlc3NpbmcgdGhlXG4gICAgICAgICAgICAvLyBcImJcIiBrZXkgd2lsbCB0cmlnZ2VyIGEgXCJrZXlwcmVzc1wiIGFuZCBhIFwia2V5ZG93blwiXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gdGhlIFwia2V5ZG93blwiIGlzIGV4cGVjdGVkIHdoZW4gdGhlcmUgaXMgYSBtb2RpZmllciwgYnV0IHRoZVxuICAgICAgICAgICAgLy8gXCJrZXlwcmVzc1wiIGVuZHMgdXAgbWF0Y2hpbmcgdGhlIF9uZXh0RXhwZWN0ZWRBY3Rpb24gc2luY2UgaXQgb2NjdXJzXG4gICAgICAgICAgICAvLyBhZnRlciBhbmQgdGhhdCBjYXVzZXMgdGhlIHNlcXVlbmNlIHRvIHJlc2V0XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gd2UgaWdub3JlIGtleXByZXNzZXMgaW4gYSBzZXF1ZW5jZSB0aGF0IGRpcmVjdGx5IGZvbGxvdyBhIGtleWRvd25cbiAgICAgICAgICAgIC8vIGZvciB0aGUgc2FtZSBjaGFyYWN0ZXJcbiAgICAgICAgICAgIHZhciBpZ25vcmVUaGlzS2V5cHJlc3MgPSBlLnR5cGUgPT0gJ2tleXByZXNzJyAmJiBfaWdub3JlTmV4dEtleXByZXNzO1xuICAgICAgICAgICAgaWYgKGUudHlwZSA9PSBfbmV4dEV4cGVjdGVkQWN0aW9uICYmICFfaXNNb2RpZmllcihjaGFyYWN0ZXIpICYmICFpZ25vcmVUaGlzS2V5cHJlc3MpIHtcbiAgICAgICAgICAgICAgICBfcmVzZXRTZXF1ZW5jZXMoZG9Ob3RSZXNldCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF9pZ25vcmVOZXh0S2V5cHJlc3MgPSBwcm9jZXNzZWRTZXF1ZW5jZUNhbGxiYWNrICYmIGUudHlwZSA9PSAna2V5ZG93bic7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGhhbmRsZXMgYSBrZXlkb3duIGV2ZW50XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICAgICAgICogQHJldHVybnMgdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX2hhbmRsZUtleUV2ZW50KGUpIHtcblxuICAgICAgICAgICAgLy8gbm9ybWFsaXplIGUud2hpY2ggZm9yIGtleSBldmVudHNcbiAgICAgICAgICAgIC8vIEBzZWUgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80Mjg1NjI3L2phdmFzY3JpcHQta2V5Y29kZS12cy1jaGFyY29kZS11dHRlci1jb25mdXNpb25cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZS53aGljaCAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBlLndoaWNoID0gZS5rZXlDb2RlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gX2NoYXJhY3RlckZyb21FdmVudChlKTtcblxuICAgICAgICAgICAgLy8gbm8gY2hhcmFjdGVyIGZvdW5kIHRoZW4gc3RvcFxuICAgICAgICAgICAgaWYgKCFjaGFyYWN0ZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG5lZWQgdG8gdXNlID09PSBmb3IgdGhlIGNoYXJhY3RlciBjaGVjayBiZWNhdXNlIHRoZSBjaGFyYWN0ZXIgY2FuIGJlIDBcbiAgICAgICAgICAgIGlmIChlLnR5cGUgPT0gJ2tleXVwJyAmJiBfaWdub3JlTmV4dEtleXVwID09PSBjaGFyYWN0ZXIpIHtcbiAgICAgICAgICAgICAgICBfaWdub3JlTmV4dEtleXVwID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWxmLmhhbmRsZUtleShjaGFyYWN0ZXIsIF9ldmVudE1vZGlmaWVycyhlKSwgZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogY2FsbGVkIHRvIHNldCBhIDEgc2Vjb25kIHRpbWVvdXQgb24gdGhlIHNwZWNpZmllZCBzZXF1ZW5jZVxuICAgICAgICAgKlxuICAgICAgICAgKiB0aGlzIGlzIHNvIGFmdGVyIGVhY2gga2V5IHByZXNzIGluIHRoZSBzZXF1ZW5jZSB5b3UgaGF2ZSAxIHNlY29uZFxuICAgICAgICAgKiB0byBwcmVzcyB0aGUgbmV4dCBrZXkgYmVmb3JlIHlvdSBoYXZlIHRvIHN0YXJ0IG92ZXJcbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMgdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX3Jlc2V0U2VxdWVuY2VUaW1lcigpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChfcmVzZXRUaW1lcik7XG4gICAgICAgICAgICBfcmVzZXRUaW1lciA9IHNldFRpbWVvdXQoX3Jlc2V0U2VxdWVuY2VzLCAxMDAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBiaW5kcyBhIGtleSBzZXF1ZW5jZSB0byBhbiBldmVudFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tYm8gLSBjb21ibyBzcGVjaWZpZWQgaW4gYmluZCBjYWxsXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGtleXNcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmc9fSBhY3Rpb25cbiAgICAgICAgICogQHJldHVybnMgdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX2JpbmRTZXF1ZW5jZShjb21ibywga2V5cywgY2FsbGJhY2ssIGFjdGlvbikge1xuXG4gICAgICAgICAgICAvLyBzdGFydCBvZmYgYnkgYWRkaW5nIGEgc2VxdWVuY2UgbGV2ZWwgcmVjb3JkIGZvciB0aGlzIGNvbWJpbmF0aW9uXG4gICAgICAgICAgICAvLyBhbmQgc2V0dGluZyB0aGUgbGV2ZWwgdG8gMFxuICAgICAgICAgICAgX3NlcXVlbmNlTGV2ZWxzW2NvbWJvXSA9IDA7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogY2FsbGJhY2sgdG8gaW5jcmVhc2UgdGhlIHNlcXVlbmNlIGxldmVsIGZvciB0aGlzIHNlcXVlbmNlIGFuZCByZXNldFxuICAgICAgICAgICAgICogYWxsIG90aGVyIHNlcXVlbmNlcyB0aGF0IHdlcmUgYWN0aXZlXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5leHRBY3Rpb25cbiAgICAgICAgICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gX2luY3JlYXNlU2VxdWVuY2UobmV4dEFjdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgX25leHRFeHBlY3RlZEFjdGlvbiA9IG5leHRBY3Rpb247XG4gICAgICAgICAgICAgICAgICAgICsrX3NlcXVlbmNlTGV2ZWxzW2NvbWJvXTtcbiAgICAgICAgICAgICAgICAgICAgX3Jlc2V0U2VxdWVuY2VUaW1lcigpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogd3JhcHMgdGhlIHNwZWNpZmllZCBjYWxsYmFjayBpbnNpZGUgb2YgYW5vdGhlciBmdW5jdGlvbiBpbiBvcmRlclxuICAgICAgICAgICAgICogdG8gcmVzZXQgYWxsIHNlcXVlbmNlIGNvdW50ZXJzIGFzIHNvb24gYXMgdGhpcyBzZXF1ZW5jZSBpcyBkb25lXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAgICAgICAgICogQHJldHVybnMgdm9pZFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBmdW5jdGlvbiBfY2FsbGJhY2tBbmRSZXNldChlKSB7XG4gICAgICAgICAgICAgICAgX2ZpcmVDYWxsYmFjayhjYWxsYmFjaywgZSwgY29tYm8pO1xuXG4gICAgICAgICAgICAgICAgLy8gd2Ugc2hvdWxkIGlnbm9yZSB0aGUgbmV4dCBrZXkgdXAgaWYgdGhlIGFjdGlvbiBpcyBrZXkgZG93blxuICAgICAgICAgICAgICAgIC8vIG9yIGtleXByZXNzLiAgdGhpcyBpcyBzbyBpZiB5b3UgZmluaXNoIGEgc2VxdWVuY2UgYW5kXG4gICAgICAgICAgICAgICAgLy8gcmVsZWFzZSB0aGUga2V5IHRoZSBmaW5hbCBrZXkgd2lsbCBub3QgdHJpZ2dlciBhIGtleXVwXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiAhPT0gJ2tleXVwJykge1xuICAgICAgICAgICAgICAgICAgICBfaWdub3JlTmV4dEtleXVwID0gX2NoYXJhY3RlckZyb21FdmVudChlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyB3ZWlyZCByYWNlIGNvbmRpdGlvbiBpZiBhIHNlcXVlbmNlIGVuZHMgd2l0aCB0aGUga2V5XG4gICAgICAgICAgICAgICAgLy8gYW5vdGhlciBzZXF1ZW5jZSBiZWdpbnMgd2l0aFxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoX3Jlc2V0U2VxdWVuY2VzLCAxMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGxvb3AgdGhyb3VnaCBrZXlzIG9uZSBhdCBhIHRpbWUgYW5kIGJpbmQgdGhlIGFwcHJvcHJpYXRlIGNhbGxiYWNrXG4gICAgICAgICAgICAvLyBmdW5jdGlvbi4gIGZvciBhbnkga2V5IGxlYWRpbmcgdXAgdG8gdGhlIGZpbmFsIG9uZSBpdCBzaG91bGRcbiAgICAgICAgICAgIC8vIGluY3JlYXNlIHRoZSBzZXF1ZW5jZS4gYWZ0ZXIgdGhlIGZpbmFsLCBpdCBzaG91bGQgcmVzZXQgYWxsIHNlcXVlbmNlc1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIGlmIGFuIGFjdGlvbiBpcyBzcGVjaWZpZWQgaW4gdGhlIG9yaWdpbmFsIGJpbmQgY2FsbCB0aGVuIHRoYXQgd2lsbFxuICAgICAgICAgICAgLy8gYmUgdXNlZCB0aHJvdWdob3V0LiAgb3RoZXJ3aXNlIHdlIHdpbGwgcGFzcyB0aGUgYWN0aW9uIHRoYXQgdGhlXG4gICAgICAgICAgICAvLyBuZXh0IGtleSBpbiB0aGUgc2VxdWVuY2Ugc2hvdWxkIG1hdGNoLiAgdGhpcyBhbGxvd3MgYSBzZXF1ZW5jZVxuICAgICAgICAgICAgLy8gdG8gbWl4IGFuZCBtYXRjaCBrZXlwcmVzcyBhbmQga2V5ZG93biBldmVudHMgZGVwZW5kaW5nIG9uIHdoaWNoXG4gICAgICAgICAgICAvLyBvbmVzIGFyZSBiZXR0ZXIgc3VpdGVkIHRvIHRoZSBrZXkgcHJvdmlkZWRcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIHZhciBpc0ZpbmFsID0gaSArIDEgPT09IGtleXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHZhciB3cmFwcGVkQ2FsbGJhY2sgPSBpc0ZpbmFsID8gX2NhbGxiYWNrQW5kUmVzZXQgOiBfaW5jcmVhc2VTZXF1ZW5jZShhY3Rpb24gfHwgX2dldEtleUluZm8oa2V5c1tpICsgMV0pLmFjdGlvbik7XG4gICAgICAgICAgICAgICAgX2JpbmRTaW5nbGUoa2V5c1tpXSwgd3JhcHBlZENhbGxiYWNrLCBhY3Rpb24sIGNvbWJvLCBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBiaW5kcyBhIHNpbmdsZSBrZXlib2FyZCBjb21iaW5hdGlvblxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tYmluYXRpb25cbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmc9fSBhY3Rpb25cbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmc9fSBzZXF1ZW5jZU5hbWUgLSBuYW1lIG9mIHNlcXVlbmNlIGlmIHBhcnQgb2Ygc2VxdWVuY2VcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXI9fSBsZXZlbCAtIHdoYXQgcGFydCBvZiB0aGUgc2VxdWVuY2UgdGhlIGNvbW1hbmQgaXNcbiAgICAgICAgICogQHJldHVybnMgdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX2JpbmRTaW5nbGUoY29tYmluYXRpb24sIGNhbGxiYWNrLCBhY3Rpb24sIHNlcXVlbmNlTmFtZSwgbGV2ZWwpIHtcblxuICAgICAgICAgICAgLy8gc3RvcmUgYSBkaXJlY3QgbWFwcGVkIHJlZmVyZW5jZSBmb3IgdXNlIHdpdGggTW91c2V0cmFwLnRyaWdnZXJcbiAgICAgICAgICAgIHNlbGYuX2RpcmVjdE1hcFtjb21iaW5hdGlvbiArICc6JyArIGFjdGlvbl0gPSBjYWxsYmFjaztcblxuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIG11bHRpcGxlIHNwYWNlcyBpbiBhIHJvdyBiZWNvbWUgYSBzaW5nbGUgc3BhY2VcbiAgICAgICAgICAgIGNvbWJpbmF0aW9uID0gY29tYmluYXRpb24ucmVwbGFjZSgvXFxzKy9nLCAnICcpO1xuXG4gICAgICAgICAgICB2YXIgc2VxdWVuY2UgPSBjb21iaW5hdGlvbi5zcGxpdCgnICcpO1xuICAgICAgICAgICAgdmFyIGluZm87XG5cbiAgICAgICAgICAgIC8vIGlmIHRoaXMgcGF0dGVybiBpcyBhIHNlcXVlbmNlIG9mIGtleXMgdGhlbiBydW4gdGhyb3VnaCB0aGlzIG1ldGhvZFxuICAgICAgICAgICAgLy8gdG8gcmVwcm9jZXNzIGVhY2ggcGF0dGVybiBvbmUga2V5IGF0IGEgdGltZVxuICAgICAgICAgICAgaWYgKHNlcXVlbmNlLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBfYmluZFNlcXVlbmNlKGNvbWJpbmF0aW9uLCBzZXF1ZW5jZSwgY2FsbGJhY2ssIGFjdGlvbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpbmZvID0gX2dldEtleUluZm8oY29tYmluYXRpb24sIGFjdGlvbik7XG5cbiAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0byBpbml0aWFsaXplIGFycmF5IGlmIHRoaXMgaXMgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgICAgIC8vIGEgY2FsbGJhY2sgaXMgYWRkZWQgZm9yIHRoaXMga2V5XG4gICAgICAgICAgICBzZWxmLl9jYWxsYmFja3NbaW5mby5rZXldID0gc2VsZi5fY2FsbGJhY2tzW2luZm8ua2V5XSB8fCBbXTtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIGFuIGV4aXN0aW5nIG1hdGNoIGlmIHRoZXJlIGlzIG9uZVxuICAgICAgICAgICAgX2dldE1hdGNoZXMoaW5mby5rZXksIGluZm8ubW9kaWZpZXJzLCB7dHlwZTogaW5mby5hY3Rpb259LCBzZXF1ZW5jZU5hbWUsIGNvbWJpbmF0aW9uLCBsZXZlbCk7XG5cbiAgICAgICAgICAgIC8vIGFkZCB0aGlzIGNhbGwgYmFjayB0byB0aGUgYXJyYXlcbiAgICAgICAgICAgIC8vIGlmIGl0IGlzIGEgc2VxdWVuY2UgcHV0IGl0IGF0IHRoZSBiZWdpbm5pbmdcbiAgICAgICAgICAgIC8vIGlmIG5vdCBwdXQgaXQgYXQgdGhlIGVuZFxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIHRoaXMgaXMgaW1wb3J0YW50IGJlY2F1c2UgdGhlIHdheSB0aGVzZSBhcmUgcHJvY2Vzc2VkIGV4cGVjdHNcbiAgICAgICAgICAgIC8vIHRoZSBzZXF1ZW5jZSBvbmVzIHRvIGNvbWUgZmlyc3RcbiAgICAgICAgICAgIHNlbGYuX2NhbGxiYWNrc1tpbmZvLmtleV1bc2VxdWVuY2VOYW1lID8gJ3Vuc2hpZnQnIDogJ3B1c2gnXSh7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgICAgICAgICAgIG1vZGlmaWVyczogaW5mby5tb2RpZmllcnMsXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBpbmZvLmFjdGlvbixcbiAgICAgICAgICAgICAgICBzZXE6IHNlcXVlbmNlTmFtZSxcbiAgICAgICAgICAgICAgICBsZXZlbDogbGV2ZWwsXG4gICAgICAgICAgICAgICAgY29tYm86IGNvbWJpbmF0aW9uXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBiaW5kcyBtdWx0aXBsZSBjb21iaW5hdGlvbnMgdG8gdGhlIHNhbWUgY2FsbGJhY2tcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gY29tYmluYXRpb25zXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfHVuZGVmaW5lZH0gYWN0aW9uXG4gICAgICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgICAgICovXG4gICAgICAgIHNlbGYuX2JpbmRNdWx0aXBsZSA9IGZ1bmN0aW9uKGNvbWJpbmF0aW9ucywgY2FsbGJhY2ssIGFjdGlvbikge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb21iaW5hdGlvbnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBfYmluZFNpbmdsZShjb21iaW5hdGlvbnNbaV0sIGNhbGxiYWNrLCBhY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHN0YXJ0IVxuICAgICAgICBfYWRkRXZlbnQodGFyZ2V0RWxlbWVudCwgJ2tleXByZXNzJywgX2hhbmRsZUtleUV2ZW50KTtcbiAgICAgICAgX2FkZEV2ZW50KHRhcmdldEVsZW1lbnQsICdrZXlkb3duJywgX2hhbmRsZUtleUV2ZW50KTtcbiAgICAgICAgX2FkZEV2ZW50KHRhcmdldEVsZW1lbnQsICdrZXl1cCcsIF9oYW5kbGVLZXlFdmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYmluZHMgYW4gZXZlbnQgdG8gbW91c2V0cmFwXG4gICAgICpcbiAgICAgKiBjYW4gYmUgYSBzaW5nbGUga2V5LCBhIGNvbWJpbmF0aW9uIG9mIGtleXMgc2VwYXJhdGVkIHdpdGggKyxcbiAgICAgKiBhbiBhcnJheSBvZiBrZXlzLCBvciBhIHNlcXVlbmNlIG9mIGtleXMgc2VwYXJhdGVkIGJ5IHNwYWNlc1xuICAgICAqXG4gICAgICogYmUgc3VyZSB0byBsaXN0IHRoZSBtb2RpZmllciBrZXlzIGZpcnN0IHRvIG1ha2Ugc3VyZSB0aGF0IHRoZVxuICAgICAqIGNvcnJlY3Qga2V5IGVuZHMgdXAgZ2V0dGluZyBib3VuZCAodGhlIGxhc3Qga2V5IGluIHRoZSBwYXR0ZXJuKVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd8QXJyYXl9IGtleXNcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gYWN0aW9uIC0gJ2tleXByZXNzJywgJ2tleWRvd24nLCBvciAna2V5dXAnXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIE1vdXNldHJhcC5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uKGtleXMsIGNhbGxiYWNrLCBhY3Rpb24pIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBrZXlzID0ga2V5cyBpbnN0YW5jZW9mIEFycmF5ID8ga2V5cyA6IFtrZXlzXTtcbiAgICAgICAgc2VsZi5fYmluZE11bHRpcGxlLmNhbGwoc2VsZiwga2V5cywgY2FsbGJhY2ssIGFjdGlvbik7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiB1bmJpbmRzIGFuIGV2ZW50IHRvIG1vdXNldHJhcFxuICAgICAqXG4gICAgICogdGhlIHVuYmluZGluZyBzZXRzIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBvZiB0aGUgc3BlY2lmaWVkIGtleSBjb21ib1xuICAgICAqIHRvIGFuIGVtcHR5IGZ1bmN0aW9uIGFuZCBkZWxldGVzIHRoZSBjb3JyZXNwb25kaW5nIGtleSBpbiB0aGVcbiAgICAgKiBfZGlyZWN0TWFwIGRpY3QuXG4gICAgICpcbiAgICAgKiBUT0RPOiBhY3R1YWxseSByZW1vdmUgdGhpcyBmcm9tIHRoZSBfY2FsbGJhY2tzIGRpY3Rpb25hcnkgaW5zdGVhZFxuICAgICAqIG9mIGJpbmRpbmcgYW4gZW1wdHkgZnVuY3Rpb25cbiAgICAgKlxuICAgICAqIHRoZSBrZXljb21ibythY3Rpb24gaGFzIHRvIGJlIGV4YWN0bHkgdGhlIHNhbWUgYXNcbiAgICAgKiBpdCB3YXMgZGVmaW5lZCBpbiB0aGUgYmluZCBtZXRob2RcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfEFycmF5fSBrZXlzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGFjdGlvblxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBNb3VzZXRyYXAucHJvdG90eXBlLnVuYmluZCA9IGZ1bmN0aW9uKGtleXMsIGFjdGlvbikge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiBzZWxmLmJpbmQuY2FsbChzZWxmLCBrZXlzLCBmdW5jdGlvbigpIHt9LCBhY3Rpb24pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiB0cmlnZ2VycyBhbiBldmVudCB0aGF0IGhhcyBhbHJlYWR5IGJlZW4gYm91bmRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlzXG4gICAgICogQHBhcmFtIHtzdHJpbmc9fSBhY3Rpb25cbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgTW91c2V0cmFwLnByb3RvdHlwZS50cmlnZ2VyID0gZnVuY3Rpb24oa2V5cywgYWN0aW9uKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKHNlbGYuX2RpcmVjdE1hcFtrZXlzICsgJzonICsgYWN0aW9uXSkge1xuICAgICAgICAgICAgc2VsZi5fZGlyZWN0TWFwW2tleXMgKyAnOicgKyBhY3Rpb25dKHt9LCBrZXlzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogcmVzZXRzIHRoZSBsaWJyYXJ5IGJhY2sgdG8gaXRzIGluaXRpYWwgc3RhdGUuICB0aGlzIGlzIHVzZWZ1bFxuICAgICAqIGlmIHlvdSB3YW50IHRvIGNsZWFyIG91dCB0aGUgY3VycmVudCBrZXlib2FyZCBzaG9ydGN1dHMgYW5kIGJpbmRcbiAgICAgKiBuZXcgb25lcyAtIGZvciBleGFtcGxlIGlmIHlvdSBzd2l0Y2ggdG8gYW5vdGhlciBwYWdlXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgTW91c2V0cmFwLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYuX2NhbGxiYWNrcyA9IHt9O1xuICAgICAgICBzZWxmLl9kaXJlY3RNYXAgPSB7fTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIHNob3VsZCB3ZSBzdG9wIHRoaXMgZXZlbnQgYmVmb3JlIGZpcmluZyBvZmYgY2FsbGJhY2tzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBNb3VzZXRyYXAucHJvdG90eXBlLnN0b3BDYWxsYmFjayA9IGZ1bmN0aW9uKGUsIGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIC8vIGlmIHRoZSBlbGVtZW50IGhhcyB0aGUgY2xhc3MgXCJtb3VzZXRyYXBcIiB0aGVuIG5vIG5lZWQgdG8gc3RvcFxuICAgICAgICBpZiAoKCcgJyArIGVsZW1lbnQuY2xhc3NOYW1lICsgJyAnKS5pbmRleE9mKCcgbW91c2V0cmFwICcpID4gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfYmVsb25nc1RvKGVsZW1lbnQsIHNlbGYudGFyZ2V0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc3RvcCBmb3IgaW5wdXQsIHNlbGVjdCwgYW5kIHRleHRhcmVhXG4gICAgICAgIHJldHVybiBlbGVtZW50LnRhZ05hbWUgPT0gJ0lOUFVUJyB8fCBlbGVtZW50LnRhZ05hbWUgPT0gJ1NFTEVDVCcgfHwgZWxlbWVudC50YWdOYW1lID09ICdURVhUQVJFQScgfHwgZWxlbWVudC5pc0NvbnRlbnRFZGl0YWJsZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogZXhwb3NlcyBfaGFuZGxlS2V5IHB1YmxpY2x5IHNvIGl0IGNhbiBiZSBvdmVyd3JpdHRlbiBieSBleHRlbnNpb25zXG4gICAgICovXG4gICAgTW91c2V0cmFwLnByb3RvdHlwZS5oYW5kbGVLZXkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICByZXR1cm4gc2VsZi5faGFuZGxlS2V5LmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGFsbG93IGN1c3RvbSBrZXkgbWFwcGluZ3NcbiAgICAgKi9cbiAgICBNb3VzZXRyYXAuYWRkS2V5Y29kZXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAgICAgICAgaWYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgX01BUFtrZXldID0gb2JqZWN0W2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX1JFVkVSU0VfTUFQID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogSW5pdCB0aGUgZ2xvYmFsIG1vdXNldHJhcCBmdW5jdGlvbnNcbiAgICAgKlxuICAgICAqIFRoaXMgbWV0aG9kIGlzIG5lZWRlZCB0byBhbGxvdyB0aGUgZ2xvYmFsIG1vdXNldHJhcCBmdW5jdGlvbnMgdG8gd29ya1xuICAgICAqIG5vdyB0aGF0IG1vdXNldHJhcCBpcyBhIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICAgICAqL1xuICAgIE1vdXNldHJhcC5pbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkb2N1bWVudE1vdXNldHJhcCA9IE1vdXNldHJhcChkb2N1bWVudCk7XG4gICAgICAgIGZvciAodmFyIG1ldGhvZCBpbiBkb2N1bWVudE1vdXNldHJhcCkge1xuICAgICAgICAgICAgaWYgKG1ldGhvZC5jaGFyQXQoMCkgIT09ICdfJykge1xuICAgICAgICAgICAgICAgIE1vdXNldHJhcFttZXRob2RdID0gKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnRNb3VzZXRyYXBbbWV0aG9kXS5hcHBseShkb2N1bWVudE1vdXNldHJhcCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IChtZXRob2QpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBNb3VzZXRyYXAuaW5pdCgpO1xuXG4gICAgLy8gZXhwb3NlIG1vdXNldHJhcCB0byB0aGUgZ2xvYmFsIG9iamVjdFxuICAgIHdpbmRvdy5Nb3VzZXRyYXAgPSBNb3VzZXRyYXA7XG5cbiAgICAvLyBleHBvc2UgYXMgYSBjb21tb24ganMgbW9kdWxlXG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gTW91c2V0cmFwO1xuICAgIH1cblxuICAgIC8vIGV4cG9zZSBtb3VzZXRyYXAgYXMgYW4gQU1EIG1vZHVsZVxuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIE1vdXNldHJhcDtcbiAgICAgICAgfSk7XG4gICAgfVxufSkgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogbnVsbCwgdHlwZW9mICB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gZG9jdW1lbnQgOiBudWxsKTtcbiIsImltcG9ydCBjcmVhdGUgZnJvbSBcIi4vdXRpbHMvY3JlYXRlXCI7XG5pbXBvcnQgZWxlbWVudHMgZnJvbSBcIi4vdXRpbHMvZWxlbWVudHNcIjtcblxud2luZG93LmVsZW1lbnRzID0gZWxlbWVudHM7XG5cbmNyZWF0ZS5hbGwoKTsiLCJpbXBvcnQgRE9NU3RyaW5nIGZyb20gXCIuLy4uL3R5cGUvRE9NU3RyaW5nLmpzXCI7XG5cbi8qKlxuKiBBZGRzIGZ1bmN0aW9uYWxpdHkgdG8gYGFyaWEtY2hlY2tlZGAgYXR0cmlidXRlLlxuKlxuKiBDaGFuZ2VzIHZhbHVlIHdoZW4gY2xpY2tlZCBvciB3aGlsZSBmb2N1c2VkIHByZXNzaW5nIGBTcGFjZWAuXG4qXG4qIHtAbGluayBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWNoZWNrZWR9XG4qIEBlbWl0cyBjbGljayB3aGVuIGNsaWNrZWQgb3Igd2hpbGUgZm9jdXNlZCBwcmVzc2luZyBgU3BhY2VgLlxuKiBAZW1pdHMgY2hhbmdlIHdoZW4gY2xpY2tlZCBvciB3aGlsZSBmb2N1c2VkIHByZXNzaW5nIGBTcGFjZWAuXG4qL1xubGV0IEFyaWFDaGVja2VkID0gKHN1cGVyY2xhc3MpID0+IGNsYXNzIGV4dGVuZHMgc3VwZXJjbGFzcyB7XG5cblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdHN1cGVyKC4uLmFyZ3MpO1xuXG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm9uQ2hlY2tlZC5iaW5kKHRoaXMpLCB7a2V5OiBcInNwYWNlXCJ9KTtcblx0XHR0aGlzLmFkZExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vbkNoZWNrZWQuYmluZCh0aGlzKSk7XG5cdH1cblxuXHRvbkNoZWNrZWQoZXYpIHtcblx0XHRpZihldikgZXYucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGlmKHRoaXMuZGlzYWJsZWQgIT09IHRydWUpIHtcblx0XHRcdHRoaXMuY2hlY2tlZCA9IERPTVN0cmluZy50b2dnbGUodGhpcy5jaGVja2VkKTtcblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgSW5wdXRFdmVudChcImlucHV0XCIpKTtcblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJjaGFuZ2VcIikpO1xuXHRcdH1cblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQXJpYUNoZWNrZWQ7IiwiaW1wb3J0IGJvb2xlYW4gZnJvbSBcIi4vLi4vdHlwZS9ib29sZWFuXCI7XHJcblxyXG4vKipcclxuKiBBZGRzIGZ1bmN0aW9uYWxpdHkgdG8gYGFyaWEtZXhwYW5kZWRgIGF0dHJpYnV0ZVxyXG4qIEB0b2RvIGFkZCBhIHNldHRpbmcgdG8gZGVmaW5lIGhvdyB0aGUgdmlzaWJpbGl0eSBzaG91bGQgYmUgdG9nZ2xlZFxyXG4qL1xyXG5sZXQgQXJpYUV4cGFuZGVkID0gKHN1cGVyY2xhc3MpID0+IGNsYXNzIGV4dGVuZHMgc3VwZXJjbGFzcyB7XHJcblx0LyoqXHJcblx0KiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxlbWVudCBFbGVtZW50IHdpdGggYW4gYGFyaWEtZXhwYW5kZWRgIGF0dHJpYnV0ZVxyXG5cdCovXHJcblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xyXG5cdFx0c3VwZXIoLi4uYXJncyk7XHJcblx0XHRpZiAodGhpcy5leHBhbmRlZCAhPT0gdW5kZWZpbmVkKSB7IC8vIHRvZG86IGFkZCB3aGVuIGZpcnN0IHRpbWUgYXJpYS1leHBhbmRlZCBpcyBib29sZWFuXHJcblx0XHRcdHRoaXMuYWRkTGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uRXhwYW5kZWQuYmluZCh0aGlzKSk7XHJcblx0XHRcdC8vIHRoaXMuYWRkTGlzdGVuZXIoXCJrZXlcIiwgdGhpcy5vbkV4cGFuZGVkLmJpbmQodGhpcyksIHsga2V5OiBbXCJlbnRlclwiLCBcInNwYWNlXCJdIH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b25FeHBhbmRlZChldikge1xyXG5cdFx0aWYgKHR5cGVvZiBzdXBlci5vbkV4cGFuZGVkID09IFwiZnVuY3Rpb25cIikgc3VwZXIub25FeHBhbmRlZChldik7XHJcblx0XHRpZihldiAmJiB0eXBlb2YgZXYucHJldmVudERlZmF1bHQgPT09IFwiZnVuY3Rpb25cIikgZXYucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRpZih0aGlzLmRpc2FibGVkICE9PSB0cnVlKSB7XHJcblx0XHRcdHRoaXMuZXhwYW5kZWQgPSBib29sZWFuLnRvZ2dsZSh0aGlzLmV4cGFuZGVkKTtcclxuXHJcblx0XHRcdGlmKHRoaXMuZXhwYW5kZWQpIHtcclxuXHRcdFx0XHR0aGlzLmNvbnRyb2xzLmZvckVhY2goY29udHJvbCA9PiB7XHJcblx0XHRcdFx0XHRjb250cm9sLmVsZW1lbnQuaGlkZGVuID0gZmFsc2U7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5jb250cm9scy5mb3JFYWNoKGNvbnRyb2wgPT4ge1xyXG5cdFx0XHRcdFx0Y29udHJvbC5lbGVtZW50LmhpZGRlbiA9IHRydWU7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcmlhRXhwYW5kZWQ7IiwiaW1wb3J0IERPTVN0cmluZyBmcm9tIFwiLi8uLi90eXBlL0RPTVN0cmluZ1wiO1xyXG5cclxuLyoqXHJcbiogQWRkcyBmdW5jdGlvbmFsaXR5IHRvIGBhcmlhLXByZXNzZWRgIGF0dHJpYnV0ZS5cclxuKlxyXG4qIENoYW5nZXMgdmFsdWUgd2hlbiBjbGlja2VkIG9yIHdoaWxlIGZvY3VzZWQgcHJlc3NpbmcgYFNwYWNlYCBvciBgRW50ZXJgLlxyXG4qXHJcbioge0BsaW5rIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtcHJlc3NlZH1cclxuKiBAZW1pdHMgY2xpY2sgd2hlbiBjbGlja2VkIG9yIHdoaWxlIGZvY3VzZWQgcHJlc3NpbmcgYFNwYWNlYCBvciBgRW50ZXJgLlxyXG4qL1xyXG5sZXQgQXJpYVByZXNzZWQgPSAoc3VwZXJjbGFzcykgPT4gY2xhc3MgZXh0ZW5kcyBzdXBlcmNsYXNzIHtcclxuXHQvKipcclxuXHQqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbGVtZW50IEVsZW1lbnQgd2l0aCBhbiBgYXJpYS1wcmVzc2VkYCBhdHRyaWJ1dGVcclxuXHQqL1xyXG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcclxuXHRcdHN1cGVyKC4uLmFyZ3MpO1xyXG5cclxuXHRcdGlmKHRoaXMucHJlc3NlZCAhPT0gdW5kZWZpbmVkKSB7IC8vIHRvZG86IGFkZCB3aGVuIGZpcnN0IHRpbWUgYXJpYS1wcmVzc2VkIGlzIGJvb2xlYW5cclxuXHRcdFx0dGhpcy5hZGRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25QcmVzc2VkLmJpbmQodGhpcykpO1xyXG5cdFx0XHR0aGlzLmFkZExpc3RlbmVyKFwia2V5XCIsIHRoaXMub25QcmVzc2VkLmJpbmQodGhpcyksIHsga2V5OiBbXCJlbnRlclwiLCBcInNwYWNlXCJdfSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRvblByZXNzZWQoZXYpIHtcclxuXHRcdGlmICh0eXBlb2Ygc3VwZXIub25QcmVzc2VkID09IFwiZnVuY3Rpb25cIikgc3VwZXIub25QcmVzc2VkKGV2KTtcclxuXHJcblx0XHRpZih0aGlzLmRpc2FibGVkICE9PSB0cnVlKSB7XHJcblx0XHRcdHRoaXMucHJlc3NlZCA9IERPTVN0cmluZy50b2dnbGUodGhpcy5wcmVzc2VkKTtcclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcmlhUHJlc3NlZDsiLCJpbXBvcnQgYm9vbGVhbiBmcm9tIFwiLi8uLi90eXBlL2Jvb2xlYW5cIjtcclxuXHJcbi8qKlxyXG4gKiBnZXRzIGFuZCBzZXRzIHRoZSBgYXJpYS1zZWxlY3RlZGAgYXR0cmlidXRlLlxyXG4gKlxyXG4gKiBJbmRpY2F0ZXMgaWYgYSBlbGVtZW50IGlzIHNlbGVjdGFibGVcclxuICpcclxuICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXNlbGVjdGVkXHJcbiAqL1xyXG5sZXQgQXJpYVNlbGVjdGVkID0gKHN1cGVyY2xhc3MpID0+IGNsYXNzIGV4dGVuZHMgc3VwZXJjbGFzcyB7XHJcblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xyXG5cdFx0c3VwZXIoLi4uYXJncyk7XHJcblxyXG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25TZWxlY3RlZC5iaW5kKHRoaXMpKTtcclxuXHRcdHRoaXMuYWRkTGlzdGVuZXIoXCJrZXlcIiwgdGhpcy5vblNlbGVjdGVkLmJpbmQodGhpcyksIHtrZXk6IFtcInNwYWNlXCIsIFwiZW50ZXJcIl19KTtcclxuXHR9XHJcblxyXG5cdG9uU2VsZWN0ZWQoZXYpIHtcclxuXHRcdGlmKHR5cGVvZiBzdXBlci5vblNlbGVjdGVkID09IFwiZnVuY3Rpb25cIikgc3VwZXIub25TZWxlY3RlZChldik7XHJcblx0XHR0aGlzLnNlbGVjdGVkID0gYm9vbGVhbi50b2dnbGUodGhpcy5zZWxlY3RlZCk7XHJcblx0fVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXJpYVNlbGVjdGVkOyIsIi8qKlxyXG4gKiBcclxuICovXHJcbmNvbnN0IHJvbGVzID0ge1xyXG5cdGFsZXJ0OiB7XHJcblx0XHRzdXBlcjogW1wic2VjdGlvblwiXSxcclxuXHRcdHN1YjogW1wiYWxlcnRkaWFsb2dcIl0sXHJcblx0XHRkZWZhdWx0czoge1xyXG5cdFx0XHRsaXZlOiBcImFzc2VydGl2ZVwiLFxyXG5cdFx0XHRhdG9taWM6IHRydWVcclxuXHRcdH1cclxuXHR9LFxyXG5cdGFsZXJ0ZGlhbG9nOiB7IHN1cGVyOiBbXCJhbGVydFwiLCBcImRpYWxvZ1wiXSB9LFxyXG5cdGFwcGxpY2F0aW9uOiB7IHN1cGVyOiBbXCJzdHJ1Y3R1cmVcIl0gfSxcclxuXHRhcnRpY2xlOiB7XHJcblx0XHRzdXBlcjogW1wiZG9jdW1lbnRcIl0sXHJcblx0XHRpbXBsaWNpdDogW1wiYXJ0aWNsZTpub3QoW3JvbGUpXCJdXHJcblx0fSxcclxuXHQvKiogQHRvZG8gbW9yZSBzdHJpY3QgYmFubmVyIHNlbGVjdG9yICAqL1xyXG5cdGJhbm5lcjoge1xyXG5cdFx0c3VwZXI6IFtcImxhbmRtYXJrXCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcImhlYWRlcjpub3QoW3JvbGVdKVwiXVxyXG5cdH0sXHJcblx0YnV0dG9uOiB7XHJcblx0XHRzdXBlcjogW1wiY29tbWFuZFwiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJidXR0b246bm90KFtyb2xlXSlcIiwgXCJpbnB1dFt0eXBlPSdidXR0b24nXTpub3QoW3JvbGVdKVwiLFxyXG5cdFx0XHRcImlucHV0W3R5cGU9J3Jlc2V0J106bm90KFtyb2xlXSlcIiwgXCJpbnB1dFt0eXBlPSdpbWFnZSddOm5vdChbcm9sZV0pXCIsXHJcblx0XHRcdFwiaW5wdXRbdHlwZT0nc3VibWl0J106bm90KFtyb2xlXSlcIiwgXCJzdW1tYXJ5Om5vdChbcm9sZV0pXCJdXHJcblx0fSxcclxuXHRjZWxsOiB7XHJcblx0XHRzdXBlcjogW1wic2VjdGlvblwiXSxcclxuXHRcdHN1YjogW1wiY29sdW1uaGVhZGVyXCIsIFwicm93aGVhZGVyXCIsIFwiZ3JpZGNlbGxcIl0sXHJcblx0XHRjb250ZXh0OiBbXCJyb3dcIl0sXHJcblx0XHRpbXBsaWNpdDogW1widGFibGUgdGQ6bm90KFtyb2xlXSlcIl1cclxuXHR9LFxyXG5cdGNoZWNrYm94OiB7XHJcblx0XHRzdXBlcjogW1wiaW5wdXRcIl0sXHJcblx0XHRzdWI6IFtcIm1lbnVpdGVtY2hlY2tib3hcIiwgXCJzd2l0Y2hcIl0sXHJcblx0XHRpbXBsaWNpdDogW1wiaW5wdXRbdHlwZT0nY2hlY2tib3gnXTpub3QoW3JvbGVdKVwiXSxcclxuXHRcdGRlZmF1bHRzOiB7XHJcblx0XHRcdGNoZWNrZWQ6IHRydWVcclxuXHRcdH1cclxuXHR9LFxyXG5cdGNvbHVtbmhlYWRlcjoge1xyXG5cdFx0c3VwZXI6IFtcImNlbGxcIiwgXCJncmlkY2VsbFwiLCBcInNlY3Rpb25oZWFkXCJdLFxyXG5cdFx0Y29udGV4dDogW1wicm93XCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcInRoZWFkIHRoOm5vdChbcm9sZV0pXCJdXHJcblx0fSxcclxuXHQvKiogQHRvZG8gc2l6ZSBhdHRyaWJ1dGUgZG9lc24ndCBjaGVjayBmYXVsdHkgdmFsdWVzICovXHJcblx0Y29tYm9ib3g6IHtcclxuXHRcdHN1cGVyOiBbXCJzZWxlY3RcIl0sXHJcblx0XHRvd25zOiB7XHJcblx0XHRcdGFsbDogW1widGV4dGJveFwiXSxcclxuXHRcdFx0YW55OiBbXCJsaXN0Ym94XCIsIFwidHJlZVwiLCBcImdyaWRcIiwgXCJkaWFsb2dcIl1cclxuXHRcdH0sXHJcblx0XHRpbXBsaWNpdDogW1wiaW5wdXRbdHlwZT0nZW1haWwnXVtsaXN0XTpub3QoW3JvbGVdKVwiLFxyXG5cdFx0XHRcImlucHV0W3R5cGU9J3RleHQnXVtsaXN0XTpub3QoW3JvbGVdKVwiLCBcImlucHV0W3R5cGU9J3NlYXJjaCddW2xpc3RdOm5vdChbcm9sZV0pXCIsXHJcblx0XHRcdFwiaW5wdXRbdHlwZT0ndGVsJ11bbGlzdF06bm90KFtyb2xlXSlcIiwgXCJpbnB1dFt0eXBlPSd1cmwnXVtsaXN0XTpub3QoW3JvbGVdKVwiLFxyXG5cdFx0XHRcInNlbGVjdDpub3QoW211bHRpcGxlXSk6bm90KFtzaXplXSk6bm90KFtyb2xlXSlcIiwgXCJzZWxlY3Q6bm90KFttdWx0aXBsZV0pW3NpemU9JzAnXTpub3QoW3JvbGVdKVwiLFxyXG5cdFx0XHRcInNlbGVjdDpub3QoW211bHRpcGxlXSlbc2l6ZT0nMSddOm5vdChbcm9sZV0pXCJdLFxyXG5cdFx0ZGVmYXVsdHM6IHtcclxuXHRcdFx0ZXhwYW5kZWQ6IGZhbHNlLFxyXG5cdFx0XHRoYXNQb3BVcDogXCJsaXN0Ym94XCJcclxuXHRcdH1cclxuXHR9LFxyXG5cdGNvbW1hbmQ6IHtcclxuXHRcdHN1cGVyOiBbXCJ3aWRnZXRcIl0sXHJcblx0XHRzdWI6IFtcIm1lbnVpdGVtXCIsIFwiYnV0dG9uXCIsIFwibGlua1wiXVxyXG5cdH0sXHJcblx0Y29tcGxlbWVudGFyeToge1xyXG5cdFx0c3VwZXI6IFtcImxhbmRtYXJrXCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcImFzaWRlOm5vdChbcm9sZV0pXCJdXHJcblx0fSxcclxuXHRjb21wb3NpdGU6IHtcclxuXHRcdHN1cGVyOiBbXCJ3aWRnZXRcIl0sXHJcblx0XHRzdWI6IFtcImdyaWRcIiwgXCJzZWxlY3RcIiwgXCJzcGluYnV0dG9uXCIsIFwidGFibGlzdFwiXVxyXG5cdH0sXHJcblx0LyoqIEB0b2RvIG1vcmUgc3RyaWN0IGZvb3RlciBzZWxlY3RvciAgKi9cclxuXHRjb250ZW50aW5mbzoge1xyXG5cdFx0c3VwZXI6IFtcImxhbmRtYXJrXCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcImZvb3Rlcjpub3QoW3JvbGVdKVwiXVxyXG5cdH0sXHJcblx0ZGVmaW5pdGlvbjoge1xyXG5cdFx0c3VwZXI6IFtcInNlY3Rpb25cIl0sXHJcblx0XHRpbXBsaWNpdDogW1wiZGQ6bm90KFtyb2xlXSlcIl1cclxuXHR9LFxyXG5cdGRpYWxvZzoge1xyXG5cdFx0c3VwZXI6IFtcIndpbmRvd1wiXSxcclxuXHRcdHN1YjogW1wiYWxlcnRkaWFsb2dcIl0sXHJcblx0XHRpbXBsaWNpdDogW1wiZGlhbG9nOm5vdChbcm9sZV0pXCJdXHJcblx0fSxcclxuXHRkaXJlY3Rvcnk6IHsgc3VwZXI6IFtcImxpc3RcIl0gfSxcclxuXHRkb2N1bWVudDoge1xyXG5cdFx0c3VwZXI6IFtcInN0cnVjdHVyZVwiXSxcclxuXHRcdHN1YjogW1wiYXJ0aWNsZVwiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJhc2lkZTpub3QoW3JvbGVdKVwiXVxyXG5cdH0sXHJcblx0ZmVlZDoge1xyXG5cdFx0c3VwZXI6IFtcImxpc3RcIl0sXHJcblx0XHRvd25zOiB7IGFueTogW1wiYXJ0aWNsZVwiXSB9XHJcblx0fSxcclxuXHRmaWd1cmU6IHtcclxuXHRcdHN1cGVyOiBbXCJzZWN0aW9uXCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcImZpZ3VyZTpub3QoW3JvbGVdKVwiXVxyXG5cdH0sXHJcblx0Zm9ybToge1xyXG5cdFx0c3VwZXI6IFtcImxhbmRtYXJrXCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcImZvcm06bm90KFtyb2xlXSlcIl1cclxuXHR9LFxyXG5cdGdyaWQ6IHtcclxuXHRcdHN1cGVyOiBbXCJjb21wb3NpdGVcIiwgXCJ0YWJsZVwiXSxcclxuXHRcdHN1YjogW1widHJlZWdyaWRcIl0sXHJcblx0XHRvd25zOiB7IGFueTogW1wicm93Z3JvdXBcIiwgXCJyb3dcIl0gfVxyXG5cdH0sXHJcblx0Z3JpZGNlbGw6IHtcclxuXHRcdHN1cGVyOiBbXCJjZWxsXCIsIFwid2lkZ2V0XCJdLFxyXG5cdFx0c3ViOiBbXCJjb2x1bW5oZWFkZXJcIiwgXCJyb3doZWFkZXJcIl0sXHJcblx0XHRjb250ZXh0OiBbXCJyb3dcIl1cclxuXHR9LFxyXG5cdGdyb3VwOiB7XHJcblx0XHRzdXBlcjogW1wic2VjdGlvblwiXSxcclxuXHRcdHN1YjogW1wicm93XCIsIFwic2VsZWN0XCIsIFwidG9vbGJhclwiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJkZXRhaWxzOm5vdChbcm9sZV0pXCIsIFwib3B0Z3JvdXA6bm90KFtyb2xlXSlcIl1cclxuXHR9LFxyXG5cdGhlYWRpbmc6IHtcclxuXHRcdHN1cGVyOiBbXCJzZWN0aW9uaGVhZFwiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJoMTpub3QoW3JvbGVdKVwiLCBcImgyOm5vdChbcm9sZV0pXCIsIFwiaDM6bm90KFtyb2xlXSlcIixcclxuXHRcdFx0XCJoNDpub3QoW3JvbGVdKVwiLCBcImg1Om5vdChbcm9sZV0pXCIsIFwiaDY6Om5vdChbcm9sZV0pXCJdLFxyXG5cdFx0ZGVmYXVsdHM6IHtcclxuXHRcdFx0bGV2ZWw6IDJcclxuXHRcdH1cclxuXHR9LFxyXG5cdGltZzoge1xyXG5cdFx0c3VwZXI6IFtcInNlY3Rpb25cIl0sXHJcblx0XHRpbXBsaWNpdDogW1wiaW1nW2FsdF06bm90KFthbHQ9JyddKTpub3QoW3JvbGVdKVwiXVxyXG5cdH0sXHJcblx0aW5wdXQ6IHtcclxuXHRcdHN1cGVyOiBbXCJ3aWRnZXRcIl0sXHJcblx0XHRzdWI6IFtcImNoZWNrYm94XCIsIFwib3B0aW9uXCIsIFwicmFkaW9cIiwgXCJzbGlkZXJcIiwgXCJzcGluYnV0dG9uXCIsIFwidGV4dGJveFwiXVxyXG5cdH0sXHJcblx0bGFuZG1hcms6IHtcclxuXHRcdHN1cGVyOiBbXCJzZWN0aW9uXCJdLFxyXG5cdFx0c3ViOiBbXCJiYW5uZXJcIiwgXCJjb21wbGVtZW50YXJ5XCIsIFwiY29udGVudGluZm9cIiwgXCJmb3JtXCIsIFwibWFpblwiLCBcIm5hdmlnYXRpb25cIiwgXCJyZWdpb25cIiwgXCJzZWFyY2hcIl1cclxuXHR9LFxyXG5cdGxpbms6IHtcclxuXHRcdHN1cGVyOiBbXCJjb21tYW5kXCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcImFbaHJlZl06bm90KFtyb2xlXSlcIiwgXCJhcmVhW2hyZWZdOm5vdChbcm9sZV0pXCIsIFwibGlua1tocmVmXTpub3QoW3JvbGVdKVwiXVxyXG5cdH0sXHJcblx0bGlzdDoge1xyXG5cdFx0c3VwZXI6IFtcInNlY3Rpb25cIl0sXHJcblx0XHRzdWI6IFtcImRpcmVjdG9yeVwiLCBcImZlZWRcIl0sXHJcblx0XHRvd25zOiB7IGFueTogW1wiZ3JvdXBcIiwgXCJsaXN0aXRlbVwiXSB9LFxyXG5cdFx0aW1wbGljaXQ6IFtcImRsOm5vdChbcm9sZV0pXCIsIFwib2w6bm90KFtyb2xlXSlcIiwgXCJ1bDpub3QoW3JvbGVdKVwiXVxyXG5cdH0sXHJcblx0bGlzdGJveDoge1xyXG5cdFx0c3VwZXI6IFtcInNlbGVjdFwiXSxcclxuXHRcdG93bnM6IHsgYW55OiBbXCJvcHRpb25cIl0gfSxcclxuXHRcdGltcGxpY2l0OiBbXCJkYXRhbGlzdDpub3QoW3JvbGVdKVwiLCBcInNlbGVjdFttdWx0aXBsZV06bm90KFtyb2xlXSlcIixcclxuXHRcdFx0XCJzZWxlY3Rbc2l6ZV06bm90KFtzaXplPScwJ10pOm5vdChbc2l6ZT0nMSddKTpub3QoW3JvbGVdKVwiXVxyXG5cdH0sXHJcblx0bGlzdGl0ZW06IHtcclxuXHRcdHN1cGVyOiBbXCJzZWN0aW9uXCJdLFxyXG5cdFx0c3ViOiBbXCJ0cmVlaXRlbVwiXSxcclxuXHRcdGNvbnRleHQ6IFtcImdyb3VwXCIsIFwibGlzdFwiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJkdDpub3QoW3JvbGVdKVwiLCBcIm9sID4gbGk6Om5vdChbcm9sZV0pXCJdXHJcblx0fSxcclxuXHRsb2c6IHtcclxuXHRcdHN1cGVyOiBbXCJzZWN0aW9uXCJdLFxyXG5cdFx0ZGVmYXVsdHM6IHtcclxuXHRcdFx0bGl2ZTogXCJwb2xsaXRlXCJcclxuXHRcdH1cclxuXHR9LFxyXG5cdG1haW46IHtcclxuXHRcdHN1cGVyOiBbXCJsYW5kbWFya1wiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJtYWluOm5vdChbcm9sZV0pXCJdXHJcblx0fSxcclxuXHRtYXJxdWVlOiB7IHN1cGVyOiBbXCJzZWN0aW9uXCJdIH0sXHJcblx0bWF0aDoge1xyXG5cdFx0c3VwZXI6IFtcInNlY3Rpb25cIl0sXHJcblx0XHRpbXBsaWNpdDogW1wibWF0aDpub3QoW3JvbGVdKVwiXVxyXG5cdH0sXHJcblx0bWVudToge1xyXG5cdFx0c3VwZXI6IFtcInNlbGVjdFwiXSxcclxuXHRcdHN1YjogW1wibWVudWJhclwiXSxcclxuXHRcdG93bnM6IHsgYW55OiBbXCJtZW51aXRlbVwiLCBcIm1lbnVpdGVtcmFkaW9cIiwgXCJtZW51aXRlbWNoZWNrYm94XCIsIFwiZ3JvdXBcIl19LFxyXG5cdFx0aW1wbGljaXQ6IFtcIm1lbnVbdHlwZT0nY29udGV4dCddOm5vdChbcm9sZV0pXCJdLFxyXG5cdFx0ZGVmYXVsdHM6IHsgb3JpZW50YXRpb246IFwidmVydGljYWxcIiB9XHJcblx0fSxcclxuXHRtZW51YmFyOiB7XHJcblx0XHRzdXBlcjogW1wibWVudVwiXSxcclxuXHRcdHN1YjogW1widG9vbGJhclwiXSxcclxuXHRcdG93bnM6IHsgYW55OiBbXCJtZW51aXRlbVwiLCBcIm1lbnVpdGVtcmFkaW9cIiwgXCJtZW51aXRlbWNoZWNrYm94XCIsIFwiZ3JvdXBcIl0gfSxcclxuXHRcdGRlZmF1bHRzOiB7IG9yaWVudGF0aW9uOiBcImhvcml6b250YWxcIiB9XHJcblx0fSxcclxuXHRtZW51aXRlbToge1xyXG5cdFx0c3VwZXI6IFtcImNvbW1hbmRcIl0sXHJcblx0XHRzdWI6IFtcIm1lbnVpdGVtY2hlY2tib3hcIl0sXHJcblx0XHRjb250ZXh0OiBbXCJncm91cFwiLCBcIm1lbnVcIiwgXCJtZW51YmFyXCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcIm1lbnVpdGVtW3R5cGU9J2NvbnRleHQnXTpub3QoW3JvbGVdKVwiXVxyXG5cdH0sXHJcblx0bWVudWl0ZW1jaGVja2JveDoge1xyXG5cdFx0c3VwZXI6IFtcImNoZWNrYm94XCIsIFwibWVudWl0ZW1cIl0sXHJcblx0XHRzdWI6IFtcIm1lbnVpdGVtcmFkaW9cIl0sXHJcblx0XHRjb250ZXh0OiBbXCJtZW51XCIsIFwibWVudWJhclwiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJtZW51aXRlbVt0eXBlPSdjaGVja2JveCddOm5vdChbcm9sZV0pXCJdLFxyXG5cdFx0ZGVmYXVsdHM6IHsgY2hlY2tlZDogZmFsc2UgfVxyXG5cdH0sXHJcblx0bWVudWl0ZW1yYWRpbzoge1xyXG5cdFx0c3VwZXI6IFtcIm1lbnVpdGVtY2hlY2tib3hcIiwgXCJyYWRpb1wiXSxcclxuXHRcdGNvbnRleHQ6IFtcImdyb3VwXCIsIFwibWVudVwiLCBcIm1lbnViYXJcIl0sXHJcblx0XHRpbXBsaWNpdDogW1wibWVudWl0ZW1bdHlwZT0ncmFkaW8nXTpub3QoW3JvbGVdKVwiXSxcclxuXHRcdGRlZmF1bHRzOiB7IGNoZWNrZWQ6IGZhbHNlIH1cclxuXHR9LFxyXG5cdG5hdmlnYXRpb246IHtcclxuXHRcdHN1cGVyOiBbXCJsYW5kbWFya1wiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJuYXY6bm90KFtyb2xlXSlcIl1cclxuXHR9LFxyXG5cdC8qKiBAdG9kbyByZWNvbnNpZGVyIGlmIG5vbmUgPT0gcHJlc2VudGF0aW9uICovXHJcblx0bm9uZTogeyBzdXBlcjogW1wic3RydWN0dXJlXCJdIH0sXHJcblx0bm90ZTogeyBzdXBlcjogW1wic2VjdGlvblwiXSB9LFxyXG5cdC8qKiBAdG9kbyBtb3JlIHN0cmljdCBkYXRhbGlzdCBzZWxlY3RvciAqL1xyXG5cdG9wdGlvbjoge1xyXG5cdFx0c3VwZXI6IFtcImlucHV0XCJdLFxyXG5cdFx0c3ViOiBbXCJ0cmVlaXRlbVwiXSxcclxuXHRcdGNvbnRleHQ6IFtcImxpc3Rib3hcIl0sXHJcblx0XHRpbXBsaWNpdDogW1wiZGF0YWxpc3Qgb3B0aW9uOm5vdChbcm9sZV0pXCJdLFxyXG5cdFx0ZGVmYXVsdHM6IHsgY2hlY2tlZDogZmFsc2UgfVxyXG5cdH0sXHJcblx0cHJlc2VudGF0aW9uOiB7XHJcblx0XHRzdXBlcjogW1wic3RydWN0dXJlXCJdXHJcblx0fSxcclxuXHRwcm9ncmVzc2Jhcjoge1xyXG5cdFx0c3VwZXI6IFtcInJhbmdlXCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcInByb2dyZXNzOm5vdChbcm9sZV0pXCJdXHJcblx0fSxcclxuXHRyYWRpbzoge1xyXG5cdFx0c3VwZXI6IFtcImlucHV0XCJdLFxyXG5cdFx0c3ViOiBbXCJtZW51aXRlbXJhZGlvXCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcImlucHV0W3R5cGU9J3JhZGlvJ106bm90KFtyb2xlXSlcIl0sXHJcblx0XHRkZWZhdWx0czogeyBjaGVja2VkOiBmYWxzZSB9XHJcblx0fSxcclxuXHRyYWRpb2dyb3VwOiB7XHJcblx0XHRzdXBlcjogW1wic2VsZWN0XCJdLFxyXG5cdFx0b3duczogW1wicmFkaW9cIl1cclxuXHR9LFxyXG5cdHJhbmdlOiB7XHJcblx0XHRzdXBlcjogW1wid2lkZ2V0XCJdLFxyXG5cdFx0c3ViOiBbXCJwcm9ncmVzc2JhclwiLCBcInNjcm9sbGJhclwiLCAgXCJzbGlkZXJcIiwgIFwic3BpbmJ1dHRvblwiXVxyXG5cdH0sXHJcblx0LyoqIEB0b2RvIGFkZCBzZWN0aW9uIHNlbGVjdG9yIHRvIGNoZWNrIGFjY2Vzc2libGUgKi9cclxuXHRyZWdpb246IHsgc3VwZXI6IFtcImxhbmRtYXJrXCJdIH0sXHJcblx0cm9sZXR5cGU6IHsgc3ViOiBbXCJzdHJ1Y3R1cmVcIiwgXCJ3aWRnZXRcIiwgXCJ3aW5kb3dcIl0gfSxcclxuXHQvKiogQHRvZG8gbW9yZSBzdHJpY3QgdHIgc2VsZWN0b3IgKi9cclxuXHRyb3c6IHtcclxuXHRcdHN1YjogW1wiZ3JvdXBcIiwgXCJ3aWRnZXRcIl0sXHJcblx0XHRjb250ZXh0OiBbXCJncmlkXCIsIFwicm93Z3JvdXBcIiwgXCJ0YWJsZVwiLCBcInRyZWVncmlkXCJdLFxyXG5cdFx0b3duczogeyBhbnk6IFtcImNlbGxcIiwgXCJjb2x1bW5oZWFkZXJcIiwgXCJyb3doZWFkZXJcIiwgXCJncmlkY2VsbFwiXSB9LFxyXG5cdFx0aW1wbGljaXQ6IFtcInRhYmxlIHRyOm5vdChbcm9sZV0pXCJdXHJcblx0fSxcclxuXHRyb3dncm91cDoge1xyXG5cdFx0Y29udGV4dDogW1wiZ3JpZFwiLCBcInRhYmxlXCIsIFwidHJlZWdyaWRcIl0sXHJcblx0XHRvd25zOiB7IGFueTogW1wicm93XCJdIH0sXHJcblx0XHRpbXBsaWNpdDogW1widGhlYWQ6bm90KFtyb2xlXSlcIiwgXCJ0Ym9keTpub3QoW3JvbGVdKVwiLCBcInRmb290Om5vdChbcm9sZV0pXCJdXHJcblx0fSxcclxuXHRyb3doZWFkZXI6IHtcclxuXHRcdHN1cGVyOiBbXCJjZWxsXCIsIFwiZ3JpZGNlbGxcIiwgXCJzZWN0aW9uaGVhZFwiXSxcclxuXHRcdGNvbnRleHQ6IFtcInJvd1wiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJ0Ym9keSB0aDpub3QoW3JvbGVdKVwiXVxyXG5cdH0sXHJcblx0c2Nyb2xsYmFyOiB7XHJcblx0XHRzdXBlcjogW1wicmFuZ2VcIl0sXHJcblx0XHRkZWZhdWx0czoge1xyXG5cdFx0XHRvcmllbnRhdGlvbjogXCJ2ZXJ0aWNhbFwiLFxyXG5cdFx0XHR2YWx1ZU1pbjogMCxcclxuXHRcdFx0dmFsdWVNYXg6IDEwMFxyXG5cdFx0fVxyXG5cdH0sXHJcblx0c2VhcmNoOiB7IHN1cGVyOiBbXCJsYW5kbWFya1wiXSB9LFxyXG5cdHNlYXJjaGJveDoge1xyXG5cdFx0c3VwZXI6IFtcInRleHRib3hcIl0sXHJcblx0XHRpbXBsaWNpdDogW1wiaW5wdXRbdHlwZT0nc2VhcmNoJ106bm90KFtsaXN0XSk6bm90KFtyb2xlXSlcIl1cclxuXHR9LFxyXG5cdHNlY3Rpb246IHtcclxuXHRcdHN1cGVyOiBbXCJzdHJ1Y3R1cmVcIl0sXHJcblx0XHRzdWI6IFtcImFsZXJ0XCIsIFwiY2VsbFwiLCBcImRlZmluaXRpb25cIiwgXCJmaWd1cmVcIiwgXCJncm91cFwiLCBcImltZ1wiLCBcImxhbmRtYXJrXCIsIFwibGlzdFwiLCBcImxpc3RpdGVtXCIsXHJcblx0XHRcdFwibG9nXCIsIFwibWFycXVlZVwiLCBcIm1hdGhcIiwgXCJub3RlXCIsIFwic3RhdHVzXCIsIFwidGFibGVcIiwgXCJ0YWJwYW5lbFwiLCBcInRlcm1cIiwgXCJ0b29sdGlwXCJdXHJcblx0fSxcclxuXHRzZWN0aW9uaGVhZDoge1xyXG5cdFx0c3VwZXI6IFtcInN0cnVjdHVyZVwiXSxcclxuXHRcdHN1YjogW1wiY29sdW1uaGVhZGVyXCIsIFwiaGVhZGluZ1wiLCBcInJvd2hlYWRlclwiLCBcInRhYlwiXVxyXG5cdH0sXHJcblx0c2VsZWN0OiB7XHJcblx0XHRzdXBlcjogW1wiY29tcG9zaXRlXCIsIFwiZ3JvdXBcIl0sXHJcblx0XHRzdWI6IFtcImNvbWJvYm94XCIsIFwibGlzdGJveFwiLCBcIm1lbnVcIiwgXCJyYWRpb2dyb3VwXCIsIFwidHJlZVwiXVxyXG5cdH0sXHJcblx0LyoqIEB0b2RvIHNlcGVyYXRpb24gb2YgZm9jdXNhYmxlICovXHJcblx0c2VwYXJhdG9yOiB7XHJcblx0XHRzdXBlcjogW1wic3RydWN0dXJlXCIsIFwid2lkZ2V0XCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcImhyOm5vdChbcm9sZV0pXCJdLFxyXG5cdFx0ZGVmYXVsdHM6IHtcclxuXHRcdFx0b3JpZW50YXRpb246IFwiaG9yaXpvbnRhbFwiLFxyXG5cdFx0XHR2YWx1ZU1pbjogMCxcclxuXHRcdFx0dmFsdWVNYXg6IDEwMCxcclxuXHRcdFx0dmFsdWVOb3c6IDUwXHJcblx0XHR9XHJcblx0fSxcclxuXHRzbGlkZXI6IHtcclxuXHRcdHN1cGVyOiBbXCJpbnB1dFwiLCBcInJhbmdlXCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcImlucHV0W3R5cGU9J3JhbmdlJ106bm90KFtyb2xlXSlcIl0sXHJcblx0XHRkZWZhdWx0czoge1xyXG5cdFx0XHRvcmllbnRhdGlvbjogXCJob3Jpem9udGFsXCIsXHJcblx0XHRcdHZhbHVlTWluOiAwLFxyXG5cdFx0XHR2YWx1ZU1heDogMTAwXHJcblx0XHR9XHJcblx0fSxcclxuXHRzcGluYnV0dG9uOiB7XHJcblx0XHRzdXBlcjogW1wiY29tcG9zaXRlXCIsIFwiaW5wdXRcIiwgXCJyYW5nZVwiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJpbnB1dFt0eXBlPSdudW1iZXInXTpub3QoW3JvbGVdKVwiXSxcclxuXHRcdGRlZmF1bHRzOiB7XHR2YWx1ZU5vdzogMCB9XHJcblx0fSxcclxuXHRzdGF0dXM6IHtcclxuXHRcdHN1cGVyOiBcInNlY3Rpb25cIixcclxuXHRcdHN1YjogW1wicHJvZ3Jlc3NiYXJcIiwgXCJ0aW1lclwiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJvdXRwdXQ6bm90KFtyb2xlXSlcIl1cclxuXHR9LFxyXG5cdHN0cnVjdHVyZToge1xyXG5cdFx0c3VwZXI6IFtcInJvbGV0eXBlXCJdLFxyXG5cdFx0c3ViOiBbXCJhcHBsaWNhdGlvblwiLCBcImRvY3VtZW50XCIsIFwicHJlc2VudGF0aW9uXCIsIFwicm93Z3JvdXBcIiwgXCJzZWN0aW9uXCIsIFwic2VjdGlvbmhlYWRcIiwgXCJzZXBhcmF0b3JcIl1cclxuXHR9LFxyXG5cdHN3aXRjaDoge1xyXG5cdFx0c3VwZXI6IFtcImNoZWNrYm94XCJdLFxyXG5cdFx0ZGVmYXVsdHM6IHsgY2hlY2tlZDogZmFsc2UgfVxyXG5cdH0sXHJcblx0dGFiOiB7XHJcblx0XHRzdXBlcjogW1wic2VjdGlvbmhlYWRcIiwgXCJ3aWRnZXRcIl0sXHJcblx0XHRjb250ZXh0OiBbXCJ0YWJsaXN0XCJdLFxyXG5cdFx0ZGVmYXVsdHM6IHsgc2VsZWN0ZWQ6IGZhbHNlIH1cclxuXHR9LFxyXG5cdHRhYmxlOiB7XHJcblx0XHRzdXBlcjogW1wic2VjdGlvblwiXSxcclxuXHRcdHN1YjogW1wiZ3JpZFwiXSxcclxuXHRcdG93bnM6IHsgYW55OiBbXCJyb3dcIiwgXCJyb3dncm91cFwiXX0sXHJcblx0XHRpbXBsaWNpdDogW1widGFibGU6bm90KFtyb2xlXSlcIl1cclxuXHR9LFxyXG5cdHRhYmxpc3Q6IHtcclxuXHRcdHN1cGVyOiBbXCJjb21wb3NpdGVcIl0sXHJcblx0XHRvd25zOiB7IGFueTogW1widGFiXCJdIH0sXHJcblx0XHRkZWZhdWx0czogeyBvcmllbnRhdGlvbjogXCJob3Jpem9udGFsXCIgfVxyXG5cdH0sXHJcblx0dGFicGFuZWw6IHsgc3VwZXI6IFtcInNlY3Rpb25cIl0gfSxcclxuXHR0ZXJtOiB7IHN1cGVyOiBbXCJzZWN0aW9uXCJdIH0sXHJcblx0dGV4dGJveDoge1xyXG5cdFx0c3VwZXI6IFtcImlucHV0XCJdLFxyXG5cdFx0c3ViOiBbXCJzZWFyY2hib3hcIl0sXHJcblx0XHRpbXBsaWNpdDogW1wiaW5wdXRbdHlwZT0nZW1haWwnXTpub3QoW2xpc3RdKTpub3QoW3JvbGVdKVwiLFxyXG5cdFx0XHRcImlucHV0W3R5cGU9J3RlbCddOm5vdChbbGlzdF0pOm5vdChbcm9sZV0pXCIsIFwiaW5wdXRbdHlwZT0ndGV4dCddOm5vdChbbGlzdF0pOm5vdChbcm9sZV0pXCIsXHJcblx0XHRcdFwiaW5wdXRbdHlwZT0ndXJsJ106bm90KFtsaXN0XSk6bm90KFtyb2xlXSlcIiwgXCJ0ZXh0YXJlYTpub3QoW3JvbGVdKVwiXVxyXG5cdH0sXHJcblx0dGltZXI6IHsgc3VwZXI6IFtcInN0YXR1c1wiXSB9LFxyXG5cdHRvb2xiYXI6IHtcclxuXHRcdHN1cGVyOiBbXCJncm91cFwiXSxcclxuXHRcdGRlZmF1bHRzOiB7IG9yaWVudGF0aW9uOiBcImhvcml6b250YWxcIiB9XHJcblx0fSxcclxuXHR0b29sdGlwOiB7IHN1cGVyOiBbXCJzZWN0aW9uXCJdIH0sXHJcblx0dHJlZToge1xyXG5cdFx0c3VwZXI6IFtcInNlbGVjdFwiXSxcclxuXHRcdHN1YjogW1widGhyZWVncmlkXCJdLFxyXG5cdFx0b3duczogeyBhbnk6IFtcImdyb3VwXCIsIFwidHJlZWl0ZW1cIl0gfVxyXG5cdH0sXHJcblx0dHJlZWdyaWQ6IHtcclxuXHRcdHN1cGVyOiBbXCJncmlkXCIsIFwidHJlZVwiXSxcclxuXHRcdG93bnM6IFtcInJvd1wiLCBcInJvd2dyb3VwXCJdXHJcblx0fSxcclxuXHR0cmVlaXRlbToge1xyXG5cdFx0c3VwZXI6IFtcImxpc3RpdGVtXCIsIFwib3B0aW9uXCJdLFxyXG5cdFx0Y29udGV4dDogeyBhbnk6IFtcImdyb3VwXCIsIFwidHJlZVwiXX1cclxuXHR9LFxyXG5cdHdpZGdldDoge1xyXG5cdFx0c3VwZXI6IFtcInJvbGV0eXBlXCJdLFxyXG5cdFx0c3ViOiBbXCJjb21tYW5kXCIsIFwiY29tcG9zaXRlXCIsIFwiZ3JpZGNlbGxcIiwgXCJpbnB1dFwiLCBcInJhbmdlXCIsIFwicm93XCIsIFwic2VwYXJhdG9yXCIsIFwidGFiXCJdXHJcblx0fSxcclxuXHR3aW5kb3c6IHtcclxuXHRcdHN1cGVyOiBbXCJyb2xldHlwZVwiXSxcclxuXHRcdHN1YjogW1wiZGlhbG9nXCJdXHJcblx0fVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcm9sZXM7IiwiZnVuY3Rpb24gc2V0U2VsZWN0aW9uKHJhbmdlKSB7XG5cdHZhciBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG5cdHNlbGVjdGlvbi5yZW1vdmVBbGxSYW5nZXMoKTtcblx0c2VsZWN0aW9uLmFkZFJhbmdlKHJhbmdlKTtcbn1cblxuLyoqXG4gKiBAbWl4aW5cbiAqL1xubGV0IFNlbGVjdGlvbiA9IChzdXBlcmNsYXNzKSA9PiBjbGFzcyBTZWxlY3Rpb24gZXh0ZW5kcyBzdXBlcmNsYXNzIHtcblx0LyoqXG5cdCAqIFNlbGVjdHMgZXZlcnl0aGluZyBpbiB0aGUgdGV4dCBjb250cm9sLlxuXHQgKiBAbmFtZSBTZWxlY3Rpb24jc2VsZWN0XG5cdCAqL1xuXHRzZWxlY3QoKSB7XG5cdFx0dGhpcy5zZXRTZWxlY3Rpb25SYW5nZSgwLCB0aGlzLnZhbHVlLmxlbmd0aCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyAvIFNldHMgdGhlIGJlZ2lubmluZyBpbmRleCBvZiB0aGUgc2VsZWN0ZWQgdGV4dC4gV2hlbiBub3RoaW5nIGlzIHNlbGVjdGVkLFxuXHQgKiB0aGlzIHJldHVybnMgdGhlIHBvc2l0aW9uIG9mIHRoZSB0ZXh0IGlucHV0IGN1cnNvcihjYXJldCkgaW5zaWRlIG9mIHRoZSA8IGlucHV0ID4gZWxlbWVudC5cblx0ICogXG5cdCAqIEBuYW1lIFNlbGVjdGlvbiNzZWxlY3Rpb25TdGFydFxuXHQgKiBAdHlwZSB7TnVtYmVyfVxuXHQgKi9cblx0Z2V0IHNlbGVjdGlvblN0YXJ0KCkge1xuXHRcdGxldCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG5cdFx0aWYgKHNlbC5hbmNob3JOb2RlICYmIHNlbC5hbmNob3JOb2RlLnBhcmVudE5vZGUgPT0gdGhpcy5lbGVtZW50KSB7XG5cdFx0XHRyZXR1cm4gc2VsLmFuY2hvck9mZnNldCA+IHNlbC5mb2N1c09mZnNldCA/IHNlbC5mb2N1c09mZnNldCA6IHNlbC5hbmNob3JPZmZzZXQ7XG5cdFx0fVxuXHR9XG5cdHNldCBzZWxlY3Rpb25TdGFydChzdGFydCkge1xuXHRcdGxldCByYW5nZSA9IG5ldyBSYW5nZSgpO1xuXHRcdHJhbmdlLnNldFN0YXJ0KHRoaXMuZWxlbWVudC5maXJzdENoaWxkLCBzdGFydCk7XG5cdFx0c2V0U2VsZWN0aW9uKHJhbmdlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIC8gU2V0cyB0aGUgZW5kIGluZGV4IG9mIHRoZSBzZWxlY3RlZCB0ZXh0LiBXaGVuIHRoZXJlJ3Mgbm8gc2VsZWN0aW9uLHRoaXMgcmV0dXJucyB0aGVcblx0ICogb2Zmc2V0IG9mIHRoZSBjaGFyYWN0ZXIgaW1tZWRpYXRlbHkgZm9sbG93aW5nIHRoZSBjdXJyZW50IHRleHQgaW5wdXQgY3Vyc29yIHBvc2l0aW9uLlxuXHQgKiBcblx0ICogQG5hbWUgU2VsZWN0aW9uI3NlbGVjdGlvbkVuZFxuXHQgKiBAdHlwZSB7TnVtYmVyfVxuXHQgKi9cblx0Z2V0IHNlbGVjdGlvbkVuZCgpIHtcblx0XHRsZXQgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuXHRcdGlmIChzZWwuZm9jdXNOb2RlICYmIHNlbC5mb2N1c05vZGUucGFyZW50Tm9kZSA9PSB0aGlzLmVsZW1lbnQpIHtcblx0XHRcdHJldHVybiBzZWwuZm9jdXNPZmZzZXQgPiBzZWwuYW5jaG9yT2Zmc2V0ID8gc2VsLmZvY3VzT2Zmc2V0IDogc2VsLmFuY2hvck9mZnNldDtcblx0XHR9XG5cdH1cblx0c2V0IHNlbGVjdGlvbkVuZChlbmQpIHtcblx0XHRsZXQgcmFuZ2UgPSBuZXcgUmFuZ2UoKTtcblx0XHRyYW5nZS5zZXRFbmQodGhpcy5lbGVtZW50LmZpcnN0Q2hpbGQsIGVuZCk7XG5cdFx0c2V0U2VsZWN0aW9uKHJhbmdlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIC8gU2V0cyB0aGUgZGlyZWN0aW9uIGluIHdoaWNoIHNlbGVjdGlvbiBvY2N1cnJlZC5cblx0ICogXG5cdCAqICogXCJmb3J3YXJkXCIgaWYgc2VsZWN0aW9uIHdhcyBwZXJmb3JtZWQgaW4gdGhlIHN0YXJ0IC0gdG8gLSBlbmQgZGlyZWN0aW9uIG9mIHRoZSBjdXJyZW50IGxvY2FsZS5cblx0ICogKiBcImJhY2t3YXJkXCIgZm9yIHRoZSBvcHBvc2l0ZSBkaXJlY3Rpb24sXG5cdCAqICogXCJub25lXCIgaWYgdGhlIGRpcmVjdGlvbiBpcyB1bmtub3duLlwiXG5cdCAqIFxuXHQgKiBAbmFtZSBTZWxlY3Rpb24jc2VsZWN0aW9uRGlyZWN0aW9uXG5cdCAqIEB0b2RvIGltcHJvdmUgbWV0aG9kIHRvIHNldCBhbmQgZ2V0IGRpcmVjdGlvblxuXHQgKiBAdHlwZSB7IFwiZm9yd2FyZFwiIHwgXCJiYWNrd2FyZFwiIHwgXCJub25lXCIgfVxuXHQgKi9cblx0Z2V0IHNlbGVjdGlvbkRpcmVjdGlvbigpIHtcblx0XHRsZXQgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuXHRcdGlmIChzZWwuZm9jdXNOb2RlICYmIHNlbC5mb2N1c05vZGUucGFyZW50Tm9kZSA9PSB0aGlzLmVsZW1lbnQpIHtcblx0XHRcdGlmIChzZWwuZm9jdXNPZmZzZXQgPT0gc2VsLmFuY2hvck9mZnNldCkge1xuXHRcdFx0XHRyZXR1cm4gXCJub25lXCI7XG5cdFx0XHR9IGVsc2UgaWYgKHNlbC5hbmNob3JPZmZzZXQgPiBzZWwuZm9jdXNPZmZzZXQpIHtcblx0XHRcdFx0cmV0dXJuIFwiYmFja3dhcmRcIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBcImZvcndhcmRcIjtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0c2V0IHNlbGVjdGlvbkRpcmVjdGlvbihkaXJlY3Rpb24pIHtcblx0XHRsZXQgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuXHRcdGlmIChzZWwuZm9jdXNOb2RlICYmIHNlbC5mb2N1c05vZGUucGFyZW50Tm9kZSA9PSB0aGlzLmVsZW1lbnQpIHtcblx0XHRcdGlmIChzZWwuZm9jdXNPZmZzZXQgPT0gc2VsLmFuY2hvck9mZnNldCkge1xuXG5cdFx0XHR9IGVsc2UgaWYgKHNlbC5hbmNob3JPZmZzZXQgPiBzZWwuZm9jdXNPZmZzZXQgJiYgZGlyZWN0aW9uICE9IFwiYmFja3dhcmRcIikge1xuXHRcdFx0XHRsZXQgcmFuZ2UgPSBuZXcgUmFuZ2UoKTtcblx0XHRcdFx0cmFuZ2Uuc2V0U3RhcnQodGhpcy5lbGVtZW50LmZpcnN0Q2hpbGQsIHRoaXMuc2VsZWN0aW9uRW5kKTtcblx0XHRcdFx0cmFuZ2Uuc2V0RW5kKHRoaXMuZWxlbWVudC5maXJzdENoaWxkLCB0aGlzLnNlbGVjdGlvblN0YXJ0KTtcblxuXHRcdFx0XHRzZXRTZWxlY3Rpb24ocmFuZ2UpO1xuXHRcdFx0fSBlbHNlIGlmIChkaXJlY3Rpb24gIT0gXCJmb3J3YXJkXCIpIHtcblx0XHRcdFx0bGV0IHJhbmdlID0gbmV3IFJhbmdlKCk7XG5cdFx0XHRcdHJhbmdlLnNldFN0YXJ0KHRoaXMuZWxlbWVudC5maXJzdENoaWxkLCB0aGlzLnNlbGVjdGlvblN0YXJ0KTtcblx0XHRcdFx0cmFuZ2Uuc2V0RW5kKHRoaXMuZWxlbWVudC5maXJzdENoaWxkLCB0aGlzLnNlbGVjdGlvbkVuZCk7XG5cblx0XHRcdFx0c2V0U2VsZWN0aW9uKHJhbmdlKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogU2VsZWN0cyBhIHJhbmdlIG9mIHRleHQgaW4gdGhlIGVsZW1lbnQgKGJ1dCBkb2VzIG5vdCBmb2N1cyBpdCkuXG5cdCAqIEBuYW1lIFNlbGVjdGlvbiNzZXRTZWxlY3Rpb25SYW5nZVxuXHQgKiBAcGFyYW0ge0ludGVnZXJ9IHNlbGVjdGlvblN0YXJ0XG5cdCAqIEBwYXJhbSB7SW50ZWdlcn0gc2VsZWN0aW9uRW5kXG5cdCAqIEBwYXJhbSB7IFwiZm9yd2FyZFwiIHwgXCJiYWNrd2FyZFwiIHwgXCJub25lXCIgfSBbc2VsZWN0aW9uRGlyZWN0aW9uID0gXCJub25lXCJdIFxuXHQgKiBFc3RhYmxpc2ggdGhlIGRpcmVjdGlvbiBpbiB3aGljaCBzZWxlY3Rpb24gd2FzIHNldFxuXHQgKi9cblx0c2V0U2VsZWN0aW9uUmFuZ2Uoc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCwgc2VsZWN0aW9uRGlyZWN0aW9uID0gXCJub25lXCIpIHtcblx0XHRsZXQgc3RhcnQgPSBzZWxlY3Rpb25EaXJlY3Rpb24gPT0gXCJiYWNrd2FyZFwiID8gc2VsZWN0aW9uRW5kIDogc2VsZWN0aW9uU3RhcnQ7XG5cdFx0bGV0IGVuZCA9IHNlbGVjdGlvbkRpcmVjdGlvbiA9PSBcImJhY2t3YXJkXCIgPyBzZWxlY3Rpb25TdGFydCA6IHNlbGVjdGlvbkVuZDtcblxuXHRcdGxldCByYW5nZSA9IG5ldyBSYW5nZSgpO1xuXHRcdHJhbmdlLnNldFN0YXJ0KHRoaXMuZWxlbWVudC5maXJzdENoaWxkLCBzdGFydCk7XG5cdFx0cmFuZ2Uuc2V0RW5kKHRoaXMuZWxlbWVudC5maXJzdENoaWxkLCBlbmQpO1xuXG5cdFx0c2V0U2VsZWN0aW9uKHJhbmdlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXBsYWNlcyB0aGUgcmFuZ2Ugb2YgdGV4dCB3aXRoIHRoZSBuZXcgdGV4dC5cblx0ICogQG5hbWUgU2VsZWN0aW9uI3NldFJhbmdlVGV4dFxuXHQgKiBAdG9kbyBLZWVwIHByZXZpb3VzIHNlbGVjdGlvbiBvbiBwbGFjZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gcmVwbGFjZW1lbnQgXG5cdCAqIEBwYXJhbSB7SW50ZWdlcn0gW3N0YXJ0ID0ge0BsaW5rIFRleHRib3gjc2VsZWN0aW9uU3RhcnR9XVxuXHQgKiBAcGFyYW0ge0ludGVnZXJ9IFtlbmRdXG5cdCAqIEBwYXJhbSB7IFwic2VsZWN0XCIgfCBcInN0YXJ0XCIgfCBcImVuZFwiIHwgXCJwcmVzZXJ2ZVwiIH0gW3NlbGVjdE1vZGUgPSBcInByZXNlcnZlXCJdXG5cdCAqL1xuXHRzZXRSYW5nZVRleHQoXG5cdFx0cmVwbGFjZW1lbnQsXG5cdFx0c3RhcnQgPSB0aGlzLnNlbGVjdGlvblN0YXJ0LFxuXHRcdGVuZCA9IHRoaXMuc2VsZWN0aW9uRW5kLFxuXHRcdHNlbGVjdE1vZGUgPSBcInByZXNlcnZlXCJcblx0KSB7XG5cdFx0bGV0IHNlbGVjdGlvblN0YXJ0ID0gdGhpcy5zZWxlY3Rpb25TdGFydDtcblx0XHRsZXQgc2VsZWN0aW9uRW5kID0gdGhpcy5zZWxlY3Rpb25FbmQ7XG5cblx0XHRpZiAoc3RhcnQgPiBlbmQpIHsgdGhyb3cgbmV3IFJhbmdlRXJyb3IoKTsgfVxuXHRcdGlmIChzdGFydCA+IHRoaXMudmFsdWUubGVuZ3RoKSB7IHN0YXJ0ID0gdGhpcy52YWx1ZS5sZW5ndGg7IH1cblx0XHRpZiAoZW5kID4gdGhpcy52YWx1ZS5sZW5ndGgpIHsgZW5kID0gdGhpcy52YWx1ZS5sZW5ndGg7IH1cblx0XHRpZiAoc3RhcnQgPCBlbmQpIHtcblx0XHRcdC8vIGRlbGV0ZSBjaGFyYWN0ZXJzIGJldHdlZW4gc3RhcnQgYW5kIGVuZFxuXHRcdH1cblxuXHRcdHRoaXMudmFsdWUgPSB0aGlzLnZhbHVlLnNsaWNlKDAsIHN0YXJ0KSArIHJlcGxhY2VtZW50ICsgdGhpcy52YWx1ZS5zbGljZShlbmQpO1xuXG5cdFx0aWYgKHNlbGVjdE1vZGUgPT0gXCJzdGFydFwiKSB0aGlzLnNlbGVjdGlvblN0YXJ0ID0gMDtcblx0XHRpZiAoc2VsZWN0TW9kZSA9PSBcImVuZFwiKSB0aGlzLnNlbGVjdGlvblN0YXJ0ID0gdGhpcy52YWx1ZS5sZW5ndGg7XG5cdFx0aWYgKHNlbGVjdE1vZGUgPT0gXCJzZWxlY3RcIikgdGhpcy5zZWxlY3QoKTtcblx0XHRpZiAoc2VsZWN0TW9kZSA9PSBcInByZXNlcnZlXCIpIHRoaXMuc2V0U2VsZWN0aW9uUmFuZ2Uoc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCk7XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdGlvbjsiLCJpbXBvcnQgVmFsaWRpdHlTdGF0ZSBcdGZyb20gXCIuLy4uL3V0aWxzL1ZhbGlkaXR5U3RhdGVcIjtcblxuLyoqXG4gKiBAbWl4aW5cbiAqIEBib3Jyb3dzIFZhbGlkaXR5U3RhdGUgYXMgdmFsaWRpdHlcbiAqIEBsZW5kcyBWYWxpZGF0aW9uI1xuICovXG5sZXQgVmFsaWRhdGlvbiA9IChzdXBlcmNsYXNzKSA9PiBjbGFzcyBWYWxpZGF0aW9uIGV4dGVuZHMgc3VwZXJjbGFzcyBcbnsgXG5cdGdldCB2YWxpZGl0eSgpIHsgXG5cdFx0aWYoIXRoaXMuX3ZhbGlkaXR5KSB0aGlzLl92YWxpZGl0eSA9IG5ldyBWYWxpZGl0eVN0YXRlKHRoaXMpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX3ZhbGlkaXR5O1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudCB3aWxsIGJlIHZhbGlkYXRlZCB3aGVuIHRoZSBmb3JtIGlzIHN1Ym1pdHRlZDsgZmFsc2Ugb3RoZXJ3aXNlLlxuXHQgKiBAdHlwZSB7Qm9vbGVhbn1cblx0ICovXG5cdGdldCB3aWxsVmFsaWRhdGUoKSB7IHJldHVybiAhdGhpcy5oaWRkZW4gJiYgIXRoaXMucmVhZE9ubHk7IH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgZXJyb3IgbWVzc2FnZSB0aGF0IHdvdWxkIGJlIHNob3duIHRvIHRoZSB1c2VyXG5cdCAqIGlmIHRoZSBlbGVtZW50IHdhcyB0byBiZSBjaGVja2VkIGZvciB2YWxpZGl0eS5cblx0ICogQG5hbWUgVmFsaWRhdGlvbiN2YWxpZGF0aW9uTWVzc2FnZVxuXHQgKiBAdHlwZSB7U3RyaW5nfVxuXHQgKi9cblx0Z2V0IHZhbGlkYXRpb25NZXNzYWdlKCkge1xuXHRcdGlmKHRoaXMudmFsaWRpdHkudmFsaWQpIHJldHVybjtcblx0XHRpZih0aGlzLnZhbGlkaXR5LnZhbHVlTWlzc2luZykgcmV0dXJuIFwiUGxlYXNlIGZpbGwgaW4gdGhpcyBmaWVsZC5cIjtcblx0XHRpZih0aGlzLnZhbGlkaXR5LnR5cGVNaXNtYXRjaCkgcmV0dXJuIFwiUGxlYXNlIHVzZSB0aGUgY29ycmVjdCBpbnB1dCB0eXBlLlwiO1xuXHRcdFxuXHRcdGlmICh0aGlzLnZhbGlkaXR5LnRvb0xvbmcpIHtcblx0XHRcdHJldHVybiBcIlBsZWFzZSBzaG9ydGVuIHRoaXMgdGV4dCB0byAxMCBjaGFyYWN0ZXJzIG9yIGxlc3MgKHlvdSBhcmUgY3VycmVudGx5IHVzaW5nIDQ4IGNoYXJhY3RlcnMpLlwiO1xuXHRcdH1cblx0XHRpZih0aGlzLnZhbGlkaXR5LnRvb1Nob3J0KSB7XG5cdFx0XHRyZXR1cm4gXCJQbGVhc2UgbGVuZ3RoZW4gdGhpcyB0ZXh0IHRvIDEwIGNoYXJhY3RlcnMgb3IgbW9yZSAoeW91IGFyZSBjdXJyZW50bHkgdXNpbmcgMSBjaGFyYWN0ZXIpLlwiO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMudmFsaWRpdHkuYmFkSW5wdXQpIHJldHVybiBcIlBsZWFzZSBlbnRlciBhIG51bWJlci5cIjtcblx0XHRpZiAodGhpcy52YWxpZGl0eS5zdGVwTWlzbWF0Y2gpIHJldHVybiBcIlBsZWFzZSBzZWxlY3QgYSB2YWxpZCB2YWx1ZS5cIjtcblx0XHRpZiAodGhpcy52YWxpZGl0eS5yYW5nZU92ZXJmbG93KSByZXR1cm4gXCJQbGVhc2Ugc2VsZWN0IGEgc21hbGxlciB2YWx1ZS5cIjtcblx0XHRpZiAodGhpcy52YWxpZGl0eS5yYW5nZVVuZGVyZmxvdykgcmV0dXJuIFwiUGxlYXNlIHNlbGVjdCBhIGxhcmdlciB2YWx1ZS5cIjtcblx0XHRpZih0aGlzLnZhbGlkaXR5LnBhdHRlcm5NaXNtYXRjaCkgcmV0dXJuIFwiUGxlYXNlIG1hdGNoIHRoZSBmb3JtYXQgcmVxdWVzdGVkLlwiO1xuXHRcdGlmKHRoaXMudmFsaWRpdHkuY3VzdG9tRXJyb3IpIHJldHVybiB0aGlzLmVycm9ybWVzc2FnZS5lbGVtZW50LmlubmVySFRNTDtcblxuXHRcdC8vIEZhbGxiYWNrIHZhbHVlIHNob3VsZCBuZXZlciBiZWVuIHNob3duXG5cdFx0cmV0dXJuIHRoaXMuZXJyb3JtZXNzYWdlLmVsZW1lbnQuaW5uZXJIVE1MIHx8IFwiVGhlIHZhbHVlIHlvdSBlbnRlcmVkIGZvciB0aGlzIGZpZWxkIGlzIGludmFsaWQuXCI7XHRcdFxuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudOKAmXMgdmFsdWUgaGFzIG5vIHZhbGlkaXR5IHByb2JsZW1zOyBmYWxzZSBvdGhlcndpc2UuXG5cdCAqIEZpcmVzIGFuIGludmFsaWQgZXZlbnQgYXQgdGhlIGVsZW1lbnQgaW4gdGhlIGxhdHRlciBjYXNlLlxuXHQgKiBAZmlyZXMgaW52YWxpZFxuXHQgKiBAbmFtZSBWYWxpZGF0aW9uI2NoZWNrVmFsaWRpdHlcblx0ICovXG5cdGNoZWNrVmFsaWRpdHkoKSB7XG5cdFx0aWYoIXRoaXMudmFsaWRpdHkudmFsaWQpIHRoaXMuZGlzcGF0Y2hFdmVudChcImludmFsaWRcIiwgdGhpcyk7XG5cdFx0cmV0dXJuIHRoaXMudmFsaWRpdHkudmFsaWQ7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW504oCZcyB2YWx1ZSBoYXMgbm8gdmFsaWRpdHkgcHJvYmxlbXM7IG90aGVyd2lzZSwgcmV0dXJucyBmYWxzZSwgZmlyZXMgYW5cblx0ICogaW52YWxpZCBldmVudCBhdCB0aGUgZWxlbWVudCwgYW5kKGlmIHRoZSBldmVudCBpc27igJl0IGNhbmNlbGVkKSByZXBvcnRzIHRoZSBwcm9ibGVtIHRvIHRoZSB1c2VyLlxuXHQgKiBAZmlyZXMgaW52YWxpZFxuXHQgKiBAbmFtZSBWYWxpZGF0aW9uI3JlcG9ydFZhbGlkaXR5XG5cdCAqL1xuXHRyZXBvcnRWYWxpZGl0eSgpIHtcblx0XHRpZiAoIXRoaXMudmFsaWRpdHkudmFsaWQpIHtcblx0XHRcdGxldCBjYW5jZWxsZWQgPSAhdGhpcy5kaXNwYXRjaEV2ZW50KFwiaW52YWxpZFwiLCB0aGlzKTtcblx0XHRcdGlmICghY2FuY2VsbGVkKSB7XG5cdFx0XHRcdHRoaXMuZXJyb3JtZXNzYWdlLmhpZGRlbiA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmVycm9ybWVzc2FnZS5oaWRkZW4gPSB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy52YWxpZGl0eS52YWxpZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXRzIGEgY3VzdG9tIGVycm9yLCBzbyB0aGF0IHRoZSBlbGVtZW50IHdvdWxkIGZhaWwgdG8gdmFsaWRhdGUuVGhlIGdpdmVuIG1lc3NhZ2UgaXMgdGhlXG5cdCAqIG1lc3NhZ2UgdG8gYmUgc2hvd24gdG8gdGhlIHVzZXIgd2hlbiByZXBvcnRpbmcgdGhlIHByb2JsZW0gdG8gdGhlIHVzZXIuXG5cdCAqIFxuXHQgKiBJZiB0aGUgYXJndW1lbnQgaXMgdGhlIGVtcHR5IHN0cmluZywgY2xlYXJzIHRoZSBjdXN0b20gZXJyb3IuXG5cdCAqIFxuXHQgKiBAbmFtZSBWYWxpZGF0aW9uI3NldEN1c3RvbVZhbGlkaXR5XG5cdCAqIEBwYXJhbSB7P1N0cmluZ30gbWVzc2FnZSBcblx0ICovXG5cdHNldEN1c3RvbVZhbGlkaXR5KG1lc3NhZ2UpIHtcblx0XHQvLyB1cGRhdGUgVmFsaWR5U3RhdGUgb2JqZWN0XG5cdFx0dGhpcy52YWxpZGl0eS5fY3VzdG9tRXJyb3IgPSBtZXNzYWdlO1xuXG5cdFx0aWYobWVzc2FnZSkge1x0XHRcdFxuXHRcdFx0Ly8gdXBkYXRlIGBhcmlhLWludmFsaWRgIHByb3BlcnR5IHRvIGludmFsaWRcblx0XHRcdHRoaXMuaW52YWxpZCA9IHRydWU7XG5cdFx0XHRcblx0XHRcdC8vIHVwZGF0ZSBlcnJvciBtZXNzYWdlXG5cdFx0XHR0aGlzLmVycm9ybWVzc2FnZS5lbGVtZW50LmlubmVySFRNTCA9IG1lc3NhZ2U7XG5cdFx0XHR0aGlzLmVycm9ybWVzc2FnZS5lbGVtZW50LmhpZGRlbiA9IGZhbHNlO1xuXHRcdH0gZWxzZSB7XHRcdFx0XG5cdFx0XHQvLyB1cGRhdGUgYGFyaWEtaW52YWxpZGAgcHJvcGVydHkgdG8gaW52YWxpZFxuXHRcdFx0dGhpcy5pbnZhbGlkID0gZmFsc2U7XG5cdFx0XHRcblx0XHRcdC8vIHVwZGF0ZSBlcnJvciBtZXNzYWdlXG5cdFx0XHR0aGlzLmVycm9ybWVzc2FnZS5lbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XG5cdFx0XHR0aGlzLmVycm9ybWVzc2FnZS5lbGVtZW50LmhpZGRlbiA9IHRydWU7XG5cdFx0fVxuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBWYWxpZGF0aW9uOyIsImltcG9ydCBtaXggZnJvbSBcIkB2ZXN0ZXJnYWFyZC1jb21wYW55L2pzLW1peGluXCI7XHJcbmltcG9ydCBDb21tYW5kIGZyb20gXCIuL2Fic3RyYWN0L0NvbW1hbmRcIjtcclxuaW1wb3J0IGJvb2xlYW4gZnJvbSBcIi4vLi4vdHlwZS9ib29sZWFuXCI7XHJcblxyXG5pbXBvcnQgQXJpYVByZXNzZWQgZnJvbSBcIi4uL2F0dHJpYnV0ZXMvYXJpYS1wcmVzc2VkLmpzXCI7XHJcbmltcG9ydCBBcmlhRXhwYW5kZWQgZnJvbSBcIi4uL2F0dHJpYnV0ZXMvYXJpYS1leHBhbmRlZFwiO1xyXG5cclxuZnVuY3Rpb24gY2xvc2UoKSB7XHJcblx0dGhpcy5leHBhbmRlZCA9IGJvb2xlYW4uSVNfTk9UX0FDVElWRTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVnaXN0ZXJFeHBhbmRlZChldikge1xyXG5cdGNvbnNvbGUubG9nKGV2KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBzdW1tYXJ5IEFuIGlucHV0IHRoYXQgYWxsb3dzIGZvciB1c2VyLXRyaWdnZXJlZCBhY3Rpb25zIHdoZW4gY2xpY2tlZCBvciBwcmVzc2VkLlxyXG4gKiBcclxuICogQGV4dGVuZHMgQ29tbWFuZFxyXG4gKiBAbWl4ZXMgQXJpYUV4cGFuZGVkXHJcbiAqIEBtaXhlcyBBcmlhUHJlc3NlZFxyXG4gKi9cclxuY2xhc3MgQnV0dG9uIGV4dGVuZHMgbWl4KENvbW1hbmQpLndpdGgoQXJpYUV4cGFuZGVkLCBBcmlhUHJlc3NlZCkge1xyXG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcclxuXHRcdHN1cGVyKC4uLmFyZ3MpO1xyXG5cclxuXHRcdHRoaXMuYWRkTGlzdGVuZXIoXHJcblx0XHRcdFwiYXR0cmlidXRlc1wiLFxyXG5cdFx0XHRyZWdpc3RlckV4cGFuZGVkLFxyXG5cdFx0XHR7IGF0dHJpYnV0ZTogXCJhcmlhLWV4cGFuZGVkXCIsIG9uY2U6IHRydWUgfVxyXG5cdFx0KTtcclxuXHJcblx0XHRpZiAodGhpcy5leHBhbmRlZCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY29udHJvbHMpIHsgLy8gdG9kbzogYWRkIHdoZW4gZmlyc3QgdGltZSBhcmlhLWV4cGFuZGVkIGlzIGJvb2xlYW5cclxuXHRcdFx0Y29uc29sZS5sb2codGhpcy5jb250cm9scy5sZW5ndGgpO1xyXG5cdFx0XHR0aGlzLmNvbnRyb2xzLmZvckVhY2goY29udHJvbCA9PiB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coY29udHJvbC5hZGRMaXN0ZW5lcik7XHJcblx0XHRcdFx0aWYgKGNvbnRyb2wuYWRkTGlzdGVuZXIpIGNvbnRyb2wuYWRkTGlzdGVuZXIoXCJjbG9zZVwiLCBjbG9zZS5iaW5kKHRoaXMpKVxyXG5cdFx0XHR9XHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRvbkV4cGFuZGVkKGV2KSB7XHJcblx0XHRpZiAodHlwZW9mIHN1cGVyLm9uRXhwYW5kZWQgPT0gXCJmdW5jdGlvblwiKSBzdXBlci5vbkV4cGFuZGVkKGV2KTtcclxuXHJcblx0XHRpZiAodGhpcy5kaXNhYmxlZCAhPT0gdHJ1ZSkge1xyXG5cdFx0XHRpZiAodGhpcy5leHBhbmRlZCkge1xyXG5cdFx0XHRcdHRoaXMuY29udHJvbHMuZm9yRWFjaChjb250cm9sID0+IHtcclxuXHRcdFx0XHRcdGNvbnRyb2wuZWxlbWVudC5oaWRkZW4gPSBmYWxzZTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmNvbnRyb2xzLmZvckVhY2goY29udHJvbCA9PiB7XHJcblx0XHRcdFx0XHRjb250cm9sLmVsZW1lbnQuaGlkZGVuID0gdHJ1ZTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cdFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdXR0b247IiwiaW1wb3J0IG1peCBmcm9tIFwiQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW5cIjtcbmltcG9ydCBJbnB1dCBmcm9tIFwiLi9hYnN0cmFjdC9JbnB1dFwiO1xuXG5pbXBvcnQgQXJpYUNoZWNrZWQgZnJvbSBcIi4uL2F0dHJpYnV0ZXMvYXJpYS1jaGVja2VkLmpzXCI7XG5cbi8qKlxuICogQHN1bW1hcnkgQSBjaGVja2FibGUgaW5wdXQgdGhhdCBoYXMgdGhyZWUgcG9zc2libGUgdmFsdWVzOiB0cnVlLCBmYWxzZSwgb3IgbWl4ZWQuXG4gKiBAZGVzY1xuICogIyMjIyBFeGFtcGxlXG4gKlxuICogPGRpdiByb2xlPVwiY2hlY2tib3hcIiBhcmlhLWNoZWNrZWQ9XCJ0cnVlXCIgdGFiaW5kZXg9XCIwXCI+PC9kaXY+XG4gKlxuICogYGBgaHRtbFxuICogPGRpdiByb2xlPVwiY2hlY2tib3hcIiBhcmlhLWNoZWNrZWQ9XCJ0cnVlXCIgdGFiaW5kZXg9XCIwXCI+PC9kaXY+XG4gKiBgYGBcbiAqIEBleHRlbmRzIElucHV0IFxuICogQG1peGVzIEFyaWFDaGVja2VkXG4gKi9cbmNsYXNzIENoZWNrYm94IGV4dGVuZHMgbWl4KElucHV0KS53aXRoKEFyaWFDaGVja2VkKSB7XG5cdC8qKlxuXHQgKiBAcGFyYW0geyp9IGFyZ3Ncblx0Ki9cblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdHN1cGVyKC4uLmFyZ3MpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENoZWNrYm94O1xuIiwiaW1wb3J0IGJvb2xlYW4gZnJvbSBcIi4vLi4vdHlwZS9ib29sZWFuXCI7XG5pbXBvcnQgU2VsZWN0IGZyb20gXCIuL2Fic3RyYWN0L1NlbGVjdFwiO1xuaW1wb3J0IHNlbGVjdG9yIGZyb20gXCIuLy4uL3V0aWxzL3NlbGVjdG9yXCI7XG5cbmZ1bmN0aW9uIGZpbHRlcihjYiwgdmFsdWUpIHtcblx0dmFyIHNlbGVjdGVkT3B0aW9ucyA9IFtdO1xuXG5cdGNiLm93bnMuZm9yRWFjaChsaXN0Ym94ID0+IHtcblx0XHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGxpc3Rib3guZWxlbWVudC5jaGlsZHJlbiwgb3B0aW9uID0+IHtcblx0XHRcdGlmKHZhbHVlID09PSBudWxsKSB7XG5cdFx0XHRcdG9wdGlvbi5oaWRkZW4gPSB0cnVlO1xuXHRcdFx0fSBlbHNlIGlmIChvcHRpb24uaW5uZXJIVE1MLmluZGV4T2YodmFsdWUpID09IDApIHtcblx0XHRcdFx0b3B0aW9uLmhpZGRlbiA9IGZhbHNlO1xuXHRcdFx0XHRpZihvcHRpb24uaW5uZXJIVE1MID09PSB2YWx1ZSkge1xuXHRcdFx0XHRcdHNlbGVjdGVkT3B0aW9ucy5wdXNoKG9wdGlvbik7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG9wdGlvbi5oaWRkZW4gPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcblxuXHRyZXR1cm4gc2VsZWN0ZWRPcHRpb25zO1xufVxuXG5mdW5jdGlvbiB0b2dnbGVMaXN0Ym94KGV2KSB7XG5cdGlmKGV2KSBldi5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdGlmICh0aGlzLmV4cGFuZGVkID09IGJvb2xlYW4uSVNfQUNUSVZFKSB7XG5cdFx0aGlkZUxpc3Rib3guY2FsbCh0aGlzKTtcblx0fSBlbHNlIHtcblx0XHRzaG93TGlzdGJveC5jYWxsKHRoaXMpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVZhbHVlKGV2KSB7XG5cdGlmKGV2KSBldi5wcmV2ZW50RGVmYXVsdCgpO1xuXHRjb25zb2xlLmxvZyh0aGlzLl8uY29tYm9ib3guaW5wdXQudmFsdWUsIGV2LnRhcmdldC5pbm5lckhUTUwsIHRoaXMuXywgZXYpO1xuXHR0aGlzLl8uY29tYm9ib3guaW5wdXQudmFsdWUgPSBldi50YXJnZXQuaW5uZXJIVE1MO1xuXG5cdGhpZGVMaXN0Ym94LmJpbmQodGhpcyk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpc3Rib3goKSB7IFxuXHR2YXIgb3B0aW9ucyA9IGZpbHRlcih0aGlzLCB0aGlzLl8uY29tYm9ib3guaW5wdXQudmFsdWUpO1xuXG5cdG9wdGlvbnMuZm9yRWFjaChpID0+IHtcblx0XHRpLnNlbGVjdGVkID0gdHJ1ZTtcblx0fSk7XG59XG5mdW5jdGlvbiBzaG93TGlzdGJveCgpIHtcblx0dGhpcy5leHBhbmRlZCA9IGJvb2xlYW4uSVNfQUNUSVZFO1xuXHR1cGRhdGVMaXN0Ym94LmNhbGwodGhpcyk7XG59XG5mdW5jdGlvbiBoaWRlTGlzdGJveCgpIHtcblx0dGhpcy5leHBhbmRlZCA9IGJvb2xlYW4uSVNfTk9UX0FDVElWRTtcblx0ZmlsdGVyKHRoaXMpO1xufVxuXG4vKipcbiAqIEBzdW1tYXJ5IEEgY29tcG9zaXRlIHdpZGdldCBjb250YWluaW5nIGEgc2luZ2xlLWxpbmUgdGV4dGJveCBhbmQgYW5vdGhlciBlbGVtZW50LCBcbiAqIHN1Y2ggYXMgYSBsaXN0Ym94IG9yIGdyaWQsIHRoYXQgY2FuIGR5bmFtaWNhbGx5IHBvcCB1cCB0byBoZWxwIHRoZSB1c2VyIHNldCB0aGUgdmFsdWUgb2YgdGhlIHRleHRib3guXG4gKiBAZGVzY1xuICogQSBjb21ib2JveCBpcyBhIHdpZGdldCBtYWRlIHVwIG9mIHRoZSBjb21iaW5hdGlvbiBvZiB0d28gZGlzdGluY3QgZWxlbWVudHM6IFxuICogXG4gKiAxLiBhIHNpbmdsZS1saW5lIHRleHRib3hcbiAqIDIuIGFuIGFzc29jaWF0ZWQgcG9wLXVwIGVsZW1lbnQgZm9yIGhlbHBpbmcgdXNlcnMgc2V0IHRoZSB2YWx1ZSBvZiB0aGUgdGV4dGJveC4gXG4gKiBcbiAqIFRoZSBwb3B1cCBtYXkgYmUgYSBsaXN0Ym94LCBncmlkLCB0cmVlLCBvciBkaWFsb2cuIE1hbnkgaW1wbGVtZW50YXRpb25zIGFsc28gaW5jbHVkZSBhIHRoaXJkIFxuICogb3B0aW9uYWwgZWxlbWVudCAtLSBhIGdyYXBoaWNhbCBidXR0b24gYWRqYWNlbnQgdG8gdGhlIHRleHRib3gsIGluZGljYXRpbmcgdGhlIGF2YWlsYWJpbGl0eSBvZlxuICogdGhlIHBvcHVwLiBBY3RpdmF0aW5nIHRoZSBidXR0b24gZGlzcGxheXMgdGhlIHBvcHVwIGlmIHN1Z2dlc3Rpb25zIGFyZSBhdmFpbGFibGUuXG4gKiBcbiAqIEBleHRlbmRzIFNlbGVjdFxuICogQHBhcmFtIHtFbGVtZW50fSBvcHRpb25zLmNvbWJvYm94LmlucHV0IFx0RGVmYXVsdHMgdG8gZmlyc3QgaW5wdXQgZWxlbWVudCBpbnNpZGUgdGhlIGVsZW1lbnRcbiAqIEBwYXJhbSB7RWxlbWVudH0gW29wdGlvbnMuY29tYm9ib3gub3Blbl1cdFxuICogXHRPcHRpb25hbCBidXR0b24gdG8gb3BlbiB0aGUgcG9wLXVwIGVsZW1lbnQsIFxuICogXHRkZWZhdWx0cyB0byBmaXJzdCBidXR0b24gZWxlbWVudCBpbnNpZGUgdGhlIGVsZW1lbnRcbiAqL1xuY2xhc3MgQ29tYm9ib3ggZXh0ZW5kcyBTZWxlY3Qge1xuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0c3VwZXIoLi4uYXJncyk7XG5cblx0XHQvLyByZWdpc3RlciBjdXN0b20gZWxlbWVudHNcblx0XHR0aGlzLl8ucmVnaXN0ZXJDdXN0b21FbGVtZW50KFwiY29tYm9ib3guaW5wdXRcIiwgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IuZ2V0RGVlcChcInRleHRib3hcIikpKTtcblx0XHR0aGlzLl8ucmVnaXN0ZXJDdXN0b21FbGVtZW50KFwiY29tYm9ib3gub3BlblwiLCB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvci5nZXREZWVwKFwiYnV0dG9uXCIpKSk7XG5cdFx0XG5cdFx0aWYgKHRoaXMuXy5jb21ib2JveC5vcGVuKSB7XG5cdFx0XHR0aGlzLl8uY29tYm9ib3gub3Blbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlTGlzdGJveC5iaW5kKHRoaXMpKTtcblx0XHR9XG5cdFx0XG5cdFx0dGhpcy5fLmNvbWJvYm94LmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCBzaG93TGlzdGJveC5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLl8uY29tYm9ib3guaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgaGlkZUxpc3Rib3guYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5fLmNvbWJvYm94LmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCB1cGRhdGVMaXN0Ym94LmJpbmQodGhpcykpO1xuXHRcdC8vIHRoaXMub3ducy5mb3JFYWNoKGkgPT4gaS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB1cGRhdGVWYWx1ZS5iaW5kKHRoaXMpKSk7XG5cblx0XHRpZih0aGlzLmF1dG9jb21wbGV0ZSA9PSBcImxpc3RcIikge1xuXHRcdFx0Ly8gSW5kaWNhdGVzIHRoYXQgdGhlIGF1dG9jb21wbGV0ZSBiZWhhdmlvciBvZiB0aGUgdGV4dCBpbnB1dCBpcyB0byBzdWdnZXN0IGEgbGlzdCBvZiBwb3NzaWJsZSB2YWx1ZXNcblx0XHRcdC8vIGluIGEgcG9wdXAgYW5kIHRoYXQgdGhlIHN1Z2dlc3Rpb25zIGFyZSByZWxhdGVkIHRvIHRoZSBzdHJpbmcgdGhhdCBpcyBwcmVzZW50IGluIHRoZSB0ZXh0Ym94LlxuXG5cdFx0fSBlbHNlIGlmICh0aGlzLmF1dG9jb21wbGV0ZSA9PSBcImJvdGhcIikge1xuXHRcdFx0Ly8gbmRpY2F0ZXMgdGhhdCB0aGUgYXV0b2NvbXBsZXRlIGJlaGF2aW9yIG9mIHRoZSB0ZXh0IGlucHV0IGlzIHRvIGJvdGggc2hvdyBhbiBpbmxpbmUgXG5cdFx0XHQvLyBjb21wbGV0aW9uIHN0cmluZyBhbmQgc3VnZ2VzdCBhIGxpc3Qgb2YgcG9zc2libGUgdmFsdWVzIGluIGEgcG9wdXAgd2hlcmUgdGhlIHN1Z2dlc3Rpb25zIFxuXHRcdFx0Ly8gYXJlIHJlbGF0ZWQgdG8gdGhlIHN0cmluZyB0aGF0IGlzIHByZXNlbnQgaW4gdGhlIHRleHRib3guXG5cdFx0fVxuXG5cdFx0LyoqIEB0b2RvIGRldGVybWluZSB3aGF0IHRvIGRvIHdpdGggZGVmYXVsdCB2YWx1ZXMgKi9cblx0XHRpZih0aGlzLmV4cGFuZGVkID09IHVuZGVmaW5lZCkgdGhpcy5leHBhbmRlZCA9IGZhbHNlO1xuXHRcdGlmICh0aGlzLmhhc1BvcHVwID09IHVuZGVmaW5lZCkgdGhpcy5oYXNQb3B1cCA9IFwibGlzdGJveFwiO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbWJvYm94OyIsImltcG9ydCBtaXggZnJvbSBcIkB2ZXN0ZXJnYWFyZC1jb21wYW55L2pzLW1peGluXCI7XHJcbmltcG9ydCBXaW5kb3cgZnJvbSBcIi4vYWJzdHJhY3QvV2luZG93XCI7XHJcbmNvbnN0IE1vdXNldHJhcCA9IHJlcXVpcmUoXCJtb3VzZXRyYXBcIik7XHJcblxyXG5pbXBvcnQgQXJpYUV4cGFuZGVkIGZyb20gXCIuLi9hdHRyaWJ1dGVzL2FyaWEtZXhwYW5kZWQuanNcIjtcclxuXHJcbmZ1bmN0aW9uIGZvY3VzKG5vZGUpIHtcclxuXHQvLyBnZXQgYWxsIGVsZW1lbnRzIHdpdGhpbiBnaXZlbiBlbGVtZW50XHJcblx0bGV0IGNoaWxkcmVuID0gbm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcIipcIik7XHJcblx0XHJcblx0Ly8gcmVtb3ZlIGFsbCBlbGVtZW50cyB3aG8gYXJlbid0IGFjY2Vzc2libGUgYnkgYSB0YWJcclxuXHRsZXQgZm9jdXNhYmxlTm9kZXMgPSBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwoY2hpbGRyZW4sIGkgPT4ge1xyXG5cdFx0cmV0dXJuIChpLnRhYkluZGV4ID4gLTEgfHwgaS5jb250ZW50RWRpdGFibGUgPT0gXCJ0cnVlXCIpXHJcblx0XHRcdCYmICFpLmRpc2FibGVkICYmIGkub2Zmc2V0V2lkdGggPiAwICYmIGkub2Zmc2V0SGVpZ2h0ID4gMDtcclxuXHR9KTtcclxuXHRcclxuXHQvLyBzb3J0IGVsZW1lbnRzIGluIGRlc2NlbmRpbmcgb3JkZXJcclxuXHRmb2N1c2FibGVOb2Rlcy5zb3J0KChhLCBiKSA9PiBhLnRhYkluZGV4ICsgYi50YWJJbmRleCk7XHJcblxyXG5cdC8vIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpO1xyXG5cdC8vIGZvY3VzYWJsZUVsLmZvY3VzKCk7XHJcblx0cmV0dXJuIGZvY3VzYWJsZU5vZGVzO1xyXG59XHJcblxyXG4vKipcclxuICogQHN1bW1hcnkgQSBjaGlsZCB3aW5kb3cgd2l0aGluIGEgd2VicGFnZVxyXG4gKlxyXG4gKiBAZGVzY1xyXG4gKiAqIFByb21wdHMgdGhlIHVzZXIgdG8gcGVyZm9ybSBhIHNwZWNpZmljIGFjdGlvblxyXG4gKiAqIElmIGl0IGlzIGRlc2lnbmVkIHRvIGludGVycnVwLCBpdCBpcyB1c3VhbGx5IGEgbW9kYWwuIFNlZSBbYWxlcnRkaWFsb2ddKClcclxuICogKiBJdCBzaG91bGQgaGF2ZSBhIGxhYmVsLCBpdCBjYW4gYmUgZG9uZSB3aXRoIHRoZSBgYXJpYS1sYWJlbGAgYXR0cmlidXRlXHJcbiAqICogSXQgc2hvdWxkIGhhdmUgYXQgbGVhc3Qgb25lIGZvY3VzYWJsZSBkZXNjZW5kYW50IGVsZW1lbnQuXHJcbiAqICogSXQgc2hvdWxkIGZvY3VzIGFuIGVsZW1lbnQgaW4gdGhlIG1vZGFsIHdoZW4gZGlzcGxheWVkLlxyXG4gKiAqIEl0IHNob3VsZCBtYW5hZ2UgZm9jdXMgb2YgbW9kYWwgZGlhbG9ncyAoa2VlcCB0aGUgZm9jdXMgaW5zaWRlIHRoZSBvcGVuIG1vZGFsKS5cclxuICpcclxuICogIyMjIyMgZXhhbXBsZVxyXG4gKlxyXG4gKiA8ZGl2IHJvbGU9XCJkaWFsb2dcIiBhcmlhLWxhYmVsPVwiV2luZG93IHRvIGNvbmZpcm0geW91ciBhY2NlcHRhbmNlIG9mIHRoaXMgd29ybGRcIj5cclxuICogIEhlbGxvIHdvcmxkIVxyXG4gKiBcdDxidXR0b24gZm9jdXMgdHlwZT1cImJ1dHRvblwiPk9rPC9idXR0b24+XHJcbiAqIDwvZGl2PlxyXG4gKiBAZXh0ZW5kcyBXaW5kb3dcclxuICovXHJcbmNsYXNzIERpYWxvZyBleHRlbmRzIG1peChXaW5kb3cpLndpdGgoQXJpYUV4cGFuZGVkKSB7XHJcblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xyXG5cdFx0c3VwZXIoLi4uYXJncyk7XHJcblxyXG5cdFx0Ly8gdGhpcy5lbGVtZW50Lm93bmVyRG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIHRoaXMuX29uRm9jdXMuYmluZCh0aGlzKSwgdHJ1ZSk7XHJcblx0XHQvLyB0aGlzLmVsZW1lbnQub3duZXJEb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCB0aGlzLl9vbkZvY3VzLmJpbmQodGhpcyksIHRydWUpO1xyXG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm9uQ2xvc2UuYmluZCh0aGlzKSwgeyBrZXk6IFwiZXNjXCIsIHRhcmdldDogdGhpcy5lbGVtZW50Lm93bmVyRG9jdW1lbnR9KTtcclxuXHJcblx0XHR2YXIgbiA9IGZvY3VzKGRvY3VtZW50KTtcclxuXHRcdHZhciBpID0gMDtcclxuXHRcdC8vIHZhciB0ID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG5cdFx0Ly8gXHRjb25zb2xlLmxvZyhNb3VzZXRyYXAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkudHJpZ2dlcihcInRhYlwiKSk7XHJcblx0XHQvLyBcdC8vIGxldCBpID0gbi5pbmRleE9mKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xyXG5cdFx0Ly8gXHRpZihpIDwgbi5sZW5ndGgpIHtcclxuXHRcdC8vIFx0XHR2YXIgZiA9IG5ldyBGb2N1c0V2ZW50KFwiZm9jdXNcIik7XHJcblx0XHQvLyBcdFx0bltpKytdLmRpc3BhdGNoRXZlbnQoZik7XHJcblx0XHQvLyBcdFx0Ly8gY29uc29sZS5sb2cobltpKytdLmZvY3VzKCkpO1xyXG5cdFx0Ly8gXHR9XHJcblx0XHQvLyB9LCAxMDAwKTtcclxuXHR9XHJcblxyXG5cdF9vbkZvY3VzKGV2KSB7XHJcblx0XHQvLyBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0bGV0IG4gPSBmb2N1cyh0aGlzLmVsZW1lbnQub3duZXJEb2N1bWVudCk7XHJcblx0XHRpZihuW24ubGVuZ3RoLTFdICE9IGV2LnRhcmdldCkge1xyXG5cdFx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR3aW5kb3cuZm9jdXMoKTtcclxuXHRcdH1cclxuXHRcdGNvbnNvbGUubG9nKGV2KTtcclxuXHR9XHJcblxyXG5cdG9uQ2xvc2UoZXYpIHtcclxuXHRcdGlmKGV2KSBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0dGhpcy5lbGVtZW50LmhpZGRlbiA9IHRydWU7XHJcblxyXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImNsb3NlXCIpKTtcclxuXHR9XHJcblxyXG5cdF9vbkhpZGRlbk11dGF0aW9uKGV2KSB7XHJcblx0XHRpZih0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiaGlkZGVuXCIpID09PSBcInRydWVcIikge1xyXG5cdFx0XHR2YXIgbiA9IGZvY3VzKHRoaXMuZWxlbWVudCk7XHJcblx0XHRcdG5bMF0uZm9jdXMoKTtcclxuXHRcdFx0Y29uc29sZS5sb2cobiwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCwgbiA9PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGlhbG9nOyIsImltcG9ydCBMYW5kbWFyayBmcm9tIFwiLi9hYnN0cmFjdC9MYW5kbWFya1wiO1xyXG5pbXBvcnQgc2VsZWN0b3IgZnJvbSBcIi4vLi4vdXRpbHMvc2VsZWN0b3JcIjtcclxuaW1wb3J0IGVsZW1lbnRzIGZyb20gXCIuLy4uL3V0aWxzL2VsZW1lbnRzXCI7XHJcbmltcG9ydCBjcmVhdGUgZnJvbSBcIi4vLi4vdXRpbHMvY3JlYXRlXCI7XHJcblxyXG5jbGFzcyBGb3JtIGV4dGVuZHMgTGFuZG1hcmsge1xyXG5cdGdldCBlbGVtZW50cygpIHtcclxuXHRcdC8vIGdldCBuYXRpdmUgZWxlbWVudHNcclxuXHRcdHZhciBzZWxlY3RvciA9IFtcImJ1dHRvblwiLCBcImZpZWxkc2V0XCIsIFwiaW5wdXRcIiwgXCJvYmplY3RcIiwgXCJvdXRwdXRcIiwgXCJzZWxlY3RcIiwgXCJ0ZXh0YXJlYVwiXS5qb2luKFwiOm5vdChbcm9sZV0pLFwiKTtcclxuXHRcdHZhciByZXMgPSBBcnJheS5mcm9tKHRoaXMuZWxlbWVudHMucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xyXG5cclxuXHRcdHZhciBleHBsaWNpdFJvbGUgPSBcIlwiO1xyXG5cdFx0ZXhwbGljaXRSb2xlICs9IHNlbGVjdG9yLmdldERlZXBSb2xlKFwiYnV0dG9uXCIpO1xyXG5cdFx0ZXhwbGljaXRSb2xlICs9IHNlbGVjdG9yLmdldERlZXBSb2xlKFwiaW5wdXRcIik7XHJcblx0XHRleHBsaWNpdFJvbGUgKz0gc2VsZWN0b3IuZ2V0RGVlcFJvbGUoXCJzdGF0dXNcIik7XHJcblx0XHRleHBsaWNpdFJvbGUgKz0gc2VsZWN0b3IuZ2V0RGVlcFJvbGUoXCJzZWxlY3RcIik7XHJcblxyXG5cdFx0QXJyYXkucHJvdG90eXBlLmZvckVhY2goXHJcblx0XHRcdHRoaXMuZWxlbWVudHMucXVlcnlTZWxlY3RvckFsbChleHBsaWNpdFJvbGUpLCBcclxuXHRcdFx0bm9kZSA9PiByZXMucHVzaChlbGVtZW50cy5nZXQobm9kZSkgfHwgY3JlYXRlLm9uZShub2RlKSlcclxuXHRcdCk7XHJcblx0XHRjb25zb2xlLmxvZyhyZXMsIGV4cGxpY2l0Um9sZSwgc2VsZWN0b3IpO1xyXG5cdFx0cmV0dXJuIHJlcztcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZvcm07IiwiaW1wb3J0IG1peCBmcm9tIFwiQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW5cIjtcclxuaW1wb3J0IENvbW1hbmQgZnJvbSBcIi4vYWJzdHJhY3QvQ29tbWFuZC5qc1wiO1xyXG5pbXBvcnQgYm9vbGVhbiBmcm9tIFwiLi8uLi90eXBlL2Jvb2xlYW5cIjtcclxuXHJcbmltcG9ydCBBcmlhRXhwYW5kZWQgZnJvbSBcIi4uL2F0dHJpYnV0ZXMvYXJpYS1leHBhbmRlZFwiO1xyXG5cclxuZnVuY3Rpb24gY2xvc2UoKSB7XHJcblx0dGhpcy5leHBhbmRlZCA9IGJvb2xlYW4uSVNfTk9UX0FDVElWRTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFuIGludGVyYWN0aXZlIHJlZmVyZW5jZSB0byBhbiBpbnRlcm5hbCBvciBleHRlcm5hbCByZXNvdXJjZSB0aGF0LFxyXG4gKiB3aGVuIGFjdGl2YXRlZCwgY2F1c2VzIHRoZSB1c2VyIGFnZW50IHRvIG5hdmlnYXRlIHRvIHRoYXQgcmVzb3VyY2UuXHJcbiAqIFxyXG4gKiBAZXh0ZW5kcyBDb21tYW5kXHJcbiAqIEBtaXhlcyBBcmlhRXhwYW5kZWRcclxuICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMubGluay5ocmVmICBVUkwgdGhhdCBzaG91bGQgYmUgdXNlZFxyXG4gKiBAbGlzdGVucyBjbGlja1xyXG4gKiBAZXhhbXBsZVxyXG4gKiA8ZGl2IHJvbGU9XCJsaW5rXCIgZGF0YS1saW5rLWhyZWY9XCJodHRwOi8vd3d3LmV4YW1wbGUuY29tL1wiIHRhYmluZGV4PVwiMFwiPlxyXG4gKiBcdE9wZW4gd2Vic2l0ZVxyXG4gKiA8L2Rpdj5cclxuICovXHJcbmNsYXNzIExpbmsgZXh0ZW5kcyBtaXgoQ29tbWFuZCkud2l0aChBcmlhRXhwYW5kZWQpIHtcclxuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XHJcblx0XHRzdXBlciguLi5hcmdzKTtcclxuXHJcblx0XHR0aGlzLl8ucmVnaXN0ZXJDdXN0b21WYWx1ZShcImxpbmsuaHJlZlwiKTtcclxuXHJcblx0XHRpZih0aGlzLl8ubGluay5ocmVmKSB7XHJcblx0XHRcdHRoaXMuYWRkTGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKSk7XHJcblx0XHRcdHRoaXMuYWRkTGlzdGVuZXIoXCJrZXlcIiwgdGhpcy5vbkNsaWNrLmJpbmQodGhpcyksIHsga2V5OiBcImVudGVyXCIgfSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcImV4cGFuZGVkXCIpXHJcblxyXG5cdFx0aWYgKHRoaXMuZXhwYW5kZWQgIT09IHVuZGVmaW5lZCkgeyAvLyB0b2RvOiBhZGQgd2hlbiBmaXJzdCB0aW1lIGFyaWEtZXhwYW5kZWQgaXMgYm9vbGVhblxyXG5cdFx0XHR0aGlzLmNvbnRyb2xzLmZvckVhY2goY29udHJvbCA9PiBjb250cm9sLmFkZExpc3RlbmVyKFwiY2xvc2VcIiwgY2xvc2UuYmluZCh0aGlzKSkpO1xyXG5cdFx0XHR0aGlzLmFkZExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vbkV4cGFuZGVkLmJpbmQodGhpcykpO1xyXG5cdFx0XHR0aGlzLmFkZExpc3RlbmVyKFwia2V5XCIsIHRoaXMub25FeHBhbmRlZC5iaW5kKHRoaXMpLCB7IGtleTogXCJlbnRlclwiIH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRmlyZWQgd2hlbiBzdGF0ZSBvZiBleHBhbmRlZCBpcyBjaGFuZ2VkIFxyXG5cdCAqIEBwYXJhbSB7RXZlbnR9IGV2IFxyXG5cdCAqL1xyXG5cdG9uRXhwYW5kZWQoZXYpIHtcclxuXHRcdGlmICh0eXBlb2Ygc3VwZXIub25FeHBhbmRlZCA9PSBcImZ1bmN0aW9uXCIpIHN1cGVyLm9uRXhwYW5kZWQoZXYpO1xyXG5cclxuXHRcdGlmICh0aGlzLmRpc2FibGVkICE9PSB0cnVlKSB7XHJcblx0XHRcdGlmICh0aGlzLmV4cGFuZGVkKSB7XHJcblx0XHRcdFx0dGhpcy5jb250cm9scy5mb3JFYWNoKGNvbnRyb2wgPT4ge1xyXG5cdFx0XHRcdFx0Y29udHJvbC5lbGVtZW50LmhpZGRlbiA9IGZhbHNlO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuY29udHJvbHMuZm9yRWFjaChjb250cm9sID0+IHtcclxuXHRcdFx0XHRcdGNvbnRyb2wuZWxlbWVudC5oaWRkZW4gPSB0cnVlO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBPcGVuIHRoZSB1cmwgdGhhdCBpcyBkZWZpbmVkIGluIHRoZSBvcHRpb25zLCAgXHJcblx0ICogZmlyZXMgYW4gY2xpY2sgZXZlbnQgb25seSBpZiBpdHMgb3JpZ2luIHdhc24ndCBhbiBjbGljayBldmVudFxyXG5cdCAqIEBwYXJhbSB7RXZlbnR9IGV2IFxyXG5cdCAqIEBmaXJlcyBsaW5rI2FjY2Vzc2libGVjbGlja1xyXG5cdCAqIEBmaXJlcyBjbGlja1xyXG5cdCAqL1xyXG5cdG9uQ2xpY2soZXYpIHtcclxuXHRcdGlmICh0eXBlb2Ygc3VwZXIub25DbGljayA9PSBcImZ1bmN0aW9uXCIpIHN1cGVyLm9uQ2xpY2soZXYpO1xyXG5cdFxyXG5cdFx0aWYodGhpcy5fLmxpbmsuaHJlZikge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcInNob3VsZCBvcGVuXCIsIHRoaXMuXy5saW5rLmhyZWYpO1xyXG5cdFx0XHQvLyB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHRoaXMuXy5saW5rLmhyZWY7XHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcbiAgICAgKiBBbiBjbGljayB0cmlnZ2VyZWQgYnkgYW4ga2V5Ym9hcmQgb3IgbW91c2VcclxuICAgICAqIEBldmVudCBMaW5rI2FjY2Vzc2libGVjbGlja1xyXG4gICAgICovXHJcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiYWNjZXNzaWJsZWNsaWNrXCIpKTtcclxuXHRcdGlmKGV2LnR5cGUgIT09IFwiY2xpY2tcIikge1xyXG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IE1vdXNlRXZlbnQoXCJjbGlja1wiKSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaW5rOyIsImltcG9ydCBmb2N1cyBmcm9tIFwiLi8uLi91dGlscy9tYW5hZ2luZ0ZvY3VzXCI7XHJcbmltcG9ydCBTZWxlY3QgZnJvbSBcIi4vYWJzdHJhY3QvU2VsZWN0XCI7XHJcblxyXG5leHBvcnQgY29uc3Qgb3B0aW9ucyA9IHtcclxuXHRyb2xlOiBcImxpc3Rib3hcIixcclxuXHRzZWxlY3RvcjogXCJbcm9sZT0nbGlzdGJveCddXCIsXHJcblx0c2VsZWN0b3JzV2l0aEltcGxpY2l0Um9sZTogW1xyXG5cdFx0XCJkYXRhbGlzdFwiLFxyXG5cdFx0XCJzZWxlY3RbbXVsdGlwbGVdLCBzZWxlY3Rbc2l6ZV06bm90KFtzaXplPScwJ10pOm5vdChbc2l6ZT0nMSddKVwiXHJcblx0XVxyXG59O1xyXG5cclxuLy8gZnVuY3Rpb24gY2xpY2tPbk9wdGlvbihldikge1xyXG4vLyBcdGlmKGV2KSBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuLy8gXHR2YXIgY2xpY2tlZCA9IHRoaXMub3B0aW9ucy5maW5kKGkgPT4gaS5lbGVtZW50ID09IGV2LnRhcmdldCk7XHJcbi8vIFx0aWYgKGNsaWNrZWQpIHtcclxuLy8gXHRcdGxldCBvbGQgPSBmb2N1cy5nZXQodGhpcy5vcHRpb25zKTtcclxuLy8gXHRcdGZvY3VzLnJlbW92ZShvbGQpO1xyXG4vLyBcdFx0Zm9jdXMuYWRkKGNsaWNrZWQpO1x0XHJcbi8vIFx0XHR1cGRhdGVTZWxlY3RlZCh0aGlzLCBjbGlja2VkKTtcclxuLy8gXHR9XHJcbi8vIH1cclxuXHJcbi8qKlxyXG4gKiBAc3VtbWFyeSBBIHdpZGdldCB0aGF0IGFsbG93cyB0aGUgdXNlciB0byBzZWxlY3Qgb25lIG9yIG1vcmUgaXRlbXMgZnJvbSBhIGxpc3Qgb2YgY2hvaWNlcy5cclxuICogQGRlc2NcclxuICogIyMjIEtleWJvYXJkIFN1cHBvcnRcclxuICpcclxuICogIyMjIyBEZWZhdWx0XHJcbiAqIHwgS2V5IHwgRnVuY3Rpb24gfFxyXG4gKiB8IC0tLSB8IC0tLS0tLS0tIHxcclxuICogfCBEb3duIEFycm93IHwgTW92ZXMgZm9jdXMgdG8gdGhlIG5leHQgb3B0aW9uIDxici8+IElmIG5vdCBtdWx0aXNlbGVjdGFibGUsIGl0IHNlbGVjdHMgdGhlIGZvY3VzZWQgb3B0aW9uLlxyXG4gKiB8IFVwIEFycm93IFx0fCBNb3ZlcyBmb2N1cyB0byB0aGUgcHJldmlvdXMgb3B0aW9uICA8YnIvPiBJZiBub3QgbXVsdGlzZWxlY3RhYmxlLCBpdCBzZWxlY3RzIHRoZSBmb2N1c2VkIG9wdGlvbi5cclxuICogfCBIb21lIFx0XHRcdHxcdE1vdmVzIGZvY3VzIHRvIHRoZSBmaXJzdCBvcHRpb24gIDxici8+IElmIG5vdCBtdWx0aXNlbGVjdGFibGUsIGl0IHNlbGVjdHMgdGhlIGZvY3VzZWQgb3B0aW9uLlxyXG4gKiB8IEVuZCAgXHRcdFx0fFx0TW92ZXMgZm9jdXMgdG8gdGhlIGxhc3Qgb3B0aW9uICA8YnIvPiBJZiBub3QgbXVsdGlzZWxlY3RhYmxlLCBpdCBzZWxlY3RzIHRoZSBmb2N1c2VkIG9wdGlvbi5cclxuICogXHJcbiAqICMjIyMgTXVsdGlwbGUgc2VsZWN0aW9uXHJcbiAqIHwgS2V5IHwgRnVuY3Rpb24gfFxyXG4gKiB8IC0tLSB8IC0tLS0tLS0tIHxcclxuICogfCBTcGFjZVx0XHRcdFx0XHRcdFx0XHRcdHwgQ2hhbmdlcyB0aGUgc2VsZWN0aW9uIHN0YXRlIG9mIHRoZSBmb2N1c2VkIG9wdGlvbi5cclxuICogfCBTaGlmdCArIERvd24gQXJyb3cgXHRcdHwgTW92ZXMgZm9jdXMgdG8gYW5kIHNlbGVjdHMgdGhlIG5leHQgb3B0aW9uLlxyXG4gKiB8IFNoaWZ0ICsgVXAgQXJyb3cgXHRcdFx0fCBNb3ZlcyBmb2N1cyB0byBhbmQgc2VsZWN0cyB0aGUgcHJldmlvdXMgb3B0aW9uLlxyXG4gKiB8IENvbnRyb2wgKyBTaGlmdCArIEhvbWUgfFx0U2VsZWN0cyBmcm9tIHRoZSBmb2N1c2VkIG9wdGlvbiB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBsaXN0LlxyXG4gKiB8IENvbnRyb2wgKyBTaGlmdCArIEVuZCAgfCBTZWxlY3RzIGZyb20gdGhlIGZvY3VzZWQgb3B0aW9uIHRvIHRoZSBlbmQgb2YgdGhlIGxpc3QuXHJcbiAqIHwgQ29udHJvbCArIEEgXHQgICAgICAgICAgfCBTZWxlY3RzIGFsbCBvcHRpb25zIGluIHRoZSBsaXN0LiBJZiBhbGwgb3B0aW9ucyBhcmUgc2VsZWN0ZWQsIHVuc2VsZWN0cyBhbGwgb3B0aW9ucy5cclxuICogXHJcbiAqIEBleHRlbmRzIFJvbGV0eXBlXHJcbiAqIEBmaXJlcyBMaXN0Ym94I2NoYW5nZVxyXG4gKiBAZmlyZXMgTGlzdGJveCNpbnB1dFxyXG4gKi9cclxuY2xhc3MgTGlzdGJveCBleHRlbmRzIFNlbGVjdCB7XHJcblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xyXG5cdFx0c3VwZXIoLi4uYXJncyk7XHJcblx0XHQvLyB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrT25PcHRpb24uYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0Ly8gdGhpcy5hZGRLZXlMaXN0ZW5lcihcImVudGVyXCIsIGNsaWNrT25PcHRpb24uYmluZCh0aGlzKSk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaXN0Ym94OyIsImltcG9ydCBib29sZWFuIGZyb20gXCIuLy4uL3R5cGUvYm9vbGVhblwiO1xyXG5pbXBvcnQgZ2V0QWN0aXZlIGZyb20gXCIuLy4uL3V0aWxzL2dldEFjdGl2ZVwiO1xyXG5pbXBvcnQgSW5wdXQgZnJvbSBcIi4vYWJzdHJhY3QvSW5wdXRcIjtcclxuXHJcbi8qKlxyXG4gKiBAZXh0ZW5kcyBJbnB1dFxyXG4gKi9cclxuY2xhc3MgT3B0aW9uIGV4dGVuZHMgSW5wdXQge1xyXG5cclxuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XHJcblx0XHRzdXBlciguLi5hcmdzKTtcclxuXHJcblx0XHR0aGlzLmFkZExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vbkNsaWNrLmJpbmQodGhpcykpO1xyXG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKSwge2tleTogXCJlbnRlclwiLCB0YXJnZXQ6IGRvY3VtZW50fSk7XHJcblx0XHR0aGlzLmFkZExpc3RlbmVyKFwia2V5XCIsIHRoaXMub25DbGljay5iaW5kKHRoaXMpLCB7a2V5OiBcInNwYWNlXCIsIHRhcmdldDogZG9jdW1lbnR9KTtcclxuXHRcdC8vIHRoaXMuYWRkS2V5TGlzdGVuZXIoXCJFbnRlclwiLCBzZWxlY3RJdGVtLmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0b25DbGljayhldikge1xyXG5cdFx0aWYodHlwZW9mIHN1cGVyLm9uQ2xpY2sgPT0gXCJmdW5jdGlvblwiKSBzdXBlci5vbkNsaWNrKGV2KTtcclxuXHRcdGlmKGV2KSBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdGlmICh0aGlzID09IGdldEFjdGl2ZSgpKSB7XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWQgPSBib29sZWFuLnRvZ2dsZSh0aGlzLnNlbGVjdGVkKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9wdGlvbjsiLCIvLyB2YXIgb2JqZWN0UGF0aCA9IHJlcXVpcmUoXCJvYmplY3QtcGF0aFwiKTtcbmltcG9ydCBSYW5nZSBmcm9tIFwiLi9hYnN0cmFjdC9SYW5nZS5qc1wiO1xuXG5mdW5jdGlvbiBjYWxjVmFsdWVPZlRyYWNrUG9zKHBvcywgdHJhY2ssIHRodW1iLCBtaW4sIG1heCwgc3RlcCwgb3JpZW50YXRpb24pIHtcblx0bGV0IHBvc2l0aW9uS2V5ID0gb3JpZW50YXRpb24gPT0gXCJ2ZXJ0aWNhbFwiID8gXCJ5XCIgOiBcInhcIjtcblx0bGV0IHJhbmdlID0gKG1heCAtIG1pbikgLyBzdGVwO1xuXHQvLyB0aGUgZnVsbCB1c2FibGUgbGVuZ3RoIG9mIHRoZSB0cmFja1xuXHRsZXQgdHJhY2tTaXplID0gZ2V0VHJhY2tTaXplKHRyYWNrLCB0aHVtYiwgb3JpZW50YXRpb24pO1xuXHQvLyBob3cgbWFueSBwaXhlbHMgIHNwYW4gZm9yIG9uZSBzdGVwIGNoYW5nZVxuXHRsZXQgcHhQZXJTdGVwID0gdHJhY2tTaXplIC8gcmFuZ2U7XG5cblx0Ly8gYm91bmRpbmcgYm94IG9mIHRoZSB0cmFja1xuXHR2YXIgdHJhY2tDb29yID0gdHJhY2suZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdC8vIG9mZnNldCB3aXRob3V0IHRyYWNrIGxpbWl0c1xuXHRsZXQgb2Zmc2V0ID0gcG9zIC0gdHJhY2tDb29yW3Bvc2l0aW9uS2V5XSAtIHRodW1iLmNsaWVudFdpZHRoIC8gMjtcblxuXHQvLyB1cGRhdGUgb2Zmc2V0IHRvIHRoZSB0cmFjayBsaW1pdHMgaWYgbmVlZGVkXG5cdGlmKG9mZnNldCA8IDApIHtcblx0XHRvZmZzZXQgPSAwO1xuXHR9IGVsc2UgaWYob2Zmc2V0ID4gdHJhY2tTaXplKXtcblx0XHRvZmZzZXQgPSB0cmFja1NpemU7XG5cdH1cblxuXHQvLyByb3VuZCB0aGUgdmFsdWUgdG8gbmVhcmVzdCBpbmNyZW1lbnRcblx0cmV0dXJuIE1hdGgucm91bmQob2Zmc2V0IC8gcHhQZXJTdGVwKSAqIHN0ZXAgKyBtaW47XG59XG5cbmZ1bmN0aW9uIGdldFRyYWNrU2l6ZSh0cmFjaywgdGh1bWIsIG9yaWVudGF0aW9uKSB7XG5cdGlmKG9yaWVudGF0aW9uID09IFwidmVydGljYWxcIikge1xuXHRcdHJldHVybiB0cmFjay5jbGllbnRIZWlnaHQgLSB0aHVtYi5jbGllbnRIZWlnaHQ7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIHRyYWNrLmNsaWVudFdpZHRoIC0gdGh1bWIuY2xpZW50V2lkdGg7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlUG9zaXRpb24odmFsdWUsIHRyYWNrLCB0aHVtYiwgbWluLCBtYXgsIG9yaWVudGF0aW9uKSB7XG5cdGxldCBzdHlsZUtleSA9IG9yaWVudGF0aW9uID09IFwidmVydGljYWxcIiA/IFwidG9wXCIgOiBcImxlZnRcIjtcblx0bGV0IHJhbmdlID0gbWF4IC0gbWluO1xuXHRsZXQgcHhQZXJTdGVwID0gZ2V0VHJhY2tTaXplKHRyYWNrLCB0aHVtYiwgb3JpZW50YXRpb24pIC8gcmFuZ2U7XG5cdHRodW1iLnN0eWxlW3N0eWxlS2V5XSA9IHB4UGVyU3RlcCAqICh2YWx1ZSAtIG1pbikgKyBcInB4XCI7XG59XG5cbi8qKlxuICogQHN1bW1hcnkgQSB1c2VyIGlucHV0IHdoZXJlIHRoZSB1c2VyIHNlbGVjdHMgYSB2YWx1ZSBmcm9tIHdpdGhpbiBhIGdpdmVuIHJhbmdlLlxuICogQGRlc2NcbiAqIGBzbGlkZXJgIGVsZW1lbnRzIGxldCB0aGUgdXNlciBzcGVjaWZ5IGEgbnVtZXJpYyB2YWx1ZSB3aGljaCBtdXN0IGJlIG5vIGxlc3NcbiAqIHRoYW4gYSBnaXZlbiB2YWx1ZSwgYW5kIG5vIG1vcmUgdGhhbiBhbm90aGVyIGdpdmVuIHZhbHVlLiBUaGUgcHJlY2lzZSB2YWx1ZSxcbiAqIGhvd2V2ZXIsIGlzIG5vdCBjb25zaWRlcmVkIGltcG9ydGFudC4gVGhpcyBpcyB0eXBpY2FsbHkgcmVwcmVzZW50ZWQgdXNpbmcgYVxuICogc2xpZGVyIG9yIGRpYWwgY29udHJvbCByYXRoZXIgdGhhbiBhIHRleHQgZW50cnkgYm94IGxpa2UgdGhlIFwibnVtYmVyXCIgaW5wdXRcbiAqIHR5cGUuIEJlY2F1c2UgdGhpcyBraW5kIG9mIHdpZGdldCBpcyBpbXByZWNpc2UsIGl0IHNob3VsZG4ndCB0eXBpY2FsbHkgYmVcbiAqIHVzZWQgdW5sZXNzIHRoZSBjb250cm9sJ3MgZXhhY3QgdmFsdWUgaXNuJ3QgaW1wb3J0YW50LlxuICpcbiAqIEBleHRlbmRzIFJhbmdlXG4gKlxuICogQGZpcmVzIGNoYW5nZVxuICogQGZpcmVzIGlucHV0XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBcdFx0XHRcdGVsZW1lbnQgdG8gZGVyaXZlIGluZm9ybWF0aW9uIG5hbWVGcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIFx0XHRcdFx0XHRcdG9wdGlvbmFsIG9wdGlvbnNcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFtvcHRpb25zLnNsaWRlci50cmFja11cbiAqIFx0VGhlIGVsZW1lbnQgdGhhdCByZXNlbWJsZXMgdGhlIHRyYWNrLCBkZWZhdWx0cyB0byB0aGUgZWxlbWVudHMgcGFyZW50XG4gKiBAcGFyYW0ge051bWJlcnxcImFueVwifSBbb3B0aW9ucy5zdGVwXSBcdGluY3JlYXNlL2RlY3JlYXNlIGFtb3VudFxuICogQHJldHVybiB7U2xpZGVyfSB0aGlzQXJnXG4gKlxuICogQHRvZG8gYWRkIHN1cHBvcnQgZm9yIFwiYW55XCJcbiAqIEB0b2RvIGFkZCBldmVudHNcbiAqL1xuY2xhc3MgU2xpZGVyIGV4dGVuZHMgUmFuZ2Uge1xuXHQvKipcblx0ICogIyMjIyBFeGFtcGxlc1xuXHQgKiBcblx0ICogPGRpdiBjbGFzcz1cInRyYWNrXCI+XG5cdCAqICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgcm9sZT1cInNsaWRlclwiIGFyaWEtbGFiZWw9XCJzbGlkZXJcIiAvPjxidXR0b24+XG5cdCAqIDwvZGl2PlxuXHQgKiBAcGFyYW0geyp9IGFyZ3MgXG5cdCAqL1xuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0c3VwZXIoLi4uYXJncyk7XG5cblx0XHQvLyByZWdpc3RlciBjdXN0b21zXG5cdFx0dGhpcy5fLnJlZ2lzdGVyQ3VzdG9tRWxlbWVudChcInNsaWRlci50cmFja1wiLCB0aGlzLmVsZW1lbnQucGFyZW50Tm9kZSk7XG5cdFx0dGhpcy5fLnJlZ2lzdGVyQ3VzdG9tVmFsdWUoXCJzdGVwXCIsIDEpO1xuXG5cdFx0Ly8gc2V0IGRlZmF1bHRzXG5cdFx0aWYobnVsbCA9PT0gdGhpcy5vcmllbnRhdGlvbikgdGhpcy5vcmllbnRhdGlvbiA9IFwiaG9yaXpvbnRhbFwiO1xuXHRcdGlmKG51bGwgPT09IHRoaXMudmFsdWVNaW4pIHtcblx0XHRcdC8qKlxuXHRcdFx0ICogQGRlZmF1bHQgWzBdXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMudmFsdWVNaW4gPSAwO1xuXHRcdH1cblx0XHRpZihudWxsID09PSB0aGlzLnZhbHVlTWF4KSB0aGlzLnZhbHVlTWF4ID0gMDtcblx0XHRpZihudWxsID09PSB0aGlzLnZhbHVlTm93ICYmIHRoaXMudmFsdWVNYXggPCB0aGlzLnZhbHVlTWluKSB7XG5cdFx0XHR0aGlzLnZhbHVlTm93ID0gdGhpcy52YWx1ZU1pbjtcblx0XHR9IGVsc2UgaWYobnVsbCA9PT0gdGhpcy52YWx1ZU5vdykge1xuXHRcdFx0dGhpcy52YWx1ZU5vdyA9IHRoaXMudmFsdWVNaW4gKyAodGhpcy52YWx1ZU1heCAtIHRoaXMudmFsdWVNaW4pLzI7XG5cdFx0fVxuXG5cdFx0dGhpcy5fdW5UcmFja01vdXNlQmluZGVkID0gdGhpcy5fdW5UcmFja01vdXNlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5fdW5UcmFja1RvdWNoQmluZGVkID0gdGhpcy5fdW5UcmFja1RvdWNoLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5fb25EcmFnID0gdGhpcy5vbkRyYWcuYmluZCh0aGlzKTtcblxuXHRcdC8vIHRvZG86IGFsbG93IGF1dG9tYXRpY2FsbHkgc2V0dGluZyB2YWx1ZVRleHQgd2l0aCBzb21lIHN1Z2FyXG5cblx0XHR0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLl9vbk1vdXNlRG93bi5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy5fb25Ub3VjaFN0YXJ0LmJpbmQodGhpcykpO1xuXHRcdHRoaXMuXy5zbGlkZXIudHJhY2suYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25UcmFja0NsaWNrLmJpbmQodGhpcykpO1xuXHRcdHRoaXMuYWRkS2V5TGlzdGVuZXIoXCJyaWdodFwiLCB0aGlzLnN0ZXBVcC5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLmFkZEtleUxpc3RlbmVyKFwidXBcIiwgdGhpcy5zdGVwVXAuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5hZGRLZXlMaXN0ZW5lcihcImxlZnRcIiwgdGhpcy5zdGVwRG93bi5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLmFkZEtleUxpc3RlbmVyKFwiZG93blwiLCB0aGlzLnN0ZXBEb3duLmJpbmQodGhpcykpO1xuXG5cdFx0dXBkYXRlUG9zaXRpb24odGhpcy52YWx1ZU5vdywgdGhpcy5fLnNsaWRlci50cmFjaywgdGhpcy5lbGVtZW50LCB0aGlzLnZhbHVlTWluLCB0aGlzLnZhbHVlTWF4LCB0aGlzLm9yaWVudGF0aW9uKTtcblx0fVxuXG5cdF9vbk1vdXNlRG93bigpIHtcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMuX29uRHJhZyk7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5fdW5UcmFja01vdXNlQmluZGVkKTtcblx0fVxuXHRfb25Ub3VjaFN0YXJ0KCkge1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgdGhpcy5fb25EcmFnKTtcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgdGhpcy5fdW5UcmFja1RvdWNoQmluZGVkKTtcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hjYW5jZWxcIiwgdGhpcy5fdW5UcmFja1RvdWNoQmluZGVkKTtcblx0fVxuXHRfdW5UcmFja01vdXNlKCkge1xuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5fb25EcmFnKTtcblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl91blRyYWNrTW91c2VCaW5kZWQpO1xuXHR9XG5cdF91blRyYWNrVG91Y2goKSB7XG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCB0aGlzLl9vbkRyYWcpO1xuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCB0aGlzLl91blRyYWNrTW91c2UpO1xuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGNhbmNlbFwiLCB0aGlzLl91blRyYWNrTW91c2VCaW5kZWQpO1xuXHR9XG5cblx0b25EcmFnKGV2KSB7XG5cdFx0ZXYucHJldmVudERlZmF1bHQoKTtcblx0XHRsZXQgcG9zO1xuXHRcdGxldCBwb3NpdGlvbktleSA9IHRoaXMub3JpZW50YXRpb24gPT0gXCJ2ZXJ0aWNhbFwiID8gXCJjbGllbnRZXCIgOiBcImNsaWVudFhcIjtcblx0XHRpZihldi5jaGFuZ2VkVG91Y2hlcykge1xuXHRcdFx0cG9zID0gZXYuY2hhbmdlZFRvdWNoZXNbMF1bcG9zaXRpb25LZXldO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwb3MgPSBldltwb3NpdGlvbktleV07XG5cdFx0fVxuXHRcdHRoaXMudmFsdWVOb3cgPSBjYWxjVmFsdWVPZlRyYWNrUG9zKFxuXHRcdFx0cG9zLCB0aGlzLl8uc2xpZGVyLnRyYWNrLCB0aGlzLmVsZW1lbnQsXG5cdFx0XHR0aGlzLnZhbHVlTWluLCB0aGlzLnZhbHVlTWF4LCB0aGlzLl8uc3RlcCwgdGhpcy5vcmllbnRhdGlvblxuXHRcdCk7XG5cdH1cblxuXHRvblRyYWNrQ2xpY2soZXYpIHtcblx0XHR0aGlzLm9uRHJhZyhldik7XG5cdH1cblxuXHRnZXQgdmFsdWVOb3coKSB7IHJldHVybiBzdXBlci52YWx1ZU5vdzsgfVxuXHRzZXQgdmFsdWVOb3codmFsKSB7XG5cdFx0aWYoIXRoaXMuZGlzYWJsZWQpIHtcblx0XHRcdHN1cGVyLnZhbHVlTm93ID0gdmFsO1xuXHRcdFx0dXBkYXRlUG9zaXRpb24odmFsLCB0aGlzLl8uc2xpZGVyLnRyYWNrLCB0aGlzLmVsZW1lbnQsIHRoaXMudmFsdWVNaW4sIHRoaXMudmFsdWVNYXgsIHRoaXMub3JpZW50YXRpb24pO1xuXHRcdH1cblx0fVxuXG5cdC8qIE5hdGl2ZSBwb2x5ZmlsbCAqL1xuXG5cdC8vIGF1dG9tYXRpYyBwb2x5ZmlsbGVkIGJ5IGF0dHJpYnV0ZXNcblx0Ly8gYXV0b2NvbXBsZXRlXG5cdC8vIGxpc3Rcblx0Ly8gbWluXG5cdC8vIG1heFxuXHQvLyBzdGVwID0+IGRhdGEtc3RlcFxuXHQvLyB2YWx1ZVxuXHQvLyB2YWx1ZUFzTnVtYmVyXG5cdC8vIHN0ZXBEb3duXG5cdC8vIHN0ZXBVcFxufVxuXG5leHBvcnQgZGVmYXVsdCBTbGlkZXI7IiwiaW1wb3J0IG1peCBmcm9tIFwiQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW5cIjtcclxuaW1wb3J0IFJhbmdlIGZyb20gXCIuL2Fic3RyYWN0L1JhbmdlXCI7XHJcblxyXG5leHBvcnQgY29uc3Qgb3B0aW9ucyA9IHtcclxuXHRzZWxlY3RvcjogXCJbcm9sZT0nc3BpbmJ1dHRvbiddXCIsXHJcblx0cm9sZTogXCJzcGluYnV0dG9uXCJcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBIGlucHV0IGZpZWxkIHdpdGggMiBidXR0b24gdG8gaW5jcmVhc2Ugb3IgZGVjcmVhc2UgdGhlIG51bWJlcmljYWwgdmFsdWVcclxuICogQGV4dGVuZHMgUmFuZ2VcclxuICpcclxuICogQHNlZSB7QGxpbmsgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvaW5wdXQuaHRtbCNudW1iZXItc3RhdGUtKHR5cGU9bnVtYmVyKX1cclxuICovXHJcbmNsYXNzIFNwaW5idXR0b24gZXh0ZW5kcyBSYW5nZSB7XHJcblx0Y29uc3RydWN0b3IoZWwsIG9wdGlvbnMpIHtcclxuXHRcdHN1cGVyKGVsLCBvcHRpb25zKTtcclxuXHJcblx0XHQvLyByZWdpc3RlciBjdXN0b20gZWxlbWVudHNcclxuXHRcdC8qKlxyXG5cdFx0KiBAbmFtZSBTcGluYnV0dG9uI19cclxuXHRcdCogQHR5cGUge09iamVjdH1cclxuXHRcdCogQHByb3Age0hUTUxFbGVtZW50fSBbc3BpbmJ1dHRvbi51cF1cclxuXHRcdCogQHByb3Age0hUTUxFbGVtZW50fSBbc3BpbmJ1dHRvbi5kb3duXVxyXG5cdFx0Ki9cclxuXHRcdHRoaXMuXy5yZWdpc3RlckN1c3RvbUVsZW1lbnQoXCJzcGluYnV0dG9uLnVwXCIpO1xyXG5cdFx0dGhpcy5fLnJlZ2lzdGVyQ3VzdG9tRWxlbWVudChcInNwaW5idXR0b24uZG93blwiKTtcclxuXHRcdHRoaXMuXy5yZWdpc3RlckN1c3RvbVZhbHVlKFwic3RlcFwiLCAxKTtcclxuXHJcblx0XHQvLyBzZXQgZGVmYXVsdHNcclxuXHRcdC8qKlxyXG5cdFx0KiBAbmFtZSBTcGluYnV0dG9uI3ZhbHVlTm93XHJcblx0XHQqIEB0eXBlIHtOdW1iZXJ9XHJcblx0XHQqIEBkZWZhdWx0IFswXVxyXG5cdFx0Ki9cclxuXHRcdGlmKG51bGwgPT09IHRoaXMudmFsdWVOb3cpIHRoaXMudmFsdWVOb3cgPSAwO1xyXG5cclxuXHRcdC8vIHRvZG86IGFsbG93IGF1dG9tYXRpY2FsbHkgc2V0dGluZyB2YWx1ZVRleHQgd2l0aCBzb21lIHN1Z2FyXHJcblxyXG5cdFx0aWYgKHRoaXMuXy5zcGluYnV0dG9uLmRvd24pIHRoaXMuXy5zcGluYnV0dG9uLnVwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnN0ZXBVcC5iaW5kKHRoaXMpKTtcclxuXHRcdGlmICh0aGlzLl8uc3BpbmJ1dHRvbi5kb3duKSB0aGlzLl8uc3BpbmJ1dHRvbi5kb3duLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnN0ZXBEb3duLmJpbmQodGhpcykpO1xyXG5cdFx0dGhpcy5hZGRLZXlMaXN0ZW5lcihcInVwXCIsIHRoaXMuc3RlcFVwLmJpbmQodGhpcykpO1xyXG5cdFx0dGhpcy5hZGRLZXlMaXN0ZW5lcihcImRvd25cIiwgdGhpcy5zdGVwRG93bi5iaW5kKHRoaXMpKTtcclxuXHRcdHRoaXMuZWxlbWVudC52YWx1ZSA9IHRoaXMudmFsdWVOb3c7XHJcblx0fVxyXG5cclxuXHRnZXQgdmFsdWVOb3coKSB7IHJldHVybiBzdXBlci52YWx1ZU5vdzsgfVxyXG5cdHNldCB2YWx1ZU5vdyh2YWwpIHtcclxuXHRcdHN1cGVyLnZhbHVlTm93ID0gdmFsO1xyXG5cdFx0dGhpcy5lbGVtZW50LnZhbHVlID0gdmFsO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3BpbmJ1dHRvbjsiLCJpbXBvcnQgQ2hlY2tib3ggZnJvbSBcIi4vQ2hlY2tib3hcIjtcblxuLyoqXG4gKiBBIHR5cGUgb2YgY2hlY2tib3ggdGhhdCByZXByZXNlbnRzIG9uL29mZiB2YWx1ZXMsIGFzIG9wcG9zZWQgdG8gY2hlY2tlZC91bmNoZWNrZWQgdmFsdWVzLlxuICogQGV4dGVuZHMgQ2hlY2tib3ggXG4gKi9cbmNsYXNzIFN3aXRjaCBleHRlbmRzIENoZWNrYm94IHtcblx0LyoqXG5cdCAqICMjIyMgRXhhbXBsZVxuXHQgKiBcblx0ICogKipEZWZhdWx0Kipcblx0ICogXG5cdCAqIDxkaXYgcm9sZT1cInN3aXRjaFwiIHRhYmluZGV4PVwiMFwiPjwvZGl2PlxuXHQgKiBcblx0ICogYGBgaHRtbFxuXHQgKiA8ZGl2IHJvbGU9XCJzd2l0Y2hcIiB0YWJpbmRleD1cIjBcIj48L2Rpdj5cblx0ICogYGBgXG5cdCAqIFxuXHQgKiAqKldpdGggcHJlZGVmaW5lZCB2YWx1ZSoqXG5cdCAqIFxuXHQgKiA8ZGl2IHJvbGU9XCJzd2l0Y2hcIiBhcmlhLWNoZWNrZWQ9XCJ0cnVlXCIgdGFiaW5kZXg9XCIwXCI+PC9kaXY+XG5cdCAqIFxuXHQgKiBgYGBodG1sXG5cdCAqIDxkaXYgcm9sZT1cInN3aXRjaFwiIGFyaWEtY2hlY2tlZD1cInRydWVcIiB0YWJpbmRleD1cIjBcIj48L2Rpdj5cblx0ICogYGBgXG5cdCAqIEBwYXJhbSB7Kn0gYXJnc1xuXHQqL1xuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0c3VwZXIoLi4uYXJncyk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3dpdGNoO1xuIiwiaW1wb3J0IG1peCBmcm9tIFwiQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW5cIjtcblxuaW1wb3J0IGVsZW1lbnRzIGZyb20gXCIuLy4uL3V0aWxzL2VsZW1lbnRzXCI7XG5pbXBvcnQgc2VsZWN0b3IgZnJvbSBcIi4vLi4vdXRpbHMvc2VsZWN0b3JcIjtcbmltcG9ydCByb2xlcyBmcm9tIFwiLi8uLi9kYXRhL3JvbGVzXCI7XG5cbmltcG9ydCBSb2xldHlwZSBmcm9tIFwiLi9hYnN0cmFjdC9Sb2xldHlwZVwiO1xuXG5pbXBvcnQgQXJpYVNlbGVjdGVkIGZyb20gXCIuLy4uL2F0dHJpYnV0ZXMvYXJpYS1zZWxlY3RlZFwiO1xuXG5jbGFzcyBUYWIgZXh0ZW5kcyBtaXgoUm9sZXR5cGUpLndpdGgoQXJpYVNlbGVjdGVkKSB7XG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRzdXBlciguLi5hcmdzKTtcblx0fVxuXG5cdG9uU2VsZWN0KGV2KSB7XG5cdFx0Ly8gZ2V0cyB0aGUgc2VsZWN0b3IgZm9yIGZpbmRpbmcgaXQncyBjb250ZXh0IGVsZW1lbnQgKHRhYmxpc3QgPiB0YWIpIFxuXHRcdHZhciBjb250ZXh0U2VsZWN0b3IgPSByb2xlcy50YWIuY29udGV4dC5tYXAoc3RyID0+IHNlbGVjdG9yLmdldFJvbGUoc3RyKSkuam9pbihcIiwgXCIpO1xuXHRcdGxldCB0YWJsaXN0ID0gZWxlbWVudHMuZ2V0UGFyZW50KHRoaXMsIGNvbnRleHRTZWxlY3Rvcik7XG5cdFx0aWYoIXRhYmxpc3QpIHJldHVybiBmYWxzZTtcblx0XHRcblx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFxuXHRcdGxldCB0YWJzID0gdGFibGlzdC5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwob3B0aW9ucy5zZWxlY3RvciArIFwiW2FyaWEtc2VsZWN0ZWQ9J3RydWUnXVwiKTtcblx0XHRbXS5mb3JFYWNoLmNhbGwodGFicywgKGl0ZW0pID0+IHtcblx0XHRcdGxldCBpbnN0ID0gZWxlbWVudHMuZ2V0KGl0ZW0pO1xuXHRcdFx0aW5zdC5zZWxlY3RlZCA9IGZhbHNlO1xuXHRcdFx0aW5zdC5jb250cm9sc1swXS5lbGVtZW50LmhpZGRlbiA9IHRydWU7XG5cdFx0fSk7XG5cblx0XHRpZiAodHlwZW9mIHN1cGVyLm9uU2VsZWN0ID09IFwiZnVuY3Rpb25cIikgc3VwZXIub25TZWxlY3QoZXYpO1xuXHRcdFxuXHRcdHRoaXMuY29udHJvbHNbMF0uZWxlbWVudC5oaWRkZW4gPSBmYWxzZTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBUYWI7IiwiaW1wb3J0IGVsZW1lbnRzIGZyb20gXCIuLy4uL3V0aWxzL2VsZW1lbnRzLmpzXCI7XHJcbmltcG9ydCBDb21wb3NpdGUgZnJvbSBcIi4vYWJzdHJhY3QvQ29tcG9zaXRlXCI7XHJcblxyXG5jbGFzcyBUYWJsaXN0IGV4dGVuZHMgQ29tcG9zaXRlIHtcclxuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XHJcblx0XHRzdXBlciguLi5hcmdzKTtcclxuXHJcblx0XHR0aGlzLmFkZEtleUxpc3RlbmVyKFwibGVmdFwiLCB0aGlzLm1vdmVUb1ByZXYuYmluZCh0aGlzKSk7XHJcblx0XHR0aGlzLmFkZEtleUxpc3RlbmVyKFwicmlnaHRcIiwgdGhpcy5tb3ZlVG9OZXh0LmJpbmQodGhpcykpO1xyXG5cdFx0dGhpcy5hZGRLZXlMaXN0ZW5lcihcImhvbWVcIiwgdGhpcy5tb3ZlVG9TdGFydC5iaW5kKHRoaXMpKTtcclxuXHRcdHRoaXMuYWRkS2V5TGlzdGVuZXIoXCJlbmRcIiwgdGhpcy5tb3ZlVG9FbmQuYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHRtb3ZlVG9QcmV2KGV2KSB7XHJcblx0XHRsZXQgcHJldkluc3RhbmNlID0gZWxlbWVudHMuZ2V0UHJldihlbGVtZW50cy5nZXQoZXYudGFyZ2V0KSwgdGhpcywgb3B0aW9ucy5vd25zKTtcclxuXHRcdHByZXZJbnN0YW5jZS5lbGVtZW50LmZvY3VzKCk7XHJcblx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdH1cclxuXHRtb3ZlVG9OZXh0KGV2KSB7XHJcblx0XHRsZXQgbmV4dEluc3RhbmNlID0gZWxlbWVudHMuZ2V0TmV4dChlbGVtZW50cy5nZXQoZXYudGFyZ2V0KSwgdGhpcywgb3B0aW9ucy5vd25zKTtcclxuXHRcdG5leHRJbnN0YW5jZS5lbGVtZW50LmZvY3VzKCk7XHJcblx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdH1cclxuXHJcblx0bW92ZVRvU3RhcnQoZXYpIHtcclxuXHRcdGxldCBmaXJzdEluc3RhbmNlID0gZWxlbWVudHMuZ2V0U3RhcnQoZWxlbWVudHMuZ2V0KGV2LnRhcmdldCksIHRoaXMsIG9wdGlvbnMub3ducyk7XHJcblx0XHRmaXJzdEluc3RhbmNlLmVsZW1lbnQuZm9jdXMoKTtcclxuXHRcdGV2LnByZXZlbnREZWZhdWx0KCk7XHJcblx0fVxyXG5cclxuXHRtb3ZlVG9FbmQoZXYpIHtcclxuXHRcdGxldCBsYXN0SW5zdGFuY2UgPSBlbGVtZW50cy5nZXRFbmQoZWxlbWVudHMuZ2V0KGV2LnRhcmdldCksIHRoaXMsIG9wdGlvbnMub3ducyk7XHJcblx0XHRsYXN0SW5zdGFuY2UuZWxlbWVudC5mb2N1cygpO1xyXG5cdFx0ZXYucHJldmVudERlZmF1bHQoKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRhYmxpc3Q7IiwiaW1wb3J0IFNlY3Rpb24gZnJvbSBcIi4vYWJzdHJhY3QvU2VjdGlvblwiO1xyXG5cclxuY2xhc3MgVGFicGFuZWwgZXh0ZW5kcyBTZWN0aW9uIHsgfVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGFicGFuZWw7IiwiaW1wb3J0IG1peCBmcm9tIFwiQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW5cIjtcblxuaW1wb3J0IElucHV0IGZyb20gXCIuL2Fic3RyYWN0L0lucHV0XCI7XG5pbXBvcnQgU2VsZWN0aW9uIGZyb20gXCIuLy4uL21peGlucy9TZWxlY3Rpb25cIjtcblxuLyoqXG4gKiAjIyMgRXhhbXBsZXNcbiAqXG4gKiAjIyMjIEJhc2ljIGV4YW1wbGVcbiAqICAgXG4gKiA8ZGl2IHJvbGU9J3RleHRib3gnIGNvbnRlbnRlZGl0YWJsZT48L2Rpdj5cbiAqIFxuICogYGBgaHRtbFxuICogPGRpdiByb2xlPSd0ZXh0Ym94JyBjb250ZW50ZWRpdGFibGU+PC9kaXY+XG4gKiBgYGBcbiAqIFxuICogLS0tXG4gKiBcbiAqICMjIyMgTXVsdGlsaW5lIGV4YW1wbGVcbiAqIFxuICogPGRpdiByb2xlPSd0ZXh0Ym94JyBjb250ZW50ZWRpdGFibGU+PC9kaXY+XG4gKiBcbiAqIGBgYGh0bWxcbiAqIDxkaXYgcm9sZT0ndGV4dGJveCcgY29udGVudGVkaXRhYmxlPjwvZGl2PlxuICogYGBgXG4gKiBcbiAqIEBzdW1tYXJ5IEEgdHlwZSBvZiBpbnB1dCB0aGF0IGFsbG93cyBmcmVlLWZvcm0gdGV4dCBhcyBpdHMgdmFsdWUuXG4gKiBAZXh0ZW5kcyBJbnB1dFxuICogQG1peGVzIFNlbGVjdGlvblxuICogQHRvZG8gQWRkIG9wdGlvbnMgdG8ga2VlcCBvciByZW1vdmUgcGFzdGVkIHN0eWxpbmdcbiAqL1xuY2xhc3MgVGV4dGJveCBleHRlbmRzIG1peChJbnB1dCkud2l0aChTZWxlY3Rpb24pIHtcblxuXHQvKipcblx0ICogQHBhcmFtIHsqfSBhcmdzXG5cdCAqL1xuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0c3VwZXIoLi4uYXJncyk7XG5cblx0XHR0aGlzLl8ucmVnaXN0ZXJDdXN0b21WYWx1ZShcInRleHRib3gubWlubGVuZ3RoXCIpO1xuXHRcdHRoaXMuXy5yZWdpc3RlckN1c3RvbVZhbHVlKFwidGV4dGJveC5tYXhsZW5ndGhcIik7XG5cdFx0dGhpcy5fLnJlZ2lzdGVyQ3VzdG9tVmFsdWUoXCJ0ZXh0Ym94LnNpemVcIik7XG5cdFx0XG5cdFx0aWYoIXRoaXMubXVsdGlsaW5lKSB7XG5cdFx0XHR0aGlzLmFkZEtleUxpc3RlbmVyKFwiZW50ZXJcIiwgdGhpcy5fb25FbnRlci5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwicGFzdGVcIiwgdGhpcy5fb25QYXN0ZS5iaW5kKHRoaXMpKTtcblx0XHRcdC8vIHRoaXMuYWRkTXV0YXRpb25MaXN0ZW5lcigpXG5cdFx0fVxuXHR9XG5cblx0X29uRW50ZXIoZXYpIHtcblx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xuXHR9XG5cblx0X29uUGFzdGUoZXYpIHtcblx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGxldCBzdHI7XG5cdFx0bGV0IGRhdGEgPSBldi5jbGlwYm9hcmREYXRhLmdldERhdGEoXCJ0ZXh0L3BsYWluXCIpLnJlcGxhY2UoL1xccj9cXG58XFxyL2csIFwiXCIpO1xuXHRcdGxldCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG5cblx0XHR2YXIgYyA9IHRoaXMuZWxlbWVudC5jaGlsZE5vZGVzO1xuXHRcdHZhciBhID0gc2VsLmFuY2hvck5vZGU7XG5cblx0XHRpZiAoYyAmJiBhICYmIEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoYywgYSkgPiAtMSkge1xuXHRcdFx0c3RyID0gW3RoaXMuZWxlbWVudC5pbm5lclRleHQuc2xpY2UoMCwgc2VsLmFuY2hvck9mZnNldCksIGRhdGEsIHRoaXMuZWxlbWVudC5pbm5lclRleHQuc2xpY2Uoc2VsLmZvY3VzT2Zmc2V0KV07XG5cdFx0XHRzdHIgPSBzdHIuam9pbihcIlwiKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3RyID0gdGhpcy5lbGVtZW50LmlubmVyVGV4dCArIGRhdGE7XG5cdFx0fVxuXG5cdFx0dGhpcy5lbGVtZW50LmlubmVyVGV4dCA9IHN0cjtcblx0fVxuXG5cdF9vbkNoaWxkTGlzdE11dGF0aW9uKG11dGF0aW9uKSB7XG5cdFx0aWYgKCF0aGlzLm11bHRpbGluZSkge1xuXHRcdFx0QXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChtdXRhdGlvbi5hZGRlZE5vZGVzLCBuID0+IHtcblx0XHRcdFx0aWYgKG4ubm9kZU5hbWUgIT09IFwiI3RleHRcIikge1xuXHRcdFx0XHRcdHZhciBuZXdDaGlsZCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG4uaW5uZXJUZXh0KTtcblx0XHRcdFx0XHRuLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld0NoaWxkLCBuKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0LyogTmF0aXZlIHBvbHlmaWxsICAqL1xuXHRcblx0Ly8gYXV0b2NvbXBsZXRlXG5cdC8vIGRpcm5hbWVcblx0Ly8gbGlzdFxuXHQvLyBtYXhsZW5ndGhcblx0Ly8gbWlubGVuZ3RoXG5cdC8vIHBhdHRlcm5cblx0Ly8gcGxhY2Vob2xkZXJcblx0Ly8gcmVhZG9ubHlcblx0Ly8gcmVxdWlyZWRcblx0Ly8gc2l6ZVxuXHQvLyB2YWx1ZVxuXHQvLyBsaXN0XG5cdC8vIHNlbGVjdGlvbiBhcGlcblxuXHQvLyBuYW1lXHRzdHJpbmc6IFJldHVybnMgLyBTZXRzIHRoZSBlbGVtZW50J3MgbmFtZSBhdHRyaWJ1dGUsIGNvbnRhaW5pbmcgYSBuYW1lIHRoYXQgaWRlbnRpZmllcyB0aGUgZWxlbWVudCB3aGVuIHN1Ym1pdHRpbmcgdGhlIGZvcm0uXG5cdC8vIHR5cGUgc3RyaW5nOiBSZXR1cm5zIC8gU2V0cyB0aGUgZWxlbWVudCdzIHR5cGUgYXR0cmlidXRlLCBpbmRpY2F0aW5nIHRoZSB0eXBlIG9mIGNvbnRyb2wgdG8gZGlzcGxheS4gU2VlIHR5cGUgYXR0cmlidXRlIG9mIDxpbnB1dD4gZm9yIHBvc3NpYmxlIHZhbHVlcy5cblx0Ly8gYXV0b2ZvY3VzXHRib29sZWFuOiBSZXR1cm5zIC8gU2V0cyB0aGUgZWxlbWVudCdzIGF1dG9mb2N1cyBhdHRyaWJ1dGUsIHdoaWNoIHNwZWNpZmllcyB0aGF0IGEgZm9ybSBjb250cm9sIHNob3VsZCBoYXZlIGlucHV0IGZvY3VzIHdoZW4gdGhlIHBhZ2UgbG9hZHMsIHVubGVzcyB0aGUgdXNlciBvdmVycmlkZXMgaXQsIGZvciBleGFtcGxlIGJ5IHR5cGluZyBpbiBhIGRpZmZlcmVudCBjb250cm9sLiBPbmx5IG9uZSBmb3JtIGVsZW1lbnQgaW4gYSBkb2N1bWVudCBjYW4gaGF2ZSB0aGUgYXV0b2ZvY3VzIGF0dHJpYnV0ZS4gSXQgY2Fubm90IGJlIGFwcGxpZWQgaWYgdGhlIHR5cGUgYXR0cmlidXRlIGlzIHNldCB0byBoaWRkZW4gKHRoYXQgaXMsIHlvdSBjYW5ub3QgYXV0b21hdGljYWxseSBzZXQgZm9jdXMgdG8gYSBoaWRkZW4gY29udHJvbCkuXG5cdFxuXHQvKipcblx0ICogUmV0dXJucyAvIFNldHMgdGhlIGN1cnJlbnQgdmFsdWUgb2YgdGhlIHRleHRib3guXG5cdCAqIEB0eXBlIHtTdHJpbmd9XG5cdCAqL1xuXHRnZXQgdmFsdWUoKSB7IHJldHVybiB0aGlzLmVsZW1lbnQuaW5uZXJUZXh0OyB9XG5cdHNldCB2YWx1ZShzdHIpIHsgdGhpcy5lbGVtZW50LmlubmVyVGV4dCA9IHN0cjsgfVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIC8gU2V0cyB0aGUgbWlubXVtIGxlbmd0aCBvZiBjaGFyYWN0ZXJzXG5cdCAqIEB0eXBlIHtJbnRlZ2VyfVxuXHQgKi9cblx0Z2V0IG1pbkxlbmd0aCgpIHsgcmV0dXJuIHRoaXMuXy50ZXh0Ym94Lm1pbmxlbmd0aDsgfVxuXHRzZXQgbWluTGVuZ3RoKG51bSkgeyB0aGlzLl8udGV4dGJveC5taW5sZW5ndGggPSBudW07IH1cblxuXHQvKipcblx0ICogUmV0dXJucyAvIFNldHMgdGhlIG1heGltdW0gbGVuZ3RoIG9mIGNoYXJhY3RlcnNcblx0ICogQHR5cGUge0ludGVnZXJ9XG5cdCAqL1xuXHRnZXQgbWF4TGVuZ3RoKCkgeyByZXR1cm4gdGhpcy5fLnRleHRib3gubWF4bGVuZ3RoOyB9XG5cdHNldCBtYXhMZW5ndGgobnVtKSB7IHRoaXMuXy50ZXh0Ym94Lm1heGxlbmd0aCA9IG51bTsgfVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIC8gU2V0cyB0aGUgc2l6ZSBvZiBjb250cm9sLlxuXHQgKiBAdHlwZSB7SW50ZWdlcn1cblx0ICovXG5cdGdldCBzaXplKCkgeyByZXR1cm4gdGhpcy5fLnRleHRib3guc2l6ZTsgfVxuXHRzZXQgc2l6ZSh2YWwpIHtcblx0XHR0aGlzLmVsZW1lbnQuc3R5bGUud2lkdGggPSAyLjE2ICsgMC40OCAqIHZhbCArIFwiZW1cIjtcblx0XHR0aGlzLl8udGV4dGJveC5zaXplID0gdmFsO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRleHRib3g7IiwiaW1wb3J0IFdpZGdldCBmcm9tIFwiLi9XaWRnZXRcIjtcclxuXHJcbi8qKlxyXG4gKiBAZXh0ZW5kcyBXaWRnZXRcclxuICogQGFic3RyYWN0XHJcbiAqL1xyXG5jbGFzcyBDb21tYW5kIGV4dGVuZHMgV2lkZ2V0IHt9XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb21tYW5kOyIsImltcG9ydCBXaWRnZXQgZnJvbSBcIi4vV2lkZ2V0XCI7XHJcblxyXG4vKipcclxuICogQGV4dGVuZHMgV2lkZ2V0XHJcbiAqIEBhYnN0cmFjdFxyXG4gKi9cclxuY2xhc3MgQ29tcG9zaXRlIGV4dGVuZHMgV2lkZ2V0IHsgfVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29tcG9zaXRlOyIsImltcG9ydCBtaXggZnJvbSBcIkB2ZXN0ZXJnYWFyZC1jb21wYW55L2pzLW1peGluXCI7XG5cbmltcG9ydCBzZWxlY3RvciBmcm9tIFwiLi8uLi8uLi91dGlscy9zZWxlY3RvclwiO1xuaW1wb3J0IGVsZW1lbnRzIGZyb20gXCIuLy4uLy4uL3V0aWxzL2VsZW1lbnRzXCI7XG5cbmltcG9ydCBXaWRnZXQgZnJvbSBcIi4vV2lkZ2V0XCI7XG5pbXBvcnQgVmFsaWRhdGlvbiBmcm9tIFwiLi8uLi8uLi9taXhpbnMvVmFsaWRhdGlvblwiO1xuXG4vKipcbiAqIEBleHRlbmRzIFdpZGdldFxuICogQG1peGVzIFZhbGlkYXRpb25cbiAqIEBhYnN0cmFjdFxuICovXG5jbGFzcyBJbnB1dCBleHRlbmRzIG1peChXaWRnZXQpLndpdGgoVmFsaWRhdGlvbikge1xuXHQvKipcblx0ICogQGFsaWFzIElucHV0OmNvbnN0cnVjdG9yXG4gXHQgKiBAcGFyYW0ge1JlZ2V4fSBbb3B0aW9ucy5pbnB1dC5wYXR0ZXJuXSBSZWdleCB0byBjaGVjayBhZ2FpbnN0IHdoZW4gdmFsaWRhdGluZ1xuXHQgKi9cblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdHN1cGVyKC4uLmFyZ3MpO1xuXG5cdFx0dGhpcy5fLnJlZ2lzdGVyQ3VzdG9tRWxlbWVudChcImlucHV0LnBhdHRlcm5cIik7XG5cdH1cblxuXHQvKiBQb2x5ZmlsbCBvZiBuYXRpdmUgcHJvcGVydGllcyAqL1xuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoZSBwYXJlbnQgZm9ybSBlbGVtZW50XG5cdCAqIEByZXR1cm5zIHtBY2Nlc3NpYmxlTm9kZX0ge0BsaW5rIEZvcm19XG5cdCAqL1xuXHRnZXQgZm9ybSgpIHtcblx0XHRyZXR1cm4gZWxlbWVudHMuZ2V0UGFyZW50KHRoaXMsIHNlbGVjdG9yLmdldERlZXAoXCJmb3JtXCIpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBmaXJzdCBlbGVtZW50IHBvaW50ZWQgYnkgdGhlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNjb250cm9sc30gcHJvcGVydHkuXG5cdCAqIFRoZSBwcm9wZXJ0eSBtYXkgYmUgbnVsbCBpZiBubyBIVE1MIGVsZW1lbnQgZm91bmQgaW4gdGhlIHNhbWUgdHJlZS5cblx0ICogQHJldHVybnMge0FjY2Vzc2libGVOb2RlfSB7QGxpbmsgTGlzdGJveH1cblx0ICovXG5cdGdldCBsaXN0KCkge1xuXHRcdHJldHVybiB0aGlzLmNvbnRyb2xzLmZpbmQoYXkgPT4gYXkuZWxlbWVudC5tYXRjaGVzKHNlbGVjdG9yLmdldChcImxpc3Rib3hcIikpKTtcblx0fVxuXG5cdC8vIGZvcm1BY3Rpb25cdHN0cmluZzogUmV0dXJucyAvIFNldHMgdGhlIGVsZW1lbnQncyBmb3JtYWN0aW9uIGF0dHJpYnV0ZSxjb250YWluaW5nIHRoZSBVUkkgb2YgYVxuXHQvLyBwcm9ncmFtIHRoYXQgcHJvY2Vzc2VzIGluZm9ybWF0aW9uIHN1Ym1pdHRlZCBieSB0aGUgZWxlbWVudC4gVGhpcyBvdmVycmlkZXMgdGhlIGFjdGlvbiBhdHRyaWJ1dGVcblx0Ly8gb2YgdGhlIHBhcmVudCBmb3JtLlxuXG5cdC8vIGZvcm1FbmNUeXBlXHRzdHJpbmc6IFJldHVybnMgLyBTZXRzIHRoZSBlbGVtZW50J3MgZm9ybWVuY3R5cGUgYXR0cmlidXRlLCBjb250YWluaW5nIHRoZSB0eXBlIG9mXG5cdC8vIGNvbnRlbnQgdGhhdCBpcyB1c2VkIHRvIHN1Ym1pdCB0aGUgZm9ybSB0byB0aGUgc2VydmVyLiBUaGlzIG92ZXJyaWRlcyB0aGUgZW5jdHlwZSBhdHRyaWJ1dGUgb2YgXG5cdC8vIHRoZSBwYXJlbnQgZm9ybS5cblx0XG5cdC8vIGZvcm1NZXRob2RcdHN0cmluZzogUmV0dXJucyAvIFNldHMgdGhlIGVsZW1lbnQncyBmb3JtbWV0aG9kIGF0dHJpYnV0ZSwgY29udGFpbmluZyB0aGUgSFRUUCBtZXRob2Rcblx0Ly8gdGhhdCB0aGUgYnJvd3NlciB1c2VzIHRvIHN1Ym1pdCB0aGUgZm9ybS4gVGhpcyBvdmVycmlkZXMgdGhlIG1ldGhvZCBhdHRyaWJ1dGUgb2YgdGhlIHBhcmVudCBmb3JtLlxuXG5cdC8vIGZvcm1Ob1ZhbGlkYXRlXHRib29sZWFuOiBSZXR1cm5zIC8gU2V0cyB0aGUgZWxlbWVudCdzIGZvcm1ub3ZhbGlkYXRlIGF0dHJpYnV0ZSwgaW5kaWNhdGluZyB0aGF0XG5cdC8vIHRoZSBmb3JtIGlzIG5vdCB0byBiZSB2YWxpZGF0ZWQgd2hlbiBpdCBpcyBzdWJtaXR0ZWQuIFRoaXMgb3ZlcnJpZGVzIHRoZSBub3ZhbGlkYXRlIGF0dHJpYnV0ZVxuXHQvLyBvZiB0aGUgcGFyZW50IGZvcm0uXG5cblx0Ly8gZm9ybVRhcmdldFx0c3RyaW5nOiBSZXR1cm5zIC8gU2V0cyB0aGUgZWxlbWVudCdzIGZvcm10YXJnZXQgYXR0cmlidXRlLCBjb250YWluaW5nIGEgbmFtZSBvclxuXHQvLyBrZXl3b3JkIGluZGljYXRpbmcgd2hlcmUgdG8gZGlzcGxheSB0aGUgcmVzcG9uc2UgdGhhdCBpcyByZWNlaXZlZCBhZnRlciBzdWJtaXR0aW5nIHRoZSBmb3JtLlxuXHQvLyBUaGlzIG92ZXJyaWRlcyB0aGUgdGFyZ2V0IGF0dHJpYnV0ZSBvZiB0aGUgcGFyZW50IGZvcm0uXG59XG5cbmV4cG9ydCBkZWZhdWx0IElucHV0O1xuIiwiaW1wb3J0IFNlY3Rpb24gZnJvbSBcIi4vU2VjdGlvblwiO1xyXG5cclxuLyoqXHJcbiAqIEBleHRlbmRzIFNlY3Rpb25cclxuICovXHJcbmNsYXNzIExhbmRtYXJrIGV4dGVuZHMgU2VjdGlvbiB7IH1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExhbmRtYXJrOyIsImltcG9ydCBXaWRnZXQgZnJvbSBcIi4vV2lkZ2V0XCI7XG5cbi8qKlxuICogKiooQWJzdHJhY3Qgcm9sZSkgU0hPVUxEIE5PVCBVU0VEIElOIFRIRSBET00qKiBcbiAqIEFuIGlucHV0IHJlcHJlc2VudGluZyBhIHJhbmdlIG9mIHZhbHVlcyB0aGF0IGNhbiBiZSBzZXQgYnkgdGhlIHVzZXIuXG4gKlxuICogQGNsYXNzXG4gKiBAZXh0ZW5kcyBXaWRnZXRcbiAqIEByZXR1cm4ge1JhbmdlfSB0aGlzXG4gKiBAc2VlIHtAbGluayBodHRwczovL3czYy5naXRodWIuaW8vYXJpYS9hcmlhL2FyaWEuaHRtbCNyYW5nZX1cbiAqL1xuY2xhc3MgUmFuZ2UgZXh0ZW5kcyBXaWRnZXQge1xuXHQvKipcblx0ICogQGFsaWFzIG1vZHVsZTpSYW5nZS1jb25zdFxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFx0XHRcdFx0ZWxlbWVudCB0byBkZXJpdmUgaW5mb3JtYXRpb24gbmFtZUZyb21cblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBcdFx0XHRcdFx0XHRvcHRpb25hbCBvcHRpb25zXG4gXHQgKiBAcGFyYW0ge051bWJlcnxcImFueVwifSBvcHRpb25zLnN0ZXAgXHRpbmNyZWFzZS9kZWNyZWFzZSB2YWx1ZSB1c2VkXG5cdCAqL1xuXHRjb25zdHJ1Y3RvciguLi5hcmcpIHtcblx0XHRzdXBlciguLi5hcmcpO1xuXG5cdFx0LyoqXG5cdCAgICogQG5hbWUgUmFuZ2UjX1xuXHRcdCAqIEB0eXBlIHtPYmplY3R9XG5cdFx0ICogQHByb3Age051bWJlcn0gW3N0ZXA9MV1cblx0ICAgKi9cblxuXHRcdHRoaXMuXy5yZWdpc3RlckN1c3RvbVZhbHVlKFwic3RlcFwiLCAxKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBQYXNzdHJvdWdoIG9mIGFuIHN0cmluZ2lmaWVkIGB2YWx1ZU5vd2Bcblx0ICogQHR5cGUge1N0cmluZ31cblx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjdmFsdWVOb3d9XG5cdCAqL1xuXHRnZXQgdmFsdWUoKSB7IHJldHVybiB0aGlzLnZhbHVlTm93LnRvU3RyaW5nKCk7fVxuXHRzZXQgdmFsdWUodmFsKSB7IHRoaXMudmFsdWVOb3cgPSB2YWw7IH1cblxuXHQvKipcblx0ICogUHJveHkgb2YgdGhlIGB2YWx1ZU5vd2AgdmFsdWVcblx0ICogQHR5cGUge051bWJlcn1cblx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjdmFsdWVOb3d9XG5cdCAqL1xuXHRnZXQgdmFsdWVBc051bWJlcigpIHsgcmV0dXJuIHRoaXMudmFsdWVOb3c7IH1cblx0c2V0IHZhbHVlQXNOdW1iZXIodmFsKSB7IHRoaXMudmFsdWVOb3cgPSB2YWw7IH1cblxuXHQvKipcbiAgICogRGVjcmVhc2UgdGhlIHZhbHVlIHdpdGggdGhlIGFtb3VudCBvZiAxIHN0ZXBcbiAgICogQHBhcmFtICB7RXZlbnR9IGV2IEV2ZW50IHdoZW4gdHJpZ2dlcmVkIHRocm91Z2ggYW4gZWxlbWVudHNcbiAgICovXG5cdHN0ZXBEb3duKGV2KSB7XG5cdFx0aWYodGhpcy5kaXNhYmxlZCkgcmV0dXJuO1xuXHRcdGlmKGV2KSBldi5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0aWYodGhpcy52YWx1ZU1pbiA9PT0gbnVsbCB8fCB0aGlzLnZhbHVlTm93ID4gdGhpcy52YWx1ZU1pbikge1xuXHRcdFx0dGhpcy52YWx1ZU5vdyA9IHRoaXMudmFsdWVOb3cgLSB0aGlzLl8uc3RlcDtcblx0XHR9XG5cdH1cblxuXHQvKipcbiAgICogSW5jcmVhc2UgdGhlIHZhbHVlIHdpdGggdGhlIGFtb3VudCBvZiAxIHN0ZXBcbiAgICogQHBhY2thZ2VcbiAgICogQHBhcmFtICB7RXZlbnR9IGV2IEV2ZW50IHdoZW4gdHJpZ2dlcmVkIHRocm91Z2ggYW4gZWxlbWVudHNcbiAgICovXG5cdHN0ZXBVcChldikge1xuXHRcdGlmKHRoaXMuZGlzYWJsZWQpIHJldHVybjtcblx0XHRpZihldikgZXYucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGlmKHRoaXMudmFsdWVNYXggPT09IG51bGwgfHwgdGhpcy52YWx1ZU5vdyA8IHRoaXMudmFsdWVNYXgpIHtcblx0XHRcdHRoaXMudmFsdWVOb3cgPSB0aGlzLnZhbHVlTm93ICsgdGhpcy5fLnN0ZXA7XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJhbmdlOyIsImltcG9ydCBBY2Nlc3NpYmxlTm9kZSBmcm9tIFwiLi8uLi8uLi90eXBlL0FjY2Vzc2libGVOb2RlXCI7XHJcblxyXG4vKipcclxuICogQGV4dGVuZHMgQWNjZXNzaWJsZU5vZGVcclxuICovXHJcbmNsYXNzIFJvbGV0eXBlIGV4dGVuZHMgQWNjZXNzaWJsZU5vZGUge1xyXG5cclxuXHQvKipcclxuXHQgKiBAZXh0ZW5kcyBBY2Nlc3NpYmxlTm9kZVxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcclxuXHRcdHN1cGVyKC4uLmFyZ3MpO1xyXG5cclxuXHRcdHRoaXMuX29uQXJpYURpc2FibGVkTXV0YXRpb24oKTtcclxuXHR9XHJcblxyXG5cdF9vbkFyaWFEaXNhYmxlZE11dGF0aW9uKCkge1xyXG5cdFx0Ly8gY29uc29sZS5sb2codGhpcy5kaXNhYmxlZCwgdGhpcy50YWJJbmRleCwgdGhpcy5kaXNhYmxlZCAmJiB0aGlzLnRhYkluZGV4ICYmIHRoaXMudGFiSW5kZXggPj0gMCk7XHJcblx0XHRpZih0aGlzLmRpc2FibGVkICYmIHRoaXMudGFiSW5kZXggPj0gMCkge1xyXG5cdFx0XHR0aGlzLnRhYkluZGV4ID0gdW5kZWZpbmVkO1xyXG5cdFx0fSBlbHNlIGlmKCF0aGlzLmRpc2FibGVkICYmIHRoaXMudGFiSW5kZXggPCAwKSB7XHJcblx0XHRcdHRoaXMudGFiSW5kZXggPSAwO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUm9sZXR5cGU7IiwiaW1wb3J0IFN0cnVjdHVyZSBmcm9tIFwiLi9TdHJ1Y3R1cmVcIjtcclxuXHJcbi8qKlxyXG4gKiBAZXh0ZW5kcyBTdHJ1Y3R1cmVcclxuICovXHJcbmNsYXNzIFNlY3Rpb24gZXh0ZW5kcyBTdHJ1Y3R1cmUgeyB9XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZWN0aW9uOyIsImltcG9ydCBmYyBmcm9tIFwiLi8uLi8uLi91dGlscy9tYW5hZ2luZ0ZvY3VzXCI7XHJcbmltcG9ydCBib29sZWFuIGZyb20gXCIuLy4uLy4uL3R5cGUvYm9vbGVhblwiO1xyXG5pbXBvcnQgZWxlbWVudHMgZnJvbSBcIi4vLi4vLi4vdXRpbHMvZWxlbWVudHNcIjtcclxuXHJcbmltcG9ydCBSb2xldHlwZSBmcm9tIFwiLi9Sb2xldHlwZVwiO1xyXG5pbXBvcnQgT3B0aW9uIGZyb20gXCIuLy4uL09wdGlvbi5qc1wiO1xyXG5pbXBvcnQgbWl4IGZyb20gXCJAdmVzdGVyZ2FhcmQtY29tcGFueS9qcy1taXhpblwiO1xyXG5pbXBvcnQgc2VsZWN0b3IgZnJvbSBcIi4vLi4vLi4vdXRpbHMvc2VsZWN0b3JcIjtcclxuXHJcbi8qKlxyXG4gKiAjIyMgS2V5Ym9hcmQgU3VwcG9ydFxyXG4gKlxyXG4gKiAjIyMjIERlZmF1bHRcclxuICogfCBLZXkgfCBGdW5jdGlvbiB8XHJcbiAqIHwgLS0tIHwgLS0tLS0tLS0gfFxyXG4gKiB8IERvd24gQXJyb3cgfCBNb3ZlcyBmb2N1cyB0byB0aGUgbmV4dCBvcHRpb24gPGJyLz4gSWYgbm90IG11bHRpc2VsZWN0YWJsZSwgaXQgc2VsZWN0cyB0aGUgZm9jdXNlZCBvcHRpb24uXHJcbiAqIHwgVXAgQXJyb3cgXHR8IE1vdmVzIGZvY3VzIHRvIHRoZSBwcmV2aW91cyBvcHRpb24gIDxici8+IElmIG5vdCBtdWx0aXNlbGVjdGFibGUsIGl0IHNlbGVjdHMgdGhlIGZvY3VzZWQgb3B0aW9uLlxyXG4gKiB8IEhvbWUgXHRcdFx0fFx0TW92ZXMgZm9jdXMgdG8gdGhlIGZpcnN0IG9wdGlvbiAgPGJyLz4gSWYgbm90IG11bHRpc2VsZWN0YWJsZSwgaXQgc2VsZWN0cyB0aGUgZm9jdXNlZCBvcHRpb24uXHJcbiAqIHwgRW5kICBcdFx0XHR8XHRNb3ZlcyBmb2N1cyB0byB0aGUgbGFzdCBvcHRpb24gIDxici8+IElmIG5vdCBtdWx0aXNlbGVjdGFibGUsIGl0IHNlbGVjdHMgdGhlIGZvY3VzZWQgb3B0aW9uLlxyXG4gKlxyXG4gKiAjIyMjIE11bHRpcGxlIHNlbGVjdGlvblxyXG4gKiB8IEtleSB8IEZ1bmN0aW9uIHxcclxuICogfCAtLS0gfCAtLS0tLS0tLSB8XHJcbiAqIHwgU3BhY2VcdFx0XHRcdFx0XHRcdFx0XHR8IENoYW5nZXMgdGhlIHNlbGVjdGlvbiBzdGF0ZSBvZiB0aGUgZm9jdXNlZCBvcHRpb24uXHJcbiAqIHwgU2hpZnQgKyBEb3duIEFycm93IFx0XHR8IE1vdmVzIGZvY3VzIHRvIGFuZCBzZWxlY3RzIHRoZSBuZXh0IG9wdGlvbi5cclxuICogfCBTaGlmdCArIFVwIEFycm93IFx0XHRcdHwgTW92ZXMgZm9jdXMgdG8gYW5kIHNlbGVjdHMgdGhlIHByZXZpb3VzIG9wdGlvbi5cclxuICogfCBDb250cm9sICsgU2hpZnQgKyBIb21lIHxcdFNlbGVjdHMgZnJvbSB0aGUgZm9jdXNlZCBvcHRpb24gdG8gdGhlIGJlZ2lubmluZyBvZiB0aGUgbGlzdC5cclxuICogfCBDb250cm9sICsgU2hpZnQgKyBFbmQgIHwgU2VsZWN0cyBmcm9tIHRoZSBmb2N1c2VkIG9wdGlvbiB0byB0aGUgZW5kIG9mIHRoZSBsaXN0LlxyXG4gKiB8IENvbnRyb2wgKyBBIFx0ICAgICAgICAgIHwgU2VsZWN0cyBhbGwgb3B0aW9ucyBpbiB0aGUgbGlzdC4gSWYgYWxsIG9wdGlvbnMgYXJlIHNlbGVjdGVkLCB1bnNlbGVjdHMgYWxsIG9wdGlvbnMuXHJcbiAqXHJcbiAqICMjIyBBdHRyaWJ1dGVzXHJcbiAqICogYGFyaWEtc2VsZWN0ZWRgXHJcbiAqIFx0KiBgdHJ1ZWBcclxuICogXHRcdCogaXMgdGhlIGN1cnJlbnQgZm9jdXNzZWQgZWxlbWVudFxyXG4gKiBcdFx0KiBlcXVhbHMgdGhlIHZhbHVlIG9mIGBhcmlhLWFjdGl2ZWRlc2NlbmRhbnRgXHJcbiAqICogYHRhYmluZGV4YFxyXG4gKiBcdCogYWxsb3dzIHVzYWdlIG9mIHRoZSBlbGVtZW50IGJ5IGtleXMgd2hlbiBpbiBmb2N1c1xyXG4gKiAqIGBhcmlhLWFjdGl2ZWRlc2NlbmRhbnRgIGVxdWFscyBJRCBvZiBjdXJyZW50IGZvY3Vzc2VkIGVsZW1lbnRcclxuICogXHJcbiAqICMjIyMgTXVsdGlwbGUgc2VsZWN0aW9uXHJcbiAqICogYGFyaWEtc2VsZWN0ZWRgXHJcbiAqICAqIGB0cnVlYFxyXG4gKiBcdFx0KiBjYW4gYmUgYXBwbGllZCB0byBtdWx0aXBsZSBlbGVtZW50XHJcbiAqICAgICogbm90IGF1dG9tYXRpY2FsbHkgYXBwbGllZCB0byB0aGUgZm9jdXNlZCBlbGVtZW50XHJcbiAqIFx0KiBgZmFsc2VgXHJcbiAqICogYHRhYmluZGV4YFxyXG4gKiBcdCogYWxsb3dzIHVzYWdlIG9mIHRoZSBlbGVtZW50IGJ5IGtleXMgd2hlbiBpbiBmb2N1c1xyXG4gKiBcclxuICogQHN1bW1hcnkgQSBmb3JtIHdpZGdldCB0aGF0IGFsbG93cyB0aGUgdXNlciB0byBtYWtlIHNlbGVjdGlvbnMgZnJvbSBhIHNldCBvZiBjaG9pY2VzLlxyXG4gKiBAZXh0ZW5kcyBSb2xldHlwZVxyXG4gKi9cclxuY2xhc3MgU2VsZWN0IGV4dGVuZHMgUm9sZXR5cGUge1xyXG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcclxuXHRcdHN1cGVyKC4uLmFyZ3MpO1xyXG5cclxuXHRcdC8vIHVzZWQgZm9yIGRldGVybWluaW5nIGlmIGxvZ2ljIHNob3VsZCBiZSBleGVjdXRlZFxyXG5cdFx0dGhpcy50YXJnZXQgPSBmYWxzZTtcclxuXHRcdFxyXG5cdFx0Ly8gd2hlbiBpbiBmb2N1cywgYWxsb3cgdGhlIGVsZW1lbnQgYmUgY29udHJvbGxlZCBieSB0aGUga2V5c1xyXG5cdFx0aWYodHlwZW9mIHRoaXMudGFiSW5kZXggIT09IFwidW5kZWZpbmVkXCIpIHtcclxuXHRcdFx0dGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCBoYXNUYXJnZXQuYmluZCh0aGlzKSk7XHJcblx0XHRcdHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCBsb3N0VGFyZ2V0LmJpbmQodGhpcykpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuYWRkTGlzdGVuZXIoXCJrZXlcIiwgdGhpcy5tb3ZlVG9TdGFydC5iaW5kKHRoaXMpLCB7a2V5OiBcImhvbWVcIiwgdGFyZ2V0OiB0aGlzLmVsZW1lbnQub3duZXJEb2N1bWVudH0pO1xyXG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm1vdmVUb1ByZXYuYmluZCh0aGlzKSwge2tleTogXCJ1cFwiLCB0YXJnZXQ6IHRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50fSk7XHJcblx0XHR0aGlzLmFkZExpc3RlbmVyKFwia2V5XCIsIHRoaXMubW92ZVRvTmV4dC5iaW5kKHRoaXMpLCB7a2V5OiBcImRvd25cIiwgdGFyZ2V0OiB0aGlzLmVsZW1lbnQub3duZXJEb2N1bWVudH0pO1xyXG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm1vdmVUb0VuZC5iaW5kKHRoaXMpLCB7a2V5OiBcImVuZFwiLCB0YXJnZXQ6IHRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50fSk7XHJcblxyXG5cdFx0Ly8gdGhpcy5hZGRMaXN0ZW5lci5jYWxsKHsgZWxlbWVudDogdGhpcy5lbGVtZW50Lm93bmVyRG9jdW1lbnQgfSwgXCJob21lXCIsIHRoaXMubW92ZVRvU3RhcnQuYmluZCh0aGlzKSk7XHJcblx0XHQvLyB0aGlzLmFkZExpc3RlbmVyLmNhbGwoeyBlbGVtZW50OiB0aGlzLmVsZW1lbnQub3duZXJEb2N1bWVudCB9LCBcInVwXCIsIHRoaXMubW92ZVRvUHJldi5iaW5kKHRoaXMpKTtcclxuXHRcdC8vIC8vIHRoaXMuYWRkTGlzdGVuZXIuY2FsbCh7IGVsZW1lbnQ6IHRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50IH0sIFwic2hpZnQgKyB1cFwiLCB0aGlzLm1vdmVUb05leHQuYmluZCh0aGlzKSk7XHJcblx0XHQvLyB0aGlzLmFkZExpc3RlbmVyLmNhbGwoeyBlbGVtZW50OiB0aGlzLmVsZW1lbnQub3duZXJEb2N1bWVudCB9LCBcImRvd25cIiwgdGhpcy5tb3ZlVG9OZXh0LmJpbmQodGhpcykpO1xyXG5cdFx0Ly8gLy8gdGhpcy5hZGRMaXN0ZW5lci5jYWxsKHsgZWxlbWVudDogdGhpcy5lbGVtZW50Lm93bmVyRG9jdW1lbnQgfSwgXCJzaGlmdCArIGRvd25cIiwgc2VsZWN0RG93bi5iaW5kKHRoaXMpKTtcclxuXHRcdC8vIHRoaXMuYWRkTGlzdGVuZXIuY2FsbCh7IGVsZW1lbnQ6IHRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50IH0sIFwiZW5kXCIsIHRoaXMubW92ZVRvRW5kLmJpbmQodGhpcykpO1xyXG5cdFx0Y29uc29sZS5sb2coc2VsZWN0b3IpO1xyXG5cdFx0bGV0IG9wdGlvbnMgPSBBcnJheS5mcm9tKHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yLmdldERlZXAoXCJvcHRpb25cIikpKTtcclxuXHRcdHRoaXMub3B0aW9ucyA9IFtdO1xyXG5cdFx0b3B0aW9ucy5mb3JFYWNoKG5vZGUgPT4ge1xyXG5cdFx0XHRsZXQgdmFsdWUgPSBuZXcgT3B0aW9uKG5vZGUpO1xyXG5cclxuXHRcdFx0dmFsdWUuYWRkTGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmFjdGl2ZUNoYW5nZWQuYmluZCh0aGlzKSk7XHJcblx0XHRcdGlmICh2YWx1ZS5zZWxlY3RlZCkge1xyXG5cdFx0XHRcdGZjLmFkZCh2YWx1ZSk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5vcHRpb25zLnB1c2godmFsdWUpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRtb3ZlVG9QcmV2KGV2KSB7IG1vdmUodGhpcywgZXYsIGZjLnByZXYpOyB9XHJcblx0bW92ZVRvTmV4dChldikgeyBtb3ZlKHRoaXMsIGV2LCBmYy5uZXh0KTsgfVxyXG5cdG1vdmVUb1N0YXJ0KGV2KSB7IG1vdmUodGhpcywgZXYsIGZjLnN0YXJ0KTsgfVxyXG5cdG1vdmVUb0VuZChldikgeyBtb3ZlKHRoaXMsIGV2LCBmYy5lbmQpOyB9XHJcblx0YWN0aXZlQ2hhbmdlZChldikge1xyXG5cdFx0Ly8gbGV0IG9wdGlvbiBlbGVtZW50cy5nZXQoZXYudGFyZ2V0KTtcclxuXHRcdC8vIGxldCBwcmV2Rm9jdXMgPSBmYy5nZXQodGhpcy5vcHRpb25zKTtcclxuXHRcdC8vIGZjLnJlbW92ZShwcmV2Rm9jdXMpO1xyXG5cdFx0Ly8gZmMuYWRkKG9wdGlvbik7XHJcblxyXG5cdFx0Ly8gaWYgKHRoaXMuYWN0aXZlRGVzY2VuZGFudCkgdGhpcy5hY3RpdmVEZXNjZW5kYW50ID0gb3B0aW9uO1xyXG5cclxuXHRcdC8vIC8vIHVwZGF0ZSBzZWxlY3RlZCBvbiBrZXlldmVudCB3aGVuIG9ubHkgb25lIGl0ZW0gY2FuIGJlIHNlbGVjdGVkXHJcblx0XHQvLyBpZiAoIXRoaXMubXVsdGlzZWxlY3RhYmxlKSB7XHJcblx0XHQvLyBcdGZjLnNldFNlbGVjdGVkKHByZXZGb2N1cywgdW5kZWZpbmVkKTtcclxuXHRcdC8vIH1cclxuXHRcdC8vIGZjLnNldFNlbGVjdGVkKG9wdGlvbiwgYm9vbGVhbi50b2dnbGUob3B0aW9uLnNlbGVjdGVkKSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBtb3ZlKGF5LCBldiwgZnVuYykge1xyXG5cdGlmICghYXkudGFyZ2V0KSByZXR1cm47XHJcblx0aWYgKGV2KSBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRsZXQgcHJldkZvY3VzID0gZmMuZ2V0KGF5Lm9wdGlvbnMpO1xyXG5cdGZjLnJlbW92ZShwcmV2Rm9jdXMpO1xyXG5cdC8vIHVwZGF0ZSBzZWxlY3RlZCBvbiBrZXlldmVudCB3aGVuIG9ubHkgb25lIGl0ZW0gY2FuIGJlIHNlbGVjdGVkXHJcblx0bGV0IGN1cnJlbnRGb2N1cyA9IGZ1bmMoYXkub3B0aW9ucywgcHJldkZvY3VzKTtcclxuXHRpZiAoYXkuYWN0aXZlRGVzY2VuZGFudCkgYXkuYWN0aXZlRGVzY2VuZGFudCA9IGN1cnJlbnRGb2N1cztcclxuXHJcblx0Ly8gdXBkYXRlIHNlbGVjdGVkIG9uIGtleWV2ZW50IHdoZW4gb25seSBvbmUgaXRlbSBjYW4gYmUgc2VsZWN0ZWRcclxuXHRpZiAoIWF5Lm11bHRpc2VsZWN0YWJsZSkge1xyXG5cdFx0ZmMuc2V0U2VsZWN0ZWQocHJldkZvY3VzLCB1bmRlZmluZWQpO1xyXG5cdFx0ZmMuc2V0U2VsZWN0ZWQoY3VycmVudEZvY3VzLCBib29sZWFuLnRvZ2dsZShjdXJyZW50Rm9jdXMuc2VsZWN0ZWQpKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhc1RhcmdldCgpIHsgdGhpcy50YXJnZXQgPSB0cnVlOyB9XHJcbmZ1bmN0aW9uIGxvc3RUYXJnZXQoKSB7IHRoaXMudGFyZ2V0ID0gZmFsc2U7IH1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNlbGVjdDsiLCJpbXBvcnQgUm9sZXR5cGUgZnJvbSBcIi4vUm9sZXR5cGVcIjtcclxuXHJcbi8qKlxyXG4gKiBAZXh0ZW5kcyBSb2xldHlwZVxyXG4gKi9cclxuY2xhc3MgU3RydWN0dXJlIGV4dGVuZHMgUm9sZXR5cGUgeyB9XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdHJ1Y3R1cmU7XHJcbiIsImltcG9ydCBSb2xldHlwZSBmcm9tIFwiLi9Sb2xldHlwZVwiO1xyXG5cclxuLyoqXHJcbiAqIEBleHRlbmRzIFJvbGV0eXBlXHJcbiAqL1xyXG5jbGFzcyBXaWRnZXQgZXh0ZW5kcyBSb2xldHlwZSB7fVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgIFdpZGdldDtcclxuIiwiaW1wb3J0IFJvbGV0eXBlIGZyb20gXCIuL1JvbGV0eXBlXCI7XHJcblxyXG4vKipcclxuICogQGV4dGVuZHMgUm9sZXR5cGVcclxuICovXHJcbmNsYXNzIFdpbmRvdyBleHRlbmRzIFJvbGV0eXBlIHsgfVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgV2luZG93O1xyXG4iLCJpbXBvcnQgYm9vbGVhbiBmcm9tIFwiLi8uLi90eXBlL2Jvb2xlYW5cIjtcclxuaW1wb3J0IGdldEFjdGl2ZSBmcm9tIFwiLi8uLi91dGlscy9nZXRBY3RpdmVcIjtcclxuaW1wb3J0IElucHV0IGZyb20gXCIuL2Fic3RyYWN0L0lucHV0XCI7XHJcblxyXG4vKipcclxuICogQGV4dGVuZHMgSW5wdXRcclxuICovXHJcbmNsYXNzIE9wdGlvbiBleHRlbmRzIElucHV0IHtcclxuXHJcblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xyXG5cdFx0c3VwZXIoLi4uYXJncyk7XHJcblxyXG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25DbGljay5iaW5kKHRoaXMpKTtcclxuXHRcdHRoaXMuYWRkTGlzdGVuZXIoXCJrZXlcIiwgdGhpcy5vbkNsaWNrLmJpbmQodGhpcyksIHtrZXk6IFwiZW50ZXJcIiwgdGFyZ2V0OiBkb2N1bWVudH0pO1xyXG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKSwge2tleTogXCJzcGFjZVwiLCB0YXJnZXQ6IGRvY3VtZW50fSk7XHJcblx0XHQvLyB0aGlzLmFkZEtleUxpc3RlbmVyKFwiRW50ZXJcIiwgc2VsZWN0SXRlbS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdG9uQ2xpY2soZXYpIHtcclxuXHRcdGlmKHR5cGVvZiBzdXBlci5vbkNsaWNrID09IFwiZnVuY3Rpb25cIikgc3VwZXIub25DbGljayhldik7XHJcblx0XHRpZihldikgZXYucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRpZiAodGhpcyA9PSBnZXRBY3RpdmUoKSkge1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkID0gYm9vbGVhbi50b2dnbGUodGhpcy5zZWxlY3RlZCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBPcHRpb247IiwiaW1wb3J0IFRleHRib3ggZnJvbSBcIi4vVGV4dGJveFwiO1xuXG4vKipcbiAqIEBleHRlbmRzIFRleHRib3hcbiAqL1xuY2xhc3MgU2VhcmNoYm94IGV4dGVuZHMgVGV4dGJveCB7XG5cdC8qKlxuXHQgKiAjIyMjIEV4YW1wbGVcblx0ICogXG5cdCAqIDxkaXYgcm9sZT1cInNlYXJjaGJveFwiIGNvbnRlbnRlZGl0YWJsZT48L2Rpdj5cblx0ICogXG5cdCAqIGBgYGh0bWxcblx0ICogPGRpdiByb2xlPVwic2VhcmNoYm94XCIgY29udGVudGVkaXRhYmxlPjwvZGl2PlxuXHQgKiBgYGBcblx0ICogXG5cdCAqIEBwYXJhbSB7Kn0gYXJncyBcblx0ICovXG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHsgc3VwZXIoLi4uYXJncyk7IH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoYm94OyIsImltcG9ydCBlbGVtZW50cyBmcm9tIFwiLi4vdXRpbHMvZWxlbWVudHNcIjtcblxuLy8gVHlwZXNcbmltcG9ydCBET01TdHJpbmcgZnJvbSBcIi4vRE9NU3RyaW5nXCI7XG5pbXBvcnQgQWNjZXNzaWJsZU5vZGVMaXN0IGZyb20gXCIuL0FjY2Vzc2libGVOb2RlTGlzdFwiO1xuaW1wb3J0IGJvb2xlYW4gZnJvbSBcIi4vYm9vbGVhblwiO1xuaW1wb3J0IGRvdWJsZSBmcm9tIFwiLi9kb3VibGVcIjtcbmltcG9ydCBsb25nIGZyb20gXCIuL2xvbmdcIjtcblxuLyoqXG4gKiBCYXNlZCBvbiB0aGUgQU9NIHNwZWNcbiAqIEBjbGFzc1xuICovXG5jbGFzcyBBY2Nlc3NpYmxlTm9kZSB7XG5cdGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcblx0XHR0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXG5cdFx0dGhpcy5fID0geyBtdXRhdGlvbnM6IFtdfTtcblx0XHR0aGlzLl8ubXV0YXRpb25zLnB1c2goW1wicm9sZVwiLCBcImFyaWEtYWN0aXZlZGVzY2VuZGFudFwiLCBcImFyaWEtYXRvbWljXCIsIFwiYXJpYS1hdXRvY29tcGxldGVcIixcblx0XHRcdFwiYXJpYS1idXN5XCIsIFwiYXJpYS1jaGVja2VkXCIsIFwiYXJpYS1jb2xjb3VudFwiLCBcImFyaWEtY29saW5kZXhcIiwgXCJhcmlhLWNvbHNwYW5cIiwgXCJhcmlhLWNvbnRyb2xzXCIsXG5cdFx0XHRcImFyaWEtY3VycmVudFwiLCBcImFyaWEtZGVzY3JpYmVkYnlcIiwgXCJhcmlhLWRldGFpbHNcIiwgXCJhcmlhLWRpc2FibGVkXCIsIFwiYXJpYS1kcm9wZWZmZWN0XCIsXG5cdFx0XHRcImFyaWEtZXJyb3JtZXNzYWdlXCIsIFwiYXJpYS1leHBhbmRlZFwiLCBcImFyaWEtZmxvd3RvXCIsIFwiYXJpYS1ncmFiYmVkXCIsIFwiYXJpYS1oYXNwb3B1cFwiLFxuXHRcdFx0XCJhcmlhLWhpZGRlblwiLCBcImFyaWEtaW52YWxpZFwiLCBcImFyaWEta2V5c2hvcnRjdXRzXCIsIFwiYXJpYS1sYWJlbFwiLCBcImFyaWEtbGFiZWxsZWRieVwiLFxuXHRcdFx0XCJhcmlhLWxldmVsXCIsIFwiYXJpYS1saXZlXCIsIFwiYXJpYS1tb2RhbFwiLCBcImFyaWEtbXVsdGlsaW5lXCIsIFwiYXJpYS1tdWx0aXNlbGVjdGFibGVcIixcblx0XHRcdFwiYXJpYS1vcmllbnRhdGlvblwiLCBcImFyaWEtb3duc1wiLCBcImFyaWEtcGxhY2Vob2xkZXJcIiwgXCJhcmlhLXBvc2luc2V0XCIsIFwiYXJpYS1wcmVzc2VkXCIsXG5cdFx0XHRcImFyaWEtcmVhZG9ubHlcIiwgXCJhcmlhLXJlbGV2YW50XCIsIFwiYXJpYS1yZXF1aXJlZFwiLCBcImFyaWEtcm9sZWRlc2NyaXB0aW9uXCIsIFwiYXJpYS1yb3djb3VudFwiLFxuXHRcdFx0XCJhcmlhLXJvd2luZGV4XCIsIFwiYXJpYS1yb3dzcGFuXCIsIFwiYXJpYS1zZWxlY3RlZFwiLCBcImFyaWEtc2V0c2l6ZVwiLCBcImFyaWEtc29ydFwiLCBcImFyaWEtdmFsdWVtYXhcIixcblx0XHRcdFwiYXJpYS12YWx1ZW1pblwiLCBcImFyaWEtdmFsdWVub3dcIiwgXCJhcmlhLXZhbHVldGV4dFwiXSk7XG5cblx0XHQvKiAqKioqKioqKioqKioqKioqKiogQUNDRVNTSUJMRSBMQUJFTCBBTkQgREVTQ1JJUFRJT04gKioqKioqKioqKioqKioqKioqICovXG5cdFx0XG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyBhbiBsaXN0IHdpdGggQWNjZXNzaWJsZU5vZGUgaW5zdGFuY2VzIHRoYXQgbGFiZWxzIHRoZSBjdXJyZW50IGVsZW1lbnRcblx0XHQgKiBcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNkZXNjcmliZWRCeX1cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtbGFiZWxsZWRieVxuXHRcdCAqIEB0eXBlIHtBY2Nlc3NpYmxlTm9kZUxpc3R9XG5cdFx0ICovXG5cdFx0dGhpcy5sYWJlbGxlZEJ5ID0gbmV3IEFjY2Vzc2libGVOb2RlTGlzdCh0aGlzLCBcImFyaWEtbGFiZWxsZWRCeVwiKTtcblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgYW4gbGlzdCB3aXRoIEFjY2Vzc2libGVOb2RlIGluc3RhbmNlcyB0aGF0IGRlc2NyaWJlcyB0aGUgY3VycmVudCBlbGVtZW50XG5cdFx0ICogXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjbGFiZWxlZEJ5fVxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1kZXNjcmliZWRieVxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHR5cGUge0FjY2Vzc2libGVOb2RlTGlzdH1cblx0XHQgKi9cblx0XHR0aGlzLmRlc2NyaWJlZEJ5ID0gbmV3IEFjY2Vzc2libGVOb2RlTGlzdCh0aGlzLCBcImFyaWEtZGVzY3JpYmVkQnlcIik7XG5cblx0XHQvKiAqKioqKioqKioqKioqKiBFTkQgT0YgQUNDRVNTSUJMRSBMQUJFTCBBTkQgREVTQ1JJUFRJT04gKioqKioqKioqKioqKiogKi9cblxuXHRcdC8qICoqKioqKioqKioqKioqKioqKioqKioqKiBPVEhFUiBSRUxBVElPTlNISVBTICoqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyBhbiBsaXN0IHdpdGggQWNjZXNzaWJsZU5vZGUgaW5zdGFuY2VzIHdob3NlIGNvbnRlbnRzIG9yIHByZXNlbmNlIGFyZSBjb250cm9sbGVkIGJ5XG5cdFx0ICogdGhlIGN1cnJlbnQgZWxlbWVudC5cblx0XHQgKiBcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNvd25zfVxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1jb250cm9sc1xuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHR5cGUge0FjY2Vzc2libGVOb2RlTGlzdH1cblx0XHQgKi9cblx0XHR0aGlzLmNvbnRyb2xzID0gbmV3IEFjY2Vzc2libGVOb2RlTGlzdCh0aGlzLCBcImFyaWEtY29udHJvbHNcIik7XG5cblx0XHQvKipcblx0XHQgKiBDb250YWlucyB0aGUgbmV4dCBlbGVtZW50KHMpIGluIGFuIGFsdGVybmF0ZSByZWFkaW5nIG9yZGVyIG9mIGNvbnRlbnQgd2hpY2gsIGF0IHRoZSB1c2VyJ3MgXG5cdFx0ICogZGlzY3JldGlvbiwgYWxsb3dzIGFzc2lzdGl2ZSB0ZWNobm9sb2d5IHRvIG92ZXJyaWRlIHRoZSBnZW5lcmFsIGRlZmF1bHQgb2YgcmVhZGluZyBpblxuXHRcdCAqIGRvY3VtZW50IHNvdXJjZSBvcmRlci5cblx0XHQgKiBcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtZmxvd3RvXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAdHlwZSB7QWNjZXNzaWJsZU5vZGVMaXN0fVxuXHRcdCAqL1xuXHRcdHRoaXMuZmxvd1RvID0gbmV3IEFjY2Vzc2libGVOb2RlTGlzdCh0aGlzLCBcImFyaWEtZmxvd3RvXCIpO1xuXG5cdFx0LyoqXG5cdFx0ICogQ29udGFpbnMgY2hpbGRyZW4gd2hvJ3MgSUQgYXJlIHJlZmVyZW5jZWQgaW5zaWRlIHRoZSBgYXJpYS1vd25zYCBhdHRyaWJ1dGVcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtb3duc1xuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHR5cGUge0FjY2Vzc2libGVOb2RlTGlzdH1cblx0XHQgKi9cblx0XHR0aGlzLm93bnMgPSBuZXcgQWNjZXNzaWJsZU5vZGVMaXN0KHRoaXMsIFwiYXJpYS1vd25zXCIpO1xuXHRcdFxuXHRcdC8qICoqKioqKioqKioqKioqKioqKioqKiBFTkQgT0YgT1RIRVIgUkVMQVRJT05TSElQUyAqKioqKioqKioqKioqKioqKioqKiogKi9cblx0fVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhBY2Nlc3NpYmxlTm9kZS5wcm90b3R5cGUsIFxuXHQvKiogQGxlbmRzIEFjY2Vzc2libGVOb2RlLnByb3RvdHlwZSAqL1xuXHR7XG5cdFx0LyoqIFxuXHRcdCogRGVmaW5lcyBhIHR5cGUgaXQgcmVwcmVzZW50cywgZS5nLiBgdGFiYFxuXHRcdCogXG5cdFx0KiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI3JvbGVzXG5cdFx0KiBAdHlwZSAgez9TdHJpbmd9XG5cdFx0Ki9cblx0XHRcInJvbGVcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJyb2xlXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwicm9sZVwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKiogXG5cdFx0ICogRGVmaW5lcyBhIGh1bWFuLXJlYWRhYmxlLCBhdXRob3ItbG9jYWxpemVkIGRlc2NyaXB0aW9uIGZvciB0aGUgcm9sZVxuXHRcdCAqIFxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1yb2xlZGVzY3JpcHRpb25cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEB0eXBlIHs/U3RyaW5nfVxuXHRcdCAqL1xuXHRcdFwicm9sZURlc2NyaXB0aW9uXCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQoc3RyKSB7IHJldHVybiBET01TdHJpbmcuc2V0KHRoaXMsIFwiYXJpYS1yb2xlRGVzY3JpcHRpb25cIiwgc3RyKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIERPTVN0cmluZy5nZXQodGhpcywgXCJhcmlhLXJvbGVEZXNjcmlwdGlvblwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKiAqKioqKioqKioqKioqKioqKioqIEFDQ0VTU0lCTEUgTEFCRUwgQU5EIERFU0NSSVBUSU9OICoqKioqKioqKioqKioqKioqKiogKi9cblx0XG5cdFx0LyoqIFxuXHRcdCogRGVmaW5lcyBhIHN0cmluZyB2YWx1ZSB0aGF0IGxhYmVscyB0aGUgY3VycmVudCBlbGVtZW50LlxuXHRcdCogXG5cdFx0KiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtbGFiZWxcblx0XHQqIEB0eXBlIHs/U3RyaW5nfSBcblx0XHQqL1xuXHRcdFwibGFiZWxcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJhcmlhLWxhYmVsXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1sYWJlbFwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKiAqKioqKioqKioqKioqKiogRU5EIE9GIEFDQ0VTU0lCTEUgTEFCRUwgQU5EIERFU0NSSVBUSU9OICoqKioqKioqKioqKioqKiAqL1xuXHRcblx0XHQvKiAqKioqKioqKioqKioqKioqKioqKiogR0xPQkFMIFNUQVRFUyBBTkQgUFJPUEVSVElFUyAqKioqKioqKioqKioqKioqKioqKiogKi9cblxuXHRcdC8qKiBcblx0XHQgKiBJbmRpY2F0ZXMgdGhlIGVsZW1lbnQgdGhhdCByZXByZXNlbnRzIHRoZSBjdXJyZW50IGl0ZW0gd2l0aGluIGEgY29udGFpbmVyIG9yIHNldCBvZiByZWxhdGVkIGVsZW1lbnRzLlxuXHRcdCAqIFxuXHRcdCAqIFBvc3NpYmxlIHN0cmluZ3MgYXJlOlxuXHRcdCAqICogYHBhZ2VgLCB1c2VkIHRvIGluZGljYXRlIGEgbGluayB3aXRoaW4gYSBzZXQgb2YgcGFnaW5hdGlvbiBsaW5rcywgXG5cdFx0ICogXHRcdHdoZXJlIHRoZSBsaW5rIGlzIHZpc3VhbGx5IHN0eWxlZCB0byByZXByZXNlbnQgdGhlIGN1cnJlbnRseS1kaXNwbGF5ZWQgcGFnZS5cblx0XHQgKiAqIGBzdGVwYCwgdXNlZCB0byBpbmRpY2F0ZSBhIGxpbmsgd2l0aGluIGEgc3RlcCBpbmRpY2F0b3IgZm9yIGEgc3RlcC1iYXNlZCBwcm9jZXNzLFxuXHRcdCAqIFx0XHR3aGVyZSB0aGUgbGluayBpcyB2aXN1YWxseSBzdHlsZWQgdG8gcmVwcmVzZW50IHRoZSBjdXJyZW50IHN0ZXAuXG5cdFx0ICogKiBgbG9jYXRpb25gLCB1c2VkIHRvIGluZGljYXRlIHRoZSBpbWFnZSB0aGF0IGlzIHZpc3VhbGx5IGhpZ2hsaWdodGVkIGFzIHRoZSBjdXJyZW50IGNvbXBvbmVudCBvZiBhIGZsb3cgY2hhcnQuXG5cdFx0ICogKiBgZGF0ZWAsIHVzZWQgdG8gaW5kaWNhdGUgdGhlIGN1cnJlbnQgZGF0ZSB3aXRoaW4gYSBjYWxlbmRhci5cblx0XHQgKiAqIGB0aW1lYCwgdXNlZCB0byBpbmRpY2F0ZSB0aGUgY3VycmVudCB0aW1lIHdpdGhpbiBhIHRpbWV0YWJsZS5cblx0XHQgKiBcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtY3VycmVudFxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHR5cGUgez9TdHJpbmd9XG5cdFx0ICovXG5cdFx0XCJjdXJyZW50XCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQoc3RyKSB7IHJldHVybiBET01TdHJpbmcuc2V0KHRoaXMsIFwiYXJpYS1jdXJyZW50XCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1jdXJyZW50XCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qICoqKioqKioqKioqKioqKioqIEVORCBPRiBHTE9CQUwgU1RBVEVTIEFORCBQUk9QRVJUSUVTICoqKioqKioqKioqKioqKioqICovXG5cblx0XHQvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKiBXSURHRVQgUFJPUEVSVElFUyAqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5cdFx0LyoqXG5cdFx0ICogSW5kaWNhdGVzIHdoZXRoZXIgaW5wdXR0aW5nIHRleHQgY291bGQgdHJpZ2dlciBkaXNwbGF5IG9mIG9uZSBvciBtb3JlIHByZWRpY3Rpb25zIG9mIHRoZSB1c2VyJ3Ncblx0XHQgKiBpbnRlbmRlZCB2YWx1ZSBmb3IgYW4gaW5wdXQgYW5kIHNwZWNpZmllcyBob3cgcHJlZGljdGlvbnMgd291bGQgYmUgcHJlc2VudGVkIGlmIHRoZXkgYXJlIG1hZGUuXG5cdFx0ICogXG5cdFx0ICogVGhlIGJlaGF2aW9yIGR1cmluZyBpbnB1dCBpcyBkZXBlbmRzIG9uIHRoZSBwcm92aWRlZCB2YWx1ZSwgaXQgZm9sbG93cyBiZW5lYXRoIHRhYmxlLlxuXHRcdCAqIFxuXHRcdCAqIHwgVmFsdWUgIHwgXHREZXNjcmlwdGlvbiB8XG5cdFx0ICogfCAtLS0tLS0gfCAtLS0gfFxuXHRcdCAqIHwgaW5saW5lIHwgVGV4dCBzdWdnZXN0aW5nIG1heSBiZSBkeW5hbWljYWxseSBpbnNlcnRlZCBhZnRlciB0aGUgY2FyZXQuXG5cdFx0ICogfCBsaXN0ICAgfCBBIGNvbGxlY3Rpb24gb2YgdmFsdWVzIHRoYXQgY291bGQgY29tcGxldGUgdGhlIHByb3ZpZGVkIGlucHV0IGlzIGRpc3BsYXllZC5cblx0XHQgKiB8IGJvdGggICB8IEltcGxlbWVudHMgYGlubGluZWAgYW5kIGBsaXN0YFxuXHRcdCAqIHwgbm9uZSAgIHwgTm8gcHJlZGljdGlvbiBpcyBzaG93blxuXHRcdCAqIFxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1hdXRvY29tcGxldGVcblx0XHQgKiBAdHlwZSB7P1N0cmluZ31cblx0XHQgKi9cblx0XHRcImF1dG9jb21wbGV0ZVwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHN0cikgeyByZXR1cm4gRE9NU3RyaW5nLnNldCh0aGlzLCBcImFyaWEtYXV0b2NvbXBsZXRlXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1hdXRvY29tcGxldGVcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucy9zZXRzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBlbGVtZW50IHdobyBpcyBleHBvc2VkIHRvIGFuIGFjY2Vzc2liaWxpdHkgQVBJLlxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI2Rpc2FibGVkfVxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1oaWRkZW5cblx0XHQgKiBAdHlwZSB7P0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0XCJoaWRkZW5cIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIGJvb2xlYW4uc2V0KHRoaXMsIFwiYXJpYS1oaWRkZW5cIiwgc3RyKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGJvb2xlYW4uZ2V0KHRoaXMsIFwiYXJpYS1oaWRkZW5cIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogSW5kaWNhdGVzIGtleWJvYXJkIHNob3J0Y3V0cyB0aGF0IGFuIGF1dGhvciBoYXMgaW1wbGVtZW50ZWQgdG8gYWN0aXZhdGUgb3Jcblx0XHQgKiBnaXZlIGZvY3VzIHRvIGFuIGVsZW1lbnQuXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWtleXNob3J0Y3V0c1xuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHR5cGUgez9TdHJpbmd9XG5cdFx0ICovXG5cdFx0XCJrZXlTaG9ydGN1dHNcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJhcmlhLWtleVNob3J0Y3V0c1wiLCBzdHIpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gRE9NU3RyaW5nLmdldCh0aGlzLCBcImFyaWEta2V5U2hvcnRjdXRzXCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qKiBcblx0XHQgKiBJbmRpY2F0ZXMgd2hldGhlciBhbiBlbGVtZW50IGlzIG1vZGFsIHdoZW4gZGlzcGxheWVkLlxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1tb2RhbFxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHR5cGUgez9Cb29sZWFufVxuXHRcdCAqL1xuXHRcdFwibW9kYWxcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIGJvb2xlYW4uc2V0KHRoaXMsIFwiYXJpYS1tb2RhbFwiLCBzdHIpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gYm9vbGVhbi5nZXQodGhpcywgXCJhcmlhLW1vZGFsXCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qKiBcblx0XHQgKiBJbmRpY2F0ZXMgd2hldGhlciBhIHRleHQgYm94IGFjY2VwdHMgbXVsdGlwbGUgbGluZXMgb2YgaW5wdXQgb3Igb25seSBhIHNpbmdsZSBsaW5lLlxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1tdWx0aWxpbmVcblx0XHQgKiBAdHlwZSB7P0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0XCJtdWx0aWxpbmVcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIGJvb2xlYW4uc2V0KHRoaXMsIFwiYXJpYS1tdWx0aWxpbmVcIiwgc3RyKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGJvb2xlYW4uZ2V0KHRoaXMsIFwiYXJpYS1tdWx0aWxpbmVcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogSW5kaWNhdGVzIHRoYXQgdGhlIHVzZXIgbWF5IHNlbGVjdCBtb3JlIHRoYW4gb25lIGl0ZW0gZnJvbSB0aGUgY3VycmVudCBzZWxlY3RhYmxlIGRlc2NlbmRhbnRzLlxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1tdWx0aXNlbGVjdGFibGVcblx0XHQgKiBAdHlwZSB7P0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0XCJtdWx0aXNlbGVjdGFibGVcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIGJvb2xlYW4uc2V0KHRoaXMsIFwiYXJpYS1tdWx0aXNlbGVjdGFibGVcIiwgc3RyKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGJvb2xlYW4uZ2V0KHRoaXMsIFwiYXJpYS1tdWx0aXNlbGVjdGFibGVcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGVsZW1lbnQncyBvcmllbnRhdGlvbiBpcyBgaG9yaXpvbnRhbGAsIGB2ZXJ0aWNhbGAsIG9yIGBudWxsYC5cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtb3JpZW50YXRpb25cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEB0eXBlIHs/U3RyaW5nfVxuXHRcdCAqL1xuXHRcdFwib3JpZW50YXRpb25cIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJhcmlhLW9yaWVudGF0aW9uXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1vcmllbnRhdGlvblwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBJbmRpY2F0ZXMgdGhhdCB0aGUgdXNlciBtYXkgc2VsZWN0IG1vcmUgdGhhbiBvbmUgaXRlbSBmcm9tIHRoZSBjdXJyZW50IHNlbGVjdGFibGUgZGVzY2VuZGFudHMuXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXJlYWRvbmx5XG5cdFx0ICogQHR5cGUgez9Cb29sZWFufVxuXHRcdCAqL1xuXHRcdFwicmVhZE9ubHlcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIGJvb2xlYW4uc2V0KHRoaXMsIFwiYXJpYS1yZWFkT25seVwiLCBzdHIpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gYm9vbGVhbi5nZXQodGhpcywgXCJhcmlhLXJlYWRPbmx5XCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEluZGljYXRlcyB0aGF0IHVzZXIgaW5wdXQgaXMgcmVxdWlyZWQgb24gdGhlIGVsZW1lbnQgYmVmb3JlIGEgZm9ybSBtYXkgYmUgc3VibWl0dGVkLlxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1yZXF1aXJlZFxuXHRcdCAqIEB0eXBlIHs/Qm9vbGVhbn1cblx0XHQgKi9cblx0XHRcInJlcXVpcmVkXCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQoc3RyKSB7IHJldHVybiBib29sZWFuLnNldCh0aGlzLCBcImFyaWEtcmVxdWlyZWRcIiwgc3RyKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGJvb2xlYW4uZ2V0KHRoaXMsIFwiYXJpYS1yZXF1aXJlZFwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBJbmRpY2F0ZXMgdGhhdCB1c2VyIGlucHV0IGlzIHJlcXVpcmVkIG9uIHRoZSBlbGVtZW50IGJlZm9yZSBhIGZvcm0gbWF5IGJlIHN1Ym1pdHRlZC5cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtc2VsZWN0ZWRcblx0XHQgKiBAdHlwZSB7P0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0XCJzZWxlY3RlZFwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHN0cikgeyByZXR1cm4gYm9vbGVhbi5zZXQodGhpcywgXCJhcmlhLXNlbGVjdGVkXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBib29sZWFuLmdldCh0aGlzLCBcImFyaWEtc2VsZWN0ZWRcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogSW5kaWNhdGVzIGlmIGl0ZW1zIGluIGEgdGFibGUgb3IgZ3JpZCBhcmUgc29ydGVkIGluIGFzY2VuZGluZyBvciBkZXNjZW5kaW5nIG9yZGVyLiAgXG5cdFx0ICogUG9zc2libGUgdmFsdWVzIGFyZSBgYWNlbmRpbmdgLCBgZGVzY2VuZGluZ2AsIGBub25lYCwgYG90aGVyYCBvciBgbnVsbGAuXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXNvcnRcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEB0eXBlIHs/Qm9vbGVhbn1cblx0XHQgKi9cblx0XHRcInNvcnRcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJhcmlhLXNvcnRcIiwgc3RyKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIERPTVN0cmluZy5nZXQodGhpcywgXCJhcmlhLXNvcnRcIik7IH1cblx0XHR9LFxuXG5cdFx0LyogKioqKioqKioqKioqKioqKioqKioqKiogRU5EIE9GIFdJREdFVCBQUk9QRVJUSUVTICoqKioqKioqKioqKioqKioqKioqKioqICovXG5cblxuXHRcdC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqIFdJREdFVCBTVEFURVMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5cdFx0LyoqXG5cdFx0ICogSW5kaWNhdGVzIHRoZSBjdXJyZW50IFwiY2hlY2tlZFwiIHN0YXRlIG9mIGEge0BsaW5rIFdpZGdldH0sIGFtb25nIHtAbGluayBSYWRpb30gYW5kIHtAbGluayBDaGVja2JveH1cblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNwcmVzc2VkfVxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI3NlbGVjdGVkfVxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1wcmVzc2VkXG5cdFx0ICogQHR5cGUgez9TdHJpbmd9XG5cdFx0ICovXG5cdFx0XCJjaGVja2VkXCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQoc3RyKSB7IHJldHVybiBET01TdHJpbmcuc2V0KHRoaXMsIFwiYXJpYS1jaGVja2VkXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1jaGVja2VkXCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBlbGVtZW50LCBvciBhbm90aGVyIGdyb3VwaW5nIGVsZW1lbnQgaXQgY29udHJvbHMsIFxuXHRcdCAqIGlzIGN1cnJlbnRseSBleHBhbmRlZCBvciBjb2xsYXBzZWQuXG5cdFx0ICogXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWV4cGFuZGVkXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAdHlwZSB7P0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0XCJleHBhbmRlZFwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHN0cikgeyByZXR1cm4gYm9vbGVhbi5zZXQodGhpcywgXCJhcmlhLWV4cGFuZGVkXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBib29sZWFuLmdldCh0aGlzLCBcImFyaWEtZXhwYW5kZWRcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogSW5kaWNhdGVzIHRoYXQgdGhlIGVsZW1lbnQgaXMgcGVyY2VpdmFibGUgYnV0IGRpc2FibGVkLCBzbyBpdCBpcyBub3QgZWRpdGFibGUgb3Igb3RoZXJ3aXNlIG9wZXJhYmxlLlxuXHRcdCAqIFxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI2hpZGRlbn1cblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNyZWFkb25seX1cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtZGlzYWJsZWRcblx0XHQgKiBAdHlwZSB7P0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0XCJkaXNhYmxlZFwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHN0cikgeyByZXR1cm4gYm9vbGVhbi5zZXQodGhpcywgXCJhcmlhLWRpc2FibGVkXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBib29sZWFuLmdldCh0aGlzLCBcImFyaWEtZGlzYWJsZWRcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogSW5kaWNhdGVzIHRoZSBlbnRlcmVkIHZhbHVlIGRvZXMgbm90IGNvbmZvcm0gdG8gdGhlIGZvcm1hdCBleHBlY3RlZCBieSB0aGUgYXBwbGljYXRpb24uXG5cdFx0ICogXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjZXJyb3JNZXNzYWdlfVxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1lcnJvcm1lc3NhZ2Vcblx0XHQgKiBAdHlwZSB7P1N0cmluZ30gXG5cdFx0ICovXG5cdFx0XCJpbnZhbGlkXCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQoc3RyKSB7IHJldHVybiBET01TdHJpbmcuc2V0KHRoaXMsIFwiYXJpYS1pbnZhbGlkXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1pbnZhbGlkXCIpOyB9XG5cdFx0fSxcblxuXG5cdFx0LyoqXG5cdFx0ICogSW5kaWNhdGVzIHRoZSBhdmFpbGFiaWxpdHkgYW5kIHR5cGUgb2YgaW50ZXJhY3RpdmUgcG9wdXAgZWxlbWVudCwgc3VjaCBhcyBtZW51IG9yIGRpYWxvZyxcblx0XHQgKiB0aGF0IGNhbiBiZSB0cmlnZ2VyZWQgYnkgYW4gZWxlbWVudC5cblx0XHQgKiBcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtaGFzcG9wdXBcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEB0eXBlIHs/U3RyaW5nfVxuXHRcdCAqL1xuXHRcdFwiaGFzUG9wVXBcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJhcmlhLWhhc3BvcHVwXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1oYXNwb3B1cFwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBJbmRpY2F0ZXMgdGhlIGN1cnJlbnQgXCJjaGVja2VkXCIgc3RhdGUgb2YgYSB7QGxpbmsgV2lkZ2V0fSwgYW1vbmcge0BsaW5rIFJhZGlvfSBhbmQge0BsaW5rIENoZWNrYm94fVxuXHRcdCAqIFxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI3ByZXNzZWR9XG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjc2VsZWN0ZWR9XG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXByZXNzZWRcblx0XHQgKiBAdHlwZSB7P1N0cmluZ31cblx0XHQgKi9cblx0XHRcInByZXNzZWRcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJhcmlhLXByZXNzZWRcIiwgc3RyKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIERPTVN0cmluZy5nZXQodGhpcywgXCJhcmlhLXByZXNzZWRcIik7IH1cblx0XHR9LFxuXG5cdFx0LyogKioqKioqKioqKioqKioqKioqKioqKioqKiBFTkQgT0YgV0lER0VUIFNUQVRFUyAqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5cblxuXHRcdC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKiogQ09OVFJPTCBWQUxVRVMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5cdFx0LyoqIFxuXHRcdCAqIFJldHVybnMgLyBzZXRzIHRoZSBodW1hbiByZWFkYWJsZSB0ZXh0IGFsdGVybmF0aXZlIG9mIHtAbGluayAjYXJpYS12YWx1ZW5vd30gZm9yIGEge0BsaW5rIFJhbmdlfSB3aWRnZXQuXG5cdFx0ICogXG5cdFx0ICogQHNlZSB7QGxpbmsgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS12YWx1ZXRleHR9XG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAdHlwZSB7P1N0cmluZ31cblx0XHQgKi9cblx0XHRcInZhbHVlVGV4dFwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHN0cikgeyByZXR1cm4gRE9NU3RyaW5nLnNldCh0aGlzLCBcImFyaWEtdmFsdWVUZXh0XCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS12YWx1ZVRleHRcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyAvIHNldHMgYSBzaG9ydCBoaW50IGludGVuZGVkIHRvIGFpZCB0aGUgdXNlciB3aXRoIGRhdGEgZW50cnkgd2hlbiB0aGUgY29udHJvbCBoYXMgbm8gdmFsdWUuXG5cdFx0ICogQSBoaW50IGNvdWxkIGJlIGEgc2FtcGxlIHZhbHVlIG9yIGEgYnJpZWYgZGVzY3JpcHRpb24gb2YgdGhlIGV4cGVjdGVkIGZvcm1hdC5cblx0XHQgKiBcblx0XHQgKiBAc2VlIHtAbGluayBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXBsYWNlaG9sZGVyfVxuXHRcdCAqIEB0eXBlIHs/U3RyaW5nfVxuXHRcdCAqL1xuXHRcdFwicGxhY2Vob2xkZXJcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJhcmlhLXBsYWNlaG9sZGVyXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1wbGFjZWhvbGRlclwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKiogXG5cdFx0ICogUmV0dXJucyAvIHNldHMgdGhlIGN1cnJlbnQgdmFsdWUgZm9yIGEge0BsaW5rIFJhbmdlfSB3aWRnZXQuXG5cdFx0ICogXG5cdFx0ICogQHNlZSB7QGxpbmsgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS12YWx1ZW5vd31cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEB0eXBlIHs/TnVtYmVyfVxuXHRcdCAqL1xuXHRcdFwidmFsdWVOb3dcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldCh2YWwpIHsgcmV0dXJuIGRvdWJsZS5zZXQodGhpcywgXCJhcmlhLXZhbHVlbm93XCIsIHZhbCk7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBkb3VibGUuZ2V0KHRoaXMsIFwiYXJpYS12YWx1ZW5vd1wiKTsgfVxuXHRcdH0sXG5cblx0XHQvKiogXG5cdFx0ICogUmV0dXJucyAvIHNldHMgdGhlIG1pbmltdW0gYWxsb3dlZCB2YWx1ZSBmb3IgYSB7QGxpbmsgUmFuZ2V9IHdpZGdldC5cblx0XHQgKiBcblx0XHQgKiBAc2VlIHtAbGluayBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXZhbHVlbWlufVxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHR5cGUgez9OdW1iZXJ9XG5cdFx0ICovXG5cdFx0XCJ2YWx1ZU1pblwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHZhbCkgeyByZXR1cm4gZG91YmxlLnNldCh0aGlzLCBcImFyaWEtdmFsdWVtaW5cIiwgdmFsKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGRvdWJsZS5nZXQodGhpcywgXCJhcmlhLXZhbHVlbWluXCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qKiBcblx0XHQgKiBSZXR1cm5zIC8gc2V0cyB0aGUgbWF4aW11bSBhbGxvd2VkIHZhbHVlIGZvciBhIHtAbGluayBSYW5nZX0gd2lkZ2V0LlxuXHRcdCAqIFxuXHRcdCAqIEBzZWUge0BsaW5rIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtdmFsdWVtYXh9XG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAdHlwZSB7P051bWJlcn1cblx0XHQgKi9cblx0XHRcInZhbHVlTWF4XCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQodmFsKSB7IHJldHVybiBkb3VibGUuc2V0KHRoaXMsIFwiYXJpYS12YWx1ZW1heFwiLCB2YWwpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gZG91YmxlLmdldCh0aGlzLCBcImFyaWEtdmFsdWVtYXhcIik7IH1cblx0XHR9LFxuXG5cdFx0LyogKioqKioqKioqKioqKioqKioqKioqKioqIEVORCBPRiBDT05UUk9MIFZBTFVFUyAqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuXHRcdC8qICoqKioqKioqKioqKioqKioqKioqKioqKiogT1RIRVIgUkVMQVRJT05TSElQUyAqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIC8gc2V0cyB0aGUgQWNjZXNzaWJsZU5vZGUgb2YgdGhlIGN1cnJlbnRseSBhY3RpdmUgZWxlbWVudCB3aGVuIGZvY3VzIGlzIG9uIGN1cnJlbnQgZWxlbWVudC5cblx0XHQgKiBcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtYWN0aXZlZGVzY2VuZGFudFxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHR5cGUgez9BY2NjZXNzaWJsZU5vZGV9XG5cdFx0ICovXG5cdFx0XCJhY3RpdmVEZXNjZW5kYW50XCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQoYXkpIHsgcmV0dXJuIHNldEFjY2Vzc2libGVOb2RlKHRoaXMsIFwiYXJpYS1hY3RpdmVkZXNjZW5kYW50XCIsIGF5KTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGdldEFjY2Vzc2libGVOb2RlKHRoaXMsIFwiYXJpYS1hY3RpdmVkZXNjZW5kYW50XCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgLyBzZXRzIGFuIEFjY2Vzc2libGVOb2RlIHRoYXQgcHJvdmlkZXMgYSBkZXRhaWxlZCwgZXh0ZW5kZWQgZGVzY3JpcHRpb24gXG5cdFx0ICogZm9yIHRoZSBjdXJyZW50IGVsZW1lbnQuXG5cdFx0ICogXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjZGVzY3JpYmVkQnl9XG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWRldGFpbHNcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEB0eXBlIHs/QWNjY2Vzc2libGVOb2RlfVxuXHRcdCAqL1xuXHRcdFwiZGV0YWlsc1wiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KGF5KSB7IHJldHVybiBzZXRBY2Nlc3NpYmxlTm9kZSh0aGlzLCBcImFyaWEtZGV0YWlsc1wiLCBheSk7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBnZXRBY2Nlc3NpYmxlTm9kZSh0aGlzLCBcImFyaWEtZGV0YWlsc1wiKTsgfVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIC8gc2V0cyBhbiBBY2Nlc3NpYmxlTm9kZSB0aGF0IHByb3ZpZGVzIGFuIGVycm9yIG1lc3NhZ2UgZm9yIHRoZSBjdXJyZW50IGVsZW1lbnQuXG5cdFx0ICogXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjaW52YWxpZH1cblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNkZXNjcmliZWRCeX1cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtZXJyb3JtZXNzYWdlXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAdHlwZSB7P0FjY2Nlc3NpYmxlTm9kZX1cblx0XHQgKi9cblx0XHRcImVycm9yTWVzc2FnZVwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KGF5KSB7IHJldHVybiBzZXRBY2Nlc3NpYmxlTm9kZSh0aGlzLCBcImFyaWEtZXJyb3JtZXNzYWdlXCIsIGF5KTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGdldEFjY2Vzc2libGVOb2RlKHRoaXMsIFwiYXJpYS1lcnJvcm1lc3NhZ2VcIik7IH1cblx0XHR9LFxuXG5cdFx0LyogKioqKioqKioqKioqKioqKioqKioqKiBFTkQgT0YgT1RIRVIgUkVMQVRJT05TSElQUyAqKioqKioqKioqKioqKioqKioqKioqICovXG5cblx0XHQvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiBDT0xMRUNUSU9OUyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyAvIHNldHMgdGhlIHRvdGFsIG51bWJlciBvZiBjb2x1bW5zIGluIGEge0BsaW5rIFRhYmxlfSwge0BsaW5rIEdyaWR9LCBvciB7QGxpbmsgVHJlZWdyaWR9LlxuXHRcdCAqIFxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI2NvbEluZGV4fVxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1zZXRzaXplXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAdHlwZSB7P0ludGVnZXJ9XG5cdFx0ICovXG5cdFx0XCJjb2xDb3VudFwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHZhbCkgeyByZXR1cm4gbG9uZy5zZXQodGhpcywgXCJhcmlhLWNvbGNvdW50XCIsIHZhbCk7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBsb25nLmdldCh0aGlzLCBcImFyaWEtY29sY291bnRcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogRGVmaW5lcyBhbiBlbGVtZW50J3MgY29sdW1uIGluZGV4IG9yIHBvc2l0aW9uIHdpdGggcmVzcGVjdCB0byB0aGUgdG90YWwgbnVtYmVyIG9mIGNvbHVtbnMgXG5cdFx0ICogd2l0aGluIGEge0BsaW5rIFRhYmxlfSwge0BsaW5rIEdyaWR9LCBvciB7QGxpbmsgVHJlZWdyaWR9LlxuXHRcdCAqIFxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI2NvbENvdW50fVxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI2NvbFNwYW59XG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWNvbGluZGV4XG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAdHlwZSB7P0ludGVnZXJ9XG5cdFx0ICovXG5cdFx0XCJjb2xJbmRleFwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHZhbCkgeyByZXR1cm4gbG9uZy5zZXQodGhpcywgXCJhcmlhLWNvbGluZGV4XCIsIHZhbCk7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBsb25nLmdldCh0aGlzLCBcImFyaWEtY29saW5kZXhcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogRGVmaW5lcyB0aGUgbnVtYmVyIG9mIGNvbHVtbnMgc3Bhbm5lZCBieSBhIGNlbGwgb3IgZ3JpZGNlbGxcblx0XHQgKiB3aXRoaW4gYSB7QGxpbmsgVGFibGV9LCB7QGxpbmsgR3JpZH0sIG9yIHtAbGluayBUcmVlZ3JpZH0uXG5cdFx0ICogXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjY29sSW5kZXh9XG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjcm93U3Bhbn1cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtY29sc3BhblxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHR5cGUgez9JbnRlZ2VyfVxuXHRcdCAqL1xuXHRcdFwiY29sU3BhblwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHZhbCkgeyByZXR1cm4gbG9uZy5zZXQodGhpcywgXCJhcmlhLWNvbHNwYW5cIiwgdmFsKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGxvbmcuZ2V0KHRoaXMsIFwiYXJpYS1jb2xzcGFuXCIpOyB9XG5cdFx0fSxcblx0XHRcdFxuXHRcdC8qKlxuXHRcdCAqIERlZmluZXMgYW4gZWxlbWVudCdzIG51bWJlciBvciBwb3NpdGlvbiBpbiB0aGUgY3VycmVudCBzZXQgb2Yge0BsaW5rIGxpc3RpdGVtfXMgb3Ige0BsaW5rIHRyZWVpdGVtfXMuXG5cdFx0ICogTm90IHJlcXVpcmVkIGlmIGFsbCBlbGVtZW50cyBpbiB0aGUgc2V0IGFyZSBwcmVzZW50IGluIHRoZSBET00uXG5cdFx0ICogXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjc2V0U2l6ZX1cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtcG9zaW5zZXRcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEB0eXBlIHs/SW50ZWdlcn1cblx0XHQgKi9cblx0XHRcInBvc0luU2V0XCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQodmFsKSB7IHJldHVybiBsb25nLnNldCh0aGlzLCBcImFyaWEtcG9zaW5zZXRcIiwgdmFsKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGxvbmcuZ2V0KHRoaXMsIFwiYXJpYS1wb3NpbnNldFwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBEZWZpbmVzIHRoZSB0b3RhbCBudW1iZXIgb2Ygcm93cyBpbiBhIHtAbGluayBUYWJsZX0sIHtAbGluayBHcmlkfSwgb3Ige0BsaW5rIFRyZWVncmlkfS5cblx0XHQgKiBcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNyb3dJbmRleH1cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtcm93Y291bnRcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHR5cGUgez9JbnRlZ2VyfVxuXHRcdCAqL1xuXHRcdFwicm93Q291bnRcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldCh2YWwpIHsgcmV0dXJuIGxvbmcuc2V0KHRoaXMsIFwiYXJpYS1yb3djb3VudFwiLCB2YWwpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gbG9uZy5nZXQodGhpcywgXCJhcmlhLXJvd2NvdW50XCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIERlZmluZXMgYW4gZWxlbWVudCdzIHJvdyBpbmRleCBvciBwb3NpdGlvbiB3aXRoIHJlc3BlY3QgdG8gdGhlIHRvdGFsIG51bWJlciBvZiByb3dzIFxuXHRcdCAqIHdpdGhpbiBhICB7QGxpbmsgVGFibGV9LCB7QGxpbmsgR3JpZH0sIG9yIHtAbGluayBUcmVlZ3JpZH0uXG5cdFx0ICogXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjcm93Q291bnR9XG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjcm93U3Bhbn1cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtcm93aW5kZXhcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEB0eXBlIHs/SW50ZWdlcn1cblx0XHQgKi9cblx0XHRcInJvd0luZGV4XCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQodmFsKSB7IHJldHVybiBsb25nLnNldCh0aGlzLCBcImFyaWEtcm93aW5kZXhcIiwgdmFsKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGxvbmcuZ2V0KHRoaXMsIFwiYXJpYS1yb3dpbmRleFwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBEZWZpbmVzIHRoZSBudW1iZXIgb2Ygcm93cyBzcGFubmVkIGJ5IGEgY2VsbCBvciBncmlkY2VsbFxuXHRcdCAqIHdpdGhpbiBhIHtAbGluayBUYWJsZX0sIHtAbGluayBHcmlkfSwgb3Ige0BsaW5rIFRyZWVncmlkfS5cblx0XHQgKiBcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNyb3dJbmRleH1cblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNjb2xTcGFufVxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1yb3dzcGFuXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAdHlwZSB7P0ludGVnZXJ9XG5cdFx0ICovXG5cdFx0XCJyb3dTcGFuXCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQodmFsKSB7IHJldHVybiBsb25nLnNldCh0aGlzLCBcImFyaWEtcm93c3BhblwiLCB2YWwpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gbG9uZy5nZXQodGhpcywgXCJhcmlhLXJvd3NwYW5cIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogRGVmaW5lcyB0aGUgbnVtYmVyIG9mIGl0ZW1zIGluIHRoZSBjdXJyZW50IHNldCBvZiBsaXN0aXRlbXMgb3IgdHJlZWl0ZW1zLlxuXHRcdCAqIE5vdCByZXF1aXJlZCBpZiAqKmFsbCoqIGVsZW1lbnRzIGluIHRoZSBzZXQgYXJlIHByZXNlbnQgaW4gdGhlIERPTS5cblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNwb3NJblNldH1cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtc2V0c2l6ZVxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHR5cGUgez9JbnRlZ2VyfVxuXHRcdCAqL1xuXHRcdFwic2V0U2l6ZVwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHZhbCkgeyByZXR1cm4gbG9uZy5zZXQodGhpcywgXCJhcmlhLXNldHNpemVcIiwgdmFsKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGxvbmcuZ2V0KHRoaXMsIFwiYXJpYS1zZXRzaXplXCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIERlZmluZXMgdGhlIGhpZXJhcmNoaWNhbCBsZXZlbCBvZiBhbiBlbGVtZW50IHdpdGhpbiBhIHN0cnVjdHVyZS5cblx0XHQgKiBFLmcuIGAmbHQ7aDEmZ3Q7Jmx0O2gxLyZndDtgIGVxdWFscyBgJmx0O2RpdiByb2xlPVwiaGVhZGluZ1wiIGFyaWEtbGV2ZWw9XCIxXCImZ3Q7Jmx0Oy9kaXY+YFxuXHRcdCAqIFxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1sZXZlbFxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHR5cGUgez9JbnRlZ2VyfVxuXHRcdCAqL1xuXHRcdFwibGV2ZWxcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldCh2YWwpIHsgcmV0dXJuIGxvbmcuc2V0KHRoaXMsIFwiYXJpYS1sZXZlbFwiLCB2YWwpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gbG9uZy5nZXQodGhpcywgXCJhcmlhLWxldmVsXCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqIEVORCBPRiBDT0xMRUNUSU9OUyAqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXHR9XG4pO1xuXG5mdW5jdGlvbiBzZXRBY2Nlc3NpYmxlTm9kZShheSwgYXR0cmlidXRlLCBhbikge1xuXHRpZiAoIWFuKSByZXR1cm4gYXkuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlKTtcblxuXHRpZiAoIShhbiBpbnN0YW5jZW9mIEFjY2Vzc2libGVOb2RlKSkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkl0IG11c3QgYmUgYW4gaW5zdGFuY2Ugb2YgQWNjZXNzaWJsZU5vZGVcIik7XG5cdH1cblx0aWYgKCFhbi5lbGVtZW50LmlkKSB7IHRocm93IG5ldyBFcnJvcihcIkVsZW1lbnQgbXVzdCBoYXZlIGFuIElEXCIpOyB9XG5cblx0YXkuZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlLCBhbi5lbGVtZW50LmlkKTtcbn1cbmZ1bmN0aW9uIGdldEFjY2Vzc2libGVOb2RlKGF5LCBhdHRyaWJ1dGUpIHtcblx0dmFyIGlkID0gYXkuZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcblx0aWYgKCFpZCkgcmV0dXJuO1xuXG5cdHJldHVybiBlbGVtZW50cy5nZXQoYXkuZWxlbWVudC5vd25lckRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFjY2Vzc2libGVOb2RlOyIsImltcG9ydCBlbGVtZW50cyBmcm9tIFwiLi4vdXRpbHMvZWxlbWVudHNcIjtcclxuaW1wb3J0IEFjY2Vzc2libGVOb2RlIGZyb20gXCIuL0FjY2Vzc2libGVOb2RlXCI7XHJcbmltcG9ydCBjcmVhdGUgZnJvbSBcIi4vLi4vdXRpbHMvY3JlYXRlXCI7XHJcblxyXG5jbGFzcyBBY2Nlc3NpYmxlTm9kZUxpc3RDb24gZXh0ZW5kcyBBcnJheSB7XHJcblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xyXG5cdFx0c3VwZXIoLi4uYXJncyk7XHJcblx0fVxyXG5cclxuXHRpdGVtKGluZGV4KSB7XHJcblx0XHRyZXR1cm4gdGhpc1tpbmRleF07XHJcblx0fVxyXG5cclxuXHRhZGQoQWNjZXNzaWJsZU5vZGUsIGJlZm9yZSA9IG51bGwpIHtcclxuXHRcdGlmKGJlZm9yZSAhPT0gbnVsbCkge1xyXG5cdFx0XHR2YXIgYmVmb3JlSW5kZXggPSB0aGlzLmluZGV4T2YoYmVmb3JlKTtcclxuXHRcdFx0aWYoYmVmb3JlSW5kZXggPiAtMSkge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLnNwbGljZShiZWZvcmVJbmRleCAtIDEsIDAsIEFjY2Vzc2libGVOb2RlKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMucHVzaChBY2Nlc3NpYmxlTm9kZSk7XHJcblx0fVxyXG5cclxuXHRyZW1vdmUoaW5kZXgpIHtcclxuXHRcdHJldHVybiB0aGlzLnBvcChpbmRleCk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRJZHMobm9kZSwgYXR0cmlidXRlKSB7XHJcblx0bGV0IGlkU3RyaW5nID0gbm9kZS5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcclxuXHRcclxuXHRpZiAoIWlkU3RyaW5nKSByZXR1cm4gbmV3IEFjY2Vzc2libGVOb2RlTGlzdENvbigpO1xyXG5cclxuXHRyZXR1cm4gbmV3IEFjY2Vzc2libGVOb2RlTGlzdENvbihpZFN0cmluZy5zcGxpdChcIiBcIikpO1xyXG59XHJcblxyXG4vKipcclxuICogXHJcbiAqL1xyXG5mdW5jdGlvbiBBY2Nlc3NpYmxlTm9kZUxpc3QoYXksIGF0dHJpYnV0ZSkge1xyXG5cdC8vIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcclxuXHQvLyBcdF9lbGVtZW50OiB7IHZhbHVlOiBheS5lbGVtZW50LCBlbnVtZXJhYmxlOiBmYWxzZSB9LFxyXG5cdC8vIFx0X2F0dHI6IHsgdmFsdWU6IGF0dHJpYnV0ZSwgZW51bWVyYWJsZTogZmFsc2UgfVxyXG5cdC8vIH0pO1xyXG5cclxuXHQvLyB0aGlzLl92YWx1ZSA9IHRoaXMuX2VsZW1lbnQuZ2V0QXR0cmlidXRlKHRoaXMuX2F0dHIpO1xyXG5cdC8vIGlmKCF0aGlzLl92YWx1ZSkgdGhpcy5fdmFsdWUgPSBcIlwiO1xyXG5cdGxldCBpZHMgPSBnZXRJZHMoYXkuZWxlbWVudCwgYXR0cmlidXRlKTtcclxuXHJcblx0Ly8gLy8gVGhlIHJlc3VsdCBjYW4gYmUgYWNjZXNzZWQgdGhyb3VnaCB0aGUgYG1gLXZhcmlhYmxlLlxyXG5cdC8vIGlkcy5mb3JFYWNoKChpZCkgPT4ge1xyXG5cdC8vIFx0dmFyIGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG5cdC8vIFx0aWYoZWxlbWVudHMuaGFzKGVsKSkge1xyXG5cdC8vIFx0XHR0aGlzLmFkZChlbGVtZW50cy5nZXQoZWwpKTtcclxuXHQvLyBcdH0gZWxzZSB7XHJcblx0Ly8gXHRcdGVsZW1lbnRzLnNldChlbCwgbmV3IEFjY2Vzc2libGVOb2RlLmRlZmF1bHQoZWwpKTtcclxuXHQvLyBcdFx0dGhpcy5hZGQoZWxlbWVudHMuZ2V0KGVsKSk7XHJcblx0Ly8gXHRcdC8vIGRlYnVnZ2VyO1xyXG5cdC8vIFx0XHQvLyB0b2RvOiBjcmVhdGUgbmV3IGluc3RhbmNlIGFuZCByZXR1cm4gdGhhdCAuXHJcblx0Ly8gXHR9XHJcblx0Ly8gfSk7XHJcblxyXG5cdHZhciBhcnJheUNoYW5nZUhhbmRsZXIgPSB7XHJcblx0XHRnZXQ6IGZ1bmN0aW9uICh0YXJnZXQsIHByb3BlcnR5KSB7XHJcblx0XHRcdC8vIGVsZW1lbnQgaXMgcmVxdWVzdGVkIHRyb3VnaHQgdGFyZ2V0W051bWJlcl1cclxuXHRcdFx0aWYgKCFpc05hTihwcm9wZXJ0eSkgJiYgdGFyZ2V0W3Byb3BlcnR5XSkge1xyXG5cdFx0XHRcdGxldCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldFtwcm9wZXJ0eV0pO1xyXG5cclxuXHRcdFx0XHRpZighZWwpIHtcclxuXHRcdFx0XHRcdC8vIHRocm93IG5ldyBFcnJvcihcIkVsZW1lbnQgbm90IGZvdW5kXCIpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0bGV0IGF1dG90aWxpdHk7XHJcblx0XHRcdFx0Ly8gcHJvcGVydHkgaXMgaW5kZXggaW4gdGhpcyBjYXNlXHJcblx0XHRcdFx0aWYgKGVsKSB7IGF1dG90aWxpdHkgPSBlbGVtZW50cy5nZXQoZWwpOyB9XHJcblx0XHRcdFx0aWYoIWF1dG90aWxpdHkpIHsgYXV0b3RpbGl0eSA9IGNyZWF0ZS5vbmUoZWwpOyB9XHJcblx0XHRcdFx0cmV0dXJuIGF1dG90aWxpdHk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0YXJnZXRbcHJvcGVydHldO1xyXG5cdFx0fSxcclxuXHRcdHNldDogZnVuY3Rpb24gKHRhcmdldCwgcHJvcGVydHksIHZhbHVlKSB7XHJcblx0XHRcdC8vIGFkZGluZyBvciBjaGFuZ2luZyBhIHZhbHVlIGluc2lkZSB0aGUgYXJyYXlcclxuXHRcdFx0aWYgKCFpc05hTihwcm9wZXJ0eSkpIHtcclxuXHRcdFx0XHQvLyBpcyBvZiB2YWxpZCB0eXBlXHJcblx0XHRcdFx0aWYgKHZhbHVlIGluc3RhbmNlb2YgQWNjZXNzaWJsZU5vZGUpIHtcclxuXHRcdFx0XHRcdGlmKCF2YWx1ZS5lbGVtZW50LmlkKSB7XHJcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlRoZSBlbGVtZW50IG11c3QgaGF2ZSBhbiBJRFwiKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHRhcmdldFtwcm9wZXJ0eV0gPSB2YWx1ZS5lbGVtZW50LmlkO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIk9ubHkgaW5zdGFuY2VzIG9mIEFjY2Vzc2libGVOb2RlIGFyZSBhbGxvd2VkXCIpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHR0YXJnZXRbcHJvcGVydHldID0gdmFsdWU7XHJcblx0XHRcdC8vIHlvdSBoYXZlIHRvIHJldHVybiB0cnVlIHRvIGFjY2VwdCB0aGUgY2hhbmdlc1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHR9O1xyXG5cdFxyXG5cdHJldHVybiBuZXcgUHJveHkoaWRzLCBhcnJheUNoYW5nZUhhbmRsZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBY2Nlc3NpYmxlTm9kZUxpc3Q7IiwiZXhwb3J0IGNvbnN0IElTX0FDVElWRSA9IFwidHJ1ZVwiLCBJU19OT1RfQUNUSVZFID0gXCJmYWxzZVwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldChheSwgYXR0cmlidXRlTmFtZSkge1xyXG5cdGlmKCFheS5lbGVtZW50Lmhhc0F0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKSkgcmV0dXJuO1xyXG5cdHJldHVybiBheS5lbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldChheSwgYXR0cmlidXRlTmFtZSwgc3RhdHVzKSB7XHJcblx0aWYoc3RhdHVzID09IHVuZGVmaW5lZCkge1xyXG5cdFx0YXkuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGF5LmVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUsIHN0YXR1cyk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gc3RhdHVzO1xyXG59XHJcblxyXG4vKipcclxuKiBSZXR1cm5zIHRoZSBvcHBvc2l0ZSBzdGF0ZSBvZiB0aGUgYXR0cmlidXRlXHJcbiogQHJldHVybiB7U3RyaW5nfSBOZXcgc3RhdGVcclxuKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZShzdGF0ZSkge1xyXG5cdGlmIChzdGF0ZSA9PSBJU19BQ1RJVkUpIHtcclxuXHRcdHN0YXRlID0gSVNfTk9UX0FDVElWRTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0c3RhdGUgPSBJU19BQ1RJVkU7XHJcblx0fVxyXG5cdHJldHVybiBzdGF0ZTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBJU19BQ1RJVkUsIElTX05PVF9BQ1RJVkUsIGdldCwgc2V0LCB0b2dnbGUgfTsiLCJleHBvcnQgY29uc3QgSVNfQUNUSVZFID0gdHJ1ZSwgSVNfTk9UX0FDVElWRSA9IGZhbHNlO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldChheSwgYXR0cmlidXRlTmFtZSkge1xyXG5cdGlmKCFheS5lbGVtZW50Lmhhc0F0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKSkgcmV0dXJuO1xyXG5cdHJldHVybiBheS5lbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKSAgPT0gXCJ0cnVlXCIgfHwgZmFsc2U7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXQoYXksIGF0dHJpYnV0ZU5hbWUsIHN0YXR1cykge1xyXG5cdGlmKHN0YXR1cyA9PSB1bmRlZmluZWQpIHtcclxuXHRcdGF5LmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRheS5lbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lLCBzdGF0dXMpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHN0YXR1cztcclxufVxyXG5cclxuLyoqXHJcbiogUmV0dXJucyB0aGUgb3Bwb3NpdGUgc3RhdGUgb2YgdGhlIGF0dHJpYnV0ZVxyXG4qIEByZXR1cm4ge0Jvb2xlYW59IE5ldyBzdGF0ZVxyXG4qL1xyXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlKHN0YXRlKSB7XHJcblx0aWYgKHN0YXRlID09IElTX0FDVElWRSkge1xyXG5cdFx0c3RhdGUgPSBJU19OT1RfQUNUSVZFO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRzdGF0ZSA9IElTX0FDVElWRTtcclxuXHR9XHJcblx0cmV0dXJuIHN0YXRlO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IElTX0FDVElWRSwgSVNfTk9UX0FDVElWRSwgZ2V0LCBzZXQsIHRvZ2dsZSB9OyIsImV4cG9ydCBmdW5jdGlvbiBnZXQoYXV0b3RpbGl0eSwgYXR0cmlidXRlTmFtZSkge1xyXG5cdGlmKCFhdXRvdGlsaXR5LmVsZW1lbnQuaGFzQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpKSByZXR1cm4gbnVsbDtcclxuXHJcblx0dmFyIGF0dHJWYWx1ZSA9IGF1dG90aWxpdHkuZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XHJcblx0aWYoYXR0clZhbHVlID09PSBudWxsKSByZXR1cm4gbnVsbDtcclxuXHJcblx0cmV0dXJuIE51bWJlcihhdHRyVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0KGF1dG90aWxpdHksIGF0dHJpYnV0ZU5hbWUsIHN0cikge1xyXG5cdGlmKHN0ciA9PSBudWxsKSB7XHJcblx0XHRhdXRvdGlsaXR5LmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRhdXRvdGlsaXR5LmVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUsIHN0cik7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IGdldCwgc2V0IH07IiwiZXhwb3J0IGZ1bmN0aW9uIGdldChheSwgYXR0cmlidXRlTmFtZSkge1xyXG5cdGlmICghYXkuZWxlbWVudC5oYXNBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSkpIHJldHVybiBudWxsO1xyXG5cclxuXHR2YXIgYXR0clZhbHVlID0gYXkuZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XHJcblx0aWYgKGF0dHJWYWx1ZSA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XHJcblxyXG5cdHJldHVybiBOdW1iZXIoYXR0clZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldChheSwgYXR0cmlidXRlTmFtZSwgc3RyKSB7XHJcblx0aWYgKHN0ciA9PSBudWxsKSB7XHJcblx0XHRheS5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0YXkuZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgc3RyKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgZ2V0LCBzZXQgfTsiLCJpbXBvcnQgY3JlYXRlIGZyb20gXCIuL2NyZWF0ZVwiO1xuXG4vKipcbiAqIFxuICovXG5jbGFzcyBWYWxpZGl0eVN0YXRlIHtcblx0Y29uc3RydWN0b3IoYXkpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJfYXlcIiwge1xuXHRcdFx0dmFsdWU6IGF5XG5cdFx0fSk7XG5cdH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoVmFsaWRpdHlTdGF0ZS5wcm90b3R5cGUsXG5cdC8qKiBAbGVuZHMgVmFsaWRpdHlTdGF0ZS5wcm90b3R5cGUgKi9cblx0e1xuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdXNlciBoYXMgcHJvdmlkZWQgaW5wdXQgaW4gdGhlIHVzZXIgaW50ZXJmYWNlIHRoYXQgdGhlIFxuXHRcdCAqIHVzZXIgYWdlbnQgaXMgdW5hYmxlIHRvIGNvbnZlcnQgdG8gYSB2YWx1ZTsgZmFsc2Ugb3RoZXJ3aXNlLlxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxuXHRcdCAqL1xuXHRcdGJhZElucHV0OiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRpZiAoKChjcmVhdGUuaW5zdGFuY2VPZih0aGlzLl9heSwgXCJzcGluYnV0dG9uXCIpIHx8IGNyZWF0ZS5pbnN0YW5jZU9mKHRoaXMuX2F5LCBcInNsaWRlclwiKSlcblx0XHRcdFx0XHQmJiB0aGlzLl9heS52YWx1ZU5vdy5sZW5ndGggPiAwICYmICEvXlstK10/KD86XFxkK3xcXGQqWy4sXVxcZCspJC8udGVzdCh0aGlzLl9heS52YWx1ZU5vdykpXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW50IGhhcyBhIGN1c3RvbSBlcnJvcjsgZmFsc2Ugb3RoZXJ3aXNlLlxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxuXHRcdCAqL1x0XG5cdFx0Y3VzdG9tRXJyb3I6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQoKSB7IHJldHVybiAhIXRoaXMuX2N1c3RvbUVycm9yOyB9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudOKAmXMgdmFsdWUgZG9lc27igJl0IG1hdGNoIHRoZSBwcm92aWRlZCBwYXR0ZXJuOyBmYWxzZSBvdGhlcndpc2UuXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0cGF0dGVybk1pc21hdGNoOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0KCkge1xuXHRcdFx0XHR2YXIgdmFsdWUgPSB0aGlzLl9heS5fLmlucHV0ID8gdGhpcy5fYXkuXy5pbnB1dC52YWx1ZSA6IHRoaXMuX2F5LnZhbHVlTm93O1xuXHRcdFx0XHRpZiAodGhpcy5fYXkuXy5pbnB1dC5wYXR0ZXJuICYmIHZhbHVlLmxlbmd0aCA+IDAgJiYgbmV3IFJlZ0V4cCh0aGlzLl9heS5fLmlucHV0LnBhdHRlcm4pLnRlc3QodmFsdWUpID09PSBmYWxzZSkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW504oCZcyB2YWx1ZSBpcyBoaWdoZXIgdGhhbiB0aGUgcHJvdmlkZWQgbWF4aW11bTsgZmFsc2Ugb3RoZXJ3aXNlLlxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxuXHRcdCAqL1xuXHRcdHJhbmdlT3ZlcmZsb3c6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQoKSB7XG5cdFx0XHRcdGlmICh0aGlzLl9heS52YWx1ZU5vdyAmJiB0aGlzLl9heS52YWx1ZU1heCAmJiB0aGlzLl9heS52YWx1ZU5vdyA+IHRoaXMuX2F5LnZhbHVlTWF4KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudOKAmXMgdmFsdWUgaXMgbG93ZXIgdGhhbiB0aGUgcHJvdmlkZWQgbWluaW11bTsgZmFsc2Ugb3RoZXJ3aXNlLlxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxuXHRcdCAqL1xuXHRcdHJhbmdlVW5kZXJmbG93OiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRpZiAodGhpcy5fYXkudmFsdWVOb3cgJiYgdGhpcy5fYXkudmFsdWVNaW4gJiYgdGhpcy5fYXkudmFsdWVOb3cgPCB0aGlzLl9heS52YWx1ZU1pbikge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnTigJlzIHZhbHVlIGRvZXNu4oCZdCBmaXQgdGhlIHJ1bGVzIGdpdmVuIGJ5IHRoZSBzdGVwIGF0dHJpYnV0ZTsgZmFsc2Ugb3RoZXJ3aXNlLlxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxuXHRcdCAqL1xuXHRcdHN0ZXBNaXNtYXRjaDoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldCgpIHtcblx0XHRcdFx0aWYgKHRoaXMuX2F5Ll8ucmFuZ2UgJiYgdGhpcy5fYXkuXy5yYW5nZS5zdGVwICYmIHRoaXMuX2F5LnZhbHVlTm93ICUgdGhpcy5fYXkuXy5yYW5nZS5zdGVwICE9PSAwKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudOKAmXMgdmFsdWUgaXMgbG9uZ2VyIHRoYW4gdGhlIHByb3ZpZGVkIG1heGltdW0gbGVuZ3RoOyBmYWxzZSBvdGhlcndpc2UuXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0dG9vTG9uZzoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldCgpIHtcblx0XHRcdFx0dmFyIHZhbHVlID0gdGhpcy5fYXkuXy5pbnB1dCA/IHRoaXMuX2F5Ll8uaW5wdXQudmFsdWUgOiB0aGlzLl9heS52YWx1ZU5vdztcblx0XHRcdFx0aWYgKHRoaXMuX2F5Lm1heGxlbmd0aCAmJiB2YWx1ZS5sZW5ndGggPiB0aGlzLl9heS5tYXhsZW5ndGgpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnTigJlzIHZhbHVlLCBpZiBpdCBpcyBub3QgdGhlIGVtcHR5IHN0cmluZywgaXMgc2hvcnRlciB0aGFuIHRoZSBwcm92aWRlZCBtaW5pbXVtIGxlbmd0aDsgZmFsc2Ugb3RoZXJ3aXNlLlxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxuXHRcdCAqL1xuXHRcdHRvb1Nob3J0OiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0KCkge1xuXHRcdFx0XHR2YXIgdmFsdWUgPSB0aGlzLl9heS5fLmlucHV0ID8gdGhpcy5fYXkuXy5pbnB1dC52YWx1ZSA6IHRoaXMuX2F5LnZhbHVlTm93O1xuXHRcdFx0XHRpZiAodGhpcy5fYXkubWlubGVuZ3RoICYmIHZhbHVlLmxlbmd0aCA8IHRoaXMuX2F5Lm1pbmxlbmd0aCkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudOKAmXMgdmFsdWUgaXMgbm90IGluIHRoZSBjb3JyZWN0IHN5bnRheDsgZmFsc2Ugb3RoZXJ3aXNlLlxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxuXHRcdCAqL1xuXHRcdHR5cGVNaXNtYXRjaDogeyBcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQoKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnQgaGFzIG5vIHZhbHVlIGJ1dCBpcyBhIHJlcXVpcmVkIGZpZWxkOyBmYWxzZSBvdGhlcndpc2UuXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0dmFsdWVNaXNzaW5nOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0KCkge1xuXHRcdFx0XHR2YXIgdmFsdWUgPSB0aGlzLl9heS5fLmlucHV0ID8gdGhpcy5fYXkuXy5pbnB1dC52YWx1ZSA6IHRoaXMuX2F5LnZhbHVlTm93O1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0dGhpcy5yZXF1aXJlZFxuXHRcdFx0XHRcdCYmIChcblx0XHRcdFx0XHRcdCgoY3JlYXRlLmluc3RhbmNlT2YodGhpcy5fYXksIFwiY2hlY2tib3hcIikgfHwgY3JlYXRlLmluc3RhbmNlT2YodGhpcy5fYXksIFwicmFkaW9cIilcblx0XHRcdFx0XHRcdFx0fHwgY3JlYXRlLmluc3RhbmNlT2YodGhpcy5fYXksIFwib3B0aW9uXCIpKSAmJiAhdGhpcy5fYXkuY2hlY2tlZClcblx0XHRcdFx0XHRcdHx8IChjcmVhdGUuaW5zdGFuY2VPZih0aGlzLl9heSwgXCJzZWxlY3RcIikgJiYgIXZhbHVlKVxuXHRcdFx0XHRcdFx0fHwgKChjcmVhdGUuaW5zdGFuY2VPZih0aGlzLl9heSwgXCJpbnB1dFwiKSB8fCBjcmVhdGUuaW5zdGFuY2VPZih0aGlzLl9heSwgXCJncmlkY2VsbFwiKSkgJiYgIXZhbHVlID4gMClcblx0XHRcdFx0XHQpXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnTigJlzIHZhbHVlIGhhcyBubyB2YWxpZGl0eSBwcm9ibGVtczsgZmFsc2Ugb3RoZXJ3aXNlXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0dmFsaWQ6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQoKSB7XG5cdFx0XHRcdHJldHVybiAhKFxuXHRcdFx0XHRcdHRoaXMuYmFkSW5wdXQgfHxcblx0XHRcdFx0XHR0aGlzLmN1c3RvbUVycm9yIHx8XG5cdFx0XHRcdFx0dGhpcy5wYXR0ZXJuTWlzbWF0Y2ggfHxcblx0XHRcdFx0XHR0aGlzLnJhbmdlT3ZlcmZsb3cgfHxcblx0XHRcdFx0XHR0aGlzLnJhbmdlVW5kZXJmbG93IHx8XG5cdFx0XHRcdFx0dGhpcy5zdGVwTWlzbWF0Y2ggfHxcblx0XHRcdFx0XHR0aGlzLnRvb0xvbmcgfHxcblx0XHRcdFx0XHR0aGlzLnRvb1Nob3J0IHx8XG5cdFx0XHRcdFx0dGhpcy50eXBlTWlzbWF0Y2ggfHxcblx0XHRcdFx0XHR0aGlzLnZhbHVlTWlzc2luZ1xuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgVmFsaWRpdHlTdGF0ZTsiLCJpbXBvcnQgc2VsZWN0b3IgZnJvbSBcIi4vc2VsZWN0b3JcIjtcbmltcG9ydCBlbGVtZW50cyBmcm9tIFwiLi9lbGVtZW50c1wiO1xuaW1wb3J0IGdldENvbXB1dGVkUm9sZSBmcm9tIFwiLi9nZXRDb21wdXRlZFJvbGVcIjtcblxuaW1wb3J0IFJhbmdlIGZyb20gXCIuLy4uL3JvbGUvYWJzdHJhY3QvUmFuZ2VcIjtcbmltcG9ydCBSb2xldHlwZSBmcm9tIFwiLi8uLi9yb2xlL2Fic3RyYWN0L1JvbGV0eXBlXCI7XG5cbmltcG9ydCBCdXR0b24gZnJvbSBcIi4vLi4vcm9sZS9CdXR0b25cIjtcbmltcG9ydCBDaGVja2JveCBmcm9tIFwiLi8uLi9yb2xlL0NoZWNrYm94XCI7XG5pbXBvcnQgQ29tYm9ib3ggZnJvbSBcIi4vLi4vcm9sZS9Db21ib2JveFwiO1xuaW1wb3J0IERpYWxvZyBmcm9tIFwiLi8uLi9yb2xlL0RpYWxvZ1wiO1xuaW1wb3J0IEZvcm0gZnJvbSBcIi4vLi4vcm9sZS9Gb3JtXCI7XG5pbXBvcnQgTGluayBmcm9tIFwiLi8uLi9yb2xlL0xpbmtcIjtcbmltcG9ydCBMaXN0Ym94IGZyb20gXCIuLy4uL3JvbGUvTGlzdGJveFwiO1xuaW1wb3J0IE9wdGlvbiBmcm9tIFwiLi8uLi9yb2xlL29wdGlvblwiO1xuaW1wb3J0IFNlYXJjaGJveCBmcm9tIFwiLi8uLi9yb2xlL3NlYXJjaGJveFwiO1xuaW1wb3J0IFNsaWRlciBmcm9tIFwiLi8uLi9yb2xlL1NsaWRlclwiO1xuaW1wb3J0IFNwaW5idXR0b24gZnJvbSBcIi4vLi4vcm9sZS9TcGluYnV0dG9uXCI7XG5pbXBvcnQgU3dpdGNoIGZyb20gXCIuLy4uL3JvbGUvU3dpdGNoXCI7XG5pbXBvcnQgVGFiIGZyb20gXCIuLy4uL3JvbGUvVGFiXCI7XG5pbXBvcnQgVGFibGlzdCBmcm9tIFwiLi8uLi9yb2xlL1RhYmxpc3RcIjtcbmltcG9ydCBUYWJwYW5lbCBmcm9tIFwiLi8uLi9yb2xlL1RhYnBhbmVsXCI7XG5pbXBvcnQgVGV4dGJveCBmcm9tIFwiLi8uLi9yb2xlL1RleHRib3hcIjtcblxudmFyIG9iaiA9IHsgYnV0dG9uOiBCdXR0b24sIGNoZWNrYm94OiBDaGVja2JveCwgY29tYm9ib3g6IENvbWJvYm94LCBkaWFsb2c6IERpYWxvZywgZm9ybTogRm9ybSwgbGlzdGJveDogTGlzdGJveCwgXG5cdG9wdGlvbnM6IE9wdGlvbiwgcmFuZ2U6IFJhbmdlLCByb2xldHlwZTogUm9sZXR5cGUsIHNlYXJjaGJveDogU2VhcmNoYm94LCBzbGlkZXI6IFNsaWRlciwgc3BpbmJ1dHRvbjogU3BpbmJ1dHRvbixcblx0dGFiOiBUYWIsIHRhYmxpc3Q6IFRhYmxpc3QsIHRhYnBhbmVsOiBUYWJwYW5lbCwgdGV4dGJveDogVGV4dGJveCwgbGluazogTGluaywgc3dpdGNoOiBTd2l0Y2h9O1xuXG5mdW5jdGlvbiBhbGwoKSB7XG5cdGZvciAobGV0IGtleSBpbiBvYmopIHtcblx0XHR2YXIgbm9kZUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yLmdldFJvbGUoa2V5KSk7XG5cdFx0Y29uc29sZS5sb2coa2V5LCBub2RlTGlzdCk7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBub2RlTGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0ZWxlbWVudHMuc2V0KG5vZGVMaXN0W2ldLCBuZXcgb2JqW2tleV0obm9kZUxpc3RbaV0pKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gb25lKGVsKSB7XG5cdGlmKGVsZW1lbnRzLmhhcyhlbCkpIHJldHVybiBlbGVtZW50cy5nZXQoZWwpO1xuXHR2YXIgcm9sZSA9IGdldENvbXB1dGVkUm9sZShlbCk7XG5cdFxuXHQvKiogQHRvZG8gUmVtb3ZlIGZhbGxiYWNrIG1ldGhvZCAqL1xuXHR2YXIgY29uc3RydWN0b3IgPSBvYmpbcm9sZV0gfHwgUm9sZXR5cGU7XG5cblx0cmV0dXJuIGVsZW1lbnRzLnNldChlbCwgbmV3IGNvbnN0cnVjdG9yKGVsKSk7XG59XG5cbmZ1bmN0aW9uIGluc3RhbmNlT2YoYXksIHJvbGUpIHtcblx0cmV0dXJuIGF5IGluc3RhbmNlb2Ygb2JqW3JvbGVdO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7YWxsLCBvbmUsIGluc3RhbmNlT2Z9O1xuXG4vLyByb2xlcy5mb3JFYWNoKChSb2xlKSA9PiB7XG4vLyBcdHZhciBub2RlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuLy8gXHRmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4vLyBcdFx0ZWxlbWVudHMuc2V0KG5vZGVMaXN0W2ldLCBuZXcgUm9sZShub2RlTGlzdFtpXSkpO1xuLy8gXHR9XG5cbi8vIFx0Ly8gaWYocm9sZS5vcHRpb25zICYmIHJvbGUub3B0aW9ucy5zZWxlY3RvcnNXaXRoSW1wbGljaXRSb2xlKSB7XG4vLyBcdC8vIFx0dmFyIGh0bWxOb2RlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocm9sZS5vcHRpb25zLnNlbGVjdG9yc1dpdGhJbXBsaWNpdFJvbGUuam9pbihcIixcIikpO1xuLy8gXHQvLyBcdGZvciAobGV0IGogPSAwOyBqIDwgaHRtbE5vZGVMaXN0Lmxlbmd0aDsgaisrKSB7XG4vLyBcdC8vIFx0XHRlbGVtZW50cy5zZXQoaHRtbE5vZGVMaXN0W2pdLCBuZXcgcm9sZS5kZWZhdWx0KGh0bWxOb2RlTGlzdFtqXSkpO1xuLy8gXHQvLyBcdH1cbi8vIFx0Ly8gfVxuLy8gfSk7IiwiaW1wb3J0IGNyZWF0ZSBmcm9tIFwiLi9jcmVhdGVcIjtcbmltcG9ydCBnZXRDb21wdXRlZFJvbGUgZnJvbSBcIi4vZ2V0Q29tcHV0ZWRSb2xlXCI7XG5cbnZhciBheUluc3RhbmNlcyA9IG5ldyBXZWFrTWFwKCk7XG5cbi8vIHRvZG86IGxvb3AgdGhyb3VnaCBwcmVzZW50YXRpb25hbCByb2xlc1xuZXhwb3J0IGZ1bmN0aW9uIGdldFBhcmVudChheSwgc2VsZWN0b3IpIHtcblx0bGV0IGVsZW1lbnQgPSBheS5lbGVtZW50O1xuXG5cdHdoaWxlKGVsZW1lbnQucGFyZW50Tm9kZSkge1xuXHRcdGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XG5cblx0XHRpZiAoYXkuZWxlbWVudC5wYXJlbnROb2RlLm1hdGNoZXMoc2VsZWN0b3IpKSB7XG5cdFx0XHRpZiAoYXlJbnN0YW5jZXMuaGFzKGF5LmVsZW1lbnQucGFyZW50Tm9kZSkpIHtcblx0XHRcdFx0cmV0dXJuIGF5SW5zdGFuY2VzLmdldChheS5lbGVtZW50LnBhcmVudE5vZGUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGNyZWF0ZS5vbmUoYXkuZWxlbWVudC5wYXJlbnROb2RlKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZmFsc2U7XG59XG5cbi8qKiBAdG9kbyBmaW5kIG9ubHkgYGRpcmVjdGAgY2hpbGRyZW4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDaGlsZHJlbihheSwgcm9sZSkge1xuXHR2YXIgcmVzdWx0cyA9IFtdO1xuXHR2YXIgb3ducyA9IEFycmF5LmZyb20oYXkuZWxlbWVudC5jaGlsZHJlbikuY29uY2F0KGF5Lm93bnMpO1xuXG5cdG93bnMuZm9yRWFjaChjaGlsZCA9PiB7XG5cdFx0aWYgKCFyb2xlIHx8IChyb2xlICYmIGdldENvbXB1dGVkUm9sZShjaGlsZCkgPT0gcm9sZSkpIHtcblx0XHRcdGlmIChheUluc3RhbmNlcy5oYXMoY2hpbGQpKSB7XG5cdFx0XHRcdHJlc3VsdHMucHVzaChheUluc3RhbmNlcy5nZXQoY2hpbGQpKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJlc3VsdHMucHVzaChjcmVhdGUub25lKGNoaWxkKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHRyZXR1cm4gb3ducztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByZXYoY2hpbGQsIHBhcmVudCwgcm9sZSkge1xuXHRpZighcGFyZW50KSByZXR1cm4gZmFsc2U7XG5cblx0bGV0IGNoaWxkcmVuID0gZ2V0Q2hpbGRyZW4ocGFyZW50LCByb2xlKTtcblx0bGV0IGluZGV4UHJldkVsZW1lbnQgPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGNoaWxkcmVuLCBjaGlsZCkgLSAxO1xuXHRpZihpbmRleFByZXZFbGVtZW50IDwgMCkgcmV0dXJuIGZhbHNlO1xuXG5cdHJldHVybiBjaGlsZHJlbltpbmRleFByZXZFbGVtZW50XTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE5leHQoY2hpbGQsIHBhcmVudCwgcm9sZSkge1xuXHRpZighcGFyZW50KSByZXR1cm4gZmFsc2U7XG5cblx0bGV0IGNoaWxkcmVuID0gZ2V0Q2hpbGRyZW4ocGFyZW50LCByb2xlKTtcblx0bGV0IGluZGV4TmV4dCA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoY2hpbGRyZW4sIGNoaWxkKSArIDE7XG5cdGlmKGluZGV4TmV4dCA+PSBjaGlsZHJlbi5sZW5ndGgpIHJldHVybiBmYWxzZTtcblxuXHRyZXR1cm4gY2hpbGRyZW5baW5kZXhOZXh0XTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0YXJ0KGNoaWxkLCBwYXJlbnQsIHJvbGUpIHtcblx0aWYoIXBhcmVudCkgcmV0dXJuIGZhbHNlO1xuXHRsZXQgY2hpbGRyZW4gPSBnZXRDaGlsZHJlbihwYXJlbnQsIHJvbGUpO1xuXHRyZXR1cm4gY2hpbGRyZW5bMF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbmQoY2hpbGQsIHBhcmVudCwgcm9sZSkge1xuXHRpZighcGFyZW50KSByZXR1cm4gZmFsc2U7XG5cdGxldCBjaGlsZHJlbiA9IGdldENoaWxkcmVuKHBhcmVudCwgcm9sZSk7XG5cdHJldHVybiBjaGlsZHJlbltjaGlsZHJlbi5sZW5ndGggLSAxXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuXHRtYXA6IGF5SW5zdGFuY2VzLFxuXHRnZXQ6IGF5SW5zdGFuY2VzLmdldC5iaW5kKGF5SW5zdGFuY2VzKSxcblx0c2V0OiBheUluc3RhbmNlcy5zZXQuYmluZChheUluc3RhbmNlcyksXG5cdGhhczogYXlJbnN0YW5jZXMuaGFzLmJpbmQoYXlJbnN0YW5jZXMpLFxuXHRnZXRDaGlsZHJlbixcblx0Z2V0UGFyZW50LFxuXHRnZXRQcmV2LFxuXHRnZXROZXh0LFxuXHRnZXRTdGFydCxcblx0Z2V0RW5kXG59OyIsImltcG9ydCBlbGVtZW50cyBmcm9tIFwiLi9lbGVtZW50c1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XHJcblx0bGV0IGF5ID0gZWxlbWVudHMuZ2V0KGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xyXG5cclxuXHRpZighYXkpIHJldHVybjtcclxuXHRpZihheS5hY3RpdmVEZXNjZW5kYW50KSByZXR1cm4gYXkuYWN0aXZlRGVzY2VuZGFudDtcclxuXHJcblx0cmV0dXJuIGF5O1xyXG59IiwiLyoqXHJcbiAqIEZvbGxvd3MgaHR0cHM6Ly93d3cudzMub3JnL1RSLzIwMTcvV0QtaHRtbC1hcmlhLTIwMTcxMDEzLyNkb2Njb25mb3JtYW5jZVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBBbGwgYXJpYSByb2xlc1xyXG4gKiBAdHlwZSB7QXJyYXl9XHJcbiovXHJcbmltcG9ydCByb2xlcyBmcm9tIFwiLi8uLi9kYXRhL3JvbGVzLmpzXCI7XHJcblxyXG4vKipcclxuICogU3RvcmVzIGluZm8gd2hpY2ggaXMgdXNlZCBpbiBmdW5jdGlvbnMgb2Ygcm9sZVBlckhUTUxUYWcsXHJcbiAqIG1vc3RseSBhIGtleSBhcyB0YWdOYW1lIHdpdGggYW4gYXJyYXkgb2YgYWxsb3dlZCByb2xlcyBmb3IgdGhhdCB0YWdcclxuICogQHR5cGUge09iamVjdH1cclxuICovXHJcbnZhciBhbGxvd2VkUm9sZXMgPSB7XHJcblx0XCJhV2l0aEhyZWZcIjogW1xyXG5cdFx0XCJidXR0b25cIiwgXCJjaGVja2JveFwiLCBcIm1lbnVpdGVtXCIsIFwibWVudWl0ZW1jaGVja2JveFwiLCBcIm1lbnVpdGVtcmFkaW9cIixcclxuXHRcdFwib3B0aW9uXCIsIFwicmFkaW9cIiwgXCJzd2l0Y2hcIiwgXCJ0YWJcIiwgXCJ0cmVlaXRlbVwiLCBcImRvYy1iYWNrbGlua1wiLFxyXG5cdFx0XCJkb2MtYmlibGlvcmVmXCIsIFwiZG9jLWdsb3NzcmVmXCIsIFwiZG9jLW5vdGVyZWZcIlxyXG5cdF0sXHJcblx0XCJhcnRpY2xlXCI6IFtcclxuXHRcdFwiZmVlZFwiLCBcInByZXNlbnRhdGlvblwiLCBcIm5vbmVcIiwgXCJkb2N1bWVudFwiLCBcImFwcGxpY2F0aW9uXCIsIFwibWFpblwiLCBcInJlZ2lvblwiXHJcblx0XSxcclxuXHRcImFzaWRlXCI6IFtcclxuXHRcdFwiZmVlZFwiLCBcIm5vdGVcIiwgXCJwcmVzZW50YXRpb25cIiwgXCJub25lXCIsIFwicmVnaW9uXCIsIFwic2VhcmNoXCIsIFwiZG9jLWV4YW1wbGVcIixcclxuXHRcdFwiZG9jLWZvb3Rub3RlXCIsIFwiZG9jLXB1bGxxdW90ZVwiLCBcImRvYy10aXBcIlxyXG5cdF0sXHJcblx0XCJidXR0b25cIjogW1xyXG5cdFx0XCJjaGVja2JveFwiLCBcImxpbmtcIiwgXCJtZW51aXRlbVwiLCBcIm1lbnVpdGVtY2hlY2tib3hcIiwgXCJtZW51aXRlbXJhZGlvXCIsXHJcblx0XHRcIm9wdGlvblwiLCBcInJhZGlvXCIsIFwic3dpdGNoXCIsIFwidGFiXCJcclxuXHRdLFxyXG5cdFwiZGxcIjogW1wiZ3JvdXBcIiwgXCJwcmVzZW50YXRpb25cIiwgXCJub25lXCIsIFwiZG9jLWdsb3NzYXJ5XCJdLFxyXG5cdFwiZW1iZWRcIjogWyBcImFwcGxpY2F0aW9uXCIsIFwiZG9jdW1lbnRcIiwgXCJwcmVzZW50YXRpb25cIiwgXCJub25lXCIsIFwiaW1nXCIgXSxcclxuXHRcImZpZ2NhcHRpb25cIjogWyBcImdyb3VwXCIsIFwicHJlc2VudGF0aW9uXCIsIFwibm9uZVwiIF0sXHJcblx0XCJmaWVsZHNldFwiOiBcdFsgXCJncm91cFwiLCBcInByZXNlbnRhdGlvblwiLCBcIm5vbmVcIiBdLFxyXG5cdFwiZm9vdGVyXCI6IFsgXCJncm91cFwiLCBcIm5vbmVcIiwgXCJwcmVzZW50YXRpb25cIiwgXCJkb2MtZm9vdG5vdGVcIiBdLFxyXG5cdFwiZm9ybVwiOiBbIFwic2VhcmNoXCIsIFwibm9uZVwiLCBcInByZXNlbnRhdGlvblwiIF0sXHJcblx0XCJoMVRvaDZcIjogWyBcInRhYlwiLCBcIm5vbmVcIiwgXCJwcmVzZW50YXRpb25cIiwgXCJkb2Mtc3VidGl0bGVcIiBdLFxyXG5cdFwiaGVhZGVyXCI6IFsgXCJncm91cFwiLCBcIm5vbmVcIiwgXCJwcmVzZW50YXRpb25cIiwgXCJkb2MtZm9vdG5vdGVcIiBdLFxyXG5cdFwiaHJcIjogWyBcInByZXNlbnRhdGlvblwiLCBcImRvYy1wYWdlYnJlYWtcIiBdLFxyXG5cdFwiaWZyYW1lXCI6IFsgXCJhcHBsaWNhdGlvblwiLCBcImRvY3VtZW50XCIsIFwiaW1nXCIgXSxcclxuXHRcImltZ1dpdGhFbXB0eUFsdFwiOiBbIFwicHJlc2VudGF0aW9uXCIsIFwibm9uZVwiIF0sXHJcblx0XCJpbnB1dFR5cGVCdXR0b25cIjogW1xyXG5cdFx0XCJsaW5rLCBtZW51aXRlbVwiLCBcIm1lbnVpdGVtY2hlY2tib3hcIiwgXCJtZW51aXRlbXJhZGlvXCIsIFwicmFkaW9cIiwgXCJzd2l0Y2hcIixcclxuXHRcdFwib3B0aW9uXCIsIFwidGFiXCJcclxuXHRdLFxyXG5cdFwiaW5wdXRUeXBlSW1hZ2VcIjogW1xyXG5cdFx0XCJsaW5rXCIsIFwibWVudWl0ZW1cIiwgXCJtZW51aXRlbWNoZWNrYm94XCIsIFwibWVudWl0ZW1yYWRpb1wiLCBcInJhZGlvXCIsIFwic3dpdGNoXCJcclxuXHRdLFxyXG5cdFwiaW5wdXRUeXBlQ2hlY2tib3hcIjogWyBcImJ1dHRvblwiLCBcIm1lbnVpdGVtY2hlY2tib3hcIiwgXCJvcHRpb25cIiwgXCJzd2l0Y2hcIiBdLFxyXG5cdFwibGlcIjogW1xyXG5cdFx0XCJtZW51aXRlbVwiLCBcIm1lbnVpdGVtY2hlY2tib3hcIiwgXCJtZW51aXRlbXJhZGlvXCIsIFwib3B0aW9uXCIsIFwibm9uZVwiLFxyXG5cdFx0XCJwcmVzZW50YXRpb25cIiwgXCJyYWRpb1wiLCBcInNlcGFyYXRvclwiLCBcInRhYlwiLCBcInRyZWVpdGVtXCIsIFwiZG9jLWJpYmxpb2VudHJ5XCIsXHJcblx0XHRcImRvYy1lbmRub3RlXCJcclxuXHRdLFxyXG5cdFwibmF2XCI6IFsgXCJkb2MtaW5kZXhcIiwgXCJkb2MtcGFnZWxpc3RcIiwgXCJkb2MtdG9jXCIgXSxcclxuXHRcIm9iamVjdFwiOiBbIFwiYXBwbGljYXRpb25cIiwgXCJkb2N1bWVudFwiLCBcImltZ1wiIF0sXHJcblx0XCJvbFwiOiBbXHJcblx0XHRcImRpcmVjdG9yeVwiLCBcImdyb3VwXCIsIFwibGlzdGJveFwiLCBcIm1lbnVcIiwgXCJtZW51YmFyLG5vbmVcIiwgXCJwcmVzZW50YXRpb24gXCIsXHJcblx0XHRcInJhZGlvZ3JvdXBcIiwgXCJ0YWJsaXN0XCIsIFwidG9vbGJhclwiLCBcInRyZWVcIlxyXG5cdF0sXHJcblx0XCJzZWN0aW9uXCI6IFtcclxuXHRcdFwiYWxlcnRcIiwgXCJhbGVydGRpYWxvZ1wiLCBcImFwcGxpY2F0aW9uXCIsIFwiYmFubmVyXCIsIFwiY29tcGxlbWVudGFyeVwiLFxyXG5cdFx0XCJjb250ZW50aW5mb1wiLCBcImRpYWxvZ1wiLCBcImRvY3VtZW50XCIsIFwiZmVlZFwiLCBcImxvZ1wiLCBcIm1haW5cIiwgXCJtYXJxdWVlXCIsXHJcblx0XHRcIm5hdmlnYXRpb25cIiwgXCJub25lXCIsIFwicHJlc2VudGF0aW9uXCIsIFwic2VhcmNoXCIsIFwic3RhdHVzXCIsIFwidGFicGFuZWxcIixcclxuXHRcdFwiZG9jLWFic3RyYWN0XCIsIFwiZG9jLWFja25vd2xlZGdtZW50c1wiLCBcImRvYy1hZnRlcndvcmRcIiwgXCJkb2MtYXBwZW5kaXhcIixcclxuXHRcdFwiZG9jLWJpYmxpb2dyYXBoeVwiLCBcImRvYy1jaGFwdGVyXCIsIFwiZG9jLWNvbG9waG9uXCIsIFwiZG9jLWNvbmNsdXNpb25cIixcclxuXHRcdFwiZG9jLWNyZWRpdFwiLCBcImRvYy1jcmVkaXRzXCIsIFwiZG9jLWRlZGljYXRpb25cIiwgXCJkb2MtZW5kbm90ZXNcIiwgXCJkb2MtZXBpbG9ndWVcIixcclxuXHRcdFwiZG9jLWVycmF0YVwiLCBcImRvYy1leGFtcGxlXCIsIFwiZG9jLWZvcmV3b3JkXCIsIFwiZG9jLWluZGV4XCIsIFwiZG9jLWludHJvZHVjdGlvblwiLFxyXG5cdFx0XCJkb2Mtbm90aWNlXCIsIFwiZG9jLXBhZ2VsaXN0XCIsIFwiZG9jLXBhcnRcIiwgXCJkb2MtcHJlZmFjZVwiLCBcImRvYy1wcm9sb2d1ZVwiLFxyXG5cdFx0XCJkb2MtcHVsbHF1b3RlXCIsIFwiZG9jLXFuYVwiLCBcImRvYy10b2NcIlxyXG5cdF0sXHJcblx0XCJzdmdcIjogWyBcImFwcGxpY2F0aW9uXCIsIFwiZG9jdW1lbnRcIiwgXCJpbWdcIiBdLFxyXG5cdFwidWxcIjogW1xyXG5cdFx0XCJkaXJlY3RvcnlcIiwgXCJncm91cFwiLCBcImxpc3Rib3hcIiwgXCJtZW51XCIsIFwibWVudWJhclwiLCBcInJhZGlvZ3JvdXBcIixcclxuXHRcdFwidGFibGlzdFwiLCBcInRvb2xiYXJcIiwgXCJ0cmVlXCIsIFwicHJlc2VudGF0aW9uXCJcclxuXHRdXHJcbn07XHJcblxyXG4vKipcclxuICogQ29udGFpbnMgYSBmdW5jdGlvbiBmb3IgZWFjaCBodG1sVGFnIHdoZXJlIG5vdCBhbGwgcm9sZXMgYWxsb3dlZFxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKi9cclxudmFyIHJvbGVQZXJIVE1MVGFnID0ge1xyXG5cdGE6IChlbCwgcm9sZSkgPT4ge1xyXG5cdFx0aWYoZWwuaHJlZikge1xyXG5cdFx0XHRyZXR1cm4gaGFzQWxsb3dlZFJvbGUoXCJhV2l0aEhyZWZcIiwgcm9sZSkgPyByb2xlIDogXCJsaW5rXCI7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gcm9sZTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGFyZWE6IChlbCwgcm9sZSkgPT4ge1xyXG5cdFx0aWYoZWwuaHJlZikgcmV0dXJuIHJvbGUgPyBudWxsIDogXCJsaW5rXCI7XHJcblx0XHRyZXR1cm4gcm9sZTtcclxuXHR9LFxyXG5cdGFydGljbGU6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJhcnRpY2xlXCIsIHJvbGUpID8gcm9sZSA6IFwiYXJ0aWNsZVwiLFxyXG5cdGFzaWRlOiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwiYXNpZGVcIiwgcm9sZSkgPyByb2xlIDogXCJjb21wbGVtZW50YXJ5XCIsXHJcblx0YXVkaW86IChlbCwgcm9sZSkgPT4gcm9sZSA9PSBcImFwcGxpY2F0aW9uXCIgPyBcImFwcGxpY2F0aW9uXCIgOiBudWxsLFxyXG5cdGJhc2U6ICgpID0+IG51bGwsXHJcblx0Ym9keTogKCkgPT4gXCJkb2N1bWVudFwiLFxyXG5cdGJ1dHRvbjogKGVsLCByb2xlKSA9PiB7XHJcblx0XHRpZihlbC50eXBlID09IFwibWVudVwiKSB7XHJcblx0XHRcdHJldHVybiByb2xlID09IFwibWVudWl0ZW1cIiA/IFwibWVudWl0ZW1cIiA6IFwiYnV0dG9uXCI7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gaGFzQWxsb3dlZFJvbGUoXCJidXR0b25cIiwgcm9sZSkgPyByb2xlIDogXCJidXR0b25cIjtcclxuXHR9LFxyXG5cdGNhcHRpb246ICgpID0+IG51bGwsXHJcblx0Y29sOiAoKSA9PiBudWxsLFxyXG5cdGNvbGdyb3VwOiAoKSA9PiBudWxsLFxyXG5cdGRhdGFsaXN0OiAoKSA9PiBcImxpc3Rib3hcIixcclxuXHRkZDogKCkgPT4gXCJkZWZpbml0aW9uXCIsXHJcblx0ZGV0YWlsczogKCkgPT4gXCJncm91cFwiLFxyXG5cdGRpYWxvZzogKGVsLCByb2xlKSA9PiByb2xlID09IFwiYWxlcnRkaWFsb2dcIiA/IFwiYWxlcnRkaWFsb2dcIiA6IFwiZGlhbG9nXCIsXHJcblx0ZGw6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJkbFwiLCByb2xlKSA/IHJvbGUgOiBcImxpc3RcIixcclxuXHRkdDogKCkgPT4gXCJsaXN0aXRlbVwiLFxyXG5cdGVtYmVkOiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwiZW1iZWRcIiwgcm9sZSkgPyByb2xlIDogbnVsbCxcclxuXHRmaWdjYXB0aW9uOiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwiZmlnY2FwdGlvblwiLCByb2xlKSA/IHJvbGUgOiBudWxsLFxyXG5cdGZpZWxkc2V0OiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwiZmllbGRzZXRcIiwgcm9sZSk/IHJvbGUgOiBudWxsLFxyXG5cdGZpZ3VyZTogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcImZpZ3VyZVwiLCByb2xlKSA/IHJvbGUgOiBcImZpZ3VyZVwiLFxyXG5cdGZvb3RlcjogKGVsLCByb2xlKSA9PiB7XHJcblx0XHRsZXQgaGFzSW1wbGljaXRDb250ZW50aW5mb1JvbGUgPSAhZ2V0UGFyZW50V2l0aFRhZ05hbWUoZWwsIFtcIkFSVElDTEVcIiwgXCJBU0lERVwiLCBcIk1BSU5cIiwgXCJOQVZcIiwgXCJTRUNUSU9OXCJdKTtcclxuXHRcdGxldCBoYXNBbGxvd2VkUm9sZSA9IGhhc0FsbG93ZWRSb2xlKFwiZm9vdGVyXCIsIHJvbGUpO1xyXG5cdFx0aWYoaGFzQWxsb3dlZFJvbGUpe1xyXG5cdFx0XHRyZXR1cm4gcm9sZTtcclxuXHRcdH0gZWxzZSBpZiAoaGFzSW1wbGljaXRDb250ZW50aW5mb1JvbGUpIHtcclxuXHRcdFx0cmV0dXJuIFwiY29udGVudGluZm9cIjtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0Zm9ybTogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcImZvcm1cIiwgcm9sZSkgPyByb2xlIDogXCJmb3JtXCIsXHJcblx0aDE6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJoMVRvaDZcIiwgcm9sZSkgPyByb2xlIDogXCJoZWFkaW5nXCIsXHJcblx0aDI6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJoMVRvaDZcIiwgcm9sZSkgPyByb2xlIDogXCJoZWFkaW5nXCIsXHJcblx0aDM6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJoMVRvaDZcIiwgcm9sZSkgPyByb2xlIDogXCJoZWFkaW5nXCIsXHJcblx0aDQ6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJoMVRvaDZcIiwgcm9sZSkgPyByb2xlIDogXCJoZWFkaW5nXCIsXHJcblx0aDU6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJoMVRvaDZcIiwgcm9sZSkgPyByb2xlIDogXCJoZWFkaW5nXCIsXHJcblx0aDY6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJoMVRvaDZcIiwgcm9sZSkgPyByb2xlIDogXCJoZWFkaW5nXCIsXHJcblx0aGVhZDogKCkgPT4gbnVsbCxcclxuXHRoZWFkZXI6IChlbCwgcm9sZSkgPT4ge1xyXG5cdFx0bGV0IGhhc0ltcGxpY2l0QmFubmVyUm9sZSA9ICFnZXRQYXJlbnRXaXRoVGFnTmFtZShlbCwgW1wiQVJUSUNMRVwiLCBcIkFTSURFXCIsIFwiTUFJTlwiLCBcIk5BVlwiLCBcIlNFQ1RJT05cIl0pO1xyXG5cdFx0bGV0IGhhc0FsbG93ZWRSb2xlID0gaGFzQWxsb3dlZFJvbGUoXCJoZWFkZXJcIiwgcm9sZSk7XHJcblx0XHRpZihoYXNBbGxvd2VkUm9sZSl7XHJcblx0XHRcdHJldHVybiByb2xlO1xyXG5cdFx0fSBlbHNlIGlmIChoYXNJbXBsaWNpdEJhbm5lclJvbGUpIHtcclxuXHRcdFx0cmV0dXJuIFwiYmFubmVyXCI7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGhyOiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwiaHJcIiwgcm9sZSkgPyByb2xlIDogXCJzZXBlcmF0b3JcIixcclxuXHRodG1sOiAoKSA9PiBudWxsLFxyXG5cdGlmcmFtZTogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcImlmcmFtZVwiLCByb2xlKSA/IHJvbGUgOiBudWxsLFxyXG5cdGltZzogKGVsLCByb2xlKSA9PiB7XHJcblx0XHR2YXIgaGFzQWxsb3dlZEVtcHR5QWx0Um9sZSA9IGhhc0FsbG93ZWRSb2xlKFwiaW1nV2l0aEVtcHR5QWx0XCIsIHJvbGUpO1xyXG5cclxuXHRcdGlmKGVsLmFsdCkge1xyXG5cdFx0XHQvLyBhbnkgcm9sZSBleGVwdCB0aGUgcm9sZXMgdXNlZCBieSBlbXB0eSBhbHQgdmFsdWVzXHJcblx0XHRcdHJldHVybiBoYXNBbGxvd2VkRW1wdHlBbHRSb2xlID8gXCJpbWdcIiA6IHJvbGU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gaGFzQWxsb3dlZEVtcHR5QWx0Um9sZSA/IHJvbGUgOiBudWxsO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0aW5wdXQ6IChlbCwgcm9sZSkgPT4ge1xyXG5cdFx0c3dpdGNoKGVsLnR5cGUpIHtcclxuXHRcdFx0Y2FzZSBcImJ1dHRvblwiOlxyXG5cdFx0XHRcdHJldHVybiBoYXNBbGxvd2VkUm9sZShcImlucHV0VHlwZUJ1dHRvblwiLCByb2xlKSA/IHJvbGUgOiBcImJ1dHRvblwiO1xyXG5cdFx0XHRjYXNlIFwiY2hlY2tib3hcIjpcclxuXHRcdFx0XHRyZXR1cm4gaGFzQWxsb3dlZFJvbGUoXCJpbnB1dFR5cGVDaGVja2JveFwiLCByb2xlKSA/IHJvbGUgOiBcImNoZWNrYm94XCI7XHJcblx0XHRcdGNhc2UgXCJpbWFnZVwiOlxyXG5cdFx0XHRcdHJldHVybiBoYXNBbGxvd2VkUm9sZShcImlucHV0VHlwZUltYWdlXCIsIHJvbGUpID8gcm9sZSA6IFwiYnV0dG9uXCI7XHJcblx0XHRcdGNhc2UgXCJudW1iZXJcIjpcclxuXHRcdFx0XHRyZXR1cm4gXCJzcGluYnV0dG9uXCI7XHJcblx0XHRcdGNhc2UgXCJyYWRpb1wiOlxyXG5cdFx0XHRcdHJldHVybiByb2xlID09IFwibWVudWl0ZW1yYWRpb1wiID8gXCJtZW51aXRlbXJhZGlvXCIgOiBcInJhZGlvXCI7XHJcblx0XHRcdGNhc2UgXCJyYW5nZVwiOlxyXG5cdFx0XHRcdHJldHVybiBcInNsaWRlclwiO1xyXG5cdFx0XHRjYXNlIFwic2VhcmNoXCI6XHJcblx0XHRcdFx0cmV0dXJuIGVsLmxpc3QgPyBcImNvbWJvYm94XCIgOiBcInNlYXJjaGJveFwiO1xyXG5cdFx0XHRjYXNlIFwicmVzZXRcIjpcclxuXHRcdFx0Y2FzZSBcInN1Ym1pdFwiOlxyXG5cdFx0XHRcdHJldHVybiBcImJ1dHRvblwiO1xyXG5cdFx0XHRjYXNlIFwiZW1haWxcIjpcclxuXHRcdFx0Y2FzZSBcInRlbFwiOlxyXG5cdFx0XHRjYXNlIFwidGV4dFwiOlxyXG5cdFx0XHRjYXNlIFwidXJsXCI6XHJcblx0XHRcdFx0cmV0dXJuIGVsLmxpc3QgPyBcImNvbWJvYm94XCIgOiBcInRleHRib3hcIjtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGtleWdlbjogKCkgPT4gbnVsbCxcclxuXHRsYWJlbDogKCkgPT4gbnVsbCxcclxuXHRsZWdlbmQ6ICgpID0+IG51bGwsXHJcblx0bGk6IChlbCwgcm9sZSkgPT4ge1xyXG5cdFx0bGV0IGhhc0ltcGxpY2l0TGlzdGl0ZW1Sb2xlID0gZ2V0UGFyZW50V2l0aFRhZ05hbWUoZWwsIFtcIk9MXCIsIFwiVUxcIl0pO1xyXG5cclxuXHRcdGlmKGhhc0ltcGxpY2l0TGlzdGl0ZW1Sb2xlKSB7XHJcblx0XHRcdHJldHVybiBoYXNBbGxvd2VkUm9sZShcImxpXCIsIHJvbGUpID8gcm9sZSA6IFwibGlzdGl0ZW1cIjtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiByb2xlO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0bGluazogKGVsLCByb2xlKSA9PiB7XHJcblx0XHRpZihlbC5ocmVmKSByZXR1cm4gcm9sZSA/IG51bGwgOiBcImxpbmtcIjtcclxuXHRcdHJldHVybiByb2xlO1xyXG5cdH0sXHJcblx0bWFpbjogKCkgPT4gXCJtYWluXCIsXHJcblx0bWFwOiAoKSA9PiBudWxsLFxyXG5cdG1hdGg6ICgpID0+IFwibWF0aFwiLFxyXG5cdG1lbnU6IChlbCwgcm9sZSkgPT4gZWwudHlwZSA9PSBcImNvbnRleHRcIiA/IFwibWVudVwiIDogcm9sZSxcclxuXHRtZW51aXRlbTogKGVsLCByb2xlKSA9PiB7XHJcblx0XHRzd2l0Y2ggKGVsLnR5cGUpIHtcclxuXHRcdFx0Y2FzZSBcImNvbW1hbmRcIjpcclxuXHRcdFx0XHRyZXR1cm4gXCJtZW51aXRlbVwiO1xyXG5cdFx0XHRjYXNlIFwiY2hlY2tib3hcIjpcclxuXHRcdFx0XHRyZXR1cm4gXCJtZW51aXRlbWNoZWNrYm94XCI7XHJcblx0XHRcdGNhc2UgXCJyYWRpb1wiOlxyXG5cdFx0XHRcdHJldHVybiBcIm1lbnVpdGVtcmFkaW9cIjtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRyZXR1cm4gcm9sZTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdG1ldGE6ICgpID0+IG51bGwsXHJcblx0bWV0ZXI6ICgpID0+IG51bGwsXHJcblx0bmF2OiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwibmF2XCIsIHJvbGUpID8gcm9sZSA6IFwibmF2aWdhdGlvblwiLFxyXG5cdG5vc2NyaXB0OiAoKSA9PiBudWxsLFxyXG5cdG9iamVjdDogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcIm9iamVjdFwiLCByb2xlKSA/IHJvbGUgOiBudWxsLFxyXG5cdG9sOiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwib2xcIiwgcm9sZSkgPyByb2xlIDogXCJsaXN0XCIsXHJcblx0b3B0Z3JvdXA6ICgpID0+IFwiZ3JvdXBcIixcclxuXHRvcHRpb246IChlbCkgPT4ge1xyXG5cdFx0bGV0IHdpdGhpbk9wdGlvbkxpc3QgPSBbXCJzZWxlY3RcIiwgXCJvcHRncm91cFwiLCBcImRhdGFsaXN0XCJdLmluZGV4T2YoZWwucGFyZW50Tm9kZSkgPiAtMTtcclxuXHRcdHJldHVybiB3aXRoaW5PcHRpb25MaXN0ID8gXCJvcHRpb25cIiA6IG51bGw7XHJcblx0fSxcclxuXHRvdXRwdXQ6IChlbCwgcm9sZSkgPT4gcm9sZSA/IHJvbGUgOiBcInN0YXR1c1wiLFxyXG5cdHBhcmFtOiAoKSA9PiBudWxsLFxyXG5cdHBpY3R1cmU6ICgpID0+IG51bGwsXHJcblx0cHJvZ3Jlc3M6ICgpID0+IFwicHJvZ3Jlc3NiYXJcIixcclxuXHRzY3JpcHQ6ICgpID0+IG51bGwsXHJcblx0c2VjdGlvbjogKGVsLCByb2xlKSA9PiB7XHJcblx0XHRsZXQgaGFzVmFsaWRSb2xlID0gaGFzQWxsb3dlZFJvbGUoXCJzZWN0aW9uXCIsIHJvbGUpO1xyXG5cdFx0aWYoaGFzVmFsaWRSb2xlKSByZXR1cm4gcm9sZTtcclxuXHJcblx0XHQvLyBvbmx5IGlmIGFjY2Vzc2libGUgbmFtZVxyXG5cdFx0aWYoZWwudGl0bGUgfHwgZWwuaGFzQXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiKSB8fCBlbC5oYXNBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsbGVkYnlcIikpe1xyXG5cdFx0XHRyZXR1cm4gXCJzZWN0aW9uXCI7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gcm9sZTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdHNlbGVjdDogKGVsLCByb2xlKSA9PiB7XHJcblx0XHRpZihlbC5tdWx0aXBsZSAmJiBlbC5zaXplID4gMSl7XHJcblx0XHRcdHJldHVybiBcImxpc3Rib3hcIjtcclxuXHRcdH0gZWxzZSBpZighZWwubXVsdGlwbGUgJiYgZWwuc2l6ZSA8PSAxKSB7XHJcblx0XHRcdHJldHVybiByb2xlID09IFwibWVudVwiID8gcm9sZSA6IFwiY29tYm9ib3hcIjtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcm9sZTtcclxuXHR9LFxyXG5cdHNvdXJjZTogKCkgPT4gbnVsbCxcclxuXHRzdHlsZTogKCkgPT4gbnVsbCxcclxuXHRzdmc6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJzdmdcIiwgcm9sZSkgPyByb2xlIDogbnVsbCxcclxuXHRzdW1tYXJ5OiAoKSA9PiBcImJ1dHRvblwiLFxyXG5cdHRhYmxlOiAoZWwsIHJvbGUpID0+IHJvbGUgPyByb2xlIDogXCJ0YWJsZVwiLFxyXG5cdHRlbXBsYXRlOiAoKSA9PiBudWxsLFxyXG5cdHRleHRhcmVhOiAoKSA9PiBcInRleHRib3hcIixcclxuXHR0aGVhZDogKGVsLCByb2xlKSA9PiByb2xlID8gcm9sZSA6IFwicm93Z3JvdXBcIixcclxuXHR0Ym9keTogKGVsLCByb2xlKSA9PiByb2xlID8gcm9sZSA6IFwicm93Z3JvdXBcIixcclxuXHR0Zm9vdDogKGVsLCByb2xlKSA9PiByb2xlID8gcm9sZSA6IFwicm93Z3JvdXBcIixcclxuXHR0aXRsZTogKCkgPT4gbnVsbCxcclxuXHR0ZDogKGVsLCByb2xlKSA9PiBnZXRQYXJlbnRXaXRoVGFnTmFtZShlbCwgW1wiVEFCTEVcIl0pID8gXCJjZWxsXCIgOiByb2xlLFxyXG5cdHRoOiAoZWwsIHJvbGUpID0+IHtcclxuXHRcdGlmKHJvbGUpIHJldHVybiByb2xlO1xyXG5cdFx0cmV0dXJuIGdldFBhcmVudFdpdGhUYWdOYW1lKGVsLCBbXCJUSEVBRFwiXSkgPyBcImNvbHVtbmhlYWRlclwiIDogXCJyb3doZWFkZXJcIjtcclxuXHR9LFxyXG5cdHRyOiAoZWwsIHJvbGUpID0+IHtcclxuXHRcdC8vIHJvbGU9cm93LCBtYXkgYmUgZXhwbGljaXRseSBkZWNsYXJlZCB3aGVuIGNoaWxkIG9mIGEgdGFibGUgZWxlbWVudCB3aXRoIHJvbGU9Z3JpZFxyXG5cdFx0cmV0dXJuIHJvbGUgPyByb2xlIDogXCJyb3dcIjtcclxuXHR9LFxyXG5cdHRyYWNrOiAoKSA9PiBudWxsLFxyXG5cdHVsOiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwidWxcIiwgcm9sZSkgPyByb2xlIDogXCJsaXN0XCIsXHJcblx0dmlkZW86IChlbCwgcm9sZSkgPT4gcm9sZSA9PSBcImFwcGxpY2F0aW9uXCIgPyBcImFwcGxpY2F0aW9uXCIgOiBudWxsXHJcbn07XHJcblxyXG4vKipcclxuICogRmluZHMgbmVhcmVzdCBwYXJlbnQgd2l0aCBhIHNwZWNpZmlnIHRhZ05hbWVcclxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IFx0XHRlbCAgICAgIFx0XHRjaGlsZCAtIHN0YXJ0aW5nIHBvaW50ZXJcclxuICogQHBhcmFtICB7QXJyYXk8U3RyaW5nPn0gXHR0YWdOYW1lIFx0XHRBcnJheSBjb250YWluZyBjYXBhdGlsaXplZCB0YWduYW1lc1xyXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH0gICAgICAgICBcdFx0XHRcdFBhcmVudCB0aGF0IG1hdGNoZXMgb25lIG9mIHRoZSB0YWduYW1lc1xyXG4gKi9cclxuZnVuY3Rpb24gZ2V0UGFyZW50V2l0aFRhZ05hbWUoZWwsIHRhZ05hbWUpIHtcclxuXHR3aGlsZSAoZWwucGFyZW50Tm9kZSl7XHJcblx0XHRpZih0YWdOYW1lLmluZGV4T2YoZWwudGFnTmFtZSkgPiAtMSkgcmV0dXJuIGVsO1xyXG5cdFx0ZWwgPSBlbC5wYXJlbnROb2RlO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBnaXZlbiByb2xlIGlzIGFsbG93ZWQgZm9yIGdpdmVuIHRhZ1xyXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICB0YWdOYW1lIGtleSBvZiBhbGxvd2VkUm9sZXNcclxuICogQHBhcmFtICB7c3RyaW5nfSAgcm9sZSAgICBjdXJyZW50IHJvbGVcclxuICogQHJldHVybiB7Qm9vbGVhbn0gICAgICAgICBUcnVlIGlmIGFsbG93ZWRcclxuICovXHJcbmZ1bmN0aW9uIGhhc0FsbG93ZWRSb2xlKHRhZ05hbWUsIHJvbGUpIHtcclxuXHRyZXR1cm4gYWxsb3dlZFJvbGVzW3RhZ05hbWVdLmluZGV4T2Yocm9sZSkgPiAtMTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Q29tcHV0ZWRSb2xlKGVsKSB7XHJcblx0dmFyIHJvbGUgPSBlbC5nZXRBdHRyaWJ1dGUoXCJyb2xlXCIpO1xyXG5cdC8vIGNoZWNrIGlmIGdpdmVuIHJvbGUgZXhpc3RcclxuXHRpZihyb2xlKSByb2xlID0gcm9sZXNbcm9sZV0gPyByb2xlIDogbnVsbDtcclxuXHJcblx0dmFyIHRhZ05hbWUgPSBlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XHJcblx0Ly8gY2FsbCBwb3NzaWJsZSBjdXN0b20gZnVuY3Rpb24gaWYgdGFnIGhhcyBhbnlcclxuXHRpZiAocm9sZVBlckhUTUxUYWdbdGFnTmFtZV0pIHJldHVybiByb2xlUGVySFRNTFRhZ1t0YWdOYW1lXShlbCwgcm9sZSk7XHJcblxyXG5cdC8vIGRlZmF1bHQgYmVoYXZpb3IgYS5rLmEuIHNldCByb2xlXHJcblx0cmV0dXJuIHJvbGU7XHJcbn0iLCIvKipcclxuICogU2Nyb2xscyBhbiBlbGVtZW50IGludG8gaXRzIHBhcmVudCB2aWV3XHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gY2hpbGQgRWxlbWVudCB0byBzaG93XHJcbiAqL1xyXG5mdW5jdGlvbiBzY3JvbGxJbnRvVmlldyhjaGlsZCkge1xyXG5cdGxldCBwYXJlbnQgPSBjaGlsZC5vZmZzZXRQYXJlbnQ7XHJcblx0aWYgKHBhcmVudCAmJiBwYXJlbnQuc2Nyb2xsSGVpZ2h0ID4gcGFyZW50LmNsaWVudEhlaWdodCkge1xyXG5cdFx0dmFyIHNjcm9sbEJvdHRvbSA9IHBhcmVudC5jbGllbnRIZWlnaHQgKyBwYXJlbnQuc2Nyb2xsVG9wO1xyXG5cdFx0dmFyIGVsZW1lbnRCb3R0b20gPSBjaGlsZC5vZmZzZXRUb3AgKyBjaGlsZC5vZmZzZXRIZWlnaHQ7XHJcblx0XHRpZiAoZWxlbWVudEJvdHRvbSA+IHNjcm9sbEJvdHRvbSkge1xyXG5cdFx0XHRwYXJlbnQuc2Nyb2xsVG9wID0gZWxlbWVudEJvdHRvbSAtIHBhcmVudC5jbGllbnRIZWlnaHQ7XHJcblx0XHR9IGVsc2UgaWYgKGNoaWxkLm9mZnNldFRvcCA8IHBhcmVudC5zY3JvbGxUb3ApIHtcclxuXHRcdFx0cGFyZW50LnNjcm9sbFRvcCA9IGNoaWxkLm9mZnNldFRvcDtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBZGRzIGZvY3VzIHRvIHRoZSBmaXJzdCBlbGVtZW50XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGRlc2NlbmRhbnRzIEFycmF5IG9mIGFsbCBkZXNjZW5kYW50c1xyXG4gKi9cclxuZnVuY3Rpb24gc3RhcnQoZGVzY2VuZGFudHMpIHtcclxuXHRyZXR1cm4gYWRkKGRlc2NlbmRhbnRzWzBdKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFkZHMgZm9jdXMgdG8gdGhlIHByZXYgZWxlbWVudFxyXG4gKiBAcGFyYW0ge0FycmF5fSBkZXNjZW5kYW50cyBBcnJheSBvZiBhbGwgZGVzY2VuZGFudHNcclxuICogQHBhcmFtIHtPYmplY3R9IFx0Y2hpbGQgXHRcdFx0Q3VycmVudCBmb2N1c2VkIGVsZW1lbnRcclxuICovXHJcbmZ1bmN0aW9uIHByZXYoZGVzY2VuZGFudHMsIGNoaWxkKSB7XHJcblx0Ly8gZmluZCBpbmRleCBvZiBjdXJyZW50IGVsZW1lbnRcclxuXHRsZXQgaSA9IGRlc2NlbmRhbnRzLmluZGV4T2YoY2hpbGQpO1xyXG5cdGlmKGkgPD0gMCkgaSA9IDE7XHJcblxyXG5cdHJldHVybiBhZGQoZGVzY2VuZGFudHNbaSAtIDFdKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFkZHMgZm9jdXMgdG8gdGhlIG5leHQgZWxlbWVudFxyXG4gKiBAcGFyYW0ge0FycmF5fSBcdGRlc2NlbmRhbnRzIEFycmF5IG9mIGFsbCBkZXNjZW5kYW50c1xyXG4gKiBAcGFyYW0ge09iamVjdH0gXHRjaGlsZCBcdFx0XHRDdXJyZW50IGZvY3VzZWQgZWxlbWVudFxyXG4gKi9cclxuZnVuY3Rpb24gbmV4dChkZXNjZW5kYW50cywgY2hpbGQpIHtcclxuXHQvLyBmaW5kIGluZGV4IG9mIGN1cnJlbnQgZWxlbWVudFxyXG5cdGxldCBpID0gZGVzY2VuZGFudHMuaW5kZXhPZihjaGlsZCk7XHJcblx0aWYgKGkgPiBkZXNjZW5kYW50cy5sZW5ndGggLSAyKSBpID0gZGVzY2VuZGFudHMubGVuZ3RoIC0gMjtcclxuXHJcblx0cmV0dXJuIGFkZChkZXNjZW5kYW50c1tpICsgMV0pO1xyXG59XHJcblxyXG4vKipcclxuICogQWRkcyBmb2N1cyB0byB0aGUgbGFzdCBlbGVtZW50XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGRlc2NlbmRhbnRzIEFycmF5IG9mIGFsbCBkZXNjZW5kYW50c1xyXG4gKi9cclxuZnVuY3Rpb24gZW5kKGRlc2NlbmRhbnRzKSB7XHJcblx0cmV0dXJuIGFkZChkZXNjZW5kYW50c1tkZXNjZW5kYW50cy5sZW5ndGggLSAxXSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZChjaGlsZCkge1xyXG5cdGNoaWxkLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImF5LWhvdmVyXCIpO1xyXG5cdHNjcm9sbEludG9WaWV3KGNoaWxkLmVsZW1lbnQpO1xyXG5cdHJldHVybiBjaGlsZDtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlKGNoaWxkKSB7XHJcblx0Y2hpbGQuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiYXktaG92ZXJcIik7XHRcclxuXHRyZXR1cm4gY2hpbGQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldChkZXNjZW5kYW50cykge1xyXG5cdGxldCBheSA9IGRlc2NlbmRhbnRzLmZpbmQoaSA9PiBpLmVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYXktaG92ZXJcIikpO1xyXG5cdGlmKCFheSkgcmV0dXJuIGRlc2NlbmRhbnRzWzBdO1xyXG5cdHJldHVybiBheTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0U2VsZWN0ZWQoYXksIHZhbCkge1xyXG5cdGF5LnNlbGVjdGVkID0gdmFsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREZXNjZW5kYW50cyhheSkge1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdHN0YXJ0LFxyXG5cdHByZXYsXHJcblx0bmV4dCxcclxuXHRlbmQsXHJcblx0YWRkLFxyXG5cdHJlbW92ZSxcclxuXHRnZXQsXHJcblx0c2V0U2VsZWN0ZWQsXHJcblx0Z2V0RGVzY2VuZGFudHNcclxufTsiLCJpbXBvcnQgcm9sZXMgZnJvbSBcIi4vLi4vZGF0YS9yb2xlc1wiO1xuXG4vKipcbiAqIFJldHVybnMgYW4gY3NzIHNlbGVjdG9yIGZvciBhIGdpdmVuIHJvbGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgUm9sZSBuYW1lXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Um9sZShrZXkpIHtcblx0aWYgKCFyb2xlc1trZXldKSByZXR1cm47XG5cblx0cmV0dXJuIFwiW3JvbGU9J1wiICsga2V5ICsgXCInXVwiO1xufVxuXG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgd2l0aCBhbGwgY3NzIHNlbGVjdG9ycywgaW1wbGljaXQgYW5kIGV4cGxpY2l0LCBmb3IgYSBnaXZlbiByb2xlXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5IFJvbGUgbmFtZVxuICogQHJldHVybnMgez9BcnJheX07XG4gKi9cbmZ1bmN0aW9uIGdldFNlbGVjdG9yQXJyYXkoa2V5KSB7XG5cdGlmICghcm9sZXNba2V5XSkgcmV0dXJuO1xuXG5cdGxldCBzZWxlY3RvciA9IFtdO1xuXHRzZWxlY3Rvci5wdXNoKGdldFJvbGUoa2V5KSk7XG5cdGlmIChyb2xlc1trZXldLmltcGxpY2l0KSBzZWxlY3RvciA9IHNlbGVjdG9yLmNvbmNhdChyb2xlc1trZXldLmltcGxpY2l0KTtcblx0cmV0dXJuIHNlbGVjdG9yO1xufVxuXG4vKipcbiAqIFJldHVybnMgYW4gY29tcGxldGUgY3NzIHNlbGVjdG9yIHdpdGggaW1wbGljdCBlbGVtZW50cyBmb3IgYSBnaXZlbiByb2xlXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5IFJvbGUgbmFtZVxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldChrZXkpIHtcblx0cmV0dXJuIGdldFNlbGVjdG9yQXJyYXkoa2V5KS5qb2luKFwiLCBcIik7XG59XG5cbmZ1bmN0aW9uIGdldERlZXBSb2xlQXJyYXkoa2V5KSB7XG5cdGlmICghcm9sZXNba2V5XSkgcmV0dXJuO1xuXG5cdGxldCBzZWxlY3RvciA9IFtdO1xuXHRzZWxlY3Rvci5wdXNoKGdldFJvbGUoa2V5KSk7XG5cblx0aWYgKHJvbGVzW2tleV0uc3ViKSB7XG5cdFx0cm9sZXNba2V5XS5zdWIuZm9yRWFjaCh2YWwgPT4gc2VsZWN0b3IucHVzaChnZXRSb2xlKHZhbCkpKTtcblx0fVxuXG5cdHJldHVybiBzZWxlY3Rvcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZXBSb2xlKGtleSkge1xuXHRyZXR1cm4gZ2V0RGVlcFJvbGVBcnJheShrZXkpLmpvaW4oXCIsIFwiKTtcbn1cblxuZnVuY3Rpb24gZ2V0RGVlcFNlbGVjdG9yQXJyYXkoa2V5KSB7XG5cdGlmICghcm9sZXNba2V5XSkgcmV0dXJuO1xuXG5cdGxldCBzZWxlY3RvciA9IFtdO1xuXHRzZWxlY3RvciA9IHNlbGVjdG9yLmNvbmNhdChnZXRTZWxlY3RvckFycmF5KGtleSkpO1xuXG5cdGlmIChyb2xlc1trZXldLnN1Yikge1xuXHRcdHJvbGVzW2tleV0uc3ViLmZvckVhY2godmFsID0+IHNlbGVjdG9yID0gc2VsZWN0b3IuY29uY2F0KGdldFNlbGVjdG9yQXJyYXkodmFsKSkpO1xuXHR9XG5cblx0cmV0dXJuIHNlbGVjdG9yO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVlcChrZXkpIHtcblx0cmV0dXJuIGdldERlZXBTZWxlY3RvckFycmF5KGtleSkuam9pbihcIiwgXCIpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7IGdldFJvbGUsIGdldCwgZ2V0RGVlcFJvbGUsIGdldERlZXAgfTsiXX0=
