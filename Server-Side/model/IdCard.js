const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbConfig');
const Visitor = require('./Visitor');

const IdCard = sequelize.define('IdCard', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true, // Automatically increments the ID
        primaryKey: true,
    },
    idCard: { // Changed from `IdCard` to `idCard` for proper naming convention
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Visitor,
            key: 'id',
        },
    },
});

// Associations
Visitor.hasOne(IdCard, { foreignKey: 'userID' });
IdCard.belongsTo(Visitor, { foreignKey: 'userID' });

module.exports = IdCard;
