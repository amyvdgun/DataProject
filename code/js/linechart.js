/**
* Amy van der Gun
* 10791760
*
* linechart.js
*
* Creates an interactive linechart using financial data.
*
* Inspiration:
* https://bl.ocks.org/d3noob/402dd382a51a4f6eea487f9a35566de0
*/

// set inner and outer width of svg
var margin = {top: 50, bottom: 75, left: 100, right: 100},
    width = 700 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// initialize general variables and functions
var line1,x,y,alldata;
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

    // define first line
    line1 = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.close); });

    // create new request variable
    var request = new XMLHttpRequest();

    // request stock data from Apple as default
    request.open("GET", "https://api.iextrading.com/1.0/stock/aapl/chart/1m", false);
    request.onload = function () {

        var chosenName = "Apple Inc.";

        // create interactive title
        document.getElementById("linechartTitle").innerHTML = "Close prices for "
          + chosenName;

        // parse data into a json format
        alldata = JSON.parse(request.response);

        var alldays = [];

        // make sure date variable is a real date to the computer
        alldata.forEach(function(d) {
            d.date = parseDate(d.date);
            alldays.push(d.date);
        })

        // set the domain for x and y based on the dataset
        x.domain(d3.extent(alldata, function(d) { return d.date; }));
        y.domain([d3.min(alldata, function(d) { return d.low; }),
            d3.max(alldata, function(d) { return d.high; })
            ]);

        // create x axis below plot
      	var xAxis = d3.axisBottom(x).tickFormat(d3.timeFormat("%d/%m"));

      	// create y axis to the left of plot
      	var yAxis = d3.axisLeft(y);


        // draw x axis on desired position
        linechart.append("g")
            .attr("class", "x axis linechart")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
          .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");

        // draw y axis on desired position
        linechart.append("g")
            .attr("class", "y axis linechart")
            .call(yAxis);

        // set axis label
        linechart.append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("x", 0)
            .attr("y", - 60)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Close Price per Share ($)");

        // add the line path
        linechart.append("path")
            .data([alldata])
            .attr("class", "line1")
            .attr("d", line1)
            .style("stroke", "green");

        // create tooltip by appending g element
        var focus = linechart.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus.append("circle")
            .attr("r", 4.5);

        focus.append("text")
            .attr("x", 9)
            .attr("dy", ".35em");

        // display tooltip when user hovers over the line
        linechart.append("rect")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            .attr("opacity", 0)
            .on("mouseover", function() {
                focus.style("display", null); })
            .on("mouseout", function() {
                focus.style("display", "none"); })
            .on("mousemove", mousemove);

        function mousemove() {

            // determine the position of the mouse and select closest datapoints
            var x0 = x.invert(d3.mouse(this)[0]),
                i = bisectDate(alldata, x0, 1),
                d0 = alldata[i - 1],
                d1 = alldata[i],
                d = x0 - d0.date > d1.date - x0 ? d1 : d0;

            // display the date and close price when hovering over the line
            focus.attr("transform", "translate(" + x(d.date) + ","
              + y(d.close) + ")");
            focus.select("text").text(d.close);
        }
    }
    request.send();
}

function updateLines(chosenFirm, chosenName, chosenTime) {

    // select the linechart
    var chart = d3.select("#linechart").select("svg").select("g");

    // create interactive title
    document.getElementById("linechartTitle").innerHTML = "Close prices for "
      + chosenName;

    // create new request variable
    var request = new XMLHttpRequest();

    // request stock data from the chosen firm clicked on the scatterplot
    request.open("GET", "https://api.iextrading.com/1.0/stock/" + chosenFirm
      + "/chart/" + chosenTime, false);
    request.onload = function() {

        // parse all stats data into a json format
        alldata = JSON.parse(request.response);

        // make sure date variable is a real date to the computer
        alldata.forEach(function(d) {
            d.date = parseDate(d.date);
        })

        // set the new domain for x
        x.domain(d3.extent(alldata, function(d) { return d.date; }));

        // set the new domain for y
        y.domain([d3.min(alldata, function(d) { return d.low; }),
            d3.max(alldata, function(d) { return d.high; })
            ]);

        // create x-axis below plot
        var xAxis = d3.axisBottom(x).tickFormat(d3.timeFormat("%d/%m"));

        // create y-axis to the left of plot
        var yAxis = d3.axisLeft(y);

        // call x axis and add transition
        d3.select(".x.axis.linechart")
            .transition()
            .duration(1000)
            .call(xAxis)
          .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");

        // call y axis and add transition
        d3.select(".y.axis.linechart")
             .transition()
             .duration(1000)
             .call(yAxis);

        // update line
        chart.selectAll(".line1")
            .data([alldata])
            .transition().duration(1000)
            .attr("d", line1)
            .style("stroke", "green");
    }
    request.send();
}
