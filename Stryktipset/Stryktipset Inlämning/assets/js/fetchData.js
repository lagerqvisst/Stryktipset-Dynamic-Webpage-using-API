//Som beskrivet i toppen av "index.js" har vi valt att lägga implementationen av api-anropet i sen separat js-fil.

//Följande funktion utgör en sk. "promise-kedja" där vi asynkront väntar på svar i olika led innan vi går vidare till nästa tills vi kommer i mål.
// Steg 1: Fetch -> en asynkron HTTP-förfrågan till länken nedan som vi väntar på att slutföras innan vi går vidare till steg 2.
// Steg 2: Om HTTP-förfrågan lyckas, startar vi ett nytt block i promise-kedjan där vi säger "konvertera" HTTP-svaret till en JSON-fil.
// Steg 3: När vi väntat klart på konverteringen till JSON så vill vi slutligen retunera JSON-datan till den som anropat metoden.
// Steg (4): Notera i anropet i "index.js" att vi också använder "then" vilket betyder att vi väntar på att alla steg i denna kedjan ska slutföras
//           innan vi börjar bearbeta datan.

export function getStrykTipsData(){
    return fetch(' https://stryk.herokuapp.com/strycket2023') //Steg 1
        .then(function (response){                            //Steg 2
            return response.json();
        })
        .then(function (data){                                //Steg 3
            return data;
        })
}


