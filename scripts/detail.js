import { getMovieDetail, getMovieCast } from "./data.js";
import { renderSearchPage } from "./search.js";
renderDetailPage()
async function renderDetailPage() {
    const url = new URL(window.location.href);
    const movieId = url.searchParams.get('movieId')

    const movieData = await getMovieDetail(movieId)
    console.log(movieData)
    const castData = await getMovieCast(movieId)

    const html = `
        <div class="left-side">
            <div class="poster">
                <img
                src="https://image.tmdb.org/t/p/original/${movieData.poster_path}"
                alt="">
            </div>
        </div>

        <div class="middle-side">
            <div class="title">${movieData.title}</div>
            <div class="story-line">
                <div class="title">Storyline</div>
                <div class="summary">
                    ${movieData.overview}
                </div>
            </div>

            <div class="info">
                <div class="title">Info</div>
                <div class="all-subs">
                    <div class="sub-info">
                        <div class="label">
                            Rating
                        </div>
                        <div class="value">
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-star-fill"
                            viewBox="0 0 16 16">
                            <path
                                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg> ${movieData.vote_average}
                        </div>
                    </div>

                        <div class="sub-info">
                            <div class="label">
                                Relase Year
                            </div>
                            <div class="value">
                                ${new dayjs(movieData.release_date).format('YYYY')}
                            </div>
                        </div>

                        <div class="sub-info">
                            <div class="label">
                                Genres
                            </div>
                            <div class="value">
                                ${getText(movieData.genres)}
                            </div>
                        </div>

                        <div class="sub-info">
                            <div class="label">
                                Countries
                            </div>
                            <div class="value">
                                ${getText(movieData.production_countries)}
                            </div>
                        </div>

                        <div class="sub-info">
                            <div class="label">
                                Duration
                            </div>
                            <div class="value">
                                ${movieData.runtime}min
                            </div>
                        </div>
                </div>

        </div>

        </div>

        <div class="right-side">
            <div class="title">Cast</div>
            <div class="cast-cards">
                ${await generateCast(movieId)}
            </div>

        </div>
    `

    document.querySelector('.whole-content-js').innerHTML = html

}

function getText(array) {
    let html = ''
    const length = array.length
    let count = 0
    array.forEach(item => {
        html += `${item.name} `
        if (count < length - 1) {
            html += ' - '
        }
        count++
    })

    return html
}

async function generateCast(movieId) {
    const cast = await getMovieCast(movieId)
    const castLength = cast.length
    let html = ''
    for (let i = 0; i < Math.min(5, castLength); i++) {
        const profilePath = cast[i].profile_path


        const profilePhoto = profilePath ? `https://image.tmdb.org/t/p/original/${cast[i].profile_path}` : 'https://via.placeholder.com/185x278?text=No+Image'
        html += `
            <div class="cast-card">
                <img
                    src="${profilePhoto}"
                    alt="">
                <div class="names">
                    <div class="name">
                        ${cast[i].name}
                    </div>
                    <div class="charecter">
                        ${cast[i].character}
                    </div>
                </div>
            </div>
        `
    }

    return html
}

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