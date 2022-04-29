const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentsSchema = new Schema(
    {
        comment: {type: String},
        user: [{type: mongoose.Types.ObjectId, ref: 'Users'}]
    },
    {timestamps: true}
);

const Comment = mongoose.model('Comments', commentsSchema);

module.exports = Comment;