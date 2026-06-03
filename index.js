let movies;

async function main() {
    const movies = await fetch('https://www.omdbapi.com/?i=tt3896198&apikey=82e9f7af&s=star%20wars');
    const moviesData= await movies.json();
    const moviesWrapper = document.querySelector(".movies");

    document.body.classList += ' movies__loading'

    if (!movies) {
        movies = await getMovies();
    }

    document.body.classList.remove('movies__loading')

    moviesWrapper.innerHTML = moviesData.Search
    .map(
        (movie) => `<div class="movie">
                             <div class="movie__wrapper">
                                 <figure class="movie__img--wrapper">
                                     <img class="movie__img" src="${movie.Poster}" alt="Movie Poster">
                                 </figure>
                                 <div class="movie__wrapper--bg">
                                     <div class="movie__facts">
                                         <span class="movie__facts--year">Year Released: ${movie.Year}</span>
                                        <span class="movie__facts--imdb">imdbID: ${movie.imdbID}</span>
                                     </div>
                                 </div>
                                <div class="movie__title">
                                     ${movie.Title}
                                </div>
                            </div>
                         </div>`
                        ).join('');
}

main();

async function renderMovies(filter) {

    const movies = await fetch('https://www.omdbapi.com/?i=tt3896198&apikey=82e9f7af&s=star%20wars');
    const moviesData= await movies.json();
    const moviesWrapper = document.querySelector(".movies");

    if (filter === 'A TO Z') {
        moviesData.Search.sort((a,b) => (a.Title.localeCompare(b.Title)));
    }
    else if (filter === 'Z TO A') {
        moviesData.Search.sort((a,b) => (b.Title.localeCompare(a.Title)));
    }
    else if (filter === 'OLD TO NEW') {
        moviesData.Search.sort((a,b) => a.Year - b.Year);
    }
    else if (filter === 'NEW TO OLD') {
        moviesData.Search.sort((a,b) => b.Year - a.Year);
    }
      moviesWrapper.innerHTML = moviesData.Search
    .map(
        (movie) => `<div class="movie">
                             <div class="movie__wrapper">
                                 <figure class="movie__img--wrapper">
                                     <img class="movie__img" src="${movie.Poster}" alt="Movie Poster">
                                 </figure>
                                 <div class="movie__wrapper--bg">
                                     <div class="movie__facts">
                                         <span class="movie__facts--year">Year Released: ${movie.Year}</span>
                                        <span class="movie__facts--imdb">imdbID: ${movie.imdbID}</span>
                                     </div>
                                 </div>
                                <div class="movie__title">
                                     ${movie.Title}
                                </div>
                            </div>
                         </div>`
                        ).join('');
}


async function getMovies() {

    return new Promise((resolve) => {
        setTimeout(() => {
                resolve(getMovies());
        }, 1000);
    });
    
}

