const express = require('express');
const router = express.Router();
const Comment = require('../models/comments');
const News = require('../models/news');
const User = require('../models/users');
const Projects = require('../models/projects');

router.post('/create', async(req, res, next) =>{
    try{
        const {comment, user, news, project} = req.body;
        console.log(comment);

        if(!project){
            const newComment = new Comment(
                {
                    comment: comment,
                    user: user,
                    news: news,
                }
            );
            const newCommentCreated = await newComment.save();
            console.log('Nuevo comentario creado', newCommentCreated);
            return res.status(201).json(newCommentCreated);
        }else{
            const newComment = new Comment(
                {
                    comment: comment,
                    user: user,
                    project: project
                }
            );
            const newCommentCreated = await newComment.save();
            console.log('Nuevo comentario creado', newCommentCreated);
            return res.status(201).json(newCommentCreated);
        }
    }catch(error){
        return next(error);
    }
});

router.post('/find/:id', async(req, res, next) =>{
    const {id} = req.params;
    try{
        const commentsResults = await Comment.find({news: {$eq: id}});

        const sendCommentResults = commentsResults.map (async element =>(
            {User: await User.findById(element.user), comment: element.comment, dateComment: element.createdAt}
        ));

        Promise.all(sendCommentResults)
        .then(data =>{
            console.log(data);
            return res.status(201).json(data);
        })
        .catch(error =>{
            res.status(400).json(error);
        })
    }catch(error){
        return next(error);
    }
})

module.exports = router;
