const api_key = "744c1371de82dc4f98824bf3d46b6cf4";
const image_base = "https://media.themoviedb.org/t/p/w300_and_h450_bestv2";


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

function mostraCreditsFilm(credits) {
    card = document.getElementById('actor');

    for (i = 0; i < 6; i++) {
        actor = credits.cast[i];
        console.log(actor)
        clone = card.cloneNode(true);

        actor_name = clone.getElementsByClassName('card-text')[0];
        character = clone.getElementsByClassName('card-text')[1];
        image = clone.getElementsByClassName('card-img-top')[0];
        // button = clone.getElementsByClassName('btn-primary')[0];

        actor_name.innerHTML = actor.name;
        character.innerHTML = actor.character;
        image.src = image_base + actor.profile_path;
        // button.href = "scheda-film.html?id=" + movie.id;

        clone.classList.remove('d-none')
        card.after(clone)
    }
}

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

function mostraSchedaAttore(attore) {
    card = document.ge
}