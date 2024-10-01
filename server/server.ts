//express server will go here 
import dotenv from 'dotenv'; 
dotenv.config({path:"../.env"}); 
console.log(process.env.MONGO_URI); 

import mongoose from 'mongoose'; 
import express from 'express'; 
import cors from 'cors'; 
mongoose.connect(process.env.MONGO_URI || "").then(() => console.log("MongoDB connected!")).catch(() => console.log("Could not connect to MongoDB")); 
const app = express(); 
app.use(express.urlencoded({extended:true})); 
app.use(cors()); 
app.use(express.json()); 
app.get('/health', async (req, res) => { 
    res.json({"message":"backend healthy!"}); 
}); 
app.disable('etag'); 
app.listen(process.env.BE_PORT||3001, () => { 
    console.log("App ready on port 3001"); 
}); 
export default app; 


