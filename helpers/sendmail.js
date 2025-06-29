const nodemailer = require("nodemailer");
const { Settings } = require("../models/index");

let transporter;

async function createTransporter() {
  const settings = await Settings.findByPk(1);

  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    tls: {
      ciphers: 'SSLv3'
    },
    auth: {
      user: settings.Email,
      pass: settings.mailAppPassword
    }
  });
}

async function sendMail(mailOptions) {
  if (!transporter) {
    await createTransporter();
  }

  return transporter.sendMail(mailOptions);
}

module.exports = { sendMail };
