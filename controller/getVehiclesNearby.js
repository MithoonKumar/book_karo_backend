class GetVehiclesNearby {

    constructor(container) {
        this.logger = console;
        this.invoker = container.resolve('utility').invoker;
        this.vehicleService = container.resolve('vehiclesService');
    }

    async handleRequest(req, res) {
        let latlong = req.query['latlong'];
        let size = Number(req.query['size']);
        if (!latlong || !size) {
            res.status(400);
            return res.send("Bad Request");
        }
        let err, response;
        [err, response] = await this.invoker(this.vehicleService.getVehiclesNearby(latlong, size));
        if (err) {
            this.logger.error("Error while fetching nearby vechiles from ES", {
                err,
                dateTime: new Date(),
                latlong,
                size,
                nameOfIndex
            });
            res.status(500);
            return res.send("Internal Server Error");
        }
        res.status(200);
        res.send(response);
    }
}
module.exports = GetVehiclesNearby;
