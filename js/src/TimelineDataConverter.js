var App = App || {};

App.TimelineDataConverter = function(){

	function sortByKey(data, key){
		return data.sort(function(a, b){
			return a[key] - b[key];
		});
	}

	function convertDays(newData){
		newData = sortByKey(newData, "day");
		newData[newData.length-2].count += newData[newData.length-1].count;
		newData.pop()
		var data = ["Aufrufe"];
		for(var i = 0; i < newData.length; i++){
			data.push(newData[i].count);
		}
		return data;
	}

	function convertHours(newData){
		newData = sortByKey(newData, "hour");
		var data = ["Aufrufe"];
		for(var i = 0; i < newData.length; i++){
			data.push(newData[i].count);
		}
		return data;
	}

	return {
		convertDays: convertDays,
		convertHours: convertHours
	};
};