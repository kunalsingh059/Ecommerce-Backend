const Billing = require("../models/billing");

const submitBilling = async (req, res) => {
    try {
      const { 
        firstName, lastName, companyName, country, streetAddress, city, province, 
        zipCode, phone, additionalMessage, paymentMethod, bankTransactionId 
      } = req.body;
  
      if (!firstName || !lastName || !country || !streetAddress || !city || !province || !zipCode || !phone || !paymentMethod) {
        return res.status(400).json({ error: "All required fields must be filled" });
      }
  
      // If payment method is bank transfer, require transaction ID
      if (paymentMethod === "Bank Transfer" && !bankTransactionId) {
        return res.status(400).json({ error: "Bank Transaction ID is required for bank transfer" });
      }
  
      const newBilling = new Billing({
        firstName,
        lastName,
        companyName,
        country,
        streetAddress,
        city,
        province,
        zipCode,
        phone,
        additionalMessage,
        paymentMethod,
        bankTransactionId: paymentMethod === "Bank Transfer" ? bankTransactionId : null,
        status: paymentMethod === "Cash on Delivery" ? "Pending" : "Awaiting Confirmation"
      });
  
      await newBilling.save();
      res.status(201).json({ message: "Billing details submitted successfully!", billing: newBilling });
  
    } catch (error) {
      res.status(500).json({ error: "Something went wrong", details: error.message });
    }
  };
  
const getBillingDetails = async (req, res) => {
    try {
      const { id } = req.params; // Get order ID (if provided)
  
      if (id) {
        const billing = await Billing.findById(id);
        if (!billing) {
          return res.status(404).json({ error: "Billing details not found" });
        }
        return res.json(billing);
      }
  
      const allBilling = await Billing.find(); // Fetch all orders
      res.json(allBilling);
    } catch (error) {
      res.status(500).json({ error: "Something went wrong", details: error.message });
    }
  };

  
  const updateBillingStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      if (!["Pending", "Completed"].includes(status)) {
        return res.status(400).json({ error: "Invalid status value" });
      }
  
      const updatedBilling = await Billing.findByIdAndUpdate(
        id, 
        { status }, 
        { new: true }
      );
  
      if (!updatedBilling) {
        return res.status(404).json({ error: "Billing details not found" });
      }
  
      res.json({ message: "Billing status updated successfully", billing: updatedBilling });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong", details: error.message });
    }
  };
  

module.exports = { submitBilling, updateBillingStatus, getBillingDetails};
