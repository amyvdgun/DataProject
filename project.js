/**
* Amy van der Gun
* 10791760
*
* project.js
*
* Creates interactive visualizations using financial data.
* https://www.w3schools.com/js/js_ajax_http.asp
*/

// execute function when DOM is loaded
window.onload = function () {

  var color = d3.scaleOrdinal(d3.schemeCategory10);
  // set the outer and inner width and height
  var margin = {top: 50, bottom: 50, left: 50, right: 50},
    width = 1100 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

  // add the SVG element and set characteristics
  var scatterplot = d3.select("#scatterplot")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // add the tooltip and its content
  var tip = d3.tip()
    .attr("class", "d3-tip")
    .offset([-10, 0])
    .html(function (d) {
      return (d.companyName + "<br>" + "Beta: "
      + d.beta + "<br>" + "Return on Equity: " + d.returnOnEquity+ "%")});

      // start the tip
      scatterplot.call(tip);

  // create empty array
  var alldata = [];
  var scatterdata = [];

  // choose another csv file every round
  for (var i = 0; i < 6; i++) {

    // load in csv file with ticker symbols
    d3.csv("tickersymbols" + i + ".csv", function(data) {

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
            alldata[firm].stats.returnOnEquity = (alldata[firm].stats.returnOnEquity) / 100;
            scatterdata.push(alldata[firm].stats);
          }

          if (scatterdata.length > 500) {
            makeScatter(scatterdata);
          };
        };
        request.send();
    });
  };

  function makeScatter(scatterdata){
      console.log(scatterdata);
      // set the range for x
      var x = d3.scaleLinear()
        .range([0, width])
        .domain(d3.extent(scatterdata, function(d) { return d.beta; })).nice();

      // create y variable
      var y = d3.scaleLinear()
          .range([height, 0])
          .domain(d3.extent(scatterdata, function(d) { return (d.returnOnEquity); })).nice();

      // add x-axis
      scatterplot.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x))
          .append("text")
            .attr("class", "label")
            .attr("x", width)
            .attr("y", margin.bottom)
            .style("text-anchor", "end")
            .text("Beta");

      // add y-axis
      scatterplot.append("g")
          .call(d3.axisLeft(y))
          .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("x", 0)
            .attr("y", -margin.left)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Return on Equity");

    // create dots in the plot for each data point
      scatterplot.selectAll(".dot")
        .data(scatterdata)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 6)
        .attr("cx", function(d) { return x(d.beta); })
        .attr("cy", function(d) { return y(d.returnOnEquity); })
        .style("fill", function(d) { return color(3); })
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide);
  };

    // Get the input field - FIX ENTER KNOP ONCLICK TRIGGER
    var input = document.getElementById("inputFirm");

    // Execute a function when the user releases a key on the keyboard
    input.addEventListener("keyup", function(event) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Trigger the button element with a click
      document.getElementById("myBtn").click();
    }
  });
};

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
//   request.send();
// };
