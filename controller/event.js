class Event {

    constructor(container) {
        this.logger = console;
    }

    async handleRequest(req, res) {
        console.log(JSON.stringify(req.body));
        res.status(200);
        res.send("Successfully added event");
    }
}

module.exports = Event;
