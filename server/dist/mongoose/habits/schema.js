"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HabitsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.HabitsSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        required: true,
    },
    completed: {
        type: [Date],
        required: true,
    }
});
