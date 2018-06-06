# DataProject - Stock Checker 5000
## Introductie
Ik, Amy van der Gun, visualiseer een financiële dataset in het project 'Stock Checker 5000'.

## Problem Statement
Het is voor veel investeerders onduidelijk hoe risico verband houdt met rendement. Het idee van investeren is dat je het rendement ten opzichte van het risico maximaliseert. Het is daarom van belang dat er overzicht gecreëerd wordt met betrekking tot dit probleem.

## Solution
Deze visualisaties zullen het verband laten zien tussen het risico en rendement van aandelen op de AEX index.
Met behulp van de onderstaande scatterplot zal het verband weergegeven worden tussen de bèta's van de aandelen op de AEX en het bijbehorende rendement. Als er over de 'dots' wordt gehoverd, krijgt de gebruiker de naam, de bèta en het rendement van dat bepaalde bedrijf te zien.

![](doc/SML.png)

Vervolgens kan er geklikt worden op alle 'dots' in de scatterplot. Op het moment van klikken, zal er via een candlestick chart per bedrijf worden weergegeven wat de hoogste, laagste, open en close stock price is per periode. Dit zullen waarschijnlijk maandelijkse/dagelijkse perioden zijn.

![](doc/CANDLE.png)

Uiteindelijk kan je op een candle klikken en op dat moment verschijnt er een dagelijks verloop van de stock price. Op deze manier kan de volatiliteit van de stock price (en dus return) goed worden weergegeven.

![](doc/LINE.png)

Als interactieve elementen zal ik een dropdown menu maken, waarbij er op een ander jaar geklikt kan worden. Verder zal ik een search engine implementeren waarbij er gezocht kan worden op een ticker symbol. 


## Prerequisites
#### Data Source
- https://www.investing.com/indices/european-indices?&majorIndices=on
- https://finance.yahoo.com/

#### External Components
- Bootstrap 4.1.1
- d3-tip

#### Similar Visualizations
Een scatterplot en een line chart heb ik eerder gemaakt. Niet met dezelfde dataset (helaas..), maar ik ga er vanuit dat dit niet heel veel problemen gaat opleveren. Een candlestick chart heb ik nog nooit gemaakt. Echter, er zijn veel voorbeelden te vinden en dit type chart wordt veel gebruikt in de finance.

#### Hardest Parts
Ik denk dat het lastig wordt om de visualisaties aan elkaar te linken. Ik heb te maken met een enorme dataset met verschillende bedrijven, verschillende prijzen en verschillende perioden.
Echter denk ik dat het met de juiste converter en json file haalbaar is om het project te implementeren.
