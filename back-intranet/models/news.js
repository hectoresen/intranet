const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newsSchema = new Schema(
    {
        description: {type: String, required: true},
        date: {type: Date, required: true},
        user: [{type: mongoose.Types.ObjectId, ref: 'Users'}],
        comments: [{type: mongoose.Types.ObjectId, ref: 'Comments'}]
    }
);

const News = mongoose.model('News', newsSchema);

module.exports = News;