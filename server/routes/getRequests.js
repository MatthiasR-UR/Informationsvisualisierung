(function(){
	var db = require("../MongoController");
	var async = require("../node_modules/async");
	var toSend = [];
    var customRes = null;

	sendCustom = function(err){
        customRes.json(toSend);
        toSend = [];
    };  

	//returns all entries for a user with the id specified in the request
	findUserByID = function(req, res){
        db.get({userID: parseInt(req.params.userID)}, function(err, data){
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
                async.each(data, function(el, callback){
                    var query = {statusCode:el};
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

	init = function(){
		db.init();
	};

	module.exports.init = init;
	module.exports.findUserByID = findUserByID;
	module.exports.getStatusCodes = getStatusCodes;
    module.exports.getTrafficTypes = getTrafficTypes;

}());