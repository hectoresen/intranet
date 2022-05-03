const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentsSchema = new Schema(
    {
        comment: {type: String, required: true},
        user: [{type: mongoose.Types.ObjectId, ref: 'Users'}],
        news: [{type: mongoose.Types.ObjectId, ref: 'News'}],
        project: [{type: mongoose.Types.ObjectId, ref: 'Projects'}]
    },
    {timestamps: true}
);

const Comment = mongoose.model('Comments', commentsSchema);

module.exports = Comment;