const searchInput = document.getElementById("search-input");
const filterSelect = document.getElementById("filter");
const moviesWrapper = document.querySelector(".movies");

async function renderMovies() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm === "") return;   

    document.body.classList.add('is-loading');
    const res = await fetch(`https://www.omdbapi.com/?apikey=82e9f7af&s=${searchTerm}`);
    const moviesData = await res.json();
    document.body.classList.remove('is-loading');

    if (!moviesData.Search) {        
        moviesWrapper.innerHTML = `<p>No movies found. Try another search.</p>`;
        return;
    }

    const filter = filterSelect.value;   
    if (filter === 'A TO Z') {
        moviesData.Search.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (filter === 'Z TO A') {
        moviesData.Search.sort((a, b) => b.Title.localeCompare(a.Title));
    } else if (filter === 'OLD TO NEW') {
        moviesData.Search.sort((a, b) => a.Year - b.Year);
    } else if (filter === 'NEW TO OLD') {
        moviesData.Search.sort((a, b) => b.Year - a.Year);
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

searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        renderMovies();
    }
});

filterSelect.addEventListener("change", renderMovies);
