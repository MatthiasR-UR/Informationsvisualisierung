var App = App || {};

App.TimelineView = function(options){
	var chart, xAxis, yAxis;
	var data = [];
	var dates = [16,17,18,19,20,21,22];


	/**
		Initiates new request to get view for hours of chosen day
	*/
	function onBarClick(d, element){
		$(App.TimelineView).trigger("barClick", [dates[d.index]]);
	}

	/**
		Converts the data received from server to the format needed for C3
	*/
	function formatData(newData){
		newData.sort(function(a,b){
			return a.day - b.day;
		});
		newData[newData.length-2].count += newData[newData.length-1].count;
		newData.pop()
		data = ["Aufrufe"];
		for(var i = 0; i < newData.length; i++){
			data.push(newData[i].count);
		}
		return data;
	}

	function initChart(){
		chart = c3.generate({
			bindto: options.chartContainer,
    		data: {
        		columns: [data],
        		type: 'bar',
        		onclick: onBarClick
    		},
    		axis:{
    			x:{
    				type:"category",
    				categories: dates
    				
    			}
    		},
    		bar: {
        		width: {
            		ratio: 0.75
        		}
    		},
    		legend:{
    			hide:true
    		},
    		tooltip: {
        		format: {
            		title: function (d) { return dates[d] + ".4.2015"; }
        		}
    		}
		});
	}

	function setData(newData){
		data = formatData(newData);
		initChart();
	}


	return {
		setData: setData
	}
};