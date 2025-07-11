
import { getMoviesByName } from './data.js'

const url = new URL(window.location.href);
const movieName = url.searchParams.get('movieName')
renderSearchPage(movieName)

export async function renderSearchPage(input) {

    //getting movie name
    const userInput = input
    const words = userInput.split(" ")
    let MovieName = ""
    words.forEach((word) => {
        MovieName += (word + "+")
    })

    //getting data
    const movies = await getMoviesByName(MovieName)

    //generating html
    let html = `
         <div class="title">
            Results for <span class="movie-title">${userInput}</span>
        </div>
        <div class="movie-cards">
            ${generateMoviePoster(movies)}
        </div>
    `

    document.querySelector('.movies-found').innerHTML = html
}


//generating movies Posters
function generateMoviePoster(movies) {

    let html = ""

    movies.forEach((movie) => {
        html += `
            <div class="card">
                <a href="detail.html?movieId=${movie.id}">
                <img
                    src="https://image.tmdb.org/t/p/original/${movie.poster_path}"
                    alt="">
                </a>
            </div>
            `
    })

    return html
}



//search bar

document.querySelector('.search-bar svg').addEventListener('click', () => {
    const input = document.querySelector('.search-bar-js').value
    if (input) {
        renderSearchPage(input)
        window.location.href = `search.html?movieName=${input}`

    }
})

document.addEventListener('keydown', (event => {
    if (event.key == "Enter") {
        const input = document.querySelector('.search-bar-js').value
        if (input) {
            renderSearchPage(input)
            window.location.href = `search.html?movieName=${input}`

        }
    }
}))