"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_1 = __importDefault(require("../mongoose/journal/model"));
const router = express_1.default.Router();
router.post('/api/updateEntry', async (req, res) => {
    try {
        const { _id, title, entry, dateCreated, userName } = req.body;
        const updatedEntry = await model_1.default.findByIdAndUpdate(_id, { title, entry, dateCreated, userName }, { new: true, runValidators: true });
        if (!updatedEntry) {
            res.status(404).json({ message: 'Entry not found' });
        }
        else {
            res.json(updatedEntry);
        }
    }
    catch (error) {
        console.error('Error updating entry:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = router;
