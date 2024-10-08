"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_1 = __importDefault(require("../mongoose/habits/model"));
const router = express_1.default.Router();
router.post('/api/addHabit', async (req, res) => {
    const userName = req.body.userName;
    const created = new Date(req.body.created);
    const description = req.body.description;
    const completed = [];
    const newHabit = {
        userName: userName,
        description: description,
        created: created,
        completed: completed
    };
    //console.log(newHabit);
    await model_1.default.create(newHabit);
    //query the db to return all habits for this user 
    const updatedHabits = await model_1.default.find({ userName: userName });
    res.json(updatedHabits);
});
exports.default = router;
