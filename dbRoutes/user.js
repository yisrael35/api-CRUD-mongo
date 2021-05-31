const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.post('/users', (req, res) => {
    const user = new User(req.body)
    user.save().then(user => {
        console.log("in then - save");
        res.status(201).send(user)
    }).catch(e => {
        res.status(400).send(e)
    });
  
});

router.get('/users', (req, res) => {
    User.find().then(users =>
        res.send(users)
    ).catch(e => res.status(500).send())
})


router.put('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).then(user => {
        if (!user) {
            return res.status(404).send()
        }
        else {
            console.log(user)
            res.send(user)
        }
    }).catch(e => res.status(400).send(e))
})

module.exports = router