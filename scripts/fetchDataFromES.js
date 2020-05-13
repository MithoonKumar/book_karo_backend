const esLocationFeedClient = require('../driver/elasticSearch');

function fetchPostsFromES(size, mobileNumber) {
    let nameOfIndices = "car";
    let scrollTime = "1h";
    return new Promise((resolve, reject) => {
        esLocationFeedClient.search(
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
                    console.log("err", err);
                    return reject(err);
                }
                console.log("response", JSON.stringify(response));
                return resolve(response);
            }
        );
    });
}


function fetchNextPostsFromES(scrollId, scrollTime) {
    return new Promise((resolve, reject) => {
        esLocationFeedClient.scroll(
            { scrollId: scrollId, scroll: scrollTime },
            (err, response) => {
                if (err) {
                    console.log("err", err);
                    return resolve(err);
                }
                console.log("err", err);
                console.log("res", JSON.stringify(response));
                return resolve(response);
            }
        );
    });
}



fetchPostsFromES(100, 78963780423);
//fetchNextPostsFromES('DnF1ZXJ5VGhlbkZldGNoCgAAAAAAAABnFjJ6cE5LU2lDVGJ5UlV5Q0QtMUFxYUEAAAAAAAAAZRYyenBOS1NpQ1RieVJVeUNELTFBcWFBAAAAAAAAAGYWMnpwTktTaUNUYnlSVXlDRC0xQXFhQQAAAAAAAABoFjJ6cE5LU2lDVGJ5UlV5Q0QtMUFxYUEAAAAAAAAAaRYyenBOS1NpQ1RieVJVeUNELTFBcWFBAAAAAAAAAGsWMnpwTktTaUNUYnlSVXlDRC0xQXFhQQAAAAAAAABqFjJ6cE5LU2lDVGJ5UlV5Q0QtMUFxYUEAAAAAAAAAbBYyenBOS1NpQ1RieVJVeUNELTFBcWFBAAAAAAAAAG0WMnpwTktTaUNUYnlSVXlDRC0xQXFhQQAAAAAAAABuFjJ6cE5LU2lDVGJ5UlV5Q0QtMUFxYUE=', '1h');