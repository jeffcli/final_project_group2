"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeProtectedGetRequest = makeProtectedGetRequest;
const axios_1 = __importDefault(require("axios"));
async function makeProtectedGetRequest(apiToCall, token) {
    const data = await axios_1.default.get(apiToCall, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return data;
}
