(function(){
	var mongodb = require('mongodb');
	var assert = require('assert');
	var ObjectId = require('mongodb').ObjectID;
	var url = 'mongodb://localhost:27017/infovis';
	var coll = "rawdata";
	var MongoClient = mongodb.MongoClient;
	var db = null;

	testQuery = function(callback){
		var result = [];
		var cursor = db.collection(coll).find({"userID":14588}).toArray(callback);
		
	};

	// Use connect method to connect to the Server
	init = function(){
		MongoClient.connect(url, function (err, base) {
			assert.equal(null, err);
			db = base;
		  	/*testQuery(db, function(){
		  	db.close();
		  	})*/
		});
	};

	module.exports.init = init;
	module.exports.testQuery = testQuery;

}());