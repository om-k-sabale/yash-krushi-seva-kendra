
const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        productName: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            default: ""
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true
        },
        totalAmount: {
            type: Number,
            required: true
        },
        customerName: {
            type: String,
            required: true,
            trim: true
        },
        customerPhone: {
            type: String,
            required: true,
            trim: true
        },
        customerVillage: {
            type: String,
            required: true,
            trim: true
        },
        customerAddress: {
            type: String,
            required: true,
            trim: true
        },
        channel: {
            type: String,
            default: "WhatsApp"
        },
        status: {
            type: String,
            enum: ["Pending", "Fulfilled"],
            default: "Pending"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Inquiry", inquirySchema);
