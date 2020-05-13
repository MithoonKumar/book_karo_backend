class OtpService {

    constructor(container) {
        this.dynamoDb = container.resolve('dynamoDb');
        this.logger = console;
        this.otpGenerator = container.resolve('otpGenerator');
        this.otpTable = container.resolve('otpTable');
        this.invoker = container.resolve('utility').invoker;
        this.request = container.resolve('request');
        this.constants = container.resolve('constants');
    }

    async getOtp(mobileNumber) {
        let otp = (this.otpGenerator.generate(6, { specialChars: false, alphabets: false, upperCase: false, digits: true })).toString();
        let err;
        [err] = await this.invoker(this.otpTable.putOtp(mobileNumber, otp));
        if (err) {
            this.logger.error("Error while inserting data in the table", {
                err,
                dateTime: new Date()
            });
            return Promise.reject({err: "Error while inserting data in the table"});
        }
        this.sendSms(mobileNumber, otp);
        return Promise.resolve({"msg": "Successfully entered otp in the table"});
    }

    sendSms(mobileNumber, otp) {
        this.url = this.constants.smsEndPoint;
        this.url = this.url + `&send_to=${mobileNumber}` + `&msg=OTP: <${otp}> ShareChat परिवार में आपका स्वागत है| kmQwzAyyYUK`;
        this.request.get(encodeURI(this.url), (err, data) => {
            console.log("err", err);
            console.log("data", data.body);
        })
    }

    async verifyOtp(mobileNumber, otp) {
        let err, response;
        [err, response] = await this.invoker(this.otpTable.readOtp(mobileNumber));
        if (err) {
            this.logger.error("Error while reading otp from table", {
                err,
                dateTime: new Date()
            });
            return Promise.reject({"err": "Error while reading otp from table"});
        }
        let currentTime = Number(new Date());
        if (Number(response.Item.expiryTime.N) > currentTime && response.Item.otp.S === otp) {
            [err] = await this.invoker(this.otpTable.updateExpiryTime(mobileNumber));
            if (err) {
                this.logger.error("Error while updating expiry time", {
                    err,
                    dateTime: new Date()
                });
            }
            return Promise.resolve({});
        } else {
            return Promise.reject({"err": "otp entered by the user is incorrect or is expired"});
        }

    }
}

module.exports = OtpService;
