import express from 'express'; 
import mood from '../mongoose/mood/model'; 

const router = express.Router(); 
router.post('/api/getMoodForUser', async (req, res) => {
    const userName = req.body.userName; 
  
   const data = await mood.find({userName:userName}); 
    res.json(data); 
} ); 
export default router; 