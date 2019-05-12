"use strict";

require("@babel/polyfill");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var React = require('react');

var _require = require("../lib/notebook-runtime"),
    Runtime = _require.Runtime,
    Inspector = _require.Inspector,
    Library = _require.Library;

var Observable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Observable, _React$Component);

  function Observable() {
    _classCallCheck(this, Observable);

    return _possibleConstructorReturn(this, _getPrototypeOf(Observable).apply(this, arguments));
  }

  _createClass(Observable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      var notebook = this.props.notebook;

      var _Runtime$load = Runtime.load(notebook, Object.assign({}, new Library(), {
        width: 600
      }), function (variable) {
        if (variable.name && Object.keys(_this.props.variables || {}).indexOf(variable.name) > -1) {
          variable.value =
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!true) {
                      _context.next = 5;
                      break;
                    }

                    _context.next = 3;
                    return this.props.variables[variable.name];

                  case 3:
                    _context.next = 0;
                    break;

                  case 5:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }).bind(_this);
        }

        if (variable.name && (_this.props.showCells || []).indexOf(variable.name) > -1) {
          var el = document.createElement('div');

          _this._ref.appendChild(el);

          return new Inspector(el);
        }
      }),
          runtime = _Runtime$load.runtime,
          main = _Runtime$load.main;

      this._runtime = runtime;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement("div", {
        ref: function ref(_ref) {
          return _this2._ref = _ref;
        }
      });
    }
  }]);

  return Observable;
}(React.Component);

module.exports = Observable;
