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

},{"./utils/create":55,"./utils/elements":56}],12:[function(require,module,exports){
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

},{"./../type/DOMString.js":50}],13:[function(require,module,exports){
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

},{"./../type/boolean":51}],14:[function(require,module,exports){
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

},{"./../type/DOMString":50}],15:[function(require,module,exports){
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

},{"./../type/boolean":51}],16:[function(require,module,exports){
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

},{"./../utils/ValidityState":54}],19:[function(require,module,exports){
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

},{"mousetrap":9,"object-path":10}],20:[function(require,module,exports){
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

},{"../attributes/aria-expanded":13,"../attributes/aria-pressed.js":14,"./../type/boolean":51,"./abstract/Command":35,"@vestergaard-company/js-mixin":1}],21:[function(require,module,exports){
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

},{"../attributes/aria-checked.js":12,"./abstract/Input":37,"@vestergaard-company/js-mixin":1}],22:[function(require,module,exports){
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

},{"./../type/boolean":51,"./../utils/selector":60,"./abstract/Select":42}],23:[function(require,module,exports){
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

},{"../attributes/aria-expanded.js":13,"./abstract/Window":45,"@vestergaard-company/js-mixin":1,"mousetrap":9}],24:[function(require,module,exports){
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

},{"./../utils/create":55,"./../utils/elements":56,"./../utils/selector":60,"./abstract/Landmark":38}],25:[function(require,module,exports){
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

},{"../attributes/aria-expanded":13,"./../type/boolean":51,"./abstract/Command.js":35,"@vestergaard-company/js-mixin":1}],26:[function(require,module,exports){
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

},{"./../utils/managingFocus":59,"./abstract/Select":42}],27:[function(require,module,exports){
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

},{"./../type/boolean":51,"./../utils/getActive":57,"./abstract/Input":37}],28:[function(require,module,exports){
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

},{"./abstract/Range.js":39}],29:[function(require,module,exports){
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

},{"./abstract/Range":39,"@vestergaard-company/js-mixin":1}],30:[function(require,module,exports){
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

},{"./Checkbox":21}],31:[function(require,module,exports){
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

},{"./../attributes/aria-selected":15,"./../data/roles":16,"./../utils/elements":56,"./../utils/selector":60,"./abstract/Roletype":40,"@vestergaard-company/js-mixin":1}],32:[function(require,module,exports){
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

},{"./../utils/elements.js":56,"./abstract/Composite":36}],33:[function(require,module,exports){
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

},{"./abstract/Section":41}],34:[function(require,module,exports){
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
 * ##### Basic example
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

},{"./../mixins/Selection":17,"./abstract/Input":37,"@vestergaard-company/js-mixin":1}],35:[function(require,module,exports){
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

},{"./Widget":44}],36:[function(require,module,exports){
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

},{"./Widget":44}],37:[function(require,module,exports){
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

},{"./../../mixins/Validation":18,"./../../utils/elements":56,"./../../utils/selector":60,"./Widget":44,"@vestergaard-company/js-mixin":1}],38:[function(require,module,exports){
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

},{"./Section":41}],39:[function(require,module,exports){
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

},{"./Widget":44}],40:[function(require,module,exports){
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

},{"./../../type/AccessibleNode":48}],41:[function(require,module,exports){
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

},{"./Structure":43}],42:[function(require,module,exports){
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

},{"./../../type/boolean":51,"./../../utils/elements":56,"./../../utils/managingFocus":59,"./../../utils/selector":60,"./../Option.js":27,"./Roletype":40,"@vestergaard-company/js-mixin":1}],43:[function(require,module,exports){
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

},{"./Roletype":40}],44:[function(require,module,exports){
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

},{"./Roletype":40}],45:[function(require,module,exports){
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

},{"./Roletype":40}],46:[function(require,module,exports){
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

},{"./../type/boolean":51,"./../utils/getActive":57,"./abstract/Input":37}],47:[function(require,module,exports){
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

},{"./Textbox":34}],48:[function(require,module,exports){
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
   * @private
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
   * @private
   * @type {AccessibleNodeList}
   */
		_this.controls = new _AccessibleNodeList2.default(_this, "aria-controls");

		/**
   * Contains the next element(s) in an alternate reading order of content which, at the user's 
   * discretion, allows assistive technology to override the general default of reading in
   * document source order.
   * 
   * @see https://www.w3.org/TR/wai-aria-1.1/#aria-flowto
   * @private
   * @type {AccessibleNodeList}
   */
		_this.flowTo = new _AccessibleNodeList2.default(_this, "aria-flowto");

		/**
   * Contains children who's ID are referenced inside the `aria-owns` attribute
   * @see https://www.w3.org/TR/wai-aria-1.1/#aria-owns
   * @private
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

},{"../utils/elements":56,"./../role/Base.js":19,"./AccessibleNodeList":49,"./DOMString":50,"./boolean":51,"./double":52,"./long":53,"object-path":10}],49:[function(require,module,exports){
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

},{"../utils/elements":56,"./../utils/create":55,"./AccessibleNode":48}],50:[function(require,module,exports){
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

},{}],51:[function(require,module,exports){
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

},{}],52:[function(require,module,exports){
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

},{}],53:[function(require,module,exports){
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

},{}],54:[function(require,module,exports){
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

},{"./create":55}],55:[function(require,module,exports){
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

},{"./../role/Button":20,"./../role/Checkbox":21,"./../role/Combobox":22,"./../role/Dialog":23,"./../role/Form":24,"./../role/Link":25,"./../role/Listbox":26,"./../role/Slider":28,"./../role/Spinbutton":29,"./../role/Switch":30,"./../role/Tab":31,"./../role/Tablist":32,"./../role/Tabpanel":33,"./../role/Textbox":34,"./../role/abstract/Range":39,"./../role/abstract/Roletype":40,"./../role/option":46,"./../role/searchbox":47,"./elements":56,"./getComputedRole":58,"./selector":60}],56:[function(require,module,exports){
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

},{"./create":55,"./getComputedRole":58}],57:[function(require,module,exports){
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

},{"./elements":56}],58:[function(require,module,exports){
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

},{"./../data/roles.js":16}],59:[function(require,module,exports){
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

},{}],60:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXNcXEB2ZXN0ZXJnYWFyZC1jb21wYW55XFxqcy1taXhpblxcaW5kZXguanMiLCJub2RlX21vZHVsZXNcXEB2ZXN0ZXJnYWFyZC1jb21wYW55XFxqcy1taXhpblxcc3JjXFxCdWlsZGVyLmpzIiwibm9kZV9tb2R1bGVzXFxAdmVzdGVyZ2FhcmQtY29tcGFueVxcanMtbWl4aW5cXHNyY1xcRGVjb3JhdG9yc1xcQmFyZU1peGluLmpzIiwibm9kZV9tb2R1bGVzXFxAdmVzdGVyZ2FhcmQtY29tcGFueVxcanMtbWl4aW5cXHNyY1xcRGVjb3JhdG9yc1xcQ2FjaGVkLmpzIiwibm9kZV9tb2R1bGVzXFxAdmVzdGVyZ2FhcmQtY29tcGFueVxcanMtbWl4aW5cXHNyY1xcRGVjb3JhdG9yc1xcSGFzSW5zdGFuY2UuanMiLCJub2RlX21vZHVsZXNcXEB2ZXN0ZXJnYWFyZC1jb21wYW55XFxqcy1taXhpblxcc3JjXFxVdGlsc1xcd3JhcC5qcyIsIm5vZGVfbW9kdWxlc1xcQHZlc3RlcmdhYXJkLWNvbXBhbnlcXGpzLW1peGluXFxzcmNcXGRlY2xhcmUuanMiLCJub2RlX21vZHVsZXNcXEB2ZXN0ZXJnYWFyZC1jb21wYW55XFxqcy1taXhpblxcc3JjXFxtaXguanMiLCJub2RlX21vZHVsZXMvbW91c2V0cmFwL21vdXNldHJhcC5qcyIsIm5vZGVfbW9kdWxlcy9vYmplY3QtcGF0aC9pbmRleC5qcyIsInNyY1xcYXBwLmpzIiwic3JjXFxhdHRyaWJ1dGVzXFxhcmlhLWNoZWNrZWQuanMiLCJzcmNcXGF0dHJpYnV0ZXNcXGFyaWEtZXhwYW5kZWQuanMiLCJzcmNcXGF0dHJpYnV0ZXNcXGFyaWEtcHJlc3NlZC5qcyIsInNyY1xcYXR0cmlidXRlc1xcYXJpYS1zZWxlY3RlZC5qcyIsInNyY1xcZGF0YVxccm9sZXMuanMiLCJzcmNcXG1peGluc1xcU2VsZWN0aW9uLmpzIiwic3JjXFxtaXhpbnNcXFZhbGlkYXRpb24uanMiLCJzcmNcXHJvbGVcXEJhc2UuanMiLCJzcmNcXHJvbGVcXEJ1dHRvbi5qcyIsInNyY1xccm9sZVxcQ2hlY2tib3guanMiLCJzcmNcXHJvbGVcXENvbWJvYm94LmpzIiwic3JjXFxyb2xlXFxEaWFsb2cuanMiLCJzcmNcXHJvbGVcXEZvcm0uanMiLCJzcmNcXHJvbGVcXExpbmsuanMiLCJzcmNcXHJvbGVcXExpc3Rib3guanMiLCJzcmNcXHJvbGVcXE9wdGlvbi5qcyIsInNyY1xccm9sZVxcU2xpZGVyLmpzIiwic3JjXFxyb2xlXFxTcGluYnV0dG9uLmpzIiwic3JjXFxyb2xlXFxTd2l0Y2guanMiLCJzcmNcXHJvbGVcXFRhYi5qcyIsInNyY1xccm9sZVxcVGFibGlzdC5qcyIsInNyY1xccm9sZVxcVGFicGFuZWwuanMiLCJzcmNcXHJvbGVcXFRleHRib3guanMiLCJzcmNcXHJvbGVcXGFic3RyYWN0XFxDb21tYW5kLmpzIiwic3JjXFxyb2xlXFxhYnN0cmFjdFxcQ29tcG9zaXRlLmpzIiwic3JjXFxyb2xlXFxhYnN0cmFjdFxcSW5wdXQuanMiLCJzcmNcXHJvbGVcXGFic3RyYWN0XFxMYW5kbWFyay5qcyIsInNyY1xccm9sZVxcYWJzdHJhY3RcXFJhbmdlLmpzIiwic3JjXFxyb2xlXFxhYnN0cmFjdFxcUm9sZXR5cGUuanMiLCJzcmNcXHJvbGVcXGFic3RyYWN0XFxTZWN0aW9uLmpzIiwic3JjXFxyb2xlXFxhYnN0cmFjdFxcU2VsZWN0LmpzIiwic3JjXFxyb2xlXFxhYnN0cmFjdFxcU3RydWN0dXJlLmpzIiwic3JjXFxyb2xlXFxhYnN0cmFjdFxcV2lkZ2V0LmpzIiwic3JjXFxyb2xlXFxhYnN0cmFjdFxcV2luZG93LmpzIiwic3JjXFxyb2xlXFxvcHRpb24uanMiLCJzcmNcXHJvbGVcXHNlYXJjaGJveC5qcyIsInNyY1xcdHlwZVxcQWNjZXNzaWJsZU5vZGUuanMiLCJzcmNcXHR5cGVcXEFjY2Vzc2libGVOb2RlTGlzdC5qcyIsInNyY1xcdHlwZVxcRE9NU3RyaW5nLmpzIiwic3JjXFx0eXBlXFxib29sZWFuLmpzIiwic3JjXFx0eXBlXFxkb3VibGUuanMiLCJzcmNcXHR5cGVcXGxvbmcuanMiLCJzcmNcXHV0aWxzXFxWYWxpZGl0eVN0YXRlLmpzIiwic3JjXFx1dGlsc1xcY3JlYXRlLmpzIiwic3JjXFx1dGlsc1xcZWxlbWVudHMuanMiLCJzcmNcXHV0aWxzXFxnZXRBY3RpdmUuanMiLCJzcmNcXHV0aWxzXFxnZXRDb21wdXRlZFJvbGUuanMiLCJzcmNcXHV0aWxzXFxtYW5hZ2luZ0ZvY3VzLmpzIiwic3JjXFx1dGlsc1xcc2VsZWN0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDRUE7Ozs7QUFJQTs7OztBQUlBOzs7O0FBR0E7Ozs7QUFHQTs7OztBQUlBOzs7Ozs7OztBQWZBOztBQUpBOztRQU1TLFk7O0FBRVQ7O1FBRVMsUztRQUdBLFc7UUFHQSxNOztBQUVUOztRQUVTLEk7OztBQ3JCVDs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBWU0sTzs7QUFFRjs7Ozs7QUFLQSxxQkFBWSxVQUFaLEVBQXVCO0FBQUE7O0FBQ25CLGFBQUssVUFBTCxHQUFrQjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLFdBQWxCO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs7O2dDQU9lO0FBQUEsOENBQVAsTUFBTztBQUFQLHNCQUFPO0FBQUE7O0FBQ1gsbUJBQU8sT0FBTyxNQUFQLENBQWMsVUFBQyxDQUFELEVBQUksQ0FBSixFQUFVOztBQUUzQixvQkFBRyxPQUFPLENBQVAsS0FBYSxVQUFoQixFQUEyQjtBQUN2QiwyQkFBTyxDQUFQO0FBQ0g7O0FBRUQsdUJBQU8sRUFBRSxDQUFGLENBQVA7QUFDSCxhQVBNLEVBT0osS0FBSyxVQVBELENBQVA7QUFRSDs7Ozs7O2tCQUdVLE87OztBQzVDZjs7Ozs7OztBQUVBOzs7Ozs7QUFHQTs7Ozs7QUFLTyxJQUFNLDRDQUFrQixPQUFPLFVBQVAsQ0FBeEI7O0FBRVA7Ozs7Ozs7Ozs7QUFVQSxJQUFNLFlBQVksU0FB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QUFNLFNBQU4sR0FBTSxDQUFDLFVBQUQ7QUFBQSxTQUFnQixzQkFBWSxVQUFaLENBQWhCO0FBQUEsQ0FBWjs7a0JBRWUsRzs7O0FDZmY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcGhDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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LG9CQUFULENBQThCLEdBQTlCLEVBQW1DO0FBQ2xDLEtBQUksQ0FBQyxnQkFBTSxHQUFOLENBQUwsRUFBaUI7O0FBRWpCLEtBQUksV0FBVyxFQUFmO0FBQ0EsWUFBVyxTQUFTLE1BQVQsQ0FBZ0IsaUJBQWlCLEdBQWpCLENBQWhCLENBQVg7O0FBRUEsS0FBSSxnQkFBTSxHQUFOLEVBQVcsR0FBZixFQUFvQjtBQUNuQixrQkFBTSxHQUFOLEVBQVcsR0FBWCxDQUFlLE9BQWYsQ0FBdUI7QUFBQSxVQUFPLFdBQVcsU0FBUyxNQUFULENBQWdCLGlCQUFpQixHQUFqQixDQUFoQixDQUFsQjtBQUFBLEdBQXZCO0FBQ0E7O0FBRUQsUUFBTyxRQUFQO0FBQ0E7O0FBRU0sU0FBUyxPQUFULENBQWlCLEdBQWpCLEVBQXNCO0FBQzVCLFFBQU8scUJBQXFCLEdBQXJCLEVBQTBCLElBQTFCLENBQStCLElBQS9CLENBQVA7QUFDQTs7a0JBRWMsRUFBRSxnQkFBRixFQUFXLFFBQVgsRUFBZ0Isd0JBQWhCLEVBQTZCLGdCQUE3QixFIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuLy8gRGVmYXVsdCBleHBvcnQgLSBNaXggd3JhcHBlclxuaW1wb3J0IG1peCBmcm9tICcuL3NyYy9taXgnO1xuZXhwb3J0IGRlZmF1bHQgbWl4O1xuXG4vLyBEZWNsYXJlIG1peGluIGNsYXNzZXNcbmltcG9ydCBEZWNsYXJlTWl4aW4gZnJvbSAnLi9zcmMvZGVjbGFyZSc7XG5leHBvcnQgeyBEZWNsYXJlTWl4aW4gfTtcblxuLy8gRGVjb3JhdG9yc1xuaW1wb3J0IEJhcmVNaXhpbiBmcm9tICcuL3NyYy9EZWNvcmF0b3JzL0JhcmVNaXhpbic7XG5leHBvcnQgeyBCYXJlTWl4aW4gfTtcblxuaW1wb3J0IEhhc0luc3RhbmNlIGZyb20gJy4vc3JjL0RlY29yYXRvcnMvSGFzSW5zdGFuY2UnO1xuZXhwb3J0IHsgSGFzSW5zdGFuY2UgfTtcblxuaW1wb3J0IENhY2hlZCBmcm9tICcuL3NyYy9EZWNvcmF0b3JzL0NhY2hlZCc7XG5leHBvcnQgeyBDYWNoZWQgfTtcblxuLy8gVXRpbHNcbmltcG9ydCB3cmFwIGZyb20gJy4vc3JjL1V0aWxzL3dyYXAnO1xuZXhwb3J0IHsgd3JhcCB9OyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNaXhpbiBCdWlsZGVyXG4gKlxuICogQWxsb3dzIHlvdSB0byBleHRlbmQgYSBjbGFzcyB3aXRoIG9uZSBvciBtb3JlIG1peGluIGNsYXNzZXMuXG4gKlxuICogVGhpcyBidWlsZGVyIGlzIGhlYXZpbHkgaW5zcGlyZWQgYnkgSnVzdGluIEZhZ25hbmkncyBNaXh3aXRoLmpzXG4gKlxuICogQHNlZSBodHRwOi8vanVzdGluZmFnbmFuaS5jb20vMjAxNS8xMi8yMS9yZWFsLW1peGlucy13aXRoLWphdmFzY3JpcHQtY2xhc3Nlcy9cbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2p1c3RpbmZhZ25hbmkvbWl4d2l0aC5qc1xuICpcbiAqIEBhdXRob3IgQWxpbiBFdWdlbiBEZWFjIDxhZGVAdmVzdGVyZ2FhcmRjb21wYW55LmNvbT5cbiAqL1xuY2xhc3MgQnVpbGRlciB7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgQnVpbGRlciBpbnN0YW5jZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW3N1cGVyQ2xhc3M9Y2xhc3Mge31dXG4gICAgICovXG4gICAgY29uc3RydWN0b3Ioc3VwZXJDbGFzcyl7XG4gICAgICAgIHRoaXMuc3VwZXJDbGFzcyA9IHN1cGVyQ2xhc3MgfHwgY2xhc3Mge307XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWl4aW4gb25lIG9yIG1vcmUgbWl4aW4tY2xhc3Nlc1xuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheS48RnVuY3Rpb24+fSBtaXhpbnNcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIHN1cGNsYXNzIHdpdGggbWl4aW5zIGFwcGxpZWRcbiAgICAgKi9cbiAgICB3aXRoKC4uLm1peGlucyl7XG4gICAgICAgIHJldHVybiBtaXhpbnMucmVkdWNlKChjLCBtKSA9PiB7XG5cbiAgICAgICAgICAgIGlmKHR5cGVvZiBtICE9PSAnZnVuY3Rpb24nKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG0oYyk7XG4gICAgICAgIH0sIHRoaXMuc3VwZXJDbGFzcyk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCdWlsZGVyOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgT1JJR0lOQUxfTUlYSU4gfSBmcm9tICcuLy4uL1V0aWxzL3dyYXAnO1xuaW1wb3J0IHdyYXAgZnJvbSAnLi8uLi9VdGlscy93cmFwJztcblxuLyoqXG4gKiBSZWZlcmVuY2UgdG8gYSBtaXhpblxuICpcbiAqIEB0eXBlIHtTeW1ib2x9XG4gKi9cbmV4cG9ydCBjb25zdCBNSVhJTl9SRUZFUkVOQ0UgPSBTeW1ib2woJ21peGluUmVmJyk7XG5cbi8qKlxuICogRGVjb3JhdG9yIHRoYXQgc3RvcmVzIGEgcmVmZXJlbmNlIHRvIHRoZSBtaXhpbiBjbGFzcywgd2hpY2hcbiAqIHVsdGltYXRlbHkgY2FuIGJlIHVzZWQgZm9yIFwiaW5zdGFuY2Ugb2ZcIiBjaGVja3MuXG4gKlxuICogQHNlZSB3cmFwXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWl4aW5DbGFzc1xuICpcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBEZWNvcmF0ZWQgbWl4aW5cbiAqL1xuY29uc3QgQmFyZU1peGluID0gKG1peGluQ2xhc3MpID0+IHdyYXAobWl4aW5DbGFzcywgKHN1cGVyY2xhc3MpID0+IHtcbiAgICAvLyBBcHBseSB0aGUgbWl4aW4gY2xhc3NcbiAgICBsZXQgYXBwID0gbWl4aW5DbGFzcyhzdXBlcmNsYXNzKTtcblxuICAgIC8vIEFkZCByZWZlcmVuY2UgdG8gdGhlIHdyYXBwZWQgbWl4aW4gY2xhc3MsIHNvIHRoYXQgd2UgY2FuIGVuYWJsZVxuICAgIC8vIGEgXCJpbnN0YW5jZSBvZlwiIHN1cHBvcnQuXG4gICAgYXBwLnByb3RvdHlwZVtNSVhJTl9SRUZFUkVOQ0VdID0gbWl4aW5DbGFzc1tPUklHSU5BTF9NSVhJTl07XG5cbiAgICByZXR1cm4gYXBwO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEJhcmVNaXhpbjsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB3cmFwIGZyb20gJy4vLi4vVXRpbHMvd3JhcCc7XG5cbi8qKlxuICogQ2FjaGVkIG1peGluIGNsYXNzIHJlZmVyZW5jZVxuICpcbiAqIEB0eXBlIHtTeW1ib2x9XG4gKi9cbmV4cG9ydCBjb25zdCBDQUNIRURfUkVGRVJFTkNFID0gU3ltYm9sKCdjYWNoZWRSZWYnKTtcblxuLyoqXG4gKiBEZWNvcmF0ZSB0aGUgZ2l2ZW4gbWl4aW4gY2xhc3Mgd2l0aCBhIFwiY2FjaGVkIGRlY29yYXRvclwiLlxuICpcbiAqIE1ldGhvZCB3aWxsIGVuc3VyZSB0aGF0IGlmIHRoZSBnaXZlbiBtaXhpbiBoYXMgYWxyZWFkeSBiZWVuIGFwcGxpZWQsXG4gKiB0aGVuIGl0IHdpbGwgYmUgcmV0dXJuZWQgLyBhcHBsaWVkIGEgc2luZ2xlIHRpbWUsIHJhdGhlciB0aGFuIG11bHRpcGxlXG4gKiB0aW1lcy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtaXhpbkNsYXNzXG4gKlxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cbmNvbnN0IENhY2hlZCA9IChtaXhpbkNsYXNzKSA9PiB3cmFwKG1peGluQ2xhc3MsIChzdXBlcmNsYXNzKSA9PiB7XG4gICAgLy8gT2J0YWluIGNhY2hlZCByZWZlcmVuY2UuLi5cbiAgICBsZXQgY2FjaGVkUmVmZXJlbmNlID0gbWl4aW5DbGFzc1tDQUNIRURfUkVGRVJFTkNFXTtcblxuICAgIC8vIElmIHRoZXJlIGlzIG5vIGNhY2hlZCByZWZlcmVuY2UsIHRoZW4gd2UgY3JlYXRlIG9uZSBvbnRvXG4gICAgLy8gdGhlIGdpdmVuIG1peGluIGNsYXNzXG4gICAgaWYoICEgY2FjaGVkUmVmZXJlbmNlKXtcblxuICAgICAgICAvLyBDcmVhdGUgYSBuZXcgc3ltYm9sIGluIHRoZSBtaXhpbiBjbGFzcywgdXNpbmcgdGhlIGZ1bmN0aW9uJ3MgbmFtZVxuICAgICAgICAvLyBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0Z1bmN0aW9uL25hbWVcbiAgICAgICAgY2FjaGVkUmVmZXJlbmNlID0gbWl4aW5DbGFzc1tDQUNIRURfUkVGRVJFTkNFXSA9IFN5bWJvbChtaXhpbkNsYXNzLm5hbWUpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGlmIGdpdmVuIHN1cGVyY2xhc3MgYWxyZWFkeSBoYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdpdmVuIG1peGluIGNsYXNzXG4gICAgLy8gSWYgc28sIHRoZW4gcmV0dXJuIGl0LlxuICAgIGlmKHN1cGVyY2xhc3MuaGFzT3duUHJvcGVydHkoY2FjaGVkUmVmZXJlbmNlKSl7XG4gICAgICAgIHJldHVybiBzdXBlcmNsYXNzW2NhY2hlZFJlZmVyZW5jZV07XG4gICAgfVxuXG4gICAgLy8gRGVjb3JhdGUgdGhlIGdpdmVuIHN1cGVyIGNsYXNzXG4gICAgbGV0IGRlY29yYXRlZCA9IG1peGluQ2xhc3Moc3VwZXJjbGFzcyk7XG5cbiAgICAvLyBDYWNoZSB0aGUgcmVmZXJlbmNlIGludG8gdGhlIHN1cGVyY2xhc3NcbiAgICBzdXBlcmNsYXNzW2NhY2hlZFJlZmVyZW5jZV0gPSBkZWNvcmF0ZWQ7XG5cbiAgICAvLyBGaW5hbGx5LCByZXR1cm4gdGhlIGRlY29yYXRlZCBtaXhpbi5cbiAgICByZXR1cm4gZGVjb3JhdGVkO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENhY2hlZDsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IE9SSUdJTkFMX01JWElOIH0gZnJvbSAnLi8uLi9VdGlscy93cmFwJztcbmltcG9ydCB7IE1JWElOX1JFRkVSRU5DRSB9IGZyb20gJy4vQmFyZU1peGluJztcblxuLyoqXG4gKiBEZWNvcmF0ZXMgdGhlIGdpdmVuIG1peGluIGNsYXNzIHRvIHN1cHBvcnQgXCJpbnN0YW5jZSBvZlwiIG9wZXJhdGlvbi5cbiAqXG4gKiBUaGUgZ2l2ZW4gbWl4aW4gY2xhc3MgTVVTVCBiZSBkZWNvcmF0ZWQgd2l0aCB0aGUgXCJCYXJlTWl4aW5cIiBmb3IgdGhpc1xuICogdG8gd29yay5cbiAqXG4gKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1N5bWJvbC9oYXNJbnN0YW5jZVxuICogQHNlZSBCYXJlTWl4aW5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtaXhpbkNsYXNzXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gRGVjb3JhdGVkIG1peGluIGNsYXNzXG4gKi9cbmNvbnN0IEhhc0luc3RhbmNlID0gKG1peGluQ2xhc3MpID0+IHtcblxuICAgIC8vIElmIGdpdmVuIG1peGluIGNsYXNzIGFscmVhZHkgaGFzIGEgY3VzdG9tIFwiaGFzIGluc3RhbmNlXCJcbiAgICAvLyBzeW1ib2wsIHRoZW4gYWJvcnQgLSBqdXN0IHJldHVybiB0aGUgbWl4aW4sIHNpbmNlIHRoZXJlXG4gICAgLy8gaXMgbm8gbmVlZCB0byBhZGQgY3VzdG9tIGJlaGF2aW91ciB0byBpdC5cbiAgICBpZihtaXhpbkNsYXNzLmhhc093blByb3BlcnR5KFN5bWJvbC5oYXNJbnN0YW5jZSkpe1xuICAgICAgICByZXR1cm4gbWl4aW5DbGFzcztcbiAgICB9XG5cbiAgICAvLyBPdGhlcndpc2UsIHdlIGFkZCBhIGN1c3RvbSBTeW1ib2wuaGFzSW5zdGFuY2UgbWV0aG9kIGZvclxuICAgIC8vIHRoZSBtaXhpbiBjbGFzcy5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobWl4aW5DbGFzcywgU3ltYm9sLmhhc0luc3RhbmNlLCB7XG5cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKGluc3RhbmNlKXtcbiAgICAgICAgICAgIC8vIEZldGNoIHRoZSBvcmlnaW5hbCBtaXhpbiBjbGFzc1xuICAgICAgICAgICAgbGV0IG9yaWdpbmFsTWl4aW5DbGFzcyA9IHRoaXNbT1JJR0lOQUxfTUlYSU5dO1xuXG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBubyBvcmlnaW5hbCBtaXhpbiBjbGFzcywgdGhlbiB3ZSBzaW1wbHlcbiAgICAgICAgICAgIC8vIGFib3J0IC0gaXQgY2Fubm90IGJlIGFuIGluc3RhbmNlIG9mIHRoZSBnaXZlbi4uLlxuICAgICAgICAgICAgaWYoICEgb3JpZ2luYWxNaXhpbkNsYXNzKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIExvb3AgdGhyb3VnaCB0aGUgZ2l2ZW4gaW5zdGFuY2UncyBwcm90b3R5cGUgY2hhaW5cbiAgICAgICAgICAgIHdoaWxlKGluc3RhbmNlICE9PSBudWxsKXtcblxuICAgICAgICAgICAgICAgIC8vIElmIGEgcmVmZXJlbmNlIGhhcyBiZWVuIHN0YXRlZCBvbiB0aGUgbWl4aW4gY2xhc3MgYW5kIGl0XG4gICAgICAgICAgICAgICAgLy8gbWF0Y2hlcyB0aGUgb3JpZ2luYWwgbWl4aW4sIHdlIGFzc3VtZSB0aGF0XG4gICAgICAgICAgICAgICAgaWYoaW5zdGFuY2UuaGFzT3duUHJvcGVydHkoTUlYSU5fUkVGRVJFTkNFKSAmJiBpbnN0YW5jZVtNSVhJTl9SRUZFUkVOQ0VdID09PSBvcmlnaW5hbE1peGluQ2xhc3Mpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBGZXRjaCB0aGUgbmV4dCBwcm90b3R5cGVcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihpbnN0YW5jZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIElmIG5vdGhpbmcgd2FzIG1hdGNoZWQsIHRoZW4gd2UgYXNzdW1lIHRoYXQgdGhlIGluc3RhbmNlc1xuICAgICAgICAgICAgLy8gc2ltcGx5IGRvIG5vdCBtYXRjaC5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICAvLyBGaW5hbGx5LCByZXR1cm4gdGhlIGRlY29yYXRlZCBtaXhpbiBjbGFzc1xuICAgIHJldHVybiBtaXhpbkNsYXNzO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSGFzSW5zdGFuY2U7IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFJlZmVyZW5jZSB0byBhbiBvcmlnaW5hbCBtaXhpblxuICpcbiAqIEB0eXBlIHtTeW1ib2x9XG4gKi9cbmV4cG9ydCBjb25zdCBPUklHSU5BTF9NSVhJTiA9IFN5bWJvbCgnb3JpZ2luYWxNaXhpbicpO1xuXG4vKipcbiAqIFNldHMgdGhlIHByb3RvdHlwZSBvZiB0aGUgd3JhcHBlciB0byBiZSB0aGUgZ2l2ZW4gbWl4aW4gY2xhc3NcbiAqIGFuZCBzdG9yZXMgYSByZWZlcmVuY2UgdG8gdGhlIG9yaWdpbmFsIG1peGluLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1peGluQ2xhc3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHdyYXBwZXJcbiAqXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gV3JhcHBlclxuICovXG5jb25zdCB3cmFwID0gKG1peGluQ2xhc3MsIHdyYXBwZXIpID0+IHtcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2Yod3JhcHBlciwgbWl4aW5DbGFzcyk7XG5cbiAgICBpZiAoIW1peGluQ2xhc3NbT1JJR0lOQUxfTUlYSU5dKSB7XG4gICAgICAgIG1peGluQ2xhc3NbT1JJR0lOQUxfTUlYSU5dID0gbWl4aW5DbGFzcztcbiAgICB9XG5cbiAgICByZXR1cm4gd3JhcHBlcjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdyYXA7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQmFyZU1peGluIGZyb20gJy4vRGVjb3JhdG9ycy9CYXJlTWl4aW4nO1xuaW1wb3J0IEhhc0luc3RhbmNlIGZyb20gJy4vRGVjb3JhdG9ycy9IYXNJbnN0YW5jZSc7XG5pbXBvcnQgQ2FjaGVkIGZyb20gJy4vRGVjb3JhdG9ycy9DYWNoZWQnO1xuXG4vKipcbiAqIERlY2xhcmUgYSBtaXhpbiAtIGRlY29yYXRlcyB0aGUgZ2l2ZW4gbWl4aW4gY2xhc3Mgd2l0aFxuICogYSBcImNhY2hlZCwgaGFzIGluc3RhbmNlIGFuZCBiYXJlIG1peGluXCIgZGVjb3JhdG9ycy5cbiAqXG4gKiBAc2VlIEJhcmVNaXhpblxuICogQHNlZSBIYXNJbnN0YW5jZVxuICogQHNlZSBDYWNoZWRcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtaXhpbkNsYXNzXG4gKlxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cbmNvbnN0IERlY2xhcmVNaXhpbiA9IChtaXhpbkNsYXNzKSA9PiB7XG4gICAgcmV0dXJuIENhY2hlZChcbiAgICAgICAgSGFzSW5zdGFuY2UoXG4gICAgICAgICAgICBCYXJlTWl4aW4obWl4aW5DbGFzcylcbiAgICAgICAgKVxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEZWNsYXJlTWl4aW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQnVpbGRlciBmcm9tICcuL0J1aWxkZXInO1xuXG4vKipcbiAqIE1peGluIEJ1aWxkZXIgd3JhcHBlclxuICpcbiAqIEFsbG93cyB5b3UgdG8gZXh0ZW5kIGEgY2xhc3Mgd2l0aCBvbmUgb3IgbW9yZSBtaXhpbi1jbGFzc2VzLlxuICpcbiAqIEBzZWUgQnVpbGRlclxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IFtzdXBlckNsYXNzPWNsYXNzIHt9XVxuICovXG5jb25zdCBtaXggPSAoc3VwZXJDbGFzcykgPT4gbmV3IEJ1aWxkZXIoc3VwZXJDbGFzcyk7XG5cbmV4cG9ydCBkZWZhdWx0IG1peDsiLCIvKmdsb2JhbCBkZWZpbmU6ZmFsc2UgKi9cbi8qKlxuICogQ29weXJpZ2h0IDIwMTItMjAxNyBDcmFpZyBDYW1wYmVsbFxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqIE1vdXNldHJhcCBpcyBhIHNpbXBsZSBrZXlib2FyZCBzaG9ydGN1dCBsaWJyYXJ5IGZvciBKYXZhc2NyaXB0IHdpdGhcbiAqIG5vIGV4dGVybmFsIGRlcGVuZGVuY2llc1xuICpcbiAqIEB2ZXJzaW9uIDEuNi4xXG4gKiBAdXJsIGNyYWlnLmlzL2tpbGxpbmcvbWljZVxuICovXG4oZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkKSB7XG5cbiAgICAvLyBDaGVjayBpZiBtb3VzZXRyYXAgaXMgdXNlZCBpbnNpZGUgYnJvd3NlciwgaWYgbm90LCByZXR1cm5cbiAgICBpZiAoIXdpbmRvdykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogbWFwcGluZyBvZiBzcGVjaWFsIGtleWNvZGVzIHRvIHRoZWlyIGNvcnJlc3BvbmRpbmcga2V5c1xuICAgICAqXG4gICAgICogZXZlcnl0aGluZyBpbiB0aGlzIGRpY3Rpb25hcnkgY2Fubm90IHVzZSBrZXlwcmVzcyBldmVudHNcbiAgICAgKiBzbyBpdCBoYXMgdG8gYmUgaGVyZSB0byBtYXAgdG8gdGhlIGNvcnJlY3Qga2V5Y29kZXMgZm9yXG4gICAgICoga2V5dXAva2V5ZG93biBldmVudHNcbiAgICAgKlxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgdmFyIF9NQVAgPSB7XG4gICAgICAgIDg6ICdiYWNrc3BhY2UnLFxuICAgICAgICA5OiAndGFiJyxcbiAgICAgICAgMTM6ICdlbnRlcicsXG4gICAgICAgIDE2OiAnc2hpZnQnLFxuICAgICAgICAxNzogJ2N0cmwnLFxuICAgICAgICAxODogJ2FsdCcsXG4gICAgICAgIDIwOiAnY2Fwc2xvY2snLFxuICAgICAgICAyNzogJ2VzYycsXG4gICAgICAgIDMyOiAnc3BhY2UnLFxuICAgICAgICAzMzogJ3BhZ2V1cCcsXG4gICAgICAgIDM0OiAncGFnZWRvd24nLFxuICAgICAgICAzNTogJ2VuZCcsXG4gICAgICAgIDM2OiAnaG9tZScsXG4gICAgICAgIDM3OiAnbGVmdCcsXG4gICAgICAgIDM4OiAndXAnLFxuICAgICAgICAzOTogJ3JpZ2h0JyxcbiAgICAgICAgNDA6ICdkb3duJyxcbiAgICAgICAgNDU6ICdpbnMnLFxuICAgICAgICA0NjogJ2RlbCcsXG4gICAgICAgIDkxOiAnbWV0YScsXG4gICAgICAgIDkzOiAnbWV0YScsXG4gICAgICAgIDIyNDogJ21ldGEnXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIG1hcHBpbmcgZm9yIHNwZWNpYWwgY2hhcmFjdGVycyBzbyB0aGV5IGNhbiBzdXBwb3J0XG4gICAgICpcbiAgICAgKiB0aGlzIGRpY3Rpb25hcnkgaXMgb25seSB1c2VkIGluY2FzZSB5b3Ugd2FudCB0byBiaW5kIGFcbiAgICAgKiBrZXl1cCBvciBrZXlkb3duIGV2ZW50IHRvIG9uZSBvZiB0aGVzZSBrZXlzXG4gICAgICpcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHZhciBfS0VZQ09ERV9NQVAgPSB7XG4gICAgICAgIDEwNjogJyonLFxuICAgICAgICAxMDc6ICcrJyxcbiAgICAgICAgMTA5OiAnLScsXG4gICAgICAgIDExMDogJy4nLFxuICAgICAgICAxMTEgOiAnLycsXG4gICAgICAgIDE4NjogJzsnLFxuICAgICAgICAxODc6ICc9JyxcbiAgICAgICAgMTg4OiAnLCcsXG4gICAgICAgIDE4OTogJy0nLFxuICAgICAgICAxOTA6ICcuJyxcbiAgICAgICAgMTkxOiAnLycsXG4gICAgICAgIDE5MjogJ2AnLFxuICAgICAgICAyMTk6ICdbJyxcbiAgICAgICAgMjIwOiAnXFxcXCcsXG4gICAgICAgIDIyMTogJ10nLFxuICAgICAgICAyMjI6ICdcXCcnXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIHRoaXMgaXMgYSBtYXBwaW5nIG9mIGtleXMgdGhhdCByZXF1aXJlIHNoaWZ0IG9uIGEgVVMga2V5cGFkXG4gICAgICogYmFjayB0byB0aGUgbm9uIHNoaWZ0IGVxdWl2ZWxlbnRzXG4gICAgICpcbiAgICAgKiB0aGlzIGlzIHNvIHlvdSBjYW4gdXNlIGtleXVwIGV2ZW50cyB3aXRoIHRoZXNlIGtleXNcbiAgICAgKlxuICAgICAqIG5vdGUgdGhhdCB0aGlzIHdpbGwgb25seSB3b3JrIHJlbGlhYmx5IG9uIFVTIGtleWJvYXJkc1xuICAgICAqXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICB2YXIgX1NISUZUX01BUCA9IHtcbiAgICAgICAgJ34nOiAnYCcsXG4gICAgICAgICchJzogJzEnLFxuICAgICAgICAnQCc6ICcyJyxcbiAgICAgICAgJyMnOiAnMycsXG4gICAgICAgICckJzogJzQnLFxuICAgICAgICAnJSc6ICc1JyxcbiAgICAgICAgJ14nOiAnNicsXG4gICAgICAgICcmJzogJzcnLFxuICAgICAgICAnKic6ICc4JyxcbiAgICAgICAgJygnOiAnOScsXG4gICAgICAgICcpJzogJzAnLFxuICAgICAgICAnXyc6ICctJyxcbiAgICAgICAgJysnOiAnPScsXG4gICAgICAgICc6JzogJzsnLFxuICAgICAgICAnXFxcIic6ICdcXCcnLFxuICAgICAgICAnPCc6ICcsJyxcbiAgICAgICAgJz4nOiAnLicsXG4gICAgICAgICc/JzogJy8nLFxuICAgICAgICAnfCc6ICdcXFxcJ1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiB0aGlzIGlzIGEgbGlzdCBvZiBzcGVjaWFsIHN0cmluZ3MgeW91IGNhbiB1c2UgdG8gbWFwXG4gICAgICogdG8gbW9kaWZpZXIga2V5cyB3aGVuIHlvdSBzcGVjaWZ5IHlvdXIga2V5Ym9hcmQgc2hvcnRjdXRzXG4gICAgICpcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHZhciBfU1BFQ0lBTF9BTElBU0VTID0ge1xuICAgICAgICAnb3B0aW9uJzogJ2FsdCcsXG4gICAgICAgICdjb21tYW5kJzogJ21ldGEnLFxuICAgICAgICAncmV0dXJuJzogJ2VudGVyJyxcbiAgICAgICAgJ2VzY2FwZSc6ICdlc2MnLFxuICAgICAgICAncGx1cyc6ICcrJyxcbiAgICAgICAgJ21vZCc6IC9NYWN8aVBvZHxpUGhvbmV8aVBhZC8udGVzdChuYXZpZ2F0b3IucGxhdGZvcm0pID8gJ21ldGEnIDogJ2N0cmwnXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIHZhcmlhYmxlIHRvIHN0b3JlIHRoZSBmbGlwcGVkIHZlcnNpb24gb2YgX01BUCBmcm9tIGFib3ZlXG4gICAgICogbmVlZGVkIHRvIGNoZWNrIGlmIHdlIHNob3VsZCB1c2Uga2V5cHJlc3Mgb3Igbm90IHdoZW4gbm8gYWN0aW9uXG4gICAgICogaXMgc3BlY2lmaWVkXG4gICAgICpcbiAgICAgKiBAdHlwZSB7T2JqZWN0fHVuZGVmaW5lZH1cbiAgICAgKi9cbiAgICB2YXIgX1JFVkVSU0VfTUFQO1xuXG4gICAgLyoqXG4gICAgICogbG9vcCB0aHJvdWdoIHRoZSBmIGtleXMsIGYxIHRvIGYxOSBhbmQgYWRkIHRoZW0gdG8gdGhlIG1hcFxuICAgICAqIHByb2dyYW1hdGljYWxseVxuICAgICAqL1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgMjA7ICsraSkge1xuICAgICAgICBfTUFQWzExMSArIGldID0gJ2YnICsgaTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBsb29wIHRocm91Z2ggdG8gbWFwIG51bWJlcnMgb24gdGhlIG51bWVyaWMga2V5cGFkXG4gICAgICovXG4gICAgZm9yIChpID0gMDsgaSA8PSA5OyArK2kpIHtcblxuICAgICAgICAvLyBUaGlzIG5lZWRzIHRvIHVzZSBhIHN0cmluZyBjYXVzZSBvdGhlcndpc2Ugc2luY2UgMCBpcyBmYWxzZXlcbiAgICAgICAgLy8gbW91c2V0cmFwIHdpbGwgbmV2ZXIgZmlyZSBmb3IgbnVtcGFkIDAgcHJlc3NlZCBhcyBwYXJ0IG9mIGEga2V5ZG93blxuICAgICAgICAvLyBldmVudC5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vY2NhbXBiZWxsL21vdXNldHJhcC9wdWxsLzI1OFxuICAgICAgICBfTUFQW2kgKyA5Nl0gPSBpLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY3Jvc3MgYnJvd3NlciBhZGQgZXZlbnQgbWV0aG9kXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR8SFRNTERvY3VtZW50fSBvYmplY3RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9hZGRFdmVudChvYmplY3QsIHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChvYmplY3QuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgb2JqZWN0LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgY2FsbGJhY2ssIGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIG9iamVjdC5hdHRhY2hFdmVudCgnb24nICsgdHlwZSwgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHRha2VzIHRoZSBldmVudCBhbmQgcmV0dXJucyB0aGUga2V5IGNoYXJhY3RlclxuICAgICAqXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfY2hhcmFjdGVyRnJvbUV2ZW50KGUpIHtcblxuICAgICAgICAvLyBmb3Iga2V5cHJlc3MgZXZlbnRzIHdlIHNob3VsZCByZXR1cm4gdGhlIGNoYXJhY3RlciBhcyBpc1xuICAgICAgICBpZiAoZS50eXBlID09ICdrZXlwcmVzcycpIHtcbiAgICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuXG4gICAgICAgICAgICAvLyBpZiB0aGUgc2hpZnQga2V5IGlzIG5vdCBwcmVzc2VkIHRoZW4gaXQgaXMgc2FmZSB0byBhc3N1bWVcbiAgICAgICAgICAgIC8vIHRoYXQgd2Ugd2FudCB0aGUgY2hhcmFjdGVyIHRvIGJlIGxvd2VyY2FzZS4gIHRoaXMgbWVhbnMgaWZcbiAgICAgICAgICAgIC8vIHlvdSBhY2NpZGVudGFsbHkgaGF2ZSBjYXBzIGxvY2sgb24gdGhlbiB5b3VyIGtleSBiaW5kaW5nc1xuICAgICAgICAgICAgLy8gd2lsbCBjb250aW51ZSB0byB3b3JrXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gdGhlIG9ubHkgc2lkZSBlZmZlY3QgdGhhdCBtaWdodCBub3QgYmUgZGVzaXJlZCBpcyBpZiB5b3VcbiAgICAgICAgICAgIC8vIGJpbmQgc29tZXRoaW5nIGxpa2UgJ0EnIGNhdXNlIHlvdSB3YW50IHRvIHRyaWdnZXIgYW5cbiAgICAgICAgICAgIC8vIGV2ZW50IHdoZW4gY2FwaXRhbCBBIGlzIHByZXNzZWQgY2FwcyBsb2NrIHdpbGwgbm8gbG9uZ2VyXG4gICAgICAgICAgICAvLyB0cmlnZ2VyIHRoZSBldmVudC4gIHNoaWZ0K2Egd2lsbCB0aG91Z2guXG4gICAgICAgICAgICBpZiAoIWUuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXIudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGNoYXJhY3RlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZvciBub24ga2V5cHJlc3MgZXZlbnRzIHRoZSBzcGVjaWFsIG1hcHMgYXJlIG5lZWRlZFxuICAgICAgICBpZiAoX01BUFtlLndoaWNoXSkge1xuICAgICAgICAgICAgcmV0dXJuIF9NQVBbZS53aGljaF07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoX0tFWUNPREVfTUFQW2Uud2hpY2hdKSB7XG4gICAgICAgICAgICByZXR1cm4gX0tFWUNPREVfTUFQW2Uud2hpY2hdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgaXQgaXMgbm90IGluIHRoZSBzcGVjaWFsIG1hcFxuXG4gICAgICAgIC8vIHdpdGgga2V5ZG93biBhbmQga2V5dXAgZXZlbnRzIHRoZSBjaGFyYWN0ZXIgc2VlbXMgdG8gYWx3YXlzXG4gICAgICAgIC8vIGNvbWUgaW4gYXMgYW4gdXBwZXJjYXNlIGNoYXJhY3RlciB3aGV0aGVyIHlvdSBhcmUgcHJlc3Npbmcgc2hpZnRcbiAgICAgICAgLy8gb3Igbm90LiAgd2Ugc2hvdWxkIG1ha2Ugc3VyZSBpdCBpcyBhbHdheXMgbG93ZXJjYXNlIGZvciBjb21wYXJpc29uc1xuICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoZWNrcyBpZiB0d28gYXJyYXlzIGFyZSBlcXVhbFxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheX0gbW9kaWZpZXJzMVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IG1vZGlmaWVyczJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfbW9kaWZpZXJzTWF0Y2gobW9kaWZpZXJzMSwgbW9kaWZpZXJzMikge1xuICAgICAgICByZXR1cm4gbW9kaWZpZXJzMS5zb3J0KCkuam9pbignLCcpID09PSBtb2RpZmllcnMyLnNvcnQoKS5qb2luKCcsJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdGFrZXMgYSBrZXkgZXZlbnQgYW5kIGZpZ3VyZXMgb3V0IHdoYXQgdGhlIG1vZGlmaWVycyBhcmVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICovXG4gICAgZnVuY3Rpb24gX2V2ZW50TW9kaWZpZXJzKGUpIHtcbiAgICAgICAgdmFyIG1vZGlmaWVycyA9IFtdO1xuXG4gICAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICBtb2RpZmllcnMucHVzaCgnc2hpZnQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlLmFsdEtleSkge1xuICAgICAgICAgICAgbW9kaWZpZXJzLnB1c2goJ2FsdCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGUuY3RybEtleSkge1xuICAgICAgICAgICAgbW9kaWZpZXJzLnB1c2goJ2N0cmwnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlLm1ldGFLZXkpIHtcbiAgICAgICAgICAgIG1vZGlmaWVycy5wdXNoKCdtZXRhJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbW9kaWZpZXJzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHByZXZlbnRzIGRlZmF1bHQgZm9yIHRoaXMgZXZlbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgZnVuY3Rpb24gX3ByZXZlbnREZWZhdWx0KGUpIHtcbiAgICAgICAgaWYgKGUucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzdG9wcyBwcm9wb2dhdGlvbiBmb3IgdGhpcyBldmVudFxuICAgICAqXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfc3RvcFByb3BhZ2F0aW9uKGUpIHtcbiAgICAgICAgaWYgKGUuc3RvcFByb3BhZ2F0aW9uKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZS5jYW5jZWxCdWJibGUgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGRldGVybWluZXMgaWYgdGhlIGtleWNvZGUgc3BlY2lmaWVkIGlzIGEgbW9kaWZpZXIga2V5IG9yIG5vdFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9pc01vZGlmaWVyKGtleSkge1xuICAgICAgICByZXR1cm4ga2V5ID09ICdzaGlmdCcgfHwga2V5ID09ICdjdHJsJyB8fCBrZXkgPT0gJ2FsdCcgfHwga2V5ID09ICdtZXRhJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXZlcnNlcyB0aGUgbWFwIGxvb2t1cCBzbyB0aGF0IHdlIGNhbiBsb29rIGZvciBzcGVjaWZpYyBrZXlzXG4gICAgICogdG8gc2VlIHdoYXQgY2FuIGFuZCBjYW4ndCB1c2Uga2V5cHJlc3NcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfZ2V0UmV2ZXJzZU1hcCgpIHtcbiAgICAgICAgaWYgKCFfUkVWRVJTRV9NQVApIHtcbiAgICAgICAgICAgIF9SRVZFUlNFX01BUCA9IHt9O1xuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIF9NQVApIHtcblxuICAgICAgICAgICAgICAgIC8vIHB1bGwgb3V0IHRoZSBudW1lcmljIGtleXBhZCBmcm9tIGhlcmUgY2F1c2Uga2V5cHJlc3Mgc2hvdWxkXG4gICAgICAgICAgICAgICAgLy8gYmUgYWJsZSB0byBkZXRlY3QgdGhlIGtleXMgZnJvbSB0aGUgY2hhcmFjdGVyXG4gICAgICAgICAgICAgICAgaWYgKGtleSA+IDk1ICYmIGtleSA8IDExMikge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoX01BUC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIF9SRVZFUlNFX01BUFtfTUFQW2tleV1dID0ga2V5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX1JFVkVSU0VfTUFQO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHBpY2tzIHRoZSBiZXN0IGFjdGlvbiBiYXNlZCBvbiB0aGUga2V5IGNvbWJpbmF0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gY2hhcmFjdGVyIGZvciBrZXlcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBtb2RpZmllcnNcbiAgICAgKiBAcGFyYW0ge3N0cmluZz19IGFjdGlvbiBwYXNzZWQgaW5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfcGlja0Jlc3RBY3Rpb24oa2V5LCBtb2RpZmllcnMsIGFjdGlvbikge1xuXG4gICAgICAgIC8vIGlmIG5vIGFjdGlvbiB3YXMgcGlja2VkIGluIHdlIHNob3VsZCB0cnkgdG8gcGljayB0aGUgb25lXG4gICAgICAgIC8vIHRoYXQgd2UgdGhpbmsgd291bGQgd29yayBiZXN0IGZvciB0aGlzIGtleVxuICAgICAgICBpZiAoIWFjdGlvbikge1xuICAgICAgICAgICAgYWN0aW9uID0gX2dldFJldmVyc2VNYXAoKVtrZXldID8gJ2tleWRvd24nIDogJ2tleXByZXNzJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1vZGlmaWVyIGtleXMgZG9uJ3Qgd29yayBhcyBleHBlY3RlZCB3aXRoIGtleXByZXNzLFxuICAgICAgICAvLyBzd2l0Y2ggdG8ga2V5ZG93blxuICAgICAgICBpZiAoYWN0aW9uID09ICdrZXlwcmVzcycgJiYgbW9kaWZpZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgYWN0aW9uID0gJ2tleWRvd24nO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBmcm9tIGEgc3RyaW5nIGtleSBjb21iaW5hdGlvbiB0byBhbiBhcnJheVxuICAgICAqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBjb21iaW5hdGlvbiBsaWtlIFwiY29tbWFuZCtzaGlmdCtsXCJcbiAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfa2V5c0Zyb21TdHJpbmcoY29tYmluYXRpb24pIHtcbiAgICAgICAgaWYgKGNvbWJpbmF0aW9uID09PSAnKycpIHtcbiAgICAgICAgICAgIHJldHVybiBbJysnXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbWJpbmF0aW9uID0gY29tYmluYXRpb24ucmVwbGFjZSgvXFwrezJ9L2csICcrcGx1cycpO1xuICAgICAgICByZXR1cm4gY29tYmluYXRpb24uc3BsaXQoJysnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGluZm8gZm9yIGEgc3BlY2lmaWMga2V5IGNvbWJpbmF0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGNvbWJpbmF0aW9uIGtleSBjb21iaW5hdGlvbiAoXCJjb21tYW5kK3NcIiBvciBcImFcIiBvciBcIipcIilcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmc9fSBhY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9nZXRLZXlJbmZvKGNvbWJpbmF0aW9uLCBhY3Rpb24pIHtcbiAgICAgICAgdmFyIGtleXM7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIHZhciBpO1xuICAgICAgICB2YXIgbW9kaWZpZXJzID0gW107XG5cbiAgICAgICAgLy8gdGFrZSB0aGUga2V5cyBmcm9tIHRoaXMgcGF0dGVybiBhbmQgZmlndXJlIG91dCB3aGF0IHRoZSBhY3R1YWxcbiAgICAgICAgLy8gcGF0dGVybiBpcyBhbGwgYWJvdXRcbiAgICAgICAga2V5cyA9IF9rZXlzRnJvbVN0cmluZyhjb21iaW5hdGlvbik7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGtleSA9IGtleXNbaV07XG5cbiAgICAgICAgICAgIC8vIG5vcm1hbGl6ZSBrZXkgbmFtZXNcbiAgICAgICAgICAgIGlmIChfU1BFQ0lBTF9BTElBU0VTW2tleV0pIHtcbiAgICAgICAgICAgICAgICBrZXkgPSBfU1BFQ0lBTF9BTElBU0VTW2tleV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIHRoaXMgaXMgbm90IGEga2V5cHJlc3MgZXZlbnQgdGhlbiB3ZSBzaG91bGRcbiAgICAgICAgICAgIC8vIGJlIHNtYXJ0IGFib3V0IHVzaW5nIHNoaWZ0IGtleXNcbiAgICAgICAgICAgIC8vIHRoaXMgd2lsbCBvbmx5IHdvcmsgZm9yIFVTIGtleWJvYXJkcyBob3dldmVyXG4gICAgICAgICAgICBpZiAoYWN0aW9uICYmIGFjdGlvbiAhPSAna2V5cHJlc3MnICYmIF9TSElGVF9NQVBba2V5XSkge1xuICAgICAgICAgICAgICAgIGtleSA9IF9TSElGVF9NQVBba2V5XTtcbiAgICAgICAgICAgICAgICBtb2RpZmllcnMucHVzaCgnc2hpZnQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgdGhpcyBrZXkgaXMgYSBtb2RpZmllciB0aGVuIGFkZCBpdCB0byB0aGUgbGlzdCBvZiBtb2RpZmllcnNcbiAgICAgICAgICAgIGlmIChfaXNNb2RpZmllcihrZXkpKSB7XG4gICAgICAgICAgICAgICAgbW9kaWZpZXJzLnB1c2goa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRlcGVuZGluZyBvbiB3aGF0IHRoZSBrZXkgY29tYmluYXRpb24gaXNcbiAgICAgICAgLy8gd2Ugd2lsbCB0cnkgdG8gcGljayB0aGUgYmVzdCBldmVudCBmb3IgaXRcbiAgICAgICAgYWN0aW9uID0gX3BpY2tCZXN0QWN0aW9uKGtleSwgbW9kaWZpZXJzLCBhY3Rpb24pO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgIG1vZGlmaWVyczogbW9kaWZpZXJzLFxuICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb25cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfYmVsb25nc1RvKGVsZW1lbnQsIGFuY2VzdG9yKSB7XG4gICAgICAgIGlmIChlbGVtZW50ID09PSBudWxsIHx8IGVsZW1lbnQgPT09IGRvY3VtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZWxlbWVudCA9PT0gYW5jZXN0b3IpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIF9iZWxvbmdzVG8oZWxlbWVudC5wYXJlbnROb2RlLCBhbmNlc3Rvcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gTW91c2V0cmFwKHRhcmdldEVsZW1lbnQpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRhcmdldEVsZW1lbnQgPSB0YXJnZXRFbGVtZW50IHx8IGRvY3VtZW50O1xuXG4gICAgICAgIGlmICghKHNlbGYgaW5zdGFuY2VvZiBNb3VzZXRyYXApKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE1vdXNldHJhcCh0YXJnZXRFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBlbGVtZW50IHRvIGF0dGFjaCBrZXkgZXZlbnRzIHRvXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtFbGVtZW50fVxuICAgICAgICAgKi9cbiAgICAgICAgc2VsZi50YXJnZXQgPSB0YXJnZXRFbGVtZW50O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBhIGxpc3Qgb2YgYWxsIHRoZSBjYWxsYmFja3Mgc2V0dXAgdmlhIE1vdXNldHJhcC5iaW5kKClcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIHNlbGYuX2NhbGxiYWNrcyA9IHt9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkaXJlY3QgbWFwIG9mIHN0cmluZyBjb21iaW5hdGlvbnMgdG8gY2FsbGJhY2tzIHVzZWQgZm9yIHRyaWdnZXIoKVxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgc2VsZi5fZGlyZWN0TWFwID0ge307XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGtlZXBzIHRyYWNrIG9mIHdoYXQgbGV2ZWwgZWFjaCBzZXF1ZW5jZSBpcyBhdCBzaW5jZSBtdWx0aXBsZVxuICAgICAgICAgKiBzZXF1ZW5jZXMgY2FuIHN0YXJ0IG91dCB3aXRoIHRoZSBzYW1lIHNlcXVlbmNlXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgX3NlcXVlbmNlTGV2ZWxzID0ge307XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHZhcmlhYmxlIHRvIHN0b3JlIHRoZSBzZXRUaW1lb3V0IGNhbGxcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge251bGx8bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIF9yZXNldFRpbWVyO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiB0ZW1wb3Jhcnkgc3RhdGUgd2hlcmUgd2Ugd2lsbCBpZ25vcmUgdGhlIG5leHQga2V5dXBcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW58c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIF9pZ25vcmVOZXh0S2V5dXAgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogdGVtcG9yYXJ5IHN0YXRlIHdoZXJlIHdlIHdpbGwgaWdub3JlIHRoZSBuZXh0IGtleXByZXNzXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIF9pZ25vcmVOZXh0S2V5cHJlc3MgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogYXJlIHdlIGN1cnJlbnRseSBpbnNpZGUgb2YgYSBzZXF1ZW5jZT9cbiAgICAgICAgICogdHlwZSBvZiBhY3Rpb24gKFwia2V5dXBcIiBvciBcImtleWRvd25cIiBvciBcImtleXByZXNzXCIpIG9yIGZhbHNlXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufHN0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHZhciBfbmV4dEV4cGVjdGVkQWN0aW9uID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHJlc2V0cyBhbGwgc2VxdWVuY2UgY291bnRlcnMgZXhjZXB0IGZvciB0aGUgb25lcyBwYXNzZWQgaW5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGRvTm90UmVzZXRcbiAgICAgICAgICogQHJldHVybnMgdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX3Jlc2V0U2VxdWVuY2VzKGRvTm90UmVzZXQpIHtcbiAgICAgICAgICAgIGRvTm90UmVzZXQgPSBkb05vdFJlc2V0IHx8IHt9O1xuXG4gICAgICAgICAgICB2YXIgYWN0aXZlU2VxdWVuY2VzID0gZmFsc2UsXG4gICAgICAgICAgICAgICAga2V5O1xuXG4gICAgICAgICAgICBmb3IgKGtleSBpbiBfc2VxdWVuY2VMZXZlbHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZG9Ob3RSZXNldFtrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZVNlcXVlbmNlcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfc2VxdWVuY2VMZXZlbHNba2V5XSA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghYWN0aXZlU2VxdWVuY2VzKSB7XG4gICAgICAgICAgICAgICAgX25leHRFeHBlY3RlZEFjdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGZpbmRzIGFsbCBjYWxsYmFja3MgdGhhdCBtYXRjaCBiYXNlZCBvbiB0aGUga2V5Y29kZSwgbW9kaWZpZXJzLFxuICAgICAgICAgKiBhbmQgYWN0aW9uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjaGFyYWN0ZXJcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gbW9kaWZpZXJzXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnR8T2JqZWN0fSBlXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gc2VxdWVuY2VOYW1lIC0gbmFtZSBvZiB0aGUgc2VxdWVuY2Ugd2UgYXJlIGxvb2tpbmcgZm9yXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gY29tYmluYXRpb25cbiAgICAgICAgICogQHBhcmFtIHtudW1iZXI9fSBsZXZlbFxuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBfZ2V0TWF0Y2hlcyhjaGFyYWN0ZXIsIG1vZGlmaWVycywgZSwgc2VxdWVuY2VOYW1lLCBjb21iaW5hdGlvbiwgbGV2ZWwpIHtcbiAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrO1xuICAgICAgICAgICAgdmFyIG1hdGNoZXMgPSBbXTtcbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSBlLnR5cGU7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZXJlIGFyZSBubyBldmVudHMgcmVsYXRlZCB0byB0aGlzIGtleWNvZGVcbiAgICAgICAgICAgIGlmICghc2VsZi5fY2FsbGJhY2tzW2NoYXJhY3Rlcl0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIGEgbW9kaWZpZXIga2V5IGlzIGNvbWluZyB1cCBvbiBpdHMgb3duIHdlIHNob3VsZCBhbGxvdyBpdFxuICAgICAgICAgICAgaWYgKGFjdGlvbiA9PSAna2V5dXAnICYmIF9pc01vZGlmaWVyKGNoYXJhY3RlcikpIHtcbiAgICAgICAgICAgICAgICBtb2RpZmllcnMgPSBbY2hhcmFjdGVyXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbG9vcCB0aHJvdWdoIGFsbCBjYWxsYmFja3MgZm9yIHRoZSBrZXkgdGhhdCB3YXMgcHJlc3NlZFxuICAgICAgICAgICAgLy8gYW5kIHNlZSBpZiBhbnkgb2YgdGhlbSBtYXRjaFxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHNlbGYuX2NhbGxiYWNrc1tjaGFyYWN0ZXJdLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBzZWxmLl9jYWxsYmFja3NbY2hhcmFjdGVyXVtpXTtcblxuICAgICAgICAgICAgICAgIC8vIGlmIGEgc2VxdWVuY2UgbmFtZSBpcyBub3Qgc3BlY2lmaWVkLCBidXQgdGhpcyBpcyBhIHNlcXVlbmNlIGF0XG4gICAgICAgICAgICAgICAgLy8gdGhlIHdyb25nIGxldmVsIHRoZW4gbW92ZSBvbnRvIHRoZSBuZXh0IG1hdGNoXG4gICAgICAgICAgICAgICAgaWYgKCFzZXF1ZW5jZU5hbWUgJiYgY2FsbGJhY2suc2VxICYmIF9zZXF1ZW5jZUxldmVsc1tjYWxsYmFjay5zZXFdICE9IGNhbGxiYWNrLmxldmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBhY3Rpb24gd2UgYXJlIGxvb2tpbmcgZm9yIGRvZXNuJ3QgbWF0Y2ggdGhlIGFjdGlvbiB3ZSBnb3RcbiAgICAgICAgICAgICAgICAvLyB0aGVuIHdlIHNob3VsZCBrZWVwIGdvaW5nXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiAhPSBjYWxsYmFjay5hY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhpcyBpcyBhIGtleXByZXNzIGV2ZW50IGFuZCB0aGUgbWV0YSBrZXkgYW5kIGNvbnRyb2wga2V5XG4gICAgICAgICAgICAgICAgLy8gYXJlIG5vdCBwcmVzc2VkIHRoYXQgbWVhbnMgdGhhdCB3ZSBuZWVkIHRvIG9ubHkgbG9vayBhdCB0aGVcbiAgICAgICAgICAgICAgICAvLyBjaGFyYWN0ZXIsIG90aGVyd2lzZSBjaGVjayB0aGUgbW9kaWZpZXJzIGFzIHdlbGxcbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIC8vIGNocm9tZSB3aWxsIG5vdCBmaXJlIGEga2V5cHJlc3MgaWYgbWV0YSBvciBjb250cm9sIGlzIGRvd25cbiAgICAgICAgICAgICAgICAvLyBzYWZhcmkgd2lsbCBmaXJlIGEga2V5cHJlc3MgaWYgbWV0YSBvciBtZXRhK3NoaWZ0IGlzIGRvd25cbiAgICAgICAgICAgICAgICAvLyBmaXJlZm94IHdpbGwgZmlyZSBhIGtleXByZXNzIGlmIG1ldGEgb3IgY29udHJvbCBpcyBkb3duXG4gICAgICAgICAgICAgICAgaWYgKChhY3Rpb24gPT0gJ2tleXByZXNzJyAmJiAhZS5tZXRhS2V5ICYmICFlLmN0cmxLZXkpIHx8IF9tb2RpZmllcnNNYXRjaChtb2RpZmllcnMsIGNhbGxiYWNrLm1vZGlmaWVycykpIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIHlvdSBiaW5kIGEgY29tYmluYXRpb24gb3Igc2VxdWVuY2UgYSBzZWNvbmQgdGltZSBpdFxuICAgICAgICAgICAgICAgICAgICAvLyBzaG91bGQgb3ZlcndyaXRlIHRoZSBmaXJzdCBvbmUuICBpZiBhIHNlcXVlbmNlTmFtZSBvclxuICAgICAgICAgICAgICAgICAgICAvLyBjb21iaW5hdGlvbiBpcyBzcGVjaWZpZWQgaW4gdGhpcyBjYWxsIGl0IGRvZXMganVzdCB0aGF0XG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIC8vIEB0b2RvIG1ha2UgZGVsZXRpbmcgaXRzIG93biBtZXRob2Q/XG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWxldGVDb21ibyA9ICFzZXF1ZW5jZU5hbWUgJiYgY2FsbGJhY2suY29tYm8gPT0gY29tYmluYXRpb247XG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWxldGVTZXF1ZW5jZSA9IHNlcXVlbmNlTmFtZSAmJiBjYWxsYmFjay5zZXEgPT0gc2VxdWVuY2VOYW1lICYmIGNhbGxiYWNrLmxldmVsID09IGxldmVsO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVsZXRlQ29tYm8gfHwgZGVsZXRlU2VxdWVuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX2NhbGxiYWNrc1tjaGFyYWN0ZXJdLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoZXMucHVzaChjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbWF0Y2hlcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBhY3R1YWxseSBjYWxscyB0aGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgICpcbiAgICAgICAgICogaWYgeW91ciBjYWxsYmFjayBmdW5jdGlvbiByZXR1cm5zIGZhbHNlIHRoaXMgd2lsbCB1c2UgdGhlIGpxdWVyeVxuICAgICAgICAgKiBjb252ZW50aW9uIC0gcHJldmVudCBkZWZhdWx0IGFuZCBzdG9wIHByb3BvZ2F0aW9uIG9uIHRoZSBldmVudFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAgICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIF9maXJlQ2FsbGJhY2soY2FsbGJhY2ssIGUsIGNvbWJvLCBzZXF1ZW5jZSkge1xuXG4gICAgICAgICAgICAvLyBpZiB0aGlzIGV2ZW50IHNob3VsZCBub3QgaGFwcGVuIHN0b3AgaGVyZVxuICAgICAgICAgICAgaWYgKHNlbGYuc3RvcENhbGxiYWNrKGUsIGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudCwgY29tYm8sIHNlcXVlbmNlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKGUsIGNvbWJvKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBfcHJldmVudERlZmF1bHQoZSk7XG4gICAgICAgICAgICAgICAgX3N0b3BQcm9wYWdhdGlvbihlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBoYW5kbGVzIGEgY2hhcmFjdGVyIGtleSBldmVudFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2hhcmFjdGVyXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IG1vZGlmaWVyc1xuICAgICAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAgICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgICAgICovXG4gICAgICAgIHNlbGYuX2hhbmRsZUtleSA9IGZ1bmN0aW9uKGNoYXJhY3RlciwgbW9kaWZpZXJzLCBlKSB7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2tzID0gX2dldE1hdGNoZXMoY2hhcmFjdGVyLCBtb2RpZmllcnMsIGUpO1xuICAgICAgICAgICAgdmFyIGk7XG4gICAgICAgICAgICB2YXIgZG9Ob3RSZXNldCA9IHt9O1xuICAgICAgICAgICAgdmFyIG1heExldmVsID0gMDtcbiAgICAgICAgICAgIHZhciBwcm9jZXNzZWRTZXF1ZW5jZUNhbGxiYWNrID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgbWF4TGV2ZWwgZm9yIHNlcXVlbmNlcyBzbyB3ZSBjYW4gb25seSBleGVjdXRlIHRoZSBsb25nZXN0IGNhbGxiYWNrIHNlcXVlbmNlXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrc1tpXS5zZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgbWF4TGV2ZWwgPSBNYXRoLm1heChtYXhMZXZlbCwgY2FsbGJhY2tzW2ldLmxldmVsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGxvb3AgdGhyb3VnaCBtYXRjaGluZyBjYWxsYmFja3MgZm9yIHRoaXMga2V5IGV2ZW50XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBmaXJlIGZvciBhbGwgc2VxdWVuY2UgY2FsbGJhY2tzXG4gICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBiZWNhdXNlIGlmIGZvciBleGFtcGxlIHlvdSBoYXZlIG11bHRpcGxlIHNlcXVlbmNlc1xuICAgICAgICAgICAgICAgIC8vIGJvdW5kIHN1Y2ggYXMgXCJnIGlcIiBhbmQgXCJnIHRcIiB0aGV5IGJvdGggbmVlZCB0byBmaXJlIHRoZVxuICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrIGZvciBtYXRjaGluZyBnIGNhdXNlIG90aGVyd2lzZSB5b3UgY2FuIG9ubHkgZXZlclxuICAgICAgICAgICAgICAgIC8vIG1hdGNoIHRoZSBmaXJzdCBvbmVcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2tzW2ldLnNlcSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIG9ubHkgZmlyZSBjYWxsYmFja3MgZm9yIHRoZSBtYXhMZXZlbCB0byBwcmV2ZW50XG4gICAgICAgICAgICAgICAgICAgIC8vIHN1YnNlcXVlbmNlcyBmcm9tIGFsc28gZmlyaW5nXG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIC8vIGZvciBleGFtcGxlICdhIG9wdGlvbiBiJyBzaG91bGQgbm90IGNhdXNlICdvcHRpb24gYicgdG8gZmlyZVxuICAgICAgICAgICAgICAgICAgICAvLyBldmVuIHRob3VnaCAnb3B0aW9uIGInIGlzIHBhcnQgb2YgdGhlIG90aGVyIHNlcXVlbmNlXG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIC8vIGFueSBzZXF1ZW5jZXMgdGhhdCBkbyBub3QgbWF0Y2ggaGVyZSB3aWxsIGJlIGRpc2NhcmRlZFxuICAgICAgICAgICAgICAgICAgICAvLyBiZWxvdyBieSB0aGUgX3Jlc2V0U2VxdWVuY2VzIGNhbGxcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrc1tpXS5sZXZlbCAhPSBtYXhMZXZlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzZWRTZXF1ZW5jZUNhbGxiYWNrID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBrZWVwIGEgbGlzdCBvZiB3aGljaCBzZXF1ZW5jZXMgd2VyZSBtYXRjaGVzIGZvciBsYXRlclxuICAgICAgICAgICAgICAgICAgICBkb05vdFJlc2V0W2NhbGxiYWNrc1tpXS5zZXFdID0gMTtcbiAgICAgICAgICAgICAgICAgICAgX2ZpcmVDYWxsYmFjayhjYWxsYmFja3NbaV0uY2FsbGJhY2ssIGUsIGNhbGxiYWNrc1tpXS5jb21ibywgY2FsbGJhY2tzW2ldLnNlcSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlIHdlcmUgbm8gc2VxdWVuY2UgbWF0Y2hlcyBidXQgd2UgYXJlIHN0aWxsIGhlcmVcbiAgICAgICAgICAgICAgICAvLyB0aGF0IG1lYW5zIHRoaXMgaXMgYSByZWd1bGFyIG1hdGNoIHNvIHdlIHNob3VsZCBmaXJlIHRoYXRcbiAgICAgICAgICAgICAgICBpZiAoIXByb2Nlc3NlZFNlcXVlbmNlQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgX2ZpcmVDYWxsYmFjayhjYWxsYmFja3NbaV0uY2FsbGJhY2ssIGUsIGNhbGxiYWNrc1tpXS5jb21ibyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiB0aGUga2V5IHlvdSBwcmVzc2VkIG1hdGNoZXMgdGhlIHR5cGUgb2Ygc2VxdWVuY2Ugd2l0aG91dFxuICAgICAgICAgICAgLy8gYmVpbmcgYSBtb2RpZmllciAoaWUgXCJrZXl1cFwiIG9yIFwia2V5cHJlc3NcIikgdGhlbiB3ZSBzaG91bGRcbiAgICAgICAgICAgIC8vIHJlc2V0IGFsbCBzZXF1ZW5jZXMgdGhhdCB3ZXJlIG5vdCBtYXRjaGVkIGJ5IHRoaXMgZXZlbnRcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyB0aGlzIGlzIHNvLCBmb3IgZXhhbXBsZSwgaWYgeW91IGhhdmUgdGhlIHNlcXVlbmNlIFwiaCBhIHRcIiBhbmQgeW91XG4gICAgICAgICAgICAvLyB0eXBlIFwiaCBlIGEgciB0XCIgaXQgZG9lcyBub3QgbWF0Y2guICBpbiB0aGlzIGNhc2UgdGhlIFwiZVwiIHdpbGxcbiAgICAgICAgICAgIC8vIGNhdXNlIHRoZSBzZXF1ZW5jZSB0byByZXNldFxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIG1vZGlmaWVyIGtleXMgYXJlIGlnbm9yZWQgYmVjYXVzZSB5b3UgY2FuIGhhdmUgYSBzZXF1ZW5jZVxuICAgICAgICAgICAgLy8gdGhhdCBjb250YWlucyBtb2RpZmllcnMgc3VjaCBhcyBcImVudGVyIGN0cmwrc3BhY2VcIiBhbmQgaW4gbW9zdFxuICAgICAgICAgICAgLy8gY2FzZXMgdGhlIG1vZGlmaWVyIGtleSB3aWxsIGJlIHByZXNzZWQgYmVmb3JlIHRoZSBuZXh0IGtleVxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIGFsc28gaWYgeW91IGhhdmUgYSBzZXF1ZW5jZSBzdWNoIGFzIFwiY3RybCtiIGFcIiB0aGVuIHByZXNzaW5nIHRoZVxuICAgICAgICAgICAgLy8gXCJiXCIga2V5IHdpbGwgdHJpZ2dlciBhIFwia2V5cHJlc3NcIiBhbmQgYSBcImtleWRvd25cIlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIHRoZSBcImtleWRvd25cIiBpcyBleHBlY3RlZCB3aGVuIHRoZXJlIGlzIGEgbW9kaWZpZXIsIGJ1dCB0aGVcbiAgICAgICAgICAgIC8vIFwia2V5cHJlc3NcIiBlbmRzIHVwIG1hdGNoaW5nIHRoZSBfbmV4dEV4cGVjdGVkQWN0aW9uIHNpbmNlIGl0IG9jY3Vyc1xuICAgICAgICAgICAgLy8gYWZ0ZXIgYW5kIHRoYXQgY2F1c2VzIHRoZSBzZXF1ZW5jZSB0byByZXNldFxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIHdlIGlnbm9yZSBrZXlwcmVzc2VzIGluIGEgc2VxdWVuY2UgdGhhdCBkaXJlY3RseSBmb2xsb3cgYSBrZXlkb3duXG4gICAgICAgICAgICAvLyBmb3IgdGhlIHNhbWUgY2hhcmFjdGVyXG4gICAgICAgICAgICB2YXIgaWdub3JlVGhpc0tleXByZXNzID0gZS50eXBlID09ICdrZXlwcmVzcycgJiYgX2lnbm9yZU5leHRLZXlwcmVzcztcbiAgICAgICAgICAgIGlmIChlLnR5cGUgPT0gX25leHRFeHBlY3RlZEFjdGlvbiAmJiAhX2lzTW9kaWZpZXIoY2hhcmFjdGVyKSAmJiAhaWdub3JlVGhpc0tleXByZXNzKSB7XG4gICAgICAgICAgICAgICAgX3Jlc2V0U2VxdWVuY2VzKGRvTm90UmVzZXQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfaWdub3JlTmV4dEtleXByZXNzID0gcHJvY2Vzc2VkU2VxdWVuY2VDYWxsYmFjayAmJiBlLnR5cGUgPT0gJ2tleWRvd24nO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBoYW5kbGVzIGEga2V5ZG93biBldmVudFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAgICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIF9oYW5kbGVLZXlFdmVudChlKSB7XG5cbiAgICAgICAgICAgIC8vIG5vcm1hbGl6ZSBlLndoaWNoIGZvciBrZXkgZXZlbnRzXG4gICAgICAgICAgICAvLyBAc2VlIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDI4NTYyNy9qYXZhc2NyaXB0LWtleWNvZGUtdnMtY2hhcmNvZGUtdXR0ZXItY29uZnVzaW9uXG4gICAgICAgICAgICBpZiAodHlwZW9mIGUud2hpY2ggIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgZS53aGljaCA9IGUua2V5Q29kZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGNoYXJhY3RlciA9IF9jaGFyYWN0ZXJGcm9tRXZlbnQoZSk7XG5cbiAgICAgICAgICAgIC8vIG5vIGNoYXJhY3RlciBmb3VuZCB0aGVuIHN0b3BcbiAgICAgICAgICAgIGlmICghY2hhcmFjdGVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBuZWVkIHRvIHVzZSA9PT0gZm9yIHRoZSBjaGFyYWN0ZXIgY2hlY2sgYmVjYXVzZSB0aGUgY2hhcmFjdGVyIGNhbiBiZSAwXG4gICAgICAgICAgICBpZiAoZS50eXBlID09ICdrZXl1cCcgJiYgX2lnbm9yZU5leHRLZXl1cCA9PT0gY2hhcmFjdGVyKSB7XG4gICAgICAgICAgICAgICAgX2lnbm9yZU5leHRLZXl1cCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VsZi5oYW5kbGVLZXkoY2hhcmFjdGVyLCBfZXZlbnRNb2RpZmllcnMoZSksIGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNhbGxlZCB0byBzZXQgYSAxIHNlY29uZCB0aW1lb3V0IG9uIHRoZSBzcGVjaWZpZWQgc2VxdWVuY2VcbiAgICAgICAgICpcbiAgICAgICAgICogdGhpcyBpcyBzbyBhZnRlciBlYWNoIGtleSBwcmVzcyBpbiB0aGUgc2VxdWVuY2UgeW91IGhhdmUgMSBzZWNvbmRcbiAgICAgICAgICogdG8gcHJlc3MgdGhlIG5leHQga2V5IGJlZm9yZSB5b3UgaGF2ZSB0byBzdGFydCBvdmVyXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIF9yZXNldFNlcXVlbmNlVGltZXIoKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoX3Jlc2V0VGltZXIpO1xuICAgICAgICAgICAgX3Jlc2V0VGltZXIgPSBzZXRUaW1lb3V0KF9yZXNldFNlcXVlbmNlcywgMTAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogYmluZHMgYSBrZXkgc2VxdWVuY2UgdG8gYW4gZXZlbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbWJvIC0gY29tYm8gc3BlY2lmaWVkIGluIGJpbmQgY2FsbFxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBrZXlzXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gYWN0aW9uXG4gICAgICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIF9iaW5kU2VxdWVuY2UoY29tYm8sIGtleXMsIGNhbGxiYWNrLCBhY3Rpb24pIHtcblxuICAgICAgICAgICAgLy8gc3RhcnQgb2ZmIGJ5IGFkZGluZyBhIHNlcXVlbmNlIGxldmVsIHJlY29yZCBmb3IgdGhpcyBjb21iaW5hdGlvblxuICAgICAgICAgICAgLy8gYW5kIHNldHRpbmcgdGhlIGxldmVsIHRvIDBcbiAgICAgICAgICAgIF9zZXF1ZW5jZUxldmVsc1tjb21ib10gPSAwO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIGNhbGxiYWNrIHRvIGluY3JlYXNlIHRoZSBzZXF1ZW5jZSBsZXZlbCBmb3IgdGhpcyBzZXF1ZW5jZSBhbmQgcmVzZXRcbiAgICAgICAgICAgICAqIGFsbCBvdGhlciBzZXF1ZW5jZXMgdGhhdCB3ZXJlIGFjdGl2ZVxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXh0QWN0aW9uXG4gICAgICAgICAgICAgKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIF9pbmNyZWFzZVNlcXVlbmNlKG5leHRBY3Rpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIF9uZXh0RXhwZWN0ZWRBY3Rpb24gPSBuZXh0QWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICArK19zZXF1ZW5jZUxldmVsc1tjb21ib107XG4gICAgICAgICAgICAgICAgICAgIF9yZXNldFNlcXVlbmNlVGltZXIoKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIHdyYXBzIHRoZSBzcGVjaWZpZWQgY2FsbGJhY2sgaW5zaWRlIG9mIGFub3RoZXIgZnVuY3Rpb24gaW4gb3JkZXJcbiAgICAgICAgICAgICAqIHRvIHJlc2V0IGFsbCBzZXF1ZW5jZSBjb3VudGVycyBhcyBzb29uIGFzIHRoaXMgc2VxdWVuY2UgaXMgZG9uZVxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICAgICAgICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gX2NhbGxiYWNrQW5kUmVzZXQoZSkge1xuICAgICAgICAgICAgICAgIF9maXJlQ2FsbGJhY2soY2FsbGJhY2ssIGUsIGNvbWJvKTtcblxuICAgICAgICAgICAgICAgIC8vIHdlIHNob3VsZCBpZ25vcmUgdGhlIG5leHQga2V5IHVwIGlmIHRoZSBhY3Rpb24gaXMga2V5IGRvd25cbiAgICAgICAgICAgICAgICAvLyBvciBrZXlwcmVzcy4gIHRoaXMgaXMgc28gaWYgeW91IGZpbmlzaCBhIHNlcXVlbmNlIGFuZFxuICAgICAgICAgICAgICAgIC8vIHJlbGVhc2UgdGhlIGtleSB0aGUgZmluYWwga2V5IHdpbGwgbm90IHRyaWdnZXIgYSBrZXl1cFxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gIT09ICdrZXl1cCcpIHtcbiAgICAgICAgICAgICAgICAgICAgX2lnbm9yZU5leHRLZXl1cCA9IF9jaGFyYWN0ZXJGcm9tRXZlbnQoZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gd2VpcmQgcmFjZSBjb25kaXRpb24gaWYgYSBzZXF1ZW5jZSBlbmRzIHdpdGggdGhlIGtleVxuICAgICAgICAgICAgICAgIC8vIGFub3RoZXIgc2VxdWVuY2UgYmVnaW5zIHdpdGhcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KF9yZXNldFNlcXVlbmNlcywgMTApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBsb29wIHRocm91Z2gga2V5cyBvbmUgYXQgYSB0aW1lIGFuZCBiaW5kIHRoZSBhcHByb3ByaWF0ZSBjYWxsYmFja1xuICAgICAgICAgICAgLy8gZnVuY3Rpb24uICBmb3IgYW55IGtleSBsZWFkaW5nIHVwIHRvIHRoZSBmaW5hbCBvbmUgaXQgc2hvdWxkXG4gICAgICAgICAgICAvLyBpbmNyZWFzZSB0aGUgc2VxdWVuY2UuIGFmdGVyIHRoZSBmaW5hbCwgaXQgc2hvdWxkIHJlc2V0IGFsbCBzZXF1ZW5jZXNcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBpZiBhbiBhY3Rpb24gaXMgc3BlY2lmaWVkIGluIHRoZSBvcmlnaW5hbCBiaW5kIGNhbGwgdGhlbiB0aGF0IHdpbGxcbiAgICAgICAgICAgIC8vIGJlIHVzZWQgdGhyb3VnaG91dC4gIG90aGVyd2lzZSB3ZSB3aWxsIHBhc3MgdGhlIGFjdGlvbiB0aGF0IHRoZVxuICAgICAgICAgICAgLy8gbmV4dCBrZXkgaW4gdGhlIHNlcXVlbmNlIHNob3VsZCBtYXRjaC4gIHRoaXMgYWxsb3dzIGEgc2VxdWVuY2VcbiAgICAgICAgICAgIC8vIHRvIG1peCBhbmQgbWF0Y2gga2V5cHJlc3MgYW5kIGtleWRvd24gZXZlbnRzIGRlcGVuZGluZyBvbiB3aGljaFxuICAgICAgICAgICAgLy8gb25lcyBhcmUgYmV0dGVyIHN1aXRlZCB0byB0aGUga2V5IHByb3ZpZGVkXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICB2YXIgaXNGaW5hbCA9IGkgKyAxID09PSBrZXlzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB2YXIgd3JhcHBlZENhbGxiYWNrID0gaXNGaW5hbCA/IF9jYWxsYmFja0FuZFJlc2V0IDogX2luY3JlYXNlU2VxdWVuY2UoYWN0aW9uIHx8IF9nZXRLZXlJbmZvKGtleXNbaSArIDFdKS5hY3Rpb24pO1xuICAgICAgICAgICAgICAgIF9iaW5kU2luZ2xlKGtleXNbaV0sIHdyYXBwZWRDYWxsYmFjaywgYWN0aW9uLCBjb21ibywgaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogYmluZHMgYSBzaW5nbGUga2V5Ym9hcmQgY29tYmluYXRpb25cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbWJpbmF0aW9uXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gYWN0aW9uXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gc2VxdWVuY2VOYW1lIC0gbmFtZSBvZiBzZXF1ZW5jZSBpZiBwYXJ0IG9mIHNlcXVlbmNlXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gbGV2ZWwgLSB3aGF0IHBhcnQgb2YgdGhlIHNlcXVlbmNlIHRoZSBjb21tYW5kIGlzXG4gICAgICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIF9iaW5kU2luZ2xlKGNvbWJpbmF0aW9uLCBjYWxsYmFjaywgYWN0aW9uLCBzZXF1ZW5jZU5hbWUsIGxldmVsKSB7XG5cbiAgICAgICAgICAgIC8vIHN0b3JlIGEgZGlyZWN0IG1hcHBlZCByZWZlcmVuY2UgZm9yIHVzZSB3aXRoIE1vdXNldHJhcC50cmlnZ2VyXG4gICAgICAgICAgICBzZWxmLl9kaXJlY3RNYXBbY29tYmluYXRpb24gKyAnOicgKyBhY3Rpb25dID0gY2FsbGJhY2s7XG5cbiAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSBtdWx0aXBsZSBzcGFjZXMgaW4gYSByb3cgYmVjb21lIGEgc2luZ2xlIHNwYWNlXG4gICAgICAgICAgICBjb21iaW5hdGlvbiA9IGNvbWJpbmF0aW9uLnJlcGxhY2UoL1xccysvZywgJyAnKTtcblxuICAgICAgICAgICAgdmFyIHNlcXVlbmNlID0gY29tYmluYXRpb24uc3BsaXQoJyAnKTtcbiAgICAgICAgICAgIHZhciBpbmZvO1xuXG4gICAgICAgICAgICAvLyBpZiB0aGlzIHBhdHRlcm4gaXMgYSBzZXF1ZW5jZSBvZiBrZXlzIHRoZW4gcnVuIHRocm91Z2ggdGhpcyBtZXRob2RcbiAgICAgICAgICAgIC8vIHRvIHJlcHJvY2VzcyBlYWNoIHBhdHRlcm4gb25lIGtleSBhdCBhIHRpbWVcbiAgICAgICAgICAgIGlmIChzZXF1ZW5jZS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgX2JpbmRTZXF1ZW5jZShjb21iaW5hdGlvbiwgc2VxdWVuY2UsIGNhbGxiYWNrLCBhY3Rpb24pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaW5mbyA9IF9nZXRLZXlJbmZvKGNvbWJpbmF0aW9uLCBhY3Rpb24pO1xuXG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgdG8gaW5pdGlhbGl6ZSBhcnJheSBpZiB0aGlzIGlzIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgICAgICAvLyBhIGNhbGxiYWNrIGlzIGFkZGVkIGZvciB0aGlzIGtleVxuICAgICAgICAgICAgc2VsZi5fY2FsbGJhY2tzW2luZm8ua2V5XSA9IHNlbGYuX2NhbGxiYWNrc1tpbmZvLmtleV0gfHwgW107XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSBhbiBleGlzdGluZyBtYXRjaCBpZiB0aGVyZSBpcyBvbmVcbiAgICAgICAgICAgIF9nZXRNYXRjaGVzKGluZm8ua2V5LCBpbmZvLm1vZGlmaWVycywge3R5cGU6IGluZm8uYWN0aW9ufSwgc2VxdWVuY2VOYW1lLCBjb21iaW5hdGlvbiwgbGV2ZWwpO1xuXG4gICAgICAgICAgICAvLyBhZGQgdGhpcyBjYWxsIGJhY2sgdG8gdGhlIGFycmF5XG4gICAgICAgICAgICAvLyBpZiBpdCBpcyBhIHNlcXVlbmNlIHB1dCBpdCBhdCB0aGUgYmVnaW5uaW5nXG4gICAgICAgICAgICAvLyBpZiBub3QgcHV0IGl0IGF0IHRoZSBlbmRcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyB0aGlzIGlzIGltcG9ydGFudCBiZWNhdXNlIHRoZSB3YXkgdGhlc2UgYXJlIHByb2Nlc3NlZCBleHBlY3RzXG4gICAgICAgICAgICAvLyB0aGUgc2VxdWVuY2Ugb25lcyB0byBjb21lIGZpcnN0XG4gICAgICAgICAgICBzZWxmLl9jYWxsYmFja3NbaW5mby5rZXldW3NlcXVlbmNlTmFtZSA/ICd1bnNoaWZ0JyA6ICdwdXNoJ10oe1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcbiAgICAgICAgICAgICAgICBtb2RpZmllcnM6IGluZm8ubW9kaWZpZXJzLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogaW5mby5hY3Rpb24sXG4gICAgICAgICAgICAgICAgc2VxOiBzZXF1ZW5jZU5hbWUsXG4gICAgICAgICAgICAgICAgbGV2ZWw6IGxldmVsLFxuICAgICAgICAgICAgICAgIGNvbWJvOiBjb21iaW5hdGlvblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogYmluZHMgbXVsdGlwbGUgY29tYmluYXRpb25zIHRvIHRoZSBzYW1lIGNhbGxiYWNrXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGNvbWJpbmF0aW9uc1xuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ3x1bmRlZmluZWR9IGFjdGlvblxuICAgICAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICAgICAqL1xuICAgICAgICBzZWxmLl9iaW5kTXVsdGlwbGUgPSBmdW5jdGlvbihjb21iaW5hdGlvbnMsIGNhbGxiYWNrLCBhY3Rpb24pIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29tYmluYXRpb25zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgX2JpbmRTaW5nbGUoY29tYmluYXRpb25zW2ldLCBjYWxsYmFjaywgYWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvLyBzdGFydCFcbiAgICAgICAgX2FkZEV2ZW50KHRhcmdldEVsZW1lbnQsICdrZXlwcmVzcycsIF9oYW5kbGVLZXlFdmVudCk7XG4gICAgICAgIF9hZGRFdmVudCh0YXJnZXRFbGVtZW50LCAna2V5ZG93bicsIF9oYW5kbGVLZXlFdmVudCk7XG4gICAgICAgIF9hZGRFdmVudCh0YXJnZXRFbGVtZW50LCAna2V5dXAnLCBfaGFuZGxlS2V5RXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGJpbmRzIGFuIGV2ZW50IHRvIG1vdXNldHJhcFxuICAgICAqXG4gICAgICogY2FuIGJlIGEgc2luZ2xlIGtleSwgYSBjb21iaW5hdGlvbiBvZiBrZXlzIHNlcGFyYXRlZCB3aXRoICssXG4gICAgICogYW4gYXJyYXkgb2Yga2V5cywgb3IgYSBzZXF1ZW5jZSBvZiBrZXlzIHNlcGFyYXRlZCBieSBzcGFjZXNcbiAgICAgKlxuICAgICAqIGJlIHN1cmUgdG8gbGlzdCB0aGUgbW9kaWZpZXIga2V5cyBmaXJzdCB0byBtYWtlIHN1cmUgdGhhdCB0aGVcbiAgICAgKiBjb3JyZWN0IGtleSBlbmRzIHVwIGdldHRpbmcgYm91bmQgKHRoZSBsYXN0IGtleSBpbiB0aGUgcGF0dGVybilcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfEFycmF5fSBrZXlzXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0ge3N0cmluZz19IGFjdGlvbiAtICdrZXlwcmVzcycsICdrZXlkb3duJywgb3IgJ2tleXVwJ1xuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBNb3VzZXRyYXAucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbihrZXlzLCBjYWxsYmFjaywgYWN0aW9uKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAga2V5cyA9IGtleXMgaW5zdGFuY2VvZiBBcnJheSA/IGtleXMgOiBba2V5c107XG4gICAgICAgIHNlbGYuX2JpbmRNdWx0aXBsZS5jYWxsKHNlbGYsIGtleXMsIGNhbGxiYWNrLCBhY3Rpb24pO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogdW5iaW5kcyBhbiBldmVudCB0byBtb3VzZXRyYXBcbiAgICAgKlxuICAgICAqIHRoZSB1bmJpbmRpbmcgc2V0cyB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gb2YgdGhlIHNwZWNpZmllZCBrZXkgY29tYm9cbiAgICAgKiB0byBhbiBlbXB0eSBmdW5jdGlvbiBhbmQgZGVsZXRlcyB0aGUgY29ycmVzcG9uZGluZyBrZXkgaW4gdGhlXG4gICAgICogX2RpcmVjdE1hcCBkaWN0LlxuICAgICAqXG4gICAgICogVE9ETzogYWN0dWFsbHkgcmVtb3ZlIHRoaXMgZnJvbSB0aGUgX2NhbGxiYWNrcyBkaWN0aW9uYXJ5IGluc3RlYWRcbiAgICAgKiBvZiBiaW5kaW5nIGFuIGVtcHR5IGZ1bmN0aW9uXG4gICAgICpcbiAgICAgKiB0aGUga2V5Y29tYm8rYWN0aW9uIGhhcyB0byBiZSBleGFjdGx5IHRoZSBzYW1lIGFzXG4gICAgICogaXQgd2FzIGRlZmluZWQgaW4gdGhlIGJpbmQgbWV0aG9kXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xBcnJheX0ga2V5c1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb25cbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgTW91c2V0cmFwLnByb3RvdHlwZS51bmJpbmQgPSBmdW5jdGlvbihrZXlzLCBhY3Rpb24pIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICByZXR1cm4gc2VsZi5iaW5kLmNhbGwoc2VsZiwga2V5cywgZnVuY3Rpb24oKSB7fSwgYWN0aW9uKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogdHJpZ2dlcnMgYW4gZXZlbnQgdGhhdCBoYXMgYWxyZWFkeSBiZWVuIGJvdW5kXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5c1xuICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gYWN0aW9uXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIE1vdXNldHJhcC5wcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uKGtleXMsIGFjdGlvbikge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmIChzZWxmLl9kaXJlY3RNYXBba2V5cyArICc6JyArIGFjdGlvbl0pIHtcbiAgICAgICAgICAgIHNlbGYuX2RpcmVjdE1hcFtrZXlzICsgJzonICsgYWN0aW9uXSh7fSwga2V5cyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIHJlc2V0cyB0aGUgbGlicmFyeSBiYWNrIHRvIGl0cyBpbml0aWFsIHN0YXRlLiAgdGhpcyBpcyB1c2VmdWxcbiAgICAgKiBpZiB5b3Ugd2FudCB0byBjbGVhciBvdXQgdGhlIGN1cnJlbnQga2V5Ym9hcmQgc2hvcnRjdXRzIGFuZCBiaW5kXG4gICAgICogbmV3IG9uZXMgLSBmb3IgZXhhbXBsZSBpZiB5b3Ugc3dpdGNoIHRvIGFub3RoZXIgcGFnZVxuICAgICAqXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIE1vdXNldHJhcC5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLl9jYWxsYmFja3MgPSB7fTtcbiAgICAgICAgc2VsZi5fZGlyZWN0TWFwID0ge307XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBzaG91bGQgd2Ugc3RvcCB0aGlzIGV2ZW50IGJlZm9yZSBmaXJpbmcgb2ZmIGNhbGxiYWNrc1xuICAgICAqXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG4gICAgTW91c2V0cmFwLnByb3RvdHlwZS5zdG9wQ2FsbGJhY2sgPSBmdW5jdGlvbihlLCBlbGVtZW50KSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAvLyBpZiB0aGUgZWxlbWVudCBoYXMgdGhlIGNsYXNzIFwibW91c2V0cmFwXCIgdGhlbiBubyBuZWVkIHRvIHN0b3BcbiAgICAgICAgaWYgKCgnICcgKyBlbGVtZW50LmNsYXNzTmFtZSArICcgJykuaW5kZXhPZignIG1vdXNldHJhcCAnKSA+IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoX2JlbG9uZ3NUbyhlbGVtZW50LCBzZWxmLnRhcmdldCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN0b3AgZm9yIGlucHV0LCBzZWxlY3QsIGFuZCB0ZXh0YXJlYVxuICAgICAgICByZXR1cm4gZWxlbWVudC50YWdOYW1lID09ICdJTlBVVCcgfHwgZWxlbWVudC50YWdOYW1lID09ICdTRUxFQ1QnIHx8IGVsZW1lbnQudGFnTmFtZSA9PSAnVEVYVEFSRUEnIHx8IGVsZW1lbnQuaXNDb250ZW50RWRpdGFibGU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGV4cG9zZXMgX2hhbmRsZUtleSBwdWJsaWNseSBzbyBpdCBjYW4gYmUgb3ZlcndyaXR0ZW4gYnkgZXh0ZW5zaW9uc1xuICAgICAqL1xuICAgIE1vdXNldHJhcC5wcm90b3R5cGUuaGFuZGxlS2V5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHNlbGYuX2hhbmRsZUtleS5hcHBseShzZWxmLCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBhbGxvdyBjdXN0b20ga2V5IG1hcHBpbmdzXG4gICAgICovXG4gICAgTW91c2V0cmFwLmFkZEtleWNvZGVzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICAgIGlmIChvYmplY3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIF9NQVBba2V5XSA9IG9iamVjdFtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF9SRVZFUlNFX01BUCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEluaXQgdGhlIGdsb2JhbCBtb3VzZXRyYXAgZnVuY3Rpb25zXG4gICAgICpcbiAgICAgKiBUaGlzIG1ldGhvZCBpcyBuZWVkZWQgdG8gYWxsb3cgdGhlIGdsb2JhbCBtb3VzZXRyYXAgZnVuY3Rpb25zIHRvIHdvcmtcbiAgICAgKiBub3cgdGhhdCBtb3VzZXRyYXAgaXMgYSBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAgICAgKi9cbiAgICBNb3VzZXRyYXAuaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZG9jdW1lbnRNb3VzZXRyYXAgPSBNb3VzZXRyYXAoZG9jdW1lbnQpO1xuICAgICAgICBmb3IgKHZhciBtZXRob2QgaW4gZG9jdW1lbnRNb3VzZXRyYXApIHtcbiAgICAgICAgICAgIGlmIChtZXRob2QuY2hhckF0KDApICE9PSAnXycpIHtcbiAgICAgICAgICAgICAgICBNb3VzZXRyYXBbbWV0aG9kXSA9IChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50TW91c2V0cmFwW21ldGhvZF0uYXBwbHkoZG9jdW1lbnRNb3VzZXRyYXAsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSAobWV0aG9kKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgTW91c2V0cmFwLmluaXQoKTtcblxuICAgIC8vIGV4cG9zZSBtb3VzZXRyYXAgdG8gdGhlIGdsb2JhbCBvYmplY3RcbiAgICB3aW5kb3cuTW91c2V0cmFwID0gTW91c2V0cmFwO1xuXG4gICAgLy8gZXhwb3NlIGFzIGEgY29tbW9uIGpzIG1vZHVsZVxuICAgIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IE1vdXNldHJhcDtcbiAgICB9XG5cbiAgICAvLyBleHBvc2UgbW91c2V0cmFwIGFzIGFuIEFNRCBtb2R1bGVcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBNb3VzZXRyYXA7XG4gICAgICAgIH0pO1xuICAgIH1cbn0pICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IG51bGwsIHR5cGVvZiAgd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IGRvY3VtZW50IDogbnVsbCk7XG4iLCIoZnVuY3Rpb24gKHJvb3QsIGZhY3Rvcnkpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgLyppc3RhbmJ1bCBpZ25vcmUgbmV4dDpjYW50IHRlc3QqL1xuICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICBkZWZpbmUoW10sIGZhY3RvcnkpO1xuICB9IGVsc2Uge1xuICAgIC8vIEJyb3dzZXIgZ2xvYmFsc1xuICAgIHJvb3Qub2JqZWN0UGF0aCA9IGZhY3RvcnkoKTtcbiAgfVxufSkodGhpcywgZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG4gIGZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkge1xuICAgIGlmKG9iaiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgLy90byBoYW5kbGUgb2JqZWN0cyB3aXRoIG51bGwgcHJvdG90eXBlcyAodG9vIGVkZ2UgY2FzZT8pXG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApXG4gIH1cblxuICBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlKXtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgZm9yICh2YXIgaSBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKGhhc093blByb3BlcnR5KHZhbHVlLCBpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9TdHJpbmcodHlwZSl7XG4gICAgcmV0dXJuIHRvU3RyLmNhbGwodHlwZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc09iamVjdChvYmope1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiB0b1N0cmluZyhvYmopID09PSBcIltvYmplY3QgT2JqZWN0XVwiO1xuICB9XG5cbiAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uKG9iail7XG4gICAgLyppc3RhbmJ1bCBpZ25vcmUgbmV4dDpjYW50IHRlc3QqL1xuICAgIHJldHVybiB0b1N0ci5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gIH1cblxuICBmdW5jdGlvbiBpc0Jvb2xlYW4ob2JqKXtcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nIHx8IHRvU3RyaW5nKG9iaikgPT09ICdbb2JqZWN0IEJvb2xlYW5dJztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEtleShrZXkpe1xuICAgIHZhciBpbnRLZXkgPSBwYXJzZUludChrZXkpO1xuICAgIGlmIChpbnRLZXkudG9TdHJpbmcoKSA9PT0ga2V5KSB7XG4gICAgICByZXR1cm4gaW50S2V5O1xuICAgIH1cbiAgICByZXR1cm4ga2V5O1xuICB9XG5cbiAgZnVuY3Rpb24gZmFjdG9yeShvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cblxuICAgIHZhciBvYmplY3RQYXRoID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqZWN0UGF0aCkucmVkdWNlKGZ1bmN0aW9uKHByb3h5LCBwcm9wKSB7XG4gICAgICAgIGlmKHByb3AgPT09ICdjcmVhdGUnKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3h5O1xuICAgICAgICB9XG5cbiAgICAgICAgLyppc3RhbmJ1bCBpZ25vcmUgZWxzZSovXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0UGF0aFtwcm9wXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHByb3h5W3Byb3BdID0gb2JqZWN0UGF0aFtwcm9wXS5iaW5kKG9iamVjdFBhdGgsIG9iaik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHJveHk7XG4gICAgICB9LCB7fSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGhhc1NoYWxsb3dQcm9wZXJ0eShvYmosIHByb3ApIHtcbiAgICAgIHJldHVybiAob3B0aW9ucy5pbmNsdWRlSW5oZXJpdGVkUHJvcHMgfHwgKHR5cGVvZiBwcm9wID09PSAnbnVtYmVyJyAmJiBBcnJheS5pc0FycmF5KG9iaikpIHx8IGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2hhbGxvd1Byb3BlcnR5KG9iaiwgcHJvcCkge1xuICAgICAgaWYgKGhhc1NoYWxsb3dQcm9wZXJ0eShvYmosIHByb3ApKSB7XG4gICAgICAgIHJldHVybiBvYmpbcHJvcF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0KG9iaiwgcGF0aCwgdmFsdWUsIGRvTm90UmVwbGFjZSl7XG4gICAgICBpZiAodHlwZW9mIHBhdGggPT09ICdudW1iZXInKSB7XG4gICAgICAgIHBhdGggPSBbcGF0aF07XG4gICAgICB9XG4gICAgICBpZiAoIXBhdGggfHwgcGF0aC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHNldChvYmosIHBhdGguc3BsaXQoJy4nKS5tYXAoZ2V0S2V5KSwgdmFsdWUsIGRvTm90UmVwbGFjZSk7XG4gICAgICB9XG4gICAgICB2YXIgY3VycmVudFBhdGggPSBwYXRoWzBdO1xuICAgICAgdmFyIGN1cnJlbnRWYWx1ZSA9IGdldFNoYWxsb3dQcm9wZXJ0eShvYmosIGN1cnJlbnRQYXRoKTtcbiAgICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBpZiAoY3VycmVudFZhbHVlID09PSB2b2lkIDAgfHwgIWRvTm90UmVwbGFjZSkge1xuICAgICAgICAgIG9ialtjdXJyZW50UGF0aF0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VycmVudFZhbHVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoY3VycmVudFZhbHVlID09PSB2b2lkIDApIHtcbiAgICAgICAgLy9jaGVjayBpZiB3ZSBhc3N1bWUgYW4gYXJyYXlcbiAgICAgICAgaWYodHlwZW9mIHBhdGhbMV0gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgb2JqW2N1cnJlbnRQYXRoXSA9IFtdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9ialtjdXJyZW50UGF0aF0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2V0KG9ialtjdXJyZW50UGF0aF0sIHBhdGguc2xpY2UoMSksIHZhbHVlLCBkb05vdFJlcGxhY2UpO1xuICAgIH1cblxuICAgIG9iamVjdFBhdGguaGFzID0gZnVuY3Rpb24gKG9iaiwgcGF0aCkge1xuICAgICAgaWYgKHR5cGVvZiBwYXRoID09PSAnbnVtYmVyJykge1xuICAgICAgICBwYXRoID0gW3BhdGhdO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcGF0aCA9IHBhdGguc3BsaXQoJy4nKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFwYXRoIHx8IHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAhIW9iajtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBqID0gZ2V0S2V5KHBhdGhbaV0pO1xuXG4gICAgICAgIGlmKCh0eXBlb2YgaiA9PT0gJ251bWJlcicgJiYgaXNBcnJheShvYmopICYmIGogPCBvYmoubGVuZ3RoKSB8fFxuICAgICAgICAgIChvcHRpb25zLmluY2x1ZGVJbmhlcml0ZWRQcm9wcyA/IChqIGluIE9iamVjdChvYmopKSA6IGhhc093blByb3BlcnR5KG9iaiwgaikpKSB7XG4gICAgICAgICAgb2JqID0gb2JqW2pdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgb2JqZWN0UGF0aC5lbnN1cmVFeGlzdHMgPSBmdW5jdGlvbiAob2JqLCBwYXRoLCB2YWx1ZSl7XG4gICAgICByZXR1cm4gc2V0KG9iaiwgcGF0aCwgdmFsdWUsIHRydWUpO1xuICAgIH07XG5cbiAgICBvYmplY3RQYXRoLnNldCA9IGZ1bmN0aW9uIChvYmosIHBhdGgsIHZhbHVlLCBkb05vdFJlcGxhY2Upe1xuICAgICAgcmV0dXJuIHNldChvYmosIHBhdGgsIHZhbHVlLCBkb05vdFJlcGxhY2UpO1xuICAgIH07XG5cbiAgICBvYmplY3RQYXRoLmluc2VydCA9IGZ1bmN0aW9uIChvYmosIHBhdGgsIHZhbHVlLCBhdCl7XG4gICAgICB2YXIgYXJyID0gb2JqZWN0UGF0aC5nZXQob2JqLCBwYXRoKTtcbiAgICAgIGF0ID0gfn5hdDtcbiAgICAgIGlmICghaXNBcnJheShhcnIpKSB7XG4gICAgICAgIGFyciA9IFtdO1xuICAgICAgICBvYmplY3RQYXRoLnNldChvYmosIHBhdGgsIGFycik7XG4gICAgICB9XG4gICAgICBhcnIuc3BsaWNlKGF0LCAwLCB2YWx1ZSk7XG4gICAgfTtcblxuICAgIG9iamVjdFBhdGguZW1wdHkgPSBmdW5jdGlvbihvYmosIHBhdGgpIHtcbiAgICAgIGlmIChpc0VtcHR5KHBhdGgpKSB7XG4gICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICB9XG4gICAgICBpZiAob2JqID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICAgIH1cblxuICAgICAgdmFyIHZhbHVlLCBpO1xuICAgICAgaWYgKCEodmFsdWUgPSBvYmplY3RQYXRoLmdldChvYmosIHBhdGgpKSkge1xuICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gb2JqZWN0UGF0aC5zZXQob2JqLCBwYXRoLCAnJyk7XG4gICAgICB9IGVsc2UgaWYgKGlzQm9vbGVhbih2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdFBhdGguc2V0KG9iaiwgcGF0aCwgZmFsc2UpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHJldHVybiBvYmplY3RQYXRoLnNldChvYmosIHBhdGgsIDApO1xuICAgICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICB2YWx1ZS5sZW5ndGggPSAwO1xuICAgICAgfSBlbHNlIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgZm9yIChpIGluIHZhbHVlKSB7XG4gICAgICAgICAgaWYgKGhhc1NoYWxsb3dQcm9wZXJ0eSh2YWx1ZSwgaSkpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB2YWx1ZVtpXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBvYmplY3RQYXRoLnNldChvYmosIHBhdGgsIG51bGwpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBvYmplY3RQYXRoLnB1c2ggPSBmdW5jdGlvbiAob2JqLCBwYXRoIC8qLCB2YWx1ZXMgKi8pe1xuICAgICAgdmFyIGFyciA9IG9iamVjdFBhdGguZ2V0KG9iaiwgcGF0aCk7XG4gICAgICBpZiAoIWlzQXJyYXkoYXJyKSkge1xuICAgICAgICBhcnIgPSBbXTtcbiAgICAgICAgb2JqZWN0UGF0aC5zZXQob2JqLCBwYXRoLCBhcnIpO1xuICAgICAgfVxuXG4gICAgICBhcnIucHVzaC5hcHBseShhcnIsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMikpO1xuICAgIH07XG5cbiAgICBvYmplY3RQYXRoLmNvYWxlc2NlID0gZnVuY3Rpb24gKG9iaiwgcGF0aHMsIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgdmFyIHZhbHVlO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gcGF0aHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKCh2YWx1ZSA9IG9iamVjdFBhdGguZ2V0KG9iaiwgcGF0aHNbaV0pKSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgfTtcblxuICAgIG9iamVjdFBhdGguZ2V0ID0gZnVuY3Rpb24gKG9iaiwgcGF0aCwgZGVmYXVsdFZhbHVlKXtcbiAgICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcGF0aCA9IFtwYXRoXTtcbiAgICAgIH1cbiAgICAgIGlmICghcGF0aCB8fCBwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfVxuICAgICAgaWYgKG9iaiA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHBhdGggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBvYmplY3RQYXRoLmdldChvYmosIHBhdGguc3BsaXQoJy4nKSwgZGVmYXVsdFZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGN1cnJlbnRQYXRoID0gZ2V0S2V5KHBhdGhbMF0pO1xuICAgICAgdmFyIG5leHRPYmogPSBnZXRTaGFsbG93UHJvcGVydHkob2JqLCBjdXJyZW50UGF0aClcbiAgICAgIGlmIChuZXh0T2JqID09PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBuZXh0T2JqO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb2JqZWN0UGF0aC5nZXQob2JqW2N1cnJlbnRQYXRoXSwgcGF0aC5zbGljZSgxKSwgZGVmYXVsdFZhbHVlKTtcbiAgICB9O1xuXG4gICAgb2JqZWN0UGF0aC5kZWwgPSBmdW5jdGlvbiBkZWwob2JqLCBwYXRoKSB7XG4gICAgICBpZiAodHlwZW9mIHBhdGggPT09ICdudW1iZXInKSB7XG4gICAgICAgIHBhdGggPSBbcGF0aF07XG4gICAgICB9XG5cbiAgICAgIGlmIChvYmogPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNFbXB0eShwYXRoKSkge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfVxuICAgICAgaWYodHlwZW9mIHBhdGggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBvYmplY3RQYXRoLmRlbChvYmosIHBhdGguc3BsaXQoJy4nKSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBjdXJyZW50UGF0aCA9IGdldEtleShwYXRoWzBdKTtcbiAgICAgIGlmICghaGFzU2hhbGxvd1Byb3BlcnR5KG9iaiwgY3VycmVudFBhdGgpKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9XG5cbiAgICAgIGlmKHBhdGgubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgICAgICBvYmouc3BsaWNlKGN1cnJlbnRQYXRoLCAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgb2JqW2N1cnJlbnRQYXRoXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdFBhdGguZGVsKG9ialtjdXJyZW50UGF0aF0sIHBhdGguc2xpY2UoMSkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cblxuICAgIHJldHVybiBvYmplY3RQYXRoO1xuICB9XG5cbiAgdmFyIG1vZCA9IGZhY3RvcnkoKTtcbiAgbW9kLmNyZWF0ZSA9IGZhY3Rvcnk7XG4gIG1vZC53aXRoSW5oZXJpdGVkUHJvcHMgPSBmYWN0b3J5KHtpbmNsdWRlSW5oZXJpdGVkUHJvcHM6IHRydWV9KVxuICByZXR1cm4gbW9kO1xufSk7XG4iLCJpbXBvcnQgY3JlYXRlIGZyb20gXCIuL3V0aWxzL2NyZWF0ZVwiO1xuaW1wb3J0IGVsZW1lbnRzIGZyb20gXCIuL3V0aWxzL2VsZW1lbnRzXCI7XG5cbndpbmRvdy5lbGVtZW50cyA9IGVsZW1lbnRzO1xuXG5jcmVhdGUuYWxsKCk7IiwiaW1wb3J0IERPTVN0cmluZyBmcm9tIFwiLi8uLi90eXBlL0RPTVN0cmluZy5qc1wiO1xuXG4vKipcbiogQWRkcyBmdW5jdGlvbmFsaXR5IHRvIGBhcmlhLWNoZWNrZWRgIGF0dHJpYnV0ZS5cbipcbiogQ2hhbmdlcyB2YWx1ZSB3aGVuIGNsaWNrZWQgb3Igd2hpbGUgZm9jdXNlZCBwcmVzc2luZyBgU3BhY2VgLlxuKlxuKiB7QGxpbmsgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1jaGVja2VkfVxuKiBAZW1pdHMgY2xpY2sgd2hlbiBjbGlja2VkIG9yIHdoaWxlIGZvY3VzZWQgcHJlc3NpbmcgYFNwYWNlYC5cbiogQGVtaXRzIGNoYW5nZSB3aGVuIGNsaWNrZWQgb3Igd2hpbGUgZm9jdXNlZCBwcmVzc2luZyBgU3BhY2VgLlxuKi9cbmxldCBBcmlhQ2hlY2tlZCA9IChzdXBlcmNsYXNzKSA9PiBjbGFzcyBleHRlbmRzIHN1cGVyY2xhc3Mge1xuXG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRzdXBlciguLi5hcmdzKTtcblxuXHRcdHRoaXMuYWRkTGlzdGVuZXIoXCJrZXlcIiwgdGhpcy5vbkNoZWNrZWQuYmluZCh0aGlzKSwge2tleTogXCJzcGFjZVwifSk7XG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25DaGVja2VkLmJpbmQodGhpcykpO1xuXHR9XG5cblx0b25DaGVja2VkKGV2KSB7XG5cdFx0aWYoZXYpIGV2LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRpZih0aGlzLmRpc2FibGVkICE9PSB0cnVlKSB7XG5cdFx0XHR0aGlzLmNoZWNrZWQgPSBET01TdHJpbmcudG9nZ2xlKHRoaXMuY2hlY2tlZCk7XG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IElucHV0RXZlbnQoXCJpbnB1dFwiKSk7XG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiY2hhbmdlXCIpKTtcblx0XHR9XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFyaWFDaGVja2VkOyIsImltcG9ydCBib29sZWFuIGZyb20gXCIuLy4uL3R5cGUvYm9vbGVhblwiO1xyXG5cclxuLyoqXHJcbiogQWRkcyBmdW5jdGlvbmFsaXR5IHRvIGBhcmlhLWV4cGFuZGVkYCBhdHRyaWJ1dGVcclxuKiBAdG9kbyBhZGQgYSBzZXR0aW5nIHRvIGRlZmluZSBob3cgdGhlIHZpc2liaWxpdHkgc2hvdWxkIGJlIHRvZ2dsZWRcclxuKi9cclxubGV0IEFyaWFFeHBhbmRlZCA9IChzdXBlcmNsYXNzKSA9PiBjbGFzcyBleHRlbmRzIHN1cGVyY2xhc3Mge1xyXG5cdC8qKlxyXG5cdCogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgRWxlbWVudCB3aXRoIGFuIGBhcmlhLWV4cGFuZGVkYCBhdHRyaWJ1dGVcclxuXHQqL1xyXG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcclxuXHRcdHN1cGVyKC4uLmFyZ3MpO1xyXG5cdFx0aWYgKHRoaXMuZXhwYW5kZWQgIT09IHVuZGVmaW5lZCkgeyAvLyB0b2RvOiBhZGQgd2hlbiBmaXJzdCB0aW1lIGFyaWEtZXhwYW5kZWQgaXMgYm9vbGVhblxyXG5cdFx0XHR0aGlzLmFkZExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vbkV4cGFuZGVkLmJpbmQodGhpcykpO1xyXG5cdFx0XHQvLyB0aGlzLmFkZExpc3RlbmVyKFwia2V5XCIsIHRoaXMub25FeHBhbmRlZC5iaW5kKHRoaXMpLCB7IGtleTogW1wiZW50ZXJcIiwgXCJzcGFjZVwiXSB9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9uRXhwYW5kZWQoZXYpIHtcclxuXHRcdGlmICh0eXBlb2Ygc3VwZXIub25FeHBhbmRlZCA9PSBcImZ1bmN0aW9uXCIpIHN1cGVyLm9uRXhwYW5kZWQoZXYpO1xyXG5cdFx0aWYoZXYgJiYgdHlwZW9mIGV2LnByZXZlbnREZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIpIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0aWYodGhpcy5kaXNhYmxlZCAhPT0gdHJ1ZSkge1xyXG5cdFx0XHR0aGlzLmV4cGFuZGVkID0gYm9vbGVhbi50b2dnbGUodGhpcy5leHBhbmRlZCk7XHJcblxyXG5cdFx0XHRpZih0aGlzLmV4cGFuZGVkKSB7XHJcblx0XHRcdFx0dGhpcy5jb250cm9scy5mb3JFYWNoKGNvbnRyb2wgPT4ge1xyXG5cdFx0XHRcdFx0Y29udHJvbC5lbGVtZW50LmhpZGRlbiA9IGZhbHNlO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuY29udHJvbHMuZm9yRWFjaChjb250cm9sID0+IHtcclxuXHRcdFx0XHRcdGNvbnRyb2wuZWxlbWVudC5oaWRkZW4gPSB0cnVlO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXJpYUV4cGFuZGVkOyIsImltcG9ydCBET01TdHJpbmcgZnJvbSBcIi4vLi4vdHlwZS9ET01TdHJpbmdcIjtcclxuXHJcbi8qKlxyXG4qIEFkZHMgZnVuY3Rpb25hbGl0eSB0byBgYXJpYS1wcmVzc2VkYCBhdHRyaWJ1dGUuXHJcbipcclxuKiBDaGFuZ2VzIHZhbHVlIHdoZW4gY2xpY2tlZCBvciB3aGlsZSBmb2N1c2VkIHByZXNzaW5nIGBTcGFjZWAgb3IgYEVudGVyYC5cclxuKlxyXG4qIHtAbGluayBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXByZXNzZWR9XHJcbiogQGVtaXRzIGNsaWNrIHdoZW4gY2xpY2tlZCBvciB3aGlsZSBmb2N1c2VkIHByZXNzaW5nIGBTcGFjZWAgb3IgYEVudGVyYC5cclxuKi9cclxubGV0IEFyaWFQcmVzc2VkID0gKHN1cGVyY2xhc3MpID0+IGNsYXNzIGV4dGVuZHMgc3VwZXJjbGFzcyB7XHJcblx0LyoqXHJcblx0KiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxlbWVudCBFbGVtZW50IHdpdGggYW4gYGFyaWEtcHJlc3NlZGAgYXR0cmlidXRlXHJcblx0Ki9cclxuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XHJcblx0XHRzdXBlciguLi5hcmdzKTtcclxuXHJcblx0XHRpZih0aGlzLnByZXNzZWQgIT09IHVuZGVmaW5lZCkgeyAvLyB0b2RvOiBhZGQgd2hlbiBmaXJzdCB0aW1lIGFyaWEtcHJlc3NlZCBpcyBib29sZWFuXHJcblx0XHRcdHRoaXMuYWRkTGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uUHJlc3NlZC5iaW5kKHRoaXMpKTtcclxuXHRcdFx0dGhpcy5hZGRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm9uUHJlc3NlZC5iaW5kKHRoaXMpLCB7IGtleTogW1wiZW50ZXJcIiwgXCJzcGFjZVwiXX0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b25QcmVzc2VkKGV2KSB7XHJcblx0XHRpZiAodHlwZW9mIHN1cGVyLm9uUHJlc3NlZCA9PSBcImZ1bmN0aW9uXCIpIHN1cGVyLm9uUHJlc3NlZChldik7XHJcblxyXG5cdFx0aWYodGhpcy5kaXNhYmxlZCAhPT0gdHJ1ZSkge1xyXG5cdFx0XHR0aGlzLnByZXNzZWQgPSBET01TdHJpbmcudG9nZ2xlKHRoaXMucHJlc3NlZCk7XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXJpYVByZXNzZWQ7IiwiaW1wb3J0IGJvb2xlYW4gZnJvbSBcIi4vLi4vdHlwZS9ib29sZWFuXCI7XHJcblxyXG4vKipcclxuICogZ2V0cyBhbmQgc2V0cyB0aGUgYGFyaWEtc2VsZWN0ZWRgIGF0dHJpYnV0ZS5cclxuICpcclxuICogSW5kaWNhdGVzIGlmIGEgZWxlbWVudCBpcyBzZWxlY3RhYmxlXHJcbiAqXHJcbiAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1zZWxlY3RlZFxyXG4gKi9cclxubGV0IEFyaWFTZWxlY3RlZCA9IChzdXBlcmNsYXNzKSA9PiBjbGFzcyBleHRlbmRzIHN1cGVyY2xhc3Mge1xyXG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcclxuXHRcdHN1cGVyKC4uLmFyZ3MpO1xyXG5cclxuXHRcdHRoaXMuYWRkTGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uU2VsZWN0ZWQuYmluZCh0aGlzKSk7XHJcblx0XHR0aGlzLmFkZExpc3RlbmVyKFwia2V5XCIsIHRoaXMub25TZWxlY3RlZC5iaW5kKHRoaXMpLCB7a2V5OiBbXCJzcGFjZVwiLCBcImVudGVyXCJdfSk7XHJcblx0fVxyXG5cclxuXHRvblNlbGVjdGVkKGV2KSB7XHJcblx0XHRpZih0eXBlb2Ygc3VwZXIub25TZWxlY3RlZCA9PSBcImZ1bmN0aW9uXCIpIHN1cGVyLm9uU2VsZWN0ZWQoZXYpO1xyXG5cdFx0dGhpcy5zZWxlY3RlZCA9IGJvb2xlYW4udG9nZ2xlKHRoaXMuc2VsZWN0ZWQpO1xyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFyaWFTZWxlY3RlZDsiLCIvKipcclxuICogXHJcbiAqL1xyXG5jb25zdCByb2xlcyA9IHtcclxuXHRhbGVydDoge1xyXG5cdFx0c3VwZXI6IFtcInNlY3Rpb25cIl0sXHJcblx0XHRzdWI6IFtcImFsZXJ0ZGlhbG9nXCJdLFxyXG5cdFx0ZGVmYXVsdHM6IHtcclxuXHRcdFx0bGl2ZTogXCJhc3NlcnRpdmVcIixcclxuXHRcdFx0YXRvbWljOiB0cnVlXHJcblx0XHR9XHJcblx0fSxcclxuXHRhbGVydGRpYWxvZzogeyBzdXBlcjogW1wiYWxlcnRcIiwgXCJkaWFsb2dcIl0gfSxcclxuXHRhcHBsaWNhdGlvbjogeyBzdXBlcjogW1wic3RydWN0dXJlXCJdIH0sXHJcblx0YXJ0aWNsZToge1xyXG5cdFx0c3VwZXI6IFtcImRvY3VtZW50XCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcImFydGljbGU6bm90KFtyb2xlKVwiXVxyXG5cdH0sXHJcblx0LyoqIEB0b2RvIG1vcmUgc3RyaWN0IGJhbm5lciBzZWxlY3RvciAgKi9cclxuXHRiYW5uZXI6IHtcclxuXHRcdHN1cGVyOiBbXCJsYW5kbWFya1wiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJoZWFkZXI6bm90KFtyb2xlXSlcIl1cclxuXHR9LFxyXG5cdGJ1dHRvbjoge1xyXG5cdFx0c3VwZXI6IFtcImNvbW1hbmRcIl0sXHJcblx0XHRpbXBsaWNpdDogW1wiYnV0dG9uOm5vdChbcm9sZV0pXCIsIFwiaW5wdXRbdHlwZT0nYnV0dG9uJ106bm90KFtyb2xlXSlcIixcclxuXHRcdFx0XCJpbnB1dFt0eXBlPSdyZXNldCddOm5vdChbcm9sZV0pXCIsIFwiaW5wdXRbdHlwZT0naW1hZ2UnXTpub3QoW3JvbGVdKVwiLFxyXG5cdFx0XHRcImlucHV0W3R5cGU9J3N1Ym1pdCddOm5vdChbcm9sZV0pXCIsIFwic3VtbWFyeTpub3QoW3JvbGVdKVwiXVxyXG5cdH0sXHJcblx0Y2VsbDoge1xyXG5cdFx0c3VwZXI6IFtcInNlY3Rpb25cIl0sXHJcblx0XHRzdWI6IFtcImNvbHVtbmhlYWRlclwiLCBcInJvd2hlYWRlclwiLCBcImdyaWRjZWxsXCJdLFxyXG5cdFx0Y29udGV4dDogW1wicm93XCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcInRhYmxlIHRkOm5vdChbcm9sZV0pXCJdXHJcblx0fSxcclxuXHRjaGVja2JveDoge1xyXG5cdFx0c3VwZXI6IFtcImlucHV0XCJdLFxyXG5cdFx0c3ViOiBbXCJtZW51aXRlbWNoZWNrYm94XCIsIFwic3dpdGNoXCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcImlucHV0W3R5cGU9J2NoZWNrYm94J106bm90KFtyb2xlXSlcIl0sXHJcblx0XHRkZWZhdWx0czoge1xyXG5cdFx0XHRjaGVja2VkOiB0cnVlXHJcblx0XHR9XHJcblx0fSxcclxuXHRjb2x1bW5oZWFkZXI6IHtcclxuXHRcdHN1cGVyOiBbXCJjZWxsXCIsIFwiZ3JpZGNlbGxcIiwgXCJzZWN0aW9uaGVhZFwiXSxcclxuXHRcdGNvbnRleHQ6IFtcInJvd1wiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJ0aGVhZCB0aDpub3QoW3JvbGVdKVwiXVxyXG5cdH0sXHJcblx0LyoqIEB0b2RvIHNpemUgYXR0cmlidXRlIGRvZXNuJ3QgY2hlY2sgZmF1bHR5IHZhbHVlcyAqL1xyXG5cdGNvbWJvYm94OiB7XHJcblx0XHRzdXBlcjogW1wic2VsZWN0XCJdLFxyXG5cdFx0b3duczoge1xyXG5cdFx0XHRhbGw6IFtcInRleHRib3hcIl0sXHJcblx0XHRcdGFueTogW1wibGlzdGJveFwiLCBcInRyZWVcIiwgXCJncmlkXCIsIFwiZGlhbG9nXCJdXHJcblx0XHR9LFxyXG5cdFx0aW1wbGljaXQ6IFtcImlucHV0W3R5cGU9J2VtYWlsJ11bbGlzdF06bm90KFtyb2xlXSlcIixcclxuXHRcdFx0XCJpbnB1dFt0eXBlPSd0ZXh0J11bbGlzdF06bm90KFtyb2xlXSlcIiwgXCJpbnB1dFt0eXBlPSdzZWFyY2gnXVtsaXN0XTpub3QoW3JvbGVdKVwiLFxyXG5cdFx0XHRcImlucHV0W3R5cGU9J3RlbCddW2xpc3RdOm5vdChbcm9sZV0pXCIsIFwiaW5wdXRbdHlwZT0ndXJsJ11bbGlzdF06bm90KFtyb2xlXSlcIixcclxuXHRcdFx0XCJzZWxlY3Q6bm90KFttdWx0aXBsZV0pOm5vdChbc2l6ZV0pOm5vdChbcm9sZV0pXCIsIFwic2VsZWN0Om5vdChbbXVsdGlwbGVdKVtzaXplPScwJ106bm90KFtyb2xlXSlcIixcclxuXHRcdFx0XCJzZWxlY3Q6bm90KFttdWx0aXBsZV0pW3NpemU9JzEnXTpub3QoW3JvbGVdKVwiXSxcclxuXHRcdGRlZmF1bHRzOiB7XHJcblx0XHRcdGV4cGFuZGVkOiBmYWxzZSxcclxuXHRcdFx0aGFzUG9wVXA6IFwibGlzdGJveFwiXHJcblx0XHR9XHJcblx0fSxcclxuXHRjb21tYW5kOiB7XHJcblx0XHRzdXBlcjogW1wid2lkZ2V0XCJdLFxyXG5cdFx0c3ViOiBbXCJtZW51aXRlbVwiLCBcImJ1dHRvblwiLCBcImxpbmtcIl1cclxuXHR9LFxyXG5cdGNvbXBsZW1lbnRhcnk6IHtcclxuXHRcdHN1cGVyOiBbXCJsYW5kbWFya1wiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJhc2lkZTpub3QoW3JvbGVdKVwiXVxyXG5cdH0sXHJcblx0Y29tcG9zaXRlOiB7XHJcblx0XHRzdXBlcjogW1wid2lkZ2V0XCJdLFxyXG5cdFx0c3ViOiBbXCJncmlkXCIsIFwic2VsZWN0XCIsIFwic3BpbmJ1dHRvblwiLCBcInRhYmxpc3RcIl1cclxuXHR9LFxyXG5cdC8qKiBAdG9kbyBtb3JlIHN0cmljdCBmb290ZXIgc2VsZWN0b3IgICovXHJcblx0Y29udGVudGluZm86IHtcclxuXHRcdHN1cGVyOiBbXCJsYW5kbWFya1wiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJmb290ZXI6bm90KFtyb2xlXSlcIl1cclxuXHR9LFxyXG5cdGRlZmluaXRpb246IHtcclxuXHRcdHN1cGVyOiBbXCJzZWN0aW9uXCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcImRkOm5vdChbcm9sZV0pXCJdXHJcblx0fSxcclxuXHRkaWFsb2c6IHtcclxuXHRcdHN1cGVyOiBbXCJ3aW5kb3dcIl0sXHJcblx0XHRzdWI6IFtcImFsZXJ0ZGlhbG9nXCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcImRpYWxvZzpub3QoW3JvbGVdKVwiXVxyXG5cdH0sXHJcblx0ZGlyZWN0b3J5OiB7IHN1cGVyOiBbXCJsaXN0XCJdIH0sXHJcblx0ZG9jdW1lbnQ6IHtcclxuXHRcdHN1cGVyOiBbXCJzdHJ1Y3R1cmVcIl0sXHJcblx0XHRzdWI6IFtcImFydGljbGVcIl0sXHJcblx0XHRpbXBsaWNpdDogW1wiYXNpZGU6bm90KFtyb2xlXSlcIl1cclxuXHR9LFxyXG5cdGZlZWQ6IHtcclxuXHRcdHN1cGVyOiBbXCJsaXN0XCJdLFxyXG5cdFx0b3duczogeyBhbnk6IFtcImFydGljbGVcIl0gfVxyXG5cdH0sXHJcblx0ZmlndXJlOiB7XHJcblx0XHRzdXBlcjogW1wic2VjdGlvblwiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJmaWd1cmU6bm90KFtyb2xlXSlcIl1cclxuXHR9LFxyXG5cdGZvcm06IHtcclxuXHRcdHN1cGVyOiBbXCJsYW5kbWFya1wiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJmb3JtOm5vdChbcm9sZV0pXCJdXHJcblx0fSxcclxuXHRncmlkOiB7XHJcblx0XHRzdXBlcjogW1wiY29tcG9zaXRlXCIsIFwidGFibGVcIl0sXHJcblx0XHRzdWI6IFtcInRyZWVncmlkXCJdLFxyXG5cdFx0b3duczogeyBhbnk6IFtcInJvd2dyb3VwXCIsIFwicm93XCJdIH1cclxuXHR9LFxyXG5cdGdyaWRjZWxsOiB7XHJcblx0XHRzdXBlcjogW1wiY2VsbFwiLCBcIndpZGdldFwiXSxcclxuXHRcdHN1YjogW1wiY29sdW1uaGVhZGVyXCIsIFwicm93aGVhZGVyXCJdLFxyXG5cdFx0Y29udGV4dDogW1wicm93XCJdXHJcblx0fSxcclxuXHRncm91cDoge1xyXG5cdFx0c3VwZXI6IFtcInNlY3Rpb25cIl0sXHJcblx0XHRzdWI6IFtcInJvd1wiLCBcInNlbGVjdFwiLCBcInRvb2xiYXJcIl0sXHJcblx0XHRpbXBsaWNpdDogW1wiZGV0YWlsczpub3QoW3JvbGVdKVwiLCBcIm9wdGdyb3VwOm5vdChbcm9sZV0pXCJdXHJcblx0fSxcclxuXHRoZWFkaW5nOiB7XHJcblx0XHRzdXBlcjogW1wic2VjdGlvbmhlYWRcIl0sXHJcblx0XHRpbXBsaWNpdDogW1wiaDE6bm90KFtyb2xlXSlcIiwgXCJoMjpub3QoW3JvbGVdKVwiLCBcImgzOm5vdChbcm9sZV0pXCIsXHJcblx0XHRcdFwiaDQ6bm90KFtyb2xlXSlcIiwgXCJoNTpub3QoW3JvbGVdKVwiLCBcImg2Ojpub3QoW3JvbGVdKVwiXSxcclxuXHRcdGRlZmF1bHRzOiB7XHJcblx0XHRcdGxldmVsOiAyXHJcblx0XHR9XHJcblx0fSxcclxuXHRpbWc6IHtcclxuXHRcdHN1cGVyOiBbXCJzZWN0aW9uXCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcImltZ1thbHRdOm5vdChbYWx0PScnXSk6bm90KFtyb2xlXSlcIl1cclxuXHR9LFxyXG5cdGlucHV0OiB7XHJcblx0XHRzdXBlcjogW1wid2lkZ2V0XCJdLFxyXG5cdFx0c3ViOiBbXCJjaGVja2JveFwiLCBcIm9wdGlvblwiLCBcInJhZGlvXCIsIFwic2xpZGVyXCIsIFwic3BpbmJ1dHRvblwiLCBcInRleHRib3hcIl1cclxuXHR9LFxyXG5cdGxhbmRtYXJrOiB7XHJcblx0XHRzdXBlcjogW1wic2VjdGlvblwiXSxcclxuXHRcdHN1YjogW1wiYmFubmVyXCIsIFwiY29tcGxlbWVudGFyeVwiLCBcImNvbnRlbnRpbmZvXCIsIFwiZm9ybVwiLCBcIm1haW5cIiwgXCJuYXZpZ2F0aW9uXCIsIFwicmVnaW9uXCIsIFwic2VhcmNoXCJdXHJcblx0fSxcclxuXHRsaW5rOiB7XHJcblx0XHRzdXBlcjogW1wiY29tbWFuZFwiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJhW2hyZWZdOm5vdChbcm9sZV0pXCIsIFwiYXJlYVtocmVmXTpub3QoW3JvbGVdKVwiLCBcImxpbmtbaHJlZl06bm90KFtyb2xlXSlcIl1cclxuXHR9LFxyXG5cdGxpc3Q6IHtcclxuXHRcdHN1cGVyOiBbXCJzZWN0aW9uXCJdLFxyXG5cdFx0c3ViOiBbXCJkaXJlY3RvcnlcIiwgXCJmZWVkXCJdLFxyXG5cdFx0b3duczogeyBhbnk6IFtcImdyb3VwXCIsIFwibGlzdGl0ZW1cIl0gfSxcclxuXHRcdGltcGxpY2l0OiBbXCJkbDpub3QoW3JvbGVdKVwiLCBcIm9sOm5vdChbcm9sZV0pXCIsIFwidWw6bm90KFtyb2xlXSlcIl1cclxuXHR9LFxyXG5cdGxpc3Rib3g6IHtcclxuXHRcdHN1cGVyOiBbXCJzZWxlY3RcIl0sXHJcblx0XHRvd25zOiB7IGFueTogW1wib3B0aW9uXCJdIH0sXHJcblx0XHRpbXBsaWNpdDogW1wiZGF0YWxpc3Q6bm90KFtyb2xlXSlcIiwgXCJzZWxlY3RbbXVsdGlwbGVdOm5vdChbcm9sZV0pXCIsXHJcblx0XHRcdFwic2VsZWN0W3NpemVdOm5vdChbc2l6ZT0nMCddKTpub3QoW3NpemU9JzEnXSk6bm90KFtyb2xlXSlcIl1cclxuXHR9LFxyXG5cdGxpc3RpdGVtOiB7XHJcblx0XHRzdXBlcjogW1wic2VjdGlvblwiXSxcclxuXHRcdHN1YjogW1widHJlZWl0ZW1cIl0sXHJcblx0XHRjb250ZXh0OiBbXCJncm91cFwiLCBcImxpc3RcIl0sXHJcblx0XHRpbXBsaWNpdDogW1wiZHQ6bm90KFtyb2xlXSlcIiwgXCJvbCA+IGxpOjpub3QoW3JvbGVdKVwiXVxyXG5cdH0sXHJcblx0bG9nOiB7XHJcblx0XHRzdXBlcjogW1wic2VjdGlvblwiXSxcclxuXHRcdGRlZmF1bHRzOiB7XHJcblx0XHRcdGxpdmU6IFwicG9sbGl0ZVwiXHJcblx0XHR9XHJcblx0fSxcclxuXHRtYWluOiB7XHJcblx0XHRzdXBlcjogW1wibGFuZG1hcmtcIl0sXHJcblx0XHRpbXBsaWNpdDogW1wibWFpbjpub3QoW3JvbGVdKVwiXVxyXG5cdH0sXHJcblx0bWFycXVlZTogeyBzdXBlcjogW1wic2VjdGlvblwiXSB9LFxyXG5cdG1hdGg6IHtcclxuXHRcdHN1cGVyOiBbXCJzZWN0aW9uXCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcIm1hdGg6bm90KFtyb2xlXSlcIl1cclxuXHR9LFxyXG5cdG1lbnU6IHtcclxuXHRcdHN1cGVyOiBbXCJzZWxlY3RcIl0sXHJcblx0XHRzdWI6IFtcIm1lbnViYXJcIl0sXHJcblx0XHRvd25zOiB7IGFueTogW1wibWVudWl0ZW1cIiwgXCJtZW51aXRlbXJhZGlvXCIsIFwibWVudWl0ZW1jaGVja2JveFwiLCBcImdyb3VwXCJdfSxcclxuXHRcdGltcGxpY2l0OiBbXCJtZW51W3R5cGU9J2NvbnRleHQnXTpub3QoW3JvbGVdKVwiXSxcclxuXHRcdGRlZmF1bHRzOiB7IG9yaWVudGF0aW9uOiBcInZlcnRpY2FsXCIgfVxyXG5cdH0sXHJcblx0bWVudWJhcjoge1xyXG5cdFx0c3VwZXI6IFtcIm1lbnVcIl0sXHJcblx0XHRzdWI6IFtcInRvb2xiYXJcIl0sXHJcblx0XHRvd25zOiB7IGFueTogW1wibWVudWl0ZW1cIiwgXCJtZW51aXRlbXJhZGlvXCIsIFwibWVudWl0ZW1jaGVja2JveFwiLCBcImdyb3VwXCJdIH0sXHJcblx0XHRkZWZhdWx0czogeyBvcmllbnRhdGlvbjogXCJob3Jpem9udGFsXCIgfVxyXG5cdH0sXHJcblx0bWVudWl0ZW06IHtcclxuXHRcdHN1cGVyOiBbXCJjb21tYW5kXCJdLFxyXG5cdFx0c3ViOiBbXCJtZW51aXRlbWNoZWNrYm94XCJdLFxyXG5cdFx0Y29udGV4dDogW1wiZ3JvdXBcIiwgXCJtZW51XCIsIFwibWVudWJhclwiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJtZW51aXRlbVt0eXBlPSdjb250ZXh0J106bm90KFtyb2xlXSlcIl1cclxuXHR9LFxyXG5cdG1lbnVpdGVtY2hlY2tib3g6IHtcclxuXHRcdHN1cGVyOiBbXCJjaGVja2JveFwiLCBcIm1lbnVpdGVtXCJdLFxyXG5cdFx0c3ViOiBbXCJtZW51aXRlbXJhZGlvXCJdLFxyXG5cdFx0Y29udGV4dDogW1wibWVudVwiLCBcIm1lbnViYXJcIl0sXHJcblx0XHRpbXBsaWNpdDogW1wibWVudWl0ZW1bdHlwZT0nY2hlY2tib3gnXTpub3QoW3JvbGVdKVwiXSxcclxuXHRcdGRlZmF1bHRzOiB7IGNoZWNrZWQ6IGZhbHNlIH1cclxuXHR9LFxyXG5cdG1lbnVpdGVtcmFkaW86IHtcclxuXHRcdHN1cGVyOiBbXCJtZW51aXRlbWNoZWNrYm94XCIsIFwicmFkaW9cIl0sXHJcblx0XHRjb250ZXh0OiBbXCJncm91cFwiLCBcIm1lbnVcIiwgXCJtZW51YmFyXCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcIm1lbnVpdGVtW3R5cGU9J3JhZGlvJ106bm90KFtyb2xlXSlcIl0sXHJcblx0XHRkZWZhdWx0czogeyBjaGVja2VkOiBmYWxzZSB9XHJcblx0fSxcclxuXHRuYXZpZ2F0aW9uOiB7XHJcblx0XHRzdXBlcjogW1wibGFuZG1hcmtcIl0sXHJcblx0XHRpbXBsaWNpdDogW1wibmF2Om5vdChbcm9sZV0pXCJdXHJcblx0fSxcclxuXHQvKiogQHRvZG8gcmVjb25zaWRlciBpZiBub25lID09IHByZXNlbnRhdGlvbiAqL1xyXG5cdG5vbmU6IHsgc3VwZXI6IFtcInN0cnVjdHVyZVwiXSB9LFxyXG5cdG5vdGU6IHsgc3VwZXI6IFtcInNlY3Rpb25cIl0gfSxcclxuXHQvKiogQHRvZG8gbW9yZSBzdHJpY3QgZGF0YWxpc3Qgc2VsZWN0b3IgKi9cclxuXHRvcHRpb246IHtcclxuXHRcdHN1cGVyOiBbXCJpbnB1dFwiXSxcclxuXHRcdHN1YjogW1widHJlZWl0ZW1cIl0sXHJcblx0XHRjb250ZXh0OiBbXCJsaXN0Ym94XCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcImRhdGFsaXN0IG9wdGlvbjpub3QoW3JvbGVdKVwiXSxcclxuXHRcdGRlZmF1bHRzOiB7IGNoZWNrZWQ6IGZhbHNlIH1cclxuXHR9LFxyXG5cdHByZXNlbnRhdGlvbjoge1xyXG5cdFx0c3VwZXI6IFtcInN0cnVjdHVyZVwiXVxyXG5cdH0sXHJcblx0cHJvZ3Jlc3NiYXI6IHtcclxuXHRcdHN1cGVyOiBbXCJyYW5nZVwiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJwcm9ncmVzczpub3QoW3JvbGVdKVwiXVxyXG5cdH0sXHJcblx0cmFkaW86IHtcclxuXHRcdHN1cGVyOiBbXCJpbnB1dFwiXSxcclxuXHRcdHN1YjogW1wibWVudWl0ZW1yYWRpb1wiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJpbnB1dFt0eXBlPSdyYWRpbyddOm5vdChbcm9sZV0pXCJdLFxyXG5cdFx0ZGVmYXVsdHM6IHsgY2hlY2tlZDogZmFsc2UgfVxyXG5cdH0sXHJcblx0cmFkaW9ncm91cDoge1xyXG5cdFx0c3VwZXI6IFtcInNlbGVjdFwiXSxcclxuXHRcdG93bnM6IFtcInJhZGlvXCJdXHJcblx0fSxcclxuXHRyYW5nZToge1xyXG5cdFx0c3VwZXI6IFtcIndpZGdldFwiXSxcclxuXHRcdHN1YjogW1wicHJvZ3Jlc3NiYXJcIiwgXCJzY3JvbGxiYXJcIiwgIFwic2xpZGVyXCIsICBcInNwaW5idXR0b25cIl1cclxuXHR9LFxyXG5cdC8qKiBAdG9kbyBhZGQgc2VjdGlvbiBzZWxlY3RvciB0byBjaGVjayBhY2Nlc3NpYmxlICovXHJcblx0cmVnaW9uOiB7IHN1cGVyOiBbXCJsYW5kbWFya1wiXSB9LFxyXG5cdHJvbGV0eXBlOiB7IHN1YjogW1wic3RydWN0dXJlXCIsIFwid2lkZ2V0XCIsIFwid2luZG93XCJdIH0sXHJcblx0LyoqIEB0b2RvIG1vcmUgc3RyaWN0IHRyIHNlbGVjdG9yICovXHJcblx0cm93OiB7XHJcblx0XHRzdWI6IFtcImdyb3VwXCIsIFwid2lkZ2V0XCJdLFxyXG5cdFx0Y29udGV4dDogW1wiZ3JpZFwiLCBcInJvd2dyb3VwXCIsIFwidGFibGVcIiwgXCJ0cmVlZ3JpZFwiXSxcclxuXHRcdG93bnM6IHsgYW55OiBbXCJjZWxsXCIsIFwiY29sdW1uaGVhZGVyXCIsIFwicm93aGVhZGVyXCIsIFwiZ3JpZGNlbGxcIl0gfSxcclxuXHRcdGltcGxpY2l0OiBbXCJ0YWJsZSB0cjpub3QoW3JvbGVdKVwiXVxyXG5cdH0sXHJcblx0cm93Z3JvdXA6IHtcclxuXHRcdGNvbnRleHQ6IFtcImdyaWRcIiwgXCJ0YWJsZVwiLCBcInRyZWVncmlkXCJdLFxyXG5cdFx0b3duczogeyBhbnk6IFtcInJvd1wiXSB9LFxyXG5cdFx0aW1wbGljaXQ6IFtcInRoZWFkOm5vdChbcm9sZV0pXCIsIFwidGJvZHk6bm90KFtyb2xlXSlcIiwgXCJ0Zm9vdDpub3QoW3JvbGVdKVwiXVxyXG5cdH0sXHJcblx0cm93aGVhZGVyOiB7XHJcblx0XHRzdXBlcjogW1wiY2VsbFwiLCBcImdyaWRjZWxsXCIsIFwic2VjdGlvbmhlYWRcIl0sXHJcblx0XHRjb250ZXh0OiBbXCJyb3dcIl0sXHJcblx0XHRpbXBsaWNpdDogW1widGJvZHkgdGg6bm90KFtyb2xlXSlcIl1cclxuXHR9LFxyXG5cdHNjcm9sbGJhcjoge1xyXG5cdFx0c3VwZXI6IFtcInJhbmdlXCJdLFxyXG5cdFx0ZGVmYXVsdHM6IHtcclxuXHRcdFx0b3JpZW50YXRpb246IFwidmVydGljYWxcIixcclxuXHRcdFx0dmFsdWVNaW46IDAsXHJcblx0XHRcdHZhbHVlTWF4OiAxMDBcclxuXHRcdH1cclxuXHR9LFxyXG5cdHNlYXJjaDogeyBzdXBlcjogW1wibGFuZG1hcmtcIl0gfSxcclxuXHRzZWFyY2hib3g6IHtcclxuXHRcdHN1cGVyOiBbXCJ0ZXh0Ym94XCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcImlucHV0W3R5cGU9J3NlYXJjaCddOm5vdChbbGlzdF0pOm5vdChbcm9sZV0pXCJdXHJcblx0fSxcclxuXHRzZWN0aW9uOiB7XHJcblx0XHRzdXBlcjogW1wic3RydWN0dXJlXCJdLFxyXG5cdFx0c3ViOiBbXCJhbGVydFwiLCBcImNlbGxcIiwgXCJkZWZpbml0aW9uXCIsIFwiZmlndXJlXCIsIFwiZ3JvdXBcIiwgXCJpbWdcIiwgXCJsYW5kbWFya1wiLCBcImxpc3RcIiwgXCJsaXN0aXRlbVwiLFxyXG5cdFx0XHRcImxvZ1wiLCBcIm1hcnF1ZWVcIiwgXCJtYXRoXCIsIFwibm90ZVwiLCBcInN0YXR1c1wiLCBcInRhYmxlXCIsIFwidGFicGFuZWxcIiwgXCJ0ZXJtXCIsIFwidG9vbHRpcFwiXVxyXG5cdH0sXHJcblx0c2VjdGlvbmhlYWQ6IHtcclxuXHRcdHN1cGVyOiBbXCJzdHJ1Y3R1cmVcIl0sXHJcblx0XHRzdWI6IFtcImNvbHVtbmhlYWRlclwiLCBcImhlYWRpbmdcIiwgXCJyb3doZWFkZXJcIiwgXCJ0YWJcIl1cclxuXHR9LFxyXG5cdHNlbGVjdDoge1xyXG5cdFx0c3VwZXI6IFtcImNvbXBvc2l0ZVwiLCBcImdyb3VwXCJdLFxyXG5cdFx0c3ViOiBbXCJjb21ib2JveFwiLCBcImxpc3Rib3hcIiwgXCJtZW51XCIsIFwicmFkaW9ncm91cFwiLCBcInRyZWVcIl1cclxuXHR9LFxyXG5cdC8qKiBAdG9kbyBzZXBlcmF0aW9uIG9mIGZvY3VzYWJsZSAqL1xyXG5cdHNlcGFyYXRvcjoge1xyXG5cdFx0c3VwZXI6IFtcInN0cnVjdHVyZVwiLCBcIndpZGdldFwiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJocjpub3QoW3JvbGVdKVwiXSxcclxuXHRcdGRlZmF1bHRzOiB7XHJcblx0XHRcdG9yaWVudGF0aW9uOiBcImhvcml6b250YWxcIixcclxuXHRcdFx0dmFsdWVNaW46IDAsXHJcblx0XHRcdHZhbHVlTWF4OiAxMDAsXHJcblx0XHRcdHZhbHVlTm93OiA1MFxyXG5cdFx0fVxyXG5cdH0sXHJcblx0c2xpZGVyOiB7XHJcblx0XHRzdXBlcjogW1wiaW5wdXRcIiwgXCJyYW5nZVwiXSxcclxuXHRcdGltcGxpY2l0OiBbXCJpbnB1dFt0eXBlPSdyYW5nZSddOm5vdChbcm9sZV0pXCJdLFxyXG5cdFx0ZGVmYXVsdHM6IHtcclxuXHRcdFx0b3JpZW50YXRpb246IFwiaG9yaXpvbnRhbFwiLFxyXG5cdFx0XHR2YWx1ZU1pbjogMCxcclxuXHRcdFx0dmFsdWVNYXg6IDEwMFxyXG5cdFx0fVxyXG5cdH0sXHJcblx0c3BpbmJ1dHRvbjoge1xyXG5cdFx0c3VwZXI6IFtcImNvbXBvc2l0ZVwiLCBcImlucHV0XCIsIFwicmFuZ2VcIl0sXHJcblx0XHRpbXBsaWNpdDogW1wiaW5wdXRbdHlwZT0nbnVtYmVyJ106bm90KFtyb2xlXSlcIl0sXHJcblx0XHRkZWZhdWx0czoge1x0dmFsdWVOb3c6IDAgfVxyXG5cdH0sXHJcblx0c3RhdHVzOiB7XHJcblx0XHRzdXBlcjogXCJzZWN0aW9uXCIsXHJcblx0XHRzdWI6IFtcInByb2dyZXNzYmFyXCIsIFwidGltZXJcIl0sXHJcblx0XHRpbXBsaWNpdDogW1wib3V0cHV0Om5vdChbcm9sZV0pXCJdXHJcblx0fSxcclxuXHRzdHJ1Y3R1cmU6IHtcclxuXHRcdHN1cGVyOiBbXCJyb2xldHlwZVwiXSxcclxuXHRcdHN1YjogW1wiYXBwbGljYXRpb25cIiwgXCJkb2N1bWVudFwiLCBcInByZXNlbnRhdGlvblwiLCBcInJvd2dyb3VwXCIsIFwic2VjdGlvblwiLCBcInNlY3Rpb25oZWFkXCIsIFwic2VwYXJhdG9yXCJdXHJcblx0fSxcclxuXHRzd2l0Y2g6IHtcclxuXHRcdHN1cGVyOiBbXCJjaGVja2JveFwiXSxcclxuXHRcdGRlZmF1bHRzOiB7IGNoZWNrZWQ6IGZhbHNlIH1cclxuXHR9LFxyXG5cdHRhYjoge1xyXG5cdFx0c3VwZXI6IFtcInNlY3Rpb25oZWFkXCIsIFwid2lkZ2V0XCJdLFxyXG5cdFx0Y29udGV4dDogW1widGFibGlzdFwiXSxcclxuXHRcdGRlZmF1bHRzOiB7IHNlbGVjdGVkOiBmYWxzZSB9XHJcblx0fSxcclxuXHR0YWJsZToge1xyXG5cdFx0c3VwZXI6IFtcInNlY3Rpb25cIl0sXHJcblx0XHRzdWI6IFtcImdyaWRcIl0sXHJcblx0XHRvd25zOiB7IGFueTogW1wicm93XCIsIFwicm93Z3JvdXBcIl19LFxyXG5cdFx0aW1wbGljaXQ6IFtcInRhYmxlOm5vdChbcm9sZV0pXCJdXHJcblx0fSxcclxuXHR0YWJsaXN0OiB7XHJcblx0XHRzdXBlcjogW1wiY29tcG9zaXRlXCJdLFxyXG5cdFx0b3duczogeyBhbnk6IFtcInRhYlwiXSB9LFxyXG5cdFx0ZGVmYXVsdHM6IHsgb3JpZW50YXRpb246IFwiaG9yaXpvbnRhbFwiIH1cclxuXHR9LFxyXG5cdHRhYnBhbmVsOiB7IHN1cGVyOiBbXCJzZWN0aW9uXCJdIH0sXHJcblx0dGVybTogeyBzdXBlcjogW1wic2VjdGlvblwiXSB9LFxyXG5cdHRleHRib3g6IHtcclxuXHRcdHN1cGVyOiBbXCJpbnB1dFwiXSxcclxuXHRcdHN1YjogW1wic2VhcmNoYm94XCJdLFxyXG5cdFx0aW1wbGljaXQ6IFtcImlucHV0W3R5cGU9J2VtYWlsJ106bm90KFtsaXN0XSk6bm90KFtyb2xlXSlcIixcclxuXHRcdFx0XCJpbnB1dFt0eXBlPSd0ZWwnXTpub3QoW2xpc3RdKTpub3QoW3JvbGVdKVwiLCBcImlucHV0W3R5cGU9J3RleHQnXTpub3QoW2xpc3RdKTpub3QoW3JvbGVdKVwiLFxyXG5cdFx0XHRcImlucHV0W3R5cGU9J3VybCddOm5vdChbbGlzdF0pOm5vdChbcm9sZV0pXCIsIFwidGV4dGFyZWE6bm90KFtyb2xlXSlcIl1cclxuXHR9LFxyXG5cdHRpbWVyOiB7IHN1cGVyOiBbXCJzdGF0dXNcIl0gfSxcclxuXHR0b29sYmFyOiB7XHJcblx0XHRzdXBlcjogW1wiZ3JvdXBcIl0sXHJcblx0XHRkZWZhdWx0czogeyBvcmllbnRhdGlvbjogXCJob3Jpem9udGFsXCIgfVxyXG5cdH0sXHJcblx0dG9vbHRpcDogeyBzdXBlcjogW1wic2VjdGlvblwiXSB9LFxyXG5cdHRyZWU6IHtcclxuXHRcdHN1cGVyOiBbXCJzZWxlY3RcIl0sXHJcblx0XHRzdWI6IFtcInRocmVlZ3JpZFwiXSxcclxuXHRcdG93bnM6IHsgYW55OiBbXCJncm91cFwiLCBcInRyZWVpdGVtXCJdIH1cclxuXHR9LFxyXG5cdHRyZWVncmlkOiB7XHJcblx0XHRzdXBlcjogW1wiZ3JpZFwiLCBcInRyZWVcIl0sXHJcblx0XHRvd25zOiBbXCJyb3dcIiwgXCJyb3dncm91cFwiXVxyXG5cdH0sXHJcblx0dHJlZWl0ZW06IHtcclxuXHRcdHN1cGVyOiBbXCJsaXN0aXRlbVwiLCBcIm9wdGlvblwiXSxcclxuXHRcdGNvbnRleHQ6IHsgYW55OiBbXCJncm91cFwiLCBcInRyZWVcIl19XHJcblx0fSxcclxuXHR3aWRnZXQ6IHtcclxuXHRcdHN1cGVyOiBbXCJyb2xldHlwZVwiXSxcclxuXHRcdHN1YjogW1wiY29tbWFuZFwiLCBcImNvbXBvc2l0ZVwiLCBcImdyaWRjZWxsXCIsIFwiaW5wdXRcIiwgXCJyYW5nZVwiLCBcInJvd1wiLCBcInNlcGFyYXRvclwiLCBcInRhYlwiXVxyXG5cdH0sXHJcblx0d2luZG93OiB7XHJcblx0XHRzdXBlcjogW1wicm9sZXR5cGVcIl0sXHJcblx0XHRzdWI6IFtcImRpYWxvZ1wiXVxyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvbGVzOyIsImZ1bmN0aW9uIHNldFNlbGVjdGlvbihyYW5nZSkge1xuXHR2YXIgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuXHRzZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzKCk7XG5cdHNlbGVjdGlvbi5hZGRSYW5nZShyYW5nZSk7XG59XG5cbi8qKlxuICogQG1peGluXG4gKi9cbmxldCBTZWxlY3Rpb24gPSAoc3VwZXJjbGFzcykgPT4gY2xhc3MgU2VsZWN0aW9uIGV4dGVuZHMgc3VwZXJjbGFzcyB7XG5cdC8qKlxuXHQgKiBTZWxlY3RzIGV2ZXJ5dGhpbmcgaW4gdGhlIHRleHQgY29udHJvbC5cblx0ICogQG5hbWUgU2VsZWN0aW9uI3NlbGVjdFxuXHQgKi9cblx0c2VsZWN0KCkge1xuXHRcdHRoaXMuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgdGhpcy52YWx1ZS5sZW5ndGgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgLyBTZXRzIHRoZSBiZWdpbm5pbmcgaW5kZXggb2YgdGhlIHNlbGVjdGVkIHRleHQuIFdoZW4gbm90aGluZyBpcyBzZWxlY3RlZCxcblx0ICogdGhpcyByZXR1cm5zIHRoZSBwb3NpdGlvbiBvZiB0aGUgdGV4dCBpbnB1dCBjdXJzb3IoY2FyZXQpIGluc2lkZSBvZiB0aGUgPCBpbnB1dCA+IGVsZW1lbnQuXG5cdCAqIFxuXHQgKiBAbmFtZSBTZWxlY3Rpb24jc2VsZWN0aW9uU3RhcnRcblx0ICogQHR5cGUge051bWJlcn1cblx0ICovXG5cdGdldCBzZWxlY3Rpb25TdGFydCgpIHtcblx0XHRsZXQgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuXHRcdGlmIChzZWwuYW5jaG9yTm9kZSAmJiBzZWwuYW5jaG9yTm9kZS5wYXJlbnROb2RlID09IHRoaXMuZWxlbWVudCkge1xuXHRcdFx0cmV0dXJuIHNlbC5hbmNob3JPZmZzZXQgPiBzZWwuZm9jdXNPZmZzZXQgPyBzZWwuZm9jdXNPZmZzZXQgOiBzZWwuYW5jaG9yT2Zmc2V0O1xuXHRcdH1cblx0fVxuXHRzZXQgc2VsZWN0aW9uU3RhcnQoc3RhcnQpIHtcblx0XHRsZXQgcmFuZ2UgPSBuZXcgUmFuZ2UoKTtcblx0XHRyYW5nZS5zZXRTdGFydCh0aGlzLmVsZW1lbnQuZmlyc3RDaGlsZCwgc3RhcnQpO1xuXHRcdHNldFNlbGVjdGlvbihyYW5nZSk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyAvIFNldHMgdGhlIGVuZCBpbmRleCBvZiB0aGUgc2VsZWN0ZWQgdGV4dC4gV2hlbiB0aGVyZSdzIG5vIHNlbGVjdGlvbix0aGlzIHJldHVybnMgdGhlXG5cdCAqIG9mZnNldCBvZiB0aGUgY2hhcmFjdGVyIGltbWVkaWF0ZWx5IGZvbGxvd2luZyB0aGUgY3VycmVudCB0ZXh0IGlucHV0IGN1cnNvciBwb3NpdGlvbi5cblx0ICogXG5cdCAqIEBuYW1lIFNlbGVjdGlvbiNzZWxlY3Rpb25FbmRcblx0ICogQHR5cGUge051bWJlcn1cblx0ICovXG5cdGdldCBzZWxlY3Rpb25FbmQoKSB7XG5cdFx0bGV0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblx0XHRpZiAoc2VsLmZvY3VzTm9kZSAmJiBzZWwuZm9jdXNOb2RlLnBhcmVudE5vZGUgPT0gdGhpcy5lbGVtZW50KSB7XG5cdFx0XHRyZXR1cm4gc2VsLmZvY3VzT2Zmc2V0ID4gc2VsLmFuY2hvck9mZnNldCA/IHNlbC5mb2N1c09mZnNldCA6IHNlbC5hbmNob3JPZmZzZXQ7XG5cdFx0fVxuXHR9XG5cdHNldCBzZWxlY3Rpb25FbmQoZW5kKSB7XG5cdFx0bGV0IHJhbmdlID0gbmV3IFJhbmdlKCk7XG5cdFx0cmFuZ2Uuc2V0RW5kKHRoaXMuZWxlbWVudC5maXJzdENoaWxkLCBlbmQpO1xuXHRcdHNldFNlbGVjdGlvbihyYW5nZSk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyAvIFNldHMgdGhlIGRpcmVjdGlvbiBpbiB3aGljaCBzZWxlY3Rpb24gb2NjdXJyZWQuXG5cdCAqIFxuXHQgKiAqIFwiZm9yd2FyZFwiIGlmIHNlbGVjdGlvbiB3YXMgcGVyZm9ybWVkIGluIHRoZSBzdGFydCAtIHRvIC0gZW5kIGRpcmVjdGlvbiBvZiB0aGUgY3VycmVudCBsb2NhbGUuXG5cdCAqICogXCJiYWNrd2FyZFwiIGZvciB0aGUgb3Bwb3NpdGUgZGlyZWN0aW9uLFxuXHQgKiAqIFwibm9uZVwiIGlmIHRoZSBkaXJlY3Rpb24gaXMgdW5rbm93bi5cIlxuXHQgKiBcblx0ICogQG5hbWUgU2VsZWN0aW9uI3NlbGVjdGlvbkRpcmVjdGlvblxuXHQgKiBAdG9kbyBpbXByb3ZlIG1ldGhvZCB0byBzZXQgYW5kIGdldCBkaXJlY3Rpb25cblx0ICogQHR5cGUgeyBcImZvcndhcmRcIiB8IFwiYmFja3dhcmRcIiB8IFwibm9uZVwiIH1cblx0ICovXG5cdGdldCBzZWxlY3Rpb25EaXJlY3Rpb24oKSB7XG5cdFx0bGV0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblx0XHRpZiAoc2VsLmZvY3VzTm9kZSAmJiBzZWwuZm9jdXNOb2RlLnBhcmVudE5vZGUgPT0gdGhpcy5lbGVtZW50KSB7XG5cdFx0XHRpZiAoc2VsLmZvY3VzT2Zmc2V0ID09IHNlbC5hbmNob3JPZmZzZXQpIHtcblx0XHRcdFx0cmV0dXJuIFwibm9uZVwiO1xuXHRcdFx0fSBlbHNlIGlmIChzZWwuYW5jaG9yT2Zmc2V0ID4gc2VsLmZvY3VzT2Zmc2V0KSB7XG5cdFx0XHRcdHJldHVybiBcImJhY2t3YXJkXCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gXCJmb3J3YXJkXCI7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHNldCBzZWxlY3Rpb25EaXJlY3Rpb24oZGlyZWN0aW9uKSB7XG5cdFx0bGV0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblx0XHRpZiAoc2VsLmZvY3VzTm9kZSAmJiBzZWwuZm9jdXNOb2RlLnBhcmVudE5vZGUgPT0gdGhpcy5lbGVtZW50KSB7XG5cdFx0XHRpZiAoc2VsLmZvY3VzT2Zmc2V0ID09IHNlbC5hbmNob3JPZmZzZXQpIHtcblxuXHRcdFx0fSBlbHNlIGlmIChzZWwuYW5jaG9yT2Zmc2V0ID4gc2VsLmZvY3VzT2Zmc2V0ICYmIGRpcmVjdGlvbiAhPSBcImJhY2t3YXJkXCIpIHtcblx0XHRcdFx0bGV0IHJhbmdlID0gbmV3IFJhbmdlKCk7XG5cdFx0XHRcdHJhbmdlLnNldFN0YXJ0KHRoaXMuZWxlbWVudC5maXJzdENoaWxkLCB0aGlzLnNlbGVjdGlvbkVuZCk7XG5cdFx0XHRcdHJhbmdlLnNldEVuZCh0aGlzLmVsZW1lbnQuZmlyc3RDaGlsZCwgdGhpcy5zZWxlY3Rpb25TdGFydCk7XG5cblx0XHRcdFx0c2V0U2VsZWN0aW9uKHJhbmdlKTtcblx0XHRcdH0gZWxzZSBpZiAoZGlyZWN0aW9uICE9IFwiZm9yd2FyZFwiKSB7XG5cdFx0XHRcdGxldCByYW5nZSA9IG5ldyBSYW5nZSgpO1xuXHRcdFx0XHRyYW5nZS5zZXRTdGFydCh0aGlzLmVsZW1lbnQuZmlyc3RDaGlsZCwgdGhpcy5zZWxlY3Rpb25TdGFydCk7XG5cdFx0XHRcdHJhbmdlLnNldEVuZCh0aGlzLmVsZW1lbnQuZmlyc3RDaGlsZCwgdGhpcy5zZWxlY3Rpb25FbmQpO1xuXG5cdFx0XHRcdHNldFNlbGVjdGlvbihyYW5nZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFNlbGVjdHMgYSByYW5nZSBvZiB0ZXh0IGluIHRoZSBlbGVtZW50IChidXQgZG9lcyBub3QgZm9jdXMgaXQpLlxuXHQgKiBAbmFtZSBTZWxlY3Rpb24jc2V0U2VsZWN0aW9uUmFuZ2Vcblx0ICogQHBhcmFtIHtJbnRlZ2VyfSBzZWxlY3Rpb25TdGFydFxuXHQgKiBAcGFyYW0ge0ludGVnZXJ9IHNlbGVjdGlvbkVuZFxuXHQgKiBAcGFyYW0geyBcImZvcndhcmRcIiB8IFwiYmFja3dhcmRcIiB8IFwibm9uZVwiIH0gW3NlbGVjdGlvbkRpcmVjdGlvbiA9IFwibm9uZVwiXSBcblx0ICogRXN0YWJsaXNoIHRoZSBkaXJlY3Rpb24gaW4gd2hpY2ggc2VsZWN0aW9uIHdhcyBzZXRcblx0ICovXG5cdHNldFNlbGVjdGlvblJhbmdlKHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQsIHNlbGVjdGlvbkRpcmVjdGlvbiA9IFwibm9uZVwiKSB7XG5cdFx0bGV0IHN0YXJ0ID0gc2VsZWN0aW9uRGlyZWN0aW9uID09IFwiYmFja3dhcmRcIiA/IHNlbGVjdGlvbkVuZCA6IHNlbGVjdGlvblN0YXJ0O1xuXHRcdGxldCBlbmQgPSBzZWxlY3Rpb25EaXJlY3Rpb24gPT0gXCJiYWNrd2FyZFwiID8gc2VsZWN0aW9uU3RhcnQgOiBzZWxlY3Rpb25FbmQ7XG5cblx0XHRsZXQgcmFuZ2UgPSBuZXcgUmFuZ2UoKTtcblx0XHRyYW5nZS5zZXRTdGFydCh0aGlzLmVsZW1lbnQuZmlyc3RDaGlsZCwgc3RhcnQpO1xuXHRcdHJhbmdlLnNldEVuZCh0aGlzLmVsZW1lbnQuZmlyc3RDaGlsZCwgZW5kKTtcblxuXHRcdHNldFNlbGVjdGlvbihyYW5nZSk7XG5cdH1cblxuXHQvKipcblx0ICogUmVwbGFjZXMgdGhlIHJhbmdlIG9mIHRleHQgd2l0aCB0aGUgbmV3IHRleHQuXG5cdCAqIEBuYW1lIFNlbGVjdGlvbiNzZXRSYW5nZVRleHRcblx0ICogQHRvZG8gS2VlcCBwcmV2aW91cyBzZWxlY3Rpb24gb24gcGxhY2Vcblx0ICogQHBhcmFtIHtTdHJpbmd9IHJlcGxhY2VtZW50IFxuXHQgKiBAcGFyYW0ge0ludGVnZXJ9IFtzdGFydCA9IHtAbGluayBUZXh0Ym94I3NlbGVjdGlvblN0YXJ0fV1cblx0ICogQHBhcmFtIHtJbnRlZ2VyfSBbZW5kXVxuXHQgKiBAcGFyYW0geyBcInNlbGVjdFwiIHwgXCJzdGFydFwiIHwgXCJlbmRcIiB8IFwicHJlc2VydmVcIiB9IFtzZWxlY3RNb2RlID0gXCJwcmVzZXJ2ZVwiXVxuXHQgKi9cblx0c2V0UmFuZ2VUZXh0KFxuXHRcdHJlcGxhY2VtZW50LFxuXHRcdHN0YXJ0ID0gdGhpcy5zZWxlY3Rpb25TdGFydCxcblx0XHRlbmQgPSB0aGlzLnNlbGVjdGlvbkVuZCxcblx0XHRzZWxlY3RNb2RlID0gXCJwcmVzZXJ2ZVwiXG5cdCkge1xuXHRcdGxldCBzZWxlY3Rpb25TdGFydCA9IHRoaXMuc2VsZWN0aW9uU3RhcnQ7XG5cdFx0bGV0IHNlbGVjdGlvbkVuZCA9IHRoaXMuc2VsZWN0aW9uRW5kO1xuXG5cdFx0aWYgKHN0YXJ0ID4gZW5kKSB7IHRocm93IG5ldyBSYW5nZUVycm9yKCk7IH1cblx0XHRpZiAoc3RhcnQgPiB0aGlzLnZhbHVlLmxlbmd0aCkgeyBzdGFydCA9IHRoaXMudmFsdWUubGVuZ3RoOyB9XG5cdFx0aWYgKGVuZCA+IHRoaXMudmFsdWUubGVuZ3RoKSB7IGVuZCA9IHRoaXMudmFsdWUubGVuZ3RoOyB9XG5cdFx0aWYgKHN0YXJ0IDwgZW5kKSB7XG5cdFx0XHQvLyBkZWxldGUgY2hhcmFjdGVycyBiZXR3ZWVuIHN0YXJ0IGFuZCBlbmRcblx0XHR9XG5cblx0XHR0aGlzLnZhbHVlID0gdGhpcy52YWx1ZS5zbGljZSgwLCBzdGFydCkgKyByZXBsYWNlbWVudCArIHRoaXMudmFsdWUuc2xpY2UoZW5kKTtcblxuXHRcdGlmIChzZWxlY3RNb2RlID09IFwic3RhcnRcIikgdGhpcy5zZWxlY3Rpb25TdGFydCA9IDA7XG5cdFx0aWYgKHNlbGVjdE1vZGUgPT0gXCJlbmRcIikgdGhpcy5zZWxlY3Rpb25TdGFydCA9IHRoaXMudmFsdWUubGVuZ3RoO1xuXHRcdGlmIChzZWxlY3RNb2RlID09IFwic2VsZWN0XCIpIHRoaXMuc2VsZWN0KCk7XG5cdFx0aWYgKHNlbGVjdE1vZGUgPT0gXCJwcmVzZXJ2ZVwiKSB0aGlzLnNldFNlbGVjdGlvblJhbmdlKHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQpO1xuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3Rpb247IiwiaW1wb3J0IFZhbGlkaXR5U3RhdGUgXHRmcm9tIFwiLi8uLi91dGlscy9WYWxpZGl0eVN0YXRlXCI7XG5cbi8qKlxuICogQG1peGluXG4gKiBAYm9ycm93cyBWYWxpZGl0eVN0YXRlIGFzIHZhbGlkaXR5XG4gKiBAbGVuZHMgVmFsaWRhdGlvbiNcbiAqL1xubGV0IFZhbGlkYXRpb24gPSAoc3VwZXJjbGFzcykgPT4gY2xhc3MgVmFsaWRhdGlvbiBleHRlbmRzIHN1cGVyY2xhc3MgXG57IFxuXHRnZXQgdmFsaWRpdHkoKSB7IFxuXHRcdGlmKCF0aGlzLl92YWxpZGl0eSkgdGhpcy5fdmFsaWRpdHkgPSBuZXcgVmFsaWRpdHlTdGF0ZSh0aGlzKTtcblxuXHRcdHJldHVybiB0aGlzLl92YWxpZGl0eTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnQgd2lsbCBiZSB2YWxpZGF0ZWQgd2hlbiB0aGUgZm9ybSBpcyBzdWJtaXR0ZWQ7IGZhbHNlIG90aGVyd2lzZS5cblx0ICogQHR5cGUge0Jvb2xlYW59XG5cdCAqL1xuXHRnZXQgd2lsbFZhbGlkYXRlKCkgeyByZXR1cm4gIXRoaXMuaGlkZGVuICYmICF0aGlzLnJlYWRPbmx5OyB9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGVycm9yIG1lc3NhZ2UgdGhhdCB3b3VsZCBiZSBzaG93biB0byB0aGUgdXNlclxuXHQgKiBpZiB0aGUgZWxlbWVudCB3YXMgdG8gYmUgY2hlY2tlZCBmb3IgdmFsaWRpdHkuXG5cdCAqIEBuYW1lIFZhbGlkYXRpb24jdmFsaWRhdGlvbk1lc3NhZ2Vcblx0ICogQHR5cGUge1N0cmluZ31cblx0ICovXG5cdGdldCB2YWxpZGF0aW9uTWVzc2FnZSgpIHtcblx0XHRpZih0aGlzLnZhbGlkaXR5LnZhbGlkKSByZXR1cm47XG5cdFx0aWYodGhpcy52YWxpZGl0eS52YWx1ZU1pc3NpbmcpIHJldHVybiBcIlBsZWFzZSBmaWxsIGluIHRoaXMgZmllbGQuXCI7XG5cdFx0aWYodGhpcy52YWxpZGl0eS50eXBlTWlzbWF0Y2gpIHJldHVybiBcIlBsZWFzZSB1c2UgdGhlIGNvcnJlY3QgaW5wdXQgdHlwZS5cIjtcblx0XHRcblx0XHRpZiAodGhpcy52YWxpZGl0eS50b29Mb25nKSB7XG5cdFx0XHRyZXR1cm4gXCJQbGVhc2Ugc2hvcnRlbiB0aGlzIHRleHQgdG8gMTAgY2hhcmFjdGVycyBvciBsZXNzICh5b3UgYXJlIGN1cnJlbnRseSB1c2luZyA0OCBjaGFyYWN0ZXJzKS5cIjtcblx0XHR9XG5cdFx0aWYodGhpcy52YWxpZGl0eS50b29TaG9ydCkge1xuXHRcdFx0cmV0dXJuIFwiUGxlYXNlIGxlbmd0aGVuIHRoaXMgdGV4dCB0byAxMCBjaGFyYWN0ZXJzIG9yIG1vcmUgKHlvdSBhcmUgY3VycmVudGx5IHVzaW5nIDEgY2hhcmFjdGVyKS5cIjtcblx0XHR9XG5cblx0XHRpZih0aGlzLnZhbGlkaXR5LmJhZElucHV0KSByZXR1cm4gXCJQbGVhc2UgZW50ZXIgYSBudW1iZXIuXCI7XG5cdFx0aWYgKHRoaXMudmFsaWRpdHkuc3RlcE1pc21hdGNoKSByZXR1cm4gXCJQbGVhc2Ugc2VsZWN0IGEgdmFsaWQgdmFsdWUuXCI7XG5cdFx0aWYgKHRoaXMudmFsaWRpdHkucmFuZ2VPdmVyZmxvdykgcmV0dXJuIFwiUGxlYXNlIHNlbGVjdCBhIHNtYWxsZXIgdmFsdWUuXCI7XG5cdFx0aWYgKHRoaXMudmFsaWRpdHkucmFuZ2VVbmRlcmZsb3cpIHJldHVybiBcIlBsZWFzZSBzZWxlY3QgYSBsYXJnZXIgdmFsdWUuXCI7XG5cdFx0aWYodGhpcy52YWxpZGl0eS5wYXR0ZXJuTWlzbWF0Y2gpIHJldHVybiBcIlBsZWFzZSBtYXRjaCB0aGUgZm9ybWF0IHJlcXVlc3RlZC5cIjtcblx0XHRpZih0aGlzLnZhbGlkaXR5LmN1c3RvbUVycm9yKSByZXR1cm4gdGhpcy5lcnJvcm1lc3NhZ2UuZWxlbWVudC5pbm5lckhUTUw7XG5cblx0XHQvLyBGYWxsYmFjayB2YWx1ZSBzaG91bGQgbmV2ZXIgYmVlbiBzaG93blxuXHRcdHJldHVybiB0aGlzLmVycm9ybWVzc2FnZS5lbGVtZW50LmlubmVySFRNTCB8fCBcIlRoZSB2YWx1ZSB5b3UgZW50ZXJlZCBmb3IgdGhpcyBmaWVsZCBpcyBpbnZhbGlkLlwiO1x0XHRcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnTigJlzIHZhbHVlIGhhcyBubyB2YWxpZGl0eSBwcm9ibGVtczsgZmFsc2Ugb3RoZXJ3aXNlLlxuXHQgKiBGaXJlcyBhbiBpbnZhbGlkIGV2ZW50IGF0IHRoZSBlbGVtZW50IGluIHRoZSBsYXR0ZXIgY2FzZS5cblx0ICogQGZpcmVzIGludmFsaWRcblx0ICogQG5hbWUgVmFsaWRhdGlvbiNjaGVja1ZhbGlkaXR5XG5cdCAqL1xuXHRjaGVja1ZhbGlkaXR5KCkge1xuXHRcdGlmKCF0aGlzLnZhbGlkaXR5LnZhbGlkKSB0aGlzLmRpc3BhdGNoRXZlbnQoXCJpbnZhbGlkXCIsIHRoaXMpO1xuXHRcdHJldHVybiB0aGlzLnZhbGlkaXR5LnZhbGlkO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudOKAmXMgdmFsdWUgaGFzIG5vIHZhbGlkaXR5IHByb2JsZW1zOyBvdGhlcndpc2UsIHJldHVybnMgZmFsc2UsIGZpcmVzIGFuXG5cdCAqIGludmFsaWQgZXZlbnQgYXQgdGhlIGVsZW1lbnQsIGFuZChpZiB0aGUgZXZlbnQgaXNu4oCZdCBjYW5jZWxlZCkgcmVwb3J0cyB0aGUgcHJvYmxlbSB0byB0aGUgdXNlci5cblx0ICogQGZpcmVzIGludmFsaWRcblx0ICogQG5hbWUgVmFsaWRhdGlvbiNyZXBvcnRWYWxpZGl0eVxuXHQgKi9cblx0cmVwb3J0VmFsaWRpdHkoKSB7XG5cdFx0aWYgKCF0aGlzLnZhbGlkaXR5LnZhbGlkKSB7XG5cdFx0XHRsZXQgY2FuY2VsbGVkID0gIXRoaXMuZGlzcGF0Y2hFdmVudChcImludmFsaWRcIiwgdGhpcyk7XG5cdFx0XHRpZiAoIWNhbmNlbGxlZCkge1xuXHRcdFx0XHR0aGlzLmVycm9ybWVzc2FnZS5oaWRkZW4gPSBmYWxzZTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5lcnJvcm1lc3NhZ2UuaGlkZGVuID0gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMudmFsaWRpdHkudmFsaWQ7XG5cdH1cblxuXHQvKipcblx0ICogU2V0cyBhIGN1c3RvbSBlcnJvciwgc28gdGhhdCB0aGUgZWxlbWVudCB3b3VsZCBmYWlsIHRvIHZhbGlkYXRlLlRoZSBnaXZlbiBtZXNzYWdlIGlzIHRoZVxuXHQgKiBtZXNzYWdlIHRvIGJlIHNob3duIHRvIHRoZSB1c2VyIHdoZW4gcmVwb3J0aW5nIHRoZSBwcm9ibGVtIHRvIHRoZSB1c2VyLlxuXHQgKiBcblx0ICogSWYgdGhlIGFyZ3VtZW50IGlzIHRoZSBlbXB0eSBzdHJpbmcsIGNsZWFycyB0aGUgY3VzdG9tIGVycm9yLlxuXHQgKiBcblx0ICogQG5hbWUgVmFsaWRhdGlvbiNzZXRDdXN0b21WYWxpZGl0eVxuXHQgKiBAcGFyYW0gez9TdHJpbmd9IG1lc3NhZ2UgXG5cdCAqL1xuXHRzZXRDdXN0b21WYWxpZGl0eShtZXNzYWdlKSB7XG5cdFx0Ly8gdXBkYXRlIFZhbGlkeVN0YXRlIG9iamVjdFxuXHRcdHRoaXMudmFsaWRpdHkuX2N1c3RvbUVycm9yID0gbWVzc2FnZTtcblxuXHRcdGlmKG1lc3NhZ2UpIHtcdFx0XHRcblx0XHRcdC8vIHVwZGF0ZSBgYXJpYS1pbnZhbGlkYCBwcm9wZXJ0eSB0byBpbnZhbGlkXG5cdFx0XHR0aGlzLmludmFsaWQgPSB0cnVlO1xuXHRcdFx0XG5cdFx0XHQvLyB1cGRhdGUgZXJyb3IgbWVzc2FnZVxuXHRcdFx0dGhpcy5lcnJvcm1lc3NhZ2UuZWxlbWVudC5pbm5lckhUTUwgPSBtZXNzYWdlO1xuXHRcdFx0dGhpcy5lcnJvcm1lc3NhZ2UuZWxlbWVudC5oaWRkZW4gPSBmYWxzZTtcblx0XHR9IGVsc2Uge1x0XHRcdFxuXHRcdFx0Ly8gdXBkYXRlIGBhcmlhLWludmFsaWRgIHByb3BlcnR5IHRvIGludmFsaWRcblx0XHRcdHRoaXMuaW52YWxpZCA9IGZhbHNlO1xuXHRcdFx0XG5cdFx0XHQvLyB1cGRhdGUgZXJyb3IgbWVzc2FnZVxuXHRcdFx0dGhpcy5lcnJvcm1lc3NhZ2UuZWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xuXHRcdFx0dGhpcy5lcnJvcm1lc3NhZ2UuZWxlbWVudC5oaWRkZW4gPSB0cnVlO1xuXHRcdH1cblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgVmFsaWRhdGlvbjsiLCJjb25zdCBNb3VzZXRyYXAgPSByZXF1aXJlKFwibW91c2V0cmFwXCIpO1xyXG5pbXBvcnQgb2JqZWN0UGF0aCBmcm9tIFwib2JqZWN0LXBhdGhcIjtcclxuXHJcbmxldCBpc0Z1bmN0aW9uID0gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iaiA9PSBcImZ1bmN0aW9uXCIgfHwgZmFsc2U7IH07XHJcbnZhciBjdXN0b21FdmVudHMgPSBbXCJrZXlcIiwgXCJhdHRyaWJ1dGVzXCIsIFwiY2hhcmFjdGVyRGF0YVwiLCBcImNoaWxkbGlzdFwiLCBcImxhYmVsXCJdO1xyXG5cclxuLyoqXHJcbiAqIFJlZ2lzdGVyIGV4dHJhIGVsZW1lbnRzIHVzZWQgZm9yIHNvbWUgcm9sZXMsXHJcbiAqIGUuZy4gdGhlIHVwIGFuZCBkb3duIGFycm93cyB3aXRoIHRoZSBzcGluYnV0dG9uIHJvbGVcclxuICpcclxuICogUGF0aCBvZiBpbXBvcnRhbmNlIHdoZXJlIHRoZSBlbGVtZW50IGlzIHJlY2VpdmVkIGZyb206XHJcbiAqIDEuIG5ldyAuLi4oLi4uLCB7ZWxlbWVudHM6IHsgcm9sZU5hbWU6IHsgc3RyOiBpbnN0YW5jZSBvZiBIVE1MRWxlbWVudCB9fX0pXHJcbiAqIDIuIFtkYXRhLXJvbGVOYW1lLXN0cj1pZF0gb24gdGhlIGVsZW1lbnQgd2l0aCB0aGUgcm9sZVxyXG4gKiAzLiBkZWZhdWx0IHZhbHVlXHJcbiAqXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gcGF0aCBwYXRoIHdoZXJlIHRoZSBlbGVtZW50IHNob3VsZCBiZSBzdG9yZWRcclxuICovXHJcbmZ1bmN0aW9uIGhhbmRsZUN1c3RvbUVsZW1lbnQocGF0aCwgdmFsdWUpIHtcclxuXHQvLyBvbmx5IGlmIG5vIGVsZW1lbnQgaXMgYWxyZWFkeSBzZXRcclxuXHRpZighb2JqZWN0UGF0aC5oYXModGhpcywgXCJfLlwiICsgcGF0aCkpIHtcclxuXHRcdC8vIGNoZWNrIGlmIGVsZW1lbnQgaGFzIGl0IGRlZmluZWQgYXMgZGF0YSBhdHRyaWJ1dGVcclxuXHRcdHZhciBpZCA9IHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLVwiICsgcGF0aC5zcGxpdChcIi5cIikuam9pbihcIi1cIikpO1xyXG5cdFx0aWYoaWQpIHZhciBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuXHRcdGlmKGVsKSB7XHJcblx0XHRcdG9iamVjdFBhdGguc2V0KHRoaXMsIFwiXy5cIiArIHBhdGgsIGVsKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG9iamVjdFBhdGguc2V0KHRoaXMsIFwiXy5cIiArIHBhdGgsIHZhbHVlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZUN1c3RvbVZhbHVlKHBhdGgsIHZhbHVlKSB7XHJcblx0Ly8gb25seSBpZiBubyBlbGVtZW50IGlzIGFscmVhZHkgc2V0XHJcblx0aWYoIW9iamVjdFBhdGguaGFzKHRoaXMsIFwiXy5cIiArIHBhdGgpKSB7XHJcblx0XHQvLyBjaGVjayBpZiBlbGVtZW50IGhhcyBpdCBkZWZpbmVkIGFzIGRhdGEgYXR0cmlidXRlXHJcblx0XHR2YXIgZGF0YVZhbHVlID0gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtXCIgKyBwYXRoLnNwbGl0KFwiLlwiKS5qb2luKFwiLVwiKSk7XHJcblx0XHRpZihkYXRhVmFsdWUpIHtcclxuXHRcdFx0b2JqZWN0UGF0aC5zZXQodGhpcywgXCJfLlwiICsgcGF0aCwgZGF0YVZhbHVlKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG9iamVjdFBhdGguc2V0KHRoaXMsIFwiXy5cIiArIHBhdGgsIHZhbHVlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhbWVsaXplKHN0cikge1xyXG5cdHJldHVybiBzdHJbMF0udG9VcHBlckNhc2UoKSArIHN0ci5yZXBsYWNlKC8tKC4pL2csIGZ1bmN0aW9uIChhLCBiKSB7XHJcblx0XHRyZXR1cm4gYi50b1VwcGVyQ2FzZSgpO1xyXG5cdH0pLnNsaWNlKDEpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtb0NhbGxiYWNrKG11dGF0aW9ucykge1xyXG5cdC8vIGNvbnNvbGUubG9nKG11dGF0aW9ucyk7XHJcblx0bXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24gKG11dGF0aW9uKSB7XHJcblx0XHRpZiAobXV0YXRpb24udHlwZSA9PSBcImF0dHJpYnV0ZXNcIikge1xyXG5cdFx0XHRsZXQgYXR0ck5hbWUgPSBtdXRhdGlvbi5hdHRyaWJ1dGVOYW1lO1xyXG5cdFx0XHQvLyB1cGRhdGUgdG8gbmV3IHZhbHVlXHJcblx0XHRcdHRoaXMuXy52YWx1ZXNbYXR0ck5hbWVdID0gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyTmFtZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGxpc3RlbmVycyA9IHRoaXMuXy5saXN0ZW5lcnMuZ2V0KFwibXV0YXRpb25cIik7XHJcblx0XHRjb25zb2xlLmxvZyhsaXN0ZW5lcnMpO1xyXG5cdH0uYmluZCh0aGlzKSk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogQWRkcyBzb21lIGJhc2ljIGZ1bmN0aW9uYWxpdHkgdGhhdCBpcyBncmVhdGx5IHVzZWQgaW5zaWRlIHRoZSBjb21wb25lbnRzXHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBcdEVsZW1lbnQgd2hlcmUgYSBBY2Nlc3NpYmxlTm9kZSBzaG91bGQgYmUgY3JlYXRlZFxyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBcdFx0QWRkaXRpb25hbCBvcHRpb25zIHRvIHNldFxyXG4gKi9cclxuY2xhc3MgQmFzZSB7XHJcblx0Y29uc3RydWN0b3IoZWxlbWVudCwgb3B0aW9ucyA9IHt9KSB7XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJlbGVtZW50XCIsIHt2YWx1ZTogZWxlbWVudH0pO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiX1wiLCB7dmFsdWU6IG9wdGlvbnN9KTtcclxuXHRcdHRoaXMuXy52YWx1ZXMgPSB7fTtcclxuXHRcdHRoaXMuXy5saXN0ZW5lcnMgPSBuZXcgTWFwKCk7XHJcblx0XHR0aGlzLl8ucmVnaXN0ZXJDdXN0b21FbGVtZW50ID0gaGFuZGxlQ3VzdG9tRWxlbWVudC5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5fLnJlZ2lzdGVyQ3VzdG9tVmFsdWUgPSBoYW5kbGVDdXN0b21WYWx1ZS5iaW5kKHRoaXMpO1xyXG5cclxuXHRcdG9iamVjdFBhdGgucHVzaCh0aGlzLl8sIFwibXV0YXRpb25zXCIsIFwidGFiSW5kZXhcIik7XHJcblxyXG5cdFx0dmFyIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobW9DYWxsYmFjay5iaW5kKHRoaXMpKTtcclxuXHRcdG9ic2VydmVyLm9ic2VydmUoXHJcblx0XHRcdHRoaXMuZWxlbWVudCxcclxuXHRcdFx0e2F0dHJpYnV0ZXM6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSwgYXR0cmlidXRlRmlsdGVyOiB0aGlzLl8ubXV0YXRpb25zfVxyXG5cdFx0KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEN1cnJlbnQgdGFiaW5kZXggb2YgdGhlIGVsZW1lbnRcclxuXHQgKiBAdHlwZSB7TnVtYmVyfVxyXG5cdCAqL1xyXG5cdGdldCB0YWJJbmRleCgpIHsgXHJcblx0XHRpZiAoIXRoaXMuZWxlbWVudC5oYXNBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuZWxlbWVudC50YWJJbmRleDtcclxuXHR9XHJcblx0c2V0IHRhYkluZGV4KG51bWJlcikgeyB0aGlzLmVsZW1lbnQudGFiSW5kZXggPSBudW1iZXI7IH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhbiBsaXN0ZW5lciB0byB0aGUgb2JqZWN0IGFuZCB0YXJnZXRlZCBlbGVtZW50XHJcblx0ICogQHNlZSBjdXN0b21FdmVudHNcclxuXHQgKiBAcGFyYW0ge1N0cmluZ30gbGFiZWwgVHlwZSBvZiBldmVudFxyXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBFeHRlbmRzIEFkZEV2ZW50TGlzdGVuZXJPcHRpb25zXHJcblx0ICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmtleV0gV2hlbiBsYWJlbCBpcyBzZXQgdG8gYGtleWAgaXQgc3BlY2lmaWVzIHRoZSBrZXljb21ibyB0byBsaXN0ZW4gdG9cclxuXHQgKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuYXR0cmlidXRlXSBXaGVuIGxhYmVsIGlzIHNldCB0byBgYXR0cmlidXRlc2AgaXQgc3BlY2lmaWVzIHdoaWNoIGF0dHJpYnV0ZSBzaG91bGQgYmUgY2hhbmdlZFxyXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gW29wdGlvbnMudGFyZ2V0XSBDaGFuZ2VzIHRoZSB0YXJnZXRlZCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jYXB0dXJlXVxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMucGFzc2l2ZV1cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLm9uY2VdXHJcblx0ICovXHJcblx0YWRkTGlzdGVuZXIobGFiZWwsIGNhbGxiYWNrLCBvcHRpb25zKSB7XHJcblx0XHR2YXIgZWwgPSBvcHRpb25zICYmIG9wdGlvbnMudGFyZ2V0ID8gb3B0aW9ucy50YXJnZXQgOiB0aGlzLmVsZW1lbnQ7XHJcblx0XHR0aGlzLl8ubGlzdGVuZXJzLmhhcyhsYWJlbCkgfHwgdGhpcy5fLmxpc3RlbmVycy5zZXQobGFiZWwsIFtdKTtcclxuXHRcdHRoaXMuXy5saXN0ZW5lcnMuZ2V0KGxhYmVsKS5wdXNoKHtjYWxsYmFjaywgb3B0aW9uc30pO1xyXG5cclxuXHRcdGlmIChsYWJlbCA9PSBcImtleVwiICYmIG9wdGlvbnMua2V5KSB7XHJcblx0XHRcdE1vdXNldHJhcChlbCkuYmluZChvcHRpb25zLmtleSwgY2FsbGJhY2spO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChjdXN0b21FdmVudHMuaW5kZXhPZihsYWJlbCkgPT0gLTEpIHtcclxuXHRcdFx0ZWwuYWRkRXZlbnRMaXN0ZW5lcihsYWJlbCwgY2FsbGJhY2ssIG9wdGlvbnMpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmVtb3ZlTGlzdGVuZXIobGFiZWwsIGNhbGxiYWNrLCBvcHRpb25zKSB7XHJcblx0XHRsZXQgbGlzdGVuZXJzID0gdGhpcy5fLmxpc3RlbmVycy5nZXQobGFiZWwpLCBpbmRleDtcclxuXHJcblx0XHRpZiAobGlzdGVuZXJzICYmIGxpc3RlbmVycy5sZW5ndGgpIHtcclxuXHRcdFx0aW5kZXggPSBsaXN0ZW5lcnMucmVkdWNlKChpLCBsaXN0ZW5lciwgaW5kZXgpID0+IHtcclxuXHRcdFx0XHRpZiAoXHJcblx0XHRcdFx0XHRpc0Z1bmN0aW9uKGxpc3RlbmVyLmNhbGxiYWNrKSAmJiBsaXN0ZW5lci5jYWxsYmFjayA9PT0gY2FsbGJhY2sgJiZcclxuXHRcdFx0XHRcdChcclxuXHRcdFx0XHRcdFx0KFxyXG5cdFx0XHRcdFx0XHRcdGxpc3RlbmVyLm9wdGlvbnMgJiZcclxuXHRcdFx0XHRcdFx0XHRsaXN0ZW5lci5vcHRpb25zLmtleSA9PSBvcHRpb25zLmtleSAmJlxyXG5cdFx0XHRcdFx0XHRcdGxpc3RlbmVyLm9wdGlvbnMuYXR0cmlidXRlID09IG9wdGlvbnMuYXR0cmlidXRlICYmXHJcblx0XHRcdFx0XHRcdFx0bGlzdGVuZXIub3B0aW9ucy5jYXB0dXJlID09IG9wdGlvbnMuY2FwdHVyZVxyXG5cdFx0XHRcdFx0XHQpIHx8XHJcblx0XHRcdFx0XHRcdCFsaXN0ZW5lci5vcHRpb25zICYmICFvcHRpb25zXHJcblx0XHRcdFx0XHQpXHJcblx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gaSA9IGluZGV4O1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gaTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sIC0xKTtcclxuXHJcblx0XHRcdGlmIChpbmRleCA+IC0xKSB7XHJcblx0XHRcdFx0aWYgKGN1c3RvbUV2ZW50cy5pbmRleE9mKGxhYmVsKSA9PSAtMSkge1xyXG5cdFx0XHRcdFx0dmFyIGVsID0gb3B0aW9ucyAmJiBvcHRpb25zLnRhcmdldCA/IG9wdGlvbnMudGFyZ2V0IDogdGhpcy5lbGVtZW50O1xyXG5cclxuXHRcdFx0XHRcdGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIobGFiZWwsIGNhbGxiYWNrLCBvcHRpb25zKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XHJcblx0XHRcdFx0dGhpcy5fLmxpc3RlbmVycy5zZXQobGFiZWwsIGxpc3RlbmVycyk7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdGRpc3BhdGNoRXZlbnQoZXYpIHtcclxuXHRcdC8vIGxldCBsaXN0ZW5lcnMgPSB0aGlzLl8ubGlzdGVuZXJzLmdldChldi50eXBlKTtcclxuXHRcdHRoaXMuZWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2KTtcclxuXHRcdC8vIGlmIChsaXN0ZW5lcnMgJiYgbGlzdGVuZXJzLmxlbmd0aCkge1xyXG5cdFx0Ly8gXHRsaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIpID0+IHtcclxuXHRcdC8vIFx0XHRsaXN0ZW5lcihldik7XHJcblx0XHQvLyBcdH0pO1xyXG5cdFx0Ly8gXHRyZXR1cm4gdHJ1ZTtcclxuXHRcdC8vIH1cclxuXHRcdC8vIHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cclxuXHRhZGRLZXlMaXN0ZW5lcihrZXksIGNhbGxiYWNrKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5hZGRMaXN0ZW5lcihcImtleVwiLCBjYWxsYmFjaywge2tleX0pO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmFzZTsiLCJpbXBvcnQgbWl4IGZyb20gXCJAdmVzdGVyZ2FhcmQtY29tcGFueS9qcy1taXhpblwiO1xyXG5pbXBvcnQgQ29tbWFuZCBmcm9tIFwiLi9hYnN0cmFjdC9Db21tYW5kXCI7XHJcbmltcG9ydCBib29sZWFuIGZyb20gXCIuLy4uL3R5cGUvYm9vbGVhblwiO1xyXG5cclxuaW1wb3J0IEFyaWFQcmVzc2VkIGZyb20gXCIuLi9hdHRyaWJ1dGVzL2FyaWEtcHJlc3NlZC5qc1wiO1xyXG5pbXBvcnQgQXJpYUV4cGFuZGVkIGZyb20gXCIuLi9hdHRyaWJ1dGVzL2FyaWEtZXhwYW5kZWRcIjtcclxuXHJcbmZ1bmN0aW9uIGNsb3NlKCkge1xyXG5cdHRoaXMuZXhwYW5kZWQgPSBib29sZWFuLklTX05PVF9BQ1RJVkU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlZ2lzdGVyRXhwYW5kZWQoZXYpIHtcclxuXHRjb25zb2xlLmxvZyhldik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAc3VtbWFyeSBBbiBpbnB1dCB0aGF0IGFsbG93cyBmb3IgdXNlci10cmlnZ2VyZWQgYWN0aW9ucyB3aGVuIGNsaWNrZWQgb3IgcHJlc3NlZC5cclxuICogXHJcbiAqIEBleHRlbmRzIENvbW1hbmRcclxuICogQG1peGVzIEFyaWFFeHBhbmRlZFxyXG4gKiBAbWl4ZXMgQXJpYVByZXNzZWRcclxuICovXHJcbmNsYXNzIEJ1dHRvbiBleHRlbmRzIG1peChDb21tYW5kKS53aXRoKEFyaWFFeHBhbmRlZCwgQXJpYVByZXNzZWQpIHtcclxuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XHJcblx0XHRzdXBlciguLi5hcmdzKTtcclxuXHJcblx0XHR0aGlzLmFkZExpc3RlbmVyKFxyXG5cdFx0XHRcImF0dHJpYnV0ZXNcIixcclxuXHRcdFx0cmVnaXN0ZXJFeHBhbmRlZCxcclxuXHRcdFx0eyBhdHRyaWJ1dGU6IFwiYXJpYS1leHBhbmRlZFwiLCBvbmNlOiB0cnVlIH1cclxuXHRcdCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuZXhwYW5kZWQgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNvbnRyb2xzKSB7IC8vIHRvZG86IGFkZCB3aGVuIGZpcnN0IHRpbWUgYXJpYS1leHBhbmRlZCBpcyBib29sZWFuXHJcblx0XHRcdGNvbnNvbGUubG9nKHRoaXMuY29udHJvbHMubGVuZ3RoKTtcclxuXHRcdFx0dGhpcy5jb250cm9scy5mb3JFYWNoKGNvbnRyb2wgPT4ge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGNvbnRyb2wuYWRkTGlzdGVuZXIpO1xyXG5cdFx0XHRcdGlmIChjb250cm9sLmFkZExpc3RlbmVyKSBjb250cm9sLmFkZExpc3RlbmVyKFwiY2xvc2VcIiwgY2xvc2UuYmluZCh0aGlzKSlcclxuXHRcdFx0fVxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b25FeHBhbmRlZChldikge1xyXG5cdFx0aWYgKHR5cGVvZiBzdXBlci5vbkV4cGFuZGVkID09IFwiZnVuY3Rpb25cIikgc3VwZXIub25FeHBhbmRlZChldik7XHJcblxyXG5cdFx0aWYgKHRoaXMuZGlzYWJsZWQgIT09IHRydWUpIHtcclxuXHRcdFx0aWYgKHRoaXMuZXhwYW5kZWQpIHtcclxuXHRcdFx0XHR0aGlzLmNvbnRyb2xzLmZvckVhY2goY29udHJvbCA9PiB7XHJcblx0XHRcdFx0XHRjb250cm9sLmVsZW1lbnQuaGlkZGVuID0gZmFsc2U7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5jb250cm9scy5mb3JFYWNoKGNvbnRyb2wgPT4ge1xyXG5cdFx0XHRcdFx0Y29udHJvbC5lbGVtZW50LmhpZGRlbiA9IHRydWU7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHRcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uOyIsImltcG9ydCBtaXggZnJvbSBcIkB2ZXN0ZXJnYWFyZC1jb21wYW55L2pzLW1peGluXCI7XG5pbXBvcnQgSW5wdXQgZnJvbSBcIi4vYWJzdHJhY3QvSW5wdXRcIjtcblxuaW1wb3J0IEFyaWFDaGVja2VkIGZyb20gXCIuLi9hdHRyaWJ1dGVzL2FyaWEtY2hlY2tlZC5qc1wiO1xuXG4vKipcbiAqIEBzdW1tYXJ5IEEgY2hlY2thYmxlIGlucHV0IHRoYXQgaGFzIHRocmVlIHBvc3NpYmxlIHZhbHVlczogdHJ1ZSwgZmFsc2UsIG9yIG1peGVkLlxuICogQGRlc2NcbiAqICMjIyMgRXhhbXBsZVxuICpcbiAqIDxkaXYgcm9sZT1cImNoZWNrYm94XCIgYXJpYS1jaGVja2VkPVwidHJ1ZVwiIHRhYmluZGV4PVwiMFwiPjwvZGl2PlxuICpcbiAqIGBgYGh0bWxcbiAqIDxkaXYgcm9sZT1cImNoZWNrYm94XCIgYXJpYS1jaGVja2VkPVwidHJ1ZVwiIHRhYmluZGV4PVwiMFwiPjwvZGl2PlxuICogYGBgXG4gKiBAZXh0ZW5kcyBJbnB1dCBcbiAqIEBtaXhlcyBBcmlhQ2hlY2tlZFxuICovXG5jbGFzcyBDaGVja2JveCBleHRlbmRzIG1peChJbnB1dCkud2l0aChBcmlhQ2hlY2tlZCkge1xuXHQvKipcblx0ICogQHBhcmFtIHsqfSBhcmdzXG5cdCovXG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRzdXBlciguLi5hcmdzKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGVja2JveDtcbiIsImltcG9ydCBib29sZWFuIGZyb20gXCIuLy4uL3R5cGUvYm9vbGVhblwiO1xuaW1wb3J0IFNlbGVjdCBmcm9tIFwiLi9hYnN0cmFjdC9TZWxlY3RcIjtcbmltcG9ydCBzZWxlY3RvciBmcm9tIFwiLi8uLi91dGlscy9zZWxlY3RvclwiO1xuXG5mdW5jdGlvbiBmaWx0ZXIoY2IsIHZhbHVlKSB7XG5cdHZhciBzZWxlY3RlZE9wdGlvbnMgPSBbXTtcblxuXHRjYi5vd25zLmZvckVhY2gobGlzdGJveCA9PiB7XG5cdFx0QXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChsaXN0Ym94LmVsZW1lbnQuY2hpbGRyZW4sIG9wdGlvbiA9PiB7XG5cdFx0XHRpZih2YWx1ZSA9PT0gbnVsbCkge1xuXHRcdFx0XHRvcHRpb24uaGlkZGVuID0gdHJ1ZTtcblx0XHRcdH0gZWxzZSBpZiAob3B0aW9uLmlubmVySFRNTC5pbmRleE9mKHZhbHVlKSA9PSAwKSB7XG5cdFx0XHRcdG9wdGlvbi5oaWRkZW4gPSBmYWxzZTtcblx0XHRcdFx0aWYob3B0aW9uLmlubmVySFRNTCA9PT0gdmFsdWUpIHtcblx0XHRcdFx0XHRzZWxlY3RlZE9wdGlvbnMucHVzaChvcHRpb24pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRvcHRpb24uaGlkZGVuID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG5cblx0cmV0dXJuIHNlbGVjdGVkT3B0aW9ucztcbn1cblxuZnVuY3Rpb24gdG9nZ2xlTGlzdGJveChldikge1xuXHRpZihldikgZXYucHJldmVudERlZmF1bHQoKTtcblxuXHRpZiAodGhpcy5leHBhbmRlZCA9PSBib29sZWFuLklTX0FDVElWRSkge1xuXHRcdGhpZGVMaXN0Ym94LmNhbGwodGhpcyk7XG5cdH0gZWxzZSB7XG5cdFx0c2hvd0xpc3Rib3guY2FsbCh0aGlzKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVWYWx1ZShldikge1xuXHRpZihldikgZXYucHJldmVudERlZmF1bHQoKTtcblx0Y29uc29sZS5sb2codGhpcy5fLmNvbWJvYm94LmlucHV0LnZhbHVlLCBldi50YXJnZXQuaW5uZXJIVE1MLCB0aGlzLl8sIGV2KTtcblx0dGhpcy5fLmNvbWJvYm94LmlucHV0LnZhbHVlID0gZXYudGFyZ2V0LmlubmVySFRNTDtcblxuXHRoaWRlTGlzdGJveC5iaW5kKHRoaXMpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVMaXN0Ym94KCkgeyBcblx0dmFyIG9wdGlvbnMgPSBmaWx0ZXIodGhpcywgdGhpcy5fLmNvbWJvYm94LmlucHV0LnZhbHVlKTtcblxuXHRvcHRpb25zLmZvckVhY2goaSA9PiB7XG5cdFx0aS5zZWxlY3RlZCA9IHRydWU7XG5cdH0pO1xufVxuZnVuY3Rpb24gc2hvd0xpc3Rib3goKSB7XG5cdHRoaXMuZXhwYW5kZWQgPSBib29sZWFuLklTX0FDVElWRTtcblx0dXBkYXRlTGlzdGJveC5jYWxsKHRoaXMpO1xufVxuZnVuY3Rpb24gaGlkZUxpc3Rib3goKSB7XG5cdHRoaXMuZXhwYW5kZWQgPSBib29sZWFuLklTX05PVF9BQ1RJVkU7XG5cdGZpbHRlcih0aGlzKTtcbn1cblxuLyoqXG4gKiBAc3VtbWFyeSBBIGNvbXBvc2l0ZSB3aWRnZXQgY29udGFpbmluZyBhIHNpbmdsZS1saW5lIHRleHRib3ggYW5kIGFub3RoZXIgZWxlbWVudCwgXG4gKiBzdWNoIGFzIGEgbGlzdGJveCBvciBncmlkLCB0aGF0IGNhbiBkeW5hbWljYWxseSBwb3AgdXAgdG8gaGVscCB0aGUgdXNlciBzZXQgdGhlIHZhbHVlIG9mIHRoZSB0ZXh0Ym94LlxuICogQGRlc2NcbiAqIEEgY29tYm9ib3ggaXMgYSB3aWRnZXQgbWFkZSB1cCBvZiB0aGUgY29tYmluYXRpb24gb2YgdHdvIGRpc3RpbmN0IGVsZW1lbnRzOiBcbiAqIFxuICogMS4gYSBzaW5nbGUtbGluZSB0ZXh0Ym94XG4gKiAyLiBhbiBhc3NvY2lhdGVkIHBvcC11cCBlbGVtZW50IGZvciBoZWxwaW5nIHVzZXJzIHNldCB0aGUgdmFsdWUgb2YgdGhlIHRleHRib3guIFxuICogXG4gKiBUaGUgcG9wdXAgbWF5IGJlIGEgbGlzdGJveCwgZ3JpZCwgdHJlZSwgb3IgZGlhbG9nLiBNYW55IGltcGxlbWVudGF0aW9ucyBhbHNvIGluY2x1ZGUgYSB0aGlyZCBcbiAqIG9wdGlvbmFsIGVsZW1lbnQgLS0gYSBncmFwaGljYWwgYnV0dG9uIGFkamFjZW50IHRvIHRoZSB0ZXh0Ym94LCBpbmRpY2F0aW5nIHRoZSBhdmFpbGFiaWxpdHkgb2ZcbiAqIHRoZSBwb3B1cC4gQWN0aXZhdGluZyB0aGUgYnV0dG9uIGRpc3BsYXlzIHRoZSBwb3B1cCBpZiBzdWdnZXN0aW9ucyBhcmUgYXZhaWxhYmxlLlxuICogXG4gKiBAZXh0ZW5kcyBTZWxlY3RcbiAqIEBwYXJhbSB7RWxlbWVudH0gb3B0aW9ucy5jb21ib2JveC5pbnB1dCBcdERlZmF1bHRzIHRvIGZpcnN0IGlucHV0IGVsZW1lbnQgaW5zaWRlIHRoZSBlbGVtZW50XG4gKiBAcGFyYW0ge0VsZW1lbnR9IFtvcHRpb25zLmNvbWJvYm94Lm9wZW5dXHRcbiAqIFx0T3B0aW9uYWwgYnV0dG9uIHRvIG9wZW4gdGhlIHBvcC11cCBlbGVtZW50LCBcbiAqIFx0ZGVmYXVsdHMgdG8gZmlyc3QgYnV0dG9uIGVsZW1lbnQgaW5zaWRlIHRoZSBlbGVtZW50XG4gKi9cbmNsYXNzIENvbWJvYm94IGV4dGVuZHMgU2VsZWN0IHtcblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdHN1cGVyKC4uLmFyZ3MpO1xuXG5cdFx0Ly8gcmVnaXN0ZXIgY3VzdG9tIGVsZW1lbnRzXG5cdFx0dGhpcy5fLnJlZ2lzdGVyQ3VzdG9tRWxlbWVudChcImNvbWJvYm94LmlucHV0XCIsIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yLmdldERlZXAoXCJ0ZXh0Ym94XCIpKSk7XG5cdFx0dGhpcy5fLnJlZ2lzdGVyQ3VzdG9tRWxlbWVudChcImNvbWJvYm94Lm9wZW5cIiwgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IuZ2V0RGVlcChcImJ1dHRvblwiKSkpO1xuXHRcdFxuXHRcdGlmICh0aGlzLl8uY29tYm9ib3gub3Blbikge1xuXHRcdFx0dGhpcy5fLmNvbWJvYm94Lm9wZW4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZUxpc3Rib3guYmluZCh0aGlzKSk7XG5cdFx0fVxuXHRcdFxuXHRcdHRoaXMuXy5jb21ib2JveC5pbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgc2hvd0xpc3Rib3guYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5fLmNvbWJvYm94LmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIGhpZGVMaXN0Ym94LmJpbmQodGhpcykpO1xuXHRcdHRoaXMuXy5jb21ib2JveC5pbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgdXBkYXRlTGlzdGJveC5iaW5kKHRoaXMpKTtcblx0XHQvLyB0aGlzLm93bnMuZm9yRWFjaChpID0+IGkuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdXBkYXRlVmFsdWUuYmluZCh0aGlzKSkpO1xuXG5cdFx0aWYodGhpcy5hdXRvY29tcGxldGUgPT0gXCJsaXN0XCIpIHtcblx0XHRcdC8vIEluZGljYXRlcyB0aGF0IHRoZSBhdXRvY29tcGxldGUgYmVoYXZpb3Igb2YgdGhlIHRleHQgaW5wdXQgaXMgdG8gc3VnZ2VzdCBhIGxpc3Qgb2YgcG9zc2libGUgdmFsdWVzXG5cdFx0XHQvLyBpbiBhIHBvcHVwIGFuZCB0aGF0IHRoZSBzdWdnZXN0aW9ucyBhcmUgcmVsYXRlZCB0byB0aGUgc3RyaW5nIHRoYXQgaXMgcHJlc2VudCBpbiB0aGUgdGV4dGJveC5cblxuXHRcdH0gZWxzZSBpZiAodGhpcy5hdXRvY29tcGxldGUgPT0gXCJib3RoXCIpIHtcblx0XHRcdC8vIG5kaWNhdGVzIHRoYXQgdGhlIGF1dG9jb21wbGV0ZSBiZWhhdmlvciBvZiB0aGUgdGV4dCBpbnB1dCBpcyB0byBib3RoIHNob3cgYW4gaW5saW5lIFxuXHRcdFx0Ly8gY29tcGxldGlvbiBzdHJpbmcgYW5kIHN1Z2dlc3QgYSBsaXN0IG9mIHBvc3NpYmxlIHZhbHVlcyBpbiBhIHBvcHVwIHdoZXJlIHRoZSBzdWdnZXN0aW9ucyBcblx0XHRcdC8vIGFyZSByZWxhdGVkIHRvIHRoZSBzdHJpbmcgdGhhdCBpcyBwcmVzZW50IGluIHRoZSB0ZXh0Ym94LlxuXHRcdH1cblxuXHRcdC8qKiBAdG9kbyBkZXRlcm1pbmUgd2hhdCB0byBkbyB3aXRoIGRlZmF1bHQgdmFsdWVzICovXG5cdFx0aWYodGhpcy5leHBhbmRlZCA9PSB1bmRlZmluZWQpIHRoaXMuZXhwYW5kZWQgPSBmYWxzZTtcblx0XHRpZiAodGhpcy5oYXNQb3B1cCA9PSB1bmRlZmluZWQpIHRoaXMuaGFzUG9wdXAgPSBcImxpc3Rib3hcIjtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb21ib2JveDsiLCJpbXBvcnQgbWl4IGZyb20gXCJAdmVzdGVyZ2FhcmQtY29tcGFueS9qcy1taXhpblwiO1xyXG5pbXBvcnQgV2luZG93IGZyb20gXCIuL2Fic3RyYWN0L1dpbmRvd1wiO1xyXG5jb25zdCBNb3VzZXRyYXAgPSByZXF1aXJlKFwibW91c2V0cmFwXCIpO1xyXG5cclxuaW1wb3J0IEFyaWFFeHBhbmRlZCBmcm9tIFwiLi4vYXR0cmlidXRlcy9hcmlhLWV4cGFuZGVkLmpzXCI7XHJcblxyXG5mdW5jdGlvbiBmb2N1cyhub2RlKSB7XHJcblx0Ly8gZ2V0IGFsbCBlbGVtZW50cyB3aXRoaW4gZ2l2ZW4gZWxlbWVudFxyXG5cdGxldCBjaGlsZHJlbiA9IG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCIqXCIpO1xyXG5cdFxyXG5cdC8vIHJlbW92ZSBhbGwgZWxlbWVudHMgd2hvIGFyZW4ndCBhY2Nlc3NpYmxlIGJ5IGEgdGFiXHJcblx0bGV0IGZvY3VzYWJsZU5vZGVzID0gQXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKGNoaWxkcmVuLCBpID0+IHtcclxuXHRcdHJldHVybiAoaS50YWJJbmRleCA+IC0xIHx8IGkuY29udGVudEVkaXRhYmxlID09IFwidHJ1ZVwiKVxyXG5cdFx0XHQmJiAhaS5kaXNhYmxlZCAmJiBpLm9mZnNldFdpZHRoID4gMCAmJiBpLm9mZnNldEhlaWdodCA+IDA7XHJcblx0fSk7XHJcblx0XHJcblx0Ly8gc29ydCBlbGVtZW50cyBpbiBkZXNjZW5kaW5nIG9yZGVyXHJcblx0Zm9jdXNhYmxlTm9kZXMuc29ydCgoYSwgYikgPT4gYS50YWJJbmRleCArIGIudGFiSW5kZXgpO1xyXG5cclxuXHQvLyBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKTtcclxuXHQvLyBmb2N1c2FibGVFbC5mb2N1cygpO1xyXG5cdHJldHVybiBmb2N1c2FibGVOb2RlcztcclxufVxyXG5cclxuLyoqXHJcbiAqIEBzdW1tYXJ5IEEgY2hpbGQgd2luZG93IHdpdGhpbiBhIHdlYnBhZ2VcclxuICpcclxuICogQGRlc2NcclxuICogKiBQcm9tcHRzIHRoZSB1c2VyIHRvIHBlcmZvcm0gYSBzcGVjaWZpYyBhY3Rpb25cclxuICogKiBJZiBpdCBpcyBkZXNpZ25lZCB0byBpbnRlcnJ1cCwgaXQgaXMgdXN1YWxseSBhIG1vZGFsLiBTZWUgW2FsZXJ0ZGlhbG9nXSgpXHJcbiAqICogSXQgc2hvdWxkIGhhdmUgYSBsYWJlbCwgaXQgY2FuIGJlIGRvbmUgd2l0aCB0aGUgYGFyaWEtbGFiZWxgIGF0dHJpYnV0ZVxyXG4gKiAqIEl0IHNob3VsZCBoYXZlIGF0IGxlYXN0IG9uZSBmb2N1c2FibGUgZGVzY2VuZGFudCBlbGVtZW50LlxyXG4gKiAqIEl0IHNob3VsZCBmb2N1cyBhbiBlbGVtZW50IGluIHRoZSBtb2RhbCB3aGVuIGRpc3BsYXllZC5cclxuICogKiBJdCBzaG91bGQgbWFuYWdlIGZvY3VzIG9mIG1vZGFsIGRpYWxvZ3MgKGtlZXAgdGhlIGZvY3VzIGluc2lkZSB0aGUgb3BlbiBtb2RhbCkuXHJcbiAqXHJcbiAqICMjIyMjIGV4YW1wbGVcclxuICpcclxuICogPGRpdiByb2xlPVwiZGlhbG9nXCIgYXJpYS1sYWJlbD1cIldpbmRvdyB0byBjb25maXJtIHlvdXIgYWNjZXB0YW5jZSBvZiB0aGlzIHdvcmxkXCI+XHJcbiAqICBIZWxsbyB3b3JsZCFcclxuICogXHQ8YnV0dG9uIGZvY3VzIHR5cGU9XCJidXR0b25cIj5PazwvYnV0dG9uPlxyXG4gKiA8L2Rpdj5cclxuICogQGV4dGVuZHMgV2luZG93XHJcbiAqL1xyXG5jbGFzcyBEaWFsb2cgZXh0ZW5kcyBtaXgoV2luZG93KS53aXRoKEFyaWFFeHBhbmRlZCkge1xyXG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcclxuXHRcdHN1cGVyKC4uLmFyZ3MpO1xyXG5cclxuXHRcdC8vIHRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCB0aGlzLl9vbkZvY3VzLmJpbmQodGhpcyksIHRydWUpO1xyXG5cdFx0Ly8gdGhpcy5lbGVtZW50Lm93bmVyRG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgdGhpcy5fb25Gb2N1cy5iaW5kKHRoaXMpLCB0cnVlKTtcclxuXHRcdHRoaXMuYWRkTGlzdGVuZXIoXCJrZXlcIiwgdGhpcy5vbkNsb3NlLmJpbmQodGhpcyksIHsga2V5OiBcImVzY1wiLCB0YXJnZXQ6IHRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50fSk7XHJcblxyXG5cdFx0dmFyIG4gPSBmb2N1cyhkb2N1bWVudCk7XHJcblx0XHR2YXIgaSA9IDA7XHJcblx0XHQvLyB2YXIgdCA9IHNldEludGVydmFsKCgpID0+IHtcclxuXHRcdC8vIFx0Y29uc29sZS5sb2coTW91c2V0cmFwKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpLnRyaWdnZXIoXCJ0YWJcIikpO1xyXG5cdFx0Ly8gXHQvLyBsZXQgaSA9IG4uaW5kZXhPZihkb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcclxuXHRcdC8vIFx0aWYoaSA8IG4ubGVuZ3RoKSB7XHJcblx0XHQvLyBcdFx0dmFyIGYgPSBuZXcgRm9jdXNFdmVudChcImZvY3VzXCIpO1xyXG5cdFx0Ly8gXHRcdG5baSsrXS5kaXNwYXRjaEV2ZW50KGYpO1xyXG5cdFx0Ly8gXHRcdC8vIGNvbnNvbGUubG9nKG5baSsrXS5mb2N1cygpKTtcclxuXHRcdC8vIFx0fVxyXG5cdFx0Ly8gfSwgMTAwMCk7XHJcblx0fVxyXG5cclxuXHRfb25Gb2N1cyhldikge1xyXG5cdFx0Ly8gZXYucHJldmVudERlZmF1bHQoKTtcclxuXHRcdGxldCBuID0gZm9jdXModGhpcy5lbGVtZW50Lm93bmVyRG9jdW1lbnQpO1xyXG5cdFx0aWYobltuLmxlbmd0aC0xXSAhPSBldi50YXJnZXQpIHtcclxuXHRcdFx0ZXYucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0d2luZG93LmZvY3VzKCk7XHJcblx0XHR9XHJcblx0XHRjb25zb2xlLmxvZyhldik7XHJcblx0fVxyXG5cclxuXHRvbkNsb3NlKGV2KSB7XHJcblx0XHRpZihldikgZXYucHJldmVudERlZmF1bHQoKTtcclxuXHRcdHRoaXMuZWxlbWVudC5oaWRkZW4gPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJjbG9zZVwiKSk7XHJcblx0fVxyXG5cclxuXHRfb25IaWRkZW5NdXRhdGlvbihldikge1xyXG5cdFx0aWYodGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZShcImhpZGRlblwiKSA9PT0gXCJ0cnVlXCIpIHtcclxuXHRcdFx0dmFyIG4gPSBmb2N1cyh0aGlzLmVsZW1lbnQpO1xyXG5cdFx0XHRuWzBdLmZvY3VzKCk7XHJcblx0XHRcdGNvbnNvbGUubG9nKG4sIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQsIG4gPT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERpYWxvZzsiLCJpbXBvcnQgTGFuZG1hcmsgZnJvbSBcIi4vYWJzdHJhY3QvTGFuZG1hcmtcIjtcclxuaW1wb3J0IHNlbGVjdG9yIGZyb20gXCIuLy4uL3V0aWxzL3NlbGVjdG9yXCI7XHJcbmltcG9ydCBlbGVtZW50cyBmcm9tIFwiLi8uLi91dGlscy9lbGVtZW50c1wiO1xyXG5pbXBvcnQgY3JlYXRlIGZyb20gXCIuLy4uL3V0aWxzL2NyZWF0ZVwiO1xyXG5cclxuY2xhc3MgRm9ybSBleHRlbmRzIExhbmRtYXJrIHtcclxuXHRnZXQgZWxlbWVudHMoKSB7XHJcblx0XHQvLyBnZXQgbmF0aXZlIGVsZW1lbnRzXHJcblx0XHR2YXIgc2VsZWN0b3IgPSBbXCJidXR0b25cIiwgXCJmaWVsZHNldFwiLCBcImlucHV0XCIsIFwib2JqZWN0XCIsIFwib3V0cHV0XCIsIFwic2VsZWN0XCIsIFwidGV4dGFyZWFcIl0uam9pbihcIjpub3QoW3JvbGVdKSxcIik7XHJcblx0XHR2YXIgcmVzID0gQXJyYXkuZnJvbSh0aGlzLmVsZW1lbnRzLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcclxuXHJcblx0XHR2YXIgZXhwbGljaXRSb2xlID0gXCJcIjtcclxuXHRcdGV4cGxpY2l0Um9sZSArPSBzZWxlY3Rvci5nZXREZWVwUm9sZShcImJ1dHRvblwiKTtcclxuXHRcdGV4cGxpY2l0Um9sZSArPSBzZWxlY3Rvci5nZXREZWVwUm9sZShcImlucHV0XCIpO1xyXG5cdFx0ZXhwbGljaXRSb2xlICs9IHNlbGVjdG9yLmdldERlZXBSb2xlKFwic3RhdHVzXCIpO1xyXG5cdFx0ZXhwbGljaXRSb2xlICs9IHNlbGVjdG9yLmdldERlZXBSb2xlKFwic2VsZWN0XCIpO1xyXG5cclxuXHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoKFxyXG5cdFx0XHR0aGlzLmVsZW1lbnRzLnF1ZXJ5U2VsZWN0b3JBbGwoZXhwbGljaXRSb2xlKSwgXHJcblx0XHRcdG5vZGUgPT4gcmVzLnB1c2goZWxlbWVudHMuZ2V0KG5vZGUpIHx8IGNyZWF0ZS5vbmUobm9kZSkpXHJcblx0XHQpO1xyXG5cdFx0Y29uc29sZS5sb2cocmVzLCBleHBsaWNpdFJvbGUsIHNlbGVjdG9yKTtcclxuXHRcdHJldHVybiByZXM7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGb3JtOyIsImltcG9ydCBtaXggZnJvbSBcIkB2ZXN0ZXJnYWFyZC1jb21wYW55L2pzLW1peGluXCI7XHJcbmltcG9ydCBDb21tYW5kIGZyb20gXCIuL2Fic3RyYWN0L0NvbW1hbmQuanNcIjtcclxuaW1wb3J0IGJvb2xlYW4gZnJvbSBcIi4vLi4vdHlwZS9ib29sZWFuXCI7XHJcblxyXG5pbXBvcnQgQXJpYUV4cGFuZGVkIGZyb20gXCIuLi9hdHRyaWJ1dGVzL2FyaWEtZXhwYW5kZWRcIjtcclxuXHJcbmZ1bmN0aW9uIGNsb3NlKCkge1xyXG5cdHRoaXMuZXhwYW5kZWQgPSBib29sZWFuLklTX05PVF9BQ1RJVkU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBbiBpbnRlcmFjdGl2ZSByZWZlcmVuY2UgdG8gYW4gaW50ZXJuYWwgb3IgZXh0ZXJuYWwgcmVzb3VyY2UgdGhhdCxcclxuICogd2hlbiBhY3RpdmF0ZWQsIGNhdXNlcyB0aGUgdXNlciBhZ2VudCB0byBuYXZpZ2F0ZSB0byB0aGF0IHJlc291cmNlLlxyXG4gKiBcclxuICogQGV4dGVuZHMgQ29tbWFuZFxyXG4gKiBAbWl4ZXMgQXJpYUV4cGFuZGVkXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLmxpbmsuaHJlZiAgVVJMIHRoYXQgc2hvdWxkIGJlIHVzZWRcclxuICogQGxpc3RlbnMgY2xpY2tcclxuICogQGV4YW1wbGVcclxuICogPGRpdiByb2xlPVwibGlua1wiIGRhdGEtbGluay1ocmVmPVwiaHR0cDovL3d3dy5leGFtcGxlLmNvbS9cIiB0YWJpbmRleD1cIjBcIj5cclxuICogXHRPcGVuIHdlYnNpdGVcclxuICogPC9kaXY+XHJcbiAqL1xyXG5jbGFzcyBMaW5rIGV4dGVuZHMgbWl4KENvbW1hbmQpLndpdGgoQXJpYUV4cGFuZGVkKSB7XHJcblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xyXG5cdFx0c3VwZXIoLi4uYXJncyk7XHJcblxyXG5cdFx0dGhpcy5fLnJlZ2lzdGVyQ3VzdG9tVmFsdWUoXCJsaW5rLmhyZWZcIik7XHJcblxyXG5cdFx0aWYodGhpcy5fLmxpbmsuaHJlZikge1xyXG5cdFx0XHR0aGlzLmFkZExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vbkNsaWNrLmJpbmQodGhpcykpO1xyXG5cdFx0XHR0aGlzLmFkZExpc3RlbmVyKFwia2V5XCIsIHRoaXMub25DbGljay5iaW5kKHRoaXMpLCB7IGtleTogXCJlbnRlclwiIH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuYWRkTGlzdGVuZXIoXCJleHBhbmRlZFwiKVxyXG5cclxuXHRcdGlmICh0aGlzLmV4cGFuZGVkICE9PSB1bmRlZmluZWQpIHsgLy8gdG9kbzogYWRkIHdoZW4gZmlyc3QgdGltZSBhcmlhLWV4cGFuZGVkIGlzIGJvb2xlYW5cclxuXHRcdFx0dGhpcy5jb250cm9scy5mb3JFYWNoKGNvbnRyb2wgPT4gY29udHJvbC5hZGRMaXN0ZW5lcihcImNsb3NlXCIsIGNsb3NlLmJpbmQodGhpcykpKTtcclxuXHRcdFx0dGhpcy5hZGRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25FeHBhbmRlZC5iaW5kKHRoaXMpKTtcclxuXHRcdFx0dGhpcy5hZGRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm9uRXhwYW5kZWQuYmluZCh0aGlzKSwgeyBrZXk6IFwiZW50ZXJcIiB9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZpcmVkIHdoZW4gc3RhdGUgb2YgZXhwYW5kZWQgaXMgY2hhbmdlZCBcclxuXHQgKiBAcGFyYW0ge0V2ZW50fSBldiBcclxuXHQgKi9cclxuXHRvbkV4cGFuZGVkKGV2KSB7XHJcblx0XHRpZiAodHlwZW9mIHN1cGVyLm9uRXhwYW5kZWQgPT0gXCJmdW5jdGlvblwiKSBzdXBlci5vbkV4cGFuZGVkKGV2KTtcclxuXHJcblx0XHRpZiAodGhpcy5kaXNhYmxlZCAhPT0gdHJ1ZSkge1xyXG5cdFx0XHRpZiAodGhpcy5leHBhbmRlZCkge1xyXG5cdFx0XHRcdHRoaXMuY29udHJvbHMuZm9yRWFjaChjb250cm9sID0+IHtcclxuXHRcdFx0XHRcdGNvbnRyb2wuZWxlbWVudC5oaWRkZW4gPSBmYWxzZTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmNvbnRyb2xzLmZvckVhY2goY29udHJvbCA9PiB7XHJcblx0XHRcdFx0XHRjb250cm9sLmVsZW1lbnQuaGlkZGVuID0gdHJ1ZTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogT3BlbiB0aGUgdXJsIHRoYXQgaXMgZGVmaW5lZCBpbiB0aGUgb3B0aW9ucywgIFxyXG5cdCAqIGZpcmVzIGFuIGNsaWNrIGV2ZW50IG9ubHkgaWYgaXRzIG9yaWdpbiB3YXNuJ3QgYW4gY2xpY2sgZXZlbnRcclxuXHQgKiBAcGFyYW0ge0V2ZW50fSBldiBcclxuXHQgKiBAZmlyZXMgbGluayNhY2Nlc3NpYmxlY2xpY2tcclxuXHQgKiBAZmlyZXMgY2xpY2tcclxuXHQgKi9cclxuXHRvbkNsaWNrKGV2KSB7XHJcblx0XHRpZiAodHlwZW9mIHN1cGVyLm9uQ2xpY2sgPT0gXCJmdW5jdGlvblwiKSBzdXBlci5vbkNsaWNrKGV2KTtcclxuXHRcclxuXHRcdGlmKHRoaXMuXy5saW5rLmhyZWYpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJzaG91bGQgb3BlblwiLCB0aGlzLl8ubGluay5ocmVmKTtcclxuXHRcdFx0Ly8gd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLl8ubGluay5ocmVmO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG4gICAgICogQW4gY2xpY2sgdHJpZ2dlcmVkIGJ5IGFuIGtleWJvYXJkIG9yIG1vdXNlXHJcbiAgICAgKiBAZXZlbnQgTGluayNhY2Nlc3NpYmxlY2xpY2tcclxuICAgICAqL1xyXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImFjY2Vzc2libGVjbGlja1wiKSk7XHJcblx0XHRpZihldi50eXBlICE9PSBcImNsaWNrXCIpIHtcclxuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBNb3VzZUV2ZW50KFwiY2xpY2tcIikpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGluazsiLCJpbXBvcnQgZm9jdXMgZnJvbSBcIi4vLi4vdXRpbHMvbWFuYWdpbmdGb2N1c1wiO1xyXG5pbXBvcnQgU2VsZWN0IGZyb20gXCIuL2Fic3RyYWN0L1NlbGVjdFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IG9wdGlvbnMgPSB7XHJcblx0cm9sZTogXCJsaXN0Ym94XCIsXHJcblx0c2VsZWN0b3I6IFwiW3JvbGU9J2xpc3Rib3gnXVwiLFxyXG5cdHNlbGVjdG9yc1dpdGhJbXBsaWNpdFJvbGU6IFtcclxuXHRcdFwiZGF0YWxpc3RcIixcclxuXHRcdFwic2VsZWN0W211bHRpcGxlXSwgc2VsZWN0W3NpemVdOm5vdChbc2l6ZT0nMCddKTpub3QoW3NpemU9JzEnXSlcIlxyXG5cdF1cclxufTtcclxuXHJcbi8vIGZ1bmN0aW9uIGNsaWNrT25PcHRpb24oZXYpIHtcclxuLy8gXHRpZihldikgZXYucHJldmVudERlZmF1bHQoKTtcclxuXHJcbi8vIFx0dmFyIGNsaWNrZWQgPSB0aGlzLm9wdGlvbnMuZmluZChpID0+IGkuZWxlbWVudCA9PSBldi50YXJnZXQpO1xyXG4vLyBcdGlmIChjbGlja2VkKSB7XHJcbi8vIFx0XHRsZXQgb2xkID0gZm9jdXMuZ2V0KHRoaXMub3B0aW9ucyk7XHJcbi8vIFx0XHRmb2N1cy5yZW1vdmUob2xkKTtcclxuLy8gXHRcdGZvY3VzLmFkZChjbGlja2VkKTtcdFxyXG4vLyBcdFx0dXBkYXRlU2VsZWN0ZWQodGhpcywgY2xpY2tlZCk7XHJcbi8vIFx0fVxyXG4vLyB9XHJcblxyXG4vKipcclxuICogQHN1bW1hcnkgQSB3aWRnZXQgdGhhdCBhbGxvd3MgdGhlIHVzZXIgdG8gc2VsZWN0IG9uZSBvciBtb3JlIGl0ZW1zIGZyb20gYSBsaXN0IG9mIGNob2ljZXMuXHJcbiAqIEBkZXNjXHJcbiAqICMjIyBLZXlib2FyZCBTdXBwb3J0XHJcbiAqXHJcbiAqICMjIyMgRGVmYXVsdFxyXG4gKiB8IEtleSB8IEZ1bmN0aW9uIHxcclxuICogfCAtLS0gfCAtLS0tLS0tLSB8XHJcbiAqIHwgRG93biBBcnJvdyB8IE1vdmVzIGZvY3VzIHRvIHRoZSBuZXh0IG9wdGlvbiA8YnIvPiBJZiBub3QgbXVsdGlzZWxlY3RhYmxlLCBpdCBzZWxlY3RzIHRoZSBmb2N1c2VkIG9wdGlvbi5cclxuICogfCBVcCBBcnJvdyBcdHwgTW92ZXMgZm9jdXMgdG8gdGhlIHByZXZpb3VzIG9wdGlvbiAgPGJyLz4gSWYgbm90IG11bHRpc2VsZWN0YWJsZSwgaXQgc2VsZWN0cyB0aGUgZm9jdXNlZCBvcHRpb24uXHJcbiAqIHwgSG9tZSBcdFx0XHR8XHRNb3ZlcyBmb2N1cyB0byB0aGUgZmlyc3Qgb3B0aW9uICA8YnIvPiBJZiBub3QgbXVsdGlzZWxlY3RhYmxlLCBpdCBzZWxlY3RzIHRoZSBmb2N1c2VkIG9wdGlvbi5cclxuICogfCBFbmQgIFx0XHRcdHxcdE1vdmVzIGZvY3VzIHRvIHRoZSBsYXN0IG9wdGlvbiAgPGJyLz4gSWYgbm90IG11bHRpc2VsZWN0YWJsZSwgaXQgc2VsZWN0cyB0aGUgZm9jdXNlZCBvcHRpb24uXHJcbiAqIFxyXG4gKiAjIyMjIE11bHRpcGxlIHNlbGVjdGlvblxyXG4gKiB8IEtleSB8IEZ1bmN0aW9uIHxcclxuICogfCAtLS0gfCAtLS0tLS0tLSB8XHJcbiAqIHwgU3BhY2VcdFx0XHRcdFx0XHRcdFx0XHR8IENoYW5nZXMgdGhlIHNlbGVjdGlvbiBzdGF0ZSBvZiB0aGUgZm9jdXNlZCBvcHRpb24uXHJcbiAqIHwgU2hpZnQgKyBEb3duIEFycm93IFx0XHR8IE1vdmVzIGZvY3VzIHRvIGFuZCBzZWxlY3RzIHRoZSBuZXh0IG9wdGlvbi5cclxuICogfCBTaGlmdCArIFVwIEFycm93IFx0XHRcdHwgTW92ZXMgZm9jdXMgdG8gYW5kIHNlbGVjdHMgdGhlIHByZXZpb3VzIG9wdGlvbi5cclxuICogfCBDb250cm9sICsgU2hpZnQgKyBIb21lIHxcdFNlbGVjdHMgZnJvbSB0aGUgZm9jdXNlZCBvcHRpb24gdG8gdGhlIGJlZ2lubmluZyBvZiB0aGUgbGlzdC5cclxuICogfCBDb250cm9sICsgU2hpZnQgKyBFbmQgIHwgU2VsZWN0cyBmcm9tIHRoZSBmb2N1c2VkIG9wdGlvbiB0byB0aGUgZW5kIG9mIHRoZSBsaXN0LlxyXG4gKiB8IENvbnRyb2wgKyBBIFx0ICAgICAgICAgIHwgU2VsZWN0cyBhbGwgb3B0aW9ucyBpbiB0aGUgbGlzdC4gSWYgYWxsIG9wdGlvbnMgYXJlIHNlbGVjdGVkLCB1bnNlbGVjdHMgYWxsIG9wdGlvbnMuXHJcbiAqIFxyXG4gKiBAZXh0ZW5kcyBSb2xldHlwZVxyXG4gKiBAZmlyZXMgTGlzdGJveCNjaGFuZ2VcclxuICogQGZpcmVzIExpc3Rib3gjaW5wdXRcclxuICovXHJcbmNsYXNzIExpc3Rib3ggZXh0ZW5kcyBTZWxlY3Qge1xyXG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcclxuXHRcdHN1cGVyKC4uLmFyZ3MpO1xyXG5cdFx0Ly8gdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGlja09uT3B0aW9uLmJpbmQodGhpcykpO1xyXG5cclxuXHRcdC8vIHRoaXMuYWRkS2V5TGlzdGVuZXIoXCJlbnRlclwiLCBjbGlja09uT3B0aW9uLmJpbmQodGhpcykpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGlzdGJveDsiLCJpbXBvcnQgYm9vbGVhbiBmcm9tIFwiLi8uLi90eXBlL2Jvb2xlYW5cIjtcclxuaW1wb3J0IGdldEFjdGl2ZSBmcm9tIFwiLi8uLi91dGlscy9nZXRBY3RpdmVcIjtcclxuaW1wb3J0IElucHV0IGZyb20gXCIuL2Fic3RyYWN0L0lucHV0XCI7XHJcblxyXG4vKipcclxuICogQGV4dGVuZHMgSW5wdXRcclxuICovXHJcbmNsYXNzIE9wdGlvbiBleHRlbmRzIElucHV0IHtcclxuXHJcblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xyXG5cdFx0c3VwZXIoLi4uYXJncyk7XHJcblxyXG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25DbGljay5iaW5kKHRoaXMpKTtcclxuXHRcdHRoaXMuYWRkTGlzdGVuZXIoXCJrZXlcIiwgdGhpcy5vbkNsaWNrLmJpbmQodGhpcyksIHtrZXk6IFwiZW50ZXJcIiwgdGFyZ2V0OiBkb2N1bWVudH0pO1xyXG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKSwge2tleTogXCJzcGFjZVwiLCB0YXJnZXQ6IGRvY3VtZW50fSk7XHJcblx0XHQvLyB0aGlzLmFkZEtleUxpc3RlbmVyKFwiRW50ZXJcIiwgc2VsZWN0SXRlbS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdG9uQ2xpY2soZXYpIHtcclxuXHRcdGlmKHR5cGVvZiBzdXBlci5vbkNsaWNrID09IFwiZnVuY3Rpb25cIikgc3VwZXIub25DbGljayhldik7XHJcblx0XHRpZihldikgZXYucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRpZiAodGhpcyA9PSBnZXRBY3RpdmUoKSkge1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkID0gYm9vbGVhbi50b2dnbGUodGhpcy5zZWxlY3RlZCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBPcHRpb247IiwiLy8gdmFyIG9iamVjdFBhdGggPSByZXF1aXJlKFwib2JqZWN0LXBhdGhcIik7XG5pbXBvcnQgUmFuZ2UgZnJvbSBcIi4vYWJzdHJhY3QvUmFuZ2UuanNcIjtcblxuZnVuY3Rpb24gY2FsY1ZhbHVlT2ZUcmFja1Bvcyhwb3MsIHRyYWNrLCB0aHVtYiwgbWluLCBtYXgsIHN0ZXAsIG9yaWVudGF0aW9uKSB7XG5cdGxldCBwb3NpdGlvbktleSA9IG9yaWVudGF0aW9uID09IFwidmVydGljYWxcIiA/IFwieVwiIDogXCJ4XCI7XG5cdGxldCByYW5nZSA9IChtYXggLSBtaW4pIC8gc3RlcDtcblx0Ly8gdGhlIGZ1bGwgdXNhYmxlIGxlbmd0aCBvZiB0aGUgdHJhY2tcblx0bGV0IHRyYWNrU2l6ZSA9IGdldFRyYWNrU2l6ZSh0cmFjaywgdGh1bWIsIG9yaWVudGF0aW9uKTtcblx0Ly8gaG93IG1hbnkgcGl4ZWxzICBzcGFuIGZvciBvbmUgc3RlcCBjaGFuZ2Vcblx0bGV0IHB4UGVyU3RlcCA9IHRyYWNrU2l6ZSAvIHJhbmdlO1xuXG5cdC8vIGJvdW5kaW5nIGJveCBvZiB0aGUgdHJhY2tcblx0dmFyIHRyYWNrQ29vciA9IHRyYWNrLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHQvLyBvZmZzZXQgd2l0aG91dCB0cmFjayBsaW1pdHNcblx0bGV0IG9mZnNldCA9IHBvcyAtIHRyYWNrQ29vcltwb3NpdGlvbktleV0gLSB0aHVtYi5jbGllbnRXaWR0aCAvIDI7XG5cblx0Ly8gdXBkYXRlIG9mZnNldCB0byB0aGUgdHJhY2sgbGltaXRzIGlmIG5lZWRlZFxuXHRpZihvZmZzZXQgPCAwKSB7XG5cdFx0b2Zmc2V0ID0gMDtcblx0fSBlbHNlIGlmKG9mZnNldCA+IHRyYWNrU2l6ZSl7XG5cdFx0b2Zmc2V0ID0gdHJhY2tTaXplO1xuXHR9XG5cblx0Ly8gcm91bmQgdGhlIHZhbHVlIHRvIG5lYXJlc3QgaW5jcmVtZW50XG5cdHJldHVybiBNYXRoLnJvdW5kKG9mZnNldCAvIHB4UGVyU3RlcCkgKiBzdGVwICsgbWluO1xufVxuXG5mdW5jdGlvbiBnZXRUcmFja1NpemUodHJhY2ssIHRodW1iLCBvcmllbnRhdGlvbikge1xuXHRpZihvcmllbnRhdGlvbiA9PSBcInZlcnRpY2FsXCIpIHtcblx0XHRyZXR1cm4gdHJhY2suY2xpZW50SGVpZ2h0IC0gdGh1bWIuY2xpZW50SGVpZ2h0O1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiB0cmFjay5jbGllbnRXaWR0aCAtIHRodW1iLmNsaWVudFdpZHRoO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVBvc2l0aW9uKHZhbHVlLCB0cmFjaywgdGh1bWIsIG1pbiwgbWF4LCBvcmllbnRhdGlvbikge1xuXHRsZXQgc3R5bGVLZXkgPSBvcmllbnRhdGlvbiA9PSBcInZlcnRpY2FsXCIgPyBcInRvcFwiIDogXCJsZWZ0XCI7XG5cdGxldCByYW5nZSA9IG1heCAtIG1pbjtcblx0bGV0IHB4UGVyU3RlcCA9IGdldFRyYWNrU2l6ZSh0cmFjaywgdGh1bWIsIG9yaWVudGF0aW9uKSAvIHJhbmdlO1xuXHR0aHVtYi5zdHlsZVtzdHlsZUtleV0gPSBweFBlclN0ZXAgKiAodmFsdWUgLSBtaW4pICsgXCJweFwiO1xufVxuXG4vKipcbiAqIEBzdW1tYXJ5IEEgdXNlciBpbnB1dCB3aGVyZSB0aGUgdXNlciBzZWxlY3RzIGEgdmFsdWUgZnJvbSB3aXRoaW4gYSBnaXZlbiByYW5nZS5cbiAqIEBkZXNjXG4gKiBgc2xpZGVyYCBlbGVtZW50cyBsZXQgdGhlIHVzZXIgc3BlY2lmeSBhIG51bWVyaWMgdmFsdWUgd2hpY2ggbXVzdCBiZSBubyBsZXNzXG4gKiB0aGFuIGEgZ2l2ZW4gdmFsdWUsIGFuZCBubyBtb3JlIHRoYW4gYW5vdGhlciBnaXZlbiB2YWx1ZS4gVGhlIHByZWNpc2UgdmFsdWUsXG4gKiBob3dldmVyLCBpcyBub3QgY29uc2lkZXJlZCBpbXBvcnRhbnQuIFRoaXMgaXMgdHlwaWNhbGx5IHJlcHJlc2VudGVkIHVzaW5nIGFcbiAqIHNsaWRlciBvciBkaWFsIGNvbnRyb2wgcmF0aGVyIHRoYW4gYSB0ZXh0IGVudHJ5IGJveCBsaWtlIHRoZSBcIm51bWJlclwiIGlucHV0XG4gKiB0eXBlLiBCZWNhdXNlIHRoaXMga2luZCBvZiB3aWRnZXQgaXMgaW1wcmVjaXNlLCBpdCBzaG91bGRuJ3QgdHlwaWNhbGx5IGJlXG4gKiB1c2VkIHVubGVzcyB0aGUgY29udHJvbCdzIGV4YWN0IHZhbHVlIGlzbid0IGltcG9ydGFudC5cbiAqXG4gKiBAZXh0ZW5kcyBSYW5nZVxuICpcbiAqIEBmaXJlcyBjaGFuZ2VcbiAqIEBmaXJlcyBpbnB1dFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgXHRcdFx0XHRlbGVtZW50IHRvIGRlcml2ZSBpbmZvcm1hdGlvbiBuYW1lRnJvbVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBcdFx0XHRcdFx0XHRvcHRpb25hbCBvcHRpb25zXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBbb3B0aW9ucy5zbGlkZXIudHJhY2tdXG4gKiBcdFRoZSBlbGVtZW50IHRoYXQgcmVzZW1ibGVzIHRoZSB0cmFjaywgZGVmYXVsdHMgdG8gdGhlIGVsZW1lbnRzIHBhcmVudFxuICogQHBhcmFtIHtOdW1iZXJ8XCJhbnlcIn0gW29wdGlvbnMuc3RlcF0gXHRpbmNyZWFzZS9kZWNyZWFzZSBhbW91bnRcbiAqIEByZXR1cm4ge1NsaWRlcn0gdGhpc0FyZ1xuICpcbiAqIEB0b2RvIGFkZCBzdXBwb3J0IGZvciBcImFueVwiXG4gKiBAdG9kbyBhZGQgZXZlbnRzXG4gKi9cbmNsYXNzIFNsaWRlciBleHRlbmRzIFJhbmdlIHtcblx0LyoqXG5cdCAqICMjIyMgRXhhbXBsZXNcblx0ICogXG5cdCAqIDxkaXYgY2xhc3M9XCJ0cmFja1wiPlxuXHQgKiAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHJvbGU9XCJzbGlkZXJcIiBhcmlhLWxhYmVsPVwic2xpZGVyXCIgLz48YnV0dG9uPlxuXHQgKiA8L2Rpdj5cblx0ICogQHBhcmFtIHsqfSBhcmdzIFxuXHQgKi9cblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdHN1cGVyKC4uLmFyZ3MpO1xuXG5cdFx0Ly8gcmVnaXN0ZXIgY3VzdG9tc1xuXHRcdHRoaXMuXy5yZWdpc3RlckN1c3RvbUVsZW1lbnQoXCJzbGlkZXIudHJhY2tcIiwgdGhpcy5lbGVtZW50LnBhcmVudE5vZGUpO1xuXHRcdHRoaXMuXy5yZWdpc3RlckN1c3RvbVZhbHVlKFwic3RlcFwiLCAxKTtcblxuXHRcdC8vIHNldCBkZWZhdWx0c1xuXHRcdGlmKG51bGwgPT09IHRoaXMub3JpZW50YXRpb24pIHRoaXMub3JpZW50YXRpb24gPSBcImhvcml6b250YWxcIjtcblx0XHRpZihudWxsID09PSB0aGlzLnZhbHVlTWluKSB7XG5cdFx0XHQvKipcblx0XHRcdCAqIEBkZWZhdWx0IFswXVxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnZhbHVlTWluID0gMDtcblx0XHR9XG5cdFx0aWYobnVsbCA9PT0gdGhpcy52YWx1ZU1heCkgdGhpcy52YWx1ZU1heCA9IDA7XG5cdFx0aWYobnVsbCA9PT0gdGhpcy52YWx1ZU5vdyAmJiB0aGlzLnZhbHVlTWF4IDwgdGhpcy52YWx1ZU1pbikge1xuXHRcdFx0dGhpcy52YWx1ZU5vdyA9IHRoaXMudmFsdWVNaW47XG5cdFx0fSBlbHNlIGlmKG51bGwgPT09IHRoaXMudmFsdWVOb3cpIHtcblx0XHRcdHRoaXMudmFsdWVOb3cgPSB0aGlzLnZhbHVlTWluICsgKHRoaXMudmFsdWVNYXggLSB0aGlzLnZhbHVlTWluKS8yO1xuXHRcdH1cblxuXHRcdHRoaXMuX3VuVHJhY2tNb3VzZUJpbmRlZCA9IHRoaXMuX3VuVHJhY2tNb3VzZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuX3VuVHJhY2tUb3VjaEJpbmRlZCA9IHRoaXMuX3VuVHJhY2tUb3VjaC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuX29uRHJhZyA9IHRoaXMub25EcmFnLmJpbmQodGhpcyk7XG5cblx0XHQvLyB0b2RvOiBhbGxvdyBhdXRvbWF0aWNhbGx5IHNldHRpbmcgdmFsdWVUZXh0IHdpdGggc29tZSBzdWdhclxuXG5cdFx0dGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5fb25Nb3VzZURvd24uYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMuX29uVG91Y2hTdGFydC5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLl8uc2xpZGVyLnRyYWNrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uVHJhY2tDbGljay5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLmFkZEtleUxpc3RlbmVyKFwicmlnaHRcIiwgdGhpcy5zdGVwVXAuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5hZGRLZXlMaXN0ZW5lcihcInVwXCIsIHRoaXMuc3RlcFVwLmJpbmQodGhpcykpO1xuXHRcdHRoaXMuYWRkS2V5TGlzdGVuZXIoXCJsZWZ0XCIsIHRoaXMuc3RlcERvd24uYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5hZGRLZXlMaXN0ZW5lcihcImRvd25cIiwgdGhpcy5zdGVwRG93bi5iaW5kKHRoaXMpKTtcblxuXHRcdHVwZGF0ZVBvc2l0aW9uKHRoaXMudmFsdWVOb3csIHRoaXMuXy5zbGlkZXIudHJhY2ssIHRoaXMuZWxlbWVudCwgdGhpcy52YWx1ZU1pbiwgdGhpcy52YWx1ZU1heCwgdGhpcy5vcmllbnRhdGlvbik7XG5cdH1cblxuXHRfb25Nb3VzZURvd24oKSB7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLl9vbkRyYWcpO1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX3VuVHJhY2tNb3VzZUJpbmRlZCk7XG5cdH1cblx0X29uVG91Y2hTdGFydCgpIHtcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIHRoaXMuX29uRHJhZyk7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHRoaXMuX3VuVHJhY2tUb3VjaEJpbmRlZCk7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoY2FuY2VsXCIsIHRoaXMuX3VuVHJhY2tUb3VjaEJpbmRlZCk7XG5cdH1cblx0X3VuVHJhY2tNb3VzZSgpIHtcblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMuX29uRHJhZyk7XG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5fdW5UcmFja01vdXNlQmluZGVkKTtcblx0fVxuXHRfdW5UcmFja1RvdWNoKCkge1xuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgdGhpcy5fb25EcmFnKTtcblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgdGhpcy5fdW5UcmFja01vdXNlKTtcblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hjYW5jZWxcIiwgdGhpcy5fdW5UcmFja01vdXNlQmluZGVkKTtcblx0fVxuXG5cdG9uRHJhZyhldikge1xuXHRcdGV2LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0bGV0IHBvcztcblx0XHRsZXQgcG9zaXRpb25LZXkgPSB0aGlzLm9yaWVudGF0aW9uID09IFwidmVydGljYWxcIiA/IFwiY2xpZW50WVwiIDogXCJjbGllbnRYXCI7XG5cdFx0aWYoZXYuY2hhbmdlZFRvdWNoZXMpIHtcblx0XHRcdHBvcyA9IGV2LmNoYW5nZWRUb3VjaGVzWzBdW3Bvc2l0aW9uS2V5XTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cG9zID0gZXZbcG9zaXRpb25LZXldO1xuXHRcdH1cblx0XHR0aGlzLnZhbHVlTm93ID0gY2FsY1ZhbHVlT2ZUcmFja1Bvcyhcblx0XHRcdHBvcywgdGhpcy5fLnNsaWRlci50cmFjaywgdGhpcy5lbGVtZW50LFxuXHRcdFx0dGhpcy52YWx1ZU1pbiwgdGhpcy52YWx1ZU1heCwgdGhpcy5fLnN0ZXAsIHRoaXMub3JpZW50YXRpb25cblx0XHQpO1xuXHR9XG5cblx0b25UcmFja0NsaWNrKGV2KSB7XG5cdFx0dGhpcy5vbkRyYWcoZXYpO1xuXHR9XG5cblx0Z2V0IHZhbHVlTm93KCkgeyByZXR1cm4gc3VwZXIudmFsdWVOb3c7IH1cblx0c2V0IHZhbHVlTm93KHZhbCkge1xuXHRcdGlmKCF0aGlzLmRpc2FibGVkKSB7XG5cdFx0XHRzdXBlci52YWx1ZU5vdyA9IHZhbDtcblx0XHRcdHVwZGF0ZVBvc2l0aW9uKHZhbCwgdGhpcy5fLnNsaWRlci50cmFjaywgdGhpcy5lbGVtZW50LCB0aGlzLnZhbHVlTWluLCB0aGlzLnZhbHVlTWF4LCB0aGlzLm9yaWVudGF0aW9uKTtcblx0XHR9XG5cdH1cblxuXHQvKiBOYXRpdmUgcG9seWZpbGwgKi9cblxuXHQvLyBhdXRvbWF0aWMgcG9seWZpbGxlZCBieSBhdHRyaWJ1dGVzXG5cdC8vIGF1dG9jb21wbGV0ZVxuXHQvLyBsaXN0XG5cdC8vIG1pblxuXHQvLyBtYXhcblx0Ly8gc3RlcCA9PiBkYXRhLXN0ZXBcblx0Ly8gdmFsdWVcblx0Ly8gdmFsdWVBc051bWJlclxuXHQvLyBzdGVwRG93blxuXHQvLyBzdGVwVXBcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2xpZGVyOyIsImltcG9ydCBtaXggZnJvbSBcIkB2ZXN0ZXJnYWFyZC1jb21wYW55L2pzLW1peGluXCI7XHJcbmltcG9ydCBSYW5nZSBmcm9tIFwiLi9hYnN0cmFjdC9SYW5nZVwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IG9wdGlvbnMgPSB7XHJcblx0c2VsZWN0b3I6IFwiW3JvbGU9J3NwaW5idXR0b24nXVwiLFxyXG5cdHJvbGU6IFwic3BpbmJ1dHRvblwiXHJcbn07XHJcblxyXG4vKipcclxuICogQSBpbnB1dCBmaWVsZCB3aXRoIDIgYnV0dG9uIHRvIGluY3JlYXNlIG9yIGRlY3JlYXNlIHRoZSBudW1iZXJpY2FsIHZhbHVlXHJcbiAqIEBleHRlbmRzIFJhbmdlXHJcbiAqXHJcbiAqIEBzZWUge0BsaW5rIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2lucHV0Lmh0bWwjbnVtYmVyLXN0YXRlLSh0eXBlPW51bWJlcil9XHJcbiAqL1xyXG5jbGFzcyBTcGluYnV0dG9uIGV4dGVuZHMgUmFuZ2Uge1xyXG5cdGNvbnN0cnVjdG9yKGVsLCBvcHRpb25zKSB7XHJcblx0XHRzdXBlcihlbCwgb3B0aW9ucyk7XHJcblxyXG5cdFx0Ly8gcmVnaXN0ZXIgY3VzdG9tIGVsZW1lbnRzXHJcblx0XHQvKipcclxuXHRcdCogQG5hbWUgU3BpbmJ1dHRvbiNfXHJcblx0XHQqIEB0eXBlIHtPYmplY3R9XHJcblx0XHQqIEBwcm9wIHtIVE1MRWxlbWVudH0gW3NwaW5idXR0b24udXBdXHJcblx0XHQqIEBwcm9wIHtIVE1MRWxlbWVudH0gW3NwaW5idXR0b24uZG93bl1cclxuXHRcdCovXHJcblx0XHR0aGlzLl8ucmVnaXN0ZXJDdXN0b21FbGVtZW50KFwic3BpbmJ1dHRvbi51cFwiKTtcclxuXHRcdHRoaXMuXy5yZWdpc3RlckN1c3RvbUVsZW1lbnQoXCJzcGluYnV0dG9uLmRvd25cIik7XHJcblx0XHR0aGlzLl8ucmVnaXN0ZXJDdXN0b21WYWx1ZShcInN0ZXBcIiwgMSk7XHJcblxyXG5cdFx0Ly8gc2V0IGRlZmF1bHRzXHJcblx0XHQvKipcclxuXHRcdCogQG5hbWUgU3BpbmJ1dHRvbiN2YWx1ZU5vd1xyXG5cdFx0KiBAdHlwZSB7TnVtYmVyfVxyXG5cdFx0KiBAZGVmYXVsdCBbMF1cclxuXHRcdCovXHJcblx0XHRpZihudWxsID09PSB0aGlzLnZhbHVlTm93KSB0aGlzLnZhbHVlTm93ID0gMDtcclxuXHJcblx0XHQvLyB0b2RvOiBhbGxvdyBhdXRvbWF0aWNhbGx5IHNldHRpbmcgdmFsdWVUZXh0IHdpdGggc29tZSBzdWdhclxyXG5cclxuXHRcdGlmICh0aGlzLl8uc3BpbmJ1dHRvbi5kb3duKSB0aGlzLl8uc3BpbmJ1dHRvbi51cC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5zdGVwVXAuYmluZCh0aGlzKSk7XHJcblx0XHRpZiAodGhpcy5fLnNwaW5idXR0b24uZG93bikgdGhpcy5fLnNwaW5idXR0b24uZG93bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5zdGVwRG93bi5iaW5kKHRoaXMpKTtcclxuXHRcdHRoaXMuYWRkS2V5TGlzdGVuZXIoXCJ1cFwiLCB0aGlzLnN0ZXBVcC5iaW5kKHRoaXMpKTtcclxuXHRcdHRoaXMuYWRkS2V5TGlzdGVuZXIoXCJkb3duXCIsIHRoaXMuc3RlcERvd24uYmluZCh0aGlzKSk7XHJcblx0XHR0aGlzLmVsZW1lbnQudmFsdWUgPSB0aGlzLnZhbHVlTm93O1xyXG5cdH1cclxuXHJcblx0Z2V0IHZhbHVlTm93KCkgeyByZXR1cm4gc3VwZXIudmFsdWVOb3c7IH1cclxuXHRzZXQgdmFsdWVOb3codmFsKSB7XHJcblx0XHRzdXBlci52YWx1ZU5vdyA9IHZhbDtcclxuXHRcdHRoaXMuZWxlbWVudC52YWx1ZSA9IHZhbDtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNwaW5idXR0b247IiwiaW1wb3J0IENoZWNrYm94IGZyb20gXCIuL0NoZWNrYm94XCI7XG5cbi8qKlxuICogQSB0eXBlIG9mIGNoZWNrYm94IHRoYXQgcmVwcmVzZW50cyBvbi9vZmYgdmFsdWVzLCBhcyBvcHBvc2VkIHRvIGNoZWNrZWQvdW5jaGVja2VkIHZhbHVlcy5cbiAqIEBleHRlbmRzIENoZWNrYm94IFxuICovXG5jbGFzcyBTd2l0Y2ggZXh0ZW5kcyBDaGVja2JveCB7XG5cdC8qKlxuXHQgKiAjIyMjIEV4YW1wbGVcblx0ICogXG5cdCAqICoqRGVmYXVsdCoqXG5cdCAqIFxuXHQgKiA8ZGl2IHJvbGU9XCJzd2l0Y2hcIiB0YWJpbmRleD1cIjBcIj48L2Rpdj5cblx0ICogXG5cdCAqIGBgYGh0bWxcblx0ICogPGRpdiByb2xlPVwic3dpdGNoXCIgdGFiaW5kZXg9XCIwXCI+PC9kaXY+XG5cdCAqIGBgYFxuXHQgKiBcblx0ICogKipXaXRoIHByZWRlZmluZWQgdmFsdWUqKlxuXHQgKiBcblx0ICogPGRpdiByb2xlPVwic3dpdGNoXCIgYXJpYS1jaGVja2VkPVwidHJ1ZVwiIHRhYmluZGV4PVwiMFwiPjwvZGl2PlxuXHQgKiBcblx0ICogYGBgaHRtbFxuXHQgKiA8ZGl2IHJvbGU9XCJzd2l0Y2hcIiBhcmlhLWNoZWNrZWQ9XCJ0cnVlXCIgdGFiaW5kZXg9XCIwXCI+PC9kaXY+XG5cdCAqIGBgYFxuXHQgKiBAcGFyYW0geyp9IGFyZ3Ncblx0Ki9cblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdHN1cGVyKC4uLmFyZ3MpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN3aXRjaDtcbiIsImltcG9ydCBtaXggZnJvbSBcIkB2ZXN0ZXJnYWFyZC1jb21wYW55L2pzLW1peGluXCI7XG5cbmltcG9ydCBlbGVtZW50cyBmcm9tIFwiLi8uLi91dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IHNlbGVjdG9yIGZyb20gXCIuLy4uL3V0aWxzL3NlbGVjdG9yXCI7XG5pbXBvcnQgcm9sZXMgZnJvbSBcIi4vLi4vZGF0YS9yb2xlc1wiO1xuXG5pbXBvcnQgUm9sZXR5cGUgZnJvbSBcIi4vYWJzdHJhY3QvUm9sZXR5cGVcIjtcblxuaW1wb3J0IEFyaWFTZWxlY3RlZCBmcm9tIFwiLi8uLi9hdHRyaWJ1dGVzL2FyaWEtc2VsZWN0ZWRcIjtcblxuY2xhc3MgVGFiIGV4dGVuZHMgbWl4KFJvbGV0eXBlKS53aXRoKEFyaWFTZWxlY3RlZCkge1xuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0c3VwZXIoLi4uYXJncyk7XG5cdH1cblxuXHRvblNlbGVjdChldikge1xuXHRcdC8vIGdldHMgdGhlIHNlbGVjdG9yIGZvciBmaW5kaW5nIGl0J3MgY29udGV4dCBlbGVtZW50ICh0YWJsaXN0ID4gdGFiKSBcblx0XHR2YXIgY29udGV4dFNlbGVjdG9yID0gcm9sZXMudGFiLmNvbnRleHQubWFwKHN0ciA9PiBzZWxlY3Rvci5nZXRSb2xlKHN0cikpLmpvaW4oXCIsIFwiKTtcblx0XHRsZXQgdGFibGlzdCA9IGVsZW1lbnRzLmdldFBhcmVudCh0aGlzLCBjb250ZXh0U2VsZWN0b3IpO1xuXHRcdGlmKCF0YWJsaXN0KSByZXR1cm4gZmFsc2U7XG5cdFx0XG5cdFx0ZXYucHJldmVudERlZmF1bHQoKTtcblx0XHRcblx0XHRsZXQgdGFicyA9IHRhYmxpc3QuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKG9wdGlvbnMuc2VsZWN0b3IgKyBcIlthcmlhLXNlbGVjdGVkPSd0cnVlJ11cIik7XG5cdFx0W10uZm9yRWFjaC5jYWxsKHRhYnMsIChpdGVtKSA9PiB7XG5cdFx0XHRsZXQgaW5zdCA9IGVsZW1lbnRzLmdldChpdGVtKTtcblx0XHRcdGluc3Quc2VsZWN0ZWQgPSBmYWxzZTtcblx0XHRcdGluc3QuY29udHJvbHNbMF0uZWxlbWVudC5oaWRkZW4gPSB0cnVlO1xuXHRcdH0pO1xuXG5cdFx0aWYgKHR5cGVvZiBzdXBlci5vblNlbGVjdCA9PSBcImZ1bmN0aW9uXCIpIHN1cGVyLm9uU2VsZWN0KGV2KTtcblx0XHRcblx0XHR0aGlzLmNvbnRyb2xzWzBdLmVsZW1lbnQuaGlkZGVuID0gZmFsc2U7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFiOyIsImltcG9ydCBlbGVtZW50cyBmcm9tIFwiLi8uLi91dGlscy9lbGVtZW50cy5qc1wiO1xyXG5pbXBvcnQgQ29tcG9zaXRlIGZyb20gXCIuL2Fic3RyYWN0L0NvbXBvc2l0ZVwiO1xyXG5cclxuY2xhc3MgVGFibGlzdCBleHRlbmRzIENvbXBvc2l0ZSB7XHJcblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xyXG5cdFx0c3VwZXIoLi4uYXJncyk7XHJcblxyXG5cdFx0dGhpcy5hZGRLZXlMaXN0ZW5lcihcImxlZnRcIiwgdGhpcy5tb3ZlVG9QcmV2LmJpbmQodGhpcykpO1xyXG5cdFx0dGhpcy5hZGRLZXlMaXN0ZW5lcihcInJpZ2h0XCIsIHRoaXMubW92ZVRvTmV4dC5iaW5kKHRoaXMpKTtcclxuXHRcdHRoaXMuYWRkS2V5TGlzdGVuZXIoXCJob21lXCIsIHRoaXMubW92ZVRvU3RhcnQuYmluZCh0aGlzKSk7XHJcblx0XHR0aGlzLmFkZEtleUxpc3RlbmVyKFwiZW5kXCIsIHRoaXMubW92ZVRvRW5kLmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0bW92ZVRvUHJldihldikge1xyXG5cdFx0bGV0IHByZXZJbnN0YW5jZSA9IGVsZW1lbnRzLmdldFByZXYoZWxlbWVudHMuZ2V0KGV2LnRhcmdldCksIHRoaXMsIG9wdGlvbnMub3ducyk7XHJcblx0XHRwcmV2SW5zdGFuY2UuZWxlbWVudC5mb2N1cygpO1xyXG5cdFx0ZXYucHJldmVudERlZmF1bHQoKTtcclxuXHR9XHJcblx0bW92ZVRvTmV4dChldikge1xyXG5cdFx0bGV0IG5leHRJbnN0YW5jZSA9IGVsZW1lbnRzLmdldE5leHQoZWxlbWVudHMuZ2V0KGV2LnRhcmdldCksIHRoaXMsIG9wdGlvbnMub3ducyk7XHJcblx0XHRuZXh0SW5zdGFuY2UuZWxlbWVudC5mb2N1cygpO1xyXG5cdFx0ZXYucHJldmVudERlZmF1bHQoKTtcclxuXHR9XHJcblxyXG5cdG1vdmVUb1N0YXJ0KGV2KSB7XHJcblx0XHRsZXQgZmlyc3RJbnN0YW5jZSA9IGVsZW1lbnRzLmdldFN0YXJ0KGVsZW1lbnRzLmdldChldi50YXJnZXQpLCB0aGlzLCBvcHRpb25zLm93bnMpO1xyXG5cdFx0Zmlyc3RJbnN0YW5jZS5lbGVtZW50LmZvY3VzKCk7XHJcblx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdH1cclxuXHJcblx0bW92ZVRvRW5kKGV2KSB7XHJcblx0XHRsZXQgbGFzdEluc3RhbmNlID0gZWxlbWVudHMuZ2V0RW5kKGVsZW1lbnRzLmdldChldi50YXJnZXQpLCB0aGlzLCBvcHRpb25zLm93bnMpO1xyXG5cdFx0bGFzdEluc3RhbmNlLmVsZW1lbnQuZm9jdXMoKTtcclxuXHRcdGV2LnByZXZlbnREZWZhdWx0KCk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUYWJsaXN0OyIsImltcG9ydCBTZWN0aW9uIGZyb20gXCIuL2Fic3RyYWN0L1NlY3Rpb25cIjtcclxuXHJcbmNsYXNzIFRhYnBhbmVsIGV4dGVuZHMgU2VjdGlvbiB7IH1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRhYnBhbmVsOyIsImltcG9ydCBtaXggZnJvbSBcIkB2ZXN0ZXJnYWFyZC1jb21wYW55L2pzLW1peGluXCI7XG5cbmltcG9ydCBJbnB1dCBmcm9tIFwiLi9hYnN0cmFjdC9JbnB1dFwiO1xuaW1wb3J0IFNlbGVjdGlvbiBmcm9tIFwiLi8uLi9taXhpbnMvU2VsZWN0aW9uXCI7XG5cbi8qKlxuICogIyMjIEV4YW1wbGVzXG4gKlxuICogIyMjIyMgQmFzaWMgZXhhbXBsZVxuICogXG4gKiA8ZGl2IHJvbGU9J3RleHRib3gnIGNvbnRlbnRlZGl0YWJsZT48L2Rpdj5cbiAqIFxuICogYGBgaHRtbFxuICogPGRpdiByb2xlPSd0ZXh0Ym94JyBjb250ZW50ZWRpdGFibGU+PC9kaXY+XG4gKiBgYGBcbiAqIFxuICogQHN1bW1hcnkgQSB0eXBlIG9mIGlucHV0IHRoYXQgYWxsb3dzIGZyZWUtZm9ybSB0ZXh0IGFzIGl0cyB2YWx1ZS5cbiAqIEBleHRlbmRzIElucHV0XG4gKiBAbWl4ZXMgU2VsZWN0aW9uXG4gKiBAdG9kbyBBZGQgb3B0aW9ucyB0byBrZWVwIG9yIHJlbW92ZSBwYXN0ZWQgc3R5bGluZ1xuICovXG5jbGFzcyBUZXh0Ym94IGV4dGVuZHMgbWl4KElucHV0KS53aXRoKFNlbGVjdGlvbikge1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0geyp9IGFyZ3Ncblx0ICovXG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRzdXBlciguLi5hcmdzKTtcblxuXHRcdHRoaXMuXy5yZWdpc3RlckN1c3RvbVZhbHVlKFwidGV4dGJveC5taW5sZW5ndGhcIik7XG5cdFx0dGhpcy5fLnJlZ2lzdGVyQ3VzdG9tVmFsdWUoXCJ0ZXh0Ym94Lm1heGxlbmd0aFwiKTtcblx0XHR0aGlzLl8ucmVnaXN0ZXJDdXN0b21WYWx1ZShcInRleHRib3guc2l6ZVwiKTtcblx0XHRcblx0XHRpZighdGhpcy5tdWx0aWxpbmUpIHtcblx0XHRcdHRoaXMuYWRkS2V5TGlzdGVuZXIoXCJlbnRlclwiLCB0aGlzLl9vbkVudGVyLmJpbmQodGhpcykpO1xuXHRcdFx0dGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwYXN0ZVwiLCB0aGlzLl9vblBhc3RlLmJpbmQodGhpcykpO1xuXHRcdFx0Ly8gdGhpcy5hZGRNdXRhdGlvbkxpc3RlbmVyKClcblx0XHR9XG5cdH1cblxuXHRfb25FbnRlcihldikge1xuXHRcdGV2LnByZXZlbnREZWZhdWx0KCk7XG5cdH1cblxuXHRfb25QYXN0ZShldikge1xuXHRcdGV2LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0bGV0IHN0cjtcblx0XHRsZXQgZGF0YSA9IGV2LmNsaXBib2FyZERhdGEuZ2V0RGF0YShcInRleHQvcGxhaW5cIikucmVwbGFjZSgvXFxyP1xcbnxcXHIvZywgXCJcIik7XG5cdFx0bGV0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblxuXHRcdHZhciBjID0gdGhpcy5lbGVtZW50LmNoaWxkTm9kZXM7XG5cdFx0dmFyIGEgPSBzZWwuYW5jaG9yTm9kZTtcblxuXHRcdGlmIChjICYmIGEgJiYgQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChjLCBhKSA+IC0xKSB7XG5cdFx0XHRzdHIgPSBbdGhpcy5lbGVtZW50LmlubmVyVGV4dC5zbGljZSgwLCBzZWwuYW5jaG9yT2Zmc2V0KSwgZGF0YSwgdGhpcy5lbGVtZW50LmlubmVyVGV4dC5zbGljZShzZWwuZm9jdXNPZmZzZXQpXTtcblx0XHRcdHN0ciA9IHN0ci5qb2luKFwiXCIpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHIgPSB0aGlzLmVsZW1lbnQuaW5uZXJUZXh0ICsgZGF0YTtcblx0XHR9XG5cblx0XHR0aGlzLmVsZW1lbnQuaW5uZXJUZXh0ID0gc3RyO1xuXHR9XG5cblx0X29uQ2hpbGRMaXN0TXV0YXRpb24obXV0YXRpb24pIHtcblx0XHRpZiAoIXRoaXMubXVsdGlsaW5lKSB7XG5cdFx0XHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKG11dGF0aW9uLmFkZGVkTm9kZXMsIG4gPT4ge1xuXHRcdFx0XHRpZiAobi5ub2RlTmFtZSAhPT0gXCIjdGV4dFwiKSB7XG5cdFx0XHRcdFx0dmFyIG5ld0NoaWxkID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobi5pbm5lclRleHQpO1xuXHRcdFx0XHRcdG4ucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobmV3Q2hpbGQsIG4pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHQvKiBOYXRpdmUgcG9seWZpbGwgICovXG5cdFxuXHQvLyBhdXRvY29tcGxldGVcblx0Ly8gZGlybmFtZVxuXHQvLyBsaXN0XG5cdC8vIG1heGxlbmd0aFxuXHQvLyBtaW5sZW5ndGhcblx0Ly8gcGF0dGVyblxuXHQvLyBwbGFjZWhvbGRlclxuXHQvLyByZWFkb25seVxuXHQvLyByZXF1aXJlZFxuXHQvLyBzaXplXG5cdC8vIHZhbHVlXG5cdC8vIGxpc3Rcblx0Ly8gc2VsZWN0aW9uIGFwaVxuXG5cdC8vIG5hbWVcdHN0cmluZzogUmV0dXJucyAvIFNldHMgdGhlIGVsZW1lbnQncyBuYW1lIGF0dHJpYnV0ZSwgY29udGFpbmluZyBhIG5hbWUgdGhhdCBpZGVudGlmaWVzIHRoZSBlbGVtZW50IHdoZW4gc3VibWl0dGluZyB0aGUgZm9ybS5cblx0Ly8gdHlwZSBzdHJpbmc6IFJldHVybnMgLyBTZXRzIHRoZSBlbGVtZW50J3MgdHlwZSBhdHRyaWJ1dGUsIGluZGljYXRpbmcgdGhlIHR5cGUgb2YgY29udHJvbCB0byBkaXNwbGF5LiBTZWUgdHlwZSBhdHRyaWJ1dGUgb2YgPGlucHV0PiBmb3IgcG9zc2libGUgdmFsdWVzLlxuXHQvLyBhdXRvZm9jdXNcdGJvb2xlYW46IFJldHVybnMgLyBTZXRzIHRoZSBlbGVtZW50J3MgYXV0b2ZvY3VzIGF0dHJpYnV0ZSwgd2hpY2ggc3BlY2lmaWVzIHRoYXQgYSBmb3JtIGNvbnRyb2wgc2hvdWxkIGhhdmUgaW5wdXQgZm9jdXMgd2hlbiB0aGUgcGFnZSBsb2FkcywgdW5sZXNzIHRoZSB1c2VyIG92ZXJyaWRlcyBpdCwgZm9yIGV4YW1wbGUgYnkgdHlwaW5nIGluIGEgZGlmZmVyZW50IGNvbnRyb2wuIE9ubHkgb25lIGZvcm0gZWxlbWVudCBpbiBhIGRvY3VtZW50IGNhbiBoYXZlIHRoZSBhdXRvZm9jdXMgYXR0cmlidXRlLiBJdCBjYW5ub3QgYmUgYXBwbGllZCBpZiB0aGUgdHlwZSBhdHRyaWJ1dGUgaXMgc2V0IHRvIGhpZGRlbiAodGhhdCBpcywgeW91IGNhbm5vdCBhdXRvbWF0aWNhbGx5IHNldCBmb2N1cyB0byBhIGhpZGRlbiBjb250cm9sKS5cblx0XG5cdC8qKlxuXHQgKiBSZXR1cm5zIC8gU2V0cyB0aGUgY3VycmVudCB2YWx1ZSBvZiB0aGUgdGV4dGJveC5cblx0ICogQHR5cGUge1N0cmluZ31cblx0ICovXG5cdGdldCB2YWx1ZSgpIHsgcmV0dXJuIHRoaXMuZWxlbWVudC5pbm5lclRleHQ7IH1cblx0c2V0IHZhbHVlKHN0cikgeyB0aGlzLmVsZW1lbnQuaW5uZXJUZXh0ID0gc3RyOyB9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgLyBTZXRzIHRoZSBtaW5tdW0gbGVuZ3RoIG9mIGNoYXJhY3RlcnNcblx0ICogQHR5cGUge0ludGVnZXJ9XG5cdCAqL1xuXHRnZXQgbWluTGVuZ3RoKCkgeyByZXR1cm4gdGhpcy5fLnRleHRib3gubWlubGVuZ3RoOyB9XG5cdHNldCBtaW5MZW5ndGgobnVtKSB7IHRoaXMuXy50ZXh0Ym94Lm1pbmxlbmd0aCA9IG51bTsgfVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIC8gU2V0cyB0aGUgbWF4aW11bSBsZW5ndGggb2YgY2hhcmFjdGVyc1xuXHQgKiBAdHlwZSB7SW50ZWdlcn1cblx0ICovXG5cdGdldCBtYXhMZW5ndGgoKSB7IHJldHVybiB0aGlzLl8udGV4dGJveC5tYXhsZW5ndGg7IH1cblx0c2V0IG1heExlbmd0aChudW0pIHsgdGhpcy5fLnRleHRib3gubWF4bGVuZ3RoID0gbnVtOyB9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgLyBTZXRzIHRoZSBzaXplIG9mIGNvbnRyb2wuXG5cdCAqIEB0eXBlIHtJbnRlZ2VyfVxuXHQgKi9cblx0Z2V0IHNpemUoKSB7IHJldHVybiB0aGlzLl8udGV4dGJveC5zaXplOyB9XG5cdHNldCBzaXplKHZhbCkge1xuXHRcdHRoaXMuZWxlbWVudC5zdHlsZS53aWR0aCA9IDIuMTYgKyAwLjQ4ICogdmFsICsgXCJlbVwiO1xuXHRcdHRoaXMuXy50ZXh0Ym94LnNpemUgPSB2YWw7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGV4dGJveDsiLCJpbXBvcnQgV2lkZ2V0IGZyb20gXCIuL1dpZGdldFwiO1xyXG5cclxuLyoqXHJcbiAqIEBleHRlbmRzIFdpZGdldFxyXG4gKiBAYWJzdHJhY3RcclxuICovXHJcbmNsYXNzIENvbW1hbmQgZXh0ZW5kcyBXaWRnZXQge31cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbW1hbmQ7IiwiaW1wb3J0IFdpZGdldCBmcm9tIFwiLi9XaWRnZXRcIjtcclxuXHJcbi8qKlxyXG4gKiBAZXh0ZW5kcyBXaWRnZXRcclxuICogQGFic3RyYWN0XHJcbiAqL1xyXG5jbGFzcyBDb21wb3NpdGUgZXh0ZW5kcyBXaWRnZXQgeyB9XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb21wb3NpdGU7IiwiaW1wb3J0IG1peCBmcm9tIFwiQHZlc3RlcmdhYXJkLWNvbXBhbnkvanMtbWl4aW5cIjtcblxuaW1wb3J0IHNlbGVjdG9yIGZyb20gXCIuLy4uLy4uL3V0aWxzL3NlbGVjdG9yXCI7XG5pbXBvcnQgZWxlbWVudHMgZnJvbSBcIi4vLi4vLi4vdXRpbHMvZWxlbWVudHNcIjtcblxuaW1wb3J0IFdpZGdldCBmcm9tIFwiLi9XaWRnZXRcIjtcbmltcG9ydCBWYWxpZGF0aW9uIGZyb20gXCIuLy4uLy4uL21peGlucy9WYWxpZGF0aW9uXCI7XG5cbi8qKlxuICogQGV4dGVuZHMgV2lkZ2V0XG4gKiBAbWl4ZXMgVmFsaWRhdGlvblxuICogQGFic3RyYWN0XG4gKi9cbmNsYXNzIElucHV0IGV4dGVuZHMgbWl4KFdpZGdldCkud2l0aChWYWxpZGF0aW9uKSB7XG5cdC8qKlxuXHQgKiBAYWxpYXMgSW5wdXQ6Y29uc3RydWN0b3JcbiBcdCAqIEBwYXJhbSB7UmVnZXh9IFtvcHRpb25zLmlucHV0LnBhdHRlcm5dIFJlZ2V4IHRvIGNoZWNrIGFnYWluc3Qgd2hlbiB2YWxpZGF0aW5nXG5cdCAqL1xuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0c3VwZXIoLi4uYXJncyk7XG5cblx0XHR0aGlzLl8ucmVnaXN0ZXJDdXN0b21FbGVtZW50KFwiaW5wdXQucGF0dGVyblwiKTtcblx0fVxuXG5cdC8qIFBvbHlmaWxsIG9mIG5hdGl2ZSBwcm9wZXJ0aWVzICovXG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSByZWZlcmVuY2UgdG8gdGhlIHBhcmVudCBmb3JtIGVsZW1lbnRcblx0ICogQHJldHVybnMge0FjY2Vzc2libGVOb2RlfSB7QGxpbmsgRm9ybX1cblx0ICovXG5cdGdldCBmb3JtKCkge1xuXHRcdHJldHVybiBlbGVtZW50cy5nZXRQYXJlbnQodGhpcywgc2VsZWN0b3IuZ2V0RGVlcChcImZvcm1cIikpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGZpcnN0IGVsZW1lbnQgcG9pbnRlZCBieSB0aGUge0BsaW5rIEFjY2Vzc2libGVOb2RlI2NvbnRyb2xzfSBwcm9wZXJ0eS5cblx0ICogVGhlIHByb3BlcnR5IG1heSBiZSBudWxsIGlmIG5vIEhUTUwgZWxlbWVudCBmb3VuZCBpbiB0aGUgc2FtZSB0cmVlLlxuXHQgKiBAcmV0dXJucyB7QWNjZXNzaWJsZU5vZGV9IHtAbGluayBMaXN0Ym94fVxuXHQgKi9cblx0Z2V0IGxpc3QoKSB7XG5cdFx0cmV0dXJuIHRoaXMuY29udHJvbHMuZmluZChheSA9PiBheS5lbGVtZW50Lm1hdGNoZXMoc2VsZWN0b3IuZ2V0KFwibGlzdGJveFwiKSkpO1xuXHR9XG5cblx0Ly8gZm9ybUFjdGlvblx0c3RyaW5nOiBSZXR1cm5zIC8gU2V0cyB0aGUgZWxlbWVudCdzIGZvcm1hY3Rpb24gYXR0cmlidXRlLGNvbnRhaW5pbmcgdGhlIFVSSSBvZiBhXG5cdC8vIHByb2dyYW0gdGhhdCBwcm9jZXNzZXMgaW5mb3JtYXRpb24gc3VibWl0dGVkIGJ5IHRoZSBlbGVtZW50LiBUaGlzIG92ZXJyaWRlcyB0aGUgYWN0aW9uIGF0dHJpYnV0ZVxuXHQvLyBvZiB0aGUgcGFyZW50IGZvcm0uXG5cblx0Ly8gZm9ybUVuY1R5cGVcdHN0cmluZzogUmV0dXJucyAvIFNldHMgdGhlIGVsZW1lbnQncyBmb3JtZW5jdHlwZSBhdHRyaWJ1dGUsIGNvbnRhaW5pbmcgdGhlIHR5cGUgb2Zcblx0Ly8gY29udGVudCB0aGF0IGlzIHVzZWQgdG8gc3VibWl0IHRoZSBmb3JtIHRvIHRoZSBzZXJ2ZXIuIFRoaXMgb3ZlcnJpZGVzIHRoZSBlbmN0eXBlIGF0dHJpYnV0ZSBvZiBcblx0Ly8gdGhlIHBhcmVudCBmb3JtLlxuXHRcblx0Ly8gZm9ybU1ldGhvZFx0c3RyaW5nOiBSZXR1cm5zIC8gU2V0cyB0aGUgZWxlbWVudCdzIGZvcm1tZXRob2QgYXR0cmlidXRlLCBjb250YWluaW5nIHRoZSBIVFRQIG1ldGhvZFxuXHQvLyB0aGF0IHRoZSBicm93c2VyIHVzZXMgdG8gc3VibWl0IHRoZSBmb3JtLiBUaGlzIG92ZXJyaWRlcyB0aGUgbWV0aG9kIGF0dHJpYnV0ZSBvZiB0aGUgcGFyZW50IGZvcm0uXG5cblx0Ly8gZm9ybU5vVmFsaWRhdGVcdGJvb2xlYW46IFJldHVybnMgLyBTZXRzIHRoZSBlbGVtZW50J3MgZm9ybW5vdmFsaWRhdGUgYXR0cmlidXRlLCBpbmRpY2F0aW5nIHRoYXRcblx0Ly8gdGhlIGZvcm0gaXMgbm90IHRvIGJlIHZhbGlkYXRlZCB3aGVuIGl0IGlzIHN1Ym1pdHRlZC4gVGhpcyBvdmVycmlkZXMgdGhlIG5vdmFsaWRhdGUgYXR0cmlidXRlXG5cdC8vIG9mIHRoZSBwYXJlbnQgZm9ybS5cblxuXHQvLyBmb3JtVGFyZ2V0XHRzdHJpbmc6IFJldHVybnMgLyBTZXRzIHRoZSBlbGVtZW50J3MgZm9ybXRhcmdldCBhdHRyaWJ1dGUsIGNvbnRhaW5pbmcgYSBuYW1lIG9yXG5cdC8vIGtleXdvcmQgaW5kaWNhdGluZyB3aGVyZSB0byBkaXNwbGF5IHRoZSByZXNwb25zZSB0aGF0IGlzIHJlY2VpdmVkIGFmdGVyIHN1Ym1pdHRpbmcgdGhlIGZvcm0uXG5cdC8vIFRoaXMgb3ZlcnJpZGVzIHRoZSB0YXJnZXQgYXR0cmlidXRlIG9mIHRoZSBwYXJlbnQgZm9ybS5cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW5wdXQ7XG4iLCJpbXBvcnQgU2VjdGlvbiBmcm9tIFwiLi9TZWN0aW9uXCI7XHJcblxyXG4vKipcclxuICogQGV4dGVuZHMgU2VjdGlvblxyXG4gKi9cclxuY2xhc3MgTGFuZG1hcmsgZXh0ZW5kcyBTZWN0aW9uIHsgfVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGFuZG1hcms7IiwiaW1wb3J0IFdpZGdldCBmcm9tIFwiLi9XaWRnZXRcIjtcblxuLyoqXG4gKiAqKihBYnN0cmFjdCByb2xlKSBTSE9VTEQgTk9UIFVTRUQgSU4gVEhFIERPTSoqIFxuICogQW4gaW5wdXQgcmVwcmVzZW50aW5nIGEgcmFuZ2Ugb2YgdmFsdWVzIHRoYXQgY2FuIGJlIHNldCBieSB0aGUgdXNlci5cbiAqXG4gKiBAY2xhc3NcbiAqIEBleHRlbmRzIFdpZGdldFxuICogQHJldHVybiB7UmFuZ2V9IHRoaXNcbiAqIEBzZWUge0BsaW5rIGh0dHBzOi8vdzNjLmdpdGh1Yi5pby9hcmlhL2FyaWEvYXJpYS5odG1sI3JhbmdlfVxuICovXG5jbGFzcyBSYW5nZSBleHRlbmRzIFdpZGdldCB7XG5cdC8qKlxuXHQgKiBAYWxpYXMgbW9kdWxlOlJhbmdlLWNvbnN0XG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgXHRcdFx0XHRlbGVtZW50IHRvIGRlcml2ZSBpbmZvcm1hdGlvbiBuYW1lRnJvbVxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIFx0XHRcdFx0XHRcdG9wdGlvbmFsIG9wdGlvbnNcbiBcdCAqIEBwYXJhbSB7TnVtYmVyfFwiYW55XCJ9IG9wdGlvbnMuc3RlcCBcdGluY3JlYXNlL2RlY3JlYXNlIHZhbHVlIHVzZWRcblx0ICovXG5cdGNvbnN0cnVjdG9yKC4uLmFyZykge1xuXHRcdHN1cGVyKC4uLmFyZyk7XG5cblx0XHQvKipcblx0ICAgKiBAbmFtZSBSYW5nZSNfXG5cdFx0ICogQHR5cGUge09iamVjdH1cblx0XHQgKiBAcHJvcCB7TnVtYmVyfSBbc3RlcD0xXVxuXHQgICAqL1xuXG5cdFx0dGhpcy5fLnJlZ2lzdGVyQ3VzdG9tVmFsdWUoXCJzdGVwXCIsIDEpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFBhc3N0cm91Z2ggb2YgYW4gc3RyaW5naWZpZWQgYHZhbHVlTm93YFxuXHQgKiBAdHlwZSB7U3RyaW5nfVxuXHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSN2YWx1ZU5vd31cblx0ICovXG5cdGdldCB2YWx1ZSgpIHsgcmV0dXJuIHRoaXMudmFsdWVOb3cudG9TdHJpbmcoKTt9XG5cdHNldCB2YWx1ZSh2YWwpIHsgdGhpcy52YWx1ZU5vdyA9IHZhbDsgfVxuXG5cdC8qKlxuXHQgKiBQcm94eSBvZiB0aGUgYHZhbHVlTm93YCB2YWx1ZVxuXHQgKiBAdHlwZSB7TnVtYmVyfVxuXHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSN2YWx1ZU5vd31cblx0ICovXG5cdGdldCB2YWx1ZUFzTnVtYmVyKCkgeyByZXR1cm4gdGhpcy52YWx1ZU5vdzsgfVxuXHRzZXQgdmFsdWVBc051bWJlcih2YWwpIHsgdGhpcy52YWx1ZU5vdyA9IHZhbDsgfVxuXG5cdC8qKlxuICAgKiBEZWNyZWFzZSB0aGUgdmFsdWUgd2l0aCB0aGUgYW1vdW50IG9mIDEgc3RlcFxuICAgKiBAcGFyYW0gIHtFdmVudH0gZXYgRXZlbnQgd2hlbiB0cmlnZ2VyZWQgdGhyb3VnaCBhbiBlbGVtZW50c1xuICAgKi9cblx0c3RlcERvd24oZXYpIHtcblx0XHRpZih0aGlzLmRpc2FibGVkKSByZXR1cm47XG5cdFx0aWYoZXYpIGV2LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRpZih0aGlzLnZhbHVlTWluID09PSBudWxsIHx8IHRoaXMudmFsdWVOb3cgPiB0aGlzLnZhbHVlTWluKSB7XG5cdFx0XHR0aGlzLnZhbHVlTm93ID0gdGhpcy52YWx1ZU5vdyAtIHRoaXMuXy5zdGVwO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuICAgKiBJbmNyZWFzZSB0aGUgdmFsdWUgd2l0aCB0aGUgYW1vdW50IG9mIDEgc3RlcFxuICAgKiBAcGFja2FnZVxuICAgKiBAcGFyYW0gIHtFdmVudH0gZXYgRXZlbnQgd2hlbiB0cmlnZ2VyZWQgdGhyb3VnaCBhbiBlbGVtZW50c1xuICAgKi9cblx0c3RlcFVwKGV2KSB7XG5cdFx0aWYodGhpcy5kaXNhYmxlZCkgcmV0dXJuO1xuXHRcdGlmKGV2KSBldi5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0aWYodGhpcy52YWx1ZU1heCA9PT0gbnVsbCB8fCB0aGlzLnZhbHVlTm93IDwgdGhpcy52YWx1ZU1heCkge1xuXHRcdFx0dGhpcy52YWx1ZU5vdyA9IHRoaXMudmFsdWVOb3cgKyB0aGlzLl8uc3RlcDtcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmFuZ2U7IiwiaW1wb3J0IEFjY2Vzc2libGVOb2RlIGZyb20gXCIuLy4uLy4uL3R5cGUvQWNjZXNzaWJsZU5vZGVcIjtcclxuXHJcbi8qKlxyXG4gKiBAZXh0ZW5kcyBBY2Nlc3NpYmxlTm9kZVxyXG4gKi9cclxuY2xhc3MgUm9sZXR5cGUgZXh0ZW5kcyBBY2Nlc3NpYmxlTm9kZSB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBleHRlbmRzIEFjY2Vzc2libGVOb2RlXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xyXG5cdFx0c3VwZXIoLi4uYXJncyk7XHJcblxyXG5cdFx0dGhpcy5fb25BcmlhRGlzYWJsZWRNdXRhdGlvbigpO1xyXG5cdH1cclxuXHJcblx0X29uQXJpYURpc2FibGVkTXV0YXRpb24oKSB7XHJcblx0XHQvLyBjb25zb2xlLmxvZyh0aGlzLmRpc2FibGVkLCB0aGlzLnRhYkluZGV4LCB0aGlzLmRpc2FibGVkICYmIHRoaXMudGFiSW5kZXggJiYgdGhpcy50YWJJbmRleCA+PSAwKTtcclxuXHRcdGlmKHRoaXMuZGlzYWJsZWQgJiYgdGhpcy50YWJJbmRleCA+PSAwKSB7XHJcblx0XHRcdHRoaXMudGFiSW5kZXggPSB1bmRlZmluZWQ7XHJcblx0XHR9IGVsc2UgaWYoIXRoaXMuZGlzYWJsZWQgJiYgdGhpcy50YWJJbmRleCA8IDApIHtcclxuXHRcdFx0dGhpcy50YWJJbmRleCA9IDA7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSb2xldHlwZTsiLCJpbXBvcnQgU3RydWN0dXJlIGZyb20gXCIuL1N0cnVjdHVyZVwiO1xyXG5cclxuLyoqXHJcbiAqIEBleHRlbmRzIFN0cnVjdHVyZVxyXG4gKi9cclxuY2xhc3MgU2VjdGlvbiBleHRlbmRzIFN0cnVjdHVyZSB7IH1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNlY3Rpb247IiwiaW1wb3J0IGZjIGZyb20gXCIuLy4uLy4uL3V0aWxzL21hbmFnaW5nRm9jdXNcIjtcclxuaW1wb3J0IGJvb2xlYW4gZnJvbSBcIi4vLi4vLi4vdHlwZS9ib29sZWFuXCI7XHJcbmltcG9ydCBlbGVtZW50cyBmcm9tIFwiLi8uLi8uLi91dGlscy9lbGVtZW50c1wiO1xyXG5cclxuaW1wb3J0IFJvbGV0eXBlIGZyb20gXCIuL1JvbGV0eXBlXCI7XHJcbmltcG9ydCBPcHRpb24gZnJvbSBcIi4vLi4vT3B0aW9uLmpzXCI7XHJcbmltcG9ydCBtaXggZnJvbSBcIkB2ZXN0ZXJnYWFyZC1jb21wYW55L2pzLW1peGluXCI7XHJcbmltcG9ydCBzZWxlY3RvciBmcm9tIFwiLi8uLi8uLi91dGlscy9zZWxlY3RvclwiO1xyXG5cclxuLyoqXHJcbiAqICMjIyBLZXlib2FyZCBTdXBwb3J0XHJcbiAqXHJcbiAqICMjIyMgRGVmYXVsdFxyXG4gKiB8IEtleSB8IEZ1bmN0aW9uIHxcclxuICogfCAtLS0gfCAtLS0tLS0tLSB8XHJcbiAqIHwgRG93biBBcnJvdyB8IE1vdmVzIGZvY3VzIHRvIHRoZSBuZXh0IG9wdGlvbiA8YnIvPiBJZiBub3QgbXVsdGlzZWxlY3RhYmxlLCBpdCBzZWxlY3RzIHRoZSBmb2N1c2VkIG9wdGlvbi5cclxuICogfCBVcCBBcnJvdyBcdHwgTW92ZXMgZm9jdXMgdG8gdGhlIHByZXZpb3VzIG9wdGlvbiAgPGJyLz4gSWYgbm90IG11bHRpc2VsZWN0YWJsZSwgaXQgc2VsZWN0cyB0aGUgZm9jdXNlZCBvcHRpb24uXHJcbiAqIHwgSG9tZSBcdFx0XHR8XHRNb3ZlcyBmb2N1cyB0byB0aGUgZmlyc3Qgb3B0aW9uICA8YnIvPiBJZiBub3QgbXVsdGlzZWxlY3RhYmxlLCBpdCBzZWxlY3RzIHRoZSBmb2N1c2VkIG9wdGlvbi5cclxuICogfCBFbmQgIFx0XHRcdHxcdE1vdmVzIGZvY3VzIHRvIHRoZSBsYXN0IG9wdGlvbiAgPGJyLz4gSWYgbm90IG11bHRpc2VsZWN0YWJsZSwgaXQgc2VsZWN0cyB0aGUgZm9jdXNlZCBvcHRpb24uXHJcbiAqXHJcbiAqICMjIyMgTXVsdGlwbGUgc2VsZWN0aW9uXHJcbiAqIHwgS2V5IHwgRnVuY3Rpb24gfFxyXG4gKiB8IC0tLSB8IC0tLS0tLS0tIHxcclxuICogfCBTcGFjZVx0XHRcdFx0XHRcdFx0XHRcdHwgQ2hhbmdlcyB0aGUgc2VsZWN0aW9uIHN0YXRlIG9mIHRoZSBmb2N1c2VkIG9wdGlvbi5cclxuICogfCBTaGlmdCArIERvd24gQXJyb3cgXHRcdHwgTW92ZXMgZm9jdXMgdG8gYW5kIHNlbGVjdHMgdGhlIG5leHQgb3B0aW9uLlxyXG4gKiB8IFNoaWZ0ICsgVXAgQXJyb3cgXHRcdFx0fCBNb3ZlcyBmb2N1cyB0byBhbmQgc2VsZWN0cyB0aGUgcHJldmlvdXMgb3B0aW9uLlxyXG4gKiB8IENvbnRyb2wgKyBTaGlmdCArIEhvbWUgfFx0U2VsZWN0cyBmcm9tIHRoZSBmb2N1c2VkIG9wdGlvbiB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBsaXN0LlxyXG4gKiB8IENvbnRyb2wgKyBTaGlmdCArIEVuZCAgfCBTZWxlY3RzIGZyb20gdGhlIGZvY3VzZWQgb3B0aW9uIHRvIHRoZSBlbmQgb2YgdGhlIGxpc3QuXHJcbiAqIHwgQ29udHJvbCArIEEgXHQgICAgICAgICAgfCBTZWxlY3RzIGFsbCBvcHRpb25zIGluIHRoZSBsaXN0LiBJZiBhbGwgb3B0aW9ucyBhcmUgc2VsZWN0ZWQsIHVuc2VsZWN0cyBhbGwgb3B0aW9ucy5cclxuICpcclxuICogIyMjIEF0dHJpYnV0ZXNcclxuICogKiBgYXJpYS1zZWxlY3RlZGBcclxuICogXHQqIGB0cnVlYFxyXG4gKiBcdFx0KiBpcyB0aGUgY3VycmVudCBmb2N1c3NlZCBlbGVtZW50XHJcbiAqIFx0XHQqIGVxdWFscyB0aGUgdmFsdWUgb2YgYGFyaWEtYWN0aXZlZGVzY2VuZGFudGBcclxuICogKiBgdGFiaW5kZXhgXHJcbiAqIFx0KiBhbGxvd3MgdXNhZ2Ugb2YgdGhlIGVsZW1lbnQgYnkga2V5cyB3aGVuIGluIGZvY3VzXHJcbiAqICogYGFyaWEtYWN0aXZlZGVzY2VuZGFudGAgZXF1YWxzIElEIG9mIGN1cnJlbnQgZm9jdXNzZWQgZWxlbWVudFxyXG4gKiBcclxuICogIyMjIyBNdWx0aXBsZSBzZWxlY3Rpb25cclxuICogKiBgYXJpYS1zZWxlY3RlZGBcclxuICogICogYHRydWVgXHJcbiAqIFx0XHQqIGNhbiBiZSBhcHBsaWVkIHRvIG11bHRpcGxlIGVsZW1lbnRcclxuICogICAgKiBub3QgYXV0b21hdGljYWxseSBhcHBsaWVkIHRvIHRoZSBmb2N1c2VkIGVsZW1lbnRcclxuICogXHQqIGBmYWxzZWBcclxuICogKiBgdGFiaW5kZXhgXHJcbiAqIFx0KiBhbGxvd3MgdXNhZ2Ugb2YgdGhlIGVsZW1lbnQgYnkga2V5cyB3aGVuIGluIGZvY3VzXHJcbiAqIFxyXG4gKiBAc3VtbWFyeSBBIGZvcm0gd2lkZ2V0IHRoYXQgYWxsb3dzIHRoZSB1c2VyIHRvIG1ha2Ugc2VsZWN0aW9ucyBmcm9tIGEgc2V0IG9mIGNob2ljZXMuXHJcbiAqIEBleHRlbmRzIFJvbGV0eXBlXHJcbiAqL1xyXG5jbGFzcyBTZWxlY3QgZXh0ZW5kcyBSb2xldHlwZSB7XHJcblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xyXG5cdFx0c3VwZXIoLi4uYXJncyk7XHJcblxyXG5cdFx0Ly8gdXNlZCBmb3IgZGV0ZXJtaW5pbmcgaWYgbG9naWMgc2hvdWxkIGJlIGV4ZWN1dGVkXHJcblx0XHR0aGlzLnRhcmdldCA9IGZhbHNlO1xyXG5cdFx0XHJcblx0XHQvLyB3aGVuIGluIGZvY3VzLCBhbGxvdyB0aGUgZWxlbWVudCBiZSBjb250cm9sbGVkIGJ5IHRoZSBrZXlzXHJcblx0XHRpZih0eXBlb2YgdGhpcy50YWJJbmRleCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIGhhc1RhcmdldC5iaW5kKHRoaXMpKTtcclxuXHRcdFx0dGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIGxvc3RUYXJnZXQuYmluZCh0aGlzKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm1vdmVUb1N0YXJ0LmJpbmQodGhpcyksIHtrZXk6IFwiaG9tZVwiLCB0YXJnZXQ6IHRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50fSk7XHJcblx0XHR0aGlzLmFkZExpc3RlbmVyKFwia2V5XCIsIHRoaXMubW92ZVRvUHJldi5iaW5kKHRoaXMpLCB7a2V5OiBcInVwXCIsIHRhcmdldDogdGhpcy5lbGVtZW50Lm93bmVyRG9jdW1lbnR9KTtcclxuXHRcdHRoaXMuYWRkTGlzdGVuZXIoXCJrZXlcIiwgdGhpcy5tb3ZlVG9OZXh0LmJpbmQodGhpcyksIHtrZXk6IFwiZG93blwiLCB0YXJnZXQ6IHRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50fSk7XHJcblx0XHR0aGlzLmFkZExpc3RlbmVyKFwia2V5XCIsIHRoaXMubW92ZVRvRW5kLmJpbmQodGhpcyksIHtrZXk6IFwiZW5kXCIsIHRhcmdldDogdGhpcy5lbGVtZW50Lm93bmVyRG9jdW1lbnR9KTtcclxuXHJcblx0XHQvLyB0aGlzLmFkZExpc3RlbmVyLmNhbGwoeyBlbGVtZW50OiB0aGlzLmVsZW1lbnQub3duZXJEb2N1bWVudCB9LCBcImhvbWVcIiwgdGhpcy5tb3ZlVG9TdGFydC5iaW5kKHRoaXMpKTtcclxuXHRcdC8vIHRoaXMuYWRkTGlzdGVuZXIuY2FsbCh7IGVsZW1lbnQ6IHRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50IH0sIFwidXBcIiwgdGhpcy5tb3ZlVG9QcmV2LmJpbmQodGhpcykpO1xyXG5cdFx0Ly8gLy8gdGhpcy5hZGRMaXN0ZW5lci5jYWxsKHsgZWxlbWVudDogdGhpcy5lbGVtZW50Lm93bmVyRG9jdW1lbnQgfSwgXCJzaGlmdCArIHVwXCIsIHRoaXMubW92ZVRvTmV4dC5iaW5kKHRoaXMpKTtcclxuXHRcdC8vIHRoaXMuYWRkTGlzdGVuZXIuY2FsbCh7IGVsZW1lbnQ6IHRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50IH0sIFwiZG93blwiLCB0aGlzLm1vdmVUb05leHQuYmluZCh0aGlzKSk7XHJcblx0XHQvLyAvLyB0aGlzLmFkZExpc3RlbmVyLmNhbGwoeyBlbGVtZW50OiB0aGlzLmVsZW1lbnQub3duZXJEb2N1bWVudCB9LCBcInNoaWZ0ICsgZG93blwiLCBzZWxlY3REb3duLmJpbmQodGhpcykpO1xyXG5cdFx0Ly8gdGhpcy5hZGRMaXN0ZW5lci5jYWxsKHsgZWxlbWVudDogdGhpcy5lbGVtZW50Lm93bmVyRG9jdW1lbnQgfSwgXCJlbmRcIiwgdGhpcy5tb3ZlVG9FbmQuYmluZCh0aGlzKSk7XHJcblx0XHRjb25zb2xlLmxvZyhzZWxlY3Rvcik7XHJcblx0XHRsZXQgb3B0aW9ucyA9IEFycmF5LmZyb20odGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IuZ2V0RGVlcChcIm9wdGlvblwiKSkpO1xyXG5cdFx0dGhpcy5vcHRpb25zID0gW107XHJcblx0XHRvcHRpb25zLmZvckVhY2gobm9kZSA9PiB7XHJcblx0XHRcdGxldCB2YWx1ZSA9IG5ldyBPcHRpb24obm9kZSk7XHJcblxyXG5cdFx0XHR2YWx1ZS5hZGRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuYWN0aXZlQ2hhbmdlZC5iaW5kKHRoaXMpKTtcclxuXHRcdFx0aWYgKHZhbHVlLnNlbGVjdGVkKSB7XHJcblx0XHRcdFx0ZmMuYWRkKHZhbHVlKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLm9wdGlvbnMucHVzaCh2YWx1ZSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdG1vdmVUb1ByZXYoZXYpIHsgbW92ZSh0aGlzLCBldiwgZmMucHJldik7IH1cclxuXHRtb3ZlVG9OZXh0KGV2KSB7IG1vdmUodGhpcywgZXYsIGZjLm5leHQpOyB9XHJcblx0bW92ZVRvU3RhcnQoZXYpIHsgbW92ZSh0aGlzLCBldiwgZmMuc3RhcnQpOyB9XHJcblx0bW92ZVRvRW5kKGV2KSB7IG1vdmUodGhpcywgZXYsIGZjLmVuZCk7IH1cclxuXHRhY3RpdmVDaGFuZ2VkKGV2KSB7XHJcblx0XHQvLyBsZXQgb3B0aW9uIGVsZW1lbnRzLmdldChldi50YXJnZXQpO1xyXG5cdFx0Ly8gbGV0IHByZXZGb2N1cyA9IGZjLmdldCh0aGlzLm9wdGlvbnMpO1xyXG5cdFx0Ly8gZmMucmVtb3ZlKHByZXZGb2N1cyk7XHJcblx0XHQvLyBmYy5hZGQob3B0aW9uKTtcclxuXHJcblx0XHQvLyBpZiAodGhpcy5hY3RpdmVEZXNjZW5kYW50KSB0aGlzLmFjdGl2ZURlc2NlbmRhbnQgPSBvcHRpb247XHJcblxyXG5cdFx0Ly8gLy8gdXBkYXRlIHNlbGVjdGVkIG9uIGtleWV2ZW50IHdoZW4gb25seSBvbmUgaXRlbSBjYW4gYmUgc2VsZWN0ZWRcclxuXHRcdC8vIGlmICghdGhpcy5tdWx0aXNlbGVjdGFibGUpIHtcclxuXHRcdC8vIFx0ZmMuc2V0U2VsZWN0ZWQocHJldkZvY3VzLCB1bmRlZmluZWQpO1xyXG5cdFx0Ly8gfVxyXG5cdFx0Ly8gZmMuc2V0U2VsZWN0ZWQob3B0aW9uLCBib29sZWFuLnRvZ2dsZShvcHRpb24uc2VsZWN0ZWQpKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1vdmUoYXksIGV2LCBmdW5jKSB7XHJcblx0aWYgKCFheS50YXJnZXQpIHJldHVybjtcclxuXHRpZiAoZXYpIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdGxldCBwcmV2Rm9jdXMgPSBmYy5nZXQoYXkub3B0aW9ucyk7XHJcblx0ZmMucmVtb3ZlKHByZXZGb2N1cyk7XHJcblx0Ly8gdXBkYXRlIHNlbGVjdGVkIG9uIGtleWV2ZW50IHdoZW4gb25seSBvbmUgaXRlbSBjYW4gYmUgc2VsZWN0ZWRcclxuXHRsZXQgY3VycmVudEZvY3VzID0gZnVuYyhheS5vcHRpb25zLCBwcmV2Rm9jdXMpO1xyXG5cdGlmIChheS5hY3RpdmVEZXNjZW5kYW50KSBheS5hY3RpdmVEZXNjZW5kYW50ID0gY3VycmVudEZvY3VzO1xyXG5cclxuXHQvLyB1cGRhdGUgc2VsZWN0ZWQgb24ga2V5ZXZlbnQgd2hlbiBvbmx5IG9uZSBpdGVtIGNhbiBiZSBzZWxlY3RlZFxyXG5cdGlmICghYXkubXVsdGlzZWxlY3RhYmxlKSB7XHJcblx0XHRmYy5zZXRTZWxlY3RlZChwcmV2Rm9jdXMsIHVuZGVmaW5lZCk7XHJcblx0XHRmYy5zZXRTZWxlY3RlZChjdXJyZW50Rm9jdXMsIGJvb2xlYW4udG9nZ2xlKGN1cnJlbnRGb2N1cy5zZWxlY3RlZCkpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gaGFzVGFyZ2V0KCkgeyB0aGlzLnRhcmdldCA9IHRydWU7IH1cclxuZnVuY3Rpb24gbG9zdFRhcmdldCgpIHsgdGhpcy50YXJnZXQgPSBmYWxzZTsgfVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0OyIsImltcG9ydCBSb2xldHlwZSBmcm9tIFwiLi9Sb2xldHlwZVwiO1xyXG5cclxuLyoqXHJcbiAqIEBleHRlbmRzIFJvbGV0eXBlXHJcbiAqL1xyXG5jbGFzcyBTdHJ1Y3R1cmUgZXh0ZW5kcyBSb2xldHlwZSB7IH1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN0cnVjdHVyZTtcclxuIiwiaW1wb3J0IFJvbGV0eXBlIGZyb20gXCIuL1JvbGV0eXBlXCI7XHJcblxyXG4vKipcclxuICogQGV4dGVuZHMgUm9sZXR5cGVcclxuICovXHJcbmNsYXNzIFdpZGdldCBleHRlbmRzIFJvbGV0eXBlIHt9XHJcblxyXG5leHBvcnQgZGVmYXVsdCAgV2lkZ2V0O1xyXG4iLCJpbXBvcnQgUm9sZXR5cGUgZnJvbSBcIi4vUm9sZXR5cGVcIjtcclxuXHJcbi8qKlxyXG4gKiBAZXh0ZW5kcyBSb2xldHlwZVxyXG4gKi9cclxuY2xhc3MgV2luZG93IGV4dGVuZHMgUm9sZXR5cGUgeyB9XHJcblxyXG5leHBvcnQgZGVmYXVsdCBXaW5kb3c7XHJcbiIsImltcG9ydCBib29sZWFuIGZyb20gXCIuLy4uL3R5cGUvYm9vbGVhblwiO1xyXG5pbXBvcnQgZ2V0QWN0aXZlIGZyb20gXCIuLy4uL3V0aWxzL2dldEFjdGl2ZVwiO1xyXG5pbXBvcnQgSW5wdXQgZnJvbSBcIi4vYWJzdHJhY3QvSW5wdXRcIjtcclxuXHJcbi8qKlxyXG4gKiBAZXh0ZW5kcyBJbnB1dFxyXG4gKi9cclxuY2xhc3MgT3B0aW9uIGV4dGVuZHMgSW5wdXQge1xyXG5cclxuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XHJcblx0XHRzdXBlciguLi5hcmdzKTtcclxuXHJcblx0XHR0aGlzLmFkZExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vbkNsaWNrLmJpbmQodGhpcykpO1xyXG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcImtleVwiLCB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKSwge2tleTogXCJlbnRlclwiLCB0YXJnZXQ6IGRvY3VtZW50fSk7XHJcblx0XHR0aGlzLmFkZExpc3RlbmVyKFwia2V5XCIsIHRoaXMub25DbGljay5iaW5kKHRoaXMpLCB7a2V5OiBcInNwYWNlXCIsIHRhcmdldDogZG9jdW1lbnR9KTtcclxuXHRcdC8vIHRoaXMuYWRkS2V5TGlzdGVuZXIoXCJFbnRlclwiLCBzZWxlY3RJdGVtLmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0b25DbGljayhldikge1xyXG5cdFx0aWYodHlwZW9mIHN1cGVyLm9uQ2xpY2sgPT0gXCJmdW5jdGlvblwiKSBzdXBlci5vbkNsaWNrKGV2KTtcclxuXHRcdGlmKGV2KSBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdGlmICh0aGlzID09IGdldEFjdGl2ZSgpKSB7XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWQgPSBib29sZWFuLnRvZ2dsZSh0aGlzLnNlbGVjdGVkKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9wdGlvbjsiLCJpbXBvcnQgVGV4dGJveCBmcm9tIFwiLi9UZXh0Ym94XCI7XG5cbi8qKlxuICogQGV4dGVuZHMgVGV4dGJveFxuICovXG5jbGFzcyBTZWFyY2hib3ggZXh0ZW5kcyBUZXh0Ym94IHtcblx0LyoqXG5cdCAqICMjIyMgRXhhbXBsZVxuXHQgKiBcblx0ICogPGRpdiByb2xlPVwic2VhcmNoYm94XCIgY29udGVudGVkaXRhYmxlPjwvZGl2PlxuXHQgKiBcblx0ICogYGBgaHRtbFxuXHQgKiA8ZGl2IHJvbGU9XCJzZWFyY2hib3hcIiBjb250ZW50ZWRpdGFibGU+PC9kaXY+XG5cdCAqIGBgYFxuXHQgKiBcblx0ICogQHBhcmFtIHsqfSBhcmdzIFxuXHQgKi9cblx0Y29uc3RydWN0b3IoLi4uYXJncykgeyBzdXBlciguLi5hcmdzKTsgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hib3g7IiwiaW1wb3J0IG9iamVjdFBhdGggZnJvbSBcIm9iamVjdC1wYXRoXCI7XG5pbXBvcnQgZWxlbWVudHMgZnJvbSBcIi4uL3V0aWxzL2VsZW1lbnRzXCI7XG5pbXBvcnQgQmFzZSBmcm9tIFwiLi8uLi9yb2xlL0Jhc2UuanNcIjtcblxuLy8gVHlwZXNcbmltcG9ydCBET01TdHJpbmcgZnJvbSBcIi4vRE9NU3RyaW5nXCI7XG5pbXBvcnQgQWNjZXNzaWJsZU5vZGVMaXN0IGZyb20gXCIuL0FjY2Vzc2libGVOb2RlTGlzdFwiO1xuaW1wb3J0IGJvb2xlYW4gZnJvbSBcIi4vYm9vbGVhblwiO1xuaW1wb3J0IGRvdWJsZSBmcm9tIFwiLi9kb3VibGVcIjtcbmltcG9ydCBsb25nIGZyb20gXCIuL2xvbmdcIjtcblxuLyoqXG4gKiBCYXNlZCBvbiB0aGUgQU9NIHNwZWNcbiAqIEBjbGFzc1xuICogQGV4dGVuZHMgQmFzZVxuICovXG5jbGFzcyBBY2Nlc3NpYmxlTm9kZSBleHRlbmRzIEJhc2Uge1xuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0c3VwZXIoLi4uYXJncyk7XG5cblx0XHQvKiAqKioqKioqKioqKioqKioqKiogQUNDRVNTSUJMRSBMQUJFTCBBTkQgREVTQ1JJUFRJT04gKioqKioqKioqKioqKioqKioqICovXG5cdFx0XG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyBhbiBsaXN0IHdpdGggQWNjZXNzaWJsZU5vZGUgaW5zdGFuY2VzIHRoYXQgbGFiZWxzIHRoZSBjdXJyZW50IGVsZW1lbnRcblx0XHQgKiBcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNkZXNjcmliZWRCeX1cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtbGFiZWxsZWRieVxuXHRcdCAqIEB0eXBlIHtBY2Nlc3NpYmxlTm9kZUxpc3R9XG5cdFx0ICovXG5cdFx0dGhpcy5sYWJlbGxlZEJ5ID0gbmV3IEFjY2Vzc2libGVOb2RlTGlzdCh0aGlzLCBcImFyaWEtbGFiZWxsZWRCeVwiKTtcblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgYW4gbGlzdCB3aXRoIEFjY2Vzc2libGVOb2RlIGluc3RhbmNlcyB0aGF0IGRlc2NyaWJlcyB0aGUgY3VycmVudCBlbGVtZW50XG5cdFx0ICogXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjbGFiZWxlZEJ5fVxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1kZXNjcmliZWRieVxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHR5cGUge0FjY2Vzc2libGVOb2RlTGlzdH1cblx0XHQgKi9cblx0XHR0aGlzLmRlc2NyaWJlZEJ5ID0gbmV3IEFjY2Vzc2libGVOb2RlTGlzdCh0aGlzLCBcImFyaWEtZGVzY3JpYmVkQnlcIik7XG5cblx0XHQvKiAqKioqKioqKioqKioqKiBFTkQgT0YgQUNDRVNTSUJMRSBMQUJFTCBBTkQgREVTQ1JJUFRJT04gKioqKioqKioqKioqKiogKi9cblxuXHRcdC8qICoqKioqKioqKioqKioqKioqKioqKioqKiBPVEhFUiBSRUxBVElPTlNISVBTICoqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyBhbiBsaXN0IHdpdGggQWNjZXNzaWJsZU5vZGUgaW5zdGFuY2VzIHdob3NlIGNvbnRlbnRzIG9yIHByZXNlbmNlIGFyZSBjb250cm9sbGVkIGJ5XG5cdFx0ICogdGhlIGN1cnJlbnQgZWxlbWVudC5cblx0XHQgKiBcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNvd25zfVxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1jb250cm9sc1xuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHR5cGUge0FjY2Vzc2libGVOb2RlTGlzdH1cblx0XHQgKi9cblx0XHR0aGlzLmNvbnRyb2xzID0gbmV3IEFjY2Vzc2libGVOb2RlTGlzdCh0aGlzLCBcImFyaWEtY29udHJvbHNcIik7XG5cblx0XHQvKipcblx0XHQgKiBDb250YWlucyB0aGUgbmV4dCBlbGVtZW50KHMpIGluIGFuIGFsdGVybmF0ZSByZWFkaW5nIG9yZGVyIG9mIGNvbnRlbnQgd2hpY2gsIGF0IHRoZSB1c2VyJ3MgXG5cdFx0ICogZGlzY3JldGlvbiwgYWxsb3dzIGFzc2lzdGl2ZSB0ZWNobm9sb2d5IHRvIG92ZXJyaWRlIHRoZSBnZW5lcmFsIGRlZmF1bHQgb2YgcmVhZGluZyBpblxuXHRcdCAqIGRvY3VtZW50IHNvdXJjZSBvcmRlci5cblx0XHQgKiBcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtZmxvd3RvXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAdHlwZSB7QWNjZXNzaWJsZU5vZGVMaXN0fVxuXHRcdCAqL1xuXHRcdHRoaXMuZmxvd1RvID0gbmV3IEFjY2Vzc2libGVOb2RlTGlzdCh0aGlzLCBcImFyaWEtZmxvd3RvXCIpO1xuXG5cdFx0LyoqXG5cdFx0ICogQ29udGFpbnMgY2hpbGRyZW4gd2hvJ3MgSUQgYXJlIHJlZmVyZW5jZWQgaW5zaWRlIHRoZSBgYXJpYS1vd25zYCBhdHRyaWJ1dGVcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtb3duc1xuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHR5cGUge0FjY2Vzc2libGVOb2RlTGlzdH1cblx0XHQgKi9cblx0XHR0aGlzLm93bnMgPSBuZXcgQWNjZXNzaWJsZU5vZGVMaXN0KHRoaXMsIFwiYXJpYS1vd25zXCIpO1xuXHRcdFxuXHRcdC8qICoqKioqKioqKioqKioqKioqKioqKiBFTkQgT0YgT1RIRVIgUkVMQVRJT05TSElQUyAqKioqKioqKioqKioqKioqKioqKiogKi9cblxuXHRcdHRoaXMuXy5tdXRhdGlvbnMucHVzaChbXCJyb2xlXCIsIFwiYXJpYS1hY3RpdmVkZXNjZW5kYW50XCIsIFwiYXJpYS1hdG9taWNcIiwgXCJhcmlhLWF1dG9jb21wbGV0ZVwiLFxuXHRcdFx0XCJhcmlhLWJ1c3lcIiwgXCJhcmlhLWNoZWNrZWRcIiwgXCJhcmlhLWNvbGNvdW50XCIsIFwiYXJpYS1jb2xpbmRleFwiLCBcImFyaWEtY29sc3BhblwiLCBcImFyaWEtY29udHJvbHNcIixcblx0XHRcdFwiYXJpYS1jdXJyZW50XCIsIFwiYXJpYS1kZXNjcmliZWRieVwiLCBcImFyaWEtZGV0YWlsc1wiLCBcImFyaWEtZGlzYWJsZWRcIiwgXCJhcmlhLWRyb3BlZmZlY3RcIixcblx0XHRcdFwiYXJpYS1lcnJvcm1lc3NhZ2VcIiwgXCJhcmlhLWV4cGFuZGVkXCIsIFwiYXJpYS1mbG93dG9cIiwgXCJhcmlhLWdyYWJiZWRcIiwgXCJhcmlhLWhhc3BvcHVwXCIsXG5cdFx0XHRcImFyaWEtaGlkZGVuXCIsIFwiYXJpYS1pbnZhbGlkXCIsIFwiYXJpYS1rZXlzaG9ydGN1dHNcIiwgXCJhcmlhLWxhYmVsXCIsIFwiYXJpYS1sYWJlbGxlZGJ5XCIsXG5cdFx0XHRcImFyaWEtbGV2ZWxcIiwgXCJhcmlhLWxpdmVcIiwgXCJhcmlhLW1vZGFsXCIsIFwiYXJpYS1tdWx0aWxpbmVcIiwgXCJhcmlhLW11bHRpc2VsZWN0YWJsZVwiLFxuXHRcdFx0XCJhcmlhLW9yaWVudGF0aW9uXCIsIFwiYXJpYS1vd25zXCIsIFwiYXJpYS1wbGFjZWhvbGRlclwiLCBcImFyaWEtcG9zaW5zZXRcIiwgXCJhcmlhLXByZXNzZWRcIixcblx0XHRcdFwiYXJpYS1yZWFkb25seVwiLCBcImFyaWEtcmVsZXZhbnRcIiwgXCJhcmlhLXJlcXVpcmVkXCIsIFwiYXJpYS1yb2xlZGVzY3JpcHRpb25cIiwgXCJhcmlhLXJvd2NvdW50XCIsXG5cdFx0XHRcImFyaWEtcm93aW5kZXhcIiwgXCJhcmlhLXJvd3NwYW5cIiwgXCJhcmlhLXNlbGVjdGVkXCIsIFwiYXJpYS1zZXRzaXplXCIsIFwiYXJpYS1zb3J0XCIsIFwiYXJpYS12YWx1ZW1heFwiLFxuXHRcdFx0XCJhcmlhLXZhbHVlbWluXCIsIFwiYXJpYS12YWx1ZW5vd1wiLCBcImFyaWEtdmFsdWV0ZXh0XCJdKTtcblx0fVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhBY2Nlc3NpYmxlTm9kZS5wcm90b3R5cGUsIFxuXHQvKiogQGxlbmRzIEFjY2Vzc2libGVOb2RlLnByb3RvdHlwZSAqL1xuXHR7XG5cdFx0LyoqIFxuXHRcdCogRGVmaW5lcyBhIHR5cGUgaXQgcmVwcmVzZW50cywgZS5nLiBgdGFiYFxuXHRcdCogXG5cdFx0KiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI3JvbGVzXG5cdFx0KiBAdHlwZSAgez9TdHJpbmd9XG5cdFx0Ki9cblx0XHRcInJvbGVcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJyb2xlXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwicm9sZVwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKiogXG5cdFx0ICogRGVmaW5lcyBhIGh1bWFuLXJlYWRhYmxlLCBhdXRob3ItbG9jYWxpemVkIGRlc2NyaXB0aW9uIGZvciB0aGUgcm9sZVxuXHRcdCAqIFxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1yb2xlZGVzY3JpcHRpb25cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEB0eXBlIHs/U3RyaW5nfVxuXHRcdCAqL1xuXHRcdFwicm9sZURlc2NyaXB0aW9uXCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQoc3RyKSB7IHJldHVybiBET01TdHJpbmcuc2V0KHRoaXMsIFwiYXJpYS1yb2xlRGVzY3JpcHRpb25cIiwgc3RyKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIERPTVN0cmluZy5nZXQodGhpcywgXCJhcmlhLXJvbGVEZXNjcmlwdGlvblwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKiAqKioqKioqKioqKioqKioqKioqIEFDQ0VTU0lCTEUgTEFCRUwgQU5EIERFU0NSSVBUSU9OICoqKioqKioqKioqKioqKioqKiogKi9cblx0XG5cdFx0LyoqIFxuXHRcdCogRGVmaW5lcyBhIHN0cmluZyB2YWx1ZSB0aGF0IGxhYmVscyB0aGUgY3VycmVudCBlbGVtZW50LlxuXHRcdCogXG5cdFx0KiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtbGFiZWxcblx0XHQqIEB0eXBlIHs/U3RyaW5nfSBcblx0XHQqL1xuXHRcdFwibGFiZWxcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJhcmlhLWxhYmVsXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1sYWJlbFwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKiAqKioqKioqKioqKioqKiogRU5EIE9GIEFDQ0VTU0lCTEUgTEFCRUwgQU5EIERFU0NSSVBUSU9OICoqKioqKioqKioqKioqKiAqL1xuXHRcblx0XHQvKiAqKioqKioqKioqKioqKioqKioqKiogR0xPQkFMIFNUQVRFUyBBTkQgUFJPUEVSVElFUyAqKioqKioqKioqKioqKioqKioqKiogKi9cblxuXHRcdC8qKiBcblx0XHQgKiBJbmRpY2F0ZXMgdGhlIGVsZW1lbnQgdGhhdCByZXByZXNlbnRzIHRoZSBjdXJyZW50IGl0ZW0gd2l0aGluIGEgY29udGFpbmVyIG9yIHNldCBvZiByZWxhdGVkIGVsZW1lbnRzLlxuXHRcdCAqIFxuXHRcdCAqIFBvc3NpYmxlIHN0cmluZ3MgYXJlOlxuXHRcdCAqICogYHBhZ2VgLCB1c2VkIHRvIGluZGljYXRlIGEgbGluayB3aXRoaW4gYSBzZXQgb2YgcGFnaW5hdGlvbiBsaW5rcywgXG5cdFx0ICogXHRcdHdoZXJlIHRoZSBsaW5rIGlzIHZpc3VhbGx5IHN0eWxlZCB0byByZXByZXNlbnQgdGhlIGN1cnJlbnRseS1kaXNwbGF5ZWQgcGFnZS5cblx0XHQgKiAqIGBzdGVwYCwgdXNlZCB0byBpbmRpY2F0ZSBhIGxpbmsgd2l0aGluIGEgc3RlcCBpbmRpY2F0b3IgZm9yIGEgc3RlcC1iYXNlZCBwcm9jZXNzLFxuXHRcdCAqIFx0XHR3aGVyZSB0aGUgbGluayBpcyB2aXN1YWxseSBzdHlsZWQgdG8gcmVwcmVzZW50IHRoZSBjdXJyZW50IHN0ZXAuXG5cdFx0ICogKiBgbG9jYXRpb25gLCB1c2VkIHRvIGluZGljYXRlIHRoZSBpbWFnZSB0aGF0IGlzIHZpc3VhbGx5IGhpZ2hsaWdodGVkIGFzIHRoZSBjdXJyZW50IGNvbXBvbmVudCBvZiBhIGZsb3cgY2hhcnQuXG5cdFx0ICogKiBgZGF0ZWAsIHVzZWQgdG8gaW5kaWNhdGUgdGhlIGN1cnJlbnQgZGF0ZSB3aXRoaW4gYSBjYWxlbmRhci5cblx0XHQgKiAqIGB0aW1lYCwgdXNlZCB0byBpbmRpY2F0ZSB0aGUgY3VycmVudCB0aW1lIHdpdGhpbiBhIHRpbWV0YWJsZS5cblx0XHQgKiBcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtY3VycmVudFxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHR5cGUgez9TdHJpbmd9XG5cdFx0ICovXG5cdFx0XCJjdXJyZW50XCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQoc3RyKSB7IHJldHVybiBET01TdHJpbmcuc2V0KHRoaXMsIFwiYXJpYS1jdXJyZW50XCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1jdXJyZW50XCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qICoqKioqKioqKioqKioqKioqIEVORCBPRiBHTE9CQUwgU1RBVEVTIEFORCBQUk9QRVJUSUVTICoqKioqKioqKioqKioqKioqICovXG5cblx0XHQvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKiBXSURHRVQgUFJPUEVSVElFUyAqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5cdFx0LyoqXG5cdFx0ICogSW5kaWNhdGVzIHdoZXRoZXIgaW5wdXR0aW5nIHRleHQgY291bGQgdHJpZ2dlciBkaXNwbGF5IG9mIG9uZSBvciBtb3JlIHByZWRpY3Rpb25zIG9mIHRoZSB1c2VyJ3Ncblx0XHQgKiBpbnRlbmRlZCB2YWx1ZSBmb3IgYW4gaW5wdXQgYW5kIHNwZWNpZmllcyBob3cgcHJlZGljdGlvbnMgd291bGQgYmUgcHJlc2VudGVkIGlmIHRoZXkgYXJlIG1hZGUuXG5cdFx0ICogXG5cdFx0ICogVGhlIGJlaGF2aW9yIGR1cmluZyBpbnB1dCBpcyBkZXBlbmRzIG9uIHRoZSBwcm92aWRlZCB2YWx1ZSwgaXQgZm9sbG93cyBiZW5lYXRoIHRhYmxlLlxuXHRcdCAqIFxuXHRcdCAqIHwgVmFsdWUgIHwgXHREZXNjcmlwdGlvbiB8XG5cdFx0ICogfCAtLS0tLS0gfCAtLS0gfFxuXHRcdCAqIHwgaW5saW5lIHwgVGV4dCBzdWdnZXN0aW5nIG1heSBiZSBkeW5hbWljYWxseSBpbnNlcnRlZCBhZnRlciB0aGUgY2FyZXQuXG5cdFx0ICogfCBsaXN0ICAgfCBBIGNvbGxlY3Rpb24gb2YgdmFsdWVzIHRoYXQgY291bGQgY29tcGxldGUgdGhlIHByb3ZpZGVkIGlucHV0IGlzIGRpc3BsYXllZC5cblx0XHQgKiB8IGJvdGggICB8IEltcGxlbWVudHMgYGlubGluZWAgYW5kIGBsaXN0YFxuXHRcdCAqIHwgbm9uZSAgIHwgTm8gcHJlZGljdGlvbiBpcyBzaG93blxuXHRcdCAqIFxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1hdXRvY29tcGxldGVcblx0XHQgKiBAdHlwZSB7P1N0cmluZ31cblx0XHQgKi9cblx0XHRcImF1dG9jb21wbGV0ZVwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHN0cikgeyByZXR1cm4gRE9NU3RyaW5nLnNldCh0aGlzLCBcImFyaWEtYXV0b2NvbXBsZXRlXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1hdXRvY29tcGxldGVcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucy9zZXRzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBlbGVtZW50IHdobyBpcyBleHBvc2VkIHRvIGFuIGFjY2Vzc2liaWxpdHkgQVBJLlxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI2Rpc2FibGVkfVxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1oaWRkZW5cblx0XHQgKiBAdHlwZSB7P0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0XCJoaWRkZW5cIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIGJvb2xlYW4uc2V0KHRoaXMsIFwiYXJpYS1oaWRkZW5cIiwgc3RyKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGJvb2xlYW4uZ2V0KHRoaXMsIFwiYXJpYS1oaWRkZW5cIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogSW5kaWNhdGVzIGtleWJvYXJkIHNob3J0Y3V0cyB0aGF0IGFuIGF1dGhvciBoYXMgaW1wbGVtZW50ZWQgdG8gYWN0aXZhdGUgb3Jcblx0XHQgKiBnaXZlIGZvY3VzIHRvIGFuIGVsZW1lbnQuXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWtleXNob3J0Y3V0c1xuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHR5cGUgez9TdHJpbmd9XG5cdFx0ICovXG5cdFx0XCJrZXlTaG9ydGN1dHNcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJhcmlhLWtleVNob3J0Y3V0c1wiLCBzdHIpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gRE9NU3RyaW5nLmdldCh0aGlzLCBcImFyaWEta2V5U2hvcnRjdXRzXCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qKiBcblx0XHQgKiBJbmRpY2F0ZXMgd2hldGhlciBhbiBlbGVtZW50IGlzIG1vZGFsIHdoZW4gZGlzcGxheWVkLlxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1tb2RhbFxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHR5cGUgez9Cb29sZWFufVxuXHRcdCAqL1xuXHRcdFwibW9kYWxcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIGJvb2xlYW4uc2V0KHRoaXMsIFwiYXJpYS1tb2RhbFwiLCBzdHIpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gYm9vbGVhbi5nZXQodGhpcywgXCJhcmlhLW1vZGFsXCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qKiBcblx0XHQgKiBJbmRpY2F0ZXMgd2hldGhlciBhIHRleHQgYm94IGFjY2VwdHMgbXVsdGlwbGUgbGluZXMgb2YgaW5wdXQgb3Igb25seSBhIHNpbmdsZSBsaW5lLlxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1tdWx0aWxpbmVcblx0XHQgKiBAdHlwZSB7P0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0XCJtdWx0aWxpbmVcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIGJvb2xlYW4uc2V0KHRoaXMsIFwiYXJpYS1tdWx0aWxpbmVcIiwgc3RyKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGJvb2xlYW4uZ2V0KHRoaXMsIFwiYXJpYS1tdWx0aWxpbmVcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogSW5kaWNhdGVzIHRoYXQgdGhlIHVzZXIgbWF5IHNlbGVjdCBtb3JlIHRoYW4gb25lIGl0ZW0gZnJvbSB0aGUgY3VycmVudCBzZWxlY3RhYmxlIGRlc2NlbmRhbnRzLlxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1tdWx0aXNlbGVjdGFibGVcblx0XHQgKiBAdHlwZSB7P0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0XCJtdWx0aXNlbGVjdGFibGVcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIGJvb2xlYW4uc2V0KHRoaXMsIFwiYXJpYS1tdWx0aXNlbGVjdGFibGVcIiwgc3RyKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGJvb2xlYW4uZ2V0KHRoaXMsIFwiYXJpYS1tdWx0aXNlbGVjdGFibGVcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGVsZW1lbnQncyBvcmllbnRhdGlvbiBpcyBgaG9yaXpvbnRhbGAsIGB2ZXJ0aWNhbGAsIG9yIGBudWxsYC5cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtb3JpZW50YXRpb25cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEB0eXBlIHs/U3RyaW5nfVxuXHRcdCAqL1xuXHRcdFwib3JpZW50YXRpb25cIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJhcmlhLW9yaWVudGF0aW9uXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1vcmllbnRhdGlvblwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBJbmRpY2F0ZXMgdGhhdCB0aGUgdXNlciBtYXkgc2VsZWN0IG1vcmUgdGhhbiBvbmUgaXRlbSBmcm9tIHRoZSBjdXJyZW50IHNlbGVjdGFibGUgZGVzY2VuZGFudHMuXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXJlYWRvbmx5XG5cdFx0ICogQHR5cGUgez9Cb29sZWFufVxuXHRcdCAqL1xuXHRcdFwicmVhZE9ubHlcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIGJvb2xlYW4uc2V0KHRoaXMsIFwiYXJpYS1yZWFkT25seVwiLCBzdHIpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gYm9vbGVhbi5nZXQodGhpcywgXCJhcmlhLXJlYWRPbmx5XCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEluZGljYXRlcyB0aGF0IHVzZXIgaW5wdXQgaXMgcmVxdWlyZWQgb24gdGhlIGVsZW1lbnQgYmVmb3JlIGEgZm9ybSBtYXkgYmUgc3VibWl0dGVkLlxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1yZXF1aXJlZFxuXHRcdCAqIEB0eXBlIHs/Qm9vbGVhbn1cblx0XHQgKi9cblx0XHRcInJlcXVpcmVkXCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQoc3RyKSB7IHJldHVybiBib29sZWFuLnNldCh0aGlzLCBcImFyaWEtcmVxdWlyZWRcIiwgc3RyKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGJvb2xlYW4uZ2V0KHRoaXMsIFwiYXJpYS1yZXF1aXJlZFwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBJbmRpY2F0ZXMgdGhhdCB1c2VyIGlucHV0IGlzIHJlcXVpcmVkIG9uIHRoZSBlbGVtZW50IGJlZm9yZSBhIGZvcm0gbWF5IGJlIHN1Ym1pdHRlZC5cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtc2VsZWN0ZWRcblx0XHQgKiBAdHlwZSB7P0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0XCJzZWxlY3RlZFwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHN0cikgeyByZXR1cm4gYm9vbGVhbi5zZXQodGhpcywgXCJhcmlhLXNlbGVjdGVkXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBib29sZWFuLmdldCh0aGlzLCBcImFyaWEtc2VsZWN0ZWRcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogSW5kaWNhdGVzIGlmIGl0ZW1zIGluIGEgdGFibGUgb3IgZ3JpZCBhcmUgc29ydGVkIGluIGFzY2VuZGluZyBvciBkZXNjZW5kaW5nIG9yZGVyLiAgXG5cdFx0ICogUG9zc2libGUgdmFsdWVzIGFyZSBgYWNlbmRpbmdgLCBgZGVzY2VuZGluZ2AsIGBub25lYCwgYG90aGVyYCBvciBgbnVsbGAuXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXNvcnRcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEB0eXBlIHs/Qm9vbGVhbn1cblx0XHQgKi9cblx0XHRcInNvcnRcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJhcmlhLXNvcnRcIiwgc3RyKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIERPTVN0cmluZy5nZXQodGhpcywgXCJhcmlhLXNvcnRcIik7IH1cblx0XHR9LFxuXG5cdFx0LyogKioqKioqKioqKioqKioqKioqKioqKiogRU5EIE9GIFdJREdFVCBQUk9QRVJUSUVTICoqKioqKioqKioqKioqKioqKioqKioqICovXG5cblxuXHRcdC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqIFdJREdFVCBTVEFURVMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5cdFx0LyoqXG5cdFx0ICogSW5kaWNhdGVzIHRoZSBjdXJyZW50IFwiY2hlY2tlZFwiIHN0YXRlIG9mIGEge0BsaW5rIFdpZGdldH0sIGFtb25nIHtAbGluayBSYWRpb30gYW5kIHtAbGluayBDaGVja2JveH1cblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNwcmVzc2VkfVxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI3NlbGVjdGVkfVxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1wcmVzc2VkXG5cdFx0ICogQHR5cGUgez9TdHJpbmd9XG5cdFx0ICovXG5cdFx0XCJjaGVja2VkXCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQoc3RyKSB7IHJldHVybiBET01TdHJpbmcuc2V0KHRoaXMsIFwiYXJpYS1jaGVja2VkXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1jaGVja2VkXCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBlbGVtZW50LCBvciBhbm90aGVyIGdyb3VwaW5nIGVsZW1lbnQgaXQgY29udHJvbHMsIFxuXHRcdCAqIGlzIGN1cnJlbnRseSBleHBhbmRlZCBvciBjb2xsYXBzZWQuXG5cdFx0ICogXG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWV4cGFuZGVkXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAdHlwZSB7P0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0XCJleHBhbmRlZFwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHN0cikgeyByZXR1cm4gYm9vbGVhbi5zZXQodGhpcywgXCJhcmlhLWV4cGFuZGVkXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBib29sZWFuLmdldCh0aGlzLCBcImFyaWEtZXhwYW5kZWRcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogSW5kaWNhdGVzIHRoYXQgdGhlIGVsZW1lbnQgaXMgcGVyY2VpdmFibGUgYnV0IGRpc2FibGVkLCBzbyBpdCBpcyBub3QgZWRpdGFibGUgb3Igb3RoZXJ3aXNlIG9wZXJhYmxlLlxuXHRcdCAqIFxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI2hpZGRlbn1cblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNyZWFkb25seX1cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtZGlzYWJsZWRcblx0XHQgKiBAdHlwZSB7P0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0XCJkaXNhYmxlZFwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHN0cikgeyByZXR1cm4gYm9vbGVhbi5zZXQodGhpcywgXCJhcmlhLWRpc2FibGVkXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBib29sZWFuLmdldCh0aGlzLCBcImFyaWEtZGlzYWJsZWRcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogSW5kaWNhdGVzIHRoZSBlbnRlcmVkIHZhbHVlIGRvZXMgbm90IGNvbmZvcm0gdG8gdGhlIGZvcm1hdCBleHBlY3RlZCBieSB0aGUgYXBwbGljYXRpb24uXG5cdFx0ICogXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjZXJyb3JNZXNzYWdlfVxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1lcnJvcm1lc3NhZ2Vcblx0XHQgKiBAdHlwZSB7P1N0cmluZ30gXG5cdFx0ICovXG5cdFx0XCJpbnZhbGlkXCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQoc3RyKSB7IHJldHVybiBET01TdHJpbmcuc2V0KHRoaXMsIFwiYXJpYS1pbnZhbGlkXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1pbnZhbGlkXCIpOyB9XG5cdFx0fSxcblxuXG5cdFx0LyoqXG5cdFx0ICogSW5kaWNhdGVzIHRoZSBhdmFpbGFiaWxpdHkgYW5kIHR5cGUgb2YgaW50ZXJhY3RpdmUgcG9wdXAgZWxlbWVudCwgc3VjaCBhcyBtZW51IG9yIGRpYWxvZyxcblx0XHQgKiB0aGF0IGNhbiBiZSB0cmlnZ2VyZWQgYnkgYW4gZWxlbWVudC5cblx0XHQgKiBcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtaGFzcG9wdXBcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEB0eXBlIHs/U3RyaW5nfVxuXHRcdCAqL1xuXHRcdFwiaGFzUG9wVXBcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJhcmlhLWhhc3BvcHVwXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1oYXNwb3B1cFwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBJbmRpY2F0ZXMgdGhlIGN1cnJlbnQgXCJjaGVja2VkXCIgc3RhdGUgb2YgYSB7QGxpbmsgV2lkZ2V0fSwgYW1vbmcge0BsaW5rIFJhZGlvfSBhbmQge0BsaW5rIENoZWNrYm94fVxuXHRcdCAqIFxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI3ByZXNzZWR9XG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjc2VsZWN0ZWR9XG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXByZXNzZWRcblx0XHQgKiBAdHlwZSB7P1N0cmluZ31cblx0XHQgKi9cblx0XHRcInByZXNzZWRcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJhcmlhLXByZXNzZWRcIiwgc3RyKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIERPTVN0cmluZy5nZXQodGhpcywgXCJhcmlhLXByZXNzZWRcIik7IH1cblx0XHR9LFxuXG5cdFx0LyogKioqKioqKioqKioqKioqKioqKioqKioqKiBFTkQgT0YgV0lER0VUIFNUQVRFUyAqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5cblxuXHRcdC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKiogQ09OVFJPTCBWQUxVRVMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5cdFx0LyoqIFxuXHRcdCAqIFJldHVybnMgLyBzZXRzIHRoZSBodW1hbiByZWFkYWJsZSB0ZXh0IGFsdGVybmF0aXZlIG9mIHtAbGluayAjYXJpYS12YWx1ZW5vd30gZm9yIGEge0BsaW5rIFJhbmdlfSB3aWRnZXQuXG5cdFx0ICogXG5cdFx0ICogQHNlZSB7QGxpbmsgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS12YWx1ZXRleHR9XG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAdHlwZSB7P1N0cmluZ31cblx0XHQgKi9cblx0XHRcInZhbHVlVGV4dFwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHN0cikgeyByZXR1cm4gRE9NU3RyaW5nLnNldCh0aGlzLCBcImFyaWEtdmFsdWVUZXh0XCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS12YWx1ZVRleHRcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyAvIHNldHMgYSBzaG9ydCBoaW50IGludGVuZGVkIHRvIGFpZCB0aGUgdXNlciB3aXRoIGRhdGEgZW50cnkgd2hlbiB0aGUgY29udHJvbCBoYXMgbm8gdmFsdWUuXG5cdFx0ICogQSBoaW50IGNvdWxkIGJlIGEgc2FtcGxlIHZhbHVlIG9yIGEgYnJpZWYgZGVzY3JpcHRpb24gb2YgdGhlIGV4cGVjdGVkIGZvcm1hdC5cblx0XHQgKiBcblx0XHQgKiBAc2VlIHtAbGluayBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXBsYWNlaG9sZGVyfVxuXHRcdCAqIEB0eXBlIHs/U3RyaW5nfVxuXHRcdCAqL1xuXHRcdFwicGxhY2Vob2xkZXJcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldChzdHIpIHsgcmV0dXJuIERPTVN0cmluZy5zZXQodGhpcywgXCJhcmlhLXBsYWNlaG9sZGVyXCIsIHN0cik7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBET01TdHJpbmcuZ2V0KHRoaXMsIFwiYXJpYS1wbGFjZWhvbGRlclwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKiogXG5cdFx0ICogUmV0dXJucyAvIHNldHMgdGhlIGN1cnJlbnQgdmFsdWUgZm9yIGEge0BsaW5rIFJhbmdlfSB3aWRnZXQuXG5cdFx0ICogXG5cdFx0ICogQHNlZSB7QGxpbmsgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS12YWx1ZW5vd31cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEB0eXBlIHs/TnVtYmVyfVxuXHRcdCAqL1xuXHRcdFwidmFsdWVOb3dcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldCh2YWwpIHsgcmV0dXJuIGRvdWJsZS5zZXQodGhpcywgXCJhcmlhLXZhbHVlbm93XCIsIHZhbCk7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBkb3VibGUuZ2V0KHRoaXMsIFwiYXJpYS12YWx1ZW5vd1wiKTsgfVxuXHRcdH0sXG5cblx0XHQvKiogXG5cdFx0ICogUmV0dXJucyAvIHNldHMgdGhlIG1pbmltdW0gYWxsb3dlZCB2YWx1ZSBmb3IgYSB7QGxpbmsgUmFuZ2V9IHdpZGdldC5cblx0XHQgKiBcblx0XHQgKiBAc2VlIHtAbGluayBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLXZhbHVlbWlufVxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHR5cGUgez9OdW1iZXJ9XG5cdFx0ICovXG5cdFx0XCJ2YWx1ZU1pblwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHZhbCkgeyByZXR1cm4gZG91YmxlLnNldCh0aGlzLCBcImFyaWEtdmFsdWVtaW5cIiwgdmFsKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGRvdWJsZS5nZXQodGhpcywgXCJhcmlhLXZhbHVlbWluXCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qKiBcblx0XHQgKiBSZXR1cm5zIC8gc2V0cyB0aGUgbWF4aW11bSBhbGxvd2VkIHZhbHVlIGZvciBhIHtAbGluayBSYW5nZX0gd2lkZ2V0LlxuXHRcdCAqIFxuXHRcdCAqIEBzZWUge0BsaW5rIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtdmFsdWVtYXh9XG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAdHlwZSB7P051bWJlcn1cblx0XHQgKi9cblx0XHRcInZhbHVlTWF4XCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQodmFsKSB7IHJldHVybiBkb3VibGUuc2V0KHRoaXMsIFwiYXJpYS12YWx1ZW1heFwiLCB2YWwpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gZG91YmxlLmdldCh0aGlzLCBcImFyaWEtdmFsdWVtYXhcIik7IH1cblx0XHR9LFxuXG5cdFx0LyogKioqKioqKioqKioqKioqKioqKioqKioqIEVORCBPRiBDT05UUk9MIFZBTFVFUyAqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuXHRcdC8qICoqKioqKioqKioqKioqKioqKioqKioqKiogT1RIRVIgUkVMQVRJT05TSElQUyAqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIC8gc2V0cyB0aGUgQWNjZXNzaWJsZU5vZGUgb2YgdGhlIGN1cnJlbnRseSBhY3RpdmUgZWxlbWVudCB3aGVuIGZvY3VzIGlzIG9uIGN1cnJlbnQgZWxlbWVudC5cblx0XHQgKiBcblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtYWN0aXZlZGVzY2VuZGFudFxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHR5cGUgez9BY2NjZXNzaWJsZU5vZGV9XG5cdFx0ICovXG5cdFx0XCJhY3RpdmVEZXNjZW5kYW50XCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQoYXkpIHsgcmV0dXJuIHNldEFjY2Vzc2libGVOb2RlKHRoaXMsIFwiYXJpYS1hY3RpdmVkZXNjZW5kYW50XCIsIGF5KTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGdldEFjY2Vzc2libGVOb2RlKHRoaXMsIFwiYXJpYS1hY3RpdmVkZXNjZW5kYW50XCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgLyBzZXRzIGFuIEFjY2Vzc2libGVOb2RlIHRoYXQgcHJvdmlkZXMgYSBkZXRhaWxlZCwgZXh0ZW5kZWQgZGVzY3JpcHRpb24gXG5cdFx0ICogZm9yIHRoZSBjdXJyZW50IGVsZW1lbnQuXG5cdFx0ICogXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjZGVzY3JpYmVkQnl9XG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWRldGFpbHNcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEB0eXBlIHs/QWNjY2Vzc2libGVOb2RlfVxuXHRcdCAqL1xuXHRcdFwiZGV0YWlsc1wiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KGF5KSB7IHJldHVybiBzZXRBY2Nlc3NpYmxlTm9kZSh0aGlzLCBcImFyaWEtZGV0YWlsc1wiLCBheSk7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBnZXRBY2Nlc3NpYmxlTm9kZSh0aGlzLCBcImFyaWEtZGV0YWlsc1wiKTsgfVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIC8gc2V0cyBhbiBBY2Nlc3NpYmxlTm9kZSB0aGF0IHByb3ZpZGVzIGFuIGVycm9yIG1lc3NhZ2UgZm9yIHRoZSBjdXJyZW50IGVsZW1lbnQuXG5cdFx0ICogXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjaW52YWxpZH1cblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNkZXNjcmliZWRCeX1cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtZXJyb3JtZXNzYWdlXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAdHlwZSB7P0FjY2Nlc3NpYmxlTm9kZX1cblx0XHQgKi9cblx0XHRcImVycm9yTWVzc2FnZVwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KGF5KSB7IHJldHVybiBzZXRBY2Nlc3NpYmxlTm9kZSh0aGlzLCBcImFyaWEtZXJyb3JtZXNzYWdlXCIsIGF5KTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGdldEFjY2Vzc2libGVOb2RlKHRoaXMsIFwiYXJpYS1lcnJvcm1lc3NhZ2VcIik7IH1cblx0XHR9LFxuXG5cdFx0LyogKioqKioqKioqKioqKioqKioqKioqKiBFTkQgT0YgT1RIRVIgUkVMQVRJT05TSElQUyAqKioqKioqKioqKioqKioqKioqKioqICovXG5cblx0XHQvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiBDT0xMRUNUSU9OUyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyAvIHNldHMgdGhlIHRvdGFsIG51bWJlciBvZiBjb2x1bW5zIGluIGEge0BsaW5rIFRhYmxlfSwge0BsaW5rIEdyaWR9LCBvciB7QGxpbmsgVHJlZWdyaWR9LlxuXHRcdCAqIFxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI2NvbEluZGV4fVxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1zZXRzaXplXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAdHlwZSB7P0ludGVnZXJ9XG5cdFx0ICovXG5cdFx0XCJjb2xDb3VudFwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHZhbCkgeyByZXR1cm4gbG9uZy5zZXQodGhpcywgXCJhcmlhLWNvbGNvdW50XCIsIHZhbCk7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBsb25nLmdldCh0aGlzLCBcImFyaWEtY29sY291bnRcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogRGVmaW5lcyBhbiBlbGVtZW50J3MgY29sdW1uIGluZGV4IG9yIHBvc2l0aW9uIHdpdGggcmVzcGVjdCB0byB0aGUgdG90YWwgbnVtYmVyIG9mIGNvbHVtbnMgXG5cdFx0ICogd2l0aGluIGEge0BsaW5rIFRhYmxlfSwge0BsaW5rIEdyaWR9LCBvciB7QGxpbmsgVHJlZWdyaWR9LlxuXHRcdCAqIFxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI2NvbENvdW50fVxuXHRcdCAqIEBzZWUge0BsaW5rIEFjY2Vzc2libGVOb2RlI2NvbFNwYW59XG5cdFx0ICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtMS4xLyNhcmlhLWNvbGluZGV4XG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAdHlwZSB7P0ludGVnZXJ9XG5cdFx0ICovXG5cdFx0XCJjb2xJbmRleFwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHZhbCkgeyByZXR1cm4gbG9uZy5zZXQodGhpcywgXCJhcmlhLWNvbGluZGV4XCIsIHZhbCk7IH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiBsb25nLmdldCh0aGlzLCBcImFyaWEtY29saW5kZXhcIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogRGVmaW5lcyB0aGUgbnVtYmVyIG9mIGNvbHVtbnMgc3Bhbm5lZCBieSBhIGNlbGwgb3IgZ3JpZGNlbGxcblx0XHQgKiB3aXRoaW4gYSB7QGxpbmsgVGFibGV9LCB7QGxpbmsgR3JpZH0sIG9yIHtAbGluayBUcmVlZ3JpZH0uXG5cdFx0ICogXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjY29sSW5kZXh9XG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjcm93U3Bhbn1cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtY29sc3BhblxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHR5cGUgez9JbnRlZ2VyfVxuXHRcdCAqL1xuXHRcdFwiY29sU3BhblwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHZhbCkgeyByZXR1cm4gbG9uZy5zZXQodGhpcywgXCJhcmlhLWNvbHNwYW5cIiwgdmFsKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGxvbmcuZ2V0KHRoaXMsIFwiYXJpYS1jb2xzcGFuXCIpOyB9XG5cdFx0fSxcblx0XHRcdFxuXHRcdC8qKlxuXHRcdCAqIERlZmluZXMgYW4gZWxlbWVudCdzIG51bWJlciBvciBwb3NpdGlvbiBpbiB0aGUgY3VycmVudCBzZXQgb2Yge0BsaW5rIGxpc3RpdGVtfXMgb3Ige0BsaW5rIHRyZWVpdGVtfXMuXG5cdFx0ICogTm90IHJlcXVpcmVkIGlmIGFsbCBlbGVtZW50cyBpbiB0aGUgc2V0IGFyZSBwcmVzZW50IGluIHRoZSBET00uXG5cdFx0ICogXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjc2V0U2l6ZX1cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtcG9zaW5zZXRcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEB0eXBlIHs/SW50ZWdlcn1cblx0XHQgKi9cblx0XHRcInBvc0luU2V0XCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQodmFsKSB7IHJldHVybiBsb25nLnNldCh0aGlzLCBcImFyaWEtcG9zaW5zZXRcIiwgdmFsKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGxvbmcuZ2V0KHRoaXMsIFwiYXJpYS1wb3NpbnNldFwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBEZWZpbmVzIHRoZSB0b3RhbCBudW1iZXIgb2Ygcm93cyBpbiBhIHtAbGluayBUYWJsZX0sIHtAbGluayBHcmlkfSwgb3Ige0BsaW5rIFRyZWVncmlkfS5cblx0XHQgKiBcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNyb3dJbmRleH1cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtcm93Y291bnRcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHR5cGUgez9JbnRlZ2VyfVxuXHRcdCAqL1xuXHRcdFwicm93Q291bnRcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldCh2YWwpIHsgcmV0dXJuIGxvbmcuc2V0KHRoaXMsIFwiYXJpYS1yb3djb3VudFwiLCB2YWwpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gbG9uZy5nZXQodGhpcywgXCJhcmlhLXJvd2NvdW50XCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIERlZmluZXMgYW4gZWxlbWVudCdzIHJvdyBpbmRleCBvciBwb3NpdGlvbiB3aXRoIHJlc3BlY3QgdG8gdGhlIHRvdGFsIG51bWJlciBvZiByb3dzIFxuXHRcdCAqIHdpdGhpbiBhICB7QGxpbmsgVGFibGV9LCB7QGxpbmsgR3JpZH0sIG9yIHtAbGluayBUcmVlZ3JpZH0uXG5cdFx0ICogXG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjcm93Q291bnR9XG5cdFx0ICogQHNlZSB7QGxpbmsgQWNjZXNzaWJsZU5vZGUjcm93U3Bhbn1cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtcm93aW5kZXhcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEB0eXBlIHs/SW50ZWdlcn1cblx0XHQgKi9cblx0XHRcInJvd0luZGV4XCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQodmFsKSB7IHJldHVybiBsb25nLnNldCh0aGlzLCBcImFyaWEtcm93aW5kZXhcIiwgdmFsKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGxvbmcuZ2V0KHRoaXMsIFwiYXJpYS1yb3dpbmRleFwiKTsgfVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBEZWZpbmVzIHRoZSBudW1iZXIgb2Ygcm93cyBzcGFubmVkIGJ5IGEgY2VsbCBvciBncmlkY2VsbFxuXHRcdCAqIHdpdGhpbiBhIHtAbGluayBUYWJsZX0sIHtAbGluayBHcmlkfSwgb3Ige0BsaW5rIFRyZWVncmlkfS5cblx0XHQgKiBcblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNyb3dJbmRleH1cblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNjb2xTcGFufVxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1yb3dzcGFuXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAdHlwZSB7P0ludGVnZXJ9XG5cdFx0ICovXG5cdFx0XCJyb3dTcGFuXCI6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRzZXQodmFsKSB7IHJldHVybiBsb25nLnNldCh0aGlzLCBcImFyaWEtcm93c3BhblwiLCB2YWwpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gbG9uZy5nZXQodGhpcywgXCJhcmlhLXJvd3NwYW5cIik7IH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogRGVmaW5lcyB0aGUgbnVtYmVyIG9mIGl0ZW1zIGluIHRoZSBjdXJyZW50IHNldCBvZiBsaXN0aXRlbXMgb3IgdHJlZWl0ZW1zLlxuXHRcdCAqIE5vdCByZXF1aXJlZCBpZiAqKmFsbCoqIGVsZW1lbnRzIGluIHRoZSBzZXQgYXJlIHByZXNlbnQgaW4gdGhlIERPTS5cblx0XHQgKiBAc2VlIHtAbGluayBBY2Nlc3NpYmxlTm9kZSNwb3NJblNldH1cblx0XHQgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS0xLjEvI2FyaWEtc2V0c2l6ZVxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHR5cGUgez9JbnRlZ2VyfVxuXHRcdCAqL1xuXHRcdFwic2V0U2l6ZVwiOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0c2V0KHZhbCkgeyByZXR1cm4gbG9uZy5zZXQodGhpcywgXCJhcmlhLXNldHNpemVcIiwgdmFsKTsgfSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIGxvbmcuZ2V0KHRoaXMsIFwiYXJpYS1zZXRzaXplXCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIERlZmluZXMgdGhlIGhpZXJhcmNoaWNhbCBsZXZlbCBvZiBhbiBlbGVtZW50IHdpdGhpbiBhIHN0cnVjdHVyZS5cblx0XHQgKiBFLmcuIGAmbHQ7aDEmZ3Q7Jmx0O2gxLyZndDtgIGVxdWFscyBgJmx0O2RpdiByb2xlPVwiaGVhZGluZ1wiIGFyaWEtbGV2ZWw9XCIxXCImZ3Q7Jmx0Oy9kaXY+YFxuXHRcdCAqIFxuXHRcdCAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLTEuMS8jYXJpYS1sZXZlbFxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHR5cGUgez9JbnRlZ2VyfVxuXHRcdCAqL1xuXHRcdFwibGV2ZWxcIjoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHNldCh2YWwpIHsgcmV0dXJuIGxvbmcuc2V0KHRoaXMsIFwiYXJpYS1sZXZlbFwiLCB2YWwpOyB9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gbG9uZy5nZXQodGhpcywgXCJhcmlhLWxldmVsXCIpOyB9XG5cdFx0fSxcblxuXHRcdC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqIEVORCBPRiBDT0xMRUNUSU9OUyAqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXHR9XG4pO1xuXG5mdW5jdGlvbiBzZXRBY2Nlc3NpYmxlTm9kZShheSwgYXR0cmlidXRlLCBhbikge1xuXHRpZiAoIWFuKSByZXR1cm4gYXkuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlKTtcblxuXHRpZiAoIShhbiBpbnN0YW5jZW9mIEFjY2Vzc2libGVOb2RlKSkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkl0IG11c3QgYmUgYW4gaW5zdGFuY2Ugb2YgQWNjZXNzaWJsZU5vZGVcIik7XG5cdH1cblx0aWYgKCFhbi5lbGVtZW50LmlkKSB7IHRocm93IG5ldyBFcnJvcihcIkVsZW1lbnQgbXVzdCBoYXZlIGFuIElEXCIpOyB9XG5cblx0YXkuZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlLCBhbi5lbGVtZW50LmlkKTtcbn1cbmZ1bmN0aW9uIGdldEFjY2Vzc2libGVOb2RlKGF5LCBhdHRyaWJ1dGUpIHtcblx0dmFyIGlkID0gYXkuZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcblx0aWYgKCFpZCkgcmV0dXJuO1xuXG5cdHJldHVybiBlbGVtZW50cy5nZXQoYXkuZWxlbWVudC5vd25lckRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFjY2Vzc2libGVOb2RlOyIsImltcG9ydCBlbGVtZW50cyBmcm9tIFwiLi4vdXRpbHMvZWxlbWVudHNcIjtcclxuaW1wb3J0IEFjY2Vzc2libGVOb2RlIGZyb20gXCIuL0FjY2Vzc2libGVOb2RlXCI7XHJcbmltcG9ydCBjcmVhdGUgZnJvbSBcIi4vLi4vdXRpbHMvY3JlYXRlXCI7XHJcblxyXG5jbGFzcyBBY2Nlc3NpYmxlTm9kZUxpc3RDb24gZXh0ZW5kcyBBcnJheSB7XHJcblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xyXG5cdFx0c3VwZXIoLi4uYXJncyk7XHJcblx0fVxyXG5cclxuXHRpdGVtKGluZGV4KSB7XHJcblx0XHRyZXR1cm4gdGhpc1tpbmRleF07XHJcblx0fVxyXG5cclxuXHRhZGQoQWNjZXNzaWJsZU5vZGUsIGJlZm9yZSA9IG51bGwpIHtcclxuXHRcdGlmKGJlZm9yZSAhPT0gbnVsbCkge1xyXG5cdFx0XHR2YXIgYmVmb3JlSW5kZXggPSB0aGlzLmluZGV4T2YoYmVmb3JlKTtcclxuXHRcdFx0aWYoYmVmb3JlSW5kZXggPiAtMSkge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLnNwbGljZShiZWZvcmVJbmRleCAtIDEsIDAsIEFjY2Vzc2libGVOb2RlKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMucHVzaChBY2Nlc3NpYmxlTm9kZSk7XHJcblx0fVxyXG5cclxuXHRyZW1vdmUoaW5kZXgpIHtcclxuXHRcdHJldHVybiB0aGlzLnBvcChpbmRleCk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRJZHMobm9kZSwgYXR0cmlidXRlKSB7XHJcblx0bGV0IGlkU3RyaW5nID0gbm9kZS5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcclxuXHRcclxuXHRpZiAoIWlkU3RyaW5nKSByZXR1cm4gbmV3IEFjY2Vzc2libGVOb2RlTGlzdENvbigpO1xyXG5cclxuXHRyZXR1cm4gbmV3IEFjY2Vzc2libGVOb2RlTGlzdENvbihpZFN0cmluZy5zcGxpdChcIiBcIikpO1xyXG59XHJcblxyXG4vKipcclxuICogXHJcbiAqL1xyXG5mdW5jdGlvbiBBY2Nlc3NpYmxlTm9kZUxpc3QoYXksIGF0dHJpYnV0ZSkge1xyXG5cdC8vIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcclxuXHQvLyBcdF9lbGVtZW50OiB7IHZhbHVlOiBheS5lbGVtZW50LCBlbnVtZXJhYmxlOiBmYWxzZSB9LFxyXG5cdC8vIFx0X2F0dHI6IHsgdmFsdWU6IGF0dHJpYnV0ZSwgZW51bWVyYWJsZTogZmFsc2UgfVxyXG5cdC8vIH0pO1xyXG5cclxuXHQvLyB0aGlzLl92YWx1ZSA9IHRoaXMuX2VsZW1lbnQuZ2V0QXR0cmlidXRlKHRoaXMuX2F0dHIpO1xyXG5cdC8vIGlmKCF0aGlzLl92YWx1ZSkgdGhpcy5fdmFsdWUgPSBcIlwiO1xyXG5cdGxldCBpZHMgPSBnZXRJZHMoYXkuZWxlbWVudCwgYXR0cmlidXRlKTtcclxuXHJcblx0Ly8gLy8gVGhlIHJlc3VsdCBjYW4gYmUgYWNjZXNzZWQgdGhyb3VnaCB0aGUgYG1gLXZhcmlhYmxlLlxyXG5cdC8vIGlkcy5mb3JFYWNoKChpZCkgPT4ge1xyXG5cdC8vIFx0dmFyIGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG5cdC8vIFx0aWYoZWxlbWVudHMuaGFzKGVsKSkge1xyXG5cdC8vIFx0XHR0aGlzLmFkZChlbGVtZW50cy5nZXQoZWwpKTtcclxuXHQvLyBcdH0gZWxzZSB7XHJcblx0Ly8gXHRcdGVsZW1lbnRzLnNldChlbCwgbmV3IEFjY2Vzc2libGVOb2RlLmRlZmF1bHQoZWwpKTtcclxuXHQvLyBcdFx0dGhpcy5hZGQoZWxlbWVudHMuZ2V0KGVsKSk7XHJcblx0Ly8gXHRcdC8vIGRlYnVnZ2VyO1xyXG5cdC8vIFx0XHQvLyB0b2RvOiBjcmVhdGUgbmV3IGluc3RhbmNlIGFuZCByZXR1cm4gdGhhdCAuXHJcblx0Ly8gXHR9XHJcblx0Ly8gfSk7XHJcblxyXG5cdHZhciBhcnJheUNoYW5nZUhhbmRsZXIgPSB7XHJcblx0XHRnZXQ6IGZ1bmN0aW9uICh0YXJnZXQsIHByb3BlcnR5KSB7XHJcblx0XHRcdC8vIGVsZW1lbnQgaXMgcmVxdWVzdGVkIHRyb3VnaHQgdGFyZ2V0W051bWJlcl1cclxuXHRcdFx0aWYgKCFpc05hTihwcm9wZXJ0eSkgJiYgdGFyZ2V0W3Byb3BlcnR5XSkge1xyXG5cdFx0XHRcdGxldCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldFtwcm9wZXJ0eV0pO1xyXG5cclxuXHRcdFx0XHRpZighZWwpIHtcclxuXHRcdFx0XHRcdC8vIHRocm93IG5ldyBFcnJvcihcIkVsZW1lbnQgbm90IGZvdW5kXCIpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0bGV0IGF1dG90aWxpdHk7XHJcblx0XHRcdFx0Ly8gcHJvcGVydHkgaXMgaW5kZXggaW4gdGhpcyBjYXNlXHJcblx0XHRcdFx0aWYgKGVsKSB7IGF1dG90aWxpdHkgPSBlbGVtZW50cy5nZXQoZWwpOyB9XHJcblx0XHRcdFx0aWYoIWF1dG90aWxpdHkpIHsgYXV0b3RpbGl0eSA9IGNyZWF0ZS5vbmUoZWwpOyB9XHJcblx0XHRcdFx0cmV0dXJuIGF1dG90aWxpdHk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0YXJnZXRbcHJvcGVydHldO1xyXG5cdFx0fSxcclxuXHRcdHNldDogZnVuY3Rpb24gKHRhcmdldCwgcHJvcGVydHksIHZhbHVlKSB7XHJcblx0XHRcdC8vIGFkZGluZyBvciBjaGFuZ2luZyBhIHZhbHVlIGluc2lkZSB0aGUgYXJyYXlcclxuXHRcdFx0aWYgKCFpc05hTihwcm9wZXJ0eSkpIHtcclxuXHRcdFx0XHQvLyBpcyBvZiB2YWxpZCB0eXBlXHJcblx0XHRcdFx0aWYgKHZhbHVlIGluc3RhbmNlb2YgQWNjZXNzaWJsZU5vZGUpIHtcclxuXHRcdFx0XHRcdGlmKCF2YWx1ZS5lbGVtZW50LmlkKSB7XHJcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlRoZSBlbGVtZW50IG11c3QgaGF2ZSBhbiBJRFwiKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHRhcmdldFtwcm9wZXJ0eV0gPSB2YWx1ZS5lbGVtZW50LmlkO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIk9ubHkgaW5zdGFuY2VzIG9mIEFjY2Vzc2libGVOb2RlIGFyZSBhbGxvd2VkXCIpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHR0YXJnZXRbcHJvcGVydHldID0gdmFsdWU7XHJcblx0XHRcdC8vIHlvdSBoYXZlIHRvIHJldHVybiB0cnVlIHRvIGFjY2VwdCB0aGUgY2hhbmdlc1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHR9O1xyXG5cdFxyXG5cdHJldHVybiBuZXcgUHJveHkoaWRzLCBhcnJheUNoYW5nZUhhbmRsZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBY2Nlc3NpYmxlTm9kZUxpc3Q7IiwiZXhwb3J0IGNvbnN0IElTX0FDVElWRSA9IFwidHJ1ZVwiLCBJU19OT1RfQUNUSVZFID0gXCJmYWxzZVwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldChheSwgYXR0cmlidXRlTmFtZSkge1xyXG5cdGlmKCFheS5lbGVtZW50Lmhhc0F0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKSkgcmV0dXJuO1xyXG5cdHJldHVybiBheS5lbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldChheSwgYXR0cmlidXRlTmFtZSwgc3RhdHVzKSB7XHJcblx0aWYoc3RhdHVzID09IHVuZGVmaW5lZCkge1xyXG5cdFx0YXkuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGF5LmVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUsIHN0YXR1cyk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gc3RhdHVzO1xyXG59XHJcblxyXG4vKipcclxuKiBSZXR1cm5zIHRoZSBvcHBvc2l0ZSBzdGF0ZSBvZiB0aGUgYXR0cmlidXRlXHJcbiogQHJldHVybiB7U3RyaW5nfSBOZXcgc3RhdGVcclxuKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZShzdGF0ZSkge1xyXG5cdGlmIChzdGF0ZSA9PSBJU19BQ1RJVkUpIHtcclxuXHRcdHN0YXRlID0gSVNfTk9UX0FDVElWRTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0c3RhdGUgPSBJU19BQ1RJVkU7XHJcblx0fVxyXG5cdHJldHVybiBzdGF0ZTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBJU19BQ1RJVkUsIElTX05PVF9BQ1RJVkUsIGdldCwgc2V0LCB0b2dnbGUgfTsiLCJleHBvcnQgY29uc3QgSVNfQUNUSVZFID0gdHJ1ZSwgSVNfTk9UX0FDVElWRSA9IGZhbHNlO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldChheSwgYXR0cmlidXRlTmFtZSkge1xyXG5cdGlmKCFheS5lbGVtZW50Lmhhc0F0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKSkgcmV0dXJuO1xyXG5cdHJldHVybiBheS5lbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKSAgPT0gXCJ0cnVlXCIgfHwgZmFsc2U7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXQoYXksIGF0dHJpYnV0ZU5hbWUsIHN0YXR1cykge1xyXG5cdGlmKHN0YXR1cyA9PSB1bmRlZmluZWQpIHtcclxuXHRcdGF5LmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRheS5lbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lLCBzdGF0dXMpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHN0YXR1cztcclxufVxyXG5cclxuLyoqXHJcbiogUmV0dXJucyB0aGUgb3Bwb3NpdGUgc3RhdGUgb2YgdGhlIGF0dHJpYnV0ZVxyXG4qIEByZXR1cm4ge0Jvb2xlYW59IE5ldyBzdGF0ZVxyXG4qL1xyXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlKHN0YXRlKSB7XHJcblx0aWYgKHN0YXRlID09IElTX0FDVElWRSkge1xyXG5cdFx0c3RhdGUgPSBJU19OT1RfQUNUSVZFO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRzdGF0ZSA9IElTX0FDVElWRTtcclxuXHR9XHJcblx0cmV0dXJuIHN0YXRlO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IElTX0FDVElWRSwgSVNfTk9UX0FDVElWRSwgZ2V0LCBzZXQsIHRvZ2dsZSB9OyIsImV4cG9ydCBmdW5jdGlvbiBnZXQoYXV0b3RpbGl0eSwgYXR0cmlidXRlTmFtZSkge1xyXG5cdGlmKCFhdXRvdGlsaXR5LmVsZW1lbnQuaGFzQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpKSByZXR1cm4gbnVsbDtcclxuXHJcblx0dmFyIGF0dHJWYWx1ZSA9IGF1dG90aWxpdHkuZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XHJcblx0aWYoYXR0clZhbHVlID09PSBudWxsKSByZXR1cm4gbnVsbDtcclxuXHJcblx0cmV0dXJuIE51bWJlcihhdHRyVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0KGF1dG90aWxpdHksIGF0dHJpYnV0ZU5hbWUsIHN0cikge1xyXG5cdGlmKHN0ciA9PSBudWxsKSB7XHJcblx0XHRhdXRvdGlsaXR5LmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRhdXRvdGlsaXR5LmVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUsIHN0cik7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IGdldCwgc2V0IH07IiwiZXhwb3J0IGZ1bmN0aW9uIGdldChheSwgYXR0cmlidXRlTmFtZSkge1xyXG5cdGlmICghYXkuZWxlbWVudC5oYXNBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSkpIHJldHVybiBudWxsO1xyXG5cclxuXHR2YXIgYXR0clZhbHVlID0gYXkuZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XHJcblx0aWYgKGF0dHJWYWx1ZSA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XHJcblxyXG5cdHJldHVybiBOdW1iZXIoYXR0clZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldChheSwgYXR0cmlidXRlTmFtZSwgc3RyKSB7XHJcblx0aWYgKHN0ciA9PSBudWxsKSB7XHJcblx0XHRheS5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0YXkuZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgc3RyKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgZ2V0LCBzZXQgfTsiLCJpbXBvcnQgY3JlYXRlIGZyb20gXCIuL2NyZWF0ZVwiO1xuXG4vKipcbiAqIFxuICovXG5jbGFzcyBWYWxpZGl0eVN0YXRlIHtcblx0Y29uc3RydWN0b3IoYXkpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJfYXlcIiwge1xuXHRcdFx0dmFsdWU6IGF5XG5cdFx0fSk7XG5cdH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoVmFsaWRpdHlTdGF0ZS5wcm90b3R5cGUsXG5cdC8qKiBAbGVuZHMgVmFsaWRpdHlTdGF0ZS5wcm90b3R5cGUgKi9cblx0e1xuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdXNlciBoYXMgcHJvdmlkZWQgaW5wdXQgaW4gdGhlIHVzZXIgaW50ZXJmYWNlIHRoYXQgdGhlIFxuXHRcdCAqIHVzZXIgYWdlbnQgaXMgdW5hYmxlIHRvIGNvbnZlcnQgdG8gYSB2YWx1ZTsgZmFsc2Ugb3RoZXJ3aXNlLlxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxuXHRcdCAqL1xuXHRcdGJhZElucHV0OiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRpZiAoKChjcmVhdGUuaW5zdGFuY2VPZih0aGlzLl9heSwgXCJzcGluYnV0dG9uXCIpIHx8IGNyZWF0ZS5pbnN0YW5jZU9mKHRoaXMuX2F5LCBcInNsaWRlclwiKSlcblx0XHRcdFx0XHQmJiB0aGlzLl9heS52YWx1ZU5vdy5sZW5ndGggPiAwICYmICEvXlstK10/KD86XFxkK3xcXGQqWy4sXVxcZCspJC8udGVzdCh0aGlzLl9heS52YWx1ZU5vdykpXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW50IGhhcyBhIGN1c3RvbSBlcnJvcjsgZmFsc2Ugb3RoZXJ3aXNlLlxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxuXHRcdCAqL1x0XG5cdFx0Y3VzdG9tRXJyb3I6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQoKSB7IHJldHVybiAhIXRoaXMuX2N1c3RvbUVycm9yOyB9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudOKAmXMgdmFsdWUgZG9lc27igJl0IG1hdGNoIHRoZSBwcm92aWRlZCBwYXR0ZXJuOyBmYWxzZSBvdGhlcndpc2UuXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0cGF0dGVybk1pc21hdGNoOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0KCkge1xuXHRcdFx0XHR2YXIgdmFsdWUgPSB0aGlzLl9heS5fLmlucHV0ID8gdGhpcy5fYXkuXy5pbnB1dC52YWx1ZSA6IHRoaXMuX2F5LnZhbHVlTm93O1xuXHRcdFx0XHRpZiAodGhpcy5fYXkuXy5pbnB1dC5wYXR0ZXJuICYmIHZhbHVlLmxlbmd0aCA+IDAgJiYgbmV3IFJlZ0V4cCh0aGlzLl9heS5fLmlucHV0LnBhdHRlcm4pLnRlc3QodmFsdWUpID09PSBmYWxzZSkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW504oCZcyB2YWx1ZSBpcyBoaWdoZXIgdGhhbiB0aGUgcHJvdmlkZWQgbWF4aW11bTsgZmFsc2Ugb3RoZXJ3aXNlLlxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxuXHRcdCAqL1xuXHRcdHJhbmdlT3ZlcmZsb3c6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQoKSB7XG5cdFx0XHRcdGlmICh0aGlzLl9heS52YWx1ZU5vdyAmJiB0aGlzLl9heS52YWx1ZU1heCAmJiB0aGlzLl9heS52YWx1ZU5vdyA+IHRoaXMuX2F5LnZhbHVlTWF4KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudOKAmXMgdmFsdWUgaXMgbG93ZXIgdGhhbiB0aGUgcHJvdmlkZWQgbWluaW11bTsgZmFsc2Ugb3RoZXJ3aXNlLlxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxuXHRcdCAqL1xuXHRcdHJhbmdlVW5kZXJmbG93OiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRpZiAodGhpcy5fYXkudmFsdWVOb3cgJiYgdGhpcy5fYXkudmFsdWVNaW4gJiYgdGhpcy5fYXkudmFsdWVOb3cgPCB0aGlzLl9heS52YWx1ZU1pbikge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnTigJlzIHZhbHVlIGRvZXNu4oCZdCBmaXQgdGhlIHJ1bGVzIGdpdmVuIGJ5IHRoZSBzdGVwIGF0dHJpYnV0ZTsgZmFsc2Ugb3RoZXJ3aXNlLlxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxuXHRcdCAqL1xuXHRcdHN0ZXBNaXNtYXRjaDoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldCgpIHtcblx0XHRcdFx0aWYgKHRoaXMuX2F5Ll8ucmFuZ2UgJiYgdGhpcy5fYXkuXy5yYW5nZS5zdGVwICYmIHRoaXMuX2F5LnZhbHVlTm93ICUgdGhpcy5fYXkuXy5yYW5nZS5zdGVwICE9PSAwKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudOKAmXMgdmFsdWUgaXMgbG9uZ2VyIHRoYW4gdGhlIHByb3ZpZGVkIG1heGltdW0gbGVuZ3RoOyBmYWxzZSBvdGhlcndpc2UuXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0dG9vTG9uZzoge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldCgpIHtcblx0XHRcdFx0dmFyIHZhbHVlID0gdGhpcy5fYXkuXy5pbnB1dCA/IHRoaXMuX2F5Ll8uaW5wdXQudmFsdWUgOiB0aGlzLl9heS52YWx1ZU5vdztcblx0XHRcdFx0aWYgKHRoaXMuX2F5Lm1heGxlbmd0aCAmJiB2YWx1ZS5sZW5ndGggPiB0aGlzLl9heS5tYXhsZW5ndGgpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnTigJlzIHZhbHVlLCBpZiBpdCBpcyBub3QgdGhlIGVtcHR5IHN0cmluZywgaXMgc2hvcnRlciB0aGFuIHRoZSBwcm92aWRlZCBtaW5pbXVtIGxlbmd0aDsgZmFsc2Ugb3RoZXJ3aXNlLlxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxuXHRcdCAqL1xuXHRcdHRvb1Nob3J0OiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0KCkge1xuXHRcdFx0XHR2YXIgdmFsdWUgPSB0aGlzLl9heS5fLmlucHV0ID8gdGhpcy5fYXkuXy5pbnB1dC52YWx1ZSA6IHRoaXMuX2F5LnZhbHVlTm93O1xuXHRcdFx0XHRpZiAodGhpcy5fYXkubWlubGVuZ3RoICYmIHZhbHVlLmxlbmd0aCA8IHRoaXMuX2F5Lm1pbmxlbmd0aCkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudOKAmXMgdmFsdWUgaXMgbm90IGluIHRoZSBjb3JyZWN0IHN5bnRheDsgZmFsc2Ugb3RoZXJ3aXNlLlxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxuXHRcdCAqL1xuXHRcdHR5cGVNaXNtYXRjaDogeyBcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQoKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnQgaGFzIG5vIHZhbHVlIGJ1dCBpcyBhIHJlcXVpcmVkIGZpZWxkOyBmYWxzZSBvdGhlcndpc2UuXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0dmFsdWVNaXNzaW5nOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0KCkge1xuXHRcdFx0XHR2YXIgdmFsdWUgPSB0aGlzLl9heS5fLmlucHV0ID8gdGhpcy5fYXkuXy5pbnB1dC52YWx1ZSA6IHRoaXMuX2F5LnZhbHVlTm93O1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0dGhpcy5yZXF1aXJlZFxuXHRcdFx0XHRcdCYmIChcblx0XHRcdFx0XHRcdCgoY3JlYXRlLmluc3RhbmNlT2YodGhpcy5fYXksIFwiY2hlY2tib3hcIikgfHwgY3JlYXRlLmluc3RhbmNlT2YodGhpcy5fYXksIFwicmFkaW9cIilcblx0XHRcdFx0XHRcdFx0fHwgY3JlYXRlLmluc3RhbmNlT2YodGhpcy5fYXksIFwib3B0aW9uXCIpKSAmJiAhdGhpcy5fYXkuY2hlY2tlZClcblx0XHRcdFx0XHRcdHx8IChjcmVhdGUuaW5zdGFuY2VPZih0aGlzLl9heSwgXCJzZWxlY3RcIikgJiYgIXZhbHVlKVxuXHRcdFx0XHRcdFx0fHwgKChjcmVhdGUuaW5zdGFuY2VPZih0aGlzLl9heSwgXCJpbnB1dFwiKSB8fCBjcmVhdGUuaW5zdGFuY2VPZih0aGlzLl9heSwgXCJncmlkY2VsbFwiKSkgJiYgIXZhbHVlID4gMClcblx0XHRcdFx0XHQpXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnTigJlzIHZhbHVlIGhhcyBubyB2YWxpZGl0eSBwcm9ibGVtczsgZmFsc2Ugb3RoZXJ3aXNlXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0dmFsaWQ6IHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQoKSB7XG5cdFx0XHRcdHJldHVybiAhKFxuXHRcdFx0XHRcdHRoaXMuYmFkSW5wdXQgfHxcblx0XHRcdFx0XHR0aGlzLmN1c3RvbUVycm9yIHx8XG5cdFx0XHRcdFx0dGhpcy5wYXR0ZXJuTWlzbWF0Y2ggfHxcblx0XHRcdFx0XHR0aGlzLnJhbmdlT3ZlcmZsb3cgfHxcblx0XHRcdFx0XHR0aGlzLnJhbmdlVW5kZXJmbG93IHx8XG5cdFx0XHRcdFx0dGhpcy5zdGVwTWlzbWF0Y2ggfHxcblx0XHRcdFx0XHR0aGlzLnRvb0xvbmcgfHxcblx0XHRcdFx0XHR0aGlzLnRvb1Nob3J0IHx8XG5cdFx0XHRcdFx0dGhpcy50eXBlTWlzbWF0Y2ggfHxcblx0XHRcdFx0XHR0aGlzLnZhbHVlTWlzc2luZ1xuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgVmFsaWRpdHlTdGF0ZTsiLCJpbXBvcnQgc2VsZWN0b3IgZnJvbSBcIi4vc2VsZWN0b3JcIjtcbmltcG9ydCBlbGVtZW50cyBmcm9tIFwiLi9lbGVtZW50c1wiO1xuaW1wb3J0IGdldENvbXB1dGVkUm9sZSBmcm9tIFwiLi9nZXRDb21wdXRlZFJvbGVcIjtcblxuaW1wb3J0IFJhbmdlIGZyb20gXCIuLy4uL3JvbGUvYWJzdHJhY3QvUmFuZ2VcIjtcbmltcG9ydCBSb2xldHlwZSBmcm9tIFwiLi8uLi9yb2xlL2Fic3RyYWN0L1JvbGV0eXBlXCI7XG5cbmltcG9ydCBCdXR0b24gZnJvbSBcIi4vLi4vcm9sZS9CdXR0b25cIjtcbmltcG9ydCBDaGVja2JveCBmcm9tIFwiLi8uLi9yb2xlL0NoZWNrYm94XCI7XG5pbXBvcnQgQ29tYm9ib3ggZnJvbSBcIi4vLi4vcm9sZS9Db21ib2JveFwiO1xuaW1wb3J0IERpYWxvZyBmcm9tIFwiLi8uLi9yb2xlL0RpYWxvZ1wiO1xuaW1wb3J0IEZvcm0gZnJvbSBcIi4vLi4vcm9sZS9Gb3JtXCI7XG5pbXBvcnQgTGluayBmcm9tIFwiLi8uLi9yb2xlL0xpbmtcIjtcbmltcG9ydCBMaXN0Ym94IGZyb20gXCIuLy4uL3JvbGUvTGlzdGJveFwiO1xuaW1wb3J0IE9wdGlvbiBmcm9tIFwiLi8uLi9yb2xlL29wdGlvblwiO1xuaW1wb3J0IFNlYXJjaGJveCBmcm9tIFwiLi8uLi9yb2xlL3NlYXJjaGJveFwiO1xuaW1wb3J0IFNsaWRlciBmcm9tIFwiLi8uLi9yb2xlL1NsaWRlclwiO1xuaW1wb3J0IFNwaW5idXR0b24gZnJvbSBcIi4vLi4vcm9sZS9TcGluYnV0dG9uXCI7XG5pbXBvcnQgU3dpdGNoIGZyb20gXCIuLy4uL3JvbGUvU3dpdGNoXCI7XG5pbXBvcnQgVGFiIGZyb20gXCIuLy4uL3JvbGUvVGFiXCI7XG5pbXBvcnQgVGFibGlzdCBmcm9tIFwiLi8uLi9yb2xlL1RhYmxpc3RcIjtcbmltcG9ydCBUYWJwYW5lbCBmcm9tIFwiLi8uLi9yb2xlL1RhYnBhbmVsXCI7XG5pbXBvcnQgVGV4dGJveCBmcm9tIFwiLi8uLi9yb2xlL1RleHRib3hcIjtcblxudmFyIG9iaiA9IHsgYnV0dG9uOiBCdXR0b24sIGNoZWNrYm94OiBDaGVja2JveCwgY29tYm9ib3g6IENvbWJvYm94LCBkaWFsb2c6IERpYWxvZywgZm9ybTogRm9ybSwgbGlzdGJveDogTGlzdGJveCwgXG5cdG9wdGlvbnM6IE9wdGlvbiwgcmFuZ2U6IFJhbmdlLCByb2xldHlwZTogUm9sZXR5cGUsIHNlYXJjaGJveDogU2VhcmNoYm94LCBzbGlkZXI6IFNsaWRlciwgc3BpbmJ1dHRvbjogU3BpbmJ1dHRvbixcblx0dGFiOiBUYWIsIHRhYmxpc3Q6IFRhYmxpc3QsIHRhYnBhbmVsOiBUYWJwYW5lbCwgdGV4dGJveDogVGV4dGJveCwgbGluazogTGluaywgc3dpdGNoOiBTd2l0Y2h9O1xuXG5mdW5jdGlvbiBhbGwoKSB7XG5cdGZvciAobGV0IGtleSBpbiBvYmopIHtcblx0XHR2YXIgbm9kZUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yLmdldFJvbGUoa2V5KSk7XG5cdFx0Y29uc29sZS5sb2coa2V5LCBub2RlTGlzdCk7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBub2RlTGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0ZWxlbWVudHMuc2V0KG5vZGVMaXN0W2ldLCBuZXcgb2JqW2tleV0obm9kZUxpc3RbaV0pKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gb25lKGVsKSB7XG5cdGlmKGVsZW1lbnRzLmhhcyhlbCkpIHJldHVybiBlbGVtZW50cy5nZXQoZWwpO1xuXHR2YXIgcm9sZSA9IGdldENvbXB1dGVkUm9sZShlbCk7XG5cdFxuXHQvKiogQHRvZG8gUmVtb3ZlIGZhbGxiYWNrIG1ldGhvZCAqL1xuXHR2YXIgY29uc3RydWN0b3IgPSBvYmpbcm9sZV0gfHwgUm9sZXR5cGU7XG5cblx0cmV0dXJuIGVsZW1lbnRzLnNldChlbCwgbmV3IGNvbnN0cnVjdG9yKGVsKSk7XG59XG5cbmZ1bmN0aW9uIGluc3RhbmNlT2YoYXksIHJvbGUpIHtcblx0cmV0dXJuIGF5IGluc3RhbmNlb2Ygb2JqW3JvbGVdO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7YWxsLCBvbmUsIGluc3RhbmNlT2Z9O1xuXG4vLyByb2xlcy5mb3JFYWNoKChSb2xlKSA9PiB7XG4vLyBcdHZhciBub2RlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuLy8gXHRmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4vLyBcdFx0ZWxlbWVudHMuc2V0KG5vZGVMaXN0W2ldLCBuZXcgUm9sZShub2RlTGlzdFtpXSkpO1xuLy8gXHR9XG5cbi8vIFx0Ly8gaWYocm9sZS5vcHRpb25zICYmIHJvbGUub3B0aW9ucy5zZWxlY3RvcnNXaXRoSW1wbGljaXRSb2xlKSB7XG4vLyBcdC8vIFx0dmFyIGh0bWxOb2RlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocm9sZS5vcHRpb25zLnNlbGVjdG9yc1dpdGhJbXBsaWNpdFJvbGUuam9pbihcIixcIikpO1xuLy8gXHQvLyBcdGZvciAobGV0IGogPSAwOyBqIDwgaHRtbE5vZGVMaXN0Lmxlbmd0aDsgaisrKSB7XG4vLyBcdC8vIFx0XHRlbGVtZW50cy5zZXQoaHRtbE5vZGVMaXN0W2pdLCBuZXcgcm9sZS5kZWZhdWx0KGh0bWxOb2RlTGlzdFtqXSkpO1xuLy8gXHQvLyBcdH1cbi8vIFx0Ly8gfVxuLy8gfSk7IiwiaW1wb3J0IGNyZWF0ZSBmcm9tIFwiLi9jcmVhdGVcIjtcbmltcG9ydCBnZXRDb21wdXRlZFJvbGUgZnJvbSBcIi4vZ2V0Q29tcHV0ZWRSb2xlXCI7XG5cbnZhciBheUluc3RhbmNlcyA9IG5ldyBXZWFrTWFwKCk7XG5cbi8vIHRvZG86IGxvb3AgdGhyb3VnaCBwcmVzZW50YXRpb25hbCByb2xlc1xuZXhwb3J0IGZ1bmN0aW9uIGdldFBhcmVudChheSwgc2VsZWN0b3IpIHtcblx0bGV0IGVsZW1lbnQgPSBheS5lbGVtZW50O1xuXG5cdHdoaWxlKGVsZW1lbnQucGFyZW50Tm9kZSkge1xuXHRcdGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XG5cblx0XHRpZiAoYXkuZWxlbWVudC5wYXJlbnROb2RlLm1hdGNoZXMoc2VsZWN0b3IpKSB7XG5cdFx0XHRpZiAoYXlJbnN0YW5jZXMuaGFzKGF5LmVsZW1lbnQucGFyZW50Tm9kZSkpIHtcblx0XHRcdFx0cmV0dXJuIGF5SW5zdGFuY2VzLmdldChheS5lbGVtZW50LnBhcmVudE5vZGUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGNyZWF0ZS5vbmUoYXkuZWxlbWVudC5wYXJlbnROb2RlKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZmFsc2U7XG59XG5cbi8qKiBAdG9kbyBmaW5kIG9ubHkgYGRpcmVjdGAgY2hpbGRyZW4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDaGlsZHJlbihheSwgcm9sZSkge1xuXHR2YXIgcmVzdWx0cyA9IFtdO1xuXHR2YXIgb3ducyA9IEFycmF5LmZyb20oYXkuZWxlbWVudC5jaGlsZHJlbikuY29uY2F0KGF5Lm93bnMpO1xuXG5cdG93bnMuZm9yRWFjaChjaGlsZCA9PiB7XG5cdFx0aWYgKCFyb2xlIHx8IChyb2xlICYmIGdldENvbXB1dGVkUm9sZShjaGlsZCkgPT0gcm9sZSkpIHtcblx0XHRcdGlmIChheUluc3RhbmNlcy5oYXMoY2hpbGQpKSB7XG5cdFx0XHRcdHJlc3VsdHMucHVzaChheUluc3RhbmNlcy5nZXQoY2hpbGQpKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJlc3VsdHMucHVzaChjcmVhdGUub25lKGNoaWxkKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHRyZXR1cm4gb3ducztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByZXYoY2hpbGQsIHBhcmVudCwgcm9sZSkge1xuXHRpZighcGFyZW50KSByZXR1cm4gZmFsc2U7XG5cblx0bGV0IGNoaWxkcmVuID0gZ2V0Q2hpbGRyZW4ocGFyZW50LCByb2xlKTtcblx0bGV0IGluZGV4UHJldkVsZW1lbnQgPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGNoaWxkcmVuLCBjaGlsZCkgLSAxO1xuXHRpZihpbmRleFByZXZFbGVtZW50IDwgMCkgcmV0dXJuIGZhbHNlO1xuXG5cdHJldHVybiBjaGlsZHJlbltpbmRleFByZXZFbGVtZW50XTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE5leHQoY2hpbGQsIHBhcmVudCwgcm9sZSkge1xuXHRpZighcGFyZW50KSByZXR1cm4gZmFsc2U7XG5cblx0bGV0IGNoaWxkcmVuID0gZ2V0Q2hpbGRyZW4ocGFyZW50LCByb2xlKTtcblx0bGV0IGluZGV4TmV4dCA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoY2hpbGRyZW4sIGNoaWxkKSArIDE7XG5cdGlmKGluZGV4TmV4dCA+PSBjaGlsZHJlbi5sZW5ndGgpIHJldHVybiBmYWxzZTtcblxuXHRyZXR1cm4gY2hpbGRyZW5baW5kZXhOZXh0XTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0YXJ0KGNoaWxkLCBwYXJlbnQsIHJvbGUpIHtcblx0aWYoIXBhcmVudCkgcmV0dXJuIGZhbHNlO1xuXHRsZXQgY2hpbGRyZW4gPSBnZXRDaGlsZHJlbihwYXJlbnQsIHJvbGUpO1xuXHRyZXR1cm4gY2hpbGRyZW5bMF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbmQoY2hpbGQsIHBhcmVudCwgcm9sZSkge1xuXHRpZighcGFyZW50KSByZXR1cm4gZmFsc2U7XG5cdGxldCBjaGlsZHJlbiA9IGdldENoaWxkcmVuKHBhcmVudCwgcm9sZSk7XG5cdHJldHVybiBjaGlsZHJlbltjaGlsZHJlbi5sZW5ndGggLSAxXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuXHRtYXA6IGF5SW5zdGFuY2VzLFxuXHRnZXQ6IGF5SW5zdGFuY2VzLmdldC5iaW5kKGF5SW5zdGFuY2VzKSxcblx0c2V0OiBheUluc3RhbmNlcy5zZXQuYmluZChheUluc3RhbmNlcyksXG5cdGhhczogYXlJbnN0YW5jZXMuaGFzLmJpbmQoYXlJbnN0YW5jZXMpLFxuXHRnZXRDaGlsZHJlbixcblx0Z2V0UGFyZW50LFxuXHRnZXRQcmV2LFxuXHRnZXROZXh0LFxuXHRnZXRTdGFydCxcblx0Z2V0RW5kXG59OyIsImltcG9ydCBlbGVtZW50cyBmcm9tIFwiLi9lbGVtZW50c1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XHJcblx0bGV0IGF5ID0gZWxlbWVudHMuZ2V0KGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xyXG5cclxuXHRpZighYXkpIHJldHVybjtcclxuXHRpZihheS5hY3RpdmVEZXNjZW5kYW50KSByZXR1cm4gYXkuYWN0aXZlRGVzY2VuZGFudDtcclxuXHJcblx0cmV0dXJuIGF5O1xyXG59IiwiLyoqXHJcbiAqIEZvbGxvd3MgaHR0cHM6Ly93d3cudzMub3JnL1RSLzIwMTcvV0QtaHRtbC1hcmlhLTIwMTcxMDEzLyNkb2Njb25mb3JtYW5jZVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBBbGwgYXJpYSByb2xlc1xyXG4gKiBAdHlwZSB7QXJyYXl9XHJcbiovXHJcbmltcG9ydCByb2xlcyBmcm9tIFwiLi8uLi9kYXRhL3JvbGVzLmpzXCI7XHJcblxyXG4vKipcclxuICogU3RvcmVzIGluZm8gd2hpY2ggaXMgdXNlZCBpbiBmdW5jdGlvbnMgb2Ygcm9sZVBlckhUTUxUYWcsXHJcbiAqIG1vc3RseSBhIGtleSBhcyB0YWdOYW1lIHdpdGggYW4gYXJyYXkgb2YgYWxsb3dlZCByb2xlcyBmb3IgdGhhdCB0YWdcclxuICogQHR5cGUge09iamVjdH1cclxuICovXHJcbnZhciBhbGxvd2VkUm9sZXMgPSB7XHJcblx0XCJhV2l0aEhyZWZcIjogW1xyXG5cdFx0XCJidXR0b25cIiwgXCJjaGVja2JveFwiLCBcIm1lbnVpdGVtXCIsIFwibWVudWl0ZW1jaGVja2JveFwiLCBcIm1lbnVpdGVtcmFkaW9cIixcclxuXHRcdFwib3B0aW9uXCIsIFwicmFkaW9cIiwgXCJzd2l0Y2hcIiwgXCJ0YWJcIiwgXCJ0cmVlaXRlbVwiLCBcImRvYy1iYWNrbGlua1wiLFxyXG5cdFx0XCJkb2MtYmlibGlvcmVmXCIsIFwiZG9jLWdsb3NzcmVmXCIsIFwiZG9jLW5vdGVyZWZcIlxyXG5cdF0sXHJcblx0XCJhcnRpY2xlXCI6IFtcclxuXHRcdFwiZmVlZFwiLCBcInByZXNlbnRhdGlvblwiLCBcIm5vbmVcIiwgXCJkb2N1bWVudFwiLCBcImFwcGxpY2F0aW9uXCIsIFwibWFpblwiLCBcInJlZ2lvblwiXHJcblx0XSxcclxuXHRcImFzaWRlXCI6IFtcclxuXHRcdFwiZmVlZFwiLCBcIm5vdGVcIiwgXCJwcmVzZW50YXRpb25cIiwgXCJub25lXCIsIFwicmVnaW9uXCIsIFwic2VhcmNoXCIsIFwiZG9jLWV4YW1wbGVcIixcclxuXHRcdFwiZG9jLWZvb3Rub3RlXCIsIFwiZG9jLXB1bGxxdW90ZVwiLCBcImRvYy10aXBcIlxyXG5cdF0sXHJcblx0XCJidXR0b25cIjogW1xyXG5cdFx0XCJjaGVja2JveFwiLCBcImxpbmtcIiwgXCJtZW51aXRlbVwiLCBcIm1lbnVpdGVtY2hlY2tib3hcIiwgXCJtZW51aXRlbXJhZGlvXCIsXHJcblx0XHRcIm9wdGlvblwiLCBcInJhZGlvXCIsIFwic3dpdGNoXCIsIFwidGFiXCJcclxuXHRdLFxyXG5cdFwiZGxcIjogW1wiZ3JvdXBcIiwgXCJwcmVzZW50YXRpb25cIiwgXCJub25lXCIsIFwiZG9jLWdsb3NzYXJ5XCJdLFxyXG5cdFwiZW1iZWRcIjogWyBcImFwcGxpY2F0aW9uXCIsIFwiZG9jdW1lbnRcIiwgXCJwcmVzZW50YXRpb25cIiwgXCJub25lXCIsIFwiaW1nXCIgXSxcclxuXHRcImZpZ2NhcHRpb25cIjogWyBcImdyb3VwXCIsIFwicHJlc2VudGF0aW9uXCIsIFwibm9uZVwiIF0sXHJcblx0XCJmaWVsZHNldFwiOiBcdFsgXCJncm91cFwiLCBcInByZXNlbnRhdGlvblwiLCBcIm5vbmVcIiBdLFxyXG5cdFwiZm9vdGVyXCI6IFsgXCJncm91cFwiLCBcIm5vbmVcIiwgXCJwcmVzZW50YXRpb25cIiwgXCJkb2MtZm9vdG5vdGVcIiBdLFxyXG5cdFwiZm9ybVwiOiBbIFwic2VhcmNoXCIsIFwibm9uZVwiLCBcInByZXNlbnRhdGlvblwiIF0sXHJcblx0XCJoMVRvaDZcIjogWyBcInRhYlwiLCBcIm5vbmVcIiwgXCJwcmVzZW50YXRpb25cIiwgXCJkb2Mtc3VidGl0bGVcIiBdLFxyXG5cdFwiaGVhZGVyXCI6IFsgXCJncm91cFwiLCBcIm5vbmVcIiwgXCJwcmVzZW50YXRpb25cIiwgXCJkb2MtZm9vdG5vdGVcIiBdLFxyXG5cdFwiaHJcIjogWyBcInByZXNlbnRhdGlvblwiLCBcImRvYy1wYWdlYnJlYWtcIiBdLFxyXG5cdFwiaWZyYW1lXCI6IFsgXCJhcHBsaWNhdGlvblwiLCBcImRvY3VtZW50XCIsIFwiaW1nXCIgXSxcclxuXHRcImltZ1dpdGhFbXB0eUFsdFwiOiBbIFwicHJlc2VudGF0aW9uXCIsIFwibm9uZVwiIF0sXHJcblx0XCJpbnB1dFR5cGVCdXR0b25cIjogW1xyXG5cdFx0XCJsaW5rLCBtZW51aXRlbVwiLCBcIm1lbnVpdGVtY2hlY2tib3hcIiwgXCJtZW51aXRlbXJhZGlvXCIsIFwicmFkaW9cIiwgXCJzd2l0Y2hcIixcclxuXHRcdFwib3B0aW9uXCIsIFwidGFiXCJcclxuXHRdLFxyXG5cdFwiaW5wdXRUeXBlSW1hZ2VcIjogW1xyXG5cdFx0XCJsaW5rXCIsIFwibWVudWl0ZW1cIiwgXCJtZW51aXRlbWNoZWNrYm94XCIsIFwibWVudWl0ZW1yYWRpb1wiLCBcInJhZGlvXCIsIFwic3dpdGNoXCJcclxuXHRdLFxyXG5cdFwiaW5wdXRUeXBlQ2hlY2tib3hcIjogWyBcImJ1dHRvblwiLCBcIm1lbnVpdGVtY2hlY2tib3hcIiwgXCJvcHRpb25cIiwgXCJzd2l0Y2hcIiBdLFxyXG5cdFwibGlcIjogW1xyXG5cdFx0XCJtZW51aXRlbVwiLCBcIm1lbnVpdGVtY2hlY2tib3hcIiwgXCJtZW51aXRlbXJhZGlvXCIsIFwib3B0aW9uXCIsIFwibm9uZVwiLFxyXG5cdFx0XCJwcmVzZW50YXRpb25cIiwgXCJyYWRpb1wiLCBcInNlcGFyYXRvclwiLCBcInRhYlwiLCBcInRyZWVpdGVtXCIsIFwiZG9jLWJpYmxpb2VudHJ5XCIsXHJcblx0XHRcImRvYy1lbmRub3RlXCJcclxuXHRdLFxyXG5cdFwibmF2XCI6IFsgXCJkb2MtaW5kZXhcIiwgXCJkb2MtcGFnZWxpc3RcIiwgXCJkb2MtdG9jXCIgXSxcclxuXHRcIm9iamVjdFwiOiBbIFwiYXBwbGljYXRpb25cIiwgXCJkb2N1bWVudFwiLCBcImltZ1wiIF0sXHJcblx0XCJvbFwiOiBbXHJcblx0XHRcImRpcmVjdG9yeVwiLCBcImdyb3VwXCIsIFwibGlzdGJveFwiLCBcIm1lbnVcIiwgXCJtZW51YmFyLG5vbmVcIiwgXCJwcmVzZW50YXRpb24gXCIsXHJcblx0XHRcInJhZGlvZ3JvdXBcIiwgXCJ0YWJsaXN0XCIsIFwidG9vbGJhclwiLCBcInRyZWVcIlxyXG5cdF0sXHJcblx0XCJzZWN0aW9uXCI6IFtcclxuXHRcdFwiYWxlcnRcIiwgXCJhbGVydGRpYWxvZ1wiLCBcImFwcGxpY2F0aW9uXCIsIFwiYmFubmVyXCIsIFwiY29tcGxlbWVudGFyeVwiLFxyXG5cdFx0XCJjb250ZW50aW5mb1wiLCBcImRpYWxvZ1wiLCBcImRvY3VtZW50XCIsIFwiZmVlZFwiLCBcImxvZ1wiLCBcIm1haW5cIiwgXCJtYXJxdWVlXCIsXHJcblx0XHRcIm5hdmlnYXRpb25cIiwgXCJub25lXCIsIFwicHJlc2VudGF0aW9uXCIsIFwic2VhcmNoXCIsIFwic3RhdHVzXCIsIFwidGFicGFuZWxcIixcclxuXHRcdFwiZG9jLWFic3RyYWN0XCIsIFwiZG9jLWFja25vd2xlZGdtZW50c1wiLCBcImRvYy1hZnRlcndvcmRcIiwgXCJkb2MtYXBwZW5kaXhcIixcclxuXHRcdFwiZG9jLWJpYmxpb2dyYXBoeVwiLCBcImRvYy1jaGFwdGVyXCIsIFwiZG9jLWNvbG9waG9uXCIsIFwiZG9jLWNvbmNsdXNpb25cIixcclxuXHRcdFwiZG9jLWNyZWRpdFwiLCBcImRvYy1jcmVkaXRzXCIsIFwiZG9jLWRlZGljYXRpb25cIiwgXCJkb2MtZW5kbm90ZXNcIiwgXCJkb2MtZXBpbG9ndWVcIixcclxuXHRcdFwiZG9jLWVycmF0YVwiLCBcImRvYy1leGFtcGxlXCIsIFwiZG9jLWZvcmV3b3JkXCIsIFwiZG9jLWluZGV4XCIsIFwiZG9jLWludHJvZHVjdGlvblwiLFxyXG5cdFx0XCJkb2Mtbm90aWNlXCIsIFwiZG9jLXBhZ2VsaXN0XCIsIFwiZG9jLXBhcnRcIiwgXCJkb2MtcHJlZmFjZVwiLCBcImRvYy1wcm9sb2d1ZVwiLFxyXG5cdFx0XCJkb2MtcHVsbHF1b3RlXCIsIFwiZG9jLXFuYVwiLCBcImRvYy10b2NcIlxyXG5cdF0sXHJcblx0XCJzdmdcIjogWyBcImFwcGxpY2F0aW9uXCIsIFwiZG9jdW1lbnRcIiwgXCJpbWdcIiBdLFxyXG5cdFwidWxcIjogW1xyXG5cdFx0XCJkaXJlY3RvcnlcIiwgXCJncm91cFwiLCBcImxpc3Rib3hcIiwgXCJtZW51XCIsIFwibWVudWJhclwiLCBcInJhZGlvZ3JvdXBcIixcclxuXHRcdFwidGFibGlzdFwiLCBcInRvb2xiYXJcIiwgXCJ0cmVlXCIsIFwicHJlc2VudGF0aW9uXCJcclxuXHRdXHJcbn07XHJcblxyXG4vKipcclxuICogQ29udGFpbnMgYSBmdW5jdGlvbiBmb3IgZWFjaCBodG1sVGFnIHdoZXJlIG5vdCBhbGwgcm9sZXMgYWxsb3dlZFxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKi9cclxudmFyIHJvbGVQZXJIVE1MVGFnID0ge1xyXG5cdGE6IChlbCwgcm9sZSkgPT4ge1xyXG5cdFx0aWYoZWwuaHJlZikge1xyXG5cdFx0XHRyZXR1cm4gaGFzQWxsb3dlZFJvbGUoXCJhV2l0aEhyZWZcIiwgcm9sZSkgPyByb2xlIDogXCJsaW5rXCI7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gcm9sZTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGFyZWE6IChlbCwgcm9sZSkgPT4ge1xyXG5cdFx0aWYoZWwuaHJlZikgcmV0dXJuIHJvbGUgPyBudWxsIDogXCJsaW5rXCI7XHJcblx0XHRyZXR1cm4gcm9sZTtcclxuXHR9LFxyXG5cdGFydGljbGU6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJhcnRpY2xlXCIsIHJvbGUpID8gcm9sZSA6IFwiYXJ0aWNsZVwiLFxyXG5cdGFzaWRlOiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwiYXNpZGVcIiwgcm9sZSkgPyByb2xlIDogXCJjb21wbGVtZW50YXJ5XCIsXHJcblx0YXVkaW86IChlbCwgcm9sZSkgPT4gcm9sZSA9PSBcImFwcGxpY2F0aW9uXCIgPyBcImFwcGxpY2F0aW9uXCIgOiBudWxsLFxyXG5cdGJhc2U6ICgpID0+IG51bGwsXHJcblx0Ym9keTogKCkgPT4gXCJkb2N1bWVudFwiLFxyXG5cdGJ1dHRvbjogKGVsLCByb2xlKSA9PiB7XHJcblx0XHRpZihlbC50eXBlID09IFwibWVudVwiKSB7XHJcblx0XHRcdHJldHVybiByb2xlID09IFwibWVudWl0ZW1cIiA/IFwibWVudWl0ZW1cIiA6IFwiYnV0dG9uXCI7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gaGFzQWxsb3dlZFJvbGUoXCJidXR0b25cIiwgcm9sZSkgPyByb2xlIDogXCJidXR0b25cIjtcclxuXHR9LFxyXG5cdGNhcHRpb246ICgpID0+IG51bGwsXHJcblx0Y29sOiAoKSA9PiBudWxsLFxyXG5cdGNvbGdyb3VwOiAoKSA9PiBudWxsLFxyXG5cdGRhdGFsaXN0OiAoKSA9PiBcImxpc3Rib3hcIixcclxuXHRkZDogKCkgPT4gXCJkZWZpbml0aW9uXCIsXHJcblx0ZGV0YWlsczogKCkgPT4gXCJncm91cFwiLFxyXG5cdGRpYWxvZzogKGVsLCByb2xlKSA9PiByb2xlID09IFwiYWxlcnRkaWFsb2dcIiA/IFwiYWxlcnRkaWFsb2dcIiA6IFwiZGlhbG9nXCIsXHJcblx0ZGw6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJkbFwiLCByb2xlKSA/IHJvbGUgOiBcImxpc3RcIixcclxuXHRkdDogKCkgPT4gXCJsaXN0aXRlbVwiLFxyXG5cdGVtYmVkOiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwiZW1iZWRcIiwgcm9sZSkgPyByb2xlIDogbnVsbCxcclxuXHRmaWdjYXB0aW9uOiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwiZmlnY2FwdGlvblwiLCByb2xlKSA/IHJvbGUgOiBudWxsLFxyXG5cdGZpZWxkc2V0OiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwiZmllbGRzZXRcIiwgcm9sZSk/IHJvbGUgOiBudWxsLFxyXG5cdGZpZ3VyZTogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcImZpZ3VyZVwiLCByb2xlKSA/IHJvbGUgOiBcImZpZ3VyZVwiLFxyXG5cdGZvb3RlcjogKGVsLCByb2xlKSA9PiB7XHJcblx0XHRsZXQgaGFzSW1wbGljaXRDb250ZW50aW5mb1JvbGUgPSAhZ2V0UGFyZW50V2l0aFRhZ05hbWUoZWwsIFtcIkFSVElDTEVcIiwgXCJBU0lERVwiLCBcIk1BSU5cIiwgXCJOQVZcIiwgXCJTRUNUSU9OXCJdKTtcclxuXHRcdGxldCBoYXNBbGxvd2VkUm9sZSA9IGhhc0FsbG93ZWRSb2xlKFwiZm9vdGVyXCIsIHJvbGUpO1xyXG5cdFx0aWYoaGFzQWxsb3dlZFJvbGUpe1xyXG5cdFx0XHRyZXR1cm4gcm9sZTtcclxuXHRcdH0gZWxzZSBpZiAoaGFzSW1wbGljaXRDb250ZW50aW5mb1JvbGUpIHtcclxuXHRcdFx0cmV0dXJuIFwiY29udGVudGluZm9cIjtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0Zm9ybTogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcImZvcm1cIiwgcm9sZSkgPyByb2xlIDogXCJmb3JtXCIsXHJcblx0aDE6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJoMVRvaDZcIiwgcm9sZSkgPyByb2xlIDogXCJoZWFkaW5nXCIsXHJcblx0aDI6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJoMVRvaDZcIiwgcm9sZSkgPyByb2xlIDogXCJoZWFkaW5nXCIsXHJcblx0aDM6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJoMVRvaDZcIiwgcm9sZSkgPyByb2xlIDogXCJoZWFkaW5nXCIsXHJcblx0aDQ6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJoMVRvaDZcIiwgcm9sZSkgPyByb2xlIDogXCJoZWFkaW5nXCIsXHJcblx0aDU6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJoMVRvaDZcIiwgcm9sZSkgPyByb2xlIDogXCJoZWFkaW5nXCIsXHJcblx0aDY6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJoMVRvaDZcIiwgcm9sZSkgPyByb2xlIDogXCJoZWFkaW5nXCIsXHJcblx0aGVhZDogKCkgPT4gbnVsbCxcclxuXHRoZWFkZXI6IChlbCwgcm9sZSkgPT4ge1xyXG5cdFx0bGV0IGhhc0ltcGxpY2l0QmFubmVyUm9sZSA9ICFnZXRQYXJlbnRXaXRoVGFnTmFtZShlbCwgW1wiQVJUSUNMRVwiLCBcIkFTSURFXCIsIFwiTUFJTlwiLCBcIk5BVlwiLCBcIlNFQ1RJT05cIl0pO1xyXG5cdFx0bGV0IGhhc0FsbG93ZWRSb2xlID0gaGFzQWxsb3dlZFJvbGUoXCJoZWFkZXJcIiwgcm9sZSk7XHJcblx0XHRpZihoYXNBbGxvd2VkUm9sZSl7XHJcblx0XHRcdHJldHVybiByb2xlO1xyXG5cdFx0fSBlbHNlIGlmIChoYXNJbXBsaWNpdEJhbm5lclJvbGUpIHtcclxuXHRcdFx0cmV0dXJuIFwiYmFubmVyXCI7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGhyOiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwiaHJcIiwgcm9sZSkgPyByb2xlIDogXCJzZXBlcmF0b3JcIixcclxuXHRodG1sOiAoKSA9PiBudWxsLFxyXG5cdGlmcmFtZTogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcImlmcmFtZVwiLCByb2xlKSA/IHJvbGUgOiBudWxsLFxyXG5cdGltZzogKGVsLCByb2xlKSA9PiB7XHJcblx0XHR2YXIgaGFzQWxsb3dlZEVtcHR5QWx0Um9sZSA9IGhhc0FsbG93ZWRSb2xlKFwiaW1nV2l0aEVtcHR5QWx0XCIsIHJvbGUpO1xyXG5cclxuXHRcdGlmKGVsLmFsdCkge1xyXG5cdFx0XHQvLyBhbnkgcm9sZSBleGVwdCB0aGUgcm9sZXMgdXNlZCBieSBlbXB0eSBhbHQgdmFsdWVzXHJcblx0XHRcdHJldHVybiBoYXNBbGxvd2VkRW1wdHlBbHRSb2xlID8gXCJpbWdcIiA6IHJvbGU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gaGFzQWxsb3dlZEVtcHR5QWx0Um9sZSA/IHJvbGUgOiBudWxsO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0aW5wdXQ6IChlbCwgcm9sZSkgPT4ge1xyXG5cdFx0c3dpdGNoKGVsLnR5cGUpIHtcclxuXHRcdFx0Y2FzZSBcImJ1dHRvblwiOlxyXG5cdFx0XHRcdHJldHVybiBoYXNBbGxvd2VkUm9sZShcImlucHV0VHlwZUJ1dHRvblwiLCByb2xlKSA/IHJvbGUgOiBcImJ1dHRvblwiO1xyXG5cdFx0XHRjYXNlIFwiY2hlY2tib3hcIjpcclxuXHRcdFx0XHRyZXR1cm4gaGFzQWxsb3dlZFJvbGUoXCJpbnB1dFR5cGVDaGVja2JveFwiLCByb2xlKSA/IHJvbGUgOiBcImNoZWNrYm94XCI7XHJcblx0XHRcdGNhc2UgXCJpbWFnZVwiOlxyXG5cdFx0XHRcdHJldHVybiBoYXNBbGxvd2VkUm9sZShcImlucHV0VHlwZUltYWdlXCIsIHJvbGUpID8gcm9sZSA6IFwiYnV0dG9uXCI7XHJcblx0XHRcdGNhc2UgXCJudW1iZXJcIjpcclxuXHRcdFx0XHRyZXR1cm4gXCJzcGluYnV0dG9uXCI7XHJcblx0XHRcdGNhc2UgXCJyYWRpb1wiOlxyXG5cdFx0XHRcdHJldHVybiByb2xlID09IFwibWVudWl0ZW1yYWRpb1wiID8gXCJtZW51aXRlbXJhZGlvXCIgOiBcInJhZGlvXCI7XHJcblx0XHRcdGNhc2UgXCJyYW5nZVwiOlxyXG5cdFx0XHRcdHJldHVybiBcInNsaWRlclwiO1xyXG5cdFx0XHRjYXNlIFwic2VhcmNoXCI6XHJcblx0XHRcdFx0cmV0dXJuIGVsLmxpc3QgPyBcImNvbWJvYm94XCIgOiBcInNlYXJjaGJveFwiO1xyXG5cdFx0XHRjYXNlIFwicmVzZXRcIjpcclxuXHRcdFx0Y2FzZSBcInN1Ym1pdFwiOlxyXG5cdFx0XHRcdHJldHVybiBcImJ1dHRvblwiO1xyXG5cdFx0XHRjYXNlIFwiZW1haWxcIjpcclxuXHRcdFx0Y2FzZSBcInRlbFwiOlxyXG5cdFx0XHRjYXNlIFwidGV4dFwiOlxyXG5cdFx0XHRjYXNlIFwidXJsXCI6XHJcblx0XHRcdFx0cmV0dXJuIGVsLmxpc3QgPyBcImNvbWJvYm94XCIgOiBcInRleHRib3hcIjtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGtleWdlbjogKCkgPT4gbnVsbCxcclxuXHRsYWJlbDogKCkgPT4gbnVsbCxcclxuXHRsZWdlbmQ6ICgpID0+IG51bGwsXHJcblx0bGk6IChlbCwgcm9sZSkgPT4ge1xyXG5cdFx0bGV0IGhhc0ltcGxpY2l0TGlzdGl0ZW1Sb2xlID0gZ2V0UGFyZW50V2l0aFRhZ05hbWUoZWwsIFtcIk9MXCIsIFwiVUxcIl0pO1xyXG5cclxuXHRcdGlmKGhhc0ltcGxpY2l0TGlzdGl0ZW1Sb2xlKSB7XHJcblx0XHRcdHJldHVybiBoYXNBbGxvd2VkUm9sZShcImxpXCIsIHJvbGUpID8gcm9sZSA6IFwibGlzdGl0ZW1cIjtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiByb2xlO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0bGluazogKGVsLCByb2xlKSA9PiB7XHJcblx0XHRpZihlbC5ocmVmKSByZXR1cm4gcm9sZSA/IG51bGwgOiBcImxpbmtcIjtcclxuXHRcdHJldHVybiByb2xlO1xyXG5cdH0sXHJcblx0bWFpbjogKCkgPT4gXCJtYWluXCIsXHJcblx0bWFwOiAoKSA9PiBudWxsLFxyXG5cdG1hdGg6ICgpID0+IFwibWF0aFwiLFxyXG5cdG1lbnU6IChlbCwgcm9sZSkgPT4gZWwudHlwZSA9PSBcImNvbnRleHRcIiA/IFwibWVudVwiIDogcm9sZSxcclxuXHRtZW51aXRlbTogKGVsLCByb2xlKSA9PiB7XHJcblx0XHRzd2l0Y2ggKGVsLnR5cGUpIHtcclxuXHRcdFx0Y2FzZSBcImNvbW1hbmRcIjpcclxuXHRcdFx0XHRyZXR1cm4gXCJtZW51aXRlbVwiO1xyXG5cdFx0XHRjYXNlIFwiY2hlY2tib3hcIjpcclxuXHRcdFx0XHRyZXR1cm4gXCJtZW51aXRlbWNoZWNrYm94XCI7XHJcblx0XHRcdGNhc2UgXCJyYWRpb1wiOlxyXG5cdFx0XHRcdHJldHVybiBcIm1lbnVpdGVtcmFkaW9cIjtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRyZXR1cm4gcm9sZTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdG1ldGE6ICgpID0+IG51bGwsXHJcblx0bWV0ZXI6ICgpID0+IG51bGwsXHJcblx0bmF2OiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwibmF2XCIsIHJvbGUpID8gcm9sZSA6IFwibmF2aWdhdGlvblwiLFxyXG5cdG5vc2NyaXB0OiAoKSA9PiBudWxsLFxyXG5cdG9iamVjdDogKGVsLCByb2xlKSA9PiBoYXNBbGxvd2VkUm9sZShcIm9iamVjdFwiLCByb2xlKSA/IHJvbGUgOiBudWxsLFxyXG5cdG9sOiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwib2xcIiwgcm9sZSkgPyByb2xlIDogXCJsaXN0XCIsXHJcblx0b3B0Z3JvdXA6ICgpID0+IFwiZ3JvdXBcIixcclxuXHRvcHRpb246IChlbCkgPT4ge1xyXG5cdFx0bGV0IHdpdGhpbk9wdGlvbkxpc3QgPSBbXCJzZWxlY3RcIiwgXCJvcHRncm91cFwiLCBcImRhdGFsaXN0XCJdLmluZGV4T2YoZWwucGFyZW50Tm9kZSkgPiAtMTtcclxuXHRcdHJldHVybiB3aXRoaW5PcHRpb25MaXN0ID8gXCJvcHRpb25cIiA6IG51bGw7XHJcblx0fSxcclxuXHRvdXRwdXQ6IChlbCwgcm9sZSkgPT4gcm9sZSA/IHJvbGUgOiBcInN0YXR1c1wiLFxyXG5cdHBhcmFtOiAoKSA9PiBudWxsLFxyXG5cdHBpY3R1cmU6ICgpID0+IG51bGwsXHJcblx0cHJvZ3Jlc3M6ICgpID0+IFwicHJvZ3Jlc3NiYXJcIixcclxuXHRzY3JpcHQ6ICgpID0+IG51bGwsXHJcblx0c2VjdGlvbjogKGVsLCByb2xlKSA9PiB7XHJcblx0XHRsZXQgaGFzVmFsaWRSb2xlID0gaGFzQWxsb3dlZFJvbGUoXCJzZWN0aW9uXCIsIHJvbGUpO1xyXG5cdFx0aWYoaGFzVmFsaWRSb2xlKSByZXR1cm4gcm9sZTtcclxuXHJcblx0XHQvLyBvbmx5IGlmIGFjY2Vzc2libGUgbmFtZVxyXG5cdFx0aWYoZWwudGl0bGUgfHwgZWwuaGFzQXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiKSB8fCBlbC5oYXNBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsbGVkYnlcIikpe1xyXG5cdFx0XHRyZXR1cm4gXCJzZWN0aW9uXCI7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gcm9sZTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdHNlbGVjdDogKGVsLCByb2xlKSA9PiB7XHJcblx0XHRpZihlbC5tdWx0aXBsZSAmJiBlbC5zaXplID4gMSl7XHJcblx0XHRcdHJldHVybiBcImxpc3Rib3hcIjtcclxuXHRcdH0gZWxzZSBpZighZWwubXVsdGlwbGUgJiYgZWwuc2l6ZSA8PSAxKSB7XHJcblx0XHRcdHJldHVybiByb2xlID09IFwibWVudVwiID8gcm9sZSA6IFwiY29tYm9ib3hcIjtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcm9sZTtcclxuXHR9LFxyXG5cdHNvdXJjZTogKCkgPT4gbnVsbCxcclxuXHRzdHlsZTogKCkgPT4gbnVsbCxcclxuXHRzdmc6IChlbCwgcm9sZSkgPT4gaGFzQWxsb3dlZFJvbGUoXCJzdmdcIiwgcm9sZSkgPyByb2xlIDogbnVsbCxcclxuXHRzdW1tYXJ5OiAoKSA9PiBcImJ1dHRvblwiLFxyXG5cdHRhYmxlOiAoZWwsIHJvbGUpID0+IHJvbGUgPyByb2xlIDogXCJ0YWJsZVwiLFxyXG5cdHRlbXBsYXRlOiAoKSA9PiBudWxsLFxyXG5cdHRleHRhcmVhOiAoKSA9PiBcInRleHRib3hcIixcclxuXHR0aGVhZDogKGVsLCByb2xlKSA9PiByb2xlID8gcm9sZSA6IFwicm93Z3JvdXBcIixcclxuXHR0Ym9keTogKGVsLCByb2xlKSA9PiByb2xlID8gcm9sZSA6IFwicm93Z3JvdXBcIixcclxuXHR0Zm9vdDogKGVsLCByb2xlKSA9PiByb2xlID8gcm9sZSA6IFwicm93Z3JvdXBcIixcclxuXHR0aXRsZTogKCkgPT4gbnVsbCxcclxuXHR0ZDogKGVsLCByb2xlKSA9PiBnZXRQYXJlbnRXaXRoVGFnTmFtZShlbCwgW1wiVEFCTEVcIl0pID8gXCJjZWxsXCIgOiByb2xlLFxyXG5cdHRoOiAoZWwsIHJvbGUpID0+IHtcclxuXHRcdGlmKHJvbGUpIHJldHVybiByb2xlO1xyXG5cdFx0cmV0dXJuIGdldFBhcmVudFdpdGhUYWdOYW1lKGVsLCBbXCJUSEVBRFwiXSkgPyBcImNvbHVtbmhlYWRlclwiIDogXCJyb3doZWFkZXJcIjtcclxuXHR9LFxyXG5cdHRyOiAoZWwsIHJvbGUpID0+IHtcclxuXHRcdC8vIHJvbGU9cm93LCBtYXkgYmUgZXhwbGljaXRseSBkZWNsYXJlZCB3aGVuIGNoaWxkIG9mIGEgdGFibGUgZWxlbWVudCB3aXRoIHJvbGU9Z3JpZFxyXG5cdFx0cmV0dXJuIHJvbGUgPyByb2xlIDogXCJyb3dcIjtcclxuXHR9LFxyXG5cdHRyYWNrOiAoKSA9PiBudWxsLFxyXG5cdHVsOiAoZWwsIHJvbGUpID0+IGhhc0FsbG93ZWRSb2xlKFwidWxcIiwgcm9sZSkgPyByb2xlIDogXCJsaXN0XCIsXHJcblx0dmlkZW86IChlbCwgcm9sZSkgPT4gcm9sZSA9PSBcImFwcGxpY2F0aW9uXCIgPyBcImFwcGxpY2F0aW9uXCIgOiBudWxsXHJcbn07XHJcblxyXG4vKipcclxuICogRmluZHMgbmVhcmVzdCBwYXJlbnQgd2l0aCBhIHNwZWNpZmlnIHRhZ05hbWVcclxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IFx0XHRlbCAgICAgIFx0XHRjaGlsZCAtIHN0YXJ0aW5nIHBvaW50ZXJcclxuICogQHBhcmFtICB7QXJyYXk8U3RyaW5nPn0gXHR0YWdOYW1lIFx0XHRBcnJheSBjb250YWluZyBjYXBhdGlsaXplZCB0YWduYW1lc1xyXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH0gICAgICAgICBcdFx0XHRcdFBhcmVudCB0aGF0IG1hdGNoZXMgb25lIG9mIHRoZSB0YWduYW1lc1xyXG4gKi9cclxuZnVuY3Rpb24gZ2V0UGFyZW50V2l0aFRhZ05hbWUoZWwsIHRhZ05hbWUpIHtcclxuXHR3aGlsZSAoZWwucGFyZW50Tm9kZSl7XHJcblx0XHRpZih0YWdOYW1lLmluZGV4T2YoZWwudGFnTmFtZSkgPiAtMSkgcmV0dXJuIGVsO1xyXG5cdFx0ZWwgPSBlbC5wYXJlbnROb2RlO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBnaXZlbiByb2xlIGlzIGFsbG93ZWQgZm9yIGdpdmVuIHRhZ1xyXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICB0YWdOYW1lIGtleSBvZiBhbGxvd2VkUm9sZXNcclxuICogQHBhcmFtICB7c3RyaW5nfSAgcm9sZSAgICBjdXJyZW50IHJvbGVcclxuICogQHJldHVybiB7Qm9vbGVhbn0gICAgICAgICBUcnVlIGlmIGFsbG93ZWRcclxuICovXHJcbmZ1bmN0aW9uIGhhc0FsbG93ZWRSb2xlKHRhZ05hbWUsIHJvbGUpIHtcclxuXHRyZXR1cm4gYWxsb3dlZFJvbGVzW3RhZ05hbWVdLmluZGV4T2Yocm9sZSkgPiAtMTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Q29tcHV0ZWRSb2xlKGVsKSB7XHJcblx0dmFyIHJvbGUgPSBlbC5nZXRBdHRyaWJ1dGUoXCJyb2xlXCIpO1xyXG5cdC8vIGNoZWNrIGlmIGdpdmVuIHJvbGUgZXhpc3RcclxuXHRpZihyb2xlKSByb2xlID0gcm9sZXNbcm9sZV0gPyByb2xlIDogbnVsbDtcclxuXHJcblx0dmFyIHRhZ05hbWUgPSBlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XHJcblx0Ly8gY2FsbCBwb3NzaWJsZSBjdXN0b20gZnVuY3Rpb24gaWYgdGFnIGhhcyBhbnlcclxuXHRpZiAocm9sZVBlckhUTUxUYWdbdGFnTmFtZV0pIHJldHVybiByb2xlUGVySFRNTFRhZ1t0YWdOYW1lXShlbCwgcm9sZSk7XHJcblxyXG5cdC8vIGRlZmF1bHQgYmVoYXZpb3IgYS5rLmEuIHNldCByb2xlXHJcblx0cmV0dXJuIHJvbGU7XHJcbn0iLCIvKipcclxuICogU2Nyb2xscyBhbiBlbGVtZW50IGludG8gaXRzIHBhcmVudCB2aWV3XHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gY2hpbGQgRWxlbWVudCB0byBzaG93XHJcbiAqL1xyXG5mdW5jdGlvbiBzY3JvbGxJbnRvVmlldyhjaGlsZCkge1xyXG5cdGxldCBwYXJlbnQgPSBjaGlsZC5vZmZzZXRQYXJlbnQ7XHJcblx0aWYgKHBhcmVudCAmJiBwYXJlbnQuc2Nyb2xsSGVpZ2h0ID4gcGFyZW50LmNsaWVudEhlaWdodCkge1xyXG5cdFx0dmFyIHNjcm9sbEJvdHRvbSA9IHBhcmVudC5jbGllbnRIZWlnaHQgKyBwYXJlbnQuc2Nyb2xsVG9wO1xyXG5cdFx0dmFyIGVsZW1lbnRCb3R0b20gPSBjaGlsZC5vZmZzZXRUb3AgKyBjaGlsZC5vZmZzZXRIZWlnaHQ7XHJcblx0XHRpZiAoZWxlbWVudEJvdHRvbSA+IHNjcm9sbEJvdHRvbSkge1xyXG5cdFx0XHRwYXJlbnQuc2Nyb2xsVG9wID0gZWxlbWVudEJvdHRvbSAtIHBhcmVudC5jbGllbnRIZWlnaHQ7XHJcblx0XHR9IGVsc2UgaWYgKGNoaWxkLm9mZnNldFRvcCA8IHBhcmVudC5zY3JvbGxUb3ApIHtcclxuXHRcdFx0cGFyZW50LnNjcm9sbFRvcCA9IGNoaWxkLm9mZnNldFRvcDtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBZGRzIGZvY3VzIHRvIHRoZSBmaXJzdCBlbGVtZW50XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGRlc2NlbmRhbnRzIEFycmF5IG9mIGFsbCBkZXNjZW5kYW50c1xyXG4gKi9cclxuZnVuY3Rpb24gc3RhcnQoZGVzY2VuZGFudHMpIHtcclxuXHRyZXR1cm4gYWRkKGRlc2NlbmRhbnRzWzBdKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFkZHMgZm9jdXMgdG8gdGhlIHByZXYgZWxlbWVudFxyXG4gKiBAcGFyYW0ge0FycmF5fSBkZXNjZW5kYW50cyBBcnJheSBvZiBhbGwgZGVzY2VuZGFudHNcclxuICogQHBhcmFtIHtPYmplY3R9IFx0Y2hpbGQgXHRcdFx0Q3VycmVudCBmb2N1c2VkIGVsZW1lbnRcclxuICovXHJcbmZ1bmN0aW9uIHByZXYoZGVzY2VuZGFudHMsIGNoaWxkKSB7XHJcblx0Ly8gZmluZCBpbmRleCBvZiBjdXJyZW50IGVsZW1lbnRcclxuXHRsZXQgaSA9IGRlc2NlbmRhbnRzLmluZGV4T2YoY2hpbGQpO1xyXG5cdGlmKGkgPD0gMCkgaSA9IDE7XHJcblxyXG5cdHJldHVybiBhZGQoZGVzY2VuZGFudHNbaSAtIDFdKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFkZHMgZm9jdXMgdG8gdGhlIG5leHQgZWxlbWVudFxyXG4gKiBAcGFyYW0ge0FycmF5fSBcdGRlc2NlbmRhbnRzIEFycmF5IG9mIGFsbCBkZXNjZW5kYW50c1xyXG4gKiBAcGFyYW0ge09iamVjdH0gXHRjaGlsZCBcdFx0XHRDdXJyZW50IGZvY3VzZWQgZWxlbWVudFxyXG4gKi9cclxuZnVuY3Rpb24gbmV4dChkZXNjZW5kYW50cywgY2hpbGQpIHtcclxuXHQvLyBmaW5kIGluZGV4IG9mIGN1cnJlbnQgZWxlbWVudFxyXG5cdGxldCBpID0gZGVzY2VuZGFudHMuaW5kZXhPZihjaGlsZCk7XHJcblx0aWYgKGkgPiBkZXNjZW5kYW50cy5sZW5ndGggLSAyKSBpID0gZGVzY2VuZGFudHMubGVuZ3RoIC0gMjtcclxuXHJcblx0cmV0dXJuIGFkZChkZXNjZW5kYW50c1tpICsgMV0pO1xyXG59XHJcblxyXG4vKipcclxuICogQWRkcyBmb2N1cyB0byB0aGUgbGFzdCBlbGVtZW50XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGRlc2NlbmRhbnRzIEFycmF5IG9mIGFsbCBkZXNjZW5kYW50c1xyXG4gKi9cclxuZnVuY3Rpb24gZW5kKGRlc2NlbmRhbnRzKSB7XHJcblx0cmV0dXJuIGFkZChkZXNjZW5kYW50c1tkZXNjZW5kYW50cy5sZW5ndGggLSAxXSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZChjaGlsZCkge1xyXG5cdGNoaWxkLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImF5LWhvdmVyXCIpO1xyXG5cdHNjcm9sbEludG9WaWV3KGNoaWxkLmVsZW1lbnQpO1xyXG5cdHJldHVybiBjaGlsZDtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlKGNoaWxkKSB7XHJcblx0Y2hpbGQuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiYXktaG92ZXJcIik7XHRcclxuXHRyZXR1cm4gY2hpbGQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldChkZXNjZW5kYW50cykge1xyXG5cdGxldCBheSA9IGRlc2NlbmRhbnRzLmZpbmQoaSA9PiBpLmVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYXktaG92ZXJcIikpO1xyXG5cdGlmKCFheSkgcmV0dXJuIGRlc2NlbmRhbnRzWzBdO1xyXG5cdHJldHVybiBheTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0U2VsZWN0ZWQoYXksIHZhbCkge1xyXG5cdGF5LnNlbGVjdGVkID0gdmFsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREZXNjZW5kYW50cyhheSkge1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdHN0YXJ0LFxyXG5cdHByZXYsXHJcblx0bmV4dCxcclxuXHRlbmQsXHJcblx0YWRkLFxyXG5cdHJlbW92ZSxcclxuXHRnZXQsXHJcblx0c2V0U2VsZWN0ZWQsXHJcblx0Z2V0RGVzY2VuZGFudHNcclxufTsiLCJpbXBvcnQgcm9sZXMgZnJvbSBcIi4vLi4vZGF0YS9yb2xlc1wiO1xuXG4vKipcbiAqIFJldHVybnMgYW4gY3NzIHNlbGVjdG9yIGZvciBhIGdpdmVuIHJvbGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgUm9sZSBuYW1lXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Um9sZShrZXkpIHtcblx0aWYgKCFyb2xlc1trZXldKSByZXR1cm47XG5cblx0cmV0dXJuIFwiW3JvbGU9J1wiICsga2V5ICsgXCInXVwiO1xufVxuXG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgd2l0aCBhbGwgY3NzIHNlbGVjdG9ycywgaW1wbGljaXQgYW5kIGV4cGxpY2l0LCBmb3IgYSBnaXZlbiByb2xlXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5IFJvbGUgbmFtZVxuICogQHJldHVybnMgez9BcnJheX07XG4gKi9cbmZ1bmN0aW9uIGdldFNlbGVjdG9yQXJyYXkoa2V5KSB7XG5cdGlmICghcm9sZXNba2V5XSkgcmV0dXJuO1xuXG5cdGxldCBzZWxlY3RvciA9IFtdO1xuXHRzZWxlY3Rvci5wdXNoKGdldFJvbGUoa2V5KSk7XG5cdGlmIChyb2xlc1trZXldLmltcGxpY2l0KSBzZWxlY3RvciA9IHNlbGVjdG9yLmNvbmNhdChyb2xlc1trZXldLmltcGxpY2l0KTtcblx0cmV0dXJuIHNlbGVjdG9yO1xufVxuXG4vKipcbiAqIFJldHVybnMgYW4gY29tcGxldGUgY3NzIHNlbGVjdG9yIHdpdGggaW1wbGljdCBlbGVtZW50cyBmb3IgYSBnaXZlbiByb2xlXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5IFJvbGUgbmFtZVxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldChrZXkpIHtcblx0cmV0dXJuIGdldFNlbGVjdG9yQXJyYXkoa2V5KS5qb2luKFwiLCBcIik7XG59XG5cbmZ1bmN0aW9uIGdldERlZXBSb2xlQXJyYXkoa2V5KSB7XG5cdGlmICghcm9sZXNba2V5XSkgcmV0dXJuO1xuXG5cdGxldCBzZWxlY3RvciA9IFtdO1xuXHRzZWxlY3Rvci5wdXNoKGdldFJvbGUoa2V5KSk7XG5cblx0aWYgKHJvbGVzW2tleV0uc3ViKSB7XG5cdFx0cm9sZXNba2V5XS5zdWIuZm9yRWFjaCh2YWwgPT4gc2VsZWN0b3IucHVzaChnZXRSb2xlKHZhbCkpKTtcblx0fVxuXG5cdHJldHVybiBzZWxlY3Rvcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZXBSb2xlKGtleSkge1xuXHRyZXR1cm4gZ2V0RGVlcFJvbGVBcnJheShrZXkpLmpvaW4oXCIsIFwiKTtcbn1cblxuZnVuY3Rpb24gZ2V0RGVlcFNlbGVjdG9yQXJyYXkoa2V5KSB7XG5cdGlmICghcm9sZXNba2V5XSkgcmV0dXJuO1xuXG5cdGxldCBzZWxlY3RvciA9IFtdO1xuXHRzZWxlY3RvciA9IHNlbGVjdG9yLmNvbmNhdChnZXRTZWxlY3RvckFycmF5KGtleSkpO1xuXG5cdGlmIChyb2xlc1trZXldLnN1Yikge1xuXHRcdHJvbGVzW2tleV0uc3ViLmZvckVhY2godmFsID0+IHNlbGVjdG9yID0gc2VsZWN0b3IuY29uY2F0KGdldFNlbGVjdG9yQXJyYXkodmFsKSkpO1xuXHR9XG5cblx0cmV0dXJuIHNlbGVjdG9yO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVlcChrZXkpIHtcblx0cmV0dXJuIGdldERlZXBTZWxlY3RvckFycmF5KGtleSkuam9pbihcIiwgXCIpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7IGdldFJvbGUsIGdldCwgZ2V0RGVlcFJvbGUsIGdldERlZXAgfTsiXX0=
