const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("./models/users");

const saltRound = 10;

passport.serializeUser((user, done) => {
    return done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
    try {
        const existingUser = await User.findById(userId);
        return done(null, existingUser);
    } catch (err) {
        return done(err);
    }
});

passport.use(
    "register",
    new LocalStrategy(
        {
            usernameField: "name",
            passwordField: "password",
            passReqToCallback: true,
        },
        async (req, name, password, done) => {
            const {role} = req.body;
            try {
                if (name.length < 4) {
                    const error = new Error("El nombre de usuario debe contener almenos 4 carácteres");
                    return done(error);
                }

                const previousUser = await User.findOne({
                    name: name.toLowerCase(),
                });

                if (previousUser) {
                    const error = new Error("El usuario ya existe");
                    return done(error);
                }

                const hash = await bcrypt.hash(password, saltRound);

                const newUser = new User({
                    name: req.body.name.toLowerCase(),
                    password: hash,
                    role: role
                });

                const savedUser = await newUser.save();

                return done(null, savedUser);
            } catch (err) {
                return done(err);
            }
        }
    )
);


passport.use(
    "login",
    new LocalStrategy(
        {
            usernameField: "name",
            passwordField: "password",
            passReqToCallback: true,
        },
        async (req, name, password, done) => {
            try {
                if (!name) {
                    const error = new Error("Invalid name");
                    return done(error);
                }

                const currentUser = await User.findOne({ name: name.toLowerCase() });

                if (!currentUser) {
                    const error = new Error("The user does not exist!");
                    return done(error);
                }

                const isValidPassword = await bcrypt.compare(
                    password,
                    currentUser.password
                );

                if (!isValidPassword) {
                    const error = new Error("The email or password is invalid!");
                    console.log(2);
                    return done(error);
                }

                return done(null, currentUser);
            } catch (err) {
                console.log(3);
                return done(err);
            }
        }
    )
);
