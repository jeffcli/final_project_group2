"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendsSchema = void 0;
var mongoose_1 = require("mongoose");
exports.FriendsSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
    },
    friends: {
        type: [Object],
        required: true,
    }
});
