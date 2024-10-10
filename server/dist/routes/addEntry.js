"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_1 = __importDefault(require("../mongoose/journal/model"));
const router = express_1.default.Router();
router.post('/api/addEntry', async (req, res) => {
    try {
        const userName = req.body.userName;
        const title = req.body.title;
        const dateCreated = new Date(req.body.dateCreated);
        const entry = req.body.entry;
        console.log("Request Body: ", req.body);
        const newEntry = {
            title: title,
            entry: entry,
            userName: userName,
            dateCreated: dateCreated,
        };
        await model_1.default.create(newEntry);
        // Query the db to return all entries for this user
        const updatedEntries = await model_1.default.find({ userName: userName });
        res.json(updatedEntries);
    }
    catch (error) {
        console.error("Error adding entry: ", error);
        res.status(500).json({ message: "Error adding entry" });
    }
});
exports.default = router;
