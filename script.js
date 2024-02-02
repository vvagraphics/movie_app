const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f7a8c5307c43b1116e6fba59f2e6533e&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?include_adult=false&api_key=f7a8c5307c43b1116e6fba59f2e6533e&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')


//notes to fix. adult filter. 
getMovies(API_URL)

async function getMovies(url){
    const res = await fetch(url)
    const data = await res.json()
    // console.log(data.results)
    showMovies(data.results)
}

function showMovies(movies){
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie

        const movieElem = document.createElement('div')
        movieElem.classList.add('movie')

        movieElem.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}" >
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRating(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview"><h3>Overview</h3>${overview}</div>
    
        `
        main.appendChild(movieElem)
    })

}

function getClassByRating(vote){
    if(vote >= 8){
        return 'green'
    }else if(vote >= 5){
        return 'orange'
    }else{
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchTerm = search.value

    if(searchTerm && searchTerm !== ''){
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    }else{
        window.location.reload() 
    }
    
})