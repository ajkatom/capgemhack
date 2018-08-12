const Sequelize = require('sequelize');

const conn = new Sequelize(
  'postgresql://AJ:q1w2e3r4t5y6@emotionaldb.c31klho6donj.us-west-2.rds.amazonaws.com/emotionaldb',
  {
    define: {
      underscored: true
    },
    maxConcurrentQueries: 1000,
    dialect: 'postgres',
    dialectOptions: {
      ssl: 'Amazon RDS'
    },
    logging: false
  }
);
conn
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = conn;
