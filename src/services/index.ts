import {PopularModule, MovieDetailModule, MovieReviewsModule} from 'models';
import HttpClient from 'services/HttpClient';
import {ServicePaths} from 'utils';

export class MainApi extends HttpClient {
  public constructor() {
    super();
  }
  public async GetPopulars() {
    return await this.makeGetRequest<PopularModule.Response>(
      ServicePaths.Popular,
    );
  }
  public async GetNowPlayings() {
    return await this.makeGetRequest<PopularModule.Response>(
      ServicePaths.Now_playing,
    );
  }
  public async GetUpcomings() {
    return await this.makeGetRequest<PopularModule.Response>(
      ServicePaths.Upcoming,
    );
  }
  public async GetTopRateds() {
    return await this.makeGetRequest<PopularModule.Response>(
      ServicePaths.TopRated,
    );
  }
  public async GetMovie(arg: MovieDetailModule.Request) {
    return await this.makeGetRequest<MovieDetailModule.Response>(
      ServicePaths.MovieById,
      {movie_id: arg.id},
    );
  }
  public async GetMovieCast(arg: MovieDetailModule.Request) {
    return await this.makeGetRequest<MovieDetailModule.Response>(
      ServicePaths.MoviesCredits,
      {movie_id: arg.id},
    );
  }
  public async GetMovieReviews(arg: MovieReviewsModule.Request) {
    return await this.makeGetRequest<MovieReviewsModule.Response>(
      ServicePaths.MoviesReviews,
      {movie_id: arg.id},
    );
  }
}

const api = new MainApi();
export default api;
