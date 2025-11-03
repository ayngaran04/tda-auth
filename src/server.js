import express from 'express';
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';
import cors from 'cors';    
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/to-do.js';
import authMiddleware from './middleware/authMiddleware.js';
import dotenv from 'dotenv';
dotenv.config();




const app=express();
const PORT=process.env.PORT||5003;

const __filename=fileURLToPath(import.meta.url);

const __dirname=dirname(__filename);

app.use(express.static(path.join(__dirname,'../public')));
app.use(express.json()); //middleware to parse JSON bodies

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'));
})


//routes
app.use('/auth',authRoutes);

app.use('/todos',authMiddleware,todoRoutes);

app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`));





