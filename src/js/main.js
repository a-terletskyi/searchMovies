import * as flsFunctions from "./modules/functions.js";
flsFunctions.isWebp();

const getS = (selector) => document.querySelector(selector);

async function loadMovies(title) {
    try {
        let moviesData = [];
        let page = 1;
        while (page <= 2) {
            const response = await fetch(`http://www.omdbapi.com/?s=${title}&page=${page}&apikey=eeb56d4b`);
            const data = await response.json();
            if (data.Response) {
                data.Search.forEach((movie) => moviesData.push(movie));
                if (data.Search.length < 10) break;
            }
            page++;
        }
        moviesList(moviesData);
        getS('.search-error').classList.add('hidden');
    }
    catch (error) {
        if (error instanceof TypeError) {
            getS('.movies').innerHTML = "";
            getS('.search-error').classList.remove('hidden');
        }
    }
}

function moviesList(list) {
    getS('.movies').innerHTML = "";
    for (const item of list) {
        let movie = document.createElement('div');
        let moviePoster;
        movie.dataset.id = item.imdbID;
        movie.classList.add('movie');
        (item.Poster != "N/A") ? moviePoster = item.Poster : moviePoster = './img/No_Image_Available.jpg';
        movie.innerHTML = `
        <div class="movie-poster">
            <img src="${moviePoster}" alt="Poster of the ${item.Title}">
        </div>
        <div class="movie-title">
            <h3>${item.Title}</h3>
        </div>
        <p class="movie-type">${item.Type}</p>
        <p class="movie-year">${item.Year}</p>
        <button type="button" class="btn movie-btn">More details</button>
        `;
        getS('.movies').appendChild(movie);
    }
}

getS('.search-form__btn').addEventListener('click', async (e) => {
    e.preventDefault();
    const searchValue = getS('.search-form__input').value.trim();
    if (searchValue != '') { loadMovies(searchValue) }
})

window.addEventListener('click', async (e) => {
    if (e.target.className === 'btn movie-btn') {
        let moviePoster, ratings = '';
        let movieID = e.target.parentNode.getAttribute('data-id');
        const result = await fetch(`http://www.omdbapi.com/?i=${movieID}&apikey=eeb56d4b`);
        const movieDetails = await result.json();
        movieDetails.Poster != "N/A" ? moviePoster = movieDetails.Poster : moviePoster = './img/No_Image_Available.jpg';
        movieDetails.Ratings.forEach((val) => ratings += `<span class ="more-ratings__span">${val.Source} ${val.Value}</span>`)
        getS('.more').innerHTML = `
        <div class="more-poster">
            <img src="${moviePoster}" alt="Poster of the ${movieDetails.Title}">
        </div>
        <div class="more-info">
            <div class="more-title">
                <h3>${movieDetails.Title}</h3>
            </div>
            <div class="more-genre-info">
                <small class="more-rated">${movieDetails.Rated}</small>
                <small class="more-year">${movieDetails.Year}</small>
                <small class="more-genre">${movieDetails.Genre}</small>
            </div>
            <p class="more-description">${movieDetails.Plot}</p>
            <p class="more-written"><mark>Written by:</mark> ${movieDetails.Writer}</p>
            <p class="more-directed"><mark>Directed by:</mark> ${movieDetails.Director}</p>
            <p class="more-starring"><mark>Starring:</mark> ${movieDetails.Actors}</p>
            <p class="more-box-office"><mark>Box office:</mark> ${movieDetails.BoxOffice}</p>
            <p class="more-awards"><mark>Awards:</mark> ${movieDetails.Awards}</p>
            <p class="more-ratings"><mark>Ratings:</mark>${ratings}</p>
        </div>
        `;
        getS('.more-details').classList.remove('hidden');
    }
    else if (e.target.className != 'more') { getS('.more-details').classList.add('hidden') }
})