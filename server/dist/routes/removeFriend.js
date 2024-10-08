"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_1 = __importDefault(require("../mongoose/friends/model"));
const router = express_1.default.Router();
router.post('/api/removeFriend', async (req, res) => {
    const toRemove = req.body.toRemove;
    const requestedBy = req.body.userName;
    //fetch all the friends 
    const currentFriends = await model_1.default.find({ userName: requestedBy });
    console.log(currentFriends[0].friends);
    const newFriends = currentFriends[0].friends.filter((item) => item.name != toRemove);
    //update mongo 
    await model_1.default.findOneAndUpdate({ userName: requestedBy }, { friends: newFriends });
    res.json(newFriends);
});
exports.default = router;
