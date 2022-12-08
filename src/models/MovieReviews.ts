import {ServiceModule} from './Service';

export declare module MovieReviewsModule {
  interface MovieReviewsStore {
    movieReviews: MovieReviews | undefined;
    loading: boolean;
  }
  interface Request {
    id: Number;
  }
  interface Response extends ServiceModule.Response {
    data: MovieReviews;
  }
  

  interface MovieReviews {
    id: number;
    page: number;
    results: Result[];
    total_pages: number;
    total_results: number;
  }
  
  interface Result {
    author: string;
    author_details: Authordetails;
    content: string;
    created_at: string;
    id: string;
    updated_at: string;
    url: string;
  }
  
  interface Authordetails {
    name: string;
    username: string;
    avatar_path?: string;
    rating?: number;
  }
}
