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

  var chosenFirm;
  var chosenName;

  makeScatterplot();

  makeLinechart();

  makeCandlestick();

  updateButtons("aapl", "Apple Inc.");

};

function updateButtons(chosenFirm, chosenName) {
  $( "#1month" ).on( "click", function() {
      console.log( "click" );
      var chosenTime = this.value;
      updateLines(chosenFirm, chosenName, chosenTime);
  });

  $( "#3months" ).on( "click", function() {
      console.log( "click" );
      var chosenTime = this.value;
      updateLines(chosenFirm, chosenName, chosenTime);
  });

  $( "#6months" ).on( "click", function() {
      console.log( "click" );
      var chosenTime = this.value;
      updateLines(chosenFirm, chosenName, chosenTime);
  });

}
