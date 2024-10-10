"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_1 = __importDefault(require("../mongoose/mood/model"));
const router = express_1.default.Router();
router.post('/api/updateMood', async (req, res) => {
    const userName = req.body.userName;
    const oldMood = await model_1.default.find({ userName: userName });
    console.log(req.body.mood);
    if (oldMood[0]) {
        console.log("old", oldMood);
        let newMoodList = oldMood[0].moods;
        newMoodList[req.body.day] = req.body.mood;
        console.log("newMoodList", newMoodList);
        let newMood = await model_1.default.findOneAndUpdate({ userName: userName }, { moods: newMoodList }, { new: true });
        res.json(newMood);
    }
    else {
        let moodList = ["", "", "", "", "", "", ""];
        moodList[req.body.day] = req.body.mood;
        let newMood = new model_1.default({
            userName: userName,
            moods: moodList,
        });
        await newMood.save();
        res.json(newMood);
    }
});
exports.default = router;
