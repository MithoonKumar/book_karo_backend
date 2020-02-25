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

router.get('/getVehicles', (req, res) => {
   req.container.resolve('getVehiclesDetails').handleRequest(req, res);
});

router.get('/getNextSetOfVehicles', (req, res) => {
   req.container.resolve('getVehiclesDetails').handleScroll(req, res);
});

module.exports = router;
