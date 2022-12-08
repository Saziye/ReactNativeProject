import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PopularModule} from 'models';
import {RootState} from 'stores';

const initialState: PopularModule.PopularStore = {
  populars: [],
  loading: false,
  page: 1,
  total_results: 0,
  total_pages: 1,
};

export const popularSlice = createSlice({
  name: 'popular',
  initialState,
  reducers: {
    getPopulars: (state: PopularModule.PopularStore) => {
      state.loading = true;
    },
    getPopularsSuccess: (
      state: PopularModule.PopularStore,
      {payload}: PayloadAction<PopularModule.Response>,
    ) => {
      console.log({payload})
      state.loading = false;
      state.populars = payload.data?.results;
      state.page = payload.data?.page;
      state.total_results = payload.data?.total_results;
      state.total_pages = payload.data?.total_pages;
    },
    getPopularsFail: (
      state: PopularModule.PopularStore,
      // action: PayloadAction<PopularModule.Error>,
    ) => {
      state.loading = false;
    },
  },
});

export const {getPopulars, getPopularsSuccess, getPopularsFail} =
  popularSlice.actions;

export const popularStore = (state: RootState) => state.popular;

export default popularSlice.reducer;
