"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoodSchema = void 0;
const mongoose_1 = require("mongoose");
exports.MoodSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
    },
    moods: {
        type: [String],
        required: true,
    },
});
