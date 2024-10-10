"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_1 = __importDefault(require("../mongoose/mood/model"));
const router = express_1.default.Router();
router.post('/api/getMoodForUser', async (req, res) => {
    const userName = req.body.userName;
    const data = await model_1.default.find({ userName: userName });
    res.json(data);
});
exports.default = router;
