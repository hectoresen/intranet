const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postsSchema = new Schema(
    {
        message: {type: String, required: true},
        messageOwner: [{type: mongoose.Types.ObjectId, ref: 'Users'}]
    },
    {timestamps: true}
);

const ChatPosts = mongoose.model('ChatPosts', postsSchema);

module.exports = ChatPosts;