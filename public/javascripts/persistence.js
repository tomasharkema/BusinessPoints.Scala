
var app = app || {};

(function(app) {

    const BusinessPoints = "BusinessPoints";

    var checkForLocalStorage = function() {
        return window.localStorage !== undefined
    };

    app.getDataFromLocalStorage = function() {
        var data = localStorage.getItem(BusinessPoints);

        if (data === undefined || data === null) {
            return {};
        }

        return JSON.parse(data);
    };

    var putDataToLocalStorage = function(data) {
        localStorage.setItem(BusinessPoints, JSON.stringify(data));
    };

    app.getItem = function (index) {
        return app.getDataFromLocalStorage()[""+index+""];
    };

    app.putItem = function(item) {
        var data = app.getDataFromLocalStorage();

        if (data === null) return;

        var oldKey = _.max(Object.keys(data));
        if (oldKey === -Infinity) { oldKey = 0 }

        var newKey = oldKey + 1;

        data[newKey] = item;

        putDataToLocalStorage(data);
    };

    app.updateItem = function(index, item) {
        var data = app.getDataFromLocalStorage();

        if (data === null) return;

        data[""+index+""] = item;

        putDataToLocalStorage(data);
    };

    app.removePoint = function(index) {
        var data = app.getDataFromLocalStorage();
        delete data[index+""];
        putDataToLocalStorage(data);
    };

    app.ectsToGo = function() {
        var data = app.getDataFromLocalStorage();
        return _.reduce(data, function(prev, a) {
            if (!a.finished) {
                return prev + a.ECTS
            } else {
                return prev
            }
        }, 0);
    };

    app.totalEcts = function() {
        var data = app.getDataFromLocalStorage();
        return _.reduce(data, function(prev, a) {
            return prev + a.ECTS
        }, 0);
    };

})(app);

