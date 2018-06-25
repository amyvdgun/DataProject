/**
* Amy van der Gun
* 10791760
*
* linechart.js
*
* Creates an interactive linechart using financial data.
*/

// set inner and outer width of svg
var margin = {top: 50, bottom: 75, left: 100, right: 100},
  width = 700 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

// initialize general variables
var line1,x,y;
var parseDate = d3.timeParse("%Y-%m-%d");
var bisectDate = d3.bisector(function(d) { return d.date; }).left;

function makeLinechart() {

  // add the SVG element and set characteristics
  var linechart = d3.select("#linechart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // set the range for x
  x = d3.scaleTime()
		.range([0, width]);

  // set the range for y
	y = d3.scaleLinear()
		.range([height, 0]);

  // create x-axis below plot
	var xAxis = d3.axisBottom(x).tickFormat(d3.timeFormat("%d/%m"));

	// create y-axis to the left of plot
	var yAxis = d3.axisLeft(y);

  // define first line
  line1 = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

  // // define second line
  // line2 = d3.line()
  //   .x(function(d) { return x(d.date); })
  //   .y(function(d) { return y(d.low); });
  //
  // // define third line
  // line3 = d3.line()
  //   .x(function(d) { return x(d.date); })
  //   .y(function(d) { return y(d.high); });

  // create new request variable
  var request = new XMLHttpRequest();

    // request stock data from Apple as default
    request.open("GET", "https://api.iextrading.com/1.0/stock/ba/chart/1m", false);
      request.onload = function () {

        // parse data into a json format
        alldata = JSON.parse(request.response);

        // make sure date variable really is a date to the computer
        alldata.forEach(function(d) {
          d.date = parseDate(d.date);
          });

          // set the domain for x and y based on the dataset
          x.domain(d3.extent(alldata, function(d) { return d.date; }));
          y.domain([d3.min(alldata, function(d) { return d.low; }),
            d3.max(alldata, function(d) { return d.high; })
            ]);

          // draw x-axis on desired position
          linechart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
              .call(xAxis)
                .selectAll("text")
                 .style("text-anchor", "end")
                 .attr("dx", "-.8em")
                 .attr("dy", ".15em")
                 .attr("transform", "rotate(-65)");

          // draw y-axis on desired position
          linechart.append("g")
            .attr("class", "y axis")
            .call(yAxis)

          // set axis label
          linechart.append("text")
              .attr("class", "label")
              .attr("transform", "rotate(-90)")
              .attr("x", 0)
              .attr("y", - 60)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Price per Share ($)");

          // add the line path
          linechart.append("path")
              .data([alldata])
              .attr("class", "line1")
              .attr("d", line1)
              .style("stroke", "green");

          // // add the line path
          // linechart.append("path")
          //     .data([alldata])
          //     .attr("class", "line2")
          //     .attr("d", line2)
          //     .style("stroke", "brown");
          //
          // // add the line path
          // linechart.append("path")
          //     .data([alldata])
          //     .attr("class", "line3")
          //     .attr("d", line3)
          //     .style("stroke", "yellow");

          var focus = linechart.append("g")
              .attr("class", "focus")
              .style("display", "none");

          focus.append("circle")
              .attr("r", 4.5);

          focus.append("text")
              .attr("x", 9)
              .attr("dy", ".35em");

          linechart.append("rect")
              .attr("class", "overlay")
              .attr("width", width)
              .attr("height", height)
              .attr("opacity", 0)
              .on("mouseover", function() { focus.style("display", null); })
              .on("mouseout", function() { focus.style("display", "none"); })
              .on("mousemove", mousemove);

          function mousemove() {
            var x0 = x.invert(d3.mouse(this)[0]),
                i = bisectDate(alldata, x0, 1),
                d0 = alldata[i - 1],
                d1 = alldata[i],
                d = x0 - d0.date > d1.date - x0 ? d1 : d0;
            focus.attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")");
            focus.select("text").text(d.close);
          }
      };
      request.send();
};

function updateLines(chosenFirm) {

    // select the linechart
    var chart = d3.select("#linechart").select("svg").select("g");

    // create new request variable
    var request = new XMLHttpRequest();

    // request stock data from the chosen firm clicked on the scatterplot
    request.open("GET", "https://api.iextrading.com/1.0/stock/"+chosenFirm+"/chart/1m", false);
      request.onload = function() {

        // parse all stats data into a json format
        alldata = JSON.parse(request.response);

        // make sure date variable really is a date to the computer
        alldata.forEach(function(d) {
          d.date = parseDate(d.date);
          });

        // set the new domain for y
        y.domain([d3.min(alldata, function(d) { return d.low; }),
            d3.max(alldata, function(d) { return d.high; })
            ]);

        // create y-axis to the left of plot
        var yAxis = d3.axisLeft(y);

        // call y axis and add transition
        d3.select(".y.axis")
             .transition()
             .duration(1000)
             .call(yAxis)

        // update line
        chart.selectAll(".line1")
          .data([alldata])
          .transition().duration(1000)
          .attr("d", line1)
          .style("stroke", "green");

        // // update line
        // chart.selectAll(".line2")
        //   .data([alldata])
        //   .transition().duration(1000)
        //   .attr("d", line2)
        //   .style("stroke", "brown");
        //
        // // update line
        // chart.selectAll(".line3")
        //   .data([alldata])
        //   .transition().duration(1000)
        //   .attr("d", line3)
        //   .style("stroke", "yellow");

        var focus = chart.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus.append("circle")
            .attr("r", 4.5);

        focus.append("text")
            .attr("x", 9)
            .attr("dy", ".35em");

        chart.append("rect")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            .attr("opacity", 0)
            .on("mouseover", function() { focus.style("display", null); })
            .on("mouseout", function() { focus.style("display", "none"); })
            .on("mousemove", mousemove);

        function mousemove() {
          var x0 = x.invert(d3.mouse(this)[0]),
              i = bisectDate(alldata, x0, 1),
              d0 = alldata[i - 1],
              d1 = alldata[i],
              d = x0 - d0.date > d1.date - x0 ? d1 : d0;
          focus.attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")");
          focus.select("text").text(d.close);
          }
        };
        request.send();
}
