/**
* Amy van der Gun
* 10791760
*
* project.js
* https://bl.ocks.org/EfratVil/d956f19f2e56a05c31fb6583beccfda7
*
* Creates interactive visualizations using financial data.
* https://www.w3schools.com/js/js_ajax_http.asp
*/

// execute function when DOM is loaded
window.onload = function () {

  var margin = { top: 20, right: 20, bottom: 30, left: 30 };
  width = 900 - margin.left - margin.right,
  height = 480 - margin.top - margin.bottom;

  var tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);



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

  function makeScatter(scatterdata) {
    var x = d3.scaleLinear()
          .range([0, width])
          .nice();

    var y = d3.scaleLinear()
        .range([height, 0]);

    var xAxis = d3.axisBottom(x).ticks(12),
        yAxis = d3.axisLeft(y).ticks(12 * height / width);

    var brush = d3.brush().extent([[0, 0], [width, height]]).on("end", brushended),
        idleTimeout,
        idleDelay = 350;

    var svg = d3.select("body").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var clip = svg.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width )
        .attr("height", height )
        .attr("x", 0)
        .attr("y", 0);


      var xExtent = d3.extent(scatterdata, function (d) { return d.beta; });
      var yExtent = d3.extent(scatterdata, function (d) { return d.returnOnEquity; });
      x.domain(d3.extent(scatterdata, function (d) { return d.beta; })).nice();
      y.domain(d3.extent(scatterdata, function (d) { return d.returnOnEquity; })).nice();

      var scatter = svg.append("g")
           .attr("id", "scatterplot")
           .attr("clip-path", "url(#clip)");

     // add the tooltip and its content
     var tip = d3.tip()
       .attr("class", "d3-tip")
       .offset([-10, 0])
       .html(function (d) {
         return (d.companyName + "<br>" + "Beta: "
         + d.beta + "<br>" + "Return on Equity: " + d.returnOnEquity+ "%")});

     // start the tip
     svg.call(tip);


      scatter.selectAll(".dot")
          .data(scatterdata)
        .enter().append("circle")
          .attr("class", "dot")
          .attr("r", 4)
          .attr("cx", function (d) { return x(d.beta); })
          .attr("cy", function (d) { return y(d.returnOnEquity); })
          .attr("opacity", 0.5)
          .style("fill", "#4292c6")
          .on("mouseover", tip.show)
          .on("mouseout", tip.hide);

      // x axis
      svg.append("g")
         .attr("class", "x axis")
         .attr('id', "axis--x")
         .attr("transform", "translate(0," + height + ")")
         .call(xAxis);

      svg.append("text")
       .style("text-anchor", "end")
          .attr("x", width)
          .attr("y", height - 8)
       .text("Beta");

      // y axis
      svg.append("g")
          .attr("class", "y axis")
          .attr('id', "axis--y")
          .call(yAxis);

      svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "1em")
          .style("text-anchor", "end")
          .text("Return on Equity");

      scatter.append("g")
          .attr("class", "brush")
          .call(brush);
};

  function brushended() {

      var s = d3.event.selection;
      if (!s) {
          if (!idleTimeout) return idleTimeout = setTimeout(idled, idleDelay);
          x.domain(d3.extent(data, function (d) { return d.x; })).nice();
          y.domain(d3.extent(data, function (d) { return d.y; })).nice();
      } else {

          x.domain([s[0][0], s[1][0]].map(x.invert, x));
          y.domain([s[1][1], s[0][1]].map(y.invert, y));
          scatter.select(".brush").call(brush.move, null);
      }
      zoom();
  }

  function idled() {
      idleTimeout = null;
  }

  function zoom() {

      var t = scatter.transition().duration(750);
      svg.select("#axis--x").transition(t).call(xAxis);
      svg.select("#axis--y").transition(t).call(yAxis);
      scatter.selectAll("circle").transition(t)
      .attr("cx", function (d) { return x(d.x); })
      .attr("cy", function (d) { return y(d.y); });
  }


};
