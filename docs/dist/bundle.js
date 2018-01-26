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

},{"./utils/create":54,"./utils/elements":55}],12:[function(require,module,exports){
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

},{"./../type/DOMString.js":49}],13:[function(require,module,exports){
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

},{"./../type/boolean":50}],14:[function(require,module,exports){
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

},{"./../type/DOMString":49}],15:[function(require,module,exports){
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

},{"./../type/boolean":50}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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

},{"./../utils/ValidityState":53}],19:[function(require,module,exports){
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

},{"../attributes/aria-expanded":13,"../attributes/aria-pressed.js":14,"./../type/boolean":50,"./abstract/Command":34,"@vestergaard-company/js-mixin":1}],20:[function(require,module,exports){
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

},{"../attributes/aria-checked.js":12,"./abstract/Input":36,"@vestergaard-company/js-mixin":1}],21:[function(require,module,exports){
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

},{"./../type/boolean":50,"./../utils/selector":59,"./abstract/Select":41}],22:[function(require,module,exports){
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

},{"../attributes/aria-expanded.js":13,"./abstract/Window":44,"@vestergaard-company/js-mixin":1,"mousetrap":9}],23:[function(require,module,exports){
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

},{"./../utils/create":54,"./../utils/elements":55,"./../utils/selector":59,"./abstract/Landmark":37}],24:[function(require,module,exports){
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

},{"../attributes/aria-expanded":13,"./../type/boolean":50,"./abstract/Command.js":34,"@vestergaard-company/js-mixin":1}],25:[function(require,module,exports){
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

},{"./../utils/managingFocus":58,"./abstract/Select":41}],26:[function(require,module,exports){
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

},{"./../type/boolean":50,"./../utils/getActive":56,"./abstract/Input":36}],27:[function(require,module,exports){
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
 * The slider element let the user specify a numeric value which must be no less
 * than a given value, and no more than another given value. 
 * 
 * The precise value,however, is not considered important. This is typically represented using a slider or
 * dial control rather than a text entry box like the "number" input type. Because this kind of widget
 * is imprecise, it shouldn't typically be used unless the control's exact value isn't important.
 *
 * ### Examples
 *
 * #### Basic example
 * 
 * <div class="slider-track">
 *   <div role="slider"  tabindex="0"></div>
 * </div>
 * 
 * ```html
 * <div class="slider-track">
 *   <div role="slider"  tabindex="0"></div>
 * </div>
 * ```
 * 
 * #### As an button with a specified step and range
 *
 * <div class="slider-track">
 *   <button type="button" role="slider"
 * 		aria-valuemin="30" aria-valuemax="300" aria-valuenow="50" data-step="10"></button>
 * </div>
 *
 * ```html
 * <div class="slider-track">
 *   <button type="button" role="slider"
 * 		aria-valuemin="30" aria-valuemax="300" aria-valuenow="50" data-step="10"></button>
 * </div>
 * ```
 * 
 * #### Vertical
 * 
 * <div class="slider-track vertical">
 *   <button type="button" role="slider" aria-orientation="vertical"></button>
 * </div>
 * 
 * ```html
 * <div class="slider-track vertical">
 *   <button type="button" role="slider" aria-orientation="vertical"></button>
 * </div>
 * ```
 * 
 * #### Disabled
 * 
 * <div class="slider-track">
 *   <button type="button" role="slider" aria-disabled="true"></button>
 * </div>
 * 
 * ```html
 * <div class="slider-track">
 *   <button type="button" role="slider" aria-disabled="true"></button>
 * </div>
 * ```
 * 
 * 
 * @summary A user input where the user selects a value from within a given range.
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

		// set defaults
		if (undefined == _this.orientation) _this.orientation = "horizontal";
		if (undefined == _this.valueMin) {
			/**
    * @default [0]
    */
			_this.valueMin = 0;
		}
		if (undefined == _this.valueMax) _this.valueMax = 100;
		if (undefined == _this.valueNow && _this.valueMax < _this.valueMin) {
			_this.valueNow = _this.valueMin;
		} else if (undefined == _this.valueNow) {
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

},{"./abstract/Range.js":38}],28:[function(require,module,exports){
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

},{"./abstract/Range":38,"@vestergaard-company/js-mixin":1}],29:[function(require,module,exports){
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

},{"./Checkbox":20}],30:[function(require,module,exports){
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

},{"./../attributes/aria-selected":15,"./../data/roles":16,"./../utils/elements":55,"./../utils/selector":59,"./abstract/Roletype":39,"@vestergaard-company/js-mixin":1}],31:[function(require,module,exports){
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

},{"./../utils/elements.js":55,"./abstract/Composite":35}],32:[function(require,module,exports){
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

},{"./abstract/Section":40}],33:[function(require,module,exports){
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

},{"./../mixins/Selection":17,"./abstract/Input":36,"@vestergaard-company/js-mixin":1}],34:[function(require,module,exports){
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

},{"./Widget":43}],35:[function(require,module,exports){
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

},{"./Widget":43}],36:[function(require,module,exports){
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

},{"./../../mixins/Validation":18,"./../../utils/elements":55,"./../../utils/selector":59,"./Widget":43,"@vestergaard-company/js-mixin":1}],37:[function(require,module,exports){
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

},{"./Section":40}],38:[function(require,module,exports){
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
				this.valueNow = this.valueNow - Number(this._.step);
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
				this.valueNow = this.valueNow + Number(this._.step);
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

},{"./Widget":43}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AccessibleNode2 = require("./../../type/AccessibleNode");

var _AccessibleNode3 = _interopRequireDefault(_AccessibleNode2);

var _objectPath = require("object-path");

var _objectPath2 = _interopRequireDefault(_objectPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mousetrap = require("mousetrap");


// Event names that are only inside the libary
var customEvents = ["key", "attributes", "characterData", "childlist", "label"];

var isFunction = function isFunction(obj) {
	return typeof obj == "function" || false;
};

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

		_this._.listeners = new Map();
		_this._.registerCustomElement = handleCustomElement.bind(_this);
		_this._.registerCustomValue = handleCustomValue.bind(_this);

		_objectPath2.default.push(_this._, "mutations", "tabIndex");

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

		/**
   * Current tabindex of the element
   * @type {Number}
   */

	}, {
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

	return Roletype;
}(_AccessibleNode3.default);

exports.default = Roletype;

},{"./../../type/AccessibleNode":47,"mousetrap":9,"object-path":10}],40:[function(require,module,exports){
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

},{"./Structure":42}],41:[function(require,module,exports){
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

},{"./../../type/boolean":50,"./../../utils/elements":55,"./../../utils/managingFocus":58,"./../../utils/selector":59,"./../Option.js":26,"./Roletype":39,"@vestergaard-company/js-mixin":1}],42:[function(require,module,exports){
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

},{"./Roletype":39}],43:[function(require,module,exports){
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

},{"./Roletype":39}],44:[function(require,module,exports){
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

},{"./Roletype":39}],45:[function(require,module,exports){
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

},{"./../type/boolean":50,"./../utils/getActive":56,"./abstract/Input":36}],46:[function(require,module,exports){
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

},{"./Textbox":33}],47:[function(require,module,exports){
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


function mutationObserverCallback(mutations) {
	mutations.forEach(function (mutation) {
		if (mutation.type == "attributes") {
			var attrName = mutation.attributeName;
			// update to new value
			this._.rawAttrs[attrName] = this.element.getAttribute(attrName);
		}

		var listeners = this._.listeners.get("mutation");
		console.log(listeners);
	}.bind(this));
}

/**
 * Based on the AOM spec
 * @class
 */

var AccessibleNode = function AccessibleNode(element) {
	_classCallCheck(this, AccessibleNode);

	// store the element where the AccessibleNode is retrieved from
	Object.defineProperty(this, "element", { value: element });

	// clean options object
	Object.defineProperty(this, "_", { value: { mutations: [], rawAttrs: {} } });

	// add all aria-* attributes and role attribute to the observer
	this._.mutations = ["role", "aria-activedescendant", "aria-atomic", "aria-autocomplete", "aria-busy", "aria-checked", "aria-colcount", "aria-colindex", "aria-colspan", "aria-controls", "aria-current", "aria-describedby", "aria-details", "aria-disabled", "aria-dropeffect", "aria-errormessage", "aria-expanded", "aria-flowto", "aria-grabbed", "aria-haspopup", "aria-hidden", "aria-invalid", "aria-keyshortcuts", "aria-label", "aria-labelledby", "aria-level", "aria-live", "aria-modal", "aria-multiline", "aria-multiselectable", "aria-orientation", "aria-owns", "aria-placeholder", "aria-posinset", "aria-pressed", "aria-readonly", "aria-relevant", "aria-required", "aria-roledescription", "aria-rowcount", "aria-rowindex", "aria-rowspan", "aria-selected", "aria-setsize", "aria-sort", "aria-valuemax", "aria-valuemin", "aria-valuenow", "aria-valuetext"];
	console.log(this.element, { attributes: true, childList: true, attributeFilter: this._.mutations });
	// start the mutation observer
	var observer = new MutationObserver(mutationObserverCallback.bind(this));
	observer.observe(this.element, { attributes: true, childList: true, attributeFilter: this._.mutations });

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

},{"../utils/elements":55,"./AccessibleNodeList":48,"./DOMString":49,"./boolean":50,"./double":51,"./long":52}],48:[function(require,module,exports){
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
	var ids = getIds(ay.element, attribute);

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

},{"../utils/elements":55,"./../utils/create":54,"./AccessibleNode":47}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.get = get;
exports.set = set;
exports.toggle = toggle;
var IS_ACTIVE = exports.IS_ACTIVE = "true",
    IS_NOT_ACTIVE = exports.IS_NOT_ACTIVE = "false";

/**
 * Returns the value of a given attribute
 * @param {AccessibleNode} ay 
 * @param {String} attributeName 
 * @return {String} attribute's value
 */
function get(ay, attributeName) {
	var value = ay._.rawAttrs.attributeName || ay.element.getAttribute(attributeName);
	if (value == undefined) return;
	return value;
}

/**
 * Sync the new value to the DOM
 * @param {AccessibleNode} ay 
 * @param {String} attributeName 
 * @param {String | Number } status 
 */
function set(ay, attributeName, status) {
	if (status == undefined) {
		ay.element.removeAttribute(attributeName);
	} else {
		ay.element.setAttribute(attributeName, status);
	}

	return status;
}

/**
* Returns the opposite state of the attribute,
* needed when attribute uses an token list
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

},{}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.get = get;
exports.set = set;
exports.toggle = toggle;
var IS_ACTIVE = exports.IS_ACTIVE = true,
    IS_NOT_ACTIVE = exports.IS_NOT_ACTIVE = false;

/**
 * Returns the value of given attribute as Boolean
 * @param {AccessibleNode} ay 
 * @param {String} attributeName 
 * @return {Boolean} attribute's value
 */
function get(ay, attributeName) {
	var value = ay._.rawAttrs.attributeName || ay.element.getAttribute(attributeName);
	if (value == undefined) return;
	return value == "true" || false;
}

/**
 * Sync the new value to the property
 * @param {AccessibleNode} ay 
 * @param {String} attributeName 
 * @param {String | Boolean} status 
 */
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

},{}],51:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.set = set;
/**
 * Returns the value of a given attribute as Number
 * @param {AccessibleNode} ay 
 * @param {String} attributeName 
 * @return {Number} attribute's value
 */
function get(ay, attributeName) {
  var value = ay._.rawAttrs.attributeName || ay.element.getAttribute(attributeName);
  if (value == undefined) return;
  return Number(value);
}

/**
 * Sync the new value to the DOM
 * @param {AccessibleNode} ay 
 * @param {String} attributeName 
 * @param {String | Number } status 
 */
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
exports.get = get;
exports.set = set;
/**
 * Returns the value of a given attribute as Integer
 * @param {AccessibleNode} ay 
 * @param {String} attributeName 
 * @return {Number} attribute's value
 */
function get(ay, attributeName) {
  var value = ay._.rawAttrs.attributeName || ay.element.getAttribute(attributeName);
  if (value == undefined) return;
  return parseInt(value);
}

/**
 * Sync the new value to the DOM
 * @param {AccessibleNode} ay 
 * @param {String} attributeName 
 * @param {String | Number } status 
 */
function set(ay, attributeName, str) {
  if (str == null) {
    ay.element.removeAttribute(attributeName);
  } else {
    ay.element.setAttribute(attributeName, str);
  }
}

exports.default = { get: get, set: set };

},{}],53:[function(require,module,exports){
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

},{"./create":54}],54:[function(require,module,exports){
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

},{"./../role/Button":19,"./../role/Checkbox":20,"./../role/Combobox":21,"./../role/Dialog":22,"./../role/Form":23,"./../role/Link":24,"./../role/Listbox":25,"./../role/Slider":27,"./../role/Spinbutton":28,"./../role/Switch":29,"./../role/Tab":30,"./../role/Tablist":31,"./../role/Tabpanel":32,"./../role/Textbox":33,"./../role/abstract/Range":38,"./../role/abstract/Roletype":39,"./../role/option":45,"./../role/searchbox":46,"./elements":55,"./getComputedRole":57,"./selector":59}],55:[function(require,module,exports){
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

},{"./create":54,"./getComputedRole":57}],56:[function(require,module,exports){
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

},{"./elements":55}],57:[function(require,module,exports){
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

},{"./../data/roles.js":16}],58:[function(require,module,exports){
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

},{}],59:[function(require,module,exports){
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

},{"./../data/roles":16}]},{},[11])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXNcXEB2ZXN0ZXJnYWFyZC1jb21wYW55XFxqcy1taXhpblxcaW5kZXguanMiLCJub2RlX21vZHVsZXNcXEB2ZXN0ZXJnYWFyZC1jb21wYW55XFxqcy1taXhpblxcc3JjXFxCdWlsZGVyLmpzIiwibm9kZV9tb2R1bGVzXFxAdmVzdGVyZ2FhcmQtY29tcGFueVxcanMtbWl4aW5cXHNyY1xcRGVjb3JhdG9yc1xcQmFyZU1peGluLmpzIiwibm9kZV9tb2R1bGVzXFxAdmVzdGVyZ2FhcmQtY29tcGFueVxcanMtbWl4aW5cXHNyY1xcRGVjb3JhdG9yc1xcQ2FjaGVkLmpzIiwibm9kZV9tb2R1bGVzXFxAdmVzdGVyZ2FhcmQtY29tcGFueVxcanMtbWl4aW5cXHNyY1xcRGVjb3JhdG9yc1xcSGFzSW5zdGFuY2UuanMiLCJub2RlX21vZHVsZXNcXEB2ZXN0ZXJnYWFyZC1jb21wYW55XFxqcy1taXhpblxcc3JjXFxVdGlsc1xcd3JhcC5qcyIsIm5vZGVfbW9kdWxlc1xcQHZlc3RlcmdhYXJkLWNvbXBhbnlcXGpzLW1peGluXFxzcmNcXGRlY2xhcmUuanMiLCJub2RlX21vZHVsZXNcXEB2ZXN0ZXJnYWFyZC1jb21wYW55XFxqcy1taXhpblxcc3JjXFxtaXguanMiLCJub2RlX21vZHVsZXMvbW91c2V0cmFwL21vdXNldHJhcC5qcyIsIm5vZGVfbW9kdWxlcy9vYmplY3QtcGF0aC9pbmRleC5qcyIsInNyY1xcYXBwLmpzIiwic3JjXFxhdHRyaWJ1dGVzXFxhcmlhLWNoZWNrZWQuanMiLCJzcmNcXGF0dHJpYnV0ZXNcXGFyaWEtZXhwYW5kZWQuanMiLCJzcmNcXGF0dHJpYnV0ZXNcXGFyaWEtcHJlc3NlZC5qcyIsInNyY1xcYXR0cmlidXRlc1xcYXJpYS1zZWxlY3RlZC5qcyIsInNyY1xcZGF0YVxccm9sZXMuanMiLCJzcmNcXG1peGluc1xcU2VsZWN0aW9uLmpzIiwic3JjXFxtaXhpbnNcXFZhbGlkYXRpb24uanMiLCJzcmNcXHJvbGVcXEJ1dHRvbi5qcyIsInNyY1xccm9sZVxcQ2hlY2tib3guanMiLCJzcmNcXHJvbGVcXENvbWJvYm94LmpzIiwic3JjXFxyb2xlXFxEaWFsb2cuanMiLCJzcmNcXHJvbGVcXEZvcm0uanMiLCJzcmNcXHJvbGVcXExpbmsuanMiLCJzcmNcXHJvbGVcXExpc3Rib3guanMiLCJzcmNcXHJvbGVcXE9wdGlvbi5qcyIsInNyY1xccm9sZVxcU2xpZGVyLmpzIiwic3JjXFxyb2xlXFxTcGluYnV0dG9uLmpzIiwic3JjXFxyb2xlXFxTd2l0Y2guanMiLCJzcmNcXHJvbGVcXFRhYi5qcyIsInNyY1xccm9sZVxcVGFibGlzdC5qcyIsInNyY1xccm9sZVxcVGFicGFuZWwuanMiLCJzcmNcXHJvbGVcXFRleHRib3guanMiLCJzcmNcXHJvbGVcXGFic3RyYWN0XFxDb21tYW5kLmpzIiwic3JjXFxyb2xlXFxhYnN0cmFjdFxcQ29tcG9zaXRlLmpzIiwic3JjXFxyb2xlXFxhYnN0cmFjdFxcSW5wdXQuanMiLCJzcmNcXHJvbGVcXGFic3RyYWN0XFxMYW5kbWFyay5qcyIsInNyY1xccm9sZVxcYWJzdHJhY3RcXFJhbmdlLmpzIiwic3JjXFxyb2xlXFxhYnN0cmFjdFxcUm9sZXR5cGUuanMiLCJzcmNcXHJvbGVcXGFic3RyYWN0XFxTZWN0aW9uLmpzIiwic3JjXFxyb2xlXFxhYnN0cmFjdFxcU2VsZWN0LmpzIiwic3JjXFxyb2xlXFxhYnN0cmFjdFxcU3RydWN0dXJlLmpzIiwic3JjXFxyb2xlXFxhYnN0cmFjdFxcV2lkZ2V0LmpzIiwic3JjXFxyb2xlXFxhYnN0cmFjdFxcV2luZG93LmpzIiwic3JjXFxyb2xlXFxvcHRpb24uanMiLCJzcmNcXHJvbGVcXHNlYXJjaGJveC5qcyIsInNyY1xcdHlwZVxcQWNjZXNzaWJsZU5vZGUuanMiLCJzcmNcXHR5cGVcXEFjY2Vzc2libGVOb2RlTGlzdC5qcyIsInNyY1xcdHlwZVxcRE9NU3RyaW5nLmpzIiwic3JjXFx0eXBlXFxib29sZWFuLmpzIiwic3JjXFx0eXBlXFxkb3VibGUuanMiLCJzcmNcXHR5cGVcXGxvbmcuanMiLCJzcmNcXHV0aWxzXFxWYWxpZGl0eVN0YXRlLmpzIiwic3JjXFx1dGlsc1xcY3JlYXRlLmpzIiwic3JjXFx1dGlsc1xcZWxlbWVudHMuanMiLCJzcmNcXHV0aWxzXFxnZXRBY3RpdmUuanMiLCJzcmNcXHV0aWxzXFxnZXRDb21wdXRlZFJvbGUuanMiLCJzcmNcXHV0aWxzXFxtYW5hZ2luZ0ZvY3VzLmpzIiwic3JjXFx1dGlsc1xcc2VsZWN0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDRUE7Ozs7QUFJQTs7OztBQUlBOzs7O0FBR0E7Ozs7QUFHQTs7OztBQUlBOzs7Ozs7OztBQWZBOztBQUpBOztRQU1TLFk7O0FBRVQ7O1FBRVMsUztRQUdBLFc7UUFHQSxNOztBQUVUOztRQUVTLEk7OztBQ3JCVDs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBWU0sTzs7QUFFRjs7Ozs7QUFLQSxxQkFBWSxVQUFaLEVBQXVCO0FBQUE7O0FBQ25CLGFBQUssVUFBTCxHQUFrQjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLFdBQWxCO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs7O2dDQU9lO0FBQUEsOENBQVAsTUFBTztBQUFQLHNCQUFPO0FBQUE7O0FBQ1gsbUJBQU8sT0FBTyxNQUFQLENBQWMsVUFBQyxDQUFELEVBQUksQ0FBSixFQUFVOztBQUUzQixvQkFBRyxPQUFPLENBQVAsS0FBYSxVQUFoQixFQUEyQjtBQUN2QiwyQkFBTyxDQUFQO0FBQ0g7O0FBRUQsdUJBQU8sRUFBRSxDQUFGLENBQVA7QUFDSCxhQVBNLEVBT0osS0FBSyxVQVBELENBQVA7QUFRSDs7Ozs7O2tCQUdVLE87OztBQzVDZjs7Ozs7OztBQUVBOzs7Ozs7QUFHQTs7Ozs7QUFLTyxJQUFNLDRDQUFrQixPQUFPLFVBQVAsQ0FBeEI7O0FBRVA7Ozs7Ozs7Ozs7QUFVQSxJQUFNLFlBQVksU0FBWixTQUFZLENBQUMsVUFBRDtBQUFB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QUQ7QUFBQSxTQUFnQixzQkFBWSxVQUFaLENBQWhCO0FBQUEsQ0FBWjs7a0JBRWUsRzs7O0FDZmY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcGhDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUEwQixJQUExQixDQUErQixJQUEvQixDQUFQO0FBQ0E7O2tCQUVjLEVBQUUsZ0JBQUYsRUFBVyxRQUFYLEVBQWdCLHdCQUFoQixFQUE2QixnQkFBN0IsRSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbi8vIERlZmF1bHQgZXhwb3J0IC0gTWl4IHdyYXBwZXJcbmltcG9ydCBtaXggZnJvbSAnLi9zcmMvbWl4JztcbmV4cG9ydCBkZWZhdWx0IG1peDtcblxuLy8gRGVjbGFyZSBtaXhpbiBjbGFzc2VzXG5pbXBvcnQgRGVjbGFyZU1peGluIGZyb20gJy4vc3JjL2RlY2xhcmUnO1xuZXhwb3J0IHsgRGVjbGFyZU1peGluIH07XG5cbi8vIERlY29yYXRvcnNcbmltcG9ydCBCYXJlTWl4aW4gZnJvbSAnLi9zcmMvRGVjb3JhdG9ycy9CYXJlTWl4aW4nO1xuZXhwb3J0IHsgQmFyZU1peGluIH07XG5cbmltcG9ydCBIYXNJbnN0YW5jZSBmcm9tICcuL3NyYy9EZWNvcmF0b3JzL0hhc0luc3RhbmNlJztcbmV4cG9ydCB7IEhhc0luc3RhbmNlIH07XG5cbmltcG9ydCBDYWNoZWQgZnJvbSAnLi9zcmMvRGVjb3JhdG9ycy9DYWNoZWQnO1xuZXhwb3J0IHsgQ2FjaGVkIH07XG5cbi8vIFV0aWxzXG5pbXBvcnQgd3JhcCBmcm9tICcuL3NyYy9VdGlscy93cmFwJztcbmV4cG9ydCB7IHdyYXAgfTsiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTWl4aW4gQnVpbGRlclxuICpcbiAqIEFsbG93cyB5b3UgdG8gZXh0ZW5kIGEgY2xhc3Mgd2l0aCBvbmUgb3IgbW9yZSBtaXhpbiBjbGFzc2VzLlxuICpcbiAqIFRoaXMgYnVpbGRlciBpcyBoZWF2aWx5IGluc3BpcmVkIGJ5IEp1c3RpbiBGYWduYW5pJ3MgTWl4d2l0aC5qc1xuICpcbiAqIEBzZWUgaHR0cDovL2p1c3RpbmZhZ25hbmkuY29tLzIwMTUvMTIvMjEvcmVhbC1taXhpbnMtd2l0aC1qYXZhc2NyaXB0LWNsYXNzZXMvXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qdXN0aW5mYWduYW5pL21peHdpdGguanNcbiAqXG4gKiBAYXV0aG9yIEFsaW4gRXVnZW4gRGVhYyA8YWRlQHZlc3RlcmdhYXJkY29tcGFueS5jb20+XG4gKi9cbmNsYXNzIEJ1aWxkZXIge1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IEJ1aWxkZXIgaW5zdGFuY2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtzdXBlckNsYXNzPWNsYXNzIHt9XVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHN1cGVyQ2xhc3Mpe1xuICAgICAgICB0aGlzLnN1cGVyQ2xhc3MgPSBzdXBlckNsYXNzIHx8IGNsYXNzIHt9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1peGluIG9uZSBvciBtb3JlIG1peGluLWNsYXNzZXNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXkuPEZ1bmN0aW9uPn0gbWl4aW5zXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBzdXBjbGFzcyB3aXRoIG1peGlucyBhcHBsaWVkXG4gICAgICovXG4gICAgd2l0aCguLi5taXhpbnMpe1xuICAgICAgICByZXR1cm4gbWl4aW5zLnJlZHVjZSgoYywgbSkgPT4ge1xuXG4gICAgICAgICAgICBpZih0eXBlb2YgbSAhPT0gJ2Z1bmN0aW9uJyl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBtKGMpO1xuICAgICAgICB9LCB0aGlzLnN1cGVyQ2xhc3MpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQnVpbGRlcjsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IE9SSUdJTkFMX01JWElOIH0gZnJvbSAnLi8uLi9VdGlscy93cmFwJztcbmltcG9ydCB3cmFwIGZyb20gJy4vLi4vVXRpbHMvd3JhcCc7XG5cbi8qKlxuICogUmVmZXJlbmNlIHRvIGEgbWl4aW5cbiAqXG4gKiBAdHlwZSB7U3ltYm9sfVxuICovXG5leHBvcnQgY29uc3QgTUlYSU5fUkVGRVJFTkNFID0gU3ltYm9sKCdtaXhpblJlZicpO1xuXG4vKipcbiAqIERlY29yYXRvciB0aGF0IHN0b3JlcyBhIHJlZmVyZW5jZSB0byB0aGUgbWl4aW4gY2xhc3MsIHdoaWNoXG4gKiB1bHRpbWF0ZWx5IGNhbiBiZSB1c2VkIGZvciBcImluc3RhbmNlIG9mXCIgY2hlY2tzLlxuICpcbiAqIEBzZWUgd3JhcFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1peGluQ2xhc3NcbiAqXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gRGVjb3JhdGVkIG1peGluXG4gKi9cbmNvbnN0IEJhcmVNaXhpbiA9IChtaXhpbkNsYXNzKSA9PiB3cmFwKG1peGluQ2xhc3MsIChzdXBlcmNsYXNzKSA9PiB7XG4gICAgLy8gQXBwbHkgdGhlIG1peGluIGNsYXNzXG4gICAgbGV0IGFwcCA9IG1peGluQ2xhc3Moc3VwZXJjbGFzcyk7XG5cbiAgICAvLyBBZGQgcmVmZXJlbmNlIHRvIHRoZSB3cmFwcGVkIG1peGluIGNsYXNzLCBzbyB0aGF0IHdlIGNhbiBlbmFibGVcbiAgICAvLyBhIFwiaW5zdGFuY2Ugb2ZcIiBzdXBwb3J0LlxuICAgIGFwcC5wcm90b3R5cGVbTUlYSU5fUkVGRVJFTkNFXSA9IG1peGluQ2xhc3NbT1JJR0lOQUxfTUlYSU5dO1xuXG4gICAgcmV0dXJuIGFwcDtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBCYXJlTWl4aW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgd3JhcCBmcm9tICcuLy4uL1V0aWxzL3dyYXAnO1xuXG4vKipcbiAqIENhY2hlZCBtaXhpbiBjbGFzcyByZWZlcmVuY2VcbiAqXG4gKiBAdHlwZSB7U3ltYm9sfVxuICovXG5leHBvcnQgY29uc3QgQ0FDSEVEX1JFRkVSRU5DRSA9IFN5bWJvbCgnY2FjaGVkUmVmJyk7XG5cbi8qKlxuICogRGVjb3JhdGUgdGhlIGdpdmVuIG1peGluIGNsYXNzIHdpdGggYSBcImNhY2hlZCBkZWNvcmF0b3JcIi5cbiAqXG4gKiBNZXRob2Qgd2lsbCBlbnN1cmUgdGhhdCBpZiB0aGUgZ2l2ZW4gbWl4aW4gaGFzIGFscmVhZHkgYmVlbiBhcHBsaWVkLFxuICogdGhlbiBpdCB3aWxsIGJlIHJldHVybmVkIC8gYXBwbGllZCBhIHNpbmdsZSB0aW1lLCByYXRoZXIgdGhhbiBtdWx0aXBsZVxuICogdGltZXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWl4aW5DbGFzc1xuICpcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICovXG5jb25zdCBDYWNoZWQgPSAobWl4aW5DbGFzcykgPT4gd3JhcChtaXhpbkNsYXNzLCAoc3VwZXJjbGFzcykgPT4ge1xuICAgIC8vIE9idGFpbiBjYWNoZWQgcmVmZXJlbmNlLi4uXG4gICAgbGV0IGNhY2hlZFJlZmVyZW5jZSA9IG1peGluQ2xhc3NbQ0FDSEVEX1JFRkVSRU5DRV07XG5cbiAgICAvLyBJZiB0aGVyZSBpcyBubyBjYWNoZWQgcmVmZXJlbmNlLCB0aGVuIHdlIGNyZWF0ZSBvbmUgb250b1xuICAgIC8vIHRoZSBnaXZlbiBtaXhpbiBjbGFzc1xuICAgIGlmKCAhIGNhY2hlZFJlZmVyZW5jZSl7XG5cbiAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IHN5bWJvbCBpbiB0aGUgbWl4aW4gY2xhc3MsIHVzaW5nIHRoZSBmdW5jdGlvbidzIG5hbWVcbiAgICAgICAgLy8gQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9GdW5jdGlvbi9uYW1lXG4gICAgICAgIGNhY2hlZFJlZmVyZW5jZSA9IG1peGluQ2xhc3NbQ0FDSEVEX1JFRkVSRU5DRV0gPSBTeW1ib2wobWl4aW5DbGFzcy5uYW1lKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBpZiBnaXZlbiBzdXBlcmNsYXNzIGFscmVhZHkgaGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnaXZlbiBtaXhpbiBjbGFzc1xuICAgIC8vIElmIHNvLCB0aGVuIHJldHVybiBpdC5cbiAgICBpZihzdXBlcmNsYXNzLmhhc093blByb3BlcnR5KGNhY2hlZFJlZmVyZW5jZSkpe1xuICAgICAgICByZXR1cm4gc3VwZXJjbGFzc1tjYWNoZWRSZWZlcmVuY2VdO1xuICAgIH1cblxuICAgIC8vIERlY29yYXRlIHRoZSBnaXZlbiBzdXBlciBjbGFzc1xuICAgIGxldCBkZWNvcmF0ZWQgPSBtaXhpbkNsYXNzKHN1cGVyY2xhc3MpO1xuXG4gICAgLy8gQ2FjaGUgdGhlIHJlZmVyZW5jZSBpbnRvIHRoZSBzdXBlcmNsYXNzXG4gICAgc3VwZXJjbGFzc1tjYWNoZWRSZWZlcmVuY2VdID0gZGVjb3JhdGVkO1xuXG4gICAgLy8gRmluYWxseSwgcmV0dXJuIHRoZSBkZWNvcmF0ZWQgbWl4aW4uXG4gICAgcmV0dXJuIGRlY29yYXRlZDtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBDYWNoZWQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBPUklHSU5BTF9NSVhJTiB9IGZyb20gJy4vLi4vVXRpbHMvd3JhcCc7XG5pbXBvcnQgeyBNSVhJTl9SRUZFUkVOQ0UgfSBmcm9tICcuL0JhcmVNaXhpbic7XG5cbi8qKlxuICogRGVjb3JhdGVzIHRoZSBnaXZlbiBtaXhpbiBjbGFzcyB0byBzdXBwb3J0IFwiaW5zdGFuY2Ugb2ZcIiBvcGVyYXRpb24uXG4gKlxuICogVGhlIGdpdmVuIG1peGluIGNsYXNzIE1VU1QgYmUgZGVjb3JhdGVkIHdpdGggdGhlIFwiQmFyZU1peGluXCIgZm9yIHRoaXNcbiAqIHRvIHdvcmsuXG4gKlxuICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9TeW1ib2wvaGFzSW5zdGFuY2VcbiAqIEBzZWUgQmFyZU1peGluXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWl4aW5DbGFzc1xuICogQHJldHVybiB7RnVuY3Rpb259IERlY29yYXRlZCBtaXhpbiBjbGFzc1xuICovXG5jb25zdCBIYXNJbnN0YW5jZSA9IChtaXhpbkNsYXNzKSA9PiB7XG5cbiAgICAvLyBJZiBnaXZlbiBtaXhpbiBjbGFzcyBhbHJlYWR5IGhhcyBhIGN1c3RvbSBcImhhcyBpbnN0YW5jZVwiXG4gICAgLy8gc3ltYm9sLCB0aGVuIGFib3J0IC0ganVzdCByZXR1cm4gdGhlIG1peGluLCBzaW5jZSB0aGVyZVxuICAgIC8vIGlzIG5vIG5lZWQgdG8gYWRkIGN1c3RvbSBiZWhhdmlvdXIgdG8gaXQuXG4gICAgaWYobWl4aW5DbGFzcy5oYXNPd25Qcm9wZXJ0eShTeW1ib2wuaGFzSW5zdGFuY2UpKXtcbiAgICAgICAgcmV0dXJuIG1peGluQ2xhc3M7XG4gICAgfVxuXG4gICAgLy8gT3RoZXJ3aXNlLCB3ZSBhZGQgYSBjdXN0b20gU3ltYm9sLmhhc0luc3RhbmNlIG1ldGhvZCBmb3JcbiAgICAvLyB0aGUgbWl4aW4gY2xhc3MuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG1peGluQ2xhc3MsIFN5bWJvbC5oYXNJbnN0YW5jZSwge1xuXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbihpbnN0YW5jZSl7XG4gICAgICAgICAgICAvLyBGZXRjaCB0aGUgb3JpZ2luYWwgbWl4aW4gY2xhc3NcbiAgICAgICAgICAgIGxldCBvcmlnaW5hbE1peGluQ2xhc3MgPSB0aGlzW09SSUdJTkFMX01JWElOXTtcblxuICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gb3JpZ2luYWwgbWl4aW4gY2xhc3MsIHRoZW4gd2Ugc2ltcGx5XG4gICAgICAgICAgICAvLyBhYm9ydCAtIGl0IGNhbm5vdCBiZSBhbiBpbnN0YW5jZSBvZiB0aGUgZ2l2ZW4uLi5cbiAgICAgICAgICAgIGlmKCAhIG9yaWdpbmFsTWl4aW5DbGFzcyl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBMb29wIHRocm91Z2ggdGhlIGdpdmVuIGluc3RhbmNlJ3MgcHJvdG90eXBlIGNoYWluXG4gICAgICAgICAgICB3aGlsZShpbnN0YW5jZSAhPT0gbnVsbCl7XG5cbiAgICAgICAgICAgICAgICAvLyBJZiBhIHJlZmVyZW5jZSBoYXMgYmVlbiBzdGF0ZWQgb24gdGhlIG1peGluIGNsYXNzIGFuZCBpdFxuICAgICAgICAgICAgICAgIC8vIG1hdGNoZXMgdGhlIG9yaWdpbmFsIG1peGluLCB3ZSBhc3N1bWUgdGhhdFxuICAgICAgICAgICAgICAgIGlmKGluc3RhbmNlLmhhc093blByb3BlcnR5KE1JWElOX1JFRkVSRU5DRSkgJiYgaW5zdGFuY2VbTUlYSU5fUkVGRVJFTkNFXSA9PT0gb3JpZ2luYWxNaXhpbkNsYXNzKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gRmV0Y2ggdGhlIG5leHQgcHJvdG90eXBlXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoaW5zdGFuY2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBJZiBub3RoaW5nIHdhcyBtYXRjaGVkLCB0aGVuIHdlIGFzc3VtZSB0aGF0IHRoZSBpbnN0YW5jZXNcbiAgICAgICAgICAgIC8vIHNpbXBseSBkbyBub3QgbWF0Y2guXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgLy8gRmluYWxseSwgcmV0dXJuIHRoZSBkZWNvcmF0ZWQgbWl4aW4gY2xhc3NcbiAgICByZXR1cm4gbWl4aW5DbGFzcztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEhhc0luc3RhbmNlOyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBSZWZlcmVuY2UgdG8gYW4gb3JpZ2luYWwgbWl4aW5cbiAqXG4gKiBAdHlwZSB7U3ltYm9sfVxuICovXG5leHBvcnQgY29uc3QgT1JJR0lOQUxfTUlYSU4gPSBTeW1ib2woJ29yaWdpbmFsTWl4aW4nKTtcblxuLyoqXG4gKiBTZXRzIHRoZSBwcm90b3R5cGUgb2YgdGhlIHdyYXBwZXIgdG8gYmUgdGhlIGdpdmVuIG1peGluIGNsYXNzXG4gKiBhbmQgc3RvcmVzIGEgcmVmZXJlbmNlIHRvIHRoZSBvcmlnaW5hbCBtaXhpbi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtaXhpbkNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB3cmFwcGVyXG4gKlxuICogQHJldHVybiB7RnVuY3Rpb259IFdyYXBwZXJcbiAqL1xuY29uc3Qgd3JhcCA9IChtaXhpbkNsYXNzLCB3cmFwcGVyKSA9PiB7XG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHdyYXBwZXIsIG1peGluQ2xhc3MpO1xuXG4gICAgaWYgKCFtaXhpbkNsYXNzW09SSUdJTkFMX01JWElOXSkge1xuICAgICAgICBtaXhpbkNsYXNzW09SSUdJTkFMX01JWElOXSA9IG1peGluQ2xhc3M7XG4gICAgfVxuXG4gICAgcmV0dXJuIHdyYXBwZXI7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB3cmFwOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEJhcmVNaXhpbiBmcm9tICcuL0RlY29yYXRvcnMvQmFyZU1peGluJztcbmltcG9ydCBIYXNJbnN0YW5jZSBmcm9tICcuL0RlY29yYXRvcnMvSGFzSW5zdGFuY2UnO1xuaW1wb3J0IENhY2hlZCBmcm9tICcuL0RlY29yYXRvcnMvQ2FjaGVkJztcblxuLyoqXG4gKiBEZWNsYXJlIGEgbWl4aW4gLSBkZWNvcmF0ZXMgdGhlIGdpdmVuIG1peGluIGNsYXNzIHdpdGhcbiAqIGEgXCJjYWNoZWQsIGhhcyBpbnN0YW5jZSBhbmQgYmFyZSBtaXhpblwiIGRlY29yYXRvcnMuXG4gKlxuICogQHNlZSBCYXJlTWl4aW5cbiAqIEBzZWUgSGFzSW5zdGFuY2VcbiAqIEBzZWUgQ2FjaGVkXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWl4aW5DbGFzc1xuICpcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICovXG5jb25zdCBEZWNsYXJlTWl4aW4gPSAobWl4aW5DbGFzcykgPT4ge1xuICAgIHJldHVybiBDYWNoZWQoXG4gICAgICAgIEhhc0luc3RhbmNlKFxuICAgICAgICAgICAgQmFyZU1peGluKG1peGluQ2xhc3MpXG4gICAgICAgIClcbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRGVjbGFyZU1peGluOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEJ1aWxkZXIgZnJvbSAnLi9CdWlsZGVyJztcblxuLyoqXG4gKiBNaXhpbiBCdWlsZGVyIHdyYXBwZXJcbiAqXG4gKiBBbGxvd3MgeW91IHRvIGV4dGVuZCBhIGNsYXNzIHdpdGggb25lIG9yIG1vcmUgbWl4aW4tY2xhc3Nlcy5cbiAqXG4gKiBAc2VlIEJ1aWxkZXJcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBbc3VwZXJDbGFzcz1jbGFzcyB7fV1cbiAqL1xuY29uc3QgbWl4ID0gKHN1cGVyQ2xhc3MpID0+IG5ldyBCdWlsZGVyKHN1cGVyQ2xhc3MpO1xuXG5leHBvcnQgZGVmYXVsdCBtaXg7IiwiLypnbG9iYWwgZGVmaW5lOmZhbHNlICovXG4vKipcbiAqIENvcHlyaWdodCAyMDEyLTIwMTcgQ3JhaWcgQ2FtcGJlbGxcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBNb3VzZXRyYXAgaXMgYSBzaW1wbGUga2V5Ym9hcmQgc2hvcnRjdXQgbGlicmFyeSBmb3IgSmF2YXNjcmlwdCB3aXRoXG4gKiBubyBleHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqXG4gKiBAdmVyc2lvbiAxLjYuMVxuICogQHVybCBjcmFpZy5pcy9raWxsaW5nL21pY2VcbiAqL1xuKGZ1bmN0aW9uKHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCkge1xuXG4gICAgLy8gQ2hlY2sgaWYgbW91c2V0cmFwIGlzIHVzZWQgaW5zaWRlIGJyb3dzZXIsIGlmIG5vdCwgcmV0dXJuXG4gICAgaWYgKCF3aW5kb3cpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIG1hcHBpbmcgb2Ygc3BlY2lhbCBrZXljb2RlcyB0byB0aGVpciBjb3JyZXNwb25kaW5nIGtleXNcbiAgICAgKlxuICAgICAqIGV2ZXJ5dGhpbmcgaW4gdGhpcyBkaWN0aW9uYXJ5IGNhbm5vdCB1c2Uga2V5cHJlc3MgZXZlbnRzXG4gICAgICogc28gaXQgaGFzIHRvIGJlIGhlcmUgdG8gbWFwIHRvIHRoZSBjb3JyZWN0IGtleWNvZGVzIGZvclxuICAgICAqIGtleXVwL2tleWRvd24gZXZlbnRzXG4gICAgICpcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHZhciBfTUFQID0ge1xuICAgICAgICA4OiAnYmFja3NwYWNlJyxcbiAgICAgICAgOTogJ3RhYicsXG4gICAgICAgIDEzOiAnZW50ZXInLFxuICAgICAgICAxNjogJ3NoaWZ0JyxcbiAgICAgICAgMTc6ICdjdHJsJyxcbiAgICAgICAgMTg6ICdhbHQnLFxuICAgICAgICAyMDogJ2NhcHNsb2NrJyxcbiAgICAgICAgMjc6ICdlc2MnLFxuICAgICAgICAzMjogJ3NwYWNlJyxcbiAgICAgICAgMzM6ICdwYWdldXAnLFxuICAgICAgICAzNDogJ3BhZ2Vkb3duJyxcbiAgICAgICAgMzU6ICdlbmQnLFxuICAgICAgICAzNjogJ2hvbWUnLFxuICAgICAgICAzNzogJ2xlZnQnLFxuICAgICAgICAzODogJ3VwJyxcbiAgICAgICAgMzk6ICdyaWdodCcsXG4gICAgICAgIDQwOiAnZG93bicsXG4gICAgICAgIDQ1OiAnaW5zJyxcbiAgICAgICAgNDY6ICdkZWwnLFxuICAgICAgICA5MTogJ21ldGEnLFxuICAgICAgICA5MzogJ21ldGEnLFxuICAgICAgICAyMjQ6ICdtZXRhJ1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBtYXBwaW5nIGZvciBzcGVjaWFsIGNoYXJhY3RlcnMgc28gdGhleSBjYW4gc3VwcG9ydFxuICAgICAqXG4gICAgICogdGhpcyBkaWN0aW9uYXJ5IGlzIG9ubHkgdXNlZCBpbmNhc2UgeW91IHdhbnQgdG8gYmluZCBhXG4gICAgICoga2V5dXAgb3Iga2V5ZG93biBldmVudCB0byBvbmUgb2YgdGhlc2Uga2V5c1xuICAgICAqXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICB2YXIgX0tFWUNPREVfTUFQID0ge1xuICAgICAgICAxMDY6ICcqJyxcbiAgICAgICAgMTA3OiAnKycsXG4gICAgICAgIDEwOTogJy0nLFxuICAgICAgICAxMTA6ICcuJyxcbiAgICAgICAgMTExIDogJy8nLFxuICAgICAgICAxODY6ICc7JyxcbiAgICAgICAgMTg3OiAnPScsXG4gICAgICAgIDE4ODogJywnLFxuICAgICAgICAxODk6ICctJyxcbiAgICAgICAgMTkwOiAnLicsXG4gICAgICAgIDE5MTogJy8nLFxuICAgICAgICAxOTI6ICdgJyxcbiAgICAgICAgMjE5OiAnWycsXG4gICAgICAgIDIyMDogJ1xcXFwnLFxuICAgICAgICAyMjE6ICddJyxcbiAgICAgICAgMjIyOiAnXFwnJ1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiB0aGlzIGlzIGEgbWFwcGluZyBvZiBrZXlzIHRoYXQgcmVxdWlyZSBzaGlmdCBvbiBhIFVTIGtleXBhZFxuICAgICAqIGJhY2sgdG8gdGhlIG5vbiBzaGlmdCBlcXVpdmVsZW50c1xuICAgICAqXG4gICAgICogdGhpcyBpcyBzbyB5b3UgY2FuIHVzZSBrZXl1cCBldmVudHMgd2l0aCB0aGVzZSBrZXlzXG4gICAgICpcbiAgICAgKiBub3RlIHRoYXQgdGhpcyB3aWxsIG9ubHkgd29yayByZWxpYWJseSBvbiBVUyBrZXlib2FyZHNcbiAgICAgKlxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgdmFyIF9TSElGVF9NQVAgPSB7XG4gICAgICAgICd+JzogJ2AnLFxuICAgICAgICAnISc6ICcxJyxcbiAgICAgICAgJ0AnOiAnMicsXG4gICAgICAgICcjJzogJzMnLFxuICAgICAgICAnJCc6ICc0JyxcbiAgICAgICAgJyUnOiAnNScsXG4gICAgICAgICdeJzogJzYnLFxuICAgICAgICAnJic6ICc3JyxcbiAgICAgICAgJyonOiAnOCcsXG4gICAgICAgICcoJzogJzknLFxuICAgICAgICAnKSc6ICcwJyxcbiAgICAgICAgJ18nOiAnLScsXG4gICAgICAgICcrJzogJz0nLFxuICAgICAgICAnOic6ICc7JyxcbiAgICAgICAgJ1xcXCInOiAnXFwnJyxcbiAgICAgICAgJzwnOiAnLCcsXG4gICAgICAgICc+JzogJy4nLFxuICAgICAgICAnPyc6ICcvJyxcbiAgICAgICAgJ3wnOiAnXFxcXCdcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogdGhpcyBpcyBhIGxpc3Qgb2Ygc3BlY2lhbCBzdHJpbmdzIHlvdSBjYW4gdXNlIHRvIG1hcFxuICAgICAqIHRvIG1vZGlmaWVyIGtleXMgd2hlbiB5b3Ugc3BlY2lmeSB5b3VyIGtleWJvYXJkIHNob3J0Y3V0c1xuICAgICAqXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICB2YXIgX1NQRUNJQUxfQUxJQVNFUyA9IHtcbiAgICAgICAgJ29wdGlvbic6ICdhbHQnLFxuICAgICAgICAnY29tbWFuZCc6ICdtZXRhJyxcbiAgICAgICAgJ3JldHVybic6ICdlbnRlcicsXG4gICAgICAgICdlc2NhcGUnOiAnZXNjJyxcbiAgICAgICAgJ3BsdXMnOiAnKycsXG4gICAgICAgICdtb2QnOiAvTWFjfGlQb2R8aVBob25lfGlQYWQvLnRlc3QobmF2aWdhdG9yLnBsYXRmb3JtKSA/ICdtZXRhJyA6ICdjdHJsJ1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiB2YXJpYWJsZSB0byBzdG9yZSB0aGUgZmxpcHBlZCB2ZXJzaW9uIG9mIF9NQVAgZnJvbSBhYm92ZVxuICAgICAqIG5lZWRlZCB0byBjaGVjayBpZiB3ZSBzaG91bGQgdXNlIGtleXByZXNzIG9yIG5vdCB3aGVuIG5vIGFjdGlvblxuICAgICAqIGlzIHNwZWNpZmllZFxuICAgICAqXG4gICAgICogQHR5cGUge09iamVjdHx1bmRlZmluZWR9XG4gICAgICovXG4gICAgdmFyIF9SRVZFUlNFX01BUDtcblxuICAgIC8qKlxuICAgICAqIGxvb3AgdGhyb3VnaCB0aGUgZiBrZXlzLCBmMSB0byBmMTkgYW5kIGFkZCB0aGVtIHRvIHRoZSBtYXBcbiAgICAgKiBwcm9ncmFtYXRpY2FsbHlcbiAgICAgKi9cbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IDIwOyArK2kpIHtcbiAgICAgICAgX01BUFsxMTEgKyBpXSA9ICdmJyArIGk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogbG9vcCB0aHJvdWdoIHRvIG1hcCBudW1iZXJzIG9uIHRoZSBudW1lcmljIGtleXBhZFxuICAgICAqL1xuICAgIGZvciAoaSA9IDA7IGkgPD0gOTsgKytpKSB7XG5cbiAgICAgICAgLy8gVGhpcyBuZWVkcyB0byB1c2UgYSBzdHJpbmcgY2F1c2Ugb3RoZXJ3aXNlIHNpbmNlIDAgaXMgZmFsc2V5XG4gICAgICAgIC8vIG1vdXNldHJhcCB3aWxsIG5ldmVyIGZpcmUgZm9yIG51bXBhZCAwIHByZXNzZWQgYXMgcGFydCBvZiBhIGtleWRvd25cbiAgICAgICAgLy8gZXZlbnQuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2NjYW1wYmVsbC9tb3VzZXRyYXAvcHVsbC8yNThcbiAgICAgICAgX01BUFtpICsgOTZdID0gaS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNyb3NzIGJyb3dzZXIgYWRkIGV2ZW50IG1ldGhvZFxuICAgICAqXG4gICAgICogQHBhcmFtIHtFbGVtZW50fEhUTUxEb2N1bWVudH0gb2JqZWN0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfYWRkRXZlbnQob2JqZWN0LCB0eXBlLCBjYWxsYmFjaykge1xuICAgICAgICBpZiAob2JqZWN0LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG9iamVjdC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrLCBmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBvYmplY3QuYXR0YWNoRXZlbnQoJ29uJyArIHR5cGUsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB0YWtlcyB0aGUgZXZlbnQgYW5kIHJldHVybnMgdGhlIGtleSBjaGFyYWN0ZXJcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG4gICAgZnVuY3Rpb24gX2NoYXJhY3RlckZyb21FdmVudChlKSB7XG5cbiAgICAgICAgLy8gZm9yIGtleXByZXNzIGV2ZW50cyB3ZSBzaG91bGQgcmV0dXJuIHRoZSBjaGFyYWN0ZXIgYXMgaXNcbiAgICAgICAgaWYgKGUudHlwZSA9PSAna2V5cHJlc3MnKSB7XG4gICAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcblxuICAgICAgICAgICAgLy8gaWYgdGhlIHNoaWZ0IGtleSBpcyBub3QgcHJlc3NlZCB0aGVuIGl0IGlzIHNhZmUgdG8gYXNzdW1lXG4gICAgICAgICAgICAvLyB0aGF0IHdlIHdhbnQgdGhlIGNoYXJhY3RlciB0byBiZSBsb3dlcmNhc2UuICB0aGlzIG1lYW5zIGlmXG4gICAgICAgICAgICAvLyB5b3UgYWNjaWRlbnRhbGx5IGhhdmUgY2FwcyBsb2NrIG9uIHRoZW4geW91ciBrZXkgYmluZGluZ3NcbiAgICAgICAgICAgIC8vIHdpbGwgY29udGludWUgdG8gd29ya1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIHRoZSBvbmx5IHNpZGUgZWZmZWN0IHRoYXQgbWlnaHQgbm90IGJlIGRlc2lyZWQgaXMgaWYgeW91XG4gICAgICAgICAgICAvLyBiaW5kIHNvbWV0aGluZyBsaWtlICdBJyBjYXVzZSB5b3Ugd2FudCB0byB0cmlnZ2VyIGFuXG4gICAgICAgICAgICAvLyBldmVudCB3aGVuIGNhcGl0YWwgQSBpcyBwcmVzc2VkIGNhcHMgbG9jayB3aWxsIG5vIGxvbmdlclxuICAgICAgICAgICAgLy8gdHJpZ2dlciB0aGUgZXZlbnQuICBzaGlmdCthIHdpbGwgdGhvdWdoLlxuICAgICAgICAgICAgaWYgKCFlLnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyID0gY2hhcmFjdGVyLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBjaGFyYWN0ZXI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmb3Igbm9uIGtleXByZXNzIGV2ZW50cyB0aGUgc3BlY2lhbCBtYXBzIGFyZSBuZWVkZWRcbiAgICAgICAgaWYgKF9NQVBbZS53aGljaF0pIHtcbiAgICAgICAgICAgIHJldHVybiBfTUFQW2Uud2hpY2hdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9LRVlDT0RFX01BUFtlLndoaWNoXSkge1xuICAgICAgICAgICAgcmV0dXJuIF9LRVlDT0RFX01BUFtlLndoaWNoXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIGl0IGlzIG5vdCBpbiB0aGUgc3BlY2lhbCBtYXBcblxuICAgICAgICAvLyB3aXRoIGtleWRvd24gYW5kIGtleXVwIGV2ZW50cyB0aGUgY2hhcmFjdGVyIHNlZW1zIHRvIGFsd2F5c1xuICAgICAgICAvLyBjb21lIGluIGFzIGFuIHVwcGVyY2FzZSBjaGFyYWN0ZXIgd2hldGhlciB5b3UgYXJlIHByZXNzaW5nIHNoaWZ0XG4gICAgICAgIC8vIG9yIG5vdC4gIHdlIHNob3VsZCBtYWtlIHN1cmUgaXQgaXMgYWx3YXlzIGxvd2VyY2FzZSBmb3IgY29tcGFyaXNvbnNcbiAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCkudG9Mb3dlckNhc2UoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjaGVja3MgaWYgdHdvIGFycmF5cyBhcmUgZXF1YWxcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IG1vZGlmaWVyczFcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBtb2RpZmllcnMyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gX21vZGlmaWVyc01hdGNoKG1vZGlmaWVyczEsIG1vZGlmaWVyczIpIHtcbiAgICAgICAgcmV0dXJuIG1vZGlmaWVyczEuc29ydCgpLmpvaW4oJywnKSA9PT0gbW9kaWZpZXJzMi5zb3J0KCkuam9pbignLCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHRha2VzIGEga2V5IGV2ZW50IGFuZCBmaWd1cmVzIG91dCB3aGF0IHRoZSBtb2RpZmllcnMgYXJlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9ldmVudE1vZGlmaWVycyhlKSB7XG4gICAgICAgIHZhciBtb2RpZmllcnMgPSBbXTtcblxuICAgICAgICBpZiAoZS5zaGlmdEtleSkge1xuICAgICAgICAgICAgbW9kaWZpZXJzLnB1c2goJ3NoaWZ0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZS5hbHRLZXkpIHtcbiAgICAgICAgICAgIG1vZGlmaWVycy5wdXNoKCdhbHQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlLmN0cmxLZXkpIHtcbiAgICAgICAgICAgIG1vZGlmaWVycy5wdXNoKCdjdHJsJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZS5tZXRhS2V5KSB7XG4gICAgICAgICAgICBtb2RpZmllcnMucHVzaCgnbWV0YScpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1vZGlmaWVycztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBwcmV2ZW50cyBkZWZhdWx0IGZvciB0aGlzIGV2ZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9wcmV2ZW50RGVmYXVsdChlKSB7XG4gICAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc3RvcHMgcHJvcG9nYXRpb24gZm9yIHRoaXMgZXZlbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgZnVuY3Rpb24gX3N0b3BQcm9wYWdhdGlvbihlKSB7XG4gICAgICAgIGlmIChlLnN0b3BQcm9wYWdhdGlvbikge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGUuY2FuY2VsQnViYmxlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBkZXRlcm1pbmVzIGlmIHRoZSBrZXljb2RlIHNwZWNpZmllZCBpcyBhIG1vZGlmaWVyIGtleSBvciBub3RcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfaXNNb2RpZmllcihrZXkpIHtcbiAgICAgICAgcmV0dXJuIGtleSA9PSAnc2hpZnQnIHx8IGtleSA9PSAnY3RybCcgfHwga2V5ID09ICdhbHQnIHx8IGtleSA9PSAnbWV0YSc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmV2ZXJzZXMgdGhlIG1hcCBsb29rdXAgc28gdGhhdCB3ZSBjYW4gbG9vayBmb3Igc3BlY2lmaWMga2V5c1xuICAgICAqIHRvIHNlZSB3aGF0IGNhbiBhbmQgY2FuJ3QgdXNlIGtleXByZXNzXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZnVuY3Rpb24gX2dldFJldmVyc2VNYXAoKSB7XG4gICAgICAgIGlmICghX1JFVkVSU0VfTUFQKSB7XG4gICAgICAgICAgICBfUkVWRVJTRV9NQVAgPSB7fTtcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBfTUFQKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBwdWxsIG91dCB0aGUgbnVtZXJpYyBrZXlwYWQgZnJvbSBoZXJlIGNhdXNlIGtleXByZXNzIHNob3VsZFxuICAgICAgICAgICAgICAgIC8vIGJlIGFibGUgdG8gZGV0ZWN0IHRoZSBrZXlzIGZyb20gdGhlIGNoYXJhY3RlclxuICAgICAgICAgICAgICAgIGlmIChrZXkgPiA5NSAmJiBrZXkgPCAxMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKF9NQVAuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBfUkVWRVJTRV9NQVBbX01BUFtrZXldXSA9IGtleTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9SRVZFUlNFX01BUDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBwaWNrcyB0aGUgYmVzdCBhY3Rpb24gYmFzZWQgb24gdGhlIGtleSBjb21iaW5hdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIGNoYXJhY3RlciBmb3Iga2V5XG4gICAgICogQHBhcmFtIHtBcnJheX0gbW9kaWZpZXJzXG4gICAgICogQHBhcmFtIHtzdHJpbmc9fSBhY3Rpb24gcGFzc2VkIGluXG4gICAgICovXG4gICAgZnVuY3Rpb24gX3BpY2tCZXN0QWN0aW9uKGtleSwgbW9kaWZpZXJzLCBhY3Rpb24pIHtcblxuICAgICAgICAvLyBpZiBubyBhY3Rpb24gd2FzIHBpY2tlZCBpbiB3ZSBzaG91bGQgdHJ5IHRvIHBpY2sgdGhlIG9uZVxuICAgICAgICAvLyB0aGF0IHdlIHRoaW5rIHdvdWxkIHdvcmsgYmVzdCBmb3IgdGhpcyBrZXlcbiAgICAgICAgaWYgKCFhY3Rpb24pIHtcbiAgICAgICAgICAgIGFjdGlvbiA9IF9nZXRSZXZlcnNlTWFwKClba2V5XSA/ICdrZXlkb3duJyA6ICdrZXlwcmVzcyc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtb2RpZmllciBrZXlzIGRvbid0IHdvcmsgYXMgZXhwZWN0ZWQgd2l0aCBrZXlwcmVzcyxcbiAgICAgICAgLy8gc3dpdGNoIHRvIGtleWRvd25cbiAgICAgICAgaWYgKGFjdGlvbiA9PSAna2V5cHJlc3MnICYmIG1vZGlmaWVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGFjdGlvbiA9ICdrZXlkb3duJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhY3Rpb247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgZnJvbSBhIHN0cmluZyBrZXkgY29tYmluYXRpb24gdG8gYW4gYXJyYXlcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gY29tYmluYXRpb24gbGlrZSBcImNvbW1hbmQrc2hpZnQrbFwiXG4gICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICovXG4gICAgZnVuY3Rpb24gX2tleXNGcm9tU3RyaW5nKGNvbWJpbmF0aW9uKSB7XG4gICAgICAgIGlmIChjb21iaW5hdGlvbiA9PT0gJysnKSB7XG4gICAgICAgICAgICByZXR1cm4gWycrJ107XG4gICAgICAgIH1cblxuICAgICAgICBjb21iaW5hdGlvbiA9IGNvbWJpbmF0aW9uLnJlcGxhY2UoL1xcK3syfS9nLCAnK3BsdXMnKTtcbiAgICAgICAgcmV0dXJuIGNvbWJpbmF0aW9uLnNwbGl0KCcrJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBpbmZvIGZvciBhIHNwZWNpZmljIGtleSBjb21iaW5hdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBjb21iaW5hdGlvbiBrZXkgY29tYmluYXRpb24gKFwiY29tbWFuZCtzXCIgb3IgXCJhXCIgb3IgXCIqXCIpXG4gICAgICogQHBhcmFtICB7c3RyaW5nPX0gYWN0aW9uXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfZ2V0S2V5SW5mbyhjb21iaW5hdGlvbiwgYWN0aW9uKSB7XG4gICAgICAgIHZhciBrZXlzO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgdmFyIG1vZGlmaWVycyA9IFtdO1xuXG4gICAgICAgIC8vIHRha2UgdGhlIGtleXMgZnJvbSB0aGlzIHBhdHRlcm4gYW5kIGZpZ3VyZSBvdXQgd2hhdCB0aGUgYWN0dWFsXG4gICAgICAgIC8vIHBhdHRlcm4gaXMgYWxsIGFib3V0XG4gICAgICAgIGtleXMgPSBfa2V5c0Zyb21TdHJpbmcoY29tYmluYXRpb24pO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuXG4gICAgICAgICAgICAvLyBub3JtYWxpemUga2V5IG5hbWVzXG4gICAgICAgICAgICBpZiAoX1NQRUNJQUxfQUxJQVNFU1trZXldKSB7XG4gICAgICAgICAgICAgICAga2V5ID0gX1NQRUNJQUxfQUxJQVNFU1trZXldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiB0aGlzIGlzIG5vdCBhIGtleXByZXNzIGV2ZW50IHRoZW4gd2Ugc2hvdWxkXG4gICAgICAgICAgICAvLyBiZSBzbWFydCBhYm91dCB1c2luZyBzaGlmdCBrZXlzXG4gICAgICAgICAgICAvLyB0aGlzIHdpbGwgb25seSB3b3JrIGZvciBVUyBrZXlib2FyZHMgaG93ZXZlclxuICAgICAgICAgICAgaWYgKGFjdGlvbiAmJiBhY3Rpb24gIT0gJ2tleXByZXNzJyAmJiBfU0hJRlRfTUFQW2tleV0pIHtcbiAgICAgICAgICAgICAgICBrZXkgPSBfU0hJRlRfTUFQW2tleV07XG4gICAgICAgICAgICAgICAgbW9kaWZpZXJzLnB1c2goJ3NoaWZ0Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIHRoaXMga2V5IGlzIGEgbW9kaWZpZXIgdGhlbiBhZGQgaXQgdG8gdGhlIGxpc3Qgb2YgbW9kaWZpZXJzXG4gICAgICAgICAgICBpZiAoX2lzTW9kaWZpZXIoa2V5KSkge1xuICAgICAgICAgICAgICAgIG1vZGlmaWVycy5wdXNoKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkZXBlbmRpbmcgb24gd2hhdCB0aGUga2V5IGNvbWJpbmF0aW9uIGlzXG4gICAgICAgIC8vIHdlIHdpbGwgdHJ5IHRvIHBpY2sgdGhlIGJlc3QgZXZlbnQgZm9yIGl0XG4gICAgICAgIGFjdGlvbiA9IF9waWNrQmVzdEFjdGlvbihrZXksIG1vZGlmaWVycywgYWN0aW9uKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICBtb2RpZmllcnM6IG1vZGlmaWVycyxcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2JlbG9uZ3NUbyhlbGVtZW50LCBhbmNlc3Rvcikge1xuICAgICAgICBpZiAoZWxlbWVudCA9PT0gbnVsbCB8fCBlbGVtZW50ID09PSBkb2N1bWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVsZW1lbnQgPT09IGFuY2VzdG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBfYmVsb25nc1RvKGVsZW1lbnQucGFyZW50Tm9kZSwgYW5jZXN0b3IpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIE1vdXNldHJhcCh0YXJnZXRFbGVtZW50KSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB0YXJnZXRFbGVtZW50ID0gdGFyZ2V0RWxlbWVudCB8fCBkb2N1bWVudDtcblxuICAgICAgICBpZiAoIShzZWxmIGluc3RhbmNlb2YgTW91c2V0cmFwKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBNb3VzZXRyYXAodGFyZ2V0RWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogZWxlbWVudCB0byBhdHRhY2gga2V5IGV2ZW50cyB0b1xuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7RWxlbWVudH1cbiAgICAgICAgICovXG4gICAgICAgIHNlbGYudGFyZ2V0ID0gdGFyZ2V0RWxlbWVudDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogYSBsaXN0IG9mIGFsbCB0aGUgY2FsbGJhY2tzIHNldHVwIHZpYSBNb3VzZXRyYXAuYmluZCgpXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICBzZWxmLl9jYWxsYmFja3MgPSB7fTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogZGlyZWN0IG1hcCBvZiBzdHJpbmcgY29tYmluYXRpb25zIHRvIGNhbGxiYWNrcyB1c2VkIGZvciB0cmlnZ2VyKClcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIHNlbGYuX2RpcmVjdE1hcCA9IHt9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBrZWVwcyB0cmFjayBvZiB3aGF0IGxldmVsIGVhY2ggc2VxdWVuY2UgaXMgYXQgc2luY2UgbXVsdGlwbGVcbiAgICAgICAgICogc2VxdWVuY2VzIGNhbiBzdGFydCBvdXQgd2l0aCB0aGUgc2FtZSBzZXF1ZW5jZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIF9zZXF1ZW5jZUxldmVscyA9IHt9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiB2YXJpYWJsZSB0byBzdG9yZSB0aGUgc2V0VGltZW91dCBjYWxsXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtudWxsfG51bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBfcmVzZXRUaW1lcjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogdGVtcG9yYXJ5IHN0YXRlIHdoZXJlIHdlIHdpbGwgaWdub3JlIHRoZSBuZXh0IGtleXVwXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufHN0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHZhciBfaWdub3JlTmV4dEtleXVwID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHRlbXBvcmFyeSBzdGF0ZSB3aGVyZSB3ZSB3aWxsIGlnbm9yZSB0aGUgbmV4dCBrZXlwcmVzc1xuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBfaWdub3JlTmV4dEtleXByZXNzID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGFyZSB3ZSBjdXJyZW50bHkgaW5zaWRlIG9mIGEgc2VxdWVuY2U/XG4gICAgICAgICAqIHR5cGUgb2YgYWN0aW9uIChcImtleXVwXCIgb3IgXCJrZXlkb3duXCIgb3IgXCJrZXlwcmVzc1wiKSBvciBmYWxzZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbnxzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgX25leHRFeHBlY3RlZEFjdGlvbiA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZXNldHMgYWxsIHNlcXVlbmNlIGNvdW50ZXJzIGV4Y2VwdCBmb3IgdGhlIG9uZXMgcGFzc2VkIGluXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkb05vdFJlc2V0XG4gICAgICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIF9yZXNldFNlcXVlbmNlcyhkb05vdFJlc2V0KSB7XG4gICAgICAgICAgICBkb05vdFJlc2V0ID0gZG9Ob3RSZXNldCB8fCB7fTtcblxuICAgICAgICAgICAgdmFyIGFjdGl2ZVNlcXVlbmNlcyA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIGtleTtcblxuICAgICAgICAgICAgZm9yIChrZXkgaW4gX3NlcXVlbmNlTGV2ZWxzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRvTm90UmVzZXRba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmVTZXF1ZW5jZXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3NlcXVlbmNlTGV2ZWxzW2tleV0gPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWFjdGl2ZVNlcXVlbmNlcykge1xuICAgICAgICAgICAgICAgIF9uZXh0RXhwZWN0ZWRBY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBmaW5kcyBhbGwgY2FsbGJhY2tzIHRoYXQgbWF0Y2ggYmFzZWQgb24gdGhlIGtleWNvZGUsIG1vZGlmaWVycyxcbiAgICAgICAgICogYW5kIGFjdGlvblxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2hhcmFjdGVyXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IG1vZGlmaWVyc1xuICAgICAgICAgKiBAcGFyYW0ge0V2ZW50fE9iamVjdH0gZVxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZz19IHNlcXVlbmNlTmFtZSAtIG5hbWUgb2YgdGhlIHNlcXVlbmNlIHdlIGFyZSBsb29raW5nIGZvclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZz19IGNvbWJpbmF0aW9uXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gbGV2ZWxcbiAgICAgICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX2dldE1hdGNoZXMoY2hhcmFjdGVyLCBtb2RpZmllcnMsIGUsIHNlcXVlbmNlTmFtZSwgY29tYmluYXRpb24sIGxldmVsKSB7XG4gICAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICAgIHZhciBjYWxsYmFjaztcbiAgICAgICAgICAgIHZhciBtYXRjaGVzID0gW107XG4gICAgICAgICAgICB2YXIgYWN0aW9uID0gZS50eXBlO1xuXG4gICAgICAgICAgICAvLyBpZiB0aGVyZSBhcmUgbm8gZXZlbnRzIHJlbGF0ZWQgdG8gdGhpcyBrZXljb2RlXG4gICAgICAgICAgICBpZiAoIXNlbGYuX2NhbGxiYWNrc1tjaGFyYWN0ZXJdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiBhIG1vZGlmaWVyIGtleSBpcyBjb21pbmcgdXAgb24gaXRzIG93biB3ZSBzaG91bGQgYWxsb3cgaXRcbiAgICAgICAgICAgIGlmIChhY3Rpb24gPT0gJ2tleXVwJyAmJiBfaXNNb2RpZmllcihjaGFyYWN0ZXIpKSB7XG4gICAgICAgICAgICAgICAgbW9kaWZpZXJzID0gW2NoYXJhY3Rlcl07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGxvb3AgdGhyb3VnaCBhbGwgY2FsbGJhY2tzIGZvciB0aGUga2V5IHRoYXQgd2FzIHByZXNzZWRcbiAgICAgICAgICAgIC8vIGFuZCBzZWUgaWYgYW55IG9mIHRoZW0gbWF0Y2hcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBzZWxmLl9jYWxsYmFja3NbY2hhcmFjdGVyXS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gc2VsZi5fY2FsbGJhY2tzW2NoYXJhY3Rlcl1baV07XG5cbiAgICAgICAgICAgICAgICAvLyBpZiBhIHNlcXVlbmNlIG5hbWUgaXMgbm90IHNwZWNpZmllZCwgYnV0IHRoaXMgaXMgYSBzZXF1ZW5jZSBhdFxuICAgICAgICAgICAgICAgIC8vIHRoZSB3cm9uZyBsZXZlbCB0aGVuIG1vdmUgb250byB0aGUgbmV4dCBtYXRjaFxuICAgICAgICAgICAgICAgIGlmICghc2VxdWVuY2VOYW1lICYmIGNhbGxiYWNrLnNlcSAmJiBfc2VxdWVuY2VMZXZlbHNbY2FsbGJhY2suc2VxXSAhPSBjYWxsYmFjay5sZXZlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgYWN0aW9uIHdlIGFyZSBsb29raW5nIGZvciBkb2Vzbid0IG1hdGNoIHRoZSBhY3Rpb24gd2UgZ290XG4gICAgICAgICAgICAgICAgLy8gdGhlbiB3ZSBzaG91bGQga2VlcCBnb2luZ1xuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gIT0gY2FsbGJhY2suYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGlmIHRoaXMgaXMgYSBrZXlwcmVzcyBldmVudCBhbmQgdGhlIG1ldGEga2V5IGFuZCBjb250cm9sIGtleVxuICAgICAgICAgICAgICAgIC8vIGFyZSBub3QgcHJlc3NlZCB0aGF0IG1lYW5zIHRoYXQgd2UgbmVlZCB0byBvbmx5IGxvb2sgYXQgdGhlXG4gICAgICAgICAgICAgICAgLy8gY2hhcmFjdGVyLCBvdGhlcndpc2UgY2hlY2sgdGhlIG1vZGlmaWVycyBhcyB3ZWxsXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAvLyBjaHJvbWUgd2lsbCBub3QgZmlyZSBhIGtleXByZXNzIGlmIG1ldGEgb3IgY29udHJvbCBpcyBkb3duXG4gICAgICAgICAgICAgICAgLy8gc2FmYXJpIHdpbGwgZmlyZSBhIGtleXByZXNzIGlmIG1ldGEgb3IgbWV0YStzaGlmdCBpcyBkb3duXG4gICAgICAgICAgICAgICAgLy8gZmlyZWZveCB3aWxsIGZpcmUgYSBrZXlwcmVzcyBpZiBtZXRhIG9yIGNvbnRyb2wgaXMgZG93blxuICAgICAgICAgICAgICAgIGlmICgoYWN0aW9uID09ICdrZXlwcmVzcycgJiYgIWUubWV0YUtleSAmJiAhZS5jdHJsS2V5KSB8fCBfbW9kaWZpZXJzTWF0Y2gobW9kaWZpZXJzLCBjYWxsYmFjay5tb2RpZmllcnMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiB5b3UgYmluZCBhIGNvbWJpbmF0aW9uIG9yIHNlcXVlbmNlIGEgc2Vjb25kIHRpbWUgaXRcbiAgICAgICAgICAgICAgICAgICAgLy8gc2hvdWxkIG92ZXJ3cml0ZSB0aGUgZmlyc3Qgb25lLiAgaWYgYSBzZXF1ZW5jZU5hbWUgb3JcbiAgICAgICAgICAgICAgICAgICAgLy8gY29tYmluYXRpb24gaXMgc3BlY2lmaWVkIGluIHRoaXMgY2FsbCBpdCBkb2VzIGp1c3QgdGhhdFxuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyBAdG9kbyBtYWtlIGRlbGV0aW5nIGl0cyBvd24gbWV0aG9kP1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGVsZXRlQ29tYm8gPSAhc2VxdWVuY2VOYW1lICYmIGNhbGxiYWNrLmNvbWJvID09IGNvbWJpbmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGVsZXRlU2VxdWVuY2UgPSBzZXF1ZW5jZU5hbWUgJiYgY2FsbGJhY2suc2VxID09IHNlcXVlbmNlTmFtZSAmJiBjYWxsYmFjay5sZXZlbCA9PSBsZXZlbDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlbGV0ZUNvbWJvIHx8IGRlbGV0ZVNlcXVlbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9jYWxsYmFja3NbY2hhcmFjdGVyXS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBtYXRjaGVzLnB1c2goY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXM7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogYWN0dWFsbHkgY2FsbHMgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgICAqXG4gICAgICAgICAqIGlmIHlvdXIgY2FsbGJhY2sgZnVuY3Rpb24gcmV0dXJucyBmYWxzZSB0aGlzIHdpbGwgdXNlIHRoZSBqcXVlcnlcbiAgICAgICAgICogY29udmVudGlvbiAtIHByZXZlbnQgZGVmYXVsdCBhbmQgc3RvcCBwcm9wb2dhdGlvbiBvbiB0aGUgZXZlbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBfZmlyZUNhbGxiYWNrKGNhbGxiYWNrLCBlLCBjb21ibywgc2VxdWVuY2UpIHtcblxuICAgICAgICAgICAgLy8gaWYgdGhpcyBldmVudCBzaG91bGQgbm90IGhhcHBlbiBzdG9wIGhlcmVcbiAgICAgICAgICAgIGlmIChzZWxmLnN0b3BDYWxsYmFjayhlLCBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQsIGNvbWJvLCBzZXF1ZW5jZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjYWxsYmFjayhlLCBjb21ibykgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgX3ByZXZlbnREZWZhdWx0KGUpO1xuICAgICAgICAgICAgICAgIF9zdG9wUHJvcGFnYXRpb24oZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogaGFuZGxlcyBhIGNoYXJhY3RlciBrZXkgZXZlbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGNoYXJhY3RlclxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBtb2RpZmllcnNcbiAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICAgICAqL1xuICAgICAgICBzZWxmLl9oYW5kbGVLZXkgPSBmdW5jdGlvbihjaGFyYWN0ZXIsIG1vZGlmaWVycywgZSkge1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrcyA9IF9nZXRNYXRjaGVzKGNoYXJhY3RlciwgbW9kaWZpZXJzLCBlKTtcbiAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgdmFyIGRvTm90UmVzZXQgPSB7fTtcbiAgICAgICAgICAgIHZhciBtYXhMZXZlbCA9IDA7XG4gICAgICAgICAgICB2YXIgcHJvY2Vzc2VkU2VxdWVuY2VDYWxsYmFjayA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIG1heExldmVsIGZvciBzZXF1ZW5jZXMgc28gd2UgY2FuIG9ubHkgZXhlY3V0ZSB0aGUgbG9uZ2VzdCBjYWxsYmFjayBzZXF1ZW5jZVxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFja3NbaV0uc2VxKSB7XG4gICAgICAgICAgICAgICAgICAgIG1heExldmVsID0gTWF0aC5tYXgobWF4TGV2ZWwsIGNhbGxiYWNrc1tpXS5sZXZlbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBsb29wIHRocm91Z2ggbWF0Y2hpbmcgY2FsbGJhY2tzIGZvciB0aGlzIGtleSBldmVudFxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7ICsraSkge1xuXG4gICAgICAgICAgICAgICAgLy8gZmlyZSBmb3IgYWxsIHNlcXVlbmNlIGNhbGxiYWNrc1xuICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgYmVjYXVzZSBpZiBmb3IgZXhhbXBsZSB5b3UgaGF2ZSBtdWx0aXBsZSBzZXF1ZW5jZXNcbiAgICAgICAgICAgICAgICAvLyBib3VuZCBzdWNoIGFzIFwiZyBpXCIgYW5kIFwiZyB0XCIgdGhleSBib3RoIG5lZWQgdG8gZmlyZSB0aGVcbiAgICAgICAgICAgICAgICAvLyBjYWxsYmFjayBmb3IgbWF0Y2hpbmcgZyBjYXVzZSBvdGhlcndpc2UgeW91IGNhbiBvbmx5IGV2ZXJcbiAgICAgICAgICAgICAgICAvLyBtYXRjaCB0aGUgZmlyc3Qgb25lXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrc1tpXS5zZXEpIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBvbmx5IGZpcmUgY2FsbGJhY2tzIGZvciB0aGUgbWF4TGV2ZWwgdG8gcHJldmVudFxuICAgICAgICAgICAgICAgICAgICAvLyBzdWJzZXF1ZW5jZXMgZnJvbSBhbHNvIGZpcmluZ1xuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyBmb3IgZXhhbXBsZSAnYSBvcHRpb24gYicgc2hvdWxkIG5vdCBjYXVzZSAnb3B0aW9uIGInIHRvIGZpcmVcbiAgICAgICAgICAgICAgICAgICAgLy8gZXZlbiB0aG91Z2ggJ29wdGlvbiBiJyBpcyBwYXJ0IG9mIHRoZSBvdGhlciBzZXF1ZW5jZVxuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyBhbnkgc2VxdWVuY2VzIHRoYXQgZG8gbm90IG1hdGNoIGhlcmUgd2lsbCBiZSBkaXNjYXJkZWRcbiAgICAgICAgICAgICAgICAgICAgLy8gYmVsb3cgYnkgdGhlIF9yZXNldFNlcXVlbmNlcyBjYWxsXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFja3NbaV0ubGV2ZWwgIT0gbWF4TGV2ZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc2VkU2VxdWVuY2VDYWxsYmFjayA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8ga2VlcCBhIGxpc3Qgb2Ygd2hpY2ggc2VxdWVuY2VzIHdlcmUgbWF0Y2hlcyBmb3IgbGF0ZXJcbiAgICAgICAgICAgICAgICAgICAgZG9Ob3RSZXNldFtjYWxsYmFja3NbaV0uc2VxXSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIF9maXJlQ2FsbGJhY2soY2FsbGJhY2tzW2ldLmNhbGxiYWNrLCBlLCBjYWxsYmFja3NbaV0uY29tYm8sIGNhbGxiYWNrc1tpXS5zZXEpO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBpZiB0aGVyZSB3ZXJlIG5vIHNlcXVlbmNlIG1hdGNoZXMgYnV0IHdlIGFyZSBzdGlsbCBoZXJlXG4gICAgICAgICAgICAgICAgLy8gdGhhdCBtZWFucyB0aGlzIGlzIGEgcmVndWxhciBtYXRjaCBzbyB3ZSBzaG91bGQgZmlyZSB0aGF0XG4gICAgICAgICAgICAgICAgaWYgKCFwcm9jZXNzZWRTZXF1ZW5jZUNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIF9maXJlQ2FsbGJhY2soY2FsbGJhY2tzW2ldLmNhbGxiYWNrLCBlLCBjYWxsYmFja3NbaV0uY29tYm8pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgdGhlIGtleSB5b3UgcHJlc3NlZCBtYXRjaGVzIHRoZSB0eXBlIG9mIHNlcXVlbmNlIHdpdGhvdXRcbiAgICAgICAgICAgIC8vIGJlaW5nIGEgbW9kaWZpZXIgKGllIFwia2V5dXBcIiBvciBcImtleXByZXNzXCIpIHRoZW4gd2Ugc2hvdWxkXG4gICAgICAgICAgICAvLyByZXNldCBhbGwgc2VxdWVuY2VzIHRoYXQgd2VyZSBub3QgbWF0Y2hlZCBieSB0aGlzIGV2ZW50XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gdGhpcyBpcyBzbywgZm9yIGV4YW1wbGUsIGlmIHlvdSBoYXZlIHRoZSBzZXF1ZW5jZSBcImggYSB0XCIgYW5kIHlvdVxuICAgICAgICAgICAgLy8gdHlwZSBcImggZSBhIHIgdFwiIGl0IGRvZXMgbm90IG1hdGNoLiAgaW4gdGhpcyBjYXNlIHRoZSBcImVcIiB3aWxsXG4gICAgICAgICAgICAvLyBjYXVzZSB0aGUgc2VxdWVuY2UgdG8gcmVzZXRcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBtb2RpZmllciBrZXlzIGFyZSBpZ25vcmVkIGJlY2F1c2UgeW91IGNhbiBoYXZlIGEgc2VxdWVuY2VcbiAgICAgICAgICAgIC8vIHRoYXQgY29udGFpbnMgbW9kaWZpZXJzIHN1Y2ggYXMgXCJlbnRlciBjdHJsK3NwYWNlXCIgYW5kIGluIG1vc3RcbiAgICAgICAgICAgIC8vIGNhc2VzIHRoZSBtb2RpZmllciBrZXkgd2lsbCBiZSBwcmVzc2VkIGJlZm9yZSB0aGUgbmV4dCBrZXlcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBhbHNvIGlmIHlvdSBoYXZlIGEgc2VxdWVuY2Ugc3VjaCBhcyBcImN0cmwrYiBhXCIgdGhlbiBwcmVzc2luZyB0aGVcbiAgICAgICAgICAgIC8vIFwiYlwiIGtleSB3aWxsIHRyaWdnZXIgYSBcImtleXByZXNzXCIgYW5kIGEgXCJrZXlkb3duXCJcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyB0aGUgXCJrZXlkb3duXCIgaXMgZXhwZWN0ZWQgd2hlbiB0aGVyZSBpcyBhIG1vZGlmaWVyLCBidXQgdGhlXG4gICAgICAgICAgICAvLyBcImtleXByZXNzXCIgZW5kcyB1cCBtYXRjaGluZyB0aGUgX25leHRFeHBlY3RlZEFjdGlvbiBzaW5jZSBpdCBvY2N1cnNcbiAgICAgICAgICAgIC8vIGFmdGVyIGFuZCB0aGF0IGNhdXNlcyB0aGUgc2VxdWVuY2UgdG8gcmVzZXRcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyB3ZSBpZ25vcmUga2V5cHJlc3NlcyBpbiBhIHNlcXVlbmNlIHRoYXQgZGlyZWN0bHkgZm9sbG93IGEga2V5ZG93blxuICAgICAgICAgICAgLy8gZm9yIHRoZSBzYW1lIGNoYXJhY3RlclxuICAgICAgICAgICAgdmFyIGlnbm9yZVRoaXNLZXlwcmVzcyA9IGUudHlwZSA9PSAna2V5cHJlc3MnICYmIF9pZ25vcmVOZXh0S2V5cHJlc3M7XG4gICAgICAgICAgICBpZiAoZS50eXBlID09IF9uZXh0RXhwZWN0ZWRBY3Rpb24gJiYgIV9pc01vZGlmaWVyKGNoYXJhY3RlcikgJiYgIWlnbm9yZVRoaXNLZXlwcmVzcykge1xuICAgICAgICAgICAgICAgIF9yZXNldFNlcXVlbmNlcyhkb05vdFJlc2V0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgX2lnbm9yZU5leHRLZXlwcmVzcyA9IHByb2Nlc3NlZFNlcXVlbmNlQ2FsbGJhY2sgJiYgZS50eXBlID09ICdrZXlkb3duJztcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaGFuZGxlcyBhIGtleWRvd24gZXZlbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBfaGFuZGxlS2V5RXZlbnQoZSkge1xuXG4gICAgICAgICAgICAvLyBub3JtYWxpemUgZS53aGljaCBmb3Iga2V5IGV2ZW50c1xuICAgICAgICAgICAgLy8gQHNlZSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQyODU2MjcvamF2YXNjcmlwdC1rZXljb2RlLXZzLWNoYXJjb2RlLXV0dGVyLWNvbmZ1c2lvblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBlLndoaWNoICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIGUud2hpY2ggPSBlLmtleUNvZGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSBfY2hhcmFjdGVyRnJvbUV2ZW50KGUpO1xuXG4gICAgICAgICAgICAvLyBubyBjaGFyYWN0ZXIgZm91bmQgdGhlbiBzdG9wXG4gICAgICAgICAgICBpZiAoIWNoYXJhY3Rlcikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbmVlZCB0byB1c2UgPT09IGZvciB0aGUgY2hhcmFjdGVyIGNoZWNrIGJlY2F1c2UgdGhlIGNoYXJhY3RlciBjYW4gYmUgMFxuICAgICAgICAgICAgaWYgKGUudHlwZSA9PSAna2V5dXAnICYmIF9pZ25vcmVOZXh0S2V5dXAgPT09IGNoYXJhY3Rlcikge1xuICAgICAgICAgICAgICAgIF9pZ25vcmVOZXh0S2V5dXAgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGYuaGFuZGxlS2V5KGNoYXJhY3RlciwgX2V2ZW50TW9kaWZpZXJzKGUpLCBlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjYWxsZWQgdG8gc2V0IGEgMSBzZWNvbmQgdGltZW91dCBvbiB0aGUgc3BlY2lmaWVkIHNlcXVlbmNlXG4gICAgICAgICAqXG4gICAgICAgICAqIHRoaXMgaXMgc28gYWZ0ZXIgZWFjaCBrZXkgcHJlc3MgaW4gdGhlIHNlcXVlbmNlIHlvdSBoYXZlIDEgc2Vjb25kXG4gICAgICAgICAqIHRvIHByZXNzIHRoZSBuZXh0IGtleSBiZWZvcmUgeW91IGhhdmUgdG8gc3RhcnQgb3ZlclxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBfcmVzZXRTZXF1ZW5jZVRpbWVyKCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KF9yZXNldFRpbWVyKTtcbiAgICAgICAgICAgIF9yZXNldFRpbWVyID0gc2V0VGltZW91dChfcmVzZXRTZXF1ZW5jZXMsIDEwMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGJpbmRzIGEga2V5IHNlcXVlbmNlIHRvIGFuIGV2ZW50XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21ibyAtIGNvbWJvIHNwZWNpZmllZCBpbiBiaW5kIGNhbGxcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0ga2V5c1xuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZz19IGFjdGlvblxuICAgICAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBfYmluZFNlcXVlbmNlKGNvbWJvLCBrZXlzLCBjYWxsYmFjaywgYWN0aW9uKSB7XG5cbiAgICAgICAgICAgIC8vIHN0YXJ0IG9mZiBieSBhZGRpbmcgYSBzZXF1ZW5jZSBsZXZlbCByZWNvcmQgZm9yIHRoaXMgY29tYmluYXRpb25cbiAgICAgICAgICAgIC8vIGFuZCBzZXR0aW5nIHRoZSBsZXZlbCB0byAwXG4gICAgICAgICAgICBfc2VxdWVuY2VMZXZlbHNbY29tYm9dID0gMDtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBjYWxsYmFjayB0byBpbmNyZWFzZSB0aGUgc2VxdWVuY2UgbGV2ZWwgZm9yIHRoaXMgc2VxdWVuY2UgYW5kIHJlc2V0XG4gICAgICAgICAgICAgKiBhbGwgb3RoZXIgc2VxdWVuY2VzIHRoYXQgd2VyZSBhY3RpdmVcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV4dEFjdGlvblxuICAgICAgICAgICAgICogQHJldHVybnMge0Z1bmN0aW9ufVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBmdW5jdGlvbiBfaW5jcmVhc2VTZXF1ZW5jZShuZXh0QWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBfbmV4dEV4cGVjdGVkQWN0aW9uID0gbmV4dEFjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgKytfc2VxdWVuY2VMZXZlbHNbY29tYm9dO1xuICAgICAgICAgICAgICAgICAgICBfcmVzZXRTZXF1ZW5jZVRpbWVyKCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiB3cmFwcyB0aGUgc3BlY2lmaWVkIGNhbGxiYWNrIGluc2lkZSBvZiBhbm90aGVyIGZ1bmN0aW9uIGluIG9yZGVyXG4gICAgICAgICAgICAgKiB0byByZXNldCBhbGwgc2VxdWVuY2UgY291bnRlcnMgYXMgc29vbiBhcyB0aGlzIHNlcXVlbmNlIGlzIGRvbmVcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAgICAgICAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIF9jYWxsYmFja0FuZFJlc2V0KGUpIHtcbiAgICAgICAgICAgICAgICBfZmlyZUNhbGxiYWNrKGNhbGxiYWNrLCBlLCBjb21ibyk7XG5cbiAgICAgICAgICAgICAgICAvLyB3ZSBzaG91bGQgaWdub3JlIHRoZSBuZXh0IGtleSB1cCBpZiB0aGUgYWN0aW9uIGlzIGtleSBkb3duXG4gICAgICAgICAgICAgICAgLy8gb3Iga2V5cHJlc3MuICB0aGlzIGlzIHNvIGlmIHlvdSBmaW5pc2ggYSBzZXF1ZW5jZSBhbmRcbiAgICAgICAgICAgICAgICAvLyByZWxlYXNlIHRoZSBrZXkgdGhlIGZpbmFsIGtleSB3aWxsIG5vdCB0cmlnZ2VyIGEga2V5dXBcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uICE9PSAna2V5dXAnKSB7XG4gICAgICAgICAgICAgICAgICAgIF9pZ25vcmVOZXh0S2V5dXAgPSBfY2hhcmFjdGVyRnJvbUV2ZW50KGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHdlaXJkIHJhY2UgY29uZGl0aW9uIGlmIGEgc2VxdWVuY2UgZW5kcyB3aXRoIHRoZSBrZXlcbiAgICAgICAgICAgICAgICAvLyBhbm90aGVyIHNlcXVlbmNlIGJlZ2lucyB3aXRoXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChfcmVzZXRTZXF1ZW5jZXMsIDEwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbG9vcCB0aHJvdWdoIGtleXMgb25lIGF0IGEgdGltZSBhbmQgYmluZCB0aGUgYXBwcm9wcmlhdGUgY2FsbGJhY2tcbiAgICAgICAgICAgIC8vIGZ1bmN0aW9uLiAgZm9yIGFueSBrZXkgbGVhZGluZyB1cCB0byB0aGUgZmluYWwgb25lIGl0IHNob3VsZFxuICAgICAgICAgICAgLy8gaW5jcmVhc2UgdGhlIHNlcXVlbmNlLiBhZnRlciB0aGUgZmluYWwsIGl0IHNob3VsZCByZXNldCBhbGwgc2VxdWVuY2VzXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gaWYgYW4gYWN0aW9uIGlzIHNwZWNpZmllZCBpbiB0aGUgb3JpZ2luYWwgYmluZCBjYWxsIHRoZW4gdGhhdCB3aWxsXG4gICAgICAgICAgICAvLyBiZSB1c2VkIHRocm91Z2hvdXQuICBvdGhlcndpc2Ugd2Ugd2lsbCBwYXNzIHRoZSBhY3Rpb24gdGhhdCB0aGVcbiAgICAgICAgICAgIC8vIG5leHQga2V5IGluIHRoZSBzZXF1ZW5jZSBzaG91bGQgbWF0Y2guICB0aGlzIGFsbG93cyBhIHNlcXVlbmNlXG4gICAgICAgICAgICAvLyB0byBtaXggYW5kIG1hdGNoIGtleXByZXNzIGFuZCBrZXlkb3duIGV2ZW50cyBkZXBlbmRpbmcgb24gd2hpY2hcbiAgICAgICAgICAgIC8vIG9uZXMgYXJlIGJldHRlciBzdWl0ZWQgdG8gdGhlIGtleSBwcm92aWRlZFxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlzRmluYWwgPSBpICsgMSA9PT0ga2V5cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdmFyIHdyYXBwZWRDYWxsYmFjayA9IGlzRmluYWwgPyBfY2FsbGJhY2tBbmRSZXNldCA6IF9pbmNyZWFzZVNlcXVlbmNlKGFjdGlvbiB8fCBfZ2V0S2V5SW5mbyhrZXlzW2kgKyAxXSkuYWN0aW9uKTtcbiAgICAgICAgICAgICAgICBfYmluZFNpbmdsZShrZXlzW2ldLCB3cmFwcGVkQ2FsbGJhY2ssIGFjdGlvbiwgY29tYm8sIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGJpbmRzIGEgc2luZ2xlIGtleWJvYXJkIGNvbWJpbmF0aW9uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21iaW5hdGlvblxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZz19IGFjdGlvblxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZz19IHNlcXVlbmNlTmFtZSAtIG5hbWUgb2Ygc2VxdWVuY2UgaWYgcGFydCBvZiBzZXF1ZW5jZVxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcj19IGxldmVsIC0gd2hhdCBwYXJ0IG9mIHRoZSBzZXF1ZW5jZSB0aGUgY29tbWFuZCBpc1xuICAgICAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBfYmluZFNpbmdsZShjb21iaW5hdGlvbiwgY2FsbGJhY2ssIGFjdGlvbiwgc2VxdWVuY2VOYW1lLCBsZXZlbCkge1xuXG4gICAgICAgICAgICAvLyBzdG9yZSBhIGRpcmVjdCBtYXBwZWQgcmVmZXJlbmNlIGZvciB1c2Ugd2l0aCBNb3VzZXRyYXAudHJpZ2dlclxuICAgICAgICAgICAgc2VsZi5fZGlyZWN0TWFwW2NvbWJpbmF0aW9uICsgJzonICsgYWN0aW9uXSA9IGNhbGxiYWNrO1xuXG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgbXVsdGlwbGUgc3BhY2VzIGluIGEgcm93IGJlY29tZSBhIHNpbmdsZSBzcGFjZVxuICAgICAgICAgICAgY29tYmluYXRpb24gPSBjb21iaW5hdGlvbi5yZXBsYWNlKC9cXHMrL2csICcgJyk7XG5cbiAgICAgICAgICAgIHZhciBzZXF1ZW5jZSA9IGNvbWJpbmF0aW9uLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICB2YXIgaW5mbztcblxuICAgICAgICAgICAgLy8gaWYgdGhpcyBwYXR0ZXJuIGlzIGEgc2VxdWVuY2Ugb2Yga2V5cyB0aGVuIHJ1biB0aHJvdWdoIHRoaXMgbWV0aG9kXG4gICAgICAgICAgICAvLyB0byByZXByb2Nlc3MgZWFjaCBwYXR0ZXJuIG9uZSBrZXkgYXQgYSB0aW1lXG4gICAgICAgICAgICBpZiAoc2VxdWVuY2UubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIF9iaW5kU2VxdWVuY2UoY29tYmluYXRpb24sIHNlcXVlbmNlLCBjYWxsYmFjaywgYWN0aW9uKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGluZm8gPSBfZ2V0S2V5SW5mbyhjb21iaW5hdGlvbiwgYWN0aW9uKTtcblxuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHRvIGluaXRpYWxpemUgYXJyYXkgaWYgdGhpcyBpcyB0aGUgZmlyc3QgdGltZVxuICAgICAgICAgICAgLy8gYSBjYWxsYmFjayBpcyBhZGRlZCBmb3IgdGhpcyBrZXlcbiAgICAgICAgICAgIHNlbGYuX2NhbGxiYWNrc1tpbmZvLmtleV0gPSBzZWxmLl9jYWxsYmFja3NbaW5mby5rZXldIHx8IFtdO1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgYW4gZXhpc3RpbmcgbWF0Y2ggaWYgdGhlcmUgaXMgb25lXG4gICAgICAgICAgICBfZ2V0TWF0Y2hlcyhpbmZvLmtleSwgaW5mby5tb2RpZmllcnMsIHt0eXBlOiBpbmZvLmFjdGlvbn0sIHNlcXVlbmNlTmFtZSwgY29tYmluYXRpb24sIGxldmVsKTtcblxuICAgICAgICAgICAgLy8gYWRkIHRoaXMgY2FsbCBiYWNrIHRvIHRoZSBhcnJheVxuICAgICAgICAgICAgLy8gaWYgaXQgaXMgYSBzZXF1ZW5jZSBwdXQgaXQgYXQgdGhlIGJlZ2lubmluZ1xuICAgICAgICAgICAgLy8gaWYgbm90IHB1dCBpdCBhdCB0aGUgZW5kXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gdGhpcyBpcyBpbXBvcnRhbnQgYmVjYXVzZSB0aGUgd2F5IHRoZXNlIGFyZSBwcm9jZXNzZWQgZXhwZWN0c1xuICAgICAgICAgICAgLy8gdGhlIHNlcXVlbmNlIG9uZXMgdG8gY29tZSBmaXJzdFxuICAgICAgICAgICAgc2VsZi5fY2FsbGJhY2tzW2luZm8ua2V5XVtzZXF1ZW5jZU5hbWUgPyAndW5zaGlmdCcgOiAncHVzaCddKHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2ssXG4gICAgICAgICAgICAgICAgbW9kaWZpZXJzOiBpbmZvLm1vZGlmaWVycyxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGluZm8uYWN0aW9uLFxuICAgICAgICAgICAgICAgIHNlcTogc2VxdWVuY2VOYW1lLFxuICAgICAgICAgICAgICAgIGxldmVsOiBsZXZlbCxcbiAgICAgICAgICAgICAgICBjb21ibzogY29tYmluYXRpb25cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGJpbmRzIG11bHRpcGxlIGNvbWJpbmF0aW9ucyB0byB0aGUgc2FtZSBjYWxsYmFja1xuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBjb21iaW5hdGlvbnNcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd8dW5kZWZpbmVkfSBhY3Rpb25cbiAgICAgICAgICogQHJldHVybnMgdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgc2VsZi5fYmluZE11bHRpcGxlID0gZnVuY3Rpb24oY29tYmluYXRpb25zLCBjYWxsYmFjaywgYWN0aW9uKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbWJpbmF0aW9ucy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIF9iaW5kU2luZ2xlKGNvbWJpbmF0aW9uc1tpXSwgY2FsbGJhY2ssIGFjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gc3RhcnQhXG4gICAgICAgIF9hZGRFdmVudCh0YXJnZXRFbGVtZW50LCAna2V5cHJlc3MnLCBfaGFuZGxlS2V5RXZlbnQpO1xuICAgICAgICBfYWRkRXZlbnQodGFyZ2V0RWxlbWVudCwgJ2tleWRvd24nLCBfaGFuZGxlS2V5RXZlbnQpO1xuICAgICAgICBfYWRkRXZlbnQodGFyZ2V0RWxlbWVudCwgJ2tleXVwJywgX2hhbmRsZUtleUV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBiaW5kcyBhbiBldmVudCB0byBtb3VzZXRyYXBcbiAgICAgKlxuICAgICAqIGNhbiBiZSBhIHNpbmdsZSBrZXksIGEgY29tYmluYXRpb24gb2Yga2V5cyBzZXBhcmF0ZWQgd2l0aCArLFxuICAgICAqIGFuIGFycmF5IG9mIGtleXMsIG9yIGEgc2VxdWVuY2Ugb2Yga2V5cyBzZXBhcmF0ZWQgYnkgc3BhY2VzXG4gICAgICpcbiAgICAgKiBiZSBzdXJlIHRvIGxpc3QgdGhlIG1vZGlmaWVyIGtleXMgZmlyc3QgdG8gbWFrZSBzdXJlIHRoYXQgdGhlXG4gICAgICogY29ycmVjdCBrZXkgZW5kcyB1cCBnZXR0aW5nIGJvdW5kICh0aGUgbGFzdCBrZXkgaW4gdGhlIHBhdHRlcm4pXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xBcnJheX0ga2V5c1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICogQHBhcmFtIHtzdHJpbmc9fSBhY3Rpb24gLSAna2V5cHJlc3MnLCAna2V5ZG93bicsIG9yICdrZXl1cCdcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgTW91c2V0cmFwLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24oa2V5cywgY2FsbGJhY2ssIGFjdGlvbikge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGtleXMgPSBrZXlzIGluc3RhbmNlb2YgQXJyYXkgPyBrZXlzIDogW2tleXNdO1xuICAgICAgICBzZWxmLl9iaW5kTXVsdGlwbGUuY2FsbChzZWxmLCBrZXlzLCBjYWxsYmFjaywgYWN0aW9uKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIHVuYmluZHMgYW4gZXZlbnQgdG8gbW91c2V0cmFwXG4gICAgICpcbiAgICAgKiB0aGUgdW5iaW5kaW5nIHNldHMgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIG9mIHRoZSBzcGVjaWZpZWQga2V5IGNvbWJvXG4gICAgICogdG8gYW4gZW1wdHkgZnVuY3Rpb24gYW5kIGRlbGV0ZXMgdGhlIGNvcnJlc3BvbmRpbmcga2V5IGluIHRoZVxuICAgICAqIF9kaXJlY3RNYXAgZGljdC5cbiAgICAgKlxuICAgICAqIFRPRE86IGFjdHVhbGx5IHJlbW92ZSB0aGlzIGZyb20gdGhlIF9jYWxsYmFja3MgZGljdGlvbmFyeSBpbnN0ZWFkXG4gICAgICogb2YgYmluZGluZyBhbiBlbXB0eSBmdW5jdGlvblxuICAgICAqXG4gICAgICogdGhlIGtleWNvbWJvK2FjdGlvbiBoYXMgdG8gYmUgZXhhY3RseSB0aGUgc2FtZSBhc1xuICAgICAqIGl0IHdhcyBkZWZpbmVkIGluIHRoZSBiaW5kIG1ldGhvZFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd8QXJyYXl9IGtleXNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYWN0aW9uXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIE1vdXNldHJhcC5wcm90b3R5cGUudW5iaW5kID0gZnVuY3Rpb24oa2V5cywgYWN0aW9uKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHNlbGYuYmluZC5jYWxsKHNlbGYsIGtleXMsIGZ1bmN0aW9uKCkge30sIGFjdGlvbik7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIHRyaWdnZXJzIGFuIGV2ZW50IHRoYXQgaGFzIGFscmVhZHkgYmVlbiBib3VuZFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleXNcbiAgICAgKiBAcGFyYW0ge3N0cmluZz19IGFjdGlvblxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBNb3VzZXRyYXAucHJvdG90eXBlLnRyaWdnZXIgPSBmdW5jdGlvbihrZXlzLCBhY3Rpb24pIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoc2VsZi5fZGlyZWN0TWFwW2tleXMgKyAnOicgKyBhY3Rpb25dKSB7XG4gICAgICAgICAgICBzZWxmLl9kaXJlY3RNYXBba2V5cyArICc6JyArIGFjdGlvbl0oe30sIGtleXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiByZXNldHMgdGhlIGxpYnJhcnkgYmFjayB0byBpdHMgaW5pdGlhbCBzdGF0ZS4gIHRoaXMgaXMgdXNlZnVsXG4gICAgICogaWYgeW91IHdhbnQgdG8gY2xlYXIgb3V0IHRoZSBjdXJyZW50IGtleWJvYXJkIHNob3J0Y3V0cyBhbmQgYmluZFxuICAgICAqIG5ldyBvbmVzIC0gZm9yIGV4YW1wbGUgaWYgeW91IHN3aXRjaCB0byBhbm90aGVyIHBhZ2VcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBNb3VzZXRyYXAucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5fY2FsbGJhY2tzID0ge307XG4gICAgICAgIHNlbGYuX2RpcmVjdE1hcCA9IHt9O1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogc2hvdWxkIHdlIHN0b3AgdGhpcyBldmVudCBiZWZvcmUgZmlyaW5nIG9mZiBjYWxsYmFja3NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuICAgIE1vdXNldHJhcC5wcm90b3R5cGUuc3RvcENhbGxiYWNrID0gZnVuY3Rpb24oZSwgZWxlbWVudCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgLy8gaWYgdGhlIGVsZW1lbnQgaGFzIHRoZSBjbGFzcyBcIm1vdXNldHJhcFwiIHRoZW4gbm8gbmVlZCB0byBzdG9wXG4gICAgICAgIGlmICgoJyAnICsgZWxlbWVudC5jbGFzc05hbWUgKyAnICcpLmluZGV4T2YoJyBtb3VzZXRyYXAgJykgPiAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9iZWxvbmdzVG8oZWxlbWVudCwgc2VsZi50YXJnZXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzdG9wIGZvciBpbnB1dCwgc2VsZWN0LCBhbmQgdGV4dGFyZWFcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQudGFnTmFtZSA9PSAnSU5QVVQnIHx8IGVsZW1lbnQudGFnTmFtZSA9PSAnU0VMRUNUJyB8fCBlbGVtZW50LnRhZ05hbWUgPT0gJ1RFWFRBUkVBJyB8fCBlbGVtZW50LmlzQ29udGVudEVkaXRhYmxlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBleHBvc2VzIF9oYW5kbGVLZXkgcHVibGljbHkgc28gaXQgY2FuIGJlIG92ZXJ3cml0dGVuIGJ5IGV4dGVuc2lvbnNcbiAgICAgKi9cbiAgICBNb3VzZXRyYXAucHJvdG90eXBlLmhhbmRsZUtleSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiBzZWxmLl9oYW5kbGVLZXkuYXBwbHkoc2VsZiwgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogYWxsb3cgY3VzdG9tIGtleSBtYXBwaW5nc1xuICAgICAqL1xuICAgIE1vdXNldHJhcC5hZGRLZXljb2RlcyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgICBpZiAob2JqZWN0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBfTUFQW2tleV0gPSBvYmplY3Rba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfUkVWRVJTRV9NQVAgPSBudWxsO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBJbml0IHRoZSBnbG9iYWwgbW91c2V0cmFwIGZ1bmN0aW9uc1xuICAgICAqXG4gICAgICogVGhpcyBtZXRob2QgaXMgbmVlZGVkIHRvIGFsbG93IHRoZSBnbG9iYWwgbW91c2V0cmFwIGZ1bmN0aW9ucyB0byB3b3JrXG4gICAgICogbm93IHRoYXQgbW91c2V0cmFwIGlzIGEgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gICAgICovXG4gICAgTW91c2V0cmFwLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRvY3VtZW50TW91c2V0cmFwID0gTW91c2V0cmFwKGRvY3VtZW50KTtcbiAgICAgICAgZm9yICh2YXIgbWV0aG9kIGluIGRvY3VtZW50TW91c2V0cmFwKSB7XG4gICAgICAgICAgICBpZiAobWV0aG9kLmNoYXJBdCgwKSAhPT0gJ18nKSB7XG4gICAgICAgICAgICAgICAgTW91c2V0cmFwW21ldGhvZF0gPSAoZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudE1vdXNldHJhcFttZXRob2RdLmFwcGx5KGRvY3VtZW50TW91c2V0cmFwLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0gKG1ldGhvZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIE1vdXNldHJhcC5pbml0KCk7XG5cbiAgICAvLyBleHBvc2UgbW91c2V0cmFwIHRvIHRoZSBnbG9iYWwgb2JqZWN0XG4gICAgd2luZG93Lk1vdXNldHJhcCA9IE1vdXNldHJhcDtcblxuICAgIC8vIGV4cG9zZSBhcyBhIGNvbW1vbiBqcyBtb2R1bGVcbiAgICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBNb3VzZXRyYXA7XG4gICAgfVxuXG4gICAgLy8gZXhwb3NlIG1vdXNldHJhcCBhcyBhbiBBTUQgbW9kdWxlXG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gTW91c2V0cmFwO1xuICAgICAgICB9KTtcbiAgICB9XG59KSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBudWxsLCB0eXBlb2YgIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyBkb2N1bWVudCA6IG51bGwpO1xuIiwiKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qaXN0YW5idWwgaWdub3JlIG5leHQ6Y2FudCB0ZXN0Ki9cbiAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgZGVmaW5lKFtdLCBmYWN0b3J5KTtcbiAgfSBlbHNlIHtcbiAgICAvLyBCcm93c2VyIGdsb2JhbHNcbiAgICByb290Lm9iamVjdFBhdGggPSBmYWN0b3J5KCk7XG4gIH1cbn0pKHRoaXMsIGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuICBmdW5jdGlvbiBoYXNPd25Qcm9wZXJ0eShvYmosIHByb3ApIHtcbiAgICBpZihvYmogPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIC8vdG8gaGFuZGxlIG9iamVjdHMgd2l0aCBudWxsIHByb3RvdHlwZXMgKHRvbyBlZGdlIGNhc2U/KVxuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKVxuICB9XG5cbiAgZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZSl7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGZvciAodmFyIGkgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eSh2YWx1ZSwgaSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvU3RyaW5nKHR5cGUpe1xuICAgIHJldHVybiB0b1N0ci5jYWxsKHR5cGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNPYmplY3Qob2JqKXtcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgdG9TdHJpbmcob2JqKSA9PT0gXCJbb2JqZWN0IE9iamVjdF1cIjtcbiAgfVxuXG4gIHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbihvYmope1xuICAgIC8qaXN0YW5idWwgaWdub3JlIG5leHQ6Y2FudCB0ZXN0Ki9cbiAgICByZXR1cm4gdG9TdHIuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNCb29sZWFuKG9iail7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdib29sZWFuJyB8fCB0b1N0cmluZyhvYmopID09PSAnW29iamVjdCBCb29sZWFuXSc7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRLZXkoa2V5KXtcbiAgICB2YXIgaW50S2V5ID0gcGFyc2VJbnQoa2V5KTtcbiAgICBpZiAoaW50S2V5LnRvU3RyaW5nKCkgPT09IGtleSkge1xuICAgICAgcmV0dXJuIGludEtleTtcbiAgICB9XG4gICAgcmV0dXJuIGtleTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZhY3Rvcnkob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG5cbiAgICB2YXIgb2JqZWN0UGF0aCA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iamVjdFBhdGgpLnJlZHVjZShmdW5jdGlvbihwcm94eSwgcHJvcCkge1xuICAgICAgICBpZihwcm9wID09PSAnY3JlYXRlJykge1xuICAgICAgICAgIHJldHVybiBwcm94eTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qaXN0YW5idWwgaWdub3JlIGVsc2UqL1xuICAgICAgICBpZiAodHlwZW9mIG9iamVjdFBhdGhbcHJvcF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBwcm94eVtwcm9wXSA9IG9iamVjdFBhdGhbcHJvcF0uYmluZChvYmplY3RQYXRoLCBvYmopO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByb3h5O1xuICAgICAgfSwge30pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBoYXNTaGFsbG93UHJvcGVydHkob2JqLCBwcm9wKSB7XG4gICAgICByZXR1cm4gKG9wdGlvbnMuaW5jbHVkZUluaGVyaXRlZFByb3BzIHx8ICh0eXBlb2YgcHJvcCA9PT0gJ251bWJlcicgJiYgQXJyYXkuaXNBcnJheShvYmopKSB8fCBoYXNPd25Qcm9wZXJ0eShvYmosIHByb3ApKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNoYWxsb3dQcm9wZXJ0eShvYmosIHByb3ApIHtcbiAgICAgIGlmIChoYXNTaGFsbG93UHJvcGVydHkob2JqLCBwcm9wKSkge1xuICAgICAgICByZXR1cm4gb2JqW3Byb3BdO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldChvYmosIHBhdGgsIHZhbHVlLCBkb05vdFJlcGxhY2Upe1xuICAgICAgaWYgKHR5cGVvZiBwYXRoID09PSAnbnVtYmVyJykge1xuICAgICAgICBwYXRoID0gW3BhdGhdO1xuICAgICAgfVxuICAgICAgaWYgKCFwYXRoIHx8IHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHBhdGggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBzZXQob2JqLCBwYXRoLnNwbGl0KCcuJykubWFwKGdldEtleSksIHZhbHVlLCBkb05vdFJlcGxhY2UpO1xuICAgICAgfVxuICAgICAgdmFyIGN1cnJlbnRQYXRoID0gcGF0aFswXTtcbiAgICAgIHZhciBjdXJyZW50VmFsdWUgPSBnZXRTaGFsbG93UHJvcGVydHkob2JqLCBjdXJyZW50UGF0aCk7XG4gICAgICBpZiAocGF0aC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZSA9PT0gdm9pZCAwIHx8ICFkb05vdFJlcGxhY2UpIHtcbiAgICAgICAgICBvYmpbY3VycmVudFBhdGhdID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGN1cnJlbnRWYWx1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGN1cnJlbnRWYWx1ZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgIC8vY2hlY2sgaWYgd2UgYXNzdW1lIGFuIGFycmF5XG4gICAgICAgIGlmKHR5cGVvZiBwYXRoWzFdID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIG9ialtjdXJyZW50UGF0aF0gPSBbXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvYmpbY3VycmVudFBhdGhdID0ge307XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNldChvYmpbY3VycmVudFBhdGhdLCBwYXRoLnNsaWNlKDEpLCB2YWx1ZSwgZG9Ob3RSZXBsYWNlKTtcbiAgICB9XG5cbiAgICBvYmplY3RQYXRoLmhhcyA9IGZ1bmN0aW9uIChvYmosIHBhdGgpIHtcbiAgICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcGF0aCA9IFtwYXRoXTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhdGggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHBhdGggPSBwYXRoLnNwbGl0KCcuJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICghcGF0aCB8fCBwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gISFvYmo7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgaiA9IGdldEtleShwYXRoW2ldKTtcblxuICAgICAgICBpZigodHlwZW9mIGogPT09ICdudW1iZXInICYmIGlzQXJyYXkob2JqKSAmJiBqIDwgb2JqLmxlbmd0aCkgfHxcbiAgICAgICAgICAob3B0aW9ucy5pbmNsdWRlSW5oZXJpdGVkUHJvcHMgPyAoaiBpbiBPYmplY3Qob2JqKSkgOiBoYXNPd25Qcm9wZXJ0eShvYmosIGopKSkge1xuICAgICAgICAgIG9iaiA9IG9ialtqXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIG9iamVjdFBhdGguZW5zdXJlRXhpc3RzID0gZnVuY3Rpb24gKG9iaiwgcGF0aCwgdmFsdWUpe1xuICAgICAgcmV0dXJuIHNldChvYmosIHBhdGgsIHZhbHVlLCB0cnVlKTtcbiAgICB9O1xuXG4gICAgb2JqZWN0UGF0aC5zZXQgPSBmdW5jdGlvbiAob2JqLCBwYXRoLCB2YWx1ZSwgZG9Ob3RSZXBsYWNlKXtcbiAgICAgIHJldHVybiBzZXQob2JqLCBwYXRoLCB2YWx1ZSwgZG9Ob3RSZXBsYWNlKTtcbiAgICB9O1xuXG4gICAgb2JqZWN0UGF0aC5pbnNlcnQgPSBmdW5jdGlvbiAob2JqLCBwYXRoLCB2YWx1ZSwgYXQpe1xuICAgICAgdmFyIGFyciA9IG9iamVjdFBhdGguZ2V0KG9iaiwgcGF0aCk7XG4gICAgICBhdCA9IH5+YXQ7XG4gICAgICBpZiAoIWlzQXJyYXkoYXJyKSkge1xuICAgICAgICBhcnIgPSBbXTtcbiAgICAgICAgb2JqZWN0UGF0aC5zZXQob2JqLCBwYXRoLCBhcnIpO1xuICAgICAgfVxuICAgICAgYXJyLnNwbGljZShhdCwgMCwgdmFsdWUpO1xuICAgIH07XG5cbiAgICBvYmplY3RQYXRoLmVtcHR5ID0gZnVuY3Rpb24ob2JqLCBwYXRoKSB7XG4gICAgICBpZiAoaXNFbXB0eShwYXRoKSkge1xuICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgICAgfVxuICAgICAgaWYgKG9iaiA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICB9XG5cbiAgICAgIHZhciB2YWx1ZSwgaTtcbiAgICAgIGlmICghKHZhbHVlID0gb2JqZWN0UGF0aC5nZXQob2JqLCBwYXRoKSkpIHtcbiAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdFBhdGguc2V0KG9iaiwgcGF0aCwgJycpO1xuICAgICAgfSBlbHNlIGlmIChpc0Jvb2xlYW4odmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBvYmplY3RQYXRoLnNldChvYmosIHBhdGgsIGZhbHNlKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgICByZXR1cm4gb2JqZWN0UGF0aC5zZXQob2JqLCBwYXRoLCAwKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUubGVuZ3RoID0gMDtcbiAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgIGZvciAoaSBpbiB2YWx1ZSkge1xuICAgICAgICAgIGlmIChoYXNTaGFsbG93UHJvcGVydHkodmFsdWUsIGkpKSB7XG4gICAgICAgICAgICBkZWxldGUgdmFsdWVbaV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gb2JqZWN0UGF0aC5zZXQob2JqLCBwYXRoLCBudWxsKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgb2JqZWN0UGF0aC5wdXNoID0gZnVuY3Rpb24gKG9iaiwgcGF0aCAvKiwgdmFsdWVzICovKXtcbiAgICAgIHZhciBhcnIgPSBvYmplY3RQYXRoLmdldChvYmosIHBhdGgpO1xuICAgICAgaWYgKCFpc0FycmF5KGFycikpIHtcbiAgICAgICAgYXJyID0gW107XG4gICAgICAgIG9iamVjdFBhdGguc2V0KG9iaiwgcGF0aCwgYXJyKTtcbiAgICAgIH1cblxuICAgICAgYXJyLnB1c2guYXBwbHkoYXJyLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpKTtcbiAgICB9O1xuXG4gICAgb2JqZWN0UGF0aC5jb2FsZXNjZSA9IGZ1bmN0aW9uIChvYmosIHBhdGhzLCBkZWZhdWx0VmFsdWUpIHtcbiAgICAgIHZhciB2YWx1ZTtcblxuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHBhdGhzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmICgodmFsdWUgPSBvYmplY3RQYXRoLmdldChvYmosIHBhdGhzW2ldKSkgIT09IHZvaWQgMCkge1xuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgIH07XG5cbiAgICBvYmplY3RQYXRoLmdldCA9IGZ1bmN0aW9uIChvYmosIHBhdGgsIGRlZmF1bHRWYWx1ZSl7XG4gICAgICBpZiAodHlwZW9mIHBhdGggPT09ICdudW1iZXInKSB7XG4gICAgICAgIHBhdGggPSBbcGF0aF07XG4gICAgICB9XG4gICAgICBpZiAoIXBhdGggfHwgcGF0aC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH1cbiAgICAgIGlmIChvYmogPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gb2JqZWN0UGF0aC5nZXQob2JqLCBwYXRoLnNwbGl0KCcuJyksIGRlZmF1bHRWYWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBjdXJyZW50UGF0aCA9IGdldEtleShwYXRoWzBdKTtcbiAgICAgIHZhciBuZXh0T2JqID0gZ2V0U2hhbGxvd1Byb3BlcnR5KG9iaiwgY3VycmVudFBhdGgpXG4gICAgICBpZiAobmV4dE9iaiA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gbmV4dE9iajtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG9iamVjdFBhdGguZ2V0KG9ialtjdXJyZW50UGF0aF0sIHBhdGguc2xpY2UoMSksIGRlZmF1bHRWYWx1ZSk7XG4gICAgfTtcblxuICAgIG9iamVjdFBhdGguZGVsID0gZnVuY3Rpb24gZGVsKG9iaiwgcGF0aCkge1xuICAgICAgaWYgKHR5cGVvZiBwYXRoID09PSAnbnVtYmVyJykge1xuICAgICAgICBwYXRoID0gW3BhdGhdO1xuICAgICAgfVxuXG4gICAgICBpZiAob2JqID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzRW1wdHkocGF0aCkpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH1cbiAgICAgIGlmKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gb2JqZWN0UGF0aC5kZWwob2JqLCBwYXRoLnNwbGl0KCcuJykpO1xuICAgICAgfVxuXG4gICAgICB2YXIgY3VycmVudFBhdGggPSBnZXRLZXkocGF0aFswXSk7XG4gICAgICBpZiAoIWhhc1NoYWxsb3dQcm9wZXJ0eShvYmosIGN1cnJlbnRQYXRoKSkge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfVxuXG4gICAgICBpZihwYXRoLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgb2JqLnNwbGljZShjdXJyZW50UGF0aCwgMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIG9ialtjdXJyZW50UGF0aF07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBvYmplY3RQYXRoLmRlbChvYmpbY3VycmVudFBhdGhdLCBwYXRoLnNsaWNlKDEpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cbiAgICByZXR1cm4gb2JqZWN0UGF0aDtcbiAgfVxuXG4gIHZhciBtb2QgPSBmYWN0b3J5KCk7XG4gIG1vZC5jcmVhdGUgPSBmYWN0b3J5O1xuICBtb2Qud2l0aEluaGVyaXRlZFByb3BzID0gZmFjdG9yeSh7aW5jbHVkZUluaGVyaXRlZFByb3BzOiB0cnVlfSlcbiAgcmV0dXJuIG1vZDtcbn0pO1xuIiwiaW1wb3J0IGNyZWF0ZSBmcm9tIFwiLi91dGlscy9jcmVhdGVcIjtcbmltcG9ydCBlbGVtZW50cyBmcm9tIFwiLi91dGlscy9lbGVtZW50c1wiO1xuXG53aW5kb3cuZWxlbWVudHMgPSBlbGVtZW50cztcblxuY3JlYXRlLmFsbCgpOyIsImltcG9ydCBET01TdHJpbmcgZnJvbSBcIi4vLi4vdHlwZS9ET01TdHJpbmcuanNcIjtcblxuLyoqXG4qIEFkZHMgZnVuY3Rpb25hbGl0eSB0byBgYXJpYS1jaGVja2VkYCBhdHRyaWJ1dGUuXG4qXG4qIENoYW5nZXMgdmFsdWUgd2hlbiBjbGlja2VkIG9yIHdoaWxlIGZvY3VzZWQgcHJlc3NpbmcgYFNwYWNlYC5cbipcbioge0BsaW5rIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtY2hlY2tlZH1cbiogQGVtaXRzIGNsaWNrIHdoZW4gY2xpY2tlZCBvciB3aGlsZSBmb2N1c2VkIHByZXNzaW5nIGBTcGFjZWAuXG4qIEBlbWl0cyBjaGFuZ2Ugd2hlbiBjbGlja2VkIG9yIHdoaWxlIGZvY3VzZWQgcHJlc3NpbmcgYFNwYWNlYC5cbiovXG5sZXQgQXJpYUNoZWNrZWQgPSAoc3VwZXJjbGFzcykgPT4gY2xhc3MgZXh0ZW5kcyBzdXBlcmNsYXNzIHtcblxuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0c3VwZXIoLi4uYXJncyk7XG5cblx0XHR0aGlzLmFkZExpc3RlbmVyKFwia2V5XCIsIHRoaXMub25DaGVja2VkLmJpbmQodGhpcyksIHtrZXk6IFwic3BhY2VcIn0pO1xuXHRcdHRoaXMuYWRkTGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uQ2hlY2tlZC5iaW5kKHRoaXMpKTtcblx0fVxuXG5cdG9uQ2hlY2tlZChldikge1xuXHRcdGlmKGV2KSBldi5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0aWYodGhpcy5kaXNhYmxlZCAhPT0gdHJ1ZSkge1xuXHRcdFx0dGhpcy5jaGVja2VkID0gRE9NU3RyaW5nLnRvZ2dsZSh0aGlzLmNoZWNrZWQpO1xuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBJbnB1dEV2ZW50KFwiaW5wdXRcIikpO1xuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImNoYW5nZVwiKSk7XG5cdFx0fVxuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBcmlhQ2hlY2tlZDsiLCJpbXBvcnQgYm9vbGVhbiBmcm9tIFwiLi8uLi90eXBlL2Jvb2xlYW5cIjtcclxuXHJcbi8qKlxyXG4qIEFkZHMgZnVuY3Rpb25hbGl0eSB0byBgYXJpYS1leHBhbmRlZGAgYXR0cmlidXRlXHJcbiogQHRvZG8gYWRkIGEgc2V0dGluZyB0byBkZWZpbmUgaG93IHRoZSB2aXNpYmlsaXR5IHNob3VsZCBiZSB0b2dnbGVkXHJcbiovXHJcbmxldCBBcmlhRXhwYW5kZWQgPSAoc3VwZXJjbGFzcykgPT4gY2xhc3MgZXh0ZW5kcyBzdXBlcmNsYXNzIHtcclxuXHQvKipcclxuXHQqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbGVtZW50IEVsZW1lbnQgd2l0aCBhbiBgYXJpYS1leHBhbmRlZGAgYXR0cmlidXRlXHJcblx0Ki9cclxuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XHJcblx0XHRzdXBlciguLi5hcmdzKTtcclxuXHRcdGlmICh0aGlzLmV4cGFuZGVkICE9PSB1bmRlZmluZWQpIHsgLy8gdG9kbzogYWRkIHdoZW4gZmlyc3QgdGltZSBhcmlhLWV4cGFuZGVkIGlzIGJvb2xlYW5cclxuXHRcdFx0dGhpcy5hZGRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25FeHBhbmRlZC5iaW5kKHRoaXMpKTtcclxuXHRcdFx0Ly8gdGhpcy5hZGRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm9uRXhwYW5kZWQuYmluZCh0aGlzKSwgeyBrZXk6IFtcImVudGVyXCIsIFwic3BhY2VcIl0gfSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRvbkV4cGFuZGVkKGV2KSB7XHJcblx0XHRpZiAodHlwZW9mIHN1cGVyLm9uRXhwYW5kZWQgPT0gXCJmdW5jdGlvblwiKSBzdXBlci5vbkV4cGFuZGVkKGV2KTtcclxuXHRcdGlmKGV2ICYmIHR5cGVvZiBldi5wcmV2ZW50RGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiKSBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdGlmKHRoaXMuZGlzYWJsZWQgIT09IHRydWUpIHtcclxuXHRcdFx0dGhpcy5leHBhbmRlZCA9IGJvb2xlYW4udG9nZ2xlKHRoaXMuZXhwYW5kZWQpO1xyXG5cclxuXHRcdFx0aWYodGhpcy5leHBhbmRlZCkge1xyXG5cdFx0XHRcdHRoaXMuY29udHJvbHMuZm9yRWFjaChjb250cm9sID0+IHtcclxuXHRcdFx0XHRcdGNvbnRyb2wuZWxlbWVudC5oaWRkZW4gPSBmYWxzZTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmNvbnRyb2xzLmZvckVhY2goY29udHJvbCA9PiB7XHJcblx0XHRcdFx0XHRjb250cm9sLmVsZW1lbnQuaGlkZGVuID0gdHJ1ZTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFyaWFFeHBhbmRlZDsiLCJpbXBvcnQgRE9NU3RyaW5nIGZyb20gXCIuLy4uL3R5cGUvRE9NU3RyaW5nXCI7XHJcblxyXG4vKipcclxuKiBBZGRzIGZ1bmN0aW9uYWxpdHkgdG8gYGFyaWEtcHJlc3NlZGAgYXR0cmlidXRlLlxyXG4qXHJcbiogQ2hhbmdlcyB2YWx1ZSB3aGVuIGNsaWNrZWQgb3Igd2hpbGUgZm9jdXNlZCBwcmVzc2luZyBgU3BhY2VgIG9yIGBFbnRlcmAuXHJcbipcclxuKiB7QGxpbmsgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1wcmVzc2VkfVxyXG4qIEBlbWl0cyBjbGljayB3aGVuIGNsaWNrZWQgb3Igd2hpbGUgZm9jdXNlZCBwcmVzc2luZyBgU3BhY2VgIG9yIGBFbnRlcmAuXHJcbiovXHJcbmxldCBBcmlhUHJlc3NlZCA9IChzdXBlcmNsYXNzKSA9PiBjbGFzcyBleHRlbmRzIHN1cGVyY2xhc3Mge1xyXG5cdC8qKlxyXG5cdCogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgRWxlbWVudCB3aXRoIGFuIGBhcmlhLXByZXNzZWRgIGF0dHJpYnV0ZVxyXG5cdCovXHJcblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xyXG5cdFx0c3VwZXIoLi4uYXJncyk7XHJcblxyXG5cdFx0aWYodGhpcy5wcmVzc2VkICE9PSB1bmRlZmluZWQpIHsgLy8gdG9kbzogYWRkIHdoZW4gZmlyc3QgdGltZSBhcmlhLXByZXNzZWQgaXMgYm9vbGVhblxyXG5cdFx0XHR0aGlzLmFkZExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vblByZXNzZWQuYmluZCh0aGlzKSk7XHJcblx0XHRcdHRoaXMuYWRkTGlzdGVuZXIoXCJrZXlcIiwgdGhpcy5vblByZXNzZWQuYmluZCh0aGlzKSwgeyBrZXk6IFtcImVudGVyXCIsIFwic3BhY2VcIl19KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9uUHJlc3NlZChldikge1xyXG5cdFx0aWYgKHR5cGVvZiBzdXBlci5vblByZXNzZWQgPT0gXCJmdW5jdGlvblwiKSBzdXBlci5vblByZXNzZWQoZXYpO1xyXG5cclxuXHRcdGlmKHRoaXMuZGlzYWJsZWQgIT09IHRydWUpIHtcclxuXHRcdFx0dGhpcy5wcmVzc2VkID0gRE9NU3RyaW5nLnRvZ2dsZSh0aGlzLnByZXNzZWQpO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFyaWFQcmVzc2VkOyIsImltcG9ydCBib29sZWFuIGZyb20gXCIuLy4uL3R5cGUvYm9vbGVhblwiO1xyXG5cclxuLyoqXHJcbiAqIGdldHMgYW5kIHNldHMgdGhlIGBhcmlhLXNlbGVjdGVkYCBhdHRyaWJ1dGUuXHJcbiAqXHJcbiAqIEluZGljYXRlcyBpZiBhIGVsZW1lbnQgaXMgc2VsZWN0YWJsZVxyXG4gKlxyXG4gKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtc2VsZWN0ZWRcclxuICovXHJcbmxldCBBcmlhU2VsZWN0ZWQgPSAoc3VwZXJjbGFzcykgPT4gY2xhc3MgZXh0ZW5kcyBzdXBlcmNsYXNzIHtcclxuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XHJcblx0XHRzdXBlciguLi5hcmdzKTtcclxuXHJcblx0XHR0aGlzLmFkZExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vblNlbGVjdGVkLmJpbmQodGhpcykpO1xyXG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm9uU2VsZWN0ZWQuYmluZCh0aGlzKSwge2tleTogW1wic3BhY2VcIiwgXCJlbnRlclwiXX0pO1xyXG5cdH1cclxuXHJcblx0b25TZWxlY3RlZChldikge1xyXG5cdFx0aWYodHlwZW9mIHN1cGVyLm9uU2VsZWN0ZWQgPT0gXCJmdW5jdGlvblwiKSBzdXBlci5vblNlbGVjdGVkKGV2KTtcclxuXHRcdHRoaXMuc2VsZWN0ZWQgPSBib29sZWFuLnRvZ2dsZSh0aGlzLnNlbGVjdGVkKTtcclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcmlhU2VsZWN0ZWQ7IiwiLyoqXHJcbiAqIFxyXG4gKi9cclxuY29uc3Qgcm9sZXMgPSB7XHJcblx0YWxlcnQ6IHtcclxuXHRcdHN1cGVyOiBbXCJzZWN0aW9uXCJdLFxyXG5cdFx0c3ViOiBbXCJhbGVydGRpYWxvZ1wiXSxcclxuXHRcdGRlZmF1bHRzOiB7XHJcblx0XHRcdGxpdmU6IFwiYXNzZXJ0aXZlXCIsXHJcblx0XHRcdGF0b21pYzogdHJ1ZVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0YWxlcnRkaWFsb2c6IHsgc3VwZXI6IFtcImFsZXJ0XCIsIFwiZGlhbG9nXCJdIH0sXHJcblx0YXBwbGljYXRpb246IHsgc3VwZXI6IFtcInN0cnVjdHVyZVwiXSB9LFxyXG5cdGFydGljbGU6IHtcclxuXHRcdHN1cGVyOiBbXCJkb2N1bWVudFwiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJhcnRpY2xlOm5vdChbcm9sZSlcIl1cclxuXHR9LFxyXG5cdC8qKiBAdG9kbyBtb3JlIHN0cmljdCBiYW5uZXIgc2VsZWN0b3IgICovXHJcblx0YmFubmVyOiB7XHJcblx0XHRzdXBlcjogW1wibGFuZG1hcmtcIl0sXHJcblx0XHRpbXBsaWNpdDogW1wiaGVhZGVyOm5vdChbcm9sZV0pXCJdXHJcblx0fSxcclxuXHRidXR0b246IHtcclxuXHRcdHN1cGVyOiBbXCJjb21tYW5kXCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcImJ1dHRvbjpub3QoW3JvbGVdKVwiLCBcImlucHV0W3R5cGU9J2J1dHRvbiddOm5vdChbcm9sZV0pXCIsXHJcblx0XHRcdFwiaW5wdXRbdHlwZT0ncmVzZXQnXTpub3QoW3JvbGVdKVwiLCBcImlucHV0W3R5cGU9J2ltYWdlJ106bm90KFtyb2xlXSlcIixcclxuXHRcdFx0XCJpbnB1dFt0eXBlPSdzdWJtaXQnXTpub3QoW3JvbGVdKVwiLCBcInN1bW1hcnk6bm90KFtyb2xlXSlcIl1cclxuXHR9LFxyXG5cdGNlbGw6IHtcclxuXHRcdHN1cGVyOiBbXCJzZWN0aW9uXCJdLFxyXG5cdFx0c3ViOiBbXCJjb2x1bW5oZWFkZXJcIiwgXCJyb3doZWFkZXJcIiwgXCJncmlkY2VsbFwiXSxcclxuXHRcdGNvbnRleHQ6IFtcInJvd1wiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJ0YWJsZSB0ZDpub3QoW3JvbGVdKVwiXVxyXG5cdH0sXHJcblx0Y2hlY2tib3g6IHtcclxuXHRcdHN1cGVyOiBbXCJpbnB1dFwiXSxcclxuXHRcdHN1YjogW1wibWVudWl0ZW1jaGVja2JveFwiLCBcInN3aXRjaFwiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJpbnB1dFt0eXBlPSdjaGVja2JveCddOm5vdChbcm9sZV0pXCJdLFxyXG5cdFx0ZGVmYXVsdHM6IHtcclxuXHRcdFx0Y2hlY2tlZDogdHJ1ZVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0Y29sdW1uaGVhZGVyOiB7XHJcblx0XHRzdXBlcjogW1wiY2VsbFwiLCBcImdyaWRjZWxsXCIsIFwic2VjdGlvbmhlYWRcIl0sXHJcblx0XHRjb250ZXh0OiBbXCJyb3dcIl0sXHJcblx0XHRpbXBsaWNpdDogW1widGhlYWQgdGg6bm90KFtyb2xlXSlcIl1cclxuXHR9LFxyXG5cdC8qKiBAdG9kbyBzaXplIGF0dHJpYnV0ZSBkb2Vzbid0IGNoZWNrIGZhdWx0eSB2YWx1ZXMgKi9cclxuXHRjb21ib2JveDoge1xyXG5cdFx0c3VwZXI6IFtcInNlbGVjdFwiXSxcclxuXHRcdG93bnM6IHtcclxuXHRcdFx0YWxsOiBbXCJ0ZXh0Ym94XCJdLFxyXG5cdFx0XHRhbnk6IFtcImxpc3Rib3hcIiwgXCJ0cmVlXCIsIFwiZ3JpZFwiLCBcImRpYWxvZ1wiXVxyXG5cdFx0fSxcclxuXHRcdGltcGxpY2l0OiBbXCJpbnB1dFt0eXBlPSdlbWFpbCddW2xpc3RdOm5vdChbcm9sZV0pXCIsXHJcblx0XHRcdFwiaW5wdXRbdHlwZT0ndGV4dCddW2xpc3RdOm5vdChbcm9sZV0pXCIsIFwiaW5wdXRbdHlwZT0nc2VhcmNoJ11bbGlzdF06bm90KFtyb2xlXSlcIixcclxuXHRcdFx0XCJpbnB1dFt0eXBlPSd0ZWwnXVtsaXN0XTpub3QoW3JvbGVdKVwiLCBcImlucHV0W3R5cGU9J3VybCddW2xpc3RdOm5vdChbcm9sZV0pXCIsXHJcblx0XHRcdFwic2VsZWN0Om5vdChbbXVsdGlwbGVdKTpub3QoW3NpemVdKTpub3QoW3JvbGVdKVwiLCBcInNlbGVjdDpub3QoW211bHRpcGxlXSlbc2l6ZT0nMCddOm5vdChbcm9sZV0pXCIsXHJcblx0XHRcdFwic2VsZWN0Om5vdChbbXVsdGlwbGVdKVtzaXplPScxJ106bm90KFtyb2xlXSlcIl0sXHJcblx0XHRkZWZhdWx0czoge1xyXG5cdFx0XHRleHBhbmRlZDogZmFsc2UsXHJcblx0XHRcdGhhc1BvcFVwOiBcImxpc3Rib3hcIlxyXG5cdFx0fVxyXG5cdH0sXHJcblx0Y29tbWFuZDoge1xyXG5cdFx0c3VwZXI6IFtcIndpZGdldFwiXSxcclxuXHRcdHN1YjogW1wibWVudWl0ZW1cIiwgXCJidXR0b25cIiwgXCJsaW5rXCJdXHJcblx0fSxcclxuXHRjb21wbGVtZW50YXJ5OiB7XHJcblx0XHRzdXBlcjogW1wibGFuZG1hcmtcIl0sXHJcblx0XHRpbXBsaWNpdDogW1wiYXNpZGU6bm90KFtyb2xlXSlcIl1cclxuXHR9LFxyXG5cdGNvbXBvc2l0ZToge1xyXG5cdFx0c3VwZXI6IFtcIndpZGdldFwiXSxcclxuXHRcdHN1YjogW1wiZ3JpZFwiLCBcInNlbGVjdFwiLCBcInNwaW5idXR0b25cIiwgXCJ0YWJsaXN0XCJdXHJcblx0fSxcclxuXHQvKiogQHRvZG8gbW9yZSBzdHJpY3QgZm9vdGVyIHNlbGVjdG9yICAqL1xyXG5cdGNvbnRlbnRpbmZvOiB7XHJcblx0XHRzdXBlcjogW1wibGFuZG1hcmtcIl0sXHJcblx0XHRpbXBsaWNpdDogW1wiZm9vdGVyOm5vdChbcm9sZV0pXCJdXHJcblx0fSxcclxuXHRkZWZpbml0aW9uOiB7XHJcblx0XHRzdXBlcjogW1wic2VjdGlvblwiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJkZDpub3QoW3JvbGVdKVwiXVxyXG5cdH0sXHJcblx0ZGlhbG9nOiB7XHJcblx0XHRzdXBlcjogW1wid2luZG93XCJdLFxyXG5cdFx0c3ViOiBbXCJhbGVydGRpYWxvZ1wiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJkaWFsb2c6bm90KFtyb2xlXSlcIl1cclxuXHR9LFxyXG5cdGRpcmVjdG9yeTogeyBzdXBlcjogW1wibGlzdFwiXSB9LFxyXG5cdGRvY3VtZW50OiB7XHJcblx0XHRzdXBlcjogW1wic3RydWN0dXJlXCJdLFxyXG5cdFx0c3ViOiBbXCJhcnRpY2xlXCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcImFzaWRlOm5vdChbcm9sZV0pXCJdXHJcblx0fSxcclxuXHRmZWVkOiB7XHJcblx0XHRzdXBlcjogW1wibGlzdFwiXSxcclxuXHRcdG93bnM6IHsgYW55OiBbXCJhcnRpY2xlXCJdIH1cclxuXHR9LFxyXG5cdGZpZ3VyZToge1xyXG5cdFx0c3VwZXI6IFtcInNlY3Rpb25cIl0sXHJcblx0XHRpbXBsaWNpdDogW1wiZmlndXJlOm5vdChbcm9sZV0pXCJdXHJcblx0fSxcclxuXHRmb3JtOiB7XHJcblx0XHRzdXBlcjogW1wibGFuZG1hcmtcIl0sXHJcblx0XHRpbXBsaWNpdDogW1wiZm9ybTpub3QoW3JvbGVdKVwiXVxyXG5cdH0sXHJcblx0Z3JpZDoge1xyXG5cdFx0c3VwZXI6IFtcImNvbXBvc2l0ZVwiLCBcInRhYmxlXCJdLFxyXG5cdFx0c3ViOiBbXCJ0cmVlZ3JpZFwiXSxcclxuXHRcdG93bnM6IHsgYW55OiBbXCJyb3dncm91cFwiLCBcInJvd1wiXSB9XHJcblx0fSxcclxuXHRncmlkY2VsbDoge1xyXG5cdFx0c3VwZXI6IFtcImNlbGxcIiwgXCJ3aWRnZXRcIl0sXHJcblx0XHRzdWI6IFtcImNvbHVtbmhlYWRlclwiLCBcInJvd2hlYWRlclwiXSxcclxuXHRcdGNvbnRleHQ6IFtcInJvd1wiXVxyXG5cdH0sXHJcblx0Z3JvdXA6IHtcclxuXHRcdHN1cGVyOiBbXCJzZWN0aW9uXCJdLFxyXG5cdFx0c3ViOiBbXCJyb3dcIiwgXCJzZWxlY3RcIiwgXCJ0b29sYmFyXCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcImRldGFpbHM6bm90KFtyb2xlXSlcIiwgXCJvcHRncm91cDpub3QoW3JvbGVdKVwiXVxyXG5cdH0sXHJcblx0aGVhZGluZzoge1xyXG5cdFx0c3VwZXI6IFtcInNlY3Rpb25oZWFkXCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcImgxOm5vdChbcm9sZV0pXCIsIFwiaDI6bm90KFtyb2xlXSlcIiwgXCJoMzpub3QoW3JvbGVdKVwiLFxyXG5cdFx0XHRcImg0Om5vdChbcm9sZV0pXCIsIFwiaDU6bm90KFtyb2xlXSlcIiwgXCJoNjo6bm90KFtyb2xlXSlcIl0sXHJcblx0XHRkZWZhdWx0czoge1xyXG5cdFx0XHRsZXZlbDogMlxyXG5cdFx0fVxyXG5cdH0sXHJcblx0aW1nOiB7XHJcblx0XHRzdXBlcjogW1wic2VjdGlvblwiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJpbWdbYWx0XTpub3QoW2FsdD0nJ10pOm5vdChbcm9sZV0pXCJdXHJcblx0fSxcclxuXHRpbnB1dDoge1xyXG5cdFx0c3VwZXI6IFtcIndpZGdldFwiXSxcclxuXHRcdHN1YjogW1wiY2hlY2tib3hcIiwgXCJvcHRpb25cIiwgXCJyYWRpb1wiLCBcInNsaWRlclwiLCBcInNwaW5idXR0b25cIiwgXCJ0ZXh0Ym94XCJdXHJcblx0fSxcclxuXHRsYW5kbWFyazoge1xyXG5cdFx0c3VwZXI6IFtcInNlY3Rpb25cIl0sXHJcblx0XHRzdWI6IFtcImJhbm5lclwiLCBcImNvbXBsZW1lbnRhcnlcIiwgXCJjb250ZW50aW5mb1wiLCBcImZvcm1cIiwgXCJtYWluXCIsIFwibmF2aWdhdGlvblwiLCBcInJlZ2lvblwiLCBcInNlYXJjaFwiXVxyXG5cdH0sXHJcblx0bGluazoge1xyXG5cdFx0c3VwZXI6IFtcImNvbW1hbmRcIl0sXHJcblx0XHRpbXBsaWNpdDogW1wiYVtocmVmXTpub3QoW3JvbGVdKVwiLCBcImFyZWFbaHJlZl06bm90KFtyb2xlXSlcIiwgXCJsaW5rW2hyZWZdOm5vdChbcm9sZV0pXCJdXHJcblx0fSxcclxuXHRsaXN0OiB7XHJcblx0XHRzdXBlcjogW1wic2VjdGlvblwiXSxcclxuXHRcdHN1YjogW1wiZGlyZWN0b3J5XCIsIFwiZmVlZFwiXSxcclxuXHRcdG93bnM6IHsgYW55OiBbXCJncm91cFwiLCBcImxpc3RpdGVtXCJdIH0sXHJcblx0XHRpbXBsaWNpdDogW1wiZGw6bm90KFtyb2xlXSlcIiwgXCJvbDpub3QoW3JvbGVdKVwiLCBcInVsOm5vdChbcm9sZV0pXCJdXHJcblx0fSxcclxuXHRsaXN0Ym94OiB7XHJcblx0XHRzdXBlcjogW1wic2VsZWN0XCJdLFxyXG5cdFx0b3duczogeyBhbnk6IFtcIm9wdGlvblwiXSB9LFxyXG5cdFx0aW1wbGljaXQ6IFtcImRhdGFsaXN0Om5vdChbcm9sZV0pXCIsIFwic2VsZWN0W211bHRpcGxlXTpub3QoW3JvbGVdKVwiLFxyXG5cdFx0XHRcInNlbGVjdFtzaXplXTpub3QoW3NpemU9JzAnXSk6bm90KFtzaXplPScxJ10pOm5vdChbcm9sZV0pXCJdXHJcblx0fSxcclxuXHRsaXN0aXRlbToge1xyXG5cdFx0c3VwZXI6IFtcInNlY3Rpb25cIl0sXHJcblx0XHRzdWI6IFtcInRyZWVpdGVtXCJdLFxyXG5cdFx0Y29udGV4dDogW1wiZ3JvdXBcIiwgXCJsaXN0XCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcImR0Om5vdChbcm9sZV0pXCIsIFwib2wgPiBsaTo6bm90KFtyb2xlXSlcIl1cclxuXHR9LFxyXG5cdGxvZzoge1xyXG5cdFx0c3VwZXI6IFtcInNlY3Rpb25cIl0sXHJcblx0XHRkZWZhdWx0czoge1xyXG5cdFx0XHRsaXZlOiBcInBvbGxpdGVcIlxyXG5cdFx0fVxyXG5cdH0sXHJcblx0bWFpbjoge1xyXG5cdFx0c3VwZXI6IFtcImxhbmRtYXJrXCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcIm1haW46bm90KFtyb2xlXSlcIl1cclxuXHR9LFxyXG5cdG1hcnF1ZWU6IHsgc3VwZXI6IFtcInNlY3Rpb25cIl0gfSxcclxuXHRtYXRoOiB7XHJcblx0XHRzdXBlcjogW1wic2VjdGlvblwiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJtYXRoOm5vdChbcm9sZV0pXCJdXHJcblx0fSxcclxuXHRtZW51OiB7XHJcblx0XHRzdXBlcjogW1wic2VsZWN0XCJdLFxyXG5cdFx0c3ViOiBbXCJtZW51YmFyXCJdLFxyXG5cdFx0b3duczogeyBhbnk6IFtcIm1lbnVpdGVtXCIsIFwibWVudWl0ZW1yYWRpb1wiLCBcIm1lbnVpdGVtY2hlY2tib3hcIiwgXCJncm91cFwiXX0sXHJcblx0XHRpbXBsaWNpdDogW1wibWVudVt0eXBlPSdjb250ZXh0J106bm90KFtyb2xlXSlcIl0sXHJcblx0XHRkZWZhdWx0czogeyBvcmllbnRhdGlvbjogXCJ2ZXJ0aWNhbFwiIH1cclxuXHR9LFxyXG5cdG1lbnViYXI6IHtcclxuXHRcdHN1cGVyOiBbXCJtZW51XCJdLFxyXG5cdFx0c3ViOiBbXCJ0b29sYmFyXCJdLFxyXG5cdFx0b3duczogeyBhbnk6IFtcIm1lbnVpdGVtXCIsIFwibWVudWl0ZW1yYWRpb1wiLCBcIm1lbnVpdGVtY2hlY2tib3hcIiwgXCJncm91cFwiXSB9LFxyXG5cdFx0ZGVmYXVsdHM6IHsgb3JpZW50YXRpb246IFwiaG9yaXpvbnRhbFwiIH1cclxuXHR9LFxyXG5cdG1lbnVpdGVtOiB7XHJcblx0XHRzdXBlcjogW1wiY29tbWFuZFwiXSxcclxuXHRcdHN1YjogW1wibWVudWl0ZW1jaGVja2JveFwiXSxcclxuXHRcdGNvbnRleHQ6IFtcImdyb3VwXCIsIFwibWVudVwiLCBcIm1lbnViYXJcIl0sXHJcblx0XHRpbXBsaWNpdDogW1wibWVudWl0ZW1bdHlwZT0nY29udGV4dCddOm5vdChbcm9sZV0pXCJdXHJcblx0fSxcclxuXHRtZW51aXRlbWNoZWNrYm94OiB7XHJcblx0XHRzdXBlcjogW1wiY2hlY2tib3hcIiwgXCJtZW51aXRlbVwiXSxcclxuXHRcdHN1YjogW1wibWVudWl0ZW1yYWRpb1wiXSxcclxuXHRcdGNvbnRleHQ6IFtcIm1lbnVcIiwgXCJtZW51YmFyXCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcIm1lbnVpdGVtW3R5cGU9J2NoZWNrYm94J106bm90KFtyb2xlXSlcIl0sXHJcblx0XHRkZWZhdWx0czogeyBjaGVja2VkOiBmYWxzZSB9XHJcblx0fSxcclxuXHRtZW51aXRlbXJhZGlvOiB7XHJcblx0XHRzdXBlcjogW1wibWVudWl0ZW1jaGVja2JveFwiLCBcInJhZGlvXCJdLFxyXG5cdFx0Y29udGV4dDogW1wiZ3JvdXBcIiwgXCJtZW51XCIsIFwibWVudWJhclwiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJtZW51aXRlbVt0eXBlPSdyYWRpbyddOm5vdChbcm9sZV0pXCJdLFxyXG5cdFx0ZGVmYXVsdHM6IHsgY2hlY2tlZDogZmFsc2UgfVxyXG5cdH0sXHJcblx0bmF2aWdhdGlvbjoge1xyXG5cdFx0c3VwZXI6IFtcImxhbmRtYXJrXCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcIm5hdjpub3QoW3JvbGVdKVwiXVxyXG5cdH0sXHJcblx0LyoqIEB0b2RvIHJlY29uc2lkZXIgaWYgbm9uZSA9PSBwcmVzZW50YXRpb24gKi9cclxuXHRub25lOiB7IHN1cGVyOiBbXCJzdHJ1Y3R1cmVcIl0gfSxcclxuXHRub3RlOiB7IHN1cGVyOiBbXCJzZWN0aW9uXCJdIH0sXHJcblx0LyoqIEB0b2RvIG1vcmUgc3RyaWN0IGRhdGFsaXN0IHNlbGVjdG9yICovXHJcblx0b3B0aW9uOiB7XHJcblx0XHRzdXBlcjogW1wiaW5wdXRcIl0sXHJcblx0XHRzdWI6IFtcInRyZWVpdGVtXCJdLFxyXG5cdFx0Y29udGV4dDogW1wibGlzdGJveFwiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJkYXRhbGlzdCBvcHRpb246bm90KFtyb2xlXSlcIl0sXHJcblx0XHRkZWZhdWx0czogeyBjaGVja2VkOiBmYWxzZSB9XHJcblx0fSxcclxuXHRwcmVzZW50YXRpb246IHtcclxuXHRcdHN1cGVyOiBbXCJzdHJ1Y3R1cmVcIl1cclxuXHR9LFxyXG5cdHByb2dyZXNzYmFyOiB7XHJcblx0XHRzdXBlcjogW1wicmFuZ2VcIl0sXHJcblx0XHRpbXBsaWNpdDogW1wicHJvZ3Jlc3M6bm90KFtyb2xlXSlcIl1cclxuXHR9LFxyXG5cdHJhZGlvOiB7XHJcblx0XHRzdXBlcjogW1wiaW5wdXRcIl0sXHJcblx0XHRzdWI6IFtcIm1lbnVpdGVtcmFkaW9cIl0sXHJcblx0XHRpbXBsaWNpdDogW1wiaW5wdXRbdHlwZT0ncmFkaW8nXTpub3QoW3JvbGVdKVwiXSxcclxuXHRcdGRlZmF1bHRzOiB7IGNoZWNrZWQ6IGZhbHNlIH1cclxuXHR9LFxyXG5cdHJhZGlvZ3JvdXA6IHtcclxuXHRcdHN1cGVyOiBbXCJzZWxlY3RcIl0sXHJcblx0XHRvd25zOiBbXCJyYWRpb1wiXVxyXG5cdH0sXHJcblx0cmFuZ2U6IHtcclxuXHRcdHN1cGVyOiBbXCJ3aWRnZXRcIl0sXHJcblx0XHRzdWI6IFtcInByb2dyZXNzYmFyXCIsIFwic2Nyb2xsYmFyXCIsICBcInNsaWRlclwiLCAgXCJzcGluYnV0dG9uXCJdXHJcblx0fSxcclxuXHQvKiogQHRvZG8gYWRkIHNlY3Rpb24gc2VsZWN0b3IgdG8gY2hlY2sgYWNjZXNzaWJsZSAqL1xyXG5cdHJlZ2lvbjogeyBzdXBlcjogW1wibGFuZG1hcmtcIl0gfSxcclxuXHRyb2xldHlwZTogeyBzdWI6IFtcInN0cnVjdHVyZVwiLCBcIndpZGdldFwiLCBcIndpbmRvd1wiXSB9LFxyXG5cdC8qKiBAdG9kbyBtb3JlIHN0cmljdCB0ciBzZWxlY3RvciAqL1xyXG5cdHJvdzoge1xyXG5cdFx0c3ViOiBbXCJncm91cFwiLCBcIndpZGdldFwiXSxcclxuXHRcdGNvbnRleHQ6IFtcImdyaWRcIiwgXCJyb3dncm91cFwiLCBcInRhYmxlXCIsIFwidHJlZWdyaWRcIl0sXHJcblx0XHRvd25zOiB7IGFueTogW1wiY2VsbFwiLCBcImNvbHVtbmhlYWRlclwiLCBcInJvd2hlYWRlclwiLCBcImdyaWRjZWxsXCJdIH0sXHJcblx0XHRpbXBsaWNpdDogW1widGFibGUgdHI6bm90KFtyb2xlXSlcIl1cclxuXHR9LFxyXG5cdHJvd2dyb3VwOiB7XHJcblx0XHRjb250ZXh0OiBbXCJncmlkXCIsIFwidGFibGVcIiwgXCJ0cmVlZ3JpZFwiXSxcclxuXHRcdG93bnM6IHsgYW55OiBbXCJyb3dcIl0gfSxcclxuXHRcdGltcGxpY2l0OiBbXCJ0aGVhZDpub3QoW3JvbGVdKVwiLCBcInRib2R5Om5vdChbcm9sZV0pXCIsIFwidGZvb3Q6bm90KFtyb2xlXSlcIl1cclxuXHR9LFxyXG5cdHJvd2hlYWRlcjoge1xyXG5cdFx0c3VwZXI6IFtcImNlbGxcIiwgXCJncmlkY2VsbFwiLCBcInNlY3Rpb25oZWFkXCJdLFxyXG5cdFx0Y29udGV4dDogW1wicm93XCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcInRib2R5IHRoOm5vdChbcm9sZV0pXCJdXHJcblx0fSxcclxuXHRzY3JvbGxiYXI6IHtcclxuXHRcdHN1cGVyOiBbXCJyYW5nZVwiXSxcclxuXHRcdGRlZmF1bHRzOiB7XHJcblx0XHRcdG9yaWVudGF0aW9uOiBcInZlcnRpY2FsXCIsXHJcblx0XHRcdHZhbHVlTWluOiAwLFxyXG5cdFx0XHR2YWx1ZU1heDogMTAwXHJcblx0XHR9XHJcblx0fSxcclxuXHRzZWFyY2g6IHsgc3VwZXI6IFtcImxhbmRtYXJrXCJdIH0sXHJcblx0c2VhcmNoYm94OiB7XHJcblx0XHRzdXBlcjogW1widGV4dGJveFwiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJpbnB1dFt0eXBlPSdzZWFyY2gnXTpub3QoW2xpc3RdKTpub3QoW3JvbGVdKVwiXVxyXG5cdH0sXHJcblx0c2VjdGlvbjoge1xyXG5cdFx0c3VwZXI6IFtcInN0cnVjdHVyZVwiXSxcclxuXHRcdHN1YjogW1wiYWxlcnRcIiwgXCJjZWxsXCIsIFwiZGVmaW5pdGlvblwiLCBcImZpZ3VyZVwiLCBcImdyb3VwXCIsIFwiaW1nXCIsIFwibGFuZG1hcmtcIiwgXCJsaXN0XCIsIFwibGlzdGl0ZW1cIixcclxuXHRcdFx0XCJsb2dcIiwgXCJtYXJxdWVlXCIsIFwibWF0aFwiLCBcIm5vdGVcIiwgXCJzdGF0dXNcIiwgXCJ0YWJsZVwiLCBcInRhYnBhbmVsXCIsIFwidGVybVwiLCBcInRvb2x0aXBcIl1cclxuXHR9LFxyXG5cdHNlY3Rpb25oZWFkOiB7XHJcblx0XHRzdXBlcjogW1wic3RydWN0dXJlXCJdLFxyXG5cdFx0c3ViOiBbXCJjb2x1bW5oZWFkZXJcIiwgXCJoZWFkaW5nXCIsIFwicm93aGVhZGVyXCIsIFwidGFiXCJdXHJcblx0fSxcclxuXHRzZWxlY3Q6IHtcclxuXHRcdHN1cGVyOiBbXCJjb21wb3NpdGVcIiwgXCJncm91cFwiXSxcclxuXHRcdHN1YjogW1wiY29tYm9ib3hcIiwgXCJsaXN0Ym94XCIsIFwibWVudVwiLCBcInJhZGlvZ3JvdXBcIiwgXCJ0cmVlXCJdXHJcblx0fSxcclxuXHQvKiogQHRvZG8gc2VwZXJhdGlvbiBvZiBmb2N1c2FibGUgKi9cclxuXHRzZXBhcmF0b3I6IHtcclxuXHRcdHN1cGVyOiBbXCJzdHJ1Y3R1cmVcIiwgXCJ3aWRnZXRcIl0sXHJcblx0XHRpbXBsaWNpdDogW1wiaHI6bm90KFtyb2xlXSlcIl0sXHJcblx0XHRkZWZhdWx0czoge1xyXG5cdFx0XHRvcmllbnRhdGlvbjogXCJob3Jpem9udGFsXCIsXHJcblx0XHRcdHZhbHVlTWluOiAwLFxyXG5cdFx0XHR2YWx1ZU1heDogMTAwLFxyXG5cdFx0XHR2YWx1ZU5vdzogNTBcclxuXHRcdH1cclxuXHR9LFxyXG5cdHNsaWRlcjoge1xyXG5cdFx0c3VwZXI6IFtcImlucHV0XCIsIFwicmFuZ2VcIl0sXHJcblx0XHRpbXBsaWNpdDogW1wiaW5wdXRbdHlwZT0ncmFuZ2UnXTpub3QoW3JvbGVdKVwiXSxcclxuXHRcdGRlZmF1bHRzOiB7XHJcblx0XHRcdG9yaWVudGF0aW9uOiBcImhvcml6b250YWxcIixcclxuXHRcdFx0dmFsdWVNaW46IDAsXHJcblx0XHRcdHZhbHVlTWF4OiAxMDBcclxuXHRcdH1cclxuXHR9LFxyXG5cdHNwaW5idXR0b246IHtcclxuXHRcdHN1cGVyOiBbXCJjb21wb3NpdGVcIiwgXCJpbnB1dFwiLCBcInJhbmdlXCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcImlucHV0W3R5cGU9J251bWJlciddOm5vdChbcm9sZV0pXCJdLFxyXG5cdFx0ZGVmYXVsdHM6IHtcdHZhbHVlTm93OiAwIH1cclxuXHR9LFxyXG5cdHN0YXR1czoge1xyXG5cdFx0c3VwZXI6IFwic2VjdGlvblwiLFxyXG5cdFx0c3ViOiBbXCJwcm9ncmVzc2JhclwiLCBcInRpbWVyXCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcIm91dHB1dDpub3QoW3JvbGVdKVwiXVxyXG5cdH0sXHJcblx0c3RydWN0dXJlOiB7XHJcblx0XHRzdXBlcjogW1wicm9sZXR5cGVcIl0sXHJcblx0XHRzdWI6IFtcImFwcGxpY2F0aW9uXCIsIFwiZG9jdW1lbnRcIiwgXCJwcmVzZW50YXRpb25cIiwgXCJyb3dncm91cFwiLCBcInNlY3Rpb25cIiwgXCJzZWN0aW9uaGVhZFwiLCBcInNlcGFyYXRvclwiXVxyXG5cdH0sXHJcblx0c3dpdGNoOiB7XHJcblx0XHRzdXBlcjogW1wiY2hlY2tib3hcIl0sXHJcblx0XHRkZWZhdWx0czogeyBjaGVja2VkOiBmYWxzZSB9XHJcblx0fSxcclxuXHR0YWI6IHtcclxuXHRcdHN1cGVyOiBbXCJzZWN0aW9uaGVhZFwiLCBcIndpZGdldFwiXSxcclxuXHRcdGNvbnRleHQ6IFtcInRhYmxpc3RcIl0sXHJcblx0XHRkZWZhdWx0czogeyBzZWxlY3RlZDogZmFsc2UgfVxyXG5cdH0sXHJcblx0dGFibGU6IHtcclxuXHRcdHN1cGVyOiBbXCJzZWN0aW9uXCJdLFxyXG5cdFx0c3ViOiBbXCJncmlkXCJdLFxyXG5cdFx0b3duczogeyBhbnk6IFtcInJvd1wiLCBcInJvd2dyb3VwXCJdfSxcclxuXHRcdGltcGxpY2l0OiBbXCJ0YWJsZTpub3QoW3JvbGVdKVwiXVxyXG5cdH0sXHJcblx0dGFibGlzdDoge1xyXG5cdFx0c3VwZXI6IFtcImNvbXBvc2l0ZVwiXSxcclxuXHRcdG93bnM6IHsgYW55OiBbXCJ0YWJcIl0gfSxcclxuXHRcdGRlZmF1bHRzOiB7IG9yaWVudGF0aW9uOiBcImhvcml6b250YWxcIiB9XHJcblx0fSxcclxuXHR0YWJwYW5lbDogeyBzdXBlcjogW1wic2VjdGlvblwiXSB9LFxyXG5cdHRlcm06IHsgc3VwZXI6IFtcInNlY3Rpb25cIl0gfSxcclxuXHR0ZXh0Ym94OiB7XHJcblx0XHRzdXBlcjogW1wiaW5wdXRcIl0sXHJcblx0XHRzdWI6IFtcInNlYXJjaGJveFwiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJpbnB1dFt0eXBlPSdlbWFpbCddOm5vdChbbGlzdF0pOm5vdChbcm9sZV0pXCIsXHJcblx0XHRcdFwiaW5wdXRbdHlwZT0ndGVsJ106bm90KFtsaXN0XSk6bm90KFtyb2xlXSlcIiwgXCJpbnB1dFt0eXBlPSd0ZXh0J106bm90KFtsaXN0XSk6bm90KFtyb2xlXSlcIixcclxuXHRcdFx0XCJpbnB1dFt0eXBlPSd1cmwnXTpub3QoW2xpc3RdKTpub3QoW3JvbGVdKVwiLCBcInRleHRhcmVhOm5vdChbcm9sZV0pXCJdXHJcblx0fSxcclxuXHR0aW1lcjogeyBzdXBlcjogW1wic3RhdHVzXCJdIH0sXHJcblx0dG9vbGJhcjoge1xyXG5cdFx0c3VwZXI6IFtcImdyb3VwXCJdLFxyXG5cdFx0ZGVmYXVsdHM6IHsgb3JpZW50YXRpb246IFwiaG9yaXpvbnRhbFwiIH1cclxuXHR9LFxyXG5cdHRvb2x0aXA6IHsgc3VwZXI6IFtcInNlY3Rpb25cIl0gfSxcclxuXHR0cmVlOiB7XHJcblx0XHRzdXBlcjogW1wic2VsZWN0XCJdLFxyXG5cdFx0c3ViOiBbXCJ0aHJlZWdyaWRcIl0sXHJcblx0XHRvd25zOiB7IGFueTogW1wiZ3JvdXBcIiwgXCJ0cmVlaXRlbVwiXSB9XHJcblx0fSxcclxuXHR0cmVlZ3JpZDoge1xyXG5cdFx0c3VwZXI6IFtcImdyaWRcIiwgXCJ0cmVlXCJdLFxyXG5cdFx0b3duczogW1wicm93XCIsIFwicm93Z3JvdXBcIl1cclxuXHR9LFxyXG5cdHRyZWVpdGVtOiB7XHJcblx0XHRzdXBlcjogW1wibGlzdGl0ZW1cIiwgXCJvcHRpb25cIl0sXHJcblx0XHRjb250ZXh0OiB7IGFueTogW1wiZ3JvdXBcIiwgXCJ0cmVlXCJdfVxyXG5cdH0sXHJcblx0d2lkZ2V0OiB7XHJcblx0XHRzdXBlcjogW1wicm9sZXR5cGVcIl0sXHJcblx0XHRzdWI6IFtcImNvbW1hbmRcIiwgXCJjb21wb3NpdGVcIiwgXCJncmlkY2VsbFwiLCBcImlucHV0XCIsIFwicmFuZ2VcIiwgXCJyb3dcIiwgXCJzZXBhcmF0b3JcIiwgXCJ0YWJcIl1cclxuXHR9LFxyXG5cdHdpbmRvdzoge1xyXG5cdFx0c3VwZXI6IFtcInJvbGV0eXBlXCJdLFxyXG5cdFx0c3ViOiBbXCJkaWFsb2dcIl1cclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCByb2xlczsiLCJmdW5jdGlvbiBzZXRTZWxlY3Rpb24ocmFuZ2UpIHtcblx0dmFyIHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblx0c2VsZWN0aW9uLnJlbW92ZUFsbFJhbmdlcygpO1xuXHRzZWxlY3Rpb24uYWRkUmFuZ2UocmFuZ2UpO1xufVxuXG4vKipcbiAqIEBtaXhpblxuICovXG5sZXQgU2VsZWN0aW9uID0gKHN1cGVyY2xhc3MpID0+IGNsYXNzIFNlbGVjdGlvbiBleHRlbmRzIHN1cGVyY2xhc3Mge1xuXHQvKipcblx0ICogU2VsZWN0cyBldmVyeXRoaW5nIGluIHRoZSB0ZXh0IGNvbnRyb2wuXG5cdCAqIEBuYW1lIFNlbGVjdGlvbiNzZWxlY3Rcblx0ICovXG5cdHNlbGVjdCgpIHtcblx0XHR0aGlzLnNldFNlbGVjdGlvblJhbmdlKDAsIHRoaXMudmFsdWUubGVuZ3RoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIC8gU2V0cyB0aGUgYmVnaW5uaW5nIGluZGV4IG9mIHRoZSBzZWxlY3RlZCB0ZXh0LiBXaGVuIG5vdGhpbmcgaXMgc2VsZWN0ZWQsXG5cdCAqIHRoaXMgcmV0dXJucyB0aGUgcG9zaXRpb24gb2YgdGhlIHRleHQgaW5wdXQgY3Vyc29yKGNhcmV0KSBpbnNpZGUgb2YgdGhlIDwgaW5wdXQgPiBlbGVtZW50LlxuXHQgKiBcblx0ICogQG5hbWUgU2VsZWN0aW9uI3NlbGVjdGlvblN0YXJ0XG5cdCAqIEB0eXBlIHtOdW1iZXJ9XG5cdCAqL1xuXHRnZXQgc2VsZWN0aW9uU3RhcnQoKSB7XG5cdFx0bGV0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblx0XHRpZiAoc2VsLmFuY2hvck5vZGUgJiYgc2VsLmFuY2hvck5vZGUucGFyZW50Tm9kZSA9PSB0aGlzLmVsZW1lbnQpIHtcblx0XHRcdHJldHVybiBzZWwuYW5jaG9yT2Zmc2V0ID4gc2VsLmZvY3VzT2Zmc2V0ID8gc2VsLmZvY3VzT2Zmc2V0IDogc2VsLmFuY2hvck9mZnNldDtcblx0XHR9XG5cdH1cblx0c2V0IHNlbGVjdGlvblN0YXJ0KHN0YXJ0KSB7XG5cdFx0bGV0IHJhbmdlID0gbmV3IFJhbmdlKCk7XG5cdFx0cmFuZ2Uuc2V0U3RhcnQodGhpcy5lbGVtZW50LmZpcnN0Q2hpbGQsIHN0YXJ0KTtcblx0XHRzZXRTZWxlY3Rpb24ocmFuZ2UpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgLyBTZXRzIHRoZSBlbmQgaW5kZXggb2YgdGhlIHNlbGVjdGVkIHRleHQuIFdoZW4gdGhlcmUncyBubyBzZWxlY3Rpb24sdGhpcyByZXR1cm5zIHRoZVxuXHQgKiBvZmZzZXQgb2YgdGhlIGNoYXJhY3RlciBpbW1lZGlhdGVseSBmb2xsb3dpbmcgdGhlIGN1cnJlbnQgdGV4dCBpbnB1dCBjdXJzb3IgcG9zaXRpb24uXG5cdCAqIFxuXHQgKiBAbmFtZSBTZWxlY3Rpb24jc2VsZWN0aW9uRW5kXG5cdCAqIEB0eXBlIHtOdW1iZXJ9XG5cdCAqL1xuXHRnZXQgc2VsZWN0aW9uRW5kKCkge1xuXHRcdGxldCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG5cdFx0aWYgKHNlbC5mb2N1c05vZGUgJiYgc2VsLmZvY3VzTm9kZS5wYXJlbnROb2RlID09IHRoaXMuZWxlbWVudCkge1xuXHRcdFx0cmV0dXJuIHNlbC5mb2N1c09mZnNldCA+IHNlbC5hbmNob3JPZmZzZXQgPyBzZWwuZm9jdXNPZmZzZXQgOiBzZWwuYW5jaG9yT2Zmc2V0O1xuXHRcdH1cblx0fVxuXHRzZXQgc2VsZWN0aW9uRW5kKGVuZCkge1xuXHRcdGxldCByYW5nZSA9IG5ldyBSYW5nZSgpO1xuXHRcdHJhbmdlLnNldEVuZCh0aGlzLmVsZW1lbnQuZmlyc3RDaGlsZCwgZW5kKTtcblx0XHRzZXRTZWxlY3Rpb24ocmFuZ2UpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgLyBTZXRzIHRoZSBkaXJlY3Rpb24gaW4gd2hpY2ggc2VsZWN0aW9uIG9jY3VycmVkLlxuXHQgKiBcblx0ICogKiBcImZvcndhcmRcIiBpZiBzZWxlY3Rpb24gd2FzIHBlcmZvcm1lZCBpbiB0aGUgc3RhcnQgLSB0byAtIGVuZCBkaXJlY3Rpb24gb2YgdGhlIGN1cnJlbnQgbG9jYWxlLlxuXHQgKiAqIFwiYmFja3dhcmRcIiBmb3IgdGhlIG9wcG9zaXRlIGRpcmVjdGlvbixcblx0ICogKiBcIm5vbmVcIiBpZiB0aGUgZGlyZWN0aW9uIGlzIHVua25vd24uXCJcblx0ICogXG5cdCAqIEBuYW1lIFNlbGVjdGlvbiNzZWxlY3Rpb25EaXJlY3Rpb25cblx0ICogQHRvZG8gaW1wcm92ZSBtZXRob2QgdG8gc2V0IGFuZCBnZXQgZGlyZWN0aW9uXG5cdCAqIEB0eXBlIHsgXCJmb3J3YXJkXCIgfCBcImJhY2t3YXJkXCIgfCBcIm5vbmVcIiB9XG5cdCAqL1xuXHRnZXQgc2VsZWN0aW9uRGlyZWN0aW9uKCkge1xuXHRcdGxldCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG5cdFx0aWYgKHNlbC5mb2N1c05vZGUgJiYgc2VsLmZvY3VzTm9kZS5wYXJlbnROb2RlID09IHRoaXMuZWxlbWVudCkge1xuXHRcdFx0aWYgKHNlbC5mb2N1c09mZnNldCA9PSBzZWwuYW5jaG9yT2Zmc2V0KSB7XG5cdFx0XHRcdHJldHVybiBcIm5vbmVcIjtcblx0XHRcdH0gZWxzZSBpZiAoc2VsLmFuY2hvck9mZnNldCA+IHNlbC5mb2N1c09mZnNldCkge1xuXHRcdFx0XHRyZXR1cm4gXCJiYWNrd2FyZFwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIFwiZm9yd2FyZFwiO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRzZXQgc2VsZWN0aW9uRGlyZWN0aW9uKGRpcmVjdGlvbikge1xuXHRcdGxldCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG5cdFx0aWYgKHNlbC5mb2N1c05vZGUgJiYgc2VsLmZvY3VzTm9kZS5wYXJlbnROb2RlID09IHRoaXMuZWxlbWVudCkge1xuXHRcdFx0aWYgKHNlbC5mb2N1c09mZnNldCA9PSBzZWwuYW5jaG9yT2Zmc2V0KSB7XG5cblx0XHRcdH0gZWxzZSBpZiAoc2VsLmFuY2hvck9mZnNldCA+IHNlbC5mb2N1c09mZnNldCAmJiBkaXJlY3Rpb24gIT0gXCJiYWNrd2FyZFwiKSB7XG5cdFx0XHRcdGxldCByYW5nZSA9IG5ldyBSYW5nZSgpO1xuXHRcdFx0XHRyYW5nZS5zZXRTdGFydCh0aGlzLmVsZW1lbnQuZmlyc3RDaGlsZCwgdGhpcy5zZWxlY3Rpb25FbmQpO1xuXHRcdFx0XHRyYW5nZS5zZXRFbmQodGhpcy5lbGVtZW50LmZpcnN0Q2hpbGQsIHRoaXMuc2VsZWN0aW9uU3RhcnQpO1xuXG5cdFx0XHRcdHNldFNlbGVjdGlvbihyYW5nZSk7XG5cdFx0XHR9IGVsc2UgaWYgKGRpcmVjdGlvbiAhPSBcImZvcndhcmRcIikge1xuXHRcdFx0XHRsZXQgcmFuZ2UgPSBuZXcgUmFuZ2UoKTtcblx0XHRcdFx0cmFuZ2Uuc2V0U3RhcnQodGhpcy5lbGVtZW50LmZpcnN0Q2hpbGQsIHRoaXMuc2VsZWN0aW9uU3RhcnQpO1xuXHRcdFx0XHRyYW5nZS5zZXRFbmQodGhpcy5lbGVtZW50LmZpcnN0Q2hpbGQsIHRoaXMuc2VsZWN0aW9uRW5kKTtcblxuXHRcdFx0XHRzZXRTZWxlY3Rpb24ocmFuZ2UpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBTZWxlY3RzIGEgcmFuZ2Ugb2YgdGV4dCBpbiB0aGUgZWxlbWVudCAoYnV0IGRvZXMgbm90IGZvY3VzIGl0KS5cblx0ICogQG5hbWUgU2VsZWN0aW9uI3NldFNlbGVjdGlvblJhbmdlXG5cdCAqIEBwYXJhbSB7SW50ZWdlcn0gc2VsZWN0aW9uU3RhcnRcblx0ICogQHBhcmFtIHtJbnRlZ2VyfSBzZWxlY3Rpb25FbmRcblx0ICogQHBhcmFtIHsgXCJmb3J3YXJkXCIgfCBcImJhY2t3YXJkXCIgfCBcIm5vbmVcIiB9IFtzZWxlY3Rpb25EaXJlY3Rpb24gPSBcIm5vbmVcIl0gXG5cdCAqIEVzdGFibGlzaCB0aGUgZGlyZWN0aW9uIGluIHdoaWNoIHNlbGVjdGlvbiB3YXMgc2V0XG5cdCAqL1xuXHRzZXRTZWxlY3Rpb25SYW5nZShzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kLCBzZWxlY3Rpb25EaXJlY3Rpb24gPSBcIm5vbmVcIikge1xuXHRcdGxldCBzdGFydCA9IHNlbGVjdGlvbkRpcmVjdGlvbiA9PSBcImJhY2t3YXJkXCIgPyBzZWxlY3Rpb25FbmQgOiBzZWxlY3Rpb25TdGFydDtcblx0XHRsZXQgZW5kID0gc2VsZWN0aW9uRGlyZWN0aW9uID09IFwiYmFja3dhcmRcIiA/IHNlbGVjdGlvblN0YXJ0IDogc2VsZWN0aW9uRW5kO1xuXG5cdFx0bGV0IHJhbmdlID0gbmV3IFJhbmdlKCk7XG5cdFx0cmFuZ2Uuc2V0U3RhcnQodGhpcy5lbGVtZW50LmZpcnN0Q2hpbGQsIHN0YXJ0KTtcblx0XHRyYW5nZS5zZXRFbmQodGhpcy5lbGVtZW50LmZpcnN0Q2hpbGQsIGVuZCk7XG5cblx0XHRzZXRTZWxlY3Rpb24ocmFuZ2UpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlcGxhY2VzIHRoZSByYW5nZSBvZiB0ZXh0IHdpdGggdGhlIG5ldyB0ZXh0LlxuXHQgKiBAbmFtZSBTZWxlY3Rpb24jc2V0UmFuZ2VUZXh0XG5cdCAqIEB0b2RvIEtlZXAgcHJldmlvdXMgc2VsZWN0aW9uIG9uIHBsYWNlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSByZXBsYWNlbWVudCBcblx0ICogQHBhcmFtIHtJbnRlZ2VyfSBbc3RhcnQgPSB7QGxpbmsgVGV4dGJveCNzZWxlY3Rpb25TdGFydH1dXG5cdCAqIEBwYXJhbSB7SW50ZWdlcn0gW2VuZF1cblx0ICogQHBhcmFtIHsgXCJzZWxlY3RcIiB8IFwic3RhcnRcIiB8IFwiZW5kXCIgfCBcInByZXNlcnZlXCIgfSBbc2VsZWN0TW9kZSA9IFwicHJlc2VydmVcIl1cblx0ICovXG5cdHNldFJhbmdlVGV4dChcblx0XHRyZXBsYWNlbWVudCxcblx0XHRzdGFydCA9IHRoaXMuc2VsZWN0aW9uU3RhcnQsXG5cdFx0ZW5kID0gdGhpcy5zZWxlY3Rpb25FbmQsXG5cdFx0c2VsZWN0TW9kZSA9IFwicHJlc2VydmVcIlxuXHQpIHtcblx0XHRsZXQgc2VsZWN0aW9uU3RhcnQgPSB0aGlzLnNlbGVjdGlvblN0YXJ0O1xuXHRcdGxldCBzZWxlY3Rpb25FbmQgPSB0aGlzLnNlbGVjdGlvbkVuZDtcblxuXHRcdGlmIChzdGFydCA+IGVuZCkgeyB0aHJvdyBuZXcgUmFuZ2VFcnJvcigpOyB9XG5cdFx0aWYgKHN0YXJ0ID4gdGhpcy52YWx1ZS5sZW5ndGgpIHsgc3RhcnQgPSB0aGlzLnZhbHVlLmxlbmd0aDsgfVxuXHRcdGlmIChlbmQgPiB0aGlzLnZhbHVlLmxlbmd0aCkgeyBlbmQgPSB0aGlzLnZhbHVlLmxlbmd0aDsgfVxuXHRcdGlmIChzdGFydCA8IGVuZCkge1xuXHRcdFx0Ly8gZGVsZXRlIGNoYXJhY3RlcnMgYmV0d2VlbiBzdGFydCBhbmQgZW5kXG5cdFx0fVxuXG5cdFx0dGhpcy52YWx1ZSA9IHRoaXMudmFsdWUuc2xpY2UoMCwgc3RhcnQpICsgcmVwbGFjZW1lbnQgKyB0aGlzLnZhbHVlLnNsaWNlKGVuZCk7XG5cblx0XHRpZiAoc2VsZWN0TW9kZSA9PSBcInN0YXJ0XCIpIHRoaXMuc2VsZWN0aW9uU3RhcnQgPSAwO1xuXHRcdGlmIChzZWxlY3RNb2RlID09IFwiZW5kXCIpIHRoaXMuc2VsZWN0aW9uU3RhcnQgPSB0aGlzLnZhbHVlLmxlbmd0aDtcblx0XHRpZiAoc2VsZWN0TW9kZSA9PSBcInNlbGVjdFwiKSB0aGlzLnNlbGVjdCgpO1xuXHRcdGlmIChzZWxlY3RNb2RlID09IFwicHJlc2VydmVcIikgdGhpcy5zZXRTZWxlY3Rpb25SYW5nZShzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kKTtcblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0aW9uOyIsImltcG9ydCBWYWxpZGl0eVN0YXRlIFx0ZnJvbSBcIi4vLi4vdXRpbHMvVmFsaWRpdHlTdGF0ZVwiO1xuXG4vKipcbiAqIEBtaXhpblxuICogQGJvcnJvd3MgVmFsaWRpdHlTdGF0ZSBhcyB2YWxpZGl0eVxuICogQGxlbmRzIFZhbGlkYXRpb24jXG4gKi9cbmxldCBWYWxpZGF0aW9uID0gKHN1cGVyY2xhc3MpID0+IGNsYXNzIFZhbGlkYXRpb24gZXh0ZW5kcyBzdXBlcmNsYXNzIFxueyBcblx0Z2V0IHZhbGlkaXR5KCkgeyBcblx0XHRpZighdGhpcy5fdmFsaWRpdHkpIHRoaXMuX3ZhbGlkaXR5ID0gbmV3IFZhbGlkaXR5U3RhdGUodGhpcyk7XG5cblx0XHRyZXR1cm4gdGhpcy5fdmFsaWRpdHk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW50IHdpbGwgYmUgdmFsaWRhdGVkIHdoZW4gdGhlIGZvcm0gaXMgc3VibWl0dGVkOyBmYWxzZSBvdGhlcndpc2UuXG5cdCAqIEB0eXBlIHtCb29sZWFufVxuXHQgKi9cblx0Z2V0IHdpbGxWYWxpZGF0ZSgpIHsgcmV0dXJuICF0aGlzLmhpZGRlbiAmJiAhdGhpcy5yZWFkT25seTsgfVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBlcnJvciBtZXNzYWdlIHRoYXQgd291bGQgYmUgc2hvd24gdG8gdGhlIHVzZXJcblx0ICogaWYgdGhlIGVsZW1lbnQgd2FzIHRvIGJlIGNoZWNrZWQgZm9yIHZhbGlkaXR5LlxuXHQgKiBAbmFtZSBWYWxpZGF0aW9uI3ZhbGlkYXRpb25NZXNzYWdlXG5cdCAqIEB0eXBlIHtTdHJpbmd9XG5cdCAqL1xuXHRnZXQgdmFsaWRhdGlvbk1lc3NhZ2UoKSB7XG5cdFx0aWYodGhpcy52YWxpZGl0eS52YWxpZCkgcmV0dXJuO1xuXHRcdGlmKHRoaXMudmFsaWRpdHkudmFsdWVNaXNzaW5nKSByZXR1cm4gXCJQbGVhc2UgZmlsbCBpbiB0aGlzIGZpZWxkLlwiO1xuXHRcdGlmKHRoaXMudmFsaWRpdHkudHlwZU1pc21hdGNoKSByZXR1cm4gXCJQbGVhc2UgdXNlIHRoZSBjb3JyZWN0IGlucHV0IHR5cGUuXCI7XG5cdFx0XG5cdFx0aWYgKHRoaXMudmFsaWRpdHkudG9vTG9uZykge1xuXHRcdFx0cmV0dXJuIFwiUGxlYXNlIHNob3J0ZW4gdGhpcyB0ZXh0IHRvIDEwIGNoYXJhY3RlcnMgb3IgbGVzcyAoeW91IGFyZSBjdXJyZW50bHkgdXNpbmcgNDggY2hhcmFjdGVycykuXCI7XG5cdFx0fVxuXHRcdGlmKHRoaXMudmFsaWRpdHkudG9vU2hvcnQpIHtcblx0XHRcdHJldHVybiBcIlBsZWFzZSBsZW5ndGhlbiB0aGlzIHRleHQgdG8gMTAgY2hhcmFjdGVycyBvciBtb3JlICh5b3UgYXJlIGN1cnJlbnRseSB1c2luZyAxIGNoYXJhY3RlcikuXCI7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy52YWxpZGl0eS5iYWRJbnB1dCkgcmV0dXJuIFwiUGxlYXNlIGVudGVyIGEgbnVtYmVyLlwiO1xuXHRcdGlmICh0aGlzLnZhbGlkaXR5LnN0ZXBNaXNtYXRjaCkgcmV0dXJuIFwiUGxlYXNlIHNlbGVjdCBhIHZhbGlkIHZhbHVlLlwiO1xuXHRcdGlmICh0aGlzLnZhbGlkaXR5LnJhbmdlT3ZlcmZsb3cpIHJldHVybiBcIlBsZWFzZSBzZWxlY3QgYSBzbWFsbGVyIHZhbHVlLlwiO1xuXHRcdGlmICh0aGlzLnZhbGlkaXR5LnJhbmdlVW5kZXJmbG93KSByZXR1cm4gXCJQbGVhc2Ugc2VsZWN0IGEgbGFyZ2VyIHZhbHVlLlwiO1xuXHRcdGlmKHRoaXMudmFsaWRpdHkucGF0dGVybk1pc21hdGNoKSByZXR1cm4gXCJQbGVhc2UgbWF0Y2ggdGhlIGZvcm1hdCByZXF1ZXN0ZWQuXCI7XG5cdFx0aWYodGhpcy52YWxpZGl0eS5jdXN0b21FcnJvcikgcmV0dXJuIHRoaXMuZXJyb3JtZXNzYWdlLmVsZW1lbnQuaW5uZXJIVE1MO1xuXG5cdFx0Ly8gRmFsbGJhY2sgdmFsdWUgc2hvdWxkIG5ldmVyIGJlZW4gc2hvd25cblx0XHRyZXR1cm4gdGhpcy5lcnJvcm1lc3NhZ2UuZWxlbWVudC5pbm5lckhUTUwgfHwgXCJUaGUgdmFsdWUgeW91IGVudGVyZWQgZm9yIHRoaXMgZmllbGQgaXMgaW52YWxpZC5cIjtcdFx0XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW504oCZcyB2YWx1ZSBoYXMgbm8gdmFsaWRpdHkgcHJvYmxlbXM7IGZhbHNlIG90aGVyd2lzZS5cblx0ICogRmlyZXMgYW4gaW52YWxpZCBldmVudCBhdCB0aGUgZWxlbWVudCBpbiB0aGUgbGF0dGVyIGNhc2UuXG5cdCAqIEBmaXJlcyBpbnZhbGlkXG5cdCAqIEBuYW1lIFZhbGlkYXRpb24jY2hlY2tWYWxpZGl0eVxuXHQgKi9cblx0Y2hlY2tWYWxpZGl0eSgpIHtcblx0XHRpZighdGhpcy52YWxpZGl0eS52YWxpZCkgdGhpcy5kaXNwYXRjaEV2ZW50KFwiaW52YWxpZFwiLCB0aGlzKTtcblx0XHRyZXR1cm4gdGhpcy52YWxpZGl0eS52YWxpZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnTigJlzIHZhbHVlIGhhcyBubyB2YWxpZGl0eSBwcm9ibGVtczsgb3RoZXJ3aXNlLCByZXR1cm5zIGZhbHNlLCBmaXJlcyBhblxuXHQgKiBpbnZhbGlkIGV2ZW50IGF0IHRoZSBlbGVtZW50LCBhbmQoaWYgdGhlIGV2ZW50IGlzbuKAmXQgY2FuY2VsZWQpIHJlcG9ydHMgdGhlIHByb2JsZW0gdG8gdGhlIHVzZXIuXG5cdCAqIEBmaXJlcyBpbnZhbGlkXG5cdCAqIEBuYW1lIFZhbGlkYXRpb24jcmVwb3J0VmFsaWRpdHlcblx0ICovXG5cdHJlcG9ydFZhbGlkaXR5KCkge1xuXHRcdGlmICghdGhpcy52YWxpZGl0eS52YWxpZCkge1xuXHRcdFx0bGV0IGNhbmNlbGxlZCA9ICF0aGlzLmRpc3BhdGNoRXZlbnQoXCJpbnZhbGlkXCIsIHRoaXMpO1xuXHRcdFx0aWYgKCFjYW5jZWxsZWQpIHtcblx0XHRcdFx0dGhpcy5lcnJvcm1lc3NhZ2UuaGlkZGVuID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuZXJyb3JtZXNzYWdlLmhpZGRlbiA9IHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLnZhbGlkaXR5LnZhbGlkO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldHMgYSBjdXN0b20gZXJyb3IsIHNvIHRoYXQgdGhlIGVsZW1lbnQgd291bGQgZmFpbCB0byB2YWxpZGF0ZS5UaGUgZ2l2ZW4gbWVzc2FnZSBpcyB0aGVcblx0ICogbWVzc2FnZSB0byBiZSBzaG93biB0byB0aGUgdXNlciB3aGVuIHJlcG9ydGluZyB0aGUgcHJvYmxlbSB0byB0aGUgdXNlci5cblx0ICogXG5cdCAqIElmIHRoZSBhcmd1bWVudCBpcyB0aGUgZW1wdHkgc3RyaW5nLCBjbGVhcnMgdGhlIGN1c3RvbSBlcnJvci5cblx0ICogXG5cdCAqIEBuYW1lIFZhbGlkYXRpb24jc2V0Q3VzdG9tVmFsaWRpdHlcblx0ICogQHBhcmFtIHs/U3RyaW5nfSBtZXNzYWdlIFxuXHQgKi9cblx0c2V0Q3VzdG9tVmFsaWRpdHkobWVzc2FnZSkge1xuXHRcdC8vIHVwZGF0ZSBWYWxpZHlTdGF0ZSBvYmplY3Rcblx0XHR0aGlzLnZhbGlkaXR5Ll9jdXN0b21FcnJvciA9IG1lc3NhZ2U7XG5cblx0XHRpZihtZXNzYWdlKSB7XHRcdFx0XG5cdFx0XHQvLyB1cGRhdGUgYGFyaWEtaW52YWxpZGAgcHJvcGVydHkgdG8gaW52YWxpZFxuXHRcdFx0dGhpcy5pbnZhbGlkID0gdHJ1ZTtcblx0XHRcdFxuXHRcdFx0Ly8gdXBkYXRlIGVycm9yIG1lc3NhZ2Vcblx0XHRcdHRoaXMuZXJyb3JtZXNzYWdlLmVsZW1lbnQuaW5uZXJIVE1MID0gbWVzc2FnZTtcblx0XHRcdHRoaXMuZXJyb3JtZXNzYWdlLmVsZW1lbnQuaGlkZGVuID0gZmFsc2U7XG5cdFx0fSBlbHNlIHtcdFx0XHRcblx0XHRcdC8vIHVwZGF0ZSBgYXJpYS1pbnZhbGlkYCBwcm9wZXJ0eSB0byBpbnZhbGlkXG5cdFx0XHR0aGlzLmludmFsaWQgPSBmYWxzZTtcblx0XHRcdFxuXHRcdFx0Ly8gdXBkYXRlIGVycm9yIG1lc3NhZ2Vcblx0XHRcdHRoaXMuZXJyb3JtZXNzYWdlLmVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcblx0XHRcdHRoaXMuZXJyb3JtZXNzYWdlLmVsZW1lbnQuaGlkZGVuID0gdHJ1ZTtcblx0XHR9XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFZhbGlkYXRpb247IiwiaW1wb3J0IG1peCBmcm9tIFwiQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW5cIjtcclxuaW1wb3J0IENvbW1hbmQgZnJvbSBcIi4vYWJzdHJhY3QvQ29tbWFuZFwiO1xyXG5pbXBvcnQgYm9vbGVhbiBmcm9tIFwiLi8uLi90eXBlL2Jvb2xlYW5cIjtcclxuXHJcbmltcG9ydCBBcmlhUHJlc3NlZCBmcm9tIFwiLi4vYXR0cmlidXRlcy9hcmlhLXByZXNzZWQuanNcIjtcclxuaW1wb3J0IEFyaWFFeHBhbmRlZCBmcm9tIFwiLi4vYXR0cmlidXRlcy9hcmlhLWV4cGFuZGVkXCI7XHJcblxyXG5mdW5jdGlvbiBjbG9zZSgpIHtcclxuXHR0aGlzLmV4cGFuZGVkID0gYm9vbGVhbi5JU19OT1RfQUNUSVZFO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWdpc3RlckV4cGFuZGVkKGV2KSB7XHJcblx0Y29uc29sZS5sb2coZXYpO1xyXG59XHJcblxyXG4vKipcclxuICogQHN1bW1hcnkgQW4gaW5wdXQgdGhhdCBhbGxvd3MgZm9yIHVzZXItdHJpZ2dlcmVkIGFjdGlvbnMgd2hlbiBjbGlja2VkIG9yIHByZXNzZWQuXHJcbiAqIFxyXG4gKiBAZXh0ZW5kcyBDb21tYW5kXHJcbiAqIEBtaXhlcyBBcmlhRXhwYW5kZWRcclxuICogQG1peGVzIEFyaWFQcmVzc2VkXHJcbiAqL1xyXG5jbGFzcyBCdXR0b24gZXh0ZW5kcyBtaXgoQ29tbWFuZCkud2l0aChBcmlhRXhwYW5kZWQsIEFyaWFQcmVzc2VkKSB7XHJcblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xyXG5cdFx0c3VwZXIoLi4uYXJncyk7XHJcblxyXG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcclxuXHRcdFx0XCJhdHRyaWJ1dGVzXCIsXHJcblx0XHRcdHJlZ2lzdGVyRXhwYW5kZWQsXHJcblx0XHRcdHsgYXR0cmlidXRlOiBcImFyaWEtZXhwYW5kZWRcIiwgb25jZTogdHJ1ZSB9XHJcblx0XHQpO1xyXG5cclxuXHRcdGlmICh0aGlzLmV4cGFuZGVkICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jb250cm9scykgeyAvLyB0b2RvOiBhZGQgd2hlbiBmaXJzdCB0aW1lIGFyaWEtZXhwYW5kZWQgaXMgYm9vbGVhblxyXG5cdFx0XHRjb25zb2xlLmxvZyh0aGlzLmNvbnRyb2xzLmxlbmd0aCk7XHJcblx0XHRcdHRoaXMuY29udHJvbHMuZm9yRWFjaChjb250cm9sID0+IHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhjb250cm9sLmFkZExpc3RlbmVyKTtcclxuXHRcdFx0XHRpZiAoY29udHJvbC5hZGRMaXN0ZW5lcikgY29udHJvbC5hZGRMaXN0ZW5lcihcImNsb3NlXCIsIGNsb3NlLmJpbmQodGhpcykpXHJcblx0XHRcdH1cclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9uRXhwYW5kZWQoZXYpIHtcclxuXHRcdGlmICh0eXBlb2Ygc3VwZXIub25FeHBhbmRlZCA9PSBcImZ1bmN0aW9uXCIpIHN1cGVyLm9uRXhwYW5kZWQoZXYpO1xyXG5cclxuXHRcdGlmICh0aGlzLmRpc2FibGVkICE9PSB0cnVlKSB7XHJcblx0XHRcdGlmICh0aGlzLmV4cGFuZGVkKSB7XHJcblx0XHRcdFx0dGhpcy5jb250cm9scy5mb3JFYWNoKGNvbnRyb2wgPT4ge1xyXG5cdFx0XHRcdFx0Y29udHJvbC5lbGVtZW50LmhpZGRlbiA9IGZhbHNlO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuY29udHJvbHMuZm9yRWFjaChjb250cm9sID0+IHtcclxuXHRcdFx0XHRcdGNvbnRyb2wuZWxlbWVudC5oaWRkZW4gPSB0cnVlO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVx0XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbjsiLCJpbXBvcnQgbWl4IGZyb20gXCJAdmVzdGVyZ2FhcmQtY29tcGFueS9qcy1taXhpblwiO1xuaW1wb3J0IElucHV0IGZyb20gXCIuL2Fic3RyYWN0L0lucHV0XCI7XG5cbmltcG9ydCBBcmlhQ2hlY2tlZCBmcm9tIFwiLi4vYXR0cmlidXRlcy9hcmlhLWNoZWNrZWQuanNcIjtcblxuLyoqXG4gKiBAc3VtbWFyeSBBIGNoZWNrYWJsZSBpbnB1dCB0aGF0IGhhcyB0aHJlZSBwb3NzaWJsZSB2YWx1ZXM6IHRydWUsIGZhbHNlLCBvciBtaXhlZC5cbiAqIEBkZXNjXG4gKiAjIyMjIEV4YW1wbGVcbiAqXG4gKiA8ZGl2IHJvbGU9XCJjaGVja2JveFwiIGFyaWEtY2hlY2tlZD1cInRydWVcIiB0YWJpbmRleD1cIjBcIj48L2Rpdj5cbiAqXG4gKiBgYGBodG1sXG4gKiA8ZGl2IHJvbGU9XCJjaGVja2JveFwiIGFyaWEtY2hlY2tlZD1cInRydWVcIiB0YWJpbmRleD1cIjBcIj48L2Rpdj5cbiAqIGBgYFxuICogQGV4dGVuZHMgSW5wdXQgXG4gKiBAbWl4ZXMgQXJpYUNoZWNrZWRcbiAqL1xuY2xhc3MgQ2hlY2tib3ggZXh0ZW5kcyBtaXgoSW5wdXQpLndpdGgoQXJpYUNoZWNrZWQpIHtcblx0LyoqXG5cdCAqIEBwYXJhbSB7Kn0gYXJnc1xuXHQqL1xuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0c3VwZXIoLi4uYXJncyk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hlY2tib3g7XG4iLCJpbXBvcnQgYm9vbGVhbiBmcm9tIFwiLi8uLi90eXBlL2Jvb2xlYW5cIjtcbmltcG9ydCBTZWxlY3QgZnJvbSBcIi4vYWJzdHJhY3QvU2VsZWN0XCI7XG5pbXBvcnQgc2VsZWN0b3IgZnJvbSBcIi4vLi4vdXRpbHMvc2VsZWN0b3JcIjtcblxuZnVuY3Rpb24gZmlsdGVyKGNiLCB2YWx1ZSkge1xuXHR2YXIgc2VsZWN0ZWRPcHRpb25zID0gW107XG5cblx0Y2Iub3ducy5mb3JFYWNoKGxpc3Rib3ggPT4ge1xuXHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwobGlzdGJveC5lbGVtZW50LmNoaWxkcmVuLCBvcHRpb24gPT4ge1xuXHRcdFx0aWYodmFsdWUgPT09IG51bGwpIHtcblx0XHRcdFx0b3B0aW9uLmhpZGRlbiA9IHRydWU7XG5cdFx0XHR9IGVsc2UgaWYgKG9wdGlvbi5pbm5lckhUTUwuaW5kZXhPZih2YWx1ZSkgPT0gMCkge1xuXHRcdFx0XHRvcHRpb24uaGlkZGVuID0gZmFsc2U7XG5cdFx0XHRcdGlmKG9wdGlvbi5pbm5lckhUTUwgPT09IHZhbHVlKSB7XG5cdFx0XHRcdFx0c2VsZWN0ZWRPcHRpb25zLnB1c2gob3B0aW9uKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b3B0aW9uLmhpZGRlbiA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xuXG5cdHJldHVybiBzZWxlY3RlZE9wdGlvbnM7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZUxpc3Rib3goZXYpIHtcblx0aWYoZXYpIGV2LnByZXZlbnREZWZhdWx0KCk7XG5cblx0aWYgKHRoaXMuZXhwYW5kZWQgPT0gYm9vbGVhbi5JU19BQ1RJVkUpIHtcblx0XHRoaWRlTGlzdGJveC5jYWxsKHRoaXMpO1xuXHR9IGVsc2Uge1xuXHRcdHNob3dMaXN0Ym94LmNhbGwodGhpcyk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlVmFsdWUoZXYpIHtcblx0aWYoZXYpIGV2LnByZXZlbnREZWZhdWx0KCk7XG5cdGNvbnNvbGUubG9nKHRoaXMuXy5jb21ib2JveC5pbnB1dC52YWx1ZSwgZXYudGFyZ2V0LmlubmVySFRNTCwgdGhpcy5fLCBldik7XG5cdHRoaXMuXy5jb21ib2JveC5pbnB1dC52YWx1ZSA9IGV2LnRhcmdldC5pbm5lckhUTUw7XG5cblx0aGlkZUxpc3Rib3guYmluZCh0aGlzKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlTGlzdGJveCgpIHsgXG5cdHZhciBvcHRpb25zID0gZmlsdGVyKHRoaXMsIHRoaXMuXy5jb21ib2JveC5pbnB1dC52YWx1ZSk7XG5cblx0b3B0aW9ucy5mb3JFYWNoKGkgPT4ge1xuXHRcdGkuc2VsZWN0ZWQgPSB0cnVlO1xuXHR9KTtcbn1cbmZ1bmN0aW9uIHNob3dMaXN0Ym94KCkge1xuXHR0aGlzLmV4cGFuZGVkID0gYm9vbGVhbi5JU19BQ1RJVkU7XG5cdHVwZGF0ZUxpc3Rib3guY2FsbCh0aGlzKTtcbn1cbmZ1bmN0aW9uIGhpZGVMaXN0Ym94KCkge1xuXHR0aGlzLmV4cGFuZGVkID0gYm9vbGVhbi5JU19OT1RfQUNUSVZFO1xuXHRmaWx0ZXIodGhpcyk7XG59XG5cbi8qKlxuICogQHN1bW1hcnkgQSBjb21wb3NpdGUgd2lkZ2V0IGNvbnRhaW5pbmcgYSBzaW5nbGUtbGluZSB0ZXh0Ym94IGFuZCBhbm90aGVyIGVsZW1lbnQsIFxuICogc3VjaCBhcyBhIGxpc3Rib3ggb3IgZ3JpZCwgdGhhdCBjYW4gZHluYW1pY2FsbHkgcG9wIHVwIHRvIGhlbHAgdGhlIHVzZXIgc2V0IHRoZSB2YWx1ZSBvZiB0aGUgdGV4dGJveC5cbiAqIEBkZXNjXG4gKiBBIGNvbWJvYm94IGlzIGEgd2lkZ2V0IG1hZGUgdXAgb2YgdGhlIGNvbWJpbmF0aW9uIG9mIHR3byBkaXN0aW5jdCBlbGVtZW50czogXG4gKiBcbiAqIDEuIGEgc2luZ2xlLWxpbmUgdGV4dGJveFxuICogMi4gYW4gYXNzb2NpYXRlZCBwb3AtdXAgZWxlbWVudCBmb3IgaGVscGluZyB1c2VycyBzZXQgdGhlIHZhbHVlIG9mIHRoZSB0ZXh0Ym94LiBcbiAqIFxuICogVGhlIHBvcHVwIG1heSBiZSBhIGxpc3Rib3gsIGdyaWQsIHRyZWUsIG9yIGRpYWxvZy4gTWFueSBpbXBsZW1lbnRhdGlvbnMgYWxzbyBpbmNsdWRlIGEgdGhpcmQgXG4gKiBvcHRpb25hbCBlbGVtZW50IC0tIGEgZ3JhcGhpY2FsIGJ1dHRvbiBhZGphY2VudCB0byB0aGUgdGV4dGJveCwgaW5kaWNhdGluZyB0aGUgYXZhaWxhYmlsaXR5IG9mXG4gKiB0aGUgcG9wdXAuIEFjdGl2YXRpbmcgdGhlIGJ1dHRvbiBkaXNwbGF5cyB0aGUgcG9wdXAgaWYgc3VnZ2VzdGlvbnMgYXJlIGF2YWlsYWJsZS5cbiAqIFxuICogQGV4dGVuZHMgU2VsZWN0XG4gKiBAcGFyYW0ge0VsZW1lbnR9IG9wdGlvbnMuY29tYm9ib3guaW5wdXQgXHREZWZhdWx0cyB0byBmaXJzdCBpbnB1dCBlbGVtZW50IGluc2lkZSB0aGUgZWxlbWVudFxuICogQHBhcmFtIHtFbGVtZW50fSBbb3B0aW9ucy5jb21ib2JveC5vcGVuXVx0XG4gKiBcdE9wdGlvbmFsIGJ1dHRvbiB0byBvcGVuIHRoZSBwb3AtdXAgZWxlbWVudCwgXG4gKiBcdGRlZmF1bHRzIHRvIGZpcnN0IGJ1dHRvbiBlbGVtZW50IGluc2lkZSB0aGUgZWxlbWVudFxuICovXG5jbGFzcyBDb21ib2JveCBleHRlbmRzIFNlbGVjdCB7XG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRzdXBlciguLi5hcmdzKTtcblxuXHRcdC8vIHJlZ2lzdGVyIGN1c3RvbSBlbGVtZW50c1xuXHRcdHRoaXMuXy5yZWdpc3RlckN1c3RvbUVsZW1lbnQoXCJjb21ib2JveC5pbnB1dFwiLCB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvci5nZXREZWVwKFwidGV4dGJveFwiKSkpO1xuXHRcdHRoaXMuXy5yZWdpc3RlckN1c3RvbUVsZW1lbnQoXCJjb21ib2JveC5vcGVuXCIsIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yLmdldERlZXAoXCJidXR0b25cIikpKTtcblx0XHRcblx0XHRpZiAodGhpcy5fLmNvbWJvYm94Lm9wZW4pIHtcblx0XHRcdHRoaXMuXy5jb21ib2JveC5vcGVuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGVMaXN0Ym94LmJpbmQodGhpcykpO1xuXHRcdH1cblx0XHRcblx0XHR0aGlzLl8uY29tYm9ib3guaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIHNob3dMaXN0Ym94LmJpbmQodGhpcykpO1xuXHRcdHRoaXMuXy5jb21ib2JveC5pbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCBoaWRlTGlzdGJveC5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLl8uY29tYm9ib3guaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIHVwZGF0ZUxpc3Rib3guYmluZCh0aGlzKSk7XG5cdFx0Ly8gdGhpcy5vd25zLmZvckVhY2goaSA9PiBpLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHVwZGF0ZVZhbHVlLmJpbmQodGhpcykpKTtcblxuXHRcdGlmKHRoaXMuYXV0b2NvbXBsZXRlID09IFwibGlzdFwiKSB7XG5cdFx0XHQvLyBJbmRpY2F0ZXMgdGhhdCB0aGUgYXV0b2NvbXBsZXRlIGJlaGF2aW9yIG9mIHRoZSB0ZXh0IGlucHV0IGlzIHRvIHN1Z2dlc3QgYSBsaXN0IG9mIHBvc3NpYmxlIHZhbHVlc1xuXHRcdFx0Ly8gaW4gYSBwb3B1cCBhbmQgdGhhdCB0aGUgc3VnZ2VzdGlvbnMgYXJlIHJlbGF0ZWQgdG8gdGhlIHN0cmluZyB0aGF0IGlzIHByZXNlbnQgaW4gdGhlIHRleHRib3guXG5cblx0XHR9IGVsc2UgaWYgKHRoaXMuYXV0b2NvbXBsZXRlID09IFwiYm90aFwiKSB7XG5cdFx0XHQvLyBuZGljYXRlcyB0aGF0IHRoZSBhdXRvY29tcGxldGUgYmVoYXZpb3Igb2YgdGhlIHRleHQgaW5wdXQgaXMgdG8gYm90aCBzaG93IGFuIGlubGluZSBcblx0XHRcdC8vIGNvbXBsZXRpb24gc3RyaW5nIGFuZCBzdWdnZXN0IGEgbGlzdCBvZiBwb3NzaWJsZSB2YWx1ZXMgaW4gYSBwb3B1cCB3aGVyZSB0aGUgc3VnZ2VzdGlvbnMgXG5cdFx0XHQvLyBhcmUgcmVsYXRlZCB0byB0aGUgc3RyaW5nIHRoYXQgaXMgcHJlc2VudCBpbiB0aGUgdGV4dGJveC5cblx0XHR9XG5cblx0XHQvKiogQHRvZG8gZGV0ZXJtaW5lIHdoYXQgdG8gZG8gd2l0aCBkZWZhdWx0IHZhbHVlcyAqL1xuXHRcdGlmKHRoaXMuZXhwYW5kZWQgPT0gdW5kZWZpbmVkKSB0aGlzLmV4cGFuZGVkID0gZmFsc2U7XG5cdFx0aWYgKHRoaXMuaGFzUG9wdXAgPT0gdW5kZWZpbmVkKSB0aGlzLmhhc1BvcHVwID0gXCJsaXN0Ym94XCI7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29tYm9ib3g7IiwiaW1wb3J0IG1peCBmcm9tIFwiQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW5cIjtcclxuaW1wb3J0IFdpbmRvdyBmcm9tIFwiLi9hYnN0cmFjdC9XaW5kb3dcIjtcclxuY29uc3QgTW91c2V0cmFwID0gcmVxdWlyZShcIm1vdXNldHJhcFwiKTtcclxuXHJcbmltcG9ydCBBcmlhRXhwYW5kZWQgZnJvbSBcIi4uL2F0dHJpYnV0ZXMvYXJpYS1leHBhbmRlZC5qc1wiO1xyXG5cclxuZnVuY3Rpb24gZm9jdXMobm9kZSkge1xyXG5cdC8vIGdldCBhbGwgZWxlbWVudHMgd2l0aGluIGdpdmVuIGVsZW1lbnRcclxuXHRsZXQgY2hpbGRyZW4gPSBub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiKlwiKTtcclxuXHRcclxuXHQvLyByZW1vdmUgYWxsIGVsZW1lbnRzIHdobyBhcmVuJ3QgYWNjZXNzaWJsZSBieSBhIHRhYlxyXG5cdGxldCBmb2N1c2FibGVOb2RlcyA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbChjaGlsZHJlbiwgaSA9PiB7XHJcblx0XHRyZXR1cm4gKGkudGFiSW5kZXggPiAtMSB8fCBpLmNvbnRlbnRFZGl0YWJsZSA9PSBcInRydWVcIilcclxuXHRcdFx0JiYgIWkuZGlzYWJsZWQgJiYgaS5vZmZzZXRXaWR0aCA+IDAgJiYgaS5vZmZzZXRIZWlnaHQgPiAwO1xyXG5cdH0pO1xyXG5cdFxyXG5cdC8vIHNvcnQgZWxlbWVudHMgaW4gZGVzY2VuZGluZyBvcmRlclxyXG5cdGZvY3VzYWJsZU5vZGVzLnNvcnQoKGEsIGIpID0+IGEudGFiSW5kZXggKyBiLnRhYkluZGV4KTtcclxuXHJcblx0Ly8gZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKCk7XHJcblx0Ly8gZm9jdXNhYmxlRWwuZm9jdXMoKTtcclxuXHRyZXR1cm4gZm9jdXNhYmxlTm9kZXM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAc3VtbWFyeSBBIGNoaWxkIHdpbmRvdyB3aXRoaW4gYSB3ZWJwYWdlXHJcbiAqXHJcbiAqIEBkZXNjXHJcbiAqICogUHJvbXB0cyB0aGUgdXNlciB0byBwZXJmb3JtIGEgc3BlY2lmaWMgYWN0aW9uXHJcbiAqICogSWYgaXQgaXMgZGVzaWduZWQgdG8gaW50ZXJydXAsIGl0IGlzIHVzdWFsbHkgYSBtb2RhbC4gU2VlIFthbGVydGRpYWxvZ10oKVxyXG4gKiAqIEl0IHNob3VsZCBoYXZlIGEgbGFiZWwsIGl0IGNhbiBiZSBkb25lIHdpdGggdGhlIGBhcmlhLWxhYmVsYCBhdHRyaWJ1dGVcclxuICogKiBJdCBzaG91bGQgaGF2ZSBhdCBsZWFzdCBvbmUgZm9jdXNhYmxlIGRlc2NlbmRhbnQgZWxlbWVudC5cclxuICogKiBJdCBzaG91bGQgZm9jdXMgYW4gZWxlbWVudCBpbiB0aGUgbW9kYWwgd2hlbiBkaXNwbGF5ZWQuXHJcbiAqICogSXQgc2hvdWxkIG1hbmFnZSBmb2N1cyBvZiBtb2RhbCBkaWFsb2dzIChrZWVwIHRoZSBmb2N1cyBpbnNpZGUgdGhlIG9wZW4gbW9kYWwpLlxyXG4gKlxyXG4gKiAjIyMjIyBleGFtcGxlXHJcbiAqXHJcbiAqIDxkaXYgcm9sZT1cImRpYWxvZ1wiIGFyaWEtbGFiZWw9XCJXaW5kb3cgdG8gY29uZmlybSB5b3VyIGFjY2VwdGFuY2Ugb2YgdGhpcyB3b3JsZFwiPlxyXG4gKiAgSGVsbG8gd29ybGQhXHJcbiAqIFx0PGJ1dHRvbiBmb2N1cyB0eXBlPVwiYnV0dG9uXCI+T2s8L2J1dHRvbj5cclxuICogPC9kaXY+XHJcbiAqIEBleHRlbmRzIFdpbmRvd1xyXG4gKi9cclxuY2xhc3MgRGlhbG9nIGV4dGVuZHMgbWl4KFdpbmRvdykud2l0aChBcmlhRXhwYW5kZWQpIHtcclxuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XHJcblx0XHRzdXBlciguLi5hcmdzKTtcclxuXHJcblx0XHQvLyB0aGlzLmVsZW1lbnQub3duZXJEb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgdGhpcy5fb25Gb2N1cy5iaW5kKHRoaXMpLCB0cnVlKTtcclxuXHRcdC8vIHRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIHRoaXMuX29uRm9jdXMuYmluZCh0aGlzKSwgdHJ1ZSk7XHJcblx0XHR0aGlzLmFkZExpc3RlbmVyKFwia2V5XCIsIHRoaXMub25DbG9zZS5iaW5kKHRoaXMpLCB7IGtleTogXCJlc2NcIiwgdGFyZ2V0OiB0aGlzLmVsZW1lbnQub3duZXJEb2N1bWVudH0pO1xyXG5cclxuXHRcdHZhciBuID0gZm9jdXMoZG9jdW1lbnQpO1xyXG5cdFx0dmFyIGkgPSAwO1xyXG5cdFx0Ly8gdmFyIHQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcblx0XHQvLyBcdGNvbnNvbGUubG9nKE1vdXNldHJhcChkb2N1bWVudC5hY3RpdmVFbGVtZW50KS50cmlnZ2VyKFwidGFiXCIpKTtcclxuXHRcdC8vIFx0Ly8gbGV0IGkgPSBuLmluZGV4T2YoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XHJcblx0XHQvLyBcdGlmKGkgPCBuLmxlbmd0aCkge1xyXG5cdFx0Ly8gXHRcdHZhciBmID0gbmV3IEZvY3VzRXZlbnQoXCJmb2N1c1wiKTtcclxuXHRcdC8vIFx0XHRuW2krK10uZGlzcGF0Y2hFdmVudChmKTtcclxuXHRcdC8vIFx0XHQvLyBjb25zb2xlLmxvZyhuW2krK10uZm9jdXMoKSk7XHJcblx0XHQvLyBcdH1cclxuXHRcdC8vIH0sIDEwMDApO1xyXG5cdH1cclxuXHJcblx0X29uRm9jdXMoZXYpIHtcclxuXHRcdC8vIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRsZXQgbiA9IGZvY3VzKHRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50KTtcclxuXHRcdGlmKG5bbi5sZW5ndGgtMV0gIT0gZXYudGFyZ2V0KSB7XHJcblx0XHRcdGV2LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHdpbmRvdy5mb2N1cygpO1xyXG5cdFx0fVxyXG5cdFx0Y29uc29sZS5sb2coZXYpO1xyXG5cdH1cclxuXHJcblx0b25DbG9zZShldikge1xyXG5cdFx0aWYoZXYpIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHR0aGlzLmVsZW1lbnQuaGlkZGVuID0gdHJ1ZTtcclxuXHJcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiY2xvc2VcIikpO1xyXG5cdH1cclxuXHJcblx0X29uSGlkZGVuTXV0YXRpb24oZXYpIHtcclxuXHRcdGlmKHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJoaWRkZW5cIikgPT09IFwidHJ1ZVwiKSB7XHJcblx0XHRcdHZhciBuID0gZm9jdXModGhpcy5lbGVtZW50KTtcclxuXHRcdFx0blswXS5mb2N1cygpO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhuLCBkb2N1bWVudC5hY3RpdmVFbGVtZW50LCBuID09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEaWFsb2c7IiwiaW1wb3J0IExhbmRtYXJrIGZyb20gXCIuL2Fic3RyYWN0L0xhbmRtYXJrXCI7XHJcbmltcG9ydCBzZWxlY3RvciBmcm9tIFwiLi8uLi91dGlscy9zZWxlY3RvclwiO1xyXG5pbXBvcnQgZWxlbWVudHMgZnJvbSBcIi4vLi4vdXRpbHMvZWxlbWVudHNcIjtcclxuaW1wb3J0IGNyZWF0ZSBmcm9tIFwiLi8uLi91dGlscy9jcmVhdGVcIjtcclxuXHJcbmNsYXNzIEZvcm0gZXh0ZW5kcyBMYW5kbWFyayB7XHJcblx0Z2V0IGVsZW1lbnRzKCkge1xyXG5cdFx0Ly8gZ2V0IG5hdGl2ZSBlbGVtZW50c1xyXG5cdFx0dmFyIHNlbGVjdG9yID0gW1wiYnV0dG9uXCIsIFwiZmllbGRzZXRcIiwgXCJpbnB1dFwiLCBcIm9iamVjdFwiLCBcIm91dHB1dFwiLCBcInNlbGVjdFwiLCBcInRleHRhcmVhXCJdLmpvaW4oXCI6bm90KFtyb2xlXSksXCIpO1xyXG5cdFx0dmFyIHJlcyA9IEFycmF5LmZyb20odGhpcy5lbGVtZW50cy5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XHJcblxyXG5cdFx0dmFyIGV4cGxpY2l0Um9sZSA9IFwiXCI7XHJcblx0XHRleHBsaWNpdFJvbGUgKz0gc2VsZWN0b3IuZ2V0RGVlcFJvbGUoXCJidXR0b25cIik7XHJcblx0XHRleHBsaWNpdFJvbGUgKz0gc2VsZWN0b3IuZ2V0RGVlcFJvbGUoXCJpbnB1dFwiKTtcclxuXHRcdGV4cGxpY2l0Um9sZSArPSBzZWxlY3Rvci5nZXREZWVwUm9sZShcInN0YXR1c1wiKTtcclxuXHRcdGV4cGxpY2l0Um9sZSArPSBzZWxlY3Rvci5nZXREZWVwUm9sZShcInNlbGVjdFwiKTtcclxuXHJcblx0XHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaChcclxuXHRcdFx0dGhpcy5lbGVtZW50cy5xdWVyeVNlbGVjdG9yQWxsKGV4cGxpY2l0Um9sZSksIFxyXG5cdFx0XHRub2RlID0+IHJlcy5wdXNoKGVsZW1lbnRzLmdldChub2RlKSB8fCBjcmVhdGUub25lKG5vZGUpKVxyXG5cdFx0KTtcclxuXHRcdGNvbnNvbGUubG9nKHJlcywgZXhwbGljaXRSb2xlLCBzZWxlY3Rvcik7XHJcblx0XHRyZXR1cm4gcmVzO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRm9ybTsiLCJpbXBvcnQgbWl4IGZyb20gXCJAdmVzdGVyZ2FhcmQtY29tcGFueS9qcy1taXhpblwiO1xyXG5pbXBvcnQgQ29tbWFuZCBmcm9tIFwiLi9hYnN0cmFjdC9Db21tYW5kLmpzXCI7XHJcbmltcG9ydCBib29sZWFuIGZyb20gXCIuLy4uL3R5cGUvYm9vbGVhblwiO1xyXG5cclxuaW1wb3J0IEFyaWFFeHBhbmRlZCBmcm9tIFwiLi4vYXR0cmlidXRlcy9hcmlhLWV4cGFuZGVkXCI7XHJcblxyXG5mdW5jdGlvbiBjbG9zZSgpIHtcclxuXHR0aGlzLmV4cGFuZGVkID0gYm9vbGVhbi5JU19OT1RfQUNUSVZFO1xyXG59XHJcblxyXG4vKipcclxuICogQW4gaW50ZXJhY3RpdmUgcmVmZXJlbmNlIHRvIGFuIGludGVybmFsIG9yIGV4dGVybmFsIHJlc291cmNlIHRoYXQsXHJcbiAqIHdoZW4gYWN0aXZhdGVkLCBjYXVzZXMgdGhlIHVzZXIgYWdlbnQgdG8gbmF2aWdhdGUgdG8gdGhhdCByZXNvdXJjZS5cclxuICogXHJcbiAqIEBleHRlbmRzIENvbW1hbmRcclxuICogQG1peGVzIEFyaWFFeHBhbmRlZFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5saW5rLmhyZWYgIFVSTCB0aGF0IHNob3VsZCBiZSB1c2VkXHJcbiAqIEBsaXN0ZW5zIGNsaWNrXHJcbiAqIEBleGFtcGxlXHJcbiAqIDxkaXYgcm9sZT1cImxpbmtcIiBkYXRhLWxpbmstaHJlZj1cImh0dHA6Ly93d3cuZXhhbXBsZS5jb20vXCIgdGFiaW5kZXg9XCIwXCI+XHJcbiAqIFx0T3BlbiB3ZWJzaXRlXHJcbiAqIDwvZGl2PlxyXG4gKi9cclxuY2xhc3MgTGluayBleHRlbmRzIG1peChDb21tYW5kKS53aXRoKEFyaWFFeHBhbmRlZCkge1xyXG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcclxuXHRcdHN1cGVyKC4uLmFyZ3MpO1xyXG5cclxuXHRcdHRoaXMuXy5yZWdpc3RlckN1c3RvbVZhbHVlKFwibGluay5ocmVmXCIpO1xyXG5cclxuXHRcdGlmKHRoaXMuXy5saW5rLmhyZWYpIHtcclxuXHRcdFx0dGhpcy5hZGRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25DbGljay5iaW5kKHRoaXMpKTtcclxuXHRcdFx0dGhpcy5hZGRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKSwgeyBrZXk6IFwiZW50ZXJcIiB9KTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmFkZExpc3RlbmVyKFwiZXhwYW5kZWRcIilcclxuXHJcblx0XHRpZiAodGhpcy5leHBhbmRlZCAhPT0gdW5kZWZpbmVkKSB7IC8vIHRvZG86IGFkZCB3aGVuIGZpcnN0IHRpbWUgYXJpYS1leHBhbmRlZCBpcyBib29sZWFuXHJcblx0XHRcdHRoaXMuY29udHJvbHMuZm9yRWFjaChjb250cm9sID0+IGNvbnRyb2wuYWRkTGlzdGVuZXIoXCJjbG9zZVwiLCBjbG9zZS5iaW5kKHRoaXMpKSk7XHJcblx0XHRcdHRoaXMuYWRkTGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uRXhwYW5kZWQuYmluZCh0aGlzKSk7XHJcblx0XHRcdHRoaXMuYWRkTGlzdGVuZXIoXCJrZXlcIiwgdGhpcy5vbkV4cGFuZGVkLmJpbmQodGhpcyksIHsga2V5OiBcImVudGVyXCIgfSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBGaXJlZCB3aGVuIHN0YXRlIG9mIGV4cGFuZGVkIGlzIGNoYW5nZWQgXHJcblx0ICogQHBhcmFtIHtFdmVudH0gZXYgXHJcblx0ICovXHJcblx0b25FeHBhbmRlZChldikge1xyXG5cdFx0aWYgKHR5cGVvZiBzdXBlci5vbkV4cGFuZGVkID09IFwiZnVuY3Rpb25cIikgc3VwZXIub25FeHBhbmRlZChldik7XHJcblxyXG5cdFx0aWYgKHRoaXMuZGlzYWJsZWQgIT09IHRydWUpIHtcclxuXHRcdFx0aWYgKHRoaXMuZXhwYW5kZWQpIHtcclxuXHRcdFx0XHR0aGlzLmNvbnRyb2xzLmZvckVhY2goY29udHJvbCA9PiB7XHJcblx0XHRcdFx0XHRjb250cm9sLmVsZW1lbnQuaGlkZGVuID0gZmFsc2U7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5jb250cm9scy5mb3JFYWNoKGNvbnRyb2wgPT4ge1xyXG5cdFx0XHRcdFx0Y29udHJvbC5lbGVtZW50LmhpZGRlbiA9IHRydWU7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE9wZW4gdGhlIHVybCB0aGF0IGlzIGRlZmluZWQgaW4gdGhlIG9wdGlvbnMsICBcclxuXHQgKiBmaXJlcyBhbiBjbGljayBldmVudCBvbmx5IGlmIGl0cyBvcmlnaW4gd2Fzbid0IGFuIGNsaWNrIGV2ZW50XHJcblx0ICogQHBhcmFtIHtFdmVudH0gZXYgXHJcblx0ICogQGZpcmVzIGxpbmsjYWNjZXNzaWJsZWNsaWNrXHJcblx0ICogQGZpcmVzIGNsaWNrXHJcblx0ICovXHJcblx0b25DbGljayhldikge1xyXG5cdFx0aWYgKHR5cGVvZiBzdXBlci5vbkNsaWNrID09IFwiZnVuY3Rpb25cIikgc3VwZXIub25DbGljayhldik7XHJcblx0XHJcblx0XHRpZih0aGlzLl8ubGluay5ocmVmKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwic2hvdWxkIG9wZW5cIiwgdGhpcy5fLmxpbmsuaHJlZik7XHJcblx0XHRcdC8vIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy5fLmxpbmsuaHJlZjtcclxuXHRcdH1cclxuXHJcblx0XHQvKipcclxuICAgICAqIEFuIGNsaWNrIHRyaWdnZXJlZCBieSBhbiBrZXlib2FyZCBvciBtb3VzZVxyXG4gICAgICogQGV2ZW50IExpbmsjYWNjZXNzaWJsZWNsaWNrXHJcbiAgICAgKi9cclxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJhY2Nlc3NpYmxlY2xpY2tcIikpO1xyXG5cdFx0aWYoZXYudHlwZSAhPT0gXCJjbGlja1wiKSB7XHJcblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgTW91c2VFdmVudChcImNsaWNrXCIpKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpbms7IiwiaW1wb3J0IGZvY3VzIGZyb20gXCIuLy4uL3V0aWxzL21hbmFnaW5nRm9jdXNcIjtcclxuaW1wb3J0IFNlbGVjdCBmcm9tIFwiLi9hYnN0cmFjdC9TZWxlY3RcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBvcHRpb25zID0ge1xyXG5cdHJvbGU6IFwibGlzdGJveFwiLFxyXG5cdHNlbGVjdG9yOiBcIltyb2xlPSdsaXN0Ym94J11cIixcclxuXHRzZWxlY3RvcnNXaXRoSW1wbGljaXRSb2xlOiBbXHJcblx0XHRcImRhdGFsaXN0XCIsXHJcblx0XHRcInNlbGVjdFttdWx0aXBsZV0sIHNlbGVjdFtzaXplXTpub3QoW3NpemU9JzAnXSk6bm90KFtzaXplPScxJ10pXCJcclxuXHRdXHJcbn07XHJcblxyXG4vLyBmdW5jdGlvbiBjbGlja09uT3B0aW9uKGV2KSB7XHJcbi8vIFx0aWYoZXYpIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4vLyBcdHZhciBjbGlja2VkID0gdGhpcy5vcHRpb25zLmZpbmQoaSA9PiBpLmVsZW1lbnQgPT0gZXYudGFyZ2V0KTtcclxuLy8gXHRpZiAoY2xpY2tlZCkge1xyXG4vLyBcdFx0bGV0IG9sZCA9IGZvY3VzLmdldCh0aGlzLm9wdGlvbnMpO1xyXG4vLyBcdFx0Zm9jdXMucmVtb3ZlKG9sZCk7XHJcbi8vIFx0XHRmb2N1cy5hZGQoY2xpY2tlZCk7XHRcclxuLy8gXHRcdHVwZGF0ZVNlbGVjdGVkKHRoaXMsIGNsaWNrZWQpO1xyXG4vLyBcdH1cclxuLy8gfVxyXG5cclxuLyoqXHJcbiAqIEBzdW1tYXJ5IEEgd2lkZ2V0IHRoYXQgYWxsb3dzIHRoZSB1c2VyIHRvIHNlbGVjdCBvbmUgb3IgbW9yZSBpdGVtcyBmcm9tIGEgbGlzdCBvZiBjaG9pY2VzLlxyXG4gKiBAZGVzY1xyXG4gKiAjIyMgS2V5Ym9hcmQgU3VwcG9ydFxyXG4gKlxyXG4gKiAjIyMjIERlZmF1bHRcclxuICogfCBLZXkgfCBGdW5jdGlvbiB8XHJcbiAqIHwgLS0tIHwgLS0tLS0tLS0gfFxyXG4gKiB8IERvd24gQXJyb3cgfCBNb3ZlcyBmb2N1cyB0byB0aGUgbmV4dCBvcHRpb24gPGJyLz4gSWYgbm90IG11bHRpc2VsZWN0YWJsZSwgaXQgc2VsZWN0cyB0aGUgZm9jdXNlZCBvcHRpb24uXHJcbiAqIHwgVXAgQXJyb3cgXHR8IE1vdmVzIGZvY3VzIHRvIHRoZSBwcmV2aW91cyBvcHRpb24gIDxici8+IElmIG5vdCBtdWx0aXNlbGVjdGFibGUsIGl0IHNlbGVjdHMgdGhlIGZvY3VzZWQgb3B0aW9uLlxyXG4gKiB8IEhvbWUgXHRcdFx0fFx0TW92ZXMgZm9jdXMgdG8gdGhlIGZpcnN0IG9wdGlvbiAgPGJyLz4gSWYgbm90IG11bHRpc2VsZWN0YWJsZSwgaXQgc2VsZWN0cyB0aGUgZm9jdXNlZCBvcHRpb24uXHJcbiAqIHwgRW5kICBcdFx0XHR8XHRNb3ZlcyBmb2N1cyB0byB0aGUgbGFzdCBvcHRpb24gIDxici8+IElmIG5vdCBtdWx0aXNlbGVjdGFibGUsIGl0IHNlbGVjdHMgdGhlIGZvY3VzZWQgb3B0aW9uLlxyXG4gKiBcclxuICogIyMjIyBNdWx0aXBsZSBzZWxlY3Rpb25cclxuICogfCBLZXkgfCBGdW5jdGlvbiB8XHJcbiAqIHwgLS0tIHwgLS0tLS0tLS0gfFxyXG4gKiB8IFNwYWNlXHRcdFx0XHRcdFx0XHRcdFx0fCBDaGFuZ2VzIHRoZSBzZWxlY3Rpb24gc3RhdGUgb2YgdGhlIGZvY3VzZWQgb3B0aW9uLlxyXG4gKiB8IFNoaWZ0ICsgRG93biBBcnJvdyBcdFx0fCBNb3ZlcyBmb2N1cyB0byBhbmQgc2VsZWN0cyB0aGUgbmV4dCBvcHRpb24uXHJcbiAqIHwgU2hpZnQgKyBVcCBBcnJvdyBcdFx0XHR8IE1vdmVzIGZvY3VzIHRvIGFuZCBzZWxlY3RzIHRoZSBwcmV2aW91cyBvcHRpb24uXHJcbiAqIHwgQ29udHJvbCArIFNoaWZ0ICsgSG9tZSB8XHRTZWxlY3RzIGZyb20gdGhlIGZvY3VzZWQgb3B0aW9uIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGxpc3QuXHJcbiAqIHwgQ29udHJvbCArIFNoaWZ0ICsgRW5kICB8IFNlbGVjdHMgZnJvbSB0aGUgZm9jdXNlZCBvcHRpb24gdG8gdGhlIGVuZCBvZiB0aGUgbGlzdC5cclxuICogfCBDb250cm9sICsgQSBcdCAgICAgICAgICB8IFNlbGVjdHMgYWxsIG9wdGlvbnMgaW4gdGhlIGxpc3QuIElmIGFsbCBvcHRpb25zIGFyZSBzZWxlY3RlZCwgdW5zZWxlY3RzIGFsbCBvcHRpb25zLlxyXG4gKiBcclxuICogQGV4dGVuZHMgUm9sZXR5cGVcclxuICogQGZpcmVzIExpc3Rib3gjY2hhbmdlXHJcbiAqIEBmaXJlcyBMaXN0Ym94I2lucHV0XHJcbiAqL1xyXG5jbGFzcyBMaXN0Ym94IGV4dGVuZHMgU2VsZWN0IHtcclxuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XHJcblx0XHRzdXBlciguLi5hcmdzKTtcclxuXHRcdC8vIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xpY2tPbk9wdGlvbi5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHQvLyB0aGlzLmFkZEtleUxpc3RlbmVyKFwiZW50ZXJcIiwgY2xpY2tPbk9wdGlvbi5iaW5kKHRoaXMpKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpc3Rib3g7IiwiaW1wb3J0IGJvb2xlYW4gZnJvbSBcIi4vLi4vdHlwZS9ib29sZWFuXCI7XHJcbmltcG9ydCBnZXRBY3RpdmUgZnJvbSBcIi4vLi4vdXRpbHMvZ2V0QWN0aXZlXCI7XHJcbmltcG9ydCBJbnB1dCBmcm9tIFwiLi9hYnN0cmFjdC9JbnB1dFwiO1xyXG5cclxuLyoqXHJcbiAqIEBleHRlbmRzIElucHV0XHJcbiAqL1xyXG5jbGFzcyBPcHRpb24gZXh0ZW5kcyBJbnB1dCB7XHJcblxyXG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcclxuXHRcdHN1cGVyKC4uLmFyZ3MpO1xyXG5cclxuXHRcdHRoaXMuYWRkTGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKSk7XHJcblx0XHR0aGlzLmFkZExpc3RlbmVyKFwia2V5XCIsIHRoaXMub25DbGljay5iaW5kKHRoaXMpLCB7a2V5OiBcImVudGVyXCIsIHRhcmdldDogZG9jdW1lbnR9KTtcclxuXHRcdHRoaXMuYWRkTGlzdGVuZXIoXCJrZXlcIiwgdGhpcy5vbkNsaWNrLmJpbmQodGhpcyksIHtrZXk6IFwic3BhY2VcIiwgdGFyZ2V0OiBkb2N1bWVudH0pO1xyXG5cdFx0Ly8gdGhpcy5hZGRLZXlMaXN0ZW5lcihcIkVudGVyXCIsIHNlbGVjdEl0ZW0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHRvbkNsaWNrKGV2KSB7XHJcblx0XHRpZih0eXBlb2Ygc3VwZXIub25DbGljayA9PSBcImZ1bmN0aW9uXCIpIHN1cGVyLm9uQ2xpY2soZXYpO1xyXG5cdFx0aWYoZXYpIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0aWYgKHRoaXMgPT0gZ2V0QWN0aXZlKCkpIHtcclxuXHRcdFx0dGhpcy5zZWxlY3RlZCA9IGJvb2xlYW4udG9nZ2xlKHRoaXMuc2VsZWN0ZWQpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgT3B0aW9uOyIsIi8vIHZhciBvYmplY3RQYXRoID0gcmVxdWlyZShcIm9iamVjdC1wYXRoXCIpO1xuaW1wb3J0IFJhbmdlIGZyb20gXCIuL2Fic3RyYWN0L1JhbmdlLmpzXCI7XG5cbmZ1bmN0aW9uIGNhbGNWYWx1ZU9mVHJhY2tQb3MocG9zLCB0cmFjaywgdGh1bWIsIG1pbiwgbWF4LCBzdGVwLCBvcmllbnRhdGlvbikge1xuXHRsZXQgcG9zaXRpb25LZXkgPSBvcmllbnRhdGlvbiA9PSBcInZlcnRpY2FsXCIgPyBcInlcIiA6IFwieFwiO1xuXHRsZXQgcmFuZ2UgPSAobWF4IC0gbWluKSAvIHN0ZXA7XG5cdC8vIHRoZSBmdWxsIHVzYWJsZSBsZW5ndGggb2YgdGhlIHRyYWNrXG5cdGxldCB0cmFja1NpemUgPSBnZXRUcmFja1NpemUodHJhY2ssIHRodW1iLCBvcmllbnRhdGlvbik7XG5cdC8vIGhvdyBtYW55IHBpeGVscyAgc3BhbiBmb3Igb25lIHN0ZXAgY2hhbmdlXG5cdGxldCBweFBlclN0ZXAgPSB0cmFja1NpemUgLyByYW5nZTtcblxuXHQvLyBib3VuZGluZyBib3ggb2YgdGhlIHRyYWNrXG5cdHZhciB0cmFja0Nvb3IgPSB0cmFjay5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0Ly8gb2Zmc2V0IHdpdGhvdXQgdHJhY2sgbGltaXRzXG5cdGxldCBvZmZzZXQgPSBwb3MgLSB0cmFja0Nvb3JbcG9zaXRpb25LZXldIC0gdGh1bWIuY2xpZW50V2lkdGggLyAyO1xuXG5cdC8vIHVwZGF0ZSBvZmZzZXQgdG8gdGhlIHRyYWNrIGxpbWl0cyBpZiBuZWVkZWRcblx0aWYob2Zmc2V0IDwgMCkge1xuXHRcdG9mZnNldCA9IDA7XG5cdH0gZWxzZSBpZihvZmZzZXQgPiB0cmFja1NpemUpe1xuXHRcdG9mZnNldCA9IHRyYWNrU2l6ZTtcblx0fVxuXG5cdC8vIHJvdW5kIHRoZSB2YWx1ZSB0byBuZWFyZXN0IGluY3JlbWVudFxuXHRyZXR1cm4gTWF0aC5yb3VuZChvZmZzZXQgLyBweFBlclN0ZXApICogc3RlcCArIG1pbjtcbn1cblxuZnVuY3Rpb24gZ2V0VHJhY2tTaXplKHRyYWNrLCB0aHVtYiwgb3JpZW50YXRpb24pIHtcblx0aWYob3JpZW50YXRpb24gPT0gXCJ2ZXJ0aWNhbFwiKSB7XG5cdFx0cmV0dXJuIHRyYWNrLmNsaWVudEhlaWdodCAtIHRodW1iLmNsaWVudEhlaWdodDtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gdHJhY2suY2xpZW50V2lkdGggLSB0aHVtYi5jbGllbnRXaWR0aDtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVQb3NpdGlvbih2YWx1ZSwgdHJhY2ssIHRodW1iLCBtaW4sIG1heCwgb3JpZW50YXRpb24pIHtcblx0bGV0IHN0eWxlS2V5ID0gb3JpZW50YXRpb24gPT0gXCJ2ZXJ0aWNhbFwiID8gXCJ0b3BcIiA6IFwibGVmdFwiO1xuXHRsZXQgcmFuZ2UgPSBtYXggLSBtaW47XG5cdGxldCBweFBlclN0ZXAgPSBnZXRUcmFja1NpemUodHJhY2ssIHRodW1iLCBvcmllbnRhdGlvbikgLyByYW5nZTtcblx0dGh1bWIuc3R5bGVbc3R5bGVLZXldID0gcHhQZXJTdGVwICogKHZhbHVlIC0gbWluKSArIFwicHhcIjtcbn1cblxuLyoqXG4gKiBUaGUgc2xpZGVyIGVsZW1lbnQgbGV0IHRoZSB1c2VyIHNwZWNpZnkgYSBudW1lcmljIHZhbHVlIHdoaWNoIG11c3QgYmUgbm8gbGVzc1xuICogdGhhbiBhIGdpdmVuIHZhbHVlLCBhbmQgbm8gbW9yZSB0aGFuIGFub3RoZXIgZ2l2ZW4gdmFsdWUuIFxuICogXG4gKiBUaGUgcHJlY2lzZSB2YWx1ZSxob3dldmVyLCBpcyBub3QgY29uc2lkZXJlZCBpbXBvcnRhbnQuIFRoaXMgaXMgdHlwaWNhbGx5IHJlcHJlc2VudGVkIHVzaW5nIGEgc2xpZGVyIG9yXG4gKiBkaWFsIGNvbnRyb2wgcmF0aGVyIHRoYW4gYSB0ZXh0IGVudHJ5IGJveCBsaWtlIHRoZSBcIm51bWJlclwiIGlucHV0IHR5cGUuIEJlY2F1c2UgdGhpcyBraW5kIG9mIHdpZGdldFxuICogaXMgaW1wcmVjaXNlLCBpdCBzaG91bGRuJ3QgdHlwaWNhbGx5IGJlIHVzZWQgdW5sZXNzIHRoZSBjb250cm9sJ3MgZXhhY3QgdmFsdWUgaXNuJ3QgaW1wb3J0YW50LlxuICpcbiAqICMjIyBFeGFtcGxlc1xuICpcbiAqICMjIyMgQmFzaWMgZXhhbXBsZVxuICogXG4gKiA8ZGl2IGNsYXNzPVwic2xpZGVyLXRyYWNrXCI+XG4gKiAgIDxkaXYgcm9sZT1cInNsaWRlclwiICB0YWJpbmRleD1cIjBcIj48L2Rpdj5cbiAqIDwvZGl2PlxuICogXG4gKiBgYGBodG1sXG4gKiA8ZGl2IGNsYXNzPVwic2xpZGVyLXRyYWNrXCI+XG4gKiAgIDxkaXYgcm9sZT1cInNsaWRlclwiICB0YWJpbmRleD1cIjBcIj48L2Rpdj5cbiAqIDwvZGl2PlxuICogYGBgXG4gKiBcbiAqICMjIyMgQXMgYW4gYnV0dG9uIHdpdGggYSBzcGVjaWZpZWQgc3RlcCBhbmQgcmFuZ2VcbiAqXG4gKiA8ZGl2IGNsYXNzPVwic2xpZGVyLXRyYWNrXCI+XG4gKiAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHJvbGU9XCJzbGlkZXJcIlxuICogXHRcdGFyaWEtdmFsdWVtaW49XCIzMFwiIGFyaWEtdmFsdWVtYXg9XCIzMDBcIiBhcmlhLXZhbHVlbm93PVwiNTBcIiBkYXRhLXN0ZXA9XCIxMFwiPjwvYnV0dG9uPlxuICogPC9kaXY+XG4gKlxuICogYGBgaHRtbFxuICogPGRpdiBjbGFzcz1cInNsaWRlci10cmFja1wiPlxuICogICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiByb2xlPVwic2xpZGVyXCJcbiAqIFx0XHRhcmlhLXZhbHVlbWluPVwiMzBcIiBhcmlhLXZhbHVlbWF4PVwiMzAwXCIgYXJpYS12YWx1ZW5vdz1cIjUwXCIgZGF0YS1zdGVwPVwiMTBcIj48L2J1dHRvbj5cbiAqIDwvZGl2PlxuICogYGBgXG4gKiBcbiAqICMjIyMgVmVydGljYWxcbiAqIFxuICogPGRpdiBjbGFzcz1cInNsaWRlci10cmFjayB2ZXJ0aWNhbFwiPlxuICogICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiByb2xlPVwic2xpZGVyXCIgYXJpYS1vcmllbnRhdGlvbj1cInZlcnRpY2FsXCI+PC9idXR0b24+XG4gKiA8L2Rpdj5cbiAqIFxuICogYGBgaHRtbFxuICogPGRpdiBjbGFzcz1cInNsaWRlci10cmFjayB2ZXJ0aWNhbFwiPlxuICogICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiByb2xlPVwic2xpZGVyXCIgYXJpYS1vcmllbnRhdGlvbj1cInZlcnRpY2FsXCI+PC9idXR0b24+XG4gKiA8L2Rpdj5cbiAqIGBgYFxuICogXG4gKiAjIyMjIERpc2FibGVkXG4gKiBcbiAqIDxkaXYgY2xhc3M9XCJzbGlkZXItdHJhY2tcIj5cbiAqICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgcm9sZT1cInNsaWRlclwiIGFyaWEtZGlzYWJsZWQ9XCJ0cnVlXCI+PC9idXR0b24+XG4gKiA8L2Rpdj5cbiAqIFxuICogYGBgaHRtbFxuICogPGRpdiBjbGFzcz1cInNsaWRlci10cmFja1wiPlxuICogICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiByb2xlPVwic2xpZGVyXCIgYXJpYS1kaXNhYmxlZD1cInRydWVcIj48L2J1dHRvbj5cbiAqIDwvZGl2PlxuICogYGBgXG4gKiBcbiAqIFxuICogQHN1bW1hcnkgQSB1c2VyIGlucHV0IHdoZXJlIHRoZSB1c2VyIHNlbGVjdHMgYSB2YWx1ZSBmcm9tIHdpdGhpbiBhIGdpdmVuIHJhbmdlLlxuICogQGV4dGVuZHMgUmFuZ2VcbiAqXG4gKiBAZmlyZXMgY2hhbmdlXG4gKiBAZmlyZXMgaW5wdXRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFx0XHRcdFx0ZWxlbWVudCB0byBkZXJpdmUgaW5mb3JtYXRpb24gbmFtZUZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gXHRcdFx0XHRcdFx0b3B0aW9uYWwgb3B0aW9uc1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW29wdGlvbnMuc2xpZGVyLnRyYWNrXVxuICogXHRUaGUgZWxlbWVudCB0aGF0IHJlc2VtYmxlcyB0aGUgdHJhY2ssIGRlZmF1bHRzIHRvIHRoZSBlbGVtZW50cyBwYXJlbnRcbiAqIEBwYXJhbSB7TnVtYmVyfFwiYW55XCJ9IFtvcHRpb25zLnN0ZXBdIFx0aW5jcmVhc2UvZGVjcmVhc2UgYW1vdW50XG4gKiBAcmV0dXJuIHtTbGlkZXJ9IHRoaXNBcmdcbiAqXG4gKiBAdG9kbyBhZGQgc3VwcG9ydCBmb3IgXCJhbnlcIlxuICogQHRvZG8gYWRkIGV2ZW50c1xuICovXG5jbGFzcyBTbGlkZXIgZXh0ZW5kcyBSYW5nZSB7XG5cdC8qKlxuXHQgKiBAcGFyYW0geyp9IGFyZ3MgXG5cdCAqL1xuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0c3VwZXIoLi4uYXJncyk7XG5cblx0XHQvLyByZWdpc3RlciBjdXN0b21zXG5cdFx0dGhpcy5fLnJlZ2lzdGVyQ3VzdG9tRWxlbWVudChcInNsaWRlci50cmFja1wiLCB0aGlzLmVsZW1lbnQucGFyZW50Tm9kZSk7XG5cblx0XHQvLyBzZXQgZGVmYXVsdHNcblx0XHRpZih1bmRlZmluZWQgPT0gdGhpcy5vcmllbnRhdGlvbikgdGhpcy5vcmllbnRhdGlvbiA9IFwiaG9yaXpvbnRhbFwiO1xuXHRcdGlmKHVuZGVmaW5lZCA9PSB0aGlzLnZhbHVlTWluKSB7XG5cdFx0XHQvKipcblx0XHRcdCAqIEBkZWZhdWx0IFswXVxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnZhbHVlTWluID0gMDtcblx0XHR9XG5cdFx0aWYodW5kZWZpbmVkID09IHRoaXMudmFsdWVNYXgpIHRoaXMudmFsdWVNYXggPSAxMDA7XG5cdFx0aWYodW5kZWZpbmVkID09IHRoaXMudmFsdWVOb3cgJiYgdGhpcy52YWx1ZU1heCA8IHRoaXMudmFsdWVNaW4pIHtcblx0XHRcdHRoaXMudmFsdWVOb3cgPSB0aGlzLnZhbHVlTWluO1xuXHRcdH0gZWxzZSBpZih1bmRlZmluZWQgPT0gdGhpcy52YWx1ZU5vdykge1xuXHRcdFx0dGhpcy52YWx1ZU5vdyA9IHRoaXMudmFsdWVNaW4gKyAodGhpcy52YWx1ZU1heCAtIHRoaXMudmFsdWVNaW4pLzI7XG5cdFx0fVxuXG5cdFx0dGhpcy5fdW5UcmFja01vdXNlQmluZGVkID0gdGhpcy5fdW5UcmFja01vdXNlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5fdW5UcmFja1RvdWNoQmluZGVkID0gdGhpcy5fdW5UcmFja1RvdWNoLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5fb25EcmFnID0gdGhpcy5vbkRyYWcuYmluZCh0aGlzKTtcblxuXHRcdC8vIHRvZG86IGFsbG93IGF1dG9tYXRpY2FsbHkgc2V0dGluZyB2YWx1ZVRleHQgd2l0aCBzb21lIHN1Z2FyXG5cblx0XHR0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLl9vbk1vdXNlRG93bi5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy5fb25Ub3VjaFN0YXJ0LmJpbmQodGhpcykpO1xuXHRcdHRoaXMuXy5zbGlkZXIudHJhY2suYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25UcmFja0NsaWNrLmJpbmQodGhpcykpO1xuXHRcdHRoaXMuYWRkS2V5TGlzdGVuZXIoXCJyaWdodFwiLCB0aGlzLnN0ZXBVcC5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLmFkZEtleUxpc3RlbmVyKFwidXBcIiwgdGhpcy5zdGVwVXAuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5hZGRLZXlMaXN0ZW5lcihcImxlZnRcIiwgdGhpcy5zdGVwRG93bi5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLmFkZEtleUxpc3RlbmVyKFwiZG93blwiLCB0aGlzLnN0ZXBEb3duLmJpbmQodGhpcykpO1xuXG5cdFx0dXBkYXRlUG9zaXRpb24odGhpcy52YWx1ZU5vdywgdGhpcy5fLnNsaWRlci50cmFjaywgdGhpcy5lbGVtZW50LCB0aGlzLnZhbHVlTWluLCB0aGlzLnZhbHVlTWF4LCB0aGlzLm9yaWVudGF0aW9uKTtcblx0fVxuXG5cdF9vbk1vdXNlRG93bigpIHtcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMuX29uRHJhZyk7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5fdW5UcmFja01vdXNlQmluZGVkKTtcblx0fVxuXHRfb25Ub3VjaFN0YXJ0KCkge1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgdGhpcy5fb25EcmFnKTtcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgdGhpcy5fdW5UcmFja1RvdWNoQmluZGVkKTtcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hjYW5jZWxcIiwgdGhpcy5fdW5UcmFja1RvdWNoQmluZGVkKTtcblx0fVxuXHRfdW5UcmFja01vdXNlKCkge1xuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5fb25EcmFnKTtcblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl91blRyYWNrTW91c2VCaW5kZWQpO1xuXHR9XG5cdF91blRyYWNrVG91Y2goKSB7XG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCB0aGlzLl9vbkRyYWcpO1xuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCB0aGlzLl91blRyYWNrTW91c2UpO1xuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGNhbmNlbFwiLCB0aGlzLl91blRyYWNrTW91c2VCaW5kZWQpO1xuXHR9XG5cblx0b25EcmFnKGV2KSB7XG5cdFx0ZXYucHJldmVudERlZmF1bHQoKTtcblx0XHRsZXQgcG9zO1xuXHRcdGxldCBwb3NpdGlvbktleSA9IHRoaXMub3JpZW50YXRpb24gPT0gXCJ2ZXJ0aWNhbFwiID8gXCJjbGllbnRZXCIgOiBcImNsaWVudFhcIjtcblx0XHRpZihldi5jaGFuZ2VkVG91Y2hlcykge1xuXHRcdFx0cG9zID0gZXYuY2hhbmdlZFRvdWNoZXNbMF1bcG9zaXRpb25LZXldO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwb3MgPSBldltwb3NpdGlvbktleV07XG5cdFx0fVxuXHRcdHRoaXMudmFsdWVOb3cgPSBjYWxjVmFsdWVPZlRyYWNrUG9zKFxuXHRcdFx0cG9zLCB0aGlzLl8uc2xpZGVyLnRyYWNrLCB0aGlzLmVsZW1lbnQsXG5cdFx0XHR0aGlzLnZhbHVlTWluLCB0aGlzLnZhbHVlTWF4LCB0aGlzLl8uc3RlcCwgdGhpcy5vcmllbnRhdGlvblxuXHRcdCk7XG5cdH1cblxuXHRvblRyYWNrQ2xpY2soZXYpIHtcblx0XHR0aGlzLm9uRHJhZyhldik7XG5cdH1cblxuXHRnZXQgdmFsdWVOb3coKSB7IHJldHVybiBzdXBlci52YWx1ZU5vdzsgfVxuXHRzZXQgdmFsdWVOb3codmFsKSB7XG5cdFx0aWYoIXRoaXMuZGlzYWJsZWQpIHtcblx0XHRcdHN1cGVyLnZhbHVlTm93ID0gdmFsO1xuXHRcdFx0dXBkYXRlUG9zaXRpb24odmFsLCB0aGlzLl8uc2xpZGVyLnRyYWNrLCB0aGlzLmVsZW1lbnQsIHRoaXMudmFsdWVNaW4sIHRoaXMudmFsdWVNYXgsIHRoaXMub3JpZW50YXRpb24pO1xuXHRcdH1cblx0fVxuXG5cdC8qIE5hdGl2ZSBwb2x5ZmlsbCAqL1xuXG5cdC8vIGF1dG9tYXRpYyBwb2x5ZmlsbGVkIGJ5IGF0dHJpYnV0ZXNcblx0Ly8gYXV0b2NvbXBsZXRlXG5cdC8vIGxpc3Rcblx0Ly8gbWluXG5cdC8vIG1heFxuXHQvLyBzdGVwID0+IGRhdGEtc3RlcFxuXHQvLyB2YWx1ZVxuXHQvLyB2YWx1ZUFzTnVtYmVyXG5cdC8vIHN0ZXBEb3duXG5cdC8vIHN0ZXBVcFxufVxuXG5leHBvcnQgZGVmYXVsdCBTbGlkZXI7IiwiaW1wb3J0IG1peCBmcm9tIFwiQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW5cIjtcclxuaW1wb3J0IFJhbmdlIGZyb20gXCIuL2Fic3RyYWN0L1JhbmdlXCI7XHJcblxyXG5leHBvcnQgY29uc3Qgb3B0aW9ucyA9IHtcclxuXHRzZWxlY3RvcjogXCJbcm9sZT0nc3BpbmJ1dHRvbiddXCIsXHJcblx0cm9sZTogXCJzcGluYnV0dG9uXCJcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBIGlucHV0IGZpZWxkIHdpdGggMiBidXR0b24gdG8gaW5jcmVhc2Ugb3IgZGVjcmVhc2UgdGhlIG51bWJlcmljYWwgdmFsdWVcclxuICogQGV4dGVuZHMgUmFuZ2VcclxuICpcclxuICogQHNlZSB7QGxpbmsgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvaW5wdXQuaHRtbCNudW1iZXItc3RhdGUtKHR5cGU9bnVtYmVyKX1cclxuICovXHJcbmNsYXNzIFNwaW5idXR0b24gZXh0ZW5kcyBSYW5nZSB7XHJcblx0Y29uc3RydWN0b3IoZWwsIG9wdGlvbnMpIHtcclxuXHRcdHN1cGVyKGVsLCBvcHRpb25zKTtcclxuXHJcblx0XHQvLyByZWdpc3RlciBjdXN0b20gZWxlbWVudHNcclxuXHRcdC8qKlxyXG5cdFx0KiBAbmFtZSBTcGluYnV0dG9uI19cclxuXHRcdCogQHR5cGUge09iamVjdH1cclxuXHRcdCogQHByb3Age0hUTUxFbGVtZW50fSBbc3BpbmJ1dHRvbi51cF1cclxuXHRcdCogQHByb3Age0hUTUxFbGVtZW50fSBbc3BpbmJ1dHRvbi5kb3duXVxyXG5cdFx0Ki9cclxuXHRcdHRoaXMuXy5yZWdpc3RlckN1c3RvbUVsZW1lbnQoXCJzcGluYnV0dG9uLnVwXCIpO1xyXG5cdFx0dGhpcy5fLnJlZ2lzdGVyQ3VzdG9tRWxlbWVudChcInNwaW5idXR0b24uZG93blwiKTtcclxuXHRcdHRoaXMuXy5yZWdpc3RlckN1c3RvbVZhbHVlKFwic3RlcFwiLCAxKTtcclxuXHJcblx0XHQvLyBzZXQgZGVmYXVsdHNcclxuXHRcdC8qKlxyXG5cdFx0KiBAbmFtZSBTcGluYnV0dG9uI3ZhbHVlTm93XHJcblx0XHQqIEB0eXBlIHtOdW1iZXJ9XHJcblx0XHQqIEBkZWZhdWx0IFswXVxyXG5cdFx0Ki9cclxuXHRcdGlmKG51bGwgPT09IHRoaXMudmFsdWVOb3cpIHRoaXMudmFsdWVOb3cgPSAwO1xyXG5cclxuXHRcdC8vIHRvZG86IGFsbG93IGF1dG9tYXRpY2FsbHkgc2V0dGluZyB2YWx1ZVRleHQgd2l0aCBzb21lIHN1Z2FyXHJcblxyXG5cdFx0aWYgKHRoaXMuXy5zcGluYnV0dG9uLmRvd24pIHRoaXMuXy5zcGluYnV0dG9uLnVwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnN0ZXBVcC5iaW5kKHRoaXMpKTtcclxuXHRcdGlmICh0aGlzLl8uc3BpbmJ1dHRvbi5kb3duKSB0aGlzLl8uc3BpbmJ1dHRvbi5kb3duLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnN0ZXBEb3duLmJpbmQodGhpcykpO1xyXG5cdFx0dGhpcy5hZGRLZXlMaXN0ZW5lcihcInVwXCIsIHRoaXMuc3RlcFVwLmJpbmQodGhpcykpO1xyXG5cdFx0dGhpcy5hZGRLZXlMaXN0ZW5lcihcImRvd25cIiwgdGhpcy5zdGVwRG93bi5iaW5kKHRoaXMpKTtcclxuXHRcdHRoaXMuZWxlbWVudC52YWx1ZSA9IHRoaXMudmFsdWVOb3c7XHJcblx0fVxyXG5cclxuXHRnZXQgdmFsdWVOb3coKSB7IHJldHVybiBzdXBlci52YWx1ZU5vdzsgfVxyXG5cdHNldCB2YWx1ZU5vdyh2YWwpIHtcclxuXHRcdHN1cGVyLnZhbHVlTm93ID0gdmFsO1xyXG5cdFx0dGhpcy5lbGVtZW50LnZhbHVlID0gdmFsO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3BpbmJ1dHRvbjsiLCJpbXBvcnQgQ2hlY2tib3ggZnJvbSBcIi4vQ2hlY2tib3hcIjtcblxuLyoqXG4gKiBBIHR5cGUgb2YgY2hlY2tib3ggdGhhdCByZXByZXNlbnRzIG9uL29mZiB2YWx1ZXMsIGFzIG9wcG9zZWQgdG8gY2hlY2tlZC91bmNoZWNrZWQgdmFsdWVzLlxuICogQGV4dGVuZHMgQ2hlY2tib3ggXG4gKi9cbmNsYXNzIFN3aXRjaCBleHRlbmRzIENoZWNrYm94IHtcblx0LyoqXG5cdCAqICMjIyMgRXhhbXBsZVxuXHQgKiBcblx0ICogKipEZWZhdWx0Kipcblx0ICogXG5cdCAqIDxkaXYgcm9sZT1cInN3aXRjaFwiIHRhYmluZGV4PVwiMFwiPjwvZGl2PlxuXHQgKiBcblx0ICogYGBgaHRtbFxuXHQgKiA8ZGl2IHJvbGU9XCJzd2l0Y2hcIiB0YWJpbmRleD1cIjBcIj48L2Rpdj5cblx0ICogYGBgXG5cdCAqIFxuXHQgKiAqKldpdGggcHJlZGVmaW5lZCB2YWx1ZSoqXG5cdCAqIFxuXHQgKiA8ZGl2IHJvbGU9XCJzd2l0Y2hcIiBhcmlhLWNoZWNrZWQ9XCJ0cnVlXCIgdGFiaW5kZXg9XCIwXCI+PC9kaXY+XG5cdCAqIFxuXHQgKiBgYGBodG1sXG5cdCAqIDxkaXYgcm9sZT1cInN3aXRjaFwiIGFyaWEtY2hlY2tlZD1cInRydWVcIiB0YWJpbmRleD1cIjBcIj48L2Rpdj5cblx0ICogYGBgXG5cdCAqIEBwYXJhbSB7Kn0gYXJnc1xuXHQqL1xuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0c3VwZXIoLi4uYXJncyk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3dpdGNoO1xuIiwiaW1wb3J0IG1peCBmcm9tIFwiQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW5cIjtcblxuaW1wb3J0IGVsZW1lbnRzIGZyb20gXCIuLy4uL3V0aWxzL2VsZW1lbnRzXCI7XG5pbXBvcnQgc2VsZWN0b3IgZnJvbSBcIi4vLi4vdXRpbHMvc2VsZWN0b3JcIjtcbmltcG9ydCByb2xlcyBmcm9tIFwiLi8uLi9kYXRhL3JvbGVzXCI7XG5cbmltcG9ydCBSb2xldHlwZSBmcm9tIFwiLi9hYnN0cmFjdC9Sb2xldHlwZVwiO1xuXG5pbXBvcnQgQXJpYVNlbGVjdGVkIGZyb20gXCIuLy4uL2F0dHJpYnV0ZXMvYXJpYS1zZWxlY3RlZFwiO1xuXG5jbGFzcyBUYWIgZXh0ZW5kcyBtaXgoUm9sZXR5cGUpLndpdGgoQXJpYVNlbGVjdGVkKSB7XG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRzdXBlciguLi5hcmdzKTtcblx0fVxuXG5cdG9uU2VsZWN0KGV2KSB7XG5cdFx0Ly8gZ2V0cyB0aGUgc2VsZWN0b3IgZm9yIGZpbmRpbmcgaXQncyBjb250ZXh0IGVsZW1lbnQgKHRhYmxpc3QgPiB0YWIpIFxuXHRcdHZhciBjb250ZXh0U2VsZWN0b3IgPSByb2xlcy50YWIuY29udGV4dC5tYXAoc3RyID0+IHNlbGVjdG9yLmdldFJvbGUoc3RyKSkuam9pbihcIiwgXCIpO1xuXHRcdGxldCB0YWJsaXN0ID0gZWxlbWVudHMuZ2V0UGFyZW50KHRoaXMsIGNvbnRleHRTZWxlY3Rvcik7XG5cdFx0aWYoIXRhYmxpc3QpIHJldHVybiBmYWxzZTtcblx0XHRcblx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFxuXHRcdGxldCB0YWJzID0gdGFibGlzdC5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwob3B0aW9ucy5zZWxlY3RvciArIFwiW2FyaWEtc2VsZWN0ZWQ9J3RydWUnXVwiKTtcblx0XHRbXS5mb3JFYWNoLmNhbGwodGFicywgKGl0ZW0pID0+IHtcblx0XHRcdGxldCBpbnN0ID0gZWxlbWVudHMuZ2V0KGl0ZW0pO1xuXHRcdFx0aW5zdC5zZWxlY3RlZCA9IGZhbHNlO1xuXHRcdFx0aW5zdC5jb250cm9sc1swXS5lbGVtZW50LmhpZGRlbiA9IHRydWU7XG5cdFx0fSk7XG5cblx0XHRpZiAodHlwZW9mIHN1cGVyLm9uU2VsZWN0ID09IFwiZnVuY3Rpb25cIikgc3VwZXIub25TZWxlY3QoZXYpO1xuXHRcdFxuXHRcdHRoaXMuY29udHJvbHNbMF0uZWxlbWVudC5oaWRkZW4gPSBmYWxzZTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBUYWI7IiwiaW1wb3J0IGVsZW1lbnRzIGZyb20gXCIuLy4uL3V0aWxzL2VsZW1lbnRzLmpzXCI7XHJcbmltcG9ydCBDb21wb3NpdGUgZnJvbSBcIi4vYWJzdHJhY3QvQ29tcG9zaXRlXCI7XHJcblxyXG5jbGFzcyBUYWJsaXN0IGV4dGVuZHMgQ29tcG9zaXRlIHtcclxuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XHJcblx0XHRzdXBlciguLi5hcmdzKTtcclxuXHJcblx0XHR0aGlzLmFkZEtleUxpc3RlbmVyKFwibGVmdFwiLCB0aGlzLm1vdmVUb1ByZXYuYmluZCh0aGlzKSk7XHJcblx0XHR0aGlzLmFkZEtleUxpc3RlbmVyKFwicmlnaHRcIiwgdGhpcy5tb3ZlVG9OZXh0LmJpbmQodGhpcykpO1xyXG5cdFx0dGhpcy5hZGRLZXlMaXN0ZW5lcihcImhvbWVcIiwgdGhpcy5tb3ZlVG9TdGFydC5iaW5kKHRoaXMpKTtcclxuXHRcdHRoaXMuYWRkS2V5TGlzdGVuZXIoXCJlbmRcIiwgdGhpcy5tb3ZlVG9FbmQuYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHRtb3ZlVG9QcmV2KGV2KSB7XHJcblx0XHRsZXQgcHJldkluc3RhbmNlID0gZWxlbWVudHMuZ2V0UHJldihlbGVtZW50cy5nZXQoZXYudGFyZ2V0KSwgdGhpcywgb3B0aW9ucy5vd25zKTtcclxuXHRcdHByZXZJbnN0YW5jZS5lbGVtZW50LmZvY3VzKCk7XHJcblx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdH1cclxuXHRtb3ZlVG9OZXh0KGV2KSB7XHJcblx0XHRsZXQgbmV4dEluc3RhbmNlID0gZWxlbWVudHMuZ2V0TmV4dChlbGVtZW50cy5nZXQoZXYudGFyZ2V0KSwgdGhpcywgb3B0aW9ucy5vd25zKTtcclxuXHRcdG5leHRJbnN0YW5jZS5lbGVtZW50LmZvY3VzKCk7XHJcblx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdH1cclxuXHJcblx0bW92ZVRvU3RhcnQoZXYpIHtcclxuXHRcdGxldCBmaXJzdEluc3RhbmNlID0gZWxlbWVudHMuZ2V0U3RhcnQoZWxlbWVudHMuZ2V0KGV2LnRhcmdldCksIHRoaXMsIG9wdGlvbnMub3ducyk7XHJcblx0XHRmaXJzdEluc3RhbmNlLmVsZW1lbnQuZm9jdXMoKTtcclxuXHRcdGV2LnByZXZlbnREZWZhdWx0KCk7XHJcblx0fVxyXG5cclxuXHRtb3ZlVG9FbmQoZXYpIHtcclxuXHRcdGxldCBsYXN0SW5zdGFuY2UgPSBlbGVtZW50cy5nZXRFbmQoZWxlbWVudHMuZ2V0KGV2LnRhcmdldCksIHRoaXMsIG9wdGlvbnMub3ducyk7XHJcblx0XHRsYXN0SW5zdGFuY2UuZWxlbWVudC5mb2N1cygpO1xyXG5cdFx0ZXYucHJldmVudERlZmF1bHQoKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRhYmxpc3Q7IiwiaW1wb3J0IFNlY3Rpb24gZnJvbSBcIi4vYWJzdHJhY3QvU2VjdGlvblwiO1xyXG5cclxuY2xhc3MgVGFicGFuZWwgZXh0ZW5kcyBTZWN0aW9uIHsgfVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGFicGFuZWw7IiwiaW1wb3J0IG1peCBmcm9tIFwiQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW5cIjtcblxuaW1wb3J0IElucHV0IGZyb20gXCIuL2Fic3RyYWN0L0lucHV0XCI7XG5pbXBvcnQgU2VsZWN0aW9uIGZyb20gXCIuLy4uL21peGlucy9TZWxlY3Rpb25cIjtcblxuLyoqXG4gKiAjIyMgRXhhbXBsZXNcbiAqXG4gKiAjIyMjIEJhc2ljIGV4YW1wbGVcbiAqICAgXG4gKiA8ZGl2IHJvbGU9J3RleHRib3gnIGNvbnRlbnRlZGl0YWJsZT48L2Rpdj5cbiAqIFxuICogYGBgaHRtbFxuICogPGRpdiByb2xlPSd0ZXh0Ym94JyBjb250ZW50ZWRpdGFibGU+PC9kaXY+XG4gKiBgYGBcbiAqIFxuICogLS0tXG4gKiBcbiAqICMjIyMgTXVsdGlsaW5lIGV4YW1wbGVcbiAqIFxuICogPGRpdiByb2xlPSd0ZXh0Ym94JyBjb250ZW50ZWRpdGFibGU+PC9kaXY+XG4gKiBcbiAqIGBgYGh0bWxcbiAqIDxkaXYgcm9sZT0ndGV4dGJveCcgY29udGVudGVkaXRhYmxlPjwvZGl2PlxuICogYGBgXG4gKiBcbiAqIEBzdW1tYXJ5IEEgdHlwZSBvZiBpbnB1dCB0aGF0IGFsbG93cyBmcmVlLWZvcm0gdGV4dCBhcyBpdHMgdmFsdWUuXG4gKiBAZXh0ZW5kcyBJbnB1dFxuICogQG1peGVzIFNlbGVjdGlvblxuICogQHRvZG8gQWRkIG9wdGlvbnMgdG8ga2VlcCBvciByZW1vdmUgcGFzdGVkIHN0eWxpbmdcbiAqL1xuY2xhc3MgVGV4dGJveCBleHRlbmRzIG1peChJbnB1dCkud2l0aChTZWxlY3Rpb24pIHtcblxuXHQvKipcblx0ICogQHBhcmFtIHsqfSBhcmdzXG5cdCAqL1xuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0c3VwZXIoLi4uYXJncyk7XG5cblx0XHR0aGlzLl8ucmVnaXN0ZXJDdXN0b21WYWx1ZShcInRleHRib3gubWlubGVuZ3RoXCIpO1xuXHRcdHRoaXMuXy5yZWdpc3RlckN1c3RvbVZhbHVlKFwidGV4dGJveC5tYXhsZW5ndGhcIik7XG5cdFx0dGhpcy5fLnJlZ2lzdGVyQ3VzdG9tVmFsdWUoXCJ0ZXh0Ym94LnNpemVcIik7XG5cdFx0XG5cdFx0aWYoIXRoaXMubXVsdGlsaW5lKSB7XG5cdFx0XHR0aGlzLmFkZEtleUxpc3RlbmVyKFwiZW50ZXJcIiwgdGhpcy5fb25FbnRlci5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwicGFzdGVcIiwgdGhpcy5fb25QYXN0ZS5iaW5kKHRoaXMpKTtcblx0XHRcdC8vIHRoaXMuYWRkTXV0YXRpb25MaXN0ZW5lcigpXG5cdFx0fVxuXHR9XG5cblx0X29uRW50ZXIoZXYpIHtcblx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xuXHR9XG5cblx0X29uUGFzdGUoZXYpIHtcblx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGxldCBzdHI7XG5cdFx0bGV0IGRhdGEgPSBldi5jbGlwYm9hcmREYXRhLmdldERhdGEoXCJ0ZXh0L3BsYWluXCIpLnJlcGxhY2UoL1xccj9cXG58XFxyL2csIFwiXCIpO1xuXHRcdGxldCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG5cblx0XHR2YXIgYyA9IHRoaXMuZWxlbWVudC5jaGlsZE5vZGVzO1xuXHRcdHZhciBhID0gc2VsLmFuY2hvck5vZGU7XG5cblx0XHRpZiAoYyAmJiBhICYmIEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoYywgYSkgPiAtMSkge1xuXHRcdFx0c3RyID0gW3RoaXMuZWxlbWVudC5pbm5lclRleHQuc2xpY2UoMCwgc2VsLmFuY2hvck9mZnNldCksIGRhdGEsIHRoaXMuZWxlbWVudC5pbm5lclRleHQuc2xpY2Uoc2VsLmZvY3VzT2Zmc2V0KV07XG5cdFx0XHRzdHIgPSBzdHIuam9pbihcIlwiKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3RyID0gdGhpcy5lbGVtZW50LmlubmVyVGV4dCArIGRhdGE7XG5cdFx0fVxuXG5cdFx0dGhpcy5lbGVtZW50LmlubmVyVGV4dCA9IHN0cjtcblx0fVxuXG5cdF9vbkNoaWxkTGlzdE11dGF0aW9uKG11dGF0aW9uKSB7XG5cdFx0aWYgKCF0aGlzLm11bHRpbGluZSkge1xuXHRcdFx0QXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChtdXRhdGlvbi5hZGRlZE5vZGVzLCBuID0+IHtcblx0XHRcdFx0aWYgKG4ubm9kZU5hbWUgIT09IFwiI3RleHRcIikge1xuXHRcdFx0XHRcdHZhciBuZXdDaGlsZCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG4uaW5uZXJUZXh0KTtcblx0XHRcdFx0XHRuLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld0NoaWxkLCBuKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0LyogTmF0aXZlIHBvbHlmaWxsICAqL1xuXHRcblx0Ly8gYXV0b2NvbXBsZXRlXG5cdC8vIGRpcm5hbWVcblx0Ly8gbGlzdFxuXHQvLyBtYXhsZW5ndGhcblx0Ly8gbWlubGVuZ3RoXG5cdC8vIHBhdHRlcm5cblx0Ly8gcGxhY2Vob2xkZXJcblx0Ly8gcmVhZG9ubHlcblx0Ly8gcmVxdWlyZWRcblx0Ly8gc2l6ZVxuXHQvLyB2YWx1ZVxuXHQvLyBsaXN0XG5cdC8vIHNlbGVjdGlvbiBhcGlcblxuXHQvLyBuYW1lXHRzdHJpbmc6IFJldHVybnMgLyBTZXRzIHRoZSBlbGVtZW50J3MgbmFtZSBhdHRyaWJ1dGUsIGNvbnRhaW5pbmcgYSBuYW1lIHRoYXQgaWRlbnRpZmllcyB0aGUgZWxlbWVudCB3aGVuIHN1Ym1pdHRpbmcgdGhlIGZvcm0uXG5cdC8vIHR5cGUgc3RyaW5nOiBSZXR1cm5zIC8gU2V0cyB0aGUgZWxlbWVudCdzIHR5cGUgYXR0cmlidXRlLCBpbmRpY2F0aW5nIHRoZSB0eXBlIG9mIGNvbnRyb2wgdG8gZGlzcGxheS4gU2VlIHR5cGUgYXR0cmlidXRlIG9mIDxpbnB1dD4gZm9yIHBvc3NpYmxlIHZhbHVlcy5cblx0Ly8gYXV0b2ZvY3VzXHRib29sZWFuOiBSZXR1cm5zIC8gU2V0cyB0aGUgZWxlbWVudCdzIGF1dG9mb2N1cyBhdHRyaWJ1dGUsIHdoaWNoIHNwZWNpZmllcyB0aGF0IGEgZm9ybSBjb250cm9sIHNob3VsZCBoYXZlIGlucHV0IGZvY3VzIHdoZW4gdGhlIHBhZ2UgbG9hZHMsIHVubGVzcyB0aGUgdXNlciBvdmVycmlkZXMgaXQsIGZvciBleGFtcGxlIGJ5IHR5cGluZyBpbiBhIGRpZmZlcmVudCBjb250cm9sLiBPbmx5IG9uZSBmb3JtIGVsZW1lbnQgaW4gYSBkb2N1bWVudCBjYW4gaGF2ZSB0aGUgYXV0b2ZvY3VzIGF0dHJpYnV0ZS4gSXQgY2Fubm90IGJlIGFwcGxpZWQgaWYgdGhlIHR5cGUgYXR0cmlidXRlIGlzIHNldCB0byBoaWRkZW4gKHRoYXQgaXMsIHlvdSBjYW5ub3QgYXV0b21hdGljYWxseSBzZXQgZm9jdXMgdG8gYSBoaWRkZW4gY29udHJvbCkuXG5cdFxuXHQvKipcblx0ICogUmV0dXJucyAvIFNldHMgdGhlIGN1cnJlbnQgdmFsdWUgb2YgdGhlIHRleHRib3guXG5cdCAqIEB0eXBlIHtTdHJpbmd9XG5cdCAqL1xuXHRnZXQgdmFsdWUoKSB7IHJldHVybiB0aGlzLmVsZW1lbnQuaW5uZXJUZXh0OyB9XG5cdHNldCB2YWx1ZShzdHIpIHsgdGhpcy5lbGVtZW50LmlubmVyVGV4dCA9IHN0cjsgfVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIC8gU2V0cyB0aGUgbWlubXVtIGxlbmd0aCBvZiBjaGFyYWN0ZXJzXG5cdCAqIEB0eXBlIHtJbnRlZ2VyfVxuXHQgKi9cblx0Z2V0IG1pbkxlbmd0aCgpIHsgcmV0dXJuIHRoaXMuXy50ZXh0Ym94Lm1pbmxlbmd0aDsgfVxuXHRzZXQgbWluTGVuZ3RoKG51bSkgeyB0aGlzLl8udGV4dGJveC5taW5sZW5ndGggPSBudW07IH1cblxuXHQvKipcblx0ICogUmV0dXJucyAvIFNldHMgdGhlIG1heGltdW0gbGVuZ3RoIG9mIGNoYXJhY3RlcnNcblx0ICogQHR5cGUge0ludGVnZXJ9XG5cdCAqL1xuXHRnZXQgbWF4TGVuZ3RoKCkgeyByZXR1cm4gdGhpcy5fLnRleHRib3gubWF4bGVuZ3RoOyB9XG5cdHNldCBtYXhMZW5ndGgobnVtKSB7IHRoaXMuXy50ZXh0Ym94Lm1heGxlbmd0aCA9IG51bTsgfVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIC8gU2V0cyB0aGUgc2l6ZSBvZiBjb250cm9sLlxuXHQgKiBAdHlwZSB7SW50ZWdlcn1cblx0ICovXG5cdGdldCBzaXplKCkgeyByZXR1cm4gdGhpcy5fLnRleHRib3guc2l6ZTsgfVxuXHRzZXQgc2l6ZSh2YWwpIHtcblx0XHR0aGlzLmVsZW1lbnQuc3R5bGUud2lkdGggPSAyLjE2ICsgMC40OCAqIHZhbCArIFwiZW1cIjtcblx0XHR0aGlzLl8udGV4dGJveC5zaXplID0gdmFsO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRleHRib3g7IiwiaW1wb3J0IFdpZGdldCBmcm9tIFwiLi9XaWRnZXRcIjtcclxuXHJcbi8qKlxyXG4gKiBAZXh0ZW5kcyBXaWRnZXRcclxuICogQGFic3RyYWN0XHJcbiAqL1xyXG5jbGFzcyBDb21tYW5kIGV4dGVuZHMgV2lkZ2V0IHt9XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb21tYW5kOyIsImltcG9ydCBXaWRnZXQgZnJvbSBcIi4vV2lkZ2V0XCI7XHJcblxyXG4vKipcclxuICogQGV4dGVuZHMgV2lkZ2V0XHJcbiAqIEBhYnN0cmFjdFxyXG4gKi9cclxuY2xhc3MgQ29tcG9zaXRlIGV4dGVuZHMgV2lkZ2V0IHsgfVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29tcG9zaXRlOyIsImltcG9ydCBtaXggZnJvbSBcIkB2ZXN0ZXJnYWFyZC1jb21wYW55L2pzLW1peGluXCI7XG5cbmltcG9ydCBzZWxlY3RvciBmcm9tIFwiLi8uLi8uLi91dGlscy9zZWxlY3RvclwiO1xuaW1wb3J0IGVsZW1lbnRzIGZyb20gXCIuLy4uLy4uL3V0aWxzL2VsZW1lbnRzXCI7XG5cbmltcG9ydCBXaWRnZXQgZnJvbSBcIi4vV2lkZ2V0XCI7XG5pbXBvcnQgVmFsaWRhdGlvbiBmcm9tIFwiLi8uLi8uLi9taXhpbnMvVmFsaWRhdGlvblwiO1xuXG4vKipcbiAqIEBleHRlbmRzIFdpZGdldFxuICogQG1peGVzIFZhbGlkYXRpb25cbiAqIEBhYnN0cmFjdFxuICovXG5jbGFzcyBJbnB1dCBleHRlbmRzIG1peChXaWRnZXQpLndpdGgoVmFsaWRhdGlvbikge1xuXHQvKipcblx0ICogQGFsaWFzIElucHV0OmNvbnN0cnVjdG9yXG4gXHQgKiBAcGFyYW0ge1JlZ2V4fSBbb3B0aW9ucy5pbnB1dC5wYXR0ZXJuXSBSZWdleCB0byBjaGVjayBhZ2FpbnN0IHdoZW4gdmFsaWRhdGluZ1xuXHQgKi9cblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdHN1cGVyKC4uLmFyZ3MpO1xuXG5cdFx0dGhpcy5fLnJlZ2lzdGVyQ3VzdG9tRWxlbWVudChcImlucHV0LnBhdHRlcm5cIik7XG5cdH1cblxuXHQvKiBQb2x5ZmlsbCBvZiBuYXRpdmUgcHJvcGVydGllcyAqL1xuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoZSBwYXJlbnQgZm9ybSBlbGVtZW50XG5cdCAqIEByZXR1cm5zIHtBY2Nlc3NpYmxlTm9kZX0ge0BsaW5rIEZvcm19XG5cdCAqL1xuXHRnZXQgZm9ybSgpIHtcblx0XHRyZXR1cm4gZWxlbWVudHMuZ2V0UGFyZW50KHRoaXMsIHNlbGVjdG9yLmdldERlZXAoXCJmb3JtXCIpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBmaXJzdCBlbGVtZW50IHBvaW50ZWQgYnkgdGhlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNjb250cm9sc30gcHJvcGVydHkuXG5cdCAqIFRoZSBwcm9wZXJ0eSBtYXkgYmUgbnVsbCBpZiBubyBIVE1MIGVsZW1lbnQgZm91bmQgaW4gdGhlIHNhbWUgdHJlZS5cblx0ICogQHJldHVybnMge0FjY2Vzc2libGVOb2RlfSB7QGxpbmsgTGlzdGJveH1cblx0ICovXG5cdGdldCBsaXN0KCkge1xuXHRcdHJldHVybiB0aGlzLmNvbnRyb2xzLmZpbmQoYXkgPT4gYXkuZWxlbWVudC5tYXRjaGVzKHNlbGVjdG9yLmdldChcImxpc3Rib3hcIikpKTtcblx0fVxuXG5cdC8vIGZvcm1BY3Rpb25cdHN0cmluZzogUmV0dXJucyAvIFNldHMgdGhlIGVsZW1lbnQncyBmb3JtYWN0aW9uIGF0dHJpYnV0ZSxjb250YWluaW5nIHRoZSBVUkkgb2YgYVxuXHQvLyBwcm9ncmFtIHRoYXQgcHJvY2Vzc2VzIGluZm9ybWF0aW9uIHN1Ym1pdHRlZCBieSB0aGUgZWxlbWVudC4gVGhpcyBvdmVycmlkZXMgdGhlIGFjdGlvbiBhdHRyaWJ1dGVcblx0Ly8gb2YgdGhlIHBhcmVudCBmb3JtLlxuXG5cdC8vIGZvcm1FbmNUeXBlXHRzdHJpbmc6IFJldHVybnMgLyBTZXRzIHRoZSBlbGVtZW50J3MgZm9ybWVuY3R5cGUgYXR0cmlidXRlLCBjb250YWluaW5nIHRoZSB0eXBlIG9mXG5cdC8vIGNvbnRlbnQgdGhhdCBpcyB1c2VkIHRvIHN1Ym1pdCB0aGUgZm9ybSB0byB0aGUgc2VydmVyLiBUaGlzIG92ZXJyaWRlcyB0aGUgZW5jdHlwZSBhdHRyaWJ1dGUgb2YgXG5cdC8vIHRoZSBwYXJlbnQgZm9ybS5cblx0XG5cdC8vIGZvcm1NZXRob2RcdHN0cmluZzogUmV0dXJucyAvIFNldHMgdGhlIGVsZW1lbnQncyBmb3JtbWV0aG9kIGF0dHJpYnV0ZSwgY29udGFpbmluZyB0aGUgSFRUUCBtZXRob2Rcblx0Ly8gdGhhdCB0aGUgYnJvd3NlciB1c2VzIHRvIHN1Ym1pdCB0aGUgZm9ybS4gVGhpcyBvdmVycmlkZXMgdGhlIG1ldGhvZCBhdHRyaWJ1dGUgb2YgdGhlIHBhcmVudCBmb3JtLlxuXG5cdC8vIGZvcm1Ob1ZhbGlkYXRlXHRib29sZWFuOiBSZXR1cm5zIC8gU2V0cyB0aGUgZWxlbWVudCdzIGZvcm1ub3ZhbGlkYXRlIGF0dHJpYnV0ZSwgaW5kaWNhdGluZyB0aGF0XG5cdC8vIHRoZSBmb3JtIGlzIG5vdCB0byBiZSB2YWxpZGF0ZWQgd2hlbiBpdCBpcyBzdWJtaXR0ZWQuIFRoaXMgb3ZlcnJpZGVzIHRoZSBub3ZhbGlkYXRlIGF0dHJpYnV0ZVxuXHQvLyBvZiB0aGUgcGFyZW50IGZvcm0uXG5cblx0Ly8gZm9ybVRhcmdldFx0c3RyaW5nOiBSZXR1cm5zIC8gU2V0cyB0aGUgZWxlbWVudCdzIGZvcm10YXJnZXQgYXR0cmlidXRlLCBjb250YWluaW5nIGEgbmFtZSBvclxuXHQvLyBrZXl3b3JkIGluZGljYXRpbmcgd2hlcmUgdG8gZGlzcGxheSB0aGUgcmVzcG9uc2UgdGhhdCBpcyByZWNlaXZlZCBhZnRlciBzdWJtaXR0aW5nIHRoZSBmb3JtLlxuXHQvLyBUaGlzIG92ZXJyaWRlcyB0aGUgdGFyZ2V0IGF0dHJpYnV0ZSBvZiB0aGUgcGFyZW50IGZvcm0uXG59XG5cbmV4cG9ydCBkZWZhdWx0IElucHV0O1xuIiwiaW1wb3J0IFNlY3Rpb24gZnJvbSBcIi4vU2VjdGlvblwiO1xyXG5cclxuLyoqXHJcbiAqIEBleHRlbmRzIFNlY3Rpb25cclxuICovXHJcbmNsYXNzIExhbmRtYXJrIGV4dGVuZHMgU2VjdGlvbiB7IH1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExhbmRtYXJrOyIsImltcG9ydCBXaWRnZXQgZnJvbSBcIi4vV2lkZ2V0XCI7XG5cbi8qKlxuICogKiooQWJzdHJhY3Qgcm9sZSkgU0hPVUxEIE5PVCBVU0VEIElOIFRIRSBET00qKiBcbiAqIEFuIGlucHV0IHJlcHJlc2VudGluZyBhIHJhbmdlIG9mIHZhbHVlcyB0aGF0IGNhbiBiZSBzZXQgYnkgdGhlIHVzZXIuXG4gKlxuICogQGNsYXNzXG4gKiBAZXh0ZW5kcyBXaWRnZXRcbiAqIEByZXR1cm4ge1JhbmdlfSB0aGlzXG4gKiBAc2VlIHtAbGluayBodHRwczovL3czYy5naXRodWIuaW8vYXJpYS9hcmlhL2FyaWEuaHRtbCNyYW5nZX1cbiAqL1xuY2xhc3MgUmFuZ2UgZXh0ZW5kcyBXaWRnZXQge1xuXHQvKipcblx0ICogQGFsaWFzIG1vZHVsZTpSYW5nZS1jb25zdFxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFx0XHRcdFx0ZWxlbWVudCB0byBkZXJpdmUgaW5mb3JtYXRpb24gbmFtZUZyb21cblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBcdFx0XHRcdFx0XHRvcHRpb25hbCBvcHRpb25zXG4gXHQgKiBAcGFyYW0ge051bWJlcnxcImFueVwifSBvcHRpb25zLnN0ZXAgXHRpbmNyZWFzZS9kZWNyZWFzZSB2YWx1ZSB1c2VkXG5cdCAqL1xuXHRjb25zdHJ1Y3RvciguLi5hcmcpIHtcblx0XHRzdXBlciguLi5hcmcpO1xuXG5cdFx0LyoqXG5cdCAgICogQG5hbWUgUmFuZ2UjX1xuXHRcdCAqIEB0eXBlIHtPYmplY3R9XG5cdFx0ICogQHByb3Age051bWJlcn0gW3N0ZXA9MV1cblx0ICAgKi9cblxuXHRcdHRoaXMuXy5yZWdpc3RlckN1c3RvbVZhbHVlKFwic3RlcFwiLCAxKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBQYXNzdHJvdWdoIG9mIGFuIHN0cmluZ2lmaWVkIGB2YWx1ZU5vd2Bcblx0ICogQHR5cGUge1N0cmluZ31cblx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjdmFsdWVOb3d9XG5cdCAqL1xuXHRnZXQgdmFsdWUoKSB7IHJldHVybiB0aGlzLnZhbHVlTm93LnRvU3RyaW5nKCk7fVxuXHRzZXQgdmFsdWUodmFsKSB7IHRoaXMudmFsdWVOb3cgPSB2YWw7IH1cblxuXHQvKipcblx0ICogUHJveHkgb2YgdGhlIGB2YWx1ZU5vd2AgdmFsdWVcblx0ICogQHR5cGUge051bWJlcn1cblx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjdmFsdWVOb3d9XG5cdCAqL1xuXHRnZXQgdmFsdWVBc051bWJlcigpIHsgcmV0dXJuIHRoaXMudmFsdWVOb3c7IH1cblx0c2V0IHZhbHVlQXNOdW1iZXIodmFsKSB7IHRoaXMudmFsdWVOb3cgPSB2YWw7IH1cblxuXHQvKipcbiAgICogRGVjcmVhc2UgdGhlIHZhbHVlIHdpdGggdGhlIGFtb3VudCBvZiAxIHN0ZXBcbiAgICogQHBhcmFtICB7RXZlbnR9IGV2IEV2ZW50IHdoZW4gdHJpZ2dlcmVkIHRocm91Z2ggYW4gZWxlbWVudHNcbiAgICovXG5cdHN0ZXBEb3duKGV2KSB7XG5cdFx0aWYodGhpcy5kaXNhYmxlZCkgcmV0dXJuO1xuXHRcdGlmKGV2KSBldi5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0aWYodGhpcy52YWx1ZU1pbiA9PT0gbnVsbCB8fCB0aGlzLnZhbHVlTm93ID4gdGhpcy52YWx1ZU1pbikge1xuXHRcdFx0dGhpcy52YWx1ZU5vdyA9IHRoaXMudmFsdWVOb3cgLSBOdW1iZXIodGhpcy5fLnN0ZXApO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuICAgKiBJbmNyZWFzZSB0aGUgdmFsdWUgd2l0aCB0aGUgYW1vdW50IG9mIDEgc3RlcFxuICAgKiBAcGFja2FnZVxuICAgKiBAcGFyYW0gIHtFdmVudH0gZXYgRXZlbnQgd2hlbiB0cmlnZ2VyZWQgdGhyb3VnaCBhbiBlbGVtZW50c1xuICAgKi9cblx0c3RlcFVwKGV2KSB7XG5cdFx0aWYodGhpcy5kaXNhYmxlZCkgcmV0dXJuO1xuXHRcdGlmKGV2KSBldi5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0aWYodGhpcy52YWx1ZU1heCA9PT0gbnVsbCB8fCB0aGlzLnZhbHVlTm93IDwgdGhpcy52YWx1ZU1heCkge1xuXHRcdFx0dGhpcy52YWx1ZU5vdyA9IHRoaXMudmFsdWVOb3cgKyBOdW1iZXIodGhpcy5fLnN0ZXApO1xuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBSYW5nZTsiLCJpbXBvcnQgQWNjZXNzaWJsZU5vZGUgZnJvbSBcIi4vLi4vLi4vdHlwZS9BY2Nlc3NpYmxlTm9kZVwiO1xyXG5cclxuY29uc3QgTW91c2V0cmFwID0gcmVxdWlyZShcIm1vdXNldHJhcFwiKTtcclxuaW1wb3J0IG9iamVjdFBhdGggZnJvbSBcIm9iamVjdC1wYXRoXCI7XHJcblxyXG4vLyBFdmVudCBuYW1lcyB0aGF0IGFyZSBvbmx5IGluc2lkZSB0aGUgbGliYXJ5XHJcbnZhciBjdXN0b21FdmVudHMgPSBbXCJrZXlcIiwgXCJhdHRyaWJ1dGVzXCIsIFwiY2hhcmFjdGVyRGF0YVwiLCBcImNoaWxkbGlzdFwiLCBcImxhYmVsXCJdO1xyXG5cclxubGV0IGlzRnVuY3Rpb24gPSBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqID09IFwiZnVuY3Rpb25cIiB8fCBmYWxzZTsgfTtcclxuXHJcbi8qKlxyXG4gKiBSZWdpc3RlciBleHRyYSBlbGVtZW50cyB1c2VkIGZvciBzb21lIHJvbGVzLFxyXG4gKiBlLmcuIHRoZSB1cCBhbmQgZG93biBhcnJvd3Mgd2l0aCB0aGUgc3BpbmJ1dHRvbiByb2xlXHJcbiAqXHJcbiAqIFBhdGggb2YgaW1wb3J0YW5jZSB3aGVyZSB0aGUgZWxlbWVudCBpcyByZWNlaXZlZCBmcm9tOlxyXG4gKiAxLiBuZXcgLi4uKC4uLiwge2VsZW1lbnRzOiB7IHJvbGVOYW1lOiB7IHN0cjogaW5zdGFuY2Ugb2YgSFRNTEVsZW1lbnQgfX19KVxyXG4gKiAyLiBbZGF0YS1yb2xlTmFtZS1zdHI9aWRdIG9uIHRoZSBlbGVtZW50IHdpdGggdGhlIHJvbGVcclxuICogMy4gZGVmYXVsdCB2YWx1ZVxyXG4gKlxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHBhdGggcGF0aCB3aGVyZSB0aGUgZWxlbWVudCBzaG91bGQgYmUgc3RvcmVkXHJcbiAqL1xyXG5mdW5jdGlvbiBoYW5kbGVDdXN0b21FbGVtZW50KHBhdGgsIHZhbHVlKSB7XHJcblx0Ly8gb25seSBpZiBubyBlbGVtZW50IGlzIGFscmVhZHkgc2V0XHJcblx0aWYgKCFvYmplY3RQYXRoLmhhcyh0aGlzLCBcIl8uXCIgKyBwYXRoKSkge1xyXG5cdFx0Ly8gY2hlY2sgaWYgZWxlbWVudCBoYXMgaXQgZGVmaW5lZCBhcyBkYXRhIGF0dHJpYnV0ZVxyXG5cdFx0dmFyIGlkID0gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtXCIgKyBwYXRoLnNwbGl0KFwiLlwiKS5qb2luKFwiLVwiKSk7XHJcblx0XHRpZiAoaWQpIHZhciBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuXHRcdGlmIChlbCkge1xyXG5cdFx0XHRvYmplY3RQYXRoLnNldCh0aGlzLCBcIl8uXCIgKyBwYXRoLCBlbCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRvYmplY3RQYXRoLnNldCh0aGlzLCBcIl8uXCIgKyBwYXRoLCB2YWx1ZSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVDdXN0b21WYWx1ZShwYXRoLCB2YWx1ZSkge1xyXG5cdC8vIG9ubHkgaWYgbm8gZWxlbWVudCBpcyBhbHJlYWR5IHNldFxyXG5cdGlmICghb2JqZWN0UGF0aC5oYXModGhpcywgXCJfLlwiICsgcGF0aCkpIHtcclxuXHRcdC8vIGNoZWNrIGlmIGVsZW1lbnQgaGFzIGl0IGRlZmluZWQgYXMgZGF0YSBhdHRyaWJ1dGVcclxuXHRcdHZhciBkYXRhVmFsdWUgPSB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1cIiArIHBhdGguc3BsaXQoXCIuXCIpLmpvaW4oXCItXCIpKTtcclxuXHRcdGlmIChkYXRhVmFsdWUpIHtcclxuXHRcdFx0b2JqZWN0UGF0aC5zZXQodGhpcywgXCJfLlwiICsgcGF0aCwgZGF0YVZhbHVlKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG9iamVjdFBhdGguc2V0KHRoaXMsIFwiXy5cIiArIHBhdGgsIHZhbHVlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAZXh0ZW5kcyBBY2Nlc3NpYmxlTm9kZVxyXG4gKi9cclxuY2xhc3MgUm9sZXR5cGUgZXh0ZW5kcyBBY2Nlc3NpYmxlTm9kZSB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBleHRlbmRzIEFjY2Vzc2libGVOb2RlXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xyXG5cdFx0c3VwZXIoLi4uYXJncyk7XHJcblxyXG5cdFx0dGhpcy5fLmxpc3RlbmVycyA9IG5ldyBNYXAoKTtcclxuXHRcdHRoaXMuXy5yZWdpc3RlckN1c3RvbUVsZW1lbnQgPSBoYW5kbGVDdXN0b21FbGVtZW50LmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLl8ucmVnaXN0ZXJDdXN0b21WYWx1ZSA9IGhhbmRsZUN1c3RvbVZhbHVlLmJpbmQodGhpcyk7XHJcblxyXG5cdFx0b2JqZWN0UGF0aC5wdXNoKHRoaXMuXywgXCJtdXRhdGlvbnNcIiwgXCJ0YWJJbmRleFwiKTtcclxuXHJcblx0XHR0aGlzLl9vbkFyaWFEaXNhYmxlZE11dGF0aW9uKCk7XHJcblx0fVxyXG5cclxuXHRfb25BcmlhRGlzYWJsZWRNdXRhdGlvbigpIHtcclxuXHRcdC8vIGNvbnNvbGUubG9nKHRoaXMuZGlzYWJsZWQsIHRoaXMudGFiSW5kZXgsIHRoaXMuZGlzYWJsZWQgJiYgdGhpcy50YWJJbmRleCAmJiB0aGlzLnRhYkluZGV4ID49IDApO1xyXG5cdFx0aWYodGhpcy5kaXNhYmxlZCAmJiB0aGlzLnRhYkluZGV4ID49IDApIHtcclxuXHRcdFx0dGhpcy50YWJJbmRleCA9IHVuZGVmaW5lZDtcclxuXHRcdH0gZWxzZSBpZighdGhpcy5kaXNhYmxlZCAmJiB0aGlzLnRhYkluZGV4IDwgMCkge1xyXG5cdFx0XHR0aGlzLnRhYkluZGV4ID0gMDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEN1cnJlbnQgdGFiaW5kZXggb2YgdGhlIGVsZW1lbnRcclxuXHQgKiBAdHlwZSB7TnVtYmVyfVxyXG5cdCAqL1xyXG5cdGdldCB0YWJJbmRleCgpIHtcclxuXHRcdGlmICghdGhpcy5lbGVtZW50Lmhhc0F0dHJpYnV0ZShcInRhYmluZGV4XCIpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5lbGVtZW50LnRhYkluZGV4O1xyXG5cdH1cclxuXHRzZXQgdGFiSW5kZXgobnVtYmVyKSB7IHRoaXMuZWxlbWVudC50YWJJbmRleCA9IG51bWJlcjsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGFuIGxpc3RlbmVyIHRvIHRoZSBvYmplY3QgYW5kIHRhcmdldGVkIGVsZW1lbnRcclxuXHQgKiBAc2VlIGN1c3RvbUV2ZW50c1xyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBsYWJlbCBUeXBlIG9mIGV2ZW50XHJcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb25cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIEV4dGVuZHMgQWRkRXZlbnRMaXN0ZW5lck9wdGlvbnNcclxuXHQgKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMua2V5XSBXaGVuIGxhYmVsIGlzIHNldCB0byBga2V5YCBpdCBzcGVjaWZpZXMgdGhlIGtleWNvbWJvIHRvIGxpc3RlbiB0b1xyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5hdHRyaWJ1dGVdIFdoZW4gbGFiZWwgaXMgc2V0IHRvIGBhdHRyaWJ1dGVzYCBpdCBzcGVjaWZpZXMgd2hpY2ggYXR0cmlidXRlIHNob3VsZCBiZSBjaGFuZ2VkXHJcblx0ICogQHBhcmFtIHtFbGVtZW50fSBbb3B0aW9ucy50YXJnZXRdIENoYW5nZXMgdGhlIHRhcmdldGVkIGVsZW1lbnRcclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmNhcHR1cmVdXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5wYXNzaXZlXVxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMub25jZV1cclxuXHQgKi9cclxuXHRhZGRMaXN0ZW5lcihsYWJlbCwgY2FsbGJhY2ssIG9wdGlvbnMpIHtcclxuXHRcdHZhciBlbCA9IG9wdGlvbnMgJiYgb3B0aW9ucy50YXJnZXQgPyBvcHRpb25zLnRhcmdldCA6IHRoaXMuZWxlbWVudDtcclxuXHRcdHRoaXMuXy5saXN0ZW5lcnMuaGFzKGxhYmVsKSB8fCB0aGlzLl8ubGlzdGVuZXJzLnNldChsYWJlbCwgW10pO1xyXG5cdFx0dGhpcy5fLmxpc3RlbmVycy5nZXQobGFiZWwpLnB1c2goeyBjYWxsYmFjaywgb3B0aW9ucyB9KTtcclxuXHJcblx0XHRpZiAobGFiZWwgPT0gXCJrZXlcIiAmJiBvcHRpb25zLmtleSkge1xyXG5cdFx0XHRNb3VzZXRyYXAoZWwpLmJpbmQob3B0aW9ucy5rZXksIGNhbGxiYWNrKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoY3VzdG9tRXZlbnRzLmluZGV4T2YobGFiZWwpID09IC0xKSB7XHJcblx0XHRcdGVsLmFkZEV2ZW50TGlzdGVuZXIobGFiZWwsIGNhbGxiYWNrLCBvcHRpb25zKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJlbW92ZUxpc3RlbmVyKGxhYmVsLCBjYWxsYmFjaywgb3B0aW9ucykge1xyXG5cdFx0bGV0IGxpc3RlbmVycyA9IHRoaXMuXy5saXN0ZW5lcnMuZ2V0KGxhYmVsKSwgaW5kZXg7XHJcblxyXG5cdFx0aWYgKGxpc3RlbmVycyAmJiBsaXN0ZW5lcnMubGVuZ3RoKSB7XHJcblx0XHRcdGluZGV4ID0gbGlzdGVuZXJzLnJlZHVjZSgoaSwgbGlzdGVuZXIsIGluZGV4KSA9PiB7XHJcblx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0aXNGdW5jdGlvbihsaXN0ZW5lci5jYWxsYmFjaykgJiYgbGlzdGVuZXIuY2FsbGJhY2sgPT09IGNhbGxiYWNrICYmXHJcblx0XHRcdFx0XHQoXHJcblx0XHRcdFx0XHRcdChcclxuXHRcdFx0XHRcdFx0XHRsaXN0ZW5lci5vcHRpb25zICYmXHJcblx0XHRcdFx0XHRcdFx0bGlzdGVuZXIub3B0aW9ucy5rZXkgPT0gb3B0aW9ucy5rZXkgJiZcclxuXHRcdFx0XHRcdFx0XHRsaXN0ZW5lci5vcHRpb25zLmF0dHJpYnV0ZSA9PSBvcHRpb25zLmF0dHJpYnV0ZSAmJlxyXG5cdFx0XHRcdFx0XHRcdGxpc3RlbmVyLm9wdGlvbnMuY2FwdHVyZSA9PSBvcHRpb25zLmNhcHR1cmVcclxuXHRcdFx0XHRcdFx0KSB8fFxyXG5cdFx0XHRcdFx0XHQhbGlzdGVuZXIub3B0aW9ucyAmJiAhb3B0aW9uc1xyXG5cdFx0XHRcdFx0KVxyXG5cdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGkgPSBpbmRleDtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LCAtMSk7XHJcblxyXG5cdFx0XHRpZiAoaW5kZXggPiAtMSkge1xyXG5cdFx0XHRcdGlmIChjdXN0b21FdmVudHMuaW5kZXhPZihsYWJlbCkgPT0gLTEpIHtcclxuXHRcdFx0XHRcdHZhciBlbCA9IG9wdGlvbnMgJiYgb3B0aW9ucy50YXJnZXQgPyBvcHRpb25zLnRhcmdldCA6IHRoaXMuZWxlbWVudDtcclxuXHJcblx0XHRcdFx0XHRlbC5yZW1vdmVFdmVudExpc3RlbmVyKGxhYmVsLCBjYWxsYmFjaywgb3B0aW9ucyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cdFx0XHRcdHRoaXMuXy5saXN0ZW5lcnMuc2V0KGxhYmVsLCBsaXN0ZW5lcnMpO1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRkaXNwYXRjaEV2ZW50KGV2KSB7XHJcblx0XHQvLyBsZXQgbGlzdGVuZXJzID0gdGhpcy5fLmxpc3RlbmVycy5nZXQoZXYudHlwZSk7XHJcblx0XHR0aGlzLmVsZW1lbnQuZGlzcGF0Y2hFdmVudChldik7XHJcblx0XHQvLyBpZiAobGlzdGVuZXJzICYmIGxpc3RlbmVycy5sZW5ndGgpIHtcclxuXHRcdC8vIFx0bGlzdGVuZXJzLmZvckVhY2goKGxpc3RlbmVyKSA9PiB7XHJcblx0XHQvLyBcdFx0bGlzdGVuZXIoZXYpO1xyXG5cdFx0Ly8gXHR9KTtcclxuXHRcdC8vIFx0cmV0dXJuIHRydWU7XHJcblx0XHQvLyB9XHJcblx0XHQvLyByZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHJcblx0YWRkS2V5TGlzdGVuZXIoa2V5LCBjYWxsYmFjaykge1xyXG5cdFx0cmV0dXJuIHRoaXMuYWRkTGlzdGVuZXIoXCJrZXlcIiwgY2FsbGJhY2ssIHsga2V5IH0pO1xyXG5cdH1cdFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSb2xldHlwZTsiLCJpbXBvcnQgU3RydWN0dXJlIGZyb20gXCIuL1N0cnVjdHVyZVwiO1xyXG5cclxuLyoqXHJcbiAqIEBleHRlbmRzIFN0cnVjdHVyZVxyXG4gKi9cclxuY2xhc3MgU2VjdGlvbiBleHRlbmRzIFN0cnVjdHVyZSB7IH1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNlY3Rpb247IiwiaW1wb3J0IGZjIGZyb20gXCIuLy4uLy4uL3V0aWxzL21hbmFnaW5nRm9jdXNcIjtcclxuaW1wb3J0IGJvb2xlYW4gZnJvbSBcIi4vLi4vLi4vdHlwZS9ib29sZWFuXCI7XHJcbmltcG9ydCBlbGVtZW50cyBmcm9tIFwiLi8uLi8uLi91dGlscy9lbGVtZW50c1wiO1xyXG5cclxuaW1wb3J0IFJvbGV0eXBlIGZyb20gXCIuL1JvbGV0eXBlXCI7XHJcbmltcG9ydCBPcHRpb24gZnJvbSBcIi4vLi4vT3B0aW9uLmpzXCI7XHJcbmltcG9ydCBtaXggZnJvbSBcIkB2ZXN0ZXJnYWFyZC1jb21wYW55L2pzLW1peGluXCI7XHJcbmltcG9ydCBzZWxlY3RvciBmcm9tIFwiLi8uLi8uLi91dGlscy9zZWxlY3RvclwiO1xyXG5cclxuLyoqXHJcbiAqICMjIyBLZXlib2FyZCBTdXBwb3J0XHJcbiAqXHJcbiAqICMjIyMgRGVmYXVsdFxyXG4gKiB8IEtleSB8IEZ1bmN0aW9uIHxcclxuICogfCAtLS0gfCAtLS0tLS0tLSB8XHJcbiAqIHwgRG93biBBcnJvdyB8IE1vdmVzIGZvY3VzIHRvIHRoZSBuZXh0IG9wdGlvbiA8YnIvPiBJZiBub3QgbXVsdGlzZWxlY3RhYmxlLCBpdCBzZWxlY3RzIHRoZSBmb2N1c2VkIG9wdGlvbi5cclxuICogfCBVcCBBcnJvdyBcdHwgTW92ZXMgZm9jdXMgdG8gdGhlIHByZXZpb3VzIG9wdGlvbiAgPGJyLz4gSWYgbm90IG11bHRpc2VsZWN0YWJsZSwgaXQgc2VsZWN0cyB0aGUgZm9jdXNlZCBvcHRpb24uXHJcbiAqIHwgSG9tZSBcdFx0XHR8XHRNb3ZlcyBmb2N1cyB0byB0aGUgZmlyc3Qgb3B0aW9uICA8YnIvPiBJZiBub3QgbXVsdGlzZWxlY3RhYmxlLCBpdCBzZWxlY3RzIHRoZSBmb2N1c2VkIG9wdGlvbi5cclxuICogfCBFbmQgIFx0XHRcdHxcdE1vdmVzIGZvY3VzIHRvIHRoZSBsYXN0IG9wdGlvbiAgPGJyLz4gSWYgbm90IG11bHRpc2VsZWN0YWJsZSwgaXQgc2VsZWN0cyB0aGUgZm9jdXNlZCBvcHRpb24uXHJcbiAqXHJcbiAqICMjIyMgTXVsdGlwbGUgc2VsZWN0aW9uXHJcbiAqIHwgS2V5IHwgRnVuY3Rpb24gfFxyXG4gKiB8IC0tLSB8IC0tLS0tLS0tIHxcclxuICogfCBTcGFjZVx0XHRcdFx0XHRcdFx0XHRcdHwgQ2hhbmdlcyB0aGUgc2VsZWN0aW9uIHN0YXRlIG9mIHRoZSBmb2N1c2VkIG9wdGlvbi5cclxuICogfCBTaGlmdCArIERvd24gQXJyb3cgXHRcdHwgTW92ZXMgZm9jdXMgdG8gYW5kIHNlbGVjdHMgdGhlIG5leHQgb3B0aW9uLlxyXG4gKiB8IFNoaWZ0ICsgVXAgQXJyb3cgXHRcdFx0fCBNb3ZlcyBmb2N1cyB0byBhbmQgc2VsZWN0cyB0aGUgcHJldmlvdXMgb3B0aW9uLlxyXG4gKiB8IENvbnRyb2wgKyBTaGlmdCArIEhvbWUgfFx0U2VsZWN0cyBmcm9tIHRoZSBmb2N1c2VkIG9wdGlvbiB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBsaXN0LlxyXG4gKiB8IENvbnRyb2wgKyBTaGlmdCArIEVuZCAgfCBTZWxlY3RzIGZyb20gdGhlIGZvY3VzZWQgb3B0aW9uIHRvIHRoZSBlbmQgb2YgdGhlIGxpc3QuXHJcbiAqIHwgQ29udHJvbCArIEEgXHQgICAgICAgICAgfCBTZWxlY3RzIGFsbCBvcHRpb25zIGluIHRoZSBsaXN0LiBJZiBhbGwgb3B0aW9ucyBhcmUgc2VsZWN0ZWQsIHVuc2VsZWN0cyBhbGwgb3B0aW9ucy5cclxuICpcclxuICogIyMjIEF0dHJpYnV0ZXNcclxuICogKiBgYXJpYS1zZWxlY3RlZGBcclxuICogXHQqIGB0cnVlYFxyXG4gKiBcdFx0KiBpcyB0aGUgY3VycmVudCBmb2N1c3NlZCBlbGVtZW50XHJcbiAqIFx0XHQqIGVxdWFscyB0aGUgdmFsdWUgb2YgYGFyaWEtYWN0aXZlZGVzY2VuZGFudGBcclxuICogKiBgdGFiaW5kZXhgXHJcbiAqIFx0KiBhbGxvd3MgdXNhZ2Ugb2YgdGhlIGVsZW1lbnQgYnkga2V5cyB3aGVuIGluIGZvY3VzXHJcbiAqICogYGFyaWEtYWN0aXZlZGVzY2VuZGFudGAgZXF1YWxzIElEIG9mIGN1cnJlbnQgZm9jdXNzZWQgZWxlbWVudFxyXG4gKiBcclxuICogIyMjIyBNdWx0aXBsZSBzZWxlY3Rpb25cclxuICogKiBgYXJpYS1zZWxlY3RlZGBcclxuICogICogYHRydWVgXHJcbiAqIFx0XHQqIGNhbiBiZSBhcHBsaWVkIHRvIG11bHRpcGxlIGVsZW1lbnRcclxuICogICAgKiBub3QgYXV0b21hdGljYWxseSBhcHBsaWVkIHRvIHRoZSBmb2N1c2VkIGVsZW1lbnRcclxuICogXHQqIGBmYWxzZWBcclxuICogKiBgdGFiaW5kZXhgXHJcbiAqIFx0KiBhbGxvd3MgdXNhZ2Ugb2YgdGhlIGVsZW1lbnQgYnkga2V5cyB3aGVuIGluIGZvY3VzXHJcbiAqIFxyXG4gKiBAc3VtbWFyeSBBIGZvcm0gd2lkZ2V0IHRoYXQgYWxsb3dzIHRoZSB1c2VyIHRvIG1ha2Ugc2VsZWN0aW9ucyBmcm9tIGEgc2V0IG9mIGNob2ljZXMuXHJcbiAqIEBleHRlbmRzIFJvbGV0eXBlXHJcbiAqL1xyXG5jbGFzcyBTZWxlY3QgZXh0ZW5kcyBSb2xldHlwZSB7XHJcblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xyXG5cdFx0c3VwZXIoLi4uYXJncyk7XHJcblxyXG5cdFx0Ly8gdXNlZCBmb3IgZGV0ZXJtaW5pbmcgaWYgbG9naWMgc2hvdWxkIGJlIGV4ZWN1dGVkXHJcblx0XHR0aGlzLnRhcmdldCA9IGZhbHNlO1xyXG5cdFx0XHJcblx0XHQvLyB3aGVuIGluIGZvY3VzLCBhbGxvdyB0aGUgZWxlbWVudCBiZSBjb250cm9sbGVkIGJ5IHRoZSBrZXlzXHJcblx0XHRpZih0eXBlb2YgdGhpcy50YWJJbmRleCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIGhhc1RhcmdldC5iaW5kKHRoaXMpKTtcclxuXHRcdFx0dGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIGxvc3RUYXJnZXQuYmluZCh0aGlzKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm1vdmVUb1N0YXJ0LmJpbmQodGhpcyksIHtrZXk6IFwiaG9tZVwiLCB0YXJnZXQ6IHRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50fSk7XHJcblx0XHR0aGlzLmFkZExpc3RlbmVyKFwia2V5XCIsIHRoaXMubW92ZVRvUHJldi5iaW5kKHRoaXMpLCB7a2V5OiBcInVwXCIsIHRhcmdldDogdGhpcy5lbGVtZW50Lm93bmVyRG9jdW1lbnR9KTtcclxuXHRcdHRoaXMuYWRkTGlzdGVuZXIoXCJrZXlcIiwgdGhpcy5tb3ZlVG9OZXh0LmJpbmQodGhpcyksIHtrZXk6IFwiZG93blwiLCB0YXJnZXQ6IHRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50fSk7XHJcblx0XHR0aGlzLmFkZExpc3RlbmVyKFwia2V5XCIsIHRoaXMubW92ZVRvRW5kLmJpbmQodGhpcyksIHtrZXk6IFwiZW5kXCIsIHRhcmdldDogdGhpcy5lbGVtZW50Lm93bmVyRG9jdW1lbnR9KTtcclxuXHJcblx0XHQvLyB0aGlzLmFkZExpc3RlbmVyLmNhbGwoeyBlbGVtZW50OiB0aGlzLmVsZW1lbnQub3duZXJEb2N1bWVudCB9LCBcImhvbWVcIiwgdGhpcy5tb3ZlVG9TdGFydC5iaW5kKHRoaXMpKTtcclxuXHRcdC8vIHRoaXMuYWRkTGlzdGVuZXIuY2FsbCh7IGVsZW1lbnQ6IHRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50IH0sIFwidXBcIiwgdGhpcy5tb3ZlVG9QcmV2LmJpbmQodGhpcykpO1xyXG5cdFx0Ly8gLy8gdGhpcy5hZGRMaXN0ZW5lci5jYWxsKHsgZWxlbWVudDogdGhpcy5lbGVtZW50Lm93bmVyRG9jdW1lbnQgfSwgXCJzaGlmdCArIHVwXCIsIHRoaXMubW92ZVRvTmV4dC5iaW5kKHRoaXMpKTtcclxuXHRcdC8vIHRoaXMuYWRkTGlzdGVuZXIuY2FsbCh7IGVsZW1lbnQ6IHRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50IH0sIFwiZG93blwiLCB0aGlzLm1vdmVUb05leHQuYmluZCh0aGlzKSk7XHJcblx0XHQvLyAvLyB0aGlzLmFkZExpc3RlbmVyLmNhbGwoeyBlbGVtZW50OiB0aGlzLmVsZW1lbnQub3duZXJEb2N1bWVudCB9LCBcInNoaWZ0ICsgZG93blwiLCBzZWxlY3REb3duLmJpbmQodGhpcykpO1xyXG5cdFx0Ly8gdGhpcy5hZGRMaXN0ZW5lci5jYWxsKHsgZWxlbWVudDogdGhpcy5lbGVtZW50Lm93bmVyRG9jdW1lbnQgfSwgXCJlbmRcIiwgdGhpcy5tb3ZlVG9FbmQuYmluZCh0aGlzKSk7XHJcblx0XHRjb25zb2xlLmxvZyhzZWxlY3Rvcik7XHJcblx0XHRsZXQgb3B0aW9ucyA9IEFycmF5LmZyb20odGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IuZ2V0RGVlcChcIm9wdGlvblwiKSkpO1xyXG5cdFx0dGhpcy5vcHRpb25zID0gW107XHJcblx0XHRvcHRpb25zLmZvckVhY2gobm9kZSA9PiB7XHJcblx0XHRcdGxldCB2YWx1ZSA9IG5ldyBPcHRpb24obm9kZSk7XHJcblxyXG5cdFx0XHR2YWx1ZS5hZGRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuYWN0aXZlQ2hhbmdlZC5iaW5kKHRoaXMpKTtcclxuXHRcdFx0aWYgKHZhbHVlLnNlbGVjdGVkKSB7XHJcblx0XHRcdFx0ZmMuYWRkKHZhbHVlKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLm9wdGlvbnMucHVzaCh2YWx1ZSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdG1vdmVUb1ByZXYoZXYpIHsgbW92ZSh0aGlzLCBldiwgZmMucHJldik7IH1cclxuXHRtb3ZlVG9OZXh0KGV2KSB7IG1vdmUodGhpcywgZXYsIGZjLm5leHQpOyB9XHJcblx0bW92ZVRvU3RhcnQoZXYpIHsgbW92ZSh0aGlzLCBldiwgZmMuc3RhcnQpOyB9XHJcblx0bW92ZVRvRW5kKGV2KSB7IG1vdmUodGhpcywgZXYsIGZjLmVuZCk7IH1cclxuXHRhY3RpdmVDaGFuZ2VkKGV2KSB7XHJcblx0XHQvLyBsZXQgb3B0aW9uIGVsZW1lbnRzLmdldChldi50YXJnZXQpO1xyXG5cdFx0Ly8gbGV0IHByZXZGb2N1cyA9IGZjLmdldCh0aGlzLm9wdGlvbnMpO1xyXG5cdFx0Ly8gZmMucmVtb3ZlKHByZXZGb2N1cyk7XHJcblx0XHQvLyBmYy5hZGQob3B0aW9uKTtcclxuXHJcblx0XHQvLyBpZiAodGhpcy5hY3RpdmVEZXNjZW5kYW50KSB0aGlzLmFjdGl2ZURlc2NlbmRhbnQgPSBvcHRpb247XHJcblxyXG5cdFx0Ly8gLy8gdXBkYXRlIHNlbGVjdGVkIG9uIGtleWV2ZW50IHdoZW4gb25seSBvbmUgaXRlbSBjYW4gYmUgc2VsZWN0ZWRcclxuXHRcdC8vIGlmICghdGhpcy5tdWx0aXNlbGVjdGFibGUpIHtcclxuXHRcdC8vIFx0ZmMuc2V0U2VsZWN0ZWQocHJldkZvY3VzLCB1bmRlZmluZWQpO1xyXG5cdFx0Ly8gfVxyXG5cdFx0Ly8gZmMuc2V0U2VsZWN0ZWQob3B0aW9uLCBib29sZWFuLnRvZ2dsZShvcHRpb24uc2VsZWN0ZWQpKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1vdmUoYXksIGV2LCBmdW5jKSB7XHJcblx0aWYgKCFheS50YXJnZXQpIHJldHVybjtcclxuXHRpZiAoZXYpIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdGxldCBwcmV2Rm9jdXMgPSBmYy5nZXQoYXkub3B0aW9ucyk7XHJcblx0ZmMucmVtb3ZlKHByZXZGb2N1cyk7XHJcblx0Ly8gdXBkYXRlIHNlbGVjdGVkIG9uIGtleWV2ZW50IHdoZW4gb25seSBvbmUgaXRlbSBjYW4gYmUgc2VsZWN0ZWRcclxuXHRsZXQgY3VycmVudEZvY3VzID0gZnVuYyhheS5vcHRpb25zLCBwcmV2Rm9jdXMpO1xyXG5cdGlmIChheS5hY3RpdmVEZXNjZW5kYW50KSBheS5hY3RpdmVEZXNjZW5kYW50ID0gY3VycmVudEZvY3VzO1xyXG5cclxuXHQvLyB1cGRhdGUgc2VsZWN0ZWQgb24ga2V5ZXZlbnQgd2hlbiBvbmx5IG9uZSBpdGVtIGNhbiBiZSBzZWxlY3RlZFxyXG5cdGlmICghYXkubXVsdGlzZWxlY3RhYmxlKSB7XHJcblx0XHRmYy5zZXRTZWxlY3RlZChwcmV2Rm9jdXMsIHVuZGVmaW5lZCk7XHJcblx0XHRmYy5zZXRTZWxlY3RlZChjdXJyZW50Rm9jdXMsIGJvb2xlYW4udG9nZ2xlKGN1cnJlbnRGb2N1cy5zZWxlY3RlZCkpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gaGFzVGFyZ2V0KCkgeyB0aGlzLnRhcmdldCA9IHRydWU7IH1cclxuZnVuY3Rpb24gbG9zdFRhcmdldCgpIHsgdGhpcy50YXJnZXQgPSBmYWxzZTsgfVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0OyIsImltcG9ydCBSb2xldHlwZSBmcm9tIFwiLi9Sb2xldHlwZVwiO1xyXG5cclxuLyoqXHJcbiAqIEBleHRlbmRzIFJvbGV0eXBlXHJcbiAqL1xyXG5jbGFzcyBTdHJ1Y3R1cmUgZXh0ZW5kcyBSb2xldHlwZSB7IH1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN0cnVjdHVyZTtcclxuIiwiaW1wb3J0IFJvbGV0eXBlIGZyb20gXCIuL1JvbGV0eXBlXCI7XHJcblxyXG4vKipcclxuICogQGV4dGVuZHMgUm9sZXR5cGVcclxuICovXHJcbmNsYXNzIFdpZGdldCBleHRlbmRzIFJvbGV0eXBlIHt9XHJcblxyXG5leHBvcnQgZGVmYXVsdCAgV2lkZ2V0O1xyXG4iLCJpbXBvcnQgUm9sZXR5cGUgZnJvbSBcIi4vUm9sZXR5cGVcIjtcclxuXHJcbi8qKlxyXG4gKiBAZXh0ZW5kcyBSb2xldHlwZVxyXG4gKi9cclxuY2xhc3MgV2luZG93IGV4dGVuZHMgUm9sZXR5cGUgeyB9XHJcblxyXG5leHBvcnQgZGVmYXVsdCBXaW5kb3c7XHJcbiIsImltcG9ydCBib29sZWFuIGZyb20gXCIuLy4uL3R5cGUvYm9vbGVhblwiO1xyXG5pbXBvcnQgZ2V0QWN0aXZlIGZyb20gXCIuLy4uL3V0aWxzL2dldEFjdGl2ZVwiO1xyXG5pbXBvcnQgSW5wdXQgZnJvbSBcIi4vYWJzdHJhY3QvSW5wdXRcIjtcclxuXHJcbi8qKlxyXG4gKiBAZXh0ZW5kcyBJbnB1dFxyXG4gKi9cclxuY2xhc3MgT3B0aW9uIGV4dGVuZHMgSW5wdXQge1xyXG5cclxuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XHJcblx0XHRzdXBlciguLi5hcmdzKTtcclxuXHJcblx0XHR0aGlzLmFkZExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vbkNsaWNrLmJpbmQodGhpcykpO1xyXG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKSwge2tleTogXCJlbnRlclwiLCB0YXJnZXQ6IGRvY3VtZW50fSk7XHJcblx0XHR0aGlzLmFkZExpc3RlbmVyKFwia2V5XCIsIHRoaXMub25DbGljay5iaW5kKHRoaXMpLCB7a2V5OiBcInNwYWNlXCIsIHRhcmdldDogZG9jdW1lbnR9KTtcclxuXHRcdC8vIHRoaXMuYWRkS2V5TGlzdGVuZXIoXCJFbnRlclwiLCBzZWxlY3RJdGVtLmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0b25DbGljayhldikge1xyXG5cdFx0aWYodHlwZW9mIHN1cGVyLm9uQ2xpY2sgPT0gXCJmdW5jdGlvblwiKSBzdXBlci5vbkNsaWNrKGV2KTtcclxuXHRcdGlmKGV2KSBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdGlmICh0aGlzID09IGdldEFjdGl2ZSgpKSB7XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWQgPSBib29sZWFuLnRvZ2dsZSh0aGlzLnNlbGVjdGVkKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9wdGlvbjsiLCJpbXBvcnQgVGV4dGJveCBmcm9tIFwiLi9UZXh0Ym94XCI7XG5cbi8qKlxuICogQGV4dGVuZHMgVGV4dGJveFxuICovXG5jbGFzcyBTZWFyY2hib3ggZXh0ZW5kcyBUZXh0Ym94IHtcblx0LyoqXG5cdCAqICMjIyMgRXhhbXBsZVxuXHQgKiBcblx0ICogPGRpdiByb2xlPVwic2VhcmNoYm94XCIgY29udGVudGVkaXRhYmxlPjwvZGl2PlxuXHQgKiBcblx0ICogYGBgaHRtbFxuXHQgKiA8ZGl2IHJvbGU9XCJzZWFyY2hib3hcIiBjb250ZW50ZWRpdGFibGU+PC9kaXY+XG5cdCAqIGBgYFxuXHQgKiBcblx0ICogQHBhcmFtIHsqfSBhcmdzIFxuXHQgKi9cblx0Y29uc3RydWN0b3IoLi4uYXJncykgeyBzdXBlciguLi5hcmdzKTsgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hib3g7IiwiaW1wb3J0IGVsZW1lbnRzIGZyb20gXCIuLi91dGlscy9lbGVtZW50c1wiO1xuXG4vLyBUeXBlc1xuaW1wb3J0IERPTVN0cmluZyBmcm9tIFwiLi9ET01TdHJpbmdcIjtcbmltcG9ydCBBY2Nlc3NpYmxlTm9kZUxpc3QgZnJvbSBcIi4vQWNjZXNzaWJsZU5vZGVMaXN0XCI7XG5pbXBvcnQgYm9vbGVhbiBmcm9tIFwiLi9ib29sZWFuXCI7XG5pbXBvcnQgZG91YmxlIGZyb20gXCIuL2RvdWJsZVwiO1xuaW1wb3J0IGxvbmcgZnJvbSBcIi4vbG9uZ1wiO1xuXG5cbmZ1bmN0aW9uIG11dGF0aW9uT2JzZXJ2ZXJDYWxsYmFjayhtdXRhdGlvbnMpIHtcblx0bXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24gKG11dGF0aW9uKSB7XG5cdFx0aWYgKG11dGF0aW9uLnR5cGUgPT0gXCJhdHRyaWJ1dGVzXCIpIHtcblx0XHRcdGxldCBhdHRyTmFtZSA9IG11dGF0aW9uLmF0dHJpYnV0ZU5hbWU7XG5cdFx0XHQvLyB1cGRhdGUgdG8gbmV3IHZhbHVlXG5cdFx0XHR0aGlzLl8ucmF3QXR0cnNbYXR0ck5hbWVdID0gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyTmFtZSk7XG5cdFx0fVxuXG5cdFx0bGV0IGxpc3RlbmVycyA9IHRoaXMuXy5saXN0ZW5lcnMuZ2V0KFwibXV0YXRpb25cIik7XG5cdFx0Y29uc29sZS5sb2cobGlzdGVuZXJzKTtcblx0fS5iaW5kKHRoaXMpKTtcbn1cblxuLyoqXG4gKiBCYXNlZCBvbiB0aGUgQU9NIHNwZWNcbiAqIEBjbGFzc1xuICovXG5jbGFzcyBBY2Nlc3NpYmxlTm9kZSB7XG5cdGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcblx0XHQvLyBzdG9yZSB0aGUgZWxlbWVudCB3aGVyZSB0aGUgQWNjZXNzaWJsZU5vZGUgaXMgcmV0cmlldmVkIGZyb21cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJlbGVtZW50XCIsIHsgdmFsdWU6IGVsZW1lbnQgfSk7XG5cblx0XHQvLyBjbGVhbiBvcHRpb25zIG9iamVjdFxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcIl9cIiwgeyB2YWx1ZTogeyBtdXRhdGlvbnM6IFtdLCByYXdBdHRyczoge319fSk7XG5cblx0XHQvLyBhZGQgYWxsIGFyaWEtKiBhdHRyaWJ1dGVzIGFuZCByb2xlIGF0dHJpYnV0ZSB0byB0aGUgb2JzZXJ2ZXJcblx0XHR0aGlzLl8ubXV0YXRpb25zID0gW1wicm9sZVwiLCBcImFyaWEtYWN0aXZlZGVzY2VuZGFudFwiLCBcImFyaWEtYXRvbWljXCIsIFwiYXJpYS1hdXRvY29tcGxldGVcIixcblx0XHRcdFwiYXJpYS1idXN5XCIsIFwiYXJpYS1jaGVja2VkXCIsIFwiYXJpYS1jb2xjb3VudFwiLCBcImFyaWEtY29saW5kZXhcIiwgXCJhcmlhLWNvbHNwYW5cIiwgXCJhcmlhLWNvbnRyb2xzXCIsXG5cdFx0XHRcImFyaWEtY3VycmVudFwiLCBcImFyaWEtZGVzY3JpYmVkYnlcIiwgXCJhcmlhLWRldGFpbHNcIiwgXCJhcmlhLWRpc2FibGVkXCIsIFwiYXJpYS1kcm9wZWZmZWN0XCIsXG5cdFx0XHRcImFyaWEtZXJyb3JtZXNzYWdlXCIsIFwiYXJpYS1leHBhbmRlZFwiLCBcImFyaWEtZmxvd3RvXCIsIFwiYXJpYS1ncmFiYmVkXCIsIFwiYXJpYS1oYXNwb3B1cFwiLFxuXHRcdFx0XCJhcmlhLWhpZGRlblwiLCBcImFyaWEtaW52YWxpZFwiLCBcImFyaWEta2V5c2hvcnRjdXRzXCIsIFwiYXJpYS1sYWJlbFwiLCBcImFyaWEtbGFiZWxsZWRieVwiLFxuXHRcdFx0XCJhcmlhLWxldmVsXCIsIFwiYXJpYS1saXZlXCIsIFwiYXJpYS1tb2RhbFwiLCBcImFyaWEtbXVsdGlsaW5lXCIsIFwiYXJpYS1tdWx0aXNlbGVjdGFibGVcIixcblx0XHRcdFwiYXJpYS1vcmllbnRhdGlvblwiLCBcImFyaWEtb3duc1wiLCBcImFyaWEtcGxhY2Vob2xkZXJcIiwgXCJhcmlhLXBvc2luc2V0XCIsIFwiYXJpYS1wcmVzc2VkXCIsXG5cdFx0XHRcImFyaWEtcmVhZG9ubHlcIiwgXCJhcmlhLXJlbGV2YW50XCIsIFwiYXJpYS1yZXF1aXJlZFwiLCBcImFyaWEtcm9sZWRlc2NyaXB0aW9uXCIsIFwiYXJpYS1yb3djb3VudFwiLFxuXHRcdFx0XCJhcmlhLXJvd2luZGV4XCIsIFwiYXJpYS1yb3dzcGFuXCIsIFwiYXJpYS1zZWxlY3RlZFwiLCBcImFyaWEtc2V0c2l6ZVwiLCBcImFyaWEtc29ydFwiLCBcImFyaWEtdmFsdWVtYXhcIixcblx0XHRcdFwiYXJpYS12YWx1ZW1pblwiLCBcImFyaWEtdmFsdWVub3dcIiwgXCJhcmlhLXZhbHVldGV4dFwiXTtcblx0XHRjb25zb2xlLmxvZyh0aGlzLmVsZW1lbnQsIHsgYXR0cmlidXRlczogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBhdHRyaWJ1dGVGaWx0ZXI6IHRoaXMuXy5tdXRhdGlvbnMgfSk7XG5cdFx0Ly8gc3RhcnQgdGhlIG11dGF0aW9uIG9ic2VydmVyXG5cdFx0dmFyIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobXV0YXRpb25PYnNlcnZlckNhbGxiYWNrLmJpbmQodGhpcykpO1xuXHRcdG9ic2VydmVyLm9ic2VydmUoXG5cdFx0XHR0aGlzLmVsZW1lbnQsXG5cdFx0XHR7YXR0cmlidXRlczogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBhdHRyaWJ1dGVGaWx0ZXI6IHRoaXMuXy5tdXRhdGlvbnN9XG5cdFx0KTtcblxuXG5cdFx0LyogKioqKioqKioqKioqKioqKioqIEFDQ0VTU0lCTEUgTEFCRUwgQU5EIERFU0NSSVBUSU9OICoqKioqKioqKioqKioqKioqKiAqL1xuXHRcdFxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgYW4gbGlzdCB3aXRoIEFjY2Vzc2libGVOb2RlIGluc3RhbmNlcyB0aGF0IGxhYmVscyB0aGUgY3VycmVudCBlbGVtZW50XG5cdFx0ICogXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjZGVzY3JpYmVkQnl9XG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWxhYmVsbGVkYnlcblx0XHQgKiBAdHlwZSB7QWNjZXNzaWJsZU5vZGVMaXN0fVxuXHRcdCAqL1xuXHRcdHRoaXMubGFiZWxsZWRCeSA9IG5ldyBBY2Nlc3NpYmxlTm9kZUxpc3QodGhpcywgXCJhcmlhLWxhYmVsbGVkQnlcIik7XG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIGFuIGxpc3Qgd2l0aCBBY2Nlc3NpYmxlTm9kZSBpbnN0YW5jZXMgdGhhdCBkZXNjcmliZXMgdGhlIGN1cnJlbnQgZWxlbWVudFxuXHRcdCAqIFxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI2xhYmVsZWRCeX1cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtZGVzY3JpYmVkYnlcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEB0eXBlIHtBY2Nlc3NpYmxlTm9kZUxpc3R9XG5cdFx0ICovXG5cdFx0dGhpcy5kZXNjcmliZWRCeSA9IG5ldyBBY2Nlc3NpYmxlTm9kZUxpc3QodGhpcywgXCJhcmlhLWRlc2NyaWJlZEJ5XCIpO1xuXG5cdFx0LyogKioqKioqKioqKioqKiogRU5EIE9GIEFDQ0VTU0lCTEUgTEFCRUwgQU5EIERFU0NSSVBUSU9OICoqKioqKioqKioqKioqICovXG5cblx0XHQvKiAqKioqKioqKioqKioqKioqKioqKioqKiogT1RIRVIgUkVMQVRJT05TSElQUyAqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgYW4gbGlzdCB3aXRoIEFjY2Vzc2libGVOb2RlIGluc3RhbmNlcyB3aG9zZSBjb250ZW50cyBvciBwcmVzZW5jZSBhcmUgY29udHJvbGxlZCBieVxuXHRcdCAqIHRoZSBjdXJyZW50IGVsZW1lbnQuXG5cdFx0ICogXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjb3duc31cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtY29udHJvbHNcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEB0eXBlIHtBY2Nlc3NpYmxlTm9kZUxpc3R9XG5cdFx0ICovXG5cdFx0dGhpcy5jb250cm9scyA9IG5ldyBBY2Nlc3NpYmxlTm9kZUxpc3QodGhpcywgXCJhcmlhLWNvbnRyb2xzXCIpO1xuXG5cdFx0LyoqXG5cdFx0ICogQ29udGFpbnMgdGhlIG5leHQgZWxlbWVudChzKSBpbiBhbiBhbHRlcm5hdGUgcmVhZGluZyBvcmRlciBvZiBjb250ZW50IHdoaWNoLCBhdCB0aGUgdXNlcidzIFxuXHRcdCAqIGRpc2NyZXRpb24sIGFsbG93cyBhc3Npc3RpdmUgdGVjaG5vbG9neSB0byBvdmVycmlkZSB0aGUgZ2VuZXJhbCBkZWZhdWx0IG9mIHJlYWRpbmcgaW5cblx0XHQgKiBkb2N1bWVudCBzb3VyY2Ugb3JkZXIuXG5cdFx0ICogXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWZsb3d0b1xuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHR5cGUge0FjY2Vzc2libGVOb2RlTGlzdH1cblx0XHQgKi9cblx0XHR0aGlzLmZsb3dUbyA9IG5ldyBBY2Nlc3NpYmxlTm9kZUxpc3QodGhpcywgXCJhcmlhLWZsb3d0b1wiKTtcblxuXHRcdC8qKlxuXHRcdCAqIENvbnRhaW5zIGNoaWxkcmVuIHdobydzIElEIGFyZSByZWZlcmVuY2VkIGluc2lkZSB0aGUgYGFyaWEtb3duc2AgYXR0cmlidXRlXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLW93bnNcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEB0eXBlIHtBY2Nlc3NpYmxlTm9kZUxpc3R9XG5cdFx0ICovXG5cdFx0dGhpcy5vd25zID0gbmV3IEFjY2Vzc2libGVOb2RlTGlzdCh0aGlzLCBcImFyaWEtb3duc1wiKTtcblx0XHRcblx0XHQvKiAqKioqKioqKioqKioqKioqKioqKiogRU5EIE9GIE9USEVSIFJFTEFUSU9OU0hJUFMgKioqKioqKioqKioqKioqKioqKioqICovXG5cdH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoQWNjZXNzaWJsZU5vZGUucHJvdG90eXBlLCBcblx0LyoqIEBsZW5kcyBBY2Nlc3NpYmxlTm9kZS5wcm90b3R5cGUgKi9cblx0e1xuXHRcdC8qKiBcblx0XHQqIERlZmluZXMgYSB0eXBlIGl0IHJlcHJlc2VudHMsIGUuZy4gYHRhYmBcblx0XHQqIFxuXHRcdCogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNyb2xlc1xuXHRcdCogQHR5cGUgIHs/U3RyaW5nfVxuXHRcdCovXG5cdFx0XCJyb2xlXCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQoc3RyKSB7IHJldHVybiBET01TdHJpbmcuc2V0KHRoaXMsIFwicm9sZVwiLCBzdHIpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gRE9NU3RyaW5nLmdldCh0aGlzLCBcInJvbGVcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqIFxuXHRcdCAqIERlZmluZXMgYSBodW1hbi1yZWFkYWJsZSwgYXV0aG9yLWxvY2FsaXplZCBkZXNjcmlwdGlvbiBmb3IgdGhlIHJvbGVcblx0XHQgKiBcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtcm9sZWRlc2NyaXB0aW9uXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAdHlwZSB7P1N0cmluZ31cblx0XHQgKi9cblx0XHRcInJvbGVEZXNjcmlwdGlvblwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHN0cikgeyByZXR1cm4gRE9NU3RyaW5nLnNldCh0aGlzLCBcImFyaWEtcm9sZURlc2NyaXB0aW9uXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1yb2xlRGVzY3JpcHRpb25cIik7IH1cblx0XHR9LFxuXG5cdFx0LyogKioqKioqKioqKioqKioqKioqKiBBQ0NFU1NJQkxFIExBQkVMIEFORCBERVNDUklQVElPTiAqKioqKioqKioqKioqKioqKioqICovXG5cdFxuXHRcdC8qKiBcblx0XHQqIERlZmluZXMgYSBzdHJpbmcgdmFsdWUgdGhhdCBsYWJlbHMgdGhlIGN1cnJlbnQgZWxlbWVudC5cblx0XHQqIFxuXHRcdCogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWxhYmVsXG5cdFx0KiBAdHlwZSB7P1N0cmluZ30gXG5cdFx0Ki9cblx0XHRcImxhYmVsXCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQoc3RyKSB7IHJldHVybiBET01TdHJpbmcuc2V0KHRoaXMsIFwiYXJpYS1sYWJlbFwiLCBzdHIpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gRE9NU3RyaW5nLmdldCh0aGlzLCBcImFyaWEtbGFiZWxcIik7IH1cblx0XHR9LFxuXG5cdFx0LyogKioqKioqKioqKioqKioqIEVORCBPRiBBQ0NFU1NJQkxFIExBQkVMIEFORCBERVNDUklQVElPTiAqKioqKioqKioqKioqKiogKi9cblx0XG5cdFx0LyogKioqKioqKioqKioqKioqKioqKioqIEdMT0JBTCBTVEFURVMgQU5EIFBST1BFUlRJRVMgKioqKioqKioqKioqKioqKioqKioqICovXG5cblx0XHQvKiogXG5cdFx0ICogSW5kaWNhdGVzIHRoZSBlbGVtZW50IHRoYXQgcmVwcmVzZW50cyB0aGUgY3VycmVudCBpdGVtIHdpdGhpbiBhIGNvbnRhaW5lciBvciBzZXQgb2YgcmVsYXRlZCBlbGVtZW50cy5cblx0XHQgKiBcblx0XHQgKiBQb3NzaWJsZSBzdHJpbmdzIGFyZTpcblx0XHQgKiAqIGBwYWdlYCwgdXNlZCB0byBpbmRpY2F0ZSBhIGxpbmsgd2l0aGluIGEgc2V0IG9mIHBhZ2luYXRpb24gbGlua3MsIFxuXHRcdCAqIFx0XHR3aGVyZSB0aGUgbGluayBpcyB2aXN1YWxseSBzdHlsZWQgdG8gcmVwcmVzZW50IHRoZSBjdXJyZW50bHktZGlzcGxheWVkIHBhZ2UuXG5cdFx0ICogKiBgc3RlcGAsIHVzZWQgdG8gaW5kaWNhdGUgYSBsaW5rIHdpdGhpbiBhIHN0ZXAgaW5kaWNhdG9yIGZvciBhIHN0ZXAtYmFzZWQgcHJvY2Vzcyxcblx0XHQgKiBcdFx0d2hlcmUgdGhlIGxpbmsgaXMgdmlzdWFsbHkgc3R5bGVkIHRvIHJlcHJlc2VudCB0aGUgY3VycmVudCBzdGVwLlxuXHRcdCAqICogYGxvY2F0aW9uYCwgdXNlZCB0byBpbmRpY2F0ZSB0aGUgaW1hZ2UgdGhhdCBpcyB2aXN1YWxseSBoaWdobGlnaHRlZCBhcyB0aGUgY3VycmVudCBjb21wb25lbnQgb2YgYSBmbG93IGNoYXJ0LlxuXHRcdCAqICogYGRhdGVgLCB1c2VkIHRvIGluZGljYXRlIHRoZSBjdXJyZW50IGRhdGUgd2l0aGluIGEgY2FsZW5kYXIuXG5cdFx0ICogKiBgdGltZWAsIHVzZWQgdG8gaW5kaWNhdGUgdGhlIGN1cnJlbnQgdGltZSB3aXRoaW4gYSB0aW1ldGFibGUuXG5cdFx0ICogXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWN1cnJlbnRcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEB0eXBlIHs/U3RyaW5nfVxuXHRcdCAqL1xuXHRcdFwiY3VycmVudFwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHN0cikgeyByZXR1cm4gRE9NU3RyaW5nLnNldCh0aGlzLCBcImFyaWEtY3VycmVudFwiLCBzdHIpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gRE9NU3RyaW5nLmdldCh0aGlzLCBcImFyaWEtY3VycmVudFwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKiAqKioqKioqKioqKioqKioqKiBFTkQgT0YgR0xPQkFMIFNUQVRFUyBBTkQgUFJPUEVSVElFUyAqKioqKioqKioqKioqKioqKiAqL1xuXG5cdFx0LyogKioqKioqKioqKioqKioqKioqKioqKioqKiogV0lER0VUIFBST1BFUlRJRVMgKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuXHRcdC8qKlxuXHRcdCAqIEluZGljYXRlcyB3aGV0aGVyIGlucHV0dGluZyB0ZXh0IGNvdWxkIHRyaWdnZXIgZGlzcGxheSBvZiBvbmUgb3IgbW9yZSBwcmVkaWN0aW9ucyBvZiB0aGUgdXNlcidzXG5cdFx0ICogaW50ZW5kZWQgdmFsdWUgZm9yIGFuIGlucHV0IGFuZCBzcGVjaWZpZXMgaG93IHByZWRpY3Rpb25zIHdvdWxkIGJlIHByZXNlbnRlZCBpZiB0aGV5IGFyZSBtYWRlLlxuXHRcdCAqIFxuXHRcdCAqIFRoZSBiZWhhdmlvciBkdXJpbmcgaW5wdXQgaXMgZGVwZW5kcyBvbiB0aGUgcHJvdmlkZWQgdmFsdWUsIGl0IGZvbGxvd3MgYmVuZWF0aCB0YWJsZS5cblx0XHQgKiBcblx0XHQgKiB8IFZhbHVlICB8IFx0RGVzY3JpcHRpb24gfFxuXHRcdCAqIHwgLS0tLS0tIHwgLS0tIHxcblx0XHQgKiB8IGlubGluZSB8IFRleHQgc3VnZ2VzdGluZyBtYXkgYmUgZHluYW1pY2FsbHkgaW5zZXJ0ZWQgYWZ0ZXIgdGhlIGNhcmV0LlxuXHRcdCAqIHwgbGlzdCAgIHwgQSBjb2xsZWN0aW9uIG9mIHZhbHVlcyB0aGF0IGNvdWxkIGNvbXBsZXRlIHRoZSBwcm92aWRlZCBpbnB1dCBpcyBkaXNwbGF5ZWQuXG5cdFx0ICogfCBib3RoICAgfCBJbXBsZW1lbnRzIGBpbmxpbmVgIGFuZCBgbGlzdGBcblx0XHQgKiB8IG5vbmUgICB8IE5vIHByZWRpY3Rpb24gaXMgc2hvd25cblx0XHQgKiBcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtYXV0b2NvbXBsZXRlXG5cdFx0ICogQHR5cGUgez9TdHJpbmd9XG5cdFx0ICovXG5cdFx0XCJhdXRvY29tcGxldGVcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJhcmlhLWF1dG9jb21wbGV0ZVwiLCBzdHIpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gRE9NU3RyaW5nLmdldCh0aGlzLCBcImFyaWEtYXV0b2NvbXBsZXRlXCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMvc2V0cyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgZWxlbWVudCB3aG8gaXMgZXhwb3NlZCB0byBhbiBhY2Nlc3NpYmlsaXR5IEFQSS5cblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNkaXNhYmxlZH1cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtaGlkZGVuXG5cdFx0ICogQHR5cGUgez9Cb29sZWFufVxuXHRcdCAqL1xuXHRcdFwiaGlkZGVuXCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQoc3RyKSB7IHJldHVybiBib29sZWFuLnNldCh0aGlzLCBcImFyaWEtaGlkZGVuXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBib29sZWFuLmdldCh0aGlzLCBcImFyaWEtaGlkZGVuXCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEluZGljYXRlcyBrZXlib2FyZCBzaG9ydGN1dHMgdGhhdCBhbiBhdXRob3IgaGFzIGltcGxlbWVudGVkIHRvIGFjdGl2YXRlIG9yXG5cdFx0ICogZ2l2ZSBmb2N1cyB0byBhbiBlbGVtZW50LlxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1rZXlzaG9ydGN1dHNcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEB0eXBlIHs/U3RyaW5nfVxuXHRcdCAqL1xuXHRcdFwia2V5U2hvcnRjdXRzXCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQoc3RyKSB7IHJldHVybiBET01TdHJpbmcuc2V0KHRoaXMsIFwiYXJpYS1rZXlTaG9ydGN1dHNcIiwgc3RyKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIERPTVN0cmluZy5nZXQodGhpcywgXCJhcmlhLWtleVNob3J0Y3V0c1wiKTsgfVxuXHRcdH0sXG5cblx0XHQvKiogXG5cdFx0ICogSW5kaWNhdGVzIHdoZXRoZXIgYW4gZWxlbWVudCBpcyBtb2RhbCB3aGVuIGRpc3BsYXllZC5cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtbW9kYWxcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEB0eXBlIHs/Qm9vbGVhbn1cblx0XHQgKi9cblx0XHRcIm1vZGFsXCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQoc3RyKSB7IHJldHVybiBib29sZWFuLnNldCh0aGlzLCBcImFyaWEtbW9kYWxcIiwgc3RyKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGJvb2xlYW4uZ2V0KHRoaXMsIFwiYXJpYS1tb2RhbFwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKiogXG5cdFx0ICogSW5kaWNhdGVzIHdoZXRoZXIgYSB0ZXh0IGJveCBhY2NlcHRzIG11bHRpcGxlIGxpbmVzIG9mIGlucHV0IG9yIG9ubHkgYSBzaW5nbGUgbGluZS5cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtbXVsdGlsaW5lXG5cdFx0ICogQHR5cGUgez9Cb29sZWFufVxuXHRcdCAqL1xuXHRcdFwibXVsdGlsaW5lXCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQoc3RyKSB7IHJldHVybiBib29sZWFuLnNldCh0aGlzLCBcImFyaWEtbXVsdGlsaW5lXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBib29sZWFuLmdldCh0aGlzLCBcImFyaWEtbXVsdGlsaW5lXCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEluZGljYXRlcyB0aGF0IHRoZSB1c2VyIG1heSBzZWxlY3QgbW9yZSB0aGFuIG9uZSBpdGVtIGZyb20gdGhlIGN1cnJlbnQgc2VsZWN0YWJsZSBkZXNjZW5kYW50cy5cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtbXVsdGlzZWxlY3RhYmxlXG5cdFx0ICogQHR5cGUgez9Cb29sZWFufVxuXHRcdCAqL1xuXHRcdFwibXVsdGlzZWxlY3RhYmxlXCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQoc3RyKSB7IHJldHVybiBib29sZWFuLnNldCh0aGlzLCBcImFyaWEtbXVsdGlzZWxlY3RhYmxlXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBib29sZWFuLmdldCh0aGlzLCBcImFyaWEtbXVsdGlzZWxlY3RhYmxlXCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBlbGVtZW50J3Mgb3JpZW50YXRpb24gaXMgYGhvcml6b250YWxgLCBgdmVydGljYWxgLCBvciBgbnVsbGAuXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLW9yaWVudGF0aW9uXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAdHlwZSB7P1N0cmluZ31cblx0XHQgKi9cblx0XHRcIm9yaWVudGF0aW9uXCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQoc3RyKSB7IHJldHVybiBET01TdHJpbmcuc2V0KHRoaXMsIFwiYXJpYS1vcmllbnRhdGlvblwiLCBzdHIpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gRE9NU3RyaW5nLmdldCh0aGlzLCBcImFyaWEtb3JpZW50YXRpb25cIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogSW5kaWNhdGVzIHRoYXQgdGhlIHVzZXIgbWF5IHNlbGVjdCBtb3JlIHRoYW4gb25lIGl0ZW0gZnJvbSB0aGUgY3VycmVudCBzZWxlY3RhYmxlIGRlc2NlbmRhbnRzLlxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1yZWFkb25seVxuXHRcdCAqIEB0eXBlIHs/Qm9vbGVhbn1cblx0XHQgKi9cblx0XHRcInJlYWRPbmx5XCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQoc3RyKSB7IHJldHVybiBib29sZWFuLnNldCh0aGlzLCBcImFyaWEtcmVhZE9ubHlcIiwgc3RyKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGJvb2xlYW4uZ2V0KHRoaXMsIFwiYXJpYS1yZWFkT25seVwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBJbmRpY2F0ZXMgdGhhdCB1c2VyIGlucHV0IGlzIHJlcXVpcmVkIG9uIHRoZSBlbGVtZW50IGJlZm9yZSBhIGZvcm0gbWF5IGJlIHN1Ym1pdHRlZC5cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtcmVxdWlyZWRcblx0XHQgKiBAdHlwZSB7P0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0XCJyZXF1aXJlZFwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHN0cikgeyByZXR1cm4gYm9vbGVhbi5zZXQodGhpcywgXCJhcmlhLXJlcXVpcmVkXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBib29sZWFuLmdldCh0aGlzLCBcImFyaWEtcmVxdWlyZWRcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogSW5kaWNhdGVzIHRoYXQgdXNlciBpbnB1dCBpcyByZXF1aXJlZCBvbiB0aGUgZWxlbWVudCBiZWZvcmUgYSBmb3JtIG1heSBiZSBzdWJtaXR0ZWQuXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXNlbGVjdGVkXG5cdFx0ICogQHR5cGUgez9Cb29sZWFufVxuXHRcdCAqL1xuXHRcdFwic2VsZWN0ZWRcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIGJvb2xlYW4uc2V0KHRoaXMsIFwiYXJpYS1zZWxlY3RlZFwiLCBzdHIpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gYm9vbGVhbi5nZXQodGhpcywgXCJhcmlhLXNlbGVjdGVkXCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEluZGljYXRlcyBpZiBpdGVtcyBpbiBhIHRhYmxlIG9yIGdyaWQgYXJlIHNvcnRlZCBpbiBhc2NlbmRpbmcgb3IgZGVzY2VuZGluZyBvcmRlci4gIFxuXHRcdCAqIFBvc3NpYmxlIHZhbHVlcyBhcmUgYGFjZW5kaW5nYCwgYGRlc2NlbmRpbmdgLCBgbm9uZWAsIGBvdGhlcmAgb3IgYG51bGxgLlxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1zb3J0XG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAdHlwZSB7P0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0XCJzb3J0XCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQoc3RyKSB7IHJldHVybiBET01TdHJpbmcuc2V0KHRoaXMsIFwiYXJpYS1zb3J0XCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1zb3J0XCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qICoqKioqKioqKioqKioqKioqKioqKioqIEVORCBPRiBXSURHRVQgUFJPUEVSVElFUyAqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5cblx0XHQvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiBXSURHRVQgU1RBVEVTICoqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuXHRcdC8qKlxuXHRcdCAqIEluZGljYXRlcyB0aGUgY3VycmVudCBcImNoZWNrZWRcIiBzdGF0ZSBvZiBhIHtAbGluayBXaWRnZXR9LCBhbW9uZyB7QGxpbmsgUmFkaW99IGFuZCB7QGxpbmsgQ2hlY2tib3h9XG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjcHJlc3NlZH1cblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNzZWxlY3RlZH1cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtcHJlc3NlZFxuXHRcdCAqIEB0eXBlIHs/U3RyaW5nfVxuXHRcdCAqL1xuXHRcdFwiY2hlY2tlZFwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHN0cikgeyByZXR1cm4gRE9NU3RyaW5nLnNldCh0aGlzLCBcImFyaWEtY2hlY2tlZFwiLCBzdHIpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gRE9NU3RyaW5nLmdldCh0aGlzLCBcImFyaWEtY2hlY2tlZFwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgZWxlbWVudCwgb3IgYW5vdGhlciBncm91cGluZyBlbGVtZW50IGl0IGNvbnRyb2xzLCBcblx0XHQgKiBpcyBjdXJyZW50bHkgZXhwYW5kZWQgb3IgY29sbGFwc2VkLlxuXHRcdCAqIFxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1leHBhbmRlZFxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHR5cGUgez9Cb29sZWFufVxuXHRcdCAqL1xuXHRcdFwiZXhwYW5kZWRcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIGJvb2xlYW4uc2V0KHRoaXMsIFwiYXJpYS1leHBhbmRlZFwiLCBzdHIpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gYm9vbGVhbi5nZXQodGhpcywgXCJhcmlhLWV4cGFuZGVkXCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEluZGljYXRlcyB0aGF0IHRoZSBlbGVtZW50IGlzIHBlcmNlaXZhYmxlIGJ1dCBkaXNhYmxlZCwgc28gaXQgaXMgbm90IGVkaXRhYmxlIG9yIG90aGVyd2lzZSBvcGVyYWJsZS5cblx0XHQgKiBcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNoaWRkZW59XG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjcmVhZG9ubHl9XG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWRpc2FibGVkXG5cdFx0ICogQHR5cGUgez9Cb29sZWFufVxuXHRcdCAqL1xuXHRcdFwiZGlzYWJsZWRcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIGJvb2xlYW4uc2V0KHRoaXMsIFwiYXJpYS1kaXNhYmxlZFwiLCBzdHIpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gYm9vbGVhbi5nZXQodGhpcywgXCJhcmlhLWRpc2FibGVkXCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEluZGljYXRlcyB0aGUgZW50ZXJlZCB2YWx1ZSBkb2VzIG5vdCBjb25mb3JtIHRvIHRoZSBmb3JtYXQgZXhwZWN0ZWQgYnkgdGhlIGFwcGxpY2F0aW9uLlxuXHRcdCAqIFxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI2Vycm9yTWVzc2FnZX1cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtZXJyb3JtZXNzYWdlXG5cdFx0ICogQHR5cGUgez9TdHJpbmd9IFxuXHRcdCAqL1xuXHRcdFwiaW52YWxpZFwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHN0cikgeyByZXR1cm4gRE9NU3RyaW5nLnNldCh0aGlzLCBcImFyaWEtaW52YWxpZFwiLCBzdHIpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gRE9NU3RyaW5nLmdldCh0aGlzLCBcImFyaWEtaW52YWxpZFwiKTsgfVxuXHRcdH0sXG5cblxuXHRcdC8qKlxuXHRcdCAqIEluZGljYXRlcyB0aGUgYXZhaWxhYmlsaXR5IGFuZCB0eXBlIG9mIGludGVyYWN0aXZlIHBvcHVwIGVsZW1lbnQsIHN1Y2ggYXMgbWVudSBvciBkaWFsb2csXG5cdFx0ICogdGhhdCBjYW4gYmUgdHJpZ2dlcmVkIGJ5IGFuIGVsZW1lbnQuXG5cdFx0ICogXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWhhc3BvcHVwXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAdHlwZSB7P1N0cmluZ31cblx0XHQgKi9cblx0XHRcImhhc1BvcFVwXCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQoc3RyKSB7IHJldHVybiBET01TdHJpbmcuc2V0KHRoaXMsIFwiYXJpYS1oYXNwb3B1cFwiLCBzdHIpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gRE9NU3RyaW5nLmdldCh0aGlzLCBcImFyaWEtaGFzcG9wdXBcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogSW5kaWNhdGVzIHRoZSBjdXJyZW50IFwiY2hlY2tlZFwiIHN0YXRlIG9mIGEge0BsaW5rIFdpZGdldH0sIGFtb25nIHtAbGluayBSYWRpb30gYW5kIHtAbGluayBDaGVja2JveH1cblx0XHQgKiBcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNwcmVzc2VkfVxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI3NlbGVjdGVkfVxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1wcmVzc2VkXG5cdFx0ICogQHR5cGUgez9TdHJpbmd9XG5cdFx0ICovXG5cdFx0XCJwcmVzc2VkXCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQoc3RyKSB7IHJldHVybiBET01TdHJpbmcuc2V0KHRoaXMsIFwiYXJpYS1wcmVzc2VkXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1wcmVzc2VkXCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qICoqKioqKioqKioqKioqKioqKioqKioqKiogRU5EIE9GIFdJREdFVCBTVEFURVMgKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5cblx0XHQvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqIENPTlRST0wgVkFMVUVTICoqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuXHRcdC8qKiBcblx0XHQgKiBSZXR1cm5zIC8gc2V0cyB0aGUgaHVtYW4gcmVhZGFibGUgdGV4dCBhbHRlcm5hdGl2ZSBvZiB7QGxpbmsgI2FyaWEtdmFsdWVub3d9IGZvciBhIHtAbGluayBSYW5nZX0gd2lkZ2V0LlxuXHRcdCAqIFxuXHRcdCAqIEBzZWUge0BsaW5rIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtdmFsdWV0ZXh0fVxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHR5cGUgez9TdHJpbmd9XG5cdFx0ICovXG5cdFx0XCJ2YWx1ZVRleHRcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJhcmlhLXZhbHVlVGV4dFwiLCBzdHIpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gRE9NU3RyaW5nLmdldCh0aGlzLCBcImFyaWEtdmFsdWVUZXh0XCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgLyBzZXRzIGEgc2hvcnQgaGludCBpbnRlbmRlZCB0byBhaWQgdGhlIHVzZXIgd2l0aCBkYXRhIGVudHJ5IHdoZW4gdGhlIGNvbnRyb2wgaGFzIG5vIHZhbHVlLlxuXHRcdCAqIEEgaGludCBjb3VsZCBiZSBhIHNhbXBsZSB2YWx1ZSBvciBhIGJyaWVmIGRlc2NyaXB0aW9uIG9mIHRoZSBleHBlY3RlZCBmb3JtYXQuXG5cdFx0ICogXG5cdFx0ICogQHNlZSB7QGxpbmsgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1wbGFjZWhvbGRlcn1cblx0XHQgKiBAdHlwZSB7P1N0cmluZ31cblx0XHQgKi9cblx0XHRcInBsYWNlaG9sZGVyXCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQoc3RyKSB7IHJldHVybiBET01TdHJpbmcuc2V0KHRoaXMsIFwiYXJpYS1wbGFjZWhvbGRlclwiLCBzdHIpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gRE9NU3RyaW5nLmdldCh0aGlzLCBcImFyaWEtcGxhY2Vob2xkZXJcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqIFxuXHRcdCAqIFJldHVybnMgLyBzZXRzIHRoZSBjdXJyZW50IHZhbHVlIGZvciBhIHtAbGluayBSYW5nZX0gd2lkZ2V0LlxuXHRcdCAqIFxuXHRcdCAqIEBzZWUge0BsaW5rIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtdmFsdWVub3d9XG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAdHlwZSB7P051bWJlcn1cblx0XHQgKi9cblx0XHRcInZhbHVlTm93XCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQodmFsKSB7IHJldHVybiBkb3VibGUuc2V0KHRoaXMsIFwiYXJpYS12YWx1ZW5vd1wiLCB2YWwpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gZG91YmxlLmdldCh0aGlzLCBcImFyaWEtdmFsdWVub3dcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqIFxuXHRcdCAqIFJldHVybnMgLyBzZXRzIHRoZSBtaW5pbXVtIGFsbG93ZWQgdmFsdWUgZm9yIGEge0BsaW5rIFJhbmdlfSB3aWRnZXQuXG5cdFx0ICogXG5cdFx0ICogQHNlZSB7QGxpbmsgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS12YWx1ZW1pbn1cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEB0eXBlIHs/TnVtYmVyfVxuXHRcdCAqL1xuXHRcdFwidmFsdWVNaW5cIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldCh2YWwpIHsgcmV0dXJuIGRvdWJsZS5zZXQodGhpcywgXCJhcmlhLXZhbHVlbWluXCIsIHZhbCk7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBkb3VibGUuZ2V0KHRoaXMsIFwiYXJpYS12YWx1ZW1pblwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKiogXG5cdFx0ICogUmV0dXJucyAvIHNldHMgdGhlIG1heGltdW0gYWxsb3dlZCB2YWx1ZSBmb3IgYSB7QGxpbmsgUmFuZ2V9IHdpZGdldC5cblx0XHQgKiBcblx0XHQgKiBAc2VlIHtAbGluayBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXZhbHVlbWF4fVxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHR5cGUgez9OdW1iZXJ9XG5cdFx0ICovXG5cdFx0XCJ2YWx1ZU1heFwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHZhbCkgeyByZXR1cm4gZG91YmxlLnNldCh0aGlzLCBcImFyaWEtdmFsdWVtYXhcIiwgdmFsKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGRvdWJsZS5nZXQodGhpcywgXCJhcmlhLXZhbHVlbWF4XCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qICoqKioqKioqKioqKioqKioqKioqKioqKiBFTkQgT0YgQ09OVFJPTCBWQUxVRVMgKioqKioqKioqKioqKioqKioqKioqKioqICovXG5cblx0XHQvKiAqKioqKioqKioqKioqKioqKioqKioqKioqIE9USEVSIFJFTEFUSU9OU0hJUFMgKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyAvIHNldHMgdGhlIEFjY2Vzc2libGVOb2RlIG9mIHRoZSBjdXJyZW50bHkgYWN0aXZlIGVsZW1lbnQgd2hlbiBmb2N1cyBpcyBvbiBjdXJyZW50IGVsZW1lbnQuXG5cdFx0ICogXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWFjdGl2ZWRlc2NlbmRhbnRcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEB0eXBlIHs/QWNjY2Vzc2libGVOb2RlfVxuXHRcdCAqL1xuXHRcdFwiYWN0aXZlRGVzY2VuZGFudFwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KGF5KSB7IHJldHVybiBzZXRBY2Nlc3NpYmxlTm9kZSh0aGlzLCBcImFyaWEtYWN0aXZlZGVzY2VuZGFudFwiLCBheSk7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBnZXRBY2Nlc3NpYmxlTm9kZSh0aGlzLCBcImFyaWEtYWN0aXZlZGVzY2VuZGFudFwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIC8gc2V0cyBhbiBBY2Nlc3NpYmxlTm9kZSB0aGF0IHByb3ZpZGVzIGEgZGV0YWlsZWQsIGV4dGVuZGVkIGRlc2NyaXB0aW9uIFxuXHRcdCAqIGZvciB0aGUgY3VycmVudCBlbGVtZW50LlxuXHRcdCAqIFxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI2Rlc2NyaWJlZEJ5fVxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1kZXRhaWxzXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAdHlwZSB7P0FjY2Nlc3NpYmxlTm9kZX1cblx0XHQgKi9cblx0XHRcImRldGFpbHNcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChheSkgeyByZXR1cm4gc2V0QWNjZXNzaWJsZU5vZGUodGhpcywgXCJhcmlhLWRldGFpbHNcIiwgYXkpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gZ2V0QWNjZXNzaWJsZU5vZGUodGhpcywgXCJhcmlhLWRldGFpbHNcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyAvIHNldHMgYW4gQWNjZXNzaWJsZU5vZGUgdGhhdCBwcm92aWRlcyBhbiBlcnJvciBtZXNzYWdlIGZvciB0aGUgY3VycmVudCBlbGVtZW50LlxuXHRcdCAqIFxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI2ludmFsaWR9XG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjZGVzY3JpYmVkQnl9XG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWVycm9ybWVzc2FnZVxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHR5cGUgez9BY2NjZXNzaWJsZU5vZGV9XG5cdFx0ICovXG5cdFx0XCJlcnJvck1lc3NhZ2VcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChheSkgeyByZXR1cm4gc2V0QWNjZXNzaWJsZU5vZGUodGhpcywgXCJhcmlhLWVycm9ybWVzc2FnZVwiLCBheSk7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBnZXRBY2Nlc3NpYmxlTm9kZSh0aGlzLCBcImFyaWEtZXJyb3JtZXNzYWdlXCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qICoqKioqKioqKioqKioqKioqKioqKiogRU5EIE9GIE9USEVSIFJFTEFUSU9OU0hJUFMgKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5cdFx0LyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogQ09MTEVDVElPTlMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgLyBzZXRzIHRoZSB0b3RhbCBudW1iZXIgb2YgY29sdW1ucyBpbiBhIHtAbGluayBUYWJsZX0sIHtAbGluayBHcmlkfSwgb3Ige0BsaW5rIFRyZWVncmlkfS5cblx0XHQgKiBcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNjb2xJbmRleH1cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtc2V0c2l6ZVxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHR5cGUgez9JbnRlZ2VyfVxuXHRcdCAqL1xuXHRcdFwiY29sQ291bnRcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldCh2YWwpIHsgcmV0dXJuIGxvbmcuc2V0KHRoaXMsIFwiYXJpYS1jb2xjb3VudFwiLCB2YWwpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gbG9uZy5nZXQodGhpcywgXCJhcmlhLWNvbGNvdW50XCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIERlZmluZXMgYW4gZWxlbWVudCdzIGNvbHVtbiBpbmRleCBvciBwb3NpdGlvbiB3aXRoIHJlc3BlY3QgdG8gdGhlIHRvdGFsIG51bWJlciBvZiBjb2x1bW5zIFxuXHRcdCAqIHdpdGhpbiBhIHtAbGluayBUYWJsZX0sIHtAbGluayBHcmlkfSwgb3Ige0BsaW5rIFRyZWVncmlkfS5cblx0XHQgKiBcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNjb2xDb3VudH1cblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNjb2xTcGFufVxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1jb2xpbmRleFxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHR5cGUgez9JbnRlZ2VyfVxuXHRcdCAqL1xuXHRcdFwiY29sSW5kZXhcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldCh2YWwpIHsgcmV0dXJuIGxvbmcuc2V0KHRoaXMsIFwiYXJpYS1jb2xpbmRleFwiLCB2YWwpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gbG9uZy5nZXQodGhpcywgXCJhcmlhLWNvbGluZGV4XCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIERlZmluZXMgdGhlIG51bWJlciBvZiBjb2x1bW5zIHNwYW5uZWQgYnkgYSBjZWxsIG9yIGdyaWRjZWxsXG5cdFx0ICogd2l0aGluIGEge0BsaW5rIFRhYmxlfSwge0BsaW5rIEdyaWR9LCBvciB7QGxpbmsgVHJlZWdyaWR9LlxuXHRcdCAqIFxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI2NvbEluZGV4fVxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI3Jvd1NwYW59XG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWNvbHNwYW5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEB0eXBlIHs/SW50ZWdlcn1cblx0XHQgKi9cblx0XHRcImNvbFNwYW5cIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldCh2YWwpIHsgcmV0dXJuIGxvbmcuc2V0KHRoaXMsIFwiYXJpYS1jb2xzcGFuXCIsIHZhbCk7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBsb25nLmdldCh0aGlzLCBcImFyaWEtY29sc3BhblwiKTsgfVxuXHRcdH0sXG5cdFx0XHRcblx0XHQvKipcblx0XHQgKiBEZWZpbmVzIGFuIGVsZW1lbnQncyBudW1iZXIgb3IgcG9zaXRpb24gaW4gdGhlIGN1cnJlbnQgc2V0IG9mIHtAbGluayBsaXN0aXRlbX1zIG9yIHtAbGluayB0cmVlaXRlbX1zLlxuXHRcdCAqIE5vdCByZXF1aXJlZCBpZiBhbGwgZWxlbWVudHMgaW4gdGhlIHNldCBhcmUgcHJlc2VudCBpbiB0aGUgRE9NLlxuXHRcdCAqIFxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI3NldFNpemV9XG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXBvc2luc2V0XG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAdHlwZSB7P0ludGVnZXJ9XG5cdFx0ICovXG5cdFx0XCJwb3NJblNldFwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHZhbCkgeyByZXR1cm4gbG9uZy5zZXQodGhpcywgXCJhcmlhLXBvc2luc2V0XCIsIHZhbCk7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBsb25nLmdldCh0aGlzLCBcImFyaWEtcG9zaW5zZXRcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogRGVmaW5lcyB0aGUgdG90YWwgbnVtYmVyIG9mIHJvd3MgaW4gYSB7QGxpbmsgVGFibGV9LCB7QGxpbmsgR3JpZH0sIG9yIHtAbGluayBUcmVlZ3JpZH0uXG5cdFx0ICogXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjcm93SW5kZXh9XG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXJvd2NvdW50XG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEB0eXBlIHs/SW50ZWdlcn1cblx0XHQgKi9cblx0XHRcInJvd0NvdW50XCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQodmFsKSB7IHJldHVybiBsb25nLnNldCh0aGlzLCBcImFyaWEtcm93Y291bnRcIiwgdmFsKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGxvbmcuZ2V0KHRoaXMsIFwiYXJpYS1yb3djb3VudFwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBEZWZpbmVzIGFuIGVsZW1lbnQncyByb3cgaW5kZXggb3IgcG9zaXRpb24gd2l0aCByZXNwZWN0IHRvIHRoZSB0b3RhbCBudW1iZXIgb2Ygcm93cyBcblx0XHQgKiB3aXRoaW4gYSAge0BsaW5rIFRhYmxlfSwge0BsaW5rIEdyaWR9LCBvciB7QGxpbmsgVHJlZWdyaWR9LlxuXHRcdCAqIFxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI3Jvd0NvdW50fVxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI3Jvd1NwYW59XG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXJvd2luZGV4XG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAdHlwZSB7P0ludGVnZXJ9XG5cdFx0ICovXG5cdFx0XCJyb3dJbmRleFwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHZhbCkgeyByZXR1cm4gbG9uZy5zZXQodGhpcywgXCJhcmlhLXJvd2luZGV4XCIsIHZhbCk7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBsb25nLmdldCh0aGlzLCBcImFyaWEtcm93aW5kZXhcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogRGVmaW5lcyB0aGUgbnVtYmVyIG9mIHJvd3Mgc3Bhbm5lZCBieSBhIGNlbGwgb3IgZ3JpZGNlbGxcblx0XHQgKiB3aXRoaW4gYSB7QGxpbmsgVGFibGV9LCB7QGxpbmsgR3JpZH0sIG9yIHtAbGluayBUcmVlZ3JpZH0uXG5cdFx0ICogXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjcm93SW5kZXh9XG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjY29sU3Bhbn1cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtcm93c3BhblxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHR5cGUgez9JbnRlZ2VyfVxuXHRcdCAqL1xuXHRcdFwicm93U3BhblwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHZhbCkgeyByZXR1cm4gbG9uZy5zZXQodGhpcywgXCJhcmlhLXJvd3NwYW5cIiwgdmFsKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGxvbmcuZ2V0KHRoaXMsIFwiYXJpYS1yb3dzcGFuXCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIERlZmluZXMgdGhlIG51bWJlciBvZiBpdGVtcyBpbiB0aGUgY3VycmVudCBzZXQgb2YgbGlzdGl0ZW1zIG9yIHRyZWVpdGVtcy5cblx0XHQgKiBOb3QgcmVxdWlyZWQgaWYgKiphbGwqKiBlbGVtZW50cyBpbiB0aGUgc2V0IGFyZSBwcmVzZW50IGluIHRoZSBET00uXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjcG9zSW5TZXR9XG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXNldHNpemVcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEB0eXBlIHs/SW50ZWdlcn1cblx0XHQgKi9cblx0XHRcInNldFNpemVcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldCh2YWwpIHsgcmV0dXJuIGxvbmcuc2V0KHRoaXMsIFwiYXJpYS1zZXRzaXplXCIsIHZhbCk7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBsb25nLmdldCh0aGlzLCBcImFyaWEtc2V0c2l6ZVwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBEZWZpbmVzIHRoZSBoaWVyYXJjaGljYWwgbGV2ZWwgb2YgYW4gZWxlbWVudCB3aXRoaW4gYSBzdHJ1Y3R1cmUuXG5cdFx0ICogRS5nLiBgJmx0O2gxJmd0OyZsdDtoMS8mZ3Q7YCBlcXVhbHMgYCZsdDtkaXYgcm9sZT1cImhlYWRpbmdcIiBhcmlhLWxldmVsPVwiMVwiJmd0OyZsdDsvZGl2PmBcblx0XHQgKiBcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtbGV2ZWxcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEB0eXBlIHs/SW50ZWdlcn1cblx0XHQgKi9cblx0XHRcImxldmVsXCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQodmFsKSB7IHJldHVybiBsb25nLnNldCh0aGlzLCBcImFyaWEtbGV2ZWxcIiwgdmFsKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGxvbmcuZ2V0KHRoaXMsIFwiYXJpYS1sZXZlbFwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKiBFTkQgT0YgQ09MTEVDVElPTlMgKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblx0fVxuKTtcblxuZnVuY3Rpb24gc2V0QWNjZXNzaWJsZU5vZGUoYXksIGF0dHJpYnV0ZSwgYW4pIHtcblx0aWYgKCFhbikgcmV0dXJuIGF5LmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZSk7XG5cblx0aWYgKCEoYW4gaW5zdGFuY2VvZiBBY2Nlc3NpYmxlTm9kZSkpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJdCBtdXN0IGJlIGFuIGluc3RhbmNlIG9mIEFjY2Vzc2libGVOb2RlXCIpO1xuXHR9XG5cdGlmICghYW4uZWxlbWVudC5pZCkgeyB0aHJvdyBuZXcgRXJyb3IoXCJFbGVtZW50IG11c3QgaGF2ZSBhbiBJRFwiKTsgfVxuXG5cdGF5LmVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZSwgYW4uZWxlbWVudC5pZCk7XG59XG5mdW5jdGlvbiBnZXRBY2Nlc3NpYmxlTm9kZShheSwgYXR0cmlidXRlKSB7XG5cdHZhciBpZCA9IGF5LmVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSk7XG5cdGlmICghaWQpIHJldHVybjtcblxuXHRyZXR1cm4gZWxlbWVudHMuZ2V0KGF5LmVsZW1lbnQub3duZXJEb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBBY2Nlc3NpYmxlTm9kZTsiLCJpbXBvcnQgZWxlbWVudHMgZnJvbSBcIi4uL3V0aWxzL2VsZW1lbnRzXCI7XHJcbmltcG9ydCBBY2Nlc3NpYmxlTm9kZSBmcm9tIFwiLi9BY2Nlc3NpYmxlTm9kZVwiO1xyXG5pbXBvcnQgY3JlYXRlIGZyb20gXCIuLy4uL3V0aWxzL2NyZWF0ZVwiO1xyXG5cclxuY2xhc3MgQWNjZXNzaWJsZU5vZGVMaXN0Q29uIGV4dGVuZHMgQXJyYXkge1xyXG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcclxuXHRcdHN1cGVyKC4uLmFyZ3MpO1xyXG5cdH1cclxuXHJcblx0aXRlbShpbmRleCkge1xyXG5cdFx0cmV0dXJuIHRoaXNbaW5kZXhdO1xyXG5cdH1cclxuXHJcblx0YWRkKEFjY2Vzc2libGVOb2RlLCBiZWZvcmUgPSBudWxsKSB7XHJcblx0XHRpZihiZWZvcmUgIT09IG51bGwpIHtcclxuXHRcdFx0dmFyIGJlZm9yZUluZGV4ID0gdGhpcy5pbmRleE9mKGJlZm9yZSk7XHJcblx0XHRcdGlmKGJlZm9yZUluZGV4ID4gLTEpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5zcGxpY2UoYmVmb3JlSW5kZXggLSAxLCAwLCBBY2Nlc3NpYmxlTm9kZSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLnB1c2goQWNjZXNzaWJsZU5vZGUpO1xyXG5cdH1cclxuXHJcblx0cmVtb3ZlKGluZGV4KSB7XHJcblx0XHRyZXR1cm4gdGhpcy5wb3AoaW5kZXgpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0SWRzKG5vZGUsIGF0dHJpYnV0ZSkge1xyXG5cdGxldCBpZFN0cmluZyA9IG5vZGUuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSk7XHJcblx0XHJcblx0aWYgKCFpZFN0cmluZykgcmV0dXJuIG5ldyBBY2Nlc3NpYmxlTm9kZUxpc3RDb24oKTtcclxuXHJcblx0cmV0dXJuIG5ldyBBY2Nlc3NpYmxlTm9kZUxpc3RDb24oaWRTdHJpbmcuc3BsaXQoXCIgXCIpKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFxyXG4gKi9cclxuZnVuY3Rpb24gQWNjZXNzaWJsZU5vZGVMaXN0KGF5LCBhdHRyaWJ1dGUpIHtcclxuXHRsZXQgaWRzID0gZ2V0SWRzKGF5LmVsZW1lbnQsIGF0dHJpYnV0ZSk7XHJcblxyXG5cdHZhciBhcnJheUNoYW5nZUhhbmRsZXIgPSB7XHJcblx0XHRnZXQ6IGZ1bmN0aW9uICh0YXJnZXQsIHByb3BlcnR5KSB7XHJcblx0XHRcdC8vIGVsZW1lbnQgaXMgcmVxdWVzdGVkIHRyb3VnaHQgdGFyZ2V0W051bWJlcl1cclxuXHRcdFx0aWYgKCFpc05hTihwcm9wZXJ0eSkgJiYgdGFyZ2V0W3Byb3BlcnR5XSkge1xyXG5cdFx0XHRcdGxldCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldFtwcm9wZXJ0eV0pO1xyXG5cclxuXHRcdFx0XHRpZighZWwpIHtcclxuXHRcdFx0XHRcdC8vIHRocm93IG5ldyBFcnJvcihcIkVsZW1lbnQgbm90IGZvdW5kXCIpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0bGV0IGF1dG90aWxpdHk7XHJcblx0XHRcdFx0Ly8gcHJvcGVydHkgaXMgaW5kZXggaW4gdGhpcyBjYXNlXHJcblx0XHRcdFx0aWYgKGVsKSB7IGF1dG90aWxpdHkgPSBlbGVtZW50cy5nZXQoZWwpOyB9XHJcblx0XHRcdFx0aWYoIWF1dG90aWxpdHkpIHsgYXV0b3RpbGl0eSA9IGNyZWF0ZS5vbmUoZWwpOyB9XHJcblx0XHRcdFx0cmV0dXJuIGF1dG90aWxpdHk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0YXJnZXRbcHJvcGVydHldO1xyXG5cdFx0fSxcclxuXHRcdHNldDogZnVuY3Rpb24gKHRhcmdldCwgcHJvcGVydHksIHZhbHVlKSB7XHJcblx0XHRcdC8vIGFkZGluZyBvciBjaGFuZ2luZyBhIHZhbHVlIGluc2lkZSB0aGUgYXJyYXlcclxuXHRcdFx0aWYgKCFpc05hTihwcm9wZXJ0eSkpIHtcclxuXHRcdFx0XHQvLyBpcyBvZiB2YWxpZCB0eXBlXHJcblx0XHRcdFx0aWYgKHZhbHVlIGluc3RhbmNlb2YgQWNjZXNzaWJsZU5vZGUpIHtcclxuXHRcdFx0XHRcdGlmKCF2YWx1ZS5lbGVtZW50LmlkKSB7XHJcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlRoZSBlbGVtZW50IG11c3QgaGF2ZSBhbiBJRFwiKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHRhcmdldFtwcm9wZXJ0eV0gPSB2YWx1ZS5lbGVtZW50LmlkO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIk9ubHkgaW5zdGFuY2VzIG9mIEFjY2Vzc2libGVOb2RlIGFyZSBhbGxvd2VkXCIpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHR0YXJnZXRbcHJvcGVydHldID0gdmFsdWU7XHJcblx0XHRcdC8vIHlvdSBoYXZlIHRvIHJldHVybiB0cnVlIHRvIGFjY2VwdCB0aGUgY2hhbmdlc1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHR9O1xyXG5cdFxyXG5cdHJldHVybiBuZXcgUHJveHkoaWRzLCBhcnJheUNoYW5nZUhhbmRsZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBY2Nlc3NpYmxlTm9kZUxpc3Q7IiwiZXhwb3J0IGNvbnN0IElTX0FDVElWRSA9IFwidHJ1ZVwiLCBJU19OT1RfQUNUSVZFID0gXCJmYWxzZVwiO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIHZhbHVlIG9mIGEgZ2l2ZW4gYXR0cmlidXRlXHJcbiAqIEBwYXJhbSB7QWNjZXNzaWJsZU5vZGV9IGF5IFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gYXR0cmlidXRlTmFtZSBcclxuICogQHJldHVybiB7U3RyaW5nfSBhdHRyaWJ1dGUncyB2YWx1ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldChheSwgYXR0cmlidXRlTmFtZSkge1xyXG5cdHZhciB2YWx1ZSA9IGF5Ll8ucmF3QXR0cnMuYXR0cmlidXRlTmFtZSB8fCBheS5lbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcclxuXHRpZiAodmFsdWUgPT0gdW5kZWZpbmVkKSByZXR1cm47XHJcblx0cmV0dXJuIHZhbHVlO1xyXG59XHJcblxyXG4vKipcclxuICogU3luYyB0aGUgbmV3IHZhbHVlIHRvIHRoZSBET01cclxuICogQHBhcmFtIHtBY2Nlc3NpYmxlTm9kZX0gYXkgXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBhdHRyaWJ1dGVOYW1lIFxyXG4gKiBAcGFyYW0ge1N0cmluZyB8IE51bWJlciB9IHN0YXR1cyBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXQoYXksIGF0dHJpYnV0ZU5hbWUsIHN0YXR1cykge1xyXG5cdGlmKHN0YXR1cyA9PSB1bmRlZmluZWQpIHtcclxuXHRcdGF5LmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRheS5lbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lLCBzdGF0dXMpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHN0YXR1cztcclxufVxyXG5cclxuLyoqXHJcbiogUmV0dXJucyB0aGUgb3Bwb3NpdGUgc3RhdGUgb2YgdGhlIGF0dHJpYnV0ZSxcclxuKiBuZWVkZWQgd2hlbiBhdHRyaWJ1dGUgdXNlcyBhbiB0b2tlbiBsaXN0XHJcbiogQHJldHVybiB7U3RyaW5nfSBOZXcgc3RhdGVcclxuKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZShzdGF0ZSkge1xyXG5cdGlmIChzdGF0ZSA9PSBJU19BQ1RJVkUpIHtcclxuXHRcdHN0YXRlID0gSVNfTk9UX0FDVElWRTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0c3RhdGUgPSBJU19BQ1RJVkU7XHJcblx0fVxyXG5cdHJldHVybiBzdGF0ZTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBJU19BQ1RJVkUsIElTX05PVF9BQ1RJVkUsIGdldCwgc2V0LCB0b2dnbGUgfTsiLCJleHBvcnQgY29uc3QgSVNfQUNUSVZFID0gdHJ1ZSwgSVNfTk9UX0FDVElWRSA9IGZhbHNlO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIHZhbHVlIG9mIGdpdmVuIGF0dHJpYnV0ZSBhcyBCb29sZWFuXHJcbiAqIEBwYXJhbSB7QWNjZXNzaWJsZU5vZGV9IGF5IFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gYXR0cmlidXRlTmFtZSBcclxuICogQHJldHVybiB7Qm9vbGVhbn0gYXR0cmlidXRlJ3MgdmFsdWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXQoYXksIGF0dHJpYnV0ZU5hbWUpIHtcclxuXHR2YXIgdmFsdWUgPSBheS5fLnJhd0F0dHJzLmF0dHJpYnV0ZU5hbWUgfHwgYXkuZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XHJcblx0aWYodmFsdWUgPT0gdW5kZWZpbmVkICkgcmV0dXJuO1xyXG5cdHJldHVybiB2YWx1ZSAgPT0gXCJ0cnVlXCIgfHwgZmFsc2U7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTeW5jIHRoZSBuZXcgdmFsdWUgdG8gdGhlIHByb3BlcnR5XHJcbiAqIEBwYXJhbSB7QWNjZXNzaWJsZU5vZGV9IGF5IFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gYXR0cmlidXRlTmFtZSBcclxuICogQHBhcmFtIHtTdHJpbmcgfCBCb29sZWFufSBzdGF0dXMgXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0KGF5LCBhdHRyaWJ1dGVOYW1lLCBzdGF0dXMpIHtcclxuXHRpZihzdGF0dXMgPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRheS5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0YXkuZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgc3RhdHVzKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBzdGF0dXM7XHJcbn1cclxuXHJcbi8qKlxyXG4qIFJldHVybnMgdGhlIG9wcG9zaXRlIHN0YXRlIG9mIHRoZSBhdHRyaWJ1dGVcclxuKiBAcmV0dXJuIHtCb29sZWFufSBOZXcgc3RhdGVcclxuKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZShzdGF0ZSkge1xyXG5cdGlmIChzdGF0ZSA9PSBJU19BQ1RJVkUpIHtcclxuXHRcdHN0YXRlID0gSVNfTk9UX0FDVElWRTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0c3RhdGUgPSBJU19BQ1RJVkU7XHJcblx0fVxyXG5cdHJldHVybiBzdGF0ZTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBJU19BQ1RJVkUsIElTX05PVF9BQ1RJVkUsIGdldCwgc2V0LCB0b2dnbGUgfTsiLCIvKipcclxuICogUmV0dXJucyB0aGUgdmFsdWUgb2YgYSBnaXZlbiBhdHRyaWJ1dGUgYXMgTnVtYmVyXHJcbiAqIEBwYXJhbSB7QWNjZXNzaWJsZU5vZGV9IGF5IFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gYXR0cmlidXRlTmFtZSBcclxuICogQHJldHVybiB7TnVtYmVyfSBhdHRyaWJ1dGUncyB2YWx1ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldChheSwgYXR0cmlidXRlTmFtZSkge1xyXG5cdHZhciB2YWx1ZSA9IGF5Ll8ucmF3QXR0cnMuYXR0cmlidXRlTmFtZSB8fCBheS5lbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcclxuXHRpZiAodmFsdWUgPT0gdW5kZWZpbmVkKSByZXR1cm47XHJcblx0cmV0dXJuIE51bWJlcih2YWx1ZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTeW5jIHRoZSBuZXcgdmFsdWUgdG8gdGhlIERPTVxyXG4gKiBAcGFyYW0ge0FjY2Vzc2libGVOb2RlfSBheSBcclxuICogQHBhcmFtIHtTdHJpbmd9IGF0dHJpYnV0ZU5hbWUgXHJcbiAqIEBwYXJhbSB7U3RyaW5nIHwgTnVtYmVyIH0gc3RhdHVzIFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldChheSwgYXR0cmlidXRlTmFtZSwgc3RyKSB7XHJcblx0aWYoc3RyID09IG51bGwpIHtcclxuXHRcdGF5LmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRheS5lbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lLCBzdHIpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBnZXQsIHNldCB9OyIsIi8qKlxyXG4gKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiBhIGdpdmVuIGF0dHJpYnV0ZSBhcyBJbnRlZ2VyXHJcbiAqIEBwYXJhbSB7QWNjZXNzaWJsZU5vZGV9IGF5IFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gYXR0cmlidXRlTmFtZSBcclxuICogQHJldHVybiB7TnVtYmVyfSBhdHRyaWJ1dGUncyB2YWx1ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldChheSwgYXR0cmlidXRlTmFtZSkge1xyXG5cdHZhciB2YWx1ZSA9IGF5Ll8ucmF3QXR0cnMuYXR0cmlidXRlTmFtZSB8fCBheS5lbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcclxuXHRpZiAodmFsdWUgPT0gdW5kZWZpbmVkKSByZXR1cm47XHJcblx0cmV0dXJuIHBhcnNlSW50KHZhbHVlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFN5bmMgdGhlIG5ldyB2YWx1ZSB0byB0aGUgRE9NXHJcbiAqIEBwYXJhbSB7QWNjZXNzaWJsZU5vZGV9IGF5IFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gYXR0cmlidXRlTmFtZSBcclxuICogQHBhcmFtIHtTdHJpbmcgfCBOdW1iZXIgfSBzdGF0dXMgXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0KGF5LCBhdHRyaWJ1dGVOYW1lLCBzdHIpIHtcclxuXHRpZiAoc3RyID09IG51bGwpIHtcclxuXHRcdGF5LmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRheS5lbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lLCBzdHIpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBnZXQsIHNldCB9OyIsImltcG9ydCBjcmVhdGUgZnJvbSBcIi4vY3JlYXRlXCI7XG5cbi8qKlxuICogXG4gKi9cbmNsYXNzIFZhbGlkaXR5U3RhdGUge1xuXHRjb25zdHJ1Y3RvcihheSkge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcIl9heVwiLCB7XG5cdFx0XHR2YWx1ZTogYXlcblx0XHR9KTtcblx0fVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhWYWxpZGl0eVN0YXRlLnByb3RvdHlwZSxcblx0LyoqIEBsZW5kcyBWYWxpZGl0eVN0YXRlLnByb3RvdHlwZSAqL1xuXHR7XG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyB0cnVlIGlmIHRoZSB1c2VyIGhhcyBwcm92aWRlZCBpbnB1dCBpbiB0aGUgdXNlciBpbnRlcmZhY2UgdGhhdCB0aGUgXG5cdFx0ICogdXNlciBhZ2VudCBpcyB1bmFibGUgdG8gY29udmVydCB0byBhIHZhbHVlOyBmYWxzZSBvdGhlcndpc2UuXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0YmFkSW5wdXQ6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQoKSB7XG5cdFx0XHRcdGlmICgoKGNyZWF0ZS5pbnN0YW5jZU9mKHRoaXMuX2F5LCBcInNwaW5idXR0b25cIikgfHwgY3JlYXRlLmluc3RhbmNlT2YodGhpcy5fYXksIFwic2xpZGVyXCIpKVxuXHRcdFx0XHRcdCYmIHRoaXMuX2F5LnZhbHVlTm93Lmxlbmd0aCA+IDAgJiYgIS9eWy0rXT8oPzpcXGQrfFxcZCpbLixdXFxkKykkLy50ZXN0KHRoaXMuX2F5LnZhbHVlTm93KSlcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnQgaGFzIGEgY3VzdG9tIGVycm9yOyBmYWxzZSBvdGhlcndpc2UuXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XG5cdFx0ICovXHRcblx0XHRjdXN0b21FcnJvcjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldCgpIHsgcmV0dXJuICEhdGhpcy5fY3VzdG9tRXJyb3I7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW504oCZcyB2YWx1ZSBkb2VzbuKAmXQgbWF0Y2ggdGhlIHByb3ZpZGVkIHBhdHRlcm47IGZhbHNlIG90aGVyd2lzZS5cblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cblx0XHQgKi9cblx0XHRwYXR0ZXJuTWlzbWF0Y2g6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQoKSB7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IHRoaXMuX2F5Ll8uaW5wdXQgPyB0aGlzLl9heS5fLmlucHV0LnZhbHVlIDogdGhpcy5fYXkudmFsdWVOb3c7XG5cdFx0XHRcdGlmICh0aGlzLl9heS5fLmlucHV0LnBhdHRlcm4gJiYgdmFsdWUubGVuZ3RoID4gMCAmJiBuZXcgUmVnRXhwKHRoaXMuX2F5Ll8uaW5wdXQucGF0dGVybikudGVzdCh2YWx1ZSkgPT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnTigJlzIHZhbHVlIGlzIGhpZ2hlciB0aGFuIHRoZSBwcm92aWRlZCBtYXhpbXVtOyBmYWxzZSBvdGhlcndpc2UuXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0cmFuZ2VPdmVyZmxvdzoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldCgpIHtcblx0XHRcdFx0aWYgKHRoaXMuX2F5LnZhbHVlTm93ICYmIHRoaXMuX2F5LnZhbHVlTWF4ICYmIHRoaXMuX2F5LnZhbHVlTm93ID4gdGhpcy5fYXkudmFsdWVNYXgpIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW504oCZcyB2YWx1ZSBpcyBsb3dlciB0aGFuIHRoZSBwcm92aWRlZCBtaW5pbXVtOyBmYWxzZSBvdGhlcndpc2UuXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0cmFuZ2VVbmRlcmZsb3c6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQoKSB7XG5cdFx0XHRcdGlmICh0aGlzLl9heS52YWx1ZU5vdyAmJiB0aGlzLl9heS52YWx1ZU1pbiAmJiB0aGlzLl9heS52YWx1ZU5vdyA8IHRoaXMuX2F5LnZhbHVlTWluKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudOKAmXMgdmFsdWUgZG9lc27igJl0IGZpdCB0aGUgcnVsZXMgZ2l2ZW4gYnkgdGhlIHN0ZXAgYXR0cmlidXRlOyBmYWxzZSBvdGhlcndpc2UuXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0c3RlcE1pc21hdGNoOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRpZiAodGhpcy5fYXkuXy5yYW5nZSAmJiB0aGlzLl9heS5fLnJhbmdlLnN0ZXAgJiYgdGhpcy5fYXkudmFsdWVOb3cgJSB0aGlzLl9heS5fLnJhbmdlLnN0ZXAgIT09IDApIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW504oCZcyB2YWx1ZSBpcyBsb25nZXIgdGhhbiB0aGUgcHJvdmlkZWQgbWF4aW11bSBsZW5ndGg7IGZhbHNlIG90aGVyd2lzZS5cblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cblx0XHQgKi9cblx0XHR0b29Mb25nOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0KCkge1xuXHRcdFx0XHR2YXIgdmFsdWUgPSB0aGlzLl9heS5fLmlucHV0ID8gdGhpcy5fYXkuXy5pbnB1dC52YWx1ZSA6IHRoaXMuX2F5LnZhbHVlTm93O1xuXHRcdFx0XHRpZiAodGhpcy5fYXkubWF4bGVuZ3RoICYmIHZhbHVlLmxlbmd0aCA+IHRoaXMuX2F5Lm1heGxlbmd0aCkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudOKAmXMgdmFsdWUsIGlmIGl0IGlzIG5vdCB0aGUgZW1wdHkgc3RyaW5nLCBpcyBzaG9ydGVyIHRoYW4gdGhlIHByb3ZpZGVkIG1pbmltdW0gbGVuZ3RoOyBmYWxzZSBvdGhlcndpc2UuXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0dG9vU2hvcnQ6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQoKSB7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IHRoaXMuX2F5Ll8uaW5wdXQgPyB0aGlzLl9heS5fLmlucHV0LnZhbHVlIDogdGhpcy5fYXkudmFsdWVOb3c7XG5cdFx0XHRcdGlmICh0aGlzLl9heS5taW5sZW5ndGggJiYgdmFsdWUubGVuZ3RoIDwgdGhpcy5fYXkubWlubGVuZ3RoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW504oCZcyB2YWx1ZSBpcyBub3QgaW4gdGhlIGNvcnJlY3Qgc3ludGF4OyBmYWxzZSBvdGhlcndpc2UuXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0dHlwZU1pc21hdGNoOiB7IFxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudCBoYXMgbm8gdmFsdWUgYnV0IGlzIGEgcmVxdWlyZWQgZmllbGQ7IGZhbHNlIG90aGVyd2lzZS5cblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cblx0XHQgKi9cblx0XHR2YWx1ZU1pc3Npbmc6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQoKSB7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IHRoaXMuX2F5Ll8uaW5wdXQgPyB0aGlzLl9heS5fLmlucHV0LnZhbHVlIDogdGhpcy5fYXkudmFsdWVOb3c7XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHR0aGlzLnJlcXVpcmVkXG5cdFx0XHRcdFx0JiYgKFxuXHRcdFx0XHRcdFx0KChjcmVhdGUuaW5zdGFuY2VPZih0aGlzLl9heSwgXCJjaGVja2JveFwiKSB8fCBjcmVhdGUuaW5zdGFuY2VPZih0aGlzLl9heSwgXCJyYWRpb1wiKVxuXHRcdFx0XHRcdFx0XHR8fCBjcmVhdGUuaW5zdGFuY2VPZih0aGlzLl9heSwgXCJvcHRpb25cIikpICYmICF0aGlzLl9heS5jaGVja2VkKVxuXHRcdFx0XHRcdFx0fHwgKGNyZWF0ZS5pbnN0YW5jZU9mKHRoaXMuX2F5LCBcInNlbGVjdFwiKSAmJiAhdmFsdWUpXG5cdFx0XHRcdFx0XHR8fCAoKGNyZWF0ZS5pbnN0YW5jZU9mKHRoaXMuX2F5LCBcImlucHV0XCIpIHx8IGNyZWF0ZS5pbnN0YW5jZU9mKHRoaXMuX2F5LCBcImdyaWRjZWxsXCIpKSAmJiAhdmFsdWUgPiAwKVxuXHRcdFx0XHRcdClcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudOKAmXMgdmFsdWUgaGFzIG5vIHZhbGlkaXR5IHByb2JsZW1zOyBmYWxzZSBvdGhlcndpc2Vcblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cblx0XHQgKi9cblx0XHR2YWxpZDoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldCgpIHtcblx0XHRcdFx0cmV0dXJuICEoXG5cdFx0XHRcdFx0dGhpcy5iYWRJbnB1dCB8fFxuXHRcdFx0XHRcdHRoaXMuY3VzdG9tRXJyb3IgfHxcblx0XHRcdFx0XHR0aGlzLnBhdHRlcm5NaXNtYXRjaCB8fFxuXHRcdFx0XHRcdHRoaXMucmFuZ2VPdmVyZmxvdyB8fFxuXHRcdFx0XHRcdHRoaXMucmFuZ2VVbmRlcmZsb3cgfHxcblx0XHRcdFx0XHR0aGlzLnN0ZXBNaXNtYXRjaCB8fFxuXHRcdFx0XHRcdHRoaXMudG9vTG9uZyB8fFxuXHRcdFx0XHRcdHRoaXMudG9vU2hvcnQgfHxcblx0XHRcdFx0XHR0aGlzLnR5cGVNaXNtYXRjaCB8fFxuXHRcdFx0XHRcdHRoaXMudmFsdWVNaXNzaW5nXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBWYWxpZGl0eVN0YXRlOyIsImltcG9ydCBzZWxlY3RvciBmcm9tIFwiLi9zZWxlY3RvclwiO1xuaW1wb3J0IGVsZW1lbnRzIGZyb20gXCIuL2VsZW1lbnRzXCI7XG5pbXBvcnQgZ2V0Q29tcHV0ZWRSb2xlIGZyb20gXCIuL2dldENvbXB1dGVkUm9sZVwiO1xuXG5pbXBvcnQgUmFuZ2UgZnJvbSBcIi4vLi4vcm9sZS9hYnN0cmFjdC9SYW5nZVwiO1xuaW1wb3J0IFJvbGV0eXBlIGZyb20gXCIuLy4uL3JvbGUvYWJzdHJhY3QvUm9sZXR5cGVcIjtcblxuaW1wb3J0IEJ1dHRvbiBmcm9tIFwiLi8uLi9yb2xlL0J1dHRvblwiO1xuaW1wb3J0IENoZWNrYm94IGZyb20gXCIuLy4uL3JvbGUvQ2hlY2tib3hcIjtcbmltcG9ydCBDb21ib2JveCBmcm9tIFwiLi8uLi9yb2xlL0NvbWJvYm94XCI7XG5pbXBvcnQgRGlhbG9nIGZyb20gXCIuLy4uL3JvbGUvRGlhbG9nXCI7XG5pbXBvcnQgRm9ybSBmcm9tIFwiLi8uLi9yb2xlL0Zvcm1cIjtcbmltcG9ydCBMaW5rIGZyb20gXCIuLy4uL3JvbGUvTGlua1wiO1xuaW1wb3J0IExpc3Rib3ggZnJvbSBcIi4vLi4vcm9sZS9MaXN0Ym94XCI7XG5pbXBvcnQgT3B0aW9uIGZyb20gXCIuLy4uL3JvbGUvb3B0aW9uXCI7XG5pbXBvcnQgU2VhcmNoYm94IGZyb20gXCIuLy4uL3JvbGUvc2VhcmNoYm94XCI7XG5pbXBvcnQgU2xpZGVyIGZyb20gXCIuLy4uL3JvbGUvU2xpZGVyXCI7XG5pbXBvcnQgU3BpbmJ1dHRvbiBmcm9tIFwiLi8uLi9yb2xlL1NwaW5idXR0b25cIjtcbmltcG9ydCBTd2l0Y2ggZnJvbSBcIi4vLi4vcm9sZS9Td2l0Y2hcIjtcbmltcG9ydCBUYWIgZnJvbSBcIi4vLi4vcm9sZS9UYWJcIjtcbmltcG9ydCBUYWJsaXN0IGZyb20gXCIuLy4uL3JvbGUvVGFibGlzdFwiO1xuaW1wb3J0IFRhYnBhbmVsIGZyb20gXCIuLy4uL3JvbGUvVGFicGFuZWxcIjtcbmltcG9ydCBUZXh0Ym94IGZyb20gXCIuLy4uL3JvbGUvVGV4dGJveFwiO1xuXG52YXIgb2JqID0geyBidXR0b246IEJ1dHRvbiwgY2hlY2tib3g6IENoZWNrYm94LCBjb21ib2JveDogQ29tYm9ib3gsIGRpYWxvZzogRGlhbG9nLCBmb3JtOiBGb3JtLCBsaXN0Ym94OiBMaXN0Ym94LCBcblx0b3B0aW9uczogT3B0aW9uLCByYW5nZTogUmFuZ2UsIHJvbGV0eXBlOiBSb2xldHlwZSwgc2VhcmNoYm94OiBTZWFyY2hib3gsIHNsaWRlcjogU2xpZGVyLCBzcGluYnV0dG9uOiBTcGluYnV0dG9uLFxuXHR0YWI6IFRhYiwgdGFibGlzdDogVGFibGlzdCwgdGFicGFuZWw6IFRhYnBhbmVsLCB0ZXh0Ym94OiBUZXh0Ym94LCBsaW5rOiBMaW5rLCBzd2l0Y2g6IFN3aXRjaH07XG5cbmZ1bmN0aW9uIGFsbCgpIHtcblx0Zm9yIChsZXQga2V5IGluIG9iaikge1xuXHRcdHZhciBub2RlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IuZ2V0Um9sZShrZXkpKTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRlbGVtZW50cy5zZXQobm9kZUxpc3RbaV0sIG5ldyBvYmpba2V5XShub2RlTGlzdFtpXSkpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBvbmUoZWwpIHtcblx0aWYoZWxlbWVudHMuaGFzKGVsKSkgcmV0dXJuIGVsZW1lbnRzLmdldChlbCk7XG5cdHZhciByb2xlID0gZ2V0Q29tcHV0ZWRSb2xlKGVsKTtcblx0XG5cdC8qKiBAdG9kbyBSZW1vdmUgZmFsbGJhY2sgbWV0aG9kICovXG5cdHZhciBjb25zdHJ1Y3RvciA9IG9ialtyb2xlXSB8fCBSb2xldHlwZTtcblxuXHRyZXR1cm4gZWxlbWVudHMuc2V0KGVsLCBuZXcgY29uc3RydWN0b3IoZWwpKTtcbn1cblxuZnVuY3Rpb24gaW5zdGFuY2VPZihheSwgcm9sZSkge1xuXHRyZXR1cm4gYXkgaW5zdGFuY2VvZiBvYmpbcm9sZV07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHthbGwsIG9uZSwgaW5zdGFuY2VPZn07XG4iLCJpbXBvcnQgY3JlYXRlIGZyb20gXCIuL2NyZWF0ZVwiO1xuaW1wb3J0IGdldENvbXB1dGVkUm9sZSBmcm9tIFwiLi9nZXRDb21wdXRlZFJvbGVcIjtcblxudmFyIGF5SW5zdGFuY2VzID0gbmV3IFdlYWtNYXAoKTtcblxuLy8gdG9kbzogbG9vcCB0aHJvdWdoIHByZXNlbnRhdGlvbmFsIHJvbGVzXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFyZW50KGF5LCBzZWxlY3Rvcikge1xuXHRsZXQgZWxlbWVudCA9IGF5LmVsZW1lbnQ7XG5cblx0d2hpbGUoZWxlbWVudC5wYXJlbnROb2RlKSB7XG5cdFx0ZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcblxuXHRcdGlmIChheS5lbGVtZW50LnBhcmVudE5vZGUubWF0Y2hlcyhzZWxlY3RvcikpIHtcblx0XHRcdGlmIChheUluc3RhbmNlcy5oYXMoYXkuZWxlbWVudC5wYXJlbnROb2RlKSkge1xuXHRcdFx0XHRyZXR1cm4gYXlJbnN0YW5jZXMuZ2V0KGF5LmVsZW1lbnQucGFyZW50Tm9kZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY3JlYXRlLm9uZShheS5lbGVtZW50LnBhcmVudE5vZGUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBmYWxzZTtcbn1cblxuLyoqIEB0b2RvIGZpbmQgb25seSBgZGlyZWN0YCBjaGlsZHJlbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENoaWxkcmVuKGF5LCByb2xlKSB7XG5cdHZhciByZXN1bHRzID0gW107XG5cdHZhciBvd25zID0gQXJyYXkuZnJvbShheS5lbGVtZW50LmNoaWxkcmVuKS5jb25jYXQoYXkub3ducyk7XG5cblx0b3ducy5mb3JFYWNoKGNoaWxkID0+IHtcblx0XHRpZiAoIXJvbGUgfHwgKHJvbGUgJiYgZ2V0Q29tcHV0ZWRSb2xlKGNoaWxkKSA9PSByb2xlKSkge1xuXHRcdFx0aWYgKGF5SW5zdGFuY2VzLmhhcyhjaGlsZCkpIHtcblx0XHRcdFx0cmVzdWx0cy5wdXNoKGF5SW5zdGFuY2VzLmdldChjaGlsZCkpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmVzdWx0cy5wdXNoKGNyZWF0ZS5vbmUoY2hpbGQpKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBvd25zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJldihjaGlsZCwgcGFyZW50LCByb2xlKSB7XG5cdGlmKCFwYXJlbnQpIHJldHVybiBmYWxzZTtcblxuXHRsZXQgY2hpbGRyZW4gPSBnZXRDaGlsZHJlbihwYXJlbnQsIHJvbGUpO1xuXHRsZXQgaW5kZXhQcmV2RWxlbWVudCA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoY2hpbGRyZW4sIGNoaWxkKSAtIDE7XG5cdGlmKGluZGV4UHJldkVsZW1lbnQgPCAwKSByZXR1cm4gZmFsc2U7XG5cblx0cmV0dXJuIGNoaWxkcmVuW2luZGV4UHJldkVsZW1lbnRdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV4dChjaGlsZCwgcGFyZW50LCByb2xlKSB7XG5cdGlmKCFwYXJlbnQpIHJldHVybiBmYWxzZTtcblxuXHRsZXQgY2hpbGRyZW4gPSBnZXRDaGlsZHJlbihwYXJlbnQsIHJvbGUpO1xuXHRsZXQgaW5kZXhOZXh0ID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChjaGlsZHJlbiwgY2hpbGQpICsgMTtcblx0aWYoaW5kZXhOZXh0ID49IGNoaWxkcmVuLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuXG5cdHJldHVybiBjaGlsZHJlbltpbmRleE5leHRdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhcnQoY2hpbGQsIHBhcmVudCwgcm9sZSkge1xuXHRpZighcGFyZW50KSByZXR1cm4gZmFsc2U7XG5cdGxldCBjaGlsZHJlbiA9IGdldENoaWxkcmVuKHBhcmVudCwgcm9sZSk7XG5cdHJldHVybiBjaGlsZHJlblswXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVuZChjaGlsZCwgcGFyZW50LCByb2xlKSB7XG5cdGlmKCFwYXJlbnQpIHJldHVybiBmYWxzZTtcblx0bGV0IGNoaWxkcmVuID0gZ2V0Q2hpbGRyZW4ocGFyZW50LCByb2xlKTtcblx0cmV0dXJuIGNoaWxkcmVuW2NoaWxkcmVuLmxlbmd0aCAtIDFdO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG5cdG1hcDogYXlJbnN0YW5jZXMsXG5cdGdldDogYXlJbnN0YW5jZXMuZ2V0LmJpbmQoYXlJbnN0YW5jZXMpLFxuXHRzZXQ6IGF5SW5zdGFuY2VzLnNldC5iaW5kKGF5SW5zdGFuY2VzKSxcblx0aGFzOiBheUluc3RhbmNlcy5oYXMuYmluZChheUluc3RhbmNlcyksXG5cdGdldENoaWxkcmVuLFxuXHRnZXRQYXJlbnQsXG5cdGdldFByZXYsXG5cdGdldE5leHQsXG5cdGdldFN0YXJ0LFxuXHRnZXRFbmRcbn07IiwiaW1wb3J0IGVsZW1lbnRzIGZyb20gXCIuL2VsZW1lbnRzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcclxuXHRsZXQgYXkgPSBlbGVtZW50cy5nZXQoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XHJcblxyXG5cdGlmKCFheSkgcmV0dXJuO1xyXG5cdGlmKGF5LmFjdGl2ZURlc2NlbmRhbnQpIHJldHVybiBheS5hY3RpdmVEZXNjZW5kYW50O1xyXG5cclxuXHRyZXR1cm4gYXk7XHJcbn0iLCIvKipcclxuICogRm9sbG93cyBodHRwczovL3d3dy53My5vcmcvVFIvMjAxNy9XRC1odG1sLWFyaWEtMjAxNzEwMTMvI2RvY2NvbmZvcm1hbmNlXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEFsbCBhcmlhIHJvbGVzXHJcbiAqIEB0eXBlIHtBcnJheX1cclxuKi9cclxuaW1wb3J0IHJvbGVzIGZyb20gXCIuLy4uL2RhdGEvcm9sZXMuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgaW5mbyB3aGljaCBpcyB1c2VkIGluIGZ1bmN0aW9ucyBvZiByb2xlUGVySFRNTFRhZyxcclxuICogbW9zdGx5IGEga2V5IGFzIHRhZ05hbWUgd2l0aCBhbiBhcnJheSBvZiBhbGxvd2VkIHJvbGVzIGZvciB0aGF0IHRhZ1xyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKi9cclxudmFyIGFsbG93ZWRSb2xlcyA9IHtcclxuXHRcImFXaXRoSHJlZlwiOiBbXHJcblx0XHRcImJ1dHRvblwiLCBcImNoZWNrYm94XCIsIFwibWVudWl0ZW1cIiwgXCJtZW51aXRlbWNoZWNrYm94XCIsIFwibWVudWl0ZW1yYWRpb1wiLFxyXG5cdFx0XCJvcHRpb25cIiwgXCJyYWRpb1wiLCBcInN3aXRjaFwiLCBcInRhYlwiLCBcInRyZWVpdGVtXCIsIFwiZG9jLWJhY2tsaW5rXCIsXHJcblx0XHRcImRvYy1iaWJsaW9yZWZcIiwgXCJkb2MtZ2xvc3NyZWZcIiwgXCJkb2Mtbm90ZXJlZlwiXHJcblx0XSxcclxuXHRcImFydGljbGVcIjogW1xyXG5cdFx0XCJmZWVkXCIsIFwicHJlc2VudGF0aW9uXCIsIFwibm9uZVwiLCBcImRvY3VtZW50XCIsIFwiYXBwbGljYXRpb25cIiwgXCJtYWluXCIsIFwicmVnaW9uXCJcclxuXHRdLFxyXG5cdFwiYXNpZGVcIjogW1xyXG5cdFx0XCJmZWVkXCIsIFwibm90ZVwiLCBcInByZXNlbnRhdGlvblwiLCBcIm5vbmVcIiwgXCJyZWdpb25cIiwgXCJzZWFyY2hcIiwgXCJkb2MtZXhhbXBsZVwiLFxyXG5cdFx0XCJkb2MtZm9vdG5vdGVcIiwgXCJkb2MtcHVsbHF1b3RlXCIsIFwiZG9jLXRpcFwiXHJcblx0XSxcclxuXHRcImJ1dHRvblwiOiBbXHJcblx0XHRcImNoZWNrYm94XCIsIFwibGlua1wiLCBcIm1lbnVpdGVtXCIsIFwibWVudWl0ZW1jaGVja2JveFwiLCBcIm1lbnVpdGVtcmFkaW9cIixcclxuXHRcdFwib3B0aW9uXCIsIFwicmFkaW9cIiwgXCJzd2l0Y2hcIiwgXCJ0YWJcIlxyXG5cdF0sXHJcblx0XCJkbFwiOiBbXCJncm91cFwiLCBcInByZXNlbnRhdGlvblwiLCBcIm5vbmVcIiwgXCJkb2MtZ2xvc3NhcnlcIl0sXHJcblx0XCJlbWJlZFwiOiBbIFwiYXBwbGljYXRpb25cIiwgXCJkb2N1bWVudFwiLCBcInByZXNlbnRhdGlvblwiLCBcIm5vbmVcIiwgXCJpbWdcIiBdLFxyXG5cdFwiZmlnY2FwdGlvblwiOiBbIFwiZ3JvdXBcIiwgXCJwcmVzZW50YXRpb25cIiwgXCJub25lXCIgXSxcclxuXHRcImZpZWxkc2V0XCI6IFx0WyBcImdyb3VwXCIsIFwicHJlc2VudGF0aW9uXCIsIFwibm9uZVwiIF0sXHJcblx0XCJmb290ZXJcIjogWyBcImdyb3VwXCIsIFwibm9uZVwiLCBcInByZXNlbnRhdGlvblwiLCBcImRvYy1mb290bm90ZVwiIF0sXHJcblx0XCJmb3JtXCI6IFsgXCJzZWFyY2hcIiwgXCJub25lXCIsIFwicHJlc2VudGF0aW9uXCIgXSxcclxuXHRcImgxVG9oNlwiOiBbIFwidGFiXCIsIFwibm9uZVwiLCBcInByZXNlbnRhdGlvblwiLCBcImRvYy1zdWJ0aXRsZVwiIF0sXHJcblx0XCJoZWFkZXJcIjogWyBcImdyb3VwXCIsIFwibm9uZVwiLCBcInByZXNlbnRhdGlvblwiLCBcImRvYy1mb290bm90ZVwiIF0sXHJcblx0XCJoclwiOiBbIFwicHJlc2VudGF0aW9uXCIsIFwiZG9jLXBhZ2VicmVha1wiIF0sXHJcblx0XCJpZnJhbWVcIjogWyBcImFwcGxpY2F0aW9uXCIsIFwiZG9jdW1lbnRcIiwgXCJpbWdcIiBdLFxyXG5cdFwiaW1nV2l0aEVtcHR5QWx0XCI6IFsgXCJwcmVzZW50YXRpb25cIiwgXCJub25lXCIgXSxcclxuXHRcImlucHV0VHlwZUJ1dHRvblwiOiBbXHJcblx0XHRcImxpbmssIG1lbnVpdGVtXCIsIFwibWVudWl0ZW1jaGVja2JveFwiLCBcIm1lbnVpdGVtcmFkaW9cIiwgXCJyYWRpb1wiLCBcInN3aXRjaFwiLFxyXG5cdFx0XCJvcHRpb25cIiwgXCJ0YWJcIlxyXG5cdF0sXHJcblx0XCJpbnB1dFR5cGVJbWFnZVwiOiBbXHJcblx0XHRcImxpbmtcIiwgXCJtZW51aXRlbVwiLCBcIm1lbnVpdGVtY2hlY2tib3hcIiwgXCJtZW51aXRlbXJhZGlvXCIsIFwicmFkaW9cIiwgXCJzd2l0Y2hcIlxyXG5cdF0sXHJcblx0XCJpbnB1dFR5cGVDaGVja2JveFwiOiBbIFwiYnV0dG9uXCIsIFwibWVudWl0ZW1jaGVja2JveFwiLCBcIm9wdGlvblwiLCBcInN3aXRjaFwiIF0sXHJcblx0XCJsaVwiOiBbXHJcblx0XHRcIm1lbnVpdGVtXCIsIFwibWVudWl0ZW1jaGVja2JveFwiLCBcIm1lbnVpdGVtcmFkaW9cIiwgXCJvcHRpb25cIiwgXCJub25lXCIsXHJcblx0XHRcInByZXNlbnRhdGlvblwiLCBcInJhZGlvXCIsIFwic2VwYXJhdG9yXCIsIFwidGFiXCIsIFwidHJlZWl0ZW1cIiwgXCJkb2MtYmlibGlvZW50cnlcIixcclxuXHRcdFwiZG9jLWVuZG5vdGVcIlxyXG5cdF0sXHJcblx0XCJuYXZcIjogWyBcImRvYy1pbmRleFwiLCBcImRvYy1wYWdlbGlzdFwiLCBcImRvYy10b2NcIiBdLFxyXG5cdFwib2JqZWN0XCI6IFsgXCJhcHBsaWNhdGlvblwiLCBcImRvY3VtZW50XCIsIFwiaW1nXCIgXSxcclxuXHRcIm9sXCI6IFtcclxuXHRcdFwiZGlyZWN0b3J5XCIsIFwiZ3JvdXBcIiwgXCJsaXN0Ym94XCIsIFwibWVudVwiLCBcIm1lbnViYXIsbm9uZVwiLCBcInByZXNlbnRhdGlvbiBcIixcclxuXHRcdFwicmFkaW9ncm91cFwiLCBcInRhYmxpc3RcIiwgXCJ0b29sYmFyXCIsIFwidHJlZVwiXHJcblx0XSxcclxuXHRcInNlY3Rpb25cIjogW1xyXG5cdFx0XCJhbGVydFwiLCBcImFsZXJ0ZGlhbG9nXCIsIFwiYXBwbGljYXRpb25cIiwgXCJiYW5uZXJcIiwgXCJjb21wbGVtZW50YXJ5XCIsXHJcblx0XHRcImNvbnRlbnRpbmZvXCIsIFwiZGlhbG9nXCIsIFwiZG9jdW1lbnRcIiwgXCJmZWVkXCIsIFwibG9nXCIsIFwibWFpblwiLCBcIm1hcnF1ZWVcIixcclxuXHRcdFwibmF2aWdhdGlvblwiLCBcIm5vbmVcIiwgXCJwcmVzZW50YXRpb25cIiwgXCJzZWFyY2hcIiwgXCJzdGF0dXNcIiwgXCJ0YWJwYW5lbFwiLFxyXG5cdFx0XCJkb2MtYWJzdHJhY3RcIiwgXCJkb2MtYWNrbm93bGVkZ21lbnRzXCIsIFwiZG9jLWFmdGVyd29yZFwiLCBcImRvYy1hcHBlbmRpeFwiLFxyXG5cdFx0XCJkb2MtYmlibGlvZ3JhcGh5XCIsIFwiZG9jLWNoYXB0ZXJcIiwgXCJkb2MtY29sb3Bob25cIiwgXCJkb2MtY29uY2x1c2lvblwiLFxyXG5cdFx0XCJkb2MtY3JlZGl0XCIsIFwiZG9jLWNyZWRpdHNcIiwgXCJkb2MtZGVkaWNhdGlvblwiLCBcImRvYy1lbmRub3Rlc1wiLCBcImRvYy1lcGlsb2d1ZVwiLFxyXG5cdFx0XCJkb2MtZXJyYXRhXCIsIFwiZG9jLWV4YW1wbGVcIiwgXCJkb2MtZm9yZXdvcmRcIiwgXCJkb2MtaW5kZXhcIiwgXCJkb2MtaW50cm9kdWN0aW9uXCIsXHJcblx0XHRcImRvYy1ub3RpY2VcIiwgXCJkb2MtcGFnZWxpc3RcIiwgXCJkb2MtcGFydFwiLCBcImRvYy1wcmVmYWNlXCIsIFwiZG9jLXByb2xvZ3VlXCIsXHJcblx0XHRcImRvYy1wdWxscXVvdGVcIiwgXCJkb2MtcW5hXCIsIFwiZG9jLXRvY1wiXHJcblx0XSxcclxuXHRcInN2Z1wiOiBbIFwiYXBwbGljYXRpb25cIiwgXCJkb2N1bWVudFwiLCBcImltZ1wiIF0sXHJcblx0XCJ1bFwiOiBbXHJcblx0XHRcImRpcmVjdG9yeVwiLCBcImdyb3VwXCIsIFwibGlzdGJveFwiLCBcIm1lbnVcIiwgXCJtZW51YmFyXCIsIFwicmFkaW9ncm91cFwiLFxyXG5cdFx0XCJ0YWJsaXN0XCIsIFwidG9vbGJhclwiLCBcInRyZWVcIiwgXCJwcmVzZW50YXRpb25cIlxyXG5cdF1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb250YWlucyBhIGZ1bmN0aW9uIGZvciBlYWNoIGh0bWxUYWcgd2hlcmUgbm90IGFsbCByb2xlcyBhbGxvd2VkXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqL1xyXG52YXIgcm9sZVBlckhUTUxUYWcgPSB7XHJcblx0YTogKGVsLCByb2xlKSA9PiB7XHJcblx0XHRpZihlbC5ocmVmKSB7XHJcblx0XHRcdHJldHVybiBoYXNBbGxvd2VkUm9sZShcImFXaXRoSHJlZlwiLCByb2xlKSA/IHJvbGUgOiBcImxpbmtcIjtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiByb2xlO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0YXJlYTogKGVsLCByb2xlKSA9PiB7XHJcblx0XHRpZihlbC5ocmVmKSByZXR1cm4gcm9sZSA/IG51bGwgOiBcImxpbmtcIjtcclxuXHRcdHJldHVybiByb2xlO1xyXG5cdH0sXHJcblx0YXJ0aWNsZTogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcImFydGljbGVcIiwgcm9sZSkgPyByb2xlIDogXCJhcnRpY2xlXCIsXHJcblx0YXNpZGU6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJhc2lkZVwiLCByb2xlKSA/IHJvbGUgOiBcImNvbXBsZW1lbnRhcnlcIixcclxuXHRhdWRpbzogKGVsLCByb2xlKSA9PiByb2xlID09IFwiYXBwbGljYXRpb25cIiA/IFwiYXBwbGljYXRpb25cIiA6IG51bGwsXHJcblx0YmFzZTogKCkgPT4gbnVsbCxcclxuXHRib2R5OiAoKSA9PiBcImRvY3VtZW50XCIsXHJcblx0YnV0dG9uOiAoZWwsIHJvbGUpID0+IHtcclxuXHRcdGlmKGVsLnR5cGUgPT0gXCJtZW51XCIpIHtcclxuXHRcdFx0cmV0dXJuIHJvbGUgPT0gXCJtZW51aXRlbVwiID8gXCJtZW51aXRlbVwiIDogXCJidXR0b25cIjtcclxuXHRcdH1cclxuXHRcdHJldHVybiBoYXNBbGxvd2VkUm9sZShcImJ1dHRvblwiLCByb2xlKSA/IHJvbGUgOiBcImJ1dHRvblwiO1xyXG5cdH0sXHJcblx0Y2FwdGlvbjogKCkgPT4gbnVsbCxcclxuXHRjb2w6ICgpID0+IG51bGwsXHJcblx0Y29sZ3JvdXA6ICgpID0+IG51bGwsXHJcblx0ZGF0YWxpc3Q6ICgpID0+IFwibGlzdGJveFwiLFxyXG5cdGRkOiAoKSA9PiBcImRlZmluaXRpb25cIixcclxuXHRkZXRhaWxzOiAoKSA9PiBcImdyb3VwXCIsXHJcblx0ZGlhbG9nOiAoZWwsIHJvbGUpID0+IHJvbGUgPT0gXCJhbGVydGRpYWxvZ1wiID8gXCJhbGVydGRpYWxvZ1wiIDogXCJkaWFsb2dcIixcclxuXHRkbDogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcImRsXCIsIHJvbGUpID8gcm9sZSA6IFwibGlzdFwiLFxyXG5cdGR0OiAoKSA9PiBcImxpc3RpdGVtXCIsXHJcblx0ZW1iZWQ6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJlbWJlZFwiLCByb2xlKSA/IHJvbGUgOiBudWxsLFxyXG5cdGZpZ2NhcHRpb246IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJmaWdjYXB0aW9uXCIsIHJvbGUpID8gcm9sZSA6IG51bGwsXHJcblx0ZmllbGRzZXQ6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJmaWVsZHNldFwiLCByb2xlKT8gcm9sZSA6IG51bGwsXHJcblx0ZmlndXJlOiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwiZmlndXJlXCIsIHJvbGUpID8gcm9sZSA6IFwiZmlndXJlXCIsXHJcblx0Zm9vdGVyOiAoZWwsIHJvbGUpID0+IHtcclxuXHRcdGxldCBoYXNJbXBsaWNpdENvbnRlbnRpbmZvUm9sZSA9ICFnZXRQYXJlbnRXaXRoVGFnTmFtZShlbCwgW1wiQVJUSUNMRVwiLCBcIkFTSURFXCIsIFwiTUFJTlwiLCBcIk5BVlwiLCBcIlNFQ1RJT05cIl0pO1xyXG5cdFx0bGV0IGhhc0FsbG93ZWRSb2xlID0gaGFzQWxsb3dlZFJvbGUoXCJmb290ZXJcIiwgcm9sZSk7XHJcblx0XHRpZihoYXNBbGxvd2VkUm9sZSl7XHJcblx0XHRcdHJldHVybiByb2xlO1xyXG5cdFx0fSBlbHNlIGlmIChoYXNJbXBsaWNpdENvbnRlbnRpbmZvUm9sZSkge1xyXG5cdFx0XHRyZXR1cm4gXCJjb250ZW50aW5mb1wiO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblx0fSxcclxuXHRmb3JtOiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwiZm9ybVwiLCByb2xlKSA/IHJvbGUgOiBcImZvcm1cIixcclxuXHRoMTogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcImgxVG9oNlwiLCByb2xlKSA/IHJvbGUgOiBcImhlYWRpbmdcIixcclxuXHRoMjogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcImgxVG9oNlwiLCByb2xlKSA/IHJvbGUgOiBcImhlYWRpbmdcIixcclxuXHRoMzogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcImgxVG9oNlwiLCByb2xlKSA/IHJvbGUgOiBcImhlYWRpbmdcIixcclxuXHRoNDogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcImgxVG9oNlwiLCByb2xlKSA/IHJvbGUgOiBcImhlYWRpbmdcIixcclxuXHRoNTogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcImgxVG9oNlwiLCByb2xlKSA/IHJvbGUgOiBcImhlYWRpbmdcIixcclxuXHRoNjogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcImgxVG9oNlwiLCByb2xlKSA/IHJvbGUgOiBcImhlYWRpbmdcIixcclxuXHRoZWFkOiAoKSA9PiBudWxsLFxyXG5cdGhlYWRlcjogKGVsLCByb2xlKSA9PiB7XHJcblx0XHRsZXQgaGFzSW1wbGljaXRCYW5uZXJSb2xlID0gIWdldFBhcmVudFdpdGhUYWdOYW1lKGVsLCBbXCJBUlRJQ0xFXCIsIFwiQVNJREVcIiwgXCJNQUlOXCIsIFwiTkFWXCIsIFwiU0VDVElPTlwiXSk7XHJcblx0XHRsZXQgaGFzQWxsb3dlZFJvbGUgPSBoYXNBbGxvd2VkUm9sZShcImhlYWRlclwiLCByb2xlKTtcclxuXHRcdGlmKGhhc0FsbG93ZWRSb2xlKXtcclxuXHRcdFx0cmV0dXJuIHJvbGU7XHJcblx0XHR9IGVsc2UgaWYgKGhhc0ltcGxpY2l0QmFubmVyUm9sZSkge1xyXG5cdFx0XHRyZXR1cm4gXCJiYW5uZXJcIjtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0aHI6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJoclwiLCByb2xlKSA/IHJvbGUgOiBcInNlcGVyYXRvclwiLFxyXG5cdGh0bWw6ICgpID0+IG51bGwsXHJcblx0aWZyYW1lOiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwiaWZyYW1lXCIsIHJvbGUpID8gcm9sZSA6IG51bGwsXHJcblx0aW1nOiAoZWwsIHJvbGUpID0+IHtcclxuXHRcdHZhciBoYXNBbGxvd2VkRW1wdHlBbHRSb2xlID0gaGFzQWxsb3dlZFJvbGUoXCJpbWdXaXRoRW1wdHlBbHRcIiwgcm9sZSk7XHJcblxyXG5cdFx0aWYoZWwuYWx0KSB7XHJcblx0XHRcdC8vIGFueSByb2xlIGV4ZXB0IHRoZSByb2xlcyB1c2VkIGJ5IGVtcHR5IGFsdCB2YWx1ZXNcclxuXHRcdFx0cmV0dXJuIGhhc0FsbG93ZWRFbXB0eUFsdFJvbGUgPyBcImltZ1wiIDogcm9sZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBoYXNBbGxvd2VkRW1wdHlBbHRSb2xlID8gcm9sZSA6IG51bGw7XHJcblx0XHR9XHJcblx0fSxcclxuXHRpbnB1dDogKGVsLCByb2xlKSA9PiB7XHJcblx0XHRzd2l0Y2goZWwudHlwZSkge1xyXG5cdFx0XHRjYXNlIFwiYnV0dG9uXCI6XHJcblx0XHRcdFx0cmV0dXJuIGhhc0FsbG93ZWRSb2xlKFwiaW5wdXRUeXBlQnV0dG9uXCIsIHJvbGUpID8gcm9sZSA6IFwiYnV0dG9uXCI7XHJcblx0XHRcdGNhc2UgXCJjaGVja2JveFwiOlxyXG5cdFx0XHRcdHJldHVybiBoYXNBbGxvd2VkUm9sZShcImlucHV0VHlwZUNoZWNrYm94XCIsIHJvbGUpID8gcm9sZSA6IFwiY2hlY2tib3hcIjtcclxuXHRcdFx0Y2FzZSBcImltYWdlXCI6XHJcblx0XHRcdFx0cmV0dXJuIGhhc0FsbG93ZWRSb2xlKFwiaW5wdXRUeXBlSW1hZ2VcIiwgcm9sZSkgPyByb2xlIDogXCJidXR0b25cIjtcclxuXHRcdFx0Y2FzZSBcIm51bWJlclwiOlxyXG5cdFx0XHRcdHJldHVybiBcInNwaW5idXR0b25cIjtcclxuXHRcdFx0Y2FzZSBcInJhZGlvXCI6XHJcblx0XHRcdFx0cmV0dXJuIHJvbGUgPT0gXCJtZW51aXRlbXJhZGlvXCIgPyBcIm1lbnVpdGVtcmFkaW9cIiA6IFwicmFkaW9cIjtcclxuXHRcdFx0Y2FzZSBcInJhbmdlXCI6XHJcblx0XHRcdFx0cmV0dXJuIFwic2xpZGVyXCI7XHJcblx0XHRcdGNhc2UgXCJzZWFyY2hcIjpcclxuXHRcdFx0XHRyZXR1cm4gZWwubGlzdCA/IFwiY29tYm9ib3hcIiA6IFwic2VhcmNoYm94XCI7XHJcblx0XHRcdGNhc2UgXCJyZXNldFwiOlxyXG5cdFx0XHRjYXNlIFwic3VibWl0XCI6XHJcblx0XHRcdFx0cmV0dXJuIFwiYnV0dG9uXCI7XHJcblx0XHRcdGNhc2UgXCJlbWFpbFwiOlxyXG5cdFx0XHRjYXNlIFwidGVsXCI6XHJcblx0XHRcdGNhc2UgXCJ0ZXh0XCI6XHJcblx0XHRcdGNhc2UgXCJ1cmxcIjpcclxuXHRcdFx0XHRyZXR1cm4gZWwubGlzdCA/IFwiY29tYm9ib3hcIiA6IFwidGV4dGJveFwiO1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0a2V5Z2VuOiAoKSA9PiBudWxsLFxyXG5cdGxhYmVsOiAoKSA9PiBudWxsLFxyXG5cdGxlZ2VuZDogKCkgPT4gbnVsbCxcclxuXHRsaTogKGVsLCByb2xlKSA9PiB7XHJcblx0XHRsZXQgaGFzSW1wbGljaXRMaXN0aXRlbVJvbGUgPSBnZXRQYXJlbnRXaXRoVGFnTmFtZShlbCwgW1wiT0xcIiwgXCJVTFwiXSk7XHJcblxyXG5cdFx0aWYoaGFzSW1wbGljaXRMaXN0aXRlbVJvbGUpIHtcclxuXHRcdFx0cmV0dXJuIGhhc0FsbG93ZWRSb2xlKFwibGlcIiwgcm9sZSkgPyByb2xlIDogXCJsaXN0aXRlbVwiO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIHJvbGU7XHJcblx0XHR9XHJcblx0fSxcclxuXHRsaW5rOiAoZWwsIHJvbGUpID0+IHtcclxuXHRcdGlmKGVsLmhyZWYpIHJldHVybiByb2xlID8gbnVsbCA6IFwibGlua1wiO1xyXG5cdFx0cmV0dXJuIHJvbGU7XHJcblx0fSxcclxuXHRtYWluOiAoKSA9PiBcIm1haW5cIixcclxuXHRtYXA6ICgpID0+IG51bGwsXHJcblx0bWF0aDogKCkgPT4gXCJtYXRoXCIsXHJcblx0bWVudTogKGVsLCByb2xlKSA9PiBlbC50eXBlID09IFwiY29udGV4dFwiID8gXCJtZW51XCIgOiByb2xlLFxyXG5cdG1lbnVpdGVtOiAoZWwsIHJvbGUpID0+IHtcclxuXHRcdHN3aXRjaCAoZWwudHlwZSkge1xyXG5cdFx0XHRjYXNlIFwiY29tbWFuZFwiOlxyXG5cdFx0XHRcdHJldHVybiBcIm1lbnVpdGVtXCI7XHJcblx0XHRcdGNhc2UgXCJjaGVja2JveFwiOlxyXG5cdFx0XHRcdHJldHVybiBcIm1lbnVpdGVtY2hlY2tib3hcIjtcclxuXHRcdFx0Y2FzZSBcInJhZGlvXCI6XHJcblx0XHRcdFx0cmV0dXJuIFwibWVudWl0ZW1yYWRpb1wiO1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHJldHVybiByb2xlO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0bWV0YTogKCkgPT4gbnVsbCxcclxuXHRtZXRlcjogKCkgPT4gbnVsbCxcclxuXHRuYXY6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJuYXZcIiwgcm9sZSkgPyByb2xlIDogXCJuYXZpZ2F0aW9uXCIsXHJcblx0bm9zY3JpcHQ6ICgpID0+IG51bGwsXHJcblx0b2JqZWN0OiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwib2JqZWN0XCIsIHJvbGUpID8gcm9sZSA6IG51bGwsXHJcblx0b2w6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJvbFwiLCByb2xlKSA/IHJvbGUgOiBcImxpc3RcIixcclxuXHRvcHRncm91cDogKCkgPT4gXCJncm91cFwiLFxyXG5cdG9wdGlvbjogKGVsKSA9PiB7XHJcblx0XHRsZXQgd2l0aGluT3B0aW9uTGlzdCA9IFtcInNlbGVjdFwiLCBcIm9wdGdyb3VwXCIsIFwiZGF0YWxpc3RcIl0uaW5kZXhPZihlbC5wYXJlbnROb2RlKSA+IC0xO1xyXG5cdFx0cmV0dXJuIHdpdGhpbk9wdGlvbkxpc3QgPyBcIm9wdGlvblwiIDogbnVsbDtcclxuXHR9LFxyXG5cdG91dHB1dDogKGVsLCByb2xlKSA9PiByb2xlID8gcm9sZSA6IFwic3RhdHVzXCIsXHJcblx0cGFyYW06ICgpID0+IG51bGwsXHJcblx0cGljdHVyZTogKCkgPT4gbnVsbCxcclxuXHRwcm9ncmVzczogKCkgPT4gXCJwcm9ncmVzc2JhclwiLFxyXG5cdHNjcmlwdDogKCkgPT4gbnVsbCxcclxuXHRzZWN0aW9uOiAoZWwsIHJvbGUpID0+IHtcclxuXHRcdGxldCBoYXNWYWxpZFJvbGUgPSBoYXNBbGxvd2VkUm9sZShcInNlY3Rpb25cIiwgcm9sZSk7XHJcblx0XHRpZihoYXNWYWxpZFJvbGUpIHJldHVybiByb2xlO1xyXG5cclxuXHRcdC8vIG9ubHkgaWYgYWNjZXNzaWJsZSBuYW1lXHJcblx0XHRpZihlbC50aXRsZSB8fCBlbC5oYXNBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIpIHx8IGVsLmhhc0F0dHJpYnV0ZShcImFyaWEtbGFiZWxsZWRieVwiKSl7XHJcblx0XHRcdHJldHVybiBcInNlY3Rpb25cIjtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiByb2xlO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0c2VsZWN0OiAoZWwsIHJvbGUpID0+IHtcclxuXHRcdGlmKGVsLm11bHRpcGxlICYmIGVsLnNpemUgPiAxKXtcclxuXHRcdFx0cmV0dXJuIFwibGlzdGJveFwiO1xyXG5cdFx0fSBlbHNlIGlmKCFlbC5tdWx0aXBsZSAmJiBlbC5zaXplIDw9IDEpIHtcclxuXHRcdFx0cmV0dXJuIHJvbGUgPT0gXCJtZW51XCIgPyByb2xlIDogXCJjb21ib2JveFwiO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByb2xlO1xyXG5cdH0sXHJcblx0c291cmNlOiAoKSA9PiBudWxsLFxyXG5cdHN0eWxlOiAoKSA9PiBudWxsLFxyXG5cdHN2ZzogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcInN2Z1wiLCByb2xlKSA/IHJvbGUgOiBudWxsLFxyXG5cdHN1bW1hcnk6ICgpID0+IFwiYnV0dG9uXCIsXHJcblx0dGFibGU6IChlbCwgcm9sZSkgPT4gcm9sZSA/IHJvbGUgOiBcInRhYmxlXCIsXHJcblx0dGVtcGxhdGU6ICgpID0+IG51bGwsXHJcblx0dGV4dGFyZWE6ICgpID0+IFwidGV4dGJveFwiLFxyXG5cdHRoZWFkOiAoZWwsIHJvbGUpID0+IHJvbGUgPyByb2xlIDogXCJyb3dncm91cFwiLFxyXG5cdHRib2R5OiAoZWwsIHJvbGUpID0+IHJvbGUgPyByb2xlIDogXCJyb3dncm91cFwiLFxyXG5cdHRmb290OiAoZWwsIHJvbGUpID0+IHJvbGUgPyByb2xlIDogXCJyb3dncm91cFwiLFxyXG5cdHRpdGxlOiAoKSA9PiBudWxsLFxyXG5cdHRkOiAoZWwsIHJvbGUpID0+IGdldFBhcmVudFdpdGhUYWdOYW1lKGVsLCBbXCJUQUJMRVwiXSkgPyBcImNlbGxcIiA6IHJvbGUsXHJcblx0dGg6IChlbCwgcm9sZSkgPT4ge1xyXG5cdFx0aWYocm9sZSkgcmV0dXJuIHJvbGU7XHJcblx0XHRyZXR1cm4gZ2V0UGFyZW50V2l0aFRhZ05hbWUoZWwsIFtcIlRIRUFEXCJdKSA/IFwiY29sdW1uaGVhZGVyXCIgOiBcInJvd2hlYWRlclwiO1xyXG5cdH0sXHJcblx0dHI6IChlbCwgcm9sZSkgPT4ge1xyXG5cdFx0Ly8gcm9sZT1yb3csIG1heSBiZSBleHBsaWNpdGx5IGRlY2xhcmVkIHdoZW4gY2hpbGQgb2YgYSB0YWJsZSBlbGVtZW50IHdpdGggcm9sZT1ncmlkXHJcblx0XHRyZXR1cm4gcm9sZSA/IHJvbGUgOiBcInJvd1wiO1xyXG5cdH0sXHJcblx0dHJhY2s6ICgpID0+IG51bGwsXHJcblx0dWw6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJ1bFwiLCByb2xlKSA/IHJvbGUgOiBcImxpc3RcIixcclxuXHR2aWRlbzogKGVsLCByb2xlKSA9PiByb2xlID09IFwiYXBwbGljYXRpb25cIiA/IFwiYXBwbGljYXRpb25cIiA6IG51bGxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBGaW5kcyBuZWFyZXN0IHBhcmVudCB3aXRoIGEgc3BlY2lmaWcgdGFnTmFtZVxyXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gXHRcdGVsICAgICAgXHRcdGNoaWxkIC0gc3RhcnRpbmcgcG9pbnRlclxyXG4gKiBAcGFyYW0gIHtBcnJheTxTdHJpbmc+fSBcdHRhZ05hbWUgXHRcdEFycmF5IGNvbnRhaW5nIGNhcGF0aWxpemVkIHRhZ25hbWVzXHJcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fSAgICAgICAgIFx0XHRcdFx0UGFyZW50IHRoYXQgbWF0Y2hlcyBvbmUgb2YgdGhlIHRhZ25hbWVzXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRQYXJlbnRXaXRoVGFnTmFtZShlbCwgdGFnTmFtZSkge1xyXG5cdHdoaWxlIChlbC5wYXJlbnROb2RlKXtcclxuXHRcdGlmKHRhZ05hbWUuaW5kZXhPZihlbC50YWdOYW1lKSA+IC0xKSByZXR1cm4gZWw7XHJcblx0XHRlbCA9IGVsLnBhcmVudE5vZGU7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIGdpdmVuIHJvbGUgaXMgYWxsb3dlZCBmb3IgZ2l2ZW4gdGFnXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gIHRhZ05hbWUga2V5IG9mIGFsbG93ZWRSb2xlc1xyXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICByb2xlICAgIGN1cnJlbnQgcm9sZVxyXG4gKiBAcmV0dXJuIHtCb29sZWFufSAgICAgICAgIFRydWUgaWYgYWxsb3dlZFxyXG4gKi9cclxuZnVuY3Rpb24gaGFzQWxsb3dlZFJvbGUodGFnTmFtZSwgcm9sZSkge1xyXG5cdHJldHVybiBhbGxvd2VkUm9sZXNbdGFnTmFtZV0uaW5kZXhPZihyb2xlKSA+IC0xO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRDb21wdXRlZFJvbGUoZWwpIHtcclxuXHR2YXIgcm9sZSA9IGVsLmdldEF0dHJpYnV0ZShcInJvbGVcIik7XHJcblx0Ly8gY2hlY2sgaWYgZ2l2ZW4gcm9sZSBleGlzdFxyXG5cdGlmKHJvbGUpIHJvbGUgPSByb2xlc1tyb2xlXSA/IHJvbGUgOiBudWxsO1xyXG5cclxuXHR2YXIgdGFnTmFtZSA9IGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcclxuXHQvLyBjYWxsIHBvc3NpYmxlIGN1c3RvbSBmdW5jdGlvbiBpZiB0YWcgaGFzIGFueVxyXG5cdGlmIChyb2xlUGVySFRNTFRhZ1t0YWdOYW1lXSkgcmV0dXJuIHJvbGVQZXJIVE1MVGFnW3RhZ05hbWVdKGVsLCByb2xlKTtcclxuXHJcblx0Ly8gZGVmYXVsdCBiZWhhdmlvciBhLmsuYS4gc2V0IHJvbGVcclxuXHRyZXR1cm4gcm9sZTtcclxufSIsIi8qKlxyXG4gKiBTY3JvbGxzIGFuIGVsZW1lbnQgaW50byBpdHMgcGFyZW50IHZpZXdcclxuICogQHBhcmFtIHtFbGVtZW50fSBjaGlsZCBFbGVtZW50IHRvIHNob3dcclxuICovXHJcbmZ1bmN0aW9uIHNjcm9sbEludG9WaWV3KGNoaWxkKSB7XHJcblx0bGV0IHBhcmVudCA9IGNoaWxkLm9mZnNldFBhcmVudDtcclxuXHRpZiAocGFyZW50ICYmIHBhcmVudC5zY3JvbGxIZWlnaHQgPiBwYXJlbnQuY2xpZW50SGVpZ2h0KSB7XHJcblx0XHR2YXIgc2Nyb2xsQm90dG9tID0gcGFyZW50LmNsaWVudEhlaWdodCArIHBhcmVudC5zY3JvbGxUb3A7XHJcblx0XHR2YXIgZWxlbWVudEJvdHRvbSA9IGNoaWxkLm9mZnNldFRvcCArIGNoaWxkLm9mZnNldEhlaWdodDtcclxuXHRcdGlmIChlbGVtZW50Qm90dG9tID4gc2Nyb2xsQm90dG9tKSB7XHJcblx0XHRcdHBhcmVudC5zY3JvbGxUb3AgPSBlbGVtZW50Qm90dG9tIC0gcGFyZW50LmNsaWVudEhlaWdodDtcclxuXHRcdH0gZWxzZSBpZiAoY2hpbGQub2Zmc2V0VG9wIDwgcGFyZW50LnNjcm9sbFRvcCkge1xyXG5cdFx0XHRwYXJlbnQuc2Nyb2xsVG9wID0gY2hpbGQub2Zmc2V0VG9wO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEFkZHMgZm9jdXMgdG8gdGhlIGZpcnN0IGVsZW1lbnRcclxuICogQHBhcmFtIHtBcnJheX0gZGVzY2VuZGFudHMgQXJyYXkgb2YgYWxsIGRlc2NlbmRhbnRzXHJcbiAqL1xyXG5mdW5jdGlvbiBzdGFydChkZXNjZW5kYW50cykge1xyXG5cdHJldHVybiBhZGQoZGVzY2VuZGFudHNbMF0pO1xyXG59XHJcblxyXG4vKipcclxuICogQWRkcyBmb2N1cyB0byB0aGUgcHJldiBlbGVtZW50XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGRlc2NlbmRhbnRzIEFycmF5IG9mIGFsbCBkZXNjZW5kYW50c1xyXG4gKiBAcGFyYW0ge09iamVjdH0gXHRjaGlsZCBcdFx0XHRDdXJyZW50IGZvY3VzZWQgZWxlbWVudFxyXG4gKi9cclxuZnVuY3Rpb24gcHJldihkZXNjZW5kYW50cywgY2hpbGQpIHtcclxuXHQvLyBmaW5kIGluZGV4IG9mIGN1cnJlbnQgZWxlbWVudFxyXG5cdGxldCBpID0gZGVzY2VuZGFudHMuaW5kZXhPZihjaGlsZCk7XHJcblx0aWYoaSA8PSAwKSBpID0gMTtcclxuXHJcblx0cmV0dXJuIGFkZChkZXNjZW5kYW50c1tpIC0gMV0pO1xyXG59XHJcblxyXG4vKipcclxuICogQWRkcyBmb2N1cyB0byB0aGUgbmV4dCBlbGVtZW50XHJcbiAqIEBwYXJhbSB7QXJyYXl9IFx0ZGVzY2VuZGFudHMgQXJyYXkgb2YgYWxsIGRlc2NlbmRhbnRzXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBcdGNoaWxkIFx0XHRcdEN1cnJlbnQgZm9jdXNlZCBlbGVtZW50XHJcbiAqL1xyXG5mdW5jdGlvbiBuZXh0KGRlc2NlbmRhbnRzLCBjaGlsZCkge1xyXG5cdC8vIGZpbmQgaW5kZXggb2YgY3VycmVudCBlbGVtZW50XHJcblx0bGV0IGkgPSBkZXNjZW5kYW50cy5pbmRleE9mKGNoaWxkKTtcclxuXHRpZiAoaSA+IGRlc2NlbmRhbnRzLmxlbmd0aCAtIDIpIGkgPSBkZXNjZW5kYW50cy5sZW5ndGggLSAyO1xyXG5cclxuXHRyZXR1cm4gYWRkKGRlc2NlbmRhbnRzW2kgKyAxXSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBZGRzIGZvY3VzIHRvIHRoZSBsYXN0IGVsZW1lbnRcclxuICogQHBhcmFtIHtBcnJheX0gZGVzY2VuZGFudHMgQXJyYXkgb2YgYWxsIGRlc2NlbmRhbnRzXHJcbiAqL1xyXG5mdW5jdGlvbiBlbmQoZGVzY2VuZGFudHMpIHtcclxuXHRyZXR1cm4gYWRkKGRlc2NlbmRhbnRzW2Rlc2NlbmRhbnRzLmxlbmd0aCAtIDFdKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkKGNoaWxkKSB7XHJcblx0Y2hpbGQuZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiYXktaG92ZXJcIik7XHJcblx0c2Nyb2xsSW50b1ZpZXcoY2hpbGQuZWxlbWVudCk7XHJcblx0cmV0dXJuIGNoaWxkO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmUoY2hpbGQpIHtcclxuXHRjaGlsZC5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJheS1ob3ZlclwiKTtcdFxyXG5cdHJldHVybiBjaGlsZDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0KGRlc2NlbmRhbnRzKSB7XHJcblx0bGV0IGF5ID0gZGVzY2VuZGFudHMuZmluZChpID0+IGkuZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJheS1ob3ZlclwiKSk7XHJcblx0aWYoIWF5KSByZXR1cm4gZGVzY2VuZGFudHNbMF07XHJcblx0cmV0dXJuIGF5O1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRTZWxlY3RlZChheSwgdmFsKSB7XHJcblx0YXkuc2VsZWN0ZWQgPSB2YWw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldERlc2NlbmRhbnRzKGF5KSB7XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcblx0c3RhcnQsXHJcblx0cHJldixcclxuXHRuZXh0LFxyXG5cdGVuZCxcclxuXHRhZGQsXHJcblx0cmVtb3ZlLFxyXG5cdGdldCxcclxuXHRzZXRTZWxlY3RlZCxcclxuXHRnZXREZXNjZW5kYW50c1xyXG59OyIsImltcG9ydCByb2xlcyBmcm9tIFwiLi8uLi9kYXRhL3JvbGVzXCI7XG5cbi8qKlxuICogUmV0dXJucyBhbiBjc3Mgc2VsZWN0b3IgZm9yIGEgZ2l2ZW4gcm9sZVxuICogQHBhcmFtIHtTdHJpbmd9IGtleSBSb2xlIG5hbWVcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRSb2xlKGtleSkge1xuXHRpZiAoIXJvbGVzW2tleV0pIHJldHVybjtcblxuXHRyZXR1cm4gXCJbcm9sZT0nXCIgKyBrZXkgKyBcIiddXCI7XG59XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSB3aXRoIGFsbCBjc3Mgc2VsZWN0b3JzLCBpbXBsaWNpdCBhbmQgZXhwbGljaXQsIGZvciBhIGdpdmVuIHJvbGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgUm9sZSBuYW1lXG4gKiBAcmV0dXJucyB7P0FycmF5fTtcbiAqL1xuZnVuY3Rpb24gZ2V0U2VsZWN0b3JBcnJheShrZXkpIHtcblx0aWYgKCFyb2xlc1trZXldKSByZXR1cm47XG5cblx0bGV0IHNlbGVjdG9yID0gW107XG5cdHNlbGVjdG9yLnB1c2goZ2V0Um9sZShrZXkpKTtcblx0aWYgKHJvbGVzW2tleV0uaW1wbGljaXQpIHNlbGVjdG9yID0gc2VsZWN0b3IuY29uY2F0KHJvbGVzW2tleV0uaW1wbGljaXQpO1xuXHRyZXR1cm4gc2VsZWN0b3I7XG59XG5cbi8qKlxuICogUmV0dXJucyBhbiBjb21wbGV0ZSBjc3Mgc2VsZWN0b3Igd2l0aCBpbXBsaWN0IGVsZW1lbnRzIGZvciBhIGdpdmVuIHJvbGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgUm9sZSBuYW1lXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0KGtleSkge1xuXHRyZXR1cm4gZ2V0U2VsZWN0b3JBcnJheShrZXkpLmpvaW4oXCIsIFwiKTtcbn1cblxuZnVuY3Rpb24gZ2V0RGVlcFJvbGVBcnJheShrZXkpIHtcblx0aWYgKCFyb2xlc1trZXldKSByZXR1cm47XG5cblx0bGV0IHNlbGVjdG9yID0gW107XG5cdHNlbGVjdG9yLnB1c2goZ2V0Um9sZShrZXkpKTtcblxuXHRpZiAocm9sZXNba2V5XS5zdWIpIHtcblx0XHRyb2xlc1trZXldLnN1Yi5mb3JFYWNoKHZhbCA9PiBzZWxlY3Rvci5wdXNoKGdldFJvbGUodmFsKSkpO1xuXHR9XG5cblx0cmV0dXJuIHNlbGVjdG9yO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVlcFJvbGUoa2V5KSB7XG5cdHJldHVybiBnZXREZWVwUm9sZUFycmF5KGtleSkuam9pbihcIiwgXCIpO1xufVxuXG5mdW5jdGlvbiBnZXREZWVwU2VsZWN0b3JBcnJheShrZXkpIHtcblx0aWYgKCFyb2xlc1trZXldKSByZXR1cm47XG5cblx0bGV0IHNlbGVjdG9yID0gW107XG5cdHNlbGVjdG9yID0gc2VsZWN0b3IuY29uY2F0KGdldFNlbGVjdG9yQXJyYXkoa2V5KSk7XG5cblx0aWYgKHJvbGVzW2tleV0uc3ViKSB7XG5cdFx0cm9sZXNba2V5XS5zdWIuZm9yRWFjaCh2YWwgPT4gc2VsZWN0b3IgPSBzZWxlY3Rvci5jb25jYXQoZ2V0U2VsZWN0b3JBcnJheSh2YWwpKSk7XG5cdH1cblxuXHRyZXR1cm4gc2VsZWN0b3I7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWVwKGtleSkge1xuXHRyZXR1cm4gZ2V0RGVlcFNlbGVjdG9yQXJyYXkoa2V5KS5qb2luKFwiLCBcIik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHsgZ2V0Um9sZSwgZ2V0LCBnZXREZWVwUm9sZSwgZ2V0RGVlcCB9OyJdfQ==
