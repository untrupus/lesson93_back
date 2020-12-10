const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema({
    startDate: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectID,
        ref: "User",
        required: true
    }
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;