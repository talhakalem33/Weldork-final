require("dotenv").config();

const config = {
    db: {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    },
    website: {
        hostname: process.env.HOSTNAME
    }
};

module.exports = config;