var App = App || {};

App.UserNetView = function(options){
    var links = [];
    var data, svg, force, tooltip, details;

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

    function initTooltip(){
        return d3.select(options.chartContainer)
            .append("div")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("background", "white")
            .style("visibility", "hidden");
    }

    function initDetails(){
        return d3.select(options.chartContainer)
            .append("div")
            .style("position", "aboslute")
            .style("z-index", "10")
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

    function isImage(s){
        if( s.indexOf(".gif") !== -1 || s.indexOf(".jpeg") !== -1
            || s.indexOf(".jpg") !== -1 || s.indexOf(".png") !== -1
            || s.indexOf(".svg") !== -1)
        {
                return true;
        }
        else{
            return false;
        }
    }

    /**
        TODO: more datatypes like office etc.
    */
    function isContent(s){
        if (s.indexOf(".pdf") !== -1){
            return true;
        }
        else{
            return false;
        }
    }

    function getFillColor(d){
        if(isImage(d.request)){
            return "mediumslateblue";
        }
        else if (isContent(d.request)){
            return "forestgreen";
        }
        else if(d.request.indexOf(/res/) !== -1){
            return "palevioletred";
        }
        else{
            return "white";
        }
    }

    function onItemClick(d){
        console.log(d);
    }

	function buildNetwork(){
        svg = initSVG();
        force = initForce();
        tooltip = initTooltip();
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
            .on("mouseover", function(d){return tooltip.text(d.request).style("visibility", "visible");})
            .on("mousemove", function(){return tooltip.style("top", (event.layerY-20)+"px").style("left",(event.layerX+20)+"px");})
            .on("mouseout", function(){return tooltip.style("visibility", "hidden");})
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
        Checks for every entry if referer = request and builds a link if so
    */
    function buildLinks(){
        for(var i = 0; i < data.length; i++){
            var current = data[i];
            for(var j = 0; j< data.length; j++){
                if(current.referer.indexOf(data[j].request) != -1){
                    links.push({
                        source: j,
                        target: i
                    });
                }
            }
        }
    }

    /**
        Resets all data for new network
    */
    function resetData(){
        svg.selectAll("*").remove();
        $(options.chartContainer).empty();
        links = [];
    }

	function setData(newData){
		data = newData;
        if(svg !== undefined){
            resetData();
        }
        buildLinks();
		buildNetwork();
	}

	return {
		setData: setData
	}
};

