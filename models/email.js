const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const Content = sequelize.define("Email", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Content;