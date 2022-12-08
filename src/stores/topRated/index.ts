import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TopRatedModule} from 'models';
import {RootState} from 'stores';

const initialState: TopRatedModule.TopRatedStore = {
  topRateds: [],
  loading: false,
  page: 1,
  total_results: 0,
  total_pages: 1,
};

export const topRatedSlice = createSlice({
  name: 'topRated',
  initialState,
  reducers: {
    getTopRateds: (state: TopRatedModule.TopRatedStore) => {
      state.loading = true;
    },
    getTopRatedsSuccess: (
      state: TopRatedModule.TopRatedStore,
      {payload}: PayloadAction<TopRatedModule.Response>,
    ) => {
      state.loading = false;
      state.topRateds = payload.data?.results;
      state.page = payload.data.page;
      state.total_results = payload.data.total_results;
      state.total_pages = payload.data.total_pages;
    },
    getTopRatedsFail: (
      state: TopRatedModule.TopRatedStore,
      // action: PayloadAction<TopRatedModule.Error>,
    ) => {
      state.loading = false;
    },
  },
});

export const {getTopRateds, getTopRatedsSuccess, getTopRatedsFail} =
  topRatedSlice.actions;

export const topRatedStore = (state: RootState) => state.topRated;

export default topRatedSlice.reducer;
