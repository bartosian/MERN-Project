module.exports = function (req, res, next) {

    if (req.user) {
        next();
    } else {
        res.status(403)
            .json({ message: 'You have to login!' });
    }
};

