const express = require("express");
const router = express.Router();

const {
    createInquiry,
    getInquiries,
    updateInquiryStatus
} = require("../controllers/inquiryController");

const protect = require("../middleware/authMiddleware");

// Customer submits an inquiry
router.post("/", createInquiry);

// Admin views all inquiries
router.get("/", protect, getInquiries);

// Admin updates inquiry status
router.put("/:id", protect, updateInquiryStatus);

module.exports = router;