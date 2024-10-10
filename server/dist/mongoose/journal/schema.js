"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JournalSchema = void 0;
const mongoose_1 = require("mongoose");
exports.JournalSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    entry: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        required: true,
    },
});
