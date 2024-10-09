import express from 'express';
import journal from "../mongoose/journal/model";
import { JournalType } from '../mongoose/journal/schema';
const router = express.Router();
router.post('/api/deleteEntry', async (req, res) => {
    const entryId : string = req.body._id;
    //console.log(newHabit);
    try {
        await journal.findByIdAndDelete(entryId);
        res.send("Entry deleted");
    } catch (e) {
        console.log("Error deleting entry: ", e);
        res.send("Error deleting entry");
    }
});
export default router;