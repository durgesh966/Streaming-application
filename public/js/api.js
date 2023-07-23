const api_key = "68d6ae00f051bb720e27905342ac4673";
const img_url = "https://image.tmdb.org/t/p/w500";
const original_img_url = "https://image.tmdb.org/t/p/original";
const genres_list_http = "https://api.themoviedb.org/3/genre/movie/list?";
const movie_genres_http = "https://api.themoviedb.org/3/discover/movie?";
const movie_detail_http = "https://api.themoviedb.org/3/movie";

// Example of usage:
const movieId = 12345;
const movieDetailUrl = `${movie_detail_http}/${movieId}?api_key=${api_key}`;

// Now, you can use 'movieDetailUrl' to make a fetch request to get the movie details.
