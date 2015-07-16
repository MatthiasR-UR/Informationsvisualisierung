var App = App || {};

App.UserNetView = function(options){
    var links = [];
    var data = [];
    var svg, force, tooltip, details;

    function initSVG(){
        return d3.select(options.chartContainer)
            .append("svg")
            .attr("width", options.width)
            .attr("height", options.height)
            .call(d3.behavior.zoom().on("zoom", function () {
                svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
            }))
            .append("g");
    }

    function initForce(){
        return d3.layout.force().
            gravity(.05)
            .distance(100)
            .charge(-100)
            .size([options.width, options.height]);
    }

    /**
        creates an invisible div for tooltip 
    */
    function initTooltip(){
        tooltip = d3.select(options.chartContainer).append("div").attr("class", "netTooltip");
        tooltip.append("div").attr("class", "ttRequest ttLine");
        tooltip.append("div").attr("class", "ttDate ttLine");
        tooltip.append("div").attr("class", "ttStatus ttLine");
        tooltip.append("div").attr("class", "ttType ttLine");
        tooltip.append("div").attr("class", "ttReferrer ttLine");
        tooltip.append("div").attr("class", "ttAgent ttLine");
        //clickListener to hide tooltip when clicked anywhere in diagram
        $(options.chartContainer).click(function(){
            tooltip.style('display', 'none');
        }); 
    }

    /**
        
    */
    function initDetails(){
        return d3.select(options.chartContainer)
            .append("div")
            .style("position", "aboslute")
            .style("z-index", "9")
            .style("background", "white")
            .style("visibility", "hidden");
    }

    function getStrokeColor(d){
        switch(d.type){
            case "external":
                return "chocolate";
            case "vpn":
                return "mediumvioletred";
            case "wifi":
                return "lightcyan";
            case "clan":
                return "greenyellow";
            default:
                return "white";
        }
    }

    function getFillColor(d){
        if(d.netClass == "content"){
            return "forestgreen";
        }
        else{
            return "white";
        }
    }

    /**
        Fills tooltips with informations of current item and shows it
    */
    function onItemClick(d){
        event.stopPropagation();
        tooltip.select('.ttRequest').html("<strong>Request: </strong>" + d.request);
        tooltip.select('.ttDate').html("<strong>Datum: </strong>" + d.date);
        tooltip.select('.ttStatus').html("<strong>Statuscode: </strong>" + d.statusCode);
        tooltip.select(".ttType").html("<strong>Verbindung: </strong>" + d.type);
        tooltip.select(".ttReferrer").html("<strong>Referrer: </strong>" + d.referer);
        tooltip.select(".ttAgent").html("<strong>Agent: </strong>" + d.agent);
        tooltip.style('display', 'block');     
    }

	function buildNetwork(){
        svg = initSVG();
        force = initForce();
        initTooltip();
        details = initDetails();

        force.nodes(data).links(links).start();

        var link = svg.selectAll(".link").data(links)
            .enter().append("line")
            .attr("class", "link")
            .style("stroke-width", 1);

        var node = svg.selectAll(".node")
            .data(data)
            .enter().append("g")
            .attr("class", "node")
            .on("mouseover", function(d){return details.text(d.request).style("visibility", "visible");})
            .on("mousemove", function(){return details.style("top", (event.layerY-20)+"px").style("left",(event.layerX+20)+"px");})
            .on("mouseout", function(){return details.style("visibility", "hidden");})
            .on("click", onItemClick);

        node.append("circle")
            .attr("r","10")
            .style("stroke-width", ".15em")
            .style("stroke", getStrokeColor)
            .style("fill", getFillColor);

        force.on("tick", function() {
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
            node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        });
    };

    /**
        Resets all data for new network
    */
    function resetData(){
        svg.selectAll("*").remove();
        $(options.chartContainer).empty();
        links = [];
        data = [];
    }

	function setData(newData){
        if(svg !== undefined){
            resetData();
        }
		data = App.UserNetDataConverter().convert(newData);
        links = App.UserNetDataConverter().buildLinks(data);
		buildNetwork();
	}

	return {
		setData: setData
	}
};

