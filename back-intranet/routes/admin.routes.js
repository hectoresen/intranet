const express = require('express');
const router = express.Router();
const User = require('../models/users');

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
})

module.exports = router;