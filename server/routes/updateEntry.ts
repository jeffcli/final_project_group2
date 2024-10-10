import express from 'express';
import journal from '../mongoose/journal/model';
import { JournalType } from '../mongoose/journal/schema';

const router = express.Router();

router.post('/api/updateEntry', async (req, res) => {
    try {
        const { _id, title, text, dateCreated } = req.body;

        const updatedEntry = await journal.findByIdAndUpdate(
            _id,
            { title, text, dateCreated },
            { new: true, runValidators: true }
        );

        if (!updatedEntry) {
             res.status(404).json({ message: 'Entry not found' });
        }
        else{
            const userEntries = await journal.find({ userName: req.body.userName });

            res.json({ updatedEntry, userEntries });
        }


     
    } catch (error) {
        console.error('Error updating entry:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;