/**
* Amy van der Gun
* 10791760
*
* candlestick.js
*
* Creates interactive visualizations using financial data.
*/

// set inner and outer width of svg
var marginCandle = {top: 50, bottom: 75, left: 100, right: 100},
  widthCandle = 700 - marginCandle.left - marginCandle.right,
  heightCandle = 600 - marginCandle.top - marginCandle.bottom;

var alldataCandle,candlestick,xCandle,yCandle;

var parseDate = d3.timeParse("%Y-%m-%d");

function makeCandlestick() {

  // create new request variable
  var request = new XMLHttpRequest();

    // request stock data from Apple as default
    request.open("GET", "https://api.iextrading.com/1.0/stock/aapl/chart/1m", false);
      request.onload = function () {

        var chosenName = "Apple Inc.";

        document.getElementById("candlestickTitle").innerHTML = "High, Low, Open, Close for  " + chosenName;

        // parse data into a json format
        alldataCandle = JSON.parse(request.response);

        var alldays = [];

        // make sure date variable really is a date to the computer
        alldataCandle.forEach(function(d) {
          d.date = parseDate(d.date);
          alldays.push(d.date);
          });

        xCandle = techan.scale.financetime()
          .range([0, widthCandle]);

        yCandle = d3.scaleLinear()
          .range([heightCandle, 0]);

        candlestick = techan.plot.candlestick()
          .xScale(xCandle)
          .yScale(yCandle);

        var xAxisCandle = d3.axisBottom().tickFormat(d3.timeFormat("%d/%m")).ticks(alldays.length)
            .scale(xCandle);

        var yAxisCandle = d3.axisLeft()
            .scale(yCandle);

        var candlestickChart = d3.select("#candlestick").append("svg")
           .attr("width", widthCandle + marginCandle.left + marginCandle.right)
           .attr("height", heightCandle + marginCandle.top + marginCandle.bottom)
           .append("g")
           .attr("transform", "translate(" + marginCandle.left + "," + marginCandle.top + ")");

        candlestickChart.append("g")
            .attr("class", "candlestick");

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

        candlestickChart.append("g")
                .attr("class", "y axis candle")
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                  .attr("dy", ".71em")
                  .style("text-anchor", "end")
                  .text("Price ($)");

          let superX = 400;

          var superG = candlestickChart.append("g")
            superG.append("rect")
            .attr("x", superX)
            .attr("y", 0)
            .attr("height", 20)
            .attr("width", 20)
            .style("fill", "red")

          superG.append("text")
            .attr("y", 0)
            .attr("x", superX + 30)
            .text("htest")

          xCandle.domain(alldays);
          yCandle.domain([d3.min(alldataCandle, function(d) { return d.low; }),
            d3.max(alldataCandle, function(d) { return d.high; })
            ]);

          candlestickChart.selectAll("g.candlestick").datum(alldataCandle).call(candlestick);

          candlestickChart.selectAll("g.x.axis.candle").call(xAxisCandle)
            .selectAll("text")
             .style("text-anchor", "end")
             .attr("dx", "-.8em")
             .attr("dy", ".15em")
             .attr("transform", "rotate(-65)");
          candlestickChart.selectAll("g.y.axis.candle").call(yAxisCandle);
      };
      request.send();
};

function updateCandles(chosenFirm, chosenName) {

    // select the linechart
    var chartCandle = d3.select("#candlestick").select("svg").select("g");

    // create new request variable
    var request = new XMLHttpRequest();

    // create interactive title
    document.getElementById("candlestickTitle").innerHTML = "High, Low, Open, Close for  " + chosenName;

    // request stock data from the chosen firm clicked on the scatterplot
    request.open("GET", "https://api.iextrading.com/1.0/stock/"+chosenFirm+"/chart/1m", false);
      request.onload = function() {
        // parse all stats data into a json format
        alldataCandle = JSON.parse(request.response);

        // make sure date variable really is a date to the computer
        alldataCandle.forEach(function(d) {
          d.date = parseDate(d.date);
          });

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

        chartCandle.selectAll(".candlestick").datum(alldataCandle).call(candlestick);

      };
      request.send();
};
