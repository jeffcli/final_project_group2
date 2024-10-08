import express from "express";
import entry from "../mongoose/journal/model";
import { FriendsType } from "../mongoose/journal/schema";
const router = express.Router();
router.post('/api/removeEntry', async (req, res) => {
    const toRemove:string = req.body.entry;
    const requestedBy:string = req.body.createdBy;
    //fetch all the friends
    const currentEntries:FriendsType[] = await entry.find({userName:requestedBy});
    console.log(currentEntries[0].entry);
    const newFriends = (currentEntries[0].entry as Object[]).filter((item) => (item as FriendsType).name != toRemove);
    //update mongo
    await entry.findOneAndUpdate({userName:requestedBy}, {friends:newFriends});
    res.json(newFriends);
});
export default router;
