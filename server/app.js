(function(){
    //in this case it returns a constructor
    var express = require("express");
    var server = express();
    var db = require("./MongoController.js");
    
    
    server.get("/timeline/*", function(req, res){
        db.testQuery(function(err, data){
            if (err){
                return res(err);
            }
            else{
                return res.json(data);
            }
        })
    });


    server.listen(3333);
    db.init();
    
    
}());