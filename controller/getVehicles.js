class GetVehicles {

    constructor(container) {
        this.logger = console;
        this.vehiclesService = container.resolve('vehiclesService');
        this.invoker = container.resolve('utility').invoker;
    }

    async handleRequest(req, res) {
        let mobileNumber = req.query["mobileNumber"];
        let err, response;
        [ err, response ] = await this.invoker(this.vehiclesService.getAllVehicles(mobileNumber, 1));
        if (err) {
            this.logger.error("Error while getting vechiles using mobile number", {
                err,
                dateTime: new Date(),
                mobileNumber
            });
            res.status(500);
            return res.send("Inernal Server Error");
        }
        res.status("200");
        res.send(response);
    }

    async handleScroll(req, res) {
        let scrollId = req.query["scrollId"];
        let err, response;
        [err, response]= await this.invoker(this.vehiclesService.getNextSetOfVehicles(scrollId, "1m"));
        if (err) {
            res.status(500);
            res.send("Internal Server Error");
        }
        res.status(200);
        res.send(response);
    }

}

module.exports = GetVehicles;
