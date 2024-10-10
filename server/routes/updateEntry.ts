import express from 'express';
import journal from '../mongoose/journal/model';
import  { Request, Response } from 'express';

const router = express.Router();

router.post('/api/updateEntry',  async (req:Request, res:Response) =>{
    try {
        const { _id, title, entry, dateCreated, userName } = req.body;

        const updatedEntry = await journal.findByIdAndUpdate(
            _id,
            { title, entry, dateCreated, userName },
            { new: true, runValidators: true }
        );

        if (!updatedEntry) {
             res.status(404).json({ message: 'Entry not found' });
        }
        else{
            res.json(updatedEntry);
        }


       
    } catch (error) {
        console.error('Error updating entry:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;