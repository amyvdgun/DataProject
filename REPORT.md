# Stock Checker 5000 - REPORT
[Stock Checker 5000](https://amyvdgun.github.io/DataProject/)
## Introductie
De Stock Checker 5000 biedt inzichten voor investeerders voor wie het vaak lastig is om een afweging te maken tussen risico en rendement. Alle S&P500 aandelen kunnen direct worden geanalyseerd door de scatter plot te bekijken. Elke afzonderlijke S&P500 stock kan worden geanalyseerd door de candlestick en line chart te bekijken. Door gebruik te maken van alle interactieve elementen, kan het raadplegen van de Stock Checker als erg nuttig ervaren worden.

![](doc/Report.png)

## Technisch Design
Het project bestaat uit 1 main JavaScript file en 3 afzonderlijke JavaScript files voor elke grafiek.
In 'main.js' worden drie functies aangeroepen die leiden tot het creëeren van de 3 charts.
In 'scatter.js' staat de functie waarmee de scatter plot gecreëerd wordt. In zowel 'candlestick.js' als 'linechart.js' staan 2 grote functies. De eerste functie zorgt ervoor dat de charts voor de eerste keer gemaakt worden. De tweede functie in beide files is een update functie. Deze functies worden aangeroepen op het moment dat de gebruiker klikt op een dot in de scatter plot.
In de folder 'code/js' staat daarnaast de JavaScript file 'techan.js'. Dit is een externe bron die ik heb gebruikt voor het maken van de candlestick chart.

#### main.js

#### scatter.js

#### candlestick.js

#### linechart.js


Second, go into detail, and describe the modules/classes (apps) files/functions (data) and how they relate.

Clearly describe challenges that your have met during development. Document all important changes that your have made with regard to your design document (from the PROCESS.md). Here, we can see how much you have learned in the past month.

Defend your decisions by writing an argument of a most a single paragraph. Why was it good to do it different than you thought before? Are there trade-offs for your current solution? In an ideal world, given much more time, would you choose another solution?

Make sure the document is complete and reflects the final state of the application. The document will be an important part of your grade.
