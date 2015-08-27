import EventEmitter from './EventEmitter';
import * as utils from './utils';

class ResourceStore extends EventEmitter {
  constructor(data = {}) {
    super();
    this.data = data;
  }

  getResource(lng, ns, key) {
    let path = lng + '.' + ns;
    if (key) path += '.' + key;
    if (lng.indexOf('.') > -1) {
      path = lng;
    }

    return utils.getPath(this.data, path);
  }

  addResource(lng, ns, key, value) {
    // todo: evtl. let this be handled somewhere outside
    // if (typeof ns !== 'string') {
    //     resource = ns;
    //     ns = o.ns.defaultNs;
    // } else if (o.ns.namespaces.indexOf(ns) < 0) {
    //     o.ns.namespaces.push(ns);
    // }

    let path = lng + '.' + ns + '.' + key;
    if (lng.indexOf('.') > -1) {
      path = lng;
      value = ns;
    }

    utils.setPath(this.data, path, value);

    // todo: evtl. just emit event
    // if (o.useLocalStorage) {
    //     sync._storeLocal(resStore);
    // }
  }

  addResourceBundle(lng, ns, resources, deep) {
    // todo: evtl. let this be handled somewhere outside
    // if (typeof ns !== 'string') {
    //     resources = ns;
    //     ns = o.ns.defaultNs;
    // } else if (o.ns.namespaces.indexOf(ns) < 0) {
    //     o.ns.namespaces.push(ns);
    // }

    let path = lng + '.' + ns;
    if (lng.indexOf('.') > -1) {
      path = lng;
      deep = resources;
      resources = ns;
    }

    let pack = utils.getPath(this.data, path);

    if (deep) {
      utils.deepExtend(pack, resources);
    } else {
      utils.extend(pack, resources);
    }

    // todo: evtl. just emit event
    // if (o.useLocalStorage) {
    //     sync._storeLocal(resStore);
    // }
  }

  removeResourceBundle(lng, ns) {
    // if (typeof ns !== 'string') {
    //     ns = o.ns.defaultNs;
    // }

    if (this.hasResourceBundle(lng, ns)) {
      delete this.data[lng][ns];
    }

    // if (o.useLocalStorage) {
    //     sync._storeLocal(resStore);
    // }
}

  hasResourceBundle(lng, ns) {
    return this.getResource(lng, ns) !== undefined;
  }

  getResourceBundle(lng, ns) {
    return this.getResource(lng, ns);
  }

  toJSON() {
    return this.data;
  }
}

export default ResourceStore;
