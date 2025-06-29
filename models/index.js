const User = require("./user");
const Settings = require("./settings");
const Content = require("./content");
const Email = require("./email");
const Item = require("./item");
const Appoinment = require("./appoinment");
const sequelize = require("../data/db");

async function sync() {
    try {

        await sequelize.sync({ alter: true });
    } catch (err) {
        console.error(err);
    }
}

sync();

module.exports = {User, Settings, Content, Email, Appoinment, Item};