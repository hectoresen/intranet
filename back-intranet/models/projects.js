const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema(
    {
        title: {type: String, required: true},
        description: {type: String, required: true},
        comments: [{type: mongoose.Types.ObjectId, ref: 'Comments'}]
    },
    {timestamps: true}
);

const Projects = mongoose.model('Projects', projectSchema);

module.exports = Projects;