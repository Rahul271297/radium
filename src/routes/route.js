const express = require('express');
const router = express.Router();

const cowinController= require("../controllers/cowinController")

// router.get("/cowin/states", cowinController.getStatesList)
// router.get("/cowin/districts/:stateId", cowinController.getDistrictsList)
// router.get("/cowin/centers", cowinController.getByPin)
// router.post("/cowin/getOtp", cowinController.getOtp)
// router.get("/cowin/states", cowinController.getStatesList)
 router.get("/state/weather", cowinController.weatherInfo)
router.get("/state/weathers", cowinController.weatherInfoOfLondon)
router.get("/city/weathers", cowinController.sortCities)


module.exports = router;