// const { timeout } = require("nodemon/lib/config");

const main = document.querySelector('.main');
fetch(genres_list_http + new URLSearchParams({
        api_key: api_key
    }))
    .then(res => res.json())
    .then(data => {
        data.genres.forEach(item => {
            fetchMoviesListByGenres(item.id, item.name);
        })
    });
const fetchMoviesListByGenres = (id, genres) => {
    fetch(movie_genres_http + new URLSearchParams({
            api_key: api_key,
            with_genres: id,
            page: Math.floor(Math.random() * 3) + 1
        }))
        .then(res => res.json())
        .then(data => {
            makeCategoryElement(`${genres}_movies`, data.results)
                .catch(err => console.log(err));

        });
    const makeCategoryElement = (category, data) => {
        main.innerHTML += `
      <div class="movie-list">
            <button class="pre-btn"><img src="image/preve.png"></button>
            <h1 class="movie-category">${category}</h1>
            <div class="movie-container" id="${category}">
                
            </div>
            <button class="next-btn"><img src="image/next.png"></button>
        </div>
      `;
        makeCards(category, data);

    }
}


const makeCards = (id, data) => {
    const movieContainer = document.getElementById(id);
    const cardElements = data.map((item) => {
      const backdropPath = item.backdrop_path || item.poster_path;
      if (!backdropPath) {
        return ''; // Return an empty string if no backdrop_path or poster_path exists
      }
  
      return `
        <div class="movie" onclick="location.href = '/${item.id}'">
          <img src="${img_url}${backdropPath}" alt="">
          <p class="movie-title">${item.title}</p>
        </div>
      `;
    });
  
    movieContainer.innerHTML = cardElements.join('');
  
    const lastIndex = data.length - 1;
    setTimeout(() => {
      setupScrolling();
    }, lastIndex * 5000); // Setup scrolling after the last card is added (5000 ms per card)
  };
  