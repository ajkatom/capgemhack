const conn = require('../conn');
const Sequelize = require('sequelize');

Emotion.define('emotions', {
  emotions: []
});

module.exports = Emotion;
