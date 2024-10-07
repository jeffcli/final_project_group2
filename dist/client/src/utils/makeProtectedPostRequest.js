"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeProtectedPostRequest = MakeProtectedPostRequest;
const axios_1 = __importDefault(require("axios"));
async function MakeProtectedPostRequest(apiToCall, dataToSend, token) {
    console.log("token is", token);
    const data = await axios_1.default.post(apiToCall, dataToSend, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}
