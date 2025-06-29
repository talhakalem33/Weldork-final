const config = require("../config");
const sequelize = require("sequelize");

const seq = new sequelize(config.db.database, config.db.user, config.db.password, {
    dialect: "mysql",
    host: config.db.host,
    storage: "./session.mysql"
});

async function connect() {
    try {
        await seq.authenticate();
        console.log("Database connection successful")
    } catch (err) {
        console.log(err);
    }
}

connect();
module.exports = seq;