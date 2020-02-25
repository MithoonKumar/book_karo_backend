let client = require("../driver/elasticSearch");

async function createIndex(typeOfVehicle) {
    let params = {
        "includeTypeName": true,
        "index": typeOfVehicle,
        "body": {
            "settings" : {
                "number_of_shards" : 10,
                "number_of_replicas" : 2
            },
            "mappings" : {
                "vehicle": {
                    "properties" : {
                        'location': {
                            'type': 'geo_point',
                        },
                        'mobileNumber': {
                            "type": "text"
                        },
                        'vehicleNumber': {
                            "type": "text"
                        },
                        'nameOfTheOwner':{
                            "type": "text"
                        }
                    }
                }
            }
        }
    };
    try {
        let response = await client.indices.create(params);
        console.log("response", response);
    } catch (e) {
        console.log("error", e);
    }
}

let list = ["car", "mini_trrucks", "trucks", "tempo"];

for (let index = 0; index<list.length; index++) {
    createIndex(list[index]);
}