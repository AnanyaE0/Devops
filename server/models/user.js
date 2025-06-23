const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect
});

const User = sequelize.define('user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,       // optional, if you want emails unique
    validate: {
      isEmail: true
    }
  },
  event: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Sync the model with the database
sequelize.sync()
  .then(() => {
    console.log('User table synced');
  })
  .catch(err => {
    console.error('Error syncing User table:', err);
  });

module.exports = { User, sequelize };
