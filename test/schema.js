// Tests for app/util/schema
const schema = require('../app/util/schema');
const { expect } = require('chai');

// Test schema + candidates
const testSchema = { test: 'string' };
const candidate = { test: 'test string' };

describe('Schema validator tests', () => {
  it('should check that schema does not throw an error when a valid candidate is supplied', (done) => {
    schema(
      testSchema,
      candidate,
      done
    );
  });

  it('should set a default callback if no callback is specified', (done) => {
    expect(() => schema(testSchema, { test: 1 })).to.throw(TypeError, "Property 'test' was a 'number'. Expected a string.");
    done();
  });

  it('should throw an error if type prop is not specified for a prop which a required', (done) => {
    expect(() => schema({ test: {} }, candidate)).to.throw(Error, "'type' property must be specified in schema property definition!");
    done();
  });

  it('should throw an error when a required property is not in the candidate', (done) => {
    expect(() => schema({ test: { required: true, type: 'string' } }, {})).to.throw(Error, "Property 'test' was not specified. Expected a string.");
    done();
  });

  it('should throw an error when a required property has the wrong type in the candidate', (done) => {
    expect(() => schema({ test: { required: true, type: 'string' } }, { test: 1 })).to.throw(TypeError, "Property 'test' was a 'number'. Expected a string.");
    done();
  });

  it('should throw an error when a property has the wrong type in the candidate', (done) => {
    expect(() => schema(testSchema, { test: 1 })).to.throw(TypeError, "Property 'test' was a 'number'. Expected a string.");
    done();
  });
});
