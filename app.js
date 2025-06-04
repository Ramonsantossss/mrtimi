document.querySelector('#btnNav').addEventListener('click', event => {
    console.log('click');
    document.querySelector('#menuNav').classList.toggle('active');
});

const API_URL = "https://mrtimi-api.onrender.com/api/login"; // Substitua pela sua API real
const apiKey = "bcc9273e9851f58686fedf85973c8de9";
const apiBaseUrl = "https://api.themoviedb.org/3";	
const language = document.documentElement.lang;
const nowPlayingUrlMovie = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}&language=${language}`;
const nowPlayingUrlSerie = `${apiBaseUrl}/tv/on_the_air?api_key=${apiKey}&language=${language}`;
const movieRatedUrl = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}&language=${language}`;
const serieRatedUrl = `${apiBaseUrl}/tv/top_rated?api_key=${apiKey}&language=${language}`;
const imageBaseUrl = "http://image.tmdb.org/t/p/w300";


const fetchUrl = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data.results;
    } catch (e) {
        console.log(e);
    }
}

const createImageUrl = (url) => {
    return `
        <img src="${imageBaseUrl}${url.poster_path}" />
    `;
}

const createMovieList = (movies, element) => {
    movies.forEach(movie => {
        const movieEl = document.createElement("div");
        movieEl.classList.add("item");
        movieEl.innerHTML = createImageUrl(movie);
        let year = movie.release_date || movie.first_air_date;
        let date = new Date(year);
        let ano = date.getFullYear();
        movieEl.innerHTML += `
            <div class="overlay-year">
                <span>
                    ${ano}
                </span>
            </div>
        `;
        movieEl.innerHTML += `
            <div class="overlay-title">
                <h3>${movie.title || movie.name}</h3>
            </div>
        `;
        movieEl.addEventListener("click", () => {
            window.location.href = `./movie/movie.html?id=${movie.id}&type=${movie.title ? "movie" : "serie"}`;
            console.log(movie.id);
        });
        element.appendChild(movieEl);
    });
}

const main = async () => {
    const nowPlayingMovies = await fetchUrl(nowPlayingUrlMovie);
    const nowPlayingSeries = await fetchUrl(nowPlayingUrlSerie);
    const topRatedMovies = await fetchUrl(movieRatedUrl);
    const topRatedSeries = await fetchUrl(serieRatedUrl);

    const nowPlayingMoviesElement = document.getElementById("movies-container");
    const nowPlayingSeriesElement = document.getElementById("series-container");
    const topRatedMoviesElement = document.getElementById("toprated-movies-container");
    const topRatedSeriesElement = document.getElementById("toprated-series-container");

    createMovieList(nowPlayingMovies, nowPlayingMoviesElement);
    createMovieList(nowPlayingSeries, nowPlayingSeriesElement);
    createMovieList(topRatedMovies, topRatedMoviesElement);
    createMovieList(topRatedSeries, topRatedSeriesElement);
}

main();

document.querySelectorAll('.btn-next').forEach(item => {
    item.addEventListener('click', event => {
        const container = item.parentElement.querySelector('.scroll-container');
        container.scrollLeft += 150;
    });
});

document.querySelectorAll('.btn-prev').forEach(item => {
    item.addEventListener('click', event => {
        const container = item.parentElement.querySelector('.scroll-container');
        container.scrollLeft -= 150;
    });
});

function searchMovie() {
    let search = document.getElementById('search-movie').value;
    window.location.href = `./search/search.html`+`?search=${search}`;
}




/*
async function login(username, password) {
  try {
    const response = await fetch("https://mrtimi-api.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      // Erro de rede ou resposta inválida (ex: 401)
      return { success: false };
    }

    const data = await response.json();

    // Verifica se a resposta indica sucesso
    return { success: data.success, user: data.user };
  } catch (error) {
    console.error("Erro na API de login:", error);
    return { success: false };
  }
}


window.onload = async () => {
  const savedUser = getCookie("username");
  const savedPass = getCookie("password");

  if (!savedUser || !savedPass) {
    window.location.href = "https://ramonsantossss.github.io/mrtimi/login.html";
    return;
  }

  try {
    const res = await login(savedUser, savedPass);
    if (!res.success) {
      window.location.href = "/login.html";
    }
    // Se sucesso, permanece na página
  } catch (err) {
    console.log("Erro ao logar automaticamente:", err);
    window.location.href = "/login.html";
  }
};

*/

// Função para salvar o login nos cookies
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Função para pegar valor de cookie
function getCookie(name) {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let c of ca) {
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(cname) === 0) return c.substring(cname.length, c.length);
  }
  return "";
}



window.onload = async () => {
  const savedUser = getCookie("username");
  const savedPass = getCookie("password");

  if (!savedUser && !savedPass) {
    try {
      const res = await login(savedUser, savedPass);
      if (res.success) {
        window.location.href = "login.html"; // redireciona se sucesso
      }
    } catch (err) {
      console.log("Erro ao logar automaticamente:", err);
    }
  }
};
