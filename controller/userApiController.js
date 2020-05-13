const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require("jsonwebtoken");

const userApiController = {};
const SECRET_KEY = "thisissecretkey";

userApiController.userRegister = async (req, res) => {
    console.log("inside registratn");
    try {
        const newUser = await new User({
            Name: req.body.name,
            EmailId: req.body.email,
            Password: req.body.password,
            Address: req.body.address,
            PhoneNo: req.body.phoneno
        }).save();
        console.log(newUser)
        res.status(200).json(newUser);
    }
    catch (err) {
        res.status(400).send(err);
    }
};

userApiController.alluser = async (req, res) => {

    try {
        console.log('sdfadfasdfafasdf');
        const user = await User.find({});
        console.log(user)
        res.json(user);
    }
    catch (err) {
        console.log(err)
        res.json({ message: err });
    }
};
userApiController.deleteuser = async (req, res) => {
    console.log(req.params.Id);
    try {
        const removeduser = await User.remove({ _id: req.params.Id });
        res.json(removeduser);
    }
    catch (err) {
        res.json({ message: err });
    }
};

userApiController.userLogin = async (req, res) => {
    const email = req.body.email;
    console.log(email);
    const password = req.body.password;
    console.log(password);
    try {
        //CHECK IF EMAIL OR PASSWORD IS EMPTY 
        if (!email || !password) return res.status(400).send("Message:email or password cannot be null");
        const user = await User.findOne({ EmailId: email })
        const isMatched = await bcrypt.compare(password, user.Password);
        console.log(isMatched);
        if (!isMatched) return res.status(404).send("Message:invalid credentials");
        const token = await jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: 1000 * 60 * 60 });
        console.log(token);
        user.jwt = token;
        console.log(user);
        await user.save();
        return res.json({ "jwttoken": token, "status": "successful login", "code": "202" });
    }

    catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
};


module.exports = userApiController;


