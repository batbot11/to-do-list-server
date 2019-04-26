import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import passport from "passport";
import {Strategy} from "passport-jwt";
import {ExtractJwt} from "passport-jwt";


import User from "./routes/User";
import TodoRoute from "./routes/TodoRoute";
import UserModel from "./models/UserModel";

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Passport config
app.use(passport.initialize());
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = `${process.env.SECRETKEY}`;
passport.use(new Strategy(opts, (jwt_payload, done) => {
    UserModel.findById(jwt_payload.id)
    .then(user => {
        if (user) return done(null, user) 
        else return done(null, false) 
    })
    .catch(err => console.log("Something wrong with passport", err)) 
}))

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch(err => console.log("Connection to MongoDB Atlas failed!", err) )

app.use("/api/user", User);
app.use("/api/todo", TodoRoute);

app.listen(5000, () => console.log("Listening to port 5000"));

