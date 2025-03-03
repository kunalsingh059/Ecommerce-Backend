const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  companyName: String,
  country: String,
  streetAddress: String,
  city: String,
  province: String,
  zipCode: String,
  phone: String,
  additionalMessage: String,
  paymentMethod: { type: String, enum: ["Cash on Delivery", "Bank Transfer"], required: true },
  bankTransactionId: { type: String, default: null },
  status: { type: String, enum: ["Pending", "Awaiting Confirmation", "Completed"], default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model("Billing", billingSchema);
