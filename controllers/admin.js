const {User, Settings, Content, Email, Appoinment, Item} = require("../models/index");
const bcrypt = require("bcrypt");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const smtp = require("../helpers/sendmail");
const emailConfig = require("../emailConfig");

exports.adminIndexGet = async function(req, res) {
 
    try {

        const user = await User.findOne({
            where: { id: req.session.userId },
        });

        res.render("admin/index", {
            user: user
        });

    } catch (err) {
        console.log(err);
    }
}

exports.Get401 = async function(req, res) {
 
    try {

        res.render("admin/401");

    } catch (err) {
        console.log(err);
    }
}

exports.Get404 = async function(req, res) {
 
    try {

        res.render("admin/404");

    } catch (err) {
        console.log(err);
    }
}

exports.Get500 = async function(req, res) {
 
    try {

        res.render("admin/500");

    } catch (err) {
        console.log(err);
    }
}

exports.loginGet = async function(req, res) {
 
    try {

        res.render("admin/login");

    } catch (err) {
        console.log(err);
    }
}

exports.loginPost = async function(req, res) {
    const name = req.body.name;
    const password = req.body.password;
 
    try {

        const user = await User.findOne({
            where: {
                name:name
            }
        });

        if(!user){
            return res.render("admin/404");
        }


        const match = await bcrypt.compare(password, user.password);

        if(match){
            //session
            req.session.isAuth = true;
            req.session.userId = user.id;

            res.redirect("/admin");

        }else{
            return res.render("admin/401");
        }

    } catch (err) {
        console.log(err);
    }
}

exports.passwordGet = async function(req, res) {
 
    try {

        res.render("admin/password");

    } catch (err) {
        console.log(err);
    }
}

exports.logout = async function(req, res) {

    try {

        //session logout
        req.session.destroy();

        return res.redirect("/admin/login");
    } catch (err) {
        console.log(err);
    }
    

}

exports.contentGet = async function(req, res) {
 
    try {

        const content = await Content.findByPk(1);

        const user = await User.findOne({
            where: { id: req.session.userId },
        });

        res.render("admin/content", {
            user: user,
            content: content,
            csrfToken: req.csrfToken()
        });

    } catch (err) {
        console.log(err);
    }
}

exports.contentPut = async function(req, res) {
    try {
        const user = await User.findOne({
            where: { id: req.session.userId },
        });

        const content = await Content.findByPk(1);
        content.carouselTitle = req.body.carouselTitle;
        content.aboutTitle = req.body.aboutTitle;
        content.aboutDescription = req.body.aboutDescription;
        content.aboutSlogan = req.body.aboutSlogan;
        content.appoinmentTitle = req.body.appoinmentTitle;
        content.appoinmentDescription = req.body.appoinmentDescription;
        content.contactTitle = req.body.contactTitle;
        content.contactDescription = req.body.contactDescription;
        content.newsletterDescription = req.body.newsletterDescription;

        if (req.files && req.files.carouselImage) {
            const inputPath = req.files.carouselImage[0].path;
            const outputFileName = `carousel-${Date.now()}.jpg`;
            const outputPath = path.join("public", "img", outputFileName);

            const oldImage = content.carouselImage;
            const oldImagePath = oldImage ? path.join("public", "img", oldImage) : null;

            await sharp(inputPath)
                .resize(1920, 1080)
                .toFormat("jpeg")
                .jpeg({ quality: 80 })
                .toFile(outputPath);

            fs.unlinkSync(inputPath);

            if (oldImage && fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }

            content.carouselImage = outputFileName;
        }

        if (req.files && req.files.aboutImage) {
        const inputPath = req.files.aboutImage[0].path;
        const outputFileName = `about-${Date.now()}.jpg`;
        const outputPath = path.join("public", "img", outputFileName);

        const oldImage = content.aboutImage;
        const oldImagePath = oldImage ? path.join("public", "img", oldImage) : null;

        await sharp(inputPath)
        .resize(700, 700)
        .toFormat("jpeg")
        .jpeg({ quality: 80 })
        .toFile(outputPath);


        fs.unlinkSync(inputPath);

        if (oldImage && fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
        }


        content.aboutImage = outputFileName;
    }

        await content.save();

        res.render("admin/content", {
            user: user,
            content: content,
            csrfToken: req.csrfToken(),
        });

    } catch (err) {
        console.log(err);
        res.render("admin/500");
    }
};

exports.contentCarouselGet = async function(req, res) {
 
    try {

        const user = await User.findOne({
            where: { id: req.session.userId },
        });

        res.render("admin/contentCarousel", {
            user: user,
        });

    } catch (err) {
        console.log(err);
    }
}

exports.contentAboutGet = async function(req, res) {
 
    try {

        const user = await User.findOne({
            where: { id: req.session.userId },
        });

        res.render("admin/contentAbout", {
            user: user,
        });

    } catch (err) {
        console.log(err);
    }
}

exports.contentAppoinmentGet = async function(req, res) {
 
    try {

        const user = await User.findOne({
            where: { id: req.session.userId },
        });

        res.render("admin/contentAppoinment", {
            user: user,
        });

    } catch (err) {
        console.log(err);
    }
}

exports.contentContactGet = async function(req, res) {
 
    try {

        const user = await User.findOne({
            where: { id: req.session.userId },
        });

        res.render("admin/contentContact", {
            user: user,
        });

    } catch (err) {
        console.log(err);
    }
}

exports.contentNewsletterGet = async function(req, res) {
 
    try {

        const user = await User.findOne({
            where: { id: req.session.userId },
        });

        res.render("admin/contentNewsletter", {
            user: user,
        });

    } catch (err) {
        console.log(err);
    }
}

exports.settingsGet = async function(req, res) {
 
    try {

        const user = await User.findOne({
            where: { id: req.session.userId },
        });

        const settings = await Settings.findByPk(1);


        res.render("admin/settings", {
            user: user,
            settings: settings
        });

    } catch (err) {
        console.log(err);
    }
}

exports.settingsPut = async function(req, res) {
    try {
        const user = await User.findOne({
            where: { id: req.session.userId },
        });

        const settings = await Settings.findByPk(1);

        settings.isCarouselOn = !!req.body.isCarouselOn;
        settings.isAboutOn = !!req.body.isAboutOn;
        settings.isItemsOn = !!req.body.isItemsOn;
        settings.isFeaturesOn = !!req.body.isFeaturesOn;
        settings.isAppoinmentOn = !!req.body.isAppoinmentOn;
        settings.isTeamOn = !!req.body.isTeamOn;
        settings.isNewsletterOn = !!req.body.isNewsletterOn;
        settings.isAboutMain = !!req.body.isAboutMain;
        settings.isItemsMain = !!req.body.isItemsMain;
        settings.isFeaturesMain = !!req.body.isFeaturesMain;
        settings.isAppoinmentMain = !!req.body.isAppoinmentMain;
        settings.isTeamMain = !!req.body.isTeamMain;
        settings.isNewsletterMain = !!req.body.isNewsletterMain;
        settings.Email = req.body.Email;
        settings.phoneNumber = req.body.phoneNumber !== '' ? parseInt(req.body.phoneNumber) : null;
        settings.location = req.body.location && req.body.location.trim() !== '' ? req.body.location.trim() : null;
        settings.instagram = req.body.instagram && req.body.instagram.trim() !== '' ? req.body.instagram.trim() : null;
        settings.twitter   = req.body.twitter && req.body.twitter.trim() !== '' ? req.body.twitter.trim() : null;
        settings.facebook  = req.body.facebook && req.body.facebook.trim() !== '' ? req.body.facebook.trim() : null;
        settings.youtube  = req.body.youtube && req.body.youtube.trim() !== '' ? req.body.youtube.trim() : null;
        settings.brandName = req.body.brandName;
        settings.mailAppPassword = req.body.mailAppPassword;   

        if (req.files && req.files.favicon) {
            const inputPath = req.files.favicon[0].path;
            const outputFileName = `favicon-${Date.now()}.png`;
            const outputPath = path.join("public", "img", outputFileName);

            const oldFavicon = settings.favicon;
            const oldFaviconPath = oldFavicon ? path.join("public", "img", oldFavicon) : null;

            await sharp(inputPath)
                .resize(64, 64)
                .toFormat("png")
                .png({ quality: 80 })
                .toFile(outputPath);

            fs.unlinkSync(inputPath);

            if (oldFavicon && fs.existsSync(oldFaviconPath)) {
                fs.unlinkSync(oldFaviconPath);
            }

            settings.favicon = outputFileName;
        }

        await settings.save();

        res.render("admin/settings", {
            user: user,
            settings: settings
        });

    } catch (err) {
        console.log(err);
        res.render("admin/500");
    }
};

exports.emailGet = async function(req, res) {
 
    try {

        const user = await User.findOne({
            where: { id: req.session.userId },
        });

        const emails = await Email.findAll();


        res.render("admin/email", {
            user: user,
            emails: emails
        });

    } catch (err) {
        console.log(err);
    }
}

exports.emailPost = async function(req, res) {
 
    try {

        const user = await User.findOne({
            where: { id: req.session.userId },
        });

        const emails = await Email.findAll();

        const mail = req.body.mail;
        const subject = req.body.subject;

        for (const e of emails) {
            await smtp.sendMail({
                from: emailConfig.email.from,
                to: e.email,
                subject: subject,
                html: mail
            });
        }


        res.render("admin", {
            user: user,
            emails: emails
        });

    } catch (err) {
        console.log(err);
    }
}

exports.emailDeleteGet = async function(req, res) {
    const { Email } = require("../models");

    try {
        const email = decodeURIComponent(req.params.email);
        await Email.destroy({ where: { email } });
        res.redirect("/admin/email");
    } catch (err) {
        console.log(err);
        res.redirect("/admin/500");
    }
}

exports.appoinmentGet = async function(req, res) {
 
    try {

        const user = await User.findOne({
            where: { id: req.session.userId },
        });

        const appoinment = await Appoinment.findAll();


        res.render("admin/appoinment", {
            user: user,
            appoinment: appoinment
        });

    } catch (err) {
        console.log(err);
    }
}

exports.appoinmentDetailGet = async function(req, res) {
 
    try {
        const user = await User.findOne({
            where: { id: req.session.userId },
        });

        const id = decodeURIComponent(req.params.id);

        const appoinment = await Appoinment.findByPk(id);

        res.render("admin/appoinmentDetail", {
            user: user,
            appoinment: appoinment
        });

    } catch (err) {
        console.log(err);
    }
}

exports.appoinmentDetailDeleteGet = async function(req, res) {

    try {
        const id = decodeURIComponent(req.params.id);

        await Appoinment.destroy({ where: { id } });

        res.redirect("/admin");
    } catch (err) {
        console.log(err);
        res.redirect("/admin/500");
    }
}

exports.userGet = async function(req, res) {
 
    try {

        const user = await User.findOne({
            where: { id: req.session.userId },
        });

        const users = await User.findAll();


        res.render("admin/user", {
            user: user,
            users: users
        });

    } catch (err) {
        console.log(err);
    }
}

exports.userPost = async function(req, res) {
 
    try {

        const user = await User.findOne({
            where: { id: req.session.userId },
        });

        const users = await User.findAll();

        const name = req.body.name;
        const password = req.body.password;

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name: name,
            password: hashedPassword
        });


        res.render("admin/user", {
            user: user,
            users: users
        });

    } catch (err) {
        console.log(err);
    }
}

exports.userDetailGet = async function(req, res) {
 
    try {
        const user = await User.findOne({
            where: { id: req.session.userId },
        });

        const id = decodeURIComponent(req.params.id);

        const userDet = await User.findByPk(id);

        res.render("admin/userDetail", {
            user: user,
            userDet: userDet
        });

    } catch (err) {
        console.log(err);
    }
}

exports.userDetailPost = async function(req, res) {
 
    try {
        const user = await User.findOne({
            where: { id: req.session.userId },
        });

        const id = decodeURIComponent(req.params.id);

        const userDet = await User.findByPk(id);
        const password = req.body.password;

        const hashedPassword = await bcrypt.hash(password, 10);

        userDet.password = hashedPassword;

        await userDet.save();

        res.render("admin/userDetail", {
            user: user,
            userDet: userDet
        });

    } catch (err) {
        console.log(err);
    }
}

exports.userDetailDeleteGet = async function(req, res) {

    try {
        const id = decodeURIComponent(req.params.id);

        if(id != 1){
            await User.destroy({ where: { id } });
        }

        res.redirect("/admin/user");
    } catch (err) {
        console.log(err);
        res.redirect("/admin/500");
    }
}

exports.itemGet = async function(req, res) {
 
    try {

        const user = await User.findOne({
            where: { id: req.session.userId },
        });

        const items = await Item.findAll();


        res.render("admin/items", {
            user: user,
            items: items
        });

    } catch (err) {
        console.log(err);
    }
}

exports.itemCreateGet = async function(req, res) {
 
    try {

        const user = await User.findOne({
            where: { id: req.session.userId },
        });


        res.render("admin/itemCreate", {
            user: user
        });

    } catch (err) {
        console.log(err);
    }
}

exports.itemCreatePost = async function (req, res) {
    try {
        const user = await User.findOne({
            where: { id: req.session.userId },
        });

        const { title, preDescription, description } = req.body;

        let frontImageName = null;
        if (req.files.frontImage && req.files.frontImage[0]) {
            const inputPath = req.files.frontImage[0].path;
            frontImageName = `front-${Date.now()}.jpg`;
            const outputPath = path.join("public", "img", frontImageName);

            await sharp(inputPath)
                .resize(1920 , 1200)
                .toFormat("jpeg")
                .jpeg({ quality: 80 })
                .toFile(outputPath);

            fs.unlinkSync(inputPath);
        }

        let imageNames = [];
        if (req.files.Images) {
            for (const file of req.files.Images) {
                const inputPath = file.path;
                const fileName = `item-${Date.now()}-${Math.floor(Math.random() * 1000)}.jpg`;
                const outputPath = path.join("public", "img", fileName);

                await sharp(inputPath)
                    .resize(1920 , 1200)
                    .toFormat("jpeg")
                    .jpeg({ quality: 80 })
                    .toFile(outputPath);

                fs.unlinkSync(inputPath);
                imageNames.push(fileName);
            }
        }

        await Item.create({
            itemTitle: title,
            itemPredescription: preDescription,
            itemDescription: description,
            itemFrontImage: frontImageName,
            itemImage: JSON.stringify(imageNames) 
        });

        res.redirect("/admin/item");

    } catch (err) {
        console.log(err);
        res.render("admin/500");
    }
}; 

exports.itemDetailGet = async function(req, res) {
 
    try {
        const user = await User.findOne({
            where: { id: req.session.userId },
        });

        const id = decodeURIComponent(req.params.id);

        const item = await Item.findByPk(id);

        res.render("admin/itemDetail", {
            user: user,
            item: item
        });

    } catch (err) {
        console.log(err);
    }
}

exports.itemDetailPost = async function(req, res) {
    try {
        const user = await User.findOne({ where: { id: req.session.userId } });
        const id = decodeURIComponent(req.params.id);
        const item = await Item.findByPk(id);

        item.itemTitle = req.body.title;
        item.itemPredescription = req.body.preDescription;
        item.itemDescription = req.body.description;

        if (req.files.frontImage && req.files.frontImage[0]) {
            // Yeni frontImage var ise işle
            const inputPath = req.files.frontImage[0].path;
            const fileName = `front-${Date.now()}.jpg`;
            const outputPath = path.join("public", "img", fileName);

            const oldImagePath = item.itemFrontImage ? path.join("public", "img", item.itemFrontImage) : null;

            await sharp(inputPath)
                .resize(1920 , 1200)
                .toFormat("jpeg")
                .jpeg({ quality: 80 })
                .toFile(outputPath);

            fs.unlinkSync(inputPath);

            if (oldImagePath && fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }

            item.itemFrontImage = fileName;
        } else {
            // Eğer frontImage upload edilmediyse ama veritabanında null ise hata alırsın
            // Bu durumda eski değer null ise bunu bırakma, zorunlu alansa hata ver
            if (!item.itemFrontImage) {
                return res.status(400).send("Ön resim zorunludur, lütfen yükleyin.");
            }
        }

        if (req.files.Images && req.files.Images.length > 0) {
            const oldImages = JSON.parse(item.itemImage || "[]");
            for (const oldImg of oldImages) {
                const oldImgPath = path.join("public", "img", oldImg);
                if (fs.existsSync(oldImgPath)) fs.unlinkSync(oldImgPath);
            }

            const newImageNames = [];
            for (const file of req.files.Images) {
                const inputPath = file.path;
                const fileName = `item-${Date.now()}-${Math.floor(Math.random() * 1000)}.jpg`;
                const outputPath = path.join("public", "img", fileName);

                await sharp(inputPath)
                    .resize(1920 , 1200)
                    .toFormat("jpeg")
                    .jpeg({ quality: 80 })
                    .toFile(outputPath);

                fs.unlinkSync(inputPath);
                newImageNames.push(fileName);
            }

            item.itemImage = JSON.stringify(newImageNames);
        }

        await item.save();

        res.render("admin/itemDetail", { user, item });

    } catch (err) {
        console.log(err);
        res.render("admin/500");
    }
};

exports.itemDetailDeleteGet = async function(req, res) {

    try {
        const id = decodeURIComponent(req.params.id);

        await Item.destroy({ where: { id } });

        res.redirect("/admin/item");
    } catch (err) {
        console.log(err);
        res.redirect("/admin/500");
    }
}
