# Day 1 - 7 June
Vandaag heb ik besloten een API te gebruiken voor overzicht en efficiency. Voor stocks is het accurater om de meest recente informatie op te halen en de enige manier daarvoor is het gebruiken van een API. Ik ga de volgende API gebruiken: https://iextrading.com/developer/docs/#getting-started

Verder heb ik mijn website opgebouwd: html, css en javascript files.

# Day 2 - 8 June
In de werkgroep heb ik nog wat meer informatie gekregen over hoe ik het beste gebruik kan maken van de API. Verder heb ik de documentatie gelezen en wat code geimplementeerd.
Daarnaast heb ik ervoor gezorgd dat ik divs heb in mijn html die netjes naast elkaar staan met behulp van Bootstrap.

# Day 3 - 11 June
Ik heb vandaag gewerkt aan mijn data. Ik heb nu een API gevonden waarbij ik data kan krijgen per minuut. Dit betekent dat ik mijn line graph wel goed kan implementeren. Hier was ik eerst nog onzeker over, omdat ik verwachtte dat het lastig zou zijn de juiste API te vinden. De API die ik ga gebruiken: https://www.alphavantage.co/documentation/#intraday
Voor de scatterplot gebruik ik nog steeds de API genoemd op 7 juni. Ik heb een manier gevonden hoe ik alle data van alle bedrijven van de S&P500 kan opvragen. Ik ga gebruikmaken van een loop en een array met alle ticker symbolen.

# Day 4 - 12 June
Vandaag heb ik verder gewerkt aan mijn data. Ik heb nu een manier gevonden hoe ik in één keer alle data opvraag van alle bedrijven genoteerd op de S&P500. Helaas kan ik maar 100 firms opvragen in 1 request. Dit moet ik nog even regelen.

# Day 5 - 13 June
Vandaag heb ik geprobeerd om de scatterplot te creeeren. Echter kon ik maar 100 firms opvragen in 1 request, dit heb ik verholpen door verschillende csv-files te maken en verschillende requests te doen in een for-loop. Vervolgens wilde ik mijn data doorgeven aan de scatterplot. Helaas gaf dit nog veel problemen.

# Day 6 - 14 June
Ik heb vandaag mijn scatterplot afgerond. Het was nog een hele uitdaging omdat ik gisteren tegen veel obstakels aanliep.

# Day 7 - 15 June
Ik had vandaag college en kreeg te horen dat het goed was om een zoom functie te implementeren. Dit is tevens een interactief element dat als requirement geldt.

# Day 8 - 18 June
Ik heb vandaag gezorgd voor een zoom functie. Duurde heel lang, maar uiteindelijk is het goed gekomen. Dit was verder ook mijn doel voor vandaag. Ik kan vanaf nu mijn andere 2 visualisaties maken.

# Day 9 - 19 June
Ik ben begonnen aan mijn line chart. Dit ging vrij snel. Ik heb al eerder een line chart gemaakt. Oorspronkelijk was het idee om een single line chart te maken, maar ik heb er toch voor gekozen om een multi line chart te implementeren, met een lijn voor de high low en close share price. Uiteindelijk had ik een line chart met 3 lijnen; nog niet interactief.

# Day 10 - 20 June
Ik ben verder gegaan met mijn line chart. Ik ben heel lang bezig geweest om een juiste tooltip te vinden die ik kon gebruiken bij deze visualsatie. De tooltip die ik eerder heb gebruikt bij Data Processing gaf veel errors en bugs die ik niet snel kon verhelpen. Ik heb besloten om een andere tooltip in te bouwen die met deze data makkelijker te schrijven was. Dit is gelukt uiteindelijk.

# Day 11 - 21 June
Vandaag heb ik ervoor gezorgd dat de scatterplot en de line chart gelinkt zijn. Ik heb een update functie geschreven die uiteindelijk werkte. Dit kostte echter veel tijd, waardoor ik geen tijd meer had om de derde visualisatie in te bouwen.

# Day 12 - 22 June
Ik had vandaag college en helaas kon ik maar twee visualisaties laten zien. Gelukkig linken deze twee wel goed en zijn ze beiden interactief. Ik ga in het weekend mijn derde visualisatie maken. Ik heb besloten om de line chart te beperken tot een single line chart, omdat mijn candlestick chart ook al de high en de low share price weergeeft.

# Day 13 - 25 June
Vandaag heb ik mijn candlestick chart afgerond. Het is gelukt!!! Super blij mee. Toen ik de chart eenmaal gemaakt had, was het niet moeilijk om een update functie ervoor te schrijven. Uiteindelijk updaten zowel de line chart als de candlestick chart als er op dots in de scatterplot geklikt wordt. Verder heb ik van bootstrap het grayscale thema geimplementeerd. Nu ziet mijn site er een stuk beter uit! Al met al een productieve dag!

# Day 14 - 26 June
Vandaag heb ik ervoor gezorgd dat ik even duidelijk op een rijtje had wat er nog moet gebeuren. Ik ben begonnen door interactieve titels boven mijn charts te plaatsen. Vervolgens heb ik een interactief element gecreeerd: 3 buttons boven mijn line chart. Als er op de buttons geklikt wordt, wordt er elke keer een andere API request gedaan. Er kan gekozen worden voor een overzicht van de share prices van de meest recente maand, het meest recente kwartaal en het meest recente halfjaar. Dit werkt allemaal gelukkig.

# Day 15 - 27 June
Vandaag heb ik de search bar gefixt. Het werkt nu; de gezochte dots worden groter en krijgen een andere kleur. Verder heb ik ervoor gezorgd dat de tooltip van mijn candlestick chart overeenkomt met de tooltip van de scatterplot. Dit is gelukt. Verder heb ik mijn code wat opgeschoond en comments geplaatst.

# Day 16 - 28 June
Vandaag heb ik alles afgerond qua readme en report. Dit was nog een redelijke opgave. Verder heb ik de review gedaan en heb ik alles aangepast waar opmerkingen over waren. Dit was erg nuttig.
