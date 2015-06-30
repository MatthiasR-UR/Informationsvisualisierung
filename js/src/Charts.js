var App = App || {};

App.Charts = (function () {
    "use strict";
    /* eslint-env browser, jquery  */
    var chartTypes = [];
    var charts = {};
    var options = {};
    var base = "http://localhost:3333/";
    var lastClicked;

    function initOptions(){
        options.chartContainer = document.querySelector("#chart");
        options.width = $(window).width();
        options.height = $(window).height();
    } 

    /**
        Gets all used sidebar-entries and extracts their data-id
        so there will be no problem with chartTypes containing wrong keys
    */
    function initChartTypes(){
        var nodes = $(".sidebar-nav").find(".sidebar-item > a")
        nodes.each(function(i){
            chartTypes.push($(nodes[i]).data("id"))
        })
    }

    function initCharts(){
        var key = null;
        for(var i = 0; i < chartTypes.length; i++){
            key = chartTypes[i];
            switch(key){
                case "statusCode":
                    charts[key] = new App.StatusCodeView(options);
                    break;
                case "countByDays":
                    charts[key] = new App.TimelineView(options);
                    break;
                case "usernet":
                    charts[key] = new App.UserNetView(options);
                    break;
            }
            
        }
    }

    /**
        Gives the view connected to the last clicked sidebar-element the data
        Probably not safe
    */
    function onDataReturn(data){
        $(options.chartContainer).empty();
        charts[lastClicked].setData(data);
    }

    /**
        Sends an Ajax-Request to the Node-JS-Server
    */
    function sendRequest(request){
        $.getJSON(request, onDataReturn);
    }

    /**
        saves the clicked element and connects to server on REST with data-id
    */
    function onSidebarClick(){
        lastClicked = $(this).find("a").data("id");
        sendRequest(base + lastClicked + "/");
    }

    /* init listeners for UI-elements */
    function initListeners(){
        $(".sidebar-item").click(onSidebarClick);
    }

    function init() {
        initOptions();
        initChartTypes();
        initCharts();
        initListeners();        
    }

    return {
        init: init
    };
}());
