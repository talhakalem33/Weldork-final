const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const Appoinment = sequelize.define("Appoinment", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

module.exports = Appoinment;