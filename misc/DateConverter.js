(function(){
	var mongodb = require('mongodb');
	var assert = require('assert');
	var ObjectId = require('mongodb').ObjectID;
	var url = 'mongodb://localhost:27017/infovis';
	var coll = "rawdata";
	var MongoClient = mongodb.MongoClient;
	var db = null;
	var i = 0;

	testQuery = function(callback){
		db.collection("rawdata").find().forEach(function(el){
			i++;
			if(i % 100000 == 0){console.log(i/1000 + "k lines done");}
			el.date=new Date(el.date); 
			db.collection("rawdata").save(el)});
	};

	// Use connect method to connect to the Server
	init = function(){
		MongoClient.connect(url, function (err, base) {
			assert.equal(null, err);
			db = base;
		  	testQuery(db, function(){
		  	db.close();
		  	})
		});
	};

	module.exports.init = init;
	module.exports.testQuery = testQuery;

}());