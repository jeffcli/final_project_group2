"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_1 = __importDefault(require("../mongoose/quotes/model"));
const router = express_1.default.Router();
router.post('/api/addQuote', async (req, res) => {
    const quote = req.body.quote;
    const userName = req.body.userName;
    const newQuote = {
        userName: userName,
        quote: quote,
    };
    await model_1.default.create(newQuote);
    const data = await model_1.default.find({});
    res.json(data);
});
exports.default = router;
