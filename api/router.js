const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
   res.send('Hello from the book karo service');
});

router.post('/verifyOtp', (req, res) => {
   req.container.resolve('verifyOtp').handleRequest(req, res);
});

router.get('/getOtp', (req, res) => {
   req.container.resolve('getOtp').handleRequest(req, res);
});

router.post('/updateVehicleDetails', (req, res) => {
   req.container.resolve('updateVehicleDetails').handleRequest(req, res);
});

router.get('/getOwnVehicles', (req, res) => {
   req.container.resolve('getOwnVehicles').handleRequest(req, res);
});

router.get('/getVehiclesNearby', (req, res) => {
   req.container.resolve('getVehiclesNearby').handleRequest(req, res);
});

// router.get('/getNextSetOfVehicles', (req, res) => {
//    req.container.resolve('getNextSetOfVehicles').handleRequest(req, res);
// });
//
router.post('/event', (req, res) => {
   req.container.resolve('event').handleRequest(req, res);
});

router.get('/health', (req, res) => {
   res.status(200);
   res.send("The service is up and running");
});

module.exports = router;
