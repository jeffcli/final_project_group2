"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_1 = __importDefault(require("../mongoose/friends/model"));
const router = express_1.default.Router();
import express from 'express';
import journal from '../mongoose/journal/model';
import { JournalType } from '../mongoose/journal/schema';
const router = express.Router();
router.post('/api/updateEntry', async(req, res) => {
    const userName = req.body.createdBy;
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
