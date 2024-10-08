"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
exports.getManagementToken = getManagementToken;
const axios_1 = __importDefault(require("axios"));
async function getUsers() {
    const token = await getManagementToken();
    const queryOptions = {
        method: 'GET',
        url: 'https://dev-1hayc3662ummsupb.us.auth0.com/api/v2/users',
        headers: {
            authorization: `Bearer ${token}`,
        }
    };
    const data = await axios_1.default.request(queryOptions);
    return data;
}
async function getManagementToken() {
    try {
        const options = {
            method: "POST",
            url: "https://dev-1hayc3662ummsupb.us.auth0.com/oauth/token",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            data: new URLSearchParams({
                grant_type: "client_credentials",
                client_id: "nmwaSMLeREbojowO26ZXC8Ytcx2thrM2",
                client_secret: "q44us8PVg3MWBDxugHvMj1O9kHdEt5_hjMnEZScEto-qB6ezsdsViRPmgiyIxKh8",
                audience: "https://dev-1hayc3662ummsupb.us.auth0.com/api/v2/",
            }),
        };
        const data = await axios_1.default.request(options);
        return data.data["access_token"];
    }
    catch (error) {
        console.error(error);
    }
}
