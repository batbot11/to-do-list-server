import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const schema = new mongoose.Schema({
    username: {type: String, required: true},
    passwordHash: {type: String, required: true}
},
{timestamps: true}
)

schema.methods.sendToClient = function sendToClient () {
    return {
        id: this._id,
        username: this.username,
        token: "Bearer " + this.generateToken()
    }
}

schema.methods.generateToken = function generateToken () {
    const payload = {
        id: this._id,
        username: this.username
    }
  return  jwt.sign(payload, process.env.SECRETKEY) // Didn't include expiresIn in this as option
}

export default mongoose.model("UserModel", schema);
