/**
* Amy van der Gun
* 10791760
*
* linechart.js
*
* Creates an interactive linechart using financial data.
*/

// first load data from 2016
window.onload = function() {

  var color = d3.scaleOrdinal(d3.schemeCategory10);

  // set the outer and inner width and height
  var margin = {top: 50, bottom: 50, left: 50, right: 50},
    width = 1100 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

  // add the SVG element and set characteristics
  var linechart = d3.select("#linechart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var parseDate = d3.timeFormat("%Y%m%d").parse;

  var x = d3.scaleTime()
		.range([0, width]);

  // set the range for y
	var y = d3.scaleLinear()
		.range([height, 0]);

    var color = d3.scaleOrdinal(d3.schemeCategory10);

  // create x-axis below plot
	var xAxis = d3.axisBottom(x);

	// create y-axis to the left of plot
	var yAxis = d3.axisLeft(y);

  // define the line
  var line = d3.line()
    .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

  // create new request variable
  var request = new XMLHttpRequest();

    // request all stats data from entire string consisting of all stocks
    request.open("GET", "https://api.iextrading.com/1.0/stock/aapl/chart/1m", false);
      request.onload = function () {

        // parse all stats data into a json format
        alldata = JSON.parse(request.response);

        console.log(alldata);



      };
      request.send();

};
