const movie_id = location.pathname;

async function fetchMovieDetails() {
    const response = await fetch(`${movie_detail_http}${movie_id}?` + new URLSearchParams({ api_key }));
    const data = await response.json();
    setupMovieInfo(data);
}

function setupMovieInfo(data) {
    const movieName = document.querySelector('.movie-name');
    const genres = document.querySelector('.genres');
    const des = document.querySelector('.des');
    const title = document.querySelector('.title');
    const backdrop = document.querySelector('.movie-info');

    document.title = movieName.innerHTML = data.title;
    genres.innerHTML = `${data.release_date.split('-')[0]} | `;
    data.genres.forEach(({ name }, index, genresArr) => {
        genres.innerHTML += name + formatString(index, genresArr.length);
    });
    if (data.adult) {
        genres.innerHTML += ' | +18';
    }
    if (data.backdrop_path == null) {
        data.backdrop_path = data.poster_Path;
    }
    des.innerHTML = data.overview.substring(0, 200) + '...';
    backdrop.style.backgroundImage = `url(${original_img_url}${data.backdrop_path})`;
}

const formatString = (currentIndex, maxIndex) => {
    return currentIndex === maxIndex - 1 ? '' : ', ';
}

async function fetchCastInfo() {
    const response = await fetch(`${movie_detail_http}${movie_id}/credits?` + new URLSearchParams({ api_key }));
    const data = await response.json();
    console.log(data);
    const cast = document.querySelector('.starring');
    data.cast.slice(0, 5).forEach(({ name }, index, castArr) => {
        cast.innerHTML += name + formatString(index, castArr.length);
    });
}

async function fetchVideoClips() {
    const response = await fetch(`${movie_detail_http}${movie_id}/videos?` + new URLSearchParams({ api_key }));
    const data = await response.json();
    console.log(data);
    const trailerContainer = document.querySelector('.trailer-container');
    const maxClips = Math.min(data.results.length, 4);
    data.results.slice(0, maxClips).forEach(({ key }) => {
        trailerContainer.innerHTML += `
            <iframe src="https://youtube.com/embed/${key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;
    });
}

async function fetchRecommendations() {
    const response = await fetch(`${movie_detail_http}${movie_id}/recommendations?` + new URLSearchParams({ api_key }));
    const data = await response.json();
    console.log(data);
    const container = document.querySelector('.recommendation-container');
    data.results.slice(0, 16).forEach(({ id, title, backdrop_path }) => {
        if (backdrop_path == null) {
            return;
        }
        container.innerHTML += `
            <div class="movie" onclick="location.href = '/${id}'">
                <img src="${img_url}${backdrop_path}" alt="">
                <p class="movie-title">${title}</p> 
            </div>
        `;
    });
}

// Execute the functions
fetchMovieDetails();
fetchCastInfo();
fetchVideoClips();
fetchRecommendations();
