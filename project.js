/**
* Amy van der Gun
* 10791760
*
* project.js
*
* Creates interactive visualizations using financial data.
*/

// execute function when DOM is loaded
window.onload = function () {

  // set the outer and inner width and height
  var margin = {top: 50, bottom: 50, left: 100, right: 100},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  // add the SVG element and set characteristics
  var scatterplot = d3.select("#scatterplot")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var beta = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4];

  var rendement = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4];

  // set the range for x
  var x = d3.scaleLinear()
    .range([0, width, .1])
    .domain([beta]);

  // create y variable
  var y = d3.scaleLinear()
      .range([height, 0])
      .domain([rendement]);

  // create and draw x-axis on desired position
  var xAxis = d3.axisBottom(x);
  scatterplot.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  // create and draw y-axis on desired position
  var yAxis = d3.axisLeft(y);
  scatterplot.append("g")
      .attr("class", "y axis")
      .call(yAxis)

  // create request variable
  var request = new XMLHttpRequest();

  request.open("GET", "https://ws-api.iextrading.com/1.0/stock/aapl/chart", false);
  request.send();

  console.log(request.status);
  console.log(request.statusText);
  //
  // request.open("GET", "https://ws-api.iextrading.com/1.0/stock/aapl/chart", true);
  // request.onload = function () {
  //
  //   // Begin accessing JSON data here
  //   var data = JSON.parse(this.response);
  //   console.log(data);

    // if (request.status >= 200 && request.status < 400) {
    //   data.forEach(movie => {
    //     console.log(movie.title);
    //   });
    // } else {
    //   console.log('error');
    // }
}


function searchFirm() {
  alert("It's not working yet....");
}
