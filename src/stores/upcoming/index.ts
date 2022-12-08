import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UpcomingModule} from 'models';
import {RootState} from 'stores';

const initialState: UpcomingModule.UpcomingStore = {
  upcomings: [],
  loading: false,
  page: 1,
  total_results: 0,
  total_pages: 1,
};

export const upcomingSlice = createSlice({
  name: 'upcoming',
  initialState,
  reducers: {
    getUpcomings: (state: UpcomingModule.UpcomingStore) => {
      state.loading = true;
    },
    getUpcomingsSuccess: (
      state: UpcomingModule.UpcomingStore,
      {payload}: PayloadAction<UpcomingModule.Response>,
    ) => {
      state.loading = false;
      state.upcomings = payload.data?.results;
      state.page = payload.data.page;
      state.total_results = payload.data.total_results;
      state.total_pages = payload.data.total_pages;
    },
    getUpcomingsFail: (
      state: UpcomingModule.UpcomingStore,
      // action: PayloadAction<UpcomingModule.Error>,
    ) => {
      state.loading = false;
    },
  },
});

export const {getUpcomings, getUpcomingsSuccess, getUpcomingsFail} =
  upcomingSlice.actions;

export const upcomingStore = (state: RootState) => state.upcoming;

export default upcomingSlice.reducer;
