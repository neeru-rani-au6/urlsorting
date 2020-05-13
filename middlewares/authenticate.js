//MIDDLEWARE FOR ALL PROTECTED ROUTES

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "thisissecretkey";
module.exports = {
    async authenticate(req, res, next) {

        const token = req.header('Authorization');
        if (!token) return res.status(401).send('Access denied.Please provide the Token');
        try {
            const verified = await jwt.verify(token, SECRET_KEY)
            if (!verified.id) return res.status(403).send("not a verified user");
            const user = await User.findOne({ _id: verified.id, jwt: token })
            if (!user) {
                return res.status(401).send("No user found with this Authorization");
            }
            else {
                req.user = user;
                next();
            }

        }
        catch (err) {
            console.log('error in authentication');
            console.log(err);
            return res.send(err);
        }
    }
}
