const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const Settings = sequelize.define("setting", {
    isCarouselOn: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    isAboutOn: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    isAboutMain: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    isItemsOn: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    isItemsMain: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    isAppoinmentOn: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    isAppoinmentMain: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    isNewsletterOn: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    isNewsletterMain: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    instagram: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    twitter: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    facebook: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    youtube: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    brandName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mailAppPassword: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    favicon: {
        type: DataTypes.STRING,
        allowNull: true,
    }
    });

module.exports = Settings;