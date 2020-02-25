class GetOtp {

    constructor(container) {
        this.otpService = container.resolve('otpService');
        this.invoker = container.resolve('utility').invoker;
        this.logger = console;
    }

    async handleRequest(req, res) {
        let mobileNumber = req.query["mobileNumber"];
        let err;
        [err] = await this.invoker(this.otpService.getOtp(mobileNumber));
        if (err) {
            res.status(500);
            res.send(err);
        } else {
            res.status(200);
            res.send("Suceess");
        }
    }

}

module.exports = GetOtp;
