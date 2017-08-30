const studentApi = require('express').Router();
const { Student } = require('../../db/models');

studentApi.param('id', (req, res, next, id) => {
  Student.findById(id)
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
  Student.findAll()
    .then(students => res.json(students))
    .catch(next);
});

studentApi.get('/:id', (req, res, next) => {
  res.json(req.student);
});

studentApi.post('/', (req, res, next) => {
  Student.create(req.body)
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

module.exports = studentApi;
