const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv').config();

const db_name = process.env.DB_NAME;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;

const connection = new Sequelize(db_name, db_user, db_password, {
    host: 'localhost',
    dialect: 'mysql',
    dialectModule: require('mysql2'),
});

const Users = connection.define('users', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Users.sync({force: false})

module.exports = Users;