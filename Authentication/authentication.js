class Authentication {

    constructor(container) {
        this.crypto = container.resolve('crypto');
        this.logger = console;
        this.secretKey = "book_karo_secret_key";
    }

    validJWT(jwt) {
        if (!jwt || jwt.split('.').length != 3) {
            return false;
        }
        let keys = jwt.split('.');
        let signature = keys[2];
        let base64UrlToBeSigned = decodeURIComponent(keys[0]) + "."  + decodeURIComponent(keys[1]);
        const hmac = this.crypto.createHmac('sha256', this.secretKey);
        hmac.update(base64UrlToBeSigned);
        let newSignature = hmac.digest('base64');
        if (newSignature === decodeURIComponent(signature)) {
            return true;
        }
        return false;
    }

    generateJWT(mobileNumber) {
        let header = {
            "alg": "HS256",
            "typ": "JWT"
        }
        let payload = {
            mobileNumber
        };
        header = Buffer.from(JSON.stringify(header)).toString('base64');
        payload = Buffer.from(JSON.stringify(payload)).toString('base64');;
        let base64UrlToBeSigned = header + "." + payload;
        const hmac = this.crypto.createHmac('sha256', this.secretKey);
        hmac.update(base64UrlToBeSigned);
        let signature = hmac.digest('base64');
        return base64UrlToBeSigned + "." + signature;
    }

    getMobileNumber(jwt) {
        return JSON.parse(Buffer.from(decodeURIComponent(jwt.split('.')[1]), 'base64').toString())["mobileNumber"];
    }
}

module.exports = Authentication;
