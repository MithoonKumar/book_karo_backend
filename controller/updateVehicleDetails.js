class UpdateVehicleDetails {

    constructor(container) {
        this.logger = console;
        this.elasticSearch = container.resolve('elasticSearch');
        this.invoker = container.resolve('utility').invoker;
        this.vehiclesService = container.resolve('vehiclesService');
    }

    async handleRequest(req, res) {
        if (!this.checkIfPayloadIsValid(req.body)) {
            res.status(400);
            return res.send("Bad Request");
        }
        let err;
        [err] = await this.invoker(this.vehiclesService.updateDetails(req));
        if (err) {
            res.status(500);
            return res.send("Error while processing request");
        }
        res.status(200);
        res.send("Successfully processed the request");
    }

    checkIfPayloadIsValid(payload) {
        if (!("mobileNumber" in payload) || !("vehicleNumber" in payload) || !("location" in payload) || !("nameOfTheOwner" in payload) || (!"typeOfVehicle" in payload)) {
            return false;
        }
        return true;
    }
}
module.exports = UpdateVehicleDetails;
