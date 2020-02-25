class Utility {

    invoker(promise) {
        return promise
            .then((data) => {
                return [ null, data ];
            })
            .catch((err) => {
                return [ err, null ];
            });
    }
}

module.exports = Utility;
