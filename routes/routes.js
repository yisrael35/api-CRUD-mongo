const express = require('express'),
    tripsRoutes = require('./trips');

var router = express.Router();


///  --------------------CRUD------------------------------


//--------------------- CREATE------------------------------------
router.post('/createGuide', tripsRoutes.createGuide);
router.post('/createTour/:id', tripsRoutes.createTour);
router.post('/createSiteInPath/:id', tripsRoutes.createSiteInPath);

//--------------------- READ------------------------------------
router.get('/getTours', tripsRoutes.getTours);
router.get('/getTour/:id', tripsRoutes.getTour);
router.get('/getGuides', tripsRoutes.getGuides);
router.get('/getToursByGuideId/:id', tripsRoutes.getToursByGuideId);

//--------------------- UPDATE------------------------------------
router.put('/updateTour/:id', tripsRoutes.updateTour);
router.put('/updateGuide/:id', tripsRoutes.updateGuide);

//--------------------- DELETE------------------------------------
router.delete('/deleteSite/:id/:site_name', tripsRoutes.deleteSite);
router.delete('/deleteTour/:id', tripsRoutes.deleteTour);
router.delete('/deleteGuide/:id', tripsRoutes.deleteGuide);




module.exports = router;