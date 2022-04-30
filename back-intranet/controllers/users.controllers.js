const passport = require('passport');
const User = require('../models/users');

module.exports = {
    registerPost: async(req, res, next) =>{
        const {password, name} = req.body;
        console.log(req.body);
        console.log(req.params);


        if(!password || !name){
            return res.status(400).json({message: 'Debes completar todos los campos'})
        }


        passport.authenticate('register', (error, user) =>{
            if(error){
                return res.status(403).json({message: error.message});
            };
            req.logIn(user, (error) =>{
                if(error){
                    return res.status(403).json({message: error.message});
                };

                let registerUser = user;
                registerUser.password = null;

                return res.json(registerUser)
            });
        })(req, res, next);
    },

    loginPost: (req, res, next) =>{
        /* TODO */
    }
}