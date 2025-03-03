const express = require("express");
const router = express.Router();
const { submitBilling, getBillingDetails, updateBillingStatus } = require("../controllers/billingController"); // ✅ Correctly import all functions

// Define routes
router.post("/billing", submitBilling); // Submit billing details
router.get("/billing/:id?", getBillingDetails); // Get billing details (all or specific)
router.put("/billing/:id", updateBillingStatus); // Update order status

module.exports = router;
