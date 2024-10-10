"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteSchema = void 0;
const mongoose_1 = require("mongoose");
exports.QuoteSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
    },
    quote: {
        type: String,
        required: true,
    },
});
