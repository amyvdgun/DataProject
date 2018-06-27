/**
* Amy van der Gun
* 10791760
*
* main.js
*
* Creates interactive visualizations using financial data.
*/

window.onload = function () {

    // initialize general variables
    var chosenFirm;
    var chosenName;

    // create scatter plot
    makeScatterplot();

    // create line chart
    makeLinechart();

    // create candlestick chart
    makeCandlestick();

    // update the buttons of the line chart using the default firm Apple
    updateButtons("aapl", "Apple Inc.");
}

function updateButtons(chosenFirm, chosenName) {

    // update the lines when the 1month button is clicked
    $( "#1month" ).on( "click", function() {
        var chosenTime = this.value;
        updateLines(chosenFirm, chosenName, chosenTime);
    })

    // update the lines when the 3month button is cliked
    $( "#3months" ).on( "click", function() {
        var chosenTime = this.value;
        updateLines(chosenFirm, chosenName, chosenTime);
    })

    // update the lines when the 6month button is clicked
    $( "#6months" ).on( "click", function() {
        var chosenTime = this.value;
        updateLines(chosenFirm, chosenName, chosenTime);
    })
}
