(function(){
    var express = require("express");
    //used to bypass cross-origin policies
    var cors = require("cors");
    var getRequests = require("./routes/getRequests");
    var server = express();

    server.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
        next();
    });


    /* start routes */
    server.get("/statusCode/*", getRequests.getStatusCodes);

    server.get("/userNet/:userID", getRequests.findUserByID);
    server.get("/userNet/*", getRequests.findUserByID);

    server.get("/countByDays/*", getRequests.getCountByDays);
    server.get("/countByHours/:day", getRequests.getCountByHours);
    /* ends routes */


    getRequests.init();
    server.use( cors() );
    server.listen(3333);
    console.log("Server running at localhost on port 3333");   
    
}());