(function(){
	var db = require("../MongoController");
	var async = require("../node_modules/async");
	var toSend = [];
    var customRes = null;
    var days = [16,17,18,19,20,21,22,23];

	sendCustom = function(err){
        customRes.json(toSend);
        toSend = [];
    };  

	//returns all entries for a user with the id specified in the request
	findUserByID = function(req, res){
		var id = parseInt(req.params.userID) || 23;
        db.get({userID: id}, function(err, data){
            	return res.json(data);
        });
	};

	getStatusCodes = function(req, res){
        customRes = res;
        db.getDistinct("statusCode", function(err, data){
            if (err){
                return res(err);
            } 
            else{
                async.each(data, 
                    function(el, callback){
                        var query = {statusCode:el};
                        db.getCount(query, function(err, data){
                            var tmp = {};
                            tmp.code = el
                            tmp.count = data;
                            toSend.push(tmp);
                            callback();
                        });
                    }, 
                    sendCustom);
            }
        });
	};

    getCountByDays = function(req, res){
        customRes = res;
        async.each(days, 
            function(el, callback){
                if(el <= days[days.length-1]){
                    var lowerDate = new Date(2015,03, el,0,0,0,0);
                    var upperDate = new Date(2015,03,el+1,0,0,0,0);
                    var query = {date: {$gte: lowerDate, $lt:upperDate}};
                    db.getCount(query, function(err, data){
                        var tmp = {};
                        tmp.day = el;
                        tmp.count = data;
                        toSend.push(tmp);
                        callback();

                    })
                }

            },
            sendCustom);

    };
    
    getTrafficTypes = function(req, res){
        customRes = res;
        db.getDistinct("type", function(err, data){
            if (err){
                return res(err);
            } 
            else{
                async.each(data, function(el, callback){
                    var query = {type:el};
                    db.getCount(query, function(err, data){
                        var tmp = {};
                        tmp.code = el
                        tmp.count = data;
                        toSend.push(tmp);
                        callback();
                    });
                }, sendCustom);
            }
        });
	};

    
    getCountByHours = function(req, res){

    };


	init = function(){
		db.init();
	};

	module.exports.init = init;
	module.exports.findUserByID = findUserByID;
	module.exports.getStatusCodes = getStatusCodes;
    module.exports.getTrafficTypes = getTrafficTypes;
    module.exports.getCountByDays = getCountByDays;
    module.exports.getCountByHours = getCountByHours;


}());