'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const levelToColor = {
  n: '', // no color
  t: 'background: #2E2E2E; color: #2FE869', // green
  v: 'background: #2E2E2E; color: #E84FA7', // magenta
  d: 'background: #2E2E2E; color: #506BE8', // blue
  i: 'background: #2E2E2E; color: #2A94E8', // water
  w: 'background: #2E2E2E; color: #FFD144', // yellow
  e: 'background: #2E2E2E; color: #F04953' // red
};

class ColorLogger {
  constructor() {
    this._allLogs = [];
  }

  _getInfo() {
    // ToDo split info for different browsers
    // let caller;
    // let from;
    let info;
    try {
      throw new Error();
    } catch (e) {
      const stack = e.stack.split(`\n`);
      stack[0] === 'Error' && stack.shift();
      // ToDo split info for different browsers
      // let splits = stack[3];
      // console.log('< splits');
      // console.log(splits);
      // console.log('splits />');
      // const regexName = /at (.*) \(|(.*)@/g
      // caller = regexName.exec(splits)[1] || regexName.exec(splits)[2];
      // const regexFrom = /\/\/\/(.*)/g
      // from = regexFrom.exec(splits)[1];
      info = stack[3];
    }
    return info;
  }

  /**
   * clear all logs.
   */
  clearAllLogs() {
    this._allLogs = [];
  }

  /**
   * all logs
   * @type {String[]}
   */
  get allLogs() {
    return [].concat(this._allLogs);
  }

  /**
   * if false, not display log. default is true.
   */
  set debug(b) {
    this._debug = b;
  }

  /**
   * display log.
   * @param {string} level - log level. v, d, i, w, e.
   * @param {...*} msg - log message.
   * @returns {string} - formatted log message.
   * @private
   */
  _output(level) {
    const text = [];

    for (var _len = arguments.length, msg = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      msg[_key - 1] = arguments[_key];
    }

    for (const m of msg) {
      if (typeof m === 'object') {
        text.push(JSON.stringify(m, null, 2));
      } else {
        text.push(m);
      }
    }

    const color = levelToColor[level];
    const info = this._getInfo();

    const d = new Date();

    let hour = d.getHours();
    if (hour < 10) hour = `0${hour}`;
    let minutes = d.getMinutes();
    if (minutes < 10) minutes = `0${minutes}`;
    let sec = d.getSeconds();
    if (sec < 10) sec = `0${sec}`;
    const now = `${hour}:${minutes}:${sec}.${d.getMilliseconds()}`;
    const information = `[${now}] [${info}]`;
    const offColorLog = `[${level.toUpperCase()}] [${now}] ${text.join(' ')} [${info}] `;

    this._allLogs.push(offColorLog);
    if (this._allLogs.length > 10000) this._allLogs.shift();

    if (this._debug) {
      if (!(level === 'n')) {
        console.log(`%c${information}`, 'color: #AAA');
      }
      console.log(`%c${text.join(' ')}`, `${color}`);
    }
    return `${text.join(' ')}`;
  }

  /**
   * display verbose(purple) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  v() {
    for (var _len2 = arguments.length, msg = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      msg[_key2] = arguments[_key2];
    }

    return this._output.apply(this, ['v'].concat(msg));
  }

  /**
   * display debug(blue) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  d() {
    for (var _len3 = arguments.length, msg = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      msg[_key3] = arguments[_key3];
    }

    return this._output.apply(this, ['d'].concat(msg));
  }

  /**
   * display normal(no color) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  n() {
    for (var _len4 = arguments.length, msg = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      msg[_key4] = arguments[_key4];
    }

    return this._output.apply(this, ['n'].concat(msg));
  }

  /**
   * display info(green) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  i() {
    for (var _len5 = arguments.length, msg = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      msg[_key5] = arguments[_key5];
    }

    return this._output.apply(this, ['i'].concat(msg));
  }

  /**
   * display warning(yellow) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  w() {
    for (var _len6 = arguments.length, msg = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      msg[_key6] = arguments[_key6];
    }

    return this._output.apply(this, ['w'].concat(msg));
  }

  /**
   * display warning(red) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  e() {
    for (var _len7 = arguments.length, msg = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      msg[_key7] = arguments[_key7];
    }

    return this._output.apply(this, ['e'].concat(msg));
  }

}

exports.ColorLogger = ColorLogger;
const logger = new ColorLogger();
logger.debug = true;
exports.default = logger;