const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Projects = require('../models/projects');


router.post('/create', async (req, res, next) =>{
    try{
        const {title, description} = req.body;
        if(!title || !description){
            console.log('Cubre los campos para crear el proyecto');
            return res.status(500).json({message: 'Debes cubrir todos los campos para crear el proyecto'})
        };

        const newProyect = new Projects(
            {
                title: title,
                description: description,
            }
        );
        const newProyectCreated = await newProyect.save();
        console.log('Proyecto creado', newProyectCreated);
        return res.status(201).json(newProyectCreated);
    }catch(error){
        return next(error);
    }
});

router.get('/all', async(req, res, next) =>{
    try{
        const allProjects = await Projects.find();
        console.log(allProjects);
        return res.status(201).json(allProjects);

    }catch(error){
        return next(error);
    };
});

module.exports = router;