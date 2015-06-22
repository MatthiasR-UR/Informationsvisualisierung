var App = App || {};

App.ChartController = function (options) {
   /* "use strict";
    /* eslint-env browser, jquery */
    /* global d3 

    var margin = {
            top: 20,
            right: 30,
            bottom: 30,
            left: 40
        },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    
    
    function renderChart(data){
        var y = d3.scale.linear().range([height, 0]);
        var x = d3.scale.ordinal().rangeRoundBands([0, width]);
        
        var xAxis = d3.svg.axis().scale(x).orient("bottom");
        var yAxis = d3.svg.axis().scale(y).orient("left");
        
        var chart = d3.select(options.chartContainer)
            .attr("width", width)
            .attr("height", height);
        
        x.domain(data.d3.map(function(d){
            return d.day;
        }));
        
        y.domain([0, d3.max(data, function(d){
            return d.customers;
        })]);
        
        chart.append("g").attr("class", "x axis")
        .attr("transform", "translate(0," + height +")")
        
    }
    
    function getData(){
        //everything strings without second callback
        d3.csv(options.dataURL,function(d){
            return {
                day: d.day,
                customers: parseInt(d.customers)
            }
        }, renderChart);
    }

    function renderBarChart() {
        getData();
    }

    return {
        renderBarChart: renderBarChart
    };
    */
};
