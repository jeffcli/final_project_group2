import express from 'express'; 
import { QuoteType } from '../mongoose/quotes/schema';
import quotes from '../mongoose/quotes/model'; 

const router = express.Router(); 
router.post('/api/addQuote', async (req, res) => {
    const quote = req.body.quote; 
    const userName = req.body.userName; 
    const newQuote = { 
        userName: userName, 
        quote: quote, 
    }; 
    await quotes.create(newQuote); 
    const data = await quotes.find({}); 
    res.json(data); 
} ); 
export default router; 