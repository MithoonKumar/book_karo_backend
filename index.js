const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const router = require('./api/router');
const container = require('./dependencyInjection/index');
const auth = container.resolve('auth');

const app = express();
app.use(bodyparser.json({
    limit: '10mb',
    strict: false
}));
app.use(cors());
app.use((req, res, next) => {
    if (req.url.indexOf('/getOtp') != -1 || req.url.indexOf('/verifyOtp') != -1) {
        return next();
    }
    let jwt = req.get('AuthToken');
    if (!auth.validJWT(jwt)) {
       res.status(403);
       res.send('UnAuthorised Request');
    } else {
       let mobileNumber = auth.getMobileNumber(jwt);
       req.body.mobileNumber = mobileNumber;
       next();
    }
});
app.use((req, res, next) => {
    req.container = container.createScope();
    next();
});
app.use('/', router);
app.listen(3000, ()=>{
    console.log("Server started at port 3000")
});
