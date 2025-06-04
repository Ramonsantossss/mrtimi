const apiKey = "bcc9273e9851f58686fedf85973c8de9";
const apiBaseUrl = "https://api.themoviedb.org/3";	
const imageBaseUrl = "http://image.tmdb.org/t/p/w300";
const language = document.documentElement.lang;

let currentPage = 1; 
const maxPages = 10; // Define o máximo de páginas para carregar

const main = async () => {
    const movieRatedEl = document.querySelector("#movies-container");
    let allMovies = [];

    // Buscar os filmes das 5 primeiras páginas (100 filmes no total)
    for (let page = 1; page <= 5; page++) {
        const movieRatedUrl = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}&language=${language}&page=${page}`;
        const movies = await fetchUrl(movieRatedUrl);
        
        if (movies) {
            allMovies = allMovies.concat(movies);
        }
    }

    createMovieList(allMovies, movieRatedEl);
};

const fetchUrl = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data.results || [];
    } catch (e) {
        console.log("Erro ao buscar filmes:", e);
        return [];
    }
};

const createImageUrl = (url) => {
    if (!url.poster_path) {
        const FALLBACK_IMAGE_URL = "https://via.placeholder.com/300x450?text=Imagem+Indisponível";
        return `<img src="${FALLBACK_IMAGE_URL}" />`;
    }
    return `<img src="${imageBaseUrl}${url.poster_path}" />`;
};

const createMovieList = (movies, element) => {
    movies.forEach(movie => {
        const movieEl = document.createElement("div");
        movieEl.classList.add("item");
        movieEl.innerHTML = createImageUrl(movie);
        
        let year = movie.release_date || movie.first_air_date;
        let ano = year ? new Date(year).getFullYear() : "N/A";

        movieEl.innerHTML += `
            <div class="overlay-year">
                <span>${ano}</span>
            </div>
            <div class="overlay-title">
                <h3>${movie.title || movie.name}</h3>
            </div>
        `;

        movieEl.addEventListener("click", () => {
            window.location.href = `../../movie/movie.html?id=${movie.id}&type=${movie.title ? "movie" : "serie"}`;
        });

        element.appendChild(movieEl);
    });
};

// Função para carregar mais filmes ao clicar no botão
const loadMoreMovies = async () => {
    if (currentPage >= maxPages) return;
    
    currentPage++;
    const movieRatedUrl = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}&language=${language}&page=${currentPage}`;
    const movies = await fetchUrl(movieRatedUrl);

    if (movies.length > 0) {
        const movieRatedEl = document.querySelector("#movies-container");
        createMovieList(movies, movieRatedEl);
    } else {
        console.log("Não há mais filmes para carregar.");
    }
};

// Adicionando evento ao botão "Carregar Mais"
document.querySelector("#load-more").addEventListener("click", loadMoreMovies);

main();

// Controle do menu de navegação
document.querySelector('#btnNav').addEventListener('click', () => {
    document.querySelector('#menuNav').classList.toggle('active');
});

// Função de pesquisa
function searchMovie() {
    let search = document.getElementById('search-movie').value;
    window.location.href = `../../search/search.html?search=${search}`;
}
