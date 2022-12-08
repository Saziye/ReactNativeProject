import {RouteModel} from 'models';

type RoutePaths = keyof RouteModel;
type Keys = 'home' | 'search' | 'watchlist' | 'signup' | 'movieDetail';

const routes: {[key in Keys]: RoutePaths} = {
  home: 'Home',
  search: 'Search',
  watchlist: 'WatchList',
  signup: 'SignUp',
  movieDetail: 'MovieDetail',
};

export default routes;
