class OtpTable {

    constructor(container) {
        this.dynamoDb = container.resolve('dynamoDb');
        this.invoker = container.resolve('utility').invoker;
        this.logger = console;
    }

    async readOtp(mobileNumber) {
        let params = {
            TableName: "otpTable",
            Key: {
                "mobileNumber": {
                    S: mobileNumber
                }
            }
        };

        let err, response;
        [err, response] = await this.invoker(this.dynamoDb.getItem(params).promise());
        if (err) {
            this.logger("Error while fetching item from otpTable", {
                err,
                dateTime: new Date()
            });
            return Promise.reject({"err" : "Failed while fetching item from the table"});
        }
        return Promise.resolve(response);
    }

    async putOtp(mobileNumber, otp) {
        let expiryTime, currentTime = new Date();
        currentTime.setMinutes(currentTime.getMinutes() + 5);
        expiryTime = Number(currentTime);
        let params = {
            TableName : "otpTable",
            Item:{
                "mobileNumber": {
                    S: mobileNumber
                },
                "otp": {
                    S: otp
                },
                "expiryTime": {
                    N: expiryTime.toString()
                }
            },
            ReturnConsumedCapacity: "TOTAL",
        };

        let err, response;
        [err, response] = await this.invoker(this.dynamoDb.putItem(params).promise());
        if (err) {
            this.logger.error("Error while putting item in the table", {
               err,
               dateTime: new Date()
            });
            return Promise.reject({"err": "Error while putting item in the table"});
        }
        return Promise.resolve(response);
    }

    async updateExpiryTime(mobileNumber) {
        let newExpiryTime = Number(new Date());
        let params = {
            TableName: "otpTable",
            Key:{
                "mobileNumber": { S: mobileNumber }
            },
            UpdateExpression: "set expiryTime = :newExpiryTime",
            ExpressionAttributeValues:{
                ":newExpiryTime": { N: newExpiryTime.toString() }
            },
            ReturnValues:"UPDATED_NEW"
        };
        let err, response;
        [err, response] = await this.invoker(this.dynamoDb.updateItem(params).promise());
        if (err) {
            this.logger.error("Error while updating item in the table", {
                err,
                dateTime: new Date()
            });
            return Promise.reject({"err": "Error while updating item in the table"});
        }
        return Promise.resolve(response);
    }

}

module.exports = OtpTable;
