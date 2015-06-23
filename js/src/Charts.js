var App = App || {};

App.Charts = (function () {
    "use strict";
    /* eslint-env browser, jquery  */
    var chart = new App.PieController({
        chartContainer: document.querySelector("#chart"),
        dataURL: "http://localhost/statusCode/",
    });

    function init() {
        console.log("in init");
        //chart.renderBarChart();
    }

    return {
        init: init
    };
}());
