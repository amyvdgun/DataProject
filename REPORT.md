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
In deze file staat een window.onload: dit zorgt ervoor dat dit script pas wordt uitgevoerd als de hele html file (alle componenten) is geladen. Vervolgens worden er 3 functies aangeroepen die ervoor zorgen dat er een scatter plot, een line chart en een candlestick chart gemaakt worden. Daarnaast wordt de updateButtons functie aangeroepen. Dit moet in de main.js, omdat er accuraat gereageerd moet worden op het klikken van de buttons boven de line chart. Op het moment dat de gebruiker een bepaald aandeel selecteert in de scatter plot, moeten de buttons boven de line chart wél data opvragen die horen bij dat bepaalde aandeel. Als deze functie niet zou worden aangeroepen, zou het klikken op de buttons ervoor zorgen dat er altijd data van Apple Inc. (default firm) opgevraagd wordt.

#### scatter.js
makeScatterplot() is de overkoepelende functie in de scatter.js file. De svg wordt hier aangemaakt. Verder wordt er een API request gedaan naar financiële data van alle S&P500 bedrijven. Alle ticker symbolen van deze bedrijven laad ik in via 6 csv bestanden. Deze moeten in 6 files, omdat er van slechts 100 bedrijven data opgehaald kan worden per API request. De x- en y-variabelen (Beta en EPS) van elk bedrijf worden gepusht in een nieuwe array. Als al deze data verzameld is, wordt de scatter plot gecreëerd. 



#### candlestick.js

#### linechart.js


Second, go into detail, and describe the modules/classes (apps) files/functions (data) and how they relate.

Clearly describe challenges that your have met during development. Document all important changes that your have made with regard to your design document (from the PROCESS.md). Here, we can see how much you have learned in the past month.

Defend your decisions by writing an argument of a most a single paragraph. Why was it good to do it different than you thought before? Are there trade-offs for your current solution? In an ideal world, given much more time, would you choose another solution?

Make sure the document is complete and reflects the final state of the application. The document will be an important part of your grade.
