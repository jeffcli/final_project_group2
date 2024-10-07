"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_1 = __importDefault(require("../mongoose/friends/model"));
const router = express_1.default.Router();
;
router.post('/api/updateFriend', async (req, res) => {
    const requestedBy = req.body.userName;
    const toUpdate = req.body.name;
    const newRelationship = req.body.newRelationship;
    const currentFriends = await model_1.default.find({ userName: requestedBy });
    console.log("why god", currentFriends);
    const newFriends = currentFriends[0].friends.filter((item) => item.name != toUpdate);
    const newItem = {
        name: toUpdate,
        relationship: newRelationship
    };
    console.log("herro", currentFriends[0].friends);
    const deleted = currentFriends[0].friends.filter((item) => item.name != toUpdate);
    (deleted.push(newItem));
    await model_1.default.findOneAndUpdate({ userName: requestedBy }, { friends: deleted });
    const updated = await model_1.default.find({ userName: requestedBy });
    console.log(updated);
    res.json(updated);
});
exports.default = router;
