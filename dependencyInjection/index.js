const { createContainer, asValue } = require('awilix');
const container = createContainer();
const Utility = require('../utils/utility');
const utility = new Utility();
const dynamoDb = require('../driver/dynamoDb');
const constants = require('../constants/constants');
const otpGenerator = require('otp-generator');
const crypto = require('crypto');
const request = require('request');
const elasticSearch = require('../driver/elasticSearch');

container.register({
    utility: asValue(utility),
    dynamoDb: asValue(dynamoDb),
    constants: asValue(constants),
    otpGenerator: asValue(otpGenerator),
    crypto: asValue(crypto),
    request: asValue(request),
    elasticSearch: asValue(elasticSearch)
});

//--------------AUTHENTICATION----------
const Authentication = require('../Authentication/authentication');
const authentication = new Authentication(container);
container.register('auth', asValue(authentication));

//-----------REPOSITORIES-------------
const OtpTable = require('../repository/otpTable.js');
container.register('otpTable', asValue(new OtpTable(container)));


//------------SERVICES----------------
const OtpService = require('../services/otpService');
const otpService = new OtpService(container);
container.register('otpService', asValue(otpService));
const VehiclesService = require('../services/vehiclesService');
const vehiclesService = new VehiclesService(container);
container.register('vehiclesService', asValue(vehiclesService));

//------------CONTROLLERS----------------
const GetOtp = require('../controller/getOtp');
const getOtp = new GetOtp(container);
container.register('getOtp', asValue(getOtp));

const VerifyOtp = require('../controller/verifyOtp');
const verifyOtp = new VerifyOtp(container);
container.register('verifyOtp', asValue(verifyOtp));

const UpdateVechileDetails = require('../controller/updateVehicleDetails');
const updateVehicleDetails = new UpdateVechileDetails(container);
container.register('updateVehicleDetails', asValue(updateVehicleDetails));

const GetVehiclesNearby = require('../controller/getVehiclesNearby');
const getVehiclesNearby = new GetVehiclesNearby(container);
container.register('getVehiclesNearby', asValue(getVehiclesNearby));

const GetOwnVehicles = require('../controller/getOwnVehicles');
const getOwnVehicles = new GetOwnVehicles(container);
container.register('getOwnVehicles', asValue(getOwnVehicles));

const GetNextSetOfVehicles = require('../controller/getNextSetOfVehicles');
const getNextSetOfVehicles = new GetNextSetOfVehicles((container));
container.register('getNextSetOfVehicles', asValue(getNextSetOfVehicles));

const Event = require('../controller/event');
const event = new Event(container);
container.register('event', asValue(event));

module.exports = container;
