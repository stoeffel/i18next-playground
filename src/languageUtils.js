class LanguageUtil {
  constructor(detector, options) {
    this.detector = detector;
    this.options = options;

    this.whitelist = this.options.whitelist || false;
  }

  getLanguageFromCode(code) {
    if (code.indexOf('-') < 0) return code;

    let specialCases = ['nb-NO', 'nn-NO', 'nb-no', 'nn-no'];
    let p = code.split('-');
    return this.formatLanguageCode((specialCases.indexOf(code) > -1) ? p[1] : p[0]);
  }

  formatLanguageCode(code) {
    if (typeof code === 'string' && code.indexOf('-') > -1) {
      let p = code.split('-');

      return this.lowerCaseLng ?
        p[0].toLowerCase() +  '-' + p[1].toLowerCase() :
        p[0].toLowerCase() +  '-' + p[1].toUpperCase();
    } else {
      return this.options.lowerCaseLng ? code.toLowerCase() : code;
    }
  }

  isWhitelisted(code) {
    return (!this.whitelist || this.whitelist.indexOf(language) > -1) ? true : false;
  }

  toResolveHierarchy(code, fallbackCode) {
    fallbackCode = fallbackCode || this.options.fallbackCode;
    if (typeof fallbackCode === 'string') fallbackCode = [fallbackCode];

    let codes = [];
    function addCode(code) {
      if (this.isWhitelisted(code)) {
        codes.push(code);
      } else {
        logger.log('rejecting non-whitelisted language code: ' + code);
      }
    };

    if (typeof code === 'string' && code.indexOf('-') > -1) {
      if (this.options.load !== 'lngOnly') addCode(this.formatLanguageCode(code));
      if (this.options.load !== 'currentOnly') addCode(this.getLanguageFromCode(code));
    } else {
      addCode(this.formatLanguageCode(code));
    }

    fallbackCode.forEach(fc => {
      if (codes.indexOf(fc) < 0) codes.push(this.formatLanguageCode(fc));
    });

    return codes;
  }
};

export default LanguageUtil;
