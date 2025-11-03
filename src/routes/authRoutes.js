import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import prisma from '../prismaClient.js';


const router = express.Router();

router.post('/register', async(req, res) => {
    const {username,password} = req.body;
    console.log(username,password);

    const hashedPassword = bcrypt.hashSync(password,8);

    try{
        const user = await prisma.user.create({
            data:{  
                username: username,
                password: hashedPassword
            }
        })

        //to enter into db of the to do tuff
        const defaultTodo="heyyy :)"
        await prisma.todo.create({
            data:{
                userId: user.id,
                task: defaultTodo,
            }
        })

        //token
        const token = jwt.sign({id: user.id},process.env.JWT_SECRET,{expiresIn:'24h'})
        res.json({token})

    }catch(err){
        res.status(503).json({ error: 'Server error' });
    }
})

router.post('/login', async(req, res) => {
    console.log("login route hit");

    const {username,password} = req.body;

    try{
        const user = await prisma.user.findUnique({
            where:{username: username}
        })

        if(!user){
            return res.status(401).send({message: "User not found"})

        }

        const passwordIsValid = bcrypt.compareSync(password,user.password);
        if(!passwordIsValid){
            return res.status(401).send({message:"Invalid Password"})
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET,{expiresIn:'24h'})
        res.json({token});
    }
    catch(err){
        console.log(err);
        res.status(503).json({ error: 'Server error' });
    }

})



export default router;// Register Route
