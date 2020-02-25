const elasticsearch = require("elasticsearch");

let client = new elasticsearch.Client({
    host: "localhost:9200"
});

module.exports = client;
