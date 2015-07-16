var App = App || {};

App.UserNetDataConverter = function(){

	function isImage(s){
        if( s.indexOf(".gif") !== -1 || s.indexOf(".jpeg") !== -1
            || s.indexOf(".jpg") !== -1 || s.indexOf(".png") !== -1
            || s.indexOf(".svg") !== -1 || s.indexOf(".ico") !== -1)
        {
                return true;
        }
        else{
            return false;
        }
    }

    function isContent(s){
        if (s.indexOf(".pdf") !== -1){
            return true;
        }
        else{
            return false;
        }
    }

    function isRelevant(d){
        if(d.request.indexOf(".php") !== -1){
            return "page";
        }
        if(isImage(d.request)){
            return "irrelevant";
        }
        else if (isContent(d.request)){
            return "content";
        }
        else if(d.request.indexOf(".js") !== -1){
            return "irrelevant";
        }
        else if(d.request.indexOf(".css") !== -1){
            return "irrelevant";
        }
        else{
            return "page";
        }
    }

    /**
    	Returns an array containing only the important entries
    	delests js, css, images etc.
   	*/
	convert = function(input){
		var output = [];

		for(var i = 0; i < input.length; i++){
			switch( isRelevant(input[i])){
				case "irrelevant":
                    /*input[i].netClass = "irrelevant";
                    output.push(input[i]);*/
					break;
				case "page":
					input[i].netClass = "page";
					output.push(input[i]);
					break;
				case "content":
					input[i].netClass = "content";
					output.push(input[i]);
					break;
			}
		}

		return output;
	}

	/**
        Checks for every entry if referer = request and builds a link if so
    */
	buildLinks = function(data){
		var output = [];
		for(var i = 0; i < data.length; i++){
            var current = data[i];
            if(current.referer === undefined ) {continue;}
            for(var j = 0; j < data.length; j++){
                if(current.referer.indexOf(data[j].request) != -1){
                    output.push({
                        source: j,
                        target: i
                    });
                }
            }
        }

		return output;
	}

	return {
		convert: convert,
		buildLinks: buildLinks
	};
};