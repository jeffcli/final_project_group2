import express from 'express';
import journal from '../mongoose/journal/model';
import { JournalType } from '../mongoose/journal/schema';
const router = express.Router();
router.post('/api/updateEntry', async(req, res) => {
    const userName = req.body.userName;
    const oldEntry = await journal.findById(req.body._id);
    let newCompleted:String[] = oldEntry.completed;
    if (req.body.done == true) {
        newCompleted.push(new Date().toLocaleDateString("en-US", {timeZone: "America/New_York"}));
    } else {
        newCompleted.pop();
    }
    const updatedEntry = await journal.findByIdAndUpdate(req.body._id, {completed: newCompleted}, {new:true});
    console.log(updatedEntry)
    const data = await journal.find({userName:userName});
    res.json(data);

});
export default router;
