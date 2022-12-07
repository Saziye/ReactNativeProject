import Config from 'environment';

const baseURL = Config.BASE_URL;
const apiKey = Config.API_KEY;
console.log({baseURL});


export const ServicePaths = {
  Popular: baseURL + `movie/popular?api_key=${apiKey}`,
  Now_playing: baseURL + `movie/now_playing?api_key=${apiKey}`,
  Upcoming: baseURL + `movie/upcoming?api_key=${apiKey}`,
  TopRated: baseURL + `movie/top_rated?api_key=${apiKey}`,
  MovieById: baseURL + `movie/@movie_id?api_key=${apiKey}`,
  MoviesReviews: baseURL + `movie/@movie_id/reviews?api_key=${apiKey}`,
  MoviesCredits: baseURL + `movie/@movie_id/credits?api_key=${apiKey}`,
  SearchMovie: baseURL + `search/movie?api_key=${apiKey}&query=@query`,
};
