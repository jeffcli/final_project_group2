import express from 'express'; 
import friends from "../mongoose/friends/model"; 
import { FriendsType } from '../mongoose/friends/schema';
import { getManagementToken, getUsers } from '../utils/fetchUsers';
const router = express.Router(); 
router.get('/api/getUsers', async (req, res) => {
    const data = await getUsers(); 


    console.log(data.data); 
    const names = []; 
    for(let i = 0; i< data.data.length; i++){
        names.push(data.data[i].name)

    }
    console.log(names); 
    res.json(names); 
    
})
export default router; 
