import {ServiceModule} from './Service';

export declare module MovieCreditModule {
  interface MovieCreditStore {
    movieCredit: MovieCredit | undefined;
    loading: boolean;
  }
  interface Request {
    id: Number;
  }
  interface Response extends ServiceModule.Response {
    data: MovieCredit;
  }
  interface MovieCredit {
    id: number;
    cast: Cast[];
    crew: Crew[];
  }

  interface Crew {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path?: string;
    credit_id: string;
    department: string;
    job: string;
  }

  interface Cast {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path?: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
  }
}
