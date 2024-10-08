"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_1 = __importDefault(require("../mongoose/habits/model"));
const router = express_1.default.Router();
router.post('/api/updateHabit', async (req, res) => {
    const userName = req.body.userName;
    const oldHabit = await model_1.default.findById(req.body._id);
    let newCompleted = oldHabit.completed;
    if (req.body.done == true) {
        newCompleted.push(new Date().toLocaleDateString("en-US", { timeZone: "America/New_York" }));
    }
    else {
        newCompleted.pop();
    }
    const updatedHabit = await model_1.default.findByIdAndUpdate(req.body._id, { completed: newCompleted }, { new: true });
    console.log(updatedHabit);
    const data = await model_1.default.find({ userName: userName });
    res.json(data);
});
exports.default = router;
