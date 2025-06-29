const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const User = sequelize.define("user", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    });

module.exports = User;