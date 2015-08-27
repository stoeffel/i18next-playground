(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./imports/ConsoleWrapper"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./imports/ConsoleWrapper"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.ConsoleWrapper);
    global.main = mod.exports;
  }
})(this, function (exports, _importsConsoleWrapper) {
  "use strict";

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  var _ConsoleWrapper = _interopRequireDefault(_importsConsoleWrapper);

  var x = new _ConsoleWrapper["default"]();
  x.speak();
});
