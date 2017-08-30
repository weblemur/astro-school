'use strict';
var Sequelize = require('sequelize');
var db = require('../db.js');

module.exports = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
