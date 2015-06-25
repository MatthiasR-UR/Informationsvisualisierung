var App = App || {};

App.Charts = (function () {
    "use strict";
    /* eslint-env browser, jquery  */
    var chart;
    var $container = $("#chart");

    function initCharts(){
        chart = new App.PieController({
        chartContainer: document.querySelector("#chart")
        });
        chart.init();
    }

    /* init listeners for UI-elements */
    function initListeners(){

    }

    function cb(data){
        //$container.empty();
        chart.setData(data);
    }

    function init() {
        initCharts();
        initListeners();
        var data = $.getJSON("http://localhost:3333/statusCode/", cb);
        
    }

    return {
        init: init
    };
}());
