import {ServiceModule} from './Service';

export declare module PopularModule {
  interface PopularStore {
    populars: Movie[];
    page: number;
    total_results: number;
    total_pages: number;
    loading: boolean;
  }
  interface Request {}
  interface Response extends ServiceModule.Response {
    data: Populars;
  }
  interface Populars {
    resultData: Popular;
    resultCode: number;
    resultMessage: string;
  }

  interface Popular {
    page: number;
    result: Movie[];
    total_results: number;
    total_pages: number;
  }

  interface Movie {
    poster_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids: [];
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: string;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
  }
}
