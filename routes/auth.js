const express = require("express");
const passport = require('passport');
const router = express.Router();
const { User, validateUser } = require("../models/User");
const parser = require('../config/cloudinary');
const middleAuth = require('../middleWare/auth');

const bcrypt = require("bcryptjs");
const bcryptSalt = 10;

/* Login User */
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
        if (err) {
            res.status(500)
                .json({ message: 'Something went wrong authenticating user' });

            return;
        }

        if (!theUser) {
            res.status(401)
                .json(failureDetails);
            return;
        }

        req.login(theUser, (err) => {
            if (err) {
                res.status(500)
                    .json({ message: 'Session save went bad.' });

                return;
            }


            res.status(200)
                .json(theUser);
        });
    })(req, res, next);
});

/* Create new User */
router.post("/signup", (req, res, next) => {

    const { username, password, email  } = req.body;
    let message = "";

    let validateErr = validateUser({
        username,
        password,
        email
    });

    if(validateErr) {
        message = validateErr.details[0].message;
        res.status(400)
            .json({
                "message": message
            });

        return;
    }

    User.findOne({ email }, (err, user) => {

        if(err){
            res.status(500)
                .json({message: "Username check went bad."});

            return;
        }

        if (user !== null) {
            res.status(400)
                .json({message: "The email already exists" });

            return;
        }

        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            password: hashPass,
            email,
            contacts: [email]
        });

        newUser.save()
            .then(() => {

                req.login(newUser, (err) => {

                    if (err) {
                        res.status(500)
                            .json({ message: 'Login after signup went bad.' });

                        return;
                    }

                    res.status(200)
                        .json(newUser);
                });

            })
            .catch(err => {
                res.status(400)
                    .json({ message: 'Saving user to database went wrong.' });
            })
    });
});


/* Log out user */
router.post('/logout', (req, res, next) => {

    req.logout();
    res.status(200)
        .json({ message: 'Log out success!' });
});


/* Check loggedin */
router.get('/loggedin', (req, res, next) => {

    if (req.isAuthenticated()) {
        res.status(200)
            .json(req.user);

        return;
    }
    res.status(403)
        .json({ message: 'Unauthorized' });
});

/* Uploading images */
router.post('/upload', [middleAuth, parser.single('picture')], (req, res, next) => {
    User.findOneAndUpdate({ email : req.user.email }, { image: req.file.secure_url })
        .then(() => {
            res.status(203)
                .json({
                success: true,
                image: req.file.secure_url
            })
        }).catch(err => {
            res.status(400)
            .json({ message: 'Saving image to database went wrong.' });
    })
});

module.exports = router;

