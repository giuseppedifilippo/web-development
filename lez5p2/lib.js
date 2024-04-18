const api_key = "89d724ae44a6f49963cc1a70c38dc1c1";
const image_base = "https://media.themoviedb.org/t/p/w300_and_h450_bestv2";


function mostraPopolari(popolari) {
            
    card = document.getElementById('card-film');

    for (i = 0; i < popolari.results.length; i++) {
        movie = popolari.results[i];
        clone = card.cloneNode(true);

        title = clone.getElementsByClassName('card-title')[0];
        overview = clone.getElementsByClassName('card-text')[0];
        image = clone.getElementsByClassName('card-img-top')[0];
        button = clone.getElementsByClassName('btn-primary')[0];

        title.innerHTML = movie.title;
        overview.innerHTML = movie.overview;
        image.src = image_base + movie.poster_path;
        button.href = "scheda-film.html?id=" + movie.id;

        clone.classList.remove('d-none')
        card.after(clone)
    }

}
function getSchedafilm(id) {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDRjMTM3MWRlODJkYzRmOTg4MjRiZjNkNDZiNmNmNCIsInN1YiI6IjY2MjBkMjA3N2EzYzUyMDE3ZDRjNGUyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uZm-bBwEcGHnf8vKovvCl8z4IdvqVQqzCWd9axBxuLg'
        }
      };
      
      fetch('https://api.themoviedb.org/3/movie/movie_id='+ id +'?language=en-US', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

function mostraCredits() {

}

function getAttore() {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDRjMTM3MWRlODJkYzRmOTg4MjRiZjNkNDZiNmNmNCIsInN1YiI6IjY2MjBkMjA3N2EzYzUyMDE3ZDRjNGUyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uZm-bBwEcGHnf8vKovvCl8z4IdvqVQqzCWd9axBxuLg'
        }
      };
      
      fetch('https://api.themoviedb.org/3/person/1190668?language=en-US', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}