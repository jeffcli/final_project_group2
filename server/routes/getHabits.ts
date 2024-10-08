import express from 'express'; 
import habits from '../mongoose/habits/model'; 
import { HabitsType } from '../mongoose/habits/schema';
const router = express.Router(); 
router.post('/api/getHabits', async(req, res) => { 
    const userName = req.body.userName; 
    const data = await habits.find({userName:userName}); 
    res.json(data); 

}); 
export default router; 
