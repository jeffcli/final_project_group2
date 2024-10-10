import express from 'express';
import journal from '../mongoose/journal/model';

const router = express.Router();

router.post('/api/updateEntry', async (req, res) => {
    try {
        const { _id, title, entry, dateCreated, userName } = req.body;

        const updatedEntry = await journal.findByIdAndUpdate(
            _id,
            { title, entry, dateCreated, userName },
            { new: true, runValidators: true }
        );

        if (!updatedEntry) {
            return res.status(404).json({ message: 'Entry not found' });
        }

        res.json(updatedEntry);
    } catch (error) {
        console.error('Error updating entry:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;