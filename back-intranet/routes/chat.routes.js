const express = require('express');
const router = express.Router();
const User = require('../models/users');
const ChatGroup = require('../models/chatGroup');
const ChatPosts = require('../models/chatPosts');

router.get('/allusers', async(req, res, next) =>{
    try{
        const allUsers = await User.find();
        return res.status(201).json(allUsers);

    }catch(error){
        return next(error);
    }
});

router.post('/create', async(req, res, next) =>{
    try{
        const {owner, guest} = req.body;

        if(!owner || !guest){
            return res.status(500).json({message: "Debes seleccionar un invitado correctamente"})
        };

        const newGroupCreated = new ChatGroup(
            {
                owner: owner,
                guests: guest
            }
        );

        const newGroup = await newGroupCreated.save();
        return res.status(201).json(newGroup);

    }catch(error){
        return next(error);
    }
});

router.post('/find/:isGuest', async(req, res, next) =>{
    try{
        const {isGuest} = req.params;

        /* const checkedChat = await ChatGroup.find({guests: {$eq: isGuest}}); */
        const checkedChat = await ChatGroup.find({$or: [{guests:{$eq: isGuest}}, {owner: {$eq: isGuest}}]})

        const groupChatInfo = checkedChat.map (async element =>(
            {id: element._id, name: element.name, owner: await User.findById(element.owner), guests: await User.findById(element.guests), posts: element.posts}
        ));
        Promise.all(groupChatInfo)
        .then(data =>{
            const chatGroupResults = data.map (element =>(
                {id: element.id, name: element.name, owner: element.owner.name, guests: [element.guests.name], posts: element.posts}
            ));
            return res.status(201).json(chatGroupResults);
        })
        .catch(error =>
            console.log(error));


    }catch(error){
        return next(error);
    }
})

module.exports = router;