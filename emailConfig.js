const { Settings} = require("./models/index");

const emailConfig = {
    email: {
        username: null,
        password: null,
        from: null
    }
};

async function loadSettings() {
    try {
        const settings = await Settings.findByPk(1);
        
        emailConfig.email.username = settings.Email;
        emailConfig.email.password = settings.mailAppPassword;
        emailConfig.email.from = settings.Email;
    } catch (err) {
        console.error("Error loading settings:", err);
    }
}

loadSettings();

module.exports = emailConfig;