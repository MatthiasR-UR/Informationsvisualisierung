var App = App || {};

App.TimelineView = function(options){
	var chart, data, xAxis, yAxis;

	function formatData(){
		for(var i = 0; i < data.length; i++){
			var tmp = {};
			tmp.x = data[i].day;
			tmp.y = data[i].count;
			data[i] = tmp;
		}
		data.sort(function(a,b){
			return a.x - b.x;
		})
	}

	function initChart(){
		var chart = new Rickshaw.Graph({
			element: options.chartContainer,
			width: options.width,
			height: options.height,
			series: [{
				color: "steelblue",
				data: data
			}]
		});
		xAxis = new Rickshaw.Graph.Axis.X({});
		chart.render();
	}

	function setData(newData){
		data = newData;
		formatData();
		initChart();
	}


	return {
		setData: setData
	}
};