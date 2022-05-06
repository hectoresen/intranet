const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postsSchema = new Schema(
    {
        message: {type: String, required: true},
        messageOwner: [{type: mongoose.Types.ObjectId, ref: 'Users'}],
        chatGroup : {type: mongoose.Types.ObjectId, ref: 'ChatGroups'},
    },
    {timestamps: true}
);

const ChatPosts = mongoose.model('ChatPosts', postsSchema);

module.exports = ChatPosts;