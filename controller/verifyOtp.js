class VerifyOtp {

    constructor(container) {
        this.invoker = container.resolve('utility').invoker;
        this.otpService = container.resolve('otpService');
        this.auth = container.resolve('auth');
    }

    async handleRequest(req, res){
        let mobileNumber = req.query['mobileNumber'];
        let otp = req.query['otp'];
        let err;
        [err] = await this.invoker(this.otpService.verifyOtp(mobileNumber, otp));
        if (err) {
            res.status(401);
            res.send(err);
        } else {
            let token = this.auth.generateJWT(mobileNumber);
            res.cookie('AuthToken', token, { maxAge: 900000, httpOnly: true });
            res.status(200);
            res.send("successfully verified the OTP");
        }
    }

}

module.exports = VerifyOtp;
