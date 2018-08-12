const conn = require('../conn');
const Sequelize = require('sequelize');

const Response = conn.define('responses', {
  id: { type: Sequelize.STRING, primaryKey: true },
  response: Sequelize.TEXT,
  is_email: Sequelize.BOOLEAN
});

module.exports = Response;
