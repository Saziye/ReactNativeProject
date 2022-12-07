import {RouteModel} from 'models';

type RoutePaths = keyof RouteModel;
type Keys = 'home' | 'search' | 'watchlist';

const routes: {[key in Keys]: RoutePaths} = {
  home: 'Home',
  search: 'Search',
  watchlist: 'WatchList',
};

export default routes;
