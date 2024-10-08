"use strict";
import express from 'express';
import journal from "../mongoose/journal/model";
import { JournalType } from '../mongoose/journal/schema';
const router = express.Router();
router.post('/api/addEntry', async (req, res) => {
    const createdBy = req.body.createdBy;
    const title = req.body.title;
    const dateCreated = new Date(req.body.createdBy);
    const entry = req.body.entry;

    const newEntry:JournalType = {
        title: title,
        entry: entry,
        createdBy: createdBy,
        dateCreated: dateCreated
    };
    console.log(newEntry);
    await journal.create(newEntry);
    //query the db to return all habits for this user
    const updatedHabits:JournalType[] = await journal.find({createdBy:createdBy});
    res.json(updatedHabits);
});
export default router;