let {DataTypes} = require('sequelize')
let sequelize = require('../db/dbConfig')

const Admin = sequelize.define("Admin", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("admin", "superadmin"),
    allowNull: false,
    defaultValue: "admin",
  },
});

module.exports = Admin;
