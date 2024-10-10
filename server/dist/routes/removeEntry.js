"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_1 = __importDefault(require("../mongoose/journal/model"));
const router = express_1.default.Router();
router.post('/api/deleteEntry', async (req, res) => {
    const entryId = req.body._id;
    //console.log(newHabit);
    try {
        await model_1.default.findByIdAndDelete(entryId);
        res.send("Entry deleted");
    }
    catch (e) {
        console.log("Error deleting entry: ", e);
        res.send("Error deleting entry");
    }
});
exports.default = router;
