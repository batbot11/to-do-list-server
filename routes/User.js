import express from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/UserModel";
import passport from "passport";

const route = express.Router();


//@Route        Post api/user/signup
//@Description  Post request for users to signup
//@Security     Public

route.post("/signup", (req, res) => {
    const {data} = req.body;
    UserModel.findOne({username: data.username})
    .then(user => {
        if (user) res.status(400).json({username: "This Username already exists!"})
        else {const newUser = new UserModel({
            username: data.username,
            passwordHash: bcrypt.hashSync(data.password, 10)
        })
        newUser.save()
        .then(savedUser => res.json(savedUser.sendToClient()))
        .catch(err => res.status(404).json(err))
    }
    })
})

//@Route        Post api/user/login
//@Description  Post request for users to login
//@Security     Public

route.post("/login", (req, res) => {
    const {data} = req.body;
    UserModel.findOne({username: data.username})
    .then(user => {
        if (!user) res.status(404).json({username: "There is no account with this username"})
        else {
            const isPasswordValid = bcrypt.compareSync(data.password, user.passwordHash);
            if (isPasswordValid) res.json(user.sendToClient())
            else return res.status(400).json({password: "Password entered isn't correct!"})
        }
    }) 
})

export default route