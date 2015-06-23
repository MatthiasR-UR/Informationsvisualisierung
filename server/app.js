(function(){
    //in this case it returns a constructor
    var express = require("express");
    var async = require("async");
    var server = express();
    var db = require("./MongoController.js");
    var toSend = [];
    var customRes = null;

    function sendCustom(err){
        customRes.json(toSend);
    };
    
    
    server.get("/timeline/*", function(req, res){
        db.testQuery(function(err, data){
            if (err){
                return res(err);
            }
            else{
                return res.json(data);
            }
        });
    });

    server.get("/statusCode*", function(req, res){
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
                        tmp[el] = data;
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