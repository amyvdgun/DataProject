# Stock Checker 5000
#### Data Sources
- https://iextrading.com/developer/docs/#getting-started
Via deze website wordt de data verkregen. Je kan een request doen via deze API.

Voor de eerste visualisatie is er data nodig van de beta van elk bedrijf op de markt (S&P500) en de bijbehorende stock return. Er moet een gemiddelde worden genomen van de returns over een bepaalde periode. Via de API kunnen de returns en de beta opgevraagd worden.

Voor de tweede visualisatie heb ik een dataset nodig met alle bedrijven op de markt (S&P500) en de bijbehorende stock prices voor de meest recente 30/31 dagen. Als er in de scatterplot op een bedrijf wordt geklikt, worden gegevens opgevraagd via de API. Via de API kan de high, low, end en close price van een bepaald aandeel worden opgevraagd. Deze worden dan gerepresenteerd in de candlestick chart.

Voor de derde visualisatie heb ik een data nodig waarbij ik óf per dag het verloop van de stock price laat zien via een line graph, óf het verloop van de dividenduitkering laat zien via een line graph of bar chart. Deze informatie kan wederom opgevraagd worden vai de API. Ik ben er nog niet over uit of het mogelijk is om 'per uur data' op te vragen. Als dit wel mogelijk is, zal ik een line graph maken van het verloop van de stock price. Als dit niet mogelijk is, ga ik een andere variabele visualiseren als dividend of debt/equity variabelen.

#### Technical Components
Met behulp van de onderstaande scatterplot zal het verband weergegeven worden tussen de bèta's van de aandelen op de AEX en het bijbehorende rendement. Als er over de 'dots' wordt gehoverd, krijgt de gebruiker de naam, de bèta en het rendement van dat bepaalde bedrijf te zien.

![](doc/SML.png)

Vervolgens kan er geklikt worden op alle 'dots' in de scatterplot. Op het moment van klikken, zal er via een candlestick chart per bedrijf worden weergegeven wat de hoogste, laagste, open en close stock price is per periode. Dit zullen waarschijnlijk maandelijkse/dagelijkse perioden zijn.

![](doc/CANDLE.png)

Uiteindelijk kan je op een candle klikken en op dat moment verschijnt er een dagelijks verloop van de stock price. Op deze manier kan de volatiliteit van de stock price (en dus return) goed worden weergegeven.

![](doc/LINE.png)

Als interactieve elementen zal ik een dropdown menu maken, waarbij er op een ander jaar geklikt kan worden. Verder zal ik een search engine implementeren waarbij er gezocht kan worden op een ticker symbol.

#### Plugins
- https://iextrading.com/developer/docs/#getting-started
- D3 V4
- D3-tip
