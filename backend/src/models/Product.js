const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        nameMr: {
            type: String,
            default: ""
        },
        brand: {
            type: String,
            default: ""
        },
        category: {
            type: String,
            required: true
        },
        subCategory: {
            type: String,
            default: ""
        },
        cropTypes: {
            type: [String],
            default: []
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        unit: {
            type: String,
            default: "per unit"
        },
        stock: {
            type: Number,
            required: true,
            default: 0
        },
        image: {
            type: String,
            default: ""
        },
        gallery: {
            type: [String],
            default: []
        },
        activeIngredient: {
            type: String,
            default: ""
        },
        dosage: {
            type: String,
            default: ""
        },
        targetUse: {
            type: String,
            default: ""
        },
        hazardLevel: {
            type: String,
            default: ""
        },
        safety: {
            type: String,
            default: ""
        },
        featured: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;