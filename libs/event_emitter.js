var EventEmitter = (function () {
    var events = {};
    function EventEmitter() {
        var callbacks = [];

        // emit
        this.emit = (...args) => {
            callbacks.forEach((callback) => {
                callback.apply(null, args);
            });
            return this;
        };
        
        // subscribe
        this.subscribe = (callback) => {
            callbacks.push(callback);
            return this;
        };
    }

    return {
        get: (key) => {
            if (!(key in events)) {
                events[key] = new EventEmitter();
            }
            return events[key];
        }
    };
})();

module.exports = EventEmitter;
