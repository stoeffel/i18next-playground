export function setPath(object, path, newValue) {
  let stack = path.split('.');

  while(stack.length > 1) {
    let key = stack.shift();
    if (!object[key]) object[key] = {};
    object = object[key];
  }

  object[stack.shift()] = newValue;
}

export function getPath(object, path) {
  let stack = path.split('.');

  while(stack.length>1) {
    let key = stack.shift();
    if (!object[key]) return undefined;
    object = object[key];
  }

  return object[stack.shift()];
}

export function extend(target, source) {
  if (!source || typeof source === 'function') {
    return target;
  }

  for (let attr in source) { target[attr] = source[attr]; }
  return target;
}

export function deepExtend(target, source) {
  for (let prop in source) {
    if (prop in target) {
      _deepExtend(target[prop], source[prop]);
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}
