const express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    fs = require('fs'),
    cors = require('cors'),
    routers = require('./routes/routes.js');
const port = 3001;
///--------------------------------
require('./db/mongoose');
const tourRouter = require('./dbRoutes/tour');
const guideRouter = require('./dbRoutes/guide');


const app=express();

app.use('/', express.static(path.join(__dirname, 'html')));
app.use('/SiteList', express.static(path.join(__dirname, 'html/SiteList.html')));
app.use('/add_tour', express.static(path.join(__dirname, 'html/add_tour_form.html')));
app.use('/add_guide', express.static(path.join(__dirname, 'html/add_guide_form.html')));

app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/public', express.static(path.join(__dirname, 'public')));

//----------------------------------------
app.use(tourRouter);
app.use(guideRouter);


//restfull 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routers);

const server = app.listen(port, () => {
    console.log('listening on port %s...', server.address().port);
});