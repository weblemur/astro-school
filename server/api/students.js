const studentApi = require('express').Router();
const { Student, Campus } = require('../../db/models');

studentApi.use((req, res, next) => {
  req.query = {};
  if (req.campus) {
    req.query.campusId = req.campus.id;
  }
  next();
});

studentApi.param('id', (req, res, next, id) => {
  req.query.id = id;
  Student.findOne({ where: req.query })
    .then(student => {
      if (!student) {
        res.sendStatus(404);
      } else {
        req.student = student;
        next();
      }
    })
    .catch(next);
});

studentApi.get('/', (req, res, next) => {
  Student.findAll({ where: req.query })
    .then(students => res.json(students))
    .catch(next);
});

studentApi.get('/:id', (req, res, next) => {
  res.json(req.student);
});

studentApi.post('/', (req, res, next) => {
  let studentParams = req.body;
  if (req.campus) {
    studentParams.campusId = req.campus.id;
  }
  Student.create(studentParams)
    .then(student => {
      res.status(201).json(student);
    })
    .catch(next);
});

studentApi.put('/:id', (req, res, next) => {
  req.student.update(req.body)
    .then(student => {
      res.status(200).json(student);
    })
    .catch(next);
});

studentApi.delete('/:id', (req, res, next) => {
  req.student.destroy()
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
});

studentApi.get('/:id/campus', (req, res, next) => {
  res.status(200);
  if (req.campus) {
    res.json(req.campus);
  } else {
    Campus.findById(req.student.campusId)
      .then(campus => res.json(campus))
      .catch(next);
  }
});

module.exports = studentApi;
