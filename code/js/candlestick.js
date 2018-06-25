/**
* Amy van der Gun
* 10791760
*
* candlestick.js
*
* Creates interactive visualizations using financial data.
*/

function makeCandlestick() {

  // set inner and outer width of svg
  var margin = {top: 50, bottom: 75, left: 100, right: 100},
    width = 700 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

  var parseDate = d3.timeParse("%Y-%m-%d");

  // create new request variable
  var request = new XMLHttpRequest();

    // request stock data from Apple as default
    request.open("GET", "https://api.iextrading.com/1.0/stock/aapl/chart/1m", false);
      request.onload = function () {

        // parse data into a json format
        alldata = JSON.parse(request.response);

        var alldays = [];

        // make sure date variable really is a date to the computer
        alldata.forEach(function(d) {
          d.date = parseDate(d.date);
          alldays.push(d.date);
          });

          console.log(alldays);

        var x = techan.scale.financetime()
          .range([0, width]);

        var y = d3.scaleLinear()
          .range([height, 0]);

        var candlestick = techan.plot.candlestick()
          .xScale(x)
          .yScale(y);

        var xAxis = d3.axisBottom().tickFormat(d3.timeFormat("%d/%m")).ticks(alldays.length)
            .scale(x);

        var yAxis = d3.axisLeft()
            .scale(y);

        var candlestickChart = d3.select("#candlestick").append("svg")
           .attr("width", width + margin.left + margin.right)
           .attr("height", height + margin.top + margin.bottom)
           .append("g")
           .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        candlestickChart.append("g")
                .attr("class", "candlestick");

        candlestickChart.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")");

        candlestickChart.append("g")
                .attr("class", "y axis")
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                  .attr("dy", ".71em")
                  .style("text-anchor", "end")
                  .text("Price ($)");

                  x.domain(alldays);
                  console.log(d3.extent(alldata, function(d) { return d.date; }));
                  y.domain([d3.min(alldata, function(d) { return d.low; }),
                    d3.max(alldata, function(d) { return d.high; })
                    ]);
                  candlestickChart.selectAll("g.candlestick").datum(alldata).call(candlestick);
                  candlestickChart.selectAll("g.x.axis").call(xAxis)
                    .selectAll("text")
                     .style("text-anchor", "end")
                     .attr("dx", "-.8em")
                     .attr("dy", ".15em")
                     .attr("transform", "rotate(-65)");
                  candlestickChart.selectAll("g.y.axis").call(yAxis);



      };
      request.send();
};

function updateCandles(chosenFirm) {

    // select the linechart
    var chart = d3.select("#candlestick").select("svg").select("g");
    // create new request variable
    var request = new XMLHttpRequest();



    // request stock data from the chosen firm clicked on the scatterplot
    request.open("GET", "https://api.iextrading.com/1.0/stock/"+chosenFirm+"/chart/1m", false);
      request.onload = function() {



      };
      request.send();
};
