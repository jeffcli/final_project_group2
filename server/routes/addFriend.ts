import express from 'express'; 
import friends from "../mongoose/friends/model"; 
import { FriendsType } from '../mongoose/friends/schema';
const router = express.Router(); 
router.post('/api/addFriend', async (req, res) => {
    const createdBy:string = req.body.createdBy; 
    const toAdd:string = req.body.toAdd; 
    const relationship:string = req.body.relationship; 
    console.log(relationship); 
    //first query the current list of friends to attach to 
    const currentFriends:FriendsType[] = await friends.find({userName:createdBy});
    if(!currentFriends.length){
        //need to make a document 
        const friendsArr:Object[] = []; 
        const friendObj = {
            name: toAdd, 
            relationship: relationship,
        }
        friendsArr.push(friendObj);
        const newFriends:FriendsType = { 
            userName: createdBy, 
            friends: friendsArr, 
        }; 
        await friends.create(newFriends); 
        //query the db to return all friends for this user 
        const updatedFriends:FriendsType[] = await friends.find({userName:createdBy});
        res.json(updatedFriends); 
    }  
    else{ 
        if((currentFriends[0].friends as Object[]).includes(toAdd)){
            res.json({"status":"already included!"}); 
        }
        else{
            const friendObj = {
                name: toAdd, 
                relationship: relationship,
            }; 

            (currentFriends[0].friends as Object[]).push(friendObj); 

            console.log(currentFriends[0].friends); 
            await friends.findOneAndUpdate({userName:createdBy}, {friends:currentFriends[0].friends}); 
            const newFriends = await friends.find({userName:createdBy});
            console.log(newFriends); 
            res.json(newFriends)

        }
       
    }    
}); 
export default router;   