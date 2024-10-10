"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fetchUsers_1 = require("../utils/fetchUsers");
const router = express_1.default.Router();
router.get('/api/getUsers', async (req, res) => {
    const data = await (0, fetchUsers_1.getUsers)();
    console.log(data.data);
    const names = [];
    for (let i = 0; i < data.data.length; i++) {
        names.push(data.data[i].name);
    }
    console.log(names);
    res.json(names);
});
exports.default = router;
