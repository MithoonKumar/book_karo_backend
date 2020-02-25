let client = require("../driver/elasticSearch");

let list = ["car", "mini_trrucks", "trucks", "tempo"];

async function deleteIndeices(indexName) {
    console.log("indexName", indexName);
    let params = {
        index :indexName
    };
    try {
        let response = await client.indices.delete(params);
        console.log("response", response);
    } catch (e) {
        console.log("error", e);
    }
}

for(let index =0; index<list.length; index++) {
    deleteIndeices(list[index]);
}

