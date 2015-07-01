(function(){
    var express = require("express");
    //used to bypass cross-origin policies
    var cors = require("cors");
    var getRequests = require("./routes/getRequests");
    var server = express();


    /* start routes */
    server.get("/statusCode/*", getRequests.getStatusCodes);
    
    server.get("/trafficType/*", getRequests.getTrafficTypes);

    server.get("/user/:userID", getRequests.findUserByID);
    /* ends routes */


    getRequests.init();
    server.use( cors() );
    server.listen(3333);
    console.log("Server running at localhost on port 3333");   
    
}());