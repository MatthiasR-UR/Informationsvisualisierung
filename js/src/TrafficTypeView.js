var App = App || {};

App.TrafficTypeView = function (options, secondOptions) {
    "use strict";
    var data, chart, secondChart;

    /**
    	Right now I don't know how to prevent the default behaviour of legendhover
    */
    function onLegendHover(id) {
        //chart.focus(id);
        //chart.tooltip.show(id);
        //chart.legend.show(id);
    }


    function onDataClick(d, element) {
        chart.unselect([d.id]);
        chart.hide(d.id);
    }

    function formatJSON(original) {
        var toReturn = [];
        var tmp = [];

        for (var i = 0; i < original.length; i++) {
            tmp.push(original[i].code);
            tmp.push(original[i].count);
            toReturn[i] = tmp;
            tmp = [];
        }

        return toReturn;
    }

    /**
    	not used right now. Probably cannot use
    	since we don't know which chart is active
    */
    function updatePieChart() {
        chart.load({
            columns: data,
            type: 'pie',
            unload: true
        });
    };

    function setData(newData) {
        console.log("setting Data: " + formatJSON(newData));
        data = formatJSON(newData);

        initChart();
    }

    function initChart() {

        chart = c3.generate({
            bindto: options.chartContainer,
            data: {
                columns: data,
                keys: {
                    x: "code",
                    value: ["count"]
                },
                type: 'pie',
                onclick: onDataClick
            },
            color: {
                pattern: ['rgb(255, 127, 14)', 'rgb(31, 119, 180)', 'rgb(44, 160, 44)', 'rgb(214, 39, 40)']
            },
            axis: {
                x: {
                    type: "category"
                }
            },
            pie: {
                label: {
                    format: function (value, ratio, id) {
                        return d3.format("^,")(value);
                    }
                }
            },
            legend: {
                position: "right",
                item: {
                    onmouseover: onLegendHover
                }
            }
        });
        $('#chart').prepend("<h2>Häufigkeitsverteilung der Zugriffsarten</h2>");

        console.log("first generate secondChart");
        /* Display the second chart */
        secondChart = c3.generate({

            bindto: secondOptions.chartContainer,
            data: {
                x: 'x',
                columns: Constants.externalStaticAccessData,
                groups: [
                    []
                ],
                type: 'bar'
            },
            colors: {
                External: '#ff0000',
            },

            axis: {
                x: {
                    type: 'category' // this needed to load string x value
                }
            }
        });
        secondChart.data.colors({
            External: Constants.externalStaticAccessColorPattern,
        });

        $('#secondChart').css("visibility", "visible");

        $('#secondChart').prepend("<select id='selectTrafficType' class='form-control'><option>Show external traffic</option><option>Show internal traffic</option><option>Show wifi traffic</option><option>Show VPN traffic</option></select> ");
        $('#secondChart').prepend("<h2>Top 10 der aufgerufenen Resourcen</h2>");
        $(function () {
            $('#secondChart').append($("<div>").load('./res/templates/trafficTypes.html'));
        });
        $('#selectTrafficType').on('change', function () {
            var selected = $(this).find("option:selected").val();

            switch (selected) {

                case "Show external traffic":

                    secondChart.load({
                        columns: Constants.externalStaticAccessData,
                        colors: {
                            External: Constants.externalStaticAccessColorPattern,
                        },
                        unload: secondChart.columns,

                    });


                    break;

                case "Show internal traffic":

                    secondChart.load({
                        columns: Constants.clanStaticAccessData,
                        colors: {
                            Clan: 'rgb(44, 160, 44)',
                        },
                        unload: true,
                    });
                    break;

                case "Show wifi traffic":

                    secondChart.load({
                        columns: Constants.wifiStaticAccessData,
                        colors: {
                            Wifi: 'rgb(31, 119, 180)',
                        },
                        unload: secondChart.columns,
                    });

                    break;

                case "Show VPN traffic":

                    secondChart.load({
                        columns: Constants.vpnStaticAccessData,
                        colors: {
                            Vpn: 'rgb(255, 127, 14)',
                        },
                        unload: secondChart.columns,
                    });

                    break;

            }

        });


    }


    return {
        setData: setData
    }
};