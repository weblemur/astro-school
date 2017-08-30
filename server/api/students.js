const studentsApi = require('express').Router();
const { Student } = require('../../db/models');

studentsApi.get('/', (req, res, next) => {
  Student.getAll()
    .then(students => res.json(students))
    .catch(next);
});

module.exports = studentsApi;
