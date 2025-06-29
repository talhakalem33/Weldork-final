const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const Item = sequelize.define("Item", {
    itemTitle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    itemImage: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    itemFrontImage: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    itemPredescription: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    itemDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

module.exports = Item;