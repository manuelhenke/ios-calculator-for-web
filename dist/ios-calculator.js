/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 682:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(81);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@font-face{font-family:\"San Francisco\";font-weight:400;src:url(\"https://applesocial.s3.amazonaws.com/assets/styles/fonts/sanfrancisco/sanfranciscodisplay-regular-webfont.woff\")}:host{display:inline-block}*,*::after,*::before{-webkit-box-sizing:border-box;box-sizing:border-box}.calc{background-color:#000;border-radius:10px;display:inline-block;font-family:\"San Francisco\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Oxygen,Ubuntu,Cantarell,\"Open Sans\",\"Helvetica Neue\",sans-serif;color:#fff;padding:1rem}.calc .calc-solution{padding:3rem .5rem .5rem;font-size:4rem;overflow:hidden;white-space:nowrap;text-align:right;-o-text-overflow:ellipsis;text-overflow:ellipsis;width:17.875rem}.calc .calc-buttons-container{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:grid;grid-template-columns:repeat(4, 1fr);grid-template-rows:repeat(5, 1fr);gap:.625rem;font-size:2rem}.calc .calc-buttons-container .calc-button{padding:.5rem;border-radius:100%;cursor:pointer;opacity:.9;position:relative;-webkit-transition-duration:.4s;-o-transition-duration:.4s;transition-duration:.4s;overflow:hidden}.calc .calc-buttons-container .calc-button>span{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;place-items:center;place-content:center;text-align:center;height:3rem;width:3rem;line-height:3rem}.calc .calc-buttons-container .calc-button:hover{opacity:1}.calc .calc-buttons-container .calc-button::after{content:\"\";background:rgba(255,255,255,.25);display:block;position:absolute;inset:0;opacity:0;-webkit-transition:all .8s;-o-transition:all .8s;transition:all .8s;border-radius:inherit}.calc .calc-buttons-container .calc-button:active::after{opacity:1;-webkit-transition:0s;-o-transition:0s;transition:0s}.calc .calc-buttons-container .calc-button.calc-button-double{grid-column:span 2;border-radius:5rem;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:start}.calc .calc-buttons-container .calc-button.calc-button-digit{background-color:#444}.calc .calc-buttons-container .calc-button.calc-button-operand{background-color:orange}.calc .calc-buttons-container .calc-button.calc-button-operand.active{opacity:1;background-color:#fff;color:orange}.calc .calc-buttons-container .calc-button.calc-button-func{background-color:#afafaf;color:#000}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["Z"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 645:
/***/ (function(module) {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ 81:
/***/ (function(module) {



module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 361:
/***/ (function(__unused_webpack_module, __webpack_exports__) {

// Module
var code = "<div class=\"calc\"> <div class=\"calc-solution\"></div> <div class=\"calc-buttons-container\"> <div id=\"reset\" class=\"calc-button calc-button-func\"> <span>AC</span> </div> <div id=\"plus-minus\" class=\"calc-button calc-button-func\"> <span>+/-</span> </div> <div id=\"percentage\" class=\"calc-button calc-button-func\"> <span>%</span> </div> <div data-operand=\"/\" class=\"calc-button calc-button-operand\"> <span>÷</span> </div> <div data-digit=\"7\" class=\"calc-button calc-button-digit\"> <span>7</span> </div> <div data-digit=\"8\" class=\"calc-button calc-button-digit\"> <span>8</span> </div> <div data-digit=\"9\" class=\"calc-button calc-button-digit\"> <span>9</span> </div> <div data-operand=\"*\" class=\"calc-button calc-button-operand\"> <span>X</span> </div> <div data-digit=\"4\" class=\"calc-button calc-button-digit\"> <span>4</span> </div> <div data-digit=\"5\" class=\"calc-button calc-button-digit\"> <span>5</span> </div> <div data-digit=\"6\" class=\"calc-button calc-button-digit\"> <span>6</span> </div> <div data-operand=\"-\" class=\"calc-button calc-button-operand\"> <span>-</span> </div> <div data-digit=\"1\" class=\"calc-button calc-button-digit\"> <span>1</span> </div> <div data-digit=\"2\" class=\"calc-button calc-button-digit\"> <span>2</span> </div> <div data-digit=\"3\" class=\"calc-button calc-button-digit\"> <span>3</span> </div> <div data-operand=\"+\" class=\"calc-button calc-button-operand\"> <span>+</span> </div> <div data-digit=\"0\" class=\"calc-button calc-button-double calc-button-digit\"> <span>0</span> </div> <div data-digit=\",\" class=\"calc-button calc-button-digit\"> <span>,</span> </div> <div data-operand=\"=\" class=\"calc-button calc-button-operand\"> <span>=</span> </div> </div> </div> ";
// Exports
/* harmony default export */ __webpack_exports__["Z"] = (code);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/* unused harmony export iOSCalculator */
/* harmony import */ var _ios_calculator_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(361);
/* harmony import */ var _ios_calculator_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(682);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }



var template = document.createElement('template');
template.innerHTML = _ios_calculator_html__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z;
var sheet = document.createElement('style');
sheet.innerHTML = _ios_calculator_scss__WEBPACK_IMPORTED_MODULE_0__/* ["default"].toString */ .Z.toString();
var CHARACTERS = {
  PLUS: '+',
  MINUS: '-',
  MULTIPLY: '*',
  DIVIDE: '/',
  EQUALS: '=',
  NEGATIVE: '-',
  COMMA: ','
};
/**
 * @param {HTMLElement} elem
 */

function addActiveState(elem) {
  elem.classList.add('active');
}
/**
 * @param {HTMLElement} elem
 */


function removeActiveState(elem) {
  elem.classList.remove('active');
}
/**
 * @param {string} str
 * @returns {boolean}
 */


function endsWithOperand(str) {
  var lastChar = str.slice(-1);
  return [CHARACTERS.PLUS, CHARACTERS.MINUS, CHARACTERS.DIVIDE, CHARACTERS.MULTIPLY].includes(lastChar);
}

var _currentExpression = /*#__PURE__*/new WeakMap();

var _currentInput = /*#__PURE__*/new WeakMap();

var _suggestedInput = /*#__PURE__*/new WeakMap();

var _lastOperand = /*#__PURE__*/new WeakMap();

var _calcSolution = /*#__PURE__*/new WeakMap();

var _resetButton = /*#__PURE__*/new WeakMap();

var _plusMinusButton = /*#__PURE__*/new WeakMap();

var _percentageButton = /*#__PURE__*/new WeakMap();

var _operandButtons = /*#__PURE__*/new WeakMap();

var _digitButtons = /*#__PURE__*/new WeakMap();

var _onResetClick = /*#__PURE__*/new WeakSet();

var _onPlusMinusClick = /*#__PURE__*/new WeakSet();

var _onPercentageClick = /*#__PURE__*/new WeakSet();

var _onDigitClick = /*#__PURE__*/new WeakSet();

var _onOperandClick = /*#__PURE__*/new WeakSet();

var _getCurrentSolution = /*#__PURE__*/new WeakSet();

var _displaySolution = /*#__PURE__*/new WeakSet();

var iOSCalculator = /*#__PURE__*/function (_HTMLElement) {
  _inherits(iOSCalculator, _HTMLElement);

  var _super = _createSuper(iOSCalculator);

  function iOSCalculator() {
    var _this;

    _classCallCheck(this, iOSCalculator);

    _this = _super.call(this);

    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _displaySolution);

    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _getCurrentSolution);

    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _onOperandClick);

    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _onDigitClick);

    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _onPercentageClick);

    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _onPlusMinusClick);

    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _onResetClick);

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _currentExpression, {
      writable: true,
      value: ''
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _currentInput, {
      writable: true,
      value: ''
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _suggestedInput, {
      writable: true,
      value: ''
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _lastOperand, {
      writable: true,
      value: ''
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _calcSolution, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _resetButton, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _plusMinusButton, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _percentageButton, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _operandButtons, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _digitButtons, {
      writable: true,
      value: void 0
    });

    var shadowRoot = _this.attachShadow({
      mode: 'open'
    });

    shadowRoot.appendChild(sheet.cloneNode(true));
    shadowRoot.appendChild(template.content.cloneNode(true));

    _classPrivateFieldSet(_assertThisInitialized(_this), _calcSolution, shadowRoot.querySelector('.calc-solution'));

    _classPrivateFieldSet(_assertThisInitialized(_this), _resetButton, shadowRoot.getElementById('reset'));

    _classPrivateFieldSet(_assertThisInitialized(_this), _plusMinusButton, shadowRoot.getElementById('plus-minus'));

    _classPrivateFieldSet(_assertThisInitialized(_this), _percentageButton, shadowRoot.getElementById('percentage'));

    _classPrivateFieldSet(_assertThisInitialized(_this), _operandButtons, Array.from(shadowRoot.querySelectorAll('.calc-button-operand')));

    _classPrivateFieldSet(_assertThisInitialized(_this), _digitButtons, Array.from(shadowRoot.querySelectorAll('.calc-button-digit')));

    _classPrivateFieldGet(_assertThisInitialized(_this), _resetButton).addEventListener('click', _classPrivateMethodGet(_assertThisInitialized(_this), _onResetClick, _onResetClick2).bind(_assertThisInitialized(_this)));

    _classPrivateFieldGet(_assertThisInitialized(_this), _plusMinusButton).addEventListener('click', _classPrivateMethodGet(_assertThisInitialized(_this), _onPlusMinusClick, _onPlusMinusClick2).bind(_assertThisInitialized(_this)));

    _classPrivateFieldGet(_assertThisInitialized(_this), _percentageButton).addEventListener('click', _classPrivateMethodGet(_assertThisInitialized(_this), _onPercentageClick, _onPercentageClick2).bind(_assertThisInitialized(_this)));

    _classPrivateFieldGet(_assertThisInitialized(_this), _operandButtons).forEach(function (operandButton) {
      return operandButton.addEventListener('click', function (event) {
        return _classPrivateMethodGet(_assertThisInitialized(_this), _onOperandClick, _onOperandClick2).call(_assertThisInitialized(_this), event, operandButton);
      });
    });

    _classPrivateFieldGet(_assertThisInitialized(_this), _digitButtons).forEach(function (digitButton) {
      return digitButton.addEventListener('click', function (event) {
        return _classPrivateMethodGet(_assertThisInitialized(_this), _onDigitClick, _onDigitClick2).call(_assertThisInitialized(_this), event, digitButton);
      });
    });

    return _this;
  }

  _createClass(iOSCalculator, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      if (this.shadowRoot) {
        _classPrivateMethodGet(this, _displaySolution, _displaySolution2).call(this);
      }
    }
    /**
     * @param {PointerEvent} event
     */

  }], [{
    key: "observedAttributes",
    get: // TODO: use these

    /** @type {HTMLElement} */

    /** @type {HTMLElement} */

    /** @type {HTMLElement} */

    /** @type {HTMLElement} */

    /** @type {HTMLElement[]} */

    /** @type {HTMLElement[]} */
    function get() {
      return [];
    }
  }]);

  return iOSCalculator;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

function _onResetClick2(event) {
  event.preventDefault();

  var textSpan = _classPrivateFieldGet(this, _resetButton).querySelector('span');

  if (textSpan.textContent === 'AC') {
    // AC
    _classPrivateFieldSet(this, _currentInput, '');

    _classPrivateFieldSet(this, _currentExpression, '');

    _classPrivateFieldGet(this, _operandButtons).forEach(removeActiveState);
  } else {
    // C
    _classPrivateFieldSet(this, _currentInput, '0');

    textSpan.textContent = 'AC';
  }

  _classPrivateMethodGet(this, _displaySolution, _displaySolution2).call(this);
}

function _onPlusMinusClick2(event) {
  event.preventDefault();
  var number = '0';

  if (_classPrivateFieldGet(this, _currentInput).length > 0) {
    number = _classPrivateFieldGet(this, _currentInput);
  } else if (_classPrivateFieldGet(this, _currentExpression).length > 0) {
    number = _classPrivateMethodGet(this, _getCurrentSolution, _getCurrentSolution2).call(this);
  }

  if (number.startsWith(CHARACTERS.NEGATIVE)) {
    _classPrivateFieldSet(this, _currentInput, number.slice(1));
  } else {
    _classPrivateFieldSet(this, _currentInput, CHARACTERS.NEGATIVE + number);
  }

  _classPrivateMethodGet(this, _displaySolution, _displaySolution2).call(this);
}

function _onPercentageClick2(event) {
  event.preventDefault();
  var number = '0';

  if (_classPrivateFieldGet(this, _currentInput).length > 0) {
    number = _classPrivateFieldGet(this, _currentInput);
  } else if (_classPrivateFieldGet(this, _currentExpression).length > 0) {
    number = _classPrivateMethodGet(this, _getCurrentSolution, _getCurrentSolution2).call(this);
  }

  var intermediateInput = number.replace(/,/g, '.');
  intermediateInput += '/100'; // eslint-disable-next-line no-eval

  _classPrivateFieldSet(this, _currentInput, String(eval(intermediateInput)));

  _classPrivateFieldSet(this, _currentInput, _classPrivateFieldGet(this, _currentInput).replace('.', CHARACTERS.COMMA));

  _classPrivateMethodGet(this, _displaySolution, _displaySolution2).call(this);
}

function _onDigitClick2(event, digitButton) {
  event.preventDefault();
  var clickedDigit = digitButton.dataset.digit || '';

  if (clickedDigit === CHARACTERS.NEGATIVE && _classPrivateFieldGet(this, _currentInput).includes(CHARACTERS.NEGATIVE)) {
    // prevent clicking multiple times -> ,
    return;
  }

  if (!endsWithOperand(_classPrivateFieldGet(this, _currentExpression))) {
    // reset expression if user starts a new calculations
    // -> clicking a number with clicking an operand beforehand
    _classPrivateFieldSet(this, _currentExpression, '');
  }

  _classPrivateFieldGet(this, _resetButton).querySelector('span').textContent = 'C';

  if (_classPrivateFieldGet(this, _currentInput) === '' && clickedDigit === CHARACTERS.COMMA) {
    _classPrivateFieldSet(this, _currentInput, "0".concat(CHARACTERS.COMMA));
  } else if (_classPrivateFieldGet(this, _currentInput) === '0' && clickedDigit !== CHARACTERS.COMMA) {
    _classPrivateFieldSet(this, _currentInput, clickedDigit);
  } else if (_classPrivateFieldGet(this, _currentInput) === "".concat(CHARACTERS.NEGATIVE, "0") && clickedDigit !== CHARACTERS.COMMA) {
    _classPrivateFieldSet(this, _currentInput, CHARACTERS.NEGATIVE + clickedDigit);
  } else {
    _classPrivateFieldSet(this, _currentInput, _classPrivateFieldGet(this, _currentInput) + clickedDigit);
  }

  _classPrivateMethodGet(this, _displaySolution, _displaySolution2).call(this);
}

function _onOperandClick2(event, operandButton) {
  event.preventDefault();

  _classPrivateFieldGet(this, _operandButtons).forEach(removeActiveState);

  var clickedOperand = operandButton.dataset.operand;

  if (_classPrivateFieldGet(this, _currentInput)) {
    _classPrivateFieldSet(this, _currentExpression, _classPrivateFieldGet(this, _currentExpression) + _classPrivateFieldGet(this, _currentInput));
  }

  if (_classPrivateFieldGet(this, _currentExpression).length === 0) {
    // in case user starts his calculation directly with an operand
    _classPrivateFieldSet(this, _currentExpression, '0');
  }

  if (endsWithOperand(_classPrivateFieldGet(this, _currentExpression))) {
    // if the user clicks two operands in a row, remove the last one
    _classPrivateFieldSet(this, _currentExpression, _classPrivateFieldGet(this, _currentExpression).slice(0, -1));
  }

  if (clickedOperand !== CHARACTERS.EQUALS) {
    _classPrivateFieldSet(this, _currentExpression, _classPrivateFieldGet(this, _currentExpression) + clickedOperand);

    addActiveState(operandButton);
  } else {
    if (_classPrivateFieldGet(this, _currentExpression).endsWith(')')) {
      // clicking = multiple times in a row
      var latestOperandIndex = -1;

      for (var index = _classPrivateFieldGet(this, _currentExpression).length - 1; index > 0; index -= 1) {
        if (endsWithOperand(_classPrivateFieldGet(this, _currentExpression)[index])) {
          latestOperandIndex = index;
          break;
        }
      }

      if (latestOperandIndex !== -1) {
        _classPrivateFieldSet(this, _currentExpression, _classPrivateFieldGet(this, _currentExpression) + _classPrivateFieldGet(this, _currentExpression).slice(latestOperandIndex, -1));
      }
    }

    _classPrivateFieldSet(this, _currentExpression, "(".concat(_classPrivateFieldGet(this, _currentExpression), ")"));
  }

  _classPrivateFieldSet(this, _currentInput, '');

  _classPrivateMethodGet(this, _displaySolution, _displaySolution2).call(this);
}

function _getCurrentSolution2() {
  var expressionToEvaluate = _classPrivateFieldGet(this, _currentExpression) || '0';

  if (endsWithOperand(expressionToEvaluate)) {
    expressionToEvaluate = expressionToEvaluate.slice(0, -1);
  }

  expressionToEvaluate = expressionToEvaluate.replace(/,/g, '.');

  try {
    // eslint-disable-next-line no-eval
    return eval(expressionToEvaluate).toString();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return 'Error';
  }
}

function _displaySolution2() {
  var integerToDisplay;

  if (_classPrivateFieldGet(this, _currentInput).length > 0) {
    _classPrivateFieldGet(this, _operandButtons).forEach(removeActiveState);

    integerToDisplay = _classPrivateFieldGet(this, _currentInput);
  } else if (_classPrivateFieldGet(this, _currentExpression).length > 0) {
    var expressionToDisplay = _classPrivateFieldGet(this, _currentExpression) || '0';

    if (!endsWithOperand(expressionToDisplay)) {
      _classPrivateFieldGet(this, _operandButtons).forEach(removeActiveState);
    }

    integerToDisplay = _classPrivateMethodGet(this, _getCurrentSolution, _getCurrentSolution2).call(this);
  } else {
    integerToDisplay = '0';
  }

  integerToDisplay = integerToDisplay.replace('.', CHARACTERS.COMMA);
  _classPrivateFieldGet(this, _calcSolution).textContent = integerToDisplay;
}

window.customElements.define('ios-calculator', iOSCalculator);
}();
/******/ })()
;