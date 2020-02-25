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

const GetVehicles = require('../controller/getVehicles');
const getVehicles = new GetVehicles(container);
container.register('getVehicles', asValue(getVehicles));

module.exports = container;
