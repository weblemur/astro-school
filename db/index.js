'use strict';

const db = require('./db');
const models = require('./models');

module.exports = Object.assign({}, { db }, models);
