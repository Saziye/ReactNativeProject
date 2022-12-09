import IconPopcorn from './popcorn.svg';
import IconHome from './home.svg';
import IconHomeDeactive from './home-deactive.svg';
import IconSearch from './search.svg';
import IconSearchDeactive from './search-deactive.svg';
import IconWatchlist from './watchlist.svg';
import IconWatchlistDeactive from './watchlist-deactive.svg';
import IconSearchInput from './search-input.svg';
import IconTime from './time.svg';
import IconCalendar from './calendar.svg';
import IconTicket from './ticket.svg';
import IconAvatar from './avatar.svg';

const Icons = {
  Popcorn: IconPopcorn,
  Home: IconHome,
  HomeDeactive: IconHomeDeactive,
  Search: IconSearch,
  SearchDeactive: IconSearchDeactive,
  Watchlist: IconWatchlist,
  WatchlistDeactive: IconWatchlistDeactive,
  SearchInput: IconSearchInput,
  Time: IconTime,
  Calendar: IconCalendar,
  Ticket: IconTicket,
  Avatar: IconAvatar,
};

export default Icons;

export type IconType = typeof Icons;
