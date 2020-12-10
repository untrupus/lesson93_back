const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Friend = require('../models/Friend');
const User = require('../models/User');

router.post("/", auth, async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (user) {
        let newFriend = {};
        newFriend.user = req.user._id;
        newFriend.friend = user._id;
        newFriend.name = user.displayName;
        newFriend.friendName = req.user.displayName;
        const friend = new Friend(newFriend);
        try {
            await friend.save();
            res.send(friend);
        } catch (e) {
            res.status(400).send(e);
        }
    } else {
        res.sendStatus(404);
    }
});

router.get("/", auth, async (req, res) => {
    const response = await Friend.find({user: req.user._id});
    if (response) {
        res.send(response);
    } else {
        res.sendStatus(404);
    }
});

router.get("/myfriends", auth, async (req, res) => {
    const response = await Friend.find({friend: req.user._id});
    if (response) {
        res.send(response);
    } else {
        res.sendStatus(404);
    }
});

router.delete("/:id", auth, async (req, res) => {
    const friend = await Friend.findOne({_id: req.params.id});

    if (friend.user.equals(req.user._id)) {
        const result = await Friend.findByIdAndDelete({_id: req.params.id});
        if (result) {
            res.send("Friend removed");
        } else {
            res.sendStatus(404);
        }
    }
});

module.exports = router;