const express = require("express");
const router = express.Router();


const {getDashboardSummary,getInquiryAnalysis,getPropertyAnalysis} = require('../controllers/analytics');


router.post("/analytics/dashboard/summary",getDashboardSummary);
router.get("/analytics/dashboard/inquiries",getInquiryAnalysis);

// Admin Routes - (Protected)

router.get("/analytics/dashboard/properties",getPropertyAnalysis);




module.exports = router;