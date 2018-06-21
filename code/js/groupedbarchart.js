/**
* Amy van der Gun
* 10791760
*
* piechart.js
*
* Creates an interactive grouped bar chart using financial data.
*/

function makeBarchart() {

  // set the outer and inner width and height
  var margin = {top: 50, bottom: 75, left: 100, right: 100},
    width = 1400 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

  // add the SVG element and set characteristics
  var barchart = d3.select("barchart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + 100 + "," + 50 + ")");

  var x0 = d3.scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.1);

  var x1 = d3.scaleBand()
      .padding(0.05);

  var y = d3.scaleLinear()
      .rangeRound([height, 0]);

  var z = d3.scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

  // create new request variable
  var request = new XMLHttpRequest();

  // request financials from Apple as default
  request.open("GET", "https://api.iextrading.com/1.0/stock/aapl/financials", false);
    request.onload = function () {

      console.log(request.response);


  // x0.domain(data.map(function(d) { return d.State; }));
  // x1.domain(keys).rangeRound([0, x0.bandwidth()]);
  // y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();
  //





  };
  request.send();

};
