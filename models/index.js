const bcrypt = require("bcrypt");
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

        const userCount = await User.count();
        if (userCount === 0) {
            const hashedPassword = await bcrypt.hash("root", 10);
            await User.create({
                name: "admin",
                password: hashedPassword,
            });
            console.log("Default admin user created.");
        } 
        
    } catch (err) {
        console.error(err);
    }
}

sync();

module.exports = { User, Settings, Content, Email, Appoinment, Item };
