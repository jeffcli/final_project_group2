import express from 'express'; 
import habits from "../mongoose/habits/model"; 
import { HabitsType } from '../mongoose/habits/schema';
const router = express.Router(); 
router.post('/api/deleteHabit', async (req, res) => {
    const habitId : string = req.body._id;
    //console.log(newHabit);
    try {
        await habits.findByIdAndDelete(habitId); 
        res.send("Habit deleted");
    } catch (e) {
        console.log("Error deleting habit: ", e);
        res.send("Error deleting habit");
    }
}); 
export default router; 