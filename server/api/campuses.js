const campusesApi = require('express').Router();
const { Campus } = require('../../db/models');

campusesApi.get('/', (req, res, next) => {
  Campus.findAll()
    .then(campuses => res.json(campuses))
    .catch(next);
});

module.exports = campusesApi;
