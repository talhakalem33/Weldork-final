const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const csrf = require("../middlewares/csrf");

router.get("/items", homeController.itemsGet);
router.get("/about", homeController.aboutGet);
router.post("/appoinment",csrf, homeController.appointmentPost);
router.get("/appoinment", csrf,homeController.appointmentGet);
router.get("/contact", homeController.contactGet);
router.post("/", csrf, homeController.homeIndexPost);
router.get("/", csrf, homeController.homeIndexGet);

module.exports = router;