var App = App || {};

App.PieController = function(options){
	"use strict";
	var data, options, chart;

	function init(){
		chart = c3.generate({
		bindto: options.chartContainer,
		data: {
			columns: [["code", 1]],
            keys: {
            	x: "code",
            	value: ["count"]
            },
        	type: 'pie'
        },
        axis: {
        	x:{
        		type: "category"
        	}
        },
        pie: {
        	label: {
            	format: function (value, ratio, id) {
             		return d3.format("^,")(value);
            	}
        	}
   	 	}/*,
   	 	tooltip: {
        	format: {
            	title: function (d) { return 'Code: ' + d; },
            	value: function (value, ratio, id) {
                	var format = id === 'data1' ? d3.format(',') : d3.format('#');
                	return format(value);
           	 	}
        	}
    	}*/
		});
	}

	function formatJSON(original){
		var toReturn = [];
		var tmp = [];

		for(var i = 0; i < original.length; i++){
			tmp.push(original[i].code);
			tmp.push(original[i].count);
			toReturn[i] = tmp;
			tmp = [];
		}

		return toReturn;
	}

	function updatePieChart(){
		chart.load({
		columns: data,
        	type: 'pie',
			unload: true
		});
	};

	function setData(newData){
		data = formatJSON(newData);
		updatePieChart();
	}

	return {
		init: init,
		setData: setData
	}
};