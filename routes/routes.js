const express = require('express'),
    tripsRoutes = require('./trips');

var router = express.Router();


///  --------------------CRUD------------------------------
//create
router.post('/createGuide', tripsRoutes.createGuide);
router.post('/createTour/:id', tripsRoutes.createTour);
router.post('/createSiteInPath/:id', tripsRoutes.createSiteInPath);
//read
router.get('/getTours', tripsRoutes.getTours);
router.get('/getTour/:id', tripsRoutes.getTour);
router.get('/getGuides', tripsRoutes.getGuides);
//update
router.put('/updateTour/:id', tripsRoutes.updateTour);
//delete
router.delete('/deleteSite/:id/:site_name', tripsRoutes.deleteSite);
router.delete('/deleteTour/:id', tripsRoutes.deleteTour);




module.exports = router;