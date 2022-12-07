import IconPopcorn from './popcorn.svg';
import IconHome from './home.svg';
import IconHomeDeactive from './home-deactive.svg';
import IconSearch from './search.svg';
import IconSearchDeactive from './search-deactive.svg';
import IconWatchlist from './watchlist.svg';
import IconWatchlistDeactive from './watchlist-deactive.svg';

const Icons = {
  Popcorn: IconPopcorn,
  Home: IconHome,
  HomeDeactive: IconHomeDeactive,
  Search: IconSearch,
  SearchDeactive: IconSearchDeactive,
  Watchlist: IconWatchlist,
  WatchlistDeactive: IconWatchlistDeactive,
};

export default Icons;

export type IconType = typeof Icons;
