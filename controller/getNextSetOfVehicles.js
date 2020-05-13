//Deprecated class
class GetNextSetOfVehicles {

    constructor(container) {
        this.logger = console;
        this.vehiclesService = container.resolve('vehiclesService');
        this.invoker = container.resolve('utility').invoker;
    }

    async handleRequest(req, res) {
        let scrollId = req.query["scrollId"];
        let err, response;
        [err, response]= await this.invoker(this.vehiclesService.getNextSetOfVehicles(scrollId, "1h"));
        if (err) {
            res.status(500);
            res.send("Internal Server Error");
        }
        res.status(200);
        res.send(response);
    }
}

module.exports = GetNextSetOfVehicles;
