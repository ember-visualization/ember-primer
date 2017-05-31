/**
 * Given an object with CSS/SVG transform definitions, return the string value
 * for use with the `transform` CSS property or SVG attribute. Note that we
 * can't always guarantee the order will match the author's intended order, so
 * authors should only use the object notation if they know that their transform
 * is commutative or that there is only one.
 *
 * Borrowed from Victory Charts
 *
 * @public
 * @param {Object} obj An object of transform definitions.
 * @returns {String} The generated transform string.
 */
export default function toTransformString(obj, ...more) {
  if (more.length > 0) {
    return more.reduce((memo, currentObj) => {
      return [memo, toTransformString(currentObj)].join(' ');
    }, toTransformString(obj));
  } else {
    if (!obj || typeof obj === 'string') {
      return obj;
    }
    let transforms = [];
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let value = obj[key];
        transforms.push(`${key}(${value})`);
      }
    }
    return transforms.join(' ').trim();
  }
}

