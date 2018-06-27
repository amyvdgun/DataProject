/**
* Amy van der Gun
* 10791760
*
* candlestick.js
*
* Creates an interactive candlestick chart using financial data.
*
* Inspiration:
* http://bl.ocks.org/andredumas/27c4a333b0e0813e093d
*/

// set inner and outer width of svg
var marginCandle = {top: 50, bottom: 75, left: 100, right: 100},
  widthCandle = 700 - marginCandle.left - marginCandle.right,
  heightCandle = 600 - marginCandle.top - marginCandle.bottom;

// initialize general variables and function
var alldataCandle,candlestick,xCandle,yCandle;
var parseDate = d3.timeParse("%Y-%m-%d");
var bisectDate = d3.bisector(function(d) { return d.date; }).left;

function makeCandlestick() {

    // create new request variable
    var request = new XMLHttpRequest();

    // request stock data from Apple as default
    request.open("GET", "https://api.iextrading.com/1.0/stock/aapl/chart/1m", false);
    request.onload = function () {

        var chosenName = "Apple Inc.";

        // set interactive title with Apple as default
        document.getElementById("candlestickTitle").innerHTML =
            "High, Low, Open, Close for  " + chosenName;

        // parse data into a json format
        alldataCandle = JSON.parse(request.response);

        // create empty array to keep track of the amount of days
        var alldays = [];

        // make sure date variable really is a date to the computer
        alldataCandle.forEach(function(d) {
            d.date = parseDate(d.date);
            alldays.push(d.date);
        })

        // create x variable and set range
        xCandle = techan.scale.financetime()
            .range([0, widthCandle]);

        // create y variable and set range
        yCandle = d3.scaleLinear()
            .range([heightCandle, 0]);

        // create candlestick and scale x and y variables
        candlestick = techan.plot.candlestick()
            .xScale(xCandle)
            .yScale(yCandle);

        // create x axis
        var xAxisCandle = d3.axisBottom().tickFormat(d3.timeFormat("%d/%m"))
            .ticks(alldays.length)
            .scale(xCandle);

        // create y axis
        var yAxisCandle = d3.axisLeft()
            .scale(yCandle);

        // create the chart by selecting the svg
        var candlestickChart = d3.select("#candlestick").append("svg")
            .attr("width", widthCandle + marginCandle.left + marginCandle.right)
            .attr("height", heightCandle + marginCandle.top + marginCandle.bottom)
          .append("g")
            .attr("transform", "translate(" + marginCandle.left + ","
                + marginCandle.top + ")");

        // append g element to add the candlesticks to the chart
        candlestickChart.append("g")
            .attr("class", "candlestick");

        // append x axis
        candlestickChart.append("g")
            .attr("class", "x axis candle")
            .attr("transform", "translate(0," + heightCandle + ")");

        // set axis label
        candlestickChart.append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("x", 0)
            .attr("y", - 60)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Prices per Share ($)");

        // append y axis
        candlestickChart.append("g")
            .attr("class", "y axis candle")

        // create first rect of legend and append text
        var legend1 = candlestickChart.append("g")
            legend1.append("rect")
            .attr("x", 500)
            .attr("y", + 20)
            .attr("height", 10)
            .attr("width", 10)
            .style("fill", "red");

        legend1.append("text")
            .attr("id", "legend1")
            .attr("y", 30)
            .attr("x", 520)
            .text("Down ($)");

        // create second rect of legend and append text
        var legend2 = candlestickChart.append("g")
            legend2.append("rect")
            .attr("x", 500)
            .attr("y", 0)
            .attr("height", 10)
            .attr("width", 10)
            .style("fill", "green");

        legend2.append("text")
            .attr("id", "legend2")
            .attr("y", 10)
            .attr("x", 520)
            .text("Up ($)");

        // set domain of x and y variables
        xCandle.domain(alldays);
        yCandle.domain([d3.min(alldataCandle, function(d) { return d.low; }),
            d3.max(alldataCandle, function(d) { return d.high; })
            ]);

        // append the data to the candles of the chart
        candlestickChart.selectAll("g.candlestick")
            .datum(alldataCandle)
            .call(candlestick);

        // call x axis
        candlestickChart.selectAll("g.x.axis.candle").call(xAxisCandle)
          .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");

        // call y axis
        candlestickChart.selectAll("g.y.axis.candle").call(yAxisCandle);

        // create tooltip
        var tooltipDiv = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        // append rect to svg for functioning of tooltip
        candlestickChart.append('rect').attr('class', 'overlay')
            .attr('width', widthCandle).attr('height', heightCandle)

            // show tip when user hovers over the rect
            .on("mouseover", function() {
                tooltipDiv.style('opacity', 1);
                tooltipDiv.style("display", null);
            })
            .on("mouseout", function() {
                tooltipDiv.style('opacity', 0);
                tooltipDiv.style("display", "none");
            })
            .style('fill', 'none').style('pointer-events', 'all')

            // return the correct data when user hovers over the rect
            .on('mousemove', function() {
                var x0 = x.invert(d3.mouse(this)[0]),
                    i = bisectDate(alldataCandle, x0, 1),
                    d0 = alldataCandle[i-1],
                    d1 = alldataCandle[i],
                    d = x0 - d0.date > d1.date - x0 ? d1 : d0;

                tooltipDiv.style('left', d3.event.pageX+5+'px')
                    .style('top', d3.event.pageY-30+'px')
                    .html(function (alldataCandle) {
                        return ("High: "
                        + d.high + "<br>" + "Low: " + d.low + "<br>" + "Open: "
                        + d.open + "<br>" + "Close: " + d.close)});
            })
      }
      request.send();
}

function updateCandles(chosenFirm, chosenName) {

    // select the linechart
    var chartCandle = d3.select("#candlestick").select("svg").select("g");

    // create new request variable
    var request = new XMLHttpRequest();

    // create interactive title
    document.getElementById("candlestickTitle").innerHTML =
        "High, Low, Open, Close for  " + chosenName;

    // request stock data from the chosen firm clicked on the scatterplot
    request.open("GET", "https://api.iextrading.com/1.0/stock/" + chosenFirm
        + "/chart/1m", false);
    request.onload = function() {
        // parse all stats data into a json format
        alldataCandle = JSON.parse(request.response);

        // make sure date variable really is a date to the computer
        alldataCandle.forEach(function(d) {
            d.date = parseDate(d.date);
        })

        // set new domain for y variable
        yCandle.domain([d3.min(alldataCandle, function(d) { return d.low; }),
            d3.max(alldataCandle, function(d) { return d.high; })
            ]);

        // create y-axis to the left of plot
        var yAxisCandle = d3.axisLeft(yCandle);

        // call y axis and add transition
        d3.select(".y.axis.candle")
             .transition()
             .duration(1000)
             .call(yAxisCandle);

        // append the data to the candles of the chart
        chartCandle.selectAll(".candlestick")
            .datum(alldataCandle)
            .call(candlestick);
    }
    request.send();
}
