import express from 'express';
import journal from '../mongoose/journal/model';
import { JournalType } from '../mongoose/journal/schema';
const router = express.Router();
router.post('/api/getEntries', async(req, res) => {
    const userName = req.body.userName;
    const data = await journal.find({userName:userName});
    res.json(data);

});
export default router;
