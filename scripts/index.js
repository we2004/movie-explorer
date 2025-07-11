import { getMovieDetail, getGenres, getMovieByGenre } from "./data.js";
import { renderSearchPage } from "./search.js";
renderHomePage()
async function renderHomePage() {

    /*************fav movies*********************/
    const favMovieData = await Promise.all(
        ['496243', '210577'].map(async (id) => {
            const movie = await getMovieDetail(id);
            return movie;
        })
    );

    //generating html
    let favHtml = ''
    favMovieData.forEach((movie) => {
        favHtml += `
            <div class="movie">
                <div class="content">
                <div class="movie-title">
                    ${movie.title}
                </div>
                <p class="movie-story">
                    ${movie.overview}
                </p>
                <div class="movie-detail-btn">
                <a href="detail.html?movieId=${movie.id}">
                    <button><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                        class="bi bi-play-fill" viewBox="0 0 16 16">
                        <path
                        d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                    </svg></button>
                </a>
                </div>
                </div>

                <div class="movie-poster">
                    <img
                    src="https://image.tmdb.org/t/p/original/${movie.poster_path}"
                    alt="">
                </div>
            </div>
        `
    })

    document.querySelector('.fav-movies-js').innerHTML = favHtml


    /**************** movie by genres *******************/
    const cGenresList = await getGenres();
    let genHtml = ''


    //generating html
    for (const genre of cGenresList) {
        const movies = await getMovieByGenre(genre.id)
        const cardsHtml = generateGenreCard(movies.results)

        genHtml += `

         <div class="genre">
            <div class="title">
                ${genre.name}
            </div>

            <div class="cards">

                ${cardsHtml}

            </div>
        </div>
        `
    }

    document.querySelector('.movie-genres-js').innerHTML = genHtml
}


//generate movies card
function generateGenreCard(moviesList) {
    let html = ''
    for (let i = 0; i < 6; i++) {
        html += `
        <div class="card">
            <a href="detail.html?movieId=${moviesList[i].id}">
                <div class="image">
                <img
                    src="https://image.tmdb.org/t/p/original/${moviesList[i].poster_path}"
                    alt="">
                </div>
                <div class="movie-title">
                    ${moviesList[i].title}
                </div>
                <div class="rating-year">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-star-fill"
                    viewBox="0 0 16 16">
                    <path
                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    ${moviesList[i].vote_average}
                    |
                    ${dayjs(moviesList[i].release_date).format('YYYY')}
                </div>
             </a>
        </div>
        `
    }


    return html
}


/***** search bar *****/

document.querySelector('.search-bar svg').addEventListener('click', () => {
    const input = document.querySelector('.search-bar-js').value
    if (input) {
        window.location.href = `search.html?movieName=${input}`
    }
})

document.addEventListener('keydown', (event => {
    if (event.key == "Enter") {
        const input = document.querySelector('.search-bar-js').value
        if (input) {
            window.location.href = `search.html?movieName=${input}`

        }
    }
}))