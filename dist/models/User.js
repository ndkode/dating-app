"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // Add swipe history schema (optional)
    // swipeHistory: {
    //   userIds: {
    //     type: [String],
    //   },
    //   directions: {
    //     type: [String],
    //   },
    // },
    premiumFeatures: {
        type: [String],
        default: [],
    },
    swipesLeft: {
        type: Number,
        default: 10, // Change to desired initial daily swipe limit
    },
    lastSwipedAt: {
        type: Date,
    },
}, { timestamps: true }); // Enable timestamps for document creation/update
exports.default = mongoose_1.default.model('User', userSchema);
