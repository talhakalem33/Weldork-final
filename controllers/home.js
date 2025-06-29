const {Settings, Content, Email, Appoinment} = require("../models/index"); 

exports.aboutGet = async function(req, res) {
 
    try {
        const settings = await Settings.findByPk(1);
        const content = await Content.findByPk(1);

        res.render("home/about", {
            settings: settings,
            content: content
        });

    } catch (err) {
        console.log(err);
    }
}

exports.appointmentGet = async function(req, res) {
 
    try {
        const settings = await Settings.findByPk(1);
        const content = await Content.findByPk(1);

        res.render("home/appoinment", {
            settings: settings,
            content: content
        });

    } catch (err) {
        console.log(err);
    }
}

exports.appointmentPost = async function(req, res) {
 
    try {
        const settings = await Settings.findByPk(1);
        const content = await Content.findByPk(1);

        const name = req.body.name;
        const email = req.body.mail;
        const message = req.body.message;

        await Appoinment.create({
            name: name,
            email: email,
            message: message
        });

        await Email.create({ 
            email: email
        });

        res.render("home/appoinment", {
            settings: settings,
            content: content
        });

    } catch (err) {
        console.log(err);
    }
}

exports.contactGet = async function(req, res) {
 
    try {
        const settings = await Settings.findByPk(1);
        const content = await Content.findByPk(1);

        res.render("home/contact", {
            settings: settings,
            content: content
        });

    } catch (err) {
        console.log(err);
    }
}

exports.homeIndexGet = async function(req, res) {
 
    try {
        const settings = await Settings.findByPk(1);
        const content = await Content.findByPk(1);

        res.render("home/index", {
            settings: settings,
            content: content
        });

    } catch (err) {
        console.log(err);
    }
}

exports.homeIndexPost = async function(req, res) {
    try {
        const settings = await Settings.findByPk(1);
        const content = await Content.findByPk(1);
        const email = req.body.email;

        await Email.create({
            email: email,
        });

        res.render("home/index", {
            settings: settings,
            content: content
        });

    } catch (err) {
        console.log(err);
    }
}