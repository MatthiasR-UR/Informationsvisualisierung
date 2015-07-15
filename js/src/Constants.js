Constants = {
    EXPLANATION_STATUSCODES : [
    "Bedeutungen der Statusklassen:",
        
    "<strong>• 2xx – Erfolgreiche Operation</strong></br>Die Anfrage war erfolgreich, die Antwort kann verwertet            werden.</br><strong><span style='color: rgb(31, 119, 180)'>zB. 200:</span></strong> Alles OK. ",
        
    "<strong>• 3xx – Umleitung</strong></br>Um eine erfolgreiche Bearbeitung der Anfrage sicherzustellen, sind weitere      Schritte seitens des Clients erforderlich.</br><strong><span style='color: rgb(148, 103, 189)'>zB. 304:</span>          </strong> Die angeforderte Ressource ist bereits im Cache und wird nicht übertragen. ",
        
    "<strong>• 4xx – Client-Fehler</strong></br>Die Ursache des Scheiterns der Anfrage liegt (eher) im                      Verantwortungsbereich des Clients.</br><strong><span style='color: rgb(127, 127, 127)'>zB. 404:</span></strong>        Die angeforderte Ressource wurde nicht gefunden (zB Tote Links). ",
        
    "<strong>• 5xx – Server-Fehler</strong></br>Die Ursache des Scheiterns der Anfrage liegt eher im                        Verantwortungsbereich des Servers.",
    ],
    
    EXPLANATION_TIMELINE : [
    "Tagesansicht:",
    "Zeigt die Anzahl der Aufrufe für jeden Tag. Ein Klick auf einen der Balken zeigt eine Detailansicht der jeweiligen Tages"
    ],
    
    EXPLANATION_USERNET : [
    "Usernet: Anmerkungen",
    "test2",
    "test3",
    "test4"
    ],
    
    EXPLANATION_TRAFFICTYPES : [
    "Traffic Types: Anmerkungen",
    
    "<strong>• <span style='color: rgb(214, 39, 40)'>external:</span></strong></br>Zugriffe von außerhalb des Universitätsnetzwerkes.",
        
    "<strong>• <span style='color: rgb(44, 160, 44)'>clan:</span></strong></br>Zugriffe von innerhalb des Universitätsnetzwerkes über stationäre Rechner.",
        
    "<strong>• <span style='color: rgb(31, 119, 180)'>wifi:</span></strong></br>Zugriffe von innerhalb des Universitätsnetzwerkes über wifi.</br></br><strong> Mögliche Erklärung des geringen Anteils:</strong></br>Studenten gehen mit Ihren Laptops/Smartphones eher auf LSF/GRIPS und kaum auf die Startseite/Lehrstuhlseiten.",
    
    
    "<strong>• <span style='color: rgb(255, 127, 14)'>vpn:</span></strong></br>Zugriffe von innerhalb/außerhalb des Universitätsnetzwerkes über VPN.",
    ],
    
    opts : {
              lines: 13 // The number of lines to draw
            , length: 28 // The length of each line
            , width: 12 // The line thickness
            , radius: 42 // The radius of the inner circle
            , scale: 0.55 // Scales overall size of the spinner
            , corners: 1 // Corner roundness (0..1)
            , color: '#000' // #rgb or #rrggbb or array of colors
            , opacity: 0.25 // Opacity of the lines
            , rotate: 0 // The rotation offset
            , direction: 1 // 1: clockwise, -1: counterclockwise
            , speed: 1 // Rounds per second
            , trail: 60 // Afterglow percentage
            , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
            , zIndex: 2e9 // The z-index (defaults to 2000000000)
            , className: 'spinner' // The CSS class to assign to the spinner
            , top: '170px' // Top position relative to parent
            , left: '50%' // Left position relative to parent
            , shadow: true // Whether to render a shadow
            , hwaccel: false // Whether to use hardware acceleration
            , position: 'absolute' // Element positioning
            }
   
}

