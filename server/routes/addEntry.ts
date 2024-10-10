import express from 'express';
import journal from "../mongoose/journal/model";
import { JournalType } from '../mongoose/journal/schema';
const router = express.Router();
router.post('/api/addEntry', async (req, res) => {
    try {
        const userName: string = req.body.userName;
        const title: string = req.body.title;
        const dateCreated: Date = new Date(req.body.dateCreated);
        const entry: string = req.body.entry;

        console.log("Request Body: ", req.body);

        const newEntry: JournalType = {
            title: title,
            entry: entry,
            userName: userName,
            dateCreated: dateCreated,
        };

        await journal.create(newEntry);
        const updatedEntries = await journal.find({ userName: userName });
        res.json(updatedEntries);
    } catch (error) {
        console.error("Error adding entry: ", error);
        res.status(500).json({ message: "Error adding entry"});
    }
});
export default router;