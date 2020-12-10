const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FriendSchema = new Schema({
    user: {
        type: Schema.Types.ObjectID,
        ref: "User",
        required: true
    },
    friend: {
        type: Schema.Types.ObjectID,
        ref: "User",
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    friendName: {
        type: String,
        required: true
    }
});

const Friend = mongoose.model("Friend", FriendSchema);

module.exports = Friend;