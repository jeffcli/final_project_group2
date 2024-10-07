import express from 'express'; 
import friends from '../mongoose/friends/model'; 
import { FriendsType } from '../mongoose/friends/schema';
const router = express.Router(); 
router.post('/api/getFriends', async(req, res) => { 
    const userName = req.body.userName; 
    const data = await friends.find({userName:userName}); 
    res.json(data); 

}); 
export default router; 
