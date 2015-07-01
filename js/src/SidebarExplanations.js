var explanationArray = [];
var currentIndex;


function display(param) {

  switch(param) {
        case "statusCode":
          currentIndex = 0;
        break;
        
        case "countByDays":
          currentIndex = 1;
        break;
        case "usernet":
          currentIndex = 2;
        break;
        case "trafficType":
          currentIndex = 3;
        break;
  }
    
  explanation = explanationArray[currentIndex];

  var vPool="";
        jQuery.each(explanation, function(i, val) {
          
          if (i == 0) {
              vPool += "<li class=" + "sidebar-brand-right" + "><a>" + val + "</a></li>"
          } else {
              vPool += "<li><a>" + val + "<br></a></li>";
          }
        });
    
    $('#sidebar-container').html(vPool);

}

function sidebarInit() {

  var explanation = Constants.EXPLANATION_STATUSCODES;
  explanationArray.push(explanation);
  explanation = Constants.EXPLANATION_TIMELINE;
  explanationArray.push(explanation);
  explanation = Constants.EXPLANATION_USERNET;
  explanationArray.push(explanation);
  explanation = Constants.EXPLANATION_TRAFFICTYPES;
  explanationArray.push(explanation);
       
}
