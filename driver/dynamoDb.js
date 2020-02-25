const AWS = require('aws-sdk');
var config = {
    "apiVersion": "2012-08-10",
    "accessKeyId": "abcde",
    "secretAccessKey": "abcde",
    "region":"us-west-2",
    "endpoint": "http://localhost:8000"
};
let dynamoDB = new AWS.DynamoDB(config);
module.exports = dynamoDB;
