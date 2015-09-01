class ConsoleLogger {
  constructor(prefix = 'I18NEXT:') {
    this.prefix = prefix;
  }

  log(args) {
    this._output('log', args);
  }

  warn(args) {
    this._output('warn', args);
  }

  error(args) {
    this._output('error', args);
  }

  _output(type, args) {
    if (typeof args[0] === 'string') args[0] = this.prefix + ' ' + args[0];
    if (window.console && window.console[type]) window.console[type].apply(window.console, Array.prototype.slice.call(args));
  }
}

class Logger {
  constructor(logger, options) {
    this.init(logger, options);
    this.subs = [];
  }

  init(logger, options = { debug: true }) {
    this.logger = logger || this.logger;
    this.options = options;
    if (!this.logger) this.logger = new ConsoleLogger(options.prefix);
    this.debug = options.debug || true;
  }

  setDebug(bool) {
    this.debug = bool;
    this.subs.forEach(sub => {
      sub.setDebug(bool);
    });
  }

  log() {
    if (this.debug) this.logger.log(arguments);
  }

  warn() {
    if (this.debug) this.logger.warn(arguments);
  }

  error() {
    this.logger.error(arguments);
  }

  create(moduleName) {
    let sub = new Logger(new ConsoleLogger(this.logger.prefix + ':' + moduleName + ':'), this.options);
    this.subs.push(sub);

    return sub;
  }

  // createInstance(options = {}) {
  //   return new Logger(options, callback);
  // }

};

export default new Logger();
