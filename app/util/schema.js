// Schema validater
/**
 * Validate a schema
 * @param schema {Object} Schema to check against
 * @param candidate {Object} What to check
 */
module.exports = (schema, candidate, callback) => {
  if (typeof callback !== 'function') {
    callback = (err) => { if (err) throw err; };
  }
  for (let prop in schema) {
    if ({}.hasOwnProperty.call(schema, prop)) {
      // What to check with
      const check = schema[prop];
      if (typeof check === 'object') {
        // Basic check
        if (!check.hasOwnProperty('type')) {
          // No type prop
          throw new Error('\'type\' property must be specified in schema property defintion!');
        } else if (check.required && !candidate.hasOwnProperty(prop)) {
          // Here check
          return callback(
            new TypeError(`Property '${prop}' was not spcified. Expected a ${typeof check.type}.`)
          );
        } else {
          // Type check
          if (typeof candidate[prop] !== typeof check.type) {
            return callback(
              new TypeError(`Property '${prop}' was a '${typeof candidate[prop]}'. Expected a ${typeof check.type}.`)
            );
          }
        }
      } else {
        // Just the type
        if (typeof candidate[prop] !== typeof check && typeof candidate[prop] !== 'undefined') {
          return callback(
            new TypeError(`Property '${prop}' was a '${typeof candidate[prop]}'. Expected a ${typeof check}.`)
          );
        }
      }
    }
  }
  return callback();
};
