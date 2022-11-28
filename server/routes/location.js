const express = require("express");
const router = express.Router();


const {getLocation,getLocations,createLocation,updateLocation,deleteLocation} = require('../controllers/location');


router.get("/location/locations",getLocations);
router.post("/location/:id",getLocation);

// Admin Routes - (Protected)

router.post("/location/add",createLocation);
router.put("/location/update",updateLocation);
router.delete("/location/delete",deleteLocation);



module.exports = router;