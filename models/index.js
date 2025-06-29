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

        // Admin kullanıcı yoksa oluştur
        const userCount = await User.count();
        if (userCount === 0) {
            const hashedPassword = await bcrypt.hash("root", 10);
            await User.create({
                name: "admin",
                password: hashedPassword,
            });
            console.log("Default admin user created.");
        }

        // Settings yoksa oluştur
        const settingsCount = await Settings.count();
        if (settingsCount === 0) {
            await Settings.create({
                isCarouselOn: 1,
                isAboutOn: 1,
                isAboutMain: 1,
                isItemsOn: 1,
                isItemsMain: 1,
                isAppoinmentOn: 1,
                isAppoinmentMain: 1,
                isNewsletterOn: 1,
                isNewsletterMain: 1,
                Email: "info@example.com",
                phoneNumber: null,
                location: null,
                instagram: null,
                twitter: null,
                facebook: null,
                youtube: null,
                brandName: "MyBrand",
                mailAppPassword: null,
                favicon: null,
            });
            console.log("Default settings created.");
        }

        // Content yoksa oluştur
        const contentCount = await Content.count();
        if (contentCount === 0) {
            await Content.create({
                carouselTitle: "Welcome to our site!",
                carouselImage: null,
                aboutTitle: null,
                aboutImage: null,
                aboutDescription: null,
                aboutSlogan: null,
                appoinmentTitle: null,
                appoinmentDescription: null,
                contactTitle: null,
                contactDescription: null,
                newsletterDescription: null,
            });
            console.log("Default content created.");
        }

    } catch (err) {
        console.error(err);
    }
}

sync();

module.exports = { User, Settings, Content, Email, Appoinment, Item };