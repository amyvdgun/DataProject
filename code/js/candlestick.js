/**
* Amy van der Gun
* 10791760
*
* candlestick.js
*
* Creates interactive visualizations using financial data.
*/

// execute function when DOM is loaded
window.onload = function () {

  // set the outer and inner width and height
  var margin = {top: 50, bottom: 50, left: 50, right: 50},
    width = 1100 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

  var parseDate = d3.timeParse("%d-%b-%y");

  var x = techan.scale.financetime()
          .range([0, width]);

  var y = d3.scaleLinear()
          .range([height, 0]);

  var candlestick = techan.plot.candlestick()
          .xScale(x)
          .yScale(y);

  var xAxis = d3.axisBottom()
          .scale(x);

  var yAxis = d3.axisLeft()
          .scale(y);

  var svg = d3.select("#candlestick").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // create new request variable
  var request = new XMLHttpRequest();

    // request all stats data from entire string consisting of all stocks
    request.open("GET", "https://api.iextrading.com/1.0/stock/aapl/chart/6m", false);
    request.onload = function () {

        // parse all data into a json format
        var alldata = JSON.parse(request.response);
        console.log(alldata);

        var accessor = candlestick.accessor();


    };
    request.send();
    //
    // d3.csv("data.csv", function(error, data) {
    //         var accessor = candlestick.accessor();
    //
    //         data = data.slice(0, 200).map(function(d) {
    //             return {
    //                 date: parseDate(d.Date),
    //                 open: +d.Open,
    //                 high: +d.High,
    //                 low: +d.Low,
    //                 close: +d.Close,
    //                 volume: +d.Volume
    //             };
    //         }).sort(function(a, b) { return d3.ascending(accessor.d(a), accessor.d(b)); });
    //
    //         svg.append("g")
    //                 .attr("class", "candlestick");
    //
    //         svg.append("g")
    //                 .attr("class", "x axis")
    //                 .attr("transform", "translate(0," + height + ")");
    //
    //         svg.append("g")
    //                 .attr("class", "y axis")
    //                 .append("text")
    //                 .attr("transform", "rotate(-90)")
    //                 .attr("y", 6)
    //                 .attr("dy", ".71em")
    //                 .style("text-anchor", "end")
    //                 .text("Price ($)");
    //
    //         // Data to display initially
    //         draw(data.slice(0, data.length-20));
    //         // Only want this button to be active if the data has loaded
    //         d3.select("button").on("click", function() { draw(data); }).style("display", "inline");
    //     });
    //
    //     function draw(data) {
    //         x.domain(data.map(candlestick.accessor().d));
    //         y.domain(techan.scale.plot.ohlc(data, candlestick.accessor()).domain());
    //
    //         svg.selectAll("g.candlestick").datum(data).call(candlestick);
    //         svg.selectAll("g.x.axis").call(xAxis);
    //         svg.selectAll("g.y.axis").call(yAxis);
    //     }
};