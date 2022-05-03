const express = require('express');
const router = express.Router();
const News = require('../models/news');
const User = require('../models/users');

router.post('/create', async(req, res, next) =>{
    try{
        const {title, description, dateNew, user } = req.body;
        if(!title || !description || !dateNew || !user){
            return res.status(500).json({message: 'Debes cubrir todos los campos para crear la noticia'});
        }

        const newNews = new News(
            {
                title: title,
                description: description,
                dateNew: dateNew,
                user: user
            }
        );
        const newNewsCreated = await newNews.save();
        console.log('NUEVA NOTICIA CREADA ->',newNewsCreated);

        return res.status(201).json(newNewsCreated);
    }catch(error){
        return next(error);
    }
});

router.get('/news', async(req, res, next) =>{

    try{
        const newsRequest = await News.find();

        const newsResults = newsRequest.map (async element =>(
            {title: element.title, description: element.description, dateNew: element.dateNew, comments: element.comments, id: element._id, user: await User.findById(element.user)}
        ));

        Promise.all(newsResults)
        .then(data =>{
            return res.status(201).json(data);
        })
        .catch(error =>{
            return res.status(400).json(error);
        });

    }catch(error){
        return next(error);
    }
})

module.exports = router;