const conn = require('../conn');
const Sequelize = require('sequelize');

Emotion.define('emotions', {
  id: Sequelize.INTEGER,
  emotions: Sequelize.TEXT
});

module.exports = Emotion;
