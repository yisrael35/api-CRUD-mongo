const fs = require('fs');
//--------------------
const Guide = require('../models/guide')
const Tour = require('../models/tour')



    // CRUD for guide and tour - each action go to the mongo db 
    module.exports = {
    //--------------------- CREATE------------------------------------
    createTour: function (req, res) {
        const tour = new Tour(req.body);
        tour.save().then(tour => {
            res.status(201).send(tour)
        }).catch(e => {
            res.status(400).send(e)
        });
    },
    // CREATE guide
    createGuide: function (req, res) {
        const guide = new Guide(req.body);
        guide.save().then(guide=>
            res.status(201).send(guide)
        ).catch(e=>res.status(400).send(e))
    },
    
    createSiteInPath: function (req, res) 
    {
        const tripId = req.params["id"];
        if (!tripId) return res.status(400).send('Id is missing!');
        if(!req.body) return res.status(400).send('Body is missing!');
        if(!req.body.name || !req.body.country) return res.status(400).send('fields are missing!');

        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'country'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }
        Tour.updateOne({name : req.params.id},  { $addToSet: {path: req.body }}, { new: true, runValidators: false }).then(tour => {//disabled runValidators
            if (!tour) {
                return res.status(404).send()
            }
            else {
                // console.log(tour)
                tour.n == 0 ? res.send("ID does not exist"):
                res.send("Tour updated")
            }
        }).catch(e => res.status(400).send(e))
    
           
    },
    
    //--------------------- READ------------------------------------
    getTours: function (req, res) {
        //return all the tours with the guides details inside
        Tour.find().populate('guide').then(tours => res.send(tours.sort())
        ).catch (e=> res.status(500).send())
    },
    getToursByGuideId: function (req, res) {
        //return all the tours with the guide details inside by guide id
        const guideId = req.params["id"];
        //Validators
        if (!guideId) return res.status(400).send('Id is missing!');

        Tour.find({guide: guideId}).populate('guide').then(tours => res.send(tours.sort())
        ).catch (e=> res.status(500).send())
    },
    getGuides: function (req, res) {
        Guide.find().then(guides =>
            res.send(guides)
        ).catch(e => res.status(500).send())
    },
    getTour: function (req, res)
    {
        //get a tour by name and return it
        const tripId = req.params["id"];
        if (!tripId) return res.status(400).send('Id is missing!');
        Tour.findOne({name:tripId}).populate('guide').then(tour =>
            tour ? 
            res.send(tour): res.send("ID does not exist") 
        ).catch(e => res.status(500).send())
    },

    //--------------------- UPDATE------------------------------------
    updateTour: function (req, res) {
        const tripId = req.params["id"];
        //Validators
        if (!tripId) return res.status(400).send('Id is missing!');
        if(!req.body) return res.status(400).send('Body is missing!');

        const updates = Object.keys(req.body)
        const allowedUpdates = ['start_date', 'duration', 'price']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }
        //update the mongo db and return the updated object
        Tour.updateOne({name : req.params.id}, req.body, { new: true, runValidators: true }).then(tour => {
            if (!tour) {
                return res.status(404).send()
            }
            else {
                // console.log(tour)
                tour.n == 0 ? res.send("ID does not exist"):
                res.send("Tour updated")
            }
        }).catch(e => res.status(400).send(e))
    },

    updateGuide: function (req, res) {
        const guideId = req.params["id"];
        //Validators
        if (!guideId) return res.status(400).send('Id is missing!');
        if(!req.body) return res.status(400).send('Body is missing!');

        const updates = Object.keys(req.body)
        const allowedUpdates = ['name', 'email', 'cellular']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }
        //update the mongo db and return the updated object
        Guide.updateOne({_id : req.params.id}, req.body, { new: true, runValidators: true }).then(guide => {
            if (!guide) {
                return res.status(404).send()
            }
            else {
                // console.log(tour)
                guide.n == 0 ? res.send("ID does not exist"):
                res.send("Guide updated")
            }
        }).catch(e => res.status(400).send(e))
    },

    //--------------------- DELETE------------------------------------
    deleteSite: function (req, res)
    {
        const tripId = req.params["id"];
        const siteName = req.params["site_name"];
        if(siteName == null|| tripId == null) return res.status(400).send('id or site name is missing!');
        Tour.updateOne({name:tripId},  { $pull: {path: {name: siteName} }}, { new: true, runValidators: false }).then(tour => {//disabled runValidators
            if (!tour) {
                return res.status(404).send()
            }
            else {
                tour.n == 0 ? res.send("ID does not exist"):
                res.send(tour)
            }
        }).catch(e => res.status(400).send(e))
    },
    
    deleteTour: function (req, res) {
        const tripId = req.params["id"];
        if (!tripId) return res.status(400).send('Id is missing!');
        Tour.remove({name:tripId}).then(tour => 
            tour.n !=0 ? 
            res.send("Tour deleted"): res.send("There is no such tour") 
        ).catch (e=> res.status(500).send("There is no such tour"));
    },
    
    deleteGuide: function (req, res) {
        const guideId = req.params["id"];
        if (!guideId) return res.status(400).send('Id is missing!');
        Tour.remove({_id:guideId}).then(guide => 
            guide.n !=0 ? 
            res.send("Tour deleted"): res.send("There is no such guide") 
        ).catch (e=> res.status(500).send("There is no such guide"));
    }
};

