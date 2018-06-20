/**
* Amy van der Gun
* 10791760
*
* linechart.js
*
* Creates an interactive linechart using financial data.
*/

function makeLinechart() {

  var color = d3.scaleOrdinal(d3.schemeCategory10);

  // set the outer and inner width and height
  var margin = {top: 50, bottom: 50, left: 50, right: 50},
    width = 550 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

  // add the SVG element and set characteristics
  var linechart = d3.select("#linechart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var parseDate = d3.timeParse("%Y-%m-%d");
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
  var line1 = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

  var line2 = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.low); });

  var line3 = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.high); });

  // create new request variable
  var request = new XMLHttpRequest();

    // request all stats data from entire string consisting of all stocks
    request.open("GET", "https://api.iextrading.com/1.0/stock/aapl/chart/1m", false);
      request.onload = function () {

        // parse all stats data into a json format
        alldata = JSON.parse(request.response);

        alldata.forEach(function(d) {
          d.date = parseDate(d.date);
          });

          console.log(alldata);

          // set the domain for x and y based on the dataset
          x.domain(d3.extent(alldata, function(d) { return d.date; }));
          y.domain([d3.min(alldata, function(d) { return d.low; }),
            d3.max(alldata, function(d) { return d.high; })
            ]);

          // draw x-axis on desired position and set label
          linechart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
              .call(xAxis)

          // draw y-axis on desired position and set label
          linechart.append("g")
            .attr("class", "y axis")
            .call(yAxis)

          // set axes labels
          linechart.append("text")
              .attr("class", "label")
              .attr("transform", "rotate(-90)")
              .attr("x", 0)
              .attr("y", margin.left - 30)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Price per Share ($)");

          // Add the valueline path.
          linechart.append("path")
              .data([alldata])
              .attr("class", "line")
              .attr("d", line1);

          // Add the valueline path.
          linechart.append("path")
              .data([alldata])
              .attr("class", "line")
              .attr("d", line2);

          // Add the valueline path.
          linechart.append("path")
              .data([alldata])
              .attr("class", "line")
              .attr("d", line3);

      };
      request.send();

};
