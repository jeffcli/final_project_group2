import express from 'express'; 
import { QuoteType } from '../mongoose/quotes/schema';
import quotes from '../mongoose/quotes/model'; 

const router = express.Router(); 
router.get('/api/fetchQuotes', async (req, res) => {
    
    const data = await quotes.find({}); 
    res.json(data); 
} ); 
export default router; 