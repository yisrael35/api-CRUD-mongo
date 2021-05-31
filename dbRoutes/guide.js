const express = require('express')
const Guide = require('../models/guide')
const router = new express.Router()

router.post('/createGuide', (req, res) => {
    console.log("im in create guide");
    console.log(req.body);
    if(!req.body){
        console.log("didnt find body");
        return  res.status(400).send("didnt find body");

    }
    const guide = new Guide(req.body);

    guide.save().then(guide=>
        res.status(201).send(guide)
    ).catch(e=>res.status(400).send(e))
})

router.get('/guides', (req, res) => {
    Guide.find().populate('author').then(tasks => res.send(guides)
    ).catch (e=> res.status(500).send())
})


module.exports = router