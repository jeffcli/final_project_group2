import express from 'express'; 
import habits from "../mongoose/habits/model"; 
import { HabitsType } from '../mongoose/habits/schema';
const router = express.Router(); 
router.post('/api/addHabit', async (req, res) => {
    const userName:string = req.body.userName;
    const created:Date = new Date(req.body.created); 
    const description:string = req.body.description; 
    const completed:Date[] = []; 
    const newHabit:HabitsType = { 
        userName: userName,
        description: description, 
        created: created, 
        completed: completed
    }; 
    //console.log(newHabit);
    await habits.create(newHabit); 
    //query the db to return all habits for this user 
    const updatedHabits:HabitsType[] = await habits.find({userName:userName});
    res.json(updatedHabits); 
}); 
export default router; 