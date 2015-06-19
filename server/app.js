(function(){
    //in this case it returns a constructor
    var express = require("express");
    var server = express();
    
    function getDataById(id) {
        return{
            id: id,
            data: "Hello World"
        }
    }
    
    server.get("/get/id", function(req, res){
        res.send("Hello World!");    
    });
    
    server.get("/get/data/*", function(req, res){
        /*var id = req.params[0];
        var result = getDataById(id);
        res.send(result); */
        /* Data to send here */
    })
    
    server.listen(3333);
    
    console.log("Hello World");
    
    
}());