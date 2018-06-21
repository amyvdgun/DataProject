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

}
