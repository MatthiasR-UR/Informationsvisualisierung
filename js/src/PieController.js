var App = App || {};

App.PieController = function(options){
	"use strict";
	/*var chart = c3.generate({
		bindto:options.chartContainer,
		data: {
			columns: [
	            ['data1', 30],
	            ['data2', 120],
	        ],
        	type : 'pie'
        }
	});*/

	function renderPieChart(){
		console.log("rendering");
	}

	return {
		renderPieChart: renderPieChart
	}
};