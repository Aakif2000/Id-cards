const { DataTypes } = require("sequelize");
const sequelize = require("../db/dbConfig"); // Adjusted to match the correct path

const Visitor = sequelize.define("Visitor", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true, // Automatically increments the ID
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  contactNo: { type: DataTypes.STRING, allowNull: false },
  companyName: { type: DataTypes.STRING, allowNull: false },
  designation: { type: DataTypes.STRING, allowNull: false },
  profileImage: { type: DataTypes.TEXT, allowNull: false }, // Base64 string
});

module.exports = Visitor;
