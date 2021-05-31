const fs = require('fs');
//--------------------
const Guide = require('../models/guide')
const Tour = require('../models/tour')



    // CRUD for guide and tour
    module.exports = {
    
    // CREATE
    createTour: function (req, res) {
        const tour = new Tour(req.body);
        console.log(req.body);

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
    //READ
    getTours: function (req, res) {
        // Tour.find().then(tours =>//sort -- need to check .sort(name)
        //     res.send(tours.sort())
        // ).catch(e => res.status(500).send())
        Tour.find().populate('guide').then(tours => res.send(tours.sort())
        ).catch (e=> res.status(500).send())


    },
    getGuides: function (req, res) {
        Guide.find().then(guides =>//sort -- need to check .sort(name)
            res.send(guides)
        ).catch(e => res.status(500).send())
    },
    getTour: function (req, res)
    {
        const tripId = req.params["id"];
        if (!tripId) return res.status(400).send('Id is missing!');


        Tour.findById(tripId).populate('guide').then(tours =>
            res.send(tours)
        ).catch(e => res.status(500).send())

        // Tour.findOne(name : tripId).then(tours =>
        //     res.send(tours)
        // ).catch(e => res.status(500).send())
    },


    // UPDATE
    updateTour: function (req, res) {

        
            const tripId = req.params["id"];
            if (!tripId) return res.status(400).send('Id is missing!');

            const updates = Object.keys(req.body)
            const allowedUpdates = ['start_date', 'duration', 'price']
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

        //     if(!req.body) return res.status(400).send('Body is missing!');
        //     if(tripId !== req.body.id) return res.status(400).send('Id is not matching');
        //     if(checkReqBodyTour(req) === 400) return res.status(400).send('Body isnt valid!');
        //     if (data[tripId])
        //         data[tripId] = req.body;
        //     else res.status(400).send('Tour doesnt exists!');
        //     writeFile(JSON.stringify(data, null, 2), () => {
        //         res.status(200).send(`trips id:${tripId} updated`);
        //     });
        // },
        //     true);
    },

    createSiteInPath: function (req, res) 
    {
        const tripId = req.params["id"];
        if (!tripId) return res.status(400).send('Id is missing!');
       
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'country'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }
        // Tour.updateOne({ name: tripId},  { $push: { path: req.body } },done);

        Tour.findByIdAndUpdate(req.params.id,  { $push: {path: req.body }}, { new: true, runValidators: false }).then(tour => {//disabled runValidators
            if (!tour) {
                return res.status(404).send()
            }
            else {
                console.log(tour)
                res.send(tour)
            }
        }).catch(e => res.status(400).send(e))
    
        //     if(!req.body) return res.status(400).send('Body is missing!');
        //     if (!tripId) return res.status(400).send('Id is missing!');
        //     if(!req.body.name || !req.body.country) return res.status(400).send('fields are missing!');
           
    },

//--------------------- DELETE------------------------------------
    deleteSite: function (req, res)
    {
        const tripId = req.params["id"];
        const siteName = req.params["site_name"];
        if(siteName == null|| tripId == null) return res.status(400).send('id or site name is missing!');
        Tour.findByIdAndUpdate(tripId,  { $pull: {path: {name: siteName} }}, { new: true, runValidators: false }).then(tour => {//disabled runValidators
            if (!tour) {
                return res.status(404).send()
            }
            else {
                console.log(tour)
                res.send(tour)
            }
        }).catch(e => res.status(400).send(e))
    },
    
    deleteTour: function (req, res) {
        const tripId = req.params["id"];
        if (!tripId) return res.status(400).send('Id is missing!');
        Tour.remove(tripId);//name or id??????????????
    }
};

function checkReqBodyTour(req){
    if(!req.body.id || !req.body.start_date || !req.body.duration || !req.body.price || !req.body.guide.name 
        // || !req.body.guide.email || !req.body.guide.cellular
         )
        return 400;
    if(!Number.isInteger(Number(req.body.duration)) || !Number.isInteger(Number(req.body.price)) 
    // || !Number.isInteger(Number(req.body.guide.cellular))
    ) 
        return 400;
    if(req.body.duration <= 0 || req.body.price <= 0 
        // || req.body.guide.cellular.length < 10
        )
        return 400;
    // if(!req.body.guide.email.includes("@"))
    //     return 400;
}
function checkReqBodyGuide(req){
    if(!req.body.guide.email || !req.body.guide.cellular || !Number.isInteger(Number(req.body.guide.cellular))
    || req.body.guide.cellular.length < 10 || !req.body.guide.email.includes("@")
    )
    return 400;
}