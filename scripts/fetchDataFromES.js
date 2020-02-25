const esLocationFeedClient = require('../driver/elasticSearch');

function fetchPostsFromES(size) {
    let nameOfIndices = "car";
    let scrollTime = "1s";
    return new Promise((resolve, reject) => {
        esLocationFeedClient.search(
            {
                index: nameOfIndices,
                type: "vehicle",
                scroll: scrollTime,
                body: {
                    size: size
                }
            },
            (err, response) => {
                if (err) {
                    console.log("err", err);
                    return reject(err);
                }
                console.log("response", JSON.stringify(response));
                return resolve(response);
            }
        );
    });
}
fetchPostsFromES(100);