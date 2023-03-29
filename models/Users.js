const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");


const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.model("users",userSchema);

module.exports = User;