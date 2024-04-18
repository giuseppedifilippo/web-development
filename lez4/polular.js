const options = {method: 'GET', headers: {accept: 'application/json'}};
language = 'it-IT'

fetch('https://api.themoviedb.org/3/movie/popular?api_key='+ api_key +'&language='+ language +'&page=1', options)
  .then(response => response.json())
  .then(response => mostraPopolari(response))
  .catch(err => console.error(err));

function mostraPopolari(popolari) {
    
}