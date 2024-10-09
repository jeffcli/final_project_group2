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
router.post('/api/getEntries', async(req, res) => {
    const userName = req.body.createdBy;
    const data = await journal.find({createdBy:userName});
    res.json(data);

});
export default router;
