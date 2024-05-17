const api_key = "89d724ae44a6f49963cc1a70c38dc1c1";
const image_base = "https://media.themoviedb.org/t/p/w300_and_h450_bestv2";
const profile_image_base = "https://media.themoviedb.org/t/p/w276_and_h350_face/"
session_id = undefined;

function setLocalStorage(chiave, valore){
    localStorage.setItem(chiave, JSON.stringify(valore))
}

function getLocalStorage(chiave){
    return JSON.parse(localStorage.getItem(chiave))
}

function getMovieId(){
    query = window.location.search;
    param = new URLSearchParams(query);
    id_film = param.get('id');
    return id_film;
}

function mostraSchedaFilm(film) {
    title = document.getElementById('title');
    overview = document.getElementById('overview');
    image = document.getElementById('image');
    release = document.getElementById('release');

    title.innerHTML = film.title;
    overview.innerHTML = film.overview;
    image.src = image_base + film.poster_path;
    release.innerHTML = film.release_date
}

function mostraSchedaAttore(actor) {
    a_name = document.getElementById('a_name');
    bio = document.getElementById('bio');
    image = document.getElementById('image');
    // release = document.getElementById('release');

    a_name.innerHTML = actor.name;
    bio.innerHTML = actor.biography;
    image.src = profile_image_base + actor.profile_path;
    // release.innerHTML = film.release_date
}

function mostraCreditsAttore(credits) {
    card = document.getElementById('film');

    for (i = 0; i < 6; i++) {
        film = credits.cast[i];
        console.log(film)
        clone = card.cloneNode(true);

        title = clone.getElementsByClassName('card-title')[0];
        image = clone.getElementsByClassName('card-img-top')[0];
        button = clone.getElementsByClassName('btn-primary')[0];

        title.innerHTML = film.title;
        image.src = image_base + film.poster_path;
        button.href = "scheda-film.html?id=" + film.id;

        clone.classList.remove('d-none')
        card.after(clone)
    }
}

function mostraCreditsFilm(credits) {
    card = document.getElementById('actor');

    for (i = 0; i < 6; i++) {
        actor = credits.cast[i];
        console.log(actor)
        clone = card.cloneNode(true);

        actor_name = clone.getElementsByClassName('card-text')[0];
        character = clone.getElementsByClassName('card-text')[1];
        image = clone.getElementsByClassName('card-img-top')[0];
        button = clone.getElementsByClassName('btn-primary')[0];

        actor_name.innerHTML = actor.name;
        character.innerHTML = actor.character;
        image.src = profile_image_base + actor.profile_path;
        button.href = "scheda-attore.html?id=" + actor.id;

        clone.classList.remove('d-none')
        card.after(clone)
    }
}

function mostraPopolari(popolari) {


    card = document.getElementById('card-film');
    container = document.getElementById('container');
    container.innerHTML = "";
    container.append(card);


    for (i = 0; i < popolari.results.length; i++) {

        movie = popolari.results[i];
        clone = card.cloneNode(true);
        clone.id = 'card-film-' + i;

        title = clone.getElementsByClassName('card-title')[0];
        overview = clone.getElementsByClassName('card-text')[0];
        image = clone.getElementsByClassName('card-img-top')[0];
        button = clone.getElementsByClassName('btn-primary')[0];

        title.innerHTML = movie.title;
        overview.innerHTML = movie.overview;
        image.src = image_base + movie.poster_path;
        button.href = "scheda-film.html?id=" + movie.id;

        clone.classList.remove('d-none')
        card.before(clone)
    }

}

function ricerca() {
    query = document.getElementById('query').value;
    console.log(query, query.length);
    if(query.length > 3){
        const options = {
            method: 'GET'
        };

        language = document.getElementById('selected_language').value;
        page = document.getElementById('selected_page').value;
        
    
        //fetch('https://api.themoviedb.org/3/search/movie?api_key=' + api_key + '&query=' + query, options)
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}&language=${language}&page=${page}`, options)
            .then(response => response.json())
            .then(response => mostraPopolari(response))
            .catch(err => console.error(err));
    
    }
  

    return false;

}

function mostraLingue(lingue){
    select_language = document.getElementById('selected_language');

    for(var i=0; i < 20; i++){
        language_name = lingue[i].english_name
        language_code = lingue[i].iso_639_1
        select_language.options[i] = new Option(language_name,language_code)

    }

}