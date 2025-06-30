const {Settings, Content, Email, Appoinment, Item} = require("../models/index"); 

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

exports.itemsGet = async function(req, res) {
 
    try {
        const settings = await Settings.findByPk(1);
        const items = await Item.findAll();

        res.render("home/items", {
            settings: settings,
            items: items
        });

    } catch (err) {
        console.log(err);
    }
}

exports.itemsDetailGet = async function(req, res) {
    try {
        const settings = await Settings.findByPk(1);
        const id = decodeURIComponent(req.params.id);

        const item = await Item.findByPk(id);

        // Eğer item bulunamazsa (id veritabanında yoksa), /items'e yönlendir
        if (!item) {
            return res.redirect("/items");
        }

        // itemImage varsa ve JSON ise parse etmeye çalış
        if (item.itemImage) {
            try {
                item.itemImage = JSON.parse(item.itemImage);
            } catch (e) {
                item.itemImage = []; // JSON parse hatasında boş dizi
            }
        } else {
            item.itemImage = [];
        }

        res.render("home/itemsDetail", {
            settings: settings,
            item: item
        });

    } catch (err) {
        console.error("itemsDetailGet error:", err);
        // Herhangi bir hata oluşursa güvenli şekilde yönlendir
        res.redirect("/items");
    }
};