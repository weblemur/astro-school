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

beforeEach(() => {
  return db.sync({force: true})
    .then(() => testCampuses)
    .map(campus => Campus.create(campus, { include: [Student] }));
});

after(() => db.close());


/*** Campus API Tests ***/


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

  describe('GET /api/campuses/:id', () => {
    it('sends info for a specific campus', () => {
      return agent.get('/api/campuses/1')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.id).to.equal(1);
        });
    });
    it('404s for non-existent campus', () => {
      return agent.get('/api/campuses/4')
        .expect(404);
    });
  });

  describe('POST /api/campuses/', () => {
    it('creates a new campus', () => {
      return agent.post('/api/campuses/')
        .send({ name: 'New Campus', imageUrl: 'test.jpg' })
        .expect(201)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.id).to.be.a('number');
          expect(res.body.name).to.equal('New Campus');
        })
        .then(() => Campus.findAll())
        .then(campuses => {
          expect(campuses.length).to.equal(3);
        });
    });
    it('500s for an invalid campus', () => {
      return agent.post('/api/campuses/')
        .send({})
        .expect(500)
        .then(() => Campus.findAll())
        .then(campuses => {
          expect(campuses.length).to.equal(2);
        });
    });
  });

  describe('PUT /api/campuses/:id', () => {
    it('updates a specific campus', () => {
      return agent.put('/api/campuses/1')
        .send({name: 'Updated Campus'})
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.name).to.equal('Updated Campus');
        })
        .then(() => Campus.findById(1))
        .then(campus => {
          expect(campus.name).to.equal('Updated Campus');
        });
    });
    it('404s for non-existent campus', () => {
      return agent.put('/api/campuses/4')
        .expect(404);
    });
    it('500s for invalid updates', () => {
      return agent.put('/api/campuses/1')
        .send({name: null})
        .expect(500)
        .then(() => Campus.findById(1))
        .then(campus => {
          expect(campus.name).to.equal('First Campus');
        });
    });
  });

  describe('DELETE /api/campuses/:id', () => {
    it('deletes a specific campus', () => {
      return agent.delete('/api/campuses/1')
        .expect(204)
        .then(() => Campus.findById(1))
        .then(campus => {
          expect(campus).to.equal(null);
        });
    });
    it('404s for non-existent campus', () => {
      return agent.delete('/api/campuses/4')
        .expect(404);
    });
  });
});


/*** Student API Tests ***/


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

  describe('GET /api/students/:id', () => {
    it('sends info for a specific student', () => {
      return agent.get('/api/students/1')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.id).to.equal(1);
        });
    });
    it('404s for non-existent student', () => {
      return agent.get('/api/students/4')
        .expect(404);
    });
  });

  describe('POST /api/students/', () => {
    it('creates a new student', () => {
      return agent.post('/api/students/')
        .send({ name: 'New Student', email: 'email@mail.com', campusId: 1 })
        .expect(201)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.id).to.be.a('number');
          expect(res.body.name).to.equal('New Student');
        })
        .then(() => Student.findAll())
        .then(students => {
          expect(students.length).to.equal(4);
        });
    });
    it('500s for an invalid student', () => {
      return agent.post('/api/students/')
        .send({})
        .expect(500)
        .then(() => Student.findAll())
        .then(students => {
          expect(students.length).to.equal(3);
        });
    });
  });

  describe('PUT /api/students/:id', () => {
    it('updates a specific student', () => {
      return agent.put('/api/students/1')
        .send({name: 'Updated Student'})
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.name).to.equal('Updated Student');
        })
        .then(() => Student.findById(1))
        .then(student => {
          expect(student.name).to.equal('Updated Student');
        });
    });
    it('404s for non-existent student', () => {
      return agent.put('/api/students/4')
        .expect(404);
    });
    it('500s for invalid updates', () => {
      return agent.put('/api/students/1')
        .send({name: null})
        .expect(500)
        .then(() => Student.findById(1))
        .then(student => {
          expect(student.name).to.equal('Douglas');
        });
    });
  });

  describe('DELETE /api/students/:id', () => {
    it('deletes a specific student', () => {
      return agent.delete('/api/students/1')
        .expect(204)
        .then(() => Student.findById(1))
        .then(student => {
          expect(student).to.equal(null);
        });
    });
    it('404s for non-existent student', () => {
      return agent.delete('/api/students/4')
        .expect(404);
    });
  });
});
