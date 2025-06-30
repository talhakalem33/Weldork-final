const express = require("express");
const app = express();
const path = require("path");
const homeRoutes = require("./routes/home");
const adminRoutes = require("./routes/admin");
const sitemapRoutes = require("./routes/sitemap");
const robotsRoutes = require("./routes/robots");
const session = require("express-session");
const locals = require("./middlewares/locals");
var SequelizeStore = require("connect-session-sequelize")(session.Store);
const seq = require("./data/db");
const csurf = require("csurf");
const methodOverride = require("method-override");
require("dotenv").config();
//require("./startup/production")(app);

const sessionStore = new SequelizeStore({
  db: seq
});

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}));

sessionStore.sync();

app.use(locals);

app.use(csurf());

app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use(express.static(path.join(__dirname, "public")));

app.use(adminRoutes);
app.use(sitemapRoutes);
app.use(robotsRoutes);
app.use(homeRoutes);

let PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
    console.log('port ${PORT}');
});