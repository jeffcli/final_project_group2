import express from 'express'; 
import friends from "../mongoose/friends/model"; 
import { FriendsType } from '../mongoose/friends/schema';
const router = express.Router(); 
router.post('/api/addFriend', async (req, res) => {
    const createdBy:string = req.body.userName; 
    const toAdd:string = req.body.toAdd; 
    //first query the current list of friends to attach to 
    const currentFriends:FriendsType[] = await friends.find({userName:createdBy});
    if(!currentFriends.length){
        //need to make a document 
        const friendsArr:string[] = []; 
        friendsArr.push(toAdd);
        const newFriends:FriendsType = { 
            userName: createdBy, 
            friends: friendsArr
        }; 
        await friends.create(newFriends); 
        //query the db to return all friends for this user 
        const updatedFriends:FriendsType[] = await friends.find({userName:createdBy});
        res.json(updatedFriends); 
    }  
    else{ 
        if((currentFriends[0].friends as string[]).includes(toAdd)){
            res.json({"status":"already included!"}); 
        }
        else{
            (currentFriends[0].friends as string[]).push(toAdd); 

            console.log(currentFriends[0].friends); 
            await friends.findOneAndUpdate({userName:createdBy}, {friends:currentFriends[0].friends}); 
            const newFriends = await friends.find({userName:createdBy});
            res.json(newFriends)

        }
       
    }    
}); 
export default router; 