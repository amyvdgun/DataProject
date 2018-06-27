/**
* Amy van der Gun
* 10791760
*
* scatter.js
*
* Creates an interactive scatter plot using financial data.
*
* Inspiration:
* https://bl.ocks.org/aleereza/d2be3d62a09360a770b79f4e5527eea8
* https://bl.ocks.org/EfratVil/d956f19f2e56a05c31fb6583beccfda7
*/

function makeScatterplot() {

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    // set the outer and inner width and height
    var margin = {top: 50, bottom: 75, left: 100, right: 100},
        width = 1200 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    // add the SVG element and set characteristics
    var scatterplot = d3.select("#scatterplot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + 100 + "," + 50 + ")");

    // add the tooltip and its content
    var tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-10, 0])
        .html(function (d) {
            return (d.companyName + "<br>" + "Beta: " + d.beta.toFixed(3) +
            "<br>" + "Earnings per Share: " + d.latestEPS.toFixed(3)+"M")});

    // start the tip
    scatterplot.call(tip);

    // create empty array
    var alldata = [];
    var scatterdata = [];

    // choose csv file containing part of the ticker symbols
    for (var i = 0; i < 6; i++) {

        // load in csv file with ticker symbols
        d3.csv("data/tickersymbols" + i + ".csv", function(data) {

            // join all ticker symbols into one string
            var symbols = data.map(a=> a.Ticker).join();

            // create new request variable
            var request = new XMLHttpRequest();

            // request all stats data from entire string consisting of all stocks
            request.open("GET", "https://api.iextrading.com/1.0/stock/market/batch?symbols="
                +symbols+"&types=stats", false);
            request.onload = function () {

                // parse all stats data into a json format
                alldata = JSON.parse(request.response);

                // push the relevant variables into new array
                for (firm in alldata) {
                    alldata[firm].stats.latestEPS =
                        (alldata[firm].stats.latestEPS) / 100;
                    scatterdata.push(alldata[firm].stats);
                }

                // call function to create plot if all data is pushed
                if (scatterdata.length > 500) {
                    makeScatter(scatterdata);
                }
            }
            request.send();
        })
    }

    function makeScatter(scatterdata) {

          // set the range and domain for x
          var x = d3.scaleLinear()
              .range([0, width])
              .domain(d3.extent(scatterdata, function(d) {
                return d.beta; })).nice();

          // set the range and domain for y
          var y = d3.scaleLinear()
              .range([height, 0])
              .domain(d3.extent(scatterdata, function(d) {
                  return (d.latestEPS); })).nice();

          // create axes
          var xAxis = d3.axisBottom(x)
              .ticks(20, "s");
          var yAxis = d3.axisLeft(y)
              .ticks(20, "s");

          // set and draw the axes
          var gX = scatterplot.append("g")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);
          var gY = scatterplot.append("g")
              .call(yAxis);

          // set x axis label
          scatterplot.append("text")
              .attr("class", "label")
              .attr("x", width)
              .attr("y", height + 50)
              .style("text-anchor", "end")
              .text("Beta");

          // set y axis label
          scatterplot.append("text")
              .attr("class", "label")
              .attr("transform", "rotate(-90)")
              .attr("x", 0)
              .attr("y", - 75)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Earnings per Share ($)");

          // create a clipping region for the zoom function
          scatterplot.append("rect")
              .attr("width", width)
              .attr("height", height)
              .attr("opacity", 0);

          // create the zoom option
          var zoom = d3.zoom()
              .scaleExtent([1, 20])
              .translateExtent([[0, 0], [width, height]])
              .extent([[0, 0], [width, height]])
              .on("zoom", zoomed);

          // call zoom option on the svg
          scatterplot.call(zoom);

          // create dots in the plot for each data point
          var points = scatterplot.selectAll(".dot").data(scatterdata)
          points = points.enter().append("circle")
              .attr("class", "dot")
              .attr("id", function(d) {return d.symbol})
              .attr("r", 6)
              .attr("cx", function(d) { return x(d.beta); })
              .attr("cy", function(d) { return y(d.latestEPS); })
              .style("fill", "slategrey")
              .on("mouseover", tip.show)
              .on("mouseout", tip.hide)

              // update the line and candlestick chart when a dot is clicked
              .on("click", function (d) {
                  var chosenName = d.companyName;
                  var chosenFirm = d.symbol;
                  updateLines(chosenFirm, chosenName, "1m");
                  updateCandles(chosenFirm, chosenName);
                  updateButtons(chosenFirm, chosenName);

                  // scroll to line and candlestick chart when a dot is clicked
                  $("html, body").animate({
                      scrollTop: $("#row2").offset().top -
                          $("nav").outerHeight()}, "slow")
              })

            function zoomed() {

                  // create new scales for x and y based on event
                  var new_xScale = d3.event.transform.rescaleX(x);
                  var new_yScale = d3.event.transform.rescaleY(y);

                  // update axes
                  gX.call(xAxis.scale(new_xScale));
                  gY.call(yAxis.scale(new_yScale));

                  // update the dots using the new scales
                  points.data(scatterdata)
                     .attr("cx", function(d) {return new_xScale(d.beta)})
                     .attr("cy", function(d) {return new_yScale(d.latestEPS)});
            }

            // function that appends element on top of svg
            d3.selection.prototype.moveToFront = function() {
                return this.each(function() {
                    this.parentNode.appendChild(this);
                })
            }

            // get value that is provided when button is clicked
            $("#inputButton").on("click", function() {

                // alert if no input is given
                if (inputFirm.value == "") {
                    alert("You must provide a ticker symbol!");
                }
                var inputTicker = inputFirm.value.toUpperCase();
                d3.selectAll(".dot").style("fill", "slategrey").attr("r", 6);

                // adjust the dot with id that equals the provided ticker symbol
                d3.select("#"+inputTicker).moveToFront()
                    .style("fill", "red")
                    .attr("r", 12);

                // alert if an invalid input is provided
                if (d3.select("#"+inputTicker).empty( )) {
                    alert("Invalid ticker symbol!");
                }
            })

            // get value that is provided when enter key is pressed
            $("#inputFirm").keypress(function(event) {
                var keycode = (event.keyCode ? event.keyCode : event.which);
                if (keycode == "13") {

                    // alert if no input is given
                    if (inputFirm.value == "") {
                        alert("You must provide a ticker symbol!");
                    }
                    var inputTicker = inputFirm.value.toUpperCase();
                    d3.selectAll(".dot").style("fill", "slategrey").attr("r", 6);
                    d3.select("#"+inputTicker).moveToFront()
                        .style("fill", "red")
                        .attr("r", 12);
                    if (d3.select("#"+inputTicker).empty( )) {
                        alert("Invalid ticker symbol!");
                    }
                }
           })
      }
}
