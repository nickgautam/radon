const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)
router.get("/cowin", CowinController.allVaccinationSession)
router.post("/cowin/getOtp", CowinController.getOtp)
router.get("/Weather", CowinController.Weather)
router.post("/meme", CowinController.meme)




module.exports = router;