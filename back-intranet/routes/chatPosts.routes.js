const express = require('express');
const router = express.Router();
const User = require('../models/users');
const ChatGroup = require('../models/chatGroup');
const ChatPosts = require('../models/chatPosts');


router.get('/all', async(req, res, next) =>{
    /* Obtener ID de chatGroup y buscarlo en la colección chatPosts */
    try{

    }catch(error){

    }
});

router.post('/create', async(req, res, next) =>{

    /* Obtener ID (groupId) de chatGroup en el que se está escribiendo y hacer POST a la colección chatPosts
       Obtener mensaje del chatGroup (message) que se ha escrito y hacer POST a la colección chatPosts
       Obtener ID del que ha escrito el mensaje (ownerId) y hacer post a chatPosts

       const newMessage = new ChatPosts(
           {
               message: message,
               messageOwner: ownerId,
               chatGroup: groupId
           }
       )
    
    */

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

        const newMessage = await newMessageInfo.save();
        return res.status(201).json(newMessage);

    }catch(error){
        return next(error);
    }
});

module.exports = router;