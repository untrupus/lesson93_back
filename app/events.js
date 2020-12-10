const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Event = require('../models/Event');

router.get('/', auth, async (req, res) => {
    let query = {user: req.user._id};
    const result = await Event.find(query).sort({"startDate": 1});
    if (result) {
        res.send(result);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', auth, async (req, res) => {
    const eventData = req.body;
    eventData.user = req.user._id;
    const event = new Event(eventData);
    try {
        await event.save();
        res.send(event);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/:id', auth, async (req, res) => {
    const event = await Event.findOne({_id: req.params.id});

    if (event.user.equals(req.user._id)) {
        const result = await Event.findByIdAndDelete({_id: req.params.id});
        if (result) {
            res.send("Event removed");
        } else {
            res.sendStatus(404);
        }
    }
});

router.get('/:id', async (req, res) => {
    let query = {user: req.params.id};
    const result = await Event.find(query).sort({"startDate": 1});
    if (result) {
        res.send(result);
    } else {
        res.sendStatus(404);
    }
});

// router.patch('/:id', auth, async (req, res) => {
//     const result = await Event.findByIdAndUpdate(req.params.id, req.body);
//     if (result) {
//         res.send('Success');
//     } else {
//         res.sendStatus(404);
//     }
// });

module.exports = router;