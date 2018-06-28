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
makeScatterplot() is de overkoepelende functie in de scatter.js file. De svg wordt hier aangemaakt. Verder wordt er een API request gedaan naar financiële data van alle S&P500 bedrijven. Alle ticker symbolen van deze bedrijven laad ik in via 6 csv bestanden. Deze moeten in 6 files, omdat er van slechts 100 bedrijven data opgehaald kan worden per API request. De x- en y-variabelen (Beta en EPS) van elk bedrijf worden gepusht in een nieuwe array. Als al deze data verzameld is, wordt de scatter plot gecreëerd door het aanroepen van de makeScatter functie. Hier wordt de data gekoppeld aan de dots. Als er wordt geklikt op de dots, worden de updateLines, updateCandles en de updateButtons functies aangeroepen. Verder wordt de zoom-functie gemaakt en aangeroepen. Tot slot volgt er een stuk code waarbij er gereageerd wordt op de input van de gebruiker in de search box. De gezochte dot wordt rood en groter gemaakt.  

#### candlestick.js
Deze file bestaat uit twee grote functies. In makeCandlestick() wordt de candlestick chart voor het eerst gemaakt. Er wordt een API request gedaan voor de high, low, open en close prijzen voor Apple voor de laatste meest recente maand. De file techan.js is gebruikt voor het creëeren van deze chart. De data wordt gekoppeld aan de candles. Verder wordt er een tooltip aangemaakt die de high, low, open en close prijzen weergeeft per tijdslot.
De functie updateCandles wordt aangeroepen op het moment dat de gebruiker een dot selecteert in de scatter plot. Er wordt vanuit scatter.js een 'chosenFirm' meegegeven die wordt gebruikt in de API request. Op deze manier wordt er nieuwe data gekoppeld aan de candles en de y-as.

#### linechart.js
Deze file bestaat uit twee grote functies. In makeLinechart() wordt de line chart voor het eerst gemaakt. Er wordt een API request gedaan voor de high, low, open en close prijzen voor Apple voor de laatste meest recente maand. De close price data wordt meegegeven aan de lijn in de chart. Verder wordt er een tooltip aangemaakt die deze close prijzen weergeeft op het moment dat de gebruiker hovert over de lijn.
De functie updateLines wordt aangeroepen op het moment dat de gebruiker een dot selecteert in de scatter plot. Er wordt vanuit scatter.js een 'chosenFirm' meegegeven die wordt gebruikt in de API request. Daarnaast wordt er een 'chosenTime' meegegeven die wordt gebruikt in de API request. Deze chosenTime variabele wordt meegegeven vanuit main.js op het moment dat de gebruiker klikt op een button boven de line chart. Op deze manier wordt er nieuwe data gekoppeld aan de lijn en de assen.

## Uitdagingen
Voor mij was het een uitdaging om te werken met een API. Ik had dat nog nooit op deze manier gedaan. Ik was aan het begin van deze periode relatief veel tijd kwijt om uit te zoeken hoe ik data visualiseer die ik terugkrijg van een API request. Uiteindelijk ben ik alleen maar blij dat ik voor deze optie heb gekozen, omdat ik op deze manier gebruik maak van 'realtime data', wat ervoor zorgt dat mijn project voor langere tijd relevant zal blijven.
Ik heb niet veel veranderingen doorgevoerd ten opzichte van het initiële plan. Dingen die ik heb veranderd:
- geen dropdown menu meer bij de scatter plot
- y-variabele is geen return on equity, maar EPS
- de line graph weergeeft geen data per uur/minuut, maar weergeeft data van de laatste meest recente maand, kwartaal of halfjaar.
- de candles zijn niet clickable, omdat techan.js een aparte library is die dat niet toestaat.

## Waarom op deze manier?
Ik heb gekozen om geen gebruik te maken van een dropdown menu bij de scatter plot. Ik heb dit overlegd met de assistenten en er werd gezegd dat ik dan gebruik moest maken van een slider. Dit is lastig voor mijn visualisatie en voor mijn data.
Als vervanging voor dit interactieve element heb ik 3 buttons gemaakt boven de line chart. Voor een investeerder is het tevens interessanter om te weten hoe de prijzen van de meest recente maand, kwartaal en halfjaar zich hebben ontwikkeld, dan hoe hoog de beta en EPS waren in voorgaande jaren.
De y-variabele in de scatter plot is de EPS geworden in plaats van de return on equity. Dit is ook een vorm van return op een share en bij deze variabele werd er een minder geclusterde datawolk weergegeven. Dit komt ten goede van de plot en de interactieve functies (hover).
Ik heb gekozen om bij de line graph geen data per uur/minuut weer te geven, omdat het redelijk nietszeggend is wat een aandelenkoers in 1 uur/minuut doet. Investeerders willen liever weten wat de trend is op een iets langere termijn.
In een ideale wereld zou ik meerdere variabelen willen weergeven in de scatter plot. Ik zou meer buttons willen toevoegen die andere relaties laten zien. Graag had ik mij nog willen focussen op dividenduitkeringen en risico's.
