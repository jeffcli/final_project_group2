import express from 'express'; 
import habits from '../mongoose/habits/model'; 
import { HabitsType } from '../mongoose/habits/schema';
const router = express.Router(); 
router.post('/api/updateHabit', async(req, res) => { 
    const userName = req.body.userName; 
    const oldHabit = await habits.findById(req.body._id);
    let newCompleted:String[] = oldHabit.completed;
    if (req.body.done == true) {
        newCompleted.push(new Date().toLocaleDateString("en-US", {timeZone: "America/New_York"}));
    } else {
        newCompleted.pop();
    }
    const updatedHabit = await habits.findByIdAndUpdate(req.body._id, {completed: newCompleted}, {new:true}); 
    console.log(updatedHabit)
    const data = await habits.find({userName:userName}); 
    res.json(data);     

}); 
export default router; 
