//express server will go here 
import dotenv from 'dotenv'; 
import addFriend from "./routes/addFriend"; 
import path from 'path';

dotenv.config({path:"../.env"}); 
import mongoose from 'mongoose'; 
import express from 'express'; 
import cors from 'cors'; 
mongoose.connect(process.env.MONGO_URI || "").then(() => console.log("MongoDB connected!")).catch(() => console.log("Could not connect to MongoDB")); 
const app = express(); 
app.use(express.static(path.join(__dirname, '../../client/dist')))
app.use(express.urlencoded({extended:true})); 
app.use(cors()); 
app.use(express.json()); 
app.get('/api/health', async (req, res) => { 
    res.json({"message":"backend healthy!"}); 
    console.log("here"); 
}); 
app.use(addFriend); 
app.disable('etag'); 
app.listen(process.env.PORT||3001, () => { 
    console.log("App ready on port 3001"); 
}); 
export default app; 


