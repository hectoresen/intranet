const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chatGroups = new Schema(
    {
        name: {type: String, default: 'Grupo sin nombre'},
        owner: [{type: mongoose.Types.ObjectId, ref: 'Users'}],
        guests: [{type: mongoose.Types.ObjectId, ref: 'Users'}],
        posts: [{type: mongoose.Types.ObjectId, ref: 'ChatPosts'}],
    },
    {timestamps: true}
);

const ChatGroup = mongoose.model('ChatGroups', chatGroups);

module.exports = ChatGroup;