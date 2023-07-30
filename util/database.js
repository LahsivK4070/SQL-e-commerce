const Sequelize = require("sequelize");

const sequelize = new Sequelize('node-complete', 'root', 'hackMe@248605924', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;