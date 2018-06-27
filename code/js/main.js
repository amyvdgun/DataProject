/**
* Amy van der Gun
* 10791760
*
* main.js
*
* Creates interactive visualizations using financial data.
*/

// execute function when DOM is loaded
window.onload = function () {

  // initialize general variables
  var chosenFirm;
  var chosenName;

  // create scatterplot
  makeScatterplot();

  // create line chart
  makeLinechart();

  // create candlestick chart
  makeCandlestick();

  // update the buttons of the line chart using the default firm Apple
  updateButtons("aapl", "Apple Inc.");

  searchFirm();

};

function updateButtons(chosenFirm, chosenName) {
  $( "#1month" ).on( "click", function() {
      var chosenTime = this.value;
      updateLines(chosenFirm, chosenName, chosenTime);
  });

  $( "#3months" ).on( "click", function() {
      var chosenTime = this.value;
      updateLines(chosenFirm, chosenName, chosenTime);
  });

  $( "#6months" ).on( "click", function() {
      var chosenTime = this.value;
      updateLines(chosenFirm, chosenName, chosenTime);
  });
}

function searchFirm() {

  $("#inputButton").on( "click", function() {
    var inputTicker = inputFirm.value.toUpperCase();
    console.log(inputTicker);
  });

  $("#inputFirm").keypress(function(event){

	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == "13"){
		var inputTicker = inputFirm.value.toUpperCase();
    console.log(inputTicker);
	 }
 });
}
