import * as utils from './utils';
import EventEmitter from './EventEmitter';
import ResourceStore from './ResourceStore';

function getDefaults() {
  return {

  };
}

class I18n  extends EventEmitter {
  constructor(options = {}, callback) {
    super();
    this.options = options;

    if (callback && !this.isInitialized) this.init(options, callback);
  }

  init(options, callback) {
    utils.extend(this.options, options, getDefaults());

    if (!this.options.isClone) {
      this.store = new ResourceStore(this.options.resources);
    }

    if (callback) callback(null);
  }

  changeLanguage(lng) {
    if (lng) {
      this.language = lng;
      this.emit('languageChanged', lng);
    }
  }

  createInstance(options = {}, callback) {
    return new I18n(options, callback);
  }

  cloneInstance(options = {}, callback) {
    let clone = new I18n(utils.extend(options, this.options, {isClone: true}), callback);
    const membersToCopy = ['store', 'language'];
    membersToCopy.forEach(m => {
      clone[m] = this[m];
    });

    return clone;
  }
}

export default new I18n();
