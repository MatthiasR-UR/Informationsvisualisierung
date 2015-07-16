var App = App || {};

App.TimelineView = function(options){
	var chart, xAxis, yAxis;
	var data = [];
	var dates = [16,17,18,19,20,21,22];
	var weekday = {	16: "Donnerstag", 17: "Freitag", 18: "Samstag", 
					19: "Sonntag", 20: "Montag", 21: "Dienstag", 22: "Mittwoch"};
	var showHourChart = false;


	/**
		Initiates new request to get view for hours of chosen day
	*/
	function onBarClick(d, element){
			showHourChart = true;
			$(App.TimelineView).trigger("barClick", [dates[d.index]]);
	}

	function initDayChart(){
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
    				categories: dates,
    				label: {
    					text: "Tag",
    					position: "outer-center"
    				}   				
    			},
    			y:{
    				label: "Aufrufe"
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
            		title: function (d) { return weekday[dates[d]] + " der " + dates[d] + ".4.2015"; }
        		}
    		}
		});
	}

	function initHourChart(){
		chart = c3.generate({
			bindto: options.chartContainer,
    		data: {
        		columns: [data],
    		},
    		axis:{
    			x:{
    				type:"category",
    				label: {
    					text: "Stunde",
    					position: "outer-center"
    				}
    			},
    			y:{
    				label: "Aufrufe"
    			}
    		},
    		legend:{
    			hide:true
    		},
    		tooltip: {
        		format: {
            		title: function (d) { return d + " Uhr"; }
        		}
    		}
		});
	}

	function setData(newData){
		if(showHourChart === false){
			data = App.TimelineDataConverter().convertDays(newData);
			initDayChart();
		}
		else{
			data = App.TimelineDataConverter().convertHours(newData);
			initHourChart();
			showHourChart = false;
		}
	}


	return {
		setData: setData
	}
};