/**
* Amy van der Gun
* 10791760
*
* scatter.js
*
* Creates an interactive scatterplot using financial data.
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
      return (d.companyName + "<br>" + "Beta: "
      + d.beta.toFixed(3) + "<br>" + "Earnings per Share: " + d.latestEPS.toFixed(3)+"M")});

  // start the tip
  scatterplot.call(tip);

  // create empty array
  var alldata = [];
  var scatterdata = [];

  // choose another csv file every round
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

          //console.log(Object.values(alldata));
          for (firm in alldata) {
            alldata[firm].stats.latestEPS = (alldata[firm].stats.latestEPS) / 100;
            scatterdata.push(alldata[firm].stats);
          }

          // create scatter if all data has been loaded
          if (scatterdata.length > 500) {
          //  return scatterdata;
            makeScatter(scatterdata);
            makeLinechart();
            makeCandlestick();
          };
        };
        request.send();
    });
  };

  function makeScatter(scatterdata){

      // set the range for x
      var x = d3.scaleLinear()
        .range([0, width])
        .domain(d3.extent(scatterdata, function(d) { return d.beta; })).nice();

      // create y variable
      var y = d3.scaleLinear()
          .range([height, 0])
          .domain(d3.extent(scatterdata, function(d) { return (d.latestEPS); })).nice();

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
        .call(yAxis)

      // set axes labels
      scatterplot.append("text")
          .attr("class", "label")
          .attr("x", width)
          .attr("y", height + 50)
          .style("text-anchor", "end")
          .text("Beta")

      // set axes labels
      scatterplot.append("text")
          .attr("class", "label")
          .attr("transform", "rotate(-90)")
          .attr("x", 0)
          .attr("y", - 75)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Earnings per Share ($)");

      // create a clipping region
      scatterplot.append("rect")
          .attr("width", width)
          .attr("height", height)
          .attr("opacity", 0);

        // set zoom function
        var zoom = d3.zoom()
          .scaleExtent([1, 20])
          .translateExtent([[0, 0], [width, height]])
          .extent([[0, 0], [width, height]])
          .on("zoom", zoomed);

          // call zoom option
          scatterplot.call(zoom);

        // create dots in the plot for each data point
        var points = scatterplot.selectAll(".dot").data(scatterdata)
        points = points.enter().append("circle")
          .attr("class", "dot")
          .attr("r", 6)
          .attr("cx", function(d) { return x(d.beta); })
          .attr("cy", function(d) { return y(d.latestEPS); })
          .style("fill", function(d) { return color(3); })
          .on("mouseover", tip.show)
          .on("mouseout", tip.hide)
          .on("click", function (d) {
                  var chosenName = d.companyName;
                   var chosenFirm = d.symbol;
                   updateLines(chosenFirm, chosenName);
                   updateCandles(chosenFirm, chosenName);
               });

        function zoomed() {
            // create new scale ojects based on event
            var new_xScale = d3.event.transform.rescaleX(x);
            var new_yScale = d3.event.transform.rescaleY(y);
            // update axes
            gX.call(xAxis.scale(new_xScale));
            gY.call(yAxis.scale(new_yScale));

            points.data(scatterdata)
             .attr('cx', function(d) {return new_xScale(d.beta)})
             .attr('cy', function(d) {return new_yScale(d.latestEPS)});
        }

  };

//     // Get the input field - FIX ENTER KNOP ONCLICK TRIGGER
//     var input = document.getElementById("inputFirm");
//
//     // Execute a function when the user releases a key on the keyboard
//     input.addEventListener("keyup", function(event) {
//     // Cancel the default action, if needed
//     event.preventDefault();
//     // Number 13 is the "Enter" key on the keyboard
//     if (event.keyCode === 13) {
//       // Trigger the button element with a click
//       document.getElementById("myBtn").click();
//     }
//   });

// function searchFirm() {
//   var input = document.getElementById("inputFirm").value;
//   console.log(input);
//
//   request.open("GET", "https://api.iextrading.com/1.0/stock/"+input+"/stats", false);
//   request.onload = function () {
//     var elements = request.response;
//     console.log(elements);
//     alldata.push(elements);
//   }
//   request.send();};
};
