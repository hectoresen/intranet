const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newsSchema = new Schema(
    {
        title: {type: String, required: true},
        description: {type: String, required: true},
        dateNew: {type: String, required: true},
        user: [{type: mongoose.Types.ObjectId, ref: 'Users'}],
        comments: [{type: mongoose.Types.ObjectId, ref: 'Comments'}]
    },
    {timestamps: true}
);

const News = mongoose.model('News', newsSchema);

module.exports = News;