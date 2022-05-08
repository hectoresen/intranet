const express = require('express');
const router = express.Router();
const User = require('../models/users');
const ChatGroup = require('../models/chatGroup');
const ChatPosts = require('../models/chatPosts');


router.post('/chat/:groupId', async(req, res, next) =>{
    /* Obtener ID de chatGroup y buscarlo en la colección chatPosts */
    try{
        const {groupId} = req.params;
        console.log(groupId);
        const chatRequest = await ChatPosts.find({chatGroup: {$eq: groupId}});
        console.log('REQUEST->',chatRequest);
        const chatResults = chatRequest.map(async element =>({
            message: element.message, owner: await User.findById(element.messageOwner), date: element.createdAt
        }));
        Promise.all(chatResults)
        .then(data =>{
            const foundChat = data.map(element =>({
                message: element.message, owner: element.owner.name, date: element.date
            }));
            console.log('CHAT ENCONTRADO ->', foundChat);
            return res.status(201).json(foundChat);
        })
        .catch(error =>{;
            res.status(400).json(error);
        });

    }catch(error){
        return next(error);
    }
});

router.post('/create', async(req, res, next) =>{

    try{
        const {message, messageOwner, chatGroup} = req.body;
        console.log(message, messageOwner,chatGroup );

        if(!message || !messageOwner || !chatGroup){
            return res.status(500).json({message: "Debes selecionar un chat antes de enviar un mensaje"});
        }

        const newMessageInfo = new ChatPosts(
            {
                message: message,
                messageOwner: messageOwner,
                chatGroup: chatGroup
            }
        );
        console.log(newMessageInfo);

        await ChatGroup.updateOne({_id: chatGroup}, {$push: {posts: newMessageInfo._id}});

        const newMessage = await newMessageInfo.save();
        return res.status(201).json(newMessage);

    }catch(error){
        return next(error);
    }
});

module.exports = router;