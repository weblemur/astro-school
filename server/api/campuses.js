const campusApi = require('express').Router();
const { Campus } = require('../../db/models');

campusApi.param('id', (req, res, next, id) => {
  Campus.findById(id)
    .then(campus => {
      if (!campus) {
        res.sendStatus(404);
      } else {
        req.campus = campus;
        next();
      }
    })
    .catch(next);
});

campusApi.get('/', (req, res, next) => {
  Campus.findAll()
    .then(campuses => res.json(campuses))
    .catch(next);
});

campusApi.get('/:id', (req, res, next) => {
  res.json(req.campus);
});

campusApi.post('/', (req, res, next) => {
  Campus.create(req.body)
    .then(campus => {
      res.status(201).json(campus);
    })
    .catch(next);
});

campusApi.put('/:id', (req, res, next) => {
  req.campus.update(req.body)
    .then(campus => {
      res.status(200).json(campus);
    })
    .catch(next);
});

campusApi.delete('/:id', (req, res, next) => {
  req.campus.destroy()
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
});

// All restful routes in /server/api/students.js
// are mounted here on each individual campus route
campusApi.use('/:id/students', require('./students'));

module.exports = campusApi;
