const express = require('express')
const Tour = require('../models/tour')
const router = new express.Router()

router.post('/tours', (req, res) => {
    console.log("im in create tour");
    console.log(req.body);
    const tour = new Tour(req.body)
    tour.save().then(tour => {
        console.log("in then - save");
        res.status(201).send(tour)
    }).catch(e => {
        res.status(400).send(e)
    });
  
});

router.get('/tours', (req, res) => {
    Tour.find().then(tours =>
        res.send(tours)
    ).catch(e => res.status(500).send())
})


router.put('/tours/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    Tour.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).then(tour => {
        if (!tour) {
            return res.status(404).send()
        }
        else {
            console.log(tour)
            res.send(tour)
        }
    }).catch(e => res.status(400).send(e))
})

module.exports = router