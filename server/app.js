(function(){
    //in this case it returns a constructor
    var express = require("express");
    var async = require("async");
    var cors = require("cors");
    var server = express();
    server.use(cors());
    var db = require("./MongoController.js");
    var toSend = [];
    var customRes = null;


    function sendCustom(err){
        customRes.json(toSend);
        toSend = [];
    };   

    
    server.get("/timeline/*", function(req, res, next){
        db.testQuery(function(err, data){
            if (err){
                return res(err);
            }
            else{
                return res.json(data);
            }
        });
    });

    server.get("/statusCode/*", function(req, res, next){
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
        })
    });


    server.listen(3333);
    db.init();
    
    
}());