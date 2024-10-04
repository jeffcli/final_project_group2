"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_1 = __importDefault(require("../mongoose/friends/model"));
const router = express_1.default.Router();
router.post('/api/addFriend', async (req, res) => {
    const createdBy = req.body.userName;
    const toAdd = req.body.toAdd;
    //first query the current list of friends to attach to 
    const currentFriends = await model_1.default.find({ userName: createdBy });
    if (!currentFriends.length) {
        //need to make a document 
        const friendsArr = [];
        friendsArr.push(toAdd);
        const newFriends = {
            userName: createdBy,
            friends: friendsArr
        };
        await model_1.default.create(newFriends);
        //query the db to return all friends for this user 
        const updatedFriends = await model_1.default.find({ userName: createdBy });
        res.json(updatedFriends);
    }
    else {
        if (currentFriends[0].friends.includes(toAdd)) {
            res.json({ "status": "already included!" });
        }
        else {
            currentFriends[0].friends.push(toAdd);
            console.log(currentFriends[0].friends);
            await model_1.default.findOneAndUpdate({ userName: createdBy }, { friends: currentFriends[0].friends });
            const newFriends = await model_1.default.find({ userName: createdBy });
            res.json(newFriends);
        }
    }
});
exports.default = router;
