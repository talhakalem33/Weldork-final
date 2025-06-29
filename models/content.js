const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const Content = sequelize.define("Content", {
    carouselTitle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    carouselImage: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    aboutTitle: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    aboutImage: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    aboutDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    aboutSlogan: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    appoinmentTitle: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    appoinmentDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    contactTitle: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    contactDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    newsletterDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

module.exports = Content;