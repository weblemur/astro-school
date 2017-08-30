const { expect } = require('chai');
const agent = require('supertest').agent(require('../server/start'));
const { db, Campus, Student } = require('../db');

const testCampuses = [
  { name: 'First Campus', imageUrl: '/test.jpg',
    students: [
      { name: 'Douglas', email: 'doug@moon.com' }
    ] },
  { name: 'Second School', imageUrl: '/test.jpg',
    students: [
      { name: 'Walter', email: 'wally@gmail.com' },
      { name: 'Jenna', email: 'jenna@erf.com' }
    ] }
];

before(() => {
  return db.sync({force: true})
    .then(() => testCampuses)
    .map(campus => Campus.create(campus, { include: [Student] }));
});

after(() => db.close());

/*** Tests ***/

describe('Campus API routes', () => {
  describe('GET /api/campuses', () => {
    it('sends a list of all campuses', () => {
      return agent.get('/api/campuses')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.length).to.equal(2);
        });
    });
  });
});

describe('Student API routes', () => {
  describe('GET /api/students', () => {
    it('sends a list of all students', () => {
      return agent.get('/api/students')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.length).to.equal(3);
        });
    });
  });
});
