var App = App || {};

App.Charts = (function () {
    "use strict";
    /* eslint-env browser, jquery  */
    var chartTypes = [];
    var charts = {};
    var options = {};
    var base = "http://localhost:3333/";
    var lastClicked;
    var $searchbar = $("#searchbar");

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
                case "trafficType":
                    charts[key] = new App.TrafficTypeView({
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
        $(options.chartContainer).empty();
        charts[lastClicked].setData(data);
    }

    /**
        Sends an Ajax-Request to the Node-JS-Server
    */
    function sendRequest(request){
        $.getJSON(request, onDataReturn);
    }

    function toggleSearchbar(){
        if(lastClicked == "usernet"){
            $searchbar.css("display", "block");
        }
        else{
            $searchbar.css("display", "none");
        }
    }

    /**
        saves the clicked element and connects to server on REST with data-id
    */
    function onSidebarClick(){
        lastClicked = $(this).find("a").data("id");
        toggleSearchbar();
        sendRequest(base + lastClicked + "/");
        display($(this).find("a").data("id"));
    }

    function onSearchClicked(event){
        event.preventDefault();
        var id = $searchbar.find("input").val();
        if($.isNumeric(id) && id != null && id != undefined){
            sendRequest(base + lastClicked + "/" + id);
        }
    }

    /* init listeners for UI-elements */
    function initListeners(){
        $(".sidebar-item").click(onSidebarClick);
        $("#searchbar button").click(onSearchClicked);
        $searchbar.keypress(function(e){
            if(e.which == 13){
                onSearchClicked(e);
            }
        })
        
    }

    function init() {
        initOptions();
        initChartTypes();
        initCharts();
        initListeners(); 
        sidebarInit();
        
    }

    return {
        init: init
    };
}());
