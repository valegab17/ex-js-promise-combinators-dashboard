/* In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query), che accetta una città come input e recupera simultaneamente:

    Nome completo della città e paese da  /destinations?search=[query]
    (result.name, result.country, nelle nuove proprietà city e country).
    Il meteo attuale da /weathers?search={query}
    (result.temperature e result.weather_description nella nuove proprietà temperature e weather).
    Il nome dell’aeroporto principale da /airports?search={query}
    (result.name nella nuova proprietà airport).

Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati.
Attenzione: le chiamate sono delle ricerche e ritornano un’array ciascuna, di cui devi prendere il primo risultato (il primo elemento).
Note del docente
Scrivi la funzione getDashboardData(query), che deve:

    Essere asincrona (async).
    Utilizzare Promise.all() per eseguire più richieste in parallelo.
    Restituire una Promise che risolve un oggetto contenente i dati aggregati.
    Stampare i dati in console in un messaggio ben formattato.
    Testa la funzione con la query "london"
 */


//salvo l'url di base dell'API
const API_URL = "http://localhost:3333";

fetch(`${API_URL}/destinations`)
    .then(res => res.json())
    .then(data => console.log(data));


//faccio una chiamata fetch alla url che mi hanno dato mi servirà nella funzione getDashboardData
async function fetchJson(url) {
    const response = await fetch(url);
    const obj = await response.json();
    return obj;
}

//creo la funzione getDashboardData
const getDashboardData = async (query) => {
    try {
        //nome città e paese
        const promiseDestinations = fetchJson(`${API_URL}/destinations?search=${query}`);
        //meteo attuale
        const promiseMeteo = fetchJson(`${API_URL}/weathers?search=${query}`);
        //aeroporto principale
        const promiseAirport = fetchJson(`${API_URL}/airports?search=${query}`);

        //array di promesse 
        const promises = [promiseDestinations, promiseMeteo, promiseAirport];
        //estraggo i dati reali
        const [destinations, weather, airport] = await Promise.all(promises);

        return {
            city: destinations[0].name,
            country: destinations[0].country,
            weather: weather[0].weather_description,
            temperature: weather[0].temperature,
            airport: airport[0].name
        }
    } catch(error){
        throw new Error(`Errore nel recupero dei dati: ${error.message}`)

    }
}
/* 
// Esecuzione immediata (IIFE) per testare la funzione
(async () => {
    const data = await getDashboardData('london')
    console.log(`dashboard: `, data);
    console.log(`
        ${data.city} is in ${data.country}.
        Today there are ${data.temperature} degrees and the weather is ${data.weather}.
        The main airport is ${data.airport}.
        `);
})() */

    getDashboardData('london')
    .then(data => {
        console.log('Dashboard data:', data);
        console.log(
            `${data.city} is in ${data.country}.\n` + `Today there are ${data.temperature} degrees and the weather is ${data.weather}-\n`
        );
    })
    .catch(error => console.error(error));