"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_1 = __importDefault(require("../mongoose/habits/model"));
const router = express_1.default.Router();
router.post('/api/deleteHabit', async (req, res) => {
    const habitId = req.body._id;
    //console.log(newHabit);
    try {
        await model_1.default.findByIdAndDelete(habitId);
        res.send("Habit deleted");
    }
    catch (e) {
        console.log("Error deleting habit: ", e);
        res.send("Error deleting habit");
    }
});
exports.default = router;
