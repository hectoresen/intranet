const express = require('express');
const router = express.Router();
const Event = require('../models/events');
const User = require('../models/users');

router.post('/create', async(req, res, next) =>{
    try{
        const {eventTitle, eventDate, dateTime, user} = req.body;
        if(!eventTitle || !eventDate || !dateTime || !user ){
            return res.status(500).json({message: 'Debes cubrir todos los campos para crear un evento'})
        }

        const newEvent = new Event(
            {
                eventTitle : eventTitle,
                eventDate: eventDate,
                dateTime: dateTime,
                user: user
            }
            );
            const newEventCreated = await newEvent.save();
            console.log(newEventCreated);
            return res.status(201).json(newEventCreated);

        }catch(error){
        return next(error);
    }
});

router.post('/info/:eventDate', async(req, res, next) =>{
    const {eventDate} = req.params;

    try{
        if(!eventDate){
            return res.status(404).json({message: 'No hay eventos para esta fecha'})
        }

        const eventRequest = await Event.find({eventDate: {$eq: eventDate}});

        const eventsResult = eventRequest.map (async element =>(
            {Title: element.eventTitle, Date: element.eventDate, DateTime: element.dateTime, User: await User.findById(element.user)}
        ));
        Promise.all(eventsResult)
        .then(data =>{
            return res.status(201).json(data);
        })
        .catch(error =>{
            res.status(400).json(error);
        });

    }catch(error){
        return next(error);
    }
});

module.exports = router;