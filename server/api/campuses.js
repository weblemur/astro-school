const campusesApi = require('express').Router();
const { Campus } = require('../../db/models');

campusesApi.get('/', (req, res, next) => {
  Campus.getAll()
    .then(campuses => res.json(campuses))
    .catch(next);
});

module.exports = campusesApi;
