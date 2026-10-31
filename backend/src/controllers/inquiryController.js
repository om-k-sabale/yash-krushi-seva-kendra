
const Inquiry = require("../models/Inquiry");
const Product = require("../models/Product");

// Create a new customer inquiry
const createInquiry = async (req, res) => {
    try {
        const {
            productId,
            quantity,
            customerName,
            customerPhone,
            customerVillage,
            customerAddress
        } = req.body;

        // Validate required fields
        if (
            !productId ||
            !Number.isInteger(Number(quantity)) ||
            Number(quantity) < 1 ||
            !customerName?.trim() ||
            !customerPhone?.trim() ||
            !customerVillage?.trim() ||
            !customerAddress?.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all customer details and a valid quantity."
            });
        }

        // Validate Indian mobile number
        const phone = customerPhone.replace(/[\s-]/g, "");

        if (!/^(\+91)?[6-9]\d{9}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid 10-digit mobile number."
            });
        }

        // Find product
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        const requestedQuantity = Number(quantity);

        if (product.stock < requestedQuantity) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock available."
            });
        }

        // Calculate total using database price
        const totalAmount = product.price * requestedQuantity;

        // Save inquiry
        const inquiry = await Inquiry.create({
            productId: product._id,
            productName: product.name,
            brand: product.brand,
            quantity: requestedQuantity,
            price: product.price,
            totalAmount,
            customerName: customerName.trim(),
            customerPhone: phone,
            customerVillage: customerVillage.trim(),
            customerAddress: customerAddress.trim(),
            channel: "WhatsApp"
        });

        res.status(201).json({
            success: true,
            message: "Customer inquiry saved successfully.",
            inquiry
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get all inquiries
const getInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            count: inquiries.length,
            inquiries
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update inquiry status
const updateInquiryStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!["Pending", "Fulfilled"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid inquiry status."
            });
        }

        const inquiry = await Inquiry.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!inquiry) {
            return res.status(404).json({
                success: false,
                message: "Inquiry not found."
            });
        }

        res.json({
            success: true,
            inquiry
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createInquiry,
    getInquiries,
    updateInquiryStatus
};
