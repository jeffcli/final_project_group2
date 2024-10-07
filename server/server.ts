//express server will go here 
import dotenv from 'dotenv'; 
import addFriend from "./routes/addFriend"; 
import getFriends from "./routes/getFriends"; 
import updateFriend from './routes/updateFriend'; 
import path from 'path';
import removeFriend from './routes/removeFriend'; 
import { auth } from "express-oauth2-jwt-bearer";
import getUsers from './routes/getUsers'; 


    // dotenv.config({path:"../.env"}); 
import mongoose from 'mongoose'; 
import express from 'express'; 
import cors from 'cors'; 
import { get } from 'http';
mongoose.connect(process.env.MONGO_URI || "").then(() => console.log("MongoDB connected!")).catch(() => console.log("Could not connect to MongoDB")); 
const app = express(); 
console.log(path.join(__dirname)); 

app.use(express.static(path.join(__dirname, '../client/dist')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
app.use(express.urlencoded({extended:true})); 
app.use(cors({
    origin:'http://localhost:3000/',
    credentials:true, 
})); 
app.use(express.json()); 
app.get('/api/health', async (req, res) => { 
    res.json({"message":"backend healthy!"}); 
    console.log("here"); 
}); 
// app.use(auth({
//     audience:'/api', 
//     issuerBaseURL: 'https://dev-1hayc3662ummsupb.us.auth0.com/', 
//     tokenSigningAlg: 'RS256'
// }))
app.use(addFriend);  
app.use(getFriends); 
app.use(removeFriend); 
app.use(updateFriend); 
app.use(getUsers); 
app.disable('etag'); 
app.listen(process.env.PORT||3001, () => { 
    console.log(`App on ${process.env.PORT}`); 
}); 
export default app; 


