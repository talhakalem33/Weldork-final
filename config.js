const config = {
  db: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },
  website: {
    hostname: process.env.WEBSITE_HOSTNAME || "http://127.0.0.1:3000",
  },
};

module.exports = config;