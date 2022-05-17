const passport = require('passport');
const User = require('../models/users');

module.exports = {
    checkSession: async (req, res, next) => {
        if (req.user) {
            let userRegister = req.user;
            userRegister.password = null;

            return res.status(200).json(userRegister);
        } else {
            return res.status(401).json({ message: 'No user found' });
        }
    },

    registerPost: async (req, res, next) => {
        const { password, name, role } = req.body;

        if (!password || !name) {
            return res.status(400).json({ message: 'Debes completar todos los campos' })
        }


        passport.authenticate('register', (error, user) => {
            if (error) {
                return res.status(403).json({ message: error.message });
            };
            req.logIn(user, (error) => {
                if (error) {
                    return res.status(403).json({ message: error.message });
                };

                let registerUser = user;
                registerUser.password = null;

                return res.json(registerUser)
            });
        })(req, res, next);
    },

    loginPost: (req, res, next) => {
        passport.authenticate("login", (error, user) => {
            if (error) {
                return res.status(401).json({ message: error.message });
            }
            req.logIn(user, (error) => {
                if (error) {
                    return res.status(403).json({ message: error.message });
                };

                let loggedUser = user;
                loggedUser.password = null;

                return res.json(loggedUser);
            });
        })(req, res, next);
    },


    logoutPost: (req, res, next) => {
        if (req.user) {
            req.logout();

            req.session.destroy(() => {
                res.clearCookie("connect.sid");

                return res.status(200).json({ message: 'Logout successful' });
            });
        } else {
            return res.status(401).json({ message: 'Unexpected error' });
        }
    },
}