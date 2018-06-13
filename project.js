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

  // create empty array
  var alldata = [];

  // load in csv file with most recent ticker symbols
  d3.csv("tickersymbols.csv", function(data) {

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
      };
      request.send();

      console.log(alldata);

      var count = Object.keys(alldata).length;
      console.log(count);
    //
    // for (firm in alldata) {
    //   console.log(alldata[firm].stats.beta, alldata[firm].stats.companyName);
    // }

     //console.log(alldata.AAPL.stats.beta);

  });

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

function searchFirm() {
  var input = document.getElementById("inputFirm").value;
  console.log(input);
  //alert("It's not working yet....");
  // // loop over all the ticker symbols and make request to API
  // for (var ticker = 0; ticker < data.length; ticker++) {
  //   request.open("GET", "https://api.iextrading.com/1.0/stock/"+data[ticker].Ticker+"/stats", false);
  //   request.onload = function () {
  //     var elements = request.response;
  //     console.log(elements);
  //     alldata.push(elements);
  //   }
  //   request.send();
  // };
  //
  // console.log(alldata);

// });
}
