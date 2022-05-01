const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventsSchema = new Schema(
    {
        eventTitle: {type: String, required: true},
        eventDate: {type: Date, required: true},
        user: [{type: mongoose.Types.ObjectId, ref: 'Users'}]
    },
    {timestamps: true}
);

const Event = mongoose.model('Events', eventsSchema);

module.exports = Event;