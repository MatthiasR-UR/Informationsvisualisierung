var App = App || {};

App.Charts = (function () {
    "use strict";
    /* eslint-env browser, jquery  */
    var chartTypes = [];
    var charts = {};
    var $container = $("#chart");
    var base = "http://localhost:3333/";
    var lastClicked;

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
                    charts[key] = new App.StatusCodeView({
                        chartContainer: document.querySelector("#chart")
                    });
                    break;
                case "timeline":
                    charts[key] = new App.TimelineView({
                        chartContainer: document.querySelector("#chart")
                    });
                    break;
            }
            
        }
    }

    /**
        Gives the view connected to the last clicked sidebar-element the data
        Probably not safe
    */
    function onDataReturn(data){
        try{
            $container.empty();
            charts[lastClicked].setData(data);
        }
        catch(err){
            throw Error (lastClicked + " has no setData-method");
        }
    }

    function sendRequest(request){
        $.getJSON(request, onDataReturn);
    }

    /**
        removes the old chart, saves the clicked element and connects to server on REST with id
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
        initChartTypes();
        initCharts();
        initListeners();        
    }

    return {
        init: init
    };
}());
