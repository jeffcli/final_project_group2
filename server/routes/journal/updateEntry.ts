import express from 'express';
import journal from "../mongoose/journal/model";
import { FriendsType } from '../mongoose/journal/schema';
const router = express.Router();
interface Friend {
    name:string,
    relationship:string
};

router.post('/api/updateEntry', async(req, res) => {
    const requestedBy = req.body.userName;
    const toUpdate = req.body.name;
    const newRelationship = req.body.newRelationship;
    const currentFriends:FriendsType[] = await friends.find({userName:requestedBy});
    console.log("why god", currentFriends);
    const newFriends = (currentFriends[0].friends as Object[]).filter((item) => (item as FriendsType).name != toUpdate);
    const newItem = {
        name:toUpdate,
        relationship: newRelationship
    };
    console.log("herro", currentFriends[0].friends);
    const deleted = (currentFriends[0].friends as Object[]).filter((item) => (item as Friend).name != toUpdate);


    (deleted.push(newItem));
    await friends.findOneAndUpdate({userName:requestedBy}, {friends:deleted});
    const updated = await friends.find({userName:requestedBy});
    console.log(updated);
    res.json(updated)



});
export default router;