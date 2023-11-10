//För att följa uppgiftsbeskringens krav på två JS moduler för import/export har jag lagt api-anropet i en separat JS-fil (fetchData.js) som vi sen importerar i "main"-filen
import { getStrykTipsData } from './fetchData.js';


//För att lyckas med denna uppgift behöver vi programmera asynkront eftersom att just datahämtning från ett API är en asynkron uppgift. 
//Pusselbiten här är ".then" som säkerställer att vi inte börjar skapa några matchrader förrens datahämtningen är klar (promise/löftet har levererats).
//Beskriver i mer detalj på "fetch.Data.js" om hur metoden är utformad.
getStrykTipsData().then(function (data) {
    //När datahämtningen är fullständig kör vi metoden nedan för att skapa matchraderna (callback-funktion).  
    SkapaMatchRader(data);
});


//Följande metod anropas när getStryktipsData's datainhämtning är slutförd. 
function SkapaMatchRader(data){

    //Denna deklareras utanför loopen nedanför eftersom vi ska "appenda" varje ny rad vi skapar till detta objekt som representerar tabellen i HTML filen.
    const matchTable = document.querySelector('#table');

    
    //Nedanstående kod kommer upprepas så många gånger som antalet matcher är.
    //Loopen är lik det jag är van i python att kalla en "Enumerate loop" vilket ger oss möjligheten att iterera över ett objekt och samtidigt hålla koll på index.
    //Detta är användbart när vi dels vill skriva ut matchnummer i kolumn 1 och samtidigt komma åt datan från JSON-filen vi läst in.
    //gamesPlayed är en array av 13 objekt. Vi använder game för att kliva in i varje objekt och komma åt objektets attribut(matchdata).

    data.gamesPlayed.forEach(function (game, index){

        //Skapar en ny tabellrad för varje match.
        //Varje td (kolumn) vi skapar nedan kommer "appendas" till denna rad som i sin tur appendas till matchTable som vi deklarerade ovan.
        const newRow = document.createElement('tr');
        
        //Skapar en kolumn för som representerar ett index för matchen, dvs första raden är match 1.
        //Här utnyttjar vi index från forloopen. Notera +1 då index börjar från 0 men vi vill skriva match "1" som i uppgiftsexemplet.
        const NrCol = document.createElement('td'); 
        NrCol.textContent = index+1; 
        newRow.appendChild(NrCol);

        //**OMARBETAD EFTER FEEDBACK** 
        //Inkapslat ansvaret för att ska lagen i en funtkion som tar två lag som input-parametrar.
        //Förklarar funktion vidare längre ner utanför denna metod.
        const TeamCol = SkapaLagKolumn(game.competitors[1], game.competitors[2]);

        //Vi lägger till denna kombination av 2 a-taggar + en "vs"-text som en enskild kolumn på matchraden.
        newRow.appendChild(TeamCol);

        //**OMARBETAD EFTER FEEDBACK** 
        //Inkapslat ansvaret för att generera resultatsymbolerna beroende på resultat i en egen funktion.
        //Förklarar funktionen vidare längre ner utanför denna metod.
        const Res1 = GenereraMatchResultatSymbol(game.outcome, '1');
        const ResX = GenereraMatchResultatSymbol(game.outcome, 'X');
        const Res2 = GenereraMatchResultatSymbol(game.outcome, '2');

        //Lägger till samtliga td-element på matchraden
        newRow.appendChild(Res1);
        newRow.appendChild(ResX);
        newRow.appendChild(Res2);

        //Slutligen lägger vi till matchraden på tabellen som fanns sen innan. Vi repeterar ovanstående kod 13x och sen är vi klara.
        matchTable.append(newRow);
        
    });

}
//Omarbetad efter feedback. 
//Funktionen tar två lag som input parametrar. Precis som i tidigare version så skapar vi endast ett td-element. 
//td-elementet består av en a-tagg, en textrad och en a-tagg. 
//a-taggarna tilldelas som synlig tex själva lagnamenet (teamName) samt hyperlänken src tilldelas hemsidan.
//Genom att funktionen retunerar den här kolumnstrukturen kan vi effektivt anropa den i huvudmetoden för att skapa matchraderna på endast en rad.
function SkapaLagKolumn(competitor1, competitor2) {
    const teamCol = document.createElement('td');

    const teamName1 = document.createElement('a');
    teamName1.textContent = competitor1.teamName;
    teamName1.href = competitor1.homepage;

    teamCol.appendChild(teamName1);

    teamCol.appendChild(document.createTextNode(' -VS- '));

    const teamName2 = document.createElement('a');
    teamName2.textContent = competitor2.teamName;
    teamName2.href = competitor2.homepage;

    teamCol.appendChild(teamName2);

    return teamCol;
}

//Omarbetad efter feedback. 
//För att effiktivsera och minimera upprepning av html-koden har vi nu skapat en funktion som tar två input-parametrar. 
//Dels outcome vilket är värdet i JSON-filen som indikerar vilket lag som vunnit. vinstSymbol som input-parameter är en sträng som...
//... underlättar användandet av flera if-satser då vi vid anropet i huvudmetoden endast behöver mata in ('1','X', eller '2')
//Funkitionen gör likt funktionen för lag, ett td-element och beroende på outcome matchar värdet för kolumnen, tilldelas den specifika...
//... kolumnen html-stilen som indikerar vilket lag (eller lika) som vunnit. 
//Det gör att per td dokument (3 totalt) så krävs bara en rad av kod vilket är betydligt mer effektivt än vid min initiala inlämning.
function GenereraMatchResultatSymbol(outcome, resultatSymbol) {
    const resultColumn = document.createElement('td');

    if (outcome === resultatSymbol) {
        resultColumn.innerHTML = '<div class="checkmark"><span class="stem"></span><span class="kick"></span></div>';
    }

    return resultColumn;
}



