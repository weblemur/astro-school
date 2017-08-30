const { expect } = require('chai').use(require('chai-things'));
const { db, Campus, Student } = require('../db');

before(() => db.sync({force: true}) );

// erase all tasks after each spec
afterEach(() => db.sync({force: true}) );

describe('Campus Model', () => {
  let campus;
  beforeEach(() => campus = Campus.build());

  describe('Validations', () => {
    it('errors without a name', () => {
      return campus.validate()
        .then(() => {
          throw new Error('validation should fail when name is null');
        },
        err => {
          expect(err).to.be.an('error');
          expect(err.errors).to.contain.a.thing.with.property('path', 'name');
        });
    });
  });
});
