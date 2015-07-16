var App = App || {};

App.Charts = (function () {
    "use strict";
    /* eslint-env browser, jquery  */
    var chartTypes = [];
    var charts = {};
    var options = {};
    var secondOptions = {};
    var base = "http://localhost:3333/";
    var lastClicked;

    function initOptions(){
        options.chartContainer = document.querySelector("#chart");
        options.width = $(window).width();
        options.height = $(window).height();
    } 
    
    function initSecondOptions(){
        secondOptions.chartContainer = document.querySelector("#secondChart");
        secondOptions.width = $(window).width();
        secondOptions.height = $(window).height();
        $('#secondChart').css("visibility", "hidden");
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
                case "trafficType":
                    charts[key] = new App.TrafficTypeView(options, secondOptions);
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
        console.log("charts - last clicked: " + charts[lastClicked]);
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
        
        // Show a spinner during the loading process
        $('#chart').html("");
        $('#secondChart').html("");
        var target = document.getElementById('chart');
        var spinner = new Spinner(Constants.opts).spin(target);
        
        
        lastClicked = $(this).find("a").data("id");
        sendRequest(base + lastClicked + "/");
        display($(this).find("a").data("id"));
        
    }

    /* init listeners for UI-elements */
    function initListeners(){
        $(".sidebar-item").click(onSidebarClick);
        
    }

    function init() {
        initOptions();
        initSecondOptions();
        initChartTypes();
        initCharts();
        initListeners(); 
        sidebarInit();
        
    }

    return {
        init: init
    };
}());
