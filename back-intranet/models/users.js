const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {type: String, required: true},
        password: {type: String, required: true},
        role: {
            enum: ["user", "admin"],
            type: String,
            default: basic,
            required: true
        }
    },
    {timestamps: true}
);


const User = mongoose.model("Users",userSchema);

module.exports = User;