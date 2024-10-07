import express from "express";
import friends from "../mongoose/friends/model"; 
import { FriendsType } from "../mongoose/friends/schema";
const router = express.Router(); 
router.post('/api/removeFriend', async (req, res) => { 
    const toRemove:string = req.body.toRemove; 
    const requestedBy:string = req.body.userName; 
    //fetch all the friends 
    const currentFriends:FriendsType[] = await friends.find({userName:requestedBy}); 
    console.log(currentFriends[0].friends); 
   const newFriends = (currentFriends[0].friends as Object[]).filter((item) => (item as FriendsType).name != toRemove);
   //update mongo 
   await friends.findOneAndUpdate({userName:requestedBy}, {friends:newFriends}); 
   res.json(newFriends); 
}); 
export default router; 
