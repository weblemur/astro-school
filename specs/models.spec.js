const { expect } = require('chai').use(require('chai-things'));
const { db, Campus, Student } = require('../db');

describe('Model Specs ––', () => {
  beforeEach(() => db.sync({force: true}) );

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

  describe('Student Model', () => {
    let student;
    beforeEach(() => student = Student.build());

    describe('Validations', () => {
      it('errors without a name', () => {
        return student.validate()
          .then(() => {
            throw new Error('validation should fail when name is null');
          },
          err => {
            expect(err).to.be.an('error');
            expect(err.errors).to.contain.a.thing.with.property('path', 'name');
          });
      });
      it('errors without an email', () => {
        return student.validate()
          .then(() => {
            throw new Error('validation should fail when email is null');
          },
          err => {
            expect(err).to.be.an('error');
            expect(err.errors).to.contain.a.thing.with.property('path', 'email');
          });
      });
      it('errors with an invalid email', () => {
        student.name = 'name';
        student.email = 'email';
        student.campusId = 1;
        return student.validate()
          .then(() => {
            throw new Error('validation should fail when email is invalid');
          },
          err => {
            expect(err).to.be.an('error');
            expect(err.errors).to.contain.a.thing.with.property('path', 'email');
          });
      });
      it('errors without an assigned campus', () => {
        student.name = 'name';
        student.email = 'email@domain.com';
        return student.validate()
          .then(() => {
            throw new Error('validation should fail when not assigned to a campus');
          },
          err => {
            expect(err).to.be.an('error');
            expect(err.errors).to.contain.a.thing.with.property('path', 'campusId');
          });
      });
    });
  });
});
