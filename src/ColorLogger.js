const levelToColor = {
  n: '', // no color
  t: 'background: #2E2E2E; color: #2FE869',  // green
  v: 'background: #2E2E2E; color: #E84FA7',  // magenta
  d: 'background: #2E2E2E; color: #506BE8',  // blue
  i: 'background: #2E2E2E; color: #2A94E8',  // water
  w: 'background: #2E2E2E; color: #FFD144', // yellow
  e: 'background: #2E2E2E; color: #F04953',  // red
};

export class ColorLogger {
  constructor() {
    this._allLogs = [];
  }

  _getInfo() {
    // ToDo split info for different browsers
    // let caller;
    // let from;
    let info
    try { throw new Error(); }
    catch (e) {
      const stack = e.stack.split(`\n`)
      stack[0] === 'Error' && stack.shift()
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
  _output(level, ...msg) {
    const text = [];

    // Circular reference fix
    const getCircularReplacer = () => {
      const seen = new WeakSet();
      return (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return;
          }
          seen.add(value);
        }
        return value;
      };
    };

    for (const m of msg) {
      if (typeof m === 'object') {
        text.push(JSON.stringify(m, getCircularReplacer(), 2));
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
      if (!( level === 'n')) {
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
  v(...msg) {
    return this._output('v', ...msg);
  }

  /**
   * display debug(blue) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  d(...msg) {
    return this._output('d', ...msg);
  }

  /**
   * display normal(no color) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  n(...msg) {
    return this._output('n', ...msg);
  }

  /**
   * display info(green) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  i(...msg) {
    return this._output('i', ...msg);
  }

  /**
   * display warning(yellow) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  w(...msg) {
    return this._output('w', ...msg);
  }

  /**
   * display warning(red) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  e(...msg) {
    return this._output('e', ...msg);
  }

}

const logger = new ColorLogger();
logger.debug = true;
export default logger;
