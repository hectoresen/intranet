const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require("bcrypt");

router.get('/users',async (req, res, next) =>{
    try{
        const usersRequest = await User.find();
        return res.status(201).json(usersRequest);
    }catch(error){
        return next(error);
    }
});

router.delete('/delete/:userId', async(req, res, next) =>{
    try{
        const {userId} = req.params;
        await User.findByIdAndDelete(userId);

    }catch(error){
        return next(error);
    }
});


router.put('/modify/pass', async(req, res, next) =>{
    try{
        const {userId, newPass} = req.body;

        const saltRound = 10;
        const hash = await bcrypt.hash(newPass, saltRound);
        const newUser = await User.findByIdAndUpdate(userId, {$set: {password: hash}});

        return res.status(200).json(newUser)

    }catch(error){
        return next(error);

    }
})

module.exports = router;