const key2 = 'dbc028a11ca7d3567921b49df58dd1fc';


export async function getMoviesByName(movieName) {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key2}&query=${movieName}`)
    const data = await response.json()
    return data.results
}

export async function getMovieDetail(movieId) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${key2}`)
    const data = await response.json()
    return data
}

export async function getMovieCast(movieId) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${key2}`)
    const data = await response.json()
    return data.cast
}

export async function getGenres() {
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key2}`)
    const data = await response.json()
    return data.genres
}

export async function getMovieByGenre(movieGenreId) {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${key2}&with_genres=${movieGenreId}`)
    const data = await response.json()
    return data
}
