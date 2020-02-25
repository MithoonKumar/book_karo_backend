class VehiclesService {

    constructor(container) {
        this.elasticSearch = container.resolve('elasticSearch');
        this.invoker = container.resolve('utility').invoker;
        this.constants = container.resolve('constants');
    }

    async updateDetails (req) {
        let vehicleDetails = {};
        vehicleDetails["mobileNumber"] = req.body.mobileNumber;
        vehicleDetails["location"] = req.body.location;
        vehicleDetails["vehicleNumber"] = req.body.vehicleNumber;
        vehicleDetails['nameOfTheOwner'] = req.body.nameOfTheOwner;
        let vehicleId = vehicleDetails["mobileNumber"] + "_" + vehicleDetails["vehicleNumber"];
        let indexName = req.body["typeOfVehicle"];
        let params = { body : []};
        params.body.push({index: {_index: indexName, _type: "vehicle", _id: vehicleId}});
        params.body.push(vehicleDetails);
        let err;
        try {
            [err] = await this.invoker(this.elasticSearch.bulk(params));
        } catch (e) {
            console.log("error", e);
        }
        if (err) {
            this.logger.error("Error while inserting data in ES", {
                err,
                dateTime: new Date()
            });
            return Promise.reject({"err": "Error while updating data in elasticSearch"});
        } else {
            return Promise.resolve({});
        }
    }

    async getNextSetOfVehicles(scrollId, scrollTime) {
        return new Promise((resolve, reject) => {
            this.elasticSearch.scroll(
                { scrollId: scrollId, scroll: scrollTime },
                (err, response) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(response);
                }
            );
        });
    }

    //need to test pagination
    async getAllVehicles(mobileNumber, size, offset) {
            let nameOfIndices = this.constants.elasticSearchIndices;
            let scrollTime = "1m";
            return new Promise((resolve, reject) => {
                this.elasticSearch.search(
                    {
                        index: nameOfIndices,
                        type: "vehicle",
                        scroll: scrollTime,
                        body: {
                            size: size,
                            query: {
                                function_score: {
                                    query: {
                                        bool: {
                                            must: [
                                                {
                                                    match: {
                                                        mobileNumber: mobileNumber
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    },
                    (err, response) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(response);
                    }
                );
            });
    }
}

module.exports = VehiclesService;
