var App = App || {};

App.D3Demo = (function () {
    "use strict";
    /* eslint-env browser, jquery  */
    var chart = new App.ChartController({
        chartContainer: document.querySelector(".chart"),
        dataURL: "http://localhost:3333/api/get/customers",
        detailURL: "http://localhost:3333/api/get/meals/"
    });

    function init() {
        $("#info").hide();
        chart.renderBarChart();
    }

    return {
        init: init
    };
}());
